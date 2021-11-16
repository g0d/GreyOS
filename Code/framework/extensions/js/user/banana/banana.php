<?php
    /*
        GreyOS - Banana [AJAX] (Version: 1.0)
        
        File name: banana.php
        Description: This file contains the Banana - AJAX Suggestions Manager.
        
        Coded by John Inglessis (negle) and George Delaportas (G0D)
        Copyright © 2013 - 2021
        Open Software License (OSL 3.0)
    */

    // Disable error reporting
    error_reporting(0);

    if (empty($_POST['suggestion']))
        return false;

    $from_email = 'GreyOS - Banana (Suggestions Manager) <suggestion-form@greyos.gr>';
    $subject = 'GreyOS :: New Suggestion';
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
