/*
    GreyOS - Event Proxy (Version: 1.0)

    File name: event_proxy.js
    Description: This file contains the Model Proxy - Event proxy module.

    Coded by George Delaportas (G0D)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// Event Proxy
function event_proxy()
{
    var self = this;

    this.execute = function(event_id, context, event)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(event_id) || 
            utils_sys.validation.alpha.is_symbol(context) || 
            utils_sys.validation.alpha.is_symbol(event))
            return false;

        if (any_model)
        {
            var __result = null;

            __result = morpheus.execute(event_id, context, event);

            if (!__result)
            {
                if (backtrace === true)
                    frog('MODEL PROXY', 'Model :: Failed execution', model_id);

                return false;
            }

            if (backtrace === true)
                frog('MODEL PROXY', 'Model :: Successful execution', model_id);

            return __result;
        }

        if (backtrace === true)
            frog('MODEL PROXY', 'Model :: Failed initialization', model_id);

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

        matrix = cosmos.hub.access('matrix');

        morpheus = matrix.get('morpheus');

        return true;
    };

    var backtrace = false, 
        cosmos = null,
        matrix = null,
        morpheus = null,
        utils_sys = new vulcan();
}
