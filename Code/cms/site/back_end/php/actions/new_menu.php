<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: new_menu.php
        Description: This file contains the AJAX new menu.
        
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
    
    // Callers array
    $callers = array();
    
    // Parent menu IDs array
    $parent_menu_ids = array();
    
    // Menu links array
    $menu_links = array();
    
    // Languages array
    $langs = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['new'] == 1 && !empty($_POST['lang_code']))
    {
    
        $callers = ALPHA_CMS::Execute_SQL_Command('SELECT DISTINCT `caller` 
                                                   FROM `alpha_menu` 
                                                   ORDER BY `caller` ASC', 1);
        
        $parent_menu_ids = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_menu`.`id`, `caller`, `menu_name`, `lang_code` 
                                                           FROM `alpha_menu` 
                                                           INNER JOIN `alpha_languages` 
                                                           ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                                           ORDER BY `caller`, `alpha_menu`.`sort_order`, `lang_code` ASC', 1);
        
        $menu_links = ALPHA_CMS::Execute_SQL_Command('SELECT DISTINCT `page` 
                                                      FROM `alpha_content` 
                                                      WHERE `is_route` = 1 
                                                      ORDER BY `page` ASC', 1);
        
        $langs = ALPHA_CMS::Execute_SQL_Command('SELECT `lang_code` 
                                                 FROM `alpha_languages`', 1);
        
        echo '<div id="menus_details_title">' . ALPHA_CMS::Load_Content('insert_menu_label', 'content', $_POST['lang_code']) . 
                '<div id="menus_details_x" onclick="Close_Menu_Details();">X</div>
              </div>
              <div id="menus_details_area">
                <div class="class_menu_detail_row">
                  <span class="class_menu_detail_row_label"><b>' . 
                  ALPHA_CMS::Load_Content('select_caller_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_menu_detail_row_value">
                    <select id="insert_select_caller" class="class_required" onchange="Caller_Status(this);">
                    <option selected value="0">[' . ALPHA_CMS::Load_Content('other_label', 'content', $_POST['lang_code']) . ']</option>';
        
        foreach($callers as $this_caller)
        {
        
            echo '<option value="' . htmlspecialchars($this_caller[0]) . '">' . 
            htmlspecialchars($this_caller[0]) . 
            '</option>';
        
        }
        
        echo '      </select>
                  </span>
                </div>
                <div class="class_menu_detail_row">
                    <span class="class_menu_detail_row_label"><b>' . ALPHA_CMS::Load_Content('caller_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_menu_detail_row_value"><input id="insert_caller" class="class_required" 
                          maxlength="255" value="" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_menu_detail_row">
                  <span class="class_menu_detail_row_label"><b>' . ALPHA_CMS::Load_Content('select_parent_menu_id_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_menu_detail_row_value">
                    <select id="insert_select_parent_menu_id" class="class_required" onchange="Parent_Status(this);">
                        <option selected value="-1">[' . ALPHA_CMS::Load_Content('none_label', 'content', $_POST['lang_code']) . ']</option>
                        <option value="0">[' . ALPHA_CMS::Load_Content('other_label', 'content', $_POST['lang_code']) . ']</option>';
        
        foreach($parent_menu_ids as $this_menu_id)
        {
        
            echo '<option value="' . htmlspecialchars($this_menu_id[0]) . '">' . 
            htmlspecialchars($this_menu_id[0]) . ' (' . 
            ALPHA_CMS::Load_Content('caller_label', 'content', $_POST['lang_code']) . ': ' . 
            htmlspecialchars($this_menu_id[1]) . ' - ' . 
            ALPHA_CMS::Load_Content('menu_name_label', 'content', $_POST['lang_code']) . ': ' . 
            htmlspecialchars($this_menu_id[2]) . ' - ' . 
            ALPHA_CMS::Load_Content('lang_code_label', 'content', $_POST['lang_code']) . ': ' . 
            htmlspecialchars($this_menu_id[3]) . ')' . 
            '</option>';
        
        }
        
        echo '      </select>
                  </span>
                </div>
                <div class="class_menu_detail_row">
                    <span class="class_menu_detail_row_label"><b>' . ALPHA_CMS::Load_Content('parent_menu_id_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_menu_detail_row_value"><input id="insert_parent_menu_id" class="class_required" 
                          maxlength="3" value="" 
                          onkeypress="return Input_Controller(this, event);" style="background-color: gray;" disabled /></span>
                </div>
                <div class="class_menu_detail_row">
                  <span class="class_menu_detail_row_label"><b>' . ALPHA_CMS::Load_Content('menu_name_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_menu_detail_row_value"><input id="insert_menu_name" class="class_required" 
                        maxlength="255" value="" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_menu_detail_row">
                  <span class="class_menu_detail_row_label"><b>' . ALPHA_CMS::Load_Content('menu_link_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_menu_detail_row_value">
                    <select id="insert_select_menu_link">
                        <option selected value="">[' . ALPHA_CMS::Load_Content('none_label', 'content', $_POST['lang_code']) . ']</option>';
        
        foreach($menu_links as $this_menu_link)
        {
        
            echo '<option value="' . 
                 htmlspecialchars($this_menu_link[0]) . '">' . 
                 htmlspecialchars($this_menu_link[0]) . 
                 '</option>';
        
        }
        
        echo '      </select>
                  </span>
                </div>
                <div class="class_menu_detail_row">
                  <span class="class_menu_detail_row_label"><b>' . ALPHA_CMS::Load_Content('lang_code_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_menu_detail_row_value">
                    <select id="insert_select_lang_code" class="class_required">';
        
        foreach($langs as $this_lang)
            echo '<option value="' . htmlspecialchars($this_lang[0]) . '">' . htmlspecialchars($this_lang[0]) . '</option>';
        
        echo '      </select>
                  </span>
                </div>
                <div class="class_menu_detail_row">
                  <span class="class_menu_detail_row_label"><b>' . ALPHA_CMS::Load_Content('sort_order_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_menu_detail_row_value"><input id="insert_sort_order" class="class_required" 
                        maxlength="3" value="" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>';
        
        if($_SESSION['ALPHA_CMS_USER'] == 'admin')
        {
        
            echo '<div class="class_menu_detail_row">
                  <span class="class_menu_detail_row_label"><b>' . 
            ALPHA_CMS::Load_Content('protected_content_label', 'content', $_POST['lang_code']) . 
                  ': </b></span>
                  <span class="class_menu_detail_row_value">
                    <input id="insert_protected_content" type="checkbox" value="0" />
                  </span>
                </div>';
        
        }
        
        else
            echo '<input id="insert_protected_content" type="hidden" value="0" />';
        
        echo '  <div id="confirm_insert" class="class_menu_detail_row_label" 
                      onclick="Insert_This_Menu();">' . 
                 ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . ' 
                </div>
             </div>
             <div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 0px;"></div>
           </div>';
        
        return 1;
    
    }
    
    return 0;

?>
