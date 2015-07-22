<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: user_update.php
        Description: This file contains the AJAX user update.
        
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
    
    if ($_POST['update'] == 1 && !empty($_POST['user_id']) && !empty($_POST['global_lang']))
    {
    
        if ((!empty($_POST['password']) || strlen($_POST['password']) < 8 || 
             !empty($_POST['conf_pass'])) && $_POST['password'] != $_POST['conf_pass'])
            return 0;
        
        if (Thor($_POST['username'], 1) === false || Thor($_POST['email'], 2) === false)
        {
        
            echo Error_Reporter('1', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `username` 
                                                  FROM `alpha_users` 
                                                  WHERE `username` = ' . '\'' . 
                                                  mysql_real_escape_string($_POST['username'], $db_con) . '\'', 1);
        
        if ($_SESSION['ALPHA_CMS_USER'] != 'admin' && $users[0][1] == 'admin')
            return 0;
        
        if (!empty($result) && $_POST['user_id'] != $result[0][0])
        {

            echo Error_Reporter('13', $_POST['global_lang']);

            return 0;

        }

        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                  FROM `alpha_users` 
                                                  WHERE `email` = ' . '\'' . 
                                                  mysql_real_escape_string($_POST['email'], $db_con) . '\'', 1);

        if (!empty($result) && $_POST['user_id'] != $result[0][0])
        {

            echo Error_Reporter('14', $_POST['global_lang']);
            
            return 0;

        }

        if (empty($_POST['password']))
        {

            $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `alpha_users` 
                                                      SET `username` = ' . '\'' . 
                                                      mysql_real_escape_string($_POST['username'], $db_con) . '\'' . ', 
                                                          `email` = ' . '\'' . 
                                                      mysql_real_escape_string($_POST['email'], $db_con) . '\'' . ', 
                                                          `type` = ' . '\'' . 
                                                      mysql_real_escape_string($_POST['type'], $db_con) . '\'' . ' 
                                                      WHERE `id` = ' . 
                                                      mysql_real_escape_string($_POST['user_id'], $db_con), 1);

        }

        else
            $result = ALPHA_CMS::Update_User($_POST['user_id'], $_POST['username'], $_POST['email'], $_POST['password'], $_POST['type']);
        
        if ($result === false)
        {
        
            echo Error_Reporter('15', $_POST['global_lang']);
            
            return 0;
        
        }
        
        if ($_SESSION['ALPHA_CMS_USER_ID'] == $_POST['user_id'])
        {
        
            // Update username
            $_SESSION['ALPHA_CMS_USER'] = $_POST['username'];

            // Update user type
            $_SESSION['ALPHA_CMS_USER_TYPE'] = $_POST['type'];
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('15', $_POST['global_lang']);
    
    return 0;

?>
