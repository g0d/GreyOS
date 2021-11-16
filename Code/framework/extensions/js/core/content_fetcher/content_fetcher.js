/*
    Content Fetcher (Universal content loader)

    File name: content_fetcher.js (Version: 0.3)
    Description: This file contains the Content Fetcher extension.
    Dependencies: Vulcan and BULL.

    Coded by George Delaportas (G0D)
    Copyright (C) 2016
    Open Software License (OSL 3.0)
*/

// Content Fetcher
function content_fetcher(content_id, language_code, result_callback)
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

    if (!utils.validation.misc.is_function(result_callback))
        return false;

    data = "gate=content&content_id=" + content_id;

    if (!utils.validation.misc.is_nothing(language_code))
    	data += '&language_code=' + language_code;

    ajax_config = {
                        "type"          :   "request",
                        "url"           :   "/",
                        "data"          :   data,
                        "ajax_mode"     :   "asynchronous",
                        "on_success"    :   function(response) { result_callback.call(this, response); }
                  };

    ajax.run(ajax_config);

    return true;
}
