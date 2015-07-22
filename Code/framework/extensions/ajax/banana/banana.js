/*

    GreyOS Inc. - Banana (AJAX Suggestions Manager)
    
    File name: banana.js (Version: 1.0)
    Description: This file contains the Banana - AJAX Suggestions Manager extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Banana
function Banana()
{

    var c = 1;
    var dynamic_object = null;

    dynamic_object = document.createElement('link');
    dynamic_object.setAttribute('rel', 'Stylesheet');
    dynamic_object.setAttribute('type', 'text/css');
    dynamic_object.setAttribute('media', 'screen');
    dynamic_object.setAttribute('href', '/framework/extensions/ajax/banana/themes/default.css');

    document.getElementsByTagName('head')[0].appendChild(dynamic_object);

    dynamic_object = document.createElement('div');

    dynamic_object.id = 'banana';
    dynamic_object.innerHTML = '<div class="banana_trigger" title="Dudes, send us your suggestions!"><br>O<br>P<br>E<br>N<br><br>M<br>E</div>' + 
                               '<div class="banana_body">' + 
                               '<div class="banana_title">User Suggestions</div>' + 
                               '<div class="banana_box">' + 
                               '<textarea id="banana_suggestion" placeholder="Please write your suggestions in here..."></textarea>' + 
                               '</div>' + 
                               '<div><input id="banana_send" type="button" value="Send"></div>' + 
                               '<div id="banana_info"></div>' + 
                               '</div>';

    setTimeout(function()
               {

                    document.getElementById('desktop').appendChild(dynamic_object);

                    document.getElementById('banana_send').addEventListener('click', function() { __Banana_Post(); }, false);

                    $('.banana_trigger').click(function () { $('#banana').stop().animate({ right: --c % 2 * 205 }, 500); });               

               }, 1500);

    return false;

}

// Banana Post
function __Banana_Post()
{

    var url;
    var data;
    var result;
    var ajax = new bull();

    url = '/framework/extensions/ajax/banana/banana.php';
    data = 'suggestion=' + document.getElementById('banana_suggestion').value;

    result = ajax.response(url, data, 1);

    if (result === '1')
    {

        document.getElementById('banana_suggestion').value = '';
        document.getElementById('banana_info').innerHTML = 'Thank you Dude!!!';

        setTimeout(function() { document.getElementById('banana_info').innerHTML = ''; }, 1500);

        return true;

    }

    document.getElementById('banana_info').innerHTML = 'Houston, we have a problem...';

    setTimeout(function() { document.getElementById('banana_info').innerHTML = ''; }, 1500);

    return false;

}
