/*

    GreyOS Inc. - Colony (Bee keeper for GreyOS)
    
    File name: colony.js (Version: 2.0)
    Description: This file contains the Colony - Bee keeper extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Colony
function colony()
{

    var self = this;

    function bees_model()
    {

        this.num = 0;
        this.list = [];

    }

    this.num = function()
    {

        return bees.num;

    };

    this.list = function(index)
    {

        if (vulcan.validation.misc.is_undefined(index))
            return bees.list;

        if (!vulcan.validation.numerics.is_integer(index) || index < 0 || index > (bees.num - 1))
            return false;

        return bees.list[index];

    };

    this.get = function(bee_id)
    {

        if (bees.num === 0)
            return null;

        if (vulcan.validation.alpha.is_symbol(bee_id))
            return false;

        for (var i = 0; i < bees.num; i++)
        {

            if (bees.list[i].settings.general.id() === bee_id)
                return bees.list[i];

        }

        return false;

    };

    this.add = function(objects_array)
    {

        if (!vulcan.validation.misc.is_array(objects_array))
            return false;

        var __objects = objects_array.length;

        for (var i = 0; i < __objects; i++)
        {

            if (!vulcan.validation.models.is_bee(objects_array[i]))
            {

                self.clear();

                return false;

            }

            if (bees.list[i] === objects_array[i])
                continue;

            bees.list.push(objects_array[i]);

            bees.num++;

        }

        return true;

    };

    this.remove = function(bee_id)
    {

        if (bees.num === 0)
            return false;

        if (vulcan.validation.alpha.is_symbol(bee_id))
            return false;

        for (var i = 0; i < bees.num; i++)
        {

            if (bees.list[i].settings.general.id() === bee_id)
            {

                bees.list.splice(i, 1);

                bees.num--;

                return true;

            }

        }

        return false;

    };

    this.clear = function()
    {

        if (bees.num === 0)
            return false;

        bees.num = 0;
        bees.list = [];

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
        bees = new bees_model();

}
