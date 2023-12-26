/*
    Yoda (Local dynamic content manager for JS)

    File name: yoda.js (Version: 1.0)
    Description: This file contains the Yoda extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D)
    Copyright (C) 2023
    Open Software License (OSL 3.0)
*/

// Yoda
function yoda()
{
    this.fetch = function(dynamic_contents, lang, label = null)
    {
        if (!utils.validation.misc.is_object(dynamic_contents) || utils.validation.misc.is_undefined(lang) || 
            utils.validation.alpha.is_symbol(lang) || lang.length !== 2 || 
            utils.validation.misc.is_undefined(label))
            return false;

        if (label !== null)
        {
            for (var this_record of dynamic_contents[lang])
            {
                if (this_record.hasOwnProperty(label))
                    return this_record[label];
            }
        }

        return dynamic_contents[lang];
    };

    this.get = function(dynamic_contents, lang, label = null)
    {
        if (!is_init)
            return false;

        if (!utils.validation.misc.is_object(dynamic_contents) || utils.validation.misc.is_undefined(lang) || 
            utils.validation.alpha.is_symbol(lang) || lang.length !== 2 || 
            utils.validation.misc.is_undefined(label))
            return false;

        if (!available_langs.hasOwnProperty(lang))
            return false;

        if (label !== null)
        {
            for (var this_record of dynamic_contents[lang])
            {
                if (this_record.hasOwnProperty(label))
                    return this_record[label];
            }
        }

        return dynamic_contents[lang];
    };

    this.set = function(dynamic_contents, lang, label)
    {
        if (!is_init)
            return false;

        if (!utils.validation.misc.is_object(dynamic_contents) || utils.validation.misc.is_undefined(lang) || 
            utils.validation.alpha.is_symbol(lang) || lang.length !== 2 || 
            utils.validation.misc.is_undefined(label))
            return false;

        if (!available_langs.hasOwnProperty(lang))
            return false;

        available_langs[lang].push(label);

        return available_langs;
    };

    this.list = function(dynamic_contents, lang = null)
    {
        if (!is_init)
            return false;

        if (!utils.validation.misc.is_object(dynamic_contents))
            return false;

        if (lang !== null)
        {
            if (utils.validation.alpha.is_symbol(lang) || lang.length !== 2)
                return false;
            else
                return dynamic_contents[lang];
        }

        return dynamic_contents;
    };

    this.reset = function(dynamic_contents)
    {
        if (!is_init)
            return false;

        if (!utils.validation.misc.is_object(dynamic_contents))
            return false;

        available_langs = {};
        dynamic_contents = [];

        return true;
    };

    this.init = function(languages_array)
    {
        if (is_init)
            return false;

        if (!utils.validation.misc.is_array(languages_array))
            return false;

        var this_lang = null;

        for (this_lang of languages_array)
        {
            if (this_lang.length !== 2)
                return false;

            available_langs[this_lang] = [];
        }

        is_init = true;

        return true;
    };

    var is_init = false,
        available_langs = {},
        utils = new vulcan();
}
