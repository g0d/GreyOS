/*
    GreyOS - Cloud Edit (Version: 2.2)

    File name: cloud_edit.js
    Description: This file contains the Cloud Edit - Code editor application.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2022
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

    function ce_program_api()
    {
        this.telemetry = function(prog_id)
        {
            program_id = prog_id;

            return true;
        };

        this.reset = function()
        {
            return utils_int.reset();
        };
    }

    function utilities()
    {
        var me = this;

        function run_code(event_object)
        {
            var __code = null;

            if (utils_sys.validation.misc.is_undefined(event_object))
                return false;

            if (event_object.buttons !== 1)
                return false;

            if (program_is_running === true)
                return utils_int.reset();

            __code = config.ce.editor.getValue();

            if (!executor.load(__code))
            {
                config.ce.status_label.innerHTML = '[EMPTY]';
                config.ce.exec_button.value = 'Run';
                config.ce.exec_button.classList.remove('ce_stop');

                frog('CLOUD EDIT', '% Empty %', 
                     'No code detected!');

                return false;
            }

            if (executor.process(ce_api) !== true)
            {
                if (executor.error.last.code() === executor.error.codes.INVALID)
                {
                    config.ce.status_label.innerHTML = '[INVALID]';
                    config.ce.exec_button.value = 'Run';
                    config.ce.exec_button.classList.remove('ce_stop');

                    frog('CLOUD EDIT', '% Invalid %', 
                         executor.error.last.message() + '\nPlease check the template...');
                }
                else if (executor.error.last.code() === executor.error.codes.MISMATCH)
                {
                    config.ce.status_label.innerHTML = '[ERROR]';
                    config.ce.exec_button.value = 'Run';
                    config.ce.exec_button.classList.remove('ce_stop');

                    frog('CLOUD EDIT', '[!] Error [!]', executor.error.last.message());
                }
                else if (executor.error.last.code() === executor.error.codes.OTHER)
                {
                    config.ce.status_label.innerHTML = '[ERROR]';
                    config.ce.exec_button.value = 'Run';
                    config.ce.exec_button.classList.remove('ce_stop');

                    frog('CLOUD EDIT', '[!] Error [!]', executor.error.last.message());
                }

                return executor.terminate();
            }

            config.ce.status_label.innerHTML = '[RUNNING]';
            config.ce.exec_button.value = 'Stop';
            config.ce.exec_button.classList.add('ce_stop');

            program_is_running = true;

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
                                    function(event) { run_code(event); });

            return true;
        };

        this.reset = function()
        {
            executor.terminate();

            config.ce.status_label.innerHTML = '[READY]';
            config.ce.exec_button.value = 'Run';
            config.ce.exec_button.classList.remove('ce_stop');

            program_is_running = false;

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
                         '[!] Please load the test template from: "/framework/extensions/js/user/cloud_edit/my_ms_program.js"\n';

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

                                       utils_int.reset();
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
        colony = cosmos.hub.access('colony');

        executor = dev_box.get('executor');
        nature = matrix.get('nature');
        infinity = matrix.get('infinity');

        return true;
    };

    var is_init = false,
        program_is_running = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        colony = null,
        executor = null,
        nature = null,
        infinity = null,
        cloud_edit_bee = null,
        config = new config_model(),
        ce_api = new ce_program_api(),
        utils_int = new utilities(),
        utils_sys = new vulcan();
}
