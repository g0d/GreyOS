/*

    GreyOS Inc. - Snail (CPU speed benchmark utility for GreyOS)
    
    File name: snail.js (Version: 1.0)
    Description: This file contains the Snail - CPU speed benchmark utility extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2014

*/



// Snail
function snail()
{

    function config_model()
    {

        this.index = -1;

    }

    this.run = function(loops)
    {

        centurion.benchmark.start();

        while (loops >= 0)
            loops--;

        centurion.benchmark.end();

        config.index = centurion.benchmark.latency();

        return true;

    };

    this.index = function()
    {

        if (config.index === -1)
            return false;

        return config.index;

    };

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        centurion = cosmos.hub.access('matrix').get('centurion');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        centurion = null,
        config = new config_model();

}
