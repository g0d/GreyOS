/*
    GreyOS - Meta-Script (Version: 1.8)

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

    function ms_object_model()
    {
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

            this.sound = function()
            {
                return parrot;
            };

            this.usb = function()
            {
                return octopus;
            };

            this.timer = function()
            {
                return precise_timer;
            };

            this.tasks = function()
            {
                return owl;
            };

            this.fs = function()
            {
                return teal_fs;
            };

            this.gaming_controllers = function()
            {
                return xgc;
            };

            this.utilities = function()
            {
                return utils_sys;
            };

            this.random = function()
            {
                return random;
            };

            this.net = function()
            {
                return ajax;
            };

            this.remote_comm = function(ajax_data, success_cb, failure_cb, default_cb)
            {
                return ajax_factory(ajax_data, success_cb, failure_cb, default_cb);
            };

            this.settings_validator = function()
            {
                return config_parser;
            };

            this.run = function(program)
            {
                // TODO:...

                return (program);
            };

            this.quit = function(program)
            {
                // TODO:...

                return (program);
            };

            this.reboot = function()
            {
                // TODO: Inform user and check for his/her prompt
    
                cc_reload.init();

                return true;
            };

            this.logout = function()
            {
                // TODO: Inform user and check for his/her prompt

                return user_profile.logout();
            };
        }

        function system()
        {
            function ui()
            {
                this.themes = function()
                {
                    return nature;
                };

                this.progress = function()
                {
                    return infinity;
                };

                this.message_box = function()
                {
                    return msg_win;
                };

                this.work_box = function()
                {
                    return work_box;
                };
            }

            function profile()
            {
                this.messages = function()
                {
                    // TODO:...

                    return true;
                };

                this.alerts = function()
                {
                    // TODO:...

                    return true;
                };

                this.calendar = function()
                {
                    // TODO:...

                    return true;
                };

                this.settings = function()
                {
                    // TODO:...

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
                // TODO:...

                return true;
            };

            this.ui = new ui();
            this.profile = new profile();
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

        function program()
        {
            this.expose_api = function(public_calls_array)
            {
                if (!utils_sys.validation.misc.is_array(public_calls_array))
                        return false;

                var __public_call = null,
                    __public_api_calls_config = 
                    {
                        "program_id"    :   program_config.model.name,
                        "calls"         :   []
                    };

                for (__public_call of public_calls_array)
                {
                    __public_api_calls_config.calls.push(__public_call);

                    if (!uniplex.expose(__public_api_calls_config))
                        return false;
                }

                return true;
            };

            this.list_api = function()
            {
                return uniplex.list();
            };
        }

        this.app = function()
        {
            if (is_program_loaded === false)
                return false;

            var me = this;

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
                    this.show = function(event, callback)
                    {
                        if (__new_app === null)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(event))
                            event = null;

                        return __new_app.gui.actions.casement.deploy(event, callback);
                    };

                    this.hide = function(event, callback)
                    {
                        if (__new_app === null)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(event))
                            event = null;

                        return __new_app.gui.actions.casement.retract(event, callback);
                    };

                    this.trigger = function(event, callback)
                    {
                        if (__new_app === null)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(event))
                            event = null;

                        me.casement.hide(event, callback);
                        me.casement.show(event, callback);

                        return true;
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
                    this.set_topmost = function()
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

                    this.icon = function(val)
                    {
                        if (__new_app === null)
                            return false;

                        return __new_app.settings.general.icon(val);
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

                this.run = function(child_apps_array = [], headless = false)
                {
                    if (__new_app === null || __is_run === true)
                        return false;

                    if (!app_box.replace([program_config.model]))
                        return false;

                    if (!swarm.bees.insert(__new_app))
                        return false;

                    var __result = __new_app.run(child_apps_array, headless);

                    if (__result === true)
                        __is_run = true;

                    var __data = {
                                    "ms_id"     :   program_config.model.name,
                                    "app_id"    :   me.get_system_id(),
                                    "name"      :   me.get_app_id(),
                                    "icon"      :   me.settings.icon(),
                                    "type"      :   "app",
                                    "error"     :   __new_app.error.last()
                                 };

                    program_config.meta_caller.telemetry(__data);

                    me.on('close', function()
                                   {
                                       app_box.remove(program_config.model.name);

                                       //program_config.meta_caller.reset();
                                   });

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

                this.config = function()
                {
                    if (__new_svc === null)
                        return false;

                    return __new_svc.config();
                };

                this.set = function(func_name, body)
                {
                    if (__new_svc === null)
                        return false;

                    return __new_svc.set_function(func_name, body);
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

                this.reflection = function()
                {
                    if (__new_svc === null)
                        return false;

                    return program_config.meta_caller.source();
                };

                this.terminate = function()
                {
                    if (__new_svc === null)
                        return false;

                    __is_run = false;

                    return __new_svc.unregister();
                };

                this.run = function(action)
                {
                    if (__new_svc === null || __is_run === true)
                        return false;

                    if (!svc_box.replace([program_config.model]))
                        return false;

                    var __result = __new_svc.register(action);

                    if (__result === true)
                        __is_run = true;

                    var __data = {
                                    "ms_id"     :   program_config.model.name,
                                    "svc_id"    :   me.config().sys_name,
                                    "name"      :   me.config().name,
                                    "icon"      :   me.config().icon,
                                    "type"      :   "svc",
                                    "error"     :   null
                                 };

                    program_config.meta_caller.telemetry(__data);

                    me.on('register', function() { /* Ideas...??? */ });
                    me.on('unregister', function() { svc_box.remove(program_config.model.name); });

                    return __result;
                };

                this.init = function(svc_id, icon = 'svc_default', in_super_tray = true)
                {
                    if (__is_init === true)
                        return false;

                    __new_svc = dev_box.get('bat');

                    var __result = __new_svc.init(svc_id, icon, in_super_tray);

                    if (__result === true)
                        __is_init = true;

                    return __result;
                };
            }

            global_svc_index++

            program_config.svcs.push(new svc_api_model());

            return program_config.svcs[global_svc_index];
        };

        this.os = new os();
        this.system = new system();
        this.interface = new interface();
        this.program = new program();    
    }

    this.start = function(program_model, meta_caller)
    {
        if (!utils_sys.validation.misc.is_function(program_model) || 
            !utils_sys.validation.misc.is_object(meta_caller))
            return false;

        program_config.model = program_model;
        program_config.meta_caller = meta_caller;

        program_config.apps = [];
        program_config.svcs = [];

        global_app_index = -1;
        global_svc_index = -1;

        is_program_loaded = true;

        return true;
    };

    this.end = function()
    {
        if (is_program_loaded === false)
            return false;

        var i = 0,
            __apps_num = program_config.apps.length,
            __svcs_num = program_config.svcs.length;

        for (i = 0; i < __apps_num; i++)
            program_config.apps[i].close(null);

        for (i = 0; i < __svcs_num; i++)
            program_config.svcs[i].terminate();

        uniplex.clear(program_config.model.name);

        is_program_loaded = false;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');
        svc_box = cosmos.hub.access('svc_box');
        dev_box = cosmos.hub.access('dev_box');

        xenon = matrix.get('xenon');
        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        forest = matrix.get('forest');
        dock = matrix.get('dock');
        user_profile = matrix.get('user_profile');
        nature = matrix.get('nature');
        tik_tok = matrix.get('tik_tok');
        parrot = matrix.get('parrot');
        octopus = matrix.get('octopus');
        super_tray = matrix.get('super_tray');
        owl = matrix.get('owl');
        xgc = matrix.get('xgc');
        uniplex = matrix.get('uniplex');
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
        svc_box = null,
        dev_box = null,
        xenon = null,
        swarm = null,
        hive = null,
        forest = null,
        dock = null,
        user_profile = null,
        nature = null,
        tik_tok = null,
        parrot = null,
        octopus = null,
        super_tray = null,
        owl = null,
        xgc = null,
        uniplex = null,
        teal_fs = null,
        infinity = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        msg_win = new msgbox(),
        precise_timer = new stopwatch(),
        config_parser = new jap(),
        ajax = new taurus(),
        work_box = new workbox(),
        cc_reload = new f5(),
        config_models = new config_models(),
        program_config = new program_config_model();

    this.ms_object = new ms_object_model();
}
