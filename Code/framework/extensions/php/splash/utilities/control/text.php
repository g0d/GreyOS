<?php

    /*

        GreyOS Inc. - spl@sh

        Version: 3.2

        File name: text.php
        Description: This file contains the TEXT abstract class.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright © 2013

    */



    /* ------------------------ BEGIN ------------------------ */

    // Include CONTROL class
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/splash/classes/control.php'));

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
