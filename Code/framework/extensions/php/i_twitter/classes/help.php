<?php

    /*

        GreyOS Inc. - Help Class of API Wrapper

        Version: 1.0

        File name: help.php
        Description: This file contains the Help Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */
	


	class HELP extends API_WRAPPER
	{

		private $data;

        public function __construct()
        {

            $this->data = array();

        }

		public function Configuration()
		{

		}

		public function Languages()
		{

			$this->data['url'] = '1.1/help/languages.json';
			$this->data['method'] = 'GET';
			$this->data['parameters'] = array();

			return $this->data;

		}

		public function Privacy()
		{

		}

		public function Tos()
		{

		}

		public function Rate_Limit_Status()
		{

		}

	}	

?>