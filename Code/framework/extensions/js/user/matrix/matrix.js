/*
    GreyOS - Matrix (Version: 1.4)
    
    File name: matrix.js
    Description: This file contains the Matrix - System services container module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Matrix
function matrix()
{
    var self = this;

    function services_model()
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

            for (var i = 0; i < services.num; i++)
            {
                if (services.list[i].constructor.name === model.constructor.name)
                    return true;
            }

            return false;
        };
    }

    this.num = function()
    {
        if (cosmos === null)
            return false;

        return services.num;
    };

    this.list = function(index)
    {
        if (cosmos === null)
            return false;

        if (utils_sys.validation.misc.is_undefined(index))
            return services.list;

        if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (services.num - 1))
            return false;

        return services.list[index];
    };

    this.get = function(service_id)
    {
        if (cosmos === null)
            return false;

        if (services.num === 0)
            return null;

        if (utils_sys.validation.alpha.is_symbol(service_id))
            return false;

        for (var i = 0; i < services.num; i++)
        {
            if (services.list[i].constructor.name === service_id)
            {
                if (backtrace === true)
                    frog('MATRIX', 'Models :: Get', service_id);

                return services.list[i];
            }
        }

        return false;
    };

    this.put = function(models_array)
    {
        if (cosmos === null)
            return false;

        if (!utils_sys.validation.misc.is_array(models_array))
            return false;

        var __models_num = models_array.length;

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

            services.list.push(__object_model);
            services.num++;

            if (backtrace === true)
                frog('MATRIX', 'Models :: Put', __object_model.constructor.name);
        }

        for (var i = 0; i < services.num; i++)
            services.list[i].cosmos(cosmos);

        if (backtrace === true)
            frog('MATRIX', 'All models', services.list, 'Model count: ' + services.num);

        return true;
    };

    this.clear = function()
    {
        if (cosmos === null)
            return false;

        if (services.num === 0)
            return false;

        services.num = 0;
        services.list = [];

        if (backtrace === true)
            frog('MATRIX', 'Models :: Clear', services.list);
    
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

        cosmos = cosmos_object;

        return true;
    };

    var backtrace = false,
        cosmos = null,
        utils_sys = new vulcan(),
        services = new services_model(),
        utils_int = new utilities();
}