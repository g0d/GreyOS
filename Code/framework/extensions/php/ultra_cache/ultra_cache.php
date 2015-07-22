<?php

    /*
    
        GreyOS Inc. - Ultra Cache
        
        Version: 2.8
        
        File name: ultra_cache.php
        Description: This file contains the Ultra Cache extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Ultra Cache class
    class Ultra_Cache
    {
    
        public static function Request_Value($key, $value, $ttl = null)
        {
        
            $result = null;
            $cache_res = null;
            
            if (empty($key) || empty($value))
                return false;
            
            if (ini_get('apc.enabled'))
                $result = apc_fetch($key);
            
            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $result = xcache_get($key);
            
            else
                return false;
            
            if (!$result)
            {
            
                $result = $value;
                
                if (ini_get('apc.enabled'))
                    $cache_res = apc_store($key, $value, $ttl);
                
                else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                    $cache_res = xcache_set($key, $value, $ttl);
                
                else
                    return false;
                
                if ($cache_res === false)
                    return false;
            
            }
            
            return $result;
        
        }
        
        public static function Request_File($key, $file, $ttl = null)
        {
        
            $result = null;
            $cache_res = null;
            
            if (empty($key) || empty($file))
                return false;
            
            if (ini_get('apc.enabled'))
                $result = apc_fetch($key);
            
            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $result = xcache_get($key);
            
            else
                return false;
            
            if (!$result)
            {
            
                $result = file_get_contents($file);
                
                if ($result === false)
                    return false;
                
                if (ini_get('apc.enabled'))
                    $cache_res = apc_store($key, $result, $ttl);
                
                else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                    $cache_res = xcache_set($key, $result, $ttl);
                
                else
                    return false;
                
                if ($cache_res === false)
                    return false;
            
            }
            
            return $result;
        
        }
        
        public static function Store_Value($key, $value, $ttl = null)
        {
        
            $cache_res = null;
            
            if (empty($key) || empty($value))
                return false;
            
            if (ini_get('apc.enabled'))
                $cache_res = apc_store($key, $value, $ttl);

            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $cache_res = xcache_set($key, $value, $ttl);

            else
                return false;

            if ($cache_res === false)
                return false;
            
            return true;
        
        }
        
        public static function Store_File($key, $file, $ttl = null)
        {
        
            $result = null;
            $cache_res = null;
            
            if (empty($key) || empty($file))
                return false;
            
            $result = file_get_contents($file);
            
            if (ini_get('apc.enabled'))
                $cache_res = apc_store($key, $result, $ttl);

            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $cache_res = xcache_set($key, $result, $ttl);

            else
                return false;

            if ($cache_res === false)
                return false;
            
            return true;
        
        }
        
        public static function Restore($key)
        {
        
            $result = null;
            
            if (empty($key))
                return false;
            
            if (ini_get('apc.enabled'))
                $result = apc_fetch($key);
            
            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $result = xcache_get($key);
            
            else
                return false;
            
            return $result;
        
        }
        
        public static function Delete($key)
        {
        
            $result = null;
            
            if (empty($key))
                return false;
            
            if (ini_get('apc.enabled'))
            {
            
                if (!apc_exists($key))
                    return false;
                
                $result = apc_delete($key);
            
            }
            
            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
            {
            
                if (!xcache_isset($key))
                    return false;
                
                $result = xcache_unset($key);
            
            }
            
            else
                return false;
            
            return $result;
        
        }
        
        public static function Exists($key)
        {
        
            $result = null;
            
            if (empty($key))
                return false;
            
            if (ini_get('apc.enabled'))
                $result = apc_exists($key);
            
            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $result = xcache_isset($key);
            
            else
                return null;
            
            return $result;
        
        }
        
        public static function Clear($cache_type = null)
        {
        
            $result = null;
            
            if (ini_get('apc.enabled'))
                $result = apc_clear_cache($cache_type);
            
            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $result = xcache_unset($cache_type);
            
            else
                return false;
            
            return $result;
        
        }
    
    }

?>
