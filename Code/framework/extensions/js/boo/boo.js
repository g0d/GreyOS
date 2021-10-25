/*

    GreyOS Inc. - Boo (Splash screen load indicator for GreyOS)
    
    File name: boo.js (Version: 1.0)
    Description: This file contains the Infinity - Splash screen load indicator.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Boo
function boo()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.apply_theme = function(directory, theme)
        {

            if (directory === undefined)
                return false;

            if (theme === undefined)
                theme = 'boo';

            var __dynamic_object = null;

            __dynamic_object = document.createElement('link');
            __dynamic_object.setAttribute('rel', 'stylesheet');
            __dynamic_object.setAttribute('type', 'text/css');
            __dynamic_object.setAttribute('media', 'screen');
            __dynamic_object.setAttribute('href', directory + '/' + theme + '.css');

            document.getElementsByTagName('head')[0].appendChild(__dynamic_object);

            return true;

        };

        this.draw_boo = function()
        {

            var __boo_screen = null,
                __boo = null,
                __splash = document.getElementById('splash');

            if (!me.apply_theme('/framework/extensions/js/boo/themes'))
                return false;

            __boo_screen = document.createElement('div');
            __boo_screen.id = 'boo_screen';

            __boo = document.createElement('div');
            __boo.id = 'boo';
            __boo.className = 'boo';
            __boo.innerHTML = '<div class="load_indicator"></div>';

            __boo_screen.appendChild(__boo);

            document.body.appendChild(__boo_screen);

            if (__splash)
                __splash.play();

            //$(function() { TweenMax.to($('.load_indicator'), 1.2, {opacity:0.0, yoyo:true, repeat:-1, delay:0.5}); });

            return true;

        };

        this.remove_boo = function()
        {

            var __boo_screen = document.getElementById('boo_screen'),
                __boo = document.getElementById('boo');

            __boo_screen.removeChild(__boo);

            return true;

        };

    }

    function settings()
    {

        var __loading = false;

        this.loading = function(val)
        {

            if (val === undefined)
                return __loading;

            __loading = val;

            return true;

        };

    }

    function status()
    {

        this.loading = function()
        {

            return self.settings.loading();

        };

    }

    this.start = function()
    {

        if (self.status.loading())
            return false;

        if (!utils.draw_boo())
            return false;

        self.settings.loading(true);

        return true;

    };

    this.stop = function()
    {

        if (!self.status.loading())
            return false;

        utils.remove_boo();

        self.settings.loading(false);

        return true;

    };

    var utils = new utilities();

    this.settings = new settings();
    this.status = new status();

}

var boo = new boo();
