/*
    Vulcan (General JS Programming Utilities)

    File name: vulcan.js (Version: 2.5)
    Description: This file contains the Vulcan extension.

    Coded by George Delaportas (G0D)
    Copyright (C) 2014 - 2023
    Open Software License (OSL 3.0)
*/

// Vulcan
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

        this.apply_theme = function(directory, theme, clear_cache = true)
        {
            if (self.validation.misc.is_invalid(directory) || self.validation.alpha.is_symbol(theme) || !self.validation.misc.is_bool(clear_cache))
                return false;

            if (self.validation.misc.is_undefined(theme))
                theme = 'default';

            if (self.system.source_exists(theme, 'link', 'href'))
                return false;

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

            if (__self.source_exists(js_file_name, 'script', 'src'))
                return false;

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

	// Intialize
	init();
}
