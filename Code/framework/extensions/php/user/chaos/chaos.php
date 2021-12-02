<?php
    /*
        GreyOS Inc. - CHAOS (GreyOS Kernel)

        Version: 1.0
        File name: chaos.php
        Description: This file contains the CHAOS - GreyOS Kernel.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright (c) 2013
    */
    
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
