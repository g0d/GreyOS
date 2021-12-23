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

    function config_models()
    {
        this.app = {};
        this.service = {};
        this.notification = {};
    }

    function interface()
    {
        this.desktops = function()
        {
            return forest;
        };

        this.dock = function()
        {
            return dock;
        };

        this.stack = function()
        {
            return hive;
        };

        this.tray = function()
        {
            return super_tray;
        };
    }

    function system()
    {
        function profile()
        {
            this.messages = function()
            {
                return true;
            };

            this.alerts = function()
            {
                return true;
            };

            this.calendar = function()
            {
                return true;
            };
        }

        function os()
        {
            this.date_time = function()
            {
                return tik_tok;
            };

            this.tasks = function()
            {
                return owl;
            };

            this.reboot = function()
            {
                cc_reload.init();

                return true;
            };

            this.logout = function()
            {
                user_profile.logout();

                return true;
            };
        }

        this.apps = function()
        {
            return app_box;
        };

        this.services = function()
        {
            return matrix;
        };

        this.notifications = function(notification_config)
        {
            return true;
        };

        this.profile = new profile();
        this.os = new os();
    }

    this.app = function(app_config)
    {
        var new_app_bee = dev_box.get('bee');

        // Do stuff...
        new_app_bee.show();

        return true; 
    };

    this.service = function(service_config)
    {
        // Do stuf...

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');
        dev_box = cosmos.hub.access('dev_box');
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
        infinity = matrix.get('infinity');

        return true;
    };

    var cosmos = null,
        matrix = null,
        app_box = null,
        dev_box = null,
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
        infinity = null,
        utils_sys = new vulcan(),
        config_parser = new jap(),
        cc_reload = new f5(),
        config_models = new config_models();

    this.interface = new interface();
    this.system = new system();
}
