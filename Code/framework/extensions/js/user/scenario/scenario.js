/*
    GreyOS - Scenario (Version: 1.5)
    
    File name: scenario.js
    Description: This file contains the Scenario - Scenario-based loader & manager module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Scenario
function scenario()
{
    var self = this;

    function scripts_model()
    {
        this.num = 0;
        this.list = [];
    }

    function utilities()
    {
        this.is_indices_array = function(indices_array)
        {
            if (!utils_sys.validation.misc.is_array(indices_array))
                return false;

            var __indices_num = indices_array.length;

            if (__indices_num === 0 || indices_array.length > scripts.num)
                return false;

            for (var i = 0; i < indices_array.length; i++)
            {
                if (!utils_sys.validation.numerics.is_integer(indices_array[i]))
                    return false;
            }

            return true;
        };

        this.script_exists = function(script)
        {
            for (var i = 0; i < scripts.num; i++)
            {
                if (scripts.list[i] === script)
                    return true;
            }

            return false;
        };
    }

    this.num = function()
    {
        return scripts.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_undefined(index))
            return scripts.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (scripts.num - 1))
            return false;

        return scripts.list[index];
    };

    this.use = function(scripts_array)
    {
        if (!utils_sys.validation.misc.is_array(scripts_array))
            return false;

        var __scripts_num = scripts_array.length;

        if (__scripts_num === 0)
            return false;

        for (var i = 0; i < __scripts_num; i++)
        {
            if (!utils_sys.validation.misc.is_function(scripts_array[i]))
            {
                if (backtrace === true)
                    frog('SCENARIO', 'Scripts :: Invalid', scripts_array[i]);

                self.clear();

                return false;
            }

            if (utils_int.script_exists(scripts_array[i]))
            {
                if (backtrace === true)
                    frog('SCENARIO', 'Scripts :: Duplication', scripts_array[i]);

                self.clear();

                return false;
            }

            scripts.list.push(scripts_array[i]);
            scripts.num++;

            if (backtrace === true)
                frog('SCENARIO', 'Scripts :: Addition', scripts_array[i]);
        }

        if (backtrace === true)
            frog('SCENARIO', 'All scripts', scripts.list, 'Script count: ' + scripts.num);

        return true;
    };

    this.clear = function()
    {
        if (scripts.num === 0)
            return false;

        scripts.num = 0;
        scripts.list = [];

        if (backtrace === true)
            frog('SCENARIO', 'Scripts :: Clear', scripts.list);

        return true;
    };

    this.execute = function(indices_array)
    {
        if (scripts.num === 0)
            return false;

        if (utils_sys.validation.misc.is_undefined(indices_array))
        {
            for (var i = 0; i < scripts.num; i++)
                scripts.list[i].call();

            return true;
        }

        if (!utils_int.is_indices_array(indices_array))
            return false;

        for (var i = 0; i < indices_array.length; i++)
            scripts.list[indices_array[i]].call();

        return true;
    };

    this.backtrace = function(val)
    {
        if (!utils_sys.validation.misc.is_bool(val))
            return false;

        backtrace = val;

        return true;
    };

    var backtrace = false, 
        utils_sys = new vulcan(),
        scripts = new scripts_model(),
        utils_int = new utilities();
}
