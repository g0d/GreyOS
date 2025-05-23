<?php
	/*
		Send Email (Programmable gate for delivering emails)

		File name: send_email.php
		Description: This file contains the send email gate.

		Coded by George Delaportas (G0D/ViR4X)
		Copyright (C) 2019
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Load extensions
	UTIL::Load_Extension('woody', 'php');

	if (!empty($_POST['send']) && $_POST['send'] === '1' && !empty($_POST['email']))
	{
		$result = Woody::Send_Mail('hello@greyos.gr', $_POST['email'], 'GreyOS');

		if (!empty($result))
			echo 'E-mail successfully sent!';
		else
			echo 'E-mail was not sent!';
	}
	else
		echo '-1';
?>
