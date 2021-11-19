/*
    GreyOS - N@TuRe (Version: 3.0)
    
    File name: nature.js
    Description: This file contains the N@TuRe - Themes manager module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// N@TuRe
function nature()
{
    var self = this;

    this.theme = function(themes)
    {
        if (utils_sys.validation.misc.is_object(themes) && !utils_sys.validation.misc.is_array(themes))
            return false;

        if (utils_sys.validation.misc.is_undefined(themes))
            return themes_in_use;

        if (themes === '')
            return false;

        themes_in_use = themes;

        return true;
    };

    this.apply = function(mode)
    {
        if (!utils_sys.validation.alpha.is_string(mode))
            return false;

        if (mode !== 'new' && mode !== 'replace')
            return false;

        var __themes_array = [];

        if (utils_sys.validation.alpha.is_string(themes_in_use))
            __themes_array[0] = themes_in_use;
        else
        {
            if (!utils_sys.validation.misc.is_array(themes_in_use))
                return false;

            __themes_array = themes_in_use;
        }

        var __themes_num = __themes_array.length;

        for (var i = 0; i < __themes_num; i++)
        {
            if (mode === 'new')
            {
                if (self.exists(__themes_array[i]))
                    return true;

                var __result = utils_sys.graphics.apply_theme('/framework/extensions/js/user/nature/themes/' + 
                                                              __themes_array[i], __themes_array[i]);

                return __result;
            }
            else if (mode === 'replace')
            {
                self.remove(__themes_array[i]);

                var __result = utils_sys.graphics.apply_theme('/framework/extensions/js/user/nature/themes/' + 
                                                              __themes_array[i], __themes_array[i]);

                return __result;
            }
        }
    };

    this.exists = function(theme)
    {
        if (!utils_sys.validation.alpha.is_string(theme))
            return false;

        var __theme_links = document.head.getElementsByTagName('link');

        for (var i = 0; i < __theme_links.length; i++)
        {
            if (__theme_links[i].attributes.rel.value === "stylesheet")
            {
                if (__theme_links[i].attributes.href.value.indexOf(theme) > -1)
                    return __theme_links[i];
            }
        }

        return false;
    };

    this.remove = function(theme)
    {
        var __theme_link = self.exists(theme);

        if (__theme_link === false)
            return false;

        document.head.removeChild(__theme_link);

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var cosmos = null,
        themes_in_use = null,
        utils_sys = new vulcan();
}
