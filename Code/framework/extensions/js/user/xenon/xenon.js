/*
    GreyOS - Xenon (Version: 1.0)

    File name: xenon.js
    Description: This file contains the Xenon - System-wide information holder module.

    Coded by George Delaportas (G0D)
    Copyright © 2022
    Open Software License (OSL 3.0)
*/

// Xenon
function xenon()
{
    var self = this;

    function sys_info_model()
    {
        function options()
        {

        }

        this.num = 0;
        this.options = new options();
    }

    function utilities()
    {
        
    }

    this.load = function(option, value)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (backtrace === true)
            frog('XENON', 'List :: Set', collection);

        return true;
    };

    this.list = function()
    {
        return sys_info;
    };

    this.backtrace = function(val)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_bool(val))
            return false;

        backtrace = val;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var backtrace = false,
        cosmos = null,
        utils_sys = new vulcan(),
        sys_info = new sys_info_model(),
        utils_int = new utilities();
}
