/*

    GreyOS Inc. - Integrated Twitter extension

    File name: i_twitter.js (Version: 2.0)
    Description: This file contains the Twitter extension.

    Coded by John Inglessis (negle)

    GreyOS Inc.
    Copyright © 2014

*/



// Intergrated Twitter
function i_twitter()
{

    var self = this;

    function utilities()
    {

        var me = this;

        function draw()
        {

            this.bottom_menu = function()
            {

                vulcan.objects.by_id(config.id + '_status_bar').innerHTML += 
                    '<div id="twitter_status_bar_menu_icon">' +
                    '   <img id="twitter_status_bar_bullets" src="framework/extensions/js/i_twitter/themes/pix/bullets.png">' +
                    '</div>' +
                    '<nav id="twitter_nav_main_bottom_navigation">' +
                    '   <ul id="twitter_main_bottom_navigation">' +
                    '       <li><a id="home_timeline" title="Home" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/home.png"></a></li>' +
                    '       <li><a id="view_tweets" title="Me" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/me.png"></a></li>' +
                    '       <li><a id="mentions" title="Mentions" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/mentions.png"></a></li>' +
                    '       <li><a id="new_status" title="Compose Tweet" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/newtweet.png"></a></li>' +
                    '       <li><a id="followers_list" title="Followers" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/followers.png"></a></li>' +
                    '       <li><a id="friends_list" title="Following" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/friends.png"></a></li>' +
                    '       <li><a id="suggestions" title="Suggestions" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/suggestions.png"></a></li>' +
                    '       <li><a id="favorites" title="Favorites" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/favorites.png"></a></li>' +
                    '       <li><a id="account_settings" title="Settings" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/settings.png"></a></li>' +
                    '       <li><a id="direct_messages" title="Messages" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/messages.png"></a></li>' +
                    '       <li><a id="search" title="Search" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/search.png"></a></li>' +
                    '       <li class="logout"><a id="logout" title="Logout" href="#"><img src="framework/extensions/js/i_twitter/themes/pix/logout.png"></a></li>' +
                    '       <li id="twitter_menu_separator_li"><div id="twitter_menu_separator_div"></div></li>' + 
                    '   </ul>' +
                    '</nav>';

                me.events.attach(2);

                me.events.attach(3);

                return true;

            };

            this.header = function()
            {

            };

            this.gui_init = function()
            {

                infinity.begin();

                me.status_bar.update(2);

                me.ajax.data(config.id + '_data', 'action=start', function()
                {

                    if(vulcan.objects.by_id('twitter_login_div') !== null)
                    {

                        me.status_bar.update(1);

                        me.events.attach(1);

                        infinity.end();

                    }

                    else
                    {

                        me.status_bar.update(3, 10);

                        me.draw.bottom_menu();

                        me.events.attach(4);

                        me.events.attach(5);

                        me.events.attach(6);

                        me.events.attach(7);

                        infinity.end();

                        scroll_bar_fix(config.content_id);

                        // Fix the height of the casement.

                    }     

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

                __url = '/framework/extensions/ajax/i_twitter/i_twitter.php';
                __data = (args === undefined) ? ' ' : args;

                __ajax.data(__url, __data, element_id, 1, 1, false, callback);

                return true;

            };

        }

        function events()
        {

            this.attach = function(action)
            {

                if (!vulcan.validation.numerics.is_number(action) || action > 7 || action < 0)
                    return false;

                if (action === 1)
                {

                    vulcan.events.attach('twitter_app', vulcan.objects.by_id('twitter_access_token'), 'click', function(event)
                    {

                        event.preventDefault();

                        config.auth_window = window.open('framework/extensions/ajax/i_twitter/i_twitter.php?action=authorization', 
                                                         'Twitter_Login', 
                                                         'location=0,status=0,width=800,height=550');

                        me.check_auth_closed();

                    });

                    return true;

                }

                else if (action === 2)
                {

                    vulcan.events.attach('twitter_app', vulcan.objects.by_id('twitter_status_bar_bullets'), 'click', function()
                    {

                        fx.visibility.toggle('twitter_main_bottom_navigation', 1);

                    });

                    vulcan.events.attach('twitter_app', vulcan.objects.by_id(config.id + '_data'), 'click', function()
                    {

                        //Needs extra checks
                        // ...

                        if(fx.visibility.is_visible('twitter_main_bottom_navigation', 1))
                            fx.visibility.hide('twitter_main_bottom_navigation', 1);

                    });

                    return true;

                }

                // Attach Bottom Navigation Menu Options
                else if (action === 3)
                {

                    // Attach Home Timeline
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #home_timeline'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=home_timeline', function()
                        {

                            me.status_bar.update(3, 10);

                            me.events.attach(5);

                            me.events.attach(6);

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach User Timeline
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #view_tweets'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=user_timeline', function(){

                            me.status_bar.update(3, 10);

                            me.events.attach(5);

                            me.events.attach(6);

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Mentions
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #mentions'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=mentions_timeline', function(){

                            me.status_bar.update(3, 10); 

                            me.events.attach(5);

                            me.events.attach(6);

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Compose New Tweet
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #new_status'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=compose_tweet', function()
                        {

                            me.status_bar.update(4); 

                            infinity.end();

                        });

                    });

                    // Attach Followers List
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #followers_list'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=followers', function()
                        {

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Friends List
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #friends_list'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=following', function()
                        {

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Suggestions
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #suggestions'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=suggestions', function()
                        {

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Favorites List
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #favorites'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=favorites', function()
                        {

                            infinity.end();

                            me.events.attach(5);

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Account Settings
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #account_settings'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=account_settings', function()
                        {

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Direct Messages
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #direct_messages'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=messages', function()
                        {

                            infinity.end();

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Search Bar
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #search'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                    });

                    // Attach Logout 
                    vulcan.events.attach('twitter_app', vulcan.objects.selectors.first('#twitter_main_bottom_navigation #logout'), 'click', 
                    function(event)
                    {

                        event.preventDefault();

                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.id + '_data', 'action=logout', function(){

                            me.status_bar.update(1);

                            me.events.attach(1);

                            infinity.end();

                        });

                    });             

                    return true;

                }

                else if (action === 4)
                {

                    // Attach Header Statistics
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('twitter_statistic'), 'click', function()
                    {

                        var section = this.getAttribute('data-section');

                        if (section === 'tweets')
                        {

                            infinity.setup(config.content_id);

                            infinity.begin();

                            me.status_bar.update(2);

                            me.ajax.data(config.content_id, 'action=user_timeline', function()
                            {

                                me.status_bar.update(3, 10);  

                                infinity.end();

                                me.events.attach(5);

                                scroll_bar_fix(config.content_id);

                            });

                        }   

                        else if (section === 'following')
                        {

                            infinity.setup(config.content_id);

                            infinity.begin();

                            me.status_bar.update(2);

                            me.ajax.data(config.content_id, 'action=following', function()
                            {

                                infinity.end();

                                me.events.attach(5);

                                scroll_bar_fix(config.content_id);

                            });


                        }   

                        else if (section === 'followers')
                        {

                            infinity.setup(config.content_id);

                            infinity.begin();

                            me.status_bar.update(2);

                            me.ajax.data(config.content_id, 'action=following', function()
                            {

                                infinity.end();

                                me.events.attach(5);

                                scroll_bar_fix(config.content_id);

                            });

                        }   

                        else
                            return false;               

                    });

                    return true;

                }

                // Attach Tweet Entities
                else if (action === 5)
                {

                    // Attach Hashtags
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_hashtag'), 'click', function(event)
                    {

                        event.preventDefault();

                        var query = '#' + this.getAttribute('data-hashtag');

                        // URL Encoding
                        query = encodeURIComponent(query);

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=search&query=' + query, function()
                        {

                            infinity.end();

                            me.events.attach(5);

                            scroll_bar_fix(config.content_id);

                        });

                    });

                    // Attach Urls
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_url'), 'click', function()
                    {

                        // Enable it with Coyote.

                    });

                    // Attach User Mentions
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_user_mention'), 'click', function()
                    {

                        event.preventDefault();

                        var screen_name = this.getAttribute('data-screen_name');

                        infinity.setup(config.content_id);

                        infinity.begin();

                        me.status_bar.update(2);

                        me.ajax.data(config.content_id, 'action=user_timeline&screen_name=' + screen_name, function()
                        {

                            infinity.end();

                            me.events.attach(5);

                            scroll_bar_fix(config.content_id);

                        });
                                 

                    });


                    // Attach Media
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_media_photo'), 'click', function()
                    {

                        // Open with the new extension

                    });

                }

                else if (action === 6)
                {

                    // Attach Reply
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_action_reply'), 'click', function(event)
                    {

                        event.preventDefault();
                        
                        fx.visibility.toggle(this.parentNode.parentNode.nextSibling, 4);

                    });

                    // Attach Retweet
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_action_retweet'), 'click', function(event)
                    {

                        event.preventDefault();

                    });

                    // Attach Favorite
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_action_favorite'), 'click', function(event)
                    {

                        event.preventDefault();

                    });

                    // Attach More
                    vulcan.events.attach('twitter_app', vulcan.objects.by_class('tweet_action_more'), 'click', function(event)
                    {

                        event.preventDefault();

                    });

                }

                else if (action === 7)
                {

                    // Attach More Button
                    vulcan.events.attach('twitter_app', vulcan.objects.by_id('twitter_more_button'), 'click', function(event)
                    {

                        event.preventDefault();

                        alert(1);

                    });

                    // Attach Back To Top Button
                    vulcan.events.attach('twitter_app', vulcan.objects.by_id('twitter_back_to_top'), 'click', function(event)
                    {

                        event.preventDefault();

                        scroll_bar_scroll_to(config.content_id, 'top');

                    });

                }

            };

        }

        function status_bar()
        {

            this.update = function(action, data)
            {

                if (!vulcan.validation.numerics.is_number(action))
                    return false;

                var __status_message = null;

                if (action === 1)
                    __status_message = 'Sign in to view your tweets';

                else if (action === 2)
                    __status_message = "Loading...";

                else if (action === 3)
                {   

                    if (vulcan.validation.misc.is_undefined(data))
                        return false;

                    var __num_of_twts = data;

                    __status_message = "Viewing " + __num_of_twts + " tweets...";

                }

                else if (action === 4)
                    __status_message = "Compose your new tweet..";

                else if (action === 5)
                {
 
                    var __followers = 0;

                    __status_message = __followers + ' people are following you..';

                }

                else if (action === 6)
                {

                    var __following = 0;

                    __status_message = 'You are following ' + __following + ' people';

                }

                else if (action === 7)
                    __status_message = "Suggested topics!";

                else if (action === 8)
                {

                    var __fav_twts = 0;

                    __status_message = "Viewing " + __fav_twts + " of your favorite tweets...";

                }

                else if (action === 9)
                    __status_message = "Account settings..";

                else if (action === 10)
                    __status_message = 'Your direct messages..';

                else if (action === 11)
                {

                    var __search_results = 0;

                    __status_message = "Viewing " + __search_results + " search results...";

                }

                else
                    return false;

                config.bee.settings.data.window.labels.status_bar(__status_message);

                return true;

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

        };

        this.status_bar = new status_bar();
        this.events = new events();
        this.ajax = new ajax();
        this.draw = new draw();

    }

    function config_model()
    {

        this.id = null;
        this.content_id = null;
        this.bee = null;
        this.auth_window = null;
        this.auth_window_timer = null;

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

        config.bee = dev_box.get('bee');  
        config.id = 'twitter_app';
        config.content_id = 'twitter_main_response_data';
        infinity = dev_box.get('infinity');
        infinity.init(cosmos);
        infinity.setup(config.id + '_data');
        fx = dev_box.get('fx');
        fx.init(cosmos);
        scrollbar = dev_box.get('scrollbar');
        scrollbar.init(cosmos);

        vulcan.graphics.apply_theme('/framework/extensions/js/i_twitter/themes', 'i_twitter');
        
        config.bee.init(cosmos, config.id, 2);
        config.bee.settings.data.window.labels.title('Twitter');
        config.bee.settings.data.window.labels.status_bar('Sign in to view your tweets');
        config.bee.gui.position.left(740);
        config.bee.gui.position.top(10);
        config.bee.gui.size.width(350);
        config.bee.gui.size.height(510);
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

        // Casement Setup
        config.bee.settings.data.casement.content('This is an extra GUI that extends and enhances the users eperience!');
        config.bee.settings.data.casement.labels.title('Twitter Update');
        config.bee.settings.data.casement.labels.status('Helping (secondary) status bar messages...');

        console.log(config.bee);

        is_init = true;

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

        colony = matrix.get('colony');
        swarm = matrix.get('swarm');;
        pythia = matrix.get('pythia');

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
        config = new config_model(),
        utils = new utilities();

}
