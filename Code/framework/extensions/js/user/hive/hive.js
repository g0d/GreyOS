/*
    GreyOS - Hive (Version: 2.5)
    
    File name: hive.js
    Description: This file contains the Hive - Bees stack bar module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
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
        this.bee_close = false;
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

            coords.mouse_x = event_object.clientX + document.documentElement.scrollLeft + document.body.scrollLeft - 
                             document.body.clientLeft;
            coords.mouse_y = event_object.clientY + document.documentElement.scrollTop + document.body.scrollTop - 
                             document.body.clientTop;

            return true;
        };

        this.reset_stack_trace = function(event_object)
        {
            if (event_object.buttons === 0 && last_mouse_button_clicked === 1)
            {
                stack_trace.bee_drag = false;
                stack_trace.internal_bee_drag = false;
                stack_trace.bee_close = false;

                return true;
            }

            return false;
        };

        this.release_bee = function(event_object)
        {
            if (event_object.buttons === 0 && last_mouse_button_clicked === 1)
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

        this.set_bees_per_honeycomb = function(current_stack_width)
        {
            var __model_stack_width = 1162,
                __bees_num = 0;

            if (current_stack_width > __model_stack_width)
            {
                __bees_num = parseInt(9 * (current_stack_width / __model_stack_width), 10);

                if (__bees_num % 2 !== 0)
                    __bees_num--;

                if (self.settings.bees_per_honeycomb() > __bees_num && __bees_num >= 8)
                    self.settings.bees_per_honeycomb(__bees_num);
            }

            return true;
        };

        this.validate_honeycomb_range = function(val)
        {
            if (!utils_sys.validation.numerics.is_integer(val) || val < 1 || val > honeycomb_views.num())
                return false;

            return true;
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
            if (utils_sys.validation.misc.is_undefined(event_object) || event_object.buttons !== 1 || mode < 0 || mode > 1)
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
                            stack_trace.bee_drag = false;

                            console.log('Sorry, maximum number of apps in this stack bar!');
                        }
                        else
                        {
                            var __this_bee = swarm.status.active_bee(),
                                __hive_bee = utils_sys.objects.by_id('hive_bee_' + __this_bee),
                                __ghost_bee_width = 230,
                                __ghost_bee_height = 30,
                                __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_views.visible()),
                                __bee_x = coords.mouse_x + 10 + __ghost_bee_width,
                                __bee_y = coords.mouse_y + 10 + __ghost_bee_height,
                                __stack_offset_x_space = self.settings.left() + 
                                                         utils_sys.graphics.pixels_value(utils_sys.objects.by_id(self.settings.id()).style.width) + 26,
                                __stack_offset_y_space = self.settings.top() + 
                                                         utils_sys.graphics.pixels_value(utils_sys.objects.by_id(self.settings.id()).style.height);

                            if (mode === 1)
                            {
                                self.stack.bees.expel(event_object);

                                __honeycomb.removeChild(__hive_bee);
                            }

                            me.draw_hive_bee(honeycomb_views.visible(), __this_bee, 1);

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

                            stack_trace.bee_drag = true;
                        }

                        return true;
                    }
                }

                return false;
            }

            return true;
        };

        this.hide_ghost_bee = function(event_object)
        {
            if (utils_sys.validation.misc.is_undefined(event_object) || event_object.buttons !== 1)
                return false;

            var __this_bee = swarm.status.active_bee();

            if (__this_bee)
            {
                var __this_hive_bee = colony.get(__this_bee);

                if (utils_sys.objects.by_id(__this_bee) === null)
                {
                    if (__this_hive_bee === false)
                        return false;

                    if (__this_hive_bee.status.gui.closed())
                        return false;

                    swarm.bees.insert(__this_hive_bee);

                    __this_hive_bee.settings.general.in_hive(false);
                    __this_hive_bee.gui.position.top(self.settings.top() - __this_hive_bee.gui.size.height() - 33);
                    __this_hive_bee.gui.position.left(coords.mouse_x - 
                                                      parseInt((__this_hive_bee.gui.size.width() / 2), 10) + 
                                                      parseInt((__this_hive_bee.gui.mouse.relative.x() / 2), 10));

                    __this_hive_bee.show();

                    __this_hive_bee.drone.use('enable_drag', 'utils_int.coords(event, 2); utils_int.manage_drag_status();');
                    __this_hive_bee.drone.run('enable_drag');

                    __this_hive_bee.gui.position.top(__this_hive_bee.gui.position.top() + __this_hive_bee.gui.size.height() - 85);
                }

                utils_sys.objects.by_id(__this_bee).style.display = 'block';
                utils_sys.objects.by_id('hive_ghost_bee').style.display = 'none';

                if (__this_hive_bee.status.gui.casement_deployed())
                    utils_sys.objects.by_id(__this_bee + '_casement').style.display = 'block';

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
                __hive_id = self.settings.id(),
                __honeycomb_id = 'honeycomb_' + honeycomb_id,
                __dynamic_width = 0;

            __new_honeycomb = document.createElement('div');

            __dynamic_width = (utils_sys.graphics.pixels_value(utils_sys.objects.by_id(__hive_id + '_stack').style.width) - 20);

            __new_honeycomb.setAttribute('id', __honeycomb_id);
            __new_honeycomb.setAttribute('class', 'honeycomb');
            __new_honeycomb.setAttribute('style', 'width: ' + __dynamic_width + 'px;');

            utils_sys.objects.by_id(__hive_id + '_sliding_box').appendChild(__new_honeycomb);

            utils_sys.objects.by_id(__honeycomb_id).onmouseup = function(event) { self.stack.bees.put(event); };

            honeycomb_views.dynamic_width(__dynamic_width);

            return true;
        };

        this.remove_honeycomb = function(honeycomb_id)
        {
            var __hive = utils_sys.objects.by_id(self.settings.id()),
                __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_id);

            __hive.removeChild(__honeycomb);

            return true;
        };

        this.remove_all_honeycombs = function()
        {
            var __hive = utils_sys.objects.by_id(self.settings.id());

            while (__hive.hasChildNodes())
                __hive.removeChild(__hive.lastChild);                

            return true;
        };

        this.draw_hive = function(left, top)
        {
            var __dynamic_object = null,
                __hive_id = self.settings.id(),
                __swarm_id = swarm.settings.id(),
                __forest_id = forest.settings.id(),
                __swarm_object = utils_sys.objects.by_id(__swarm_id),
                __forest_object = utils_sys.objects.by_id(__forest_id),
                __current_stack_width = 0,
                __handler = null;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'hive_ghost_bee');
            __dynamic_object.setAttribute('class', 'ghost_bee');

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __hive_id);
            __dynamic_object.setAttribute('class', 'hive');
            __dynamic_object.setAttribute('style', 'top: ' + top + 'px; ' + 
                                                   'left: ' + left + 'px; ' + 
                                                   'right: ' + left + 'px; ' + 
                                                   'width: ' + (document.body.clientWidth - 270) + 'px; ' + 
                                                   'height: 85px;');

            __dynamic_object.innerHTML = '<div id="' + __hive_id + '_previous_arrow" class="stack_arrow left_arrow"></div>' + 
                                         '<div id="' + __hive_id + '_stack" class="stack_bar">' + 
                                         '  <div id="' + __hive_id + '_sliding_box" class="sliding_box"></div>' + 
                                         '</div>' + 
                                         '<div id="' + __hive_id + '_next_arrow" class="stack_arrow right_arrow"></div>';

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __current_stack_width = utils_sys.graphics.pixels_value(__dynamic_object.style.width);

            me.set_bees_per_honeycomb(__current_stack_width);

            utils_sys.objects.by_id(__hive_id + '_stack').style.width = (utils_sys.graphics.pixels_value(__dynamic_object.style.width) - 84) + 'px';
            utils_sys.objects.by_id(__hive_id + '_stack').style.height = '85px';

            __handler = function(event)
                        {
                            me.coords(event);
                            me.show_ghost_bee(event, 0);

                            last_mouse_button_clicked = event.buttons;
                        };
            utils_sys.objects.by_id(__hive_id + '_stack').onmousemove = __handler;

            __handler = function(event) { me.reset_stack_trace(event); };
            utils_sys.objects.by_id(__hive_id + '_stack').onmouseup = __handler;

            __handler = function(event) { me.hide_ghost_bee(event); };
            utils_sys.events.attach(__hive_id, __swarm_object, 'mousemove', __handler);

            __handler = function(event) { me.reset_stack_trace(event); };
            utils_sys.events.attach(__hive_id, __swarm_object, 'mouseup', __handler);

            __handler = function(event) { me.release_bee(event); };
            utils_sys.events.attach(__hive_id, __forest_object, 'mouseup', __handler);

            utils_sys.objects.by_id(__hive_id + '_previous_arrow').onmousedown = function(event) { me.manage_stack_view(event, '-'); };
            utils_sys.objects.by_id(__hive_id + '_next_arrow').onmousedown = function(event) { me.manage_stack_view(event, '+'); };

            //__handler = function(event) { me.redraw_hive(event); };
            //utils_sys.events.attach(__hive_id, window, 'resize', __handler);

            return true;
        };

        this.redraw_hive = function(event)
        {
            var __hive_id = self.settings.id(),
                __swarm_id = swarm.settings.id(),
                __forest_id = forest.settings.id(),
                __container_object = utils_sys.objects.by_id(self.settings.container()),
                __hive_object = utils_sys.objects.by_id(__hive_id),
                __swarm_object = utils_sys.objects.by_id(__swarm_id),
                __forest_object = utils_sys.objects.by_id(__forest_id),
                __ghost_bee_object = utils_sys.objects.by_id('hive_ghost_bee');

            self.stack.toggle('off');
            self.stack.set_view(event, 1);

            utils_sys.events.detach(__hive_id, __swarm_object, 'mousemove');
            utils_sys.events.detach(__hive_id, __swarm_object, 'mouseup');
            utils_sys.events.detach(__hive_id, __forest_object, 'mouseup');
            utils_sys.events.detach(__hive_id, window, 'resize');

            __container_object.removeChild(__ghost_bee_object);
            __container_object.removeChild(__hive_object);

            self.settings.left(47);
            self.settings.top(window.innerHeight - 87);

            me.prepare_draw(self.settings.left(), self.settings.top(), honeycomb_views.num(), 2);

            return true;
        };

        this.draw_hive_bee = function(honeycomb_id, bee_id, mode)
        {
            var __dynamic_object = null,
                __bee_object = colony.get(bee_id),
                __ghost_object = null,
                __ctrl_bar_class = null,
                __ctrl_bar_icon_class = null,
                __ctrl_bar_title_class = null,
                __ctrl_bar_close_class = null,
                __handler = null;

            if (__bee_object.settings.general.type() === 1)
            {
                __ctrl_bar_class = 'ctrl_bar box_ctrl_bar ' + bee_id + '_ctrl_bar box_ctrl_border';
                __ctrl_bar_icon_class = 'icon ' + bee_id + '_icon';
                __ctrl_bar_title_class = 'title box_title ' + bee_id + '_box_title';
                __ctrl_bar_close_class = 'close box_close ' + bee_id + '_box_close';
            }
            else
            {
                __ctrl_bar_class = 'ctrl_bar widget_ctrl_bar ' + bee_id + '_ctrl_bar';
                __ctrl_bar_icon_class = 'icon ' + bee_id + '_icon';
                __ctrl_bar_title_class = 'title widget_title ' + bee_id + '_widget_title';
                __ctrl_bar_close_class = 'close widget_close ' + bee_id + '_widget_close';
            }

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'hive_bee_' + bee_id);
            __dynamic_object.setAttribute('class', __ctrl_bar_class + ' hive_bee');

            __dynamic_object.innerHTML = '<div id="hive_bee_' + bee_id + '_icon" class="' + __ctrl_bar_icon_class + '"></div>' + 
                                         '<div id="hive_bee_' + bee_id + '_title" class="' + __ctrl_bar_title_class + '">' + 
                                         __bee_object.settings.data.window.labels.title() + 
                                         '</div>' + 
                                         '<div id="hive_bee_' + bee_id + '_close" class="' + __ctrl_bar_close_class + '"></div>';

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
                __dynamic_object.onselectstart = __handler;

                __handler = function(event)
                            {
                                if (event.buttons !== 1)
                                    return false;

                                if (stack_trace.bee_drag === true || stack_trace.bee_close === true)
                                    return false;

                                last_mouse_button_clicked = 1;

                                stack_trace.internal_bee_drag = true;

                                swarm.settings.active_bee(bee_id);

                                me.show_ghost_bee(event, 1);
                            };
                __dynamic_object.onmousedown = __handler;

                __handler = function(event)
                            {
                                if (event.buttons !== 1)
                                    return false;

                                if (stack_trace.bee_drag === true || __bee_object.status.gui.closed())
                                    return false;

                                __bee_object.gui.actions.close(event);

                                me.remove_bee(honeycomb_id, bee_id);

                                stack_trace.bee_close = true;

                                last_mouse_button_clicked = 1;
                            };
                __dynamic_object.childNodes[2].onmousedown = __handler;
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

                __handler = function(event) { me.reset_stack_trace(event); self.stack.bees.put(event); };
                __ghost_object.onmouseup = __handler;
            }

            return true;
        };

        this.manage_stack_view = function(event_object, symbol, callback = null)
        {
            if (!utils_sys.validation.alpha.is_symbol(symbol))
                return false;

            if (!utils_sys.validation.misc.is_undefined(event_object.buttons) && event_object.buttons !== 1)
                return false;

            var __hive_id = self.settings.id(),
                __sliding_box = __hive_id + '_sliding_box';

            if (symbol === '-')
            {
                if (honeycomb_views.swiping() || honeycomb_views.visible() === 1)
                    return false;

                honeycomb_views.swiping(true);

                gfx.animation.swipe(__sliding_box, 1, 'right', honeycomb_views.dynamic_width(), 20, 5, 25, 
                                    function()
                                    {
                                        honeycomb_views.visible(honeycomb_views.visible() - 1);

                                        honeycomb_views.swiping(false);

                                        if (callback !== null)
                                            callback.apply();
                                    });
            }
            else if (symbol === '+')
            {
                if (honeycomb_views.swiping() || honeycomb_views.visible() === honeycomb_views.num())
                    return false;

                honeycomb_views.swiping(true);

                gfx.animation.swipe(__sliding_box, 1, 'left', honeycomb_views.dynamic_width(), 20, 5, 25, 
                                    function()
                                    {
                                        honeycomb_views.visible(honeycomb_views.visible() + 1);

                                        honeycomb_views.swiping(false);

                                        if (callback !== null)
                                            callback.apply();
                                    });
            }
            else
                return false;

            return true;
        };

        this.fixate_sliding_area = function()
        {
            var __hive_id = self.settings.id();

            utils_sys.objects.by_id(__hive_id + '_sliding_box').style.width = 
            (honeycomb_views.num() * honeycomb_views.dynamic_width() + 80) + 'px';

            utils_sys.objects.by_id(__hive_id + '_stack').style.width = honeycomb_views.dynamic_width() + 'px';

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

                if (!colony.is_bee(object) || !utils_int.validate_honeycomb_range(honeycomb_view))
                    return false;

                if (!honeycomb_views.list(honeycomb_view - 1).bees.add(object.settings.general.id()))
                    return false;

                if (!colony.add([object]))
                    return false;

                utils_int.draw_hive_bee(honeycomb_view, object.settings.general.id(), 0);

                object.settings.general.in_hive(true);

                return true;
            };

            this.remove = function(object, honeycomb_view)
            {
                if (is_init === false)
                    return false;

                if (!colony.is_bee(object) || !utils_int.validate_honeycomb_range(honeycomb_view))
                    return false;

                var __bee_id = object.settings.general.id();

                if (!utils_int.remove_bee(honeycomb_view, __bee_id))
                    return false;

                if (!colony.remove(__bee_id))
                    return false;

                object.settings.general.in_hive(false);

                return true;
            };

            this.put = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object) || (event_object.buttons !== 0 && last_mouse_button_clicked !== 1))
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
                            var __this_bee = swarm.status.active_bee();

                            honeycomb_views.list(i).bees.add(__this_bee);

                            swarm.bees.remove(__this_bee);

                            utils_int.draw_hive_bee(honeycomb_views.visible(), __this_bee, 0);

                            colony.get(__this_bee).settings.general.in_hive(true);

                            swarm.settings.active_bee(null);

                            return true;
                        }
                    }

                    return false;
                }

                return true;
            };

            this.expel = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event_object) || event_object.buttons !== 1)
                    return false;

                if (swarm.status.active_bee())
                {
                    for (var i = 0; i < honeycomb_views.num(); i++)
                    {
                        if (honeycomb_views.list(i).id === honeycomb_views.visible())
                        {
                            var __this_bee = swarm.status.active_bee();

                            honeycomb_views.list(i).bees.remove(__this_bee);

                            swarm.bees.insert(__this_bee);

                            colony.get(__this_bee).settings.general.in_hive(false);

                            swarm.settings.active_bee(__this_bee);

                            utils_int.set_z_index(__this_bee);

                            return true;
                        }
                    }

                    return false;
                }

                return true;
            };

            this.show = function(honeycomb_view)
            {
                if (is_init === false)
                    return false;

                var j = 0;

                if (colony.num() === 0 || !utils_int.validate_honeycomb_range(honeycomb_view))
                    return false;

                var __bees_num = honeycomb_views.list(honeycomb_view).bees.num(),
                    __bees = honeycomb_views.list(honeycomb_view).bees.list();

                for (var i = 0; i < __bees_num; i++)
                {
                    for (j = 0; j < colony.num(); j++)
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

        this.set_view = function(event_object, honeycomb_num)
        {
            if (is_init === false)
                return false;

            if (!utils_sys.validation.numerics.is_integer(honeycomb_num) || 
                honeycomb_num < 1 || honeycomb_num > honeycomb_views.num())
                return false;

            var __honeycomb_view_delta = honeycomb_num - honeycomb_views.visible();

            if (__honeycomb_view_delta > 0)
                return false;

            utils_int.manage_stack_view(event_object, '-', 
            function()
            {
                for (var i = 0; i < Math.abs(__honeycomb_view_delta); i++)
                    utils_int.manage_stack_view(event_object, '-');
            });

            return true;
        };

        this.toggle = function(status)
        {
            if (is_init === false)
                return false;

            if (status !== 'on' && status !== 'off')
                return false;

            var __hive_object = utils_sys.objects.by_id(self.settings.id());

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

            return stack_trace.bee_close;
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
                !utils_sys.validation.numerics.is_integer(bees_per_honeycomb) || bees_per_honeycomb < 4 || 
                !utils_sys.validation.numerics.is_integer(honeycombs_num) || honeycombs_num < 1)
                return false;

            is_init = true;

            self.settings.id('hive_' + random.generate());
            self.settings.container(container_id);
            self.settings.bees_per_honeycomb(bees_per_honeycomb);
            self.settings.left(left);
            self.settings.top(top);

            nature.theme(['hive']);
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

        swarm = matrix.get('swarm');
        forest = matrix.get('forest');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        colony = null,
        swarm = null,
        forest = null,
        nature = null,
        last_mouse_button_clicked = 0,
        utils_sys = new vulcan()
        gfx = new fx(),
        random = new pythia(),
        coords = new mouse_coords_model(),
        stack_trace = new stack_trace_model(),
        honeycomb_views = new honeycomb_view_model(),
        utils_int = new utilities();

    this.settings = new settings();
    this.stack = new stack();
    this.status = new status();
}
