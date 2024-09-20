/*
    GreyOS - Hive (Version: 4.2)

    File name: hive.js
    Description: This file contains the Hive - Bees stack bar module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Hive
function hive()
{
    var self = this;

    function mouse_coords_model()
    {
        this.mouse_x = 0;
        this.mouse_y = 0;
    }

    function stack_trace_model()
    {
        this.bee_drag = false;
        this.internal_bee_drag = false;
        this.bee_closing = false;
        this.bee_closed = false;
    }

    function honeycomb_view_model()
    {
        var __honeycombs_num = 0,
            __honeycombs_list = [],
            __visible_honeycomb = 1,
            __hc_dynamic_width = 0,
            __is_changing_stack = false;

        function honeycomb_model()
        {
            function bee_model()
            {
                var __bees_num = 0,
                    __bees_list = [];

                this.num = function()
                {
                    return __bees_num;
                };

                this.list = function(index)
                {
                    if (utils_sys.validation.misc.is_undefined(index))
                        return __bees_list;

                    if (!utils_sys.validation.numerics.is_integer(index) || index < 0)
                        return false;

                    return __bees_list[index];
                };

                this.add = function(bee_id)
                {
                    if (utils_sys.validation.alpha.is_symbol(bee_id))
                        return false;

                    if (__bees_num === self.settings.bees_per_honeycomb())
                        return false;

                    __bees_list.push(bee_id);
                    __bees_num++;

                    return true;
                };

                this.remove = function(bee_id)
                {
                    if (__bees_num === 0)
                        return false;

                    if (utils_sys.validation.alpha.is_symbol(bee_id))
                        return false;

                    for (var i = 0; i < __bees_num; i++)
                    {
                        if (__bees_list[i] === bee_id)
                        {
                            __bees_list.splice(i, 1);

                            __bees_num--;

                            return true;
                        }
                    }

                    return false;
                };

                this.clear = function()
                {
                    if (__bees_num === 0)
                        return false;

                    __bees_num = 0;
                    __bees_list = [];

                    return true;
                };
            }

            this.id = null;
            this.bees = new bee_model();
        }

        this.num = function()
        {
            return __honeycombs_num;
        };

        this.list = function(index)
        {
            if (utils_sys.validation.misc.is_undefined(index))
                return __honeycombs_list;

            if (!utils_sys.validation.numerics.is_integer(index) || index < 0)
                return false;

            return __honeycombs_list[index];
        };

        this.add = function(honeycomb_id)
        {
            if (utils_sys.validation.alpha.is_symbol(honeycomb_id))
                return false;

            var __new_honeycomb = new honeycomb_model();

            __new_honeycomb.id = honeycomb_id;

            __honeycombs_list.push(__new_honeycomb);
            __honeycombs_num++;

            utils_int.draw_honeycomb(honeycomb_id);

            return true;
        };

        this.remove = function(honeycomb_id)
        {
            if (utils_sys.validation.alpha.is_symbol(honeycomb_id))
                return false;

            for (var i = 0; i < __honeycombs_num; i++)
            {
                if (__honeycombs_list[i].id === honeycomb_id)
                {
                    __honeycombs_list.splice(i, 1);

                    __honeycombs_num--;

                    utils_int.remove_honeycomb(honeycomb_id);

                    return true;
                }
            }

            return false;
        };

        this.clear = function()
        {
            if (__honeycombs_num === 0)
                return false;

            __honeycombs_num = 0;

            __honeycombs_list = [];

            utils_int.remove_all_honeycombs();

            return true;
        };

        this.visible = function(val)
        {
            if (utils_sys.validation.misc.is_undefined(val))
                return __visible_honeycomb;

            if (!utils_int.validate_honeycomb_range(val))
                return false;

            __visible_honeycomb = val;

            return true;
        };

        this.swiping = function(val)
        {
            if (utils_sys.validation.misc.is_undefined(val))
                return __is_changing_stack;

            if (!utils_sys.validation.misc.is_bool(val))
                return null;

            __is_changing_stack = val;

            return true;
        };

        this.dynamic_width = function(val)
        {
            if (utils_sys.validation.misc.is_undefined(val))
                return __hc_dynamic_width;

            __hc_dynamic_width = val;

            return true;
        };
    }

    function utilities()
    {
        var me = this;

        this.coords = function(event_object)
        {
            if (utils_sys.validation.misc.is_undefined(event_object))
                return false;

            var __client_x = 0,
                __client_y = 0;

            if (navigator.maxTouchPoints > 0 && 
                event_object.type.indexOf('touch') > -1 && 
                event_object.touches.length > 0)
            {
                __client_x = event_object.touches[0].clientX;
                __client_y = event_object.touches[0].clientY;
            }
            else
            {
                __client_x = event_object.clientX;
                __client_y = event_object.clientY;
            }

            coords.mouse_x = __client_x + 
                             document.documentElement.scrollLeft + 
                             document.body.scrollLeft - document.body.clientLeft;
            coords.mouse_y = __client_y + 
                             document.documentElement.scrollTop + 
                             document.body.scrollTop - document.body.clientTop;

            return true;
        };

        this.reset_stack_trace = function(event_object)
        {
            if (navigator.maxTouchPoints === 0 && event_object.buttons === 0 && last_mouse_button_clicked === 1)
            {
                stack_trace.bee_drag = false;
                stack_trace.internal_bee_drag = false;
                stack_trace.bee_closed = false;

                return true;
            }

            return false;
        };

        this.release_bee = function(event_object)
        {
            if (navigator.maxTouchPoints === 0 && event_object.buttons === 0 && last_mouse_button_clicked === 1)
            {
                if (stack_trace.bee_drag)
                {
                    me.reset_stack_trace(event_object);

                    self.stack.bees.put(event_object);

                    return true;
                }
            }

            return false;
        };

        this.setup_honeycomb_size = function(bees_per_honeycomb)
        {
            var __proposed_stack_width = Math.floor((bees_per_honeycomb / 2) * 230),
                __min_screen_width = 1200,
                __proportion = __proposed_stack_width / __min_screen_width,
                __fixed_bees_per_honeycomb = bees_per_honeycomb;

            if (__proportion > 1 & __proposed_stack_width >= __min_screen_width)
            {
                var __width_diff = __proposed_stack_width - __min_screen_width,
                    __margin_fix = 0;

                __fixed_bees_per_honeycomb -= (Math.ceil(__width_diff / 230) + 1);

                if (__fixed_bees_per_honeycomb % 2 !== 0)
                    __fixed_bees_per_honeycomb -= 3;

                __margin_fix = ((__fixed_bees_per_honeycomb / 2) * 2) + 1;

                __proposed_stack_width -= (__width_diff - __margin_fix);
            }

            max_stack_width = __proposed_stack_width;

            /* Temporary hack - TODO: Fix with internal operations & CSS */
            if (bees_per_honeycomb === 10)
                __fixed_bees_per_honeycomb = 8;

            return __fixed_bees_per_honeycomb;
        };

        this.validate_honeycomb_range = function(val)
        {
            if (!utils_sys.validation.numerics.is_integer(val) || val < 1 || val > honeycomb_views.num())
                return false;

            return true;
        };

        this.free_space_hc_view_swipe = function(event_object)
        {
            if (self.status.bees.num() === self.status.bees.max())
            {
                var __msg_win = new msgbox();

                __msg_win.init('desktop');
                __msg_win.show(xenon.load('os_name'), 'All stack views are full!');

                return false;
            }
            else
            {
                for (var i = 1; i <= honeycomb_views.num() ; i++)
                {
                    if (honeycomb_views.list(i - 1).bees.num() < self.settings.bees_per_honeycomb())
                    {
                        self.stack.set_view(event_object, i);

                        return true;
                    }
                }
            }
        };

        this.show_hive_bee = function(honeycomb_view, bees_colony, index)
        {
            var __new_bee = bees_colony.list(index);

            new __new_bee.show();

            utils_int.draw_hive_bee(honeycomb_view, __new_bee.settings.general.id(), 0);

            return true;
        };

        this.show_ghost_bee = function(event_object, mode)
        {
            if (utils_sys.validation.misc.is_undefined(event_object))
                return false;

            if ((navigator.maxTouchPoints === 0 && event_object.buttons !== 1) || mode < 0 || mode > 1)
                return false;

            if (honeycomb_views.swiping())
                return false;

            if (swarm.status.active_bee())
            {
                for (var i = 0; i < honeycomb_views.num(); i++)
                {
                    if (honeycomb_views.list(i).id === honeycomb_views.visible())
                    {
                        if (honeycomb_views.list(i).bees.num() === self.settings.bees_per_honeycomb() && 
                            stack_trace.internal_bee_drag === false)
                        {
                            me.free_space_hc_view_swipe(event_object);

                            return true;
                        }
                        else
                        {
                            stack_trace.bee_drag = true;

                            var __active_bee_id = swarm.status.active_bee(),
                                __hive_bee = utils_sys.objects.by_id('hive_bee_' + __active_bee_id),
                                __hive_object = utils_sys.objects.by_id(hive_id),
                                __ghost_bee_width = 230,
                                __ghost_bee_height = 30,
                                __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_views.visible()),
                                __bee_x = coords.mouse_x + 10 + __ghost_bee_width,
                                __bee_y = coords.mouse_y + 10 + __ghost_bee_height,
                                __stack_offset_x_space = self.settings.left() + 
                                                         utils_sys.graphics.pixels_value(__hive_object.style.width) + 250;
                                //__stack_offset_y_space = self.settings.top() + 
                                //                         utils_sys.graphics.pixels_value(__hive_object.style.height);

                            if (mode === 1)
                            {
                                self.stack.bees.expel(event_object, mode);

                                __honeycomb.removeChild(__hive_bee);
                            }

                            me.draw_hive_bee(honeycomb_views.visible(), __active_bee_id, 1);

                            if (__bee_x <= __stack_offset_x_space)
                            {
                                utils_sys.objects.by_id('hive_ghost_bee').style.left = coords.mouse_x + 10 + 'px';

                                //if (__bee_y <= __stack_offset_y_space - 20)
                                utils_sys.objects.by_id('hive_ghost_bee').style.top = coords.mouse_y + __ghost_bee_height - 10 + 'px';
                                //else
                                    //utils_sys.objects.by_id('hive_ghost_bee').style.top = coords.mouse_y - __ghost_bee_height - 10 + 'px';
                            }
                            else
                            {
                                if (!utils_sys.objects.by_id('hive_ghost_bee').style.top)
                                    utils_sys.objects.by_id('hive_ghost_bee').style.display = 'none';
                            }
                        }

                        return true;
                    }
                }
            }

            return false;
        };

        this.hide_ghost_bee = function(event_object)
        {
            if (utils_sys.validation.misc.is_undefined(event_object) || (navigator.maxTouchPoints === 0 && event_object.buttons !== 1))
                return false;

            var __active_bee_id = swarm.status.active_bee();

            if (__active_bee_id)
            {
                var __this_hive_bee = colony.get(__active_bee_id);

                if (!__this_hive_bee)
                    return false;

                utils_sys.objects.by_id(__active_bee_id).style.display = 'block';
                utils_sys.objects.by_id('hive_ghost_bee').style.display = 'none';

                if (__this_hive_bee.status.gui.casement_deployed())
                    utils_sys.objects.by_id(__active_bee_id + '_casement').style.display = 'block';

                stack_trace.bee_drag = false;

                return true;
            }

            return false;
        };

        this.remove_bee = function(honeycomb_id, bee_id)
        {
            var __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_id),
                __bee = utils_sys.objects.by_id('hive_bee_' + bee_id);

            for (var i = 0; i < honeycomb_views.num(); i++)
            {
                if (honeycomb_views.list(i).id === honeycomb_id)
                {
                    __honeycomb.removeChild(__bee);

                    honeycomb_views.list(i).bees.remove(bee_id);

                    if (colony.get(bee_id))
                        colony.get(bee_id).settings.general.in_hive(false);

                    return true;
                }
            }

            return false;
        };

        this.remove_all_bees = function(honeycomb_id)
        {
            var __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_id);

            while (__honeycomb.hasChildNodes())
            {
                __honeycomb.removeChild(__honeycomb.lastChild);

                honeycomb_views.list(honeycomb_id).bees.remove(__honeycomb.lastChild.id());
            }

            return true;
        };

        this.prepare_draw = function(left, top, honeycombs_num, mode)
        {
            me.draw_hive(left, top);

            for (var i = 0; i < honeycombs_num; i++)
            {
                if (mode === 1)
                    honeycomb_views.add(i + 1);
                else
                    me.draw_honeycomb(i + 1);
            }

            me.fixate_sliding_area();
        };

        this.draw_honeycomb = function(honeycomb_id)
        {
            var __new_honeycomb = null,
                __honeycomb_id = 'honeycomb_' + honeycomb_id,
                __dynamic_width = 0,
                __handler = null;

            __new_honeycomb = document.createElement('div');

            __dynamic_width = (utils_sys.graphics.pixels_value(utils_sys.objects.by_id(hive_id + '_stack').style.width) - 20);

            __new_honeycomb.setAttribute('id', __honeycomb_id);
            __new_honeycomb.setAttribute('class', 'honeycomb');
            __new_honeycomb.setAttribute('style', 'width: ' + __dynamic_width + 'px;');

            utils_sys.objects.by_id(hive_id + '_sliding_box').appendChild(__new_honeycomb);

            __handler = function(event) { self.stack.bees.put(event); };
            morpheus.run(hive_id, 'mouse', 'mouseup', __handler, utils_sys.objects.by_id(__honeycomb_id));

            honeycomb_views.dynamic_width(__dynamic_width);

            return true;
        };

        this.remove_honeycomb = function(honeycomb_id)
        {
            var __hive = utils_sys.objects.by_id(hive_id),
                __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_id);

            __hive.removeChild(__honeycomb);

            return true;
        };

        this.remove_all_honeycombs = function()
        {
            var __hive = utils_sys.objects.by_id(hive_id);

            while (__hive.hasChildNodes())
                __hive.removeChild(__hive.lastChild);                

            return true;
        };

        this.draw_hive = function(left, top)
        {
            var __dynamic_object = null,
                __swarm_id = swarm.settings.id(),
                __forest_id = forest.settings.id(),
                __swarm_object = utils_sys.objects.by_id(__swarm_id),
                __forest_object = utils_sys.objects.by_id(__forest_id),
                __handler = null;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'hive_ghost_bee');
            __dynamic_object.setAttribute('class', 'ghost_bee');

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', hive_id);
            __dynamic_object.setAttribute('class', 'hive');
            __dynamic_object.setAttribute('style', 'top: ' + top + 'px; ' + 
                                                   'left: ' + left + 'px; ' + 
                                                   'right: ' + left + 'px; ' + 
                                                   'width: ' + max_stack_width + 'px; ' + 
                                                   'height: 85px;');

            __dynamic_object.innerHTML = `<div id="` + hive_id + `_previous_arrow" class="stack_arrow left_arrow"></div>
                                          <div id="` + hive_id + `_stack" class="stack_bar">
                                              <div id="` + hive_id + `_sliding_box" class="sliding_box"></div>
                                          </div>
                                          <div id="` + hive_id + `_next_arrow" class="stack_arrow right_arrow"></div>`;

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __current_stack_width = utils_sys.graphics.pixels_value(__dynamic_object.style.width);

            utils_sys.objects.by_id(hive_id + '_stack').style.width = 
            (utils_sys.graphics.pixels_value(__dynamic_object.style.width) - 84) + 'px';
            utils_sys.objects.by_id(hive_id + '_stack').style.height = '85px';

            __handler = function(event)
                        {
                            me.coords(event);
                            me.show_ghost_bee(event, 0);

                            last_mouse_button_clicked = event.buttons;
                        };
            morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id(hive_id + '_stack'));
            morpheus.run(hive_id, 'touch', 'touchmove', __handler, utils_sys.objects.by_id(hive_id + '_stack'));

            __handler = function(event) { me.reset_stack_trace(event); };
            morpheus.run(hive_id, 'mouse', 'mouseup', __handler, utils_sys.objects.by_id(hive_id + '_stack'));
            morpheus.run(hive_id, 'touch', 'touchend', __handler, utils_sys.objects.by_id(hive_id + '_stack'));

            __handler = function(event) { me.hide_ghost_bee(event); };
            morpheus.run(hive_id, 'mouse', 'mousemove', __handler, __swarm_object);
            morpheus.run(hive_id, 'touch', 'touchmove', __handler, __swarm_object);

            __handler = function(event) { me.reset_stack_trace(event); };
            morpheus.run(hive_id, 'mouse', 'mouseup', __handler, __swarm_object);
            morpheus.run(hive_id, 'touch', 'touchend', __handler, __swarm_object);

            __handler = function(event) { me.release_bee(event); };
            morpheus.run(hive_id, 'mouse', 'mouseup', __handler, __forest_object);
            morpheus.run(hive_id, 'touch', 'touchend', __handler, __forest_object);

            __handler = function(event) { me.manage_stack_view(event, '-'); };
            morpheus.run(hive_id, 'mouse', 'mousedown', __handler, utils_sys.objects.by_id(hive_id + '_previous_arrow'));

            __handler = function(event) { me.manage_stack_view(event, '+'); };
            morpheus.run(hive_id, 'mouse', 'mousedown', __handler, utils_sys.objects.by_id(hive_id + '_next_arrow'));

            __handler = function(event)
            {
                var __hive_vertical_size = utils_sys.graphics.pixels_value(__dynamic_object.style.top) + 
                                           utils_sys.graphics.pixels_value(__dynamic_object.style.height);

                if (event.clientY >= __hive_vertical_size)
                    me.hide_ghost_bee(event);
            };
            morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id('desktop'));

            __handler = function(event) { me.hide_ghost_bee(event); };
            morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id(hive_id + '_previous_arrow'));
            morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id(hive_id + '_next_arrow'));

            //__handler = function(event) { me.redraw_hive(event); };
            //morpheus.run(hive_id, 'mouse', 'resize', __handler, window);

            return true;
        };
