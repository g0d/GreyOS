/*
    GreyOS - Meta-Script (Version: 1.0)

    File name: meta_script.js
    Description: This file contains the Meta-Script - Meta scripting language interface (wrapper) module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Meta-Script
function meta_script()
{
    var self = this;

    function interface()
    {
        this.desktops = function()
        {
            
        };

        this.dock = function()
        {
            
        };

        this.stack = function()
        {
            
        };

        this.tray = function()
        {
            
        };
    }

    function system()
    {
        function profile()
        {
            this.messages = function()
            {
                
            };

            this.alerts = function()
            {
                
            };

            this.calendar = function()
            {
                
            };
        }

        function os()
        {
            this.reboot = function()
            {
                
            };

            this.logout = function()
            {
                
            };
        }

        this.apps = function()
        {
            
        };

        this.services = function()
        {
            
        };

        this.notifications = function()
        {
            
        };

        this.profile = new profile();
        this.os = new os();
    }

    this.app = function(app_config)
    {
        
    };

    this.service = function(service_config)
    {
        
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');

        return true;
    };

    var cosmos = null,
        matrix = null,
        app_box = null,
        utils_sys = new vulcan();

    this.interface = new interface();
    this.system = new system();
}
