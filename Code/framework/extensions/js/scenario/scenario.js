/*

    GreyOS Inc. - Scenario (Scenario-based loader & manager for GreyOS)
    
    File name: scenario.js (Version: 1.0)
    Description: This file contains the Scenario - Scenario-based loader & manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Scenario
function scenario()
{

    var self = this;

    function utilities()
    {

        var me = this;

        this.is_undefined = function(val)
        {

            if (val === undefined)
                return true;

            return false;

        };

        this.is_integer = function(val)
        {

            if (!isNaN(val) && (val % 1 === 0))
                return true;

            return false;

        };

        this.is_array = function(val)
        {

            if (Object.prototype.toString.call(val) === '[object Array]')
                return true;

            return false;

        };

        this.is_function = function(val)
        {

            if (typeof val === 'function')
                return true;

            return false;

        };

        this.is_indices_array = function(indices_array)
        {

            if (!me.is_array(indices_array))
                return false;

            for (var i = 0; i < indices_array.length; i++)
            {

                if (!me.is_integer(indices_array[i]))
                    return false;

            }

            return true;

        };

    }

    function scripts_model()
    {

        this.num = 0;
        this.list = [];

    }

    this.num = function()
    {

        return scripts.num;

    };

    this.list = function(index)
    {

        if (utils.is_undefined(index))
            return scripts.list;

        if (!utils.is_integer(index) || index < 0 || index > (scripts.num - 1))
            return false;

        return scripts.list[index];

    };

    this.push = function(scripts_array)
    {

        if (!utils.is_array(scripts_array))
            return false;

        var __objects = scripts_array.length;

        for (var i = 0; i < __objects; i++)
        {

            if (!utils.is_function(scripts_array[i]))
            {

                self.clear();

                return false;

            }

            scripts.list.push(scripts_array[i]);

            scripts.num++;

        }

        return true;

    };

    this.clear = function()
    {

        if (scripts.num === 0)
            return false;

        scripts.num = 0;
        scripts.list = [];

        return true;

    };

    this.exec = function(indices_array)
    {

        if (scripts.num === 0)
            return false;

        if (utils.is_undefined(indices_array))
        {

            for (var i = 0; i < scripts.num; i++)
                scripts.list[i].call();

            return true;

        }

        if (!utils.is_indices_array(indices_array) || indices_array.length > scripts.num)
            return false;

        for (var i = 0; i < indices_array.length; i++)
            scripts.list[indices_array[i]].call();

        return true;

    };

    var scripts = new scripts_model(),
        utils = new utilities();

}
