/*
    GreyOS - Eagle (Version: 2.1)

    File name: eagle.js
    Description: This file contains the Eagle - "Alt-Tab"-like keys facility module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2023
    Open Software License (OSL 3.0)
*/

// Eagle
function eagle()
{
    var self = this;

    function trace_keys_model()
    {
        this.modifier = key_control.keys.SHIFT;
        this.trigger = key_control.keys.TAB;
        this.modifier_set = false;
        this.trigger_set = false;
    }

    function utilities()
    {
        var me = this;

        this.key_down_tracer = function(event_object)
        {
            key_control.scan(event_object);

            var __key_code = key_control.get();

            if (trace_keys.modifier === __key_code)
                trace_keys.modifier_set = true;

            if (trace_keys.trigger === __key_code && trace_keys.modifier_set === true)
            {
                trace_keys.trigger_set = true;

                if (is_visible === false)
                {
                    me.show_eagle();
                    me.draw_windows();
                }

                me.switch_windows();

                event_object.preventDefault();
            }

            return true;
        };

        this.key_up_tracer = function(event_object)
        {
            key_control.scan(event_object);

            var __key_code = key_control.get();

            if (trace_keys.modifier === __key_code)
            {
                var __eagle_apps = utils_sys.objects.by_id('eagle_apps');

                __eagle_apps.scrollTo(0, 1);

                me.hide_eagle();

                trace_keys.modifier_set = false;

                picked_window = 0;
                scroll_multiplier = 1;
            }

            return true;
        };

        this.draw_eagle = function()
        {
            var __eagle_interface = document.createElement('div'),
                __container_object = utils_sys.objects.by_id(self.settings.container());

            __eagle_interface.id = eagle_id;
            __eagle_interface.className = 'eagle';
            __eagle_interface.innerHTML = '<div id="eagle_apps"><br><br>No running apps...</div></div>';

            __container_object.appendChild(__eagle_interface);

            return true;
        };

        this.show_eagle = function()
        {
            var __eagle = utils_sys.objects.by_id(eagle_id);

            __eagle.style.display = 'block';

            is_visible = true;

            return true;
        };

        this.hide_eagle = function()
        {
            var __eagle = utils_sys.objects.by_id(eagle_id);

            __eagle.style.display = 'none';

            is_visible = false;

            return true;
        };

        this.draw_windows = function()
        {
            var __running_apps = owl.list('RUN', 'app'),
                __running_apps_num = 0,
                __eagle_apps = null,
                __this_picked_app = null,
                __this_app_title = null;

            __eagle_apps = utils_sys.objects.by_id('eagle_apps');

            __running_apps_num = __running_apps.length;

            if (__running_apps_num == 0)
            {
                __eagle_apps.innerHTML = '<br><br>No running apps...';

                return false;
            }

            __eagle_apps.innerHTML = '';

            for (var i = 1; i <= __running_apps_num; i++)
            {
                __this_picked_app = colony.get(__running_apps[i - 1].sys_id);

                if (__this_picked_app === null || __this_picked_app === false)
                    continue;

                if (i === 1)
                    picked_app = __this_picked_app;

                __this_app_title = __this_picked_app.settings.data.window.labels.title();

                var __this_eagle_window = document.createElement('div'),
                    __no_right_margin = '';

                if (i % 3 === 0)
                    __no_right_margin = ' no_right_margin';

                if (__this_app_title.length > 13)
                    __this_app_title = __this_app_title.substring(0, 12) + '...';

                __this_eagle_window.id = 'eagle_' + __running_apps[i - 1].sys_id;
                __this_eagle_window.className = 'eagle_window' + __no_right_margin;
                __this_eagle_window.innerHTML = '<div class="eagle_window_title">' + __this_app_title + '</div>\
                                                 <div class="eagle_window_body"></div>';

                if (i === 1)
                    __this_eagle_window.classList.add('eagle_window_selected');

                __eagle_apps.appendChild(__this_eagle_window);
            }

            return true;
        };

        this.switch_windows = function()
        {
            var __running_apps = owl.list('RUN', 'app'),
                __running_apps_num = 0,
                __eagle_apps = null,
                __this_picked_app = null,
                __previous_picked_win = null,
                __this_picked_win = null;

            __running_apps_num = __running_apps.length;

            if (__running_apps_num == 0)
                return false;

            __eagle_apps = utils_sys.objects.by_id('eagle_apps');

            if (picked_window > 0)
            {
                __previous_picked_win = __eagle_apps.childNodes[picked_window - 1];

                __previous_picked_win.classList.remove('eagle_window_selected');
            }

            if (picked_window >= __running_apps_num)
            {
                picked_window = 0;
                scroll_multiplier = 1;

                __eagle_apps.scrollTo(0, 1);
            }

            __this_picked_win = __eagle_apps.childNodes[picked_window];

            if (utils_sys.validation.misc.is_undefined(__this_picked_win))
                return false;

            __this_picked_win.classList.add('eagle_window_selected');

            if (picked_window % 6 === 0 && picked_window > 0)
            {
                var __scroll_distance = 224;

                __eagle_apps.scrollTo(0, scroll_multiplier * __scroll_distance);

                scroll_multiplier++;
            }

            __this_picked_app = colony.get(__running_apps[picked_window].sys_id);

            __this_picked_app.gui.actions.set_top();

            picked_window++;

            return true;
        };

        this.init_trace_keys = function()
        {
            var __handler = null;

            __handler = function(event) { me.key_down_tracer(event); };
            morpheus.run(eagle_id, 'key', 'keydown', __handler, document);

            __handler = function(event) { me.key_up_tracer(event); };
            morpheus.run(eagle_id, 'key', 'keyup', __handler, document);

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
        function modifier()
        {
            this.key = function()
            {
                if (is_init === false)
                    return false;

                return trace_keys.modifier;
            };

            this.status = function()
            {
                if (is_init === false)
                    return false;

                return trace_keys.modifier_set;
            };
        }

        function trigger()
        {
            this.key = function()
            {
                if (is_init === false)
                    return false;

                return trace_keys.trigger;
            };

            this.status = function()
            {
                if (is_init === false)
                    return false;

                return trace_keys.trigger_set;
            };
        }

        this.picked_app = function()
        {
            return picked_app;
        };

        this.modifier = new modifier();
        this.trigger = new trigger();
    }

    this.init = function(container_id, modifier, trigger)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || 
            utils_sys.validation.alpha.is_symbol(container_id) || 
            utils_sys.objects.by_id(container_id) === null)
            return false;

        if (!utils_sys.validation.misc.is_undefined(modifier) && !utils_sys.validation.misc.is_undefined(trigger))
        {
            if (!utils_sys.validation.numerics.is_integer(modifier) || modifier < 8 || modifier > 222 ||
                !utils_sys.validation.numerics.is_integer(trigger) || trigger < 8 || trigger > 222)
                return false;

            trace_keys.modifier = modifier;
            trace_keys.trigger = trigger;
        }
        else
        {
            if ((!utils_sys.validation.misc.is_undefined(modifier) && utils_sys.validation.misc.is_undefined(trigger)) || 
                (utils_sys.validation.misc.is_undefined(modifier) && !utils_sys.validation.misc.is_undefined(trigger)))
                return false;
        }

        is_init = true;

        self.settings.id('eagle_' + random.generate());
        self.settings.container(container_id);

        eagle_id = self.settings.id();

        nature.theme('eagle');
        nature.apply('new');

        utils_int.draw_eagle();
        utils_int.init_trace_keys();

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        colony = cosmos.hub.access('colony');

        swarm = matrix.get('swarm');
        owl = matrix.get('owl');
        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_visible = false,
        eagle_id = null,
        picked_app = null,
        picked_window = 0,
        scroll_multiplier = 1,
        cosmos = null,
        matrix = null,
        swarm = null,
        colony = null,
        morpheus = null,
        owl = null,
        nature = null,
        utils_sys = new vulcan(),
        key_control = new key_manager(),
        random = new pythia(),
        trace_keys = new trace_keys_model(),
        utils_int = new utilities();

    this.status = new status();
    this.settings = new settings();
}
