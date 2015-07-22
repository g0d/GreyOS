<?php

    /*
    
        GreyOS - ALPHA CMS
        
        Version: 10.0
        
        File name: root.php
        Description: This file contains the ROOT MODEL class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    // ROOT MODEL class
    class ROOT_MODEL
    {
    
        public static function Get_Data($option)
        {
        
            $this_lang = ALPHA_CMS::Get_Language();
            
            $result = ALPHA_CMS::Load_Content($option, 'content', $this_lang);
            
            return $result;
        
        }
    
    }

?>
