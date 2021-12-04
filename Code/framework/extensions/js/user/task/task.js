/*
    Task programming

    File name: task.js (Version: 2.0)
    Description: This file contains the Task framework extension.
    Dependencies: Vulcan and Pythia.

    Coded by George Delaportas (G0D)
    Copyright (C) 2021
    Open Software License (OSL 3.0)
*/

// Task
function task()
{
    var self = this;

    function task_model()
    {
        this.id = null;
        this.file = null;
        this.worker = null;
    }

    function task_manager_model()
    {
        this.create = function(worker_file)
        {
            var __new_worker = new Worker(worker_file);

            __task.id = rnd_gen.generate(),
            __task.file = worker_file;
            __task.worker = __new_worker;

            __is_task_created = true;

            return __task.id;
        };

        this.destroy = function()
        {
            __task.worker.terminate();

            __is_task_created = false;

            return true;
        };

        this.message = function(any)
        {
            if (utils.validation.misc.is_function(any))
                 __task.worker.onmessage = function(e) { any.call(this, e); };
            else
                __task.worker.postMessage(any);

            return true;
        };
    }

    function message()
    {
        this.receive = function(callback)
        {
            if (!utils.validation.misc.is_function(callback))
                return false;

            if (__is_task_created === false)
                return false;

            return task_manager.message(callback);
        };

        this.send = function(data)
        {
            if (utils.validation.misc.is_invalid(data))
                return false;

            if (__is_task_created === false)
                return false;

            return task_manager.message(data);
        };
    }

    this.id = function()
    {
        if (__is_task_created === false)
            return false;

        return __task.id;
    };

    this.create = function(worker_file)
    {
        if (utils.validation.misc.is_invalid(worker_file) || !utils.validation.alpha.is_string(worker_file))
            return false;

        if (__is_task_created === true)
            return false;

        return task_manager.create(worker_file);
    };

    this.destroy = function()
    {
        if (__is_task_created === false)
            return false;

        return task_manager.destroy();
    };

    function init()
    {
        if (utils.validation.misc.is_undefined(Worker))
            return false;

        return this;
    }

    var __is_task_created = false,
        __task = new task_model(),
        task_manager = new task_manager_model(),
        rnd_gen = new pythia(),
        utils = new vulcan();

    this.message = new message();

    // Initialize
    init();
}
