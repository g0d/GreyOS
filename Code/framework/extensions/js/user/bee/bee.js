/*
    GreyOS - Bee (Version: 5.1)

    File name: bee.js
    Description: This file contains the Bee - Floating window development module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Bee
function bee()
{
    var self = this;

    function ui_objects_model()
    {
        function window()
        {
            function control_bar()
            {
                this.ui = null;
                this.icon = null;
                this.title = null;
                this.pencil = null;
                this.separator = null;
                this.close = null;
            }

            function menu()
            {
                this.ui = null;
                this.put_to_stack = null;
                this.mini_mode = null;
                this.max_mode = null;
                this.manage_casement = null;
                this.send_to_desktop = null;
                this.close = null;
            }

            function content()
            {
                this.ui = null;
                this.data = null;
            }

            function status_bar()
            {
                this.ui = null;
                this.message = null;
                this.resize = null;
            }

            this.control_bar = new control_bar();
            this.menu = new menu();
            this.content = new content();
            this.status_bar = new status_bar();
        }

        function casement()
        {
            this.ui = null;
            this.title = null;
            this.data = null;
            this.status = null;
        }

        this.ui = null;
        this.swarm = null;
        this.window = new window();
        this.casement = new casement();
    }

    function ui_config_model()
    {
        function window()
        {
            function control_bar()
            {
                function ids()
                {
                    this.icon = null;
                    this.title = null;
                    this.pencil = null;
                    this.separator = null;
                    this.close = null;
                }

                function classes()
                {
                    this.container = null;
                    this.icon = null;
                    this.title = null;
                    this.pencil = null;
                    this.separator = null;
                    this.close = null;
                }

                this.id = null;
                this.ids = new ids();
                this.classes = new classes();
            }

            function menu()
            {
                function ids()
                {
                    this.put_to_stack = null;
                    this.mini_mode = null;
                    this.max_mode = null;
                    this.manage_casement = null;
                    this.send_to_desktop = null;
                    this.close = null;
                }

                this.id = null;
                this.class = null;
                this.ids = new ids();
            }

            function content()
            {
                function ids()
                {
                    this.data = null;
                }

                function classes()
                {
                    this.container = null;
                    this.data = null;
                }

                this.id = null;
                this.ids = new ids();
                this.classes = new classes();
            }

            function status_bar()
            {
                function ids()
                {
                    this.message = null;
                    this.resize = null;
                }

                function classes()
                {
                    this.container = null;
                    this.message = null;
                    this.resize = null;
                }

                this.id = null;
                this.ids = new ids();
                this.classes = new classes();
            }

            this.id = null;
            this.class = null;
            this.control_bar = new control_bar();
            this.menu = new menu();
            this.content = new content();
            this.status_bar = new status_bar();
        }

        function casement()
        {
            function ids()
            {
                this.title = null;
                this.data = null;
                this.status = null;
            }

            function classes()
            {
                this.title = null;
                this.container = null;
                this.data = null;
                this.status = null;
            }

            this.id = null;
            this.ids = new ids();
            this.classes = new classes();
        }

        this.window = new window();
        this.casement = new casement();
    }

    function events_status_settings_model()
    {
        function system()
        {
            this.initialized = false;
            this.running = false;
            this.active = false;
            this.error = false;
            this.in_hive = false;
            this.id_changed = false;
            this.type_changed = false;
            this.desktop_changed = false;
        }

        function gui()
        {
            this.open = false;
            this.opened = false;
            this.close = false;
            this.closed = false;
            this.minimize = false;
            this.minimized = false;
            this.restore = false;
            this.restored = false;
            this.maximize = false;
            this.maximized = false;
            this.topmost = false;
            this.drag = false;
            this.dragging = false;
            this.dragged = false;
            this.resize = false;
            this.resizing = false;
            this.resized = false;
            this.touch = false;
            this.touched = false;
            this.menu_activated = false;
            this.casement_deployed = false;
            this.casement_retracted = false;
            this.resize_enabled = false;
            this.key_pressed = false;
            this.mouse_clicked = false;
            this.title_on_edit = false;
            this.title_changed = false;
            this.status_bar_label_changed = false;
            this.content_changed = false;
            this.fading_in = false;
            this.fading_in_finished = false;
            this.fading_out = false;
            this.fading_out_finished = false;
            this.opacity_changed = false;
        }

        function key()
        {
            this.keydown = false;
            this.keyup = false;
            this.keypress = false;
        }

        function mouse()
        {
            this.click = false;
            this.dblclick = false;
            this.mousedown = false;
            this.mouseup = false;
            this.mouseover = false;
            this.mouseout = false;
            this.mousemove = false;
        }

        this.on_event = false;
        this.system = new system();
        this.gui = new gui();
        this.key = new key();
        this.mouse = new mouse();
    }

    function error()
    {
        function codes()
        {
            this.INSTANCE_NUM_LIMIT = 0xA1;
            this.POSITION = 0xE1;
            this.SIZE = 0xE2;
            this.FX = 0xE3;
        }

        this.last = function()
        {
            return error_code;
        }

        this.codes = new codes();
    }

    function utilities()
    {
        var me = this,
            __last_mouse_button_clicked = 0;

        function populate_ui_config()
        {
            ui_config.window.id = my_bee_id;
            ui_config.window.class = 'gui ' + ui_config.window.id + '_gui';

            ui_config.window.control_bar.id = ui_config.window.id + '_ctrl_bar';
            ui_config.window.control_bar.ids.icon = ui_config.window.id + '_icon';
            ui_config.window.control_bar.ids.title = ui_config.window.id + '_title';
            ui_config.window.control_bar.ids.pencil = ui_config.window.id + '_pencil';
            ui_config.window.control_bar.ids.separator = ui_config.window.id + '_separator';
            ui_config.window.control_bar.ids.close = ui_config.window.id + '_close';
            ui_config.window.control_bar.classes.icon = 'icon ' + ui_config.window.control_bar.ids.icon;
            ui_config.window.control_bar.classes.pencil = 'pencil ' + ui_config.window.control_bar.ids.pencil;

            ui_config.window.menu.id = ui_config.window.id + '_menu';
            ui_config.window.menu.ids.put_to_stack = ui_config.window.menu.id + '_put_to_stack';
            ui_config.window.menu.ids.mini_mode = ui_config.window.menu.id + '_mini_mode';
            ui_config.window.menu.ids.max_mode = ui_config.window.menu.id + '_max_mode';
            ui_config.window.menu.ids.manage_casement = ui_config.window.menu.id + '_manage_casement';
            ui_config.window.menu.ids.send_to_desktop = ui_config.window.menu.id + '_send_to_desktop';
            ui_config.window.menu.ids.close = ui_config.window.menu.id + '_close';
            ui_config.window.menu.class = 'menu ' + ui_config.window.menu.id;

            ui_config.window.content.id = ui_config.window.id + '_content';
            ui_config.window.content.ids.data = ui_config.window.id + '_data';
            ui_config.window.content.classes.container = 'content ' + ui_config.window.content.id;
            ui_config.window.content.classes.data = 'data ' + ui_config.window.content.ids.data;

            ui_config.window.status_bar.id = ui_config.window.id + '_status_bar';
            ui_config.window.status_bar.ids.message = ui_config.window.status_bar.id + '_msg';
            ui_config.window.status_bar.classes.container = 'status_bar ' + ui_config.window.status_bar.id;
            ui_config.window.status_bar.classes.message = 'status_msg ' + ui_config.window.status_bar.ids.message;

            ui_config.casement.id = ui_config.window.id + '_casement';
            ui_config.casement.ids.title = ui_config.casement.id + '_title';
            ui_config.casement.ids.data = ui_config.casement.id + '_data';
            ui_config.casement.ids.status = ui_config.casement.id + '_status';
            ui_config.casement.classes.container = 'casement ' + ui_config.casement.id;
            ui_config.casement.classes.title = 'casement_title ' + ui_config.casement.ids.title;
            ui_config.casement.classes.data = 'casement_data ' + ui_config.casement.ids.data;
            ui_config.casement.classes.status = 'casement_status ' + ui_config.casement.ids.status;
        }

        function populate_ui_objects()
        {
            ui_objects.window.ui = utils_sys.objects.by_id(ui_config.window.id);
            ui_objects.window.control_bar.ui = utils_sys.objects.by_id(ui_config.window.control_bar.id);
            ui_objects.window.control_bar.icon = utils_sys.objects.by_id(ui_config.window.control_bar.ids.icon);
            ui_objects.window.control_bar.title = utils_sys.objects.by_id(ui_config.window.control_bar.ids.title);
            ui_objects.window.control_bar.pencil = utils_sys.objects.by_id(ui_config.window.control_bar.ids.pencil);
            ui_objects.window.control_bar.separator = utils_sys.objects.by_id(ui_config.window.control_bar.ids.separator);
            ui_objects.window.control_bar.close = utils_sys.objects.by_id(ui_config.window.control_bar.ids.close);

            ui_objects.window.menu.ui = utils_sys.objects.by_id(ui_config.window.menu.id);
            ui_objects.window.menu.put_to_stack = utils_sys.objects.by_id(ui_config.window.menu.ids.put_to_stack);
            ui_objects.window.menu.mini_mode = utils_sys.objects.by_id(ui_config.window.menu.ids.mini_mode);
            ui_objects.window.menu.max_mode = utils_sys.objects.by_id(ui_config.window.menu.ids.max_mode);
            ui_objects.window.menu.manage_casement = utils_sys.objects.by_id(ui_config.window.menu.ids.manage_casement);
            ui_objects.window.menu.send_to_desktop = utils_sys.objects.by_id(ui_config.window.menu.ids.send_to_desktop);
            ui_objects.window.menu.close = utils_sys.objects.by_id(ui_config.window.menu.ids.close);

            ui_objects.window.content.ui = utils_sys.objects.by_id(ui_config.window.content.id);
            ui_objects.window.content.data = utils_sys.objects.by_id(ui_config.window.content.ids.data);

            ui_objects.window.status_bar.ui = utils_sys.objects.by_id(ui_config.window.status_bar.id);
            ui_objects.window.status_bar.message = utils_sys.objects.by_id(ui_config.window.status_bar.ids.message);
            ui_objects.window.status_bar.resize = utils_sys.objects.by_id(ui_config.window.status_bar.ids.resize);

            ui_objects.casement.ui = utils_sys.objects.by_id(ui_config.casement.id);
            ui_objects.casement.title = utils_sys.objects.by_id(ui_config.casement.ids.title);
            ui_objects.casement.data = utils_sys.objects.by_id(ui_config.casement.ids.data);
            ui_objects.casement.status = utils_sys.objects.by_id(ui_config.casement.ids.status);
        }

        function draw()
        {
            var __dynamic_object = null,
                __bee_settings = self.settings,
                __bee_gui = self.gui,
                __marquee_class = '',
                __html = null;

            populate_ui_config();

            if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
            {
                ui_config.window.status_bar.ids.resize = ui_config.window.id + '_resize';
                ui_config.window.status_bar.classes.resize = 'resize ' + ui_config.window.status_bar.ids.resize;
            }

            if (__bee_settings.general.resizable() === true)
            {
                ui_config.window.control_bar.classes.container = 'ctrl_bar box_ctrl_bar ' + ui_config.window.control_bar.id;
                ui_config.window.control_bar.classes.title = 'title box_title ' + ui_config.window.control_bar.ids.title;
                ui_config.window.control_bar.classes.separator = 'separator box_separator '+ ui_config.window.control_bar.ids.separator;
                ui_config.window.control_bar.classes.close = 'close box_close ' + ui_config.window.control_bar.ids.close;
            }
            else
            {
                ui_config.window.control_bar.classes.container = 'ctrl_bar widget_ctrl_bar ' + ui_config.window.control_bar.id;
                ui_config.window.control_bar.classes.title = 'title widget_title ' + ui_config.window.control_bar.ids.title;
                ui_config.window.control_bar.classes.separator = 'separator widget_separator '+ ui_config.window.control_bar.ids.separator;
                ui_config.window.control_bar.classes.close = 'close widget_close ' + ui_config.window.control_bar.ids.close;
            }

            if (self.settings.general.status_bar_marquee())
            {
                if (__bee_settings.data.window.labels.status_bar().length * 9.0 > __bee_gui.size.width())
                    __marquee_class = 'marquee';
            }

            __html = '<div id="' + ui_config.window.control_bar.id + '" class="' + ui_config.window.control_bar.classes.container + '">' + 
                     '    <div id="' + ui_config.window.control_bar.ids.icon + '" class="' + ui_config.window.control_bar.classes.icon + '"' + 
                     '         title="' + __bee_settings.data.hints.icon() + '"></div>' + 
                     '    <div id="' + ui_config.window.control_bar.ids.title + '" class="' + ui_config.window.control_bar.classes.title + '"' + 
                     '         title="' + __bee_settings.data.hints.title() + '">' + 
                            __bee_settings.data.window.labels.title() + 
                     '    </div>';

            if (__bee_settings.actions.can_edit_title())
            {
                __html += '    <div id="' + ui_config.window.control_bar.ids.pencil + '" class="' + ui_config.window.control_bar.classes.pencil + '"' + 
                          '         title="' + __bee_settings.data.hints.pencil() + '"></div>';
            }

            if (__bee_settings.actions.can_close())
            {
                __html += '    <div id="' + ui_config.window.control_bar.ids.close + '" class="' + ui_config.window.control_bar.classes.close + '"' + 
                          '         title="' + __bee_settings.data.hints.close() + '"></div>';
            }

            if (__bee_settings.actions.can_edit_title() && __bee_settings.actions.can_close())
                __html += '    <div id="' + ui_config.window.control_bar.ids.separator + '" class="' + ui_config.window.control_bar.classes.separator + '"></div>';

            __html += '</div>';

            if (__bee_settings.actions.can_use_menu())
            {
                __html += '<div id="' + ui_config.window.menu.id + '" class="' + ui_config.window.menu.class + '">' + 
                          '    <div id="' + ui_config.window.menu.ids.put_to_stack + '" ' + 
                          '         class="menu_option put_to_stack">Put to stack</div>' + 
                          '    <div id="' + ui_config.window.menu.ids.mini_mode + '" ' + 
                          '         class="menu_option mini_mode">Mini mode</div>' + 
                          '    <div id="' + ui_config.window.menu.ids.max_mode + '" ' + 
                          '         class="menu_option max_mode">Max mode</div>' + 
                          '    <div id="' + ui_config.window.menu.ids.manage_casement + '" ' + 
                          '         class="menu_option manage_casement">Show casement</div>' + 
                          '    <div id="' + ui_config.window.menu.ids.send_to_desktop + '" ' + 
                          '         class="menu_option send_to_desktop">Send to desktop...</div>' + 
                          '    <div id="' + ui_config.window.menu.ids.close + '" ' + 
                          '         class="menu_option menu_close">Close</div>' + 
                          '</div>';
            }

            __html += '<div id="' + ui_config.window.content.id + '" class="' + ui_config.window.content.classes.container + '">' + 
                      '    <div id="' + ui_config.window.content.ids.data + '" class="' + ui_config.window.content.classes.data + '"' + 
                      '         title="' + __bee_settings.data.hints.content() + '">' + 
                                __bee_settings.data.window.content() + '</div>' + 
                      '</div>' + 
                      '<div id="' + ui_config.window.status_bar.id + '" class="' + ui_config.window.status_bar.classes.container + '">' + 
                      '    <div id="' + ui_config.window.status_bar.ids.message + '" class="' + 
                                        ui_config.window.status_bar.classes.message + '">' + 
                      '      <div class="dynamic_msg ' + __marquee_class + '"' + 
                      '           title="' + __bee_settings.data.hints.status_bar() + '">' + 
                                __bee_settings.data.window.labels.status_bar() + '</div>' + 
                      '    </div>';

            if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
            {
                __html += '    <div id="' + ui_config.window.status_bar.ids.resize + '" class="' + ui_config.window.status_bar.classes.resize + '"' + 
                          '         title="' + __bee_settings.data.hints.resize() + '"></div>';
            }

            __html += '</div>';

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', ui_config.window.id);
            __dynamic_object.setAttribute('class', ui_config.window.class);

            __dynamic_object.style.opacity = '1.0';
            __dynamic_object.style.display = 'block';

            if (__bee_gui.fx.enabled.fade.into())
                __dynamic_object.style.display = 'none';

            if (bee_statuses.in_hive())
            {
                __dynamic_object.style.display = 'none';

                morpheus.execute(my_bee_id, 'system', 'in_hive');
            }

            __dynamic_object.style.left = __bee_gui.position.left() + 'px';
            __dynamic_object.style.top = __bee_gui.position.top() + 'px';
            __dynamic_object.style.width = __bee_gui.size.width() + 'px';
            __dynamic_object.style.height = __bee_gui.size.height() + 'px';

            __dynamic_object.innerHTML = __html;

            ui_objects.swarm.appendChild(__dynamic_object);

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', ui_config.casement.id);
            __dynamic_object.setAttribute('class', ui_config.casement.classes.container);

            __dynamic_object.style.left = __bee_gui.position.left() + __bee_gui.size.width() + 'px';
            __dynamic_object.style.top = __bee_gui.position.top() + 'px';
            __dynamic_object.style.width = __bee_gui.size.width() + 'px';
            __dynamic_object.style.height = __bee_gui.size.height() + 'px';

            __dynamic_object.innerHTML = '<div id="' + ui_config.casement.ids.title + '" class="casement_title ' + 
                                         ui_config.casement.classes.title + '">' + 
                                         __bee_settings.data.casement.labels.title() + 
                                         '</div>' + 
                                         '<div id="' + ui_config.casement.ids.data + '" class="casement_data ' + 
                                         ui_config.casement.classes.data + '">' + 
                                         __bee_settings.data.casement.content() + 
                                         '</div>' + 
                                         '<div id="' + ui_config.casement.ids.status + '" class="casement_status ' + 
                                         ui_config.casement.classes.status + '">' + 
                                         __bee_settings.data.casement.labels.status() + 
                                         '</div>';

            ui_objects.swarm.appendChild(__dynamic_object);

            populate_ui_objects();

            ui_objects.window.control_bar.title.style.width = __bee_gui.size.width() - 100 + 'px';
            ui_objects.window.content.data.style.height = __bee_gui.size.height() - 88 + 'px';

            if (__bee_settings.general.resizable() === false && !__bee_settings.actions.can_resize.widget())
                ui_objects.window.status_bar.message.style.width = __bee_gui.size.width() - 22 + 'px';
            else
                ui_objects.window.status_bar.message.style.width = __bee_gui.size.width() - 50 + 'px';

            if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
            {
                ui_objects.window.status_bar.resize.style.width = 19 + 'px';
                ui_objects.window.status_bar.resize.style.height = 19 + 'px';
            }

            ui_objects.casement.ui.style.width = __bee_gui.size.width() * (__bee_settings.general.casement_width() / 100) + 'px';

            __bee_gui.actions.set_top();

            attach_events();

            bee_statuses.open(true);

            morpheus.execute(my_bee_id, 'gui', 'open');

            bee_statuses.open(false);
            bee_statuses.opened(true);

            morpheus.execute(my_bee_id, 'gui', 'opened');

            morpheus.execute(my_bee_id, 'key', 'keydown');
            morpheus.execute(my_bee_id, 'key', 'keyup');
            morpheus.execute(my_bee_id, 'key', 'keypress');

            morpheus.execute(my_bee_id, 'mouse', 'click');
            morpheus.execute(my_bee_id, 'mouse', 'dblclick');
            morpheus.execute(my_bee_id, 'mouse', 'mousedown');
            morpheus.execute(my_bee_id, 'mouse', 'mouseup');
            morpheus.execute(my_bee_id, 'mouse', 'mouseover');
            morpheus.execute(my_bee_id, 'mouse', 'mouseout');
            morpheus.execute(my_bee_id, 'mouse', 'mousemove');

            return true;
        }

        function attach_events()
        {
            var __bee_settings = self.settings,
                __bee_gui = self.gui,
                __handler = null;

            __handler = function(event) { __bee_gui.actions.menu.close(event); };
            morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, document);

            __handler = function(event) { __bee_gui.actions.release(event); };
            morpheus.store(my_bee_id, 'mouse', 'mouseup', __handler, document);

            __handler = function(event) { __bee_gui.actions.dresize(event); };
            morpheus.store(my_bee_id, 'mouse', 'mousemove', __handler, ui_objects.swarm);

            __handler = function(event) { __bee_gui.actions.hover.into(event); };
            morpheus.store(my_bee_id, 'mouse', 'mouseover', __handler, ui_objects.window.ui);

            __handler = function(event) { __bee_gui.actions.hover.out(event); };
            morpheus.store(my_bee_id, 'mouse', 'mouseout', __handler, ui_objects.window.ui);

            __handler = function(event) { coords(event, 1); };
            morpheus.store(my_bee_id, 'mouse', 'mousemove', __handler, ui_objects.window.ui);

            __handler = function() { __bee_gui.actions.touch(); };
            morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.ui);

            __handler = function(event) { coords(event, 2); manage_drag_status(event); };
            morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.ui);

            __handler = function(event)
                        {
                            __bee_settings.actions.can_drag.enabled(false);

                            __last_mouse_button_clicked = event.buttons;

                            bee_statuses.active(true);

                            morpheus.execute(my_bee_id, 'system', 'active');
                        };
            morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.icon);

            __handler = function(event) { __bee_gui.actions.menu.open(event); };
            morpheus.store(my_bee_id, 'mouse', 'mouseup', __handler, ui_objects.window.control_bar.icon);

            if (__bee_settings.actions.can_edit_title())
            {
                __handler = function(event) { __bee_gui.actions.edit_title(event); };
                morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.pencil);
            }

            if (__bee_settings.actions.can_close())
            {
                __handler = function(event) { __bee_gui.actions.close(event); };
                morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.close);
            }

            if (__bee_settings.actions.can_use_menu())
            {
                if (__bee_settings.actions.can_use_casement())
                {
                    __handler = function(event) { manage_casement(event); };
                    morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.menu.manage_casement);
                }

                if (__bee_settings.actions.can_close())
                {
                    __handler = function(event) { __bee_gui.actions.close(event); };
                    morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.menu.close);
                }
            }

            if (!__bee_settings.actions.can_select_text())
            {
                __handler = function() { return false; };
                morpheus.run(my_bee_id, 'mouse', 'selectstart', __handler, ui_objects.window.content.data);

                __handler = function(event) { event.preventDefault(); };
                morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.content.data);
            }

            if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
            {
                __handler = function(event)
                            {
                                coords(event, 2);

                                swarm.settings.active_bee(my_bee_id);

                                bee_statuses.resize(true);
                                bee_statuses.active(true);

                                morpheus.execute(my_bee_id, 'gui', 'resize');
                                morpheus.execute(my_bee_id, 'system', 'active');
                            };
                morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.status_bar.resize);

                __handler = function()
                {
                    bee_statuses.mouse_clicked(false);

                    bee_statuses.resizing(false);
                    bee_statuses.resize(false);

                    morpheus.execute(my_bee_id, 'gui', 'resized');
                };
                morpheus.store(my_bee_id, 'mouse', 'mouseup', __handler, document);
            }

            __handler = function() { return false; };
            morpheus.run(my_bee_id, 'mouse', 'selectstart', __handler, ui_objects.window.control_bar.ui);
            morpheus.run(my_bee_id, 'mouse', 'selectstart', __handler, ui_objects.window.status_bar.ui);

            __handler = function(event) { event.preventDefault(); };
            morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.status_bar.ui);

            __handler = function(event) { __bee_gui.actions.hover.into(event); };
            morpheus.store(my_bee_id, 'mouse', 'mouseover', __handler, ui_objects.casement.ui);

            __handler = function(event) { __bee_gui.actions.hover.out(event); };
            morpheus.store(my_bee_id, 'mouse', 'mouseout', __handler, ui_objects.casement.ui);

            __handler = function(event) { coords(event, 1); };
            morpheus.store(my_bee_id, 'mouse', 'mousemove', __handler, ui_objects.casement.ui);

            __handler = function() { __bee_gui.actions.touch(); };
            morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.casement.ui);

            return true;
        }

        function coords(event_object, type)
        {
            if (utils_sys.validation.misc.is_undefined(event_object) || 
                !utils_sys.validation.numerics.is_integer(type) || 
                type < 1 || type > 2)
                return false;

            var __pos_x = 0,
                __pos_y = 0;

            __pos_x = event_object.clientX + document.documentElement.scrollLeft + 
                      document.body.scrollLeft - document.body.clientLeft - 
                      swarm.settings.left() - self.gui.position.left();

            __pos_y = event_object.clientY + document.documentElement.scrollTop + 
                      document.body.scrollTop - document.body.clientTop - 
                      swarm.settings.top() - self.gui.position.top();

            if (type === 1)
            {
                me.mouse_coords.actual.pos_x = __pos_x;
                me.mouse_coords.actual.pos_y = __pos_y;
            }
            else
            {
                me.mouse_coords.relative.pos_x = __pos_x + self.gui.position.left();
                me.mouse_coords.relative.pos_y = __pos_y + self.gui.position.top();
            }

            return true;
        }

        function alter_win_title(text_value = null)
        {
            var __ctrl_bar = ui_objects.window.control_bar.ui,
                __title_edit_box = utils_sys.objects.by_id(my_bee_id + '_title_edit_box'),
                __new_title = __title_edit_box.value,
                __win_type_class_title = null,
                __title_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width) - 100,
                __title_div = document.createElement('div'),
                __pencil_div = document.createElement('div'),
                __handler = null;

            morpheus.delete(my_bee_id, 'keydown', __title_edit_box);

            __ctrl_bar.removeChild(__title_edit_box);

            if (self.settings.general.resizable() === false)
                __win_type_class_title = 'widget_title';
            else
                __win_type_class_title = 'box_title';

            __title_div.setAttribute('id', ui_config.window.control_bar.ids.title);
            __title_div.setAttribute('class', 'title ' + __win_type_class_title);
            __title_div.setAttribute('style', 'width: ' + __title_width + 'px');
            __title_div.setAttribute('title', self.settings.data.hints.title());

            if (text_value === null)
                __title_div.innerHTML = __new_title;
            else
                __title_div.innerHTML = text_value;

            __pencil_div.setAttribute('id', ui_config.window.control_bar.ids.pencil);
            __pencil_div.setAttribute('class', 'pencil');
            __pencil_div.setAttribute('title', self.settings.data.hints.pencil());

            __ctrl_bar.appendChild(__title_div);
            __ctrl_bar.appendChild(__pencil_div);

            ui_objects.window.control_bar.title = __title_div;
            ui_objects.window.control_bar.pencil = __pencil_div;

            __handler = function(event)
                        {
                            self.gui.actions.edit_title(event);

                            bee_statuses.active(true);

                            morpheus.execute(my_bee_id, 'system', 'active');
                        };
            morpheus.run(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.pencil);

            if (text_value === null)
                self.settings.data.window.labels.title(__new_title);

            bee_statuses.title_on_edit(false);

            return true;
        }

        function manage_drag_status(event_object)
        {
            if (event_object.buttons !== 1)
                return false;

            if (!self.settings.actions.can_drag.enabled() || bee_statuses.title_on_edit() || bee_statuses.close())
                return false;

            swarm.settings.active_bee(my_bee_id);

            bee_statuses.drag(true);
            bee_statuses.active(true);

            morpheus.execute(my_bee_id, 'gui', 'drag');
            morpheus.execute(my_bee_id, 'system', 'active');

            return true;
        }

        function manage_casement(event_object)
        {
            if (bee_statuses.close())
                return false;

            if (utils_sys.validation.misc.is_undefined(event_object) || event_object.buttons !== 1)
                return false;

            self.gui.actions.casement.trigger(event_object);

            return true;
        }

        this.gui_init = function()
        {
            ui_objects.swarm = utils_sys.objects.by_id(swarm.settings.id());

            if (ui_objects.swarm === false)
                return false;

            if (!draw())
                return false;

            return true;
        };

        this.edit_win_title = function()
        {
            var __ctrl_bar = ui_objects.window.control_bar.ui,
                __old_title = ui_objects.window.control_bar.title,
                __pencil = ui_objects.window.control_bar.pencil,
                __win_type_class_title = null,
                __title_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width) - 100,
                __title_edit_box = document.createElement('input'),
                __handler = null;

            __ctrl_bar.removeChild(__old_title);
            __ctrl_bar.removeChild(__pencil);

            if (self.settings.general.resizable() === false)
                __win_type_class_title = 'widget_title';
            else
                __win_type_class_title = 'box_title';

            __title_edit_box.setAttribute('id', my_bee_id + '_title_edit_box');
            __title_edit_box.setAttribute('class', 'title ' + __win_type_class_title + ' edit_win_title');
            __title_edit_box.setAttribute('style', 'width: ' + __title_width + 'px');
            __title_edit_box.setAttribute('value', self.settings.data.window.labels.title());

            __ctrl_bar.appendChild(__title_edit_box);

            __handler = function(event)
                        {
                            if (!bee_statuses.active())
                                return false;

                            if (self.gui.keys.get(event) === key_control.keys.ENTER)
                                alter_win_title();
                            else if (self.gui.keys.get(event) === key_control.keys.ESCAPE)
                                alter_win_title(self.settings.data.window.labels.title());
                        };
            morpheus.run(my_bee_id, 'key', 'keydown', __handler, __title_edit_box);

            bee_statuses.title_on_edit(true);

            morpheus.execute(my_bee_id, 'gui', 'title_on_edit');

            return true;
        };

        this.remove_bee = function()
        {
            ui_objects.swarm.removeChild(ui_objects.window.ui);
            ui_objects.swarm.removeChild(ui_objects.casement.ui);

            return true;
        };

        this.is_lonely_bee = function(bee_id)
        {
            var __swarm_bees = swarm.bees.list(),
                __hive_bees = matrix.get('hive').status.bees.list(),
                __bees_list = null,
                __bees_list_num = 0;

            for (var i = 0; i < __swarm_bees.length; i++)
            {
                if (__swarm_bees[i] === bee_id)
                    return false;
            }

            for (__bees_list in __hive_bees)
            {
                __bees_list_num = __bees_list.length;

                for (var i = 0; i < __bees_list_num; i++)
                {
                    if (__bees_list[i] === bee_id)
                        return false;
                }
            }

            return true;
        };

        this.set_z_index = function(z_index)
        {
            ui_objects.window.ui.style.zIndex = z_index + 2;
            ui_objects.casement.ui.style.zIndex = z_index + 1;

            return true;
        };

        this.last_mouse_button = function()
        {
            return __last_mouse_button_clicked;
        };

        this.log = function(func, result)
        {
            if (self.settings.general.backtrace())
                frog('BEE', 'Function', func, 'Result: ' + result);

            return false;
        };

        function mouse_coords_model()
        {
            function actual()
            {
                this.pos_x = 0;
                this.pos_y = 0;
            }

            function relative()
            {
                this.pos_x = 0;
                this.pos_y = 0;
            }

            this.actual = new actual();
            this.relative = new relative();
        }

        function fade_settings_model()
        {
            this.type = null;
            this.step = 0.00;
            this.speed = 0;
            this.delay = 0;
        }

        function animating_events()
        {
            var me = this;

            this.in_progress = function()
            {
                if (bee_statuses.fading_in())
                {
                    __animating_event = 'into';

                    return true;
                }

                if (bee_statuses.fading_out())
                {
                    __animating_event = 'out';

                    return true;
                }

                return false;
            };

            this.duration = function()
            {
                if (!me.in_progress())
                    return false;

                var __msec = 0.0;

                __msec = (self.gui.fx.fade.settings[__animating_event].get.last(2) / 
                          self.gui.fx.fade.settings[__animating_event].get.last(1)) + 
                          self.gui.fx.fade.settings[__animating_event].get.last(3);

                __animating_event = null;

                return __msec;
            };

            var __animating_event = null;
        }

        this.mouse_coords = new mouse_coords_model();
        this.fade_settings = new fade_settings_model();
        this.animating_events = new animating_events();
    }

    function supported_events()
    {
        var __events_settings = new events_status_settings_model();

        this.contains = function(event_var, context)
        {
            if (context === 'main')
                return false;

            for (var key in __events_settings[context])
            {
                if (__events_settings[context].hasOwnProperty(key))
                {
                    if (key === event_var)
                        return true;
                }
            }

            return false;
        };
    }

    function supported_statuses()
    {
        function validate(status_var, context, val)
        {
            if (utils_sys.validation.misc.is_undefined(val))
            {
                if (context === 'main')
                    return __status_settings[status_var];
                else
                    return __status_settings[context][status_var];
            }

            if (!utils_sys.validation.misc.is_bool(val))
                return false;

            if (context === 'main')
            {
                __status_settings.on_event = val;

                return true;
            }

            __status_settings[context][status_var] = val;

            for (var key in __status_settings[context])
            {
                if (__status_settings[context].hasOwnProperty(key))
                {
                    if (__status_settings[context][key] === true)
                    {
                        __status_settings.on_event = true;

                        return true;
                    }
                }
            }

            __status_settings.on_event = false;

            return true;
        }

        this.on_event = function(val)
        {
            return validate('on_event', 'main', val);
        };

        this.initialized = function(val)
        {
            return validate('initialized', 'system', val);
        };

        this.running = function(val)
        {
            return validate('running', 'system', val);
        };

        this.active = function(val)
        {
            return validate('active', 'system', val);
        };

        this.error = function(val)
        {
            return validate('error', 'system', val);
        };

        this.id_changed = function(val)
        {
            return validate('id_changed', 'system', val);
        };

        this.type_changed = function(val)
        {
            return validate('type_changed', 'system', val);
        };

        this.desktop_changed = function(val)
        {
            return validate('desktop_changed', 'system', val);
        };

        this.in_hive = function(val)
        {
            return validate('in_hive', 'system', val);
        };

        this.open = function(val)
        {
            return validate('open', 'gui', val);
        };

        this.opened = function(val)
        {
            return validate('opened', 'gui', val);
        };

        this.close = function(val)
        {
            return validate('close', 'gui', val);
        };

        this.closed = function(val)
        {
            return validate('closed', 'gui', val);
        };

        this.minimize = function(val)
        {
            return validate('minimize', 'gui', val);
        };

        this.minimized = function(val)
        {
            return validate('minimized', 'gui', val);
        };

        this.restore = function(val)
        {
            return validate('restore', 'gui', val);
        };

        this.restored = function(val)
        {
            return validate('restored', 'gui', val);
        };

        this.maximize = function(val)
        {
            return validate('maximize', 'gui', val);
        };

        this.maximized = function(val)
        {
            return validate('maximized', 'gui', val);
        };

        this.topmost = function(val)
        {
            return validate('topmost', 'gui', val);
        };

        this.drag = function(val)
        {
            return validate('drag', 'gui', val);
        };

        this.dragging = function(val)
        {
            return validate('dragging', 'gui', val);
        };

        this.dragged = function(val)
        {
            return validate('dragged', 'gui', val);
        };

        this.resize = function(val)
        {
            return validate('resize', 'gui', val);
        };

        this.resizing = function(val)
        {
            return validate('resizing', 'gui', val);
        };

        this.resized = function(val)
        {
            return validate('resized', 'gui', val);
        };

        this.touch = function(val)
        {
            return validate('touch', 'gui', val);
        };

        this.touched = function(val)
        {
            return validate('touched', 'gui', val);
        };

        this.menu_activated = function(val)
        {
            return validate('menu_activated', 'gui', val);
        };

        this.casement_deployed = function(val)
        {
            return validate('casement_deployed', 'gui', val);
        };

        this.casement_retracted = function(val)
        {
            return validate('casement_retracted', 'gui', val);
        };

        this.resize_enabled = function(val)
        {
            return validate('resize_enabled', 'gui', val);
        };

        this.title_on_edit = function(val)
        {
            return validate('title_on_edit', 'gui', val);
        };

        this.title_changed = function(val)
        {
            return validate('title_changed', 'gui', val);
        };

        this.status_bar_label_changed = function(val)
        {
            return validate('status_bar_label_changed', 'gui', val);
        };

        this.content_changed = function(val)
        {
            return validate('content_changed', 'gui', val);
        };

        this.fading_in = function(val)
        {
            return validate('fading_in', 'gui', val);
        };

        this.fading_in_finished = function(val)
        {
            return validate('fading_in_finished', 'gui', val);
        };

        this.fading_out = function(val)
        {
            return validate('fading_out', 'gui', val);
        };

        this.fading_out_finished = function(val)
        {
            return validate('fading_out_finished', 'gui', val);
        };

        this.opacity_changed = function(val)
        {
            return validate('opacity_changed', 'gui', val);
        };

        this.mouse_clicked = function(val)
        {
            return validate('mouse_clicked', 'gui', val);
        };

        this.key_pressed = function(val)
        {
            return validate('key_pressed', 'gui', val);
        };

        this.keydown = function(val)
        {
            return validate('keydown', 'key', val);
        };

        this.keyup = function(val)
        {
            return validate('keyup', 'key', val);
        };

        this.keypress = function(val)
        {
            return validate('keypress', 'key', val);
        };

        this.click = function(val)
        {
            return validate('click', 'mouse', val);
        };

        this.dblclick = function(val)
        {
            return validate('dblclick', 'mouse', val);
        };

        this.mousedown = function(val)
        {
            return validate('mousedown', 'mouse', val);
        };

        this.mouseup = function(val)
        {
            return validate('mouseup', 'mouse', val);
        };

        this.mouseover = function(val)
        {
            return validate('mouseover', 'mouse', val);
        };

        this.mouseout = function(val)
        {
            return validate('mouseout', 'mouse', val);
        };

        this.mousemove = function(val)
        {
            return validate('mousemove', 'mouse', val);
        };

        var __status_settings = new events_status_settings_model();
    }

    function settings()
    {
        function general()
        {
            var __app_id = null,
                __system_app_id = null,
                __desktop_id = 0,
                __single_instance = false,
                __allowed_instances = 0,
                __status_bar_marquee = false,
                __resizable = false,
                __resize_tooltip = false,
                __icon = 'default',
                __casement_width = 100,
                __backtrace = false;

            this.app_id = function()
            {
                if (is_init === false)
                    return false;

                return __app_id;
            };

            this.id = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __system_app_id;

                if (bee_statuses.running())
                    return false;

                if (utils_sys.validation.alpha.is_blank(val) || utils_sys.validation.alpha.is_symbol(val))
                    return false;

                __app_id = val.trim();
                __system_app_id = val.toLowerCase().replace(/\s/g,'_') + '_app_' + random.generate();

                bee_statuses.id_changed(true);

                morpheus.execute(my_bee_id, 'system', 'id_changed');

                bee_statuses.id_changed(false);

                return true;
            };

            this.resizable = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __resizable;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                __resizable = val;

                bee_statuses.type_changed(true);

                morpheus.execute(my_bee_id, 'system', 'type_changed');

                bee_statuses.type_changed(false);

                return true;
            };

            this.desktop_id = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __desktop_id;

                if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
                    return false;

                __desktop_id = val;

                bee_statuses.desktop_changed(true);

                morpheus.execute(my_bee_id, 'system', 'desktop_changed');

                bee_statuses.desktop_changed(false);

                return true;
            };

            this.single_instance = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __single_instance;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                __single_instance = val;

                return true;
            };

            this.allowed_instances = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __allowed_instances;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.numerics.is_integer(val) || val < 1)
                    return false;

                __allowed_instances = val;

                return true;
            };

            this.topmost = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return false;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                if (bee_statuses.running())
                    return false;

                bee_statuses.topmost(val);

                if (val === true)
                    morpheus.execute(my_bee_id, 'gui', 'topmost');

                return true;
            };

            this.in_hive = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return false;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                bee_statuses.in_hive(val);

                if (val === true)
                {
                    bee_statuses.active(false);

                    morpheus.execute(my_bee_id, 'system', 'in_hive');
                }

                return true;
            };

            this.status_bar_marquee = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __status_bar_marquee;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                __status_bar_marquee = val;

                return true;
            };

            this.resize_tooltip = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __resize_tooltip;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                __resize_tooltip = val;

                return true;
            };

            this.icon = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __icon;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.alpha.is_string(val))
                    return false;

                __icon = val;

                return true;
            };

            this.casement_width = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __casement_width;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.numerics.is_integer(val) || val < 20 || val > 100)
                    return false;

                __casement_width = val;

                return true;
            };

            this.backtrace = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __backtrace;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                __backtrace = val;

                return true;
            };
        }

        function actions()
        {
            function action_settings_object()
            {
                function drag()
                {
                    this.on_x = true;
                    this.on_y = true;
                }

                function resize()
                {
                    this.on_x = true;
                    this.on_y = true;
                }

                this.can_open = true;
                this.can_close = true;
                this.can_minimize = true;
                this.can_restore = true;
                this.can_maximize = true;
                this.can_touch = true;
                this.can_edit_title = true;
                this.can_select_text = true;
                this.can_use_menu = true;
                this.can_use_casement = true;
                this.can_drag = true;
                this.can_resize = true;
                this.can_resize_widget = false;
                this.drag = new drag();
                this.resize = new resize();
            }

            function validate(mode, action, modifier, val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                {
                    if (mode === 1)
                        return __action_settings[action];
                    else
                        return __action_settings[modifier][action];
                }

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                if (mode === 1)
                    __action_settings[action] = val;
                else
                    __action_settings[modifier][action] = val;

                return true;
            }

            this.can_open = function(val)
            {
                return validate(1, 'can_open', null, val);
            };

            this.can_close = function(val)
            {
                return validate(1, 'can_close', null, val);
            };

            this.can_minimize = function(val)
            {
                return validate(1, 'can_minimize', null, val);
            };

            this.can_restore = function(val)
            {
                return validate(1, 'can_restore', null, val);
            };

            this.can_maximize = function(val)
            {
                return validate(1, 'can_maximize', null, val);
            };

            this.can_touch = function(val)
            {
                return validate(1, 'can_touch', null, val);
            };

            this.can_edit_title = function(val)
            {
                return validate(1, 'can_edit_title', null, val);
            };

            this.can_select_text = function(val)
            {
                return validate(1, 'can_select_text', null, val);
            };

            this.can_use_menu = function(val)
            {
                return validate(1, 'can_use_menu', null, val);
            };

            this.can_use_casement = function(val)
            {
                return validate(1, 'can_use_casement', null, val);
            };

            function can_drag()
            {
                this.enabled = function(val)
                {
                    return validate(1, 'can_drag', null, val);
                };

                function drag_on()
                {
                    this.x = function(val)
                    {
                        return validate(2, 'on_x', 'drag', val);
                    };

                    this.y = function(val)
                    {
                        return validate(2, 'on_y', 'drag', val);
                    };
                }

                this.on = new drag_on();
            }

            function can_resize()
            {
                this.enabled = function(val)
                {
                    return validate(1, 'can_resize', null, val);
                };

                this.widget = function(val)
                {
                    return validate(1, 'can_resize_widget', null, val);
                };
                
                function resize_on()
                {
                    this.x = function(val)
                    {
                        return validate(2, 'on_x', 'resize', val);
                    };

                    this.y = function(val)
                    {
                        return validate(2, 'on_y', 'resize', val);
                    };
                }

                this.on = new resize_on();
            }

            var __action_settings = new action_settings_object();

            this.can_drag = new can_drag();
            this.can_resize = new can_resize();
        }

        function data()
        {
            function window()
            {
                var __content = '';

                this.content = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __content;

                    __content = val;

                    if (!ui_objects.window.content.data)
                        return false;

                    ui_objects.window.content.data.innerHTML = val;

                    bee_statuses.content_changed(true);

                    morpheus.execute(my_bee_id, 'gui', 'content_changed');

                    bee_statuses.content_changed(false);

                    return true;
                };

                function labels()
                {
                    var __title = '',
                        __status_bar = '';

                    this.title = function(val)
                    {
                        if (is_init === false)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(val))
                            return __title;

                        __title = val;

                        if (!ui_objects.window.control_bar.title)
                            return false;

                        ui_objects.window.control_bar.title.innerHTML = val;

                        bee_statuses.title_changed(true);

                        morpheus.execute(my_bee_id, 'gui', 'title_changed');

                        bee_statuses.title_changed(false);

                        return true;
                    };

                    this.status_bar = function(val)
                    {
                        if (is_init === false)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(val))
                            return __status_bar;

                        __status_bar = val;

                        if (!ui_objects.window.status_bar.message)
                            return false;

                        ui_objects.window.status_bar.message.childNodes[1].innerHTML = val;

                        if (self.settings.general.status_bar_marquee())
                        {
                            if (val.length * 9.0 >= utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width))
                                ui_objects.window.status_bar.message.childNodes[1].classList.add('marquee');
                        }

                        bee_statuses.status_bar_label_changed(true);

                        morpheus.execute(my_bee_id, 'gui', 'status_bar_label_changed');

                        bee_statuses.status_bar_label_changed(false);

                        return true;
                    };
                }

                this.labels = new labels();
            }

            function casement()
            {
                var __data = '';

                this.content = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __data;

                    __data = val;

                    if (!ui_objects.casement.data)
                        return false;

                    ui_objects.casement.data.innerHTML = val;

                    return true;
                };

                function labels()
                {
                    var __title = '',
                        __status = '';

                    this.title = function(val)
                    {
                        if (is_init === false)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(val))
                            return __title;

                        __title = val;

                        if (!ui_objects.casement.title)
                            return false;

                        ui_objects.casement.title.innerHTML = val;

                        return true;
                    };

                    this.status = function(val)
                    {
                        if (is_init === false)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(val))
                            return __status;

                        __status = val;

                        if (!ui_objects.casement.status)
                            return false;

                        ui_objects.casement.status.innerHTML = val;

                        return true;
                    };
                }

                this.labels = new labels();
            }

            function hints()
            {
                var __title = '',
                    __content = '',
                    __status_bar = '',
                    __icon = '',
                    __pencil = '',
                    __close = '',
                    __resize = '';

                this.title = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __title;

                    __title = val;

                    if (!ui_objects.window.control_bar.title)
                        return false;

                    ui_objects.window.control_bar.title.setAttribute('title', __title);

                    return true;
                };

                this.content = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __content;

                    __content = val;

                    if (!ui_objects.window.content.data)
                        return false;

                    ui_objects.window.content.data.setAttribute('title', __content);

                    return true;
                };

                this.status_bar = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __status_bar;

                    __status_bar = val;

                    if (!ui_objects.window.status_bar.message)
                        return false;

                    ui_objects.window.status_bar.message.setAttribute('title', __status_bar);

                    return true;
                };

                this.icon = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __icon;

                    __icon = val;

                    if (!ui_objects.window.control_bar.icon)
                        return false;

                    ui_objects.window.control_bar.icon.setAttribute('title', __icon);

                    return true;
                };

                this.pencil = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __pencil;

                    __pencil = val;

                    if (!ui_objects.window.control_bar.pencil)
                        return false;

                    ui_objects.window.control_bar.pencil.setAttribute('title', __pencil);

                    return true;
                };

                this.close = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __close;

                    __close = val;

                    if (!ui_objects.window.control_bar.close)
                        return false;

                    ui_objects.window.control_bar.close.setAttribute('title', __close);

                    return true;
                };

                this.resize = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __resize;

                    __resize = val;

                    if (!ui_objects.window.status_bar.resize)
                        return false;

                    ui_objects.window.status_bar.resize.setAttribute('title', __resize);

                    return true;
                };
            }

            this.window = new window();
            this.casement = new casement();
            this.hints = new hints();
        }

        this.general = new general();
        this.actions = new actions();
        this.data = new data();
    }

    function status()
    {
        this.on_event = function()
        {
            if (is_init === false)
                return false;

            return bee_statuses.on_event();
        };

        function system_status()
        {
            this.initialized = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.initialized();
            };

            this.running = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.running();
            };

            this.active = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.active();
            };

            this.error = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.error();
            };

            this.in_hive = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.in_hive();
            };

            this.id_changed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.id_changed();
            };

            this.type_changed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.type_changed();
            };

            this.desktop_changed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.desktop_changed();
            };
        }

        function gui_status()
        {
            function position_status()
            {
                this.left = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.left);
                };

                this.top = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.top);
                };
            }

            function size_status()
            {
                this.width = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width);
                };

                this.height = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.height);
                };
            }

            function fx_status()
            {
                function fading()
                {
                    function into()
                    {
                        this.in_progress = function()
                        {
                            if (is_init === false)
                                return false;

                            return bee_statuses.fading_in();
                        };

                        this.finished = function()
                        {
                            if (is_init === false)
                                return false;

                            return bee_statuses.fading_in_finished();
                        };
                    }

                    function out()
                    {
                        this.in_progress = function()
                        {
                            if (is_init === false)
                                return false;

                            return bee_statuses.fading_out();
                        };

                        this.finished = function()
                        {
                            if (is_init === false)
                                return false;

                            return bee_statuses.fading_out_finished();
                        };
                    }

                    this.into = new into();
                    this.out = new out();
                }

                function opacity()
                {
                    this.changed = function()
                    {
                        if (is_init === false)
                            return false;

                        return bee_statuses.opacity_changed();
                    };
                }

                this.fading = new fading();
                this.opacity = new opacity();
            }

            this.open = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.open();
            };

            this.opened = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.opened();
            };

            this.close = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.close();
            };

            this.closed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.closed();
            };

            this.minimize = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.minimize();
            };

            this.minimized = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.minimized();
            };

            this.restore = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.restore();
            };

            this.restored = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.restored();
            };

            this.maximize = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.maximize();
            };

            this.maximized = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.maximized();
            };

            this.topmost = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.topmost();
            };

            this.drag = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.drag();
            };

            this.dragging = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.dragging();
            };

            this.dragged = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.dragged();
            };

            this.resize = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.resize();
            };

            this.resizing = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.resizing();
            };

            this.resized = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.resized();
            };

            this.menu_activated = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.menu_activated();
            };

            this.casement_deployed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.casement_deployed();
            };

            this.casement_retracted = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.casement_retracted();
            };

            this.resize_enabled = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.resize_enabled();
            };

            this.title_changed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.title_changed();
            };

            this.status_bar_label_changed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.status_bar_label_changed();
            };

            this.content_changed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.content_changed();
            };

            this.mouse_clicked = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mouse_clicked();
            };

            this.key_pressed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.key_pressed();
            };

            this.touch = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.touch();
            };

            this.touched = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.touched();
            };

            this.mouseclick = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.click();
            };

            this.mousedblclick = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.dblclick();
            };

            this.mousedown = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mousedown();
            };

            this.mouseup = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mouseup();
            };

            this.mouseover = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mouseover();
            };

            this.mouseout = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mouseout();
            };

            this.mousemove = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mousemove();
            };

            this.keydown = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.keydown();
            };

            this.keyup = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.keyup();
            };

            this.keypress = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.keypress();
            };

            this.position = new position_status();
            this.size = new size_status();
            this.fx = new fx_status();
        }

        function data_status()
        {
            function labels_status()
            {
                this.title_changed = function()
                {
                    if (is_init === false)
                        return false;

                    return bee_statuses.title_changed();
                };

                this.status_bar_label_changed = function()
                {
                    if (is_init === false)
                        return false;

                    return bee_statuses.status_bar_label_changed();
                };
            }

            this.content_changed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.content_changed();
            };

            this.labels = new labels_status();
        }

        this.system = new system_status();
        this.gui = new gui_status();
        this.data = new data_status();
    }

    function gui()
    {
        var me = this;

        function keys()
        {
            this.get = function(event_object)
            {
                if (is_init === false)
                    return false;

                key_control.scan(event_object);

                bee_statuses.key_pressed(true);

                morpheus.execute(my_bee_id, 'gui', 'key_pressed');

                return key_control.get();
            };
        }

        function mouse()
        {
            function actual()
            {
                this.x = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_int.mouse_coords.actual.pos_x;
                };

                this.y = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_int.mouse_coords.actual.pos_y;
                };
            }

            function relative()
            {
                this.x = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_int.mouse_coords.relative.pos_x;
                };

                this.y = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_int.mouse_coords.relative.pos_y;
                };
            }

            this.actual = new actual();
            this.relative = new relative();
        }

        function position()
        {
            function pos_settings_object()
            {
                function limits()
                {
                    this.left = 0;
                    this.top = 0;
                    this.right = window.innerWidth;
                    this.bottom = window.innerHeight;
                    this.z_index = 2147483641;
                }

                this.left = 0;
                this.top = 0;
                this.z_index = 0;
                this.topmost_z_index = 2147400000;
                this.limits = new limits();
            }

            function limits()
            {
                this.left = function(val)
                {
                    return validate(2, 'left', 'right', val);
                };

                this.top = function(val)
                {
                    return validate(2, 'top', 'bottom', val);
                };

                this.right = function(val)
                {
                    return validate(2, 'right', 'left', val);
                };

                this.bottom = function(val)
                {
                    return validate(2, 'bottom', 'top', val);
                };
            }

            function randomize_pos(position)
            {
                var __new_pos = Math.floor(position + (position * Math.random()));

                return __new_pos;
            }

            function validate(mode, position, limit, val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                {
                    if (mode === 1)
                        return __position_settings[position];
                    else
                        return __position_settings.limits[position];
                }

                if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
                {
                    error_code = self.error.codes.POSITION;

                    owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                    bee_statuses.error(true);

                    return false;
                }

                if (limit === 'right' || limit === 'bottom')
                {
                    if (!bee_statuses.running() && __is_static === false)
                    {
                        if (val >= (__position_settings.limits[limit] - val))
                            val = val / 2;
                    }
                    else
                    {
                        if (val >= __position_settings.limits[limit])
                        {
                            error_code = self.error.codes.POSITION;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }        
                    }
                }
                else if (limit === 'left' || limit === 'top')
                {
                    if (val <= __position_settings.limits[limit])
                    {
                        error_code = self.error.codes.POSITION;

                        owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                        bee_statuses.error(true);

                        return false;
                    }    
                }
                else
                {
                    if (limit === 'z_index')
                    {
                        if (val > __position_settings.limits[limit])
                        {
                            error_code = self.error.codes.POSITION;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }        
                    }
                }

                if (mode === 1)
                    __position_settings[position] = val;
                else
                    __position_settings.limits[position] = val;

                return true;
            }

            this.left = function(val)
            {
                var __alt_val = val;

                if (!utils_sys.validation.misc.is_undefined(val))
                {
                    if (!bee_statuses.running() && __is_static === false)
                        __alt_val = randomize_pos(val);
                }

                return validate(1, 'left', 'right', __alt_val);
            };

            this.top = function(val)
            {
                var __alt_val = val;

                if (!utils_sys.validation.misc.is_undefined(val))
                {
                    if (!bee_statuses.running() && __is_static === false)
                        __alt_val = randomize_pos(val);
                }

                return validate(1, 'top', 'bottom', __alt_val);
            };

            this.z_index = function(val)
            {
                return validate(1, 'z_index', 'z_index', val);
            };

            this.topmost_z_index = function(val)
            {
                return validate(1, 'topmost_z_index', 'z_index', val);
            };

            this.static = function(val)
            {
                if (utils_sys.validation.misc.is_undefined(val))
                    return __is_static;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                __is_static = val;

                return true;
            };

            var __is_static = false,
                __position_settings = new pos_settings_object();

            this.limits = new limits();
        }

        function size()
        {
            function size_settings_object()
            {
                function min()
                {
                    this.width = 260;
                    this.height = 120;
                }

                function max()
                {
                    this.width = 1366;
                    this.height = 700;
                }

                this.width = 300;
                this.height = 220;
                this.min = new min();
                this.max = new max();
            }

            function validate(mode, type, size, limit, val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                {
                    if (mode === 1)
                        return __size_settings[size];
                    else
                        return __size_settings[limit][size];
                }

                if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
                {
                    error_code = self.error.codes.SIZE;

                    owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                    bee_statuses.error(true);

                    return false;
                }

                if (mode === 1)
                {
                    if (type === 1)
                    {
                        if (val < me.size.min.width() || (me.position.left() + val) > me.size.max.width())
                        {
                            error_code = self.error.codes.SIZE;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }
                    }
                    else if (type === 2)
                    {
                        if (val < me.size.min.height() || (me.position.top() + val) > me.size.max.height())
                        {
                            error_code = self.error.codes.SIZE;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }
                    }
                }
                else if (mode === 2)
                {
                    if (type === 1)
                    {
                        if (val < me.size.min.width() || val > me.size.width())
                        {
                            error_code = self.error.codes.SIZE;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }
                    }
                    else if (type === 2)
                    {
                        if (val < me.size.min.height() || val > me.size.height())
                        {
                            error_code = self.error.codes.SIZE;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }
                    }
                }
                else if (mode === 3)
                {
                    if (type === 1)
                    {
                        if (val < me.size.width())
                        {
                            error_code = self.error.codes.SIZE;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }
                    }
                    else if (type === 2)
                    {
                        if (val < me.size.height())
                        {
                            error_code = self.error.codes.SIZE;

                            owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                            bee_statuses.error(true);

                            return false;
                        }
                    }
                }

                if (mode === 1)
                    __size_settings[size] = val;
                else
                    __size_settings[limit][size] = val;

                return true;
            }

            this.width = function(val)
            {
                return validate(1, 1, 'width', null, val);
            };

            this.height = function(val)
            {
                return validate(1, 2, 'height', null, val);
            };

            function min()
            {
                this.width = function(val)
                {
                    return validate(2, 1, 'width', 'min', val);
                };

                this.height = function(val)
                {
                    return validate(2, 2, 'height', 'min', val);
                };
            }

            function max()
            {
                this.width = function(val)
                {
                    return validate(3, 1, 'width', 'max', val);
                };

                this.height = function(val)
                {
                    return validate(3, 2, 'height', 'max', val);
                };
            }

            var __size_settings = new size_settings_object();

            this.min = new min();
            this.max = new max();
        }

        function fx()
        {
            function fx_settings()
            {
                this.opacity = 1.0;

                function fade()
                {
                    function into()
                    {
                        this.step = 0.00;
                        this.speed = 0;
                        this.delay = 0;
                    }

                    function out()
                    {
                        this.step = 0.00;
                        this.speed = 0;
                        this.delay = 0;
                    }

                    this.into = new into();
                    this.out = new out();
                }

                this.fade = new fade();
            }

            function fx_enabled()
            {
                var __opacity_enabled = true;

                function fade_settings_object()
                {
                    this.fade_in_enabled = false;
                    this.fade_out_enabled = false;
                }

                function fade()
                {
                    function validate(fx, val)
                    {
                        if (is_init === false)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(val))
                            return __fade_settings[fx];

                        if (!utils_sys.validation.misc.is_bool(val))
                            return false;

                        __fade_settings[fx] = val;

                        return true;
                    }

                    this.into = function(val)
                    {
                        return validate('fade_in_enabled', val);
                    };

                    this.out = function(val)
                    {
                        return validate('fade_out_enabled', val);
                    };
                }

                this.all = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                    {
                        if (__opacity_enabled === true && 
                            __fade_settings.fade_in_enabled === true && 
                            __fade_settings.fade_out_enabled === true)
                            return true;
                        else
                            return false;
                    }

                    if (!utils_sys.validation.misc.is_bool(val))
                        return false;

                    __opacity_enabled = val;
                    __fade_settings.fade_in_enabled = val;
                    __fade_settings.fade_out_enabled = val;

                    return true;
                };

                this.opacity = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __opacity_enabled;

                    if (!utils_sys.validation.misc.is_bool(val))
                        return false;

                    __opacity_enabled = val;

                    return true;
                };

                var __fade_settings = new fade_settings_object();

                this.fade = new fade();
            }

            function opacity()
            {
                function opacity_settings()
                {
                    this.get = function()
                    {
                        if (is_init === false)
                            return false;

                        if (!me.fx.enabled.opacity())
                            return false;

                        return __fx_settings.opacity;
                    };

                    this.set = function(val)
                    {
                        if (is_init === false)
                            return false;

                        if (!utils_sys.validation.numerics.is_float(val) || val < 0.0 || val > 1.0)
                            return false;

                        me.fx.enabled.opacity(true);

                        __fx_settings.opacity = val;

                        bee_statuses.opacity_changed(true);

                        morpheus.execute(my_bee_id, 'gui', 'opacity_changed');

                        bee_statuses.opacity_changed(false);

                        return true;
                    };
                }

                this.apply = function()
                {
                    if (is_init === false)
                        return false;

                    if (!me.fx.enabled.opacity())
                        return false;

                    gfx.opacity.apply(my_bee_id, __fx_settings.opacity);
                    gfx.opacity.apply(ui_config.casement.id, __fx_settings.opacity);

                    return true;
                };

                this.reset = function()
                {
                    if (is_init === false)
                        return false;

                    if (!me.fx.enabled.opacity())
                        return false;

                    me.fx.enabled.opacity(false);

                    gfx.opacity.reset(my_bee_id);
                    gfx.opacity.reset(ui_config.casement.id);

                    return true;
                };

                this.settings = new opacity_settings();
            }

            function fade()
            {
                var __fade_batch_array = [];

                function validate(mode, type, option, index, ssd_array)
                {
                    if (is_init === false)
                        return false;

                    if (mode === 1)
                    {
                        me.fx.fade.settings[type].set(__fade_batch_array[index].step, 
                                                      __fade_batch_array[index].speed, 
                                                      __fade_batch_array[index].delay);

                        me.fx.fade[type]();
                    }
                    else if (mode === 2)
                    {
                        if (!me.fx.enabled.fade[type]())
                            return false;

                        var __fading_type = null;

                        if (type === 'into')
                            __fading_type = 'fading_in';
                        else
                            __fading_type = 'fading_out';

                        bee_statuses[__fading_type + '_finished'](false);
                        bee_statuses[__fading_type](true);

                        morpheus.execute(my_bee_id, 'gui', __fading_type);

                        gfx.fade[type](my_bee_id, me.fx.fade.settings[type].get.last(1), 
                                       me.fx.fade.settings[type].get.last(2), me.fx.fade.settings[type].get.last(3), 
                                       function()
                                       {
                                            bee_statuses[__fading_type](false);
                                            bee_statuses[__fading_type + '_finished'](true);

                                            morpheus.execute(my_bee_id, 'gui', __fading_type + '_finished');
                                       });
                        return true;
                    }
                    else if (mode === 3)
                    {
                        me.fx.enabled.fade[type](true);

                        __fx_settings.fade[type].step = ssd_array[0];
                        __fx_settings.fade[type].speed = ssd_array[1];
                        __fx_settings.fade[type].delay = ssd_array[2];
                    }
                    else if (mode === 4)
                    {
                        var i = 0,
                            __loops = 0;

                        if (!me.fx.enabled.fade[type]())
                            return false;

                        if (__fade_batch_array.length === 0)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(option) && utils_sys.validation.misc.is_undefined(index))
                        {
                            var __this_fade_batch_array = [];

                            __loops = __fade_batch_array.length;

                            for (i = 0; i < __loops; i++)
                            {
                                if (__fade_batch_array[i].type === type)
                                    __this_fade_batch_array.push(__fade_batch_array[i]);
                            }

                            return __this_fade_batch_array;
                        }

                        if (!utils_sys.validation.numerics.is_integer(option) || option < 1 || option > 3 || 
                            !utils_sys.validation.misc.is_undefined(index) && (!utils_sys.validation.numerics.is_integer(index) || index < 0))
                            return false;

                        if (utils_sys.validation.misc.is_undefined(index))
                            index = 0;

                        __loops = __fade_batch_array.length;

                        for (i = index; i < __loops; i++)
                        {
                            if (__fade_batch_array[i].type === type)
                            {
                                if (option === 1)
                                    return __fade_batch_array[i].step;
                                else if (option === 2)
                                    return __fade_batch_array[i].speed;
                                else
                                    return __fade_batch_array[i].delay;
                            }
                        }

                        return false;
                    }
                    else if (mode === 5)
                    {
                        if (!me.fx.enabled.fade[type]())
                            return false;

                        if (__fade_batch_array.length === 0)
                            return false;

                        if (!utils_sys.validation.numerics.is_integer(option) || option < 1 || option > 3)
                            return false;

                        if (option === 1)
                            return __fx_settings.fade[type].step;

                        else if (option === 2)
                            return __fx_settings.fade[type].speed;

                        else
                            return __fx_settings.fade[type].delay;
                    }
                    else
                    {
                        var __fade_settings = utils_int.fade_settings;

                        if (utils_sys.validation.misc.is_undefined(ssd_array[0]) || 
                            utils_sys.validation.misc.is_undefined(ssd_array[1]) || 
                            utils_sys.validation.misc.is_undefined(ssd_array[2]))
                            return false;

                        if ((!utils_sys.validation.numerics.is_float(ssd_array[0]) || ssd_array[0] < 0.0 || ssd_array[0] > 1.0) || 
                            (!utils_sys.validation.numerics.is_integer(ssd_array[1]) || ssd_array[1] < 0) || 
                            (!utils_sys.validation.numerics.is_integer(ssd_array[2]) || ssd_array[2] < 0))
                            return false;

                        __fx_settings.fade[type].step = ssd_array[0];
                        __fx_settings.fade[type].speed = ssd_array[1];
                        __fx_settings.fade[type].delay = ssd_array[2];

                        __fade_settings.type = type;
                        __fade_settings.step = ssd_array[0];
                        __fade_settings.speed = ssd_array[1];
                        __fade_settings.delay = ssd_array[2];

                        __fade_batch_array.push(__fade_settings);

                        me.fx.enabled.fade[type](true);

                        return true;
                    }

                    return false;
                }

                function fade_settings()
                {
                    this.batch = function(type, step, speed, delay)
                    {
                        if (is_init === false)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(type) || !utils_sys.validation.alpha.is_string(type) || 
                            (!utils_sys.validation.numerics.is_float(step) || step < 0.0 || step > 1.0) || 
                            (!utils_sys.validation.numerics.is_integer(speed) || speed < 0) || 
                            (!utils_sys.validation.numerics.is_integer(delay) || delay < 0))
                            return false;

                        var __fade_settings = utils_int.fade_settings,
                            __ssd_aray = [step, speed, delay];

                        if (type === 'into')
                            validate(3, type, null, null, __ssd_aray);
                        else if (type === 'out')
                            validate(3, type, null, null, __ssd_aray);
                        else
                            return false;

                        __fade_settings.type = type;
                        __fade_settings.step = step;
                        __fade_settings.speed = speed;
                        __fade_settings.delay = delay;

                        __fade_batch_array.push(__fade_settings);

                        return true;
                    };

                    function into()
                    {
                        function get()
                        {
                            this.from = function(option, index)
                            {
                                return validate(4, 'into', option, index);
                            };

                            this.last = function(option)
                            {
                                return validate(5, 'into', option);
                            };
                        }

                        this.set = function(step, speed, delay)
                        {
                            var __ssd_aray = [step, speed, delay];

                            return validate(6, 'into', null, null, __ssd_aray);
                        };

                        this.get = new get();
                    }
                    
                    function out()
                    {
                        function get()
                        {
                            this.from = function(option, index)
                            {
                                return validate(4, 'out', option, index);
                            };

                            this.last = function(option)
                            {
                                return validate(5, 'out', option);
                            };
                        }

                        this.set = function(step, speed, delay)
                        {
                            var __ssd_aray = [step, speed, delay];

                            return validate(6, 'out', null, null, __ssd_aray);
                        };

                        this.get = new get();
                    }

                    this.into = new into();
                    this.out = new out();
                }

                this.batch = function()
                {
                    if (is_init === false)
                        return false;

                    var __batch_num = __fade_batch_array.length;

                    if (__batch_num === 0)
                        return false;

                    for (var i = 0; i < __batch_num; i++)
                    {
                        if (__fade_batch_array[i].type === 'into')
                            validate(1, 'into', null, i);
                        else if (__fade_batch_array[i].type === 'out')
                            validate(1, 'out', null, i);
                        else
                            return false;
                    }

                    return true;
                };

                this.into = function()
                {
                    return validate(2, 'into');
                };

                this.out = function()
                {
                    return validate(2, 'out');
                };

                this.settings = new fade_settings();
            }

            var __fx_settings = new fx_settings();

            this.enabled = new fx_enabled();
            this.opacity = new opacity();
            this.fade = new fade();
        }

        function css()
        {
            function validate(type, context, sub_context, option, val)
            {
                function sub_context_css_object(mode)
                {
                    if (context === 'window' || context === 'casement')
                        return false;

                    if (sub_context === null || utils_sys.validation.misc.is_undefined(sub_context))
                        return true;

                    if (!ui_config[context][mode].hasOwnProperty(sub_context))
                        __css_object = null;
                    else
                    {
                        if (type === 2)
                            mode = 'ids';

                        __css_object = utils_sys.objects.by_id(ui_config[context][mode][sub_context]);
                    }

                    return true;
                }

                if (!ui_config.hasOwnProperty(context))
                    return false;

                if ((context === 'window' || context === 'casement') && 
                    (!utils_sys.validation.misc.is_undefined(sub_context) && sub_context !== null))
                    return false;

                var __css_object = utils_sys.objects.by_id(ui_config[context].id);

                if (type === 1)
                    sub_context_css_object('ids');
                else
                    sub_context_css_object('classes');

                if (__css_object === null)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                {
                    if (type === 1)
                    {
                        if (utils_sys.validation.misc.is_undefined(option))
                            return __css_object.style;

                        return __css_object.style[option];
                    }
                    else
                        return __css_object.className;
                }

                if (type === 1)
                    __css_object.style[option] = val;
                else
                    __css_object.className = val;

                return true;
            }

            function style()
            {
                this.get = function(context, sub_context, option)
                {
                    if (!bee_statuses.running())
                        return false;

                    if (!utils_sys.validation.alpha.is_string(context) || 
                        (!utils_sys.validation.misc.is_undefined(sub_context) && !utils_sys.validation.alpha.is_string(sub_context)) || 
                        (!utils_sys.validation.misc.is_undefined(option) && !utils_sys.validation.alpha.is_string(option)))
                        return false;

                    return validate(1, context, sub_context, option);
                };

                this.set = function(context, sub_context, option, val)
                {
                    if (!bee_statuses.running())
                        return false;

                    if (!utils_sys.validation.alpha.is_string(context)|| 
                        (sub_context !== null && !utils_sys.validation.alpha.is_string(sub_context)) || 
                        (option !== null && !utils_sys.validation.alpha.is_string(option)) || 
                        !utils_sys.validation.alpha.is_string(val))
                        return false;

                    return validate(1, context, sub_context, option, val);
                };
            }

            function class_name()
            {
                this.get = function(context, sub_context)
                {
                    if (!bee_statuses.running())
                        return false;

                    if (!utils_sys.validation.alpha.is_string(context) || 
                        (!utils_sys.validation.misc.is_undefined(sub_context) && !utils_sys.validation.alpha.is_string(sub_context)))
                        return false;

                    return validate(2, context, sub_context);
                };

                this.set = function(context, sub_context, val)
                {
                    if (!bee_statuses.running())
                        return false;

                    if (!utils_sys.validation.alpha.is_string(context)|| 
                        (sub_context !== null && !utils_sys.validation.alpha.is_string(sub_context)) || 
                        !utils_sys.validation.alpha.is_string(val))
                        return false;

                    return validate(2, context, sub_context, null, val);
                };
            }

            this.style = new style();
            this.class_name = new class_name();
        }

        function actions()
        {
            function menu()
            {
                this.open = function(event_object)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object))
                        return false;

                    if (bee_statuses.menu_activated())
                        return false;

                    if (event_object === null || event_object.buttons === 0 && utils_int.last_mouse_button() === 1)
                    {
                        gfx.visibility.toggle(ui_config.window.menu.id, 1);

                        bee_statuses.menu_activated(true);

                        self.settings.actions.can_drag.enabled(true);

                        morpheus.execute(my_bee_id, 'gui', 'menu_activated');

                        return true;
                    }

                    return false;
                };

                this.close = function(event_object)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object))
                        return false;

                    if (!bee_statuses.menu_activated())
                        return false;

                    if (event_object === null || event_object.buttons === 1)
                    {
                        gfx.visibility.toggle(ui_config.window.menu.id, 1);

                        bee_statuses.menu_activated(false);

                        return true;
                    }

                    return false;
                };
            }

            function casement()
            {
                var __is_animating = false;

                function execute_commands(callback)
                {
                    if (!utils_sys.validation.misc.is_undefined(callback))
                        callback.call();

                    return true;
                }

                this.deploy = function(event_object, callback)
                {
                    function animate_casement()
                    {
                        __is_animating = true;

                        gfx.visibility.toggle(ui_config.casement.id, 1);
                        gfx.animation.roll(ui_config.casement.id, 1, 'right', __casement_width, __casement_offset, __speed, __step,
                        function()
                        {
                            bee_statuses.casement_deployed(true);
                            bee_statuses.casement_retracted(false);

                            __is_animating = false;

                            execute_commands(callback);

                            morpheus.execute(my_bee_id, 'gui', 'casement_deployed');
                        });

                        return true;
                    }

                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object) || 
                        !utils_sys.validation.misc.is_undefined(callback) && !utils_sys.validation.misc.is_function(callback))
                        return false;

                    if (__is_animating === true || !self.settings.actions.can_use_casement())
                        return false;

                    var __window_pos_x = me.position.left(),
                        __window_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width),
                        __casement = ui_objects.casement.ui,
                        __casement_width = utils_sys.graphics.pixels_value(__casement.style.width),
                        __casement_offset = __window_width - __casement_width,
                        __step = Math.ceil(__casement_width / 23),
                        __speed = Math.ceil(__step / 3);

                    if ((__window_pos_x + (__window_width + __casement_width )) >= swarm.settings.right())
                    {
                        msg_win = new msgbox();

                        msg_win.init('desktop');
                        msg_win.show(xenon.load('os_name'), 'The casement can not be opened here as it overflows your screen!');

                        return false;
                    }

                    ui_objects.window.ui.style.borderTopRightRadius = '0px';
                    ui_objects.window.ui.style.borderBottomRightRadius = '0px';

                    __casement.style.left = __window_pos_x + 'px';

                    if (self.status.gui.fx.fading.into.finished())
                        animate_casement();
                    else
                        setTimeout(function() { animate_casement(); }, utils_int.animating_events.duration());

                    if (self.settings.actions.can_use_menu())
                        ui_objects.window.menu.manage_casement.innerHTML = 'Hide casement';

                    return true;
                };

                this.retract = function(event_object, callback)
                {
                    function animate_casement()
                    {
                        __is_animating = true;

                        gfx.animation.roll(ui_config.casement.id, 1, 'left', __casement_width, 0, __speed, __step, 
                        function()
                        {
                            gfx.visibility.toggle(ui_config.casement.id, 1);

                            ui_objects.window.ui.style.borderTopRightRadius = '6px';
                            ui_objects.window.ui.style.borderBottomRightRadius = '6px';

                            __is_animating = false;

                            bee_statuses.casement_deployed(false);
                            bee_statuses.casement_retracted(true);

                            execute_commands(callback);

                            morpheus.execute(my_bee_id, 'gui', 'casement_retracted');
                        });
                    }

                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object) || 
                        !utils_sys.validation.misc.is_undefined(callback) && !utils_sys.validation.misc.is_function(callback))
                        return false;

                    if (__is_animating === true)
                        return false;

                    var __casement = ui_objects.casement.ui,
                        __casement_width = utils_sys.graphics.pixels_value(__casement.style.width),
                        __step = Math.ceil(__casement_width / 23),
                        __speed = Math.ceil(__step / 3);

                    if (!bee_statuses.casement_deployed())
                        execute_commands(callback);
                    else
                        animate_casement();

                    if (self.settings.actions.can_use_menu())
                        ui_objects.window.menu.manage_casement.innerHTML = 'Show casement';

                    return true;
                };

                this.trigger = function(event_object, callback)
                {
                    if (is_init === false)
                        return false;

                    self.gui.actions.casement.retract(event_object, callback);
                    self.gui.actions.casement.deploy(event_object, callback);

                    return true;
                };
            }

            function hover()
            {
                this.into = function(event_object)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object))
                        return false;

                    // Future code...

                    return true;

                };

                this.out = function(event_object)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object))
                        return false;

                    if (!bee_statuses.dragging())
                        bee_statuses.active(false);

                    return true;
                };
            }

            this.edit_title = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object) || bee_statuses.close())
                    return false;

                if (event_object === null || event_object.buttons === 1)
                {
                    utils_int.edit_win_title();

                    return true;
                }

                return false;
            };

            this.show = function(child_bees = [], headless = false)
            {
                if (is_init === false)
                    return false;

                if (error_code !== null)
                    return false;

                if (!utils_sys.validation.misc.is_array(child_bees))
                    return false;

                var __child_bee = null;

                for (__child_bee in child_bees)
                {
                    if (!colony.is_bee(__child_bee))
                    {
                        owl.status.applications.set(my_bee_id, __app_id, 'FAIL');

                        utils_int.log('Run', 'INVALID CHILD BEES');
    
                        return false;
                    }
                }

                if (!utils_sys.validation.misc.is_bool(headless))
                    return false;

                if (bee_statuses.running())
                    return false;

                if (utils_int.is_lonely_bee(my_bee_id))
                    return false;

                var __app_id = self.settings.general.app_id(),
                    __is_running_instance = owl.status.applications.get.by_proc_id(__app_id, 'RUN');

                if (__is_running_instance)
                {
                    if (colony.is_single_instance(__app_id))
                        return false;
                }

                if (headless === false)
                {
                    if (!utils_int.gui_init())
                    {
                        owl.status.applications.set(my_bee_id, __app_id, 'FAIL');

                        utils_int.log('Show', 'ERROR');

                        return false;
                    }
                }

                bee_statuses.running(true);
                bee_statuses.active(true);

                morpheus.execute(my_bee_id, 'system', 'running');

                for (__child_bee in child_bees)
                    __child_bee.show();

                owl.status.applications.set(my_bee_id, __app_id, 'RUN');

                if (headless === false)
                    utils_int.log('Show', 'OK');

                return true;
            };

            this.close = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object))
                    return false;

                function remove_me(this_object)
                {
                    var __honeycomb_id = hive.status.bees.honeycomb_id(my_bee_id);

                    error_code = null;

                    morpheus.execute(my_bee_id, 'gui', 'closed');
                    morpheus.clear(my_bee_id);

                    bee_statuses.error(false);
                    bee_statuses.running(false);
                    bee_statuses.closed(true);

                    swarm.settings.active_bee(null);

                    utils_int.remove_bee();

                    if (!swarm.bees.remove(this_object))
                        return false;

                    if (bee_statuses.in_hive())
                    {
                        if (!hive.stack.bees.remove(this_object, __honeycomb_id))
                            return false;
                    }

                    return true;
                }

                if ((event_object === null || event_object.buttons === 1) && bee_statuses.opened() && !bee_statuses.close())
                {
                    var __app_id = self.settings.general.app_id();

                    if (!self.settings.actions.can_close())
                        return false;

                    bee_statuses.opened(false);
                    bee_statuses.close(true);
                    bee_statuses.dragging(false);

                    if (bee_statuses.in_hive())
                        ui_objects.casement.ui.style.visibility = 'hidden';

                    owl.status.applications.set(my_bee_id, __app_id, 'END');

                    me.actions.casement.retract(event_object, 
                    function()
                    {
                        var __child_bee = null;

                        for (__child_bee in my_child_bees)
                            __child_bee.close(null);

                        morpheus.execute(my_bee_id, 'gui', 'close');
/*
                        try
                        {

                        }
                        catch
                        {
                            // Do nothing...
                        }
*/
                        if (utils_int.animating_events.in_progress())
                            setTimeout(function() { remove_me(self); }, utils_int.animating_events.duration());
                        else
                            remove_me(self);
                    });

                    return true;
                }

                return false;
            };

            this.minimize = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object))
                    return false;

                if (event_object === null || event_object.buttons === 1)
                {
                    bee_statuses.minimize(true);
                    bee_statuses.minimized(true);
                    bee_statuses.restore(false);
                    bee_statuses.restored(false);
                    bee_statuses.maximize(false);
                    bee_statuses.maximized(false);
                    bee_statuses.dragging(false);
                    bee_statuses.resizing(false);

                    morpheus.execute(my_bee_id, 'gui', 'minimize');

                    // TODO: Call Hive

                    morpheus.execute(my_bee_id, 'gui', 'minimized');

                    return true;
                }

                return false;
            };

            this.restore = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object))
                    return false;

                if (event_object === null || event_object.buttons === 1)
                {
                    bee_statuses.restore(true);
                    bee_statuses.restored(true);
                    bee_statuses.minimize(false);
                    bee_statuses.minimized(false);
                    bee_statuses.dragging(false);
                    bee_statuses.resizing(false);

                    morpheus.execute(my_bee_id, 'gui', 'restore');

                    // TODO: Call Hive

                    morpheus.execute(my_bee_id, 'gui', 'restored');

                    return true;
                }

                return false;
            };

            this.maximize = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object))
                    return false;

                if (event_object === null || event_object.buttons === 1)
                {
                    bee_statuses.maximize(true);
                    bee_statuses.maximized(true);
                    bee_statuses.minimize(false);
                    bee_statuses.minimized(false);
                    bee_statuses.restore(false);
                    bee_statuses.restored(false);
                    bee_statuses.dragging(false);
                    bee_statuses.resizing(false);

                    morpheus.execute(my_bee_id, 'gui', 'maximize');

                    // TODO: Call Hive

                    morpheus.execute(my_bee_id, 'gui', 'maximized');

                    return true;
                }

                return false;
            };

            this.set_top = function()
            {
                if (is_init === false)
                    return false;

                var __z_index = swarm.status.z_index();

                swarm.settings.z_index(__z_index + 2);

                if (bee_statuses.topmost())
                {
                    var __new_topmost_z_index = me.position.topmost_z_index() + __z_index;

                    me.position.topmost_z_index(__new_topmost_z_index);
                    me.position.z_index(__new_topmost_z_index + 2);
    
                    utils_int.set_z_index(__new_topmost_z_index);
                }
                else
                {
                    me.position.z_index(__z_index + 2);

                    utils_int.set_z_index(__z_index);
                }

                return true;
            };

            this.touch = function()
            {
                if (is_init === false)
                    return false;

                if (bee_statuses.fading_in() || bee_statuses.fading_out() || bee_statuses.close())
                    return false;

                bee_statuses.touch(true);
                bee_statuses.touched(false);

                bee_statuses.mouse_clicked(true);

                bee_statuses.active(true);

                morpheus.execute(my_bee_id, 'system', 'active');
                morpheus.execute(my_bee_id, 'gui', 'touch');
                morpheus.execute(my_bee_id, 'gui', 'mouse_clicked');

                if (bee_statuses.topmost())
                    return true;

                me.actions.set_top();

                return true;
            };

            this.dresize = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object) || bee_statuses.title_on_edit() || bee_statuses.close())
                    return false;

                if (event_object.buttons !== 1)
                    return false;

                if (bee_statuses.drag() && self.settings.actions.can_drag.enabled())
                {
                    var __pos_x = me.position.left() + (swarm.area.mouse.x() - me.mouse.relative.x()),
                        __pos_y = me.position.top() + (swarm.area.mouse.y() - me.mouse.relative.y()),
                        __current_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width),
                        __current_height = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.height),
                        __casement_width = utils_sys.graphics.pixels_value(ui_objects.casement.ui.style.width),
                        __dynamic_casement_width = 0,
                        __dynamic_right_pos = 0;

                    bee_statuses.mouse_clicked(true);
                    bee_statuses.dragging(true);

                    if (bee_statuses.casement_deployed())
                        __dynamic_casement_width = __casement_width + 2;

                    if (__pos_x <= 0 && __pos_y <= 0)
                    {
                        ui_objects.window.ui.style.left = '0px';
                        ui_objects.window.ui.style.top = '0px';

                        ui_objects.casement.ui.style.left = __current_width + 'px';
                        ui_objects.casement.ui.style.top = '0px';
                    }
                    else
                    {
                        if (__pos_x <= 0)
                        {
                            ui_objects.window.ui.style.left = '0px';
                            ui_objects.window.ui.style.top = __pos_y + 'px';

                            ui_objects.casement.ui.style.left = __current_width + 'px';
                            ui_objects.casement.ui.style.top = __pos_y + 'px';
                        }

                        if (__pos_y <= 0)
                        {
                            ui_objects.window.ui.style.left = __pos_x + 'px';
                            ui_objects.window.ui.style.top = '0px';

                            ui_objects.casement.ui.style.left = __pos_x + __current_width + 'px';
                            ui_objects.casement.ui.style.top = '0px';
                        }
                    }

                    if (((__pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x()) >= 
                         (swarm.settings.right() - swarm.area.mouse.x())) && 
                        ((__pos_y + __current_height - swarm.area.mouse.y()) >= 
                         (swarm.settings.bottom() - swarm.area.mouse.y())))
                    {
                        ui_objects.window.ui.style.left = 
                        swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
                        ui_objects.window.ui.style.top = 
                        swarm.settings.bottom() - __current_height + 'px';

                        ui_objects.casement.ui.style.left = 
                        swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
                        ui_objects.casement.ui.style.top = 
                        swarm.settings.bottom() - __current_height + 'px';
                    }
                    else
                    {
                        if ((__pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x()) >= 
                            (swarm.settings.right() - swarm.area.mouse.x()))
                        {
                            if (__pos_y <= 0)
                            {
                                ui_objects.window.ui.style.left = 
                                swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
                                ui_objects.window.ui.style.top = '0px';

                                ui_objects.casement.ui.style.left = 
                                swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
                                ui_objects.casement.ui.style.top = '0px';
                            }
                            else
                            {
                                ui_objects.window.ui.style.left = 
                                swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
                                ui_objects.window.ui.style.top = __pos_y + 'px';

                                ui_objects.casement.ui.style.left = 
                                swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
                                ui_objects.casement.ui.style.top = __pos_y + 'px';
                            }
                        }

                        if ((__pos_y + __current_height - swarm.area.mouse.y()) >= 
                            (swarm.settings.bottom() - swarm.area.mouse.y()))
                        {
                            if (__pos_x <= 0)
                            {
                                ui_objects.window.ui.style.left = '0px';
                                ui_objects.window.ui.style.top = 
                                swarm.settings.bottom() - __current_height + 'px';

                                ui_objects.casement.ui.style.left = __current_width + 'px';
                                ui_objects.casement.ui.style.top = swarm.settings.bottom() - __current_height + 'px';
                            }
                            else
                            {
                                ui_objects.window.ui.style.left = __pos_x + 'px';
                                ui_objects.window.ui.style.top = 
                                swarm.settings.bottom() - __current_height + 'px';

                                ui_objects.casement.ui.style.left = __pos_x + __current_width + 'px';
                                ui_objects.casement.ui.style.top = swarm.settings.bottom() - __current_height + 'px';
                            }
                        }
                    }

                    if (bee_statuses.casement_deployed())
                        __dynamic_right_pos = __pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x();
                    else
                        __dynamic_right_pos = __pos_x + __current_width - swarm.area.mouse.x();

                    if (__pos_x > 0 && __pos_y > 0 && 
                        ((__dynamic_right_pos < 
                            (swarm.settings.right() - swarm.area.mouse.x())) && 
                        ((__pos_y + __current_height - swarm.area.mouse.y()) < 
                            (swarm.settings.bottom() - swarm.area.mouse.y()))))
                    {
                        ui_objects.window.ui.style.left = __pos_x + 'px';
                        ui_objects.window.ui.style.top = __pos_y + 'px';

                        ui_objects.casement.ui.style.left = __pos_x + __current_width + 'px';
                        ui_objects.casement.ui.style.top = __pos_y + 'px';
                    }

                    morpheus.execute(my_bee_id, 'gui', 'mouse_clicked');
                    morpheus.execute(my_bee_id, 'gui', 'dragging');
                }
                else if (bee_statuses.resize() && self.settings.actions.can_resize.enabled() && !bee_statuses.casement_deployed())
                {
                    var __size_x = 0,
                        __size_y = 0,
                        __resize_x_offset = utils_sys.graphics.pixels_value(ui_objects.window.status_bar.resize.style.width),
                        __resize_y_offset = utils_sys.graphics.pixels_value(ui_objects.window.status_bar.resize.style.height),
                        __resize_title_diff = 100,
                        __resize_data_diff = 88,
                        __resize_status_msg_diff = 50,
                        __final_window_width = 0;

                    __size_x = swarm.area.mouse.x() - me.position.left() - 
                               me.size.width() + __resize_x_offset;
                    __size_y = swarm.area.mouse.y() - me.position.top() - 
                               me.size.height() + __resize_y_offset;

                    if (__size_x < (swarm.settings.right() - 
                                    me.position.left() - me.size.width()) && 
                        __size_y < (swarm.settings.bottom() - 
                                    me.position.top() - me.size.height()))
                    {
                        var __new_width = me.size.width() + __size_x,
                            __new_height = me.size.height() + __size_y;

                        bee_statuses.mouse_clicked(true);
                        bee_statuses.resizing(true);

                        if (__new_width >= me.size.max.width() && __new_height >= me.size.max.height())
                        {
                            if (__new_width - __size_x >= me.size.max.width() && 
                                __new_height - __size_y >= me.size.max.height())
                            {
                                ui_objects.window.ui.style.width = me.size.max.width() + 'px';
                                ui_objects.window.ui.style.height = me.size.max.height() + 'px';

                                ui_objects.window.control_bar.title.style.width = 
                                me.size.max.width() - __resize_title_diff + 'px';

                                ui_objects.window.content.data.style.height = 
                                me.size.max.height() - __resize_data_diff + 'px';

                                ui_objects.window.status_bar.message.style.width = 
                                me.size.max.width() - __resize_status_msg_diff + 'px';

                                ui_objects.casement.data.style.height = 
                                me.size.height() + 'px';
                            }
                        }
                        else
                        {
                            if (__new_width >= me.size.max.width())
                            {
                                if (__new_width - __size_x >= me.size.max.width())
                                {
                                    ui_objects.window.ui.style.width = me.size.max.width() + 'px';
                                    ui_objects.window.ui.style.height = __new_height + 'px';

                                    ui_objects.window.control_bar.title.style.width = 
                                    me.size.max.width() - __resize_title_diff + 'px';

                                    ui_objects.window.content.data.style.height = 
                                    __new_height - __resize_data_diff + 'px';

                                    ui_objects.window.status_bar.message.style.width = 
                                    me.size.max.width() - __resize_status_msg_diff + 'px';

                                    ui_objects.casement.data.style.height = 
                                    __new_height + 'px';
                                }
                            }

                            if (__new_height >= me.size.max.height())
                            {
                                if (__new_height - __size_y >= me.size.max.height())
                                {
                                    ui_objects.window.ui.style.width = __new_width + 'px';
                                    ui_objects.window.ui.style.height =  me.size.max.height() + 'px';

                                    ui_objects.window.control_bar.title.style.width = 
                                    __new_width - __resize_title_diff + 'px';

                                    ui_objects.window.content.data.style.height = 
                                    me.size.max.height() - __resize_data_diff + 'px';

                                    ui_objects.window.status_bar.message.style.width = 
                                    __new_width - __resize_status_msg_diff + 'px';

                                    ui_objects.casement.data.style.height = 
                                    me.size.height() + 'px';
                                }
                            }
                        }

                        if (__new_width <= me.size.min.width() && 
                            __new_height <= me.size.min.height())
                        {
                            if (__size_x >= 0 && __size_y >= 0)
                            {
                                ui_objects.window.ui.style.width = me.size.min.width() + 'px';
                                ui_objects.window.ui.style.height = me.size.min.height() + 'px';

                                ui_objects.window.control_bar.title.style.width = 
                                me.size.min.width() - __resize_title_diff + 'px';

                                ui_objects.window.content.data.style.height = 
                                me.size.min.height() - __resize_data_diff + 'px';

                                ui_objects.window.status_bar.message.style.width = 
                                me.size.min.width() - __resize_status_msg_diff + 'px';

                                ui_objects.casement.data.style.height = 
                                me.size.height() + 'px';
                            }
                        }
                        else
                        {
                            if (__new_width <= me.size.min.width())
                            {
                                if (__size_x >= 0)
                                {
                                    ui_objects.window.ui.style.width = me.size.min.width() + 'px';
                                    ui_objects.window.ui.style.height = __new_height + 'px';

                                    ui_objects.window.control_bar.title.style.width = 
                                    me.size.min.width() - __resize_title_diff + 'px';

                                    ui_objects.window.content.data.style.height = 
                                    __new_height - __resize_data_diff + 'px';

                                    ui_objects.window.status_bar.message.style.width = 
                                    me.size.min.width() - __resize_status_msg_diff + 'px';

                                    ui_objects.casement.data.style.height = 
                                    __new_height + 'px';
                                }
                            }

                            if (__new_height <= me.size.min.height())
                            {
                                if (__size_y >= 0)
                                {
                                    ui_objects.window.ui.style.width = __new_width + 'px';
                                    ui_objects.window.ui.style.height = me.size.min.height() + 'px';

                                    ui_objects.window.control_bar.title.style.width = 
                                    __new_width - __resize_title_diff + 'px';

                                    ui_objects.window.content.data.style.height = 
                                    me.size.min.height() - __resize_data_diff + 'px';

                                    ui_objects.window.status_bar.message.style.width = 
                                    __new_width - __resize_status_msg_diff + 'px';

                                    ui_objects.casement.data.style.height = 
                                    me.size.height() + 'px';
                                }
                            }
                        }

                        if (__new_width > me.size.min.width() && __new_height > me.size.min.height() && 
                            __new_width < me.size.max.width() && __new_height < me.size.max.height())
                        {
                            ui_objects.window.ui.style.width = __new_width + 'px';
                            ui_objects.window.ui.style.height = __new_height + 'px';

                            ui_objects.window.control_bar.title.style.width = 
                            __new_width - __resize_title_diff + 'px';

                            ui_objects.window.content.data.style.height = 
                            __new_height - __resize_data_diff + 'px';

                            ui_objects.window.status_bar.message.style.width = 
                            __new_width - __resize_status_msg_diff + 'px';

                            ui_objects.casement.data.style.height = 
                            __new_height + 'px';
                        }

                        __final_window_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width);

                        ui_objects.casement.ui.style.left = me.position.left() + __final_window_width + 'px';
                        ui_objects.casement.ui.style.width = __final_window_width * (self.settings.general.casement_width() / 100) + 'px';
                        ui_objects.casement.ui.style.height = ui_objects.window.ui.style.height;
                    }

                    if (self.settings.general.status_bar_marquee())
                    {
                        if (self.settings.data.window.labels.status_bar().length * 9.0 < __final_window_width)
                            ui_objects.window.status_bar.message.childNodes[1].classList.remove('marquee');
                        else
                            ui_objects.window.status_bar.message.childNodes[1].classList.add('marquee');
                    }

                    if (self.settings.general.resize_tooltip())
                        swarm.resize_tooltip(self, true);

                    morpheus.execute(my_bee_id, 'gui', 'mouse_clicked');
                    morpheus.execute(my_bee_id, 'gui', 'resizing');

                    hive.stack.toggle('off');
                }
                else
                    return false;

                return true;
            };

            this.release = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object))
                    return false;

                if (event_object.buttons !== 0)
                    return false;

                self.settings.actions.can_drag.enabled(true);

                if (!bee_statuses.close() && swarm.status.active_bee() === my_bee_id)
                {
                    swarm.settings.active_bee(null);

                    if (bee_statuses.dragging())
                        bee_statuses.dragged(true);

                    if (bee_statuses.resizing())
                        bee_statuses.resized(true);

                    bee_statuses.drag(false);
                    bee_statuses.dragging(false);

                    bee_statuses.touch(false);
                    bee_statuses.touched(true);

                    bee_statuses.mouse_clicked(false);

                    morpheus.execute(my_bee_id, 'gui', 'touched');
                    morpheus.execute(my_bee_id, 'gui', 'dragged');
                    morpheus.execute(my_bee_id, 'gui', 'resized');

                    me.position.left(utils_sys.graphics.pixels_value(ui_objects.window.ui.style.left));
                    me.position.top(utils_sys.graphics.pixels_value(ui_objects.window.ui.style.top));

                    return true;
                }

                swarm.resize_tooltip(self, false);

                bee_statuses.resizing(false);
                bee_statuses.resize(false);

                if (!self.settings.actions.can_close())
                    bee_statuses.close(false);

                return false;
            };

            this.menu = new menu();
            this.casement = new casement();
            this.hover = new hover();
        }

        function config()
        {
            function window()
            {
                this.id = function()
                {
                    return ui_config.window.id;
                };

                this.class_name = function()
                {
                    return ui_config.window.class;
                };

                function control_bar()
                {
                    this.id = function()
                    {
                        return ui_config.window.control_bar.id;
                    };

                    this.class_name = function()
                    {
                        return ui_config.window.control_bar.classes.container;
                    };

                    function icon()
                    {
                        this.id = function()
                        {
                            return ui_config.window.control_bar.ids.icon;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.control_bar.classes.icon;
                        };
                    }

                    function title()
                    {
                        this.id = function()
                        {
                            return ui_config.window.control_bar.ids.title;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.control_bar.classes.title;
                        };
                    }

                    function pencil()
                    {
                        this.id = function()
                        {
                            return ui_config.window.control_bar.ids.pencil;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.control_bar.classes.pencil;
                        };
                    }

                    function separator()
                    {
                        this.id = function()
                        {
                            return ui_config.window.control_bar.ids.separator;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.control_bar.classes.separator;
                        };
                    }

                    function close()
                    {
                        this.id = function()
                        {
                            return ui_config.window.control_bar.ids.close;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.control_bar.classes.close;
                        };
                    }

                    this.icon = new icon();
                    this.title = new title();
                    this.pencil = new pencil();
                    this.separator = new separator();
                    this.close = new close();
                }

                function content()
                {
                    this.id = function()
                    {
                        return ui_config.window.content.id;
                    };

                    this.class_name = function()
                    {
                        return ui_config.window.content.classes.container;
                    };

                    function data()
                    {
                        this.id = function()
                        {
                            return ui_config.window.content.ids.data;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.content.classes.data;
                        };
                    }

                    this.data = new data();
                }

                function status_bar()
                {
                    this.id = function()
                    {
                        return ui_config.window.status_bar.id;
                    };

                    this.class_name = function()
                    {
                        return ui_config.window.status_bar.classes.container;
                    };

                    function message()
                    {
                        this.id = function()
                        {
                            return ui_config.window.status_bar.ids.message;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.status_bar.classes.message;
                        };
                    }

                    function resize()
                    {
                        this.id = function()
                        {
                            return ui_config.window.status_bar.ids.resize;
                        };

                        this.class_name = function()
                        {
                            return ui_config.window.status_bar.classes.resize;
                        };
                    }

                    this.message = new message();
                    this.resize = new resize();
                }

                this.control_bar = new control_bar();
                this.content = new content();
                this.status_bar = new status_bar();
            }

            function casement()
            {
                this.id = function()
                {
                    return ui_config.casement.id;
                };

                this.class_name = function()
                {
                    return ui_config.casement.classes.container;
                };

                function title()
                {
                    this.id = function()
                    {
                        return ui_config.casement.ids.title;
                    };

                    this.class_name = function()
                    {
                        return ui_config.casement.classes.title;
                    };
                }

                function content()
                {
                    this.id = function()
                    {
                        return ui_config.casement.ids.data;
                    };

                    this.class_name = function()
                    {
                        return ui_config.casement.classes.data;
                    };
                }

                function status()
                {
                    this.id = function()
                    {
                        return ui_config.casement.ids.status;
                    };

                    this.class_name = function()
                    {
                        return ui_config.casement.classes.status;
                    };
                }

                this.title = new title();
                this.content = new content();
                this.status = new status();
            }

            this.window = new window();
            this.casement = new casement();
        }

        this.keys = new keys();
        this.mouse = new mouse();
        this.position = new position();
        this.size = new size();
        this.fx = new fx();
        this.css = new css();
        this.actions = new actions();
        this.config = new config();
    }

    function drone()
    {
        var __drones = [];

        function drone_object()
        {
            this.name = null;
            this.code = null;
        }

        this.use = function(new_func_name, new_func_code)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(new_func_name) || utils_sys.validation.misc.is_undefined(new_func_code))
                return false;

            var __new_drone = new drone_object();

            __new_drone.name = new_func_name;
            __new_drone.code = new_func_code;

            __drones.push(__new_drone);

            return true;
        };

        this.execute = function(existing_func_name, dynamic_func_args)
        {
            if (is_init === false)
                return false;

            if (!utils_sys.validation.alpha.is_string(existing_func_name) || 
                (!utils_sys.validation.misc.is_undefined(dynamic_func_args) && !utils_sys.validation.misc.is_array(dynamic_func_args)))
                return false;

            var __drones_num = __drones.length;

            for (var i = 0; i < __drones_num; i++)
            {
                if (__drones[i].name === existing_func_name)
                {
                    var __dynamic_func = null;

                    if (utils_sys.validation.alpha.is_string(__drones[i].code))
                        __dynamic_func = function() { eval(__drones[i].code); };
                    else
                        __dynamic_func = function() { __drones[i].code.call(); };

                    __dynamic_func.call(this, dynamic_func_args);

                    return true;
                }
            }

            return false;
        };
    }

    this.on = function(this_event, cmd)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.misc.is_undefined(this_event) || utils_sys.validation.misc.is_undefined(cmd))
            return false;

        var __context_list = new events_status_settings_model(),
            __context = null;

        for (__context in __context_list)
        {
            if (__context === 'on_event')
                continue;

            if (bee_events.contains(this_event, __context))
            {
                var __event_receiver_object = document,
                    __cmd = cmd;

                if (__context === 'mouse')
                    __event_receiver_object = ui_objects.window.ui;
                else if (__context === 'key')
                {
                    var __exended_cmd = function()
                                        {
                                            if (bee_statuses.active())
                                                cmd.call();
                                        };

                    __cmd = __exended_cmd;
                }

                morpheus.store(my_bee_id, __context, this_event, __cmd, __event_receiver_object);

                return true;
            }
        }

        return false;
    };

    this.run = function(child_bees = [], headless = false)
    {
        if (is_init === false)
            return false;
 
        if (error_code !== null)
            return false;

        var __app_id = self.settings.general.app_id(),
            __all_bees = colony.list(),
            __this_bee = null,
            __max_allowed_instances = self.settings.general.allowed_instances(),
            __currrent_running_instances_num = 0;

        if (__max_allowed_instances > 0)
        {
            for (__this_bee of __all_bees)
            {
                if (__this_bee.settings.general.app_id() === __app_id)
                {
                    __currrent_running_instances_num++;

                    if (__currrent_running_instances_num > __max_allowed_instances)
                    {
                        error_code = self.error.codes.INSTANCE_NUM_LIMIT;

                        owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');

                        bee_statuses.error(true);

                        utils_int.log('Run', 'INSTANCES LIMIT');

                        return false;
                    }
                }
            }
        }

        if (!self.gui.actions.show(child_bees, headless))
            return false;

        my_child_bees = child_bees;

        utils_int.log('Run', 'OK');

        return true;
    };

    this.init = function(bee_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        if (utils_sys.validation.misc.is_undefined(bee_id) || !self.settings.general.id(bee_id))
            return false;

        my_bee_id = self.settings.general.id();

        self.gui.size.max.width(swarm.settings.right());
        self.gui.size.max.height(swarm.settings.bottom());

        nature.theme(['bee']);
        nature.apply('new');

        bee_statuses.initialized(true);

        morpheus.execute(my_bee_id, 'system', 'initialized');

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        colony = cosmos.hub.access('colony');

        xenon = matrix.get('xenon');
        morpheus = matrix.get('morpheus');
        owl = matrix.get('owl');
        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        error_code = null,
        my_bee_id = null,
        my_child_bees = [],
        cosmos = null,
        matrix = null,
        nature = null,
        morpheus = null,
        owl = null,
        xenon = null,
        swarm = null,
        hive = null,
        colony = null,
        msg_win = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        key_control = new key_manager(),
        gfx = new fx(),
        ui_objects = new ui_objects_model(),
        ui_config = new ui_config_model(),
        bee_events = new supported_events(),
        bee_statuses = new supported_statuses(),
        utils_int = new utilities();

    this.gui = new gui();
    this.drone = new drone();
    this.status = new status();
    this.settings = new settings();
    this.error = new error();
}
