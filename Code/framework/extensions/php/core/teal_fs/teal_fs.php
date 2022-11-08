<?php
    /*
        Teal FS (VFS for GreyOS)
        
        File name: teal_fs.php (Version: 1.0)
        Description: This file contains the Teal FS - VFS extension.
        
        Coded by George Delaportas (G0D)
        Copyright (c) 2022
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // Teal FS class
    class TEAL_FS
    {
        public static function Read($filename)
        {
            return;
        }

        public static function Write($filename, $mode = 'replace',)
        {
            return;
        }

        public static function Move($old_filename, $new_filename, $mode = 'copy')
        {
            return;
        }

        public static function Delete($filename)
        {
            return;
        }

        public static function Close($filename)
        {
            return;
        }

        public static function Link($original_filename, $linked_filename)
        {
            return;
        }

        public static function Permissions($filename, $set = false)
        {
            return;
        }

        public static function Metadata($filename, $set = false)
        {
            return;
        }

        public static function List($path)
        {
            return;
        }
    }
?>
