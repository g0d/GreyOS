/*
    GreyOS - MsgBox (Version: 3.6)

    File name: msgbox_dev.js
    Description: This file contains the MsgBox - Window messages module.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2017 - 2024
    Open Software License (OSL 3.0)
*/

// MsgBox
function msgbox()
{
    var self = this;

    function types_model()
    {
        this.OK = 0;
        this.OK_CANCEL = 1;
        this.YES_NO = 2;
        this.YES_NO_CANCEL = 3;
    }

    function utilities()
    {
        var me = this;

        this.draw_screen = function(container_id)
        {
            var __container = utils_sys.objects.by_id(container_id),
                __html = null;

            if (__container === false || utils_sys.validation.misc.is_undefined(__container) || __container === null)
                return false;

            msgbox_object = utils_sys.objects.by_id('msgbox');

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

            var __container = utils_sys.objects.by_id(msgbox_object.id + '_buttons_area'),
                __var_dynamic_label_button_1 = 'OK',
                __var_dynamic_label_button_2 = 'Cancel',
                __handler = null,
                __button_object = null;

            __container.innerHTML = '';
            __container.classList.remove('mb_buttons_triple');

            __button_object = document.createElement('div');

            __button_object.id = msgbox_object.id + '_button_1';
            __button_object.className = 'msgbox_button';
            __button_object.innerHTML = __var_dynamic_label_button_1;

            __container.appendChild(__button_object);

            __handler = function()
            {
                if (global_hide_callbacks.length > 0)
                    global_hide_callbacks[0].call(this);

                me.hide_win();
            };
            morpheus.run('msgbox', 'mouse', 'click', __handler, __button_object);

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

                __handler = function()
                {
                    if (global_hide_callbacks.length > 1)
                        global_hide_callbacks[1].call(this);

                    me.hide_win();
                };
                morpheus.run('msgbox', 'mouse', 'click', __handler, __button_object); 
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

                __handler = function()
                {
                    if (global_hide_callbacks.length > 1)
                        global_hide_callbacks[1].call(this);

                    me.hide_win();
                };
                morpheus.run('msgbox', 'mouse', 'click', __handler, __button_object);

                __button_object = document.createElement('div');

                __button_object.id = msgbox_object.id + '_button_3';
                __button_object.className = 'msgbox_button mb_triple';
                __button_object.innerHTML = 'Cancel';

                __container.appendChild(__button_object);

                __handler = function()
                {
                    if (global_hide_callbacks.length > 2)
                        global_hide_callbacks[2].call(this);

                    me.hide_win();
                };
                morpheus.run('msgbox', 'mouse', 'click', __handler, __button_object);
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

            self.reset();
        };
    }

    // Get status
    this.is_open = function()
    {
        if (!is_init)
            return false;

        return is_open;
    };

    // Show (with type and optional callbacks on hide)
    this.show = function(title, message, type = self.types.OK, hide_callback_array = [])
    {
        if (!is_init || is_open || 
            !utils_sys.validation.alpha.is_string(title) || 
            !utils_sys.validation.alpha.is_string(message))
            return false;

        if (!utils_sys.validation.misc.is_invalid(hide_callback_array) && 
            !utils_sys.validation.misc.is_array(hide_callback_array))
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
            if (!utils_sys.validation.misc.is_function(hide_callback_array[i]))
                return false;

            global_hide_callbacks.push(hide_callback_array[i]);
        }

        utils_int.show_win(title, message, type);

        return true;
    };

    // Hide (with optional callbacks)
    this.hide = function(hide_callback_array = [])
    {
        if (!is_init || !is_open)
            return false;

        if (!utils_sys.validation.misc.is_invalid(hide_callback_array) && 
            !utils_sys.validation.misc.is_array(hide_callback_array))
            return false;

        if (hide_callback_array.length > 0 && ((global_type === self.types.OK && hide_callback_array.length > 1) || 
            ((global_type === self.types.OK_CANCEL || global_type === self.types.YES_NO) && hide_callback_array.length > 2) || 
            (global_type === self.types.YES_NO_CANCEL && hide_callback_array.length > 3)))
            return false;

        for (var i = 0; i < hide_callback_array.length; i++)
        {
            if (!utils_sys.validation.misc.is_function(hide_callback_array[i]))
                return false;

            hide_callback_array[i].call(this);
        }

        utils_int.hide_win();

        return true;
    };

    // Reset status
    this.reset = function()
    {
        if (!is_init || !is_open)
            return false;

        morpheus.clear('msgbox');

        global_hide_callbacks = [];

        is_open = false;
    };

    // Initialize MsgBox in a HTML element
    this.init = function(container_id)
    {
        if (is_init)
            return false;

        if (utils_sys.validation.misc.is_invalid(container_id) || !utils_sys.validation.alpha.is_string(container_id))
            return false;

        if (!utils_int.draw_screen(container_id))
            return false;

        nature.themes.store('msgbox');
        nature.apply('new');

        is_init = true;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_open = false,
        msgbox_object = null,
        global_type = null,
        global_hide_callbacks = [],
        timer = null,
        cosmos = null,
        matrix = null,
        morpheus = null,
        nature = null,
        utils_sys = new vulcan(),
        utils_int = new utilities();

    this.types = new types_model();
}
