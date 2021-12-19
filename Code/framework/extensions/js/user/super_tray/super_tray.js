/*
    GreyOS - Super Tray (Version: 1.0)

    File name: super_tray.js
    Description: This file contains the Super Tray - Service icons tray area service module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Super Tray
function super_tray()
{
    var self = this;

    function tray_service_model()
    {
        this.id = null;
        this.icon = 'default';
    }

    function tray_services_collection()
    {
        this.num = 0;
        this.list = [];
    }

    function utilities()
    {
        var me = this;

        this.load_ui = function()
        {
            nature.theme('super_tray');
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
            __dynamic_object.setAttribute('title', 'Access running services');

            __dynamic_object.innerHTML = '<div id="' + super_tray_id + '_arrow" class="access"></div>\
                                          <div id="' + super_tray_id + '_service_icons_tray" class="service_icons_area"></div>';

            __container.appendChild(__dynamic_object);

            return true;
        };

        this.attach_events = function()
        {
            var __handler = null;

            __handler = function() { me.toggle_service_icons_area(); };
            morpheus.run(super_tray_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(super_tray_id + '_arrow'));

            __handler = function() {  me.hide_service_icons_area(); };
            morpheus.run(super_tray_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('desktop'));

            __handler = function(event) {  me.hide_service_icons_area_handler(event); };
            morpheus.run(super_tray_id, 'key', 'keydown', __handler, document);

            return true;
        };

        this.toggle_service_icons_area = function()
        {
            var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');

            if (is_service_icons_tray_visible === true)
            {
                is_service_icons_tray_visible = false;

                __service_icons_tray.style.display = 'none';
            }
            else
            {
                is_service_icons_tray_visible = true;

                __service_icons_tray.style.display = 'block';
            }

            return true;
        };

        this.hide_service_icons_area_handler = function(event)
        {
            if (utils_sys.validation.misc.is_undefined(event))
                return false;

            key_control.scan(event);

            if (key_control.get() !== key_control.keys.ESCAPE)
                return false;

            me.hide_service_icons_area();

            return true;
        };

        this.hide_service_icons_area = function()
        {
            var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');

            __service_icons_tray.style.display = 'none';

            is_service_icons_tray_visible = false;

            return true;
        };

        this.add_service_icon = function(index)
        {
            
        };

        this.remove_service_icon = function(index)
        {
            
        };

        this.clear_service_icons = function()
        {
            
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

    this.add = function(service_id, icon = null)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.alpha.is_symbol(service_id))
            return false;

        if (icon !== null && utils_sys.validation.alpha.is_symbol(icon))
            return false;

        var __new_tray_service = new tray_service_model();

        __new_tray_service.id = service_id;

        if (icon !== null)
            __new_tray_service.icon = icon;

        tray_services.list.push(__new_tray_service);
        tray_services.num++;

        utils_int.add_service_icon(tray_services.num);

        return true;
    };

    this.remove = function(service_id)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.alpha.is_symbol(service_id))
            return false;

        for (var i = 0; i < tray_services.num; i++)
        {
            if (tray_services.list[i].id === service_id)
            {
                tray_services.list.splice(i, 1);
                tray_services.num--;

                utils_int.remove_service_icon(i);

                return true;
            }
        }

        return false;
    };

    this.clear = function()
    {
        if (is_init === false)
            return false;

        tray_services.num = 0;
        tray_services.list = [];

        utils_int.clear_service_icons();

        return true;
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

        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_service_icons_tray_visible = false,
        super_tray_id = null,
        cosmos = null,
        matrix = null,
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
