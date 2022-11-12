/*
    MsgBox (Message Window)

    File name: msgbox.js (Version: 1.4)
    Description: This file contains the MsgBox extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2017 - 2022
    Open Software License (OSL 3.0)
*/

// MsgBox 
function msgbox()
{
    // General helpers
    function general_helpers()
    {
        var self = this;

        this.draw_screen = function(container_id)
        {
            var button_object = null,
                container = utils.objects.by_id(container_id),
                html = null;

            if (container === false || utils.validation.misc.is_undefined(container) || container === null)
                return false;

            __msgbox_object = utils.objects.by_id('msgbox');

            if (__msgbox_object !== null)
                container.removeChild(__msgbox_object);

            __msgbox_object = document.createElement('div');

            __msgbox_object.id = 'msgbox';
            __msgbox_object.className = 'mb_screen';

            var win_title = __msgbox_object.id + '_title',
                button_title = __msgbox_object.id + '_button';

            html = '<div class="msg_window">' + 
                     '  <div id="' + win_title + '"></div>' + 
                     '  <div id="' + __msgbox_object.id + '_content"></div>' + 
                     '  <div id="' + button_title + '">Close</div>' + 
                     '</div>';

            __msgbox_object.innerHTML = html;

            container.appendChild(__msgbox_object);

            button_object = utils.objects.by_id(button_title);

            utils.events.attach(button_title, button_object, 'click',  self.hide_win);

            return true;
        };

        this.show_win = function(title, message)
        {
            if (__timer !== null)
                clearTimeout(__timer);

            __msgbox_object.childNodes[0].childNodes[1].innerHTML = title;
            __msgbox_object.childNodes[0].childNodes[3].innerHTML = message;

            __msgbox_object.style.visibility = 'visible';

            __msgbox_object.classList.remove('mb_fade_out');
            __msgbox_object.classList.add('mb_fade_in');

            __is_open = true;
        };

        this.hide_win = function()
        {
            if (__timer !== null)
                clearTimeout(__timer);

            __msgbox_object.style.visibility = 'visible';

            __msgbox_object.classList.remove('mb_fade_in');
            __msgbox_object.classList.add('mb_fade_out');

            __timer = setTimeout(function() { __msgbox_object.style.visibility = 'hidden'; }, 250);

            __is_open = false;

            if (__hide_callback !== null)
            {
                __hide_callback.call(this);

                __hide_callback = null;
            }
        };
    }

    // Show msgbox (with optional callback on hide)
    this.show = function(title, message, hide_callback)
    {
        if (!__is_init || __is_open || 
            !utils.validation.alpha.is_string(title) || 
            !utils.validation.alpha.is_string(message) || 
            (!utils.validation.misc.is_invalid(hide_callback) && 
             !utils.validation.misc.is_function(hide_callback)))
            return false;

        if (utils.validation.misc.is_function(hide_callback))
            __hide_callback = hide_callback;

        helpers.show_win(title, message);

        return true;
    };

    // Hide msgbox (with optional callback)
    this.hide = function(callback)
    {
        if (!__is_init || !__is_open || 
            (!utils.validation.misc.is_invalid(callback) && 
             !utils.validation.misc.is_function(callback)))
            return false;

        if (utils.validation.misc.is_function(callback))
            __hide_callback = callback;

        helpers.hide_win();

        return true;
    };

    // Get msgbox status
    this.is_open = function()
    {
        if (!__is_init)
            return false;

        return __is_open;
    };

    // Initialize
    this.init = function(container_id)
    {
        if (__is_init)
            return false;

        if (utils.validation.misc.is_invalid(container_id) || !utils.validation.alpha.is_string(container_id))
            return false;

        utils.graphics.apply_theme('/framework/extensions/js/core/msgbox', 'msgbox');

        if (!helpers.draw_screen(container_id))
            return false;

        __is_init = true;

        return true;
    };

    var __is_init = false,
        __is_open = false,
        __msgbox_object = null,
        __hide_callback = null,
        __timer = null,
        helpers = new general_helpers(),
        utils = new vulcan();
}
