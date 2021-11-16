<?php
    /*
        spl@sh (Wrapper)

        File name: events_list.php (Version: 4.6)
        Description: This file contains the "EVENTS LIST" wrapper.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    // Include MOUSE::CLICK event
    require(UTIL::Absolute_Path('framework/extensions/php/user/splash/events/mouse/click.php'));

    // Include KEY::DOWN event
    require(UTIL::Absolute_Path('framework/extensions/php/user/splash/events/key/down.php'));

    /* ------------------------- END ------------------------- */
?>
