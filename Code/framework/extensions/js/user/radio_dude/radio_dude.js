/*
    GreyOS - Radio Dude (Version: 2.8)

    File name: radio_dude.js
    Description: This file contains the Radio Dude - Radio player application.

    Coded by George Delaportas (G0D) and John Inglessis (negle)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Radio Dude
function radio_dude()
{
    var self = this;

    function config_model()
    {
        this.id = null;
        this.player = null;
    }

    function utilities()
    {
        var me = this;

        this.gui_init = function()
        {
            var __data_content_id = radio_dude_bee.settings.general.id() + '_data';

            infinity.setup(__data_content_id);
            infinity.begin();

            selected_stream = 'https://stream.zeno.fm/qmqe8k5e74zuv';

            me.draw();

            config.player = utils_sys.objects.by_id(config.id + '_ctlr');
            config.player.volume = 0.3;

            utils_int.attach_events();

            infinity.end();

            return true;
        };

        this.draw = function()
        {
            radio_dude_bee.settings.data.window.content('<div class="radio_dude_player">' + 
                                                        '  <audio id="' + config.id + '_ctlr" width="300" height="32" ' + 
                                                        '         autoplay="false" controls="false" src="' + selected_stream + '">' + 
                                                        '  </audio>' + 
                                                        '</div>' + 
                                                        '<div class="radio_dude_list">' + 
                                                        '  <div id="' + config.id + '_radio_dude_streams" class="radio_dude_streams">' + 
                                                        '      <div id="' + config.id + '_stream_genres" class="stream_genres">' + 
                                                        '          <div data-stream="1" class="radio_dude_selected_stream">Pop/Rock</div>' + 
                                                        '          <div data-stream="2">Dance/House</div>' + 
                                                        '          <div data-stream="3">Jazz/Blues</div>' + 
                                                        '          <div data-stream="4">Country</div>' + 
                                                        '      </div>' + 
                                                        '  </div>' + 
                                                        '</div>');

            radio_dude_bee.settings.data.casement.content(`<div class="radio_dude_weather"><center><br><br>Coming soon...</center></div>`);

            return true;
        };

        this.stream = function(stream_id)
        {
            if (!utils_sys.validation.numerics.is_number(stream_id) | stream_id < 1 || stream_id > 10)
                return false;

            var streams = [];

            streams[1] = 'https://stream.zeno.fm/qmqe8k5e74zuv';
            streams[2] = 'https://i4.streams.ovh/sc/musicfactory/stream';
            streams[3] = 'https://c30.radioboss.fm:18119/stream';
            streams[4] = 'https://hydra.cdnstream.com/1924_64';

            selected_stream = streams[stream_id];

            config.player.pause();
            config.player.src = streams[stream_id];
            config.player.play();

            return true;
        };

        this.choose = function(list_id)
        {
            if (!utils_sys.validation.numerics.is_number(list_id))
                return false;

            var __streams_list = utils_sys.objects.by_id(config.id + '_stream_genres'),
                __streams_list_num = __streams_list.children.length;

            for (var i = 0; i < __streams_list_num; i++)
                __streams_list.children[i].setAttribute('class', '');

            __streams_list.children[list_id - 1].setAttribute('class', 'radio_dude_selected_stream');

            return true;
        };
        
        this.change_stream = function()
        {
            me.stream(this.getAttribute('data-stream'));
            me.choose(this.getAttribute('data-stream'));
        };
        
        this.attach_events = function()
        {
            var __streams_list = utils_sys.objects.by_id(config.id + '_stream_genres'),
                __streams_list_num = __streams_list.children.length;

            for (var i = 0; i < __streams_list_num; i++)
                __streams_list.children[i].onclick = me.change_stream;
        };
    }

    this.base = function()
    {
        if (is_init === false)
            return false;

        return radio_dude_bee;
    };

    this.on = function(event_name, event_handler)
    {
        if (is_init === false)
            return false;

        return radio_dude_bee.on(event_name, event_handler);
    };

    this.run = function()
    {
        if (is_init === false)
            return false;

        return radio_dude_bee.run();
    };

    this.quit = function()
    {
        if (is_init === false)
            return false;

        return radio_dude_bee.quit();
    };

    this.error = function()
    {
        if (is_init === false)
            return false;

        return radio_dude_bee.error;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        config.id = 'radio_dude_' + random.generate();

        nature.themes.store('radio_dude');
        nature.apply('new');

        infinity.init();

        radio_dude_bee = dev_box.get('bee');

        // Declare bee's settings
        radio_dude_bee.init('radio_dude', 'radio_dude_icon');
        radio_dude_bee.settings.data.window.labels.title('Radio Dude');
        radio_dude_bee.settings.data.window.labels.status_bar('Music babe... [ M U S I C ]');
        radio_dude_bee.settings.data.casement.labels.title('Weather');
        radio_dude_bee.settings.data.casement.labels.status('');
        radio_dude_bee.settings.general.single_instance(true);
        radio_dude_bee.gui.position.static(true);
        radio_dude_bee.gui.position.left(330);
        radio_dude_bee.gui.position.top(120);
        radio_dude_bee.gui.size.width(320);
        radio_dude_bee.gui.size.height(274);
        radio_dude_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        radio_dude_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        radio_dude_bee.on('open', function() { radio_dude_bee.gui.fx.fade.into(); });
        radio_dude_bee.on('opened', function() { utils_int.gui_init(); });
        radio_dude_bee.on('dragging', function()
                                      {
                                          radio_dude_bee.gui.fx.opacity.settings.set(0.7);
                                          radio_dude_bee.gui.fx.opacity.apply();
                                      });
        radio_dude_bee.on('dragged', function() { radio_dude_bee.gui.fx.opacity.reset(); });
        radio_dude_bee.on('close', function() { radio_dude_bee.gui.fx.fade.out(); });
        radio_dude_bee.on('closed', function() { nature.themes.clear('radio_dude'); });

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
        selected_stream = null,
        radio_dude_bee = null,
        utils_sys = new vulcan(),
        random = new pythia(),
        config = new config_model(),
        utils_int = new utilities();
}
