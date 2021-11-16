<?php
    /*
        spl@sh (Class)

        File name: control.php (Version: 4.6)
        Description: This file contains the "CONTROL" abstract class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    // Include HELPERS class
    require_once(UTIL::Absolute_Path('framework/extensions/php/user/splash/helpers/helpers.php'));

    // Class: [CONTROL]
    abstract class CONTROL
    {
        // Attributes
        protected $__attr_id = null;
        protected $__attr_class = null;
        protected $__attr_style = null;
        protected $__attr_title = null;
        protected $__attr_lang = null;
        protected $__attr_accesskey = null;
        protected $__attr_tabindex = null;
        protected $__attr_data = array();

        // Events
        protected $__event_click = null;
        protected $__event_dblclick = null;
        protected $__event_mousedown = null;
        protected $__event_mousemove = null;
        protected $__event_mouseout = null;
        protected $__event_mouseover = null;
        protected $__event_mouseup = null;
        protected $__event_keydown = null;
        protected $__event_keypress = null;
        protected $__event_keyup = null;

        // Server-side events
        protected $__event_server_mouse = null;
        protected $__event_server_key = null;
        protected $__event_ajax_server_mouse = null;
        protected $__event_ajax_server_key = null;
    }

    /* ------------------------- END ------------------------- */
?>
