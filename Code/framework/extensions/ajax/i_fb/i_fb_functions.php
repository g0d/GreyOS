<?php

	/*

        GreyOS Inc. - iFb AJAX functions
        
        Version: 1.0
        
        File name: i_fb_ajax.php
        Description: This file contains the iFb functions used in i_fb.php.
        
        Coded by Zlatko Jankovic
        
        GreyOS Inc.
        Copyright © 2014

    */

    // Include spl@sh extension in order to generate HTML
    ALPHA_CMS::Load_Extension('splash', 'php');

    // Include Flora extension
    ALPHA_CMS::Load_Extension('flora', 'php');
    
    // Include Thor extension in order to secure Facebook inputs.
    ALPHA_CMS::Load_Extension('thor', 'php');
    
    require_once(ALPHA_CMS::Absolute_Path('') . 'framework/extensions/php/i_fb/i_fb.php');
    
    class I_FB_AJAX extends I_FB
    {
        
        public function __construct()
        {

            $config = array('app_id' => '611181349076417',
                            'secret' => '30a98c12450c059f6c0fe878307374c0');

            parent::__construct($config);

        }
        
        private $my_id;
        
        public function Start()
        {
            
            $user = $this->Get_User();
            
            if ($user)
            {

                echo $this->Display_Main(); //everything is OK
                
                return true;

            }

            else
            {
                   
                $this->Display_Login();

                return true;
                
            }
            
            return false;

        }
        
        public function Display_Login()
        {
            
            $splash_html = new SPLASH();
            
            $login_url = $this->Login();
            
            $button = $splash_html->Button(1, array('id' => 'facebook_login_button', 
                                                    'value' => 'Sign in', 'type' => 'button',
                                                    'data-url' => $login_url));
            $image = $splash_html->Image(1, array('id' => 'facebook_login_button_background', 
                                                  'src' => '/framework/extensions/js/i_fb/themes/pix/loginbg.png',
                                                  'alt' => 'Sign in'));
            $button_content = $button . $image;
            $div_button = $splash_html->Div(1, $button_content, array('id' => 'facebook_login_button_div'));
            $div_login = $splash_html->Div(1, '', array('id' => 'facebook_login_greyos'));
            $content = $div_login . $div_button;
            $return_div = $splash_html->Div(1, $content, array('id' => 'facebook_login_div'));
            
            echo $return_div;
            
            return true;
            
        }
        
        public function Display_Main()
        {
            
            $splash_html = new SPLASH();
            
            $navi = $splash_html->Div(1, $this->Display_Upper_Menu(), array('id' => 'i_fb_navigation'));
        
            $main = $splash_html->Div(1, $this->Display_Wall(), array('id' => 'i_fb_main_content'));
            
            $all = $navi . $main;
            
            return $all;
            
        }
        
        public function Display_Upper_Menu()
        {
            
            $splash_html = new SPLASH();
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/home.png', 'alt' => 'Home'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Home', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'feed'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_home = $div_menu_box . $div_separator;
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/profile.png', 'alt' => 'Profile'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Profile', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'profile'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_profile = $div_menu_box . $div_separator;
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/friend_icon.png', 'alt' => 'Requests'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Requests', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'requests'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_requests = $div_menu_box . $div_separator;
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/message_icon.png', 'alt' => 'Messages'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Messages', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'inbox'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_inbox = $div_menu_box . $div_separator;
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/notifications_icon.png', 'alt' => 'Notifications'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Notifications', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'nots'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_nots = $div_menu_box . $div_separator;
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/photos_icon.png', 'alt' => 'Photos'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Photos', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'photo'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_photos = $div_menu_box . $div_separator;
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/checkin_icon.png', 'alt' => 'Checkin'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Checkin', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'checkin'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_checkin = $div_menu_box . $div_separator;
            
            $image_menu = $splash_html->Image(1, array('src' => '/framework/extensions/js/i_fb/themes/pix/upper_menu_icons/status_icon.png', 'alt' => 'Status'));
            $div_box_left = $splash_html->Div(1, $image_menu, array('id' => 'box_left'));
            $div_box_right = $splash_html->Div(1, 'Status', array('id' => 'box_right'));
            $div_box = $div_box_left . $div_box_right;
            $div_type = $splash_html->Div(1, $div_box, array('id' => 'status'));
            $div_menu_box = $splash_html->Div(1, $div_type, array('class' => 'menu_box'));
            $div_separator = $splash_html->Div(1, '', array('id' => 'i_fb_menu_separator'));
            $display_status = $div_menu_box . $div_separator;
            
            $display = $display_home . $display_profile . $display_requests . $display_inbox . $display_nots .
                       $display_photos . $display_checkin . $display_status;
           
            return $display;
            
        }
        
        public function Display_Wall($echo = 0)
        {
            
            $splash_html = new SPLASH();
            
            $wall_posts = $splash_html->Div(1, $this->Display_Wall_Posts(), array('id' => 'wall_posts'));
            
            $show_more_posts = $splash_html->Div(1, $this->Wall_Show_More(), array('class' => 'show_more_posts'));
            
            $display = $wall_posts . $show_more_posts;
            
            if ($echo)
            {
                
                echo $display;
                return true;          
                
            }
                
            else
                return $display;

        }
        
        public function Display_Wall_Posts($from = 0)
        {
            
            $splash_html = new SPLASH();

            $this->my_id = $this->Get_User();
			
            $display = '';
            
            $wall = $this->Get_Wall_Posts($from);
            
            $wall_size = count($wall);
           
            for ($i = 0; $i < $wall_size; $i++)
            {
                
                $fb_content = self::Print_Fb_Content($wall[$i]['message'], $wall[$i]['post_id'] );
                
                $content = $splash_html->Div(1, $fb_content, array('class' => 'post_message'));
				
                switch($wall[$i]['type'])
                {

                    // case 11:
                    //     $post_type = 'Group created';
                    //     break;

                    // case 12:
                    //     $post_type = 'Event created';
                    //     break;

                    case 46:
                        $post_type = 'Status update';
                        $media_length = count($wall[$i]['attachment']['media']);
                        //$content .= $wall[$i]['message'];

                        for ($j = 0; $j < $media_length; $j++)
                        {
                                
                            $content .= $splash_html->Image(1, array('id' => 'display_wall_image',
                                                                     'data-id' => $wall[$i]['attachment']['media'][$j]['photo']['fbid'],
                                                                     'src' => $wall[$i]['attachment']['media'][$j]['src'],
                                                                     'alt' => 'image'));
                            
                        }
                        break;

                    // case 56:
                    //     $post_type = 'Post on wall from another user';
                    //     break;

                    case 60:
                        $post_type = 'Changed profile picture';
                        $content .= $splash_html->Image(1, array('id' => 'display_wall_image',
                                                                 'data-id' => $wall[$i]['attachment']['media'][0]['photo']['fbid'],
                                                                 'src' => $wall[$i]['attachment']['media'][0]['src'],
                                                                 'alt' => 'image'));
                        break;

                    case 65:
                        $post_type = 'Tagged photo';
                        $media_length = count($wall[$i]['attachment']['media']);

                        for ($j = 0; $j < $media_length; $j++)
                        {
                            
                            $content .= $splash_html->Image(1, array('id' => 'display_wall_image',
                                                                     'data-id' => $wall[$i]['attachment']['media'][$j]['photo']['fbid'],
                                                                     'src' => $wall[$i]['attachment']['media'][$j]['src'],
                                                                     'alt' => 'image',
                                                                     'data-url' => $wall[$i]['attachment']['media'][$j]['photo']['images'][1]['src'],
                                                                     'data-width' => $wall[$i]['attachment']['media'][$j]['photo']['images'][1]['width'],
                                                                     'data-height' => $wall[$i]['attachment']['media'][$j]['photo']['images'][1]['height'],
                                                                     'data-position' => $j));
                            
                        }
                        break;

                    // case 66:
                    //     $post_type = 'Note created';
                    //     break;

                    case 80:
                        $post_type = 'Link posted';

                        if ($wall[$i]['attachment']['media'][0]['type'] === 'video')
                            $content .= self::Print_Post_Link($wall[$i]['attachment']['href'], $wall[$i]['attachment']['media'][0]['src'], 
                                                              $wall[$i]['attachment']['name'], $wall[$i]['attachment']['description']);

                        else if ($wall[$i]['attachment']['media'][0]['type'] === 'photo')
                            $content .=self::Print_Post_Link($wall[$i]['attachment']['href'], $wall[$i]['attachment']['media'][0]['src'],
                                                             $wall[$i]['attachment']['name'], $wall[$i]['attachment']['description']);

                        else if ($wall[$i]['attachment']['media'][0]['type'] === 'link')
                            $content .= self::Print_Post_Link($wall[$i]['attachment']['href'], $wall[$i]['attachment']['media'][0]['src'],
                                                              $wall[$i]['attachment']['name'], $wall[$i]['attachment']['caption'] . $wall[$i]['attachment']['description']);
                        break;

                    // case 128:
                    //     $post_type = 'Video posted';
                    //     break;

                    // case 161:
                    //     $post_type = 'Likes*';
                    //     break;
  
                    // case 164:
                    //     $post_type = 'Posted a status on a group page';
                    //     break;

                    // case 237:
                    //     $post_type = 'App/Games story';
                    //     break;
                        
                    // case 245:
                    //     $post_type = 'Likes a photo/Link*';
                    //     break;

                    case 247:
                        $post_type = 'Photos posted';
                        $media_length = count($wall[$i]['attachment']['media']);

                        for ($j = 0; $j < $media_length; $j++)
                        {
                            
                            $content .= $splash_html->Image(1, array('id' => 'display_wall_image',
                                                                     'data-position' => $j,
                                                                     'data-id' => $wall[$i]['attachment']['media'][$j]['photo']['fbid'],
                                                                     'src' => $wall[$i]['attachment']['media'][$j]['src'],
                                                                     'alt' => 'image'));
                            
                        }
                        
                        break; 

                    // case 257:
                    //     $post_type = 'Comment created';
                    //     break;

                    // case 272:
                    //     $post_type = 'App story';
                    //     break;

                    // case 283:
                    //     $post_type = 'Likes a Link';
                    //     break;

                    // case 285:
                    //     $post_type = 'Checkin to a place';
                    //     break;

                    // case 295:
                    //     $post_type = 'Post to Timeline of a friend from other friend';
                    //     break;

                    // case 308:
                    //     $post_type = 'Post in Group';
                    //     break;

                    case 347:
                        $post_type = 'Likes a Link';
                            
                        if ($wall[$i]['attachment']['media'][0]['type'] === 'video' && $wall[$i]['attachment']['media'][0]['src'] != null)
                            $content .= self::Print_Post_Link($wall[$i]['attachment']['href'], $wall[$i]['attachment']['media'][0]['src'],
                                                              $wall[$i]['attachment']['name'], $wall[$i]['attachment']['description']);

                        else if ($wall[$i]['attachment']['media'][0]['type'] === 'photo'  && $wall[$i]['attachment']['media'][0]['src'] != null)
                            $content .= self::Print_Post_Link($wall[$i]['attachment']['href'], $wall[$i]['attachment']['media'][0]['src'], 
                                                              $wall[$i]['attachment']['name'], $wall[$i]['attachment']['description']);

                        else if ($wall[$i]['attachment']['media'][0]['type'] === 'link'  && $wall[$i]['attachment']['media'][0]['src'] != null)
                            $content .= self::Print_Post_Link($wall[$i]['attachment']['href'], $wall[$i]['attachment']['media'][0]['src'],
                                                              $wall[$i]['attachment']['name'], $wall[$i]['attachment']['caption'] . $wall[$i]['attachment']['description']);                        
                        break;

                    case 373:
                        $post_type = 'Updated cover photo';
                        $content .= $splash_html->Image(1, array('id' => 'display_wall_image',
                                                                 'data-id' => $wall[$i]['attachment']['media'][0]['photo']['fbid'],
                                                                 'src' => $wall[$i]['attachment']['media'][0]['src'],
                                                                 'alt' => 'image'));
                        break;
					
                }

                $post_id = $wall[$i]['post_id'];
                    
                $actor_name = ($this->Get_User_By_Id($wall[$i]['actor_id'])) ?: 
                               json_decode(file_get_contents('http://graph.facebook.com/' . $wall[$i]['actor_id'] .'?fields=name'))->name;
                
                if ($wall[$i]['description'] !== null)
                {
                    $array = explode($actor_name, $wall[$i]['description']);

                    $description = $array[1];

                }

                else
                    $description = '';
				
                if ($wall[$i]['like_info']['can_like'])
                {   
                    
                    if ($wall[$i]['like_info']['user_likes'])
                    {
                        
                        $like_icon = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                  'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png',
                                                                  'alt' => 'likes'));
                        
                        $like_count = $splash_html->Div(1, $wall[$i]['like_info']['like_count'], array('id' => 'like_count'));
                        
                        $l_content = 'Unlike' . $like_icon . $like_count; 
                        
                        $like_content = $splash_html->Div(1, $l_content, array('id' => 'unlike_post',
                                                                               'data-id' => $post_id));

                    }
                    
                    else
                    {
                        
                        $like_icon = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                  'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png',
                                                                  'alt' => 'likes'));
                        
                        $like_count = $splash_html->Div(1, $wall[$i]['like_info']['like_count'], array('id' => 'like_count'));
                        
                        $l_content = 'Like' . $like_icon . $like_count; 
                        
                        $like_content = $splash_html->Div(1, $l_content, array('id' => 'like_post',
                                                                               'data-id' => $post_id));

                    }

                }
                
                else
                    $like_content ='';

                if ($wall[$i]['comment_info']['can_comment'])
                {
                    
                    $comment_icon = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                 'src' => '/framework/extensions/js/i_fb/themes/pix/comments.png',
                                                                 'alt' => 'comments'));
                        
                    $comment_count = $wall[$i]['comment_info']['comment_count'];

                    $c_content = 'Comments' . $comment_icon . $comment_count; 

                    $comment_content = $splash_html->Div(1, $c_content, array('id' => 'com' . $post_id));

                }

                else
                    $comment_content = '';

                if ($wall[$i]['share_info']['can_share'])
                {
                    
                    $share_icon = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                               'src' => '/framework/extensions/js/i_fb/themes/pix/shares.png',
                                                               'alt' => 'shares'));
                        
                    $share_count = $wall[$i]['share_info']['share_count'];

                    $s_content = 'Share' . $share_icon . $share_count; 

                    $share_content = $splash_html->Div(1, $s_content, array('id' => 'shr' . $post_id));
                                     
                }

                else
                    $share_content = '';
                
                
                $profile_picture = $splash_html->Image(1, array('class' => 'profile_picture',
                                                                'src' => 'https://graph.facebook.com/' . $wall[$i]['actor_id'] . '/picture?width=50&height=50',
                                                                'alt' => 'image'));
                
                $profile_img_link = $splash_html->Link(1, $profile_picture, array('href' => '#',
                                                                                  'class' => 'profile_img_link'));
                
                $profile_link = $splash_html->Link(1, $actor_name, array('href' => '#',
                                                                         'class' => 'profile_link'));
                
                $d_post_type = $splash_html->Div(1, $description, array('class' => 'post_type'));
                
                $fb_date = $splash_html->Div(1, $this->Facebook_Time_Convert($wall[$i]['created_time']), array('class' => 'fb_date2'));
                
                $post_content = $splash_html->Div(1, $content, array('class' => 'post_content'));
                
                $like = $splash_html->Div(1, $like_content, array('class' => 'like'));
                
                $comment = $splash_html->Div(1, $comment_content, array('class' => 'comments',
                                                                        'data-count' => $wall[$i]['comment_info']['comment_count']));
                
                $share = $splash_html->Div(1, $share_content, array('class' => 'share'));
                
                $answer_content = $like . $comment . $share;
                
                $answer2 = $splash_html->Div(1, $answer_content, array('id' => 'answer2'));
                
                $box_bottom = $splash_html->Div(1, $answer2, array('id' => 'box_bottom'));
                
                $pcb_content = $profile_link . $d_post_type . $fb_date . $post_content . $box_bottom;
                
                $post_content_box = $splash_html->Div(1, $pcb_content, array('class' => 'post_content_box'));
                
                $comments_area = $splash_html->Div(1, '', array('class' => 'comments_area',
                                                                'id' => 'commentsarea' . $post_id));
                
                $comments_area_outer_for_infinity = $splash_html->Div(1, $comments_area, array('class' => 'comments_area_outer_for_infinity',
                                                                                               'id' => 'commentsareaouter' . $post_id));
                
                $box_content = $profile_img_link . $post_content_box . '<br style="clear:both" />' . $comments_area_outer_for_infinity;
                
                $display .= $splash_html->Div(1, $box_content, array('id' => 'box'));
                
				                    
            }
            
            if ($from)
            {
                
                echo $display;
                
                return true;
                
            }
            
            else
                return $display;

        }
        
        public function Wall_Show_More($id = 0)
        {
            
            $splash_html = new SPLASH();
            
            $display = $splash_html->Button(1, array('type' => 'button',
                                                     'id' => 'show_more_button',
                                                     'data-section' => 'home',
                                                     'data-id' => $id,
                                                     'value' => 'Show More'));

            return $display;
            
        }
        
        public function Display_Profile($user = 0)
        {
            
            $splash_html = new SPLASH();
                        
            if ($user === 0)
                $user = $this->Get_User();
            
            $user_profile_cover = $this->Api('/' . $user . '?fields=cover');
            $user_profile = $this->Api('/' . $user);
            
            $cover_picture = $splash_html->Image(1, array('id' => 'fb_cover',
                                                          'src' => $user_profile_cover['cover']['source'],
                                                          'alt' => 'cover'));
            $profile_picture = $splash_html->Image(1, array('id' => 'profile_picture',
                                                          'src' => 'https://graph.facebook.com/' . $user . '/picture?width=100&height=100',
                                                          'alt' => 'profile'));
            
            $profile_name = $splash_html->Div(1, $user_profile['name'], array('id' => 'profile_name'));
            
            $cover_content = $cover_picture . $profile_picture . $profile_name;
            
            $cover = $splash_html->Div(1, $cover_content, array('class' => 'cover'));
            
            $profile_menu = $splash_html->Div(1, '', array('class' => 'profile_menu'));
            
            $about_header = $splash_html->Div(1, '<h4>About</h4>', array('class' => 'about_box_header'));
            
            $about_content = '';

            if (isset($user_profile['link']))
                $about_content .= $splash_html->Div(1, 'Link: ' . $user_profile['link'], array('id' => 'profile_about'));

            if (isset($user_profile['hometown']['name']))
                $about_content .= $splash_html->Div(1, 'Hometown: ' . $user_profile['hometown']['name'], array('id' => 'profile_about'));

            if (isset($user_profile['location']['name']))
                $about_content .= $splash_html->Div(1, 'Location: ' . $user_profile['location']['name'], array('id' => 'profile_about'));

            if (isset($user_profile['work'][0]['employer']['name']))
                $about_content .= $splash_html->Div(1, 'Works at: ' . $user_profile['work'][0]['employer']['name'], array('id' => 'profile_about'));

            if (isset($user_profile['religion']))
                $about_content .= $splash_html->Div(1, 'Religion: ' . $user_profile['religion'], array('id' => 'profile_about'));

            if (isset($user_profile['gender']))
                $about_content .= $splash_html->Div(1, 'Sex: ' . $user_profile['gender'], array('id' => 'profile_about'));

            if (isset($user_profile['relationship_status']))
                $about_content .= $splash_html->Div(1, 'Relationship Status: ' . $user_profile['relationship_status'], array('id' => 'profile_about'));

            if (isset($user_profile['email']))
                $about_content .= $splash_html->Div(1, 'Email: ' . $user_profile['email'], array('id' => 'profile_about'));

            if (isset($user_profile['website']))
                $about_content .= $splash_html->Div(1, 'Website: ' . $user_profile['website'], array('id' => 'profile_about'));

            if (isset($user_profile['languages']))
            {
                
                $size_languages = count($user_profile['languages']);

                for ($i = 0; $i < $size_languages; $i++)
                {

                    $languages[] = $user_profile['languages'][$i]['name'];

                }	

                $speaks = implode($languages, ', ');
                
                $about_content .= $splash_html->Div(1, 'Speaks: ' . $speaks, array('id' => 'profile_about'));

            }
            
            $about_box = $splash_html->Div(1, $about_content, array('id' => 'about_box_content'));
            
            $profile_about = $splash_html->Div(1, $about_header . $about_box, array('id' => 'fb_profile_about_box'));
            
            $class_about = $splash_html->Div(1, $profile_about, array('class' => 'fb_profile_about_box'));
            
            $profile_feed = $splash_html->Div(1, $this->Display_Feed($user), array('class' => 'profile_feeds'));
            
            $main_content = $cover . $profile_menu . $class_about . $profile_feed;
            
            echo $main_content;

            return true;

        }
        
        public function Display_Feed($user = 0)
        {

            if ($user === 0)
                $user = $this->Get_User();
            
            $splash_html = new SPLASH();

            $feed = $this->Api('/'. $user . '/feed');
            $size_feed = count($feed['data']);
            $display = '';

            for ($i = 0; $i < $size_feed; $i++)
            {
                
                $image_link = $splash_html->Image(1, array('class' => 'profile_picture',
                                                           'title' => $feed['data'][$i]['from']['name'],
                                                           'src' => 'src="https://graph.facebook.com/' . $feed['data'][$i]['from']['id'] . '/picture',
                                                           'alt' => 'image link'));
                
                $profile_img_link = $splash_html->Link(1, $image_link, array('href' => '#',
                                                                             'class' => 'profile_img_link'));
                
                $profile_link = $splash_html->Label(1, $feed['data'][$i]['from']['name'], array('href' => '#',
                                                                                                'class' => 'profile_link'));
                
                $fb_date = $splash_html->Div(1, $this->Facebook_Time_Convert( strtotime($feed['data'][$i]['created_time'])), array('class' => 'fb_date2'));

                $message_content = $feed['data'][$i]['message'] . $feed['data'][$i]['story'];

                $p_content = self::Print_Fb_Content($message_content, $feed['data'][$i]['id'] );

                if (isset($feed['data'][$i]['link']))
                {
                    
                    if (self::_Is_YT_Video($feed['data'][$i]['link']))
                    {
                        
                        $link_image = $splash_html->Image(1, array('class' => 'post_link_image',
                                                                   'src' => $feed['data'][$i]['picture'],
                                                                   'alt' => 'image'));
                        
                        $link = $splash_html->Link(1, $link_image, array('class' => 'fb_yt_video',
                                                                         'href' => $feed['data'][$i]['link'],
                                                                         'target' => '_blank'));
                        
                        $title = $splash_html->Link(1, $feed['data'][$i]['name'], array('class' => 'post_link_title',
                                                                                        'href' => $feed['data'][$i]['link'],
                                                                                        'target' => '_blank'));
                        
                        $description = $splash_html->Div(1, self::Make_Clickable(nl2br($feed['data'][$i]['description'])), array('class' => 'post_link_description'));
                        
                        $box_content = $link . $title . $description;
                        
                    }
                    
                    else
                    {
                        
                        $link_image = $splash_html->Image(1, array('class' => 'post_link_image',
                                                                   'src' => $feed['data'][$i]['picture'],
                                                                   'alt' => 'image'));
                        
                        $link = $splash_html->Link(1, $link_image, array('href' => $feed['data'][$i]['link'],
                                                                         'target' => '_blank'));
                        
                        $title = $splash_html->Link(1, $feed['data'][$i]['name'], array('class' => 'post_link_title',
                                                                                        'href' => $feed['data'][$i]['link'],
                                                                                        'target' => '_blank'));
                        
                        $description = $splash_html->Div(1, self::Make_Clickable(nl2br($feed['data'][$i]['description'])), array('class' => 'post_link_description'));
                        
                        $box_content = $link . $title . $description;
                        
                    }
                    
                    $post_link_box = $splash_html->Div(1, $box_content, array('class' => 'post_link_box'));

                }
                
                $post_message = $splash_html->Div(1, $p_content, array('class' => 'post_message'));
                
                $post_content = $splash_html->Div(1, $post_message . $post_link_box, array('class' => 'post_content'));
                
                $likes_data = self::Get_Likes_Data($feed['data'][$i]['likes']['data'], $user);
                
                $likes_data['title']='';
                
                $like_image = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                           'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png',
                                                           'alt' => 'likes'));
                
                $like_count = $splash_html->Div(1, $likes_data['count'], array('id' => 'like_count'));
                
                if ($likes_data['like/unlike'] == 'unlike')
                {
                    
                    $l_content = 'Unlike' . $like_image . $like_count;
                    
                    $likes_content = $splash_html->Div(1, $l_content, array('id' => 'unlike_post',
                                                                            'data-id' => $feed['data'][$i]['id'],
                                                                            'title' => $likes_data['title']));
                    
                }
                
                else
                {
                    
                    $l_content = 'Like' . $like_image . $like_count;
                    
                    $likes_content = $splash_html->Div(1, $l_content, array('id' => 'like_post',
                                                                            'data-id' => $feed['data'][$i]['id'],
                                                                            'title' => $likes_data['title']));
                    
                }               
                
                $likes = $splash_html->Div(1, $likes_content, array('class' => 'like'));
                
                $com_image = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                          'src' => '/framework/extensions/js/i_fb/themes/pix/comments.png',
                                                          'alt' => 'Shares'));
                
                $c_content = 'Comments ' . $com_image . $feed['data'][$i]['comments']['count'];
                
                $com_content = $splash_html->Div(1, $c_content, array('id' => 'com' . $feed['data'][$i]['id']));
                
                $comments = $splash_html->Div(1, $com_content, array('class' => 'comments',
                                                                     'data-count' => count($feed['data'][$i]['comments']['data'])));
                
                $shr_image = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                          'src' => '/framework/extensions/js/i_fb/themes/pix/shares.png',
                                                          'alt' => 'Shares'));
                
                $s_content = 'Share ' . $shr_image . $feed['data'][$i]['shares']['count'];
                
                $shr_content = $splash_html->Div(1, $s_content, array('id' => 'shr' . $feed['data'][$i]['id']));
                
                $shares = $splash_html->Div(1, $shr_content, array('class' => 'share'));
                
                $answer_content = $likes . $comments . $shares;
                
                $answer = $splash_html->Div(1, $answer_content, array('id' => 'answer2'));
                
                $box_bottom = $splash_html->Div(1, $answer, array('id' => 'box_bottom'));
                
                $post_content_box = $profile_link . $fb_date . $post_content . $box_bottom;
                
                $comments_area = $splash_html->Div(1, ' ', array('class' => 'comments_area',
                                                                 'id' => 'commentsarea' . $feed['data'][$i]['id']));
                
                $comments_out = $splash_html->Div(1, $comments_area, array('class' => 'comments_area_outer_for_infinity',
                                                                           'id' => 'commentsareaouter' . $feed['data'][$i]['id'])); 
                
                $b_content = $profile_img_link . $post_content_box . '<br style="clear:both">' . $comments_out;
                
                $display .= $splash_html->Div(1, $b_content, array('id' => 'box'));

            }
	
            return $display;

        }
        
        public static function Print_Fb_Content($content, $id)
        {
            
            $splash_html = new SPLASH();
            
            if (strlen($content) > 300)
            {
                
                $content = $splash_html->Div (1, self::Make_Clickable(nl2br($content)), array('id' => 'toggle-' . $id,
                                                                                              'class' => 'toggle_msg_content',
                                                                                              'style' => 'max-height:3.9em; overflow:hidden;'));
                
                $content .= $splash_html->Link(1, 'Show more', array('class' => 'toggle_msg_content',
                                                                     'href' => '#',
                                                                     'data-id' => 'toggle-' . $id));
                
            }
            
            else
                $content = self::Make_Clickable(nl2br($content));;

            return $content;

        }
        
        public static function Print_Post_Link($link, $img, $title, $description)
        {
            
            $splash_html = new SPLASH();
            $display .= '<div class="post_link_box" >';

            if (self::_Is_YT_Video($link))
            {
                
                $image = $splash_html->Image(1, array('class' => 'post_link_img',
                                                      'src' => $img,
                                                      'alt' => 'link image'));
                
                $l_content = $splash_html->Link(1, $image, array('class' => 'fb_yt_video',
                                                                 'href' => $link));
                
                $fb_img_box = $splash_html->Div(1, $l_content, array('class' => 'fb_img_box'));
                
                $fb_yt_video = $splash_html->Link(1, $title, array('href' => 'title',
                                                                   'class' => 'fb_yt_video post_link_title'));
                
                $post_link_description = $splash_html->Div(1, self::Make_Clickable(nl2br($description)), array('class' => 'post_link_desccription'));
                
                $content = $fb_img_box . $fb_yt_video . $post_link_description;
                
            }
                
            else
            {
                
                $image = $splash_html->Image(1, array('class' => 'post_link_img',
                                                      'src' => $img,
                                                      'alt' => 'link image'));
                
                $l_content = $splash_html->Link(1, $image, array('target' => '_blank',
                                                                 'href' => $link));
                
                $fb_img_box = $splash_html->Div(1, $l_content, array('class' => 'fb_img_box'));
                
                $fb_link = $splash_html->Link(1, $title, array('href' => $link,
                                                               'target' => '_blank',
                                                               'class' => 'post_link_title'));
                
                $post_link_description = $splash_html->Div(1, self::Make_Clickable(nl2br($description)), array('class' => 'post_link_desccription'));
                
                $content = $fb_img_box . $fb_link . $post_link_description;
                
            }
            
            $display = $splash_html->Div(1, $content, array('class' => 'post_link_box'));

            return $display;

        }
        
        public function Display_Requests()
        {
            
            $splash_html = new SPLASH();
            
            if (isset($_SERVER['HTTPS']))
            {

                $protocol = 'https';

            }

            else
            {

                $protocol = 'http';

            }

            $redirect_url = $protocol . '://' . $_SERVER['HTTP_HOST'] . '/framework/extensions/ajax/i_fb/i_fb.php';
            
            $friend_requests = $this->Get_Friend_Requests();
            
            $mutual_friends = $this->Get_Mutual_Friends();

            $number_of_friend_requests = count($friend_requests);

            if ($number_of_friend_requests === 0)
            {
                
                $message = 'No pending friend requests!';

                $no_requests = $splash_html->Div(1, $message , array('class' => 'fb_no_requests'));
                
                echo $no_requests;
                
                return true;               

            }

            for ($i = 0; $i < $number_of_friend_requests; $i++)
            {
                
                $image = $splash_html->Image(1, array('class' => 'profile_picture',
                                                      'src' => 'https://graph.facebook.com/' . $friend_requests[$i]['uid_from'] . '/picture?width=50&height=50',
                                                      'alt' => 'test'));
                
                $image_link = $splash_html->Link(1, $image, array('href' => '#',
                                                                       'class' => 'profile_img_link'));
                $profile_link = $splash_html->Link(1, $mutual_friends[$i]['name'], array('href' => '#',
                                                                                         'class' => 'profile_link'));
                
                $mutual_count = $mutual_friends[$i]['mutual_friend_count'];
                $redirect = 'http://www.facebook.com/dialog/friends?id=' . $friend_requests[$i]['uid_from'] . 
                            '&app_id=387173768076606&display=popup&redirect_uri=' . $redirect_url . '?friend=1';
                
                $confirm_button = $splash_html->Button(1, array('type' => 'button',
                                                               'id' => 'fb_confirm_request',
                                                               'value' => 'Confirm',
                                                               'data-friend' => $friend_requests[$i]['uid_from']));
                $button_div = $splash_html->Div(1, $confirm_button, array('class' => 'requests'));
                
                $mutual_friends_display = '<br>Mutual Friends (' . $mutual_count . ') ';
                
                $req_box = $image_link . $profile_link . $mutual_friends_display .  $button_div;
                
                $div_req_box = $splash_html->Div(1, $req_box, array('class' => 'req_box'));
                
                $div_box = $splash_html->Div(1, $div_req_box, array('id' => 'box'));
                
                echo $div_box;
                
                return true;

            }
            
        }
        
        public function Confirm_Request($friend_id)
        {
            
            //code to confirm request
            
            $confirmed = true;
            
            if ($confirmed)
            {
                
                $this->Display_Requests();
                
                return true;                
                
            }
            
            else
            {
                
                echo 'Something went wrong! Please try again.';
                
                return false;
                
            }
            
        }
        
        public function Display_Messages()
        {
            
            return 'Messages...';
            
        }
        
        public function Display_Notifications()
        {
            
            $splash_html = new SPLASH();
            
            $notifications = $this->Get_All_Notifications();
            
            $number_of_notifications = count($notifications);
            for ($i = 0; $i < $number_of_notifications; $i++)
            {
                
                $short_text = substr($notifications[$i]['title_text'], 0, 150) . '...';          
                $notification_text = $splash_html->Div(1, $short_text, array('class' => 'post_notification_text'));
                $notification_date = $splash_html->Div(1, $this->Facebook_Time_Convert($notifications[$i]['created_time']), array('class' => 'fb_date'));

                $notification_content = $notification_text . $notification_date;
                $fb_notification = $splash_html->Div(1, $notification_content, array('class' => 'fb_notification'));

                $button_view = $splash_html->Button(1, array('class' => 'notify_view', 
                                                             'id' => 'see' . $notifications[$i]['notification_id'], 
                                                             'value' => 'View',
                                                             'type' => 'button'));

                $button_delete = $splash_html->Button(1, array('id' => 'del' . $notifications[$i]['notification_id'],
                                                               'value' => 'Delete',
                                                               'type' => 'button'));

                $action_buttons = $button_view . $button_delete;

                $notification_action = $splash_html->Div(1, $action_buttons, array('class' => 'notification_actions'));

                $post_content = $fb_notification . $notification_action;

                $content = $splash_html->Div(1, $post_content, array('class' => 'post_content_box'));
                
                $profile_image = $splash_html->Image(1, array('class' => 'profile_picture',
                                                              'src' => 'https://graph.facebook.com/' . $notifications[$i]['sender_id'] . '/picture?width=50&height=50',
                                                              'alt' => 'Profile'));
                
                $profile_link = $splash_html->Link(1, $profile_image, array('href' => '#',
                                                                            'class' => 'profile_img_link'));
                
                $box_content = $profile_link . $content;
                
                if ($notifications[$i]['is_unread'])
                    $box_content = $splash_html->Div (1, $box_content, array('id' => 'box',
                                                                             'style' => 'background: #F6F7F8; font-weight:bold'));
                else
                    $box_content = $splash_html->Div (1, $box_content, array('id' => 'box'));
                    
                    
                $click_div = $splash_html->Div(1, $box_content, array('id' => $notifications[$i]['notification_id']));
                
            }

            echo $click_div;
            
            return true;

        }
        
        public function Display_Inbox()
        {
            
            $update_time = ALPHA_CMS::Execute_SQL_Command('UPDATE `oauth_facebook` 
                                                          SET `message_check_time` = "' . time() . '"
                                                          WHERE `user_id` = "' . $_SESSION['TALOS']["id"] . '"', 1);
            
            $splash_html = new SPLASH();

            $fql_inbox = $this->Thread_Query();
            
            $number_of_messages = count($fql_inbox);

            for ($i = 0; $i < $number_of_messages; $i++)
            {
				
                if ($fql_inbox[$i]['snippet_author'] == $this->my_id)
                    $sent_msg = true;

                else
                    $sent_msg = false;
				
                if ($fql_inbox[$i]['unread'])
                {
                    
                    $counter = ALPHA_CMS::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                   FROM `fb_unread_messages` 
                                                   WHERE `message_id` = "' . $fql_inbox[$i]['thread_id'] . '"');
                    if ($counter[0]['num'] > 0)
                    {
                        
                        $updated_time = ALPHA_CMS::Execute_SQL_Command('SELECT `updated_time` AS `time`
                                                       FROM `fb_unread_messages` 
                                                       WHERE `message_id` = "' . $fql_inbox[$i]['thread_id'] . '"');
                        
                        if ($updated_time[0]['time'] < $fql_inbox[$i]['updated_time'])
                            $splash_html->Div (1, '', array('id' => 'inbox_box',
                                                            'class' => 'viewmessage unread_msg',
                                                            'data-id' => $fql_inbox[$i]['thread_id']));
                        
                        else
                            $splash_html->Div (1, '', array('id' => 'inbox_box',
                                                            'class' => 'viewmessage read_msg',
                                                            'data-id' => $fql_inbox[$i]['thread_id']));
                        
                    }
                    
                    else
                        $splash_html->Div (1, '', array('id' => 'inbox_box',
                                                        'class' => 'viewmessage unread_msg',
                                                        'data-id' => $fql_inbox[$i]['thread_id']));
                    
                }
                
                else
                    $splash_html->Div (1, '', array('id' => 'inbox_box',
                                                    'class' => 'viewmessage read_msg',
                                                    'data-id' => $fql_inbox[$i]['thread_id']));
				
                if ($sent_msg)
                {

                    // -1 because we have my_id in array
                    $counts = count($fql_inbox[$i]['recipients']) - 1;

                    if ($counts > 0)
                        $width = 50/$counts;

                    else
                        $width = 50;

                    foreach ($fql_inbox[$i]['recipients'] as $recipient_id)
                    {

                        if (($this->my_id != $recipient_id) || ($counts === 0))
                        {

                            $author_name = ($this->Get_User_By_Id($recipient_id)) ?: 
                            json_decode(file_get_contents('http://graph.facebook.com/' . $recipient_id .'?fields=name'))->name;
                            
                            $image = $splash_html->Image(1, array('class' => 'profile_picture',
                                                                  'title' => $author_name,
                                                                  'style' => 'width:' . $width . 'px; margin-right:0px',
                                                                  'alt' => 'author',
                                                                  'src' => 'https://graph.facebook.com/' . $recipient_id . '/picture'));
                            $link = $splash_html->Link(1, $image, array('href' => '#',
                                                                        'class' => 'profile_img_link'));

                        }

                    }

                }

                else
                {

                    $people_in_conversation = array_merge($fql_inbox[$i]['recipients'], $fql_inbox[$i]['recent_authors']);
                    $people_in_conversation = array_unique($people_in_conversation);

                    // -1 because we have my_id in array
                    $counts = count($people_in_conversation) - 1;

                    if ($counts > 0)
                        $width = 50/$counts;

                    else
                        $width = 50;

                    foreach ($people_in_conversation as $author_id)
                    {

                        if (($this->my_id != $author_id) || ($counts === 0))
                        {

                            $author_name = ($this->Get_User_By_Id($author_id)) ?: json_decode(file_get_contents($author_id))->name;
                            
                            $image = $splash_html->Image(1, array('class' => 'profile_picture',
                                                                  'title' => $author_name,
                                                                  'style' => 'width:' . $width . 'px; margin-right:0px',
                                                                  'alt' => 'author',
                                                                  'src' => 'https://graph.facebook.com/' . $author_id . '/picture?width=40&height=40'));
                            $link = $splash_html->Link(1, $image, array('href' => '#',
                                                                        'class' => 'profile_img_link'));

                        }

                    }

                }
                
                $display .= '<div class="msg_preview_content_box">';

                if ($sent_msg)
                {
                    
                    foreach ($fql_inbox[$i]['recipients'] as $recipient_id)
                    {
                        
                        if (($this->my_id != $recipient_id) || ($counts === 0))
                        {
                            
                            $author_name = ($this->Get_User_By_Id($recipient_id)) ?:
                                    json_decode(file_get_contents('http://graph.facebook.com/' . $recipient_id .'?fields=name'))->name;
                            
                            $link = $splash_html->Link(1, $author_name, array('class' => 'profile_link',
                                                                              'href' => '#'));
                            
                            $output_to[] = $link;

                        }

                    }

                }

                else
                {
                    
                    $counts = count($fql_inbox[$i]['recent_authors']);
                    
                    for ($j = 0; $j < $counts; $j++)
                    {

                        if ($this->my_id != $fql_inbox[$i]['recent_authors'][$j])
                        {

                            $author_name = ($this->Get_User_By_Id($fql_inbox[$i]['recent_authors'][$j])) ?:
                                    json_decode(file_get_contents('http://graph.facebook.com/' . $fql_inbox[$i]['recent_authors'][$j] .'?fields=name'))->name;

                            if (($fql_inbox[$i]['recent_authors'][$j] != $user) || ($counts === 0))
                            {
                                
                                $link = $splash_html->Link(1, $author_name, array('class' => 'profile_link',
                                                                              'href' => '#'));
                            
                                $output_to[] = $link;
                                
                            }    

                        }

                    }

                }
                
                $msg_to_name_content = implode(', ', $output_to);
                
                $msg_to_names = $splash_html->Div(1, $msg_to_name_content , array('class' => 'msg_to_names'));

                unset($output_to);
                
                $delete_conversation = $splash_html->Div(1, 'X', array('class' => 'delete_inbox_msg',
                                                                       'title' => 'Delete conversation',
                                                                       'data-id' => $fql_inbox[$i]['thread_id']));
                
                $preview_content = '';
                
                if ($fql_inbox[$i]['snippet_author'] == $this->my_id)
                    $preview_content = $splash_html->Div (1, '(sent)', array('class' => 'sent_msg_notification'));
                
                $preview_content .= $fql_inbox[$i]['snippet'];
                
                $msg_preview_content = $splash_html->Div(1, $preview_content, array('class' => 'msg_preview_content'));
                
                $create_time_content = $this->Facebook_Time_Convert($fql_inbox[$i]['updated_time']);
                
                $msg_create_time = $splash_html->Div(1, $create_time_content, array('class' => 'msg_create_time'));

            }

            echo $display;

            return true;

        }

        public function Display_Message($id)
        {
            
            $splash_html = new SPLASH();
			
            $this->my_id = $this->Get_User();

            $query = 'SELECT recipients, unread, updated_time FROM thread WHERE thread_id =' . $id;
 
            $param_inbox = array('method' => 'fql.query',
                                 'query' => $query);

            $fql_recipients = $this->Api($param_inbox);
            
            if ($fql_recipients[0]['unread'])
            {
                
                $counter = ALPHA_CMS::Execute_SQL_Command('SELECT COUNT(*) AS `num` 
                                                   FROM `fb_unread_messages` 
                                                   WHERE `message_id` = "' . $id . '"');
                
                if ($counter[0]['num'])
                {
                    
                    $updated_time = ALPHA_CMS::Execute_SQL_Command('SELECT `updated_time` AS `time`
                                                       FROM `fb_unread_messages` 
                                                       WHERE `message_id` = "' . $id . '"');
                    
                    if ($updated_time[0]['time'] < $fql_recipients[0]['updated_time'])
                        $result = ALPHA_CMS::Execute_SQL_Command('UPDATE `fb_unread_messages` 
                                                          SET `updated_time` = "' . $fql_recipients[0]['updated_time'] . '"
                                                          WHERE `message_id` = "' . $id . '"', 1);
                    
                }
                
                else
                    $result = ALPHA_CMS::Execute_SQL_Command('INSERT INTO `fb_unread_messages` (`user_id`, `message_id`, `updated_time`)
                                                              VALUES ("' . $_SESSION['TALOS']["id"] . '", "' . 
                                                                         $id . '", "' .
                                                                         $fql_recipients[0]['updated_time'] . '")', 1);   
                
            }
            
            foreach ($fql_recipients as $msg)
                foreach ($msg['recipients'] as $recipient_id)
                    $between[] = $recipient_id;
            
            $fql = 'select author_id, message_id, body, created_time from message where thread_id = ' . $id;
 
            $param_message = array('method' => 'fql.query',
                                   'query' => $fql);

            $fql_message = $this->Api($param_message);
            
            $counts = count($fql_message);
            
            foreach (array_unique($between) as $author_id)
            {

                if (($author_id != $this->my_id) || (count(array_unique($between)) < 2))
                {

                    $author_name = ($this->Get_User_By_Id($author_id)) ?:
                            json_decode(file_get_contents('http://graph.facebook.com/' . $author_id .'?fields=name'))->name;
                    
                    $link = $splash_html->Link(1, $author_name, array('class' => 'profile_link',
                                                                      'href' => '#'));
                            
                    $output_to[] = $link;

                }

            }
            
            $people = implode(', ', $output_to);
            
            $people_view_content = 'People in conversation: ' . $people;
            
            $people_view = $splash_html->Div(1, $people_view_content, array('class' => 'msg_view_top'));
            
            $for_box = '';
            
            for ($i = 0; $i < $counts; $i++)
            {
                
                $author_name = ($this->Get_User_By_Id($fql_message[$i]['author_id'])) ?:
                        json_decode(file_get_contents('http://graph.facebook.com/' . $fql_message[$i]['author_id'] .'?fields=name'))->name;
                
                $profile_picture = $splash_html->Image(1, array('class' => 'profile_picture',
                                                                'alt' => 'author',
                                                                'src' => 'https://graph.facebook.com/' . $fql_message[$i]['author_id'] . '/picture?width=50&height=50'));
                
                $link = $splash_html->Link(1, $profile_picture, array('href' => '#',
                                                                      'class' => 'profile_img_link'));
                
                $content_link = $splash_html->Link(1, $author_name, array('class' => 'profile_link',
                                                                          'href' => '#'));
                
                $create_time = $splash_html->Div(1, $this->Facebook_Time_Convert($fql_message[$i]['created_time']), array('class' => 'comments_create_time'));
                
                $msg_fb_content = $splash_html->Div(1, self::Print_Fb_Content($fql_message[$i]['body'], $fql_message[$i]['message_id'] ), array('class' => 'msg_content'));
                
                $msg_content_box = $splash_html->Div(1, $content_link . $create_time . $msg_fb_content, array('class' => 'msg_content_box'));
                
                if ($i != ($counts - 1))
                    $msg_seaparator = $splash_html->Div(1, '', array('id' => 'msg_separator'));
                
                $msg_box = $splash_html->Div(1, $link . $msg_content_box . $msg_seaparator, array('class' => 'msg_box'));
                
                $for_box .= $msg_box;
				
            }
            
            $rtt_content = $people_view . $for_box;
            
            $rtt = $splash_html->Div(1, $rtt_content, array('id' => 'rtt'));
            
            $onemessage = $splash_html->Div(1, $rtt, array('id' => 'onemessage'));
            
            echo $onemessage;

            return true;

        }
        
        public function See_Notification($id)
        {
            
            $splash_html = new SPLASH();
            $object = $this->See_One_Notification($id);
            
            switch($object[0]['object_type'])
            {
                
                case 'stream':
                {
                    
                    if ($object[0]['object_id'] === $object[0]['recipient_id'])
                        $this->Display_Profile($object[0]['recipient_id']);
                        
                    else
                    {
                        
                        $display = '';
                        
                        $notification = $this->See_Post($id);

                        $message_content = self::Make_Clickable(nl2br($notification[0]['message']));
                        
                        $content = $splash_html->Div(1, 
                                                 self::Print_Fb_Content($notification[0]['message'], $notification[0]['post_id']), 
                                                 array('class' => 'post_message'));

                        switch($notification[0]['type'])
                        {

                            case 247:
                                $post_type = 'Photos posted';
                                $media_length = count($notification[0]['attachment']['media']);

                                for ($j = 0; $j < $media_length; $j++)
                                {

                                    $content .= $splash_html->Image(1, array('id' => 'display_wall_image',
                                                                             'data-postion' => $j,
                                                                             'data-id' => $notification[0]['attachment']['media'][$j]['photo']['fbid'],
                                                                             'alt' => 'wall image',
                                                                             'src' => $notification[0]['attachment']['media'][$j]['src']));

                                }

                                break; 

                            case 347:
                                $post_type = 'Likes a Link';

                                if ($notification[0]['attachment']['media'][0]['type'] === 'video' && $notification[0]['attachment']['media'][0]['src'] != null)
                                    $content .= self::Print_Post_Link($notification[0]['attachment']['href'], 
                                                                      $notification[0]['attachment']['media'][0]['src'],
                                                                      $notification[0]['attachment']['name'],
                                                                      $notification[0]['attachment']['description']);

                                else if ($notification[0]['attachment']['media'][0]['type'] === 'photo'  && $notification[0]['attachment']['media'][0]['src'] != null)
                                    $content .= self::Print_Post_Link($notification[0]['attachment']['href'], 
                                                                      $notification[0]['attachment']['media'][0]['src'], 
                                                                      $notification[0]['attachment']['name'], 
                                                                      $notification[0]['attachment']['description']);

                                else if ($notification[0]['attachment']['media'][0]['type'] === 'link'  && $notification[0]['attachment']['media'][0]['src'] != null)
                                    $content .= self::Print_Post_Link($notification[0]['attachment']['href'], 
                                                                      $notification[0]['attachment']['media'][0]['src'], 
                                                                      $notification[0]['attachment']['name'], 
                                                                      $notification[0]['attachment']['caption'] . 
                                                                      $notification[0]['attachment']['description']);

                                break;

                            case 373:
                                $post_type = 'Updated cover photo';
                                $content .= $splash_html->Image(1, array('id' => $notification[0]['attachment']['media'][0]['photo']['fbid'],
                                                                         'alt' => 'notification',
                                                                         'src' => $notification[0]['attachment']['media'][0]['src']));
                                
                                break;

                        }

                        $author_of_post = ($this->Get_User_By_Id($notification[0]['actor_id'])) ?:
                              json_decode(file_get_contents('http://graph.facebook.com/' . $notification[0]['actor_id'] .'?fields=name'))->name;

                        $post_id = $notification[0]['post_id'];

                        if ($notification[0]['description'] !== null)
                        {

                            $array = explode($author_of_post, $notification[0]['description']);
                            $description = $array[1];

                        }

                        else
                            $description = '';

                        if ($notification[0]['like_info']['can_like'])
                        {

                            if ($notification[0]['like_info']['user_likes'])
                            {
                                
                                $like_image = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                           'alt' => 'likes',
                                                                           'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png'));
                                
                                $like_count = $splash_html->Div(1, $notification[0]['like_info']['like_count'], array('id' => 'like_count'));
                                
                                $like_cnt = 'Unlike ' . $like_image . $like_count;
                                
                                $like_content = $splash_html->Div(1, $like_cnt, array('id' => 'unlike_post',
                                                                                     'data-id' => $post_id,
                                                                                     'title' => $title));

                                $title = '';

                            }

                            else
                            {
                                
                                $like_image = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                           'alt' => 'likes',
                                                                           'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png'));
                                
                                $like_count = $splash_html->Div(1, $notification[0]['like_info']['like_count'], array('id' => 'like_count'));
                                
                                $like_cnt = 'Like ' . $like_image . $like_count;
                                
                                $like_content = $splash_html->Div(1, $like_cnt, array('id' => 'unlike_post',
                                                                                     'data-id' => $post_id,
                                                                                     'title' => $title));
                                
                                $title = '';

                            }

                        }

                        else
                            $like_content = '';

                        if ($notification[0]['comment_info']['can_comment'])
                        {
                            
                            $comment_image = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                          'alt' => 'comments',
                                                                          'src' => '/framework/extensions/js/i_fb/themes/pix/comments.png'));

                            $comment_count = $notification[0]['comment_info']['comment_count'];

                            $comment_cnt = 'Comments ' . $comment_image . $comment_count;

                            $comment_content = $splash_html->Div(1, $comment_cnt, array('id' => 'com' . $post_id));

                        }

                        else
                            $comment_content = '';

                        if ($notification[0]['share_info']['can_share'])
                        {
                            
                            $share_image = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                        'alt' => 'shares',
                                                                        'src' => '/framework/extensions/js/i_fb/themes/pix/shares.png'));

                            $share_count = $notification[0]['share_info']['share_count'];

                            $share_cnt = 'Share ' . $share_image . $share_count;

                            $share_content = $splash_html->Div(1, $share_cnt, array('id' => 'shr' . $post_id));

                        }

                        else
                            $share_content = '';
                        
                        if ($notification[0]['attachment']['media'][0]['type'] === 'video')
                            $content .= self::Print_Post_Link($notification[0]['attachment']['href'], 
                                                              $notification[0]['attachment']['media'][0]['src'], 
                                                              $notification[0]['attachment']['name'], 
                                                              $notification[0]['attachment']['description']);

                        else if ($notification[0]['attachment']['media'][0]['type'] === 'photo')
                            $content .= self::Print_Post_Link($notification[0]['attachment']['href'],
                                                              $notification[0]['attachment']['media'][0]['src'], 
                                                              $notification[0]['attachment']['name'], 
                                                              $notification[0]['attachment']['description']);

                        else if ($notification[0]['attachment']['media'][0]['type'] === 'link')
                            $content .= self::Print_Post_Link($notification[0]['attachment']['href'],
                                                              $notification[0]['attachment']['media'][0]['src'],
                                                              $notification[0]['attachment']['name'],
                                                              $notification[0]['attachment']['caption'] . 
                                                              $notification[0]['attachment']['description']);
                        
                        $profile_picture = $splash_html->Image(1, array('class' => 'profile_picture',
                                                                        'src' => 'https://graph.facebook.com/' . $notification[0]['actor_id'] . '/picture?width=50&height=50',
                                                                        'alt' => 'profile picture'));
                        
                        $profile_link =$splash_html->Link(1, $profile_picture, array('href' => '#',
                                                                                     'class' => 'profile_img_link'));
                        
                        $post_link = $splash_html->Link(1, $author_of_post, array('href' => '#',
                                                                                  'class' => 'profile_link'));
                        
                        $post_type_description = $splash_html->Div(1, $description, array('class' => 'post_type'));
                        
                        $post_content = $splash_html->Div(1, $content, array('class' => 'post_content'));
                        
                        $fb_date = $splash_html->Div(1, $this->Facebook_Time_Convert($object[0]['updated_time']), array('class' => 'fb_date'));
                        
                        $answer_like = $splash_html->Div(1, $like_content, array('class' => 'like'));
                        
                        $answer_comments = $splash_html->Div(1, $comment_content, array('class' => 'comments',
                                                                                        'data-count' => $notification[0]['comment_info']['comment_count'])); 
                        
                        $answer_share = $splash_html->Div(1, $share_content, array('class' => 'share'));
                        
                        $answer_content = $answer_like . $answer_comments . $answer_share;
                        
                        $answer = $splash_html->Div(1, $answer_content, array('id' => 'answer'));
                        
                        $box_bottom_content = $fb_date . $answer;
                        
                        $box_bottom = $splash_html->Div(1, $box_bottom_content, array('id' => 'box_bottom'));
                        
                        $post_box_cnt = $post_link . $post_type_description . $post_content . $box_bottom;
                        
                        $post_content_box = $splash_html->Div(1, $post_box_cnt, array('class' => 'post_content_box'));
                        
                        $box_notification_content = $profile_link . $post_content_box . '<br style="clear:both" />';
                        
                        $box_notifications = $splash_html->Div(1, $box_notification_content, array('id' => 'box_notifications'));
                        
                        $comments_area_content = $splash_html->Div(1, '', array('class' => 'comments_area',
                                                                                'id' => 'commentsarea' . $post_id));
                        
                        $comments_area = $splash_html->Div(1, $comments_area_content, array('class' => 'comments_area_outer_for_infinity',
                                                                                            'id' => 'commentsareaouter' . $post_id));
                        
                        $display .= $box_notifications . $comments_area;
                    
                    }

                }
                   
                break;
                 
                case 'page':
                    $page = $this->Api('/' . $object[0]['object_id']);
                    
                    $image_cover = $splash_html->Image(1, array('id' => 'fb_cover',
                                                                'alt' => 'cover',
                                                                'src' => $page['cover']['source']));
                    
                    $image_profile = $splash_html->Image(1, array('id' => 'page_profile_picture',
                                                                  'alt' => 'profile',
                                                                  'src' => 'https://graph.facebook.com/' . $page['id'] . '/picture?width=100&height=100'));
                    
                    $profile_name = $splash_html->Div(1, $page['username'], array('id' => 'profile_name'));
                    
                    $image_likes = $splash_html->Image(1, array('class' => 'like_page_icons',
                                                                'alt' => 'likes',
                                                                'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png'));
                    
                    $like_fan_page_content = $image_likes . number_format((int)$page['likes'] , 0, ',', '.');
                    
                    $like_fan_page = $splash_html->Div(1, $like_fan_page_content, array('class' => 'likes_fan_page'));
                    
                    $talking_about_page_text = $splash_html->Div(1, 'talking about this', array('class' => 'talking_about_page_text'));
                    
                    $talking_about_fan_page_content = number_format((int)$page['talking_about_count'] , 0, ',', '.') . '<br>' . $talking_about_page_text;
                    
                    $talking_about_fan_page = $splash_html->Div(1, $talking_about_fan_page_content, array('class' => 'talking_about_fan_page'));
                    
                    $cover_content = $image_cover . $image_profile . $profile_name . $like_fan_page . $talking_about_fan_page;
                    
                    $cover = $splash_html->Div(1, $cover_content, array('class' => 'cover'));
                    
                    $profile_menu = $splash_html->Div(1, '', array('class' => 'profile_menu'));
                    
                    $about_box_header = $splash_html->Div(1, 'About', array('class' => 'about_box_header'));
                    
                    if (isset($page['website']))
                    {
                        
                        $this_web_link = $splash_html->Link(1, $page['website'], array('href' => '#'));
                        
                        $span_website_content = '<b>Website:</b>' . $this_web_link;
                                
                        $span_website = $splash_html->Div(1, $span_website_content, array('class' => 'fan_page_website'));;
                        
                    }
                    
                    else
                        $span_website = '';
                    
                    if (isset($page['link']))
                    {
                        
                        $this_link = $splash_html->Link(1, $page['link'], array('href' => '#'));
                        
                        $span_page_link_content = '<b>Link:</b>' . $this_link;
                        
                        $span_page_link = $splash_html->Div(1, $span_page_link_content, array('class' => 'fan_page_link'));
                                
                        $span_link = '<br>' . $span_page_link;
                        
                    }
                    
                    else
                        $span_link = '';
                    
                    if (isset($page['about']))
                    {
                        
                        $page_about = $splash_html->Div(1, $page['about'], array('class' => 'fb_paragraph'));
                        
                        $span_about_content = '<b>About:</b>' . $page_about;
                        
                        $span_about = $splash_html->Div(1, $span_about_content, array('class' => 'fan_page_info'));
                        
                    }
                    
                    else
                        $span_about = '';
                    
                    if (isset($page['description']))
                    {
                        
                        $p_tag = $splash_html->Div(1, nl2br($page['description']), array('id' => 'toggle-'. $page['id'],
                                                                                         'style' => 'max-height:3.9em; overflow:hidden; margin-top:-13px; margin-left: 74px;'));
                        
                        $description_link = $splash_html->Link(1, 'Show more', array('class' => 'toggle_msg_content',
                                                                                     'href' => '#',
                                                                                     'data-id' => 'toggle-' . $page['id']));
                        
                        $span_description_content = '<b>Description:</b>' . $p_tag . $description_link;      
                        $span_description = $splash_html->Div(1, $span_description_content, array('class' => 'fan_profil_about'));
                        
                    }
                    
                    else
                        $span_description = '';
                    
                    $about_content = $span_website . $span_link . $span_about . $span_description;
                    
                    $about_box_content = $splash_html->Div(1, $about_content, array('class' => 'about_box_content'));
                    
                    $fb_fan_page_about_box_content = $about_box_header . $about_box_content;
                    
                    $fb_fan_page_about_box = $splash_html->Div(1, $fb_fan_page_about_box_content, array('class' => 'fb_fan_page_about_box'));
                    
                    $fan_page_about = $splash_html->Div(1, $fb_fan_page_about_box, array('class' => 'fan_page_about'));
                    
                    $fan_page_feed = $splash_html->Div(1, $this->Display_Feed($page['id']), array('class' => 'fan_page_feeds'));
                    
                    $display = $cover . $profile_menu . $fan_page_about . $fan_page_feed;
                    
                    break;
                
                case 'group':
                    $group = $this->Api('/' . $object[0]['object_id']);
                    
                    $message_content = self::Make_Clickable(nl2br($group['message']));
                    
                    $content = '';
                    
                    $content .= $splash_html->Div(1, self::Print_Fb_Content($group['message'], $object['object_id']), array('class' => 'post_message'));
                    
                    if ($group['type'] === 'video')
                        $content .= self::Print_Post_Link($group['link'], $group['picture'], $group['name'], $group['description']);
                    
                    else if ($group['type'] === 'photo')
                        $content .=self::Print_Post_Link($group['link'], $group['picture'], $group['name'], $group['description']);
                    
                    else if ($group['type'] === 'link')
                        $content .= self::Print_Post_Link($group['link'], $group['picture'], $group['name'], $group['caption']. $group['description']);
                    
                    $post_id = $group['id'];
                    
                    $default_group = $splash_html->Div(1, 'Group: ', array('class' => 'default_group'));
                    
                    $fb_name_group_content = $default_group . $group['to']['data'][0]['name'];
                    
                    $fb_name_group = $splash_html->Div(1, $fb_name_group_content, array('class' => 'fb_name_group'));
                    
                    $image_link_content = $splash_html->Image(1, array('class' => 'profile_picture',
                                                                       'alt' => 'profile',
                                                                       'src' => 'https://graph.facebook.com/' . $group['from']['id'] . '/picture?width=50&height=50'));
                    
                    $profile_img_link = $splash_html->Link(1, $image_link_content, array('href' => '#',
                                                                                           'class' => 'profile_img_link'));
                    
                    $profile_link = $splash_html->Link(1, $group['from']['name'], array('href' => '#',
                                                                                        'class' => 'profile_link'));
                    
                    $post_content = $splash_html->Div(1, $content, array('class' => 'post_content'));
                    
                    $group_icon = $splash_html->Image(1, array('alt' => 'group',
                                                               'src' => $group['icon']));
                    
                    $fb_date_content = $group_icon . $this->Facebook_Time_Convert($object[0]['updated_time']);
                    
                    $fb_date = $splash_html->Div(1, $fb_date_content, array('class' => 'fb_date'));
                    
                    $image_likes = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                'alt' => 'like',
                                                                'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png'));
                    
                    $like_count = $splash_html->Div(1, count($group['likes']['data']), array('id' => 'like_count'));
                    
                    $lk_content = 'Like ' . $image_likes . $like_count;
                    
                    $like_content = $splash_html->Div(1, $lk_content, array('id' => 'like_post',
                                                                            'data-id' => $post_id,
                                                                            'title' => $title));
                    
                    $like = $splash_html->Div(1, $like_content, array('class' => 'like'));
                    
                    $image_comments = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                   'alt' => 'comments',
                                                                   'src' => '/framework/extensions/js/i_fb/themes/pix/comments.png'));
                    
                    $com_content = 'Comments ' . $image_comments . count($group['comments']['data']);
                    
                    $comment_content = $splash_html->Div(1, $com_content, array('id' => 'com' . $post_id));
                    
                    $comments = $splash_html->Div(1, $comment_content, array('class' => 'comments'));
                    
                    $image_shares = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                 'alt' => 'share',
                                                                 'src' => '/framework/extensions/js/i_fb/themes/pix/shares.png'));
                    
                    $shr_content = 'Share ' . $image_shares . count($group['share']['data']);
                    
                    $share_content = $splash_html->Div(1, $shr_content, array('id' => 'shr' . $post_id));
                    
                    $shares = $splash_html->Div(1, $share_content, array('class' => 'share'));
                    
                    $answer_content = $like . '|' . $comments . '|' . $shares;
                    
                    $answer = $splash_html->Div(1, $answer_content, array('id' => 'answer'));
                    
                    $box_bottom_content = $fb_date . $answer;
                    
                    $box_bottom = $splash_html->Div(1, $box_bottom_content, array('id' => 'box_bottom'));
                    
                    $post_content_box = $profile_link . $post_content . $box_bottom;
                    
                    $box_content_group_content = $profile_img_link . $post_content_box . '<br style="clear:both" />';
                    
                    $box_content_group = $splash_html->Div(1, $box_content_group_content, array('class' => 'box_content_group'));
                    
                    $comments_area = $splash_html->Div(1, '', array('class' => 'comments_area',
                                                                    'id' => 'commentsarea' . $post_id));
                    
                    $comments_area_out = $splash_html->Div(1, $comments_area, array('class' => 'comments_area_outer_for_infinity',
                                                                                    'id' => 'commentsareaouter' . $post_id));
                    
                    $box_content = $fb_name_group . $box_content_group . $comments_area_out;
                    
                    $box = $splash_html->Div(1, $box_content, array('id' => 'box'));
                    
                    $display = $box;
                    
                    break;
                
                case 'event':
                    $event = $this->Api('/' . $object[0]['object_id']);
                    
                    $invited_you = ($this->Get_User_By_Id($object[0]['sender_id'])) ?:
                              json_decode(file_get_contents('http://graph.facebook.com/' . $object[0]['sender_id'] .'?fields=name'))->name;
                    
                    $name_of_event = $splash_html->Div(1, $event['name'], array('class' => 'name_of_event'));
                    
                    $person_invited_you = $splash_html->Div(1, $invited_you . ' invited you', array('class' => 'person_invited_you'));
                    
                    $event_box_content = $name_of_event . $person_invited_you;
                    
                    $event_box = $splash_html->Div(1, $event_box_content, array('class' => 'event_box'));
                    
                    $owner_name_link = $splash_html->Link(1, $event['owner']['name'], array('href' => '#',
                                                                                            'class' => 'owners_name'));
                    
                    $owners_event_content = 'by ' . $owner_name_link;
                    
                    $owners_event = $splash_html->Div(1, $owners_event_content, array('class' => 'owners_event'));
                    
                    $calendar_image = $splash_html->Image(1, array('class' => 'fb_notify_detail',
                                                                   'alt' => 'calendar',
                                                                   'src' => '/framework/extensions/js/i_fb/themes/pix/calendar.png'));
                    
                    $event_time_bold1 = $splash_html->Div(1, date("F j, Y, g:i a", strtotime($event['start_time'])), array('class' => 'event_time_bold'));
                    
                    $event_time_bold2 = $splash_html->Div(1, date("F j, Y, g:i a", strtotime($event['end_time'])), array('class' => 'event_time_bold'));
                    
                    $events_time_content = $calendar_image . $event_time_bold1 . ' untill ' . $event_time_bold2;
                    
                    $events_time = $splash_html->Div(1, $events_time_content, array('class' => 'events_time'));
                    
                    $description_image = $splash_html->Image(1, array('class' => 'fb_notify_detail',
                                                                      'alt' => 'description',
                                                                      'src' => '/framework/extensions/js/i_fb/themes/pix/description.png'));
                    
                    $p_toggle = $splash_html->Div(1, nl2br($event['description']), array('id' => 'toggle-' . $event['id'],
                                                                                         'style' => 'max-height:3.9em; overflow:hidden;'));
                    
                    $show_more = $splash_html->Link(1, 'Show more', array('class' => 'toggle_msg_content',
                                                                          'href' => '#',
                                                                          'data-id' => 'toggle-' . $event['id']));
                    
                    $event_description_content = $description_image . $p_toggle . $show_more;
                    
                    $event_description = $splash_html->Div(1, $event_description_content, array('class' => 'event_description'));
                    
                    $image_address = $splash_html->Image(1, array('class' => 'post_social_icons',
                                                                  'src' => '/framework/extensions/js/i_fb/themes/pix/adress.png', 
                                                                  'alt' => 'address'));
                    
                    $location_owner = $splash_html->Div(1, $event['location'], array('class' => 'location_owner'));
                    
                    $location_detail = $splash_html->Div(1, $event['venue']['street'] . ', ' . 
                                                            $event['venue']['zip'] . ' ' . 
                                                            $event['venue']['city'] . ', ' . 
                                                            $event['venue']['country'],
                                                            array('class' => 'location_detail'));
                    
                    $event_location_content = $image_address . $location_owner . '<br>' . $location_detail;
                    
                    $event_location = $splash_html->Div(1, $event_location_content, array('class' => 'event_location'));
                    
                    $box_notifications_content = $event_box . $owners_event . $events_time . $event_description . $event_location;
                    
                    $box_notifications = $splash_html->Div(1, $box_notifications_content, array('id' => 'box_notifications'));
                    
                    $fan_page_feeds = $splash_html->Div(1, $this->Display_Feed($event['id']), array('class' => 'fan_page_feeds'));
                    
                    $display = $box_notifications . $fan_page_feeds;
                    
                    break;
                
                case 'photo':
                    $photo = $this->Api('/' . $object[0]['object_id']);
                    
                    $img_width = floatval($photo['images'][0]['width']);
                    $img_height = floatval($photo['images'][0]['height']);
                    $margin_top = 0;
                    $div_height = 417;
                    $div_width = 618;
            
                    if (($div_height < $img_height) || ($div_width < $img_width))
                    {
                
                        if (($img_height / $img_width) > ($div_height / $div_width))
                        {
                    
                            $img_width = $img_width * $div_height / $img_height; 
                            $img_height = $div_height;

                        }
                
                        else
                        {
                    
                            $img_height = $img_height * $div_width / $img_width;
                            $img_width = $div_width;

                        }
                
                    }
            
                    if ($div_height > $img_height)
                        $margin_top = ($div_height - $img_height) / 2;
                    
                    $post_id = $photo['id'];
                    
                    $notify_image = $splash_html->Image(1, array('src' => $photo['images'][0]['source'],
                                                                 'alt' => 'notify',
                                                                 'width' => intval($img_width),
                                                                 'height' => intval($img_height),
                                                                 'style' => 'margin-top: ' . intval($margin_top) . 'px'));
                    $notify = $splash_html->Div(1, $notify_image, array('class' => 'notify'));
                    
                    $profile_image = $splash_html->Image(1, array('src' => 'https://graph.facebook.com/' . $photo['from']['id'] . '/picture?width=50&height=50',
                                                                 'alt' => 'profile',
                                                                 'class' => 'profile_picture'));
                    $profile_image_link = $splash_html->Link(1, $profile_image, array('href' => '#',
                                                                                'class' => 'profile_img_link'));
                    
                    $profile_link = $splash_html->Link(1, $photo['from']['name'], array('href' => '#',
                                                                                        'class' => 'profile_link'));
                    
                    $photo_with_text = $splash_html->Div(1, '', array('class' => 'fb_photo_with_text'));
                    $photo_with_users = $splash_html->Div(1, '', array('class' => 'fb_photo_with_users'));
                    $post_content = $photo['name'] . $photo_with_text . $photo_with_users;
                    $post_content_div = $splash_html->Div(1, $post_content, array('class' => 'post_content'));
                    
                    $likes_icon = $splash_html->Image(1, array('alt' => 'likes',
                                                               'src' => '/framework/extensions/js/i_fb/themes/pix/likes.png',
                                                               'class' => 'post_social_icons')); 
                    $like_count = $splash_html->Div(1, count($photo['likes']['data']), array('id' => 'like_count'));
                    $like_post_content = 'Like ' . $likes_icon . $like_count;
                    $like_post = $splash_html->Div(1, $like_post_content, array('id' => 'like_post',
                                                                                'data-id' => $post_id,
                                                                                'title' => $title));
                    $span_like = $splash_html->Div(1, $like_post, array('class' => 'like'));
                    
                    $comments_icon = $splash_html->Image(1, array('alt' => 'comments',
                                                                  'src' => '/framework/extensions/js/i_fb/themes/pix/comments.png',
                                                                  'class' => 'post_social_icons'));
                    $comment_post_content = 'Comments ' . $comments_icon . count($photo['comments']['data']);
                    $comments_post = $splash_html->Div(1, $comment_post_content, array('id' => 'com' . $post_id));
                    $span_comments = $splash_html->Div(1, $comments_post, array('class' => 'comments'));
                    
                    $shares_icon = $splash_html->Image(1, array('alt' => 'shares',
                                                                'src' => '/framework/extensions/js/i_fb/themes/pix/shares.png',
                                                                'class' => 'post_social_icons'));
                    $shares_post_content = 'Share ' . $shares_icon . count($photo['share']['data']);
                    $shares_post = $splash_html->Div(1, $shares_post_content, array('id' => 'shr' . $post_id));
                    $span_shares = $splash_html->Div(1, $shares_post, array('class' => 'share'));
                    
                    $answer = $span_like . '|' . $span_comments . '|' . $span_shares;
                    
                    $div_answer = $splash_html->Div(1, $answer, array('id' => 'answer'));
                    
                    $photo_icon = $splash_html->Image(1, array('src' => $photo['icon'],
                                                               'alt' => 'icon'));
                    $fb_date_content = $photo_icon . date("F j, Y", strtotime($photo['updated_time']));
                    $fb_date = $splash_html->Div(1, $fb_date_content, array('class' => 'fb_date'));
                    
                    $box_bottom_content = $fb_date . $div_answer;
                    $box_bottom = $splash_html->Div(1, $box_bottom_content, array('id' => 'box_bottom'));
                    
                    $post_content_box = $profile_link . $post_content_div . $box_bottom;
                    $div_post_box = $splash_html->Div(1, $post_content_box, array('class' => 'post_content_box'));
                    
                    $box_group_content = $profile_image_link . $div_post_box . '<br style="clear:both" />';
                    $box_group = $splash_html->Div(1, $box_group_content, array('class' => 'box_content_group'));
                    
                    $comments_area = $splash_html->Div(1, '', array('class' => 'comments_area',
                                                                    'id' => 'commentsarea' . $post_id));
                    $comments_out_infinity = $splash_html->Div(1, $comments_area, array('class' => 'comments_area_outer_for_infinity', 
                                                                                        'id' => 'commentsareaouter' . $post_id));
                    $box_content = $notify . $box_group . $comments_out_infinity;
                    
                    $box = $splash_html->Div(1, $box_content, array('id' => 'box'));
                    
                    $display = $box;
                    
                    break;
                
                case 'friend':
                    $friend = $this->Api('/' . $object[0]['object_id']);
                    
                    $this->Display_Profile($friend['id']);

                    break;
                
                default :                    
                    $display = $splash_html->Div(1, 'Not available in DEMO!', array('class' => 'fb_no_request'));

            }

            echo $display;

            return true;
            
        }
        
        public function Display_Photos()
        {
            
            $splash_html = new SPLASH();
            
            $new_album_anchor = $splash_html->Link(1, 'Create New Album', array('href' => '#new'));
            $album_content = $splash_html->Div(1, $new_album_anchor, array('class' => 'album_content'));
            $image_new = $splash_html->Div(1, '', array('class' => 'crop_general',
                                                        'style' => 'background-image: url(\'/framework/extensions/js/i_fb/themes/pix/create_album.png\')'));
            $new_album_content = $image_new . $album_content;
            $display_new_album = $splash_html->Div(1, $new_album_content, array('class' => 'album_table_general',
                                                                                'data-id' => 'create_album'));
            
            echo $display_new_album;
            
            $albums = $this->Get_All_Albums();
            $album_size = count($albums);
            
            for ($i = 0; $i < $album_size; $i++)
            {
                
                /* If the album exist but it has no photos inside
                 * there is no point of displaying it.
                */
                if ($albums[$i]['photo_count'] === '0')
                    continue;
                
                $photo = $this->Get_Photo_From_Id($albums[$i]['cover_object_id']);
                
                if ($photo[0]['src_big'])
                {
                    
                    $width = $photo[0]['src_big_width'];
                
                    $height = $photo[0]['src_big_height'];

                    $thumb_size = 177;

                    $img_width = 0;
                    $img_height = 0;

                    if ($height > $width)
                    {

                        $img_width = $thumb_size;
                        $img_height = $height / $width * $thumb_size;
                        $margin = ($img_height - $img_width) / 2;

                        $image = $splash_html->Image(1, array('src' => $photo[0]['src_big'],
                                                              'height' => intval($img_height),
                                                              'width' => intval($img_width),
                                                              'alt' => 'album',
                                                              'style' => 'margin-top: -' . intval($margin) . 'px'));

                    }

                    else
                    {

                        $img_height = $thumb_size;
                        $img_width = $width / $height * $thumb_size;
                        $margin = ($img_width - $img_height) / 2;

                        $image = $splash_html->Image(1, array('src' => $photo[0]['src_big'],
                                                              'height' => intval($img_height),
                                                              'width' => intval($img_width),
                                                              'alt' => 'album',
                                                              'style' => 'margin-left: -' . intval($margin) . 'px'));

                    }
                    
                    $crop_general = $splash_html->Div(1, $image, array('class' => 'crop_general'));
                    
                    $link = $splash_html->Link(1, $albums[$i]['name'] . ' (' . $albums[$i]['photo_count'] . ')', array('href' => '#link'));
                    $album_content = $splash_html->Div(1, $link, array('class' => 'album_content'));
                    
                    $album_photo = $crop_general . $album_content;
                    
                    $display_albums = $splash_html->Div(1, $album_photo, array('class' => 'album_table_general',
                                                                               'data-id' => $albums[$i]['object_id']));
                    
                    echo $display_albums;
                    
                }
                
            }

            return true;
            
        }
        
        public function Display_Album($id)
        {
            
            $splash_html = new SPLASH();
            
            $photos = $this->Get_Photos_From_Album($id);
            
            $photos_size = count($photos);
            
            for ($i = 0; $i < $photos_size; $i++)
            {
                
                
                $width = $photos[$i]['src_big_width'];
                
                $height = $photos[$i]['src_big_height'];
                
                $thumb_size = 177;
                
                $img_width = 0;
                $img_height = 0;

                if ($height > $width)
                {
                    
                    $img_width = $thumb_size;
                    $img_height = $height / $width * $thumb_size;
                    $margin = ($img_height - $img_width) / 2;

                    $image = $splash_html->Image(1, array('id' => 'photo' . $i,
                                                          'title' => 'photo' . $photos[$i]['object_id'],
                                                          'src' => $photos[$i]['src_big'],
                                                          'height' => intval($img_height),
                                                          'width' => intval($img_width),
                                                          'alt' => 'album',
                                                          'style' => 'margin-top: -' . intval($margin) . 'px'));
                    
                }
                
                else
                {
                    
                    $img_height = $thumb_size;
                    $img_width = $width / $height * $thumb_size;
                    $margin = ($img_width - $img_height) / 2;

                    $image = $splash_html->Image(1, array('id' => 'photo' . $i,
                                                          'title' => 'photo' . $photos[$i]['object_id'],
                                                          'src' => $photos[$i]['src_big'],
                                                          'height' => intval($img_height),
                                                          'width' => intval($img_width),
                                                          'alt' => 'album',
                                                          'style' => 'margin-left: -' . intval($margin) . 'px'));

                }
                                     
                $crop = $splash_html->Div(1, $image, array('class' => 'crop'));
                
                if ($photos[$i]['caption'])
                    $link = $splash_html->Link(1, $photos[$i]['caption'], array('href' => '#link'));
                
                else
                    $link = ' ';
                
                $album_content = $splash_html->Div(1, $link, array('class' => 'album_content'));

                $album_photo = $crop . $album_content;
                
                $display_albums = $splash_html->Div(1, $album_photo, array('class' => 'album_table',
                                                                           'data-photo' => $photos[$i]['object_id']));
                
                echo $display_albums;
                
            }

            return true;
            
        }
        
        public function View_Photo($id, $position = 0, $not_album = 0)
        {

            $splash_html = new SPLASH();
            
            $photo = $this->Get_Photo_From_Id($id);
            
            $img_width = floatval($photo[0]['src_big_width']);
            $img_height = floatval($photo[0]['src_big_height']);
            $margin_top = 0;
            $div_height = 417;
            $div_width = 618;
            
            if (($div_height < $img_height) || ($div_width < $img_width))
            {
                
                if (($img_height / $img_width) > ($div_height / $div_width))
                {
                    
                    $img_width = $img_width * $div_height / $img_height; 
                    $img_height = $div_height;

                }
                
                else
                {
                    
                    $img_height = $img_height * $div_width / $img_width;
                    $img_width = $div_width;

                }
                
            }
            
            if ($div_height > $img_height)
                $margin_top = ($div_height - $img_height) / 2;
            
            $img_close = $splash_html->Image(1, array('src' => '/framework/extensions/js/nature/themes/bee/pix/window/close_1.png',
                                                          'alt' => 'close'));
            
            if (!$photo[0]['caption'])
                $photo_caption = ' ';
            
            else 
                $photo_caption = $photo[0]['caption'];
            
            $div_mask = $splash_html->Div(1, $img_close, array('id' => 'fb_mask_photo_close'));
            $image = $splash_html->Image(1, array('title' => $photo_caption,
                                                  'src' => $photo[0]['src_big'],
                                                  'width' => intval($img_width),
                                                  'height' => intval($img_height),
                                                  'style' => 'margin-top: ' . intval($margin_top) . 'px',
                                                  'alt' => $photo_caption));
            
            $display = $div_mask . $image;
            
            if (!isset($not_album))
            {
                
                $left_arrow = $splash_html->Image(1, array('data-title' => 'l' . $position,
                                                           'id' => 'fb_arrow_left',
                                                           'src' => '/framework/extensions/js/i_fb/themes/pix/arrow_left.png',
                                                           'height' => '32px',
                                                           'width' => '85px',
                                                           'style' => 'display: none',
                                                           'alt' => 'Previous'));
                
                $right_arrow = $splash_html->image(1, array('data-title' => 'r' . $position,
                                                           'id' => 'fb_arrow_right',
                                                           'src' => '/framework/extensions/js/i_fb/themes/pix/arrow_right.png',
                                                           'height' => '32px',
                                                           'width' => '85px',
                                                           'style' => 'display: none',
                                                           'alt' => 'Next'));
                
                $display .= $left_arrow . $right_arrow;                

            }

            echo $display;

            return true;
            
        }
        
        public function Display_Checkin()
        {
            
            $splash_html = new SPLASH();
            
            $select_place = $splash_html->Select(1, array('value' => '', 'content' => '- Please select a place -'), 
                                                    array('id' => 'checkin_places'));
            $input_lat = $splash_html->Input(1, array('type' => 'text', 'id' => 'lat', 'size' => '10'));
            $input_lng = $splash_html->Input(1, array('type' => 'text', 'id' => 'lng', 'size' => '10'));
            $button_check = $splash_html->Button(1, array('id' => 'send_checkin', 'type' => 'button')); //TEXT???
            $upper_div_content = $select_place . $input_lat . $input_lng . $button_check;
            $upper_div = $splash_html->Div(1, $upper_div_content, array('id' => 'checking_info_div'));
            $canvas_div = $splash_html->Div(1, '', array('id' => 'map_canvas'));
            $display = $upper_div . $canvas_div;
            
            return $display;
            
        }
        
        public function Add_Places_Option($options)
        {
            
            $splash_html = new SPLASH();
            
            $select_options = $splash_html->Select(1, $options, array('id' => 'checkin_places'));
            
            return $select_options;
            
            //this is for whole select tag, is there any way to just add options to existing select tag?
            
        }
        
        public function Display_Status()
        {
            
            $splash_html = new SPLASH();
            
            $span_tag = 'Tag People | Add Location | Upload File | Say what are you doing';
            $button_tag = $splash_html->Button(1, array('id' => 'update_status', 'type' => 'button', 'value' => 'Update Status'));
            $div_content = $span_tag . $button_tag;
            $div_update = $splash_html->Div(1, $div_content, array('id' => 'bottom_update'));
            $textarea = $splash_html->Textbox(1, '', array('id' => 'status_message', 
                                                           'placeholder' => 'What\'s on your mind?'));
            
            $post_content = $textarea . '<br>' . $div_update;
            
            $div_return = $splash_html->Div(1, $post_content, array('id' => 'post_status'));
            
            return $div_return;
            
        }
        
        public function Update_Status_Ajax($message)
        {
            
            $result = Thor($message, 6);

            if ($result && strlen($message) > 0)
            {

                if ($this->Update_Status($message))
                {
                    
                    echo $this->Display_Status();
                    
                    return true;
                    
                }

            }

            else
                return false;
            
        }
        
        public function Display_New_Album()
        {
            
            $splash_html = new SPLASH();
            
            $link = $splash_html->Link(1, 'Create New Album', array('id' => 'new_album',
                                                                    'href' => 'link'));
            $album_content = $splash_html->Div(1, $link, array('class' => 'album_content'));
            $div_crop = $splash_html->Div(1, '', array('class' => 'crop_general')); //style to add
            $table_content = $div_crop . $album_content;
            
            $div_return = $splash_html->Div(1, $table_content, array('class' => 'album_table_general',
                                                                     'data-id' => 'create_album'));
            
            return $div_return;            
            
        }
        
        public function Display_Photo($albums)
        {
            
            $splash_html = new SPLASH();
            
            $album_size = count($albums);
            
            $album_table = '';
            
            for ($i = 0; $i < $album_size; $i++)
            {
                
                if ($albums[$i]['photo_count'] === '0')
                    continue;
                
                $width = $albums[0]['src_big_width'];
                
                $height = $albums[0]['src_big_height'];
                
                $thumb_size = 177;
                
                $img_width = 0;
                $img_height = 0;

                if ($height > $width)
                {
                    
                    $img_width = $thumb_size;
                    $img_height = $height / $width * $thumb_size;
                    $margin = ($img_height - $img_width) / 2;
                    
                    $photo = $splash_html->Image(1, array('src' => $albums[0]['src_big'],
                                                          'alt' => 'photo',
                                                          'height' => intval($img_height),
                                                          'width' => intval($img_width),
                                                          'style' => 'margin-top: -' . intval($margin) . 'px'));
                    
                }
                
                else
                {
                    
                    $img_height = $thumb_size;
                    $img_width = $width / $height * $thumb_size;
                    $margin = ($img_width - $img_height) / 2;
                    
                    $photo = $splash_html->Image(1, array('src' => $albums[0]['src_big'],
                                                          'alt' => 'photo',
                                                          'height' => intval($img_height),
                                                          'width' => intval($img_width),
                                                          'style' => 'margin-left: -' . intval($margin) . 'px'));

                }
                                     
                $crop_general = $splash_html->Div(1, $photo, array('class' => 'crop_general'));
                
                $link_text = $albums[$i]['name'] . ' (' . $albums[$i]['photo_count'] . ')';
                
                $photo_link = $splash_html->Link(1, $link_text, array('href' => '#'));
                
                $album_content = $splash_html->Div(1, $photo_link, array('class' => 'album_content'));
                
                $album_table .= $splash_html->Div(1, $crop_general . $album_content, array('class' => 'album_table_general',
                                                                                        'data-id' => $albums[$i]['object_id'] ));
                
            }
                    
            echo $album_table;

            return true;

        }
        
    }
    
?>
