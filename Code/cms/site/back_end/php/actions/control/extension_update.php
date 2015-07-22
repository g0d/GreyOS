<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: extension_update.php
        Description: This file contains the AJAX extension update.
        
        Coded by George Delaportas (G0D) & Konstantinos Gkoutzis (KGK)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Disable error reporting
    error_reporting(0);
    
    // Intialize session support
    @session_start();
    
    if (is_null($_SESSION['ALPHA_CMS_USER_TYPE']))
        return 0;
    
    if ($_SESSION['ALPHA_CMS_USER_TYPE'] > 0)
        return 0;
    
    // Include ALPHA Framework class
    require('../../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../../cms/alpha_cms.php');
    
    // Load Extensions Manager extension
    ALPHA_CMS::Load_Extension('ext_man', 'php');
    
    // Load Error Reporter extension
    ALPHA_CMS::Load_Extension('error_reporter', 'php');
    
    if (!empty($_POST['update']) && !empty($_POST['ext_type']) && 
        !empty($_POST['extension']) && !empty($_POST['global_lang']))
    {
    
        $result = ALPHA_CMS::Update_Extension($_POST['extension'], $_POST['ext_type'], $_POST);
        
        if ($result === false)
        {
        
            echo Error_Reporter('43', $_POST['global_lang']);
            
            return 0;
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('43', $_POST['global_lang']);
    
    return 0;

?>
