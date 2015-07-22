<?php

    /*
    
        GreyOS - ALPHA Framework
        
        Version: 10.0
        
        File name: utility.php
        Description: This file contains the UTILITY class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    

    
    // UTILITY class
    class UTILITY
    {
    
        // Absolute system path of a relative file path
        public static function Absolute_Path($file_path = null)
        {
        
            $final_path = $_SERVER['DOCUMENT_ROOT'] . '/' . $file_path;
            
            if (file_exists($final_path) === false)
                return null;
            
            return $final_path;
        
        }
        
        // Convert any associative array mapped with one or more elements to an XML
        public static function Convert_Array_To_XML($elements, $data_array, $xml_file)
        {
        
            if (empty($elements) || empty($data_array) || empty($xml_file))
                return false;
            
            $file_handler = fopen($xml_file, 'w');
            
            if ($file_handler === false)
                return false;
            
            $xml_writer = new XMLWriter();
            $xml_writer->openMemory();
            $xml_writer->setIndent(true);
            $xml_writer->startDocument('1.0', 'UTF-8');
            
            if (is_array($elements))
            {
            
                if (count($elements) > count($data_array) || count($elements) < count($data_array))
                    return false;
                
                $i = 0;
                
                foreach ($elements as $this_element)
                {
                
                    $xml_writer->startElement($this_element);
                    $xml_writer->writeElement($data_array[$i][0], $data_array[$i][1]);
                    $xml_writer->endElement();
                    
                    $i++;
                
                }
            
            }
            
            else
            {
            
                $xml_writer->startElement($elements);
                
                foreach ($data_array as $this_val)
                    $xml_writer->writeElement($this_val[0], $this_val[1]);
                
                $xml_writer->endElement();
            
            }
            
            $xml_writer->endDocument();
            
            $access = fputs($file_handler, $xml_writer->outputMemory());
            
            fclose($file_handler);
            
            if ($access === false)
                return false;
            
            return true;
        
        }
        
        // Convert any valid XML file into an associative array map
        public static function Convert_XML_To_Array($xml, $callback = null, $recursive = false)
        {
        
            $new_data = (!$recursive && file_get_contents($xml))? simplexml_load_file($xml): $xml;
            
            if ($new_data instanceof SimpleXMLElement)
                $new_data = (array)$new_data;
            
            if (is_array($new_data))
            {
            
                foreach ($new_data as &$item)
                    $item = self::Convert_XML_To_Array($item, $callback, true);
            
            }
            
            return (!is_array($new_data) && is_callable($callback))? call_user_func($callback, $new_data): $new_data;
        
        }
        
        // Process a directory
        public static function Process_Dir($dir, $recursive = false)
        {
        
            if (is_dir($dir))
            {
            
                for ($list = array(), $handle = opendir($dir); (($file = readdir($handle)) != false);)
                {
                
                    if (($file != '.' && $file != '..') && (file_exists($path = $dir . '/' . $file)))
                    {
                    
                        if (is_dir($path) && ($recursive))
                            $list = array_merge($list, self::Process_Dir($path, true));
                        
                        else
                        {
                        
                            $entry = array('filename' => $file, 'dirpath' => $dir);

                            $entry['modtime'] = filemtime($path);
                            
                            if (!is_dir($path))
                            {
                            
                                $entry['size'] = filesize($path);
                                
                                if (strstr(pathinfo($path, PATHINFO_BASENAME), 'log'))
                                {
                                
                                    if (!$entry['handle'] = fopen($path, 'r'))
                                        $entry['handle'] = "ERROR";
                                
                                }
                            
                            }
                            
                            $list[] = $entry;
                        
                        }
                    
                    }
                
                }
                
                closedir($handle);
                
                return $list;
            
            }
            
            else
                return false;
        
        }
        
        // Recursively delete directories
        public static function Delete_Dir($dir)
        {
        
            if (is_dir($dir))
            {
            
                 $files = scandir($dir);

                 foreach ($files as $this_file)
                 {

                   if ($this_file != '.' && $this_file != '..')
                   { 

                       if (filetype($dir . '/' . $this_file) == 'dir')
                       {
                       
                           $result = Delete_Dir($dir . '/' . $this_file);
                           
                           if ($result === false)
                               return false;
                       
                       }
                       
                       else
                       {
                       
                           $result = unlink($dir . '/' . $this_file);
                           
                           if ($result === false)
                               return false;
                       
                       }
                   
                   }
                 
                 }
                 
                 reset($files);
                 
                 $result = rmdir($dir);
                 
                 return $result;
            
            }
            
            else
                return false;
        
        }
        
        // Load extensions
        public static function Load_Extension($extension, $ext_type)
        {
        
            if (empty($extension))
                return false;
            
            $xml_array = array();
            
            // PHP extensions
            if ($ext_type == 'php')
            {
            
                if ($extension == 'all')
                {
                
                    $result = self::Process_Dir(self::Absolute_Path('framework/extensions/php'), true);
                    
                    // Close on error
                    if (empty($result))
                        return false;
                    
                    // Load all the extensions
                    foreach ($result as $file)
                    {
                    
                        $file_ext = mb_substr($file['filename'], -3, 3, 'utf8');
                        
                        if ($file_ext == 'php')
                        {
                        
                            $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 3, 'utf8');
                            
                            $xml_array = self::Convert_XML_To_Array($file['dirpath'] . '/' . $file_name . 'xml');
                            
                            if ($xml_array['status'] == '1' || $xml_array['status'] == 'on')
                                require_once($file['dirpath'] . '/' . $file['filename']);
                        
                        }
                    
                    }
                    
                    return true;
                
                }
                
                else
                {
                
                    $result = self::Process_Dir(self::Absolute_Path('framework/extensions/php/' . $extension), false);
                    
                    // Close on error
                    if (empty($result))
                        return false;
                    
                    // Load this extension
                    foreach ($result as $file)
                    {
                    
                        if (mb_substr($file['filename'], 0, strlen($file['filename']) - 4, 'utf8') == $extension)
                        {
                        
                            $file_ext = mb_substr($file['filename'], -3, 3, 'utf8');
                            
                            if ($file_ext == 'php')
                            {
                            
                                $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 3, 'utf8');
                                
                                $xml_array = self::Convert_XML_To_Array($file['dirpath'] . '/' . $file_name . 'xml');
                                
                                if ($xml_array['status'] == '1' || $xml_array['status'] == 'on')
                                    require_once($file['dirpath'] . '/' . $file['filename']);
                                
                                break;
                            
                            }
                        
                        }
                    
                    }
                    
                    return true;
                
                }
            
            }
            
            // Javascript and AJAX extensions
            elseif ($ext_type == 'js' || $ext_type == 'ajax')
            {
            
                if ($extension == 'all')
                {
                
                    if ($ext_type == 'js')
                        $result = self::Process_Dir(self::Absolute_Path('framework/extensions/js'), true);
                    
                    else
                        $result = self::Process_Dir(self::Absolute_Path('framework/extensions/ajax'), true);
                    
                    // Close on error
                    if (empty($result))
                        return false;
                    
                    // Load all the extensions
                    foreach ($result as $file)
                    {
                    
                        $file_ext = mb_substr($file['filename'], -3, 3, 'utf8');
                        
                        if ($file_ext == '.js')
                        {
                        
                            $dir_path = mb_substr($file['dirpath'], strrpos($file['dirpath'], '/') + 1);
                            
                            $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 2, 'utf8');

                            $xml_array = self::Convert_XML_To_Array($file['dirpath'] . '/' . $file_name . 'xml');
                            
                            if ($xml_array['status'] == '1' || $xml_array['status'] == 'on')
                            {
                            
                                if ($ext_type == 'js')
                                    echo '<script type="text/javascript" src="/framework/extensions/js/' . $dir_path . '/' . $file['filename'] . '"></script>';
                                
                                else
                                    echo '<script type="text/javascript" src="/framework/extensions/ajax/' . $dir_path . '/' . $file['filename'] . '"></script>';
                            
                            }
                        
                        }
                    
                    }
                    
                    return true;
                
                }
                
                else
                {
                
                    if ($ext_type == 'js')
                        $result = self::Process_Dir(self::Absolute_Path('framework/extensions/js/' . $extension), false);
                    
                    else
                        $result = self::Process_Dir(self::Absolute_Path('framework/extensions/ajax/' . $extension), false);
                    
                    // Close on error
                    if (empty($result))
                        return false;
                    
                    // Load this extension
                    foreach ($result as $file)
                    {
                    
                        if (mb_substr($file['filename'], 0, strlen($file['filename']) - 3, 'utf8') == $extension)
                        {
                        
                            $file_ext = mb_substr($file['filename'], -3, 3, 'utf8');
                            
                            $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 2, 'utf8');

                            $xml_array = self::Convert_XML_To_Array($file['dirpath'] . '/' . $file_name . 'xml');
                            
                            if ($xml_array['status'] == '1' || $xml_array['status'] == 'on')
                            {
                            
                                if ($file_ext == '.js')
                                {

                                    if ($ext_type == 'js')
                                        echo '<script type="text/javascript" src="/framework/extensions/js/' . $extension . '/' . $file['filename'] . '"></script>';

                                    else
                                        echo '<script type="text/javascript" src="/framework/extensions/ajax/' . $extension . '/' . $file['filename'] . '"></script>';

                                    break;

                                }
                            
                            }
                        
                        }
                    
                    }
                    
                    return true;
                
                }
                
                echo '<noscript>
                        Your browser does not support Javascript!
                      </noscript>';
            
            }
            
            else
                return false;
        
        }
    
    }

?>
