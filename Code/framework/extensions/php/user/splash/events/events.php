<?php
    /*
        spl@sh (Wrapper)

        File name: events.php (Version: 4.6)
        Description: This file contains the "EVENTS" wrapper.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    if ((!empty($_POST['splash_post']) && is_numeric($_POST['splash_post']) && $_POST['splash_post'] == 1) || 
        (!empty($_POST['splash_ajax_post']) && is_numeric($_POST['splash_ajax_post']) && $_POST['splash_ajax_post'] == 1))
    {
        // Include EVENTS LIST wrapper
        require('events_list.php');

        if (!empty($_POST['splash_ajax_action']))
        {
            // Include HELPERS class
            require(UTIL::Absolute_Path('framework/extensions/php/user/splash/helpers/helpers.php'));

            echo HELPERS::Call_User_Function($_POST['splash_ajax_action']);
        }

        if (!empty($_POST['splash_action']))
            $_POST['splash_post_result'] = HELPERS::Call_User_Function($_POST['splash_action']);
    }

    /* ------------------------- END ------------------------- */
?>
