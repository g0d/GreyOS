/*

    GreyOS Inc. - BULL (AJAX System)
    
    File name: bull.js (Version: 12.0)
    Description: This file contains the BULL - AJAX System extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// BULL
function bull(ajax_data_num, ajax_response_num)
{

    // Initialize global XML HTTP object array
    var __global_xml_http = [];

    // Initialize global div ID array
    var __global_ajax_div_id = [];

    // Declare global AJAX session
    var __global_ajax_session = 0;

    // Declare global response
    var __global_response = null;

    // Declare default AJAX data streams number
    var __default_ajax_data_num = 5;

    // Declare default AJAX response streams number
    var __default_ajax_response_num = 3;

    // Declare max AJAX data streams number
    var __ajax_data_num = __default_ajax_data_num;

    // Declare max AJAX response streams number
    var __ajax_response_num = __default_ajax_response_num;

    // Contenr fill mode (True: Append, False: Replace)
    var __global_content_fill_mode = false;

    // User-specified success callback function
    var __success_callback = null;

    // User-specified fail callback function
    var __fail_callback = null;

    // User-specified request time out
    var __global_request_time_out = 0;

    // Request status
    var __is_request = false;

    // Time out status
    var __is_time_out = false;

    // Declare utilities object reference
    var utils = new utilities();

    function utilities()
    {

        var me = this;

        this.is_undefined = function(val)
        {

            if (val === undefined)
                return true;

            return false;

        };

        this.is_nothing = function(val)
        {

            if (val === null || val === '')
                return true;

            return false;

        };

        this.is_invalid = function(val)
        {

            if (me.is_undefined(val) || val === null || val === '')
                return true;

            return false;

        };

        this.is_bool = function(val)
        {

            if (typeof val === 'boolean')
                return true;

            return false;

        };

        this.is_integer = function(val)
        {

            if (!isNaN(val) && (val % 1 === 0))
                return true;

            return false;

        };

        this.is_function = function(val)
        {

            if (typeof val === 'function')
                return true;

            return false;

        };

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

    // Initialize an AJAX object
    function init()
    {

        // Initialize global XML HTTP objects
        if (utils.is_undefined(ajax_data_num) && utils.is_undefined(ajax_response_num))
        {

            var __total_ajax_sessions = __default_ajax_data_num + __default_ajax_response_num;

            for (var i = 0; i < __total_ajax_sessions; i++)
                __global_xml_http[i] = new utils.ajax_object();

        }
        
        else
        {

            if (!utils.is_integer(ajax_data_num) || !utils.is_integer(ajax_response_num))
                return false;

            var __total_ajax_sessions = ajax_data_num + ajax_response_num;

            for (var i = 0; i < __total_ajax_sessions; i++)
                __global_xml_http[i] = new utils.ajax_object();

            __ajax_data_num = ajax_data_num;
            __ajax_response_num = ajax_response_num;

        }

        return true;

    }

    // State Changed - Trace changes of AJAX object
    function state_changed()
    {

        if (__is_time_out === true)
            return false;

        if (__global_xml_http[__global_ajax_session].readyState === 4)
        {

            if (__global_xml_http[__global_ajax_session].status === 200)
            {

                __global_response = null;

                if (__is_request === false)
                {

                    if (__global_ajax_div_id[__global_ajax_session] === null)
                        __global_response = __global_xml_http[__global_ajax_session].responseText;

                    else
                    {

                        var __response = null,
                            __container = document.getElementById(__global_ajax_div_id[__global_ajax_session]);

                        if (utils.is_invalid(__container))
                            return false;

                        __response = __global_xml_http[__global_ajax_session].responseText;

                        if (__global_content_fill_mode === false)
                            __container.innerHTML = __response;

                        else
                            __container.innerHTML += __response;

                    }

                }

                if (utils.is_function(__success_callback))
                {

                    __success_callback.call();

                    __success_callback = null;

                }

                return true;

            }

            else
            {

                if (utils.is_function(__fail_callback))
                {

                    __fail_callback.call();

                    __fail_callback = null;

                }

            }

        }

        return false;

    }

    // AJAX data (Synchronous / Asynchronous)
    this.data = function(url, data, element_id, ajax_mode, ajax_session, 
                         content_fill_mode, success_callback, request_time_out, fail_callback)
    {

        if (utils.is_invalid(url) || (utils.is_invalid(data) && data !== '') || utils.is_invalid(element_id) || 
            (!utils.is_integer(ajax_mode) || ajax_mode < 1 || ajax_mode > 2) || 
            (!utils.is_integer(ajax_session) || ajax_session < 1 || ajax_session > __ajax_data_num) || 
            (!utils.is_invalid(content_fill_mode) && !utils.is_bool(content_fill_mode)) || 
            (ajax_mode === 2 && (!utils.is_invalid(success_callback) || !utils.is_invalid(fail_callback))) || 
            (!utils.is_invalid(request_time_out) && (!utils.is_integer(request_time_out) || request_time_out < 1)))
            return false;

        __global_ajax_session = ajax_session - 1;

        __global_ajax_div_id[__global_ajax_session] = element_id;

        __global_content_fill_mode = content_fill_mode;

        if (utils.is_integer(request_time_out))
        {

            __global_request_time_out = request_time_out;

            setTimeout(function() { __is_time_out = true; }, __global_request_time_out);

        }

        // Asynchronous transfer mode
        if (ajax_mode === 1)
        {

            __success_callback = success_callback;
            __fail_callback = fail_callback;

            __global_xml_http[__global_ajax_session].open('POST', url, true);
            __global_xml_http[__global_ajax_session].setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
            __global_xml_http[__global_ajax_session].onreadystatechange = state_changed;
            __global_xml_http[__global_ajax_session].send(data);

        }

        // Synchronous transfer mode
        if (ajax_mode === 2)
        {

            __global_xml_http[__global_ajax_session].open('POST', url, false);
            __global_xml_http[__global_ajax_session].setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            __global_xml_http[__global_ajax_session].send(data);
            state_changed();

        }

        if (element_id === null && __global_response !== null && !utils.is_undefined(__global_response))
            return __global_response;

        return null;

    };

    // AJAX request (Asynchronous)
    this.request = function(url, data, ajax_session, success_callback, request_time_out, fail_callback)
    {

        if (utils.is_invalid(url) || (utils.is_invalid(data) && data !== '') || 
            !utils.is_integer(ajax_session) || ajax_session < 1 || ajax_session > __ajax_data_num || 
            (!utils.is_undefined(success_callback) & utils.is_nothing(success_callback)) || 
            (!utils.is_undefined(fail_callback) & utils.is_nothing(fail_callback)) || 
            (!utils.is_invalid(request_time_out) && (!utils.is_integer(request_time_out) || request_time_out < 1)))
            return false;

        __is_request = true;

        __global_ajax_session = ajax_session - 1;

        if (utils.is_integer(request_time_out))
        {

            __global_request_time_out = request_time_out;

            setTimeout(function() { __is_time_out = true; }, __global_request_time_out);

        }

        __success_callback = success_callback;
        __fail_callback = fail_callback;

        __global_xml_http[__global_ajax_session].open('POST', url, true);
        __global_xml_http[__global_ajax_session].setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
        __global_xml_http[__global_ajax_session].onreadystatechange = state_changed;
        __global_xml_http[__global_ajax_session].send(data);

        return null;

    };

    // AJAX response (Synchronous)
    this.response = function(url, data, ajax_session, request_time_out)
    {

        if (utils.is_invalid(url) || (utils.is_invalid(data) && data !== '') || 
            (!utils.is_integer(ajax_session) || ajax_session < 1) || 
            (!utils.is_integer(ajax_session) || ajax_session > __ajax_response_num) || 
            (!utils.is_invalid(request_time_out) && (!utils.is_integer(request_time_out) || request_time_out < 1)))
            return false;

        __global_ajax_session = ajax_session + 4;

        __global_ajax_div_id[__global_ajax_session] = null;

        if (utils.is_integer(request_time_out))
        {

            __global_request_time_out = request_time_out;

            setTimeout(function() { __is_time_out = true; }, __global_request_time_out);

        }

        __global_xml_http[__global_ajax_session].open('POST', url, false);
        __global_xml_http[__global_ajax_session].setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        __global_xml_http[__global_ajax_session].send(data);
        state_changed();

        if (__global_response !== null && !utils.is_undefined(__global_response))
            return __global_response;

        return false;

    };

    // Initialize global XML HTTP objects
    init();

}
