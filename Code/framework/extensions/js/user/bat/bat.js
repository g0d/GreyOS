/*
    GreyOS - Bat (Version: 1.2)

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

    function service_config_model()
    {
        this.name = null;
        this.icon = 'default';
    }

    function dynamic_function_model()
    {
        this.name = null;
        this.body = null;
    }

    this.get_config = function()
    {
        if (is_init === false)
            return false;

        return service_config;
    };

    this.set_function = function(name, body)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.alpha.is_symbol(name) || !utils_sys.validation.misc.is_function(body))
            return false;

        var __new_dynamic_function = new dynamic_function_model();

        __new_dynamic_function.name = name;

        dynamic_functions_list.push(__new_dynamic_function);

        __new_dynamic_function.body = function(args) { body.call(this, args); };

        return true;
    };

    this.exec = function(func_name, func_args = [])
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.alpha.is_symbol(func_name) || !utils_sys.validation.misc.is_array(func_args))
            return false;

        var __functions_list_length = dynamic_functions_list.length;

        for (var i = 0; i < __functions_list_length; i++)
        {
            if (dynamic_functions_list[i].name === func_name)
                return dynamic_functions_list[i].body.call(this, func_args);
        }

        return false;
    };

    this.on = function(this_event, cmd)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.misc.is_undefined(this_event) || utils_sys.validation.misc.is_undefined(cmd))
            return false;

        if (utils_sys.misc.contains(this_event, events_list))
            return morpheus.store(service_config.name, 'main', this_event, cmd, document);

        return false;
    };

    this.register = function()
    {
        if (is_init === false)
            return false;

        morpheus.execute(service_config.name, 'main', 'register');

        return matrix.register([service_config.name]);
    };

    this.unregister = function()
    {
        if (is_init === false)
            return false;

        morpheus.execute(service_config.name, 'main', 'unregister');

        return matrix.unregister(service_config.name);
    };

    this.init = function(svc_name, icon = 'default')
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(svc_name) || utils_sys.validation.alpha.is_symbol(icon))
            return false;

        if (is_init === true)
            return false;

        service_config.name = svc_name + '_' + random.generate();
        service_config.icon = icon;

        is_init = true;

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

    var is_init = false,
        cosmos = null,
        matrix = null,
        events_list = ['register', 'unregister'],
        dynamic_functions_list = [],
        utils_sys = new vulcan(),
        random = new pythia(),
        service_config = new service_config_model();
}
