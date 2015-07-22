<?php

    /*
    
        GreyOS Inc. - TALOS (AJAX Login & Registration Manager)
        
        Version: 2.0
        
        File name: talos.php
        Description: This file contains the TALOS - AJAX Login & Registration Manager extension.
        
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

    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return null;
    
    // Load helper extensions
    ALPHA_CMS::Load_Extension('thor', 'php');
    ALPHA_CMS::Load_Extension('woody', 'php');
    
    $this_lang = ALPHA_CMS::Get_Language();
    
    if (empty($_POST['code']) || ($_POST['code'] !== 'login' && $_POST['code'] !== 'reg'))
        return false;
    
    if ($_POST['code'] === 'login')
    {

        if (empty($_POST['user']) || empty($_POST['pass']))
            return false;
        
        if (Thor($_POST['user'], 'minimal') && Thor($_POST['pass'], 'password'))
        {

            $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `username`, `email` 
                                                      FROM `talos` 
                                                      WHERE (`username` = ' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['user']), $db_con) . '\'' . 
                                                      ' AND `password` = ' . 
                                                      '\'' . mysql_real_escape_string(md5(trim($_POST['pass'])), $db_con) . '\'' . 
                                                      ' AND `active` = 1)', 1);

            if ($result === false || empty($result))
                return false;

            $_SESSION['TALOS'] = array('id'         =>  $result[0][0], 
                                       'username'   =>  $result[0][1], 
                                       'email'      =>  $result[0][2]);

            echo '1';

        }

    }

    else if ($_POST['code'] === 'reg')
    {

        if (empty($_POST['user']) || empty($_POST['email']) || empty($_POST['pass']))
            return false;

        if (Thor($_POST['user'], 'minimal') && Thor($_POST['email'], 'email') && Thor($_POST['pass'], 'password'))
        {

            if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
                return false;

            $verification_code = md5(('TALOS' + chr(rand(0, 127))) + 
                                     (trim($_POST['user']) + chr(rand(128, 255)) + 
                                      trim($_POST['email']) + chr(rand(0, 127)) + 
                                      trim($_POST['pass']) + chr(rand(128, 255))));

            $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                      FROM `talos` 
                                                      WHERE (`username` = ' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['user']), $db_con) . '\'' . 
                                                      ' OR `email` = ' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['email']), $db_con) . '\')', 1);

            if ($result === false || !empty($result[0][0]))
                return false;

            $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `talos`(`username`, `email`, `password`, `verification_code`) 
                                                      VALUES (' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['user']), $db_con) . '\'' . ', ' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['email']), $db_con) . '\'' . ', ' . 
                                                      '\'' . mysql_real_escape_string(md5(trim($_POST['pass'])), $db_con) . '\'' . ', ' . 
                                                      '\'' . $verification_code . '\')', 1);

            if ($result === false)
                return false;

            $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `username`, `email` 
                                                      FROM `talos` 
                                                      WHERE (`username` = ' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['user']), $db_con) . '\'' . 
                                                      ' AND `password` = ' . 
                                                      '\'' . mysql_real_escape_string(md5(trim($_POST['pass'])), $db_con) . '\')', 1);

            if ($result === false || empty($result))
                return false;

            $_SESSION['TALOS'] = array('id'         =>  $result[0][0], 
                                       'username'   =>  $result[0][1], 
                                       'email'      =>  $result[0][2]);

            $from_email = 'GreyOS - Welcome! <welcome@greyos.gr>';
            $to_email = trim($_POST['email']);
            $subject = 'GreyOS :: Welcome Dude!';
            $message = '<!DOCTYPE HTML>
                        <html>
                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                <meta name="robots" content="index, nofollow">
                                <title>Welcome to GreyOS!</title>
                            </head>
                            <body>
                                <div>
                                    Thank you for registering to GreyOS!<br><br>
                                    It is important that you verify your account in the next 24 hours by clicking here: <br>
                                    <a href="http://' . $_SERVER['SERVER_NAME'] . '/' . 
                                                        $this_lang . '/verify/' . 
                                                        $verification_code . '/">Verify</a><br><br>
                                    <b>Enjoy the future of the web...</b>
                                </div>
                            </body>
                        </html>';

            $result = Woody::Send_Mail($from_email, $to_email, $subject, $message);

            if (!$result)
                return false;

            $from_email = 'GreyOS - Registration Form <registration@greyos.gr>';
            $to_email = 'users@greyos.gr';
            $subject = 'GreyOS :: New user!';
            $message = '<!DOCTYPE HTML>
                        <html>
                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                <meta name="robots" content="index, nofollow">
                                <title>- New user -</title>
                            </head>
                            <body>
                                <div>
                                    <b>
                                    ID: ' . $_SESSION['TALOS']['id'] . '<br>
                                    Username: ' . $_SESSION['TALOS']['username'] . '<br>
                                    e-Mail: ' . $_SESSION['TALOS']['email'] . '
                                    </b>
                                </div>
                            </body>
                        </html>';

            $result = Woody::Send_Mail($from_email, $to_email, $subject, $message);

            if (!$result)
                return false;

            echo '1';

        }

    }

    else if ($_POST['code'] === 'recovery')
    {

        if (empty($_POST['user_or_email']))
            return false;

        if (Thor($_POST['user_or_email'], 'minimal'))
        {

            $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `email` 
                                                      FROM `talos` 
                                                      WHERE (`username` = ' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['user_or_email']), $db_con) . '\'' . 
                                                      ' OR `email` = ' . 
                                                      '\'' . mysql_real_escape_string(trim($_POST['user_or_email']), $db_con) . '\')', 1);

            if ($result === false || !empty($result[0][0]))
                return false;

            $user_id = $result[0][0];
            $user_email = $result[0][1];

            $random_pass = chr(rand(0, 127)) . chr(rand(0, 255)) . 
                           chr(rand(64, 127)) . chr(rand(0, 127)) . 
                           chr(rand(128, 200)) . chr(rand(0, 32)) . 
                           chr(rand(128, 255)) . chr(rand(0, 255));

            $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `talos`(`password`) 
                                                      VALUES (' . '\'' . mysql_real_escape_string(md5($random_pass), $db_con) . '\'' . '\') 
                                                      WHERE id = ' . $user_id, 1);

            if ($result === false)
                return false;

            $from_email = 'GreyOS - Password Recovery! <recovery@greyos.gr>';
            $to_email = $user_email;
            $subject = 'GreyOS :: Your new password Dude!';
            $message = '<!DOCTYPE HTML>
                        <html>
                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                <meta name="robots" content="index, nofollow">
                                <title>New Password for GreyOS!</title>
                            </head>
                            <body>
                                <div>
                                    Did you forget your password? No problem Dude!<br><br>
                                    This is your newly random generated password: ' . $random_pass . '<br><br>
                                    <b>Enjoy!</b>
                                </div>
                            </body>
                        </html>';

            $result = Woody::Send_Mail($from_email, $to_email, $subject, $message);

            if (!$result)
                return false;

            echo '1';

        }

    }

    else
        return false;

    return true;

?>
