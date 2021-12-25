/*
    GreyOS - Bat (Version: 1.0)

    File name: bat.js
    Description: This file contains the Bat - System services template module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Bat
function bat()
{
    var self = this;

    function dynamic_function_model()
    {
        this.name = null;
        this.body = null;
    }

    this.set_config_model = function(config_model)
    {
        if (utils_sys.validation.misc.is_undefined(config_model))
            return false;

        if (!utils_sys.validation.misc.is_object(config_model))
            return false;

        self[config_model.constuctor] = config_model;

        return true;
    };

    this.set_function = function(name, body)
    {
        if (utils_sys.validation.alpha.is_symbol(name) || !utils_sys.validation.misc.is_function(body))
            return false;

        var new_dynamic_function = new dynamic_function_model();

        new_dynamic_function.name = name;

        dynamic_functions_list.push(new_dynamic_function);

        if (use_init === true)
        {
            new_dynamic_function.body = function(args)
                                        {
                                            if (is_init === true)
                                                body.apply(this, args);
                                        };
        }
        else
            new_dynamic_function.body = function(args) { body.apply(this, args); };

        return true;
    };

    this.exec = function(func_name, func_args = [])
    {
        if (use_init === true)
        {
            if (is_init === false)
                return false;
        }

        if (utils_sys.validation.alpha.is_symbol(func_name) || !utils_sys.validation.misc.is_array(func_args))
            return false;

        var functions_list_length = dynamic_functions_list.length;

        for (var i = 0; i < functions_list_length; i++)
        {
            if (dynamic_functions_list[i].name === func_name)
                return dynamic_functions_list[i].body.call(this, func_args);
        }

        return false;
    };

    this.use_init = function(use_init)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_bool(use_init))
            return false;

        self.use_init = use_init;

        return true;
    };

    this.init = function(init_func)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (use_init === true)
        {
            if (is_init === true)
                return false;

            is_init = true;
        }

        if (!utils_sys.validation.misc.is_undefined(init_func) && utils_sys.validation.misc.is_function(init_func))
            init_func.call();

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var use_init = true,
        is_init = false,
        cosmos = null,
        dynamic_functions_list = [],
        utils_sys = new vulcan();
}
