/*
    GreyOS - Tablet Mode (Version: 1.0)

    File name: tablet_mode.js
    Description: This file contains the Tablet Mode utility.

    Coded by George Delaportas (G0D)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// Tablet Mode
function tablet_mode()
{
    var self = this;

    function utilities()
    {
        this.apply_css_fix = function()
        {
            utils_sys.graphics.apply_theme('/framework/extensions/js/core/tablet_mode', 'tablet');

            return true;
        };
    }

    this.check = function()
    {
        if (navigator.userAgent.indexOf('android') > -1 || navigator.userAgent.indexOf('ios') > -1)
            return true;

        return false;
    };

    this.init = function()
    {
        utils_int.apply_css_fix();

        return true;
    };

    var utils_sys = new vulcan(),
        utils_int = new utilities();
}
