<?php

    /*

        GreyOS Inc. - Followers Class of API Wrapper

        Version: 1.0

        File name: followers.php
        Description: This file contains the Followers Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



	class FOLLOWERS extends API_WRAPPER
	{

        private $data;

        public function __construct()
        {

            $this->data = array();

        }

		public function Ids($parameters)
		{

            $this->data['url'] = '1.1/followers/ids.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = $parameters;

            return $this->data;

        }

		public function Followers_Lists()
		{

            $this->data['url'] = '1.1/followers/list.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array('screen_name'=>$_SESSION['twitter_data']['screen_name']);

            return $this->data;

		}

	}	

?>