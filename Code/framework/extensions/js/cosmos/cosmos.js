/*

    GreyOS Inc. - Cosmos (JS Inter Model Communication [IMC] hub for GreyOS)
    
    File name: cosmos.js (Version: 1.8)
    Description: This file contains the Cosmos - JS IMC hub extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Cosmos
function cosmos()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.model_exists = function(model)
        {

            if (!vulcan.validation.misc.is_object(model))
                return false;

            for (var n = 0; n < system.attached_models; n++)
            {

                if (system.models[n] === model)
                    return true;

            }

            return false;

        };

        this.model_name = function(model)
        {

            if (!vulcan.validation.misc.is_object(model))
                return false;

            var __model_name = null;

            __model_name = model.constructor.toString().substr(9, model.constructor.toString().indexOf('(') - 9);

            return __model_name;

        };

        this.fetch_model = function(model_name)
        {

            if (!vulcan.validation.alpha.is_string(model_name))
                return false;

            for (var n = 0; n < system.attached_models; n++)
            {

                if (me.model_name(system.models[n]) === model_name)
                {

                    if (system.backtrace === true)
                    {

                        console.log('----- [Fetched Model] -----');
                        console.log(system.models[n]);
                        console.log('---------------------------');
                        console.log('\n\n');

                    }

                    return system.models[n];

                }

            }

            return false;

        };

    }

    function system_model()
    {

        this.backtrace = false;
        this.attached_models = 0;
        this.models = [];

    }

    function status()
    {

        this.backtrace = function()
        {

            if (is_init === false)
               return false;

            return system.backtrace;

        };

        this.models_num = function()
        {

            if (is_init === false)
               return false;

            return system.attached_models;

        };

    }
    
    function hub()
    {

        this.attach = function(objects_array)
        {

            if (is_init === false)
               return false;

            if (!vulcan.validation.misc.is_array(objects_array) || objects_array.length === 0)
                return false;

            var __objects = objects_array.length;

            for (var n = 0; n < __objects; n++)
            {

                if (vulcan.validation.misc.is_object(objects_array[n]))
                {

                    system.models.push(objects_array[n]);

                    system.attached_models++;

                    if (system.backtrace === true)
                    {

                        console.log('----- [Attached Model] -----');
                        console.log(system.models);
                        console.log('----------------------------');
                        console.log('\n\n');
                        console.log('-- [Attached Models Count] --');
                        console.log(system.attached_models);
                        console.log('-----------------------------');
                        console.log('\n\n');

                    }

                }

                else
                    return false;

            }

            return true;

        };

        this.access = function(model_name)
        {

            if (is_init === false)
               return false;

            if (!vulcan.validation.alpha.is_string(model_name))
                return false;

            return utils.fetch_model(model_name);

        };

        this.plugs = function()
        {

            if (is_init === false)
               return false;

            return system.models;

        };

    }

    this.backtrace = function(val)
    {

        if (is_init === false)
           return false;

        if (!vulcan.validation.misc.is_bool(val))
            return false;

        system.backtrace = val;

        return true;

    };

    this.run = function()
    {

        if (is_init === false)
           return false;

        if (system.attached_models === 0)
            return false;

        for (var n = 0; n < system.attached_models; n++)
        {

            if (system.models[n].cosmos === undefined)
                continue;

            system.models[n].cosmos(self);

        }

        return true;

    };

    this.init = function(vulcan_object)
    {

        if (is_init === true)
           return false;

        vulcan = vulcan_object;

        is_init = true;

        return true;

    };

    var is_init = false,
        vulcan = null,
        system = new system_model(),
        utils = new utilities();

    this.hub = new hub();
    this.status = new status();

}
