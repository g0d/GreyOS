/*

    GreyOS Inc. - Tik Tok (Clock for GreyOS)
    
    File name: tik_tok.js (Version: 1.8)
    Description: This file contains the Tik Tok - Clock extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Tik Tok
function tik_tok()
{

    var self = this;

    function utilities()
    {

        this.draw_tik_tok = function(theme)
        {

            var __dynamic_object = null,
                __tik_tok_id = self.settings.id(),
                __container = vulcan.objects.by_id(self.settings.container());

            if (vulcan.validation.misc.is_undefined(theme))
                theme = self.settings.theme();

            if (!vulcan.graphics.apply_theme('/framework/extensions/js/nature/themes/tik_tok', theme))
                return false;

            __dynamic_object = document.createElement('div');
            __dynamic_object.innerHTML = '<div id="' + __tik_tok_id + '" class="tik_tok">' + 
                                         '<div id="' + __tik_tok_id + '_date" class="clock_date"></div>' + 
                                         '<div id="' + __tik_tok_id + '_time" class="clock_time"></div>' + 
                                         '</div>';

            __container.innerHTML = __dynamic_object.innerHTML;

            vulcan.objects.by_id(__tik_tok_id).style.display = 'block';

            clock.get_time_date(__tik_tok_id + '_time', __tik_tok_id + '_date');

            return true;

        };

    }

    function time_date_model()
    {

        var me = this;

        var __today = null,
            __hour = null,
            __min = null,
            __sec = null,
            __day = null,
            __month = null,
            __year = null,
            __time_container_id = null,
            __date_container_id = null;

        function count_time()
        {

            __today = new Date();

            setTimeout(function()
                       {

                           count_time();

                           me.get_time(__time_container_id);
                           me.get_date(__date_container_id);
                           me.get_time_date(__time_container_id, __date_container_id);

                       }, 1000);

            return true;

        }

        function fix_time(n)
        {

            if (!vulcan.validation.numerics.is_integer(n))
                return false;

            if (n < 10)
                n = '0' + n;

            return n;

        }

        function fix_date(n)
        {

            if (!vulcan.validation.numerics.is_integer(n))
                return false;

            if (n < 10)
                n = '0' + n;

            return n;

        }

        this.get_time = function(container_id)
        {

            if (vulcan.validation.misc.is_object(container_id) || vulcan.validation.alpha.is_symbol(container_id))
                return false;

            __hour = __today.getHours();
            __min = __today.getMinutes();
            __sec = __today.getSeconds();

            __hour = fix_time(__hour);
            __min = fix_time(__min);
            __sec = fix_time(__sec);

            if (vulcan.validation.misc.is_undefined(container_id))
                return __hour + ':' + __min + ':' + __sec;

            __time_container_id = container_id;

            vulcan.objects.by_id(container_id).innerHTML = __hour + ':' + __min + ':' + __sec;

            return true;

        };

        this.get_date = function(container_id)
        {

            if (vulcan.validation.misc.is_object(container_id) || vulcan.validation.alpha.is_symbol(container_id))
                return false;

            __day = fix_date(__today.getDate());
            __month = fix_date(__today.getMonth() + 1);
            __year = __today.getFullYear();

            if (vulcan.validation.misc.is_undefined(container_id))
                return __month + '/' + __day + '/' + __year;

            __date_container_id = container_id;

            vulcan.objects.by_id(container_id).innerHTML = __month + '/' + __day + '/' + __year;

            return true;

        };

        this.get_time_date = function(time_container_id, date_container_id)
        {

            if (vulcan.validation.misc.is_object(time_container_id) || vulcan.validation.alpha.is_symbol(time_container_id) || 
                vulcan.validation.misc.is_object(date_container_id) || vulcan.validation.alpha.is_symbol(date_container_id))
                return false;

            __hour = __today.getHours();
            __min = __today.getMinutes();
            __sec = __today.getSeconds();

            __hour = fix_time(__hour);
            __min = fix_time(__min);
            __sec = fix_time(__sec);

            __day = fix_date(__today.getDate());
            __month = fix_date(__today.getMonth() + 1);
            __year = __today.getFullYear();

            if (vulcan.validation.misc.is_undefined(time_container_id) && vulcan.validation.misc.is_undefined(date_container_id))
                return __hour + ':' + __min + ':' + __sec + '   ' + __month + '/' + __day + '/' + __year;

            var __dynamic_time_content = vulcan.objects.by_id(time_container_id),
                __dynamic_date_content = vulcan.objects.by_id(date_container_id);

            __time_container_id = time_container_id;
            __date_container_id = date_container_id;

            __dynamic_time_content.innerHTML = __hour + ':' + __min + ':' + __sec;
            __dynamic_date_content.innerHTML = __month + '/' + __day + '/' + __year;

            return true;

        };

        count_time();

    }

    function settings()
    {

        var __id = null,
            __container = null,
            __theme = 'tik_tok';

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

        this.theme = function()
        {

            if (is_init === false)
                return false;

            return self.settings.theme();

        };

        this.time = function()
        {

            if (is_init === false)
                return false;

            return clock.get_time();

        };

        this.date = function()
        {

            if (is_init === false)
                return false;

            return clock.get_date();

        };

        this.time_date = function()
        {

            if (is_init === false)
                return false;

            return clock.get_time_date();

        };

    }

    this.init = function(container_id, theme)
    {

        if (is_init === true)
            return false;

        if (vulcan.validation.misc.is_undefined(container_id) || 
            vulcan.validation.alpha.is_symbol(container_id) || 
            vulcan.objects.by_id(container_id) === null)
            return false;

        is_init = true;

        var __pythia = cosmos.hub.access('matrix').get('pythia');

        self.settings.id('tik_tok_' + __pythia.generate());
        self.settings.container(container_id);

        clock = new time_date_model();

        if (!utils.draw_tik_tok(theme))
        {

            is_init = false;

            clock = null;

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
        clock = null,
        utils = new utilities();

    this.settings = new settings();
    this.status = new status();

}
