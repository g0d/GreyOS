/*
    GreyOS - iAudioMass (Version: 1.0)

    File name: i_audiomass.js
    Description: This file contains the iAudioMass - Online audio editor application.

    Coded by George Delaportas (G0D)
    Copyright © 2022
    Open Software License (OSL 3.0)
*/

// iAudioMass (3rd-party integrated online audio editor app)
function i_audiomass()
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
            var __data_content_id = i_audiomass_bee.settings.general.id() + '_data';

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
                                 <div id="' + i_audiomass_bee.settings.general.id() + '_overlay" class="overlay"></div>\
                                 <iframe title="AudioMass" src="https://audiomass.co/"></iframe>\
                              </div>';

            i_audiomass_bee.settings.data.window.content(config.content);

            return true;
        };

        this.attach_events = function()
        {
            //var __my_object = utils_sys.objects.by_id('my_content');

            //utils_sys.events.attach(config.id, __my_object, 'click', function(event) { my_function(event); });

            return true;
        };
    }

    this.get_bee = function()
    {
        if (is_init === false)
            return false;

        return i_audiomass_bee;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        i_audiomass_bee = dev_box.get('bee');

        config.id = 'i_audiomass';

        nature.theme([config.id]);
        nature.apply('new');

        infinity.init();

        i_audiomass_bee.init(config.id, 1);
        i_audiomass_bee.settings.data.window.labels.title('iAudioMass');
        i_audiomass_bee.settings.data.window.labels.status_bar('Online audio editor!');
        i_audiomass_bee.settings.general.single_instance(true);
        i_audiomass_bee.settings.actions.can_edit_title(false);
        i_audiomass_bee.settings.actions.can_use_menu(false);
        i_audiomass_bee.gui.position.left(250);
        i_audiomass_bee.gui.position.top(50);
        i_audiomass_bee.gui.size.width(1300);
        i_audiomass_bee.gui.size.height(800);
        i_audiomass_bee.gui.size.min.width(950);
        i_audiomass_bee.gui.size.min.height(650);
        i_audiomass_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        i_audiomass_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        i_audiomass_bee.on('open', function() { i_audiomass_bee.gui.fx.fade.into(); });
        i_audiomass_bee.on('opened', function() { utils_int.gui_init(); });
        i_audiomass_bee.on('drag', function()
                                   {
                                        utils_sys.objects.by_id(i_audiomass_bee.settings.general.id() + '_overlay').style.display = 'block';
                                   });
        i_audiomass_bee.on('dragging', function()
                                       {
                                            i_audiomass_bee.gui.fx.opacity.settings.set(0.7);
                                            i_audiomass_bee.gui.fx.opacity.apply();
                                       });
        i_audiomass_bee.on('dragged', function()
                                      {
                                            i_audiomass_bee.gui.fx.opacity.reset();

                                            utils_sys.objects.by_id(i_audiomass_bee.settings.general.id() + '_overlay').style.display = 'none';
                                      });
        i_audiomass_bee.on('resize', function() { utils_sys.objects.by_id(i_audiomass_bee.settings.general.id() + '_overlay').style.display = 'block'; });
        i_audiomass_bee.on('resized', function() { utils_sys.objects.by_id(i_audiomass_bee.settings.general.id() + '_overlay').style.display = 'none'; });
        i_audiomass_bee.on('close', function()
                                    {
                                        i_audiomass_bee.gui.fx.fade.out();
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
        infinity = matrix.get('infinity');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        infinity = null,
        nature = null,
        i_audiomass_bee = null,
        utils_sys = new vulcan(),
        config = new config_model(),
        utils_int = new utilities();
}
