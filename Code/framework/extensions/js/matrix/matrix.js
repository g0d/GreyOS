/*

    GreyOS Inc. - Matrix (System services container for GreyOS)
    
    File name: matrix.js (Version: 1.0)
    Description: This file contains the Matrix - System services container extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Matrix
function matrix()
{

    var self = this;

    function services_dir()
    {

        this.num = 0;
        this.list = [];

    }

    this.num = function()
    {

        return services.num;

    };

    this.list = function(index)
    {

        if (vulcan.validation.misc.is_undefined(index))
            return services.list;

        if (!vulcan.validation.numerics.is_integer(index) || index < 0 || index > (services.num - 1))
            return false;

        return services.list[index];

    };

    this.get = function(service_id)
    {

        if (services.num === 0)
            return null;

        if (vulcan.validation.alpha.is_symbol(service_id))
            return false;

        for (var i = 0; i < services.num; i++)
        {

            if (services.list[i].constructor.toString().substr(9, services.list[i].constructor.toString().indexOf('(') - 9) === service_id)
                return services.list[i];

        }

        return false;

    };

    this.push = function(objects_array)
    {

        if (!vulcan.validation.misc.is_array(objects_array))
            return false;

        var __objects = objects_array.length;

        for (var i = 0; i < __objects; i++)
        {

            if (!vulcan.validation.misc.is_object(objects_array[i]))
            {

                self.clear();

                return false;

            }

            if (services.list[i] === objects_array[i])
                continue;

            services.list.push(objects_array[i]);

            services.num++;

            if (objects_array[i].cosmos === undefined)
                continue;

            objects_array[i].cosmos(cosmos);

        }

        return true;

    };

    this.clear = function()
    {

        if (services.num === 0)
            return false;

        services.num = 0;
        services.list = [];

        return true;

    };

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        cosmos = null,
        vulcan = null,
        services = new services_dir();

}
