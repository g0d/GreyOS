/*

    GreyOS Inc. - App Box (Integrated/User Applications container for GreyOS)
    
    File name: app_box.js (Version: 1.2)
    Description: This file contains the App Box - Integrated/User Applications container extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013 - 2021

*/



// App Box
function app_box()
{
    var self = this;

    function app_box_model()
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

    this.get = function(app_id)
    {
        if (apps.num === 0)
            return null;

        if (vulcan.validation.alpha.is_symbol(app_id))
            return false;

        for (var i = 0; i < apps.num; i++)
        {
            if (apps.list[i].toString().substr(9, apps.list[i].toString().indexOf('(') - 9) === app_id)
            {
                var __app = new apps.list[i];

                __app.cosmos(cosmos);

                return __app;
            }
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
            if (!vulcan.validation.misc.is_function(objects_array[i]))
            {
                self.clear();

                return false;
            }

            if (apps.list[i] === objects_array[i])
                continue;

            apps.list.push(objects_array[i]);

            apps.num++;

            if (objects_array[i].cosmos === undefined)
                continue;

            objects_array[i].cosmos(cosmos);
        }

        return true;
    };

    this.remove = function(app_id)
    {
        if (vulcan.validation.alpha.is_symbol(app_id))
            return false;

        for (var i = 0; i < apps.num; i++)
        {
            var temp_obj = new apps.list[i];

            if (temp_obj.id() === app_id)
            {
                apps.list.splice(i, 1);

                apps.num--;

                return true;
            }
        }

        return false;
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

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');

        cosmos_exists = true;

        return true;
    };

    var cosmos_exists = false,
        cosmos = null,
        vulcan = null,
        apps = new app_box_model();
}
