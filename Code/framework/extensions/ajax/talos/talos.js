/*

    GreyOS Inc. - TALOS (AJAX Login & Registration Manager)
    
    File name: talos.js (Version: 2.0)
    Description: This file contains the TALOS - AJAX Login & Registration Manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



var global_forgot_pass_click_check = false;

// Login
function TALOS_Login(username, password)
{

    var url;
    var data;
    var result;
    var ajax = new bull();

    document.getElementById('button_sound').play();

    // Exit on error
    if (username === null || username === undefined || password === null || password === undefined)
        return false;

    url = '/framework/extensions/ajax/talos/talos.php';
    data = 'code=login' + '&user=' + username + '&pass=' + password;

    result = ajax.response(url, data, 1);
    
    if (result === '1')
    {
    
        document.getElementById('talos_info').innerHTML = 'Hold on Dude! Logging in...';

        setTimeout(function() { window.location.href = ''; }, 1500);
        
        return true;
    
    }
    
    document.getElementById('talos_info').innerHTML = 'Sorry, Dude. Login failed!';
    
    return false;

}

// Register
function TALOS_Register(username, email, password, confirm_password)
{

    var url;
    var data;
    var result;
    var ajax = new bull();

    document.getElementById('button_sound').play();

    // Exit on error
    if (username === null || username === undefined || 
        email === null || email === undefined || 
        password === null || password === undefined || 
        confirm_password === null || confirm_password === undefined)
        return false;

    if (username.length < 3 || username.length > 16 || 
        password.length < 8 || password.length > 16)
    {

        document.getElementById('talos_info').innerHTML = 'Dude, try a username with 3 characters or more and a password with 8 or more!';

        return false;

    }

    if (password !== confirm_password)
    {

        document.getElementById('talos_info').innerHTML = 'Dude, confirm your password!';

        return false;

    }

    if (email.length < 7 || email.length > 100 || !email.match(/@/g))
    {

        document.getElementById('talos_info').innerHTML = 'Dude, this e-mail is... well, not an e-mail!';

        return false;

    }

    url = '/framework/extensions/ajax/talos/talos.php';
    data = 'code=reg' + '&user=' + username + '&email=' + email + '&pass=' + password;

    result = ajax.response(url, data, 1);

    if (result === '1')
    {

        document.getElementById('talos_info').innerHTML = 'Hello Dude! Please verify your account within 24 hours. Now, logging in...';

        setTimeout(function() { window.location.href = ''; }, 3000);

        return true;

    }

    document.getElementById('talos_info').innerHTML = 'Sorry Dude. Registration failed! Are you already registered?';

    return false;

}

// Forgot password (Recovery)
function TALOS_Pass_Recovery(username_or_email)
{

    var url;
    var data;
    var result;
    var ajax = new bull();
    
    // Exit on error
    if (username_or_email === null || username_or_email === undefined)
        return false;
    
    url = '/framework/extensions/ajax/talos/talos.php';
    data = 'code=recovery' + '&user_or_email=' + username_or_email;

    result = ajax.response(url, data, 1);
    
    if (result === '1')
    {
    
        document.getElementById('talos_info').innerHTML = 'Congrats Dude! Your new password has been sent to your e-mail.';
        
        setTimeout(function() { document.getElementById('talos_info').innerHTML = ''; }, 3000);
        
        return true;
    
    }
    
    document.getElementById('talos_info').innerHTML = 'Sorry Dude. No account found to match this username or e-mail!';
    
    return false;

}

// Show forgot password form
function TALOS_Manage_Forgot_Pass_Form(display)
{

    if (isNaN(display) || display < 0 || display > 1 || global_forgot_pass_click_check === true)
        return false;

    var forgot_pass_form = document.getElementById('talos_forgot_password_form');

    if (display === 0)
    {

        if (forgot_pass_form.style.display === 'none')
            return false;

        document.getElementById('talos_forgot_password_form').style.display = 'none';

    }

    else
    {

        if (forgot_pass_form.style.display === undefined || forgot_pass_form.style.display === 'block')
            return false;

        document.getElementById('talos_forgot_password_form').style.display = 'block';

    }

    return true;

}
