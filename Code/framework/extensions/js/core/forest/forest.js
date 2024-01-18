/*
    GreyOS - Forest (Version: 2.2)

    File name: forest.js
    Description: This file contains the Forest - Desktops manager module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Forest
function forest()
{
    var self = this;

    function trace_keys_model()
    {
        this.trigger = 113;
        this.trigger_set = false;
    }

    function mouse_coords_model()
    {
        this.mouse_x = 0;
        this.mouse_y = 0;
    }

    function desktops_trace_model()
    {
        this.bee_drag = false;
        this.internal_bee_drag = false;
        this.bee_close = false;
    }

    function desktops_status_model()
    {
        var __desktops_num = 0,
            __desktops_list = [];

        function desktop_model()
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
            return __desktops_num;
        };

        this.list = function(index)
        {
            if (utils_sys.validation.misc.is_undefined(index))
                return __desktops_list;

            if (!utils_sys.validation.numerics.is_integer(index) || index < 0)
                return false;

            return __desktops_list[index];
        };

        this.add = function(desktop_id)
        {
            if (utils_sys.validation.alpha.is_symbol(desktop_id))
                return false;

            var __new_desktop = new desktop_model();

            __new_desktop.id = desktop_id;

            __desktops_list.push(__new_desktop);
            __desktops_num++;

            utils_int.draw_desktop(desktop_id);

            return true;
        };

        this.remove = function(desktop_id)
        {
            if (utils_sys.validation.alpha.is_symbol(desktop_id))
                return false;

            for (var i = 0; i < __desktops_num; i++)
            {
                if (__desktops_list[i].id === desktop_id)
                {
                    __desktops_list.splice(i, 1);

                    __desktops_num--;

                    utils_int.remove_desktop(desktop_id);

                    return true;
                }
            }

            return false;
        };

        this.clear = function()
        {
            if (__desktops_num === 0)
                return false;

            __desktops_num = 0;

            __desktops_list = [];

            utils_int.remove_all_desktops();

            return true;
        };
    }

    function utilities()
    {
        var me = this;

        function events_model()
        {
            this.attach = function(action)
            {
                var __forest_tb_object = utils_sys.objects.by_id(forest_id + '_trigger_bar'),
                    __handler = null;

                if (utils_sys.validation.misc.is_undefined(action))
                    return false;

                // Attach swipe animation to trigger bar
                if (action === 'swipe')
                {
                    __handler = function() { me.toggle_forest(); };
                    morpheus.run(forest_id, 'mouse', 'click', __handler, __forest_tb_object);
                }

                return true;
            };
        }

        function key_down_tracer(event_object)
        {
            key_control.scan(event_object);

            var __key_code = key_control.get();

            if (trace_keys.trigger === __key_code)
            {
                if (trace_keys.trigger_set === true)
                    return false;

                trace_keys.trigger_set = true;

                me.toggle_forest();
            }

            return true;
        }

        function key_up_tracer(event_object)
        {
            key_control.scan(event_object);

            var __key_code = key_control.get();

            if (trace_keys.trigger !== __key_code)
                return false;

            trace_keys.trigger_set = false;

            return true;
        }

        this.coords = function(event_object)
        {
            if (utils_sys.validation.misc.is_undefined(event_object))
                return false;

            coords.mouse_x = event_object.clientX + document.documentElement.scrollLeft + 
                             document.body.scrollLeft - document.body.clientLeft;
            coords.mouse_y = event_object.clientY + document.documentElement.scrollTop + 
                             document.body.scrollTop - document.body.clientTop;

            return true;
        };

        this.reset_desktops_trace = function()
        {
            desktops_trace.bee_drag = false;
            desktops_trace.internal_bee_drag = false;
            desktops_trace.bee_close = false;

            return true;
        };

        this.toggle_forest = function()
        {
            if (self.settings.is_open())
            {
                if (is_swiping === true)
                    return false;

                is_swiping = true;

                gfx.animation.swipe(forest_id, 1, 'left', 298, 0, 15, 15, 
                function() { self.settings.is_open(false); is_swiping = false; });
            }
            else
            {
                if (is_swiping === true)
                    return false;

                is_swiping = true;

                gfx.animation.swipe(forest_id, 1, 'right', 298, 0, 15, 15, 
                function() { self.settings.is_open(true); is_swiping = false; });
            }
        };

        this.toggle_hive = function()
        {
            var __hive = matrix.get('hive');

            if (!__hive.status.bee_drag())
                __hive.stack.toggle('off');

            return true;
        };

        this.draw_forest = function()
        {
            var __dynamic_object = null,
                __forest_object = utils_sys.objects.by_id(forest_id),
                __swarm_id = matrix.get('swarm').settings.id(),
                __handler = null;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'forest_ghost_bee');
            __dynamic_object.setAttribute('class', 'ghost_bee');

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', forest_id);
            __dynamic_object.setAttribute('class', 'forest');
            __dynamic_object.setAttribute('style', 'height: ' + (window.innerHeight - 87) + 'px;');

            __dynamic_object.innerHTML = '<div id="' + forest_id + '_trigger_bar" class="trigger_bar"></div>' + 
                                         '<div id="forest_top_list" class="top_list">' + 
                                         '  <a href="#" class="create_cat">' + 
                                                      'Create new desktop</a>' + 
                                         '</div>' + 
                                         '<div id="forest_cat_list" class="cat_list" style="height: ' + 
                                         (window.innerHeight - 260) + 'px;">' + 
                                         '  <div class="cat social">' + 
                                         '      <a href="#" style="background-color: #5C5C5C;" title="Sample desktop!">' + 
                                                                                                     'My desktop' + 
                                         '          <span style="background: #FFF; color: #5C5C5C;">7</span>' + 
                                         '      </a>' + 
                                         '      <ul class="expanded">' + 
                                         '          <li>' + 
                                         '              <a href="#">Social media<span>2</span></a>' + 
                                         '              <ul>' + 
                                         '                  <li><a href="#">Digg</a></li>' + 
                                         '                  <li><a href="#">Foursquare</a></li>' + 
                                         '              </ul>' + 
                                         '          </li>' + 
                                         '          <li>' + 
                                         '              <a href="#">Youtube' + 
                                         '                  <span>1</span>' + 
                                         '              </a>' + 
                                         '          </li>' + 
                                         '          <li class="create_new">' + 
                                         '              <a href="#">New desktop</a>' + 
                                         '          </li>' + 
                                         '      </ul>' + 
                                         '  </div>' + 
                                         '  <div class="cat apps">' + 
                                         '      <a href="#" title="Sample desktop!">Misc Apps' + 
                                         '          <span>16</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '  <div class="cat apps">' + 
                                         '      <a href="#" title="Sample desktop!">Educational Apps' + 
                                         '          <span>4</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '  <div class="cat apps">' + 
                                         '      <a href="#" title="Sample desktop!">e-Banking' + 
                                         '          <span>3</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '  <div class="cat apps">' + 
                                         '      <a href="#" title="Sample desktop!">Healthcare' + 
                                         '          <span>1</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '  <div class="cat apps">' + 
                                         '      <a href="#" title="Sample desktop!">3D Modelling Tools' + 
                                         '          <span>5</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '  <div class="cat games">' + 
                                         '      <a href="#" title="Sample desktop!">Games' + 
                                         '          <span>12</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '  <div class="cat apps">' + 
                                         '      <a href="#" title="Sample desktop!">Sound Engineering' + 
                                         '          <span>6</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '  <div class="cat apps">' + 
                                         '      <a href="#" title="Sample desktop!">Travel & Holidays' + 
                                         '          <span>0</span>' + 
                                         '      </a>' + 
                                         '  </div>' + 
                                         '</div>' + 
                                         '<div class="drawer" title="Sorry, drawer is not available yet...">' + 
                                         '  <input class="search_box" value="" placeholder="Search your drawer for apps...">' + 
                                         '  <a href="#">Drawer' + 
                                         '      <span>0</span>' + 
                                         '  </a>' + 
                                         '</div>';

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __handler = function(event) { me.coords(event); me.toggle_hive(); };
            morpheus.run(forest_id, 'mouse', 'mousemove', __handler, __forest_object);

            //utils_sys.objects.by_id(forest_id + '_stack').style.width = 
            //(utils_sys.graphics.pixels_value(__dynamic_object.style.width) - 84) + 'px';
            //utils_sys.objects.by_id(forest_id + '_stack').style.height = '85px';

            //__handler = function(event) { me.coords(event); me.show_ghost_bee(event, 0); };
            //morpheus.run(forest_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id(forest_id + '_stack'));

            //__handler = function() { me.reset_desktops_trace(); };
            //morpheus.run(forest_id, 'mouse', 'mouseup', __handler, utils_sys.objects.by_id(forest_id + '_stack'));

            //__handler = function(event) { me.hide_ghost_bee(event); };
            //morpheus.run(forest_id, 'mouse', 'mousemove', __handler, __forest_object);

            //__handler = function() { me.reset_desktops_trace(); };
            //morpheus.run(forest_id, 'mouse', 'mouseup', __handler, __forest_object);

            //__handler = function() { me.redraw_forest(); };
            //morpheus.run(forest_id, 'mouse', 'resize', __handler, window);

            me.events.attach('swipe');

            return true;
        };

        // this.redraw_forest = function()
        // {
        //     var __container_object = utils_sys.objects.by_id(self.settings.container()),
        //         __forest_object = utils_sys.objects.by_id(forest_id),
        //         __ghost_bee_object = utils_sys.objects.by_id('forest_ghost_bee');

        //     if (self.settings.is_open())
        //     {
        //         gfx.animation.swipe(forest_id, 1, 'left', 298, 0, 15, 15);
        //         self.settings.is_open(false);
        //     }

        //     morpheus.delete(forest_id, 'resize', window);

        //     __container_object.removeChild(__ghost_bee_object);
        //     __container_object.removeChild(__forest_object);

        //     me.draw_forest();

        //     return true;
        // };

        this.init_trace_keys = function()
        {
            var __handler = null;

            __handler = function(event) { key_down_tracer(event); };
            morpheus.run(forest_id, 'key', 'keydown', __handler, document);

            __handler = function(event) { key_up_tracer(event); };
            morpheus.run(forest_id, 'key', 'keyup', __handler, document);

            return true;
        };

        this.events = new events_model();
    }

    function interaction()
    {
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

        this.mouse = new mouse();
        this.key = new key();
    }

    this.trees = new function()
    {
        if (is_init === false)
            return false;

        
    };

    function settings()
    {
        var __id = null,
            __container = null,
            __left = 0,
            __top = 0,
            __is_open = false;

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

        this.is_open = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __is_open;

            if (!utils_sys.validation.misc.is_bool(val))
                return false;

            __is_open = val;

            return true;
        };

        this.set_stack_view = function(event, symbol, check_left_click)
        {
            if (is_init === false)
                return false;

            return utils_int.manage_stack_view(event, symbol, check_left_click);
        };
    }

    function status()
    {
        function desktops()
        {
            function num()
            {
                this.all = function()
                {
                    if (is_init === false)
                        return false;

                    return desktops_status.all_num();
                };

                this.id = function(val)
                {
                    if (is_init === false)
                        return false;

                    return desktops_status.num_for_id(val);
                };
            }

            this.names = function()
            {
                if (is_init === false)
                    return false;

                return desktops_status.name();
            };

            this.num = new num();
        }

        this.bees = function()
        {
            if (is_init === false)
                return false;

            var __all_bees = 0;

            for (var i = 0; i < desktops_status.num(); i++)
                __all_bees += desktops_status.list(i).bees.num();

            return __all_bees;
        };

        this.bee_drag = function()
        {
            if (is_init === false)
                return false;

            return desktops_trace.bee_drag;
        };

        this.bee_close = function()
        {
            if (is_init === false)
                return false;

            return desktops_trace.bee_close;
        };

        this.desktops = new desktops();
    }

    this.show = function(objects_array)
    {
        

        return true;
    };

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || 
            utils_sys.validation.alpha.is_symbol(container_id) || 
            utils_sys.objects.by_id(container_id) === null)
            return false;
        else
        {
            is_init = true;

            self.settings.id('forest_' + random.generate());
            self.settings.container(container_id);

            forest_id = self.settings.id();

            nature.theme(['forest']);
            nature.apply('new');

            utils_int.draw_forest();
            utils_int.init_trace_keys();
        }

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        colony = matrix.get('colony');
        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_swiping = false,
        forest_id = null,
        cosmos = null,
        matrix = null,
        dev_box = null,
        colony = null,
        morpheus = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        gfx = new fx(),
        key_control = new key_manager(),
        trace_keys = new trace_keys_model(),
        coords = new mouse_coords_model(),
        desktops_trace = new desktops_trace_model(),
        desktops_status = new desktops_status_model(),
        utils_int = new utilities();

    this.settings = new settings();
    this.interaction = new interaction();
    this.status = new status();
}
