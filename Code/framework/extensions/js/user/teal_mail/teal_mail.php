<?php
    /*
        GreyOS - Teal Mail (Version: 1.2)

        File name: teal_mail.php
        Description: This file contains the Teal Mail extension.

		Coded by George Delaportas (G0D)
		Copyright © 2013 - 2021
		Open Software License (OSL 3.0)
    */
	
    error_reporting(0);
	session_start();
	ob_start();

	global $user_id;
	global $output;

	if (isset($_SESSION['TALOS']['id']) && !empty($_SESSION['TALOS']['id']))
		$user_id = $_SESSION['TALOS']['id'];
	else
	{
		echo json_encode(array('__show_error'=>'Session invalid or expired. Please login again.'));

		exit;
	}

	session_write_close();

	define('RCMAIL_CHARSET', 'UTF-8');
	define('DEFAULT_MAIL_CHARSET', 'UTF-8');

	require_once UTILS::Absolute_Path('framework/extensions/php/greyos_mail/roundcube_framework/greyos_bootstrap.php');
	require_once UTILS::Absolute_Path('framework/extensions/php/greyos_mail/include/greyos_mail_class.php');
	require_once UTILS::Absolute_Path('framework/extensions/php/greyos_mail/include/greyos_mail_output.php');
	require_once UTILS::Absolute_Path('framework/extensions/php/greyos_mail/include/greyos_mail_session_handler.php');

	$output = new GREYOS_MAIL_OUTPUT();

	new MAIL_SESSION();

	if ($_POST['identity_id'])
	{
		// Check is mail identity id related to user_id
		if (!GREYOS_MAIL::Check_Ident_Id($_POST['identity_id'], $user_id))
		{
			$result = array('__show_error'=>'Wrong id?');

			Print_Result($result);
		}
		else
			MAIL_SESSION::Start($_POST['identity_id']);
	}
	
	if ($_POST['action'] === 'init_mail')
	{
		// false = don't create storage object
		$greyos_mail = new GREYOS_MAIL(false);

		$timezone = Calculate_Timezone($_POST['timezone_offset']);

		$greyos_mail->Update_Timezone($timezone, $user_id);

		$mail_accounts = $greyos_mail->Get_Mail_Accounts($user_id);

		if ($mail_accounts === false)
		{
			$result = array('__no_accounts_fix'=> true,
							'__print_add_acc'=> true,
							'__status_msg'=>'Multiple accounts webmail!');
		}
		else
		{
			$result = array('__print_add_acc'=> true,
							'__print_add_acc_btn'=> true,
							'pm_accounts'=>$mail_accounts,
							'__status_msg'=>'Multiple accounts webmail!');
		}

		Print_Result($result);
	}

	if ($_POST['action'] === 'acc_settings')
	{
		$identity=DB::Execute_SQL_Command('SELECT * FROM  `mail_identities` 
												WHERE  `id`='.$_POST['identity_id'].'
												AND `user_id`=\''.$user_id.'\'');

		if (count($identity) !== 1)
		{
			$result=array('__show_error'=>'Something is really wrong here?');

			Print_Result($result);
		}
		else
			$data = $output->Print_Acc_Settings($identity[0]);

		$result=array('pm_right'=>$data);

		Print_Result($result);
	}

	if ($_POST['action'] === 'check_new_mails')
	{
		$greyos_mail = new GREYOS_MAIL();

		$unread = $greyos_mail->storage->count('Inbox', 'UNSEEN');

		if (($_POST['update_inbox'] === '1') )
		{
			$msg_list = $greyos_mail->List_Messages('Inbox', 1);

			$result = array('__update_unread'=>$unread, 
							'pm_msg_list'=>$msg_list,
							'__status_msg'=>$_SESSION['email'].' ['.$_SESSION['folder_name'].']');
		}
		else
			$result = array('__update_unread'=>$unread);

		Print_Result($result);
	}
	
	if ($_POST['action'] === 'update_unread_number')
	{
		Check_Post_Vars(array('identity_id'));

		$greyos_mail = new GREYOS_MAIL();

		$unread = $greyos_mail->storage->count('Inbox', 'UNSEEN');
		
		$unread_data[$_POST['identity_id']] = $unread;
		
		$result = array('__update_accounts_unread'=>$unread_data);

		Print_Result($result);
	}

	if ($_POST['action'] === 'change_session')
	{
		Check_Post_Vars(array('id'));
		
		MAIL_SESSION::Start($_POST['id']);

		$greyos_mail=new GREYOS_MAIL();

		$_SESSION['mail_timezone'] = $greyos_mail->Get_Mail_Timezone($_POST['id']);
		$_SESSION['folder'] = 'Inbox';

		// reset search query
		unset($_SESSION['last_text_search']);
		unset($_SESSION['search_string']);

		$msg_list = $greyos_mail->List_Messages($_SESSION['folder'], 1);
		$msg_pagination = $greyos_mail->Message_Pagination();
		$folders = $output->Print_Folders($greyos_mail->Get_Folders(true));

		$result = array('__set_identity_id'=>$_POST['id'],
						'__print_msg_list_bones'=>'true',
						'pm_msg_list_pagination'=>$msg_pagination,
						'pm_msg_list'=>$msg_list,
						'pm_ident_'.$_POST['id']=>$folders,
					    '__status_msg'=>$_SESSION['email'].' ['.$_SESSION['folder_name'].']');

		Print_Result($result);
	}

	if ($_POST['action'] === 'add_account')
	{
		Check_Post_Vars(array('email', 'pass', 'host', 'name'));

		$greyos_mail = new GREYOS_MAIL();

        $new_acc_id = $greyos_mail->Add_Account($_POST['email'], $_POST['pass'], $_POST['host'], $_POST['name'], $user_id);
		
		if ($new_acc_id)
		{
			MAIL_SESSION::Start($new_acc_id);

			$_SESSION['folder'] = 'INBOX';
			$_SESSION['page'] = 1;

			$timezone = Calculate_Timezone($_POST['timezone_offset']);

			$greyos_mail->Update_Timezone($timezone, $user_id);
			
			if ($greyos_mail->Login($new_acc_id, $_POST['pass']))
			{
				$mail_accounts = $greyos_mail->Get_Mail_Accounts($user_id);
				
				if ($mail_accounts === false)
				{
					$result = $greyos_mail->Get_Error();

					Print_Result($result);
				}

				$msg_list = $greyos_mail->List_Messages($_SESSION['folder'], 1);
				$msg_pagination = $greyos_mail->Message_Pagination();
				$folders = $output->Print_Folders($greyos_mail->Get_Folders());
				
				$result = array('__set_identity_id'=>$new_acc_id,
								'__print_bones'=> true,
								'pm_accounts'=>$mail_accounts,
								'pm_ident_'.$new_acc_id=>$folders,
								'__activate_account'=>$new_acc_id.'::'.$_SESSION['unread_msgs'],
								'__print_add_acc_btn'=>true,
								'__print_msg_list_bones'=> true,							
								'pm_msg_list_pagination'=>$msg_pagination,
								'pm_msg_list'=>$msg_list,
								'__status_msg'=>$_SESSION['email'].' ['.$_SESSION['folder_name'].']');
			}
			else
				$result = $greyos_mail->Get_Error();
		}
		else
			$result = $greyos_mail->Get_Error();

		Print_Result($result);
	}

	if ($_POST['action'] === 'delete_account')
	{
		$greyos_mail = new GREYOS_MAIL(false);

		if ($greyos_mail->Delete_Mail_Account($_POST['identity_id'], $user_id))
		{
			$mail_accounts = $greyos_mail->Get_Mail_Accounts($user_id);

			if ($mail_accounts === false)
			{
				$result = array('__no_accounts_fix'=> true,
								'__print_add_acc'=> true,
								'__status_msg'=>'Multiple accounts webmail!',
								'__set_identity_id'=>0);
			}
			else
			{
				$result = array('__status_msg'=>'You have successfully deleted mail account!', 
								'__delete_account'=>$_POST['identity_id'],
								'__print_add_acc'=> true, 
								'__set_identity_id'=>0);
			}
		}
		else
			$result = $greyos_mail->Get_Error();

		Print_Result($result);
	}

	if ($_POST['action'] === 'logout')
	{
		$greyos_mail = new GREYOS_MAIL();

		if ($greyos_mail->Log_Out($_POST['identity_id']))
		{
			$data = $greyos_mail->Get_Mail_Accounts($user_id, $_POST['identity_id']);
			
			$mail_account[$_POST['identity_id']] = $data;

			$right = '<h4 class="mail_message">Choose another account!</h4>';

			$result = array('__status_msg'=>'You have successfully logged out!', 
							'__update_account'=>$mail_account,
							'pm_right'=>$right,
							'__set_identity_id'=>0);
		}
		else
			$result = $greyos_mail->Get_Error();

		Print_Result($result);
	}

	if ($_POST['action'] === 'login')
	{
		Check_Post_Vars(array('id', 'pass'));

		MAIL_SESSION::Start($_POST['id']);

		$greyos_mail = new GREYOS_MAIL();

		if ($greyos_mail->Login($_POST['id'], $_POST['pass']))
		{
			$_SESSION['folder'] = 'Inbox';

			$msg_list = $greyos_mail->List_Messages($_SESSION['folder'], 1);
			$msg_pagination = $greyos_mail->Message_Pagination();
			$folders = $output->Print_Folders($greyos_mail->Get_Folders());

			$result = array('__set_identity_id'=>$_POST['id'],
							'pm_ident_'.$_POST['id']=>$folders,
							'__activate_account'=>$_POST['id'].'::'.$_SESSION['unread_msgs'],
							'__print_msg_list_bones'=>true,
							'pm_msg_list_pagination'=>$msg_pagination,
							'pm_msg_list'=>$msg_list,
							'__status_msg'=>$_SESSION['email'].' ['.$_SESSION['folder_name'].']');
		}
		else
			$result = $greyos_mail->Get_Error();

		Print_Result($result);
	}

	if ($_POST['action'] === 'search_mail')
	{
		Check_Post_Vars(array('query'));

		$greyos_mail = new GREYOS_MAIL();

		$query = $_POST['query']; 
		$search_result = $greyos_mail->List_Search_Result($query);

		if ($search_result)
		{
			$msg_pagination = $greyos_mail->Message_Pagination();

			$result = array('pm_msg_list_pagination'=>$msg_pagination,
							'pm_msg_list'=>$search_result,
							'__status_msg'=>'Search results for <i>\''.$_POST['query'].'\'</i>');
		}
		else
		{
			$result = array('pm_message'=>'We didn\'t find any messages :(',
							'__status_msg'=>$_SESSION['email'].' ['.$_SESSION['folder_name'].']');
		}

		Print_Result($result);
	}

	if ($_POST['action'] === 'delete_message')
	{
		Check_Post_Vars(array('uid'));
		Check_Session_Vars(array('folder'));

		$greyos_mail = new GREYOS_MAIL();

		$greyos_mail->Delete_Message($_POST['uid'], $_SESSION['folder']);
		$count = count(explode(',', $_POST['uid']));

		if ($count === 1)
			$result['__status_msg'] = 'One conversation have been moved to the Trash.';

		else
			$result['__status_msg'] = $count.' conversations have been moved to the Trash.';

		Print_Result($result);
	}

	if ($_POST['action'] === 'change_flag')
	{
		Check_Post_Vars(array('uid', 'flag'));
		Check_Session_Vars(array('folder', 'page'));

		$greyos_mail = new GREYOS_MAIL();

		$greyos_mail->Set_Flag($_POST['uid'], $_SESSION['folder'], $_POST['flag']);

		$result = array('__status_msg'=>'Message flags changed!');

		Print_Result($result);
	}

	if ($_POST['action'] === 'read_message')
	{
		Check_Post_Vars(array('uid'));
		Check_Session_Vars(array('folder'));

		$greyos_mail = new GREYOS_MAIL();

		$msg = $greyos_mail->Get_Messagae($_POST['uid'], $_SESSION['folder']);

		echo $msg;

		exit;
	}

	if ($_POST['action'] === 'get_preview')
	{
		Check_Post_Vars(array('uid'));
		Check_Session_Vars(array('folder'));
			
		$greyos_mail = new GREYOS_MAIL();

		$msg = $greyos_mail->Get_Messagae_Body($_POST['uid'], $_SESSION['folder']);
		
		$txt = new rcube_html2text($msg);
		
		$preview[$_POST['uid']] = '<div class="pm_msg_preview_text" id="pm_preview_msg_'.$_POST['uid'].'">'.nl2br($txt->get_text()).'</div>';
  		
		$result = array('__update_msg_preview' => $preview);
		
		Print_Result($result);
	}

	if ($_POST['action'] === 'get_message_inline_image')
	{
		Check_Post_Vars(array('uid'));
		Check_Session_Vars(array('folder'));
		
		$greyos_mail = new GREYOS_MAIL();

		$img_url = $greyos_mail->Get_Inline_Image($_POST['uid'], $_SESSION['folder'], $_POST['part'], $user_id, $_POST['identity_id']);
		
		$result = array('inline_image_'.$_POST['part'] => $img_url);
		
		Print_Result($result);
	}

	if ($_POST['action'] === 'folder')
	{
		Check_Post_Vars(array('folder'));

		// reset search query
		unset($_SESSION['last_text_search']);
		unset($_SESSION['search_string']);

		$greyos_mail = new GREYOS_MAIL();

		$_SESSION['folder'] = $_POST['folder'];
		$_SESSION['folder_name'] = GREYOS_MAIL::Get_Folder_Display_Name($_SESSION['folder']);

		$msg_list = $greyos_mail->List_Messages($_POST['folder'], 1);
		$msg_pagination = $greyos_mail->Message_Pagination();


		$result = array('__print_msg_list_bones'=>'true',
						'pm_msg_list_pagination'=>$msg_pagination,
						'pm_msg_list'=>$msg_list,
						'__status_msg'=>$_SESSION['email'].' ['.$_SESSION['folder_name'].']');

		Print_Result($result);
	}

	if ($_POST['action'] === 'folder_pagination')
	{
		Check_Post_Vars(array('page'));

		$greyos_mail = new GREYOS_MAIL();

		$msg_list = $greyos_mail->List_Messages($_SESSION['folder'], $_POST['page']);
		$msg_pagination = $greyos_mail->Message_Pagination();

		$result = array('pm_msg_list_pagination'=>$msg_pagination,
						'pm_msg_list'=>$msg_list,
						'__status_msg'=>$_SESSION['email'].' ['.$_SESSION['folder_name'].']');

		Print_Result($result);
	}

	if ($_POST['action'] === 'destroy_mail_session')
	{
		$user_identities=array();

		$query = 'SELECT `id` 
				  FROM `mail_identities` 
				  WHERE `user_id`='.$_POST['user_id'];

		$result = DB::Execute_SQL_Command($query);

		foreach($result as $ident_id)
			array_push($user_identities, $ident_id['id']);

		$query = 'DELETE 
				  FROM `mail_sessions` 
				  WHERE `identity_id` IN (' . implode(',', array_map('intval', $user_identities)) . ')';

		$result = DB::Execute_SQL_Command($query);

		exit;
	}
?>
