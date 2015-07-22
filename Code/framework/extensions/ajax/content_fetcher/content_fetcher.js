/*

    GreyOS Inc. - AJAX Content Fetcher
    
    File name: content_fetcher.js (Version: 2.0)
    Description: This file contains the AJAX Content Fetcher extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Fetch web content with AJAX
function AJAX_Fetch_Content(fetch_type, element_id, content_url, ajax_mode, ajax_session)
{

    var url;
    var data;
    var ajax = new bull();
    
    // Exit on false fetch type
    if (isNaN(fetch_type) || fetch_type < 1 || fetch_type > 2)
        return false;
    
    // Exit on other errors
    if (content_url === null || ajax_session === null || ajax_session < 1 || ajax_session > 5)
        return false;
    
    if (fetch_type === 1)
    {
    
        if (element_id !== null)
            return false;
    
    }
    
    else
    {
    
        if (element_id === null || ajax_mode === null || ajax_mode < 1 || ajax_mode > 2)
            return false;
    
    }
    
    url = '/framework/extensions/ajax/content_fetcher/content_fetcher.php';
    data = 'content_url=' + content_url;
    
    if (fetch_type === 1)
        return ajax.response(url, data, ajax_session);
    
    else
        ajax.data(url, data, element_id, ajax_mode, ajax_session);
    
    return true;

}
