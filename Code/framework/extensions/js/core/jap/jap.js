/*
    J.A.P (JSON Argument Parser)

    File name: jap.js (Version: 1.3)
    Description: This file contains the J.A.P extension.
    Dependencies: Vulcan and Sensei.

    Coded by George Delaportas (G0D)
    Copyright (C) 2016
    Open Software License (OSL 3.0)
*/

// J.A.P
function jap()
{
    // Scan for unknown keywords
    function has_unknown_keywords(definition_model)
    {
        if (!utils.validation.misc.is_object(definition_model))
            return false;

        var __index = null,
            __attribute = null,
            __option = null,
            __property = null;

        for (__index in definition_model)
        {
            __attribute = definition_model[__index];

            if (!utils.validation.misc.is_object(__attribute))
            {
                if (!utils.misc.contains(__index, def_keywords))
                    return true;

                continue;
            }

            if ((utils.validation.misc.is_object(__attribute) && Object.getOwnPropertyNames(__attribute).length === 0) || 
                (utils.validation.misc.is_array(__attribute) && __attribute.length === 0))
                return true;

            for (__option in __attribute)
            {
                if (utils.validation.misc.is_object(__attribute[__option]))
                {
                    for (__property in __attribute[__option])
                    {
                        if (utils.validation.numerics.is_number(__option))
                            continue;

                        if (!utils.misc.contains(__property, def_keywords))
                            return true;

                        if (has_unknown_keywords(__attribute[__option][__property]))
                            return true;
                    }
                }
                else
                {
                    if (!utils.misc.contains(__option, def_keywords))
                        return true;

                    if (has_unknown_keywords(__attribute[__option]))
                        return true;
                }
            }
        }

        return false;
    }

    // Define the configuration
    this.define = function(definition_model)
    {
        if (!utils.validation.misc.is_object(definition_model))
        {
            sensei('J.A.P', 'Invalid definition model!');

            return false;
        }

        if (definition_model.length === 0)
        {
            sensei('J.A.P', 'The definition model is null!');

            return false;
        }

        if (has_unknown_keywords(definition_model))
        {
            sensei('J.A.P', 'The definition model contains unknown keywords!');

            return false;
        }

        var __this_key = null,
            __this_value = null;

        is_model_defined = false;

        if (definition_model.hasOwnProperty('ignore_keys_num') && !utils.validation.misc.is_bool(definition_model.ignore_keys_num))
        {
            sensei('J.A.P', 'Missing or invalid "ignore_keys_num" attribute!');

            return false;
        }

        if (!definition_model.hasOwnProperty('arguments') || !utils.validation.misc.is_object(definition_model.arguments))
        {
            sensei('J.A.P', 'Missing or invalid "arguments" attribute!');

            return false;
        }

        def_model_args = definition_model.arguments;

        for (counter = 0; counter < def_model_args.length; counter++)
        {
            if (!utils.validation.misc.is_object(def_model_args[counter]))
            {
                sensei('J.A.P', 'Invalid JSON object in "arguments" attribute!');

                return false;
            }

            if (!def_model_args[counter].hasOwnProperty('key') || !def_model_args[counter].hasOwnProperty('value'))
            {
                sensei('J.A.P', 'Missing "key" or "value" mandatory attributes!');

                return false;
            }

            __this_key = def_model_args[counter].key;
            __this_value = def_model_args[counter].value;

            if (!utils.validation.misc.is_object(__this_key) || !utils.validation.misc.is_object(__this_value))
            {
                sensei('J.A.P', 'A "key" or "value" attribute does not point to a JSON object!');

                return false;
            }

            if (!__this_key.hasOwnProperty('name') || !__this_key.hasOwnProperty('optional'))
            {
                sensei('J.A.P', 'Missing "name" or "optional" mandatory properties!');

                return false;
            }

            if (!utils.validation.alpha.is_string(__this_key.name) || !utils.validation.misc.is_bool(__this_key.optional))
            {
                sensei('J.A.P', 'Invalid specification for "name" or "optional" property!');

                return false;
            }

            if (!__this_value.hasOwnProperty('type'))
            {
                sensei('J.A.P', 'Missing "type" mandatory property!');

                return false;
            }

            if (!utils.validation.alpha.is_string(__this_value.type) || !utils.misc.contains(__this_value.type, all_value_types))
            {
                sensei('J.A.P', 'Invalid specification for "type" property!');

                return false;
            }

            if (__this_value.hasOwnProperty('choices'))
            {
                if (!utils.misc.contains(__this_value.type, types_with_choices))
                {
                    sensei('J.A.P', 'This type does not support the "choices" option!');

                    return false;
                }

                if (!utils.validation.misc.is_array(__this_value.choices) || __this_value.choices.length < 1)
                {
                    sensei('J.A.P', 'The "choices" option has to be an array with at least\none element!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('length'))
            {
                if (utils.misc.contains(__this_value.type, uncountable_value_types))
                {
                    sensei('J.A.P', 'This type does not support the "length" option!');

                    return false;
                }

                if (!utils.validation.numerics.is_integer(__this_value.length) || __this_value.length < 1)
                {
                    sensei('J.A.P', 'The "length" option has to be a positive integer!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('regex'))
            {
                if (utils.misc.contains(__this_value.type, uncountable_value_types) || __this_value.type === 'array')
                {
                    sensei('J.A.P', 'This type does not support the "regex" option!');

                    return false;
                }

                if (!utils.validation.misc.is_object(__this_value.regex) || __this_value.regex === '')
                {
                    sensei('J.A.P', 'Invalid "regex" option!');

                    return false;
                }
            }
        }

        is_model_defined = true;
        json_def_model = definition_model;

        return true;
    };

    // Validate configuration based on the definition model
    this.validate = function(config)
    {
        if (!is_model_defined)
        {
            sensei('J.A.P', 'No definition model was specified!');

            return false;
        }

        if (!utils.validation.misc.is_object(config))
        {
            sensei('J.A.P', 'Invalid JSON object!');

            return false;
        }

        var __json_key = null,
            __this_key = null,
            __this_value = null,
            __is_multiple_keys_array = false,
            __keys_exist = 0,
            __mandatory_keys_not_found = 0,
            __model_keywords = [];

        def_model_args = json_def_model.arguments;

        if (utils.validation.misc.is_array(config))
            __is_multiple_keys_array = true;

        for (counter = 0; counter < def_model_args.length; counter++)
        {
            for (__json_key in def_model_args[counter])
            {
                if (!utils.validation.misc.is_undefined(def_model_args[counter][__json_key].name))
                    __model_keywords.push(def_model_args[counter][__json_key].name);
            }
        }

        for (__json_key in config)
        {
            if (__is_multiple_keys_array)
                __mandatory_keys_not_found = 0;

            for (counter = 0; counter < def_model_args.length; counter++)
            {
                __this_key = def_model_args[counter].key;

                if (__is_multiple_keys_array)
                {
                    for (__this_value in config[__json_key])
                    {
                        if (!utils.misc.contains(__this_value, __model_keywords))
                        {
                            sensei('J.A.P', 'Unknown keyword: "' + __this_value + '" in the configuration model!');
            
                            return false;
                        }
                    }
                }
                else
                {
                    if (!utils.misc.contains(__json_key, __model_keywords))
                    {
                        sensei('J.A.P', 'Unknown keyword: "' + __json_key + '" in the configuration model!');
        
                        return false;
                    }
                }

                if (__this_key.optional === false)
                {
                    if (__is_multiple_keys_array)
                    {
                        if (!config[__json_key].hasOwnProperty(__this_key.name))
                            __mandatory_keys_not_found++;
                    }
                    else
                    {
                        if (!config.hasOwnProperty(__this_key.name))
                            __mandatory_keys_not_found++;
                    }
                }
            }

            if (__is_multiple_keys_array && __mandatory_keys_not_found > 0)
                break;

            __keys_exist++;
        }

        if ((!json_def_model.hasOwnProperty('ignore_keys_num') || json_def_model.ignore_keys_num === false) && 
            __mandatory_keys_not_found > 0)
        {
            sensei('J.A.P', 'Mandatory properties are missing!');

            return false;
        }

        if (__keys_exist === 0)
        {
            sensei('J.A.P', 'The JSON object is null!');

            return false;
        }

        for (counter = 0; counter < def_model_args.length; counter++)
        {
            __this_key = def_model_args[counter].key;
            __this_value = def_model_args[counter].value;

            if (__this_value.type !== '*')
            {
                if (__this_value.type === 'null')
                {
                    if (config[__this_key.name] !== null)
                    {
                        sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "null" values!');

                        return false;
                    }
                }
                else if (__this_value.type === 'number')
                {
                    if (__is_multiple_keys_array)
                    {
                        for (__json_key in config)
                        {
                            if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
                                continue;

                            if (utils.validation.misc.is_nothing(config[__json_key][__this_key.name].toString().trim()) || 
                                !utils.validation.numerics.is_number(Number(config[__json_key][__this_key.name])))
                            {
                                sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "numeric" values!');

                                return false;
                            }
                        }
                    }
                    else
                    {
                        if (utils.validation.misc.is_undefined(config[__this_key.name]))
                            continue;

                        if (utils.validation.misc.is_nothing(config[__this_key.name].toString().trim()) || 
                            !utils.validation.numerics.is_number(Number(config[__this_key.name])))
                        {
                            sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "numeric" values!');

                            return false;
                        }
                    }
                }
                else if (__this_value.type === 'array')
                {
                    if (!utils.validation.misc.is_array(config[__this_key.name]))
                    {
                        sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "array" values!');

                        return false;
                    }
                }
                else
                {
                    if (__is_multiple_keys_array)
                    {
                        for (__json_key in config)
                        {
                            if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
                                continue;

                            if (typeof config[__json_key][__this_key.name] !== __this_value.type)
                            {
                                sensei('J.A.P', 'Argument: "' + __this_key.name + '" has a type mismatch!');

                                return false;
                            }
                        }
                    }
                    else
                    {
                        if (utils.validation.misc.is_undefined(config[__this_key.name]))
                            continue;

                        if (typeof config[__this_key.name] !== __this_value.type)
                        {
                            sensei('J.A.P', 'Argument: "' + __this_key.name + '" has a type mismatch!');

                            return false;
                        }
                    }
                }
            }

            if (__this_value.hasOwnProperty('choices'))
            {
                if (__is_multiple_keys_array)
                {
                    for (__json_key in config)
                    {
                        if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
                            continue;

                        if (!utils.misc.contains(config[__json_key][__this_key.name], __this_value.choices))
                        {
                            sensei('J.A.P', 'Argument: "' + __this_key.name + '" does not contain any\ndefined choices!');

                            return false;
                        }
                    }
                }
                else
                {
                    if (utils.validation.misc.is_undefined(config[__this_key.name]))
                        continue;

                    if (!utils.misc.contains(config[__this_key.name], __this_value.choices))
                    {
                        sensei('J.A.P', 'Argument: "' + __this_key.name + '" does not contain any\ndefined choices!');
    
                        return false;
                    }
                }
            }

            if (__this_value.hasOwnProperty('length'))
            {
                if (__this_value.type === 'array')
                {
                    if (config[__this_key.name].length > __this_value.length)
                    {
                        sensei('J.A.P', 'Argument: "' + __this_key.name + '" has exceeded the defined length!');

                        return false;
                    }
                }
                else
                {
                    if (config[__this_key.name].toString().length > __this_value.length)
                    {
                        sensei('J.A.P', 'Argument: "' + __this_key.name + '" has exceeded the defined length!');

                        return false;
                    }
                }
            }

            if (__this_value.hasOwnProperty('regex'))
            {
                if (!utils.validation.utilities.reg_exp(__this_value.regex, config[__this_key.name]))
                {
                    sensei('J.A.P', 'Argument: "' + __this_key.name + '" has not matched the specified regex!');

                    return false;
                }
            }
        }

        return true;
    };

    // Define and validate at once
    this.verify = function(definition_model, config)
    {
        if (self.define(definition_model))
            return self.validate(config);

        return false;
    };

    var self = this,
        is_model_defined = false,
        counter = 0,
        json_def_model = null,
        def_model_args = null,
        def_keywords = ['ignore_keys_num', 'arguments', 'key', 'value', 'name', 'optional', 'type', 'choices', 'length', 'regex'],
        all_value_types = ['number', 'string', 'boolean', 'array', 'object', 'function', 'null', '*'],
        uncountable_value_types = ['boolean', 'object', 'function', 'null', '*'],
        types_with_choices = ['number', 'string', 'array'],
        utils = new vulcan();
}
