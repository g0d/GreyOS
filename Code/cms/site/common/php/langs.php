<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: langs.php
        Description: This file contains the common languages.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    $chosen_lang = ALPHA_CMS::Get_Language();
    
    $lang_english = ALPHA_CMS::Load_Content('english', 'content', $chosen_lang);
    $lang_greek = ALPHA_CMS::Load_Content('greek', 'content', $chosen_lang);

?>

    <div id="languages" class="class_languages">
        <div id="lang_en">
            <img id="lang_en_pix" src="/cms/themes/default/pix/langs/en_out.png" alt="English" onmouseup="Change_Language('en');"
                 onmouseover="Lang_Pix_Over('lang_en_pix', 'en');"
                 onmouseout="Lang_Pix_Out('lang_en_pix', 'en');">
            <br>
            <span id="lang_en_label" onmouseup="Change_Language('en');"><?php echo $lang_english; ?></span>
        </div>
        <div id="lang_gr">
            <img id="lang_gr_pix" src="/cms/themes/default/pix/langs/gr_out.png" alt="Greek" onmouseup="Change_Language('gr');" 
                 onmouseover="Lang_Pix_Over('lang_gr_pix', 'gr');"
                 onmouseout="Lang_Pix_Out('lang_gr_pix', 'gr');">
            <br>
            <span id="lang_gr_label" onmouseup="Change_Language('gr');"><?php echo $lang_greek; ?></span>
        </div>
    </div>
