<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: edit_lang.php
        Description: This file contains the AJAX edit language.
        
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
    require('../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../cms/alpha_cms.php');
    
    // Languages array
    $langs = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['edit'] == 1 && !empty($_POST['lang_id']) && !empty($_POST['lang_code']))
    {
    
        $langs = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `lang_code`, `language`, `sort_order`, `is_default`, `is_protected` 
                                                 FROM `alpha_languages` 
                                                 WHERE `id` = ' . 
                                                 mysqli_real_escape_string($db_con, $_POST['lang_id']), 1);
        
        echo '<div id="langs_details_title">' . ALPHA_CMS::Load_Content('edit_lang_label', 'content', $_POST['lang_code']) . 
                '<div id="langs_details_x" onclick="Close_Lang_Details();">X</div>
              </div>
              <div id="langs_details_area">
                <div class="class_lang_detail_row">
                    <span class="class_lang_detail_row_label"><b>' . ALPHA_CMS::Load_Content('id_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_lang_detail_row_value">' . $langs[0][0] . '</span>
                </div>
                <div class="class_lang_detail_row">
                    <span class="class_lang_detail_row_label"><b>' . ALPHA_CMS::Load_Content('lang_code_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_lang_detail_row_value"><input id="edit_lang_code" class="class_required" 
                          maxlength="2" value="' . $langs[0][1] . '" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_lang_detail_row">
                    <span class="class_lang_detail_row_label"><b>' . ALPHA_CMS::Load_Content('language_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_lang_detail_row_value"><input id="edit_language" class="class_required" 
                          maxlength="25" value="' . $langs[0][2] . '" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_lang_detail_row">
                    <span class="class_lang_detail_row_label"><b>' . ALPHA_CMS::Load_Content('sort_order_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_lang_detail_row_value"><input id="edit_sort_order" class="class_required" 
                          maxlength="3" value="' . $langs[0][3] . '" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>';
        
        if($_SESSION['ALPHA_CMS_USER'] == 'admin')
        {
        
            echo '<div class="class_lang_detail_row">
                      <span class="class_lang_detail_row_label"><b>' . 
                      ALPHA_CMS::Load_Content('default_label', 'content', $_POST['lang_code']) . 
                      ': </b></span>
                      <span class="class_lang_detail_row_value">';

            if (!empty($langs[0][4]))
                echo '<input id="edit_default" type="checkbox" checked value="1" disabled />';
            else
                echo '<input id="edit_default" type="checkbox" value="0" />';

            echo '  </span>
                  </div>';
            
            echo '<div class="class_lang_detail_row">
                    <span class="class_lang_detail_row_label"><b>' . ALPHA_CMS::Load_Content('protected_content_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_lang_detail_row_value">'; 
            
            if (!empty($langs[0][5]))
                echo '<input id="edit_protected_content" type="checkbox" checked value="1" />';
            else
                echo '<input id="edit_protected_content" type="checkbox" value="0" />';
            
            echo '  </span>
                  </div>';
        
        }
        
        else
        {
        
            echo '<input id="edit_default" type="hidden" value="0" />
                  <input id="edit_protected_content" type="hidden" value="0" />';
        
        }
        
        echo '  <div id="confirm_update" class="class_lang_detail_row_label" 
                 onclick="Update_This_Lang(' . $langs[0][0] . ')">' . 
                 ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
             '  </div>
              </div>
              <div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 0px;"></div>
          </div>';
        
        return 1;
    
    }
    
    return 0;

?>
