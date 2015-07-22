/*

    GreyOS Inc. - AJAX ULTRA Suggest
    
    File name: ultra_suggest.js (Version: 1.5)
    Description: This file contains the AJAX - ULTRA Suggest extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



var global_us_res_element_id = null;
var global_us_value_element_id = null;

// Suggestions with AJAX
function Ultra_Suggest(res_element_id, value_element_id, search, ajax_mode, ajax_session, event_listener)
{

    var url;
    var data;
    var ajax = new bull();
    
    // Exit on error
    if (res_element_id === null || value_element_id === null || search === null || 
        ajax_mode === null || ajax_mode < 1 || ajax_mode > 2 ||
        ajax_session === null || ajax_session < 1 || ajax_session > 5)
        return false;
    
    global_us_res_element_id = res_element_id;
    global_us_value_element_id = value_element_id;
    
    if (event_listener.keyCode != 13)
        document.getElementById(global_us_res_element_id).style.visibility = 'visible';
    
    url = '/framework/extensions/ajax/ultra_suggest/ultra_suggest.php';
    data = 'engine_url=' + 'https://maps-api-ssl.google.com/maps/suggest?q=' + search + '&hl=en&json=a';
    
    ajax.data(url, data, res_element_id, ajax_mode, ajax_session);
    
    return true;

}

// Select specific text
function US_Select_This(element_id, event_listener)
{

    if (event_listener.button == 0)
    {
    
        // Exit on error
        if (element_id === null || element_id == '')
            return false;
        
        document.getElementById(global_us_res_element_id).style.visibility = 'hidden';
        document.getElementById(global_us_value_element_id).value = document.getElementById(element_id).innerHTML;
        document.getElementById(global_us_value_element_id).focus();
        
        return true;
    
    }
    
    else
        return false;

}

document.head.innerHTML += '<link rel="StyleSheet" href="/framework/extensions/ajax/ultra_suggest/us.css" ' +
                           'type="text/css" media="screen">';
