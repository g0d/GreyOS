<?php
    /*
        micro-MVC
        
        File name: db.php
        Description: This file contains the "DB" class.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // DB class
    class DB
    {
        /** @var static Shared DB connection */
        private static $__db_con = null;
        
        /** @var static Shared result set identifier */
        private static $__result_set_id = null;
        
        /** @var static Shared database configuration file */
        private static $__db_conf = 'framework/config/db.cfg';
        
        /**
        * DB::Connect - Grants you access to a MySQL RDBMS
        *
        * @param string $user RDBMS user
        * @param string $pass RDBMS password
        * @param string $domain Domain name or IP where RDBMS is installed
        * @param string $db Database you want to work on after connection is established (optional parameter / default: null)
        * @param int $port RDBMS port number (optional parameter / default: 3306)
        *
        * @return resource A connection ID for the RDBS
        */
        public static function Connect($user, $pass, $domain, $db = null, $port = 3306)
        {
            if (empty($user) || empty($domain))
                return false;
            
            $mysql_con = mysqli_connect($domain, $user, $pass, $db, $port);
            
            if ($mysql_con === false)
                return false;
            
            $mysql_result = mysqli_set_charset($mysql_con, 'utf8');
            
            if ($mysql_result === false)
                return false;
            
            if (mysqli_error($mysql_con) != '')
            {
                self::Disconnect($mysql_con);
                
                return false;
            }
            
            self::$__db_con = $mysql_con;
            
            return self::$__db_con;
        }
        
        /**
        * DB::Disconnect - Close connection to a MySQL RDBMS
        *
        * @param string $connection_id A connection ID for the RDBS
        *
        * @return bool
        */
        public static function Disconnect($connection_id)
        {
            if (empty($connection_id))
                return false;
            
            $mysql_dis = mysqli_close($connection_id);
            
            if ($mysql_dis === false)
                return false;
            
            self::$__db_con = null;
            
            return true;
        }
        
        /**
        * DB::Store_Connection - Store a conection ID for a MySQL RDBMS
        *
        * @param string $user RDBMS user
        * @param string $pass RDBMS password
        * @param string $domain Domain name or IP where RDBMS is installed
        * @param string $db Database you want to work on after connection is established (optional parameter / default: null)
        * @param int $port RDBMS port number (optional parameter / default: 3306)
        *
        * @return bool
        */
        public static function Store_Connection($user, $pass, $domain, $db = null, $port = 3306)
        {
            if (empty($user) || empty($domain) || empty($db))
                return false;
            
            $file_handler = fopen(UTIL::Absolute_Path(self::$__db_conf), 'w');
            
            if ($file_handler === false)
                return false;
            
            $access = fputs($file_handler, $user . ':' . $pass . ':' . $domain . ':' . $db . ':' . $port);
            
            fclose($file_handler);
            
            if ($access === false)
                return false;
            
            return true;
        }
        
        /**
        * DB::Restore_Connection - Restore a connection to MySQL RDBMS
        *
        * @return array Array of connection parameters
        */
        public static function Restore_Connection()
        {
            $result = array();
            
            $file_handler = fopen(UTIL::Absolute_Path(self::$__db_conf), 'r');
            
            if ($file_handler === false)
                return false;
            
            $buffer = fgets($file_handler);
            
            fclose($file_handler);
            
            if ($buffer === false)
                return false;
            
            $result = explode(':', $buffer);
            
            return $result;
        }
        
        /**
        * DB::Use_Connection - Use an already initialized connection to MySQL RDBMS
        *
        * @return resource A connection ID for the RDBS
        */
        public static function Use_Connection()
        {
            if (empty(self::$__db_con))
            {
                $con_array = array();
                
                $con_array = self::Restore_Connection();
                
                if ($con_array === false)
                    return false;
                
                $mysql_con = self::Connect($con_array[0], $con_array[1], $con_array[2], $con_array[3], $con_array[4]);
                
                if ($mysql_con === false)
                    return false;
                
                self::$__db_con = $mysql_con;
            }
            
            return self::$__db_con;
        }
        
        /**
        * DB::Delete_Connection - Delete connection to MySQL RDBMS
        *
        * @return bool
        */
        public static function Delete_Connection()
        {
            $file_handler = fopen(UTIL::Absolute_Path(self::$__db_conf), 'w');
            
            if ($file_handler === false)
                return false;
            
            $access = fputs($file_handler, '0');
            
            fclose($file_handler);
            
            if ($access === false)
                return false;
            
            self::$__db_conf = null;
            self::$__db_con = null;
            
            return true;
        }
        
        /**
        * DB::Exec_SQL_Command - Execute an SQL command
        *
        * @param string $sql_com An SQL query
        *
        * @return mixed
        */
        public static function Exec_SQL_Command($sql_com)
        {
            if (empty($sql_com))
                return false;
            
            $mysql_con = self::Use_Connection();
            
            if ($mysql_con === false)
                return false;
            
            $mysql_result = mysqli_query($mysql_con, $sql_com);
            
            if ($mysql_result === false)
                return false;
            
            self::$__result_set_id = $mysql_result;
            
            if (!is_bool($mysql_result))
            {
                $array_result = array();
                
                while ($mysql_row = mysqli_fetch_array($mysql_result))
                    $array_result[] = $mysql_row;
                
                $mysql_result = $array_result;
            }
            
            return $mysql_result;
        }
        
        /**
        * DB::Exec_SQL_Script - Execute an SQL script
        *
        * @param string $sql_file An SQL file
        *
        * @return mixed
        */
        public static function Exec_SQL_Script($sql_file)
        {
            if (empty($sql_file))
                return false;
            
            $mysql_multi_query = file_get_contents($sql_file);
            
            if ($mysql_multi_query === false)
                return false;
            
            $mysql_con = self::Use_Connection();
            
            if ($mysql_con === false)
                return false;
            
            $mysql_result = mysqli_multi_query($mysql_con, $mysql_multi_query);
            
            self::Disconnect($mysql_con);
            
            return $mysql_result;
        }
        
        /**
        * DB::Get_Object - Get an object representation (class) of an SQL table
        *
        * @param string $class An SQL table
        *
        * @return object
        */
        public static function Get_Object($class)
        {
            if (empty(self::$__result_set_id) || empty($class))
                return false;
            
            $result = array();
            
            while ($object = mysqli_fetch_object(self::$__result_set_id, $class))
                $result[] = $object;
            
            return $result;
        }
    }
?>
