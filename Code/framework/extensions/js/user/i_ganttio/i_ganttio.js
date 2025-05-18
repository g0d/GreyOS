/*
    GreyOS - iGanttIO (Version: 1.0)

    File name: i_ganttio.js
    Description: This file contains the iGanttIO - Online Gantt charts creator application.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2022 - 2025
    Open Software License (OSL 3.0)
*/

// iGanttIO (3rd-party integrated online Gantt charts creator app)
function i_ganttio()
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
            var __data_content_id = i_ganttio_bee.settings.general.id() + '_data';

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
                                 <div id="' + i_ganttio_bee.settings.general.id() + '_overlay" class="overlay"></div>\
                                 <iframe title="GanttIO" src="https://app.gantt.io/"></iframe>\
                              </div>';

            i_ganttio_bee.settings.data.window.content(config.content);

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

        return i_ganttio_bee;
    };

    this.on = function(event_name, event_handler)
    {
        if (is_init === false)
            return false;

        return i_ganttio_bee.on(event_name, event_handler);
    };

    this.run = function()
    {
        if (is_init === false)
            return false;

        return i_ganttio_bee.run();
    };

    this.quit = function()
    {
        if (is_init === false)
            return false;

        return i_ganttio_bee.close();
    };

    this.error = function()
    {
        if (is_init === false)
            return false;

        return i_ganttio_bee.error;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        i_ganttio_bee = dev_box.get('bee');

        config.id = 'i_ganttio';

        nature.themes.store(config.id);
        nature.apply('new');

        infinity.init();

        i_ganttio_bee.init(config.id);
        i_ganttio_bee.settings.data.window.labels.title('iGanttIO');
        i_ganttio_bee.settings.data.window.labels.status_bar('Online Gantt diagrams the easy way!');
        i_ganttio_bee.settings.general.single_instance(true);
        i_ganttio_bee.settings.general.resizable(true);
        i_ganttio_bee.settings.actions.can_edit_title(false);
        i_ganttio_bee.settings.actions.can_use_menu(false);
        i_ganttio_bee.gui.position.left(50);
        i_ganttio_bee.gui.position.top(20);
        i_ganttio_bee.gui.size.width(950);
        i_ganttio_bee.gui.size.height(850);
        i_ganttio_bee.gui.size.min.width(900);
        i_ganttio_bee.gui.size.min.height(600);
        i_ganttio_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        i_ganttio_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        i_ganttio_bee.on('open', function() { i_ganttio_bee.gui.fx.fade.into(); });
        i_ganttio_bee.on('opened', function() { utils_int.gui_init(); });
        i_ganttio_bee.on('drag', function()
                                 {
                                     utils_sys.objects.by_id(i_ganttio_bee.settings.general.id() + '_overlay').style.display = 'block';
                                 });
        i_ganttio_bee.on('dragging', function()
                                     {
                                        i_ganttio_bee.gui.fx.opacity.settings.set(0.7);
                                        i_ganttio_bee.gui.fx.opacity.apply();
                                     });
        i_ganttio_bee.on('dragged', function()
                                    {
                                        i_ganttio_bee.gui.fx.opacity.reset();

                                        utils_sys.objects.by_id(i_ganttio_bee.settings.general.id() + '_overlay').style.display = 'none';
                                    });
        i_ganttio_bee.on('resize', function() { utils_sys.objects.by_id(i_ganttio_bee.settings.general.id() + '_overlay').style.display = 'block'; });
        i_ganttio_bee.on('resized', function() { utils_sys.objects.by_id(i_ganttio_bee.settings.general.id() + '_overlay').style.display = 'none'; });
        i_ganttio_bee.on('close', function() { i_ganttio_bee.gui.fx.fade.out(); });
        i_ganttio_bee.on('closed', function() { nature.themes.clear(config.id); });

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
        i_ganttio_bee = null,
        utils_sys = new vulcan(),
        config = new config_model(),
        utils_int = new utilities();
}
