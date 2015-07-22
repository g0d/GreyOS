/*

    GreyOS Inc. - Dock

    File name: dock.js (Version: 1.2)
    Description: This file contains the Dock extension.

    Coded by John Inglessis (negle) and George Delaportas (G0D)

    GreyOS Inc.
    Copyright © 2014

*/



// Dock
function dock()
{

    var self = this;

    function utilities()
    {

        // -- This will be removed and all ajax will be replaced with Aether actions --
        this.ajax_data = function(element_id, args, success_callback)
        {

            if (element_id === undefined)
                return false;

            var __url = null,
                __data = null,
                __ajax = new bull();

            __url = '/framework/extensions/ajax/dock/dock.php';
            __data = (args === undefined) ? ' ' : args;

            __ajax.data(__url, __data, element_id, 1, 1, false, success_callback);

            return true;

        };

        // -- This will be removed and all ajax will be replaced with Aether actions --
        this.ajax_request = function(args, success_callback, request_time_out, fail_callback)
        {

            var __url = null,
                __data = null,
                __result = false,
                __ajax = new bull();

            __url = '/framework/extensions/ajax/dock/dock.php';
            __data = (args === undefined) ? ' ' : args;

            __result = __ajax.request(__url, __data, 1, success_callback, request_time_out, fail_callback);

            return __result;

        };

        this.get_button_sound = function()
        {

            sound = vulcan.objects.by_id('button_sound');

        };

        this.draw_dock = function()
        {

            utils.ajax_data('favorite_apps', 'action=load', function()
                                                            {

                                                                utils.create_dock_array();
                                                                utils.get_button_sound();
                                                                utils.attach_events();
                                                                utils.enable_drag();

                                                            });

            return true;

        };

        this.save_dock = function()
        {   

            var __dock_array = JSON.stringify(config.dock_array);

            __dock_array = encodeURIComponent(__dock_array);

            var __result = utils.ajax_request('action=save&applications=' + __dock_array);

            if (__result)
                return true;

           return false;

        };

        this.create_dock_array = function()
        {

            var __dock = vulcan.objects.by_class('favorites'),
                __dock_length = __dock.length;

            var __id = null,
                __reference_name = null,
                __position = null,
                __title = null;

            for (var i = 0; i < __dock_length; i++)
            {

                __id = __dock[i].getAttribute('id').split('apps_')[1],
                __reference_name = __dock[i].getAttribute('data-reference'),
                __position = __dock[i].getAttribute('data-position'),
                __title = __dock[i].getAttribute('title');

                config.dock_array.push({"app_id":__id , "reference_name": __reference_name , "position": __position , "title": __title });

            }

            return true;

        };

        this.update_dock_array = function(position_one, position_two)
        {

            var tmp = config.dock_array[position_one];

            config.dock_array[position_one] = config.dock_array[position_two];
            config.dock_array[position_two] = tmp;
            config.dock_array[position_one]['position'] = position_one;
            config.dock_array[position_two]['position'] = position_two;

            return true;

        };

        this.open = function(app)
        {

            var __handler = null;

            __handler = function()
                        {

                            var __bee = colony.get(app['app_id']);

                            if (__bee === false || __bee === null)
                            {

                                var __app = app_box.get(app['reference_name']);

                                __app.init();

                                __bee = __app.get_bee();

                                sound.play();

                                vulcan.objects.by_id('apps_' + app['app_id']).classList.remove('apps_' + app['app_id'] + '_off');
                                vulcan.objects.by_id('apps_' + app['app_id']).classList.add('apps_' + app['app_id'] + '_on');

                                swarm.bees.insert(__bee);

                                __bee.show();

                                utils.close(__bee, app['app_id']);

                            }

                            else
                            {

                                if (!__bee.status.system.running())
                                {

                                    sound.play();

                                    vulcan.objects.by_id('apps_' + app['app_id']).classList.remove('apps_' + app['app_id'] + '_off');
                                    vulcan.objects.by_id('apps_' + app['app_id']).classList.add('apps_' + app['app_id'] + '_on');

                                    __bee.show();

                                    utils.close(__bee, app['id']);

                                }

                            }

                        };
            vulcan.objects.by_id('apps_' + app['app_id']).onclick = __handler;

        };

        this.close = function(bee, bee_id)
        {

            bee.on('closed', function()
                             {

                                vulcan.objects.by_id('apps_' + bee_id).classList.remove('apps_' + bee_id + '_on');
                                vulcan.objects.by_id('apps_' + bee_id).classList.add('apps_' + bee_id + '_off');

                                return true;

                             });

        };

        this.enable_drag = function()
        {

            var __dock_apps = vulcan.objects.selectors.all('#top_panel #bottom_area #dynamic_container #favorite_apps .favorites'),
                __dock_div = vulcan.objects.by_id('favorite_apps'),
                __dock_apps_length = __dock_apps.length;

            vulcan.events.attach('dock', document, 'mouseup', function() { clearTimeout(config.timer); });

            for (var i = 0; i < __dock_apps_length; i++)
            {

                __dock_apps[i].addEventListener('mousedown', function()
                                                             {

                                                                    config.timer = setTimeout(function()
                                                                                              {

                                                                                                    for (var j = 0; j < __dock_apps_length; j++)
                                                                                                        __dock_apps[j].classList.add('dock_replace');

                                                                                              }, 200);

                                                             }, false);

                __dock_apps[i].addEventListener('dragstart', function(event)
                                                             {

                                                                event.dataTransfer.setDragImage(this, -5, -5);
                                                                event.dataTransfer.effectAllowed = 'move';
                                                                event.dataTransfer.setData('text/plain', event.target.id);

                                                             }, false);

                __dock_apps[i].addEventListener('dragenter', function(event) { event.target.classList.add('dock_replace_outer'); }, false);

                __dock_apps[i].addEventListener('dragover', function(event)
                                                            {

                                                                if (event.preventDefault) 
                                                                    event.preventDefault();

                                                                event.dataTransfer.dropEffect = 'move';

                                                                return false;

                                                            }, false);

                __dock_apps[i].addEventListener('dragleave', function() { this.classList.remove('dock_replace_outer'); }, false);

                __dock_apps[i].addEventListener('drop', function(event)
                                                        {

                                                            event.preventDefault();

                                                            if (event.target.id !== event.dataTransfer.getData('text/plain'))
                                                            {

                                                                var __id = event.dataTransfer.getData('text/plain'),
                                                                    __app_to_move = vulcan.objects.by_id(__id),
                                                                    __app_to_move_next = __app_to_move.nextSibling,
                                                                    __app_to_replace = vulcan.objects.by_id(this.id),
                                                                    __position_one = __app_to_move.getAttribute('data-position'),
                                                                    __position_two = event.target.getAttribute('data-position');

                                                                __app_to_move.setAttribute('data-position', __position_two); 
                                                                event.target.setAttribute('data-position', __position_one);

                                                                __dock_div.insertBefore(__app_to_move, __app_to_replace.nextSibling);
                                                                __dock_div.insertBefore(__app_to_replace, __app_to_move_next);

                                                                utils.update_dock_array(__position_one, __position_two);
                                                                utils.save_dock();

                                                            }

                                                            return false;

                                                        }, false);

                __dock_apps[i].addEventListener('dragend', function()
                                                           {

                                                                for (var j = 0; j < __dock_apps_length; j++)
                                                                {

                                                                    __dock_apps[j].classList.remove('dock_replace_outer');
                                                                    __dock_apps[j].classList.remove('dock_replace');

                                                                }

                                                           }, false);

            }

        };

        this.attach_events = function()
        {

            var dock_array_length = config.dock_array.length;

            for (var i = 0; i < dock_array_length; i++)
            {   

                // -- Temporary statement for applications that don't work --
                if (config.dock_array[i]['app_id'] === 'rooster' ||
                    config.dock_array[i]['app_id'] === 'greyos_cloud' ||
                    config.dock_array[i]['app_id'] === 'map_fuzion' || 
                    config.dock_array[i]['app_id'] === 'greyos_talk')
                    continue;

                    utils.open(config.dock_array[i]);

            }

            return true;

        };

    }

    function config_model()
    {

        this.dock_array = [];
        this.timer = null;

    }

    this.add = function()
    {

        if (is_init === false)
            return false;

        return true;

    };

    this.remove = function()
    {

        if (is_init === false)
            return false;

        return true;

    };

    this.init = function()
    {

        if (is_init === true)
           return false;

        var __nature = matrix.get('nature');

        __nature.themes(['dock']);
        __nature.apply();

        is_init = true;

        utils.draw_dock();

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
        app_box = cosmos.hub.access('app_box');

        colony = matrix.get('colony');
        swarm = matrix.get('swarm');
        pythia = matrix.get('pythia');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        app_box = null,
        pythia = null,
        colony = null,
        swarm = null,
        sound = null,
        config = new config_model(),
        utils = new utilities();

}
