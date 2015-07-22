/*

    GreyOS Inc. - Setup validator
    
    File name: setup_validator.js (Version: 1.5)
    Description: This file contains the inputs setup validator.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Validate
function Validate(form_elements)
{

    var i = 0;
    var elements_num = form_elements.length;
    
    // Read elements for validation
    for (i = 0; i < elements_num; i++)
    {
    
        // Get current element
        this_element = document.getElementById(form_elements[i]);
        
        if (this_element === null)
            continue;
        
        if (this_element.id == 'domain_input')
        {
        
            if (this_element.value == '')
            {
            
                alert('Error: Invalid domain name!');
                
                return false;
            
            }
        
        }
        
        if (this_element.id == 'port_input')
        {
        
            if (this_element.value == '' || this_element.value.length < 4 || isNaN(this_element.value))
            {
            
                alert('Error: Invalid port!');
                
                return false;
            
            }
        
        }
        
        if (this_element.id == 'db_input')
        {
        
            if (this_element.value == '')
            {
            
                alert('Error: Invalid database name!');
                
                return false;
            
            }
        
        }
        
        if (this_element.id == 'username_input')
        {
        
            if (this_element.value == '')
            {
            
                alert('Error: Invalid username!');
                
                return false;
            
            }
        
        }
        
        if (this_element.id == 'password_input')
        {
        
            if (this_element.value.length < 8)
            {
            
                alert('Error: The password is too short. Please enter a password that is 8 characters or more!');
                
                return false;
            
            }
        
        }
        
        if (this_element.id == 'pass_confirm_input')
        {
        
            if (this_element.value != document.getElementById('password_input').value)
            {
            
                alert('Error: Invalid confirmation. Passwords do not match!');
                
                return false;
            
            }
        
        }
    
    }
    
    document.getElementById('dynamic_form').submit();
    
    return true;

}
