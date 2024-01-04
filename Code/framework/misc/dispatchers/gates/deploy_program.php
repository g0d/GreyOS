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
    if (empty($_POST['program_name']) || empty($_POST['program_source']))
	{
		echo '-1';

		return;
	}

	$user_profile = UTIL::Get_Session_Variable('auth');

	$program_name = trim($_POST['program_name']);
	$program_source = $_POST['program_source'];
	$program_run = minify_source($program_source);
	$program = array($program_name, $program_source, $program_run);

	$user_profile = deploy_program($user_profile, $program);

	if (!update_profile($user_profile))
	{
		echo '-1';

		return;
	}

	echo '1';

    function minify_source($js_data)
    {
		$js_source = trim($js_data);

		$js_source = str_replace("\t", " ", $js_data);

        $js_source = preg_replace('/\n(\s+)?\/\/[^\n]*/', "", $js_source);
        $js_source = preg_replace("!/\*[^*]*\*+([^/][^*]*\*+)*/!", "", $js_source);
		$js_source = preg_replace("/\/\*[^\/]*\*\//", "", $js_source);
		$js_source = preg_replace("/\/\*\*((\r\n|\n) \*[^\n]*)+(\r\n|\n) \*\//", "", $js_source);

        $js_source = str_replace("\r", "", $js_source);

		$js_source = preg_replace("/\s+\n/", "\n", $js_source);
		$js_source = preg_replace("/\n\s+/", "\n ", $js_source);
		$js_source = preg_replace("/ +/", " ", $js_source);

		$js_source = preg_replace("/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/", "", $js_source);

		return $js_source;
	}

	function deploy_program($profile, $program)
	{
		$email = $profile['email'];
		$username = substr($email, 0, strpos($email, '@'));
		$new_program = array('name' 		=> 	$program[0],
							 'last_run' 	=> 	null);

		array_push($profile['user_programs'], $new_program);

		$file_path = UTIL::Absolute_Path('fs/' . $username);
		file_put_contents($file_path . '/programs/source/' . $program[0] . '.js', $program[1]);
		file_put_contents($file_path . '/programs/run/' . $program[0] . '.js', $program[2]);

		return $profile;
	}

	function update_profile($profile)
	{
		$email = $profile['email'];
		$username = substr($email, 0, strpos($email, '@'));
		$updated_json_profile = json_encode($profile);

		if (json_last_error() !== JSON_ERROR_NONE)
			return false;

		$file_path = UTIL::Absolute_Path('fs/' . $username);
		file_put_contents($file_path . '/profile.cfg', $updated_json_profile);

		return true;
	}
?>
