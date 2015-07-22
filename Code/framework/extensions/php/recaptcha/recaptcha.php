<?php

    /*
    
        GreyOS Inc. - reCaptcha
        
        Version: 1.0
        
        File name: reCaptcha.php
        Description: This file contains the reCaptcha extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Load dependencies
    require_once('recaptcha_lib.php');
    
    // reCaptcha
    class reCaptcha
    {
    
        public static function Show($public_key)
        {
        
            if (empty($public_key))
                return false;
            
            echo recaptcha_get_html($public_key);
            
            return true;
        
        }
        
        public static function Validate($private_key, $challenge_value, $response_value)
        {
        
            if (empty($private_key) || empty($challenge_value) || empty($response_value))
                return false;
            
            $response = recaptcha_check_answer($private_key, $_SERVER["REMOTE_ADDR"], $challenge_value, $response_value);
            
            if ($response->is_valid)
                return true;
            
            return false;
        
        }
    
    }

?>
