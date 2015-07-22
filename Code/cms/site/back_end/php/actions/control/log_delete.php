<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: log_delete.php
        Description: This file contains the AJAX logs deletion message box.
        
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
    
    if ($_SESSION['ALPHA_CMS_USER'] != 'admin')
        return 0;
    
    // Include ALPHA Framework class
    require('../../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../../cms/alpha_cms.php');
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['delete'] == 1 && !empty($_POST['lang_code']))
    {
        
        echo '<div id="logs_details_title">' . ALPHA_CMS::Load_Content('del_logs_label', 'content', $_POST['lang_code']) . 
                '<div id="logs_details_x" onclick="Close_Log_Details();">X</div>
              </div>
              <div id="logs_details_area">
                <div><b>' . 
                ALPHA_CMS::Load_Content('are_you_sure_logs_label', 'content',  $_POST['lang_code']) . 
                '</b></div>
                <div>
                <div id="confirm_delete" 
                     onclick="Delete_All_Logs();">' . 
                ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                '</div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
