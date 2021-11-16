<?php
	/*
		Config Loader (Configurations initialization facility)
		
		File name: config_loader.php
		Description: This file contains the Config Loader - Configurations initialization facility.
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2016
		Open Software License (OSL 3.0)
	*/
	
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // Load and setup all languages in config
    UTIL::Setup_Languages();
    
    // Load and setup all routes in config
	UTIL::Setup_Routes();
	
	$this_lang = LANG::Get('this');
	$all_langs = LANG::Get('all');
	$this_route = MVC::Get_Route('this');
	$all_routes = MVC::Get_Route('all');
	
	UTIL::Set_Session_Variable('this_lang', $this_lang);
	UTIL::Set_Session_Variable('all_langs', $all_langs);
	UTIL::Set_Session_Variable('this_route', $this_route);
	UTIL::Set_Session_Variable('all_routes', $all_routes);
	UTIL::Set_Session_Variable('extensions_cache', array());
	
	if (empty(UTIL::Get_Session_Variable('auth')))
		UTIL::Set_Session_Variable('auth', null);
	
	unset($this_lang);
	unset($all_langs);
	unset($this_route);
	unset($all_routes);
?>
