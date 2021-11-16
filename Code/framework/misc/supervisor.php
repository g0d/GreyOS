<?php
	/*
		Supervisor (Control dispatcher)
		
		File name: supervisor.php
		Description: This file contains the Supervisor - Control dispatcher.
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2016
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    if (empty($_POST['gate']))
    {
        $route_lang_exists = UTIL::Check_Route_Lang();

        if ($route_lang_exists === false)
        {
            header('Location: /en/');
            
            exit();
        }
        
        // User-defined MVC routes dispatcher
        require('framework/misc/dispatchers/dragon.php');
        
        // Main site
        require('site/index.phtml');
    }
    else
    {
        if (MVC::Get_Route('this') !== 'root')
        {
            header('Location: /');
            
            exit();
        }
        
        // AJAX dispatcher
        require('framework/misc/dispatchers/fortress.php');
    }
?>
