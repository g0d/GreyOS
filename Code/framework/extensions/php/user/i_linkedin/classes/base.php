<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: base.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/classes/http.php'));

    /**
     * Class BASE
     * Provides generic functionality for classes that make Linkedin API calls (i.e. JOBS_LINKEDIN)
     */
    class BASE
    {

        const AUTH_CODE_URL = 'https://www.linkedin.com/uas/oauth2/authorization';
        const ACCESS_TOKEN_URL = 'https://www.linkedin.com/uas/oauth2/accessToken';
        const AUTH_STATE = 'fiih930jsjiF89476hifijo2kfef';

        private $api_key;
        private $secret_key;
        private $redirect_url;
        private $http;
        private $auth_code;
        private $access_token;

        public function __construct($api_key, $secret_key, $redirect_url)
        {

            $this->api_key = $api_key;
            $this->secret_key = $secret_key;
            $this->redirect_url = $redirect_url;
            $this->http = new HTTP();

        }

        /**
         * Get link to redirect users to Linkedin application permissions (see http://developer.linkedin.com/documents/authentication)
         * @param string $redirect_url URL to redirect back to after authorisation
         * @param string $scope Application permissions scope (see http://developer.linkedin.com/documents/authentication#granting)
         * @return string Link to redirect users to to confirm application permissions
         */
        public function Get_Auth_Code_Link($redirect_url, $scope = '')
        {

            $params = [
                'response_type' => 'code',
                'client_id' => $this->api_key,
                'state' => self::AUTH_STATE,
                'redirect_uri' => $redirect_url,
            ];

            if ($scope)
                $params['scope'] = $scope;

            return self::AUTH_CODE_URL . '?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986);

        }

        /**
         * Sets authorisation code for application permissions
         * @param string $auth_code Authorisation code
         * @param string $state String to prevent CSRF
         * @return bool
         */
        public function Set_Auth_Code($auth_code, $state)
        {

            // Verify $state to prevent CSRF
            if ($this->Valid_State($state)) {

                $this->auth_code = $auth_code;

                return true;

            }

            return false;

        }

        /**
         * Set access token to use with further API calls
         * @param string $access_token Access token to use with further API calls
         * @return bool
         */
        public function Set_Access_Token($access_token)
        {

            $this->access_token = $access_token;

            return true;

        }

        /**
         * Get access token which can be used with further API calls
         * @param string $redirect_url Redirect URL as specified when getting the auth code
         * @param string $auth_code Authorisation code to swap for an access token
         * @throws Exception if access token request response is invalid
         * @return object
         */
        public function Get_Access_Token($redirect_url, $auth_code)
        {

            $params = [
                'grant_type' => 'authorization_code',
                'code' => $auth_code,
                'redirect_uri' => $redirect_url,
                'client_id' => $this->api_key,
                'client_secret' => $this->secret_key,
            ];

            $response = $this->http->post(self::ACCESS_TOKEN_URL, $params);

            echo $response;

            $access_token = json_decode($response);

            if (!$access_token || !isset($access_token->access_token) || !isset($access_token->expires_in))
                throw new Exception ('Access token request response invalid');

            return $access_token;

        }

        /**
         * Perform GET or POST request and format response
         * @param string $url
         * @param array|string $data POST fields if array, otherwise POST body
         * @param bool|string $custom_method Custom HTTP method to use (i.e. DELETE), otherwise false for automatic GET/POST
         * @throws Exception if SetAuthCode hasn't been called yet
         * @throws Exception if $custom_method is invalid
         * @return SimpleXMLElement
         */
        protected function Do_Request($url, $data = [], $custom_method = false)
        {

            // Get access token if necessary
            if (!$this->access_token) {

                if (!$this->auth_code)
                    throw new Exception('BASE_LINKEDIN::auth_code not set');

                $this->Get_Access_Token($this->redirect_url, $this->auth_code);

            }

            $url = $this->Append_Access_Token($url);

            if (!$custom_method)
            {

                if ($data && is_array($data))
                    $response = $this->http->post($url, $data);

                elseif ($data && is_string($data))
                    $response = $this->http->post($url, $data, true);

                else
                    $response = $this->http->get($url);

            }

            else
            {

                $custom_method = strtolower($custom_method);

                if (method_exists($this->http, $custom_method))
                {

                    if ($data && is_array($data))
                        $response = $this->http->{$custom_method}($url, $data);

                    elseif ($data && is_string($data))
                        $response = $this->http->{$custom_method}($url, $data, true);

                    else
                        $response = $this->http->{$custom_method}($url);

                }

                else
                    throw new Exception("Method $custom_method does not exist in HTTP class");

            }

            try
            {

                return new SimpleXMLElement($response);

            }

            catch (Exception $e)
            {
                
                return '';

            }

        }

        /**
         * Filter arrays by allowed keys
         * @param array $params Array to filter
         * @param array $allowed_params Array of allowed keys
         * @return array Filtered $params
         */
        protected function Filter_Params(array $params, array $allowed_params)
        {

            $filtered_params = [];

            foreach ($params as $name => $value)
            {

                if (in_array($name, $allowed_params))
                    $filtered_params[$name] = urlencode($value);

            }

            return $filtered_params;

        }

        /**
         * Validate state to prevent CSRF
         * @param $state String to prevent CSRF
         * @return bool
         */
        private function Valid_State($state)
        {

            return $state == self::AUTH_STATE;

        }

        /**
         * Append access token to given URL
         * @param string $url
         * @return string
         */
        private function Append_Access_Token($url)
        {

            if (strpos($url, '?') !== false)
                $url .= '&oauth2_access_token=' . $this->access_token;

            else
                $url .= '?oauth2_access_token=' . $this->access_token;

            return $url;

        }

    }

?>
