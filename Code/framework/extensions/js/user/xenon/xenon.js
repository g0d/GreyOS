/*
    GreyOS - Xenon (Version: 1.0)

    File name: xenon.js
    Description: This file contains the Xenon - System-wide information holder module.

    Coded by George Delaportas (G0D)
    Copyright © 2022
    Open Software License (OSL 3.0)
*/

// Xenon
function xenon()
{
    var self = this;

    function sys_info_model()
    {
        this.os_name = null;
        this.os_version = null;
        this.cpu_cores = navigator.hardwareConcurrency;
        this.ram = navigator.deviceMemory;
    }

    this.store = function(user_settings)
    {
        var __this_user_setting = null;

        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_object(user_settings))
            return false;

        if (user_settings.hasOwnProperty('cpu_cores') || user_settings.hasOwnProperty('ram'))
            return false;

        for (__this_user_setting in user_settings)
        {
            if (!sys_info.hasOwnProperty(__this_user_setting))
                return;
        }

        for (__this_user_setting in user_settings)
            sys_info[__this_user_setting] = user_settings[__this_user_setting];

        return true;
    };

    this.load = function(setting)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_nothing(setting))
            return false;

        if (!sys_info.hasOwnProperty(setting))
            return false;

        return sys_info[setting];
    };

    this.list = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return sys_info;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var cosmos = null,
        utils_sys = new vulcan(),
        sys_info = new sys_info_model();
}
