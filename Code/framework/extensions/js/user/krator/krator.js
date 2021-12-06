/*
    GreyOS - Krator :: Login & registration form (Version: 1.0)

    File name: krator.js
    Description: This file contains the Krator :: Login & registration form application.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Krator
function krator()
{
    var self = this;

    function config_model()
    {
        this.id = null;
        this.content = null;
    }

    function utilities()
    {
        var me = this;

        function close_krator()
        {
            krator_bee.settings.actions.can_close(true);
            krator_bee.gui.actions.close(null);

            return true;
        }

        this.gui_init = function()
        {
            me.draw();
            me.attach_events();

            return true;
        };

        this.draw = function()
        {
            me.load_forms();

            return true;
        };

        this.load_forms = function()
        {
            var __content = '<div id="login_control" class="krator_controls">\
                                <div class="controls">\
                                    <center>User Login</center>\
                                    <div class="controls">\
                                        <br>\
                                        <div class="control_item">\
                                            <input id="login_username_text" class="text" placeholder="Please enter your e-mail...">\
                                        </div>\
                                        <div class="control_item">\
                                            <input id="login_password_text" class="text" type="password" placeholder="Please enter your password...">\
                                        </div>\
                                        <br>\
                                        <div class="control_item">\
                                            <button id="login_button" class="button">\
                                                Login\
                                            </button>\
                                        </div>\
                                        <div class="control_item">\
                                            <a id="register_link" href="#">No account? Register!</a>\
                                        </div>\
                                    </div>\
                                </div>\
                             </div>';

            krator_bee.settings.data.window.content(__content);

            __content = '<div id="registration_control" class="krator_controls">\
                            <div class="content">\
                                <center>Register Account</center>\
                                <div class="controls">\
                                    <br>\
                                    <div class="control_item">\
                                        <input id="register_username_text" class="text" placeholder="Please enter an e-mail...">\
                                    </div>\
                                    <div class="control_item">\
                                        <input id="register_password_text" class="text" type="password" placeholder="Please enter a password...">\
                                    </div>\
                                    <div class="control_item">\
                                        <input id="register_password_confirm_text" class="text" type="password" placeholder="Please confirm password...">\
                                    </div>\
                                    <br>\
                                    <div class="control_item">\
                                        <button id="register_button" class="button">\
                                            Register\
                                        </button>\
                                    </div>\
                                </div>\
                            </div>\
                         </div>';

            krator_bee.settings.data.casement.content(__content);
        };

        this.attach_events = function()
        {
            var __login_username = utils_sys.objects.by_id('login_username_text'),
                __login_password = utils_sys.objects.by_id('login_password_text'),
                __login_button = utils_sys.objects.by_id('login_button'),
                __register_link =  utils_sys.objects.by_id('register_link'),
                __register_username = utils_sys.objects.by_id('register_username_text'),
                __register_password = utils_sys.objects.by_id('register_password_text'),
                __register_password_confirm = utils_sys.objects.by_id('register_password_confirm_text'),
                __register_button = utils_sys.objects.by_id('register_button');

            utils_sys.events.attach(config.id, __login_username, 'keydown', 
            function(event)
            {
                var __args_array = [__login_username, __login_password, __login_button];

                me.scan_enter(event, 'login', __args_array);
            });

            utils_sys.events.attach(config.id, __login_password, 'keydown', 
            function(event)
            {
                var __args_array = [__login_username, __login_password, __login_button];

                me.scan_enter(event, 'login', __args_array);
            });

            utils_sys.events.attach(config.id, __login_button, 'click', 
            function()
            {
                me.check_login_credentials(__login_username, __login_password, __login_button);
            });

            utils_sys.events.attach(config.id, __register_link, 'mousedown', 
            function(event)
            {
                if (krator_bee.status.gui.casement_deployed())
                    krator_bee.gui.actions.casement.hide(event);
                else
                    krator_bee.gui.actions.casement.deploy(event);
            });

            utils_sys.events.attach(config.id, __register_username, 'keydown', 
            function(event)
            {
                var __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];

                me.scan_enter(event, 'registration', __args_array);
            });

            utils_sys.events.attach(config.id, __register_password, 'keydown', 
            function(event)
            {
                var __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];

                me.scan_enter(event, 'registration', __args_array);
            });

            utils_sys.events.attach(config.id, __register_password_confirm, 'keydown', 
            function(event)
            {
                var __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];

                me.scan_enter(event, 'registration', __args_array);
            });

            utils_sys.events.attach(config.id, __register_button, 'click', 
            function()
            {
                me.check_registration_credentials(__register_username, __register_password, 
                                                  __register_password_confirm, __register_button);
            });

            return true;
        };

        this.scan_enter = function(event, form_id, args_array)
        {
            key_control.scan(event);

            if (key_control.get() === key_control.keys.ENTER)
            {
                if (form_id === 'login')
                    me.check_login_credentials(args_array[0], args_array[1], args_array[2]);
                else if (form_id === 'registration')
                    me.check_registration_credentials(args_array[0], args_array[1], args_array[2], args_array[3]);
                else
                    return false;
            }

            return true;
        };

        this.check_login_credentials = function(username_object, password_object, login_button_object)
        {
            msg_win = new msgbox();

            msg_win.init('desktop');

            if (!utils_sys.validation.utilities.is_email(username_object.value))
            {
                msg_win.show('GreyOS', 'The email format is invalid!');

                return;
            }

            if (username_object.value.length < 3 || password_object.value.length < 8)
            {
                msg_win.show('GreyOS', 'Credentials are invalid!');

                return;
            }

            username_object.disabled = true;
            password_object.disabled = true;
            login_button_object.disabled = true;

            var data = 'gate=auth&mode=login&username=' + username_object.value + '&password=' + password_object.value;

            ajax_factory(data, function()
                               {
                                   is_login_ok = true;

                                   close_krator();
                               },
                               function()
                               {
                                    msg_win.show('GreyOS', 'Your credentials are wrong!');
                               },
                               function()
                               {
                                    username_object.disabled = false;
                                    password_object.disabled = false;
                                    login_button_object.disabled = false;
                               });
        };

        this.check_registration_credentials = function(username_object, password_object, password_comfirm_object, register_button_object)
        {
            msg_win = new msgbox();

            msg_win.init('desktop');

            if (!utils_sys.validation.utilities.is_email(username_object.value))
            {
                msg_win.show('GreyOS', 'The email format is invalid!');
    
                return;
            }
    
            if (username_object.value.length < 3 || password_object.value.length < 8)
            {
                msg_win.show('GreyOS', 'Please choose more complex credentials!');
    
                return;
            }
    
            if (password_object.value !== password_comfirm_object.value)
            {
                msg_win.show('GreyOS', 'Password confirmation failed!');
    
                return;
            }
    
            username_object.disabled = true;
            password_object.disabled = true;
            password_comfirm_object.disabled = true;
            register_button_object.disabled = true;
    
            var data = 'gate=register&mode=reg&username=' + username_object.value + 
                       '&password=' + password_object.value + 
                       '&confirm=' + password_comfirm_object.value;
    
            ajax_factory(data, function()
                               {
                                    msg_win.show('GreyOS', 'Registration succeeded!', 
                                                 function() {  });
                               },
                               function()
                               {
                                    msg_win.show('GreyOS', 'Registration failed!');
                               },
                               function()
                               {
                                    username_object.disabled = false;
                                    password_object.disabled = false;
                                    password_comfirm_object.disabled = false;
                                    register_button_object.disabled = false;
                               });
        };

        this.load_desktop_ui = function(script)
        {
            if (!is_login_ok)
                return false;

            script.apply();

            return true;
        };
    }

    this.get_bee = function()
    {
        if (is_init === false)
            return false;

        return krator_bee;
    };

    this.init = function(script)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        if (!utils_sys.validation.misc.is_function(script))
            return false;

        is_init = true;

        krator_bee = dev_box.get('bee');

        config.id = 'krator';

        nature.theme([config.id]);
        nature.apply('new');

        // Declare bee's settings
        krator_bee.init(config.id, 2);
        krator_bee.settings.data.window.labels.title('Krator :: Login & Registration');
        krator_bee.settings.data.window.labels.status_bar('GreyOS - Login/Registration');
        krator_bee.settings.actions.can_edit_title(false);
        krator_bee.settings.actions.can_use_menu(false);
        krator_bee.settings.actions.can_close(false);
        krator_bee.gui.size.width(420);
        krator_bee.gui.size.height(400);
        krator_bee.gui.position.static(true);
        krator_bee.gui.position.left(swarm.settings.right() / 2 - 210);
        krator_bee.gui.position.top(100);
        krator_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        krator_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        krator_bee.on('open', function() { krator_bee.gui.fx.fade.into(); });
        krator_bee.on('opened', function() { utils_int.gui_init(); });
        krator_bee.on('dragging', function()
                                  {
                                      krator_bee.gui.fx.opacity.settings.set(0.7);
                                      krator_bee.gui.fx.opacity.apply();
                                  });
        krator_bee.on('dragged', function() { krator_bee.gui.fx.opacity.reset(); });
        krator_bee.on('close', function() { krator_bee.gui.fx.fade.out(); });
        krator_bee.on('closed', function() { utils_int.load_desktop_ui(script); });

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        swarm = matrix.get('swarm');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_login_ok = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        swarm = null,
        nature = null,
        msg_win = null,
        krator_bee = null,
        utils_sys = new vulcan(),
        key_control = new key_manager(),
        config = new config_model(),
        utils_int = new utilities();
}
