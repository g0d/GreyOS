/*
    GreyOS - Bootstrap facility (Version: 4.0)

    File name: boot.js
    Description: This file contains the bootstrap facility.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Parse JS always in strict mode
"use strict";

// GreyOS - Bootstrap script
function boot_script()
{
    // GreyOS
    var greyos = new meta_os();

    // Initialize required OS infrastructure for this script
    var os_boot = greyos.boot.start();
    var os_loader = greyos.boot.loader();
    var os_environment = greyos.boot.environment();
    var os_hypervisor = greyos.system.hypervisor.console();
    var os_vm = greyos.system.hypervisor.vm();
    var os_keys = greyos.system.io.keyboard();
    var os_timers = greyos.system.timers();
    var os_utils = greyos.utilities.general();
    var os_benchmark = greyos.utilities.benchmark();
    var os_settings = greyos.settings();

    // Set global settings
    os_settings.set('boot_mode', 0);                // Boot modes: Normal (0) / Development (1)
    os_settings.set('name', 'GreyOS');              // Meta-OS name
    os_settings.set('version', '4.5 (alpha)');      // Meta-OS version
    os_settings.set('theme', 'morph');              // Themes: 'bubble_gum', 'tomorrow', 'morph'
    os_settings.set('max_apps', 50);                // Maximum number of allowed active apps per session
    os_settings.set('max_services', 100)            // Maximum number of allowed active services per session
    os_settings.set('apps_per_view', 10);           // Apps per stack bar view (This is buggy / Stackbar tries to resize automatically but usually fails)
    os_settings.set('stack_bars', 4);               // Number of stack bars

    // Initialization script
    var init_script = function()
    {
        // List of containers
        var containers_list = [dev_box, app_box, svc_box, matrix, colony, roost];

        // List of development tools
        var dev_tools = [bee, bat, meta_program_config, meta_script, meta_executor, infinity, scrollbar];

        // List of system components
        var sys_components = [xenon, morpheus, x_runner, panda, xgc, owl, uniplex, teal_fs, 
                              octopus, parrot, super_tray, swarm, hive, forest, ui_controls, dock, 
                              user_profile, tik_tok, eagle, nature, chameleon];

        // List of applications
        var apps = [trinity, krator, coyote, radio_dude, cloud_edit, i_bassoon, i_youdj, i_audiomass, i_soundtrap, 
                    i_ampedstudio, i_vectorink, i_ganttio, i_quakejs, i_mariojs, i_swooop, i_webgl_preview];

        // List of services
        var svcs = [];

        // Add a VM to the hypervisor
        os_hypervisor.add([os_vm]);

        // Attach containers to the VM
        os_vm.hub.attach(containers_list);

        /* ================= Populate containers ================= */

        // Dev Box - Development tools container
        var dev_box_container = os_vm.hub.access('dev_box');

        // Add development tools in the container
        dev_box_container.add(dev_tools);

        //console.log(dev_box_container.list());

        // Matrix - System components container
        var matrix_container = os_vm.hub.access('matrix');

        // Register (put) components in the container
        matrix_container.register(sys_components);

        //console.log(matrix_container.list());

        // App Box - Applications container
        var app_box_container = os_vm.hub.access('app_box');

        // Add applications in the container
        app_box_container.add(apps);

        //console.log(app_box_container.list());

        // Svc Box - Services container
        var svc_box_container = os_vm.hub.access('svc_box');

        // Add services in the container
        svc_box_container.add(svcs);

        //console.log(svc_box_container.list());

        // Colony - Bee keeper container
        var bees_container = os_vm.hub.access('colony');

        // Set maximum allowed active apps (bees) per session
        bees_container.max(os_settings.get('max_apps'));

        //console.log(bees_container.list());

        // Roost - Bat keeper container
        var bats_container = os_vm.hub.access('roost');

        // Set maximum allowed active services (bats) per session
        bats_container.max(os_settings.get('max_services'));

        //console.log(bats_container.list());

        /* ======================================================= */

        function auth_verification()
        {
            var data = 'gate=auth&mode=status';
    
            ajax_factory('post', data, function()
                                       {
                                            load_desktop_ui();
                                       },
                                       function()
                                       {
                                            load_login_ui();
                                       },
                                       function()
                                       {
                                            // Nothing...
                                       });

            return true;
        }

        function load_login_ui()
        {
            // Iniatilaze loading screen
            var load_screen = new loading_screen();

            // Show the loading screen while everything is loading
            load_screen.show();

            // Load basic components and UI infrastructure
            var new_xenon = matrix_container.get('xenon');
            var new_parrot = matrix_container.get('parrot');
            var new_tik_tok = matrix_container.get('tik_tok');
            var new_chameleon = matrix_container.get('chameleon');
            var new_nature = matrix_container.get('nature');
            var new_swarm = matrix_container.get('swarm');

            // Preload MsgBox
            var new_msgbox = new msgbox();

            // Initialize MsgBox
            new_msgbox.init('desktop');

            // Set the theme in use
            new_chameleon.set(os_settings.get('theme'));

            // Preload (cache) Bee theme for better graphics performance on load
            new_nature.themes.store('bee');
            new_nature.apply('new');

            // Apply desktop theme
            os_utils.graphics.apply_theme('/site/themes/' + new_chameleon.get(), new_chameleon.get());

            // Store dynamic system settings
            new_xenon.store({
                                "os_name"       :   os_settings.get('name'),
                                "os_version"    :   os_settings.get('version'),
                                "max_apps"      :   os_settings.get('max_apps'),
                                "max_services"  :   os_settings.get('max_services')
                            });

            // Initialize only the sound service (no UI)
            new_parrot.init();

            // Initialize the system clock
            new_tik_tok.init('clock');

            // Initialize desktop module
            new_swarm.init('desktop', 11, 101, window.innerWidth - 26, window.innerHeight - 120);

            // Show login/register windows
            run_krator_app();

            // Hide the loading screen when all has been loaded (Give also a buffer time for delayed rendering)
            setTimeout(function()
            {
                // Play the splash screen sound
                new_parrot.play('sys', '/site/themes/' + new_chameleon.get() + '/sounds/splash_fresh.mp3');

                load_screen.hide();
            }, 3000);

            return true;
        }

        function run_krator_app()
        {
            var cc_reload = new f5();
            var new_msgbox = new msgbox();
            var krator_app = app_box_container.get('krator');

            if (!krator_app.init(login_success_callback))
            {
                new_msgbox.init('desktop');
                new_msgbox.show(os_settings.get('name'), 'A system error occurred. ' + os_settings.get('name') + ' will be reloaded!', 
                                new_msgbox.types.OK, [() => { cc_reload.init(); }]);

                return false;
            }

            krator_app.run();

            return true;
        }

        function login_success_callback()
        {
            // Iniatilaze loading screen
            var load_screen = new loading_screen();

            // Show the loading screen while everything is loading
            load_screen.show();

            // Remove Krator theme
            matrix_container.get('nature').themes.clear('krator');

            // Load the full dektop UI infrastructure
            matrix_container.get('ui_controls').init('action_icons');
            matrix_container.get('dock').init('favorite_apps');
            matrix_container.get('user_profile').init('user_profile');
            matrix_container.get('forest').init('desktop');
            matrix_container.get('swarm').reset('desktop', 44, 101, window.innerWidth - 60, window.innerHeight - 118);
            matrix_container.get('hive').init('desktop', 44, window.innerHeight - 85, os_settings.get('apps_per_view'), os_settings.get('stack_bars'));
            matrix_container.get('eagle').init('desktop');
            matrix_container.get('octopus').init('device_manager');
            matrix_container.get('super_tray').init('services_tray');
            matrix_container.get('parrot').load('audio');
            matrix_container.get('xgc').init();

            // Show preloaded or saved bees (apps)
            matrix_container.get('swarm').bees.show();
            matrix_container.get('hive').stack.bees.show();

            // Load Banana (User suggestions widget)
            //Banana();

            // Hide the loading screen when all has been loaded (Give also a buffer time for delayed rendering)
            setTimeout(function()
            {
                // Play the login sound
                matrix_container.get('parrot').play('sys', '/site/themes/' + os_settings.get('theme') + '/sounds/login_fresh.mp3');

                load_screen.hide();
            }, 3000);
        }

        function load_desktop_ui()
        {
            // Iniatilaze loading screen
            var load_screen = new loading_screen();

            // Show the loading screen while everything is loading
            load_screen.show();

            // Load all components and full UI infrastructure
            var new_xenon = matrix_container.get('xenon');
            var new_octopus = matrix_container.get('octopus');
            var new_super_tray = matrix_container.get('super_tray');
            var new_parrot = matrix_container.get('parrot');
            var new_xgc = matrix_container.get('xgc');
            var new_chameleon = matrix_container.get('chameleon');
            var new_nature = matrix_container.get('nature');
            var new_ui_controls = matrix_container.get('ui_controls');
            var new_dock = matrix_container.get('dock');
            var new_user_profile = matrix_container.get('user_profile');
            var new_forest = matrix_container.get('forest');
            var new_swarm = matrix_container.get('swarm');
            var new_hive = matrix_container.get('hive');
            var new_eagle = matrix_container.get('eagle');
            var new_tik_tok = matrix_container.get('tik_tok');

            // Preload MsgBox
            var new_msgbox = new msgbox();

            // Initialize MsgBox
            new_msgbox.init('desktop');

            // Set the theme in use
            new_chameleon.set(os_settings.get('theme'));

            // Preload (cache) Bee theme for better graphics performance on load
            new_nature.themes.store('bee');
            new_nature.apply('new');

            // Apply desktop theme
            os_utils.graphics.apply_theme('/site/themes/' + new_chameleon.get(), new_chameleon.get());

            // Store dynamic system settings
            new_xenon.store({
                                "os_name"       :   os_settings.get('name'),
                                "os_version"    :   os_settings.get('version'),
                                "max_apps"      :   os_settings.get('max_apps'),
                                "max_services"  :   os_settings.get('max_services')
                            });

            // Initialize the desktop UI
            new_ui_controls.init('action_icons');
            new_dock.init('favorite_apps');
            new_user_profile.init('user_profile');
            new_forest.init('desktop');
            new_swarm.init('desktop', 44, 101, window.innerWidth - 60, window.innerHeight - 118);
            new_hive.init('desktop', 44, window.innerHeight - 85, os_settings.get('apps_per_view'), os_settings.get('stack_bars'));
            new_eagle.init('desktop');
            new_tik_tok.init('clock');
            new_octopus.init('device_manager');
            new_super_tray.init('services_tray');
            new_parrot.init('audio');
            new_xgc.init();

            // Show preloaded or saved bees (apps)
            new_swarm.bees.show();
            new_hive.stack.bees.show();

            // Load Banana (User suggestions widget)
            //Banana();

            // Hide the loading screen when all has been loaded (Give also a buffer time for delayed rendering)
            setTimeout(function()
            {
                // Play the login sound
                new_parrot.play('sys', '/site/themes/' + new_chameleon.get() + '/sounds/login_fresh.mp3');

                load_screen.hide();
            }, 3000);

            return true;
        }

        function init_environment()
        {
            var cc_reload = new f5();
            var new_msgbox = new msgbox();

            // Initialize MsgBox
            new_msgbox.init('desktop');

            os_utils.events.attach('greyos', document, 'keydown', 
            function(event) 
            {
                os_keys.scan(event);

                if (os_keys.get() === 112 || os_keys.get() === 114 || os_keys.get() === 115 || 
                    os_keys.get() === 116 || os_keys.get() === 117 || os_keys.get() === 118 || 
                    os_keys.get() === 119)
                    event.preventDefault();

                if (event.ctrlKey === true && 
                    (os_keys.get() === 82 || os_keys.get() === 68 || os_keys.get() === 79 || os_keys.get() === 80 || 
                     os_keys.get() === 83 || os_keys.get() === 70 || os_keys.get() === 71 || os_keys.get() === 72 || 
                     os_keys.get() === 74 || os_keys.get() === 75 || os_keys.get() === 84 || os_keys.get() === 87 || 
                     os_keys.get() === 85 || os_keys.get() === 78 || os_keys.get() === 69))
                    event.preventDefault();

                if (event.altKey === true && (os_keys.get() === 68 || os_keys.get() === 69 || os_keys.get() === 70))
                    event.preventDefault();
            });
            os_utils.events.attach('greyos', document, 'contextmenu', function(event){ event.preventDefault(); });
            os_utils.events.attach('greyos', document, 'mousedown', function(event)
                                                                    {
                                                                        if (event.buttons === 4)
                                                                            event.preventDefault();
                                                                    });
            //document.body.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);

            var meta_description = os_utils.objects.selectors.first('meta[name="description"]').content;

            meta_description = meta_description.replace('{os_name}', os_settings.get('name'));

            os_utils.objects.selectors.first('meta[name="description"]').content = meta_description;
            os_utils.objects.by_id('version').innerHTML = os_settings.get('version');

            //navigator.geolocation.getCurrentPosition(function(pos) { console.log(pos); }, 
            //                                         function(error) { console.log(error); }, 
            //                                         { enableHighAccuracy: true, timeout: 5000 });

            var greyos_logo_art = `



            GGGGGGGGGGGGG                                                                    OOOOOOOOO        SSSSSSSSSSSSSSS
         GGG::::::::::::G                                                                  OO:::::::::OO    SS:::::::::::::::S
       GG:::::::::::::::G                                                                OO:::::::::::::OO S:::::SSSSSS::::::S
      G:::::GGGGGGGG::::G                                                               O:::::::OOO:::::::OS:::::S     SSSSSSS
     G:::::G       GGGGGGrrrrr   rrrrrrrrr       eeeeeeeeeeee  yyyyyyy           yyyyyyyO::::::O   O::::::OS:::::S            
    G:::::G              r::::rrr:::::::::r    ee::::::::::::ee y:::::y         y:::::y O:::::O     O:::::OS:::::S            
    G:::::G              r:::::::::::::::::r  e::::::eeeee:::::eey:::::y       y:::::y  O:::::O     O:::::O S::::SSSS         
    G:::::G    GGGGGGGGGGrr::::::rrrrr::::::re::::::e     e:::::e y:::::y     y:::::y   O:::::O     O:::::O  SS::::::SSSSS    
    G:::::G    G::::::::G r:::::r     r:::::re:::::::eeeee::::::e  y:::::y   y:::::y    O:::::O     O:::::O    SSS::::::::SS  
    G:::::G    GGGGG::::G r:::::r     rrrrrrre:::::::::::::::::e    y:::::y y:::::y     O:::::O     O:::::O       SSSSSS::::S 
    G:::::G        G::::G r:::::r            e::::::eeeeeeeeeee      y:::::y:::::y      O:::::O     O:::::O            S:::::S
     G:::::G       G::::G r:::::r            e:::::::e                y:::::::::y       O::::::O   O::::::O            S:::::S
      G:::::GGGGGGGG::::G r:::::r            e::::::::e                y:::::::y        O:::::::OOO:::::::OSSSSSSS     S:::::S
       GG:::::::::::::::G r:::::r             e::::::::eeeeeeee         y:::::y          OO:::::::::::::OO S::::::SSSSSS:::::S
         GGG::::::GGG:::G r:::::r              ee:::::::::::::e        y:::::y             OO:::::::::OO   S:::::::::::::::SS 
            GGGGGG   GGGG rrrrrrr                eeeeeeeeeeeeee       y:::::y                OOOOOOOOO      SSSSSSSSSSSSSSS   
                                                                     y:::::y                                                  
                                                                    y:::::y                                                   
                                                                   y:::::y                                                    
                                                                  y:::::y                                                     
                                                                 yyyyyyy                                  Version: ` + os_settings.get('version') + `



            `;

            console.log('%c ' + greyos_logo_art, 'color: #A0A0A0;');

            // Calculate speed index
            os_benchmark.test(10000000);

            // Wait for 5 seconds and then print the result
            os_timers.start(5000, function()
                                  {
                                      var speed_index = 100 - os_benchmark.index();

                                      console.log('Browser speed quality: ' + speed_index + '%');
                                  }, true);

            if (window.innerWidth !== screen.width || window.innerHeight !== screen.height)
            {
                new_msgbox.show(os_settings.get('name'), 'Your active screen is small.<br>For better results, ' + 
                                os_settings.get('name') + ' will now go fullscreen!', 
                new_msgbox.types.OK, [() =>
                {
                    document.documentElement.requestFullscreen(); auth_verification();

                    setTimeout(function()
                    {
                        os_utils.events.attach('greyos', window, 'resize', 
                        function()
                        {
                            var new_msgbox = new msgbox();

                            new_msgbox.init('desktop');
                            /*
                            new_msgbox.show(os_settings.get('name'), 'Screen size changed. ' + os_settings.get('name') + 
                                            ' will now reload to the new dimensions!', 
                                            new_msgbox.types.OK, [() => { cc_reload.init(); }]);
                            */
                            new_msgbox.show(os_settings.get('name'), 'Screen size changed. ' + 
                                            os_settings.get('name') + ' will now reload!',
                            new_msgbox.types.OK, [() => { cc_reload.init(); }]);
                        });
                    }, 1000);
                }]);
            }
            else
                auth_verification();

            return true;
        }

        init_environment();
    };

    // Initialization script (Development)
    var init_script_dev = function()
    {
        // List of containers
        var containers_list = [dev_box, app_box, svc_box, matrix, colony, roost];

        // List of development tools
        var dev_tools = [bee, bat, meta_program_config, meta_script, meta_executor, infinity, scrollbar];

        // List of system components
        var sys_components = [xenon, morpheus, x_runner, panda, xgc, owl, uniplex, teal_fs, 
                              octopus, parrot, super_tray, swarm, hive, forest, ui_controls, dock, 
                              user_profile, tik_tok, eagle, nature, chameleon];

        // List of applications
        var apps = [trinity, krator, coyote, radio_dude, cloud_edit, i_bassoon, i_youdj, i_audiomass, i_soundtrap, 
                    i_ampedstudio, i_vectorink, i_ganttio, i_quakejs, i_mariojs, i_swooop, i_webgl_preview];

        // List of services
        var svcs = [];

        // Add a VM to the hypervisor
        //os_hypervisor.backtrace(true);
        os_hypervisor.add([os_vm]);

        // Attach containers to the VM
        //os_vm.backtrace(true);
        os_vm.hub.attach(containers_list);

        /* ================= Populate containers ================= */

        // Dev Box - Development tools container
        var dev_box_container = os_vm.hub.access('dev_box');

        // Add development tools in the container
        //dev_box_container.backtrace(true);
        dev_box_container.add(dev_tools);

        //console.log(dev_box_container.list());

        // Matrix - System components container
        var matrix_container = os_vm.hub.access('matrix');

        // Register (put) components in the container
        //matrix_container.backtrace(true);
        matrix_container.register(sys_components);

        //console.log(matrix_container.list());

        // App Box - Integrated applications container
        var app_box_container = os_vm.hub.access('app_box');

        // Add applications in the container
        //app_box_container.backtrace(true);
        app_box_container.add(apps);

        //console.log(app_box_container.list());

        // Svc Box - Services container
        var svc_box_container = os_vm.hub.access('svc_box');

        // Add services in the container
        svc_box_container.add(svcs);

        //console.log(svc_box_container.list());

        // Colony - Bee keeper container
        var bees_container = os_vm.hub.access('colony');

        // Set maximum allowed active apps (bees) per session
        //bees_container.backtrace(true);
        bees_container.max(os_settings.get('max_apps'));

        //console.log(bees_container.list());

        // Roost - Bat keeper container
        var bats_container = os_vm.hub.access('roost');

        // Set maximum allowed active services (bats) per session
        bats_container.max(os_settings.get('max_services'));

        //console.log(bats_container.list());

        /* ======================================================= */

        function load_full_desktop_ui()
        {
            // Iniatilaze loading screen
            var load_screen = new loading_screen();

            // Show the loading screen while everything is loading
            load_screen.show();

            // Load all components and full UI infrastructure
            var new_xenon = matrix_container.get('xenon');
            var new_ui_controls = matrix_container.get('ui_controls');
            var new_dock = matrix_container.get('dock');
            var new_user_profile = matrix_container.get('user_profile');
            var new_forest = matrix_container.get('forest');
            var new_swarm = matrix_container.get('swarm');
            var new_hive = matrix_container.get('hive');
            var new_eagle = matrix_container.get('eagle');
            var new_tik_tok = matrix_container.get('tik_tok');
            var new_octopus = matrix_container.get('octopus');
            var new_super_tray = matrix_container.get('super_tray');
            var new_parrot = matrix_container.get('parrot');
            var new_xgc = matrix_container.get('xgc');
            var new_chameleon = matrix_container.get('chameleon');
            var new_nature = matrix_container.get('nature');

            // Preload MsgBox
            var new_msgbox = new msgbox();

            // Initialize MsgBox
            new_msgbox.init('desktop');

            // Set the theme in use
            new_chameleon.set(os_settings.get('theme'));

            // Preload (cache) Bee theme for better graphics performance on load
            new_nature.themes.store('bee');
            new_nature.apply('new');

            // Apply desktop theme
            os_utils.graphics.apply_theme('/site/themes/' + new_chameleon.get(), new_chameleon.get());

            // Store dynamic system settings
            new_xenon.store({
                                "os_name"       :   os_settings.get('name'),
                                "os_version"    :   os_settings.get('version'),
                                "max_apps"      :   os_settings.get('max_apps'),
                                "max_services"  :   os_settings.get('max_services')
                            });

            // Initialize the desktop UI
            new_ui_controls.init('action_icons');
            new_dock.init('favorite_apps');
            new_user_profile.init('user_profile');
            //new_forest.init('desktop');
            new_swarm.init('desktop', 44, 101, window.innerWidth - 60, window.innerHeight - 118);
            //new_hive.init('desktop', 44, window.innerHeight - 85, os_settings.get('apps_per_view'), os_settings.get('stack_bars'));
            new_eagle.init('desktop');
            new_tik_tok.init('clock');
            new_octopus.init('device_manager');
            new_super_tray.init('services_tray');
            new_parrot.init('audio');
            new_xgc.init(true);

            // Show preloaded or saved bees (apps)
            new_swarm.bees.show();
            new_hive.stack.bees.show();

            // Load Banana (User suggestions widget)
            //Banana();

            // Hide the loading screen when all has been loaded (Give also a buffer time for delayed rendering)
            setTimeout(function()
            {
                // Play the login sound
                new_parrot.play('sys', '/site/themes/' + new_chameleon.get() + '/sounds/login_fresh.mp3');

                load_screen.hide();
            }, 3000);

            return true;
        }

        function init_environment()
        {
            var cc_reload = new f5();
            var new_msgbox = new msgbox();

            // Initialize MsgBox
            new_msgbox.init('desktop');

            os_utils.events.attach('greyos', window, 'resize', 
            function()
            {
                /*
                new_msgbox.show(os_settings.get('name'), 'Screen size changed. ' + os_settings.get('name') + 
                                ' will now reload to the new dimensions!', 
                                new_msgbox.types.OK, [() => { cc_reload.init(); }]);
                */
                new_msgbox.show(os_settings.get('name'), 'Screen size changed. You may have to reload so that the interface adapts to the new dimensions!');
            });

            os_utils.events.attach('greyos', document, 'keydown', 
            function(event) 
            {
                os_keys.scan(event);

                if (os_keys.get() === 112 || os_keys.get() === 114 || os_keys.get() === 115 || 
                    os_keys.get() === 116 || os_keys.get() === 117 || os_keys.get() === 118 || 
                    os_keys.get() === 119)
                    event.preventDefault();

                if (event.ctrlKey === true && os_keys.get() === 82)
                    cc_reload.init();

                if (event.ctrlKey === true && 
                    (os_keys.get() === 68 || os_keys.get() === 79 || os_keys.get() === 80 || os_keys.get() === 83 || 
                     os_keys.get() === 70 || os_keys.get() === 71 || os_keys.get() === 72 || os_keys.get() === 74 || 
                     os_keys.get() === 75 || os_keys.get() === 84 || os_keys.get() === 87 || os_keys.get() === 85 || 
                     os_keys.get() === 78 || os_keys.get() === 69))
                    event.preventDefault();

                if (event.altKey === true && (os_keys.get() === 68 || os_keys.get() === 69 || os_keys.get() === 70))
                    event.preventDefault();
            });
            os_utils.events.attach('greyos', document, 'contextmenu', function(event){ event.preventDefault(); });
            os_utils.events.attach('greyos', document, 'mousedown', function(event)
                                                                    {
                                                                        if (event.buttons === 4)
                                                                            event.preventDefault();
                                                                    });
            //document.body.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);

            var meta_description = os_utils.objects.selectors.first('meta[name="description"]').content;

            meta_description = meta_description.replace('{os_name}', os_settings.get('name'));

            os_utils.objects.selectors.first('meta[name="description"]').content = meta_description;
            os_utils.objects.by_id('version').innerHTML = os_settings.get('version');

            var greyos_logo_art = `



            GGGGGGGGGGGGG                                                                    OOOOOOOOO        SSSSSSSSSSSSSSS
         GGG::::::::::::G                         [DEV MODE]                               OO:::::::::OO    SS:::::::::::::::S
       GG:::::::::::::::G                                                                OO:::::::::::::OO S:::::SSSSSS::::::S
      G:::::GGGGGGGG::::G                                                               O:::::::OOO:::::::OS:::::S     SSSSSSS
     G:::::G       GGGGGGrrrrr   rrrrrrrrr       eeeeeeeeeeee  yyyyyyy           yyyyyyyO::::::O   O::::::OS:::::S            
    G:::::G              r::::rrr:::::::::r    ee::::::::::::ee y:::::y         y:::::y O:::::O     O:::::OS:::::S            
    G:::::G              r:::::::::::::::::r  e::::::eeeee:::::eey:::::y       y:::::y  O:::::O     O:::::O S::::SSSS         
    G:::::G    GGGGGGGGGGrr::::::rrrrr::::::re::::::e     e:::::e y:::::y     y:::::y   O:::::O     O:::::O  SS::::::SSSSS    
    G:::::G    G::::::::G r:::::r     r:::::re:::::::eeeee::::::e  y:::::y   y:::::y    O:::::O     O:::::O    SSS::::::::SS  
    G:::::G    GGGGG::::G r:::::r     rrrrrrre:::::::::::::::::e    y:::::y y:::::y     O:::::O     O:::::O       SSSSSS::::S 
    G:::::G        G::::G r:::::r            e::::::eeeeeeeeeee      y:::::y:::::y      O:::::O     O:::::O            S:::::S
     G:::::G       G::::G r:::::r            e:::::::e                y:::::::::y       O::::::O   O::::::O            S:::::S
      G:::::GGGGGGGG::::G r:::::r            e::::::::e                y:::::::y        O:::::::OOO:::::::OSSSSSSS     S:::::S
       GG:::::::::::::::G r:::::r             e::::::::eeeeeeee         y:::::y          OO:::::::::::::OO S::::::SSSSSS:::::S
         GGG::::::GGG:::G r:::::r              ee:::::::::::::e        y:::::y             OO:::::::::OO   S:::::::::::::::SS 
            GGGGGG   GGGG rrrrrrr                eeeeeeeeeeeeee       y:::::y                OOOOOOOOO      SSSSSSSSSSSSSSS   
                                                                     y:::::y                                                  
                                                                    y:::::y                                                   
                                                                   y:::::y                                                    
                                                                  y:::::y                                                     
                                                                 yyyyyyy                                  Version: ` + os_settings.get('version') + `



            `;

            console.log('%c ' + greyos_logo_art, 'color: #A0A0A0;');

            // Calculate speed index
            os_benchmark.test(10000000);

            // Wait for 5 seconds and then print the result
            os_timers.start(5000, function()
                                  {
                                      var speed_index = 100 - os_benchmark.index();

                                      console.log('Browser speed quality: ' + speed_index + '%');
                                  }, true);

            if (window.innerWidth !== screen.width || window.innerHeight !== screen.height)
            {
                new_msgbox.show(os_settings.get('name'), 'Your active screen is small.<br>For better results, ' + 
                                os_settings.get('name') + ' will now go fullscreen!', 
                new_msgbox.types.OK, [() =>
                {
                    document.documentElement.requestFullscreen(); load_full_desktop_ui();

                    setTimeout(function()
                    {
                        os_utils.events.attach('greyos', window, 'resize', 
                        function()
                        {
                            var new_msgbox = new msgbox();

                            new_msgbox.init('desktop');
                            /*
                            new_msgbox.show(os_settings.get('name'), 'Screen size changed. ' + os_settings.get('name') + ' will now reload to the new dimensions!', 
                                            new_msgbox.types.OK, [() => { cc_reload.init(); }]);
                            */
                            new_msgbox.show(os_settings.get('name'), 'Screen size changed. ' + 
                                            os_settings.get('name') + ' will now reload!',
                            new_msgbox.types.OK, [() => { cc_reload.init(); }]);
                        });
                    }, 1000);
                }]);
            }
            else
                load_full_desktop_ui();

            return true;
        }

        init_environment();
    };

    function check_system_compatibility()
    {
        if (!os_boot.init())
            return false;

        if (os_environment)
            os_environment.init();

        //os_loader.backtrace(true);
        os_loader.use([init_script, init_script_dev]);
        os_loader.execute([os_settings.get('boot_mode')]);

        return true;
    }

    check_system_compatibility();
}

// Boot loader
ultron(boot_script);
