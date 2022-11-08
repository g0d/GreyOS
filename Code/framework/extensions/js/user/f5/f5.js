/*
    GreyOS - F5 (Version: 1.0)

    File name: f5.js
    Description: This file contains the F5 - Screen refresh handler utility.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// F5
function f5()
{
    function reboot(message)
    {
        var __dynamic_object = null,
            __message = 'Unloading...';

        if (!utils_sys.validation.misc.is_undefined(message))
        {
            if (utils_sys.validation.alpha.is_symbol(message))
                return false;

            __message = message;
        }

        __dynamic_object = document.createElement('div');

        __dynamic_object.setAttribute('id', 'f5_screen');
        __dynamic_object.innerHTML = '<div id="f5_screen_content">\
                                          <img src="/site/pix/greyos_logo.png">\
                                          <div id="f5_screen_message">' + __message + '</div>\
                                      </div>';

        utils_sys.objects.by_id('greyos').appendChild(__dynamic_object);

        location.reload();
    }

    this.init = function(message)
    {
        if (is_rebooting === true)
            return;

        is_rebooting = true;

        reboot(message);
    };

    var is_rebooting = false,
        utils_sys = new vulcan();
}
