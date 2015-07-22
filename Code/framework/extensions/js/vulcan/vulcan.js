/*

    GreyOS Inc. - Vulcan (Core utilities for models in Cosmos)
    
    File name: vulcan.js (Version: 1.4)
    Description: This file contains the Vulcan - Core utilities extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Vulcan
function vulcan()
{

    var self = this;

    function validation()
    {

        function alpha()
        {

            var me = this;

            this.is_string = function(val)
            {

                if (typeof val !== 'string')
                    return false;

                return true;

            };

            this.is_symbol = function(val)
            {

                if (!me.is_string(val))
                    return false;

                if (val.match(/[!$%^&*()+|~=`{}\[\]:";'<>?,\/]/))
                    return true;

                return false;

            };

        }

        function numerics()
        {

            var me = this;

            this.is_number = function(val)
            {

                if (!isNaN(val))
                    return true;

                return false;

            };

            this.is_integer = function(val)
            {

                if (me.is_number(val) && (val % 1 === 0))
                    return true;

                return false;

            };

            this.is_float = function(val)
            {

                if (val === 0.0)
                    return true;

                if (me.is_number(val) && (val % 1 !== 0))
                    return true;

                return false;

            };

        }

        function models()
        {

            this.is_bee = function(object)
            {

                if (!self.validation.misc.is_object(object))
                    return false;

                if (self.validation.misc.is_undefined(object.init) || self.validation.misc.is_undefined(object.show) || 
                    self.validation.misc.is_undefined(object.on) || self.validation.misc.is_undefined(object.settings) || 
                    self.validation.misc.is_undefined(object.gui) || self.validation.misc.is_undefined(object.status) || 
                    self.validation.misc.is_undefined(object.drone))
                    return false;

                return true;

            };

            this.is_cosmos = function(object)
            {

                if (!self.validation.misc.is_object(object))
                    return false;

                if (self.validation.misc.is_undefined(object.init) || self.validation.misc.is_undefined(object.backtrace) || 
                    self.validation.misc.is_undefined(object.hub) || self.validation.misc.is_undefined(object.status))
                    return false;

                return true;

            };

        }

        function misc()
        {

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

                if (Object.prototype.toString.call(val) === '[object Array]')
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

                if (self.validation.misc.is_undefined(val) || val === null || val === '')
                    return true;

                return false;

            };

        }

        function utilities()
        {

            this.is_email = function(val)
            {

                var pattern = new RegExp(['^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|', 
                                          '(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|',
                                          '(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'].join(''));

                return pattern.test(val);

            };

            this.is_phone = function(val)
            {

                var pattern = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

                return pattern.test(val);

            };

        }

        this.alpha = new alpha();
        this.numerics = new numerics();
        this.models = new models();
        this.misc = new misc();
        this.utilities = new utilities();

    }

    function verification()
    {

        this.challenge = function(val)
        {

            if (self.validation.misc.is_undefined(val))
                return false;

            var result = null;

            return result;

        };

        this.response = function(val)
        {

            if (self.validation.misc.is_undefined(val))
                return false;

            

            return true;

        };

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

                var __callers = __controlling_list.length,
                    __func_handler = [];

                for (var i = 0; i < __callers; i++)
                {

                    if (__controlling_list[i].caller_id === caller_id)
                    {

                        var __objects = __controlling_list[i].object_events.length;

                        for (var j = 0; j < __objects; j++)
                        {

                            if (__controlling_list[i].object_events[j].object === object)
                            {

                                __func_handler[func] = handler;

                                __controlling_list[i].object_events[j].events.push(__func_handler);

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

                var __callers = __controlling_list.length;

                for (var i = 0; i < __callers; i++)
                {

                    if (__controlling_list[i].caller_id === caller_id)
                    {

                        var __objects = __controlling_list[i].object_events.length;

                        for (var j = 0; j < __objects; j++)
                        {

                            if (__controlling_list[i].object_events[j].object === object)
                            {

                                var __events = __controlling_list[i].object_events[j].events.length;

                                for (var k = 0; k < __events; k++)
                                {

                                    if (self.validation.misc.is_invalid(handler))
                                    {

                                        if (self.validation.misc.is_undefined(__controlling_list[i].object_events[j].events[k][func]))
                                            continue;

                                        return final_event(i, j, k, func);

                                    }

                                    else
                                    {

                                        if (self.validation.misc.is_undefined(__controlling_list[i].object_events[j].events[k][func]))
                                            continue;

                                        if (!self.validation.misc.is_function(handler))
                                            return false;

                                        var __this_handler = __controlling_list[i].object_events[j].events[k][func];

                                        if (__this_handler.toString() === handler.toString())
                                            return final_event(i, j, k, func);

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

            if (self.validation.alpha.is_symbol(caller_id) || self.validation.misc.is_invalid(object) || 
                self.validation.alpha.is_symbol(func) || !self.validation.misc.is_function(handler))
                return false;

            if (self.validation.misc.is_undefined(object.length) || self.validation.misc.is_undefined(object.item)) // Single element
            {

                if (!__controller.insert(caller_id, object, func, handler))
                    return false;

                object.addEventListener(func, handler, false);

            }

            else // Multiple elements
            {

                var __object_length = object.length;

                for (var i = 0; i < __object_length; i++)
                {

                    if (!__controller.insert(caller_id, object[i], func, handler))
                        return false;

                    object[i].addEventListener(func, handler, false);

                }

            }

            return true;

        };

        this.detach = function(caller_id, object, func, handler)
        {

            if (self.validation.alpha.is_symbol(caller_id) || self.validation.misc.is_invalid(object) || 
                self.validation.alpha.is_symbol(func))
                return false;

            var __handler = null;

            if (self.validation.misc.is_undefined(object.length) || self.validation.misc.is_undefined(object.item))
            {

                __handler = __controller.fetch(caller_id, object, func, handler);

                if (!__handler)
                    return false;

                object.removeEventListener(func, __handler, false);

            }

            else
            {

                var __object_length = object.length;

                for (var i = 0; i < __object_length; i++)
                {

                    __handler = __controller.fetch(caller_id, object[i], func, handler);

                    if (!__handler)
                        return false;

                    object[i].removeEventListener(func, __handler, false);

                }

            }

            return true;

        };

        var __controller = new controller();

    }

    function sorting()
    {

        this.intro_sort = function(val)
        {

            if (!self.validation.misc.is_array(val))
                return false;

            var val_length = val.length;

            for (var i = 0; i < val_length; i++)
            {

                if (self.validation.numerics.is_number(val[i]))
                    return false;

            }

            var result = [];

            // To do...

            return result;

        };

    }

    function conversions()
    {

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

                    var __final_attributes = null,
                        __valid_attributes = ['id', 'class', 'style', 'title', 'dir', 'lang', 'accesskey', 'tabindex', 
                                              'contenteditable', 'draggable', 'spellcheck', 'target', 'rel'];

                    for (var attr in attributes) 
                    {

                        if (__valid_attributes.indexOf(attr) === -1 && attr.indexOf('data-') !== 0)
                            return false;

                        __final_attributes += attr + '="' + attributes[attr] + '" ';

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

                var __url_info_length = url_info.length;

                for (var i = 0; i < __url_info_length; i++ )
                {   

                    if (!self.validation.misc.is_object(url_info[i]))
                        return false;

                    if (self.validation.misc.is_undefined(__final_attributes))
                        text = text.replace(url_info[i].expanded_url, '<a href="' + url_info[i].expanded_url + '">' + 
                               url_info[i].display_url + '</a>');

                    else
                        text = text.replace(url_info[i].expanded_url, '<a ' + __final_attributes + 'href="' + 
                               url_info[i].expanded_url + '">' + url_info[i].display_url + '</a>');

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

        this.apply_theme = function(directory, theme)
        {

            if (self.validation.misc.is_invalid(directory) || self.validation.alpha.is_symbol(theme))
                return false;

            if (self.validation.misc.is_undefined(theme))
                theme = 'default';

            var __dynamic_object = null;

            __dynamic_object = document.createElement('link');
            __dynamic_object.setAttribute('rel', 'stylesheet');
            __dynamic_object.setAttribute('type', 'text/css');
            __dynamic_object.setAttribute('media', 'screen');
            __dynamic_object.setAttribute('href', directory + '/' + theme + '.css');

            self.objects.by_tag('head')[0].appendChild(__dynamic_object);

            return true;

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

        this.require = function(js_file_name)
        {

            if (self.validation.misc.is_invalid(js_file_name) || self.validation.alpha.is_symbol(js_file_name))
                return false;

            var __dynamic_object = null;

            __dynamic_object = document.createElement('script');
            __dynamic_object.setAttribute('type', 'text/javascript');
            __dynamic_object.setAttribute('src', '/framework/extensions/js/' + js_file_name + '/' + js_file_name + '.js');

            self.objects.by_tag('head')[0].appendChild(__dynamic_object);

            return true;

        };
        
    }

    this.validation = new validation();
    this.verification = new verification();
    this.events = new events();
    this.sorting = new sorting();
    this.conversions = new conversions();
    this.graphics = new graphics();
    this.objects = new objects();
    this.system = new system();

}
