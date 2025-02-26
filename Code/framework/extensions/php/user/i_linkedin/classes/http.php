<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: http.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    /**
     * Class Http allows you to HTTP GET and POST to URLs
     * Example usage:
     *     $http = new Http();
     *     $getData = $http->get('https://google.com');
     *     $postData = $http->post('https://google.com', ['foo' => 'bar']);
     */
    class HTTP
    {

        private $ch;

        /**
         * HTTP GET a URL
         * @param string $url URL to GET
         * @return string Response from the URL
         */
        public function get($url)
        {

            $response = $this->Init_Curl()->Send_Request($url);

            return $response;

        }

        /**
         * HTTP POST a URL
         * @param string $url URL to POST to
         * @param array|string $data POST data to send with the request
         * @param bool $xml_body true if $data is XML body content to POST
         * @return string Response from the URL
         */
        public function post($url, $data = [], $xml_body = false)
        {

            $response = $this->Init_Curl()->Send_Request($url, $data, $xml_body);

            return $response;

        }

        /**
         * HTTP DELETE a URL
         * @param string $url URL to DELETE to
         * @return string Response from the URL
         */
        public function delete($url)
        {

            $response = $this->Init_Curl()->Set_Method('DELETE')
                ->Send_Request($url);

            return $response;

        }

        /**
         * HTTP PUT a URL
         * @param string $url URL to PUT to
         * @param array|string $data PUT data to send with the request
         * @param bool $xml_body true if $data is XML body content to PUT
         * @return string Response from the URL
         */
        public function put($url, $data = [], $xml_body = false)
        {

            $response = $this->Init_Curl()->Set_Method('PUT')
                ->Send_Request($url, $data, $xml_body);

            return $response;

        }

        /**
         * Initialises cURL
         * @return self
         */
        private function Init_Curl()
        {

            $this->ch = curl_init();

            curl_setopt($this->ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($this->ch, CURLOPT_FOLLOWLOCATION, true);

            return $this;

        }

        /**
         * Set custom HTTP method
         * @param string $method HTTP method to use (i.e. DELETE, PUT)
         * @return self
         */
        private function Set_Method($method)
        {

            curl_setopt($this->ch, CURLOPT_CUSTOMREQUEST, $method);

            return $this;

        }

        /**
         * Does the actual sending of the request with cURL
         * @param string $url URL to send request to
         * @param array|string $data Data to send with the request if you want to POST (otherwise GET)
         * @param bool $xml_body true if $data is XML body content to POST
         * @return string Response from the URL
         */
        private function Send_Request($url, $data = [], $xml_body = false)
        {

            curl_setopt($this->ch, CURLOPT_URL, $url);
            curl_setopt($this->ch, CURLOPT_SSL_VERIFYPEER, false); // TODO: remove

            if ($data)
            {

                // This is a POST request, otherwise GET

                if ($xml_body)
                {

                    curl_setopt($this->ch, CURLOPT_HTTPHEADER, ['Content-Type: text/xml']);
                    curl_setopt($this->ch, CURLOPT_POST, 1);
                    curl_setopt($this->ch, CURLOPT_POSTFIELDS, $data);

                }

                else {

                    curl_setopt($this->ch, CURLOPT_POST, count($data));
                    curl_setopt($this->ch, CURLOPT_POSTFIELDS, http_build_query($data, '', '&', PHP_QUERY_RFC3986));

                }

            }

            $response = curl_exec($this->ch);

            curl_close($this->ch);

            return $response;

        }
    }

?>
