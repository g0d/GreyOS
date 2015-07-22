<?php

    /*

        GreyOS Inc. - Timelines Class of API Wrapper

        Version: 1.0

        File name: timelines.php
        Description: This file contains the Timelines Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



	class TIMELINES extends API_WRAPPER
	{

        private $data;

        public function __construct()
        {

            $this->data = array();

        }   

		public function Mentions_Timeline()
		{

            $this->data['url'] = '1.1/statuses/mentions_timeline.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array('count' => 10, 
                                              'include_entities' => true);

            return $this->data;

		}

		public function User_Timeline($parameters)
		{

            $this->data['url'] = '1.1/statuses/user_timeline.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array('count' => 10, 
                                              'include_entities' => true);

            if (isset($parameters['screen_name']))
                $this->data['parameters']['screen_name'] = $parameters['screen_name'];

            return $this->data;

		}

		public function Home_Timeline()
		{

            $this->data['url'] = '1.1/statuses/home_timeline.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array('count' => 10, 
                                              'include_entities' => true);

            return $this->data;

		}

		public function Retweets_Of_Me()
		{

            $this->data['url'] = '1.1/statuses/retweets_of_me.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array('count' => 10, 
                                              'include_entities' => true);

            return $this->data;

		}

	}	

?>
		
