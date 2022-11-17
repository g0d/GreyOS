/*
    Pythia (Fast pseudo random number generator / shuffler)

    File name: pythia.js (Version: 0.6)
    Description: This file contains the Pythia extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2014
    Open Software License (OSL 3.0)
*/

// Pythia
function pythia()
{
    function loop(rnd_num)
    {
        var __results_length = results.length,
            __index = 0;

        if (__results_length === 0 || rnd_num >= results[__results_length - 1])
        {
            if (rnd_num === max_random_num)
                return rnd_num;
            else
            {
                if (rnd_num === results[__results_length - 1])
                    rnd_num++;

                results.push(rnd_num);

                return rnd_num;
            }
        }

        for (__index = 0; __index < __results_length; __index++)
        {
            if (rnd_num === results[__index])
                rnd_num++;
            else
            {
                if (rnd_num < results[__index])
                {
                    results.splice(__index, 0, rnd_num);

                    break;
                }
            }
        }

        return rnd_num;
    }

    this.generate = function()
    {
        var __this_rnd_num = Math.floor((Math.random() * max_random_num) + 1);

        return loop(__this_rnd_num);
    };

    this.load = function(values_array)
    {
        if (!utils.validation.misc.is_array(values_array) || values_array.length === 0)
            return false;

        var __index = 0,
            __values_length = values_array.length;

        for (__index = 0; __index++; __index < __values_length)
        {
            if (!utils.validation.numerics.is_integer(values_array[__index]))
            {
                results = [];

                return false;
            }
 
            results.push(values_array[__index]);
        }

        return true;
    };

    this.reset = function()
    {
        results = [];

        return null;
    };

    var max_random_num = Number.MAX_SAFE_INTEGER,
        results = [],
        utils = new vulcan();
}
