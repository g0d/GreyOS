<?php

    /*
    
        GreyOS - ALPHA CMS
        
        Version: 10.0
        
        File name: user.php
        Description: This file contains the user div.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    $user_lang = ALPHA_CMS::Get_Language();
    
    if (!empty($_SESSION['ALPHA_CMS_USER_ID']))
    {
    
        echo '<div id="user_login_name">' . ALPHA_CMS::Load_Content('user_label', 'content', $user_lang) . 
                                            $_SESSION['ALPHA_CMS_USER'] . '</div>';
    
    }
    
    else
        echo '<div id="separator" style="float:left; margin-bottom: 24px;"></div>';

?>
