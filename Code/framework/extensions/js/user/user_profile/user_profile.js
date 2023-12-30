/*
    GreyOS - User Profile (Version: 1.6)

    File name: user_profile.js
    Description: This file contains the User Profile module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2023
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
        this.wallpaper = null;
    }

    function utilities()
    {
        var me = this;

        this.session_watchdog = function()
        {
            function abnormal_logout()
            {
                msg_win = new msgbox();

                msg_win.init('desktop');
                msg_win.show(os_name, 'Your session has been terminated!',
                function() { setTimeout(function(){ location.reload(); }, 1000); });
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

        this.details = function(print)
        {
            var __data = 'gate=auth&mode=details';

            ajax_factory(__data, function(result)
                                 {
                                    var __user_details = JSON.parse(result);

                                    user_profile_data.full_name = __user_details.user.profile;
                                    user_profile_data.email = __user_details.user.email;
                                    user_profile_data.wallpaper = __user_details.user.wallpaper;

                                    if (print === true)
                                    {
                                        utils_sys.objects.by_id('user_profile_name').innerHTML = user_profile_data.full_name;
                                        utils_sys.objects.by_id('user_email').innerHTML = user_profile_data.email;

                                        if (user_profile_data.wallpaper === '')
                                            document.body.style.backgroundImage = 'url(/site/pix/wallpapers/default.jpg)';
                                        else
                                            document.body.style.backgroundImage = 'url(/site/pix/wallpapers/' + user_profile_data.wallpaper + ')';
                                    }
                                    else
                                        return user_profile_data;
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

            ajax_factory(__data, function()
                                 {
                                     cc_reload.init('Logging out...');
                                 },
                                 function()
                                 {
                                     msg_win = new msgbox();

                                     msg_win.init('desktop');
                                     msg_win.show(os_name, 'Logout error!', 
                                                  function() { cc_reload.init(); });
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
            me.details(true);
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
                                                <div id="notifications_num">00</div>\
                                                <div id="profile_access">\
                                                    <div id="small_avatar"></div>\
                                                    <div id="my">My profile</div>\
                                                </div>\
                                            </div>\
                                            <div id="' + user_profile_id + '_area" class="user_profile_area">\
                                                <div id="profile_left_side">\
                                                    <div id="profile_info">\
                                                        <div id="big_avatar"></div>\
                                                        <div id="user_data">\
                                                            <div id="user_profile_name"></div>\
                                                            <div id="user_email"></div>\
                                                            <div id="user_account">Account</div>\
                                                            <div id="separator">|</div>\
                                                            <div id="user_settings">Settings</div>\
                                                            <div id="user_reboot">Reload Interface</div>\
                                                        </div>\
                                                    </div>\
                                                </div>\
                                                <div id="profile_right_side">\
                                                    <div id="notifications">\
                                                        <div id="total_notifications"></div>\
                                                        <div id="notifications_list">\
                                                            <div id="messages" class="notification_list_item">\
                                                                <div class="item_details">\
                                                                    <div id="messages_icon" class="list_item_icon"></div>\
                                                                    <div id="messages_text" class="list_item_text">Messages</div>\
                                                                </div>\
                                                                <div class="list_item_notifications">00</div>\
                                                            </div>\
                                                            <div id="alerts" class="notification_list_item">\
                                                                <div class="item_details">\
                                                                    <div id="alerts_icon" class="list_item_icon"></div>\
                                                                    <div id="alerts_text" class="list_item_text">Alerts</div>\
                                                                </div>\
                                                                <div class="list_item_notifications">00</div>\
                                                            </div>\
                                                            <div id="calendar" class="notification_list_item">\
                                                                <div class="item_details">\
                                                                    <div id="calendar_icon" class="list_item_icon"></div>\
                                                                    <div id="calendar_text" class="list_item_text">Calendar</div>\
                                                                </div>\
                                                                <div class="list_item_notifications">00</div>\
                                                            </div>\
                                                        </div>\
                                                    </div>\
                                                    <div id="logout">\
                                                        <div id="logout_icon"></div>\
                                                        <button id="logout_button" class="button" type="button">Logout</button>\
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
            morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('user_reboot'));

            __handler = function() {  me.logout(); };
            morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('logout'));

            __handler = function() {  me.hide_profile_area(); };
            morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('desktop'));

            __handler = function(event) {  me.hide_profile_area_handler(event); };
            morpheus.run(user_profile_id, 'key', 'keydown', __handler, document);

            return true;
        };

        this.toggle_profile_area = function()
        {
            var __user_profile_area = utils_sys.objects.by_id(user_profile_id + '_area'),
                __my_profile_label = utils_sys.objects.by_id('my');

            if (is_profile_area_visible === true)
            {
                is_profile_area_visible = false;

                __user_profile_area.style.display = 'none';
                __my_profile_label.style.color = '#55b8ff';
            }
            else
            {
                is_profile_area_visible = true;

                __user_profile_area.style.display = 'block';
                __my_profile_label.style.color = '#55ffe7';
            }

            return true;
        };

        this.hide_profile_area_handler = function(event)
        {
            if (utils_sys.validation.misc.is_undefined(event))
                return false;

            key_control.scan(event);

            if (key_control.get() !== key_control.keys.ESCAPE)
                return false;

            me.hide_profile_area();

            return true;
        };

        this.hide_profile_area = function()
        {
            var __user_profile_area = utils_sys.objects.by_id(user_profile_id + '_area'),
                __my_profile_label = utils_sys.objects.by_id('my');

            __user_profile_area.style.display = 'none';
            __my_profile_label.style.color = '#55b8ff';

            is_profile_area_visible = false;

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

    this.details = function()
    {
        if (is_init === false)
            return false;

        return utils_int.details(false);
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

        nature.theme('user_profile');
        nature.apply('new');

        utils_int.draw_user_profile();

        msg_win = new msgbox();

        msg_win.init('desktop');

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
        colony = null,
        xenon = null,
        swarm = null,
        hive = null,
        morpheus = null,
        nature = null,
        msg_win = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        key_control = new key_manager(),
        cc_reload = new f5(),
        user_profile_data = new user_profile_model(),
        utils_int = new utilities();

    this.settings = new settings();
}
