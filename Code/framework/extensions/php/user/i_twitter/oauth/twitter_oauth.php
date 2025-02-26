<?php

    /*

        GreyOS Inc. - Twitter Oauth Library

        Version: 1.0

        File name: twitter_oauth.php
        Description: This file contains the Twitter Oauth Library
        
        Coded by John Inglessis (negle)
        GreyOS Inc.
        Copyright © 2014
   
    */



    class TWITTER_OAUTH
    {

        // Default App Config Variables
        protected $Config = array('base_url' => 'https://api.twitter.com/',
                                  'consumer_key' => 'ZQK5DbYHgexnZRAk0GfA',
                                  'consumer_secret' => 'VuoZYt7umq5s5qKzPId8ebKunrzq9tR8zqT214hDsk',
                                  'oauth_callback' => '', 
                                  'oauth' => array(),
                                  'oauth_type' => 'authorized');

        protected $Request_Url = '';
        protected $Request_Method = ''; // POST or GET
        protected $Request_Data = array();
        protected $Oauth_Access_Token = ''; // User Access Token
        protected $Oauth_Access_Token_Secret = ''; // User Access Token Secret
        protected $Oauth_Token = '';

        /**
         * 
         * @param array $config
         */
        public function __construct($config = array())
        {

            // Overwrite default config variables
            foreach ($config as $key => $value)
                $this->Config[$key] = $value;

            $this->Config['oauth_callback'] = 'https://' . $_SERVER['HTTP_HOST'] . '/framework/extensions/ajax/i_twitter/i_twitter.php';

        }

        /**
         * Set oauth_token used to verify user before getting the auth access token 
         * 
         * @param type $oauthToken
         * @return \REQUEST
         */
        public function Set_Oauth_Token($Oauth_Token)
        {

            $this->Oauth_Token = $Oauth_Token;

            return $this;

        }

        /**
         * Set user oauth credentials used to make API request 
         * 
         * @param string $oauthAccessToken
         * @param string $oauthAccessTokenSecret
         * @return \REQUEST
         */
        public function Set_User_Credentials($Oauth_Access_Token, $Oauth_Access_Token_Secret)
        {

            $this->Oauth_Access_Token = $Oauth_Access_Token;
            $this->Oauth_Access_Token_Secret = $Oauth_Access_Token_Secret;

            return $this;

        }

        /**
         * Set Request info as the request url
         * or request method that is GET or POST capitalized
         * and an array of data depending on the request
         * 
         * @param string $requestUrl
         * @param string $requestMethod
         * @param array $requestData
         * @return \REQUEST
         */
        public function Set_Request_Info($Request_Url, $Request_Method, $Request_Data = array())
        {

            $this->Request_Url = $Request_Url;
            $this->Request_Method = $Request_Method;
            $this->Request_Data = $Request_Data;

            //add GET data to url
            return $this;

        }

        /**
         * Add required variables to $this->config['oauth'] that need to be used
         * on the request process 
         * 
         * @return \REQUEST
         */
        public function Build_Request()
        {

            $this->Config['oauth']['oauth_consumer_key'] = $this->Config['consumer_key'];
            $this->Config['oauth']['oauth_nonce'] = md5(uniqid(rand(), true));
            $this->Config['oauth']['oauth_signature_method'] = 'HMAC-SHA1';
            $this->Config['oauth']['oauth_timestamp'] = time();
            $this->Config['oauth']['oauth_version'] = '1.0';

            // Oauth first step of authorization
            if ($this->Config['oauth_type'] == 'unauthorized')
            {

                $this->Config['oauth']['oauth_callback'] = $this->Config['oauth_callback'];
                $this->Config['oauth']['oauth_signature'] = $this->Build_Signature();

            }

            else if ($this->Config['oauth_type'] == 'semi-authorized')
            {

                $this->Config['oauth']['oauth_token'] = $this->Oauth_Token;
                $this->Config['oauth']['oauth_signature'] = $this->Build_Signature();

            }

            else
            {

                //request by an Oauth user
                $this->Config['oauth']['oauth_token'] = $this->Oauth_Access_Token;
                $this->Config['oauth']['oauth_signature'] = $this->Build_Signature();

            }

            return $this;

        }

        /**
         * Make the API call and return its response
         * 
         * @return json response
         */
        public function Make_Request()
        {

            $Url = $this->Config['base_url'] . $this->Request_Url;

            $Header = $this->Request_Authorization_Header();

            $Ch = curl_init();

            if ($this->Request_Method == 'POST')
                curl_setopt($Ch, CURLOPT_POSTFIELDS, $this->Get_Request_Data());

            else
            {

                if (!empty($this->Request_Data))
                    $Url .= '?' . $this->Get_Request_Data();

            }

            curl_setopt($Ch, CURLOPT_URL, $Url);
            curl_setopt($Ch, CURLOPT_HTTPHEADER, $Header);
            curl_setopt($Ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($Ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($Ch, CURLOPT_HEADER, FALSE);
            curl_setopt($Ch, CURLOPT_RETURNTRANSFER, TRUE);

            $Response = curl_exec($Ch);

            curl_close($Ch);

            return $Response;

        }

        /**
         * Return a encoded string used on request body if the request is a POST request
         * or on the url part if it is an GET request
         * 
         * @return string
         */
        protected function Get_Request_Data()
        {

            $Return = array();

            foreach ($this->Request_Data as $key => $value)
                $Return[] = rawurlencode($key) . '=' . rawurlencode($value);

            return implode('&', $Return);

        }

        /**
         * Build the authoriazed signature used on header part of the request
         * 
         * @return string
         */
        protected function Build_Signature()
        {

            $Base_Info = $this->Encode_Request_Data();

            if ($this->Config['oauth_type'] == 'unauthorized')
                $Composite_Key = rawurlencode($this->Config['consumer_secret']) . "&";

            else if ($this->Config['oauth_type'] == 'semi-authorized')
                $Composite_Key = rawurlencode($this->Config['consumer_secret']) . '&' . rawurlencode($this->Oauth_Access_Token);

            else
                $Composite_Key = rawurlencode($this->Config['consumer_secret']) . '&' . rawurlencode($this->Oauth_Access_Token_Secret);

            return base64_encode(hash_hmac('sha1', $Base_Info, $Composite_Key, true));

        }

        /**
         * Create an encoded string usung request method either POST or GET,
         * the full request url and all the data from config->oauth + requestData
         * 
         * @return string
         */
        protected function Encode_Request_Data()
        {

            $Return = array();

            // Get Oauth data + request data if there are any
            $Url_Data = (!empty($this->Request_Data)) ? $this->Config['oauth'] + $this->Request_Data : $this->Config['oauth'];

            // Sort by key name
            uksort($Url_Data, 'strcmp');

            foreach ($Url_Data as $key => $value)
                $Return[] = rawurlencode($key) . '=' . rawurlencode($value);

            return $this->Request_Method . "&" . rawurlencode($this->Config['base_url'] . $this->Request_Url) . 
                   '&' . rawurlencode(implode('&', $Return));

        }

        /**
         * Return the authorized header used on the request
         * 
         * @return array
         */
        protected function Request_Authorization_Header()
        {

            $OAuth_Header = 'Authorization: OAuth ';
            $Values = array();

            // Sort by key name
            uksort($this->Config['oauth'], 'strcmp');

            foreach ($this->Config['oauth'] as $key => $value)
                $Values[] = "$key=\"" . rawurlencode($value) . "\"";

            $OAuth_Header .= implode(', ', $Values);

            $result_array = array("X-HostCommonName: api.twitter.com",
                                  $OAuth_Header,
                                  "Host: api.twitter.com",
                                  "X-Target-URI: https://api.twitter.com",
                                  "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
                                  "Connection: Keep-Alive",
                                  "Expect:");

            return $result_array;

        }

    }

?>
