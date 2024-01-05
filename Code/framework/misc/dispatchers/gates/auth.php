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

	// Load helper extensions
    UTIL::Load_Extension('arkangel', 'php');

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
		$all_users = ARKANGEL::Fetch_Credentials();

		if (!$all_users)
		{
			echo '-1';

			return false;
		}

		foreach ($all_users as $credentials)
		{
			if ($credentials['username'] === $username && $credentials['password'] === md5($password))
			{
				$result = ARKANGEL::Synchronize_Profile($credentials['username']);

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
			$result = ARKANGEL::Synchronize_Profile($username);

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

		$user_profile = ARKANGEL::Fetch_Profile($user_profile['email']);

		$user_profile['online'] = false;

		$result = ARKANGEL::Update_Profile($user_profile);

		if (!$result)
		{
			echo '0';

			return false;
		}

		echo '1';

		ARKANGEL::Clear_Session();

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
		$user_profile = ARKANGEL::Fetch_My_Profile();

		if (empty($user_profile))
		{
			echo '0';

			return false;
		}

		echo json_encode($user_profile);

		return true;
	}
?>
