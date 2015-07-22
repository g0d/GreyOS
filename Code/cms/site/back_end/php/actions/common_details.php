<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: common_details.php
        Description: This file contains the AJAX common details.
        
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
    
    // Include ALPHA Framework class
    require('../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../cms/alpha_cms.php');
    
    // Commons array
    $commons = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['common'] == 1 && !empty($_POST['common_id']) && !empty($_POST['lang_code']))
    {
    
        $commons = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_common`.`id`, `site_title`, `site_description`, `site_keywords`, 
                                                          `company_name`, `company_site`, `footer_info`, `binded_route`, 
                                                          `lang_code`, `alpha_common`.`is_protected` 
                                                   FROM `alpha_common` 
                                                   INNER JOIN `alpha_languages` 
                                                   ON `alpha_common`.`lang_id` = `alpha_languages`.`id` 
                                                   WHERE `alpha_common`.`id` = ' . 
                                                   mysql_real_escape_string($_POST['common_id'], $db_con), 1);
        
        if (!empty($commons[0][9]))
            $protected_answer = ALPHA_CMS::Load_Content('yes_label', 'content', $_POST['lang_code']);
        
        else
            $protected_answer = ALPHA_CMS::Load_Content('no_label', 'content', $_POST['lang_code']);
        
        echo '<div id="commons_details_title">' . ALPHA_CMS::Load_Content('common_details_label', 'content', $_POST['lang_code']) . 
                '<div id="commons_details_x" onclick="Close_Common_Details();">X</div>
              </div>
              <div id="commons_details_area">
                <div>
                    <span><b>' . ALPHA_CMS::Load_Content('id_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    $commons[0][0] . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('site_title_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][1]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('site_description_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][2]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('site_keywords_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][3]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('company_name_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][4]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('company_site_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][5]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('footer_info_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][6]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('binded_route_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][7]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('lang_code_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($commons[0][8]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('protected_content_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    $protected_answer . '</span>
                </div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
