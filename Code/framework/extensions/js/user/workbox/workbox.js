/*
    WorkBox (Popup window)

    File name: workbox.js (Version: 1.2)
    Description: This file contains the WorkBox extension.
    Dependencies: Vulcan and Content Fetcher.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2017
    Open Software License (OSL 3.0)
*/

// WorkBox
function workbox()
{
    // General helpers
    function general_helpers()
    {
        var self = this;

        this.draw_screen = function(container_id, title, button_label)
        {
            var __button_object = null,
                __container = utils.objects.by_id(container_id),
                __html = null;

            if (__container === false || utils.validation.misc.is_invalid(__container))
                return false;

            __workbox_object = utils.objects.by_id('workbox');

            if (__workbox_object !== null)
                __container.removeChild(__workbox_object);

            __workbox_object = document.createElement('div');

            __workbox_object.id = 'workbox';
            __workbox_object.className = 'wb_screen';

            var win_title_id = __workbox_object.id + '_title',
                button_title_id = __workbox_object.id + '_button';

            __html = '<div class="work_window">' + 
                     '  <div id="' + win_title_id + '"></div>' + 
                     '  <div id="' + __workbox_object.id + '_content"></div>' + 
                     '  <div id="' + button_title_id + '"></div>' + 
                     '</div>';

            __workbox_object.innerHTML = __html;

            __container.appendChild(__workbox_object);

            content_fetcher(win_title_id, null, 
                            function(content)
                            {
                                utils.objects.by_id(win_title_id).innerHTML = title;
                                utils.objects.by_id(button_title_id).innerHTML = button_label;

                                __button_object = utils.objects.by_id(button_title_id);

                                utils.events.attach(button_title_id, __button_object, 'click',  self.hide_win);
                            });

            return true;
        };

        this.show_win = function(message)
        {
            if (__timer !== null)
                clearTimeout(__timer);

            __workbox_object.childNodes[0].childNodes[3].innerHTML = message;

            __workbox_object.style.visibility = 'visible';

            __workbox_object.classList.remove('wb_fade_out');
            __workbox_object.classList.add('wb_fade_in');

            __is_open = true;

            if (__show_callback !== null)
            {
                __show_callback.call(this);

                __show_callback = null;
            }
        };

        this.hide_win = function()
        {
            if (__timer !== null)
                clearTimeout(__timer);

            __workbox_object.style.visibility = 'visible';

            __workbox_object.classList.remove('wb_fade_in');
            __workbox_object.classList.add('wb_fade_out');

            __timer = setTimeout(function() { __workbox_object.style.visibility = 'hidden'; }, 250);

            __is_open = false;

            if (__hide_callback !== null)
            {
                __hide_callback.call(this);

                __hide_callback = null;
            }
        };
    }

    // Show workbox (with optional callbacks on show & hide)
    this.show = function(message, show_callback, hide_callback)
    {
        if (!__is_init || __is_open || !utils.validation.alpha.is_string(message) || 
            (!utils.validation.misc.is_invalid(show_callback) && 
             !utils.validation.misc.is_function(show_callback)) || 
            (!utils.validation.misc.is_invalid(hide_callback) && 
             !utils.validation.misc.is_function(hide_callback)))
            return false;

        if (utils.validation.misc.is_function(show_callback))
            __show_callback = show_callback;

        if (utils.validation.misc.is_function(hide_callback))
            __hide_callback = hide_callback;

        helpers.show_win(message);

        return true;
    };

    // Hide workbox (with optional hide callback)
    this.hide = function(hide_callback)
    {
        if (!__is_init || !__is_open || 
            (!utils.validation.misc.is_invalid(hide_callback) && 
             !utils.validation.misc.is_function(hide_callback)))
            return false;

        if (utils.validation.misc.is_function(hide_callback))
            __hide_callback = hide_callback;

        helpers.hide_win();

        return true;
    };

    // Get workbox status
    this.is_open = function()
    {
        if (!__is_init)
            return false;

        return __is_open;
    };

    // Initialize
    this.init = function(container_id, title, button_label)
    {
        if (__is_init)
            return false;

        if (utils.validation.misc.is_invalid(container_id) || !utils.validation.alpha.is_string(container_id) || 
            !utils.validation.alpha.is_string(title) || !utils.validation.alpha.is_string(button_label))
            return false;

        if (!utils.graphics.apply_theme('/framework/extensions/js/user/workbox', 'style'))
            return false;

        if (!helpers.draw_screen(container_id, title, button_label))
            return false;

        __is_init = true;

        return true;
    };

    var __is_init = false,
        __is_open = false,
        __workbox_object = null,
        __show_callback = null,
        __hide_callback = null,
        __timer = null,
        helpers = new general_helpers(),
        utils = new vulcan();
}
