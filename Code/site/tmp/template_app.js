/*
    GreyOS - Template [App] (Version: 0.2)

    File name: template_app.js
    Description: This file contains the Template App - Template application.
    Notes: Low Level API

    Coded by [Name Surname]
    Copyright © [Year]
    Open Software License (OSL 3.0)
*/

// Template App
function template_app()
{
    var self = this; // Use "self" to referense the whole class module easily so that you do no confuse "this" in various scopes

    function template_app_config_model() // Always use one or more "xxx_config_model" model to keep internal status information
    {
        this.id = null; // Always have an "id" option to store the app name

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

        this.namespace_1 = new template_model_1(); // Create the namespace as public attribute of the "template_app_config_model"
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

        this.gui_init = function() // Always use a "gui_init" method
        {
            template_app_bee_id = template_app_bee.settings.general.id(); // It is good to reference the app ID this way

            infinity.setup(template_app_bee_id + '_data'); // Always use this element to setup the progress indicator
            infinity.begin(); // Show the progress indicator

            me.draw(); // Always call a "draw" method to design the window components
            me.attach_events('normal_to_fullscreen'); // Always call a "attach_events" method to attach events

            // Your code...

            infinity.end(); // Hide the progress indicator

            return true;
        };

        this.draw = function()
        {
            // Your code...

            return true;
        };

        this.attach_events = function()
        {
            // Your code...

            return true;
        };

        // More methods...
    }

    this.test_function = function() // Use your own public methods
    {
        if (!is_init)
            return false;

        // Your code...
    
        return true;
    };

    this.base = function() // Always have a public "base" method available with this code in the body
    {
        if (is_init === false)
            return false;

        return template_app_bee;
    };

    this.on = function(event_name, event_handler) // Always have a public "on" method available with this code in the body
    {
        if (is_init === false)
            return false;

        return template_app_bee.on(event_name, event_handler);
    };

    this.run = function() // Always have a public "run" method available with this code in the body
    {
        if (is_init === false)
            return false;

        return template_app_bee.run();
    };

    this.quit = function() // Always have a public "quit" method available with this code in the body
    {
        if (is_init === false)
            return false;

        return template_app_bee.close();
    };

    this.error = function() // Always have a public "error" method available with this code in the body
    {
        if (is_init === false)
            return false;

        return template_app_bee.error;
    };

    this.init = function(any = false) // Always have a public "init" method available following the template in the body
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        if (utils_sys.validation.misc.is_undefined(any) || !utils_sys.validation.misc.is_bool(any))
            return false;

        is_init = true;

        template_app_bee = dev_box.get('bee'); // Get a "bee" application model from the development toolbox

        config.id = 'template_app'; // Always set an app name

        nature.theme([config.id]); // Use the corresponding theme settings (See "nature" extension folder for themes)
        nature.apply('new'); // Apply the theme

        infinity.init(); // It is a good practice to initialize the "infinity" service to show a loading progress indicator

        // Declare bee's settings
        template_app_bee.init(config.id);
        template_app_bee.settings.data.window.labels.title('Template App');
        template_app_bee.settings.data.window.labels.status_bar('Ready');
        template_app_bee.settings.data.casement.labels.title('Tools');
        template_app_bee.settings.data.casement.labels.status('Stuff...');
        template_app_bee.settings.general.allowed_instances(1);
        template_app_bee.settings.general.resizable(true);
        template_app_bee.settings.general.casement_width(50);
        template_app_bee.gui.position.left(70);
        template_app_bee.gui.position.top(10);
        template_app_bee.gui.size.width(1024);
        template_app_bee.gui.size.height(720);
        template_app_bee.gui.size.min.width(960);
        template_app_bee.gui.size.min.height(680);
        template_app_bee.gui.size.max.width(1920);
        template_app_bee.gui.size.max.height(1080);
        template_app_bee.gui.fx.fade.settings.into.set(0.07, 25, 100); // Fade-in FX set (Optional)
        template_app_bee.gui.fx.fade.settings.out.set(0.07, 25, 100); // Fade-out FX set (Optional)
        template_app_bee.on('open', function() { template_app_bee.gui.fx.fade.into(); }); // On "open app" event
        template_app_bee.on('opened', function() { utils_int.gui_init(); }); // On "opened app" event
        template_app_bee.on('dragging', function() // Event
                            {
                                // Your code...

                                template_app_bee.gui.fx.opacity.settings.set(0.7); // Opacity FX set (Optional)
                                template_app_bee.gui.fx.opacity.apply(); // Opacity FX apply
                            });
        template_app_bee.on('dragged', function() // Event
                            {
                                // Your code...

                                template_app_bee.gui.fx.opacity.reset(); // Opacity FX reset
                            });
        template_app_bee.on('resizing', function() // Event
                            {
                                // Your code...
                            });
        template_app_bee.on('resized', function() // Event
                            {
                                // Your code...
                            });
        template_app_bee.on('close', function() // Event
                            {
                                // Your code...

                                template_app_bee.gui.fx.fade.out();
                            });

        // You code...

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
        cosmos = null,  // Always have a "cosmos" internal variable
        // Your code here...
        matrix = null, // Always have a "matrix" internal variable
        dev_box = null, // Always have a "dev_box" internal variable
        morpheus = null, // Good to have a "morpheus" internal variable
        nature = null, // Always have a "nature" internal variable
        infinity = null, // Always have a "infinity" internal variable
        // Your code here...
        template_app_bee = null, // Always have a "xxx_bee" internal variable
        template_app_bee_id = null, // Always have a "xxx_bee_id" internal variable
        // Your code here...
        utils_sys = new vulcan(), // Always have a "utils_sys" internal variable that utilizes "vulcan"
        ajax = new taurus(), // Always have a "ajax" internal variable that utilizes "taurus"
        // Your code here...
        config = new template_app_config_model(), // Always have a "xxx_config" internal variable that utilizes "xxx_config_model" model
        // Your code here...
        utils_int = new utilities(); // Always have a "utils_int" internal variable that utilizes "utilities" model
}
