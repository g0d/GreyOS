// GreyOS - My App (Default Cloud Edit template)
function my_app()
{
    var self = this;

    // This is a model of configured parameters (Optional)
    function config_model()
    {
        this.id = null;
        this.content = null;
    }

    // This is a model of internal utilities (Optional)
    function utilities()
    {
        var me = this;

        this.gui_init = function()
        {
            var __data_content_id = my_app_bee.settings.general.id() + '_data';

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
    }

    // This is the entry point for a caller application to get your window details (Required)
    this.get_bee = function()
    {
        if (is_init === false)
            return false;

        return my_app_bee;
    };

    // This is the main entry point for your application (Required)
    this.init = function(caller)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        my_app_bee = dev_box.get('bee');

        config.id = 'my_app';
        config.content = '<br><br><br><center>HELLO WORLD!</center>';

        // Apply theme
        nature.theme([config.id]);
        nature.apply('new');

        // Initialize infinity
        infinity.init();

        // Declare bee's settings
        my_app_bee.init(config.id, 1);
        my_app_bee.settings.general.backtrace(true);
        my_app_bee.settings.data.window.labels.title('GreyOS :: My App');
        my_app_bee.settings.data.window.labels.status_bar('My first integrated app on GreyOS!');
        my_app_bee.settings.data.window.content(config.content);
        my_app_bee.gui.position.left(920);
        my_app_bee.gui.position.top(170);
        my_app_bee.gui.size.width(720);
        my_app_bee.gui.size.height(480);
        my_app_bee.gui.size.min.width(560);
        my_app_bee.gui.size.min.height(400);
        my_app_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        my_app_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        my_app_bee.on('open', function() { my_app_bee.gui.fx.fade.into(); });
        my_app_bee.on('opened', function() { utils_int.gui_init(); });
        my_app_bee.on('dragging', function()
                                  {
                                      my_app_bee.gui.fx.opacity.settings.set(0.7);
                                      my_app_bee.gui.fx.opacity.apply();
                                  });
        my_app_bee.on('dragged', function() { my_app_bee.gui.fx.opacity.reset(); });
        //my_app_bee.on('resizing', function() {  });
        //my_app_bee.on('resize', function() {  });
        //my_app_bee.on('resized', function() {  });
        my_app_bee.on('close', function()
                               {
                                  my_app_bee.gui.fx.fade.out();

                                  // API exposed by the caller (Cloud Edit in this case)
                                  caller.reset();
                               });

        return true;
    };

    // This is the main entry point for the IMC system (Required)
    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');
        app_box = cosmos.hub.access('app_box');
        colony = cosmos.hub.access('colony');

        swarm = matrix.get('swarm');
        nature = matrix.get('nature');
        infinity = matrix.get('infinity');

        return true;
    };

    // This are the global variables (Required per case)
    var is_init = false,                // It is a good practice to use that
        cosmos = null,                  // This is a required internal variable to access the IMC
        matrix = null,                  // System services hub
        dev_box = null,                 // Development tools hub
        app_box = null,                 // Applications hub
        colony = null,                  // Bees keeper & manager hub
        swarm = null,                   // Swarm of bees (desktop apps)
        infinity = null,                // Progress (loading) indicator
        nature = null,                  // Theme manager
        my_app_bee = null,              // A variable to store a model of the window
        utils_sys = new vulcan(),       // System utilities
        config = new config_model(),    // A configuration model
        utils_int = new utilities();    // Internal utilities
}
