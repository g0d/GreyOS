<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: lang_update.php
        Description: This file contains the AJAX language update.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Disable error reporting
    error_reporting(0);
    
    // Intialize session support
    @session_start();
    
    if (is_null($_SESSION['ALPHA_CMS_USER_TYPE']))
        return 0;
    
    if ($_SESSION['ALPHA_CMS_USER_TYPE'] > 1)
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
    
    if ($_POST['update'] == 1 && !empty($_POST['lang_id']) && !empty($_POST['lang']) && !empty($_POST['lang_code']) && 
        !empty($_POST['sort']) && intval($_POST['sort']) > 0 && !empty($_POST['global_lang']))
    {
    
        if (Thor($_POST['lang_code'], 1) === false || Thor($_POST['lang'], 1) === false)
        {
        
            echo Error_Reporter('1', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `is_protected` 
                                                  FROM `alpha_languages` 
                                                  WHERE `id` = ' . 
                                                  mysqli_real_escape_string($db_con, $_POST['lang_id']), 1);
        
        if (!empty($result) && $result[0][0] == 1 && $_SESSION['ALPHA_CMS_USER'] != 'admin')
        {
        
            echo Error_Reporter('19', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                  FROM `alpha_languages` 
                                                  WHERE `lang_code` = ' . '\'' . 
                                                  mysqli_real_escape_string($db_con, $_POST['lang_code']) . '\'', 1);
        
        if (!empty($result) && $result[0][0] != $_POST['lang_id'])
        {
        
            echo Error_Reporter('24', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                  FROM `alpha_languages` 
                                                  WHERE `language` = ' . '\'' . 
                                                  mysqli_real_escape_string($db_con, $_POST['lang']). '\'', 1);
        
        if (!empty($result) && $result[0][0] != $_POST['lang_id'])
        {
        
            echo Error_Reporter('16', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `sort_order` 
                                                  FROM `alpha_languages` 
                                                  WHERE `sort_order` = ' . 
                                                  mysqli_real_escape_string($db_con, $_POST['sort']), 1);
        
        if (!empty($result) && $result[0][0] != $_POST['lang_id'] && $result[0][1] == $_POST['sort'])
        {

            echo Error_Reporter('17', $_POST['global_lang']);
            
            return 0;

        }
        
        if($_SESSION['ALPHA_CMS_USER'] != 'admin')
            $_POST['is_default'] = 0;
        
        $result = ALPHA_CMS::Update_Language($_POST['lang_id'], $_POST['lang_code'], $_POST['lang'], 
                                             $_POST['sort'], $_POST['is_default'], $_POST['is_protected']);
        
        if ($result === false)
        {
        
            echo Error_Reporter('19', $_POST['global_lang']);
            
            return 0;
        
        }
        
        if (!empty($_POST['is_default']))
        {
        
            $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `alpha_languages` 
                                                      SET `is_default` = 0', 1);
            
            if ($result === false)
            {

                echo Error_Reporter('19', $_POST['global_lang']);
                
                return 0;

            }
        
            $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `alpha_languages` 
                                                      SET `is_default` = 1 
                                                      WHERE `lang_code` = ' . '\'' . 
                                                      mysqli_real_escape_string($db_con, $_POST['lang_code']) . '\'', 1);
            
            if ($result === false)
            {

                echo Error_Reporter('19', $_POST['global_lang']);
                
                return 0;

            }
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('19', $_POST['global_lang']);
    
    return 0;

?>
