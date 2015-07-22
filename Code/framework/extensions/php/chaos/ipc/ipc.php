<?php

    /*

        GreyOS Inc. - IPC (GreyOS Kernel - IPC Module)

        Version: 1.0

        File name: ipc.php
        Description: This file contains the CHAOS - GreyOS Kernel :: IPC Module.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright (c) 2013

    */
    
    
    
    // Include IPC Message class
    require_once('ipc_message.php');
    
    // IPC Class
    class IPC extends IPC_Message
    {
    
        public static function Send_Message($code, $type, $data)
        {
        
            $new_msg = new IPC_Message();
            
            $new_msg->code = $code;
            $new_msg->type = $type;
            $new_msg->data = json_encode($data);
            
            return true;
        
        }
        
        public static function Receive_Message()
        {
        
            $new_msg = new IPC_Message();
            
            return true;
        
        }
        
        public static function Log()
        {
        
            $new_msg = new IPC_Message();
            
            return true;
        
        }
    
    }

?>
