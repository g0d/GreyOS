<?php
	/*
		Deploy Program (Programmable gate for apps & services deployment)
		
		File name: deploy_program.php
		Description: This file contains the deploy program gate.
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2023 - 2024
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Check for missing arguments
    if (empty($_POST['deploy']) || empty($_POST['type']) || empty($_POST['program']))
	{
		echo '-1';

		return;
	}

	// TODO:...
?>
