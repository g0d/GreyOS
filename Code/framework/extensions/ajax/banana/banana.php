<?php

    /*
    
        GreyOS Inc. - Banana (AJAX Suggestions Manager)
        
        Version: 1.0
        
        File name: banana.php
        Description: This file contains the Banana - AJAX Suggestions Manager extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Disable error reporting
    error_reporting(0);

    // Initialize session support
    session_start();

    // Include ALPHA Framework class
    require('../../../alpha.php');

    // Include ALPHA CMS class
    require('../../../../cms/alpha_cms.php');

    // Load helper extensions
    ALPHA_CMS::Load_Extension('woody', 'php');

    $this_lang = ALPHA_CMS::Get_Language();

    if (empty($_POST['suggestion']))
        return false;

    $from_email = 'GreyOS - Banana (Suggestions Manager) <suggestion-form@greyos.gr>';
    $subject = 'GreyOS DEMO :: New Suggestion';
    $suggestion = trim($_POST['suggestion']);
    $message = '<br>IP: ' . $_SERVER['REMOTE_ADDR'] . '<br>' . 
               'Username: ' . $_SESSION['TALOS']['username'] . '<br>' . 
               'e-Mail: ' . $_SESSION['TALOS']['email'] . '<br>' . 
               'Suggestion:<br>' . $suggestion;

    $result = Woody::Send_Mail($from_email, 'contact@greyos.gr', $subject, $message);

    if (!$result)
        return false;

    echo '1';

    return true;

?>
