/*
    Parallel programming (Task parallelism)

    File name: parallel.js (Version: 2.0)
    Description: This file contains the Parallel tasks framework extension.
    Dependencies: Task, Vulcan and Pythia.

    Coded by George Delaportas (G0D)
    Copyright (C) 2015 - 2021
    Open Software License (OSL 3.0)
*/

// Parallel
function parallel()
{
    var self = this;

    function task_manager_model()
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

        this.create = function(worker_file, delay)
        {
            var __new_task_id = null,
                __new_task = new task(),

            __new_task_id = __new_task.create(worker_file, delay);

            if (__new_task_id === false)
                return false;

            tasks_list.tasks.push(__new_task);
            tasks_list.num++;

            return __new_task_id;
        };

        this.destroy = function(task_id)
        {
            var __task = null;

            for (__index = 0; __index < tasks_list.num; __index++)
            {
                __task = tasks_list.tasks[__index];

                if (__task.id() === task_id)
                    return __task.destroy();
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
                    return __task.run(data, callback);
            }

            return false;
        };

        this.kill = function()
        {
            for (__index = 0; __index < tasks_list.num; __index++)
                tasks_list.tasks[__index].destroy();

            tasks_list = new tasks_list_model();

            return null;
        };

        this.tasks = new tasks_info();

        var __index = 0,
            tasks_list = new tasks_list_model();
    }

    function status()
    {
        function status_factory(status)
        {
            var __index = 0, 
                __list = [],
                __task = null;

            for (__index = 0; __index < tasks_manager.tasks.num(); __index++)
            {
                __task = tasks_manager.tasks.list(__index);

                if (__task.status() === status)
                    __list.push(__task);
            }

            return __list;
        }

        this.running = function()
        {
            return status_factory(__tasks_status[0]);
        };

        this.finished = function()
        {
            return status_factory(__tasks_status[1]);
        };

        this.delayed = function()
        {
            return status_factory(__tasks_status[2]);
        };
    }

    function tasks()
    {
        this.num = function()
        {
            return tasks_manager.tasks.num();
        };

        this.list = function(index)
        {
            if (utils.validation.misc.is_undefined(index))
                return tasks_manager.tasks.list();

            if (!utils.validation.numerics.is_integer(index) 
                || index < 0 || index > (tasks_manager.tasks.num() - 1))
                return false;

            return tasks_manager.tasks.list(index);
        };

        this.create = function(worker_file, delay)
        {
            return tasks_manager.create(worker_file, delay);
        };

        this.destroy = function(task_id)
        {
            if (!utils.validation.numerics.is_integer(task_id))
                return false;

            return tasks_manager.destroy(task_id);
        };

        this.run = function(task_id, data, callback = null)
        {
            if (!utils.validation.numerics.is_integer(task_id))
                return false;

            return tasks_manager.run(task_id, data, callback);
        };

        this.kill = function()
        {
            tasks_manager.kill();

            return true;
        };
    }

    function init()
    {
        if (utils.validation.misc.is_undefined(Worker))
            return false;

        self.tasks = new tasks();
        self.status = new status();

        return this;
    }

    var __tasks_status = ['RUNNING', 'FINISHED', 'DELAYED'],
        tasks_manager = new task_manager_model(),
        utils = new vulcan();

    // Initialize
    init();
}
