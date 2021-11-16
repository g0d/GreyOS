<?php
    /*
        micro-MVC
        
        File name: mvc.php
        Description: This file contains the "MVC" class.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // Include MVC CONTROLLER class
    require(UTIL::Absolute_Path('framework/mvc/controller.php'));
    
    // MVC class
    class MVC
    {
        /** @var static MVC routes (array) */
        private static $__mvc_routes = array(0 => 'root');
        
        /** @var static MVC variables (array) */
        private static $__mvc_vars = array();
        
        /**
        * MVC::Go_To - Go to the specified virtual MVC route passing any arguments
        *
        * @param string $method A method to call (if exists) for this specific route [method = route]
        * @param mixed $args Any arguments for this method / route (default: null)
        *
        * @return bool
        */
        public static function Go_To($method, $args = null)
        {
            if (empty($method))
                return false;
            
            $mvc_path = 'framework/mvc/';
            
            // Always include the root model
            require_once($mvc_path . 'models/root.php');
            
            // Include the specified model
            if (file_exists($mvc_path . 'models/' . $method . '.php'))
                require_once($mvc_path . 'models/' . $method . '.php');
            
            // Call the specified controller function (if it exists)
            if (in_array($method, get_class_methods('MVC_CONTROLLER')))
                MVC_CONTROLLER::$method($args);
            
            // Include the specified view
            if (file_exists($mvc_path . 'views/' . $method . '.phtml'))
                require_once($mvc_path . 'views/' . $method . '.phtml');
            
            return true;
        }
        
        /**
        * MVC::Get_Route - Get current or all virtual MVC routes
        *
        * @param string $option "this" / "all"
        * @param bool $lang_relative Set whether route is relative or absolute to language code (default: true)
        *
        * @return string The route URL
        */
        public static function Get_Route($option, $lang_relative = true)
        {
            if ($option === 'this')
            {
                $full_url = UTIL::Normalize_Route(substr($_SERVER['QUERY_STRING'], 4));
                
                if ($lang_relative === true)
                    $url = substr($full_url, 3);
                
                if ($url === 'root')
                    return false;
                
                if ($url === '' || $url === false)
                    $url = 'root';
                
                $url = UTIL::Check_Valid_Params($url);
                
                if ($lang_relative === true && !self::Route_Exists($url))
                    return false;
            }
            else if ($option === 'all')
            {
                if ($lang_relative === false)
                    return false;
                
                $url = self::$__mvc_routes;
            }
            else
                return false;
            
            return $url;
        }
        
        /**
        * MVC::Set_Route - Set a virtual MVC route
        *
        * @param string $mvc_route A route
        *
        * @return bool
        */
        public static function Set_Route($mvc_route)
        {
            $fixed_route = trim($mvc_route);
            
            if (empty($fixed_route) || $fixed_route === 'root')
                return false;
            
            array_push(self::$__mvc_routes, UTIL::Normalize_Route($fixed_route));
            
            return true;
        }
        
        /**
        * MVC::Route_Exists - Check if a route exists
        *
        * @param string $this_route A route
        *
        * @return bool
        */
        public static function Route_Exists($this_route)
        {
            if (!in_array($this_route, self::$__mvc_routes))
                return false;
            
            return true;
        }
        
        /**
        * MVC::Store_Content - Store an MVC content
        *
        * @param string $mvc_var A variable
        * @param string $content Any content
        *
        * @return bool
        */
        public static function Store_Content($mvc_var, $content)
        {
            if (empty($mvc_var))
                return false;
            
            self::$__mvc_vars[$mvc_var] = $content;
            
            return true;
        }
        
        /**
        * MVC::Restore_Content - Restore an MVC content
        *
        * @param string $mvc_var A variable
        *
        * @return mixed
        */
        public static function Restore_Content($mvc_var)
        {
            if (empty($mvc_var))
                return false;
            
            $result = self::$__mvc_vars[$mvc_var];
            
            return $result;
        }    
    }
?>
