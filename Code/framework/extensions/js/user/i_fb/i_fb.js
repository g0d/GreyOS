/*

    GreyOS Inc. - Integrated Facebook extension

    File name: i_fb.js (Version: 1.1)
    Description: This file contains the Facebook application.

    Coded by Zlatko Jankovic

    GreyOS Inc.
    Copyright © 2014

*/

// Integrated Facebook
function i_fb()
{

    var self = this;

    function utilities()
    {
        
        var me = this;
        
        function draw()
        {
            
            this.enable_navigation = function()
            {

                vulcan.objects.by_id('i_fb_status_bar').innerHTML =
                        '<div id="i_fb_status_bar_menu_icon">' +
                            '<img id="i_fb_status_bar_bullets" src="/framework/extensions/js/i_fb/themes/pix/bullets.png">' +
                        '</div>' +
                        '<div id="i_fb_main_bottom_navigation" style="display: none;">' +                   
                        '</div>' +
                        '<div id="i_fb_mask" value="99" style="display: none;">' +                    
                        '</div>';
                
                return true; 

            };
            
            this.navigation_selected_menu_hover = function(tab_id)
            {

                if (tab_id === undefined)
                    return false;

                var menu_tabs = vulcan.objects.by_id('i_fb_navigation').getElementsByClassName('menu_box');

                var menu_tabs_length = menu_tabs.length;

                var procedure;

                for (var i = 0; i < menu_tabs_length; i++)
                {

                    if (menu_tabs[i].id === 'active_tab')
                        menu_tabs[i].removeAttribute('id');

                    if (menu_tabs[i].childNodes[0].id === tab_id)
                    {

                        menu_tabs[i].setAttribute('id', 'active_tab');

                        procedure = true;

                    }

                }

                if (procedure)
                    return true;

                else
                    return false;            
            
            };
            
            this.gui_init = function()
            {
                
                infinity.begin();
                
                me.ajax.data(config.id + '_data', 'action=start', function()
                {

                    me.events.login();
                    me.events.main_page();
                    me.draw.enable_navigation();
                    me.events.bottom_navigation();
                    infinity.end();
                    scroll_bar_fix(config.content_id);

                });
                
                return true;

            };
            
        }
        
        function ajax()
        {
            
            this.data = function(element_id, args, callback)
            {

                if (vulcan.validation.misc.is_undefined(element_id))
                    return false;

                var __url = null,
                    __data = null,
                    __ajax = new bull();

                __url = '/framework/extensions/ajax/i_fb/i_fb.php';
                __data = (args === undefined) ? ' ' : args;

                __ajax.data(__url, __data, element_id, 1, 1, false, callback);

                return true;

            };
            
            this.response = function(args)
            {

                var __url = null,
                    __data = null,
                    __ajax = new bull();

                __url = '/framework/extensions/ajax/i_fb/i_fb.php';
                __data = (args === undefined) ? ' ' : args;

                __ajax.response(__url, __data, 1);

                return true;

            };
            
        }
        
        function attach_events()
        {

            this.bottom_navigation = function()
            {

    //            vulcan.events.attach('i_fb', vulcan.objects.by_id('i_fb_status_bar_bullets'), 'click', 
    //            function(event_object)
    //            {
    //
    //                $('#i_fb #i_fb_main_bottom_navigation').toggle();
    //
    //            });

            };

            this.main_page = function()
            {

                vulcan.events.attach('i_fb', vulcan.objects.by_id('feed'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=home', function()
                    {

                        me.draw.navigation_selected_menu_hover('feed');
                        
                        me.events.load('feed');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

                vulcan.events.attach('i_fb', vulcan.objects.by_id('profile'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=profile', function()
                    {

                        me.draw.navigation_selected_menu_hover('profile');
                        
                        me.events.load('profile');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

                vulcan.events.attach('i_fb', vulcan.objects.by_id('requests'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=requests', function()
                    {

                        me.draw.navigation_selected_menu_hover('requests');
                        
                        me.events.load('requests');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

                vulcan.events.attach('i_fb', vulcan.objects.by_id('inbox'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=messages', function()
                    {

                        me.draw.navigation_selected_menu_hover('inbox');
                        
                        me.events.load('messages');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

                vulcan.events.attach('i_fb', vulcan.objects.by_id('nots'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=notifications', function()
                    {

                        me.draw.navigation_selected_menu_hover('nots');
                        
                        me.events.load('notifications');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

                vulcan.events.attach('i_fb', vulcan.objects.by_id('photo'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=photos', function()
                    {

                        me.draw.navigation_selected_menu_hover('photo');
                        
                        me.events.load('photo');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

                vulcan.events.attach('i_fb', vulcan.objects.by_id('checkin'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=checkin', function()
                    {

                        me.draw.navigation_selected_menu_hover('checkin');
                        
                        me.events.load('checkin');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

                vulcan.events.attach('i_fb', vulcan.objects.by_id('status'), 'click', 
                function(event_object)
                {

                    event_object.preventDefault();
                    
                    infinity.setup(config.content_id);

                    infinity.begin();

                    me.ajax.data('i_fb_main_content', 'action=status', function()
                    {

                        me.draw.navigation_selected_menu_hover('status');
                        
                        me.events.load('status');
                        
                        infinity.end();
                        
                        scroll_bar_fix(config.content_id);

                    });

                });

            };

            this.login = function()
            {

                var login =  vulcan.objects.by_id('facebook_login_button');

                vulcan.events.attach('i_fb', login, 'click', 
                function(event_object)
                {

                    event_object.preventDefault();

                    var login_url = this.getAttribute('data-url');

                    var w = 420;
                    var h = 300;
                    var left = (screen.width/2)-(w/2);
                    var top = (screen.height/2)-(h/2);

                    config.auth_window = window.open(login_url, 'Facebook_Login', 'location=0,status=0,width='+w+',height='+h+', top='+top+', left='+left);

                    me.check_auth_closed();

                });

            };

            this.load = function(group)
            {
                
                if (group === 'feed')
                {
                    
                    //code
                    
                }
                
                else if (group === 'profile')
                {
                    
                    //code
                    
                }
                
                else if (group === 'requests')
                {
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_id('fb_confirm_request'), 'click', 
                    function(event_object)
                    {
                        
                        event_object.preventDefault();
                        
                        infinity.setup(config.content_id);

                        infinity.begin();
                        
                        var id = this.getAttribute('data-friend');
                        
                        me.ajax.data('i_fb_main_content', 'action=confirm_request&friend_id=' + id, function()
                        {

                            me.draw.navigation_selected_menu_hover('requests');

                            //confirm dialog

                            infinity.end();
                            
                            scroll_bar_fix(config.content_id);

                        });
                        
                    });
                    
                }
                
                else if (group === 'inbox')
                {
                    
                    //code
                    
                }
                
                else if (group === 'notifications')
                {
                    
                    //code
                    
                }
                
                else if (group === 'photo')
                {
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_class('album_table_general'), 'click', 
                    function(event_object)
                    {

                        event_object.preventDefault();
                        
                        infinity.setup(config.content_id);

                        infinity.begin();
                        
                        var id = this.getAttribute('data-id');
                        
                        if (id === 'create_album')
                        {
                            
                            me.ajax.data('i_fb_main_content', 'action=create_album', function()
                            {

                                me.draw.navigation_selected_menu_hover('photo');

                                me.events.load('create_album');

                                infinity.end();
                                
                                scroll_bar_fix(config.content_id);

                            });
                            
                        }
                        
                        else
                        {

                            me.ajax.data('i_fb_main_content', 'action=display_album&album_id=' + id, function()
                            {

                                me.draw.navigation_selected_menu_hover('photo');

                                me.events.load('album_events');

                                infinity.end();
                                
                                scroll_bar_fix(config.content_id);

                            });
                    
                        }

                    });
                    
                }
                
                else if (group === 'album_events')
                {
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_class('album_table'), 'click', 
                    function(event_object)
                    {
                        
                        event_object.preventDefault();
                        
                        infinity.setup(config.content_id);

                        infinity.begin();
                        
                        var id = this.getAttribute('data-photo');
                        
                        me.ajax.data('i_fb_main_content', 'action=display_photo&photo_id=' + id, function()
                        {

                            me.draw.navigation_selected_menu_hover('photo');

                            me.events.load('photo_events');

                            infinity.end();
                            
                            scroll_bar_fix(config.content_id);

                        });
                        
                    });
                    
                }
                
                else if (group === 'photo_events')
                {
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_id('right_photo'), 'click', 
                    function(event_object)
                    {

                        event_object.preventDefault();
                        
                        //code

                    });
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_id('left_photo'), 'click', 
                    function(event_object)
                    {

                        event_object.preventDefault();
                        
                        //code

                    });
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_id('photo_x'), 'click', 
                    function(event_object)
                    {

                        event_object.preventDefault();
                        
                        //code

                    });
                    
                }
                
                else if (group === 'checkin')
                {
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_id('checkin_button'), 'click', 
                    function(event_object)
                    {

                        event_object.preventDefault();
                        
                        //code

                    });
                    
                    vulcan.events.attach('i_fb', vulcan.objects.by_id('map_click'), 'click', 
                    function(event_object)
                    {

                        event_object.preventDefault();
                        
                        //code

                    });
                    
                    
                    
                }
    
                else if (group === 'status')
                {

                    vulcan.events.attach('i_fb', vulcan.objects.by_id('update_status'), 'click', 
                    function(event_object)
                    {

                        event_object.preventDefault();

                        var message = vulcan.objects.by_id('status_message').value;

                        if (message.length === 0)
                        {

                            notification_push('#i_fb_navigation', 'Please type something to update your status!');

                        }

                        else
                        {

                            infinity.begin();

                            var result = me.ajax.data('i_fb_main_content','action=update_status&message=' + message);

                            if (result)
                            {

                                vulcan.objects.by_id('status_message').value = '';

                                notification_push('#i_fb_navigation', 'You have successfully updated your status!');

                            }

                            else
                                notification_push('#i_fb_navigation', 'Something went wrong! Please try again!');
                            
                            scroll_bar_fix(config.content_id);

                            infinity.end();

                        }

                    });

                }
                
                

            };

        }
        
        this.check_auth_closed = function()
        {

            if (config.auth_window && config.auth_window.closed)
            {

                window.clearInterval(config.auth_window_timer);

                me.draw.gui_init();

            }

            else
                config.auth_window_timer = setTimeout(me.check_auth_closed, 500);
            
            return true;

        };
        
        this.events = new attach_events();
        this.ajax = new ajax();
        this.draw = new draw();

    }

    function settings()
    {
        
        var me = this;
        
        var __id = null;
        
        this.id = function()
        {
            
            __id = 'i_fb';
            
            return __id;
            
        };
        
    }
    
    function config_model()
    {
        
        this.auth_window = null;
        this.auth_window_timer = null;
        
        return true;
        
    }
    
    function initialize_map()
    {
        
        var me = this;
        
        function init()
        {

            var my_options = {

                                center: new google.maps.LatLng(48.814099, -122.294312 ),
                                zoom: 7,
                                mapTypeId: google.maps.MapTypeId.HYBRID

                             };

            var geocoder = new google.maps.Geocoder();
            var map = new google.maps.Map(document.getElementById('map_canvas'), my_options);
            var marker;

            google.maps.event.addListener(map, 'click', function(event) 
                                            {

                                                place_marker(event.latLng, marker);
                                                option_places();

                                            });

            
            
        }
        
        this.place_marker = function(location, marker)
        {

            if (marker)
            { 

                marker.setPosition(location);

            }

            else
            {

                marker = new google.maps.Marker(
                { 
                    
                    position: location,
                    map: map
                
                });
            
            }
            
            vulcan.objects.by_id('lat').value = location.lat();
            vulcan.objects.by_id('lng').value = location.lng();
            
            return true;

        };

        this.option_places = function()
        {

            var latitude = vulcan.objects.by_id('lat').value;
            var longitude = vulcan.objects.by_id('lng').value;
            
            me.ajax.data('checkin_places', 'action=add_places_option&latitude=' + latitude + '&longitude=' + longitude);
            
            return true;

        };
        
        //this.init = new init(); 

    }

    this.get_bee = function()
    {
        
        if (is_init === false)
            return false;

        return config.bee;

    };
    
    this.init = function()
    {
        if (is_init === true)
            return false;

        is_init = true;

        config.bee = dev_box.get('bee');
        config.id = 'i_fb';
        config.content_id = 'i_fb_main_content';

        infinity.setup(config.id + '_data');
        fx = dev_box.get('fx');
        fx.init(cosmos);
        scrollbar = dev_box.get('scrollbar');
        scrollbar.init(cosmos);
    
        vulcan.graphics.apply_theme('/framework/extensions/js/i_fb/themes', 'i_fb');

        // Declare bee's settings
        config.bee.init(cosmos, config.id, 2);
        config.bee.settings.data.window.labels.title('Facebook Application');
        config.bee.settings.data.window.labels.status_bar('Sign in to socialize with your friends');
        config.bee.gui.position.left(200);
        config.bee.gui.position.top(20);
        config.bee.gui.size.width(700);
        config.bee.gui.size.height(500);
        config.bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        config.bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        config.bee.on('open', function() { config.bee.gui.fx.fade.into(); });
        config.bee.on('opened', function() { return utils.draw.gui_init(); });
        config.bee.on('dragging', function()
                                    {
                                        config.bee.gui.fx.opacity.settings.set(0.7);
                                        config.bee.gui.fx.opacity.apply();
                                    });
        config.bee.on('dragged', function() { config.bee.gui.fx.opacity.reset(); });
        config.bee.on('close', function() { config.bee.gui.fx.fade.out(); });

        config.bee.settings.data.casement.content('Extra GUI...');
        config.bee.settings.data.casement.labels.title('FB Update');
        config.bee.settings.data.casement.labels.status('Helping (secondary) status bar messages...');

        console.log(config.bee);

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');
        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        pythia = matrix.get('pythia');
        colony = matrix.get('colony');
        swarm = matrix.get('swarm');
        infinity = matrix.get('infinity');

        cosmos_exists = true;

        return true;
    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        dev_box = null,
        pythia = null,
        infinity = null,
        scrollbar = null,
        colony = null,
        swarm = null,
        fx = null,
        settings = new settings(),
        config = new config_model(),
        utils = new utilities(),
        map = new initialize_map();

}


