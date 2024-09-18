/*
    GreyOS - Swarm (Version: 3.3)

    File name: swarm.js
    Description: This file contains the Swarm - Bees action area module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Swarm
function swarm()
{
    var self = this;

    function mouse_coords_model()
    {
        this.mouse_x = 0;
        this.mouse_y = 0;
    }

    function bees_info_model()
    {
        this.num = 0;
        this.list = [];
    }

    function bee_status_model()
    {
        this.active_bee_id = null;
        this.boxified = false;
        this.stacked = false;
        this.z_index = 0;
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

            coords.mouse_x = __client_x + document.documentElement.scrollLeft + 
                             document.body.scrollLeft - document.body.clientLeft -
                             self.settings.left();
            coords.mouse_y = __client_y + document.documentElement.scrollTop + 
                             document.body.scrollTop - document.body.clientTop - 
                             self.settings.top();

            return true;
        };

        this.show_bee = function(bees_colony, index)
        {
            if (!bees_colony.list(index).status.system.in_hive())
                new bees_colony.list(index).run();

            return true;
        };

        this.toggle_hive = function()
        {
            var __hive = matrix.get('hive');

            if (timer !== null)
                clearTimeout(timer);

            if ((coords.mouse_y + self.settings.top()) >= (window.innerHeight - 
                                                           (document.documentElement.scrollTop + 
                                                            document.body.scrollTop - document.body.clientTop) - 75))
            {
                if (self.status.active_bee() !== null)
                {
                    if (!colony.get(self.status.active_bee()).status.gui.resizing())
                        __hive.stack.toggle('on');
                }
                else
                    timer = setTimeout(function() { __hive.stack.toggle('on'); }, 1000);
            }
            else
                __hive.stack.toggle('off');

            return true;
        };

        this.draw = function(left, top, right, bottom)
        {
            var __swarm_object = null,
                __dynamic_object = null,
                __handler = null;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', swarm_id);
            __dynamic_object.setAttribute('class', 'swarm');
            __dynamic_object.setAttribute('style', 'left: ' + left + 'px; ' + 
                                                   'top: ' + top + 'px; ' + 
                                                   'width: ' + right + 'px; ' + 
                                                   'height: ' + bottom + 'px;');

            __dynamic_object.innerHTML = '<div id="' + swarm_id + '_bee_resize_tooltip" class="bee_resize_tooltip"></di>';

            utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);

            resize_tooltip = utils_sys.objects.by_id(swarm_id + '_bee_resize_tooltip');

            __swarm_object = utils_sys.objects.by_id(swarm_id);

            __handler = function(event) { me.coords(event); me.toggle_hive(); };
            morpheus.run(swarm_id, 'mouse', 'mousemove', __handler, __swarm_object);
            morpheus.run(swarm_id, 'touch', 'touchmove', __handler, __swarm_object);

            return true;
        };
    }

    function settings()
    {
        var __id = null,
            __container = null,
            __left = 0,
            __top = 0,
            __right = window.innerWidth,
            __bottom = window.innerHeight;

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

        this.right = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __right;

            if (!utils_sys.validation.numerics.is_integer(val) || val < 0 || val < __left)
                return false;

            __right = val;

            return true;
        };

        this.bottom = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __bottom;

            if (!utils_sys.validation.numerics.is_integer(val) || val < 0 || val < __top)
                return false;

            __bottom = val;

            return true;
        };

        this.active_bee = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_object(val) && val !== null)
                return false;

            bees_status.active_bee_id = val;

            return true;
        };

        this.boxified = function(val)
        {
            if (is_init === false)
                return false;

            if (!utils_sys.validation.misc.is_bool(val))
                return false;

            bees_status.boxified = val;

            return true;
        };

        this.stacked = function(val)
        {
            if (is_init === false)
                return false;

            if (!utils_sys.validation.misc.is_bool(val))
                return false;

            bees_status.stacked = val;

            return true;
        };

        this.z_index = function(val)
        {
            if (is_init === false)
                return false;

            if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
                return false;

            bees_status.z_index = val;

            return true;
        };
    }

    function area()
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

    function bees()
    {
        this.num = function()
        {
            if (is_init === false)
                return false;

            return bees_info.num;
        };

        this.list = function()
        {
            if (is_init === false)
                return false;

            return bees_info.list;
        };

        this.insert = function(object)
        {
            if (is_init === false)
                return false;

            if (!colony.is_bee(object) || object.status.system.in_hive())
                return false;

            var __bee_id = object.settings.general.id();

            if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
                return false;

            if (!colony.add([object]))
                return false;

            bees_info.list.push(object.settings.general.id());
            bees_info.num++;

            return true;
        };

        this.remove = function(object)
        {
            if (is_init === false)
                return false;

            if (bees_info.num === 0)
                return false;

            if (!colony.is_bee(object))
                return false;

            var __bee_id = object.settings.general.id();

            if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
                return false;

            for (var i = 0; i < bees_info.num; i++)
            {
                if (bees_info.list[i] === __bee_id)
                {
                    colony.remove(__bee_id);

                    bees_info.list.splice(i, 1);
                    bees_info.num--;

                    return true;
                }
            }

            return false;
        };

        this.clear = function()
        {
            if (is_init === false)
                return false;

            if (bees_info.num === 0)
                return false;

            bees_info.num = 0;
            bees_info.list = [];

            return true;
        };

        this.show = function(objects_array)
        {
            if (is_init === false)
                return false;

            if (colony.num() === 0)
                return false;

            if (utils_sys.validation.misc.is_undefined(objects_array))
            {
                for (var i = 0; i < colony.num(); i++)
                    utils_int.show_bee(colony, i);
            }
            else
            {
                if (!utils_sys.validation.misc.is_array(objects_array))
                    return false;

                var __objects_num = objects_array.length;

                if (__objects_num === 0 || colony.num() < __objects_num)
                    return false;

                for (var i = 0; i < __objects_num; i++)
                {
                    for (var j = 0; j < colony.num(); j++)
                    {
                        if (colony.list(j).settings.general.id() === objects_array[i].settings.general.id())
                            utils_int.show_bee(colony, j);
                    }
                }
            }

            return true;
        };
    }

    function status()
    {
        this.active_bee = function()
        {
            if (is_init === false)
                return false;

            return bees_status.active_bee_id;
        };

        this.boxified = function()
        {
            if (is_init === false)
                return false;

            return bees_status.boxified;
        };

        this.stacked = function()
        {
            if (is_init === false)
                return false;

            return bees_status.stacked;
        };

        this.z_index = function()
        {
            if (is_init === false)
                return false;

            return bees_status.z_index;
        };
    }

    this.resize_tooltip = function(bee, active = false)
    {
        if (is_init === false)
            return false;

        if (!colony.is_bee(bee))
            return false;

        if (active === false)
            resize_tooltip.style.visibility = 'hidden';
        else
        {
            resize_tooltip.style.visibility = 'visible';
            resize_tooltip.style.zIndex = bees_status.z_index + 1;

            if ((bee.gui.position.left() + bee.status.gui.size.width()) > (self.settings.right() - 80) || 
                (bee.gui.position.top() + bee.status.gui.size.height()) > (self.settings.bottom() - 20))
            {
                resize_tooltip.style.left = bee.gui.position.left() + bee.status.gui.size.width() - 92 + 'px';
                resize_tooltip.style.top = bee.gui.position.top() + bee.status.gui.size.height() - 50 + 'px';
            }
            else
            {
                resize_tooltip.style.left = bee.gui.position.left() + bee.status.gui.size.width() + 10 + 'px';
                resize_tooltip.style.top = bee.gui.position.top() + bee.status.gui.size.height() + 10 + 'px';
            }
            
            resize_tooltip.innerHTML = bee.status.gui.size.width() + ' x ' + bee.status.gui.size.height();
        }

        return true;
    };

    this.reset = function(container_id, left, top, right, bottom)
    {
        if (is_init === false)
            return false;

        is_init = false;

        return self.init(container_id, left, top, right, bottom);
    };

    this.init = function(container_id, left, top, right, bottom)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

       if (is_init === true)
           return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || 
            utils_sys.validation.misc.is_undefined(left) || utils_sys.validation.misc.is_undefined(top) || 
            utils_sys.validation.misc.is_undefined(right) || utils_sys.validation.misc.is_undefined(bottom))
            return false;
        else
        {
            if (utils_sys.validation.alpha.is_symbol(container_id) || utils_sys.objects.by_id(container_id) === null || 
                !utils_sys.validation.numerics.is_integer(left) || left < 0 || 
                !utils_sys.validation.numerics.is_integer(top) || top < 0 || 
                !utils_sys.validation.numerics.is_integer(right) || right < left || 
                !utils_sys.validation.numerics.is_integer(bottom) || bottom < top)
                return false;

            is_init = true;

            self.settings.id('swarm_' + random.generate());

            if (!self.settings.container(container_id))
                return false;

            self.settings.left(left);
            self.settings.top(top);
            self.settings.right(right);
            self.settings.bottom(bottom);

            swarm_id = self.settings.id();

            nature.themes.store('swarm');
            nature.apply('new');

            utils_int.draw(left, top, right, bottom);
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

        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        swarm_id = null,
        resize_tooltip = null,
        cosmos = null,
        matrix = null,
        colony = null,
        morpheus = null,
        nature = null,
        timer = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        coords = new mouse_coords_model(),
        bees_info = new bees_info_model(),
        bees_status = new bee_status_model(),
        utils_int = new utilities();

    this.settings = new settings();
    this.area = new area();
    this.bees = new bees();
    this.status = new status();
}
