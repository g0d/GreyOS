/*
    GreyOS - iMariojs (Version: 1.0)

    File name: i_mariojs.js
    Description: This file contains the iMarioJS - Online game.

    Coded by George Delaportas (G0D)
    Copyright © 2023
    Open Software License (OSL 3.0)
*/

// iMarioJS (3rd-party integrated online game)
function i_mariojs()
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
            var __data_content_id = i_mariojs_bee.settings.general.id() + '_data';

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
                                 <div id="' + i_mariojs_bee.settings.general.id() + '_overlay" class="overlay"></div>\
                                 <iframe id= "' + i_mariojs_bee.settings.general.id() + '_frame" title="Mario JS"\
                                         src="https://lefterise.github.io/mario/" scrolling="no">\
                                 </iframe>\
                             </div>';

            i_mariojs_bee.settings.data.window.content(config.content);

            return true;
        };

        this.attach_events = function()
        {
            var __overlay_object = utils_sys.objects.by_id(i_mariojs_bee.settings.general.id() + '_overlay'),
                __iframe_object = utils_sys.objects.by_id(i_mariojs_bee.settings.general.id() + '_frame');

            utils_sys.events.attach(config.id, __overlay_object, 'click', 
            function()
            {
                __overlay_object.style.display = 'none';

                __iframe_object.focus();
            });

            return true;
        };
    }

    this.base = function()
    {
        if (is_init === false)
            return false;

        return i_mariojs_bee;
    };

    this.on = function(event_name, event_handler)
    {
        if (is_init === false)
            return false;

        return i_mariojs_bee.on(event_name, event_handler);
    };

    this.run = function()
    {
        if (is_init === false)
            return false;

        return i_mariojs_bee.run();
    };

    this.quit = function()
    {
        if (is_init === false)
            return false;

        return i_mariojs_bee.close();
    };

    this.error = function()
    {
        if (is_init === false)
            return false;

        return i_mariojs_bee.error;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        i_mariojs_bee = dev_box.get('bee');

        config.id = 'i_mariojs';

        nature.theme([config.id]);
        nature.apply('new');

        infinity.init();

        i_mariojs_bee.init(config.id);
        i_mariojs_bee.settings.data.window.labels.title('iMarioJS (Integrated Online Game)');
        i_mariojs_bee.settings.data.window.labels.status_bar('Get \'em Mario!');
        i_mariojs_bee.settings.general.single_instance(true);
        i_mariojs_bee.settings.actions.can_edit_title(false);
        i_mariojs_bee.settings.actions.can_use_menu(false);
        i_mariojs_bee.gui.position.left((swarm.settings.right() / 2) - 600);
        i_mariojs_bee.gui.position.top(30);
        i_mariojs_bee.gui.size.width(1057);
        i_mariojs_bee.gui.size.height(640);
        i_mariojs_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        i_mariojs_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        i_mariojs_bee.on('open', function() { i_mariojs_bee.gui.fx.fade.into(); });
        i_mariojs_bee.on('opened', function() { utils_int.gui_init(); });
        i_mariojs_bee.on('drag', function()
                                 {
                                     utils_sys.objects.by_id(i_mariojs_bee.settings.general.id() + '_overlay').style.display = 'block';
                                 });
        i_mariojs_bee.on('dragging', function()
                                    {
                                        i_mariojs_bee.gui.fx.opacity.settings.set(0.7);
                                        i_mariojs_bee.gui.fx.opacity.apply();
                                    });
        i_mariojs_bee.on('dragged', function()
                                    {
                                        i_mariojs_bee.gui.fx.opacity.reset();
                                    });
        i_mariojs_bee.on('close', function()
                                  {
                                      i_mariojs_bee.gui.fx.fade.out();
                                  });
        i_mariojs_bee.on('keydown', function()
                                    {
                                        console.log('mario JS');
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

        swarm = matrix.get('swarm');
        nature = matrix.get('nature');
        infinity = dev_box.get('infinity');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        swarm = null,
        nature = null,
        infinity = null,
        i_mariojs_bee = null,
        utils_sys = new vulcan(),
        config = new config_model(),
        utils_int = new utilities();
}
