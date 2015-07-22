<?php

    /*
    
        GreyOS Inc. - THOR (Server side XSS defender)
        
        Version: 1.4
        
        File name: thor.php
        Description: This file contains the THOR extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Validate a string
    function Thor($string, $type)
    {
    
        if (is_null($string) || $type == '' || is_null($type))
            return false;
        
        $result = 0;
        
        if ($type == 'general' || $type == 1)
        {
        
            $match = array('\'', ';', ':', '/', '|', '~', '`', '@', 
                           '#', '$', '%', '^', '&', '*', '=', '+', 
                           '[', ']', '\\', ',', '<', '>', '"', '.');
            
            $result = str_replace($match, '', $string);
        
        }
        
        elseif ($type == 'email' || $type == 2)
        {
        
            $match = array('\'', ';', ':', '/', '|', '~', '`', '#', 
                           '$', '%', '^', '&', '*', '(', ')', '=', '+', 
                           '[', ']', '{', '}', '\\', ',', '<', '>', '"');
            
            $result = str_replace($match, '', $string);
        
        }
        
        elseif ($type == 'password' || $type == 3)
        {
        
            $match = array('\'', ';', '/', '`', '&', '(', ')', '=', '+', 
                           '[', ']', '{', '}', '\\', ',', '<', '>', '"');
            
            $result = str_replace($match, '', $string);
        
        }
        
        elseif ($type == 'minimal' || $type == 4)
        {
        
            $match = array('\'', '`', '&', '{', '}', '\\');
            
            $result = str_replace($match, '', $string);
        
        }
        
        elseif ($type == 'twitter_search' || $type == 5)
        {
        
            $match = array('\'', ';', ':', '/', '|', '~', '`', '$', '%', '^', '&', '*', '=', '+', 
                           '[', ']', '\\', ',', '<', '>', '"');
            
            $result = str_replace($match, '', $string);
        
        }
        
        elseif ($type == 'twitter_new_status_or_reply' || $type == 6)
        {
        
            $match = array('\\');
            
            $result = str_replace($match, '', $string);
        
        }
        
        else
            return false;
        
        if ($string != $result)
            return false;
        
        return true;
    
    }

?>
