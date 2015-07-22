<?php

    /*

        GreyOS Inc. - Dragon (GreyOS Routes Dispatcher)

        Version: 1.0

        File name: dragon.php
        Description: This file contains the Dragon - GreyOS Routes Dispatcher.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright (c) 2013

    */
    
    
    
    // Dragon Class
    class DRAGON
    {
    
        private static $__actions = array();
        private static $__routes = array();
        
        private static function __Action_Exists($action)
        {
        
            $actions_num = count(self::$__actions);

            for ($i = 0; $i < $actions_num; $i++)
            {
            
                if (self::$__actions[$i] === $action)
                    return true;
            
            }
            
            return false;
        
        }
        
        private static function __Route_Exists($route)
        {
        
            $routes_num = count(self::$__routes);

            for ($i = 0; $i < $routes_num; $i++)
            {
            
                if (self::$__routes[$i] === $route)
                    return true;
            
            }
            
            return false;
        
        }
        
        public static function Put($action, $route)
        {
        
            if (self::__Action_Exists($action) || self::__Route_Exists($route))
                return false;
            
            array_push(self::$__actions, $action);
            array_push(self::$__routes, $route);
            
            return true;
        
        }
        
        public static function Dispatch($action)
        {
        
            $actions_num = count(self::$__actions);

            for ($i = 0; $i < $actions_num; $i++)
            {
            
                if (self::$__actions[$i] === $action)
                    return self::$__routes[$i];
            
            }
            
            return false;
        
        }
        
        public static function Info()
        {
        
            $actions_routes = array_merge(self::$__actions, ':', count(self::$__actions), '|', 
                                          self::$__routes, ':', count(self::$__routes));
            
            return $actions_routes;
        
        }
        
    }

?>
