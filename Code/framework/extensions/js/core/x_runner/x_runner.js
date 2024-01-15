/*
    GreyOS - X-Runner (Version: 1.5)

    File name: x_runner.js
    Description: This file contains the X-Runner - User-level programs execution module.

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
            if (data.type === 'app')
                x_app = colony.get(data.app_id)
            else
                x_app = null;

            return true;
        };

        this.source = function()
        {
            // TODO: Ideas?

            return;
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

        function check_system_run_limits(is_meta_program = false)
        {
            var __apps_num = colony.num(),
                __max_apps = colony.max(),
                __svcs_num = roost.num(),
                __max_svcs = roost.max();

            if (is_meta_program)
            {
                __apps_num++;
                __svcs_num++;
            }

            var __msg_win = new msgbox();

            __msg_win.init('desktop');

            if (__apps_num >= __max_apps)
                __msg_win.show(xenon.load('os_name'), 'Maximum apps for this session, reached! Please close a few apps in order to open new ones.');
            else if (__svcs_num >= __max_svcs)
                __msg_win.show(xenon.load('os_name'), 'Maximum services for this session, reached! Please stop a few to use others.');
            else
                return false;

            return true;
        }

        function execute_meta_program(mode, x_id)
        {
            var __code = null,
                __ajax_config = {
                                    "type"          :   "request",
                                    "method"        :   "post",
                                    "url"           :   "/",
                                    "data"          :   "gate=meta_programs&action=code&mode=" + mode + "&x_id=" + x_id,
                                    "ajax_mode"     :   "synchronous",
                                };

            meta_executor = dev_box.get('meta_executor');

            __code = ajax.run(__ajax_config);

            if (!meta_executor.load(__code))
            {
                frog('X-RUNNER', '% Empty %', 
                     'No code detected!');

                return false;
            }

            if (meta_executor.process(x_mc) !== true)
            {
                if (!check_system_run_limits(true))
                {
                    if (meta_executor.error.last.code() === meta_executor.error.codes.INVALID)
                        frog('X-RUNNER', '% Invalid %', meta_executor.error.last.message());
                    else if (meta_executor.error.last.code() === meta_executor.error.codes.MISMATCH)
                        frog('X-RUNNER', '[!] Error [!]', meta_executor.error.last.message());
                    else if (meta_executor.error.last.code() === meta_executor.error.codes.OTHER)
                        frog('X-RUNNER', '[!] Error [!]', meta_executor.error.last.message());
                }

                return meta_executor.terminate();
            }

            utils_int.set_dock_icon_status(x_id);

            if (x_app !== null)
                utils_int.app_close_callback(x_app, x_id, false);

            is_x_running = true;

            return true;
        }

        function app()
        {
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
                    {
                        check_system_run_limits();

                        return false;
                    }

                    if (__app.run())
                    {
                        me.set_dock_icon_status(app_id)

                        me.app_close_callback(__app, app_id, true);

                        x_program = __app;

                        is_x_running = true;

                        return true;
                    }
                    else
                    {
                        var __app_error = __app.error(),
                            __msg_win = new msgbox();

                        __msg_win.init('desktop');

                        if (__app_error.last() === __app_error.codes.POSITION || 
                            __app_error.last() === __app_error.codes.SIZE)
                        {
                            swarm.bees.remove(__bee);

                            __msg_win.show(xenon.load('os_name'), 'The app is overflowing your screen. \
                                                                   You need a larger screen or higher resolution to run it!');
                        }
                        else if (__app_error.last() === __app_error.codes.INSTANCE_NUM_LIMIT)
                        {
                            swarm.bees.remove(__bee);

                            __msg_win.show(xenon.load('os_name'), 'The app reached its configured instances limit!');
                        }

                        return false;
                    }
                }

                return execute_meta_program('app', app_id);
            };

            this.stop = function(is_sys_level)
            {
                if (is_sys_level)
                    return x_program.quit();
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
                    var __svc = svc_box.get(service_id),
                        __bat = null;

                    __svc.init();

                    __bat = __svc.base();

                    if (__bat.run())
                    {
                        if (check_system_run_limits())
                            return false;

                        x_program = __bat;

                        is_x_running = true;

                        return true;
                    }

                    return false;
                }

                is_x_running = true;

                return execute_meta_program('svc', service_id);
            };

            this.stop = function(is_sys_level)
            {
                if (is_sys_level)
                    return x_program.terminate();
                else
                    return meta_executor.terminate();
            };
        }

        this.set_dock_icon_status = function(app_id, reverse = false)
        {
            var __dock_app_object = utils_sys.objects.by_id('app_' + app_id),
                __icon_id = null;

            if (!__dock_app_object)
                return false;

            __icon_id = __dock_app_object.getAttribute('data-icon');

            if (reverse)
                __dock_app_object.classList.remove(__icon_id + '_on');
            else
                __dock_app_object.classList.add(__icon_id + '_on');

            return true;
        };

        this.app_close_callback = function(app, process_id, is_sys_level)
        {
            app.on('closed', function()
                             {
                                if (is_sys_level)
                                {
                                    if (owl.status.applications.get.by_proc_id(process_id, 'RUN'))
                                        return;
                                }
                                else
                                {
                                    if (owl.status.applications.get.by_proc_id(app.settings.general.app_id(), 'RUN'))
                                        return;
                                }

                                me.set_dock_icon_status(process_id, true);
                             });

            return true;
        };

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
        roost = cosmos.hub.access('roost');

        xenon = matrix.get('xenon');
        swarm = matrix.get('swarm');
        owl = matrix.get('owl');

        return true;
    };

    var is_x_running = false,
        x_mode = null,
        x_app = null,
        x_program = null,
        cosmos = null,
        matrix = null,
        app_box = null,
        svc_box = null,
        dev_box = null,
        colony = null,
        roost = null,
        xenon = null,
        swarm = null,
        owl = null,
        meta_executor = null,
        modes_list = ['app', 'svc'],
        utils_sys = new vulcan(),
        ajax = new taurus(),
        x_mc = new x_meta_caller(),
        utils_int = new utilities();
}
