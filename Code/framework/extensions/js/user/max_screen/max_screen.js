/*
    GreyOS -  Max Screen (Version: 2.0)

    File name: max_screen.js
    Description: This file contains the Max Screen - App size manager module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Max Screen
function max_screen()
{
    var self = this;

    function element_dimensions_model()
    {
        this.width = null;
        this.height = null;
    }

    function utilities()
    {
        var me = this;

        this.go_full_screen = function()
        {
            var __max_screen = utils_sys.objects.by_id(max_screen_id),
                __callback = self.settings.callback_function(),
                __element = utils_sys.objects.by_id(self.settings.container());

            //__max_screen.style.display = 'none';
            __max_screen.innerHTML = 'X';

            element_dimensions.width = __element.style.width;
            element_dimensions.height = __element.style.height;

            __element.requestFullscreen();

            if (__callback)
                __callback.call();

            morpheus.delete(max_screen_id, 'click', __max_screen);

            __handler = function() { me.go_normal_screen(); };
            morpheus.run(max_screen_id, 'mouse', 'click', __handler, __max_screen);

            __handler = function(event_object)
            {
                key_control.scan(event_object);

                var __key_code = key_control.get();

                if (__key_code === 192)
                    me.go_normal_screen();
            };
            morpheus.run(max_screen_id, 'key', 'keydown', __handler, document);

            is_full_screen = true;

            return true;
        };

        this.go_normal_screen = function()
        {
            var __max_screen = utils_sys.objects.by_id(max_screen_id),
                __element = utils_sys.objects.by_id(self.settings.container());

            __max_screen.innerHTML = '[]';
            //__max_screen.style.display = 'block';

            __element.style.width = element_dimensions.width;
            __element.style.height = element_dimensions.height;

            morpheus.delete(max_screen_id, 'click', __max_screen);

            __handler = function() { me.go_full_screen(); };
            morpheus.run(max_screen_id, 'mouse', 'click', __handler, __max_screen);
            morpheus.delete(max_screen_id, 'keydown', document);

            is_full_screen = false;

            return true;
        };

        this.setup = function(theme)
        {
            var __handler = null,
                __dynamic_object = null;

            if (theme === null)
                theme = 'max_screen';

            if (!utils_sys.graphics.apply_theme('/framework/extensions/js/user/max_screen/', theme))
                return false;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', max_screen_id);
            __dynamic_object.setAttribute('class', 'max_screen');
            __dynamic_object.innerHTML = '[]';

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __handler = function() { me.go_full_screen(); };
            morpheus.run(max_screen_id, 'mouse', 'click', __handler, __dynamic_object);

            return true;
        };
    }

    function status()
    {
        this.full_screen = function()
        {
            if (is_init === false)
                return null;

            return is_full_screen;
        };
    }

    function settings()
    {
        var __id = null,
            __container = null,
            __callback_function = null;

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

        this.callback_function = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __callback_function;

            __callback_function = val;

            return true;
        };
    }

    this.init = function(container_id, func = null, theme = null)
    {
        if (is_init === true)
            return false;

        if (utils_sys.validation.misc.is_undefined(container_id))
            return false;

        is_init = true;

        self.settings.id('max_screen_' + random.generate());

        max_screen_id = self.settings.id();

        if (!self.settings.container(container_id))
            return false;

        self.settings.callback_function(func);

        if (!utils_int.setup(theme))
            return false;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');

        morpheus = matrix.get('morpheus');

        return true;
    };

    var is_init = false,
        is_full_screen = false,
        max_screen_id = null,
        cosmos = null,
        matrix = null,
        morpheus = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        key_control = new key_manager(),
        element_dimensions = new element_dimensions_model(),
        utils_int = new utilities();

    this.status = new status();
    this.settings = new settings();
}
