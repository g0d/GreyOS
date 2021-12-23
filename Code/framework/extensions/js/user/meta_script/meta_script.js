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
            this.date_time = function()
            {
                
            };

            this.tasks = function()
            {
                
            };

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

        this.notifications = function(notification_config)
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
        colony = cosmos.hub.access('colony');

        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        forest = matrix.get('forest');
        dock = matrix.get('dock');
        user_profile = matrix.get('user_profile');
        tik_tok = matrix.get('tik_tok');
        parrot = matrix.get('parrot');
        octopus = matrix.get('octopus');
        super_tray = matrix.get('super_tray');
        owl = matrix.get('owl');

        return true;
    };

    var cosmos = null,
        matrix = null,
        app_box = null,
        colony = null,
        swarm = null,
        hive = null,
        forest = null,
        dock = null,
        user_profile = null,
        tik_tok = null,
        parrot = null,
        octopus = null,
        super_tray = null,
        owl = null,
        utils_sys = new vulcan();

    this.interface = new interface();
    this.system = new system();
}
