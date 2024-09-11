/*
    GreyOS - User Profile (Version: 2.6)

    File name: user_profile.js
    Description: This file contains the User Profile module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// User Profile
function user_profile()
{
    var self = this;

    function user_profile_model()
    {
        this.full_name = null;
        this.email = null;
        this.role = null;
        this.wallpaper = null;
    }

    function utilities()
    {
        var me = this;

        function hide_profile_area_on_key(event)
        {
            if (utils_sys.validation.misc.is_undefined(event))
                return false;

            key_control.scan(event);

            if (key_control.get() !== key_control.keys.ESCAPE)
                return false;

            me.hide_profile_area();

            return true;
        }

        this.session_watchdog = function()
        {
            function abnormal_logout()
            {
                var __msg_win = new msgbox();

                __msg_win.init('desktop');
                __msg_win.show(os_name, 'Your session has been terminated!', 
                               __msg_win.types.OK, 
                               [() =>
                                {
                                    parrot.play('sys', '/site/themes/' + chameleon.get() + '/sounds/logout_fresh.mp3');

                                    setTimeout(function(){ location.reload();
                                }, 1000); }]);
            }

            function run_heartbeat()
            {
                var heartbeat_config = {
                                            "interval"          :   90000,
                                            "response_timeout"  :   60000,
                                            "on_success"        :   function()
                                                                    {
                                                                        // OK
                                                                    },
                                            "on_fail"           :   function()
                                                                    {
                                                                        abnormal_logout();
                                                                    },
                                            "on_timeout"        :   function()
                                                                    {
                                                                        // Wait more until fail
                                                                    }
                                        };

                heartbeat_config.url = 'beat/';
                heartbeat_config.service_name = 'Session Watchdog';

                heartbeat(heartbeat_config);
            }
        
            setTimeout(function(){ run_heartbeat(); }, 1000);
        };

        this.details = function()
        {
            var __data = 'gate=auth&mode=details';

            ajax_factory('post', __data, function(result)
                                         {
                                            var __auth_details = JSON.parse(result);

                                            user_profile_data.full_name = __auth_details.profile;
                                            user_profile_data.email = __auth_details.email;
                                            user_profile_data.role = __auth_details.role;
                                            user_profile_data.wallpaper = __auth_details.ui.wallpaper;

                                            utils_sys.objects.by_id(user_profile_id + '_user_profile_name').innerHTML = user_profile_data.full_name;
                                            utils_sys.objects.by_id(user_profile_id + '_user_email').innerHTML = user_profile_data.email;

                                            if (user_profile_data.wallpaper === '')
                                                document.body.style.backgroundImage = 'url(/site/pix/wallpapers/default.png)';
                                            else
                                                document.body.style.backgroundImage = 'url(/site/pix/wallpapers/' + user_profile_data.wallpaper + ')';
                                         },
                                         function()
                                         {
                                            // Nothing...
                                         },
                                         function()
                                         {
                                            // No need to use this
                                         });
        };

        this.logout = function()
        {
            var __data = 'gate=auth&mode=logout';

            ajax_factory('post', __data, function()
                                         {
                                             parrot.play('sys', '/site/themes/' + chameleon.get() + '/sounds/logout_fresh.mp3');

                                             cc_reload.init('Logging out...');
                                         },
                                         function()
                                         {
                                             var __msg_win = new msgbox();

                                             __msg_win.init('desktop');
                                             __msg_win.show(os_name, 'Logout error!', 
                                                            __msg_win.types.OK, 
                                                            [() => { cc_reload.init(); }]);
                                         },
                                         function()
                                         {
                                             // No need to use this
                                         });

            me.hide_profile_area();
        };

        this.draw_user_profile = function()
        {
            me.draw();
            me.attach_events();
            me.details();
            me.session_watchdog();

            return true;
        };

        this.draw = function()
        {
            var __user_profile_div = utils_sys.objects.by_id('user_profile');

            if (__user_profile_div === null)
                return false;

            __user_profile_div.style = 'width: 182px; margin-left: 25px;';
            __user_profile_div.innerHTML = '<div id="' + user_profile_id + '" title="Manage profile">\
                                                <div id="' + user_profile_id + '_notifications_num" class="notifications_num">00</div>\
                                                <div id="' + user_profile_id + '_profile_access" class="profile_access">\
                                                    <div id="' + user_profile_id + '_small_avatar" class="small_avatar"></div>\
                                                    <div id="' + user_profile_id + '_my" class="my">My profile</div>\
                                                </div>\
                                            </div>\
                                            <div id="' + user_profile_id + '_area" class="user_profile_area">\
                                                <div id="' + user_profile_id + '_profile_left_side" class="profile_left_side">\
                                                    <div id="' + user_profile_id + '_profile_info" class="profile_info">\
                                                        <div id="' + user_profile_id + '_big_avatar" class="big_avatar"></div>\
                                                        <div id="' + user_profile_id + '_user_data" class="user_data">\
                                                            <div id="' + user_profile_id + '_user_profile_name" class="user_profile_name"></div>\
                                                            <div id="' + user_profile_id + '_user_email" class="user_email"></div>\
                                                            <div id="' + user_profile_id + '_user_account" class="user_account">Account</div>\
                                                            <div id="' + user_profile_id + '_separator" class="profile_separator">|</div>\
                                                            <div id="' + user_profile_id + '_user_settings" class="user_settings">Settings</div>\
                                                            <div id="' + user_profile_id + '_user_reboot" class="user_reboot">Reload Interface</div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                                <div id="' + user_profile_id + '_profile_right_side" class="profile_right_side">\
                                                    <div id="' + user_profile_id + '_notifications" class="notifications">\
                                                        <div id="' + user_profile_id + '_total_notifications" class="total_notifications"></div>\
                                                        <div id="' + user_profile_id + '_notifications_list" class="notifications_list">\
                                                            <div id="' + user_profile_id + '_messages" class="notification_list_item">\
                                                                <div class="' + user_profile_id + '_item_details" class="items_details">\
                                                                    <div id="' + user_profile_id + '_messages_icon" class="messages_icon list_item_icon"></div>\
                                                                    <div id="' + user_profile_id + '_messages_text" class="list_item_text">Messages</div>\
                                                                </div>\
                                                                <div id="' + user_profile_id + '_messages_notifications" class="list_item_notifications">00</div>\
                                                            </div>\
                                                            <div id="' + user_profile_id + '_alerts" class="notification_list_item">\
                                                                <div class="' + user_profile_id + '_item_details" class="item_details">\
                                                                    <div id="' + user_profile_id + '_alerts_icon" class="alerts_icon list_item_icon"></div>\
                                                                    <div id="' + user_profile_id + '_alerts_text" class="list_item_text">Alerts</div>\
                                                                </div>\
                                                                <div id="' + user_profile_id + '_alerts_notifications" class="list_item_notifications">00</div>\
                                                            </div>\
                                                            <div id="' + user_profile_id + '_calendar" class="notification_list_item">\
                                                                <div class="' + user_profile_id + '_item_details" class="item_details">\
                                                                    <div id="' + user_profile_id + '_calendar_icon" class="calendar_icon list_item_icon"></div>\
                                                                    <div id="' + user_profile_id + '_calendar_text" class="list_item_text">Calendar</div>\
                                                                </div>\
                                                                <div id="' + user_profile_id + '_calendar_notifications" class="list_item_notifications">00</div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    <div id="' + user_profile_id + '_logout" class="logout">\
                                                        <div id="' + user_profile_id + '_logout_icon" class="logout_icon"></div>\
                                                        <button id="' + user_profile_id + '_logout_button" class="button logout_button" type="button">Logout</button>\
                                                    </div>\
                                                </div>\
                                            </div>';

            return true;
        };

        this.attach_events = function()
        {
            var __handler = null;

            __handler = function() { me.toggle_profile_area(); };
            morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(user_profile_id));

            __handler = function() {  me.reboot_os(); };
            morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(user_profile_id + '_user_reboot'));

            __handler = function() {  me.logout(); };
            morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(user_profile_id + '_logout'));

            __handler = function() {  me.hide_profile_area(); };
            morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('desktop'));
            morpheus.run(user_profile_id, 'touch', 'touchmove', __handler, utils_sys.objects.by_id('desktop'));

            __handler = function(event) {  hide_profile_area_on_key(event); };
            morpheus.run(user_profile_id, 'key', 'keydown', __handler, document);

            return true;
        };

        this.show_profile_area = function()
        {
            var __user_profile_area = utils_sys.objects.by_id(user_profile_id + '_area'),
                __my_profile_label = utils_sys.objects.by_id(user_profile_id + '_my');

            __user_profile_area.style.display = 'block';
            __my_profile_label.classList.remove('user_profile_hidden');
            __my_profile_label.classList.add('user_profile_active');

            is_profile_area_visible = true;

            super_tray.hide();

            return true;
        };

        this.hide_profile_area = function()
        {
            var __user_profile_area = utils_sys.objects.by_id(user_profile_id + '_area'),
                __my_profile_label = utils_sys.objects.by_id(user_profile_id + '_my');

            __user_profile_area.style.display = 'none';
            __my_profile_label.classList.remove('user_profile_active');
            __my_profile_label.classList.add('user_profile_hidden');

            is_profile_area_visible = false;

            super_tray.hide();

            return true;
        };

        this.toggle_profile_area = function()
        {
            if (is_profile_area_visible)
                me.hide_profile_area();
            else
                me.show_profile_area();

            return true;
        };

        this.reboot_os = function()
        {
            cc_reload.init();

            return true;
        };
    }

    function settings()
    {
        var __id = null,
            __container = null;

        this.id = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __id;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __id = val;

            return true;
        };

        this.container = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __container;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __container = val;

            return true;
        };
    }

    this.show = function()
    {
        if (is_init === false)
            return false;

        return utils_int.show_profile_area();
    };

    this.hide = function()
    {
        if (is_init === false)
            return false;

        return utils_int.hide_profile_area();
    };

    this.toggle = function()
    {
        if (is_init === false)
            return false;

        return utils_int.toggle_profile_area();
    };

    this.details = function()
    {
        if (is_init === false)
            return false;

        return user_profile_data;
    };

    this.logout = function()
    {
        utils_int.logout();

        return true;
    };

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
           return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || 
            utils_sys.validation.alpha.is_symbol(container_id) || 
            utils_sys.objects.by_id(container_id) === null)
            return false;

        is_init = true;

        os_name = xenon.load('os_name');

        self.settings.id('user_profile_' + random.generate());
        self.settings.container(container_id);

        user_profile_id = self.settings.id();

        nature.themes.store('user_profile');
        nature.apply('new');

        utils_int.draw_user_profile();

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        colony =  cosmos.hub.access('colony');

        xenon = matrix.get('xenon');
        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        morpheus = matrix.get('morpheus');
        super_tray = matrix.get('super_tray');
        parrot = matrix.get('parrot');
        chameleon = matrix.get('chameleon');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_profile_area_visible = false,
        user_profile_id = null,
        user_details = null,
        os_name = null,
        cosmos = null,
        matrix = null,
        xenon = null,
        swarm = null,
        hive = null,
        morpheus = null,
        super_tray = null,
        chameleon = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        key_control = new key_manager(),
        cc_reload = new f5(),
        user_profile_data = new user_profile_model(),
        utils_int = new utilities();

    this.settings = new settings();
}
