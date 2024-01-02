/*
    GreyOS - Meta-Script (Version: 1.2)

    File name: meta_script.js
    Description: This file contains the Meta-Script - Meta scripting language interface (wrapper) development module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2024
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
        this.apps = [];
        this.svcs = [];
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
                __new_app = null,
                __is_init = false,
                __is_run = false;

            function menu()
            {
                this.open = function(event)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.actions.menu.open(event);
                };

                this.close = function(event)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.actions.menu.close(event);
                };
            }

            function main()
            {
                this.set_title = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.data.window.labels.title(val);
                };

                this.set_content = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.data.window.content(val);
                };

                this.set_status = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.data.window.labels.status_bar(val);
                };
            }

            function casement()
            {
                this.deploy = function(event, callback)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.actions.casement.deploy(event, callback);
                };

                this.hide = function(event, callback)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.actions.casement.hide(event, callback);
                };

                this.set_title = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.data.casement.labels.title(val);
                };

                this.set_content = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.data.casement.content(val);
                };

                this.set_status = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.data.casement.labels.status(val);
                };
            }

            function position()
            {
                this.set_top = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.actions.set_top();
                };

                this.left = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.position.left(val);
                };

                this.top = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.position.top(val);
                };
            }

            function size()
            {
                function min()
                {
                    this.width = function(val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.size.min.width(val);
                    };

                    this.height = function(val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.size.min.height(val);
                    };
                }

                function max()
                {
                    this.width = function(val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.size.max.width(val);
                    };

                    this.height = function(val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.size.max.height(val);
                    };
                }

                this.width = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.size.width(val);
                };

                this.height = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.gui.size.height(val);
                };

                this.min = new min();
                this.max = new max();
            }

            function fx()
            {
                function enabled()
                {
                    function fade()
                    {
                        this.into = function(val)
                        {
                            if (__new_app === null)
                                return false;

                            return __new_app.gui.fx.fade.into(val);
                        };

                        this.out = function(val)
                        {
                            if (__new_app === null)
                                return false;

                            return __new_app.gui.fx.fade.out(val);
                        };
                    }

                    this.all = function(val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.fx.enabled.all(val);
                    };

                    this.opacity = function(val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.fx.enabled.opacity(val);
                    };

                    this.fade = new fade();
                }

                function opacity()
                {
                    function settings()
                    {
                        this.get = function()
                        {
                            if (__new_app === null)
                                return false;
    
                            return __new_app.gui.fx.opacity.settings.get();
                        };

                        this.set = function(val)
                        {
                            if (__new_app === null)
                                return false;
    
                            return __new_app.gui.fx.opacity.settings.set(val);
                        };
                    }

                    this.apply = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.fx.opacity.apply();
                    };

                    this.reset = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.fx.opacity.reset();
                    };

                    this.settings = new settings();
                }

                function fade()
                {
                    function settings()
                    {
                        this.batch = function(type, step, speed, delay)
                        {
                            if (__new_app === null)
                                return false;

                            return __new_app.gui.fx.fade.settings.batch(type, step, speed, delay);
                        };

                        function into()
                        {
                            function get()
                            {
                                this.from = function(option, index)
                                {
                                    if (__new_app === null)
                                        return false;

                                    return __new_app.gui.fx.fade.settings.into.get.from(option, index);
                                };

                                this.last = function(option)
                                {
                                    if (__new_app === null)
                                        return false;

                                    return __new_app.gui.fx.fade.settings.into.get.last(option);
                                };
                            }

                            this.set = function(step, speed, delay)
                            {
                                if (__new_app === null)
                                    return false;

                                return __new_app.gui.fx.fade.settings.into.set(step, speed, delay);
                            };

                            this.get = new get();
                        }

                        function out()
                        {
                            function get()
                            {
                                this.from = function(option, index)
                                {
                                    if (__new_app === null)
                                        return false;

                                    return __new_app.gui.fx.fade.settings.out.get.from(option, index);
                                };

                                this.last = function(option)
                                {
                                    if (__new_app === null)
                                        return false;

                                    return __new_app.gui.fx.fade.settings.out.get.last(option);
                                };
                            }

                            this.set = function(step, speed, delay)
                            {
                                if (__new_app === null)
                                    return false;

                                return __new_app.gui.fx.fade.settings.out.set(step, speed, delay);
                            };

                            this.get = new get();
                        }

                        this.into = new into();
                        this.out = new out();
                    }

                    this.batch = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.fx.fade.batch();
                    };

                    this.into = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.fx.fade.into();
                    };

                    this.out = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.fx.fade.out();
                    };

                    this.settings = new settings();
                }

                this.enabled = new enabled();
                this.opacity = new opacity();
                this.fade = new fade();
            }

            function css()
            {
                function style()
                {
                    this.get = function(context, sub_context, option)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.css.style.get(context, sub_context, option);
                    };

                    this.set = function(context, sub_context, option, val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.css.style.set(context, sub_context, option, val);
                    };
                }

                function class_name()
                {
                    this.get = function(context, sub_context)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.css.style.get(context, sub_context);
                    };

                    this.set = function(context, sub_context, val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.gui.css.style.set(context, sub_context, val);
                    };
                }

                this.style = new style();
                this.class_name = new class_name();
            }

            function can()
            {
                this.open = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.actions.can_open(val);
                };

                this.close = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.actions.can_close(val);
                };

                this.edit_title = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.actions.can_edit_title(val);
                };

                this.use_menu = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.actions.can_use_menu(val);
                };

                this.use_casement = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.actions.can_use_casement(val);
                };

                this.drag = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.actions.can_drag.enabled(val);
                };

                this.resize = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.actions.can_resize.enabled(val);
                };
            }

            function status()
            {
                function mouse()
                {
                    this.event = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mouse_clicked();
                    };

                    this.click = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mouseclick();
                    };

                    this.dblclick = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mousedblclick();
                    };

                    this.down = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mousedown();
                    };

                    this.up = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mouseup();
                    };

                    this.move = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mousemove();
                    };

                    this.over = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mouseover();
                    };

                    this.out = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.mouseout();
                    };
                }

                function keyboard()
                {
                    this.event = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.key_pressed();
                    };

                    this.press = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.keypress();
                    };

                    this.down = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.keydown();
                    };

                    this.up = function()
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.status.gui.keyup();
                    };
                }

                this.running = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.system.running();
                };

                this.opened = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.gui.opened();
                };

                this.closed = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.gui.closed();
                };

                this.dragged = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.gui.dragged();
                };

                this.resized = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.gui.resized();
                };

                this.topmost = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.gui.topmost();
                };

                this.menu_activated = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.gui.menu_activated();
                };

                this.casement_deployed = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.gui.casement_deployed();
                };

                this.focused = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.system.active();
                };

                this.in_stack_bar = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.system.in_hive();
                };

                this.desktop_changed = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.system.desktop_changed();
                };

                this.content_updated = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.data.content_changed();
                };

                this.title_updated = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.data.labels.title_changed();
                };

                this.status_updated = function()
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.status.data.labels.status_bar_label_changed();
                };

                this.mouse = new mouse();
                this.keyboard = new keyboard();
            }

            function settings()
            {
                this.single_instance = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.general.single_instance(val);
                };

                this.resizable = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.general.resizable(val);
                };

                this.casement_width = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.general.casement_width(val);
                };

                this.status_bar_marquee = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.general.status_bar_marquee(val);
                };

                this.use_resize_tooltip = function(val)
                {
                    if (__new_app === null)
                        return false;

                    return __new_app.settings.general.resize_tooltip(val);
                };
            }

            this.get_app_id = function()
            {
                if (__new_app === null)
                    return false;

                return __new_app.settings.general.app_id();
            };

            this.get_system_id = function()
            {
                if (__new_app === null)
                    return false;

                return __new_app.settings.general.id();
            };

            this.get_desktop_id = function()
            {
                if (__new_app === null)
                    return false;

                return __new_app.settings.general.desktop_id();
            };

            this.get_last_error = function()
            {
                if (__new_app === null)
                    return false;

                return __new_app.error.last();
            };

            this.get_error_codes = function()
            {
                if (__new_app === null)
                    return false;

                return __new_app.error.codes;
            };

            this.get_keys = function(event)
            {
                if (__new_app === null)
                    return false;

                return __new_app.gui.actions.keys.get(event);
            };

            this.close = function(event)
            {
                if (__new_app === null)
                    return false;

                __is_run = false;

                return __new_app.gui.actions.close(event);
            };

            this.on = function(event_name, callback)
            {
                if (__new_app === null)
                    return false;

                return __new_app.on(event_name, callback);
            };

            this.object = function()
            {
                if (__new_app === null)
                    return false;

                return __new_app;
            };

            this.reflection = function()
            {
                if (__new_app === null)
                    return false;

                return program_config.meta_caller.source();
            };

            this.run = function(parent_app_id = null, headless = false)
            {
                if (__new_app === null || __is_run === true)
                    return false;

                program_config.meta_caller.telemetry(me.get_system_id());

                me.on('close', function()
                               {
                                   app_box.remove(program_config.model.name);

                                   //program_config.meta_caller.reset();
                               });

                app_box.replace([program_config.model]);

                if (!swarm.bees.insert(__new_app))
                    return false;

                var __result = __new_app.run(parent_app_id, headless);

                if (__result === true)
                    __is_run = true;

                return __result;
            };

            this.init = function(app_id)
            {
                if (__is_init === true)
                    return false;

                __new_app = dev_box.get('bee');

                __result = __new_app.init(app_id);

                if (__result === true)
                    __is_init = true;

                return __result;
            };

            this.menu = new menu();
            this.main = new main();
            this.casement = new casement();
            this.position = new position();
            this.size = new size();
            this.fx = new fx();
            this.css = new css();
            this.can = new can();
            this.status = new status();
            this.settings = new settings();
        }

        global_app_index++;

        program_config.apps.push(new app_api_model());

        return program_config.apps[global_app_index];
    }

    this.service = function()
    {
        if (is_program_loaded === false)
            return false;

        function svc_api_model()
        {
            var me = this,
                __new_svc = null,
                __is_init = false,
                __is_run = false;

            this.get_config = function()
            {
                if (__new_svc === null)
                    return false;

                return __new_svc.get_config();
            };

            this.set = function(name, body)
            {
                if (__new_svc === null)
                    return false;

                return __new_svc.set_function(name, body);
            };

            this.execute = function(func_name, func_args = [])
            {
                if (__new_svc === null)
                    return false;

                return __new_svc.exec_function(func_name, func_args);
            };

            this.on = function(event_name, callback)
            {
                if (__new_svc === null)
                    return false;

                return __new_svc.on(event_name, callback);
            };

            this.terminate = function()
            {
                if (__new_svc === null)
                    return false;

                super_tray.remove(__new_svc.get_config().sys_name);

                __is_run = false;

                return __new_svc.unregister(program_config.model.name);
            };

            this.reflection = function()
            {
                if (__new_svc === null)
                    return false;

                return program_config.meta_caller.source();
            };

            this.run = function()
            {
                if (__new_svc === null || __is_run === true)
                    return false;

                me.on('register', function() { program_config.meta_caller.telemetry(me.get_config().sys_name); });
                //me.on('unregister', function() { program_config.meta_caller.reset(); });

                matrix.unregister(program_config.model.name);

                var __result = __new_svc.register(program_config.model);

                if (__result === true)
                {
                    super_tray.add(__new_svc);

                    __is_run = true;
                }

                return __result;
            };

            this.init = function(svc_id, icon = 'default')
            {
                if (__is_init === true)
                    return false;

                __new_svc = dev_box.get('bat');

                var __result = __new_svc.init(svc_id, icon);

                if (__result === true)
                    __is_init = true;

                return __result;
            };
        }

        global_svc_index++

        program_config.svcs.push(new svc_api_model());

        return program_config.svcs[global_svc_index];
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

            for (var i = 0; i < program_config.apps.length; i++)
                program_config.apps[i].close(null);

            for (var i = 0; i < program_config.svcs.length; i++)
                program_config.svcs[i].terminate();

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
        infinity = dev_box.get('infinity');

        return true;
    };

    var is_program_loaded = false,
        global_app_index = -1,
        global_svc_index = -1,
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
