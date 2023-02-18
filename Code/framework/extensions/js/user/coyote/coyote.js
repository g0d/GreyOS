/*
    GreyOS - Coyote (Version: 2.6)

    File name: coyote.js
    Description: This file contains the Coyote - Browser application.

    Coded by George Delaportas (G0D) and John Inglessis (negle)
    Copyright © 2013 - 2023
    Open Software License (OSL 3.0)
*/

// Coyote
function coyote()
{
    var self = this;

    function config_model()
    {
        this.id = null;
        this.pages = [];
        this.index = 0;
    }

    function utilities()
    {
        var me = this;

        this.gui_init = function()
        {
            var __data_content_id = coyote_bee.settings.general.id() + '_data';

            config.pages[0] = 'https://probotek.eu/';

            infinity.setup(__data_content_id);
            infinity.begin();

            me.draw_normal();
            me.draw_full_screen();
            me.attach_events('fullscreen');

            infinity.end();

            return true;
        };

        this.draw_normal = function()
        {
            coyote_bee.settings.data.window.content('<div id="' + coyote_bee.settings.general.id() + '_tabs_bar" class="coyote_tabs_bar">' + 
                                                    '  <div id="' + coyote_bee.settings.general.id() + '_tab_greyos" class="tab tab_selected">' + 
                                                    '  <div id="' + coyote_bee.settings.general.id() + '_tab_x" class="tab_close"></div>' + 
                                                    '  <div class="tab_text">GreyOS</div>' + 
                                                    '  </div>' + 
                                                    '  <div class="tab create_new_tab" title="Sorry, new tabs are not supported yet..."></div>' + 
                                                    '</div>' + 
                                                    '<div class="coyote_control_bar">' + 
                                                    '  <div id="' + coyote_bee.settings.general.id() + '_back" class="history_back browser_button"></div>' + 
                                                    '  <div id="' + coyote_bee.settings.general.id() + '_forward" class="history_forward browser_button"></div>' + 
                                                    '  <div id="' + coyote_bee.settings.general.id() + '_refresh" class="page_refresh browser_button"></div>' + 
                                                    '  <div id="' + coyote_bee.settings.general.id() + '_settings" class="browser_settings browser_button" ' + 
                                                    '       title="Sorry, settings are not available yet...">' + 
                                                    '</div>' + 
                                                    '<div id="' + coyote_bee.settings.general.id() + '_full_screen" class="browser_full_screen browser_button" title="Full screen mode"></div>' + 
                                                    '  <div class="adress_bar">' + 
                                                    '      <div id="' + coyote_bee.settings.general.id() + '_page_info" class="page_info browser_button" ' + 
                                                    '           title="Sorry, page information is not available yet...">' + 
                                                    '      </div>' + 
                                                    '      <input type="text" id="' + coyote_bee.settings.general.id() + '_address_box" class="address_box" value="https://probotek.eu/" placeholder="Enter an address...">' + 
                                                    '  </div>' + 
                                                    '</div>' + 
                                                    '<div id="' + coyote_bee.settings.general.id() + '_overlay" class="max_screen_overlay"></div>' + 
                                                    '<iframe id="' + coyote_bee.settings.general.id() + '_frame" class="coyote_frame" title="Coyote" src="https://probotek.eu/"></iframe>');

            utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame').style.height = (coyote_bee.status.gui.size.height() - 145) + 'px';

            return true;
        };

        this.draw_full_screen = function()
        {
            var dynamic_object = null;

            dynamic_object = document.createElement('div');
            dynamic_object.setAttribute('id', coyote_bee.settings.general.id() + '_full_screen_layer');
            dynamic_object.setAttribute('class', 'coyote_full_screen_layer');

            document.body.appendChild(dynamic_object);

            return true;
        };

        this.attach_events = function(mode)
        {
            var __address_box = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_address_box'),
                __refresh = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_refresh'),
                __back = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_back'),
                __forward = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_forward'),
                __full_screen = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_full_screen'),
                __tab_close = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_tab_x');

            utils_sys.events.attach(config.id, __address_box, 'keydown', function(event) { self.browse(__address_box.value, event); });
            utils_sys.events.attach(config.id, __refresh, 'click', function(event) { self.refresh(event); });
            utils_sys.events.attach(config.id, __back, 'click', function(event) { self.go.back(event); });
            utils_sys.events.attach(config.id, __forward, 'click', function(event) { self.go.forward(event); });
            utils_sys.events.attach(config.id, __tab_close, 'click', function(event) { self.close_tab(event); });

            if (mode === 'fullscreen')
                utils_sys.events.attach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 1); });

            return true;
        };
    }

    this.get_bee = function()
    {
        return coyote_bee;
    };

    this.close_tab = function(event_object)
    {
        if (is_init === false)
            return false;

        if (event_object === undefined)
            return false;

        var __tabs_bar = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_tabs_bar'),
            __greyos_tek_tab = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_tab_greyos'),
            __address_box = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_address_box'),
            __frame = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame');

        __tabs_bar.removeChild(__greyos_tek_tab);
        __address_box.value = '';
        __frame.src = '';

        return true;
    };

    function go()
    {
        this.back = function(event_object)
        {
            if (is_init === false)
                return false;

            if (event_object === undefined)
                return false;

            if (config.index === 0)
                return false;

            config.index--;

            if (config.pages[config.index] === undefined)
            {
                config.index++;

                return false;
            }

            var __address_box = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_address_box'),
                __frame = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame');

            __address_box.value = config.pages[config.index];
            __frame.src = config.pages[config.index];

            return true;
        };

        this.forward = function(event_object)
        {
            if (is_init === false)
                return false;

            if (event_object === undefined)
                return false;

            if (config.index === 100)
                return false;

            config.index++;

            if (config.pages[config.index] === undefined)
            {
                config.index--;

                return false;
            }

            var __address_box = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_address_box'),
                __frame = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame');

            __address_box.value = config.pages[config.index];
            __frame.src = config.pages[config.index];

            return true;
        };
    }

    this.browse = function(url, event_object)
    {
        if (is_init === false)
            return false;

        if (url === undefined)
            return false;

        var __address_box = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_address_box');

        __address_box.value = url;

        if (event_object === undefined)
        {
            utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame').src = url;

            config.index++;

            config.pages[config.index] = url;
        }
        else
        {
            if (coyote_bee.gui.keys.get(event_object) === 13)
            {
                utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame').src = url;

                config.index++;

                config.pages[config.index] = url;
            }
        }

        return true;
    };

    this.refresh = function(event_object)
    {
        if (is_init === false)
            return false;

        if (event_object === undefined)
            return false;

        var __frame = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame');

        __frame.src = __frame.src;

        return true;
    };

    this.full_screen = function(event_object, mode)
    {
        if (is_init === false)
            return false;

        if (event_object === undefined && mode === undefined || mode < 1 || mode > 2)
            return false;

        var __coyote_fs_layer = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_full_screen_layer'),
            __coyote_content = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_data'),
            __page_info = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_page_info'),
            __address_box = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_address_box'),
            __frame = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame'),
            __full_screen = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_full_screen');

        if (mode === 1)
        {
            __page_info.style.left = '87px';
            __page_info.style.top = '30px';
            __address_box.style.width = 'Calc(100vw - 167px)';
            __frame.style.height = '90.5%';
            __full_screen.style.backgroundImage = "url('/framework/extensions/js/user/nature/themes/coyote/pix/full_screen_hover.png')";

            __coyote_fs_layer.innerHTML = __coyote_content.innerHTML;
            __coyote_content.innerHTML = null;

            __coyote_fs_layer.style.display = 'block';

            utils_sys.events.detach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 1); });

            var __full_screen = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_full_screen');

            utils_sys.events.attach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 2); });
        }
        else
        {
            __page_info.style.left = '90px';
            __page_info.style.top = '34px';
            __address_box.style.width = (coyote_bee.status.gui.size.width() - 185) + 'px';
            __frame.style.height = (coyote_bee.status.gui.size.height() - 145) + 'px';
            __full_screen.style.backgroundImage = "url('/framework/extensions/js/user/nature/themes/coyote/pix/full_screen.png')";

            __coyote_content.innerHTML = __coyote_fs_layer.innerHTML;
            __coyote_fs_layer.innerHTML = null;

            __coyote_fs_layer.style.display = 'none';

            utils_sys.events.detach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 2); });

            var __full_screen = utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_full_screen');

            utils_sys.events.attach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 1); });
        }

        __address_box.value = __frame.src;

        utils_int.attach_events();

        return true;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
           return false;

        is_init = true;

        coyote_bee = dev_box.get('bee');

        config.id = 'coyote';

        nature.theme([config.id]);
        nature.apply('new');

        infinity.init();

        // Declare bee's settings
        coyote_bee.init(config.id, 1);
        coyote_bee.settings.data.window.labels.title('Coyote');
        coyote_bee.settings.data.window.labels.status_bar('Howling under the Internet moon light...');
        //coyote_bee.settings.general.casement_width(50);
        coyote_bee.gui.position.left(70);
        coyote_bee.gui.position.top(10);
        coyote_bee.gui.size.width(720);
        coyote_bee.gui.size.height(480);
        coyote_bee.gui.size.min.width(560);
        coyote_bee.gui.size.min.height(400);
        coyote_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        coyote_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        coyote_bee.on('open', function() { coyote_bee.gui.fx.fade.into(); });
        coyote_bee.on('opened', function() { utils_int.gui_init(); });
        coyote_bee.on('drag', function()
                              {
                                  utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_overlay').style.display = 'block';
                              });
        coyote_bee.on('dragging', function()
                                  {
                                      coyote_bee.gui.fx.opacity.settings.set(0.7);
                                      coyote_bee.gui.fx.opacity.apply();
                                  });
        coyote_bee.on('dragged', function()
                                 {
                                     coyote_bee.gui.fx.opacity.reset();

                                     utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_overlay').style.display = 'none';
                                 });
        coyote_bee.on('resizing', function()
                                  {
                                      utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_address_box').style.width = 
                                      (coyote_bee.status.gui.size.width() - 185) + 'px';
                                      utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_frame').style.height = 
                                      (coyote_bee.status.gui.size.height() - 145) + 'px';
                                  });
        coyote_bee.on('resize', function() { utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_overlay').style.display = 'block'; });
        coyote_bee.on('resized', function() { utils_sys.objects.by_id(coyote_bee.settings.general.id() + '_overlay').style.display = 'none'; });
        coyote_bee.on('close', function() { coyote_bee.gui.fx.fade.out(); });

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        nature = matrix.get('nature');
        infinity = matrix.get('infinity');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        infinity = null,
        nature = null,
        coyote_bee = null,
        utils_sys = new vulcan(),
        config = new config_model(),
        utils_int = new utilities();

    this.go = new go();
}
