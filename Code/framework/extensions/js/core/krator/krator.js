/*
    GreyOS - Krator :: Login & registration form (Version: 2.0)

    File name: krator.js
    Description: This file contains the Krator :: Login & registration form application.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2024
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
            var __content = '<div id="' + config.id + '_login_control" class="krator_controls">\
                                <div class="controls">\
                                    <center>User Login</center>\
                                    <div class="controls">\
                                        <br>\
                                        <div class="control_item">\
                                            <input id="' + config.id + '_login_username_text" class="text" placeholder="Please enter your e-mail...">\
                                        </div>\
                                        <div class="control_item">\
                                            <input id="' + config.id + '_login_password_text" class="text" type="password" placeholder="Please enter your password...">\
                                        </div>\
                                        <br>\
                                        <div class="control_item">\
                                            <button id="' + config.id + '_login_button" class="button" type="button">\
                                                Login\
                                            </button>\
                                        </div>\
                                        <div class="control_item">\
                                            <div id="' + config.id + '_register_new_account" class="register_new_account">No account? Register!</div>\
                                        </div>\
                                    </div>\
                                </div>\
                             </div>';

            krator_bee.settings.data.window.content(__content);

            __content = '<div id="' + config.id + '_registration_control" class="registration_control krator_controls">\
                            <div class="content">\
                                <center>Register Account</center>\
                                <div class="controls">\
                                    <br>\
                                    <div class="control_item">\
                                        <input id="' + config.id + '_register_username_text" class="text" placeholder="Please enter an e-mail...">\
                                    </div>\
                                    <div class="control_item">\
                                        <input id="' + config.id + '_register_password_text" class="text" type="password" placeholder="Please enter a password...">\
                                    </div>\
                                    <div class="control_item">\
                                        <input id="' + config.id + '_register_password_confirm_text" class="text" type="password" placeholder="Please confirm password...">\
                                    </div>\
                                    <br>\
                                    <div class="control_item">\
                                        <button id="' + config.id + '_register_button" class="button" type="button">\
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
            var __login_username = utils_sys.objects.by_id(config.id + '_login_username_text'),
                __login_password = utils_sys.objects.by_id(config.id + '_login_password_text'),
                __login_button = utils_sys.objects.by_id(config.id + '_login_button'),
                __register_new_account =  utils_sys.objects.by_id(config.id + '_register_new_account'),
                __register_username = utils_sys.objects.by_id(config.id + '_register_username_text'),
                __register_password = utils_sys.objects.by_id(config.id + '_register_password_text'),
                __register_password_confirm = utils_sys.objects.by_id(config.id + '_register_password_confirm_text'),
                __register_button = utils_sys.objects.by_id(config.id + '_register_button'),
                __handler = null,
                __args_array = null;

            __handler = function() { me.check_login_credentials(__login_username, __login_password, __login_button); };
            morpheus.run(config.id, 'mouse', 'click', __handler, __login_button);

            __handler = function()
            {
                me.check_registration_credentials(__register_username, __register_password, 
                                                  __register_password_confirm, __register_button);
            };
            morpheus.run(config.id, 'mouse', 'click', __handler, __register_button);

            __handler = function(event)
            {
                if (krator_bee.status.gui.casement_deployed())
                    krator_bee.gui.actions.casement.retract(event);
                else
                    krator_bee.gui.actions.casement.deploy(event);
            };
            morpheus.run(config.id, 'mouse', 'click', __handler, __register_new_account);

            __handler = function(event)
            {
                __args_array = [__login_username, __login_password, __login_button];

                me.scan_enter(event, 'login', __args_array);
            };
            morpheus.run(config.id, 'key', 'keydown', __handler, __login_username);

            __handler = function(event)
            {
                __args_array = [__login_username, __login_password, __login_button];

                me.scan_enter(event, 'login', __args_array);
            };
            morpheus.run(config.id, 'key', 'keydown', __handler, __login_password);

            __handler = function(event)
            {
                __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];

                me.scan_enter(event, 'registration', __args_array);
            };
            morpheus.run(config.id, 'key', 'keydown', __handler, __register_username);

            __handler = function(event)
            {
                __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];

                me.scan_enter(event, 'registration', __args_array);
            };
            morpheus.run(config.id, 'key', 'keydown', __handler, __register_password);

            __handler = function(event)
            {
                __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];

                me.scan_enter(event, 'registration', __args_array);
            };
            morpheus.run(config.id, 'key', 'keydown', __handler, __register_password_confirm);

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
            function enable_controls()
            {
                username_object.disabled = false;
                password_object.disabled = false;
                login_button_object.disabled = false;
            }

            function disable_controls()
            {
                username_object.disabled = true;
                password_object.disabled = true;
                login_button_object.disabled = true;
            }

            disable_controls();

            var __msg_win = new msgbox();

            __msg_win.init('desktop');

            if (!utils_sys.validation.utilities.is_email(username_object.value.trim()))
            {
                __msg_win.show(os_name, 'The email format is invalid!', __msg_win.types.OK, [() => { enable_controls(); }]);

                return;
            }

            if (username_object.value.length < 3 || password_object.value.length < 8)
            {
                __msg_win.show(os_name, 'Credentials are invalid!', __msg_win.types.OK, [() => { enable_controls(); }]);

                return;
            }

            var data = 'gate=auth&mode=login&username=' + username_object.value + '&password=' + password_object.value;

            ajax_factory('post', data, function()
                                {
                                   is_login_ok = true;

                                   close_krator();
                                },
                                function()
                                {
                                    var __msg_win = new msgbox();

                                    __msg_win.init('desktop');
                                    __msg_win.show(os_name, 'Your credentials are wrong!', __msg_win.types.OK, [() => { enable_controls(); }]);
                                },
                                function()
                                {
                                    // Nothing...
                                });
        };

        this.check_registration_credentials = function(username_object, password_object, password_comfirm_object, register_button_object)
        {
            function enable_controls()
            {
                username_object.disabled = false;
                password_object.disabled = false;
                password_comfirm_object.disabled = false;
                register_button_object.disabled = false;
            }

            function disable_controls()
            {
                username_object.disabled = true;
                password_object.disabled = true;
                password_comfirm_object.disabled = true;
                register_button_object.disabled = true;
            }

            disable_controls();

            var __msg_win = new msgbox();

            __msg_win.init('desktop');

            if (!utils_sys.validation.utilities.is_email(username_object.value.trim()))
            {
                __msg_win.show(os_name, 'The email format is invalid!', __msg_win.types.OK, [() => { enable_controls(); }]);

                return;
            }

            if (password_object.value.length === 0)
            {
                __msg_win.show(os_name, 'Please enter a password!', __msg_win.types.OK, [() => { enable_controls(); }]);
    
                return;
            }

            if (username_object.value.length < 3 || password_object.value.length < 8)
            {
                __msg_win.show(os_name, 'Please choose more complex credentials!', __msg_win.types.OK, [() => { enable_controls(); }]);

                return;
            }

            if (password_object.value !== password_comfirm_object.value)
            {
                __msg_win.show(os_name, 'Password confirmation failed!', __msg_win.types.OK, [() => { enable_controls(); }]);

                return;
            }

            var data = 'gate=register&mode=reg&username=' + username_object.value.trim() + '&password=' + password_object.value;

            ajax_factory('post', data, function(result)
                                {
                                    if (result === '9')
                                        __msg_win.show(os_name, 'This account already exists!', __msg_win.types.OK, [() => { enable_controls(); }]);
                                    else
                                        __msg_win.show(os_name, 'Registration succeeded!', __msg_win.types.OK, [() => { is_login_ok = true; close_krator(); }]);
                                },
                                function()
                                {
                                    __msg_win.show(os_name, 'Registration failed!', __msg_win.types.OK, [() => { enable_controls(); }]);
                                },
                                function()
                                {
                                    // Nothing...
                                });
        };

        this.close_callback = function(script)
        {
            if (!is_login_ok)
                return false;

            script.call();

            return true;
        };
    }

    this.base = function()
    {
        if (is_init === false)
            return false;

        return krator_bee;
    };

    this.on = function(event_name, event_handler)
    {
        if (is_init === false)
            return false;

        return krator_bee.on(event_name, event_handler);
    };

    this.run = function()
    {
        if (is_init === false)
            return false;

        return krator_bee.run();
    };

    this.quit = function()
    {
        if (is_init === false)
            return false;

        return krator_bee.quit();
    };

    this.error = function()
    {
        if (is_init === false)
            return false;

        return krator_bee.error;
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

        os_name = xenon.load('os_name');

        krator_bee = dev_box.get('bee');

        config.id = 'krator_' + random.generate();

        nature.themes.store('krator');
        nature.apply('new');

        // Declare bee's settings
        krator_bee.init(config.id);
        krator_bee.settings.data.window.labels.title('Login & Registration Form');
        krator_bee.settings.data.window.labels.status_bar(os_name + ' - Login/Registration');
        krator_bee.settings.actions.can_edit_title(false);
        krator_bee.settings.actions.can_use_menu(false);
        krator_bee.settings.actions.can_close(false);
        krator_bee.settings.general.single_instance(true);
        krator_bee.gui.size.width(420);
        krator_bee.gui.size.height(400);
        krator_bee.gui.position.static(true);
        krator_bee.gui.position.left(swarm.settings.right() / 2 - 210);
        krator_bee.gui.position.top(250);
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
        krator_bee.on('close', function()
                               {
                                    morpheus.clear(config.id);

                                    krator_bee.gui.fx.fade.out();
                               });
        krator_bee.on('closed', function()
                                {
                                    krator_bee.on('closed', function() { nature.themes.clear('krator'); });

                                    utils_int.close_callback(script);
                                });

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
        xenon = matrix.get('xenon');
        swarm = matrix.get('swarm');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_login_ok = false,
        os_name = null,
        cosmos = null,
        matrix = null,
        dev_box = null,
        morpheus = null,
        xenon = null,
        swarm = null,
        nature = null,
        krator_bee = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        key_control = new key_manager(),
        config = new config_model(),
        utils_int = new utilities();
}
