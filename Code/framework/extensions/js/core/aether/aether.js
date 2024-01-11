/*
    Aether (AJAX Traffic Controller [TC] / QoS for web apps)

    File name: aether.js (Version: 2.8)
    Description: This file contains the Aether extension.
    Dependencies: Vulcan, BULL, Pythia, JAP, Centurion, Stopwatch and Sensei.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2014 - 2023
    Open Software License (OSL 3.0)
*/

// Aether
function aether()
{
    function sys_constants_class()
    {
        function settings_group()
        {
            function chain_mode_model()
            {
                this.SERIAL = 'serial';
                this.PARALLEL = 'parallel';
                this.DELAY = 'delay';
                this.CALLBACK = 'callback';
            }

            this.chain_mode = new chain_mode_model();
        }

        function tasks_group()
        {
            function type_model()
            {
                this.DATA = 'data';
                this.REQUEST = 'request';
            }

            function http_method_model()
            {
                this.GET = 'get';
                this.POST = 'post';
            }

            function ajax_mode_model()
            {
                this.ASYNCHRONOUS = 'asynchronous';
                this.SYNCHRONOUS = 'synchronous';
            }

            function content_fill_mode_model()
            {
                this.REPLACE = 'replace';
                this.APPEND = 'append';
            }

            function repeat_model()
            {
                this.SERIAL = 'serial';
                this.PARALLEL = 'parallel';
            }

            this.type = new type_model();
            this.http_method = new http_method_model();
            this.ajax_mode = new ajax_mode_model();
            this.content_fill_mode = new content_fill_mode_model();
            this.repeat = new repeat_model();
        }

        function misc_group()
        {
            this.IGNORE = -1;
            this.MAX_PRIORITY = Number.MAX_SAFE_INTEGER;
            this.MAX_LATENCY = 60000;
            this.MAX_BANDWIDTH = 10737418240;
            this.MAX_DELAY = 86400000;
        }

        this.settings = new settings_group();
        this.tasks = new tasks_group();
        this.misc = new misc_group();
    }

    function sys_models_class()
    {
        function settings_model()
        {
            this.chain_mode = null;
            this.init_delay = -1;
            this.interval = -1;
            this.optional_task_callbacks = true;
            this.scheduler_callback = null;
        }

        function task_model()
        {
            this.id = null;
            this.type = null;
            this.url = null;
            this.data = null;
            this.response_timeout = -1;
            this.callbacks = null;
            this.ajax_mode = null;
            this.element_id = null;
            this.content_fill_mode = null;
            this.priority = -1;
            this.qos = null;
            this.repeat = null;
            this.delay = -1;
            this.canceled = false;
        }

        function tasks_list_model()
        {
            this.num = 0;
            this.list = [];
        }

        this.generate_task = function()
        {
            return new task_model();
        };

        this.settings = new settings_model();
        this.tasks = new tasks_list_model();
    }

    function config_keywords_class()
    {
        function main_group()
        {
            return ['settings', 'tasks'];
        }

        function settings_group()
        {
            return ['chain_mode', 'init_delay', 'interval', 'optional_task_callbacks', 'scheduler_callback'];
        }

        function tasks_group()
        {
            return ['type', 'url', 'data', 'response_timeout', 'callbacks', 'ajax_mode', 'element_id', 'content_fill_mode', 
                    'priority', 'qos', 'repeat', 'delay'];
        }

        function callbacks_group()
        {
            return ['success', 'fail', 'timeout'];
        }

        function qos_group()
        {
            return ['latency', 'bandwidth'];
        }

        function range_group()
        {
            return ['min', 'max'];
        }

        function repeat_group()
        {
            return ['times', 'mode'];
        }

        this.main = new main_group();
        this.settings = new settings_group();
        this.tasks = new tasks_group();
        this.callbacks = new callbacks_group();
        this.qos = new qos_group();
        this.range = new range_group();
        this.repeat = new repeat_group();
    }

    function sys_tools_class()
    {
        var __index = 0,
            __entry = null;

        function factory_model()
        {
            this.test_init = function()
            {
                if (is_init === false)
                {
                    sensei('Aether', 'The scheduler is not running!');

                    return false;
                }

                return true;
            };

            this.check_task_id = function(func, task_id)
            {
                if (!utils.validation.misc.is_undefined(task_id))
                {
                    if (utils.validation.numerics.is_number(task_id) && task_id > 0)
                    {
                        var __entry = null;

                        for (__entry in system_models.tasks.list)
                        {
                            if (system_models.tasks.list[__entry].id === task_id)
                            {
                                if (func === 'cancel')
                                {
                                    system_models.tasks.list[__entry].canceled = true;

                                    return true;
                                }
                                else
                                    return system_models.tasks.list[__entry];
                            }
                        }

                        return false;
                    }
                    else
                    {
                        sensei('Aether', 'Invalid task ID!');

                        return false;
                    }
                }
                else
                {
                    if (func === 'cancel')
                    {
                        is_init = false;

                        scheduler.stop();
                        repetitive_scheduler.stop();

                        return true;
                    }
                    else
                        return system_models.tasks.list;
                }
            };

            this.config_verification = function(main_config)
            {
                var __factory_map = [];

                __factory_map.push(['main', config_definition_models['main'], main_config]);
                __factory_map.push(['settings', config_definition_models['settings'], main_config.settings]);
                __factory_map.push(['tasks', config_definition_models['tasks'], main_config.tasks]);

                for (__index = 0; __index < __factory_map.length; __index++)
                {
                    if (!config_parser.verify(__factory_map[__index][1], __factory_map[__index][2]))
                        return false;

                    if (__index === 2)
                    {
                        var __record = 0,
                            __option = 0,
                            __object_options = ['callbacks', 'qos', 'latency', 'bandwidth', 'repeat'],
                            __object_exceptions = ['latency', 'bandwidth'],
                            __task_option_config = null;

                        for (__record = 0; __record < __factory_map[__index][2].length; __record++)
                        {
                            for (__entry in __factory_map[__index][2][__record])
                            {
                                for (__option in __object_options)
                                {
                                    if (!utils.validation.misc.is_undefined(main_config.tasks[__record]['qos']) && 
                                        utils.misc.contains(__object_options[__option], __object_exceptions))
                                    {
                                        __task_option_config = main_config.tasks[__record]['qos'][__object_options[__option]];

                                        if (utils.validation.misc.is_undefined(__task_option_config))
                                            continue;
                                    }
                                    else
                                    {
                                        if (utils.validation.misc.is_undefined(main_config.tasks[__record][__object_options[__option]]))
                                            continue;

                                        __task_option_config = main_config.tasks[__record][__object_options[__option]];
                                    }

                                    __factory_map.push([__object_options[__option], 
                                                        config_definition_models[__object_options[__option]], 
                                                        __task_option_config]);

                                    if (!config_parser.verify(__factory_map[3][1], __factory_map[3][2]))
                                        return false;

                                    __factory_map.pop();
                                }
                            }
                        }
                    }
                }

                __factory_map = [];

                return true;
            };

            this.range_validator = function(range_values, check)
            {
                if ((range_values[0] === system_constants.misc.IGNORE && range_values[1] === system_constants.misc.IGNORE) || 
                    (range_values[0] !== system_constants.misc.IGNORE && range_values[0] < 1) || 
                    (range_values[1] !== system_constants.misc.IGNORE && (range_values[1] > system_constants.misc[check] || range_values[1] <= range_values[0])))
                {
                    system_tools.reset();

                    sensei('Aether', 'Range validation error!');

                    return false;
                }

                return true;
            };

            this.ajax_task_set = function(task)
            {
                var __this_task = task.args,
                    __task_type = task.type,
                    __task_repeat = task.repeat,
                    __task_qos = task.qos,
                    __task_latency = null,
                    __task_bandwidth = null,
                    __index = 0,
                    __ajax_config = {
                                        "type"                  :   __task_type,
                                        "url"                   :   __this_task.url,
                                        "data"                  :   __this_task.data,
                                        "response_timeout"      :   __this_task.response_timeout
                                    },
                    __ajax = new bull();

                function ajax_call()
                {
                    if (__task_type === 'data')
                    {
                        __ajax_config.element_id = __this_task.element_id;
                        __ajax_config.content_fill_mode = __this_task.content_fill_mode;
                        __ajax_config.on_success = __this_task.success_callback;
                        __ajax_config.on_fail = __this_task.fail_callback;
                        __ajax_config.on_timeout = __this_task.timeout_callback;
                    }
                    else
                    {
                        __ajax_config.method = __this_task.method;
                        __ajax_config.ajax_mode = __this_task.ajax_mode;
                        __ajax_config.on_success = __this_task.success_callback;
                        __ajax_config.on_fail = __this_task.fail_callback;
                        __ajax_config.on_timeout = __this_task.timeout_callback;
                    }

                    __ajax.run(__ajax_config);
                }

                function ajax_prepare_delegate()
                {
                    if (!utils.validation.misc.is_invalid(__task_repeat))
                    {
                        if (__task_repeat.mode === system_constants.tasks.repeat.SERIAL)
                        {
                            if (__task_repeat.times === -1)
                                setInterval(function() { ajax_call(); }, __this_task.response_timeout);
                            else
                            {
                                for (__index = 0; __index < (__task_repeat.times + 1); __index++)
                                    setTimeout(function() { ajax_call(); }, __this_task.response_timeout);
                            }
                        }
                        else
                        {
                            if (__task_repeat.times === -1)
                                setInterval(function() { ajax_call(); }, 1);
                            else
                            {
                                for (__index = 0; __index < (__task_repeat.times + 1); __index++)
                                    ajax_call();
                            }
                        }
                    }
                    else
                        ajax_call();
                }

                if (task.canceled)
                    return;

                if (!utils.validation.misc.is_invalid(__task_qos))
                {
                    __task_latency = __task_qos.latency;
                    __task_bandwidth = __task_qos.bandwidth;

                    if (!utils.validation.misc.is_invalid(__task_bandwidth))
                    {
                        var __ajax_bandwidth = 0;

                        if (!utils.validation.misc.is_nothing(__this_task.data))
                            __ajax_bandwidth = __this_task.data.length;
                        else
                            __ajax_bandwidth = __task_bandwidth.min;

                        if ((__task_bandwidth.min !== system_constants.misc.IGNORE && __ajax_bandwidth < __task_bandwidth.min) || 
                            (__task_bandwidth.max !== system_constants.misc.IGNORE && __ajax_bandwidth > __task_bandwidth.max))
                        {
                            sensei('Aether', 'Task ID: ' + task.id + '\nOff-range bandwidth: ' + __ajax_bandwidth + ' bytes');

                            return;
                        }
                    }

                    if (!utils.validation.misc.is_invalid(__task_latency))
                    {
                        var __qos_ajax_config = {
                                                    "type"                  :   "request",
                                                    "url"                   :   __this_task.url,
                                                    "data"                  :   __this_task.data,
                                                    "method"                :   __this_task.method,
                                                    "ajax_mode"             :   "asynchronous"
                                                },
                            __ping_tester = new centurion();

                        __qos_ajax_config.on_success = function()
                                                       {
                                                            __ping_tester.benchmark.end();

                                                            var __ajax_latency = __ping_tester.benchmark.latency();

                                                            if (((__task_latency.min !== system_constants.misc.IGNORE && __ajax_latency >= __task_latency.min) && 
                                                                (__task_latency.max !== system_constants.misc.IGNORE && __ajax_latency <= __task_latency.max)) || 
                                                                (__task_latency.max === system_constants.misc.IGNORE && __ajax_latency >= __task_latency.min) || 
                                                                (__task_latency.min === system_constants.misc.IGNORE && __ajax_latency <= __task_latency.max))
                                                                ajax_prepare_delegate();
                                                            else
                                                            {
                                                                sensei('Aether', 'Task ID: ' + task.id + '\nOff-range latency: ' + __ajax_latency + ' ms');

                                                                return;
                                                            }
                                                       };

                        __ping_tester.benchmark.start();

                        __ajax.run(__qos_ajax_config);
                    }
                    else
                        ajax_prepare_delegate();
                }
                else
                    ajax_prepare_delegate();
            };
        }

        this.init_config_definition_models = function()
        {
            config_definition_models['main'] = { "arguments" : [
                                                                    {
                                                                        "key"       :   { "name" : "settings", "optional" : false },
                                                                        "value"     :   { "type" : "object" }
                                                                    },
                                                                    {
                                                                        "key"       :   { "name" : "tasks", "optional" : false },
                                                                        "value"     :   { "type" : "array" }
                                                                    }
                                                               ]
                                               };

            config_definition_models['settings'] = { "arguments" : [
                                                                        {
                                                                            "key"     :   { "name" : "chain_mode", "optional" : false },
                                                                            "value"   :   {
                                                                                                "type"      :   "string",
                                                                                                "choices"   :   [
                                                                                                                    system_constants.settings.chain_mode.SERIAL,
                                                                                                                    system_constants.settings.chain_mode.PARALLEL,
                                                                                                                    system_constants.settings.chain_mode.DELAY,
                                                                                                                    system_constants.settings.chain_mode.CALLBACK
                                                                                                                ]
                                                                                          }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "init_delay", "optional" : true },
                                                                            "value"   :   { "type" : "number" }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "interval", "optional" : true },
                                                                            "value"   :   { "type" : "number" }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "optional_task_callbacks", "optional" : true },
                                                                            "value"   :   { "type" : "boolean" }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "scheduler_callback", "optional" : true },
                                                                            "value"   :   { "type" : "function" }
                                                                        }
                                                                    ]
                                                   };

            config_definition_models['tasks'] = { "arguments" : [
                                                                    {
                                                                        "key"     :   { "name" : "type", "optional" : false },
                                                                        "value"   :   {
                                                                                            "type"     :   "string",
                                                                                            "choices"  :   [
                                                                                                                system_constants.tasks.type.DATA,
                                                                                                                system_constants.tasks.type.REQUEST
                                                                                                           ]
                                                                                        }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "url", "optional" : false },
                                                                        "value"   :   { "type" : "string" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "data", "optional" : true },
                                                                        "value"   :   { "type" : "string" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "callbacks", "optional" : false },
                                                                        "value"   :   { "type" : "object" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "response_timeout", "optional" : false },
                                                                        "value"   :   { "type" : "number" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "method", "optional" : true },
                                                                        "value"   :   {
                                                                                            "type"     :   "string",
                                                                                            "choices"  :   [
                                                                                                                system_constants.tasks.http_method.GET,
                                                                                                                system_constants.tasks.http_method.POST
                                                                                                           ]
                                                                                      }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "ajax_mode", "optional" : true },
                                                                        "value"   :   {
                                                                                            "type"     :   "string",
                                                                                            "choices"  :   [
                                                                                                                system_constants.tasks.ajax_mode.ASYNCHRONOUS,
                                                                                                                system_constants.tasks.ajax_mode.SYNCHRONOUS
                                                                                                           ]
                                                                                        }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "element_id", "optional" : true },
                                                                        "value"   :   { "type" : "string" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "content_fill_mode", "optional" : true },
                                                                        "value"   :   {
                                                                                            "type"     :   "string",
                                                                                            "choices"  :   [
                                                                                                                system_constants.tasks.content_fill_mode.REPLACE,
                                                                                                                system_constants.tasks.content_fill_mode.APPEND
                                                                                                           ]
                                                                                        }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "priority", "optional" : true },
                                                                        "value"   :   { "type" : "number" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "qos", "optional" : true },
                                                                        "value"   :   { "type" : "object" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "repeat", "optional" : true },
                                                                        "value"   :   { "type" : "object" }
                                                                    },
                                                                    {
                                                                        "key"     :   { "name" : "delay", "optional" : true },
                                                                        "value"   :   { "type" : "number" }
                                                                    }
                                                                ]
                                                };

            config_definition_models['callbacks'] = { "arguments" : [
                                                                        {
                                                                            "key"     :   { "name" : "success", "optional" : false },
                                                                            "value"   :   { "type" : "function" }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "fail", "optional" : true },
                                                                            "value"   :   { "type" : "function" }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "timeout", "optional" : true },
                                                                            "value"   :   { "type" : "function" }
                                                                        }
                                                                    ]
                                                    };

            config_definition_models['qos'] = { "arguments"   :   [
                                                                        {
                                                                            "key"     :   { "name" : "latency", "optional" : true },
                                                                            "value"   :   { "type" : "object" }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "bandwidth", "optional" : true },
                                                                            "value"   :   { "type" : "object" }
                                                                        }
                                                                  ]
                                              };

            config_definition_models['latency'] = { "arguments"   :  [
                                                                            {
                                                                                "key"     :   { "name" : "min", "optional" : false },
                                                                                "value"   :   { "type" : "number" }
                                                                            },
                                                                            {
                                                                                "key"     :   { "name" : "max", "optional" : false },
                                                                                "value"   :   { "type" : "number" }
                                                                            }
                                                                     ]
                                                  };

            config_definition_models['bandwidth'] = { "arguments" :  [
                                                                            {
                                                                                "key"     :   { "name" : "min", "optional" : false },
                                                                                "value"   :   { "type" : "number" }
                                                                            },
                                                                            {
                                                                                "key"     :   { "name" : "max", "optional" : false },
                                                                                "value"   :   { "type" : "number" }
                                                                            }
                                                                     ]
                                                    };

            config_definition_models['repeat'] = { "arguments" :  [
                                                                        {
                                                                            "key"     :   { "name" : "times", "optional" : false },
                                                                            "value"   :   { "type" : "number" }
                                                                        },
                                                                        {
                                                                            "key"     :   { "name" : "mode", "optional" : false },
                                                                            "value"   :   {
                                                                                             "type"     :   "string",
                                                                                             "choices"  :   [
                                                                                                                system_constants.tasks.repeat.SERIAL,
                                                                                                                system_constants.tasks.repeat.PARALLEL
                                                                                                            ]
                                                                                          }
                                                                        }
                                                                  ]
                                                 };
        };

        this.verify_config = function(main_config)
        {
            if (!utils.validation.misc.is_object(main_config)|| 
                !main_config.hasOwnProperty('settings') || !main_config.hasOwnProperty('tasks') || 
                !utils.validation.misc.is_object(main_config.settings) || !utils.validation.misc.is_object(main_config.tasks))
            {
                sensei('Aether', 'Invalid configuration!');

                return false;
            }

            return system_tools.factory.config_verification(main_config);
        };

        this.load_settings = function(settings_config)
        {
            var __options_map = system_config_keywords.settings;

            for (__entry in __options_map)
            {
                if (settings_config.hasOwnProperty(__options_map[__entry]))
                {
                    if (__options_map[__entry] === 'init_delay' || __options_map[__entry] === 'interval')
                    {
                        if (settings_config[__options_map[__entry]] < 1 || 
                            settings_config[__options_map[__entry]] > system_constants.misc.MAX_DELAY)
                        {
                            __options_map = [];

                            sensei('Aether', 'Invalid range for "' + __options_map[__entry] + '" option!');

                            return false;
                        }
                    }

                    system_models.settings[__options_map[__entry]] = settings_config[__options_map[__entry]];
                }
            }

            if (settings_config.chain_mode === system_constants.settings.chain_mode.SERIAL)
                is_serial_chain_mode = true;

            if (settings_config.chain_mode === system_constants.settings.chain_mode.DELAY)
                is_delay_chain_mode = true;

            is_optional_task_callbacks = settings_config.optional_task_callbacks;

            __options_map = [];

            return true;
        };

        this.load_tasks = function(tasks_config)
        {
            var __this_config_task = null,
                __new_task = null,
                __option = null,
                __tasks_response_timeout_sum = 0,
                __tasks_delay_sum = 0,
                __same_priorities_num = 0,
                __is_async_warning_set = false,
                __task_id_gen = new pythia(),
                __task_priority_gen = new pythia();

            for (__index = 0; __index < tasks_config.length; __index++)
            {
                __this_config_task = tasks_config[__index];

                __new_task = system_models.generate_task();

                __new_task.id = __task_id_gen.generate();
                __new_task.type = __this_config_task.type;

                if (__this_config_task.type === system_constants.tasks.type.DATA)
                {
                    if (!__this_config_task.hasOwnProperty('data') || 
                        !__this_config_task.hasOwnProperty('element_id') || !__this_config_task.hasOwnProperty('content_fill_mode') || 
                        __this_config_task.hasOwnProperty('method')|| __this_config_task.hasOwnProperty('ajax_mode'))
                    {
                        system_tools.reset();

                        sensei('Aether', 'Task type: "data" requires fields: "data", "element_id" and\n"content_fill_mode" to operate!');

                        return false;
                    }
                }
                else
                {
                    if (!__this_config_task.hasOwnProperty('method') || !__this_config_task.hasOwnProperty('ajax_mode') || 
                        __this_config_task.hasOwnProperty('element_id') || __this_config_task.hasOwnProperty('content_fill_mode'))
                    {
                        system_tools.reset();

                        sensei('Aether', 'Task type: "request" requires fields: "method" and\n"ajax_mode" to operate!');

                        return false;
                    }
                }

                if (utils.validation.misc.is_nothing(__this_config_task.url))
                {
                    system_tools.reset();

                    sensei('Aether', 'Field: "url" can\'t be empty!');

                    return false;
                }

                __new_task.url = __this_config_task.url;

                if (!__this_config_task.hasOwnProperty('data'))
                    __new_task.data = '1';
                else
                {
                    if (!utils.validation.misc.is_nothing(__this_config_task.data))
                        __new_task.data = __this_config_task.data;
                    else
                        __new_task.data = '1';
                }

                if (__this_config_task.response_timeout < 1 || __this_config_task.response_timeout > system_constants.misc.MAX_DELAY)
                {
                    system_tools.reset();

                    sensei('Aether', 'Invalid range for "response_timeout" option!');

                    return false;
                }

                __new_task.response_timeout = __this_config_task.response_timeout;
                __tasks_response_timeout_sum += __new_task.response_timeout;

                var __callbacks_found = 0;

                for (__option in tasks_config[__index].callbacks)
                    __callbacks_found++;

                if (!is_optional_task_callbacks && __callbacks_found < system_config_keywords.callbacks.length)
                {
                    system_tools.reset();

                    sensei('Aether', 'When "optional_task_callbacks" is set to false all task\ncallbacks have to be present!');

                    return false;
                }

                __new_task.callbacks = __this_config_task.callbacks;

                if (__this_config_task.hasOwnProperty('method'))
                    __new_task.method = __this_config_task.method;

                if (__this_config_task.hasOwnProperty('ajax_mode'))
                {
                    __new_task.ajax_mode = __this_config_task.ajax_mode;

                    if (__this_config_task.ajax_mode === system_constants.tasks.ajax_mode.SYNCHRONOUS)
                    {
                        if (!__is_async_warning_set)
                        {
                            __is_async_warning_set = true;

                            sensei('Aether', 'Warning: Use of synchronous AJAX causes unexpected\nscheduling in various cases!');
                        }
                    }
                }

                if (__this_config_task.hasOwnProperty('element_id'))
                {
                    if (!utils.objects.by_id(__this_config_task.element_id))
                    {
                        system_tools.reset();
    
                        sensei('Aether', 'Field: "element_id" does not point to an existing element!');

                        return false;
                    }

                    __new_task.element_id = __this_config_task.element_id;
                }

                if (__this_config_task.hasOwnProperty('content_fill_mode'))
                    __new_task.content_fill_mode = __this_config_task.content_fill_mode;

                if (__this_config_task.hasOwnProperty('priority'))
                {
                    if (__this_config_task.priority < 1 || __this_config_task.priority > system_constants.misc.MAX_PRIORITY)
                    {
                        system_tools.reset();
    
                        sensei('Aether', 'Unsupported value for "priority" option!');

                        return false;
                    }

                    __new_task.priority = __this_config_task.priority;
                }
                else
                    __new_task.priority = __task_priority_gen.generate();

                if (__this_config_task.hasOwnProperty('qos'))
                {
                    var __qos = __this_config_task.qos,
                        __range_values = [],
                        __check = null;

                    for (__option in __qos)
                    {
                        if (utils.misc.contains(__option, system_config_keywords.qos))
                        {
                            __range_values = [__qos[__option].min, __qos[__option].max];

                            if (__option === 'latency')
                                __check = 'MAX_LATENCY';
                            else
                                __check = 'MAX_BANDWIDTH';

                            if (!system_tools.factory.range_validator(__range_values, __check))
                            {
                                system_tools.reset();

                                sensei('Aether', 'Invalid range for "' + __option + '" option!');

                                return false;
                            }
                        }
                    }

                    __new_task.qos = __qos;
                }

                if (__this_config_task.hasOwnProperty('repeat'))
                {
                    for (__entry in __this_config_task.repeat)
                    {
                        if (__entry === 'times' && __this_config_task.repeat[__entry] < 1 && 
                            __this_config_task.repeat[__entry] !== system_constants.misc.IGNORE)
                        {
                            system_tools.reset();

                            sensei('Aether', 'Unsupported value for "' + __entry + '" option!');

                            return false;
                        }
                    }

                    __new_task.repeat = __this_config_task.repeat;
                }

                if (is_delay_chain_mode && !__this_config_task.hasOwnProperty('delay'))
                {
                    system_tools.reset();

                    sensei('Aether', 'When "chain_mode" is set to delay all tasks must have the\n"delay" option!');

                    return false;
                }

                if (__this_config_task.hasOwnProperty('delay'))
                {
                    if (is_serial_chain_mode || __this_config_task.delay < 1 || __this_config_task.delay > system_constants.misc.MAX_DELAY)
                    {
                        system_tools.reset();

                        if (is_serial_chain_mode)
                            sensei('Aether', 'Invalid use of the "delay" option when "chain_mode"\nis set to serial!');
                        else
                            sensei('Aether', 'Invalid range for "delay" option!');

                        return false;
                    }

                    __new_task.delay = __this_config_task.delay;
                    __tasks_delay_sum += __new_task.delay;
                }

                system_models.tasks.num++;
                system_models.tasks.list.push(__new_task);
            }

            if (!utils.misc.sort(system_models.tasks.list, 'asc', 'priority'))
            {
                system_tools.reset();

                sensei('Aether', 'Unable to sort tasks!');

                return false;
            }

            if (system_models.settings.interval !== -1 && 
                ((system_models.settings.chain_mode === system_constants.settings.chain_mode.DELAY || 
                  system_models.settings.chain_mode === system_constants.settings.chain_mode.CALLBACK) && 
                  __tasks_delay_sum > system_models.settings.interval))
            {
                sensei('Aether', 'Warning: Scheduler loop interval is lower than the sum\nof delay in tasks. ' + 
                                 'This may lead to strange\nbehaviour due to the asynchronous nature of AJAX!');
            }

            if (system_models.settings.interval !== -1 && 
                ((system_models.settings.chain_mode === system_constants.settings.chain_mode.SERIAL || 
                  system_models.settings.chain_mode === system_constants.settings.chain_mode.CALLBACK) && 
                 __tasks_response_timeout_sum > system_models.settings.interval))
            {
                sensei('Aether', 'Warning: Scheduler loop interval is lower than the sum\nof response time outs in tasks. ' + 
                                 'This may lead to strange\nbehaviour due to the asynchronous nature of AJAX!');
            }

            for (__index = 0; __index < system_models.tasks.num - 1; __index++)
            {
                if (system_models.tasks.list[__index].priority === system_models.tasks.list[__index + 1].priority)
                    __same_priorities_num++;
            }

            if (__same_priorities_num > 0)
            {
                sensei('Aether', 'Warning: One or more AJAX tasks have the same priority.\n' + 
                                 'Please consider providing distinct priorities for\nbetter scheduling!');
            }

            return true;
        };

        this.process_tasks = function(process_callback)
        {
            var __index = 0,
                __this_task = null,
                __all_tasks = system_models.tasks.list,
                __modes_list = system_constants.settings.chain_mode,
                __task_config_map = null,
                __scheduled_tasks_list = [];

            function go(mode, scheduled_tasks_list)
            {
                function scheduler_callback_action()
                {
                    if (system_models.settings.scheduler_callback !== null)
                        system_models.settings.scheduler_callback.call(this);
                }

                function repeater_delegate(mode, index)
                {
                    var __task_entry = null,
                        __task_delay = null;

                    if (mode === __modes_list.SERIAL || mode === __modes_list.DELAY || mode === __modes_list.CALLBACK)
                    {
                        if (index < __all_tasks.length - 1)
                            index++;
                        else
                        {
                            if ((mode === __modes_list.SERIAL || mode === __modes_list.CALLBACK) && index === __all_tasks.length - 1)
                                scheduler_callback_action();

                            return;
                        }
                    }

                    __task_entry = scheduled_tasks_list[index][0];
                    __task_delay = scheduled_tasks_list[index][1];

                    if (mode === __modes_list.CALLBACK)
                    {
                        var __old_success_callback = __task_entry.args.success_callback,
                            __new_success_callback = function()
                                                     {
                                                        __old_success_callback.call(this);

                                                        repeater_delegate(mode, index);
                                                     };

                        __task_entry.args.success_callback = __new_success_callback;
                    }

                    if (__task_delay === -1)
                    {
                        system_tools.factory.ajax_task_set(__task_entry);

                        if (mode === __modes_list.SERIAL || mode === __modes_list.DELAY)
                            repeater_delegate(mode, index);
                    }
                    else
                    {
                        setTimeout(function()
                                   {
                                        system_tools.factory.ajax_task_set(__task_entry);

                                        if (mode === __modes_list.DELAY)
                                        {
                                            repeater_delegate(mode, index);

                                            if (index === __all_tasks.length - 1)
                                                setTimeout(scheduler_callback_action, __task_delay);
                                        }
                                   }, __task_delay);
                    }
                }

                function repeater(mode)
                {
                    if (mode === __modes_list.SERIAL || mode === __modes_list.DELAY || mode === __modes_list.CALLBACK)
                        repeater_delegate(mode, -1);
                    else
                    {
                        for (__index = 0; __index < scheduled_tasks_list.length; __index++)
                            repeater_delegate(mode, __index);

                        scheduler_callback_action();
                    }

                    if (utils.validation.misc.is_function(process_callback))
                        process_callback.call(this);
                }

                repeater(mode);
            }

            for (__index in __all_tasks)
            {
                __this_task = __all_tasks[__index];

                __task_config_map = {
                                        "id"          :   __this_task.id,
                                        "type"        :   __this_task.type,
                                        "priority"    :   __this_task.priority,
                                        "args"        :     {
                                                                "url"                 :   __this_task.url,
                                                                "data"                :   __this_task.data,
                                                                "success_callback"    :   __this_task.callbacks.success,
                                                                "fail_callback"       :   __this_task.callbacks.fail,
                                                                "response_timeout"    :   __this_task.response_timeout,
                                                                "timeout_callback"    :   __this_task.callbacks.timeout
                                                            },
                                        "repeat"      :   __this_task.repeat,
                                        "qos"         :   __this_task.qos,
                                        "canceled"    :   __this_task.canceled
                                    };

                if (__this_task.type === system_constants.tasks.type.DATA)
                {
                    __task_config_map.args.element_id = __this_task.element_id;
                    __task_config_map.args.content_fill_mode = __this_task.content_fill_mode;
                }
                else
                    __task_config_map.args.ajax_mode = __this_task.ajax_mode;

                __scheduled_tasks_list.push([__task_config_map, __this_task.delay]);
            }

            go(system_models.settings.chain_mode, __scheduled_tasks_list);
        };

        this.run = function()
        {
            function do_tasks()
            {
                if (system_models.settings.interval === -1)
                    system_tools.process_tasks();
                else
                {
                    system_tools.process_tasks(function()
                                               {
                                                    repetitive_scheduler.start(system_models.settings.interval, 
                                                                               system_tools.process_tasks, false);
                                               });
                }
            }

            if (system_models.settings.init_delay === -1)
                do_tasks();
            else
                scheduler.start(system_models.settings.init_delay, do_tasks, true);

            return true;
        };

        this.reset = function()
        {
            is_init = false;
            config_definition_models = [];

            system_models = new sys_models_class();
        };

        this.factory = new factory_model();
    }

    function init()
    {
        system_tools.init_config_definition_models();
    }

    this.schedule = function(json_config)
    {
        if (is_init === true || 
            !system_tools.verify_config(json_config) || 
            !system_tools.load_settings(json_config.settings) || 
            !system_tools.load_tasks(json_config.tasks) || 
            !system_tools.run())
            return false;

        is_init = true;
        config_definition_models = [];

        return true;
    };

    this.cancel = function(task_id)
    {
        if (!system_tools.factory.test_init())
            return false;

        return system_tools.factory.check_task_id('cancel', task_id);
    };

    this.status = function(task_id)
    {
        if (!system_tools.factory.test_init())
            return false;

        return system_tools.factory.check_task_id('status', task_id);
    };

    this.constants = function()
    {
        return system_constants;
    };

    var is_init = false,
        is_serial_chain_mode = false,
        is_delay_chain_mode = false,
        is_optional_task_callbacks = false,
        config_definition_models = [],
        system_constants = new sys_constants_class(),
        system_models = new sys_models_class(),
        system_config_keywords = new config_keywords_class(),
        system_tools = new sys_tools_class(),
        config_parser = new jap(),
        scheduler = new stopwatch(),
        repetitive_scheduler = new stopwatch(),
        utils = new vulcan();

    // Initialize
    init();
}
