<?php

    /*

        GreyOS Inc. - Integrated YouTube

        File name: i_youtube.php (Version: 1.8)
        Description: This file contains the Integrated YouTube extension.

        Coded by Slavenko Bozic (slawe)

        GreyOS Inc.
        Copyright © 2014

    */



    // Disable error reporting
    error_reporting(0);
    ini_set('display_errors', '0');

    class YOUTUBE
    {

        public $Request_Result;

        private $Alt;
        private $Alt_2;
        private $Front;
        private $Token;
        private $Start_Index = 1;
        private $Max_Results = 10;
        private $Curl_Time_Out = 25;
        private $Error_Code = 0;
        private $Developer_Key = 'AIzaSyBuGo9Mme-wJpdiLDakPDGii9KHKeRzRAE';
        private $Client_Secret = '9NkzVjYrtohCToN9arCUv9oG';
        private $Client_Id = '214545167282-dlajnkccsdmcbfso2ue2pe266n7u3919.apps.googleusercontent.com';
        private $Grant_Type = "authorization_code";
        private $Order_Results_By = 'relevance';
        private $Search_Query = '';
        private $Error_Message = '';
        private $Raw_XML = '';
        private $Feed = array(
            'videos' => 'feeds/api/videos',
            'users' => 'feeds/api/users',
            'public_playlists' => 'feeds/api/playlists',
            'my' => 'feeds/api/users/default',
            'events' => 'feeds/api/users/default/events',
            'subtivity' => 'feeds/api/users/default/subtivity',
            'inbox' => 'feeds/api/users/default/inbox',
            'contacts' => 'feeds/api/users/default/contacts',
            'favorites' => 'feeds/api/users/default/favorites',
            'playlists' => 'feeds/api/users/default/playlists',
            'uploads' => 'feeds/api/users/default/uploads',
            'subscriptions' => 'feeds/api/users/default/subscriptions',
            'watch_history' => 'feeds/api/users/default/watch_history',
            'watch_later' => 'feeds/api/users/default/watch_later',
            'suggestion' => 'feeds/api/users/default/suggestion',
            'images' => 'feeds/api/partners/default/images',
            'options' => 'feeds/api/partners/default/branding/default',
            'top_rated' => 'feeds/api/standardfeeds/top_rated',
            'most_viewed' => 'feeds/api/standardfeeds/most_viewed',
            'most_recent' => 'feeds/api/standardfeeds/most_recent',
            'recently_featured' => 'feeds/api/standardfeeds/recently_featured',
            'watch_on_mobile' => 'feeds/api/standardfeeds/watch_on_mobile'
        );

        const ERROR_NO_SEARCH_TERMS = 1;
        const ERROR_RETURNED_BLANK = 2;
        const ERROR_XML_EXCEPTION = 3;
        const ERROR_CURL_INIT = 4;
        const ERROR_CURL_EXEC = 5;
        const ERROR_FOPEN_FAIL = 6;
        const URI_BASE = 'https://gdata.youtube.com/';

        public function __construct()
        {

            $this->Token = $this->Check_Token();
            $this->Front = new FRONT();

            $params = array();

            if (is_array($params))
            {

                $params['alt'] = 'json';
                $params['v'] = 2;
                $params['key'] = $this->Developer_Key;
                $params['access_token'] = $this->Token;

            }

            $this->Alt = '?' . http_build_query($params);
            $this->Alt_2 = '?' . mb_substr(http_build_query($params), 9);

        }

        public function Client()
        {

            $id = $this->Client_Id;

            return $id;

        }

        public function Oauth($code, $redirect_uri)
        {

            $url = 'https://accounts.google.com/o/oauth2/token';

            $params = array(
                'code' => $code,
                'redirect_uri' => $redirect_uri,
                'client_id' => $this->Client_Id,
                'client_secret' => $this->Client_Secret,
                'grant_type' => $this->Grant_Type
            );

            $curl = curl_init($url);
            
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);        

            $output = curl_exec($curl);

            curl_close($curl);
            
            return $output;

        }
        
        private function Refresh_token($refresh_token)
        {
            
            $url = "https://accounts.google.com/o/oauth2/token";
            
            $params = array(
                'client_id' => $this->Client_Id,
                'client_secret' => $this->Client_Secret
            );
            
            $params['refresh_token'] = $refresh_token;
            $params['grant_type'] = 'refresh_token';

            $curl = curl_init($url);

            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

            $output = curl_exec($curl);
            
            curl_close($curl);

            return $output;
            
        }

        public function Get_My_Profile()
        {

            if ($this->Token == '' || $this->Developer_Key == '')
                return 'Authorization required';
            
            $option = array(
                'part' => 'statistics', 
                'mine' => 'true',
                'key' => $this->Developer_Key
            );
        
            $url = 'https://www.googleapis.com/youtube/v3/channels?' . http_build_query($option, 'a', '&');

            $curlheader[0] = "Authorization: Bearer " . $this->Token;

            $curl = curl_init();

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_ANY);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
            curl_setopt($curl, CURLOPT_HTTPHEADER, $curlheader);
            
            $output = curl_exec($curl);
            
            curl_close($curl);
            
            return $output;
            
        }

        private function Api_Call($url, $params, $method = 'get')
        {

            if ($method === 'get')
                return $base = self::URI_BASE . $url . $this->Alt;

            if ($method === 'set')
                return $base = self::URI_BASE . $url . $this->Alt_2;

            $curlheader[0] = 'Authorization: Bearer ' . $this->Token . '';
            $curlheader[1] = 'X-GData-Key: key=' . $this->Developer_Key . '';
            $curlheader[2] = 'Host: gdata.youtube.com';
            $curlheader[3] = 'Content-Type: application/atom+xml';
            $curlheader[4] = 'Content-Length: ' . strlen($params);
            $curlheader[5] = 'GData-Version: 2';

            $curl = curl_init();
            
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $curlheader);
            
            if ($method === 'post')
            {
                
                curl_setopt ($curl, CURLOPT_POST, true);
                curl_setopt ($curl, CURLOPT_POSTFIELDS, $params);
                
            }
            
            if ($method === 'put')
            {

                curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
                curl_setopt ($curl, CURLOPT_POSTFIELDS, $params);

            }

            if ($method === 'delete')
                curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');

            $output = curl_exec($curl);
            
            curl_close($curl);

            $validate = $this->Check_Errors($output);
            
            if ($validate['is_error'] == 'No')
            {
                
                unset($validate);
                
                return 'Success';
                
            }
            
            else
            {
                
                $result = array();
                $result['is_error'] = $validate['is_error'];
                $result['error'] = $validate['error'];
                
                unset($validate);
                
                return $result;
                
            }
            
        }
        
        public function Create_New_Channel($name)
        {

            $params = '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <yt:username>' . $name . '</yt:username>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['my'];

            $create = $this->Api_Call($url, $params, 'put');

            return $create;

        }

        public function Channel_Info($options)
        {

            $options = array(
                'title' => $title,
                'about' => $about,
                'tag' => $tags,
                'module_title' => $m_title,
                'list' => $list
            );

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom"
                       xmlns:yt="http://gdata.youtube.com/schemas/2007"
                       xmlns:gd="http://schemas.google.com/g/2005">
                            <yt:option name="channel.global.title.string">' . $title . '</yt:option>
                            <yt:option name="channel.global.title.description">' . $about . '</yt:option>
                            <yt:option name="channel.global.keywords.string">' . $tags . '</yt:option>
                            <yt:option name="channel.featured_channels_module1.title.string">' . $m_title . '</yt:option>
                            <yt:option name="channel.featured_channels_module1.channel_name.list">' . $list . '</yt:option>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['options'];

            $info = $this->Api_Call($url, $params, 'put');

            return $info;

        }
        
        public function Channel_Images($profile, $background, $height, $case)    // Not finished, need extra check
        {

            if ($case === 1)
            {

                $params = '';
                $url = self::URI_BASE . $this->Feed['images'] . '/' . $profile;

            }

            else if ($case === 2)
            {

                $params = '<?xml version="1.0" encoding="UTF-8"?>
                           <entry xmlns="http://www.w3.org/2005/Atom"
                           xmlns:gd="http://schemas.google.com/g/2005"
                           xmlns:yt="http://gdata.youtube.com/schemas/2007"
                           gd:fields="yt:option[@name="channel.background.image.url" or
                           @name="channel.banner.image_height.int"]">
                                <yt:option name="channel.background.image.url">' . $background . '</yt:option>
                                <yt:option name="channel.banner.image_height.url">' . $height . '</yt:option>
                           </entry>';

                $url = self::URI_BASE . $this->Feed['options'];

            }

            $images = $this->Api_Call($url, $params, 'post');

            return $images;

        }

        public function Search($keywords, $record_want, $start_index)
        {
            
            if (intval($record_want) > 0)
                $this->Max_Results = $record_want;
            
            if (intval($start_index) > 0)
                $this->Start_Index = $start_index;
            
            return $this->Send_Request('search', $keywords);

        }

        private function Send_Request($method, $search_terms = '')
        {
            
            if (!empty($search_terms))
                $this->Search_Query = $search_terms;
            

            if ($method == 'search')
            {
                $this->Search_Query = trim($this->Search_Query);

                if (empty($this->Search_Query))
                {
                    
                    $this->Set_Error(self::ERROR_NO_SEARCH_TERMS);
                    return false;
                    
                }
                
            }

            $request_uri = $this->Get_Request_Uri($method);
            $result_xml = trim($this->Send_Get_Request($request_uri));

            $this->Raw_XML = $result_xml;
            
            if ($result_xml === false || $this->Error_Code > 0)
                return false;

            if (empty($result_xml))
            {
                
                $this->Set_Error(self::ERROR_RETURNED_BLANK);
                return false;
                
            }

            try
            {
                
                $this->Request_Result = new SimpleXMLElement($result_xml);
                
            }
            
            catch (Exception $exception)
            {
                
                $this->Set_Error(self::ERROR_XML_EXCEPTION, $exception->get_message());
                return false;
                
            }

            return true;

        }

        private function Send_Get_Request($uri)
        {
            
            if (function_exists('curl_init'))
                return $this->Request_Using_Curl($uri);

            return $this->Request_Using_Fopen($uri);

        }

        private function Request_Using_Curl($url)
        {
            
            $connection = @curl_init();

            if (!$connection)
            {
                
                $this->Set_Error(self::ERROR_CURL_INIT);
                return false;
                
            }

            curl_setopt($connection, CURLOPT_URL, $url);
            curl_setopt($connection, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($connection, CURLOPT_FAILONERROR, true);
            curl_setopt($connection, CURLOPT_CONNECTTIMEOUT, $this->Curl_Time_Out);
            curl_setopt($connection, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($connection, CURLOPT_SSL_VERIFYPEER, 0);

            $data = curl_exec($connection);
            if ($data === false)
            {
                
                $this->Set_Error(self::ERROR_CURL_EXEC, 'Error ' 
                    . curl_errno($connection) . ': ' . curl_error($connection));
                
                return false;
                
            }

            curl_close($connection);

            return $data;

        }

        private function Request_Using_Fopen($url)
        {

            $data = '';
            $connection = @fopen($url, 'rb');

            if (!$connection)
            
                $this->Set_Error(self::ERROR_FOPEN_FAIL);
                return false;

            while (!@feof($connection))
            
                $data .= @fgets($connection, 4096);

            @fclose($connection);

            return $data;

        }

        private function Get_Request_Uri($type = 'search')
        {
            
            switch ($type)
            {
                
                case 'search':
                    return self::URI_BASE . $this->Feed['videos'] . 
                           '?q=' . urlencode($this->Search_Query) . 
                           '&orderby=' . $this->Order_Results_By . 
                           '&start-index=' . $this->Start_Index . 
                           '&max-results=' . $this->Max_Results . 
                           '&v=2';
            
            }
            
            return true;

        }

        public function Top_Rated_Videos()
        {

            $url = self::URI_BASE . $this->Feed['top_rated'];
            $list = $this->Parser_videos($url, 1);

            return $list;

        }

        public function Channel()
        {

            $feed = $this->Api_Call($this->Feed['my']);

            $profile = file_get_contents($feed);
            $output = json_decode($profile);

            return $output;

        }

        public function My_Events()
        {

            $feed = $this->Api_Call($this->Feed['events']);

            $profile = file_get_contents($feed);
            $output = json_decode($profile);

            $return = '<ol>';

            foreach ($output->feed->entry as $events)
                $return .= '<li>' . $events->title->{'$t'} . '</li>';

            $return .= '</ol>';

            echo $return;

            return $output;

        }

        public function Inbox()
        {
            
            $feed = $this->Api_Call($this->Feed['inbox']);

            $content = file_get_contents($feed);
            $inbox = json_decode($content);

            return $inbox;

        }

        public function Contacts()
        {

            $feed = $this->Api_Call($this->Feed['contacts']);

            $content = file_get_contents($feed);
            $contacts = json_decode($content);

            return $contacts;

        }

        public function Watch_History()
        {

            $params = '';
            $history = $this->Api_Call($this->Feed['watch_history'], $params, 'set');

            return $this->Parser_videos($history, 2);

        }

        public function Watch_History_Remove($video)
        {

            $params = '';
            $url = self::URI_BASE . $this->Feed['watch_history'] . '/' . $video;

            return $this->Api_Call($url, $params,  'delete');

        }

        public function Watch_History_Clear()
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom">
                       </entry>';

            $url = self::URI_BASE . $this->Feed['watch_history'] . '/actions/clear';

            $clear = $this->Api_Call($url, $params,  'delete');

            return $clear;

        }

        public function Watch_Later()
        {

            $params = '';
            $later = $this->Api_Call($this->Feed['watch_later'], $params, 'set');

            return $this->Parser_videos($later, 2);

        }

        public function Subscriptions_List()
        {

            $url = $this->Api_Call($this->Feed['subscriptions']);

            $content = file_get_contents($url);
            $subscriptions = json_decode($content);

            foreach ($subscriptions->feed->entry as $channels)
                echo $this->Front->Channel_List_Raw ($channels, 2);

            return $subscriptions;

        }

        public function Subscriptions_Video_List($user)     // not finished
        {

            $feed = self::URI_BASE . $this->Feed['users'] . '/' . $user . '/newsubscriptionvideos';

            return $feed;

        }

        public function Subscriptions_Add_User($user)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <category scheme="http://gdata.youtube.com/schemas/2007/subscriptiontypes.cat" term="user"/>
                            <yt:username>' . $user . '</yt:username>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['subscriptions'];

            $add = $this->Api_Call($url, $params, 'post');

            return $add;

        }

        public function Subscriptions_Add_Channel($channel)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <category scheme="http://gdata.youtube.com/schemas/2007/subscriptiontypes.cat" term="channel"/>
                            <yt:username>' . $channel . '</yt:username>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['subscriptions'];

            $add = $this->Api_Call($url, $params, 'post');

            return $add;

        }

        public function Subscriptions_Remove($subscription_id)
        {

            $params = '';
            $url = self::URI_BASE . $this->Feed['subscriptions'] . '/' . $subscription_id;

            $remove = $this->Api_Call($url, $params,  'delete');

            return $remove;

        }

        public function Playlists_Get()
        {

            $params = '';
            $url = $this->Feed['playlists'];
            //$url .= '&start-index=' . $this->Start_Index . 
            //            '&max-results=' . $this->Max_Results . 
            //            '&strict=true';

            $playlist = $this->Api_Call($url, $params);
            
            $list = file_get_contents($playlist);
            $res = json_decode($list);

            foreach ($res->feed->entry as $name)
            {

                echo 'Name: ' . $name->title->{'$t'} . '<br>';
                echo 'Description: ' . $name->summary->{'$t'} . '<hr>';

            }

            return $res;

        }
        
        public function Playlist_Thumbnail($playlist)
        {

            $url = 'http://www.youtube.com/view_play_list?p=' . $playlist;

            $response = $this->Api_Call($url);
            
            $output = $response['output'];
            $img_reg_ex = '/src=\"(.*)\"[\s]+class=\"vimgCluster180 yt-uix-hovercard-target\"/';
            $res = preg_match_all($img_reg_ex, $output, $matches, PREG_PATTERN_ORDER);
            $images = @$matches[1];

            return @$images[0];

        }

        public function Playlist_All_Videos($playlist)
        {

            $params = '';
            $url = $this->Feed['playlists'] . '/' . $playlist;
            //$url .= '&start-index=' . $this->Start_Index . 
            //            '&max-results=' . $this->Max_Results . 
            //            '&strict=true&safeSearch=strict';

            $list = $this->Api_Call($url, $params, 'set');
            
            //$video_list = $this->Parser_videos($list, 2);

            $result = array();

            $validate = $this->Check_Errors($list);

            if($validate['is_error'] == 'No')
            {
                
                $xml = $validate['xml'];

                $tmp = $xml->xpath("openSearch:totalResults");
                $tmp_totalresults = (string)$tmp[0];
                $tmp = $xml->xpath("openSearch:startIndex");

                $result['start_index'] = (string)$tmp[0];
                $result['items_per_page'] = $this->Max_Results;
                $result['title'] = (string)$xml->title;
                $result['subtitle'] = (string)$xml->subtitle;
                $result['total_results'] = count($res);
                $result['result'] = $res;

                unset($res);
                unset($res);
                unset($xml);

            }

            else
            {
                
                $result['is_error'] = $validate['is_error'];
                $result['error'] = $validate['error'];

            }

            unset($validate);

            return $result;

        }

        public function Playlist_Create($title, $description)
        {

            $url = self::URI_BASE . $this->Feed['playlists'];
            
            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <title type="text">' . $title . '</title>
                            <summary>' . $description . '</summary>
                       </entry>';

            $create = $this->Api_Call($url, $params, 'post');
            
            return $create;
            
        }
        
        public function Playlist_delete($playlist)
        {

            $params = '';
            $url = self::URI_BASE . $this->Feed['playlists'] . '/' . $playlist ;

            $delete = $this->Api_Call($url, $params, 'delete');

            return $delete;

        }
        
        public function Playlist_Add_Video($playlistId, $video_id)
        {

            $url = self::URI_BASE . $this->Feed['public_playlists'] . $playlistId;
            
            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <id>' . $video_id . '</id>
                       </entry>';
            
            $add = $this->Api_Call($url, $params, 'post');
            
            return $add;
            
        }
        
        public function Playlist_Delete_Video($playlist, $video)
        {

            $params = '';
            $url = self::URI_BASE . $this->Feed['playlists'] . '/' . $playlist . '/' . $video;

            $delete = $this->Api_Call($url, $params, 'delete');

            return $delete;

        }

        public function Playlist_Change_Video_Position($playlist, $video, $number)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <yt:position>' . $number . '</yt:position>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['playlists'] . '/' . $playlist . '/' . $video;

            $move = $this->Api_Call($url, $params, 'put');

            return $move;

        }

        public function Favorites_List($record_want, $start_index)
        {
            
            if (intval($record_want) > 0)
                $this->Max_Results = $record_want;
            
            if (intval($start_index) > 0)
                $this->Start_Index = $start_index;

            $params = '';
            $favorites = $this->Api_Call($this->Feed['favorites'], $params, 'set');

            return $this->Parser_videos($favorites, 2);

        }
        
        public function Favorite_Add($video_id)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom">
                            <id>' . $video_id . '</id>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['favorites'];

            $add = $this->Api_Call($url, $params, 'post');
            
            return $add;
            
        }
        
        public function Favorite_Remove($video_id)
        {

            $params = '';
            $url = self::URI_BASE . $this->Feed['favorites'] . '/' . $video_id;
            
            return $this->Api_Call($url, $params,  'delete');

        }
        
        public function Channel_Suggestions()
        {
            
            $url = self::URI_BASE . $this->Feed['suggestion'] . $this->Alt . '&type=channel&inline=true';
            
            $content = file_get_contents($url);
            $suggestion = json_decode($content);

            foreach ($suggestion->feed->entry as $channels)
                echo $this->Front->Channel_List_Raw ($channels, 1);

            return $suggestion;

        }

        public function Add_Comments($video_id, $comment)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <content>' . $comment . '</content>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['videos'] . '/' . $video_id . '/comments';

            $output = $this->Api_Call($url, $params, 'post');

            return $output;

        }
        
        public function Send_Message($video_id, $message, $recepient)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <id>' . $video_id . '</id>
                            <summary>' . $message .'</summary>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['users'] . '/' . $recepient . '/inbox';

            $output = $this->Api_Call($url, $params, 'post');

            return $output;

        }

        public function Uploads_List()
        {

            $params = '';
            $uploads = $this->Api_Call($this->Feed['uploads'], $params, 'set');
            
            return $this->Parser_videos($uploads, 2);

        }

        public function Uploads_Delete($video_id)
        {

            $params = '';
            $url = self::URI_BASE . $this->Feed['uploads'] . '/' . $video_id;
            return $this->Api_Call($url, $params,  'delete');

        }

        public function Upload_Video($file, $title, $description, $category, $tag)
        {

            $f_data = file_get_contents($file);
            
            $xml_data = '<?xml version="1.0"?>
                         <entry xmlns="http://www.w3.org/2005/Atom"
                         xmlns:media="http://search.yahoo.com/mrss/"
                         xmlns:yt="http://gdata.youtube.com/schemas/2007">
                         <media:group>
                         <media:title type="plain">' . $title . '</media:title>
                         <media:description type="plain">' . $description . '</media:description>
                         <media:category scheme="http://gdata.youtube.com/schemas/2007/categories.cat">' . $category . '</media:category>
                         <media:keywords>' . $tag . '</media:keywords>
                         </media:group>
                         </entry>';
            
            $url = self::URI_BASE . $this->Feed['uploads'];
            // This part of the code MUST ignore the coding style
            $data = '--f93dcbA3 Content-Type: application/atom+xml; charset=UTF-8

' . $xml_data . '
--f93dcbA3
Content-Type: video/mp4
Content-Transfer-Encoding: binary

' . $f_data . '
--f93dcbA3--';
// End
  
            $curlheader[0] = 'Host: uploads.gdata.youtube.com';
            $curlheader[1] = 'Authorization: Bearer ' . $this->Token . '';
            $curlheader[2] = 'GData-Version: 2';
            $curlheader[3] = 'X-GData-Key: key=' . $this->Developer_Key . '';
            $curlheader[4] = 'Slug: ' . $file;
            $curlheader[5] = 'Content-Type: multipart/related; boundary=\'f93dcbA3\'';
            $curlheader[6] = 'Content-Length: ' . strlen($data);
            $curlheader[7] = 'Connection: close';

            $curl = curl_init();
            
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $curlheader);
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

            $output = curl_exec($curl);
            $info = curl_getinfo($curl);
            //print_r($info);

            curl_close($curl);

            unset($f_data);
            
            $validate = $this->Check_Errors($output);

            if ($validate['is_error'] == 'No')
            {

                $xml = $validate['xml'];

                $web_site = 'http://www.youtube.com/';
                $criteria = 'uploads';
                $media_info = array();
                
                $gd_media = $xml->children('http://schemas.google.com/g/2005');
                $media = $xml->children('http://search.yahoo.com/mrss/');
                $yt_media = $xml->children('http://gdata.youtube.com/schemas/2007');
                $georss_media = $xml->children('http://www.georss.org/georss');

                if ($media->group->title)
                    $media_info['title'] = sprintf('%s', $media->group->title[0]);
                
                else
                    $media_info['title'] = '';
                
                if ($media->group->description)
                    $media_info['description'] = sprintf('%s', $media->group->description[0]);
                
                else
                    $media_info['description'] = '';
                
                if ($media->group->player)
                {

                    $video = $media->group->player[0]->attributes()->url;
                    
                    $v_link = preg_replace('/=/', '/', $video);
                    $video_link = preg_replace('/\?/', "/", $v_link);
                    $media_info['url'] = $video_link . '&hl=en&fs=1';
                    $test_str = preg_split('/\/v\//', $video_link, 2);
                    $video_id_array = preg_split('/&/', $test_str[1], 2);
                    $media_info['id'] = $video_id_array[0];
                    
                }
                
                else
                {
                    
                    if ($entry->link[0]->attributes()->href)
                    {
                        
                        $video = $entry->link[0]->attributes()->href;
                        $v_link = preg_replace('/=/', "/", $video);
                        $video_link = preg_replace('/\?/', "/", $v_link);
                        $media_info['url'] = $video_link . "&hl=en&fs=1";
                        $test_str = preg_split('/\/v\//', $video_link, 2);
                        $video_id_array = preg_split('/&/', $test_str[1], 2);
                        $media_info['id'] = $video_id_array[0];
                        
                    }
                    
                    else
                        return 'video not found.';
                    
                }
                
                $media_info['path_url'] = $media_info['contentUrl'];
                $media_info['website'] = $web_site;
                $media_info['genre'] = sprintf('%s', @$media->group->category[0]);
                $media_info['criteria'] = $criteria;

                unset($xml);
                unset($gd_media);
                unset($media);
                unset($yt_media);
                unset($georss_media);

                if (file_exists($file))
                    unlink($file);

                return $media_info;
                
            }
            
            else
            {
                
                $result = array();
                $result['is_error'] = $validate['is_error'];
                $result['error'] = $validate['error'];
                
                unset($validate);
                
                return $result;
                
            }
            
        }

        public function Adding_Like($video)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <yt:rating value="like"/>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['videos'] . '/' . $video . '/ratings';

            $like = $this->Api_Call($url, $params, 'post');

            return $like;

        }

        public function Adding_Dislike($video)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:yt="http://gdata.youtube.com/schemas/2007">
                            <yt:rating value="dislike"/>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['videos'] . '/' . $video . '/ratings';

            $dislike = $this->Api_Call($url, $params, 'post');

            return $dislike;

        }

        public function Adding_Numeric_Rating($video, $value)
        {

            $params = '<?xml version="1.0" encoding="UTF-8"?>
                       <entry xmlns="http://www.w3.org/2005/Atom" xmlns:gd="http://schemas.google.com/g/2005">
                            <gd:rating value="' . $value . '" min="1" max="5"/>
                       </entry>';

            $url = self::URI_BASE . $this->Feed['videos'] . '/' . $video . '/ratings';

            $rating = $this->Api_Call($url, $params, 'post');

            return $rating;

        }

        public function Check_Errors($response)
        {

            $result = array();
            $result['is_error'] = 'No';
            $reg_ex = '<h1>Bad Request</h1>';
            
            $res = preg_match_all($reg_ex, $response, $matches);

            if (!empty($matches[0]))
            {
                
                $result['is_error'] = 'Yes';
                $result['error'] = "Bad Request";
                
            }
            
            else
            {

                $xml = @simplexml_load_string($response);
                
                if ($xml === false && $response != '')
                {
                    
                    $result['error'] = $response;
                    $result['is_error'] = 'Yes';
                    
                }
                
                else
                {

                    if (@$xml->error)
                    {

                        $msg = @(string) $xml->error->code . ':' . @(string) $xml->error->internalReason;
                        unset($xml);
                        $result['error'] = $msg;
                        $result['is_error'] = 'Yes';
                        
                    }
                    
                    else
                        $result['xml'] = $xml;

                }
                
            }
            
            unset($xml);
            unset($response);
            
            return $result;
            
        }

        private function Set_Error($Error_Code, $Error_Message = '')
        {
            
            switch ($Error_Code)
            {
                
                case self::ERROR_NO_SEARCH_TERMS:
                    $this->Error_Code = $Error_Code;
                    $this->Error_Message = 'No search terms entered.';
                    break;
                case self::ERROR_RETURNED_BLANK:
                    $this->Error_Code = $Error_Code;
                    $this->Error_Message = 'YouTube returned a blank response.';
                    break;
                case self::ERROR_CURL_INIT:
                    $this->Error_Code = $Error_Code;
                    $this->Error_Message = 'Unable to initialise cURL.';
                    break;
                case self::ERROR_FOPEN_FAIL:
                    $this->Error_Code = $Error_Code;
                    $this->Error_Message = 'Unable to open the remote URL using fopen.';
                    break;
                case self::ERROR_XML_EXCEPTION:
                case self::ERROR_CURL_EXEC:
                    $this->Error_Code = $Error_Code;
                    $this->Error_Message = $Error_Message;
                    break;
                
            }
            
            return true;

        }
        
        public function Get_Error_Code()
        {

            return $this->Error_Code;

        }

        public function Get_Error_Message()
        {

            return $this->Error_Message;

        }
        
        public function Simple_Youtube_Parse($url)
        {
            
            $youtube = "http://www.youtube.com/oembed?url=". $url ."&format=json";
            
            $curl = curl_init($youtube);
 
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
 
            $return = curl_exec($curl);
 
            curl_close($curl);
 
            return json_decode($return, true);
            
        }

        public function Parser_videos($url, $case)
        {

            $xml = simplexml_load_file(sprintf($url . '&start-index=' . $this->Start_Index . '&max-results=' . $this->Max_Results));  // this is temporary, waiting on pagin logic

            $counter = count($xml->entry);

            $return = '<div class="yt_search_results_container">';

            foreach ($xml->entry as $video)
                $return .= $this->Front->Video_List_Raw($video, $counter, $case);

            $return .= '</div>';

            echo $return;

            return $xml;

        }
        
        private function Check_Token()
        {

            $current = date('Y-m-d H:i:s');

            $select = ALPHA_CMS::Execute_SQL_Command('SELECT `youtube_expires_token`, `youtube_refresh_token`
                                                      FROM `oauth_youtube`
                                                      WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');

            if ($current < $select[0]['youtube_expires_token'])
            {

                $result = ALPHA_CMS::Execute_SQL_Command('SELECT `youtube_token`
                                                          FROM `oauth_youtube`
                                                          WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');

                $token = $result[0]['youtube_token'];

                if ($result === false)
                exit();

            }

            else
            {

                $response = $this->Refresh_token($select[0]['youtube_refresh_token']);
                $res = json_decode($response);

                $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `oauth_youtube` 
                                                          SET `youtube_token` = "' . $res->access_token . '",
                                                              `youtube_expires_token` = "' . date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s'). ' +' . $res->expires_in . ' seconds')) . '",
                                                              `active` = "1",
                                                              `ip` = "' . $_SERVER['REMOTE_ADDR'] . '" 
                                                              WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"', 1);

                $token = $res->access_token;

                if ($result === false)
                exit();

            }

            return $token;

        }

    }

?>
