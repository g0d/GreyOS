<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: people.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/classes/base.php'));

    /**
     * Class PEOPLE
     * Provides People API functionality (see http://developer.linkedin.com/documents/people)
     */
    class PEOPLE extends BASE
    {

        const PROFILE_URL = 'https://api.linkedin.com/v1/people/';
        const SEARCH_URL = 'https://api.linkedin.com/v1/people-search';

        /**
         * Get profile details
         * @param int $id Profile ID (leave as null for own profile)
         * @return SimpleXMLElement Profile details
         */
        public function Get_Profile($id = null)
        {

            // Append ~ to url if self profile, otherwise append id=$id
            if ($id && $id !== '~')
                $id = 'id=' . $id;

            else
                $id = '~';

            $field_selectors = ':(id,first-name,last-name,headline,location,industry,distance,current-share,'
                             . 'num-connections,num-connections-capped,summary,specialties,positions,picture-url)';

            return $this->Do_Request(self::PROFILE_URL . $id . $field_selectors);

        }

        public function Search_People(array $params = [])
        {

            $allowed_params = [
                'sort', 'keywords', 'first-name', 'last-name', 'company-name',
                'current-company', 'title', 'current-title', 'school-name', 'current-school',
                'country-code', 'postal-code', 'distance',
            ];
            $filtered_params = $this->Filter_Params($params, $allowed_params);

            return $this->Do_Request(self::SEARCH_URL . '?' . http_build_query($filtered_params, '', '&', PHP_QUERY_RFC3986));

        }

    }

?>
