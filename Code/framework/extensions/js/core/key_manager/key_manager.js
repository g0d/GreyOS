/*
    Key Manager

    File name: key_manager.js (Version: 0.4)
    Description: This file contains the Key Manager extension.

    Coded by George Delaportas (G0D)
    Copyright (C) 2016
    Open Software License (OSL 3.0)
*/

// Key Manager
function key_manager()
{
    // Key Constants
    function key_constants() 
    {
        this.ENTER = 13;
        this.BACKSPACE = 8;
        this.TAB = 9;
        this.SHIFT = 16;
        this.CONTROL = 17;
        this.ALT = 18;
    }

    // Constants
    this.constants = function()
    {
        return new key_constants();
    };

    // Scan keys
    this.scan = function(key_event)
    {
        try
        {
            if (typeof key_event.keyCode === 'undefined')
                __keyboard_key = key_event.button;
            else
                __keyboard_key = key_event.keyCode;

            return true;
        }
        catch(e)
        {
            console.log(e);

            return false;
        }
    };

    // Get keys
    this.get = function()
    {
        return __keyboard_key;
    };

    // Global keyboard key
    var __keyboard_key = null;
}
