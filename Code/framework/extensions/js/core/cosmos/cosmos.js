/*
    GreyOS - Cosmos (Version: 2.2)

    File name: cosmos.js
    Description: This file contains the Cosmos - JS IMC hub module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Cosmos
function cosmos()
{
    var self = this;

    function system_model()
    {
        this.id = 'cosmos_' + random.generate();
        this.backtrace = false;
        this.models_num = 0;
        this.models = [];
    }

    function cosmos_ref_model()
    {
        this.id = function()
        {
            return self.id();
        };

        this.hub = self.hub;
        this.status = self.status;
    }

    function utilities()
    {
        var me = this;

        this.model_exists = function(model)
        {
            if (!utils_sys.validation.misc.is_object(model))
                return false;

            for (var i = 0; i < system.models_num; i++)
            {
                if (system.models[i].constructor.name === model.constructor.name)
                    return true;
            }

            return false;
        };

        this.model_name = function(model)
        {
            if (!utils_sys.validation.misc.is_object(model))
                return false;

            return model.constructor.name;
        };

        this.fetch_model = function(model_name)
        {
            if (!utils_sys.validation.alpha.is_string(model_name))
                return false;

            for (var i = 0; i < system.models_num; i++)
            {
                if (me.model_name(system.models[i]) === model_name)
                {
                    if (system.backtrace === true)
                        frog('COSMOS', 'Models :: Fetch', model_name);

                    return system.models[i];
                }
            }

            return false;
        };
    }

    function status()
    {
        this.backtrace = function()
        {
            return system.backtrace;
        };

        this.models_num = function()
        {
            return system.models_num;
        };
    }

    function hub()
    {
        this.attach = function(models_array)
        {
            if (!utils_sys.validation.misc.is_array(models_array) || models_array.length === 0)
                return false;

            var __models_num = models_array.length;

            if (__models_num === 0)
                return false;

            for (var i = 0; i < __models_num; i++)
            {
                if (!utils_sys.validation.misc.is_function(models_array[i]))
                {
                    if (backtrace === true)
                        frog('COSMOS', 'Models :: Invalid', models_array[i]);

                    self.hub.clear();

                    return false;
                }

                var __object_model = new models_array[i]();

                if (utils_int.model_exists(__object_model))
                {
                    if (system.backtrace === true)
                        frog('COSMOS', 'Models :: Duplication', __object_model.constructor.name);

                    self.hub.clear();

                    return false;
                }

                system.models.push(__object_model);
                system.models_num++;

                if (system.backtrace === true)
                    frog('COSMOS', 'Models :: Attachment', __object_model.constructor.name);
            }

            var __cosmos_ref = new cosmos_ref_model();

            for (var i = 0; i < system.models_num; i++)
                system.models[i].cosmos(__cosmos_ref);

            if (system.backtrace === true)
                frog('COSMOS', 'All models', system.models, 'Model count: ' + system.models_num);

            return true;
        };

        this.access = function(model_name)
        {
            if (!utils_sys.validation.alpha.is_string(model_name))
                return false;

            return utils_int.fetch_model(model_name);
        };

        this.containers = function()
        {
            return system.models;
        };

        this.clear = function()
        {
            if (system.models_num === 0)
                return false;
    
            system.models_num = 0;
            system.models = [];

            if (system.backtrace === true)
                frog('COSMOS', 'Models :: Clear', system.models);

            return true;
        };
    }

    this.id = function()
    {
        return system.id;
    };

    this.backtrace = function(val)
    {
        if (!utils_sys.validation.misc.is_bool(val))
            return false;

        system.backtrace = val;

        return true;
    };

    var utils_sys = new vulcan(),
        random = new pythia(),
        system = new system_model(),
        utils_int = new utilities();

    this.hub = new hub();
    this.status = new status();
}
