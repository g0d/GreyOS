/*
    Snail (CPU speed benchmarking utility)

    File name: snail.js (Version: 1.3)
    Description: This file contains the Snail extension.
    Dependencies: Vulcan and Centurion.

    Coded by George Delaportas (G0D)
    Copyright (c) 2014
    Open Software License (OSL 3.0)
*/

// Snail
function snail()
{
    this.test = function(loops)
    {
        if (!utils.validation.misc.is_undefined(loops) && (!utils.validation.numerics.is_integer(loops) || loops < 1))
            return false;

        if (utils.validation.misc.is_undefined(loops))
            loops = 100000000;

        performance.benchmark.start();

        while (loops >= 0)
            loops--;

        performance.benchmark.end();

        __benchmark_index = performance.benchmark.latency();

        return true;
    };

    this.index = function()
    {
        if (__benchmark_index === -1)
            return false;

        return __benchmark_index;
    };

    var __benchmark_index = -1,
        performance = new centurion(),
        utils = new vulcan();
}
