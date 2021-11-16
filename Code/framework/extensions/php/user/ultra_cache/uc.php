<?php
    /*
        Ultra Cache (Abstract class)
        
        File name: uc.php (Version: 3.2)
        Description: This file contains the Ultra Cache (UC) - Abstract class.
        
        Coded by George Delaportas (G0D)
        Copyright (c) 2017
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // Ultra Cache (UC) abstract class
    abstract class UC
    {
        const _GET_ = 0;
        const _SET_ = 1;
        protected $__modes = array(self::_GET_, self::_SET_);
    }
?>
