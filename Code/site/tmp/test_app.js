/*
    GreyOS - Test App for Cloud Edit (Version: 1.2)
    
    File name: test_app.js
    Description: This file contains a test app for development purposes on Cloud Edit.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Test App
function test_app()
{
    var self = this;

    function config_model()
    {
        this.id = null;
        this.content = null;
    }

    function utilities()
    {
        var me = this;

        this.gui_init = function()
        {
            var __data_content_id = test_app_bee.settings.general.id();

            infinity.setup(__data_content_id);
            infinity.begin();

            me.draw();
            me.attach_events();

            infinity.end();

            return true;
        };

        this.draw = function()
        {
            // Drawing stuff...

            return true;
        };

        this.attach_events = function()
        {
            //var __my_object = utils_sys.objects.by_id('my_content');

            //utils_sys.events.attach(config.id, __my_object, 'click', function(event) { my_function(event); });

            return true;
        };
        
        this.say = function()
        {
            return '<div style="height: 100%; overflow: auto; font-weight: bold;">' + 
                   '<br><br><br><center>HELLO WORLD!</center>' + 
                   '</div>';
        };
    }

    this.get_bee = function()
    {
        if (is_init === false)
            return false;

        return test_app_bee;
    };

    this.init = function(caller)
    {
        if (is_init === true)
            return false;

        is_init = true;

        test_app_bee = dev_box.get('bee');

        //utils_sys.graphics.apply_theme('/framework/extensions/js/test_app/themes', 'test_app');

        // Initialize infinity
        infinity.init();

        config.id = 'test_app';

        // Declare bee's settings
        test_app_bee.init(config.id, 1);
        test_app_bee.settings.data.window.labels.title('GreyOS :: Test App');
        test_app_bee.settings.data.window.labels.status_bar('GreyOS - Test application');
        test_app_bee.settings.data.window.content(utils_int.say());
        test_app_bee.gui.position.left(920);
        test_app_bee.gui.position.top(170);
        test_app_bee.gui.size.width(720);
        test_app_bee.gui.size.height(480);
        test_app_bee.gui.size.min.width(560);
        test_app_bee.gui.size.min.height(400);
        test_app_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        test_app_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        test_app_bee.on('open', function() { test_app_bee.gui.fx.fade.into(); });
        test_app_bee.on('opened', function() { utils_int.gui_init(); });
        test_app_bee.on('dragging', function()
                                    {
                                        test_app_bee.gui.fx.opacity.settings.set(0.7);
                                        test_app_bee.gui.fx.opacity.apply();
                                    });
        test_app_bee.on('dragged', function() { test_app_bee.gui.fx.opacity.reset(); });
        //test_app_bee.on('resizing', function() {  });
        //test_app_bee.on('resize', function() {  });
        //test_app_bee.on('resized', function() {  });
        test_app_bee.on('close', function()
                                 {
                                    test_app_bee.gui.fx.fade.out();

                                    caller.reset();
                                 });

        return true;
    };
    
    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');
        colony = cosmos.hub.access('colony');

        swarm = matrix.get('swarm');
        infinity = matrix.get('infinity');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        colony = null,
        swarm = null,
        infinity = null,
        test_app_bee = null,
        utils_sys = new vulcan(),
        config = new config_model(),
        utils_int = new utilities();
}
