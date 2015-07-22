/*

    GreyOS Inc. - TweenMax (Auto Loader)
    
    File name: tween_max.js (Version: 1.0)
    Description: This file contains the TweenMax - Auto Loader extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2014

*/



(function()
{

    var dynamic_object = document.createElement('script');

    dynamic_object.setAttribute('type', 'text/javascript');
    dynamic_object.setAttribute('src', 'http://cdnjs.cloudflare.com/ajax/libs/gsap/1.11.4/TweenMax.min.js');

    document.getElementsByTagName('head')[0].appendChild(dynamic_object);

})();
