/*
    GreyOS - Chameleon (Version: 1.0)

    File name: chameleon.js
    Description: This file contains the Chameleon - System theme information module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Chameleon
function chameleon()
{
    var self = this;

    function theme_in_use()
    {
        function theme_data()
        {
            this.pictures = [];
            this.sounds = [];
        }

        this.name = null;
        this.list = new theme_data();
    }

    this.get = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (sys_theme.name === null)
            return false;

        return sys_theme.name;
    };

    this.set = function(theme)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(theme))
            return false;

        sys_theme.name = theme;

        return true;
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
        sys_theme = new theme_in_use();
}
