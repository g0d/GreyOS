/*
    GreyOS - Tik Tok (Version: 2.0)

    File name: tik_tok.js
    Description: This file contains the Tik Tok - Clock service.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2023
    Open Software License (OSL 3.0)
*/

// Tik Tok
function tik_tok()
{
    var self = this;

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
            if (!utils_sys.validation.numerics.is_integer(n))
                return false;

            if (n < 10)
                n = '0' + n;

            return n;
        }

        function fix_date(n)
        {
            if (!utils_sys.validation.numerics.is_integer(n))
                return false;

            if (n < 10)
                n = '0' + n;

            return n;
        }

        this.get_time = function(container_id)
        {
            if (utils_sys.validation.misc.is_object(container_id) || utils_sys.validation.alpha.is_symbol(container_id))
                return false;

            __hour = __today.getHours();
            __min = __today.getMinutes();
            __sec = __today.getSeconds();

            __hour = fix_time(__hour);
            __min = fix_time(__min);
            __sec = fix_time(__sec);

            if (utils_sys.validation.misc.is_undefined(container_id))
                return __hour + ':' + __min + ':' + __sec;

            __time_container_id = container_id;

            utils_sys.objects.by_id(container_id).innerHTML = __hour + ':' + __min + ':' + __sec;

            return true;
        };

        this.get_date = function(container_id)
        {
            if (utils_sys.validation.misc.is_object(container_id) || utils_sys.validation.alpha.is_symbol(container_id))
                return false;

            __day = fix_date(__today.getDate());
            __month = fix_date(__today.getMonth() + 1);
            __year = __today.getFullYear();

            if (utils_sys.validation.misc.is_undefined(container_id))
                return __day + '/' + __month + '/' + __year;

            __date_container_id = container_id;

            utils_sys.objects.by_id(container_id).innerHTML = __day + '/' + __month + '/' + __year;

            return true;
        };

        this.get_time_date = function(time_container_id, date_container_id)
        {
            if (utils_sys.validation.misc.is_object(time_container_id) || utils_sys.validation.alpha.is_symbol(time_container_id) || 
                utils_sys.validation.misc.is_object(date_container_id) || utils_sys.validation.alpha.is_symbol(date_container_id))
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

            if (utils_sys.validation.misc.is_undefined(time_container_id) && utils_sys.validation.misc.is_undefined(date_container_id))
                return __hour + ':' + __min + ':' + __sec + '   ' + __day + '/' + __month + '/' + __year;

            var __dynamic_time_content = utils_sys.objects.by_id(time_container_id),
                __dynamic_date_content = utils_sys.objects.by_id(date_container_id);

            __time_container_id = time_container_id;
            __date_container_id = date_container_id;

            __dynamic_time_content.innerHTML = __hour + ':' + __min + ':' + __sec;
            __dynamic_date_content.innerHTML = __day + '/' + __month + '/' + __year;

            return true;
        };

        count_time();
    }

    function utilities()
    {
        this.draw = function()
        {
            var __dynamic_object = null,
                __tik_tok_id = self.settings.id(),
                __container = utils_sys.objects.by_id(self.settings.container());

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __tik_tok_id);
            __dynamic_object.setAttribute('class', 'tik_tok');
            __dynamic_object.setAttribute('title', 'Time & calendar');

            __dynamic_object.innerHTML = '<div id="' + __tik_tok_id + '_date" class="clock_date"></div>' + 
                                         '<div id="' + __tik_tok_id + '_time" class="clock_time"></div>';

            __dynamic_object.style.display = 'block';

            __container.appendChild(__dynamic_object);

            clock.get_time_date(__tik_tok_id + '_time', __tik_tok_id + '_date');

            return true;
        };
    }

    function status()
    {
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

    function settings()
    {
        var __id = null,
            __container = null;

        this.id = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __id;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __id = val;

            return true;
        };

        this.container = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __container;

            if (utils_sys.validation.alpha.is_symbol(val))
                return false;

            __container = val;

            return true;
        };
    }

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || 
            utils_sys.validation.alpha.is_symbol(container_id) || 
            utils_sys.objects.by_id(container_id) === null)
            return false;

        is_init = true;

        self.settings.id('tik_tok_' + random.generate());
        self.settings.container(container_id);

        nature.theme('tik_tok');
        nature.apply('new');

        clock = new time_date_model();

        utils_int.draw();

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');

        nature = matrix.get('nature');

        return true;
    };

    var is_init = false,
        cosmos = null,
        clock = null,
        matrix = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        utils_int = new utilities();

    this.status = new status();
    this.settings = new settings();
}
