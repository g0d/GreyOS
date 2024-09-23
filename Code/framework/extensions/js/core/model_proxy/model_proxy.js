/*
    GreyOS - Model Proxy (Version: 1.0)

    File name: model_proxy.js
    Description: This file contains the Model Proxy - Model proxy development module.

    Coded by George Delaportas (G0D)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// Model Proxy
function model_proxy()
{
    var self = this;

    this.execute = function(model_id, command)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(model_id) || utils_sys.validation.misc.is_symbol(command))
            return false;

        var __dynamic_model = matrix.get(model_id),
            __result = null;

        if (!__dynamic_model)
        {
            if (backtrace === true)
                frog('MODEL PROXY', 'Model :: Failed initialization', model_id);

            return false;
        }

        __result = eval(__dynamic_model + '.' + command);

        if (!__result)
        {
            if (backtrace === true)
                frog('MODEL PROXY', 'Model :: Failed execution', model_id);

            return false;
        }

        if (backtrace === true)
            frog('MODEL PROXY', 'Model :: Successful execution', model_id);

        return __result;
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

        matrix = cosmos.hub.access('matrix');

        return true;
    };

    var backtrace = false, 
        cosmos = null,
        matrix = null,
        utils_sys = new vulcan();
}
