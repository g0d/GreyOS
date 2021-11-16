<?php

    /*

        GreyOS Inc. - iFb AJAX application
        
        Version: 1.0
        
        File name: i_fb.php
        Description: This file contains the iFb application.
        
        Coded by Zlatko Jankovic
        
        GreyOS Inc.
        Copyright © 2014

    */
    
    // Disable error reporting
    error_reporting(0);

    // Initialize session support
    @session_start();
   
    // Include ALPHA Framework class
    require('../../../alpha.php');

    // Include ALPHA CMS class
    require('../../../../cms/alpha_cms.php');
    
    //Include AJAX functions file
    require('i_fb_functions.php');
    
    $Fb_Ajax = new I_FB_AJAX();
    
    if (isset($_GET))
    {
        
        if ($_GET['code'])
        {
            
            $Fb_Ajax->Start();

            echo '<script type="text/javascript">
                    
                    window.close();                    
                  </script>';
            
            //window.opener.fb_begin(); to put

        }
        
    }
    
    if (isset($_POST))
    {
        
        if ($_POST['action'] === 'start')
            $Fb_Ajax->Start();

        else if ($_POST['action'] === 'home')
            $Fb_Ajax->Display_Wall();

        else if ($_POST['action'] === 'profile')
            echo $Fb_Ajax->Display_Profile();

        else if ($_POST['action'] === 'requests')
            $Fb_Ajax->Display_Requests();
        
        else if ($_POST['action'] === 'confirm_request')
            $Fb_Ajax->Confirm_Request($_POST['friend_id']);

        else if ($_POST['action'] === 'messages')
            echo $Fb_Ajax->Display_Inbox();

        else if ($_POST['action'] === 'notifications')
            $Fb_Ajax->Display_Notifications();

        else if ($_POST['action'] === 'photos')
            $Fb_Ajax->Display_Photos();
        
        else if ($_POST['action'] === 'display_album')
            $Fb_Ajax->Display_Album($_POST['album_id']);
        
        else if ($_POST['action'] === 'create_album')
            $Fb_Ajax->Create_Album();
        
        else if ($_POST['action'] === 'display_photo')
            $Fb_Ajax->View_Photo($_POST['photo_id']);

        else if ($_POST['action'] === 'checkin')  
            echo $Fb_Ajax->Display_Checkin();
        
        else if ($_POST['action'] === 'add_places_option')  
            $Fb_Ajax->Add_Places_Option($_POST['latitude'], $_POST['longitude']);

        else if ($_POST['action'] === 'status')
            echo $Fb_Ajax->Display_Status();

        else if ($_POST['action'] === 'update_status')
           $Fb_Ajax->Update_Status_Ajax($_POST['message']);
        
    }
    
    
    
    
    
    
    /*
     *  JS SDK Code
     * 
     * LIKE BUTTON
     * <div class="fb-like" 
     * data-href="https://developers.facebook.com/docs/plugins/" 
     * data-layout="standard" 
     * data-action="like" 
     * data-show-faces="false" 
     * data-share="false">
     * </div>
     * 
     * SHARE BUTTON
     * <div class="fb-share-button" 
     * data-href="http://developers.facebook.com/docs/plugins/" 
     * data-type="button_count">
     * </div>
     * 
     * SEND BUTTON
     * <div class="fb-send" 
     * data-href="http://facebook.com/docs/plugins/" 
     * data-colorscheme="light">
     * </div>
     * 
     * EMBEDDED POSTS
     * <div class="fb-post" 
     * data-href="https://www.facebook.com/FacebookDevelopers/posts/10151471074398553" 
     * data-width="500">
     * </div>
     * 
     * 

     *  
    */
?>
