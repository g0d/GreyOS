/*
    GreyOS - Dev Box (Version: 1.4)
    
    File name: dev_box.js
    Description: This file contains the Dev Box - Development tools container module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Dev Box
function dev_box()
{
    var self = this;

    function tool_box_model()
    {
        this.num = 0;
        this.list = [];
    }

    function utilities()
    {
        this.model_exists = function(model)
        {
            if (!utils_sys.validation.misc.is_object(model))
                return false;

            for (var i = 0; i < tools.num; i++)
            {
                if (tools.list[i].constructor.name === model.constructor.name)
                    return true;
            }

            return false;
        };
    }

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return tools.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(index))
            return tools.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (tools.num - 1))
            return false;

        return tools.list[index];
    };

    this.get = function(tool_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (tools.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(tool_id))
            return false;

        for (var i = 0; i < tools.num; i++)
        {
            if (tools.list[i].constructor.name === tool_id)
            {
                var __new_tool = new tools.list[i].constructor();

                __new_tool.cosmos(cosmos);

                if (backtrace === true)
                    frog('DEV BOX', 'Models :: Get', tool_id);

                return __new_tool;
            }   
        }

        return false;
    };

    this.add = function(models_array)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_array(models_array))
            return false;

        var __models_num = models_array.length;

        if (__models_num === 0)
            return false;

        for (var i = 0; i < __models_num; i++)
        {
            if (!utils_sys.validation.misc.is_function(models_array[i]))
            {
                if (backtrace === true)
                    frog('DEV BOX', 'Models :: Invalid', models_array[i]);

                self.clear();

                return false;
            }

            var __object_model = new models_array[i]();

            if (utils_int.model_exists(__object_model))
            {
                if (backtrace === true)
                    frog('DEV BOX', 'Models :: Duplication', __object_model.constructor.name);

                self.clear();

                return false;
            }

            tools.list.push(__object_model);
            tools.num++;

            if (backtrace === true)
                frog('DEV BOX', 'Models :: Addition', __object_model.constructor.name);
        }

        if (backtrace === true)
            frog('DEV BOX', 'All models', tools.list, 'Model count: ' + tools.num);

        return true;
    };

    this.remove = function(tool_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(tool_id))
            return false;

        for (var i = 0; i < tools.num; i++)
        {
            if (tools.list[i].constructor.name === tool_id)
            {
                tools.list.splice(i, 1);
                tools.num--;

                if (backtrace === true)
                {
                    frog('DEV BOX', 'Models :: Removal', tool_id);
                    frog('DEV BOX', 'All models', tools.list, 'Model count: ' + tools.num);
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

        if (tools.num === 0)
            return false;

        tools.num = 0;
        tools.list = [];

        if (backtrace === true)
            frog('DEV BOX', 'Models :: Clear', tools.list);

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
        utils_sys = new vulcan(),
        tools = new tool_box_model(),
        utils_int = new utilities();
}
