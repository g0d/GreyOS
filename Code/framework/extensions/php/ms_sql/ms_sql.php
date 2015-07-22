<?php

    /*
    
        GreyOS Inc. - MS SQL
        
        Version: 1.0
        
        File name: ms_sql.php
        Description: This file contains the MS SQL extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    

    // MS SQL class
    class MS_SQL
    {

        // Shared database connection
        private static $__db_con = null;

        // Connect to the database
        public static function Connect($user, $pass, $domain, $db)
        {

            ini_set('mssql.charset', 'UTF-8');

            $mssql_con = mssql_connect($domain, $user, $pass);

            if ($mssql_con === false)
                return false;

            $mssql_db = mssql_select_db($db);

            if ($mssql_db === false)
            {

                $mssql_result = self::Disconnect($mssql_con);

                return false;

            }

            self::$__db_con = $mssql_con;

            return self::$__db_con;

        }

        // Disconnect from the database
        public static function Disconnect($connection_id)
        {

            if (empty($connection_id))
                return false;

            $mssql_dis = mssql_close($connection_id);

            if ($mssql_dis === false)
                return false;

            self::$__db_con = null;

            return true;

        }
        
        // Execute SQL commands
        public static function Exec_SQL($sql_com)
        {

            $mssql_result = mssql_query($sql_com, self::$__db_con);

            if ($mssql_result === false)
                return false;

            $final_result = array();

            if (!is_bool($mssql_result))
            {

                while ($mssql_row = mssql_fetch_array($mssql_result))
                    $final_result[] = $mssql_row;

            }

            return $final_result;

        }

        // Execute SQL script files
        public static function Exec_SQL_Script($sql_file)
        {

            $file_handler = fopen(ALPHA_CMS::Absolute_Path($sql_file), 'r');

            if ($file_handler === false)
                return false;

            $mssql_query = '';

            $mssql_result = array();

            while(!feof($file_handler))
            {

                $this_line = fgets($file_handler);

                if (trim($this_line) != '' && strpos($this_line, '--') === false)
                {

                    $mssql_query .= $this_line;

                    if (preg_match("/;[\040]*\$/", $this_line))
                    {

                        $mssql_result = self::Exec_SQL($mssql_query);

                        $mssql_query = '';

                    }

                }

            }

            fclose($file_handler);

            return $mssql_result;

        }

    }

?>
