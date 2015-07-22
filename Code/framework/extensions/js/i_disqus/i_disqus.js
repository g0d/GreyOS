/*

    GreyOS Inc. - Disqus extension

    File name: i_disqus.js (Version: 2.2)
    Description: This file contains the Disqus extension.

    Coded by John Inglessis (negle) and George Delaportas (G0D)

    GreyOS Inc.
    Copyright © 2014

*/



function i_disqus()
{

	var self = this;

    function utilities()
    {

        this.gui_init = function()
        {

            vulcan.objects.by_id(config.id + '_data').innerHTML = '<div id="disqus_slideshow">' + 
                                                                  '    <img id="pic1" src="http://baconmockup.com/380/200">' +
                                                                  '    <img id="pic2" src="http://placekitten.com/380/200">' +
                                                                  '    <img id="pic3" src="http://placekitten.com/g/380/200">' +
                                                                  '</div>' + 
                                                                  '<button id="disqus_previous" type="button">Previous</button>' + 
                                                                  '<button id="disqus_next" style="float: right;" type="button">Next</button>';

            fx.animation.slider(
            {
                name: 'disqus_slideshow', // String
                mode: 1, // Integer
                width: 380, // Integer
                height: 200, // Integer
                previous: {
                            name: 'disqus_previous',
                            mode: 1
                            // callback: function() {  }
                          },
                next: {
                        name: 'disqus_next',
                        mode: 1
                      },
                step: 20, // Integer
                speed: 10 // Integer

            });

            return true;

        };

        // --- This will be removed and all ajax will be replaced with Aether actions ---
        this.ajax_data = function(element_id, args, callback)
        {

            if (element_id === undefined)
                return false;

            var __url = null,
                __data = null,
                __ajax = new bull();

            __url = '/framework/extensions/ajax/i_disqus/i_disqus.php';
            __data = (args === undefined) ? ' ' : args;

            __ajax.data(__url, __data, element_id, 1, 1, false, callback);

            return true;

        };

    }

    this.get_bee = function()
    {

        if (is_init === false)
            return false;

        return disqus_bee;

    };

    function config_model()
    {

        this.id = null;

    }

	this.init = function()
	{

        if (is_init === true)
            return false;

        infinity = dev_box.get('infinity');
        fx = dev_box.get('fx');
        fx.init(cosmos);       

        disqus_bee = dev_box.get('bee');

        var __pythia = matrix.get('pythia');

        vulcan.graphics.apply_theme('/framework/extensions/js/i_disqus/themes', 'i_disqus');

        config.id = 'disqus_' + __pythia.generate();

        // Declare bee's settings
        disqus_bee.init(cosmos, config.id, 2);
        disqus_bee.settings.data.window.labels.title('Disqus');
        disqus_bee.settings.data.window.labels.status_bar('Sign in to manage your discussions');
        disqus_bee.settings.data.casement.content('This is an extra GUI that extends and enhances the users eperience!');
        disqus_bee.settings.data.casement.labels.title('Disqus - Extra panel');
        disqus_bee.settings.data.casement.labels.status('Helping (secondary) status bar messages...');
        disqus_bee.gui.position.left(30);
        disqus_bee.gui.position.top(130);
        disqus_bee.gui.size.width(400);
        disqus_bee.gui.size.height(380);
        disqus_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        disqus_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        disqus_bee.on('open', function() { disqus_bee.gui.fx.fade.into(); });
        disqus_bee.on('opened', function() { return utils.gui_init(); });
        disqus_bee.on('dragging', function()
                                  {

                                      disqus_bee.gui.fx.opacity.settings.set(0.7);
                                      disqus_bee.gui.fx.opacity.apply();

                                  });
        disqus_bee.on('dragged', function() { disqus_bee.gui.fx.opacity.reset(); });
        disqus_bee.on('close', function() { disqus_bee.gui.fx.fade.out(); });

        is_init = true;

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
        infinity = null,
        colony = null,
        swarm = null,
        fx = null,
        disqus_bee = null,
        config = new config_model(),
        utils = new utilities();

}
