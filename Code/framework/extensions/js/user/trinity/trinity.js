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
        if (is_init === false)
            return false;

        return;
    };

    this.list = function()
    {
        if (is_init === false)
            return false;

        return;
    };

    this.init = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (is_init === true)
            return false;

        is_init = true;

        return;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var is_init = false,
        is_service_active = false,
        cosmos = null,
        utils_sys = new vulcan(),
        utils_int = new utilities();
}
