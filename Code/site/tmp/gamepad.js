/*
    GreyOS - Gamepad (Version: 1.0)

    File name: gamepad.js
    Description: This file contains the Gamepad - Management service module.

    Coded by George Delaportas (G0D)
    Copyright © 2023
    Open Software License (OSL 3.0)
*/

// Gamepad
function gamepad()
{
  function config()
  {
    this.RightJoystickX = 0;
    this.RightJoystickY = 0;
    this.LeftJoystickX = 0;
    this.LeftJoystickY = 0;
    this.RightBumper = false;
    this.ButtonA = false;
    this.ButtonB = false;
    this.Back = false;
    this.Start = false;
    this.UpDPad = false;
    this.DownDPad = false;
    this.LeftDPad = false;
    this.RightDPad = false;
  }

  this.update_controller = function(event)
  {
    for (var this_gamepad of navigator.getthis_gamepads())
    {
      if (!this_gamepad)
        continue;

      // Get stick axes
      var tmpRightJoystickX = Math.round(this_gamepad.axes[2] * 100);
      var tmpRightJoystickY = -Math.round(this_gamepad.axes[3] * 100);
      var tmpLeftJoystickX = Math.round(this_gamepad.axes[0] * 100);
      var tmpLeftJoystickY = -Math.round(this_gamepad.axes[1] * 100);

      // Get buttons state
      gamepad_config.RightBumper = this_gamepad.buttons[5].pressed;
      gamepad_config.Back = this_gamepad.buttons[8].pressed;
      gamepad_config.Start = this_gamepad.buttons[9].pressed;
      gamepad_config.UpDPad = this_gamepad.buttons[12].pressed;
      gamepad_config.DownDPad = this_gamepad.buttons[13].pressed;
      gamepad_config.LeftDPad = this_gamepad.buttons[14].pressed;
      gamepad_config.RightDPad = this_gamepad.buttons[15].pressed;
      gamepad_config.ButtonA = this_gamepad.buttons[0].pressed;
      gamepad_config.ButtonB = this_gamepad.buttons[1].pressed;
    }
  }

  function init()
  {
    window.addEventListener('gamepadconnected', this.update_controller);
    window.addEventListener('gamepaddisconnected', (event) => { console.log('connected:', event.gamepad.connected); });
  }

  init();

  var gamepad_config = new config();
}
