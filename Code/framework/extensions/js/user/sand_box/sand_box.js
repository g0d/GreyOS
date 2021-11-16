/*
    GreyOS - Sand Box (Version: 1.4)
    
    File name: sand_box.js
    Description: This file contains the Sand Box - Development sand box container & manager module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Sand Box
function sand_box()
{
    var self = this;

    function dev_vms_model()
    {
        this.num = 0;
        this.list = [];
    }

    this.num = function()
    {
        return test_vms.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_undefined(index))
            return test_vms.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (test_vms.num - 1))
            return false;

        return test_vms.list[index];
    };

    this.put = function(cosmos_array)
    {
        if (!utils_sys.validation.misc.is_array(cosmos_array))
            return false;

        var __cosmos_num = cosmos_array.length;

        for (var i = 0; i < __cosmos_num; i++)
        {
            if (!utils_sys.validation.misc.is_object(cosmos_array[i]))
            {
                if (backtrace === true)
                    frog('SAND BOX', 'Objects :: Invalid', cosmos_array[i]);

                self.clear();

                return false;
            }

            test_vms.list.push(cosmos_array[i]);
            test_vms.num++;

            if (backtrace === true)
                frog('SAND BOX', 'Objects :: Put', cosmos_array[i].id());
        }

        return true;
    };

    this.clear = function()
    {
        if (test_vms.num === 0)
            return false;

        test_vms.num = 0;
        test_vms.list = [];

        if (backtrace === true)
            frog('SAND BOX', 'Models :: Clear', test_vms.list);

        return true;
    };

    this.execute = function()
    {
        if (test_vms.num === 0)
            return false;

        for (var i = 0; i < test_vms.num; i++)
            test_vms.list[i].run();

        return true;
    };

    this.backtrace = function(val)
    {
        if (!utils_sys.validation.misc.is_bool(val))
            return false;

        backtrace = val;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (cosmos_object === undefined)
            return false;

        return true;
    };

    var backtrace = false, 
        utils_sys = new vulcan(),
        test_vms = new dev_vms_model();
}
