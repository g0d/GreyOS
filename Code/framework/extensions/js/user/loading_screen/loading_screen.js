/*
    GreyOS - Loading Screen (Version: 1.0)

    File name: loading_screen.js
    Description: This file contains the Loading Screen utility.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Loading Screen
function loading_screen()
{
    var self = this;

    function utilities()
    {
        this.draw = function()
        {
            var __loading_screen = null;

            __loading_screen = document.createElement('div');
            __loading_screen.id = 'loading_screen';
            __loading_screen.innerHTML = '<div id="loading_screen_content">\
                                            <img src="/site/pix/greyos_logo.png">\
                                            <div id="loading_indicator">LOADING...</div>\
                                          </div>';
            __loading_screen.style.display = 'block';

            document.body.appendChild(__loading_screen);

            return true;
        };

        this.clear = function()
        {
            var __loading_screen = utils_sys.objects.by_id('loading_screen');

            document.body.removeChild(__loading_screen);

            return true;
        };
    }

    function status()
    {
        var __loading = false;

        this.loading = function(val)
        {
            if (utils_sys.validation.misc.is_undefined(val))
                return __loading;

            __loading = val;

            return true;
        };
    }

    this.show = function()
    {
        if (self.status.loading())
            return false;

        if (!utils_int.draw())
            return false;

        self.status.loading(true);

        return true;
    };

    this.hide = function()
    {
        if (!self.status.loading())
            return false;

        utils_int.clear();

        self.status.loading(false);

        return true;
    };

    var utils_sys = new vulcan(),
        utils_int = new utilities();

    this.status = new status();
}
