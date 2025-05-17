/*
    GreyOS - Matrix (Version: 1.8)

    File name: matrix.js
    Description: This file contains the Matrix - System components container module.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Matrix
function matrix()
{
    var self = this;

    function components_model()
    {
        this.num = 0;
        this.list = [];
    }

    function utilities()
    {
        var me = this;

        this.model_exists = function(model)
        {
            if (!utils_sys.validation.misc.is_object(model))
                return false;

            for (var i = 0; i < components.num; i++)
            {
                if (components.list[i].constructor.name === model.constructor.name)
                    return true;
            }

            return false;
        };
    }

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return components.num;
    };

    this.list = function(index)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(index))
            return components.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (components.num - 1))
            return false;

        return components.list[index];
    };

    this.get = function(component_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (components.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(component_id))
            return false;

        for (var i = 0; i < components.num; i++)
        {
            if (components.list[i].constructor.name === component_id)
            {
                if (backtrace === true)
                    frog('MATRIX', 'Models :: Get', component_id);

                components.list[i].cosmos(cosmos);

                return components.list[i];
            }
        }

        return false;
    };

    this.register = function(models_array)
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
                    frog('MATRIX', 'Models :: Invalid', models_array[i]);

                self.clear();

                return false;
            }

            var __object_model = new models_array[i]();

            if (utils_int.model_exists(__object_model))
            {
                if (backtrace === true)
                    frog('MATRIX', 'Models :: Duplication', __object_model.constructor.name);

                self.clear();

                return false;
            }

            components.list.push(__object_model);
            components.num++;

            if (backtrace === true)
                frog('MATRIX', 'Models :: Register', __object_model.constructor.name);
        }

        if (backtrace === true)
            frog('MATRIX', 'All models', components.list, 'Model count: ' + components.num);

        return true;
    };

    this.unregister = function(component_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(component_id))
            return false;

        for (var i = 0; i < components.num; i++)
        {
            if (components.list[i].constructor.name === component_id)
            {
                components.list.splice(i, 1);
                components.num--;

                if (backtrace === true)
                {
                    frog('MATRIX', 'Models :: Unregister', component_id);
                    frog('MATRIX', 'All models', components.list, 'Model count: ' + components.num);
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

        if (components.num === 0)
            return false;

        components.num = 0;
        components.list = [];

        if (backtrace === true)
            frog('MATRIX', 'Models :: Clear', components.list);
    
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
        components = new components_model(),
        utils_int = new utilities();
}
