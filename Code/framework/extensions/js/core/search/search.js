/*
    GreyOS - Search [Eureka & Philos] (Version: 1.2)

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

        function hide_serch_area_on_key(event)
        {
            if (utils_sys.validation.misc.is_undefined(event))
                return false;

            key_control.scan(event);

            if (key_control.get() !== key_control.keys.ESCAPE)
                return false;

            self.hide();

            return true;
        }

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
            var __handler = null,
                __desktop = utils_sys.objects.by_id('desktop');

            __handler = function(event) { key_down_tracer(event); };
            morpheus.run(search_id, 'key', 'keydown', __handler, document);

            __handler = function(event) { key_up_tracer(event); };
            morpheus.run(search_id, 'key', 'keyup', __handler, document);

            __handler = function(event) {  hide_serch_area_on_key(event); };
            morpheus.run(search_id, 'key', 'keydown', __handler, document);

            __handler = function() {  self.hide(); };
            morpheus.run(search_id, 'mouse', 'click', __handler, __desktop);
            morpheus.run(search_id, 'touch', 'touchmove', __handler, __desktop);

            return true;
        };

        this.draw = function()
        {
            var __desktop = utils_sys.objects.by_id('desktop');

            __desktop.innerHTML += `<div id="`+ search_id + `" class="search">
                                        <div id="philos" title="Philos :: Your personal AI assistant"></div>
                                        <div id="eureka" title="Eureka :: Your own meta-search engine">
                                            <input id="eureka_search_box" type="text" value="" maxlength="100" placeholder="What's next?">
                                        </div>
                                    </div>`;

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

    this.show = function()
    {
        if (is_init === false)
            return false;

        utils_sys.objects.by_id(search_id).style.display = 'block';
        utils_sys.objects.by_id('eureka_search_box').focus();

        is_search_visible = true;

        return true;
    };

    this.hide = function()
    {
        if (is_init === false)
            return false;

        utils_sys.objects.by_id(search_id).style.display = 'none';

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

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        self.settings.id('search_' + random.generate());

        search_id = self.settings.id();

        if (self.settings.container(container_id))
            return utils_int.load_ui();

        return false;
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
        search_id = null,
        cosmos = null,
        matrix = null,
        morpheus = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        key_control = new key_manager(),
        utils_int = new utilities();

        this.settings = new settings();
}
