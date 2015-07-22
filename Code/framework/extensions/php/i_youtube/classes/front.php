<?php

    /*

        GreyOS Inc. - Integrated YouTube

        File name: front.php (Version: 1.0)
        Description: This file contains the YouTube PHP extension.

        Coded by Slavenko Bozic (slawe)

        GreyOS Inc.
        Copyright © 2014

    */



    // Disable error reporting
    error_reporting(0);
    ini_set('display_errors', '0');

    date_default_timezone_set('Europe/Athens');
    $tmp_time_zone = date_default_timezone_get();
    date_default_timezone_set('UTC');
    
    // Include spl@sh extension in order to generate HTML
    ALPHA_CMS::Load_Extension('splash', 'php');

    class FRONT
    {
        
        private $splash;


        public function __construct()
        {

            $this->splash = new SPLASH();

        }
        
        public function Login_Form($url)
        {

            $yt_login_greyos = $this->splash->Div(1, '',array('id' => 'yt_login_login_greyos'));
            $yt_login_button= $this->splash->Button(1, array('id' => 'yt_access_token', 'data-url' => $url, 'type' => 'button', 'value' => 'Sign in'));
            $yt_access_image = $this->splash->Image(1, array('id' => 'yt_access_token_background', 'src' => '/framework/extensions/js/i_youtube/themes/pix/loginbg.png', 'alt' => 'YouTube'));
            $yt_button_image = $yt_login_button . $yt_access_image;
            $yt_login_button_div = $this->splash->Div(1, $yt_button_image, array('id' => 'yt_login_button_div'));
            $yt_login_div = $yt_login_greyos . $yt_login_button_div;

            echo $this->splash->Div(1, $yt_login_div, array('id' => 'yt_login_div'));
            
            return true;

        }
        
        public function Search_Box()
        {

            $yt_search_value = $this->splash->Input(1, array('id' => 'yt_search_value', 'data-search' => 'yt_search_button', 'type' => 'text', 'name' => 'search_value', 'placeholder' => 'Search for videos...'));
            $yt_per_page = $this->splash->Input(1, array('id' => 'yt_per_page', 'type' => 'hidden', 'name' => 'per_page', 'value' => ''));
            $yt_start_index = $this->splash->Input(1, array('id' => 'yt_start_index', 'type' => 'hidden', 'name' => 'start_index', 'value' => ''));
            $yt_search_image = $this->splash->Image(1, array('id' => 'yt_seaerch_button_image', 'src' => '/framework/extensions/js/i_youtube/themes/pix/search_icon.png', 'alt' => 'Search'));
            $yt_search_button = $this->splash->Link(1, $yt_search_image, array('id' => 'yt_search_button', 'href' => '#'));
            $yt_suggest = $this->splash->Div(1, '', array('id' => 'suggest'));
            $yt_search_content = $yt_search_value . $yt_per_page . $yt_start_index . $yt_search_button . $yt_suggest;

            echo $this->splash->Div(1, $yt_search_content, array('id' => 'yt_search'));
            echo $this->splash->Div(1, '', array('id' => 'yt_search_results'));

            $yt_load_more_button = $this->splash->Link(1, 'More Results', array('id' => 'yt_load_more_button', 'href' => '#'));

            echo $this->splash->Div(1, $yt_load_more_button, array('id' => 'yt_load_more'));
            
            return true;

        }
        
        public function Video_List_Raw($video, $counter, $case)
        {

            $namespaces = $video->GetNameSpaces(true);
            $stats = $video->children($namespaces['yt']);
            $kids = $video->children('http://search.yahoo.com/mrss/');
            $group = $kids->group->children($namespaces['yt']);
            $attributes = $kids->group->content[0]->attributes();
            $attributes = $kids->group->player->attributes();
            
            $duration = $group->duration->attributes();
            $descriptions = (string) $kids->group->description;
            $titles = $video->title;

            if (isset($stats->statistics))
            {

                $stats_info = $stats->statistics->attributes();
                $n_views = $stats_info['viewCount'];

            }

            $link = $attributes['url']; 

            $querystring = parse_url($link, PHP_URL_QUERY);

            parse_str($querystring, $id_temp);

            $id = $id_temp['v'];

            $thumb = 'http://i4.ytimg.com/vi/' . $id . '/default.jpg';

            $title = $titles;
            $description = $descriptions;

            if (strlen($title) > 28)
                $title = mb_substr($title, 0, 28) . "...";

            if (strlen($description) > 85)
                $description = mb_substr($description, 0, 85) . "...";

            $views = number_format((int)$n_views, 0, ',', '.');

            $length = date('G:i:s', (int) $duration['seconds']);
            date_default_timezone_set($tmp_time_zone);

            if (mb_substr($length, 0, 2) == '0:')
                $length = mb_substr($length, 2);

            $pic_thumb = $this->splash->Image(1, array('class' => 'yt_search_thumbnail', 'src' => $thumb, 'alt' => ' '));
            $link_thumb = $this->splash->Link(1, $pic_thumb, array('class' => 'yt_video_thumbnail', 'href' => '#', 'data-link' => $link, 'data-title' => $titles));
            $num_views = $this->splash->Div(1, $views, array('class' => 'yt_number_views'));
            $txt_views = $this->splash->Div(1, 'Views', array('class' => 'yt_text_views'));
            $thumb = $link_thumb . $num_views . $txt_views;
            $div_thumbnail = $this->splash->Div(1, $thumb, array('class' => 'yt_thumbnail_box'));

            $link_title = $this->splash->Link(1, $title, array('class' => 'yt_video_title', 'href' => '#', 'data-link' => $link, 'data-title' => $titles));

            $div_length = $this->splash->Div(1, $length, array('class' => 'yt_video_length'));
            $div_description = $this->splash->Div(1, $description, array('class' => 'yt_description'));

            if ($case === 1)
                $link_button = $this->splash->Link(1, 'Favorite', array('class' => 'yt_favorite_button', 'href' => '#', 'rel' => $id));
            
            else if ($case === 2)
                $link_button = $this->splash->Link(1, 'Delete', array('class' => 'yt_delete_button', 'href' => '#', 'rel' => $id));
            
            $link_embed = $this->splash->Link(1, 'Embed', array('class' => 'yt_embed_button', 'href' => '#'));

            $iframe = '<iframe width="420" height="315" src="//www.youtube.com/embed/' . $id . '" frameborder="0" allowfullscreen></iframe>';
            $textarea = $this->splash->Textbox(1, $iframe, array('class' => 'yt_text_embed', 'readonly' => 'true'));
            $div_embed = $this->splash->Div(1, $textarea, array('class' => 'yt_embed_content'));

            $content = $div_thumbnail . $link_title . $div_length . $div_description . $link_button . $link_embed . $div_embed;

            $video_box = $this->splash->Div(1, $content, array('id' => 'yt_video_' . $id, 'class' => 'yt_full_info'));

            echo $this->splash->Input(1, array('id' => 'yt_videos_counter', 'type' => 'hidden', 'name' => 'counter', 'value' => $counter));

            $video_box = str_replace(array('\r', '\n'), '', $video_box);

            return $video_box;
            
        }
        
        public function Upload_Form($parmas)
        {
            
            $t_short = $parmas['title'];
                    
            if (strlen($t_short) > 50)
                    $t_short = mb_substr($t_short, 0, 50) . '...';
            
            $d_short = $parmas['description'];
            
            if (strlen($d_short) > 45)
                    $d_short = mb_substr($d_short, 0, 45) . '...';
            
            $url_url = '<b>URL: </b>https://www.youtube.com/watch?v=' . $parmas['id'];
            
            $title_div = $this->splash->Link(1, '<b>Title: </b>' . $t_short, array('class' => 'yt_video_title', 'href' => '#', 'data-title' => $parmas['title'], 'data-link' => $parmas['url'], 'style' => 'margin-left: 0px'));
            $description_div = $this->splash->Div(1, '<b>Description: </b>' . $d_short, array('id' => 'yt_new_video_description'));
            $category_div = $this->splash->Div(1, '<b>Category: </b>' . $parmas['genre'], array('id' => 'yt_new_video_category'));
            $url_div = $this->splash->Link(1, $url_url, array('id' => 'yt_new_video_url', 'href' => '#', 'data-title' => $parmas['title'], 'data-link' => $parmas['url']));

            $content_div = $title_div . $description_div . $category_div . $url_div;

            echo $new_video = $this->splash->Div(1, $content_div, array('id' => 'yt_upload_new_video_content'));
            
            return true;
            
        }
        
        public function Email_Form($user_name)
        {
            
            $div_to = $this->splash->Div(1, 'To', array('class' => 'yt_email_text_to'));
            $div_input = $this->splash->Input(1, array('class' => 'yt_email_input', 'type' => 'email', 'name' => 'recipients', 'placeholder' => 'Email addresses'));
            $div_note = $this->splash->Div(1, 'Additional note', array('class' => 'yt_email_text_note'));
            $div_txtarea = $this->splash->Textbox(1, '',array('class' => 'yt_email_textarea', 'placeholder' => 'Optional', 'maxlength' => '200'));
            $div_char_left = $this->splash->Div(1, '', array('class' => 'yt_message_char_left'));
            
            $div_preview = $this->splash->Div(1, 'Message preview', array('class' => 'yt_email_text_preview'));
            $div_name = $this->splash->Link(1, $user_name, array('class' => 'yt_email_sender', 'href' => '#'));
            $div_which_user = $this->splash->Div(1, $div_name . ' has shared a video with you on YouTube:', array('class' => 'yt_email_view_header'));
            $div_copy_text = $this->splash->Div(1, '', array('class' => 'yt_email_copy_message'));
            $div_video_link = $this->splash->Div(1, '', array('class' => 'yt_email_link_share'));
            $div_in_border =  $div_which_user . $div_copy_text . $div_video_link;
            $div_border = $this->splash->Div(1, $div_in_border, array('id' => 'yt_email_border_copy_div'));
            
            $click_send = $this->splash->Button(1, array('class' => 'yt_send_email_button', 'type' => 'submit', 'name' => 'submit', 'value' => 'Send email'));

            $content_form = $div_to . $div_input . $div_note . $div_txtarea . $div_char_left . $div_preview . $div_border . $click_send;

            echo $email_form = $this->splash->Div(1, $content_form, array('class' => 'yt_email_share_content_form'));
            
            return true;
            
        }
        
        public function Channel_List_Raw($channels, $case)
        {

            if ($case === 1)
            {

                $id = $channels->content->entry[0]->author[0]->{'yt$userId'}->{'$t'};
                $titles = $channels->content->entry[0]->title->{'$t'};
                $descriptions = $channels->content->entry[0]->summary->{'$t'};
                $link = $channels->content->entry[0]->link[0]->href;
                $thumb = $channels->content->entry[0]->{'media$thumbnail'}[0]->url;
                $total_v = $channels->content->entry[0]->{'yt$channelStatistics'}[0]->videoCount;
                $total_videos = number_format((int)$total_v, 0, ',', '.');
                $total_s = $channels->content->entry[0]->{'yt$channelStatistics'}[0]->subscriberCount;
                $total_subs = number_format((int)$total_s, 0, ',', '.');
                $uploads_link = $channels->content->entry[0]->{'gd$feedLink'}[0]->href;

            }

            if ($case === 2)
            {

                $channel_id = $channels->{'yt$channelId'}->{'$t'};
                $id = mb_substr($channel_id, 2);
                $titles = $channels->{'yt$username'}->display;
                $link = $channels->link[0]->href;
                $xml = simplexml_load_file(sprintf($link));
                $descriptions = $xml->summary;
                $thumb = $channels->{'media$thumbnail'}->url;
                $total_v = $channels->{'yt$countHint'}->{'$t'};
                $total_videos = number_format((int)$total_v, 0, ',', '.');
                $uploads_link = $channels->link[1]->href;

            }

            $title = $titles;
            $description = $descriptions;

            if (strlen($title) > 28)
                $title = mb_substr($title, 0, 28) . "...";

            if (strlen($description) > 85)
                $description = mb_substr($description, 0, 85) . "...";

            $pic_thumb = $this->splash->Image(1, array('class' => 'yt_search_thumbnail', 'src' => $thumb, 'alt' => ' '));
            $link_thumb = $this->splash->Link(1, $pic_thumb, array('class' => 'yt_video_thumbnail', 'href' => '#', 'data-link' => $link, 'data-title' => $titles));
            $up_videos = $this->splash->Div(1, 'Total videos: ' . $total_videos, array('class' => 'yt_number_uploads'));
            $subs = $this->splash->Div(1, 'Subscriber: ' . $total_subs, array('class' => 'yt_number_subscribers'));

            if ($case === 1)
                $thumb = $link_thumb . $up_videos . $subs;

            else if ($case === 2)
                $thumb = $link_thumb . $up_videos;

            $div_thumbnail = $this->splash->Div(1, $thumb, array('class' => 'yt_thumbnail_box'));

            $link_title = $this->splash->Link(1, $title, array('class' => 'yt_video_title', 'href' => '#', 'data-link' => $link, 'data-title' => $titles));

            $div_description = $this->splash->Div(1, $description, array('class' => 'yt_description'));

            if ($case === 1)
                $link_button = $this->splash->Link(1, 'Subscribe', array('class' => 'yt_subscribe_button', 'href' => '#', 'rel' => $id));

            else if ($case === 2)
                $link_button = $this->splash->Link(1, 'Unsubscribe', array('class' => 'yt_unsubscribe_button', 'href' => '#', 'rel' => $id));

            $content = $div_thumbnail . $link_title . $div_description . $link_button;

            $channel_box = $this->splash->Div(1, $content, array('id' => 'yt_channel_' . $id, 'class' => 'yt_channel_info'));

            return $channel_box;

        }

    }

?>
