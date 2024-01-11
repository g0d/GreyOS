/*
    GreyOS - Coyote (Version: 3.1)

    File name: coyote.js
    Description: This file contains the Coyote - Browser application.

    Coded by George Delaportas (G0D) and John Inglessis (negle)
    Copyright © 2013 - 2024
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
        this.ping_interval = 600000
        this.is_full_screen = false;
        this.hb_options = {
                                "kiosk"         :   true,
                                "webgl"         :   true,
                                "hide_cursor"   :   true,
                                "dark"          :   true,
                                "search_engine" :   "google",
                                "tag"           :   "greyos_" + Date.now(),
                                "region"        :   "EU",
                                "width"         :   1920,
                                "height"        :   1080,
                                "fps"           :   30,
                                "profile"       :   {
                                                        "save"  :   true
                                                    }
                          };
        this.ajax_config = {
                                "type"          :   "request",
                                "method"        :   "post",
                                "url"           :   "/",
                                "data"          :   "gate=hyperbeam&config=" + JSON.stringify(this.hb_options),
                                "ajax_mode"     :   "asynchronous",
                           };
    }

    function utilities()
    {
        var me = this;

        this.close_new_user_tab = function()
        {
            var __all_tabs_promise = hb_manager.tabs.query({ active: true, title : "New Tab" });

            __all_tabs_promise.then((result) =>
            {
                result.forEach(element => { hb_manager.tabs.remove(element.id); });
            });
        };

        this.update_controls_delegate = function(tab_id, change_info, tab)
        {
            if (tab.status === 'complete')
                me.update_browsing_controls(tab.url);
        };

        this.update_browsing_controls = function(url)
        {
            if (utils_sys.validation.misc.is_nothing(url))
                return false;

            if (config.index > 0 && config.pages[config.index - 1] === url)
                return false;

            if (!url.includes('http'))
                url = 'https://' + url;

            browser_address_box.value = url;

            config.pages[config.index] = url;

            config.index++;

            return url;
        };

        this.go_to = function(url)
        {
            var full_url = me.update_browsing_controls(url);

            if (full_url === false)
                self.browser_controls.refresh(true);
            else
                hb_manager.tabs.update({ url: full_url });

            return true;
        };

        this.gui_init = function()
        {
            coyote_bee_id = coyote_bee.settings.general.id();

            me.draw_normal();
            me.draw_full_screen_layer();
            me.attach_events('normal_to_fullscreen');
            me.init_hyberbeam(config.pages[0], () => { hb_manager.resize(1006, 565); });

            return true;
        };

        this.draw_normal = function()
        {
            coyote_bee.settings.data.window.content('<div id="' + coyote_bee_id + '_tabs_bar" class="coyote_tabs_bar">' + 
                                                    '  <div id="' + coyote_bee_id + '_tab_greyos" class="tab tab_selected">' + 
                                                    '  <div id="' + coyote_bee_id + '_tab_x" class="tab_close"></div>' + 
                                                    '  <div class="tab_text">GreyOS</div>' + 
                                                    '  </div>' + 
                                                    '  <div class="tab create_new_tab" title="Sorry, new tabs are not supported yet..."></div>' + 
                                                    '</div>' + 
                                                    '<div class="coyote_control_bar">' + 
                                                    '  <div id="' + coyote_bee_id + '_back" class="history_back browser_button"></div>' + 
                                                    '  <div id="' + coyote_bee_id + '_forward" class="history_forward browser_button"></div>' + 
                                                    '  <div id="' + coyote_bee_id + '_refresh" class="page_refresh browser_button"></div>' + 
                                                    '  <div id="' + coyote_bee_id + '_settings" class="browser_settings browser_button" ' + 
                                                    '       title="Sorry, settings are not available yet...">' + 
                                                    '</div>' + 
                                                    '<div id="' + coyote_bee_id + '_full_screen" class="browser_full_screen browser_button" title="Full screen mode is not available in the demo..."></div>' + 
                                                    '  <div class="adress_bar">' + 
                                                    '      <div id="' + coyote_bee_id + '_page_info" class="page_info browser_button" ' + 
                                                    '           title="Sorry, page information is not available yet...">' + 
                                                    '      </div>' + 
                                                    '      <input type="text" id="' + coyote_bee_id + '_address_box" class="address_box" value="' + init_url + '" placeholder="Enter a web address...">' + 
                                                    '  </div>' + 
                                                    '</div>' +  
                                                    '<div id="' + coyote_bee_id + '_frame" class="coyote_frame"></div>');

            browser_address_box = utils_sys.objects.by_id(coyote_bee_id + '_address_box');
            browser_frame = utils_sys.objects.by_id(coyote_bee_id + '_frame');
            browser_frame.style.width = (coyote_bee.status.gui.size.width() - 18) + 'px';

            return true;
        };

        this.draw_full_screen_layer = function()
        {
            coyote_fs_layer = document.createElement('div');
            coyote_fs_layer.setAttribute('id', coyote_bee_id + '_full_screen_layer');
            coyote_fs_layer.setAttribute('class', 'coyote_full_screen_layer');

            document.body.appendChild(coyote_fs_layer);

            return true;
        };

        this.browser_frame_size = function()
        {
            var browser_frame_width, browser_frame_height;

            browser_address_box.style.width = 
            (coyote_bee.status.gui.size.width() - 185) + 'px';

            browser_frame_width = (coyote_bee.status.gui.size.width() - 18);
            browser_frame.style.width = browser_frame_width + 'px';

            browser_frame_height = (coyote_bee.status.gui.size.height() - 155);
            browser_frame.style.height = browser_frame_height + 'px';
        };

        this.attach_events = function(mode)
        {
            var __refresh = utils_sys.objects.by_id(coyote_bee_id + '_refresh'),
                __back = utils_sys.objects.by_id(coyote_bee_id + '_back'),
                __forward = utils_sys.objects.by_id(coyote_bee_id + '_forward'),
                __full_screen = utils_sys.objects.by_id(coyote_bee_id + '_full_screen'),
                __tab_close = utils_sys.objects.by_id(coyote_bee_id + '_tab_x'),
                __handler = null;

            browser_address_box = utils_sys.objects.by_id(coyote_bee_id + '_address_box');

            if (config.pages.length == 1)
                browser_address_box.value = config.pages[0];
            else
                browser_address_box.value = config.pages[config.index - 1];

            __handler = function(event) { self.browser_controls.address(browser_address_box.value, event); };
            morpheus.run(config.id, 'key', 'keydown', __handler, browser_address_box);

            __handler = function(event) { self.browser_controls.refresh(event); };
            morpheus.run(config.id, 'mouse', 'click', __handler, __refresh);

            __handler = function(event) { self.browser_controls.go.back(event); };
            morpheus.run(config.id, 'mouse', 'click', __handler, __back);

            __handler = function(event) { self.browser_controls.go.forward(event); };
            morpheus.run(config.id, 'mouse', 'click', __handler, __forward);

            __handler = function(event) { self.browser_controls.tabs.destroy(event); };
            morpheus.run(config.id, 'mouse', 'click', __handler, __tab_close);
/*
            if (mode === 'normal_to_fullscreen')
            {
                morpheus.delete('click', config.id, __full_screen);

                __handler = function(event) { self.browser_controls.full_screen(event, 1); };
                morpheus.run(config.id, 'mouse', 'click', __handler, __full_screen);
            }
            else
            {
                morpheus.delete('click', config.id, __full_screen);

                __handler = function(event) { self.browser_controls.full_screen(event, 2); };
                morpheus.run(config.id, 'mouse', 'click', __handler, __full_screen);
            }
*/
            return true;
        };

        this.init_hyberbeam = function(url, callback)
        {
            config.ajax_config.on_success = async (hb_url) =>
            {
                if (utils_sys.validation.misc.is_nothing(hb_url))
                    return false;

                hb_manager = await hyperbeam(browser_frame, hb_url);

                if (utils_sys.validation.misc.is_nothing(url))
                    url = init_url;

                hb_manager.tabs.update({ url: url });
                hb_manager.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { me.update_controls_delegate(tabId, changeInfo, tab); });
                hb_manager.tabs.onCreated.addListener(() => { me.close_new_user_tab(); });

                ping_timer.start(config.ping_interval, () => { hb_manager.ping(); });

                if (callback !== undefined)
                    callback.call(this);

                setTimeout(function()
                           {
                                is_browser_loading = false;

                                infinity.end();
                           }, 8000);
            };
            config.ajax_config.on_timeout = () => { };
            config.ajax_config.on_fail = () => { };

            infinity.setup(coyote_bee_id + '_data');
            infinity.begin();

            ajax.run(config.ajax_config);
        };
    }

    function browser_ctrl()
    {
        function tab_ctrl()
        {
            this.create = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (event_object === undefined)
                    return false;

                var __tabs_bar = utils_sys.objects.by_id(coyote_bee_id + '_tabs_bar'),
                    __greyos_tab = utils_sys.objects.by_id(coyote_bee_id + '_tab_greyos');

                if (config.is_full_screen)
                    utils_sys.objects.by_id(coyote_bee_id).style = 'visibility: hidden';

                browser_address_box.value = '';

                __tabs_bar.addChild(__greyos_tab);

                if (__tabs_bar.childNodes.length === 10)
                    ;

                return true;
            };

            this.destroy = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (event_object === undefined)
                    return false;

                var __tabs_bar = utils_sys.objects.by_id(coyote_bee_id + '_tabs_bar'),
                    __greyos_tab = utils_sys.objects.by_id(coyote_bee_id + '_tab_greyos');

                if (config.is_full_screen)
                    utils_sys.objects.by_id(coyote_bee_id).style = 'visibility: hidden';

                browser_address_box.value = '';

                __tabs_bar.removeChild(__greyos_tab);

                if (__tabs_bar.childNodes.length === 3)
                    coyote_bee.gui.actions.close(null);

                return true;
            };
        }

        function explore_ctrl()
        {
            this.back = function(event_object)
            {
                if (is_init === false)
                    return false;

                if (event_object === undefined)
                    return false;

                if (config.index < 2)
                    return false;

                if (config.pages[config.index - 2] === browser_address_box.value)
                    return false;

                config.index -= 2;

                browser_address_box.value = config.pages[config.index];

                utils_int.go_to(browser_address_box.value);

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

                if (config.pages[config.index] === undefined)
                    return false;

                if (config.pages[config.index] === browser_address_box.value)
                    return false;

                browser_address_box.value = config.pages[config.index];

                config.index++;

                utils_int.go_to(browser_address_box.value);

                return true;
            };
        }

        this.refresh = function(event_object)
        {
            if (is_init === false)
                return false;

            if (event_object === undefined)
                return false;

            hb_manager.tabs.update({ url: config.pages[config.index - 1] });

            return true;
        };

        this.address = function(url, event_object)
        {
            if (is_init === false)
                return false;

            if (utils_sys.validation.misc.is_nothing(url))
                return false;

            if (event_object === true)
                utils_int.go_to(url);
            else
            {
                if (coyote_bee.gui.keys.get(event_object) === 13)
                    utils_int.go_to(url);
            }

            return true;
        };

        this.full_screen = function(event_object, mode)
        {
            if (is_init === false)
                return false;

            if ((event_object === undefined && mode === undefined) || mode < 1 || mode > 2)
                return false;

            var __coyote_content = utils_sys.objects.by_id(coyote_bee_id + '_data'),
                __page_info = utils_sys.objects.by_id(coyote_bee_id + '_page_info'),
                __full_screen = utils_sys.objects.by_id(coyote_bee_id + '_full_screen');

            if (mode === 1)
            {
                __page_info.style.left = '87px';
                __page_info.style.top = '30px';
                browser_address_box.style.width = 'Calc(100vw - 167px)';
                __full_screen.style.backgroundImage = "url('/framework/extensions/js/user/nature/themes/coyote/pix/full_screen_hover.png')";
                __full_screen.title = 'Normal mode';

                coyote_fs_layer.innerHTML = __coyote_content.innerHTML;
                coyote_fs_layer.style.display = 'block';

                __coyote_content.innerHTML = '';

                browser_frame = utils_sys.objects.by_id(coyote_bee_id + '_frame');
                browser_frame.style.margin = 'auto';
                browser_frame.style.width = '100%';
                browser_frame.style.height = (window.innerHeight - 63) + 'px';

                config.is_full_screen = true;
            }
            else
            {
                __page_info.style.left = '90px';
                __page_info.style.top = '34px';
                browser_address_box.style.width = (coyote_bee.status.gui.size.width() - 185) + 'px';
                __full_screen.style.backgroundImage = '';
                __full_screen.title = 'Full screen mode';

                __coyote_content.innerHTML = coyote_fs_layer.innerHTML;

                coyote_fs_layer.innerHTML = '';
                coyote_fs_layer.style.display = 'none';

                browser_frame = utils_sys.objects.by_id(coyote_bee_id + '_frame');
                browser_frame.style.margin = '';
                browser_frame.style.width = (coyote_bee.status.gui.size.width() - 18) + 'px';
                browser_frame.style.height = (coyote_bee.status.gui.size.height() - 155) + 'px';

                config.is_full_screen = false;
            }

            hb_manager.destroy();

            utils_int.init_hyberbeam(config.pages[config.index - 1], () => 
            {
                if (mode === 1)
                {
                    utils_int.attach_events('fullscreen_to_normal');

                    hb_manager.resize(1920, 1080);
                }
                else
                {
                    utils_int.attach_events('normal_to_fullscreen');

                    var browser_frame_width = utils_sys.graphics.pixels_value(browser_frame.style.width),
                        browser_frame_height = utils_sys.graphics.pixels_value(browser_frame.style.height);

                    hb_manager.resize(browser_frame_width, browser_frame_height);
                }
            });

            return true;
        };    

        this.settings = function()
        {
            // Not implemented yet...
        };

        this.tabs = new tab_ctrl();
        this.go = new explore_ctrl();
    };

    this.base = function()
    {
        if (is_init === false)
            return false;

        return coyote_bee;
    };

    this.on = function(event_name, event_handler)
    {
        if (is_init === false)
            return false;

        return coyote_bee.on(event_name, event_handler);
    };

    this.run = function()
    {
        if (is_init === false)
            return false;

        return coyote_bee.run();
    };

    this.quit = function()
    {
        if (is_init === false)
            return false;

        return coyote_bee.close();
    };

    this.error = function()
    {
        if (is_init === false)
            return false;

        return coyote_bee.error;
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
        config.pages[0] = init_url;

        nature.theme([config.id]);
        nature.apply('new');

        infinity.init();

        // Declare bee's settings
        coyote_bee.init(config.id);
        coyote_bee.settings.data.window.labels.title('Coyote');
        coyote_bee.settings.data.window.labels.status_bar('Howling under the Internet moon light...');
        coyote_bee.settings.data.casement.labels.title('Tools');
        coyote_bee.settings.data.casement.labels.status('Feel the power of meta-integration.');
        coyote_bee.settings.general.resizable(true);
        coyote_bee.settings.general.casement_width(50);
        coyote_bee.settings.general.allowed_instances(1);
        coyote_bee.gui.position.left(70);
        coyote_bee.gui.position.top(10);
        coyote_bee.gui.size.width(1024);
        coyote_bee.gui.size.height(720);
        coyote_bee.gui.size.min.width(960);
        coyote_bee.gui.size.min.height(680);
        coyote_bee.gui.size.max.width(1920);
        coyote_bee.gui.size.max.height(1080);
        coyote_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        coyote_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        coyote_bee.on('open', function() { coyote_bee.gui.fx.fade.into(); });
        coyote_bee.on('opened', function() { utils_int.gui_init(); });
        coyote_bee.on('dragging', function()
                                  {
                                      coyote_bee.gui.fx.opacity.settings.set(0.7);
                                      coyote_bee.gui.fx.opacity.apply();
                                  });
        coyote_bee.on('dragged', function()
                                 {
                                     coyote_bee.gui.fx.opacity.reset();
                                 });
        coyote_bee.on('resizing', function()
                                  {
                                      utils_int.browser_frame_size();

                                      if (!is_browser_loading)
                                      {
                                            infinity.begin();

                                            browser_frame.style.visibility = 'hidden';
                                      }
                                  });
        coyote_bee.on('resized', function()
                                 {
                                    var browser_frame_width = utils_sys.graphics.pixels_value(browser_frame.style.width),
                                        browser_frame_height = utils_sys.graphics.pixels_value(browser_frame.style.height);

                                    if (hb_manager !== null && browser_frame_height !== false)
                                    {
                                        hb_manager.resize(browser_frame_width, browser_frame_height);

                                        if (is_browser_loading)
                                            return;

                                        browser_frame.style.visibility = 'visible';

                                        setTimeout(function() { infinity.end(); }, 200);
                                    }
                                 });
        coyote_bee.on('close', function()
                               {
                                    browser_frame.innerHTML = '';

                                    document.body.removeChild(coyote_fs_layer);

                                    ping_timer.stop();

                                    hb_manager.destroy();

                                    coyote_bee.gui.fx.fade.out();
                               });

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        morpheus = matrix.get('morpheus');
        nature = matrix.get('nature');
        infinity = dev_box.get('infinity');

        return true;
    };

    var is_init = false,
        is_browser_loading = true,
        cosmos = null,
        matrix = null,
        dev_box = null,
        morpheus = null,
        nature = null,
        infinity = null,
        coyote_bee = null,
        coyote_bee_id = null,
        browser_address_box = null,
        browser_frame = null,
        coyote_fs_layer = null,
        hb_manager = null,
        init_url = 'https://www.bing.com/?setlang=en&cc=gb',
        utils_sys = new vulcan(),
        ajax = new taurus(),
        ping_timer = new stopwatch(),
        config = new config_model(),
        utils_int = new utilities();

    this.browser_controls = new browser_ctrl();
}
