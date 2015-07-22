<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: user_insert.php
        Description: This file contains the AJAX user insert.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Disable error reporting
    error_reporting(0);
    
    // Intialize session support
    @session_start();
    
    if(empty($_SESSION['ALPHA_CMS_USER']) || is_null($_SESSION['ALPHA_CMS_USER_TYPE']) || $_SESSION['ALPHA_CMS_USER_TYPE'] != 0)
        return 0;
    
    // Include ALPHA Framework class
    require('../../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../../cms/alpha_cms.php');
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    // Load THOR extension
    ALPHA_CMS::Load_Extension('thor', 'php');
    
    // Load Error Reporter extension
    ALPHA_CMS::Load_Extension('error_reporter', 'php');
    
    if ($_POST['insert'] == 1 && !empty($_POST['username']) && !empty($_POST['email']) && 
        !empty($_POST['password']) && strlen($_POST['password']) >= 8 && 
        !empty($_POST['conf_pass']) && !is_null($_POST['type']) && !empty($_POST['global_lang']))
    {
    
        if (Thor($_POST['username'], 1) === false || Thor($_POST['email'], 2) === false)
        {
        
            echo Error_Reporter('1', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Insert_User($_POST['username'], $_POST['email'], $_POST['password'], $_POST['type']);
        
        if (strval($result) == -1)
        {
        
            echo Error_Reporter('11', $_POST['global_lang']);
            
            return 0;
        
        }
        
        if ($result === false)
        {
        
            echo Error_Reporter('12', $_POST['global_lang']);
            
            return 0;
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('12', $_POST['global_lang']);
    
    return 0;

?>
