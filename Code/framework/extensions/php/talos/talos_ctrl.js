/*

    GreyOS Inc. -  TALOS Control Utility
    
    File name: talos_ctrl.js (Version: 2.0)
    Description: This file contains the TALOS Control Utility.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



(function()
{

    var dynamic_object = null;

    dynamic_object = document.createElement('link');
    dynamic_object.setAttribute('rel', 'Stylesheet');
    dynamic_object.setAttribute('type', 'text/css');
    dynamic_object.setAttribute('media', 'screen');
    dynamic_object.setAttribute('href', '/framework/extensions/php/talos/themes/default.css');

    document.getElementsByTagName('head')[0].appendChild(dynamic_object);

    window.onload = function()
                    {

                        (function()
                        {

                            var username = document.getElementById('talos_username_text');
                            var password = document.getElementById('talos_password_text');

                            function Scan_Log_In_Key(key_event)
                            {

                                if (key_event.keyCode === 13)
                                {

                                    TALOS_Login(username.value, password.value);

                                    return true;

                                }

                                return false;

                            }

                            username.onkeypress = function(event) { return Input_Controller(this, event); };
                            username.onkeydown = function(event) { Scan_Log_In_Key(event); };
                            password.onkeypress = function(event) { return Input_Controller(this, event); };
                            password.onkeydown = function(event) { Scan_Log_In_Key(event); };

                            document.getElementById('talos_login_button').onclick = 
                            function() { TALOS_Login(username.value, password.value); };

                        })();

                        (function()
                        {

                            var username = document.getElementById('talos_reg_username_text');
                            var email = document.getElementById('talos_email_text');
                            var password = document.getElementById('talos_reg_password_text');
                            var confirm = document.getElementById('talos_confirm_password_text');
                            var pass_forgot = document.getElementById('talos_password_reminder_text');

                            function Scan_Enter(key_event)
                            {

                                if (key_event.keyCode === 13)
                                {

                                    TALOS_Pass_Recovery(pass_forgot.value);

                                    global_forgot_pass_click_check = false;
                                    pass_forgot.value = '';

                                    TALOS_Manage_Forgot_Pass_Form(0);

                                    return true;

                                }

                                return false;

                            }

                            function Scan_Sign_Up_Key(key_event)
                            {

                                if (key_event.keyCode === 13)
                                {

                                    TALOS_Register(username.value, email.value, password.value, confirm.value);

                                    return true;

                                }

                                return false;

                            }

                            username.onkeypress = function(event) { return Input_Controller(this, event); };
                            username.onkeydown = function(event) { Scan_Sign_Up_Key(event); };
                            email.onkeypress = function(event) { return Input_Controller(this, event); };
                            email.onkeydown = function(event) { Scan_Sign_Up_Key(event); };
                            password.onkeypress = function(event) { return Input_Controller(this, event); };
                            password.onkeydown = function(event) { Scan_Sign_Up_Key(event); };
                            confirm.onkeypress = function(event) { return Input_Controller(this, event); };
                            confirm.onkeydown = function(event) { Scan_Sign_Up_Key(event); };
                            pass_forgot.onkeypress = function(event) { return Input_Controller(this, event); };

                            document.addEventListener('mouseup', function() { pass_forgot.value = ''; TALOS_Manage_Forgot_Pass_Form(0); }, false);
                            document.addEventListener('mousedown', 
                            function()
                            {

                                if (global_forgot_pass_click_check)
                                    global_forgot_pass_click_check = false;

                            }, false);
                            document.getElementById('talos_password_reminder_text').onmouseup = 
                            function() { global_forgot_pass_click_check = true; };
                            document.getElementById('talos_password_reminder_text').onkeydown = 
                            function(event) { Scan_Enter(event); };
                            document.getElementById('forgot_password_link').onclick = 
                            function() { TALOS_Manage_Forgot_Pass_Form(1); };
                            document.getElementById('talos_signup_button').onclick = 
                            function() { TALOS_Register(username.value, email.value, password.value, confirm.value); };

                        })();

                    };

})();
