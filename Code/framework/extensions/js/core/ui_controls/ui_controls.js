/*
    GreyOS - UI Controls (Version: 2.5)

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
        this.is_boxified = false;
        this.all_stacked = false;
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
            var __controls_div = utils_sys.objects.by_id('action_icons');

            if (__controls_div === null)
                return false;

            __controls_div.innerHTML = '<div id="' + ui_controls_id + '" class="windows_placement">' + 
                                       '    <div id="' + ui_controls_id + '_boxify_all" class="boxify_all placement_icons" title="Switch among open apps"></div>' + 
                                       '    <div id="' + ui_controls_id + '_stack_all" class="stack_all placement_icons" title="Stack / unstack all apps"></div>' + 
                                       '</div>';

            return true;
        };

        this.make_active = function(id)
        {
            var __control = utils_sys.objects.by_id(ui_controls_id + '_' + id);

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
            var __control = utils_sys.objects.by_id(ui_controls_id + '_' + id);

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

            __handler = function(event) { self.placement.boxify(event); };
            morpheus.run(ui_controls_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(ui_controls_id + '_boxify_all'));
            morpheus.run(ui_controls_id, 'touch', 'touchstart', __handler, utils_sys.objects.by_id(ui_controls_id + '_boxify_all'));

            __handler = function()
            {
                imc_proxy.execute('eagle').hide();

                me.make_inactive('boxify_all');

                config.is_boxified = false;
            };
            morpheus.run(ui_controls_id, 'mouse', 'mouseout', __handler, utils_sys.objects.by_id(ui_controls_id + '_boxify_all'));

            __handler = function(event) { self.placement.stack.all(event); };
            morpheus.run(ui_controls_id, 'mouse', 'mousedown', __handler, utils_sys.objects.by_id(ui_controls_id + '_stack_all'));

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
        this.boxify = function(event_object, activate = true)
        {
            if (is_init === false)
                return false;

            if (activate && config.is_boxified === false)
            {
                imc_proxy.execute('eagle').show(event_object);

                utils_int.make_active('boxify_all');
            }
            else
            {
                imc_proxy.execute('eagle').hide();

                utils_int.make_inactive('boxify_all');
            }

            return true;
        };

        function stack()
        {
            this.one = function(event, bee)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event))
                    return false;

                if (bee.status.system.in_hive())
                {
                    hive.stack.bees.expel(event, 1);
                }
                else
                {
                    hive.stack.set_view(event, 1, () =>
                    {
                        hive.stack.bees.insert([bee], null);

                        utils_int.make_active('stack_all');
                    });
                }

                return true;
            };

            this.all = function(event)
            {
                if (is_init === false)
                    return false;

                if (utils_sys.validation.misc.is_undefined(event))
                    return false;

                var __bees = colony.list();

                if (__bees.length === 0)
                    return false;

                if (config.all_stacked === false)
                {
                    var __is_bee_in_swarm = true;

                    for (var __this_bee of __bees)
                    {
                        if (!__this_bee.status.system.in_hive())
                        {
                            __is_bee_in_swarm = false;

                            break;
                        }
                    }

                    if (__is_bee_in_swarm)
                        return false;

                    hive.stack.set_view(event, 1, () =>
                    {
                        hive.stack.bees.insert(__bees, null);

                        utils_int.make_active('stack_all');

                        config.all_stacked = true;
                    });
                }
                else
                {
                    hive.stack.bees.expel(event, 0);

                    hive.stack.set_view(event, 1, () =>
                    {
                        utils_int.make_inactive('stack_all');

                        config.all_stacked = false;
                    });
                }

                return true;
            };
        }

        this.stack = new stack();
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

        hive = matrix.get('hive');
        imc_proxy = matrix.get('imc_proxy');
        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        ui_controls_id = null,
        cosmos = null,
        matrix = null,
        imc_proxy = null,
        colony = null,
        hive = null,
        morpheus = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        config = new config_model(),
        utils_int = new utilities();

    this.settings = new settings();
    this.placement = new placement();
}
