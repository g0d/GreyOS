<?php

    /*

		GreyOS Inc. - GreyOS M@il

		Version: 1.0

		File name: greyos_mail_output.php
		Description: This file contains class for generating HTML output for GreyOS M@il extension.

		Coded by Mirko Lučić (mands)

		GreyOS Inc.
		Copyright © 2013
   
    */
    


	require_once UTILS::Absolute_Path('framework/extensions/php/splash/splash.php');

    class GREYOS_MAIL_OUTPUT
	{

		private $splash;

		public function __construct()
		{

			$this->splash = new SPLASH();

		}

		public function Print_Acc_Actions ()
		{

			$refresh = $this->splash->Div(1, '', array('id'=>'pm_check_inbox', 
														'class'=>'pm_icon_1 pm_refresh_icon',
														'title'=>'Chek new mails'));

			$compose = $this->splash->Div(1, '', array('id'=>'pm_compose_mail', 
														'class'=>'pm_icon_1 pm_compose_icon',
														'title'=>'Compose new mail'));

			$settings = $this->splash->Div(1, '', array('id'=>'pm_acc_setting', 
														'class'=>'pm_icon_1 pm_settings_icon',
														'title'=>'Settings'));

			$logout = $this->splash->Div(1, '', array('id'=>'pm_logout', 
														'class'=>'pm_icon_1 pm_logout_icon',
														'title'=>'Logout'));

			$delete_acc = $this->splash->Div(1, '', array('id'=>'pm_delete_acc', 
															'class'=>'pm_icon_1 pm_delete_icon',
															'title'=>'Delete this account'));

			$div = $this->splash->Div(1, $refresh.$compose.$settings.$logout.$delete_acc, array('class'=>'pm_account_actions'));

			return $div;

		}

		public function Print_Folders ($folders=null)
		{

			$output = self::Print_Acc_Actions ();

			$delimiter = $_SESSION['imap_delimiter'];

			$folder_links = '';


			foreach ($folders as $mailbox)
			{

				$folder=$mailbox['name'];

				if (empty($delimiter))
					$folder_name = rcube_charset::convert($folder, 'UTF7-IMAP');

				else
				{

					$data = explode($delimiter, $folder);

					if (empty($data[1]))
						$folder_name = rcube_charset::convert($folder, 'UTF7-IMAP');

					else
						$folder_name = rcube_charset::convert($data[1], 'UTF7-IMAP');

				}

				if (strtolower($folder) === 'inbox')
				{


					$unread_badge = $this->splash->Div(1, $mailbox['unread'],
									array('id'=>'pm_inbox_unread_badge',
										  'style'=>($mailbox['unread'] === 0 ? 'opacity:0' : 'opacity:1' )));

					$link = $this->splash->Link(1, $folder_name.$unread_badge, 
									array('href'=>'#', 
										'id'=>'pm_active_folder', 
										'class'=>'pm_folder',
										'data-folder'=>$folder));

				}

				else
					$link = $this->splash->Link(1, $folder_name, array('href'=>'#', 
																	'class'=>'pm_folder',
																	'data-folder'=>$folder));

				$folder_links .= $link;


            }

			$output .= $this->splash->Div(1, $folder_links, array('id'=>'pm_folders_menu'));

			return $output;

		}

		public function Print_Msg_List_Header()
		{

			$master_cb_input = $this->splash->Check(1, array('value'=>'None',
														'name'=>'check', 
														'class'=>'pm_msg_cb',
														'id'=>'pm_msg_cb_master'));

			$master_cb_label = $this->splash->Label(1,'&zwnj;', array('for'=>'pm_msg_cb_master'));


			$master_cb = $this->splash->Div(1, $master_cb_input.$master_cb_label, array('class'=>'pm_checkbox'));

			$master_cb_div = $this->splash->Div(1, $master_cb, array('id'=>'msg_list_master_select'));

			$pagination = $this->splash->Div(1, '', array('id'=>'pm_msg_list_pagination'));


			$search_form_input = $this->splash->Input(1, array('type'=>'text', 
														'id'=>'pm_search_input',
														'size'=>'40',
														'placeholder'=>'Search...'));

			$search_form_div = $this->splash->Div(1, $search_form_input, array('id'=>'pm_search_form'));


			$output = $master_cb_div.$search_form_div.$pagination;

			return $output;

		}

		public function Print_Msg_List($headers, $from_to)
		{

			if (count($headers) === 0)
			{

				$output = '<br>No messages found in this mailbox';
				return $output;

			}

			$msgs = array();

			foreach ($headers as $header)
			{


				$cb_input = $this->splash->Check(1, array('value'=>'None',
														'name'=>'check', 
														'class'=>'pm_msg_cb',
														'id'=>'muid_'.$header['uid']));

				$cb_label = $this->splash->Label(1,'&zwnj;', array('for'=>'muid_'.$header['uid']));

				$cb = $this->splash->Div(1, $cb_input.$cb_label, array('class'=>'pm_checkbox'));


				$from_to = $this->splash->Div(1, $header['fromto'], array('class'=>'pm_msg_list pm_fromto'));

				$subject = $this->splash->Div(1, $header['subject'], array('class'=>'pm_msg_list pm_subject',
																			'title'=>str_replace('"', '&quot;', $header['subject'])));

				$date = $this->splash->Div(1, $header['date'], array('class'=>'pm_msg_list pm_msg_list_date'));
				
				/*
				if ($header['ctype'] === 'multipart/mixed')
				$attach = $this->splash->Div(1, '', array('class'=>'pm_msg_list pm_msg_list_attach'));
				*/
				
				$preview =  $this->splash->Div(1, '', array('class'=>'pm_msg_preview',
															'id'=>'pm_msg_preview_'.$header['uid'],
															'data-uid'=>$header['uid'],
															'title'=>'Loading message preview'));
				
				$data = $this->splash->Div(1, $preview.$from_to.$subject.$attach.$date, array('class'=>'pm_msg_list_item_2',
																		'id'=>$header['uid']));

				if ($header['new'])
					$msg = $this->splash->Div(1, $cb.$data, array('class'=>'pm_msg_list_item pm_unread_msg',
																		'id'=>'pm_msg_list_'.$header['uid']));

				else
					$msg = $this->splash->Div(1, $cb.$data, array('class'=>'pm_msg_list_item',
																		'id'=>'pm_msg_list_'.$header['uid']));
				
				$msgs[$header['uid']] = $msg;

			}

			return array_reverse($msgs, true);

		}

		public function Print_Message($headers, $body, $uid, $folder)
		{

			// compose html table
			$table = new html_table(array('cols' => 2, 'class'=>'pm_header_table'));
			
			$subject = $headers['subject']['value'];
			$from = $headers['from']['value'];
			$to = $headers['to']['value'];
			$cc = $headers['cc']['value'];
			$bcc = $headers['bcc']['value'];
			

			$output = '';
			
			if(!empty($subject))
				$subject= $this->splash->Div(1, $subject, array('id'=>'pm_subject_header'));
			
			else
				$subject= $this->splash->Div(1, '(No subject)', array('id'=>'pm_subject_header'));
			
			$from = $this->splash->Div(1, 'From', array('class'=>'pm_tag_from')).
					$this->splash->Div(1, $from, array('class'=>'pm_msg_header_data'));
			
			$from = $this->splash->Div(1, $from, array('class'=>'pm_header_data_row'));
			
			$to = $this->splash->Div(1, 'To', array('class'=>'pm_tag')).
					$this->splash->Div(1, $to, array('class'=>'pm_msg_header_data'));
			
			$to = $this->splash->Div(1, $to, array('class'=>'pm_header_data_row'));
			
			if(!empty($cc))
			{
				
				$cc = $this->splash->Div(1, 'CC', array('class'=>'pm_tag')).
						$this->splash->Div(1, $cc, array('class'=>'pm_msg_header_data'));

				$cc = $this->splash->Div(1, $cc, array('class'=>'pm_header_data_row'));
			
			}
			
			else
				$cc = '';
			
			if(!empty($bcc))
			{
				
				$bcc = $this->splash->Div(1, 'BCC', array('class'=>'pm_tag')).
						$this->splash->Div(1, $bcc, array('class'=>'pm_msg_header_data'));

				$bcc = $this->splash->Div(1, $bcc, array('class'=>'pm_header_data_row'));
			
			}
			
			else
				$bcc = '';
			
			$header = $subject.$from.$to.$cc.$bcc;
			
			if ((count($headers['to']['raw']) > 1)||(!empty($headers['cc']['raw'])))
			{

				$reply_to_all = $headers['from']['raw'].', '.$headers['to']['raw'];

				if (!empty($headers['cc']['raw']))
					$reply_to_all .= ', '.$headers['cc']['raw'];

				$rta_emails = explode (',', $reply_to_all);

				foreach ($rta_emails as $key=>$value)
				{

					if (stristr($value, $_SESSION['email']))
						unset($rta_emails[$key]);

				}

				$reply_to_all = implode(',', $rta_emails);

				$rta = true;

			}

			if (!empty($headers['replyto']['raw']))
				$reply = $headers['replyto']['raw'];

			else
				$reply = $headers['from']['raw'];

			// Back button
			$back_icon = $this->splash->Div(1, 'Back', array('class'=>'pm_icon_2 pm_back_icon'));
			$back = $this->splash->Link(1, $back_icon, array('href'=>'#', 
																'class'=>'pm_msg_list_btn',
																'id'=>'pm_msg_back',
																'data-uid'=>$uid));
			
			// Delete button
			$delete_icon = $this->splash->Div(1, 'Delete', array('class'=>'pm_icon_2 pm_delete_icon2'));
			$delete = $this->splash->Link(1, $delete_icon, array('href'=>'#', 
																'class'=>'pm_msg_list_btn',
																'id'=>'pm_msg_delete',
																'data-uid'=>$uid));
			
			// Reply button
			$reply_icon = $this->splash->Div(1, 'Reply', array('class'=>'pm_icon_2 pm_reply_icon'));
			
			$reply = $this->splash->Link(1, $reply_icon, array('href'=>'#', 
																'class'=>'pm_msg_list_btn',
																'id'=>'msg_reply',
																'data-to'=>$reply));
			
			// Reply to all button
			if ($rta === true)
			{
				
				$rta_icon = $this->splash->Div(1, 'Reply to all', array('class' => 'pm_icon_2 pm_reply_all_icon'));

				$rta = $this->splash->Link(1, $rta_icon, array('href' => '#',
																'class' => 'pm_msg_list_btn',
																'id' => 'msg_reply_to_all',
																'data-to' => $reply_to_all));
			}
			
			else
				$rta = '';
			
			
			$header .= $this->splash->Div(1, $back.$delete.$reply.$rta, array('class' => 'pm_actions'));
			
			$header = $this->splash->Div(1, $header, array('class' => 'pm_header'));
			
			$msg_body = $this->splash->Div(1, $body, array('id' => 'pm_message_body', 'data-uid'=>$uid));
			
			return $header.$msg_body;

		}
		
		public function Print_Msg_Pagination($total_pages, $pagesize, $page)
		{

			//lastpage is = total pages / items per page, rounded up.
			$lastpage = ceil($total_pages/$pagesize);

			if ((int)$lastpage === 0)
				return '';

			$text = '<div id="pm_pgn_info">Page '.$page.' of '.$lastpage.'</div>';

			$pagination = null;


			if((int)$lastpage > 0)
			{

				if(((int)$lastpage > 2)&&((int)$page !== 1))
				{

					$pagination .= $this->splash->Link(1, '&lt;&lt;', array('href'=>'#', 
																			'class'=>((int)$page !== 1 ? 'pm_msg_pgn' : 'disabled' ),
																			'title'=>'Go to first page',
																			'data-page'=>'1'));

				}

				if($page-1)
					$pagination .= $this->splash->Link(1, '&lt;', array('href'=>'#', 
																		'class'=>'pm_msg_pgn', 
																		'data-page'=>$page-1));
				if((int)$page !== (int)$lastpage)
				$pagination .= $this->splash->Link(1, '&gt;', array('href'=>'#', 
																	'class'=>'pm_msg_pgn', 
																	'data-page'=>$page+1));
				
				if(($lastpage > 2)&&((int)$lastpage !== (int)$page))
				{

					$pagination .= $this->splash->Link(1, '&gt;&gt;', array('href'=>'#', 
																		'class'=>((int)$page !== (int)$lastpage ? 'pm_msg_pgn' : 'disabled' ), 
																		'title'=>'Go to last page',
																		'data-page'=>$lastpage));

				}

			}


			$output = $this->splash->Div(1, $pagination, array('class'=>'pm_pagination'));

			return $text.$output;

		}

		public function Print_Login_Form ($data)
		{

			$login_form_input = $this->splash->Input(1, array('type'=>'password', 
														'id'=>'identity_id_'.$data['id'],
														'class'=>'pm_login_psw',
														'data-celement'=>'login_btn_'.$data['id'],
														'size'=>'15',
														'placeholder'=>'Your Password...'));
			$login_form_btn = $this->splash->Button(1, array('type'=>'submit', 
														'id'=>'login_btn_'.$data['id'],
														'class'=>'pm_login_btn',
														'value'=>'Login',
														'data-id'=>$data['id']));
			
			$output = $this->splash->Div(1, $login_form_input.$login_form_btn, array('class'=>'pm_login_form'));
			
			return $output;

		}

		public function Print_Mail_Accounts ($data=false)
		{

			if ($data !== false)
			{

				$header = $this->splash->Div(1, 'Your Mail Accounts', array('class'=>'pm_left_header'));

				$all_mails_icon = $this->splash->Div(1, '', array('class'=>'pm_acc_icon all_mails pull-right'));

				$all_mails_link = $this->splash->Link(1, 'All Mails'.$all_mails_icon, 
								  array('href'=>'#', 
										'class'=>'pm_account', 
										'id'=>'active'));

				$all_mails_box = $this->splash->Div(1, $all_mails_link, array('class'=>'pm_account_box'));

				$mail_accounts = $all_mails_box;

				foreach ($data as $row)
				{

					$mail_accounts .= self::Print_Single_Acc($row);
					
				}

				$accounts_box = $this->splash->Div(1, $mail_accounts, array('class'=>'pm_accounts_menu'));
				$output = $header.$accounts_box;

				return $output;

			}

			else
				return '';

		}
		
		public function Print_Single_Acc ($data)
		{
			
			if($data['password'] !== NULL)
			{
				
				$mail_acc_icon = $this->splash->Div(1, '', array('class'=>'pm_acc_icon '.$data['icon'].' pull-right'));

				$mail_acc_badge = $this->splash->Div(1, $data['unread'], 
								  array('class'=>'pm_ident_unread_badge',
										'id'=>'pm_ident_badge_'.$data['id'],
										'style'=>($data['unread'] === 0 ? 'opacity:0' : 'opacity:1' )));

				$mail_acc_link = $this->splash->Link(1, $data['name'].$mail_acc_badge.$mail_acc_icon, 
								 array('href'=>'#', 
									   'class'=>'pm_account', 
									   'id'=>'active',
									   'title'=>$data['email'],
									   'data-id'=>$data['id']));

				$mail_acc_folders_box = $this->splash->Div(1, '', 
										array('class'=>'pm_account_menu',
											  'id'=>'pm_ident_'.$data['id']));

				$mail_account = $this->splash->Div(1, $mail_acc_link.$mail_acc_folders_box, 
														array('class'=>'pm_account_box',
															'id'=>'pm_acc_'.$data['id']));

				
			}
			
			else
			{
				
				$mail_acc_icon = $this->splash->Div(1, '', array('class' => 'pm_acc_icon ' . $data['icon'] . ' pull-right'));

				$mail_acc_badge = $this->splash->Div(1, $data['unread'], array('class' => 'pm_ident_unread_badge',
					'id' => 'pm_ident_badge_' . $data['id'],
					'style' => ('opacity:0')));

				$mail_acc_link = $this->splash->Link(1, $data['name'] . $mail_acc_badge . $mail_acc_icon, array('href' => '#',
					'class' => 'pm_account',
					'id' => 'inactive',
					'title' => $data['email'],
					'data-id' => $data['id']));

				$mail_acc_folders_box = $this->splash->Div(1, self::Print_Login_Form($data), array('class' => 'pm_account_menu',
					'id' => 'pm_ident_' . $data['id'],
					'style' => 'display:none;'));

				/*
				  $output .= sprintf('<div style="height:20px;">
				  <a href="#" class="pm_acc_settings" id="pm_acc_setting" data-id="%s"
				  style="border-right: 1px solid #C0C0C0;">
				  Settings</a>
				  <a href="#" class="pm_acc_settings" id="pm_delete_acc" data-id="%s">Delete Account</a></div>',
				  $data['id'], $data['id']);
				 */

				$mail_account = $this->splash->Div(1, $mail_acc_link . $mail_acc_folders_box, array('class' => 'pm_account_box',
					'id' => 'pm_acc_'.$data['id']));
				
			}
	
			return $mail_account;
			
		}
		
		
        public function Print_Acc_Settings($identity)
        {

   
			$output = '<div id="pm_acc_settings">';
			$output .= sprintf('<h4 class="pm_message">Mail Account Settings [%s]</h4>', $identity ['email']);

			$output .= '<br><br>Change Acount name:<br>';
			$output .= sprintf('<input type="text" id="acc_set_name" class="settings_form" value="%s">
							<input type="submit" value="Save" id="acc_set_name_sub" class="settings_form"><br><br>', 
							$identity['name']);

			$output .= '<br><br>Change password:<br>
					   <input type="password" id="acc_set_pass" class="settings_form" placeholder="New password">
					   <input type="password" id="acc_set_pass" class="settings_form" placeholder="Confirm password">
					   <input type="submit" value="Save" id="acc_set_pass_sub" class="settings_form"><br><br>';

			$output .= '<br><br>Change mail signature:<br>';
			$output .= sprintf('<textarea type="text" id="acc_set_pass" class="settings_form" value="%s"></textarea>
								<input type="submit" value="Save" id="acc_set_pass_sub" class="settings_form"><br><br>', 
								$identity['signature']);


			$output .= '</div>';

            
            return $output;
            
        }

	}

?>
