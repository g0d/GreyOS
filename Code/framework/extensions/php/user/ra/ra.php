<?php
    /*
        RA (Easy ORM & Secure SQL)

        File name: ra.php (Version: 1.2)
        Description: This file contains the RA extension.
        Dependencies: micro-MVC framework, MS-SQL.

		Coded by George Delaportas (G0D)
		Copyright (C) 2020 - 2025
		Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    require_once('classes/orm.php');
    require_once('classes/sql.php');

    // RA class
    class RA
    {
        private static $sql_types_array = ['my', 'ms'];

        public static function ORM($sql_type)
        {
            if (!in_array($sql_type, self::$sql_types_array))
                return false;

            return new ORM($sql_type);
        }

        public static function SQL($sql_type)
        {
            if (!in_array($sql_type, self::$sql_types_array))
                return false;

            return new SQL($sql_type);
        }
    }
?>
