/*
    GreyOS - Cloud Edit (Version: 1.8)

    File name: cloud_edit.js
    Description: This file contains the Cloud Edit - Code editor application.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Cloud Edit
function cloud_edit()
{
    var self = this;

    function config_model()
    {
        function ce_model()
        {
            this.editor = null;
            this.exec_button = null;
            this.status_label = null;
        }

        this.id = null;
        this.content = null;
        this.ce = new ce_model();
    }

    function ce_app_api()
    {
        this.reset = function()
        {
            utils_int.reset();
        };
    }

    function utilities()
    {
        var me = this;

        function run_code(event_object, mode)
        {
            var __code = null,
                __code_app = null,
                __this_app = null,
                __this_bee = null;

            if (event_object === undefined)
                return false;

            if (event_object.buttons !== 1)
                return false;

            __code = config.ce.editor.getValue();

            if (__code === '')
                return false;

            if (app_bee !== null)
            {
                app_bee.gui.actions.close(event_object);

                me.reset();

                return false;
            }

            if (mode === 2)
            {
                if (__code.indexOf('navigator') >= 0 || __code.indexOf('window') >= 0 || 
                    __code.indexOf('document') >= 0 || __code.indexOf('location') >= 0)
                    return false;

                
            }
            else
            {

            }

            try
            {
                eval(__code);

                __code_app = eval('new ' + __code);

                if (!is_valid_app(__code_app))
                {
                    config.ce.status_label.innerHTML = '[INVALID]';
                    config.ce.exec_button.value = 'Run';
                    config.ce.exec_button.classList.remove('ce_stop');

                    frog('CLOUD EDIT', '% Invalid %', 
                         'The application is invalid!\nPlease see the template...');

                    return false;
                }
            }
            catch(e)
            {
                config.ce.status_label.innerHTML = '[ERROR]';
                config.ce.exec_button.value = 'Run';
                config.ce.exec_button.classList.remove('ce_stop');

                frog('CLOUD EDIT', '(!) Error (!)', e);

                return false;
            }

            app_box.replace([__code_app.constructor]);

            __this_app = app_box.get(__code_app.constructor.name);
            __this_app.init(ce_api);

            __this_bee = __this_app.get_bee();

            if (!swarm.bees.insert(__this_bee))
            {
                config.ce.status_label.innerHTML = '[INVALID]';
                config.ce.exec_button.value = 'Run';
                config.ce.exec_button.classList.remove('ce_stop');

                frog('CLOUD EDIT', '% Unknown Method %', 
                     'The application contains unknown method(s)!');

                return false;
            }

            __this_bee.run();

            app_bee = __this_bee;

            config.ce.status_label.innerHTML = '[RUNNING]';
            config.ce.exec_button.value = 'Stop';
            config.ce.exec_button.classList.add('ce_stop');

            return true;
        }

        function is_valid_app(this_app)
        {
            if (utils_sys.validation.misc.is_undefined(this_app.cosmos) || 
                utils_sys.validation.misc.is_undefined(this_app.init) || 
                utils_sys.validation.misc.is_undefined(this_app.get_bee))
                return false;

            return true;
        }

        this.gui_init = function()
        {
            var __data_content_id = cloud_edit_bee.settings.general.id()  + '_data';

            infinity.setup(__data_content_id);
            infinity.begin();

            me.draw();
            me.attach_functions();
            me.attach_events();

            infinity.end();

            return true;
        };

        this.draw = function()
        {
            var dynamic_elements = document.createElement('span');

            config.ce.exec_button = document.createElement('input');
            config.ce.exec_button.id = 'ce_run_stop';
            config.ce.exec_button.type = 'button';
            config.ce.exec_button.value = 'Run';

            config.ce.status_label = document.createElement('span');
            config.ce.status_label.id = 'ce_status';
            config.ce.status_label.innerHTML = '[READY]';

            dynamic_elements.append(config.ce.status_label);
            dynamic_elements.append(config.ce.exec_button);

            utils_sys.objects.by_id(cloud_edit_bee.settings.general.id() + '_status_bar_msg').append(dynamic_elements);

            return true;
        };

        this.attach_functions = function()
        {
            config.ce.editor = ace.edit(cloud_edit_bee.settings.general.id() + '_data');

            ace.require('ace/ext/settings_menu').init(config.ce.editor);

            config.ce.editor.setTheme('ace/theme/tomorrow_night');
            config.ce.editor.session.setMode('ace/mode/javascript');
            config.ce.editor.setOptions({ enableBasicAutocompletion: true, 
                                          enableSnippets: true, 
                                          enableLiveAutocompletion: true, 
                                          printMargin: false, 
                                          vScrollBarAlwaysVisible: true, 
                                          fontSize: '14' 
                                        });
            config.ce.editor.commands.addCommands([ { name: 'showSettingsMenu', bindKey: {win: 'Ctrl-q', mac: 'Ctrl-q'}, 
                                                      exec: function(this_editor) { this_editor.showSettingsMenu(); } 
                                                    } ]);

             return true;
        };

        this.attach_events = function()
        {
            utils_sys.events.attach(config.ce.exec_button.id, config.ce.exec_button, 'mousedown', 
                                    function(event) { run_code(event, 2); });

            return true;
        };

        this.reset = function()
        {
            app_bee = null;

            config.ce.status_label.innerHTML = '[READY]';
            config.ce.exec_button.value = 'Run';
            config.ce.exec_button.classList.remove('ce_stop');

            return true;
        };

        this.destroy_editor = function()
        {
            config.ce.editor.destroy();

            return true;
        };
    }

    this.get_bee = function()
    {
        if (is_init === false)
            return false;

        return cloud_edit_bee;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        cloud_edit_bee = dev_box.get('bee');

        config.id = 'cloud_edit';
        config.content = '[*] Welcome to Cloud Edit!\n\n' + 
                         '[!] Please load the test app template from: "/framework/extensions/js/user/cloud_edit/my_app.js"\n';

        nature.theme([config.id]);
        nature.apply('new');

        infinity.init();

        // Declare bee's settings
        cloud_edit_bee.init(config.id, 2);
        cloud_edit_bee.settings.data.window.labels.title('Cloud Edit');
        cloud_edit_bee.settings.data.window.labels.status_bar('Integrated code editor for GreyOS');
        cloud_edit_bee.settings.data.window.content(config.content);
        cloud_edit_bee.gui.position.left(330);
        cloud_edit_bee.gui.position.top(80);
        cloud_edit_bee.gui.size.width(800);
        cloud_edit_bee.gui.size.height(530);
        cloud_edit_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        cloud_edit_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        cloud_edit_bee.on('open', function() { cloud_edit_bee.gui.fx.fade.into(); });
        cloud_edit_bee.on('opened', function() { utils_int.gui_init(); });
        cloud_edit_bee.on('dragging', function()
                                      {
                                          cloud_edit_bee.gui.fx.opacity.settings.set(0.7);
                                          cloud_edit_bee.gui.fx.opacity.apply();
                                      });
        cloud_edit_bee.on('dragged', function() { cloud_edit_bee.gui.fx.opacity.reset(); });
        cloud_edit_bee.on('close', function()
                                   {
                                       cloud_edit_bee.gui.fx.fade.out();

                                       utils_int.destroy_editor();
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
        app_box = cosmos.hub.access('app_box');
        colony = cosmos.hub.access('colony');

        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        nature = matrix.get('nature');
        infinity = matrix.get('infinity');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        app_box = null,
        colony = null,
        swarm = null,
        hive = null,
        nature = null,
        infinity = null,
        cloud_edit_bee = null,
        app_bee = null,
        config = new config_model(),
        ce_api = new ce_app_api(),
        utils_int = new utilities(),
        utils_sys = new vulcan();
}
