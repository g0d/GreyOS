/*
    Heartbeat (Ping Services)

    File name: heartbeat.js (Version: 0.9)
    Description: This file contains the Heartbeat extension.
    Dependencies: Vulcan, BULL, JAP, Stopwatch and Sensei.

    Coded by George Delaportas (G0D)
    Copyright (C) 2017
    Open Software License (OSL 3.0)
*/

// Heartbeat
function heartbeat(user_config)
{
    var utils = new vulcan(),
        timer = new stopwatch(),
        ajax = new bull(),
        config_parser = new jap(),
        config_definition_model = { "arguments" : [
                                                        {
                                                            "key"     :   { "name" : "interval", "optional" : false },
                                                            "value"   :   { "type" :  "number" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "url", "optional" : true },
                                                            "value"   :   { "type" : "string" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "service_name", "optional" : false },
                                                            "value"   :   { "type" : "string" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "response_timeout", "optional" : false },
                                                            "value"   :   { "type" : "number" }
                                                        },
                                                        {
                                                            "key"     :   { "name" : "on_success", "optional" : false },
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
                                  },
        ajax_config = {
                            "type"          :   "request",
                            "data"          :   "1",
                            "ajax_mode"     :   "asynchronous"
                      };

    if (!config_parser.verify(config_definition_model, user_config))
        return false;

    if (!utils.validation.numerics.is_integer(user_config.interval) || user_config.interval < 1 || 
        utils.validation.misc.is_nothing(user_config.service_name) || 
        !utils.validation.numerics.is_integer(user_config.response_timeout) || user_config.response_timeout < 1)
        return false;

    function message(service, status, callback)
    {
        sensei(service, 'Status: <' + status + '>');

        callback.call(this, service);
    }

    if (utils.validation.misc.is_undefined(user_config.url))
        user_config.url = '';

    ajax_config.url = user_config.url + '/';
    ajax_config.response_timeout = user_config.response_timeout;

    ajax_config.on_success = function(service_name, callback)
                             {
                                 return function()
                                        {
                                            message(service_name, 'SUCCESS', callback);
                                        };
                             }(user_config.service_name, user_config.on_success);

    if (!utils.validation.misc.is_invalid(user_config.on_fail))
    {
        ajax_config.on_fail = function(service_name, callback)
                              {
                                 return function()
                                 {
                                    message(service_name, 'FAIL', callback);
                                 };
                              }(user_config.service_name, user_config.on_fail);
    }

    if (!utils.validation.misc.is_invalid(user_config.on_timeout))
    {
        ajax_config.on_timeout = function(service_name, callback)
                                 {
                                    return function()
                                    {
                                        message(service_name, 'TIMEOUT', callback);
                                    };
                                 }(user_config.service_name, user_config.on_timeout);
    }

    timer.start(user_config.interval, function() { ajax.run(ajax_config); });

    return true;
}
