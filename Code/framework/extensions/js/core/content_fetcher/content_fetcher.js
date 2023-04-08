/*
    Content Fetcher (Universal content loader)

    File name: content_fetcher.js (Version: 1.2)
    Description: This file contains the Content Fetcher extension.
    Dependencies: Vulcan and BULL.

    Coded by George Delaportas (G0D)
    Copyright (C) 2016 - 2023
    Open Software License (OSL 3.0)
*/

// Content Fetcher
function content_fetcher(content_id, language_code, success_cb, failure_cb, default_cb)
{
    var data = null,
        ajax_config = null,
        utils = new vulcan(),
        ajax = new bull();

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

    ajax_config = {
                        "type"          :   "request",
                        "url"           :   "/",
                        "data"          :   data,
                        "method"        :   "post",
                        "ajax_mode"     :   "asynchronous",
                        "on_success"    :   function(response)
                                            {
                                                if (response !== 'undefined')
                                                    success_cb.call(this, response);
                                                else
                                                    failure_cb.call(this, response);

                                                default_cb.call(this);
                                            }
                  };

    ajax.run(ajax_config);

    return true;
}
