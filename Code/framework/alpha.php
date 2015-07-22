<?php

    /*
    
        GreyOS - ALPHA Framework
        
        Version: 10.0
        
        File name: alpha.php
        Description: This file contains the ALPHA class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    // Include DATABASE class
    require('database.php');
    
    // Include UTILITY class
    require('utility.php');
    
    // Include MVC class
    require('mvc.php');
    
    // Include LANGUAGE class
    require('language.php');
    
    // ALPHA class
    class ALPHA
    {
    
        // Absolute_Path - UTILITY::Absolute_Path front-end
        public static function Absolute_Path($file_path)
        {
        
            $alpha_result = UTILITY::Absolute_Path($file_path);

            return $alpha_result;

        }
        
        // Set_Language - LANGUAGE::Set_Lang front-end
        public static function Set_Language($lang_code)
        {

            $alpha_result = LANGUAGE::Set_Lang($lang_code);

            return $alpha_result;

        }

        // Get_Language - LANGUAGE::Get_Lang front-end
        public static function Get_Language()
        {

            $alpha_result = LANGUAGE::Get_Lang();

            return $alpha_result;

        }

        // DB_Connect - DATABASE::Connect front-end
        public static function DB_Connect($user, $pass, $domain, $db, $port = 3306)
        {
        
            $alpha_result = DATABASE::Connect($user, $pass, $domain, $db, $port);
            
            return $alpha_result;
        
        }
        
        // DB_Disconnect - DATABASE::Disconnect front-end
        public static function DB_Disconnect($connection_id)
        {
        
            $alpha_result = DATABASE::Disconnect($connection_id);
            
            return $alpha_result;
        
        }
        
        // Store_DB_Connection_Connection - DATABASE::Store_DB_Connection front-end
        public static function Store_DB_Connection($user, $pass, $domain, $db, $port, $conf_file)
        {

            $alpha_result = DATABASE::Store_DB_Con($user, $pass, $domain, $db, $port, $conf_file);
            
            return $alpha_result;

        }
        
        // Restore_DB_Connection_Connection - DATABASE::Restore_DB_Con front-end
        public static function Restore_DB_Connection()
        {
        
            $alpha_result = array();

            $alpha_result = DATABASE::Restore_DB_Con();

            return $alpha_result;
        
        }
        
        // Use_DB_Connection_Connection - DATABASE::Use_DB_Con front-end
        public static function Use_DB_Connection()
        {

            $alpha_result = DATABASE::Use_DB_Con();

            return $alpha_result;

        }
        
        // Delete_DB_Connection_Connection - DATABASE::Delete_DB_Con front-end
        public static function Delete_DB_Connection()
        {

            $alpha_result = DATABASE::Delete_DB_Con();
            
            return $alpha_result;

        }
        
        // Execute_SQL - DATABASE::Exec_SQL front-end
        public static function Execute_SQL($sql_com)
        {

            $alpha_result = array();

            $alpha_result = DATABASE::Exec_SQL($sql_com);

            return $alpha_result;

        }

        // Execute_SQL_Script - DATABASE::Exec_SQL_Script front-end
        public static function Execute_SQL_Script($sql_file)
        {

            $alpha_result = array();

            $alpha_result = DATABASE::Exec_SQL_Script($sql_file);

            return $alpha_result;

        }
        
        // MVC_Go_To - Go to a virtual MVC route passing any arguments
        public static function MVC_Go_To($mvc_route, $mvc_args = null)
        {
        
            $alpha_result = MVC::Route($mvc_route, $mvc_args);
            
            return $alpha_result;

        }
        
        // MVC_Setup_Route - MVC::Set_Route front-end
        public static function MVC_Setup_Route($mvc_route)
        {

            $alpha_result = MVC::Set_Route($mvc_route);

            return $alpha_result;
        
        }
        
        // MVC_Get_Route - MVC::Get_Route front-end
        public static function MVC_Get_Route($option)
        {

            $alpha_result = MVC::Get_Route($option);

            return $alpha_result;

        }
        
        // MVC_Store_Content - MVC::Store_Variable front-end
        public static function MVC_Store_Content($mvc_var, $content)
        {
        
            $alpha_result = MVC::Store_Variable($mvc_var, $content);

            return $alpha_result;
        
        }

        // MVC_Show_Content - MVC::Restore_Variable front-end
        public static function MVC_Show_Content($mvc_var)
        {

            $alpha_result = MVC::Restore_Variable($mvc_var);
            
            return $alpha_result;
        
        }
        
        // Convert_Array_To_XML - UTILITY::Convert_Array_To_XML front-end
        public static function Convert_Array_To_XML($element, $data_array, $xml_file)
        {
        
            $alpha_result = UTILITY::Convert_Array_To_XML($element, $data_array, $xml_file);
            
            return $alpha_result;
        
        }
        
        // Convert_XML_To_Array - UTILITY::Convert_XML_To_Array front-end
        public static function Convert_XML_To_Array($xml, $callback = null, $recursive = false)
        {

            $alpha_result = array();

            $alpha_result = UTILITY::Convert_XML_To_Array($xml, $callback, $recursive);

            return $alpha_result;

        }
        
        // Process_Dir - UTILITY::Process_Dir front-end
        public static function Process_Dir($dir, $recursive = false)
        {

            $alpha_result = array();

            $alpha_result = UTILITY::Process_Dir($dir, $recursive);

            return $alpha_result;

        }
        
        // Delete_Dir - UTILITY::Delete_Dir front-end
        public static function Delete_Dir($dir)
        {
        
            $alpha_result = UTILITY::Delete_Dir($dir);
            
            return $alpha_result;
        
        }
        
        // Load_Extension - UTILITY::Load_Extension front-end
        public static function Load_Extension($extension, $ext_type)
        {

            $alpha_result = UTILITY::Load_Extension($extension, $ext_type);

            return $alpha_result;

        }
    
    }

?>
