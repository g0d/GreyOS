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
    this.keyboard = function()
    {
        return new_keys;
    };

    this.mouse = function()
    {
        return null; //new_mouse
    };

    this.utils = function()
    {
        return new_vulcan;
    };

    this.fx = function()
    {
        return new_fx;
    };

    this.timers = function()
    {
        return new_stopwatch;
    };

    this.random = function()
    {
        return new_pythia;
    };

    this.benchmark = function()
    {
        return new_snail;
    };

    this.ajax = function()
    {
        return new_bull;
    };

    this.parallel = function()
    {
        return new_parallel;
    };

    this.vm = function()
    {
        return new_vm;
    };

    this.hypervisor = function()
    {
        return new_hypervisor;
    };

    this.loader = function()
    {
        return new_loader;
    };

    this.boot = function()
    {
        return new_boot;
    };

    var new_keys = new key_manager(),
        //new_mouse = new mouse_manager(),
        new_vulcan = new vulcan(),
        new_fx = new fx(),
        new_stopwatch = new stopwatch(),
        new_pythia = new pythia(),
        new_snail = new snail(),
        new_bull = new bull(),
        new_parallel = new parallel(),
        new_vm = new cosmos(),
        new_hypervisor = new multiverse(),
        new_loader = new scenario(),
        new_boot = new boot_screen();
}
