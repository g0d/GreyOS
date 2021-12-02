/*
 
    GreyOS Inc. - Integrated YouTube application
 
    File name: i_youtube.js (Version: 2.0)
    Description: This file contains the YouTube application.
 
    Coded by Slavenko Bozic (slawe)
 
    GreyOS Inc.
    Copyright © 2014
 
*/

// Integrated Youtube
function i_youtube()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.gui_init = function()
        {

            infinity.setup(config.id + '_data');
            infinity.begin();
            me.status_bar(0);

            ajax.data(i_youtube_bee.gui.config.window.content.data.id(), 'action=load_main', function()
            {

                if (vulcan.objects.by_id('yt_login_div') !== null)
                {

                    events.attach(1);
                    me.status_bar(2);
                    infinity.end();

                }

                else
                {
                    
                    ajax.data('yt_search_results', 'action=top_rated', function()
                    {

                        bee.player.open();
                        events.attach(5);
                        video.favorites.add();
                        me.status_bar(16);
                        scroll_bar_fix('yt_search_results');

                    });

                    html.bottom_menu();
                    me.status_bar(3);
                    events.attach(8);
                    events.attach(9);
                    fx.visibility.hide('yt_load_more_button', 1);
                    infinity.end();

                }

            });

            return true;

        };

        this.video_init = function()
        {

            html.video_player();
            html.player_menu();
            bee.player.iframe();

            return true;

        };

        this.record_init = function()
        {

            html.record_content();
            bee.recorder.iframe();

            return true;

        };

        this.enter_value = function(event, id)
        {

            if (vulcan.validation.misc.is_undefined(event))
                return false;

            var keycode = i_youtube_bee.gui.keys.get(event);

            if (keycode === 13)
                vulcan.objects.by_id(id).click();

            return true;

        };

        this.url_parse = function(url)
        {

            if (vulcan.validation.misc.is_undefined(url))
                return false;

            var __reg_exp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
                __match = url.match(__reg_exp);

            if (__match && __match[7].length === 11)
                return __match[7];

            return false;

        };
        
        this.check_auth_closed = function()
        {

            if (config.auth_window && config.auth_window.closed)
            {

                window.clearInterval(config.auth_window_timer);

                me.gui_init();

            }

            else
                config.auth_window_timer = setTimeout(me.check_auth_closed, 500);

        };
        
        this.status_bar = function(action, counter)
        {
            
            if (!vulcan.validation.numerics.is_number(action))
                return false;

            var __status_message = null;

            if (action === 0)
                __status_message = 'Loading...';

            else if (action === 1)
                __status_message = 'Try again!';

            else if (action === 2)
                __status_message = 'Sign in to watch your favorite videos';

            else if (action === 3)
                __status_message = 'Search videos on YouTube';

            else if (action === 4)
                __status_message = 'Show more videos on YouTube';

            else if (action === 5)
            {

                if (vulcan.validation.misc.is_undefined(counter))
                    return false;

                var __number = counter;

                if (__number === 1 || __number === 0)
                    __status_message = 'You have uploaded ' + __number + '  video';

                else
                    __status_message = 'You have uploaded ' + __number + '  videos';

            }

            else if (action === 6)
                __status_message = 'Processing video upload...';

            else if (action === 7)
            {

                if (vulcan.validation.misc.is_undefined(counter))
                    return false;

                var __number = counter;

                if (__number === 1  || __number === 0)
                    __status_message = 'Your ' + __number + ' favorite video';

                else
                    __status_message = 'Your ' + __number + ' favorite videos';

            }
            
            else if (action === 8)
                __status_message = 'Playlists';
            
            else if (action === 9)
            {

                if (vulcan.validation.misc.is_undefined(counter))
                    return false;

                var __number = counter;

                if (__number === 1  || __number === 0)
                    __status_message = __number + ' video in watch history';

                else
                    __status_message = __number + ' videos in watch history';

            }

            else if (action === 10)
                __status_message = 'User channel';

            else if (action === 11)
                __status_message = 'My channel';

            else if (action === 12)
                __status_message = 'Subscriptions';

            else if (action === 13)
            {

                if (vulcan.validation.misc.is_undefined(counter))
                    return false;

                var __number = counter;

                if (__number === 1  || __number === 0)
                    __status_message = __number + ' video in watch later';

                else
                    __status_message = __number + ' videos in watch later';

            }

            else if (action === 14)
                __status_message = 'Suggestions';

            else if (action === 15)
                __status_message = 'Settings';
            
            else if (action === 16)
                __status_message = 'Top Rated Videos';

            else
                return false;

            i_youtube_bee.settings.data.window.labels.status_bar(__status_message);

            return true;
            
        };

    }

    function draw_html()
    {

        this.draw_tag = function(id, content)
        {

            if (vulcan.objects.by_id(id) === null)
                return false;

            vulcan.objects.by_id(id).innerHTML = content;

            return true;

        };

        this.video_player = function()
        {

            var __player_div = '<div id="yt_player_overlay_' +config.video_tag + '" class="yt_overlay"></div>' +
                    '<div id="yt_player_' + config.video_tag + '"></div>' +
                    '<div id="yt_player_data_description">' +
                    '<a href="#" class="yt_player_close_button" data-id="' + config.video_tag + '"' +
                    'data-action="yt_player_data_description"><img src="/framework/' +
                    'extensions/js/i_youtube/themes/pix/close_1.png"></a>' +
                    '<div id="yt_video_description"></div>' +
                    '<div id="yt_video_view_count"></div>' +
                    '<div id="yt_video_uploader"></div>' +
                    '<div id="yt_video_published"></div>' +
                    '</div>' +
                    '<div id="yt_comments_container">' +
                    '<a href="#" class="yt_player_close_button" data-id="' + config.video_tag +
                    '" data-action="yt_comments_container"><img src=' +
                    '"/framework/extensions/js/i_youtube/themes/pix/close_1.png"></a>' +
                    '<div id="yt_player_data_comments">' +
                    '<textarea class="yt_text_comment" name="comment" placeholder="Put your comment here"></textarea>' +
                    '<a href="#" class="yt_post_comment">Post</a>' +
                    '<div id="yt_video_comments_' + config.video_id + '"></div>' +
                    '<a href="#" class="yt_show_more_comments" data-id="' + config.video_tag +  '">Show More</a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="yt_player_content_background">' +
                    '<a href="#" class="yt_player_close_button" data-id="' + config.video_tag +
                    '" data-action="yt_player_content_background"><img src=' +
                    '"/framework/extensions/js/i_youtube/themes/pix/close_1.png"></a>' +
                    '</div>' +
                    '<div class="yt_video_player_content_details">' +
                    '<div class="yt_player_content" data-link="share">' +
                    '<ul class="yt_a_share_buttons">' +
                    '<li><a href="https://www.facebook.com/sharer/sharer.php?u=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_facebook"></a></li>' +
                    '<li><a href="https://twitter.com/intent/tweet?url=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_twitter"></a></li>' +
                    '<li><a href="https://plus.google.com/u/0/share?url=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank" ' +
                    'class="yt_share_socail_media" id="yt_share_gplus"></a></li>' +
                    '<li><a href="http://blogger.com/blog-this.g?t=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_blogger"></a></li>' +
                    '<li><a href="http://www.linkedin.com/shareArticle?url=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_linkedin"></a></li>' +
                    '<li><a href="http://www.reddit.com/submit?url=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_reddit"></a></li>' +
                    '<li><a href="http://www.tumblr.com/share?v=3&u=' +
                    'http%3A//www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_tumblr"></a></li>' +
                    '<li><a href="https://www.stumbleupon.com/submit?url=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_stumbleupon"></a></li>' +
                    '<li><a href="http://www.pinterest.com/pin/create/button/?url=' +
                    'http://www.youtube.com/watch?v=' + config.video_id + '" target="_blank"' +
                    'class="yt_share_socail_media" id="yt_share_pinterest"></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="yt_player_content yt_player_embed" data-link="embed">' +
                    '<textarea class="yt_player_embed_text_content" onclick="this.focus(); this.select()" readonly>' +
                    '<iframe width="420" height="315" src="//www.youtube.com/embed/' + 
                    config.video_id + '" frameborder="0" allowfullscreen></iframe>' +
                    '</textarea>' +
                    '</div>' +
                    '</div>' +
                    '<div id="yt_share_on_email_container">' +
                    '<a href="#" class="yt_player_close_button" data-id="' + config.video_tag +
                    '" data-action="yt_share_on_email_container"><img src=' +
                    '"/framework/extensions/js/i_youtube/themes/pix/close_1.png"></a>' +
                    '<div id="yt_email_form"></div>' +
                    '</div>';

            i_yt_play_bee.settings.data.window.content(__player_div);
            
            events.attach(4);
            
//            var node = utils.objects.by_id(config.video_tag + '_data');
//
//            var kids = node.childNodes;
//
//            console.log(kids);


            return true;

        };

        this.record_content = function()
        {

            var __record_div = '<div id="yt_record_overlay_' + config.rec_tag + '" class="yt_overlay"></div>' +
                    '<div id="yt_record_' + config.rec_tag + '"></div>' +
                    '<div class="yt_content_info_rec_v">' +
                    '<input type="text" class="yt_info_rec_v_title" placeholder="Video title...">' +
                    '<br><textarea name="message" class="yt_info_rec_v_description" rows="2"' +
                    'placeholder="Video description..."></textarea>' +
                    '<div id="yt_privacy_set_button">' +
                    '<input type="radio" name="yt_info_rec_v_privacy_' + config.rec_tag + '"' +
                    'value="public" checked="checked">Public</input>' +
                    '<input type="radio" name="yt_info_rec_v_privacy_' + config.rec_tag + '"' +
                    'value="unlisted">Unlisted</input>' +
                    '<input type="radio" name="yt_info_rec_v_privacy_' + config.rec_tag + '"' +
                    'value="private">Private</input>' +
                    '<input type="button" name="yt_rec_v_save_button" class="yt_rec_v_save_button" value="Add info" disabled="disabled">' +
                    '</div>' +
                    '</div>'+
                    '<div class="yt_rec_front_glass glass_' + config.rec_tag + '"></div>';

            i_yt_rec_bee.settings.data.window.content(__record_div);

            events.attach(3);

            return true;

        };

        this.bottom_menu = function()
        {

            var __status_bar_box = vulcan.objects.by_id(config.id + '_status_bar');

            __status_bar_box.innerHTML += '<div id="yt_status_bar_menu_icon">' +
                    '<img id="yt_status_bar_bullets"' +
                    'src="/framework/extensions/js/i_youtube/themes/pix/bullets.png">' +
                    '</div>' +
                    '<nav id="yt_nav_main_bottom_navigation">' +
                    '<ul id="yt_main_bottom_navigation">' +
                    '<li><a id="yt_user_profile" title="Me" href="#">' +
                    '<img src="/framework/extensions/js/i_youtube/themes/pix/me.png">' +
                    '</a></li>' +
                    '<li><a id="yt_record_video_button" title="Record a video" href="#">' +
                    '<img src="/framework/extensions/js/i_youtube/themes/pix/yt_record_video.png">' +
                    '</a></li>' +
                    '<li><a id="yt_uploads" title="Uploads" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/uploads.png">' +
                    '</a></li>' +
                    '<li><a id="yt_favorites" title="Favorites" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/favorites.png">' +
                    '</a></li>' +
                    '<li><a id="yt_playlists" title="Playlists" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/playlist.png">' +
                    '</a></li>' +
                    '<li><a id="yt_subscriptions" title="Subscriptions" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/subscriptions.png">' +
                    '</a></li>' +
                    '<li><a id="yt_suggestions" title="Suggestions" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/suggestions.png">' +
                    '</a></li>' +
                    '<li><a id="yt_later" title="Watch later" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/later.png">' +
                    '</a></li>' +
                    '<li><a id="yt_history" title="Watch history" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/history.png">' +
                    '</a></li>' +
                    '<li><a id="yt_messages" title="Messages" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/messages.png">' +
                    '</a></li>' +
                    '<li><a id="yt_settings" title="Settings" href="#">' + 
                    '<img src="framework/extensions/js/i_youtube/themes/pix/settings.png">' +
                    '</a></li>' +
                    '<li class="logout"><a id="i_yt_logout" title="Logout" href="#">' +
                    '<img src="/framework/extensions/js/i_youtube/themes/pix/logout.png">' +
                    '</a></li>' +
                    '<li id="yt_menu_separator_li"><div id="yt_menu_separator_div">' +
                    '</div></li>' +
                    '</ul>' +
                    '</nav>';
            
            events.attach(2);

            return true;

        };
        
        this.upload_box = function()
        {
            
            var __div = '<div id="youtube_uploads_container">' +
                        '   <div id="yt_upload_file_container">' +
                        '       <input type="text" id="yt_up_title" name="title" placeholder="Title...">' +
                        '       <textarea id="yt_up_description" name="description"  rows="3"' + 
                        '           placeholder="Video description..."></textarea>' +
                        '       <textarea id="yt_up_tag" name="tag"  rows="1"' +
                        '           placeholder="Tags (e.g., flying pig, mashup)"></textarea>' +
                        '       <div id="yt_selector">' +
                        '           <select id="yt_up_category" name="category">' +
                        '               <option value="0" >Autos & Vehicles</option>' +
                        '               <option value="1">Comedy</option>' +
                        '               <option value="2">Education</option>' +
                        '               <option value="3">Entertainment</option>' +
                        '               <option value="4">Film & Animation</option>' +
                        '               <option value="5">Gaming</option>' +
                        '               <option value="6">Howto & Style</option>' +
                        '               <option value="7">Music</option>' +
                        '               <option value="8">News & Politics</option>' +
                        '               <option value="9">Nonprofits & Activism</option>' +
                        '               <option value="11" selected>People & Blogs</option>' +
                        '               <option value="7">Pets & Animals</option>' +
                        '               <option value="8">Science & Technology</option>' +
                        '               <option value="9">Sports</option>' +
                        '               <option value="10">Travel & Events</option>' +
                        '           </select>' +
                        '       </div>' +
                        '       <div id="yt_choose_file">' +
                        '           <div id="__yt">Choose Video</div>' +
                        '           <input type="file" name="file_to_upload" id="file_to_upload" accept="video/*">' +
                        '           <input type="text" value="" id="yt_up_file" name="yt_up_file">'+
                        '       </div>' +
                        '       <input type="button" name="upload_video" id="upload_video" value="Upload" disabled="disabled">' +
                        '       <div id="yt_file_info">' +
                        '           <div id="yt_file_name"></div>' +
                        '           <div id="yt_file_size"></div>' +
                        '           <div id="yt_file_type"></div>' +
                        '       </div>' +
                        '       <div id="yt_uploaded_new_video"></div>' +
                        '   </div>' +
                        '   <div id="yt_split_containers">' +
                        '       <a href="#" id="yt_show_upload_container">Upload box</a>' +
                        '       <div id="yt_list_title">Uploads</div>' +
                        '   </div>' +
                        '   <div id="yt_upload_list_container">' +
                        '        <div id="yt_user_upload_list"></div>' +
                        '   </div>' +
                        '</div>';
                        
            vulcan.objects.by_id('yt_search_results').innerHTML = __div;
            
      };

        this.player_menu = function()
        {

            var __status_bar_box = vulcan.objects.by_id(config.video_tag + '_msg');

            __status_bar_box.innerHTML += '<div class="yt_player_all_buttons">' +
                    '<li><a href="#" class="yt_player_buttons" data-link="description"' +
                    'data-id="' + config.video_tag + '">About</a></li>' +
                    '<li><a href="#" class="yt_player_buttons" data-link="comments"' +
                    'data-id="' + config.video_tag + '">Comments</a></li>' +
                    '<li><a href="#" class="yt_player_buttons" data-link="share"' +
                    'data-id="' + config.video_tag + '">Share</a></li>' +
                    '<li><a href="#" class="yt_player_buttons" data-link="embed"' +
                    'data-id="' + config.video_tag + '">Embed</a></li>' +
                    '<li><a href="#" class="yt_player_buttons" data-link="email"' +
                    'data-id="' + config.video_tag + '">Email</a></li>' +
                    '</div>';
            
            events.attach(6);

            return true;

        };

    }

    function ajax_request()
    {

        this.data = function(element_id, args, callback)
        {

             if (element_id === undefined)
                return false;

            var __url = null,
                __data = null,
                __result = null,
                __ajax = new bull();

            __url = config.url;
            __data = (args === undefined) ? ' ' : args;

            __result = __ajax.data(__url, __data, element_id, 1, 1, false, callback);

            return __result;

        };

        this.search = function(element_id, search_value, callback)
        {

            if (vulcan.validation.misc.is_undefined(element_id) || 
               vulcan.validation.misc.is_undefined(search_value))
                return null;

            var __url,
                __data,
                __result,
                __ajax = new bull();

            __url = config.url;
            __data = 'search_value=' + vulcan.objects.by_id(search_value).value +
                          '&per_page=' + vulcan.objects.by_id('yt_per_page').value +
                          '&start_index=' + vulcan.objects.by_id('yt_start_index').value;

            __result = __ajax.data(__url, __data, element_id, 1, 1, false, callback);

            return __result;

        };
        
        this.upload = function(element_id, callback)
        {

            if (vulcan.validation.misc.is_undefined(element_id))
                return null;

            var __url,
                __data,
                __result,
                __ajax = new bull(),
                __title = vulcan.objects.by_id('yt_up_title').value,
                __description = vulcan.objects.by_id('yt_up_description').value,
                __tag = vulcan.objects.by_id('yt_up_tag').value,
                __category = vulcan.objects.by_id('yt_up_category'),
                __options = __category.getElementsByTagName('option'),
                __file = vulcan.objects.by_id('yt_up_file').value;
                
            for(var i = 0; i < __options.length; i++)
            {
        
                if (__options[i].selected)
                    break;
            
            }

            __url = config.url;
            __data = 'title=' + __title +'&description=' + __description + '&tag=' + __tag +
                          '&category=' + __options[i].innerHTML + '&file=' + __file;

            __result = __ajax.data(__url, __data, element_id, 1, 1, false, callback);

            return __result;

        };
        
        this.comments = function(element_id, callback)
        {
            
            if (vulcan.validation.misc.is_undefined(element_id))
                return null;
            
            var __url,
                __data,
                __result,
                __ajax = new bull(),
                __comment = vulcan.objects.selectors.first('.yt_text_comment').value;

            __url = config.url;
            __data = 'comment=' + __comment + '&video_id=' + config.video_id;

            __result = __ajax.data(__url, __data, element_id, 1, 1, false, callback);

            return __result;
            
        };

        this.send_email = function()
        {

            var __recipients = vulcan.objects.selectors.first('.yt_email_input').value,
                __message = vulcan.objects.selectors.first('.yt_email_textarea').value,
                __xhr = window.XMLHttpRequest ? 
                    new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

            __xhr.onreadystatechange = function()
            {

                if (__xhr.readyState === 4 && __xhr.status === 200)
                    alert(__xhr.responseText);

            };

            __xhr.open('POST', config.url, true);
            __xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            __xhr.send('recipients=' + __recipients + '&message=' + __message);

            return true;

        };

    }
    
    function video_channels()
    {

        this.my_profile = function()
        {

            var __user_profile = vulcan.objects.by_id('yt_user_profile');

            __handler = function(event_object)
            {

                event_object.preventDefault();

                fx.visibility.toggle('yt_main_bottom_navigation', 1);
                fx.visibility.hide('yt_load_more_button', 1);

                utils.status_bar(0);

                infinity.setup('yt_search_results');
                infinity.begin();

                ajax.data('yt_search_results', 'action=user_profile', function()
                {

                    scroll_bar_fix('yt_search_results');

                    utils.status_bar(11);

                    infinity.end();

                });

            };

            vulcan.events.attach(i_youtube_bee, __user_profile, 'click', __handler);

            return true;

        };
        
        this.user_profile = function()
        {
            
            // code here
            
            return true;
            
        };
        
        function subscribes()
        {

            var me = this;
            
            this.subscriptions = function()
            {

                var __subscriptions = vulcan.objects.by_id('yt_subscriptions');

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);
                    fx.visibility.hide('yt_load_more_button', 1);

                    utils.status_bar(0);

                    infinity.setup('yt_search_results');
                    infinity.begin();

                    ajax.data('yt_search_results', 'action=subscriptions', function()
                    {

                        me.remove();

                        scroll_bar_fix('yt_search_results');

                        utils.status_bar(12);

                        infinity.end();

                    });

                };

                vulcan.events.attach(i_youtube_bee, __subscriptions, 'click', __handler);

                return true;

            };
            
            this.add = function()
            {

                var __subscribe = vulcan.objects.by_class('yt_subscribe_button');

                __handler = function(event_object)
                {

                    event_object.preventDefault();
                    
                    var __object = this;

                    config.channel_id = __object.getAttribute('rel');

                    ajax.data('yt_per_page', 'action=subscriptions_add_channel&channel_id=' + config.channel_id, function()
                    {

                        notification_push('#yt_search', 'You added new channel in subscriptions.');

                    });
                    
                    //__subscribe.innerHTML = 'Subscribed';
                    
                    var __subscribe_id = vulcan.objects.by_id('yt_channel_' + config.channel_id);

                    setTimeout(function()
                    {

                        __subscribe_id.style.display = 'none';

                    }, 1000);

                };

                for (var i = 0; i < __subscribe.length; i++)
                    vulcan.events.attach(i_youtube_bee, __subscribe[i], 'click', __handler);

                return true;

            };
            
            this.remove = function()
            {

                var __unsubscribe = vulcan.objects.by_class('yt_unsubscribe_button');

                __handler = function(event_object)
                {

                    event_object.preventDefault();
                    
                    var __object = this;

                    config.channel_id = __object.getAttribute('rel');

                    ajax.data('yt_per_page', 'action=subscriptions_remove&channel_id=' + config.channel_id, function()
                    {

                        notification_push('#yt_search', 'You have removed channel from subscriptions.');

                    });
                    
                    var __unsubscribe_id = vulcan.objects.by_id('yt_channel_' + config.channel_id);

                    setTimeout(function()
                    {

                        __unsubscribe_id.style.display = 'none';

                    }, 1000);

                };

                for (var i = 0; i < __unsubscribe.length; i++)
                    vulcan.events.attach(i_youtube_bee, __unsubscribe[i], 'click', __handler);

                return true;

            };

            this.suggestions = function()
            {

                var __suggestions = vulcan.objects.by_id('yt_suggestions');

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);
                    fx.visibility.hide('yt_load_more_button', 1);

                    utils.status_bar(0);

                    infinity.setup('yt_search_results');
                    infinity.begin();

                    ajax.data('yt_search_results', 'action=suggestions', function()
                    {

                        me.add();

                        scroll_bar_fix('yt_search_results');

                        utils.status_bar(14);

                        infinity.end();

                    });

                };

                vulcan.events.attach(i_youtube_bee, __suggestions, 'click', __handler);

                return true;

            };
            
        }
        
        this.settings = function()
        {

            var __settings = vulcan.objects.by_id('yt_settings');

            __handler = function()
            {

                notification_push('#yt_search', 'Currently not available');

                utils.status_bar(15);

            };

            vulcan.events.attach(i_youtube_bee, __settings, 'click', __handler);

            return true;

        };
        
        this.subscribes = new subscribes();

    }

    function video_manager()
    {
        
        var __handler = null;
        
        function activities()
        {

            this.watch_history = function()
            {
                
                var __history = vulcan.objects.by_id('yt_history');
                
                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    utils.status_bar(0);

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);
                    fx.visibility.hide('yt_load_more_button', 1);

                    infinity.setup('yt_search_results');
                    infinity.begin();

                    ajax.data('yt_search_results' , 'action=watch_history', function()
                    {
                        
                        bee.player.open();
                        events.attach(5);
                        
                        var __delete = vulcan.objects.by_class('yt_delete_button'),
                            __number = vulcan.objects.by_id('yt_videos_counter').value;
                            
                        if (__number === undefined)
                            return false;

                        utils.status_bar(9, __number);

                        __handler = function()
                        {

                            notification_push('#yt_search', 'Currently not available');

                        };

                        for (var i = 0; i < __delete.length; i++)
                            vulcan.events.attach(i_youtube_bee, __delete[i], 'click', __handler);

                        scroll_bar_fix('yt_search_results');
                        
                        infinity.end();
                        
                    });

                };

                vulcan.events.attach(i_youtube_bee, __history, 'click', __handler);
                
                return true;

            };

            this.watch_later = function()
            {
                
                var __later = vulcan.objects.by_id('yt_later');
                
                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    utils.status_bar(0);

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);
                    fx.visibility.hide('yt_load_more_button', 1);

                    infinity.setup('yt_search_results');
                    infinity.begin();

                    ajax.data('yt_search_results' , 'action=watch_later', function()
                    {
                        
                        bee.player.open();
                        events.attach(5);
                        
                        var __delete = vulcan.objects.by_class('yt_delete_button'),
                            __number = vulcan.objects.by_id('yt_videos_counter').value;
                            
                        if (__number === undefined)
                            return false;

                        utils.status_bar(13, __number);

                        __handler = function()
                        {

                            notification_push('#yt_search', 'Currently not available');

                        };

                        for (var i = 0; i < __delete.length; i++)
                            vulcan.events.attach(i_youtube_bee, __delete[i], 'click', __handler);

                        scroll_bar_fix('yt_search_results');
                        
                        infinity.end();
                        
                    });

                };

                vulcan.events.attach(i_youtube_bee, __later, 'click', __handler);
                
                return true;

            };
            
        }
        
        function playlists()
        {
            
            var me = this;
            
            this.get_list = function()
            {
                
                var __playlists = vulcan.objects.by_id('yt_playlists');
                
                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);
                    fx.visibility.hide('yt_load_more_button', 1);

                    utils.status_bar(0);

                    infinity.setup('yt_search_results');
                    infinity.begin();

                    ajax.data('yt_search_results', 'action=playlists', function()
                    {

                        scroll_bar_fix('yt_search_results');

                        utils.status_bar(8);

                        infinity.end();

                    });

                };

                vulcan.events.attach(i_youtube_bee, __playlists, 'click', __handler);
                
                return true;
                
            };
            
            this.create = function()
            {
                
                // code here
                
                return true;
                
            };
            
            this.add = function()
            {
                
                // code here
                
                return true;
                
            };
            
            this.delete = function()
            {
                
                // code here
                
                return true;
                
            };
            
        }
        
        function favorites()
        {
            
            this.list = function()
            {
                
                var __favorites = vulcan.objects.by_id('yt_favorites');
                
                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    utils.status_bar(0);

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);
                    fx.visibility.hide('yt_load_more_button', 1);

                    infinity.setup('yt_search_results');
                    infinity.begin();

                    ajax.data('yt_search_results', 'action=get_favorites', function()
                    {

                        bee.player.open();
                        events.attach(5);

                        var __delete = vulcan.objects.by_class('yt_delete_button'),
                            __number = vulcan.objects.by_id('yt_videos_counter').value;
                            
                        if (__number === undefined)
                            return false;

                        utils.status_bar(7, __number);

                        __handler = function()
                        {

                            notification_push('#yt_search', 'Currently not available');

                        };

                        for (var i = 0; i < __delete.length; i++)
                            vulcan.events.attach(i_youtube_bee, __delete[i], 'click', __handler);

                        scroll_bar_fix('yt_search_results');

                        infinity.end();

                    });

                };

                vulcan.events.attach(i_youtube_bee, __favorites, 'click', __handler);
                
                return true;
                
            };
            
            this.add = function()
            {
                
                var __favorite = vulcan.objects.by_class('yt_favorite_button');
                
                __handler = function(event_object)
                {

                    event_object.preventDefault();
                    var object = this;

                    config.video_id = object.getAttribute('rel');

                    ajax.data('yt_per_page', 'action=add_favorite&video_id=' + config.video_id, function()
                    {

                        notification_push('#yt_search', 'You added new video in favorites.');

                    });

                };
                
                for (var i = 0; i < __favorite.length; i++)
                    vulcan.events.attach(i_youtube_bee, __favorite[i], 'click', __handler);

                return true;
                
            };
            
            this.remove = function()
            {
                
                //code here
                
                return true;
                
            };
            
        }
        
        function uploads()
        {
            
            var me = this;
        
            this.validation = function()
            {

                __handler = function()
                {

                    var __input = true;

                    if (vulcan.objects.by_id('yt_up_title').value === '')
                        __input = false;
                    
                    if (vulcan.objects.by_id('yt_up_description').value === '')
                        __input = false;
                    
                    if (vulcan.objects.by_id('yt_up_tag').value === '')
                        __input = false;

                    if (__input)
                        vulcan.objects.by_id('upload_video').disabled = false;
                    
                    else
                        vulcan.objects.by_id('upload_video').disabled = true;
                
                };
                
                vulcan.events.attach(i_youtube_bee, document, 'keyup', __handler);
                
            };
        
            this.selected = function()
            {
                
                var __a = vulcan.objects.by_id('file_to_upload');

                __a.onchange = function()
                {

                    var __file = vulcan.objects.by_id('file_to_upload').files[0];

                    if (__file)
                    {

                        var __file_size = 0;

                        if (__file.size > 1024 * 1024)
                            __file_size = (Math.round(__file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';

                        else
                            __file_size = (Math.round(__file.size * 100 / 1024) / 100).toString() + 'KB';

                        vulcan.objects.by_id('yt_file_name').innerHTML = 'Name: ' + __file.name;
                        vulcan.objects.by_id('yt_file_size').innerHTML = 'Size: ' + __file_size;
                        vulcan.objects.by_id('yt_file_type').innerHTML = 'Type: ' + __file.type;
                        vulcan.objects.by_id('yt_up_file').value = __file.name;

                    }
                    
                    var __ext = this.value.match(/\.(.+)$/)[1];
                    
                    switch(__ext)
                    {
                        
                        case 'MOV': case 'MPEG4': case 'MP4': case 'AVI': case 'WMV': case 'MPEGPS': 
                        case 'FLV': case '3GPP': case 'WebM':case 'mov': case 'mpeg4': case 'mp4': 
                        case 'avi': case 'wmv': case 'mpegps': case 'flv': case '3gpp': case 'webm':
                        break;
                            
                        default:
                            notification_push('#yt_search', 'File type not allowed!');
                            vulcan.objects.by_id('yt_file_name').innerHTML = 'Name:';
                            vulcan.objects.by_id('yt_file_size').innerHTML = 'Size:';
                            vulcan.objects.by_id('yt_file_type').innerHTML = 'Type:';
                    }

                };
                
                __handler = function()
                {
                    
                    var __file = vulcan.objects.by_id('file_to_upload');
                    
                    if (me.size(__file, 524288000) === false)
                    {

                        notification_push('#yt_search', 'Video file size should be less than 500MB!');
                        fx.visibility.hide('yt_file_info', 1);

                    }
                    
                    else
                        fx.visibility.show('yt_file_info', 1);
                    
                };
                
                vulcan.events.attach(i_youtube_bee, __a, 'change', __handler);
                
            };
            
            this.size = function (video, max_size)
            {
                
                var __size = null;
                
                if(navigator.appName === 'Check File Size')
                {
                    
                    if (video.value)
                    {
                        
                        var __s= new ActiveXObject("Scripting.FileSystemObject"),
                            __e=__s.getFile(video.value);
                    
                        __size=__e.size;
                  
                    }
               
                }
               
                else
                {
                  
                    if(video.files[0] !== undefined)
                        __size = video.files[0].size;
               
                }
               
                if(__size !== undefined && __size > max_size)
                {
                    
                    video.focus();
                  
                    return false;
               
                }
                
                else
                    return true;
            
            };
            
            this.file = function()
            {
                
                var __a = vulcan.objects.by_id('upload_video');
                
                __handler = function()
                {
                    
                    var __fd = new FormData();

                    __fd.append('file_to_upload', vulcan.objects.by_id('file_to_upload').files[0]);

                    var __xhr = new XMLHttpRequest();

                    vulcan.events.attach(i_youtube_bee, __xhr, 'load', me.complete);
                    
                    __xhr.open('POST', config.url);
                    
                    __xhr.send(__fd);
                    
                };
                
                vulcan.events.attach(i_youtube_bee, __a, 'click', __handler);
                
                fx.visibility.toggle('yt_main_bottom_navigation', 1);
                fx.visibility.hide('yt_load_more_button', 1);
                
                return true;

            };
        
            this.complete = function(event_object)
            {
            
                vulcan.objects.by_id('yt_up_file').value = event_object.target.responseText;
                
                notification_push('#yt_search', 'Your video will be uploaded.');
                
                fx.visibility.hide('yt_file_info', 1);
                
                //utils.status_bar(6);
            
                ajax.upload('yt_uploaded_new_video', 'yt_up_file', function()
                {
                    
                    //console.log('works or not?!');
                    
                    bee.player.open();

                    var __number = vulcan.objects.by_id('yt_videos_counter').value;
                    
                    if (__number === undefined)
                        return false;

                    utils.status_bar(5, __number);
                    
                    return false;
                    
                });
                
                return true;
            
            };
            
            this.get_list = function()
            {
                
                var __uploads = vulcan.objects.by_id('yt_uploads');
                
                __handler = function()
                {

                    html.upload_box();

                    utils.status_bar(0);

                    fx.visibility.hide('yt_upload_file_container', 1);

                    var __show = vulcan.objects.by_id('yt_show_upload_container');

                    __handler = function(event_object)
                    {

                        event_object.preventDefault();

                        fx.visibility.toggle('yt_upload_file_container', 1);

                    };

                    vulcan.events.attach(i_youtube_bee, __show, 'click', __handler);

                    me.validation();
                    me.selected();
                    me.file();

                    //infinity.setup('yt_user_upload_list');
                    //infinity.begin();

                    ajax.data('yt_user_upload_list', 'action=upload_list', function()
                    {

                        bee.player.open();
                        events.attach(5);
                        me.delete();
                        
                        var __number = vulcan.objects.by_id('yt_videos_counter').value;

                        utils.status_bar(5, __number);

                        scroll_bar_fix('yt_user_upload_list');

                        //infinity.end();

                    });

                };

                vulcan.events.attach(i_youtube_bee, __uploads, 'click', __handler);
                
                return true;
                
            };
            
            this.delete = function()
            {
                
                var __delete = vulcan.objects.by_class('yt_delete_button');
                
                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    var __object = this;

                    config.video_id = __object.getAttribute('rel');

                    ajax.data('yt_per_page', 'action=upload_delete&video_id=' + config.video_id, function()
                    {

                        notification_push('#yt_search', 'You have deleted your video.');

                    });
                    
                    var __delete_id = vulcan.objects.by_id('yt_video_' + config.video_id);

                    setTimeout(function()
                    {

                        __delete_id.style.display = 'none';

                    }, 1000);

                };
                
                for (var i = 0; i < __delete.length; i++)
                    vulcan.events.attach(i_youtube_bee, __delete[i], 'click', __handler);

                return true;
                
            };
            
        }
        
        this.activities = new activities();
        this.playlists = new playlists();
        this.favorites = new favorites();
        this.uploads = new uploads();
        
    }
    
    function events_attach()
    {

        var __handler = null;

        this.attach = function(action)
        {

            if (!vulcan.validation.numerics.is_number(action))
                return false;

            if (action === 1)
            {
                
                var __access_token = vulcan.objects.by_id('yt_access_token');

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    var __login = this.getAttribute('data-url'),
                        __width = 480,
                        __height = 640,
                        __left = (screen.width / 2) - (__width / 2),
                        __top = (screen.height / 2) - (__height / 2);

                    config.auth_window = window.open(__login, 'YouTube_Login', 'location=0, status=0, width=' + __width + ',' +
                            'height=' + __height + ', top=' + __top + ', left=' + __left);

                    utils.check_auth_closed();

                };

                vulcan.events.attach(i_youtube_bee, __access_token, 'click', __handler);

                return true;

            }

            else if (action === 2)
            {
                
                var __status_box_toggle = vulcan.objects.by_id('yt_status_bar_bullets'),
                    __data = vulcan.objects.by_id(config.id + '_data'),
                    __logout = vulcan.objects.by_id('i_yt_logout'),
                    __open_rec_bee = vulcan.objects.by_id('yt_record_video_button');

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);

                };

                vulcan.events.attach(i_youtube_bee,  __status_box_toggle, 'click', __handler);
                
                __handler = function()
                {

                    if (fx.visibility.is_visible('twitter_main_bottom_navigation', 1))
                        fx.visibility.hide('twitter_main_bottom_navigation', 1);

                };

                vulcan.events.attach(i_youtube_bee, __data, __handler);

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    fx.visibility.hide('yt_main_bottom_navigation', 1);

                    infinity.begin();

                    utils.status_bar(0);

                    ajax.data(i_youtube_bee.gui.config.window.content.data.id(), 'action=logout', function()
                    {

                        events.attach(1);

                        fx.visibility.hide('yt_status_bar_menu_icon', 1);

                        utils.status_bar(2);
                        

                    });

                };

                vulcan.events.attach(i_youtube_bee,  __logout, 'click', __handler);

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    bee.recorder.init();

                    fx.visibility.toggle('yt_main_bottom_navigation', 1);

                };

                vulcan.events.attach(i_youtube_bee, __open_rec_bee, 'click', __handler);

                channels.my_profile();
                channels.settings();
                channels.subscribes.subscriptions();
                channels.subscribes.suggestions();
                video.activities.watch_later();
                video.activities.watch_history();
                video.favorites.list();
                video.uploads.get_list();
                video.playlists.get_list();
                
                return true;

            }
            
            else if (action === 3)
            {
                
                bee.recorder.validate();
                
                var __a = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].lastChild.lastChild,
                    __title = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].firstChild,
                    __description = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].children[2],
                    __glass = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[3];

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    bee.recorder.add_info();

                    __a.disabled = true;
                    __a.value = 'Saved';
                    __title.disabled = true;
                    __description.disabled = true;
                    __glass.style.display = 'none';

                };

                vulcan.events.attach(i_yt_rec_bee,  __a, 'click', __handler);
                
                return true;
                
            }
            
            else if (action === 4)
            {
                
                var __b = vulcan.objects.by_class('yt_share_socail_media'),
                    __text = vulcan.objects.selectors.first('.yt_text_comment');
            
                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    var settings = 'width=600,height=420';

                    window.open(this.href,'pagename',settings);

                };

                vulcan.events.attach(i_yt_play_bee, __b, 'click', __handler);
                
                __handler = function(ev)
                {
                
                    this.style.height = '4px';
                    this.style.height = this.scrollHeight + 2 + 'px';
                
                };
                
                vulcan.events.attach(i_yt_play_bee, __text, 'keyup', __handler);

                return true;
                
            }
            
            else if (action === 5)
            {
                
                var __embed = vulcan.objects.by_class('yt_embed_button');
            
                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    var __content = this.parentNode.querySelectorAll('.yt_embed_content');

                    for (var i = 0; i < __content.length; i++)
                    {

                        if (__content[i].style.display === 'none' || __content[i].style.display === 'block')
                            __content[i].style.display = '';

                        else
                            __content[i].style.display = 'block';

                    }

                    [].forEach.call(vulcan.objects.selectors.all('.yt_text_embed'), function(el)
                    {

                        vulcan.events.attach(i_youtube_bee, el, 'click', function()
                        {

                            var __text = this.parentNode.parentNode.querySelectorAll('.yt_text_embed');

                            for (var i = 0; i < __text.length; i++)
                                __text[i].select();

                        });

                    });

                };

                for (var i = 0; i < __embed.length; i++)
                    vulcan.events.attach(i_youtube_bee, __embed[i], 'click', __handler);

                return true;

            }

            else if (action === 6)
            {

                var __c = vulcan.objects.by_class('yt_player_buttons'),
                    __all_buttons = vulcan.objects.selectors.first('.yt_player_all_buttons'),
                    __tag_el = __all_buttons.querySelectorAll('li a');

                __handler = function()
                {

                    var __random = this.getAttribute('data-id'),
                        __nav = vulcan.objects.selectors.first('.yt_player_all_buttons'),
                        __buttons = __nav.querySelectorAll('li a[data-id="' + __random + '"]');

                    for(var m = 0; m < __buttons.length; m = m + 1)
                        __buttons[m].style.color="#FFFFFF";

                    this.style.color = '#5C5C5C';

                };

                vulcan.events.attach(i_yt_play_bee, __tag_el, 'click', __handler);

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    var __random = this.getAttribute('data-id'),
                        __action = this.getAttribute('data-link');

                    vulcan.objects.by_id(__random + '_data').childNodes[2].style.display = 'none';
                    vulcan.objects.by_id(__random + '_data').childNodes[3].style.display = 'none';
                    vulcan.objects.by_id(__random + '_data').childNodes[4].style.display = 'block';
                    vulcan.objects.by_id(__random + '_data').childNodes[5].style.display = 'block';
                    vulcan.objects.by_id(__random + '_data').childNodes[6].style.display = 'none';

                    if (__action === 'description')
                    {

                        vulcan.objects.by_id(__random + '_data').childNodes[2].style.display = 'block';
                        vulcan.objects.by_id(__random + '_data').childNodes[3].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[4].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[0].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[1].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[6].style.display = 'none';

                        bee.player.description();

                    }

                    else if (__action === 'comments')
                    {

                        vulcan.objects.by_id(__random + '_data').childNodes[2].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[3].style.display = 'block';
                        vulcan.objects.by_id(__random + '_data').childNodes[4].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[0].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[1].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[6].style.display = 'none';

                        bee.player.comments();

                    }

                    else if (__action === 'share')
                    {

                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[0].style.display = 'block';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[1].style.display = 'none';
        
                    }

                    else if (__action === 'embed')
                    {

                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[0].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[1].style.display = 'block';

                    }

                    else if (__action === 'email')
                    {
                        
                        vulcan.objects.by_id(__random + '_data').childNodes[2].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[3].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[4].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[0].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[1].style.display = 'none';
                        vulcan.objects.by_id(__random + '_data').childNodes[6].style.display = 'block';
                        
                        
                        
                        ajax.data('yt_email_form', 'action=send_email', function()
                        {
                            
                            var __send = vulcan.objects.by_class('yt_send_email_button');
                            
                            __handler = function()
                            {
                                
                                //alert('ok');
                                
                                ajax.send_email('yt_email_form', 'message', function() { });
                                
                            };
                            
                            vulcan.events.attach(i_yt_play_bee, __send, 'click', __handler);
                            
                            var __textarea = vulcan.objects.selectors.first('.yt_email_textarea'),
                                __copy_textarea = vulcan.objects.selectors.first('.yt_email_copy_message'),
                                __char = vulcan.objects.selectors.first('.yt_message_char_left'),
                                __video_link = vulcan.objects.selectors.first('.yt_email_link_share'),
                                __remaining = 0;
                                
                            __video_link.innerHTML = 'http://www.youtube.com/watch?v=' + config.video_id;

                            __handler = function(e)
                            {

                                e.preventDefault();

                                __copy_textarea.innerHTML = this.value;
                                
                                __remaining = 200 - parseInt(__textarea.value.length);
                                
                                if (__remaining < 0)
                                {
                                
                                    __textarea.value = __textarea.value.substring(0, 200);
                                
                                    return false;
                               
                                }
                              
                                __char.innerHTML = __remaining + ' characters remaining';

                            };

                            __textarea.addEventListener('keyup', __handler);

                            scroll_bar_fix('yt_email_border_copy_div');
                            scroll_bar_fix('yt_email_form');
                            
                        });
                        
                    }

                };

                for (var n = 0; n < __c.length; n++)
                    vulcan.events.attach(i_yt_play_bee, __c[n], 'click', __handler);

                [].forEach.call(vulcan.objects.selectors.all('.yt_player_close_button'), function(el)
                {

                    vulcan.events.attach(i_yt_play_bee, el, 'click', function()
                    {

                        var __random = this.getAttribute('data-id'),
                            __action = this.getAttribute('data-action'),
                            __nav = vulcan.objects.selectors.first('.yt_player_all_buttons'),
                            __buttons = __nav.querySelectorAll('li a[data-id="' + __random + '"]');

                        for (var s = 0; s < __buttons.length; s = s + 1)
                            __buttons[s].style.color="#FFFFFF";

                        if (__action === 'yt_player_data_description')
                            vulcan.objects.by_id(__random + '_data').childNodes[2].style.display = 'none';

                        else if (__action === 'yt_comments_container')
                            vulcan.objects.by_id(__random + '_data').childNodes[3].style.display = 'none';

                        else if (__action === 'yt_player_content_background')
                        {

                            vulcan.objects.by_id(__random + '_data').childNodes[4].style.display = 'none';
                            vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[0].style.display = 'none';
                            vulcan.objects.by_id(__random + '_data').childNodes[5].childNodes[1].style.display = 'none';

                        }

                        else if (__action === 'yt_share_on_email_container')
                            vulcan.objects.by_id(__random + '_data').childNodes[6].style.display = 'none';

                    });

                });

                return true;

            }

            else if (action === 7)
            {

                var __d = vulcan.objects.by_id(config.video_tag + '_data').childNodes[3].children[1].lastChild,
                    __e = vulcan.objects.by_id(config.video_tag + '_data').childNodes[3].children[1].children[1],
                    __textarea = vulcan.objects.selectors.first('.yt_text_comment');

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    var __lists = vulcan.objects.selectors.all('yt_video_comments');

                    bee.player.more_comments(__lists.length, 11, event_object);

                    setTimeout(function()
                    {

                        scroll_bar_update(config.video_tag + '_data #yt_player_data_comments');

                    }, 400);

                };

                vulcan.events.attach(i_yt_play_bee, __d, 'click', __handler);
                
                __handler = function(event_object)
                {
                    
                    event_object.preventDefault();
                    
                    ajax.comments('youtube_comment', 'comment', function() { });
                    
                    __textarea.value = '';
                    
                };
                
                vulcan.events.attach(i_yt_play_bee, __e, 'click', __handler);

                return true;

            }
            
            else if (action === 8)
            {

                var __input_value = vulcan.objects.by_id('yt_search_value');

                __handler = function(event_object)
                {

                    utils.enter_value(event_object, this.getAttribute('data-search'));

                    return true;

                };

                vulcan.events.attach(i_youtube_bee, __input_value, 'keydown', __handler);

                return true;

            }
            
            else if (action === 9)
            {
                
                var __yt_search_button = vulcan.objects.by_id('yt_search_button');

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    utils.status_bar(0);
                    
                    fx.visibility.hide('yt_main_bottom_navigation', 1);

                    if (vulcan.objects.by_id('yt_search_value').value.length > 100)
                    {

                        notification_push('#yt_search', 'Sorry, the maximum characters allowed are 100!');

                        utils.status_bar(3);

                        return true;

                    }

                    var __ajax = new bull(10, 3);

                    __ajax.response(config.url,
                            'action=search_to_thor' +
                            '&search_query_thor=' + vulcan.objects.by_id('yt_search_value').value, 1);

                    infinity.setup('yt_search_results');
                    infinity.begin();

                    if (vulcan.objects.by_id('yt_search_value').value.length < 101)
                    {

                        vulcan.objects.by_id('yt_start_index').value = 1;

                        ajax.search('yt_search_results', 'yt_search_value', function()
                        {

                            var __counter = vulcan.objects.by_id('yt_videos_counter').value,
                                __container = vulcan.objects.by_class('yt_search_results_container').length;

                            events.attach(5);
                            video.favorites.add();
                            events.attach(10);

                            if (__counter < 10)
                                fx.visibility.hide('yt_load_more_button', 1);

                            else if (__container > 0)
                                fx.visibility.show('yt_load_more_button', 1);

                            else
                            {

                                fx.visibility.hide('yt_load_more_button', 1);
                                utils.status_bar(1);

                                return false;

                            }

                            scroll_bar_fix('yt_search_results');

                            utils.status_bar(4);

                            bee.player.open();
                            
                            infinity.end();

                        });

                    }

                    else
                        return false;

                };

                vulcan.events.attach(i_youtube_bee, __yt_search_button, 'click', __handler);

                return true;

            }

            else if (action === 10)
            {

                var __load = vulcan.objects.by_id('yt_load_more'),
                    __static = vulcan.objects.by_id('yt_search_results');

                __handler = function(event_object)
                {

                    event_object.preventDefault();

                    var __old_content = __static.getElementsByClassName('yt_search_results_container')[0].innerHTML;

                    utils.status_bar(0);

                    var __index = vulcan.objects.by_id('yt_start_index');

                    __index.value = parseInt(__index.value, 10) + parseInt(config.max_results, 10);

                    infinity.begin();

                    ajax.search('yt_search_results', 'yt_search_value', function()
                    {

                        var __new_content = __static.getElementsByClassName('yt_search_results_container')[0].innerHTML,
                            __add = __static.getElementsByClassName('yt_search_results_container')[0];

                        __static.getElementsByClassName('yt_search_results_container')[0].innerHTML = '';


                        __add.innerHTML = __add.innerHTML + __old_content;

                        scroll_bar_fix('yt_search_results');
                        scroll_bar_scroll_to('yt_search_results', 'bottom');

                        __add.innerHTML = __add.innerHTML + __new_content;

                        setTimeout(function()
                        {

                            scroll_bar_update('yt_search_results');

                        }, 800);

                        utils.status_bar(4);

                        bee.player.open();
                        
                        events.attach(5);
                        
                        video.favorites.add();
                        
                        infinity.end();

                    });

                };

                vulcan.events.attach(i_youtube_bee, __load, 'click', __handler);

                return true;
                
            }

        };
            
    }

    function new_bees()
    {

        function player()
        {

            var me = this;

            this.init = function(__title, video_id)
            {

                if (vulcan.validation.misc.is_undefined(__title) || vulcan.validation.misc.is_undefined(video_id))
                    return false;

                i_yt_play_bee = dev_box.get('bee');
                fx = dev_box.get('fx');
                fx.init(cosmos);

                config.video_tag = 'i_youtube_player';

                var __elements = null;

                vulcan.graphics.apply_theme('/framework/extensions/js/i_youtube/themes', 'i_youtube');

                i_yt_play_bee.init(cosmos, config.video_tag, 1);
                i_yt_play_bee.settings.data.window.labels.title(__title);
                i_yt_play_bee.gui.position.left(430);
                i_yt_play_bee.gui.position.top(10);
                i_yt_play_bee.gui.size.width(440);
                i_yt_play_bee.gui.size.min.width(440);
                i_yt_play_bee.gui.size.height(320);
                i_yt_play_bee.gui.size.min.height(320);
                i_yt_play_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
                i_yt_play_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
                i_yt_play_bee.on('open', function() { i_yt_play_bee.gui.fx.fade.into(); });
                i_yt_play_bee.on('opened', function() { return utils.video_init(); });
                i_yt_play_bee.on('in_hive', function() { me.pause(); me.in_hive(); });
                i_yt_play_bee.on('drag', function() { vulcan.objects.by_id('yt_player_overlay_' + config.video_tag).style.display = 'block'; me.ghost_icon(); });
                i_yt_play_bee.on('dragging', function()
                                        {

                                            i_yt_play_bee.gui.fx.opacity.settings.set(0.7);
                                            i_yt_play_bee.gui.fx.opacity.apply();

                                        });

                i_yt_play_bee.on('dragged', function() 
                                        { 
                                            
                                            i_yt_play_bee.gui.fx.opacity.reset();
                                            vulcan.objects.by_id('yt_player_overlay_' + config.video_tag).style.display = 'none';
                                            
                                        });
                                        
                i_yt_play_bee.on('resize', function() { vulcan.objects.by_id('yt_player_overlay_' + config.video_tag).style.display = 'block'; });
                i_yt_play_bee.on('resized', function() { vulcan.objects.by_id('yt_player_overlay_' + config.video_tag).style.display = 'none'; });                        
                                        
                i_yt_play_bee.on('close', function() { i_yt_play_bee.gui.fx.fade.out(); });

                this.show(i_yt_play_bee);

                __elements = vulcan.objects.by_id(config.video_tag);
                __elements.classList.add('yt_video_element');

                return true;

            };

            this.show = function(bee)
            {

                swarm.bees.insert(bee);

                bee.show();

                return true;

            };
            
            this.in_hive = function()
            {

                var __hive = vulcan.objects.by_id('hive_bee_' + config.video_tag + '_icon');

                __hive.classList.add('yt_player_hive');

                return true;

            };
            
            this.ghost_icon = function()
            {
                
                var __hive = vulcan.objects.by_id('hive_ghost_bee');
                
                if (__hive.childNodes[0] === undefined)
                    return false;
                
                __hive.childNodes[0].classList.add('yt_player_hive');
                
            };
            
            this.play = function()
            {
                
                config.i_youtube_video.playVideo();
                
                return true;
                
            };
            
            this.pause = function()
            {
                
                config.i_youtube_video.pauseVideo();
                
                return true;
                
            };

            this.iframe = function()
            {

                if (is_init === false)
                    return false;

                var __frame = new YT.Player('yt_player_' + config.video_tag,
                {

                    height: '100%',
                    width: '100%',
                    videoId: config.video_id,
                    playerVars: { autoplay: 1, autohide: 1, wmode: 'transparent', rel: 0 }

                });

                config.i_youtube_video = __frame;

                return true;

            };

            this.description = function()
            {

                var __get_json = function(url, success, error)
                {
                    
                    if (vulcan.validation.misc.is_undefined(url))
                        return false;

                    var __http = new XMLHttpRequest();

                    __http.open('get', url, true);
                    __http.responseType = 'json';

                    __http.onload = function()
                    {
                        
                        var __s = function()
                        {
                        
                            'use this';
                        
                            return true;
                        
                        };

                        var __status = __http.status;

                        if (__status === 200)
                            __s(success && success(__http.response));

                        else
                            __s(error && error(__status));

                    };

                    __http.send();

                };

                __get_json('http://gdata.youtube.com/feeds/api/videos/' +
                        config.video_id + '?v=2&alt=jsonc', function(data)
                        {

                            var __description =vulcan.objects.by_id(config.video_tag + '_data').childNodes[2].childNodes[1],
                                __views_count = data.data.viewCount,
                                __views = __views_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                                __date = data.data.uploaded,
                                __locale = "en-us",
                                __new_date = new Date(Date.parse(__date.replace(/ *\(.*\)/, ""))),
                                __date_format = __new_date.toLocaleString(__locale, {month: "short"}) +
                                        " " + __new_date.getDate() + ", " + __new_date.getFullYear();
                                           
                            __date.toLocaleString(__locale, {month: "long"});

                            __description.innerHTML =
                                    '<div class="yt_text_description"><b>Description:</b></br><bdi>' +
                                    data.data.description + '</bdi></br></br>' +
                                    '<div class="yt_number_views_video"><b>Views: </b>' +
                                    __views + '</div>' +
                                    '<div class="yt_video_uploader"><b>Author: </b>' +
                                    data.data.uploader + '</div>' +
                                    '<div class="yt_video_published"><b>Published on: </b>' +
                                    __date_format + '</div><br></div>';

                            scroll_bar_fix(config.video_tag + '_data #yt_video_description');

                        });

                return true;

            };
            
            this.comments = function()
            {

                me.more_comments(config.start_index, config.max_results);

                events.attach(7);

                return true;

            };

            this.more_comments = function(start_index, max_results, who)
            {

                if (who !== undefined)
                {
                    
                    var __data = who.currentTarget.dataset;
                
                    if (__data.count === undefined)
                    {
                        
                        start_index = max_results + 1;
                        
                        who.currentTarget.dataset.count = start_index + max_results;
                    
                    }
                    
                    else
                    {
                        
                        start_index = __data.count;
                        
                        who.currentTarget.dataset.count = parseInt(start_index) + parseInt(max_results);
                    
                    }
                
                }

                var __src = 'https://gdata.youtube.com/feeds/api/videos/' + config.video_id + '/comments?' +
                                    'v=2&alt=json&max-results=' + max_results + '&start-index=' + start_index;

                var __xhr = new XMLHttpRequest();

                __xhr.open("GET", __src, true);

                __xhr.onreadystatechange = function()
                {

                    if (this.readyState === 4 && this.status === 200)
                    {

                        var __data = JSON.parse(this.response);

                        if (__data.feed && __data.feed.entry)
                        {

                            var __list = vulcan.objects.by_id('yt_video_comments_' + config.video_id),
                                __entries = __data.feed.entry,
                                __length = __entries.length;

                            for (var i = 0; i < __length; i++)
                            {
                                
                                if (__list)
                                {

                                    __list.innerHTML += '<div class="youtube_comment">' +
                                            '<div class="youtube_user">' + __entries[i].author[0].name.$t + '</div>' +
                                            '<div class="yt_video_comments_content">' + __entries[i].content.$t + '</div>' +
                                            '</div>';
                                
                                }

                            }
                            var __a = vulcan.objects.by_id(config.video_tag + '_data').childNodes[3].children[1].lastChild;

                            if (start_index === 89)
                                __a.style.display = 'none' ;
                            
                            else if (__length < 10)
                                __a.style.display = 'none' ;
                            
                            else
                                __a.style.display = 'block';

                        }

                        scroll_bar_fix(config.video_tag + '_data #yt_player_data_comments');

                    }

                };

                __xhr.send();
                
                return true;

            };
            
            this.open = function()
            {

                var __wait = 1;

                var __titles = vulcan.objects.by_class('yt_video_title');

                if (__titles.length > 0)
                {

                    __wait = 0;

                    var __foreach = Array.prototype.forEach,
                        __bind = vulcan.objects.selectors.all.bind(document),
                        __handler = null;

                    __foreach.call(__bind('.yt_video_title, .yt_video_thumbnail'), function(v)
                    {

                        __handler = function(event_object)
                        {

                            event_object.preventDefault();

                            var __url = this.getAttribute('data-link'),
                                __title = this.getAttribute('data-title');

                            config.video_id = utils.url_parse(__url);

                            me.init(__title, config.video_id);

                        };

                        vulcan.events.attach(i_youtube_bee, v, 'click', __handler);

                    });

                }

                return true;

            };

        }
        
        function recorder()
        {
            
            this.init = function()
            {

                i_yt_rec_bee = dev_box.get('bee');
                fx = dev_box.get('fx');
                fx.init(cosmos);

                config.rec_tag = 'i_youtube_recorder';

                var __elements = null;

                vulcan.graphics.apply_theme('/framework/extensions/js/i_youtube/themes', 'i_youtube');

                i_yt_rec_bee.init(cosmos, config.rec_tag, 1);
                i_yt_rec_bee.settings.data.window.labels.title('Record from webcam');
                i_yt_rec_bee.gui.position.left(430);
                i_yt_rec_bee.gui.position.top(0);
                i_yt_rec_bee.gui.size.width(440);
                i_yt_rec_bee.gui.size.min.width(440);
                i_yt_rec_bee.gui.size.height(510);
                i_yt_rec_bee.gui.size.min.height(510);
                i_yt_rec_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
                i_yt_rec_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
                i_yt_rec_bee.on('open', function() { i_yt_rec_bee.gui.fx.fade.into(); });
                i_yt_rec_bee.on('opened', function() { return utils.record_init(); });
                i_yt_rec_bee.on('in_hive', function() { bee.recorder.in_hive(); });
                i_yt_rec_bee.on('drag', function() { vulcan.objects.by_id('yt_record_overlay_' + config.rec_tag).style.display = 'block'; bee.recorder.ghost_icon(); });
                i_yt_rec_bee.on('dragging', function()
                                       {

                                           i_yt_rec_bee.gui.fx.opacity.settings.set(0.7);
                                           i_yt_rec_bee.gui.fx.opacity.apply();

                                        });

                i_yt_rec_bee.on('dragged', function()
                                        { 
                                            
                                            i_yt_rec_bee.gui.fx.opacity.reset();
                                            vulcan.objects.by_id('yt_record_overlay_' + config.rec_tag).style.display = 'none';
                                        
                                        });
                                        
                i_yt_rec_bee.on('resize', function() { vulcan.objects.by_id('yt_record_overlay_' + config.rec_tag).style.display = 'block'; });
                i_yt_rec_bee.on('resized', function() { vulcan.objects.by_id('yt_record_overlay_' + config.rec_tag).style.display = 'none'; });
                                        
                i_yt_rec_bee.on('close', function() { i_yt_rec_bee.gui.fx.fade.out(); });

                this.show(i_yt_rec_bee);

                __elements = vulcan.objects.by_id(config.rec_tag);
                __elements.classList.add('yt_video_element');

                return true;

            };

            this.show = function(bee)
            {

                swarm.bees.insert(bee);

                bee.show();

            };
            
            this.in_hive = function()
            {
                
                var __hive = vulcan.objects.by_id('hive_bee_' + config.rec_tag + '_icon');

                __hive.classList.add('yt_recorder_hive');

                return true;
                
            };
            
            this.ghost_icon = function()
            {
                
                var __hive = vulcan.objects.by_id('hive_ghost_bee');

                if (__hive === undefined)
                    return false;

                __hive.classList.add('yt_recorder_hive');

                return true;
                
            };

            this.iframe = function()
            {

                if (is_init === false)
                    return false;

                var __frame = new YT.UploadWidget('yt_record_' + config.rec_tag,
                {

                    height: '75%',
                    width: '100%',
                    events: { 'onApiReady': bee.recorder.add_info }

                });

                config.i_youtube_record = __frame;

                return true;

            };

            this.add_info = function()
            {

                if (is_init === false)
                    return false;

                var __title = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].firstChild,
                    __description = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].children[2],
                    __privacy = document.getElementsByName('yt_info_rec_v_privacy_' + config.rec_tag),
                    __privacy_length = __privacy.length,
                    __privacy_value = null;

                for (var i = 0; i < __privacy_length; i++)
                {

                    if (__privacy[i].checked)
                        __privacy_value = __privacy[i].value;

                }

                config.i_youtube_record.setVideoTitle(__title.value);
                config.i_youtube_record.setVideoDescription(__description.value);
                config.i_youtube_record.setVideoPrivacy(__privacy_value);

                return true;

            };
            
            this.validate = function()
            {

                __handler = function()
                {

                    var __input = true,
                        __title = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].firstChild,
                        __description = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].children[2],
                        __save = vulcan.objects.by_id(config.rec_tag + '_data').childNodes[2].lastChild.lastChild;

                    if (__title.value === '')
                        __input = false;

                    if (__description.value === '')
                        __input = false;

                    if (__input)
                    {

                        __save.disabled = false;
                        __save.value = 'Save';

                    }

                    else
                    {

                        __save.disabled = true;
                        __save.value = 'Add info';

                    }

                };

                vulcan.events.attach(i_youtube_bee, document, 'keyup', __handler);

                return true;

            };

        }

        this.player = new player();
        this.recorder = new recorder();

    }

    function config_model()
    {

        this.id = null;
        this.app_msg = null;
        this.auth_window = null;
        this.auth_window_timer = null;
        this.i_youtube_video = null;
        this.i_youtube_record = null;
        this.video_tag = null;
        this.rec_tag = null;
        this.video_id = null;
        this.channel_id = null,
        this.start_index = 1;
        this.max_results = 10;
        this.url = '/framework/extensions/ajax/i_youtube/i_youtube.php';

        var __dynamic_object = document.createElement('script');
        __dynamic_object.src = 'https://www.youtube.com/iframe_api';

        document.getElementsByTagName('head')[0].appendChild(__dynamic_object);

    }

    this.get_bee = function()
    {
        
        if (is_init === false)
            return false;

        return i_youtube_bee;

    };

    this.init = function()
    {
        if (is_init === true)
            return false;

        is_init = true;

        i_youtube_bee = dev_box.get('bee');
        config.id = 'i_youtube';

        infinity.setup(config.id + '_data');
        fx = dev_box.get('fx');
        fx.init(cosmos);
        scrollbar = dev_box.get('scrollbar');
        scrollbar.init(cosmos);

        vulcan.graphics.apply_theme('/framework/extensions/js/i_youtube/themes', 'i_youtube');

        i_youtube_bee.init(cosmos, config.id, 2);
        i_youtube_bee.settings.data.window.labels.title('YouTube');
        i_youtube_bee.settings.data.window.labels.status_bar(utils.status_bar(2));
        i_youtube_bee.settings.data.casement.content('This is an extra GUI that extends and enhances the users eperience!');
        i_youtube_bee.settings.data.casement.labels.title('YouTube Update');
        i_youtube_bee.settings.data.casement.labels.status('Helping (secondary) status bar messages...');
        i_youtube_bee.gui.position.left(400);
        i_youtube_bee.gui.position.top(0);
        i_youtube_bee.gui.size.width(350);
        i_youtube_bee.gui.size.height(510);
        i_youtube_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        i_youtube_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        i_youtube_bee.on('open', function() { i_youtube_bee.gui.fx.fade.into(); });
        i_youtube_bee.on('opened', function() { return utils.gui_init(); });
        i_youtube_bee.on('dragging', function()
                                {
                                    i_youtube_bee.gui.fx.opacity.settings.set(0.7);
                                    i_youtube_bee.gui.fx.opacity.apply();
                                });

        i_youtube_bee.on('dragged', function() { i_youtube_bee.gui.fx.opacity.reset(); });
        i_youtube_bee.on('close', function() { i_youtube_bee.gui.fx.fade.out(); });

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
        infinity = null,
        scrollbar = null,
        colony = null,
        swarm = null,
        fx = null,
        i_youtube_bee = null,
        i_yt_play_bee = null,
        i_yt_rec_bee = null,
        html = new draw_html(),
        channels = new video_channels(),
        video = new video_manager(),
        bee = new new_bees(),
        events = new events_attach(),
        ajax = new ajax_request(),
        config = new config_model(),
        utils = new utilities();
}
