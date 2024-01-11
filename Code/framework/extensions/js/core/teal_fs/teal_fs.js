/*
    Teal FS (Logical FS for GreyOS)

    File name: teal_fs.js (Version: 1.0)
    Description: This file contains the Teal FS - Logical FS system extension.
    Dependencies: Vulcan

    Coded by George Delaportas (G0D)
    Copyright (C) 2022
    Open Software License (OSL 3.0)
*/

// Teal FS
function teal_fs()
{
    var self = this;

    this.read = function()
    {
        
    };

    this.write = function()
    {
        
    };

    this.move = function()
    {
        
    };

    this.delete = function()
    {
        
    };

    this.close = function()
    {
        
    };

    this.link = function()
    {
        
    };

    this.permissions = function()
    {
        
    };

    this.metadata = function()
    {
        
    };

    this.list = function()
    {
        
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

        colony = cosmos.hub.access('colony');

        return true;
    };

    var backtrace = false,
        cosmos = null,
        colony = null,
        utils_sys = new vulcan();
}
