/*
    GreyOS - iBassoon (Version: 1.0)

    File name: i_bassoon.js
    Description: This file contains the iBassoon - DAW application.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// iBassoon (3rd-party integrated DAW app)
function i_bassoon()
{
    var self = this;

    function config_model()
    {
        this.id = null;
        this.content = null;
    }

    function utilities()
    {
        var me = this;

        this.gui_init = function()
        {
            var __data_content_id = i_bassoon_bee.settings.general.id() + '_data';

            infinity.setup(__data_content_id);
            infinity.begin();

            me.draw();
            me.attach_events();

            infinity.end();

            return true;
        };

        this.draw = function()
        {
            config.content = '<div class="' + config.id + '">\
                                 <div id="' + i_bassoon_bee.settings.general.id() + '_overlay" class="overlay"></div>\
                                 <iframe title="Bassoon" src="https://www.stef.be/bassoontracker/?file=demomods%2Fspacedeb.mod"></iframe>\
                              </div>';

            i_bassoon_bee.settings.data.window.content(config.content);

            return true;
        };

        this.attach_events = function()
        {
            //var __my_object = utils_sys.objects.by_id('my_content');

            //utils_sys.events.attach(config.id, __my_object, 'click', function(event) { my_function(event); });

            return true;
        };
    }

    this.base = function()
    {
        if (is_init === false)
            return false;

        return i_bassoon_bee;
    };

    this.on = function(event_name, event_handler)
    {
        if (is_init === false)
            return false;

        return i_bassoon_bee.on(event_name, event_handler);
    };

    this.run = function()
    {
        if (is_init === false)
            return false;

        return i_bassoon_bee.run();
    };

    this.quit = function()
    {
        if (is_init === false)
            return false;

        return i_bassoon_bee.close();
    };

    this.error = function()
    {
        if (is_init === false)
            return false;

        return i_bassoon_bee.error;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        i_bassoon_bee = dev_box.get('bee');

        config.id = 'i_bassoon';

        nature.theme([config.id]);
        nature.apply('new');

        infinity.init();

        i_bassoon_bee.init(config.id, 'i_bassoon_icon');
        i_bassoon_bee.settings.data.window.labels.title('iBassoon (Integrated Bassoon Tracker)');
        i_bassoon_bee.settings.data.window.labels.status_bar('Online DAW for fun!');
        i_bassoon_bee.settings.general.single_instance(true);
        i_bassoon_bee.settings.general.resizable(true);
        i_bassoon_bee.settings.actions.can_edit_title(false);
        i_bassoon_bee.settings.actions.can_use_menu(false);
        i_bassoon_bee.gui.position.left(250);
        i_bassoon_bee.gui.position.top(50);
        i_bassoon_bee.gui.size.width(900);
        i_bassoon_bee.gui.size.height(600);
        i_bassoon_bee.gui.size.min.width(900);
        i_bassoon_bee.gui.size.min.height(600);
        i_bassoon_bee.gui.size.max.width(1000);
        i_bassoon_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        i_bassoon_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        i_bassoon_bee.on('open', function() { i_bassoon_bee.gui.fx.fade.into(); });
        i_bassoon_bee.on('opened', function() { utils_int.gui_init(); });
        i_bassoon_bee.on('drag', function()
                                 {
                                     utils_sys.objects.by_id(i_bassoon_bee.settings.general.id() + '_overlay').style.display = 'block';
                                 });
        i_bassoon_bee.on('dragging', function()
                                     {
                                        i_bassoon_bee.gui.fx.opacity.settings.set(0.7);
                                        i_bassoon_bee.gui.fx.opacity.apply();
                                     });
        i_bassoon_bee.on('dragged', function()
                                    {
                                        i_bassoon_bee.gui.fx.opacity.reset();

                                        utils_sys.objects.by_id(i_bassoon_bee.settings.general.id() + '_overlay').style.display = 'none';
                                    });
        i_bassoon_bee.on('resize', function() { utils_sys.objects.by_id(i_bassoon_bee.settings.general.id() + '_overlay').style.display = 'block'; });
        i_bassoon_bee.on('resized', function() { utils_sys.objects.by_id(i_bassoon_bee.settings.general.id() + '_overlay').style.display = 'none'; });
        i_bassoon_bee.on('close', function()
                                  {
                                    i_bassoon_bee.gui.fx.fade.out();
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

        nature = matrix.get('nature');
        infinity = dev_box.get('infinity');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        nature = null,
        infinity = null,
        i_bassoon_bee = null,
        utils_sys = new vulcan(),
        config = new config_model(),
        utils_int = new utilities();
}
