<?php

    /*

		GreyOS Inc. - GreyOS M@il

		Version: 1.0

		File name: greyos_mail_class.php
		Description: This file contains class for GreyOS M@il extension.

		Coded by Mirko Lučić (mands)

		GreyOS Inc.
		Copyright © 2013
   
    */



    class GREYOS_MAIL
	{

		//session identificator
		protected $session_id = null;

		//Instance of rcube_imap class.
		public $storage;

		//Instance of rcube_smtp class.
		public $smtp;

		//Instance of rcube_config.
		public $config;

		// Localization texts
		protected $texts;

		// error message
		public $error = null;

		public $output;


		public function __construct($storage_setup = true)
		{

			$this->config = new rcube_config();
			$this->output = new GREYOS_MAIL_OUTPUT();

			if ($storage_setup)
				$this->Storage_Setup();

		}

		public function __destruct()
		{



		}


		public function Get_Error()
		{

			if (isset($_SESSION['mail_error']['message']))
			{

				$result = array('__show_error'=>$_SESSION['mail_error']['message']);
				unset($_SESSION['mail_error']);

			}

			else if (!empty($this->error))
				$result = array('__show_error'=>$this->error);

			else
				$result = array('__show_error'=>'Ups, something really bad happend, can\'t find error msg!');

			return $result;


		}

		public function Storage_Setup()
		{

			// Initialize storage object
			$this->storage = new rcube_imap;

			// set pagesize from config
			$pagesize = $this->config->get('mail_pagesize');

			if (!$pagesize) 
				$pagesize = $this->config->get('pagesize', 50);

			$_SESSION['pagesize'] = $pagesize;

			$this->storage->set_pagesize($pagesize);

			// set class options
			$options = array('auth_type'=> $this->config->get('imap_auth_type', 'check'),
							'auth_cid'=> $this->config->get('imap_auth_cid'),
							'auth_pw'=> $this->config->get('imap_auth_pw'),
							'debug'=> (bool) $this->config->get('imap_debug'),
							'force_caps'=> (bool) $this->config->get('imap_force_caps'),
							'timeout'=> (int) $this->config->get('imap_timeout'),
							'skip_deleted'=> (bool) $this->config->get('skip_deleted'));


			if ($_SESSION['logged_in']) 
			{

				$options['host'] = $_SESSION['storage_host'];
				$options['user'] = $_SESSION['username'];
				$options['port'] = $_SESSION['storage_port'];
				$options['ssl'] = $_SESSION['storage_ssl'];
				$options['password'] = self::Encrypt_Decrypt('decrypt', $_SESSION['password']);
				$_SESSION['imap_host'] = $_SESSION['storage_host'];

			}

			$this->storage->set_options($options);

			//$this->Set_Storage_Prop();

			return true;

		}

		protected function Set_Storage_Prop()
		{

			$storage = $this->storage;

			$storage->set_charset($this->config->get('default_charset', 'UTF-8'));

			if ($default_folders = $this->config->get('default_folders'))
				$storage->set_default_folders($default_folders);

			if (isset($_SESSION['mbox']))
				$storage->set_folder($_SESSION['mbox']);

			if (isset($_SESSION['page']))
				$storage->set_page($_SESSION['page']);

			return true;

		}

		public function Delete_Message ($uid, $folder)
		{

			if ($this->storage->delete_message($uid, $folder))
				return true;

			//error
			else
				return false;

		}

		public function Add_Account($username, $pass, $host, $name, $user_id)
		{

			$host_config = $this->Get_Host($host);

			// No predefined host in config file
			if (!$host_config)
			{

				$this->error = 'Sorry, we don\'t have that host configured';
				return false;

			}

			// Convert username to lowercase. We need to store always the same username 
			$username = mb_strtolower($username);

			/*	
				if (strpos($username, '@'))
				{

					// lowercase domain name
					list($local, $domain) = explode('@', $username);
					$username = $local;

				}
			*/

			$email = $username;
            
			// Try to log in
			if ($this->storage->connect($host_config['imap_host'], $username, $pass, $host_config['imap_port'], $host_config['imap_ssl']))
			{

				$smtp_host = $host_config['smtp_host'];

				$query = 'SELECT * 
						  FROM `mail_identities` 
						  WHERE `email`=\'' . $email . '\' 
						  AND `user_id`='.$user_id;

				$result = ALPHA_CMS::Execute_SQL_Command($query);

				//If there is no acc with same name
				if (count($result) === 0)
				{

					//$folders = $this->Get_Folders(true, false);

					$icon = str_replace('.','_',$host);

					$query = 'INSERT INTO `mail_identities` 
							(`user_id`, `name`, `email`, `imap_host`, `imap_port`, 
							`imap_ssl`, `smtp_host`, `smtp_port`, `smtp_ssl`, `icon`) 
							VALUES 
							( '.$user_id.', \''.$name.'\',\''.$email.'\', \''.$host_config['imap_host'].'\', '.$host_config['imap_port'].',
							\''.$host_config['imap_ssl'].'\', \''.$host_config['smtp_host'].'\', '.$host_config['smtp_port'].', \''
							.$host_config['smtp_ssl'].'\', \''.$icon.'\' )';

					ALPHA_CMS::Execute_SQL_Command($query);

					if (mysqli_affected_rows() === 1)
						return mysqli_insert_id();

					else
					{

						$this->error = 'Database Failure';
                        
						return false;

					}

				}

				else
				{

					$this->error = 'You already have that account in your profile!';
					return false;

				}

			}

			// can't login
			else
			{

				$this->error = 'Wrong username or password';
				return false;

			}

		}

		public static function Check_Ident_Id($id, $user_id)
		{

			$result = ALPHA_CMS::Execute_SQL_Command('SELECT * FROM  `mail_identities` 
													WHERE  `id`='.$id.'
													AND `user_id`=\''.$user_id.'\'');

			if (count($result) !== 1)
				return false;

			else
				return true;

		}

		public function Delete_Mail_Account($id, $user_id)
		{

			$result = ALPHA_CMS::Execute_SQL_Command('DELETE 
													FROM  `mail_identities` 
													WHERE  `id`=\''.$id.'\' 
													AND `user_id`=\''.$user_id.'\'');

			if (mysqli_affected_rows() === 1)
			{

				session_destroy();
				return true;

			}

			else
			{

				$this->error = 'Can\'t delete this account?';
				return false;

			}

		}

		/**
		 *  Get host data from list of configured hosts in config file
		 * 
		 * @param string host name
		 * @return False if not in predefined list or array of host parameters
		 */
		protected function Get_Host($host)
		{

			$config = $this->config->all();

			if (array_key_exists($host, $config['predefined_host']))
			{

				$host = explode('|', $config['predefined_host'][$host]);

				$host_conf['imap_host'] = $host[0];
				$host_conf['imap_ssl'] = $host[1];
				$host_conf['imap_port'] = $host[2];
				$host_conf['smtp_host'] = $host[3];
				$host_conf['smtp_ssl'] = $host[4];
				$host_conf['smtp_port'] = $host[5];

				return $host_conf;

			}

			else
				return false;

		}

		public function Get_Predefined_Hosts ()
		{

			$config = $this->config->all();

			$count = 0;

			foreach ($config['predefined_host'] as $name=>$host)
			{

				$host = explode('|',$host);

				$host_conf[$count]['domain'] = $name;
				$host_conf[$count]['imap_host'] = $host[0];
				$host_conf[$count]['imap_ssl'] = $host[1];
				$host_conf[$count]['imap_port'] = $host[2];
				$host_conf[$count]['smtp_host'] = $host[3];
				$host_conf[$count]['smtp_ssl'] = $host[4];
				$host_conf[$count]['smtp_port'] = $host[5];

				$count++;

			}

			return $host_conf;

		}


		public static function Generate_Random_String($length = 30)
		{

			$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
			$randomString = '';

			for ($i = 0; $i < $length; $i++)
				$randomString .= $characters[rand(0, strlen($characters) - 1)];

			return $randomString;

		}

		function Get_Session_Data($session_name = 'PHPSESSID', $session_save_handler = 'files')
		{

			$session_data = array();

			// we can't continue it without old session id
			if (array_key_exists($session_name, $_COOKIE))
			{
				// save current session id
				$session_id = $_COOKIE[$session_name];
				$old_session_id = session_id();

				// write and close current session
				session_write_close();

				// grab old save handler, and switch to files
				$old_session_save_handler = ini_get('session.save_handler');
				ini_set('session.save_handler', $session_save_handler);

				// now we can switch the session over, capturing the old session name
				$old_session_name = session_name($session_name);
				session_id($session_id);
				session_start();

				// get the desired session data
				$session_data = $_SESSION;

				// close this session, switch back to the original handler, then restart the old session
				session_write_close();
				ini_set('session.save_handler', $old_session_save_handler);
				session_name($old_session_name);
				session_id($old_session_id);
				session_start();

			}

			return $session_data;

		}

		public function Login ($id, $pass)
		{

			$result = ALPHA_CMS::Execute_SQL_Command('SELECT * FROM  `mail_identities` 
													WHERE  `id`='.$id);

			if (count($result) !== 1)
			{

				$this->error = 'Ups! Something is badly wrong in database? id->'.$id;
				return false;

			}

			$login = $result[0];

			//try to login
			if ($this->storage->connect($login['imap_host'], $login['email'], $pass, $login['imap_port'], $login['imap_ssl']))
			{

				ALPHA_CMS::Execute_SQL_Command('UPDATE `mail_identities` SET
											   `password`=\''.$this->Encrypt_Decrypt('encrypt',$pass).'\'
											   WHERE `id`='.$id);

				if (mysqli_affected_rows() !== 1)
				{

						$this->error = 'database failure [update_mail_identities]' . mysqli_info();
						return false;

				}

				$_SESSION['logged_in'] = true;
				$_SESSION['identity_id'] = $id;
				$_SESSION['user_id'] = $login['user_id'];
				$_SESSION['email'] = $login['email'];
				$_SESSION['smtp_host'] = $login['smtp_host'];
				$_SESSION['storage_host'] = $login['imap_host'];
				$_SESSION['username'] = $login['email'];
				$_SESSION['storage_port'] = $login['imap_port'];
				$_SESSION['storage_ssl'] = $login['imap_ssl'];
				$_SESSION['password'] = $this->Encrypt_Decrypt('encrypt',$pass); 
				$_SESSION['login_time'] = time();
				$_SESSION['folder'] = 'INBOX';
				$_SESSION['folder_name'] = 'INBOX';
				$_SESSION['imap_delimiter'] = $this->Get_Folder_Delimiter();
			
				return true;

			}

			else
				return false;

		}

		/**
		 * Get user accounts and save data in session
		 * 
		 * @param int $user_id greyos user id
		 * @return mixed array of accounts or false if there is no user accounts
		 */
		public function Get_Mail_Accounts($user_id = 1, $account_id = null)
		{

			if ($account_id === null)
				$result = ALPHA_CMS::Execute_SQL_Command('SELECT * FROM  `mail_identities` 
														WHERE  `user_id`='.$user_id);
			
			else 
				$result = ALPHA_CMS::Execute_SQL_Command('SELECT * FROM  `mail_identities` 
													WHERE  `id`='.$account_id.'
													AND `user_id`=\''.$user_id.'\'');

			if (count($result) > 0)
			{

				$count = 0;

				foreach ($result as $row)
				{

					if ($row['password'])
					{
						
						$this->Create_Files_Dir ($user_id, $row['id']);
						
						$pass = self::Encrypt_Decrypt('decrypt', $row['password']);

						$options['host'] = $row['imap_host'];
						$options['user'] = $row['email'];
						$options['port'] = $row['imap_port'];
						$options['ssl'] = $row['imap_ssl'];
						$options['password'] = $pass;

						session_write_close();
						MAIL_SESSION::Start($row['id']);

						$_SESSION['logged_in'] = true;
						$_SESSION['email'] = $row['email'];
						$_SESSION['smtp_host'] = $row['smtp_host'];
						$_SESSION['storage_host'] = $row['imap_host'];
						$_SESSION['username'] = $row['email'];
						$_SESSION['storage_port'] = $row['imap_port'];
						$_SESSION['storage_ssl'] = $row['imap_ssl'];
						$_SESSION['password'] = $row['password'];
						$_SESSION['login_time'] = time();
						$_SESSION['folder'] = 'INBOX';
						$_SESSION['folder_name'] = 'INBOX';
						$_SESSION['files_dir'] = $this->Get_Files_Dir_Path ($user_id, $row['id']);
						
						/*
						$temp_storage = new rcube_imap();
						$temp_storage->set_options($options);

						$_SESSION['imap_delimiter'] = $temp_storage->get_hierarchy_delimiter();

						$unread = array('unread'=>$temp_storage->count('INBOX', 'UNSEEN', true));
						$accounts[$count] = array_merge($row, $unread);
						 */
						
						$unread = array('unread'=>0);
						$accounts[$count] = array_merge($row, $unread);
						
						if ($account_id !== null)
							return $this->output->Print_Single_Acc(array_merge($row, $unread));
					

					}

					else
					{

						session_write_close();
						MAIL_SESSION::Start($row['id']);

						session_destroy();
						
						if ($account_id !== null)
							return $this->output->Print_Single_Acc($row);

						$accounts[$count] = $row;

					}

					$count++;

				}

				return $this->output->Print_Mail_Accounts($accounts);

			}

			else
				return false;

		}
			
		private function Create_Files_Dir ($user_id, $identity_id)
		{
			
			$files_folder = ALPHA_CMS::Absolute_Path('framework/extensions/php/greyos_mail/user_files/');
			$user_files_path = $files_folder . $user_id . '/' . $identity_id . '/';

			if (!file_exists($user_files_path))
				mkdir($user_files_path, 0777, true);
			
			return true;

		}
		
		private function Get_Files_Dir_Path ($user_id, $identity_id)
		{
			
			$files_folder = ALPHA_CMS::Absolute_Path('framework/extensions/php/greyos_mail/user_files/');
			$user_files_path = $files_folder . $user_id . '/' . $identity_id . '/';

			return $user_files_path;

		}

		public function Log_Out ($identity_id)
		{

			$result = ALPHA_CMS::Execute_SQL_Command('SELECT * FROM  `mail_identities` 
													WHERE  `id`='.$identity_id.' 
													AND `email`=\''.$_SESSION['email'].'\'');

			// we have only one result as we expected
			if (count($result) === 1)
			{

				ALPHA_CMS::Execute_SQL_Command('UPDATE `mail_identities` SET
												`password` = NULL
												WHERE `id` ='.$identity_id);

				if (mysqli_affected_rows() === 1)
				{

					session_destroy();

					return true;

				}

				else
				{

					$this->error = 'Can\'t log out from this account2';
					return false;

				}

			}

			else
			{

				$this->error = 'Can\'t log out from this account';
				return false;

			}

		}

		public function Get_Folder_Names($folder, $delimiter = null)
		{

			if (empty($delimiter))
			{

				$result['name'] = $folder;
				$result['display_name'] = $folder;

			}

			else
			{

				$data = explode($delimiter, $folder);

				if (empty($data[1]))
				{

					$result['name'] = $folder;
					$result['display_name'] = rcube_charset::convert($data[0], 'UTF7-IMAP');

				}

				else 
				{

					$result['name'] = $folder;
					$result['display_name'] = rcube_charset::convert($data[1], 'UTF7-IMAP');

				}

			}

			return $result;

		}

		public function Store_Folders($identity_id)
		{

			$folders = $this->storage->list_folders_direct();
			$delimiter = $this->Get_Folder_Delimiter();

			$count = 0;

			foreach ($folders as $folder)
			{

				if (in_array('\\Noselect', $this->storage->folder_attributes($folder)) === false)
				{

					$folder_data = $this->Get_Folder_Names($folder, $delimiter);

					$query1 = 'INSERT INTO `mail_folders` 
							(`name`, `display_name`, `unseen_msgs`, `folder_order` , `mail_identities_identity_id`)
							VALUES 
							( \''.$folder_data['name'].'\',  \''.$folder_data['display_name'].'\',  '.$unseen.', '.$count.',  '.$identity_id.')'; 
						$query = 'INSERT INTO `mail_folders` 
						(`name`, `display_name`, `folder_order` , `mail_identities_identity_id`)
						VALUES 
						( \''.$folder_data['name'].'\',  \''.$folder_data['display_name'].'\', '.$count.',  '.$identity_id.')'; 

					ALPHA_CMS::Execute_SQL_Command($query);

					if (mysqli_affected_rows() !== 1)
					{

						$this->error = 'database failure 2';
						return false;

					}

					$count++;

				}

			}

			return true;

		}


		/**
		 * Read folders from server
		 * 
		 * @param bool $forse_direct If set to 'true' read folders directly from IMAP server
		 * @param bool $count_messages If set to 'true' it counts unread messages
		 * @return array with name and count of unread messages
		 */
		public function Get_Folders($forse_direct = false)
		{

			if (!isset($_SESSION['mbox_folders']) || $forse_direct)
			{

				$folders = $this->storage->list_folders_direct();

				$count = 1;

				foreach ($folders as $folder)
				{

					if (in_array('\\Noselect', $this->storage->folder_attributes($folder)) === false)
					{

						if (strtolower($folder) === 'inbox')
						{

							$result[0]['name'] = $folder;

							$result[0]['unread'] = $this->storage->count($folder, 'UNSEEN');

							$_SESSION['unread_msgs'] = $result[0]['unread'];

						}

						else
							$result[$count]['name'] = $folder;

						$count++;

					}

				}

				ksort($result);

				$_SESSION['mbox_folders'] = $result;

				return $result;

			}

			else
			{

				$count = 0;

				foreach ($_SESSION['mbox_folders'] as $folder)
				{

					$result[$count]['name'] = $folder['name'];

					if (strtolower($folder['name']) === 'inbox')
					{

						$result[$count]['unread'] = $this->storage->count($folder, 'UNSEEN');

						$_SESSION['unread_msgs'] = $result[$count]['unread'];

					}

					$count++;

				}

				return $result;

			}

		}

		public function Get_Folder_Delimiter()
		{

			$delimiter = $this->storage->get_hierarchy_delimiter();

			return $delimiter;

		}

		public static function Get_Folder_Display_Name($folder)
		{

			$data = explode($_SESSION['imap_delimiter'], $folder);

			if (empty($data[1]))
				return rcube_charset::convert($data[0], 'UTF7-IMAP');

			else 
				return rcube_charset::convert($data[1], 'UTF7-IMAP');

		}

		/**
		 * List of messages in specific folder
		 * 
		 * @param string folder name
		 * @param string page number
		 * @return array list of messages
		 */
		public function List_Messages($folder, $page = 1)
		{

			if ($_SESSION['search_string'])
				$this->storage->search($folder, $_SESSION['search_string'], $imap_charset);

			$headers = $this->storage->list_messages($folder,$page);

			$count = 0;

			if (!isset($_SESSION[$folder]['fromto']))
			{

				// Grab 3 random samples
				$test_headers = array_rand($headers, 3);

				$test = 0;

				foreach ($test_headers as $tets_header)
				{

					$from = rcube_mime::decode_address_list($test_header->from, 1);

					if ($from[1]['mailto'] == $_SESSION['email'])
						$test ++;

					else 
						$test --;

				}

				if ($test > 0)
					$_SESSION[$folder]['fromto'] = 'To';

				else
					$_SESSION[$folder]['fromto'] = 'From';

			}
			//var_dump($headers); exit;
			foreach ($headers as $header)
			{

				if (empty($header->flags['SEEN']))
					$result[$count]['new'] = true;

				$subject = rcube_mime::decode_mime_string($header->subject);

				if ($_SESSION[$folder]['fromto'] === 'From')
					$result[$count]['fromto'] = $this->Parse_Address_String($header->from, $max = 1, $default_charset = null, $title = null);

				else
					$result[$count]['fromto'] = $this->Parse_Address_String($header->to, $max = 10, $default_charset = null, $title = null);


				$result[$count]['folder'] = $folder;
				$result[$count]['uid'] = $header->uid;
				$result[$count]['subject'] = (empty($subject)) ? $this->Get_Text('nosubject') : $subject;
				$result[$count]['date'] = $this->Format_Date($header->date);
				$result[$count]['ctype'] = $header->ctype;

				$count++;

			}

			$_SESSION['page'] = $page;
			

			return $this->output->Print_Msg_List($result, $_SESSION[$folder]['fromto']);

		}

		public function List_Search_Result($query)
		{

			// reset list_page and old search results
			$this->storage->set_page(1);

			$this->storage->set_search_set(NULL);
			$_SESSION['page'] = 1;

			$search_query = $query;
			$folder = $_SESSION['folder'];
			$headers = 'body';
			$filter = 'ALL';
			$subject = array();

			$search_request = md5($folder.$filter.$search_query);

			// add list filter string
			$search_str = $filter && $filter !== 'ALL' ? $filter : '';

			$_SESSION['search_filter'] = $filter;

			// Check the search string for type of search
			if (preg_match('/^from:.*/i', $search_query))
			{

				list(, $srch) = explode(':', $search_query);
				$subject['from'] = 'HEADER FROM';

			}

			else if (preg_match('/^to:.*/i', $search_query))
			{

				list(, $srch) = explode(':', $search_query);
				$subject['to'] = 'HEADER TO';

			}

			else if (preg_match('/^cc:.*/i', $search_query))
			{

				list(, $srch) = explode(':', $search_query);
				$subject['cc'] = 'HEADER CC';

			}

			else if (preg_match('/^bcc:.*/i', $search_query))
			{

				list(, $srch) = explode(':', $search_query);
				$subject['bcc'] = 'HEADER BCC';

			}

			else if (preg_match('/^subject:.*/i', $search_query))
			{

				list(, $srch) = explode(':', $search_query);
				$subject['subject'] = 'HEADER SUBJECT';

			}

			else if (preg_match('/^body:.*/i', $search_query))
			{

				list(, $srch) = explode(':', $search_query);
				$subject['body'] = 'BODY';

			}

			else if (strlen(trim($search_query)))
			{

				if ($headers)
				{

					foreach (explode(',', $headers) as $header)
					{

						if ($header === 'text')
						{

							// get rid of other headers when searching by 'TEXT'
							$subject = array('text'=> 'TEXT');
							break;

						}

						else
							$subject[$header] = ($header !== 'body' ? 'HEADER ' : '') . strtoupper($header);

					}

				}

				else
				{

					// search in subject by default
					$subject['subject'] = 'HEADER SUBJECT';

				}

			}

			$search = isset($srch) ? trim($srch) : trim($search_query);

			if (!empty($subject))
			{

				$search_str .= str_repeat(' OR', count($subject) - 1);

				foreach ($subject as $sub)
					$search_str .= ' ' . $sub . ' ' . rcube_imap_generic::escape($search);

			}

			$search_str = trim($search_str);

			if ($search_str)
			{

				$this->storage->search($folder, $search_str, $imap_charset);

				//$_SESSION['search'] = $this->storage->get_search_set();
				$_SESSION['last_text_search'] = $query;
				$_SESSION['search_string'] = $search_str;

			}

			$_SESSION['search_request'] = $search_request;


			if ($this->storage->count($folder, 'ALL'))
				return $this->List_Messages($folder,1);

			else
				return false;

		}

		public function Message_Pagination ()
		{

			if (!empty($_SESSION['folder']))
				$folder = $_SESSION['folder'];

			else
				$folder = 'INBOX';

			if ($_SESSION['search_string'])
				$this->storage->search($folder, $_SESSION['search_string'], $imap_charset);


			$total_pages = $this->storage->count($folder, 'ALL');

			$pagesize = $_SESSION['pagesize'];
			$pagesize = $this->config->get('mail_pagesize');

			$page = $_SESSION['page'];

			$result = $this->output->Print_Msg_Pagination($total_pages, $pagesize, $page); 

			return $result;

		}

		public function Get_Message_Headers($headers)
		{

			if (is_object($headers))
			{

				$headers_obj = $headers;
				$headers = get_object_vars($headers_obj);

			}

			else
				$headers_obj = rcube_message_header::from_array($headers);

			// show these headers
			$standard_headers = array('subject', 'from', 'sender', 'to', 'cc', 'bcc', 'replyto',
									'mail-reply-to', 'mail-followup-to', 'date');

			$output_headers = array();

			//var_dump($headers); exit;

			foreach ($standard_headers as $hkey)
			{

				$ishtml = false;
				$raw = null;

				if ($headers[$hkey])
					$value = $headers[$hkey];

				else if ($headers['others'][$hkey])
					$value = $headers['others'][$hkey];

				else
					$value = null;

				if ($value !== null)
				{

					$header_title = $this->Get_Text(preg_replace('/(^mail-|-)/', '', $hkey));

					if ($hkey === 'date')
						$header_value = $this->Format_Date($value, 'D d/m/Y g:i A');

					else if ($hkey === 'replyto')
					{

						if ($headers['replyto'] !== $headers['from'])
						{

							$header_value = $this->Parse_Address_String($value, null, $headers['charset'], $header_title);
							$raw = $this->Parse_Address_String_Raw($value, null, $headers['charset'], $header_title);
							$ishtml = true;

						}

						else
							continue;

					}

					else if ($hkey === 'mail-reply-to')
					{

						if ($headers['mail-replyto'] !== $headers['reply-to'] && $headers['reply-to'] !== $headers['from'])
						{

							$header_value = $this->Parse_Address_String($value, null, $headers['charset'], $header_title);
							$raw = $this->Parse_Address_String_Raw($value, null, $headers['charset'], $header_title);
							$ishtml = true;

						}

						else
							continue;

					}

					else if ($hkey === 'sender')
					{

						if ($headers['sender'] !== $headers['from'])
						{

							$header_value = $this->Parse_Address_String($value, null, $headers['charset'], $header_title);
							$raw = $this->Parse_Address_String_Raw($value, null, $headers['charset'], $header_title);
							$ishtml = true;

						}

						else
							continue;

					}

					else if ($hkey === 'mail-followup-to')
					{

						$header_value = $this->Parse_Address_String($value, null, $headers['charset'], $header_title);
						$raw = $this->Parse_Address_String_Raw($value, null, $headers['charset'], $header_title);
						$ishtml = true;

					}

					else if (in_array($hkey, array('from', 'to', 'cc', 'bcc')))
					{

						$header_value = $this->Parse_Address_String($value, null, $headers['charset'], $header_title);
						$raw = $this->Parse_Address_String_Raw($value, null, $headers['charset'], $header_title);
						$ishtml = true;

					}

					else if ($hkey === 'subject' && empty($value))
						$header_value = $this->Get_Text('nosubject');

					else
						$header_value = trim(rcube_mime::decode_header($value, $headers['charset']));

					$output_headers[$hkey] = array( 'title'=> $header_title,
													'value'=> $header_value,
													'raw'=> $raw,
													'html'=> $ishtml);

				}

			}

			/*
			if (($output_headers['bcc']['value'] === $output_headers['cc']['value'])
					&&($output_headers['cc']['value'] === $output_headers['to']['value']))
			{

				unset ($output_headers['bcc']);
				unset ($output_headers['cc']);

			}

			if (($output_headers['mail-followup-to']['raw'] === $output_headers['replyto']['raw'])
					&&($output_headers['replyto']['raw'] === $output_headers['bcc']['raw'])
					&&($output_headers['bcc']['raw'] === $output_headers['cc']['raw']))
			{

				unset ($output_headers['bcc']);
				unset ($output_headers['replyto']);
				unset ($output_headers['mail-followup-to']);

			}

			if ($output_headers['sender']['value'] === $output_headers['from']['value'])
				unset ($output_headers['sender']);

			if ($output_headers['mail-followup-to']['value'] === $output_headers['replyto']['value'])
				unset ($output_headers['mail-followup-to']);

			if ($output_headers['replyto']['value'] === $output_headers['to']['value'])
				unset ($output_headers['replyto']);
			*/

			return $output_headers;

		}

		// decode address string and re-format it as HTML links 
		protected function Parse_Address_String($input, $max = null, $default_charset = null, $title = null)
		{

			$a_parts = rcube_mime::decode_address_list($input, null, true, $default_charset);

			if (!sizeof($a_parts))
				return $input;

			$c = count($a_parts);
			$j = 0;
			$out = '';
			$allvalues = array();

			foreach ($a_parts as $part)
			{

				$j++;
				$name = $part['name'];
				$mailto = $part['mailto'];
				$string = $part['string'];
				$valid = rcube_utils::check_email($mailto, false);

				// phishing email prevention, e.g. 'valid@email.addr <phishing@email.addr>'
				if ($name && $valid && $name !== $mailto && strpos($name, '@'))
					$name = '';

				if ($valid)
				{

					$address = html::div(array('title'=> $mailto, 'class'=> 'GreyOSContactAddress'), 
					rcube_utils::rep_specialchars_output($name ? $name : $mailto));

				}
				else
				{

					$address = '';
					if ($name)
						$address .= rcube_utils::rep_specialchars_output($name);

					if ($mailto)
						$address = trim($address . ' ' . rcube_utils::rep_specialchars_output($name ? sprintf('<%s>', $mailto) : $mailto));

				}

				$address = html::div('pm_adr', $address);
				$allvalues[] = $address;

				if (!$moreadrs)
					$out .= ($out ? ', ' : '') . $address;

				if ($max && $j === $max && $c > $j)
				{

					if ($linked)
						$moreadrs = $c - $j;

					else
					{

						$out .= '...';
						break;

					}

				}

			}

			return $out;

		}

		// decode address string and re-format it for reply/forward etc... 
		protected function Parse_Address_String_Raw($input, $max = null, $default_charset = null, $title = null)
		{

			$a_parts = rcube_mime::decode_address_list($input, null, true, $default_charset);

			if (!sizeof($a_parts))
				return $input;

			$c = count($a_parts);
			$j = 0;
			$out = '';
			$allvalues = array();

			//var_dump ($a_parts); exit;
			foreach ($a_parts as $part)
			{
				//var_dump ($part); exit;
				//$j++;
				$name = $part['name'];
				$mailto = $part['mailto'];
				$string = $part['string'];
				$valid = rcube_utils::check_email($mailto, false);

				// phishing email prevention, e.g. 'valid@email.addr <phishing@email.addr>'
				if ($name && $valid && $name !== $mailto && strpos($name, '@'))
					$name = '';

				if ($valid)
					$address = rcube_utils::rep_specialchars_output($name ? $name : $mailto).' &lt;'.$mailto.'&gt;';

				else
				{

					$address = '';
					if ($name)
						$address .= rcube_utils::rep_specialchars_output($name);

					if ($mailto)
						$address = trim($address . ' ' . rcube_utils::rep_specialchars_output($name ? 
								sprintf(' &lt;%s&gt;', $mailto) : $mailto));

				}

				//$address = html::span('adr', $address);
				$allvalues[] = $address;

				if (!$moreadrs)
					$out .= ($out ? ', ' : '') . $address;

			}

			return $out;
		}

		/**
		 * Convert the given message part to proper HTML
		 * which can be displayed the message view
		 *
		 * @param object rcube_message_part Message part
		 * @param array  Display parameters array 
		 * @return string Formatted HTML string
		 */
		protected function Get_Part($part, $p = array())
		{

			$data = array('type'=> $part->ctype_secondary, 
						'body'=> $part->body, 
						'id'=> $part->mime_id, 
						'safe'=> true, 
						'plain'=> false, 
						'inline_html'=> true) + $p;

			// convert html to text/plain
			if ($data['type'] === 'html' && $data['plain'])
			{

				$txt = new rcube_html2text($data['body'], false, true);
				$body = $txt->get_text();
				$part->ctype_secondary = 'plain';

			}

			// text/html
			else if ($data['type'] === 'html')
			{

				$body = $this->Wash_Html($data['body'], $data, $part->replaces);
				$part->ctype_secondary = $data['type'];

			}

			// text/enriched
			else if ($data['type'] === 'enriched')
			{

				$body = rcube_enriched::to_html($data['body']);
				$body = $this->Wash_Html($body, $data, $part->replaces);
				$part->ctype_secondary = 'html';

			}

			else
			{

				// assert plaintext
				$body = $part->body;
				$part->ctype_secondary = $data['type'] = 'plain';

			}

			// free some memory (hopefully)
			unset($data['body']);

			// plaintext postprocessing
			if ($part->ctype_secondary === 'plain')
				$body = $this->Plain_Body($body, $part->ctype_parameters['format'] === 'flowed');

			return $body;

		}
		
		public function Get_Inline_Image($uid, $folder, $part_id, $user_id, $identity_id)
		{
			
			$msg = new greyos_message($uid, $this->storage, $folder, $this->config);
			$part = $msg->mime_parts[$part_id];
			
			$img_path = $_SESSION['files_dir'].$uid.'_'.$part->filename;
			
			//$image = new rcube_image($img_path);
			//$props = $image->props();
			
			$fp = fopen($img_path, 'w');

			$msg->get_part_content($part_id, $fp);
			
			$link = '/framework/extensions/php/greyos_mail/user_files/'.$user_id.'/'.$identity_id.'/'.$uid.'_'.$part->filename;
			
			return $link;
			
		}
		
		/**
		 * Get mail body prepared for html view
		 * 
		 * @param int $uid
		 * @param string $folder
		 * @return string body of message
		 */
		public function Get_Messagae($uid, $folder)
		{

			$msg = new greyos_message($uid, $this->storage, $folder, $this->config);

			if (!is_array($msg->parts) && empty($msg->body))
				return false;

			$body = null;
			
			//if (isset($_SESSION['msg_body_'.$uid]))
			//	$body = 'opal'.$_SESSION['msg_body_'.$uid];
			
			//else if(!empty($msg->parts)) 
			
			if(!empty($msg->parts))
			{

				foreach ($msg->parts as $i=> $part) 
				{

					if ($part->type === 'content') 
					{

						if ($part->realtype)
						{

							if ($part->realtype === 'multipart/encrypted' || $part->realtype === 'application/pkcs7-mime')
								$body .= 'Encrypted message...<hr>';

							continue;

						}

						if (empty($part->ctype_parameters) || empty($part->ctype_parameters['charset']))
							$part->ctype_parameters['charset'] = $msg->headers->charset;

						// fetch part if not available
						if (!isset($part->body))
							$part->body = $msg->get_part_content($part->mime_id);

						// extract headers from message/rfc822 parts
						if ($part->mimetype === 'message/rfc822')
						{

							$msgpart = rcube_mime::parse_message($part->body);

							if (!empty($msgpart->headers))
								$part = $msgpart;

						}

						$body .= $this->Get_Part($part, array('safe'=> true));

						if ($part->ctype_secondary === 'html')
							$body = $this->Html_For_Inline($body, 'id_greyos_msg', 'rcmBody', $attrs, $safe_mode);

					}

				}

			}

			if (!empty($msg->attachments))
			{

				$body .= '<hr></strong>Attachments:</strong><br />';
				foreach ($msg->attachments as $attach)
				{
					
	
					$body .= $attach->filename.'<br />';
					
					/*
					$fp = fopen($_SESSION['files_dir'].$attach->filename, 'w');
					
					$msg->get_part_content($attach->mime_id, $fp);
				
					fclose($fp);
					*/
					
				}

			}

			$this->Set_Flag($uid, $folder, 'SEEN');

			$headers = $this->Get_Message_Headers($msg->headers);

			$message = $this->output->Print_Message($headers, $body, $uid, $folder);

			return $message;

		}
		
		public function Get_Messagae_Body($uid, $folder)
		{

			//if (isset($_SESSION['msg_body_'.$uid]))
			//	return $_SESSION['msg_body_'.$uid];
			
			$msg = new greyos_message($uid, $this->storage, $folder, $this->config);

			if (!is_array($msg->parts) && empty($msg->body))
				return false;

			$body = null;

			if (!empty($msg->parts)) 
			{

				foreach ($msg->parts as $i=> $part) 
				{

					if ($part->type === 'content') 
					{

						if ($part->realtype)
						{

							if ($part->realtype === 'multipart/encrypted' || $part->realtype === 'application/pkcs7-mime')
								$body .= 'Encrypted message...<hr>';

							continue;

						}

						if (empty($part->ctype_parameters) || empty($part->ctype_parameters['charset']))
							$part->ctype_parameters['charset'] = $msg->headers->charset;

						// fetch part if not available
						if (!isset($part->body))
							$part->body = $msg->get_part_content($part->mime_id);

						// extract headers from message/rfc822 parts
						if ($part->mimetype === 'message/rfc822')
						{

							$msgpart = rcube_mime::parse_message($part->body);

							if (!empty($msgpart->headers))
								$part = $msgpart;

						}

						$body .= $this->Get_Part($part, array('safe'=> true));

						if ($part->ctype_secondary === 'html')
							$body = $this->Html_For_Inline($body, 'id_greyos_msg', 'rcmBody', $attrs, $safe_mode);

					}

				}

			}
			
			//$_SESSION['msg_body_'.$uid] = $body;
			
			return $body;

		}

		/**
		 * Set message flag to one or several messages
		 *
		 * @param mixed   $uids       Message UIDs as array or comma-separated string, or '*'
		 * @param string  $folder     Folder name
		 * @param string  $flag       Flag to set: SEEN, UNDELETED, DELETED, RECENT, ANSWERED, DRAFT, MDNSENT
		 *
		 * @return boolean  Operation status
		 */
		public function Set_Flag ($uids, $folder, $flag)
		{

			if ($this->storage->set_flag($uids, $flag, $folder))
				return true;

			else
				return false;

		}

		/**
		 * Handle links and citation marks in plain text message
		 *
		 * @param string  Plain text string
		 * @param boolean Text uses format=flowed
		 *
		 * @return string Formatted HTML string
		 */
		private function Plain_Body($body, $flowed = false)
		{

			// make links and email-addresses clickable
			$replacer = new rcube_string_replacer;

			// search for patterns like links and e-mail addresses and replace with tokens
			$body = $replacer->replace($body);

			// split body into single lines
			$body = preg_split("/\r?\n/", $body);
			$quote_level = 0;
			$last = -1;

			// find/mark quoted lines...
			for ($n = 0, $cnt = count($body); $n < $cnt; $n++)
			{

				if ($body[$n][0] === '>' && preg_match('/^(>+ {0,1})+/', $body[$n], $regs))
				{

					$q = substr_count($regs[0], '>');
					$body[$n] = substr($body[$n], strlen($regs[0]));

					if ($q > $quote_level)
					{

						$body[$n] = $replacer->get_replacement($replacer->add(str_repeat('<blockquote>', $q - $quote_level))) . $body[$n];
						$last = $n;

					}

					else if ($q < $quote_level)
					{

						$body[$n] = $replacer->get_replacement($replacer->add(
												str_repeat('</blockquote>', $quote_level - $q))) . $body[$n];
						$last = $n;

					}

					else if ($flowed)
					{

						// previous line is flowed
						if (isset($body[$last]) && $body[$n] && $body[$last][strlen($body[$last]) - 1] === ' ')
						{

							// merge lines
							$body[$last] .= $body[$n];
							unset($body[$n]);

						}

						else
							$last = $n;

					}

				}

				else
				{

					$q = 0;

					if ($flowed)
					{

						// sig separator - line is fixed
						if ($body[$n] === '-- ')
							$last = $last_sig = $n;

						else
						{

							// remove space-stuffing
							if ($body[$n][0] === ' ')
								$body[$n] = substr($body[$n], 1);

							// previous line is flowed?
							if (isset($body[$last]) && $body[$n] && $last !== $last_sig && 
									$body[$last][strlen($body[$last]) - 1] === ' ')
							{

								$body[$last] .= $body[$n];
								unset($body[$n]);

							}

							else
								$last = $n;

						}

						if ($quote_level > 0)
							$body[$last] = $replacer->get_replacement($replacer->add(str_repeat('</blockquote>', $quote_level))) 
								. $body[$last];

					}

					else if ($quote_level > 0)
						$body[$n] = $replacer->get_replacement($replacer->add(str_repeat('</blockquote>', $quote_level))) . $body[$n];

				}

				$quote_level = $q;

			}

			$body = join("\n", $body);

			// quote plain text 
			$table = get_html_translation_table(HTML_SPECIALCHARS);
			unset($table['?']);

			$body = strtr($body, $table);

			// colorize signature (up to <sig_max_lines> lines)
			$len = strlen($body);
			$sig_max_lines = $this->config->get('sig_max_lines', 15);

			while (($sp = strrpos($body, "-- \n", $sp ? -$len + $sp - 1 : 0)) !== false)
			{

				if ($sp === 0 || $body[$sp - 1] === "\n")
				{

					// do not touch blocks with more that X lines
					if (substr_count($body, "\n", $sp) < $sig_max_lines)
						$body=substr($body, 0, max(0, $sp)).'<span class="sig">' . substr($body, $sp) . '</span>';

					break;

				}

			}

			// insert url/mailto links and citation tags
			$body = $replacer->resolve($body);

			$body = nl2br($body);

			return $body;

		}

	    //modify a HTML message that it can be displayed inside a HTML page 
		public function Html_For_Inline($body, $container_id, $body_id = '', &$attributes = null, $allow_remote = false)
		{

			$last_style_pos = 0;
			$cont_id = $container_id . ($body_id ? ' div.' . $body_id : '');

			// find STYLE tags
			while (($pos = stripos($body, '<style', $last_style_pos)) && ($pos2 = stripos($body, '</style>', $pos)))
			{

				$pos = strpos($body, '>', $pos) + 1;
				$len = $pos2 - $pos;

				// replace all css definitions with #container [def]
				$styles = substr($body, $pos, $len);
				$styles = $this->Mod_Css_Styles($styles, $cont_id, $allow_remote);

				$body = substr_replace($body, $styles, $pos, $len);
				$last_style_pos = $pos2 + strlen($styles) - $len;

			}

			// modify HTML links to open a new window if clicked
			$GLOBALS['rcmail_html_container_id'] = $container_id;

			$body = preg_replace_callback('/<(a|link|area)\s+([^>]+)>/Ui', 'rcmail_alter_html_link', $body);
			unset($GLOBALS['rcmail_html_container_id']);

			$body = preg_replace(array(	'/(<!DOCTYPE[^>]*>)/i',
										'/(<\?xml[^>]*>)/i',
										'/(<\/?html[^>]*>)/i',
										'/(<\/?head[^>]*>)/i',
										'/(<title[^>]*>.*<\/title>)/Ui',
										'/(<\/?meta[^>]*>)/i',
										'/<\?/',
										'/\?>/',
										'/<body([^>]*)>/i',
										'/<\/body>/i'), 
								  array('<!--\\1-->',
										'<!--\\1-->',
										'<!--\\1-->',
										'<!--\\1-->',
										'<!--\\1-->',
										'<!--\\1-->',
										'&lt;?',
										'?&gt;',
										'<div class="' . $body_id . '"\\1>',
										'</div>')
										, $body);

			$attributes = array();

			// Handle body attributes that doesn't play nicely with div elements
			$regexp = '/<div class="' . preg_quote($body_id, '/') . '"([^>]*)/';

			if (preg_match($regexp, $body, $m))
			{

				$attrs = $m[0];

				// Get bgcolor, we'll set it as background-color of the message container
				if ($m[1] && preg_match('/bgcolor=["\']*([a-z0-9#]+)["\']*/', $attrs, $mb))
				{

					$attributes['background-color'] = $mb[1];
					$attrs = preg_replace('/bgcolor=["\']*([a-z0-9#]+)["\']*/', '', $attrs);

				}

				// Get background, we'll set it as background-image of the message container
				if ($m[1] && preg_match('/background=["\']*([^"\'>\s]+)["\']*/', $attrs, $mb))
				{

					$attributes['background-image'] = 'url(' . $mb[1] . ')';
					$attrs = preg_replace('/background=["\']*([^"\'>\s]+)["\']*/', '', $attrs);

				}

				if (!empty($attributes))
					$body = preg_replace($regexp, rtrim($attrs), $body, 1);

				// handle body styles related to background image
				if ($attributes['background-image'])
				{

					// get body style
					if (preg_match('/#' . preg_quote($cont_id, '/') . '\s+\{([^}]+)}/i', $body, $m))
					{

						// get background related style
						if (preg_match_all('/(background-position|background-repeat)\s*:\s*([^;]+);/i', $m[1], $ma, PREG_SET_ORDER))
						{

							foreach ($ma as $style)
								$attributes[$style[1]] = $style[2];

						}

					}

				}

			}

			// make sure there's 'rcmBody' div, we need it for proper css modification
			else
				$body = '<div class="' . $body_id . '">' . $body . '</div>';

			return $body;

		}

		protected function Mod_Css_Styles($source, $container_id, $allow_remote = false)
		{

			return rcube_utils::mod_css_styles($source, $container_id, $allow_remote);

		}

		/**
		 * Cleans up the given message HTML Body (for displaying)
		 *
		 * @param string HTML
		 * @param array  Display parameters 
		 * @param array  CID map replaces (inline images)
		 * @return string Clean HTML
		 */
		protected function Wash_Html($html, $p, $cid_replaces = null)
		{

			//return $html;
			//var_dump ()
			$p += array('safe'=> true, 
						'inline_html'=> true);

			$meta = '<meta http-equiv="Content-Type" content="text/html; charset=' . RCMAIL_CHARSET . '" />';

			// remove old meta tag and add the new one, making sure
			// that it is placed in the head (#1488093)
			$html = preg_replace('/<meta[^>]+charset=[a-z0-9-_]+[^>]*>/Ui', '', $html);
			$html = preg_replace('/(<head[^>]*>)/Ui', '\\1' . $meta, $html, -1, $rcount);

			if (!$rcount)
				$html = '<head>' . $meta . '</head>' . $html;

			// clean HTML with washhtml by Frederic Motte
			$wash_opts = array(	'show_washed'=> false,
								'allow_remote'=> $p['safe'],
								'blocked_src'=> "./program/resources/blocked.gif",
								'charset'=> RCMAIL_CHARSET,
								'cid_map'=> $cid_replaces,
								'html_elements'=> array('body'));

			if (!$p['inline_html'])
				$wash_opts['html_elements'] = array('html', 'head', 'title', 'body');

			if ($p['safe'])
			{

				$wash_opts['html_elements'][] = 'link';
				$wash_opts['html_attribs'] = array('rel', 'type');

			}

			// overwrite washer options with options from plugins
			if (isset($p['html_elements']))
				$wash_opts['html_elements'] = $p['html_elements'];

			if (isset($p['html_attribs']))
				$wash_opts['html_attribs'] = $p['html_attribs'];

			// initialize HTML washer
			$washer = new rcube_washtml($wash_opts);

			// Remove non-UTF8 characters (#1487813)
			$html = rcube_charset::clean($html);

			$html = $washer->wash($html);

			return $html;

		}

		/**
		 * Encrypt or decrypt given string
		 * 
		 * @param type $action encrypt or decrypt
		 * @param type $string 
		 * @return string encrypted or decrypted string
		 */
		public static function Encrypt_Decrypt($action, $string)
		{

			$output = false;

			$encrypt_method = 'AES-256-CBC';
			$secret_key = 'GreyOS M@il secret key';
			$secret_iv = 'GreyOS M@il secret iv';

			// hash
			$key = hash('sha256', $secret_key);
			$iv = hash('sha256', $secret_iv);

			if ($action === 'encrypt')
			{

				$output = openssl_encrypt($string, $encrypt_method, $key, $iv);
				$output = base64_encode($output);

			}

			else if ($action === 'decrypt')
				$output = $decryptedMessage = openssl_decrypt(base64_decode($string), $encrypt_method, $key, $iv);

			return $output;

		}

		/**
		 * Parse a human readable string for a number of bytes.
		 * 
		 * @param int $bytes
		 * @param int $precision
		 * @return string formated bytes
		 */
		protected function Format_Bytes($bytes, $precision = 2) 
		{ 

			$units = array('B', 'KB', 'MB', 'GB'); 

			$bytes = max($bytes, 0); 
			$pow = floor(($bytes ? log($bytes) : 0) / log(1024)); 
			$pow = min($pow, count($units) - 1); 

			$bytes /= pow(1024, $pow);
			// $bytes /=(1 << (10 * $pow)); 

			return round($bytes, $precision) . ' ' . $units[$pow]; 

		} 

		public function Update_Timezone($timezone, $user_id)
		{

			ALPHA_CMS::Execute_SQL_Command('UPDATE `mail_identities` SET
											`timezone`=\''.$timezone.'\'
											WHERE `user_id`='.$user_id);

			return true;

		}


		public function Get_Mail_Timezone($ident_id)
		{

			$query = 'SELECT `timezone` 
					  FROM `mail_identities` 
					  WHERE `id`='.$ident_id;

			$result = ALPHA_CMS::Execute_SQL_Command($query);

			if (count($result)>0)
				return $result[0]['timezone'];

			else
				return false;

		}

		 /**
		 * Convert the given date to a human readable form
		 * This uses the date formatting properties from config
		 *
		 * @param mixed  Date representation (string, timestamp or DateTime object)
		 * @param string Date format to use
		 * @param bool   Enables date convertion according to user timezone
		 *
		 * @return string Formatted date string
		 */
		protected function Format_Date($date, $format = null, $convert = false)
		{

			if (is_object($date) && is_a($date, 'DateTime')) 
				$timestamp = $date->format('U');

			else 
			{

				if (!empty($date)) 
					$timestamp = rcube_utils::strtotime($date);

				if (empty($timestamp)) 
					return '';

				try 
				{

					$date = new DateTime('@'.$timestamp);

				}

				catch (Exception $e) 
				{

					return '';

				}

			}

			if ($convert) 
			{

				try 
				{

					// convert to the right timezone
					$stz = date_default_timezone_get();
					$tz = new DateTimeZone($_SESSION['mail_timezone']);
					$date->setTimezone($tz);
					date_default_timezone_set($tz->getName());

					$timestamp = $date->format('U');

				}

				catch (Exception $e) 
				{

					return '';

				}

			}

			// define date format depending on current time
			if (!$format) 
			{

				$now = time();
				$now_date = getdate($now);
				$today_limit = mktime(0, 0, 0, $now_date['mon'], $now_date['mday'], $now_date['year']);
				$week_limit = mktime(0, 0, 0, $now_date['mon'], $now_date['mday']-6, $now_date['year']);
				$pretty_date = $this->config->get('prettydate');

				if ($pretty_date && $timestamp > $today_limit && $timestamp < $now) 
				{

					$format = $this->config->get('date_today', $this->config->get('time_format', 'H:i'));
					$today = true;

				}

				else if ($pretty_date && $timestamp > $week_limit && $timestamp < $now) 
					$format = $this->config->get('date_short', 'D H:i');

				else 
					$format = $this->config->get('date_long', 'Y-m-d H:i');

			}

			// strftime() format
			if (preg_match('/%[a-z]+/i', $format)) 
			{

				$format = strftime($format, $timestamp);

				if ($stz) 
					date_default_timezone_set($stz);

				return $today ? ($this->Get_Text('today') . ' ' . $format) : $format;

			}

			// parse format string manually in order to provide localized weekday and month names
			$out = '';

			for ($i = 0; $i<strlen($format); $i++) 
			{

				if ($format[$i] === '\\')  // skip escape chars
					continue;

				// write char "as-is"
				if (($format[$i] === ' ') || ($format[$i-1] === '\\')) 
					$out .= $format[$i];

				// weekday (short)
				else if ($format[$i] === 'D') 
					$out .= $this->Get_Text(strtolower(date('D', $timestamp)));

				// weekday long
				else if ($format[$i] === 'l') 
					$out .= $this->Get_Text(strtolower(date('l', $timestamp)));

				// month name (short)
				else if ($format[$i] === 'M') 
					$out .= $this->Get_Text(strtolower(date('M', $timestamp)));

				// month name (long)
				else if ($format[$i] === 'F') 
					$out .= $this->Get_Text('long'.strtolower(date('M', $timestamp)));

				else if ($format[$i] === 'x') 
					$out .= strftime('%x %X', $timestamp);

				else 
					$out .= date($format[$i], $timestamp);

			}

			if ($today) 
			{

				$label = $this->Get_Text('today');

				// replcae $ character with "Today" label 
				if (strpos($out, '$') !== false) 
					$out = preg_replace('/\$/', $label, $out, 1);

				else 
					$out = $label . ' ' . $out;

			}

			if ($stz) 
				date_default_timezone_set($stz);

			return $out;

		}

		public function Get_Text($attrib, $domain = null)
		{

			// load localization files if not done yet
			if (empty($this->texts))
				$this->Load_Language();

			// extract attributes
			if (is_string($attrib))
				$attrib = array('name'=> $attrib);

			$name = $attrib['name'] ? $attrib['name'] : '';

			// attrib contain text values: use them from now
			if (($setval = $attrib[strtolower($_SESSION['language'])]) || ($setval = $attrib['en_us']))
				$this->texts[$name] = $setval;

			// check for text with domain
			if ($domain && ($text = $this->texts[$domain . '.' . $name]))
			{

			}

			// text does not exist
			else if (!($text = $this->texts[$name]))
				return "[$name]";

			// replace vars in text
			if (is_array($attrib['vars']))
			{

				foreach ($attrib['vars'] as $var_key=> $var_value)
					$text = str_replace($var_key[0] !== '$' ? '$' . $var_key : $var_key, $var_value, $text);

			}

			// format output
			if (($attrib['uppercase'] && strtolower($attrib['uppercase'] === 'first')) || $attrib['ucfirst'])
				return ucfirst($text);

			else if ($attrib['uppercase'])
				return mb_strtoupper($text);

			else if ($attrib['lowercase'])
				return mb_strtolower($text);

			return strtr($text, array('\n'=> "\n"));

		}

		/**
		 * Check if the given text label exists
		 *
		 * @param string  $name       Label name
		 * @param string  $domain     Label domain (plugin) name or '*' for all domains
		 * @param string  $ref_domain Sets domain name if label is found
		 *
		 * @return boolean True if text exists (either in the current language or in en_US)
		 */
		public function Text_Exists($name, $domain = null, &$ref_domain = null)
		{

			// load localization files if not done yet
			if (empty($this->texts))
				$this->Load_Language();

			if (isset($this->texts[$name]))
			{

				$ref_domain = '';
				return true;

			}

			// any of loaded domains (plugins)
			if ($domain === '*')
			{

				foreach ($this->plugins->loaded_plugins() as $domain)
				{

					if (isset($this->texts[$domain . '.' . $name]))
					{

						$ref_domain = $domain;
						return true;

					}

				}

			}

			// specified domain
			else if ($domain)
			{

				$ref_domain = $domain;
				return isset($this->texts[$domain . '.' . $name]);

			}

			return false;

		}

		/**
		 * Load a localization package
		 *
		 * @param string Language ID
		 * @param array  Additional text labels/messages
		 */
		public function Load_Language($lang = null, $add = array())
		{

			$lang = $this->Language_Prop(($lang ? $lang : $_SESSION['language']));

			// load localized texts
			if (empty($this->texts) || $lang !== $_SESSION['language'])
			{

				$this->texts = array();

				// handle empty lines after closing PHP tag in localization files
				ob_start();

				// get english labels (these should be complete)
				@include(RCUBE_LOCALIZATION_DIR . 'en_US/labels.inc');
				@include(RCUBE_LOCALIZATION_DIR . 'en_US/messages.inc');

				if (is_array($labels))
					$this->texts = $labels;

				if (is_array($messages))
					$this->texts = array_merge($this->texts, $messages);

				// include user language files
				if ($lang !== 'en' && $lang !== 'en_US' && is_dir(RCUBE_LOCALIZATION_DIR . $lang))
				{

					include_once(RCUBE_LOCALIZATION_DIR . $lang . '/labels.inc');
					include_once(RCUBE_LOCALIZATION_DIR . $lang . '/messages.inc');

					if (is_array($labels))
						$this->texts = array_merge($this->texts, $labels);

					if (is_array($messages))
						$this->texts = array_merge($this->texts, $messages);

				}

				ob_end_clean();

				$_SESSION['language'] = $lang;

			}

			// append additional texts (from plugin)
			if (is_array($add) && !empty($add))
				$this->texts += $add;

		}

		/**
		 * Check the given string and return a valid language code
		 *
		 * @param string Language code
		 *
		 * @return string Valid language code
		 */
		protected function Language_Prop($lang)
		{

			static $rcube_languages, $rcube_language_aliases;

			// user HTTP_ACCEPT_LANGUAGE if no language is specified
			if (empty($lang) || $lang === 'auto')
			{

				$accept_langs = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
				$lang = str_replace('-', '_', $accept_langs[0]);

			}

			if (empty($rcube_languages))
				@include(RCUBE_LOCALIZATION_DIR . 'index.inc');

			// check if we have an alias for that language
			if (!isset($rcube_languages[$lang]) && isset($rcube_language_aliases[$lang]))
				$lang = $rcube_language_aliases[$lang];

			// try the first two chars
			else if (!isset($rcube_languages[$lang]))
			{

				$short = substr($lang, 0, 2);

				// check if we have an alias for the short language code
				if (!isset($rcube_languages[$short]) && isset($rcube_language_aliases[$short]))
					$lang = $rcube_language_aliases[$short];

				// expand 'nn' to 'nn_NN'
				else if (!isset($rcube_languages[$short]))
					$lang = $short . '_' . strtoupper($short);

			}

			if (!isset($rcube_languages[$lang]) || !is_dir(RCUBE_LOCALIZATION_DIR . $lang))
				$lang = 'en_US';

			return $lang;

		} 

		/*
		 * Read directory program/localization and return a list of available languages
		 *
		 * @return array List of available localizations
		 */
		public function List_Languages()
		{

			static $sa_languages = array();

			if (!sizeof($sa_languages))
			{

				@include(RCUBE_LOCALIZATION_DIR . 'index.inc');

				if ($dh = @opendir(RCUBE_LOCALIZATION_DIR))
				{

					while (($name = readdir($dh)) !== false)
					{

						if ($name[0] === '.' || !is_dir(RCUBE_LOCALIZATION_DIR . $name))
							continue;

						if ($label = $rcube_languages[$name])
							$sa_languages[$name] = $label;

					}

					closedir($dh);

				}

			}

			return $sa_languages;

		}

	}

?>
