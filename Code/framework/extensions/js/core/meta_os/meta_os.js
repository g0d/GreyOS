/*
    GreyOS - Meta-OS (Version: 1.0)

    File name: meta_os.js
    Description: This file contains the Meta-OS - Interface module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Meta-OS
function meta_os()
{
    function boot()
    {
        this.start = function()
        {
            return new boot_screen();
        };

        this.loader = function()
        {
            return new scenario();
        };

        this.environment = function()
        {
            return new linux_mode();
        };
    }

    function system()
    {
        function io()
        {
            this.keyboard = function()
            {
                return new key_manager();
            };
        
            this.mouse = function()
            {
                return null;
            };

            this.screen = function()
            {
                return null;
            };
        }

        function hypervisor()
        {
            this.console = function()
            {
                return new multiverse();
            };

            this.vm = function()
            {
                return new cosmos();
            };
        }

        this.timers = function()
        {
            return new stopwatch();
        };

        this.io = new io();
        this.hypervisor = new hypervisor();
    }

    function utilities()
    {
        this.general = function()
        {
            return new vulcan();
        };

        this.benchmark = function()
        {
            return new snail();
        };
    }

    this.settings = function()
    {
        return new teletraan();
    };

    this.boot = new boot();
    this.system = new system();
    this.utilities = new utilities();
}
