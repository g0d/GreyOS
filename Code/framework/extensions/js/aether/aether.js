/*

    GreyOS Inc. - Aether (Client<--->Server - AJAX Traffic Controller [ATC] for GreyOS)
    
    File name: aether.js (Version: 1.1)
    Description: This file contains the Aether - ATC extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Aether
function aether()
{

    var self = this;

    function utilities()
    {

        this.ajax_object = function()
        {

            var xml_http = null;

            if (window.XMLHttpRequest)
                xml_http = new XMLHttpRequest();

            else
                xml_http = new ActiveXObject("Microsoft.XMLHTTP");

            return xml_http;

        };

    }

    function bull_model(ajax_data_num, ajax_response_num)
    {

        function ajax_settings_model()
        {

            this.xml_http = [];
            this.div_id = [];
            this.session = 0;
            this.response = null;
            this.data_num = 1;
            this.response_num = 1;

        }

        function instance_settings_model()
        {

            this.content_fill_mode = false;
            this.success_callback = null;
            this.fail_callback = null;
            this.request_time_out = null;
            this.is_request = false;
            this.is_time_out = false;

        }

        function init()
        {

            if (vulcan.validation.misc.is_undefined(ajax_data_num) && vulcan.validation.misc.is_undefined(ajax_response_num))
            {

                for (var i = 0; i < 2; i++)
                     ajax_settings.xml_http[i] = new utils.ajax_object();

            }

            else
            {

                if (!vulcan.validation.numerics.is_integer(ajax_data_num) || 
                    !vulcan.validation.numerics.is_integer(ajax_response_num))
                    return false;

                var __total_ajax_sessions = ajax_data_num + ajax_response_num;

                for (var i = 0; i < __total_ajax_sessions; i++)
                    ajax_settings.xml_http[i] = new utils.ajax_object();

                ajax_settings.data_num = ajax_data_num;
                ajax_settings.response_num = ajax_response_num;

            }

            return true;

        }

        function state_changed()
        {

            if (instance_settings.is_time_out === true)
                return false;

            if (ajax_settings.xml_http[ajax_settings.session].readyState === 4)
            {

                if (ajax_settings.xml_http[ajax_settings.session].status === 200)
                {

                    ajax_settings.response = null;

                    if (instance_settings.is_request === false)
                    {

                        if (ajax_settings.div_id[ajax_settings.session] === null)
                            ajax_settings.response = ajax_settings.xml_http[ajax_settings.session].responseText;

                        else
                        {

                            var __response = null,
                                __container = vulcan.objects.by_id(ajax_settings.div_id[ajax_settings.session]);

                            if (vulcan.validation.misc.is_invalid(__container))
                                return false;

                            __response = ajax_settings.xml_http[ajax_settings.session].responseText;

                            if (instance_settings.content_fill_mode === false)
                                __container.innerHTML = __response;

                            else
                                __container.innerHTML += __response;

                        }

                    }

                    if (vulcan.validation.misc.is_function(instance_settings.success_callback))
                    {

                        instance_settings.success_callback.call();

                        instance_settings.success_callback = null;

                    }

                    return true;

                }

                else
                {

                    if (vulcan.validation.misc.is_function(instance_settings.fail_callback))
                    {

                        instance_settings.fail_callback.call();

                        instance_settings.fail_callback = null;

                    }

                }

            }

            return false;

        }

        this.data = function(url, data, element_id, ajax_mode, ajax_session, 
                             content_fill_mode, success_callback, request_time_out, fail_callback)
        {

            if (vulcan.validation.misc.is_invalid(url) || (vulcan.validation.misc.is_invalid(data) && data !== '') || 
                vulcan.validation.misc.is_invalid(element_id) || 
                (!vulcan.validation.numerics.is_integer(ajax_mode) || ajax_mode < 1 || ajax_mode > 2) || 
                (!vulcan.validation.numerics.is_integer(ajax_session) || 
                 ajax_session < 1 || ajax_session > ajax_settings.data_num) || 
                (!vulcan.validation.misc.is_invalid(content_fill_mode) && !vulcan.validation.misc.is_bool(content_fill_mode)) || 
                (ajax_mode === 2 && (!vulcan.validation.misc.is_invalid(success_callback) || 
                 !vulcan.validation.misc.is_invalid(fail_callback))) || 
                (!vulcan.validation.misc.is_invalid(request_time_out) && 
                 (!vulcan.validation.numerics.is_integer(request_time_out) || request_time_out < 1)))
                return false;

            ajax_settings.session = ajax_session - 1;

            ajax_settings.div_id[ajax_settings.session] = element_id;

            instance_settings.content_fill_mode = content_fill_mode;

            if (vulcan.validation.numerics.is_integer(request_time_out))
            {

                instance_settings.request_time_out = request_time_out;

                setTimeout(function() { instance_settings.is_time_out = true; }, instance_settings.request_time_out);

            }

            if (ajax_mode === 1)
            {

                instance_settings.success_callback = success_callback;
                instance_settings.fail_callback = fail_callback;

                ajax_settings.xml_http[ajax_settings.session].onreadystatechange = state_changed;
                ajax_settings.xml_http[ajax_settings.session].open('POST', url, true);
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Accept-encoding', 'UTF-8');
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Content-length', data.length);
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Connection', 'close');
                ajax_settings.xml_http[ajax_settings.session].send(data);

            }

            if (ajax_mode === 2)
            {

                ajax_settings.xml_http[ajax_settings.session].open('POST', url, false);
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Accept-encoding', 'UTF-8');
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Content-length', data.length);
                ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Connection', 'close');
                ajax_settings.xml_http[ajax_settings.session].send(data);
                state_changed();

            }

            if (element_id === null && ajax_settings.response !== null && !vulcan.validation.misc.is_undefined(ajax_settings.response))
                return ajax_settings.response;

            return null;

        };

        this.request = function(url, data, ajax_session, success_callback, request_time_out, fail_callback)
        {

            if (vulcan.validation.misc.is_invalid(url) || (vulcan.validation.misc.is_invalid(data) && data !== '') || 
                !vulcan.validation.numerics.is_integer(ajax_session) || ajax_session < 1 || ajax_session > ajax_settings.data_num || 
                (!vulcan.validation.misc.is_undefined(success_callback) && vulcan.validation.misc.is_nothing(success_callback)) || 
                (!vulcan.validation.misc.is_undefined(fail_callback) && vulcan.validation.misc.is_nothing(fail_callback)) || 
                (!vulcan.validation.misc.is_invalid(request_time_out) && (!vulcan.validation.numerics.is_integer(request_time_out) || request_time_out < 1)))
                return false;

            instance_settings.is_request = true;

            ajax_settings.session = ajax_session - 1;

            if (vulcan.validation.numerics.is_integer(request_time_out))
            {

                instance_settings.request_time_out = request_time_out;

                setTimeout(function() { instance_settings.is_time_out = true; }, instance_settings.request_time_out);

            }

            instance_settings.success_callback = success_callback;
            instance_settings.fail_callback = fail_callback;

            ajax_settings.xml_http[ajax_settings.session].onreadystatechange = state_changed;
            ajax_settings.xml_http[ajax_settings.session].open('POST', url, true);
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Accept-encoding', 'UTF-8');
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Content-length', data.length);
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader ('Connection', 'close');
            ajax_settings.xml_http[ajax_settings.session].send(data);

            return null;

        };

        this.response = function(url, data, ajax_session, request_time_out)
        {

            if (vulcan.validation.misc.is_invalid(url) || (vulcan.validation.misc.is_invalid(data) && data !== '') || 
                (!vulcan.validation.numerics.is_integer(ajax_session) || ajax_session < 1) || 
                (!vulcan.validation.numerics.is_integer(ajax_session) || ajax_session > ajax_settings.response_num) || 
                (!vulcan.validation.misc.is_invalid(request_time_out) && 
                 (!vulcan.validation.numerics.is_integer(request_time_out) || request_time_out < 1)))
                return false;

            ajax_settings.session = ajax_session + 4;

            ajax_settings.div_id[ajax_settings.session] = null;

            if (vulcan.validation.numerics.is_integer(request_time_out))
            {

                instance_settings.request_time_out = request_time_out;

                setTimeout(function() { instance_settings.is_time_out = true; }, instance_settings.request_time_out);

            }

            ajax_settings.xml_http[ajax_settings.session].open('POST', url, false);
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Accept-encoding', 'UTF-8');
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Content-length', data.length);
            ajax_settings.xml_http[ajax_settings.session].setRequestHeader('Connection', 'close');
            ajax_settings.xml_http[ajax_settings.session].send(data);
            state_changed();

            if (ajax_settings.response !== null && !vulcan.validation.misc.is_undefined(ajax_settings.response))
                return ajax_settings.response;

            return false;

        };

        var ajax_settings = new ajax_settings_model(),
            instance_settings = new instance_settings_model();

        init();

    }

    function queue_model()
    {

        this.num = 0;
        this.list = [];

    }

    function queue()
    {

        function queue_task_model()
        {

            this.app_id = null;
            this.priority = null;
            this.ajax_model = null;
            this.user_callback = null;

        }

        function data_model()
        {

            this.url = null;
            this.data = null;
            this.element_id = null;
            this.ajax_mode = null;
            this.ajax_session = null;
            this.content_fill_mode = null;
            this.success_callback = null;
            this.request_time_out = null;
            this.fail_callback = null;

        }

        function request_model()
        {

            this.url = null;
            this.data = null;
            this.ajax_session = null;
            this.success_callback = null;
            this.request_time_out = null;
            this.fail_callback = null;

        }

        function response_model()
        {

            this.url = null;
            this.data = null;
            this.ajax_session = null;
            this.request_time_out = null;

        }

        this.data = function(ref_id, priority, params_array, callback)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.alpha.is_symbol(ref_id) || !vulcan.validation.numerics.is_integer(priority) || 
                !vulcan.validation.misc.is_array(params_array) || params_array.length < 6 || params_array.length > 9 || 
                !vulcan.validation.misc.is_function(callback))
                return false;

            var __new_data_model = new data_model(),
                __new_task = new queue_task_model();

            __new_data_model.url = params_array[0];
            __new_data_model.data = params_array[1];
            __new_data_model.element_id = params_array[2];
            __new_data_model.ajax_mode = params_array[3];
            __new_data_model.ajax_session = params_array[4];
            __new_data_model.content_fill_mode = params_array[5];
            
            if (params_array.length === 7)
                __new_data_model.success_callback = params_array[6];

            if (params_array.length === 8)
                __new_data_model.request_time_out = params_array[7];

            if (params_array.length === 9)
                __new_data_model.fail_callback = params_array[8];

            __new_task.app_id = ref_id;
            __new_task.priority = priority;
            __new_task.ajax_model = __new_data_model;
            __new_task.user_callback = callback;

            queue_manager.list.push(__new_task);
            queue_manager.num++;

            return true;

        };

        this.request = function(ref_id, priority, params_array, callback)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.alpha.is_symbol(ref_id) || !vulcan.validation.numerics.is_integer(priority) || 
                !vulcan.validation.misc.is_array(params_array) || params_array.length < 3 || params_array.length > 6 || 
                !vulcan.validation.misc.is_function(callback))
                return false;

            var __new_request_model = new request_model(),
                __new_task = new queue_task_model();

            __new_request_model.url = params_array[0];
            __new_request_model.data = params_array[1];
            __new_request_model.ajax_session = params_array[2];
            
            if (params_array.length === 4)
                __new_request_model.success_callback = params_array[3];

            if (params_array.length === 5)
                __new_request_model.request_time_out = params_array[4];

            if (params_array.length === 6)
                __new_request_model.fail_callback = params_array[5];

            __new_task.app_id = ref_id;
            __new_task.priority = priority;
            __new_task.ajax_model = __new_request_model;
            __new_task.user_callback = callback;

            queue_manager.list.push(__new_task);
            queue_manager.num++;

            return true;

        };

        this.response = function(ref_id, priority, params_array, callback)
        {

            if (is_init === false)
                return false;

            if (vulcan.validation.alpha.is_symbol(ref_id) || !vulcan.validation.numerics.is_integer(priority) || 
                !vulcan.validation.misc.is_array(params_array) || params_array.length < 3 || params_array.length > 4 || 
                !vulcan.validation.misc.is_function(callback))
                return false;

            var __new_response_model = new response_model(),
                __new_task = new queue_task_model();

            __new_response_model.url = params_array[0];
            __new_response_model.data = params_array[1];
            __new_response_model.ajax_session = params_array[2];

            if (params_array.length === 4)
                __new_response_model.request_time_out = params_array[3];

            __new_task.app_id = ref_id;
            __new_task.priority = priority;
            __new_task.ajax_model = __new_response_model;
            __new_task.user_callback = callback;

            queue_manager.list.push(__new_task);
            queue_manager.num++;

            return true;

        };

    };

    function queue_scheduler()
    {

        var __interval_reference = null;

        function process_tasks()
        {

            var __bull = new bull_model();

            

            return true;

        }

        this.work = function(custom_interval)
        {

            var __interval = 10;

            if (!vulcan.validation.misc.is_undefined(custom_interval))
            {

                if (!vulcan.validation.numerics.is_integer(custom_interval) || custom_interval < 1 || custom_interval > 1000)
                    return false;

                __interval = custom_interval;

            }

            __interval_reference = setInterval(function() { process_tasks(); }, __interval);

            return true;

        };

    }

    function quality_of_services()
    {

        function traffic_shaper()
        {

            

            return true;

        }

        function priority_control()
        {

            

            return true;

        }

        function latency_tester()
        {

            

            return true;

        }

        this.traffic_shaper = new traffic_shaper();
        this.priority_control = new priority_control();
        this.latency_tester = new latency_tester();

    }

    this.init = function(interval)
    {

        if (is_init === true)
            return false;

        is_init = true;

        scheduler.work(interval);

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
        is_init = false,
        cosmos = null,
        vulcan = null,
        queue_manager = new queue_model(),
        scheduler = new queue_scheduler(),
        qos = new quality_of_services(),
        utils = new utilities();

    this.queue = new queue();

}
