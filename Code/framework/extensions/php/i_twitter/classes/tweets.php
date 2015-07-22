<?php

    /*

        GreyOS Inc. - Tweets Class of API Wrapper

        Version: 1.0

        File name: tweets.php
        Description: This file contains the Tweets Class of API Wrapper.

        Coded by John Inglessis (negle)

        GreyOS Inc.
        Copyright © 2014

    */



  	class TWEETS extends API_WRAPPER
  	{

        private $data;

        public function __construct()
        {

            $this->data = array();

        }

        public function Retweets($parameters)
        {

            $this->data['url'] = '1.1/statuses/retweets/' . $parameters['id'] . '.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = array();

            return $this->data;

        }

        public function Show($parameters)
        {

            $this->data['url'] = '1.1/statuses/show.json';
            $this->data['method'] = 'GET';
            $this->data['parameters'] = $parameters;

            return $this->data;

        }

        public function Destroy($parameters)
        {

            $this->data['url'] = '1.1/statuses/destroy/' . $parameters['id'] . '.json';
            $this->data['method'] = 'POST';
            $this->data['parameters'] = $parameters;

            return $this->data;

        }

        public function Update($parameters)
        {

            $this->data['url'] = '1.1/statuses/update.json';
            $this->data['method'] = 'POST';
            $this->data['parameters'] = $parameters;

            return $this->data;

        }

        public function Retweet($parameters)
        {

            $this->data['url'] = '1.1/statuses/retweet/' . $parameters['id'] . '.json';
            $this->data['method'] = 'POST';
            $this->data['parameters'] = array();

            return $this->data;

        }

        public function Update_With_Media()
        {

            // Need Work

        }

        public function Oembed()
        {

            // Need Work

        }

        public function Retweeters($parameters)
        {

            $this->data['url'] = '1.1/statuses/retweeters/ids.json';
            $this->data['method'] = 'POST';
            $this->data['parameters'] = $parameters;

            return $this->data;

        }

  	}	

?>