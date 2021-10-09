<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: edit_user.php
        Description: This file contains the AJAX edit user.
        
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
    
    // Users array
    $users = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['edit'] == 1 && !empty($_POST['user_id']) && !empty($_POST['lang_code']))
    {
    
        $users = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `username`, `email`, `type` 
                                                 FROM `alpha_users` 
                                                 WHERE `id` = ' . 
                                                 mysqli_real_escape_string($db_con, $_POST['user_id']), 1);
        
        echo '<div id="users_details_title">' . ALPHA_CMS::Load_Content('edit_user_label', 'content', $_POST['lang_code']) . 
                '<div id="users_details_x" onclick="Close_User_Details();">X</div>
              </div>';
        
        if ($users[0][1] == 'admin')
        {
        
            echo '<div id="users_details_area">
                    <div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('id_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value">' . $users[0][0] . '</span>
                    </div>
                    <div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('username_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value">' . $users[0][1] . '</span>
                    </div>
                    <div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('email_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value">' . $users[0][2] . '</span>
                    </div>
                    <div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('type_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value">';
                        
            if($users[0][3] == 0)
                echo ALPHA_CMS::Load_Content('admin_label', 'content', $_POST['lang_code']);
            
            elseif($users[0][3] == 1)
                echo ALPHA_CMS::Load_Content('editor_label', 'content', $_POST['lang_code']);
            
            else
                echo ALPHA_CMS::Load_Content('auditor_label', 'content', $_POST['lang_code']);
            
            echo '      </span>
                  </div>';
        
        }
        
        else
        {
        
            echo '<div id="users_details_area">
                    <div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('id_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value">' . $users[0][0] . '</span>
                    </div>
                    <div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('username_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value"><input id="edit_username" class="class_required" 
                              maxlength="16" value="' . $users[0][1] . '" 
                              onkeypress="return Input_Controller(this, event);" /></span>
                    </div>
                    <div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('email_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value"><input id="edit_email" class="class_required" 
                              maxlength="100" value="' . $users[0][2] . '" 
                              onkeypress="return Input_Controller(this, event);" /></span>
                    </div>';
            
            if($users[0][3] == 0 && $users[0][0] == $_SESSION['ALPHA_CMS_USER_ID'])
            {
            
                echo '<div class="class_user_detail_row">
                          <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('type_label', 'content', $_POST['lang_code']) . ': </b></span>
                          <span class="class_user_detail_row_value">';
                
                echo ALPHA_CMS::Load_Content('admin_label', 'content', $_POST['lang_code']);
                
                echo '    </span>
                      </div>';
            
            }
            
            else
            {
            
                echo '<div class="class_user_detail_row">
                        <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('type_label', 'content', $_POST['lang_code']) . ': </b></span>
                        <span class="class_user_detail_row_value">
                            <select id="edit_type" class="class_required">';
                        
                            if($users[0][3] == 0)
                            {

                                echo '<option selected value="0">' . 
                                ALPHA_CMS::Load_Content('admin_label', 'content', $_POST['lang_code']) . 
                                '</option>
                                <option value="1">' . 
                                ALPHA_CMS::Load_Content('editor_label', 'content', $_POST['lang_code']) . 
                                '</option>
                                <option value="2">' . 
                                ALPHA_CMS::Load_Content('auditor_label', 'content', $_POST['lang_code']) . 
                                '</option>';

                            }

                            elseif($users[0][3] == 1)
                            {

                                echo '<option value="0">' . 
                                ALPHA_CMS::Load_Content('admin_label', 'content', $_POST['lang_code']) . 
                                '</option>
                                <option selected value="1">' . 
                                ALPHA_CMS::Load_Content('editor_label', 'content', $_POST['lang_code']) . 
                                '</option>
                                <option value="2">' . 
                                ALPHA_CMS::Load_Content('auditor_label', 'content', $_POST['lang_code']) . 
                                '</option>';

                            }

                            else
                            {

                                echo '<option value="0">' . 
                                ALPHA_CMS::Load_Content('admin_label', 'content', $_POST['lang_code']) . 
                                '</option>
                                <option value="1">' . 
                                ALPHA_CMS::Load_Content('editor_label', 'content', $_POST['lang_code']) . 
                                '</option>
                                <option selected value="2">' . 
                                ALPHA_CMS::Load_Content('auditor_label', 'content', $_POST['lang_code']) . 
                                '</option>';

                            }
                
                echo '  </select>
                      </span>
                    </div>';
            
            }
        
        }
        
        echo ' <input id="edit_username" type="hidden" value="' . $users[0][1] . '" />
               <input id="edit_email" type="hidden" value="' . $users[0][2] . '" />
               <input id="edit_type" type="hidden" value="' . $users[0][3] . '" />
               <div class="class_user_detail_row">
                 <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('login_password', 'content', $_POST['lang_code']) . ': </b></span>
                 <span class="class_user_detail_row_value"><input id="edit_password" type="password" maxlength="16" value="" 
                       onkeypress="return Input_Controller(this, event);" /></span>
               </div>
               <div class="class_user_detail_row">
                 <span class="class_user_detail_row_label"><b>' . ALPHA_CMS::Load_Content('confirm_label', 'content', $_POST['lang_code']) . ': </b></span>
                 <span class="class_user_detail_row_value"><input id="conf_password" type="password" maxlength="16" value="" 
                       onkeypress="return Input_Controller(this, event);" /></span>
               </div>
               <div id="confirm_update" class="class_user_detail_row_label" 
                    onclick="Update_This_User(' . $users[0][0] . ')">' . 
            ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
            '  </div>
               </div>
               <div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 0px;"></div>
             </div>';
        
        return 1;
    
    }
    
    return 0;

?>
