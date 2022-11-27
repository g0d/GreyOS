/*
    GreyOS - Meta-Script (Version: 1.5)

    File name: meta_script.js
    Description: This file contains the Meta-Script - Meta scripting language interface (wrapper) development module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2022
    Open Software License (OSL 3.0)
*/

// Meta-Script
function meta_script()
{
    var self = this;

    function config_models()
    {
        this.app = {};
        this.service = {};
        this.notification = {};
    }

    function program_config_model()
    {
        this.model = null;
        this.meta_caller = null;
        this.app = null;
        this.svc = null;
    }

    function interface()
    {
        this.desktops = function()
        {
            return forest;
        };

        this.dock = function()
        {
            return dock;
        };

        this.stack = function()
        {
            return hive;
        };

        this.tray = function()
        {
            return super_tray;
        };
    }

    function system()
    {
        function profile()
        {
            this.messages = function()
            {
                return true;
            };

            this.alerts = function()
            {
                return true;
            };

            this.calendar = function()
            {
                return true;
            };
        }

        function os()
        {
            this.info = function()
            {
                return xenon;
            };

            this.date_time = function()
            {
                return tik_tok;
            };

            this.tasks = function()
            {
                return owl;
            };

            this.fs = function()
            {
                return teal_fs;
            };

            this.reboot = function()
            {
                cc_reload.init();

                return true;
            };

            this.logout = function()
            {
                user_profile.logout();

                return true;
            };
        }

        this.apps = function()
        {
            return app_box;
        };

        this.services = function()
        {
            return matrix;
        };

        this.notifications = function(notification_config)
        {
            return true;
        };

        this.profile = new profile();
        this.os = new os();
    }

    this.app = function()
    {
        if (is_program_loaded === false)
            return false;

        function app_api_model()
        {
            var me = this,
                new_app = null;

            function menu()
            {
                this.open = function(event)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.actions.menu.open(event);
                };

                this.close = function(event)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.actions.menu.close(event);
                };
            }

            function main()
            {
                this.set_title = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.window.labels.title(val);
                };

                this.set_content = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.window.content(val);
                };

                this.set_status = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.window.labels.status_bar(val);
                };
            }

            function casement()
            {
                this.deploy = function(event, callback)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.actions.casement.deploy(event, callback);
                };

                this.hide = function(event, callback)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.actions.casement.hide(event, callback);
                };

                this.set_title = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.casement.labels.title(val);
                };

                this.set_content = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.casement.content(val);
                };

                this.set_status = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.casement.labels.status(val);
                };
            }

            function position()
            {
                this.set_top = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.actions.set_top();
                };

                this.left = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.position.left(val);
                };

                this.top = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.position.top(val);
                };
            }

            function size()
            {
                function min()
                {
                    this.width = function(val)
                    {
                        if (new_app === null)
                            return false;

                        return new_app.gui.size.min.width(val);
                    };

                    this.height = function(val)
                    {
                        if (new_app === null)
                            return false;

                        return new_app.gui.size.min.height(val);
                    };
                }

                function max()
                {
                    this.width = function(val)
                    {
                        if (new_app === null)
                            return false;

                        return new_app.gui.size.max.width(val);
                    };

                    this.height = function(val)
                    {
                        if (new_app === null)
                            return false;

                        return new_app.gui.size.max.height(val);
                    };
                }

                this.width = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.size.width(val);
                };

                this.height = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.gui.size.height(val);
                };

                this.min = new min();
                this.max = new max();
            }

            function can()
            {
                this.open = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.actions.can_open(val);
                };

                this.close = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.actions.can_close(val);
                };

                this.edit_title = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.actions.can_edit_title(val);
                };

                this.use_menu = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.actions.can_use_menu(val);
                };

                this.use_casement = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.actions.can_use_casement(val);
                };

                this.drag = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.actions.can_drag.enabled(val);
                };

                this.resize = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.actions.can_resize.enabled(val);
                };
            }

            function status()
            {
                function mouse()
                {
                    this.click = function()
                    {
                        if (new_app === null)
                            return false;

                        return new_app.status.gui.mouse_clicked();
                    };

                    this.down = function()
                    {
                        if (new_app === null)
                            return false;

                        return new_app.status.gui.mousedown();
                    };

                    this.up = function()
                    {
                        if (new_app === null)
                            return false;

                        return new_app.status.gui.mouseup();
                    };

                    this.move = function()
                    {
                        if (new_app === null)
                            return false;

                        return new_app.status.gui.mousemove();
                    };

                    this.out = function()
                    {
                        if (new_app === null)
                            return false;

                        return new_app.status.gui.mouseout();
                    };
                }

                this.running = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.system.running();
                };

                this.opened = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.gui.opened();
                };

                this.closed = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.gui.closed();
                };

                this.dragged = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.gui.dragged();
                };

                this.resized = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.gui.resized();
                };

                this.menu_activated = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.gui.menu_activated();
                };

                this.casement_deployed = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.gui.casement_deployed();
                };

                this.key_pressed = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.gui.key_pressed();
                };

                this.focused = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.system.active();
                };

                this.in_stack_bar = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.system.in_hive();
                };

                this.desktop_changed = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.system.desktop_changed();
                };

                this.content_updated = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.data.content_changed();
                };

                this.title_updated = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.data.labels.title_changed();
                };

                this.status_updated = function()
                {
                    if (new_app === null)
                        return false;

                    return new_app.status.data.labels.status_bar_label_changed();
                };

                this.mouse = new mouse();
            }

            function settings()
            {
                this.topmost = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.general.topmost(val);
                };

                this.status_bar_marquee = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.general.status_bar_marquee(val);
                };

                this.use_resize_tooltip = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.general.resize_tooltip(val);
                };

                this.casement_width = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.general.casement_width(val);
                };

                this.single_instance = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.general.single_instance(val);
                };    
            }

            this.get_app_id = function()
            {
                if (new_app === null)
                    return false;

                return new_app.settings.general.app_id();
            };

            this.get_system_id = function()
            {
                if (new_app === null)
                    return false;

                return new_app.settings.general.id();
            };

            this.get_desktop_id = function()
            {
                if (new_app === null)
                    return false;

                return new_app.settings.general.desktop_id();
            };

            this.get_last_error = function()
            {
                if (new_app === null)
                    return false;

                return new_app.error.last();
            };

            this.get_error_codes = function()
            {
                if (new_app === null)
                    return false;

                return new_app.error.codes;
            };

            this.get_keys = function(event)
            {
                if (new_app === null)
                    return false;

                return new_app.gui.actions.keys.get(event);
            };

            this.close = function(event)
            {
                if (new_app === null)
                    return false;

                return new_app.gui.actions.close(event);
            };

            this.on = function(event_name, callback)
            {
                if (new_app === null)
                    return false;

                return new_app.on(event_name, callback);
            };

            this.object = function()
            {
                if (new_app === null)
                    return false;

                return new_app;
            };

            this.reflection = function()
            {
                if (new_app === null)
                    return false;

                // TODO: Get source code written by programmer

                return null;
            };

            this.run = function(parent_app_id = null, headless = false)
            {
                if (new_app === null)
                    return false;

                program_config.meta_caller.telemetry(me.get_system_id());

                me.on('close', function()
                               {
                                   app_box.remove(program_config.model.name);

                                   program_config.meta_caller.reset();
                               });

                app_box.replace([program_config.model]);

                if (!swarm.bees.insert(new_app))
                    return false;

                return new_app.run(parent_app_id, headless);
            };

            this.init = function(app_id, resizable = true)
            {
                if (!utils_sys.validation.misc.is_bool(resizable))
                    return false;

                var type = 1;

                if (resizable === false)
                    type = 2;

                new_app = dev_box.get('bee');

                return new_app.init(app_id, type);
            };

            this.menu = new menu();
            this.main = new main();
            this.casement = new casement();
            this.position = new position();
            this.size = new size();
            this.can = new can();
            this.status = new status();
            this.settings = new settings();
        }

        program_config.app = new app_api_model();

        return program_config.app;
    }

    this.service = function()
    {
        if (is_program_loaded === false)
            return false;

        function svc_api_model()
        {
            var me = this,
                new_svc = null;

            this.get_config = function()
            {
                if (new_svc === null)
                    return false;

                return new_svc.get_config();
            };

            this.set = function(name, body)
            {
                if (new_svc === null)
                    return false;

                return new_svc.set_function(name, body);
            };

            this.execute = function(func_name, func_args = [])
            {
                if (new_svc === null)
                    return false;

                return new_svc.exec_function(func_name, func_args);
            };

            this.on = function(event_name, callback)
            {
                if (new_svc === null)
                    return false;

                return new_svc.on(event_name, callback);
            };

            this.run = function()
            {
                if (new_svc === null)
                    return false;

                me.on('register', function() { program_config.meta_caller.telemetry(me.get_config().sys_name); });
                me.on('unregister', function() { program_config.meta_caller.reset(); });

                super_tray.add(new_svc);

                return new_svc.register(program_config.model);
            };

            this.terminate = function()
            {
                if (new_svc === null)
                    return false;

                super_tray.remove(new_svc.get_config().sys_name);

                return new_svc.unregister(program_config.model.name);
            };

            this.init = function(svc_id, icon = 'default')
            {
                new_svc = dev_box.get('bat');

                return new_svc.init(svc_id, icon);
            };
        }

        program_config.svc = new svc_api_model();

        return program_config.svc;
    };

    function program()
    {
        this.start = function(program_model, meta_caller)
        {
            if (!utils_sys.validation.misc.is_function(program_model) || 
                !utils_sys.validation.misc.is_object(meta_caller))
                return false;

            program_config.model = program_model;
            program_config.meta_caller = meta_caller;

            is_program_loaded = true;

            return true;
        };

        this.end = function()
        {
            if (is_program_loaded === false)
                return false;

            if (program_config.app !== null)
                program_config.app.close(null);

            if (program_config.svc !== null)
                program_config.svc.terminate();

            is_program_loaded = false;

            return true;
        };
    }

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');
        dev_box = cosmos.hub.access('dev_box');

        xenon = matrix.get('xenon');
        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        forest = matrix.get('forest');
        dock = matrix.get('dock');
        user_profile = matrix.get('user_profile');
        tik_tok = matrix.get('tik_tok');
        parrot = matrix.get('parrot');
        octopus = matrix.get('octopus');
        super_tray = matrix.get('super_tray');
        owl = matrix.get('owl');
        teal_fs = matrix.get('teal_fs');
        infinity = matrix.get('infinity');

        return true;
    };

    var is_program_loaded = false,
        cosmos = null,
        matrix = null,
        app_box = null,
        dev_box = null,
        xenon = null,
        swarm = null,
        hive = null,
        forest = null,
        dock = null,
        user_profile = null,
        tik_tok = null,
        parrot = null,
        octopus = null,
        super_tray = null,
        owl = null,
        teal_fs = null,
        infinity = null,
        utils_sys = new vulcan(),
        config_parser = new jap(),
        cc_reload = new f5(),
        config_models = new config_models(),
        program_config = new program_config_model();

    this.interface = new interface();
    this.system = new system();
    this.program = new program();
}
