<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: user_delete.php
        Description: This file contains the AJAX users deletion message box.
        
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
    
    // Users array
    $users = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['delete'] == 1 && !empty($_POST['user_id']) && !empty($_POST['lang_code']))
    {
    
        $users = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `username` 
                                                 FROM `alpha_users` 
                                                 WHERE `id` = ' . 
                                                 mysqli_real_escape_string($db_con, $_POST['user_id']), 1);
        
        if (($_SESSION['ALPHA_CMS_USER'] != 'admin' && $users[0][1] == 'admin') || ($_SESSION['ALPHA_CMS_USER'] == $users[0][1]))
            return 0;
        
        echo '<div id="users_details_title">' . ALPHA_CMS::Load_Content('del_user_label', 'content', $_POST['lang_code']) . 
                '<div id="users_details_x" onclick="Close_User_Details();">X</div>
              </div>
              <div id="users_details_area">
                <div><b>' . ALPHA_CMS::Load_Content('are_you_sure_user_label', 'content',  $_POST['lang_code']) . '</b> ' . 
                $users[0][1] . '</div>
                <div>
                <div id="confirm_delete" 
                     onclick="Delete_This_User(' . $users[0][0] . ')">' . 
                ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                '</div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
