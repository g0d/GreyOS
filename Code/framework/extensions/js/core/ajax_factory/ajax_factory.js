/*
    AJAX Factory (Factory method for AJAX calls)

    File name: ajax_factory.js (Version: 1.2)
    Description: This file contains the AJAX Factory extension.
    Dependencies: Vulcan and BULL.

    Coded by George Delaportas (G0D) 
    Copyright (C) 2019 - 2020
    Open Software License (OSL 3.0)
*/

// AJAX Factory
function ajax_factory(ajax_data, success_cb, failure_cb, default_cb)
{
    var ajax = new bull(),
    	utils = new vulcan(),
    	bull_config = {
                            "type"          :   "request",
                            "url"           :   "/",
                            "data"          :   ajax_data,
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

    if (!utils.validation.misc.is_function(success_cb) || 
        !utils.validation.misc.is_function(failure_cb) || 
        !utils.validation.misc.is_function(default_cb))
        return false;

    ajax.run(bull_config);

    return true;
}
