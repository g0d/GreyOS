/*

    GreyOS Inc. - Multiverse (Cosmos container & manager for GreyOS)
    
    File name: multiverse.js (Version: 1.2)
    Description: This file contains the Multiverse - Cosmos container & manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Multiverse
function multiverse()
{

    var self = this;

    function universe_bubbles()
    {

        this.num = 0;
        this.list = [];

    }

    this.num = function()
    {

        if (is_init === false)
           return false;

        return bubbles.num;

    };

    this.list = function(index)
    {

        if (is_init === false)
           return false;

        if (vulcan.validation.misc.is_undefined(index))
            return bubbles.list;

        if (!vulcan.validation.numerics.is_integer(index) || index < 0 || index > (bubbles.num - 1))
            return false;

        return bubbles.list[index];

    };

    this.push = function(cosmos_array)
    {

        if (is_init === false)
           return false;

        if (!vulcan.validation.misc.is_array(cosmos_array))
            return false;

        var __objects = cosmos_array.length;

        for (var i = 0; i < __objects; i++)
        {

            if (!vulcan.validation.misc.is_object(cosmos_array[i]))
            {

                self.clear();

                return false;

            }

            bubbles.list.push(cosmos_array[i]);

            bubbles.num++;

        }

        return true;

    };

    this.clear = function()
    {

        if (is_init === false)
           return false;

        if (bubbles.num === 0)
            return false;

        bubbles.num = 0;
        bubbles.list = [];

        return true;

    };

    this.init = function(vulcan_object)
    {

        if (is_init === true)
           return false;

        vulcan = vulcan_object;

        is_init = true;

        return true;

    };

    var is_init = false,
        vulcan = null,
        bubbles = new universe_bubbles();

}
