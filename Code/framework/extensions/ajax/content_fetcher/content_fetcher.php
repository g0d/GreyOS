<?php

    /*
    
        GreyOS Inc. - AJAX Content Fetcher
        
        Version: 1.5
        
        File name: content_fetcher.php
        Description: This file contains the AJAX Content Fetcher extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    

    // Disable error reporting
    error_reporting(0);

    // Disable caching
    header('Cache-Control: no-cache, must-revalidate'); // HTTP 1.1
    header('Expires: Sat, 26 Jul 1997 05:00:00 GMT'); // Date in the past
    
    // Fetch web content
    if ($_POST['content_url'])
    {
    
        $url = $_POST['content_url'];
        
        $con = curl_init($url);
        
        curl_setopt($con, CURLOPT_RETURNTRANSFER, 1);
        
        $result = curl_exec($con);
        
        curl_close($con);
        
        echo $result;
    
    }
    
    else
        return null;

?>
