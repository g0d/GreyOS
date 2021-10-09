<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: lang_delete.php
        Description: This file contains the AJAX languages deletion message box.
        
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
    require('../../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../../cms/alpha_cms.php');
    
    // Languages array
    $langs = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['delete'] == 1 && !empty($_POST['lang_id']) && !empty($_POST['lang_code']))
    {
    
        $langs = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `language`, `is_protected` 
                                                 FROM `alpha_languages` 
                                                 WHERE `id` = ' . 
                                                 mysqli_real_escape_string($db_con, $_POST['lang_id']), 1);
        
        if (!empty($langs[0][2]) && $_SESSION['ALPHA_CMS_USER'] != 'admin')
            return 0;
        
        echo '<div id="langs_details_title">' . ALPHA_CMS::Load_Content('del_lang_label', 'content', $_POST['lang_code']) . 
                '<div id="langs_details_x" onclick="Close_Lang_Details();">X</div>
              </div>
              <div id="langs_details_area">
                <div><b>' . ALPHA_CMS::Load_Content('are_you_sure_lang_label', 'content',  $_POST['lang_code']) . '</b> ' . 
                $langs[0][1] . '</div>
                <div>
                <div id="confirm_delete" 
                     onclick="Delete_This_Lang(' . $langs[0][0] . ')">' . 
                ALPHA_CMS::Load_Content('confirm_label', 'content',  $_POST['lang_code']) . 
                '</div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
