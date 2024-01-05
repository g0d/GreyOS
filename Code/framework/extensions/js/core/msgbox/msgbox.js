/*
    MsgBox (Message Window)

    File name: msgbox.js (Version: 2.0)
    Description: This file contains the MsgBox extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2017 - 2024
    Open Software License (OSL 3.0)
*/

// MsgBox 
function msgbox()
{
    var self = this;

    // Types of msgbox
    function types_model()
    {
        this.SINGLE_BUTTON = 0;
        this.DUAL_BUTTON = 1;
        this.TRIPLE_BUTTON = 2;
    }

    // General helpers
    function general_helpers()
    {
        var me = this;

        this.draw_screen = function(container_id)
        {
            var __button_object = null,
                __container = utils.objects.by_id(container_id),
                __html = null;

            if (__container === false || utils.validation.misc.is_undefined(__container) || __container === null)
                return false;

            msgbox_object = utils.objects.by_id('msgbox');

            if (msgbox_object !== null)
            {
                try
                {
                    __container.removeChild(msgbox_object);
                }
                catch
                {
                    var __previous_container = msgbox_object.parentNode;

                    __previous_container.removeChild(msgbox_object);
                }
            }

            msgbox_object = document.createElement('div');

            msgbox_object.id = 'msgbox';
            msgbox_object.className = 'mb_screen';

            var __win_title = msgbox_object.id + '_title',
                __button_title = msgbox_object.id + '_button';

            __html = '<div class="msg_window">' + 
                     '  <div id="' + __win_title + '"></div>' + 
                     '  <div id="' + msgbox_object.id + '_content"></div>' + 
                     '  <div id="' + msgbox_object.id + '_buttons_area">' + 
                     '      <div id="' + __button_title + '_1" class="msgbox_button">Close</div>' + 
                     '  </div>' + 
                     '</div>';

            msgbox_object.innerHTML = __html;

            __container.appendChild(msgbox_object);

            __button_object = utils.objects.by_id(__button_title + '_1');

            utils.events.attach(__button_title + '_1', __button_object, 'click', 
            () => 
            {
                if (global_hide_callbacks.length > 0)
                    global_hide_callbacks[0].call(this);

                me.hide_win();
            });

            return true;
        };

        this.show_win = function(title, message, type)
        {
            if (timer !== null)
                clearTimeout(timer);

            msgbox_object.childNodes[0].childNodes[1].innerHTML = title;
            msgbox_object.childNodes[0].childNodes[3].innerHTML = message;

            var __container = utils.objects.by_id(msgbox_object.id + '_buttons_area'),
                __button_object = null;

            if (type === self.types.DUAL_BUTTON)
            {
                msgbox_object.childNodes[0].childNodes[5].childNodes[1].style.float = 'left';
                msgbox_object.childNodes[0].childNodes[5].childNodes[1].innerHTML = 'Yes';

                __button_object = document.createElement('div');

                __button_object.id = msgbox_object.id + '_button_2';
                __button_object.className = 'msgbox_button';
                __button_object.style.float = 'right';
                __button_object.innerHTML = 'No';

                __container.appendChild(__button_object);

                utils.events.attach(__button_object.id, __button_object, 'click', 
                () => 
                {
                    if (global_hide_callbacks.length > 1)
                        global_hide_callbacks[1].call(this);

                    me.hide_win();
                });    
            }
            else if (type === self.types.TRIPLE_BUTTON)
            {
                msgbox_object.childNodes[0].childNodes[5].classList.add('mb_buttons_triple');
                msgbox_object.childNodes[0].childNodes[5].childNodes[1].classList.add('mb_triple');
                msgbox_object.childNodes[0].childNodes[5].childNodes[1].innerHTML = 'Yes';

                __button_object = document.createElement('div');

                __button_object.id = msgbox_object.id + '_button_2';
                __button_object.className = 'msgbox_button mb_triple';
                __button_object.innerHTML = 'No';

                __container.appendChild(__button_object);

                utils.events.attach(__button_object.id, __button_object, 'click', 
                () => 
                {
                    if (global_hide_callbacks.length > 1)
                        global_hide_callbacks[1].call(this);

                    me.hide_win();
                });

                __button_object = document.createElement('div');

                __button_object.id = msgbox_object.id + '_button_3';
                __button_object.className = 'msgbox_button mb_triple';
                __button_object.innerHTML = 'Cancel';

                __container.appendChild(__button_object);

                utils.events.attach(__button_object.id, __button_object, 'click', 
                () => 
                {
                    if (global_hide_callbacks.length > 2)
                        global_hide_callbacks[2].call(this);

                    me.hide_win();
                });
            }

            msgbox_object.style.visibility = 'visible';

            msgbox_object.classList.remove('mb_fade_out');
            msgbox_object.classList.add('mb_fade_in');

            global_type = type;

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

            global_hide_callbacks = [];

            is_open = false;
        };
    }

    // Show msgbox (with type and optional callbacks on hide)
    this.show = function(title, message, type = self.types.SINGLE_BUTTON, hide_callback_array = [])
    {
        if (!is_init || is_open || 
            !utils.validation.alpha.is_string(title) || 
            !utils.validation.alpha.is_string(message))
            return false;
         
        if (!utils.validation.misc.is_invalid(hide_callback_array) && 
            !utils.validation.misc.is_array(hide_callback_array))
            return false;

        if (hide_callback_array.length > 0)
        {
            if ((global_type === self.types.SINGLE_BUTTON && hide_callback_array.length > 1) || 
                (global_type === self.types.DUAL_BUTTON && hide_callback_array.length > 2) ||
                (global_type === self.types.TRIPLE_BUTTON && hide_callback_array.length > 3))
                return false;
        }

        var __found = false;

        for (var [__key, __value] of Object.entries(self.types))
        {
            if (__value === type)
            {
                __found = true;

                break;
            }
        }

        if (!__found)
            return false;

        var i = 0;

        for (i = 0; i < hide_callback_array.length; i++)
        {
            if (!utils.validation.misc.is_function(hide_callback_array[i]))
                return false;

            global_hide_callbacks.push(hide_callback_array[i]);
        }

        helpers.show_win(title, message, type);

        return true;
    };

    // Hide msgbox (with optional callbacks)
    this.hide = function(hide_callback_array = [])
    {
        if (!is_init || !is_open)
            return false;

        if (!utils.validation.misc.is_invalid(hide_callback_array) && 
            !utils.validation.misc.is_array(hide_callback_array))
            return false;

        if (hide_callback_array.length > 0)
        {
            if ((global_type === self.types.SINGLE_BUTTON && hide_callback_array.length > 1) || 
                (global_type === self.types.DUAL_BUTTON && hide_callback_array.length > 2) || 
                (global_type === self.types.TRIPLE_BUTTON && hide_callback_array.length > 3))
                return false;
        }

        for (i = 0; i < hide_callback_array.length; i++)
        {
            if (!utils.validation.misc.is_function(hide_callback_array[i]))
                return false;

            global_hide_callbacks.push(hide_callback_array[i]);
        }

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

    // Initialize msgbox
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
        global_type = null,
        global_hide_callbacks = [],
        timer = null,
        helpers = new general_helpers(),
        utils = new vulcan();

    this.types = new types_model();
}
