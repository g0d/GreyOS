<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: dhtml.php
        Description: This file contains the back-end DHTML.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    if (!defined('ALPHA_CMS'))
        die('ERROR: Unable to load ALPHA CMS!');
    
    $dhtml_lang = ALPHA_CMS::Get_Language();
    
    $func_name = ALPHA_CMS::MVC_Get_Route('1');
    
    if ($func_name == 'admin' && !empty($_SESSION['ALPHA_CMS_USER_ID']))
        header('Location: http://' . $_SERVER['HTTP_HOST'] . '/' . $dhtml_lang . '/admin/dashboard/');
    
    if ($func_name != 'admin' && $func_name != 'admin_dashboard' && 
        $func_name != 'admin_common' && $func_name != 'admin_content' && 
        $func_name != 'admin_menu' && $func_name != 'admin_languages' && 
        $func_name != 'admin_extensions' && $func_name != 'admin_users' && 
        $func_name != 'admin_logs')
    {
    
        if (empty($_SESSION['ALPHA_CMS_USER_ID']))
            header('Location: http://' . $_SERVER['HTTP_HOST'] . '/' . $dhtml_lang . '/admin/');
        
        else
            header('Location: http://' . $_SERVER['HTTP_HOST'] . '/' . $dhtml_lang . '/admin/dashboard/');
    
    }
    
    $this_mvc_route = str_replace('_', '/', $func_name);
    
    require_once('cms/site/common/php/doc_type.php');
    
    $dyn_langs = array();
    $dyn_langs_conf = null;
    $counter = 0;
    
    $dyn_langs = ALPHA_CMS::Execute_SQL_Command('SELECT `lang_code` 
                                                 FROM `alpha_languages`', 1);
    
    foreach ($dyn_langs as $lang_code)
    {
    
        $dyn_langs_conf .= "Setup_Language(" . $counter . ", '" . $lang_code[0] . "');";
        
        $counter++;
    
    }
    
    $dyn_langs = ALPHA_CMS::Execute_SQL_Command('SELECT `lang_code` 
                                                 FROM `alpha_languages` 
                                                 WHERE `is_default` = 1', 1);
    
    $dyn_langs_conf .= "Set_Default_Lang('" . ALPHA_CMS::Get_Default_Language() . "');";

?>

<html>

    <head>
        <?php require_once('cms/site/back_end/php/header.php'); ?>
        
        <?php if ($func_name == 'admin'): ?>
        <style type="text/css" media="screen">
        
            #languages
            {
            
                margin-top: 42px;
            
            }
            
            #main_content
            {
            
                min-height: 570px;
            
            }
        
        </style>
        <?php elseif ($func_name == 'admin_menu'): ?>
        <style type="text/css" media="screen">
        
            #search_bar_div
            {

                float: right !important;

            }

            #new_search
            {

                float: right;

            }
        
        </style>
        <?php elseif ($func_name == 'admin_extensions'): ?>
        <style type="text/css" media="screen">
        
            #search_bar_div
            {
            
                margin-left: 0px !important;

            }
        
        </style>
        <?php endif; ?>
        
        <?php if ($func_name != 'admin'): ?>
        <style type="text/css" media="screen">
        
            .logo
            {
           
                margin-top: -2px;
           
            }
        
        </style>
        <?php endif; ?>
    </head>
    
    <body onLoad="<?php echo $dyn_langs_conf; ?>
                  Setup_Lang_Pix(0, 'lang_en_pix');
                  Setup_Lang_Pix(1, 'lang_gr_pix');
                  Setup_Lang_Label(0, 'lang_en_label');
                  Setup_Lang_Label(1, 'lang_gr_label');
                  Init_Languages();
                  Fix_Greek_Lang_Pos();">
        
        <form id="admin_form_dhtml" method="post" action="<?php echo '/' . $dhtml_lang . '/' . $this_mvc_route . '/'; ?>">

            <div id="header">

                <?php 

                    require_once('cms/site/back_end/php/user.php');

                    ALPHA_CMS::Load_Extension('logout', 'php');

                    require_once('cms/site/common/php/logo.php');
                    require_once('cms/site/common/php/langs.php');

                    if (!empty($_SESSION['ALPHA_CMS_USER_ID']))
                        require_once('cms/site/back_end/php/navigation.php');

                ?>

            </div>

            <div id="main_content">

                <div id="dynamic_content">
                
                <?php
                
                    $virtual_routes = array(0 => 'admin_dashboard', 
                                            1 => 'admin_common', 
                                            2 => 'admin_content', 
                                            3 => 'admin_menu', 
                                            4 => 'admin_languages', 
                                            5 => 'admin_extensions', 
                                            6 => 'admin_users', 
                                            7 => 'admin_logs');
                    
                    if (empty($_SESSION['ALPHA_CMS_USER_ID']))
                    {
                    
                        ALPHA_CMS::MVC_Setup_Route('admin');
                        
                        $result = ALPHA_CMS::MVC_Go_To('admin');
                    
                    }
                    
                    if (!empty($_SESSION['ALPHA_CMS_USER_ID']) && $func_name != 'admin')
                    {
                    
                        ALPHA_CMS::MVC_Setup_Route($func_name);
                        
                        $result = ALPHA_CMS::MVC_Go_To($func_name);
                    
                    }
                    
                    if (empty($_SESSION['ALPHA_CMS_USER_ID']) && $func_name != 'admin' && 
                        in_array($func_name, $virtual_routes))
                        header('Location: http://' . $_SERVER['HTTP_HOST'] . '/' . $dhtml_lang . '/admin/');
                
                ?>
                
                </div>

            </div>

            <?php require_once('cms/site/common/php/footer.php'); ?>

        </form>
    
    </body>

</html>
