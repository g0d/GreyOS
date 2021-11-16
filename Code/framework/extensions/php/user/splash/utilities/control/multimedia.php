<?php
    /*
        spl@sh (Class)

        File name: multimedia.php (Version: 4.6)
        Description: This file contains the "MULTIMEDIA" abstract class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    // Include CONTROL class
    require_once(UTIL::Absolute_Path('framework/extensions/php/user/splash/classes/control.php'));

    // Utility: [MULTIMEDIA]
    abstract class MULTIMEDIA extends CONTROL
    {
        // Attributes
        protected $__attr_src = null;

        // Events
        protected $__event_focus = null;
        protected $__event_blur = null;
        protected $__event_abort = null;
    }

    /* ------------------------- END ------------------------- */
?>
