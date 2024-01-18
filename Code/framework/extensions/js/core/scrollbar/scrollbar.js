/*
    GreyOS - Scrollbar (Version: 1.3)

    File name: scrollbar.js
    Description: This file contains the Scrollbar development module.

    Coded by Arron Bailiss (abailiss), George Delaportas (G0D) and John Inglessis (negle).
    Copyright © 2013 - 2023
    Open Software License (OSL 3.0)
*/

// Scrollbar
function scrollbar()
{
    var self = this;

    function config_model()
    {
        this.id = null;
        this.container_id = null;
        this.scroll_ratio = 0.0;
        this.handle_pos = 0;
        this.offset_pos = 0;
        this.is_scrolling = false;
        this.is_wheel = false;
        this.side = null;           // 1 is for right side, 2 is for left side
        this.handle_width = null;
    }

    function utilities()
    {
        this.draw = function(id)
        {
            var __content = vulcan.objects.by_id(id);

            // Setup content and scrollbar HTML / CSS
            __content.innerHTML = '<div id="' + config.id + '_content" class="scrollbar-content">' + __content.innerHTML + '</div>';

            var __container = vulcan.objects.by_id(id);

            __content = vulcan.objects.by_id(config.id + '_content');

            // Add scrollbar
            var __track_div = document.createElement('div');

            __track_div.id = config.id + '_track';
            __track_div.className = 'scrollbar-track';
            __track_div.innerHTML = '<div id="' + config.id + '_handle" class="scrollbar-handle"></div>';

            __container.appendChild(__track_div);

            // Calculate scrollbar to content scrolling ratio (to align the handle correctly)
            var __content = vulcan.objects.by_id(config.id + '_content'),
                __track = vulcan.objects.by_id(config.id + '_track'),
                __handle = vulcan.objects.by_id(config.id + '_handle'),
                __content_height = __content.clientHeight,
                __container_height = __content.parentNode.clientHeight,
                __scroll_ratio = (__content_height - __container_height) / (__container_height - __handle.clientHeight - 8);

            // No need for scrollbar on this content
            if (__scroll_ratio <= 1.0)
                return false;

            __content.style.height = '100%';
            //__content.style.width = (__content.offsetWidth - __handle.offsetWidth) + 'px';
            //__track.style.height = (__container_height - 4) + 'px';

            // Apply Scroll Bar on the right side
            if (config.side === 1)
            {
               __track.style.right = '5px';
               __track.style.cssFloat = 'right';
               __content.style.cssFloat = 'left';
            }
            else    // Apply Scroll Bar on the left side
                __content.style.marginLeft = __handle.offsetWidth + 'px';

            config.scroll_ratio = __scroll_ratio;
            config.handle_width = __handle.offsetWidth;

            return true;
        };

        this.bind_events = function()
        {
            var __content = vulcan.objects.by_id(config.id + '_content'),
                //__track = vulcan.objects.by_id(config.id + '_track'),
                __handle = vulcan.objects.by_id(config.id + '_handle');

            morpheus.run(config.id, 'mouse', 'mousewheel', events.mouse.wheel, __content);
            morpheus.run(config.id, 'mouse', 'mousedown', events.mouse.down, __handle);
            morpheus.run(config.id, 'mouse', 'mouseup', events.mouse.up, document);
            morpheus.run(config.id, 'mouse', 'mousemove', events.mouse.move, document);

            return true;
        };
    }

    function events_manager()
    {
        function mouse()
        {
            this.up = function()
            {
                config.is_scrolling = false;

                return true;
            };

            this.down = function(this_event)
            {
                if (config.handle_pos === 0)
                    config.handle_pos = this_event.clientY;

                config.is_scrolling = true;
                config.is_wheel = false;

                return true;
            };

            this.move = function(this_event)
            {
                if (!config.is_scrolling)
                    return false;

                var __content = vulcan.objects.by_id(config.id + '_content'),
                    __track = vulcan.objects.by_id(config.id + '_track'),
                    __handle = vulcan.objects.by_id(config.id + '_handle'),
                    __track_height = __track.clientHeight,
                    __handle_height = __handle.clientHeight,
                    __moved = config.offset_pos + this_event.clientY - config.handle_pos,
                    __top = __moved;

                if (__moved < 0)
                    __top = 0;
                else if (__moved > __track_height - __handle_height)
                    __top = __track_height - __handle_height;

                __handle.style.top = __top + 'px';

                __content.scrollTop = __top * config.scroll_ratio;

                return true;
            };

            this.wheel = function(this_event)
            {
                var __content = vulcan.objects.by_id(config.id + '_content'),
                    __track = vulcan.objects.by_id(config.id + '_track'),
                    __handle = vulcan.objects.by_id(config.id + '_handle'),
                    __track_height = __track.clientHeight,
                    __handle_height = __handle.clientHeight,
                    __mouse_direction = this_event.detail ? this_event.detail * -1 : this_event.wheelDelta / 120,
                    __moved = config.offset_pos - config.handle_pos,
                    __top = __moved;

                if (__mouse_direction < 0)
                {
                    if (__moved > __track_height - __handle_height)
                        __top = __track_height - __handle_height;

                    __handle.style.top = __top + 'px';

                    __content.scrollTop += config.scroll_ratio;
                }
                else
                {
                    if (__moved < 0)
                         __top = 0;

                    __handle.style.top = __top + 'px';

                    __content.scrollTop -= config.scroll_ratio;
                }

                config.handle_pos = __top;
                config.is_wheel = true;

                return true;
            };
        }

        this.mouse = new mouse();
    }
    
    function status()
    {
        // TO DO:...
    }

    function side()
    {
        this.change = function()
        {
            if (is_init === false)
                return false;

            var __content = vulcan.objects.by_id(config.id + '_content'),
                __track = vulcan.objects.by_id(config.id + '_track');

            if (config.side === 1)
            {
                __track.style.right = '';

                __content.style.marginLeft = config.handle_width + 'px';

                config.side = 2;
            }
            else
            {
                __content.style.marginLeft = '';

                __track.style.right = '5px';

                config.side = 1;
            }

            return true;
        };
    }

    function scroll()
    {
        this.top = function()
        {
            var __content = vulcan.objects.by_id(config.id + '_content'),
                __handle = vulcan.objects.by_id(config.id + '_handle');

            config.offset_pos = 0;

            __content.scrollTop = 0;
        };

        this.bottom = function()
        {
            var __content = vulcan.objects.by_id(config.id + '_content'),
                __track = vulcan.objects.by_id(config.id + '_track'),
                __handle = vulcan.objects.by_id(config.id + '_handle'),
                __track_height = __track.clientHeight,
                __handle_height = __handle.clientHeight,
                __top = __track_height - __handle_height;

            config.offset_pos = __top;

            __content.scrollTop = __content.scrollHeight - __handle.clientHeight;
        };
    }

    this.apply = function(container_id, side)
    {
        if (is_init === false)
            return false;

        if (vulcan.validation.alpha.is_symbol(container_id))
            return false;

        if (!vulcan.validation.numerics.is_integer(side) || side < 1 || side > 2)
            return false;

        var __scrollbar_exists = vulcan.objects.by_id(container_id).getElementsByClassName('scrollbar-content')[0];

        if (__scrollbar_exists)
            return false;

        config.container_id = container_id;
        config.side = side;

        utils.draw(container_id);
        utils.bind_events();

        return true;
    };

    this.destroy = function(container_id)
    {
        if (is_init === false)
            return false;

        if (vulcan.validation.alpha.is_symbol(container_id))
            return false;

        // TO DO:...

        return true;
    };

    this.init = function()
    {
        if (is_init === true)
            return false;

        is_init = true;

        vulcan = cosmos.hub.access('vulcan');

        var __pythia = cosmos.hub.access('matrix').get('pythia');

        config.id = 'scrollbar_' + __pythia.generate();

        vulcan.graphics.apply_theme('/framework/extensions/js/scrollbar/themes', 'scrollbar');

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
        cosmos = null,
        matrix = null,
        morpheus = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        config = new config_model(),
        events = new events_manager(),
        utils = new utilities();

    this.status = new status();
    this.side = new side();
    this.scroll = new scroll();
}
