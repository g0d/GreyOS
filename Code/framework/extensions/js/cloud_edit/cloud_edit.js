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

            return true;
        };

        this.draw = function()
        {
            

            return true;
        };

        this.attach_functions = function()
        {
            var editor = ace.edit("cloud_edit_data");

            ace.require('ace/ext/settings_menu').init(editor);

            editor.setTheme("ace/theme/tomorrow_night");
            editor.session.setMode("ace/mode/javascript");
            editor.setOptions({ enableBasicAutocompletion: true, 
                                enableSnippets: true, 
                                enableLiveAutocompletion: true, 
                                printMargin: false, 
                                vScrollBarAlwaysVisible: true, 
                                fontSize: "14" 
                              });
            editor.commands.addCommands([ { name: "showSettingsMenu", bindKey: {win: "Ctrl-q", mac: "Ctrl-q"}, 
                                            exec: function(editor) { editor.showSettingsMenu(); } 
                                          }
                                        ]);
        };
    }

    function config_model()
    {
        this.id = null;
        this.content = null;
    }

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
        cloud_edit_bee.init(cosmos, config.id, 2);
        cloud_edit_bee.settings.data.window.labels.title('Cloud Edit');
        cloud_edit_bee.settings.data.window.labels.status_bar('Integrated code editor for GreyOS');
        cloud_edit_bee.gui.position.left(330);
        cloud_edit_bee.gui.position.top(100);
        cloud_edit_bee.gui.size.width(720);
        cloud_edit_bee.gui.size.height(480);
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
        pythia = null,
        infinity = null,
        colony = null,
        swarm = null,
        fx = null,
        cloud_edit_bee = null,
        config = new config_model(),
        utils = new utilities();
}
