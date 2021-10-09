<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: edit_common.php
        Description: This file contains the AJAX edit common.
        
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
    
    // Commons array
    $commons = array();
    
    // Languages array
    $langs = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['edit'] == 1 && !empty($_POST['common_id']) && !empty($_POST['lang_code']))
    {
    
        $commons = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_common`.`id`, `site_title`, `site_description`, `site_keywords`, 
                                                          `company_name`, `company_site`, `footer_info`, `binded_route`, 
                                                          `lang_code`, `alpha_common`.`is_protected` 
                                                   FROM `alpha_common` 
                                                   INNER JOIN `alpha_languages` 
                                                   ON `alpha_common`.`lang_id` = `alpha_languages`.`id` 
                                                   WHERE `alpha_common`.`id` = ' . 
                                                   mysqli_real_escape_string($db_con, $_POST['common_id']), 1);
        
        $routes = ALPHA_CMS::Execute_SQL_Command('SELECT DISTINCT `page` 
                                                  FROM `alpha_content` 
                                                  WHERE `is_route` = 1', 1);
        
        $langs = ALPHA_CMS::Execute_SQL_Command('SELECT `lang_code` 
                                                 FROM `alpha_languages`', 1);
        
        echo '<div id="commons_details_title">' . ALPHA_CMS::Load_Content('edit_common_label', 'content', $_POST['lang_code']) . 
                '<div id="commons_details_x" onclick="Close_Common_Details();">X</div>
              </div>
              <div id="commons_details_area">
                <div class="class_common_detail_row">
                    <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('id_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_common_detail_row_value">' . $commons[0][0] . '</span>
                </div>
                <div class="class_common_detail_row">
                    <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('site_title_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_common_detail_row_value"><input id="edit_site_title" class="class_required" 
                          maxlength="60" value="' . htmlspecialchars($commons[0][1]) . '" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_common_detail_row">
                    <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('site_description_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_common_detail_row_value"><input id="edit_site_description" maxlength="170" 
                          value="' . htmlspecialchars($commons[0][2]) . '" 
                          onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_common_detail_row">
                  <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('site_keywords_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_common_detail_row_value"><input id="edit_site_keywords" maxlength="255" 
                        value="' . htmlspecialchars($commons[0][3]) . '" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_common_detail_row">
                  <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('company_name_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_common_detail_row_value"><input id="edit_company_name" maxlength="100" 
                        value="' . htmlspecialchars($commons[0][4]) . '" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_common_detail_row">
                  <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('company_site_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_common_detail_row_value"><input id="edit_company_site" maxlength="255" 
                        value="' . htmlspecialchars($commons[0][5]) . '" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_common_detail_row">
                  <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('footer_info_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_common_detail_row_value"><input id="edit_footer_info" maxlength="255" 
                        value="' . htmlspecialchars($commons[0][6]) . '" 
                        onkeypress="return Input_Controller(this, event);" /></span>
                </div>
                <div class="class_common_detail_row">
                  <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('binded_route_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_common_detail_row_value">
                    <select id="edit_select_route" class="class_required">';
        
        if ($commons[0][7] == 'root')
        {
        
            echo '<option selected value="root">' . ALPHA_CMS::Load_Content('root_label', 'content', $_POST['lang_code']) . '</option>';
            
            foreach($routes as $this_route)
                echo '<option value="' . htmlspecialchars($this_route[0]) . '">' . htmlspecialchars($this_route[0]) . '</option>';
        
        }
        
        else
        {
        
            echo '<option value="root">' . ALPHA_CMS::Load_Content('root_label', 'content', $_POST['lang_code']) . '</option>';
            
            foreach($routes as $this_route)
            {
            
                if ($this_route[0] == $commons[0][7])
                    echo '<option selected value="' . htmlspecialchars($this_route[0]) . '">' . htmlspecialchars($this_route[0]) . '</option>';
                
                else
                    echo '<option value="' . htmlspecialchars($this_route[0]) . '">' . htmlspecialchars($this_route[0]) . '</option>';
            
            }
        
        }
        
        echo '      </select>
                  </span>
                </div>
                <div class="class_common_detail_row">
                  <span class="class_common_detail_row_label"><b>' . ALPHA_CMS::Load_Content('lang_code_label', 'content', $_POST['lang_code']) . ': </b></span>
                  <span class="class_common_detail_row_value">
                    <select id="edit_select_lang_code" class="class_required">';
        
        foreach($langs as $this_lang)
        {
        
            if ($this_lang[0] == $commons[0][8])
                echo '<option selected value="' . htmlspecialchars($this_lang[0]) . '">' . htmlspecialchars($this_lang[0]) . '</option>';
            
            else
                echo '<option value="' . htmlspecialchars($this_lang[0]) . '">' . htmlspecialchars($this_lang[0]) . '</option>';
        
        }
        
        echo '      </select>
                  </span>
                </div>';
       
        if($_SESSION['ALPHA_CMS_USER'] == 'admin')
        {
        
            echo '<div class="class_common_detail_row">
                    <span class="class_common_detail_row_label"><b>' . 
            ALPHA_CMS::Load_Content('protected_content_label', 'content', $_POST['lang_code']) . 
                    ': </b></span>
                    <span class="class_common_detail_row_value">'; 
            
            if (!empty($commons[0][9]))
                echo '<input id="edit_protected_content" type="checkbox" checked value="1" />';
            else
                echo '<input id="edit_protected_content" type="checkbox" value="0" />';
            
            echo '  </span>
                  </div>';
        
        }
        
        else
            echo '<input id="edit_protected_content" type="hidden" value="0" />';
        
        echo '  <div id="confirm_update" class="class_common_detail_row_label" 
                     onclick="Update_This_Common(' . $commons[0][0] . ');" />' . 
                 ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . ' 
                </div>
             </div>
             <div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 0px;"></div>
           </div>';
        
        return 1;
    
    }
    
    return 0;

?>
