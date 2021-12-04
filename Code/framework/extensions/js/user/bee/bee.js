/*
    GreyOS - Bee (Version: 3.0)
    
    File name: bee.js
    Description: This file contains the Bee - Floating window module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Bee
function bee()
{
    var self = this;

    function ui_config_model()
    {
        function window()
        {
            this.id = null;
            this.class = null;

            function control_bar()
            {
                this.id = null;

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

                this.ids = new ids();
                this.classes = new classes();
            }

            function menu()
            {
                this.id = null;
                this.class = null;
            }

            function content()
            {
                this.id = null;

                function ids()
                {
                    this.data = null;
                }

                function classes()
                {
                    this.container = null;
                    this.data = null;
                }

                this.ids = new ids();
                this.classes = new classes();
            }

            function status_bar()
            {
                this.id = null;

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

                this.ids = new ids();
                this.classes = new classes();
            }

            this.control_bar = new control_bar();
            this.menu = new menu();
            this.content = new content();
            this.status_bar = new status_bar();
        }

        function casement()
        {
            this.id = null;

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

            this.ids = new ids();
            this.classes = new classes();
        }

        this.window = new window();
        this.casement = new casement();
    }

    function utilities()
    {
        var me = this;
        var last_mouse_button_clicked = 0;

        this.coords = function(event_object, type)
        {
            if (utils_sys.validation.misc.is_undefined(event_object) || !utils_sys.validation.numerics.is_integer(type) || 
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
        };

        this.manage_drag_status = function()
        {
            if (!self.settings.actions.can_drag.enabled() || bee_statuses.title_on_edit() || bee_statuses.close())
                return false;

            swarm.settings.active_bee(self.settings.general.id());

            bee_statuses.drag(true);

            bee_events_scheduler.execute('gui', 'drag');

            return true;
        };

        this.manage_casement = function(event_object)
        {
            if (bee_statuses.close())
                return false;

            if (utils_sys.validation.misc.is_undefined(event_object) || event_object.buttons !== 1)
                return false;

            if (bee_statuses.casement_deployed())
                self.gui.actions.casement.hide(event_object);
            else
                self.gui.actions.casement.deploy(event_object);

            return true;
        };

        this.edit_win_title = function()
        {
            var __bee_id = self.settings.general.id(),
                __ctrl_bar = utils_sys.objects.by_id(ui_config.window.control_bar.id),
                __old_title = utils_sys.objects.by_id(ui_config.window.control_bar.ids.title),
                __pencil = utils_sys.objects.by_id(ui_config.window.control_bar.ids.pencil),
                __win_type_class_title = null,
                __title_width = utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__bee_id).style.width) - 100,
                __edit_box = document.createElement('input'),
                __handler = null;

            __handler = function(event) { event.preventDefault(); };
            utils_sys.events.detach(__bee_id, utils_sys.objects.by_id(ui_config.window.control_bar.id), 'mousedown', __handler);

            __ctrl_bar.removeChild(__old_title);
            __ctrl_bar.removeChild(__pencil);

            if (self.settings.general.type() === 2)
                __win_type_class_title = 'widget_title';
            else
                __win_type_class_title = 'box_title';

            __edit_box.setAttribute('id', __bee_id + '_title_edit_box');
            __edit_box.setAttribute('class', 'title ' + __win_type_class_title + ' edit_win_title');
            __edit_box.setAttribute('style', 'width: ' + __title_width + 'px');
            __edit_box.setAttribute('value', self.settings.data.window.labels.title());

            __ctrl_bar.appendChild(__edit_box);

            __handler = function(event) { if (self.gui.keys.get(event) === 13) me.update_win_title(); };
            utils_sys.events.attach(__bee_id, utils_sys.objects.by_id(__edit_box.id), 'keydown', __handler);

            bee_statuses.title_on_edit(true);

            bee_events_scheduler.execute('gui', 'title_on_edit');

            return true;
        };

        this.update_win_title = function()
        {
            var __bee_id = self.settings.general.id(),
                __ctrl_bar = utils_sys.objects.by_id(ui_config.window.control_bar.id),
                __title_edit_box = utils_sys.objects.by_id(__bee_id + '_title_edit_box'),
                __new_title = __title_edit_box.value,
                __win_type_class_title = null,
                __title_width = utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__bee_id).style.width) - 100,
                __title_div = document.createElement('div'),
                __pencil_div = document.createElement('div'),
                __handler = null;

            __ctrl_bar.removeChild(__title_edit_box);

            if (self.settings.general.type() === 2)
                __win_type_class_title = 'widget_title';
            else
                __win_type_class_title = 'box_title';

            __title_div.setAttribute('id', ui_config.window.control_bar.ids.title);
            __title_div.setAttribute('class', 'title ' + __win_type_class_title);
            __title_div.setAttribute('style', 'width: ' + __title_width + 'px');

            __title_div.innerHTML = __new_title;

            __pencil_div.setAttribute('id', ui_config.window.control_bar.ids.pencil);
            __pencil_div.setAttribute('class', 'pencil');

            __ctrl_bar.appendChild(__title_div);
            __ctrl_bar.appendChild(__pencil_div);

            __handler = function(event) { event.preventDefault(); };
            utils_sys.events.attach(__bee_id, utils_sys.objects.by_id(ui_config.window.control_bar.id), 'mousedown', __handler);

            __handler = function(event) { self.gui.actions.edit_title(event); };
            utils_sys.objects.by_id(ui_config.window.control_bar.ids.pencil).onmousedown = __handler;

            self.settings.data.window.labels.title(__new_title);

            bee_statuses.title_on_edit(false);

            return true;
        };

        this.draw = function(bee_object)
        {
            var __swarm_object = utils_sys.objects.by_id(swarm.settings.id()),
                __dynamic_object = null,
                __bee_id = bee_object.settings.general.id(),
                __bee_settings = bee_object.settings,
                __bee_gui = bee_object.gui,
                __z_index = swarm.status.z_index(),
                __marquee_class = '',
                __html = null,
                __handler = null;

            if (__swarm_object === null)
                return false;

            if (self.gui.size.width() > swarm.settings.right() || self.gui.size.height() > swarm.settings.bottom())
                return false;

            ui_config.window.id = __bee_id;
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
            ui_config.window.menu.class = 'menu ' + ui_config.window.menu.id;

            ui_config.window.content.id = ui_config.window.id + '_content';
            ui_config.window.content.ids.data = ui_config.window.id + '_data';
            ui_config.window.content.classes.container = 'content ' + ui_config.window.content.id;
            ui_config.window.content.classes.data = 'data ' + ui_config.window.content.ids.data;

            ui_config.window.status_bar.id = ui_config.window.id + '_status_bar';
            ui_config.window.status_bar.ids.message = ui_config.window.id + '_msg';
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

            if (self.settings.general.type() === 1 || self.settings.actions.can_resize.widget())
            {
                ui_config.window.status_bar.ids.resize = ui_config.window.id + '_resize';
                ui_config.window.status_bar.classes.resize = 'resize ' + ui_config.window.status_bar.ids.resize;
            }

            if (self.settings.general.type() === 1)
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

            if (__bee_settings.data.window.labels.status_bar().length * 7 > __bee_gui.size.width())
                __marquee_class = 'marquee';

            __html = '<div id="' + ui_config.window.control_bar.id + '" class="' + ui_config.window.control_bar.classes.container + '">' + 
                     '    <div id="' + ui_config.window.control_bar.ids.icon + '" class="' + ui_config.window.control_bar.classes.icon + '"></div>' + 
                     '    <div id="' + ui_config.window.control_bar.ids.title + '" class="' + ui_config.window.control_bar.classes.title + '">' + 
                            __bee_settings.data.window.labels.title() + 
                     '    </div>';

            if (self.settings.actions.can_edit_title())
                __html += '    <div id="' + ui_config.window.control_bar.ids.pencil + '" class="' + ui_config.window.control_bar.classes.pencil + '"></div>';

            if (self.settings.actions.can_close())
                __html += '    <div id="' + ui_config.window.control_bar.ids.close + '" class="' + ui_config.window.control_bar.classes.close + '"></div>';

            if (self.settings.actions.can_edit_title() && self.settings.actions.can_close())
                __html += '    <div id="' + ui_config.window.control_bar.ids.separator + '" class="' + ui_config.window.control_bar.classes.separator + '"></div>';

            __html += '</div>';

            if (self.settings.actions.can_use_menu())
            {
                __html += '<div id="' + ui_config.window.menu.id + '" class="' + ui_config.window.menu.class + '">' + 
                          '    <div id="' + ui_config.window.menu.id + '_put_to_stack" class="menu_option put_to_stack ' + 
                                            ui_config.window.menu.id + '_put_to_stack">Put to stack</div>' + 
                          '    <div id="' + ui_config.window.menu.id + '_mini_mode" class="menu_option mini_mode ' + 
                                            ui_config.window.menu.id + '_mini_mode">Mini mode</div>' + 
                          '    <div id="' + ui_config.window.menu.id + '_max_mode" class="menu_option max_mode ' + 
                                            ui_config.window.menu.id + '_max_mode">Max mode</div>' + 
                          '    <div id="' + ui_config.window.menu.id + '_manage_casement" class="menu_option manage_casement ' + 
                                            ui_config.window.menu.id + '_manage_casement">Deploy casement</div>' + 
                          '    <div id="' + ui_config.window.menu.id + '_send_to_desktop" class="menu_option send_to_desktop ' + 
                                            ui_config.window.menu.id + '_minimize">Send to desktop...</div>' + 
                          '    <div id="' + ui_config.window.menu.id + '_close" class="menu_option menu_close ' + 
                                            ui_config.window.menu.id + '_close">Close</div>' + 
                          '</div>';
            }

            __html += '<div id="' + ui_config.window.content.id + '" class="' + ui_config.window.content.classes.container + '">' + 
                      '    <div id="' + ui_config.window.content.ids.data + '" class="' + ui_config.window.content.classes.data + '">' + 
                                        __bee_settings.data.window.content() + '</div>' + 
                      '</div>' + 
                      '<div id="' + ui_config.window.status_bar.id + '" class="' + ui_config.window.status_bar.classes.container + '">' + 
                      '    <div id="' + ui_config.window.status_bar.ids.message + '" class="' + 
                                        ui_config.window.status_bar.classes.message + '">' + 
                      '      <div class="' + __marquee_class + '">' + __bee_settings.data.window.labels.status_bar() + '</div>' + 
                      '    </div>';

            if (self.settings.general.type() === 1 || self.settings.actions.can_resize.widget())
                __html += '    <div id="' + ui_config.window.status_bar.ids.resize + '" class="' + 
                                            ui_config.window.status_bar.classes.resize + '"></div>';

            __html += '</div>';

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', ui_config.window.id);
            __dynamic_object.setAttribute('class', ui_config.window.class);

            __dynamic_object.style.opacity = '1.0';
            __dynamic_object.style.display = 'block';

            if (self.gui.fx.enabled.fade.into())
                __dynamic_object.style.display = 'none';

            if (bee_statuses.in_hive())
            {
                __dynamic_object.style.display = 'none';

                bee_events_scheduler.execute('system', 'in_hive');
            }

            __dynamic_object.style.left = __bee_gui.position.left() + 'px';
            __dynamic_object.style.top = __bee_gui.position.top() + 'px';
            __dynamic_object.style.width = __bee_gui.size.width() + 'px';
            __dynamic_object.style.height = __bee_gui.size.height() + 'px';

            __dynamic_object.innerHTML = __html;

            utils_sys.objects.by_id(swarm.settings.id()).appendChild(__dynamic_object);

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

            utils_sys.objects.by_id(swarm.settings.id()).appendChild(__dynamic_object);

            bee_statuses.open(true);

            bee_events_scheduler.execute('gui', 'open');

            bee_events_scheduler.execute('key', 'keydown');
            bee_events_scheduler.execute('key', 'keyup');
            bee_events_scheduler.execute('key', 'keypress');

            bee_events_scheduler.execute('mouse', 'click');
            bee_events_scheduler.execute('mouse', 'dblclick');
            bee_events_scheduler.execute('mouse', 'mousedown');
            bee_events_scheduler.execute('mouse', 'mouseup');
            bee_events_scheduler.execute('mouse', 'mouseover');
            bee_events_scheduler.execute('mouse', 'mouseout');
            bee_events_scheduler.execute('mouse', 'mousemove');

            __handler = function(event) { __bee_gui.actions.menu.close(event); };
            utils_sys.events.attach(__bee_id, document, 'mousedown', __handler);

            __handler = function(event) { __bee_gui.actions.release(event); };
            utils_sys.events.attach(__bee_id, document, 'mouseup', __handler);

            __handler = function(event) { __bee_gui.keys.get(event); };
            utils_sys.events.attach(__bee_id, __swarm_object, 'keydown', __handler);

            __handler = function() { bee_statuses.key_pressed(false); };
            utils_sys.events.attach(__bee_id, __swarm_object, 'keyup', __handler);

            __handler = function(event) { __bee_gui.actions.dresize(event); };
            utils_sys.events.attach(__bee_id, __swarm_object, 'mousemove', __handler);

            __handler = function(event) { __bee_gui.actions.hover.into(event); };
            utils_sys.objects.by_id(__bee_id).onmouseover = __handler;

            __handler = function(event) { __bee_gui.actions.hover.out(event); };
            utils_sys.objects.by_id(__bee_id).onmouseout = __handler;

            __handler = function(event) { me.coords(event, 1); };
            utils_sys.objects.by_id(__bee_id).onmousemove = __handler;

            __handler = function() { __bee_gui.actions.touch(); };
            utils_sys.objects.by_id(__bee_id).onmousedown = __handler;

            __handler = function(event) { me.coords(event, 2); me.manage_drag_status(); };
            utils_sys.objects.by_id(ui_config.window.control_bar.id).onmousedown = __handler;

            __handler = function(event)
                        {
                            self.settings.actions.can_drag.enabled(false);

                            last_mouse_button_clicked = event.buttons;
                        };
            utils_sys.objects.by_id(ui_config.window.control_bar.ids.icon).onmousedown = __handler;

            __handler = function(event) { __bee_gui.actions.menu.open(event); };
            utils_sys.objects.by_id(ui_config.window.control_bar.ids.icon).onmouseup = __handler;

            if (self.settings.actions.can_edit_title())
            {
                __handler = function(event) { __bee_gui.actions.edit_title(event); };
                utils_sys.objects.by_id(ui_config.window.control_bar.ids.pencil).onmousedown = __handler;
            }

            if (self.settings.actions.can_close())
            {
                __handler = function(event) { __bee_gui.actions.close(event); };
                utils_sys.objects.by_id(ui_config.window.control_bar.ids.close).onmousedown = __handler;
            }

            if (self.settings.actions.can_use_menu())
            {
                if (self.settings.actions.can_deploy_casement())
                {
                    __handler = function(event) { me.manage_casement(event); };
                    utils_sys.objects.by_id(ui_config.window.menu.id + '_manage_casement').onmousedown = __handler;
                }

                if (self.settings.actions.can_close())
                {
                    __handler = function(event) { __bee_gui.actions.close(event); };
                    utils_sys.objects.by_id(ui_config.window.menu.id + '_close').onmousedown = __handler;
                }
            }

            if (!self.settings.actions.can_select_text())
            {
                __handler = function() { return false; };
                utils_sys.objects.by_id(ui_config.window.content.ids.data).onselectstart = __handler;

                __handler = function(event) { event.preventDefault(); };
                utils_sys.objects.by_id(ui_config.window.content.ids.data).onmousedown = __handler;
            }

            if (self.settings.general.type() === 1 || self.settings.actions.can_resize.widget())
            {
                __handler = function(event)
                            {
                                me.coords(event, 2);

                                bee_statuses.resize(true);
                                bee_events_scheduler.execute('gui', 'resize');
                            };
                utils_sys.objects.by_id(ui_config.window.status_bar.ids.resize).onmousedown = __handler;
            }

            __handler = function() { return false; };
            utils_sys.objects.by_id(ui_config.window.control_bar.id).onselectstart = __handler;
            utils_sys.objects.by_id(ui_config.window.status_bar.id).onselectstart = __handler;

            __handler = function(event) { event.preventDefault(); };
            utils_sys.events.attach(__bee_id, utils_sys.objects.by_id(ui_config.window.control_bar.id), 'mousedown', __handler);
            utils_sys.objects.by_id(ui_config.window.status_bar.id).onmousedown = __handler;

            __handler = function(event) { __bee_gui.actions.hover.into(event); };
            utils_sys.objects.by_id(ui_config.casement.id).onmouseover = __handler;

            __handler = function(event) { __bee_gui.actions.hover.out(event); };
            utils_sys.objects.by_id(ui_config.casement.id).onmouseout = __handler;

            __handler = function(event) { me.coords(event, 1); };
            utils_sys.objects.by_id(ui_config.casement.id).onmousemove = __handler;

            __handler = function() { __bee_gui.actions.touch(); };
            utils_sys.objects.by_id(ui_config.casement.id).onmousedown = __handler;

            utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = __bee_gui.size.width() - 100 + 'px';
            utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = __bee_gui.size.height() - 88 + 'px';

            if (self.settings.general.type() === 2 && !self.settings.actions.can_resize.widget())
                utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = __bee_gui.size.width() - 22 + 'px';
            else
                utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = __bee_gui.size.width() - 50 + 'px';

            if (self.settings.general.type() === 1 || self.settings.actions.can_resize.widget())
            {
                utils_sys.objects.by_id(ui_config.window.status_bar.ids.resize).style.width = 19 + 'px';
                utils_sys.objects.by_id(ui_config.window.status_bar.ids.resize).style.height = 19 + 'px';
            }

            if (self.settings.general.topmost()) // BUGGY: Needs work...
            {
                var __top_z_index = 2147400000 + __z_index;

                swarm.settings.z_index(__z_index + 2);
                __bee_gui.position.z_index(__top_z_index);

                me.set_z_index(__top_z_index);
            }
            else
            {
                swarm.settings.z_index(__z_index + 2);
                __bee_gui.position.z_index(__z_index + 2);

                me.set_z_index(__z_index);
            }

            bee_statuses.open(false);
            bee_statuses.opened(true);

            bee_events_scheduler.execute('gui', 'opened');

            return true;
        };

        this.remove_bee = function()
        {
            var __swarm_div = utils_sys.objects.by_id(swarm.settings.id()),
                __bee = utils_sys.objects.by_id(self.settings.general.id()),
                __casement = utils_sys.objects.by_id(ui_config.casement.id);

            __swarm_div.removeChild(__bee);
            __swarm_div.removeChild(__casement);

            return true;
        };

        this.is_lonely_bee = function(bee_id)
        {
            var __swarm_bees = swarm.bees.list(),
                __hive_bees = matrix.get('hive').status.bees.list();

            for (var i = 0; i < __swarm_bees.length; i++)
            {
                if (__swarm_bees[i] === bee_id)
                    return false;
            }

            for (var bees_list in __hive_bees)
            {
                for (var i = 0; i < bees_list.length; i++)
                {
                    if (bees_list[i] === bee_id)
                        return false;
                }
            }

            return true;
        };

        this.set_z_index = function(z_index)
        {
            utils_sys.objects.by_id(self.settings.general.id()).style.zIndex = z_index + 2;
            utils_sys.objects.by_id(ui_config.casement.id).style.zIndex = z_index + 1;

            return true;
        };

        this.status_init = function()
        {
            bee_statuses = new supported_statuses();

            return true;
        };

        this.last_mouse_button = function()
        {
            return last_mouse_button_clicked;
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

    function events_status_settings_object()
    {
        function system()
        {
            this.running = false;
            this.active = false;
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

    function supported_events()
    {
        var __events_settings = new events_status_settings_object();

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

        this.running = function(val)
        {
            return validate('running', 'system', val);
        };

        this.active = function(val)
        {
            return validate('active', 'system', val);
        };

        this.in_hive = function(val)
        {
            return validate('in_hive', 'system', val);
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

        this.resize_enabled = function(val)
        {
            return validate('resize_enabled', 'gui', val);
        };

        this.key_pressed = function(val)
        {
            return validate('key_pressed', 'gui', val);
        };

        this.mouse_clicked = function(val)
        {
            return validate('mouse_clicked', 'gui', val);
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

        var __status_settings = new events_status_settings_object();
    }

    function events_scheduler()
    {
        function events_queue_object()
        {
            function event_object()
            {
                this.id = null;
                this.cmd = null;
            }

            function context_object()
            {
                this.id = null;
                this.events = [];
            }

            function contexts_list_object()
            {
                var __contexts = [],
                    __loops = 0;

                this.exists = function(context_id)
                {
                    __loops = __contexts.length;

                    for (var i = 0; i < __loops; i++)
                    {
                        if (__contexts[i].id === context_id)
                            return true;
                    }

                    return false;
                };

                this.insert = function(context_object)
                {
                    __contexts.push(context_object);

                    return true;
                };

                this.append = function(context_id, event_object)
                {
                    __loops = __contexts.length;

                    for (var i = 0; i < __loops; i++)
                    {
                        if (__contexts[i].id === context_id)
                        {
                            __contexts[i].events.push(event_object);

                            return true;
                        }
                    }

                    return false;
                };

                this.call = function(context_id, event_id)
                {
                    __loops = __contexts.length;

                    for (var i = 0; i < __loops; i++)
                    {
                        if (__contexts[i].id === context_id)
                        {
                            var __inner_loops = __contexts[i].events.length;

                            for (var j = 0; j < __inner_loops; j++)
                            {
                                if (__contexts[i].events[j].id === event_id)
                                {
                                    if (context_id === 'mouse' || context_id === 'key')
                                    {
                                        var __bee_id = self.settings.general.id(),
                                            __bee_id_dom = utils_sys.objects.by_id(__bee_id);

                                        utils_sys.events.attach(__bee_id, __bee_id_dom, event_id, __contexts[i].events[j].cmd);

                                        bee_statuses[event_id](true);

                                        return true;
                                    }

                                    return __contexts[i].events[j].cmd.call();
                                }
                            }
                        }
                    }

                    return false;
                };
            }

            var __contexts_list = new contexts_list_object();

            this.include = function(this_context, this_event, cmd)
            {
                var __new_event = new event_object();

                __new_event.id = this_event;
                __new_event.cmd = cmd;

                if (__contexts_list.exists(this_context))
                    __contexts_list.append(this_context, __new_event);
                else
                {
                    var __new_context = new context_object();

                    __new_context.id = this_context;
                    __new_context.events.push(__new_event);

                    __contexts_list.insert(__new_context);
                }

                return true;
            };

            this.run = function(this_context, this_event)
            {
                return __contexts_list.call(this_context, this_event);
            };
        }

        var __events_queue = new events_queue_object();

        this.store = function(this_context, this_event, cmd)
        {
            return __events_queue.include(this_context, this_event, cmd);
        };

        this.execute = function(this_context, this_event)
        {
            var __result;

            __result = __events_queue.run(this_context, this_event);

            return __result;
        };
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

            var new_drone = new drone_object();

            new_drone.name = new_func_name;
            new_drone.code = new_func_code;

            __drones.push(new_drone);

            return true;
        };

        this.run = function(existing_func_name, dynamic_func_args)
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

                    __dynamic_func.apply(this, dynamic_func_args);

                    return true;
                }
            }

            return false;
        };
    }

    function settings()
    {
        function general()
        {
            var __app_id = null,
                __dynamic_id = null,
                __type = 0,
                __desktop_id = 0,
                __single_instance = false,
                __topmost = false,
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
                    return __dynamic_id;

                if (bee_statuses.running())
                    return false;

                if (utils_sys.validation.alpha.is_symbol(val))
                    return false;

                __app_id = val;
                __dynamic_id = val + '_app_' + random.generate();

                bee_statuses.id_changed(true);

                bee_events_scheduler.execute('system', 'id_changed');

                bee_statuses.id_changed(false);

                return true;
            };

            this.type = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __type;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.numerics.is_integer(val) || val < 1 || val > 2)
                    return false;

                __type = val;

                bee_statuses.type_changed(true);

                bee_events_scheduler.execute('system', 'type_changed');

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

                bee_events_scheduler.execute('system', 'desktop_changed');

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

            this.topmost = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return __topmost;

                if (bee_statuses.running())
                    return false;

                if (!utils_sys.validation.misc.is_bool(val))
                    return false;

                __topmost = val;

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
                    bee_events_scheduler.execute('system', 'in_hive');

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
                this.can_deploy_casement = true;
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

            this.can_deploy_casement = function(val)
            {
                return validate(1, 'can_deploy_casement', null, val);
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

                    if (!utils_sys.objects.by_id(ui_config.window.content.ids.data))
                        return false;

                    utils_sys.objects.by_id(ui_config.window.content.ids.data).innerHTML = val;

                    bee_statuses.content_changed(true);

                    bee_events_scheduler.execute('gui', 'content_changed');

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

                        if (!utils_sys.objects.by_id(ui_config.window.control_bar.ids.title))
                            return false;

                        utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).innerHTML = val;

                        bee_statuses.title_changed(true);

                        bee_events_scheduler.execute('gui', 'title_changed');

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

                        if (!utils_sys.objects.by_id(ui_config.window.status_bar.ids.message))
                            return false;

                        utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).childNodes[1].innerHTML = val;

                        bee_statuses.status_bar_label_changed(true);

                        bee_events_scheduler.execute('gui', 'status_bar_label_changed');

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

                    if (!utils_sys.objects.by_id(ui_config.casement.ids.data))
                        return false;

                    utils_sys.objects.by_id(ui_config.casement.ids.data).innerHTML = val;

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

                        if (!utils_sys.objects.by_id(ui_config.casement.ids.title))
                            return false;

                        utils_sys.objects.by_id(ui_config.casement.ids.title).innerHTML = val;

                        return true;
                    };

                    this.status = function(val)
                    {
                        if (is_init === false)
                            return false;

                        if (utils_sys.validation.misc.is_undefined(val))
                            return __status;

                        __status = val;

                        if (!utils_sys.objects.by_id(ui_config.casement.ids.status))
                            return false;

                        utils_sys.objects.by_id(ui_config.casement.ids.status).innerHTML = val;

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
                    __close = '',
                    __resize = '';

                this.title = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __title;

                    __title = val;

                    // TODO: Add hints

                    return true;
                };

                this.content = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __content;

                    __content = val;

                    // TODO: Add hints

                    return true;
                };

                this.status_bar = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __status_bar;

                    __status_bar = val;

                    // TODO: Add hints

                    return true;
                };

                this.icon = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __icon;

                    __icon = val;

                    // TODO: Add hints

                    return true;
                };

                this.close = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __close;

                    __close = val;

                    // TODO: Add hints

                    return true;
                };

                this.resize = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                        return __resize;

                    __resize = val;

                    // TODO: Add hints

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

    function gui()
    {
        var me = this;

        function keys()
        {
            this.get = function(event_object)
            {
                if (is_init === false)
                    return false;

                bee_statuses.key_pressed(true);

                bee_events_scheduler.execute('gui', 'key_pressed');

                if (utils_sys.validation.misc.is_undefined(event_object.keyCode))
                    return event_object.key;
                else
                    return event_object.keyCode;
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
                var __new_pos = parseInt(position + (position * Math.random()), 10);

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
                    return false;

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
                            return false;
                    }
                }
                else if (limit === 'left' || limit === 'top')
                {
                    if (val <= __position_settings.limits[limit])
                        return false;
                }
                else
                {
                    if (limit === 'z_index')
                    {
                        if (val > __position_settings.limits[limit])
                            return false;
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

                if (!bee_statuses.running() && __is_static === false)
                    __alt_val = randomize_pos(val);

                return validate(1, 'left', 'right', __alt_val);
            };

            this.top = function(val)
            {
                var __alt_val = val;

                if (!bee_statuses.running() && __is_static === false)
                    __alt_val = randomize_pos(val);

                return validate(1, 'top', 'bottom', __alt_val);
            };

            this.z_index = function(val)
            {
                return validate(1, 'z_index', 'z_index', val);
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
                    this.width = window.innerWidth;
                    this.height = window.innerHeight;
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
                    return false;

                if (mode === 1)
                {
                    if (type === 1)
                    {
                        if (val < me.size.min.width() || val > me.size.max.width())
                            return false;
                    }
                    else if (type === 2)
                    {
                        if (val < me.size.min.height() || val > me.size.max.height())
                            return false;
                    }
                }
                else if (mode === 2)
                {
                    if (type === 1)
                    {
                        if (val < me.size.min.width() || val > me.size.width())
                            return false;
                    }
                    else if (type === 2)
                    {
                        if (val < me.size.min.height() || val > me.size.height())
                            return false;
                    }
                }
                else if (mode === 3)
                {
                    if (type === 1)
                    {
                        if (val < me.size.width())
                            return false;
                    }
                    else if (type === 2)
                    {
                        if (val < me.size.height())
                            return false;
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

                this.all = function(val)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(val))
                    {
                        if (__opacity_enabled === true && 
                            __fade_settings.fade_in_enabled === true && __fade_settings.fade_out_enabled === true)
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

                        return settings.opacity;
                    };

                    this.set = function(val)
                    {
                        if (is_init === false)
                            return false;

                        if (!utils_sys.validation.numerics.is_float(val) || val < 0.0 || val > 1.0)
                            return false;

                        me.fx.enabled.opacity(true);

                        settings.opacity = val;

                        bee_statuses.opacity_changed(true);

                        bee_events_scheduler.execute('gui', 'opacity_changed');

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

                    gfx.opacity.apply(self.settings.general.id(), settings.opacity);
                    gfx.opacity.apply(ui_config.casement.id, settings.opacity);

                    return true;
                };

                this.reset = function()
                {
                    if (is_init === false)
                        return false;

                    if (!me.fx.enabled.opacity())
                        return false;

                    me.fx.enabled.opacity(false);

                    gfx.opacity.reset(self.settings.general.id());
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

                        bee_events_scheduler.execute('gui', __fading_type);

                        gfx.fade[type](self.settings.general.id(), me.fx.fade.settings[type].get.last(1), 
                                       me.fx.fade.settings[type].get.last(2), me.fx.fade.settings[type].get.last(3), 
                                       function()
                                       {
                                            bee_statuses[__fading_type](false);
                                            bee_statuses[__fading_type + '_finished'](true);

                                            bee_events_scheduler.execute('gui', __fading_type + '_finished');
                                       });
                        return true;
                    }
                    else if (mode === 3)
                    {
                        me.fx.enabled.fade[type](true);

                        settings.fade[type].step = ssd_array[0];
                        settings.fade[type].speed = ssd_array[1];
                        settings.fade[type].delay = ssd_array[2];
                    }
                    else if (mode === 4)
                    {
                        var i = 0,
                            __loops = 0;

                        if (!me.fx.enabled.fade[type]())
                            return false;

                        if (!__fade_batch_array.length)
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

                        if (!__fade_batch_array.length)
                            return false;

                        if (!utils_sys.validation.numerics.is_integer(option) || option < 1 || option > 3)
                            return false;

                        if (option === 1)
                            return settings.fade[type].step;

                        else if (option === 2)
                            return settings.fade[type].speed;

                        else
                            return settings.fade[type].delay;
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

                        settings.fade[type].step = ssd_array[0];
                        settings.fade[type].speed = ssd_array[1];
                        settings.fade[type].delay = ssd_array[2];

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

            var settings = new fx_settings();

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

                    if (event_object.buttons === 0 && utils_int.last_mouse_button() === 1)
                    {
                        gfx.visibility.toggle(ui_config.window.menu.id, 1);

                        bee_statuses.menu_activated(true);

                        self.settings.actions.can_drag.enabled(true);

                        bee_events_scheduler.execute('gui', 'menu_activated');

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
                        gfx.animation.roll(ui_config.casement.id, 1, 'right', __casement_width, 0, __speed, __step,
                        function()
                        {
                            bee_statuses.casement_deployed(true);

                            __is_animating = false;

                            execute_commands(callback);
                        });

                        return true;
                    }

                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object) || 
                        !utils_sys.validation.misc.is_undefined(callback) && !utils_sys.validation.misc.is_function(callback))
                        return false;

                    if (__is_animating === true || !self.settings.actions.can_deploy_casement())
                        return false;

                    var __pos_x = me.position.left(),
                        __casement = utils_sys.objects.by_id(ui_config.casement.id),
                        __casement_width = utils_sys.graphics.pixels_value(__casement.style.width),
                        __step = Math.ceil(__casement_width / 23),
                        __speed = Math.ceil(__step / 3);

                    if ((__pos_x + (__casement_width * 2)) >= swarm.settings.right())
                    {
                        msg_win = new msgbox();

                        msg_win.init('desktop');
                        msg_win.show('GreyOS', 'The casement can not be deployed here as it overflows your screen!');

                        return false;
                    }

                    __casement.style.left = __pos_x + 'px';

                    if (self.status.gui.fx.fading.into.finished())
                        animate_casement();
                    else
                        setTimeout(function() { animate_casement(); }, utils_int.animating_events.duration());

                    if (self.settings.actions.can_use_menu())
                        utils_sys.objects.by_id(ui_config.window.menu.id + '_manage_casement').innerHTML = 'Hide casement';

                    return true;
                };

                this.hide = function(event_object, callback)
                {
                    function animate_casement()
                    {
                        __is_animating = true;

                        gfx.animation.roll(ui_config.casement.id, 1, 'left', 
                        __casement_width, 0, __speed, __step, 
                        function()
                        {
                            gfx.visibility.toggle(ui_config.casement.id, 1);

                            __is_animating = false;

                            bee_statuses.casement_deployed(false);

                            execute_commands(callback);
                        });
                    }

                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object) || 
                        !utils_sys.validation.misc.is_undefined(callback) && !utils_sys.validation.misc.is_function(callback))
                        return false;

                    if (__is_animating === true)
                        return false;

                    var __casement = utils_sys.objects.by_id(ui_config.casement.id),
                        __casement_width = utils_sys.graphics.pixels_value(__casement.style.width),
                        __step = Math.ceil(__casement_width / 23),
                        __speed = Math.ceil(__step / 3);

                    if (!bee_statuses.casement_deployed())
                        execute_commands(callback);
                    else
                        animate_casement();

                    if (self.settings.actions.can_use_menu())
                        utils_sys.objects.by_id(ui_config.window.menu.id + '_manage_casement').innerHTML = 'Deploy casement';

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

                    bee_statuses.active(true);

                    bee_events_scheduler.execute('system', 'active');

                    if (!swarm.status.active_bee())
                        swarm.settings.active_bee(self.settings.general.id());

                    return true;

                };

                this.out = function(event_object)
                {
                    if (is_init === false)
                        return false;

                    if (utils_sys.validation.misc.is_undefined(event_object))
                        return false;

                    if (!bee_statuses.dragging())
                    {
                        bee_statuses.active(false);

                        swarm.settings.active_bee(null);
                    }

                    return true;
                };
            }

            this.edit_title = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object) || bee_statuses.close())
                    return false;

                if (event_object.buttons === 1)
                {
                    utils_int.edit_win_title();

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

                function remove_me(this_object)
                {
                    var __bee_id = self.settings.general.id(),
                        __swarm_object = utils_sys.objects.by_id(swarm.settings.id()),
                        __honeycomb_id = hive.status.bees.honeycomb_id(__bee_id);

                    utils_sys.events.detach(__bee_id, __swarm_object, 'keydown');
                    utils_sys.events.detach(__bee_id, __swarm_object, 'keyup');
                    utils_sys.events.detach(__bee_id, __swarm_object, 'mousemove');
                    utils_sys.events.detach(__bee_id, document, 'mousedown');
                    utils_sys.events.detach(__bee_id, document, 'mouseup');

                    bee_events_scheduler.execute('gui', 'closed');

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

                if (event_object === null || event_object.buttons === 1 && bee_statuses.opened() && !bee_statuses.close())
                {
                    var __bee_id = self.settings.general.id(),
                        __app_id = self.settings.general.app_id();

                    if (!self.settings.actions.can_close())
                        return false;

                    bee_statuses.close(true);
                    bee_statuses.dragging(false);

                    self.gui.actions.casement.hide(event_object, 
                    function()
                    {
                        bee_events_scheduler.execute('gui', 'close');

                        if (utils_int.animating_events.in_progress())
                            setTimeout(function() { remove_me(self); }, utils_int.animating_events.duration());
                        else
                            remove_me(self);
                    });

                    owl.status.set(__bee_id, __app_id, 'END');

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

                    bee_events_scheduler.execute('gui', 'minimize');

                    // TODO: Call Hive

                    bee_events_scheduler.execute('gui', 'minimized');

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

                    bee_events_scheduler.execute('gui', 'restore');

                    // TODO: Call Hive

                    bee_events_scheduler.execute('gui', 'restored');

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

                    bee_events_scheduler.execute('gui', 'maximize');

                    // TODO: Call Hive

                    bee_events_scheduler.execute('gui', 'maximized');

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
                me.position.z_index(__z_index + 2);

                utils_int.set_z_index(__z_index);

                return true;
            };

            this.touch = function()
            {
                if (is_init === false)
                    return false;

                if (bee_statuses.fading_in() || bee_statuses.fading_out() || bee_statuses.close())
                    return false;

                var __z_index = swarm.status.z_index();

                bee_statuses.touch(true);
                bee_statuses.touched(false);

                bee_statuses.active(true);

                bee_events_scheduler.execute('system', 'active');
                bee_events_scheduler.execute('gui', 'touch');

                if (self.settings.general.topmost())
                    return true;

                swarm.settings.z_index(__z_index + 2);
                me.position.z_index(__z_index + 2);

                utils_int.set_z_index(__z_index);

                return true;
            };

            this.dresize = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object) || bee_statuses.title_on_edit() || bee_statuses.close())
                    return false;

                var __bee_id = self.settings.general.id(),
                    __current_width = utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__bee_id).style.width),
                    __current_height = utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__bee_id).style.height),
                    __casement_width = utils_sys.graphics.pixels_value(utils_sys.objects.by_id(ui_config.casement.id).style.width),
                    __dynamic_casement_width = 0,
                    __dynamic_right_pos = 0;

                if (event_object.buttons === 1 && bee_statuses.drag() && self.settings.actions.can_drag.enabled())
                {
                    var __pos_x = 0,
                        __pos_y = 0;

                    bee_statuses.mouse_clicked(true);
                    bee_statuses.dragging(true);

                    if (bee_statuses.casement_deployed())
                        __dynamic_casement_width = __casement_width + 2;

                    __pos_x = me.position.left() + (swarm.area.mouse.x() - me.mouse.relative.x());
                    __pos_y = me.position.top() + (swarm.area.mouse.y() - me.mouse.relative.y());

                    if (__pos_x <= 0 && __pos_y <= 0)
                    {
                        utils_sys.objects.by_id(__bee_id).style.left = '0px';
                        utils_sys.objects.by_id(__bee_id).style.top = '0px';

                        utils_sys.objects.by_id(ui_config.casement.id).style.left = __dynamic_casement_width + 'px';
                        utils_sys.objects.by_id(ui_config.casement.id).style.top = '0px';
                    }
                    else
                    {
                        if (__pos_x <= 0)
                        {
                            utils_sys.objects.by_id(__bee_id).style.left = '0px';
                            utils_sys.objects.by_id(__bee_id).style.top = __pos_y + 'px';

                            utils_sys.objects.by_id(ui_config.casement.id).style.left = __dynamic_casement_width + 'px';
                            utils_sys.objects.by_id(ui_config.casement.id).style.top = __pos_y + 'px';
                        }

                        if (__pos_y <= 0)
                        {
                            utils_sys.objects.by_id(__bee_id).style.left = __pos_x + 'px';
                            utils_sys.objects.by_id(__bee_id).style.top = '0px';

                            utils_sys.objects.by_id(ui_config.casement.id).style.left = __pos_x + __dynamic_casement_width + 'px';
                            utils_sys.objects.by_id(ui_config.casement.id).style.top = '0px';
                        }
                    }

                    if (((__pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x()) >= 
                         (swarm.settings.right() - swarm.area.mouse.x())) && 
                        ((__pos_y + __current_height - swarm.area.mouse.y()) >= 
                         (swarm.settings.bottom() - swarm.area.mouse.y())))
                    {
                        utils_sys.objects.by_id(__bee_id).style.left = 
                        swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
                        utils_sys.objects.by_id(__bee_id).style.top = 
                        swarm.settings.bottom() - __current_height + 'px';

                        utils_sys.objects.by_id(ui_config.casement.id).style.left = 
                        swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
                        utils_sys.objects.by_id(ui_config.casement.id).style.top = 
                        swarm.settings.bottom() - __current_height + 'px';
                    }
                    else
                    {
                        if ((__pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x()) >= 
                            (swarm.settings.right() - swarm.area.mouse.x()))
                        {
                            if (__pos_y <= 0)
                            {
                                utils_sys.objects.by_id(__bee_id).style.left = 
                                swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
                                utils_sys.objects.by_id(__bee_id).style.top = '0px';

                                utils_sys.objects.by_id(ui_config.casement.id).style.left = 
                                swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
                                utils_sys.objects.by_id(ui_config.casement.id).style.top = '0px';
                            }
                            else
                            {
                                utils_sys.objects.by_id(__bee_id).style.left = 
                                swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
                                utils_sys.objects.by_id(__bee_id).style.top = __pos_y + 'px';

                                utils_sys.objects.by_id(ui_config.casement.id).style.left = 
                                swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
                                utils_sys.objects.by_id(ui_config.casement.id).style.top = __pos_y + 'px';
                            }
                        }

                        if ((__pos_y + __current_height - swarm.area.mouse.y()) >= 
                            (swarm.settings.bottom() - swarm.area.mouse.y()))
                        {
                            if (__pos_x <= 0)
                            {
                                utils_sys.objects.by_id(__bee_id).style.left = '0px';
                                utils_sys.objects.by_id(__bee_id).style.top = 
                                swarm.settings.bottom() - __current_height + 'px';

                                utils_sys.objects.by_id(ui_config.casement.id).style.left = __dynamic_casement_width + 'px';
                                utils_sys.objects.by_id(ui_config.casement.id).style.top = swarm.settings.bottom() - __current_height + 'px';
                            }
                            else
                            {
                                utils_sys.objects.by_id(__bee_id).style.left = __pos_x + 'px';
                                utils_sys.objects.by_id(__bee_id).style.top = 
                                swarm.settings.bottom() - __current_height + 'px';

                                utils_sys.objects.by_id(ui_config.casement.id).style.left = __pos_x + __dynamic_casement_width + 'px';
                                utils_sys.objects.by_id(ui_config.casement.id).style.top = swarm.settings.bottom() - __current_height + 'px';
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
                        utils_sys.objects.by_id(__bee_id).style.left = __pos_x + 'px';
                        utils_sys.objects.by_id(__bee_id).style.top = __pos_y + 'px';

                        utils_sys.objects.by_id(ui_config.casement.id).style.left = __pos_x + __dynamic_casement_width + 'px';
                        utils_sys.objects.by_id(ui_config.casement.id).style.top = __pos_y + 'px';
                    }

                    bee_events_scheduler.execute('gui', 'mouse_clicked');
                    bee_events_scheduler.execute('gui', 'dragging');
                }
                else if (event_object.buttons === 1 && bee_statuses.resize() && self.settings.actions.can_resize.enabled() && 
                         !bee_statuses.casement_deployed())
                {
                    var __size_x = 0,
                        __size_y = 0,
                        __resize_x_offset = utils_sys.graphics.pixels_value(utils_sys.objects.by_id(ui_config.window.status_bar.ids.resize).style.width),
                        __resize_y_offset = utils_sys.graphics.pixels_value(utils_sys.objects.by_id(ui_config.window.status_bar.ids.resize).style.height),
                        __resize_title_diff = 100,
                        __resize_data_diff = 88,
                        __resize_status_msg_diff = 50;

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
                                utils_sys.objects.by_id(__bee_id).style.width = me.size.max.width() + 'px';
                                utils_sys.objects.by_id(__bee_id).style.height = me.size.max.height() + 'px';

                                utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = 
                                me.size.max.width() - __resize_title_diff + 'px';

                                utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = 
                                me.size.max.height() - __resize_data_diff + 'px';

                                utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = 
                                me.size.max.width() - __resize_status_msg_diff + 'px';

                                utils_sys.objects.by_id(ui_config.casement.ids.data).style.height = 
                                me.gui.size.height() + 'px';
                            }
                        }
                        else
                        {
                            if (__new_width >= me.size.max.width())
                            {
                                if (__new_width - __size_x >= me.size.max.width())
                                {
                                    utils_sys.objects.by_id(__bee_id).style.width = me.size.max.width() + 'px';
                                    utils_sys.objects.by_id(__bee_id).style.height = __new_height + 'px';

                                    utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = 
                                    me.size.max.width() - __resize_title_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = 
                                    __new_height - __resize_data_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = 
                                    me.size.max.width() - __resize_status_msg_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.casement.ids.data).style.height = 
                                    __new_height + 'px';
                                }
                            }

                            if (__new_height >= me.size.max.height())
                            {
                                if (__new_height - __size_y >= me.size.max.height())
                                {
                                    utils_sys.objects.by_id(__bee_id).style.width = __new_width + 'px';
                                    utils_sys.objects.by_id(__bee_id).style.height =  me.size.max.height() + 'px';

                                    utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = 
                                    __new_width - __resize_title_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = 
                                    me.size.max.height() - __resize_data_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = 
                                    __new_width - __resize_status_msg_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.casement.ids.data).style.height = 
                                    me.gui.size.height() + 'px';
                                }
                            }
                        }

                        if (__new_width <= me.size.min.width() && 
                            __new_height <= me.size.min.height())
                        {
                            if (__size_x >= 0 && __size_y >= 0)
                            {
                                utils_sys.objects.by_id(__bee_id).style.width = me.size.min.width() + 'px';
                                utils_sys.objects.by_id(__bee_id).style.height = me.size.min.height() + 'px';

                                utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = 
                                me.size.min.width() - __resize_title_diff + 'px';

                                utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = 
                                me.size.min.height() - __resize_data_diff + 'px';

                                utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = 
                                me.size.min.width() - __resize_status_msg_diff + 'px';

                                utils_sys.objects.by_id(ui_config.casement.ids.data).style.height = 
                                me.gui.size.height() + 'px';
                            }
                        }
                        else
                        {
                            if (__new_width <= me.size.min.width())
                            {
                                if (__size_x >= 0)
                                {
                                    utils_sys.objects.by_id(__bee_id).style.width = me.size.min.width() + 'px';
                                    utils_sys.objects.by_id(__bee_id).style.height = __new_height + 'px';

                                    utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = 
                                    me.size.min.width() - __resize_title_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = 
                                    __new_height - __resize_data_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = 
                                    me.size.min.width() - __resize_status_msg_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.casement.ids.data).style.height = 
                                    __new_height + 'px';
                                }
                            }

                            if (__new_height <= me.size.min.height())
                            {
                                if (__size_y >= 0)
                                {
                                    utils_sys.objects.by_id(__bee_id).style.width = __new_width + 'px';
                                    utils_sys.objects.by_id(__bee_id).style.height = me.size.min.height() + 'px';

                                    utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = 
                                    __new_width - __resize_title_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = 
                                    me.size.min.height() - __resize_data_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = 
                                    __new_width - __resize_status_msg_diff + 'px';

                                    utils_sys.objects.by_id(ui_config.casement.ids.data).style.height = 
                                    me.gui.size.height() + 'px';
                                }
                            }
                        }

                        if (__new_width > me.size.min.width() && __new_height > me.size.min.height() && 
                            __new_width < me.size.max.width() && __new_height < me.size.max.height())
                        {
                            utils_sys.objects.by_id(__bee_id).style.width = __new_width + 'px';
                            utils_sys.objects.by_id(__bee_id).style.height = __new_height + 'px';

                            utils_sys.objects.by_id(ui_config.window.control_bar.ids.title).style.width = 
                            __new_width - __resize_title_diff + 'px';

                            utils_sys.objects.by_id(ui_config.window.content.ids.data).style.height = 
                            __new_height - __resize_data_diff + 'px';

                            utils_sys.objects.by_id(ui_config.window.status_bar.ids.message).style.width = 
                            __new_width - __resize_status_msg_diff + 'px';

                            utils_sys.objects.by_id(ui_config.casement.ids.data).style.height = 
                            __new_height + 'px';
                        }

                         utils_sys.objects.by_id(ui_config.casement.id).style.width = utils_sys.objects.by_id(__bee_id).style.width;
                         utils_sys.objects.by_id(ui_config.casement.id).style.height = utils_sys.objects.by_id(__bee_id).style.height;
                    }

                    if (self.settings.data.window.labels.status_bar().length * 7.0 < 
                        utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__bee_id).style.width) - 40)
                        utils_sys.objects.by_id(__bee_id + '_msg').childNodes[1].className = '';
                    else
                        utils_sys.objects.by_id(__bee_id + '_msg').childNodes[1].className = 'marquee';

                    bee_events_scheduler.execute('gui', 'mouse_clicked');
                    bee_events_scheduler.execute('gui', 'resizing');

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

                var __bee_id = self.settings.general.id();

                self.settings.actions.can_drag.enabled(true);

                if (event_object.buttons === 0 && !bee_statuses.close() && 
                    swarm.status.active_bee() === __bee_id)
                {
                    if (bee_statuses.dragging())
                        bee_statuses.dragged(true);

                    if (bee_statuses.resizing())
                        bee_statuses.resized(true);

                    bee_statuses.drag(false);
                    bee_statuses.dragging(false);
                    bee_statuses.resize(false);
                    bee_statuses.resizing(false);

                    bee_statuses.touched(true);
                    bee_statuses.touch(false);

                    bee_statuses.active(false);

                    bee_statuses.mouse_clicked(false);

                    bee_events_scheduler.execute('gui', 'touched');
                    bee_events_scheduler.execute('gui', 'dragged');
                    bee_events_scheduler.execute('gui', 'resized');

                    me.position.left(utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__bee_id).style.left));
                    me.position.top(utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__bee_id).style.top));

                    return true;
                }

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
            function size_status()
            {
                this.width = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_sys.graphics.pixels_value(utils_sys.objects.by_id(self.settings.general.id()).style.width);
                };

                this.height = function()
                {
                    if (is_init === false)
                        return false;

                    return utils_sys.graphics.pixels_value(utils_sys.objects.by_id(self.settings.general.id()).style.height);
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

            this.resize_enabled = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.resize_enabled();
            };

            this.key_pressed = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.key_pressed();
            };

            this.mouse_clicked = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mouse_clicked();
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

            this.mouseclick = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mouseclick();
            };

            this.mousedblclick = function()
            {
                if (is_init === false)
                    return false;

                return bee_statuses.mousedblclick();
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

    this.on = function(this_event, cmd)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.misc.is_undefined(this_event) || utils_sys.validation.misc.is_undefined(cmd))
            return false;

        var __contexts = new events_status_settings_object();

        for (var context in __contexts)
        {
            if (context === 'on_event')
                continue;

            if (bee_events.contains(this_event, context))
            {
                bee_events_scheduler.store(context, this_event, cmd);

                return true;
            }
        }

        return false;
    };

    this.show = function()
    {
        if (is_init === false)
            return false;
 
        var __bee_id = self.settings.general.id(),
            __app_id = self.settings.general.app_id();

        if (bee_statuses.running())
            return false;

        if (utils_int.is_lonely_bee(__bee_id))
            return false;

        if (owl.status.get.by_app_id(__app_id, 'RUN') && colony.contains(__app_id))
            return false;

        utils_int.status_init();

        bee_statuses.running(true);

        bee_events_scheduler.execute('system', 'running');

        if (!utils_int.draw(self))
        {
            owl.status.set(__bee_id, __app_id, 'FAIL');

            utils_int.log('show', 'ERROR');

            return false;
        }

        owl.status.set(__bee_id, __app_id, 'RUN');

        utils_int.log('show', 'OK');

        return true;
    };

    this.init = function(bee_id, type)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        if (!self.settings.general.id(bee_id) || !self.settings.general.type(type))
            return false;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');
        colony = cosmos.hub.access('colony');

        owl = matrix.get('owl');
        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        nature = matrix.get('nature');

        nature.theme(['bee']);
        nature.apply('new');

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        nature = null,
        owl = null,
        swarm = null,
        hive = null,
        colony = null,
        msg_win = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        gfx = new fx(),
        ui_config = new ui_config_model(),
        bee_events = new supported_events(),
        bee_statuses = new supported_statuses(),
        bee_events_scheduler = new events_scheduler(),
        utils_int = new utilities();

    this.settings = new settings();
    this.gui = new gui();
    this.drone = new drone();
    this.status = new status();
}
