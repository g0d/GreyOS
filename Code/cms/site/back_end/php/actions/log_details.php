<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: log_details.php
        Description: This file contains the AJAX log details.
        
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
    
    // Include ALPHA Framework class
    require('../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../cms/alpha_cms.php');
    
    // Logs array
    $logs = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['logs'] == 1 && !empty($_POST['log_id']) && !empty($_POST['lang_code']))
    {
    
        $logs = ALPHA_CMS::Show_Log($_POST['log_id']);
        
        echo '<div id="logs_details_title">' . ALPHA_CMS::Load_Content('log_details_label', 'content', $_POST['lang_code']) . 
                '<div id="logs_details_x" onclick="Close_Log_Details();">X</div>
              </div>
              <div id="logs_details_area">
                <div>
                    <span><b>' . ALPHA_CMS::Load_Content('id_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    $logs[0][0] . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('entity_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($logs[0][1]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('error_code_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($logs[0][2]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('error_msg_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($logs[0][3]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('file_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($logs[0][4]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('line_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($logs[0][5]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('date_time_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    $logs[0][6] . '</span>
                </div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
