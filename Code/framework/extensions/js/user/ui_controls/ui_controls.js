/*
    GreyOS - UI Controls (Version: 1.6)
    
    File name: main.js
    Description: This file contains the UI Controls module.
    
    Coded by John Inglessis (negle) and George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// UI Controls
function ui_controls()
{
    var self = this;

    function config_model()
    {
        this.active_control = ['all_windows', 'view'];
        this.is_grid = false;
        this.is_stack = false;
    }

    function utilities()
    {
        var me = this;

        this.draw_ui_controls = function()
        {
            me.draw_controls();
            me.attach_events();

            return true;
        };

        this.draw_controls = function()
        {
            var __controls_div = utils_sys.objects.selectors.first('#top_panel #bottom_area #action_icons');

            if (__controls_div === null)
                return false;

            __controls_div.innerHTML = '<div id="placement" class="actions">' + 
                                       '    <div id="snap_to_grid" class="placement_icons" title="Snap to grid"></div>' + 
                                       '    <div id="stack_all" class="placement_icons" title="Stack all windows"></div>' + 
                                       '</div>';

            return true;
        };

        this.make_active = function(id)
        {
            if (utils_sys.validation.alpha.is_symbol(id))
                return false;

            var __selector = '#top_panel #bottom_area #action_icons #placement ' + '#' + id,
                __control = utils_sys.objects.selectors.first(__selector);

            if (id === 'snap_to_grid')
                __control.style.backgroundImage = "url('/framework/extensions/js/user/nature/themes/ui_controls/pix/snap_hover.png')";
            else if (id === 'stack_all')
                __control.style.backgroundImage = "url('/framework/extensions/js/user/nature/themes/ui_controls/pix/stack_hover.png')";
            else
                return false;

            return true;
        };

        this.make_inactive = function(id)
        {
            if (utils_sys.validation.alpha.is_symbol(id))
                return false;

            var __selector = '#top_panel #bottom_area #action_icons #placement' + ' #' + id,
                __control = utils_sys.objects.selectors.first(__selector);

            if (id === 'snap_to_grid')
                __control.style.backgroundImage = "url('/framework/extensions/js/user/nature/themes/ui_controls/pix/snap.png')";
            else if (id === 'stack_all')
                __control.style.backgroundImage = "url('/framework/extensions/js/user/nature/themes/ui_controls/pix/stack.png')";
            else
                return false;

            return true;
        };

        this.attach_events = function()
        {
            utils_sys.events.attach('ui_controls', utils_sys.objects.by_id('snap_to_grid'), 'click', function() { self.placement.grid(); });
            utils_sys.events.attach('ui_controls', utils_sys.objects.by_id('stack_all'), 'click', function() { self.placement.stack(); });

            return true;
        };
    }

    function settings()
    {
        var __id = null,
            __container = null;

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
    }

    function placement()
    {
        this.grid = function()
        {
            if (is_init === false)
                return false;

            if (!colony.list())
                return false;

            if (config.is_grid === false)
            {
                utils_int.make_active('snap_to_grid', 'placement');

                config.is_grid = true;
            }
            else
            {
                utils_int.make_inactive('snap_to_grid', 'placement');

                config.is_grid = false;
            }

            return true;
        };

        this.stack = function()
        {
            if (is_init === false)
                return false;

            if (!colony.list())
                return false;

            if (config.is_stack === false)
            {
                utils_int.make_active('stack_all', 'placement');

                var __bees = colony.list(),
                    __bees_length = __bees.length;

                for (var i = 0; i < __bees_length; i++)
                    hive.stack.bees.insert(__bees[i], 1);

                config.is_stack = true;
            }
            else
            {   
                utils_int.make_inactive('stack_all', 'placement');

                config.is_stack = false;
            }

            return true;
        };

        this.cascade = function()
        {
            if (is_init === false)
                return false;

            return true;
        };
    }

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

        is_init = true;

        self.settings.id('ui_controls_' + random.generate());
        self.settings.container(container_id);

        nature.theme('ui_controls');
        nature.apply('new');

        utils_int.draw_ui_controls();

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        colony =  cosmos.hub.access('colony');

        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        colony = null,
        swarm = null,
        hive = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        config = new config_model(),
        utils_int = new utilities();

    this.settings = new settings();
    this.placement = new placement();
}
