/*
    GreyOS - e-Games (Version: 2.5)

    File name: e_games.js
    Description: This file contains the e-Games application.

    Coded by George Delaportas (G0D)
    Copyright © 2014 - 2021
    Open Software License (OSL 3.0)
*/

function e_games()
{

    var self = this;

    this.init = function(game)
    {

        if (game === undefined)
            return false;

        vulcan = cosmos.hub.access('vulcan');
        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        colony = matrix.get('colony');
        swarm = matrix.get('swarm');

        e_games_bee = dev_box.get('bee');
        fx = dev_box.get('fx');
        fx.init(cosmos);        

        vulcan.graphics.apply_theme('/framework/extensions/js/e_games/themes', 'e_games');

        if (game === 'Trigger Rally')
        {

            id = 'trigger_rally_app';

            e_games_bee.init(cosmos, id, 1);
            e_games_bee.settings.data.window.labels.status_bar('All credits go to https://triggerrally.com/');

        }

        else if (game === 'BananaBread')
        {

            id = 'banana_bread_app';

            e_games_bee.init(cosmos, id, 1);
            e_games_bee.settings.data.window.labels.status_bar('All credits go to Mozilla');

        }

        else
        {

            id = 'epic_citadel_app';

            e_games_bee.init(cosmos, id, 1);
            e_games_bee.settings.data.window.labels.status_bar('All credits go to http://www.unrealengine.com/html5/');

        }

        e_games_bee.settings.data.window.labels.title(game);
        e_games_bee.gui.position.left(180);
        e_games_bee.gui.position.top(10);
        e_games_bee.gui.size.width(900);
        e_games_bee.gui.size.height(520);
        e_games_bee.gui.size.min.width(900);
        e_games_bee.gui.size.min.height(520);
        e_games_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        e_games_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        e_games_bee.on('open', function() { e_games_bee.gui.fx.fade.into(); });
        e_games_bee.on('opened', function() { return gui_init(); });
        e_games_bee.on('drag', function() { vulcan.objects.by_id('e_games_overlay').style.display = 'block'; });
        e_games_bee.on('dragging', function()
                                   {

                                       e_games_bee.gui.fx.opacity.settings.set(0.7);
                                       e_games_bee.gui.fx.opacity.apply();

                                   });
        e_games_bee.on('dragged', function()
                                  {

                                       e_games_bee.gui.fx.opacity.reset();

                                       vulcan.objects.by_id('e_games_overlay').style.display = 'none';

                                  });
        e_games_bee.on('resize', function() { vulcan.objects.by_id('e_games_overlay').style.display = 'block'; });
        e_games_bee.on('resized', function() { vulcan.objects.by_id('e_games_overlay').style.display = 'none'; });
        e_games_bee.on('close', function() { e_games_bee.gui.fx.fade.out(); });

        return true;

    };

    this.base = function()
    {

        return e_games_bee;

    };

    this.get_id = function()
    {

        return id;

    };

    function gui_init()
    {

        var game_url = null;

        if (id === 'trigger_rally_app')
            game_url = 'https://triggerrally.com/';

        else if (id === 'banana_bread_app')
            game_url = 'https://developer.cdn.mozilla.net/media/uploads/demos/a/z/azakai/3baf4ad7e600cbda06ec46efec5ec3b8/bananabread_1373485124_demo_package/game.html?setup=medium&serve';

        else
            game_url = 'http://www.unrealengine.com/html5/';

        e_games_bee.settings.data.window.content('<div id="e_games_overlay"></div>' + 
                                                 '<iframe id="e_games_frame" class="e_games_frame" src="' + game_url + '"></iframe>');

        return true;

    }

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        dev_box = null,
        colony = null,
        swarm = null,
        fx = null,
        e_games_bee = null,
        id = 'e_games';

}
