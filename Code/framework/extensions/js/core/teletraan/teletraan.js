/*
    GreyOS - Teletraan (Version: 1.2)

    File name: teletraan.js
    Description: This file contains the Teletraan - Centralized boot settings module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2023
    Open Software License (OSL 3.0)
*/

// Teletraan
function teletraan()
{
    var self = this;

    function settings_model()
    {
        this.boot_mode = 0;
        this.name = 'GreyOS';
        this.version = '0.0';
        this.theme = null;
        this.max_apps = 10;
        this.max_services = 10;
        this.apps_per_view = 8;
        this.stack_bars = 4;
    }

    this.get = function(option)
    {
        if (utils_sys.validation.alpha.is_symbol(option))
            return false;

        if (!settings.hasOwnProperty(option))
            return false;

        return settings[option];
    };

    this.set = function(option, val)
    {
        if (utils_sys.validation.alpha.is_symbol(option) || utils_sys.validation.misc.is_undefined(val))
            return false;

        if (!settings.hasOwnProperty(option))
            return false;

        settings[option] = val;

        return true;
    };

    this.reset = function()
    {
        settings = new settings_model();

        return true;
    };

    var settings = new settings_model(),
        utils_sys = new vulcan();
}
