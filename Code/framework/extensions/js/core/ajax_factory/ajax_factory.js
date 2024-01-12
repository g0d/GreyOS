/*
    AJAX Factory (Factory method for AJAX calls)

    File name: ajax_factory.js (Version: 1.4)
    Description: This file contains the AJAX Factory extension.
    Dependencies: Vulcan and BULL.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2019 - 2023
    Open Software License (OSL 3.0)
*/

// AJAX Factory
function ajax_factory(ajax_data, success_cb = null, failure_cb = null, default_cb = null)
{
    var ajax = new bull(),
    	utils = new vulcan(),
    	ajax_config = {
                            "type"          :   "request",
                            "url"           :   "/",
                            "data"          :   ajax_data,
                            "method"        :   "post",
                            "ajax_mode"     :   "asynchronous",
                            "on_success"    :   function(response)
                                                {
                                                    if (response !== '0' && response !== '-1' && response !== 'undefined')
                                                        success_cb.call(this, response);
                                                    else
                                                        failure_cb.call(this, response);

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
