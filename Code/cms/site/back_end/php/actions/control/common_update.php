<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: common_update.php
        Description: This file contains the AJAX common update.
        
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
    
    // Load Error Reporter extension
    ALPHA_CMS::Load_Extension('error_reporter', 'php');
    
    if ($_POST['update'] == 1 && !empty($_POST['common_id']) && !empty($_POST['site_title']) && 
        !empty($_POST['binded_route']) && !empty($_POST['lang_code']) && !empty($_POST['global_lang']))
    {
    
        if (Thor($_POST, 4) === false)
        {
        
            echo Error_Reporter('1', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `is_protected` 
                                                  FROM `alpha_common` 
                                                  WHERE `id` = ' . 
                                                  mysqli_real_escape_string($db_con, $_POST['common_id']), 1);
        
        if (!empty($result) && $result[0][0] == 1 && $_SESSION['ALPHA_CMS_USER'] != 'admin')
        {
        
            echo Error_Reporter('4', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_common`.`id` 
                                                  FROM `alpha_common` 
                                                  INNER JOIN `alpha_languages` 
                                                  ON `alpha_common`.`lang_id` = `alpha_languages`.`id` 
                                                  WHERE (`binded_route` = ' . 
                                                         '\'' . mysqli_real_escape_string($db_con, $_POST['binded_route']) . '\'' . ' AND 
                                                         `lang_code` = ' . '\'' . 
                                                         mysqli_real_escape_string($db_con, $_POST['lang_code']) . '\'' . ' AND 
                                                         `alpha_common`.`id` <> ' . 
                                                         mysqli_real_escape_string($db_con, $_POST['common_id']) . ')', 1);
        
        if ($result)
        {
        
            echo Error_Reporter('2', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $lang_id = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                   FROM `alpha_languages` 
                                                   WHERE `lang_code` = ' . '\'' . 
                                                   mysqli_real_escape_string($db_con, $_POST['lang_code']) . '\'', 1);
        
        $result = ALPHA_CMS::Update_Common($_POST['common_id'], $_POST['site_title'], $_POST['site_descr'], $_POST['site_keys'], 
                                           $_POST['company_name'], $_POST['company_site'], $_POST['footer_info'], 
                                           $_POST['binded_route'], $lang_id[0][0], $_POST['is_protected']);
        
        if ($result === false)
        {
        
            echo Error_Reporter('4', $_POST['global_lang']);
            
            return 0;
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('4', $_POST['global_lang']);
    
    return 0;

?>
