<?php
    /*
        spl@sh (Server-side HTML5 controls framework)

        File name: splash.php (Version: 4.6)
        Description: This file contains the "SPLASH" wrapper class.
        Dependencies: micro-MVC framework, Vulcan, BULL and JAP.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Load JS utilities and AJAX support
    UTIL::Load_Extension('vulcan', 'js');
    UTIL::Load_Extension('jap', 'js');
    UTIL::Load_Extension('bull', 'js');

    // Include HELPERS class
    require_once('helpers/helpers.php');

    // Include EVENTS wrapper
    require_once('events/events.php');

    // Include LINK class
    require_once('elements/control/action/link.php');

    // Include BUTTON class
    require_once('elements/control/action/button.php');

    // Include DIV class
    require_once('elements/control/group/div.php');

    // Include TABLE class
    require_once('elements/control/group/table.php');

    // Include FIELDSET class
    require_once('elements/control/group/fieldset.php');

    // Include SELECT class
    require_once('elements/control/option/select.php');

    // Include CLIST class
    require_once('elements/control/option/list.php');

    // Include CHECK class
    require_once('elements/control/option/check.php');

    // Include RADIO class
    require_once('elements/control/option/radio.php');

    // Include LABEL class
    require_once('elements/control/text/label.php');

    // Include INPUT class
    require_once('elements/control/text/input.php');

    // Include TEXTBOX class
    require_once('elements/control/text/textbox.php');

    // Include IMAGE class
    require_once('elements/control/multimedia/image.php');

    // Include AUDIO class
    require_once('elements/control/multimedia/audio.php');

    // Include VIDEO class
    require_once('elements/control/multimedia/video.php');

    // Wrapper class: [SPLASH]
    class SPLASH
    {
        // [ACTION]
        private $__link;
        private $__button;

        // [GROUP]
        private $__div;
        private $__table;
        private $__fieldset;

        // [OPTION]
        private $__select;
        private $__list;
        private $__check;
        private $__radio;

        // [TEXT]
        private $__input;
        private $__label;
        private $__textbox;

        // [MULTIMEDIA]
        private $__image;
        private $__audio;
        private $__video;

        // [WINDOW]
        // private $__browser;

        // [ADAPTER]
        // private $__java;
        // private $__javascript;
        // private $__mysql;
        // private $__xlib;

        // private $__menu;
        // private $__pane;
        // private $__container;
        // private $__banner;

        public function __construct()
        {
            /* ------------------------ [CONTROL] ------------------------ */

            // [ACTION]
            $this->__link = new LINK();
            $this->__button = new BUTTON();

            // [GROUP]
            $this->__div = new DIV();
            $this->__table = new TABLE();
            $this->__fieldset = new FIELDSET();

            // [OPTION]
            $this->__select = new SELECT();
            $this->__list = new CLIST();
            $this->__check = new CHECK();
            $this->__radio = new RADIO();

            // [TEXT]
            $this->__input = new INPUT();
            $this->__label = new LABEL();
            $this->__textbox = new TEXTBOX();

            // [MULTIMEDIA]
            $this->__image = new IMAGE();
            $this->__audio = new AUDIO();
            $this->__video = new VIDEO();

            /* ------------------------- END ------------------------- */



            // [WINDOW]
            // $this->__browser = new BROWSER();



            /* ------------------------ [PLUGIN] ------------------------ */

            // [ADAPTER]
            // $this->__java = new JAVA();
            // $this->__javascript = new JAVASCRIPT();
            // $this->__mysql = new MYSQL();
            // $this->__xlib = new XLIB();

            // $this->__menu = new MENU();
            // $this->__pane = new PANE();
            // $this->__container = new CONTAINER();
            // $this->__banner = new BANNER();

            /* ------------------------- END ------------------------- */
        }



        /* ------------------------ LINK ------------------------ */

        public function Link($mode, $content, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__link->Show($content, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__link->Debug($content, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ BUTTON ------------------------ */

        public function Button($mode, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__button->Show($attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__button->Debug($attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------- DIV ------------------------- */

        public function Div($mode, $content, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__div->Show($content, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__div->Debug($content, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ TABLE ------------------------ */

        public function Table($mode, $matrix, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__table->Show($matrix, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__table->Debug($matrix, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ----------------------- FIELDSET ----------------------- */

        public function Fieldset($mode, $content, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__fieldset->Show($content, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__fieldset->Debug($content, $attributes, $events);
                else
                    return false;
                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ SELECT ------------------------ */

        public function Select($mode, $options, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__select->Show($options, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__select->Debug($options, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ LIST ------------------------ */

        public function CList($mode, $options, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__list->Show($options, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__list->Debug($options, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ CHECK ------------------------ */

        public function Check($mode, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__check->Show($attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__check->Debug($attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ RADIO ------------------------ */

        public function Radio($mode, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__radio->Show($attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__radio->Debug($attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ LABEL ------------------------ */

        public function Label($mode, $content, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__label->Show($content, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__label->Debug($content, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ INPUT ------------------------ */

        public function Input($mode, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__input->Show($attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__input->Debug($attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ----------------------- TEXTBOX ----------------------- */

        public function Textbox($mode, $content, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__textbox->Show($content, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__textbox->Debug($content, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ IMAGE ------------------------ */

        public function Image($mode, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__image->Show($attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__image->Debug($attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ AUDIO ------------------------ */

        public function Audio($mode, $options, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__audio->Show($options, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__audio->Debug($options, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */



        /* ------------------------ VIDEO ------------------------ */

        public function Video($mode, $options, $attributes = null, $events = null)
        {
            if (HELPERS::Is_Valid_Mode($mode))
            {
                if (HELPERS::Mode_Matches_Case($mode, 1))
                    $result = $this->__video->Show($options, $attributes, $events);
                else if (HELPERS::Mode_Matches_Case($mode, 2))
                    $result = $this->__video->Debug($options, $attributes, $events);
                else
                    return false;

                return $result;
            }

            return false;
        }

        /* ------------------------- END ------------------------- */

    }
?>

<script src="/framework/extensions/php/user/splash/splash.js"></script>
