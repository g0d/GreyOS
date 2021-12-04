/*
    Parallel programming (Task parallelism)

    File name: parallel.js (Version: 2.0)
    Description: This file contains the Parallel tasks framework extension.
    Dependencies: Vulcan, Pythia, JAP and Task.

    Coded by George Delaportas (G0D)
    Copyright (C) 2015 - 2021
    Open Software License (OSL 3.0)
*/

// Parallel
function parallel()
{
    var self = this;

    function tasks_manager_model()
    {
        function tasks_list_model()
        {
            this.num = 0;
            this.tasks = [];
        }

        function tasks_info()
        {
            this.num = function()
            {
                return tasks_list.num;
            };

            this.list = function(index)
            {
                if (utils.validation.misc.is_undefined(index))
                    return tasks_list.tasks;
                else
                    return tasks_list.tasks[index];
            };
        }

        this.create = function(worker_file)
        {
            var __new_task_id = null,
                __new_task = new task(),

            __new_task_id = __new_task.create(worker_file);

            if (__new_task_id === false)
                return false;

            tasks_list.tasks.push(__new_task);
            tasks_list.num++;

            __is_task_created = true;

            return __new_task_id;
        };

        this.destroy = function(task_id)
        {
            var __task = null;

            for (__index = 0; __index < tasks_list.num; __index++)
            {
                __task = tasks_list.tasks[__index];

                if (__task.id() === task_id)
                {
                    tasks_list.tasks.splice(__index, 1);

                    if (tasks_list.num === 0)
                        __is_task_created = false;

                    return __task.destroy();
                }
            }

            return false;
        };

        this.run = function(task_id, data, callback)
        {
            var __task = null;

            for (__index = 0; __index < tasks_list.num; __index++)
            {
                __task = tasks_list.tasks[__index];

                if (__task.id() === task_id)
                {
                    __task.message.send(data);
                    __task.message.receive(callback);

                    return true;
                }
            }

            return false;
        };

        this.run_all = function(tasks_config)
        {
            if (utils.validation.misc.is_undefined(tasks_config))
                return false;

            if (!config_parser.verify(__tasks_config_model, tasks_config))
                return false;

            var __task = null;

            for (__this_task_config of tasks_config)
            {
                if (!utils.validation.misc.is_undefined(__this_task_config.callback) && 
                    !utils.validation.misc.is_function(__this_task_config.callback))
                    return false;

                for (__index = 0; __index < tasks_list.num; __index++)
                {
                    __task = tasks_list.tasks[__index];

                    if (__task.id() === __this_task_config.id)
                    {
                        if (!utils.validation.misc.is_undefined(__this_task_config.data))
                            __task.message.send(__this_task_config.data);

                        if (!utils.validation.misc.is_undefined(__this_task_config.callback))
                            __task.message.receive(__this_task_config.callback);
                    }
                }
            }

            return true;
        };

        this.kill = function()
        {
            for (__index = 0; __index < tasks_list.num; __index++)
                tasks_list.tasks[__index].destroy();

            tasks_list = new tasks_list_model();

            __is_task_created = false;

            return null;
        };

        this.tasks = new tasks_info();

        var __index = 0,
            tasks_list = new tasks_list_model();
    }

    this.num = function()
    {
        if (__is_task_created === false)
            return false;

        return tasks_manager.tasks.num();
    };

    this.list = function(index)
    {
        if (__is_task_created === false)
            return false;

        if (utils.validation.misc.is_undefined(index))
            return tasks_manager.tasks.list();

        if (!utils.validation.numerics.is_integer(index) 
            || index < 0 || index > (tasks_manager.tasks.num() - 1))
            return false;

        return tasks_manager.tasks.list(index);
    };

    this.create = function(worker_file)
    {
        return tasks_manager.create(worker_file);
    };

    this.destroy = function(task_id)
    {
        if (!utils.validation.numerics.is_integer(task_id))
            return false;

        if (__is_task_created === false)
            return false;

        return tasks_manager.destroy(task_id);
    };

    this.run = function(task_id, data = null, callback = null)
    {
        if (!utils.validation.numerics.is_integer(task_id))
            return false;

        if (__is_task_created === false)
            return false;

        return tasks_manager.run(task_id, data, callback);
    };

    this.run_all = function(tasks_config)
    {
        if (__is_task_created === false)
            return false;

        return tasks_manager.run_all(tasks_config);
    };

    this.kill = function()
    {
        if (__is_task_created === false)
            return false;

        tasks_manager.kill();

        return true;
    };

    function init()
    {
        if (utils.validation.misc.is_undefined(Worker))
            return false;

        return this;
    }

    var __is_task_created = false,
        __tasks_config_model = 
        { "arguments"   :   [
                                {
                                    "key"       :   { "name" : "id", "optional" : false },
                                    "value"     :   { "type" : "number" }
                                },
                                {
                                    "key"       :   { "name" : "data", "optional" : false },
                                    "value"     :   { "type" : "*" }
                                },
                                {
                                    "key"       :   { "name" : "callback", "optional" : true },
                                    "value"     :   { "type" : "*" }
                                }
                            ]
        };
        tasks_manager = new tasks_manager_model(),
        config_parser = new jap(),
        utils = new vulcan();

    // Initialize
    init();
}
