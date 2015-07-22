/*

    GreyOS Inc. - Dev Box (Development tools container for GreyOS)
    
    File name: dev_box.js (Version: 1.0)
    Description: This file contains the Dev Box - Development tools container extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Dev Box
function dev_box()
{

    var self = this;

    function tool_box()
    {

        this.num = 0;
        this.list = [];

    }

    this.num = function()
    {

        return tools.num;

    };

    this.list = function(index)
    {

        if (vulcan.validation.misc.is_undefined(index))
            return tools.list;

        if (!vulcan.validation.numerics.is_integer(index) || index < 0 || index > (tools.num - 1))
            return false;

        return tools.list[index];

    };

    this.get = function(tool_id)
    {

        if (tools.num === 0)
            return null;

        if (vulcan.validation.alpha.is_symbol(tool_id))
            return false;

        for (var i = 0; i < tools.num; i++)
        {

            if (tools.list[i].toString().substr(9, tools.list[i].toString().indexOf('(') - 9) === tool_id)
                return new tools.list[i];

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

            if (tools.list[i] === objects_array[i])
                continue;

            tools.list.push(objects_array[i]);

            tools.num++;

            if (objects_array[i].cosmos === undefined)
                continue;

            objects_array[i].cosmos(cosmos);

        }

        return true;

    };

    this.clear = function()
    {

        if (tools.num === 0)
            return false;

        tools.num = 0;
        tools.list = [];

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
        tools = new tool_box();

}
