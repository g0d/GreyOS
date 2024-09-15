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
	UTIL::Load_Extension('arkangel', 'php');
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
		$all_users = ARKANGEL::Fetch_Credentials();

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

	function create_new_user($email, $password)
	{
		$new_user_profile = ARKANGEL::Fetch_Default_Profile();

		if (!$new_user_profile)
			return false;

		$new_user_profile['uid'] = md5($email . '-' . time());
		$new_user_profile['email'] = $email;
		$new_user_profile['online'] = true;
		$new_user_profile['security']['ip'] = $_SERVER['REMOTE_ADDR'];
		$new_user_profile['security']['agent'] = $_SERVER['HTTP_USER_AGENT'];
		$new_user_profile['security']['last_activity'] = time();

		$new_user_credentials = array('uid' 		=> 	$new_user_profile['uid'],
									  'username' 	=> 	$email,
									  'password' 	=> 	md5($password));

		$result = ARKANGEL::Update_Credentials($new_user_credentials);

		if (!$result)
			return false;

		$dir_path = UTIL::Absolute_Path('fs');
		$final_path = $dir_path . '/' . $new_user_profile['uid'];

		mkdir($final_path, 0700);
		mkdir($final_path . '/disk', 0700);
		mkdir($final_path . '/disk/Docs', 0700);
		mkdir($final_path . '/disk/Pictures', 0700);
		mkdir($final_path . '/disk/Music', 0700);
		mkdir($final_path . '/disk/Video', 0700);
		mkdir($final_path . '/disk/Other', 0700);
		mkdir($final_path . '/programs', 0700);

		$result = ARKANGEL::Update_Profile($new_user_profile);

		if (!$result)
			return false;

		UTIL::Set_Session_Variable('auth', $new_user_profile);

		return true;
	}
?>
