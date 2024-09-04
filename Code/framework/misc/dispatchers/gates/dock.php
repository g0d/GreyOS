<?php
    /*
        GreyOS - Dock (Programmable gate for favorite apps control)

        File name: dock.php
        Description: This file contains the Dock control gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2013 - 2024
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Load extensions
    UTIL::Load_Extension('arkangel', 'php');

    if (isset($_POST))
    {
        $user_profile = ARKANGEL::Fetch_My_Profile();

        $uid = $user_profile['uid'];
        $user_standard_apps = $user_profile['standard_apps'];
        $user_apps = $user_profile['user_programs']['apps'];

        if ($_POST['action'] === 'load')
        {
            $standard_apps = json_decode(file_get_contents(UTIL::Absolute_Path('framework/misc/data/standard_apps.json')), true);

            $index = 1;
            $html = '';

            foreach ($user_standard_apps as $allowed_app)
            {
                foreach ($standard_apps as $app)
                {
                    if ($allowed_app === $app['id'])
                    {
                        $html .= '<div id="app_' . $app['id'] . '" 
                                       draggable="true" 
                                       data-position="' . $index . '" 
                                       data-system="true" 
                                       data-icon="' . $app['icon'] . '" 
                                       class="favorites ' . $app['icon'] . '" 
                                       title="' . $app['hint'] . '">
                                       <div id="app_' . $app['id'] . '_instances" class="instances">0</div>
                                  </div>';

                        $index++;
                    }
                }
            }

            foreach ($user_apps as $app)
            {
                $html .= '<div id="app_' . $app['id'] . '" 
                               draggable="true" 
                               data-position="' . $index . '" 
                               data-system="false" 
                               data-icon="' . $app['icon'] . '" 
                               class="favorites ' . $app['icon'] . '" 
                               title="' . $app['name'] . '">
                               <div id="app_' . $app['id'] . '_instances" class="instances">0</div>
                          </div>';

                $index++;
            }

            echo $html;
        }
        else if ($_POST['action'] === 'save')
        {
            if (isset($_POST['apps']))
            {
                $dock_apps = json_decode($_POST['apps'], true);

                if (json_last_error() !== JSON_ERROR_NONE)
                    return false;

                $position = 1;
                $dock_standard_apps = [];
                $dock_user_apps = [];

                foreach ($dock_apps as $app)
                {
                    $app['position'] = strval($position);

                    if ($app['system'])
                        array_push($dock_standard_apps, $app['id']);
                    else
                        array_push($dock_user_apps, $app['id']);

                    $position++;
                }

                if (!empty($dock_standard_apps))
                    $user_profile['standard_apps'] = $dock_standard_apps;

                if (!empty($dock_user_apps))
                    $user_profile['user_programs']['apps'] = $dock_user_apps;

                UTIL::Set_Session_Variable('auth', $user_profile);

                $file_path = UTIL::Absolute_Path('fs/' . $uid . '/profile.cfg');
                file_put_contents($file_path, json_encode($user_profile));

                echo '1';
            }
            else
                echo '0';
        }
        else
            echo '-1';
    }
?>
