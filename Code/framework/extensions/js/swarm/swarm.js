/*

    GreyOS Inc. - Swarm (Bees action area container for GreyOS)
    
    File name: swarm.js (Version: 2.2)
    Description: This file contains the Swarm - Bees action area container extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Swarm
function swarm()
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
                             document.body.clientLeft - self.settings.left();
            coords.mouse_y = event_object.clientY + document.documentElement.scrollTop + document.body.scrollTop - 
                             document.body.clientTop - self.settings.top();

            return true;

        };

        this.show_bee = function(bees_colony, index)
        {

            if (!bees_colony.list(index).status.system.in_hive())
                new bees_colony.list(index).show();

            return true;

        };

        this.toggle_hive = function()
        {

            var __hive = matrix.get('hive');

            if ((coords.mouse_y + self.settings.top()) >= (window.innerHeight - 
                                                           (document.documentElement.scrollTop + 
                                                            document.body.scrollTop - document.body.clientTop) - 75))
                __hive.stack.toggle('on');

            else
                __hive.stack.toggle('off');

            return true;

        };

        this.draw_swarm = function(swarm, left, top, right, bottom)
        {

            var __dynamic_object = null,
                __nature = matrix.get('nature'),
                __swarm_id = swarm.settings.id();

            __nature.themes(['swarm']);
            __nature.apply();

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __swarm_id);
            __dynamic_object.setAttribute('class', 'swarm');
            __dynamic_object.setAttribute('style', 'left: ' + left + 'px; ' + 
                                                   'top: ' + top + 'px; ' + 
                                                   'width: ' + right + 'px; ' + 
                                                   'height: ' + bottom + 'px;');

            vulcan.objects.by_id(swarm.settings.container()).appendChild(__dynamic_object);

            vulcan.objects.by_id(__swarm_id).onmousemove = function(event) { me.coords(event); me.toggle_hive(); };

            return true;

        };

    }

    function mouse_coords()
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
        this.snap_to_grid = false;
        this.stacked = false;
        this.z_index = 0;

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

        this.right = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __right;

            if (!vulcan.validation.numerics.is_integer(val) || val < 0 || val < __left)
                return false;

            __right = val;

            return true;

        };

        this.bottom = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __bottom;

            if (!vulcan.validation.numerics.is_integer(val) || val < 0 || val < __top)
                return false;

            __bottom = val;

            return true;

        };

        this.active_bee = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_object(val) && val !== null)
                return false;

            bees_status.active_bee_id = val;

            return true;

        };

        this.snap_to_grid = function(val)
        {

            if (is_init === false)
                return false;

            if (!vulcan.validation.misc.is_bool(val))
                return false;

            bees_status.snap_to_grid = val;

            return true;

        };

        this.stacked = function(val)
        {

            if (is_init === false)
                return false;

            if (!vulcan.validation.misc.is_bool(val))
                return false;

            bees_status.stacked = val;

            return true;

        };

        this.z_index = function(val)
        {

            if (is_init === false)
                return false;

            if (!vulcan.validation.numerics.is_integer(val) || val < 0)
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

                if (vulcan.validation.misc.is_undefined(val))
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

            if (!vulcan.validation.models.is_bee(object) || object.status.system.in_hive())
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

            if (!vulcan.validation.models.is_bee(object))
                return false;

            var __bee_id = object.settings.general.id();

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

            var n = 0;

            if (colony.num() === 0)
                return false;

            if (vulcan.validation.misc.is_undefined(objects_array))
            {

                for (n = 0; n < colony.num(); n++)
                    utils.show_bee(colony, n);

            }

            else
            {

                var __objects = objects_array.length;

                if (!vulcan.validation.misc.is_array(objects_array) || colony.num() < __objects)
                    return false;

                for (var i = 0; i < __objects; i++)
                {
                
                    for (n = 0; n < colony.num(); n++)
                    {

                        if (colony.list(n).settings.general.id() === objects_array[i].settings.general.id())
                            utils.show_bee(colony, n);

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

        this.snap_to_grid = function()
        {

            if (is_init === false)
                return false;

            return bees_status.snap_to_grid;

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

    this.init = function(container_id, left, top, right, bottom)
    {

       if (is_init === true)
           return false;

        if (vulcan.validation.misc.is_undefined(container_id) || 
            vulcan.validation.misc.is_undefined(left) || vulcan.validation.misc.is_undefined(top) || 
            vulcan.validation.misc.is_undefined(right) || vulcan.validation.misc.is_undefined(bottom))
            return false;

        else
        {

            if (vulcan.validation.alpha.is_symbol(container_id) || vulcan.objects.by_id(container_id) === null || 
                !vulcan.validation.numerics.is_integer(left) || left < 0 || 
                !vulcan.validation.numerics.is_integer(top) || top < 0 || 
                !vulcan.validation.numerics.is_integer(right) || right < left || 
                !vulcan.validation.numerics.is_integer(bottom) || bottom < top)
                return false;

            is_init = true;

            var __pythia = matrix.get('pythia');

            self.settings.id('swarm_' + __pythia.generate());
            self.settings.container(container_id);
            self.settings.left(left);
            self.settings.top(top);
            self.settings.right(right);
            self.settings.bottom(bottom);

            utils.draw_swarm(self, left, top, right, bottom);

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

        colony = matrix.get('colony');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        colony = null,
        coords = new mouse_coords(),
        bees_info = new bees_info_model(),
        bees_status = new bee_status_model(),
        utils = new utilities();

    this.settings = new settings();
    this.area = new area();
    this.bees = new bees();
    this.status = new status();

}
