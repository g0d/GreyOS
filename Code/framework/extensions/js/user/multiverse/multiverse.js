/*
    GreyOS - Multiverse (Version: 1.4)

    File name: multiverse.js
    Description: This file contains the Multiverse - Cosmos container & manager module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Multiverse
function multiverse()
{
    var self = this;

    function universe_bubbles()
    {
        this.num = 0;
        this.list = [];
    }

    function utilities()
    {
        this.is_cosmos = function(object)
        {
            if (!utils_sys.validation.misc.is_object(object))
                return false;

            if (utils_sys.validation.misc.is_undefined(object.id) || utils_sys.validation.misc.is_undefined(object.backtrace) || 
                utils_sys.validation.misc.is_undefined(object.hub) || utils_sys.validation.misc.is_undefined(object.status))
                return false;

            return true;
        };
    }

    this.num = function()
    {
        return bubbles.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_undefined(index))
            return bubbles.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (bubbles.num - 1))
            return false;

        return bubbles.list[index];
    };

    this.add = function(cosmos_array)
    {
        if (!utils_sys.validation.misc.is_array(cosmos_array))
            return false;

        var __cosmos_num = cosmos_array.length;

        if (__cosmos_num === 0)
            return false;

        for (var i = 0; i < __cosmos_num; i++)
        {
            if (!utils_int.is_cosmos(cosmos_array[i]))
            {
                if (backtrace === true)
                    frog('MULTIVERSE', 'Models :: Invalid', cosmos_array[i]);

                self.clear();

                return false;
            }

            bubbles.list.push(cosmos_array[i]);
            bubbles.num++;

            if (backtrace === true)
                frog('MULTIVERSE', 'Models :: Addition', cosmos_array[i].id());

        }

        if (backtrace === true)
            frog('MULTIVERSE', 'All models', bubbles.list, 'Model count: ' + bubbles.num);

        return true;
    };

    this.remove = function(cosmos_id)
    {
        if (utils_sys.validation.alpha.is_symbol(cosmos_id))
            return false;

        for (var i = 0; i < bubbles.num; i++)
        {
            var temp_obj = new bubbles.list[i];

            if (temp_obj.id() === cosmos_id)
            {
                bubbles.list.splice(i, 1);
                bubbles.num--;

                if (backtrace === true)
                {
                    frog('MULTIVERSE', 'Models :: Removal', cosmos_id);
                    frog('MULTIVERSE', 'All models', bubbles.list, 'Model count: ' + bubbles.num);
                }

                return true;
            }
        }

        return false;
    };

    this.clear = function()
    {
        if (bubbles.num === 0)
            return false;

        bubbles.num = 0;
        bubbles.list = [];

        if (backtrace === true)
            frog('MULTIVERSE', 'Models :: Clear', bubbles.list);

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
        bubbles = new universe_bubbles(),
        utils_int = new utilities();
}
