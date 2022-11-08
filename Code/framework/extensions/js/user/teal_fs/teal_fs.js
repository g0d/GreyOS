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

    function teal_fs_model()
    {
        this.id = null;
        this.file = null;
    }

    function teal_fs_manager_model()
    {
        this.create = function(worker_file)
        {
            
        };
    }

    this.id = function()
    {
        
    };

    this.create = function(worker_file)
    {
        
    };

    this.destroy = function()
    {
        
    };

    function init()
    {
        if (utils.validation.misc.is_undefined(Worker))
            return false;

        return this;
    }

    var __is_teal_fs_created = false,
        __teal_fs = new teal_fs_model(),
        teal_fs_manager = new teal_fs_manager_model(),
        rnd_gen = new pythia(),
        utils = new vulcan();

    // Initialize
    init();
}
