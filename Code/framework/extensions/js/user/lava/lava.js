/*
    L.A.Va (LIVE Argument Validator)

    File name: lava.js (Version: 1.2)
    Description: This file contains the L.A.Va extension.
    Dependencies: Vulcan and Sensei.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2016
    Open Software License (OSL 3.0)
*/

// L.A.Va
function lava()
{
    // Scan for unknown keywords
    function has_unknown_keywords(definition_model)
    {
        var __index = null,
            __attribute = null,
            __option = null;

        for (__index in definition_model)
        {
            __attribute = definition_model[__index];

            if (!utils.validation.misc.is_object(__attribute))
            {
                if (!utils.misc.contains(__index, __def_keywords))
                    return true;

                continue;
            }

            if ((utils.validation.misc.is_object(__attribute) && Object.getOwnPropertyNames(__attribute).length === 0) || 
                (utils.validation.misc.is_array(__attribute) && __attribute.length === 0))
                return true;

            for (__option in __attribute)
            {
                if (utils.validation.numerics.is_number(__option))
                    continue;

                if (!utils.misc.contains(__option, __def_keywords))
                    return true;

                if (has_unknown_keywords(__attribute[__option]))
                    return true;
            }
        }

        return false;
    }

    // Define the configuration
    this.define = function(definition_model)
    {
        if (!utils.validation.misc.is_array(definition_model))
        {
            sensei('L.A.Va', 'Invalid definition model!');

            return false;
        }

        if (definition_model.length === 0)
        {
            sensei('L.A.Va', 'The definition model is null!');

            return false;
        }

        if (has_unknown_keywords(definition_model))
        {
            sensei('L.A.Va', 'The definition model contains unknown keywords\nor invalid values!');

            return false;
        }

        var __this_key = null,
            __this_value = null;

        __is_model_defined = false;

        for (__counter = 0; __counter < definition_model.length; __counter++)
        {
            if (!utils.validation.misc.is_object(definition_model[__counter]))
            {
                sensei('L.A.Va', 'Invalid JSON object in the model!');

                return false;
            }

            if (!definition_model[__counter].hasOwnProperty('key') || !definition_model[__counter].hasOwnProperty('value'))
            {
                sensei('L.A.Va', 'Missing "key" or "value" mandatory attributes!');

                return false;
            }

            __this_key = definition_model[__counter].key;
            __this_value = definition_model[__counter].value;

            if (!utils.validation.misc.is_object(__this_key) || !utils.validation.misc.is_object(__this_value))
            {
                sensei('L.A.Va', 'A "key" or "value" attribute does not point to a JSON object!');

                return false;
            }

            if (!__this_key.hasOwnProperty('id') || !__this_key.hasOwnProperty('optional'))
            {
                sensei('L.A.Va', 'Missing "id" or "optional" mandatory properties!');

                return false;
            }

            if (!utils.validation.alpha.is_string(__this_key.id) || !utils.validation.misc.is_bool(__this_key.optional))
            {
                sensei('L.A.Va', 'Invalid specification for "id" or "optional" property!');

                return false;
            }

            if (utils.validation.misc.is_invalid(__this_key.id) || utils.objects.by_id(__this_key.id) === null)
            {
                sensei('L.A.Va', 'The "id" points to no HTML element!');

                return false;
            }

            if (!__this_value.hasOwnProperty('type'))
            {
                sensei('L.A.Va', 'Missing "type" mandatory property!');

                return false;
            }

            if (!utils.validation.alpha.is_string(__this_value.type) || !utils.misc.contains(__this_value.type, __all_value_types))
            {
                sensei('L.A.Va', 'Invalid specification for "type" property!');

                return false;
            }

            if (__this_value.hasOwnProperty('choices'))
            {
                if (!utils.misc.contains(__this_value.type, __types_with_choices))
                {
                    sensei('L.A.Va', 'This type does not support the "choices" option!');

                    return false;
                }

                if (!utils.validation.misc.is_array(__this_value.choices))
                {
                    sensei('L.A.Va', 'The "choices" option has to be an array with at least\none element!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('length'))
            {
                if (utils.misc.contains(__this_value.type, __uncountable_value_types))
                {
                    sensei('L.A.Va', 'This type does not support the "length" option!');

                    return false;
                }

                if (!utils.validation.numerics.is_integer(__this_value.length) || __this_value.length < 1)
                {
                    sensei('L.A.Va', 'The "length" option has to be a positive integer!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('regex'))
            {
                if (utils.misc.contains(__this_value.type, __uncountable_value_types) || __this_value.type === 'array')
                {
                    sensei('L.A.Va', 'This type does not support the "regex" option!');

                    return false;
                }

                if (utils.validation.misc.is_invalid(__this_value.regex))
                {
                    sensei('L.A.Va', 'Invalid "regex" option!');

                    return false;
                }
            }
        }

        __is_model_defined = true;
        __json_def_model = definition_model;

        return true;
    };

    // Validate all fields based on the definition model
    this.validate = function()
    {
        if (!__is_model_defined)
        {
            sensei('L.A.Va', 'No definition model was specified!');

            return false;
        }

        var __this_key = null,
            __this_value = null,
            __this_field = null,
            __keys_found = 0,
            __keys_optional = false;

        for (__counter = 0; __counter < __json_def_model.length; __counter++)
        {
            __this_key = __json_def_model[__counter].key;
            __this_field = utils.objects.by_id(__this_key.id);

            if (__this_field === null)
            {
                sensei('L.A.Va', 'Element: "' + __this_key.id + '" does not exist!');

                return false;
            }

            if (__this_key.optional === true)
                __keys_optional = true;

            __keys_found++;
        }

        if (__keys_found < __json_def_model.length && __keys_optional === false)
        {
            sensei('L.A.Va', 'Defined non-optional elements differ from that on the page!');

            return false;
        }

        for (__counter = 0; __counter < __json_def_model.length; __counter++)
        {
            __this_key = __json_def_model[__counter].key;
            __this_value = __json_def_model[__counter].value;
            __this_field = utils.objects.by_id(__this_key.id);

            if (__this_field === null && __keys_optional === true)
                continue;

            if (__this_value.type !== '*')
            {
                if (__this_value.type === 'null')
                {
                    if (__this_field.value !== null)
                    {
                        sensei('L.A.Va', 'Field: "' + __this_field.id + '" accepts only "null" values!');

                        return false;
                    }
                }
                else if (__this_value.type === 'number')
                {
                    if (utils.validation.misc.is_nothing(__this_field.value.trim()) || 
                        !utils.validation.numerics.is_number(Number(__this_field.value)))
                    {
                        sensei('L.A.Va', 'Field: "' + __this_field.id + '" accepts only numbers!');

                        return false;
                    }
                }
                else if (__this_value.type === 'array')
                {
                    if (!utils.validation.misc.is_array(__this_field.value))
                    {
                        sensei('L.A.Va', 'Field: "' + __this_field.id + '" accepts only "array" values!');

                        return false;
                    }
                }
                else
                {
                    if (typeof __this_field.value !== __this_value.type)
                    {
                        sensei('L.A.Va', 'Field: "' + __this_field.id + '" has a type mismatch!');

                        return false;
                    }
                }
            }

            if (__this_value.hasOwnProperty('choices'))
            {
                if (!utils.misc.contains(__this_field.value, __this_value.choices))
                {
                    sensei('L.A.Va', 'Field: "' + __this_field.id + '" does not contain any defined choices!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('length'))
            {
                if ((__this_value.type === 'array' && __this_field.value.length > __this_value.length) || 
                    (__this_value.type !== 'array' && __this_field.value.toString().length > __this_value.length))
                {
                    sensei('L.A.Va', 'Field: "' + __this_field.id + '" exceeds the defined length!');

                    return false;
                }
            }

            if (__this_value.hasOwnProperty('regex'))
            {
                if (!utils.validation.utilities.reg_exp(__this_value.regex, __this_field.value))
                {
                    sensei('L.A.Va', 'Field: "' + __this_field.id + '" has not matched the specified regex!');

                    return false;
                }
            }
        }

        return true;
    };

    // Define and validate at once
    this.verify = function(definition_model)
    {
        if (self.define(definition_model))
            return self.validate();

        return false;
    };

    var self = this,
        __is_model_defined = false,
        __counter = 0,
        __json_def_model = null,
        __def_keywords = ['key', 'value', 'id', 'optional', 'type', 'choices', 'length', 'regex'],
        __all_value_types = ['number', 'string', 'boolean', 'array', 'object', 'function', 'null', '*'],
        __uncountable_value_types = ['boolean', 'object', 'function', 'null', '*'],
        __types_with_choices = ['number', 'string', 'array'],
        utils = new vulcan();
}
