/*
    GreyOS - Meta-Program Config (Version: 1.1)

    File name: meta_program_config.js
    Description: This file contains the Meta-Program Config validator development module.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2022 - 2024
    Open Software License (OSL 3.0)
*/

// Meta-Program Config
function meta_program_config()
{
    var self = this;

    function utilities()
    {
        this.parse = function(program_config)
        {
            var meta_script = program_config.script;

            if (meta_script.indexOf('navigator') >= 0 || meta_script.indexOf('window') >= 0 || 
                meta_script.indexOf('document') >= 0 || meta_script.indexOf('location') >= 0 || 
                meta_script.indexOf('alert') >= 0 || meta_script.indexOf('eval') >= 0 || 
                meta_script.indexOf('this') >= 0)
                return false;

            if (program_config.type === 'app')
            {
                console.log(meta_script);
            }
            else
            {
                console.log(meta_script);
            }

            return true;
        };
    }

    this.execute = function(program_config)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(program_config))
            return false;

        if (!config_parser.verify(program_config_model, program_config))
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

        program_config_model = { "arguments"    :   [
                                                        {
                                                            "key"       :   { "name" : "type", "optional" : false },
                                                            "value"     :   { "type" : "string" },
                                                            "choices"   :   [ "app", "service" ]
                                                        },
                                                        {
                                                            "key"       :   { "name" : "mode", "optional" : false },
                                                            "value"     :   { "type" : "string" },
                                                            "choices"   :   [ "release", "debug" ]
                                                        },
                                                        {
                                                            "key"       :   { "name" : "script", "optional" : false },
                                                            "value"     :   { "type" : "*" }
                                                        },
                                                    ]
                               };

        return true;
    };

    var cosmos = null,
        matrix = null,
        app_box = null,
        program_config_model = null,
        utils_sys = new vulcan(),
        config_parser = new jap(),
        utils_int = new utilities();
}
