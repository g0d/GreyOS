/*
    GreyOS - Roost (Version: 1.2)

    File name: roost.js
    Description: This file contains the Roost - Bat keeper container module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2022
    Open Software License (OSL 3.0)
*/

// Roost
function roost()
{
    var self = this;

    function bats_model()
    {
        this.max = 10;
        this.num = 0;
        this.list = [];
    }

    this.max = function(num)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(num))
            return bats.max;

        if (!utils_sys.validation.numerics.is_integer(num) || num < 1)
            return false;

        bats.max = num;

        if (backtrace === true)
            frog('ROOST', 'Objects :: Max', num);

        return true;
    };

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return bats.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(index))
            return bats.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (bats.num - 1))
            return false;

        return bats.list[index];
    };

    this.get = function(bat_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (bats.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(bat_id))
            return false;

        for (var i = 0; i < bats.num; i++)
        {
            if (bats.list[i].config().sys_name === bat_id)
            {
                if (backtrace === true)
                    frog('ROOST', 'Objects :: Get', bat_id);

                return bats.list[i];
            }
        }

        return false;
    };

    this.add = function(objects_array)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_array(objects_array))
            return false;

        var __objects_num = objects_array.length;

        if (__objects_num === 0 || (__objects_num > (bats.max - bats.num)))
        {
            if (backtrace === true)
            {
                if (__objects_num === 0)
                    frog('ROOST', 'Objects :: List contains: ', null);
                else
                    frog('ROOST', 'Objects :: Max limit reached: ', bats.max);
            }

            return false;
        }

        for (var i = 0; i < __objects_num; i++)
        {
            if (!self.is_bat(objects_array[i]))
            {
                if (backtrace === true)
                    frog('ROOST', 'Objects :: Invalid', objects_array[i]);

                self.clear();

                return false;
            }

            bats.list.push(objects_array[i]);
            bats.num++;

            if (backtrace === true)
                frog('ROOST', 'Objects :: Addition', objects_array[i].constructor.name);
        }

        if (backtrace === true)
            frog('ROOST', 'All objects', bats.list, 'Object count: ' + bats.num);

        return true;
    };

    this.remove = function(bat_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (bats.num === 0)
            return false;

        if (utils_sys.validation.alpha.is_symbol(bat_id))
            return false;

        for (var i = 0; i < bats.num; i++)
        {
            if (bats.list[i].config().sys_name === bat_id)
            {
                bats.list.splice(i, 1);
                bats.num--;

                if (backtrace === true)
                {
                    frog('ROOST', 'Objects :: Removal', bat_id);
                    frog('ROOST', 'All objects', bats.list, 'Object count: ' + bats.num);
                }

                return true;
            }
        }

        return false;
    };

    this.clear = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (bats.num === 0)
            return false;

        bats.num = 0;
        bats.list = [];

        if (backtrace === true)
            frog('ROOST', 'Objects :: Clear', bats.list);

        return true;
    };

    this.is_bat = function(object)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_object(object))
            return false;

        if (utils_sys.validation.misc.is_undefined(object.init) || 
            utils_sys.validation.misc.is_undefined(object.register) || utils_sys.validation.misc.is_undefined(object.unregister) || 
            utils_sys.validation.misc.is_undefined(object.exec_function) || utils_sys.validation.misc.is_undefined(object.on) || 
            utils_sys.validation.misc.is_undefined(object.config) || utils_sys.validation.misc.is_undefined(object.set_function))
            return false;

        var bat_length = Object.keys(object).length;

        if (bat_length < 9 || bat_length > 9)
            return false;

        return true;
    };

    this.backtrace = function(val)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_bool(val))
            return false;

        backtrace = val;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var backtrace = false,
        cosmos = null,
        bats = new bats_model(),
        utils_sys = new vulcan();
}
