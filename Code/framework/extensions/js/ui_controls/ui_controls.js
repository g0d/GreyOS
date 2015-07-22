/*

    GreyOS Inc. - UI Controls

    File name: ui_controls.js (Version: 1.4)
    Description: This file contains the UI Controls extension.

    Coded by John Inglessis (negle) and George Delaportas (G0D)

    GreyOS Inc.
    Copyright © 2014

*/



// UI Controls
function ui_controls()
{

    var self = this;

    function utilities()
    {

        this.draw_controls = function()
        {

            var __controls_div = vulcan.objects.selectors.first('#top_panel #bottom_area #action_icons');

            if (__controls_div === null)
                return false;

            __controls_div.innerHTML = '<div id="view" class="actions">' + 
//                                       '    <div id="all_windows" class="view_icons" title="Show all windows"></div>' + 
//                                       '    <div id="only_boxes" class="view_icons" title="Show only boxes"></div>' + 
//                                       '    <div id="only_widgets" class="view_icons" title="Show only widgets"></div>' + 
                                       '</div>' + 
                                       '<div id="placement" class="actions">' + 
//                                       '    <div id="snap_to_grid" class="placement_icons" title="Snap to grid"></div>' + 
//                                       '    <div id="stack_all" class="placement_icons" title="Stack all windows"></div>' + 
                                       '</div>';

            return true;

        };

        this.make_active = function(id, type)
        {

            if (vulcan.validation.alpha.is_symbol(id) || !vulcan.validation.alpha.is_string(type))
                return false;

            var __selector = '#top_panel #bottom_area #action_icons #' + type + ' #' + id,
                __control = vulcan.objects.selectors.first(__selector);

            if (type === 'view')
            {

                if (id === 'all_windows')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/view/all_hover.png')";

                else if (id === 'only_boxes')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/view/boxes_hover.png')";

                else if (id === 'only_widgets')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/view/widgets_hover.png')";

                else
                    return false;

                utils.make_inactive(config.active_control[0], config.active_control[1]);

                config.active_control = [id, type];

            }

            else if (type === 'placement')
            {

                if (id === 'snap_to_grid')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/placement/snap_hover.png')";

                else if (id === 'stack_all')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/placement/stack_hover.png')";

                else
                    return false;

            }

            else
                return false;

            return true;

        };

        this.make_inactive = function(id, type)
        {

            if (vulcan.validation.alpha.is_symbol(id) || !vulcan.validation.alpha.is_string(type))
                return false;

            var __selector = '#top_panel #bottom_area #action_icons #' + type + ' #' + id,
                __control = vulcan.objects.selectors.first(__selector);

            if (type === 'view')
            {

                if (id === 'all_windows')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/view/all.png')";

                else if (id === 'only_boxes')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/view/boxes.png')";

                else if (id === 'only_widgets')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/view/widgets.png')";

                else
                    return false;

            }

            else if (type === 'placement')
            {

                if (id === 'snap_to_grid')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/placement/snap.png')";

                else if (id === 'stack_all')
                    __control.style.backgroundImage = "url('cms/themes/greyos/pix/icons/actions/placement/stack.png')";

                else
                    return false;

            }

            else
                return false;

            return true;

        };

        this.attach_events = function()
        {

            vulcan.events.attach('ui_controls', vulcan.objects.by_id('all_windows'), 'click', function() { self.view.all(); });
            vulcan.events.attach('ui_controls', vulcan.objects.by_id('only_boxes'), 'click', function() { self.view.boxes(); });
            vulcan.events.attach('ui_controls', vulcan.objects.by_id('only_widgets'), 'click', function() { self.view.widgets(); });
            vulcan.events.attach('ui_controls', vulcan.objects.by_id('snap_to_grid'), 'click', function() { self.placement.grid(); });
            vulcan.events.attach('ui_controls', vulcan.objects.by_id('stack_all'), 'click', function() { self.placement.stack(); });

            return true;

        };

    }

    function config_model()
    {

        this.active_control = ['all_windows', 'view'];
        this.is_grid = false;
        this.is_stack = false;

    }

    function view()
    {

        this.all = function()
        {

            if (is_init === false)
                return false;

            /**
             * IMPORTANT TO DO: 
             * Check if the bees are on Grid or on Stack
             */

            if (config.active_control[0] === 'all_windows')
                return true;

            utils.make_active('all_windows', 'view');

            var __bees = colony.list(),
                __bees_length = __bees.length,
                __visibility = null,
                __id = null;

            for (var i = 0; i < __bees_length; i++)
            {

                __visibility = __bees[i].gui.css.style.get('display');

                if (__visibility === 'none')
                {

                    __id = __bees[i].settings.general.id();

                    fx.fade.into(__id, 0.07, 25, 100);

                }

            }

            return true;

        };

        this.boxes = function()
        {

            if (is_init === false)
                return false;

            /**
             * IMPORTANT TO DO: 
             * Check if the bees are on Grid or on Stack
             */

            if (config.active_control[0] === 'only_boxes')
                return true;

            utils.make_active('only_boxes', 'view');

            var __bees = colony.list(),
                __bees_length = __bees.length,
                __type = null,
                __id = null;

            for (var i = 0; i < __bees_length; i++)
            {

                __type = __bees[i].settings.general.type();
                __id = __bees[i].settings.general.id();

                if (__type === 2)
                    fx.fade.out(__id, 0.07, 25, 100);

                else
                    fx.fade.into(__id, 0.07, 25, 100);

            }

            return true;

        };

        this.widgets = function()
        {

            if (is_init === false)
                return false;

            /**
             * IMPORTANT TO DO: 
             * Check if the bees are on Grid or on Stack
             */

            if (config.active_control[0] === 'only_widgets')
                return true;

            utils.make_active('only_widgets', 'view');

            var __bees = colony.list();
            var __bees_length = __bees.length;
            var __type = null,
                __id = null;

            for (var i = 0; i < __bees_length; i++)
            {

                __type = __bees[i].settings.general.type();
                __id = __bees[i].settings.general.id();

                if (__type === 1)
                    fx.fade.out(__id, 0.07, 25, 100);

                else
                    fx.fade.into(__id, 0.07, 25, 100);

            }

            return true;

        };

    }

    function placement()
    {

        this.grid = function()
        {

            if (is_init === false)
                return false;

            if (config.is_grid === false)
            {

                utils.make_active('snap_to_grid', 'placement');

                config.is_grid = true;

            }

            else
            {

                utils.make_inactive('snap_to_grid', 'placement');

                config.is_grid = false;

            }

            return true;

        };

        this.stack = function()
        {

            if (is_init === false)
                return false;

            if (config.is_stack === false)
            {

                utils.make_active('stack_all', 'placement');

                var __bees = colony.list(),
                    __bees_length = __bees.length;

                for (var i = 0; i < __bees_length; i++)
                    hive.stack.bees.insert(__bees[i], 1);

                config.is_stack = true;

            }

            else
            {   

                utils.make_inactive('stack_all', 'placement');

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

    this.init = function()
    {

        if (is_init === true)
           return false;

        is_init = true;

        fx = dev_box.get('fx');
        fx.init(cosmos);

        utils.draw_controls();
        utils.attach_events();

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
        hive = matrix.get('hive');

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
        hive = null,
        fx = null,
        config = new config_model(),
        utils = new utilities();

    this.view = new view();
    this.placement = new placement();

}
