<?php

    /*
    
        GreyOS Inc. - Error Reporter
        
        Version: 1.4
        
        File name: error_reporter.php
        Description: This file contains the Error Reporter extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    // Report an error
    function Error_Reporter($err_code, $lang_code)
    {
    
        if (empty($err_code) || empty($lang_code))
            return false;
        
        $response = null;
        
        switch ($err_code)
        {
        
            // --- Your code from here ---
            
            case 1:
                $response = ALPHA_CMS::Load_Content('error_mal_chars', 'content', $lang_code);
                break;
            
            case 2:
                $response = ALPHA_CMS::Load_Content('error_common_binded_route_lang_exists', 'content', $lang_code);
                break;
            
            case 3:
                $response = ALPHA_CMS::Load_Content('error_common_not_ins', 'content', $lang_code);
                break;
            
            case 4:
                $response = ALPHA_CMS::Load_Content('error_common_not_upd', 'content', $lang_code);
                break;
            
            case 5:
                $response = ALPHA_CMS::Load_Content('error_content_page_exists', 'content', $lang_code);
                break;
            
            case 6:
                $response = ALPHA_CMS::Load_Content('error_route_exists', 'content', $lang_code);
                break;
            
            case 7:
                $response = ALPHA_CMS::Load_Content('error_route_not_created', 'content', $lang_code);
                break;
            
            case 8:
                $response = ALPHA_CMS::Load_Content('error_content_not_ins', 'content', $lang_code);
                break;
            
            case 9:
                $response = ALPHA_CMS::Load_Content('error_content_not_upd', 'content', $lang_code);
                break;
            
            case 10:
                $response = ALPHA_CMS::Load_Content('error_route_not_deleted', 'content', $lang_code);
                break;
            
            case 11:
                $response = ALPHA_CMS::Load_Content('error_user_exists', 'content', $lang_code);
                break;
            
            case 12:
                $response = ALPHA_CMS::Load_Content('error_user_not_ins', 'content', $lang_code);
                break;
            
            case 13:
                $response = ALPHA_CMS::Load_Content('error_same_user', 'content', $lang_code);
                break;
            
            case 14:
                $response = ALPHA_CMS::Load_Content('error_same_email', 'content', $lang_code);
                break;
            
            case 15:
                $response = ALPHA_CMS::Load_Content('error_user_not_upd', 'content', $lang_code);
                break;
            
            case 16:
                $response = ALPHA_CMS::Load_Content('error_lang_exists', 'content', $lang_code);
                break;
            
            case 17:
                $response = ALPHA_CMS::Load_Content('error_sort_exists', 'content', $lang_code);
                break;
            
            case 18:
                $response = ALPHA_CMS::Load_Content('error_lang_not_ins', 'content', $lang_code);
                break;
            
            case 19:
                $response = ALPHA_CMS::Load_Content('error_lang_not_upd', 'content', $lang_code);
                break;
            
            case 20:
                $response = ALPHA_CMS::Load_Content('error_same_menu_link', 'content', $lang_code);
                break;
            
            case 21:
                $response = ALPHA_CMS::Load_Content('error_same_menu_sort', 'content', $lang_code);
                break;
            
            case 22:
                $response = ALPHA_CMS::Load_Content('error_menu_not_ins', 'content', $lang_code);
                break;
            
            case 23:
                $response = ALPHA_CMS::Load_Content('error_menu_not_upd', 'content', $lang_code);
                break;
            
            case 24:
                $response = ALPHA_CMS::Load_Content('error_lang_code_exists', 'content', $lang_code);
                break;
            
            case 25:
                $response = ALPHA_CMS::Load_Content('error_inv_user_name', 'content', $lang_code);
                break;
            
            case 26:
                $response = ALPHA_CMS::Load_Content('error_inv_pass', 'content', $lang_code);
                break;
            
            case 27:
                $response = ALPHA_CMS::Load_Content('error_pass_mismatch', 'content', $lang_code);
                break;
            
            case 28:
                $response = ALPHA_CMS::Load_Content('error_inv_email', 'content', $lang_code);
                break;
            
            case 29:
                $response = ALPHA_CMS::Load_Content('error_email_mismatch', 'content', $lang_code);
                break;
            
            case 30:
                $response = ALPHA_CMS::Load_Content('success_reg_completed', 'content', $lang_code);
                break;
            
            case 31:
                $response = ALPHA_CMS::Load_Content('error_same_user_attr', 'content', $lang_code);
                break;
            
            case 32:
                $response = ALPHA_CMS::Load_Content('error_wrong_credentials', 'content', $lang_code);
                break;
            
            case 33:
                $response = ALPHA_CMS::Load_Content('error_pass_not_blank', 'content', $lang_code);
                break;
            
            case 34:
                $response = ALPHA_CMS::Load_Content('error_short_pass', 'content', $lang_code);
                break;
            
            case 35:
                $response = ALPHA_CMS::Load_Content('error_inv_lang_code', 'content', $lang_code);
                break;
            
            case 36:
                $response = ALPHA_CMS::Load_Content('error_inv_lang', 'content', $lang_code);
                break;
            
            case 37:
                $response = ALPHA_CMS::Load_Content('error_inv_sort', 'content', $lang_code);
                break;
            
            case 38:
                $response = ALPHA_CMS::Load_Content('error_inv_site_title', 'content', $lang_code);
                break;
            
            case 39:
                $response = ALPHA_CMS::Load_Content('error_inv_page', 'content', $lang_code);
                break;
            
            case 40:
                $response = ALPHA_CMS::Load_Content('error_inv_caller', 'content', $lang_code);
                break;
            
            case 41:
                $response = ALPHA_CMS::Load_Content('error_inv_pid', 'content', $lang_code);
                break;
            
            case 42:
                $response = ALPHA_CMS::Load_Content('error_inv_menu_name', 'content', $lang_code);
                break;
            
            case 43:
                $response = ALPHA_CMS::Load_Content('error_ext_not_conf', 'content', $lang_code);
                break;
            
            case 44:
                $response = ALPHA_CMS::Load_Content('error_inv_route', 'content', $lang_code);
                break;
            
            default:
                return false;
            
            // --- to here ---
        
        }
        
        return $response;
    
    }

?>
