<?php
    /*
        micro-MVC
        
        File name: micro_mvc.php
        Description: This file contains the micro-MVC framework.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015
        Open Software License (OSL 3.0)
    */
    
    // Define constant for direct access control
    define('micro_mvc', true);

    // Include UTIL class
    require('libs/util.php');
    
    // Include LANG class
    require('libs/lang.php');
        
    // Include DB class
    require('libs/db.php');
    
    // Include MVC class
    require('libs/mvc.php');
?>
