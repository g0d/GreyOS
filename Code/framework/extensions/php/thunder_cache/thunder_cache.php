<?php

    /*
    
        GreyOS Inc. - Thunder Cache
        
        Version: 1.0
        
        File name: thunder_cache.php
        Description: This file contains the Thunder Cache extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Thunder Cache class
    class Thunder_Cache
    {
    
        private static $__memcached = null;
        private static $__server = 'localhost';
        private static $__port = 11211;
        private static $__weight = 10;
        
        public static function Init($init_values = null, $mode = 1)
        {
        
            if ((!empty($init_values) && !is_array($init_values) && array_count_values($init_values) < 3) || 
                empty($mode) || (!empty($mode) && ($mode < 1 || $mode > 2)))
                return false;
            
            self::$__memcached = new Memcached();
            
            if (empty($init_values))
                $result = self::$__memcached->addServer(self::$__server, self::$__port, self::$__weight);
            
            else
            {
            
                if ($mode == 1)
                    $result = self::$__memcached->addServer($init_values[0], $init_values[1], $init_values[2]);
                
                else
                    $result = self::$__memcached->addServers($init_values);
            
            }
            
            return $result;
        
        }
        
        public static function Get_Value($key)
        {
        
            if (empty($key))
                return false;
            
            $result = self::$__memcached->get($key);
            
            if ($result == Memcached::RES_NOTFOUND)
                $result = false;
            
            return $result;
        
        }
        
        public static function Get_Multiple_Values($keys_array, $mode = 1)
        {
        
            if (empty($keys_array) || !is_array($keys_array) || 
                empty($mode) || (!empty($mode) && ($mode < 1 || $mode > 2)))
                return false;
            
            $cas_tokens = null;
            
            if ($mode == 1)
                $result = self::$__memcached->getMulti($keys_array, $cas_tokens, Memcached::GET_PRESERVE_ORDER);
            
            else
                $result = $cas_tokens;
            
            return $result;
        
        }
        
        public static function Set_Value($key, $value, $exp = 0)
        {
        
            if (empty($key) || empty($value) || !is_int($exp) || $exp < 0)
                return false;
            
            $result = self::$__memcached->set($key, $value, $exp);
            
            return $result;
        
        }
        
        public static function Set_Multiple_Values($items_array, $exp = 0)
        {
        
            if (empty($items_array) || !is_array($items_array) || !is_int($exp) || $exp < 0)
                return false;
            
            $result = self::$__memcached->setMulti($items_array, $exp);
            
            return $result;
        
        }
        
        public static function Replace_Value($key, $value, $exp = 0)
        {
        
            if (empty($key) || empty($value) || !is_int($exp) || $exp < 0)
                return false;
            
            $result = self::$__memcached->replace($key, $value, $exp);
            
            if ($result == Memcached::RES_NOTSTORED)
                $result = false;
            
            return $result;
        
        }
        
        public static function Delete_Value($key, $delay = 0)
        {
        
            if (empty($key) || !is_int($delay) || $delay < 0)
                return false;
            
            $result = self::$__memcached->delete($key, $delay);
            
            if ($result == Memcached::RES_NOTFOUND)
                $result = false;
            
            return $result;
        
        }
        
        public static function Delete_Multiple_Values($keys_array, $delay = 0)
        {
        
            if (empty($keys_array) || !is_int($delay) || $delay < 0)
                return false;
            
            $result = self::$__memcached->deleteMulti($keys_array, $delay);
            
            if ($result == Memcached::RES_NOTFOUND)
                $result = false;
            
            return $result;
        
        }
        
        public static function Flush($delay)
        {
        
            if (!is_int($delay) || $delay < 0)
                return false;
            
            $result = self::$__memcached->flush($delay);
            
            return $result;
        
        }
        
        public static function Set_Expiration($key, $exp)
        {
        
            if (empty($key) || !is_int($exp) || $exp < 0)
                return false;
            
            $result = self::$__memcached->touch($key, $exp);
            
            return $result;
        
        }
        
        public static function Fetch_Servers()
        {
        
            $result = self::$__memcached->getServerList();
            
            return $result;
        
        }
        
        public static function Reset_Servers()
        {
        
            $result = self::$__memcached->resetServerList();
            
            return $result;
        
        }
        
        public static function Quit()
        {
        
            $result = self::$__memcached->quit();
            
            return $result;
        
        }
    
    }

?>
