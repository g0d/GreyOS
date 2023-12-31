<?php
	/*
		Auth (Programmable gate for authentication)
		
		File name: auth.php
		Description: This file contains the authentication gate (AJAX).
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2019 - 2024
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Check authentication mode (if invalid terminate)
	if (empty($_POST['mode']))
	{
		echo '-1';

		return;
	}

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
	if ($_POST['mode'] === 'login')									// Login
	{
		if (!empty($_POST['username']) && !empty($_POST['password']))
			login(trim($_POST['username']), $_POST['password']);
		else
		{
			echo '0';

			return;
		}
	}
	else if ($_POST['mode'] === 'logout') 							// Logout
		logout();
	else if ($_POST['mode'] === 'status') 							// Status
		status();
	else if ($_POST['mode'] === 'details')							// User details
		details();
	else
	{
		echo '-1';

		return;
	}

	// Login
	function login($username, $password)
	{
		$all_users = fetch_credentials();

		if (!$all_users)
		{
			echo '-1';

			return false;
		}

		foreach ($all_users as $credentials)
		{
			if ($credentials['username'] === $username && $credentials['password'] === md5($password))
			{
				$result = synchronize_profile($credentials['username']);

				if (!$result)
				{
					echo '0';

					return false;
				}

				echo '1';

				return true;
			}
		}

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
			$result = synchronize_profile($username);

			if (!$result)
			{
				echo '0';

				return false;
			}

			echo '1';
		}

		return true;
	}

	// Logout
	function logout()
	{
		$user_profile = UTIL::Get_Session_Variable('auth');

		if (empty($user_profile))
		{
			echo '-1';

			return false;
		}

		$user_profile['online'] = false;

		$result = update_profile($user_profile);

		if (!$result)
		{
			echo '0';

			return false;
		}

		echo '1';

		clear_session();

		return true;
	}

	function status()
	{
		$user_profile = UTIL::Get_Session_Variable('auth');

		if (empty($user_profile))
		{
			echo '0';

			return false;
		}

		echo '1';

		return true;
	}

	function details()
	{
		$user_profile = UTIL::Get_Session_Variable('auth');

		if (empty($user_profile))
		{
			echo '0';

			return false;
		}

		echo json_encode($user_profile);

		return true;
	}

	function clear_session()
	{
		session_regenerate_id(true);

		UTIL::Set_Session_Variable('auth', null);

		return null;
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

	function synchronize_profile($email)
	{
		session_regenerate_id(true);

		$user_profile = fetch_profile($email);

		if (!$user_profile)
			return false;

		$user_profile['online'] = true;
		$user_profile['security']['ip'] = $_SERVER['REMOTE_ADDR'];
		$user_profile['security']['agent'] = $_SERVER['HTTP_USER_AGENT'];
		$user_profile['security']['last_activity'] = time();

		$result = update_profile($user_profile);

		if (!$result)
			return false;

		UTIL::Set_Session_Variable('auth', $user_profile);

		return true;
	}
	
	function fetch_profile($email)
	{
		$username = substr($email, 0, strpos($email, '@'));
		$file_path = UTIL::Absolute_Path('fs/' . $username . '/profile.cfg');
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

		$file_path = UTIL::Absolute_Path('fs/' . $username . '/profile.cfg');
		file_put_contents($file_path, $new_json_profile);

		return true;
	}
?>
