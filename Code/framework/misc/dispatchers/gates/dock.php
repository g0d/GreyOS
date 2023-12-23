<?php
    /*
        GreyOS - Dock (Programmable gate for favorite apps control)

        File name: dock.php
        Description: This file contains the Dock control gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2013 - 2023
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    if (isset($_POST))
    {
        $user_settings = UTIL::Get_Session_Variable('auth');
        $username = substr($user_settings['user']['email'], 0, strpos($user_settings['user']['email'], '@'));

        if ($_POST['action'] === 'load')
        {
            if ($username === 'admin')
                $apps = json_decode(file_get_contents(UTIL::Absolute_Path('framework/misc/data/default_apps.json')));
            else
                $apps = json_decode(file_get_contents(UTIL::Absolute_Path('framework/misc/data/' . $username . '_apps.json')));

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
        }
        else if ($_POST['action'] === 'save')
        {
            if (isset($_POST['apps']))
            {
                if ($username === 'admin')
                    $apps_json_db = fopen(UTIL::Absolute_Path('framework/misc/data/default_apps.json'), 'w');
                else
                    $apps_json_db = fopen(UTIL::Absolute_Path('framework/misc/data/' . $username . '_apps.json'), 'w');
                fwrite($apps_json_db, $_POST['apps']);
                fclose($apps_json_db);

                echo true;
            }
            else
                echo false;
        }
    }
?>
