<?php

    /*
    
        GreyOS Inc. - Mongo DB
        
        Version: 1.0
        
        File name: mongo_db.php
        Description: This file contains the Mongo DB extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Mongo DB class
    class Mongo_DB
    {
    
        // Shared database connection
        private static $__db_con = null;
        
        // Connect to the database
        public static function Connect($domain = '127.0.0.1', $port = 27017, $user = null, $pass = null)
        {
        
            if (!empty($user) && !empty($pass))
                $mongo_db_con = new MongoClient($user . ':' . $pass . '@mongodb://' . $domain . ':' . $port);

            else
                $mongo_db_con = new MongoClient('mongodb://' . $domain . ':' . $port);
            
            if ($mongo_db_con === false)
                return false;
            
            self::$__db_con = $mongo_db_con;
            
            return self::$__db_con;
        
        }
        
        // Disconnect from the database
        public static function Disconnect($connection_id)
        {
        
            if (empty($connection_id))
                return false;
            
            $mongo_db_dis = self::$__db_con->close($connection_id);
            
            if ($mongo_db_dis === false)
                return false;
            
            self::$__db_con = null;
            
            return true;
        
        }
    
    }

?>
