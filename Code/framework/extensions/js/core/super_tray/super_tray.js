/*
    GreyOS - Super Tray (Version: 2.1)

    File name: super_tray.js
    Description: This file contains the Super Tray - Service icons tray area module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2024
    Open Software License (OSL 3.0)
*/

// Super Tray
function super_tray()
{
    var self = this;

    function tray_service_model()
    {
        this.sys_id = null;
        this.id = null;
        this.name = null;
        this.icon = null;
        this.visible = true;
        this.action = null;
    }

    function tray_services_collection()
    {
        this.num = 0;
        this.list = [];
    }

    function utilities()
    {
        var me = this;

        function hide_tray_area_on_key(event)
        {
            if (utils_sys.validation.misc.is_undefined(event))
                return false;

            key_control.scan(event);

            if (key_control.get() !== key_control.keys.ESCAPE)
                return false;

            me.hide_tray_area();

            return true;
        }

        this.service_exists = function(sys_service_id)
        {
            for (var i = 0; i < tray_services.num; i++)
            {
                if (tray_services.list[i].sys_id === sys_service_id)
                    return true;
            }

            return false;
        };

        this.fix_service_icon_names = function(service_id)
        {
            var __unique_entry = 0,
                __count = 1,
                __svc_name = null,
                __icon_object = null;

            for (var i = 0; i < tray_services.num; i++)
            {
                if (tray_services.list[i].id === service_id)
                    __unique_entry++;
            }

            for (var i = 0; i < tray_services.num; i++)
            {
                if (tray_services.list[i].id === service_id)
                {
                    __svc_name = service_id + ' (' + __count + ')';

                    if (tray_services.num === 1 || __unique_entry === 1)
                        __svc_name = service_id;

                    tray_services.list[i].name = __svc_name;

                    __icon_object = utils_sys.objects.by_id(super_tray_id + '_service_' + tray_services.list[i].sys_id);

                    __icon_object.setAttribute('title', __svc_name);

                    __count++;
                }
            }

            return true;
        };

        this.load_ui = function()
        {
            nature.themes.store('super_tray');
            nature.apply('new');

            me.draw();
            me.attach_events();
        };

        this.draw = function()
        {
            var __container = utils_sys.objects.by_id(self.settings.container()),
                __dynamic_object = null;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', super_tray_id);
            __dynamic_object.setAttribute('class', 'super_tray');

            __dynamic_object.innerHTML = `<div id="` + super_tray_id + `_arrow" class="access_icon" title="Access running services"></div>
                                          <div id="` + super_tray_id + `_service_icons_tray" class="service_icons_area"></div>`;

            __container.appendChild(__dynamic_object);

            return true;
        };

        this.attach_events = function()
        {
            var __handler = null;

            __handler = function() { me.toggle_tray_area(); };
            morpheus.run(super_tray_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(super_tray_id + '_arrow'));

            __handler = function() {  me.hide_tray_area(); };
            morpheus.run(super_tray_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('desktop'));
            morpheus.run(super_tray_id, 'touch', 'touchmove', __handler, utils_sys.objects.by_id('desktop'));

            __handler = function(event) {  hide_tray_area_on_key(event); };
            morpheus.run(super_tray_id, 'key', 'keydown', __handler, document);

            return true;
        };

        this.show_tray_area = function()
        {
            var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');

            __service_icons_tray.style.display = 'block';

            is_super_tray_visible = true;

            search.hide();

            //morpheus.execute(super_tray_id + '_user_profile_call', 'mouse', 'click');
            //morpheus.execute(super_tray_id + '_user_profile_call', 'touch', 'touchstart');

            //morpheus.delete(super_tray_id + '_user_profile_call', 'click', utils_sys.objects.by_id(super_tray_id + '_arrow'));
            //morpheus.delete(super_tray_id + '_user_profile_call', 'touchmove', utils_sys.objects.by_id(super_tray_id + '_arrow'));

            return true;
        };

        this.hide_tray_area = function()
        {
            var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');

            __service_icons_tray.style.display = 'none';

            is_super_tray_visible = false;

            return true;
        };

        this.toggle_tray_area = function()
        {
            if (is_super_tray_visible)
                me.hide_tray_area();
            else
                me.show_tray_area();

            return true;
        };

        this.add_service_icon = function(index)
        {
            var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray'),
                __new_service = tray_services.list[index - 1],
                __new_service_id = super_tray_id + '_service_' + __new_service.sys_id,
                __dynamic_object = null;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __new_service_id);
            __dynamic_object.setAttribute('class', 'super_tray_service');
            __dynamic_object.setAttribute('data-id', __new_service.sys_id);
            __dynamic_object.setAttribute('title', __new_service.name);

            __dynamic_object.classList.add(__new_service.icon);

            __service_icons_tray.appendChild(__dynamic_object);

            if (__new_service.action !== null)
            {
                var __handler = function() { __new_service.action.call(); };

                morpheus.run(super_tray_id + '_service', 'mouse', 'click', __handler, utils_sys.objects.by_id(__new_service_id));
            }

            return true;
        };

        this.remove_service_icon = function(index)
        {
            var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray'),
                __existing_service = tray_services.list[index],
                __dynamic_object = utils_sys.objects.by_id(super_tray_id + '_service_' + __existing_service.sys_id);

            morpheus.delete(super_tray_id + '_service', 'click', __dynamic_object);

            __service_icons_tray.removeChild(__dynamic_object);

            return true;
        };

        this.clear_service_icons = function()
        {
            var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');

            morpheus.clear(super_tray_id + '_service');

            __service_icons_tray.innerHTML = '';

            return true;
        };
    }

    function settings()
    {
        var __id = null,
            __container = null;

        this.id = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __id;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __id = val;

            return true;
        };

        this.container = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __container;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __container = val;

            return true;
        };
    }

    function status()
    {
        this.num = function()
        {
            if (is_init === false)
                return false;

            return tray_services.num;
        };

        this.list = function()
        {
            if (is_init === false)
                return false;

            return tray_services.list;
        };
    }

    this.add = function(bat_object, visible_in_super_tray = true, action = null)
    {
        if (is_init === false)
            return false;

        if (!utils_sys.validation.misc.is_object(bat_object))
            return false;

        if (action !== null && !utils_sys.validation.misc.is_function(action))
            return false;

        if (!roost.add([bat_object]))
            return false;

        var __service_config = bat_object.config();

        if (utils_int.service_exists(__service_config.sys_name))
            return false;

        var __new_tray_service = new tray_service_model();

        __new_tray_service.sys_id = __service_config.sys_name;
        __new_tray_service.id = __service_config.name;
        __new_tray_service.name = __service_config.name;
        __new_tray_service.icon = __service_config.icon;
        __new_tray_service.visible = visible_in_super_tray;

        if (action !== null)
            __new_tray_service.action = action;

        tray_services.list.push(__new_tray_service);
        tray_services.num++;

        if (visible_in_super_tray)
        {
            utils_int.add_service_icon(tray_services.num);
            utils_int.fix_service_icon_names(__service_config.name);
        }

        return true;
    };

    this.remove = function(sys_service_id)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.alpha.is_symbol(sys_service_id))
            return false;

        roost.remove(sys_service_id);

        svc_box.remove(sys_service_id);

        for (var i = 0; i < tray_services.num; i++)
        {
            if (tray_services.list[i].sys_id === sys_service_id)
            {
                var __common_svc_id = tray_services.list[i].id,
                    __svc_found = false;

                if (tray_services.list[i].visible)
                {
                    for (var j = 0; j < tray_services.num; j++)
                    {
                        if (tray_services.list[j].id === __common_svc_id)
                        {
                            __svc_found = true;

                            break;
                        }
                    }

                    utils_int.remove_service_icon(i);
                }

                tray_services.list.splice(i, 1);
                tray_services.num--;

                if (__svc_found)
                    utils_int.fix_service_icon_names(__common_svc_id);

                return true;
            }
        }

        return false;
    };

    this.clear = function()
    {
        if (is_init === false)
            return false;

        for (var i = 0; i < tray_services.num; i++)
        {
            roost.remove(tray_services.list[i].sys_id);

            svc_box.remove(tray_services.list[i].sys_id);
        }

        tray_services.num = 0;
        tray_services.list = [];

        utils_int.clear_service_icons();

        return true;
    };

    this.show = function()
    {
        if (is_init === false)
            return false;

        return utils_int.show_tray_area();
    };

    this.hide = function()
    {
        if (is_init === false)
            return false;

        return utils_int.hide_tray_area();
    };

    this.toggle = function()
    {
        if (is_init === false)
            return false;

        return utils_int.toggle_tray_area();
    };

    this.id = function()
    {
        if (is_init === false)
            return false;

        return super_tray_id;
    };

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(container_id))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        self.settings.id('super_tray_' + random.generate());
        self.settings.container(container_id);

        super_tray_id = self.settings.id();

        return utils_int.load_ui(container_id);
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        svc_box = cosmos.hub.access('svc_box');
        roost = cosmos.hub.access('roost');

        morpheus = matrix.get('morpheus');
        search = matrix.get('search');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_super_tray_visible = false,
        super_tray_id = null,
        cosmos = null,
        matrix = null,
        svc_box = null,
        roost = null,
        search = null,
        morpheus = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        key_control = new key_manager(),
        tray_services = new tray_services_collection(),
        utils_int = new utilities();

    this.status = new status();
    this.settings = new settings();
}
