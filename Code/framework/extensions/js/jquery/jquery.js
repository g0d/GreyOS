/*

    GreyOS Inc. - JQuery (Auto Loader)
    
    File name: jquery.js (Version: 1.0)
    Description: This file contains the JQuery - Auto Loader extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



(function()
{

    var dynamic_object = document.createElement('script');

    dynamic_object.setAttribute('type', 'text/javascript');
    dynamic_object.setAttribute('src', 'http://code.jquery.com/jquery-latest.min.js');

    document.getElementsByTagName('head')[0].appendChild(dynamic_object);

})();
