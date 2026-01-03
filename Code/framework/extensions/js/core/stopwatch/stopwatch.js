/*
    Stopwatch (High precision timer for JS)

    File name: stopwatch.js (Version: 0.7)
    Description: This file contains the Stopwatch extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright (C) 2017 - 2026
    Open Software License (OSL 3.0)
*/

// Stopwatch (High precision timer)
function stopwatch()
{
    function config_model()
    {
        this.interval = null;
        this.callback = null;
        this.run_once = null;
    }

    function instance(interval, callback)
    {
        if (!is_on)
            return;

        clearTimeout(timer_handler);

        callback.call(this, self);

        if (config.run_once)
        {
            is_on = false;

            return;
        }

        delay += interval;
        diff = (new Date().getTime() - init_time) - delay;

        timer_handler = setTimeout(function() { instance(interval, callback); }, (interval - diff));
    }

    this.start = function(interval = null, callback = null, run_once = null)
    {
        if (is_on)
            return false;

        if (config.interval !== null && interval === null && callback === null && run_once === null)
            timer_handler = setTimeout(function() { instance(config.interval, config.callback); }, config.interval);
        else
        {
            if (!utils.validation.numerics.is_integer(interval) || interval < 1 || 
                !utils.validation.misc.is_function(callback) || 
                (!utils.validation.misc.is_undefined(run_once) && !utils.validation.misc.is_bool(run_once)))
                return false;

            config.interval = interval;
            config.callback = callback;
            config.run_once = run_once;

            timer_handler = setTimeout(function() { instance(config.interval, config.callback); }, config.interval);
        }

        is_on = true;

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
        init_time = new Date().getTime(),
        delay = 0,
        diff = 0,
        timer_handler = null,
        config = new config_model(),
        utils = new vulcan();
}
