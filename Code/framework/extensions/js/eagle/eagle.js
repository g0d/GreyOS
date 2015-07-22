/*

    GreyOS Inc. - Eagle (Alt-Tab support for Bees in GreyOS)
    
    File name: eagle.js (Version: 1.2)
    Description: This file contains the Eagle - Alt-Tab support for Bees extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Eagle
function eagle()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.scan_keys = function(event_object)
        {

            if (vulcan.validation.misc.is_undefined(event_object.keyCode))
                return event_object.key;

            else
                return event_object.keyCode;

        };

        this.key_down_tracer = function(event_object)
        {

            var __key_code = me.scan_keys(event_object);

            if (trace_keys.modifier === __key_code)
            {

                event_object.preventDefault();

                trace_keys.modifier_set = true;

            }

            if (trace_keys.trigger === __key_code && trace_keys.modifier_set === true)
            {

                event_object.preventDefault();

                trace_keys.modifier_set = false;
                trace_keys.trigger_set = true;

                me.show_eagle();

            }

            return true;

        };

        this.key_up_tracer = function(event_object)
        {

            var __key_code = me.scan_keys(event_object);

            if (trace_keys.trigger === __key_code)
            {

                trace_keys.modifier_set = false;
                trace_keys.trigger_set = false;

                me.hide_eagle();
                
            }

            return true;

        };

        this.draw_eagle = function()
        {

            

            return true;

        };

        this.show_eagle = function()
        {

            alert('EAGLE SHOW!');

            return true;

        };

        this.hide_eagle = function()
        {

            alert('EAGLE HIDE!');

            return true;

        };

        this.init_trace_keys = function()
        {

            vulcan.events.attach('eagle', document, 'keydown', function(event) { me.key_down_tracer(event); });
            vulcan.events.attach('eagle', document, 'keyup', function(event) { me.key_up_tracer(event); });

            return true;

        };

    }

    function trace_keys_model()
    {

        this.modifier = 18;
        this.trigger = 9;
        this.modifier_set = false;
        this.trigger_set = false;

    }

    function status()
    {

        function trace_keys()
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

            this.modifier = new modifier();
            this.trigger = new trigger();

        }

        this.trace_keys = new trace_keys();

    }

    this.init = function(modifier, trigger)
    {

        if (is_init === true)
            return false;

        is_init = true;

        if (!vulcan.validation.misc.is_undefined(modifier) && !vulcan.validation.misc.is_undefined(trigger))
        {

            if (!vulcan.validation.numerics.is_integer(modifier) || modifier < 8 || modifier > 222 ||
                !vulcan.validation.numerics.is_integer(trigger) || trigger < 8 || trigger > 222)
            {

                is_init = false;

                return false;

            }

            trace_keys.modifier = modifier;
            trace_keys.trigger = trigger;

        }

        utils.init_trace_keys();

        return true;

    };

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        trace_keys = new trace_keys_model(),
        utils = new utilities();

    this.status = new status();

}
