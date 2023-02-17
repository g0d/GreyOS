<?php
    /*
        APC[u] Accelerator
        
        File name: apc.php (Version: 1.2)
        Description: This file contains the APC[u] Accelerator.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2017
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // APC[u] class
    class APC extends UC
    {
        public function Data($key, $data, $ttl = 0, $mode)
        {
            if (empty($key) || empty($data) || is_nan($ttl) || $ttl < 0 || !in_array($mode, $this->__modes))
                return false;
            
            if ($mode === self::_GET_)
                return $this->Get_Data($key, $data, $ttl);
            else
                return $this->Set_Data($key, $data, $ttl);
        }
        
        public function File($key, $filename, $ttl = 0, $mode)
        {
            if (empty($key) || empty($filename) || is_nan($ttl) || $ttl < 0 || !in_array($mode, $this->__modes))
                return false;
            
            if ($mode === self::_GET_)
                return $this->Get_File($key, $filename, $ttl);
            else
                return $this->Set_File($key, $filename, $ttl);
        }
        
        public function Fetch($key)
        {
            if (empty($key))
                return false;
            
            return apcu_fetch($key);
        }
        
        public function Exists($key)
        {
            if (empty($key))
                return false;
            
            return apcu_exists($key);
        }
        
        public function Delete($key)
        {
            if (empty($key))
                return false;
            
            if (!$this->Exists($key))
                return false;
            
            return apcu_delete($key);
        }
        
        public function Clear()
        {
            return apcu_clear_cache($cache_type);
        }
        
        private function Get_Data($key, $data, $ttl)
        {
            $cached_data = apcu_fetch($key);
            
            if (!$cached_data)
            {
                $cache_result = apcu_store($key, $data, $ttl);
                
                if (!$cache_result)
                    return false;
                
                return $data;
            }
            
            return $cached_data;
        }
        
        private function Set_Data($key, $data, $ttl)
        {
            return apcu_store($key, $data, $ttl);
        }
        
        private function Get_File($key, $filename, $ttl)
        {
            $cached_contents = apcu_fetch($key);
            
            if (!$cached_contents)
            {
                $exists = file_exists($filename);
                
                if (!$exists)
                    return false;
                
                $contents = file_get_contents($filename);
                
                if (!$contents)
                    return false;
                
                $cache_result = apcu_store($key, $contents, $ttl);
                
                if (!$cache_result)
                    return false;
                
                return $contents;
            }
            
            return $cached_contents;
        }
        
        private function Set_File($key, $filename, $ttl)
        {
            $exists = file_exists($filename);
            
            if (!$exists)
                return false;
            
            return apcu_store($key, $filename, $ttl);
        }
    }
?>
