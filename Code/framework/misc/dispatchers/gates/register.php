<?php
	/*
		Register (Programmable gate for registration)
		
		File name: register.php
		Description: This file contains the registration gate (AJAX).
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2019 - 2023
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Check for a valid mode (if invalid terminate)
	if (empty($_POST['mode']))
	{
		echo '-1';

		return;
	}

    // Load extensions
	UTIL::Load_Extension('woody', 'php');

	/*
	// OPTIONALLY USE A DB
	$db_conn_link = DB::Use_Connection();

	if (empty($db_conn_link))
	{
		echo '-1';

		return;
	}
	*/

	// Actions / Choices
	if ($_POST['mode'] === 'reg')	// Register
	{
		if (!empty($_POST['username']) && !empty($_POST['password']))
			register(trim($_POST['username']), $_POST['password']);
		else
		{
			echo '0';

			return;
		}
	}
	else
	{
		echo '-1';

		return;
	}

	// Register
	function register($username, $password)
	{
		$all_users = fetch_credentials();

		if (!$all_users)
		{
			echo '-1';

			return false;
		}

		foreach ($all_users as $credentials)
		{
			if ($credentials['username'] === $username)
			{
				echo '9';

				return false;
			}
		}

		$result = create_new_user($username, $password);

		if (!$result)
		{
			echo '0';

			return false;
		}

		echo '1';

		return true;

		global $db_conn_link;

		if (empty($db_conn_link))
		{
			echo '0';

			return false;
		}

		$secure_query = 'SELECT * 
						 FROM `users` 
						 WHERE `username` = "' . mysqli_real_escape_string($db_conn_link, $username) . '" AND ' . '
							   `password` = "' . mysqli_real_escape_string($db_conn_link, md5($password)) . '" AND ' . '
							   `enabled` = 1';

		$result = DB::Exec_SQL_Command($secure_query);

		if (empty($result))
		{
			echo '0';

			return false;
		}
		else
		{
			if ($result[0] === $username)
			{
				echo '9';

				return false;
			}

			$secure_query = 'INSERT INTO `users`(`username`, `password`)
							 VALUES("' . $username . '", "' . mysqli_real_escape_string($db_conn_link, md5($password)) . '")';

			$result = DB::Exec_SQL_Command($secure_query);

			if (empty($result))
			{
				echo '0';

				return false;
			}

			$result = create_new_user($username, $password);

			if (!$result)
			{
				echo '0';

				return false;
			}

			$from_email = 'GreyOS <welcome@greyos.gr>';
			$subject = UTIL::Load_Content('welcome_email_subject', 'static');
			$message = UTIL::Load_Content('welcome_email_body', 'static');

			$result = Woody::Send_Mail($from_email, $username, $subject, $message);

			if (empty($result))
			{
				echo '0';

				return false;
			}

			echo '1';
		}

		return true;
	}

	function fetch_credentials()
	{
		$file_path = UTIL::Absolute_Path('framework/config/users.cfg');
		$data = file_get_contents($file_path);
		$result = json_decode($data, true);

		if (json_last_error() !== JSON_ERROR_NONE)
			return false;

		return $result;
	}

	function update_credentials($new_user_credentials)
	{
		$all_credentials = fetch_credentials();

		if (!$all_credentials)
			return false;

		array_push($all_credentials, $new_user_credentials);

		$all_credentials_json = json_encode($all_credentials);

		if (json_last_error() !== JSON_ERROR_NONE)
			return false;

		$file_path = UTIL::Absolute_Path('framework/config/users.cfg');
		file_put_contents($file_path, $all_credentials_json);

		return true;
	}

	function fetch_default_profile()
	{
		$file_path = UTIL::Absolute_Path('framework/misc/data/default_profile.cfg');
		$data = file_get_contents($file_path);
		$result = json_decode($data, true);

		if (json_last_error() !== JSON_ERROR_NONE)
			return false;

		return $result;
	}

	function update_profile($new_profile)
	{
		$email = $new_profile['email'];
		$username = substr($email, 0, strpos($email, '@'));
		$new_json_profile = json_encode($new_profile);

		if (json_last_error() !== JSON_ERROR_NONE)
			return false;

		$file_path = UTIL::Absolute_Path('fs/' . $username);
		file_put_contents($file_path . '/profile.cfg', $new_json_profile);

		return true;
	}

	function create_new_user($email, $password)
	{
		$new_user_profile = fetch_default_profile();

		if (!$new_user_profile)
			return false;

		$new_user_credentials = array('username' => $email,
									  'password' => md5($password));

		$result = update_credentials($new_user_credentials);

		if (!$result)
			return false;

		$dir_path = UTIL::Absolute_Path('fs');
		$username = substr($email, 0, strpos($email, '@'));

		mkdir($dir_path . '/' . $username, 0700);
		mkdir($dir_path . '/' . $username . '/disk', 0700);
		mkdir($dir_path . '/' . $username . '/disk/Docs', 0700);
		mkdir($dir_path . '/' . $username . '/disk/Pictures', 0700);
		mkdir($dir_path . '/' . $username . '/disk/Music', 0700);
		mkdir($dir_path . '/' . $username . '/disk/Video', 0700);
		mkdir($dir_path . '/' . $username . '/disk/Other', 0700);
		mkdir($dir_path . '/' . $username . '/programs', 0700);
		mkdir($dir_path . '/' . $username . '/programs/apps', 0700);
		mkdir($dir_path . '/' . $username . '/programs/services', 0700);

		$new_user_profile['email'] = $email;
		$new_user_profile['online'] = true;
		$new_user_profile['security']['ip'] = $_SERVER['REMOTE_ADDR'];
		$new_user_profile['security']['agent'] = $_SERVER['HTTP_USER_AGENT'];
		$new_user_profile['security']['last_activity'] = time();

		$result = update_profile($new_user_profile);

		if (!$result)
			return false;

		UTIL::Set_Session_Variable('auth', $new_user_profile);

		return true;
	}
?>
