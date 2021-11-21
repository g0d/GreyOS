<?php
    /*
        GreyOS - Dock (Programmable gate for favorite apps control)

        File name: dock.php
        Description: This file contains the Dock control gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2013 - 2021
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Disable error reporting
    error_reporting(0);

    if (isset($_POST))
    {
        if ($_POST['action'] === 'load')
        {
            $apps = json_decode(file_get_contents(UTIL::Absolute_Path('framework/misc/data/favorite_apps.json')));

            $html = null;
            $apps_length = count($apps);

            for ($i = 0; $i < $apps_length; $i++)
            {
                $html .= '<div id="app_' . $apps[$i]->app_id . '" 
                               draggable="true" 
                               data-position="' . $apps[$i]->position . '" 
                               class="favorites" 
                               title="' . $apps[$i]->title . '"></div>';
            }

            echo $html;

            // Default applications
            // $applications = array(
            //                         array('app_id' => 'coyote',
            //                               'position' => 0,
            //                               'title' => 'Coyote :: A Web browser inside the browser ;-) Click me!'),
            //                         array('app_id' => 'cloud_edit',
            //                               'position' => 1,
            //                               'title' => 'Cloud Edit :: Integrated code editor for GreyOS. Click me!'),
            //                         array('app_id' => 'radio_dude',
            //                               'position' => 2,
            //                               'title' => 'Radio Dude :: Put some tunes in your life. Click me!'),
            //                         array('app_id' => 'i_bassoon',
            //                               'position' => 3,
            //                               'title' => 'iBassoon :: 3rd-party integrated DAW for fun. Click me!')
            //                         array('app_id' => 'rooster',
            //                               'position' => 4,
            //                               'title' => 'Rooster :: The ultimate tasks manager & scheduler. Coming soon...'),
            //                         array('app_id' => 'teal_cloud',
            //                               'position' => 5,
            //                               'title' => 'Teal Cloud :: Unlimited cloud storage for FREE. Coming soon...'),
            //                         array('app_id' => 'teal_mail',
            //                               'position' => 6,
            //                               'title' => 'Teal M@il :: Integrated mail accounts. Click me!'),
            //                         array('app_id' => 'i_youtube_app',
            //                               'position' => 7,
            //                               'title' => 'Youtube :: Youtube, the GreyOS way. Click me!'),
            //                         array('app_id' => 'i_fb_app',
            //                               'position' => 8,
            //                               'title' => 'Facebook :: Socialize with a sense of GreyOS. Click me!'),
            //                         array('app_id' => 'twitter_app',
            //                               'position' => 9,
            //                               'title' => 'Twitter :: Tweeting from GreyOS is so much more fun. Click me!'),
            //                         array('app_id' => 'i_linkedin_app',
            //                               'position' => 10,
            //                               'title' => 'Linkedin :: Professional network with style. Click me!'),
            //                         array('app_id' => 'map_fuzion',
            //                               'position' => 11,
            //                               'title' => 'Map FuZioN :: Navigate the world in detail. Coming soon...'),
            //                         array('app_id' => 'greyos_talk',
            //                               'position' => 12,
            //                               'title' => 'GreyOS talk :: Chat and speak with Dudes for FREE. Coming soon...'),
            //                      );

            // $apps = json_encode($applications);
        }
        else if ($_POST['action'] === 'save')
        {
            if (isset($_POST['apps']))
            {
                $apps_json_db = fopen(UTIL::Absolute_Path('framework/misc/data/favorite_apps.json'), 'w');
                fwrite($apps_json_db, $_POST['apps']);
                fclose($apps_json_db);

                echo true;
            }
            else
                echo false;
        }
    }
?>
