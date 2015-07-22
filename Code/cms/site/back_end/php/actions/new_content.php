<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: new_content.php
        Description: This file contains the AJAX new content.
        
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
    
    if ($_POST['new'] == 1 && !empty($_POST['lang_code']))
    {
    
        $langs = ALPHA_CMS::Execute_SQL_Command('SELECT `lang_code` 
                                                 FROM `alpha_languages`', 1);
        
        echo '<div id="contents_details_title">' . ALPHA_CMS::Load_Content('insert_content_label', 'content', $_POST['lang_code']) . 
                '<div id="contents_details_x" onclick="Close_Content_Details();">X</div>
              </div>
              <div id="contents_details_area">
                <div class="class_content_detail_row">
                  <span class="class_content_detail_row_label"><b>' . ALPHA_CMS::Load_Content('page_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_content_detail_row_value"><input id="insert_page" maxlength="255" class="class_required"
                        value="" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_content_detail_row" style="width: auto;">
                    <span class="class_content_detail_row_label"><b>' . ALPHA_CMS::Load_Content('content_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span style="float: left; width: 820px;">
                    <textarea id="insert_content" rows="1" cols="1"></textarea>
                    </span>
                </div>
                <div class="class_content_detail_row">
                  <span class="class_content_detail_row_label"><b>' . ALPHA_CMS::Load_Content('page_keywords_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_content_detail_row_value"><input id="insert_keywords" maxlength="255" 
                        value="" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_content_detail_row">
                  <span class="class_content_detail_row_label"><b>' . ALPHA_CMS::Load_Content('lang_code_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_content_detail_row_value">
                    <select id="insert_select_lang_code" class="class_required">';
        
        foreach($langs as $this_lang)
            echo '<option value="' . htmlspecialchars($this_lang[0]) . '">' . htmlspecialchars($this_lang[0]) . '</option>';
        
        echo '      </select>
                  </span>
                </div>';
        
        if($_SESSION['ALPHA_CMS_USER'] == 'admin')
        {
        
            echo '<div class="class_content_detail_row">
                    <span class="class_content_detail_row_label"><b>' . 
            ALPHA_CMS::Load_Content('protected_content_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_content_detail_row_value">
                    <input id="insert_protected_content" type="checkbox" value="0" /></span>
                  </div>';
        
        }
        
        else
            echo '<input id="insert_protected_content" type="hidden" value="0" />';
        
        echo '  <div class="class_content_detail_row">
                  <span class="class_content_detail_row_label"><b>' . 
        ALPHA_CMS::Load_Content('route_label', 'content', $_POST['lang_code']) . 
                  ': </b></span>
                  <span class="class_content_detail_row_value">
                    <input id="insert_route" type="checkbox" value="0" />
                  </span>
                </div>
                <div id="confirm_insert" class="class_content_detail_row_label" 
                      onclick="Insert_This_Content();">' . 
                 ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . ' 
                </div>
             </div>
             <div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 0px;"></div>
           </div>';
        
        return 1;
    
    }
    
    return 0;

?>
