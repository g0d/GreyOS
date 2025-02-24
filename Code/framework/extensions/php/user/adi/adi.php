<?php
    /*
        Active Directory Integration (ADi)

        File name: adi.php (Version: 0.1)
        Description: This file contains the ADi extension.

		Coded by George Delaportas (G0D)
		Copyright (C) 2017
		Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // ADi class
    class ADI
    {
        // Shared flags
        private static $__ldap_conn = false;

        // Initialize a connection to Active Directory
        public static function Init($ldap_host, $ldap_port = 389)
        {
            self::$__ldap_conn = ldap_connect($ldap_host, $ldap_port);

            return self::$__ldap_conn;
        }

        // Connect to Active Directory
        public static function Connect($domain, $username, $password)
        {
            if (self::$__ldap_conn === false)
                return false;

            $result = ldap_bind(self::$__ldap_conn, $domain . '\\' . $username, $password);

            return $result;
        }

        // Disconnect from Active Directory
        public static function Disconnect()
        {
            if (self::$__ldap_conn === false)
                return false;

            $result = ldap_unbind(self::$__ldap_conn);

            self::$__ldap_conn = false;

            return $result;
        }

        // Fetch details from Active Directory
        public static function Details($fullname)
        {
            if (self::$__ldap_conn === false)
                return false;

            $ldap_tree = 'CN=' . $fullname;

            $result = ldap_search(self::$__ldap_conn, $ldap_tree, '(cn=*)');

            return ldap_get_entries(self::$__ldap_conn, $result);
        }
    }
?>
