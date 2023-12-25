/*
    GreyOS - XGC (Version: 0.5)

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

    function game_controller_config()
    {
        function gamepad_model()
        {
            this.LB = false;
            this.RB = false;
            this.LT = false;
            this.RT = false;
            this.A = false;
            this.B = false;
            this.X = false;
            this.Y = false;
            this.Start = false;
            this.Back = false;
            this.Left_Stick_Button = false;
            this.Right_Stick_Button = false;
            this.D_Pad_Up = 0;
            this.D_Pad_Down = 0;
            this.D_Pad_Left = 0;
            this.D_Pad_Right = 0;
            this.Left_Joystick_X = 0.0;
            this.Left_Joystick_Y = 0.0;
            this.Right_Joystick_X = 0.0;
            this.Right_Joystick_Y = 0.0;
        }

        function joystick_model()
        {
            this.Button_1 = false;
            this.Button_2 = false;
            this.Button_3 = false;
            this.Button_4 = false;
            this.Button_5 = false;
            this.Button_6 = false;
            this.Button_7 = false;
            this.Button_8 = false;
            this.Button_9 = false;
            this.Button_10 = false;
            this.Button_11 = false;
            this.Button_12 = false;
            this.Button_13 = false;
            this.Button_14 = false;
            this.Button_15 = false;
            this.Button_16 = false;
            this.Button_17 = false;
            this.Button_18 = false;
            this.Button_19 = false;
            this.Button_20 = false;
            this.D_Pad_1_Up = 0;
            this.D_Pad_1_Down = 0;
            this.D_Pad_1_Left = 0;
            this.D_Pad_1_Right = 0;
            this.D_Pad_2_Up = 0;
            this.D_Pad_2_Down = 0;
            this.D_Pad_2_Left = 0;
            this.D_Pad_2_Right = 0;
            this.D_Pad_3_Up = 0;
            this.D_Pad_3_Down = 0;
            this.D_Pad_3_Left = 0;
            this.D_Pad_3_Right = 0;
            this.D_Pad_4_Up = 0;
            this.D_Pad_4_Down = 0;
            this.D_Pad_4_Left = 0;
            this.D_Pad_4_Right = 0;
            this.D_Pad_5_Up = 0;
            this.D_Pad_5_Down = 0;
            this.D_Pad_5_Left = 0;
            this.D_Pad_5_Right = 0;
            this.D_Pad_6_Up = 0;
            this.D_Pad_6_Down = 0;
            this.D_Pad_6_Left = 0;
            this.D_Pad_6_Right = 0;
            this.Switch_1 = 0;
            this.Switch_2 = 0;
            this.Switch_3 = 0;
            this.Switch_4 = 0;
            this.Switch_5 = 0;
            this.Switch_6 = 0;
            this.Switch_7 = 0;
            this.Switch_8 = 0;
            this.Switch_9 = 0;
            this.Switch_10 = 0;
            this.Latch_1 = 0;
            this.Latch_2 = 0;
            this.Latch_3 = 0;
            this.Latch_4 = 0;
            this.Knob_1 = 0.0;
            this.Knob_2 = 0.0;
            this.Throttle_Left = 0;
            this.Throttle_Right = 0;
            this.Throttle_1 = 0;
            this.Throttle_2 = 0;
            this.Joystick_Pitch = 0.0;
            this.Joystick_Roll = 0.0;
            this.Joystick_Yaw = 0.0;
        }

        this.gamepad = new gamepad_model();
        this.joystick = new joystick_model();
    }

    function scan_controller(controller_status)
    {
        var __this_xgc = null,
            __controller_type = null;

        is_controller_connected = controller_status;

        scan_interval = setInterval(() => 
        {
            if (!controller_status)
                return false;

            for (__this_xgc of navigator.getGamepads())
            {
                if (!__this_xgc)
                    continue;

                __controller_type = __this_xgc.id.toLowerCase().indexOf('gamepad');

                // Get states
                if (__controller_type >= 0)
                {
                    xgc_config.gamepad.LB = __this_xgc.buttons[4].pressed;
                    xgc_config.gamepad.RB = __this_xgc.buttons[5].pressed;
                    xgc_config.gamepad.LT = __this_xgc.buttons[6].pressed;
                    xgc_config.gamepad.RT = __this_xgc.buttons[7].pressed;
                    xgc_config.gamepad.Back = __this_xgc.buttons[8].pressed;
                    xgc_config.gamepad.Start = __this_xgc.buttons[9].pressed;
                    xgc_config.gamepad.D_Pad_Up = __this_xgc.buttons[12].pressed;
                    xgc_config.gamepad.D_Pad_Down = __this_xgc.buttons[13].pressed;
                    xgc_config.gamepad.D_Pad_Left = __this_xgc.buttons[14].pressed;
                    xgc_config.gamepad.D_Pad_Right = __this_xgc.buttons[15].pressed;
                    xgc_config.gamepad.Left_Stick_Button = __this_xgc.buttons[10].pressed;
                    xgc_config.gamepad.Right_Stick_Button = __this_xgc.buttons[11].pressed;
                    xgc_config.gamepad.A = __this_xgc.buttons[0].pressed;
                    xgc_config.gamepad.B = __this_xgc.buttons[1].pressed;
                    xgc_config.gamepad.X = __this_xgc.buttons[2].pressed;
                    xgc_config.gamepad.Y = __this_xgc.buttons[3].pressed;
                    xgc_config.gamepad.Left_Joystick_X = Math.round(__this_xgc.axes[0] * 100);
                    xgc_config.gamepad.Left_Joystick_Y = -Math.round(__this_xgc.axes[1] * 100);
                    xgc_config.gamepad.Right_Joystick_X = Math.round(__this_xgc.axes[2] * 100);
                    xgc_config.gamepad.Right_Joystick_Y = -Math.round(__this_xgc.axes[3] * 100);
                }
                else
                {
                    // TODO:...
                }
            }
        }, 25);

        return true;
    }

    function abort_scan_controller()
    {
        clearInterval(scan_interval);

        is_controller_connected = false;

        return true;
    }

    function init()
    {
        var __handler = null;

        __handler = function(event) { scan_controller(event.gamepad.connected); };
        morpheus.run('xgc', 'controller', 'gamepadconnected', __handler);

        __handler = function() { abort_scan_controller(); };
        morpheus.run('xgc', 'controller', 'gamepaddisconnected', __handler);
    }

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');

        morpheus = matrix.get('morpheus');

        init();

        return true;
    };

    var cosmos = null,
        morpheus = null,
        is_controller_connected = false,
        scan_interval = null,
        utils_sys = new vulcan(),
        xgc_config = new game_controller_config();
}
