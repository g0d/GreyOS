/*

    GreyOS Inc. - Form Validator
    
    File name: form_validator.js (Version: 2.0)
    Description: This file contains the Form Validator extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Form validator
function Form_Validator(form_id, form_elements)
{

    var i;
    var this_element;
    var reg_result;
    var login_result;
    var insert_result;
    var update_result;
    var cdev_result;
    var elements_num = form_elements.length;
    
    var ajax = new bull();
    
    // Registration form
    if (form_id == 'reg_form')
    {

        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'register_username_text')
            {
            
                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length < 3)
                {
                
                    document.getElementById('register_error').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=25&lang_code=' + global_lang, 1);
                    
                    return false;
                
                }

                else
                    document.getElementById('register_error').innerHTML = '';

            }

            if (this_element.id == 'register_password_text')
            {

                if (this_element.value === null || this_element.value == "" || this_element.value.length < 8)
                {
                
                    document.getElementById('register_error').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=26&lang_code=' + global_lang, 1);
                    
                    return false;

                }

                else
                    document.getElementById('register_error').innerHTML = '';

            }

            if (this_element.id == 'register_confirm_password_text')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value != document.getElementById('register_password_text').value)
                {

                    document.getElementById('register_error').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=27&lang_code=' + global_lang, 1);

                    return false;

                }

                else
                    document.getElementById('register_error').innerHTML = '';

            }

            if (this_element.id == 'register_email_text')
            {

                var at_pos;
                var dot_pos;

                at_pos = this_element.value.indexOf("@");
                dot_pos = this_element.value.lastIndexOf(".");

                if (at_pos < 1 || dot_pos - at_pos < 2)
                {
                
                    document.getElementById('register_error').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=28&lang_code=' + global_lang, 1);
                    
                    return false;

                }

                else
                    document.getElementById('register_error').innerHTML = '';

            }

            if (this_element.id == 'register_confirm_email_text')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value != document.getElementById('register_email_text').value)
                {

                    document.getElementById('register_error').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=29&lang_code=' + global_lang, 1);
                    
                    return false;

                }

                else
                    document.getElementById('register_error').innerHTML = '';

            }
        
        }
        
        reg_result = AJAX_Reg_Verify('register_username_text', 'register_password_text', 'register_email_text');
        
        if (reg_result != '')
        {

            document.getElementById('register_error').innerHTML = 
            ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                          'validator=1&err_code=30&lang_code=' + global_lang, 1);
            
            window.setTimeout('window.location="/"', 3000);
        
        }

        else
        {

            document.getElementById('register_error').innerHTML = 
            ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                          'validator=1&err_code=31&lang_code=' + global_lang, 1);

        }

    }
    
    // Login form (ALPHA CMS - Administration Panel)
    if (form_id == 'login_form')
    {

        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'login_username_text')
            {

                if (this_element.value === null || this_element.value == "" || this_element.value.length < 3)
                {

                    document.getElementById('login_error').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=25&lang_code=' + global_lang, 1);

                    return false;

                }

                else
                    document.getElementById('login_error').innerHTML = '';

            }

            if (this_element.id == 'login_password_text')
            {

                if (this_element.value === null || this_element.value == "" || this_element.value.length < 8)
                {

                    document.getElementById('login_error').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=26&lang_code=' + global_lang, 1);

                    return false;

                }

                else
                    document.getElementById('login_error').innerHTML = '';

            }

        }

        login_result = AJAX_Login_Verify('login_username_text', 'login_password_text');
        
        if (login_result == '')
        {

            document.getElementById('login_error').innerHTML = 
            ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                          'validator=1&err_code=32&lang_code=' + global_lang, 1);

        }
        
        else
            window.location.href = '/' + global_lang + '/admin/dashboard/';

    }
    
    // Insert common form
    if (form_id == 'insert_common_form')
    {
    
        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'insert_site_title')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length > 255)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=38&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_select_route')
            {
            
                if (this_element.value === null || this_element.value == "")
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=44&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_select_lang_code')
            {
            
                if (this_element.value === null || this_element.value == "")
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        if (document.getElementById(form_elements[8]).checked)
            document.getElementById(form_elements[8]).value = 1;
        
        insert_result = ajax.response('/cms/site/back_end/php/actions/control/common_insert.php', 
                                      'insert=1&' + 
                                      'site_title=' + document.getElementById(form_elements[0]).value + '&' + 
                                      'site_descr=' + document.getElementById(form_elements[1]).value + '&' + 
                                      'site_keys=' + document.getElementById(form_elements[2]).value + '&' + 
                                      'company_name=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'company_site=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'footer_info=' + document.getElementById(form_elements[5]).value + '&' + 
                                      'binded_route=' + document.getElementById(form_elements[6]).value + '&' + 
                                      'lang_code=' + document.getElementById(form_elements[7]).value + '&' + 
                                      'is_protected=' + document.getElementById(form_elements[8]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (insert_result != null && insert_result != 1)
        {
        
            document.getElementById('errors').innerHTML = insert_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Update common form
    if (form_id == 'update_common_form')
    {
    
        // Read elements for validation
        for (i = 1; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'edit_site_title')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length > 255)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=38&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_select_route')
            {
            
                if (this_element.value === null || this_element.value == "")
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=44&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_select_lang_code')
            {
            
                if (this_element.value === null || this_element.value == "")
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        if (document.getElementById(form_elements[9]).checked)
            document.getElementById(form_elements[9]).value = 1;
        
        else
            document.getElementById(form_elements[9]).value = 0;
        
        update_result = ajax.response('/cms/site/back_end/php/actions/control/common_update.php', 
                                      'update=1&' + 
                                      'common_id=' + form_elements[0] + '&' + 
                                      'site_title=' + document.getElementById(form_elements[1]).value + '&' + 
                                      'site_descr=' + document.getElementById(form_elements[2]).value + '&' + 
                                      'site_keys=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'company_name=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'company_site=' + document.getElementById(form_elements[5]).value + '&' + 
                                      'footer_info=' + document.getElementById(form_elements[6]).value + '&' + 
                                      'binded_route=' + document.getElementById(form_elements[7]).value + '&' + 
                                      'lang_code=' + document.getElementById(form_elements[8]).value + '&' + 
                                      'is_protected=' + document.getElementById(form_elements[9]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (update_result != null && update_result != 1)
        {
        
            document.getElementById('errors').innerHTML = update_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Insert content form
    if (form_id == 'insert_content_form')
    {
    
        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'insert_page')
            {
            
                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length > 255)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=39&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_select_lang_code')
            {
            
                if (this_element.value === null || this_element.value == "")
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        if (document.getElementById(form_elements[4]).checked)
            document.getElementById(form_elements[4]).value = 1;
        
        if (document.getElementById(form_elements[5]).checked)
            document.getElementById(form_elements[5]).value = 1;
        
        insert_result = ajax.response('/cms/site/back_end/php/actions/control/content_insert.php', 
                                      'insert=1&' + 
                                      'content=' + escape(form_elements[0]) + '&' + 
                                      'page=' + document.getElementById(form_elements[1]).value + '&' + 
                                      'keywords=' + document.getElementById(form_elements[2]).value + '&' + 
                                      'lang_code=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'is_protected=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'is_route=' + document.getElementById(form_elements[5]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (insert_result != null && insert_result != 1)
        {
        
            document.getElementById('errors').innerHTML = insert_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Update content form
    if (form_id == 'update_content_form')
    {
    
        // Read elements for validation
        for (i = 1; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'edit_page')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length > 255)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=39&lang_code=' + global_lang, 1);
                    
                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_select_lang_code')
            {
            
                if (this_element.value === null || this_element.value == "")
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        if (document.getElementById(form_elements[5]).checked)
            document.getElementById(form_elements[5]).value = 1;
        
        else
            document.getElementById(form_elements[5]).value = 0;
        
        if (document.getElementById(form_elements[6]).checked)
            document.getElementById(form_elements[6]).value = 1;
        
        else
            document.getElementById(form_elements[6]).value = 0;
        
        update_result = ajax.response('/cms/site/back_end/php/actions/control/content_update.php', 
                                      'update=1&' + 
                                      'content_id=' + form_elements[0] + '&' + 
                                      'content=' + escape(form_elements[1]) + '&' +
                                      'page=' + document.getElementById(form_elements[2]).value + '&' +  
                                      'keywords=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'lang_code=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'is_protected=' + document.getElementById(form_elements[5]).value + '&' + 
                                      'is_route=' + document.getElementById(form_elements[6]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (update_result != null && update_result != 1)
        {
        
            document.getElementById('errors').innerHTML = update_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Insert menu form
    if (form_id == 'insert_menu_form')
    {
    
        var insert_str = null;
        
        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (document.getElementById(form_elements[0]).
                         options[document.getElementById(form_elements[0]).
                         selectedIndex].value == '0')
            {
            
                if (this_element.id == 'insert_caller')
                {

                    if (this_element.value === null || this_element.value == "" ||
                        this_element.value == 0 || this_element.value.length > 255)
                    {

                        document.getElementById('errors').innerHTML = 
                        ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                      'validator=1&err_code=40&lang_code=' + global_lang, 1);

                        this_element.style.backgroundColor = '#EAC0AE';

                        return false;

                    }

                    else
                    {

                        this_element.style.backgroundColor = '#FAEB9E';
                        document.getElementById('errors').innerHTML = '';

                    }

                }
            
            }
            
            if (document.getElementById(form_elements[2]).
                         options[document.getElementById(form_elements[2]).
                         selectedIndex].value == '0')
            {
            
                if (this_element.id == 'insert_parent_menu_id')
                {

                    if (this_element.value === null || this_element.value == "" ||
                        isNaN(this_element.value) || this_element.value.length > 3)
                    {

                        document.getElementById('errors').innerHTML = 
                        ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                      'validator=1&err_code=41&lang_code=' + global_lang, 1);

                        this_element.style.backgroundColor = '#EAC0AE';

                        return false;

                    }

                    else
                    {

                        this_element.style.backgroundColor = '#FAEB9E';
                        document.getElementById('errors').innerHTML = '';

                    }

                }
            
            }
            
            if (this_element.id == 'insert_menu_name')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length > 255)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=42&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_select_lang_code')
            {
            
                if (this_element.value === null || this_element.value == "")
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_sort_order')
            {

                if (this_element.value == "" || isNaN(this_element.value) || this_element.value == 0)
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=37&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        insert_str = 'insert=1&';
        
        if (document.getElementById(form_elements[0]).value != 0)
            insert_str = insert_str + 'caller=' + document.getElementById(form_elements[0]).value + '&';
        
        else
            insert_str = insert_str + 'caller=' + document.getElementById(form_elements[1]).value + '&';
        
        if (document.getElementById(form_elements[2]).value != 0)
            insert_str = insert_str + 'pid=' + document.getElementById(form_elements[2]).value + '&';
        
        else
            insert_str = insert_str + 'pid=' + document.getElementById(form_elements[3]).value + '&';
        
        if (document.getElementById(form_elements[8]).checked)
            document.getElementById(form_elements[8]).value = 1;
        
        else
            document.getElementById(form_elements[8]).value = 0;
        
        insert_str = insert_str + 'menu_name=' + document.getElementById(form_elements[4]).value + '&' + 
                                  'menu_link=' + document.getElementById(form_elements[5]).value + '&' + 
                                  'sort=' + document.getElementById(form_elements[7]).value + '&' + 
                                  'lang_code=' + document.getElementById(form_elements[6]).value + '&' + 
                                  'is_protected=' + document.getElementById(form_elements[8]).value + '&' + 
                                  'global_lang=' + global_lang;
        
        insert_result = ajax.response('/cms/site/back_end/php/actions/control/menu_insert.php', insert_str, 1);
        
        if (insert_result != null && insert_result != 1)
        {
        
            document.getElementById('errors').innerHTML = insert_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Update menu form
    if (form_id == 'update_menu_form')
    {
    
        var update_str = null;
        
        // Read elements for validation
        for (i = 1; i < elements_num; i++)
        {
        
            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (document.getElementById(form_elements[1]).
                         options[document.getElementById(form_elements[1]).
                         selectedIndex].value == '0')
            {
            
                if (this_element.id == 'edit_caller')
                {

                    if (this_element.value === null || this_element.value == "" ||
                        this_element.value == 0 || this_element.value.length > 255)
                    {

                        document.getElementById('errors').innerHTML = 
                        ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                      'validator=1&err_code=40&lang_code=' + global_lang, 1);
                        
                        this_element.style.backgroundColor = '#EAC0AE';

                        return false;

                    }

                    else
                    {

                        this_element.style.backgroundColor = '#FAEB9E';
                        document.getElementById('errors').innerHTML = '';

                    }

                }
            
            }
            
            if (this_element.id == 'edit_menu_name')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length > 255)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=42&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_select_lang_code')
            {
            
                if (this_element.value === null || this_element.value == "")
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_sort_order')
            {

                if (this_element.value == "" || isNaN(this_element.value) || this_element.value == 0)
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=37&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        update_str = 'update=1&' + 
                     'menu_id=' + form_elements[0] + '&';
        
        if (document.getElementById(form_elements[1]).value != 0)
            update_str = update_str + 'caller=' + document.getElementById(form_elements[1]).value + '&';
        
        else
            update_str = update_str + 'caller=' + document.getElementById(form_elements[2]).value + '&';
        
        if (document.getElementById(form_elements[8]).checked)
            document.getElementById(form_elements[8]).value = 1;
        
        else
            document.getElementById(form_elements[8]).value = 0;
        
        update_str = update_str + 'pid=' + document.getElementById(form_elements[3]).value + '&' + 
                                  'menu_name=' + document.getElementById(form_elements[4]).value + '&' + 
                                  'menu_link=' + document.getElementById(form_elements[5]).value + '&' + 
                                  'sort=' + document.getElementById(form_elements[7]).value + '&' + 
                                  'lang_code=' + document.getElementById(form_elements[6]).value + '&' + 
                                  'is_protected=' + document.getElementById(form_elements[8]).value + '&' + 
                                  'global_lang=' + global_lang;
        
        update_result = ajax.response('/cms/site/back_end/php/actions/control/menu_update.php', update_str, 1);
        
        if (update_result != null && update_result != 1)
        {
        
            document.getElementById('errors').innerHTML = update_result;
            
            return false;
        
        }
        
        return true;
    
    }
    
    // Insert language form
    if (form_id == 'insert_lang_form')
    {
    
        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'insert_lang_code')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length < 2 || this_element.value.length > 2)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_language')
            {
            
                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length < 2)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=36&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_sort_order')
            {

                if (this_element.value == "" || isNaN(this_element.value))
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=37&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        if (document.getElementById(form_elements[3]).checked)
            document.getElementById(form_elements[3]).value = 1;
        
        if (document.getElementById(form_elements[4]).checked)
            document.getElementById(form_elements[4]).value = 1;
        
        insert_result = ajax.response('/cms/site/back_end/php/actions/control/lang_insert.php', 
                                      'insert=1&' + 
                                      'lang_code=' + document.getElementById(form_elements[0]).value + '&' + 
                                      'lang=' + document.getElementById(form_elements[1]).value + '&' + 
                                      'sort=' + document.getElementById(form_elements[2]).value + '&' + 
                                      'is_default=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'is_protected=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (insert_result != null && insert_result != 1)
        {
        
            document.getElementById('errors').innerHTML = insert_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Update languages form
    if (form_id == 'update_lang_form')
    {
    
        // Read elements for validation
        for (i = 1; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'edit_lang_code')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length < 2 || this_element.value.length > 2)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=35&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_language')
            {
            
                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length < 2)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=36&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_sort_order')
            {

                if (this_element.value == "" || isNaN(this_element.value))
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=37&lang_code=' + global_lang, 1);
                    
                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        if (document.getElementById(form_elements[4]).checked)
            document.getElementById(form_elements[4]).value = 1;
        
        else
            document.getElementById(form_elements[4]).value = 0;
        
        if (document.getElementById(form_elements[5]).checked)
            document.getElementById(form_elements[5]).value = 1;
        
        else
            document.getElementById(form_elements[5]).value = 0;
        
        update_result = ajax.response('/cms/site/back_end/php/actions/control/lang_update.php', 
                                      'update=1&' + 
                                      'lang_id=' + form_elements[0] + '&' + 
                                      'lang_code=' + document.getElementById(form_elements[1]).value + '&' + 
                                      'lang=' + document.getElementById(form_elements[2]).value + '&' + 
                                      'sort=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'is_default=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'is_protected=' + document.getElementById(form_elements[5]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (update_result != null && update_result != 1)
        {
        
            document.getElementById('errors').innerHTML = update_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Update extensions form
    if (form_id == 'update_ext_form')
    {
    
        update_str = 'update=1&ext_type=' + form_elements[1] + '&extension=' + form_elements[0];
        
        if (document.getElementById(form_elements[2]).checked)
            document.getElementById(form_elements[2]).value = 1;
        
        else
            document.getElementById(form_elements[2]).value = 0;
        
        if (document.getElementById(form_elements[3]).checked)
            document.getElementById(form_elements[3]).value = 1;
        
        else
            document.getElementById(form_elements[3]).value = 0;
        
        update_str = update_str + 
                     '&status=' + document.getElementById(form_elements[2]).value + 
                     '&protected=' + document.getElementById(form_elements[3]).value;
        
        for (i = 4; i < elements_num; i++)
            update_str = update_str + form_elements[i];
        
        update_str = update_str + '&global_lang=' + global_lang;
        
        update_result = ajax.response('/cms/site/back_end/php/actions/control/extension_update.php', update_str, 1);
        
        if (update_result != null && update_result != 1)
        {
        
            document.getElementById('errors').innerHTML = update_result;
            
            return false;
        
        }
        
        return true;
    
    }
    
    // Insert user form
    if (form_id == 'insert_user_form')
    {
    
        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'insert_username')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length < 3)
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=25&lang_code=' + global_lang, 1);
                    
                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_email')
            {

                var at_pos;
                var dot_pos;

                at_pos = this_element.value.indexOf("@");
                dot_pos = this_element.value.lastIndexOf(".");

                if (at_pos < 1 || dot_pos - at_pos < 2)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=28&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'insert_password')
            {

                if (this_element.value == "")
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=33&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else if (this_element.value.length < 8)
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=34&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else if (this_element.value != document.getElementById('conf_password').value)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=27&lang_code=' + global_lang, 1);
                    
                    this_element.style.backgroundColor = '#EAC0AE';
                    document.getElementById('conf_password').style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('conf_password').style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        insert_result = ajax.response('/cms/site/back_end/php/actions/control/user_insert.php', 
                                      'insert=1&' + 
                                      'username=' + document.getElementById(form_elements[0]).value + '&' + 
                                      'email=' + document.getElementById(form_elements[1]).value + '&' + 
                                      'type=' + document.getElementById(form_elements[2]).value + '&' + 
                                      'password=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'conf_pass=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (insert_result != null && insert_result != 1)
        {
        
            document.getElementById('errors').innerHTML = insert_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Update user form
    if (form_id == 'update_user_form')
    {
    
        // Read elements for validation
        for (i = 1; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);

            if (this_element === null)
                continue;
            
            if (this_element.id == 'edit_username' && this_element.type != 'hidden')
            {

                if (this_element.value === null || this_element.value == "" ||
                    this_element.value.length < 3)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=25&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }


            if (this_element.id == 'edit_email')
            {

                var at_pos;
                var dot_pos;

                at_pos = this_element.value.indexOf("@");
                dot_pos = this_element.value.lastIndexOf(".");

                if (at_pos < 1 || dot_pos - at_pos < 2)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=28&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }

                else
                {
                
                    this_element.style.backgroundColor = '#FAEB9E';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
            
            if (this_element.id == 'edit_password')
            {
            
                if (this_element.value != '' && this_element.value.length < 8)
                {
                
                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=34&lang_code=' + global_lang, 1);

                    this_element.style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else if (this_element.value != document.getElementById('conf_password').value)
                {

                    document.getElementById('errors').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=27&lang_code=' + global_lang, 1);
                    
                    this_element.style.backgroundColor = '#EAC0AE';
                    document.getElementById('conf_password').style.backgroundColor = '#EAC0AE';
                    
                    return false;

                }
                
                else
                {
                
                    this_element.style.backgroundColor = '#FFFFFF';
                    document.getElementById('errors').innerHTML = '';
                
                }

            }
        
        }
        
        update_result = ajax.response('/cms/site/back_end/php/actions/control/user_update.php', 
                                      'update=1&' + 
                                      'user_id=' + form_elements[0] + '&' + 
                                      'username=' + document.getElementById(form_elements[1]).value + '&' + 
                                      'email=' + document.getElementById(form_elements[2]).value + '&' + 
                                      'type=' + document.getElementById(form_elements[3]).value + '&' + 
                                      'password=' + document.getElementById(form_elements[4]).value + '&' + 
                                      'conf_pass=' + document.getElementById(form_elements[5]).value + '&' + 
                                      'global_lang=' + global_lang, 1);
        
        if (update_result != null && update_result != 1)
        {
        
            document.getElementById('errors').innerHTML = update_result;
            
            return false;
        
        }
        
        return true;

    }
    
    // Customer Development
    if (form_id == 'cdev_box')
    {
    
        // Read elements for validation
        for (i = 0; i < elements_num; i++)
        {

            // Get current element
            this_element = document.getElementById(form_elements[i]);
            
            if (this_element === null)
                continue;
            
            if (this_element.id == 'cdev_box')
            {

                var at_pos;
                var dot_pos;

                at_pos = this_element.value.indexOf("@");
                dot_pos = this_element.value.lastIndexOf(".");

                if (this_element.length > 200 || at_pos < 1 || dot_pos - at_pos < 2)
                {

                    document.getElementById('cdev_box_msg').innerHTML = 
                    ajax.response('/framework/extensions/ajax/forms_manager/form_validator.php', 
                                  'validator=1&err_code=28&lang_code=' + global_lang, 1);

                    return false;

                }

                else
                    document.getElementById('cdev_box_msg').innerHTML = '';
            
            }
        
        }
        
        cdev_result = CDev_CMD(document.getElementById(form_elements[0]).value);
        
        document.getElementById('cdev_box_msg').innerHTML = cdev_result;
        
        window.setTimeout(function() { Clear_CDev_Box(); }, 2500);
        
        return true;

    }

    return false;

}
