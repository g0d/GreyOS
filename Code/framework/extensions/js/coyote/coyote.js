/*

    GreyOS Inc. - Coyote (GreyOS Browser)
    
    File name: coyote.js (Version: 2.4)
    Description: This file contains the Coyote extension.
    
    Coded by George Delaportas (G0D) and John Inglessis (negle)
    
    GreyOS Inc.
    Copyright © 2014

*/



// Coyote
function coyote()
{

    var self = this;

    function utilities()
    {

        this.gui_init = function()
        {

            config.db[0] = 'https://probotek.eu/';

            utils.draw();
            utils.draw_full_screen();
            utils.attach_events(1);

            return true;

        };

        this.draw = function()
        {

            coyote_bee.settings.data.window.content('<div id="coyote_tabs_bar" class="coyote_tabs_bar">' + 
                                                    '  <div id="tab_greyos" class="tab tab_selected">' + 
                                                    '  <div id="coyote_tab_x" class="tab_close"></div>' + 
                                                    '  <div class="tab_text">GreyOS</div>' + 
                                                    '  </div>' + 
                                                    '  <div class="tab create_new_tab" title="Sorry, new tabs are not supported in the DEMO!"></div>' + 
                                                    '</div>' + 
                                                    '<div class="coyote_control_bar">' + 
                                                    '  <div id="coyote_back" class="history_back browser_button"></div>' + 
                                                    '  <div id="coyote_forward" class="history_forward browser_button"></div>' + 
                                                    '  <div id="coyote_refresh" class="page_refresh browser_button"></div>' + 
                                                    '  <div id="coyote_settings" class="browser_settings browser_button" ' + 
                                                    '       title="Sorry, settings are not available in the DEMO!">' + 
                                                    '</div>' + 
                                                    '<div id="coyote_full_screen" class="browser_full_screen browser_button" title="Full screen mode"></div>' + 
                                                    '  <div class="adress_bar">' + 
                                                    '      <div id="coyote_page_info" class="page_info browser_button" ' + 
                                                    '           title="Sorry, page information is not available in the DEMO!">' + 
                                                    '      </div>' + 
                                                    '      <input type="text" id="coyote_address_box" class="address_box" value="https://probotek.eu/" placeholder="Enter an address...">' + 
                                                    '  </div>' + 
                                                    '</div>' + 
                                                    '<div id="coyote_overlay"></div>' + 
                                                    '<iframe id="coyote_frame" class="coyote_frame" src="https://probotek.eu/"></iframe>');

            vulcan.objects.by_id('coyote_frame').style.height = (coyote_bee.status.gui.size.height() - 145) + 'px';

            return true;

        };

        this.draw_full_screen = function()
        {

            var dynamic_object = null;

            dynamic_object = document.createElement('div');
            dynamic_object.setAttribute('id', 'coyote_full_screen_layer');
            dynamic_object.setAttribute('class', 'coyote_full_screen_layer');

            document.body.appendChild(dynamic_object);

            return true;

        };

        this.attach_events = function(mode)
        {

            var __address_box = vulcan.objects.by_id('coyote_address_box'),
                __refresh = vulcan.objects.by_id('coyote_refresh'),
                __back = vulcan.objects.by_id('coyote_back'),
                __forward = vulcan.objects.by_id('coyote_forward'),
                __full_screen = vulcan.objects.by_id('coyote_full_screen'),
                __tab_close = vulcan.objects.by_id('coyote_tab_x');

            vulcan.events.attach(config.id, __address_box, 'keydown', function(event) { self.browse(__address_box.value, event); });
            vulcan.events.attach(config.id, __refresh, 'click', function(event) { self.refresh(event); });
            vulcan.events.attach(config.id, __back, 'click', function(event) { self.go.back(event); });
            vulcan.events.attach(config.id, __forward, 'click', function(event) { self.go.forward(event); });
            vulcan.events.attach(config.id, __tab_close, 'click', function(event) { self.close_tab(event); });
            
            if (mode === 1)
                vulcan.events.attach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 1); });

            return true;

        };

    }

    function config_model()
    {

        this.id = null;
        this.db = [];
        this.index = 0;

    }

    this.id = function()
    {
        return 'coyote';
    };

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

        var __tabs_bar = vulcan.objects.by_id('coyote_tabs_bar'),
            __greyos_tek_tab = vulcan.objects.by_id('tab_greyos'),
            __address_box = vulcan.objects.by_id('coyote_address_box'),
            __frame = vulcan.objects.by_id('coyote_frame');

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

            if (config.db[config.index] === undefined)
            {

                config.index++;

                return false;

            }

            var __address_box = vulcan.objects.by_id('coyote_address_box'),
                __frame = vulcan.objects.by_id('coyote_frame');

            __address_box.value = config.db[config.index];
            __frame.src = config.db[config.index];

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

            if (config.db[config.index] === undefined)
            {

                config.index--;

                return false;

            }

            var __address_box = vulcan.objects.by_id('coyote_address_box'),
                __frame = vulcan.objects.by_id('coyote_frame');

            __address_box.value = config.db[config.index];
            __frame.src = config.db[config.index];

            return true;

        };

    }

    this.browse = function(url, event_object)
    {

        if (is_init === false)
            return false;

        if (url === undefined || event_object === undefined)
            return false;

        if (coyote_bee.gui.keys.get(event_object) === 13)
        {

            if (url.match(/http:/gi) === null)
                url = 'http://' + url;

            vulcan.objects.by_id('coyote_frame').src = url;

            config.index++;

            config.db[config.index] = url;

        }

        return true;
        
    };   
    
    this.refresh = function(event_object)
    {

        if (is_init === false)
            return false;

        if (event_object === undefined)
            return false;

        var __frame = vulcan.objects.by_id('coyote_frame');

        __frame.src = __frame.src;

        return true;

    };

    this.full_screen = function(event_object, mode)
    {

        if (is_init === false)
            return false;

        if (event_object === undefined && mode === undefined || mode < 1 || mode > 2)
            return false;

        var __coyote_fs_layer = vulcan.objects.by_id('coyote_full_screen_layer'),
            __coyote_content = vulcan.objects.by_id(config.id + '_data'),
            __page_info = vulcan.objects.by_id('coyote_page_info'),
            __address_box = vulcan.objects.by_id('coyote_address_box'),
            __frame = vulcan.objects.by_id('coyote_frame'),
            __full_screen = vulcan.objects.by_id('coyote_full_screen');

        if (mode === 1)
        {

            __page_info.style.left = '89px';
            __page_info.style.top = '30px';
            __address_box.style.width = screen.width - 167 + 'px';
            __frame.style.height = '90.5%';
            __full_screen.style.backgroundImage = "url('/framework/extensions/js/coyote/themes/pix/full_screen_hover.png')";

            __coyote_fs_layer.innerHTML = __coyote_content.innerHTML;
            __coyote_content.innerHTML = null;

            __coyote_fs_layer.style.display = 'block';

            vulcan.events.detach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 1); });

            var __full_screen = vulcan.objects.by_id('coyote_full_screen');

            vulcan.events.attach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 2); });

        }

        else
        {

            __page_info.style.left = '93px';
            __page_info.style.top = '34px';
            __address_box.style.width = (coyote_bee.status.gui.size.width() - 185) + 'px';
            __frame.style.height = (coyote_bee.status.gui.size.height() - 145) + 'px';
            __full_screen.style.backgroundImage = "url('/framework/extensions/js/coyote/themes/pix/full_screen.png')";

            __coyote_content.innerHTML = __coyote_fs_layer.innerHTML;
            __coyote_fs_layer.innerHTML = null;

            __coyote_fs_layer.style.display = 'none';

            vulcan.events.detach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 2); });

            var __full_screen = vulcan.objects.by_id('coyote_full_screen');

            vulcan.events.attach(config.id, __full_screen, 'click', function(event) { self.full_screen(event, 1); });

        }

        __address_box.value = __frame.src;

        utils.attach_events();

        return true;

    };

    this.init = function()
    {

        if (is_init === true)
           return false;

        coyote_bee = dev_box.get('bee');
        infinity = dev_box.get('infinity');
        fx = dev_box.get('fx');
        fx.init(cosmos);      

        vulcan.graphics.apply_theme('/framework/extensions/js/coyote/themes', 'coyote');

        config.id = 'coyote'; //+ pythia.generate();

        // Declare bee's settings
        coyote_bee.init(cosmos, config.id, 1);
        coyote_bee.settings.data.window.labels.title('Coyote');
        coyote_bee.settings.data.window.labels.status_bar('Howling under the Internet moon light...');
        coyote_bee.gui.position.left(0);
        coyote_bee.gui.position.top(0);
        coyote_bee.gui.size.width(720);
        coyote_bee.gui.size.height(480);
        coyote_bee.gui.size.min.width(560);
        coyote_bee.gui.size.min.height(400);
        coyote_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        coyote_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        coyote_bee.on('open', function() { coyote_bee.gui.fx.fade.into(); });
        coyote_bee.on('opened', function() { return utils.gui_init(); });
        coyote_bee.on('drag', function() { vulcan.objects.by_id('coyote_overlay').style.display = 'block'; });
        coyote_bee.on('dragging', function()
                                  {

                                      coyote_bee.gui.fx.opacity.settings.set(0.7);
                                      coyote_bee.gui.fx.opacity.apply();

                                  });
        coyote_bee.on('dragged', function()
                                 {

                                     coyote_bee.gui.fx.opacity.reset();

                                     vulcan.objects.by_id('coyote_overlay').style.display = 'none';

                                 });
        coyote_bee.on('resizing', function()
                                  {

                                      vulcan.objects.by_id('coyote_address_box').style.width = 
                                      (coyote_bee.status.gui.size.width() - 185) + 'px';
                                      vulcan.objects.by_id('coyote_frame').style.height = 
                                      (coyote_bee.status.gui.size.height() - 145) + 'px';

                                  });
        coyote_bee.on('resize', function() { vulcan.objects.by_id('coyote_overlay').style.display = 'block'; });
        coyote_bee.on('resized', function() { vulcan.objects.by_id('coyote_overlay').style.display = 'none'; });
        coyote_bee.on('close', function() { coyote_bee.gui.fx.fade.out(); });

        is_init = true;

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
        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        pythia = matrix.get('pythia');
        colony = matrix.get('colony');
        swarm = matrix.get('swarm');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        dev_box = null,
        pythia = null,
        infinity = null,
        colony = null,
        swarm = null,
        fx = null,
        coyote_bee = null,
        config = new config_model(),
        utils = new utilities();

    this.go = new go();

}
