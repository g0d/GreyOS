/*

    GreyOS Inc. - Sand Box (Developers sand box for GreyOS)
    
    File name: sand_box.js (Version: 1.0)
    Description: This file contains the Sand Box - Developers sand box extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Sand Box
function sand_box()
{

    var self = this;

    function dev_apps()
    {

        this.num = 0;
        this.list = [];

    }

    this.num = function()
    {

        return apps.num;

    };

    this.list = function(index)
    {

        if (vulcan.validation.misc.is_undefined(index))
            return apps.list;

        if (!vulcan.validation.numerics.is_integer(index) || index < 0 || index > (apps.num - 1))
            return false;

        return apps.list[index];

    };

    this.push = function(cosmos_array)
    {

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

            apps.list.push(cosmos_array[i]);

            apps.num++;

        }

        return true;

    };

    this.clear = function()
    {

        if (apps.num === 0)
            return false;

        apps.num = 0;
        apps.list = [];

        return true;

    };

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        vulcan = cosmos_object.hub.access('vulcan');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        vulcan = null,
        apps = new dev_apps();

}
