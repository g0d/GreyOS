<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: companies.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    require_once(UTILS::Absolute_Path('framework/extensions/php/i_linkedin/classes/base.php'));

    /**
     * Class COMPANIES
     * Provides Companies API functionality (see http://developer.linkedin.com/documents/companies)
     */
    class COMPANIES extends BASE
    {

        const COMPANIES_SEARCH_URL = 'https://api.linkedin.com/v1/company-search';
        const COMPANY_URL = 'https://api.linkedin.com/v1/companies/';
        const FOLLOWING_COMPANIES_URL = 'https://api.linkedin.com/v1/people/~/following/companies';
        const SUGGESTED_COMPANIES_URL = 'https://api.linkedin.com/v1/people/~/suggestions/to-follow/companies';
        const COMPANIES_PRODUCTS_URL = 'https://api.linkedin.com/v1/companies/{id}/products';

        /**
         * Search for companies
         * @param array $params Parameters to filter by (see http://developer.linkedin.com/documents/company-search)
         * @return SimpleXMLElement Company search results
         */
        public function Search_Companies(array $params = [])
        {

            $allowed_params = ['keywords', 'sort', 'start'];
            $filtered_params = $this->Filter_Params($params, $allowed_params);
            $filtered_params['count'] = 25; // Actual number of results depends on user account level

            return $this->Do_Request(self::COMPANIES_SEARCH_URL . '?' . http_build_query($filtered_params, '', '&', PHP_QUERY_RFC3986));

        }

        /**
         * Get company details
         * @param int $id Company ID
         * @return SimpleXMLElement Company details
         */
        public function Get_Company($id)
        {

            $field_selectors = ':(id,universal-name,email-domains,company-type,ticker,website-url,industries,status,'
                             . 'logo-url,square-logo-url,blog-rss-url,twitter-id,employee-count-range,specialties,'
                             . 'locations,description,stock-exchange,founded-year,end-year,num-followers)';

            return $this->Do_Request(self::COMPANY_URL . $id . $field_selectors);

        }

        /**
         * Get followed companies
         * @return SimpleXMLElement Followed companies
         */
        public function Get_Followed_Companies()
        {

            return $this->Do_Request(self::FOLLOWING_COMPANIES_URL);

        }

        /**
         * Follow a company
         * @param int $id Company ID
         * @return SimpleXMLElement
         */
        public function Company_Follow($id)
        {

            $xml = <<<XML
<company>
  <id>$id</id>
</company>
XML;

            return $this->Do_Request(self::FOLLOWING_COMPANIES_URL, $xml);

        }

        /**
         * Unfollow a company
         * @param int $id Company ID
         * @return SimpleXMLElement
         */
        public function Company_Unfollow($id)
        {

            $id = "/id=$id";

            return $this->Do_Request(self::FOLLOWING_COMPANIES_URL . $id, [], 'delete');

        }

        /**
         * Get suggested companies
         * @return SimpleXMLElement Suggested companies
         */
        public function Get_Suggested_Companies()
        {

            return $this->Do_Request(self::SUGGESTED_COMPANIES_URL);

        }

        /**
         * Get company products
         * @param int $id Company ID
         * @return SimpleXMLElement Company products
         */
        public function Get_Companies_Products($id)
        {

            $field_selectors = ':(id,name,type,creation-timestamp,logo-url,description,features,video,product-deal,'
                             . 'sales-persons,num-recommendations,recommendations,product-category,website-url,'
                             . 'disclaimer)';

            return $this->Do_Request(str_replace('{id}', $id, self::COMPANIES_PRODUCTS_URL) . $field_selectors);

        }

    }

?>
