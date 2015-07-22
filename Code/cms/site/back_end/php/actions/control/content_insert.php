<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: content_insert.php
        Description: This file contains the AJAX content insert.
        
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
    
    // Language ID
    $lang_id = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    // Load THOR extension
    ALPHA_CMS::Load_Extension('thor', 'php');
    
    // Load Mammoth extension
    ALPHA_CMS::Load_Extension('mammoth', 'php');
    
    // Load Error Reporter extension
    ALPHA_CMS::Load_Extension('error_reporter', 'php');
    
    if ($_POST['insert'] == 1 && !empty($_POST['page']) && !empty($_POST['lang_code']) && !empty($_POST['global_lang']))
    {
    
        if (Thor($_POST['page'], 1) === false || Thor($_POST['keywords'], 4) === false)
        {
        
            echo Error_Reporter('1', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_content`.`id` 
                                                  FROM `alpha_content` 
                                                  INNER JOIN `alpha_languages` 
                                                  ON `alpha_content`.`lang_id` = `alpha_languages`.`id` 
                                                  WHERE (`lang_code` = ' . '\'' . 
                                                  mysql_real_escape_string($_POST['lang_code'], $db_con) . '\'' . ' AND 
                                                         `page` = ' . '\'' . 
                                                  mysql_real_escape_string($_POST['page'], $db_con) . '\'' . ')', 1);
        
        if ($result)
        {
        
            echo Error_Reporter('5', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $lang_id = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                   FROM `alpha_languages` 
                                                   WHERE `lang_code` = ' . '\'' . 
                                                   mysql_real_escape_string($_POST['lang_code'], $db_con) . '\'', 1);
        
        if (!empty($_POST['is_route']) && $_POST['is_route'] <> 0)
        {
        
            $page = str_replace('_', '-', $_POST['page']);
            
            $result = ALPHA_CMS::Insert_Content($page, Mammoth($_POST['content'], '*'), $_POST['keywords'], 
                                                $lang_id[0][0], $_POST['is_protected'], $_POST['is_route']);
        
        }
        
        else
        {
        
            $result = ALPHA_CMS::Insert_Content($_POST['page'], Mammoth($_POST['content'], '*'), $_POST['keywords'], 
                                                $lang_id[0][0], $_POST['is_protected'], $_POST['is_route']);
        
        }
        
        if ($result === false)
        {
        
            echo Error_Reporter('8', $_POST['global_lang']);
            
            return 0;
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('8', $_POST['global_lang']);
    
    return 0;

?>
