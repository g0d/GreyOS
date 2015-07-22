<?php

    /*
    
        GreyOS - ALPHA CMS
        
        Version: 10.0
        
        File name: dhtml.php
        Description: This file contains the front-end DHTML.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    if (!defined('ALPHA_CMS'))
        die('ERROR: Unable to load ALPHA CMS!');
    
    $this_lang = ALPHA_CMS::Get_Language();

    $result = ALPHA_CMS::MVC_Setup_Route('verify');

    $this_route = ALPHA_CMS::MVC_Get_Route('1');
    $routes = ALPHA_CMS::MVC_Get_Route('2');

    if (substr($_SERVER['QUERY_STRING'], 7, 6) !== 'verify')
    {

        if (!in_array($this_route, $routes))
            header('Location: http://' . $_SERVER['HTTP_HOST'] . '/');

    }

    if (!empty($_POST['logoff_id']) && !is_nan($_POST['logoff_id']))
    {

        session_destroy();

        if ($this_lang === 'en')
            header('Location: http://' . $_SERVER['HTTP_HOST']);

        else
            header('Location: http://' . $_SERVER['HTTP_HOST'] . '/' . $this_lang);

        exit();

    }

    require_once('cms/site/common/php/doc_type.php');

    function fix_user()
    {

        $final_str = 'New User (' . $_SESSION['TALOS']['username'] . ')';

        if (strlen($final_str) > 15)
            $final_str = substr($final_str, 0, 15) . '...';

        echo $final_str;

    }

    function fix_mail()
    {

        $final_str = $_SESSION['TALOS']['email'];

        if (strlen($final_str) > 15)
            $final_str = substr($final_str, 0, 15) . '...';

        echo $final_str;

    }

?>

<html> <!-- To add: manifest="greyos.appcache" -->
    <head>
        <?php

            require_once('cms/site/front_end/php/header.php');

            ALPHA_CMS::Load_Extension('dragon', 'php');

            DRAGON::Put('your_action', 'your_route');

            if (substr($_SERVER['QUERY_STRING'], 7, 6) !== 'verify')
            {

                if (!empty($_SESSION['TALOS']) && is_array($_SESSION['TALOS']))
                    require_once('cms/site/front_end/php/ext_loader.php');

            }

        ?>
    </head>
    <body>
        <?php

            if (substr($_SERVER['QUERY_STRING'], 7, 6) === 'verify')
                require_once('cms/site/front_end/php/verify.php');

            else
            {

                if (!empty($_SESSION['TALOS']) && is_array($_SESSION['TALOS']))
                {

        ?>
        <script type="text/javascript" src="/cms/site/front_end/js/bootstrap.js"></script>
        <div id="greyos" class="cancel_user_select">
            <div id="top_panel">
                <div id="top_area">
                    <div id="logo"></div>
                    <div id="user_profile" title="Profile settings - No fucntionality in the DEMO!">
                        <div id="notifications_num">01</div>
                        <div id="profile_access">
                            <div id="small_avatar"></div>
                            <div id="my">My profile</div>
                        </div>
                    </div>
                    <div id="clock"></div>
                    <div id="user_profile_pop_up">
                        <div id="profile_left_side">
                            <div id="info">
                                <div id="big_avatar"></div>
                                <div id="user_data">
                                    <div id="user_full_name" title="<?php echo $_SESSION['TALOS']['username']; ?>"><?php fix_user(); ?></div>
                                    <div id="user_email" title="<?php echo $_SESSION['TALOS']['email']; ?>"><?php fix_mail(); ?></div>
                                    <div id="user_account">Account</div>
                                    <div id="separator">|</div> 
                                    <div id="user_settings">Settings</div>
                                    <div id="user_share_location">Share my location</div>
                                </div>
                            </div>
                        </div>
                        <div id="profile_right_side">
                            <div id="notifications">
                                <div id="total_notifications">
                                    <div id="eye" class="alt_eye"></div>
                                    <div id="notifications_num" class="alt_notifications">00</div>
                                </div>
                                <div id="notifications_list">
                                    <div id="messages" class="notification_list_item">
                                        <div class="item_details">
                                            <div id="messages_icon" class="list_item_icon"></div>
                                            <div id="messages_text" class="list_item_text">Messages</div>
                                        </div>
                                        <div id="notifications_num" class="list_item_notifications">01</div>
                                    </div>
                                    <div id="alerts" class="notification_list_item">
                                        <div class="item_details">
                                            <div id="alerts_icon" class="list_item_icon"></div>
                                            <div id="alerts_text" class="list_item_text">Alerts</div>
                                        </div>
                                        <div id="notifications_num" class="list_item_notifications">00</div>
                                    </div>
                                    <div id="scheduler" class="notification_list_item">
                                        <div class="item_details">
                                            <div id="scheduler_icon" class="list_item_icon"></div>
                                            <div id="scheduler_text" class="list_item_text">Scheduler</div>
                                        </div>
                                        <div id="notifications_num" class="list_item_notifications">00</div>
                                    </div>
                                    <div id="tips" class="notification_list_item alt_list_item">
                                        <div class="item_details">
                                            <div id="tips_icon" class="list_item_icon"></div>
                                            <div id="tips_text" class="list_item_text">Tips</div>
                                        </div>
                                        <div id="notifications_num" class="list_item_notifications">00</div>
                                    </div>
                                </div>
                            </div>
                            <?php ALPHA_CMS::Load_Extension('log_off', 'php'); ?>
                        </div>
                    </div>
                </div>
                <div id="bottom_area">
                    <div id="action_icons"></div>
                    <div id="dynamic_container">
                        <div id="favorite_apps"></div>
                        <div id="eureka">
                            <div id="eye" title="Philos :: Your personal assistant! Coming soon..."></div>
                            <div id="search_area">
                                <input id="eureka_search_box" type="text" value="" placeholder="What's next?">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="desktop"></div>
            <audio autoplay>
                <source src="/cms/themes/greyos/sounds/login.mp3" type="audio/mpeg">
            </audio>
            <?php

                    }

                    else
                    {

                        ALPHA_CMS::Load_Extension('boo', 'js');
                        ALPHA_CMS::Load_Extension('talos', 'php');
                        ALPHA_CMS::Load_Extension('talos', 'ajax');

                        TALOS();

                    }

                }

            ?>
        </div>
        <audio id="button_sound">
            <source src="/cms/themes/greyos/sounds/button_click.mp3" type="audio/mpeg">
        </audio>
        <audio id="pong_sound">
            <source src="/cms/themes/greyos/sounds/pong.wav" type="audio/mpeg">
        </audio>
    </body>
</html>
