<?php

    /*

        GreyOS Inc. - G Load Extension

        Version: 1.0

        File name: g_load_ext.php
        Description: This file contains the G Load Extension utility.

        Coded by Konsantinos Gkoutzis (GKG)
        
        GreyOS Inc.
        Copyright © 2013

    */



    $EXT_PATH = "framework/extensions/"; // The path to the extensions

    /** 
    * G_Load_Ext v2.1
    * Loads the requested extension(s)
    * @param extName The name of the extension or "all".
    * @param extType The type of the extension (php, js or ajax).
    * @return True on success, False on failure.
    */
    function G_Load_Ext($extName, $extType)
    {
    
        global $EXT_PATH;
        
        if ($extName==null || empty($extName)) // Wrong extension name
            return false;

        switch ($extType)
        {
            default: // Unknown file extension
                return false;
            case "php":
                if ($extName=="all") // prepares all php extensions
                    $extToLoad = getFirstLevelExt(ALPHA_CMS::Absolute_Path($EXT_PATH.$extType));
                else // Prepares only one php extension
                    $extToLoad = array(ALPHA_CMS::Absolute_Path($EXT_PATH).$extType."/".$extName."/".$extName.".");

                if ($extToLoad!=null && !empty($extToLoad))
                    foreach ($extToLoad as $curExt)
                        if (file_exists($curExt.$extType))
                            require_once($curExt.$extType); // Load the php extension(s)
                break; // Done with php
            case "js":
            case "ajax": // Js is merged with ajax
                if ($extName=="all") // Prepares all js/ajax extensions
                    $extToLoad = getFirstLevelExt($EXT_PATH.$extType);
                else // Prepares only one js/ajax extension
                    $extToLoad = array($EXT_PATH.$extType."/".$extName."/".$extName.".");

                if ($extToLoad!=null && !empty($extToLoad))
                    foreach ($extToLoad as $curExt)
                        if (file_exists($_SERVER['DOCUMENT_ROOT']."/".$curExt."js")) // Force file extension
                            echo "<script type=\"text/javascript\" src=\""."/".$curExt."js"."\"></script>\n\t"; // Load the js/ajax extension(s)
        }

        return true;
    }

    /**  
    * getFirstLevelExt v1.0
    * Retrieve the first-level extension(s) of a directory
    * @param dir The name of the directory.
    * @return Array with strings on success, null on failure.
    */
    function getFirstLevelExt($dir)
    {
        if (!is_dir($dir))
            return null;

        for ($list = array(), $handle = opendir($dir); (($file = readdir($handle)) != false);)
            if (($file != "." && $file != "..") && (file_exists($path = $dir . "/" . $file)))
                if (is_dir($path))
                    $list[] = $path."/".$file."."; // Full path, no filename extension yet
        closedir($handle);

        return $list;
    }

?>

