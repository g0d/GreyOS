/*

    GreyOS Inc. - Miscellaneous scripts
    
    File name: misc.js (Version: 2.0)
    Description: This file contains simple scripts for controlling miscellaneous options.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Global language
var global_lang = 'en';

// Fixate languages positions on Greek language
function Fix_Greek_Lang_Pos()
{

    if (global_lang == 'gr')
    {
    
        document.getElementById('languages').style.marginRight = '20px';
        document.getElementById('lang_gr_pix').style.marginLeft = '9px';
        document.getElementById('lang_en_pix').style.marginLeft = '3px';
        
        return 1;
    
    }
    
    return 0;

}

// Get numerical value from dimensions in pixel
function Get_Value(string)
{

    var result = null;
    
    result = parseInt(string.substring(0, string.length - 2));
    
    return result;

}
