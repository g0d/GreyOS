/*
    Sensei (Logger & Informer)

    File name: sensei.js (Version: 0.2)
    Description: This file contains the Sensei extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D/ViR4X)
    Copyright (C) 2017 - 2024
    Open Software License (OSL 3.0)
*/

// Sensei
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
    console.log('--------------------------  ' + __stars + '  --------------------------');
    console.log('');

    return true;
}
