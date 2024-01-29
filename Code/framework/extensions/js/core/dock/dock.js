/*
    GreyOS - Dock (Version: 2.4)

    File name: dock.js
    Description: This file contains the Dock module.

    Coded by John Inglessis (negle) and George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Dock
function dock()
{
    var self = this;

    function config_model()
    {
        this.dock_array = [];
    }

    function utilities()
    {
        var me = this;

        function ajax_load(element_id, success_callback, time_out_callback = null, fail_callback = null)
        {
            if (utils_sys.validation.misc.is_undefined(element_id))
                return false;

            var __ajax_config = {
                                    "type"                  :   "data",
                                    "url"                   :   "/",
                                    "data"                  :   "gate=dock&action=load",
                                    "element_id"            :   element_id,
                                    "content_fill_mode"     :   "replace",
                                    "on_success"            :   function()
                                                                {
                                                                    success_callback.call();
                                                                },
                                    "on_timeout"            :   function()
                                                                {
                                                                    if (time_out_callback !== null)
                                                                        time_out_callback.call();
                                                                },
                                    "on_fail"               :   function()
                                                                {
                                                                    if (fail_callback !== null)
                                                                        fail_callback.call();
                                                                }
                                };

            ajax.run(__ajax_config);

            return true;
        }

        function ajax_save(apps_array)
        {
            var __ajax_config = {
                                    "type"          :   "request",
                                    "method"        :   "post",
                                    "url"           :   "/",
                                    "data"          :   "gate=dock&action=save&apps=" + apps_array,
                                    "ajax_mode"     :   "synchronous",
                                };

            return ajax.run(__ajax_config);
        }

        function create_dock_array()
        {
            var __app_id = null,
                __app_icon = null,
                __position = null,
                __system = null,
                __title = null
                __dock_app = null,
                __dock = utils_sys.objects.by_class('favorites');

            for (__dock_app of __dock)
            {
                __app_id = __dock_app.getAttribute('id').split('app_')[1],
                __app_icon =  __dock_app.getAttribute('data-icon'),
                __position = __dock_app.getAttribute('data-position'),
                __system = __dock_app.getAttribute('data-system'),
                __title = __dock_app.getAttribute('title');

                config.dock_array.push({ "app_id" : __app_id, "icon" : __app_icon, 
                                         "position" : __position, "system" : __system, "title" : __title });
            }

            return true;
        }

        function attach_events()
        {
            var __dock_div = utils_sys.objects.by_id(self.settings.container()),
                __handler = null,
                __dock_app = null;

            __handler = function() { last_button_clicked = 0; };
            morpheus.run(dock_id, 'mouse', 'mouseenter', __handler, __dock_div);

            for (__dock_app of config.dock_array)
                run_app(__dock_app);

            enable_drag();

            return true;
        }

        function update_dock_array(position_one, position_two)
        {
            var tmp = config.dock_array[position_one];

            config.dock_array[position_one] = config.dock_array[position_two];
            config.dock_array[position_two] = tmp;
            config.dock_array[position_one]['position'] = position_one + 1;
            config.dock_array[position_two]['position'] = position_two + 1;

            return true;
        }

        function run_app(dock_app)
        {
            var __handler = function(event)
                            {
                                if (event.buttons === 0 && last_button_clicked !== 1)
                                    return false;

                                if (is_dragging)
                                    return false;

                                var __app_id = dock_app['app_id'],
                                    __system_app = dock_app['system'],
                                    __sys_theme = chameleon.get(),
                                    __is_sys_level = true;

                                parrot.play('action', '/site/themes/' + __sys_theme + '/sounds/button_click.mp3');

                                if (__system_app === 'true')
                                    __is_sys_level = true;
                                else
                                    __is_sys_level = false;

                                x_runner.start('app', __app_id, __is_sys_level);
                            };
            morpheus.run(dock_id, 'mouse', 'mouseup', __handler, utils_sys.objects.by_id('app_' + dock_app['app_id']));
        }

        function enable_drag()
        {
            var __dock_div = utils_sys.objects.by_id(self.settings.container()),
                __dock_apps = utils_sys.objects.selectors.all('#top_panel #bottom_area #dynamic_container #favorite_apps .favorites'),
                __dock_apps_length = __dock_apps.length,
                __handler = null;

            for (var i = 0; i < __dock_apps_length; i++)
            {
                __handler = function(event) { last_button_clicked = event.buttons; };
                morpheus.run(dock_id, 'mouse', 'mousedown', __handler, __dock_apps[i]);

                __handler = function(event)
                            {
                                is_dragging = true;

                                event.dataTransfer.setDragImage(this, -5, -5);
                                event.dataTransfer.effectAllowed = 'move';
                                event.dataTransfer.setData('text/plain', event.target.id);

                                for (var j = 0; j < __dock_apps_length; j++)
                                    __dock_apps[j].classList.add('dock_replace');
                            };
                morpheus.run(dock_id, 'mouse', 'dragstart', __handler, __dock_apps[i]);

                __handler = function(event)
                            {
                                event.preventDefault();

                                event.dataTransfer.dropEffect = 'move';
                            };
                morpheus.run(dock_id, 'mouse', 'dragover', __handler, __dock_apps[i]);

                __handler = function(event)
                            {
                                event.preventDefault();

                                event.target.classList.add('dock_replace_outer');
                            };
                morpheus.run(dock_id, 'mouse', 'dragenter', __handler, __dock_apps[i]);

                __handler = function() { this.classList.remove('dock_replace_outer'); };
                morpheus.run(dock_id, 'mouse', 'dragleave', __handler, __dock_apps[i]);

                __handler = function()
                            {
                                is_dragging = false;

                                for (var j = 0; j < __dock_apps_length; j++)
                                {
                                    __dock_apps[j].classList.remove('dock_replace_outer');
                                    __dock_apps[j].classList.remove('dock_replace');
                                }
                            };
                morpheus.run(dock_id, 'mouse', 'dragend', __handler, __dock_apps[i]);

                __handler = function(event)
                            {
                                if (event.target.id !== event.dataTransfer.getData('text/plain'))
                                {
                                    var __id = event.dataTransfer.getData('text/plain'),
                                        __app_to_move = utils_sys.objects.by_id(__id),
                                        __app_to_move_next = __app_to_move.nextSibling,
                                        __app_to_replace = utils_sys.objects.by_id(this.id),
                                        __position_one = __app_to_move.getAttribute('data-position'),
                                        __position_two = event.target.getAttribute('data-position');

                                    __app_to_move.setAttribute('data-position', __position_two); 

                                    event.target.setAttribute('data-position', __position_one);

                                    __dock_div.insertBefore(__app_to_move, __app_to_replace.nextSibling);
                                    __dock_div.insertBefore(__app_to_replace, __app_to_move_next);

                                    update_dock_array(__position_one - 1, __position_two - 1);

                                    me.save_dock();
                                }
                            };
                morpheus.run(dock_id, 'mouse', 'drop', __handler, __dock_apps[i]);
            }
        }

        this.draw = function()
        {
            ajax_load(self.settings.container(), function()
                                                 {
                                                    create_dock_array();
                                                    attach_events();
                                                 });

            return true;
        };

        this.save_dock = function()
        {   
            var __dock_array = encodeURIComponent(JSON.stringify(config.dock_array));

           return ajax_save(__dock_array);
        };

        this.clear = function()
        {
            config.dock_array = [];

            morpheus.clear(dock_id);

            var __dock = utils_sys.objects.by_class('favorites');

            __dock.innerHTML = '';

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

    this.add = function()
    {
        if (is_init === false)
            return false;

        // TODO:...

        return true;
    };

    this.remove = function()
    {
        if (is_init === false)
            return false;

        // TODO:...

        return true;
    };

    this.refresh = function()
    {
        if (is_init === false)
            return false;

        utils_int.clear();
        utils_int.draw();

        return true;
    };

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
           return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || 
            utils_sys.validation.alpha.is_symbol(container_id) || 
            utils_sys.objects.by_id(container_id) === null)
            return false;

        is_init = true;

        self.settings.id('dock_' + random.generate());
        self.settings.container(container_id);

        dock_id = self.settings.id();

        nature.theme('dock');
        nature.apply('new');

        utils_int.draw();

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');

        morpheus = matrix.get('morpheus');
        x_runner = matrix.get('x_runner');
        parrot = matrix.get('parrot');
        chameleon = matrix.get('chameleon');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_dragging = false,
        dock_id = null,
        cosmos = null,
        matrix = null,
        morpheus = null,
        x_runner = null,
        parrot = null,
        chameleon = null,
        nature = null,
        last_button_clicked = 0,
        utils_sys = new vulcan(),
        random = new pythia(),
        ajax = new taurus(),
        config = new config_model(),
        utils_int = new utilities();

    this.settings = new settings();
}
