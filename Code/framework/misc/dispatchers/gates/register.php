<?php
	/*
		Register (Programmable gate for registration)
		
		File name: register.php
		Description: This file contains the registration gate (AJAX).
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2019
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
		if (!empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['confirm']))
			register($_POST['username'], $_POST['password'], $_POST['confirm']);
		else
			echo '-1';
	}
	else
		echo '-1';

	// Register
	function register($username, $password, $password_confirm)
	{
		if ($password !== $password_confirm)
		{
			echo '0';

			return false;
		}

		global $db_conn_link;

		$secure_query = 'SELECT * 
						 FROM `users` 
						 WHERE `username` = "' . mysqli_real_escape_string($db_conn_link, $username) . '"';

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

			session_regenerate_id(true);

			UTIL::Set_Session_Variable('auth', array('login' => 1, 
													 'user' => array('name' => $username, 
																	 'ip' => $_SERVER['REMOTE_ADDR'], 
																	 'agent' => $_SERVER['HTTP_USER_AGENT']), 
													 'last_activity' => time()));

			$from_email = 'GreyOS <welcome@greyos.gr>';
			$to_email = $username;
			$subject = UTIL::Load_Content('welcome_email_subject', 'static');
			$message = UTIL::Load_Content('welcome_email_body', 'static');

			$result = Woody::Send_Mail($from_email, $to_email, $subject, $message);

			if (empty($result))
			{
				echo '0';

				return false;
			}

			echo '1';
		}

		return true;
	}
?>
