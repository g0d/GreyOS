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
            var __button_object = null,
                __container = utils.objects.by_id(container_id),
                __html = null;

            if (__container === false || utils.validation.misc.is_undefined(__container) || __container === null)
                return false;

            msgbox_object = utils.objects.by_id('msgbox');

            if (msgbox_object !== null)
                __container.removeChild(msgbox_object);

            msgbox_object = document.createElement('div');

            msgbox_object.id = 'msgbox';
            msgbox_object.className = 'mb_screen';

            var __win_title = msgbox_object.id + '_title',
                __button_title = msgbox_object.id + '_button';

            __html = '<div class="msg_window">' + 
                     '  <div id="' + __win_title + '"></div>' + 
                     '  <div id="' + msgbox_object.id + '_content"></div>' + 
                     '  <div id="' + __button_title + '">Close</div>' + 
                     '</div>';

            msgbox_object.innerHTML = __html;

            __container.appendChild(msgbox_object);

            __button_object = utils.objects.by_id(__button_title);

            utils.events.attach(__button_title, __button_object, 'click',  self.hide_win);

            return true;
        };

        this.show_win = function(title, message)
        {
            if (timer !== null)
                clearTimeout(timer);

            msgbox_object.childNodes[0].childNodes[1].innerHTML = title;
            msgbox_object.childNodes[0].childNodes[3].innerHTML = message;

            msgbox_object.style.visibility = 'visible';

            msgbox_object.classList.remove('mb_fade_out');
            msgbox_object.classList.add('mb_fade_in');

            is_open = true;
        };

        this.hide_win = function()
        {
            if (timer !== null)
                clearTimeout(timer);

            msgbox_object.style.visibility = 'visible';

            msgbox_object.classList.remove('mb_fade_in');
            msgbox_object.classList.add('mb_fade_out');

            timer = setTimeout(function() { msgbox_object.style.visibility = 'hidden'; }, 250);

            is_open = false;

            if (global_hide_callback !== null)
            {
                global_hide_callback.call(this);

                global_hide_callback = null;
            }
        };
    }

    // Show msgbox (with optional callback on hide)
    this.show = function(title, message, hide_callback)
    {
        if (!is_init || is_open || 
            !utils.validation.alpha.is_string(title) || 
            !utils.validation.alpha.is_string(message) || 
            (!utils.validation.misc.is_invalid(hide_callback) && 
             !utils.validation.misc.is_function(hide_callback)))
            return false;

        if (utils.validation.misc.is_function(hide_callback))
            global_hide_callback = hide_callback;

        helpers.show_win(title, message);

        return true;
    };

    // Hide msgbox (with optional callback)
    this.hide = function(callback)
    {
        if (!is_init || !is_open || 
            (!utils.validation.misc.is_invalid(callback) && 
             !utils.validation.misc.is_function(callback)))
            return false;

        if (utils.validation.misc.is_function(callback))
            global_hide_callback = callback;

        helpers.hide_win();

        return true;
    };

    // Get msgbox status
    this.is_open = function()
    {
        if (!is_init)
            return false;

        return is_open;
    };

    // Initialize
    this.init = function(container_id)
    {
        if (is_init)
            return false;

        if (utils.validation.misc.is_invalid(container_id) || !utils.validation.alpha.is_string(container_id))
            return false;

        utils.graphics.apply_theme('/framework/extensions/js/core/msgbox', 'msgbox');

        if (!helpers.draw_screen(container_id))
            return false;

        is_init = true;

        return true;
    };

    var is_init = false,
        is_open = false,
        msgbox_object = null,
        global_hide_callback = null,
        timer = null,
        helpers = new general_helpers(),
        utils = new vulcan();
}
