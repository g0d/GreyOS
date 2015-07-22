<?php

    /*
    
        GreyOS Inc. - spl@sh
        
        Version: 3.2
        
        File name: splash.php
        Description: This file contains the SPLASH wrapper class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */



    // Load AJAX support
    ALPHA_CMS::Load_Extension('bull', 'js');

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
//        private $__browser;

        // [ADAPTER]
//        private $__java;
//        private $__javascript;
//        private $__mysql;
//        private $__xlib;
//
//        private $__menu;
//        private $__pane;
//        private $__container;
//        private $__banner;

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
//            $this->__browser = new BROWSER();



            /* ------------------------ [PLUGIN] ------------------------ */

            // [ADAPTER]
//            $this->__java = new JAVA();
//            $this->__javascript = new JAVASCRIPT();
//            $this->__mysql = new MYSQL();
//            $this->__xlib = new XLIB();
//            
//            $this->__menu = new MENU();
//            $this->__pane = new PANE();
//            $this->__container = new CONTAINER();
//            $this->__banner = new BANNER();

            /* ------------------------- END ------------------------- */

        }

        /* ------------------------ LINK ------------------------ */

        public function Link($mode, $content, $attributes = null, $events = null)
        {

            if (HELPERS::Is_Valid_Mode($mode))
            {

                if ($mode == 1)
                    $result = $this->__link->Show($content, $attributes, $events);
                
                else
                    $result = $this->__link->Fetch($content, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__button->Show($attributes, $events);

                else
                    $result = $this->__button->Fetch($attributes, $events);

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

                if ($mode == 1)
                    $result = $this->__div->Show($content, $attributes, $events);
                
                else
                    $result = $this->__div->Fetch($content, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__table->Show($matrix, $attributes, $events);
                
                else
                    $result = $this->__table->Fetch($matrix, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__fieldset->Show($content, $attributes, $events);
                
                else
                    $result = $this->__fieldset->Fetch($content, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__select->Show($options, $attributes, $events);
                
                else
                    $result = $this->__select->Fetch($options, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__list->Show($options, $attributes, $events);
                
                else
                    $result = $this->__list->Fetch($options, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__check->Show($attributes, $events);
                
                else
                    $result = $this->__check->Fetch($attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__radio->Show($attributes, $events);
                
                else
                    $result = $this->__radio->Fetch($attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__label->Show($content, $attributes, $events);
                
                else
                    $result = $this->__label->Fetch($content, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__input->Show($attributes, $events);

                else
                    $result = $this->__input->Fetch($attributes, $events);

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

                if ($mode == 1)
                    $result = $this->__textbox->Show($content, $attributes, $events);
                
                else
                    $result = $this->__textbox->Fetch($content, $attributes, $events);
                
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

                if ($mode == 1)
                    $result = $this->__image->Show($attributes, $events);

                else
                    $result = $this->__image->Fetch($attributes, $events);

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

                if ($mode == 1)
                    $result = $this->__audio->Show($options, $attributes, $events);

                else
                    $result = $this->__audio->Fetch($options, $attributes, $events);

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

                if ($mode == 1)
                    $result = $this->__video->Show($options, $attributes, $events);

                else
                    $result = $this->__video->Fetch($options, $attributes, $events);

                return $result;

            }

            return false;

        }

        /* ------------------------- END ------------------------- */

    }

?>

<script type="text/javascript" src="/framework/extensions/php/splash/splash.js"></script>
