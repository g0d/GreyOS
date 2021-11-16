<?php
	/*
		Dragon (User-defined MVC routes dispatcher)
		
		File name: dragon.php
		Description: This file contains the Dragon - MVC routes dispatcher.
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2016
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Auto search and load dispatching conditions
	$available_conditions = UTIL::Process_Dir(UTIL::Absolute_Path('framework/misc/dispatchers/conditions'), true);

	// Close on error
	if (empty($available_conditions))
		return false;

	// Load all files and check for inconsistencies
	foreach ($available_conditions as $file)
	{
		$file_ext = mb_substr($file['filename'], -3, 3, 'utf8');

		if ($file_ext === 'php')
		{
			$file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 3, 'utf8');

			require_once($file['dirpath'] . '/' . $file['filename']);
		}
	}

	// ----------------------------
?>
