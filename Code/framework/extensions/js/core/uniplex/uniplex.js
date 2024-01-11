/*
    GreyOS - Uniplex (Version: 1.0)

    File name: uniplex.js
    Description: This file contains the Uniplex - User programs inter-communication (UPIC) module.

    Coded by George Delaportas (G0D)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// Uniplex
function uniplex()
{
    var self = this;

    function programs_collection_model()
    {
        this.num = 0;
        this.list = [];
    }

    this.expose = function(api_calls_config)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_object(api_calls_config) || 
            !api_calls_config.hasOwnProperty('program_id') || 
            !utils_sys.validation.alpha.is_string(api_calls_config.program_id) || 
            !api_calls_config.hasOwnProperty('calls') || 
            !utils_sys.validation.misc.is_array(api_calls_config.calls))
            return false;

        programs_collection.num += 1;
        programs_collection.list.push(api_calls_config);

        return true;
    };

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return programs_collection.num;
    };

    this.list = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return programs_collection.list;
    };

    this.clear = function(program_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_nothing(program_id))
            return false;

        var __index = 0,
            __api_call = null;

        for (__api_call of programs_collection.list)
        {
            if (__api_call.program_id === program_id)
            {
                programs_collection.num -= 1;
                programs_collection.list.splice(__index, 1);

                return true;
            }

            __index++;
        }

        return false;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var cosmos = null,
        utils_sys = new vulcan(),
        programs_collection = new programs_collection_model();
}
