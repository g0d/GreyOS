/*
    GreyOS - Search [Eureka & Philos] (Version: 1.0)

    File name: search.js
    Description: This file contains the Search - OS wide search engine and AI assistant module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Search [Eureka & Philos]
function search()
{
    var self = this;

    function utilities()
    {
        var me = this;

        function key_down_tracer(event_object)
        {
            key_control.scan(event_object);

            var __key_code = key_control.get();

            if (__key_code === 114)
            {
                if (search_on === true)
                    return false;

                self.toggle();

                search_on = true;
            }

            return true;
        }

        function key_up_tracer(event_object)
        {
            key_control.scan(event_object);

            var __key_code = key_control.get();

            if (__key_code !== 114)
                return false;

            search_on = false;

            return true;
        }

        this.attach_events = function()
        {
            var __handler = null;

            __handler = function(event) { key_down_tracer(event); };
            morpheus.run('search', 'key', 'keydown', __handler, document);

            __handler = function(event) { key_up_tracer(event); };
            morpheus.run('search', 'key', 'keyup', __handler, document);

            return true;
        };

        this.draw = function()
        {
            

            return true;
        };

        this.load_ui = function()
        {
            nature.themes.store('search');
            nature.apply('new');

            me.draw();
            me.attach_events();
        };
    }

    this.show = function()
    {
        if (is_init === false)
            return false;

        utils_sys.objects.by_id('search').style.display = 'block';
        utils_sys.objects.by_id('eureka_search_box').focus();

        is_search_visible = true;

        return true;
    };

    this.hide = function()
    {
        if (is_init === false)
            return false;

        utils_sys.objects.by_id('search').style.display = 'none';

        is_search_visible = false;

        return true;
    };

    this.toggle = function()
    {
        if (is_init === false)
            return false;

        if (is_search_visible)
            self.hide();
        else
            self.show();

        return true;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        return utils_int.load_ui();
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
        search_on = false,
        is_search_visible = false,
        cosmos = null,
        matrix = null,
        morpheus = null,
        nature = null,
        utils_sys = new vulcan(),
        key_control = new key_manager(),
        utils_int = new utilities();
}
