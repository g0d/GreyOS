<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: social.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    require_once(UTILS::Absolute_Path('framework/extensions/php/i_linkedin/classes/base.php'));

    /**
     * Class SOCIAL
     * Provides Social API functionality (see https://developer.linkedin.com/documents/share-and-social-stream)
     */
    class SOCIAL extends BASE
    {

        const NETWORK_UPDATES_URL = 'https://api.linkedin.com/v1/people/~/network/updates';
        const SHARE_URL = 'https://api.linkedin.com/v1/people/~/shares';

        /**
         * Get network updates for 1st degree connection updates
         * @param array $params Parameters to filter by (see https://developer.linkedin.com/documents/get-network-updates-and-statistics-api)
         * @return SimpleXMLElement Network updates
         */
        public function Get_Network_Updates(array $params = [])
        {

            $allowed_params = ['before'];
            $filtered_params = $this->Filter_Params($params, $allowed_params);

            return $this->Do_Request(self::NETWORK_UPDATES_URL . '?' . http_build_query($filtered_params, '', '&', PHP_QUERY_RFC3986));

        }

        /**
         * Post network update
         * @param string $comment Comment to share
         * @param bool $connections_only True to share only with connections
         * @return SimpleXMLElement Network updates
         */
        public function Share_Update($comment, $connections_only = false)
        {

            $visibility_code = $connections_only ? 'anyone' : 'connections-only';

            $xml = <<<XML
<share>
  <comment>$comment</comment>
  <visibility>
    <code>$visibility_code</code>
  </visibility>
</share>
XML;

            return $this->Do_Request(self::SHARE_URL, $xml);

        }

    }

?>
