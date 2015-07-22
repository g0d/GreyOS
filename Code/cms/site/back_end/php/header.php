<?php

    /*
    
        GreyOS - ALPHA CMS
        
        Version: 10.0
        
        File name: header.php
        Description: This file contains the admin header.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    $header_lang = ALPHA_CMS::Get_Language();
    
    echo '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="robots" content="index, nofollow">
          <meta name="description" content="' . ALPHA_CMS::Load_Common('site_description', 'root', $header_lang) . '">
          <meta name="keywords" content="' . ALPHA_CMS::Load_Common('site_keywords', 'root', $header_lang) . '">
          <link rel="Icon" type="image/ico" href="/cms/themes/default/pix/alpha_cms.ico">
          <link rel="StyleSheet" href="/cms/themes/default/admin.css" type="text/css" media="screen">
          <script type="text/javascript" src="/cms/site/common/js/misc.js"></script>
          <script type="text/javascript" src="/framework/extensions/ajax/forms_manager/input_controller.js"></script>
          <script type="text/javascript" src="/framework/extensions/ajax/forms_manager/form_validator.js"></script>
          <title>' . ALPHA_CMS::Load_Content('admin_site_title', 'content', $header_lang) . '</title>';
    
    // Load all needed extensions
    ALPHA_CMS::Load_Extension('languages_manager', 'js');
    ALPHA_CMS::Load_Extension('bull', 'js');
    
    if (!empty($_SESSION['ALPHA_CMS_USER_ID']))
    {
    
        ALPHA_CMS::Load_Extension('menu_manager', 'ajax');
        ALPHA_CMS::Load_Extension('content_manager', 'ajax');
    
    }

?>
