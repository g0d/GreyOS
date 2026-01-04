<?php
    /*
        CHAOS (GreyOS Kernel)

        File name: chaos.php  (Version: 1.0)
        Description: This file contains the CHAOS - GreyOS Kernel.

        Coded by George Delaportas (G0D/ViR4X)
        Copyright (C) 2013 - 2026
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Include RAM class
    require_once('ram/ram.php');
    
    // Include SCHEDULER class
    require_once('scheduler/scheduler.php');
    
    // Include IPC class
    require_once('ipc/ipc.php');
    
    // Include IO class
    require_once('io/io.php');
    
    // Include MEDIA class
    require_once('media/media.php');
    
    // CHAOS Class
    class CHAOS
    {
        public static function RAM()
        {
            RAM::Info();
            RAM::Free();
            RAM::Reserved();
            
            return true;
        }
        
        public static function SCHEDULER()
        {
            SCHEDULER::Info();
            SCHEDULER::Priority();
            
            return true;
        }
        
        public static function IPC()
        {
            IPC::Send_Message(0, 1, array('profile' => 'g.delaportas', 'status' => 'on'));
            IPC::Receive_Message();
            IPC::Log();
            
            return true;
        }
        
        public static function IO()
        {
            IO::Keyboard();
            IO::Mouse();
            IO::Screen();
            IO::Touch();
            IO::HDD();
            
            return true;
        }
        
        public static function MEDIA()
        {
            MEDIA::Audio();
            MEDIA::Video();
            
            return true;
        }
    }
?>
