<?php

    /*
    
        GreyOS Inc. - TALOS (Login & Registration Manager GUI)
        
        Version: 1.0
        
        File name: talos.php
        Description: This file contains the TALOS - Login & Registration Manager GUI extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    function TALOS()
    {
    
        $this_lang = ALPHA_CMS::Get_Language();

        $login_username = ALPHA_CMS::Load_Content('login_username', 'content', $this_lang);
        $login_password = ALPHA_CMS::Load_Content('login_password', 'content', $this_lang);
        $confirm_password = ALPHA_CMS::Load_Content('confirm_label', 'content', $this_lang);
        $signup_email = ALPHA_CMS::Load_Content('email_label', 'content', $this_lang);
        $login = ALPHA_CMS::Load_Content('login', 'content', $this_lang);
        $signup = ALPHA_CMS::Load_Content('signup', 'content', $this_lang);

?>

    <audio id="splash">
        <source src="/cms/themes/greyos/sounds/splash.mp3" type="audio/mpeg">
    </audio>

    <script type="text/javascript">

        (function()
        {

            // Initialize Boo
            boo.start();

        })();

    </script>

    <script type="text/javascript" src="/framework/extensions/php/talos/talos_ctrl.js"></script>
    <div class="talos_header">
        <div class="header_middle">
            <div class="greyos_logo"></div>
            <div class="demo">DEMO</div>
        </div>
    </div>
    <div class="talos_content">
        <div class="talos_forms">
            <div class="register_form">
                <div class="header">Welcome!</div>
                <div class="sub_header">Sign up and become a user!</div>
                <div>
                    <input id="talos_reg_username_text" class="fields" 
                           type="text" maxlength="16" placeholder="<?php echo $login_username; ?>">
                </div>
                <div>
                    <input id="talos_email_text" class="fields" 
                           type="text" maxlength="100" placeholder="<?php echo $signup_email; ?>">
                </div>
                <div>
                    <input id="talos_reg_password_text" class="fields" 
                           type="password" maxlength="16" placeholder="<?php echo $login_password; ?>">
                </div>
                <div>
                    <input id="talos_confirm_password_text" class="fields" 
                           type="password" maxlength="16" placeholder="<?php echo $confirm_password; ?>">
                </div>
                <div>
                    <input id="talos_signup_button" type="button" value="<?php echo $signup; ?>">
                </div>
                <div class="terms_conditions">
                    <a href="/tmp/GreyOS-Terms_Conditions.pdf" target="_blanks">Terms & Conditions</a>
                </div>
            </div>
            <div class="login_form">
                <div class="header">Already a user?</div>
                <div>
                    <input id="talos_username_text" class="fields" 
                           type="text" maxlength="16" placeholder="<?php echo $login_username; ?>">
                </div>
                <div>
                    <input id="talos_password_text" class="fields" 
                           type="password" maxlength="16" placeholder="<?php echo $login_password; ?>">
                </div>
                <div class="forgot_password">
                    <div id="forgot_password_link">Forgot your password Dude?</div>
                </div>
                <div>
                    <input id="talos_login_button" type="button" value="<?php echo $login; ?>">
                </div>
                <div id="talos_forgot_password_form">
                    <input id="talos_password_reminder_text" class="fields" 
                           type="text" maxlength="100" placeholder="<?php echo $login_username . ' / ' . $signup_email; ?>">
                </div>
            </div>
        </div>
        <div id="talos_info"></div>
    </div>
    <div class="talos_footer">
        <div class="copyright">Copyright &copy; <?php echo date('Y'); ?> - GreyOS Inc.&nbsp;&nbsp;|&nbsp;&nbsp;</div>
        <div class="contact"><a href="mailto:contact@greyos.gr">contact@greyos.gr</a></div>
        <div class="greyos_logo"></div>
    </div>

<?php

    }

?>

    <script type="text/javascript">

        (function()
        {

            // Terminate Boo
            setTimeout(function() { boo.stop(); }, 3000);

        })();

    </script>
