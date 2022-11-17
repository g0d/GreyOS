/*
    WorkBox (Popup window)

    File name: workbox.js (Version: 1.4)
    Description: This file contains the WorkBox extension.
    Dependencies: Vulcan and Content Fetcher.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2017 - 2022
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
            var __title_object = null,
                __button_object = null,
                __container = utils.objects.by_id(container_id),
                __html = null;

            if (__container === false || utils.validation.misc.is_invalid(__container))
                return false;

            workbox_object = utils.objects.by_id('workbox');

            if (workbox_object !== null)
                __container.removeChild(workbox_object);

            workbox_object = document.createElement('div');

            workbox_object.id = 'workbox';
            workbox_object.className = 'wb_screen';

            var __win_title_id = workbox_object.id + '_title',
                __button_title_id = workbox_object.id + '_button';

            __html = '<div class="work_window">' + 
                     '  <div id="' + __win_title_id + '"></div>' + 
                     '  <div id="' + workbox_object.id + '_content"></div>' + 
                     '  <div id="' + __button_title_id + '"></div>' + 
                     '</div>';

            workbox_object.innerHTML = __html;

            __container.appendChild(workbox_object);

            __title_object = utils.objects.by_id(__win_title_id);
            __button_object = utils.objects.by_id(__button_title_id);

            content_fetcher(__win_title_id, null, 
                            function()
                            {
                                __title_object.innerHTML = title;
                                __button_object.innerHTML = button_label;
                            },
                            function()
                            {
                                __title_object.innerHTML = 'Alert';
                                __button_object.innerHTML = 'Close';
                            },
                            function()
                            {
                                utils.events.attach(__button_title_id, __button_object, 'click',  self.hide_win);
                            });

            return true;
        };

        this.show_win = function(message)
        {
            if (timer !== null)
                clearTimeout(timer);

            workbox_object.childNodes[0].childNodes[3].innerHTML = message;

            workbox_object.style.visibility = 'visible';

            workbox_object.classList.remove('wb_fade_out');
            workbox_object.classList.add('wb_fade_in');

            is_open = true;

            if (global_show_callback !== null)
            {
                global_show_callback.call(this);

                global_show_callback = null;
            }
        };

        this.hide_win = function()
        {
            if (timer !== null)
                clearTimeout(timer);

            workbox_object.style.visibility = 'visible';

            workbox_object.classList.remove('wb_fade_in');
            workbox_object.classList.add('wb_fade_out');

            timer = setTimeout(function() { workbox_object.style.visibility = 'hidden'; }, 250);

            is_open = false;

            if (global_hide_callback !== null)
            {
                global_hide_callback.call(this);

                global_hide_callback = null;
            }
        };
    }

    // Show workbox (with optional callbacks on show & hide)
    this.show = function(message, show_callback, hide_callback)
    {
        if (!is_init || is_open || !utils.validation.alpha.is_string(message) || 
            (!utils.validation.misc.is_invalid(show_callback) && 
             !utils.validation.misc.is_function(show_callback)) || 
            (!utils.validation.misc.is_invalid(hide_callback) && 
             !utils.validation.misc.is_function(hide_callback)))
            return false;

        if (utils.validation.misc.is_function(show_callback))
            global_show_callback = show_callback;

        if (utils.validation.misc.is_function(hide_callback))
            global_hide_callback = hide_callback;

        helpers.show_win(message);

        return true;
    };

    // Hide workbox (with optional hide callback)
    this.hide = function(hide_callback)
    {
        if (!is_init || !is_open || 
            (!utils.validation.misc.is_invalid(hide_callback) && 
             !utils.validation.misc.is_function(hide_callback)))
            return false;

        if (utils.validation.misc.is_function(hide_callback))
            global_hide_callback = hide_callback;

        helpers.hide_win();

        return true;
    };

    // Get workbox status
    this.is_open = function()
    {
        if (!is_init)
            return false;

        return is_open;
    };

    // Initialize
    this.init = function(container_id, title, button_label)
    {
        if (is_init)
            return false;

        if (utils.validation.misc.is_invalid(container_id) || !utils.validation.alpha.is_string(container_id) || 
            !utils.validation.alpha.is_string(title) || !utils.validation.alpha.is_string(button_label))
            return false;

        utils.graphics.apply_theme('/framework/extensions/js/user/workbox', 'workbox');

        if (!helpers.draw_screen(container_id, title, button_label))
            return false;

        is_init = true;

        return true;
    };

    var is_init = false,
        is_open = false,
        workbox_object = null,
        global_show_callback = null,
        global_hide_callback = null,
        timer = null,
        helpers = new general_helpers(),
        utils = new vulcan();
}
