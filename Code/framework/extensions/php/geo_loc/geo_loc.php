<?php

    /*

        GreyOS Inc. - Geo Location
        
        Version: 1.0
        
        File name: geo_loc.php
        Description: This file contains the Geo Location extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
   
    */
    
    
    
    // Geo location - IP to country code
    function Geo_Loc_IP_To_Country_Code($ip)
    {
    
        $con = curl_init('http://www.greyos.gr/tools/other/ip-to-country-code');

        $post_fields_array = array('ip' => $ip);

        $post_fields_json = array('json' => json_encode($post_fields_array));

        curl_setopt($con, CURLOPT_POST, 1);
        curl_setopt($con, CURLOPT_POSTFIELDS, $post_fields_json);
        curl_setopt($con, CURLOPT_RETURNTRANSFER, 1);

        $result = curl_exec($con);

        curl_close($con);

        return $result;
    
    }

?>
