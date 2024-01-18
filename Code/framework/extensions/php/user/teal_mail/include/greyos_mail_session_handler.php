<?php

    /*

		GreyOS Inc. - GreyOS M@il

		Version: 1.0

		File name: greyos_mail_session_handler.php
		Description: This file contains class for GreyOS M@il custom session handler.

		Coded by Mirko Lučić (mands)

		GreyOS Inc.
		Copyright © 2013
   
    */
    


	class MAIL_SESSION
	{

		public function __construct($id)
		{

			global $identity_id;
			$identity_id=$id;

			session_set_save_handler(array(&$this, "_open"), 
									array(&$this, "_close"), 
									array(&$this, "_read"), 
									array(&$this, "_write"), 
									array(&$this, "_destroy"), 
									array(&$this, "_clean"));

		}

		public static function Start($id, $limit = 0, $path = '/', $domain = null, $secure = null)
		{

			global $identity_id;
			$identity_id=$id;

			session_start();

		}

		static protected function Prevent_Hijacking()
		{
			if (!isset($_SESSION['IPaddress']) || !isset($_SESSION['userAgent']))
				return false;

			if ($_SESSION['IPaddress'] != $_SERVER['REMOTE_ADDR'])
				return false;

			if ( $_SESSION['userAgent'] != $_SERVER['HTTP_USER_AGENT'])
				return false;

			return true;
		}

		public function _open()
		{

			return true;

		}

		public function _close()
		{

			return true;

		}

		public function _read($id)
		{

			global $identity_id;

			$sql = 'SELECT data
					FROM mail_sessions
					WHERE identity_id=\''.$identity_id.'\'
					AND id=\''.$id.'\'';

			if ($result = DB::Execute_SQL_Command($sql))
			{

				if (count($result)>0)
					return $result[0][0];

			}

			return '';

		}

		public function _write($id, $data)
		{   

			global $identity_id;

			$access = time();

			// first checks if there is a session with this id
			$result = DB::Execute_SQL_Command('SELECT * FROM mail_sessions
														WHERE identity_id = \''.$identity_id.'\'
														AND id=\''.$id.'\'');

			// if there is
			if (count($result)>0) 
			{

				$sql ='UPDATE `mail_sessions` SET
						`access` = \''.$access.'\',
						`data` = \''.$data.'\'
						WHERE
						`identity_id` = \''.$identity_id.'\' 
						AND `id` = \''.$id.'\'';

				DB::Execute_SQL_Command($sql);

				// if anything happened
				if (mysqli_affected_rows()) 
					return true;

			} 

			// if this session id is not in the database
			else 
			{

				// insert a new record
				$sql = 'INSERT	INTO	`mail_sessions` 
						(`id`, `identity_id`, `access`, `data`)
						VALUES  
						(\''.$id.'\', \''.$identity_id.'\', \''.$access.'\', \''.$data.'\')';

				DB::Execute_SQL_Command($sql);

				// if anything happened
				if (mysqli_affected_rows())
					return '';

			}

			// if something went wrong, return false
			return false;

		}

		public function _destroy($id)
		{

			global $identity_id;

			$sql = 'DELETE
					FROM   `mail_sessions`
					WHERE  `identity_id`='.$identity_id;

			if (DB::Execute_SQL_Command($sql))
				return true;

			return false;

		}

		public function _clean($max)
		{

			/*
			global $identity_id;

			$old = time() - $max;

			$sql = 'DELETE
					FROM   mail_sessions
					WHERE  access < '.$old;

			return DB::Execute_SQL_Command($sql);
			*/

			return true;

		}

	}

?>
