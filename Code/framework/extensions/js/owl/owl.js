/*

    GreyOS Inc. - Owl (Bee models tracer/manager for GreyOS)
    
    File name: owl.js (Version: 1.0)
    Description: This file contains the Owl - Bee models tracer/manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Owl
function owl()
{

    var self = this;

    var models_status = ['RUN', 'END', 'FAIL'];

    function models_collection()
    {

        function list()
        {

            this.model = [];
            this.status = [];

        }

        this.num = 0;
        this.list = new list();

    }

    function status()
    {

        this.get = function(model_id)
        {

            if (collection.num === 0)
                return null;

            if (vulcan.validation.alpha.is_symbol(model_id))
                return false;

            for (var i = 0; i < collection.num; i++)
            {

                if (collection.list.model[i] === model_id)
                    return collection.list.status[i];

            }

            return false;

        };

        this.set = function(model_id, status)
        {

            var __colony = matrix.get('colony');

            if(!__colony.get(model_id) || vulcan.validation.alpha.is_symbol(status))
                return false;

            var __is_valid_status = false,
                __status_num = models_status.length;

            for (var i = 0; i < __status_num; i++)
            {

                if (status === models_status[i])
                {

                    __is_valid_status = true;

                    break;

                }

            }

            if (__is_valid_status === false)
                return false;

            for (var i = 0; i < collection.num; i++)
            {

                if (model_id === collection.list.model[i] && status === collection.list.status[i])
                    return true;

                if (model_id === collection.list.model[i] && status !== collection.list.status[i])
                {

                    collection.list.status[i] = status;

                    return true;

                }

            }

            collection.list.model.push(model_id);
            collection.list.status.push(status);

            collection.num++;

            return true;

        };

        this.remove = function(model_id)
        {

            if (collection.num === 0)
                return null;

            if (vulcan.validation.alpha.is_symbol(model_id))
                return false;

            for (var i = 0; i < collection.num; i++)
            {

                if (collection.list.model[i] === model_id)
                {

                    collection.list.model.splice(i, 1);
                    collection.list.status.splice(i, 1);

                    collection.num--;

                    return true;

                }

            }

            return false;

        };

        this.clear = function()
        {

            if (collection.num === 0)
                return false;

            collection.num = 0;
            collection.list.model = [];
            collection.list.status = [];

            return true;

        };

    }

    this.num = function()
    {

        return collection.num;

    };

    this.list = function(index)
    {

        if (vulcan.validation.misc.is_undefined(index))
            return collection.list;

        if (!vulcan.validation.numerics.is_integer(index) || index < 0 || index > (collection.num - 1))
            return false;

        return { 'model': collection.list.model[index], 'status': collection.list.status[index] };

    };

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        vulcan = cosmos_object.hub.access('vulcan');
        matrix = cosmos_object.hub.access('matrix');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        vulcan = null,
        matrix = null,
        collection = new models_collection();

    this.status = new status();

}
