/*
    GreyOS - Super Tray (Version: 1.0)

    File name: super_tray.js
    Description: This file contains the Super Tray - Icons tray area service module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Super Tray
function super_tray()
{
    var self = this;

    function utilities()
    {
        var me = this;

        this.load_ui = function()
        {
            nature.theme('super_tray');
            nature.apply('new');

            me.start_service();
            me.draw();
        };

        this.start_service = function()
        {
            if (is_service_active === true)
                return false;

            var __dynamic_object = null,
                __super_tray_id = self.settings.id(),
                __container = utils_sys.objects.by_id(self.settings.container());

            __container.innerHTML = '';

            __dynamic_object = document.createElement('div');

            __dynamic_object.setAttribute('id', __super_tray_id);
            __dynamic_object.setAttribute('class', 'super_tray');
            __dynamic_object.setAttribute('title', 'Access running services');

            __dynamic_object.innerHTML = '<div id="' + __super_tray_id + '_xxx"></div>';

            __container.appendChild(__dynamic_object);

            is_service_active = true;

            return true;
        };

        this.draw = function()
        {
            if (is_service_active === false)
                return false;

            var __super_tray_id = self.settings.id(),
                __super_tray_div = utils_sys.objects.by_id(self.settings.id());

            __super_tray_div.innerHTML += '<div id="' + __super_tray_id + '_access" class="xxx"></div>';
            __super_tray_div.style.display = 'block';

            return true;
        };
    }

    function status()
    {
        this.xxxx = function(app_id)
        {
            if (is_init === false)
                return false;

            return ;
        };

        this.options = function(app_id)
        {
            if (is_init === false)
                return false;

            return ;
        };
    }

    function settings()
    {
        var __id = null,
            __container = 'tray';

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

    this.set = function()
    {
        if (is_init === false)
            return false;

        return ;
    };

    this.reset = function()
    {
        if (is_init === false)
            return false;

        return ;
    };

    this.zzz = function()
    {
        if (is_init === false)
            return false;

        return ;
    };

    this.clear = function()
    {
        if (is_init === false)
            return false;

        return ;
    };

    this.load = function(container_id)
    {
        if (is_init === false)
            return false;

        if (utils_sys.validation.alpha.is_symbol(container_id))
            return false;

        self.settings.container(container_id);

        utils_int.load_ui();

        return true;
    };

    this.init = function(container_id)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        self.settings.id('super_tray_' + random.generate());

        if (utils_sys.validation.misc.is_undefined(container_id))
            return utils_int.start_service();
        else
            return self.load(container_id);
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
        is_service_active = false,
        cosmos = null,
        matrix = null,
        nature = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        utils_int = new utilities();

    this.status = new status();
    this.settings = new settings();
}
