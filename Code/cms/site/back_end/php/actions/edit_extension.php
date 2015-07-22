<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: edit_extension.php
        Description: This file contains the AJAX edit extension.
        
        Coded by George Delaportas (G0D) & Konstantinos Gkoutzis (KGK)
        
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
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['edit'] == 1 && 
        !empty($_POST['extension_name']) && !empty($_POST['extension_type']) && 
        !empty($_POST['lang_code']))
    {
    
        $ext_path = ALPHA_CMS::Absolute_Path('framework/extensions/');
        $this_ext_title = $_POST['extension_name'];
        $this_ext_path = $ext_path . $_POST['extension_type'] . '/' . $this_ext_title . '/';
        $this_ext_XML = $this_ext_path . $this_ext_title . '.xml';
        
        echo '<div id="exts_details_title">' . ALPHA_CMS::Load_Content('set_ext_label', 'content', $_POST['lang_code']) . 
                '<div id="exts_details_x" onclick="Close_Ext_Details();">X</div>
              </div>
              <div id="exts_details_area">
                <div class="class_ext_detail_row">
                    <span class="class_ext_detail_row_label"><b>' . 
                    ALPHA_CMS::Load_Content('ext_title_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <span class="class_ext_detail_row_value">' . $this_ext_title . '</span>
                </div>';
        
        if (file_exists($this_ext_XML) && strlen(file_get_contents($this_ext_XML)) >= 103)
        {
        
            $xml_config = ALPHA_CMS::Convert_XML_To_Array($this_ext_XML);
            
            $i = 0;
            
            echo '<div id="ext_form">';
            
            foreach ($xml_config as $key => $value)
            {
            
                if ($i > 1)
                {
                
                    echo '<div class="class_ext_detail_row">
                            <span class="class_ext_detail_row_label"><b>' . $key . ': </b></span>
                            <input class="class_ext_detail_row_value" id="' . $key . '" 
                                   name="' . $key . '" type="text" value="' . htmlspecialchars($value) .'" />
                          </div>';
                }
                
                else
                {
                
                    if ($key == 'status')
                    {
                    
                        echo '<div class="class_ext_detail_row">
                                <span class="class_ext_detail_row_label"><b>' . 
                                ALPHA_CMS::Load_Content('status_label', 'content', $_POST['lang_code']) . ': </b></span>';
                        
                        if ($value == '1' || $value == 'on')
                        {
                        
                            echo '<input class="class_checkbox class_ext_detail_row_value class_required" id="' . $key . '" 
                                         name="' . $key . '" type="checkbox" value="1" checked />';
                        
                        }
                        
                        else
                        {
                        
                            echo '<input class="class_checkbox class_ext_detail_row_value class_required" id="' . $key . '" 
                                         name="' . $key . '" type="checkbox" value="0" />';
                        
                        }
                        
                        echo '</div>';
                    
                    }
                    
                    else
                    {
                    
                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                        {
                        
                            echo '<div class="class_ext_detail_row">
                                    <span class="class_ext_detail_row_label"><b>' . 
                                    ALPHA_CMS::Load_Content('protected_content_label', 'content', $_POST['lang_code']) . ': </b></span>';

                            if ($value == '1' || $value == 'yes')
                            {

                                echo '<input class="class_checkbox class_ext_detail_row_value class_required" id="' . $key . '" 
                                             name="' . $key . '" type="checkbox" value="1" checked />';

                            }

                            else
                            {

                                echo '<input class="class_checkbox class_ext_detail_row_value class_required" id="' . $key . '" 
                                             name="' . $key . '" type="checkbox" value="0" />';

                            }

                            echo '</div>';
                        
                        }
                        
                        else
                            echo '<input id="' . $key . '" name="' . $key . '" type="hidden" value="0" />';
                    
                    }
                
                }
                
                $i++;
            
            }
            
            echo '</div>';
            
            echo '<div id="confirm_update" class="class_ext_detail_row_label" 
                     onclick="Update_This_Ext(' . '\'' . $this_ext_title . '\'' . ', ' . 
                                              '\'' . $_POST['extension_type'] . '\'' . ')">' . 
                  ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                 '</div>
                  <div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 10px;"></di>';
        
        }
        
        else
            echo '<div id="errors" class="class_errors" style="float: left; clear: both; margin-top: 10px;">' . 
                  ALPHA_CMS::Load_Content('notice_no_set', 'content',  $_POST['lang_code']) . 
                  '<div>';
        
        echo '</div>';
        
        return 1;
    
    }
    
    return 0;

?>
