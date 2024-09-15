<?php
	/*
		SPW (Programmable gate for system-level apps & services creation by template)

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

	echo '1';
	return

	$program_name = trim($_POST['program_name']);

	foreach ($my_profile['user_programs'][$_POST['program_type'] . 's'] as $this_program)
	{
		if ($program_name === $this_program['name'])
		{
			echo '1';

			return;
		}
	}

	function create_program($program)
	{
		$index = 0;
		$is_match_found = false;
		$program_id = str_replace(' ', '_', strtolower($program[0]));

		foreach ($profile['user_programs'][$program[1]['type'] . 's'] as $this_program)
		{
			if ($program[0] === $this_program['name'])
			{
				$profile['user_programs'][$program[1]['type'] . 's'][$index] = $new_program;

				$is_match_found = true;

				break;
			}

			$index++;
		}

		$file_path = UTIL::Absolute_Path('fs/' . $uid);
		$final_path = $file_path . '/programs/' . $program_id;

		if (!$is_match_found)
		{
			

			mkdir($final_path, 0700);
			mkdir($final_path . '/data', 0700);
			mkdir($final_path . '/data/window', 0700);
			mkdir($final_path . '/data/casement', 0700);
			mkdir($final_path . '/graphics', 0700);
			mkdir($final_path . '/graphics/pix', 0700);
			mkdir($final_path . '/graphics/icons', 0700);
			mkdir($final_path . '/misc', 0700);

			file_put_contents($final_path . '/data/window/title.phtml', '');
		}

		$program_settings_path = UTIL::Absolute_Path('framework/misc/data/default_program_settings.json');
		$program_settings = json_decode(file_get_contents($program_settings_path), true);

		$program_settings['id'] = $program_id;
		$program_settings['name'] = $program[0];
		$program_settings['icon'] = $program_icon;

		file_put_contents($final_path . '/settings.json', json_encode($program_settings));
		file_put_contents($final_path . '/' . $program_id . '.ms', $program[2]);

		return true;
	}
?>
