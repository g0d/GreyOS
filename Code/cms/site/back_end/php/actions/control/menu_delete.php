<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: menu_delete.php
        Description: This file contains the AJAX menu deletion message box.
        
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
    
    // Menus array
    $menus = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['delete'] == 1 && !empty($_POST['menu_id']) && !empty($_POST['lang_code']))
    {
    
        $menus = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_menu`.`id`, `caller`, `menu_name`, `menu_link`, 
                                                        `lang_code`, `alpha_menu`.`is_protected` 
                                                 FROM `alpha_menu` 
                                                 INNER JOIN `alpha_languages` 
                                                 ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                                 LEFT JOIN `alpha_content` 
                                                 ON `alpha_menu`.`menu_link` = `alpha_content`.`page` 
                                                 WHERE `alpha_menu`.`id` = ' . 
                                                 mysqli_real_escape_string($db_con, $_POST['menu_id']), 1);
        
        if (!empty($menus[0][5]) && $_SESSION['ALPHA_CMS_USER'] != 'admin')
            return 0;
        
        echo '<div id="menus_details_title">' . ALPHA_CMS::Load_Content('del_menu_label', 'content', $_POST['lang_code']) . 
                '<div id="menus_details_x" onclick="Close_Menu_Details();">X</div>
              </div>
              <div id="menus_details_area">
                <div><b>' . ALPHA_CMS::Load_Content('are_you_sure_menu_label_1', 'content',  $_POST['lang_code']) . '</b> ' . 
                $menus[0][2] . '<br><b>' . 
                ALPHA_CMS::Load_Content('are_you_sure_menu_label_2', 'content',  $_POST['lang_code']) . '</b> ' . 
                $menus[0][4] . '</div>
                <div>
                <div id="confirm_delete" 
                     onclick="Delete_This_Menu(' . $menus[0][0] . ', ' . '\'' .  
                     str_replace('-', '_', $menus[0][1] . '_' . $menus[0][3]) . '\'' . ')">' . 
                ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                '</div>
              </div>';
        
        return 1;
    
    }
    
    return 0;

?>
