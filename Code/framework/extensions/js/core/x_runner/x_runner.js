/*
    GreyOS - X-Runner (Version: 2.0)

    File name: x_runner.js
    Description: This file contains the X-Runner - User-level programs execution module.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// X=Runner
function x_runner()
{
    var self = this;

    function x_meta_caller()
    {
        var __id = null;

        this.telemetry = function(data)
        {
            if (data.type === 'app')
                x_reference = colony.get(data.app_id);
            else
                x_reference = roost.get(data.name);

            __id = data.name;
        };

        this.source = function()
        {
            // TODO: Ideas?
        };

        this.reset = function()
        {
            // TODO: System calls maybe?
        };

        this.program_id = function()
        {
            return __id;
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
                __msg_win.show(xenon.load('os_name'), 'Maximum apps for this session reached! Please quit a few apps in order to run new ones.');
            else if (__svcs_num >= __max_svcs)
                __msg_win.show(xenon.load('os_name'), 'Maximum services for this session reached! Please stop a few services to use others.');
            else
                return false;

            return true;
        }

        function check_single_instance_app(id)
        {
            if (owl.status.applications.get.by_proc_id(id, 'RUN') && colony.is_single_instance(id))
            {
                var __msg_win = new msgbox();

                __msg_win.init('desktop');
                __msg_win.show(xenon.load('os_name'), 'This is a single instance app!');

                return true;
            }

            return false;
        }

        function check_app_errors(app)
        {
            var __bee = app.base(),
                __app_error = app.error(),
                __msg_win = new msgbox();

            swarm.bees.remove(__bee);

            __msg_win.init('desktop');

            if (__app_error.last() === __app_error.codes.POSITION || 
                __app_error.last() === __app_error.codes.SIZE)
                __msg_win.show(xenon.load('os_name'), 'The app is overflowing your screen. You need a larger screen or higher resolution to run it!');
            else if (__app_error.last() === __app_error.codes.INSTANCE_NUM_LIMIT)
                __msg_win.show(xenon.load('os_name'), 'The app reached its configured instances limit!');

            return true;
        }

        function general_error()
        {
            var __msg_win = new msgbox();

            __msg_win.show(xenon.load('os_name'), 'A general program error occurred!');

            return true;
        }

        function execute_meta_program(mode, x_id)
        {
            var __settings = null,
                __phtml = null,
                __code = null,
                __ajax_config = null;

            __ajax_config = {
                                "type"          :   "request",
                                "method"        :   "post",
                                "url"           :   "/",
                                "data"          :   "gate=meta_programs&action=load_ms_settings&x_id=" + x_id,
                                "ajax_mode"     :   "synchronous"
                            },
            __settings = ajax.run(__ajax_config);

            __ajax_config = {
                                "type"          :   "request",
                                "method"        :   "post",
                                "url"           :   "/",
                                "data"          :   "gate=meta_programs&action=load_ms_phtml&x_id=" + x_id,
                                "ajax_mode"     :   "synchronous"
                            },
            __phtml = ajax.run(__ajax_config);

            __ajax_config = {
                                "type"          :   "request",
                                "method"        :   "post",
                                "url"           :   "/",
                                "data"          :   "gate=meta_programs&action=load_ms_code&mode=" + mode + "&x_id=" + x_id,
                                "ajax_mode"     :   "synchronous"
                            };
            __code = ajax.run(__ajax_config);

            meta_executor = dev_box.get('meta_executor');

            if (!meta_executor.load(__code))
            {
                frog('X-RUNNER', '% Empty %', 'No code detected!');

                return false;
            }

            if (meta_executor.process(x_mc) !== true)
            {
                if (!check_system_run_limits(true))
                {
                    if (mode === 'app')
                    {
                        if (!check_single_instance_app(x_mc.program_id()))
                        {
                            var __msg_win = new msgbox();

                            __msg_win.init('desktop');

                            if (meta_executor.error.last.code() === meta_executor.error.codes.INVALID_CODE)
                            {
                                __msg_win.show(xenon.load('os_name'), 'The is not a valid application!');

                                frog('X-RUNNER', '# Invalid Code #', meta_executor.error.last.message());
                            }
                            else if (meta_executor.error.last.code() === meta_executor.error.codes.RUN_FAIL)
                            {
                                __msg_win.show(xenon.load('os_name'), 'The application is misconfigured!');

                                frog('X-RUNNER', '[*] Run Fail [*]', meta_executor.error.last.message());
                            }
                            else if (meta_executor.error.last.code() === meta_executor.error.codes.ERROR)
                            {
                                __msg_win.show(xenon.load('os_name'), 'The application has errors!');

                                frog('X-RUNNER', '[!] Error [!]', meta_executor.error.last.message());
                            }
                        }
                        else
                            nature.themes.clear(x_mc.program_id());
                    }
                }

                x_reference = null;

                return meta_executor.terminate();
            }

            utils_int.set_dock_icon_status(x_id);

            if (mode === 'app')
                utils_int.app_close_callback(x_reference, x_id, false);

            is_x_running = true;

            return x_reference;
        }

        function app()
        {
            this.start = function(app_id, is_sys_level)
            {
                if (is_sys_level)
                {
                    if (check_single_instance_app(app_id))
                        return false;

                    var __app = app_box.get(app_id),
                        __bee = null;

                    if (!__app.init())
                    {
                        general_error();

                        return false;
                    }

                    __bee = __app.base();

                    if (__app.run())
                    {
                        me.set_dock_icon_status(app_id)

                        me.app_close_callback(__app, app_id, true);

                        x_program = __app;

                        is_x_running = true;

                        return __app;
                    }
                    else
                    {
                        if (!check_system_run_limits())
                            check_app_errors(__app);

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

                    if (!__svc.init())
                    {
                        general_error();

                        return false;
                    }

                    __bat = __svc.base();

                    if (__bat.run())
                    {
                        if (check_system_run_limits())
                            return false;

                        x_program = __bat;

                        is_x_running = true;

                        return __bat;
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
        x_reference = null;

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
        nature = matrix.get('nature');

        return true;
    };

    var is_x_running = false,
        x_mode = null,
        x_program = null,
        x_reference = null,
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
        nature = null,
        meta_executor = null,
        modes_list = ['app', 'svc'],
        utils_sys = new vulcan(),
        ajax = new taurus(),
        x_mc = new x_meta_caller(),
        utils_int = new utilities();
}
