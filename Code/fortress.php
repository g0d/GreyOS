<?php

    /*
    
        GreyOS - Fortress (AJAX requests handler)
        
        Version: 1.0
        
        File name: fortress.php
        Description: This file contains the Fortress - AJAX requests handler extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    // Disable error reporting
    error_reporting(0);

    // Include ALPHA Framework class
    require('/framework/alpha.php');

    // Include ALPHA CMS class
    require('/cms/alpha_cms.php');

    // Load Dragon extension
    ALPHA_CMS::Load_Extension('dragon', 'php');

    // Exit if POST is empty
    if (empty($_POST['action']))
        return false;

    echo DRAGON::Dispatch($_POST['action']);

    return true;

?>
