/*
    GreyOS - System Program Wizard (SPW)

    File name: spw.js
    Description: This file contains the control script for the spw view.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// SPW
function spw()
{
    var utils = new vulcan();

    utils.graphics.apply_theme('/framework/mvc/views/assets/css', 'spw');

    function create_program()
    {
        var utils = new vulcan(),
            name =  utils.objects.by_id('new_program_name').value,
            type = null,
            data = null;

        if (utils.objects.by_id('app').checked)
            type = 'app';
        else
            type = 'svc';

        data = 'gate=spw&program_name=' + name + '&program_type=' + type;

        ajax_factory('post', data, function(result)
        {
            utils.objects.by_id('components').innerHTML = '<br><br><br>Done!<br><br><br>';
        },
        function(result)
        {
            if (result === '0')
            {
                utils.objects.by_id('components').innerHTML = `<br><br><br>
                                                               Oops, another program has the same name!<br>
                                                               Choose a different name and try again.
                                                               <br><br><br>`;
            }
            else
            {
                utils.objects.by_id('components').innerHTML = `<br><br><br>
                                                               Error: Try again!
                                                               <br><br><br>`;
            }
        },
        function()
        {
            utils.objects.by_id('components').innerHTML += `<a href="">Refresh</a>`;
        });

        return true;
    }

    utils.events.attach('spw', utils.objects.by_id('create_new_program'), 'click', function(){ create_program(); });
}

ultron(spw);
