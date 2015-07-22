/*

    GreyOS Inc. - Input Controller
    
    File name: input_controller.js (Version: 3.2)
    Description: This file contains the Input Controller extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Input controller
function Input_Controller(element_id, key_event)
{

    var key = key_event.keyCode || key_event.charCode;
    
    if (element_id.id == 'register_username_text' || element_id.id == 'login_username_text' || 
        element_id.id == 'edit_username' || element_id.id == 'insert_username' || 
        element_id.id == 'insert_page' || element_id.id == 'edit_page' || element_id.id == 'insert_menu_link' || 
        element_id.id == 'talos_reg_username_text' || element_id.id == 'talos_username_text')
    {
    
        if ((key <= 32 || key == 33 || key == 34 || key == 35 || key == 36 || key == 37 || key == 38 || key == 39 || 
             key == 40 || key == 41 || key == 42 || key == 43 || key == 44 || key == 46 || key == 47 || 
             key == 58 || key == 59 || key == 60 || key == 61 || key == 62 || key == 63 || 
             key == 91 || key == 92 || key == 93 || key == 94 || key == 96 || 
             key == 123 || key == 124 || key == 125 || key >= 126) && (key != 8 && key != 9 && key != 13))
        {
        
            return false;
        
        }
    
    }

    if (element_id.id == 'register_password_text' || element_id.id == 'login_password_text' ||
        element_id.id == 'register_confirm_password_text' || element_id.id == 'edit_password' || 
        element_id.id == 'insert_password' || element_id.id == 'conf_password' || 
        element_id.id == 'talos_reg_password_text' || element_id.id == 'talos_confirm_password_text' || 
        element_id.id == 'talos_password_text')
    {
    
        if ((key <= 32 || key == 34 || key == 38 || key == 39 || 
             key == 40 || key == 41 || key == 42 || key == 44 || key == 47 || 
             key == 58 || key == 59 || key == 60 || key == 61 || key == 62 || key == 63 || 
             key == 91 || key == 92 || key == 93 || key == 96 || key == 123 || key == 125) && 
             (key != 8 && key != 9 && key != 13))
        {
        
            return false;
        
        }

    }

    if (element_id.id == 'register_email_text' || element_id.id == 'register_confirm_email_text' || 
        element_id.id == 'insert_email' || element_id.id == 'edit_email' || element_id.id == 'talos_email_text' || 
        element_id.id == 'talos_password_reminder_text')
    {
    
        if ((key <= 32 || key == 33 || key == 34 || key == 35 || key == 36 || key == 37 || key == 38 || key == 39 || 
             key == 40 || key == 41 || key == 42 || key == 43 || key == 44 || key == 47 || 
             key == 58 || key == 59 || key == 60 || key == 61 || key == 62 || key == 63 || 
             key == 91 || key == 92 || key == 93 || key == 94 || key == 96 || 
             key == 123 || key == 124 || key == 125 || key > 126) && (key != 8 && key != 9 && key != 13))
        {
        
            return false;
        
        }
    
    }
    
    if (element_id.id == 'insert_lang_code' || element_id.id == 'insert_language' || 
        element_id.id == 'edit_lang_code' || element_id.id == 'edit_language')
    {
    
        if ((key < 65 || key == 32 || key == 91 || key == 92 || key == 93 || key == 94 || 
             key == 95 || key == 96 || key == 123 || key == 124 || key == 125 || key == 126) && (key != 8 && key != 9))
        {
        
            return false;
        
        }
    
    }
    
    if (element_id.id == 'insert_sort_order' || element_id.id == 'edit_sort_order')
    {
    
        if ((key < 48 || key > 57) && (key != 8 && key != 9))
            return false;
    
    }
    
    if (element_id.id == 'insert_parent_menu_id')
    {
    
        if ((key < 48 || key > 57) && (key != 8 && key != 9))
            return false;
    
    }
    
    if (element_id.id == 'the_page_num')
    {
    
        if ((key < 48 || key > 57) && (key != 8 && key != 9))
            return false;
    
    }
    
    return true;

}
