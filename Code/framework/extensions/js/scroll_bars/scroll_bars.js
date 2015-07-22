/*

    GreyOS Inc. - Scroll Bars (Auto Loader)
    
    File name: scroll_bars.js (Version: 1.0)
    Description: This file contains the Scroll Bars - Auto Loader extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



var dynamic_object = document.createElement('script');

dynamic_object.setAttribute('type', 'text/javascript');
dynamic_object.setAttribute('src', '/framework/extensions/js/scroll_bars/scroll_bars_lib.js');

document.getElementsByTagName('head')[0].appendChild(dynamic_object);



dynamic_object = document.createElement('link');

dynamic_object.setAttribute('rel', 'StyleSheet');
dynamic_object.setAttribute('href', '/framework/extensions/js/scroll_bars/themes/default.css');

document.getElementsByTagName('head')[0].appendChild(dynamic_object);
