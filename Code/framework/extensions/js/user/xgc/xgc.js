/*
    GreyOS - XGC (Version: 0.1)

    File name: xgc.js
    Description: This file contains the XGC - Gaming Controller service module.

    Coded by George Delaportas (G0D)
    Copyright © 2023
    Open Software License (OSL 3.0)
*/

// XGC
function xgc()
{
    var self = this;

    function init()
    {
        window.addEventListener('gamepadconnected', (event) => { console.log('XGC Status:', event.gamepad.connected); });
        window.addEventListener('gamepaddisconnected', (event) => { console.log('XGC Status:', event.gamepad.connected); });

        //setInterval(self.update_controller, 1500);
    }

    function game_controller_config()
    {
        this.LeftBumper = false;
        this.RightBumper = false;
        this.LeftTrigger = false;
        this.RightTriger = false;
        this.ButtonA = false;
        this.ButtonB = false;
        this.ButtonX = false;
        this.ButtonY = false;
        this.Back = false;
        this.Start = false;
        this.UpDPad = false;
        this.DownDPad = false;
        this.LeftDPad = false;
        this.RightDPad = false;
        this.LeftStickButton = false;
        this.RightStickButton = false;
        this.LeftJoystickX = 0.0;
        this.LeftJoystickY = 0.0;
        this.RightJoystickX = 0.0;
        this.RightJoystickY = 0.0;
    }

    this.update_controller = function()
    {
        var __this_xgc = null;

        for (__this_xgc of navigator.getGamepads())
        {
            if (!__this_xgc)
                continue;

            // Get buttons state
            xgc_config.LeftBumper = __this_xgc.buttons[4].pressed;
            xgc_config.RightBumper = __this_xgc.buttons[5].pressed;
            xgc_config.LeftTrigger = __this_xgc.buttons[6].pressed;
            xgc_config.RightTriger = __this_xgc.buttons[7].pressed;
            xgc_config.Back = __this_xgc.buttons[8].pressed;
            xgc_config.Start = __this_xgc.buttons[9].pressed;
            xgc_config.UpDPad = __this_xgc.buttons[12].pressed;
            xgc_config.DownDPad = __this_xgc.buttons[13].pressed;
            xgc_config.LeftDPad = __this_xgc.buttons[14].pressed;
            xgc_config.RightDPad = __this_xgc.buttons[15].pressed;
            xgc_config.LeftStickButton = __this_xgc.buttons[10].pressed;
            xgc_config.RightStickButton = __this_xgc.buttons[11].pressed;
            xgc_config.ButtonA = __this_xgc.buttons[0].pressed;
            xgc_config.ButtonB = __this_xgc.buttons[1].pressed;
            xgc_config.ButtonX = __this_xgc.buttons[2].pressed;
            xgc_config.ButtonY = __this_xgc.buttons[3].pressed;

            // Get sticks axes state
            xgc_config.LeftJoystickX = Math.round(__this_xgc.axes[0] * 100);
            xgc_config.LeftJoystickY = -Math.round(__this_xgc.axes[1] * 100);
            xgc_config.RightJoystickX = Math.round(__this_xgc.axes[2] * 100);
            xgc_config.RightJoystickY = -Math.round(__this_xgc.axes[3] * 100);

            console.log(xgc_config.RightJoystickX);
        }

        return true;
    }

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    init();

    var cosmos = null,
        utils_sys = new vulcan(),
        xgc_config = new game_controller_config();
}
