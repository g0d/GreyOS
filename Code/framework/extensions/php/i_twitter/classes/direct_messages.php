<?php

    /*

        GreyOS Inc. - Direct Messages Class of API Wrapper

        Version: 1.0

        File name: direct_messages.php
        Description: This file contains the Direct Messages Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



	class DIRECT_MESSAGES extends API_WRAPPER
	{

		private $data;

        public function __construct($oauth_token, $oauth_token_secret)
        {

      		$this->data = array();

        }

		public function Get()
		{

			$parameters = array('count'=>200);

			$this->data['url'] = '1.1/direct_messages.json';
			$this->data['method'] = 'GET';
			$this->data['parameters'] = $parameters;

			return $this->data;

		}

		public function Sent()
		{

			$parameters = array('count'=>200);
			
			$this->data['url'] = '1.1/direct_messages/sent.json';
			$this->data['method'] = 'GET';
			$this->data['parameters'] = $parameters;

			return $this->data;

		}

		public function Show($parameters)
		{

			$this->data['url'] = '1.1/direct_messages/show.json';
			$this->data['method'] = 'GET';
			$this->data['parameters'] = array();

			return $this->data;

		}

		public function Destroy($parameters)
		{	

			$this->data['url'] = '1.1/direct_messages/destroy.json';
			$this->data['method'] = 'POST';
			$this->data['parameters'] = $parameters;

			return $this->data;

		}

		public function New_Message($parameters)
		{	

			$this->data['url'] = '1.1/direct_messages/new.json';
			$this->data['method'] = 'POST';
			$this->data['parameters'] = $parameters;

			return $this->data;

		}

	}	

?>