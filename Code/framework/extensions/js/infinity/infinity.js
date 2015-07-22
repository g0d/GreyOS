/*

    GreyOS Inc. - Infinity (Progress indicator for GreyOS)
    
    File name: infinity.js (Version: 2.0)
    Description: This file contains the Infinity - Progress indicator extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Infinity
function infinity()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.apply_theme = function(theme)
        {

            if (self.status.in_progress())
                return false;

            if (vulcan.validation.misc.is_undefined(theme))
                theme = 'infinity';

            if (!vulcan.graphics.apply_theme('/framework/extensions/js/infinity/themes', theme))
                return false;

           return true;

        };

        this.clear_theme = function()
        {

            var __dynamic_object = null,
                __dynamic_objects_length = null,
                __this_theme = null,
                __temp = null;

            __dynamic_object = vulcan.objects.by_tag('link');

            __dynamic_objects_length = __dynamic_object.length;

            for (var i = 0; i < __dynamic_objects_length; i++)
            {

                if (vulcan.validation.misc.is_undefined(__dynamic_object[i].attributes[3]) || 
                    __dynamic_object[i].attributes[3] === null)
                    continue;

                __temp = __dynamic_object[i].attributes[3].nodeValue;
                __temp = __temp.substr(__temp.lastIndexOf('/') + 1);

                __this_theme = __temp.substr(0, __temp.length - 4);

                if (__this_theme === self.settings.theme())
                {

                    vulcan.objects.by_tag('head')[0].removeChild(__dynamic_object[i]);

                    return true;

                }

            }

            return false;

        };

        this.draw_infinity = function(theme)
        {

            var __dynamic_object = null,
                __infinity_id = self.settings.id(),
                __container = vulcan.objects.by_id(self.settings.container()),
                __top_pos = 0,
                __top_margin = 40;

            if (vulcan.validation.misc.is_undefined(__container) || __container === null)
                return false;

            if (!me.apply_theme(theme))
                return false;

            if (vulcan.validation.misc.is_undefined(__container.attributes[2]))
                __top_pos = (vulcan.graphics.pixels_value(__container.parentNode.attributes[2].nodeValue.substr(7)) / 2) - __top_margin;

            else
            {

                if (__container.attributes.length < 3)
                {

                    if (vulcan.validation.misc.is_undefined(__container.attributes[1]))
                        __top_pos = (vulcan.graphics.pixels_value(__container.attributes[1].nodeValue.substr(7)) / 2) - __top_margin;
                    
                    else
                        __top_pos = (vulcan.graphics.pixels_value(__container.parentNode.attributes[2].nodeValue.substr(7)) / 2) - __top_margin;

                }

                else
                    __top_pos = (vulcan.graphics.pixels_value(__container.attributes[2].nodeValue.substr(7)) / 2) - __top_margin;

            }

            __dynamic_object = document.createElement('div');

            __dynamic_object.innerHTML = '<div id="' + __infinity_id + '" class="infinity">' + 
                                         '<div class="progress_indicator" ' + 
                                         'style="margin-top: ' + __top_pos + 'px;"></div>' + 
                                         '</div>';
            __container.innerHTML = __dynamic_object.innerHTML;

            return true;

        };

    }

    function settings()
    {

        var __id = null,
            __container = null,
            __in_progress = false,
            __theme = 'infinity';

        this.id = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __id;

            if (vulcan.validation.alpha.is_symbol(val))
                return false;

            __id = val;

            return true;

        };

        this.container = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __container;

            if (vulcan.validation.alpha.is_symbol(val))
                return false;

            __container = val;

            return true;

        };

        this.in_progress = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __in_progress;

            if (!vulcan.validation.misc.is_bool(val))
                return false;

            __in_progress = val;

            return true;

        };

        this.theme = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __theme;

            if (!vulcan.validation.alpha.is_string(val))
                return false;

            __theme = val;

            return true;

        };

    }

    function status()
    {

        this.in_progress = function()
        {

            if (is_init === false)
                return false;

            return self.settings.in_progress();

        };

        this.theme = function()
        {

            if (is_init === false)
                return false;

            return self.settings.theme();

        };

    }

    this.setup = function(container_id)
    {

        if (is_init === false)
            return false;

        if (self.status.in_progress() || vulcan.validation.alpha.is_symbol(container_id))
            return false;

        self.settings.container(container_id);

        return true;

    };

    this.begin = function(theme)
    {

        if (is_init === false)
            return false;

        if (self.status.in_progress())
            return false;

        if (!utils.draw_infinity(theme))
            return false;

        self.settings.in_progress(true);

        return true;

    };

    this.end = function()
    {

        if (is_init === false)
            return false;

        if (!self.status.in_progress())
            return false;

        utils.clear_theme();

        self.settings.in_progress(false);

        return true;

    };

    this.init = function(cosmos_object)
    {

        if (is_init === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        vulcan = cosmos_object.hub.access('vulcan');

        is_init = true;

        var __pythia = cosmos_object.hub.access('matrix').get('pythia');

        self.settings.id('infinity_' + __pythia.generate());

        return true;

    };

    var is_init = false,
        vulcan = null,
        utils = new utilities();

    this.settings = new settings();
    this.status = new status();

}
