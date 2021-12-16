/*
    GreyOS - Meta-Parser (Version: 1.0)

    File name: meta_parser.js
    Description: This file contains the Meta-Parser - Meta scripting language parser interface module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Meta-Parser
function meta_parser()
{
    var self = this;

    function utilities()
    {
        this.parse = function(program_config)
        {
            // 1. Use eval
            // 2. Restrict: document, window & navigator
            // 3. Run

            return true;
        };
    }

    this.execute = function(program_config)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(program_config))
            return false;

        if (!program_parser.verify(program_config_model, program_config))
            return false;

        return utils_int.parse(program_config);
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
        matrix = null,
        app_box = null,
        program_config_model = null,
        utils_sys = new vulcan(),
        program_parser = new jap(),
        utils_int = new utilities();
}
