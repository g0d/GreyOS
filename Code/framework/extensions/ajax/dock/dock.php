<?php

    /*

        GreyOS Inc. - AJAX Dock extension

        File name: dock.php (Version: 2.0)
        Description: This file contains the AJAX Dock extension.

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

    // Include ALPHA Framework class
    require('../../../alpha.php');

    // Include ALPHA CMS class
    require('../../../../cms/alpha_cms.php');

    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return null;

    if (isset($_POST))
    {

        if ($_POST['action'] === 'load')
        {

            $result = ALPHA_CMS::Execute_SQL_Command('SELECT * FROM `dock` WHERE `user_id` = ' . $_SESSION['TALOS']['id']);

            $count = count($result);

            if ($count === 1)
                $apps = $result[0]['applications'];

            else
            {
 
                // Default application's array
                $applications = array(array('app_id' => 'rooster',
                                            'reference_name' => 'rooster',
                                            'position' => 0,
                                            'title' => 'Rooster :: The ultimate tasks manager & scheduler. Coming soon...'),
                                      array('app_id' => 'greyos_cloud',
                                            'reference_name' => 'greyos_cloud',
                                            'position' => 1,
                                            'title' => 'GreyOS Cloud :: Unlimited cloud storage for FREE. Coming soon...'),
                                      array('app_id' => 'coyote_app',
                                            'reference_name' => 'coyote',
                                            'position' => 2,
                                            'title' => 'Coyote :: A Web browser inside the browser ;-) Click me!'),
                                      array('app_id' => 'greyos_mail_app',
                                            'reference_name' => 'greyos_mail',
                                            'position' => 3,
                                            'title' => 'GreyOS M@il :: Integrated mail accounts. Click me!'),
                                      array('app_id' => 'i_youtube_app',
                                            'reference_name' => 'i_youtube',
                                            'position' => 4,
                                            'title' => 'Youtube :: Youtube, the GreyOS way. Click me!'),
                                      array('app_id' => 'i_fb_app',
                                            'reference_name' => 'i_fb',
                                            'position' => 5,
                                            'title' => 'Facebook :: Socialize with a sense of GreyOS. Click me!'),
                                      array('app_id' => 'twitter_app',
                                            'reference_name' => 'i_twitter',
                                            'position' => 6,
                                            'title' => 'Twitter :: Tweeting from GreyOS is so much more fun. Click me!'),
                                      array('app_id' => 'i_linkedin_app',
                                            'reference_name' => 'i_linkedin',
                                            'position' => 7,
                                            'title' => 'Linkedin :: Professional network with style. Click me!'),
                                      array('app_id' => 'disqus_app',
                                            'reference_name' => 'i_disqus',
                                            'position' => 8,
                                            'title' => 'Disqus :: Manage your discussions in one place. Click me!'),
                                       array('app_id' => 'radio_dude_app',
                                            'reference_name' => 'radio_dude',
                                            'position' => 9,
                                            'title' => 'Radio Dude :: Put some tunes in your life. Click me!'),
                                      array('app_id' => 'map_fuzion',
                                            'reference_name' => 'map_fuzion',
                                            'position' => 10,
                                            'title' => 'Map FuZioN :: Navigate the world in detail. Coming soon...'),
                                      array('app_id' => 'greyos_talk',
                                            'reference_name' => 'greyos_talk',
                                            'position' => 11,
                                            'title' => 'GreyOS talk :: Chat and speak with Dudes for FREE. Coming soon...'));

                $apps = json_encode($applications);

                $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `dock` (`user_id`, `applications`) ' . 
                                                         'VALUES (' . $_SESSION['TALOS']['id'] . ', "' . 
                                                                      mysql_real_escape_string($apps, $db_con) . '")', 1);

                if ($result === false)
                    exit();

            }

            $apps = json_decode($apps);

            $apps_length = count($apps);

            $html = null;

            for ($i = 0; $i < $apps_length; $i++)
            {

                $html .= '<div id="apps_' . $apps[$i]->app_id .'" 
                               draggable="true" 
                               data-reference="' . $apps[$i]->reference_name . '" 
                               data-position="' . $apps[$i]->position . '" 
                               class="favorites" 
                               title="' . $apps[$i]->title . '"></div>';

            }

            echo $html;

            exit();

        }

        else if ($_POST['action'] === 'save')
        {

            if (isset($_POST['applications']))
            {

                $apps = mysql_real_escape_string($_POST['applications']);

                $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `dock` SET `applications` = "' .  $apps . '" ' . 
                                                         'WHERE `user_id` = ' . $_SESSION['TALOS']['id'], 1);

                if ($result === false)
                  echo false;

                echo true;

            }

            else
                echo false;

        }

    }

?>
