/*

    GreyOS Inc. - Scroll Bar Control (On-demand scroll bar fix for GreyOS)
    
    File name: scroll_bar_control.js (Version: 2.0)
    Description: This file contains the Scroll Bar Control - On-demand scroll bar control extension.
    
    Coded by George Delaportas (G0D) and John Inglessis (negle)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Scroll Bar - Fix
function scroll_bar_fix(object)
{
    
    if($('#' + object + ' .mCSB_container').length)
        return true;

    if (object === undefined)
        return false;

	$('#' + object).mCustomScrollbar({ autoDraggerLength: false });
	$('#' + object + ' .mCSB_container').css('width', 'auto');
	$('#' + object + ' .mCSB_scrollTools').css('margin-right', '2px');
    $('#' + object).mCustomScrollbar("update");

	return true;

}

// Same with scroll_bar_fix but with selector
function scroll_bar_fix_selector(object)
{
    
    if($(object + ' .mCSB_container').length)
        return true;

    if (object === undefined)
        return false;

    $(object).mCustomScrollbar({ autoDraggerLength: false });
    $(object + ' .mCSB_scrollTools').css('margin-right', '2px');
    $(object + ' .mCSB_container').css('width', 'auto');
    $(object).mCustomScrollbar("update");

    return true;

}

function scroll_bar_fix_selector_update(object)
{

    if (object === undefined)
        return false;

    $(object).mCustomScrollbar("update");

    return true;

}

// Scroll Bar - Update
function scroll_bar_update(object)
{

    if (object === undefined)
        return false;

    $('#' + object).mCustomScrollbar("update");

    return true;

}

// Scroll Bar - Stop
function scroll_bar_stop(object)
{

    if (object === undefined)
        return false;

    $('#' + object).mCustomScrollbar("stop");

    return true;

}

// Scroll Bar - Destroy
function scroll_bar_destroy(object)
{

    if (object === undefined)
        return false;

    $('#' + object).mCustomScrollbar("destroy");

    return true;

}

/* Scroll Bar - Scroll To
 *
 * Calling plugin’s scrollTo method will automatically scroll the content
 * to the position parameter. Scroll-to position can be a string
 * (e.g. "#element-id", "bottom", "left" etc.) or an integer, indicating
 * a number of pixels to scroll-to. 
 *
 */
function scroll_bar_scroll_to(object, position)
{

    if (object === undefined)
        return false;

    $('#' + object).mCustomScrollbar("scrollTo", position);

    return true;

}

// Scroll Bar - Disable
function scroll_bar_disable(object)
{

    if (object === undefined)
        return false;

    $('#' + object).mCustomScrollbar("disable", true);

    return true;

}
