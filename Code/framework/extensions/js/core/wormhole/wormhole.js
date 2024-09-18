/*
    GreyOS - Wormhole (Version: 1.0)

    File name: wormhole.js
    Description: This file contains the Wormhole - Broadcast Channel module.

    Coded by George Delaportas (G0D)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

// Wormhole
function wormhole()
{
    var self = this;

    this.get_bc_id = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return greyos_bc;
    };

    this.setup = function(callback)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_function(callback))
        {
            if (backtrace === true)
                frog('WORMHOLE', 'Setup :: Argument is not a callback function');

            return false;
        }

        greyos_bc = new BroadcastChannel("greyos-bc-" + random.generate());

        greyos_bc.addEventListener("message", (event) => { callback.call(event); });

        if (backtrace === true)
            frog('WORMHOLE', 'Broadcast Channel :: Initializated');

        return true;
    };

    this.send_data = function(data)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        greyos_bc.postMessage(data);

        return true;
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

        matrix = cosmos.hub.access('matrix');

        morpheus = matrix.get('morpheus');

        return true;
    };

    var backtrace = false, 
        greyos_bc = null,
        cosmos = null,
        matrix = null,
        morpheus = null,
        utils_sys = new vulcan(),
        random = new pythia();
}
