<?php

    /*

        GreyOS Inc. - AJAX Twitter application

        File name: i_twitter.php (Version: 2.0)
        Description: This file contains the AJAX Twitter application.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */
    
    // Disable error reporting
    error_reporting(0);

    // Initialize session support
    @session_start();

    // Disable caching
    header('Cache-Control: no-cache, must-revalidate'); // HTTP 1.1
    header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');   // Date in the past

    // Include the Twitter API Response library
    require_once(UTILS::Absolute_Path('framework/extensions/ajax/i_twitter/api_response.php'));

    if (isset($_POST))
    {

        if (isset($_POST['action']))
        {

            if ($_POST['action'] === 'start')
            {

                $result = DB::Execute_SQL_Command('SELECT * FROM `oauth_twitter` WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');

                $count = count($result);

                if ($count > 1)
                    return null;

                else if ($count === 1)
                {

                    if ($result[0]['active'] === '0')
                    {

                        $api_response = new API_RESPONSE();
                        $api_response->Sign_In();

                        exit();

                    }

                    else
                    {

                    	$_SESSION['twitter_data'] = array();
		                $_SESSION['twitter_data']['screen_name'] = $result[0]['screen_name'];    
		                $_SESSION['twitter_data']['user_id'] = $result[0]['twitter_user_id'];
		                $_SESSION['twitter_data']['oauth_token'] = $result[0]['oauth_token'];
		                $_SESSION['twitter_data']['oauth_token_secret'] = $result[0]['oauth_token_secret'];

                       	$api_response = new API_RESPONSE();
                       	$api_response->Start();

                       	exit();

                    }

                }

                else if ($count === 0)
                {

                    $api_response = new API_RESPONSE();
                    $api_response->Sign_In();

                    exit();

                }

                else
                    return null;

            }

            else if ($_POST['action'] === 'logout')
            {

                $counter = DB::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                           FROM `oauth_twitter` 
                                                           WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');

                if ($counter[0]['num'] > 0)
                {

                    $result = DB::Execute_SQL_Command('UPDATE `oauth_twitter` 
                                                              SET `active` = "0" 
                                                              WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"', 1);

                    if ($result === false)
                      return null;

                    unset($_SESSION['twitter_data']);

                    $api_response = new API_RESPONSE();
                    $api_response->Sign_In();
  
                    exit();

                }

                else
                    return null;

            }

            else if ($_POST['action'] === 'home_timeline')
            {

                $api_response = new API_RESPONSE();
                $api_response->Home_Timeline();

                exit();

            }

            else if ($_POST['action'] === 'user_timeline')
            {

                

                $api_response = new API_RESPONSE();

                if (isset($_POST['screen_name']) && !empty($_POST['screen_name']))
                    $api_response->User_Timeline(array('screen_name'=>$_POST['screen_name']));

                else
                    $api_response->User_Timeline();

                exit();

            }

            else if ($_POST['action'] === 'mentions_timeline')
            {

                $api_response = new API_RESPONSE();
                $api_response->Mentions_Timeline();

                exit();

            }

            else if ($_POST['action'] === 'compose_tweet')
            {

                $api_response = new API_RESPONSE();
                $api_response->Compose_Tweet();

                exit();

            }

            else if ($_POST['action'] === 'followers')
            {

                $api_response = new API_RESPONSE();
                $api_response->Followers();

                exit();

            }

            else if ($_POST['action'] === 'following')
            {

                $api_response = new API_RESPONSE();
                $api_response->Following();

                exit();

            }

            else if ($_POST['action'] === 'suggestions')
            {

                $api_response = new API_RESPONSE();
                $api_response->Suggestions();

                exit();

            }

            else if ($_POST['action'] === 'favorites')
            {

                $api_response = new API_RESPONSE();
                $api_response->Favorites();

                exit();

            }

            else if ($_POST['action'] === 'account_settings')
            {

                $api_response = new API_RESPONSE();
                $api_response->Account_Settings();

                exit();

            }

            else if ($_POST['action'] === 'messages')
            {

                $api_response = new API_RESPONSE();
                $api_response->Messages();

                exit();

            }

            else if ($_POST['action'] === 'search')
            {

                if (!isset($_POST['query']) || empty($_POST['query']))
                    exit();

                $api_response = new API_RESPONSE();
                $api_response->Search($_POST['query']);

                exit();

            }

            else
                exit();

        }

    }

    if (isset($_GET))
    {

        if(isset($_GET['action']))
        {

            if($_GET['action'] === 'authorization')
            {

                $api_response = new API_RESPONSE();    
                $response = $api_response->Request_Token();

                if (!empty($response['oauth_token']))
                    header('Location: https://api.twitter.com/oauth/authorize?oauth_token=' . $response['oauth_token']);

                exit();

            }

        }

        if (isset($_GET['oauth_token']) && isset($_GET['oauth_verifier']))
        {

            if(!empty($_GET['oauth_token']) && !empty($_GET['oauth_verifier']))
            {

                $api_response = new API_RESPONSE();    
                $response = $api_response->Oauth_Verifier();

                $counter = DB::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                           FROM `oauth_twitter` 
                                                           WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"');

                if ($counter[0]['num'] > 0)
                {

                    $result = DB::Execute_SQL_Command('UPDATE `oauth_twitter` 
                                                              SET `oauth_token` = "' . $response['oauth_token'] . '", 
                                                                  `oauth_token_secret` = "' . $response['oauth_token_secret'] . '", 
                                                                  `twitter_user_id` = "' . $response['user_id'] . '", 
                                                                  `screen_name` = "' . $response['screen_name'] . '", 
                                                                  `active` = "1",
                                                                  `ip` = "' . $_SERVER['REMOTE_ADDR'] . '" 
                                                                  WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"', 1);

                    if ($result === false)
                      exit();

                }

                else
                {

                    $result = DB::Execute_SQL_Command('INSERT INTO `oauth_twitter` (`oauth_token`, `oauth_token_secret`, 
                                                                                           `twitter_user_id`, `screen_name`, 
                                                                                           `active`, `ip`, `user_id`)
                                                              VALUES ("' . $response['oauth_token'] . '", "' . 
                                                                           $response['oauth_token_secret'] . '", "' . 
                                                                           $response['user_id'] . '", "' . 
                                                                           $response['screen_name'] . '", "1", "' . 
                                                                           $_SERVER['REMOTE_ADDR'] . '", "' . 
                                                                           $_SESSION['TALOS']["id"] . '")', 1);

                    if ($result === false)
                      return null;

                }

                echo '<script type="text/javascript">window.close();</script>';

            }

        }

    }

?>
