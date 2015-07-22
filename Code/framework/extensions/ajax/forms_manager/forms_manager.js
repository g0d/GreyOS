/*

    GreyOS Inc. - AJAX Forms Manager
    
    File name: forms_manager.js (Version: 1.5)
    Description: This file contains the AJAX Forms Manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Registration form verification
function AJAX_Reg_Verify(username, password, email, type)
{

    var url;
    var data;
    var ajax = new bull();
    
    url = '/framework/extensions/ajax/forms_manager/forms_manager.php';
    data = 'form_id=1';
    data = data + '&user=' + document.getElementById(username).value;
    data = data + '&pass=' + document.getElementById(password).value;
    data = data + '&email=' + document.getElementById(email).value;
    
    return ajax.response(url, data, 1);

}

// Login form verification
function AJAX_Login_Verify(username, password)
{

    var url;
    var data;
    var ajax = new bull();
    
    url = '/framework/extensions/ajax/forms_manager/forms_manager.php';
    data = 'form_id=2';
    data = data + '&user=' + document.getElementById(username).value;
    data = data + '&pass=' + document.getElementById(password).value;
    
    return ajax.response(url, data, 2);

}
