<?php
    /*
        Memcache Accelerator
        
        File name: memcache.php (Version: 1.2)
        Description: This file contains the Memcache Accelerator.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2017
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // Memcache class
    class MEMC extends UC
    {
        public function DB($key, $sql_data, $ttl = 0, $mode)
        {
            if (empty($key) || empty($sql_data) || is_nan($ttl) || $ttl < 0 | !in_array($mode, $this->__modes))
                return false;
            
            if ($mode === self::_GET_)
                return $this->Get_DB($key, $sql_data, $ttl);
            else
                return $this->Set_DB($key, $sql_data, $ttl);
        }
        
        private function Get_DB($key, $sql_data, $ttl)
        {
            $cached_data = Memcache::get($key);
            
            if (!$cached_data)
            {
                $cache_result = Memcache::set($key, $sql_data, MEMCACHE_COMPRESSED, $ttl);
                
                if (!$cache_result)
                    return false;
                
                return $sql_data;
            }
            
            return $cached_data;
        }
        
        private function Set_DB($key, $sql_data, $ttl)
        {
            $cache_result = Memcache::set($key, $sql_data, MEMCACHE_COMPRESSED, $ttl);
            
            if (!$cache_result)
                return false;
            
            return true;
        }
    }
?>
