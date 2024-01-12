<?php
    /*
        GreyOS - Meta-Programs (Programmable gate for loading sources of user programs developed with Meta-Script)

        File name: meta_programs.php
        Description: This file contains the User Programs control gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2024
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Load helper extensions
    UTIL::Load_Extension('arkangel', 'php');

    if (isset($_POST))
    {
        $user_profile = ARKANGEL::Fetch_My_Profile();

        $uid = $user_profile['uid'];

        if ($_POST['action'] === 'code' && !empty($_POST['mode']) && !empty($_POST['x_id']))
        {
            $user_programs = $user_profile['user_programs'][$_POST['mode'] . 's'];

            foreach ($user_programs as $program)
            {
                if ($program['name'] === $_POST['x_id'])
                {
                    $file_path = UTIL::Absolute_Path('fs/' . $uid . '/programs/run/' . $_POST['x_id']  . '/' .  $_POST['x_id'] . '.js');
                    $source = file_get_contents($file_path);

                    echo $source;
                }
            }
        }
        else
            echo '-1';
    }
?>
