<?php

    /*
    
        GreyOS Inc. - Registration Form
        
        Version: 2.0
        
        File name: reg_form.php
        Description: This file contains the Registration Form extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    $this_lang = ALPHA_CMS::Get_Language();
    
    $reg_username = ALPHA_CMS::Load_Content('reg_username', 'content', $this_lang);
    $reg_password = ALPHA_CMS::Load_Content('reg_password', 'content', $this_lang);
    $reg_confirm_pass = ALPHA_CMS::Load_Content('confirm', 'content', $this_lang);
    $reg_email = ALPHA_CMS::Load_Content('reg_email', 'content', $this_lang);
    $reg_confirm_email = ALPHA_CMS::Load_Content('confirm', 'content', $this_lang);
    $register = ALPHA_CMS::Load_Content('register', 'content', $this_lang);
    
    ALPHA_CMS::Load_Extension('bull', 'js');
    ALPHA_CMS::Load_Extension('forms_manager', 'ajax');

?>

    <script type="text/javascript" src="/framework/extensions/ajax/forms_manager/forms_manager.js"></script>

    <script type="text/javascript">

        var reg_form_elements = new Array();

        reg_form_elements[0] = 'register_username_text';
        reg_form_elements[1] = 'register_password_text';
        reg_form_elements[2] = 'register_confirm_password_text';
        reg_form_elements[3] = 'register_email_text';
        reg_form_elements[4] = 'register_confirm_email_text';

    </script>

    <div id="register_controls">
        <div id="register_username">
            <div id="register_username_label">
                <?php echo $reg_username; ?>
            </div>
            <input id="register_username_text" type="text" maxlength="16" 
                   onkeypress="return Input_Controller(this, event);" />
        </div>
        <div id="register_password">
            <div id="register_password_label">
                <?php echo $reg_password; ?>
            </div>
            <input id="register_password_text" type="password" maxlength="16" 
                   onkeypress="return Input_Controller(this, event);" />
            <div id="register_confirm_password_label">
                <?php echo $reg_confirm_pass; ?>
            </div>
            <input id="register_confirm_password_text" type="password" maxlength="16" 
                   onkeypress="return Input_Controller(this, event);" />
        </div>
        <div id="register_email">
            <div id="register_email_label">
                <?php echo $reg_email; ?>
            </div>
            <input id="register_email_text" type="text" maxlength="30" 
                   onkeypress="return Input_Controller(this, event);" />
            <div id="register_confirm_email_label">
                <?php echo $reg_confirm_email; ?>
            </div>
            <input id="register_confirm_email_text" type="text" maxlength="30" 
                   onkeypress="return Input_Controller(this, event);" />
        </div>
        <div id="register_button">
            <a id="register" class="class_buttons_white_links" href="JavaScript:void(0);" 
               onclick="Form_Validator('reg_form', reg_form_elements);">
                <?php echo $register; ?>
            </a>
        </div>
        <div id="register_error" class="class_errors"></div>
    </div>
