<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: new_user.php
        Description: This file contains the AJAX new user.
        
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
    
    if ($_SESSION['ALPHA_CMS_USER_TYPE'] != 0)
        return 0;
    
    // Include ALPHA Framework class
    require('../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../cms/alpha_cms.php');
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['new'] == 1 && !empty($_POST['lang_code']))
    {
    
        echo '<div id="users_details_title">' . ALPHA_CMS::Load_Content('insert_user_label', 'content', $_POST['lang_code']) . 
                '<div id="users_details_x" onclick="Close_User_Details();">X</div>
              </div>
              <div id="users_details_area">
                <div class="class_user_detail_row">
                    <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('username_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_user_detail_row_value"><input id="insert_username" class="class_required" 
                          maxlength="16" value="' . $users[0][1] . '" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_user_detail_row">
                    <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('email_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_user_detail_row_value"><input id="insert_email" class="class_required" 
                          maxlength="100" value="' . $users[0][2] . '" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_user_detail_row">
                    <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('type_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_user_detail_row_value">
                        <select id="insert_type" class="class_required">';
            
        echo '<option selected value="0">' . 
        ALPHA_CMS::Load_Content('admin_label', 'content', $_POST['lang_code']) . 
        '</option>
        <option value="1">' . 
        ALPHA_CMS::Load_Content('editor_label', 'content', $_POST['lang_code']) . 
        '</option>
        <option value="2">' . 
        ALPHA_CMS::Load_Content('auditor_label', 'content', $_POST['lang_code']) . 
        '</option>';

        echo '</select>
              </span>
              </div>';

        echo '<div class="class_user_detail_row">
                <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('login_password', 'content', $_POST['lang_code']) . ': </b></span>
                <span class="class_user_detail_row_value"><input id="insert_password" type="password" class="class_required" 
                      maxlength="16" value="" 
                      onkeypress="return Input_Controller(this, event);" /></span>
              </div>
              <div class="class_user_detail_row">
                <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('confirm_label', 'content', $_POST['lang_code']) . ': </b></span>
                <span class="class_user_detail_row_value"><input id="conf_password" type="password" class="class_required" 
                      maxlength="16" value="" 
                      onkeypress="return Input_Controller(this, event);" /></span>
              </div>
              <div id="confirm_insert" class="class_user_detail_row_label" onclick="Insert_This_User();">' . 
              ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . ' 
              </div>
              </div>
             <div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 0px;"></div>
           </div>';
        
        return 1;
    
    }
    
    return 0;

?>
