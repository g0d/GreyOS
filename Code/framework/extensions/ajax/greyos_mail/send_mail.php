<?php

    /*

        GreyOS Inc. - GreyOS M@il (Send Mail)

        Version: 1.0

        File name: send_mail.php
        Description: This file contains the send mail functionality.

        Coded by  Mirko Lučić (mands) and Slavenko Božić (slawe)

        GreyOS Inc.
        Copyright © 2013

    */

	
	
	session_start();

    if (isset($_SESSION['TALOS']['id']) && !empty($_SESSION['TALOS']['id']))
		$user_id = $_SESSION['TALOS']['id'];
	
	else
	{
		
		echo json_encode(array('mail_error'=>'Session invalid or expired. Please login again.'));
		exit;
		
	}

	require('../../../alpha.php');
	require('../../../../cms/alpha_cms.php');
	
	require_once ALPHA_CMS::Absolute_Path('framework/extensions/php/greyos_mail/send_mail/lib/swift_required.php');
	require_once ALPHA_CMS::Absolute_Path('framework/extensions/php/greyos_mail/include/greyos_mail_class.php');
	require_once ALPHA_CMS::Absolute_Path('framework/extensions/php/greyos_mail/roundcube_framework/rcube_mime.php');
	require_once ALPHA_CMS::Absolute_Path('framework/extensions/php/greyos_mail/roundcube_framework/greyos_bootstrap.php');
	
	ob_start();
	
	function Parse_Address_String($input)
	{

		$a_parts = rcube_mime::decode_address_list($input, null, true, null);

		if (!sizeof($a_parts))
			return $input;

		$c = count($a_parts);
		$count = 0;
		$out = array();
		$allvalues = array();

		foreach ($a_parts as $part)
		{
				
			$name = $part['name'];
			$mailto = $part['mailto'];
			$string = $part['string'];
			$valid = rcube_utils::check_email($mailto, false);

			// phishing email prevention, e.g. "valid@email.addr <phishing@email.addr>"
			if ($name && $valid && $name !=  $mailto && strpos($name, '@'))				
				$name = '';

			if ($valid)
				$out[$mailto]=($name ? $name : $mailto);
				
			else
			{
					
				$result = array('mail_error'=>'Invlid email: '.$mailto );
			
				echo json_encode($result);

				exit;
					
			}

		}

		return $out;
			
	}
		

	if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
		
		$result = ALPHA_CMS::Execute_SQL_Command('SELECT * 
													FROM `mail_identities` 
													WHERE `id`=\'' . $_POST['from'] . '\'
													AND `user_id`=\'' . $user_id . '\'');
		
		if (count($result) !== 1)
		{
			
			$result=array('mail_error'=>'Something is really wrong here?');
			
			echo json_encode($result);
			
			exit;		
			
		}
		
		$identity=$result[0];
		
		if ($identity['password']===NULL)
		{
			
			$result=array('mail_error'=>'Unable to get password, please login first');
			
			echo json_encode($result);
			
			exit;
			
		}
		
		
		$to = Parse_Address_String($_POST['to']);
			
		if (!empty($_POST['reply_to']))
			$reply_to = Parse_Address_String($_POST['reply_to']);
		
		else
			$reply_to=NULL;
		
		if (!empty($_POST['cc']))
			$cc = Parse_Address_String($_POST['cc']);
		
		else
			$cc = NULL;
		
		if (!empty($_POST['bcc']))
			$bcc = Parse_Address_String($_POST['bcc']);
		
		else
			$bcc = NULL;
		
        $subject = $_POST['subject'];
 
        $msg = $_POST['msg'];

		$pass = GREYOS_MAIL::Encrypt_Decrypt('decrypt', $identity['password']);

		$transport = Swift_SmtpTransport::newInstance($identity['smtp_host'], $identity['smtp_port'], $identity['smtp_ssl']);
		$transport->setUsername($identity['email']);
		$transport->setPassword($pass);

		$mailer = Swift_Mailer::newInstance($transport);

		$message = Swift_Message::newInstance($subject);
		$message->setFrom(array($identity['email']));
		
		$message->setTo($to);
		
		if (!empty($cc))
			$message->setCc($cc);
		
		if (!empty($bcc))
			$message->setBcc($bcc);

		if (!empty($reply_to ))
			$message->setReplyTo($reply_to);
			
		$message->setBody($msg);
		
		// Send the message
		$result = $mailer->send($message);

		ob_end_clean();
		
		if ((int)$result > 0)
			$result=array('mail_message'=>'Your message has been sent!' );
	
		else
			$result=array('mail_error'=>'Ups! We can\'t send your mail?' );
			
		echo json_encode($result);
		
		exit;

	}
	
?>
