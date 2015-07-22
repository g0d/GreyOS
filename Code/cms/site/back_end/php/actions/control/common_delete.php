<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: common_delete.php
        Description: This file contains the AJAX common deletion message box.
        
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
    $commons = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['delete'] == 1 && !empty($_POST['common_id']) && !empty($_POST['lang_code']))
    {
    
        $commons = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_common`.`id`, `site_title`, 
                                                          `lang_code`, `alpha_common`.`is_protected` 
                                                   FROM `alpha_common` 
                                                   INNER JOIN `alpha_languages` 
                                                   ON `alpha_common`.`lang_id` = `alpha_languages`.`id`
                                                   WHERE `alpha_common`.`id` = ' . 
                                                   mysql_real_escape_string($_POST['common_id'], $db_con), 1);
        
        if (!empty($commons[0][3]) && $_SESSION['ALPHA_CMS_USER'] != 'admin')
            return 0;
        
        echo '<div id="commons_details_title">' . ALPHA_CMS::Load_Content('del_common_label', 'content', $_POST['lang_code']) . 
                '<div id="commons_details_x" onclick="Close_Common_Details();">X</div>
              </div>
              <div id="commons_details_area">
                <div><b>' . ALPHA_CMS::Load_Content('are_you_sure_common_label_1', 'content',  $_POST['lang_code']) . '</b><br>' . 
                $commons[0][1] . '<br><b>' . 
                ALPHA_CMS::Load_Content('are_you_sure_common_label_2', 'content',  $_POST['lang_code']) . '</b> ' . 
                $commons[0][2] . '</div>
                <div>
                <div id="confirm_delete" 
                     onclick="Delete_This_Common(' . $commons[0][0] . ')">' . 
                ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                '</div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
