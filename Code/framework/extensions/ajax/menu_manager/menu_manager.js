/*

    GreyOS Inc. - AJAX Menu Manager
    
    File name: menu_manager.js (Version: 1.5)
    Description: This file contains the AJAX Menu Manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Bind a menu to an element
function AJAX_Bind_Menu(element_id, caller, lang_code, ajax_mode, ajax_session)
{

    var url;
    var data;
    var ajax = new bull();
    
    // Exit on error
    if (element_id === null || caller === null || lang_code === null ||
        ajax_mode === null || ajax_mode < 1 || ajax_mode > 2 ||
        ajax_session === null || ajax_session < 1 || ajax_session > 5)
        return false;
    
    url = '/framework/extensions/ajax/menu_manager/menu_manager.php';
    data = 'menu_type=0&caller=' + caller + '&lang=' + lang_code;

    ajax.data(url, data, element_id, ajax_mode, ajax_session);
    
    return true;

}

// Load menu content
function AJAX_Load_Menu_Content(element_id, menu_link, lang_code, ajax_mode, ajax_session)
{

    var url;
    var data;
    var ajax = new bull();
    
    // Exit on error
    if (element_id === null || menu_link === null || menu_link < 1 || lang_code === null ||
        ajax_mode === null || ajax_mode < 1 || ajax_mode > 2 ||
        ajax_session === null || ajax_session < 1 || ajax_session > 5)
        return false;
    
    url = '/framework/extensions/ajax/menu_manager/menu_manager.php';
    data = 'menu_type=1&menu_link=' + menu_link + '&lang=' + lang_code;
    
    window.location.href = '#' + menu_link;

    ajax.data(url, data, element_id, ajax_mode, ajax_session);
    
    return true;

}
