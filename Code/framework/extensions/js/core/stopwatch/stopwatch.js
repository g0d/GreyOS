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
        if (!is_on)
            return;

        clearTimeout(timer_handler);

        callback.call(this, self);

        if (is_one_shot)
        {
            is_on = false;

            return;
        }

        delay += interval;
        diff = (new Date().getTime() - init_time) - delay;

        timer_handler = setTimeout(function() { instance(interval, callback); }, (interval - diff));
    }

    this.start = function(interval, callback, run_once)
    {
        if (is_on)
            return false;

        if (!utils.validation.numerics.is_integer(interval) || interval < 1 || 
            !utils.validation.misc.is_function(callback) || 
            (!utils.validation.misc.is_undefined(run_once) && !utils.validation.misc.is_bool(run_once)))
            return false;

        timer_handler = setTimeout(function() { instance(interval, callback); }, interval);

        is_on = true;
        is_one_shot = run_once;

        return true;
    };

    this.stop = function()
    {
        if (!is_on)
            return false;

        clearTimeout(timer_handler);

        is_on = false;

        return true;
    };

    var self = this,
        is_on = false,
        is_one_shot = false,
        init_time = new Date().getTime(),
        delay = 0,
        diff = 0,
        timer_handler = null,
        utils = new vulcan();
}
