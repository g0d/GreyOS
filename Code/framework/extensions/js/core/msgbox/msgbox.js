/*
    MsgBox (Message Window)

    File name: msgbox.js (Version: 2.8)
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

    // Types of MsgBox
    function types_model()
    {
        this.OK = 0;
        this.OK_CANCEL = 1;
        this.YES_NO = 2;
        this.YES_NO_CANCEL = 3;
    }

    // General helpers
    function general_helpers()
    {
        var me = this;

        this.draw_screen = function(container_id)
        {
            var __container = utils.objects.by_id(container_id),
                __html = null;

            if (!__container || utils.validation.misc.is_undefined(__container))
                return false;

            msgbox_object = utils.objects.by_id('msgbox');

            if (msgbox_object)
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
                     '      <div id="' + __button_title + '_1" class="msgbox_button">OK</div>' + 
                     '  </div>' + 
                     '</div>';

            msgbox_object.innerHTML = __html;

            __container.appendChild(msgbox_object);

            return true;
        };

        this.show_win = function(title, message, type)
        {
            if (timer !== null)
                clearTimeout(timer);

            msgbox_object.childNodes[0].childNodes[1].innerHTML = title;
            msgbox_object.childNodes[0].childNodes[3].innerHTML = message;

            var __container = utils.objects.by_id(msgbox_object.id + '_buttons_area'),
                __var_dynamic_label_button_1 = 'OK',
                __var_dynamic_label_button_2 = 'Cancel',
                __button_object = null;

            __container.innerHTML = '';
            __container.classList.remove('mb_buttons_triple');

            __button_object = document.createElement('div');

            __button_object.id = msgbox_object.id + '_button_1';
            __button_object.className = 'msgbox_button';
            __button_object.innerHTML = __var_dynamic_label_button_1;

            __container.appendChild(__button_object);

            utils.events.attach(__button_object.id, __button_object, 'click', 
            () => 
            {
                if (global_hide_callbacks.length > 0)
                    global_hide_callbacks[0].call(this);

                me.hide_win();
            });

            if (type === self.types.OK_CANCEL || type === self.types.YES_NO)
            {
                if (type === self.types.YES_NO)
                {
                    __var_dynamic_label_button_1 = 'Yes';
                    __var_dynamic_label_button_2 = 'No';
                }

                __button_object.style.float = 'left';
                __button_object.innerHTML = __var_dynamic_label_button_1;

                __button_object = document.createElement('div');

                __button_object.id = msgbox_object.id + '_button_2';
                __button_object.className = 'msgbox_button';
                __button_object.style.float = 'right';
                __button_object.innerHTML = __var_dynamic_label_button_2;

                __container.appendChild(__button_object);

                utils.events.attach(__button_object.id, __button_object, 'click', 
                () => 
                {
                    if (global_hide_callbacks.length > 1)
                        global_hide_callbacks[1].call(this);

                    me.hide_win();
                });    
            }
            else if (type === self.types.YES_NO_CANCEL)
            {
                __container.classList.add('mb_buttons_triple');

                __button_object.classList.add('mb_triple');
                __button_object.innerHTML = 'Yes';

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

    // Get status of MsgBox
    this.is_open = function()
    {
        if (!is_init)
            return false;

        return is_open;
    };

    // Show MsgBox (with type and optional callbacks on hide)
    this.show = function(title, message, type = self.types.OK, hide_callback_array = [])
    {
        if (!is_init || is_open || 
            !utils.validation.alpha.is_string(title) || 
            !utils.validation.alpha.is_string(message))
            return false;
         
        if (!utils.validation.misc.is_invalid(hide_callback_array) && 
            !utils.validation.misc.is_array(hide_callback_array))
            return false;

        if (hide_callback_array.length > 0 && ((global_type === self.types.OK && hide_callback_array.length > 1) || 
            ((global_type === self.types.OK_CANCEL || global_type === self.types.YES_NO) && hide_callback_array.length > 2) || 
            (global_type === self.types.YES_NO_CANCEL && hide_callback_array.length > 3)))
            return false;

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

        for (var i = 0; i < hide_callback_array.length; i++)
        {
            if (!utils.validation.misc.is_function(hide_callback_array[i]))
                return false;

            global_hide_callbacks.push(hide_callback_array[i]);
        }

        helpers.show_win(title, message, type);

        return true;
    };

    // Hide MsgBox (with optional callbacks)
    this.hide = function(hide_callback_array = [])
    {
        if (!is_init || !is_open)
            return false;

        if (!utils.validation.misc.is_invalid(hide_callback_array) && 
            !utils.validation.misc.is_array(hide_callback_array))
            return false;

        if (hide_callback_array.length > 0 && ((global_type === self.types.OK && hide_callback_array.length > 1) || 
            ((global_type === self.types.OK_CANCEL || global_type === self.types.YES_NO) && hide_callback_array.length > 2) || 
            (global_type === self.types.YES_NO_CANCEL && hide_callback_array.length > 3)))
            return false;

        for (var i = 0; i < hide_callback_array.length; i++)
        {
            if (!utils.validation.misc.is_function(hide_callback_array[i]))
                return false;

            global_hide_callbacks.push(hide_callback_array[i]);
        }

        helpers.hide_win();

        return true;
    };

    // Initialize MsgBox in a HTML element
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
