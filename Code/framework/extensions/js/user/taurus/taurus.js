/*
    Taurus (Advanced AJAX System/Framework)

    File name: taurus.js (Version: 1.0)
    Description: This file contains the Taurus extension.
    Dependencies: Vulcan, JAP and BULL.

    Coded by George Delaportas (G0D)
    Copyright (C) 2022
    Open Software License (OSL 3.0)
*/

// Taurus
function taurus()
{
    // Initialize configuration
    function init_config()
    {
        config_definition_model = { "arguments" :   [
                                                        {
                                                            "key"     :   { "name" : "type", "optional" : false },
                                                            "value"   :   {
                                                                                "type"     :   "string",
                                                                                "choices"  :   ["data", "request"]
                                                                          }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "url", "optional" : false },
                                                            "value"   :   { "type" : "string" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "data", "optional" : false },
                                                            "value"   :   { "type" : "*" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "element_id", "optional" : true },
                                                            "value"   :   { "type" : "string" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "ajax_mode", "optional" : true },
                                                            "value"   :   {
                                                                                "type"     :   "string",
                                                                                "choices"  :   ["asynchronous", "synchronous"]
                                                                          }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "content_fill_mode", "optional" : true },
                                                            "value"   :   {
                                                                                "type"     :   "string",
                                                                                "choices"  :   ["replace", "append"]
                                                                          }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "response_timeout", "optional" : true },
                                                            "value"   :   { "type" : "number" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "on_success", "optional" : true },
                                                            "value"   :   { "type" : "function" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "on_fail", "optional" : true },
                                                            "value"   :   { "type" : "function" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "on_timeout", "optional" : true },
                                                            "value"   :   { "type" : "function" }
                                                        }
                                                    ]
                                   };
    }
    
    function ajax_core()
    {
        var __data_div_id = null,
            __content_fill_mode = null,
            __success_callback = null,
            __timeout_callback = null,
            __fail_callback = null,
            __timer_handler = null,
            __ajax_response = null,
            __is_timeout = false;
        
        function set_callbacks(success_callback, fail_callback, timeout_callback)
        {
            __success_callback = success_callback;
            __fail_callback = fail_callback;
            __timeout_callback = timeout_callback;
        }
        
        function run_bad_callbacks()
        {
            if (__is_timeout === true)
            {
                if (utils.validation.misc.is_function(__timeout_callback))
                    __timeout_callback.call(this);
                else
                {
                    if (utils.validation.misc.is_function(__fail_callback))
                        __fail_callback.call(this);
                }
            }
            else
            {
                if (utils.validation.misc.is_function(__fail_callback))
                    __fail_callback.call(this);
            }
        }
        
        function run_timer(response_timeout)
        {
            if (utils.validation.numerics.is_integer(response_timeout))
                __timer_handler = setTimeout(function() { __is_timeout = true; }, response_timeout);
        }
        
        function stop_timer(timer_handler)
        {
            if (!utils.validation.misc.is_invalid(timer_handler))
                clearTimeout(timer_handler);
        }
        
        this.data = function(url, data, element_id, content_fill_mode, success_callback, fail_callback, response_timeout, timeout_callback)
        {
            __data_div_id = element_id;
            __content_fill_mode = content_fill_mode;
            
            set_callbacks(success_callback, fail_callback, timeout_callback);
            
            run_timer(response_timeout);
            
            fetch(url, {
                            method: 'POST',
                            mode: 'cors',
                            cache: 'no-cache',
                            credentials: 'same-origin',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            redirect: 'error',
                            referrerPolicy: 'no-referrer',
                            body: data
                       }).then((response) => {
                                                stop_timer(__timer_handler);
                                                
                                                if (response.ok)
                                                {
                                                    var __container = utils.objects.by_id(__data_div_id);
                                                    
                                                    if (utils.validation.misc.is_invalid(__container))
                                                        return false;
                                                    
                                                    response.text().then((data) =>
                                                    {
                                                        if (__content_fill_mode === 'replace')
                                                            __container.innerHTML = data;
                                                        else
                                                            __container.innerHTML += data;
                                                        
                                                        if (utils.validation.misc.is_function(__success_callback))
                                                            __success_callback.call(this, data);
                                                    });
                                                }
                                                else
                                                    run_bad_callbacks();
                                             });
            
            return null;
        };
        
        this.request = async function(url, data, success_callback, fail_callback, response_timeout, timeout_callback)
        {
            set_callbacks(success_callback, fail_callback, timeout_callback);
            
            run_timer(response_timeout);
            
            __ajax_response = await fetch(url, {
                                                    method: 'POST',
                                                    mode: 'cors',
                                                    cache: 'no-cache',
                                                    credentials: 'same-origin',
                                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                    redirect: 'error',
                                                    referrerPolicy: 'no-referrer',
                                                    body: data
                                               });
            
            stop_timer(__timer_handler);
            
            if (__ajax_response.ok)
            {
                __ajax_response.text().then((data) =>
                {
                    if (utils.validation.misc.is_function(__success_callback))
                        __success_callback.call(this, data);
                });
            }
            else
                run_bad_callbacks();
            
            return null;
        };
    }
    
    // Run AJAX
    this.run = function(user_config)
    {
        if (!config_parser.verify(config_definition_model, user_config))
            return false;
        
        if (utils.validation.misc.is_nothing(user_config.url) || utils.validation.misc.is_nothing(user_config.data) || 
            !utils.validation.misc.is_invalid(user_config.response_timeout) && 
            (!utils.validation.numerics.is_integer(user_config.response_timeout) || 
             user_config.response_timeout < 1 || user_config.response_timeout > 60000))
            return false;
        
        if (window.fetch)
        {
            if (user_config.type === 'data')                    // AJAX data (Asynchronous)
            {
                if (!utils.validation.misc.is_undefined(user_config.ajax_mode) || 
                    !utils.objects.by_id(user_config.element_id) || utils.validation.misc.is_invalid(user_config.content_fill_mode))
                    return false;
                
                return new ajax_core().data(user_config.url, user_config.data, user_config.element_id, user_config.content_fill_mode, 
                                            user_config.on_success, user_config.on_fail, 
                                            user_config.response_timeout, user_config.on_timeout);
            }
            else                                                // AJAX request (Asynchronous / Synchronous)
            {
                if (user_config.ajax_mode === 'asynchronous')   // Only asynchronous mode is supported by Fetch API
                {
                    if (utils.validation.misc.is_invalid(user_config.ajax_mode))
                        return false;
                    
                    return new ajax_core().request(user_config.url, user_config.data, 
                                                user_config.on_success, user_config.on_fail, 
                                                user_config.response_timeout, user_config.on_timeout);
                }
                else                                            // Use BULL for synchronous mode
                    return new bull().run(user_config);
            }
        }
        else
            return new bull().run(user_config);
    };
    
    var config_definition_model = null,
        utils = new vulcan(),
        config_parser = new jap();
    
    init_config();
}
