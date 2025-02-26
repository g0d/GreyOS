<?php

    /*

        GreyOS Inc. - Linkedin PHP extension

        Version: 1.0

        File name: groups.php
        Description: This file contains the Linkedin PHP extension

        Coded by Arron Bailiss (abailiss)
        GreyOS Inc.
        Copyright © 2014

    */



    require_once(UTILS::Absolute_Path('framework/extensions/php/i_linkedin/classes/base.php'));

    /**
     * Class GROUPS
     * Provides Groups API functionality (see https://developer.linkedin.com/documents/groups)
     */
    class GROUPS extends BASE
    {

        const JOINED_GROUPS_URL = 'https://api.linkedin.com/v1/people/~/group-memberships';
        const SUGGESTED_GROUPS_URL = 'https://api.linkedin.com/v1/people/~/suggestions/groups';
        const GROUP_URL = 'https://api.linkedin.com/v1/groups/';
        const JOIN_GROUP_URL = 'https://api.linkedin.com/v1/people/~/group-memberships/';

        /**
         * Get joined groups
         * @return SimpleXMLElement Joined groups
         */
        public function Get_Joined_Groups()
        {

            $field_selectors = ':(group:(id,name),membership-state,show-group-logo-in-profile,'
                             . 'allow-messages-from-members,email-digest-frequency,email-announcements-from-managers,'
                             . 'email-for-every-new-post)';

            return $this->Do_Request(self::JOINED_GROUPS_URL . $field_selectors);

        }

        /**
         * Get suggested groups
         * @return SimpleXMLElement Suggested groups
         */
        public function Get_Suggested_Groups()
        {

            $field_selectors = ':(id,name,is-open-to-non-members)';

            return $this->Do_Request(self::SUGGESTED_GROUPS_URL . $field_selectors);

        }

        /**
         * Get group details
         * @param int $id Group ID
         * @return SimpleXMLElement Group details
         */
        public function Get_Group($id)
        {

            $field_selectors = ':(id,name,short-description,description,relation-to-viewer,'
                             . 'posts,counts-by-category,is-open-to-non-members,category,website-url,locale,location,'
                             . 'allow-member-invites,site-group-url,small-logo-url,large-logo-url)';

            return $this->Do_Request(self::GROUP_URL . $id . $field_selectors);

        }

        /**
         * Join a group
         * @param int $id Group ID
         * @return SimpleXMLElement
         */
        public function Group_Join($id)
        {

            $xml = <<<XML
<group-membership>
  <membership-state>
    <code>member</code>
  </membership-state>
</group-membership>
XML;

            return $this->Do_Request(self::JOIN_GROUP_URL . $id, $xml, 'put');

        }

        /**
         * Leave a group
         * @param int $id Group ID
         * @return SimpleXMLElement
         */
        public function Group_Leave($id)
        {

            return $this->Do_Request(self::JOIN_GROUP_URL . $id, [], 'delete');

        }

    }

?>
