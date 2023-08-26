<?php

    /*
    
        GreyOS Inc. - Contact Form
        
        Version: 3.0
        
        File name: contact_form.php
        Description: This file contains the Contact Form extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    // Load helper extensions
    ALPHA_CMS::Load_Extension('recaptcha', 'php');
    ALPHA_CMS::Load_Extension('jquery', 'js');
    
    $this_lang = ALPHA_CMS::Get_Language();
    
    if (!empty($_POST['cf_email']) && !empty($_POST['cf_full_name']) && 
        !is_numeric($_POST['cf_subject']) && !empty($_POST['cf_comments']) && 
        !empty($_POST['recaptcha_challenge_field']) && !empty($_POST['recaptcha_response_field']) && 
        !empty($_POST['cf_code']) && $_POST['cf_code'] == 'a:l:p:h:a')
    {
    
        $from_email = $_POST['cf_email'];
        $to_email = 'contact@localhost-ltd.com';
        $fullname = $_POST['cf_full_name'];
        $subject = $_POST['cf_subject'];
        $body = $_POST['cf_comments'];
        
        $header = 'MIME-Version: 1.0' . "\r\n";
        $header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $header .= "From: " . $fullname . " <" . $from_email . ">\r\n";
        
        $message = '<!DOCTYPE HTML>
                    <html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <meta name="robots" content="index, nofollow">
                        <title>Contact Us</title>
                    </head>
                    <body>
                        <div>
                            IP: ' . $_POST['cf_sender_ip'] . "<br>" . '
                            Contact: ' . $fullname . ' <' . $from_email . '>' . "<br>" . '
                            Comments: ' . "<br>" . $body . '
                        </div>
                    </body>
                    </html>';
        
        if (mail($to_email, $subject, $message, $header))
            echo '<center><div class="error success">' . ALPHA_CMS::Load_Content('msg_report_1', 'content', $this_lang) . '</div></center>';
        
        else
            echo '<center><div class="error">' . ALPHA_CMS::Load_Content('msg_report_2', 'content', $this_lang) . '</div></center>';
        
        echo '<script>
              
                window.setTimeout(\'window.location="/\' + global_lang + \'/"\', 1500);
              
              </script>';
    
    }
    
    else
    {
    
        ALPHA_CMS::Load_Extension('forms_manager', 'ajax');
        
        $customer_service = ALPHA_CMS::Load_Content('customer_service_label', 'content', $this_lang);
        $marketing = ALPHA_CMS::Load_Content('marketing_label', 'content', $this_lang);
        $press = ALPHA_CMS::Load_Content('press', 'content', $this_lang);
        $tech_support = ALPHA_CMS::Load_Content('technical_support_label', 'content', $this_lang);
        $other = ALPHA_CMS::Load_Content('other_label', 'content', $this_lang);

?>

<script>

    var contact_form_elements = new Array();
    
    contact_form_elements[0] = 'cf_full_name';
    contact_form_elements[1] = 'cf_email';
    contact_form_elements[2] = 'cf_subject';
    contact_form_elements[3] = 'cf_comments';
    contact_form_elements[4] = 'recaptcha_challenge_field';
    contact_form_elements[5] = 'recaptcha_response_field';

</script>

<script>

    // Add error class on button click
    $(document).ready(function () {
        $('#cf_button').click(function(){
          if ($("#cf_error").html() != "")
          {
              $("#cf_error").addClass("errors");
          }
        });
      
        $('#cf_clear').click(function(){
              $('#cf_error').removeClass('errors');
        });
    });

</script>

    <div id="contact_form" class="left_area">
        <div><h1><?php echo ALPHA_CMS::Load_Content('contact_form_label', 'content', $this_lang); ?></h1></div>
        <div class="grey_forms_container form area no_seperator_line">
            <div class="form_area">
                <div>
                    <h2><?php echo ALPHA_CMS::Load_Content('full_name_label', 'content', $this_lang); ?></h2>
                </div>
                <input class="textbox" id="cf_full_name" maxlength="30" name="cf_full_name" type="text"
                       onkeypress="return Input_Controller(this, event);">
            </div>

            <div class="form_area">
                <div>
                    <h2><?php echo ALPHA_CMS::Load_Content('email_label', 'content', $this_lang); ?></h2>
                </div>
                <input class="textbox" id="cf_email" maxlength="50" name="cf_email" type="text"
                       onkeypress="return Input_Controller(this, event);">
            </div>

            <div class="form_area">
                <div>
                    <h2><?php echo ALPHA_CMS::Load_Content('subject_label', 'content', $this_lang); ?></h2>
                </div>
                <select class="dropdown" id="cf_subject" name="cf_subject">
                    <option value="-1"><?php echo ALPHA_CMS::Load_Content('select_subject_label', 'content', $this_lang); ?></option>
                    <option value="<?php echo $customer_service; ?>"><?php echo $customer_service; ?></option>
                    <option value="<?php echo $marketing; ?>"><?php echo $marketing; ?></option>
                    <option value="<?php echo $press; ?>"><?php echo $press; ?></option>
                    <option value="<?php echo $tech_support; ?>"><?php echo $tech_support; ?></option>
                    <option value="<?php echo $other; ?>"><?php echo $other; ?></option>
                </select>
            </div>
            <div class="form_area">
                <div>
                    <h2><?php echo ALPHA_CMS::Load_Content('comments_label', 'content', $this_lang); ?></h2>
                </div>
                <textarea class="textarea_contact" id="cf_comments" name="cf_comments" cols="40" rows="5"
                          onkeypress="return Input_Controller(this, event);"></textarea>
            </div>
            <div class="form_area">
                <div class="captcha">
                    <?php reCaptcha::Show('6LfGbtMSAAAAAGVvpxY8CNV35W1q8moQIIGb0q1T'); ?>
                </div>
            </div>
            <div class="clearfix">
                <input type="button" class="contact_button" id="cf_button"
                       onclick="Form_Validator('contact_form', contact_form_elements);"
                       value="<?php echo ALPHA_CMS::Load_Content('send_label', 'content', $this_lang); ?>">
                <input type="reset" class="contact_button" id="cf_clear"
                       onclick="document.getElementById('cf_error').innerHTML = '';"
                       value="<?php echo ALPHA_CMS::Load_Content('clear_label', 'content', $this_lang); ?>">
            </div>
            <div id="cf_error"></div>
            <input id="cf_sender_ip" name="cf_sender_ip" type="hidden" value="<?php echo $_SERVER['REMOTE_ADDR']; ?>">
            <input id="cf_code" name="cf_code" type="hidden" value="a:l:p:h:a">
        </div>
    </div>

<?php

    }

?>
