/*

    GreyOS Inc. - MAX Screen (Browser size manager for GreyOS)
    
    File name: max_screen.js (Version: 1.6)
    Description: This file contains the MAX Screen - Browser size manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// MAX Screen
function max_screen()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.go_full_screen = function()
        {

            var __element = vulcan.objects.by_id(self.settings.container());

            vulcan.objects.by_id('max_screen_splash').style.display = 'none';

            if (__element.requestFullscreen)
                __element.requestFullscreen();

            else if (__element.mozRequestFullScreen)
                __element.mozRequestFullScreen();

            else if (__element.webkitRequestFullscreen)
                __element.webkitRequestFullscreen();
            
            else
                return false;

           self.settings.callback_function().call();

           return true;

        };

        this.setup = function(theme)
        {

            var __handler = null,
                __dynamic_object = null;

            if (!vulcan.graphics.apply_theme('/framework/extensions/js/max_screen/theme', theme))
                return false;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', 'max_screen_splash');
            __dynamic_object.setAttribute('class', 'max_screen');

            document.body.appendChild(__dynamic_object);

            __handler = function() { me.go_full_screen(); };
            vulcan.objects.by_id('max_screen_splash').onmousedown = __handler;

            return true;

        };

    }

    function settings()
    {

        var __container = null,
            __callback_function = null;

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

        this.callback_function = function(val)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.misc.is_undefined(val))
                return __callback_function;

            __callback_function = val;

            return true;

        };

    }

    function status()
    {

        this.full_screen = function()
        {

            if (is_init === false)
                return false;

            if ((screen.height - window.innerHeight) < 5)
                return true;

            return false;

        };

    }

    this.init = function(container_id, func, theme)
    {

        if (is_init === true)
            return false;

        is_init = true;

        if (vulcan.validation.misc.is_undefined(container_id) || 
            vulcan.validation.alpha.is_symbol(container_id) || vulcan.objects.by_id(container_id) === null || 
            !vulcan.validation.misc.is_function(func))
        {

            is_init = false;

            return false;

        }

        if (!self.settings.container(container_id))
        {

            is_init = false;

            return false;

        }

        self.settings.callback_function(func);

        if (!utils.setup(theme))
        {

            is_init = false;

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
        is_init = false,
        cosmos = null,
        vulcan = null,
        utils = new utilities();

    this.settings = new settings();
    this.status = new status();

}
