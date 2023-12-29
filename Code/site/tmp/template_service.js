/*
    GreyOS - Template [Service] (Version: 0.1)

    File name: template_service.js
    Description: This file contains the Template Service - Template service module.

    Coded by [Name Surname]
    Copyright © [Year]
    Open Software License (OSL 3.0)
*/

// Template Service
function template_service()
{
    var self = this; // Use "self" to referense the whole class module easily so that you do no confuse "this" in various scopes

    function template_service_config_model() // Always use one or more "xxx_config_model" model to keep internal status information
    {
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
        if (!is_init)
            return false;

        // Your code...
    
        return true;
    };

    this.init = function(any = false) // Always have a public "init" method available
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        if (utils_sys.validation.misc.is_undefined(any) || !utils_sys.validation.misc.is_bool(any))
            return false;

        var __handler = null;

        __handler = function(event) { /* Your code... */ };
        morpheus.run('template_service_context', 'mouse', 'event_name', __handler);

        __handler = function(event) { /* Your code... */ };
        morpheus.run('template_service_context', 'key', 'event_name', __handler);

        __handler = function(event) { /* Your code... */ };
        morpheus.run('template_service_context', 'controller', 'event_name', __handler);

        is_init = true;

        return true;
    };

    this.cosmos = function(cosmos_object) // Always have a public "cosmos" method available
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix'); // Always have "matrix" to reference other OS services

        morpheus = matrix.get('morpheus'); // Good to have to manage OS level events

        // Your code...

        return true;
    };

    var is_init = false, // Always have a "is_init" internal variable
        cosmos = null,  // Always have a "cosmos" internal variable
        // Your code here...
        matrix = null, // Always have a "matrix" internal variable
        morpheus = null, // Good to have a "morpheus" internal variable
        // Your code here...
        utils_sys = new vulcan(), // Always have a "utils_sys" internal variable that utilizes "vulcan"
        // Your code here...
        template_service_config = new template_service_config_model(), // Always have a "xxx_config" internal variable that utilizes "xxx_config_model" model
        // Your code here...
        utils_int = new utilities(); // Always have a "utils_int" internal variable that utilizes "utilities" model
}
