<?php
    /*
        spl@sh (Class)

        File name: text.php (Version: 4.6)
        Description: This file contains the "TEXT" abstract class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    // Include CONTROL class
    require_once(UTIL::Absolute_Path('framework/extensions/php/user/splash/classes/control.php'));

    // Utility: [TEXT]
    abstract class TEXT extends CONTROL
    {
        // Attributes
        protected $__attr_form = null;

        // Events
        protected $__event_focus = null;
        protected $__event_blur = null;
    }

    /* ------------------------- END ------------------------- */
?>
