/*
    GreyOS - Firefox Mode (Version: 1.0)

    File name: firefox_mode.js
    Description: This file contains the Firefox Mode utility.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// Firefox Mode
function firefox_mode()
{
    var self = this;

    function utilities()
    {
        this.apply_css_fix = function()
        {
            utils_sys.graphics.apply_theme('/framework/extensions/js/core/firefox_mode', 'firefox');

            return true;
        };
    }

    this.check = function()
    {
        if (navigator.userAgent.indexOf('Chrome') === -1)
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
