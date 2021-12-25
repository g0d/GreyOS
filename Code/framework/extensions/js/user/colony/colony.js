/*
    GreyOS - Colony (Version: 2.6)

    File name: colony.js
    Description: This file contains the Colony - Bee keeper container module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Colony
function colony()
{
    var self = this;

    function bees_model()
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
            return bees.max;

        if (!utils_sys.validation.numerics.is_integer(num) || num < 1)
            return false;

        bees.max = num;

        if (backtrace === true)
            frog('COLONY', 'Objects :: Max', num);

        return true;
    };

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return bees.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(index))
            return bees.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (bees.num - 1))
            return false;

        return bees.list[index];
    };

    this.get = function(bee_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (bees.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(bee_id))
            return false;

        for (var i = 0; i < bees.num; i++)
        {
            if (bees.list[i].settings.general.id() === bee_id)
            {
                if (backtrace === true)
                    frog('COLONY', 'Objects :: Get', bee_id);

                return bees.list[i];
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

        if (__objects_num === 0 || (__objects_num > (bees.max - bees.num)))
            return false;

        for (var i = 0; i < __objects_num; i++)
        {
            if (!self.is_bee(objects_array[i]))
            {
                if (backtrace === true)
                    frog('COLONY', 'Objects :: Invalid', objects_array[i]);

                self.clear();

                return false;
            }

            var __app_id = objects_array[i].settings.general.app_id();

            if (self.is_single_instance(__app_id))
            {
                if (backtrace === true)
                    frog('COLONY', 'Objects :: Duplication', __app_id);

                return false;
            }

            bees.list.push(objects_array[i]);
            bees.num++;

            if (backtrace === true)
                frog('COLONY', 'Objects :: Addition', objects_array[i].constructor.name);
        }

        if (backtrace === true)
            frog('COLONY', 'All objects', bees.list, 'Object count: ' + bees.num);

        return true;
    };

    this.remove = function(bee_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (bees.num === 0)
            return false;

        if (utils_sys.validation.alpha.is_symbol(bee_id))
            return false;

        for (var i = 0; i < bees.num; i++)
        {
            if (bees.list[i].settings.general.id() === bee_id)
            {
                bees.list.splice(i, 1);
                bees.num--;

                if (backtrace === true)
                {
                    frog('COLONY', 'Objects :: Removal', bee_id);
                    frog('COLONY', 'All objects', bees.list, 'Object count: ' + bees.num);
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

        if (bees.num === 0)
            return false;

        bees.num = 0;
        bees.list = [];

        if (backtrace === true)
            frog('COLONY', 'Objects :: Clear', bees.list);

        return true;
    };

    this.is_bee = function(object)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_object(object))
            return false;

        if (utils_sys.validation.misc.is_undefined(object.init) || utils_sys.validation.misc.is_undefined(object.run) || 
            utils_sys.validation.misc.is_undefined(object.on) || utils_sys.validation.misc.is_undefined(object.settings) || 
            utils_sys.validation.misc.is_undefined(object.gui) || utils_sys.validation.misc.is_undefined(object.status) || 
            utils_sys.validation.misc.is_undefined(object.drone))
            return false;

        var bee_length = Object.keys(object).length;

        if (bee_length < 9 || bee_length > 9)
            return false;

        return true;
    };

    this.is_single_instance = function(app_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (bees.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(app_id))
            return false;

        for (var i = 0; i < bees.num; i++)
        {
            if (bees.list[i].settings.general.app_id() === app_id && bees.list[i].settings.general.single_instance())
                return true;
        }

        return false;
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
        bees = new bees_model(),
        utils_sys = new vulcan();
}
