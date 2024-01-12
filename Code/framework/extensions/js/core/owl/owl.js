/*
    GreyOS - Owl (Version: 2.5)

    File name: owl.js
    Description: This file contains the Owl - Process (Bee & Bat) tracer & status logger module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Owl
function owl()
{
    var self = this;
    var process_status = ['RUN', 'END', 'FAIL'];

    function bee_collection_model()
    {
        function list()
        {
            function bee_ids()
            {
                this.sys_id = [];
                this.proc_id = [];
            }

            this.process = new bee_ids();
            this.status = [];
            this.epoch = [];
        }

        this.num = 0;
        this.list = new list();
    }

    function bat_collection_model()
    {
        function list()
        {
            function bat_ids()
            {
                this.sys_id = [];
                this.proc_id = [];
            }

            this.process = new bat_ids();
            this.status = [];
            this.epoch = [];
        }

        this.num = 0;
        this.list = new list();
    }

    function utilities()
    {
        var me = this;

        function factory_process()
        {
            this.type_matching_status = function(collection, status, process_type)
            {
                var __status_process_list = [];

                for (var i = 0; i < collection.num; i++)
                {
                    if (collection.list.status[i] === status)
                    {
                        var __process_data = {
                                                "sys_id"    :   collection.list.process.sys_id[i], 
                                                "proc_id"   :   collection.list.process.proc_id[i],
                                                "type"      :   process_type
                                             };

                        __status_process_list.push(__process_data);
                    }
                }

                return __status_process_list;
            };
    
            this.id_matching_status = function(collection, status, process_id)
            {
                var __status_list = [],
                    __status_num = 0;

                for (var i = 0; i < collection.num; i++)
                {
                    if (collection.list.process.proc_id[i] === process_id)
                        __status_list.push(collection.list.status[i]);
                }

                __status_num = __status_list.length;

                for (var i = 0; i < __status_num; i++)
                {
                    if (__status_list[i] === status)
                        return true;
                }

                return false;
            };
    
            this.get_proc_by_sys_id = function(collection, sys_id)
            {
                if (collection.num === 0)
                    return null;

                if (utils_sys.validation.alpha.is_symbol(sys_id))
                    return false;

                for (var i = 0; i < collection.num; i++)
                {
                    if (collection.list.process.sys_id[i] === sys_id)
                        return collection.list.status[i];
                }

                return false;
            };
    
            this.get_proc_by_proc_id = function(collection, proc_id, match_status)
            {
                if (collection.num === 0)
                    return null;

                if (utils_sys.validation.alpha.is_symbol(proc_id) || utils_sys.validation.alpha.is_symbol(match_status))
                    return false;

                if (!me.is_valid_status(match_status))
                    return false;

                return me.match_status(match_status, null, proc_id);
            };

            this.set_proc_status = function(collection, sys_id, proc_id, status)
            {
                if (utils_sys.validation.alpha.is_symbol(sys_id) || utils_sys.validation.alpha.is_symbol(proc_id) || utils_sys.validation.alpha.is_symbol(status))
                    return false;

                if (!utils_int.is_valid_status(status))
                    return false;

                for (var i = 0; i < collection.num; i++)
                {
                    if (sys_id === collection.list.process.sys_id[i] && status === collection.list.status[i])
                    {
                        if (backtrace === true)
                            frog('OWL', 'List :: Set', collection);

                        return true;
                    }

                    if (sys_id === collection.list.process.sys_id[i] && status !== collection.list.status[i])
                    {
                        collection.list.status[i] = status;
                        collection.list.epoch[i] = new Date().getTime();

                        if (backtrace === true)
                            frog('OWL', 'List :: Set', collection);

                        return true;
                    }
                }

                var __current_epoch = new Date().getTime();

                collection.list.process.sys_id.push(sys_id);
                collection.list.process.proc_id.push(proc_id);
                collection.list.status.push(status);
                collection.list.epoch.push(__current_epoch);
                collection.num++;

                if (backtrace === true)
                    frog('OWL', 'List :: Set', collection);

                return true;
            };

            this.remove_proc_status = function(collection, sys_id)
            {
                if (collection.num === 0)
                    return null;

                if (utils_sys.validation.alpha.is_symbol(sys_id))
                    return false;

                for (var i = 0; i < collection.num; i++)
                {
                    if (collection.list.process.sys_id[i] === sys_id)
                    {
                        collection.list.process.sys_id.splice(i, 1);
                        collection.list.process.proc_id.splice(i, 1);
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
        }

        this.is_valid_status = function(status)
        {
            var __status_num = process_status.length;

            for (var i = 0; i < __status_num; i++)
            {
                if (status === process_status[i])
                    return true;
            }

            return false;
        };

        this.match_status = function(status, process_type = null, process_id = null)
        {
            if (process_id === null)
            {
                var __matching_status_process_list = [];

                if (process_type === null)
                {
                    __matching_status_process_list.push(me.factory.type_matching_status(bee_collection, status, 'app'));
                    __matching_status_process_list.push(me.factory.type_matching_status(bat_collection, status, 'svc'));
                }
                else if (process_type === 'app')
                    __matching_status_process_list = me.factory.type_matching_status(bee_collection, status, process_type);
                else
                    __matching_status_process_list = me.factory.type_matching_status(bat_collection, status, process_type);                

                return __matching_status_process_list;
            }
            else
            {
                if (me.factory.id_matching_status(bee_collection, status, process_id) === false)
                    return me.factory.id_matching_status(bat_collection, status, process_id);
                else
                    return true;
            }
        };

        this.factory = new factory_process();
    }

    function status()
    {
        function apps()
        {
            function get()
            {
                this.by_sys_id = function(bee_id)
                {
                    if (utils_sys.validation.misc.is_nothing(cosmos))
                        return false;

                    return utils_int.factory.get_proc_by_sys_id(bee_collection, bee_id);
                };

                this.by_proc_id = function(app_id, match_status)
                {
                    if (utils_sys.validation.misc.is_nothing(cosmos))
                        return false;

                    return utils_int.factory.get_proc_by_proc_id(bee_collection, app_id, match_status);
                };
            }

            this.set = function(bee_id, app_id, status)
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                if (!colony.get(bee_id))
                    return false;

                return utils_int.factory.set_proc_status(bee_collection, bee_id, app_id, status);
            };

            this.remove = function(bee_id)
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                return utils_int.factory.remove_proc_status(bee_collection, bee_id);
            };

            this.clear = function()
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                bee_collection = new bee_collection_model();

                return true;
            };

            this.get = new get();
        }

        function svcs()
        {
            function get()
            {
                this.by_sys_id = function(bat_id)
                {
                    if (utils_sys.validation.misc.is_nothing(cosmos))
                        return false;

                    return utils_int.factory.get_proc_by_sys_id(bat_collection, bat_id);
                };

                this.by_proc_id = function(svc_id, match_status)
                {
                    if (utils_sys.validation.misc.is_nothing(cosmos))
                        return false;

                    return utils_int.factory.get_proc_by_proc_id(bat_collection, svc_id, match_status);
                };
            }

            this.set = function(bat_id, svc_id, status)
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                if (!roost.get(bat_id))
                    return false;

                return utils_int.factory.set_proc_status(bat_collection, bat_id, svc_id, status);
            };

            this.remove = function(bat_id)
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                return utils_int.factory.remove_proc_status(bat_collection, bat_id);
            };

            this.clear = function()
            {
                if (utils_sys.validation.misc.is_nothing(cosmos))
                    return false;

                bat_collection = new bat_collection_model();

                return true;
            };

            this.get = new get();
        }

        this.clear_all = function()
        {
            if (utils_sys.validation.misc.is_nothing(cosmos))
                return false;

            bee_collection = new bee_collection_model();
            bat_collection = new bat_collection_model();

            return true;
        };

        this.applications = new apps();
        this.services = new svcs();
    }

    this.num = function(process_type)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.misc.is_undefined(process_type))
            return (bee_collection.num + bat_collection.num);

        if (process_type === 'app')
            return bee_collection.num;
        else if (process_type === 'svc')
            return bat_collection.num;

        return false;
    };

    this.list = function(match_status, process_type = null)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(match_status))
            return false;

        if (!utils_int.is_valid_status(match_status))
            return false;

        if (process_type === null)
            return utils_int.match_status(match_status);
        else
        {
            if (process_type !== 'app' && process_type !== 'svc')
                return false;

            return utils_int.match_status(match_status, process_type);
        }
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
        bee_collection = new bee_collection_model(),
        bat_collection = new bat_collection_model(),
        utils_int = new utilities();

    this.status = new status();
}
