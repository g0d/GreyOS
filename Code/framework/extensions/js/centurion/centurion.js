/*

    GreyOS Inc. - Centurion (Benchmarking facility for GreyOS)
    
    File name: centurion.js (Version: 1.2)
    Description: This file contains the Centution - Benchmarking facility extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Centurion
function centurion()
{

    var self = this;

    function utilities()
    {

        this.msec = function()
        {

            var date_time_object = new Date();

            return date_time_object.getMilliseconds();

        };

    }

    function actions_model()
    {

        this.started = false;
        this.ended = false;
        this.latency_set = false;

    }

    function results_model()
    {

        this.initial_msec = -1;
        this.final_msec = -1;
        this.latency = -1;

    }

    function benchmark()
    {

        this.start = function()
        {

            if (self.status.actions.is_started())
                return false;

            results_list.initial_msec = utils.msec();

            actions_list.started = true;
            actions_list.ended = false;
            actions_list.latency_set = false;

            return true;

        };

        this.end = function()
        {

            if (!self.status.actions.is_started())
                return false;

            results_list.final_msec = utils.msec();

            actions_list.started = false;
            actions_list.ended = true;

            return true;

        };

        this.latency = function()
        {

            if (!self.status.actions.is_ended())
                return false;

            results_list.latency = results_list.final_msec - results_list.initial_msec;

            if (results_list.latency < 0)
                results_list.latency = 0;

            actions_list.started = false;
            actions_list.ended = false;
            actions_list.latency_set = true;

            return results_list.latency;

        };

    }

    function status()
    {

        function actions()
        {

            this.is_started = function()
            {

                return actions_list.started;

            };

            this.is_ended = function()
            {

                return actions_list.ended;

            };

            this.is_latency_set = function()
            {

                return actions_list.latency_set;

            };

        }

        function results()
        {

            this.initial_msec = function()
            {

                return results_list.initial_msec;

            };

            this.final_msec = function()
            {

                return results_list.final_msec;

            };

            this.latency = function()
            {

                return results_list.latency;

            };

        }

        this.actions = new actions();
        this.results = new results();

    }

    var actions_list = new actions_model(),
        results_list = new results_model(),
        utils = new utilities();

    this.benchmark = new benchmark();
    this.status = new status();

}
