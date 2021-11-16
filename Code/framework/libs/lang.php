<?php
    /*
        micro-MVC
        
        File name: lang.php
        Description: This file contains the "LANG" class.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // LANG class
    class LANG
    {
        /** @var static Default language code */
        private static $__langs = array(0 => 'en');
        
        /**
        * LANG::Is_Country_Code - Check if supplied argument is a valid country code
        *
        * @param string $lang A 2 letter international country code
        *
        * @return bool
        */
        public static function Is_Country_Code($lang)
        {
            if (empty($lang) || !ctype_alpha($lang) || strlen($lang) != 2)
                return false;
            
            return true;
        }
        
        /**
        * LANG::Get - Get current or all physical and virtual language codes
        *
        * @param string $option "this" / "all" (default: null)
        *
        * @return mixed Returns 'en' if option is null or language is missing from route, otherwise current language
        */
        public static function Get($option = null)
        {
            if ($option === null)
                return self::$__langs[0];
            else if ($option === 'this')
            {
                if (UTIL::Check_Route_Lang() === false)
                    return self::$__langs[0];
                else
                    return UTIL::Fetch_Route_Lang();
            }
            else if ($option === 'all')
                return self::$__langs;
            else
                return false;
        }
        
        /**
        * LANG::Set - Set a new virtual language code
        *
        * @param string $lang A 2 letter international country code
        *
        * @return bool
        */
        public static function Set($lang)
        {
            $fixed_lang = trim($lang);
            
            if (self::Exists($fixed_lang) === true)
                return false;
            
            array_push(self::$__langs, $fixed_lang);
            
            return true;
        }
        
        /**
        * LANG::Verify - Verify the language code is valid
        *
        * @param string $lang A 2 letter international country code
        *
        * @return bool
        */
        public static function Verify($lang)
        {
            if (self::Is_Country_Code($lang) === false)
                return false;
            
            if (!in_array($lang, self::$__langs))
                return false;
            
            return true;
        }
        
        /**
        * LANG::Exists - Check if the language code exists in config
        *
        * @param string $lang A 2 letter international country code
        *
        * @return bool
        */
        public static function Exists($lang)
        {
            if (self::Is_Country_Code($lang) === false)
                return true;
            
            if (in_array($lang, self::$__langs))
                return true;
            
            return false;
        }
    }
?>
