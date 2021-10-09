<?php

    /*
    
        GreyOS Inc. - Verify
        
        Version: 1.0
        
        File name: verify.php
        Description: This file contains the Verify utility.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Load helper extensions
    ALPHA_CMS::Load_Extension('woody', 'php');

    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return false;

    $this_lang = ALPHA_CMS::Get_Language();

    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `email` 
                                              FROM `talos` 
                                              WHERE (`verification_code` = ' . 
                                              '\'' . mysqli_real_escape_string($db_con, substr($_SERVER['QUERY_STRING'], 14, 
                                                                              strlen($_SERVER['QUERY_STRING']) - 1)) . '\'' . 
                                              ' AND `active` = 0)', 1);

    if ($result === false || empty($result))
    {

        echo '<div class="verify_msg">Oops! It seems that this verification code is wrong... Have you been trying to play nasty?</div>' . 
             '<script type="text/javascript">setTimeout(function() { window.location.href = "/"; }, 3000);</script>';

        return false;

    }

    $to_email = $result[0]['email'];

    $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `talos` 
                                              SET `active` = 1 
                                              WHERE `verification_code` = ' . 
                                              '\'' . mysqli_real_escape_string($db_con, substr($_SERVER['QUERY_STRING'], 14, 
                                                                              strlen($_SERVER['QUERY_STRING']) - 1)) . '\'', 1);

    if ($result === false)
    {

        echo '<div class="verify_msg">Sorry, there\'s a technical difficulty, please try again later...</div>' . 
             '<script type="text/javascript">setTimeout(function() { window.location.href = "/"; }, 3000);</script>';

        return false;

    }

    $from_email = 'GreyOS - Verification Success! <welcome@greyos.gr>';
    $subject = 'GreyOS :: Verification completed!';
    $message = '<!DOCTYPE HTML>
                <html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <meta name="robots" content="index, nofollow">
                        <title> GreyOS is ready for you!</title>
                    </head>
                    <body>
                        <div>
                            Your account is now verified! Live the future of the Internet.<br><br>
                            <b>G r e y O S</b>
                        </div>
                    </body>
                </html>';

    $result = Woody::Send_Mail($from_email, $to_email, $subject, $message);

    if (!$result)
        return false;

    echo '<div class="verify_msg">Great dude, your account has been verified. Enjoy GreyOS!</div>' . 
         '<script type="text/javascript">setTimeout(function() { window.location.href = "/"; }, 3000);</script>';

    return true;

?>
