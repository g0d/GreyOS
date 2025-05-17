/*
    GreyOS - Octopus (Version: 2.0)

    File name: octopus-new.js
    Description: This file contains the Octopus - Devices management service module.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2021 - 2023
    Open Software License (OSL 3.0)
*/

// Octopus
function octopus()
{
    var self = this;

    this.init = function(any, callback = null)
    {
        var result = new_task.create('/framework/extensions/js/core/' + self.constructor.name + '/task.js');

        if (result === false)
            return false;

        return new_task.run({ "action" : "init", "arguments" : any }, 
                            () => 
                            {
                                callback.call();
                            });
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');

        parrot = matrix.get('parrot');
        chameleon = matrix.get('chameleon');
        nature = matrix.get('nature');

        return true;
    };

    var cosmos = null,
        matrix = null,
        parrot = null,
        chameleon = null,
        nature = null,
        utils_sys = new vulcan(),
        new_task = new task();
}
