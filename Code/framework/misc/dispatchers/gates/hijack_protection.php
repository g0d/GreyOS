<?php
	/*
		Hijack-Protection (Programmable gate for hijack protection)

		File name: hijack_protection.php
		Description: This file contains the hijack protection gate (AJAX).

		Coded by George Delaportas (G0D/ViR4X)
		Copyright (C) 2019 - 2023
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Load current authentication data
	$user_profile = UTIL::Get_Session_Variable('auth');

	if (empty($user_profile))
	{
		echo '-1';

		return;
	}

	// Load extensions
	UTIL::Load_Extension('anti_hijack', 'php');

	// On attack callback function
	function __on_attack()
	{
		clear_session();

		return;
	}

	// On normal callback function
	function __on_normal()
	{
		$user_profile['security']['last_activity'] = time();

		UTIL::Set_Session_Variable('auth', $user_profile);
	}

	// Setup callback parameters for session handling
	$on_attack_params = array('__on_attack');
	$on_normal_params = array('__on_normal');

	// Run Anti-Hijack and block attackers
	if (Anti_Hijack($user_profile['security']['ip'], $user_profile['security']['agent'], 
					$user_profile['security']['last_activity'], 3600, $on_attack_params, $on_normal_params))
	{
		echo '0';

		return;
    }

	// Destroy session
	function clear_session()
	{
		session_regenerate_id(true);

		UTIL::Set_Session_Variable('auth', null);

		return null;
    }
    
    echo '1';
?>
