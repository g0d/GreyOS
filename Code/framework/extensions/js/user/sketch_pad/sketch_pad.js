/*
    GreyOS - Sketch Pad (Version: 1.0)
    
    File name: sketch_pad.js
    Description: This file contains the Sketch Pad - GUI tool box module.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Sketch Pad
function sketch_pad()
{
    var self = this;

    function gui()
    {
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

    this.gui = new gui();
}
