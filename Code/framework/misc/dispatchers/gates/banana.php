<?php
    /*
        GreyOS - Programmable gate for Banana
        
        File name: banana.php
        Description: This file contains the Banana gate (AJAX).
        
        Coded by George Delaportas (G0D)
        Copyright © 2013 - 2021
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    if (!empty($_POST['suggestion']))
    {
        $from_email = 'GreyOS - Banana (Suggestions Manager) <suggestion-form@greyos.gr>';
        $subject = 'GreyOS :: New Suggestion';
        $suggestion = trim($_POST['suggestion']);
        $message = '<br>IP: ' . $_SERVER['REMOTE_ADDR'] . '<br>' . 
                   'Username: ' . $_SESSION['TALOS']['username'] . '<br>' . 
                   'e-Mail: ' . $_SESSION['TALOS']['email'] . '<br>' . 
                   'Suggestion:<br>' . $suggestion;

        $result = Woody::Send_Mail($from_email, 'contact@greyos.gr', $subject, $message);

        if (!$result)
            echo '0';
        else
            echo '1';
    }
?>
