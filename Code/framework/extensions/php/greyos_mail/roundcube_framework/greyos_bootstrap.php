<?php

    /*

      GreyOS Inc. - GreyOS M@il

      Version: 1.0

      File name: greyos_mail.php
      Description: This file contains the GreyOS M@il extension.

      Coded by Mirko Lučić (mands)

      GreyOS Inc.
      Copyright (c) 2013

    */

	$config = array(
		//'error_reporting'         => E_ALL &~ (E_NOTICE | E_STRICT),
		//'error_reporting'         => E_ALL ,
		'error_reporting'         => 0,
		'mbstring.func_overload'  => 0,
		'magic_quotes_runtime'    => 0,
		'magic_quotes_sybase'     => 0, // #1488506
	);


	// framework constants
	define('RCUBE_VERSION', '0.9.2');
	define('RCUBE_CHARSET', 'UTF-8');

	if (!defined('RCUBE_LIB_DIR')) {
		define('RCUBE_LIB_DIR', dirname(__FILE__).'/');
	}

	if (!defined('RCUBE_INSTALL_PATH')) {
		define('RCUBE_INSTALL_PATH', RCUBE_LIB_DIR);
	}

	if (!defined('RCUBE_CONFIG_DIR')) {
		define('RCUBE_CONFIG_DIR',  '../../php/greyos_mail/config/');
	}

	if (!defined('RCUBE_PLUGINS_DIR')) {
		define('RCUBE_PLUGINS_DIR', '../../php/greyos_mail/plugins/');
	}

	if (!defined('RCUBE_LOCALIZATION_DIR')) {
		define('RCUBE_LOCALIZATION_DIR', '../../php/greyos_mail/localization/');
	}



	// set internal encoding for mbstring extension
	if (extension_loaded('mbstring')) 
	{

		mb_internal_encoding(RCUBE_CHARSET);
		@mb_regex_encoding(RCUBE_CHARSET);

	}

	// Register autoloader
	spl_autoload_register('rcube_autoload');

	// set PEAR error handling (will also load the PEAR main class)
	//PEAR::setErrorHandling(PEAR_ERROR_CALLBACK, 'rcube_pear_error');



	/**
	 * Similar function as in_array() but case-insensitive
	 *
	 * @param string $needle    Needle value
	 * @param array  $heystack  Array to search in
	 *
	 * @return boolean True if found, False if not
	 */
	function in_array_nocase($needle, $haystack)
	{
		$needle = mb_strtolower($needle);
		foreach ((array)$haystack as $value) {
			if ($needle === mb_strtolower($value)) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Make sure the string ends with a slash
	 */
	function slashify($str)
	{
	  return unslashify($str).'/';
	}


	/**
	 * Remove slashes at the end of the string
	 */
	function unslashify($str)
	{
	  return preg_replace('/\/+$/', '', $str);
	}


	/**
	 * Returns number of seconds for a specified offset string.
	 *
	 * @param string $str  String representation of the offset (e.g. 20min, 5h, 2days, 1week)
	 *
	 * @return int Number of seconds
	 */
	function get_offset_sec($str)
	{
		if (preg_match('/^([0-9]+)\s*([smhdw])/i', $str, $regs)) {
			$amount = (int) $regs[1];
			$unit   = strtolower($regs[2]);
		}
		else {
			$amount = (int) $str;
			$unit   = 's';
		}

		switch ($unit) {
		case 'w':
			$amount *= 7;
		case 'd':
			$amount *= 24;
		case 'h':
			$amount *= 60;
		case 'm':
			$amount *= 60;
		}

		return $amount;
	}


	/**
	 * Create a unix timestamp with a specified offset from now.
	 *
	 * @param string $offset_str  String representation of the offset (e.g. 20min, 5h, 2days)
	 * @param int    $factor      Factor to multiply with the offset
	 *
	 * @return int Unix timestamp
	 */
	function get_offset_time($offset_str, $factor=1)
	{
		return time() + get_offset_sec($offset_str) * $factor;
	}


	/**
	 * Truncate string if it is longer than the allowed length.
	 * Replace the middle or the ending part of a string with a placeholder.
	 *
	 * @param string $str         Input string
	 * @param int    $maxlength   Max. length
	 * @param string $placeholder Replace removed chars with this
	 * @param bool   $ending      Set to True if string should be truncated from the end
	 *
	 * @return string Abbreviated string
	 */
	function abbreviate_string($str, $maxlength, $placeholder='...', $ending=false)
	{
		$length = mb_strlen($str);

		if ($length > $maxlength) {
			if ($ending) {
				return mb_substr($str, 0, $maxlength) . $placeholder;
			}

			$placeholder_length = mb_strlen($placeholder);
			$first_part_length  = floor(($maxlength - $placeholder_length)/2);
			$second_starting_location = $length - $maxlength + $first_part_length + $placeholder_length;

			$str = mb_substr($str, 0, $first_part_length) . $placeholder . mb_substr($str, $second_starting_location);
		}

		return $str;
	}


	/**
	 * Get all keys from array (recursive).
	 *
	 * @param array $array  Input array
	 *
	 * @return array List of array keys
	 */
	function array_keys_recursive($array)
	{
		$keys = array();

		if (!empty($array) && is_array($array)) {
			foreach ($array as $key => $child) {
				$keys[] = $key;
				foreach (array_keys_recursive($child) as $val) {
					$keys[] = $val;
				}
			}
		}

		return $keys;
	}


	/**
	 * Remove all non-ascii and non-word chars except ., -, _
	 */
	function asciiwords($str, $css_id = false, $replace_with = '')
	{
		$allowed = 'a-z0-9\_\-' . (!$css_id ? '\.' : '');
		return preg_replace("/[^$allowed]/i", $replace_with, $str);
	}


	/**
	 * Check if a string contains only ascii characters
	 *
	 * @param string $str           String to check
	 * @param bool   $control_chars Includes control characters
	 *
	 * @return bool
	 */
	function is_ascii($str, $control_chars = true)
	{
		$regexp = $control_chars ? '/[^\x00-\x7F]/' : '/[^\x20-\x7E]/';
		return preg_match($regexp, $str) ? false : true;
	}


	/**
	 * Remove single and double quotes from a given string
	 *
	 * @param string Input value
	 *
	 * @return string Dequoted string
	 */
	function strip_quotes($str)
	{
		return str_replace(array("'", '"'), '', $str);
	}


	/**
	 * Remove new lines characters from given string
	 *
	 * @param string $str  Input value
	 *
	 * @return string Stripped string
	 */
	function strip_newlines($str)
	{
		return preg_replace('/[\r\n]/', '', $str);
	}


	/**
	 * Compose a valid representation of name and e-mail address
	 *
	 * @param string $email  E-mail address
	 * @param string $name   Person name
	 *
	 * @return string Formatted string
	 */
	function format_email_recipient($email, $name = '')
	{
		$email = trim($email);

		if ($name && $name != $email) {
			// Special chars as defined by RFC 822 need to in quoted string (or escaped).
			if (preg_match('/[\(\)\<\>\\\.\[\]@,;:"]/', $name)) {
				$name = '"'.addcslashes($name, '"').'"';
			}

			return "$name <$email>";
		}

		return $email;
	}


	/**
	 * Format e-mail address
	 *
	 * @param string $email E-mail address
	 *
	 * @return string Formatted e-mail address
	 */
	function format_email($email)
	{
		$email = trim($email);
		$parts = explode('@', $email);
		$count = count($parts);

		if ($count > 1) {
			$parts[$count-1] = mb_strtolower($parts[$count-1]);

			$email = implode('@', $parts);
		}

		return $email;
	}


	/**
	 * mbstring replacement functions
	 */
	if (!extension_loaded('mbstring'))
	{
		function mb_strlen($str)
		{
			return strlen($str);
		}

		function mb_strtolower($str)
		{
			return strtolower($str);
		}

		function mb_strtoupper($str)
		{
			return strtoupper($str);
		}

		function mb_substr($str, $start, $len=null)
		{
			return substr($str, $start, $len);
		}

		function mb_strpos($haystack, $needle, $offset=0)
		{
			return strpos($haystack, $needle, $offset);
		}

		function mb_strrpos($haystack, $needle, $offset=0)
		{
			return strrpos($haystack, $needle, $offset);
		}
	}


	function rcube_autoload($classname)
	{

			$filepath = ALPHA_CMS::Absolute_Path('framework/extensions/php/greyos_mail/roundcube_framework/'.$classname.'.php');
			if (is_readable($filepath)) {
				include_once $filepath;
				return true;
			}


		return false;
	}

	function Get_Mail_Accounts($user_id)
	{

		global $greyos_mail;

		if($accounts=$greyos_mail->Get_Mail_Accounts($user_id))
			return GREYOS_MAIL_OUTPUT::Print_Mail_Accounts($accounts);

		else 
			return false;

	}

	function Print_Result($result, $exit=true)
	{

		ob_end_clean();

		echo json_encode($result, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);

		if($exit)
			exit;

	}

	function Check_Post_Vars($vars)
	{

		if (!isset($vars) || empty($vars))
			return false;

		foreach ($vars as $var)
		{

			if (!isset($_POST[$var]) || empty($_POST[$var]))
				Print_Result(array('__show_error'=>'<br>Post Variable error => '.$var));

		}

		return true;

	}

	function Check_Session_Vars($vars)
	{

		if (!isset($vars) || empty($vars))
			return false;

		foreach ($vars as $var)
		{

			if (!isset($_SESSION[$var]) || empty($_SESSION[$var]))
				Print_Result(array('__show_error'=>'<br>Session variable error => '.$var));

		}

		return true;

	}

	//functions for mesuring memory and time used by script
	function Start_Measure()
	{
		global $time;
		global $mem;

		$time = microtime(TRUE);
		$mem = memory_get_usage();

	}

	function End_Measure()
	{

		global $time;
		global $mem;

		$_SESSION['memory']=(memory_get_usage() - $mem) / (1024 * 1024);
		$_SESSION['time']=microtime(TRUE) - $time;

	}

	function Calculate_Timezone($offset)
	{

       $zone_list = array('Kwajalein' => -12.00, 
						'Pacific/Midway' => -11.00, 
						'Pacific/Honolulu' => -10.00,
						'America/Anchorage' => -9.00,
						'America/Los_Angeles' => -8.00,
						'America/Denver' => -7.00,
						'America/Tegucigalpa' => -6.00,
						'America/New_York' => -5.00,
						'America/Caracas' => -4.30,
						'America/Halifax' => -4.00,
						'America/St_Johns' => -3.30,
						'America/Argentina/Buenos_Aires' => -3.00,
						'America/Sao_Paulo' => -3.00,
						'Atlantic/South_Georgia' => -2.00,
						'Atlantic/Azores' => -1.00,
						'Europe/Dublin' => 0,
						'Europe/Belgrade' => 1.00,
						'Europe/Minsk' => 2.00,
						'Asia/Kuwait' => 3.00,
						'Asia/Tehran' => 3.30,
						'Asia/Muscat' => 4.00,
						'Asia/Yekaterinburg' => 5.00,
						'Asia/Kolkata' => 5.30,
						'Asia/Katmandu' => 5.45,
						'Asia/Dhaka' => 6.00,
						'Asia/Rangoon' => 6.30,
						'Asia/Krasnoyarsk' => 7.00,
						'Asia/Brunei' => 8.00,
						'Asia/Seoul' => 9.00,
						'Australia/Darwin' => 9.30,
						'Australia/Canberra' => 10.00,
						'Asia/Magadan' => 11.00,
						'Pacific/Fiji' => 12.00,
						'Pacific/Tongatapu' => 13.00);

       $index = array_keys($zone_list, $offset);
       $timezone = $index[0];
	   
	   return $timezone;

	}
