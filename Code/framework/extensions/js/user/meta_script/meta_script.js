/*
    GreyOS - Meta-Script (Version: 1.0)

    File name: meta_script.js
    Description: This file contains the Meta-Script - Meta scripting language interface (wrapper) module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
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
            this.date_time = function()
            {
                return tik_tok;
            };

            this.tasks = function()
            {
                return owl;
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
        function app_api_model()
        {
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

                this.set_status = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.casement.labels.status(val);
                };

                this.set_content = function(val)
                {
                    if (new_app === null)
                        return false;

                    return new_app.settings.data.casement.content(val);
                };
            }

            function position()
            {
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

            this.set_topmost = function(val)
            {
                if (new_app === null)
                    return false;

                return new_app.settings.general.topmpost(val);
            };

            this.set_single_instance = function(val)
            {
                if (new_app === null)
                    return false;

                return new_app.settings.general.single_instance(val);
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

            this.set_top = function()
            {
                if (new_app === null)
                    return false;

                return new_app.gui.actions.set_top();
            };

            this.get_keys = function(event)
            {
                if (new_app === null)
                    return false;

                return new_app.gui.actions.keys.get(event);
            };

            this.set_title = function(val)
            {
                if (new_app === null)
                    return false;

                return new_app.settings.data.window.labels.title(val);
            };

            this.set_status = function(val)
            {
                if (new_app === null)
                    return false;

                return new_app.settings.data.window.labels.status_bar(val);
            };

            this.set_content = function(val)
            {
                if (new_app === null)
                    return false;

                return new_app.settings.data.window.content(val);
            };

            this.show = function(parent_app_id = null, headless = false)
            {
                if (new_app === null)
                    return false;

                return new_app.gui.actions.show(parent_app_id, headless);
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

            this.run = function(parent_app_id = null, headless = false)
            {
                if (new_app === null)
                    return false;

                if (!swarm.bees.insert(new_app))
                    return false;

                return new_app.run(parent_app_id, headless);
            };

            this.init = function(app_id, resizable = true)
            {
                var type = 1;

                new_app = dev_box.get('bee');

                if (resizable === false)
                    type = 2;

                return new_app.init(app_id, type);
            };

            this.menu = new menu();
            this.casement = new casement();
            this.position = new position();
            this.size = new size();
            this.can = new can();
            this.status = new status();
        }

        return new app_api_model();
    }

    this.service = function(service_config)
    {
        new_service = dev_box.get('bat');

        // Do stuf...

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');
        dev_box = cosmos.hub.access('dev_box');
        colony = cosmos.hub.access('colony');

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
        infinity = matrix.get('infinity');

        return true;
    };

    var cosmos = null,
        matrix = null,
        app_box = null,
        dev_box = null,
        colony = null,
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
        infinity = null,
        new_app = null,
        new_service = null,
        utils_sys = new vulcan(),
        config_parser = new jap(),
        cc_reload = new f5(),
        config_models = new config_models();

    this.interface = new interface();
    this.system = new system();
}
