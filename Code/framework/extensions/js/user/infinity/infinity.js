/*
    GreyOS - Infinity (Version: 2.0)

    File name: infinity.js
    Description: This file contains the Infinity - Progress indicator facility.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Infinity
function infinity()
{
    var self = this;

    function status_model()
    {
        this.in_progress = function()
        {
            if (is_init === false)
                return false;

            return self.settings.in_progress();
        };
    }

    function settings_model()
    {
        var __id = null,
            __container = null,
            __in_progress = false;

        this.id = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __id;

            if (!utils_sys.validation.alpha.is_string(val))
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

            if (!utils_sys.validation.alpha.is_string(val))
                return false;

            __container = val;

            return true;
        };

        this.in_progress = function(val)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_undefined(val))
                return __in_progress;

            if (!utils_sys.validation.misc.is_bool(val))
                return false;

            __in_progress = val;

            return true;
        };
    }

    function utilities()
    {
        var me = this;

        this.draw = function()
        {
            var __dynamic_object = null,
                __infinity_id = self.settings.id(),
                __infinity_object = null,
                __container = utils_sys.objects.by_id(self.settings.container()),
                __top_pos = 0;

            if (utils_sys.validation.misc.is_undefined(__container) || __container === false)
                return false;

             __top_pos = (utils_sys.graphics.pixels_value(__container.style.height) / 2) - 25;

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __infinity_id);
            __dynamic_object.setAttribute('class', 'infinity');

            __dynamic_object.innerHTML = '<div class="progress_indicator" ' + 
                                         'style="margin-top: ' + __top_pos + 'px;"></div>';

            __container.appendChild(__dynamic_object);

            __infinity_object = utils_sys.objects.by_id(__infinity_id);
            __infinity_object.style.display = 'block';

            return true;
        };

        this.clear = function()
        {
            var __infinity_id = self.settings.id(),
                __infinity_object = utils_sys.objects.by_id(__infinity_id);

            if (__infinity_object !== null)
            {
                var __container = utils_sys.objects.by_id(self.settings.container());

                __container.removeChild(__infinity_object);
            }

            return false;
        };
    }

    this.setup = function(container_id)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.misc.is_undefined(container_id) || self.status.in_progress())
            return false;

        return self.settings.container(container_id);
    };

    this.begin = function()
    {
        if (is_init === false)
            return false;

        if (self.status.in_progress())
            return false;

        if (!utils_int.draw())
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

        utils_int.clear();

        self.settings.in_progress(false);

        return true;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        nature.theme(['infinity']);
        nature.apply('new');

        self.settings.id('infinity_' + random.generate());

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
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        utils_int = new utilities();

    this.status = new status_model();
    this.settings = new settings_model();
}
