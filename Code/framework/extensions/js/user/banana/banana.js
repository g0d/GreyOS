/*
    GreyOS - Banana (Version: 1.4)

    File name: banana.js
    Description: This file contains the Banana - Suggestions manager widget.

    Coded by George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Banana
function Banana()
{
    var __dynamic_object = null,
        __is_open = false,
        __is_swiping = false
        __offset = -window.innerWidth,
        gfx = new fx(),
        utils = new vulcan();

        // Banana post
        function banana_post()
        {
            var utils = new vulcan(),
                data = 'gate=banana&suggestion=' + utils.objects.by_id('banana_suggestion').value;

            ajax_factory('post', data, function(result)
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
                    // Nothing...
            },
            function()
            {
                    // Nothing...
            });

            return true;
        }

    __dynamic_object = document.createElement('link');

    __dynamic_object.setAttribute('rel', 'Stylesheet');
    __dynamic_object.setAttribute('type', 'text/css');
    __dynamic_object.setAttribute('media', 'screen');
    __dynamic_object.setAttribute('href', '/framework/extensions/js/user/banana/banana.css');

    document.getElementsByTagName('head')[0].appendChild(__dynamic_object);

    __dynamic_object = document.createElement('div');

    __dynamic_object.id = 'banana';
    __dynamic_object.innerHTML = `<div id="toggle" class="banana_trigger" title="Dudes, send us your suggestions!">
                                    <br><br><br>O<br>P<br>E<br>N<br><br>M<br>E</div>
                                    <div class="banana_body">
                                        <div class="banana_title">User Suggestions</div>
                                            <div class="banana_box">
                                                <textarea id="banana_suggestion" placeholder="Please write your suggestions in here..."></textarea>
                                            </div>
                                        <div><input id="banana_send" type="button" value="Send"></div>
                                    <div id="banana_info"></div>
                                  </div>`;

    utils.objects.by_id('desktop').appendChild(__dynamic_object);

    setTimeout(function()
               {
                    function toggle()
                    {
                        if (__is_open)
                        {
                            if (__is_swiping === true)
                                return false;

                            __is_swiping = true;

                            gfx.animation.swipe(__dynamic_object.id, 1, 'right', 205, 0, 15, 15, 
                            function()
                            {
                                __offset = -15;
                                __is_open = false;
                                __is_swiping = false;
                            });
                        }
                        else
                        {
                            if (__is_swiping === true)
                                return false;

                            __is_swiping = true;

                            gfx.animation.swipe(__dynamic_object.id, 1, 'left', 220, __offset, 15, 15, 
                            function()
                            {
                                __is_open = true;
                                __is_swiping = false;
                            });
                        }
                    }
                    utils.objects.by_id('toggle').addEventListener('click', function() { toggle(); }, false);
                    utils.objects.by_id('banana_send').addEventListener('click', function() { banana_post(); }, false);
               }, 1500);

    return true;
}
