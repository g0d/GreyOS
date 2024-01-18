<?php

    /*

        GreyOS Inc. - Twitter API Wrapper

        Version: 2.0

        File name: i_twitter.php
        Description: This file contains the Twitter API Wrapper extension.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2013

    */
    
    // Include Twitter Oauth Library
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/oauth/twitter_oauth.php'));

    // Include Twitter Section Classes
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/timelines.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/tweets.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/search.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/streaming.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/direct_messages.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/friends.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/followers.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/users.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/suggested_users.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/favorites.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/lists.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/saved_searches.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/places_geo.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/trends.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/spam_reporting.php'));
    require(UTILS::Absolute_Path('framework/extensions/php/i_twitter/classes/help.php'));

    class API_WRAPPER
    {

        private $oauth_token;
        private $oauth_token_secret;

        public function __construct($oauth_token, $oauth_token_secret)
        {

            $this->oauth_token = (isset($oauth_token)) ? $oauth_token : '';
            $this->oauth_token_secret = (isset($oauth_token_secret)) ? $oauth_token_secret : '';

        }

        public function Request_Token()
        {

            $config['oauth_type'] = 'unauthorized';
            $request = new TWITTER_OAUTH($config);

            $data = $request->Set_Request_Info('oauth/request_token', 'POST')
                            ->Build_Request()
                            ->Make_Request();

            $data_array = explode('&', $data);

            $response = array();

            if ($data != false)
            {

                foreach ($data_array as $value)
                {

                    $temp = explode('=', $value);
                    $response[$temp[0]] = $temp[1];

                }

                return $response;

            }

            else
                return false;

        }

        public function Oauth_Verifier()
        {

            $config['oauth_type'] = 'semi-authorized';
            $request = new TWITTER_OAUTH($config);

            $data = $request->Set_Oauth_Token($_GET["oauth_token"])
                    ->Set_Request_Info('oauth/access_token', 'POST', array('oauth_verifier' => $_GET["oauth_verifier"]))
                    ->Build_Request()
                    ->Make_Request();

            $data_array = explode('&', $data);

            $response = array();

            foreach ($data_array as $value)
            {

                $temp = explode('=', $value);
                $response[$temp[0]] = $temp[1];

            }

            return $response;

        }

        public function Expired_Token($response)
        {

            if (array_key_exists('errors', $response))
            {

                if ($response->errors[0]->code == 89 || $response->errors[0]->code == 215)
                    return true;

                else
                    return false;

            }

            else
                return false;

        }

        private function Make_Request($url, $parameters, $method)
        {

            $return[] = array();

            $request = new TWITTER_OAUTH();

            $data = $request->Set_User_Credentials($this->oauth_token, $this->oauth_token_secret)
                            ->Set_Request_Info($url, $method, $parameters)
                            ->Build_Request()
                            ->Make_Request();

            $response = json_decode($data);

            if ($this->Expired_Token($response))
                return false;

            else
                return $response;

        }

        public function Header_Statistics()
        {

            $users = new USERS();

            $parameters = array('screen_name' => $_SESSION['twitter_data']['screen_name']);

            $data = $users->Users_Show($parameters);

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Home_Timeline()
        {

            $timelines = new TIMELINES();

            $data = $timelines->Home_Timeline();

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function User_Timeline($parameters)
        {

            $timelines = new TIMELINES();

            $data = $timelines->User_Timeline($parameters);

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Mentions_Timeline()
        {

            $timelines = new TIMELINES();

            $data = $timelines->Mentions_Timeline();

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Followers()
        {

            $followers = new FOLLOWERS();

            $data = $followers->Followers_Lists();

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Following()
        {

            $following = new FRIENDS();

            $parameters = array('screen_name' => $_SESSION['twitter_data']['screen_name']);

            $data = $following->Friends_List();

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Suggestions()
        {

            $suggestions = new SUGGESTED_USERS();

            $data = $suggestions->Suggestions();

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Favorites()
        {

            $favorites = new FAVORITES();

            $data = $favorites->Favorites_List();

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Account_Settings()
        {

            $account_settings = new USERS();

            $data = $account_settings->Get_Account_Settings();

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

        public function Messages()
        {

            $direct_messages = new DIRECT_MESSAGES();

            $data = $direct_messages->Get();

            $messages = array();

            $messages['to_me']  = $this->Make_Request($data['url'], $data['parameters'], $data['method']);

            $data = $direct_messages->Sent();

            $messages['from_me']  = $this->Make_Request($data['url'], $data['parameters'], $data['method']);

            return $messages;

        }

        public function Search($query)
        {

            $search = new SEARCH();

            $data = $search->Tweets($query);

            return $this->Make_Request($data['url'], $data['parameters'], $data['method']);

        }

    }

?>
