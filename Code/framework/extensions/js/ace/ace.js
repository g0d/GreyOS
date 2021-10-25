/*
    GreyOS Inc. - ACE Editor (Auto Loader)
    
    File name: ace.js (Version: 1.0)
    Description: This file contains the ACE Editor - Auto Loader extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2021
*/



var dynamic_object = document.createElement('script');

dynamic_object.setAttribute('type', 'text/javascript');
dynamic_object.setAttribute('src', '/framework/extensions/js/ace/src/ace-min.js');

document.getElementsByTagName('head')[0].appendChild(dynamic_object);

dynamic_object.setAttribute('src', '/framework/extensions/js/ace/src/ext-language_tools.js');

document.getElementsByTagName('head')[0].appendChild(dynamic_object);

dynamic_object.setAttribute('src', '/framework/extensions/js/ace/src/ext-settings_menu.js');

document.getElementsByTagName('head')[0].appendChild(dynamic_object);
