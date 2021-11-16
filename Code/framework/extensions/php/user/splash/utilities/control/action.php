<?php
    /*
        spl@sh (Class)

        File name: action.php (Version: 4.6)
        Description: This file contains the "ACTION" abstract class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    // Include CONTROL class
    require_once(UTIL::Absolute_Path('framework/extensions/php/user/splash/classes/control.php'));

    // Utility: [ACTION]
    abstract class ACTION extends CONTROL
    {
        // Events
        protected $__event_focus = null;
        protected $__event_blur = null;
    }

    /* ------------------------- END ------------------------- */
?>
