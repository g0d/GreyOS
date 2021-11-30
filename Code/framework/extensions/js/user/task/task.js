/*
    Task programming

    File name: task.js (Version: 1.0)
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
        this.delay = 0;
        this.status = null;
        this.file = null;
        this.worker = null;
    }

    function task_manager_model()
    {
        this.create = function(worker_file, delay)
        {
            var __new_worker = new Worker(worker_file);

            __task.id = rnd_gen.generate(),
            __task.file = worker_file;
            __task.worker = __new_worker;

            if (!utils.validation.misc.is_undefined(delay))
            {
                __task.delay = delay;
                __task.status = __task_status[2];
            }
            else
                __task.status = __task_status[0];

            return __task.id;
        };

        this.destroy = function()
        {
            __task.worker.terminate();
            __task.status = __task_status[1];

            return true;
        };

        this.run = function(data, callback)
        {
            if (__task.delay > 0)
            {
                clearTimeout(__timer_handler);

                __timer_handler = setTimeout(function() { __task.worker.postMessage(data); }, __task.delay);
            }
            else
                __task.worker.postMessage(data);

            __task.status = __task_status[0];

            if (callback !== null)
                __task.worker.onmessage = function(e) {callback.call(this, e); };

            return true;
        };

        var __timer_handler = null;
    }

    this.create = function(worker_file, delay)
    {
        if (utils.validation.misc.is_invalid(worker_file) || !utils.validation.alpha.is_string(worker_file) || 
            (!utils.validation.misc.is_undefined(delay) && (!utils.validation.numerics.is_integer(delay) || 
             delay < 1 || delay > 86400000)))
            return false;

        return task_manager.create(worker_file, delay);
    };

    this.destroy = function()
    {
        return task_manager.destroy();
    };

    this.run = function(data, callback = null)
    {
        if (utils.validation.misc.is_invalid(data) || 
            (callback !== null && !utils.validation.misc.is_function(callback)))
            return false;

        return task_manager.run(data, callback);
    };

    this.id = function()
    {
        return __task.id;
    };

    this.status = function()
    {
        return __task.status;
    };

    function init()
    {
        if (utils.validation.misc.is_undefined(Worker))
            return false;

        return this;
    }

    var __task_status = ['RUNNING', 'FINISHED', 'DELAYED'],
        __task = new task_model(),
        task_manager = new task_manager_model(),
        rnd_gen = new pythia(),
        utils = new vulcan();

    // Initialize
    init();
}
