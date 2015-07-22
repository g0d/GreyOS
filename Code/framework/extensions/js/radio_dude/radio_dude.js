/*

    GreyOS Inc. - Radio Dude (GreyOS Radio Player)
    
    File name: radio_dude.js (Version: 2.4)
    Description: This file contains the Radio Dude - GreyOS Radio Player extension.
    
    Coded by George Delaportas (G0D) and John Inglessis (negle)
    
    GreyOS Inc.
    Copyright © 2014

*/



// Radio Dude
function radio_dude()
{

    var self = this;

    function utilities()
    {

        this.gui_init = function()
        {

            utils.draw();

            config.player = vulcan.objects.by_id('radio_dude_ctlr');
            config.player.volume = 0.3;

            utils.attach_events();

            return true;

        };

        this.draw = function()
        {

            radio_dude_bee.settings.data.window.content('<div class="radio_dude_player">' + 
                                                        '  <audio id="radio_dude_ctlr" width="300" height="32" controls="controls" ' + 
                                                        '         src="http://95.141.24.117:80/;">' + 
                                                        '  </audio>' + 
                                                        '</div>' + 
                                                        '<div class="radio_dude_list">' + 
                                                        '  <div id="radio_dude_streams">' + 
                                                        '      <div id="radio_dude_stream_genres">' + 
                                                        '          <div data-stream="1" class="radio_dude_selected_stream">Pop</div>' + 
                                                        '          <div data-stream="3">Rock</div>' + 
                                                        '          <div data-stream="5">Country</div>' + 
                                                        '          <div data-stream="7">Jazz</div>' + 
                                                        '          <div data-stream="9">Blues</div>' + 
                                                        '          <div data-stream="11">Latin</div>' + 
                                                        '          <div data-stream="13">Folk</div>' + 
                                                        '          <div data-stream="15">Metal</div>' + 
                                                        '          <div data-stream="17">New Age</div>' + 
                                                        '          <div data-stream="19">Disco</div>' + 
                                                        '          <div data-stream="21">Dance/House</div>' + 
                                                        '          <div data-stream="23">Electro</div>' + 
                                                        '          <div data-stream="25">R&B</div>' + 
                                                        '          <div data-stream="27">Hip Hop</div>' + 
                                                        '          <div data-stream="29">Reggae</div>' + 
                                                        '          <div data-stream="31">Ambient</div>' + 
                                                        '          <div data-stream="33">Classic</div>' + 
                                                        '      </div>' + 
                                                        '  </div>' + 
                                                        '</div>');

            setTimeout(function() { scroll_bar_fix('radio_dude_streams'); }, 1000);

            return true;

        };

        this.stream = function(stream_id)
        {

            if (!vulcan.validation.numerics.is_number(stream_id) | stream_id < 1 || stream_id > 33)
                return false;

            var streams = [];

            streams[1] = 'http://95.141.24.117:80;';
            streams[3] = 'http://67.213.213.143:8048/;';
            streams[5] = 'http://66.197.229.245:8082/;';
            streams[7] = 'http://173.244.199.249:80/;';
            streams[9] = 'http://74.208.98.253:8220/;';
            streams[11] = 'http://37.187.79.56:10870/;';
            streams[13] = 'http://46.165.232.50:80/;';
            streams[15] = 'http://66.90.104.41:8248/;';
            streams[17] = 'http://206.190.129.220:8606/;';
            streams[19] = 'http://91.121.104.123:80/;';
            streams[21] = 'http://37.58.52.47:80/;';
            streams[23] = 'http://91.250.77.13:8000/stream/3/;';
            streams[25] = 'http://108.61.73.119:14022/;';
            streams[27] = 'http://108.61.30.179:4010/;';
            streams[29] = 'http://188.165.60.91:8300/;';
            streams[31] = 'http://50.7.96.138:8053/;';
            streams[33] = 'http://50.7.173.162:8010/;';

            config.player.src = streams[stream_id];
            config.player.play();

            return true;

        };

        this.choose = function(list_id)
        {

            if (!vulcan.validation.numerics.is_number(list_id))
                return false;

            var __streams_list = vulcan.objects.by_id('radio_dude_stream_genres'),
                __streams_list_num = __streams_list.childNodes.length;

            for (var i = 0; i < __streams_list_num; i++)
            {

                if (i % 2 === 0)
                    continue;

                __streams_list.childNodes[i].setAttribute('class', '');

            }

            __streams_list.childNodes[list_id].setAttribute('class', 'radio_dude_selected_stream');

            return true;

        };
        
        this.change_stream = function()
        {

            utils.stream(this.getAttribute('data-stream'));
            utils.choose(this.getAttribute('data-stream'));

        };
        
        this.attach_events = function()
        {

            var __streams_list = vulcan.objects.by_id('radio_dude_stream_genres'),
                __streams_list_num = __streams_list.childNodes.length;

            for (var i = 0; i < __streams_list_num; i++)
                __streams_list.childNodes[i].onclick = utils.change_stream;

        };

    }

    function config_model()
    {

        this.id = null;
        this.player = null;

    }

    this.get_bee = function()
    {

        if (is_init === false)
            return false;

        return radio_dude_bee;

    };

    this.init = function()
    {

        if (is_init === true)
            return false;

        is_init = true;

        radio_dude_bee = dev_box.get('bee');
        infinity = dev_box.get('infinity');
        fx = dev_box.get('fx');
        fx.init(cosmos);  

        vulcan.graphics.apply_theme('/framework/extensions/js/radio_dude/themes', 'radio_dude');

        config.id = 'radio_dude'; //+ pythia.generate();

        // Declare bee's settings
        radio_dude_bee.init(cosmos, config.id, 2);
        radio_dude_bee.settings.data.window.labels.title('Radio Dude');
        radio_dude_bee.settings.data.window.labels.status_bar('Music babe... M U S I C!');
        radio_dude_bee.gui.position.left(930);
        radio_dude_bee.gui.position.top(120);
        radio_dude_bee.gui.size.width(320);
        radio_dude_bee.gui.size.height(248);
        radio_dude_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        radio_dude_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        radio_dude_bee.on('open', function() { radio_dude_bee.gui.fx.fade.into(); });
        radio_dude_bee.on('opened', function() { return utils.gui_init(); });
        radio_dude_bee.on('dragging', function()
                                      {

                                          radio_dude_bee.gui.fx.opacity.settings.set(0.7);
                                          radio_dude_bee.gui.fx.opacity.apply();

                                      });
        radio_dude_bee.on('dragged', function() { radio_dude_bee.gui.fx.opacity.reset(); });
        radio_dude_bee.on('close', function() { radio_dude_bee.gui.fx.fade.out(); });

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
        radio_dude_bee = null,
        config = new config_model(),
        utils = new utilities();

}
