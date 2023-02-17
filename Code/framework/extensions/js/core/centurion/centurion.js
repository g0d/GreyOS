/*
    Centurion (Benchmarking facility)

    File name: centurion.js (Version: 1.6)
    Description: This file contains the Centurion extension.

    Coded by George Delaportas (G0D)
    Copyright (C) 2014
    Open Software License (OSL 3.0)
*/

// Centurion
function centurion()
{
    function epoch()
    {
        return new Date().getTime();
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
            if (actions_list.started)
                return false;

            results_list.initial_msec = epoch();

            actions_list.started = true;
            actions_list.ended = false;
            actions_list.latency_set = false;

            return true;
        };

        this.end = function()
        {
            if (!actions_list.started)
                return false;

            results_list.final_msec = epoch();

            actions_list.started = false;
            actions_list.ended = true;

            return true;
        };

        this.latency = function()
        {
            if (!actions_list.ended)
                return false;

            results_list.latency = results_list.final_msec - results_list.initial_msec;

            actions_list.started = false;
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

    function init()
    {
        self.benchmark = new benchmark();
        self.status = new status();
    }

    var self = this,
        actions_list = new actions_model(),
        results_list = new results_model();

    // Initialize
    init();
}
