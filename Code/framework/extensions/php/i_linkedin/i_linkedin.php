<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: i_linkedin.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/classes/jobs.php'));
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/classes/people.php'));
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/classes/social.php'));
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/classes/companies.php'));
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/classes/groups.php'));

    /**
     * Class I_LINKEDIN
     * Facade class for Linkedin API functionality
     */
    class I_LINKEDIN
    {

        private $redirect_url;
        private $jobs;
        private $people;
        private $social;
        private $companies;
        private $groups;

        public function __construct($api_key, $secret_key, $redirect_url)
        {

            $this->redirect_url = $redirect_url;
            $this->jobs = new JOBS($api_key, $secret_key, $redirect_url);
            $this->people = new PEOPLE($api_key, $secret_key, $redirect_url);
            $this->social = new SOCIAL($api_key, $secret_key, $redirect_url);
            $this->companies = new COMPANIES($api_key, $secret_key, $redirect_url);
            $this->groups = new GROUPS($api_key, $secret_key, $redirect_url);

        }

        /**
         * Get link to redirect users to Linkedin application permissions (see http://developer.linkedin.com/documents/authentication)
         * @param string $scope Application permissions scope (see http://developer.linkedin.com/documents/authentication#granting)
         * @return string Link to redirect users to to confirm application permissions
         */
        public function Get_Auth_Code_Link($scope = '')
        {

            return $this->jobs->Get_Auth_Code_Link($this->redirect_url, $scope);

        }

        /**
         * Sets authorisation code for application permissions
         * @param string $auth_code Authorisation code
         * @param string $state String to prevent CSRF
         * @return bool
         */
        public function Set_Auth_Code($auth_code, $state)
        {

            $this->jobs->Set_Auth_Code($auth_code, $state);
            $this->people->Set_Auth_Code($auth_code, $state);
            $this->social->Set_Auth_Code($auth_code, $state);
            $this->companies->Set_Auth_Code($auth_code, $state);
            $this->groups->Set_Auth_Code($auth_code, $state);

            return true;

        }

        /**
         * Set access token to use with further API calls
         * @param string $access_token Access token to use with further API calls
         * @return bool
         */
        public function Set_Access_Token($access_token)
        {

            $this->jobs->Set_Access_Token($access_token);
            $this->people->Set_Access_Token($access_token);
            $this->social->Set_Access_Token($access_token);
            $this->companies->Set_Access_Token($access_token);
            $this->groups->Set_Access_Token($access_token);

            return true;

        }

        /**
         * Get access token which can be used with further API calls
         * @param string $auth_code Authorisation code to swap for an access token
         * @throws Exception if access token request response is invalid
         * @return object
         */
        public function Get_Access_Token($auth_code)
        {

            return $this->jobs->Get_Access_Token($this->redirect_url, $auth_code);

        }

        /**
         * Get job details
         * @param int $id Job ID
         * @return SimpleXMLElement Job details
         */
        public function Get_Job($id)
        {

            return $this->jobs->Get_Job($id);

        }

        /**
         * Search for jobs
         * @param array $params Parameters to filter by (see http://developer.linkedin.com/documents/job-search-api)
         * @return SimpleXMLElement Job search results
         */
        public function Search_Jobs(array $params = [])
        {

            return $this->jobs->Search_Jobs($params);

        }

        /**
         * Get profile details
         * @param int $id Profile ID (leave as null for self)
         * @return SimpleXMLElement Profile details
         */
        public function Get_Profile($id)
        {

            return $this->people->Get_Profile($id);

        }

        /**
         * Get company details
         * @param int $id Company ID
         * @return SimpleXMLElement Company details
         */
        public function Get_Company($id = null)
        {

            return $this->companies->Get_Company($id);

        }

        /**
         * Get followed companies
         * @return SimpleXMLElement Followed companies
         */
        public function Get_Followed_Companies()
        {

            return $this->companies->Get_Followed_Companies();

        }

        /**
         * Follow a company
         * @param int $id Company ID
         * @return SimpleXMLElement Followed companies
         */
        public function Company_Follow($id)
        {

            return $this->companies->Company_Follow($id);

        }

        /**
         * Unfollow a company
         * @param int $id Company ID
         * @return SimpleXMLElement Followed companies
         */
        public function Company_Unfollow($id)
        {

            return $this->companies->Company_Unfollow($id);

        }

        /**
         * Get suggested companies
         * @return SimpleXMLElement Suggested companies
         */
        public function Get_Suggested_Companies()
        {

            return $this->companies->Get_Suggested_Companies();

        }

        /**
         * Get company products
         * @param int $id Company ID
         * @return SimpleXMLElement Company products
         */
        public function Get_Companies_Products($id)
        {

            return $this->companies->Get_Companies_Products($id);

        }

        /**
         * Get joined groups
         * @return SimpleXMLElement Joined groups
         */
        public function Get_Joined_Groups()
        {

            return $this->groups->Get_Joined_Groups();

        }

        /**
         * Get suggested groups
         * @return SimpleXMLElement Suggested groups
         */
        public function Get_Suggested_Groups()
        {

            return $this->groups->Get_Suggested_Groups();

        }

        /**
         * Get group details
         * @param int $id Group ID
         * @return SimpleXMLElement Group details
         */
        public function Get_Group($id = null)
        {

            return $this->groups->Get_Group($id);

        }

        /**
         * Join a group
         * @param int $id Group ID
         * @return SimpleXMLElement
         */
        public function Group_Join($id)
        {

            return $this->groups->Group_Join($id);

        }

        /**
         * Leave a group
         * @param int $id Group ID
         * @return SimpleXMLElement
         */
        public function Group_Leave($id)
        {

            return $this->groups->Group_Leave($id);

        }

        /**
         * Search for people
         * @param array $params Parameters to filter by (see http://developer.linkedin.com/documents/people-search-api)
         * @return SimpleXMLElement People search results
         */
        public function Search_People(array $params = [])
        {

            return $this->people->Search_People($params);

        }

        /**
         * Search for companies
         * @param array $params Parameters to filter by (see http://developer.linkedin.com/documents/company-search)
         * @return SimpleXMLElement Company search results
         */
        public function Search_Companies(array $params = [])
        {

            return $this->companies->Search_Companies($params);

        }

        /**
         * Get network updates for 1st degree connection updates
         * @param array $params Parameters to filter by (see https://developer.linkedin.com/documents/get-network-updates-and-statistics-api)
         * @return SimpleXMLElement Network updates
         */
        public function Get_Network_Updates(array $params = [])
        {

            return $this->social->Get_Network_Updates($params);

        }

        /**
         * Post network update
         * @param string $comment Comment to share
         * @param bool $connections_only True to share only with connections
         * @return SimpleXMLElement Network updates
         */
        public function Share_Update($comment, $connections_only = false)
        {

            return $this->social->Share_Update($comment, $connections_only);

        }

        /**
         * Return array of countries with ISO 3166 code and name
         * @return array
         */
        public function Get_Countries()
        {

            return [
                'AF' => 'Afghanistan',
                'AX' => 'Aland Islands',
                'AL' => 'Albania',
                'DZ' => 'Algeria',
                'AS' => 'American Samoa',
                'AD' => 'Andorra',
                'AO' => 'Angola',
                'AI' => 'Anguilla',
                'AQ' => 'Antarctica',
                'AG' => 'Antigua And Barbuda',
                'AR' => 'Argentina',
                'AM' => 'Armenia',
                'AW' => 'Aruba',
                'AU' => 'Australia',
                'AT' => 'Austria',
                'AZ' => 'Azerbaijan',
                'BS' => 'Bahamas',
                'BH' => 'Bahrain',
                'BD' => 'Bangladesh',
                'BB' => 'Barbados',
                'BY' => 'Belarus',
                'BE' => 'Belgium',
                'BZ' => 'Belize',
                'BJ' => 'Benin',
                'BM' => 'Bermuda',
                'BT' => 'Bhutan',
                'BO' => 'Bolivia',
                'BA' => 'Bosnia And Herzegovina',
                'BW' => 'Botswana',
                'BV' => 'Bouvet Island',
                'BR' => 'Brazil',
                'IO' => 'British Indian Ocean Territory',
                'BN' => 'Brunei Darussalam',
                'BG' => 'Bulgaria',
                'BF' => 'Burkina Faso',
                'BI' => 'Burundi',
                'KH' => 'Cambodia',
                'CM' => 'Cameroon',
                'CA' => 'Canada',
                'CV' => 'Cape Verde',
                'KY' => 'Cayman Islands',
                'CF' => 'Central African Republic',
                'TD' => 'Chad',
                'CL' => 'Chile',
                'CN' => 'China',
                'CX' => 'Christmas Island',
                'CC' => 'Cocos (Keeling) Islands',
                'CO' => 'Colombia',
                'KM' => 'Comoros',
                'CG' => 'Congo',
                'CD' => 'Congo, Democratic Republic',
                'CK' => 'Cook Islands',
                'CR' => 'Costa Rica',
                'CI' => 'Cote D\'Ivoire',
                'HR' => 'Croatia',
                'CU' => 'Cuba',
                'CY' => 'Cyprus',
                'CZ' => 'Czech Republic',
                'DK' => 'Denmark',
                'DJ' => 'Djibouti',
                'DM' => 'Dominica',
                'DO' => 'Dominican Republic',
                'EC' => 'Ecuador',
                'EG' => 'Egypt',
                'SV' => 'El Salvador',
                'GQ' => 'Equatorial Guinea',
                'ER' => 'Eritrea',
                'EE' => 'Estonia',
                'ET' => 'Ethiopia',
                'FK' => 'Falkland Islands (Malvinas)',
                'FO' => 'Faroe Islands',
                'FJ' => 'Fiji',
                'FI' => 'Finland',
                'FR' => 'France',
                'GF' => 'French Guiana',
                'PF' => 'French Polynesia',
                'TF' => 'French Southern Territories',
                'GA' => 'Gabon',
                'GM' => 'Gambia',
                'GE' => 'Georgia',
                'DE' => 'Germany',
                'GH' => 'Ghana',
                'GI' => 'Gibraltar',
                'GR' => 'Greece',
                'GL' => 'Greenland',
                'GD' => 'Grenada',
                'GP' => 'Guadeloupe',
                'GU' => 'Guam',
                'GT' => 'Guatemala',
                'GG' => 'Guernsey',
                'GN' => 'Guinea',
                'GW' => 'Guinea-Bissau',
                'GY' => 'Guyana',
                'HT' => 'Haiti',
                'HM' => 'Heard Island & Mcdonald Islands',
                'VA' => 'Holy See (Vatican City State)',
                'HN' => 'Honduras',
                'HK' => 'Hong Kong',
                'HU' => 'Hungary',
                'IS' => 'Iceland',
                'IN' => 'India',
                'ID' => 'Indonesia',
                'IR' => 'Iran, Islamic Republic Of',
                'IQ' => 'Iraq',
                'IE' => 'Ireland',
                'IM' => 'Isle Of Man',
                'IL' => 'Israel',
                'IT' => 'Italy',
                'JM' => 'Jamaica',
                'JP' => 'Japan',
                'JE' => 'Jersey',
                'JO' => 'Jordan',
                'KZ' => 'Kazakhstan',
                'KE' => 'Kenya',
                'KI' => 'Kiribati',
                'KR' => 'Korea',
                'KW' => 'Kuwait',
                'KG' => 'Kyrgyzstan',
                'LA' => 'Lao People\'s Democratic Republic',
                'LV' => 'Latvia',
                'LB' => 'Lebanon',
                'LS' => 'Lesotho',
                'LR' => 'Liberia',
                'LY' => 'Libyan Arab Jamahiriya',
                'LI' => 'Liechtenstein',
                'LT' => 'Lithuania',
                'LU' => 'Luxembourg',
                'MO' => 'Macao',
                'MK' => 'Macedonia',
                'MG' => 'Madagascar',
                'MW' => 'Malawi',
                'MY' => 'Malaysia',
                'MV' => 'Maldives',
                'ML' => 'Mali',
                'MT' => 'Malta',
                'MH' => 'Marshall Islands',
                'MQ' => 'Martinique',
                'MR' => 'Mauritania',
                'MU' => 'Mauritius',
                'YT' => 'Mayotte',
                'MX' => 'Mexico',
                'FM' => 'Micronesia, Federated States Of',
                'MD' => 'Moldova',
                'MC' => 'Monaco',
                'MN' => 'Mongolia',
                'ME' => 'Montenegro',
                'MS' => 'Montserrat',
                'MA' => 'Morocco',
                'MZ' => 'Mozambique',
                'MM' => 'Myanmar',
                'NA' => 'Namibia',
                'NR' => 'Nauru',
                'NP' => 'Nepal',
                'NL' => 'Netherlands',
                'AN' => 'Netherlands Antilles',
                'NC' => 'New Caledonia',
                'NZ' => 'New Zealand',
                'NI' => 'Nicaragua',
                'NE' => 'Niger',
                'NG' => 'Nigeria',
                'NU' => 'Niue',
                'NF' => 'Norfolk Island',
                'MP' => 'Northern Mariana Islands',
                'NO' => 'Norway',
                'OM' => 'Oman',
                'PK' => 'Pakistan',
                'PW' => 'Palau',
                'PS' => 'Palestinian Territory, Occupied',
                'PA' => 'Panama',
                'PG' => 'Papua New Guinea',
                'PY' => 'Paraguay',
                'PE' => 'Peru',
                'PH' => 'Philippines',
                'PN' => 'Pitcairn',
                'PL' => 'Poland',
                'PT' => 'Portugal',
                'PR' => 'Puerto Rico',
                'QA' => 'Qatar',
                'RE' => 'Reunion',
                'RO' => 'Romania',
                'RU' => 'Russian Federation',
                'RW' => 'Rwanda',
                'BL' => 'Saint Barthelemy',
                'SH' => 'Saint Helena',
                'KN' => 'Saint Kitts And Nevis',
                'LC' => 'Saint Lucia',
                'MF' => 'Saint Martin',
                'PM' => 'Saint Pierre And Miquelon',
                'VC' => 'Saint Vincent And Grenadines',
                'WS' => 'Samoa',
                'SM' => 'San Marino',
                'ST' => 'Sao Tome And Principe',
                'SA' => 'Saudi Arabia',
                'SN' => 'Senegal',
                'RS' => 'Serbia',
                'SC' => 'Seychelles',
                'SL' => 'Sierra Leone',
                'SG' => 'Singapore',
                'SK' => 'Slovakia',
                'SI' => 'Slovenia',
                'SB' => 'Solomon Islands',
                'SO' => 'Somalia',
                'ZA' => 'South Africa',
                'GS' => 'South Georgia And Sandwich Isl.',
                'ES' => 'Spain',
                'LK' => 'Sri Lanka',
                'SD' => 'Sudan',
                'SR' => 'Suriname',
                'SJ' => 'Svalbard And Jan Mayen',
                'SZ' => 'Swaziland',
                'SE' => 'Sweden',
                'CH' => 'Switzerland',
                'SY' => 'Syrian Arab Republic',
                'TW' => 'Taiwan',
                'TJ' => 'Tajikistan',
                'TZ' => 'Tanzania',
                'TH' => 'Thailand',
                'TL' => 'Timor-Leste',
                'TG' => 'Togo',
                'TK' => 'Tokelau',
                'TO' => 'Tonga',
                'TT' => 'Trinidad And Tobago',
                'TN' => 'Tunisia',
                'TR' => 'Turkey',
                'TM' => 'Turkmenistan',
                'TC' => 'Turks And Caicos Islands',
                'TV' => 'Tuvalu',
                'UG' => 'Uganda',
                'UA' => 'Ukraine',
                'AE' => 'United Arab Emirates',
                'GB' => 'United Kingdom',
                'US' => 'United States',
                'UM' => 'United States Outlying Islands',
                'UY' => 'Uruguay',
                'UZ' => 'Uzbekistan',
                'VU' => 'Vanuatu',
                'VE' => 'Venezuela',
                'VN' => 'Viet Nam',
                'VG' => 'Virgin Islands, British',
                'VI' => 'Virgin Islands, U.S.',
                'WF' => 'Wallis And Futuna',
                'EH' => 'Western Sahara',
                'YE' => 'Yemen',
                'ZM' => 'Zambia',
                'ZW' => 'Zimbabwe',
            ];

        }

    }

?>
