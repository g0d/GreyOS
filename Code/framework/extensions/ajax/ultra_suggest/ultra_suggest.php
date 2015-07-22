<?php

    /*
    
        GreyOS Inc. - AJAX ULTRA Suggest
        
        Version: 1.5
        
        File name: ultra_suggest.php
        Description: This file contains the AJAX - ULTRA Suggest extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    

    // Disable error reporting
    error_reporting(0);
    
    // Fetch web content
    if ($_POST['engine_url'])
    {
    
        $i = 1;
        
        $res_array = array();
        
        $url = str_replace(' ', ',', $_POST['engine_url']);
        
        $con = curl_init($url);
        
        curl_setopt($con, CURLOPT_RETURNTRANSFER, 1);
        
        $result = curl_exec($con);
        
        curl_close($con);
        
        // Exit on error
        if (strstr($result, '400'))
            return false;
        
        $res_array = explode('suggestion:', $result);
        
        foreach ($res_array as $this_res)
        {
        
            foreach (explode('query:', $this_res) as $query_res)
            {
            
                foreach (explode('details:', $query_res) as $the_value_res)
                {

                    foreach (explode('value:', $the_value_res) as $this_value)
                    {
                    
                        // Exit on error
                        if (strstr($this_value, 'stats:'))
                            return false;
                        
                        echo '<span id="res_'. $i . '" 
                                    onmousedown="US_Select_This(' . '\'' . 'res_' . $i . '\'' . ', event);" ' . 
                             'style="cursor: pointer;">' . 
                             substr($this_value, 1, strpos($this_value, 'interpretation') - 3) . '</span> ';
                    
                    }
                    
                }
                
                if ($i > 2)
                    echo '<br/>';
                
                $i++;
            }
        
        }
    
    }
    
    else
        return false;

?>
