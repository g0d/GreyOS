/*

    GreyOS Inc. - FX (Collection of effects for GreyOS)
    
    File name: fx.js (Version: 1.8)
    Description: This file contains the FX - Collection of effects extension.
    
    Coded by George Delaportas (G0D) and John Inglessis (negle)
    
    GreyOS Inc.
    Copyright © 2013

*/



// FX
function fx()
{

    var self = this;

    function utilities()
    {

        this.validate_element = function(name, mode)
        {

            if (vulcan.validation.alpha.is_symbol(name) || !vulcan.validation.numerics.is_number(mode) || mode < 1 || mode > 4)
                return false;

            var __element = null;

            if (mode === 1)
                __element = vulcan.objects.by_id(name);

            else if (mode === 2)
                __element = vulcan.objects.by_class(name)[0];

            else if (mode === 3)
                __element = vulcan.objects.selectors.parent(name);

            else
            {

                if (vulcan.validation.misc.is_object(name))
                    __element = name;

            }

            if (__element === null)
                return false;

            return __element;

        };

    }

    function fade()
    {

        var __id = null,
            __step = 0.0,
            __speed = 0,
            __delay = 0;

        this.into = function(id, step, speed, delay, callback)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(id) || 
                vulcan.validation.misc.is_undefined(step) || 
                vulcan.validation.misc.is_undefined(speed) || 
                vulcan.validation.misc.is_undefined(delay))
                return false;

            if (vulcan.validation.alpha.is_symbol(id) || 
                (!vulcan.validation.numerics.is_float(step) || step < 0.0 || step > 1.0) || 
                (!vulcan.validation.numerics.is_integer(speed) || speed < 0) || 
                (!vulcan.validation.numerics.is_integer(delay) || delay < 0))
                return false;

            var __inc = 0,
                __interval_id = 0,
                __time_out = 0;

            __id = id;
            __step = step;
            __speed = speed;
            __delay = delay;

            function do_fade()
            {

                if (__inc === 0)
                {

                    vulcan.objects.by_id(id).style.display = 'block';

                    self.opacity.apply(id, 0.0);

                }

                if (__inc <= 1)
                {

                    __inc += step;

                    self.opacity.apply(id, __inc);

                }

                else
                {

                    clearInterval(__interval_id);
                    clearTimeout(__time_out);

                    vulcan.objects.by_id(id).style.display = 'block';

                    self.opacity.reset(id);

                    if (vulcan.validation.misc.is_function(callback))
                        callback.call();

                }

                return true;

            }

            function start_interval()
            {

                __interval_id = setInterval(function() { do_fade(); }, speed);

                return true;

            }

            function fire_timeout()
            {

                return setTimeout(function() { start_interval(); }, delay);

            }

            __time_out = fire_timeout();

            return true;

        };

        this.out = function(id, step, speed, delay, callback)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(id) || 
                vulcan.validation.misc.is_undefined(step) || 
                vulcan.validation.misc.is_undefined(speed) || 
                vulcan.validation.misc.is_undefined(delay))
                return false;

            if (vulcan.validation.alpha.is_symbol(id) || 
                (!vulcan.validation.numerics.is_float(step) || step < 0.0 || step > 1.0) || 
                (!vulcan.validation.numerics.is_integer(speed) || speed < 0) || 
                (!vulcan.validation.numerics.is_integer(delay) || delay < 0))
                return false;

            var __dec = 1,
                __interval_id = 0,
                __time_out = 0;

            __id = id;
            __step = step;
            __speed = speed;
            __delay = delay;

            function do_fade()
            {

                if (__dec === 1)
                    self.opacity.reset(id);

                if (__dec >= 0)
                {

                    __dec -= step;

                    if (vulcan.objects.by_id(id) !== null)
                        self.opacity.apply(id, __dec);

                }

                else
                {

                    clearInterval(__interval_id);
                    clearTimeout(__time_out);

                    if (vulcan.objects.by_id(id) !== null)
                    {

                        vulcan.objects.by_id(id).style.display = 'none';

                        self.opacity.apply(id, 0.0);

                    }

                    if (vulcan.validation.misc.is_function(callback))
                        callback.call();

                }

                return true;

            }

            function start_interval()
            {

                __interval_id = setInterval(function() { do_fade(); }, speed);

                return true;

            }

            function fire_timeout()
            {

                return setTimeout(function() { start_interval(); }, delay);

            }

            __time_out = fire_timeout();

            return true;

        };

        this.reset = function()
        {

            if (is_init === false)
                return false;

            __id = null;
            __step = 0.0;
            __speed = 0;
            __delay = 0;

            return true;

        };

        this.get = function(type)
        {

            if (is_init === false)
                return false;

            if (type === 'id')
                return __id;

            else if (type === 'step')
                return __step;

            else if (type === 'speed')
                return __speed;

            else if (type === 'delay')
                return __delay;

            else
                return false;

        };

    }

    function opacity()
    {

        var __opacity = 1.0;

        this.apply = function(id, val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.alpha.is_symbol(id) || !vulcan.validation.numerics.is_float(val) || val < 0.0 || val > 1.0)
                return false;

            vulcan.objects.by_id(id).style.opacity = val;
            
            __opacity = val;

            return true;

        };

        this.reset = function(id)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.alpha.is_symbol(id))
                return false;

            vulcan.objects.by_id(id).style.opacity = 1.0;

            __opacity = 1.0;

            return true;

        };

        this.get = function()
        {

            if (is_init === false)
                return false;

            return __opacity;

        };

    }

    function animation()
    {

        this.swipe = function(name, mode, direction, distance, speed, step, callback)
        {

            if (is_init === false)
                return false;

            var __element = utils.validate_element(name, mode);

            if (__element === false)
                return false;

            if (!vulcan.validation.alpha.is_string(direction) || 
                !vulcan.validation.numerics.is_integer(distance) || 
                !vulcan.validation.numerics.is_integer(speed) || 
                !vulcan.validation.numerics.is_integer(step))
                return false;

            if (!vulcan.validation.misc.is_undefined(callback) && !vulcan.validation.misc.is_function(callback))
                return false;

            if (step >= distance)
                return false;

            var __distance = 0,
                __last_step = 0,
                __interval = null;

            function reverse_parameters()
            {

                distance = -distance;
                step = -step;

                return true;

            }

            function dynamic_logic(distance, direction, mode)
            {

                if (direction === 'up' || direction === 'left')
                {

                    if (mode === 1)
                    {

                        if (__distance <= distance)
                            return true;

                        return false;

                    }

                    else if (mode === 2)
                    {

                        if (__distance < distance)
                            return true;

                        return false;

                    }

                    else
                        return null;

                }

                else if (direction === 'down' || direction === 'right')
                {

                    if (mode === 1)
                    {

                        if (__distance >= distance)
                            return true;

                        return false;

                    }

                    else if (mode === 2)
                    {

                        if (__distance > distance)
                            return true;

                        return false;

                    }

                    else
                        return null;

                }

                return null;

            }

            function interval_model()
            {

                this.run = function(func, speed)
                {

                    __interval = setInterval(function() { func.call(); }, speed);

                    return true;

                };

                this.stop = function(interval_handler)
                {

                    clearInterval(interval_handler);

                    return true;

                };

            }

            function do_swipe(direction)
            {

                if (direction === 'up' || direction === 'down' || direction === 'left' || direction === 'right')
                {

                    var __pos = null,
                        __pos_val = 0;

                    if (direction === 'up' || direction === 'down')
                    {

                        __pos = 'top';

                        __pos_val = vulcan.graphics.pixels_value(__element.style.top);

                    }

                    else
                    {

                        __pos = 'left';

                        __pos_val = vulcan.graphics.pixels_value(__element.style.left);

                    }

                    if (direction === 'up' || direction === 'left')
                        reverse_parameters();

                    interval.run(function()
                                 {

                                     __distance = __distance + step;

                                     if (dynamic_logic(distance, direction, 1))
                                     {

                                         if(dynamic_logic(distance, direction, 2))
                                         {

                                             __last_step = distance - (__distance - step);
                                             __element.style[__pos] = __pos_val + (__distance - step) + __last_step + 'px';

                                         }

                                         else
                                             __element.style[__pos] = __pos_val + __distance + 'px';

                                         interval.stop(__interval);

                                         if (!vulcan.validation.misc.is_undefined(callback))
                                             callback.call();

                                     }

                                     else
                                         __element.style[__pos] = __pos_val + __distance + 'px';

                                 }, speed);

                }

                else
                    return false;

            }

            var interval = new interval_model();

            return do_swipe(direction);

        };

        this.slider = function(options)
        {

            // General checks for options
            if (!vulcan.validation.alpha.is_string(options.name) || 
                !vulcan.validation.numerics.is_integer(options.mode) || 
                !vulcan.validation.numerics.is_integer(options.step) || 
                !vulcan.validation.numerics.is_integer(options.speed) || 
                !vulcan.validation.misc.is_object(options.previous) || 
                !vulcan.validation.alpha.is_string(options.previous.name) || 
                !vulcan.validation.numerics.is_integer(options.previous.mode) || 
                !vulcan.validation.misc.is_object(options.next) || 
                !vulcan.validation.alpha.is_string(options.next.name) || 
                !vulcan.validation.numerics.is_integer(options.next.mode))
                return false;

            var __slider = utils.validate_element(options.name, options.mode),
                __next = utils.validate_element(options.next.name, options.next.mode),
                __previous = utils.validate_element(options.previous.name, options.previous.mode),
                __first_child = __slider.firstChild,
                __last_child = __slider.lastChild,
                __slider_elements_count = __slider.childElementCount,
                __slider_wrapper = document.createElement('div'),
                __pos = null,
                __width = null,
                __height = null;

            // Check for the optional argument: "circular"
            if (!vulcan.validation.misc.is_undefined(options.circular) && !vulcan.validation.misc.is_bool(options.circular))
                return false;

            else
                options.circular = false;

            // Check for the optional argument: "width"
            if (!vulcan.validation.misc.is_undefined(options.width))
            {

                if (!vulcan.validation.numerics.is_integer(options.width))
                    return false;

                __width = options.width;

            }

            else
                __width = __slider.offsetWidth;

            // Check for the optional argument: "height"
            if (!vulcan.validation.misc.is_undefined(options.height))
            {

                if (!vulcan.validation.numerics.is_integer(options.height))
                    return false;

                __height = options.height;

            }

            else
                __height = __slider.offsetHeight;

            // Check for the optional argument: "callback" at previous button
            if (!vulcan.validation.misc.is_undefined(options.previous.callback) && 
                !vulcan.validation.misc.is_function(options.previous.callback))
                return false;

            // Check for the optional argument: "callback" at next button
            if (!vulcan.validation.misc.is_undefined(options.next.callback) && 
                !vulcan.validation.misc.is_function(options.next.callback))
                return false;

            // Slider wrapper style
            __slider_wrapper.className = 'slider_wrapper';
            __slider_wrapper.style.left = 'auto';
            __slider_wrapper.style.right = 'auto';
            __slider_wrapper.style.top = 'auto';
            __slider_wrapper.style.bottom = 'auto';
            __slider_wrapper.style.width = __width + 'px';
            __slider_wrapper.style.height = __height + 'px';
            __slider_wrapper.style.cssFloat = 'left';
            __slider_wrapper.style.overflow = 'hidden';
            __slider_wrapper.style.position = 'relative';
            __slider_wrapper.style.textAlign = 'start';

            // Slider style
            __slider.style.top = '0px';
            __slider.style.left = '0px';
            __slider.style.right = 'auto';
            __slider.style.bottom = 'auto';
            __slider.style.width = (__width * __slider_elements_count) + 'px';
            __slider.style.height = __height + 'px';
            __slider.style.textAlign = 'left';
            __slider.style.cssFloat = 'left';
            __slider.style.margin = '0px';
            __slider.style.position = 'absolute';

            __slider.parentNode.insertBefore(__slider_wrapper, __slider);
            __slider_wrapper.appendChild(__slider);

            // Set children nodes' float to left
            for (var i = 0; i < __slider_elements_count; i++)
                __slider.children[i].style.cssFloat = 'left';

            // Previous button event
            vulcan.events.attach(options.name, __previous, 'click', 
            function()
            {

                var __last_element = __slider.children[__slider_elements_count - 1],
                    __first_element = __slider.children[0];

                // Check for the circular functionality
                if (!options.circular && (__first_element === __first_child))
                    return true;

                __slider.removeChild(__slider.children[__slider_elements_count - 1]);
                __slider.insertBefore(__last_element, __slider.children[0]);

                __slider.style.left = '-' + __width + 'px';

                var __interval = setInterval(function()
                                             {

                                                 __pos = vulcan.graphics.pixels_value(__slider.style.left);

                                                 if (__pos < -options.step)
                                                     __slider.style.left = __pos + options.step + 'px';

                                                 else
                                                 {

                                                     if (__pos === 0)
                                                     {

                                                         clearInterval(__interval);

                                                         if (!vulcan.validation.misc.is_undefined(options.previous.callback))
                                                             options.previous.callback.call();

                                                     }

                                                     else
                                                         __slider.style.left = '0px';

                                                 }

                                             }, options.speed);

            });

            // Next button event
            vulcan.events.attach(options.name, __next, 'click', 
            function()
            {

                var __first_element = __slider.children[0],
                    __negative_width = -__width;

                // Check for the circular functionality
                if (!options.circular && (__first_element === __last_child))
                    return true;

                __slider.style.left = '0px';

                var __interval = setInterval(function()
                                             {

                                                 var __pos = vulcan.graphics.pixels_value(__slider.style.left);

                                                 if (__negative_width + options.step < __pos)
                                                     __slider.style.left = __pos - options.step + 'px';

                                                 else
                                                 {

                                                     if (__pos === __negative_width)
                                                     {

                                                         __slider.removeChild(__slider.children[0]);
                                                         __slider.insertBefore(__first_element, 
                                                                               __slider.children[__slider_elements_count - 2].nextSibling);

                                                         __slider.style.left = '0px';

                                                         clearInterval(__interval);

                                                         if (!vulcan.validation.misc.is_undefined(options.next.callback))
                                                             options.next.callback.call();

                                                    }

                                                    else
                                                        __slider.style.left = __negative_width + 'px';

                                                 }

                                             }, options.speed);

            });

        };

    }

    function visibility()
    {

        this.is_visible = function(name, mode)
        {

            if (is_init === false)
                return false;

            var __element = utils.validate_element(name, mode);

            if (__element === false)
                return false;

            if (__element.style.display === 'none' || __element.style.display === '')
                return false;

            return true;

        };

        this.show = function(name, mode)
        {

            if (is_init === false)
                return false;

            var __element = utils.validate_element(name, mode);

            if (__element === false)
                return false;

            __element.style.display = 'block';

            return true;

        };

        this.hide = function(name, mode)
        {

            if (is_init === false)
                return false;

            var __element = utils.validate_element(name, mode);

            if (__element === false)
                return false;

            __element.style.display = 'none';

            return true;

        };

        this.toggle = function(name, mode)
        {

            if (is_init === false)
                return false;

            var __element = utils.validate_element(name, mode);

            if (__element === false)
                return false;
            
            if (__element.style.display === 'none' || __element.style.display === '')
                __element.style.display = 'block';

            else
                __element.style.display = 'none';

            return true;

        };

    }

    this.init = function(cosmos_object)
    {

        if (is_init === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        vulcan = cosmos_object.hub.access('vulcan');

        is_init = true;

        return true;

    };

    var is_init = false,
        vulcan = null,
        utils = new utilities();

    this.fade = new fade();
    this.opacity = new opacity();
    this.animation = new animation();
    this.visibility = new visibility();

}
