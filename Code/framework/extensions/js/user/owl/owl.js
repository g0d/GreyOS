/*
    GreyOS - Owl (Version: 2.2)

    File name: owl.js
    Description: This file contains the Owl - Bee & Bat tracer & status logger module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2022
    Open Software License (OSL 3.0)
*/

// Owl
function owl()
{
    var self = this;
    var bees_status = ['RUN', 'END', 'FAIL'];

    function bees_collection()
    {
        function list()
        {
            function bee_ids()
            {
                this.id = [];
                this.app_id = [];
            }

            this.bee = new bee_ids();
            this.status = [];
            this.epoch = [];
        }

        this.num = 0;
        this.list = new list();
    }

    function bats_collection()
    {
        function list()
        {
            function bat_ids()
            {
                this.id = [];
                this.svc_id = [];
            }

            this.bat = new bat_ids();
            this.status = [];
            this.epoch = [];
        }

        this.num = 0;
        this.list = new list();
    }

    function utilities()
    {
        this.is_valid_status = function(status)
        {
            var __status_num = bees_status.length;

            for (var i = 0; i < __status_num; i++)
            {
                if (status === bees_status[i])
                    return true;
            }

            return false;
        };

        this.match_status = function(status, app_id = null)
        {
            if (app_id === null)
            {
                var __matching_status_app_list = [];

                for (var i = 0; i < collection.num; i++)
                {
                    if (collection.list.status[i] === status)
                    {
                        var __bee_data = {
                                            "id"     :   collection.list.bee.id[i], 
                                            "app_id" :   collection.list.bee.app_id[i]
                                         };

                        __matching_status_app_list.push(__bee_data);
                    }
                }

                return __matching_status_app_list;
            }
            else
            {
                var __app_status_list = [],
                    __app_status_num = 0;

                for (var i = 0; i < collection.num; i++)
                {
                    if (collection.list.bee.app_id[i] === app_id)
                        __app_status_list.push(collection.list.status[i]);
                }

                __app_status_num = __app_status_list.length;

                for (var i = 0; i < __app_status_num; i++)
                {
                    if (__app_status_list[i] === status)
                        return true;
                }
            }

            return false;
        };
    }

    function status()
    {
        function get()
        {
            this.by_id = function(bee_id)
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                if (collection.num === 0)
                    return null;
    
                if (utils_sys.validation.alpha.is_symbol(bee_id))
                    return false;
    
                for (var i = 0; i < collection.num; i++)
                {
                    if (collection.list.bee.id[i] === bee_id)
                        return collection.list.status[i];
                }
    
                return false;
            };

            this.by_app_id = function(app_id, match_status)
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                if (collection.num === 0)
                    return null;

                if (utils_sys.validation.alpha.is_symbol(app_id) || utils_sys.validation.alpha.is_symbol(match_status))
                    return false;

                if (!utils_int.is_valid_status(match_status))
                    return false;

                return utils_int.match_status(match_status, app_id);
            };
        }

        this.set = function(bee_id, app_id, status)
        {
            if (utils_sys.validation.misc.is_nothing(cosmos))
                return false;

            if (!colony.get(bee_id) || utils_sys.validation.alpha.is_symbol(status))
                return false;

            if (!utils_int.is_valid_status(status))
                return false;

            for (var i = 0; i < collection.num; i++)
            {
                if (bee_id === collection.list.bee.id[i] && status === collection.list.status[i])
                {
                    if (backtrace === true)
                        frog('OWL', 'List :: Set', collection);

                    return true;
                }

                if (bee_id === collection.list.bee.id[i] && status !== collection.list.status[i])
                {
                    collection.list.status[i] = status;
                    collection.list.epoch[i] = new Date().getTime();

                    if (backtrace === true)
                        frog('OWL', 'List :: Set', collection);

                    return true;
                }
            }

            var __current_epoch = new Date().getTime();

            collection.list.bee.id.push(bee_id);
            collection.list.bee.app_id.push(app_id);
            collection.list.status.push(status);
            collection.list.epoch.push(__current_epoch);
            collection.num++;

            if (backtrace === true)
                frog('OWL', 'List :: Set', collection);

            return true;
        };

        this.remove = function(bee_id)
        {
            if (utils_sys.validation.misc.is_nothing(cosmos))
                return false;

            if (collection.num === 0)
                return null;

            if (utils_sys.validation.alpha.is_symbol(bee_id))
                return false;

            for (var i = 0; i < collection.num; i++)
            {
                if (collection.list.bee.id[i] === bee_id)
                {
                    collection.list.bee.id.splice(i, 1);
                    collection.list.bee.app_id.splice(i, 1);
                    collection.list.status.splice(i, 1);
                    collection.list.epoch.splice(i, 1);
                    collection.num--;

                    if (backtrace === true)
                        frog('OWL', 'List :: Remove', collection);

                    return true;
                }
            }

            return false;
        };

        this.clear = function()
        {
            if (utils_sys.validation.misc.is_nothing(cosmos))
                return false;

            if (collection.num === 0)
                return false;

            collection = new bees_collection();

            return true;
        };

        this.get = new get();
    }

    this.num = function()
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        return collection.num;
    };

    this.list = function(match_status)
    {
        var __list = null;

        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(match_status))
            return collection;

        if (utils_sys.validation.alpha.is_symbol(match_status))
            return false;

        if (!utils_int.is_valid_status(match_status))
            return false;

        __list = utils_int.match_status(match_status);

        return __list;
    };

    this.backtrace = function(val)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (!utils_sys.validation.misc.is_bool(val))
            return false;

        backtrace = val;

        return true;
    };

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        colony = cosmos.hub.access('colony');
        roost = cosmos.hub.access('roost');

        return true;
    };

    var backtrace = false,
        cosmos = null,
        colony = null,
        roost = null,
        utils_sys = new vulcan(),
        collection = new bees_collection(),
        collection2 = new bats_collection(),
        utils_int = new utilities();

    this.status = new status();
}
