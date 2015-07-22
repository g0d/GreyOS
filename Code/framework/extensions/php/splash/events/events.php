<?php

    /*

        GreyOS Inc. - spl@sh

        Version: 3.2

        File name: events.php
        Description: This file contains the EVENTS wrapper.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright © 2013

    */



    /* ------------------------ BEGIN ------------------------ */

    // Disable error reporting
    error_reporting(0);

    if (!empty($_POST['splash_post']) && is_numeric($_POST['splash_post']) && 
       $_POST['splash_post'] == 1 && !empty($_POST['splash_action']))
    {

        // Include HELPERS class
        require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/splash/helpers/helpers.php'));

        // Include EVENTS LIST wrapper
        require_once('events_list.php');

        HELPERS::Call_User_Function($_POST['splash_action']);

    }

    if (!empty($_POST['splash_ajax_post']) && is_numeric($_POST['splash_ajax_post']) && 
       $_POST['splash_ajax_post'] == 1 && !empty($_POST['splash_ajax_action']))
    {

        // Include ALPHA Framework class
        require('../../../../alpha.php');

        // Include ALPHA CMS class
        require('../../../../../cms/alpha_cms.php');

        // Include HELPERS class
        require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/splash/helpers/helpers.php'));

        // Include EVENTS LIST wrapper
        require_once('events_list.php');

        HELPERS::Call_User_Function($_POST['splash_ajax_action']);

    }

    /* ------------------------- END ------------------------- */

?>
