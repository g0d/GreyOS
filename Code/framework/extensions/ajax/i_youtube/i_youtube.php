<?php

    /*

        GreyOS Inc. - Integrated YouTube

        File name: i_youtube.php (Version: 2.0)
        Description: This file contains the YouTube extension.

        Coded by Slavenko Bozic (slawe)

        GreyOS Inc.
        Copyright © 2014

    */



    // Disable error reporting
    error_reporting(0);
    ini_set('display_errors', '0');

    // Default Time
    date_default_timezone_set('Europe/Athens');
    $tmp_time_zone = date_default_timezone_get();
    date_default_timezone_set('UTC');

    // Initialize session support
    @session_start();

    if(isset($_FILES) && count($_FILES))
    {

        $max_size = 524288000;
        $file_size = filesize($_FILES['file_to_upload']['tmp_name']);
        $file_extension = strrchr($_FILES['file_to_upload']['name'], '.');

        $extensions = array('.MOV', '.MPEG4', '.MP4', '.AVI', '.WMV', '.MPEGPS', 
                            '.FLV', '.3GPP', '.WebM','.mov', '.mpeg4', '.mp4', 
                            '.avi', '.wmv', '.mpegps', '.flv', '.3gpp', '.webm');

        // Return false if extension is not allowed
        if(!in_array($file_extension, $extensions))
            return false;

        // Return false if file size is over limit
        if($file_size > $max_size)
            return false;

        move_uploaded_file($_FILES['file_to_upload']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . '/tmp/i_youtube/' . $_FILES['file_to_upload']['name']);

        echo $_SERVER['DOCUMENT_ROOT'] . '/tmp/i_youtube/' . $_FILES['file_to_upload']['name'];

        exit();

    }

    // Include ALPHA Framework class
    require_once('../../../alpha.php');

    // Include ALPHA CMS class
    require_once('../../../../cms/alpha_cms.php');

    // Include Thor extension in order to secure Youtube Search Input.
    ALPHA_CMS::Load_Extension('thor', 'php');

    // Include YouTube class
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_youtube/i_youtube.php'));
    
    // Include YouTube front class
    require_once (ALPHA_CMS::Absolute_Path('framework/extensions/php/i_youtube/classes/front.php'));

    $url = 'https://accounts.google.com/o/oauth2/auth';
    $redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/framework/extensions/ajax/i_youtube/i_youtube.php';
    $access_type = "offline";
    $approval_prompt = "force";
    $scope = "https://gdata.youtube.com";

    $youtube = new YOUTUBE();
    $draw = new FRONT();

    $params_request = array(
        'response_type' => 'code',
        'client_id' => $youtube->Client(),
        'redirect_uri' => $redirect_uri,
        'access_type' => $access_type,
        'approval_prompt' => $approval_prompt,
        'scope' => $scope
        );

    // This is the proper way to control AJAX call. Through POST statements.
    if (isset($_POST) && !empty($_POST))
    {

        if (isset($_POST['action']))
        {

            // This is POST[action] which is called everytime the bee is loaded.
            if ($_POST['action'] === 'load_main')
            {

                // If the Session Variable of Youtube isset , that means that the user is already logged in.
                if (isset($_SESSION['code']))
                    $draw->Search_Box();

                else
                {

                    // Check if the user is logged in through the database. 
                    $counter = ALPHA_CMS::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                               FROM `oauth_youtube` 
                                                               WHERE `active` = "1" 
                                                               AND `user_id` = "' . $_SESSION["TALOS"]["id"] . '"');

                    if ($counter[0]['num'] == 0)
                    {

                        $oauth_url = $url . '?' . http_build_query($params_request);

                        $draw->Login_Form($oauth_url);

                    }

                    else
                        $draw->Search_Box();

                }

            }

            // Code which is executed when the user asks to logout.
            else if ($_POST['action'] === 'logout')
            {

                unset($_SESSION['code']);

                $oauth_url = $url . '?' . http_build_query($params_request);

                $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `oauth_youtube`
                                                          SET `active` = "0"
                                                          WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"', 1);

                if ($result === false)
                exit();

                $draw->Login_Form($oauth_url);

            }

            else if ($_POST['action'] === 'top_rated')
            {

                $inbox = $youtube->Top_Rated_Videos();

            }

            else if ($_POST['action'] === 'create_channel')
            {

                $name = $_POST['name'];

                $youtube->Create_New_Channel($name);

            }

            else if ($_POST['action'] === 'user_profile')
            {

                $profile = $youtube->Channel();

                echo '<pre>'; 
                print_r($profile);
                echo '</pre>';

            }

            else if ($_POST['action'] === 'my_events')
            {

                $profile = $youtube->My_Events();

            }

            else if ($_POST['action'] === 'user_inbox')
            {

                $inbox = $youtube->Inbox();

            }

            else if ($_POST['action'] === 'user_contacts')
            {

                $contacts = $youtube->Contacts();

            }

            else if ($_POST['action'] === 'playlists')
            {

                $playlists = $youtube->Playlists_Get();
                
                //print_r($playlists);

            }

            else if ($_POST['action'] === 'playlist_create')
            {

                // code here

            }

            else if ($_POST['action'] === 'playlist_add_video')
            {

                // code here

            }

            else if ($_POST['action'] === 'watch_history')
            {

                $history = $youtube->Watch_History();

            }

            else if ($_POST['action'] === 'watch_later')
            {

                $history = $youtube->Watch_Later();

            }

            else if ($_POST['action'] === 'suggestions')
            {

                $subscriptions = $youtube->Channel_Suggestions();

            }

            else if ($_POST['action'] === 'subscriptions')
            {

                $subscriptions = $youtube->Subscriptions_List();

            }

            else if ($_POST['action'] === 'subscription_videos')        // not finished
            {
                
                $user = '';

                $subscriptions = $youtube->Subscriptions_Video_List($user);

            }

            else if ($_POST['action'] === 'subscriptions_add_channel')
            {

                $channel_id = $_POST['channel_id'];

                $subscriptions = $youtube->Subscriptions_Add_Channel($channel_id);

            }

            else if ($_POST['action'] === 'subscriptions_add_user')
            {

                $user_id = $_POST['user_id'];

                $subscriptions = $youtube->Subscriptions_Add_User($user_id);

            }

            else if ($_POST['action'] === 'subscriptions_remove')
            {

                $id = $_POST['channel_id'];

                $subscriptions = $youtube->Subscriptions_Remove($id);

            }

            else if ($_POST['action'] === 'get_favorites')
            {
                
                $per_page = $_POST['per_page'];
                $start_index = $_POST['start_index'];

                $favorites = $youtube->Favorites_List($per_page, $start_index);

            }

            else if ($_POST['action'] === 'add_favorite')
            {

                $video_id = $_POST['video_id'];

                $youtube->Favorite_Add($video_id);

            }

            else if ($_POST['action'] === 'remove_favorite')
            {

                $video_id = $_POST['video_id'];

                $youtube->Favorite_Remove($video_id);

            }

            else if ($_POST['action'] === 'upload_list')
            {

                $uploads = $youtube->Uploads_List();

            }

            else if ($_POST['action'] === 'upload_delete')
            {

                $video_id = $_POST['video_id'];

                $delete = $youtube->Uploads_Delete($video_id);

            }

            else if ($_POST['action'] === 'send_email')
            {

                $result = ALPHA_CMS::Execute_SQL_Command('SELECT `youtube_user_id`
                        FROM `oauth_youtube`
                        WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');

                if (count($result) !== 1)
                {

                    echo 'Something is really wrong here!';

                    exit();

                }

                else
                    $id = $result[0]['youtube_user_id'];

                $user = json_decode(file_get_contents('https://gdata.youtube.com/feeds/api/users/' . $id . '?v=2&alt=json'));
                $user_name = $user->entry->author[0]->{'name'}->{'$t'};

                $to = $_POST['recipients'];
                $subject = $user_name . ' sent you a video via GreyOS';
                $message = $_POST['message'];
                $headers = 'From: noreply@greyos.gr' . "\r\n" .
                        'Reply-To: mail.greyos.gr' . "\r\n" .
                        'X-Mailer: PHP/' . phpversion();

                if (isset($_POST['recipients']) && isset($_POST['message']))
                {

                    if ($_POST['submit'])
                    { 

                        if (mail($to, $subject, $message, $headers))
                            echo 'Message successfully sent!';

                        else
                            echo 'Message delivery failed...';

                    }

                }

                $draw->Email_Form($user_name);

            }

            else if ($_POST['action'] === 'search_to_thor' && isset($_POST['search_query_thor']))
            {

                if (strlen($_POST['search_query_thor']) < 101)
                {

                    if (Thor($_POST['search_query_thor'], 6))
                        echo 'OK';

                    else
                        echo 'NOT';

                }

                else
                    echo 'NOT';

            }

        }

       // The POST variable that contains the Search Query of the user.
        if (isset($_POST['search_value']) && !empty($_POST['search_value']))
        {

            if (empty($_POST['search_value']))
                return null;

            $search_value = $_POST['search_value'];
            $per_page = $_POST['per_page'];
            $start_index = $_POST['start_index'];

            if ($youtube->Search($search_value, $per_page, $start_index))
            {

                $counter = count($youtube->Request_Result->entry);

                if ($counter > 0)
                {

                    $return = '<div class="yt_search_results_container">';

                    foreach ($youtube->Request_Result->entry as $video)
                        $return .= $draw->Video_List_Raw($video, $counter, 1);

                    $return .= '</div>';

                    echo $return;

                }

                else
                    echo '<div class="yt_search_results_not_found">Video not found!</div>';

            }

            else
                echo $youtube->Error_Message();

        }

        if (isset($_POST['comment']) && isset($_POST['video_id']))
        {

            $video_id = $_POST['video_id'];
            $comment = $_POST['comment'];

           $youtube->Add_Comments($video_id, $comment);

        }

        // Code that is executed when the user wants to upload a video.
        if (isset($_POST['title']) && isset($_POST['description']) && isset($_POST['tag']) &&
             isset($_POST['category']) && isset($_POST['file']))
        {

            $title = $_POST['title'];
            $description = $_POST['description'];
            $category = $_POST['category'];
            $tag = $_POST['tag'];
            $file = $_POST["file"];

            $upload = $youtube->Upload_Video($file, $title, $description, $category, $tag);

            if ($upload['is_error'])
                echo $upload['error'];

            else
                $draw->Upload_Form($upload);

            exit();

        }
            
    }

    // This is the proper way to control GET variables from redirections from APIs.
    else if (isset($_GET) && !empty($_GET))
    {

        if (isset($_GET['code']) && !empty($_GET['code']))
        {

            $_SESSION['code'] = $_GET['code'];

            $code = $_GET['code'];

            $oauth = $youtube->Oauth($code, $redirect_uri);
            
            $get = json_decode($oauth);

            $profile = $youtube->Get_My_Profile($get->access_token);
            
            $data = json_decode($profile);
            $channel_id = $data->items[0]->id;
            $user_id = mb_substr($channel_id, 2);

            // Code that checks if the user has logged in at our database in the past. So either updates or inserts data.
            $counter = ALPHA_CMS::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                       FROM `oauth_youtube` 
                                                       WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');

            if ($counter[0]['num'] > 0)
            {

                $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `oauth_youtube` 
                                                          SET `youtube_token` = "' . $get->access_token . '", 
                                                              `youtube_refresh_token` = "' . $get->refresh_token . '",
                                                              `youtube_expires_token` = "' . date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s'). ' +' . $get->expires_in . ' seconds')) . '",
                                                              `youtube_channel_id` = "' . $channel_id . '",
                                                              `youtube_user_id` = "' . $user_id . '",
                                                              `active` = "1",
                                                              `ip` = "' . $_SERVER['REMOTE_ADDR'] . '" 
                                                              WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"', 1);

                if ($result === false)
                exit();

            }

            else
            {

                $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `oauth_youtube` 
                                                        (`youtube_token`, `youtube_refresh_token`, 
                                                         `youtube_expires_token`, `youtube_channel_id`,
                                                         `youtube_user_id`, `active`, `ip`, `user_id`)
                                                          VALUES ("' . $get->access_token . '", "' .
                                                                       $get->refresh_token . '", "' .
                                                                       date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s'). ' +' . $get->expires_in . ' seconds')) . '", "' .
                                                                       $channel_id . '", "' .
                                                                       $user_id . '", "1", "' .
                                                                       $_SERVER['REMOTE_ADDR'] . '", "' . 
                                                                       $_SESSION['TALOS']["id"] . '")', 1);

                if ($result === false)
                exit();

            }
        
            // We return the script after authorization and storing data is successfull. 
            echo '<script>window.onload = self.close();</script>';

        }

    }

?>
