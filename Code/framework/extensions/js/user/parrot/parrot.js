/*
    GreyOS - Parrot (Version: 1.0)
    
    File name: parrot.js
    Description: This file contains the Parrot - Sound player module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Parrot
function parrot()
{
    var self = this;

    function list()
    {
        if (cosmos === null)
            return false;

        // Code to be written
    }

    this.cosmos = function(cosmos_object)
    {
        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        return true;
    };

    var cosmos = null,
        utils_sys = new vulcan();

    this.list = new list();
}
