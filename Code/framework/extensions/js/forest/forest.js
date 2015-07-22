/*

    GreyOS Inc. - Forest (Desktops container & manager for GreyOS)
    
    File name: forest.js (Version: 1.7)
    Description: This file contains the Forest - Desktops container & manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Forest
function forest()
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

        this.reset_desktops_trace = function()
        {

            desktops_trace.bee_drag = false;
            desktops_trace.internal_bee_drag = false;
            desktops_trace.bee_close = false;

            return true;

        };

        this.draw_forest = function()
        {

            var __dynamic_object = null,
                __nature = matrix.get('nature'),
                __forest_id = self.settings.id(),
                __forest_object = vulcan.objects.by_id(__forest_id),
                __swarm_id = matrix.get('swarm').settings.id(),
                __handler = null;

            __nature.themes(['forest']);
            __nature.apply();

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'forest_ghost_bee');
            __dynamic_object.setAttribute('class', 'ghost_bee');

            vulcan.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __forest_id);
            __dynamic_object.setAttribute('class', 'forest');
            __dynamic_object.setAttribute('style', 'height: ' + (window.innerHeight - 87) + 'px;');

            __dynamic_object.innerHTML = '<div class="trigger_bar"></div>' + 
                                         '<div id="forest_top_list" class="top_list">' + 
                                         '  <a href="#" class="create_cat" ' + 
                                               'title="Sorry, this feature is not available in the DEMO!">Create new desktop</a>' + 
                                         '</div>' + 
                                         '<div id="forest_cat_list" class="cat_list" style="height: ' + (window.innerHeight - 260) + 'px;">' + 
                                         '  <div class="cat social">' + 
                                         '      <a href="#" style="background-color: #5C5C5C;" title="Sample desktop!">My desktop' + 
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
                                         '<div class="drawer" title="Sorry, drawer is not available in the DEMO!">' + 
                                         '  <input class="search_box" value="" placeholder="Search your drawer for apps...">' + 
                                         '  <a href="#">Drawer' + 
                                         '      <span>0</span>' + 
                                         '  </a>' + 
                                         '</div>';

            vulcan.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            //vulcan.objects.by_id(__forest_id + '_stack').style.width = (vulcan.graphics.pixels_value(__dynamic_object.style.width) - 84) + 'px';
            //vulcan.objects.by_id(__forest_id + '_stack').style.height = '85px';

            //__handler = function(event) { me.coords(event); me.show_ghost_bee(event, 0); };
            //vulcan.objects.by_id(__forest_id + '_stack').onmousemove = __handler;

            //__handler = function() { me.reset_desktops_trace(); };
            //vulcan.objects.by_id(__forest_id + '_stack').onmouseup = __handler;

            //__handler = function(event) { me.hide_ghost_bee(event); };
            //vulcan.events.attach(__forest_id, __forest_object, 'mousemove', __handler);

            //__handler = function() { me.reset_desktops_trace(); };
            //vulcan.events.attach(__forest_id, __forest_object, 'mouseup', __handler);

            me.events.attach(1);

            return true;

        };

        function events()
        {

            this.attach = function(action)
            {

                if (!vulcan.validation.numerics.is_number(action) || action > 1 || action < 0)
                    return false;

                // Attach Swipe Animation to Forest's Trigger Bar.
                if (action === 1)
                {

                    vulcan.events.attach(self.settings.id(), 
                                         vulcan.objects.selectors.first('#' + self.settings.id() + ' .trigger_bar' ), 'click', 
                    function()
                    {

                        if (self.settings.is_open())
                        {

                            fx.animation.swipe(self.settings.id(), 1, 'left', 298, 15, 15);

                            self.settings.is_open(false);

                        }

                        else
                        {

                            fx.animation.swipe(self.settings.id(), 1, 'right', 298, 15, 15);

                            self.settings.is_open(true);

                        }

                    });

                }

                return true;

            };

        }

        this.events = new events();

    }

    function mouse_coords()
    {

        this.mouse_x = 0;
        this.mouse_y = 0;

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

                if (vulcan.validation.misc.is_undefined(val))
                    return false;

                __key = val;

                return true;

            };

        }

        this.mouse = new mouse();
        this.key = new key();

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

            return __desktops_num;

        };

        this.list = function(index)
        {

            if (vulcan.validation.misc.is_undefined(index))
                return __desktops_list;

            if (!vulcan.validation.numerics.is_integer(index) || index < 0)
                return false;

            return __desktops_list[index];

        };

        this.add = function(desktop_id)
        {

            if (vulcan.validation.alpha.is_symbol(desktop_id))
                return false;

            var __new_desktop = new desktop_model();

            __new_desktop.id = desktop_id;

            __desktops_list.push(__new_desktop);

            __desktops_num++;

            utils.draw_desktop(desktop_id);

            return true;

        };

        this.remove = function(desktop_id)
        {

            if (vulcan.validation.alpha.is_symbol(desktop_id))
                return false;

            for (var i = 0; i < __desktops_num; i++)
            {

                if (__desktops_list[i].id === desktop_id)
                {

                    __desktops_list.splice(i, 1);

                    __desktops_num--;

                    utils.remove_desktop(desktop_id);

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

            utils.remove_all_desktops();

            return true;

        };

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

        this.is_open = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __is_open;

            if (!vulcan.validation.misc.is_bool(val))
                return false;

            __is_open = val;

            return true;

        };

        this.set_stack_view = function(event, symbol, check_left_click)
        {

            if (is_init === false)
                return false;

            return utils.manage_stack_view(event, symbol, check_left_click);

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

    this.init = function(container_id)
    {

        if (is_init === true)
            return false;

        if (vulcan.validation.misc.is_undefined(container_id) || vulcan.validation.alpha.is_symbol(container_id) || 
            vulcan.objects.by_id(container_id) === null)
            return false;

        else
        {

            is_init = true;

            var __pythia = matrix.get('pythia');

            fx = dev_box.get('fx');
            fx.init(cosmos);

            self.settings.id('forest_' + __pythia.generate());
            self.settings.container(container_id);

            utils.draw_forest();

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
        fx = null,
        coords = new mouse_coords(),
        desktops_trace = new desktops_trace_model(),
        desktops_status = new desktops_status_model(),
        utils = new utilities();

    this.settings = new settings();
    this.interaction = new interaction();
    this.status = new status();

}
