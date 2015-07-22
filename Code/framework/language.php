<?php

    /*
    
        GreyOS - ALPHA Framework
        
        Version: 10.0
        
        File name: language.php
        Description: This file contains the LANGUAGE class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    // LANGUAGE class
    class LANGUAGE
    {
    
        // Shared language code
        private static $__lang_code = 'en';
        
        // Set current language
        public static function Set_Lang($lang_code)
        {
        
            // Set language code
            if (!empty($lang_code))
            {
            
                self::$__lang_code = $lang_code;
                
                return true;
            
            }
            
            else
                return false;
        
        }
        
        // Get current language
        public static function Get_Lang()
        {
        
            if(!empty($_GET['req']))
                self::$__lang_code = substr($_GET['req'], 0, 2);
            
            return self::$__lang_code;
        
        }
    
    }

?>
