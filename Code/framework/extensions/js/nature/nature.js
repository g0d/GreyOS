/*

    GreyOS Inc. - N@TuRe (Themes manager)
    
    File name: nature.js (Version: 6.2)
    Description: This file contains the N@TuRe themes manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// N@TuRe
function nature()
{

    var self = this;

    var __theme = null;

    this.themes = function(val)
    {

        if (vulcan.validation.misc.is_object(val) && !vulcan.validation.misc.is_array(val))
            return false;

        if (vulcan.validation.misc.is_undefined(val))
            return __theme;

        if (val === '')
            return false;

        __theme = val;

        return true;

    };

    this.apply = function()
    {

        var __themes_array = [];

        if (vulcan.validation.alpha.is_string(__theme))
            __themes_array[0] = __theme;

        else
        {

            if (!vulcan.validation.misc.is_array(__theme))
                return false;

            __themes_array = __theme;

        }

        var __themes = __themes_array.length;

        for (var i = 0; i < __themes; i++)
        {

            if (!vulcan.graphics.apply_theme('/framework/extensions/js/nature/themes/' + __themes_array[i], __themes_array[i]))
                return false;

        }

        return true;

    };

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        cosmos = null,
        vulcan = null;

}