/*
        this.redraw_hive = function(event)
        {
            var __swarm_id = swarm.settings.id(),
                __forest_id = forest.settings.id(),
                __container_object = utils_sys.objects.by_id(self.settings.container()),
                __hive_object = utils_sys.objects.by_id(hive_id),
                __swarm_object = utils_sys.objects.by_id(__swarm_id),
                __forest_object = utils_sys.objects.by_id(__forest_id),
                __ghost_bee_object = utils_sys.objects.by_id('hive_ghost_bee');

            self.stack.toggle('off');
            self.stack.set_view(event, 1);

            morpheus.clear(hive_id);

            // | ----- USE MORPHEUS INSTEAD ----- |
            // utils_sys.events.detach(hive_id, __swarm_object, 'mousemove');
            // utils_sys.events.detach(hive_id, __swarm_object, 'mouseup');
            // utils_sys.events.detach(hive_id, __forest_object, 'mouseup');
            // utils_sys.events.detach(hive_id, window, 'resize');
            // ====================================

            __container_object.removeChild(__ghost_bee_object);
            __container_object.removeChild(__hive_object);

            self.settings.left(47);
            self.settings.top(window.innerHeight - 85);

            me.prepare_draw(self.settings.left(), self.settings.top(), honeycomb_views.num(), 2);

            return true;
        };
*/
        this.draw_hive_bee = function(honeycomb_id, bee_id, mode)
        {
            var __dynamic_object = null,
                __bee_object = colony.get(bee_id),
                __app_id = __bee_object.settings.general.app_id(),
                __ghost_object = null,
                __ctrl_bar_class = null,
                __ctrl_bar_icon_class = null,
                __ctrl_bar_title_class = null,
                __ctrl_bar_close_class = null,
                __handler = null;

            if (__bee_object.settings.general.resizable() === true)
            {
                __ctrl_bar_class = 'ctrl_bar box_ctrl_bar ' + bee_id + '_ctrl_bar box_ctrl_border';
                __ctrl_bar_title_class = 'title box_title ' + bee_id + '_box_title';
                __ctrl_bar_close_class = 'close box_close ' + bee_id + '_box_close';
            }
            else
            {
                __ctrl_bar_class = 'ctrl_bar widget_ctrl_bar ' + bee_id + '_ctrl_bar';
                __ctrl_bar_title_class = 'title widget_title ' + bee_id + '_widget_title';
                __ctrl_bar_close_class = 'close widget_close ' + bee_id + '_widget_close';
            }

            __ctrl_bar_icon_class = 'icon ' + bee_id + '_icon ' + __app_id + '_icon';

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'hive_bee_' + bee_id);
            __dynamic_object.setAttribute('class', __ctrl_bar_class + ' hive_bee');

            __dynamic_object.innerHTML = `<div id="hive_bee_` + bee_id + `_icon" class="` + __ctrl_bar_icon_class + `"></div> 
                                          <div id="hive_bee_` + bee_id + `_title" class="` + __ctrl_bar_title_class + `">` +
                                          __bee_object.settings.data.window.labels.title() + 
                                         `</div>`;

            if (__bee_object.settings.actions.can_close())
                __dynamic_object.innerHTML += '<div id="hive_bee_' + bee_id + '_close" class="' + __ctrl_bar_close_class + '"></div>';
 
            if (mode === 0)
            {
                utils_sys.objects.by_id('hive_ghost_bee').style.display = 'none';
                utils_sys.objects.by_id('hive_ghost_bee').innerHTML = '';

                utils_sys.objects.by_id('honeycomb_' + honeycomb_id).appendChild(__dynamic_object);
 
                if (utils_sys.objects.by_id(bee_id) !== null)
                {
                    utils_sys.objects.by_id(bee_id).style.display = 'none';
                    utils_sys.objects.by_id(bee_id + '_casement').style.display = 'none';
                }

                __handler = function() { return false; };
                morpheus.run(hive_id, 'mouse', 'selectstart', __handler, __dynamic_object);

                __handler = function(event)
                            {
                                if (event.buttons !== 1)
                                    return false;

                                if (stack_trace.bee_drag === true || stack_trace.bee_closing === true)
                                    return false;

                                last_mouse_button_clicked = 1;

                                stack_trace.internal_bee_drag = true;

                                swarm.settings.active_bee(bee_id);

                                me.show_ghost_bee(event, 1);
                            };
                morpheus.run(hive_id, 'mouse', 'mousedown', __handler, __dynamic_object.childNodes[0]);
                morpheus.run(hive_id, 'mouse', 'mousedown', __handler, __dynamic_object.childNodes[2]);

                __handler = function(event)
                            {
                                if (event.buttons !== 1)
                                    return false;

                                if (stack_trace.bee_drag === true || stack_trace.bee_closing === true)
                                    return false;

                                last_mouse_button_clicked = 1;

                                stack_trace.bee_closing = true;

                                __bee_object.on('closed', function()
                                                          {
                                                              stack_trace.bee_closed = true;
                                                              stack_trace.bee_closing = false;

                                                              me.remove_bee(honeycomb_id, bee_id);
                                                          });
                                __bee_object.gui.actions.close(event);
                            };

                morpheus.run(hive_id, 'mouse', 'mousedown', __handler, __dynamic_object.childNodes[3]);
            }
            else
            {
                __ghost_object = utils_sys.objects.by_id('hive_ghost_bee');

                __ghost_object.innerHTML = '';
                __ghost_object.appendChild(__dynamic_object);
                __ghost_object.style.display = 'block';

                if (utils_sys.objects.by_id(bee_id) !== null)
                {
                    utils_sys.objects.by_id(bee_id).style.display = 'none';
                    utils_sys.objects.by_id(bee_id + '_casement').style.display = 'none';
                }

                __handler = function(event) { me.release_bee(event); };
                morpheus.run(hive_id, 'mouse', 'mouseup', __handler, __ghost_object);
                morpheus.run(hive_id, 'touch', 'touchend', __handler, __ghost_object);
            }

            return true;
        };

        this.manage_stack_view = function(event_object, symbol, callback = null)
        {
            function factory_swipe(direction)
            {
                var __sliding_box = hive_id + '_sliding_box',
                    __sign = 1;

                if (direction === 'right')
                    __sign = -1;

                honeycomb_views.swiping(true);

                gfx.animation.swipe(__sliding_box, 1, direction, honeycomb_views.dynamic_width(), 20, 5, 25, 
                                    function()
                                    {
                                        honeycomb_views.visible(honeycomb_views.visible() + __sign);

                                        honeycomb_views.swiping(false);

                                        if (callback !== null)
                                            callback.call();
                                    });
            }

            if (!utils_sys.validation.alpha.is_symbol(symbol))
                return false;

            if (event_object !== null && !utils_sys.validation.misc.is_undefined(event_object.buttons) && event_object.buttons !== 1)
                return false;

            if (honeycomb_views.swiping())
                return false;

            if (symbol === '-')
            {
                if (honeycomb_views.visible() === 1)
                    return false;

                factory_swipe('right')
            }
            else if (symbol === '+')
            {
                if (honeycomb_views.visible() === honeycomb_views.num())
                    return false;

                factory_swipe('left')
            }
            else
                return false;

            return true;
        };

        this.fixate_sliding_area = function()
        {
            utils_sys.objects.by_id(hive_id + '_sliding_box').style.width = 
            (honeycomb_views.num() * honeycomb_views.dynamic_width() + 80) + 'px';

            utils_sys.objects.by_id(hive_id + '_stack').style.width = honeycomb_views.dynamic_width() + 'px';

            return true;
        };

        this.set_z_index = function(bee_id)
        {
            if (utils_sys.validation.misc.is_undefined(bee_id) || utils_sys.validation.alpha.is_symbol(bee_id))
                return false;

            var __bee_object = colony.get(bee_id),
                __z_index = swarm.status.z_index();

            swarm.settings.z_index(__z_index + 1);

            __bee_object.gui.actions.set_top();

            return true;
        };
    }

    function settings()
    {
        var __id = null,
            __container = null,
            __bees_per_honeycomb = 8,
            __left = 0,
            __top = 0;

        this.id = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __id;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __id = val;

            return true;
        };

        this.container = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __container;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __container = val;

            return true;
        };

        this.bees_per_honeycomb = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __bees_per_honeycomb;

            if (!utils_sys.validation.numerics.is_integer(val) || val < 8)
                return false;

            __bees_per_honeycomb = val;

            return true;
        };

        this.left = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __left;

            if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
                return false;

            __left = val;

            return true;
        };

        this.top = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __top;

            if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
                return false;

            __top = val;

            return true;
        };
    }

    function stack()
    {
        function bees()
        {
            this.insert = function(object, honeycomb_view)
            {
                if (is_init === false)
                    return false;

                if (!colony.is_bee(object) || 
                    (honeycomb_view !== null && !utils_int.validate_honeycomb_range(honeycomb_view)))
                    return false;

                if (honeycomb_view !== null && honeycomb_views.swiping())
                    return false;

                var __bee_id = object.settings.general.id();

                if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
                    return false;

                if (colony.get(__bee_id).status.system.in_hive())
                    return false;

                if (honeycomb_view === null)
                {
                    function push_to_stack()
                    {
                        colony.get(__bee_id).settings.general.in_hive(true);

                        utils_int.draw_hive_bee(honeycomb_views.visible(), __bee_id, 0);
                    }

                    for (var i = 0; i < honeycomb_views.num(); i++)
                    {
                        if (honeycomb_views.list(i).bees.num() === self.settings.bees_per_honeycomb())
                        {
                            if (honeycomb_views.visible() === i + 1 && honeycomb_views.visible() < honeycomb_views.num())
                            {
                                utils_int.manage_stack_view(null, '+', () =>
                                {
                                    honeycomb_views.list(honeycomb_views.visible() - 1).bees.add(__bee_id);

                                    push_to_stack();
                                });

                                break;
                            }
                        }
                        else
                        {
                            if (honeycomb_views.list(i).id === honeycomb_views.visible())
                            {
                                if (honeycomb_views.list(i).bees.num() < self.settings.bees_per_honeycomb())
                                {
                                    honeycomb_views.list(i).bees.add(__bee_id);

                                    push_to_stack();

                                    break;
                                }
                            }
                        }
                    }
                }
                else
                {
                    honeycomb_views.list(honeycomb_view - 1).bees.add(__bee_id);

                    utils_int.draw_hive_bee(honeycomb_view, __bee_id, 0);
                }

                swarm.settings.active_bee(null);

                return true;
            };

            this.remove = function(object, honeycomb_view)
            {
                if (is_init === false)
                    return false;

                if (!colony.is_bee(object) || !utils_int.validate_honeycomb_range(honeycomb_view))
                    return false;

                var __bee_id = object.settings.general.id();

                if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
                    return false;

                if (!utils_int.remove_bee(honeycomb_view, __bee_id))
                    return false;

                if (!colony.remove(__bee_id))
                    return false;

                //object.settings.general.in_hive(false);

                return true;
            };

            this.put = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object) || 
                    (navigator.maxTouchPoints === 0 && event_object.buttons !== 0 && last_mouse_button_clicked !== 1))
                    return false;

                if (honeycomb_views.swiping())
                    return false;

                if (swarm.status.active_bee())
                {
                    for (var i = 0; i < honeycomb_views.num(); i++)
                    {
                        if (honeycomb_views.list(i).id === honeycomb_views.visible() && 
                            honeycomb_views.list(i).bees.num() < self.settings.bees_per_honeycomb())
                        {
                            var __active_bee_id = swarm.status.active_bee();

                            honeycomb_views.list(i).bees.add(__active_bee_id);

                            colony.get(__active_bee_id).settings.general.in_hive(true);

                            utils_int.draw_hive_bee(honeycomb_views.visible(), __active_bee_id, 0);

                            swarm.settings.active_bee(null);

                            return true;
                        }
                    }

                    return false;
                }
            };

            this.expel = function(event_object, mode)
            {
                if (is_init === false)
                    return false;

                if (mode === 0)
                {
                    for (var i = 0; i < honeycomb_views.num(); i++)
                    {
                        var __honeycomb = honeycomb_views.list(i),
                            __tmp_bees_list = Object.assign([], __honeycomb.bees.list());

                        for (var j = 0; j < __tmp_bees_list.length; j++)
                        {
                            var __this_bee_id = __tmp_bees_list[j],
                                __this_bee = colony.get(__this_bee_id),
                                __this_honeycomb_object = utils_sys.objects.by_id('honeycomb_' + __honeycomb.id),
                                __this_bee_object = utils_sys.objects.by_id('hive_bee_' + __this_bee_id);

                            __this_honeycomb_object.removeChild(__this_bee_object);

                            __honeycomb.bees.remove(__this_bee_id);

                            __this_bee.settings.general.in_hive(false);

                            swarm.settings.active_bee(__this_bee_id);

                            utils_int.set_z_index(__this_bee_id);

                            utils_int.hide_ghost_bee(event_object);
                        }
                    }

                    return true;
                }
                else
                {
                    if (utils_sys.validation.misc.is_undefined(event_object) || (navigator.maxTouchPoints === 0 && event_object.buttons !== 1))
                        return false;

                    if (swarm.status.active_bee())
                    {
                        for (var i = 0; i < honeycomb_views.num(); i++)
                        {
                            if (honeycomb_views.list(i).id === honeycomb_views.visible())
                            {
                                var __active_bee_id = swarm.status.active_bee();

                                honeycomb_views.list(i).bees.remove(__active_bee_id);

                                colony.get(__active_bee_id).settings.general.in_hive(false);

                                swarm.settings.active_bee(__active_bee_id);

                                utils_int.set_z_index(__active_bee_id);

                                return true;
                            }
                        }

                        return false;
                    }
                }
            };

            this.show = function(honeycomb_view)
            {
                if (is_init === false)
                    return false;

                if (colony.num() === 0 || !utils_int.validate_honeycomb_range(honeycomb_view))
                    return false;

                var __bees_num = honeycomb_views.list(honeycomb_view).bees.num(),
                    __bees = honeycomb_views.list(honeycomb_view).bees.list();

                for (var i = 0; i < __bees_num; i++)
                {
                    for (var j = 0; j < colony.num(); j++)
                    {
                        if (colony.list(j).settings.general.id() === __bees[i])
                            utils_int.show_hive_bee(honeycomb_view, colony, j);
                    }
                }

                return true;
            };
        }

        function mouse()
        {
            this.x = function()
            {
                if (is_init === false)
                    return false;

                return coords.mouse_x;
            };

            this.y = function()
            {
                if (is_init === false)
                    return false;

                return coords.mouse_y;
            };
        }

        function key()
        {
            var __key = 0;

            this.get = function()
            {
                if (is_init === false)
                    return false;

                return __key;
            };

            this.set = function(val)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(val))
                    return false;

                __key = val;

                return true;
            };
        }

        this.set_view = function(event_object, next_honeycomb_num, callback = null)
        {
            function recursive_swipe(hc_view_delta)
            {
                var __sign = '+';

                if (hc_view_delta === 0)
                {
                    if (utils_sys.validation.misc.is_function(callback))
                        callback.call();

                    return;
                }

                if (hc_view_delta < 0 )
                {
                    hc_view_delta = -hc_view_delta;
                    __sign = '-';
                }

                utils_int.manage_stack_view(event_object, __sign, 
                function()
                {
                    hc_view_delta--;

                    if (__sign === '-')
                        hc_view_delta = -hc_view_delta;

                    recursive_swipe(hc_view_delta);

                    if (utils_sys.validation.misc.is_function(callback))
                        callback.call();
                });
            }

            if (is_init === false)
                return false;

            if (!utils_sys.validation.numerics.is_integer(next_honeycomb_num) || 
                next_honeycomb_num < 1 || next_honeycomb_num > honeycomb_views.num())
                return false;

            var __honeycomb_view_delta = next_honeycomb_num - honeycomb_views.visible();

            recursive_swipe(__honeycomb_view_delta);

            return true;
        };

        this.toggle = function(status)
        {
            if (is_init === false)
                return false;

            if (status !== 'on' && status !== 'off')
                return false;

            var __hive_object = utils_sys.objects.by_id(hive_id);

            if (status === 'on')
                __hive_object.style.visibility = 'visible';
            else
                __hive_object.style.visibility = 'hidden';

            return true;
        };

        this.bees = new bees();
        this.mouse = new mouse();
        this.key = new key();
    }

    function status()
    {
        function honeycombs()
        {
            this.num = function()
            {
                if (is_init === false)
                    return false;

                return honeycomb_views.num();
            };

            this.visible = function()
            {
                if (is_init === false)
                    return false;

                return honeycomb_views.visible();
            };
        }

        function bees()
        {
            this.max = function()
            {
                if (is_init === false)
                    return false;

                return (honeycomb_views.num() * self.settings.bees_per_honeycomb());
            };

            this.num = function()
            {
                if (is_init === false)
                    return false;

                var __bees_num = 0;

                for (var i = 0; i < honeycomb_views.num(); i++)
                    __bees_num += honeycomb_views.list(i).bees.num();

                return __bees_num;
            };

            this.list = function()
            {
                if (is_init === false)
                    return false;

                var __bees_list = [];

                for (var i = 0; i < honeycomb_views.num(); i++)
                    __bees_list.push(honeycomb_views.list(i).bees.list());

                return __bees_list;
            };

            this.honeycomb_id = function(bee_id)
            {
                if (is_init === false)
                    return false;

                for (var i = 0; i < honeycomb_views.num(); i++)
                {
                    var __this_honeycomb = honeycomb_views.list(i);
                    var __bees_list = __this_honeycomb.bees.list();
                    var __bees_list_length = __bees_list.length;

                    for (var j = 0; j < __bees_list_length; j++)
                    {
                        if (__bees_list[j] === bee_id)
                            return __this_honeycomb.id;
                    }
                }

                return false;
            };
        }

        this.bee_drag = function()
        {
            if (is_init === false)
                return false;

            return stack_trace.bee_drag;
        };

        this.bee_close = function()
        {
            if (is_init === false)
                return false;

            return stack_trace.bee_closed;
        };

        this.honeycombs = new honeycombs();
        this.bees = new bees();
    }

    this.init = function(container_id, left, top, bees_per_honeycomb, honeycombs_num)
    {
        if (is_init === true)
            return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || 
            utils_sys.validation.misc.is_undefined(left) || utils_sys.validation.misc.is_undefined(top) || 
            utils_sys.validation.misc.is_undefined(bees_per_honeycomb) || utils_sys.validation.misc.is_undefined(honeycombs_num))
            return false;
        else
        {
            if (utils_sys.validation.alpha.is_symbol(container_id) || utils_sys.objects.by_id(container_id) === null || 
                !utils_sys.validation.numerics.is_integer(left) || left < 0 || 
                !utils_sys.validation.numerics.is_integer(top) || top < 0 || 
                !utils_sys.validation.numerics.is_integer(bees_per_honeycomb) || 
                bees_per_honeycomb < 8 || bees_per_honeycomb % 2 !== 0 || 
                !utils_sys.validation.numerics.is_integer(honeycombs_num) || honeycombs_num < 1)
                return false;

            var dynamic_bees_per_honeycomb = utils_int.setup_honeycomb_size(bees_per_honeycomb);

            is_init = true;

            self.settings.id('hive_' + random.generate());

            if (!self.settings.container(container_id))
                return false;

            self.settings.bees_per_honeycomb(dynamic_bees_per_honeycomb);
            self.settings.left(left);
            self.settings.top(top);

            hive_id = self.settings.id();

            nature.themes.store('hive');
            nature.apply('new');

            utils_int.prepare_draw(left, top, honeycombs_num, 1);
        }

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
        swarm = matrix.get('swarm');
        forest = matrix.get('forest');
        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        hive_id = null,
        cosmos = null,
        matrix = null,
        colony = null,
        xenon = null,
        swarm = null,
        forest = null,
        morpheus = null,
        nature = null,
        max_stack_width = 0,
        last_mouse_button_clicked = 0,
        utils_sys = new vulcan(),
        random = new pythia(),
        gfx = new fx(),
        coords = new mouse_coords_model(),
        stack_trace = new stack_trace_model(),
        honeycomb_views = new honeycomb_view_model(),
        utils_int = new utilities();

    this.settings = new settings();
    this.stack = new stack();
    this.status = new status();
}
