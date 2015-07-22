<?php

    /*

        GreyOS Inc. - spl@sh

        Version: 3.2

        File name: option.php
        Description: This file contains the OPTION abstract class.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright © 2013

    */



    /* ------------------------ BEGIN ------------------------ */

    // Include CONTROL class
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/splash/classes/control.php'));

    // Utility: [OPTION]
    abstract class OPTION extends CONTROL
    {

        // Attributes
        protected $__attr_name = null;
        protected $__attr_form = null;
        protected $__attr_autofocus = false;
        protected $__attr_required = false;
        protected $__attr_disabled = false;

        // Events
        protected $__event_focus = null;
        protected $__event_blur = null;
        protected $__event_change = null;

    }

    /* ------------------------- END ------------------------- */

?>
