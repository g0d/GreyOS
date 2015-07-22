<?php

    /*
    
        GreyOS - ALPHA CMS
        
        Version: 10.0
        
        File name: navigation.php
        Description: This file contains the admin navigation.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    $nav_lang = ALPHA_CMS::Get_Language();
    
    echo '<div class="nav">
          
            <ul>
                <li>
                    <a id="dashboard" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_dashboard')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/dashboard/">' . 
                        ALPHA_CMS::Load_Content('dashboard', 'content', $nav_lang) . '
                    </a>
                </li>
                <li>
                    <a id="common" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_common')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/common/">' . 
                        ALPHA_CMS::Load_Content('common', 'content', $nav_lang) . '
                    </a>
                </li>
                <li>
                    <a id="content" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_content')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/content/">' . 
                        ALPHA_CMS::Load_Content('content', 'content', $nav_lang) . '
                    </a>
                </li>
                <li>
                    <a id="menu" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_menu')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/menu/">' . 
                        ALPHA_CMS::Load_Content('menu', 'content', $nav_lang) . '
                    </a>
                </li>
                <li>
                    <a id="langs" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_languages')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/languages/">' . 
                        ALPHA_CMS::Load_Content('languages', 'content', $nav_lang) . '
                    </a>
                </li>
                <li>
                    <a id="ext" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_extensions')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/extensions/">' .
                        ALPHA_CMS::Load_Content('extensions', 'content', $nav_lang) . '
                    </a>
                </li>
                <li>
                    <a id="users" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_users')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/users/">' . 
                        ALPHA_CMS::Load_Content('users', 'content', $nav_lang) . '
                    </a>
                </li>
                <li>
                    <a id="logs" ';
    
    if (ALPHA_CMS::MVC_Get_Route('1') == 'admin_logs')
        echo 'class="active"';
    
    echo ' href="/' . $nav_lang . '/admin/logs/">' . 
                        ALPHA_CMS::Load_Content('logs', 'content', $nav_lang) . '
                    </a>
                </li>
            </ul>
          
          </div>';

?>
