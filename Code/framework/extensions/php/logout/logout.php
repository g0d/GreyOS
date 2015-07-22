<?php

    /*
    
        GreyOS Inc. - Logout
        
        Version: 2.2
        
        File name: logout.php
        Description: This file contains the Logout extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    if (empty($_SESSION['ALPHA_CMS_USER_ID']))
        return false;
    
    $my_lang = ALPHA_CMS::Get_Language();
    
    if (!empty($_POST['logout_id']) && !is_nan($_POST['logout_id']))
    {
    
        session_destroy();
        
        header('Location: http://' . $_SERVER['HTTP_HOST'] . '/' . $my_lang . '/admin/');
    
    }
    
    echo '<script type="text/javascript">
          
            function Log_Out(id)
            {
            
                var form = null;
                var dyn_element = null;
                
                if (isNaN(id))
                    return false;
                
                form = document.getElementsByTagName(\'form\');
                
                dyn_element = document.createElement(\'input\');
                
                dyn_element.setAttribute(\'id\', \'logout_id\');
                dyn_element.setAttribute(\'name\', \'logout_id\');
                dyn_element.setAttribute(\'type\', \'hidden\');
                dyn_element.setAttribute(\'value\', \'\');
                
                form[0].appendChild(dyn_element);
                
                document.getElementById(\'logout_id\').value = id;
                
                form[0].submit();
                
                return true;
            
            }
          
          </script>
          <input id="logout" onclick="Log_Out(' . $_SESSION['ALPHA_CMS_USER_ID'] . ');" class="button" 
                 type="button" value="' . ALPHA_CMS::Load_Content('logout_label', 'content', $my_lang) . '" />';

?>
