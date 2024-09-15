<?php
	/*
		Deploy Program (Programmable gate for meta apps & services deployment)

		File name: deploy_program.php
		Description: This file contains the deploy program gate.

		Coded by George Delaportas (G0D)
		Copyright (C) 2023 - 2024
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Load extensions
    UTIL::Load_Extension('arkangel', 'php');

    // Check for missing general arguments
    if (empty($_POST['program_name']))
	{
		echo '-1';

		return;
	}

	// Check for existing program name
	if (isset($_POST['check_existing']) && isset($_POST['program_type']) && isset($_POST['program_name']))
	{
		$my_profile = ARKANGEL::Fetch_My_Profile();

		if (!$my_profile)
		{
			echo '-1';

			return;
		}

		$program_name = trim($_POST['program_name']);

		foreach ($my_profile['user_programs'][$_POST['program_type'] . 's'] as $this_program)
		{
			if ($program_name === $this_program['name'])
			{
				echo '1';

				return;
			}
		}

		echo '0';

		return;
	}

	// Check for empty program source and model
	if (empty($_POST['program_source']) || empty($_POST['program_model']))
	{
		echo '-1';

		return;
	}

	$program_model = json_decode($_POST['program_model'], true);

	if (json_last_error() !== JSON_ERROR_NONE)
	{
		echo '-1';

		return;
	}

	if (!isset($program_model['name']) || !isset($program_model['type']))
	{
		echo '-1';

		return;
	}

	$my_profile = ARKANGEL::Fetch_My_Profile();

	$program_name = trim($_POST['program_name']);
	$program_source = $_POST['program_source'];
	$program = array($program_name, $program_model, $program_source);

	$new_profile = deploy_program($my_profile, $program);

	if (!ARKANGEL::Update_Profile($new_profile))
	{
		echo '-1';

		return;
	}

	echo '1';

	function deploy_program($profile, $program)
	{
		$index = 0;
		$uid = $profile['uid'];
		$is_match_found = false;
		$program_id = str_replace(' ', '_', strtolower($program[0]));
		$program_icon = $program[1]['icon'];
		$new_program = array('id' 			=>	$program_id,
							 'name' 		=> 	$program[0],
							 'icon' 		=> 	$program_icon,
							 'last_run' 	=> 	null);

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
			array_push($profile['user_programs'][$program[1]['type'] . 's'], $new_program);

			mkdir($final_path, 0700);
			mkdir($final_path . '/data', 0700);
			mkdir($final_path . '/data/window', 0700);
			mkdir($final_path . '/data/casement', 0700);
			mkdir($final_path . '/graphics', 0700);
			mkdir($final_path . '/graphics/pix', 0700);
			mkdir($final_path . '/graphics/icons', 0700);
			mkdir($final_path . '/misc', 0700);

			file_put_contents($final_path . '/data/window/title.phtml', '');
			file_put_contents($final_path . '/data/window/content.phtml', '');
			file_put_contents($final_path . '/data/window/status.phtml', '');
			file_put_contents($final_path . '/data/casement/title.phtml', '');
			file_put_contents($final_path . '/data/casement/content.phtml', '');
			file_put_contents($final_path . '/data/casement/status.phtml', '');
			file_put_contents($final_path . '/graphics/' . $program_id . '.css', '');
		}

		$program_settings_path = UTIL::Absolute_Path('framework/misc/data/default_program_settings.json');
		$program_settings = json_decode(file_get_contents($program_settings_path), true);

		$program_settings['id'] = $program_id;
		$program_settings['name'] = $program[0];
		$program_settings['icon'] = $program_icon;

		file_put_contents($final_path . '/settings.json', json_encode($program_settings));
		file_put_contents($final_path . '/' . $program_id . '.ms', $program[2]);

		return $profile;
	}
?>
