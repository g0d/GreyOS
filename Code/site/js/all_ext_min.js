
function ajax_factory(method = 'post', ajax_data, success_cb = null, failure_cb = null, default_cb = null)
{
 var ajax = new bull(),
 utils = new vulcan(),
 ajax_config = {
 "type" : "request",
 "url" : "/",
 "data" : ajax_data,
 "method" : method,
 "ajax_mode" : "asynchronous",
 "on_success" : function(response)
 {
 if (response !== '0' && response !== '-1' && response !== 'undefined')
 {
 if (success_cb !== null)
 success_cb.call(this, response);
 }
 else
 {
 if (failure_cb !== null)
 failure_cb.call(this, response);
 }
 if (default_cb !== null)
 default_cb.call(this);
 }
 };
 if ((success_cb !== null && !utils.validation.misc.is_function(success_cb)) ||
 (failure_cb !== null && !utils.validation.misc.is_function(failure_cb)) ||
 (default_cb !== null && !utils.validation.misc.is_function(default_cb)))
 return false;
 ajax.run(ajax_config);
 return true;
}
function bull()
{
 function init_config()
 {
 config_definition_model = { "arguments" : [
 {
 "key" : { "name" : "type", "optional" : false },
 "value" : {
 "type" : "string",
 "choices" : ["data", "request"]
 }
 },
 {
 "key" : { "name" : "url", "optional" : false },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "data", "optional" : true },
 "value" : { "type" : "*" }
 },
 {
 "key" : { "name" : "element_id", "optional" : true },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "method", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : ["get", "post"]
 }
 },
 {
 "key" : { "name" : "ajax_mode", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : ["asynchronous", "synchronous"]
 }
 },
 {
 "key" : { "name" : "content_fill_mode", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : ["replace", "append"]
 }
 },
 {
 "key" : { "name" : "response_timeout", "optional" : true },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "on_success", "optional" : true },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "on_fail", "optional" : true },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "on_timeout", "optional" : true },
 "value" : { "type" : "function" }
 }
 ]
 };
 }
 function ajax_core()
 {
 function ajax_model()
 {
 this.http_session = function(url, data, method, mode)
 {
 __xml_http.open(method.toUpperCase(), url, mode);
 if (method === 'post' && !utils.validation.misc.is_object(data))
 __xml_http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
 __xml_http.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
 if (mode === true)
 __xml_http.onreadystatechange = state_changed;
 __xml_http.send(data);
 if (mode === false)
 state_changed();
 };
 this.create_object = function()
 {
 var __xml_http_obj = null;
 if (window.XMLHttpRequest)
 __xml_http_obj = new XMLHttpRequest();
 else
 __xml_http_obj = new ActiveXObject("Microsoft.XMLHTTP");
 return __xml_http_obj;
 };
 }
 function state_changed()
 {
 if (__xml_http.readyState === 4)
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
 return false;
 }
 stop_timer(__timer_handler);
 __ajax_response = null;
 __is_timeout = false;
 if (__xml_http.status === 200)
 {
 if (__data_div_id === null)
 __ajax_response = __xml_http.responseText;
 else
 {
 var __container = utils.objects.by_id(__data_div_id);
 if (utils.validation.misc.is_invalid(__container))
 return false;
 __ajax_response = __xml_http.responseText;
 if (__content_fill_mode === 'replace')
 __container.innerHTML = __ajax_response;
 else
 __container.innerHTML += __ajax_response;
 }
 if (utils.validation.misc.is_function(__success_callback))
 __success_callback.call(this, result());
 }
 else
 {
 if (utils.validation.misc.is_function(__fail_callback))
 __fail_callback.call(this);
 return false;
 }
 }
 return true;
 }
 function result()
 {
 if (utils.validation.misc.is_undefined(__ajax_response))
 return null;
 return __ajax_response;
 }
 function init_ajax()
 {
 __xml_http = ajax.create_object();
 }
 function set_callbacks(success_callback, fail_callback, timeout_callback)
 {
 __success_callback = success_callback;
 __fail_callback = fail_callback;
 __timeout_callback = timeout_callback;
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
 ajax.http_session(url, data, 'post', true);
 return null;
 };
 this.request = function(url, data, method, ajax_mode, success_callback, fail_callback, response_timeout, timeout_callback)
 {
 set_callbacks(success_callback, fail_callback, timeout_callback);
 run_timer(response_timeout);
 if (ajax_mode === 'asynchronous')
 ajax.http_session(url, data, method, true);
 else
 {
 ajax.http_session(url, data, method, false);
 if (!utils.validation.misc.is_invalid(__ajax_response))
 return __ajax_response;
 }
 return null;
 };
 var __xml_http = null,
 __data_div_id = null,
 __content_fill_mode = null,
 __success_callback = null,
 __timeout_callback = null,
 __fail_callback = null,
 __timer_handler = null,
 __ajax_response = null,
 __is_timeout = false,
 ajax = new ajax_model();
 init_ajax();
 }
 this.run = function(user_config)
 {
 if (!config_parser.verify(config_definition_model, user_config))
 return false;
 if (utils.validation.misc.is_nothing(user_config.url) ||
 !utils.validation.misc.is_invalid(user_config.response_timeout) &&
 (!utils.validation.numerics.is_integer(user_config.response_timeout) ||
 user_config.response_timeout < 1 || user_config.response_timeout > 60000))
 return false;
 if (utils.validation.misc.is_invalid(user_config.data))
 user_config.data = null;
 if (user_config.type === 'data') // [AJAX Data] => Modes: Asynchronous / Methods: POST
 {
 if (utils.validation.misc.is_invalid(user_config.data) ||
 !utils.validation.misc.is_invalid(user_config.method) || !utils.validation.misc.is_invalid(user_config.ajax_mode) ||
 !utils.objects.by_id(user_config.element_id) || utils.validation.misc.is_invalid(user_config.content_fill_mode))
 return false;
 return new ajax_core().data(user_config.url, user_config.data, user_config.element_id, user_config.content_fill_mode,
 user_config.on_success, user_config.on_fail,
 user_config.response_timeout, user_config.on_timeout);
 }
 else // [AJAX Request] => Modes: Asynchronous, Synchronous / Methods: GET, POST
 {
 if (utils.validation.misc.is_invalid(user_config.ajax_mode))
 return false;
 if (utils.validation.misc.is_invalid(user_config.method))
 user_config.method = 'get';
 else
 user_config.method = user_config.method.toLowerCase();
 return new ajax_core().request(user_config.url, user_config.data, user_config.method, user_config.ajax_mode,
 user_config.on_success, user_config.on_fail,
 user_config.response_timeout, user_config.on_timeout);
 }
 };
 var config_definition_model = null,
 utils = new vulcan(),
 config_parser = new jap();
 init_config();
}
function centurion()
{
 function epoch()
 {
 return new Date().getTime();
 }
 function actions_model()
 {
 this.started = false;
 this.ended = false;
 this.latency_set = false;
 }
 function results_model()
 {
 this.initial_msec = -1;
 this.final_msec = -1;
 this.latency = -1;
 }
 function benchmark()
 {
 this.start = function()
 {
 if (actions_list.started)
 return false;
 results_list.initial_msec = epoch();
 actions_list.started = true;
 actions_list.ended = false;
 actions_list.latency_set = false;
 return true;
 };
 this.end = function()
 {
 if (!actions_list.started)
 return false;
 results_list.final_msec = epoch();
 actions_list.started = false;
 actions_list.ended = true;
 return true;
 };
 this.latency = function()
 {
 if (!actions_list.ended)
 return false;
 results_list.latency = results_list.final_msec - results_list.initial_msec;
 actions_list.started = false;
 actions_list.latency_set = true;
 return results_list.latency;
 };
 }
 function status()
 {
 function actions()
 {
 this.is_started = function()
 {
 return actions_list.started;
 };
 this.is_ended = function()
 {
 return actions_list.ended;
 };
 this.is_latency_set = function()
 {
 return actions_list.latency_set;
 };
 }
 function results()
 {
 this.initial_msec = function()
 {
 return results_list.initial_msec;
 };
 this.final_msec = function()
 {
 return results_list.final_msec;
 };
 this.latency = function()
 {
 return results_list.latency;
 };
 }
 this.actions = new actions();
 this.results = new results();
 }
 function init()
 {
 self.benchmark = new benchmark();
 self.status = new status();
 }
 var self = this,
 actions_list = new actions_model(),
 results_list = new results_model();
 init();
}
function content_fetcher(content_id, language_code, success_cb, failure_cb, default_cb)
{
 var data = null,
 utils = new vulcan();
 if (utils.validation.misc.is_undefined(content_id))
 return false;
 if (!utils.validation.alpha.is_string(content_id) ||
 (!utils.validation.misc.is_nothing(language_code) &&
 !utils.validation.alpha.is_string(language_code)))
 return false;
 if (!utils.validation.misc.is_function(success_cb) ||
 !utils.validation.misc.is_function(failure_cb) ||
 !utils.validation.misc.is_function(default_cb))
 return false;
 data = "gate=content&content_id=" + content_id;
 if (!utils.validation.misc.is_nothing(language_code))
 data += '&language_code=' + language_code;
 ajax_factory('post', data, success_cb, failure_cb, default_cb);
 return true;
}
function heartbeat(user_config)
{
 var utils = new vulcan(),
 timer = new stopwatch(),
 ajax = new bull(),
 config_parser = new jap(),
 config_definition_model = { "arguments" : [
 {
 "key" : { "name" : "interval", "optional" : false },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "url", "optional" : true },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "service_name", "optional" : false },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "response_timeout", "optional" : false },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "on_success", "optional" : false },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "on_fail", "optional" : true },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "on_timeout", "optional" : true },
 "value" : { "type" : "function" }
 }
 ]
 },
 ajax_config = {
 "type" : "request",
 "method" : "post",
 "ajax_mode" : "asynchronous"
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
 ajax_config.url = user_config.url;
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
function jap()
{
 function has_unknown_keywords(definition_model)
 {
 if (!utils.validation.misc.is_object(definition_model))
 return false;
 var __index = null,
 __attribute = null,
 __option = null,
 __property = null;
 for (__index in definition_model)
 {
 __attribute = definition_model[__index];
 if (!utils.validation.misc.is_object(__attribute))
 {
 if (!utils.misc.contains(__index, def_keywords))
 return true;
 continue;
 }
 if ((utils.validation.misc.is_object(__attribute) && Object.getOwnPropertyNames(__attribute).length === 0) ||
 (utils.validation.misc.is_array(__attribute) && __attribute.length === 0))
 return true;
 for (__option in __attribute)
 {
 if (utils.validation.misc.is_object(__attribute[__option]))
 {
 for (__property in __attribute[__option])
 {
 if (utils.validation.numerics.is_number(__option))
 continue;
 if (!utils.misc.contains(__property, def_keywords))
 return true;
 if (has_unknown_keywords(__attribute[__option][__property]))
 return true;
 }
 }
 else
 {
 if (!utils.misc.contains(__option, def_keywords))
 return true;
 if (has_unknown_keywords(__attribute[__option]))
 return true;
 }
 }
 }
 return false;
 }
 this.define = function(definition_model)
 {
 if (!utils.validation.misc.is_object(definition_model))
 {
 sensei('J.A.P', 'Invalid definition model!');
 return false;
 }
 if (definition_model.length === 0)
 {
 sensei('J.A.P', 'The definition model is null!');
 return false;
 }
 if (has_unknown_keywords(definition_model))
 {
 sensei('J.A.P', 'The definition model contains unknown keywords!');
 return false;
 }
 var __this_key = null,
 __this_value = null;
 is_model_defined = false;
 if (definition_model.hasOwnProperty('ignore_keys_num') && !utils.validation.misc.is_bool(definition_model.ignore_keys_num))
 {
 sensei('J.A.P', 'Missing or invalid "ignore_keys_num" attribute!');
 return false;
 }
 if (!definition_model.hasOwnProperty('arguments') || !utils.validation.misc.is_object(definition_model.arguments))
 {
 sensei('J.A.P', 'Missing or invalid "arguments" attribute!');
 return false;
 }
 def_model_args = definition_model.arguments;
 for (counter = 0; counter < def_model_args.length; counter++)
 {
 if (!utils.validation.misc.is_object(def_model_args[counter]))
 {
 sensei('J.A.P', 'Invalid JSON object in "arguments" attribute!');
 return false;
 }
 if (!def_model_args[counter].hasOwnProperty('key') || !def_model_args[counter].hasOwnProperty('value'))
 {
 sensei('J.A.P', 'Missing "key" or "value" mandatory attributes!');
 return false;
 }
 __this_key = def_model_args[counter].key;
 __this_value = def_model_args[counter].value;
 if (!utils.validation.misc.is_object(__this_key) || !utils.validation.misc.is_object(__this_value))
 {
 sensei('J.A.P', 'A "key" or "value" attribute does not point to a JSON object!');
 return false;
 }
 if (!__this_key.hasOwnProperty('name') || !__this_key.hasOwnProperty('optional'))
 {
 sensei('J.A.P', 'Missing "name" or "optional" mandatory properties!');
 return false;
 }
 if (!utils.validation.alpha.is_string(__this_key.name) || !utils.validation.misc.is_bool(__this_key.optional))
 {
 sensei('J.A.P', 'Invalid specification for "name" or "optional" property!');
 return false;
 }
 if (!__this_value.hasOwnProperty('type'))
 {
 sensei('J.A.P', 'Missing "type" mandatory property!');
 return false;
 }
 if (!utils.validation.alpha.is_string(__this_value.type) || !utils.misc.contains(__this_value.type, all_value_types))
 {
 sensei('J.A.P', 'Invalid specification for "type" property!');
 return false;
 }
 if (__this_value.hasOwnProperty('choices'))
 {
 if (!utils.misc.contains(__this_value.type, types_with_choices))
 {
 sensei('J.A.P', 'This type does not support the "choices" option!');
 return false;
 }
 if (!utils.validation.misc.is_array(__this_value.choices) || __this_value.choices.length < 1)
 {
 sensei('J.A.P', 'The "choices" option has to be an array with at least\none element!');
 return false;
 }
 }
 if (__this_value.hasOwnProperty('length'))
 {
 if (utils.misc.contains(__this_value.type, uncountable_value_types))
 {
 sensei('J.A.P', 'This type does not support the "length" option!');
 return false;
 }
 if (!utils.validation.numerics.is_integer(__this_value.length) || __this_value.length < 1)
 {
 sensei('J.A.P', 'The "length" option has to be a positive integer!');
 return false;
 }
 }
 if (__this_value.hasOwnProperty('regex'))
 {
 if (utils.misc.contains(__this_value.type, uncountable_value_types) || __this_value.type === 'array')
 {
 sensei('J.A.P', 'This type does not support the "regex" option!');
 return false;
 }
 if (!utils.validation.misc.is_object(__this_value.regex) || __this_value.regex === '')
 {
 sensei('J.A.P', 'Invalid "regex" option!');
 return false;
 }
 }
 }
 is_model_defined = true;
 json_def_model = definition_model;
 return true;
 };
 this.validate = function(config)
 {
 if (!is_model_defined)
 {
 sensei('J.A.P', 'No definition model was specified!');
 return false;
 }
 if (!utils.validation.misc.is_object(config))
 {
 sensei('J.A.P', 'Invalid JSON object!');
 return false;
 }
 var __json_key = null,
 __this_key = null,
 __this_value = null,
 __is_multiple_keys_array = false,
 __keys_exist = 0,
 __mandatory_keys_not_found = 0,
 __model_keywords = [];
 def_model_args = json_def_model.arguments;
 if (utils.validation.misc.is_array(config))
 __is_multiple_keys_array = true;
 for (counter = 0; counter < def_model_args.length; counter++)
 {
 for (__json_key in def_model_args[counter])
 {
 if (!utils.validation.misc.is_undefined(def_model_args[counter][__json_key].name))
 __model_keywords.push(def_model_args[counter][__json_key].name);
 }
 }
 for (__json_key in config)
 {
 if (__is_multiple_keys_array)
 __mandatory_keys_not_found = 0;
 for (counter = 0; counter < def_model_args.length; counter++)
 {
 __this_key = def_model_args[counter].key;
 if (__is_multiple_keys_array)
 {
 for (__this_value in config[__json_key])
 {
 if (!utils.misc.contains(__this_value, __model_keywords))
 {
 sensei('J.A.P', 'Unknown keyword: "' + __this_value + '" in the configuration model!');
 return false;
 }
 }
 }
 else
 {
 if (!utils.misc.contains(__json_key, __model_keywords))
 {
 sensei('J.A.P', 'Unknown keyword: "' + __json_key + '" in the configuration model!');
 return false;
 }
 }
 if (__this_key.optional === false)
 {
 if (__is_multiple_keys_array)
 {
 if (!config[__json_key].hasOwnProperty(__this_key.name))
 __mandatory_keys_not_found++;
 }
 else
 {
 if (!config.hasOwnProperty(__this_key.name))
 __mandatory_keys_not_found++;
 }
 }
 }
 if (__is_multiple_keys_array && __mandatory_keys_not_found > 0)
 break;
 __keys_exist++;
 }
 if ((!json_def_model.hasOwnProperty('ignore_keys_num') || json_def_model.ignore_keys_num === false) &&
 __mandatory_keys_not_found > 0)
 {
 sensei('J.A.P', 'Mandatory properties are missing!');
 return false;
 }
 if (__keys_exist === 0)
 {
 sensei('J.A.P', 'The JSON object is null!');
 return false;
 }
 for (counter = 0; counter < def_model_args.length; counter++)
 {
 __this_key = def_model_args[counter].key;
 __this_value = def_model_args[counter].value;
 if (__this_value.type !== '*')
 {
 if (__this_value.type === 'null')
 {
 if (config[__this_key.name] !== null)
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "null" values!');
 return false;
 }
 }
 else if (__this_value.type === 'number')
 {
 if (__is_multiple_keys_array)
 {
 for (__json_key in config)
 {
 if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
 continue;
 if (utils.validation.misc.is_nothing(config[__json_key][__this_key.name].toString().trim()) ||
 !utils.validation.numerics.is_number(Number(config[__json_key][__this_key.name])))
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "numeric" values!');
 return false;
 }
 }
 }
 else
 {
 if (utils.validation.misc.is_undefined(config[__this_key.name]))
 continue;
 if (utils.validation.misc.is_nothing(config[__this_key.name].toString().trim()) ||
 !utils.validation.numerics.is_number(Number(config[__this_key.name])))
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "numeric" values!');
 return false;
 }
 }
 }
 else if (__this_value.type === 'array')
 {
 if (!utils.validation.misc.is_array(config[__this_key.name]))
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" accepts only "array" values!');
 return false;
 }
 }
 else
 {
 if (__is_multiple_keys_array)
 {
 for (__json_key in config)
 {
 if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
 continue;
 if (typeof config[__json_key][__this_key.name] !== __this_value.type)
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" has a type mismatch!');
 return false;
 }
 }
 }
 else
 {
 if (utils.validation.misc.is_undefined(config[__this_key.name]))
 continue;
 if (typeof config[__this_key.name] !== __this_value.type)
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" has a type mismatch!');
 return false;
 }
 }
 }
 }
 if (__this_value.hasOwnProperty('choices'))
 {
 if (__is_multiple_keys_array)
 {
 for (__json_key in config)
 {
 if (utils.validation.misc.is_undefined(config[__json_key][__this_key.name]))
 continue;
 if (!utils.misc.contains(config[__json_key][__this_key.name], __this_value.choices))
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" does not contain any\ndefined choices!');
 return false;
 }
 }
 }
 else
 {
 if (utils.validation.misc.is_undefined(config[__this_key.name]))
 continue;
 if (!utils.misc.contains(config[__this_key.name], __this_value.choices))
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" does not contain any\ndefined choices!');
 return false;
 }
 }
 }
 if (__this_value.hasOwnProperty('length'))
 {
 if (__this_value.type === 'array')
 {
 if (config[__this_key.name].length > __this_value.length)
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" has exceeded the defined length!');
 return false;
 }
 }
 else
 {
 if (config[__this_key.name].toString().length > __this_value.length)
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" has exceeded the defined length!');
 return false;
 }
 }
 }
 if (__this_value.hasOwnProperty('regex'))
 {
 if (!utils.validation.utilities.reg_exp(__this_value.regex, config[__this_key.name]))
 {
 sensei('J.A.P', 'Argument: "' + __this_key.name + '" has not matched the specified regex!');
 return false;
 }
 }
 }
 return true;
 };
 this.verify = function(definition_model, config)
 {
 if (self.define(definition_model))
 return self.validate(config);
 return false;
 };
 var self = this,
 is_model_defined = false,
 counter = 0,
 json_def_model = null,
 def_model_args = null,
 def_keywords = ['ignore_keys_num', 'arguments', 'key', 'value', 'name', 'optional', 'type', 'choices', 'length', 'regex'],
 all_value_types = ['number', 'string', 'boolean', 'array', 'object', 'function', 'null', '*'],
 uncountable_value_types = ['boolean', 'object', 'function', 'null', '*'],
 types_with_choices = ['number', 'string', 'array'],
 utils = new vulcan();
}
function key_manager()
{
 var __keyboard_key = null;
 function key_constants()
 {
 this.ESCAPE = 27;
 this.ENTER = 13;
 this.BACKSPACE = 8;
 this.TAB = 9;
 this.SHIFT = 16;
 this.CONTROL = 17;
 this.ALT = 18;
 }
 this.scan = function(key_event)
 {
 try
 {
 if (typeof key_event.keyCode === 'undefined')
 __keyboard_key = key_event.button;
 else
 __keyboard_key = key_event.keyCode;
 return true;
 }
 catch(e)
 {
 console.log(e);
 return false;
 }
 };
 this.get = function()
 {
 return __keyboard_key;
 };
 this.keys = new key_constants();
}
function msgbox()
{
 var self = this;
 function types_model()
 {
 this.OK = 0;
 this.OK_CANCEL = 1;
 this.YES_NO = 2;
 this.YES_NO_CANCEL = 3;
 }
 function general_helpers()
 {
 var me = this;
 this.draw_screen = function(container_id)
 {
 var __container = utils.objects.by_id(container_id),
 __html = null;
 if (!__container || utils.validation.misc.is_undefined(__container))
 return false;
 msgbox_object = utils.objects.by_id('msgbox');
 if (msgbox_object)
 {
 try
 {
 __container.removeChild(msgbox_object);
 }
 catch
 {
 var __previous_container = msgbox_object.parentNode;
 __previous_container.removeChild(msgbox_object);
 }
 }
 msgbox_object = document.createElement('div');
 msgbox_object.id = 'msgbox';
 msgbox_object.className = 'mb_screen';
 var __win_title = msgbox_object.id + '_title',
 __button_title = msgbox_object.id + '_button';
 __html = '<div class="msg_window">' +
 ' <div id="' + __win_title + '"></div>' +
 ' <div id="' + msgbox_object.id + '_content"></div>' +
 ' <div id="' + msgbox_object.id + '_buttons_area">' +
 ' <div id="' + __button_title + '_1" class="msgbox_button">OK</div>' +
 ' </div>' +
 '</div>';
 msgbox_object.innerHTML = __html;
 __container.appendChild(msgbox_object);
 return true;
 };
 this.show_win = function(title, message, type)
 {
 if (timer !== null)
 clearTimeout(timer);
 msgbox_object.childNodes[0].childNodes[1].innerHTML = title;
 msgbox_object.childNodes[0].childNodes[3].innerHTML = message;
 var __container = utils.objects.by_id(msgbox_object.id + '_buttons_area'),
 __var_dynamic_label_button_1 = 'OK',
 __var_dynamic_label_button_2 = 'Cancel',
 __button_object = null;
 __container.innerHTML = '';
 __container.classList.remove('mb_buttons_triple');
 __button_object = document.createElement('div');
 __button_object.id = msgbox_object.id + '_button_1';
 __button_object.className = 'msgbox_button';
 __button_object.innerHTML = __var_dynamic_label_button_1;
 __container.appendChild(__button_object);
 utils.events.attach(__button_object.id, __button_object, 'click',
 () =>
 {
 if (global_hide_callbacks.length > 0)
 global_hide_callbacks[0].call(this);
 me.hide_win();
 });
 if (type === self.types.OK_CANCEL || type === self.types.YES_NO)
 {
 if (type === self.types.YES_NO)
 {
 __var_dynamic_label_button_1 = 'Yes';
 __var_dynamic_label_button_2 = 'No';
 }
 __button_object.style.float = 'left';
 __button_object.innerHTML = __var_dynamic_label_button_1;
 __button_object = document.createElement('div');
 __button_object.id = msgbox_object.id + '_button_2';
 __button_object.className = 'msgbox_button';
 __button_object.style.float = 'right';
 __button_object.innerHTML = __var_dynamic_label_button_2;
 __container.appendChild(__button_object);
 utils.events.attach(__button_object.id, __button_object, 'click',
 () =>
 {
 if (global_hide_callbacks.length > 1)
 global_hide_callbacks[1].call(this);
 me.hide_win();
 });
 }
 else if (type === self.types.YES_NO_CANCEL)
 {
 __container.classList.add('mb_buttons_triple');
 __button_object.classList.add('mb_triple');
 __button_object.innerHTML = 'Yes';
 __button_object = document.createElement('div');
 __button_object.id = msgbox_object.id + '_button_2';
 __button_object.className = 'msgbox_button mb_triple';
 __button_object.innerHTML = 'No';
 __container.appendChild(__button_object);
 utils.events.attach(__button_object.id, __button_object, 'click',
 () =>
 {
 if (global_hide_callbacks.length > 1)
 global_hide_callbacks[1].call(this);
 me.hide_win();
 });
 __button_object = document.createElement('div');
 __button_object.id = msgbox_object.id + '_button_3';
 __button_object.className = 'msgbox_button mb_triple';
 __button_object.innerHTML = 'Cancel';
 __container.appendChild(__button_object);
 utils.events.attach(__button_object.id, __button_object, 'click',
 () =>
 {
 if (global_hide_callbacks.length > 2)
 global_hide_callbacks[2].call(this);
 me.hide_win();
 });
 }
 msgbox_object.style.visibility = 'visible';
 msgbox_object.classList.remove('mb_fade_out');
 msgbox_object.classList.add('mb_fade_in');
 global_type = type;
 is_open = true;
 };
 this.hide_win = function()
 {
 if (timer !== null)
 clearTimeout(timer);
 msgbox_object.style.visibility = 'visible';
 msgbox_object.classList.remove('mb_fade_in');
 msgbox_object.classList.add('mb_fade_out');
 timer = setTimeout(function() { msgbox_object.style.visibility = 'hidden'; }, 250);
 global_hide_callbacks = [];
 is_open = false;
 };
 }
 this.is_open = function()
 {
 if (!is_init)
 return false;
 return is_open;
 };
 this.show = function(title, message, type = self.types.OK, hide_callback_array = [])
 {
 if (!is_init || is_open ||
 !utils.validation.alpha.is_string(title) ||
 !utils.validation.alpha.is_string(message))
 return false;
 if (!utils.validation.misc.is_invalid(hide_callback_array) &&
 !utils.validation.misc.is_array(hide_callback_array))
 return false;
 if (hide_callback_array.length > 0 && ((global_type === self.types.OK && hide_callback_array.length > 1) ||
 ((global_type === self.types.OK_CANCEL || global_type === self.types.YES_NO) && hide_callback_array.length > 2) ||
 (global_type === self.types.YES_NO_CANCEL && hide_callback_array.length > 3)))
 return false;
 var __found = false;
 for (var [__key, __value] of Object.entries(self.types))
 {
 if (__value === type)
 {
 __found = true;
 break;
 }
 }
 if (!__found)
 return false;
 for (var i = 0; i < hide_callback_array.length; i++)
 {
 if (!utils.validation.misc.is_function(hide_callback_array[i]))
 return false;
 global_hide_callbacks.push(hide_callback_array[i]);
 }
 helpers.show_win(title, message, type);
 return true;
 };
 this.hide = function(hide_callback_array = [])
 {
 if (!is_init || !is_open)
 return false;
 if (!utils.validation.misc.is_invalid(hide_callback_array) &&
 !utils.validation.misc.is_array(hide_callback_array))
 return false;
 if (hide_callback_array.length > 0 && ((global_type === self.types.OK && hide_callback_array.length > 1) ||
 ((global_type === self.types.OK_CANCEL || global_type === self.types.YES_NO) && hide_callback_array.length > 2) ||
 (global_type === self.types.YES_NO_CANCEL && hide_callback_array.length > 3)))
 return false;
 for (var i = 0; i < hide_callback_array.length; i++)
 {
 if (!utils.validation.misc.is_function(hide_callback_array[i]))
 return false;
 global_hide_callbacks.push(hide_callback_array[i]);
 }
 helpers.hide_win();
 return true;
 };
 this.init = function(container_id)
 {
 if (is_init)
 return false;
 if (utils.validation.misc.is_invalid(container_id) || !utils.validation.alpha.is_string(container_id))
 return false;
 utils.graphics.apply_theme('/framework/extensions/js/core/msgbox', 'msgbox');
 if (!helpers.draw_screen(container_id))
 return false;
 is_init = true;
 return true;
 };
 var is_init = false,
 is_open = false,
 msgbox_object = null,
 global_type = null,
 global_hide_callbacks = [],
 timer = null,
 helpers = new general_helpers(),
 utils = new vulcan();
 this.types = new types_model();
}
function pythia()
{
 function loop(rnd_num)
 {
 var __results_length = results.length,
 __index = 0;
 if (__results_length === 0 || rnd_num >= results[__results_length - 1])
 {
 if (rnd_num === max_random_num)
 return rnd_num;
 else
 {
 if (rnd_num === results[__results_length - 1])
 rnd_num++;
 results.push(rnd_num);
 return rnd_num;
 }
 }
 for (__index = 0; __index < __results_length; __index++)
 {
 if (rnd_num === results[__index])
 rnd_num++;
 else
 {
 if (rnd_num < results[__index])
 {
 results.splice(__index, 0, rnd_num);
 break;
 }
 }
 }
 return rnd_num;
 }
 this.generate = function()
 {
 var __this_rnd_num = Math.floor((Math.random() * max_random_num) + 1);
 return loop(__this_rnd_num);
 };
 this.load = function(values_array)
 {
 if (!utils.validation.misc.is_array(values_array) || values_array.length === 0)
 return false;
 var __index = 0,
 __values_length = values_array.length;
 for (__index = 0; __index++; __index < __values_length)
 {
 if (!utils.validation.numerics.is_integer(values_array[__index]))
 {
 results = [];
 return false;
 }
 results.push(values_array[__index]);
 }
 return true;
 };
 this.reset = function()
 {
 results = [];
 return null;
 };
 var max_random_num = Number.MAX_SAFE_INTEGER,
 results = [],
 utils = new vulcan();
}
function sensei(title, message)
{
 var __index = 0,
 __stars = '',
 utils = new vulcan();
 if ((!utils.validation.misc.is_invalid(title) && !utils.validation.alpha.is_string(title)) ||
 (!utils.validation.misc.is_invalid(message) && !utils.validation.alpha.is_string(message)))
 return false;
 for (__index = 0; __index < title.length; __index++)
 __stars += '*';
 console.log('-------------------------- ' + title + ' --------------------------');
 console.log(message);
 console.log('-------------------------- ' + __stars + ' --------------------------');
 console.log('');
 return true;
}
function stopwatch()
{
 function instance(interval, callback)
 {
 if (!is_on)
 return;
 clearTimeout(timer_handler);
 callback.call(this, self);
 if (is_one_shot)
 {
 is_on = false;
 return;
 }
 delay += interval;
 diff = (new Date().getTime() - init_time) - delay;
 timer_handler = setTimeout(function() { instance(interval, callback); }, (interval - diff));
 }
 this.start = function(interval, callback, run_once)
 {
 if (is_on)
 return false;
 if (!utils.validation.numerics.is_integer(interval) || interval < 1 ||
 !utils.validation.misc.is_function(callback) ||
 (!utils.validation.misc.is_undefined(run_once) && !utils.validation.misc.is_bool(run_once)))
 return false;
 timer_handler = setTimeout(function() { instance(interval, callback); }, interval);
 is_on = true;
 is_one_shot = run_once;
 return true;
 };
 this.stop = function()
 {
 if (!is_on)
 return false;
 clearTimeout(timer_handler);
 is_on = false;
 return true;
 };
 var self = this,
 is_on = false,
 is_one_shot = false,
 init_time = new Date().getTime(),
 delay = 0,
 diff = 0,
 timer_handler = null,
 utils = new vulcan();
}
function vulcan()
{
 function validation()
 {
 function alpha()
 {
 var __self = this;
 this.is_string = function(val)
 {
 if (typeof val !== 'string')
 return false;
 return true;
 };
 this.is_symbol = function(val)
 {
 if (!__self.is_string(val))
 return false;
 if (val.match(/[!$%^&*()+\-|~=`{}\[\]:";'<>?,\/]/))
 return true;
 return false;
 };
 this.is_blank = function(val)
 {
 if (!__self.is_string(val))
 return false;
 if (!val.trim())
 return true;
 return false;
 };
 }
 function numerics()
 {
 var __self = this;
 this.is_number = function(val)
 {
 if (self.validation.misc.is_array(val) && val.length === 0)
 return false;
 if (!isNaN(val - parseFloat(val)))
 return true;
 return false;
 };
 this.is_integer = function(val)
 {
 if (__self.is_number(val) && (val % 1 === 0) && !self.misc.contains('.', val.toString()))
 return true;
 return false;
 };
 this.is_float = function(val)
 {
 if (val === 0.0)
 return true;
 if (__self.is_number(val) && (val % 1 !== 0))
 return true;
 return false;
 };
 }
 function misc()
 {
 var __self = this;
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
 this.is_bool = function(val)
 {
 if (typeof val === 'boolean')
 return true;
 return false;
 };
 this.is_array = function(val)
 {
 if (Array.isArray(val))
 return true;
 return false;
 };
 this.is_function = function(val)
 {
 if (typeof val === 'function')
 return true;
 return false;
 };
 this.is_object = function(val)
 {
 if (typeof val === 'object')
 return true;
 return false;
 };
 this.is_invalid = function(val)
 {
 if (__self.is_undefined(val) || __self.is_nothing(val))
 return true;
 return false;
 };
 }
 function utilities()
 {
 this.is_email = function(val)
 {
 var __pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 return __pattern.test(String(val).toLowerCase());
 };
 this.is_phone = function(val)
 {
 var __pattern = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
 return __pattern.test(String(val).toLowerCase());
 };
 this.reg_exp = function(pattern, expression)
 {
 return pattern.test(String(expression)).toLowerCase();
 };
 }
 this.alpha = new alpha();
 this.numerics = new numerics();
 this.misc = new misc();
 this.utilities = new utilities();
 }
 function events()
 {
 function controller()
 {
 var __controlling_list = [];
 function caller_model()
 {
 this.caller_id = null;
 this.object_events = [];
 }
 function object_events_model()
 {
 this.object = null;
 this.events = [];
 }
 function final_event(caller_index, object_index, event_index, func)
 {
 var __result = __controlling_list[caller_index].object_events[object_index].events[event_index][func];
 __controlling_list[caller_index].object_events[object_index].events.splice(event_index, 1);
 return __result;
 }
 this.insert = function(caller_id, object, func, handler)
 {
 var __counter_i = 0,
 __counter_j = 0,
 __callers = __controlling_list.length,
 __this_control_list = null,
 __objects_num = 0,
 __func_handler = [];
 for (__counter_i = 0; __counter_i < __callers; __counter_i++)
 {
 __this_control_list = __controlling_list[__counter_i];
 if (__this_control_list.caller_id === caller_id)
 {
 __objects_num = __this_control_list.object_events.length;
 for (__counter_j = 0; __counter_j < __objects_num; __counter_j++)
 {
 if (__this_control_list.object_events[__counter_j].object === object)
 {
 __func_handler[func] = handler;
 __this_control_list.object_events[__counter_j].events.push(__func_handler);
 return true;
 }
 }
 }
 }
 var __new_caller_model = new caller_model(),
 __new_object_events_model = new object_events_model();
 __func_handler[func] = handler;
 __new_object_events_model.object = object;
 __new_object_events_model.events.push(__func_handler);
 __new_caller_model.caller_id = caller_id;
 __new_caller_model.object_events.push(__new_object_events_model);
 __controlling_list.push(__new_caller_model);
 return true;
 };
 this.fetch = function(caller_id, object, func, handler)
 {
 var __counter_i = 0,
 __counter_j = 0,
 __counter_k = 0,
 __callers = __controlling_list.length,
 __objects_num = 0,
 __control_list_i = null,
 __control_list_j = null,
 __control_list_k = null;
 for (__counter_i = 0; __counter_i < __callers; __counter_i++)
 {
 __control_list_i = __controlling_list[__counter_i];
 if (__control_list_i.caller_id === caller_id)
 {
 __objects_num = __control_list_i.object_events.length;
 for (__counter_j = 0; __counter_j < __objects_num; __counter_j++)
 {
 __control_list_j = __control_list_i.object_events[__counter_j];
 if (__control_list_j.object === object)
 {
 var __events = __control_list_j.events.length;
 for (__counter_k = 0; __counter_k < __events; __counter_k++)
 {
 __control_list_k = __control_list_j.events[__counter_k];
 if (self.validation.misc.is_invalid(handler))
 {
 if (self.validation.misc.is_undefined(__control_list_k[func]))
 continue;
 return final_event(__counter_i, __counter_j, __counter_k, func);
 }
 else
 {
 if (self.validation.misc.is_undefined(__control_list_k[func]))
 continue;
 if (!self.validation.misc.is_function(handler))
 return false;
 var __this_handler = __control_list_k[func];
 if (__this_handler.toString() === handler.toString())
 return final_event(__counter_i, __counter_j, __counter_k, func);
 }
 }
 }
 }
 }
 }
 return false;
 };
 }
 this.attach = function(caller_id, object, func, handler)
 {
 if (self.validation.alpha.is_symbol(caller_id) ||
 self.validation.misc.is_invalid(object) || !self.validation.misc.is_object(object) ||
 self.validation.alpha.is_symbol(func) || !self.validation.misc.is_function(handler))
 return false;
 if (object.tagName === 'SELECT' ||
 self.validation.misc.is_undefined(object.length) ||
 self.validation.misc.is_undefined(object.item)) // Single element
 {
 if (!__controller.insert(caller_id, object, func, handler))
 return false;
 object.addEventListener(func, handler, false);
 }
 else // Multiple elements
 {
 var __counter_i = 0,
 __object_length = object.length;
 for (__counter_i = 0; __counter_i < __object_length; __counter_i++)
 {
 if (!__controller.insert(caller_id, object[__counter_i], func, handler))
 return false;
 object[__counter_i].addEventListener(func, handler, false);
 }
 }
 return true;
 };
 this.detach = function(caller_id, object, func, handler)
 {
 if (self.validation.alpha.is_symbol(caller_id) ||
 self.validation.misc.is_invalid(object) || !self.validation.misc.is_object(object) ||
 self.validation.alpha.is_symbol(func))
 return false;
 var __handler = null;
 if (object.tagName === 'SELECT' ||
 self.validation.misc.is_undefined(object.length) ||
 self.validation.misc.is_undefined(object.item)) // Single element
 {
 __handler = __controller.fetch(caller_id, object, func, handler);
 if (!__handler)
 return false;
 object.removeEventListener(func, __handler, false);
 }
 else // Multiple elements
 {
 var __counter_i = 0,
 __object_length = object.length;
 for (__counter_i = 0; __counter_i < __object_length; __counter_i++)
 {
 __handler = __controller.fetch(caller_id, object[__counter_i], func, handler);
 if (!__handler)
 return false;
 object[__counter_i].removeEventListener(func, __handler, false);
 }
 }
 return true;
 };
 var __controller = new controller();
 }
 function conversions()
 {
 this.object_to_array = function(conversion_mode, model)
 {
 return Object.keys(model).map(function(key)
 {
 if (conversion_mode === true)
 return [key, model[key]];
 else
 return model[key];
 });
 };
 this.replace_link = function(mode, text, attributes, url_info)
 {
 if (!self.validation.numerics.is_integer(mode) || mode < 0 || mode > 2 || !self.validation.alpha.is_string(text))
 return false;
 if (!self.validation.misc.is_undefined(attributes))
 {
 if (attributes !== null)
 {
 if (!self.validation.misc.is_object(attributes))
 return false;
 var __this_attribute = null,
 __final_attributes = null,
 __valid_attributes = ['id', 'class', 'style', 'title', 'dir', 'lang', 'accesskey', 'tabindex',
 'contenteditable', 'draggable', 'spellcheck', 'target', 'rel'];
 for (__this_attribute in attributes)
 {
 if (!self.misc.contains(__this_attribute, __valid_attributes) && __this_attribute.indexOf('data-') !== 0)
 return false;
 __final_attributes += __this_attribute + '="' + attributes[__this_attribute] + '" ';
 }
 }
 }
 if (mode === 1)
 {
 var __match = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
 if (self.validation.misc.is_undefined(__final_attributes))
 return text.replace(__match, "<a href='$1'>$1</a>");
 else
 return text.replace(__match, "<a " + __final_attributes + "href='$1'>$1</a>");
 }
 else if (mode === 2)
 {
 if (self.validation.misc.is_undefined(url_info) || !self.validation.misc.is_object(url_info))
 return false;
 var __counter_i = 0,
 __url_info_length = url_info.length;
 for (__counter_i = 0; __counter_i < __url_info_length; __counter_i++ )
 {
 if (!self.validation.misc.is_object(url_info[__counter_i]))
 return false;
 if (self.validation.misc.is_undefined(__final_attributes))
 {
 text = text.replace(url_info[__counter_i].expanded_url,
 '<a href="' + url_info[__counter_i].expanded_url + '">' +
 url_info[__counter_i].display_url + '</a>');
 }
 else
 {
 text = text.replace(url_info[__counter_i].expanded_url,
 '<a ' + __final_attributes + 'href="' +
 url_info[__counter_i].expanded_url + '">' +
 url_info[__counter_i].display_url + '</a>');
 }
 }
 return text;
 }
 else
 return false;
 };
 }
 function graphics()
 {
 this.pixels_value = function(pixels)
 {
 var __result = null;
 __result = parseInt(pixels.substring(0, pixels.length - 2), 10);
 if (!self.validation.numerics.is_integer(__result))
 return false;
 return __result;
 };
 this.apply_theme = function(directory, theme, fail_on_existing = true, clear_cache = true)
 {
 if (self.validation.misc.is_invalid(directory) || self.validation.alpha.is_symbol(theme) ||
 !self.validation.misc.is_bool(fail_on_existing) || !self.validation.misc.is_bool(clear_cache))
 return false;
 if (self.validation.misc.is_undefined(theme))
 theme = 'default';
 if (fail_on_existing && self.system.source_exists(theme, 'link', 'href'))
 return false;
 self.graphics.clear_theme(theme);
 var __dynamic_object = null,
 __cache_reset = '';
 if (clear_cache)
 __cache_reset = '?version=' + Date.now();
 __dynamic_object = document.createElement('link');
 __dynamic_object.setAttribute('rel', 'stylesheet');
 __dynamic_object.setAttribute('type', 'text/css');
 __dynamic_object.setAttribute('media', 'screen');
 __dynamic_object.setAttribute('href', directory + '/' + theme + '.css' + __cache_reset);
 self.objects.by_tag('head')[0].appendChild(__dynamic_object);
 return true;
 };
 this.clear_theme = function(theme)
 {
 return self.system.remove_source(theme, 'link', 'href');
 };
 }
 function misc()
 {
 var __self = this;
 this.active_language = function()
 {
 return location.pathname.substring(1, 3);
 };
 this.contains = function(subject, list)
 {
 if (list.indexOf(subject) === -1)
 return false;
 return true;
 };
 this.sort = function(array, mode, by_property)
 {
 var __modes = ['asc', 'desc'],
 __order = null,
 __result = null;
 if (!self.validation.misc.is_array(array) || !__self.contains(mode, __modes) ||
 (!self.validation.misc.is_invalid(by_property) && !self.validation.alpha.is_string(by_property)))
 return false;
 if (mode === 'asc')
 __order = 1;
 else
 __order = -1;
 if (self.validation.misc.is_invalid(by_property))
 __result = array.sort(function(a, b) { return __order * (a - b); });
 else
 __result = array.sort(function(a, b) { return __order * (a[by_property] - b[by_property]); });
 return __result;
 };
 }
 function objects()
 {
 this.by_tag = function(html_tag)
 {
 if (self.validation.misc.is_invalid(html_tag))
 return false;
 return document.getElementsByTagName(html_tag);
 };
 this.by_id = function(id)
 {
 if (self.validation.misc.is_invalid(id))
 return false;
 return document.getElementById(id);
 };
 this.by_class = function(class_name)
 {
 if (self.validation.misc.is_invalid(class_name))
 return false;
 return document.getElementsByClassName(class_name);
 };
 function selectors()
 {
 this.first = function(query)
 {
 if (self.validation.misc.is_invalid(query))
 return false;
 return document.querySelector(query);
 };
 this.all = function(query)
 {
 if (self.validation.misc.is_invalid(query))
 return false;
 return document.querySelectorAll(query);
 };
 }
 this.selectors = new selectors();
 }
 function system()
 {
 var __self = this;
 this.require = function(js_file_path, js_file_name, clear_cache = true)
 {
 if (self.validation.misc.is_invalid(js_file_path) ||
 self.validation.misc.is_invalid(js_file_name) || self.validation.alpha.is_symbol(js_file_name) ||
 !self.validation.misc.is_bool(clear_cache))
 return false;
 self.system.remove_source(js_file_name, 'script', 'src');
 var __dynamic_object = null,
 __cache_reset = '';
 if (clear_cache)
 __cache_reset = '?version=' + Date.now();
 __dynamic_object = document.createElement('script');
 __dynamic_object.setAttribute('src', js_file_path + '/' + js_file_name + '.js' + __cache_reset);
 self.objects.by_tag('head')[0].appendChild(__dynamic_object);
 return true;
 };
 this.source_exists = function(file_name, tag_type, attribute)
 {
 if (self.validation.misc.is_invalid(file_name) || self.validation.alpha.is_symbol(file_name) ||
 self.validation.misc.is_invalid(tag_type) || self.validation.alpha.is_symbol(tag_type) ||
 self.validation.misc.is_invalid(attribute) || self.validation.alpha.is_symbol(attribute))
 return false;
 var __counter_i = 0,
 __sources = document.head.getElementsByTagName(tag_type);
 for (__counter_i = 0; __counter_i < __sources.length; __counter_i++)
 {
 if (__sources[__counter_i].attributes[attribute].value.indexOf(file_name) > -1)
 return true;
 }
 return false;
 };
 this.remove_source = function(file_name, tag_type, attribute)
 {
 if (!self.system.source_exists(file_name, tag_type, attribute))
 return false;
 var __counter_i = 0,
 __sources = document.head.getElementsByTagName(tag_type);
 for (__counter_i = 0; __counter_i < __sources.length; __counter_i++)
 {
 if (__sources[__counter_i].attributes[attribute].value.indexOf(file_name) > -1)
 {
 __sources[__counter_i].remove();
 return true;
 }
 }
 return false;
 };
 }
 function init()
 {
 self.validation = new validation();
 self.events = new events();
 self.conversions = new conversions();
 self.graphics = new graphics();
 self.misc = new misc();
 self.objects = new objects();
 self.system = new system();
 }
 var self = this;
 init();
}
function meta_os()
{
 function boot()
 {
 this.start = function()
 {
 return new boot_screen();
 };
 this.loader = function()
 {
 return new scenario();
 };
 this.environment = function()
 {
 var __linux_mode = new linux_mode(),
 __tablet_mode = new tablet_mode();
 if (__tablet_mode.check())
 return __tablet_mode;
 if (__linux_mode.check())
 return __linux_mode;
 return false;
 };
 }
 function system()
 {
 function io()
 {
 this.keyboard = function()
 {
 return new key_manager();
 };
 this.mouse = function()
 {
 return null;
 };
 this.screen = function()
 {
 return null;
 };
 }
 function hypervisor()
 {
 this.console = function()
 {
 return new multiverse();
 };
 this.vm = function()
 {
 return new cosmos();
 };
 }
 this.timers = function()
 {
 return new stopwatch();
 };
 this.io = new io();
 this.hypervisor = new hypervisor();
 }
 function utilities()
 {
 this.general = function()
 {
 return new vulcan();
 };
 this.benchmark = function()
 {
 return new snail();
 };
 }
 this.settings = function()
 {
 return new teletraan();
 };
 this.boot = new boot();
 this.system = new system();
 this.utilities = new utilities();
}
function taurus()
{
 function init_config()
 {
 config_definition_model = { "arguments" : [
 {
 "key" : { "name" : "type", "optional" : false },
 "value" : {
 "type" : "string",
 "choices" : ["data", "request"]
 }
 },
 {
 "key" : { "name" : "url", "optional" : false },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "data", "optional" : true },
 "value" : { "type" : "*" }
 },
 {
 "key" : { "name" : "element_id", "optional" : true },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "method", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : ["get", "post"]
 }
 },
 {
 "key" : { "name" : "ajax_mode", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : ["asynchronous", "synchronous"]
 }
 },
 {
 "key" : { "name" : "content_fill_mode", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : ["replace", "append"]
 }
 },
 {
 "key" : { "name" : "response_timeout", "optional" : true },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "on_success", "optional" : true },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "on_fail", "optional" : true },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "on_timeout", "optional" : true },
 "value" : { "type" : "function" }
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
 __content_type = null,
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
 if (!utils.validation.misc.is_object(data))
 __content_type = { 'Content-Type': 'application/x-www-form-urlencoded' };
 else
 __content_type = {};
 fetch(url, {
 method: 'POST',
 mode: 'cors',
 cache: 'no-cache',
 credentials: 'same-origin',
 headers: __content_type,
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
 this.request = async function(url, data, method, success_callback, fail_callback, response_timeout, timeout_callback)
 {
 set_callbacks(success_callback, fail_callback, timeout_callback);
 run_timer(response_timeout);
 if (method === 'post' && !utils.validation.misc.is_object(data))
 __content_type = { 'Content-Type': 'application/x-www-form-urlencoded' };
 else
 __content_type = {};
 __ajax_response = await fetch(url, {
 method: method.toUpperCase(),
 mode: 'cors',
 cache: 'no-cache',
 credentials: 'same-origin',
 headers: __content_type,
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
 this.run = function(user_config)
 {
 if (!config_parser.verify(config_definition_model, user_config))
 return false;
 if (utils.validation.misc.is_nothing(user_config.url) ||
 !utils.validation.misc.is_invalid(user_config.response_timeout) &&
 (!utils.validation.numerics.is_integer(user_config.response_timeout) ||
 user_config.response_timeout < 1 || user_config.response_timeout > 60000))
 return false;
 if (utils.validation.misc.is_invalid(user_config.data))
 user_config.data = null;
 if (window.fetch)
 {
 if (user_config.type === 'data') // [AJAX Data] => Modes: Asynchronous / Methods: POST
 {
 if (utils.validation.misc.is_invalid(user_config.data) ||
 !utils.validation.misc.is_invalid(user_config.method) || !utils.validation.misc.is_invalid(user_config.ajax_mode) ||
 !utils.objects.by_id(user_config.element_id) || utils.validation.misc.is_invalid(user_config.content_fill_mode))
 return false;
 return new ajax_core().data(user_config.url, user_config.data, user_config.element_id, user_config.content_fill_mode,
 user_config.on_success, user_config.on_fail,
 user_config.response_timeout, user_config.on_timeout);
 }
 else // [AJAX Request] => Modes: Asynchronous, Synchronous / Methods: GET, POST
 {
 if (user_config.ajax_mode === 'asynchronous') // Fetch => Asynchronous mode
 {
 if (utils.validation.misc.is_invalid(user_config.ajax_mode))
 return false;
 if (utils.validation.misc.is_invalid(user_config.method))
 user_config.method = 'get';
 else
 user_config.method = user_config.method.toLowerCase();
 return new ajax_core().request(user_config.url, user_config.data, user_config.method,
 user_config.on_success, user_config.on_fail,
 user_config.response_timeout, user_config.on_timeout);
 }
 else // BULL => Synchronous mode
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
function aether()
{
 function sys_constants_class()
 {
 function settings_group()
 {
 function chain_mode_model()
 {
 this.SERIAL = 'serial';
 this.PARALLEL = 'parallel';
 this.DELAY = 'delay';
 this.CALLBACK = 'callback';
 }
 this.chain_mode = new chain_mode_model();
 }
 function tasks_group()
 {
 function type_model()
 {
 this.DATA = 'data';
 this.REQUEST = 'request';
 }
 function http_method_model()
 {
 this.GET = 'get';
 this.POST = 'post';
 }
 function ajax_mode_model()
 {
 this.ASYNCHRONOUS = 'asynchronous';
 this.SYNCHRONOUS = 'synchronous';
 }
 function content_fill_mode_model()
 {
 this.REPLACE = 'replace';
 this.APPEND = 'append';
 }
 function repeat_model()
 {
 this.SERIAL = 'serial';
 this.PARALLEL = 'parallel';
 }
 this.type = new type_model();
 this.http_method = new http_method_model();
 this.ajax_mode = new ajax_mode_model();
 this.content_fill_mode = new content_fill_mode_model();
 this.repeat = new repeat_model();
 }
 function misc_group()
 {
 this.IGNORE = -1;
 this.MAX_PRIORITY = Number.MAX_SAFE_INTEGER;
 this.MAX_LATENCY = 60000;
 this.MAX_BANDWIDTH = 10737418240;
 this.MAX_DELAY = 86400000;
 }
 this.settings = new settings_group();
 this.tasks = new tasks_group();
 this.misc = new misc_group();
 }
 function sys_models_class()
 {
 function settings_model()
 {
 this.chain_mode = null;
 this.init_delay = -1;
 this.interval = -1;
 this.optional_task_callbacks = true;
 this.scheduler_callback = null;
 }
 function task_model()
 {
 this.id = null;
 this.type = null;
 this.url = null;
 this.data = null;
 this.response_timeout = -1;
 this.callbacks = null;
 this.ajax_mode = null;
 this.element_id = null;
 this.content_fill_mode = null;
 this.priority = -1;
 this.qos = null;
 this.repeat = null;
 this.delay = -1;
 this.canceled = false;
 }
 function tasks_list_model()
 {
 this.num = 0;
 this.list = [];
 }
 this.generate_task = function()
 {
 return new task_model();
 };
 this.settings = new settings_model();
 this.tasks = new tasks_list_model();
 }
 function config_keywords_class()
 {
 function main_group()
 {
 return ['settings', 'tasks'];
 }
 function settings_group()
 {
 return ['chain_mode', 'init_delay', 'interval', 'optional_task_callbacks', 'scheduler_callback'];
 }
 function tasks_group()
 {
 return ['type', 'url', 'data', 'response_timeout', 'callbacks', 'ajax_mode', 'element_id', 'content_fill_mode',
 'priority', 'qos', 'repeat', 'delay'];
 }
 function callbacks_group()
 {
 return ['success', 'fail', 'timeout'];
 }
 function qos_group()
 {
 return ['latency', 'bandwidth'];
 }
 function range_group()
 {
 return ['min', 'max'];
 }
 function repeat_group()
 {
 return ['times', 'mode'];
 }
 this.main = new main_group();
 this.settings = new settings_group();
 this.tasks = new tasks_group();
 this.callbacks = new callbacks_group();
 this.qos = new qos_group();
 this.range = new range_group();
 this.repeat = new repeat_group();
 }
 function sys_tools_class()
 {
 var __index = 0,
 __entry = null;
 function factory_model()
 {
 this.test_init = function()
 {
 if (is_init === false)
 {
 sensei('Aether', 'The scheduler is not running!');
 return false;
 }
 return true;
 };
 this.check_task_id = function(func, task_id)
 {
 if (!utils.validation.misc.is_undefined(task_id))
 {
 if (utils.validation.numerics.is_number(task_id) && task_id > 0)
 {
 var __entry = null;
 for (__entry in system_models.tasks.list)
 {
 if (system_models.tasks.list[__entry].id === task_id)
 {
 if (func === 'cancel')
 {
 system_models.tasks.list[__entry].canceled = true;
 return true;
 }
 else
 return system_models.tasks.list[__entry];
 }
 }
 return false;
 }
 else
 {
 sensei('Aether', 'Invalid task ID!');
 return false;
 }
 }
 else
 {
 if (func === 'cancel')
 {
 is_init = false;
 scheduler.stop();
 repetitive_scheduler.stop();
 return true;
 }
 else
 return system_models.tasks.list;
 }
 };
 this.config_verification = function(main_config)
 {
 var __factory_map = [];
 __factory_map.push(['main', config_definition_models['main'], main_config]);
 __factory_map.push(['settings', config_definition_models['settings'], main_config.settings]);
 __factory_map.push(['tasks', config_definition_models['tasks'], main_config.tasks]);
 for (__index = 0; __index < __factory_map.length; __index++)
 {
 if (!config_parser.verify(__factory_map[__index][1], __factory_map[__index][2]))
 return false;
 if (__index === 2)
 {
 var __record = 0,
 __option = 0,
 __object_options = ['callbacks', 'qos', 'latency', 'bandwidth', 'repeat'],
 __object_exceptions = ['latency', 'bandwidth'],
 __task_option_config = null;
 for (__record = 0; __record < __factory_map[__index][2].length; __record++)
 {
 for (__entry in __factory_map[__index][2][__record])
 {
 for (__option in __object_options)
 {
 if (!utils.validation.misc.is_undefined(main_config.tasks[__record]['qos']) &&
 utils.misc.contains(__object_options[__option], __object_exceptions))
 {
 __task_option_config = main_config.tasks[__record]['qos'][__object_options[__option]];
 if (utils.validation.misc.is_undefined(__task_option_config))
 continue;
 }
 else
 {
 if (utils.validation.misc.is_undefined(main_config.tasks[__record][__object_options[__option]]))
 continue;
 __task_option_config = main_config.tasks[__record][__object_options[__option]];
 }
 __factory_map.push([__object_options[__option],
 config_definition_models[__object_options[__option]],
 __task_option_config]);
 if (!config_parser.verify(__factory_map[3][1], __factory_map[3][2]))
 return false;
 __factory_map.pop();
 }
 }
 }
 }
 }
 __factory_map = [];
 return true;
 };
 this.range_validator = function(range_values, check)
 {
 if ((range_values[0] === system_constants.misc.IGNORE && range_values[1] === system_constants.misc.IGNORE) ||
 (range_values[0] !== system_constants.misc.IGNORE && range_values[0] < 1) ||
 (range_values[1] !== system_constants.misc.IGNORE && (range_values[1] > system_constants.misc[check] || range_values[1] <= range_values[0])))
 {
 system_tools.reset();
 sensei('Aether', 'Range validation error!');
 return false;
 }
 return true;
 };
 this.ajax_task_set = function(task)
 {
 var __this_task = task.args,
 __task_type = task.type,
 __task_repeat = task.repeat,
 __task_qos = task.qos,
 __task_latency = null,
 __task_bandwidth = null,
 __index = 0,
 __ajax_config = {
 "type" : __task_type,
 "url" : __this_task.url,
 "data" : __this_task.data,
 "response_timeout" : __this_task.response_timeout
 },
 __ajax = new bull();
 function ajax_call()
 {
 if (__task_type === 'data')
 {
 __ajax_config.element_id = __this_task.element_id;
 __ajax_config.content_fill_mode = __this_task.content_fill_mode;
 __ajax_config.on_success = __this_task.success_callback;
 __ajax_config.on_fail = __this_task.fail_callback;
 __ajax_config.on_timeout = __this_task.timeout_callback;
 }
 else
 {
 __ajax_config.method = __this_task.method;
 __ajax_config.ajax_mode = __this_task.ajax_mode;
 __ajax_config.on_success = __this_task.success_callback;
 __ajax_config.on_fail = __this_task.fail_callback;
 __ajax_config.on_timeout = __this_task.timeout_callback;
 }
 __ajax.run(__ajax_config);
 }
 function ajax_prepare_delegate()
 {
 if (!utils.validation.misc.is_invalid(__task_repeat))
 {
 if (__task_repeat.mode === system_constants.tasks.repeat.SERIAL)
 {
 if (__task_repeat.times === -1)
 setInterval(function() { ajax_call(); }, __this_task.response_timeout);
 else
 {
 for (__index = 0; __index < (__task_repeat.times + 1); __index++)
 setTimeout(function() { ajax_call(); }, __this_task.response_timeout);
 }
 }
 else
 {
 if (__task_repeat.times === -1)
 setInterval(function() { ajax_call(); }, 1);
 else
 {
 for (__index = 0; __index < (__task_repeat.times + 1); __index++)
 ajax_call();
 }
 }
 }
 else
 ajax_call();
 }
 if (task.canceled)
 return;
 if (!utils.validation.misc.is_invalid(__task_qos))
 {
 __task_latency = __task_qos.latency;
 __task_bandwidth = __task_qos.bandwidth;
 if (!utils.validation.misc.is_invalid(__task_bandwidth))
 {
 var __ajax_bandwidth = 0;
 if (!utils.validation.misc.is_nothing(__this_task.data))
 __ajax_bandwidth = __this_task.data.length;
 else
 __ajax_bandwidth = __task_bandwidth.min;
 if ((__task_bandwidth.min !== system_constants.misc.IGNORE && __ajax_bandwidth < __task_bandwidth.min) ||
 (__task_bandwidth.max !== system_constants.misc.IGNORE && __ajax_bandwidth > __task_bandwidth.max))
 {
 sensei('Aether', 'Task ID: ' + task.id + '\nOff-range bandwidth: ' + __ajax_bandwidth + ' bytes');
 return;
 }
 }
 if (!utils.validation.misc.is_invalid(__task_latency))
 {
 var __qos_ajax_config = {
 "type" : "request",
 "url" : __this_task.url,
 "data" : __this_task.data,
 "method" : __this_task.method,
 "ajax_mode" : "asynchronous"
 },
 __ping_tester = new centurion();
 __qos_ajax_config.on_success = function()
 {
 __ping_tester.benchmark.end();
 var __ajax_latency = __ping_tester.benchmark.latency();
 if (((__task_latency.min !== system_constants.misc.IGNORE && __ajax_latency >= __task_latency.min) &&
 (__task_latency.max !== system_constants.misc.IGNORE && __ajax_latency <= __task_latency.max)) ||
 (__task_latency.max === system_constants.misc.IGNORE && __ajax_latency >= __task_latency.min) ||
 (__task_latency.min === system_constants.misc.IGNORE && __ajax_latency <= __task_latency.max))
 ajax_prepare_delegate();
 else
 {
 sensei('Aether', 'Task ID: ' + task.id + '\nOff-range latency: ' + __ajax_latency + ' ms');
 return;
 }
 };
 __ping_tester.benchmark.start();
 __ajax.run(__qos_ajax_config);
 }
 else
 ajax_prepare_delegate();
 }
 else
 ajax_prepare_delegate();
 };
 }
 this.init_config_definition_models = function()
 {
 config_definition_models['main'] = { "arguments" : [
 {
 "key" : { "name" : "settings", "optional" : false },
 "value" : { "type" : "object" }
 },
 {
 "key" : { "name" : "tasks", "optional" : false },
 "value" : { "type" : "array" }
 }
 ]
 };
 config_definition_models['settings'] = { "arguments" : [
 {
 "key" : { "name" : "chain_mode", "optional" : false },
 "value" : {
 "type" : "string",
 "choices" : [
 system_constants.settings.chain_mode.SERIAL,
 system_constants.settings.chain_mode.PARALLEL,
 system_constants.settings.chain_mode.DELAY,
 system_constants.settings.chain_mode.CALLBACK
 ]
 }
 },
 {
 "key" : { "name" : "init_delay", "optional" : true },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "interval", "optional" : true },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "optional_task_callbacks", "optional" : true },
 "value" : { "type" : "boolean" }
 },
 {
 "key" : { "name" : "scheduler_callback", "optional" : true },
 "value" : { "type" : "function" }
 }
 ]
 };
 config_definition_models['tasks'] = { "arguments" : [
 {
 "key" : { "name" : "type", "optional" : false },
 "value" : {
 "type" : "string",
 "choices" : [
 system_constants.tasks.type.DATA,
 system_constants.tasks.type.REQUEST
 ]
 }
 },
 {
 "key" : { "name" : "url", "optional" : false },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "data", "optional" : true },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "callbacks", "optional" : false },
 "value" : { "type" : "object" }
 },
 {
 "key" : { "name" : "response_timeout", "optional" : false },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "method", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : [
 system_constants.tasks.http_method.GET,
 system_constants.tasks.http_method.POST
 ]
 }
 },
 {
 "key" : { "name" : "ajax_mode", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : [
 system_constants.tasks.ajax_mode.ASYNCHRONOUS,
 system_constants.tasks.ajax_mode.SYNCHRONOUS
 ]
 }
 },
 {
 "key" : { "name" : "element_id", "optional" : true },
 "value" : { "type" : "string" }
 },
 {
 "key" : { "name" : "content_fill_mode", "optional" : true },
 "value" : {
 "type" : "string",
 "choices" : [
 system_constants.tasks.content_fill_mode.REPLACE,
 system_constants.tasks.content_fill_mode.APPEND
 ]
 }
 },
 {
 "key" : { "name" : "priority", "optional" : true },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "qos", "optional" : true },
 "value" : { "type" : "object" }
 },
 {
 "key" : { "name" : "repeat", "optional" : true },
 "value" : { "type" : "object" }
 },
 {
 "key" : { "name" : "delay", "optional" : true },
 "value" : { "type" : "number" }
 }
 ]
 };
 config_definition_models['callbacks'] = { "arguments" : [
 {
 "key" : { "name" : "success", "optional" : false },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "fail", "optional" : true },
 "value" : { "type" : "function" }
 },
 {
 "key" : { "name" : "timeout", "optional" : true },
 "value" : { "type" : "function" }
 }
 ]
 };
 config_definition_models['qos'] = { "arguments" : [
 {
 "key" : { "name" : "latency", "optional" : true },
 "value" : { "type" : "object" }
 },
 {
 "key" : { "name" : "bandwidth", "optional" : true },
 "value" : { "type" : "object" }
 }
 ]
 };
 config_definition_models['latency'] = { "arguments" : [
 {
 "key" : { "name" : "min", "optional" : false },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "max", "optional" : false },
 "value" : { "type" : "number" }
 }
 ]
 };
 config_definition_models['bandwidth'] = { "arguments" : [
 {
 "key" : { "name" : "min", "optional" : false },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "max", "optional" : false },
 "value" : { "type" : "number" }
 }
 ]
 };
 config_definition_models['repeat'] = { "arguments" : [
 {
 "key" : { "name" : "times", "optional" : false },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "mode", "optional" : false },
 "value" : {
 "type" : "string",
 "choices" : [
 system_constants.tasks.repeat.SERIAL,
 system_constants.tasks.repeat.PARALLEL
 ]
 }
 }
 ]
 };
 };
 this.verify_config = function(main_config)
 {
 if (!utils.validation.misc.is_object(main_config)||
 !main_config.hasOwnProperty('settings') || !main_config.hasOwnProperty('tasks') ||
 !utils.validation.misc.is_object(main_config.settings) || !utils.validation.misc.is_object(main_config.tasks))
 {
 sensei('Aether', 'Invalid configuration!');
 return false;
 }
 return system_tools.factory.config_verification(main_config);
 };
 this.load_settings = function(settings_config)
 {
 var __options_map = system_config_keywords.settings;
 for (__entry in __options_map)
 {
 if (settings_config.hasOwnProperty(__options_map[__entry]))
 {
 if (__options_map[__entry] === 'init_delay' || __options_map[__entry] === 'interval')
 {
 if (settings_config[__options_map[__entry]] < 1 ||
 settings_config[__options_map[__entry]] > system_constants.misc.MAX_DELAY)
 {
 __options_map = [];
 sensei('Aether', 'Invalid range for "' + __options_map[__entry] + '" option!');
 return false;
 }
 }
 system_models.settings[__options_map[__entry]] = settings_config[__options_map[__entry]];
 }
 }
 if (settings_config.chain_mode === system_constants.settings.chain_mode.SERIAL)
 is_serial_chain_mode = true;
 if (settings_config.chain_mode === system_constants.settings.chain_mode.DELAY)
 is_delay_chain_mode = true;
 is_optional_task_callbacks = settings_config.optional_task_callbacks;
 __options_map = [];
 return true;
 };
 this.load_tasks = function(tasks_config)
 {
 var __this_config_task = null,
 __new_task = null,
 __option = null,
 __tasks_response_timeout_sum = 0,
 __tasks_delay_sum = 0,
 __same_priorities_num = 0,
 __is_async_warning_set = false,
 __task_id_gen = new pythia(),
 __task_priority_gen = new pythia();
 for (__index = 0; __index < tasks_config.length; __index++)
 {
 __this_config_task = tasks_config[__index];
 __new_task = system_models.generate_task();
 __new_task.id = __task_id_gen.generate();
 __new_task.type = __this_config_task.type;
 if (__this_config_task.type === system_constants.tasks.type.DATA)
 {
 if (!__this_config_task.hasOwnProperty('data') ||
 !__this_config_task.hasOwnProperty('element_id') || !__this_config_task.hasOwnProperty('content_fill_mode') ||
 __this_config_task.hasOwnProperty('method')|| __this_config_task.hasOwnProperty('ajax_mode'))
 {
 system_tools.reset();
 sensei('Aether', 'Task type: "data" requires fields: "data", "element_id" and\n"content_fill_mode" to operate!');
 return false;
 }
 }
 else
 {
 if (!__this_config_task.hasOwnProperty('method') || !__this_config_task.hasOwnProperty('ajax_mode') ||
 __this_config_task.hasOwnProperty('element_id') || __this_config_task.hasOwnProperty('content_fill_mode'))
 {
 system_tools.reset();
 sensei('Aether', 'Task type: "request" requires fields: "method" and\n"ajax_mode" to operate!');
 return false;
 }
 }
 if (utils.validation.misc.is_nothing(__this_config_task.url))
 {
 system_tools.reset();
 sensei('Aether', 'Field: "url" can\'t be empty!');
 return false;
 }
 __new_task.url = __this_config_task.url;
 if (!__this_config_task.hasOwnProperty('data'))
 __new_task.data = '1';
 else
 {
 if (!utils.validation.misc.is_nothing(__this_config_task.data))
 __new_task.data = __this_config_task.data;
 else
 __new_task.data = '1';
 }
 if (__this_config_task.response_timeout < 1 || __this_config_task.response_timeout > system_constants.misc.MAX_DELAY)
 {
 system_tools.reset();
 sensei('Aether', 'Invalid range for "response_timeout" option!');
 return false;
 }
 __new_task.response_timeout = __this_config_task.response_timeout;
 __tasks_response_timeout_sum += __new_task.response_timeout;
 var __callbacks_found = 0;
 for (__option in tasks_config[__index].callbacks)
 __callbacks_found++;
 if (!is_optional_task_callbacks && __callbacks_found < system_config_keywords.callbacks.length)
 {
 system_tools.reset();
 sensei('Aether', 'When "optional_task_callbacks" is set to false all task\ncallbacks have to be present!');
 return false;
 }
 __new_task.callbacks = __this_config_task.callbacks;
 if (__this_config_task.hasOwnProperty('method'))
 __new_task.method = __this_config_task.method;
 if (__this_config_task.hasOwnProperty('ajax_mode'))
 {
 __new_task.ajax_mode = __this_config_task.ajax_mode;
 if (__this_config_task.ajax_mode === system_constants.tasks.ajax_mode.SYNCHRONOUS)
 {
 if (!__is_async_warning_set)
 {
 __is_async_warning_set = true;
 sensei('Aether', 'Warning: Use of synchronous AJAX causes unexpected\nscheduling in various cases!');
 }
 }
 }
 if (__this_config_task.hasOwnProperty('element_id'))
 {
 if (!utils.objects.by_id(__this_config_task.element_id))
 {
 system_tools.reset();
 sensei('Aether', 'Field: "element_id" does not point to an existing element!');
 return false;
 }
 __new_task.element_id = __this_config_task.element_id;
 }
 if (__this_config_task.hasOwnProperty('content_fill_mode'))
 __new_task.content_fill_mode = __this_config_task.content_fill_mode;
 if (__this_config_task.hasOwnProperty('priority'))
 {
 if (__this_config_task.priority < 1 || __this_config_task.priority > system_constants.misc.MAX_PRIORITY)
 {
 system_tools.reset();
 sensei('Aether', 'Unsupported value for "priority" option!');
 return false;
 }
 __new_task.priority = __this_config_task.priority;
 }
 else
 __new_task.priority = __task_priority_gen.generate();
 if (__this_config_task.hasOwnProperty('qos'))
 {
 var __qos = __this_config_task.qos,
 __range_values = [],
 __check = null;
 for (__option in __qos)
 {
 if (utils.misc.contains(__option, system_config_keywords.qos))
 {
 __range_values = [__qos[__option].min, __qos[__option].max];
 if (__option === 'latency')
 __check = 'MAX_LATENCY';
 else
 __check = 'MAX_BANDWIDTH';
 if (!system_tools.factory.range_validator(__range_values, __check))
 {
 system_tools.reset();
 sensei('Aether', 'Invalid range for "' + __option + '" option!');
 return false;
 }
 }
 }
 __new_task.qos = __qos;
 }
 if (__this_config_task.hasOwnProperty('repeat'))
 {
 for (__entry in __this_config_task.repeat)
 {
 if (__entry === 'times' && __this_config_task.repeat[__entry] < 1 &&
 __this_config_task.repeat[__entry] !== system_constants.misc.IGNORE)
 {
 system_tools.reset();
 sensei('Aether', 'Unsupported value for "' + __entry + '" option!');
 return false;
 }
 }
 __new_task.repeat = __this_config_task.repeat;
 }
 if (is_delay_chain_mode && !__this_config_task.hasOwnProperty('delay'))
 {
 system_tools.reset();
 sensei('Aether', 'When "chain_mode" is set to delay all tasks must have the\n"delay" option!');
 return false;
 }
 if (__this_config_task.hasOwnProperty('delay'))
 {
 if (is_serial_chain_mode || __this_config_task.delay < 1 || __this_config_task.delay > system_constants.misc.MAX_DELAY)
 {
 system_tools.reset();
 if (is_serial_chain_mode)
 sensei('Aether', 'Invalid use of the "delay" option when "chain_mode"\nis set to serial!');
 else
 sensei('Aether', 'Invalid range for "delay" option!');
 return false;
 }
 __new_task.delay = __this_config_task.delay;
 __tasks_delay_sum += __new_task.delay;
 }
 system_models.tasks.num++;
 system_models.tasks.list.push(__new_task);
 }
 if (!utils.misc.sort(system_models.tasks.list, 'asc', 'priority'))
 {
 system_tools.reset();
 sensei('Aether', 'Unable to sort tasks!');
 return false;
 }
 if (system_models.settings.interval !== -1 &&
 ((system_models.settings.chain_mode === system_constants.settings.chain_mode.DELAY ||
 system_models.settings.chain_mode === system_constants.settings.chain_mode.CALLBACK) &&
 __tasks_delay_sum > system_models.settings.interval))
 {
 sensei('Aether', 'Warning: Scheduler loop interval is lower than the sum\nof delay in tasks. ' +
 'This may lead to strange\nbehaviour due to the asynchronous nature of AJAX!');
 }
 if (system_models.settings.interval !== -1 &&
 ((system_models.settings.chain_mode === system_constants.settings.chain_mode.SERIAL ||
 system_models.settings.chain_mode === system_constants.settings.chain_mode.CALLBACK) &&
 __tasks_response_timeout_sum > system_models.settings.interval))
 {
 sensei('Aether', 'Warning: Scheduler loop interval is lower than the sum\nof response time outs in tasks. ' +
 'This may lead to strange\nbehaviour due to the asynchronous nature of AJAX!');
 }
 for (__index = 0; __index < system_models.tasks.num - 1; __index++)
 {
 if (system_models.tasks.list[__index].priority === system_models.tasks.list[__index + 1].priority)
 __same_priorities_num++;
 }
 if (__same_priorities_num > 0)
 {
 sensei('Aether', 'Warning: One or more AJAX tasks have the same priority.\n' +
 'Please consider providing distinct priorities for\nbetter scheduling!');
 }
 return true;
 };
 this.process_tasks = function(process_callback)
 {
 var __index = 0,
 __this_task = null,
 __all_tasks = system_models.tasks.list,
 __modes_list = system_constants.settings.chain_mode,
 __task_config_map = null,
 __scheduled_tasks_list = [];
 function go(mode, scheduled_tasks_list)
 {
 function scheduler_callback_action()
 {
 if (system_models.settings.scheduler_callback !== null)
 system_models.settings.scheduler_callback.call(this);
 }
 function repeater_delegate(mode, index)
 {
 var __task_entry = null,
 __task_delay = null;
 if (mode === __modes_list.SERIAL || mode === __modes_list.DELAY || mode === __modes_list.CALLBACK)
 {
 if (index < __all_tasks.length - 1)
 index++;
 else
 {
 if ((mode === __modes_list.SERIAL || mode === __modes_list.CALLBACK) && index === __all_tasks.length - 1)
 scheduler_callback_action();
 return;
 }
 }
 __task_entry = scheduled_tasks_list[index][0];
 __task_delay = scheduled_tasks_list[index][1];
 if (mode === __modes_list.CALLBACK)
 {
 var __old_success_callback = __task_entry.args.success_callback,
 __new_success_callback = function()
 {
 __old_success_callback.call(this);
 repeater_delegate(mode, index);
 };
 __task_entry.args.success_callback = __new_success_callback;
 }
 if (__task_delay === -1)
 {
 system_tools.factory.ajax_task_set(__task_entry);
 if (mode === __modes_list.SERIAL || mode === __modes_list.DELAY)
 repeater_delegate(mode, index);
 }
 else
 {
 setTimeout(function()
 {
 system_tools.factory.ajax_task_set(__task_entry);
 if (mode === __modes_list.DELAY)
 {
 repeater_delegate(mode, index);
 if (index === __all_tasks.length - 1)
 setTimeout(scheduler_callback_action, __task_delay);
 }
 }, __task_delay);
 }
 }
 function repeater(mode)
 {
 if (mode === __modes_list.SERIAL || mode === __modes_list.DELAY || mode === __modes_list.CALLBACK)
 repeater_delegate(mode, -1);
 else
 {
 for (__index = 0; __index < scheduled_tasks_list.length; __index++)
 repeater_delegate(mode, __index);
 scheduler_callback_action();
 }
 if (utils.validation.misc.is_function(process_callback))
 process_callback.call(this);
 }
 repeater(mode);
 }
 for (__index in __all_tasks)
 {
 __this_task = __all_tasks[__index];
 __task_config_map = {
 "id" : __this_task.id,
 "type" : __this_task.type,
 "priority" : __this_task.priority,
 "args" : {
 "url" : __this_task.url,
 "data" : __this_task.data,
 "success_callback" : __this_task.callbacks.success,
 "fail_callback" : __this_task.callbacks.fail,
 "response_timeout" : __this_task.response_timeout,
 "timeout_callback" : __this_task.callbacks.timeout
 },
 "repeat" : __this_task.repeat,
 "qos" : __this_task.qos,
 "canceled" : __this_task.canceled
 };
 if (__this_task.type === system_constants.tasks.type.DATA)
 {
 __task_config_map.args.element_id = __this_task.element_id;
 __task_config_map.args.content_fill_mode = __this_task.content_fill_mode;
 }
 else
 __task_config_map.args.ajax_mode = __this_task.ajax_mode;
 __scheduled_tasks_list.push([__task_config_map, __this_task.delay]);
 }
 go(system_models.settings.chain_mode, __scheduled_tasks_list);
 };
 this.run = function()
 {
 function do_tasks()
 {
 if (system_models.settings.interval === -1)
 system_tools.process_tasks();
 else
 {
 system_tools.process_tasks(function()
 {
 repetitive_scheduler.start(system_models.settings.interval,
 system_tools.process_tasks, false);
 });
 }
 }
 if (system_models.settings.init_delay === -1)
 do_tasks();
 else
 scheduler.start(system_models.settings.init_delay, do_tasks, true);
 return true;
 };
 this.reset = function()
 {
 is_init = false;
 config_definition_models = [];
 system_models = new sys_models_class();
 };
 this.factory = new factory_model();
 }
 function init()
 {
 system_tools.init_config_definition_models();
 }
 this.schedule = function(json_config)
 {
 if (is_init === true ||
 !system_tools.verify_config(json_config) ||
 !system_tools.load_settings(json_config.settings) ||
 !system_tools.load_tasks(json_config.tasks) ||
 !system_tools.run())
 return false;
 is_init = true;
 config_definition_models = [];
 return true;
 };
 this.cancel = function(task_id)
 {
 if (!system_tools.factory.test_init())
 return false;
 return system_tools.factory.check_task_id('cancel', task_id);
 };
 this.status = function(task_id)
 {
 if (!system_tools.factory.test_init())
 return false;
 return system_tools.factory.check_task_id('status', task_id);
 };
 this.constants = function()
 {
 return system_constants;
 };
 var is_init = false,
 is_serial_chain_mode = false,
 is_delay_chain_mode = false,
 is_optional_task_callbacks = false,
 config_definition_models = [],
 system_constants = new sys_constants_class(),
 system_models = new sys_models_class(),
 system_config_keywords = new config_keywords_class(),
 system_tools = new sys_tools_class(),
 config_parser = new jap(),
 scheduler = new stopwatch(),
 repetitive_scheduler = new stopwatch(),
 utils = new vulcan();
 init();
}
function armadillo()
{
 function data_repo_model()
 {
 this.db_container = []; // DB container
 this.selected_db = null; // Selected DB
 this.selected_record = null; // Selected record
 }
 function helpers_model()
 {
 this.init_storage = function()
 {
 var __container = localStorage.getItem('armadillo');
 if (!__container)
 localStorage.setItem('armadillo', JSON.stringify([]));
 data_repo.db_container = JSON.parse(__container);
 if (self.log_enabled)
 sensei('Armadillo', 'Storage has been initialized!');
 return null;
 };
 this.empty_storage = function()
 {
 data_repo.db_container = [];
 data_repo.selected_db = null;
 data_repo.selected_record = null;
 localStorage.clear();
 if (self.log_enabled)
 sensei('Armadillo', 'Storage is now empty!');
 return null;
 };
 this.db_name_exists = function(name, db_array)
 {
 var __this_name = null;
 for (__this_name in db_array)
 {
 if (__this_name === name)
 return true;
 }
 return false;
 };
 this.duplicates_exist = function(mode, attribute)
 {
 if (mode === 'db')
 {
 if (helpers.db_name_exists(attribute, data_repo.db_container))
 {
 if (self.log_enabled)
 sensei('Armadillo', 'A DB with the same name exists!');
 return true;
 }
 }
 else if (mode === 'record')
 {
 return helpers.super_iterator([attribute], function()
 {
 if (self.log_enabled)
 sensei('Armadillo', 'A record with the same ID exists!');
 return true;
 });
 }
 return false;
 };
 this.generate_record_uid = function()
 {
 var __uid = rnd_gen.generate();
 if (helpers.duplicates_exist('record', __uid))
 {
 var __index = 0,
 __this_db = data_repo.db_container[data_repo.selected_db],
 __records_length = __this_db.length;
 __existing_id_array = [];
 for (__index = 0; __index < __records_length; __index++)
 __existing_id_array.push(__this_db[__index].id);
 rnd_gen.load(__existing_id_array);
 __uid = rnd_gen.generate();
 }
 return __uid;
 };
 this.db_exists = function(db_name)
 {
 if (!utils.validation.alpha.is_string(db_name))
 return false;
 if (helpers.db_name_exists(db_name, data_repo.db_container))
 return true;
 if (self.log_enabled)
 sensei('Armadillo', 'DB does not exist!');
 return false;
 };
 this.super_iterator = function(values, exec_code)
 {
 var __index = 0,
 __this_db = data_repo.db_container[data_repo.selected_db],
 __records_length = __this_db.length;
 for (__index = 0; __index < __records_length; __index++)
 {
 if (__this_db[__index].id === values[0])
 return exec_code.call(this, [__index, __this_db, values[1]]);
 }
 return false;
 };
 }
 function db_context()
 {
 this.set = function(db_name)
 {
 if (helpers.db_exists(db_name))
 return false;
 data_repo.db_container[db_name] = [];
 data_repo.selected_db = db_name;
 data_repo.selected_record = null;
 localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));
 return true;
 };
 this.get = function(db_name)
 {
 if (!utils.validation.misc.is_invalid(db_name) && !helpers.db_exists(db_name))
 return false;
 data_repo.selected_record = null;
 if (utils.validation.misc.is_invalid(db_name))
 {
 if (data_repo.selected_db === null)
 return false;
 return data_repo.db_container[data_repo.selected_db];
 }
 else
 return data_repo.db_container[db_name];
 };
 this.remove = function(db_name)
 {
 if (!helpers.db_exists(db_name))
 return false;
 var __db_name = null,
 __new_db_container = null;
 for (__db_name in data_repo.db_container)
 {
 if (__db_name !== db_name)
 __new_db_container[__db_name] = data_repo.db_container[db_name];
 }
 data_repo.db_container = __new_db_container;
 data_repo.selected_db = null;
 data_repo.selected_record = null;
 localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));
 return true;
 };
 this.use = function(db_name)
 {
 if (!helpers.db_exists(db_name))
 return false;
 data_repo.selected_db = db_name;
 data_repo.selected_record = null;
 return true;
 };
 }
 function records_context()
 {
 this.insert = function(record)
 {
 if (data_repo.selected_db === null || !utils.validation.misc.is_object(record) || record.hasOwnProperty('id'))
 return false;
 record.id = helpers.generate_record_uid();
 data_repo.db_container[data_repo.selected_db].push(record);
 data_repo.selected_record = record;
 localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));
 return true;
 };
 this.select = function(record_id)
 {
 if (data_repo.selected_db === null || !utils.validation.numerics.is_number(record_id))
 return false;
 return helpers.super_iterator([record_id], function(env)
 {
 data_repo.selected_record = env[1][env[0]];
 return data_repo.selected_record;
 });
 };
 this.fetch = function()
 {
 if (data_repo.selected_db === null)
 return false;
 data_repo.selected_record = null;
 return data_repo.db_container[data_repo.selected_db];
 };
 this.save = function(record)
 {
 if (data_repo.selected_db === null ||
 !utils.validation.misc.is_object(record) || !record.hasOwnProperty('id') ||
 !helpers.duplicates_exist('record', record.id))
 return false;
 return helpers.super_iterator([record.id, record], function(env)
 {
 env[1][env[0]] = env[2];
 data_repo.db_container[data_repo.selected_db] = env[1];
 data_repo.selected_record = env[1][env[0]];
 localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));
 return true;
 });
 };
 this.delete = function(record_id)
 {
 if (data_repo.selected_db === null || !utils.validation.numerics.is_number(record_id))
 return false;
 return helpers.super_iterator([record_id], function(env)
 {
 env[1].splice(env[0], 1);
 data_repo.selected_record = null;
 localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));
 return true;
 });
 };
 this.clear = function()
 {
 if (data_repo.selected_db === null)
 return false;
 data_repo.db_container[data_repo.selected_db] = [];
 data_repo.selected_record = null;
 localStorage.setItem('armadillo', JSON.stringify(data_repo.db_container));
 return true;
 };
 }
 this.reset = function()
 {
 helpers.empty_storage();
 return null;
 };
 function init()
 {
 if (typeof(Storage) === 'undefined')
 return false;
 helpers.init_storage();
 return true;
 }
 this.db = new db_context();
 this.records = new records_context();
 this.log_enabled = false;
 var self = this,
 data_repo = new data_repo_model(),
 helpers = new helpers_model(),
 utils = new vulcan(),
 rnd_gen = new pythia();
 init();
}
function fx()
{
 function element_validator(name, mode)
 {
 var __element = null;
 if (utils.validation.alpha.is_symbol(name) || !utils.validation.numerics.is_number(mode) || mode < 1 || mode > 4)
 return false;
 if (mode === 1)
 __element = utils.objects.by_id(name);
 else if (mode === 2)
 __element = utils.objects.by_class(name)[0];
 else if (mode === 3)
 __element = utils.objects.selectors.parent(name);
 else
 {
 if (utils.validation.misc.is_object(name))
 __element = name;
 }
 if (!__element)
 return false;
 return __element;
 }
 function fade()
 {
 var __id = null,
 __step = 0.0,
 __speed = 0,
 __delay = 0;
 this.into = function(id, step, speed, delay, callback)
 {
 var __inc = 0,
 __interval_id = 0,
 __time_out = 0;
 if (utils.validation.misc.is_undefined(id) ||
 utils.validation.misc.is_undefined(step) ||
 utils.validation.misc.is_undefined(speed) ||
 utils.validation.misc.is_undefined(delay))
 return false;
 if (utils.validation.alpha.is_symbol(id) ||
 (!utils.validation.numerics.is_float(step) || step < 0.0 || step > 1.0) ||
 (!utils.validation.numerics.is_integer(speed) || speed < 0) ||
 (!utils.validation.numerics.is_integer(delay) || delay < 0))
 return false;
 __id = id;
 __step = step;
 __speed = speed;
 __delay = delay;
 function do_fade()
 {
 var __element = element_validator(id, 1);
 if (__inc === 0)
 {
 if (__element !== false)
 __element.style.display = 'block';
 self.opacity.apply(id, 0.0);
 }
 if (__inc <= 1)
 {
 __inc += step;
 self.opacity.apply(id, __inc);
 }
 else
 {
 clearInterval(__interval_id);
 clearTimeout(__time_out);
 self.opacity.reset(id);
 if (utils.validation.misc.is_function(callback))
 callback.call();
 }
 return true;
 }
 function start_interval()
 {
 __interval_id = setInterval(function() { do_fade(); }, speed);
 return true;
 }
 function fire_timeout()
 {
 return setTimeout(function() { start_interval(); }, delay);
 }
 __time_out = fire_timeout();
 return true;
 };
 this.out = function(id, step, speed, delay, callback)
 {
 var __dec = 1,
 __interval_id = 0,
 __time_out = 0;
 if (utils.validation.misc.is_undefined(id) ||
 utils.validation.misc.is_undefined(step) ||
 utils.validation.misc.is_undefined(speed) ||
 utils.validation.misc.is_undefined(delay))
 return false;
 if (utils.validation.alpha.is_symbol(id) ||
 (!utils.validation.numerics.is_float(step) || step < 0.0 || step > 1.0) ||
 (!utils.validation.numerics.is_integer(speed) || speed < 0) ||
 (!utils.validation.numerics.is_integer(delay) || delay < 0))
 return false;
 __id = id;
 __step = step;
 __speed = speed;
 __delay = delay;
 function do_fade()
 {
 var __element = element_validator(id, 1);
 if (__dec === 1)
 self.opacity.reset(id);
 if (__dec >= 0)
 {
 __dec -= step;
 if (__element !== false)
 self.opacity.apply(id, __dec);
 }
 else
 {
 clearInterval(__interval_id);
 clearTimeout(__time_out);
 if (__element !== false)
 {
 __element.style.display = 'none';
 self.opacity.apply(id, 0.0);
 }
 if (utils.validation.misc.is_function(callback))
 callback.call();
 }
 return true;
 }
 function start_interval()
 {
 __interval_id = setInterval(function() { do_fade(); }, speed);
 return true;
 }
 function fire_timeout()
 {
 return setTimeout(function() { start_interval(); }, delay);
 }
 __time_out = fire_timeout();
 return true;
 };
 this.reset = function()
 {
 __id = null;
 __step = 0.0;
 __speed = 0;
 __delay = 0;
 return true;
 };
 this.get = function(type)
 {
 if (type === 'id')
 return __id;
 else if (type === 'step')
 return __step;
 else if (type === 'speed')
 return __speed;
 else if (type === 'delay')
 return __delay;
 else
 return false;
 };
 }
 function opacity()
 {
 var __element = null,
 __opacity = 1.0;
 this.apply = function(id, val)
 {
 if (utils.validation.alpha.is_symbol(id) || !utils.validation.numerics.is_float(val) || val < 0.0 || val > 1.0)
 return false;
 __element = element_validator(id, 1);
 if (__element === false)
 return false;
 __element.style.opacity = val;
 __opacity = val;
 return true;
 };
 this.reset = function(id)
 {
 if (utils.validation.alpha.is_symbol(id))
 return false;
 __element = element_validator(id, 1);
 if (__element === false)
 return false;
 __element.style.opacity = 1.0;
 __opacity = 1.0;
 return true;
 };
 this.get = function()
 {
 return __opacity;
 };
 }
 function animation()
 {
 this.swipe = function(id, mode, direction, distance, offset, speed, step, callback)
 {
 var __element = element_validator(id, mode),
 __distance = 0,
 __last_step = 0,
 __interval_id = null,
 __interval_utility = new interval_model();
 if (__element === false)
 return false;
 if (!utils.validation.alpha.is_string(direction) ||
 !utils.validation.numerics.is_integer(distance) ||
 !utils.validation.numerics.is_integer(offset) ||
 !utils.validation.numerics.is_integer(speed) ||
 !utils.validation.numerics.is_integer(step))
 return false;
 if (!utils.validation.misc.is_undefined(callback) && !utils.validation.misc.is_function(callback))
 return false;
 if (step >= distance)
 return false;
 function interval_model()
 {
 this.run = function(func, speed)
 {
 __interval_id = setInterval(function() { func.call(); }, speed);
 return true;
 };
 this.stop = function(interval_handler)
 {
 clearInterval(interval_handler);
 return true;
 };
 }
 function reverse_parameters()
 {
 distance = -distance;
 step = -step;
 offset = -offset;
 return true;
 }
 function dynamic_logic(distance, direction, mode)
 {
 if (direction === 'up' || direction === 'left')
 {
 if (mode === 1)
 {
 if (__distance <= (distance + offset))
 return true;
 return false;
 }
 else if (mode === 2)
 {
 if (__distance < (distance + offset))
 return true;
 return false;
 }
 else
 return null;
 }
 else if (direction === 'down' || direction === 'right')
 {
 if (mode === 1)
 {
 if (__distance >= (distance + offset))
 return true;
 return false;
 }
 else if (mode === 2)
 {
 if (__distance > (distance + offset))
 return true;
 return false;
 }
 else
 return null;
 }
 return null;
 }
 function do_swipe(direction)
 {
 if (direction === 'up' || direction === 'down' || direction === 'left' || direction === 'right')
 {
 var __pos = null,
 __pos_val = 0;
 if (direction === 'up' || direction === 'down')
 {
 __pos = 'top';
 __pos_val = utils.graphics.pixels_value(__element.style.top);
 }
 else
 {
 __pos = 'left';
 __pos_val = utils.graphics.pixels_value(__element.style.left);
 }
 if (direction === 'up' || direction === 'left')
 reverse_parameters();
 __interval_utility.run(function()
 {
 __distance = __distance + step;
 if (dynamic_logic(distance, direction, 1))
 {
 if (dynamic_logic(distance, direction, 2))
 {
 __last_step = distance - (__distance - step);
 __element.style[__pos] = __pos_val + offset + (__distance - step) + __last_step + 'px';
 }
 else
 __element.style[__pos] = __pos_val + __distance + offset + 'px';
 __interval_utility.stop(__interval_id);
 if (!utils.validation.misc.is_undefined(callback))
 callback.call();
 }
 else
 __element.style[__pos] = __pos_val + __distance + 'px';
 }, speed);
 return true;
 }
 else
 return false;
 }
 return do_swipe(direction);
 };
 this.roll = function(id, mode, direction, distance, offset, speed, step, callback)
 {
 var __element = element_validator(id, mode),
 __distance = 0,
 __last_step = 0,
 __interval_id = null,
 __interval_utility = new interval_model();
 if (__element === false)
 return false;
 if (!utils.validation.alpha.is_string(direction) ||
 !utils.validation.numerics.is_integer(distance) ||
 !utils.validation.numerics.is_integer(offset) ||
 !utils.validation.numerics.is_integer(speed) ||
 !utils.validation.numerics.is_integer(step))
 return false;
 if (!utils.validation.misc.is_undefined(callback) && !utils.validation.misc.is_function(callback))
 return false;
 if (step >= distance)
 return false;
 function interval_model()
 {
 this.run = function(func, speed)
 {
 __interval_id = setInterval(function() { func.call(); }, speed);
 return true;
 };
 this.stop = function(interval_handler)
 {
 clearInterval(interval_handler);
 return true;
 };
 }
 function reverse_parameters()
 {
 distance = -distance;
 step = -step;
 return true;
 }
 function dynamic_logic(distance, direction, mode)
 {
 if (direction === 'up' || direction === 'left')
 {
 if (mode === 1)
 {
 if (__distance <= distance)
 return true;
 return false;
 }
 else if (mode === 2)
 {
 if (__distance < distance)
 return true;
 return false;
 }
 else
 return null;
 }
 else if (direction === 'down' || direction === 'right')
 {
 if (mode === 1)
 {
 if (__distance >= distance)
 return true;
 return false;
 }
 else if (mode === 2)
 {
 if (__distance > distance)
 return true;
 return false;
 }
 else
 return null;
 }
 return null;
 }
 function execute_callback()
 {
 __interval_utility.stop(__interval_id);
 if (!utils.validation.misc.is_undefined(callback))
 callback.call();
 return null;
 }
 function do_roll(direction)
 {
 if (direction === 'up' || direction === 'down' || direction === 'left' || direction === 'right')
 {
 var __dimension = null,
 __pos = null,
 __dimension_val = 0,
 __pos_val = 0;
 if (direction === 'up' || direction === 'down')
 {
 __dimension = 'height';
 __pos = 'top';
 __dimension_val = utils.graphics.pixels_value(__element.style.height);
 __pos_val = utils.graphics.pixels_value(__element.style.top);
 if (direction === 'down')
 {
 __element.style[__pos] = __pos_val + __dimension_val + offset + 'px';
 __element.style[__dimension] = '0px';
 }
 }
 else
 {
 __dimension = 'width';
 __pos = 'left';
 __dimension_val = utils.graphics.pixels_value(__element.style.width);
 __pos_val = utils.graphics.pixels_value(__element.style.left);
 if (direction === 'right')
 {
 __element.style[__pos] = __pos_val + __dimension_val + offset + 2 + 'px';
 __element.style[__dimension] = '0px';
 }
 }
 if (direction === 'up' || direction === 'left')
 {
 __distance = distance;
 reverse_parameters();
 }
 __interval_utility.run(function()
 {
 __distance = __distance + step;
 if (__distance <= 0)
 {
 __element.style[__pos] = __pos_val + 'px';
 __element.style[__dimension] = __dimension_val + 'px';
 execute_callback();
 }
 else
 {
 if (dynamic_logic(distance, direction, 1))
 {
 if (dynamic_logic(distance, direction, 2))
 {
 __last_step = distance - (__distance - step);
 __element.style[__dimension] = Math.abs((__distance - step) + __last_step) + 'px';
 }
 else
 __element.style[__dimension] = Math.abs(__distance) + 'px';
 execute_callback();
 }
 else
 __element.style[__dimension] = Math.abs(__distance) + 'px';
 }
 }, speed);
 return true;
 }
 else
 return false;
 }
 return do_roll(direction);
 };
 this.slider = function(options)
 {
 if (!utils.validation.alpha.is_string(options.name) ||
 !utils.validation.numerics.is_integer(options.mode) ||
 !utils.validation.numerics.is_integer(options.step) ||
 !utils.validation.numerics.is_integer(options.speed) ||
 !utils.validation.misc.is_object(options.previous) ||
 !utils.validation.alpha.is_string(options.previous.name) ||
 !utils.validation.numerics.is_integer(options.previous.mode) ||
 !utils.validation.misc.is_object(options.next) ||
 !utils.validation.alpha.is_string(options.next.name) ||
 !utils.validation.numerics.is_integer(options.next.mode))
 return false;
 var __slider = element_validator(options.name, options.mode),
 __next = element_validator(options.next.name, options.next.mode),
 __previous = element_validator(options.previous.name, options.previous.mode),
 __first_child = __slider.firstChild,
 __last_child = __slider.lastChild,
 __slider_elements_count = __slider.childElementCount,
 __slider_wrapper = document.createElement('div'),
 __pos = null,
 __width = null,
 __height = null;
 if (!utils.validation.misc.is_undefined(options.circular) && !utils.validation.misc.is_bool(options.circular))
 return false;
 else
 options.circular = false;
 if (!utils.validation.misc.is_undefined(options.width))
 {
 if (!utils.validation.numerics.is_integer(options.width))
 return false;
 __width = options.width;
 }
 else
 __width = __slider.offsetWidth;
 if (!utils.validation.misc.is_undefined(options.height))
 {
 if (!utils.validation.numerics.is_integer(options.height))
 return false;
 __height = options.height;
 }
 else
 __height = __slider.offsetHeight;
 if (!utils.validation.misc.is_undefined(options.previous.callback) &&
 !utils.validation.misc.is_function(options.previous.callback))
 return false;
 if (!utils.validation.misc.is_undefined(options.next.callback) &&
 !utils.validation.misc.is_function(options.next.callback))
 return false;
 __slider_wrapper.className = 'slider_wrapper';
 __slider_wrapper.style.left = 'auto';
 __slider_wrapper.style.right = 'auto';
 __slider_wrapper.style.top = 'auto';
 __slider_wrapper.style.bottom = 'auto';
 __slider_wrapper.style.width = __width + 'px';
 __slider_wrapper.style.height = __height + 'px';
 __slider_wrapper.style.cssFloat = 'left';
 __slider_wrapper.style.overflow = 'hidden';
 __slider_wrapper.style.position = 'relative';
 __slider_wrapper.style.textAlign = 'start';
 __slider.style.top = '0px';
 __slider.style.left = '0px';
 __slider.style.right = 'auto';
 __slider.style.bottom = 'auto';
 __slider.style.width = (__width * __slider_elements_count) + 'px';
 __slider.style.height = __height + 'px';
 __slider.style.textAlign = 'left';
 __slider.style.cssFloat = 'left';
 __slider.style.margin = '0px';
 __slider.style.position = 'absolute';
 __slider.parentNode.insertBefore(__slider_wrapper, __slider);
 __slider_wrapper.appendChild(__slider);
 for (var i = 0; i < __slider_elements_count; i++)
 __slider.children[i].style.cssFloat = 'left';
 utils.events.attach(options.name, __previous, 'click',
 function()
 {
 var __last_element = __slider.children[__slider_elements_count - 1],
 __first_element = __slider.children[0];
 if (!options.circular && (__first_element === __first_child))
 return true;
 __slider.removeChild(__slider.children[__slider_elements_count - 1]);
 __slider.insertBefore(__last_element, __slider.children[0]);
 __slider.style.left = '-' + __width + 'px';
 var __interval_id = setInterval(function()
 {
 __pos = utils.graphics.pixels_value(__slider.style.left);
 if (__pos < -options.step)
 __slider.style.left = __pos + options.step + 'px';
 else
 {
 if (__pos === 0)
 {
 clearInterval(__interval_id);
 if (!utils.validation.misc.is_undefined(options.previous.callback))
 options.previous.callback.call();
 }
 else
 __slider.style.left = '0px';
 }
 }, options.speed);
 });
 utils.events.attach(options.name, __next, 'click',
 function()
 {
 var __first_element = __slider.children[0],
 __negative_width = -__width;
 if (!options.circular && (__first_element === __last_child))
 return true;
 __slider.style.left = '0px';
 var __interval_id = setInterval(function()
 {
 var __pos = utils.graphics.pixels_value(__slider.style.left);
 if (__negative_width + options.step < __pos)
 __slider.style.left = __pos - options.step + 'px';
 else
 {
 if (__pos === __negative_width)
 {
 __slider.removeChild(__slider.children[0]);
 __slider.insertBefore(__first_element,
 __slider.children[__slider_elements_count - 2].nextSibling);
 __slider.style.left = '0px';
 clearInterval(__interval_id);
 if (!utils.validation.misc.is_undefined(options.next.callback))
 options.next.callback.call();
 }
 else
 __slider.style.left = __negative_width + 'px';
 }
 }, options.speed);
 });
 };
 }
 function visibility()
 {
 this.is_visible = function(id, mode)
 {
 var __element = element_validator(id, mode);
 if (__element === false)
 return false;
 if (__element.style.display === 'none' || __element.style.display === '')
 return false;
 return true;
 };
 this.show = function(id, mode)
 {
 var __element = element_validator(id, mode);
 if (__element === false)
 return false;
 __element.style.display = 'block';
 return true;
 };
 this.hide = function(id, mode)
 {
 var __element = element_validator(id, mode);
 if (__element === false)
 return false;
 __element.style.display = 'none';
 return true;
 };
 this.toggle = function(id, mode)
 {
 var __element = element_validator(id, mode);
 if (__element === false)
 return false;
 if (__element.style.display === 'none' || __element.style.display === '')
 __element.style.display = 'block';
 else
 __element.style.display = 'none';
 return true;
 };
 }
 var self = this,
 utils = new vulcan();
 this.fade = new fade();
 this.opacity = new opacity();
 this.animation = new animation();
 this.visibility = new visibility();
}
function lava()
{
 function has_unknown_keywords(definition_model)
 {
 var __index = null,
 __attribute = null,
 __option = null;
 for (__index in definition_model)
 {
 __attribute = definition_model[__index];
 if (!utils.validation.misc.is_object(__attribute))
 {
 if (!utils.misc.contains(__index, def_keywords))
 return true;
 continue;
 }
 if ((utils.validation.misc.is_object(__attribute) && Object.getOwnPropertyNames(__attribute).length === 0) ||
 (utils.validation.misc.is_array(__attribute) && __attribute.length === 0))
 return true;
 for (__option in __attribute)
 {
 if (utils.validation.numerics.is_number(__option))
 continue;
 if (!utils.misc.contains(__option, def_keywords))
 return true;
 if (has_unknown_keywords(__attribute[__option]))
 return true;
 }
 }
 return false;
 }
 this.define = function(definition_model)
 {
 if (!utils.validation.misc.is_array(definition_model))
 {
 sensei('L.A.Va', 'Invalid definition model!');
 return false;
 }
 if (definition_model.length === 0)
 {
 sensei('L.A.Va', 'The definition model is null!');
 return false;
 }
 if (has_unknown_keywords(definition_model))
 {
 sensei('L.A.Va', 'The definition model contains unknown keywords\nor invalid values!');
 return false;
 }
 var __this_key = null,
 __this_value = null;
 is_model_defined = false;
 for (counter = 0; counter < definition_model.length; counter++)
 {
 if (!utils.validation.misc.is_object(definition_model[counter]))
 {
 sensei('L.A.Va', 'Invalid JSON object in the model!');
 return false;
 }
 if (!definition_model[counter].hasOwnProperty('key') || !definition_model[counter].hasOwnProperty('value'))
 {
 sensei('L.A.Va', 'Missing "key" or "value" mandatory attributes!');
 return false;
 }
 __this_key = definition_model[counter].key;
 __this_value = definition_model[counter].value;
 if (!utils.validation.misc.is_object(__this_key) || !utils.validation.misc.is_object(__this_value))
 {
 sensei('L.A.Va', 'A "key" or "value" attribute does not point to a JSON object!');
 return false;
 }
 if (!__this_key.hasOwnProperty('id') || !__this_key.hasOwnProperty('optional'))
 {
 sensei('L.A.Va', 'Missing "id" or "optional" mandatory properties!');
 return false;
 }
 if (!utils.validation.alpha.is_string(__this_key.id) || !utils.validation.misc.is_bool(__this_key.optional))
 {
 sensei('L.A.Va', 'Invalid specification for "id" or "optional" property!');
 return false;
 }
 if (utils.validation.misc.is_invalid(__this_key.id) || utils.objects.by_id(__this_key.id) === null)
 {
 sensei('L.A.Va', 'The "id" points to no HTML element!');
 return false;
 }
 if (!__this_value.hasOwnProperty('type'))
 {
 sensei('L.A.Va', 'Missing "type" mandatory property!');
 return false;
 }
 if (!utils.validation.alpha.is_string(__this_value.type) || !utils.misc.contains(__this_value.type, all_value_types))
 {
 sensei('L.A.Va', 'Invalid specification for "type" property!');
 return false;
 }
 if (__this_value.hasOwnProperty('choices'))
 {
 if (!utils.misc.contains(__this_value.type, types_with_choices))
 {
 sensei('L.A.Va', 'This type does not support the "choices" option!');
 return false;
 }
 if (!utils.validation.misc.is_array(__this_value.choices))
 {
 sensei('L.A.Va', 'The "choices" option has to be an array with at least\none element!');
 return false;
 }
 }
 if (__this_value.hasOwnProperty('length'))
 {
 if (utils.misc.contains(__this_value.type, uncountable_value_types))
 {
 sensei('L.A.Va', 'This type does not support the "length" option!');
 return false;
 }
 if (!utils.validation.numerics.is_integer(__this_value.length) || __this_value.length < 1)
 {
 sensei('L.A.Va', 'The "length" option has to be a positive integer!');
 return false;
 }
 }
 if (__this_value.hasOwnProperty('regex'))
 {
 if (utils.misc.contains(__this_value.type, uncountable_value_types) || __this_value.type === 'array')
 {
 sensei('L.A.Va', 'This type does not support the "regex" option!');
 return false;
 }
 if (utils.validation.misc.is_invalid(__this_value.regex))
 {
 sensei('L.A.Va', 'Invalid "regex" option!');
 return false;
 }
 }
 }
 is_model_defined = true;
 json_def_model = definition_model;
 return true;
 };
 this.validate = function()
 {
 if (!is_model_defined)
 {
 sensei('L.A.Va', 'No definition model was specified!');
 return false;
 }
 var __this_key = null,
 __this_value = null,
 __this_field = null,
 __keys_found = 0,
 __keys_optional = false;
 for (counter = 0; counter < json_def_model.length; counter++)
 {
 __this_key = json_def_model[counter].key;
 __this_field = utils.objects.by_id(__this_key.id);
 if (__this_field === null)
 {
 sensei('L.A.Va', 'Element: "' + __this_key.id + '" does not exist!');
 return false;
 }
 if (__this_key.optional === true)
 __keys_optional = true;
 __keys_found++;
 }
 if (__keys_found < json_def_model.length && __keys_optional === false)
 {
 sensei('L.A.Va', 'Defined non-optional elements differ from that on the page!');
 return false;
 }
 for (counter = 0; counter < json_def_model.length; counter++)
 {
 __this_key = json_def_model[counter].key;
 __this_value = json_def_model[counter].value;
 __this_field = utils.objects.by_id(__this_key.id);
 if (__this_field === null && __keys_optional === true)
 continue;
 if (__this_value.type !== '*')
 {
 if (__this_value.type === 'null')
 {
 if (__this_field.value !== null)
 {
 sensei('L.A.Va', 'Field: "' + __this_field.id + '" accepts only "null" values!');
 return false;
 }
 }
 else if (__this_value.type === 'number')
 {
 if (utils.validation.misc.is_nothing(__this_field.value.trim()) ||
 !utils.validation.numerics.is_number(Number(__this_field.value)))
 {
 sensei('L.A.Va', 'Field: "' + __this_field.id + '" accepts only numbers!');
 return false;
 }
 }
 else if (__this_value.type === 'array')
 {
 if (!utils.validation.misc.is_array(__this_field.value))
 {
 sensei('L.A.Va', 'Field: "' + __this_field.id + '" accepts only "array" values!');
 return false;
 }
 }
 else
 {
 if (typeof __this_field.value !== __this_value.type)
 {
 sensei('L.A.Va', 'Field: "' + __this_field.id + '" has a type mismatch!');
 return false;
 }
 }
 }
 if (__this_value.hasOwnProperty('choices'))
 {
 if (!utils.misc.contains(__this_field.value, __this_value.choices))
 {
 sensei('L.A.Va', 'Field: "' + __this_field.id + '" does not contain any defined choices!');
 return false;
 }
 }
 if (__this_value.hasOwnProperty('length'))
 {
 if ((__this_value.type === 'array' && __this_field.value.length > __this_value.length) ||
 (__this_value.type !== 'array' && __this_field.value.toString().length > __this_value.length))
 {
 sensei('L.A.Va', 'Field: "' + __this_field.id + '" exceeds the defined length!');
 return false;
 }
 }
 if (__this_value.hasOwnProperty('regex'))
 {
 if (!utils.validation.utilities.reg_exp(__this_value.regex, __this_field.value))
 {
 sensei('L.A.Va', 'Field: "' + __this_field.id + '" has not matched the specified regex!');
 return false;
 }
 }
 }
 return true;
 };
 this.verify = function(definition_model)
 {
 if (self.define(definition_model))
 return self.validate();
 return false;
 };
 var self = this,
 is_model_defined = false,
 counter = 0,
 json_def_model = null,
 def_keywords = ['key', 'value', 'id', 'optional', 'type', 'choices', 'length', 'regex'],
 all_value_types = ['number', 'string', 'boolean', 'array', 'object', 'function', 'null', '*'],
 uncountable_value_types = ['boolean', 'object', 'function', 'null', '*'],
 types_with_choices = ['number', 'string', 'array'],
 utils = new vulcan();
}
function task()
{
 var self = this;
 function task_model()
 {
 this.id = null;
 this.file = null;
 this.worker = null;
 }
 function task_manager_model()
 {
 this.create = function(worker_file)
 {
 var __new_worker = new Worker(worker_file);
 task.id = rnd_gen.generate(),
 task.file = worker_file;
 task.worker = __new_worker;
 is_task_created = true;
 return task.id;
 };
 this.destroy = function()
 {
 task.worker.terminate();
 is_task_created = false;
 return true;
 };
 this.message = function(any)
 {
 if (utils.validation.misc.is_function(any))
 task.worker.onmessage = function(e) { any.call(this, e); };
 else
 task.worker.postMessage(any);
 return true;
 };
 }
 function message()
 {
 this.receive = function(callback)
 {
 if (!utils.validation.misc.is_function(callback))
 return false;
 if (is_task_created === false)
 return false;
 return task_manager.message(callback);
 };
 this.send = function(data)
 {
 if (utils.validation.misc.is_invalid(data))
 return false;
 if (is_task_created === false)
 return false;
 return task_manager.message(data);
 };
 }
 this.id = function()
 {
 if (is_task_created === false)
 return false;
 return task.id;
 };
 this.create = function(worker_file)
 {
 if (utils.validation.misc.is_invalid(worker_file) || !utils.validation.alpha.is_string(worker_file))
 return false;
 if (is_task_created === true)
 return false;
 return task_manager.create(worker_file);
 };
 this.destroy = function()
 {
 if (is_task_created === false)
 return false;
 return task_manager.destroy();
 };
 function init()
 {
 if (utils.validation.misc.is_undefined(Worker))
 return false;
 return this;
 }
 var is_task_created = false,
 task = new task_model(),
 task_manager = new task_manager_model(),
 rnd_gen = new pythia(),
 utils = new vulcan();
 this.message = new message();
 init();
}
function parallel()
{
 var self = this;
 function tasks_manager_model()
 {
 function tasks_list_model()
 {
 this.num = 0;
 this.tasks = [];
 }
 function tasks_info()
 {
 this.num = function()
 {
 return tasks_list.num;
 };
 this.list = function(index)
 {
 if (utils.validation.misc.is_undefined(index))
 return tasks_list.tasks;
 else
 return tasks_list.tasks[index];
 };
 }
 this.create = function(worker_file)
 {
 var __new_task = new task(),
 __new_task_id = __new_task.create(worker_file);
 if (__new_task_id === false)
 return false;
 tasks_list.tasks.push(__new_task);
 tasks_list.num++;
 is_task_created = true;
 return __new_task_id;
 };
 this.destroy = function(task_id)
 {
 var __task = null;
 for (__index = 0; __index < tasks_list.num; __index++)
 {
 __task = tasks_list.tasks[__index];
 if (__task.id() === task_id)
 {
 tasks_list.tasks.splice(__index, 1);
 if (tasks_list.num === 0)
 is_task_created = false;
 return __task.destroy();
 }
 }
 return false;
 };
 this.run = function(task_id, data, callback)
 {
 var __task = null;
 for (__index = 0; __index < tasks_list.num; __index++)
 {
 __task = tasks_list.tasks[__index];
 if (__task.id() === task_id)
 {
 __task.message.send(data);
 __task.message.receive(callback);
 return true;
 }
 }
 return false;
 };
 this.run_all = function(tasks_config)
 {
 if (utils.validation.misc.is_undefined(tasks_config))
 return false;
 if (!config_parser.verify(tasks_config_model, tasks_config))
 return false;
 var __this_task_config = null,
 __task = null;
 for (__this_task_config of tasks_config)
 {
 if (!utils.validation.misc.is_undefined(__this_task_config.callback) &&
 !utils.validation.misc.is_function(__this_task_config.callback))
 return false;
 for (__index = 0; __index < tasks_list.num; __index++)
 {
 __task = tasks_list.tasks[__index];
 if (__task.id() === __this_task_config.id)
 {
 if (!utils.validation.misc.is_undefined(__this_task_config.data))
 __task.message.send(__this_task_config.data);
 if (!utils.validation.misc.is_undefined(__this_task_config.callback))
 __task.message.receive(__this_task_config.callback);
 }
 }
 }
 return true;
 };
 this.kill = function()
 {
 for (__index = 0; __index < tasks_list.num; __index++)
 tasks_list.tasks[__index].destroy();
 tasks_list = new tasks_list_model();
 is_task_created = false;
 return null;
 };
 this.tasks = new tasks_info();
 var __index = 0,
 tasks_list = new tasks_list_model();
 }
 this.num = function()
 {
 if (is_task_created === false)
 return false;
 return tasks_manager.tasks.num();
 };
 this.list = function(index)
 {
 if (is_task_created === false)
 return false;
 if (utils.validation.misc.is_undefined(index))
 return tasks_manager.tasks.list();
 if (!utils.validation.numerics.is_integer(index)
 || index < 0 || index > (tasks_manager.tasks.num() - 1))
 return false;
 return tasks_manager.tasks.list(index);
 };
 this.create = function(worker_file)
 {
 return tasks_manager.create(worker_file);
 };
 this.destroy = function(task_id)
 {
 if (!utils.validation.numerics.is_integer(task_id))
 return false;
 if (is_task_created === false)
 return false;
 return tasks_manager.destroy(task_id);
 };
 this.run = function(task_id, data = null, callback = null)
 {
 if (!utils.validation.numerics.is_integer(task_id))
 return false;
 if (is_task_created === false)
 return false;
 return tasks_manager.run(task_id, data, callback);
 };
 this.run_all = function(tasks_config)
 {
 if (is_task_created === false)
 return false;
 return tasks_manager.run_all(tasks_config);
 };
 this.kill = function()
 {
 if (is_task_created === false)
 return false;
 tasks_manager.kill();
 return true;
 };
 function init()
 {
 if (utils.validation.misc.is_undefined(Worker))
 return false;
 return this;
 }
 var is_task_created = false,
 tasks_config_model =
 { "arguments" : [
 {
 "key" : { "name" : "id", "optional" : false },
 "value" : { "type" : "number" }
 },
 {
 "key" : { "name" : "data", "optional" : false },
 "value" : { "type" : "*" }
 },
 {
 "key" : { "name" : "callback", "optional" : true },
 "value" : { "type" : "*" }
 }
 ]
 };
 tasks_manager = new tasks_manager_model(),
 config_parser = new jap(),
 utils = new vulcan();
 init();
}
function snail()
{
 this.test = function(loops)
 {
 if (!utils.validation.misc.is_undefined(loops) && (!utils.validation.numerics.is_integer(loops) || loops < 1))
 return false;
 if (utils.validation.misc.is_undefined(loops))
 loops = 100000000;
 performance.benchmark.start();
 while (loops >= 0)
 loops--;
 performance.benchmark.end();
 benchmark_index = performance.benchmark.latency();
 return true;
 };
 this.index = function()
 {
 if (benchmark_index === -1)
 return false;
 return benchmark_index;
 };
 var benchmark_index = -1,
 performance = new centurion(),
 utils = new vulcan();
}
function workbox()
{
 function general_helpers()
 {
 var self = this;
 this.draw_screen = function(container_id, title, button_label)
 {
 var __title_object = null,
 __button_object = null,
 __container = utils.objects.by_id(container_id),
 __html = null;
 if (!__container || utils.validation.misc.is_invalid(__container))
 return false;
 workbox_object = utils.objects.by_id('workbox');
 if (!workbox_object)
 __container.removeChild(workbox_object);
 workbox_object = document.createElement('div');
 workbox_object.id = 'workbox_' + random.generate();
 workbox_object.className = 'wb_screen';
 var __win_title_id = workbox_object.id + '_title',
 __button_title_id = workbox_object.id + '_button';
 __html = '<div class="work_window">' +
 ' <div id="' + __win_title_id + '"></div>' +
 ' <div id="' + workbox_object.id + '_content"></div>' +
 ' <div id="' + __button_title_id + '"></div>' +
 '</div>';
 workbox_object.innerHTML = __html;
 __container.appendChild(workbox_object);
 __title_object = utils.objects.by_id(__win_title_id);
 __button_object = utils.objects.by_id(__button_title_id);
 content_fetcher(__win_title_id, null,
 function()
 {
 __title_object.innerHTML = title;
 __button_object.innerHTML = button_label;
 },
 function()
 {
 __title_object.innerHTML = 'Alert';
 __button_object.innerHTML = 'Close';
 },
 function()
 {
 utils.events.attach(__button_title_id, __button_object, 'click', self.hide_win);
 });
 return true;
 };
 this.show_win = function(message)
 {
 if (timer !== null)
 clearTimeout(timer);
 workbox_object.childNodes[0].childNodes[3].innerHTML = message;
 workbox_object.style.visibility = 'visible';
 workbox_object.classList.remove('wb_fade_out');
 workbox_object.classList.add('wb_fade_in');
 is_open = true;
 if (global_show_callback !== null)
 {
 global_show_callback.call(this);
 global_show_callback = null;
 }
 };
 this.hide_win = function()
 {
 if (timer !== null)
 clearTimeout(timer);
 workbox_object.style.visibility = 'visible';
 workbox_object.classList.remove('wb_fade_in');
 workbox_object.classList.add('wb_fade_out');
 timer = setTimeout(function() { workbox_object.style.visibility = 'hidden'; }, 250);
 is_open = false;
 if (global_hide_callback !== null)
 {
 global_hide_callback.call(this);
 global_hide_callback = null;
 }
 };
 }
 this.show = function(message, show_callback, hide_callback)
 {
 if (!is_init || is_open || !utils.validation.alpha.is_string(message) ||
 (!utils.validation.misc.is_invalid(show_callback) &&
 !utils.validation.misc.is_function(show_callback)) ||
 (!utils.validation.misc.is_invalid(hide_callback) &&
 !utils.validation.misc.is_function(hide_callback)))
 return false;
 if (utils.validation.misc.is_function(show_callback))
 global_show_callback = show_callback;
 if (utils.validation.misc.is_function(hide_callback))
 global_hide_callback = hide_callback;
 helpers.show_win(message);
 return true;
 };
 this.hide = function(hide_callback)
 {
 if (!is_init || !is_open ||
 (!utils.validation.misc.is_invalid(hide_callback) &&
 !utils.validation.misc.is_function(hide_callback)))
 return false;
 if (utils.validation.misc.is_function(hide_callback))
 global_hide_callback = hide_callback;
 helpers.hide_win();
 return true;
 };
 this.is_open = function()
 {
 if (!is_init)
 return false;
 return is_open;
 };
 this.init = function(container_id, title, button_label)
 {
 if (is_init)
 return false;
 if (utils.validation.misc.is_invalid(container_id) || !utils.validation.alpha.is_string(container_id) ||
 !utils.validation.alpha.is_string(title) || !utils.validation.alpha.is_string(button_label))
 return false;
 utils.graphics.apply_theme('/framework/extensions/js/core/workbox', 'workbox');
 if (!helpers.draw_screen(container_id, title, button_label))
 return false;
 is_init = true;
 return true;
 };
 var is_init = false,
 is_open = false,
 workbox_object = null,
 global_show_callback = null,
 global_hide_callback = null,
 timer = null,
 helpers = new general_helpers(),
 utils = new vulcan(),
 random = new pythia();
}
function ultron(anonymous_function)
{
 var utils = new vulcan();
 if (!utils.validation.misc.is_function(anonymous_function))
 return false;
 document.addEventListener("DOMContentLoaded", function(event) { (anonymous_function)(event); });
 return true;
}
function teal_fs()
{
 var self = this;
 this.read = function()
 {
 };
 this.write = function()
 {
 };
 this.move = function()
 {
 };
 this.delete = function()
 {
 };
 this.close = function()
 {
 };
 this.link = function()
 {
 };
 this.permissions = function()
 {
 };
 this.metadata = function()
 {
 };
 this.list = function()
 {
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
 return true;
 };
 var backtrace = false,
 cosmos = null,
 colony = null,
 utils_sys = new vulcan();
}
function boot_screen()
{
 function utilities()
 {
 this.draw_boot_screen = function()
 {
 var __dynamic_object = null;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', 'boot_screen');
 __dynamic_object.innerHTML = '<div id="boot_screen_content">\
 <img src="/site/pix/greyos_logo.png" alt="GreyOS Logo">\
 <br>\
 <div id="boot_screen_message"></div>\
 </div>';
 utils_sys.objects.by_id('greyos').appendChild(__dynamic_object);
 };
 }
 this.init = function()
 {
 var firefox_browser = new firefox_mode();
 if (firefox_browser.check())
 firefox_browser.init();
 else if (navigator.onLine === false)
 {
 utils_int.draw_boot_screen();
 var __boot_message = utils_sys.objects.by_id('boot_screen_message');
 __boot_message.innerHTML = 'Your are offline!' +
 '<br>' +
 'Check your Internet connection and reload.';
 return false;
 }
 else if (window.innerWidth < 1280 || window.innerHeight < 600)
 {
 utils_int.draw_boot_screen();
 var __boot_message = utils_sys.objects.by_id('boot_screen_message');
 __boot_message.innerHTML = 'Your screen is too small to run GreyOS!' +
 '<br>' +
 'Only screens from "1280 x 600" pixels and up are supported.';
 return false;
 }
 return true;
 };
 var utils_sys = new vulcan(),
 utils_int = new utilities();
}
function loading_screen()
{
 var self = this;
 function utilities()
 {
 this.draw = function()
 {
 var __loading_screen = null;
 __loading_screen = document.createElement('div');
 __loading_screen.id = 'loading_screen';
 __loading_screen.innerHTML = '<div id="loading_screen_content">\
 <img src="/site/pix/greyos_logo.png" alt="GreyOS Logo">\
 <div id="loading_indicator">LOADING...</div>\
 </div>';
 __loading_screen.style.display = 'block';
 document.body.appendChild(__loading_screen);
 return true;
 };
 this.clear = function()
 {
 var __loading_screen = utils_sys.objects.by_id('loading_screen');
 document.body.removeChild(__loading_screen);
 return true;
 };
 }
 function status()
 {
 var __loading = false;
 this.loading = function(val)
 {
 if (utils_sys.validation.misc.is_undefined(val))
 return __loading;
 __loading = val;
 return true;
 };
 }
 this.show = function()
 {
 if (self.status.loading())
 return false;
 if (!utils_int.draw())
 return false;
 self.status.loading(true);
 return true;
 };
 this.hide = function()
 {
 if (!self.status.loading())
 return false;
 utils_int.clear();
 self.status.loading(false);
 return true;
 };
 var utils_sys = new vulcan(),
 utils_int = new utilities();
 this.status = new status();
}
function f5()
{
 function reboot(message)
 {
 var __dynamic_object = null,
 __message = 'Unloading...';
 if (!utils_sys.validation.misc.is_undefined(message))
 {
 if (utils_sys.validation.alpha.is_symbol(message))
 return false;
 __message = message;
 }
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', 'f5_screen');
 __dynamic_object.innerHTML = '<div id="f5_screen_content">\
 <img src="/site/pix/greyos_logo.png" alt="GreyOS Logo">\
 <div id="f5_screen_message">' + __message + '</div>\
 </div>';
 utils_sys.objects.by_id('greyos').appendChild(__dynamic_object);
 setTimeout(function() { location.reload(); }, 1000);
 }
 this.init = function(message)
 {
 if (is_rebooting === true)
 return;
 is_rebooting = true;
 reboot(message);
 };
 var is_rebooting = false,
 utils_sys = new vulcan();
}
function linux_mode()
{
 var self = this;
 function utilities()
 {
 this.apply_css_fix = function()
 {
 utils_sys.graphics.apply_theme('/framework/extensions/js/core/linux_mode', 'linux');
 return true;
 };
 }
 this.check = function()
 {
 if (navigator.userAgent.indexOf('Linux') > -1)
 return true;
 return false;
 };
 this.init = function()
 {
 utils_int.apply_css_fix();
 return true;
 };
 var utils_sys = new vulcan(),
 utils_int = new utilities();
}
function firefox_mode()
{
 var self = this;
 function utilities()
 {
 this.apply_css_fix = function()
 {
 utils_sys.graphics.apply_theme('/framework/extensions/js/core/firefox_mode', 'firefox');
 return true;
 };
 }
 this.check = function()
 {
 if (navigator.userAgent.indexOf('Chrome') === -1)
 return true;
 return false;
 };
 this.init = function()
 {
 utils_int.apply_css_fix();
 return true;
 };
 var utils_sys = new vulcan(),
 utils_int = new utilities();
}
function tablet_mode()
{
 var self = this;
 function utilities()
 {
 this.apply_css_fix = function()
 {
 utils_sys.graphics.apply_theme('/framework/extensions/js/core/tablet_mode', 'tablet');
 return true;
 };
 }
 this.check = function()
 {
 if (navigator.maxTouchPoints > 0 || navigator.userAgent.indexOf('android') > -1 || navigator.userAgent.indexOf('ios') > -1)
 return true;
 return false;
 };
 this.init = function()
 {
 utils_int.apply_css_fix();
 return true;
 };
 var utils_sys = new vulcan(),
 utils_int = new utilities();
}
function frog(caller, title, object, extra = null)
{
 var __index = 0,
 __top_padding = '',
 __bottom_padding = '',
 __extra_padding = '',
 utils = new vulcan();
 if ((!utils.validation.misc.is_invalid(caller) && !utils.validation.alpha.is_string(caller)) ||
 (!utils.validation.misc.is_invalid(title) && !utils.validation.alpha.is_string(title)) ||
 (extra !== null && !utils.validation.alpha.is_string(extra)))
 return false;
 for (__index = 0; __index < Math.abs(title.length - caller.length); __index++)
 {
 if (__index % 2 === 1)
 __top_padding += '*';
 }
 for (__index = 0; __index < title.length; __index++)
 __bottom_padding += '-';
 if (title.length % 2 === 1)
 __extra_padding = '*';
 console.log('**************************' +
 __top_padding +
 ' [' + caller + '] ' +
 __top_padding +
 '**************************' + __extra_padding);
 console.log('--------------------------- ' + title + ' ---------------------------');
 console.log(object);
 console.log('----------------------------' + __bottom_padding + '----------------------------');
 if (extra !== null)
 console.log(extra);
 __top_padding = '';
 for (__index = 0; __index < title.length; __index++)
 __top_padding += '*';
 console.log('****************************' + __top_padding + '****************************');
 console.log('\n\n');
 return true;
}
function teletraan()
{
 var self = this;
 function settings_model()
 {
 this.boot_mode = 0;
 this.name = 'GreyOS';
 this.version = '0.0';
 this.theme = null;
 this.max_apps = 10;
 this.max_services = 10;
 this.apps_per_view = 8;
 this.stack_bars = 4;
 }
 this.get = function(option)
 {
 if (utils_sys.validation.alpha.is_symbol(option))
 return false;
 if (!settings.hasOwnProperty(option))
 return false;
 return settings[option];
 };
 this.set = function(option, val)
 {
 if (utils_sys.validation.alpha.is_symbol(option) || utils_sys.validation.misc.is_undefined(val))
 return false;
 if (!settings.hasOwnProperty(option))
 return false;
 settings[option] = val;
 return true;
 };
 this.reset = function()
 {
 settings = new settings_model();
 return true;
 };
 var settings = new settings_model(),
 utils_sys = new vulcan();
}
function scenario()
{
 var self = this;
 function scripts_model()
 {
 this.num = 0;
 this.list = [];
 }
 function utilities()
 {
 this.is_indices_array = function(indices_array)
 {
 if (!utils_sys.validation.misc.is_array(indices_array))
 return false;
 var __indices_num = indices_array.length;
 if (__indices_num === 0 || indices_array.length > scripts.num)
 return false;
 for (var i = 0; i < indices_array.length; i++)
 {
 if (!utils_sys.validation.numerics.is_integer(indices_array[i]))
 return false;
 }
 return true;
 };
 this.script_exists = function(script)
 {
 for (var i = 0; i < scripts.num; i++)
 {
 if (scripts.list[i] === script)
 return true;
 }
 return false;
 };
 }
 this.num = function()
 {
 return scripts.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_undefined(index))
 return scripts.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (scripts.num - 1))
 return false;
 return scripts.list[index];
 };
 this.use = function(scripts_array)
 {
 if (!utils_sys.validation.misc.is_array(scripts_array))
 return false;
 var __scripts_num = scripts_array.length;
 if (__scripts_num === 0)
 return false;
 for (var i = 0; i < __scripts_num; i++)
 {
 if (!utils_sys.validation.misc.is_function(scripts_array[i]))
 {
 if (backtrace === true)
 frog('SCENARIO', 'Scripts :: Invalid', scripts_array[i]);
 self.clear();
 return false;
 }
 if (utils_int.script_exists(scripts_array[i]))
 {
 if (backtrace === true)
 frog('SCENARIO', 'Scripts :: Duplication', scripts_array[i]);
 self.clear();
 return false;
 }
 scripts.list.push(scripts_array[i]);
 scripts.num++;
 if (backtrace === true)
 frog('SCENARIO', 'Scripts :: Addition', scripts_array[i]);
 }
 if (backtrace === true)
 frog('SCENARIO', 'All scripts', scripts.list, 'Script count: ' + scripts.num);
 return true;
 };
 this.clear = function()
 {
 if (scripts.num === 0)
 return false;
 scripts.num = 0;
 scripts.list = [];
 if (backtrace === true)
 frog('SCENARIO', 'Scripts :: Clear', scripts.list);
 return true;
 };
 this.execute = function(indices_array)
 {
 if (scripts.num === 0)
 return false;
 if (utils_sys.validation.misc.is_undefined(indices_array))
 {
 for (var i = 0; i < scripts.num; i++)
 scripts.list[i].call();
 return true;
 }
 if (!utils_int.is_indices_array(indices_array))
 return false;
 for (var i = 0; i < indices_array.length; i++)
 scripts.list[indices_array[i]].call();
 return true;
 };
 this.backtrace = function(val)
 {
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 backtrace = val;
 return true;
 };
 var backtrace = false,
 utils_sys = new vulcan(),
 scripts = new scripts_model(),
 utils_int = new utilities();
}
function multiverse()
{
 var self = this;
 function universe_bubbles()
 {
 this.num = 0;
 this.list = [];
 }
 function utilities()
 {
 this.is_cosmos = function(object)
 {
 if (!utils_sys.validation.misc.is_object(object))
 return false;
 if (utils_sys.validation.misc.is_undefined(object.id) || utils_sys.validation.misc.is_undefined(object.backtrace) ||
 utils_sys.validation.misc.is_undefined(object.hub) || utils_sys.validation.misc.is_undefined(object.status))
 return false;
 return true;
 };
 }
 this.num = function()
 {
 return bubbles.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_undefined(index))
 return bubbles.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (bubbles.num - 1))
 return false;
 return bubbles.list[index];
 };
 this.add = function(cosmos_array)
 {
 if (!utils_sys.validation.misc.is_array(cosmos_array))
 return false;
 var __cosmos_num = cosmos_array.length;
 if (__cosmos_num === 0)
 return false;
 for (var i = 0; i < __cosmos_num; i++)
 {
 if (!utils_int.is_cosmos(cosmos_array[i]))
 {
 if (backtrace === true)
 frog('MULTIVERSE', 'Models :: Invalid', cosmos_array[i]);
 self.clear();
 return false;
 }
 bubbles.list.push(cosmos_array[i]);
 bubbles.num++;
 if (backtrace === true)
 frog('MULTIVERSE', 'Models :: Addition', cosmos_array[i].id());
 }
 if (backtrace === true)
 frog('MULTIVERSE', 'All models', bubbles.list, 'Model count: ' + bubbles.num);
 return true;
 };
 this.remove = function(cosmos_id)
 {
 if (utils_sys.validation.alpha.is_symbol(cosmos_id))
 return false;
 for (var i = 0; i < bubbles.num; i++)
 {
 var temp_obj = new bubbles.list[i];
 if (temp_obj.id() === cosmos_id)
 {
 bubbles.list.splice(i, 1);
 bubbles.num--;
 if (backtrace === true)
 {
 frog('MULTIVERSE', 'Models :: Removal', cosmos_id);
 frog('MULTIVERSE', 'All models', bubbles.list, 'Model count: ' + bubbles.num);
 }
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (bubbles.num === 0)
 return false;
 bubbles.num = 0;
 bubbles.list = [];
 if (backtrace === true)
 frog('MULTIVERSE', 'Models :: Clear', bubbles.list);
 return true;
 };
 this.backtrace = function(val)
 {
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 backtrace = val;
 return true;
 };
 var backtrace = false,
 utils_sys = new vulcan(),
 bubbles = new universe_bubbles(),
 utils_int = new utilities();
}
function cosmos()
{
 var self = this;
 function system_model()
 {
 this.id = 'cosmos_' + random.generate();
 this.backtrace = false;
 this.models_num = 0;
 this.models = [];
 }
 function cosmos_ref_model()
 {
 this.id = function()
 {
 return self.id();
 };
 this.hub = self.hub;
 this.status = self.status;
 }
 function utilities()
 {
 var me = this;
 this.model_exists = function(model)
 {
 if (!utils_sys.validation.misc.is_object(model))
 return false;
 for (var i = 0; i < system.models_num; i++)
 {
 if (system.models[i].constructor.name === model.constructor.name)
 return true;
 }
 return false;
 };
 this.model_name = function(model)
 {
 if (!utils_sys.validation.misc.is_object(model))
 return false;
 return model.constructor.name;
 };
 this.fetch_model = function(model_name)
 {
 if (!utils_sys.validation.alpha.is_string(model_name))
 return false;
 for (var i = 0; i < system.models_num; i++)
 {
 if (me.model_name(system.models[i]) === model_name)
 {
 if (system.backtrace === true)
 frog('COSMOS', 'Models :: Fetch', model_name);
 return system.models[i];
 }
 }
 return false;
 };
 }
 function status()
 {
 this.backtrace = function()
 {
 return system.backtrace;
 };
 this.models_num = function()
 {
 return system.models_num;
 };
 }
 function hub()
 {
 this.attach = function(models_array)
 {
 if (!utils_sys.validation.misc.is_array(models_array) || models_array.length === 0)
 return false;
 var __models_num = models_array.length;
 if (__models_num === 0)
 return false;
 for (var i = 0; i < __models_num; i++)
 {
 if (!utils_sys.validation.misc.is_function(models_array[i]))
 {
 if (backtrace === true)
 frog('COSMOS', 'Models :: Invalid', models_array[i]);
 self.hub.clear();
 return false;
 }
 var __object_model = new models_array[i]();
 if (utils_int.model_exists(__object_model))
 {
 if (system.backtrace === true)
 frog('COSMOS', 'Models :: Duplication', __object_model.constructor.name);
 self.hub.clear();
 return false;
 }
 system.models.push(__object_model);
 system.models_num++;
 if (system.backtrace === true)
 frog('COSMOS', 'Models :: Attachment', __object_model.constructor.name);
 }
 var __cosmos_ref = new cosmos_ref_model();
 for (var i = 0; i < system.models_num; i++)
 system.models[i].cosmos(__cosmos_ref);
 if (system.backtrace === true)
 frog('COSMOS', 'All models', system.models, 'Model count: ' + system.models_num);
 return true;
 };
 this.access = function(model_name)
 {
 if (!utils_sys.validation.alpha.is_string(model_name))
 return false;
 return utils_int.fetch_model(model_name);
 };
 this.containers = function()
 {
 return system.models;
 };
 this.clear = function()
 {
 if (system.models_num === 0)
 return false;
 system.models_num = 0;
 system.models = [];
 if (system.backtrace === true)
 frog('COSMOS', 'Models :: Clear', system.models);
 return true;
 };
 }
 this.id = function()
 {
 return system.id;
 };
 this.backtrace = function(val)
 {
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 system.backtrace = val;
 return true;
 };
 var utils_sys = new vulcan(),
 random = new pythia(),
 system = new system_model(),
 utils_int = new utilities();
 this.hub = new hub();
 this.status = new status();
}
function matrix()
{
 var self = this;
 function components_model()
 {
 this.num = 0;
 this.list = [];
 }
 function utilities()
 {
 var me = this;
 this.model_exists = function(model)
 {
 if (!utils_sys.validation.misc.is_object(model))
 return false;
 for (var i = 0; i < components.num; i++)
 {
 if (components.list[i].constructor.name === model.constructor.name)
 return true;
 }
 return false;
 };
 }
 this.num = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return components.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(index))
 return components.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (components.num - 1))
 return false;
 return components.list[index];
 };
 this.get = function(component_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (components.num === 0)
 return null;
 if (utils_sys.validation.alpha.is_symbol(component_id))
 return false;
 for (var i = 0; i < components.num; i++)
 {
 if (components.list[i].constructor.name === component_id)
 {
 if (backtrace === true)
 frog('MATRIX', 'Models :: Get', component_id);
 components.list[i].cosmos(cosmos);
 return components.list[i];
 }
 }
 return false;
 };
 this.register = function(models_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(models_array))
 return false;
 var __models_num = models_array.length;
 if (__models_num === 0)
 return false;
 for (var i = 0; i < __models_num; i++)
 {
 if (!utils_sys.validation.misc.is_function(models_array[i]))
 {
 if (backtrace === true)
 frog('MATRIX', 'Models :: Invalid', models_array[i]);
 self.clear();
 return false;
 }
 var __object_model = new models_array[i]();
 if (utils_int.model_exists(__object_model))
 {
 if (backtrace === true)
 frog('MATRIX', 'Models :: Duplication', __object_model.constructor.name);
 self.clear();
 return false;
 }
 components.list.push(__object_model);
 components.num++;
 if (backtrace === true)
 frog('MATRIX', 'Models :: Register', __object_model.constructor.name);
 }
 if (backtrace === true)
 frog('MATRIX', 'All models', components.list, 'Model count: ' + components.num);
 return true;
 };
 this.unregister = function(component_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.alpha.is_symbol(component_id))
 return false;
 for (var i = 0; i < components.num; i++)
 {
 if (components.list[i].constructor.name === component_id)
 {
 components.list.splice(i, 1);
 components.num--;
 if (backtrace === true)
 {
 frog('MATRIX', 'Models :: Unregister', component_id);
 frog('MATRIX', 'All models', components.list, 'Model count: ' + components.num);
 }
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (components.num === 0)
 return false;
 components.num = 0;
 components.list = [];
 if (backtrace === true)
 frog('MATRIX', 'Models :: Clear', components.list);
 return true;
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
 components = new components_model(),
 utils_int = new utilities();
}
function dev_box()
{
 var self = this;
 function tool_box_model()
 {
 this.num = 0;
 this.list = [];
 }
 function utilities()
 {
 this.model_exists = function(model)
 {
 if (!utils_sys.validation.misc.is_object(model))
 return false;
 for (var i = 0; i < tools.num; i++)
 {
 if (tools.list[i].constructor.name === model.constructor.name)
 return true;
 }
 return false;
 };
 }
 this.num = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return tools.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(index))
 return tools.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (tools.num - 1))
 return false;
 return tools.list[index];
 };
 this.get = function(tool_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (tools.num === 0)
 return null;
 if (utils_sys.validation.alpha.is_symbol(tool_id))
 return false;
 for (var i = 0; i < tools.num; i++)
 {
 if (tools.list[i].constructor.name === tool_id)
 {
 var __new_tool = new tools.list[i].constructor();
 __new_tool.cosmos(cosmos);
 if (backtrace === true)
 frog('DEV BOX', 'Models :: Get', tool_id);
 return __new_tool;
 }
 }
 return false;
 };
 this.add = function(models_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(models_array))
 return false;
 var __models_num = models_array.length;
 if (__models_num === 0)
 return false;
 for (var i = 0; i < __models_num; i++)
 {
 if (!utils_sys.validation.misc.is_function(models_array[i]))
 {
 if (backtrace === true)
 frog('DEV BOX', 'Models :: Invalid', models_array[i]);
 self.clear();
 return false;
 }
 var __object_model = new models_array[i]();
 if (utils_int.model_exists(__object_model))
 {
 if (backtrace === true)
 frog('DEV BOX', 'Models :: Duplication', __object_model.constructor.name);
 self.clear();
 return false;
 }
 tools.list.push(__object_model);
 tools.num++;
 if (backtrace === true)
 frog('DEV BOX', 'Models :: Addition', __object_model.constructor.name);
 }
 if (backtrace === true)
 frog('DEV BOX', 'All models', tools.list, 'Model count: ' + tools.num);
 return true;
 };
 this.remove = function(tool_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.alpha.is_symbol(tool_id))
 return false;
 for (var i = 0; i < tools.num; i++)
 {
 if (tools.list[i].constructor.name === tool_id)
 {
 tools.list.splice(i, 1);
 tools.num--;
 if (backtrace === true)
 {
 frog('DEV BOX', 'Models :: Removal', tool_id);
 frog('DEV BOX', 'All models', tools.list, 'Model count: ' + tools.num);
 }
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (tools.num === 0)
 return false;
 tools.num = 0;
 tools.list = [];
 if (backtrace === true)
 frog('DEV BOX', 'Models :: Clear', tools.list);
 return true;
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
 tools = new tool_box_model(),
 utils_int = new utilities();
}
function app_box()
{
 var self = this;
 function app_box_model()
 {
 this.num = 0;
 this.list = [];
 }
 function utilities()
 {
 this.model_exists = function(model)
 {
 if (!utils_sys.validation.misc.is_object(model))
 return false;
 for (var i = 0; i < apps.num; i++)
 {
 if (apps.list[i].constructor.name === model.constructor.name)
 return true;
 }
 return false;
 };
 }
 this.num = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return apps.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(index))
 return apps.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (apps.num - 1))
 return false;
 return apps.list[index];
 };
 this.get = function(app_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (apps.num === 0)
 return null;
 if (utils_sys.validation.alpha.is_symbol(app_id))
 return false;
 for (var i = 0; i < apps.num; i++)
 {
 if (apps.list[i].constructor.name === app_id)
 {
 var __new_app = new apps.list[i].constructor();
 __new_app.cosmos(cosmos);
 if (backtrace === true)
 frog('APP BOX', 'Models :: Get', app_id);
 return __new_app;
 }
 }
 return false;
 };
 this.add = function(models_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(models_array))
 return false;
 var __models_num = models_array.length;
 if (__models_num === 0)
 return false;
 for (var i = 0; i < __models_num; i++)
 {
 var __func = new Function('return new ' + models_array[i] + '()'),
 __object_model = new __func;
 if (!utils_sys.validation.misc.is_object(__object_model))
 {
 if (backtrace === true)
 frog('APP BOX', 'Models :: Invalid', models_array[i]);
 self.clear();
 return false;
 }
 if (utils_int.model_exists(__object_model))
 {
 if (backtrace === true)
 frog('APP BOX', 'Models :: Duplication', __object_model.constructor.name);
 self.clear();
 return false;
 }
 apps.list.push(__object_model);
 apps.num++;
 if (backtrace === true)
 frog('APP BOX', 'Models :: Addition', __object_model.constructor.name);
 }
 if (backtrace === true)
 frog('APP BOX', 'All models', apps.list, 'Model count: ' + apps.num);
 return true;
 };
 this.remove = function(app_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.alpha.is_symbol(app_id))
 return false;
 for (var i = 0; i < apps.num; i++)
 {
 if (apps.list[i].constructor.name === app_id)
 {
 apps.list.splice(i, 1);
 apps.num--;
 if (backtrace === true)
 {
 frog('APP BOX', 'Models :: Removal', app_id);
 frog('APP BOX', 'All models', apps.list, 'Model count: ' + apps.num);
 }
 return true;
 }
 }
 return false;
 };
 this.replace = function(models_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(models_array))
 return false;
 var __models_num = models_array.length;
 if (__models_num === 0)
 return false;
 for (var i = 0; i < __models_num; i++)
 {
 var __func = new Function('return new ' + models_array[i] + '()'),
 __object_model = new __func;
 if (!utils_sys.validation.misc.is_object(__object_model))
 {
 if (backtrace === true)
 frog('APP BOX', 'Models :: Invalid', models_array[i]);
 self.clear();
 return false;
 }
 self.remove(models_array[i].name);
 }
 return self.add(models_array);
 };
 this.clear = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (apps.num === 0)
 return false;
 apps.num = 0;
 apps.list = [];
 if (backtrace === true)
 frog('APP BOX', 'Models :: Clear', apps.list);
 return true;
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
 apps = new app_box_model(),
 utils_int = new utilities();
}
function svc_box()
{
 var self = this;
 function svc_box_model()
 {
 this.num = 0;
 this.list = [];
 }
 function utilities()
 {
 this.model_exists = function(model)
 {
 if (!utils_sys.validation.misc.is_object(model))
 return false;
 for (var i = 0; i < svcs.num; i++)
 {
 if (svcs.list[i].constructor.name === model.constructor.name)
 return true;
 }
 return false;
 };
 }
 this.num = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return svcs.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(index))
 return svcs.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (svcs.num - 1))
 return false;
 return svcs.list[index];
 };
 this.get = function(svc_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (svcs.num === 0)
 return null;
 if (utils_sys.validation.alpha.is_symbol(svc_id))
 return false;
 for (var i = 0; i < svcs.num; i++)
 {
 if (svcs.list[i].constructor.name === svc_id)
 {
 var __new_svc = new svcs.list[i].constructor();
 __new_svc.cosmos(cosmos);
 if (backtrace === true)
 frog('SVC BOX', 'Models :: Get', svc_id);
 return __new_svc;
 }
 }
 return false;
 };
 this.add = function(models_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(models_array))
 return false;
 var __models_num = models_array.length;
 if (__models_num === 0)
 return false;
 for (var i = 0; i < __models_num; i++)
 {
 var __func = new Function('return new ' + models_array[i] + '()'),
 __object_model = new __func;
 if (!utils_sys.validation.misc.is_object(__object_model))
 {
 if (backtrace === true)
 frog('SVC BOX', 'Models :: Invalid', models_array[i]);
 self.clear();
 return false;
 }
 if (utils_int.model_exists(__object_model))
 {
 if (backtrace === true)
 frog('SVC BOX', 'Models :: Duplication', __object_model.constructor.name);
 self.clear();
 return false;
 }
 svcs.list.push(__object_model);
 svcs.num++;
 if (backtrace === true)
 frog('SVC BOX', 'Models :: Addition', __object_model.constructor.name);
 }
 if (backtrace === true)
 frog('SVC BOX', 'All models', svcs.list, 'Model count: ' + svcs.num);
 return true;
 };
 this.remove = function(svc_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.alpha.is_symbol(svc_id))
 return false;
 for (var i = 0; i < svcs.num; i++)
 {
 if (svcs.list[i].constructor.name === svc_id)
 {
 svcs.list.splice(i, 1);
 svcs.num--;
 if (backtrace === true)
 {
 frog('SVC BOX', 'Models :: Removal', svc_id);
 frog('SVC BOX', 'All models', svcs.list, 'Model count: ' + svcs.num);
 }
 return true;
 }
 }
 return false;
 };
 this.replace = function(models_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(models_array))
 return false;
 var __models_num = models_array.length;
 if (__models_num === 0)
 return false;
 for (var i = 0; i < __models_num; i++)
 {
 var __func = new Function('return new ' + models_array[i] + '()'),
 __object_model = new __func;
 if (!utils_sys.validation.misc.is_object(__object_model))
 {
 if (backtrace === true)
 frog('SVC BOX', 'Models :: Invalid', models_array[i]);
 self.clear();
 return false;
 }
 self.remove(models_array[i].name);
 }
 return self.add(models_array);
 };
 this.clear = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (svcs.num === 0)
 return false;
 svcs.num = 0;
 svcs.list = [];
 if (backtrace === true)
 frog('SVC BOX', 'Models :: Clear', svcs.list);
 return true;
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
 svcs = new svc_box_model(),
 utils_int = new utilities();
}
function event_proxy()
{
 var self = this;
 this.execute = function(event_id, context, event)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.alpha.is_symbol(event_id) ||
 utils_sys.validation.alpha.is_symbol(context) ||
 utils_sys.validation.alpha.is_symbol(event))
 return false;
 if (any_model)
 {
 var __result = null;
 __result = morpheus.execute(event_id, context, event);
 if (!__result)
 {
 if (backtrace === true)
 frog('MODEL PROXY', 'Model :: Failed execution', model_id);
 return false;
 }
 if (backtrace === true)
 frog('MODEL PROXY', 'Model :: Successful execution', model_id);
 return __result;
 }
 if (backtrace === true)
 frog('MODEL PROXY', 'Model :: Failed initialization', model_id);
 return false;
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
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 return true;
 };
 var backtrace = false,
 cosmos = null,
 matrix = null,
 morpheus = null,
 utils_sys = new vulcan();
}
function colony()
{
 var self = this;
 function bees_model()
 {
 this.max = 10;
 this.num = 0;
 this.list = [];
 }
 this.max = function(num)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(num))
 return bees.max;
 if (!utils_sys.validation.numerics.is_integer(num) || num < 1)
 return false;
 bees.max = num;
 if (backtrace === true)
 frog('COLONY', 'Objects :: Max', num);
 return true;
 };
 this.num = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return bees.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(index))
 return bees.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (bees.num - 1))
 return false;
 return bees.list[index];
 };
 this.get = function(bee_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (bees.num === 0)
 return null;
 if (utils_sys.validation.alpha.is_symbol(bee_id))
 return false;
 for (var i = 0; i < bees.num; i++)
 {
 if (bees.list[i].settings.general.id() === bee_id)
 {
 if (backtrace === true)
 frog('COLONY', 'Objects :: Get', bee_id);
 return bees.list[i];
 }
 }
 return false;
 };
 this.add = function(objects_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(objects_array))
 return false;
 var __objects_num = objects_array.length;
 if (__objects_num === 0 || (__objects_num > (bees.max - bees.num)))
 {
 if (backtrace === true)
 {
 if (__objects_num === 0)
 frog('COLONY', 'Objects :: List contains: ', null);
 else
 frog('COLONY', 'Objects :: Max limit reached: ', bees.max);
 }
 if (__objects_num > 0)
 return null;
 return false;
 }
 for (var i = 0; i < __objects_num; i++)
 {
 if (!self.is_bee(objects_array[i]))
 {
 if (backtrace === true)
 frog('COLONY', 'Objects :: Invalid', objects_array[i]);
 self.clear();
 return false;
 }
 var __app_id = objects_array[i].settings.general.app_id();
 if (self.is_single_instance(__app_id))
 {
 if (backtrace === true)
 frog('COLONY', 'Objects :: Duplication', __app_id);
 return false;
 }
 bees.list.push(objects_array[i]);
 bees.num++;
 if (backtrace === true)
 frog('COLONY', 'Objects :: Addition', objects_array[i].constructor.name);
 }
 if (backtrace === true)
 frog('COLONY', 'All objects', bees.list, 'Object count: ' + bees.num);
 return true;
 };
 this.remove = function(bee_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (bees.num === 0)
 return false;
 if (utils_sys.validation.alpha.is_symbol(bee_id))
 return false;
 for (var i = 0; i < bees.num; i++)
 {
 if (bees.list[i].settings.general.id() === bee_id)
 {
 bees.list.splice(i, 1);
 bees.num--;
 if (backtrace === true)
 {
 frog('COLONY', 'Objects :: Removal', bee_id);
 frog('COLONY', 'All objects', bees.list, 'Object count: ' + bees.num);
 }
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (bees.num === 0)
 return false;
 bees.num = 0;
 bees.list = [];
 if (backtrace === true)
 frog('COLONY', 'Objects :: Clear', bees.list);
 return true;
 };
 this.is_bee = function(object)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_object(object))
 return false;
 if (utils_sys.validation.misc.is_undefined(object.init) ||
 utils_sys.validation.misc.is_undefined(object.run) || utils_sys.validation.misc.is_undefined(object.quit) ||
 utils_sys.validation.misc.is_undefined(object.on) || utils_sys.validation.misc.is_undefined(object.settings) ||
 utils_sys.validation.misc.is_undefined(object.gui) || utils_sys.validation.misc.is_undefined(object.status) ||
 utils_sys.validation.misc.is_undefined(object.drone))
 return false;
 var bee_length = Object.keys(object).length;
 if (bee_length !== 10)
 return false;
 return true;
 };
 this.is_single_instance = function(app_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (bees.num === 0)
 return null;
 if (utils_sys.validation.alpha.is_symbol(app_id))
 return false;
 for (var i = 0; i < bees.num; i++)
 {
 if (bees.list[i].settings.general.app_id() === app_id && bees.list[i].settings.general.single_instance())
 return true;
 }
 return false;
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
 bees = new bees_model(),
 utils_sys = new vulcan();
}
function roost()
{
 var self = this;
 function bats_model()
 {
 this.max = 10;
 this.num = 0;
 this.list = [];
 }
 this.max = function(num)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(num))
 return bats.max;
 if (!utils_sys.validation.numerics.is_integer(num) || num < 1)
 return false;
 bats.max = num;
 if (backtrace === true)
 frog('ROOST', 'Objects :: Max', num);
 return true;
 };
 this.num = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return bats.num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(index))
 return bats.list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0 || index > (bats.num - 1))
 return false;
 return bats.list[index];
 };
 this.get = function(bat_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (bats.num === 0)
 return null;
 if (utils_sys.validation.alpha.is_symbol(bat_id))
 return false;
 for (var i = 0; i < bats.num; i++)
 {
 if (bats.list[i].config().sys_name === bat_id)
 {
 if (backtrace === true)
 frog('ROOST', 'Objects :: Get', bat_id);
 return bats.list[i];
 }
 }
 return false;
 };
 this.add = function(objects_array)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_array(objects_array))
 return false;
 var __objects_num = objects_array.length;
 if (__objects_num === 0 || (__objects_num > (bats.max - bats.num)))
 {
 if (backtrace === true)
 {
 if (__objects_num === 0)
 frog('ROOST', 'Objects :: List contains: ', null);
 else
 frog('ROOST', 'Objects :: Max limit reached: ', bats.max);
 }
 return false;
 }
 for (var i = 0; i < __objects_num; i++)
 {
 if (!self.is_bat(objects_array[i]))
 {
 if (backtrace === true)
 frog('ROOST', 'Objects :: Invalid', objects_array[i]);
 self.clear();
 return false;
 }
 bats.list.push(objects_array[i]);
 bats.num++;
 if (backtrace === true)
 frog('ROOST', 'Objects :: Addition', objects_array[i].constructor.name);
 }
 if (backtrace === true)
 frog('ROOST', 'All objects', bats.list, 'Object count: ' + bats.num);
 return true;
 };
 this.remove = function(bat_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (bats.num === 0)
 return false;
 if (utils_sys.validation.alpha.is_symbol(bat_id))
 return false;
 for (var i = 0; i < bats.num; i++)
 {
 if (bats.list[i].config().sys_name === bat_id)
 {
 bats.list.splice(i, 1);
 bats.num--;
 if (backtrace === true)
 {
 frog('ROOST', 'Objects :: Removal', bat_id);
 frog('ROOST', 'All objects', bats.list, 'Object count: ' + bats.num);
 }
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (bats.num === 0)
 return false;
 bats.num = 0;
 bats.list = [];
 if (backtrace === true)
 frog('ROOST', 'Objects :: Clear', bats.list);
 return true;
 };
 this.is_bat = function(object)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_object(object))
 return false;
 if (utils_sys.validation.misc.is_undefined(object.init) ||
 utils_sys.validation.misc.is_undefined(object.register) || utils_sys.validation.misc.is_undefined(object.unregister) ||
 utils_sys.validation.misc.is_undefined(object.exec_function) || utils_sys.validation.misc.is_undefined(object.on) ||
 utils_sys.validation.misc.is_undefined(object.config) || utils_sys.validation.misc.is_undefined(object.set_function))
 return false;
 var bat_length = Object.keys(object).length;
 if (bat_length < 9 || bat_length > 9)
 return false;
 return true;
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
 bats = new bats_model(),
 utils_sys = new vulcan();
}
function xenon()
{
 var self = this;
 function sys_info_model()
 {
 this.os_name = null;
 this.os_version = null;
 this.max_apps = 10;
 this.max_services = 10;
 this.cpu_cores = navigator.hardwareConcurrency;
 this.ram = navigator.deviceMemory;
 }
 this.store = function(user_settings)
 {
 var __this_user_setting = null;
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_object(user_settings))
 return false;
 if (user_settings.hasOwnProperty('cpu_cores') || user_settings.hasOwnProperty('ram'))
 return false;
 for (__this_user_setting in user_settings)
 {
 if (!sys_info.hasOwnProperty(__this_user_setting))
 return;
 }
 for (__this_user_setting in user_settings)
 sys_info[__this_user_setting] = user_settings[__this_user_setting];
 return true;
 };
 this.load = function(setting)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_nothing(setting))
 return false;
 if (!sys_info.hasOwnProperty(setting))
 return false;
 return sys_info[setting];
 };
 this.list = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return sys_info;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 return true;
 };
 var cosmos = null,
 utils_sys = new vulcan(),
 sys_info = new sys_info_model();
}
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
 "sys_id" : collection.list.process.sys_id[i],
 "proc_id" : collection.list.process.proc_id[i],
 "type" : process_type
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
function uniplex()
{
 var self = this;
 function programs_collection_model()
 {
 this.num = 0;
 this.list = [];
 }
 this.expose = function(api_calls_config)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_object(api_calls_config) ||
 !api_calls_config.hasOwnProperty('program_id') ||
 !utils_sys.validation.alpha.is_string(api_calls_config.program_id) ||
 !api_calls_config.hasOwnProperty('calls') ||
 !utils_sys.validation.misc.is_array(api_calls_config.calls))
 return false;
 programs_collection.num += 1;
 programs_collection.list.push(api_calls_config);
 return true;
 };
 this.num = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return programs_collection.num;
 };
 this.list = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return programs_collection.list;
 };
 this.clear = function(program_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_nothing(program_id))
 return false;
 var __index = 0,
 __api_call = null;
 for (__api_call of programs_collection.list)
 {
 if (__api_call.program_id === program_id)
 {
 programs_collection.num -= 1;
 programs_collection.list.splice(__index, 1);
 return true;
 }
 __index++;
 }
 return false;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 return true;
 };
 var cosmos = null,
 utils_sys = new vulcan(),
 programs_collection = new programs_collection_model();
}
function wormhole()
{
 var self = this;
 this.get_bc_id = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 return greyos_bc;
 };
 this.setup = function(callback)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_function(callback))
 {
 if (backtrace === true)
 frog('WORMHOLE', 'Setup :: Argument is not a callback function');
 return false;
 }
 greyos_bc = new BroadcastChannel("greyos-bc-" + random.generate());
 greyos_bc.addEventListener("message", (event) => { callback.call(event); });
 if (backtrace === true)
 frog('WORMHOLE', 'Broadcast Channel :: Initializated');
 return true;
 };
 this.send_data = function(data)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 greyos_bc.postMessage(data);
 return true;
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
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 return true;
 };
 var backtrace = false,
 greyos_bc = null,
 cosmos = null,
 matrix = null,
 morpheus = null,
 utils_sys = new vulcan(),
 random = new pythia();
}
function forest()
{
 var self = this;
 function trace_keys_model()
 {
 this.trigger = 113;
 this.trigger_set = false;
 }
 function mouse_coords_model()
 {
 this.mouse_x = 0;
 this.mouse_y = 0;
 }
 function desktops_trace_model()
 {
 this.bee_drag = false;
 this.internal_bee_drag = false;
 this.bee_close = false;
 }
 function desktops_status_model()
 {
 var __desktops_num = 0,
 __desktops_list = [];
 function desktop_model()
 {
 function bee_model()
 {
 var __bees_num = 0,
 __bees_list = [];
 this.num = function()
 {
 return __bees_num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_undefined(index))
 return __bees_list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0)
 return false;
 return __bees_list[index];
 };
 this.add = function(bee_id)
 {
 if (utils_sys.validation.alpha.is_symbol(bee_id))
 return false;
 __bees_list.push(bee_id);
 __bees_num++;
 return true;
 };
 this.remove = function(bee_id)
 {
 if (__bees_num === 0)
 return false;
 if (utils_sys.validation.alpha.is_symbol(bee_id))
 return false;
 for (var i = 0; i < __bees_num; i++)
 {
 if (__bees_list[i] === bee_id)
 {
 __bees_list.splice(i, 1);
 __bees_num--;
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (__bees_num === 0)
 return false;
 __bees_num = 0;
 __bees_list = [];
 return true;
 };
 }
 this.id = null;
 this.bees = new bee_model();
 }
 this.num = function()
 {
 return __desktops_num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_undefined(index))
 return __desktops_list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0)
 return false;
 return __desktops_list[index];
 };
 this.add = function(desktop_id)
 {
 if (utils_sys.validation.alpha.is_symbol(desktop_id))
 return false;
 var __new_desktop = new desktop_model();
 __new_desktop.id = desktop_id;
 __desktops_list.push(__new_desktop);
 __desktops_num++;
 utils_int.draw_desktop(desktop_id);
 return true;
 };
 this.remove = function(desktop_id)
 {
 if (utils_sys.validation.alpha.is_symbol(desktop_id))
 return false;
 for (var i = 0; i < __desktops_num; i++)
 {
 if (__desktops_list[i].id === desktop_id)
 {
 __desktops_list.splice(i, 1);
 __desktops_num--;
 utils_int.remove_desktop(desktop_id);
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (__desktops_num === 0)
 return false;
 __desktops_num = 0;
 __desktops_list = [];
 utils_int.remove_all_desktops();
 return true;
 };
 }
 function utilities()
 {
 var me = this;
 function events_model()
 {
 this.attach = function(action)
 {
 var __forest_tb_object = utils_sys.objects.by_id(forest_id + '_trigger_bar'),
 __handler = null;
 if (utils_sys.validation.misc.is_undefined(action))
 return false;
 if (action === 'swipe')
 {
 __handler = function() { me.toggle_forest(); };
 morpheus.run(forest_id, 'mouse', 'click', __handler, __forest_tb_object);
 }
 return true;
 };
 }
 function key_down_tracer(event_object)
 {
 key_control.scan(event_object);
 var __key_code = key_control.get();
 if (trace_keys.trigger === __key_code)
 {
 if (trace_keys.trigger_set === true)
 return false;
 trace_keys.trigger_set = true;
 me.toggle_forest();
 }
 return true;
 }
 function key_up_tracer(event_object)
 {
 key_control.scan(event_object);
 var __key_code = key_control.get();
 if (trace_keys.trigger !== __key_code)
 return false;
 trace_keys.trigger_set = false;
 return true;
 }
 this.coords = function(event_object)
 {
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 var __client_x = 0,
 __client_y = 0;
 if (navigator.maxTouchPoints > 0 &&
 event_object.type.indexOf('touch') > -1 &&
 event_object.touches.length > 0)
 {
 __client_x = event_object.touches[0].clientX;
 __client_y = event_object.touches[0].clientY;
 }
 else
 {
 __client_x = event_object.clientX;
 __client_y = event_object.clientY;
 }
 coords.mouse_x = __client_x + document.documentElement.scrollLeft +
 document.body.scrollLeft - document.body.clientLeft;
 coords.mouse_y = __client_y + document.documentElement.scrollTop +
 document.body.scrollTop - document.body.clientTop;
 return true;
 };
 this.reset_desktops_trace = function()
 {
 desktops_trace.bee_drag = false;
 desktops_trace.internal_bee_drag = false;
 desktops_trace.bee_close = false;
 return true;
 };
 this.toggle_forest = function()
 {
 if (self.settings.is_open())
 {
 if (is_swiping === true)
 return false;
 is_swiping = true;
 gfx.animation.swipe(forest_id, 1, 'left', 298, 0, 15, 15,
 function() { self.settings.is_open(false); is_swiping = false; });
 }
 else
 {
 if (is_swiping === true)
 return false;
 is_swiping = true;
 gfx.animation.swipe(forest_id, 1, 'right', 298, 0, 15, 15,
 function() { self.settings.is_open(true); is_swiping = false; });
 }
 };
 this.toggle_hive = function()
 {
 var __hive = matrix.get('hive');
 if (!__hive.status.bee_drag())
 __hive.stack.toggle('off');
 return true;
 };
 this.draw_forest = function()
 {
 var __dynamic_object = null,
 __forest_object = utils_sys.objects.by_id(forest_id),
 __swarm_id = matrix.get('swarm').settings.id(),
 __handler = null;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', 'forest_ghost_bee');
 __dynamic_object.setAttribute('class', 'ghost_bee');
 utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', forest_id);
 __dynamic_object.setAttribute('class', 'forest');
 __dynamic_object.setAttribute('style', 'height: ' + (window.innerHeight - 45) + 'px;');
 __dynamic_object.innerHTML = `<div id="` + forest_id + `_trigger_bar" class="trigger_bar"></div>
 <div id="` + forest_id + `_forest_top_list" class="top_list">
 <a href="#" class="create_cat">Create new category</a>
 </div>
 <div id="` + forest_id + `_forest_cat_list" class="cat_list" style="height: ` + (window.innerHeight - 167) + `px;">
 <div class="cat social">
 <a href="#" style="background-color: #5C5C5C;" title="Sample category!">
 My main category
 <span style="background: #FFF; color: #5C5C5C;" class="desktop_num">4</span>
 </a>
 <ul class="expanded">
 <li>
 <a href="#">
 <span class="cat_text">Social media desktop</span>
 <span class="desktop_num">3</span></a>
 <ul>
 <li><a href="#">App 1</a></li>
 <li><a href="#">App 2</a></li>
 <li><a href="#">App X</a></li>
 </ul>
 </li>
 <li>
 <a href="#">
 <span class="cat_text">Other desktop</span>
 <span class="desktop_num">1</span>
 </a>
 </li>
 <li class="create_new">
 <a href="#">New desktop</a>
 </li>
 </ul>
 </div>
 <div class="cat apps">
 <a href="#" title="Sample category!">
 Another category
 <span class="desktop_num">11</span>
 </a>
 </div>
 </div>
 <div class="drawer" title="Sorry, drawer is not available yet...">
 <input class="search_box" value="" placeholder="Search my drawer for apps...">
 <a href="#">
 <span class="cat_text">Drawer</span>
 <span class="drawer_apps_num">0</span>
 </a>
 </div>`;
 utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);
 __handler = function(event) { me.coords(event); me.toggle_hive(); };
 morpheus.run(forest_id, 'mouse', 'mousemove', __handler, __forest_object);
 morpheus.run(forest_id, 'touch', 'touchmove', __handler, __forest_object);
 me.events.attach('swipe');
 return true;
 };
 this.init_trace_keys = function()
 {
 var __handler = null;
 __handler = function(event) { key_down_tracer(event); };
 morpheus.run(forest_id, 'key', 'keydown', __handler, document);
 __handler = function(event) { key_up_tracer(event); };
 morpheus.run(forest_id, 'key', 'keyup', __handler, document);
 return true;
 };
 this.events = new events_model();
 }
 function interaction()
 {
 function mouse()
 {
 this.x = function()
 {
 if (is_init === false)
 return false;
 return coords.mouse_x;
 };
 this.y = function()
 {
 if (is_init === false)
 return false;
 return coords.mouse_y;
 };
 }
 function key()
 {
 var __key = 0;
 this.get = function()
 {
 if (is_init === false)
 return false;
 return __key;
 };
 this.set = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return false;
 __key = val;
 return true;
 };
 }
 this.mouse = new mouse();
 this.key = new key();
 }
 this.trees = new function()
 {
 if (is_init === false)
 return false;
 };
 function settings()
 {
 var __id = null,
 __container = null,
 __left = 0,
 __top = 0,
 __is_open = false;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 this.left = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __left;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 __left = val;
 return true;
 };
 this.top = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __top;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 __top = val;
 return true;
 };
 this.is_open = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __is_open;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __is_open = val;
 return true;
 };
 this.set_stack_view = function(event, symbol, check_left_click)
 {
 if (is_init === false)
 return false;
 return utils_int.manage_stack_view(event, symbol, check_left_click);
 };
 }
 function status()
 {
 function desktops()
 {
 function num()
 {
 this.all = function()
 {
 if (is_init === false)
 return false;
 return desktops_status.all_num();
 };
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 return desktops_status.num_for_id(val);
 };
 }
 this.names = function()
 {
 if (is_init === false)
 return false;
 return desktops_status.name();
 };
 this.num = new num();
 }
 this.bees = function()
 {
 if (is_init === false)
 return false;
 var __all_bees = 0;
 for (var i = 0; i < desktops_status.num(); i++)
 __all_bees += desktops_status.list(i).bees.num();
 return __all_bees;
 };
 this.bee_drag = function()
 {
 if (is_init === false)
 return false;
 return desktops_trace.bee_drag;
 };
 this.bee_close = function()
 {
 if (is_init === false)
 return false;
 return desktops_trace.bee_close;
 };
 this.desktops = new desktops();
 }
 this.show = function(objects_array)
 {
 return true;
 };
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.alpha.is_symbol(container_id) ||
 utils_sys.objects.by_id(container_id) === null)
 return false;
 else
 {
 is_init = true;
 self.settings.id('forest_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 forest_id = self.settings.id();
 nature.themes.store('forest');
 nature.apply('new');
 utils_int.draw_forest();
 utils_int.init_trace_keys();
 }
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 dev_box = cosmos.hub.access('dev_box');
 colony = matrix.get('colony');
 morpheus = matrix.get('morpheus');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_swiping = false,
 forest_id = null,
 cosmos = null,
 matrix = null,
 dev_box = null,
 colony = null,
 morpheus = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 gfx = new fx(),
 key_control = new key_manager(),
 trace_keys = new trace_keys_model(),
 coords = new mouse_coords_model(),
 desktops_trace = new desktops_trace_model(),
 desktops_status = new desktops_status_model(),
 utils_int = new utilities();
 this.settings = new settings();
 this.interaction = new interaction();
 this.status = new status();
}
function swarm()
{
 var self = this;
 function mouse_coords_model()
 {
 this.mouse_x = 0;
 this.mouse_y = 0;
 }
 function bees_info_model()
 {
 this.num = 0;
 this.list = [];
 }
 function bee_status_model()
 {
 this.active_bee_id = null;
 this.boxified = false;
 this.stacked = false;
 this.z_index = 0;
 }
 function utilities()
 {
 var me = this;
 this.coords = function(event_object)
 {
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 var __client_x = 0,
 __client_y = 0;
 if (navigator.maxTouchPoints > 0 &&
 event_object.type.indexOf('touch') > -1 &&
 event_object.touches.length > 0)
 {
 __client_x = event_object.touches[0].clientX;
 __client_y = event_object.touches[0].clientY;
 }
 else
 {
 __client_x = event_object.clientX;
 __client_y = event_object.clientY;
 }
 coords.mouse_x = __client_x + document.documentElement.scrollLeft +
 document.body.scrollLeft - document.body.clientLeft -
 self.settings.left();
 coords.mouse_y = __client_y + document.documentElement.scrollTop +
 document.body.scrollTop - document.body.clientTop -
 self.settings.top();
 return true;
 };
 this.show_bee = function(bees_colony, index)
 {
 if (!bees_colony.list(index).status.system.in_hive())
 new bees_colony.list(index).run();
 return true;
 };
 this.toggle_hive = function()
 {
 var __hive = matrix.get('hive');
 if (timer !== null)
 clearTimeout(timer);
 if ((coords.mouse_y + self.settings.top()) >= (window.innerHeight -
 (document.documentElement.scrollTop +
 document.body.scrollTop - document.body.clientTop) - 75))
 {
 if (self.status.active_bee() !== null)
 {
 if (!colony.get(self.status.active_bee()).status.gui.resizing())
 __hive.stack.toggle('on');
 }
 else
 timer = setTimeout(function() { __hive.stack.toggle('on'); }, 1000);
 }
 else
 __hive.stack.toggle('off');
 return true;
 };
 this.draw = function(left, top, right, bottom)
 {
 var __swarm_object = null,
 __dynamic_object = null,
 __handler = null;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', swarm_id);
 __dynamic_object.setAttribute('class', 'swarm');
 __dynamic_object.setAttribute('style', 'left: ' + left + 'px; ' +
 'top: ' + top + 'px; ' +
 'width: ' + right + 'px; ' +
 'height: ' + bottom + 'px;');
 __dynamic_object.innerHTML = '<div id="' + swarm_id + '_bee_resize_tooltip" class="bee_resize_tooltip"></di>';
 utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);
 resize_tooltip = utils_sys.objects.by_id(swarm_id + '_bee_resize_tooltip');
 __swarm_object = utils_sys.objects.by_id(swarm_id);
 __handler = function(event) { me.coords(event); me.toggle_hive(); };
 morpheus.run(swarm_id, 'mouse', 'mousemove', __handler, __swarm_object);
 morpheus.run(swarm_id, 'touch', 'touchmove', __handler, __swarm_object);
 return true;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null,
 __left = 0,
 __top = 0,
 __right = window.innerWidth,
 __bottom = window.innerHeight;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 this.left = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __left;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 __left = val;
 return true;
 };
 this.top = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __top;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 __top = val;
 return true;
 };
 this.right = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __right;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0 || val < __left)
 return false;
 __right = val;
 return true;
 };
 this.bottom = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __bottom;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0 || val < __top)
 return false;
 __bottom = val;
 return true;
 };
 this.active_bee = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_object(val) && val !== null)
 return false;
 bees_status.active_bee_id = val;
 return true;
 };
 this.boxified = function(val)
 {
 if (is_init === false)
 return false;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 bees_status.boxified = val;
 return true;
 };
 this.stacked = function(val)
 {
 if (is_init === false)
 return false;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 bees_status.stacked = val;
 return true;
 };
 this.z_index = function(val)
 {
 if (is_init === false)
 return false;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 bees_status.z_index = val;
 return true;
 };
 }
 function area()
 {
 function mouse()
 {
 this.x = function()
 {
 if (is_init === false)
 return false;
 return coords.mouse_x;
 };
 this.y = function()
 {
 if (is_init === false)
 return false;
 return coords.mouse_y;
 };
 }
 function key()
 {
 var __key = 0;
 this.get = function()
 {
 if (is_init === false)
 return false;
 return __key;
 };
 this.set = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return false;
 __key = val;
 return true;
 };
 }
 this.mouse = new mouse();
 this.key = new key();
 }
 function bees()
 {
 this.num = function()
 {
 if (is_init === false)
 return false;
 return bees_info.num;
 };
 this.list = function()
 {
 if (is_init === false)
 return false;
 return bees_info.list;
 };
 this.insert = function(object)
 {
 if (is_init === false)
 return false;
 if (!colony.is_bee(object) || object.status.system.in_hive())
 return false;
 var __bee_id = object.settings.general.id();
 if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
 return false;
 if (!colony.add([object]))
 return false;
 bees_info.list.push(object.settings.general.id());
 bees_info.num++;
 return true;
 };
 this.remove = function(object)
 {
 if (is_init === false)
 return false;
 if (bees_info.num === 0)
 return false;
 if (!colony.is_bee(object))
 return false;
 var __bee_id = object.settings.general.id();
 if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
 return false;
 for (var i = 0; i < bees_info.num; i++)
 {
 if (bees_info.list[i] === __bee_id)
 {
 colony.remove(__bee_id);
 bees_info.list.splice(i, 1);
 bees_info.num--;
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (is_init === false)
 return false;
 if (bees_info.num === 0)
 return false;
 bees_info.num = 0;
 bees_info.list = [];
 return true;
 };
 this.show = function(objects_array)
 {
 if (is_init === false)
 return false;
 if (colony.num() === 0)
 return false;
 if (utils_sys.validation.misc.is_undefined(objects_array))
 {
 for (var i = 0; i < colony.num(); i++)
 utils_int.show_bee(colony, i);
 }
 else
 {
 if (!utils_sys.validation.misc.is_array(objects_array))
 return false;
 var __objects_num = objects_array.length;
 if (__objects_num === 0 || colony.num() < __objects_num)
 return false;
 for (var i = 0; i < __objects_num; i++)
 {
 for (var j = 0; j < colony.num(); j++)
 {
 if (colony.list(j).settings.general.id() === objects_array[i].settings.general.id())
 utils_int.show_bee(colony, j);
 }
 }
 }
 return true;
 };
 }
 function status()
 {
 this.active_bee = function()
 {
 if (is_init === false)
 return false;
 return bees_status.active_bee_id;
 };
 this.boxified = function()
 {
 if (is_init === false)
 return false;
 return bees_status.boxified;
 };
 this.stacked = function()
 {
 if (is_init === false)
 return false;
 return bees_status.stacked;
 };
 this.z_index = function()
 {
 if (is_init === false)
 return false;
 return bees_status.z_index;
 };
 }
 this.resize_tooltip = function(bee, active = false)
 {
 if (is_init === false)
 return false;
 if (!colony.is_bee(bee))
 return false;
 if (active === false)
 resize_tooltip.style.visibility = 'hidden';
 else
 {
 resize_tooltip.style.visibility = 'visible';
 resize_tooltip.style.zIndex = bees_status.z_index + 1;
 if ((bee.gui.position.left() + bee.status.gui.size.width()) > (self.settings.right() - 80) ||
 (bee.gui.position.top() + bee.status.gui.size.height()) > (self.settings.bottom() - 20))
 {
 resize_tooltip.style.left = bee.gui.position.left() + bee.status.gui.size.width() - 92 + 'px';
 resize_tooltip.style.top = bee.gui.position.top() + bee.status.gui.size.height() - 50 + 'px';
 }
 else
 {
 resize_tooltip.style.left = bee.gui.position.left() + bee.status.gui.size.width() + 10 + 'px';
 resize_tooltip.style.top = bee.gui.position.top() + bee.status.gui.size.height() + 10 + 'px';
 }
 resize_tooltip.innerHTML = bee.status.gui.size.width() + ' x ' + bee.status.gui.size.height();
 }
 return true;
 };
 this.reset = function(container_id, left, top, right, bottom)
 {
 if (is_init === false)
 return false;
 is_init = false;
 return self.init(container_id, left, top, right, bottom);
 };
 this.init = function(container_id, left, top, right, bottom)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.misc.is_undefined(left) || utils_sys.validation.misc.is_undefined(top) ||
 utils_sys.validation.misc.is_undefined(right) || utils_sys.validation.misc.is_undefined(bottom))
 return false;
 else
 {
 if (utils_sys.validation.alpha.is_symbol(container_id) || utils_sys.objects.by_id(container_id) === null ||
 !utils_sys.validation.numerics.is_integer(left) || left < 0 ||
 !utils_sys.validation.numerics.is_integer(top) || top < 0 ||
 !utils_sys.validation.numerics.is_integer(right) || right < left ||
 !utils_sys.validation.numerics.is_integer(bottom) || bottom < top)
 return false;
 is_init = true;
 self.settings.id('swarm_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 self.settings.left(left);
 self.settings.top(top);
 self.settings.right(right);
 self.settings.bottom(bottom);
 swarm_id = self.settings.id();
 nature.themes.store('swarm');
 nature.apply('new');
 utils_int.draw(left, top, right, bottom);
 }
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 colony = cosmos.hub.access('colony');
 morpheus = matrix.get('morpheus');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 swarm_id = null,
 resize_tooltip = null,
 cosmos = null,
 matrix = null,
 colony = null,
 morpheus = null,
 nature = null,
 timer = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 coords = new mouse_coords_model(),
 bees_info = new bees_info_model(),
 bees_status = new bee_status_model(),
 utils_int = new utilities();
 this.settings = new settings();
 this.area = new area();
 this.bees = new bees();
 this.status = new status();
}
function hive()
{
 var self = this;
 function mouse_coords_model()
 {
 this.mouse_x = 0;
 this.mouse_y = 0;
 }
 function stack_trace_model()
 {
 this.bee_drag = false;
 this.internal_bee_drag = false;
 this.bee_closing = false;
 this.bee_closed = false;
 }
 function honeycomb_view_model()
 {
 var __honeycombs_num = 0,
 __honeycombs_list = [],
 __visible_honeycomb = 1,
 __hc_dynamic_width = 0,
 __is_changing_stack = false;
 function honeycomb_model()
 {
 function bee_model()
 {
 var __bees_num = 0,
 __bees_list = [];
 this.num = function()
 {
 return __bees_num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_undefined(index))
 return __bees_list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0)
 return false;
 return __bees_list[index];
 };
 this.add = function(bee_id)
 {
 if (utils_sys.validation.alpha.is_symbol(bee_id))
 return false;
 if (__bees_num === self.settings.bees_per_honeycomb())
 return false;
 __bees_list.push(bee_id);
 __bees_num++;
 return true;
 };
 this.remove = function(bee_id)
 {
 if (__bees_num === 0)
 return false;
 if (utils_sys.validation.alpha.is_symbol(bee_id))
 return false;
 for (var i = 0; i < __bees_num; i++)
 {
 if (__bees_list[i] === bee_id)
 {
 __bees_list.splice(i, 1);
 __bees_num--;
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (__bees_num === 0)
 return false;
 __bees_num = 0;
 __bees_list = [];
 return true;
 };
 }
 this.id = null;
 this.bees = new bee_model();
 }
 this.num = function()
 {
 return __honeycombs_num;
 };
 this.list = function(index)
 {
 if (utils_sys.validation.misc.is_undefined(index))
 return __honeycombs_list;
 if (!utils_sys.validation.numerics.is_integer(index) || index < 0)
 return false;
 return __honeycombs_list[index];
 };
 this.add = function(honeycomb_id)
 {
 if (utils_sys.validation.alpha.is_symbol(honeycomb_id))
 return false;
 var __new_honeycomb = new honeycomb_model();
 __new_honeycomb.id = honeycomb_id;
 __honeycombs_list.push(__new_honeycomb);
 __honeycombs_num++;
 utils_int.draw_honeycomb(honeycomb_id);
 return true;
 };
 this.remove = function(honeycomb_id)
 {
 if (utils_sys.validation.alpha.is_symbol(honeycomb_id))
 return false;
 for (var i = 0; i < __honeycombs_num; i++)
 {
 if (__honeycombs_list[i].id === honeycomb_id)
 {
 __honeycombs_list.splice(i, 1);
 __honeycombs_num--;
 utils_int.remove_honeycomb(honeycomb_id);
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (__honeycombs_num === 0)
 return false;
 __honeycombs_num = 0;
 __honeycombs_list = [];
 utils_int.remove_all_honeycombs();
 return true;
 };
 this.visible = function(val)
 {
 if (utils_sys.validation.misc.is_undefined(val))
 return __visible_honeycomb;
 if (!utils_int.validate_honeycomb_range(val))
 return false;
 __visible_honeycomb = val;
 return true;
 };
 this.swiping = function(val)
 {
 if (utils_sys.validation.misc.is_undefined(val))
 return __is_changing_stack;
 if (!utils_sys.validation.misc.is_bool(val))
 return null;
 __is_changing_stack = val;
 return true;
 };
 this.dynamic_width = function(val)
 {
 if (utils_sys.validation.misc.is_undefined(val))
 return __hc_dynamic_width;
 __hc_dynamic_width = val;
 return true;
 };
 }
 function utilities()
 {
 var me = this;
 this.coords = function(event_object)
 {
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 var __client_x = 0,
 __client_y = 0;
 if (navigator.maxTouchPoints > 0 &&
 event_object.type.indexOf('touch') > -1 &&
 event_object.touches.length > 0)
 {
 __client_x = event_object.touches[0].clientX;
 __client_y = event_object.touches[0].clientY;
 }
 else
 {
 __client_x = event_object.clientX;
 __client_y = event_object.clientY;
 }
 coords.mouse_x = __client_x +
 document.documentElement.scrollLeft +
 document.body.scrollLeft - document.body.clientLeft;
 coords.mouse_y = __client_y +
 document.documentElement.scrollTop +
 document.body.scrollTop - document.body.clientTop;
 return true;
 };
 this.reset_stack_trace = function(event_object)
 {
 if (navigator.maxTouchPoints === 0 && event_object.buttons === 0 && last_mouse_button_clicked === 1)
 {
 stack_trace.bee_drag = false;
 stack_trace.internal_bee_drag = false;
 stack_trace.bee_closed = false;
 return true;
 }
 return false;
 };
 this.release_bee = function(event_object)
 {
 if (navigator.maxTouchPoints === 0 && event_object.buttons === 0 && last_mouse_button_clicked === 1)
 {
 if (stack_trace.bee_drag)
 {
 me.reset_stack_trace(event_object);
 self.stack.bees.put(event_object);
 return true;
 }
 }
 return false;
 };
 this.setup_honeycomb_size = function(bees_per_honeycomb)
 {
 var __proposed_stack_width = Math.floor((bees_per_honeycomb / 2) * 230),
 __min_screen_width = 1200,
 __proportion = __proposed_stack_width / __min_screen_width,
 __fixed_bees_per_honeycomb = bees_per_honeycomb;
 if (__proportion > 1 & __proposed_stack_width >= __min_screen_width)
 {
 var __width_diff = __proposed_stack_width - __min_screen_width,
 __margin_fix = 0;
 __fixed_bees_per_honeycomb -= (Math.ceil(__width_diff / 230) + 1);
 if (__fixed_bees_per_honeycomb % 2 !== 0)
 __fixed_bees_per_honeycomb -= 3;
 __margin_fix = ((__fixed_bees_per_honeycomb / 2) * 2) + 1;
 __proposed_stack_width -= (__width_diff - __margin_fix);
 }
 max_stack_width = __proposed_stack_width;
 if (bees_per_honeycomb === 10)
 __fixed_bees_per_honeycomb = 8;
 return __fixed_bees_per_honeycomb;
 };
 this.validate_honeycomb_range = function(val)
 {
 if (!utils_sys.validation.numerics.is_integer(val) || val < 1 || val > honeycomb_views.num())
 return false;
 return true;
 };
 this.free_space_hc_view_swipe = function(event_object)
 {
 if (self.status.bees.num() === self.status.bees.max())
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(xenon.load('os_name'), 'All stack views are full!');
 return false;
 }
 else
 {
 for (var i = 1; i <= honeycomb_views.num() ; i++)
 {
 if (honeycomb_views.list(i - 1).bees.num() < self.settings.bees_per_honeycomb())
 {
 self.stack.set_view(event_object, i);
 return true;
 }
 }
 }
 };
 this.show_hive_bee = function(honeycomb_view, bees_colony, index)
 {
 var __new_bee = bees_colony.list(index);
 new __new_bee.show();
 utils_int.draw_hive_bee(honeycomb_view, __new_bee.settings.general.id(), 0);
 return true;
 };
 this.show_ghost_bee = function(event_object, mode)
 {
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if ((navigator.maxTouchPoints === 0 && event_object.buttons !== 1) || mode < 0 || mode > 1)
 return false;
 if (honeycomb_views.swiping())
 return false;
 if (swarm.status.active_bee())
 {
 if (honeycomb_views.list(honeycomb_views.visible() - 1).bees.num() === self.settings.bees_per_honeycomb() &&
 stack_trace.internal_bee_drag === false)
 {
 me.free_space_hc_view_swipe(event_object);
 return false;
 }
 else
 {
 stack_trace.bee_drag = true;
 var __active_bee_id = swarm.status.active_bee(),
 __hive_bee = utils_sys.objects.by_id('hive_bee_' + __active_bee_id),
 __hive_object = utils_sys.objects.by_id(hive_id),
 __ghost_bee_width = 230,
 __ghost_bee_height = 30,
 __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_views.visible()),
 __bee_x = coords.mouse_x + 10 + __ghost_bee_width,
 __bee_y = coords.mouse_y + 10 + __ghost_bee_height,
 __stack_offset_x_space = self.settings.left() +
 utils_sys.graphics.pixels_value(__hive_object.style.width) + 250;
 __stack_offset_y_space = self.settings.top() +
 utils_sys.graphics.pixels_value(__hive_object.style.height) - 12;
 if (mode === 1)
 {
 self.stack.bees.expel(event_object, mode);
 __honeycomb.removeChild(__hive_bee);
 }
 me.draw_hive_bee(honeycomb_views.visible(), __active_bee_id, 1);
 if (__bee_x <= __stack_offset_x_space)
 {
 utils_sys.objects.by_id('hive_ghost_bee').style.left = coords.mouse_x + 10 + 'px';
 if (__bee_y <= __stack_offset_y_space)
 utils_sys.objects.by_id('hive_ghost_bee').style.top = coords.mouse_y + __ghost_bee_height - 16 + 'px';
 else
 utils_sys.objects.by_id('hive_ghost_bee').style.top = coords.mouse_y - __ghost_bee_height - 5 + 'px';
 }
 else
 {
 if (!utils_sys.objects.by_id('hive_ghost_bee').style.top)
 utils_sys.objects.by_id('hive_ghost_bee').style.display = 'none';
 }
 }
 }
 return true;
 };
 this.hide_ghost_bee = function(event_object)
 {
 if (utils_sys.validation.misc.is_undefined(event_object) || (navigator.maxTouchPoints === 0 && event_object.buttons !== 1))
 return false;
 var __active_bee_id = swarm.status.active_bee();
 if (__active_bee_id)
 {
 var __this_hive_bee = colony.get(__active_bee_id);
 if (!__this_hive_bee)
 return false;
 utils_sys.objects.by_id(__active_bee_id).style.display = 'block';
 utils_sys.objects.by_id('hive_ghost_bee').style.display = 'none';
 if (__this_hive_bee.status.gui.casement_deployed())
 utils_sys.objects.by_id(__active_bee_id + '_casement').style.display = 'block';
 stack_trace.bee_drag = false;
 return true;
 }
 return false;
 };
 this.remove_bee = function(honeycomb_id, bee_id)
 {
 var __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_id),
 __bee = utils_sys.objects.by_id('hive_bee_' + bee_id);
 if (honeycomb_views.visible() === honeycomb_id)
 {
 __honeycomb.removeChild(__bee);
 honeycomb_views.list(honeycomb_views.visible() - 1).bees.remove(bee_id);
 if (colony.get(bee_id))
 colony.get(bee_id).settings.general.in_hive(false);
 return true;
 }
 return false;
 };
 this.remove_all_bees = function(honeycomb_id)
 {
 var __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_id);
 while (__honeycomb.hasChildNodes())
 {
 __honeycomb.removeChild(__honeycomb.lastChild);
 honeycomb_views.list(honeycomb_id).bees.remove(__honeycomb.lastChild.id());
 }
 return true;
 };
 this.prepare_draw = function(left, top, honeycombs_num, mode)
 {
 me.draw_hive(left, top);
 for (var i = 0; i < honeycombs_num; i++)
 {
 if (mode === 1)
 honeycomb_views.add(i + 1);
 else
 me.draw_honeycomb(i + 1);
 }
 me.fixate_sliding_area();
 };
 this.draw_honeycomb = function(honeycomb_id)
 {
 var __new_honeycomb = null,
 __honeycomb_id = 'honeycomb_' + honeycomb_id,
 __dynamic_width = 0,
 __handler = null;
 __new_honeycomb = document.createElement('div');
 __dynamic_width = (utils_sys.graphics.pixels_value(utils_sys.objects.by_id(hive_id + '_stack').style.width) - 20);
 __new_honeycomb.setAttribute('id', __honeycomb_id);
 __new_honeycomb.setAttribute('class', 'honeycomb');
 __new_honeycomb.setAttribute('style', 'width: ' + __dynamic_width + 'px;');
 utils_sys.objects.by_id(hive_id + '_sliding_box').appendChild(__new_honeycomb);
 __handler = function(event) { self.stack.bees.put(event); };
 morpheus.run(hive_id, 'mouse', 'mouseup', __handler, utils_sys.objects.by_id(__honeycomb_id));
 honeycomb_views.dynamic_width(__dynamic_width);
 return true;
 };
 this.remove_honeycomb = function(honeycomb_id)
 {
 var __hive = utils_sys.objects.by_id(hive_id),
 __honeycomb = utils_sys.objects.by_id('honeycomb_' + honeycomb_id);
 __hive.removeChild(__honeycomb);
 return true;
 };
 this.remove_all_honeycombs = function()
 {
 var __hive = utils_sys.objects.by_id(hive_id);
 while (__hive.hasChildNodes())
 __hive.removeChild(__hive.lastChild);
 return true;
 };
 this.draw_hive = function(left, top)
 {
 var __dynamic_object = null,
 __swarm_id = swarm.settings.id(),
 __forest_id = forest.settings.id(),
 __swarm_object = utils_sys.objects.by_id(__swarm_id),
 __forest_object = utils_sys.objects.by_id(__forest_id),
 __handler = null;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', 'hive_ghost_bee');
 __dynamic_object.setAttribute('class', 'ghost_bee');
 utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', hive_id);
 __dynamic_object.setAttribute('class', 'hive');
 __dynamic_object.setAttribute('style', 'top: ' + top + 'px; ' +
 'left: ' + left + 'px; ' +
 'right: ' + left + 'px; ' +
 'width: ' + max_stack_width + 'px; ' +
 'height: 85px;');
 __dynamic_object.innerHTML = `<div id="` + hive_id + `_previous_arrow" class="stack_arrow left_arrow"></div>
 <div id="` + hive_id + `_stack" class="stack_bar">
 <div id="` + hive_id + `_sliding_box" class="sliding_box"></div>
 </div>
 <div id="` + hive_id + `_next_arrow" class="stack_arrow right_arrow"></div>`;
 utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);
 __current_stack_width = utils_sys.graphics.pixels_value(__dynamic_object.style.width);
 utils_sys.objects.by_id(hive_id + '_stack').style.width =
 (utils_sys.graphics.pixels_value(__dynamic_object.style.width) - 84) + 'px';
 utils_sys.objects.by_id(hive_id + '_stack').style.height = '85px';
 __handler = function(event)
 {
 me.coords(event);
 me.show_ghost_bee(event, 0);
 last_mouse_button_clicked = event.buttons;
 };
 morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id(hive_id + '_stack'));
 morpheus.run(hive_id, 'touch', 'touchmove', __handler, utils_sys.objects.by_id(hive_id + '_stack'));
 __handler = function(event) { me.reset_stack_trace(event); };
 morpheus.run(hive_id, 'mouse', 'mouseup', __handler, utils_sys.objects.by_id(hive_id + '_stack'));
 morpheus.run(hive_id, 'touch', 'touchend', __handler, utils_sys.objects.by_id(hive_id + '_stack'));
 __handler = function(event) { me.hide_ghost_bee(event); };
 morpheus.run(hive_id, 'mouse', 'mousemove', __handler, __swarm_object);
 morpheus.run(hive_id, 'touch', 'touchmove', __handler, __swarm_object);
 __handler = function(event) { me.reset_stack_trace(event); };
 morpheus.run(hive_id, 'mouse', 'mouseup', __handler, __swarm_object);
 morpheus.run(hive_id, 'touch', 'touchend', __handler, __swarm_object);
 __handler = function(event) { me.release_bee(event); };
 morpheus.run(hive_id, 'mouse', 'mouseup', __handler, __forest_object);
 morpheus.run(hive_id, 'touch', 'touchend', __handler, __forest_object);
 __handler = function(event) { me.manage_stack_view(event, '-'); };
 morpheus.run(hive_id, 'mouse', 'mousedown', __handler, utils_sys.objects.by_id(hive_id + '_previous_arrow'));
 __handler = function(event) { me.manage_stack_view(event, '+'); };
 morpheus.run(hive_id, 'mouse', 'mousedown', __handler, utils_sys.objects.by_id(hive_id + '_next_arrow'));
 __handler = function(event)
 {
 var __hive_vertical_size = utils_sys.graphics.pixels_value(__dynamic_object.style.top) +
 utils_sys.graphics.pixels_value(__dynamic_object.style.height);
 if (event.clientY >= __hive_vertical_size)
 me.hide_ghost_bee(event);
 };
 morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id('desktop'));
 __handler = function(event) { me.hide_ghost_bee(event); };
 morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id(hive_id + '_previous_arrow'));
 morpheus.run(hive_id, 'mouse', 'mousemove', __handler, utils_sys.objects.by_id(hive_id + '_next_arrow'));
 return true;
 };
 this.draw_hive_bee = function(honeycomb_id, bee_id, mode)
 {
 var __dynamic_object = null,
 __bee_object = colony.get(bee_id),
 __app_id = __bee_object.settings.general.app_id(),
 __ghost_object = null,
 __ctrl_bar_class = null,
 __ctrl_bar_icon_class = null,
 __ctrl_bar_title_class = null,
 __ctrl_bar_close_class = null,
 __handler = null;
 if (__bee_object.settings.general.resizable() === true)
 {
 __ctrl_bar_class = 'ctrl_bar box_ctrl_bar ' + bee_id + '_ctrl_bar box_ctrl_border';
 __ctrl_bar_title_class = 'title box_title ' + bee_id + '_box_title';
 __ctrl_bar_close_class = 'close box_close ' + bee_id + '_box_close';
 }
 else
 {
 __ctrl_bar_class = 'ctrl_bar widget_ctrl_bar ' + bee_id + '_ctrl_bar';
 __ctrl_bar_title_class = 'title widget_title ' + bee_id + '_widget_title';
 __ctrl_bar_close_class = 'close widget_close ' + bee_id + '_widget_close';
 }
 __ctrl_bar_icon_class = 'icon ' + bee_id + '_icon ' + __app_id + '_icon';
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', 'hive_bee_' + bee_id);
 __dynamic_object.setAttribute('class', __ctrl_bar_class + ' hive_bee');
 __dynamic_object.innerHTML = `<div id="hive_bee_` + bee_id + `_icon" class="` + __ctrl_bar_icon_class + `"></div>
 <div id="hive_bee_` + bee_id + `_title" class="` + __ctrl_bar_title_class + `">` +
 __bee_object.settings.data.window.labels.title() +
 `</div>`;
 if (__bee_object.settings.actions.can_close())
 __dynamic_object.innerHTML += '<div id="hive_bee_' + bee_id + '_close" class="' + __ctrl_bar_close_class + '"></div>';
 if (mode === 0)
 {
 utils_sys.objects.by_id('hive_ghost_bee').style.display = 'none';
 utils_sys.objects.by_id('hive_ghost_bee').innerHTML = '';
 utils_sys.objects.by_id('honeycomb_' + honeycomb_id).appendChild(__dynamic_object);
 if (utils_sys.objects.by_id(bee_id) !== null)
 {
 utils_sys.objects.by_id(bee_id).style.display = 'none';
 utils_sys.objects.by_id(bee_id + '_casement').style.display = 'none';
 }
 __handler = function() { return false; };
 morpheus.run(hive_id, 'mouse', 'selectstart', __handler, __dynamic_object);
 __handler = function(event)
 {
 if (event.buttons !== 1)
 return false;
 if (stack_trace.bee_drag === true || stack_trace.bee_closing === true)
 return false;
 last_mouse_button_clicked = 1;
 stack_trace.internal_bee_drag = true;
 swarm.settings.active_bee(bee_id);
 me.show_ghost_bee(event, 1);
 };
 morpheus.run(hive_id, 'mouse', 'mousedown', __handler, __dynamic_object.childNodes[0]);
 morpheus.run(hive_id, 'mouse', 'mousedown', __handler, __dynamic_object.childNodes[2]);
 __handler = function(event)
 {
 if (event.buttons !== 1)
 return false;
 if (stack_trace.bee_drag === true || stack_trace.bee_closing === true)
 return false;
 last_mouse_button_clicked = 1;
 stack_trace.bee_closing = true;
 __bee_object.on('closed', function()
 {
 stack_trace.bee_closed = true;
 stack_trace.bee_closing = false;
 me.remove_bee(honeycomb_id, bee_id);
 });
 __bee_object.gui.actions.close(event);
 };
 morpheus.run(hive_id, 'mouse', 'mousedown', __handler, __dynamic_object.childNodes[3]);
 }
 else
 {
 __ghost_object = utils_sys.objects.by_id('hive_ghost_bee');
 __ghost_object.innerHTML = '';
 __ghost_object.appendChild(__dynamic_object);
 __ghost_object.style.display = 'block';
 if (utils_sys.objects.by_id(bee_id) !== null)
 {
 utils_sys.objects.by_id(bee_id).style.display = 'none';
 utils_sys.objects.by_id(bee_id + '_casement').style.display = 'none';
 }
 __handler = function(event) { me.release_bee(event); };
 morpheus.run(hive_id, 'mouse', 'mouseup', __handler, __ghost_object);
 morpheus.run(hive_id, 'touch', 'touchend', __handler, __ghost_object);
 }
 return true;
 };
 this.manage_stack_view = function(event_object, symbol, callback = null)
 {
 function factory_swipe(direction)
 {
 var __sliding_box = hive_id + '_sliding_box',
 __sign = 1;
 if (direction === 'right')
 __sign = -1;
 honeycomb_views.swiping(true);
 gfx.animation.swipe(__sliding_box, 1, direction, honeycomb_views.dynamic_width(), 20, 5, 25,
 function()
 {
 honeycomb_views.visible(honeycomb_views.visible() + __sign);
 honeycomb_views.swiping(false);
 if (callback)
 callback.call();
 });
 }
 if (!utils_sys.validation.alpha.is_symbol(symbol))
 return false;
 if (event_object !== null && !utils_sys.validation.misc.is_undefined(event_object.buttons) && event_object.buttons !== 1)
 return false;
 if (honeycomb_views.swiping())
 return false;
 if (symbol === '-')
 {
 if (honeycomb_views.visible() === 1)
 return false;
 factory_swipe('right')
 }
 else if (symbol === '+')
 {
 if (honeycomb_views.visible() === honeycomb_views.num())
 return false;
 factory_swipe('left')
 }
 else
 return false;
 return true;
 };
 this.fixate_sliding_area = function()
 {
 utils_sys.objects.by_id(hive_id + '_sliding_box').style.width =
 (honeycomb_views.num() * honeycomb_views.dynamic_width() + 80) + 'px';
 utils_sys.objects.by_id(hive_id + '_stack').style.width = honeycomb_views.dynamic_width() + 'px';
 return true;
 };
 this.set_z_index = function(bee_id)
 {
 if (utils_sys.validation.misc.is_undefined(bee_id) || utils_sys.validation.alpha.is_symbol(bee_id))
 return false;
 var __bee_object = colony.get(bee_id),
 __z_index = swarm.status.z_index();
 swarm.settings.z_index(__z_index + 1);
 __bee_object.gui.actions.set_top();
 return true;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null,
 __bees_per_honeycomb = 8,
 __left = 0,
 __top = 0;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 this.bees_per_honeycomb = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __bees_per_honeycomb;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 8)
 return false;
 __bees_per_honeycomb = val;
 return true;
 };
 this.left = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __left;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 __left = val;
 return true;
 };
 this.top = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __top;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 __top = val;
 return true;
 };
 }
 function stack()
 {
 var me = this;
 function bees()
 {
 this.insert = function(objects_array, honeycomb_view)
 {
 function push_to_stack(view, bee_id)
 {
 honeycomb_views.list(view - 1).bees.add(bee_id);
 colony.get(bee_id).settings.general.in_hive(true);
 utils_int.draw_hive_bee(view, bee_id, 0);
 }
 if (is_init === false)
 return false;
 if (!utils_sys.validation.misc.is_array(objects_array))
 return false;
 if (honeycomb_view !== null && !utils_int.validate_honeycomb_range(honeycomb_view))
 return false;
 if (honeycomb_views.swiping())
 return false;
 var __dynamic_view = 0;
 for (object of objects_array)
 {
 if (!colony.is_bee(object))
 return false;
 var __bee_id = object.settings.general.id();
 if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
 return false;
 if (colony.get(__bee_id).status.system.in_hive())
 continue;
 if (honeycomb_view === null)
 {
 var __view = honeycomb_views.visible();
 if (__dynamic_view === 0)
 __dynamic_view = __view;
 if (honeycomb_views.list(__dynamic_view - 1).bees.num() === self.settings.bees_per_honeycomb())
 {
 __dynamic_view++;
 if (__dynamic_view > honeycomb_views.num())
 break;
 }
 push_to_stack(__dynamic_view, __bee_id);
 }
 else
 push_to_stack(honeycomb_view, __bee_id);
 }
 swarm.settings.active_bee(null);
 return true;
 };
 this.remove = function(object, honeycomb_view)
 {
 if (is_init === false)
 return false;
 if (!colony.is_bee(object) || !utils_int.validate_honeycomb_range(honeycomb_view))
 return false;
 var __bee_id = object.settings.general.id();
 if (utils_sys.validation.misc.is_invalid(__bee_id) || utils_sys.validation.misc.is_bool(__bee_id))
 return false;
 if (!utils_int.remove_bee(honeycomb_view, __bee_id))
 return false;
 if (!colony.remove(__bee_id))
 return false;
 return true;
 };
 this.put = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object) ||
 (navigator.maxTouchPoints === 0 && event_object.buttons !== 0 && last_mouse_button_clicked !== 1))
 return false;
 if (honeycomb_views.swiping())
 return false;
 if (swarm.status.active_bee())
 {
 if (honeycomb_views.list(honeycomb_views.visible() - 1).bees.num() < self.settings.bees_per_honeycomb())
 {
 var __active_bee_id = swarm.status.active_bee();
 honeycomb_views.list(honeycomb_views.visible() - 1).bees.add(__active_bee_id);
 colony.get(__active_bee_id).settings.general.in_hive(true);
 utils_int.draw_hive_bee(honeycomb_views.visible(), __active_bee_id, 0);
 swarm.settings.active_bee(null);
 return true;
 }
 }
 return false;
 };
 this.expel = function(event_object, mode)
 {
 if (is_init === false)
 return false;
 if (mode === 0)
 {
 for (var i = 0; i < honeycomb_views.num(); i++)
 {
 var __honeycomb = honeycomb_views.list(i),
 __tmp_bees_list = Object.assign([], __honeycomb.bees.list());
 for (var __this_bee_id of __tmp_bees_list)
 {
 var __this_bee = colony.get(__this_bee_id),
 __this_honeycomb_object = utils_sys.objects.by_id('honeycomb_' + __honeycomb.id),
 __this_bee_object = utils_sys.objects.by_id('hive_bee_' + __this_bee_id);
 __this_honeycomb_object.removeChild(__this_bee_object);
 __honeycomb.bees.remove(__this_bee_id);
 __this_bee.settings.general.in_hive(false);
 swarm.settings.active_bee(__this_bee_id);
 utils_int.set_z_index(__this_bee_id);
 utils_int.hide_ghost_bee(event_object);
 }
 }
 return true;
 }
 else
 {
 if (utils_sys.validation.misc.is_undefined(event_object) || (navigator.maxTouchPoints === 0 && event_object.buttons !== 1))
 return false;
 if (swarm.status.active_bee())
 {
 var __active_bee_id = swarm.status.active_bee();
 honeycomb_views.list(honeycomb_views.visible() - 1).bees.remove(__active_bee_id);
 colony.get(__active_bee_id).settings.general.in_hive(false);
 swarm.settings.active_bee(__active_bee_id);
 utils_int.set_z_index(__active_bee_id);
 return true;
 }
 }
 };
 this.show = function(honeycomb_view)
 {
 if (is_init === false)
 return false;
 if (colony.num() === 0 || !utils_int.validate_honeycomb_range(honeycomb_view))
 return false;
 var __bees_num = honeycomb_views.list(honeycomb_view).bees.num(),
 __bees = honeycomb_views.list(honeycomb_view).bees.list();
 for (var i = 0; i < __bees_num; i++)
 {
 for (var j = 0; j < colony.num(); j++)
 {
 if (colony.list(j).settings.general.id() === __bees[i])
 utils_int.show_hive_bee(honeycomb_view, colony, j);
 }
 }
 return true;
 };
 }
 function mouse()
 {
 this.x = function()
 {
 if (is_init === false)
 return false;
 return coords.mouse_x;
 };
 this.y = function()
 {
 if (is_init === false)
 return false;
 return coords.mouse_y;
 };
 }
 function key()
 {
 var __key = 0;
 this.get = function()
 {
 if (is_init === false)
 return false;
 return __key;
 };
 this.set = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return false;
 __key = val;
 return true;
 };
 }
 this.set_view = function(event_object, next_honeycomb_num, callback = null)
 {
 function recursive_swipe(hc_view_delta)
 {
 var __sign = '+';
 if (hc_view_delta === 0)
 {
 if (utils_sys.validation.misc.is_function(callback))
 callback.call();
 return;
 }
 if (hc_view_delta < 0 )
 {
 hc_view_delta = -hc_view_delta;
 __sign = '-';
 }
 utils_int.manage_stack_view(event_object, __sign,
 function()
 {
 hc_view_delta--;
 if (__sign === '-')
 hc_view_delta = -hc_view_delta;
 recursive_swipe(hc_view_delta);
 });
 }
 if (is_init === false)
 return false;
 if (!utils_sys.validation.numerics.is_integer(next_honeycomb_num) ||
 next_honeycomb_num < 1 || next_honeycomb_num > honeycomb_views.num())
 return false;
 var __honeycomb_view_delta = next_honeycomb_num - honeycomb_views.visible();
 recursive_swipe(__honeycomb_view_delta);
 return true;
 };
 this.toggle = function(status)
 {
 if (is_init === false)
 return false;
 if (status !== 'on' && status !== 'off')
 return false;
 var __hive_object = utils_sys.objects.by_id(hive_id);
 if (status === 'on')
 __hive_object.style.visibility = 'visible';
 else
 __hive_object.style.visibility = 'hidden';
 return true;
 };
 this.bees = new bees();
 this.mouse = new mouse();
 this.key = new key();
 }
 function status()
 {
 function honeycombs()
 {
 this.num = function()
 {
 if (is_init === false)
 return false;
 return honeycomb_views.num();
 };
 this.visible = function()
 {
 if (is_init === false)
 return false;
 return honeycomb_views.visible();
 };
 }
 function bees()
 {
 this.max = function()
 {
 if (is_init === false)
 return false;
 return (honeycomb_views.num() * self.settings.bees_per_honeycomb());
 };
 this.num = function()
 {
 if (is_init === false)
 return false;
 var __bees_num = 0;
 for (var i = 0; i < honeycomb_views.num(); i++)
 __bees_num += honeycomb_views.list(i).bees.num();
 return __bees_num;
 };
 this.list = function()
 {
 if (is_init === false)
 return false;
 var __bees_list = [];
 for (var i = 0; i < honeycomb_views.num(); i++)
 __bees_list.push(honeycomb_views.list(i).bees.list());
 return __bees_list;
 };
 this.honeycomb_id = function(bee_id)
 {
 if (is_init === false)
 return false;
 for (var i = 0; i < honeycomb_views.num(); i++)
 {
 var __this_honeycomb = honeycomb_views.list(i),
 __bees_list = __this_honeycomb.bees.list();
 for (var __this_bee of __bees_list)
 {
 if (__this_bee === bee_id)
 return __this_honeycomb.id;
 }
 }
 return false;
 };
 }
 this.bee_drag = function()
 {
 if (is_init === false)
 return false;
 return stack_trace.bee_drag;
 };
 this.bee_close = function()
 {
 if (is_init === false)
 return false;
 return stack_trace.bee_closed;
 };
 this.honeycombs = new honeycombs();
 this.bees = new bees();
 }
 this.init = function(container_id, left, top, bees_per_honeycomb, honeycombs_num)
 {
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.misc.is_undefined(left) || utils_sys.validation.misc.is_undefined(top) ||
 utils_sys.validation.misc.is_undefined(bees_per_honeycomb) || utils_sys.validation.misc.is_undefined(honeycombs_num))
 return false;
 else
 {
 if (utils_sys.validation.alpha.is_symbol(container_id) || utils_sys.objects.by_id(container_id) === null ||
 !utils_sys.validation.numerics.is_integer(left) || left < 0 ||
 !utils_sys.validation.numerics.is_integer(top) || top < 0 ||
 !utils_sys.validation.numerics.is_integer(bees_per_honeycomb) ||
 bees_per_honeycomb < 8 || bees_per_honeycomb % 2 !== 0 ||
 !utils_sys.validation.numerics.is_integer(honeycombs_num) || honeycombs_num < 1)
 return false;
 var dynamic_bees_per_honeycomb = utils_int.setup_honeycomb_size(bees_per_honeycomb);
 is_init = true;
 self.settings.id('hive_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 self.settings.bees_per_honeycomb(dynamic_bees_per_honeycomb);
 self.settings.left(left);
 self.settings.top(top);
 hive_id = self.settings.id();
 nature.themes.store('hive');
 nature.apply('new');
 utils_int.prepare_draw(left, top, honeycombs_num, 1);
 }
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 colony = cosmos.hub.access('colony');
 xenon = matrix.get('xenon');
 swarm = matrix.get('swarm');
 forest = matrix.get('forest');
 morpheus = matrix.get('morpheus');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 hive_id = null,
 cosmos = null,
 matrix = null,
 colony = null,
 xenon = null,
 swarm = null,
 forest = null,
 morpheus = null,
 nature = null,
 max_stack_width = 0,
 last_mouse_button_clicked = 0,
 utils_sys = new vulcan(),
 random = new pythia(),
 gfx = new fx(),
 coords = new mouse_coords_model(),
 stack_trace = new stack_trace_model(),
 honeycomb_views = new honeycomb_view_model(),
 utils_int = new utilities();
 this.settings = new settings();
 this.stack = new stack();
 this.status = new status();
}
function trinity()
{
 var self = this;
 function processes_model()
 {
 this.apps = [];
 this.services = [];
 }
 function utilities()
 {
 var me = this;
 this.gui_init = function()
 {
 var __data_content_id = trinity_bee.settings.general.id() + '_data';
 infinity.setup(__data_content_id);
 infinity.begin();
 me.draw();
 utils_int.attach_events();
 infinity.end();
 return true;
 };
 this.draw = function()
 {
 trinity_bee.settings.data.window.content('<div class="trinity_data">' +
 '</div>');
 return true;
 };
 this.attach_events = function()
 {
 var __data = utils_sys.objects.by_id(trinity_bee.settings.general.id() + '_data');
 }
 }
 this.base = function()
 {
 if (is_init === false)
 return false;
 return trinity_bee;
 };
 this.on = function(event_name, event_handler)
 {
 if (is_init === false)
 return false;
 return trinity_bee.on(event_name, event_handler);
 };
 this.run = function()
 {
 if (is_init === false)
 return false;
 return trinity_bee.run();
 };
 this.quit = function()
 {
 if (is_init === false)
 return false;
 return trinity_bee.quit();
 };
 this.error = function()
 {
 if (is_init === false)
 return false;
 return trinity_bee.error;
 };
 this.init = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 config.id = 'trinity';
 nature.themes.store(config.id);
 nature.apply('new');
 infinity.init();
 trinity_bee = dev_box.get('bee');
 trinity_bee.init(config.id);
 trinity_bee.settings.data.window.labels.title('Trinity :: Tasks Management');
 trinity_bee.settings.data.window.labels.status_bar('Ready');
 trinity_bee.settings.general.single_instance(true);
 trinity_bee.gui.position.static(true);
 trinity_bee.gui.position.left(930);
 trinity_bee.gui.position.top(520);
 trinity_bee.gui.size.width(340);
 trinity_bee.gui.size.height(700);
 trinity_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
 trinity_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
 trinity_bee.on('open', function() { trinity_bee.gui.fx.fade.into(); });
 trinity_bee.on('opened', function() { utils_int.gui_init(); });
 trinity_bee.on('dragging', function()
 {
 trinity_bee.gui.fx.opacity.settings.set(0.7);
 trinity_bee.gui.fx.opacity.apply();
 });
 trinity_bee.on('dragged', function() { trinity_bee.gui.fx.opacity.reset(); });
 trinity_bee.on('close', function() { trinity_bee.gui.fx.fade.out(); });
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 app_box = cosmos.hub.access('app_box');
 svc_box = cosmos.hub.access('svc_box');
 dev_box = cosmos.hub.access('dev_box');
 colony = cosmos.hub.access('colony');
 roost = cosmos.hub.access('roost');
 swarm = matrix.get('swarm');
 nature = matrix.get('nature');
 infinity = dev_box.get('infinity');
 return true;
 };
 var is_init = false,
 cosmos = null,
 matrix = null,
 app_box = null,
 svc_box = null,
 dev_box = null,
 colony = null,
 roost = null,
 swarm = null,
 nature = null,
 infinity = null,
 trinity_bee = null,
 utils_sys = new vulcan(),
 processes = new processes_model(),
 utils_int = new utilities();
}
function krator()
{
 var self = this;
 function config_model()
 {
 this.id = null;
 this.content = null;
 }
 function utilities()
 {
 var me = this;
 function close_krator()
 {
 krator_bee.settings.actions.can_close(true);
 krator_bee.gui.actions.close(null);
 return true;
 }
 this.gui_init = function()
 {
 me.draw();
 me.attach_events();
 return true;
 };
 this.draw = function()
 {
 me.load_forms();
 return true;
 };
 this.load_forms = function()
 {
 var __content = '<div id="' + config.id + '_login_control" class="krator_controls">\
 <div class="controls">\
 <center>User Login</center>\
 <div class="controls">\
 <br>\
 <div class="control_item">\
 <input id="' + config.id + '_login_username_text" class="text" placeholder="Please enter your e-mail...">\
 </div>\
 <div class="control_item">\
 <input id="' + config.id + '_login_password_text" class="text" type="password" placeholder="Please enter your password...">\
 </div>\
 <br>\
 <div class="control_item">\
 <button id="' + config.id + '_login_button" class="button" type="button">\
 Login\
 </button>\
 </div>\
 <div class="control_item">\
 <div id="' + config.id + '_register_new_account" class="register_new_account">No account? Register!</div>\
 </div>\
 </div>\
 </div>\
 </div>';
 krator_bee.settings.data.window.content(__content);
 __content = '<div id="' + config.id + '_registration_control" class="registration_control krator_controls">\
 <div class="content">\
 <center>Register Account</center>\
 <div class="controls">\
 <br>\
 <div class="control_item">\
 <input id="' + config.id + '_register_username_text" class="text" placeholder="Please enter an e-mail...">\
 </div>\
 <div class="control_item">\
 <input id="' + config.id + '_register_password_text" class="text" type="password" placeholder="Please enter a password...">\
 </div>\
 <div class="control_item">\
 <input id="' + config.id + '_register_password_confirm_text" class="text" type="password" placeholder="Please confirm password...">\
 </div>\
 <br>\
 <div class="control_item">\
 <button id="' + config.id + '_register_button" class="button" type="button">\
 Register\
 </button>\
 </div>\
 </div>\
 </div>\
 </div>';
 krator_bee.settings.data.casement.content(__content);
 };
 this.attach_events = function()
 {
 var __login_username = utils_sys.objects.by_id(config.id + '_login_username_text'),
 __login_password = utils_sys.objects.by_id(config.id + '_login_password_text'),
 __login_button = utils_sys.objects.by_id(config.id + '_login_button'),
 __register_new_account = utils_sys.objects.by_id(config.id + '_register_new_account'),
 __register_username = utils_sys.objects.by_id(config.id + '_register_username_text'),
 __register_password = utils_sys.objects.by_id(config.id + '_register_password_text'),
 __register_password_confirm = utils_sys.objects.by_id(config.id + '_register_password_confirm_text'),
 __register_button = utils_sys.objects.by_id(config.id + '_register_button'),
 __handler = null,
 __args_array = null;
 __handler = function() { me.check_login_credentials(__login_username, __login_password, __login_button); };
 morpheus.run(config.id, 'mouse', 'click', __handler, __login_button);
 __handler = function()
 {
 me.check_registration_credentials(__register_username, __register_password,
 __register_password_confirm, __register_button);
 };
 morpheus.run(config.id, 'mouse', 'click', __handler, __register_button);
 __handler = function(event)
 {
 if (krator_bee.status.gui.casement_deployed())
 krator_bee.gui.actions.casement.retract(event);
 else
 krator_bee.gui.actions.casement.deploy(event);
 };
 morpheus.run(config.id, 'mouse', 'click', __handler, __register_new_account);
 __handler = function(event)
 {
 __args_array = [__login_username, __login_password, __login_button];
 me.scan_enter(event, 'login', __args_array);
 };
 morpheus.run(config.id, 'key', 'keydown', __handler, __login_username);
 __handler = function(event)
 {
 __args_array = [__login_username, __login_password, __login_button];
 me.scan_enter(event, 'login', __args_array);
 };
 morpheus.run(config.id, 'key', 'keydown', __handler, __login_password);
 __handler = function(event)
 {
 __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];
 me.scan_enter(event, 'registration', __args_array);
 };
 morpheus.run(config.id, 'key', 'keydown', __handler, __register_username);
 __handler = function(event)
 {
 __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];
 me.scan_enter(event, 'registration', __args_array);
 };
 morpheus.run(config.id, 'key', 'keydown', __handler, __register_password);
 __handler = function(event)
 {
 __args_array = [__register_username, __register_password, __register_password_confirm, __register_button];
 me.scan_enter(event, 'registration', __args_array);
 };
 morpheus.run(config.id, 'key', 'keydown', __handler, __register_password_confirm);
 return true;
 };
 this.scan_enter = function(event, form_id, args_array)
 {
 key_control.scan(event);
 if (key_control.get() === key_control.keys.ENTER)
 {
 if (form_id === 'login')
 me.check_login_credentials(args_array[0], args_array[1], args_array[2]);
 else if (form_id === 'registration')
 me.check_registration_credentials(args_array[0], args_array[1], args_array[2], args_array[3]);
 else
 return false;
 }
 return true;
 };
 this.check_login_credentials = function(username_object, password_object, login_button_object)
 {
 function enable_controls()
 {
 username_object.disabled = false;
 password_object.disabled = false;
 login_button_object.disabled = false;
 }
 function disable_controls()
 {
 username_object.disabled = true;
 password_object.disabled = true;
 login_button_object.disabled = true;
 }
 disable_controls();
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 if (!utils_sys.validation.utilities.is_email(username_object.value.trim()))
 {
 __msg_win.show(os_name, 'The email format is invalid!', __msg_win.types.OK, [() => { enable_controls(); }]);
 return;
 }
 if (username_object.value.length < 3 || password_object.value.length < 8)
 {
 __msg_win.show(os_name, 'Credentials are invalid!', __msg_win.types.OK, [() => { enable_controls(); }]);
 return;
 }
 var data = 'gate=auth&mode=login&username=' + username_object.value + '&password=' + password_object.value;
 ajax_factory('post', data, function()
 {
 is_login_ok = true;
 close_krator();
 },
 function()
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(os_name, 'Your credentials are wrong!', __msg_win.types.OK, [() => { enable_controls(); }]);
 },
 function()
 {
 });
 };
 this.check_registration_credentials = function(username_object, password_object, password_comfirm_object, register_button_object)
 {
 function enable_controls()
 {
 username_object.disabled = false;
 password_object.disabled = false;
 password_comfirm_object.disabled = false;
 register_button_object.disabled = false;
 }
 function disable_controls()
 {
 username_object.disabled = true;
 password_object.disabled = true;
 password_comfirm_object.disabled = true;
 register_button_object.disabled = true;
 }
 disable_controls();
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 if (!utils_sys.validation.utilities.is_email(username_object.value.trim()))
 {
 __msg_win.show(os_name, 'The email format is invalid!', __msg_win.types.OK, [() => { enable_controls(); }]);
 return;
 }
 if (password_object.value.length === 0)
 {
 __msg_win.show(os_name, 'Please enter a password!', __msg_win.types.OK, [() => { enable_controls(); }]);
 return;
 }
 if (username_object.value.length < 3 || password_object.value.length < 8)
 {
 __msg_win.show(os_name, 'Please choose more complex credentials!', __msg_win.types.OK, [() => { enable_controls(); }]);
 return;
 }
 if (password_object.value !== password_comfirm_object.value)
 {
 __msg_win.show(os_name, 'Password confirmation failed!', __msg_win.types.OK, [() => { enable_controls(); }]);
 return;
 }
 var data = 'gate=register&mode=reg&username=' + username_object.value.trim() + '&password=' + password_object.value;
 ajax_factory('post', data, function(result)
 {
 if (result === '9')
 __msg_win.show(os_name, 'This account already exists!', __msg_win.types.OK, [() => { enable_controls(); }]);
 else
 __msg_win.show(os_name, 'Registration succeeded!', __msg_win.types.OK, [() => { is_login_ok = true; close_krator(); }]);
 },
 function()
 {
 __msg_win.show(os_name, 'Registration failed!', __msg_win.types.OK, [() => { enable_controls(); }]);
 },
 function()
 {
 });
 };
 this.close_callback = function(script)
 {
 if (!is_login_ok)
 return false;
 script.call();
 return true;
 };
 }
 this.base = function()
 {
 if (is_init === false)
 return false;
 return krator_bee;
 };
 this.on = function(event_name, event_handler)
 {
 if (is_init === false)
 return false;
 return krator_bee.on(event_name, event_handler);
 };
 this.run = function()
 {
 if (is_init === false)
 return false;
 return krator_bee.run();
 };
 this.quit = function()
 {
 if (is_init === false)
 return false;
 return krator_bee.quit();
 };
 this.error = function()
 {
 if (is_init === false)
 return false;
 return krator_bee.error;
 };
 this.init = function(script)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (!utils_sys.validation.misc.is_function(script))
 return false;
 is_init = true;
 os_name = xenon.load('os_name');
 krator_bee = dev_box.get('bee');
 config.id = 'krator_' + random.generate();
 nature.themes.store('krator');
 nature.apply('new');
 krator_bee.init(config.id);
 krator_bee.settings.data.window.labels.title('Login & Registration Form');
 krator_bee.settings.data.window.labels.status_bar(os_name + ' - Login/Registration');
 krator_bee.settings.actions.can_edit_title(false);
 krator_bee.settings.actions.can_use_menu(false);
 krator_bee.settings.actions.can_close(false);
 krator_bee.settings.general.single_instance(true);
 krator_bee.gui.size.width(420);
 krator_bee.gui.size.height(400);
 krator_bee.gui.position.static(true);
 krator_bee.gui.position.left(swarm.settings.right() / 2 - 210);
 krator_bee.gui.position.top(250);
 krator_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
 krator_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
 krator_bee.on('open', function() { krator_bee.gui.fx.fade.into(); });
 krator_bee.on('opened', function() { utils_int.gui_init(); });
 krator_bee.on('dragging', function()
 {
 krator_bee.gui.fx.opacity.settings.set(0.7);
 krator_bee.gui.fx.opacity.apply();
 });
 krator_bee.on('dragged', function() { krator_bee.gui.fx.opacity.reset(); });
 krator_bee.on('close', function()
 {
 morpheus.clear(config.id);
 krator_bee.gui.fx.fade.out();
 });
 krator_bee.on('closed', function()
 {
 krator_bee.on('closed', function() { nature.themes.clear('krator'); });
 utils_int.close_callback(script);
 });
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 dev_box = cosmos.hub.access('dev_box');
 morpheus = matrix.get('morpheus');
 xenon = matrix.get('xenon');
 swarm = matrix.get('swarm');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_login_ok = false,
 os_name = null,
 cosmos = null,
 matrix = null,
 dev_box = null,
 morpheus = null,
 xenon = null,
 swarm = null,
 nature = null,
 krator_bee = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 config = new config_model(),
 utils_int = new utilities();
}
function ui_controls()
{
 var self = this;
 function config_model()
 {
 this.is_boxified = false;
 this.all_stacked = false;
 }
 function utilities()
 {
 var me = this;
 this.draw_ui_controls = function()
 {
 me.draw_controls();
 me.attach_events();
 return true;
 };
 this.draw_controls = function()
 {
 var __controls_div = utils_sys.objects.by_id('action_icons');
 if (__controls_div === null)
 return false;
 __controls_div.innerHTML = '<div id="' + ui_controls_id + '" class="windows_placement">' +
 ' <div id="' + ui_controls_id + '_boxify_all" class="boxify_all placement_icons" title="Switch among open apps"></div>' +
 ' <div id="' + ui_controls_id + '_stack_all" class="stack_all placement_icons" title="Stack / unstack all apps"></div>' +
 '</div>';
 return true;
 };
 this.make_active = function(id)
 {
 var __control = utils_sys.objects.by_id(ui_controls_id + '_' + id);
 if (id === 'boxify_all')
 __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/boxify_hover.png')";
 else if (id === 'stack_all')
 __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/stack_hover.png')";
 else
 return false;
 return true;
 };
 this.make_inactive = function(id)
 {
 var __control = utils_sys.objects.by_id(ui_controls_id + '_' + id);
 if (id === 'boxify_all')
 __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/boxify.png')";
 else if (id === 'stack_all')
 __control.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/ui_controls/pix/stack.png')";
 else
 return false;
 return true;
 };
 this.attach_events = function()
 {
 var __handler = null;
 __handler = function() { self.placement.boxify(); };
 morpheus.run(ui_controls_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(ui_controls_id + '_boxify_all'));
 morpheus.run(ui_controls_id, 'touch', 'touchstart', __handler, utils_sys.objects.by_id(ui_controls_id + '_boxify_all'));
 __handler = function()
 {
 me.make_inactive('boxify_all');
 config.is_boxified = false;
 };
 morpheus.run(ui_controls_id, 'mouse', 'mouseout', __handler, utils_sys.objects.by_id(ui_controls_id + '_boxify_all'));
 __handler = function(event) { self.placement.stack(event); };
 morpheus.run(ui_controls_id, 'mouse', 'mousedown', __handler, utils_sys.objects.by_id(ui_controls_id + '_stack_all'));
 return true;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 function placement()
 {
 this.boxify = function(activate = true)
 {
 if (is_init === false)
 return false;
 if (activate && config.is_boxified === false)
 utils_int.make_active('boxify_all');
 else
 utils_int.make_inactive('boxify_all');
 return true;
 };
 this.stack = function(event)
 {
 if (is_init === false)
 return false;
 var __bees = colony.list();
 if (config.all_stacked === false)
 {
 var __is_bee_in_swarm = true;
 if ( __bees.length === 0)
 return false;
 for (var __this_bee of __bees)
 {
 if (!__this_bee.status.system.in_hive())
 {
 __is_bee_in_swarm = false;
 break;
 }
 }
 if (__is_bee_in_swarm)
 return false;
 hive.stack.set_view(event, 1, () =>
 {
 hive.stack.bees.insert(__bees, null);
 utils_int.make_active('stack_all');
 config.all_stacked = true;
 });
 }
 else
 {
 if (__bees.length === 0)
 return false;
 hive.stack.bees.expel(event, 0);
 hive.stack.set_view(event, 1, () =>
 {
 utils_int.make_inactive('stack_all');
 config.all_stacked = false;
 });
 }
 return true;
 };
 }
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.alpha.is_symbol(container_id) ||
 utils_sys.objects.by_id(container_id) === null)
 return false;
 is_init = true;
 self.settings.id('ui_controls_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 ui_controls_id = self.settings.id();
 nature.themes.store('ui_controls');
 nature.apply('new');
 utils_int.draw_ui_controls();
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 colony = cosmos.hub.access('colony');
 swarm = matrix.get('swarm');
 hive = matrix.get('hive');
 morpheus = matrix.get('morpheus');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 ui_controls_id = null,
 cosmos = null,
 matrix = null,
 colony = null,
 swarm = null,
 hive = null,
 morpheus = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 config = new config_model(),
 utils_int = new utilities();
 this.settings = new settings();
 this.placement = new placement();
}
function dock()
{
 var self = this;
 function config_model()
 {
 this.dock_array = [];
 }
 function utilities()
 {
 var me = this;
 function ajax_load(element_id, success_callback, time_out_callback = null, fail_callback = null)
 {
 if (utils_sys.validation.misc.is_undefined(element_id))
 return false;
 var __ajax_config = {
 "type" : "data",
 "url" : "/",
 "data" : "gate=dock&action=load",
 "element_id" : element_id,
 "content_fill_mode" : "replace",
 "on_success" : function()
 {
 success_callback.call();
 },
 "on_timeout" : function()
 {
 if (time_out_callback !== null)
 time_out_callback.call();
 },
 "on_fail" : function()
 {
 if (fail_callback !== null)
 fail_callback.call();
 }
 };
 ajax.run(__ajax_config);
 return true;
 }
 function ajax_save(apps_array)
 {
 var __ajax_config = {
 "type" : "request",
 "method" : "post",
 "url" : "/",
 "data" : "gate=dock&action=save&apps=" + apps_array,
 "ajax_mode" : "asynchronous",
 };
 return ajax.run(__ajax_config);
 }
 function create_dock_array()
 {
 var __app_id = null,
 __app_icon = null,
 __position = null,
 __system = null,
 __title = null
 __dock_app = null,
 __dock = utils_sys.objects.by_class('favorites');
 for (__dock_app of __dock)
 {
 __app_id = __dock_app.getAttribute('id').split('app_')[1],
 __app_icon = __dock_app.getAttribute('data-icon'),
 __position = __dock_app.getAttribute('data-position'),
 __system = __dock_app.getAttribute('data-system'),
 __title = __dock_app.getAttribute('title');
 config.dock_array.push({ "id" : __app_id, "icon" : __app_icon,
 "position" : __position, "system" : __system,
 "title" : __title});
 }
 return true;
 }
 function attach_events()
 {
 var __dock_div = utils_sys.objects.by_id(self.settings.container()),
 __handler = null,
 __dock_app = null;
 __handler = function() { last_button_clicked = 0; };
 morpheus.run(dock_id, 'mouse', 'mouseenter', __handler, __dock_div);
 for (__dock_app of config.dock_array)
 run_app(__dock_app);
 enable_drag();
 return true;
 }
 function update_dock_array(position_one, position_two)
 {
 var tmp = config.dock_array[position_one];
 config.dock_array[position_one] = config.dock_array[position_two];
 config.dock_array[position_two] = tmp;
 config.dock_array[position_one]['position'] = position_one + 1;
 config.dock_array[position_two]['position'] = position_two + 1;
 return true;
 }
 function run_app(dock_app)
 {
 var __handler = function(event)
 {
 if (event.buttons === 0 && last_button_clicked !== 1)
 return false;
 if (is_dragging)
 return false;
 var __app_id = dock_app['id'],
 __system_app = dock_app['system'],
 __sys_theme = chameleon.get(),
 __is_sys_level = true;
 parrot.play('action', '/site/themes/' + __sys_theme + '/sounds/button_click.mp3');
 if (__system_app === 'true')
 __is_sys_level = true;
 else
 __is_sys_level = false;
 if (x_runner.start('app', __app_id, __is_sys_level))
 ;
 };
 morpheus.run(dock_id, 'mouse', 'mouseup', __handler, utils_sys.objects.by_id('app_' + dock_app['id']));
 }
 function enable_drag()
 {
 var __dock_div = utils_sys.objects.by_id(self.settings.container()),
 __dock_apps = utils_sys.objects.selectors.all('#top_panel #favorite_apps .favorites'),
 __dock_apps_length = __dock_apps.length,
 __handler = null;
 for (var i = 0; i < __dock_apps_length; i++)
 {
 __handler = function(event) { last_button_clicked = event.buttons; };
 morpheus.run(dock_id, 'mouse', 'mousedown', __handler, __dock_apps[i]);
 __handler = function(event)
 {
 is_dragging = true;
 event.dataTransfer.setDragImage(this, -5, -5);
 event.dataTransfer.effectAllowed = 'move';
 event.dataTransfer.setData('text/plain', event.target.id);
 for (var j = 0; j < __dock_apps_length; j++)
 __dock_apps[j].classList.add('dock_replace');
 };
 morpheus.run(dock_id, 'mouse', 'dragstart', __handler, __dock_apps[i]);
 __handler = function(event)
 {
 event.preventDefault();
 event.dataTransfer.dropEffect = 'move';
 };
 morpheus.run(dock_id, 'mouse', 'dragover', __handler, __dock_apps[i]);
 __handler = function(event)
 {
 event.preventDefault();
 event.target.classList.add('dock_replace_outer');
 };
 morpheus.run(dock_id, 'mouse', 'dragenter', __handler, __dock_apps[i]);
 __handler = function() { this.classList.remove('dock_replace_outer'); };
 morpheus.run(dock_id, 'mouse', 'dragleave', __handler, __dock_apps[i]);
 __handler = function()
 {
 is_dragging = false;
 for (var j = 0; j < __dock_apps_length; j++)
 {
 __dock_apps[j].classList.remove('dock_replace_outer');
 __dock_apps[j].classList.remove('dock_replace');
 }
 };
 morpheus.run(dock_id, 'mouse', 'dragend', __handler, __dock_apps[i]);
 __handler = function(event)
 {
 if (event.target.id !== event.dataTransfer.getData('text/plain'))
 {
 var __id = event.dataTransfer.getData('text/plain'),
 __app_to_move = utils_sys.objects.by_id(__id),
 __app_to_move_next = __app_to_move.nextSibling,
 __app_to_replace = utils_sys.objects.by_id(this.id),
 __position_one = __app_to_move.getAttribute('data-position'),
 __position_two = event.target.getAttribute('data-position');
 __app_to_move.setAttribute('data-position', __position_two);
 event.target.setAttribute('data-position', __position_one);
 __dock_div.insertBefore(__app_to_move, __app_to_replace.nextSibling);
 __dock_div.insertBefore(__app_to_replace, __app_to_move_next);
 update_dock_array(__position_one - 1, __position_two - 1);
 me.save_dock();
 }
 };
 morpheus.run(dock_id, 'mouse', 'drop', __handler, __dock_apps[i]);
 }
 }
 this.draw = function()
 {
 ajax_load(self.settings.container(), function()
 {
 create_dock_array();
 attach_events();
 });
 return true;
 };
 this.save_dock = function()
 {
 var __dock_array = encodeURIComponent(JSON.stringify(config.dock_array));
 return ajax_save(__dock_array);
 };
 this.clear = function()
 {
 config.dock_array = [];
 morpheus.clear(dock_id);
 var __dock = utils_sys.objects.by_class('favorites');
 __dock.innerHTML = '';
 return true;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 function instances()
 {
 this.increase = function(dock_app_id)
 {
 if (is_init === false)
 return false;
 var __dock_app = null,
 __app_instance_div = null;
 for (__dock_app of config.dock_array)
 {
 if (__dock_app['id'] === dock_app_id)
 {
 __app_instance_div = utils_sys.objects.by_id('app_' + dock_app_id + '_instances');
 __app_instance_div.innerHTML = parseInt(__app_instance_div.innerHTML) + 1;
 __app_instance_div.style.display = 'block';
 return true;
 }
 }
 return false;
 };
 this.decrease = function(dock_app_id)
 {
 if (is_init === false)
 return false;
 var __dock_app = null,
 __app_instance_div = null;
 for (__dock_app of config.dock_array)
 {
 if (__dock_app['id'] === dock_app_id)
 {
 __app_instance_div = utils_sys.objects.by_id('app_' + dock_app_id + '_instances');
 __app_instance_div.innerHTML = parseInt(__app_instance_div.innerHTML) - 1;
 if (__app_instance_div.innerHTML === '0')
 __app_instance_div.style.display = 'none';
 return true;
 }
 }
 return false;
 };
 }
 this.add = function()
 {
 if (is_init === false)
 return false;
 return true;
 };
 this.remove = function()
 {
 if (is_init === false)
 return false;
 return true;
 };
 this.refresh = function()
 {
 if (is_init === false)
 return false;
 utils_int.clear();
 utils_int.draw();
 return true;
 };
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.alpha.is_symbol(container_id) ||
 utils_sys.objects.by_id(container_id) === null)
 return false;
 is_init = true;
 self.settings.id('dock_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 dock_id = self.settings.id();
 nature.themes.store('dock');
 nature.apply('new');
 utils_int.draw();
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 x_runner = matrix.get('x_runner');
 parrot = matrix.get('parrot');
 chameleon = matrix.get('chameleon');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_dragging = false,
 dock_id = null,
 cosmos = null,
 matrix = null,
 morpheus = null,
 x_runner = null,
 parrot = null,
 chameleon = null,
 nature = null,
 last_button_clicked = 0,
 utils_sys = new vulcan(),
 random = new pythia(),
 ajax = new taurus(),
 config = new config_model(),
 utils_int = new utilities();
 this.settings = new settings();
 this.instances = new instances();
}
function user_profile()
{
 var self = this;
 function user_profile_model()
 {
 this.full_name = null;
 this.email = null;
 this.role = null;
 this.wallpaper = null;
 }
 function utilities()
 {
 var me = this;
 function hide_profile_area_on_key(event)
 {
 if (utils_sys.validation.misc.is_undefined(event))
 return false;
 key_control.scan(event);
 if (key_control.get() !== key_control.keys.ESCAPE)
 return false;
 me.hide_profile_area();
 return true;
 }
 this.session_watchdog = function()
 {
 function abnormal_logout()
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(os_name, 'Your session has been terminated!',
 __msg_win.types.OK,
 [() =>
 {
 parrot.play('sys', '/site/themes/' + chameleon.get() + '/sounds/logout_fresh.mp3');
 setTimeout(function(){ location.reload();
 }, 1000); }]);
 }
 function run_heartbeat()
 {
 var heartbeat_config = {
 "interval" : 90000,
 "response_timeout" : 60000,
 "on_success" : function()
 {
 },
 "on_fail" : function()
 {
 abnormal_logout();
 },
 "on_timeout" : function()
 {
 }
 };
 heartbeat_config.url = 'beat/';
 heartbeat_config.service_name = 'Session Watchdog';
 heartbeat(heartbeat_config);
 }
 setTimeout(function(){ run_heartbeat(); }, 1000);
 };
 this.details = function()
 {
 var __data = 'gate=auth&mode=details';
 ajax_factory('post', __data, function(result)
 {
 var __auth_details = JSON.parse(result);
 user_profile_data.full_name = __auth_details.profile;
 user_profile_data.email = __auth_details.email;
 user_profile_data.role = __auth_details.role;
 user_profile_data.wallpaper = __auth_details.ui.wallpaper;
 utils_sys.objects.by_id(user_profile_id + '_user_profile_name').innerHTML = user_profile_data.full_name;
 utils_sys.objects.by_id(user_profile_id + '_user_email').innerHTML = user_profile_data.email;
 if (user_profile_data.wallpaper === '')
 document.body.style.backgroundImage = 'url(/site/pix/wallpapers/default.png)';
 else
 document.body.style.backgroundImage = 'url(/site/pix/wallpapers/' + user_profile_data.wallpaper + ')';
 },
 function()
 {
 },
 function()
 {
 });
 };
 this.logout = function()
 {
 var __data = 'gate=auth&mode=logout';
 ajax_factory('post', __data, function()
 {
 parrot.play('sys', '/site/themes/' + chameleon.get() + '/sounds/logout_fresh.mp3');
 cc_reload.init('Logging out...');
 },
 function()
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(os_name, 'Logout error!',
 __msg_win.types.OK,
 [() => { cc_reload.init(); }]);
 },
 function()
 {
 });
 me.hide_profile_area();
 };
 this.draw_user_profile = function()
 {
 me.draw();
 me.attach_events();
 me.details();
 me.session_watchdog();
 return true;
 };
 this.draw = function()
 {
 var __user_profile_div = utils_sys.objects.by_id('user_profile');
 if (__user_profile_div === null)
 return false;
 __user_profile_div.style = 'width: 182px; margin-left: 25px;';
 __user_profile_div.innerHTML = `<div id="` + user_profile_id + `" title="Manage profile">
 <div id="` + user_profile_id + `_notifications_num" class="notifications_num">00</div>
 <div id="` + user_profile_id + `_profile_access" class="profile_access">
 <div id="` + user_profile_id + `_small_avatar" class="small_avatar"></div>
 <div id="` + user_profile_id + `_my" class="my">My profile</div>
 </div>
 </div>
 <div id="` + user_profile_id + `_area" class="user_profile_area">
 <div id="` + user_profile_id + `_profile_left_side" class="profile_left_side">
 <div id="` + user_profile_id + `_profile_info" class="profile_info">
 <div id="` + user_profile_id + `_big_avatar" class="big_avatar"></div>
 <div id="` + user_profile_id + `_user_data" class="user_data">
 <div id="` + user_profile_id + `_user_profile_name" class="user_profile_name"></div>
 <div id="` + user_profile_id + `_user_email" class="user_email"></div>
 <div id="` + user_profile_id + `_user_account" class="user_account">Account</div>
 <div id="` + user_profile_id + `_separator" class="profile_separator">|</div>
 <div id="` + user_profile_id + `_user_settings" class="user_settings">Settings</div>
 <div id="` + user_profile_id + `_user_reboot" class="user_reboot">Reload Interface</div>
 </div>
 </div>
 </div>
 <div id="` + user_profile_id + `_profile_right_side" class="profile_right_side">
 <div id="` + user_profile_id + `_notifications" class="notifications">
 <div id="` + user_profile_id + `_total_notifications" class="total_notifications"></div>
 <div id="` + user_profile_id + `_notifications_list" class="notifications_list">
 <div id="` + user_profile_id + `_messages" class="notification_list_item">
 <div class="` + user_profile_id + `_item_details" class="items_details">
 <div id="` + user_profile_id + `_messages_icon" class="messages_icon list_item_icon"></div>
 <div id="` + user_profile_id + `_messages_text" class="list_item_text">Messages</div>
 </div>
 <div id="` + user_profile_id + `_messages_notifications" class="list_item_notifications">00</div>
 </div>
 <div id="` + user_profile_id + `_alerts" class="notification_list_item">
 <div class="` + user_profile_id + `_item_details" class="item_details">
 <div id="` + user_profile_id + `_alerts_icon" class="alerts_icon list_item_icon"></div>
 <div id="` + user_profile_id + `_alerts_text" class="list_item_text">Alerts</div>
 </div>
 <div id="` + user_profile_id + `_alerts_notifications" class="list_item_notifications">00</div>
 </div>
 <div id="` + user_profile_id + `_calendar" class="notification_list_item">
 <div class="` + user_profile_id + `_item_details" class="item_details">
 <div id="` + user_profile_id + `_calendar_icon" class="calendar_icon list_item_icon"></div>
 <div id="` + user_profile_id + `_calendar_text" class="list_item_text">Calendar</div>
 </div>
 <div id="` + user_profile_id + `_calendar_notifications" class="list_item_notifications">00</div>
 </div>
 </div>
 </div>
 <div id="` + user_profile_id + `_logout" class="logout">
 <div id="` + user_profile_id + `_logout_icon" class="logout_icon"></div>
 <button id="` + user_profile_id + `_logout_button" class="button logout_button" type="button">Logout</button>
 </div>
 </div>
 </div>`;
 return true;
 };
 this.attach_events = function()
 {
 var __handler = null;
 __handler = function() { me.toggle_profile_area(); };
 morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(user_profile_id));
 __handler = function() { me.reboot_os(); };
 morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(user_profile_id + '_user_reboot'));
 __handler = function() { me.logout(); };
 morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(user_profile_id + '_logout'));
 __handler = function() { me.hide_profile_area(); };
 morpheus.run(user_profile_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('desktop'));
 morpheus.run(user_profile_id, 'touch', 'touchmove', __handler, utils_sys.objects.by_id('desktop'));
 __handler = function(event) { hide_profile_area_on_key(event); };
 morpheus.run(user_profile_id, 'key', 'keydown', __handler, document);
 return true;
 };
 this.show_profile_area = function()
 {
 var __user_profile_area = utils_sys.objects.by_id(user_profile_id + '_area'),
 __my_profile_label = utils_sys.objects.by_id(user_profile_id + '_my');
 __user_profile_area.style.display = 'block';
 __my_profile_label.classList.remove('user_profile_hidden');
 __my_profile_label.classList.add('user_profile_active');
 is_profile_area_visible = true;
 super_tray.hide();
 search.hide();
 return true;
 };
 this.hide_profile_area = function()
 {
 var __user_profile_area = utils_sys.objects.by_id(user_profile_id + '_area'),
 __my_profile_label = utils_sys.objects.by_id(user_profile_id + '_my');
 __user_profile_area.style.display = 'none';
 __my_profile_label.classList.remove('user_profile_active');
 __my_profile_label.classList.add('user_profile_hidden');
 is_profile_area_visible = false;
 super_tray.hide();
 return true;
 };
 this.toggle_profile_area = function()
 {
 if (is_profile_area_visible)
 me.hide_profile_area();
 else
 me.show_profile_area();
 return true;
 };
 this.reboot_os = function()
 {
 cc_reload.init();
 return true;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 this.show = function()
 {
 if (is_init === false)
 return false;
 return utils_int.show_profile_area();
 };
 this.hide = function()
 {
 if (is_init === false)
 return false;
 return utils_int.hide_profile_area();
 };
 this.toggle = function()
 {
 if (is_init === false)
 return false;
 return utils_int.toggle_profile_area();
 };
 this.details = function()
 {
 if (is_init === false)
 return false;
 return user_profile_data;
 };
 this.logout = function()
 {
 utils_int.logout();
 return true;
 };
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.alpha.is_symbol(container_id) ||
 utils_sys.objects.by_id(container_id) === null)
 return false;
 is_init = true;
 os_name = xenon.load('os_name');
 self.settings.id('user_profile_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 user_profile_id = self.settings.id();
 super_tray_id = super_tray.id();
 nature.themes.store('user_profile');
 nature.apply('new');
 utils_int.draw_user_profile();
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 colony = cosmos.hub.access('colony');
 xenon = matrix.get('xenon');
 swarm = matrix.get('swarm');
 hive = matrix.get('hive');
 morpheus = matrix.get('morpheus');
 super_tray = matrix.get('super_tray');
 search = matrix.get('search');
 parrot = matrix.get('parrot');
 chameleon = matrix.get('chameleon');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_profile_area_visible = false,
 user_profile_id = null,
 user_details = null,
 os_name = null,
 cosmos = null,
 matrix = null,
 xenon = null,
 swarm = null,
 hive = null,
 search = null,
 morpheus = null,
 super_tray = null,
 chameleon = null,
 nature = null,
 super_tray_id = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 cc_reload = new f5(),
 user_profile_data = new user_profile_model(),
 utils_int = new utilities();
 this.settings = new settings();
}
function search()
{
 var self = this;
 function utilities()
 {
 var me = this;
 function hide_serch_area_on_key(event)
 {
 if (utils_sys.validation.misc.is_undefined(event))
 return false;
 key_control.scan(event);
 if (key_control.get() !== key_control.keys.ESCAPE)
 return false;
 self.hide();
 return true;
 }
 function key_down_tracer(event_object)
 {
 key_control.scan(event_object);
 var __key_code = key_control.get();
 if (__key_code === 114)
 {
 if (search_on === true)
 return false;
 self.toggle();
 search_on = true;
 }
 return true;
 }
 function key_up_tracer(event_object)
 {
 key_control.scan(event_object);
 var __key_code = key_control.get();
 if (__key_code !== 114)
 return false;
 search_on = false;
 return true;
 }
 this.attach_events = function()
 {
 var __handler = null,
 __desktop = utils_sys.objects.by_id('desktop');
 __handler = function(event) { key_down_tracer(event); };
 morpheus.run(search_id, 'key', 'keydown', __handler, document);
 __handler = function(event) { key_up_tracer(event); };
 morpheus.run(search_id, 'key', 'keyup', __handler, document);
 __handler = function(event) { hide_serch_area_on_key(event); };
 morpheus.run(search_id, 'key', 'keydown', __handler, document);
 __handler = function() { self.hide(); };
 morpheus.run(search_id, 'mouse', 'click', __handler, __desktop);
 morpheus.run(search_id, 'touch', 'touchmove', __handler, __desktop);
 return true;
 };
 this.draw = function()
 {
 var __desktop = utils_sys.objects.by_id('desktop');
 __desktop.innerHTML += `<div id="`+ search_id + `" class="search">
 <div id="philos" title="Philos :: Your personal AI assistant"></div>
 <div id="eureka" title="Eureka :: Your own meta-search engine">
 <input id="eureka_search_box" type="text" value="" maxlength="100" placeholder="What's next?">
 </div>
 </div>`;
 return true;
 };
 this.load_ui = function()
 {
 nature.themes.store('search');
 nature.apply('new');
 me.draw();
 me.attach_events();
 };
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 this.show = function()
 {
 if (is_init === false)
 return false;
 utils_sys.objects.by_id(search_id).style.display = 'block';
 utils_sys.objects.by_id('eureka_search_box').focus();
 is_search_visible = true;
 return true;
 };
 this.hide = function()
 {
 if (is_init === false)
 return false;
 utils_sys.objects.by_id(search_id).style.display = 'none';
 is_search_visible = false;
 return true;
 };
 this.toggle = function()
 {
 if (is_init === false)
 return false;
 if (is_search_visible)
 self.hide();
 else
 self.show();
 return true;
 };
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 self.settings.id('search_' + random.generate());
 search_id = self.settings.id();
 if (self.settings.container(container_id))
 return utils_int.load_ui();
 return false;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 search_on = false,
 is_search_visible = false,
 search_id = null,
 cosmos = null,
 matrix = null,
 morpheus = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 utils_int = new utilities();
 this.settings = new settings();
}
function chameleon()
{
 var self = this;
 function theme_in_use()
 {
 function theme_data()
 {
 this.pictures = [];
 this.sounds = [];
 }
 this.name = null;
 this.list = new theme_data();
 }
 this.get = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (sys_theme.name === null)
 return false;
 return sys_theme.name;
 };
 this.set = function(theme)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.alpha.is_symbol(theme))
 return false;
 sys_theme.name = theme;
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 return true;
 };
 var cosmos = null,
 utils_sys = new vulcan(),
 sys_theme = new theme_in_use();
}
function nature()
{
 var self = this;
 function utilities()
 {
 this.search = function(theme)
 {
 var __theme_links = document.head.getElementsByTagName('link');
 if (!__theme_links)
 return false;
 var __theme_links_num = __theme_links.length;
 for (var i = 0; i < __theme_links_num; i++)
 {
 if (__theme_links[i].attributes.rel.value === 'stylesheet')
 {
 if (__theme_links[i].attributes.href.value.indexOf(theme) > -1)
 return __theme_links[i];
 }
 }
 return false;
 };
 }
 function themes()
 {
 this.store = function(theme)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.alpha.is_string(theme))
 return false;
 theme_in_use = theme;
 return true;
 };
 this.clear = function(theme)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_invalid(theme))
 return false;
 var __theme_link = self.scan(theme);
 if (!__theme_link)
 return false;
 document.head.removeChild(__theme_link);
 if (theme === theme_in_use)
 theme_in_use = null;
 return true;
 };
 }
 this.apply = function(mode)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (theme_in_use === null)
 return false;
 if (mode !== 'new' && mode !== 'replace')
 return false;
 if (mode === 'new')
 {
 if (self.scan(theme_in_use))
 return false;
 return utils_sys.graphics.apply_theme('/framework/extensions/js/core/nature/themes/' + theme_in_use, theme_in_use);
 }
 else if (mode === 'replace')
 {
 self.themes.clear(theme_in_use);
 return utils_sys.graphics.apply_theme('/framework/extensions/js/core/nature/themes/' + theme_in_use, theme_in_use);
 }
 };
 this.scan = function(theme)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.alpha.is_string(theme))
 return false;
 return utils_int.search(theme);
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 return true;
 };
 var cosmos = null,
 theme_in_use = null,
 utils_sys = new vulcan(),
 utils_int = new utilities();
 this.themes = new themes();
}
function eagle()
{
 var self = this;
 function trace_keys_model()
 {
 this.modifier = key_control.keys.SHIFT;
 this.trigger = key_control.keys.TAB;
 this.modifier_set = false;
 this.trigger_set = false;
 }
 function utilities()
 {
 var me = this;
 this.key_down_tracer = function(event_object)
 {
 key_control.scan(event_object);
 var __key_code = key_control.get();
 if (trace_keys.modifier === __key_code)
 trace_keys.modifier_set = true;
 if (trace_keys.trigger === __key_code && trace_keys.modifier_set === true)
 {
 trace_keys.trigger_set = true;
 if (is_visible === false)
 {
 me.show_eagle();
 me.draw_windows();
 ui_controls.placement.boxify(true);
 }
 me.switch_windows();
 event_object.preventDefault();
 }
 return true;
 };
 this.key_up_tracer = function(event_object)
 {
 key_control.scan(event_object);
 var __key_code = key_control.get();
 if (trace_keys.modifier === __key_code)
 {
 var __eagle_apps = utils_sys.objects.by_id(eagle_id + '_apps');
 __eagle_apps.scrollTo(0, 1);
 me.hide_eagle();
 ui_controls.placement.boxify(false);
 trace_keys.modifier_set = false;
 picked_window = 0;
 scroll_multiplier = 1;
 }
 return true;
 };
 this.draw_eagle = function()
 {
 var __eagle_interface = document.createElement('div'),
 __container_object = utils_sys.objects.by_id(self.settings.container());
 __eagle_interface.id = eagle_id;
 __eagle_interface.className = 'eagle';
 __eagle_interface.innerHTML = '<div id="' + eagle_id + '_apps" class="eagle_apps"><br><br>No running apps...</div></div>';
 __container_object.appendChild(__eagle_interface);
 return true;
 };
 this.show_eagle = function()
 {
 var __eagle = utils_sys.objects.by_id(eagle_id);
 __eagle.style.display = 'block';
 is_visible = true;
 return true;
 };
 this.hide_eagle = function()
 {
 var __eagle = utils_sys.objects.by_id(eagle_id);
 __eagle.style.display = 'none';
 picked_window = 0;
 scroll_multiplier = 1;
 is_visible = false;
 return true;
 };
 this.draw_windows = function()
 {
 var __running_apps = owl.list('RUN', 'app'),
 __running_apps_num = 0,
 __eagle_apps = null,
 __this_picked_app = null,
 __this_app_title = null;
 __eagle_apps = utils_sys.objects.by_id(eagle_id + '_apps');
 __running_apps_num = __running_apps.length;
 if (__running_apps_num == 0)
 {
 __eagle_apps.innerHTML = '<br><br>No running apps...';
 return false;
 }
 __eagle_apps.innerHTML = '';
 for (var i = 1; i <= __running_apps_num; i++)
 {
 __this_picked_app = colony.get(__running_apps[i - 1].sys_id);
 if (!__this_picked_app)
 continue;
 if (i === 1)
 picked_app = __this_picked_app;
 __this_app_title = __this_picked_app.settings.data.window.labels.title();
 var __this_eagle_window = document.createElement('div'),
 __no_right_margin = '';
 if (i % 3 === 0)
 __no_right_margin = ' no_right_margin';
 if (__this_app_title.length > 13)
 __this_app_title = __this_app_title.substring(0, 12) + '...';
 __this_eagle_window.id = 'eagle_' + __running_apps[i - 1].sys_id;
 __this_eagle_window.className = 'eagle_window' + __no_right_margin;
 __this_eagle_window.innerHTML = '<div class="eagle_window_title">' + __this_app_title + '</div>\
 <div class="eagle_window_body"></div>';
 if (i === 1)
 __this_eagle_window.classList.add('eagle_window_selected');
 __eagle_apps.appendChild(__this_eagle_window);
 }
 return true;
 };
 this.switch_windows = function()
 {
 var __running_apps = owl.list('RUN', 'app'),
 __running_apps_num = 0,
 __eagle_apps = null,
 __this_picked_app = null,
 __previous_picked_win = null,
 __this_picked_win = null;
 __running_apps_num = __running_apps.length;
 if (__running_apps_num == 0)
 return false;
 __eagle_apps = utils_sys.objects.by_id(eagle_id + '_apps');
 if (picked_window > 0)
 {
 __previous_picked_win = __eagle_apps.childNodes[picked_window - 1];
 __previous_picked_win.classList.remove('eagle_window_selected');
 }
 if (picked_window >= __running_apps_num)
 {
 picked_window = 0;
 scroll_multiplier = 1;
 __eagle_apps.scrollTo(0, 1);
 }
 __this_picked_win = __eagle_apps.childNodes[picked_window];
 if (utils_sys.validation.misc.is_undefined(__this_picked_win))
 return false;
 __this_picked_win.classList.add('eagle_window_selected');
 if (picked_window % 6 === 0 && picked_window > 0)
 {
 var __scroll_distance = 224;
 __eagle_apps.scrollTo(0, scroll_multiplier * __scroll_distance);
 scroll_multiplier++;
 }
 __this_picked_app = colony.get(__running_apps[picked_window].sys_id);
 __this_picked_app.gui.actions.set_top();
 picked_window++;
 return true;
 };
 this.init_trace_keys = function()
 {
 var __handler = null,
 __boxify = utils_sys.objects.by_id(ui_controls.settings.id() + '_boxify_all');
 __handler = function(event) { me.key_down_tracer(event); };
 morpheus.run(eagle_id, 'key', 'keydown', __handler, document);
 __handler = function(event) { me.key_up_tracer(event); };
 morpheus.run(eagle_id, 'key', 'keyup', __handler, document);
 __handler = function(event_object)
 {
 trace_keys.trigger_set = true;
 if (is_visible === false)
 {
 me.show_eagle();
 me.draw_windows();
 }
 me.switch_windows();
 event_object.preventDefault();
 };
 morpheus.run(eagle_id, 'mouse', 'click', __handler, __boxify);
 __handler = function() { me.hide_eagle(); };
 morpheus.run(eagle_id, 'mouse', 'mouseout', __handler, __boxify);
 morpheus.run(eagle_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('desktop'));
 return true;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 function status()
 {
 function modifier()
 {
 this.key = function()
 {
 if (is_init === false)
 return false;
 return trace_keys.modifier;
 };
 this.status = function()
 {
 if (is_init === false)
 return false;
 return trace_keys.modifier_set;
 };
 }
 function trigger()
 {
 this.key = function()
 {
 if (is_init === false)
 return false;
 return trace_keys.trigger;
 };
 this.status = function()
 {
 if (is_init === false)
 return false;
 return trace_keys.trigger_set;
 };
 }
 this.picked_app = function()
 {
 return picked_app;
 };
 this.modifier = new modifier();
 this.trigger = new trigger();
 }
 this.init = function(container_id, modifier, trigger)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.alpha.is_symbol(container_id) ||
 utils_sys.objects.by_id(container_id) === null)
 return false;
 if (!utils_sys.validation.misc.is_undefined(modifier) && !utils_sys.validation.misc.is_undefined(trigger))
 {
 if (!utils_sys.validation.numerics.is_integer(modifier) || modifier < 8 || modifier > 222 ||
 !utils_sys.validation.numerics.is_integer(trigger) || trigger < 8 || trigger > 222)
 return false;
 trace_keys.modifier = modifier;
 trace_keys.trigger = trigger;
 }
 else
 {
 if ((!utils_sys.validation.misc.is_undefined(modifier) && utils_sys.validation.misc.is_undefined(trigger)) ||
 (utils_sys.validation.misc.is_undefined(modifier) && !utils_sys.validation.misc.is_undefined(trigger)))
 return false;
 }
 is_init = true;
 self.settings.id('eagle_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 eagle_id = self.settings.id();
 nature.themes.store('eagle');
 nature.apply('new');
 utils_int.draw_eagle();
 utils_int.init_trace_keys();
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 colony = cosmos.hub.access('colony');
 ui_controls = matrix.get('ui_controls');
 swarm = matrix.get('swarm');
 owl = matrix.get('owl');
 morpheus = matrix.get('morpheus');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_visible = false,
 eagle_id = null,
 picked_app = null,
 picked_window = 0,
 scroll_multiplier = 1,
 cosmos = null,
 matrix = null,
 ui_controls = null,
 swarm = null,
 colony = null,
 morpheus = null,
 owl = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 trace_keys = new trace_keys_model(),
 utils_int = new utilities();
 this.status = new status();
 this.settings = new settings();
}
function tik_tok()
{
 var self = this;
 function time_date_model()
 {
 var me = this;
 var __today = null,
 __hour = null,
 __min = null,
 __sec = null,
 __day = null,
 __month = null,
 __year = null,
 __time_container_id = null,
 __date_container_id = null;
 function count_time()
 {
 __today = new Date();
 setTimeout(function()
 {
 count_time();
 me.get_time(__time_container_id);
 me.get_date(__date_container_id);
 me.get_time_date(__time_container_id, __date_container_id);
 }, 1000);
 return true;
 }
 function fix_time(n)
 {
 if (!utils_sys.validation.numerics.is_integer(n))
 return false;
 if (n < 10)
 n = '0' + n;
 return n;
 }
 function fix_date(n)
 {
 if (!utils_sys.validation.numerics.is_integer(n))
 return false;
 if (n < 10)
 n = '0' + n;
 return n;
 }
 this.get_time = function(container_id)
 {
 if (utils_sys.validation.misc.is_object(container_id) || utils_sys.validation.alpha.is_symbol(container_id))
 return false;
 __hour = __today.getHours();
 __min = __today.getMinutes();
 __sec = __today.getSeconds();
 __hour = fix_time(__hour);
 __min = fix_time(__min);
 __sec = fix_time(__sec);
 if (utils_sys.validation.misc.is_undefined(container_id))
 return __hour + ':' + __min + ':' + __sec;
 __time_container_id = container_id;
 utils_sys.objects.by_id(container_id).innerHTML = __hour + ':' + __min + ':' + __sec;
 return true;
 };
 this.get_date = function(container_id)
 {
 if (utils_sys.validation.misc.is_object(container_id) || utils_sys.validation.alpha.is_symbol(container_id))
 return false;
 __day = fix_date(__today.getDate());
 __month = fix_date(__today.getMonth() + 1);
 __year = __today.getFullYear();
 if (utils_sys.validation.misc.is_undefined(container_id))
 return __day + '/' + __month + '/' + __year;
 __date_container_id = container_id;
 utils_sys.objects.by_id(container_id).innerHTML = __day + '/' + __month + '/' + __year;
 return true;
 };
 this.get_time_date = function(time_container_id, date_container_id)
 {
 if (utils_sys.validation.misc.is_object(time_container_id) || utils_sys.validation.alpha.is_symbol(time_container_id) ||
 utils_sys.validation.misc.is_object(date_container_id) || utils_sys.validation.alpha.is_symbol(date_container_id))
 return false;
 __hour = __today.getHours();
 __min = __today.getMinutes();
 __sec = __today.getSeconds();
 __hour = fix_time(__hour);
 __min = fix_time(__min);
 __sec = fix_time(__sec);
 __day = fix_date(__today.getDate());
 __month = fix_date(__today.getMonth() + 1);
 __year = __today.getFullYear();
 if (utils_sys.validation.misc.is_undefined(time_container_id) && utils_sys.validation.misc.is_undefined(date_container_id))
 return __hour + ':' + __min + ':' + __sec + ' ' + __day + '/' + __month + '/' + __year;
 var __dynamic_time_content = utils_sys.objects.by_id(time_container_id),
 __dynamic_date_content = utils_sys.objects.by_id(date_container_id);
 __time_container_id = time_container_id;
 __date_container_id = date_container_id;
 __dynamic_time_content.innerHTML = __hour + ':' + __min + ':' + __sec;
 __dynamic_date_content.innerHTML = __day + '/' + __month + '/' + __year;
 return true;
 };
 count_time();
 }
 function utilities()
 {
 this.draw = function()
 {
 var __dynamic_object = null,
 __tik_tok_id = self.settings.id(),
 __container = utils_sys.objects.by_id(self.settings.container());
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', __tik_tok_id);
 __dynamic_object.setAttribute('class', 'tik_tok');
 __dynamic_object.setAttribute('title', 'Time & calendar');
 __dynamic_object.innerHTML = `<div id="` + __tik_tok_id + `_date" class="clock_date"></div>
 <div id="` + __tik_tok_id + `_time" class="clock_time"></div>`;
 __dynamic_object.style.display = 'block';
 __container.appendChild(__dynamic_object);
 clock.get_time_date(__tik_tok_id + '_time', __tik_tok_id + '_date');
 return true;
 };
 }
 function status()
 {
 this.time = function()
 {
 if (is_init === false)
 return false;
 return clock.get_time();
 };
 this.date = function()
 {
 if (is_init === false)
 return false;
 return clock.get_date();
 };
 this.time_date = function()
 {
 if (is_init === false)
 return false;
 return clock.get_time_date();
 };
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) ||
 utils_sys.validation.alpha.is_symbol(container_id) ||
 utils_sys.objects.by_id(container_id) === null)
 return false;
 is_init = true;
 self.settings.id('tik_tok_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 nature.themes.store('tik_tok');
 nature.apply('new');
 clock = new time_date_model();
 utils_int.draw();
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 cosmos = null,
 clock = null,
 matrix = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 utils_int = new utilities();
 this.status = new status();
 this.settings = new settings();
}
function meta_program_config()
{
 var self = this;
 function utilities()
 {
 this.parse = function(program_config)
 {
 var meta_script = program_config.script;
 if (meta_script.indexOf('navigator') >= 0 || meta_script.indexOf('window') >= 0 ||
 meta_script.indexOf('document') >= 0 || meta_script.indexOf('location') >= 0 ||
 meta_script.indexOf('alert') >= 0 || meta_script.indexOf('eval') >= 0 ||
 meta_script.indexOf('this') >= 0)
 return false;
 if (program_config.type === 'app')
 {
 console.log(meta_script);
 }
 else
 {
 console.log(meta_script);
 }
 return true;
 };
 }
 this.execute = function(program_config)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(program_config))
 return false;
 if (!config_parser.verify(program_config_model, program_config))
 return false;
 return utils_int.parse(program_config);
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 app_box = cosmos.hub.access('app_box');
 program_config_model = { "arguments" : [
 {
 "key" : { "name" : "type", "optional" : false },
 "value" : { "type" : "string" },
 "choices" : [ "app", "service" ]
 },
 {
 "key" : { "name" : "mode", "optional" : false },
 "value" : { "type" : "string" },
 "choices" : [ "release", "debug" ]
 },
 {
 "key" : { "name" : "script", "optional" : false },
 "value" : { "type" : "*" }
 },
 ]
 };
 return true;
 };
 var cosmos = null,
 matrix = null,
 app_box = null,
 program_config_model = null,
 utils_sys = new vulcan(),
 config_parser = new jap(),
 utils_int = new utilities();
}
function meta_script()
{
 var self = this;
 function config_models()
 {
 this.app = {};
 this.service = {};
 this.notification = {};
 }
 function program_config_model()
 {
 this.model = null;
 this.meta_caller = null;
 this.apps = [];
 this.svcs = [];
 }
 function ms_object_model()
 {
 function os()
 {
 this.info = function()
 {
 return xenon;
 };
 this.date_time = function()
 {
 return tik_tok;
 };
 this.sound = function()
 {
 return parrot;
 };
 this.usb = function()
 {
 return octopus;
 };
 this.timer = function()
 {
 return precise_timer;
 };
 this.tasks = function()
 {
 return owl;
 };
 this.fs = function()
 {
 return teal_fs;
 };
 this.gaming_controllers = function()
 {
 return xgc;
 };
 this.utilities = function()
 {
 return utils_sys;
 };
 this.random = function()
 {
 return random;
 };
 this.net = function()
 {
 return ajax;
 };
 this.remote_comm = function(method, ajax_data, success_cb, failure_cb, default_cb)
 {
 return ajax_factory(method, ajax_data, success_cb, failure_cb, default_cb);
 };
 this.settings_validator = function()
 {
 return config_parser;
 };
 this.run = function(program)
 {
 return (program);
 };
 this.quit = function(program)
 {
 return (program);
 };
 this.reboot = function()
 {
 cc_reload.init();
 return true;
 };
 this.logout = function()
 {
 return user_profile.logout();
 };
 }
 function system()
 {
 function ui()
 {
 this.themes = function()
 {
 return nature;
 };
 this.progress = function()
 {
 return infinity;
 };
 this.message_box = function()
 {
 return msg_win;
 };
 this.work_box = function()
 {
 return work_box;
 };
 }
 function profile()
 {
 this.messages = function()
 {
 return true;
 };
 this.alerts = function()
 {
 return true;
 };
 this.calendar = function()
 {
 return true;
 };
 this.settings = function()
 {
 return true;
 };
 }
 this.apps = function()
 {
 return app_box;
 };
 this.services = function()
 {
 return matrix;
 };
 this.notifications = function(notification_config)
 {
 return true;
 };
 this.ui = new ui();
 this.profile = new profile();
 }
 function interface()
 {
 this.desktops = function()
 {
 return forest;
 };
 this.dock = function()
 {
 return dock;
 };
 this.stack = function()
 {
 return hive;
 };
 this.tray = function()
 {
 return super_tray;
 };
 }
 function program()
 {
 this.expose_api = function(public_calls_array)
 {
 if (!utils_sys.validation.misc.is_array(public_calls_array))
 return false;
 var __public_call = null,
 __public_api_calls_config =
 {
 "program_id" : program_config.model.name,
 "calls" : []
 };
 for (__public_call of public_calls_array)
 {
 __public_api_calls_config.calls.push(__public_call);
 if (!uniplex.expose(__public_api_calls_config))
 return false;
 }
 return true;
 };
 this.list_api = function()
 {
 return uniplex.list();
 };
 this.end_on_app_close = function(choice)
 {
 if (!utils_sys.validation.misc.is_bool(choice))
 return false;
 end_on_app_close = choice;
 return true;
 };
 }
 this.app = function()
 {
 if (is_program_loaded === false)
 return false;
 var me = this;
 function app_api_model()
 {
 var me = this,
 __new_app = null,
 __is_init = false,
 __is_run = false;
 function menu()
 {
 this.open = function(event)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.actions.menu.open(event);
 };
 this.close = function(event)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.actions.menu.close(event);
 };
 }
 function main()
 {
 this.set_title = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.data.window.labels.title(val);
 };
 this.set_content = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.data.window.content(val);
 };
 this.set_status = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.data.window.labels.status_bar(val);
 };
 }
 function casement()
 {
 this.show = function(event, callback)
 {
 if (__new_app === null)
 return false;
 if (utils_sys.validation.misc.is_undefined(event))
 event = null;
 return __new_app.gui.actions.casement.deploy(event, callback);
 };
 this.hide = function(event, callback)
 {
 if (__new_app === null)
 return false;
 if (utils_sys.validation.misc.is_undefined(event))
 event = null;
 return __new_app.gui.actions.casement.retract(event, callback);
 };
 this.toggle = function(event, callback)
 {
 if (__new_app === null)
 return false;
 if (utils_sys.validation.misc.is_undefined(event))
 event = null;
 me.casement.hide(event, callback);
 me.casement.show(event, callback);
 return true;
 };
 this.set_title = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.data.casement.labels.title(val);
 };
 this.set_content = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.data.casement.content(val);
 };
 this.set_status = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.data.casement.labels.status(val);
 };
 }
 function position()
 {
 this.set_topmost = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.actions.set_top();
 };
 this.left = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.position.left(val);
 };
 this.top = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.position.top(val);
 };
 }
 function size()
 {
 function min()
 {
 this.width = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.size.min.width(val);
 };
 this.height = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.size.min.height(val);
 };
 }
 function max()
 {
 this.width = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.size.max.width(val);
 };
 this.height = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.size.max.height(val);
 };
 }
 this.width = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.size.width(val);
 };
 this.height = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.size.height(val);
 };
 this.min = new min();
 this.max = new max();
 }
 function fx()
 {
 function enabled()
 {
 function fade()
 {
 this.into = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.into(val);
 };
 this.out = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.out(val);
 };
 }
 this.all = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.enabled.all(val);
 };
 this.opacity = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.enabled.opacity(val);
 };
 this.fade = new fade();
 }
 function opacity()
 {
 function settings()
 {
 this.get = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.opacity.settings.get();
 };
 this.set = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.opacity.settings.set(val);
 };
 }
 this.apply = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.opacity.apply();
 };
 this.reset = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.opacity.reset();
 };
 this.settings = new settings();
 }
 function fade()
 {
 function settings()
 {
 this.batch = function(type, step, speed, delay)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.settings.batch(type, step, speed, delay);
 };
 function into()
 {
 function get()
 {
 this.from = function(option, index)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.settings.into.get.from(option, index);
 };
 this.last = function(option)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.settings.into.get.last(option);
 };
 }
 this.set = function(step, speed, delay)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.settings.into.set(step, speed, delay);
 };
 this.get = new get();
 }
 function out()
 {
 function get()
 {
 this.from = function(option, index)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.settings.out.get.from(option, index);
 };
 this.last = function(option)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.settings.out.get.last(option);
 };
 }
 this.set = function(step, speed, delay)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.settings.out.set(step, speed, delay);
 };
 this.get = new get();
 }
 this.into = new into();
 this.out = new out();
 }
 this.batch = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.batch();
 };
 this.into = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.into();
 };
 this.out = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.fx.fade.out();
 };
 this.settings = new settings();
 }
 this.enabled = new enabled();
 this.opacity = new opacity();
 this.fade = new fade();
 }
 function css()
 {
 function style()
 {
 this.get = function(context, sub_context, option)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.css.style.get(context, sub_context, option);
 };
 this.set = function(context, sub_context, option, val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.css.style.set(context, sub_context, option, val);
 };
 }
 function class_name()
 {
 this.get = function(context, sub_context)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.css.style.get(context, sub_context);
 };
 this.set = function(context, sub_context, val)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.css.style.set(context, sub_context, val);
 };
 }
 this.style = new style();
 this.class_name = new class_name();
 }
 function can()
 {
 this.open = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.actions.can_open(val);
 };
 this.close = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.actions.can_close(val);
 };
 this.edit_title = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.actions.can_edit_title(val);
 };
 this.use_menu = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.actions.can_use_menu(val);
 };
 this.use_casement = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.actions.can_use_casement(val);
 };
 this.drag = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.actions.can_drag.enabled(val);
 };
 this.resize = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.actions.can_resize.enabled(val);
 };
 }
 function status()
 {
 function mouse()
 {
 this.event = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mouse_clicked();
 };
 this.click = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mouseclick();
 };
 this.dblclick = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mousedblclick();
 };
 this.down = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mousedown();
 };
 this.up = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mouseup();
 };
 this.move = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mousemove();
 };
 this.over = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mouseover();
 };
 this.out = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.mouseout();
 };
 }
 function keyboard()
 {
 this.event = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.key_pressed();
 };
 this.press = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.keypress();
 };
 this.down = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.keydown();
 };
 this.up = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.keyup();
 };
 }
 this.running = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.system.running();
 };
 this.opened = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.opened();
 };
 this.closed = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.closed();
 };
 this.dragged = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.dragged();
 };
 this.resized = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.resized();
 };
 this.topmost = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.topmost();
 };
 this.menu_activated = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.menu_activated();
 };
 this.casement_deployed = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.gui.casement_deployed();
 };
 this.focused = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.system.active();
 };
 this.in_stack_bar = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.system.in_hive();
 };
 this.desktop_changed = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.system.desktop_changed();
 };
 this.content_updated = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.data.content_changed();
 };
 this.title_updated = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.data.labels.title_changed();
 };
 this.status_updated = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.status.data.labels.status_bar_label_changed();
 };
 this.mouse = new mouse();
 this.keyboard = new keyboard();
 }
 function settings()
 {
 this.single_instance = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.single_instance(val);
 };
 this.icon = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.icon(val);
 };
 this.resizable = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.resizable(val);
 };
 this.casement_width = function(val, type = 'relative')
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.casement_width(val, type);
 };
 this.status_bar_marquee = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.status_bar_marquee(val);
 };
 this.use_resize_tooltip = function(val)
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.resize_tooltip(val);
 };
 }
 this.get_app_id = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.app_id();
 };
 this.get_system_id = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.id();
 };
 this.get_desktop_id = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.settings.general.desktop_id();
 };
 this.get_last_error = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.error.last();
 };
 this.get_error_codes = function()
 {
 if (__new_app === null)
 return false;
 return __new_app.error.codes;
 };
 this.get_keys = function(event)
 {
 if (__new_app === null)
 return false;
 return __new_app.gui.actions.keys.get(event);
 };
 this.close = function(event)
 {
 if (__new_app === null)
 return false;
 __is_run = false;
 return __new_app.gui.actions.close(event);
 };
 this.on = function(event_name, callback)
 {
 if (__new_app === null)
 return false;
 return __new_app.on(event_name, callback);
 };
 this.object = function()
 {
 if (__new_app === null)
 return false;
 return __new_app;
 };
 this.reflection = function()
 {
 if (__new_app === null)
 return false;
 return program_config.meta_caller.source();
 };
 this.run = function(child_apps_array = [], headless = false)
 {
 if (__new_app === null || __is_run === true)
 return false;
 if (!app_box.replace([program_config.model]))
 return false;
 var __result = __new_app.run(child_apps_array, headless);
 if (__result === true)
 __is_run = true;
 var __data = {
 "ms_id" : program_config.model.name,
 "app_id" : me.get_system_id(),
 "name" : me.get_app_id(),
 "icon" : me.settings.icon(),
 "type" : "app",
 "error" : __new_app.error.last()
 };
 program_config.meta_caller.telemetry(__data);
 me.on('close', function()
 {
 app_box.remove(program_config.model.name);
 uniplex.clear(program_config.model.name);
 if (end_on_app_close)
 program_config.meta_caller.reset();
 end_on_app_close = true;
 });
 return __result;
 };
 this.init = function(app_id, icon)
 {
 if (__is_init === true)
 return false;
 __new_app = dev_box.get('bee');
 __result = __new_app.init(app_id, icon);
 if (__result === true)
 __is_init = true;
 return __result;
 };
 this.menu = new menu();
 this.main = new main();
 this.casement = new casement();
 this.position = new position();
 this.size = new size();
 this.fx = new fx();
 this.css = new css();
 this.can = new can();
 this.status = new status();
 this.settings = new settings();
 }
 global_app_index++;
 program_config.apps.push(new app_api_model());
 return program_config.apps[global_app_index];
 }
 this.service = function()
 {
 if (is_program_loaded === false)
 return false;
 function svc_api_model()
 {
 var me = this,
 __new_svc = null,
 __is_init = false,
 __is_run = false;
 this.config = function()
 {
 if (__new_svc === null)
 return false;
 return __new_svc.config();
 };
 this.set = function(func_name, body)
 {
 if (__new_svc === null)
 return false;
 return __new_svc.set_function(func_name, body);
 };
 this.execute = function(func_name, func_args = [])
 {
 if (__new_svc === null)
 return false;
 return __new_svc.exec_function(func_name, func_args);
 };
 this.on = function(event_name, callback)
 {
 if (__new_svc === null)
 return false;
 return __new_svc.on(event_name, callback);
 };
 this.reflection = function()
 {
 if (__new_svc === null)
 return false;
 return program_config.meta_caller.source();
 };
 this.terminate = function()
 {
 if (__new_svc === null)
 return false;
 __is_run = false;
 return __new_svc.unregister();
 };
 this.run = function(action)
 {
 if (__new_svc === null || __is_run === true)
 return false;
 if (!svc_box.replace([program_config.model]))
 return false;
 var __result = __new_svc.register(action);
 if (__result === true)
 __is_run = true;
 var __svc_config = me.config(),
 __data = {
 "ms_id" : program_config.model.name,
 "svc_id" : __svc_config.sys_name,
 "name" : __svc_config.name,
 "icon" : __svc_config.icon,
 "type" : "svc",
 "error" : null
 };
 program_config.meta_caller.telemetry(__data);
 me.on('register', function() { });
 me.on('unregister', function()
 {
 uniplex.clear(program_config.model.name);
 svc_box.remove(program_config.model.name);
 });
 return __result;
 };
 this.init = function(svc_id, icon = 'svc_default', in_super_tray = true)
 {
 if (__is_init === true)
 return false;
 __new_svc = dev_box.get('bat');
 var __result = __new_svc.init(svc_id, icon, in_super_tray);
 if (__result === true)
 __is_init = true;
 return __result;
 };
 }
 global_svc_index++
 program_config.svcs.push(new svc_api_model());
 return program_config.svcs[global_svc_index];
 };
 this.os = new os();
 this.system = new system();
 this.interface = new interface();
 this.program = new program();
 }
 this.start = function(program_model, meta_caller)
 {
 if (!utils_sys.validation.misc.is_function(program_model) ||
 !utils_sys.validation.misc.is_object(meta_caller))
 return false;
 program_config.model = program_model;
 program_config.meta_caller = meta_caller;
 program_config.apps = [];
 program_config.svcs = [];
 global_app_index = -1;
 global_svc_index = -1;
 is_program_loaded = true;
 return true;
 };
 this.end = function()
 {
 if (is_program_loaded === false)
 return false;
 var i = 0,
 __apps_num = program_config.apps.length,
 __svcs_num = program_config.svcs.length;
 for (i = 0; i < __apps_num; i++)
 program_config.apps[i].close(null);
 for (i = 0; i < __svcs_num; i++)
 program_config.svcs[i].terminate();
 is_program_loaded = false;
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 app_box = cosmos.hub.access('app_box');
 svc_box = cosmos.hub.access('svc_box');
 dev_box = cosmos.hub.access('dev_box');
 xenon = matrix.get('xenon');
 swarm = matrix.get('swarm');
 hive = matrix.get('hive');
 forest = matrix.get('forest');
 dock = matrix.get('dock');
 user_profile = matrix.get('user_profile');
 nature = matrix.get('nature');
 tik_tok = matrix.get('tik_tok');
 parrot = matrix.get('parrot');
 octopus = matrix.get('octopus');
 super_tray = matrix.get('super_tray');
 owl = matrix.get('owl');
 xgc = matrix.get('xgc');
 uniplex = matrix.get('uniplex');
 teal_fs = matrix.get('teal_fs');
 infinity = dev_box.get('infinity');
 return true;
 };
 var is_program_loaded = false,
 end_on_app_close = true,
 global_app_index = -1,
 global_svc_index = -1,
 cosmos = null,
 matrix = null,
 app_box = null,
 svc_box = null,
 dev_box = null,
 xenon = null,
 swarm = null,
 hive = null,
 forest = null,
 dock = null,
 user_profile = null,
 nature = null,
 tik_tok = null,
 parrot = null,
 octopus = null,
 super_tray = null,
 owl = null,
 xgc = null,
 uniplex = null,
 teal_fs = null,
 infinity = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 msg_win = new msgbox(),
 precise_timer = new stopwatch(),
 config_parser = new jap(),
 ajax = new taurus(),
 work_box = new workbox(),
 cc_reload = new f5(),
 config_models = new config_models(),
 program_config = new program_config_model();
 this.ms_object = new ms_object_model();
}
function meta_executor()
{
 var self = this;
 function error_details_model()
 {
 this.code = 0;
 this.message = null;
 }
 function error()
 {
 function codes()
 {
 this.INVALID_CODE = 0xC1;
 this.RUN_FAIL = 0xC2;
 this.RUN_BLOCK = 0xC3
 this.ERROR = 0xC4;
 }
 function last()
 {
 this.code = function()
 {
 return error_details.code;
 };
 this.message = function()
 {
 return error_details.message;
 };
 }
 this.codes = new codes();
 this.last = new last();
 }
 this.load = function(new_program)
 {
 if (is_program_loaded === true)
 return false;
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_nothing(new_program) || !utils_sys.validation.alpha.is_string(new_program))
 return false;
 program = '"use strict";\r\n' + new_program.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,'').trim();
 is_program_loaded = true;
 return true;
 };
 this.process = function(meta_caller)
 {
 if (is_program_loaded === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(meta_caller) || !utils_sys.validation.misc.is_object(meta_caller))
 return false;
 if (!meta_caller.hasOwnProperty('telemetry') || !meta_caller.hasOwnProperty('source') || !meta_caller.hasOwnProperty('reset'))
 return false;
 if (program.indexOf('navigator') >= 0 || program.indexOf('window') >= 0 ||
 program.indexOf('document') >= 0 || program.indexOf('location') >= 0 ||
 program.indexOf('alert') >= 0 || program.indexOf('eval') >= 0 ||
 program.indexOf('this') >= 0)
 {
 error_details.code = self.error.codes.INVALID_CODE;
 error_details.message = 'Invalid keywords detected!\n\n' +
 'The following are not allowed:\n' +
 '{ "navigator", "window", "document", "location", "alert", "eval", "this" }\n';
 return error_details.code;
 }
 var __dynamic_program_model = null,
 __random_program_id = null,
 __this_program = null,
 __run_result = null;
 __random_program_id = 'meta_program_' + random.generate();
 __dynamic_program_model = new Function('return function ' + __random_program_id + '()\
 {\
 this.cosmos = (cosmos_object) => { return true; };\
 this.main = (meta_script) => { return eval(program); };\
 }')();
 try
 {
 __this_program = eval('new ' + __dynamic_program_model);
 if (!meta_script.start(__dynamic_program_model, meta_caller))
 return false;
 __run_result = __this_program.main(meta_script.ms_object);
 if (!__run_result)
 {
 if (__run_result === null)
 {
 error_details.code = self.error.codes.RUN_BLOCK;
 error_details.message = 'Program is blocked by another instance!';
 }
 else
 {
 error_details.code = self.error.codes.RUN_FAIL;
 error_details.message = 'Program is incomplete or misconfigured!';
 }
 return error_details.code;
 }
 }
 catch(e)
 {
 self.terminate();
 error_details.code = self.error.codes.ERROR;
 error_details.message = e;
 return error_details.code;
 }
 return true;
 };
 this.terminate = function()
 {
 if (is_program_loaded === false)
 return false;
 program = null;
 is_program_loaded = false;
 return meta_script.end();
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 dev_box = cosmos.hub.access('dev_box');
 meta_script = dev_box.get('meta_script');
 return true;
 };
 var is_program_loaded = false,
 cosmos = null,
 dev_box = null,
 meta_script = null,
 program = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 error_details = new error_details_model();
 this.error = new error();
}
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
 if (context_id === 'key' || context_id === 'mouse' || context_id === 'touch')
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
function x_runner()
{
 var self = this;
 function x_meta_caller()
 {
 var __id = null;
 this.telemetry = function(data)
 {
 if (data.type === 'app')
 x_reference = colony.get(data.app_id);
 else
 x_reference = roost.get(data.name);
 __id = data.name;
 };
 this.source = function()
 {
 };
 this.reset = function()
 {
 };
 this.program_id = function()
 {
 return __id;
 };
 }
 function utilities()
 {
 var me = this;
 function check_system_run_limits(is_meta_program = false)
 {
 var __apps_num = colony.num(),
 __max_apps = colony.max(),
 __svcs_num = roost.num(),
 __max_svcs = roost.max();
 if (is_meta_program)
 {
 __apps_num++;
 __svcs_num++;
 }
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 if (__apps_num >= __max_apps)
 __msg_win.show(xenon.load('os_name'), 'Maximum apps for this session reached! Please quit a few apps in order to run new ones.');
 else if (__svcs_num >= __max_svcs)
 __msg_win.show(xenon.load('os_name'), 'Maximum services for this session reached! Please stop a few services to use others.');
 else
 return false;
 return true;
 }
 function check_single_instance_app(id)
 {
 if (owl.status.applications.get.by_proc_id(id, 'RUN') && colony.is_single_instance(id))
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(xenon.load('os_name'), 'This is a single instance app!');
 return true;
 }
 return false;
 }
 function check_app_errors(app)
 {
 var __bee = app.base(),
 __app_error = app.error(),
 __msg_win = new msgbox();
 swarm.bees.remove(__bee);
 __msg_win.init('desktop');
 if (__app_error.last() === __app_error.codes.POSITION ||
 __app_error.last() === __app_error.codes.SIZE)
 __msg_win.show(xenon.load('os_name'), 'The app is overflowing your screen. You need a larger screen or higher resolution to run it!');
 else if (__app_error.last() === __app_error.codes.INSTANCE_NUM_LIMIT)
 __msg_win.show(xenon.load('os_name'), 'The app reached its configured instances limit!');
 return true;
 }
 function general_error()
 {
 var __msg_win = new msgbox();
 __msg_win.show(xenon.load('os_name'), 'A general program error occurred!');
 return true;
 }
 function execute_meta_program(mode, x_id)
 {
 var __settings = null,
 __phtml = null,
 __code = null,
 __ajax_config = null;
 __ajax_config = {
 "type" : "request",
 "method" : "post",
 "url" : "/",
 "data" : "gate=meta_programs&action=load_ms_settings&x_id=" + x_id,
 "ajax_mode" : "synchronous"
 },
 __settings = ajax.run(__ajax_config);
 __ajax_config = {
 "type" : "request",
 "method" : "post",
 "url" : "/",
 "data" : "gate=meta_programs&action=load_ms_phtml&x_id=" + x_id,
 "ajax_mode" : "synchronous"
 },
 __phtml = ajax.run(__ajax_config);
 __ajax_config = {
 "type" : "request",
 "method" : "post",
 "url" : "/",
 "data" : "gate=meta_programs&action=load_ms_code&mode=" + mode + "&x_id=" + x_id,
 "ajax_mode" : "synchronous"
 };
 __code = ajax.run(__ajax_config);
 meta_executor = dev_box.get('meta_executor');
 if (!meta_executor.load(__code))
 {
 frog('X-RUNNER', '% Empty %', 'No code detected!');
 return false;
 }
 if (meta_executor.process(x_mc) !== true)
 {
 if (!check_system_run_limits(true))
 {
 if (mode === 'app')
 {
 if (!check_single_instance_app(x_mc.program_id()))
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 if (meta_executor.error.last.code() === meta_executor.error.codes.INVALID_CODE)
 {
 __msg_win.show(xenon.load('os_name'), 'The is not a valid application!');
 frog('X-RUNNER', '# Invalid Code #', meta_executor.error.last.message());
 }
 else if (meta_executor.error.last.code() === meta_executor.error.codes.RUN_FAIL)
 {
 __msg_win.show(xenon.load('os_name'), 'The application is misconfigured!');
 frog('X-RUNNER', '[*] Run Fail [*]', meta_executor.error.last.message());
 }
 else if (meta_executor.error.last.code() === meta_executor.error.codes.ERROR)
 {
 __msg_win.show(xenon.load('os_name'), 'The application has errors!');
 frog('X-RUNNER', '[!] Error [!]', meta_executor.error.last.message());
 }
 }
 else
 nature.themes.clear(x_mc.program_id());
 }
 }
 x_reference = null;
 return meta_executor.terminate();
 }
 utils_int.set_dock_icon_status(x_id);
 if (mode === 'app')
 utils_int.app_close_callback(x_reference, x_id, false);
 is_x_running = true;
 return x_reference;
 }
 function app()
 {
 this.start = function(app_id, is_sys_level)
 {
 if (is_sys_level)
 {
 if (check_single_instance_app(app_id))
 return false;
 var __app = app_box.get(app_id),
 __bee = null;
 if (!__app.init())
 {
 general_error();
 return false;
 }
 __bee = __app.base();
 if (__app.run())
 {
 me.set_dock_icon_status(app_id)
 me.app_close_callback(__app, app_id, true);
 x_program = __app;
 is_x_running = true;
 return __app;
 }
 else
 {
 if (!check_system_run_limits())
 check_app_errors(__app);
 return false;
 }
 }
 return execute_meta_program('app', app_id);
 };
 this.stop = function(is_sys_level)
 {
 if (is_sys_level)
 return x_program.quit();
 else
 return meta_executor.terminate();
 };
 }
 function svc()
 {
 this.start = function(service_id, is_sys_level)
 {
 if (is_sys_level)
 {
 var __svc = svc_box.get(service_id),
 __bat = null;
 __svc.init();
 if (!__svc.init())
 {
 general_error();
 return false;
 }
 __bat = __svc.base();
 if (__bat.run())
 {
 if (check_system_run_limits())
 return false;
 x_program = __bat;
 is_x_running = true;
 return __bat;
 }
 return false;
 }
 is_x_running = true;
 return execute_meta_program('svc', service_id);
 };
 this.stop = function(is_sys_level)
 {
 if (is_sys_level)
 return x_program.terminate();
 else
 return meta_executor.terminate();
 };
 }
 this.set_dock_icon_status = function(app_id, reverse = false)
 {
 var __dock_app_object = utils_sys.objects.by_id('app_' + app_id),
 __icon_id = null;
 if (!__dock_app_object)
 return false;
 __icon_id = __dock_app_object.getAttribute('data-icon');
 if (reverse)
 __dock_app_object.classList.remove(__icon_id + '_on');
 else
 __dock_app_object.classList.add(__icon_id + '_on');
 return true;
 };
 this.app_close_callback = function(app, process_id, is_sys_level)
 {
 app.on('closed', function()
 {
 if (is_sys_level)
 {
 if (owl.status.applications.get.by_proc_id(process_id, 'RUN'))
 return;
 }
 else
 {
 if (owl.status.applications.get.by_proc_id(app.settings.general.app_id(), 'RUN'))
 return;
 }
 me.set_dock_icon_status(process_id, true);
 });
 return true;
 };
 this.check_arguments = function(mode, id, system)
 {
 if (utils_sys.validation.misc.is_undefined(mode) || utils_sys.validation.misc.is_nothing(id))
 return false;
 if (!utils_sys.misc.contains(mode, modes_list))
 return false;
 if (!utils_sys.validation.misc.is_bool(system))
 return false;
 return true;
 };
 this.app = new app();
 this.svc = new svc();
 }
 this.start = function(mode, id, is_sys_level)
 {
 if (!utils_int.check_arguments(mode, id, is_sys_level))
 return false;
 x_mode = mode;
 return utils_int[mode].start(id, is_sys_level);
 };
 this.stop = function()
 {
 if (!is_x_running)
 return false;
 is_x_running = false;
 x_reference = null;
 return utils_int[x_mode].stop();
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 app_box = cosmos.hub.access('app_box');
 svc_box = cosmos.hub.access('svc_box');
 dev_box = cosmos.hub.access('dev_box');
 colony = cosmos.hub.access('colony');
 roost = cosmos.hub.access('roost');
 xenon = matrix.get('xenon');
 swarm = matrix.get('swarm');
 owl = matrix.get('owl');
 nature = matrix.get('nature');
 return true;
 };
 var is_x_running = false,
 x_mode = null,
 x_program = null,
 x_reference = null,
 cosmos = null,
 matrix = null,
 app_box = null,
 svc_box = null,
 dev_box = null,
 colony = null,
 roost = null,
 xenon = null,
 swarm = null,
 owl = null,
 nature = null,
 meta_executor = null,
 modes_list = ['app', 'svc'],
 utils_sys = new vulcan(),
 ajax = new taurus(),
 x_mc = new x_meta_caller(),
 utils_int = new utilities();
}
function panda()
{
 var self = this;
 function utilities()
 {
 this.is_existing_app_or_svc = function(object)
 {
 var i = 0,
 __svcs_num = matrix.num(),
 __apps_num = app_box.num();
 for (i = 0; i < __svcs_num; i++)
 {
 if (matrix.list(i) === object)
 return true;
 }
 for (i = 0; i < __apps_num; i++)
 {
 if (app_box.list(i) === object)
 return true;
 }
 return false;
 };
 }
 this.action = function(object, action_config)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (!utils_sys.validation.misc.is_object(object) ||
 utils_sys.validation.misc.is_undefined(action_config))
 return false;
 if (!utils_int.is_existing_app_or_svc(object))
 return false;
 if (!config_parser.verify(action_config_model, action_config))
 return false;
 return action_config.config.call();
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 app_box = cosmos.hub.access('app_box');
 action_config_model = { "arguments" : [
 {
 "key" : { "name" : "config", "optional" : false },
 "value" : { "type" : "*" }
 }
 ]
 };
 return true;
 };
 var cosmos = null,
 action_config_model = null,
 matrix = null,
 app_box = null,
 utils_sys = new vulcan(),
 config_parser = new jap(),
 utils_int = new utilities();
}
function octopus()
{
 var self = this;
 function devices_model()
 {
 function input_model()
 {
 this.audio = [];
 this.video = [];
 }
 function output_model()
 {
 this.audio = [];
 this.video = [];
 }
 this.num = 0;
 this.all = [];
 this.input = new input_model();
 this.output = new output_model();
 }
 function utilities()
 {
 var me = this;
 function show_notification(status)
 {
 var __notification_object = utils_sys.objects.by_id(octopus_id + '_notification'),
 __notification_msg_object = utils_sys.objects.by_id(octopus_id + '_message'),
 __sys_theme = chameleon.get();
 __notification_msg_object.innerHTML = 'Device: ' + status + '!';
 __notification_object.style.display = 'block';
 parrot.play('action', '/site/themes/' + __sys_theme + '/sounds/pong.wav');
 setTimeout(function()
 {
 __notification_object.style.display = 'none';
 }, 5000);
 return true;
 }
 function scan_new_devices(devices)
 {
 var __device = null,
 __status = null,
 __device_exists = false;
 for (__device in devices)
 {
 for (var i = 0; i < usb_devices.num; i++)
 {
 if (__device.label === usb_devices.all[i])
 {
 __device_exists = true;
 break;
 }
 }
 if (__device_exists === false)
 {
 var [kind, type, direction] = device.kind.match(/(\w+)(input|output)/i);
 usb_devices.all.push(device.label);
 usb_devices[direction][type].push(device.label);
 usb_devices.num++;
 if (usb_devices.num === devices.length)
 __status = 'Connected';
 else
 __status = 'Disconnected';
 show_notification(__status);
 return true;
 }
 }
 return false;
 }
 function device_manager()
 {
 navigator.mediaDevices.enumerateDevices()
 .then(function(devices)
 {
 scan_new_devices(devices)
 })
 .catch(function(error)
 {
 });
 return true;
 }
 this.load_ui = function()
 {
 nature.themes.store('octopus');
 nature.apply('new');
 if (me.start_component())
 return me.draw();
 else
 return false;
 };
 this.start_component = function()
 {
 if (is_component_active === true)
 return false;
 var __constraints =
 {
 video:
 {
 width: 1920,
 height: 1080,
 frameRate: 30,
 },
 audio:
 {
 sampleRate: 44100,
 sampleSize: 16,
 volume: 0.30,
 }
 };
 if (!navigator.mediaDevices)
 return false;
 navigator.mediaDevices.ondevicechange = function() { device_manager(); };
 is_component_active = true;
 return true;
 };
 this.draw = function()
 {
 if (is_component_active === false)
 return false;
 var __dynamic_object = null,
 __container = utils_sys.objects.by_id(self.settings.container());
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', octopus_id);
 __dynamic_object.setAttribute('class', 'octopus');
 __dynamic_object.setAttribute('title', 'Manage devices');
 __dynamic_object.innerHTML += `<div id="` + octopus_id + `_manager" class="device"></div>
 <div id="` + octopus_id + `_notification" class="notification">
 <div id="` + octopus_id + `_icon" class="icon"></div>
 <div id="` + octopus_id + `_message" class="message"></div>
 </div>`;
 __container.appendChild(__dynamic_object);
 return true;
 };
 }
 function devices()
 {
 function io_model()
 {
 this.inputs = function(device_id)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(device_id))
 return false;
 return usb_devices.inputs;
 };
 this.outputs = function(device_id)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(device_id))
 return false;
 return usb_devices.outputs;
 };
 }
 this.list = function(device_id)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(device_id))
 return false;
 return usb_devices.all;
 };
 this.io = new io_model();
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 self.settings.id('octopus_' + random.generate());
 octopus_id = self.settings.id();
 if (utils_sys.validation.misc.is_undefined(container_id))
 return utils_int.start_component();
 else
 {
 if (!self.settings.container(container_id))
 return false;
 return utils_int.load_ui();
 }
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 parrot = matrix.get('parrot');
 chameleon = matrix.get('chameleon');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_component_active = false,
 octopus_id = null,
 cosmos = null,
 matrix = null,
 parrot = null,
 chameleon = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 usb_devices = new devices_model(),
 utils_int = new utilities();
 this.devices = new devices();
 this.settings = new settings();
}
function super_tray()
{
 var self = this;
 function tray_service_model()
 {
 this.sys_id = null;
 this.id = null;
 this.name = null;
 this.icon = null;
 this.visible = true;
 this.action = null;
 }
 function tray_services_collection()
 {
 this.num = 0;
 this.list = [];
 }
 function utilities()
 {
 var me = this;
 function hide_tray_area_on_key(event)
 {
 if (utils_sys.validation.misc.is_undefined(event))
 return false;
 key_control.scan(event);
 if (key_control.get() !== key_control.keys.ESCAPE)
 return false;
 me.hide_tray_area();
 return true;
 }
 this.service_exists = function(sys_service_id)
 {
 for (var i = 0; i < tray_services.num; i++)
 {
 if (tray_services.list[i].sys_id === sys_service_id)
 return true;
 }
 return false;
 };
 this.fix_service_icon_names = function(service_id)
 {
 var __unique_entry = 0,
 __count = 1,
 __svc_name = null,
 __icon_object = null;
 for (var i = 0; i < tray_services.num; i++)
 {
 if (tray_services.list[i].id === service_id)
 __unique_entry++;
 }
 for (var i = 0; i < tray_services.num; i++)
 {
 if (tray_services.list[i].id === service_id)
 {
 __svc_name = service_id + ' (' + __count + ')';
 if (tray_services.num === 1 || __unique_entry === 1)
 __svc_name = service_id;
 tray_services.list[i].name = __svc_name;
 __icon_object = utils_sys.objects.by_id(super_tray_id + '_service_' + tray_services.list[i].sys_id);
 __icon_object.setAttribute('title', __svc_name);
 __count++;
 }
 }
 return true;
 };
 this.load_ui = function()
 {
 nature.themes.store('super_tray');
 nature.apply('new');
 me.draw();
 me.attach_events();
 };
 this.draw = function()
 {
 var __container = utils_sys.objects.by_id(self.settings.container()),
 __dynamic_object = null;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', super_tray_id);
 __dynamic_object.setAttribute('class', 'super_tray');
 __dynamic_object.innerHTML = `<div id="` + super_tray_id + `_arrow" class="access_icon" title="Access running services"></div>
 <div id="` + super_tray_id + `_service_icons_tray" class="service_icons_area"></div>`;
 __container.appendChild(__dynamic_object);
 return true;
 };
 this.attach_events = function()
 {
 var __handler = null;
 __handler = function() { me.toggle_tray_area(); };
 morpheus.run(super_tray_id, 'mouse', 'click', __handler, utils_sys.objects.by_id(super_tray_id + '_arrow'));
 __handler = function() { me.hide_tray_area(); };
 morpheus.run(super_tray_id, 'mouse', 'click', __handler, utils_sys.objects.by_id('desktop'));
 morpheus.run(super_tray_id, 'touch', 'touchmove', __handler, utils_sys.objects.by_id('desktop'));
 __handler = function(event) { hide_tray_area_on_key(event); };
 morpheus.run(super_tray_id, 'key', 'keydown', __handler, document);
 return true;
 };
 this.show_tray_area = function()
 {
 var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');
 __service_icons_tray.style.display = 'block';
 is_super_tray_visible = true;
 search.hide();
 return true;
 };
 this.hide_tray_area = function()
 {
 var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');
 __service_icons_tray.style.display = 'none';
 is_super_tray_visible = false;
 return true;
 };
 this.toggle_tray_area = function()
 {
 if (is_super_tray_visible)
 me.hide_tray_area();
 else
 me.show_tray_area();
 return true;
 };
 this.add_service_icon = function(index)
 {
 var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray'),
 __new_service = tray_services.list[index - 1],
 __new_service_id = super_tray_id + '_service_' + __new_service.sys_id,
 __dynamic_object = null;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', __new_service_id);
 __dynamic_object.setAttribute('class', 'super_tray_service');
 __dynamic_object.setAttribute('data-id', __new_service.sys_id);
 __dynamic_object.setAttribute('title', __new_service.name);
 __dynamic_object.classList.add(__new_service.icon);
 __service_icons_tray.appendChild(__dynamic_object);
 if (__new_service.action !== null)
 {
 var __handler = function() { __new_service.action.call(); };
 morpheus.run(super_tray_id + '_service', 'mouse', 'click', __handler, utils_sys.objects.by_id(__new_service_id));
 }
 return true;
 };
 this.remove_service_icon = function(index)
 {
 var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray'),
 __existing_service = tray_services.list[index],
 __dynamic_object = utils_sys.objects.by_id(super_tray_id + '_service_' + __existing_service.sys_id);
 morpheus.delete(super_tray_id + '_service', 'click', __dynamic_object);
 __service_icons_tray.removeChild(__dynamic_object);
 return true;
 };
 this.clear_service_icons = function()
 {
 var __service_icons_tray = utils_sys.objects.by_id(super_tray_id + '_service_icons_tray');
 morpheus.clear(super_tray_id + '_service');
 __service_icons_tray.innerHTML = '';
 return true;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 function status()
 {
 this.num = function()
 {
 if (is_init === false)
 return false;
 return tray_services.num;
 };
 this.list = function()
 {
 if (is_init === false)
 return false;
 return tray_services.list;
 };
 }
 this.add = function(bat_object, visible_in_super_tray = true, action = null)
 {
 if (is_init === false)
 return false;
 if (!utils_sys.validation.misc.is_object(bat_object))
 return false;
 if (action !== null && !utils_sys.validation.misc.is_function(action))
 return false;
 if (!roost.add([bat_object]))
 return false;
 var __service_config = bat_object.config();
 if (utils_int.service_exists(__service_config.sys_name))
 return false;
 var __new_tray_service = new tray_service_model();
 __new_tray_service.sys_id = __service_config.sys_name;
 __new_tray_service.id = __service_config.name;
 __new_tray_service.name = __service_config.name;
 __new_tray_service.icon = __service_config.icon;
 __new_tray_service.visible = visible_in_super_tray;
 if (action !== null)
 __new_tray_service.action = action;
 tray_services.list.push(__new_tray_service);
 tray_services.num++;
 if (visible_in_super_tray)
 {
 utils_int.add_service_icon(tray_services.num);
 utils_int.fix_service_icon_names(__service_config.name);
 }
 return true;
 };
 this.remove = function(sys_service_id)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(sys_service_id))
 return false;
 roost.remove(sys_service_id);
 svc_box.remove(sys_service_id);
 for (var i = 0; i < tray_services.num; i++)
 {
 if (tray_services.list[i].sys_id === sys_service_id)
 {
 var __common_svc_id = tray_services.list[i].id,
 __svc_found = false;
 if (tray_services.list[i].visible)
 {
 for (var j = 0; j < tray_services.num; j++)
 {
 if (tray_services.list[j].id === __common_svc_id)
 {
 __svc_found = true;
 break;
 }
 }
 utils_int.remove_service_icon(i);
 }
 tray_services.list.splice(i, 1);
 tray_services.num--;
 if (__svc_found)
 utils_int.fix_service_icon_names(__common_svc_id);
 return true;
 }
 }
 return false;
 };
 this.clear = function()
 {
 if (is_init === false)
 return false;
 for (var i = 0; i < tray_services.num; i++)
 {
 roost.remove(tray_services.list[i].sys_id);
 svc_box.remove(tray_services.list[i].sys_id);
 }
 tray_services.num = 0;
 tray_services.list = [];
 utils_int.clear_service_icons();
 return true;
 };
 this.show = function()
 {
 if (is_init === false)
 return false;
 return utils_int.show_tray_area();
 };
 this.hide = function()
 {
 if (is_init === false)
 return false;
 return utils_int.hide_tray_area();
 };
 this.toggle = function()
 {
 if (is_init === false)
 return false;
 return utils_int.toggle_tray_area();
 };
 this.id = function()
 {
 if (is_init === false)
 return false;
 return super_tray_id;
 };
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.alpha.is_symbol(container_id))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 self.settings.id('super_tray_' + random.generate());
 if (!self.settings.container(container_id))
 return false;
 super_tray_id = self.settings.id();
 return utils_int.load_ui(container_id);
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 svc_box = cosmos.hub.access('svc_box');
 roost = cosmos.hub.access('roost');
 morpheus = matrix.get('morpheus');
 search = matrix.get('search');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_super_tray_visible = false,
 super_tray_id = null,
 cosmos = null,
 matrix = null,
 svc_box = null,
 roost = null,
 search = null,
 morpheus = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 tray_services = new tray_services_collection(),
 utils_int = new utilities();
 this.status = new status();
 this.settings = new settings();
}
function parrot()
{
 var self = this;
 function audio_component_model()
 {
 var __audio_component_init = false,
 __stream_contexts = ['sys', 'action', 'misc'],
 __sound_files = [],
 __stream_context_in_use = null,
 __play_file = null,
 __audio_stream = null,
 __audio_player = utils_sys.objects.by_id(parrot_id);
 function set_sounds()
 {
 function os_sounds_model()
 {
 this.login = function(sound_file)
 {
 if (__audio_component_init === false)
 return false;
 if (!utils_sys.validation.alpha.is_string(sound_file))
 return false;
 return true;
 };
 this.logout = function(sound_file)
 {
 if (__audio_component_init === false)
 return false;
 if (!utils_sys.validation.alpha.is_string(sound_file))
 return false;
 return true;
 };
 this.click = function(sound_file)
 {
 if (__audio_component_init === false)
 return false;
 if (!utils_sys.validation.alpha.is_string(sound_file))
 return false;
 return true;
 };
 }
 function app_sounds_model()
 {
 this.open = function(sound_file)
 {
 if (__audio_component_init === false)
 return false;
 if (!utils_sys.validation.alpha.is_string(sound_file))
 return false;
 return true;
 };
 this.close = function(sound_file)
 {
 if (__audio_component_init === false)
 return false;
 if (!utils_sys.validation.alpha.is_string(sound_file))
 return false;
 return true;
 };
 }
 this.os = new os_sounds_model();
 this.app = new app_sounds_model();
 }
 this.volume = function(app_id)
 {
 if (__audio_component_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(app_id))
 return false;
 return ;
 };
 this.options = function(app_id)
 {
 if (__audio_component_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(app_id))
 return false;
 return ;
 };
 this.play = function(context, sound_file, list = false, replay = false)
 {
 if (__audio_component_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(context) || utils_sys.validation.alpha.is_symbol(context))
 return false;
 if (__stream_contexts.indexOf(context) === -1)
 return false;
 __stream_context_in_use = context;
 if (context === 'sys')
 __audio_stream = __audio_player.childNodes[0];
 else if (context === 'action')
 __audio_stream = __audio_player.childNodes[2];
 else
 __audio_stream = __audio_player.childNodes[4];
 if (utils_sys.validation.misc.is_undefined(sound_file))
 {
 if (__play_file === null)
 return false;
 if (replay === true)
 __audio_stream.loop = true;
 __audio_stream.src = __play_file;
 }
 else
 {
 if (!utils_sys.validation.alpha.is_string(sound_file))
 return false;
 __play_file = sound_file;
 if (replay === true)
 __audio_stream.loop = true;
 __audio_stream.src = __play_file;
 }
 return true;
 };
 this.pause = function()
 {
 if (__audio_component_init === false)
 return false;
 if (__stream_context_in_use === null)
 return false;
 __audio_stream.pause();
 return true;
 };
 this.stop = function()
 {
 if (__audio_component_init === false)
 return false;
 if (__stream_context_in_use === null)
 return false;
 audio.pause();
 __audio_stream.src = '';
 return true;
 };
 this.clear = function()
 {
 if (__audio_component_init === false)
 return false;
 audio.stop();
 __sound_files = [];
 __play_file = null;
 __audio_stream = null;
 __stream_context_in_use = null;
 return true;
 };
 this.files = function()
 {
 if (__audio_component_init === false)
 return false;
 return __sound_files;
 };
 this.init = function()
 {
 if (__audio_component_init === true)
 return false;
 __audio_component_init = true;
 return true;
 };
 this.set = new set_sounds();
 }
 function utilities()
 {
 var me = this;
 this.load_ui = function()
 {
 nature.themes.store('parrot');
 nature.apply('new');
 me.start_component();
 me.draw();
 };
 this.start_component = function()
 {
 if (is_component_active === true)
 return false;
 var __dynamic_object = null,
 __container = utils_sys.objects.by_id(self.settings.container());
 __container.innerHTML = '';
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', parrot_id);
 __dynamic_object.setAttribute('class', 'parrot');
 __dynamic_object.setAttribute('title', 'Manage system & apps sound');
 __dynamic_object.innerHTML = '<audio id="' + parrot_id + '_audio_component_sys" autoplay></audio>\
 <audio id="' + parrot_id + '_audio_component_actions" autoplay></audio>\
 <audio id="' + parrot_id + '_audio_component_misc" autoplay></audio>';
 __container.appendChild(__dynamic_object);
 audio = new audio_component_model();
 audio.init();
 is_component_active = true;
 return true;
 };
 this.draw = function()
 {
 if (is_component_active === false)
 return false;
 audio.clear();
 var __parrot_div = utils_sys.objects.by_id(parrot_id);
 __parrot_div.innerHTML += '<div id="' + parrot_id + '_speaker" class="speaker"></div>' +
 '<div id="' + parrot_id + '_volume" class="volume">100%</div>';
 __parrot_div.style.display = 'block';
 return true;
 };
 }
 function status()
 {
 this.volume = function(app_id)
 {
 if (is_init === false)
 return false;
 return audio.volume(app_id);
 };
 this.options = function(app_id)
 {
 if (is_init === false)
 return false;
 return audio.options(app_id);
 };
 }
 function settings()
 {
 var __id = null,
 __container = 'audio';
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 }
 this.files = function()
 {
 if (is_init === false)
 return false;
 return audio.files();
 };
 this.options = function()
 {
 if (is_init === false)
 return false;
 return audio.options();
 };
 this.volume = function()
 {
 if (is_init === false)
 return false;
 return audio.volume();
 };
 this.set = function()
 {
 if (is_init === false)
 return false;
 return audio.set();
 };
 this.play = function(context, sound_file, list = false, replay = false)
 {
 if (is_init === false)
 return false;
 return audio.play(context, sound_file, list, replay);
 };
 this.pause = function()
 {
 if (is_init === false)
 return false;
 return audio.pause();
 };
 this.stop = function()
 {
 if (is_init === false)
 return false;
 return audio.stop();
 };
 this.clear = function()
 {
 if (is_init === false)
 return false;
 return audio.clear();
 };
 this.load = function(container_id)
 {
 if (is_init === false)
 return false;
 if (!self.settings.container(container_id))
 return false;
 utils_int.load_ui();
 return true;
 };
 this.init = function(container_id)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 self.settings.id('parrot_' + random.generate());
 parrot_id = self.settings.id();
 if (utils_sys.validation.misc.is_undefined(container_id))
 return utils_int.start_component();
 else
 return self.load(container_id);
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 is_component_active = false,
 parrot_id = null,
 cosmos = null,
 matrix = null,
 nature = null,
 audio = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 utils_int = new utilities();
 this.status = new status();
 this.settings = new settings();
}
function xgc()
{
 var self = this;
 function game_controller_config()
 {
 function gamepad_model()
 {
 this.LB = false;
 this.RB = false;
 this.LT = false;
 this.RT = false;
 this.A = false;
 this.B = false;
 this.X = false;
 this.Y = false;
 this.Start = false;
 this.Back = false;
 this.Left_Stick_Button = false;
 this.Right_Stick_Button = false;
 this.D_Pad_Up = 0;
 this.D_Pad_Down = 0;
 this.D_Pad_Left = 0;
 this.D_Pad_Right = 0;
 this.Left_Joystick_X = 0.0;
 this.Left_Joystick_Y = 0.0;
 this.Right_Joystick_X = 0.0;
 this.Right_Joystick_Y = 0.0;
 }
 function joystick_model()
 {
 this.Button_1 = false;
 this.Button_2 = false;
 this.Button_3 = false;
 this.Button_4 = false;
 this.Button_5 = false;
 this.Button_6 = false;
 this.Button_7 = false;
 this.Button_8 = false;
 this.Button_9 = false;
 this.Button_10 = false;
 this.Button_11 = false;
 this.Button_12 = false;
 this.Button_13 = false;
 this.Button_14 = false;
 this.Button_15 = false;
 this.Button_16 = false;
 this.Button_17 = false;
 this.Button_18 = false;
 this.Button_19 = false;
 this.Button_20 = false;
 this.D_Pad_1_Up = 0;
 this.D_Pad_1_Down = 0;
 this.D_Pad_1_Left = 0;
 this.D_Pad_1_Right = 0;
 this.D_Pad_2_Up = 0;
 this.D_Pad_2_Down = 0;
 this.D_Pad_2_Left = 0;
 this.D_Pad_2_Right = 0;
 this.D_Pad_3_Up = 0;
 this.D_Pad_3_Down = 0;
 this.D_Pad_3_Left = 0;
 this.D_Pad_3_Right = 0;
 this.D_Pad_4_Up = 0;
 this.D_Pad_4_Down = 0;
 this.D_Pad_4_Left = 0;
 this.D_Pad_4_Right = 0;
 this.D_Pad_5_Up = 0;
 this.D_Pad_5_Down = 0;
 this.D_Pad_5_Left = 0;
 this.D_Pad_5_Right = 0;
 this.D_Pad_6_Up = 0;
 this.D_Pad_6_Down = 0;
 this.D_Pad_6_Left = 0;
 this.D_Pad_6_Right = 0;
 this.Switch_1 = 0;
 this.Switch_2 = 0;
 this.Switch_3 = 0;
 this.Switch_4 = 0;
 this.Switch_5 = 0;
 this.Switch_6 = 0;
 this.Switch_7 = 0;
 this.Switch_8 = 0;
 this.Switch_9 = 0;
 this.Switch_10 = 0;
 this.Latch_1 = 0;
 this.Latch_2 = 0;
 this.Latch_3 = 0;
 this.Latch_4 = 0;
 this.Knob_1 = 0.0;
 this.Knob_2 = 0.0;
 this.Throttle_Left = 0;
 this.Throttle_Right = 0;
 this.Throttle_1 = 0;
 this.Throttle_2 = 0;
 this.Joystick_Pitch = 0.0;
 this.Joystick_Roll = 0.0;
 this.Joystick_Yaw = 0.0;
 }
 this.gamepad = new gamepad_model();
 this.joystick = new joystick_model();
 }
 function utilities()
 {
 var me = this;
 this.scan_controller = function(controller_status)
 {
 var __this_xgc = null,
 __controller_type = null;
 is_controller_connected = controller_status;
 scan_interval = setInterval(() =>
 {
 if (!controller_status)
 return false;
 for (__this_xgc of navigator.getGamepads())
 {
 if (!__this_xgc)
 continue;
 __controller_type = __this_xgc.id.toLowerCase().indexOf('gamepad');
 if (__controller_type >= 0)
 {
 xgc_config.gamepad.LB = __this_xgc.buttons[4].pressed;
 xgc_config.gamepad.RB = __this_xgc.buttons[5].pressed;
 xgc_config.gamepad.LT = __this_xgc.buttons[6].pressed;
 xgc_config.gamepad.RT = __this_xgc.buttons[7].pressed;
 xgc_config.gamepad.Back = __this_xgc.buttons[8].pressed;
 xgc_config.gamepad.Start = __this_xgc.buttons[9].pressed;
 xgc_config.gamepad.D_Pad_Up = __this_xgc.buttons[12].pressed;
 xgc_config.gamepad.D_Pad_Down = __this_xgc.buttons[13].pressed;
 xgc_config.gamepad.D_Pad_Left = __this_xgc.buttons[14].pressed;
 xgc_config.gamepad.D_Pad_Right = __this_xgc.buttons[15].pressed;
 xgc_config.gamepad.Left_Stick_Button = __this_xgc.buttons[10].pressed;
 xgc_config.gamepad.Right_Stick_Button = __this_xgc.buttons[11].pressed;
 xgc_config.gamepad.A = __this_xgc.buttons[0].pressed;
 xgc_config.gamepad.B = __this_xgc.buttons[1].pressed;
 xgc_config.gamepad.X = __this_xgc.buttons[2].pressed;
 xgc_config.gamepad.Y = __this_xgc.buttons[3].pressed;
 xgc_config.gamepad.Left_Joystick_X = Math.round(__this_xgc.axes[0] * 100);
 xgc_config.gamepad.Left_Joystick_Y = -Math.round(__this_xgc.axes[1] * 100);
 xgc_config.gamepad.Right_Joystick_X = Math.round(__this_xgc.axes[2] * 100);
 xgc_config.gamepad.Right_Joystick_Y = -Math.round(__this_xgc.axes[3] * 100);
 }
 else
 {
 }
 if (is_log)
 frog('XGC', '[#] Log [#]', xgc_config);
 }
 }, 25);
 return true;
 };
 this.abort_scan_controller = function()
 {
 clearInterval(scan_interval);
 is_controller_connected = false;
 return true;
 };
 }
 this.data = function()
 {
 if (!is_init || !is_controller_connected)
 return false;
 return xgc_config;
 };
 this.init = function(log = false)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(log) || !utils_sys.validation.misc.is_bool(log))
 return false;
 var __handler = null;
 __handler = function(event) { utils_int.scan_controller(event.gamepad.connected); };
 morpheus.run('xgc', 'controller', 'gamepadconnected', __handler);
 __handler = function() { utils_int.abort_scan_controller(); };
 morpheus.run('xgc', 'controller', 'gamepaddisconnected', __handler);
 if (log)
 is_log = true;
 is_init = true;
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 return true;
 };
 var is_init = false,
 is_log = false,
 is_controller_connected = false,
 cosmos = null,
 matrix = null,
 morpheus = null,
 scan_interval = null,
 utils_sys = new vulcan(),
 xgc_config = new game_controller_config(),
 utils_int = new utilities();
}
function infinity()
{
 var self = this;
 function status()
 {
 this.in_progress = function()
 {
 if (is_init === false)
 return false;
 return self.settings.in_progress();
 };
 }
 function settings()
 {
 var __id = null,
 __container = null,
 __in_progress = false;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (!utils_sys.validation.alpha.is_string(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (!utils_sys.validation.alpha.is_string(val))
 return false;
 __container = val;
 return true;
 };
 this.in_progress = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __in_progress;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __in_progress = val;
 return true;
 };
 }
 function utilities()
 {
 var me = this;
 this.draw = function()
 {
 var __dynamic_object = null,
 __infinity_id = self.settings.id(),
 __infinity_object = null,
 __container = utils_sys.objects.by_id(self.settings.container()),
 __top_pos = 0;
 if (utils_sys.validation.misc.is_undefined(__container) || !__container)
 return false;
 __top_pos = (utils_sys.graphics.pixels_value(__container.style.height) / 2) - 25;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', __infinity_id);
 __dynamic_object.setAttribute('class', 'infinity');
 __dynamic_object.innerHTML = '<div class="progress_indicator" ' +
 'style="margin-top: ' + __top_pos + 'px;"></div>';
 __container.appendChild(__dynamic_object);
 __infinity_object = utils_sys.objects.by_id(__infinity_id);
 __infinity_object.style.display = 'block';
 return true;
 };
 this.clear = function()
 {
 var __infinity_id = self.settings.id(),
 __infinity_object = utils_sys.objects.by_id(__infinity_id);
 if (__infinity_object !== null)
 {
 var __container = utils_sys.objects.by_id(self.settings.container());
 __container.removeChild(__infinity_object);
 }
 return false;
 };
 }
 this.setup = function(container_id)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id) || self.status.in_progress())
 return false;
 return self.settings.container(container_id);
 };
 this.begin = function()
 {
 if (is_init === false)
 return false;
 if (self.status.in_progress())
 return false;
 if (!utils_int.draw())
 return false;
 self.settings.in_progress(true);
 return true;
 };
 this.end = function()
 {
 if (is_init === false)
 return false;
 if (!self.status.in_progress())
 return false;
 utils_int.clear();
 self.settings.in_progress(false);
 return true;
 };
 this.init = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 nature.themes.store('infinity');
 nature.apply('new');
 self.settings.id('infinity_' + random.generate());
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 nature = matrix.get('nature');
 return true;
 };
 var is_init = false,
 cosmos = null,
 matrix = null,
 nature = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 utils_int = new utilities();
 this.status = new status();
 this.settings = new settings();
}
function scrollbar()
{
 var self = this;
 function config_model()
 {
 this.id = null;
 this.container_id = null;
 this.scroll_ratio = 0.0;
 this.handle_pos = 0;
 this.offset_pos = 0;
 this.is_scrolling = false;
 this.is_wheel = false;
 this.side = null; // 1 is for right side, 2 is for left side
 this.handle_width = null;
 }
 function utilities()
 {
 this.draw = function(id)
 {
 var __content = vulcan.objects.by_id(id);
 __content.innerHTML = '<div id="' + config.id + '_content" class="scrollbar-content">' + __content.innerHTML + '</div>';
 var __container = vulcan.objects.by_id(id);
 __content = vulcan.objects.by_id(config.id + '_content');
 var __track_div = document.createElement('div');
 __track_div.id = config.id + '_track';
 __track_div.className = 'scrollbar-track';
 __track_div.innerHTML = '<div id="' + config.id + '_handle" class="scrollbar-handle"></div>';
 __container.appendChild(__track_div);
 var __content = vulcan.objects.by_id(config.id + '_content'),
 __track = vulcan.objects.by_id(config.id + '_track'),
 __handle = vulcan.objects.by_id(config.id + '_handle'),
 __content_height = __content.clientHeight,
 __container_height = __content.parentNode.clientHeight,
 __scroll_ratio = (__content_height - __container_height) / (__container_height - __handle.clientHeight - 8);
 if (__scroll_ratio <= 1.0)
 return false;
 __content.style.height = '100%';
 if (config.side === 1)
 {
 __track.style.right = '5px';
 __track.style.cssFloat = 'right';
 __content.style.cssFloat = 'left';
 }
 else // Apply Scroll Bar on the left side
 __content.style.marginLeft = __handle.offsetWidth + 'px';
 config.scroll_ratio = __scroll_ratio;
 config.handle_width = __handle.offsetWidth;
 return true;
 };
 this.bind_events = function()
 {
 var __content = vulcan.objects.by_id(config.id + '_content'),
 __handle = vulcan.objects.by_id(config.id + '_handle');
 morpheus.run(config.id, 'mouse', 'mousewheel', events.mouse.wheel, __content);
 morpheus.run(config.id, 'mouse', 'mousedown', events.mouse.down, __handle);
 morpheus.run(config.id, 'mouse', 'mouseup', events.mouse.up, document);
 morpheus.run(config.id, 'mouse', 'mousemove', events.mouse.move, document);
 return true;
 };
 }
 function events_manager()
 {
 function mouse()
 {
 this.up = function()
 {
 config.is_scrolling = false;
 return true;
 };
 this.down = function(this_event)
 {
 if (config.handle_pos === 0)
 config.handle_pos = this_event.clientY;
 config.is_scrolling = true;
 config.is_wheel = false;
 return true;
 };
 this.move = function(this_event)
 {
 if (!config.is_scrolling)
 return false;
 var __content = vulcan.objects.by_id(config.id + '_content'),
 __track = vulcan.objects.by_id(config.id + '_track'),
 __handle = vulcan.objects.by_id(config.id + '_handle'),
 __track_height = __track.clientHeight,
 __handle_height = __handle.clientHeight,
 __moved = config.offset_pos + this_event.clientY - config.handle_pos,
 __top = __moved;
 if (__moved < 0)
 __top = 0;
 else if (__moved > __track_height - __handle_height)
 __top = __track_height - __handle_height;
 __handle.style.top = __top + 'px';
 __content.scrollTop = __top * config.scroll_ratio;
 return true;
 };
 this.wheel = function(this_event)
 {
 var __content = vulcan.objects.by_id(config.id + '_content'),
 __track = vulcan.objects.by_id(config.id + '_track'),
 __handle = vulcan.objects.by_id(config.id + '_handle'),
 __track_height = __track.clientHeight,
 __handle_height = __handle.clientHeight,
 __mouse_direction = this_event.detail ? this_event.detail * -1 : this_event.wheelDelta / 120,
 __moved = config.offset_pos - config.handle_pos,
 __top = __moved;
 if (__mouse_direction < 0)
 {
 if (__moved > __track_height - __handle_height)
 __top = __track_height - __handle_height;
 __handle.style.top = __top + 'px';
 __content.scrollTop += config.scroll_ratio;
 }
 else
 {
 if (__moved < 0)
 __top = 0;
 __handle.style.top = __top + 'px';
 __content.scrollTop -= config.scroll_ratio;
 }
 config.handle_pos = __top;
 config.is_wheel = true;
 return true;
 };
 }
 this.mouse = new mouse();
 }
 function status()
 {
 }
 function side()
 {
 this.change = function()
 {
 if (is_init === false)
 return false;
 var __content = vulcan.objects.by_id(config.id + '_content'),
 __track = vulcan.objects.by_id(config.id + '_track');
 if (config.side === 1)
 {
 __track.style.right = '';
 __content.style.marginLeft = config.handle_width + 'px';
 config.side = 2;
 }
 else
 {
 __content.style.marginLeft = '';
 __track.style.right = '5px';
 config.side = 1;
 }
 return true;
 };
 }
 function scroll()
 {
 this.top = function()
 {
 var __content = vulcan.objects.by_id(config.id + '_content'),
 __handle = vulcan.objects.by_id(config.id + '_handle');
 config.offset_pos = 0;
 __content.scrollTop = 0;
 };
 this.bottom = function()
 {
 var __content = vulcan.objects.by_id(config.id + '_content'),
 __track = vulcan.objects.by_id(config.id + '_track'),
 __handle = vulcan.objects.by_id(config.id + '_handle'),
 __track_height = __track.clientHeight,
 __handle_height = __handle.clientHeight,
 __top = __track_height - __handle_height;
 config.offset_pos = __top;
 __content.scrollTop = __content.scrollHeight - __handle.clientHeight;
 };
 }
 this.apply = function(container_id, side)
 {
 if (is_init === false)
 return false;
 if (vulcan.validation.alpha.is_symbol(container_id))
 return false;
 if (!vulcan.validation.numerics.is_integer(side) || side < 1 || side > 2)
 return false;
 var __scrollbar_exists = vulcan.objects.by_id(container_id).getElementsByClassName('scrollbar-content')[0];
 if (__scrollbar_exists)
 return false;
 config.container_id = container_id;
 config.side = side;
 utils.draw(container_id);
 utils.bind_events();
 return true;
 };
 this.destroy = function(container_id)
 {
 if (is_init === false)
 return false;
 if (vulcan.validation.alpha.is_symbol(container_id))
 return false;
 return true;
 };
 this.init = function()
 {
 if (is_init === true)
 return false;
 is_init = true;
 vulcan = cosmos.hub.access('vulcan');
 var __pythia = cosmos.hub.access('matrix').get('pythia');
 config.id = 'scrollbar_' + __pythia.generate();
 vulcan.graphics.apply_theme('/framework/extensions/js/scrollbar/themes', 'scrollbar');
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 return true;
 };
 var is_init = false,
 cosmos = null,
 matrix = null,
 morpheus = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 config = new config_model(),
 events = new events_manager(),
 utils = new utilities();
 this.status = new status();
 this.side = new side();
 this.scroll = new scroll();
}
function bee()
{
 var self = this;
 function ui_objects_model()
 {
 function window()
 {
 function control_bar()
 {
 this.ui = null;
 this.icon = null;
 this.title = null;
 this.pencil = null;
 this.separator = null;
 this.close = null;
 }
 function menu()
 {
 this.ui = null;
 this.put_to_stack = null;
 this.mini_mode = null;
 this.max_mode = null;
 this.manage_casement = null;
 this.send_to_desktop = null;
 this.close = null;
 }
 function content()
 {
 this.ui = null;
 this.data = null;
 }
 function status_bar()
 {
 this.ui = null;
 this.message = null;
 this.resize = null;
 }
 this.control_bar = new control_bar();
 this.menu = new menu();
 this.content = new content();
 this.status_bar = new status_bar();
 }
 function casement()
 {
 this.ui = null;
 this.title = null;
 this.data = null;
 this.status = null;
 }
 this.ui = null;
 this.swarm = null;
 this.window = new window();
 this.casement = new casement();
 }
 function ui_config_model()
 {
 function window()
 {
 function control_bar()
 {
 function ids()
 {
 this.icon = null;
 this.title = null;
 this.pencil = null;
 this.separator = null;
 this.close = null;
 }
 function classes()
 {
 this.container = null;
 this.icon = null;
 this.title = null;
 this.pencil = null;
 this.separator = null;
 this.close = null;
 }
 this.id = null;
 this.ids = new ids();
 this.classes = new classes();
 }
 function menu()
 {
 function ids()
 {
 this.put_to_stack = null;
 this.mini_mode = null;
 this.max_mode = null;
 this.manage_casement = null;
 this.send_to_desktop = null;
 this.close = null;
 }
 this.id = null;
 this.class = null;
 this.ids = new ids();
 }
 function content()
 {
 function ids()
 {
 this.data = null;
 }
 function classes()
 {
 this.container = null;
 this.data = null;
 }
 this.id = null;
 this.ids = new ids();
 this.classes = new classes();
 }
 function status_bar()
 {
 function ids()
 {
 this.message = null;
 this.resize = null;
 }
 function classes()
 {
 this.container = null;
 this.message = null;
 this.resize = null;
 }
 this.id = null;
 this.ids = new ids();
 this.classes = new classes();
 }
 this.id = null;
 this.class = null;
 this.control_bar = new control_bar();
 this.menu = new menu();
 this.content = new content();
 this.status_bar = new status_bar();
 }
 function casement()
 {
 function ids()
 {
 this.title = null;
 this.data = null;
 this.status = null;
 }
 function classes()
 {
 this.title = null;
 this.container = null;
 this.data = null;
 this.status = null;
 }
 this.id = null;
 this.ids = new ids();
 this.classes = new classes();
 }
 this.window = new window();
 this.casement = new casement();
 }
 function events_status_settings_model()
 {
 function system()
 {
 this.initialized = false;
 this.running = false;
 this.active = false;
 this.error = false;
 this.in_hive = false;
 this.id_changed = false;
 this.type_changed = false;
 this.desktop_changed = false;
 }
 function gui()
 {
 this.open = false;
 this.opened = false;
 this.close = false;
 this.closed = false;
 this.minimize = false;
 this.minimized = false;
 this.restore = false;
 this.restored = false;
 this.maximize = false;
 this.maximized = false;
 this.topmost = false;
 this.drag = false;
 this.dragging = false;
 this.dragged = false;
 this.resize = false;
 this.resizing = false;
 this.resized = false;
 this.touch = false;
 this.touched = false;
 this.menu_activated = false;
 this.casement_deployed = false;
 this.casement_retracted = true;
 this.resize_enabled = false;
 this.key_pressed = false;
 this.mouse_clicked = false;
 this.title_on_edit = false;
 this.title_changed = false;
 this.status_bar_label_changed = false;
 this.content_changed = false;
 this.fading_in = false;
 this.fading_in_finished = false;
 this.fading_out = false;
 this.fading_out_finished = false;
 this.opacity_changed = false;
 }
 function key()
 {
 this.keydown = false;
 this.keyup = false;
 this.keypress = false;
 }
 function mouse()
 {
 this.click = false;
 this.dblclick = false;
 this.mousedown = false;
 this.mouseup = false;
 this.mouseover = false;
 this.mouseout = false;
 this.mousemove = false;
 }
 function touch()
 {
 this.touchstart = false;
 this.touchend = false;
 this.touchcancel = false;
 this.touchmove = false;
 }
 this.on_event = false;
 this.system = new system();
 this.gui = new gui();
 this.key = new key();
 this.mouse = new mouse();
 this.touch = new touch();
 }
 function error()
 {
 function codes()
 {
 this.INSTANCE_NUM_LIMIT = 0xA1;
 this.POSITION = 0xE1;
 this.SIZE = 0xE2;
 this.FX = 0xE3;
 }
 this.last = function()
 {
 return error_code;
 }
 this.codes = new codes();
 }
 function utilities()
 {
 var me = this,
 __last_mouse_button_clicked = 0;
 function populate_ui_config()
 {
 ui_config.window.id = my_bee_id;
 ui_config.window.class = 'gui ' + ui_config.window.id + '_gui';
 ui_config.window.control_bar.id = ui_config.window.id + '_ctrl_bar';
 ui_config.window.control_bar.ids.icon = ui_config.window.id + '_icon';
 ui_config.window.control_bar.ids.title = ui_config.window.id + '_title';
 ui_config.window.control_bar.ids.pencil = ui_config.window.id + '_pencil';
 ui_config.window.control_bar.ids.separator = ui_config.window.id + '_separator';
 ui_config.window.control_bar.ids.close = ui_config.window.id + '_close';
 ui_config.window.control_bar.classes.icon = 'icon ' + ui_config.window.control_bar.ids.icon;
 ui_config.window.control_bar.classes.pencil = 'pencil ' + ui_config.window.control_bar.ids.pencil;
 ui_config.window.menu.id = ui_config.window.id + '_menu';
 ui_config.window.menu.ids.put_to_stack = ui_config.window.menu.id + '_put_to_stack';
 ui_config.window.menu.ids.mini_mode = ui_config.window.menu.id + '_mini_mode';
 ui_config.window.menu.ids.max_mode = ui_config.window.menu.id + '_max_mode';
 ui_config.window.menu.ids.manage_casement = ui_config.window.menu.id + '_manage_casement';
 ui_config.window.menu.ids.send_to_desktop = ui_config.window.menu.id + '_send_to_desktop';
 ui_config.window.menu.ids.close = ui_config.window.menu.id + '_close';
 ui_config.window.menu.class = 'menu ' + ui_config.window.menu.id;
 ui_config.window.content.id = ui_config.window.id + '_content';
 ui_config.window.content.ids.data = ui_config.window.id + '_data';
 ui_config.window.content.classes.container = 'content ' + ui_config.window.content.id;
 ui_config.window.content.classes.data = 'data ' + ui_config.window.content.ids.data;
 ui_config.window.status_bar.id = ui_config.window.id + '_status_bar';
 ui_config.window.status_bar.ids.message = ui_config.window.status_bar.id + '_msg';
 ui_config.window.status_bar.classes.container = 'status_bar ' + ui_config.window.status_bar.id;
 ui_config.window.status_bar.classes.message = 'status_msg ' + ui_config.window.status_bar.ids.message;
 ui_config.casement.id = ui_config.window.id + '_casement';
 ui_config.casement.ids.title = ui_config.casement.id + '_title';
 ui_config.casement.ids.data = ui_config.casement.id + '_data';
 ui_config.casement.ids.status = ui_config.casement.id + '_status';
 ui_config.casement.classes.container = 'casement ' + ui_config.casement.id;
 ui_config.casement.classes.title = 'casement_title ' + ui_config.casement.ids.title;
 ui_config.casement.classes.data = 'casement_data ' + ui_config.casement.ids.data;
 ui_config.casement.classes.status = 'casement_status ' + ui_config.casement.ids.status;
 }
 function populate_ui_objects()
 {
 ui_objects.window.ui = utils_sys.objects.by_id(ui_config.window.id);
 ui_objects.window.control_bar.ui = utils_sys.objects.by_id(ui_config.window.control_bar.id);
 ui_objects.window.control_bar.icon = utils_sys.objects.by_id(ui_config.window.control_bar.ids.icon);
 ui_objects.window.control_bar.title = utils_sys.objects.by_id(ui_config.window.control_bar.ids.title);
 ui_objects.window.control_bar.pencil = utils_sys.objects.by_id(ui_config.window.control_bar.ids.pencil);
 ui_objects.window.control_bar.separator = utils_sys.objects.by_id(ui_config.window.control_bar.ids.separator);
 ui_objects.window.control_bar.close = utils_sys.objects.by_id(ui_config.window.control_bar.ids.close);
 ui_objects.window.menu.ui = utils_sys.objects.by_id(ui_config.window.menu.id);
 ui_objects.window.menu.put_to_stack = utils_sys.objects.by_id(ui_config.window.menu.ids.put_to_stack);
 ui_objects.window.menu.mini_mode = utils_sys.objects.by_id(ui_config.window.menu.ids.mini_mode);
 ui_objects.window.menu.max_mode = utils_sys.objects.by_id(ui_config.window.menu.ids.max_mode);
 ui_objects.window.menu.manage_casement = utils_sys.objects.by_id(ui_config.window.menu.ids.manage_casement);
 ui_objects.window.menu.send_to_desktop = utils_sys.objects.by_id(ui_config.window.menu.ids.send_to_desktop);
 ui_objects.window.menu.close = utils_sys.objects.by_id(ui_config.window.menu.ids.close);
 ui_objects.window.content.ui = utils_sys.objects.by_id(ui_config.window.content.id);
 ui_objects.window.content.data = utils_sys.objects.by_id(ui_config.window.content.ids.data);
 ui_objects.window.status_bar.ui = utils_sys.objects.by_id(ui_config.window.status_bar.id);
 ui_objects.window.status_bar.message = utils_sys.objects.by_id(ui_config.window.status_bar.ids.message);
 ui_objects.window.status_bar.resize = utils_sys.objects.by_id(ui_config.window.status_bar.ids.resize);
 ui_objects.casement.ui = utils_sys.objects.by_id(ui_config.casement.id);
 ui_objects.casement.title = utils_sys.objects.by_id(ui_config.casement.ids.title);
 ui_objects.casement.data = utils_sys.objects.by_id(ui_config.casement.ids.data);
 ui_objects.casement.status = utils_sys.objects.by_id(ui_config.casement.ids.status);
 }
 function draw()
 {
 var __dynamic_object = null,
 __bee_settings = self.settings,
 __bee_gui = self.gui,
 __marquee_class = '',
 __html = null;
 populate_ui_config();
 if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
 {
 ui_config.window.status_bar.ids.resize = ui_config.window.id + '_resize';
 ui_config.window.status_bar.classes.resize = 'resize ' + ui_config.window.status_bar.ids.resize;
 }
 if (__bee_settings.general.resizable() === true)
 {
 ui_config.window.control_bar.classes.container = 'ctrl_bar box_ctrl_bar ' + ui_config.window.control_bar.id;
 ui_config.window.control_bar.classes.title = 'title box_title ' + ui_config.window.control_bar.ids.title;
 ui_config.window.control_bar.classes.separator = 'separator box_separator '+ ui_config.window.control_bar.ids.separator;
 ui_config.window.control_bar.classes.close = 'close box_close ' + ui_config.window.control_bar.ids.close;
 }
 else
 {
 ui_config.window.control_bar.classes.container = 'ctrl_bar widget_ctrl_bar ' + ui_config.window.control_bar.id;
 ui_config.window.control_bar.classes.title = 'title widget_title ' + ui_config.window.control_bar.ids.title;
 ui_config.window.control_bar.classes.separator = 'separator widget_separator '+ ui_config.window.control_bar.ids.separator;
 ui_config.window.control_bar.classes.close = 'close widget_close ' + ui_config.window.control_bar.ids.close;
 }
 if (self.settings.general.status_bar_marquee())
 {
 if (__bee_settings.data.window.labels.status_bar().length * 11.0 >= __bee_gui.size.width())
 __marquee_class = 'marquee';
 }
 __html = '<div id="' + ui_config.window.control_bar.id + '" class="' + ui_config.window.control_bar.classes.container + '">' +
 ' <div id="' + ui_config.window.control_bar.ids.icon + '" class="' + ui_config.window.control_bar.classes.icon + '"' +
 ' title="' + __bee_settings.data.hints.icon() + '"></div>' +
 ' <div id="' + ui_config.window.control_bar.ids.title + '" class="' + ui_config.window.control_bar.classes.title + '"' +
 ' title="' + __bee_settings.data.hints.title() + '">' +
 __bee_settings.data.window.labels.title() +
 ' </div>';
 if (__bee_settings.actions.can_edit_title())
 {
 __html += ' <div id="' + ui_config.window.control_bar.ids.pencil + '" class="' + ui_config.window.control_bar.classes.pencil + '"' +
 ' title="' + __bee_settings.data.hints.pencil() + '"></div>';
 }
 if (__bee_settings.actions.can_close())
 {
 __html += ' <div id="' + ui_config.window.control_bar.ids.close + '" class="' + ui_config.window.control_bar.classes.close + '"' +
 ' title="' + __bee_settings.data.hints.close() + '"></div>';
 }
 if (__bee_settings.actions.can_edit_title() && __bee_settings.actions.can_close())
 __html += ' <div id="' + ui_config.window.control_bar.ids.separator + '" class="' + ui_config.window.control_bar.classes.separator + '"></div>';
 __html += '</div>';
 if (__bee_settings.actions.can_use_menu())
 {
 __html += '<div id="' + ui_config.window.menu.id + '" class="' + ui_config.window.menu.class + '">' +
 ' <div id="' + ui_config.window.menu.ids.put_to_stack + '" ' +
 ' class="menu_option put_to_stack">Put to stack</div>' +
 ' <div id="' + ui_config.window.menu.ids.mini_mode + '" ' +
 ' class="menu_option mini_mode">Mini mode</div>' +
 ' <div id="' + ui_config.window.menu.ids.max_mode + '" ' +
 ' class="menu_option max_mode">Max mode</div>' +
 ' <div id="' + ui_config.window.menu.ids.manage_casement + '" ' +
 ' class="menu_option manage_casement">Show casement</div>' +
 ' <div id="' + ui_config.window.menu.ids.send_to_desktop + '" ' +
 ' class="menu_option send_to_desktop">Send to desktop...</div>' +
 ' <div id="' + ui_config.window.menu.ids.close + '" ' +
 ' class="menu_option menu_close">Close</div>' +
 '</div>';
 }
 __html += '<div id="' + ui_config.window.content.id + '" class="' + ui_config.window.content.classes.container + '">' +
 ' <div id="' + ui_config.window.content.ids.data + '" class="' + ui_config.window.content.classes.data + '"' +
 ' title="' + __bee_settings.data.hints.content() + '">' +
 __bee_settings.data.window.content() + '</div>' +
 '</div>' +
 '<div id="' + ui_config.window.status_bar.id + '" class="' + ui_config.window.status_bar.classes.container + '">' +
 ' <div id="' + ui_config.window.status_bar.ids.message + '" class="' +
 ui_config.window.status_bar.classes.message + '">' +
 ' <div class="dynamic_msg ' + __marquee_class + '"' +
 ' title="' + __bee_settings.data.hints.status_bar() + '">' +
 __bee_settings.data.window.labels.status_bar() + '</div>' +
 ' </div>';
 if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
 {
 __html += ' <div id="' + ui_config.window.status_bar.ids.resize + '" class="' + ui_config.window.status_bar.classes.resize + '"' +
 ' title="' + __bee_settings.data.hints.resize() + '"></div>';
 }
 __html += '</div>';
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', ui_config.window.id);
 __dynamic_object.setAttribute('class', ui_config.window.class);
 __dynamic_object.style.opacity = '1.0';
 __dynamic_object.style.display = 'block';
 if (__bee_gui.fx.enabled.fade.into())
 __dynamic_object.style.display = 'none';
 if (bee_statuses.in_hive())
 {
 __dynamic_object.style.display = 'none';
 morpheus.execute(my_bee_id, 'system', 'in_hive');
 }
 __dynamic_object.style.left = __bee_gui.position.left() + 'px';
 __dynamic_object.style.top = __bee_gui.position.top() + 'px';
 __dynamic_object.style.width = __bee_gui.size.width() + 'px';
 __dynamic_object.style.height = __bee_gui.size.height() + 'px';
 __dynamic_object.innerHTML = __html;
 ui_objects.swarm.appendChild(__dynamic_object);
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', ui_config.casement.id);
 __dynamic_object.setAttribute('class', ui_config.casement.classes.container);
 __dynamic_object.style.left = __bee_gui.position.left() + __bee_gui.size.width() + 'px';
 __dynamic_object.style.top = __bee_gui.position.top() + 'px';
 __dynamic_object.style.width = __bee_gui.size.width() + 'px';
 __dynamic_object.style.height = __bee_gui.size.height() + 'px';
 __dynamic_object.innerHTML = '<div id="' + ui_config.casement.ids.title + '" class="casement_title ' +
 ui_config.casement.classes.title + '">' +
 __bee_settings.data.casement.labels.title() +
 '</div>' +
 '<div id="' + ui_config.casement.ids.data + '" class="casement_data ' +
 ui_config.casement.classes.data + '">' +
 __bee_settings.data.casement.content() +
 '</div>' +
 '<div id="' + ui_config.casement.ids.status + '" class="casement_status ' +
 ui_config.casement.classes.status + '">' +
 __bee_settings.data.casement.labels.status() +
 '</div>';
 ui_objects.swarm.appendChild(__dynamic_object);
 populate_ui_objects();
 ui_objects.window.control_bar.title.style.width = __bee_gui.size.width() - 100 + 'px';
 ui_objects.window.content.data.style.height = __bee_gui.size.height() - 88 + 'px';
 if (__bee_settings.general.resizable() === false && !__bee_settings.actions.can_resize.widget())
 ui_objects.window.status_bar.message.style.width = __bee_gui.size.width() - 22 + 'px';
 else
 ui_objects.window.status_bar.message.style.width = __bee_gui.size.width() - 50 + 'px';
 if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
 {
 ui_objects.window.status_bar.resize.style.width = 19 + 'px';
 ui_objects.window.status_bar.resize.style.height = 19 + 'px';
 }
 var __custom_icon = __bee_settings.general.icon();
 if (__custom_icon)
 ui_objects.window.control_bar.icon.classList.add(__custom_icon);
 var __casement_width_settings = __bee_settings.general.casement_width();
 ui_objects.casement.ui.style.width = (__bee_gui.size.width() * __casement_width_settings[0]) + 'px';
 __bee_gui.actions.set_top();
 attach_events();
 bee_statuses.open(true);
 morpheus.execute(my_bee_id, 'gui', 'open');
 bee_statuses.open(false);
 bee_statuses.opened(true);
 morpheus.execute(my_bee_id, 'gui', 'opened');
 morpheus.execute(my_bee_id, 'key', 'keydown');
 morpheus.execute(my_bee_id, 'key', 'keyup');
 morpheus.execute(my_bee_id, 'key', 'keypress');
 morpheus.execute(my_bee_id, 'mouse', 'click');
 morpheus.execute(my_bee_id, 'mouse', 'dblclick');
 morpheus.execute(my_bee_id, 'mouse', 'mousedown');
 morpheus.execute(my_bee_id, 'mouse', 'mouseup');
 morpheus.execute(my_bee_id, 'mouse', 'mouseover');
 morpheus.execute(my_bee_id, 'mouse', 'mouseout');
 morpheus.execute(my_bee_id, 'mouse', 'mousemove');
 morpheus.execute(my_bee_id, 'touch', 'touchstart');
 morpheus.execute(my_bee_id, 'touch', 'touchend');
 morpheus.execute(my_bee_id, 'touch', 'touchcancel');
 morpheus.execute(my_bee_id, 'touch', 'touchmove');
 return true;
 }
 function attach_events()
 {
 var __bee_settings = self.settings,
 __bee_gui = self.gui,
 __handler = null;
 __handler = function(event) { __bee_gui.actions.menu.close(event); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, document);
 morpheus.store(my_bee_id, 'touch', 'touchmove', __handler, document);
 __handler = function(event) { __bee_gui.actions.release(event); };
 morpheus.store(my_bee_id, 'mouse', 'mouseup', __handler, document);
 morpheus.store(my_bee_id, 'touch', 'touchend', __handler, document);
 __handler = function(event) { __bee_gui.actions.dresize(event); };
 morpheus.store(my_bee_id, 'mouse', 'mousemove', __handler, ui_objects.swarm);
 morpheus.store(my_bee_id, 'touch', 'touchmove', __handler, ui_objects.swarm);
 __handler = function(event) { __bee_gui.actions.hover.into(event); };
 morpheus.store(my_bee_id, 'mouse', 'mouseover', __handler, ui_objects.window.ui);
 __handler = function(event) { __bee_gui.actions.hover.out(event); };
 morpheus.store(my_bee_id, 'mouse', 'mouseout', __handler, ui_objects.window.ui);
 __handler = function(event) { coords(event, 1); };
 morpheus.store(my_bee_id, 'mouse', 'mousemove', __handler, ui_objects.window.ui);
 morpheus.store(my_bee_id, 'touch', 'touchmove', __handler, ui_objects.window.ui);
 __handler = function() { __bee_gui.actions.touch(); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.ui);
 morpheus.store(my_bee_id, 'touch', 'touchstart', __handler, ui_objects.window.ui);
 __handler = function(event) { coords(event, 2); manage_drag_status(event); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.ui);
 morpheus.store(my_bee_id, 'touch', 'touchstart', __handler, ui_objects.window.control_bar.ui);
 __handler = function(event)
 {
 __bee_settings.actions.can_drag.enabled(false);
 __last_mouse_button_clicked = event.buttons;
 bee_statuses.active(true);
 morpheus.execute(my_bee_id, 'system', 'active');
 };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.icon);
 __handler = function(event) { __bee_gui.actions.menu.open(event); };
 morpheus.store(my_bee_id, 'mouse', 'mouseup', __handler, ui_objects.window.control_bar.icon);
 if (__bee_settings.actions.can_edit_title())
 {
 __handler = function(event) { __bee_gui.actions.edit_title(event); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.pencil);
 }
 if (__bee_settings.actions.can_close())
 {
 __handler = function(event) { __bee_gui.actions.close(event); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.close);
 morpheus.store(my_bee_id, 'touch', 'touchstart', __handler, ui_objects.window.control_bar.close);
 __handler = function(event) { event.preventDefault(); };
 morpheus.store(my_bee_id, 'touch', 'touchmove', __handler, ui_objects.window.control_bar.close);
 }
 if (__bee_settings.actions.can_use_menu())
 {
 if (__bee_settings.actions.can_use_casement())
 {
 __handler = function(event) { manage_casement(event); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.menu.manage_casement);
 }
 if (__bee_settings.actions.can_close())
 {
 __handler = function(event) { __bee_gui.actions.close(event); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.menu.close);
 }
 }
 if (!__bee_settings.actions.can_select_text())
 {
 __handler = function() { return false; };
 morpheus.run(my_bee_id, 'mouse', 'selectstart', __handler, ui_objects.window.content.data);
 __handler = function(event) { event.preventDefault(); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.content.data);
 }
 if (__bee_settings.general.resizable() === true || __bee_settings.actions.can_resize.widget())
 {
 __handler = function(event)
 {
 coords(event, 2);
 swarm.settings.active_bee(my_bee_id);
 bee_statuses.resize(true);
 bee_statuses.active(true);
 morpheus.execute(my_bee_id, 'gui', 'resize');
 morpheus.execute(my_bee_id, 'system', 'active');
 };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.status_bar.resize);
 morpheus.store(my_bee_id, 'touch', 'touchstart', __handler, ui_objects.window.status_bar.resize);
 __handler = function()
 {
 bee_statuses.mouse_clicked(false);
 bee_statuses.resizing(false);
 bee_statuses.resize(false);
 morpheus.execute(my_bee_id, 'gui', 'resized');
 };
 morpheus.store(my_bee_id, 'mouse', 'mouseup', __handler, document);
 morpheus.store(my_bee_id, 'touch', 'touchend', __handler, document);
 }
 __handler = function() { return false; };
 morpheus.run(my_bee_id, 'mouse', 'selectstart', __handler, ui_objects.window.control_bar.ui);
 morpheus.run(my_bee_id, 'mouse', 'selectstart', __handler, ui_objects.window.status_bar.ui);
 __handler = function(event) { event.preventDefault(); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.status_bar.ui);
 __handler = function(event) { __bee_gui.actions.hover.into(event); };
 morpheus.store(my_bee_id, 'mouse', 'mouseover', __handler, ui_objects.casement.ui);
 __handler = function(event) { __bee_gui.actions.hover.out(event); };
 morpheus.store(my_bee_id, 'mouse', 'mouseout', __handler, ui_objects.casement.ui);
 __handler = function(event) { coords(event, 1); };
 morpheus.store(my_bee_id, 'mouse', 'mousemove', __handler, ui_objects.casement.ui);
 morpheus.store(my_bee_id, 'touch', 'touchmove', __handler, ui_objects.casement.ui);
 __handler = function() { __bee_gui.actions.touch(); };
 morpheus.store(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.casement.ui);
 morpheus.store(my_bee_id, 'touch', 'touchstart', __handler, ui_objects.casement.ui);
 return true;
 }
 function coords(event_object, type)
 {
 if (utils_sys.validation.misc.is_undefined(event_object) ||
 !utils_sys.validation.numerics.is_integer(type) ||
 type < 1 || type > 2)
 return false;
 var __client_x = 0,
 __client_y = 0,
 __pos_x = 0,
 __pos_y = 0;
 if (navigator.maxTouchPoints > 0 &&
 event_object.type.indexOf('touch') > -1 &&
 event_object.touches.length > 0)
 {
 __client_x = event_object.touches[0].clientX;
 __client_y = event_object.touches[0].clientY;
 }
 else
 {
 __client_x = event_object.clientX;
 __client_y = event_object.clientY;
 }
 __pos_x = __client_x + document.documentElement.scrollLeft +
 document.body.scrollLeft - document.body.clientLeft -
 swarm.settings.left() - self.gui.position.left();
 __pos_y = __client_y + document.documentElement.scrollTop +
 document.body.scrollTop - document.body.clientTop -
 swarm.settings.top() - self.gui.position.top();
 if (type === 1)
 {
 me.mouse_coords.actual.pos_x = __pos_x;
 me.mouse_coords.actual.pos_y = __pos_y;
 }
 else
 {
 me.mouse_coords.relative.pos_x = __pos_x + self.gui.position.left();
 me.mouse_coords.relative.pos_y = __pos_y + self.gui.position.top();
 }
 return true;
 }
 function alter_win_title(text_value = null)
 {
 var __ctrl_bar = ui_objects.window.control_bar.ui,
 __title_edit_box = utils_sys.objects.by_id(my_bee_id + '_title_edit_box'),
 __new_title = __title_edit_box.value,
 __win_type_class_title = null,
 __title_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width) - 100,
 __title_div = document.createElement('div'),
 __pencil_div = document.createElement('div'),
 __handler = null;
 morpheus.delete(my_bee_id, 'keydown', __title_edit_box);
 __ctrl_bar.removeChild(__title_edit_box);
 if (self.settings.general.resizable() === false)
 __win_type_class_title = 'widget_title';
 else
 __win_type_class_title = 'box_title';
 __title_div.setAttribute('id', ui_config.window.control_bar.ids.title);
 __title_div.setAttribute('class', 'title ' + __win_type_class_title);
 __title_div.setAttribute('style', 'width: ' + __title_width + 'px');
 __title_div.setAttribute('title', self.settings.data.hints.title());
 if (text_value === null)
 __title_div.innerHTML = __new_title;
 else
 __title_div.innerHTML = text_value;
 __pencil_div.setAttribute('id', ui_config.window.control_bar.ids.pencil);
 __pencil_div.setAttribute('class', 'pencil');
 __pencil_div.setAttribute('title', self.settings.data.hints.pencil());
 __ctrl_bar.appendChild(__title_div);
 __ctrl_bar.appendChild(__pencil_div);
 ui_objects.window.control_bar.title = __title_div;
 ui_objects.window.control_bar.pencil = __pencil_div;
 __handler = function(event)
 {
 self.gui.actions.edit_title(event);
 bee_statuses.active(true);
 morpheus.execute(my_bee_id, 'system', 'active');
 };
 morpheus.run(my_bee_id, 'mouse', 'mousedown', __handler, ui_objects.window.control_bar.pencil);
 if (text_value === null)
 self.settings.data.window.labels.title(__new_title);
 bee_statuses.title_on_edit(false);
 return true;
 }
 function manage_drag_status(event_object)
 {
 if (navigator.maxTouchPoints === 0 && event_object.buttons !== 1)
 return false;
 if (!self.settings.actions.can_drag.enabled() || bee_statuses.title_on_edit() || bee_statuses.close())
 return false;
 swarm.settings.active_bee(my_bee_id);
 bee_statuses.drag(true);
 bee_statuses.active(true);
 morpheus.execute(my_bee_id, 'gui', 'drag');
 morpheus.execute(my_bee_id, 'system', 'active');
 return true;
 }
 function manage_casement(event_object)
 {
 if (bee_statuses.close())
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object) || event_object.buttons !== 1)
 return false;
 self.gui.actions.casement.toggle(event_object);
 return true;
 }
 this.gui_init = function()
 {
 ui_objects.swarm = utils_sys.objects.by_id(swarm.settings.id());
 if (ui_objects.swarm === false)
 return false;
 if (!draw())
 return false;
 return true;
 };
 this.edit_win_title = function()
 {
 var __ctrl_bar = ui_objects.window.control_bar.ui,
 __old_title = ui_objects.window.control_bar.title,
 __pencil = ui_objects.window.control_bar.pencil,
 __win_type_class_title = null,
 __title_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width) - 100,
 __title_edit_box = document.createElement('input'),
 __handler = null;
 __ctrl_bar.removeChild(__old_title);
 __ctrl_bar.removeChild(__pencil);
 if (self.settings.general.resizable() === false)
 __win_type_class_title = 'widget_title';
 else
 __win_type_class_title = 'box_title';
 __title_edit_box.setAttribute('id', my_bee_id + '_title_edit_box');
 __title_edit_box.setAttribute('class', 'title ' + __win_type_class_title + ' edit_win_title');
 __title_edit_box.setAttribute('style', 'width: ' + __title_width + 'px');
 __title_edit_box.setAttribute('value', self.settings.data.window.labels.title());
 __ctrl_bar.appendChild(__title_edit_box);
 __handler = function(event)
 {
 if (!bee_statuses.active())
 return false;
 if (self.gui.keys.get(event) === key_control.keys.ENTER)
 alter_win_title();
 else if (self.gui.keys.get(event) === key_control.keys.ESCAPE)
 alter_win_title(self.settings.data.window.labels.title());
 };
 morpheus.run(my_bee_id, 'key', 'keydown', __handler, __title_edit_box);
 bee_statuses.title_on_edit(true);
 morpheus.execute(my_bee_id, 'gui', 'title_on_edit');
 return true;
 };
 this.remove_bee = function()
 {
 ui_objects.swarm.removeChild(ui_objects.window.ui);
 ui_objects.swarm.removeChild(ui_objects.casement.ui);
 return true;
 };
 this.is_lonely_bee = function(bee_id)
 {
 var __swarm_bees = swarm.bees.list(),
 __hive_bees = matrix.get('hive').status.bees.list(),
 __bees_list = null,
 __bees_list_num = 0;
 for (var i = 0; i < __swarm_bees.length; i++)
 {
 if (__swarm_bees[i] === bee_id)
 return false;
 }
 for (__bees_list in __hive_bees)
 {
 __bees_list_num = __bees_list.length;
 for (var i = 0; i < __bees_list_num; i++)
 {
 if (__bees_list[i] === bee_id)
 return false;
 }
 }
 return true;
 };
 this.set_z_index = function(z_index)
 {
 ui_objects.window.ui.style.zIndex = z_index + 2;
 ui_objects.casement.ui.style.zIndex = z_index + 1;
 return true;
 };
 this.last_mouse_button = function()
 {
 return __last_mouse_button_clicked;
 };
 this.log = function(func, result)
 {
 if (self.settings.general.backtrace())
 frog('BEE', 'Function', func, 'Result: ' + result);
 return false;
 };
 function mouse_coords_model()
 {
 function actual()
 {
 this.pos_x = 0;
 this.pos_y = 0;
 }
 function relative()
 {
 this.pos_x = 0;
 this.pos_y = 0;
 }
 this.actual = new actual();
 this.relative = new relative();
 }
 function fade_settings_model()
 {
 this.type = null;
 this.step = 0.00;
 this.speed = 0;
 this.delay = 0;
 }
 function animating_events()
 {
 var me = this;
 this.in_progress = function()
 {
 if (bee_statuses.fading_in())
 {
 __animating_event = 'into';
 return true;
 }
 if (bee_statuses.fading_out())
 {
 __animating_event = 'out';
 return true;
 }
 return false;
 };
 this.duration = function()
 {
 if (!me.in_progress())
 return false;
 var __msec = 0.0;
 __msec = (self.gui.fx.fade.settings[__animating_event].get.last(2) /
 self.gui.fx.fade.settings[__animating_event].get.last(1)) +
 self.gui.fx.fade.settings[__animating_event].get.last(3);
 __animating_event = null;
 return __msec;
 };
 var __animating_event = null;
 }
 this.mouse_coords = new mouse_coords_model();
 this.fade_settings = new fade_settings_model();
 this.animating_events = new animating_events();
 }
 function supported_events()
 {
 var __events_settings = new events_status_settings_model();
 this.contains = function(event_var, context)
 {
 if (context === 'main')
 return false;
 for (var key in __events_settings[context])
 {
 if (__events_settings[context].hasOwnProperty(key))
 {
 if (key === event_var)
 return true;
 }
 }
 return false;
 };
 }
 function supported_statuses()
 {
 function validate(status_var, context, val)
 {
 if (utils_sys.validation.misc.is_undefined(val))
 {
 if (context === 'main')
 return __status_settings[status_var];
 else
 return __status_settings[context][status_var];
 }
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 if (context === 'main')
 {
 __status_settings.on_event = val;
 return true;
 }
 __status_settings[context][status_var] = val;
 for (var key in __status_settings[context])
 {
 if (__status_settings[context].hasOwnProperty(key))
 {
 if (__status_settings[context][key] === true)
 {
 __status_settings.on_event = true;
 return true;
 }
 }
 }
 __status_settings.on_event = false;
 return true;
 }
 this.on_event = function(val)
 {
 return validate('on_event', 'main', val);
 };
 this.initialized = function(val)
 {
 return validate('initialized', 'system', val);
 };
 this.running = function(val)
 {
 return validate('running', 'system', val);
 };
 this.active = function(val)
 {
 return validate('active', 'system', val);
 };
 this.error = function(val)
 {
 return validate('error', 'system', val);
 };
 this.id_changed = function(val)
 {
 return validate('id_changed', 'system', val);
 };
 this.type_changed = function(val)
 {
 return validate('type_changed', 'system', val);
 };
 this.desktop_changed = function(val)
 {
 return validate('desktop_changed', 'system', val);
 };
 this.in_hive = function(val)
 {
 return validate('in_hive', 'system', val);
 };
 this.open = function(val)
 {
 return validate('open', 'gui', val);
 };
 this.opened = function(val)
 {
 return validate('opened', 'gui', val);
 };
 this.close = function(val)
 {
 return validate('close', 'gui', val);
 };
 this.closed = function(val)
 {
 return validate('closed', 'gui', val);
 };
 this.minimize = function(val)
 {
 return validate('minimize', 'gui', val);
 };
 this.minimized = function(val)
 {
 return validate('minimized', 'gui', val);
 };
 this.restore = function(val)
 {
 return validate('restore', 'gui', val);
 };
 this.restored = function(val)
 {
 return validate('restored', 'gui', val);
 };
 this.maximize = function(val)
 {
 return validate('maximize', 'gui', val);
 };
 this.maximized = function(val)
 {
 return validate('maximized', 'gui', val);
 };
 this.topmost = function(val)
 {
 return validate('topmost', 'gui', val);
 };
 this.drag = function(val)
 {
 return validate('drag', 'gui', val);
 };
 this.dragging = function(val)
 {
 return validate('dragging', 'gui', val);
 };
 this.dragged = function(val)
 {
 return validate('dragged', 'gui', val);
 };
 this.resize = function(val)
 {
 return validate('resize', 'gui', val);
 };
 this.resizing = function(val)
 {
 return validate('resizing', 'gui', val);
 };
 this.resized = function(val)
 {
 return validate('resized', 'gui', val);
 };
 this.touch = function(val)
 {
 return validate('touch', 'gui', val);
 };
 this.touched = function(val)
 {
 return validate('touched', 'gui', val);
 };
 this.menu_activated = function(val)
 {
 return validate('menu_activated', 'gui', val);
 };
 this.casement_deployed = function(val)
 {
 return validate('casement_deployed', 'gui', val);
 };
 this.casement_retracted = function(val)
 {
 return validate('casement_retracted', 'gui', val);
 };
 this.resize_enabled = function(val)
 {
 return validate('resize_enabled', 'gui', val);
 };
 this.title_on_edit = function(val)
 {
 return validate('title_on_edit', 'gui', val);
 };
 this.title_changed = function(val)
 {
 return validate('title_changed', 'gui', val);
 };
 this.status_bar_label_changed = function(val)
 {
 return validate('status_bar_label_changed', 'gui', val);
 };
 this.content_changed = function(val)
 {
 return validate('content_changed', 'gui', val);
 };
 this.fading_in = function(val)
 {
 return validate('fading_in', 'gui', val);
 };
 this.fading_in_finished = function(val)
 {
 return validate('fading_in_finished', 'gui', val);
 };
 this.fading_out = function(val)
 {
 return validate('fading_out', 'gui', val);
 };
 this.fading_out_finished = function(val)
 {
 return validate('fading_out_finished', 'gui', val);
 };
 this.opacity_changed = function(val)
 {
 return validate('opacity_changed', 'gui', val);
 };
 this.mouse_clicked = function(val)
 {
 return validate('mouse_clicked', 'gui', val);
 };
 this.key_pressed = function(val)
 {
 return validate('key_pressed', 'gui', val);
 };
 this.keydown = function(val)
 {
 return validate('keydown', 'key', val);
 };
 this.keyup = function(val)
 {
 return validate('keyup', 'key', val);
 };
 this.keypress = function(val)
 {
 return validate('keypress', 'key', val);
 };
 this.click = function(val)
 {
 return validate('click', 'mouse', val);
 };
 this.dblclick = function(val)
 {
 return validate('dblclick', 'mouse', val);
 };
 this.mousedown = function(val)
 {
 return validate('mousedown', 'mouse', val);
 };
 this.mouseup = function(val)
 {
 return validate('mouseup', 'mouse', val);
 };
 this.mouseover = function(val)
 {
 return validate('mouseover', 'mouse', val);
 };
 this.mouseout = function(val)
 {
 return validate('mouseout', 'mouse', val);
 };
 this.mousemove = function(val)
 {
 return validate('mousemove', 'mouse', val);
 };
 this.touchstart = function(val)
 {
 return validate('touchstart', 'touch', val);
 };
 this.touchend = function(val)
 {
 return validate('touchend', 'touch', val);
 };
 this.touchcancel = function(val)
 {
 return validate('touchcancel', 'touch', val);
 };
 this.touchmove = function(val)
 {
 return validate('touchmove', 'touch', val);
 };
 var __status_settings = new events_status_settings_model();
 }
 function settings()
 {
 function general()
 {
 var __app_id = null,
 __system_app_id = null,
 __desktop_id = 0,
 __single_instance = false,
 __allowed_instances = 0,
 __status_bar_marquee = false,
 __resizable = false,
 __resize_tooltip = false,
 __icon = 'app_default_icon',
 __casement_width = 1,
 __casement_width_type = 'relative',
 __backtrace = false;
 this.app_id = function()
 {
 if (is_init === false)
 return false;
 return __app_id;
 };
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __system_app_id;
 if (bee_statuses.running())
 return false;
 if (utils_sys.validation.alpha.is_blank(val) || utils_sys.validation.alpha.is_symbol(val))
 return false;
 __app_id = val.trim();
 __system_app_id = val.toLowerCase().replace(/\s/g,'_') + '_app_' + random.generate();
 bee_statuses.id_changed(true);
 morpheus.execute(my_bee_id, 'system', 'id_changed');
 bee_statuses.id_changed(false);
 return true;
 };
 this.resizable = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __resizable;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __resizable = val;
 bee_statuses.type_changed(true);
 morpheus.execute(my_bee_id, 'system', 'type_changed');
 bee_statuses.type_changed(false);
 return true;
 };
 this.desktop_id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __desktop_id;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 return false;
 __desktop_id = val;
 bee_statuses.desktop_changed(true);
 morpheus.execute(my_bee_id, 'system', 'desktop_changed');
 bee_statuses.desktop_changed(false);
 return true;
 };
 this.single_instance = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __single_instance;
 if (bee_statuses.running())
 return false;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __single_instance = val;
 return true;
 };
 this.allowed_instances = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __allowed_instances;
 if (bee_statuses.running())
 return false;
 if (!utils_sys.validation.numerics.is_integer(val) || val < 1)
 return false;
 __allowed_instances = val;
 return true;
 };
 this.topmost = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return false;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 bee_statuses.topmost(val);
 if (val === true)
 morpheus.execute(my_bee_id, 'gui', 'topmost');
 return true;
 };
 this.in_hive = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return false;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 bee_statuses.in_hive(val);
 if (val === true)
 {
 bee_statuses.active(false);
 morpheus.execute(my_bee_id, 'system', 'in_hive');
 }
 return true;
 };
 this.status_bar_marquee = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __status_bar_marquee;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __status_bar_marquee = val;
 return true;
 };
 this.resize_tooltip = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __resize_tooltip;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __resize_tooltip = val;
 return true;
 };
 this.icon = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __icon;
 if (!utils_sys.validation.alpha.is_string(val))
 return false;
 if (ui_objects.window.control_bar.icon !== null)
 {
 if (val !== null)
 ui_objects.window.control_bar.icon.classList.add(val);
 else
 ui_objects.window.control_bar.icon.classList.remove(__icon);
 }
 if (val !== null)
 __icon = val;
 else
 __icon = 'app_default_icon';
 return true;
 };
 this.casement_width = function(val, type = 'relative')
 {
 if (is_init === false)
 return false;
 if (type !== 'relative' && type !== 'fixed')
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return [__casement_width, __casement_width_type];
 if (!utils_sys.validation.numerics.is_integer(val) || val < 20 || val > 100)
 return false;
 __casement_width = val / 100;
 __casement_width_type = type;
 if (ui_objects.casement.ui !== null)
 ui_objects.casement.ui.style.width = (self.gui.size.width() * __casement_width) + 'px';
 return true;
 };
 this.backtrace = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __backtrace;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __backtrace = val;
 return true;
 };
 }
 function actions()
 {
 function action_settings_object()
 {
 function drag()
 {
 this.on_x = true;
 this.on_y = true;
 }
 function resize()
 {
 this.on_x = true;
 this.on_y = true;
 }
 this.can_open = true;
 this.can_close = true;
 this.can_minimize = true;
 this.can_restore = true;
 this.can_maximize = true;
 this.can_touch = true;
 this.can_edit_title = false;
 this.can_select_text = true;
 this.can_use_menu = true;
 this.can_use_casement = true;
 this.can_drag = true;
 this.can_resize = true;
 this.can_resize_widget = false;
 this.drag = new drag();
 this.resize = new resize();
 }
 function validate(mode, action, modifier, val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 {
 if (mode === 1)
 return __action_settings[action];
 else
 return __action_settings[modifier][action];
 }
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 if (mode === 1)
 __action_settings[action] = val;
 else
 __action_settings[modifier][action] = val;
 return true;
 }
 this.can_open = function(val)
 {
 return validate(1, 'can_open', null, val);
 };
 this.can_close = function(val)
 {
 return validate(1, 'can_close', null, val);
 };
 this.can_minimize = function(val)
 {
 return validate(1, 'can_minimize', null, val);
 };
 this.can_restore = function(val)
 {
 return validate(1, 'can_restore', null, val);
 };
 this.can_maximize = function(val)
 {
 return validate(1, 'can_maximize', null, val);
 };
 this.can_touch = function(val)
 {
 return validate(1, 'can_touch', null, val);
 };
 this.can_edit_title = function(val)
 {
 return validate(1, 'can_edit_title', null, val);
 };
 this.can_select_text = function(val)
 {
 return validate(1, 'can_select_text', null, val);
 };
 this.can_use_menu = function(val)
 {
 return validate(1, 'can_use_menu', null, val);
 };
 this.can_use_casement = function(val)
 {
 return validate(1, 'can_use_casement', null, val);
 };
 function can_drag()
 {
 this.enabled = function(val)
 {
 return validate(1, 'can_drag', null, val);
 };
 function drag_on()
 {
 this.x = function(val)
 {
 return validate(2, 'on_x', 'drag', val);
 };
 this.y = function(val)
 {
 return validate(2, 'on_y', 'drag', val);
 };
 }
 this.on = new drag_on();
 }
 function can_resize()
 {
 this.enabled = function(val)
 {
 return validate(1, 'can_resize', null, val);
 };
 this.widget = function(val)
 {
 return validate(1, 'can_resize_widget', null, val);
 };
 function resize_on()
 {
 this.x = function(val)
 {
 return validate(2, 'on_x', 'resize', val);
 };
 this.y = function(val)
 {
 return validate(2, 'on_y', 'resize', val);
 };
 }
 this.on = new resize_on();
 }
 var __action_settings = new action_settings_object();
 this.can_drag = new can_drag();
 this.can_resize = new can_resize();
 }
 function data()
 {
 function window()
 {
 var __content = '';
 this.content = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __content;
 __content = val;
 if (!ui_objects.window.content.data)
 return false;
 ui_objects.window.content.data.innerHTML = val;
 bee_statuses.content_changed(true);
 morpheus.execute(my_bee_id, 'gui', 'content_changed');
 bee_statuses.content_changed(false);
 return true;
 };
 function labels()
 {
 var __title = '',
 __status_bar = '';
 this.title = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __title;
 __title = val;
 if (!ui_objects.window.control_bar.title)
 return false;
 ui_objects.window.control_bar.title.innerHTML = val;
 bee_statuses.title_changed(true);
 morpheus.execute(my_bee_id, 'gui', 'title_changed');
 bee_statuses.title_changed(false);
 return true;
 };
 this.status_bar = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __status_bar;
 __status_bar = val;
 if (!ui_objects.window.status_bar.message)
 return false;
 ui_objects.window.status_bar.message.childNodes[1].innerHTML = val;
 if (self.settings.general.status_bar_marquee())
 {
 if (val.length * 11.0 >= utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width))
 ui_objects.window.status_bar.message.childNodes[1].classList.add('marquee');
 }
 bee_statuses.status_bar_label_changed(true);
 morpheus.execute(my_bee_id, 'gui', 'status_bar_label_changed');
 bee_statuses.status_bar_label_changed(false);
 return true;
 };
 }
 this.labels = new labels();
 }
 function casement()
 {
 var __data = '';
 this.content = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __data;
 __data = val;
 if (!ui_objects.casement.data)
 return false;
 ui_objects.casement.data.innerHTML = val;
 return true;
 };
 function labels()
 {
 var __title = '',
 __status = '';
 this.title = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __title;
 __title = val;
 if (!ui_objects.casement.title)
 return false;
 ui_objects.casement.title.innerHTML = val;
 return true;
 };
 this.status = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __status;
 __status = val;
 if (!ui_objects.casement.status)
 return false;
 ui_objects.casement.status.innerHTML = val;
 return true;
 };
 }
 this.labels = new labels();
 }
 function hints()
 {
 var __title = '',
 __content = '',
 __status_bar = '',
 __icon = '',
 __pencil = '',
 __close = '',
 __resize = '';
 this.title = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __title;
 __title = val;
 if (!ui_objects.window.control_bar.title)
 return false;
 ui_objects.window.control_bar.title.setAttribute('title', __title);
 return true;
 };
 this.content = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __content;
 __content = val;
 if (!ui_objects.window.content.data)
 return false;
 ui_objects.window.content.data.setAttribute('title', __content);
 return true;
 };
 this.status_bar = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __status_bar;
 __status_bar = val;
 if (!ui_objects.window.status_bar.message)
 return false;
 ui_objects.window.status_bar.message.setAttribute('title', __status_bar);
 return true;
 };
 this.icon = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __icon;
 __icon = val;
 if (!ui_objects.window.control_bar.icon)
 return false;
 ui_objects.window.control_bar.icon.setAttribute('title', __icon);
 return true;
 };
 this.pencil = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __pencil;
 __pencil = val;
 if (!ui_objects.window.control_bar.pencil)
 return false;
 ui_objects.window.control_bar.pencil.setAttribute('title', __pencil);
 return true;
 };
 this.close = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __close;
 __close = val;
 if (!ui_objects.window.control_bar.close)
 return false;
 ui_objects.window.control_bar.close.setAttribute('title', __close);
 return true;
 };
 this.resize = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __resize;
 __resize = val;
 if (!ui_objects.window.status_bar.resize)
 return false;
 ui_objects.window.status_bar.resize.setAttribute('title', __resize);
 return true;
 };
 }
 this.window = new window();
 this.casement = new casement();
 this.hints = new hints();
 }
 this.general = new general();
 this.actions = new actions();
 this.data = new data();
 }
 function status()
 {
 this.on_event = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.on_event();
 };
 function system_status()
 {
 this.initialized = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.initialized();
 };
 this.running = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.running();
 };
 this.active = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.active();
 };
 this.error = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.error();
 };
 this.in_hive = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.in_hive();
 };
 this.id_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.id_changed();
 };
 this.type_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.type_changed();
 };
 this.desktop_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.desktop_changed();
 };
 }
 function gui_status()
 {
 function position_status()
 {
 this.left = function()
 {
 if (is_init === false)
 return false;
 return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.left);
 };
 this.top = function()
 {
 if (is_init === false)
 return false;
 return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.top);
 };
 }
 function size_status()
 {
 this.width = function()
 {
 if (is_init === false)
 return false;
 return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width);
 };
 this.height = function()
 {
 if (is_init === false)
 return false;
 return utils_sys.graphics.pixels_value(ui_objects.window.ui.style.height);
 };
 }
 function fx_status()
 {
 function fading()
 {
 function into()
 {
 this.in_progress = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.fading_in();
 };
 this.finished = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.fading_in_finished();
 };
 }
 function out()
 {
 this.in_progress = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.fading_out();
 };
 this.finished = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.fading_out_finished();
 };
 }
 this.into = new into();
 this.out = new out();
 }
 function opacity()
 {
 this.changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.opacity_changed();
 };
 }
 this.fading = new fading();
 this.opacity = new opacity();
 }
 this.open = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.open();
 };
 this.opened = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.opened();
 };
 this.close = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.close();
 };
 this.closed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.closed();
 };
 this.minimize = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.minimize();
 };
 this.minimized = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.minimized();
 };
 this.restore = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.restore();
 };
 this.restored = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.restored();
 };
 this.maximize = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.maximize();
 };
 this.maximized = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.maximized();
 };
 this.topmost = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.topmost();
 };
 this.drag = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.drag();
 };
 this.dragging = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.dragging();
 };
 this.dragged = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.dragged();
 };
 this.resize = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.resize();
 };
 this.resizing = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.resizing();
 };
 this.resized = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.resized();
 };
 this.menu_activated = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.menu_activated();
 };
 this.casement_deployed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.casement_deployed();
 };
 this.casement_retracted = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.casement_retracted();
 };
 this.resize_enabled = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.resize_enabled();
 };
 this.title_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.title_changed();
 };
 this.status_bar_label_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.status_bar_label_changed();
 };
 this.content_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.content_changed();
 };
 this.mouse_clicked = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.mouse_clicked();
 };
 this.key_pressed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.key_pressed();
 };
 this.touch = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.touch();
 };
 this.touched = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.touched();
 };
 this.mouseclick = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.click();
 };
 this.mousedblclick = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.dblclick();
 };
 this.mousedown = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.mousedown();
 };
 this.mouseup = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.mouseup();
 };
 this.mouseover = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.mouseover();
 };
 this.mouseout = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.mouseout();
 };
 this.mousemove = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.mousemove();
 };
 this.keydown = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.keydown();
 };
 this.keyup = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.keyup();
 };
 this.keypress = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.keypress();
 };
 this.position = new position_status();
 this.size = new size_status();
 this.fx = new fx_status();
 }
 function data_status()
 {
 function labels_status()
 {
 this.title_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.title_changed();
 };
 this.status_bar_label_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.status_bar_label_changed();
 };
 }
 this.content_changed = function()
 {
 if (is_init === false)
 return false;
 return bee_statuses.content_changed();
 };
 this.labels = new labels_status();
 }
 this.system = new system_status();
 this.gui = new gui_status();
 this.data = new data_status();
 }
 function gui()
 {
 var me = this;
 function keys()
 {
 this.get = function(event_object)
 {
 if (is_init === false)
 return false;
 key_control.scan(event_object);
 bee_statuses.key_pressed(true);
 morpheus.execute(my_bee_id, 'gui', 'key_pressed');
 return key_control.get();
 };
 }
 function mouse()
 {
 function actual()
 {
 this.x = function()
 {
 if (is_init === false)
 return false;
 return utils_int.mouse_coords.actual.pos_x;
 };
 this.y = function()
 {
 if (is_init === false)
 return false;
 return utils_int.mouse_coords.actual.pos_y;
 };
 }
 function relative()
 {
 this.x = function()
 {
 if (is_init === false)
 return false;
 return utils_int.mouse_coords.relative.pos_x;
 };
 this.y = function()
 {
 if (is_init === false)
 return false;
 return utils_int.mouse_coords.relative.pos_y;
 };
 }
 this.actual = new actual();
 this.relative = new relative();
 }
 function position()
 {
 function pos_settings_object()
 {
 function limits()
 {
 this.left = 0;
 this.top = 0;
 this.right = window.innerWidth;
 this.bottom = window.innerHeight;
 this.z_index = 2147483641;
 }
 this.left = 0;
 this.top = 0;
 this.z_index = 0;
 this.topmost_z_index = 2147400000;
 this.limits = new limits();
 }
 function limits()
 {
 this.left = function(val)
 {
 return validate(2, 'left', 'right', val);
 };
 this.top = function(val)
 {
 return validate(2, 'top', 'bottom', val);
 };
 this.right = function(val)
 {
 return validate(2, 'right', 'left', val);
 };
 this.bottom = function(val)
 {
 return validate(2, 'bottom', 'top', val);
 };
 }
 function randomize_pos(position)
 {
 var __new_pos = Math.floor(position + (position * Math.random()));
 return __new_pos;
 }
 function validate(mode, position, limit, val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 {
 if (mode === 1)
 return __position_settings[position];
 else
 return __position_settings.limits[position];
 }
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 {
 error_code = self.error.codes.POSITION;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 if (limit === 'right' || limit === 'bottom')
 {
 if (!bee_statuses.running() && __is_static === false)
 {
 if (val >= (__position_settings.limits[limit] - val))
 val = val / 2;
 }
 else
 {
 if (val >= __position_settings.limits[limit])
 {
 error_code = self.error.codes.POSITION;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 }
 else if (limit === 'left' || limit === 'top')
 {
 if (val <= __position_settings.limits[limit])
 {
 error_code = self.error.codes.POSITION;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 else
 {
 if (limit === 'z_index')
 {
 if (val > __position_settings.limits[limit])
 {
 error_code = self.error.codes.POSITION;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 }
 if (mode === 1)
 __position_settings[position] = val;
 else
 __position_settings.limits[position] = val;
 return true;
 }
 this.left = function(val)
 {
 var __alt_val = val;
 if (!utils_sys.validation.misc.is_undefined(val))
 {
 if (!bee_statuses.running() && __is_static === false)
 __alt_val = randomize_pos(val);
 }
 return validate(1, 'left', 'right', __alt_val);
 };
 this.top = function(val)
 {
 var __alt_val = val;
 if (!utils_sys.validation.misc.is_undefined(val))
 {
 if (!bee_statuses.running() && __is_static === false)
 __alt_val = randomize_pos(val);
 }
 return validate(1, 'top', 'bottom', __alt_val);
 };
 this.z_index = function(val)
 {
 return validate(1, 'z_index', 'z_index', val);
 };
 this.topmost_z_index = function(val)
 {
 return validate(1, 'topmost_z_index', 'z_index', val);
 };
 this.static = function(val)
 {
 if (utils_sys.validation.misc.is_undefined(val))
 return __is_static;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __is_static = val;
 return true;
 };
 var __is_static = false,
 __position_settings = new pos_settings_object();
 this.limits = new limits();
 }
 function size()
 {
 function size_settings_object()
 {
 function min()
 {
 this.width = 260;
 this.height = 120;
 }
 function max()
 {
 this.width = 1200;
 this.height = 700;
 }
 this.width = 300;
 this.height = 220;
 this.min = new min();
 this.max = new max();
 }
 function validate(mode, type, size, limit, val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 {
 if (mode === 1)
 return __size_settings[size];
 else
 return __size_settings[limit][size];
 }
 if (!utils_sys.validation.numerics.is_integer(val) || val < 0)
 {
 error_code = self.error.codes.SIZE;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 if (mode === 1)
 {
 if (type === 1)
 {
 if (val < me.size.min.width() || (me.position.left() + val) > me.size.max.width())
 {
 error_code = self.error.codes.SIZE;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 else if (type === 2)
 {
 if (val < me.size.min.height() || (me.position.top() + val) > me.size.max.height())
 {
 error_code = self.error.codes.SIZE;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 }
 else if (mode === 2)
 {
 if (type === 1)
 {
 if (val < me.size.min.width() || val > me.size.width())
 {
 error_code = self.error.codes.SIZE;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 else if (type === 2)
 {
 if (val < me.size.min.height() || val > me.size.height())
 {
 error_code = self.error.codes.SIZE;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 }
 else if (mode === 3)
 {
 if (type === 1)
 {
 if (val < me.size.width())
 {
 error_code = self.error.codes.SIZE;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 else if (type === 2)
 {
 if (val < me.size.height())
 {
 error_code = self.error.codes.SIZE;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 return false;
 }
 }
 }
 if (mode === 1)
 __size_settings[size] = val;
 else
 __size_settings[limit][size] = val;
 return true;
 }
 this.width = function(val)
 {
 return validate(1, 1, 'width', null, val);
 };
 this.height = function(val)
 {
 return validate(1, 2, 'height', null, val);
 };
 function min()
 {
 this.width = function(val)
 {
 return validate(2, 1, 'width', 'min', val);
 };
 this.height = function(val)
 {
 return validate(2, 2, 'height', 'min', val);
 };
 }
 function max()
 {
 this.width = function(val)
 {
 return validate(3, 1, 'width', 'max', val);
 };
 this.height = function(val)
 {
 return validate(3, 2, 'height', 'max', val);
 };
 }
 var __size_settings = new size_settings_object();
 this.min = new min();
 this.max = new max();
 }
 function fx()
 {
 function fx_settings()
 {
 this.opacity = 1.0;
 function fade()
 {
 function into()
 {
 this.step = 0.00;
 this.speed = 0;
 this.delay = 0;
 }
 function out()
 {
 this.step = 0.00;
 this.speed = 0;
 this.delay = 0;
 }
 this.into = new into();
 this.out = new out();
 }
 this.fade = new fade();
 }
 function fx_enabled()
 {
 var __opacity_enabled = true;
 function fade_settings_object()
 {
 this.fade_in_enabled = false;
 this.fade_out_enabled = false;
 }
 function fade()
 {
 function validate(fx, val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __fade_settings[fx];
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __fade_settings[fx] = val;
 return true;
 }
 this.into = function(val)
 {
 return validate('fade_in_enabled', val);
 };
 this.out = function(val)
 {
 return validate('fade_out_enabled', val);
 };
 }
 this.all = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 {
 if (__opacity_enabled === true &&
 __fade_settings.fade_in_enabled === true &&
 __fade_settings.fade_out_enabled === true)
 return true;
 else
 return false;
 }
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __opacity_enabled = val;
 __fade_settings.fade_in_enabled = val;
 __fade_settings.fade_out_enabled = val;
 return true;
 };
 this.opacity = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __opacity_enabled;
 if (!utils_sys.validation.misc.is_bool(val))
 return false;
 __opacity_enabled = val;
 return true;
 };
 var __fade_settings = new fade_settings_object();
 this.fade = new fade();
 }
 function opacity()
 {
 function opacity_settings()
 {
 this.get = function()
 {
 if (is_init === false)
 return false;
 if (!me.fx.enabled.opacity())
 return false;
 return __fx_settings.opacity;
 };
 this.set = function(val)
 {
 if (is_init === false)
 return false;
 if (!utils_sys.validation.numerics.is_float(val) || val < 0.0 || val > 1.0)
 return false;
 me.fx.enabled.opacity(true);
 __fx_settings.opacity = val;
 bee_statuses.opacity_changed(true);
 morpheus.execute(my_bee_id, 'gui', 'opacity_changed');
 bee_statuses.opacity_changed(false);
 return true;
 };
 }
 this.apply = function()
 {
 if (is_init === false)
 return false;
 if (!me.fx.enabled.opacity())
 return false;
 gfx.opacity.apply(my_bee_id, __fx_settings.opacity);
 gfx.opacity.apply(ui_config.casement.id, __fx_settings.opacity);
 return true;
 };
 this.reset = function()
 {
 if (is_init === false)
 return false;
 if (!me.fx.enabled.opacity())
 return false;
 me.fx.enabled.opacity(false);
 gfx.opacity.reset(my_bee_id);
 gfx.opacity.reset(ui_config.casement.id);
 return true;
 };
 this.settings = new opacity_settings();
 }
 function fade()
 {
 var __fade_batch_array = [];
 function validate(mode, type, option, index, ssd_array)
 {
 if (is_init === false)
 return false;
 if (mode === 1)
 {
 me.fx.fade.settings[type].set(__fade_batch_array[index].step,
 __fade_batch_array[index].speed,
 __fade_batch_array[index].delay);
 me.fx.fade[type]();
 }
 else if (mode === 2)
 {
 if (!me.fx.enabled.fade[type]())
 return false;
 var __fading_type = null;
 if (type === 'into')
 __fading_type = 'fading_in';
 else
 __fading_type = 'fading_out';
 bee_statuses[__fading_type + '_finished'](false);
 bee_statuses[__fading_type](true);
 morpheus.execute(my_bee_id, 'gui', __fading_type);
 gfx.fade[type](my_bee_id, me.fx.fade.settings[type].get.last(1),
 me.fx.fade.settings[type].get.last(2), me.fx.fade.settings[type].get.last(3),
 function()
 {
 bee_statuses[__fading_type](false);
 bee_statuses[__fading_type + '_finished'](true);
 morpheus.execute(my_bee_id, 'gui', __fading_type + '_finished');
 });
 return true;
 }
 else if (mode === 3)
 {
 me.fx.enabled.fade[type](true);
 __fx_settings.fade[type].step = ssd_array[0];
 __fx_settings.fade[type].speed = ssd_array[1];
 __fx_settings.fade[type].delay = ssd_array[2];
 }
 else if (mode === 4)
 {
 var i = 0,
 __loops = 0;
 if (!me.fx.enabled.fade[type]())
 return false;
 if (__fade_batch_array.length === 0)
 return false;
 if (utils_sys.validation.misc.is_undefined(option) && utils_sys.validation.misc.is_undefined(index))
 {
 var __this_fade_batch_array = [];
 __loops = __fade_batch_array.length;
 for (i = 0; i < __loops; i++)
 {
 if (__fade_batch_array[i].type === type)
 __this_fade_batch_array.push(__fade_batch_array[i]);
 }
 return __this_fade_batch_array;
 }
 if (!utils_sys.validation.numerics.is_integer(option) || option < 1 || option > 3 ||
 !utils_sys.validation.misc.is_undefined(index) && (!utils_sys.validation.numerics.is_integer(index) || index < 0))
 return false;
 if (utils_sys.validation.misc.is_undefined(index))
 index = 0;
 __loops = __fade_batch_array.length;
 for (i = index; i < __loops; i++)
 {
 if (__fade_batch_array[i].type === type)
 {
 if (option === 1)
 return __fade_batch_array[i].step;
 else if (option === 2)
 return __fade_batch_array[i].speed;
 else
 return __fade_batch_array[i].delay;
 }
 }
 return false;
 }
 else if (mode === 5)
 {
 if (!me.fx.enabled.fade[type]())
 return false;
 if (__fade_batch_array.length === 0)
 return false;
 if (!utils_sys.validation.numerics.is_integer(option) || option < 1 || option > 3)
 return false;
 if (option === 1)
 return __fx_settings.fade[type].step;
 else if (option === 2)
 return __fx_settings.fade[type].speed;
 else
 return __fx_settings.fade[type].delay;
 }
 else
 {
 var __fade_settings = utils_int.fade_settings;
 if (utils_sys.validation.misc.is_undefined(ssd_array[0]) ||
 utils_sys.validation.misc.is_undefined(ssd_array[1]) ||
 utils_sys.validation.misc.is_undefined(ssd_array[2]))
 return false;
 if ((!utils_sys.validation.numerics.is_float(ssd_array[0]) || ssd_array[0] < 0.0 || ssd_array[0] > 1.0) ||
 (!utils_sys.validation.numerics.is_integer(ssd_array[1]) || ssd_array[1] < 0) ||
 (!utils_sys.validation.numerics.is_integer(ssd_array[2]) || ssd_array[2] < 0))
 return false;
 __fx_settings.fade[type].step = ssd_array[0];
 __fx_settings.fade[type].speed = ssd_array[1];
 __fx_settings.fade[type].delay = ssd_array[2];
 __fade_settings.type = type;
 __fade_settings.step = ssd_array[0];
 __fade_settings.speed = ssd_array[1];
 __fade_settings.delay = ssd_array[2];
 __fade_batch_array.push(__fade_settings);
 me.fx.enabled.fade[type](true);
 return true;
 }
 return false;
 }
 function fade_settings()
 {
 this.batch = function(type, step, speed, delay)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(type) || !utils_sys.validation.alpha.is_string(type) ||
 (!utils_sys.validation.numerics.is_float(step) || step < 0.0 || step > 1.0) ||
 (!utils_sys.validation.numerics.is_integer(speed) || speed < 0) ||
 (!utils_sys.validation.numerics.is_integer(delay) || delay < 0))
 return false;
 var __fade_settings = utils_int.fade_settings,
 __ssd_aray = [step, speed, delay];
 if (type === 'into')
 validate(3, type, null, null, __ssd_aray);
 else if (type === 'out')
 validate(3, type, null, null, __ssd_aray);
 else
 return false;
 __fade_settings.type = type;
 __fade_settings.step = step;
 __fade_settings.speed = speed;
 __fade_settings.delay = delay;
 __fade_batch_array.push(__fade_settings);
 return true;
 };
 function into()
 {
 function get()
 {
 this.from = function(option, index)
 {
 return validate(4, 'into', option, index);
 };
 this.last = function(option)
 {
 return validate(5, 'into', option);
 };
 }
 this.set = function(step, speed, delay)
 {
 var __ssd_aray = [step, speed, delay];
 return validate(6, 'into', null, null, __ssd_aray);
 };
 this.get = new get();
 }
 function out()
 {
 function get()
 {
 this.from = function(option, index)
 {
 return validate(4, 'out', option, index);
 };
 this.last = function(option)
 {
 return validate(5, 'out', option);
 };
 }
 this.set = function(step, speed, delay)
 {
 var __ssd_aray = [step, speed, delay];
 return validate(6, 'out', null, null, __ssd_aray);
 };
 this.get = new get();
 }
 this.into = new into();
 this.out = new out();
 }
 this.batch = function()
 {
 if (is_init === false)
 return false;
 var __batch_num = __fade_batch_array.length;
 if (__batch_num === 0)
 return false;
 for (var i = 0; i < __batch_num; i++)
 {
 if (__fade_batch_array[i].type === 'into')
 validate(1, 'into', null, i);
 else if (__fade_batch_array[i].type === 'out')
 validate(1, 'out', null, i);
 else
 return false;
 }
 return true;
 };
 this.into = function()
 {
 return validate(2, 'into');
 };
 this.out = function()
 {
 return validate(2, 'out');
 };
 this.settings = new fade_settings();
 }
 var __fx_settings = new fx_settings();
 this.enabled = new fx_enabled();
 this.opacity = new opacity();
 this.fade = new fade();
 }
 function css()
 {
 function validate(type, context, sub_context, option, val)
 {
 function sub_context_css_object(mode)
 {
 if (context === 'window' || context === 'casement')
 return false;
 if (sub_context === null || utils_sys.validation.misc.is_undefined(sub_context))
 return true;
 if (!ui_config[context][mode].hasOwnProperty(sub_context))
 __css_object = null;
 else
 {
 if (type === 2)
 mode = 'ids';
 __css_object = utils_sys.objects.by_id(ui_config[context][mode][sub_context]);
 }
 return true;
 }
 if (!ui_config.hasOwnProperty(context))
 return false;
 if ((context === 'window' || context === 'casement') &&
 (!utils_sys.validation.misc.is_undefined(sub_context) && sub_context !== null))
 return false;
 var __css_object = utils_sys.objects.by_id(ui_config[context].id);
 if (type === 1)
 sub_context_css_object('ids');
 else
 sub_context_css_object('classes');
 if (__css_object === null)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 {
 if (type === 1)
 {
 if (utils_sys.validation.misc.is_undefined(option))
 return __css_object.style;
 return __css_object.style[option];
 }
 else
 return __css_object.className;
 }
 if (type === 1)
 __css_object.style[option] = val;
 else
 __css_object.className = val;
 return true;
 }
 function style()
 {
 this.get = function(context, sub_context, option)
 {
 if (!bee_statuses.running())
 return false;
 if (!utils_sys.validation.alpha.is_string(context) ||
 (!utils_sys.validation.misc.is_undefined(sub_context) && !utils_sys.validation.alpha.is_string(sub_context)) ||
 (!utils_sys.validation.misc.is_undefined(option) && !utils_sys.validation.alpha.is_string(option)))
 return false;
 return validate(1, context, sub_context, option);
 };
 this.set = function(context, sub_context, option, val)
 {
 if (!bee_statuses.running())
 return false;
 if (!utils_sys.validation.alpha.is_string(context)||
 (sub_context !== null && !utils_sys.validation.alpha.is_string(sub_context)) ||
 (option !== null && !utils_sys.validation.alpha.is_string(option)) ||
 !utils_sys.validation.alpha.is_string(val))
 return false;
 return validate(1, context, sub_context, option, val);
 };
 }
 function class_name()
 {
 this.get = function(context, sub_context)
 {
 if (!bee_statuses.running())
 return false;
 if (!utils_sys.validation.alpha.is_string(context) ||
 (!utils_sys.validation.misc.is_undefined(sub_context) && !utils_sys.validation.alpha.is_string(sub_context)))
 return false;
 return validate(2, context, sub_context);
 };
 this.set = function(context, sub_context, val)
 {
 if (!bee_statuses.running())
 return false;
 if (!utils_sys.validation.alpha.is_string(context)||
 (sub_context !== null && !utils_sys.validation.alpha.is_string(sub_context)) ||
 !utils_sys.validation.alpha.is_string(val))
 return false;
 return validate(2, context, sub_context, null, val);
 };
 }
 this.style = new style();
 this.class_name = new class_name();
 }
 function actions()
 {
 function menu()
 {
 this.open = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (bee_statuses.menu_activated())
 return false;
 if (event_object === null || event_object.buttons === 0 && utils_int.last_mouse_button() === 1)
 {
 gfx.visibility.toggle(ui_config.window.menu.id, 1);
 bee_statuses.menu_activated(true);
 self.settings.actions.can_drag.enabled(true);
 morpheus.execute(my_bee_id, 'gui', 'menu_activated');
 return true;
 }
 return false;
 };
 this.close = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (!bee_statuses.menu_activated())
 return false;
 if (event_object === null || navigator.maxTouchPoints > 0 || event_object.buttons === 1)
 {
 gfx.visibility.toggle(ui_config.window.menu.id, 1);
 bee_statuses.menu_activated(false);
 return true;
 }
 return false;
 };
 }
 function casement()
 {
 var __is_animating = false;
 function execute_commands(callback)
 {
 if (!utils_sys.validation.misc.is_undefined(callback))
 callback.call();
 return true;
 }
 this.deploy = function(event_object, callback)
 {
 function animate_casement()
 {
 __is_animating = true;
 gfx.visibility.toggle(ui_config.casement.id, 1);
 gfx.animation.roll(ui_config.casement.id, 1, 'right', __casement_width, __casement_offset, __speed, __step,
 function()
 {
 bee_statuses.casement_deployed(true);
 bee_statuses.casement_retracted(false);
 __is_animating = false;
 execute_commands(callback);
 morpheus.execute(my_bee_id, 'gui', 'casement_deployed');
 });
 return true;
 }
 if (is_init === false)
 return false;
 if (bee_statuses.in_hive())
 return false;
 if (__is_animating === true || !self.settings.actions.can_use_casement())
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object) ||
 !utils_sys.validation.misc.is_undefined(callback) && !utils_sys.validation.misc.is_function(callback))
 return false;
 var __window_pos_x = me.position.left(),
 __window_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width),
 __casement = ui_objects.casement.ui,
 __casement_width = utils_sys.graphics.pixels_value(__casement.style.width),
 __casement_offset = __window_width - __casement_width,
 __step = Math.ceil(__casement_width / 23),
 __speed = Math.ceil(__step / 3);
 if ((__window_pos_x + __window_width + __casement_width) >= swarm.settings.right())
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(xenon.load('os_name'), 'The casement can not be opened here as it overflows your screen!');
 return false;
 }
 ui_objects.window.ui.classList.add('gui_casement_open');
 __casement.style.left = __window_pos_x + 'px';
 if (self.status.gui.fx.fading.into.finished())
 animate_casement();
 else
 setTimeout(function() { animate_casement(); }, utils_int.animating_events.duration());
 if (self.settings.actions.can_use_menu())
 ui_objects.window.menu.manage_casement.innerHTML = 'Hide casement';
 return true;
 };
 this.retract = function(event_object, callback)
 {
 function animate_casement()
 {
 __is_animating = true;
 gfx.animation.roll(ui_config.casement.id, 1, 'left', __casement_width, 0, __speed, __step,
 function()
 {
 gfx.visibility.toggle(ui_config.casement.id, 1);
 ui_objects.window.ui.classList.remove('gui_casement_open');
 __is_animating = false;
 bee_statuses.casement_deployed(false);
 bee_statuses.casement_retracted(true);
 execute_commands(callback);
 morpheus.execute(my_bee_id, 'gui', 'casement_retracted');
 });
 }
 if (is_init === false)
 return false;
 if (__is_animating === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object) ||
 !utils_sys.validation.misc.is_undefined(callback) && !utils_sys.validation.misc.is_function(callback))
 return false;
 var __casement = ui_objects.casement.ui,
 __casement_width = utils_sys.graphics.pixels_value(__casement.style.width),
 __step = Math.ceil(__casement_width / 23),
 __speed = Math.ceil(__step / 3);
 if (!bee_statuses.casement_deployed())
 execute_commands(callback);
 else
 animate_casement();
 if (self.settings.actions.can_use_menu())
 ui_objects.window.menu.manage_casement.innerHTML = 'Show casement';
 return true;
 };
 this.toggle = function(event_object, callback)
 {
 if (is_init === false)
 return false;
 self.gui.actions.casement.retract(event_object, callback);
 self.gui.actions.casement.deploy(event_object, callback);
 return true;
 };
 }
 function hover()
 {
 this.into = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 return true;
 };
 this.out = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (!bee_statuses.dragging())
 bee_statuses.active(false);
 return true;
 };
 }
 this.edit_title = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object) || bee_statuses.close())
 return false;
 if (event_object === null || event_object.buttons === 1)
 {
 utils_int.edit_win_title();
 return true;
 }
 return false;
 };
 this.show = function(child_bees = [], headless = false)
 {
 if (is_init === false)
 return false;
 if (error_code !== null)
 return false;
 if (!utils_sys.validation.misc.is_array(child_bees))
 return false;
 var __child_bee = null;
 for (__child_bee in child_bees)
 {
 if (!colony.is_bee(__child_bee))
 {
 owl.status.applications.set(my_bee_id, __app_id, 'FAIL');
 utils_int.log('Run', 'INVALID CHILD BEES');
 return false;
 }
 }
 if (!utils_sys.validation.misc.is_bool(headless))
 return false;
 if (bee_statuses.running())
 return false;
 if (!swarm.bees.insert(self))
 return false;
 if (utils_int.is_lonely_bee(my_bee_id))
 return false;
 var __app_id = self.settings.general.app_id(),
 __is_running_instance = owl.status.applications.get.by_proc_id(__app_id, 'RUN');
 if (__is_running_instance)
 {
 if (colony.is_single_instance(__app_id))
 return false;
 }
 if (headless === false)
 {
 if (!utils_int.gui_init())
 {
 owl.status.applications.set(my_bee_id, __app_id, 'FAIL');
 utils_int.log('Show', 'ERROR');
 return false;
 }
 }
 bee_statuses.running(true);
 bee_statuses.active(true);
 morpheus.execute(my_bee_id, 'system', 'running');
 for (__child_bee in child_bees)
 __child_bee.show();
 owl.status.applications.set(my_bee_id, __app_id, 'RUN');
 if (headless === false)
 utils_int.log('Show', 'OK');
 return true;
 };
 this.close = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 function remove_me(this_object)
 {
 var __honeycomb_id = hive.status.bees.honeycomb_id(my_bee_id);
 error_code = null;
 morpheus.execute(my_bee_id, 'gui', 'closed');
 morpheus.clear(my_bee_id);
 bee_statuses.error(false);
 bee_statuses.running(false);
 bee_statuses.closed(true);
 swarm.settings.active_bee(null);
 utils_int.remove_bee();
 if (!swarm.bees.remove(this_object))
 return false;
 if (bee_statuses.in_hive())
 {
 if (!hive.stack.bees.remove(this_object, __honeycomb_id))
 return false;
 }
 dock.instances.decrease(__app_id);
 return true;
 }
 if ((event_object === null || event_object.buttons === 1) && bee_statuses.opened() && !bee_statuses.close())
 {
 var __app_id = self.settings.general.app_id();
 if (!self.settings.actions.can_close())
 return false;
 bee_statuses.opened(false);
 bee_statuses.close(true);
 bee_statuses.dragging(false);
 if (bee_statuses.in_hive())
 ui_objects.casement.ui.style.visibility = 'hidden';
 owl.status.applications.set(my_bee_id, __app_id, 'END');
 me.actions.casement.retract(event_object,
 function()
 {
 var __child_bee = null;
 for (__child_bee in my_child_bees)
 __child_bee.quit(null);
 try
 {
 morpheus.execute(my_bee_id, 'gui', 'close');
 }
 catch
 {
 }
 if (utils_int.animating_events.in_progress())
 setTimeout(function() { remove_me(self); }, utils_int.animating_events.duration());
 else
 remove_me(self);
 });
 return true;
 }
 return false;
 };
 this.minimize = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (event_object === null || event_object.buttons === 1)
 {
 bee_statuses.minimize(true);
 bee_statuses.minimized(true);
 bee_statuses.restore(false);
 bee_statuses.restored(false);
 bee_statuses.maximize(false);
 bee_statuses.maximized(false);
 bee_statuses.dragging(false);
 bee_statuses.resizing(false);
 morpheus.execute(my_bee_id, 'gui', 'minimize');
 morpheus.execute(my_bee_id, 'gui', 'minimized');
 return true;
 }
 return false;
 };
 this.restore = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (event_object === null || event_object.buttons === 1)
 {
 bee_statuses.restore(true);
 bee_statuses.restored(true);
 bee_statuses.minimize(false);
 bee_statuses.minimized(false);
 bee_statuses.dragging(false);
 bee_statuses.resizing(false);
 morpheus.execute(my_bee_id, 'gui', 'restore');
 morpheus.execute(my_bee_id, 'gui', 'restored');
 return true;
 }
 return false;
 };
 this.maximize = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (event_object === null || event_object.buttons === 1)
 {
 bee_statuses.maximize(true);
 bee_statuses.maximized(true);
 bee_statuses.minimize(false);
 bee_statuses.minimized(false);
 bee_statuses.restore(false);
 bee_statuses.restored(false);
 bee_statuses.dragging(false);
 bee_statuses.resizing(false);
 morpheus.execute(my_bee_id, 'gui', 'maximize');
 morpheus.execute(my_bee_id, 'gui', 'maximized');
 return true;
 }
 return false;
 };
 this.set_top = function()
 {
 if (is_init === false)
 return false;
 var __z_index = swarm.status.z_index();
 swarm.settings.z_index(__z_index + 2);
 if (bee_statuses.topmost())
 {
 var __new_topmost_z_index = me.position.topmost_z_index() + __z_index;
 me.position.topmost_z_index(__new_topmost_z_index);
 me.position.z_index(__new_topmost_z_index + 2);
 utils_int.set_z_index(__new_topmost_z_index);
 }
 else
 {
 me.position.z_index(__z_index + 2);
 utils_int.set_z_index(__z_index);
 }
 return true;
 };
 this.touch = function()
 {
 if (is_init === false)
 return false;
 if (bee_statuses.fading_in() || bee_statuses.fading_out() || bee_statuses.close())
 return false;
 bee_statuses.touch(true);
 bee_statuses.touched(false);
 bee_statuses.mouse_clicked(true);
 bee_statuses.active(true);
 morpheus.execute(my_bee_id, 'system', 'active');
 morpheus.execute(my_bee_id, 'gui', 'touch');
 morpheus.execute(my_bee_id, 'gui', 'mouse_clicked');
 if (bee_statuses.topmost())
 return true;
 me.actions.set_top();
 return true;
 };
 this.dresize = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object) || bee_statuses.title_on_edit() || bee_statuses.close())
 return false;
 if (navigator.maxTouchPoints === 0 && event_object.buttons !== 1)
 return false;
 if (bee_statuses.drag() && self.settings.actions.can_drag.enabled())
 {
 var __pos_x = me.position.left() + (swarm.area.mouse.x() - me.mouse.relative.x()),
 __pos_y = me.position.top() + (swarm.area.mouse.y() - me.mouse.relative.y()),
 __current_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width),
 __current_height = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.height),
 __casement_width = utils_sys.graphics.pixels_value(ui_objects.casement.ui.style.width),
 __dynamic_casement_width = 0,
 __dynamic_right_pos = 0;
 bee_statuses.mouse_clicked(true);
 bee_statuses.dragging(true);
 if (bee_statuses.casement_deployed())
 __dynamic_casement_width = __casement_width + 2;
 if (__pos_x <= 0 && __pos_y <= 0)
 {
 ui_objects.window.ui.style.left = '0px';
 ui_objects.window.ui.style.top = '0px';
 ui_objects.casement.ui.style.left = __current_width + 'px';
 ui_objects.casement.ui.style.top = '0px';
 }
 else
 {
 if (__pos_x <= 0)
 {
 ui_objects.window.ui.style.left = '0px';
 ui_objects.window.ui.style.top = __pos_y + 'px';
 ui_objects.casement.ui.style.left = __current_width + 'px';
 ui_objects.casement.ui.style.top = __pos_y + 'px';
 }
 if (__pos_y <= 0)
 {
 ui_objects.window.ui.style.left = __pos_x + 'px';
 ui_objects.window.ui.style.top = '0px';
 ui_objects.casement.ui.style.left = __pos_x + __current_width + 'px';
 ui_objects.casement.ui.style.top = '0px';
 }
 }
 if (((__pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x()) >=
 (swarm.settings.right() - swarm.area.mouse.x())) &&
 ((__pos_y + __current_height - swarm.area.mouse.y()) >=
 (swarm.settings.bottom() - swarm.area.mouse.y())))
 {
 ui_objects.window.ui.style.left =
 swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
 ui_objects.window.ui.style.top =
 swarm.settings.bottom() - __current_height + 'px';
 ui_objects.casement.ui.style.left =
 swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
 ui_objects.casement.ui.style.top =
 swarm.settings.bottom() - __current_height + 'px';
 }
 else
 {
 if ((__pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x()) >=
 (swarm.settings.right() - swarm.area.mouse.x()))
 {
 if (__pos_y <= 0)
 {
 ui_objects.window.ui.style.left =
 swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
 ui_objects.window.ui.style.top = '0px';
 ui_objects.casement.ui.style.left =
 swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
 ui_objects.casement.ui.style.top = '0px';
 }
 else
 {
 ui_objects.window.ui.style.left =
 swarm.settings.right() - (__current_width + __dynamic_casement_width) + 'px';
 ui_objects.window.ui.style.top = __pos_y + 'px';
 ui_objects.casement.ui.style.left =
 swarm.settings.right() - __dynamic_casement_width + 2 + 'px';
 ui_objects.casement.ui.style.top = __pos_y + 'px';
 }
 }
 if ((__pos_y + __current_height - swarm.area.mouse.y()) >=
 (swarm.settings.bottom() - swarm.area.mouse.y()))
 {
 if (__pos_x <= 0)
 {
 ui_objects.window.ui.style.left = '0px';
 ui_objects.window.ui.style.top =
 swarm.settings.bottom() - __current_height + 'px';
 ui_objects.casement.ui.style.left = __current_width + 'px';
 ui_objects.casement.ui.style.top = swarm.settings.bottom() - __current_height + 'px';
 }
 else
 {
 ui_objects.window.ui.style.left = __pos_x + 'px';
 ui_objects.window.ui.style.top =
 swarm.settings.bottom() - __current_height + 'px';
 ui_objects.casement.ui.style.left = __pos_x + __current_width + 'px';
 ui_objects.casement.ui.style.top = swarm.settings.bottom() - __current_height + 'px';
 }
 }
 }
 if (bee_statuses.casement_deployed())
 __dynamic_right_pos = __pos_x + __current_width + __dynamic_casement_width - swarm.area.mouse.x();
 else
 __dynamic_right_pos = __pos_x + __current_width - swarm.area.mouse.x();
 if (__pos_x > 0 && __pos_y > 0 &&
 ((__dynamic_right_pos <
 (swarm.settings.right() - swarm.area.mouse.x())) &&
 ((__pos_y + __current_height - swarm.area.mouse.y()) <
 (swarm.settings.bottom() - swarm.area.mouse.y()))))
 {
 ui_objects.window.ui.style.left = __pos_x + 'px';
 ui_objects.window.ui.style.top = __pos_y + 'px';
 ui_objects.casement.ui.style.left = __pos_x + __current_width + 'px';
 ui_objects.casement.ui.style.top = __pos_y + 'px';
 }
 morpheus.execute(my_bee_id, 'gui', 'mouse_clicked');
 morpheus.execute(my_bee_id, 'gui', 'dragging');
 }
 else if (bee_statuses.resize() && self.settings.actions.can_resize.enabled() && !bee_statuses.casement_deployed())
 {
 var __size_x = 0,
 __size_y = 0,
 __resize_x_offset = utils_sys.graphics.pixels_value(ui_objects.window.status_bar.resize.style.width),
 __resize_y_offset = utils_sys.graphics.pixels_value(ui_objects.window.status_bar.resize.style.height),
 __resize_title_diff = 100,
 __resize_data_diff = 88,
 __resize_status_msg_diff = 50;
 __size_x = swarm.area.mouse.x() - me.position.left() -
 me.size.width() + __resize_x_offset;
 __size_y = swarm.area.mouse.y() - me.position.top() -
 me.size.height() + __resize_y_offset;
 if (__size_x < (swarm.settings.right() -
 me.position.left() - me.size.width()) &&
 __size_y < (swarm.settings.bottom() -
 me.position.top() - me.size.height()))
 {
 var __new_width = me.size.width() + __size_x,
 __new_height = me.size.height() + __size_y;
 bee_statuses.mouse_clicked(true);
 bee_statuses.resizing(true);
 if (__new_width >= me.size.max.width() && __new_height >= me.size.max.height())
 {
 if (__new_width - __size_x >= me.size.max.width() &&
 __new_height - __size_y >= me.size.max.height())
 {
 ui_objects.window.ui.style.width = me.size.max.width() + 'px';
 ui_objects.window.ui.style.height = me.size.max.height() + 'px';
 ui_objects.window.control_bar.title.style.width =
 me.size.max.width() - __resize_title_diff + 'px';
 ui_objects.window.content.data.style.height =
 me.size.max.height() - __resize_data_diff + 'px';
 ui_objects.window.status_bar.message.style.width =
 me.size.max.width() - __resize_status_msg_diff + 'px';
 ui_objects.casement.data.style.height =
 me.size.height() + 'px';
 }
 }
 else
 {
 if (__new_width >= me.size.max.width())
 {
 if (__new_width - __size_x >= me.size.max.width())
 {
 ui_objects.window.ui.style.width = me.size.max.width() + 'px';
 ui_objects.window.ui.style.height = __new_height + 'px';
 ui_objects.window.control_bar.title.style.width =
 me.size.max.width() - __resize_title_diff + 'px';
 ui_objects.window.content.data.style.height =
 __new_height - __resize_data_diff + 'px';
 ui_objects.window.status_bar.message.style.width =
 me.size.max.width() - __resize_status_msg_diff + 'px';
 ui_objects.casement.data.style.height =
 __new_height + 'px';
 }
 }
 if (__new_height >= me.size.max.height())
 {
 if (__new_height - __size_y >= me.size.max.height())
 {
 ui_objects.window.ui.style.width = __new_width + 'px';
 ui_objects.window.ui.style.height = me.size.max.height() + 'px';
 ui_objects.window.control_bar.title.style.width =
 __new_width - __resize_title_diff + 'px';
 ui_objects.window.content.data.style.height =
 me.size.max.height() - __resize_data_diff + 'px';
 ui_objects.window.status_bar.message.style.width =
 __new_width - __resize_status_msg_diff + 'px';
 ui_objects.casement.data.style.height =
 me.size.height() + 'px';
 }
 }
 }
 if (__new_width <= me.size.min.width() &&
 __new_height <= me.size.min.height())
 {
 if (__size_x >= 0 && __size_y >= 0)
 {
 ui_objects.window.ui.style.width = me.size.min.width() + 'px';
 ui_objects.window.ui.style.height = me.size.min.height() + 'px';
 ui_objects.window.control_bar.title.style.width =
 me.size.min.width() - __resize_title_diff + 'px';
 ui_objects.window.content.data.style.height =
 me.size.min.height() - __resize_data_diff + 'px';
 ui_objects.window.status_bar.message.style.width =
 me.size.min.width() - __resize_status_msg_diff + 'px';
 ui_objects.casement.data.style.height =
 me.size.height() + 'px';
 }
 }
 else
 {
 if (__new_width <= me.size.min.width())
 {
 if (__size_x >= 0)
 {
 ui_objects.window.ui.style.width = me.size.min.width() + 'px';
 ui_objects.window.ui.style.height = __new_height + 'px';
 ui_objects.window.control_bar.title.style.width =
 me.size.min.width() - __resize_title_diff + 'px';
 ui_objects.window.content.data.style.height =
 __new_height - __resize_data_diff + 'px';
 ui_objects.window.status_bar.message.style.width =
 me.size.min.width() - __resize_status_msg_diff + 'px';
 ui_objects.casement.data.style.height =
 __new_height + 'px';
 }
 }
 if (__new_height <= me.size.min.height())
 {
 if (__size_y >= 0)
 {
 ui_objects.window.ui.style.width = __new_width + 'px';
 ui_objects.window.ui.style.height = me.size.min.height() + 'px';
 ui_objects.window.control_bar.title.style.width =
 __new_width - __resize_title_diff + 'px';
 ui_objects.window.content.data.style.height =
 me.size.min.height() - __resize_data_diff + 'px';
 ui_objects.window.status_bar.message.style.width =
 __new_width - __resize_status_msg_diff + 'px';
 ui_objects.casement.data.style.height =
 me.size.height() + 'px';
 }
 }
 }
 if (__new_width > me.size.min.width() && __new_height > me.size.min.height() &&
 __new_width < me.size.max.width() && __new_height < me.size.max.height())
 {
 ui_objects.window.ui.style.width = __new_width + 'px';
 ui_objects.window.ui.style.height = __new_height + 'px';
 ui_objects.window.control_bar.title.style.width =
 __new_width - __resize_title_diff + 'px';
 ui_objects.window.content.data.style.height =
 __new_height - __resize_data_diff + 'px';
 ui_objects.window.status_bar.message.style.width =
 __new_width - __resize_status_msg_diff + 'px';
 ui_objects.casement.data.style.height =
 __new_height + 'px';
 }
 var __final_window_width = utils_sys.graphics.pixels_value(ui_objects.window.ui.style.width);
 if (self.settings.general.status_bar_marquee())
 {
 if (self.settings.data.window.labels.status_bar().length * 9.0 <= __final_window_width)
 ui_objects.window.status_bar.message.childNodes[1].classList.remove('marquee');
 else
 ui_objects.window.status_bar.message.childNodes[1].classList.add('marquee');
 }
 var __casement_width_settings = self.settings.general.casement_width();
 if (__casement_width_settings[1] === 'relative')
 ui_objects.casement.ui.style.width = (__final_window_width * __casement_width_settings[0]) + 'px';
 else
 ui_objects.casement.ui.style.width = (self.gui.size.width() * __casement_width_settings[0]) + 'px';
 ui_objects.casement.ui.style.height = ui_objects.window.ui.style.height;
 ui_objects.casement.ui.style.left = me.position.left() + __final_window_width + 'px';
 }
 if (self.settings.general.resize_tooltip())
 swarm.resize_tooltip(self, true);
 morpheus.execute(my_bee_id, 'gui', 'mouse_clicked');
 morpheus.execute(my_bee_id, 'gui', 'resizing');
 hive.stack.toggle('off');
 }
 else
 {
 if (bee_statuses.resize() && bee_statuses.casement_deployed())
 hive.stack.toggle('off');
 return false;
 }
 return true;
 };
 this.release = function(event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (navigator.maxTouchPoints === 0 && event_object.buttons !== 0)
 return false;
 self.settings.actions.can_drag.enabled(true);
 if (!bee_statuses.close() && swarm.status.active_bee() === my_bee_id)
 {
 swarm.settings.active_bee(null);
 if (bee_statuses.dragging())
 bee_statuses.dragged(true);
 if (bee_statuses.resizing())
 bee_statuses.resized(true);
 bee_statuses.drag(false);
 bee_statuses.dragging(false);
 bee_statuses.touch(false);
 bee_statuses.touched(true);
 bee_statuses.mouse_clicked(false);
 swarm.resize_tooltip(self, false);
 morpheus.execute(my_bee_id, 'gui', 'touched');
 morpheus.execute(my_bee_id, 'gui', 'dragged');
 morpheus.execute(my_bee_id, 'gui', 'resized');
 me.position.left(utils_sys.graphics.pixels_value(ui_objects.window.ui.style.left));
 me.position.top(utils_sys.graphics.pixels_value(ui_objects.window.ui.style.top));
 return true;
 }
 bee_statuses.resizing(false);
 bee_statuses.resize(false);
 if (!self.settings.actions.can_close())
 bee_statuses.close(false);
 return false;
 };
 this.menu = new menu();
 this.casement = new casement();
 this.hover = new hover();
 }
 function config()
 {
 function window()
 {
 this.id = function()
 {
 return ui_config.window.id;
 };
 this.class_name = function()
 {
 return ui_config.window.class;
 };
 function control_bar()
 {
 this.id = function()
 {
 return ui_config.window.control_bar.id;
 };
 this.class_name = function()
 {
 return ui_config.window.control_bar.classes.container;
 };
 function icon()
 {
 this.id = function()
 {
 return ui_config.window.control_bar.ids.icon;
 };
 this.class_name = function()
 {
 return ui_config.window.control_bar.classes.icon;
 };
 }
 function title()
 {
 this.id = function()
 {
 return ui_config.window.control_bar.ids.title;
 };
 this.class_name = function()
 {
 return ui_config.window.control_bar.classes.title;
 };
 }
 function pencil()
 {
 this.id = function()
 {
 return ui_config.window.control_bar.ids.pencil;
 };
 this.class_name = function()
 {
 return ui_config.window.control_bar.classes.pencil;
 };
 }
 function separator()
 {
 this.id = function()
 {
 return ui_config.window.control_bar.ids.separator;
 };
 this.class_name = function()
 {
 return ui_config.window.control_bar.classes.separator;
 };
 }
 function close()
 {
 this.id = function()
 {
 return ui_config.window.control_bar.ids.close;
 };
 this.class_name = function()
 {
 return ui_config.window.control_bar.classes.close;
 };
 }
 this.icon = new icon();
 this.title = new title();
 this.pencil = new pencil();
 this.separator = new separator();
 this.close = new close();
 }
 function content()
 {
 this.id = function()
 {
 return ui_config.window.content.id;
 };
 this.class_name = function()
 {
 return ui_config.window.content.classes.container;
 };
 function data()
 {
 this.id = function()
 {
 return ui_config.window.content.ids.data;
 };
 this.class_name = function()
 {
 return ui_config.window.content.classes.data;
 };
 }
 this.data = new data();
 }
 function status_bar()
 {
 this.id = function()
 {
 return ui_config.window.status_bar.id;
 };
 this.class_name = function()
 {
 return ui_config.window.status_bar.classes.container;
 };
 function message()
 {
 this.id = function()
 {
 return ui_config.window.status_bar.ids.message;
 };
 this.class_name = function()
 {
 return ui_config.window.status_bar.classes.message;
 };
 }
 function resize()
 {
 this.id = function()
 {
 return ui_config.window.status_bar.ids.resize;
 };
 this.class_name = function()
 {
 return ui_config.window.status_bar.classes.resize;
 };
 }
 this.message = new message();
 this.resize = new resize();
 }
 this.control_bar = new control_bar();
 this.content = new content();
 this.status_bar = new status_bar();
 }
 function casement()
 {
 this.id = function()
 {
 return ui_config.casement.id;
 };
 this.class_name = function()
 {
 return ui_config.casement.classes.container;
 };
 function title()
 {
 this.id = function()
 {
 return ui_config.casement.ids.title;
 };
 this.class_name = function()
 {
 return ui_config.casement.classes.title;
 };
 }
 function content()
 {
 this.id = function()
 {
 return ui_config.casement.ids.data;
 };
 this.class_name = function()
 {
 return ui_config.casement.classes.data;
 };
 }
 function status()
 {
 this.id = function()
 {
 return ui_config.casement.ids.status;
 };
 this.class_name = function()
 {
 return ui_config.casement.classes.status;
 };
 }
 this.title = new title();
 this.content = new content();
 this.status = new status();
 }
 this.window = new window();
 this.casement = new casement();
 }
 this.keys = new keys();
 this.mouse = new mouse();
 this.position = new position();
 this.size = new size();
 this.fx = new fx();
 this.css = new css();
 this.actions = new actions();
 this.config = new config();
 }
 function drone()
 {
 var __drones = [];
 function drone_object()
 {
 this.name = null;
 this.code = null;
 }
 this.use = function(new_func_name, new_func_code)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(new_func_name) || utils_sys.validation.misc.is_undefined(new_func_code))
 return false;
 var __new_drone = new drone_object();
 __new_drone.name = new_func_name;
 __new_drone.code = new_func_code;
 __drones.push(__new_drone);
 return true;
 };
 this.execute = function(existing_func_name, dynamic_func_args)
 {
 if (is_init === false)
 return false;
 if (!utils_sys.validation.alpha.is_string(existing_func_name) ||
 (!utils_sys.validation.misc.is_undefined(dynamic_func_args) && !utils_sys.validation.misc.is_array(dynamic_func_args)))
 return false;
 var __drones_num = __drones.length;
 for (var i = 0; i < __drones_num; i++)
 {
 if (__drones[i].name === existing_func_name)
 {
 var __dynamic_func = null;
 if (utils_sys.validation.alpha.is_string(__drones[i].code))
 __dynamic_func = function() { eval(__drones[i].code); };
 else
 __dynamic_func = function() { __drones[i].code.call(); };
 __dynamic_func.call(this, dynamic_func_args);
 return true;
 }
 }
 return false;
 };
 }
 this.on = function(this_event, cmd)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(this_event) || utils_sys.validation.misc.is_undefined(cmd))
 return false;
 var __context_list = new events_status_settings_model(),
 __context = null;
 for (__context in __context_list)
 {
 if (__context === 'on_event')
 continue;
 if (bee_events.contains(this_event, __context))
 {
 var __event_receiver_object = document,
 __cmd = cmd;
 if (__context === 'mouse')
 __event_receiver_object = ui_objects.window.ui;
 else if (__context === 'key')
 {
 var __exended_cmd = function()
 {
 if (bee_statuses.active())
 cmd.call();
 };
 __cmd = __exended_cmd;
 }
 morpheus.store(my_bee_id, __context, this_event, __cmd, __event_receiver_object);
 return true;
 }
 }
 return false;
 };
 this.run = function(child_bees = [], headless = false)
 {
 if (is_init === false)
 return false;
 if (error_code !== null)
 return false;
 var __app_id = self.settings.general.app_id(),
 __all_bees = colony.list(),
 __this_bee = null,
 __max_allowed_instances = self.settings.general.allowed_instances(),
 __currrent_running_instances_num = 0;
 if (__max_allowed_instances > 0)
 {
 for (__this_bee of __all_bees)
 {
 if (__this_bee.settings.general.app_id() === __app_id)
 {
 __currrent_running_instances_num++;
 if (__currrent_running_instances_num > __max_allowed_instances - 1)
 {
 error_code = self.error.codes.INSTANCE_NUM_LIMIT;
 owl.status.applications.set(my_bee_id, self.settings.general.app_id(), 'FAIL');
 bee_statuses.error(true);
 utils_int.log('Run', 'INSTANCES LIMIT');
 return false;
 }
 }
 }
 }
 if (!self.gui.actions.show(child_bees, headless))
 return false;
 dock.instances.increase(__app_id);
 my_child_bees = child_bees;
 utils_int.log('Run', 'OK');
 return true;
 };
 this.quit = function()
 {
 if (is_init === false)
 return false;
 return self.gui.actions.close(null);
 };
 this.init = function(bee_id, icon = null)
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 if (utils_sys.validation.misc.is_undefined(bee_id) || !self.settings.general.id(bee_id))
 return false;
 if (icon !== null && !self.settings.general.icon(icon))
 return false;
 my_bee_id = self.settings.general.id();
 self.gui.size.max.width(swarm.settings.right());
 self.gui.size.max.height(swarm.settings.bottom());
 bee_statuses.initialized(true);
 morpheus.execute(my_bee_id, 'system', 'initialized');
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 colony = cosmos.hub.access('colony');
 xenon = matrix.get('xenon');
 morpheus = matrix.get('morpheus');
 owl = matrix.get('owl');
 dock = matrix.get('dock');
 swarm = matrix.get('swarm');
 hive = matrix.get('hive');
 return true;
 };
 var is_init = false,
 error_code = null,
 my_bee_id = null,
 my_child_bees = [],
 cosmos = null,
 matrix = null,
 xenon = null,
 morpheus = null,
 owl = null,
 dock = null,
 swarm = null,
 hive = null,
 colony = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 gfx = new fx(),
 ui_objects = new ui_objects_model(),
 ui_config = new ui_config_model(),
 bee_events = new supported_events(),
 bee_statuses = new supported_statuses(),
 utils_int = new utilities();
 this.gui = new gui();
 this.drone = new drone();
 this.status = new status();
 this.settings = new settings();
 this.error = new error();
}
function bat()
{
 var self = this;
 function service_config_model()
 {
 this.sys_name = null;
 this.name = null;
 this.icon = 'svc_default';
 this.visible_in_super_tray = true;
 }
 function dynamic_function_model()
 {
 this.name = null;
 this.body = null;
 }
 this.config = function()
 {
 if (is_init === false)
 return false;
 return service_config;
 };
 this.set_function = function(name, body)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(name) || !utils_sys.validation.misc.is_function(body))
 return false;
 var __new_dynamic_function = new dynamic_function_model();
 __new_dynamic_function.name = name;
 __new_dynamic_function.body = function(args) { body.call(this, args); };
 dynamic_functions_list.push(__new_dynamic_function);
 return true;
 };
 this.exec_function = function(func_name, func_args = [])
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.alpha.is_symbol(func_name) || !utils_sys.validation.misc.is_array(func_args))
 return false;
 var __functions_list_length = dynamic_functions_list.length;
 for (var i = 0; i < __functions_list_length; i++)
 {
 if (dynamic_functions_list[i].name === func_name)
 {
 var func_body = dynamic_functions_list[i].body;
 on_run_calls_list.push({func_args, func_body});
 }
 }
 return true;
 };
 this.on = function(this_event, this_handler)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(this_event) || utils_sys.validation.misc.is_undefined(this_handler))
 return false;
 if (utils_sys.misc.contains(this_event, events_list))
 return morpheus.store(service_config.sys_name, 'main', this_event, this_handler, document);
 return false;
 };
 this.register = function(action = null)
 {
 if (is_init === false)
 return false;
 if (!super_tray.add(self, service_config.visible_in_super_tray, action))
 {
 owl.status.services.set(service_config.sys_name, service_config.name, 'FAIL');
 return false;
 }
 morpheus.execute(service_config.sys_name, 'main', 'register');
 var __calls_list_length = on_run_calls_list.length;
 for (var i = 0; i < __calls_list_length; i++)
 on_run_calls_list[i]['func_body'].call(this, on_run_calls_list[i]['func_args']);
 owl.status.services.set(service_config.sys_name, service_config.name, 'RUN');
 if (backtrace === true)
 frog('BAT', 'Services :: Register', service_config);
 return true;
 };
 this.unregister = function()
 {
 if (is_init === false)
 return false;
 dynamic_functions_list = [];
 on_run_calls_list = [];
 if (!super_tray.remove(service_config.sys_name))
 {
 owl.status.services.set(service_config.sys_name, service_config.name, 'FAIL');
 return false;
 }
 morpheus.execute(service_config.sys_name, 'main', 'unregister');
 morpheus.clear(service_config.sys_name);
 owl.status.services.set(service_config.sys_name, service_config.name, 'END');
 if (backtrace === true)
 frog('BAT', 'Services :: Unregister', service_config);
 return true;
 };
 this.init = function(svc_name, icon = null, visible_in_super_tray = true)
 {
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (utils_sys.validation.misc.is_undefined(svc_name) ||
 utils_sys.validation.alpha.is_blank(svc_name) ||
 utils_sys.validation.alpha.is_symbol(svc_name) ||
 (icon !== null && utils_sys.validation.alpha.is_blank(icon)) ||
 !utils_sys.validation.misc.is_bool(visible_in_super_tray))
 return false;
 service_config.sys_name = svc_name.toLowerCase().replace(/\s/g,'_') + '_' + random.generate();
 service_config.name = svc_name.trim();
 service_config.icon = (icon === null) ? 'svc_default' : icon;
 service_config.visible_in_super_tray = visible_in_super_tray;
 is_init = true;
 return true;
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
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 super_tray = matrix.get('super_tray');
 owl = matrix.get('owl');
 return true;
 };
 var is_init = false,
 backtrace = false,
 cosmos = null,
 matrix = null,
 morpheus = null,
 super_tray = null,
 owl = null,
 events_list = ['register', 'unregister'],
 dynamic_functions_list = [],
 on_run_calls_list = [],
 utils_sys = new vulcan(),
 random = new pythia(),
 service_config = new service_config_model();
}
function oz()
{
}
function coyote()
{
 var self = this;
 function config_model()
 {
 this.id = null;
 this.pages = [];
 this.index = 0;
 this.ping_interval = 600000
 this.is_full_screen = false;
 this.hb_options = {
 "kiosk" : true,
 "webgl" : true,
 "hide_cursor" : true,
 "dark" : true,
 "search_engine" : "google",
 "tag" : "greyos_" + Date.now(),
 "region" : "EU",
 "width" : 1920,
 "height" : 1080,
 "fps" : 30,
 "profile" : {
 "save" : true
 }
 };
 }
 function utilities()
 {
 var me = this;
 function load_meta_info(results)
 {
 if (results === 'null')
 return;
 var __json_data = JSON.parse(results),
 __meta_results = __json_data.webPages.value,
 __meta_results_container_object = null,
 __meta_result = null,
 __handler = null,
 __index = 0;
 meta_information_div.innerHTML = '<div id="' + coyote_bee_id + '_meta_results" class="coyote_meta_results"></div>';
 __meta_results_container_object = utils_sys.objects.by_id(coyote_bee_id + '_meta_results');
 if (!__meta_results_container_object)
 return;
 for (__meta_result of __meta_results)
 {
 __meta_results_container_object.innerHTML +=
 `<div class="coyote_meta_info_result">
 <div class="meta_info_name">` + __meta_result.name + `</div>
 <div class="meta_info_snippet">` + __meta_result.snippet + `</div>
 <div class="meta_info_url">` + __meta_result.url + `</div>
 </div>`;
 }
 for (__meta_result of __meta_results)
 {
 var __this_meta_info_result = __meta_results_container_object.childNodes[__index],
 __this_meta_info_url_object = __this_meta_info_result.children[2];
 ((meta_result_url, this_meta_info_url_object) =>
 {
 __handler = function() { self.browse(meta_result_url); };
 morpheus.run(config.id, 'mouse', 'click', __handler, this_meta_info_url_object);
 })(__meta_result.url, __this_meta_info_url_object);
 __index++;
 }
 if (coyote_bee.status.gui.casement_retracted())
 coyote_bee.gui.actions.casement.deploy(null);
 }
 this.close_new_user_tab = function()
 {
 var __all_tabs_promise = hb_manager.tabs.query({ active: true, title : "New Tab" });
 __all_tabs_promise.then((result) =>
 {
 result.forEach(element => { hb_manager.tabs.remove(element.id); });
 });
 };
 this.update_controls_delegate = function(tab_id, change_info, tab)
 {
 if (tab.status === 'complete')
 me.update_browsing_controls(tab.url);
 };
 this.update_browsing_controls = function(url)
 {
 if (utils_sys.validation.misc.is_nothing(url))
 return false;
 if (config.index > 0 && config.pages[config.index - 1] === url)
 return false;
 if (!url.includes('http'))
 url = 'https://' + url;
 browser_address_box.value = url;
 config.pages[config.index] = url;
 config.index++;
 return url;
 };
 this.go_to = function(url)
 {
 var __full_url = me.update_browsing_controls(url);
 if (__full_url === false)
 self.browser_controls.refresh(true);
 else
 {
 if (hb_manager === null)
 {
 me.init_hyperbeam(config.pages[0], () =>
 {
 hb_manager.tabs.update({ url: __full_url });
 });
 }
 else
 hb_manager.tabs.update({ url: __full_url });
 }
 ajax_factory('post', 'gate=meta_info&url=' + url, (results) => { load_meta_info(results); }, null, null);
 return true;
 };
 this.gui_init = function()
 {
 coyote_bee_id = coyote_bee.settings.general.id();
 me.draw_normal();
 me.draw_full_screen_layer();
 me.attach_events('normal_to_fullscreen');
 me.init_hyperbeam(config.pages[0], () => { hb_manager.resize(1006, 566); });
 return true;
 };
 this.draw_normal = function()
 {
 coyote_bee.settings.data.window.content('<div class="coyote_browsing_controls">' +
 ' <div id="' + coyote_bee_id + '_tabs_bar" class="coyote_tabs_bar">' +
 ' <div id="' + coyote_bee_id + '_tab_greyos" class="tab tab_selected">' +
 ' <div id="' + coyote_bee_id + '_tab_x" class="tab_close"></div>' +
 ' <div class="tab_text">GreyOS</div>' +
 ' </div>' +
 ' <div class="tab create_new_tab" title="Sorry, new tabs are not supported yet..."></div>' +
 ' </div>' +
 ' <div class="coyote_control_bar">' +
 ' <div id="' + coyote_bee_id + '_back" class="history_back browser_button"></div>' +
 ' <div id="' + coyote_bee_id + '_forward" class="history_forward browser_button"></div>' +
 ' <div id="' + coyote_bee_id + '_refresh" class="page_refresh browser_button"></div>' +
 ' <div id="' + coyote_bee_id + '_settings" class="browser_settings browser_button" ' +
 ' title="Sorry, settings are not available yet..."></div>' +
 ' <div id="' + coyote_bee_id + '_full_screen" class="browser_full_screen browser_button" ' +
 ' title="Full screen mode is still buggy..."></div>' +
 ' <div class="adress_bar">' +
 ' <div id="' + coyote_bee_id + '_page_info" class="page_info browser_button" ' +
 ' title="Sorry, page information is not available yet..."></div>' +
 ' <input type="text" id="' + coyote_bee_id + '_address_box" class="address_box" ' +
 ' value="' + init_url + '" placeholder="Enter a web address..."></div>' +
 ' </div>' +
 '</div>' +
 '<div id="' + coyote_bee_id + '_frame" class="coyote_frame"></div>');
 coyote_bee.settings.data.casement.content('<div id="' + coyote_bee_id + '_meta_info_div" \
 class="coyote_meta_info"><br><br><br><br><br>No meta-information available...</div>');
 browser_address_box = utils_sys.objects.by_id(coyote_bee_id + '_address_box');
 meta_information_div = utils_sys.objects.by_id(coyote_bee_id + '_meta_info_div');
 browser_frame = utils_sys.objects.by_id(coyote_bee_id + '_frame');
 browser_frame.style.width = (coyote_bee.status.gui.size.width() - 18) + 'px';
 meta_information_div.style.height = (coyote_bee.status.gui.size.height() - 48) + 'px';
 return true;
 };
 this.draw_full_screen_layer = function()
 {
 coyote_fs_layer = document.createElement('div');
 coyote_fs_layer.setAttribute('id', coyote_bee_id + '_full_screen_layer');
 coyote_fs_layer.setAttribute('class', 'coyote_full_screen_layer');
 document.body.appendChild(coyote_fs_layer);
 return true;
 };
 this.browser_frame_size = function()
 {
 var __browser_frame_width = null,
 __browser_frame_height = null;
 browser_address_box.style.width =
 (coyote_bee.status.gui.size.width() - 185) + 'px';
 __browser_frame_width = (coyote_bee.status.gui.size.width() - 18);
 browser_frame.style.width = __browser_frame_width + 'px';
 if (is_browsing_controls_hidden)
 __browser_frame_height = (coyote_bee.status.gui.size.height() - 63);
 else
 __browser_frame_height = (coyote_bee.status.gui.size.height() - 155);
 browser_frame.style.height = __browser_frame_height + 'px';
 };
 this.mnanage_fullscreen_events = function(choice)
 {
 var __full_screen = utils_sys.objects.by_id(coyote_bee_id + '_full_screen');
 morpheus.delete(config.id, 'click', __full_screen);
 __handler = function(event) { self.browser_controls.full_screen(event, choice); };
 morpheus.run(config.id, 'mouse', 'click', __handler, __full_screen);
 };
 this.attach_events = function(mode)
 {
 var __refresh = utils_sys.objects.by_id(coyote_bee_id + '_refresh'),
 __back = utils_sys.objects.by_id(coyote_bee_id + '_back'),
 __forward = utils_sys.objects.by_id(coyote_bee_id + '_forward'),
 __tab_close = utils_sys.objects.by_id(coyote_bee_id + '_tab_x'),
 __handler = null;
 browser_address_box = utils_sys.objects.by_id(coyote_bee_id + '_address_box');
 if (config.pages.length == 1)
 browser_address_box.value = config.pages[0];
 else
 browser_address_box.value = config.pages[config.index - 1];
 __handler = function(event) { self.browser_controls.address(browser_address_box.value, event); };
 morpheus.run(config.id, 'key', 'keydown', __handler, browser_address_box);
 __handler = function(event) { self.browser_controls.refresh(event); };
 morpheus.run(config.id, 'mouse', 'click', __handler, __refresh);
 __handler = function(event) { self.browser_controls.go.back(event); };
 morpheus.run(config.id, 'mouse', 'click', __handler, __back);
 __handler = function(event) { self.browser_controls.go.forward(event); };
 morpheus.run(config.id, 'mouse', 'click', __handler, __forward);
 __handler = function(event) { self.browser_controls.tabs.destroy(event); };
 morpheus.run(config.id, 'mouse', 'click', __handler, __tab_close);
 if (mode === 'normal_to_fullscreen')
 me.mnanage_fullscreen_events(1);
 else
 me.mnanage_fullscreen_events(2);
 return true;
 };
 this.init_hyperbeam = function(url, callback)
 {
 if (is_init_hyperbeam)
 return;
 var __on_success = async (hb_url) =>
 {
 if (utils_sys.validation.misc.is_nothing(hb_url))
 return false;
 hb_manager = await hyperbeam(browser_frame, hb_url);
 if (delayed_browsing_url !== null)
 url = delayed_browsing_url;
 else
 {
 if (utils_sys.validation.misc.is_nothing(url))
 url = init_url;
 }
 hb_manager.tabs.update({ url: url });
 hb_manager.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { me.update_controls_delegate(tabId, changeInfo, tab); });
 hb_manager.tabs.onCreated.addListener(() => { me.close_new_user_tab(); });
 ping_timer.start(config.ping_interval, () => { hb_manager.ping(); });
 if (callback !== undefined)
 callback.call(this);
 setTimeout(() =>
 {
 is_browser_loading = false;
 ajax_factory('post', 'gate=meta_info&url=' + url, (results) => { load_meta_info(results); }, null, null);
 infinity.end();
 }, 8000);
 },
 __on_fail = () =>
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(xenon.load('os_name'), 'Coyote encountered an error!')
 };
 infinity.setup(coyote_bee_id + '_data');
 infinity.begin();
 ajax_factory('post', 'gate=hyperbeam&config=' + JSON.stringify(config.hb_options), __on_success, __on_fail, null);
 is_init_hyperbeam = true;
 };
 this.hide_browsing_controls = function()
 {
 var __browsing_controls = utils_sys.objects.by_class('coyote_browsing_controls');
 __browsing_controls[0].style = 'display: none';
 browser_frame.style.height = (coyote_bee.status.gui.size.height() - 63) + 'px';
 is_browsing_controls_hidden = true;
 };
 }
 function browser_ctrl()
 {
 function tab_ctrl()
 {
 this.create = function(event_object)
 {
 if (is_init === false)
 return false;
 if (event_object === undefined)
 return false;
 var __tabs_bar = utils_sys.objects.by_id(coyote_bee_id + '_tabs_bar'),
 __greyos_tab = utils_sys.objects.by_id(coyote_bee_id + '_tab_greyos');
 if (config.is_full_screen)
 utils_sys.objects.by_id(coyote_bee_id).style = 'visibility: hidden';
 browser_address_box.value = '';
 __tabs_bar.addChild(__greyos_tab);
 if (__tabs_bar.childNodes.length === 10)
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(xenon.load('os_name'), 'Maximum tabs allowance is 10!')
 }
 return true;
 };
 this.destroy = function(event_object)
 {
 if (is_init === false)
 return false;
 if (event_object === undefined)
 return false;
 var __tabs_bar = utils_sys.objects.by_id(coyote_bee_id + '_tabs_bar'),
 __greyos_tab = utils_sys.objects.by_id(coyote_bee_id + '_tab_greyos');
 if (config.is_full_screen)
 utils_sys.objects.by_id(coyote_bee_id).style = 'visibility: hidden';
 browser_address_box.value = '';
 __tabs_bar.removeChild(__greyos_tab);
 if (__tabs_bar.childNodes.length === 3)
 coyote_bee.gui.actions.close(null);
 return true;
 };
 }
 function explore_ctrl()
 {
 this.back = function(event_object)
 {
 if (is_init === false)
 return false;
 if (event_object === undefined)
 return false;
 if (config.index < 2)
 return false;
 if (config.pages[config.index - 2] === browser_address_box.value)
 return false;
 config.index -= 2;
 browser_address_box.value = config.pages[config.index];
 utils_int.go_to(browser_address_box.value);
 return true;
 };
 this.forward = function(event_object)
 {
 if (is_init === false)
 return false;
 if (event_object === undefined)
 return false;
 if (config.index === 100)
 return false;
 if (config.pages[config.index] === undefined)
 return false;
 if (config.pages[config.index] === browser_address_box.value)
 return false;
 browser_address_box.value = config.pages[config.index];
 config.index++;
 utils_int.go_to(browser_address_box.value);
 return true;
 };
 }
 this.refresh = function(event_object)
 {
 if (is_init === false)
 return false;
 if (event_object === undefined)
 return false;
 hb_manager.tabs.update({ url: config.pages[config.index - 1] });
 return true;
 };
 this.address = function(url, event_object)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_nothing(url))
 return false;
 if (event_object === null)
 utils_int.go_to(url);
 else
 {
 if (coyote_bee.gui.keys.get(event_object) === 13)
 utils_int.go_to(url);
 }
 return true;
 };
 this.full_screen = function(event_object, mode)
 {
 if (is_init === false)
 return false;
 if ((event_object === undefined && mode === undefined) || mode < 1 || mode > 2)
 return false;
 var __coyote_content = utils_sys.objects.by_id(coyote_bee_id + '_data'),
 __page_info = utils_sys.objects.by_id(coyote_bee_id + '_page_info'),
 __full_screen = utils_sys.objects.by_id(coyote_bee_id + '_full_screen'),
 __browser_frame_width = utils_sys.graphics.pixels_value(browser_frame.style.width),
 __browser_frame_height = utils_sys.graphics.pixels_value(browser_frame.style.height);
 if (mode === 1)
 {
 __page_info.style.left = '87px';
 __page_info.style.top = '30px';
 browser_address_box.style.width = 'Calc(100vw - 167px)';
 __full_screen.style.backgroundImage = "url('/framework/extensions/js/core/nature/themes/coyote/pix/full_screen_hover.png')";
 __full_screen.title = 'Normal mode';
 coyote_fs_layer.innerHTML = __coyote_content.innerHTML;
 coyote_fs_layer.style.display = 'block';
 __coyote_content.innerHTML = '';
 browser_frame = utils_sys.objects.by_id(coyote_bee_id + '_frame');
 browser_frame.style.margin = 'auto';
 browser_frame.style.width = '100%';
 browser_frame.style.height = (window.innerHeight - 63) + 'px';
 utils_int.mnanage_fullscreen_events(2);
 hb_manager.resize(1920, 1080);
 config.is_full_screen = true;
 }
 else
 {
 __page_info.style.left = '90px';
 __page_info.style.top = '34px';
 browser_address_box.style.width = (coyote_bee.status.gui.size.width() - 185) + 'px';
 __full_screen.style.backgroundImage = '';
 __full_screen.title = 'Full screen mode';
 __coyote_content.innerHTML = coyote_fs_layer.innerHTML;
 coyote_fs_layer.innerHTML = '';
 coyote_fs_layer.style.display = 'none';
 browser_frame = utils_sys.objects.by_id(coyote_bee_id + '_frame');
 browser_frame.style.margin = '';
 browser_frame.style.width = (coyote_bee.status.gui.size.width() - 18) + 'px';
 if (is_browsing_controls_hidden)
 browser_frame.style.height = (coyote_bee.status.gui.size.height() - 63) + 'px';
 else
 browser_frame.style.height = (coyote_bee.status.gui.size.height() - 155) + 'px';
 utils_int.mnanage_fullscreen_events(1);
 hb_manager.resize(__browser_frame_width, __browser_frame_height);
 config.is_full_screen = false;
 }
 return true;
 };
 this.settings = function()
 {
 };
 this.tabs = new tab_ctrl();
 this.go = new explore_ctrl();
 };
 this.browse = function(url)
 {
 if (is_init === false)
 return false;
 if (is_browser_loading)
 {
 delayed_browsing_url = url;
 return true;
 }
 delayed_browsing_url = null;
 return self.browser_controls.address(url, null);
 };
 this.hide_controls = function()
 {
 if (is_init === false)
 return false;
 utils_int.hide_browsing_controls();
 return true;
 };
 this.base = function()
 {
 if (is_init === false)
 return false;
 return coyote_bee;
 };
 this.on = function(event_name, event_handler)
 {
 if (is_init === false)
 return false;
 return coyote_bee.on(event_name, event_handler);
 };
 this.run = function()
 {
 if (is_init === false)
 return false;
 return coyote_bee.run();
 };
 this.quit = function()
 {
 if (is_init === false)
 return false;
 return coyote_bee.quit();
 };
 this.error = function()
 {
 if (is_init === false)
 return false;
 return coyote_bee.error;
 };
 this.init = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 coyote_bee = dev_box.get('bee');
 config.id = 'coyote_' + random.generate();
 config.pages[0] = init_url;
 nature.themes.store('coyote');
 nature.apply('new');
 infinity.init();
 coyote_bee.init('coyote', 'coyote_icon');
 coyote_bee.settings.data.window.labels.title('Coyote');
 coyote_bee.settings.data.window.labels.status_bar('Howling under the Internet moon light...');
 coyote_bee.settings.data.casement.labels.title('Meta-information');
 coyote_bee.settings.data.casement.labels.status('');
 coyote_bee.settings.general.resizable(true);
 coyote_bee.settings.general.casement_width(50, 'fixed');
 coyote_bee.settings.general.allowed_instances(5);
 coyote_bee.gui.position.left(30);
 coyote_bee.gui.position.top(0);
 coyote_bee.gui.size.width(1024);
 coyote_bee.gui.size.height(720);
 coyote_bee.gui.size.min.width(960);
 coyote_bee.gui.size.min.height(680);
 coyote_bee.gui.size.max.width(1920);
 coyote_bee.gui.size.max.height(1080);
 coyote_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
 coyote_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
 coyote_bee.on('open', function() { coyote_bee.gui.fx.fade.into(); });
 coyote_bee.on('opened', function() { utils_int.gui_init(); });
 coyote_bee.on('dragging', function()
 {
 coyote_bee.gui.fx.opacity.settings.set(0.7);
 coyote_bee.gui.fx.opacity.apply();
 });
 coyote_bee.on('dragged', function()
 {
 coyote_bee.gui.fx.opacity.reset();
 });
 coyote_bee.on('resizing', function()
 {
 utils_int.browser_frame_size();
 if (!is_browser_loading)
 {
 infinity.begin();
 browser_frame.style.visibility = 'hidden';
 }
 meta_information_div.style.height = (coyote_bee.status.gui.size.height() - 48) + 'px';
 });
 coyote_bee.on('resized', function()
 {
 var __browser_frame_width = utils_sys.graphics.pixels_value(browser_frame.style.width),
 __browser_frame_height = utils_sys.graphics.pixels_value(browser_frame.style.height);
 if (hb_manager !== null && __browser_frame_height !== false)
 {
 hb_manager.resize(__browser_frame_width, __browser_frame_height);
 if (is_browser_loading)
 return;
 browser_frame.style.visibility = 'visible';
 setTimeout(function() { infinity.end(); }, 200);
 }
 });
 coyote_bee.on('close', function()
 {
 morpheus.clear(config.id);
 browser_frame.innerHTML = '';
 document.body.removeChild(coyote_fs_layer);
 ping_timer.stop();
 if (hb_manager !== null)
 hb_manager.destroy();
 coyote_bee.gui.fx.fade.out();
 });
 coyote_bee.on('closed', function()
 {
 if (!owl.status.applications.get.by_proc_id(coyote_bee.settings.general.app_id(), 'RUN'))
 nature.themes.clear('coyote');
 });
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 dev_box = cosmos.hub.access('dev_box');
 xenon = matrix.get('xenon');
 morpheus = matrix.get('morpheus');
 owl = matrix.get('owl');
 nature = matrix.get('nature');
 infinity = dev_box.get('infinity');
 return true;
 };
 var is_init = false,
 is_init_hyperbeam = false,
 is_browser_loading = true,
 is_browsing_controls_hidden = false,
 cosmos = null,
 matrix = null,
 dev_box = null,
 xenon = null,
 morpheus = null,
 owl = null,
 nature = null,
 infinity = null,
 coyote_bee = null,
 coyote_bee_id = null,
 browser_address_box = null,
 browser_frame = null,
 meta_information_div = null,
 coyote_fs_layer = null,
 delayed_browsing_url = null,
 hb_manager = null,
 init_url = 'https://probotek.eu/en/',
 utils_sys = new vulcan(),
 random = new pythia(),
 ping_timer = new stopwatch(),
 config = new config_model(),
 utils_int = new utilities();
 this.browser_controls = new browser_ctrl();
}
function max_screen()
{
 var self = this;
 function element_dimensions_model()
 {
 this.width = null;
 this.height = null;
 }
 function utilities()
 {
 var me = this;
 this.go_full_screen = function()
 {
 var __max_screen = utils_sys.objects.by_id(max_screen_id),
 __callback = self.settings.callback_function(),
 __element = utils_sys.objects.by_id(self.settings.container());
 __max_screen.innerHTML = 'X';
 element_dimensions.width = __element.style.width;
 element_dimensions.height = __element.style.height;
 __element.requestFullscreen();
 if (__callback)
 __callback.call();
 morpheus.delete(max_screen_id, 'click', __max_screen);
 __handler = function() { me.go_normal_screen(); };
 morpheus.run(max_screen_id, 'mouse', 'click', __handler, __max_screen);
 __handler = function(event_object)
 {
 key_control.scan(event_object);
 var __key_code = key_control.get();
 if (__key_code === 192)
 me.go_normal_screen();
 };
 morpheus.run(max_screen_id, 'key', 'keydown', __handler, document);
 is_full_screen = true;
 return true;
 };
 this.go_normal_screen = function()
 {
 var __max_screen = utils_sys.objects.by_id(max_screen_id),
 __element = utils_sys.objects.by_id(self.settings.container());
 __max_screen.innerHTML = '[]';
 __element.style.width = element_dimensions.width;
 __element.style.height = element_dimensions.height;
 morpheus.delete(max_screen_id, 'click', __max_screen);
 __handler = function() { me.go_full_screen(); };
 morpheus.run(max_screen_id, 'mouse', 'click', __handler, __max_screen);
 morpheus.delete(max_screen_id, 'keydown', document);
 is_full_screen = false;
 return true;
 };
 this.setup = function(theme)
 {
 var __handler = null,
 __dynamic_object = null;
 if (theme === null)
 theme = 'max_screen';
 if (!utils_sys.graphics.apply_theme('/framework/extensions/js/user/max_screen/', theme))
 return false;
 __dynamic_object = document.createElement('div');
 __dynamic_object.setAttribute('id', max_screen_id);
 __dynamic_object.setAttribute('class', 'max_screen');
 __dynamic_object.innerHTML = '[]';
 utils_sys.objects.by_id(self.settings.container()).appendChild(__dynamic_object);
 __handler = function() { me.go_full_screen(); };
 morpheus.run(max_screen_id, 'mouse', 'click', __handler, __dynamic_object);
 return true;
 };
 }
 function status()
 {
 this.full_screen = function()
 {
 if (is_init === false)
 return null;
 return is_full_screen;
 };
 }
 function settings()
 {
 var __id = null,
 __container = null,
 __callback_function = null;
 this.id = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __id;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __id = val;
 return true;
 };
 this.container = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __container;
 if (utils_sys.validation.alpha.is_symbol(val))
 return false;
 __container = val;
 return true;
 };
 this.callback_function = function(val)
 {
 if (is_init === false)
 return false;
 if (utils_sys.validation.misc.is_undefined(val))
 return __callback_function;
 __callback_function = val;
 return true;
 };
 }
 this.init = function(container_id, func = null, theme = null)
 {
 if (is_init === true)
 return false;
 if (utils_sys.validation.misc.is_undefined(container_id))
 return false;
 is_init = true;
 self.settings.id('max_screen_' + random.generate());
 max_screen_id = self.settings.id();
 if (!self.settings.container(container_id))
 return false;
 self.settings.callback_function(func);
 if (!utils_int.setup(theme))
 return false;
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 morpheus = matrix.get('morpheus');
 return true;
 };
 var is_init = false,
 is_full_screen = false,
 max_screen_id = null,
 cosmos = null,
 matrix = null,
 morpheus = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 element_dimensions = new element_dimensions_model(),
 utils_int = new utilities();
 this.status = new status();
 this.settings = new settings();
}
function cloud_edit()
{
 var self = this;
 function config_model()
 {
 function program_model()
 {
 this.name = '';
 this.icon = '';
 this.type = null;
 }
 function ce_model()
 {
 this.editor = null;
 this.extra_button = null;
 this.exec_button = null;
 this.deploy_button = null;
 this.status_label = null;
 }
 this.id = null;
 this.content = null;
 this.program = new program_model();
 this.ce = new ce_model();
 }
 function ce_meta_caller()
 {
 this.telemetry = function(data)
 {
 config.program.name = data.name;
 config.program.icon = data.icon;
 config.program.type = data.type;
 return true;
 };
 this.source = function()
 {
 return config.ce.editor.getValue();
 };
 this.reset = function()
 {
 return utils_int.reset();
 };
 }
 function utilities()
 {
 var me = this;
 function check_system_run_limits()
 {
 var __apps_num = colony.num(),
 __max_apps = colony.max(),
 __svcs_num = roost.num(),
 __max_svcs = roost.max();
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 if (__apps_num === __max_apps)
 __msg_win.show(xenon.load('os_name'), 'Maximum apps for this session, reached! Please close a few apps in order to open new ones.');
 else if (__svcs_num === __max_svcs)
 __msg_win.show(xenon.load('os_name'), 'Maximum services for this session, reached! Please stop a few to use others.');
 else
 return false;
 return true;
 }
 function check_single_instance_app(id)
 {
 if (owl.status.applications.get.by_proc_id(id, 'RUN') && colony.is_single_instance(id))
 {
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(xenon.load('os_name'),
 `Your program contains a single instance app.<br>
 A running instance blocks the execution!`);
 return true;
 }
 return false;
 }
 function run_code(event_object)
 {
 var __code = null;
 if (utils_sys.validation.misc.is_undefined(event_object))
 return false;
 if (program_is_running === true)
 return utils_int.reset();
 __code = config.ce.editor.getValue();
 if (!meta_executor.load(__code))
 {
 config.ce.status_label.innerHTML = '[EMPTY]';
 config.ce.exec_button.value = 'Run';
 config.ce.exec_button.classList.remove('ce_stop');
 frog('CLOUD EDIT', '% Empty %', 'No code detected!');
 return false;
 }
 if (meta_executor.process(ce_mc) !== true)
 {
 if (!check_system_run_limits())
 {
 if (!check_single_instance_app(config.program.name))
 {
 if (meta_executor.error.last.code() === meta_executor.error.codes.INVALID_CODE)
 {
 config.ce.status_label.innerHTML = '[INVALID]';
 config.ce.exec_button.value = 'Run';
 config.ce.exec_button.classList.remove('ce_stop');
 frog('CLOUD EDIT', '# Invalid Code #', meta_executor.error.last.message() + '\nPlease check the template...');
 }
 else if (meta_executor.error.last.code() === meta_executor.error.codes.RUN_FAIL)
 {
 config.ce.status_label.innerHTML = '[FAIL]';
 config.ce.exec_button.value = 'Run';
 config.ce.exec_button.classList.remove('ce_stop');
 frog('CLOUD EDIT', '[*] Run Fail [*]', meta_executor.error.last.message());
 }
 else if (meta_executor.error.last.code() === meta_executor.error.codes.RUN_BLOCK)
 {
 config.ce.status_label.innerHTML = '[BLOCK]';
 config.ce.exec_button.value = 'Run';
 config.ce.exec_button.classList.remove('ce_stop');
 frog('CLOUD EDIT', '[*] Run Block [*]', meta_executor.error.last.message());
 var __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(xenon.load('os_name'),
 `Your program contains a single instance app.<br>
 A running instance blocks the execution!`);
 }
 else if (meta_executor.error.last.code() === meta_executor.error.codes.ERROR)
 {
 config.ce.status_label.innerHTML = '[ERROR]';
 config.ce.exec_button.value = 'Run';
 config.ce.exec_button.classList.remove('ce_stop');
 frog('CLOUD EDIT', '[!] Error [!]', meta_executor.error.last.message());
 }
 }
 }
 disable_deploy_button();
 return meta_executor.terminate();
 }
 config.ce.status_label.innerHTML = '[RUNNING]';
 config.ce.exec_button.value = 'Stop';
 config.ce.exec_button.classList.add('ce_stop');
 disable_deploy_button();
 program_is_running = true;
 return true;
 }
 function side_panel(event_object)
 {
 if (cloud_edit_bee.status.gui.casement_deployed())
 cloud_edit_bee.gui.actions.casement.retract(event_object);
 else
 cloud_edit_bee.gui.actions.casement.deploy(event_object);
 }
 function deploy_program()
 {
 var __msg_win = new msgbox();
 function save_program()
 {
 user_prog_name = encodeURIComponent(utils_sys.objects.by_id(config.id + '_input_prog_name').value);
 __prog_source = encodeURIComponent(config.ce.editor.getValue());
 if (user_prog_name.length === 0)
 {
 __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(os_name, 'Please enter a program name!', __msg_win.types.OK,
 [() => { user_prog_name = 'new_program'; deploy_program(); }]);
 return;
 }
 var __verification_options = "&program_type=" + config.program.type + "&program_name=" + user_prog_name;
 __ajax_config.data += __verification_options;
 __prog_model = JSON.stringify(config.program);
 ajax.run(__ajax_config)
 }
 var __prog_source = null,
 __prog_model = null,
 __input_prog_name_object = null,
 __handler = null,
 __ajax_config = {
 "type" : "request",
 "method" : "post",
 "url" : "/",
 "data" : "gate=deploy_program&check_existing=1",
 "ajax_mode" : "asynchronous",
 "on_success" : (result) =>
 {
 __msg_win = new msgbox();
 __msg_win.init('desktop');
 if (result === '-1')
 {
 __msg_win.show(os_name, 'An error has occurred!');
 return;
 }
 __ajax_config.data = "gate=deploy_program&program_name=" + user_prog_name +
 "&program_source=" + __prog_source + "&program_model=" + __prog_model;
 __ajax_config.on_success = (result) =>
 {
 if (result === '-1')
 {
 __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(os_name, 'An error has occurred.\
 The program has not been saved!');
 }
 else
 dock.refresh();
 };
 if (result === '0')
 ajax.run(__ajax_config);
 else
 {
 __msg_win.show(os_name, 'This program name already exists!<br>\
 Do you want to replace it with the current program?',
 __msg_win.types.YES_NO_CANCEL,
 [() => { ajax.run(__ajax_config); },
 () => { deploy_program(); }]);
 }
 }
 };
 __msg_win = new msgbox();
 __msg_win.init('desktop');
 __msg_win.show(os_name, 'Please save your program before deploying it.<br><br>\
 <input id="'+ config.id + '_input_prog_name" class="ce_prog_name_input" value="' + decodeURIComponent(user_prog_name) + '"\
 maxlength="40" placeholder="Enter program name...">',
 __msg_win.types.OK_CANCEL, [() => { save_program(); }]);
 __input_prog_name_object = utils_sys.objects.by_id(config.id + '_input_prog_name');
 __input_prog_name_object.focus();
 __handler = function(event)
 {
 key_control.scan(event);
 if (key_control.get() === key_control.keys.ENTER)
 save_program();
 };
 morpheus.run(config.id, 'key', 'keydown', __handler, __input_prog_name_object);
 return true;
 }
 function trigger_buttons()
 {
 disable_deploy_button();
 if (config.ce.editor.getValue() === '')
 {
 config.ce.exec_button.style.color = '#7b7f8d';
 config.ce.exec_button.style.backgroundColor = '#97a6ad';
 config.ce.exec_button.disabled = true;
 config.ce.status_label.innerHTML = '[READY]';
 }
 else
 {
 config.ce.exec_button.style.color = '#ffffff';
 config.ce.exec_button.style.backgroundColor = '#3d9aff';
 config.ce.exec_button.disabled = false;
 }
 }
 function disable_deploy_button()
 {
 config.ce.deploy_button.style.color = '';
 config.ce.deploy_button.style.backgroundColor = '#97ad9c';
 config.ce.deploy_button.disabled = true;
 }
 this.gui_init = function()
 {
 var __data_content_id = cloud_edit_bee.settings.general.id() + '_data';
 infinity.setup(__data_content_id);
 infinity.begin();
 me.draw();
 me.attach_ce_functions();
 me.attach_events();
 infinity.end();
 return true;
 };
 this.draw = function()
 {
 var dynamic_elements = document.createElement('span');
 config.ce.extra_button = document.createElement('input');
 config.ce.extra_button.id = 'ce_extra';
 config.ce.extra_button.type = 'button';
 config.ce.extra_button.value = '>>';
 config.ce.extra_button.title = 'Show / hide side panel';
 config.ce.exec_button = document.createElement('input');
 config.ce.exec_button.id = 'ce_run_stop';
 config.ce.exec_button.type = 'button';
 config.ce.exec_button.value = 'Run';
 config.ce.exec_button.title = 'Run program';
 config.ce.deploy_button = document.createElement('input');
 config.ce.deploy_button.id = 'ce_deploy';
 config.ce.deploy_button.type = 'button';
 config.ce.deploy_button.style.backgroundColor = '#97ad9c';
 config.ce.deploy_button.value = 'Deploy';
 config.ce.deploy_button.title = 'Deploy program to AGORA marketplace';
 config.ce.deploy_button.disabled = true;
 config.ce.status_label = document.createElement('span');
 config.ce.status_label.id = 'ce_status';
 config.ce.status_label.innerHTML = '[READY]';
 dynamic_elements.append(config.ce.status_label);
 dynamic_elements.append(config.ce.deploy_button);
 dynamic_elements.append(config.ce.exec_button);
 dynamic_elements.append(config.ce.extra_button);
 utils_sys.objects.by_id(cloud_edit_bee.settings.general.id() + '_status_bar_msg').append(dynamic_elements);
 return true;
 };
 this.attach_ce_functions = function()
 {
 config.ce.editor = ace.edit(cloud_edit_bee.settings.general.id() + '_data');
 ace.require('ace/ext/settings_menu').init(config.ce.editor);
 config.ce.editor.setTheme('ace/theme/tomorrow_night');
 config.ce.editor.session.setMode('ace/mode/javascript');
 config.ce.editor.setOptions({ enableBasicAutocompletion: true,
 enableSnippets: true,
 enableLiveAutocompletion: true,
 printMargin: false,
 vScrollBarAlwaysVisible: true,
 fontSize: '14'
 });
 config.ce.editor.commands.addCommands([ { name: 'showSettingsMenu', bindKey: {win: 'Ctrl-q', mac: 'Ctrl-q'},
 exec: function(this_editor) { this_editor.showSettingsMenu(); } } ]);
 config.ce.editor.getSession().on('change', () => { trigger_buttons(); });
 return true;
 };
 this.attach_events = function()
 {
 var __handler = null;
 __handler = function(event) { side_panel(event); };
 morpheus.run(config.id, 'mouse', 'click', __handler, config.ce.extra_button);
 __handler = function(event) { run_code(event); };
 morpheus.run(config.id, 'mouse', 'click', __handler, config.ce.exec_button);
 __handler = function() { deploy_program(); };
 morpheus.run(config.id, 'mouse', 'click', __handler, config.ce.deploy_button);
 return true;
 };
 this.reset = function()
 {
 meta_executor.terminate();
 config.ce.status_label.innerHTML = '[READY]';
 config.ce.exec_button.value = 'Run';
 config.ce.exec_button.classList.remove('ce_stop');
 config.ce.deploy_button.style.color = '#ffffff';
 config.ce.deploy_button.style.backgroundColor = '#08d43b';
 config.ce.deploy_button.disabled = false;
 program_is_running = false;
 return true;
 };
 this.destroy_editor = function()
 {
 config.ce.editor.destroy();
 return true;
 };
 }
 this.base = function()
 {
 if (is_init === false)
 return false;
 return cloud_edit_bee;
 };
 this.on = function(event_name, event_handler)
 {
 if (is_init === false)
 return false;
 return cloud_edit_bee.on(event_name, event_handler);
 };
 this.run = function()
 {
 if (is_init === false)
 return false;
 return cloud_edit_bee.run();
 };
 this.quit = function()
 {
 if (is_init === false)
 return false;
 return cloud_edit_bee.close();
 };
 this.error = function()
 {
 if (is_init === false)
 return false;
 return cloud_edit_bee.error;
 };
 this.init = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 os_name = xenon.load('os_name');
 cloud_edit_bee = dev_box.get('bee');
 config.id = 'cloud_edit_' + random.generate();
 config.content = `// Welcome to Cloud Edit!\n// Please load the test template from\
 https://greyos.gr/framework/extensions/js/user/cloud_edit/my_ms_program.js\n`;
 nature.themes.store('cloud_edit');
 nature.apply('new');
 infinity.init();
 cloud_edit_bee.init('cloud_edit', 'cloud_edit_icon');
 cloud_edit_bee.settings.data.window.labels.title('Cloud Edit');
 cloud_edit_bee.settings.data.window.labels.status_bar('Integrated code editor for GreyOS');
 cloud_edit_bee.settings.data.window.content(config.content);
 cloud_edit_bee.settings.data.casement.labels.title('Side Panel :: Utilities');
 cloud_edit_bee.settings.data.casement.labels.status('Ready');
 cloud_edit_bee.settings.general.resizable(true);
 cloud_edit_bee.settings.actions.can_edit_title(false);
 cloud_edit_bee.settings.general.allowed_instances(4);
 cloud_edit_bee.settings.general.casement_width(60, 'fixed');
 cloud_edit_bee.gui.position.left(100);
 cloud_edit_bee.gui.position.top(40);
 cloud_edit_bee.gui.size.width(820);
 cloud_edit_bee.gui.size.height(530);
 cloud_edit_bee.gui.size.min.width(600);
 cloud_edit_bee.gui.size.min.height(480);
 cloud_edit_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
 cloud_edit_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
 cloud_edit_bee.on('open', function() { cloud_edit_bee.gui.fx.fade.into(); });
 cloud_edit_bee.on('opened', function() { utils_int.gui_init(); });
 cloud_edit_bee.on('dragging', function()
 {
 cloud_edit_bee.gui.fx.opacity.settings.set(0.7);
 cloud_edit_bee.gui.fx.opacity.apply();
 });
 cloud_edit_bee.on('dragged', function() { cloud_edit_bee.gui.fx.opacity.reset(); });
 cloud_edit_bee.on('resized', function()
 {
 config.ce.editor.resize();
 config.ce.editor.renderer.updateFull();
 });
 cloud_edit_bee.on('casement_deployed', function() { config.ce.extra_button.value = '<<'; });
 cloud_edit_bee.on('casement_retracted', function() { config.ce.extra_button.value = '>>'; });
 cloud_edit_bee.on('close', function()
 {
 morpheus.clear(config.id);
 meta_executor.terminate();
 utils_int.destroy_editor();
 cloud_edit_bee.gui.fx.fade.out();
 });
 cloud_edit_bee.on('closed', function()
 {
 if (!owl.status.applications.get.by_proc_id(cloud_edit_bee.settings.general.app_id(), 'RUN'))
 nature.themes.clear('cloud_edit');
 });
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 dev_box = cosmos.hub.access('dev_box');
 colony = cosmos.hub.access('colony');
 roost = cosmos.hub.access('roost');
 morpheus = matrix.get('morpheus');
 xenon = matrix.get('xenon');
 owl = matrix.get('owl');
 nature = matrix.get('nature');
 dock = matrix.get('dock');
 infinity = dev_box.get('infinity');
 meta_executor = dev_box.get('meta_executor');
 return true;
 };
 var is_init = false,
 program_is_running = false,
 user_prog_name = 'new_program',
 os_name = null,
 cosmos = null,
 matrix = null,
 dev_box = null,
 colony = null,
 roost = null,
 morpheus = null,
 xenon = null,
 owl = null,
 dock = null,
 nature = null,
 infinity = null,
 meta_executor = null,
 cloud_edit_bee = null,
 config = new config_model(),
 ce_mc = new ce_meta_caller(),
 utils_int = new utilities(),
 utils_sys = new vulcan(),
 random = new pythia(),
 key_control = new key_manager(),
 ajax = new taurus();
}
function radio_dude()
{
 var self = this;
 function config_model()
 {
 this.id = null;
 this.player = null;
 }
 function utilities()
 {
 var me = this;
 this.gui_init = function()
 {
 var __data_content_id = radio_dude_bee.settings.general.id() + '_data';
 infinity.setup(__data_content_id);
 infinity.begin();
 selected_stream = 'https://stream.zeno.fm/qmqe8k5e74zuv';
 me.draw();
 config.player = utils_sys.objects.by_id(config.id + '_ctlr');
 config.player.volume = 0.3;
 utils_int.attach_events();
 infinity.end();
 return true;
 };
 this.draw = function()
 {
 radio_dude_bee.settings.data.window.content('<div class="radio_dude_player">' +
 ' <audio id="' + config.id + '_ctlr" width="300" height="32" ' +
 ' autoplay="false" controls="false" src="' + selected_stream + '">' +
 ' </audio>' +
 '</div>' +
 '<div class="radio_dude_list">' +
 ' <div id="' + config.id + '_radio_dude_streams" class="radio_dude_streams">' +
 ' <div id="' + config.id + '_stream_genres" class="stream_genres">' +
 ' <div data-stream="1" class="radio_dude_selected_stream">Pop/Rock</div>' +
 ' <div data-stream="2">Dance/House</div>' +
 ' <div data-stream="3">Jazz/Blues</div>' +
 ' <div data-stream="4">Country</div>' +
 ' </div>' +
 ' </div>' +
 '</div>');
 radio_dude_bee.settings.data.casement.content(`<div class="radio_dude_weather"><center><br><br>Coming soon...</center></div>`);
 return true;
 };
 this.stream = function(stream_id)
 {
 if (!utils_sys.validation.numerics.is_number(stream_id) | stream_id < 1 || stream_id > 10)
 return false;
 var streams = [];
 streams[1] = 'https://stream.zeno.fm/qmqe8k5e74zuv';
 streams[2] = 'https://i4.streams.ovh/sc/musicfactory/stream';
 streams[3] = 'https://c30.radioboss.fm:18119/stream';
 streams[4] = 'https://ais-sa2.cdnstream1.com/1963_128.mp3';
 selected_stream = streams[stream_id];
 config.player.pause();
 config.player.src = streams[stream_id];
 config.player.play();
 return true;
 };
 this.choose = function(list_id)
 {
 if (!utils_sys.validation.numerics.is_number(list_id))
 return false;
 var __streams_list = utils_sys.objects.by_id(config.id + '_stream_genres'),
 __streams_list_num = __streams_list.children.length;
 for (var i = 0; i < __streams_list_num; i++)
 __streams_list.children[i].setAttribute('class', '');
 __streams_list.children[list_id - 1].setAttribute('class', 'radio_dude_selected_stream');
 return true;
 };
 this.change_stream = function()
 {
 me.stream(this.getAttribute('data-stream'));
 me.choose(this.getAttribute('data-stream'));
 };
 this.attach_events = function()
 {
 var __streams_list = utils_sys.objects.by_id(config.id + '_stream_genres'),
 __streams_list_num = __streams_list.children.length;
 for (var i = 0; i < __streams_list_num; i++)
 __streams_list.children[i].onclick = me.change_stream;
 };
 }
 this.base = function()
 {
 if (is_init === false)
 return false;
 return radio_dude_bee;
 };
 this.on = function(event_name, event_handler)
 {
 if (is_init === false)
 return false;
 return radio_dude_bee.on(event_name, event_handler);
 };
 this.run = function()
 {
 if (is_init === false)
 return false;
 return radio_dude_bee.run();
 };
 this.quit = function()
 {
 if (is_init === false)
 return false;
 return radio_dude_bee.quit();
 };
 this.error = function()
 {
 if (is_init === false)
 return false;
 return radio_dude_bee.error;
 };
 this.init = function()
 {
 if (utils_sys.validation.misc.is_nothing(cosmos))
 return false;
 if (is_init === true)
 return false;
 is_init = true;
 config.id = 'radio_dude_' + random.generate();
 nature.themes.store('radio_dude');
 nature.apply('new');
 infinity.init();
 radio_dude_bee = dev_box.get('bee');
 radio_dude_bee.init('radio_dude', 'radio_dude_icon');
 radio_dude_bee.settings.data.window.labels.title('Radio Dude');
 radio_dude_bee.settings.data.window.labels.status_bar('Music babe... [ M U S I C ]');
 radio_dude_bee.settings.data.casement.labels.title('Weather');
 radio_dude_bee.settings.data.casement.labels.status('');
 radio_dude_bee.settings.general.single_instance(true);
 radio_dude_bee.gui.position.static(true);
 radio_dude_bee.gui.position.left(330);
 radio_dude_bee.gui.position.top(120);
 radio_dude_bee.gui.size.width(320);
 radio_dude_bee.gui.size.height(274);
 radio_dude_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
 radio_dude_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
 radio_dude_bee.on('open', function() { radio_dude_bee.gui.fx.fade.into(); });
 radio_dude_bee.on('opened', function() { utils_int.gui_init(); });
 radio_dude_bee.on('dragging', function()
 {
 radio_dude_bee.gui.fx.opacity.settings.set(0.7);
 radio_dude_bee.gui.fx.opacity.apply();
 });
 radio_dude_bee.on('dragged', function() { radio_dude_bee.gui.fx.opacity.reset(); });
 radio_dude_bee.on('close', function() { radio_dude_bee.gui.fx.fade.out(); });
 radio_dude_bee.on('closed', function() { nature.themes.clear('radio_dude'); });
 return true;
 };
 this.cosmos = function(cosmos_object)
 {
 if (utils_sys.validation.misc.is_undefined(cosmos_object))
 return false;
 cosmos = cosmos_object;
 matrix = cosmos.hub.access('matrix');
 dev_box = cosmos.hub.access('dev_box');
 nature = matrix.get('nature');
 infinity = dev_box.get('infinity');
 return true;
 };
 var is_init = false,
 cosmos = null,
 matrix = null,
 dev_box = null,
 nature = null,
 infinity = null,
 selected_stream = null,
 radio_dude_bee = null,
 utils_sys = new vulcan(),
 random = new pythia(),
 config = new config_model(),
 utils_int = new utilities();
}
