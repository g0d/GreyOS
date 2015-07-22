/*

    GreyOS Inc. - LeapJS (Auto Loader)
    
    File name: leap.js (Version: 1.0)
    Description: This file contains the LeapJS - Auto Loader extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2014

*/



(function()
{

    var dynamic_object = document.createElement('script');

    dynamic_object.setAttribute('type', 'text/javascript');
    dynamic_object.setAttribute('src', '//js.leapmotion.com/leap-0.4.3.min.js');

    document.getElementsByTagName('head')[0].appendChild(dynamic_object);

})();
