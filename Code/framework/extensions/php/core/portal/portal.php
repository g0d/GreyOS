<?php
	/*
		Portal (REST Framework for GET / POST)

		File name: portal.php (Version: 2.4)
		Description: This file contains the Portal extension.

		Coded by George Delaportas (G0D)
		Copyright (C) 2016 - 2023
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
		exit();

	function Portal($url, $mode, $header_options = array(), $post_params_list = array(), $credentials = array(), $cookies_list = array(), $timeout_options = array())
	{
		if (empty($url) || empty($mode) || 
			($mode !== 'get' && $mode !== 'post'))
			return false;

		$connect_timeout = 30;
		$opt_timeout = 60;
		$params = null;
		$cookies = null;

		$curl = curl_init();

		if (!empty($header_options))
		{
			foreach ($header_options as $key => $value)
				$params .= $key . ':' . $value;

			curl_setopt($curl, CURLOPT_HTTPHEADER, array($params));
		}

		curl_setopt($curl, CURLOPT_HEADER, false);
		curl_setopt($curl, CURLOPT_ENCODING, 'gzip');
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);

		if (!empty($timeout_options))
		{
			if (count($timeout_options) !== 2)
				return false;
			else
			{
				$connect_timeout = $timeout_options[0];
				$opt_timeout = $timeout_options[1];
			}
		}

		curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $connect_timeout);
		curl_setopt($curl, CURLOPT_TIMEOUT, $opt_timeout);

		if (!empty($credentials) && count($credentials) == 2 && 
			isset($credentials['username']) && isset($credentials['password']))
		{
			curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
			curl_setopt($curl, CURLOPT_USERPWD, $credentials['username'] . ':' . $credentials['password']);
		}

		curl_setopt($curl, CURLOPT_URL, $url);

		if ($mode === 'post')
		{
			if (!empty($post_params_list))
			{
				foreach ($post_params_list as $key => $value)
					$params .= $key . '=' . $value . '&';

				rtrim($params, '&');

				curl_setopt($curl, CURLOPT_POST, count($post_params_list));
				curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
			}
		}

		if (!empty($cookies_list))
		{
			foreach ($cookies_list as $cookie)
				$cookies .= $cookie;

			curl_setopt($curl, CURLOPT_COOKIE, $cookies);
		}

		$result = curl_exec($curl);

		curl_close($curl);

		return $result;
	}

	// ----------------------------
?>
