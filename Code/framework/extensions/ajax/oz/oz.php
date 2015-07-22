<?php

    /*
    
        GreyOS Inc. - OZ
        
        Version: 1.5
        
        File name: oz.php
        Description: This file contains the OZ extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    

    // Disable error reporting
    error_reporting(0);

    // Disable caching
    header('Cache-Control: no-cache, must-revalidate'); // HTTP 1.1
    header('Expires: Sat, 26 Jul 1997 05:00:00 GMT'); // Date in the past

    // Start OZ
    if ($_POST['oz'])
    {

        return true;

    }
    
    else
        return null;

?>
