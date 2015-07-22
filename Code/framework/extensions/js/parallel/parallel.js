/*

    GreyOS Inc. - Parallel programming utilities for GreyOS
    
    File name: parallel.js (Version: 1.0)
    Description: This file contains the Parallel extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2014

*/



// Parallel
function parallel()
{

    function utilities()
    {

        

    }

    function task_model()
    {

        this.id = null;
        this.type = null;
        this.delay = null;
        this.status = null;
        this.start_time = null;
        this.end_time = null;
        this.command = null;

    }

    function task_manager_model()
    {

        this.num = 0;
        this.list = [];

    }

    function status()
    {

        this.running = function()
        {

            

        };

        this.ended = function()
        {

            

        };

        this.delayed = function()
        {

            

        };

    }

    function tasks()
    {

        this.num = function()
        {

            return task_manager.num;

        };

        this.list = function(index)
        {

            if (vulcan.validation.misc.is_undefined(index))
                return task_manager.list;

            if (!vulcan.validation.numerics.is_integer(index) || index < 0 || index > (task_manager.num - 1))
                return false;

            return task_manager.list[index];

            return true;

        };

        this.create = function(task, type, delay)
        {

            if (!vulcan.validation.misc.is_function(task) || !vulcan.validation.numerics.is_integer(type) || type < 1 || type > 2 || 
                (!vulcan.validation.misc.is_unefined(delay) && !vulcan.validation.numerics.is_integer(delay) || delay < 1 || delay > 60000))
                return false;

            var __task_id = null,
                __pythia = matrix.get('pythia');



            return __task_id;

        };

        this.destroy = function(task_id)
        {

            if (!vulcan.validation.numerics.is_integer(task_id))
                return false;



            return true;

        };

    }

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        vulcan = cosmos_object.hub.access('vulcan');
        matrix = cosmos_object.hub.access('matrix');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        vulcan = null,
        matrix = null,
        task_manager = new task_manager_model(),
        utils = new utilities();

    this.tasks = new tasks();
    this.status = new status();

}
