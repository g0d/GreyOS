/*
    GreyOS - N@TuRe (Version: 4.0)

    File name: nature.js
    Description: This file contains the N@TuRe - Themes manager module.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// N@TuRe
function nature()
{
    var self = this;

    function utilities()
    {
        this.search = function(theme)
        {
            var __theme_links = document.head.getElementsByTagName('link');

            if (!__theme_links)
                return false;

            var __theme_links_num = __theme_links.length;

            for (var i = 0; i < __theme_links_num; i++)
            {
                if (__theme_links[i].attributes.rel.value === 'stylesheet')
                {
                    if (__theme_links[i].attributes.href.value.indexOf(theme) > -1)
                        return __theme_links[i];
                }
            }

            return false;
        };
    }

    function themes()
    {
        this.store = function(theme)
        {
            if (utils_sys.validation.misc.is_nothing(cosmos))
                return false;

            if (!utils_sys.validation.alpha.is_string(theme))
                return false;

            theme_in_use = theme;

            return true;
        };

        this.clear = function(theme)
        {
            if (utils_sys.validation.misc.is_nothing(cosmos))
                return false;

            if (utils_sys.validation.misc.is_invalid(theme))
                return false;

            var __theme_link = self.scan(theme);

            if (!__theme_link)
                return false;

            document.head.removeChild(__theme_link);

            if (theme === theme_in_use)
                theme_in_use = null;

            return true;
        };
    }

    this.apply = function(mode)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (theme_in_use === null)
            return false;

        if (mode !== 'new' && mode !== 'replace')
            return false;

        if (mode === 'new')
        {
            if (self.scan(theme_in_use))
                return false;

            return utils_sys.graphics.apply_theme('/framework/extensions/js/core/nature/themes/' + theme_in_use, theme_in_use);
        }
        else if (mode === 'replace')
        {
            self.themes.clear(theme_in_use);

            return utils_sys.graphics.apply_theme('/framework/extensions/js/core/nature/themes/' + theme_in_use, theme_in_use);
        }
    };

    this.scan = function(theme)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.alpha.is_string(theme))
            return false;

        return utils_int.search(theme);
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var cosmos = null,
        theme_in_use = null,
        utils_sys = new vulcan(),
        utils_int = new utilities();

    this.themes = new themes();
}
