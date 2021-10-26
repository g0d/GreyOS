/*
    GreyOS Inc. - Cloud Edit (GreyOS Code Editor)
    
    File name: cloud_edit.js (Version: 1.0)
    Description: This file contains the Cloud Edit - GreyOS Code Editor extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2021
*/



// Cloud Edit
function cloud_edit()
{
    var self = this;

    function utilities()
    {
        this.gui_init = function()
        {
            utils.draw();
            utils.attach_functions();
            utils.attach_events();

            return true;
        };

        this.draw = function()
        {
            

            return true;
        };

        this.attach_functions = function()
        {
            ce_component = ace.edit("cloud_edit_data");

            ace.require('ace/ext/settings_menu').init(ce_component);

            ce_component.setTheme("ace/theme/tomorrow_night");
            ce_component.session.setMode("ace/mode/javascript");
            ce_component.setOptions({ enableBasicAutocompletion: true, 
                                enableSnippets: true, 
                                enableLiveAutocompletion: true, 
                                printMargin: false, 
                                vScrollBarAlwaysVisible: true, 
                                fontSize: "14" 
                              });
            ce_component.commands.addCommands([ { name: "showSettingsMenu", bindKey: {win: "Ctrl-q", mac: "Ctrl-q"}, 
                                            exec: function(this_editor) { this_editor.showSettingsMenu(); } 
                                          }
                                        ]);
            
             return true;
        };

        this.attach_events = function()
        {
            var __run_button = vulcan.objects.by_id('ce_run');

            vulcan.events.attach(config.id, __run_button, 'click', function(event) { run_code(event); });

            return true;
        };

        function run_code(event_object)
        {
            var __code = null,
                __this_app = null,
                __this_bee = null;

            if (event_object === undefined)
                return false;

            __code = ce_component.getValue();

            if (__code === null)
                return false;

            eval(__code);

            __this_app = eval('new ' + __code);

            app_box.push([eval(__this_app.id())]);

            __this_app = app_box.get(__this_app.id());
            __this_app.init();

            __this_bee = __this_app.get_bee();

            swarm.bees.insert(__this_bee);

            __this_bee.show();

            return true;
        }
    }

    function config_model()
    {
        this.id = null;
        this.content = null;
    }

    this.id = function()
    {
        return 'cloud_edit';
    };

    this.get_bee = function()
    {
        if (is_init === false)
            return false;

        return cloud_edit_bee;
    };

    this.init = function()
    {
        if (is_init === true)
            return false;

        is_init = true;

        cloud_edit_bee = dev_box.get('bee');
        infinity = dev_box.get('infinity');
        fx = dev_box.get('fx');
        fx.init(cosmos);  

        vulcan.graphics.apply_theme('/framework/extensions/js/cloud_edit/themes', 'cloud_edit');

        config.id = 'cloud_edit'; //+ pythia.generate();

        // Declare bee's settings
        cloud_edit_bee.init(cosmos, config.id, 1);
        cloud_edit_bee.settings.data.window.labels.title('Cloud Edit');
        cloud_edit_bee.settings.data.window.labels.status_bar('Integrated code editor for GreyOS <input id="ce_run" type="button" value="Run">');
        cloud_edit_bee.gui.position.left(330);
        cloud_edit_bee.gui.position.top(100);
        cloud_edit_bee.gui.size.width(720);
        cloud_edit_bee.gui.size.height(480);
        cloud_edit_bee.gui.size.min.width(560);
        cloud_edit_bee.gui.size.min.height(400);
        cloud_edit_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        cloud_edit_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        cloud_edit_bee.on('open', function() { cloud_edit_bee.gui.fx.fade.into(); });
        cloud_edit_bee.on('opened', function() { return utils.gui_init(); });
        cloud_edit_bee.on('dragging', function()
                                      {
                                          cloud_edit_bee.gui.fx.opacity.settings.set(0.7);
                                          cloud_edit_bee.gui.fx.opacity.apply();
                                      });
        cloud_edit_bee.on('dragged', function() { cloud_edit_bee.gui.fx.opacity.reset(); });
        cloud_edit_bee.on('resizing', function() {  });
        cloud_edit_bee.on('resize', function() {  });
        cloud_edit_bee.on('resized', function() {  });
        cloud_edit_bee.on('close', function() { cloud_edit_bee.gui.fx.fade.out(); });

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');
        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');
        app_box = cosmos.hub.access('app_box');

        pythia = matrix.get('pythia');
        colony = matrix.get('colony');
        swarm = matrix.get('swarm');

        cosmos_exists = true;

        return true;
    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        dev_box = null,
        app_box = null,
        pythia = null,
        infinity = null,
        colony = null,
        swarm = null,
        fx = null,
        cloud_edit_bee = null,
        ce_component = null,
        config = new config_model(),
        utils = new utilities();
}
