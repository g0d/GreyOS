/*
    GreyOS - Trinity (Version: 1.0)

    File name: trinity.js
    Description: This file contains the Trinity - Tasks Management module.

    Coded by George Delaportas (G0D)
    Copyright © 2021 - 2022
    Open Software License (OSL 3.0)
*/

// Trinity
function trinity()
{
    var self = this;

    function processes_model()
    {
        this.apps = [];
        this.services = [];
    }

    function utilities()
    {
        var me = this;

        this.gui_init = function()
        {
            var __data_content_id = trinity_bee.settings.general.id() + '_data';

            infinity.setup(__data_content_id);
            infinity.begin();

            me.draw();

            utils_int.attach_events();

            infinity.end();

            return true;
        };

        this.draw = function()
        {
            trinity_bee.settings.data.window.content('<div class="trinity_data">' + 

                                                     '</div>');

            return true;
        };

        this.attach_events = function()
        {
            var __data = utils_sys.objects.by_id(trinity_bee.settings.general.id() + '_data');

            
        }
    }

    this.get_bee = function()
    {
        if (is_init === false)
            return false;

        return trinity_bee;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        config.id = 'trinity';

        nature.theme([config.id]);
        nature.apply('new');

        infinity.init();

        trinity_bee = dev_box.get('bee');

        // Declare bee's settings
        trinity_bee.init(config.id, 2);
        trinity_bee.settings.data.window.labels.title('Trinity :: Tasks Management');
        trinity_bee.settings.data.window.labels.status_bar('Ready');
        trinity_bee.settings.general.single_instance(true);
        trinity_bee.gui.position.static(true);
        trinity_bee.gui.position.left(930);
        trinity_bee.gui.position.top(520);
        trinity_bee.gui.size.width(340);
        trinity_bee.gui.size.height(700);
        trinity_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        trinity_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        trinity_bee.on('open', function() { trinity_bee.gui.fx.fade.into(); });
        trinity_bee.on('opened', function() { utils_int.gui_init(); });
        trinity_bee.on('dragging', function()
                                   {
                                        trinity_bee.gui.fx.opacity.settings.set(0.7);
                                        trinity_bee.gui.fx.opacity.apply();
                                   });
        trinity_bee.on('dragged', function() { trinity_bee.gui.fx.opacity.reset(); });
        trinity_bee.on('close', function() { trinity_bee.gui.fx.fade.out(); });

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');
        colony = cosmos.hub.access('colony');
        roost = cosmos.hub.access('roost');

        swarm = matrix.get('swarm');
        nature = matrix.get('nature');
        infinity = matrix.get('infinity');

        return true;
    };

    var is_init = false,
        cosmos = null,
        matrix = null,
        dev_box = null,
        colony = null,
        roost = null,
        swarm = null,
        nature = null,
        infinity = null,
        trinity_bee = null,
        utils_sys = new vulcan(),
        processes = new processes_model(),
        utils_int = new utilities();
}
