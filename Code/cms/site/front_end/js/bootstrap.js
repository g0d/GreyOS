/*

    GreyOS Inc. - Bootstrap for GreyOS
    
    File name: bootstrap.js (Version: 2.5)
    Description: This file contains the Bootstrap - GreyOS bootstrapper utility.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// e-cosystem
(function()
{

    // Initialize Boo
    boo.start();

    // Bootstrap scenario
    var my_scenario = new scenario();

    // Main script
    var main_script = function()
    {

        // Utilities
        var my_vulcan = new vulcan();

        // Containers
        var my_multiverse = new multiverse();
        var my_cosmos = new cosmos();
        var my_sand_box = new sand_box();
        var my_matrix = new matrix();
        var my_dev_box = new dev_box();
        var my_app_box = new app_box();

        // Services
        var prime_pythia = new pythia();
        var prime_owl = new owl();
        var prime_centurion = new centurion();
        var prime_snail = new snail();
        var prime_parallel = new parallel();
        var prime_aether = new aether();
        var prime_nature = new nature();
        var prime_eagle = new eagle();
        var prime_tik_tok = new tik_tok();
        var prime_max_screen = new max_screen();
        var prime_colony = new colony();
        var prime_forest = new forest();
        var prime_swarm = new swarm();
        var prime_hive = new hive();
        var prime_ui_controls = new ui_controls();
        var prime_dock = new dock();

        // Containers
        var my_plugs = [my_vulcan, my_sand_box, my_matrix, my_dev_box, my_app_box];

        // Initialize Multiverse and Cosmos
        my_multiverse.init(my_vulcan);
        my_cosmos.init(my_vulcan);

        // Push Cosmos to Multiverse
        my_multiverse.push([my_cosmos]);

        // Attach plugs to Cosmos and run
        my_cosmos.hub.attach(my_plugs);
        my_cosmos.run();

        // Matrix - System services container
        my_matrix.push([prime_pythia, prime_owl, prime_centurion, prime_snail, prime_parallel, prime_aether, 
                        prime_nature, prime_eagle, prime_tik_tok, prime_max_screen, 
                        prime_colony, prime_forest, prime_swarm, prime_hive, prime_ui_controls, prime_dock]);

        // Dev Box - Development tools container
        my_dev_box.push([fx, sketch_pad, parrot, infinity, scrollbar, bee]);

        // App Box - Integrated/User Applications container
        my_app_box.push([coyote, greyos_mail, i_fb, i_twitter, i_disqus, i_youtube, i_linkedin, radio_dude]);

        function Profile_Pop_Up()
        {

            if (document.getElementById('user_profile_pop_up').style.display === 'block')
                document.getElementById('user_profile_pop_up').style.display = 'none';

            else
                document.getElementById('user_profile_pop_up').style.display = 'block';

            return true;

        }

        function desktop()
        {

            prime_tik_tok.init('clock');
            prime_forest.init('desktop');
            prime_swarm.init('desktop', 47, 100, window.innerWidth - 70, window.innerHeight - 120);
            prime_hive.init('desktop', 47, window.innerHeight - 87, 8, 10);

            prime_swarm.bees.show();
            prime_hive.stack.bees.show();

            // Initialiaze UI Control
            prime_ui_controls.init();

            // Initiliaze Dock
            prime_dock.init();

            return true;

        }

        function jquery_helpers()
        {

            scroll_bar_fix('forest_cat_list');

            $("ul.expanded").hide();

            //    $('.cat > a').click(function(e){
            //        $(this).toggleClass("active");
            //        $("ul.expanded").toggle();
            //        e.preventDefault();
            //    });
            //
            //    $("ul.expanded ul").hide();
            //    $('ul.expanded li a').click(function(e){
            //        $(this).toggleClass("expanded");
            //        $("ul.expanded ul").toggle();
            //        e.preventDefault();
            //    });

            $('#notifications_list').mCustomScrollbar({ autoDraggerLength: false });
            $('#user_profile_pop_up').css('display', 'none');
            $('#user_profile_pop_up').css('right', '35px');

            $('.stack_bar').carouFredSel({
                circular: false,
                infinite: false,
                auto: false,
                prev: { button: '.stack_arrow.left_arrow',
                        onAfter: function(event) { prime_hive.settings.set_stack_view(event, '-', false); }
                      },
                next: { button: '.stack_arrow.right_arrow',
                        onAfter: function(event) { prime_hive.settings.set_stack_view(event, '+', false); }
                      },
                swipe: true,
                mousewheel: true,
                scroll: { duration: 250 }
            });

            return true;

        }

        function init_all()
        {

            // Calculate Snail index
            prime_snail.run(10000000);

            // Initialize Aether
            prime_aether.init();

            // Initialize Eagle
            prime_eagle.init(16, 9);

            var user_profile = document.getElementById('user_profile');

            if (user_profile)
                user_profile.addEventListener('click', Profile_Pop_Up, false);

            setTimeout(function() { desktop(); }, 1500);
            setTimeout(function() { jquery_helpers(); }, 2000);

            Banana();

            console.log(new bee());
            setTimeout(function() { console.log('Snail index: ' + prime_snail.index()); }, 5000);

            return true;

        }

        function init_environment()
        {

            document.body.addEventListener('touchmove', function(event) { event.preventDefault(); }, false);
            // document.addEventListener('contextmenu', function(event){ event.preventDefault(); }, false);

            init_all();

            return true;

        }

        window.onload = function() { init_environment(); };

    };

    // Push scripts in Scenario and execute them
    my_scenario.push([main_script]);
    my_scenario.exec();

    // Terminate Boo
    setTimeout(function() { boo.stop(); }, 3000);

})();
