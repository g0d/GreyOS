<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: extension_delete.php
        Description: This file contains the extensions deletion message box.
        
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
    
    if (!empty($_POST['delete']) && !empty($_POST['extension_name']) && !empty($_POST['extension_type']) && !empty($_POST['lang_code']))
    {
    
        echo '<div id="exts_details_title">' . ALPHA_CMS::Load_Content('del_ext_label', 'content', $_POST['lang_code']) . 
                '<div id="exts_details_x" onclick="Close_Ext_Details();">X</div>
              </div>
              <div id="exts_details_area">
                <div><b>' . ALPHA_CMS::Load_Content('are_you_sure_ext_label', 'content',  $_POST['lang_code']) . '</b> ' . 
                strtoupper($_POST['extension_type']) . ' <b>'. ALPHA_CMS::Load_Content('extension_label', 'content',  $_POST['lang_code']) . ':</b> ' . 
                $_POST['extension_name'] . '</div>
                <div>
                <div id="confirm_delete" 
                     onclick="Delete_This_Ext(' . '\'' . $_POST['extension_name'] . '\'' . ', ' . '\'' . $_POST['extension_type'] . '\'' . ')">' . 
                ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                '</div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
