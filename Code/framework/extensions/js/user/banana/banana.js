/*
    GreyOS - Banana (Version: 1.4)
    
    File name: banana.js
    Description: This file contains the Banana - Suggestions manager widget.
    
    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2021
    Open Software License (OSL 3.0)
*/

// Banana
function Banana()
{
    var dynamic_object = null,
        utils = new vulcan();

    dynamic_object = document.createElement('link');

    dynamic_object.setAttribute('rel', 'Stylesheet');
    dynamic_object.setAttribute('type', 'text/css');
    dynamic_object.setAttribute('media', 'screen');
    dynamic_object.setAttribute('href', '/framework/extensions/js/user/banana/banana.css');

    document.getElementsByTagName('head')[0].appendChild(dynamic_object);

    dynamic_object = document.createElement('div');

    dynamic_object.id = 'banana';
    dynamic_object.innerHTML = '<div class="banana_trigger" title="Dudes, send us your suggestions!">' + 
                                                                   '<br><br><br>O<br>P<br>E<br>N<br><br>M<br>E</div>' + 
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
                    utils.objects.by_id('desktop').appendChild(dynamic_object);
                    utils.objects.by_id('banana_send').addEventListener('click', function() { __Banana_Post(); }, false);
               }, 1500);

    return true;
}

// Banana Post
function __Banana_Post()
{
    var utils = new vulcan(),
        data = 'gate=banana&suggestion=' + utils.objects.by_id('banana_suggestion').value;

    ajax_factory(data, function(result)
                       {
                            utils.objects.by_id('banana_suggestion').value = '';

                            if (result === '1')
                                utils.objects.by_id('banana_info').innerHTML = 'Thank you dude!';
                            else
                                utils.objects.by_id('banana_info').innerHTML = 'Houston, we have a problem...';

                            setTimeout(function() { utils.objects.by_id('banana_info').innerHTML = ''; }, 1500);
                       },
                       function()
                       {

                       },
                       function()
                       {
                            
                       });

    return true;
}
