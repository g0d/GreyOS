<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: jobs.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    require_once(UTILS::Absolute_Path('framework/extensions/php/i_linkedin/classes/base.php'));

    /**
     * Class JOBS
     * Provides Jobs API functionality (see http://developer.linkedin.com/documents/jobs)
     */
    class JOBS extends BASE
    {

        const JOBS_URL = 'https://api.linkedin.com/v1/jobs/';
        const JOBS_SEARCH_URL = 'https://api.linkedin.com/v1/job-search';

        /**
         * Get job details
         * @param int $id Job ID
         * @return SimpleXMLElement Job details
         */
        public function Get_Job($id)
        {

            return $this->Do_Request(self::JOBS_URL . $id);

        }

        /**
         * Search for jobs
         * @param array $params Parameters to filter by (see http://developer.linkedin.com/documents/job-search-api)
         * @return SimpleXMLElement Job search results
         */
        public function Search_Jobs(array $params = [])
        {

            $allowed_params = ['keywords', 'company-name', 'job-title', 'country-code', 'postal-code', 'distance', 'sort'];
            $filtered_params = $this->Filter_Params($params, $allowed_params);

            return $this->Do_Request(self::JOBS_SEARCH_URL . '?' . http_build_query($filtered_params, '', '&', PHP_QUERY_RFC3986));

        }

    }

?>
