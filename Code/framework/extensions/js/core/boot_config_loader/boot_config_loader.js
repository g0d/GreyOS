/*
    GreyOS - Boot Configuration Loader (Version: 1.0)

    File name: boot_config_loader.js
    Description: This file contains the Boot Configuration Loader utility.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright © 2025
    Open Software License (OSL 3.0)
*/

// Boot Config Loader
function boot_config_loader()
{
    var ajax = new bull(),
    	ajax_config = {
                            "type"          :   "request",
                            "url"           :   "/",
                            "data"          :   "gate=boot_config",
                            "method"        :   "post",
                            "ajax_mode"     :   "synchronous"
                      };

    return JSON.parse(ajax.run(ajax_config));
}
