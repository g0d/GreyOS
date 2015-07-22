/*

    GreyOS Inc. - Languages Manager
    
    File name: languages.js (Version: 3.0)
    Description: This file contains the Languages Manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Set global variables
var global_lang = null;
var lang_counter = null;
var default_lang = null;

// Set global arrays
var all_langs = new Array();
var checked_langs = new Array();
var lang_pix = new Array();
var lang_label = new Array();

// Initialize global variables
lang_counter = 0;
default_lang = 'en';

// Initialize languages
function Init_Languages()
{

    var i = null;
    var j = null;
    
    var slash_pos = null;
    var address_loc = null;
    var this_lang = null;
    var this_error = null;
    
    for (i = 0; i < lang_counter; i++)
        Check_Language(all_langs[i], false);
    
    slash_pos = window.location.href.indexOf('/', 7);
    
    this_lang = window.location.href.substring(slash_pos + 1, slash_pos + 3);
    
    address_loc = window.location.href.substring(0, slash_pos);
    
    this_error = window.location.href.substring(slash_pos + 1).length;
    
    if (this_error == 3)
        window.location.href = address_loc + '/' + this_lang;
    
    for (i = 0; i < lang_counter; i++)
    {
    
        if (this_lang == all_langs[i])
        {
        
            Check_Language(this_lang, true);
            
            global_lang = this_lang;
            
            for (j = 0; j < lang_counter; j++)
            {
            
                Load_Lang_Pix(lang_pix[j], all_langs[j]);
                
                Set_Lang_Text_Focus(lang_label[j], all_langs[j], '#000000')
            
            }
            
            return true;
        
        }
    
    }
    
    if (global_lang === null)
    {
    
        global_lang = default_lang;
        
        for (j = 0; j < lang_counter; j++)
            Load_Lang_Pix(lang_pix[j], this_lang);
        
        slash_pos = window.location.href.indexOf('/', 7);
        
        address_loc = window.location.href.substring(0, slash_pos);
        
        window.location.href = address_loc + '/' + global_lang;
        
        return true;
    
    }
    
    return false;

}

// Change language
function Change_Language(lang_code)
{

    var i = null;
    var slash_pos = null;
    var address_loc = null;
    var mvc_path = null;
    var lang_check = null;
    
    lang_check = Check_Language(lang_code, true);
    
    if (lang_check === false)
        return false;
    
    for (i = 0; i < lang_counter; i++)
    {
    
        if (all_langs[i] != lang_code)
            lang_check = Check_Language(all_langs[i], false);
        
        if (lang_check === false)
            return false;
    
    }
    
    try
    {
    
        slash_pos = window.location.href.indexOf('/', 7);
        
        address_loc = window.location.href.substring(0, slash_pos);
        
        mvc_path = window.location.href.substring(slash_pos + 3);
        
        if (mvc_path == '')
            window.location.href = address_loc + '/' + lang_code;
        else
            window.location.href = address_loc + '/' + lang_code + mvc_path;
        
        global_lang = lang_code;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

    return true;

}

// Setup language
function Setup_Language(index, lang_code)
{

    try
    {
    
        all_langs[index] = lang_code;
        
        lang_counter++;
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Set default language
function Set_Default_Lang(lang_code)
{

    try
    {
    
        default_lang = lang_code;
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Check language (set language state)
function Check_Language(lang_code, state)
{

    try
    {
    
        checked_langs[lang_code] = state;
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Setup language flag pix
function Setup_Lang_Pix(index, pix_name)
{

    try
    {
    
        lang_pix[index] = pix_name;
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Load language flag pix
function Load_Lang_Pix(element_id, lang_code)
{

    try
    {
    
        if (global_lang == lang_code)
            document.getElementById(element_id).src = '/cms/themes/default/pix/langs/' + lang_code + '_over.png';
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Load language flag pix (Over)
function Lang_Pix_Over(element_id, lang_code)
{

    try
    {
    
        if (global_lang != lang_code)
            document.getElementById(element_id).src = '/cms/themes/default/pix/langs/' + lang_code + '_over.png';
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Load language flag pix (Out)
function Lang_Pix_Out(element_id, lang_code)
{

    try
    {
    
        if (global_lang != lang_code)
            document.getElementById(element_id).src = '/cms/themes/default/pix/langs/' + lang_code + '_out.png';
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Setup language label
function Setup_Lang_Label(index, label_name)
{

    try
    {
    
        lang_label[index] = label_name;
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}

// Set selected language text focus
function Set_Lang_Text_Focus(element_id, lang_code, focus_color)
{

    try
    {
    
        if (global_lang == lang_code)
            document.getElementById(element_id).style.color = focus_color;
        
        return true;
    
    }
    
    catch(e)
    {
    
        return false;
    
    }

}
