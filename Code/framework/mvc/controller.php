<?php

    /*
    
        GreyOS - ALPHA Framework
        
        Version: 10.0
        
        File name: controller.php
        Description: This file contains the MVC CONTROLLER class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    // MVC CONTROLLER class
    class MVC_CONTROLLER
    {
    
        public static function root($option)
        {
        
            $result = ROOT_MODEL::Get_Data($option);
            
            ALPHA::MVC_Store_Content($option, $result);
            
            return true;
        
        }
        
        public static function setup($option)
        {
        
            $result = SETUP_MODEL::Get_Data($option);
            
            ALPHA::MVC_Store_Content($option, $result);
            
            return true;
        
        }
            
        public static function admin($option)
        {

            $result = ADMIN_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }
        
        public static function admin_dashboard($option)
        {

            $result = ADMIN_DASHBOARD_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }
        
        public static function admin_common($option)
        {

            $result = ADMIN_COMMON_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }

        public static function admin_content($option)
        {

            $result = ADMIN_CONTENT_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }

        public static function admin_menu($option)
        {

            $result = ADMIN_MENU_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }
        
        public static function admin_languages($option)
        {

            $result = ADMIN_LANGUAGES_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }

        public static function admin_extensions($option)
        {

            $result = ADMIN_EXTENSIONS_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }

        public static function admin_users($option)
        {

            $result = ADMIN_USERS_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }

        public static function admin_logs($option)
        {

            $result = ADMIN_LOGS_MODEL::Get_Data($option);

            ALPHA::MVC_Store_Content($option, $result);
            
            return true;

        }
        
        // Your code from here...
        
        
        
        // ...to here.
    
    }

?>
