<?php

    /*

        GreyOS Inc. - Suggested Users Class of API Wrapper

        Version: 1.0

        File name: suggested_users.php
        Description: This file contains the Suggested Users Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



	class SUGGESTED_USERS extends API_WRAPPER
	{

        private $data;

        public function __construct($oauth_token, $oauth_token_secret)
        {

            $this->data;

        }

		public function Suggestions_Slug()
		{

		}

		public function Suggestions()
		{

            $this->data['url'] = '1.1/users/suggestions.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array();

            return $this->data;

		}

		public function Suggestions_Slug_Members()
		{

		}

	}	

?>