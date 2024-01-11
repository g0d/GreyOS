/*
    GreyOS - X-Runner (Version: 0.5)

    File name: x_runner.js
    Description: This file contains the X-Runner - User-level programs execution service module.

    Coded by George Delaportas (G0D)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// X=Runner
function x_runner()
{
    var self = this;

    function x_meta_caller()
    {
        this.telemetry = function(data)
        {
            // TODO: System calls

            return true;
        };

        this.source = function()
        {
            // TODO: Ideas?

            return 
        };

        this.reset = function()
        {
            // TODO: System calls maybe?

            return;
        };
    }

    function utilities()
    {
        var me = this;

        function execute_meta(x_id)
        {
            var __code = null;

            // TODO: Use AJAX to get the source with x_id, put in in __code and run!

            meta_executor = dev_box.get('meta_executor');

            if (!meta_executor.load(__code))
                return false;

            if (meta_executor.process(x_mc))
                return meta_executor.run();

            return false;
        }

        function app()
        {
            function close_app(app, app_id, dock_app_object)
            {
                app.on('closed', function()
                                 {
                                    if (owl.status.applications.get.by_proc_id(app_id, 'RUN'))
                                        return;

                                    dock_app_object.classList.remove('app_' + app_id + '_on');
                                    dock_app_object.classList.add('app_' + app_id + '_off');
                                 });
            }

            this.start = function(app_id, is_sys_level)
            {
                if (is_sys_level)
                {
                    if (owl.status.applications.get.by_proc_id(app_id, 'RUN') && colony.is_single_instance(app_id))
                        return false;

                    var __app = app_box.get(app_id),
                        __bee = null;

                    __app.init();

                    __bee = __app.base();

                    if (!swarm.bees.insert(__bee))
                        return false;

                    if (__app.run())
                    {
                        var __dock_app_object = utils_sys.objects.by_id('app_' + app_id);

                        if (!__dock_app_object)
                            return false;

                        __dock_app_object.classList.remove('app_' + app_id + '_off');
                        __dock_app_object.classList.add('app_' + app_id + '_on');

                        close_app(__app, app_id, __dock_app_object);
                    }
                    else
                    {
                        var __app_error = __app.error();

                        if (__app_error.last() === __app_error.codes.POSITION || 
                            __app_error.last() === __app_error.codes.SIZE)
                        {
                            swarm.bees.remove(__bee);

                            msg_win = new msgbox();

                            msg_win.init('desktop');
                            msg_win.show(xenon.load('os_name'), 'The app is overflowing your screen. \
                                                                 You need a larger screen or higher resolution to run it!');
                        }
                        else if (__app_error.last() === __app_error.codes.INSTANCE_NUM_LIMIT)
                        {
                            swarm.bees.remove(__bee);

                            msg_win = new msgbox();

                            msg_win.init('desktop');
                            msg_win.show(xenon.load('os_name'), 'The app reached its configured instances limit!');
                        }
                    }

                    return true;
                }

                return execute_meta(app_id);
            };

            this.stop = function()
            {
                if (x_is_sys_level)
                    return this_app.quit();
                else
                    return meta_executor.terminate();
            };
        }

        function svc()
        {
            this.start = function(service_id, is_sys_level)
            {
                if (is_sys_level)
                {
                    this_bat = svc_box.get(service_id);

                    if (!this_bat)
                        return false;

                    return this_bat.run();
                }

                return execute_meta(service_id);
            };

            this.stop = function()
            {
                if (x_is_sys_level)
                    return this_bat.terminate();
                else
                    return meta_executor.terminate();
            };
        }

        this.check_arguments = function(mode, id, system)
        {
            if (utils_sys.validation.misc.is_undefined(mode) || utils_sys.validation.misc.is_nothing(id))
                return false;

            if (!utils_sys.misc.contains(mode, modes_list))
                return false;

            if (!utils_sys.validation.misc.is_bool(system))
                return false;

            return true;
        };

        this.app = new app();
        this.svc = new svc();
    }

    this.start = function(mode, id, is_sys_level)
    {
        if (!utils_int.check_arguments(mode, id, is_sys_level))
            return false;

        x_mode = mode;
        x_id = id;
        x_is_sys_level = is_sys_level;

        return utils_int[mode].start(id, is_sys_level);
    };

    this.stop = function()
    {
        if (!is_x_running)
            return false;

        is_x_running = false;

        return utils_int[x_mode].stop();
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');
        svc_box = cosmos.hub.access('svc_box');
        dev_box = cosmos.hub.access('dev_box');
        colony = cosmos.hub.access('colony');

        xenon = matrix.get('xenon');
        swarm = matrix.get('swarm');
        owl = matrix.get('owl');

        return true;
    };

    var is_x_running = false,
        x_is_sys_level = false,
        x_mode = null,
        x_id = null,
        this_app = null,
        this_svc = null,
        cosmos = null,
        matrix = null,
        xenon = null,
        app_box = null,
        svc_box = null,
        dev_box = null,
        colony = null,
        swarm = null,
        owl = null,
        meta_executor = null,
        modes_list = ['app', 'svc'],
        utils_sys = new vulcan(),
        x_mc = new x_meta_caller(),
        utils_int = new utilities();
}
