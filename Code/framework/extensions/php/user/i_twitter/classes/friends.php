<?php

    /*

        GreyOS Inc. - Friends Class of API Wrapper

        Version: 1.0

        File name: friends.php
        Description: This file contains the Friends Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



	class FRIENDS extends API_WRAPPER
	{

		private $data;

        public function __construct()
        {

        	$this->data = array();

        }

		public function No_Retweets_Ids()
		{	

			$this->data['url'] = '1.1/friendships/no_retweets/ids.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array();

            return $this->data;

		}

		public function Ids($parameters)
		{

			$this->data['url'] = '1.1/friends/ids.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array();

            return $this->data;

		}

		public function Incoming()
		{	

			$this->data['url'] = '1.1/friendships/incoming.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array();

            return $this->data;

		}

		public function Outgoing()
		{

			$this->data['url'] = '1.1/friendships/outgoing.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array();

            return $this->data;

		}

		public function Create($parameters)
		{

			$this->data['url'] = '1.1/friendships/create.json';
            $this->data['method'] = 'POST';
            $this->data['parameters'] = $parameters;

            return $this->data;

		}

		public function Destroy($parameters)
		{

			$this->data['url'] = '1.1/friendships/destroy.json';
            $this->data['method'] = 'POST';
            $this->data['parameters'] = $parameters;

            return $this->data;

		}

		public function Update($parameters)
		{	

			$this->data['url'] = '1.1/friendships/update.json';
            $this->data['method'] = 'POST';
            $this->data['parameters'] = $parameters;

            return $this->data;

		}

		public function Show($parameters)
		{	

			$this->data['url'] = '1.1/friendships/show.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = $parameters;

            return $this->data;

		}

		public function Friends_List($parameters)
		{

			$this->data['url'] = '1.1/friends/list.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = $parameters;

            return $this->data;

		}

		public function Look_Up($parameters)
		{

			$this->data['url'] = '1.1/friendships/lookup.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = $parameters;

            return $this->data;

		}

	}	

?>