/*
    GreyOS - Boot Screen (Version: 1.2)

    File name: boot_screen.js
    Description: This file contains the Boot Screen utility.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Boot Screen
function boot_screen()
{
    function utilities()
    {
        this.draw_boot_screen = function()
        {
            var __dynamic_object = null;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'boot_screen');
            __dynamic_object.innerHTML = '<div id="boot_screen_content">\
                                              <img src="/site/pix/greyos_logo.png">\
                                              <br>\
                                              <div id="boot_screen_message"></div>\
                                          </div>';

            utils_sys.objects.by_id('greyos').appendChild(__dynamic_object);
        };
    }

    this.init = function()
    {
        if (navigator.vendor.indexOf('Google') === -1)
        {
            utils_int.draw_boot_screen();

            var __boot_message = utils_sys.objects.by_id('boot_screen_message');

            __boot_message.innerHTML = 'Your browser is incompatible!' + 
                                       '<br>' +
                                       'Use Chrome or Chromium to access the Meta-OS.';

            return false;
        }
        else if (navigator.onLine === false)
        {
            utils_int.draw_boot_screen();

            var __boot_message = utils_sys.objects.by_id('boot_screen_message');

            __boot_message.innerHTML = 'Your are offline!' + 
                                       '<br>' +
                                       'Check your Internet connection and reload.';

            return false;
        }
        else if (window.innerWidth < 1366 || window.innerHeight < 700)
        {
            utils_int.draw_boot_screen();

            var __boot_message = utils_sys.objects.by_id('boot_screen_message');

            __boot_message.innerHTML = 'Your screen is too small to run GreyOS!' + 
                                       '<br>' +
                                       'Only screens from "1366 x 700" pixels and up are supported.';

            return false;
        }

        return true;
    };

    var utils_sys = new vulcan(),
        utils_int = new utilities();
}
