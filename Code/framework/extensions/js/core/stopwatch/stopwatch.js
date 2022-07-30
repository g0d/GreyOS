/*
    Stopwatch (High precision timer for JS)

    File name: stopwatch.js (Version: 0.6)
    Description: This file contains the Stopwatch extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D)
    Copyright (C) 2017
    Open Software License (OSL 3.0)
*/

// Stopwatch (High precision timer)
function stopwatch()
{
    function instance(interval, callback)
    {
        if (!__is_on)
            return;

        clearTimeout(__timer_handler);

        callback.call(this, self);

        if (__is_one_shot)
        {
            __is_on = false;

            return;
        }

        __delay += interval;
        __diff = (new Date().getTime() - __init_time) - __delay;

        __timer_handler = setTimeout(function() { instance(interval, callback); }, (interval - __diff));
    }

    this.start = function(interval, callback, run_once)
    {
        if (__is_on)
            return false;

        if (!utils.validation.numerics.is_integer(interval) || interval < 1 || 
            !utils.validation.misc.is_function(callback) || 
            (!utils.validation.misc.is_undefined(run_once) && !utils.validation.misc.is_bool(run_once)))
            return false;

        __timer_handler = setTimeout(function() { instance(interval, callback); }, interval);

        __is_on = true;
        __is_one_shot = run_once;

        return true;
    };

    this.stop = function()
    {
        if (!__is_on)
            return false;

        clearTimeout(__timer_handler);

        __is_on = false;

        return true;
    };

    var self = this,
        __is_on = false,
        __is_one_shot = false,
        __init_time = new Date().getTime(),
        __delay = 0,
        __diff = 0,
        __timer_handler = null,
        utils = new vulcan();
}
