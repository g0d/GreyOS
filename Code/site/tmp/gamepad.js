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

  this.sleep = function(ms)
  {
    const date = Date.now();
    var currentDate = null;
  
    do
    {
      currentDate = Date.now();
    } while(currentDate - date < milliseconds);
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

      if (Math.abs(tmpRightJoystickX) <= 10)
        gamepad_config.RightJoystickX = 0;
      else
        gamepad_config.RightJoystickX = tmpRightJoystickX;

      if (Math.abs(tmpRightJoystickY) <= 10)
        gamepad_config.RightJoystickY = 0;
      else
        gamepad_config.RightJoystickY = tmpRightJoystickY;

      if (Math.abs(tmpLeftJoystickX) <= 10)
        gamepad_config.LeftJoystickX = 0;
      else
        gamepad_config.LeftJoystickX = tmpLeftJoystickX;

      if (Math.abs(tmpLeftJoystickY) <= 10)
        gamepad_config.LeftJoystickY = 0;
      else
        gamepad_config.LeftJoystickY = tmpLeftJoystickY;

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
      /*
      // Visualize Axes and Sticks
      for (const [index, axis] of this_gamepad.axes.entries())
      {
        if (typeof output !== 'undefined')
        {
          if (output != null)
          {
            output.insertAdjacentHTML('beforeend',
              `<label>${this_gamepad.index}, ${index}
                 <progress value=${axis * 0.5 + 0.5}></progress>
               </label>`);
          }
        }
      }

      for (const [index, button] of this_gamepad.buttons.entries())
      {
        if (typeof output !== 'undefined')
        {
          if (output != null)
          {
            output.insertAdjacentHTML('beforeend',
              `<label>${this_gamepad.index}, ${index}
                 <progress value=${button.value}></progress>
                 ${button.touched ? 'touched' : ''}
                 ${button.pressed ? 'pressed' : ''}
               </label>`);
          }
        }
      }
      */
    }
  }

  this.sendController = function()
  {
    if (gamepad_config.RightBumper === true)
    {
      if (Back === true)
      {
        console.log("land");
        //$.get( "/cmd/land");
        sleep(400);
      }
      else if (gamepad_config.Start === true)
      {
        console.log("takeoff");
        //$.get( "/cmd/takeoff");
        sleep(400);
      }
      else if (gamepad_config.UpDPad === true)
      {
        console.log("gimbalup");
        //$.get( "/cmd/gimbal-pcmd?value=0.05");
        sleep(100);
      }
      else if (gamepad_config.DownDPad === true)
      {
        console.log("gimbaldown");
        //$.get( "/cmd/gimbal-pcmd?value=-0.05");
        sleep(100);
      }
      else if (gamepad_config.LeftDPad === true)
      {
        console.log("zoomout");
        //$.get( "/cmd/zoom-pcmd?value=-0.3");
        sleep(100);
      }
      else if (gamepad_config.RightDPad === true)
      {
        console.log("zoomin");
        //$.get( "/cmd/zoom-pcmd?value=0.3");
        sleep(100);
      }
      else if (gamepad_config.ButtonA === true)
      {
        console.log("piloting_start");
        //$.get( "/cmd/set-ctrl?source=0");
        sleep(200);
      }
      else if (gamepad_config.ButtonB === true)
      {
        console.log("piloting_stop");
        //$.get( "/cmd/set-ctrl?source=1");
        sleep(200);
      } 

      if (gamepad_config.RightJoystickX + gamepad_config.RightJoystickY + gamepad_config.LeftJoystickX + gamepad_config.LeftJoystickY != 0)
      {
        console.log(gamepad_config.RightJoystickX, gamepad_config.RightJoystickY, gamepad_config.LeftJoystickX, gamepad_config.LeftJoystickY);
        //$.get( "/cmd/set-pcmd?roll=" + gamepad_config.RightJoystickX + "&pitch=" + gamepad_config.RightJoystickY + "&yaw=" + gamepad_config.LeftJoystickX + "&alt=" + gamepad_config.LeftJoystickY + "&dt=0.1")
      }
    }
  }

  function init()
  {
    window.addEventListener('gamepadconnected', this.update_controller);
    window.addEventListener('gamepaddisconnected', (event) => { console.log('connected:', event.gamepad.connected); });

    setInterval(this.update_controller, 60);
    setInterval(this.sendController, 60);
  }

  init();

  var gamepad_config = new config();
}
