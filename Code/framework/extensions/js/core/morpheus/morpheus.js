/*
    GreyOS - Morpheus (Version: 1.2)

    File name: morpheus.js
    Description: This file contains the Morpheus - Events Manager module.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2023
    Open Software License (OSL 3.0)
*/

// Morpheus
function morpheus()
{
    var self = this;

    function events_scheduler()
    {
        function event_model()
        {
            this.id = null;
            this.cmd = null;
            this.dom_object = null;
        }

        function context_model()
        {
            this.id = null;
            this.events = [];
        }

        function context_manager_model()
        {
            this.uid = null;
            this.context_list = [];
        }

        function uid_exists(uid)
        {
            __loops = __scheduled_events_list.length;

            for (var i = 0; i < __loops; i++)
            {
                if (__scheduled_events_list[i].uid === uid)
                    return true;
            }

            return false;
        };

        function context_exists(uid, context_id)
        {
            __loops = __scheduled_events_list.length;

            for (var i = 0; i < __loops; i++)
            {
                if (__scheduled_events_list[i].uid === uid)
                {
                    var __inner_loops = __scheduled_events_list[i].context_list.length;

                    for (var j = 0; j < __inner_loops; j++)
                    {
                        if (__scheduled_events_list[i].context_list[j].id === context_id)
                            return true;
                    }
                }
            }

            return false;
        };

        function append(uid, context_id, event_object, context_exists = false)
        {
            __loops = __scheduled_events_list.length;

            for (var i = 0; i < __loops; i++)
            {
                if (__scheduled_events_list[i].uid === uid)
                {
                    if (context_exists === true)
                    {
                        var __inner_loops = __scheduled_events_list[i].context_list.length;

                        for (var j = 0; j < __inner_loops; j++)
                        {
                            if (__scheduled_events_list[i].context_list[j].id === context_id)
                            {
                                __scheduled_events_list[i].context_list[j].events.push(event_object);

                                return true;
                            }
                        }
                    }
                    else
                    {
                        var __new_context = new context_model();

                        __new_context.id = context_id;
                        __new_context.events.push(event_object);

                        __scheduled_events_list[i].context_list.push(__new_context);

                        return true;
                    }
                }
            }

            return false;
        }

        function insert(uid, context_object)
        {
            var __new_context_manager = new context_manager_model();

            __new_context_manager.uid = uid;
            __new_context_manager.context_list.push(context_object);

            __scheduled_events_list.push(__new_context_manager);

            return true;
        }

        this.include = function(uid, this_context, this_event, cmd, this_object)
        {
            var __new_event = new event_model();

            __new_event.id = this_event;
            __new_event.cmd = cmd;
            __new_event.dom_object = this_object;

            if (uid_exists(uid))
            {
                var __context_exists = false;

                if (context_exists(uid, this_context))
                    __context_exists = true;

                append(uid, this_context, __new_event, __context_exists);
            }
            else
            {
                var __new_context = new context_model();

                __new_context.id = this_context;
                __new_context.events.push(__new_event);

                insert(uid, __new_context);
            }

            return true;
        };

        this.remove = function(uid, this_event, this_object)
        {
            __loops = __scheduled_events_list.length;

            for (var i = 0; i < __loops; i++)
            {
                if (__scheduled_events_list[i].uid === uid)
                {
                    var __inner_loops = __scheduled_events_list[i].context_list.length;

                    for (var j = 0; j < __inner_loops; j++)
                    {
                        var __events_num = __scheduled_events_list[i].context_list[j].events.length;

                        for (var k = 0; k < __events_num; k++)
                        {
                            if (__scheduled_events_list[i].context_list[j].events[k].id === this_event)
                            {
                                __scheduled_events_list[i].context_list[j].events.splice(k, 1);

                                if (this_object === null)
                                    return true;

                                return utils_sys.events.detach(uid, this_object, this_event);
                            }
                        }
                    }
                }
            }
        };

        this.destroy = function(uid)
        {
            __loops = __scheduled_events_list.length;

            for (var i = 0; i < __loops; i++)
            {
                if (__scheduled_events_list[i].uid === uid)
                {
                    var __inner_loops = __scheduled_events_list[i].context_list.length;

                    for (var j = 0; j < __inner_loops; j++)
                    {
                        var __events_num = __scheduled_events_list[i].context_list[j].events.length;

                        for (var k = 0; k < __events_num; k++)
                        {
                            var __this_object = __scheduled_events_list[i].context_list[j].events[k].dom_object,
                                __this_event = __scheduled_events_list[i].context_list[j].events[k].id;

                            if (__this_object !== null)
                                utils_sys.events.detach(uid, __this_object, __this_event);
                        }
                    }

                    __scheduled_events_list.splice(i, 1);

                    return true;
                }
            }

            return false;
        };

        this.call = function(uid, context_id, event_id)
        {
            __loops = __scheduled_events_list.length;

            for (var i = 0; i < __loops; i++)
            {
                if (__scheduled_events_list[i].uid === uid)
                {
                    var __inner_loops = __scheduled_events_list[i].context_list.length;

                    for (var j = 0; j < __inner_loops; j++)
                    {
                        if (__scheduled_events_list[i].context_list[j].id === context_id)
                        {
                            var __events_num = __scheduled_events_list[i].context_list[j].events.length;

                            for (var k = 0; k < __events_num; k++)
                            {
                                if (__scheduled_events_list[i].context_list[j].events[k].id === event_id)
                                {
                                    if (context_id === 'key' || context_id === 'mouse')
                                    {
                                        var __receiver_object = __scheduled_events_list[i].context_list[j].events[k].dom_object;

                                        utils_sys.events.attach(uid, __receiver_object, event_id, 
                                                                __scheduled_events_list[i].context_list[j].events[k].cmd);
                                    }
                                    else if (context_id === 'controller')
                                        utils_sys.events.attach(uid, window, event_id, __scheduled_events_list[i].context_list[j].events[k].cmd);
                                    else
                                        __scheduled_events_list[i].context_list[j].events[k].cmd.call();
                                }
                            }

                            return true;
                        }
                    }
                }
            }

            return false;
        };

        var __loops = 0,
            __scheduled_events_list = [];
    }

    this.store = function(uid, this_context, this_event, cmd, this_object = null)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(uid) || 
            utils_sys.validation.alpha.is_symbol(this_context) || 
            utils_sys.validation.alpha.is_symbol(this_event) || 
            !utils_sys.validation.misc.is_function(cmd) || 
            (this_object !== null && !utils_sys.validation.misc.is_object(this_object)))
            return false;

        if (backtrace === true)
            frog('MORPHEUS', 'Event :: Store', this_event);

        return global_events_scheduler.include(uid, this_context, this_event, cmd, this_object);
    };

    this.delete = function(uid, this_event, this_object = null)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(uid) || 
            utils_sys.validation.alpha.is_symbol(this_event) || 
            (this_object !== null && !utils_sys.validation.misc.is_object(this_object)))
            return false;

        if (backtrace === true)
            frog('MORPHEUS', 'Event :: Delete', this_event);

        return global_events_scheduler.remove(uid, this_event, this_object);
    };

    this.clear = function(uid)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(uid))
            return false;

        if (backtrace === true)
            frog('MORPHEUS', 'Event :: Clear', 'All for: ' + uid);

        return global_events_scheduler.destroy(uid);
    };

    this.execute = function(uid, this_context, this_event)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        if (utils_sys.validation.alpha.is_symbol(uid) || 
            utils_sys.validation.alpha.is_symbol(this_context) || 
            utils_sys.validation.alpha.is_symbol(this_event))
            return false;

        if (backtrace === true)
            frog('MORPHEUS', 'Event :: Execute', this_event);

        return global_events_scheduler.call(uid, this_context, this_event);
    };

    this.run = function(uid, this_context, this_event, cmd, this_object = null)
    {
        if (utils_sys.validation.misc.is_nothing(cosmos))
            return false;

        self.store(uid, this_context, this_event, cmd, this_object)

        return self.execute(uid, this_context, this_event);
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

        return true;
    };

    var backtrace = false,
        cosmos = null,
        utils_sys = new vulcan(),
        global_events_scheduler = new events_scheduler();
}
