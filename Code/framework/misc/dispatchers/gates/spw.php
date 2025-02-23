<?php
	/*
		SPW (Programmable gate for system-level apps & services creation - based on templates)

		File name: spw.php
		Description: This file contains the SPW gate.

		Coded by George Delaportas (G0D)
		Copyright (C) 2024
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Check for missing general arguments
    if (empty($_POST['program_name']) || empty($_POST['program_type']))
	{
		echo '-1';

		return;
	}

	create_program($_POST['program_name'], $_POST['program_type']);

	function create_program($program_name, $program_type)
	{
		$programs_registry_path = UTIL::Absolute_Path('framework/config/registry/js.json');
		$programs_registry = json_decode(file_get_contents($programs_registry_path), true);

		$normalized_program_name = str_replace(' ', '_', strtolower(trim($program_name)));

		foreach ($programs_registry as $name => $level)
		{
			if ($normalized_program_name === $name)
			{
				echo '0';

				return;
			}
		}

		$programs_registry[$normalized_program_name] = 'user';

		$templates_path = UTIL::Absolute_Path('framework/misc/data/spw');
		$program_template = file_get_contents($templates_path . '/template_' . $program_type . '.js');

		$new_program = str_replace('template_' . $program_type, $normalized_program_name, $program_template);
		$new_program = str_replace('Template ' . ucfirst($program_type), $program_name, $new_program);
		$new_program = str_replace('Template ', '', $new_program);
		$new_program = str_replace('[' . ucfirst($program_type) . ']', $program_name, $new_program);
		$new_program = str_replace('Version: 0.5', 'Version: xx.yy', $new_program);

		$user_programs_path = UTIL::Absolute_Path('framework/extensions/js/user');
		$user_program_folder = $user_programs_path . '/' . $normalized_program_name;

		mkdir($user_program_folder, 0700);

		file_put_contents($user_program_folder . '/'. $normalized_program_name . '.js', $new_program);
		file_put_contents($programs_registry_path, json_encode($programs_registry));

		echo '1';

		return;
	}
?>
