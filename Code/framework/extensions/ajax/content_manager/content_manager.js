/*

    GreyOS Inc. - AJAX Content Manager
    
    File name: content_manager.js (Version: 2.5)
    Description: This file contains the AJAX Content Manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Manage content
function AJAX_Load_Content(element_id, content_id, lang_code, ajax_mode, ajax_session)
{

    var url;
    var data;
    var ajax = new bull();
    
    // Exit on error
    if (element_id === null || content_id === null || lang_code === null ||
        ajax_mode === null || ajax_mode < 1 || ajax_mode > 2 ||
        ajax_session === null || ajax_session < 1 || ajax_session > 5)
        return false;
    
    url = '/framework/extensions/ajax/content_manager/content_manager.php';
    data = 'content_id=' + content_id + '&lang=' + lang_code;

    window.location.href = '#' + content_id;

    ajax.data(url, data, element_id, ajax_mode, ajax_session);
    
    return true;

}
