/*
    GreyOS - Meta-OS (Version: 1.2)

    File name: meta_os.js
    Description: This file contains the Meta-OS - Interface module.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2013 - 2024
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
            var __linux_mode = new linux_mode(),
                __tablet_mode = new tablet_mode();

            if (__tablet_mode.check())
                return __tablet_mode;

            if (__linux_mode.check())
                return __linux_mode;

            return false;
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
