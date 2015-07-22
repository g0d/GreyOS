<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: content_delete.php
        Description: This file contains the AJAX content deletion message box.
        
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
    
    // Commons array
    $contents = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['delete'] == 1 && !empty($_POST['content_id']) && !empty($_POST['lang_code']))
    {
    
        $contents = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_content`.`id`, `page`, 
                                                           `lang_code`, `alpha_content`.`is_protected`, `caller` 
                                                    FROM `alpha_content` 
                                                    INNER JOIN `alpha_languages` 
                                                    ON `alpha_content`.`lang_id` = `alpha_languages`.`id` 
                                                    LEFT JOIN `alpha_menu` 
                                                    ON `alpha_content`.`page` = `alpha_menu`.`menu_link` 
                                                    WHERE `alpha_content`.`id` = ' . 
                                                    mysql_real_escape_string($_POST['content_id'], $db_con), 1);
        
        if (!empty($contents[0][3]) && $_SESSION['ALPHA_CMS_USER'] != 'admin')
            return 0;
        
        echo '<div id="contents_details_title">' . ALPHA_CMS::Load_Content('del_content_label', 'content', $_POST['lang_code']) . 
                '<div id="contents_details_x" onclick="Close_Content_Details();">X</div>
              </div>
              <div id="contents_details_area">
                <div><b>' . ALPHA_CMS::Load_Content('are_you_sure_content_label_1', 'content',  $_POST['lang_code']) . '</b><br>' . 
                $contents[0][1] . '<br><b>' . 
                ALPHA_CMS::Load_Content('are_you_sure_content_label_2', 'content',  $_POST['lang_code']) . '</b> ' . 
                $contents[0][2] . '</div>
                <div>
                <div id="confirm_delete" 
                     onclick="Delete_This_Content(' . $contents[0][0] . ', ' . '\'' .  
                     str_replace('-', '_', $contents[0][4] . '_' . $contents[0][1]) . '\'' . ')">' . 
                ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                '</div>
              </div>';
        
        return 1;
    
    }
    
    return 0;

?>
