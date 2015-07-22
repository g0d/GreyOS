/*

    GreyOS Inc. - Hive (Bees stack bar for GreyOS)
    
    File name: hive.js (Version: 2.0)
    Description: This file contains the Hive - Bees stack bar extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Hive
function hive()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.coords = function(event_object)
        {

            if (vulcan.validation.misc.is_undefined(event_object))
                return false;

            coords.mouse_x = event_object.clientX + document.documentElement.scrollLeft + document.body.scrollLeft - 
                             document.body.clientLeft;
            coords.mouse_y = event_object.clientY + document.documentElement.scrollTop + document.body.scrollTop - 
                             document.body.clientTop;

            return true;

        };

        this.reset_stack_trace = function()
        {

            stack_trace.bee_drag = false;
            stack_trace.internal_bee_drag = false;
            stack_trace.bee_close = false;

            return true;

        };


        this.set_bees_per_honeycomb = function(current_stack_width)
        {

            var __model_stack_width = 1012,
                __bees_num = 0;

            if (current_stack_width !== __model_stack_width)
            {

                __bees_num = parseInt((8 * current_stack_width) / __model_stack_width, 10);

                if (__bees_num % 2 !== 0)
                    __bees_num--;

                if (self.settings.bees_per_honeycomb() > __bees_num && __bees_num >= 4)
                    self.settings.bees_per_honeycomb(__bees_num);

            }

            return true;

        };

        this.validate_honeycomb_range = function(val)
        {

            if (!vulcan.validation.numerics.is_integer(val) || val < 1 || val > honeycomb_views.num())
                return false;

            return true;

        };

        this.show_hive_bee = function(honeycomb_view, bees_colony, index)
        {

            var __new_bee = bees_colony.list(index);

            new __new_bee.show();

            utils.draw_hive_bee(honeycomb_view, __new_bee.settings.general.id(), 0);

            return true;

        };

        this.show_ghost_bee = function(event_object, mode)
        {

            if (vulcan.validation.misc.is_undefined(event_object) || event_object.button !== 0 || mode < 0 || mode > 1)
                return false;

            if (swarm.status.active_bee())
            {

                for (var n = 0; n < honeycomb_views.num(); n++)
                {

                    if (honeycomb_views.list(n).id === honeycomb_views.visible())
                    {

                        if (honeycomb_views.list(n).bees.num() === self.settings.bees_per_honeycomb() && 
                            stack_trace.internal_bee_drag === false)
                        {

                            stack_trace.bee_drag = false;

                            alert('Sorry, maximum number of windows in this stack bar!');

                        }

                        else
                        {

                            var __this_bee = swarm.status.active_bee(),
                                __hive_bee = vulcan.objects.by_id('hive_bee_' + __this_bee),
                                __honeycomb = vulcan.objects.by_id('honeycomb_' + honeycomb_views.visible()),
                                __bee_x = self.stack.mouse.x() + 10 + vulcan.graphics.pixels_value(vulcan.objects.by_id('ghost_bee').style.width),
                                __bee_y = self.stack.mouse.y() + 10 + vulcan.graphics.pixels_value(vulcan.objects.by_id('ghost_bee').style.height),
                                __stack_x_pos = self.settings.left() + 
                                                vulcan.graphics.pixels_value(vulcan.objects.by_id(self.settings.id()).style.width) - 200,
                                __stack_y_pos = self.settings.top() + 
                                                vulcan.graphics.pixels_value(vulcan.objects.by_id(self.settings.id()).style.height) - 40;

                            if (mode === 1)
                            {

                                self.stack.bees.expel(event_object);

                                __honeycomb.removeChild(__hive_bee);

                            }

                            me.draw_hive_bee(honeycomb_views.visible(), __this_bee, 1);

                            if (__bee_x <= __stack_x_pos && __bee_y <= __stack_y_pos)
                            {

                                vulcan.objects.by_id('ghost_bee').style.left = self.stack.mouse.x() + 10 + 'px';
                                vulcan.objects.by_id('ghost_bee').style.top = self.stack.mouse.y() + 10 + 'px';

                            }

                            else
                            {

                                if (!vulcan.objects.by_id('ghost_bee').style.top)
                                    vulcan.objects.by_id('ghost_bee').style.display = 'none';

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

            if (vulcan.validation.misc.is_undefined(event_object) || event_object.button !== 0)
                return false;

            var __this_bee = swarm.status.active_bee();

            if (__this_bee)
            {

                var __this_hive_bee = colony.get(__this_bee);

                if (vulcan.objects.by_id(__this_bee) === null)
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

                    __this_hive_bee.drone.use('enable_drag', 'utils.coords(event, 2); utils.manage_drag_status();');
                    __this_hive_bee.drone.run('enable_drag');

                    __this_hive_bee.gui.position.top(__this_hive_bee.gui.position.top() + __this_hive_bee.gui.size.height() - 85);

                    vulcan.objects.by_id(__this_bee).style.opacity = '1.0';

                }

                vulcan.objects.by_id(__this_bee).style.display = 'block';
                vulcan.objects.by_id('ghost_bee').style.display = 'none';

                if (__this_hive_bee.status.gui.casement_deployed())
                    vulcan.objects.by_id(__this_bee + '_casement').style.display = 'block';

                return true;

            }

            return false;

        };

        this.remove_bee = function(honeycomb_id, bee_id)
        {

            var __honeycomb = vulcan.objects.by_id('honeycomb_' + honeycomb_id),
                __bee = vulcan.objects.by_id('hive_bee_' + bee_id);

            for (var n = 0; n < honeycomb_views.num(); n++)
            {

                if (honeycomb_views.list(n).id === honeycomb_id)
                {

                    __honeycomb.removeChild(__bee);

                    honeycomb_views.list(n).bees.remove(bee_id);

                    colony.get(bee_id).settings.general.in_hive(false);

                    return true;

                }

            }

            return false;

        };

        this.remove_all_bees = function(honeycomb_id)
        {

            var __honeycomb = vulcan.objects.by_id('honeycomb_' + honeycomb_id);

            while (__honeycomb.hasChildNodes())
            {

                __honeycomb.removeChild(__honeycomb.lastChild);

                honeycomb_views.list(honeycomb_id).bees.remove(__honeycomb.lastChild.id());

            }

            return true;

        };

        this.draw_honeycomb = function(honeycomb_id)
        {

            var __new_honeycomb = null,
                __hive_id = self.settings.id(),
                __honeycomb_id = 'honeycomb_' + honeycomb_id;

            __new_honeycomb = document.createElement('div');

            __new_honeycomb.setAttribute('id', __honeycomb_id);
            __new_honeycomb.setAttribute('class', 'honeycomb');
            __new_honeycomb.setAttribute('style', 'width: ' + 
                                        (vulcan.graphics.pixels_value(vulcan.objects.by_id(__hive_id + '_stack').style.width) - 20) + 'px;');

            vulcan.objects.by_id(__hive_id + '_stack').appendChild(__new_honeycomb);

            vulcan.objects.by_id(__honeycomb_id).onmouseup = function(event) { self.stack.bees.put(event); };

            return true;

        };

        this.remove_honeycomb = function(honeycomb_id)
        {

            var __hive = vulcan.objects.by_id(self.settings.id()),
                __honeycomb = vulcan.objects.by_id('honeycomb_' + honeycomb_id);

            __hive.removeChild(__honeycomb);

            return true;

        };

        this.remove_all_honeycombs = function()
        {

            var __hive = vulcan.objects.by_id(self.settings.id());

            while (__hive.hasChildNodes())
                __hive.removeChild(__hive.lastChild);                

            return true;

        };

        this.draw_hive = function(left, top)
        {

            var __dynamic_object = null,
                __nature = matrix.get('nature'),
                __hive_id = self.settings.id(),
                __swarm_id = swarm.settings.id(),
                __swarm_object = vulcan.objects.by_id(__swarm_id),
                __current_stack_width = 0,
                __handler = null;

            __nature.themes(['hive']);
            __nature.apply();

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'ghost_bee');
            __dynamic_object.setAttribute('class', 'ghost_bee');

            vulcan.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __hive_id);
            __dynamic_object.setAttribute('class', 'hive');
            __dynamic_object.setAttribute('style', 'top: ' + top + 'px; ' + 
                                                   'left: ' + left + 'px; ' + 
                                                   'right: ' + left + 'px; ' + 
                                                   'width: ' + (document.body.clientWidth - 270) + 'px; ' + 
                                                   'height: 85px;');

            __dynamic_object.innerHTML = '<div id="' + __hive_id + '_previous_arrow" class="stack_arrow left_arrow"></div>' + 
                                         '<div id="' + __hive_id + '_stack" class="stack_bar"></div>' + 
                                         '<div id="' + __hive_id + '_next_arrow" class="stack_arrow right_arrow"></div>';

            vulcan.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __current_stack_width = vulcan.graphics.pixels_value(__dynamic_object.style.width);

            me.set_bees_per_honeycomb(__current_stack_width);

            vulcan.objects.by_id(__hive_id + '_stack').style.width = (vulcan.graphics.pixels_value(__dynamic_object.style.width) - 84) + 'px';
            vulcan.objects.by_id(__hive_id + '_stack').style.height = '85px';

            __handler = function(event) { me.coords(event); me.show_ghost_bee(event, 0); };
            vulcan.objects.by_id(__hive_id + '_stack').onmousemove = __handler;

            __handler = function() { me.reset_stack_trace(); };
            vulcan.objects.by_id(__hive_id + '_stack').onmouseup = __handler;

            __handler = function(event) { me.hide_ghost_bee(event); };
            vulcan.events.attach(__hive_id, __swarm_object, 'mousemove', __handler);

            __handler = function() { me.reset_stack_trace(); };
            vulcan.events.attach(__hive_id, __swarm_object, 'mouseup', __handler);

            // vulcan.objects.by_id(__hive_id + '_previous_arrow').onmouseup = function(event) { me.manage_stack_view(event, '-'); };
            // vulcan.objects.by_id(__hive_id + '_next_arrow').onmouseup = function(event) { me.manage_stack_view(event, '+'); };

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

                vulcan.objects.by_id('ghost_bee').style.display = 'none';
                vulcan.objects.by_id('ghost_bee').innerHTML = '';

                vulcan.objects.by_id('honeycomb_' + honeycomb_id).appendChild(__dynamic_object);
 
                if (vulcan.objects.by_id(bee_id) !== null)
                {

                    vulcan.objects.by_id(bee_id).style.display = 'none';
                    vulcan.objects.by_id(bee_id + '_casement').style.display = 'none';

                }

                __handler = function() { return false; };
                __dynamic_object.onselectstart = __handler;

                __handler = function(event)
                            {

                                if (stack_trace.bee_drag === true || stack_trace.bee_close === true)
                                    return false;

                                stack_trace.internal_bee_drag = true;

                                swarm.settings.active_bee(bee_id);

                                me.show_ghost_bee(event, 1);

                                event.preventDefault();

                            };
                __dynamic_object.onmousedown = __handler;

                __handler = function(event)
                            {

                                if (stack_trace.bee_drag === true || __bee_object.status.gui.closed())
                                    return false;

                                __bee_object.gui.actions.close(event);

                                me.remove_bee(honeycomb_id, bee_id);

                                stack_trace.bee_close = true;

                            };
                __dynamic_object.childNodes[2].onmousedown = __handler;

            }

            else
            {

                __ghost_object = vulcan.objects.by_id('ghost_bee');

                __ghost_object.innerHTML = '';
                __ghost_object.appendChild(__dynamic_object);
                __ghost_object.style.display = 'block';

                if (vulcan.objects.by_id(bee_id) !== null)
                {

                    vulcan.objects.by_id(bee_id).style.display = 'none';
                    vulcan.objects.by_id(bee_id + '_casement').style.display = 'none';

                }

                __handler = function(event) { me.reset_stack_trace(); self.stack.bees.put(event); };
                __ghost_object.onmouseup = __handler;

            }

            return true;

        };

        this.manage_stack_view = function(event_object, symbol, check_left_click)
        {

            if (vulcan.validation.misc.is_undefined(event_object) || 
                !vulcan.validation.alpha.is_symbol(symbol) || 
                !vulcan.validation.misc.is_bool(check_left_click))
                return false;

            if (check_left_click === true && event_object.button !== 0)
                return false;

            if (symbol === '-')
                honeycomb_views.visible(honeycomb_views.visible() - 1);

            else if (symbol === '+')
                honeycomb_views.visible(honeycomb_views.visible() + 1);

            else
                return false;

            return true;

        };

        this.set_z_index = function(bee_id)
        {

            if (vulcan.validation.misc.is_undefined(bee_id) || vulcan.validation.alpha.is_symbol(bee_id))
                return false;

            var __bee_object = colony.get(bee_id),
                __z_index = swarm.status.z_index();

            swarm.settings.z_index(__z_index + 1);

            __bee_object.gui.position.z_index(__z_index + 1);

            if (vulcan.objects.by_id(bee_id) !== null)
                vulcan.objects.by_id(bee_id).style.zIndex = __z_index + 1;

            return true;

        };

    }

    function mouse_coords()
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
            __visible_honeycomb = 1;

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

                    if (vulcan.validation.misc.is_undefined(index))
                        return __bees_list;

                    if (!vulcan.validation.numerics.is_integer(index) || index < 0)
                        return false;

                    return __bees_list[index];

                };

                this.add = function(bee_id)
                {

                    if (vulcan.validation.alpha.is_symbol(bee_id))
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

                    if (vulcan.validation.alpha.is_symbol(bee_id))
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

            if (vulcan.validation.misc.is_undefined(index))
                return __honeycombs_list;

            if (!vulcan.validation.numerics.is_integer(index) || index < 0)
                return false;

            return __honeycombs_list[index];

        };

        this.add = function(honeycomb_id)
        {

            if (vulcan.validation.alpha.is_symbol(honeycomb_id))
                return false;

            var __new_honeycomb = new honeycomb_model();

            __new_honeycomb.id = honeycomb_id;

            __honeycombs_list.push(__new_honeycomb);

            __honeycombs_num++;

            utils.draw_honeycomb(honeycomb_id);

            return true;

        };

        this.remove = function(honeycomb_id)
        {

            if (vulcan.validation.alpha.is_symbol(honeycomb_id))
                return false;

            for (var i = 0; i < __honeycombs_num; i++)
            {

                if (__honeycombs_list[i].id === honeycomb_id)
                {

                    __honeycombs_list.splice(i, 1);

                    __honeycombs_num--;

                    utils.remove_honeycomb(honeycomb_id);

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

            utils.remove_all_honeycombs();

            return true;

        };

        this.visible = function(val)
        {

            if (vulcan.validation.misc.is_undefined(val))
                return __visible_honeycomb;

            if (!utils.validate_honeycomb_range(val))
                return false;

            __visible_honeycomb = val;

            return true;

        };

    }

    function settings()
    {

        var __id = null,
            __container = null,
            __bees_per_honeycomb = 4,
            __left = 0,
            __top = 0;

        this.id = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __id;

            if (vulcan.validation.alpha.is_symbol(val))
                return false;

            __id = val;

            return true;

        };

        this.container = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __container;

            if (vulcan.validation.alpha.is_symbol(val))
                return false;

            __container = val;

            return true;

        };

        this.bees_per_honeycomb = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __bees_per_honeycomb;

            if (!vulcan.validation.numerics.is_integer(val) || val < 4)
                return false;

            __bees_per_honeycomb = val;

            return true;

        };

        this.left = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __left;

            if (!vulcan.validation.numerics.is_integer(val) || val < 0)
                return false;

            __left = val;

            return true;

        };

        this.top = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __top;

            if (!vulcan.validation.numerics.is_integer(val) || val < 0)
                return false;

            __top = val;

            return true;

        };

        this.set_stack_view = function(event, symbol, check_left_click)
        {

            if (is_init === false)
                return false;

            return utils.manage_stack_view(event, symbol, check_left_click);

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

                if (!vulcan.validation.models.is_bee(object) || !utils.validate_honeycomb_range(honeycomb_view))
                    return false;

                if (!honeycomb_views.list(honeycomb_view - 1).bees.add(object.settings.general.id()))
                    return false;

                if (!colony.add([object]))
                    return false;

                utils.draw_hive_bee(honeycomb_view, object.settings.general.id(), 0);

                object.settings.general.in_hive(true);

                return true;

            };

            this.remove = function(object, honeycomb_view)
            {

                if (is_init === false)
                    return false;

                if (!vulcan.validation.models.is_bee(object) || !utils.validate_honeycomb_range(honeycomb_view))
                    return false;

                var __bee_id = object.settings.general.id();

                if (!utils.remove_bee(honeycomb_view, __bee_id))
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

                if (vulcan.validation.misc.is_undefined(event_object) || event_object.button !== 0)
                    return false;

                if (swarm.status.active_bee())
                {

                    for (var n = 0; n < honeycomb_views.num(); n++)
                    {

                        if (honeycomb_views.list(n).id === honeycomb_views.visible() && 
                            honeycomb_views.list(n).bees.num() < self.settings.bees_per_honeycomb())
                        {

                            var __this_bee = swarm.status.active_bee();

                            honeycomb_views.list(n).bees.add(__this_bee);

                            swarm.bees.remove(__this_bee);

                            utils.draw_hive_bee(honeycomb_views.visible(), __this_bee, 0);

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

                if (vulcan.validation.misc.is_undefined(event_object) || event_object.button !== 0)
                    return false;

                if (swarm.status.active_bee())
                {

                    for (var n = 0; n < honeycomb_views.num(); n++)
                    {

                        if (honeycomb_views.list(n).id === honeycomb_views.visible())
                        {

                            var __this_bee = swarm.status.active_bee();

                            honeycomb_views.list(n).bees.remove(__this_bee);

                            swarm.bees.insert(__this_bee);

                            colony.get(__this_bee).settings.general.in_hive(false);

                            swarm.settings.active_bee(__this_bee);

                            utils.set_z_index(__this_bee);

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

                var n = 0;

                if (colony.num() === 0 || !utils.validate_honeycomb_range(honeycomb_view))
                    return false;

                var __bees_num = honeycomb_views.list(honeycomb_view).bees.num(),
                    __bees = honeycomb_views.list(honeycomb_view).bees.list();

                for (var i = 0; i < __bees_num; i++)
                {

                    for (n = 0; n < colony.num(); n++)
                    {

                        if (colony.list(n).settings.general.id() === __bees[i])
                            utils.show_hive_bee(honeycomb_view, colony, n);

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

                if (vulcan.validation.misc.is_undefined(val))
                    return false;

                __key = val;

                return true;

            };

        }

        this.toggle = function(status)
        {

            if (status !== 'on' && status !== 'off')
                return false;

            var __hive_object = vulcan.objects.by_id(self.settings.id()),
                __z_index = swarm.status.z_index();

            if (status === 'on')
            {

                __hive_object.style.zIndex = __z_index;
                __hive_object.style.visibility = 'visible';

            }

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

                for (var n = 0; n < honeycomb_views.num(); n++)
                    __bees_num += honeycomb_views.list(n).bees.num();

                return __bees_num;

            };

            this.list = function()
            {

                if (is_init === false)
                    return false;

                var __bees_list = [];

                for (var n = 0; n < honeycomb_views.num(); n++)
                    __bees_list.push(honeycomb_views.list(n).bees.list());

                return __bees_list;

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

        if (vulcan.validation.misc.is_undefined(container_id) || 
            vulcan.validation.misc.is_undefined(left) || vulcan.validation.misc.is_undefined(top) || 
            vulcan.validation.misc.is_undefined(bees_per_honeycomb) || vulcan.validation.misc.is_undefined(honeycombs_num))
            return false;

        else
        {

            if (vulcan.validation.alpha.is_symbol(container_id) || vulcan.objects.by_id(container_id) === null || 
                !vulcan.validation.numerics.is_integer(left) || left < 0 || 
                !vulcan.validation.numerics.is_integer(top) || top < 0 || 
                !vulcan.validation.numerics.is_integer(bees_per_honeycomb) || bees_per_honeycomb < 4 || 
                !vulcan.validation.numerics.is_integer(honeycombs_num) || honeycombs_num < 1)
                return false;

            is_init = true;

            var __pythia = matrix.get('pythia');

            fx = dev_box.get('fx');
            fx.init(cosmos);

            self.settings.id('hive_' + __pythia.generate());
            self.settings.container(container_id);
            self.settings.bees_per_honeycomb(bees_per_honeycomb);
            self.settings.left(left);
            self.settings.top(top);

            if (!utils.draw_hive(left, top))
            {

                is_init = false;

                return false;

            }

            for (var i = 0; i < honeycombs_num; i++)
                honeycomb_views.add(i + 1);

        }

        return true;

    };

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');
        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        colony = matrix.get('colony');
        swarm = matrix.get('swarm');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        dev_box = null,
        colony = null,
        swarm = null,
        fx = null,
        coords = new mouse_coords(),
        stack_trace = new stack_trace_model(),
        honeycomb_views = new honeycomb_view_model(),
        utils = new utilities();

    this.settings = new settings();
    this.stack = new stack();
    this.status = new status();

}
