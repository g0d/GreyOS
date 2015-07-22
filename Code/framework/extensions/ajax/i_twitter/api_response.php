<?php

    /*

        GreyOS Inc. - Twitter API Response

        Version: 2.0

        File name: api_response.php
        Description: This file contains the Twitter API Response.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



    // Include the Twitter SDK.
    ALPHA_CMS::Load_Extension('i_twitter', 'php');

    // Include the Twitter SDK.
    ALPHA_CMS::Load_Extension('splash', 'php');

	class API_RESPONSE
	{

		private $api_wrapper;
        private $splash;

		function __construct()
		{

            $this->api_wrapper = new API_WRAPPER($_SESSION['twitter_data']['oauth_token'], $_SESSION['twitter_data']['oauth_token_secret']);
            $this->splash = new SPLASH();

		}

		private function Inactive_Token()
		{

		}

        public function Request_Token()
        {

            return $this->api_wrapper->Request_Token();

        }

        public function Oauth_Verifier()
        {

            return $this->api_wrapper->Oauth_Verifier();

        }

        public function False_Response()
        {
 
        }

		public function Sign_In()
		{

            $twitter_login_greyos = $this->splash->Div(1, '', array('id'=>'twitter_login_login_greyos'));
            $twitter_access_token = $this->splash->Button(1, array('id'=>'twitter_access_token', 'type'=>'button', 'value'=>'Sign in'));
            $twitter_access_token_background = $this->splash->Image(1, array('id'=>'twitter_access_token_background', 
                                                                             'src'=>'/framework/extensions/js/i_twitter/themes/pix/loginbg.png', 
                                                                             'alt'=>'Twitter Login Background'));

            $twitter_login_button_div = $this->splash->Div(1, $twitter_access_token . $twitter_access_token_background, array('id'=>'twitter_login_button_div'));
            $twitter_login_div = $this->splash->Div(1, $twitter_login_greyos . $twitter_login_button_div, array('id'=>'twitter_login_div'));

            echo $twitter_login_div;

		}

        public function Sign_Out()
		{

		}

        /**
         * The header statistics HTML layout.
         *
         * @param array
         * @return string 
         */
        private function User_Statistics($user_stats)
        {

            // Tweets statistic
            $twitter_statistic_number = $this->splash->Div(1, $user_stats->statuses_count, array('class'=>'twitter_statistic_number'));
            $twitter_statistic_section = $this->splash->Div(1, 'Tweets', array('class'=>'twitter_statistic_section'));
            $twitter_statistic = $this->splash->Div(1, $twitter_statistic_number . $twitter_statistic_section, array('class'=>'twitter_statistic', 'data-section'=>'tweets'));

            $statistics = $twitter_statistic;

            // Following statistic
            $twitter_statistic_number = $this->splash->Div(1, $user_stats->friends_count, array('class'=>'twitter_statistic_number'));
            $twitter_statistic_section = $this->splash->Div(1, 'Following', array('class'=>'twitter_statistic_section'));
            $twitter_statistic = $this->splash->Div(1, $twitter_statistic_number . $twitter_statistic_section, array('class'=>'twitter_statistic', 'data-section'=>'following'));

            $statistics .= $twitter_statistic;

            // Followers statistic
            $twitter_statistic_number = $this->splash->Div(1, $user_stats->followers_count, array('class'=>'twitter_statistic_number'));
            $twitter_statistic_section = $this->splash->Div(1, 'Followers', array('class'=>'twitter_statistic_section'));
            $twitter_statistic = $this->splash->Div(1, $twitter_statistic_number . $twitter_statistic_section, array('class'=>'twitter_statistic', 'data-section'=>'followers', 'style'=>'border-right: none;'));

            $statistics .= $twitter_statistic;

            // Statistics
            $statistics_html = $this->splash->Div(1, $statistics, array('id'=>'twitter_user_statistics'));

            return $statistics_html;

        }

        /**
         * The HTML layout of a tweet.
         *
         * @param array
         * @return string 
         */
        private function Tweet_Html($tweet)
        {

            // Right part of the tweet
            $tweet_text = $this->splash->Div(1, $this->Convert_Entities($tweet), array('class'=>'tweet_text'));
            $tweet_user_screen_name = $this->splash->Link(1, '@' . $tweet->user->screen_name, array('class'=>'tweet_user_screen_name', 'href'=>'#'));
            $tweet_user_information = $this->splash->Div(1, $tweet->user->name . ' ' . $tweet_user_screen_name, array('class'=>'tweet_user_information'));
            $tweet_content_right = $this->splash->Div(1, $tweet_user_information . $tweet_text,array('class'=>'tweet_content_right'));

            // Left part of the tweet
            $profile_image = $this->splash->Image(1,array('src'=>$tweet->user->profile_image_url, 'alt'=>'Profile Image'));
            $tweet_user_profile_image = $this->splash->Div(1, $profile_image, array('class'=>'tweet_user_profile_image'));
            $tweet_time = $this->splash->Div(1, $this->Tweet_Time_Convert($tweet->created_at), array('class'=>'tweet_time'));
            $tweet_content_left = $this->splash->Div(1, $tweet_user_profile_image . $tweet_time, array('class'=>'tweet_content_left'));

            // Tweet Content 
            $tweet_content = $this->splash->Div(1, $tweet_content_left . $tweet_content_right, array('class'=>'tweet_content'));

            // Action More
            $action_image = $this->splash->Image(1,array('src'=>'/framework/extensions/js/i_twitter/themes/pix/more.png', 'alt'=>'More Button'));
            $action_link = $this->splash->Link(1, 'More', array('class'=>'tweet_action_more', 'href'=>'#'));
            $tweet_action = $this->splash->Div(1, $action_image . $action_link, array('class'=>'tweet_action'));

            // Action Favorite
            $action_image = $this->splash->Image(1,array('src'=>'/framework/extensions/js/i_twitter/themes/pix/favorite.png', 'alt'=>'Favorite Button'));

            if ($tweet->favorited)
                $action_link = $this->splash->Link(1, 'Favorited', array('class'=>'tweet_action_favorite', 'href'=>'#'));

            else
                $action_link = $this->splash->Link(1, 'Favorite', array('class'=>'tweet_action_favorite', 'href'=>'#'));

            $tweet_action .= $this->splash->Div(1, $action_image . $action_link, array('class'=>'tweet_action'));

            // Action Retweet
            $action_image = $this->splash->Image(1,array('src'=>'/framework/extensions/js/i_twitter/themes/pix/retweet.png', 'alt'=>'Retweet Button'));

            if ($tweet->retweeted)
                $action_link = $this->splash->Link(1, 'Retweeted', array('class'=>'tweet_action_retweet', 'href'=>'#'));

            else
                $action_link = $this->splash->Link(1, 'Retweet', array('class'=>'tweet_action_retweet', 'href'=>'#'));

            $tweet_action .= $this->splash->Div(1, $action_image . $action_link, array('class'=>'tweet_action'));

            // Action Reply
            $action_image = $this->splash->Image(1,array('src'=>'/framework/extensions/js/i_twitter/themes/pix/reply.png', 'alt'=>'Reply Button'));
            $action_link = $this->splash->Link(1, 'Reply', array('class'=>'tweet_action_reply', 'href'=>'#'));
            $tweet_action .= $this->splash->Div(1, $action_image . $action_link, array('class'=>'tweet_action'));

            // // Action More - Share via Email
            // $action_more_mail = $this->splash->Div(1, 'Share via email', array('class'=>'tweet_action_more'));

            // // Action More - Embed Tweet
            // $action_more_embed = $this->splash->Div(1, 'Embed Tweet', array('class'=>'tweet_action_more'));

            // // Action More - Report Tweet
            // $action_more_report = $this->splash->Div(1, 'Report Tweet', array('class'=>'tweet_action_more'));

            // // Actions More
            // $actions_more = $this->splash->Div(1, $action_more_mail . $action_more_embed . $action_more_report, array('class'=>'tweet_actions_more'));

            // User actions of the tweet
            $tweet_actions = $this->splash->Div(1, $tweet_action, array('class'=>'tweet_actions'));


            $reply_form_close = $this->splash->Link(1, 'Close', array('class'=>'tweet_reply_form_close', 'href'=>'#'));
            $reply_form_counter = $this->splash->Div(1, '140', array('class'=>'tweet_reply_form_counter'));
            $reply_form_reply = $this->splash->Link(1, 'Reply', array('class'=>'tweet_reply_form_reply', 'href'=>'#'));
            $reply_form_text = $this->splash->Textbox(1, '@' . $tweet->user->screen_name,array('class'=>'tweet_reply_form_textarea'));

            $tweet_reply_form = $this->splash->Div(1, $reply_form_text . $reply_form_close . $reply_form_counter . $reply_form_reply, array('class'=>'tweet_reply_form'));

            // Tweet
            $tweet_html = $this->splash->Div(1, $tweet_content . $tweet_actions . $tweet_reply_form, array('class'=>'tweet'));

            return $tweet_html;

        }

        private function User_Html($user)
        {

            // User left
            $user_profile_image = $this->splash->Image(1, array('class'=>'user_profile_image' ,'src'=>$user->profile_image_url, 'alt'=>'Profile Image'));
            $user_left = $this->splash->Div(1, $user_profile_image, array('class'=>'user_left'));    

            // User Right
            $user_screen_name = $this->splash->Link(1, '@' . $user->screen_name, array('class'=>'user_screen_name', 'href'=>'#  '));
            $user_information = $this->splash->Div(1, $user->name . ' ' . $user_screen_name, array('class'=>'user_information'));
            $user_description = $this->splash->Div(1, $user->description, array('class'=>'user_description'));
            $user_right = $this->splash->Div(1, $user_information . $user_description, array('class'=>'user_right'));

            // User Top
            $user_top = $this->splash->Div(1, $user_left . $user_right, array('class'=>'user_top'));
            
            // User Bottom
            $user_action = $this->splash->Link(1, 'Follow', array('class'=>'user_action', 'href'=>'#'));
            $user_bottom = $this->splash->Div(1, $user_action, array('class'=>'user_bottom'));

            // User Html
            $user_html = $this->splash->Div(1, $user_top . $user_bottom, array('class'=>'user'));

            return $user_html;

        }

        private function Suggestion_Html($suggestion)
        {

            $suggestion_slug = $this->splash->Link(1, $suggestion->name, array('class'=>'suggestion_slug', 'href'=>'#'));

            $suggestion_html = $this->splash->Div(1, $suggestion_slug . $suggestion->size . ' Suggestions', array('class'=>'suggestion'));

            return $suggestion_html;

        }

        private function More_Button($stats)
        {

            $more_button = $this->splash->Link(1, 'More...', array('id'=>'twitter_more_button' ,'href'=>'#'));

            $arrow = $this->splash->Image(1, array('src'=>'/framework/extensions/js/i_twitter/themes/pix/back_to_top.png', 'alt'=>'Back To Top'));

            $back_to_top = $this->splash->Link(1, $arrow, array('id'=>'twitter_back_to_top','href'=>'#'));

            $more_html = $this->splash->Div(1, $more_button . $back_to_top, array('id'=>'tweet_feed_bottom_actions'));

            return $more_html;

        }

        /**
         * Converts the hashtags inside
         * a tweet into a clickable link. 
         *
         * @param string, array
         * @return string
         */
        private function Convert_Entities($tweet)
        {

            // Some problems with url and after that media photo
            // at the end of the tweet. REMINDER./

            if(!isset($tweet))
                return null;

            $indices_array = array();
            $is_a_retweet = false;

            if (!empty($tweet->retweeted_status))
            {

                $tweet_text = $tweet->retweeted_status->text;
                $entities = $tweet->retweeted_status->entities;
                $is_a_retweet = true;

            }

            else
            {

                $tweet_text = $tweet->text;
                $entities = $tweet->entities;

            }

            foreach($entities as $entity => $entity_data)
            {

                if(!empty($entity_data))
                {

                    if($entity === 'hashtags')
                    {

                        foreach($entity_data as $data)
                        {

                            $entity_data = array('start_index'=>$data->indices[0],
                                                 'end_index'=>$data->indices[1],
                                                 'type'=>'hashtags',
                                                 'text'=>$data->text);

                            array_push($indices_array, $entity_data);

                        }

                    }

                    else if($entity === 'symbols')
                    {

                        foreach($entity_data as $data)
                        {

                            $entity_data = array('start_index'=>$data->indices[0],
                                                 'end_index'=>$data->indices[1],
                                                 'type'=>'symbols',
                                                 'text'=>$data->text);

                            array_push($indices_array, $entity_data);

                        }

                    }

                    else if($entity === 'urls')
                    {

                        foreach($entity_data as $data)
                        {

                            $entity_data = array('start_index'=>$data->indices[0],
                                                 'end_index'=>$data->indices[1],
                                                 'type'=>'urls',
                                                 'url'=>$data->url,
                                                 'expanded_url'=>$data->expanded_url,
                                                 'display_url'=>$data->display_url);

                            array_push($indices_array, $entity_data);

                        }

                    }

                    else if($entity === 'user_mentions')
                    {

                        foreach($entity_data as $data)
                        {

                            $entity_data = array('start_index'=>$data->indices[0],
                                                 'end_index'=>$data->indices[1],
                                                 'type'=>'user_mentions',
                                                 'screen_name'=>$data->screen_name,
                                                 'name'=>$data->name,
                                                 'id'=>$data->id,
                                                 'id_str'=>$data->id_str);

                            array_push($indices_array, $entity_data);

                        }

                    }

                    else if($entity === 'media')
                    {

                        foreach($entity_data as $data)
                        {

                            $entity_data = array('start_index'=>$data->indices[0],
                                                 'end_index'=>$data->indices[1],
                                                 'type'=>'media',
                                                 'id'=>$data->id,
                                                 'id_str'=>$data->id_str,
                                                 'media_url'=>$data->media_url,
                                                 'media_url_https'=>$data->media_url_https,
                                                 'url'=>$data->url,
                                                 'display_url'=>$data->display_url,
                                                 'expanded_url'=>$data->expanded_url,
                                                 'media_type'=>$data->type,
                                                 'sizes'=>$data->sizes);

                            array_push($indices_array, $entity_data);

                        }

                    }

                }

            }

            $indices_array = $this->Sort_Mutlidimension_Array($indices_array, 'start_index');

            $indices_move_count = 0;

            foreach($indices_array as $entity)
            {

                $start_index = $indices_move_count + $entity['start_index'];

                $length = $entity['end_index'] - $entity['start_index'] + 1;

                // Check for the space

                if (mb_substr($tweet_text, $start_index + $length, 1) === ' ')
                {

                    $__space = ' ';

                }

                else
                {

                    $__space = '';

                }

                if($entity['type'] === 'hashtags')
                {

                    $hashtag_link = $this->splash->Link(1, '#' . $entity['text'] . $__space, array('class'=>'tweet_hashtag', 'href'=>'#', 'data-hashtag'=>$entity['text']));

                    $tweet_text = $this->Utf8_Substr_Replace($tweet_text, $hashtag_link, $start_index, $length);

                    $indices_move_count += mb_strlen($hashtag_link) - $length;

                }

                else if($entity['type'] === 'symbols')
                {

                    // Code to be written ...

                }

                else if($entity['type'] === 'urls')
                {

                    if(empty($entity['display_url']))
                        $url_to_display = $entity['url'];

                    else
                        $url_to_display = $entity['display_url'];

                    $url_link = $this->splash->Link(1, $url_to_display . $__space, array('class'=>'tweet_url', 'href'=>$entity['expanded_url'], 'target'=>'_blank'));

                    $tweet_text = $this->Utf8_Substr_Replace($tweet_text, $url_link, $start_index, $length);

                    // Shorten urls which end with `...` , PHP takes it as one character count.
                    if (substr($entity['url'], mb_strlen($entity['url']) - 4, 3) === '...');
                        $length = $length + 2;

                    $indices_move_count += mb_strlen($url_link) - $length;

                }

                else if($entity['type'] === 'user_mentions')
                {

                    $mention_link = $this->splash->Link(1, '@' . $entity['screen_name'] . $__space, array('class'=>'tweet_user_mention', 'href'=>'#', 'data-screen_name'=>$entity['screen_name']));

                    $tweet_text = $this->Utf8_Substr_Replace($tweet_text, $mention_link, $start_index, $length);

                    $indices_move_count += mb_strlen($mention_link) - $length;

                }

                else if($entity['type'] === 'media')
                {

                    if(empty($entity['display_url']))
                        $media_to_display = $entity['url'];

                    else
                        $media_to_display = $entity['display_url'];

                    $media_link = $this->splash->Link(1, $media_to_display . $__space, array('class'=>'tweet_media_photo', 'href'=>$entity['media_url']));

                    $tweet_text = $this->Utf8_Substr_Replace($tweet_text, $media_link, $start_index, $length);

                    $indices_move_count += mb_strlen($media_link) - $length;

                }

            }

            return $tweet_text;

        }

        private function Utf8_Substr_Replace($string, $replacement, $position, $length)
        {

            $first_half = mb_substr($string, 0, $position, "UTF-8");

            $second_half = mb_substr($string, $position + $length, mb_strlen($string), "UTF-8");

            $result = $first_half . $replacement . $second_half;

            return $result;

        }

        /**
         * Converts the UTC string in order to
         * display how long ago the tweet was posted. 
         *
         * @param string
         * @return string 
         */
        private function Tweet_Time_Convert($created_at)
        {

            if(!isset($created_at))
                return null;

            $current_timestampt = strtotime("now"); 
            $tweet_timestampt = strtotime($created_at); 
            $difference = $current_timestampt - $tweet_timestampt; 
            $minute = 60; 
            $hour = $minute * 60; 
            $day = $hour * 24; 

            if(is_numeric($difference) && $difference > 0) 
            { 

                if($difference < 3) 
                    return "1s"; 

                else if($difference < $minute) 
                    return floor($difference) . "s"; 

                else if($difference < $minute * 2) 
                    return "1m"; 

                else if($difference < $hour) 
                    return floor($difference / $minute) . "m"; 

                else if($difference < $hour * 2) 
                    return "1h"; 

                else if($difference < $day) 
                    return floor($difference / $hour) . "h"; 

                else if($difference > $day && $difference < $day * 2) 
                    return "1d"; 

                else if($difference < $day * 365) 
                    return date('j M',$tweet_timestampt);

                else
                    return date('j M y',$tweet_timestampt);

            } 

            else
                return null;

        }

        private function Sort_Mutlidimension_Array($arrays_to_sort, $orderby)
        {  

            $sortArray = array(); 

            foreach($arrays_to_sort as $array_to_sort)
            {

                foreach($array_to_sort as $key=>$value)
                {

                    if(!isset($sortArray[$key])) 
                        $sortArray[$key] = array(); 

                    $sortArray[$key][] = $value; 

                }

            }

            array_multisort($sortArray[$orderby], SORT_NUMERIC, $arrays_to_sort);

            return $arrays_to_sort;

        }

        public function Start()
        {

            $response = $this->api_wrapper->Header_Statistics();

            if ($response !== false)
                $header_statistics = $this->User_Statistics($response);

            else
                $this->False_Response();

            $response = $this->api_wrapper->Home_Timeline();

            if ($response !== false)
            {

                foreach ($response as $tweet)
                {   

                    if (!empty($tweet))
                        $home_timeline .= $this->Tweet_Html($tweet);

                }

                $home_timeline .= $this->More_Button();

            }

            else
                $this->False_Response();

            $main_response_data = $this->splash->Div(1, $home_timeline, array('id'=>'twitter_main_response_data'));

            $html = $header_statistics . $main_response_data;

            echo $html;

        }

        public function Home_Timeline()
        {

            $response = $this->api_wrapper->Home_Timeline();

            $html = null;

            if ($response !== false)
            {

                foreach ($response as $tweet)
                {

                    if (!empty($tweet))
                        $html .= $this->Tweet_Html($tweet);

                }

                echo $html;

            }

            else
                $this->False_Response();

        }

        public function User_Timeline($parameters)
        {

            $response = $this->api_wrapper->User_Timeline($parameters);

            if ($response !== false)
            {

                foreach ($response as $tweet)
                {

                    if (!empty($tweet))
                        $html .= $this->Tweet_Html($tweet);

                }

                echo $html;

            }

            else
                $this->False_Response();

        }

        public function Mentions_Timeline()
        {

            $response = $this->api_wrapper->Mentions_Timeline();

            if ($response !== false)
            {

                foreach ($response as $tweet)
                {

                    if (!empty($tweet))
                        $html .= $this->Tweet_Html($tweet);

                }

                echo $html;

            }

            else
                $this->False_Response();

        }

        public function Compose_Tweet()
        {

            $compose_top = $this->splash->Textbox(1, '',array('id'=>'twitter_new_status_text'));

            $tweet_button = $this->splash->Button(1, array('id'=>'twitter_new_submit_status', 'type'=>'button','value'=>'Tweet'));
            $counter_div = $this->splash->Div(1, 140, array('id'=>'twitter_new_status_counter'));

            $compose_bottom = $this->splash->Div(1, $tweet_button . $counter_div, array('id'=>'twitter_new_submit_status_buttons_div'));

            $html = $this->splash->Div(1, $compose_top . $compose_bottom, array('id'=>'twitter_new_status_form_div'));

            echo $html;

        }

        public function Followers()
        {

            $response = $this->api_wrapper->Followers();

            $html = null;

            if ($response !== false)
            {

                foreach ($response->users as $user)
                    $html .= $this->User_Html($user);

                echo $html;

            }

            else
                $this->False_Response();

        }

        public function Following()
        {

            $response = $this->api_wrapper->Following();

            $html = null;

            if ($response !== false)
            {

                foreach ($response->users as $user)
                    $html .= $this->User_Html($user);

                echo $html;

            }

            else
                $this->False_Response();

        }

        public function Suggestions()
        {   

            $response = $this->api_wrapper->Suggestions();

            $html = null;

            if ($response !== false)
            {

                foreach ($response as $suggestion)
                    $html .= $this->Suggestion_Html($suggestion);

                echo $html;

            }

            else
                $this->False_Response();

        }

        public function Favorites()
        {

            $response = $this->api_wrapper->Favorites();

            if ($response !== false)
            {

                foreach ($response as $tweet)
                {

                    if (!empty($tweet))
                        $html .= $this->Tweet_Html($tweet);

                }

                echo $html;

            }

            else
                $this->False_Response();

        }

        public function Account_Settings()
        {

            $response = $this->api_wrapper->Account_Settings();

            var_dump($response);

        }

        public function Messages()
        {

            $response = $this->api_wrapper->Messages();

            $conversations = array();

            foreach ($response['from_me'] as $message)
            {

                var_dump(strtotime($message->created_at));

            }

        }

        public function Search($query)
        {

            $response = $this->api_wrapper->Search($query);

            $search_query = $this->splash->Div(1, $query, array('id'=>'search_results_query'));

            $html = $this->splash->Div(1, 'Results for: ' . $search_query, array('id'=>'search_result_heading'));

            if ($response !== false)
            {

                foreach ($response->statuses as $tweet)
                {

                    if (!empty($tweet))
                        $html .= $this->Tweet_Html($tweet);

                }

                echo $html;

            }

            else
                $this->False_Response();

        }        

	}

?>