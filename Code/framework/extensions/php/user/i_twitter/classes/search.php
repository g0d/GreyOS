<?php

    /*

        GreyOS Inc. - Search Class of API Wrapper

        Version: 1.0

        File name: search.php
        Description: This file contains the Search Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



	class SEARCH extends API_WRAPPER
	{

		private $data;

        public function __construct()
        {

            $this->data = array();

        }

		public function Tweets($query)   
		{

            // Q must be 1000 characters
            // Must be utf8 encoded and url encoded. 

            $query = utf8_encode($query);
            $query = urlencode($query);

            $this->data['url'] = '1.1/search/tweets.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array('q' => $query);

            return $this->data;

		}

	}	

?>