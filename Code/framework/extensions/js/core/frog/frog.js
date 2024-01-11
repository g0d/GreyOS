/*
    GreyOS - Frog (Version: 1.2)

    File name: frog.js
    Description: This file contains the Frog - Loger utility.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Frog
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
