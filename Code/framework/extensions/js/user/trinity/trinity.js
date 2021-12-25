/*
    GreyOS - Trinity (Version: 1.0)

    File name: trinity.js
    Description: This file contains the Trinity - Systems management service module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Trinity
function trinity()
{
    var self = this;

    function utilities()
    {
        
    }

    this.num = function()
    {
        return new_bat.exec('num');
    };

    this.list = function()
    {
        return new_bat.exec('list', [1]);
    };

    this.init = function()
    {
        new_bat.init();
        new_bat.set_function('num', function() { console.log('NUM!'); });
        new_bat.set_function('list', function() { console.log(arguments[0]); });

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        dev_box = cosmos.hub.access('dev_box');

        new_bat = dev_box.get('bat');

        return true;
    };

    var is_service_active = false,
        cosmos = null,
        dev_box = null,
        new_bat = null,
        utils_sys = new vulcan(),
        utils_int = new utilities();
}
