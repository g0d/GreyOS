<?php

    /*

        GreyOS Inc. - Favorites Class of API Wrapper

        Version: 1.0

        File name: favorites.php
        Description: This file contains the Favorites Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */
		

		
	class FAVORITES extends API_WRAPPER
	{

		private $data;

        public function __construct($oauth_token, $oauth_token_secret)
        {

        	$this->data = array();

        }

		public function Favorites_List()
		{

			$this->data['url'] = '1.1/favorites/list.json';
			$this->data['method'] = 'GET';
			$this->data['parameters'] = array();

			return $this->data;

		}

		public function Destroy()
		{

		}
        
		public function Create()
		{

		}

	}	

?>