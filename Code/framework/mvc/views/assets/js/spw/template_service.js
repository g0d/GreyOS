/*
    GreyOS - Template [Service] (Version: 0.5)

    File name: template_service.js
    Description: This file contains the Template Service - Template service module.
    Notes: Low Level API

    Coded by [Name Surname] ([Nickname])
    Copyright © [Year]
    Open Software License (OSL 3.0)
*/

// Template Service
function template_service()
{
    var self = this; // Use "self" to referense the whole class module easily so that you do no confuse "this" in various scopes

    function template_service_config_model() // Always use one or more "xxx_config_model" model to keep internal status information
    {
        this.id = null; // Always have an "id" option to store the service name

        // Your code...

        function test_object_model()
        {
            // Your code...
        }

        function template_model_1() // Internal private models keep information catrgorized under namespaces
        {
            this.pption_1 = false;
            this.pption_2 = null;
            this.pption_3 = 10.98;
        }

        function template_model_2()
        {
            this.pption_1 = new test_object_model();
            this.pption_2 = false;
            this.pption_3 = 'test';
        }

        this.namespace_1 = new template_model_1(); // Create the namespace as public attribute of the "template_service_config_model"
        this.namespace_2 = new template_model_2();
    }

    function utilities() // Always use a "utiltiies" model to organize internal operations for the class module
    {
        var me = this; // Use "me" to referense internal classes of the module

        this.test_utility_function = function(any) // Your own function(s) / method(s)
        {
            var __test_var_1 = null,
                __test_var_2 = null;

            // Your code...

            return true;
        };
    }

    this.test_function = function() // Use your own public methods
    {
        if (!is_setup)
            return false;

        // Your code...
    
        return true;
    };

    this.base = function() // Always have a public "base" method available with this code in the body
    {
        if (!is_setup)
            return false;

        return template_svc_bat;
    };

    this.config = function() // Always have a public "config" method available with this code in the body
    {
        if (!is_setup)
            return false;

        return config;
    };

    this.on = function(event_name, event_handler) // Always have a public "on" method available with this code in the body
    {
        if (!is_setup)
            return false;

        return template_svc_bat.on(event_name, event_handler);
    };

    this.set_func = function(name, body) // Always have a public "set_func" method available with this code in the body
    {
        if (!is_setup)
            return false;

        return template_svc_bat.set_function(name, body);
    };

    this.exec_func = function(func_name, func_args = []) // Always have a public "exec_func" method available with this code in the body
    {
        if (!is_setup)
            return false;

        return template_svc_bat.exec_function(func_name, func_args);
    };

    this.run = function(service_model, action) // Always have a public "run" method available with this code in the body
    {
        if (!is_setup)
            return false;

        return template_svc_bat.register(service_model, action);
    };

    this.terminate = function() // Always have a public "terminate" method available with this code in the body
    {
        if (!is_setup)
            return false;

        return template_svc_bat.unregister();
    };

    this.setup = function(service_id, icon = 'svc_default', in_super_tray = true) // Always have a public "setup" method available with this code in the body
    {
        if (!is_init)
            return false;

        if (!template_svc_bat.init(service_id, icon, in_super_tray))
            return false;

        // Your code...

        is_setup = true;

        return true;
    };

    this.init = function() // Always have a public "init" method available following the template in the body
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init)
            return false;

        template_svc_bat = dev_box.get('bat'); // Get a "bat" service model from the development toolbox

        is_init = true;

        return true;
    };

    this.cosmos = function(cosmos_object) // Always have a public "cosmos" method available
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix'); // Always have "matrix" to reference other OS services
        dev_box = cosmos.hub.access('dev_box'); // Always have a "dev_box" to reference the development toolbox

        morpheus = matrix.get('morpheus'); // Good to have to manage OS level events

        // Your code...

        return true;
    };

    var is_init = false, // Always have a "is_init" internal variable
        is_setup = false, // Always have a "is_setup" internal variable
        cosmos = null,  // Always have a "cosmos" internal variable
        // Your code here...
        matrix = null, // Always have a "matrix" internal variable
        dev_box = null, // Always have a "dev_box" internal variable
        morpheus = null, // Good to have a "morpheus" internal variable
        // Your code here...
        template_svc_bat = null, // Always have a "xxx_bat" internal variable
        utils_sys = new vulcan(), // Always have a "utils_sys" internal variable that utilizes "vulcan"
        ajax = new taurus(), // Always have a "ajax" internal variable that utilizes "taurus"
        // Your code here...
        config = new template_service_config_model(), // Always have a "xxx_config" internal variable that utilizes "xxx_config_model" model
        // Your code here...
        utils_int = new utilities(); // Always have a "utils_int" internal variable that utilizes "utilities" model
}
