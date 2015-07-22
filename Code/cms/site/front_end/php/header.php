<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: header.php
        Description: This file contains the site header.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    $binded_routes = array();
    
    $this_mvc_route = ALPHA_CMS::MVC_Get_Route('1');
    
    $header_lang = ALPHA_CMS::Get_Language();
    
    if (in_array($this_mvc_route, $binded_routes))
    {
    
        $description = ALPHA_CMS::Load_Common('site_description', $this_mvc_route, $header_lang);
        $keywords = ALPHA_CMS::Load_Common('site_keywords', $this_mvc_route, $header_lang);
        $title = ALPHA_CMS::Load_Common('site_title', $this_mvc_route, $header_lang);
    
    }
    
    else
    {
    
        $description = ALPHA_CMS::Load_Common('site_description', 'root', $header_lang);
        $keywords = ALPHA_CMS::Load_Common('site_keywords', 'root', $header_lang);
        $title = ALPHA_CMS::Load_Common('site_title', 'root', $header_lang);
    
    }

?>

        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="robots" content="index, follow">
        <meta name="description" content="<?php echo $description; ?>">
        <meta name="keywords" content="<?php echo $keywords; ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
        <link rel="icon" type="image/ico" href="/cms/themes/greyos/pix/greyos.ico">
        <link rel="styleSheet" href="/cms/themes/greyos/greyos.css" type="text/css" media="screen">
        <link href="http://fonts.googleapis.com/css?family=Ubuntu:400,500&subset=latin,greek" rel="stylesheet" type="text/css">

        <?php

            //ALPHA_CMS::Load_Extension('jquery', 'js');
            ALPHA_CMS::Load_Extension('tween_max', 'js');
            ALPHA_CMS::Load_Extension('bull', 'js');

        ?>

        <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script type="text/javascript" src="/framework/extensions/ajax/forms_manager/input_controller.js"></script>
        <script type="text/javascript" src="/framework/extensions/ajax/forms_manager/form_validator.js"></script>
        <script type="text/javascript" src="/cms/site/common/js/misc.js"></script>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>

        <title><?php echo $title; ?></title>
