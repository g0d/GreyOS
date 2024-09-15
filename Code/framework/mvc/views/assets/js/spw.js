/*
    GreyOS - System Program Wizard (SPW)

    File name: spw.js
    Description: This file contains the control script for the spw view.

    Coded by George Delaportas (G0D)
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
            data = 'gate=spw&program_name=' + utils.objects.by_id('new_program_name').value + 
                   '&program_type=' + utils.objects.by_id('app').checked;

        ajax_factory('post', data, function(result)
        {
            utils.objects.by_id('components').innerHTML = '<br><br><br>Done!<br><br><br>';
        },
        function()
        {
            // Nothing...
        },
        function()
        {
            // Nothing...
        });

        return true;
    }

    utils.events.attach('spw', utils.objects.by_id('create_new_program'), 'click', function(){ create_program(); });
}

ultron(spw);
