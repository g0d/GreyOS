<?php
    /*
        Ultra Cache (Data, Files & DB factory class for caching with APC[u] and Memcache)
        
        File name: ultra_cache.php (Version: 3.0)
        Description: This file contains the Ultra Cache extension.
        
        Coded by George Delaportas (G0D)
        Copyright (c) 2017
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    require_once('uc.php');
    require_once('accelerators/apc.php');
    require_once('accelerators/memcache.php');
    
    // Ultra Cache factory class
    class ULTRA_CACHE extends UC
    {
        public static function APC()
        {
            return new APC();
        }

        public static function MEMCACHE()
        {
            return new MEMC();
        }
    }
?>
