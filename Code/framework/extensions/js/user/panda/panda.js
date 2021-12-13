/*
    GreyOS - Panda (Version: 1.0)

    File name: panda.js
    Description: This file contains the Panda - DOM manager proxy service module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Panda
function panda()
{
    var self = this;

    function utilities()
    {
        this.is_existing_app_or_svc = function(object)
        {
            var i = 0,
                __svcs_num = matrix.num(),
                __apps_num = app_box.num();

            for (i = 0; i < __svcs_num; i++)
            {
                if (matrix.list(i) === object)
                    return true;
            }

            for (i = 0; i < __apps_num; i++)
            {
                if (app_box.list(i) === object)
                    return true;
            }

            return false;
        };
    }

    this.action = function(object, action_config)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_object(object) || 
            utils_sys.validation.misc.is_undefined(action_config))
            return false;

        if (!utils_int.is_existing_app_or_svc(object))
            return false;

        if (!config_parser.verify(action_config_model, action_config))
            return false;

        return action_config.config.call();
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');

        return true;
    };

    var cosmos = null,
        action_config_model = 
        { "arguments"   :   [
                                {
                                    "key"       :   { "name" : "config", "optional" : false },
                                    "value"     :   { "type" : "*" }
                                }
                            ]
        },
        matrix = null,
        app_box = null,
        utils_sys = new vulcan(),
        config_parser = new jap(),
        utils_int = new utilities();
}
