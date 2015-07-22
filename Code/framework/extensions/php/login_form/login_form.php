<?php

    /*
    
        GreyOS Inc. - Login Form
        
        Version: 2.0
        
        File name: login_form.php
        Description: This file contains the Login Form extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    $this_lang = ALPHA_CMS::Get_Language();
    
    $admin_panel = ALPHA_CMS::Load_Content('admin_panel', 'content', $this_lang);
    $login_username = ALPHA_CMS::Load_Content('login_username', 'content', $this_lang);
    $login_password = ALPHA_CMS::Load_Content('login_password', 'content', $this_lang);
    $login = ALPHA_CMS::Load_Content('login', 'content', $this_lang);

?>

    <script type="text/javascript" src="/framework/extensions/ajax/forms_manager/forms_manager.js"></script>
    
    <script type="text/javascript">

        var login_form_elements = new Array();

        login_form_elements[0] = 'login_username_text';
        login_form_elements[1] = 'login_password_text';
        
        function Login(key_event)
        {

            if (key_event.keyCode === 13)
            {

                Form_Validator('login_form', login_form_elements);

                return true;

            }

            return false;

        }

    </script>
    
    <div id="admin_panel_label"><?php echo $admin_panel; ?></div>

    <div id="login_controls">
        <div id="login_username" class="class_seperation">
            <div id="login_username_label">
                <?php echo $login_username; ?>
            </div>
            <input id="login_username_text" type="text" maxlength="16" 
                   onkeypress="return Input_Controller(this, event);" 
                   onkeydown="Login(event);" />
        </div>
        <div id="login_password" class="class_seperation">
            <div id="login_password_label">
                <?php echo $login_password; ?>
            </div>
            <input id="login_password_text" type="password" maxlength="16" 
                   onkeypress="return Input_Controller(this, event);" 
                   onkeydown="Login(event);" />
        </div>
        <input id="login" onclick="Form_Validator('login_form', login_form_elements);" class="button" 
               type="button" value="<?php echo $login; ?>" />
        <div id="login_error" style="margin-top: 10px;" class="class_errors"></div>
    </div>
