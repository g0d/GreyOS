<?php

    /*
    
        GreyOS Inc. - Ultra Feed Cache
        
        Version: 2.8
        
        File name: ultra_feed_cache.php
        Description: This file contains the Ultra Feed Cache extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Ultra Feed Cache class
    class Ultra_Feed_Cache
    {
    
        public static function Request($key, $url, $ttl = null)
        {
        
            $result = null;
            $cache_res = null;
            
            if (empty($key) || empty($url))
                return false;
            
            if (ini_get('apc.enabled'))
                $result = apc_fetch($key);
            
            else if (ini_get('xcache.cacher') == '1' || ini_get('xcache.cacher') == 'On')
                $result = xcache_get($key);
            
            else
                return false;
            
            if (!is_array($result))
            {
            
                $result = ALPHA_CMS::Convert_XML_To_Array($url);
                
                if (!is_array($result))
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
        
        public static function Store($key, $url, $ttl = null)
        {
        
            $result = null;
            $cache_res = null;
            
            if (empty($key) || empty($url))
                return false;
            
            $result = ALPHA_CMS::Convert_XML_To_Array($url);

            if (!is_array($result))
                return false;

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
            
            if (!is_array($result))
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
