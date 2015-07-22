<?php

    /*
    
        GreyOS Inc. - AJAX Forms Manager
        
        Version: 1.5
        
        File name: forms_manager.php
        Description: This file contains the AJAX Forms Manager extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    

    // Disable error reporting
    error_reporting(0);

    // Include ALPHA Framework class
    require('../../../alpha.php');

    // Include ALPHA CMS class
    require('../../../../cms/alpha_cms.php');
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    // Registration form
    if ($_POST['form_id'] == '1')
    {
    
        if ($_POST['user'] != '' && $_POST['pass'] != '' && $_POST['email'] != '')
        {
        
            if (strcasecmp($_POST['user'], 'admin') == 0 || strcasecmp($_POST['user'], 'administrator') == 0)
                    return 0;
            
            $sql_com = 'SELECT `id` FROM `users` 
                        WHERE (`username` = ' . '\'' . mysql_real_escape_string($_POST['user'], $db_con) . '\' OR 
                               `email` = '. '\'' . mysql_real_escape_string($_POST['email'], $db_con) . '\')';
            
            $result = ALPHA_CMS::Execute_SQL_Command($sql_com, 1);
            
            if ($result[0]['id'])
                return 0;
            
            $sql_com = 'INSERT INTO `users` (`username`, `email`, `password`) 
                        VALUES (' . '\'' . mysql_real_escape_string($_POST['user'], $db_con) . '\'' . ', ' .
                                '\'' . mysql_real_escape_string($_POST['email'], $db_con) . '\'' . ', ' .
                                '\'' . md5(mysql_real_escape_string($_POST['pass'], $db_con)) . '\')';
            
            $result = ALPHA_CMS::Execute_SQL_Command($sql_com, 1);
            
            if ($result === false)
                return 0;
            
            echo 1;
            
            return 1;
        
        }
        
        else
            return 0;
    
    }
    
    // Login form (ALPHA CMS - Administration Panel)
    if ($_POST['form_id'] == '2')
    {
    
        if ($_POST['user'] != '' && $_POST['pass'] != '')
        {
        
            // Initialize session support
            @session_start();
            
            $sql_com = 'SELECT `id`, `type` FROM `alpha_users` 
                        WHERE (`username` = ' . '\'' . mysql_real_escape_string($_POST['user'], $db_con) . '\' AND 
                               `password` = '. '\'' . md5(mysql_real_escape_string($_POST['pass'], $db_con)) . '\')';
            
            $result = ALPHA_CMS::Execute_SQL_Command($sql_com, 1);
            
            if ($result === false)
                return 0;
            
            // Keep user ID
            $_SESSION['ALPHA_CMS_USER_ID'] = $result[0]['id'];
            
            // Keep username
            $_SESSION['ALPHA_CMS_USER'] = $_POST['user'];
            
            // Keep user type
            $_SESSION['ALPHA_CMS_USER_TYPE'] = $result[0]['type'];
            
            echo $result[0]['id'];
            
            return 1;
        
        }
        
        else
            return 0;
    
    }
    
    return 0;

?>
