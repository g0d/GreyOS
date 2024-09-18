/*
    GreyOS - UI Controls (Version: 2.0)

    File name: ui_controls.js
    Description: This file contains the UI Controls module.

    Coded by John Inglessis (negle) and George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// UI Controls
function ui_controls()
{
    var self = this;

    function config_model()
    {
        this.active_control = ['all_windows', 'view'];
        this.is_boxified = false;
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
            var __controls_div = utils_sys.objects.selectors.first('#top_panel #action_icons');

            if (__controls_div === null)
                return false;

            __controls_div.innerHTML = '<div id="placement" class="actions">' + 
                                       '    <div id="boxify_all" class="placement_icons" title="Switch among open apps"></div>' + 
                                       '    <div id="stack_all" class="placement_icons" title="Stack / unstack all apps"></div>' + 
                                       '</div>';

            return true;
        };

        this.make_active = function(id)
        {
            if (utils_sys.validation.alpha.is_symbol(id))
                return false;

            var __selector = '#top_panel #action_icons #placement ' + '#' + id,
                __control = utils_sys.objects.selectors.first(__selector);

            if (id === 'boxify_all')
                __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/boxify_hover.png')";
            else if (id === 'stack_all')
                __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/stack_hover.png')";
            else
                return false;

            return true;
        };

        this.make_inactive = function(id)
        {
            if (utils_sys.validation.alpha.is_symbol(id))
                return false;

            var __selector = '#top_panel #action_icons #placement' + ' #' + id,
                __control = utils_sys.objects.selectors.first(__selector);

            if (id === 'boxify_all')
                __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/boxify.png')";
            else if (id === 'stack_all')
                __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/stack.png')";
            else
                return false;

            return true;
        };

        this.attach_events = function()
        {
            var __handler = null;

            __handler = function() { self.placement.boxify(); };
            morpheus.run(ui_controls_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('boxify_all'));
            morpheus.run(ui_controls_id, 'touch', 'touchstart', __handler, utils_sys.objects.by_id('boxify_all'));

            __handler = function()
            {
                me.make_inactive('boxify_all');

                config.is_boxified = false;
            };
            morpheus.run(ui_controls_id, 'mouse', 'mouseout', __handler, utils_sys.objects.by_id('boxify_all'));

            __handler = function() { self.placement.stack(); };
            morpheus.run(ui_controls_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('stack_all'));

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
        this.boxify = function()
        {
            if (is_init === false)
                return false;

            if (config.is_boxified === false)
            {
                utils_int.make_active('boxify_all');

                config.is_boxified = true;
            }

            return true;
        };

        this.stack = function()
        {
            if (is_init === false)
                return false;

            if (config.is_stack === false)
            {
                var __bees = colony.list(),
                    __bees_length = __bees.length;

                if (__bees_length === 0)
                    return false;

                for (var i = 0; i < __bees_length; i++)
                    hive.stack.bees.insert(__bees[i], null);

                utils_int.make_active('stack_all');

                config.is_stack = true;
            }
            else
            {
                if (colony.list().length === 0)
                    return false;

                hive.stack.bees.expel(null);

                utils_int.make_inactive('stack_all');

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

        if (!self.settings.container(container_id))
            return false;

        ui_controls_id = self.settings.id();

        nature.themes.store('ui_controls');
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
        eagle = matrix.get('eagle');
        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        ui_controls_id = null,
        cosmos = null,
        matrix = null,
        colony = null,
        swarm = null,
        hive = null,
        eagle = null,
        morpheus = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        config = new config_model(),
        utils_int = new utilities();

    this.settings = new settings();
    this.placement = new placement();
}
