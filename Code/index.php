<?php

    /*
    
        GreyOS - ALPHA CMS
        
        Version: 10.0
        
        File name: index.php
        Description: This is the index file.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    // Disable error reporting
    error_reporting(-1);
    
    // Define ALPHA CMS flag
    define('ALPHA_CMS', 1);
    
    // Include ALPHA Framework class 
    require('framework/alpha.php');
    
    // Include ALPHA CMS class
    require('cms/alpha_cms.php');
    
    // Setup ALPHA CMS (if this is the first run)
    $file_handler = fopen('cms/config/setup.cfg', 'r');
    
    if ($file_handler === false)
        die('ERROR: Unable to open ALPHA CMS default configuration!');
    
    $buffer = fgetc($file_handler);
    
    fclose($file_handler);
    
    if ($buffer == 0 || $buffer === null)
    {
    
        $wizard = ALPHA_CMS::Setup_Wizard();
        
        if ($wizard === false)
            die('ERROR: Unable to start ALPHA CMS - Setup Wizard!');
    
    }
    
    else
    {
    
        // Always check for a valid DB connection before ALPHA CMS loads
        $db_con = ALPHA_CMS::Use_DB_Connection();
        
        if ($db_con === false)
            die('ERROR: Unable to connect to ALPHA CMS database!');
        
        // This loads the main HTML
        require('cms/site/main.php');
    
    }

?>
