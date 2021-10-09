<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: content_details.php
        Description: This file contains the AJAX content details.
        
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
    
    // Contents array
    $contents = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    if ($_POST['content'] == 1 && !empty($_POST['content_id']) && !empty($_POST['lang_code']))
    {
    
        $contents = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_content`.`id`, `page`, `content`, 
                                                           `keywords`, `alpha_content`.`is_protected`, `is_route`, 
                                                           `lang_code` 
                                                    FROM `alpha_content` 
                                                    INNER JOIN `alpha_languages` 
                                                    ON `alpha_content`.`lang_id` = `alpha_languages`.`id` 
                                                    WHERE `alpha_content`.`id` = ' . 
                                                    mysqli_real_escape_string($db_con, $_POST['content_id']), 1);
        
        if (!empty($contents[0][4]))
            $protected_answer = ALPHA_CMS::Load_Content('yes_label', 'content', $_POST['lang_code']);
        
        else
            $protected_answer = ALPHA_CMS::Load_Content('no_label', 'content', $_POST['lang_code']);
        
        if (!empty($contents[0][5]))
            $routes_answer = ALPHA_CMS::Load_Content('yes_label', 'content', $_POST['lang_code']);
        
        else
            $routes_answer = ALPHA_CMS::Load_Content('no_label', 'content', $_POST['lang_code']);
        
        echo '<div id="contents_details_title">' . ALPHA_CMS::Load_Content('content_details_label', 'content', $_POST['lang_code']) . 
                '<div id="contents_details_x" onclick="Close_Content_Details();">X</div>
              </div>
              <div id="contents_details_area">
                <div>
                    <span><b>' . ALPHA_CMS::Load_Content('id_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    $contents[0][0] . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('page_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($contents[0][1]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('content_label', 'content', $_POST['lang_code']) . ': </b></span>
                    <br>
                    <div id="view_content">' . $contents[0][2] . '</div>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('page_keywords_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($contents[0][3]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('lang_code_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    htmlspecialchars($contents[0][6]) . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('protected_content_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    $protected_answer . '</span>
                </div>
                <div>
                    <span><b>'. ALPHA_CMS::Load_Content('route_label', 'content', $_POST['lang_code']) . ': </b></span><span>' . 
                    $routes_answer . '</span>
                </div>
              </div>';
    
        return 1;
    
    }
    
    return 0;

?>
