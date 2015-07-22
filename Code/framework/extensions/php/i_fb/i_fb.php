<?php
	
    /*

        GreyOS Inc. - i_fb PHP extension
        
        Version: 1.0
        
        File name: i_fb.php
        Description: This file contains the i_fb PHP extension.
        
        Coded by Zlatko Jankovic
        
        GreyOS Inc.
        Copyright © 2014
   
    */
    
    require_once(ALPHA_CMS::Absolute_Path('') . 'framework/extensions/php/i_fb/fb/fb.php');

    // Include Thor extension in order to secure Facebook inputs.
    ALPHA_CMS::Load_Extension('thor', 'php');

    class I_FB extends FB
    {
        
        public function __construct($config)
        {

            parent::__construct($config);

        }
        
        public function Login()
        {
            
            $login_url = $this->Get_Login_Url(array('display' => 'popup',
                                                    'scope' => 'read_friendlists, read_stream, read_mailbox, read_insights, read_requests, xmpp_login,
                                                                status_update, publish_stream, user_groups, manage_pages, manage_notifications,
                                                                user_photos, friends_photos'));
            
            return $login_url;
            
        }
        
        public function Update_Database()
        {
            
            $counter = ALPHA_CMS::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                   FROM `oauth_facebook` 
                                                   WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');
                
            if ($counter[0]['num'] > 0)
            {

                $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `oauth_facebook` 
                                                          SET `facebook_access_token` = "' . $this->Get_Access_Token() . '", 
                                                              `active` = "1"
                                                          WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"', 1);
                
                if ($result === false)
                    exit();
                
                return true;
                
            }

            else
            {
                
                $user = $this->Get_User();
                
                $name = json_decode(file_get_contents('http://graph.facebook.com/' . $user .'?fields=name'))->name;

                $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `oauth_facebook` (`user_id`, `facebook_access_token`, 
                                                                                        `facebook_id`, `facebook_name`,
                                                                                        `request_check_time`,
                                                                                        `message_check_time`,
                                                                                        `notification_check_time`,
                                                                                        `active`)
                                                          VALUES ("' . $_SESSION['TALOS']["id"] . '", "' . 
                                                                       $this->Get_Access_Token() . '", "' .
                                                                       $user . '", "' . 
                                                                       $name . '",
                                                                       "0",
                                                                       "0",
                                                                       "0",
                                                                       "1"
                                                                       )', 1);

                if ($result === false)
                  exit();
                
                $this->Update_Ids();

            }
                      
        }
        
        public function Update_Ids()
        {
            
            $own_name = ALPHA_CMS::Execute_SQL_Command('SELECT `facebook_name` AS `fb_name`
                                                       FROM `oauth_facebook` 
                                                       WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');
            
           
                    
            $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `facebook_ids` (`id`, `user_id`, `fb_id`, `fb_name`)
                                                          VALUES ("' . $_SESSION['TALOS']["id"] . '", "' . 
                                                                       $this->My_Id . '", "' . 
                                                                       $own_name[0]['fb_name'] . '")', 1);

            if ($result === false)
              exit();
            
            $friendlist = $this->Friendlist();
            
            $friendlist_size = count($friendlist);
            
            for ($i = 0; $i < $friendlist_size; $i++)
            {
                
                $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `facebook_ids` (`id`, `user_id`, `fb_id`, `fb_name`)
                                                          VALUES ("' . $_SESSION['TALOS']["id"] . '", "' . 
                                                                       $friendlist[$i]['uid'] . '", "' . 
                                                                       $friendlist[$i]['name'] . '")', 1);

                if ($result === false)
                  exit();       
                
            }
            
        }
        
        public function Get_Wall_Posts($from = 0)
        {
            
            $fql = "select action_links, actor_id, attachment, comment_info, created_time, description, description_tags, feed_targeting, impressions,
                           is_published, like_info, likes, message, message_tags, permalink, place, post_id, privacy, promotion_status, share_count, share_info, source_id,
                           subscribed, tagged_ids, target_id, targeting, timeline_visibility, type, updated_time, via_id, with_location, with_tags, xid
                    from stream 
                    where filter_key
                    in (select filter_key from stream_filter where uid=me() and type='newsfeed') and type in (46, 60, 65, 80, 247, 347 , 373) and is_hidden = 0 limit 30 offset " . $from;
            $param = array('method' => 'fql.query',
                           'query' => $fql);
            $wall = $this->Api($param);
            
            return $wall;
            
        }
        
        public function Thread_Query()
        {
            
            $fql = 'select thread_id, snippet_author, snippet, unread, updated_time, recipients, recent_authors from thread where folder_id = 0';
 
            $param = array('method' => 'fql.query',
				 'query' => $fql);

            $inbox = $this->Api($param);
            
            return $inbox;
            
        }
        
        

        public function Friendlist()
        {
            
            $fql_friends = "select name, uid from user where uid in 
                           (select uid1 from friend where uid2=me())";
            $param = array('method' => 'fql.query',
                           'query' => $fql_friends);
            $friendlist = $this->Api($param);
            
            return $friendlist;
            
            
        }
        
        public function See_Post($id)
        {
            
            $fql = 'select action_links, actor_id, attachment, comment_info, created_time, description, description_tags, feed_targeting, impressions,
                    is_published, like_info, message, message_tags, permalink, place, post_id, privacy, promotion_status, share_count, share_info,
                    source_id,subscribed, tagged_ids, target_id, targeting, timeline_visibility, type, updated_time, via_id, with_location, with_tags, xid
                    from stream
                    where post_id in 
                    (select object_id from notification where recipient_id = me() and notification_id = ' . $id . ')';

            $param = array('method' => 'fql.query',
                           'query' => $fql);
            $post = $this->Api($param);
            
            return $post;
            
        }


        public function Like_Post($id)
        {

            $this->Api('/' . $id . '/likes', 'post');

            return true;

        }
        
        public function Unlike_Post($id)
        {

            $this->Api('/' . $id . '/likes', 'delete');

            return true;

        }
        
        public function Send_Comment($object_id, $comment_message)
        {
            
            $comment_id = $this->Api('/' . $object_id . '/comments', 'post', array('message' => $comment_message));            
            
            return $comment_id;
            
        }
        
        public function Display_Groups()
        {

            $groups = $this->Api('/me/groups');
            print_r($groups);

            return true;

        }
        
        public function Display_Pages()
        {

            $pages = $this->Api('/me/accounts');
            print_r($pages);

            return true;

        }
        
        public function Display_Inbox()
        {
            
            $fql = 'select thread_id, snippet_author, snippet, unread, updated_time,
                    recipients, recent_authors from thread where folder_id = 0';
 
            $fql_query = array('method' => 'fql.query',
				 'query' => $fql);

            $fql_result = $this->Api($fql_query);

            return $fql_result;

        }
        
        public function Display_Message($id)
        {
			
            $fql = 'select recipients, unread, updated_time FROM thread WHERE thread_id = ' . $id;
 
            $fql_query = array('method' => 'fql.query',
                           'query' => $fql);

            $fql_result = $this->Api($fql_query);

            return $fql_result;

        }
        
        public function Get_All_Notifications()
        {
            
            $fql = 'select app_id, created_time, is_unread, notification_id, sender_id, title_text from notification where recipient_id = me()';
            $query = array('method' => 'fql.query',
                           'query' => $fql);
            $result = $this->Api($query);
            
            return $result;
            
        }
        
        public function See_One_Notification($id)
        {
            
            $fql = 'select app_id, object_id, recipient_id, sender_id, updated_time, object_type 
                    from notification where recipient_id = me() and notification_id = ' . $id;
            $fql_query = array('method' => 'fql.query',
                           'query' => $fql);
            $fql_result = $this->Api($fql_query);
            
            return $fql_result;
            
        }
        
        public function Get_Friend_Requests()
        {
            
            $fql = 'select message, time, uid_from, unread from friend_request where uid_to = me()';
            $fql_query = array('method' => 'fql.query',
                           'query' => $fql);
            $fql_result = $this->Api($fql_query);
            
            return $fql_result;           
            
        }
        
        public function Get_Mutual_Friends()
        {
            
            $fql = 'select name, mutual_friend_count from user where uid in 
                   (select uid_from from friend_request where uid_to = me())';
            $fql_query = array('method' => 'fql.query',
                           'query' => $fql);
            $fql_result = $this->Api($fql_query);
            
            return $fql_result;
            
        }
        
        public function Update_Status($message)
        {
            
            $this->Api('/me/feed', 'post', array('message' => $message));

            return true;                
                
        }
        
        public function Get_User_By_Id($id)
        {
            
            $user_name_by_id = ALPHA_CMS::Execute_SQL_Command('SELECT `fb_name` AS `name`
                                                       FROM `facebook_ids` 
                                                       WHERE `fb_id` = "' . $id . '"');
            
            if ($user_name_by_id[0]['name'])
                return $user_name_by_id[0]['name'];
                    
            else
                return false;   
            
        }
        
        public function Facebook_Time_Convert($created_at)
        {

            $current_timestampt = strtotime("now"); 

            $tweet_timestampt = $created_at; 

            $difference = $current_timestampt - $tweet_timestampt; 

            $minute = 60; 

            $hour = $minute * 60; 

            $day = $hour * 24; 

            if (is_numeric($difference) && $difference > 0) 
            { 

                if ($difference < 3) 
                    return "about a second ago"; 

                else if ($difference < $minute) 
                    return floor($difference) . " seconds ago"; 

                else if ($difference < $minute * 2) 
                    return "about a minute ago"; 

                else if ($difference < $hour) 
                    return floor($difference / $minute) . " minutes ago"; 

                else if ($difference < $hour * 2) 
                    return "about an hour ago"; 

                else if ($difference < $day) 
                    return floor($difference / $hour) . " hours ago"; 

                else if ($difference > $day && $difference < $day * 2) 
                    return "1 day ago"; 

                else if ($difference < $day * 365) 
                    return date('j M',$tweet_timestampt);

                else
                    return date('j M y',$tweet_timestampt);

            } 

            else
                return false;

        }
        
        public static function Make_Clickable($ret)
        {
            
            $ret = ' ' . $ret;

            $ret = preg_replace_callback('#([\s>])([\w]+?://[\w\\x80-\\xff\#$%&~/.\-;:=,?@\[\]+]*)#is', 'self::_Make_Url_Clickable', $ret);
            $ret = preg_replace_callback('#([\s>])((www|ftp)\.[\w\\x80-\\xff\#$%&~/.\-;:=,?@\[\]+]*)#is', 'self::_Make_Web_Ftp_Clickable', $ret);
            $ret = preg_replace_callback('#([\s>])([.0-9a-z_+-]+)@(([0-9a-z-]+\.)+[0-9a-z]{2,})#i', 'self::_Make_Email_Clickable', $ret);

            // this one is not in an array because we need it to run last, for cleanup of accidental links within links
            $ret = preg_replace("#(<a( [^>]+?>|>))<a [^>]+?>([^>]+?)</a></a>#i", "$1$3</a>", $ret);
            $ret = trim($ret);

            return $ret;

        }
        
        public static function _Is_YT_Video($url)
        {

            if (((stripos($url,'youtube.com')==true)||(stripos($url,'youtu.be')==true))&&(stripos($url,'watch?v')==true))
                return true;

            else
                return false;

        }
        
        public static function Get_Likes_Data($like_data, $my_id)
	{

            $result['like/unlike'] = 'like';

            foreach ($like_data as $likes)
            {
                
                if ($likes['id'] == $my_id)
                    $result['like/unlike'] = 'unlike';

            }

            $like_count = count($like_data);

            if ($like_count > 0)
            {
                
                if ($like_count < 5)
                {
                    
                    for ($k = 0; $k < $like_count; $k++)
                    {

                        if ($like_data[$k]['id'] == $my_id)
                            $result['title'] .= 'You';

                        else
                            $result['title'] .= $like_data[$k]['name'];

                        if (($k + 2) < $like_count)
                            $result['title'] .= ', ';

                        else if (($k + 1) < $like_count)
                            $result['title'] .= ' and ';

                    }

                    $result['title'] .= ' liked this';

                }

                else
                {

                    for ($k = 0; $k < 5; $k++)
                    {

                        if ($like_data[$k]['id'] == $my_id)
                            $result['title'] .= 'You, ';

                        else
                        {

                            if ($k !== 1)
                                $result['title'] .= $like_data[$k]['name'] . ', ';

                            else
                                $result['title'] .= $like_data[$k]['name'];
                        }

                    }

                    $result['title'] .= ' and ' . ($like_count - 5) . ' others liked this';

                }

            }

            else
                $result['title'] = 'Like this';

            $result['count'] = $like_count;

            return $result;
			
        }
        
        public function Send_Checkin($place_id)
        {
           
            $fql = 'select page_id, latitude, longitude from place where page_id = ' . $place_id;
           
            $fql_query = array('method' => 'fql.query',
                           'query' => $fql);

            $place = $this->Api($fql_query);
           
            $exact_latitude = $place[0]['latitude'];
            $exact_longitude = $place[0]['longitude'];

            $coordinates = array('latitude' => $exact_latitude, 
                                 'longitude' => $exact_longitude);

            $param = array('coordinates' => $coordinates,
                           'place' => $place_id);

            $checkin_id = $this->Api('/me/checkins', 'post', $param);
            
            if ($checkin_id === 0)
                return false;

            else
                return $checkin_id;
            
        }
        
        public function Query_Places($latitude, $longitude)
        {
            
            $fql = 'select page_id, name from place where distance(latitude, longitude, "' . $latitude . '", "' . $longitude . '") < 5000';
           
            $param = array('method' => 'fql.query',
                           'query' => $fql);

            $places = $this->Api($param);
            
            $counter = count($places);
            
            $options = array();
            
            if ($counter === 0)
                array_push($options, array('value' => '0', 'content' => 'No place nearby!'));
            
            else
                for ($i = 0; $i < $counter; $i++)
                    array_push($options, array('value' => $places[$i]['page_id'], 'content' => $places[$i]['name']));
            
            return $options;
            
        }
        
        public function Get_All_Albums()
        {
            
            $fql = 'select name, cover_object_id, object_id, photo_count from album where owner = me()';
            $param = array('method' => 'fql.query',
                           'query' => $fql);
            
            $albums = $this->Api($param);
            
            return $albums;
            
        }
        
        public function Get_Photo_From_Id($photo_id)
        {
            
            $fql = 'select src_big, src_big_width, src_big_height, object_id from photo where object_id = ' . $photo_id;
                
            $param = array('method' => 'fql.query',
                           'query' => $fql);
            
            $photo = $this->Api($param);
            
            return $photo;
            
        }
        
        public function Get_Photos_From_Album($id)
        {
            
            $fql = 'select src_big, src_big_width, src_big_height, caption, object_id from photo where album_object_id = ' . $id;
            $param = array('method' => 'fql.query',
                           'query' => $fql);
            
            $photos = $this->Api($param);
            
            return $photos;
            
        }
        
        public function Delete_Notification($id)
        {
            
            $this->Api('/notif_'. $this->my_id . '_' . $id .'?unread=0', 'post');
            
            return true;
                       
        }
        
        public function Clean_Unread_Message_Data()
        {
            
            $unread_messages = ALPHA_CMS::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                   FROM `fb_unread_messages` 
                                                   WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');
           
            $number_of_ids = $unread_messages[0]['num'];
            
            if ($number_of_ids)
            {
                
                $fql_clean = 'select thread_id, unread, updated_time from thread where folder_id = 0';
 
                $param_clean = array('method' => 'fql.query',
                                     'query' => fql_clean);

                $clean_messages = $this->Api($param_clean);

                $number_of_messages = count($clean_messages);
                
                for ($i = 0; $i < $number_of_ids; $i++)
                {
                    
                    $delete_id = true;
                    
                    for ($j = 0; $j < $number_of_messages; $j++)
                    {
                        
                       $delete_counter = ALPHA_CMS::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                   FROM `fb_unread_messages` 
                                                   WHERE `message_id` = "' . $clean_messages[$j]['thread_id'] . '"');
                       
                       if (($delete_counter[0]['num']) and ($fql_clean[$j]['unread']))
                               $delete_id = false;
                      
                    }
                    
                    if ($delete_id)
                        $result = ALPHA_CMS::Execute_SQL_Command('DELETE FROM `fb_unread_messages` 
                                                      WHERE `message_id` = "' . $clean_messages[$j]['thread_id'] . '"', 1);
                    
                }   
                
            }  
            
        }
        
    }

?>