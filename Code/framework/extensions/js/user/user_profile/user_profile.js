/*
    GreyOS - User Profile (Version: 1.0)
    
    File name: user_profile.js
    Description: This file contains the User Profile module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// User Profile
function user_profile()
{
    var self = this;

    function utilities()
    {
        var me = this;

        this.session_watchdog = function()
        {
            function abnormal_logout()
            {
                msg_win = new msgbox();

                msg_win.init('desktop');
                msg_win.show('GreyOS', 'Your session has been terminated!',
                function() { setTimeout(function(){ me.logout(); }, 2000); });
            }

            function run_heartbeat()
            {
                var heartbeat_config = {
                                            "interval"          :   60000,
                                            "response_timeout"  :   3000,
                                            "on_success"        :   function()
                                                                    {
                                                                        // All is OK
                                                                    },
                                            "on_fail"           :   function()
                                                                    {
                                                                        abnormal_logout();
                                                                    },
                                            "on_timeout"        :   function()
                                                                    {
                                                                        abnormal_logout();
                                                                    }
                                        };

                heartbeat_config.url = 'gate=heartbeat';
                heartbeat_config.service_name = 'Session Watchdog';

                heartbeat(heartbeat_config);
            }
        
            setTimeout(function(){ run_heartbeat(); }, 1000);
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
                                     msg_win.show('GreyOS', 'Logout error!', 
                                                  function() { cc_reload.init(); });
                                 },
                                 function()
                                 {
                                    // No need to use this
                                 });

            me.hide_pop_up();
        };

        this.draw_user_profile = function()
        {
            me.draw();
            me.attach_events();
            me.session_watchdog();

            return true;
        };

        this.draw = function()
        {
            var __user_profile_div = utils_sys.objects.by_id('user_profile');

            if (__user_profile_div === null)
                return false;

            __user_profile_div.innerHTML = '<div id="' + self.settings.id() + '" title="Manage profile">\
                                                <div id="notifications_num">00</div>\
                                                <div id="profile_access">\
                                                    <div id="small_avatar"></div>\
                                                    <div id="my">My profile</div>\
                                                </div>\
                                            </div>\
                                            <div id="' + self.settings.id() + '_pop_up" class="user_profile_pop_up">\
                                                <div id="profile_left_side">\
                                                    <div id="profile_info">\
                                                        <div id="big_avatar"></div>\
                                                        <div id="user_data">\
                                                            <div id="user_full_name">George Delaportas</div>\
                                                            <div id="user_email">demo@greyos.gr</div>\
                                                            <div id="user_account">Account</div>\
                                                            <div id="separator">|</div>\
                                                            <div id="user_settings">Settings</div>\
                                                            <div id="user_reboot">Reboot system</div>\
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
                                                        <button id="logout_button" class="button">Logout</button>\
                                                    </div>\
                                                </div>\
                                            </div>';

            return true;
        };

        this.attach_events = function()
        {
            utils_sys.events.attach('user_profile', utils_sys.objects.by_id(self.settings.id()), 'click', function() { me.toggle_pop_up(); });
            utils_sys.events.attach('user_profile', utils_sys.objects.by_id('user_reboot'), 'click', function() { me.reboot_os(); });
            utils_sys.events.attach('user_profile', utils_sys.objects.by_id('logout'), 'click', function() { me.logout(); });
            utils_sys.events.attach('user_profile', utils_sys.objects.by_id('desktop'), 'click', function() { me.hide_pop_up(); });
            utils_sys.events.attach('user_profile', document, 'keydown', function(event) { me.hide_pop_up_handler(event); });

            return true;
        };

        this.toggle_pop_up = function()
        {
            var __user_profile_pop_up = utils_sys.objects.by_id(self.settings.id() + '_pop_up'),
                __my_profile_label = utils_sys.objects.by_id('my');

            if (is_pop_up_visible === true)
            {
                is_pop_up_visible = false;

                __user_profile_pop_up.style.display = 'none';
                __my_profile_label.style.color = '#55b8ff';
            }
            else
            {
                is_pop_up_visible = true;

                __user_profile_pop_up.style.display = 'block';
                __my_profile_label.style.color = '#55ffe7';
            }

            return true;
        };

        this.hide_pop_up_handler = function(event)
        {
            if (utils_sys.validation.misc.is_undefined(event))
                return false;

            key_control.scan(event);

            if (key_control.get() !== key_control.constants().ESCAPE)
                return false;

            me.hide_pop_up();

            return true;
        };

        this.hide_pop_up = function()
        {
            var __user_profile_pop_up = utils_sys.objects.by_id(self.settings.id() + '_pop_up'),
                __my_profile_label = utils_sys.objects.by_id('my');

            __user_profile_pop_up.style.display = 'none';
            __my_profile_label.style.color = '#55b8ff';

            is_pop_up_visible = false;

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

        self.settings.id('user_profile_' + random.generate());
        self.settings.container(container_id);

        nature.theme('user_profile');
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

        swarm = matrix.get('swarm');
        hive = matrix.get('hive');
        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        is_pop_up_visible = false,
        cosmos = null,
        matrix = null,
        colony = null,
        swarm = null,
        hive = null,
        nature = null,
        msg_win = null,
        utils_sys = new vulcan(),
        key_control = new key_manager(),
        cc_reload = new f5(),
        utils_int = new utilities();

    this.settings = new settings();
}
