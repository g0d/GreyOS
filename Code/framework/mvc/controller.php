<?php
    /*
        micro-MVC
        
        File name: controller.php
        Description: This file contains the "MVC CONTROLLER" class.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // MVC CONTROLLER class
    class MVC_CONTROLLER
    {
        public static function root()
        {
            $result = ROOT_MODEL::Get_Data();
            MVC::Store_Content('root', $result);
            
            return true;
        }
        
        // Test route
        public static function test()
        {
            $result = TEST_MODEL::Get_Data();
            MVC::Store_Content('test', $result);
            
            return true;
        }
    }
?>
