<?php
	/*
		Forms (Programmable gate for showing various forms)
		
		File name: forms.php
		Description: This file contains the forms gate (AJAX).
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2021
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Check authentication mode (if invalid terminate)
	if (empty($_POST['id']))
	{
		echo '-1';

		return;
	}

	// Load all required extensions
	UTIL::Load_Extension('keycard', 'php');
	UTIL::Load_Extension('regy', 'php');

	// Actions / Choices
	if ($_POST['id'] === 'login')									// Login form
		echo KeyCard::Show_Login_Form();
	else if ($_POST['id'] === 'logout')								// Logout button
		echo KeyCard::Show_Logout_Button();
	else if ($_POST['id'] === 'registration') 						// Registration form
		echo Regy::Show_Form();
	else
		echo '-1';
?>
