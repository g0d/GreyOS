<?php

    /*
    
        GreyOS - ALPHA Framework
        
        Version: 10.0
        
        File name: mvc.php
        Description: This file contains the MVC class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */



    // Include UTILITY class
    require_once('utility.php');

    // Include MVC CONTROLLER class
    require('mvc/controller.php');
    
    // MVC class
    class MVC
    {
    
        // MVC - Routes
        private static $__mvc_routes = array(0 => 'root');
        
        // MVC - Variables
        private static $__mvc_vars = array();
        
        // Go to the specified virtual MVC route passing any arguments
        public static function Route($method, $args = null)
        {

            if (empty($method))
                return false;
            
            $this_route = self::Get_Route('1');
            
            $all_mvc_routes = self::$__mvc_routes;
            
            foreach ($all_mvc_routes as $mvc_route)
            {
            
                if ($this_route == $mvc_route)
                {
                
                    // Check if file exists
                    if (file_exists(UTILITY::Absolute_Path('framework/mvc/models/' . $method . '.php')) === false)
                        return false;
                    
                    // Always include the root model
                    require_once('mvc/models/root.php');
                    
                    // Include the specified model
                    require_once('mvc/models/' . $method . '.php');
                    
                    // Call the specified controller function (if exists)
                    if (in_array($method, get_class_methods('MVC_CONTROLLER')))
                        MVC_CONTROLLER::$method($args);
                    
                    // Check if file exists
                    if (file_exists(UTILITY::Absolute_Path('framework/mvc/views/' . $method . '.phtml')) === false)
                        return false;
                    
                    // Include the specified view
                    require('mvc/views/' . $method . '.phtml');
                    
                    return true;
                
                }
            
            }

            return false;
        
        }
        
        // Setup a virtual MVC route
        public static function Set_Route($mvc_route)
        {
        
            if (empty($mvc_route))
                return false;
            
            array_push(self::$__mvc_routes, $mvc_route);
            
            return true;
        
        }
        
        // Get all virtual MVC routes or current virtual MVC route
        public static function Get_Route($option)
        {
        
            if ($option == '1')
            {
            
                $result = str_replace('-', '_', str_replace('/', '_', substr($_SERVER['QUERY_STRING'], 7)));
                
                if ($result == '')
                    $result = 'root';
            
            }
            
            elseif ($option == '2')
                $result = self::$__mvc_routes;
            
            else
                return false;
            
            return $result;
        
        }
        
        // Store an MVC variable
        public static function Store_Variable($mvc_var, $content)
        {

            if (empty($mvc_var))
                return false;
            
            self::$__mvc_vars[$mvc_var] = $content;
            
            return true;
        
        }
        
        // Restore an MVC variable
        public static function Restore_Variable($mvc_var)
        {

            if (empty($mvc_var))
                return false;
            
            $result = self::$__mvc_vars[$mvc_var];
            
            return $result;
        
        }
    
    }

?>
