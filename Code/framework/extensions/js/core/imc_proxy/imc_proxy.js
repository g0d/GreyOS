/*
    GreyOS - IMC Proxy (Version: 1.0)

    File name: imc_proxy.js
    Description: This file contains the IMC Proxy - Inter-Model Communication proxy system module.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// IMC Proxy
function imc_proxy()
{
    var self = this;

    this.execute = function(model_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(model_id))
            return false;

        var __dynamic_model = matrix.get(model_id);

        if (!__dynamic_model)
        {
            if (backtrace === true)
                frog('IMC PROXY', 'Model :: Failed initialization', model_id);

            return false;
        }

        if (backtrace === true)
            frog('IMC PROXY', 'Model :: Successful initialization', model_id);

        return __dynamic_model;
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
