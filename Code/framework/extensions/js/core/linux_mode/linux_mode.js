/*
    GreyOS - Linux Mode (Version: 1.0)

    File name: linux_mode.js
    Description: This file contains the Linux Mode utility.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Linux Mode
function linux_mode()
{
    function utilities()
    {
        this.apply_css_fix = function()
        {
            utils_sys.graphics.apply_theme('/framework/extensions/js/core/linux_mode', 'linux');

            return true;
        };
    }

    this.init = function()
    {
        if (navigator.userAgent.indexOf('Linux') > -1)
        {
            utils_int.apply_css_fix();

            return true;
        }

        return false;
    };

    var utils_sys = new vulcan(),
        utils_int = new utilities();
}
