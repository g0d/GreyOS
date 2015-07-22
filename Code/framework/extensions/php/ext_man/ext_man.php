<?php

    /*

        GreyOS Inc. - Extensions Manager
        
        Version: 1.5
        
        File name: ext_man.php
        Description: This file contains the Extensions Manager extension.
        
        Coded by Konstantinos Gkoutzis (KGK) & George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
   
    */
    
    
    
    // List all the available extensions
    function Show_Extensions($dir, $type, $order_type = null, $sort_type = null, $search = null)
    {
    
        if (!is_dir($dir = $dir . $type))
            return array();
        
        for ($list = array(), $file_handler = opendir($dir); (($file = readdir($file_handler)) != false);)
        
        if (($file != '.' && $file != '..') && (file_exists($path = $dir . '/' . $file)))
        {
        
            if (!empty($search))
            {
            
                if (stristr($file, $search) !== false)
                {
                
                    if (is_dir($path))
                    {

                        $key = count($list);

                        $list[$key][0] = $file;
                        $list[$key][1] = $path;
                        $list[$key][2] = $type;
                        $list[$key][3] = 'N/A';
                        $list[$key][4] = 'NO';

                        if (file_exists($xml_file_name = $list[$key][1] . '/' . $list[$key][0] . '.xml'))
                        {

                            $xml_config = ALPHA_CMS::Convert_XML_To_Array($xml_file_name);

                            if (isset($xml_config['status']))
                                $list[$key][3] = $xml_config['status'];

                            if (isset($xml_config['protected']))
                                $list[$key][4] = $xml_config['protected'];

                        }

                    }
                
                }
            
            }
            
            else
            {
            
                if (is_dir($path))
                {

                    $key = count($list);

                    $list[$key][0] = $file;
                    $list[$key][1] = $path;
                    $list[$key][2] = $type;
                    $list[$key][3] = 'N/A';
                    $list[$key][4] = 'NO';

                    if (file_exists($xml_file_name = $list[$key][1] . '/' . $list[$key][0] . '.xml'))
                    {

                        $xml_config = ALPHA_CMS::Convert_XML_To_Array($xml_file_name);

                        if (isset($xml_config['status']))
                            $list[$key][3] = $xml_config['status'];

                        if (isset($xml_config['protected']))
                            $list[$key][4] = $xml_config['protected'];

                    }

                }
            
            }
        
        }
        
        closedir($file_handler);
        
        if (!empty($order_type) && !empty($sort_type))
        {
        
            if ($order_type == 'title')
                usort($list, 'Order_Array_Title');
            
            elseif ($order_type == 'path')
                usort($list, 'Order_Array_Path');
            
            elseif ($order_type == 'type')
                usort($list, 'Order_Array_Type');
            
            elseif ($order_type == 'status')
                usort($list, 'Order_Array_Status');
            
            else
                usort($list, 'Order_Array_Protected');
            
            if ($sort_type == 'DESC')
                $list = array_reverse ($list, true);
        
        }
        
        return $list;
    
    }
    
    // Order an array by title
    function Order_Array_Title($a, $b)
    {
    
        $result = strcmp($a[0], $b[0]);
        
        return $result;
    
    }
    
    // Order an array by path
    function Order_Array_Path($a, $b)
    {
    
        $result = strcmp($a[1], $b[1]);
        
        return $result;
    
    }
    
    // Order an array by type
    function Order_Array_Type($a, $b)
    {
    
        $result = strcmp($a[2], $b[2]);
        
        return $result;
    
    }
    
    // Order an array by status
    function Order_Array_Status($a, $b)
    {
    
        $result = strcmp($a[3], $b[3]);
        
        return $result;
    
    }
    
    // Order an array by protected
    function Order_Array_Protected($a, $b)
    {
    
        $result = strcmp($a[4], $b[4]);
        
        return $result;
    
    }

?>
