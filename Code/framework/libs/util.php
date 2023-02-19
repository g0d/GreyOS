<?php
    /*
        micro-MVC
        
        File name: util.php
        Description: This file contains the "UTIL" class.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015 - 2023
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // UTIL class
    class UTIL
    {
        /**
        * UTIL::Check_Extension_Cache - Check extension cache
        *
        * @param string $extension An extension name
        *
        * @return bool
        */
        private static function Check_Extension_Cache($extension)
        {
            $cached_extensions = self::Get_Session_Variable('extensions_cache');
            
            if (in_array($extension, $cached_extensions))
                return true;
            
            array_push($cached_extensions, $extension);
            
            self::Set_Session_Variable('extensions_cache', $cached_extensions);
            
            return false;
        }
        
        /**
        * UTIL::Fetch_Extensions - Fetch all extensions of a type
        *
        * @param string $ext_type An extension type ("php" / "js")
        *
        * @return array
        */
        private static function Fetch_Extensions($ext_type)
        {
            $ext_path = self::Absolute_Path('framework/config/registry/' . $ext_type . '.json');
            $ext_data = file_get_contents($ext_path);
            $result = json_decode($ext_data, true);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            return $result;
        }
        
        /**
        * UTIL::Fetch_Extensions - Fetch all configured extensions for autoloading
        *
        * @return array
        */
        private static function Fetch_Autoload_Extensions()
        {
            $ext_path = self::Absolute_Path('framework/config/misc/ext_autoload.json');
            $ext_data = file_get_contents($ext_path);
            $result = json_decode($ext_data, true);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            return $result;
        }
        
        /**
        * UTIL::Config_Importer - Configuration importer
        *
        * @param string $config_file Name of the configuration file
        * @param string $sub_dir Subdirectory path (default: '')
        * @param string $delimiter Delimiter to use (default: null)
        *
        * @return array
        */
        public static function Config_Importer($config_file, $sub_dir = '', $delimiter = null)
        {
            $file_result = file_get_contents(self::Absolute_Path('framework/config/') . $sub_dir . '/' . $config_file . '.cfg');
            
            if ($file_result === false)
                return false;
            
            if ($delimiter === null)
                $results = trim($file_result);
            else
                $results = explode($delimiter, trim($file_result));
            
            return $results;
        }
        
        /**
        * UTIL::Setup_Languages - Setup languages
        *
        * @return bool
        */
        public static function Setup_Languages()
        {
            $langs_array = self::Config_Importer('langs', '', ',');
            
            foreach ($langs_array as $lang)
                LANG::Set($lang);
            
            return true;
        }
        
        /**
        * UTIL::Setup_Routes - Setup routes
        *
        * @return bool
        */
        public static function Setup_Routes()
        {
            $routes_array = self::Config_Importer('routes', '', ',');
            
            foreach ($routes_array as $route)
                MVC::Set_Route($route);
            
            return true;
        }
        
        /**
        * UTIL::Load_Activities - Load registered activities (Fortress gates)
        *
        * @return array
        */
        public static function Load_Activities()
        {
            $gates_json_array = null;
            $gates_array = self::Config_Importer('gates', '', ',');
            
            $gates_json_array = '[';
            
            foreach ($gates_array as $gate)
                $gates_json_array .= '"' . $gate . '",';
            
            $gates_json_array = rtrim($gates_json_array, ',');
            $gates_json_array .= ']';
            
            $result = json_decode($gates_json_array, true);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            return $result;
        }
        
        /**
        * UTIL::Absolute_Path - Absolute system path of a relative file path
        *
        * @param string $file_path A file path (default: null)
        *
        * @return string
        */
        public static function Absolute_Path($file_path = null)
        {
            $final_path = $_SERVER['DOCUMENT_ROOT'] . '/' . $file_path;
            
            if (file_exists($final_path) === false)
                return null;
            
            return $final_path;
        }
        
        /**
        * UTIL::Fetch_Route_Lang - Fetch the language code from route
        *
        * @return string
        */
        public static function Fetch_Route_Lang()
        {
            $normalized_route = self::Normalize_Route(substr($_SERVER['QUERY_STRING'], 4));
            $dash_pos = strpos($normalized_route, '_');
            
            if ($dash_pos === false)
                $lang = substr($normalized_route, 0);
            else
                $lang = substr($normalized_route, 0, $dash_pos);
            
            return $lang;
        }
        
        /**
        * UTIL::Check_Route_Lang - Check for language code in route
        *
        * @return bool
        */
        public static function Check_Route_Lang()
        {
            $lang = self::Fetch_Route_Lang();
            
            if (LANG::Verify($lang) === false)
                return false;
            
            return true;
        }
        
        /**
        * UTIL::Normalize_Route - Normalize route
        *
        * @param string $mvc_route A denormalized MVC route
        *
        * @return string A normalized route
        */
        public static function Normalize_Route($mvc_route)
        {
            if (empty($mvc_route) || strpos($mvc_route, '_'))
                return false;
            
            return str_replace('/', '_', $mvc_route);
        }
        
        /**
        * UTIL::Denormalize_Route - Denormalize route
        *
        * @param string $mvc_route A normalized MVC route
        *
        * @return string A denormalized route
        */
        public static function Denormalize_Route($mvc_route)
        {
            if (empty($mvc_route))
                return false;
            
            return str_replace('_', '/', $mvc_route);
        }
        
        /**
        * UTIL::Check_Valid_Params - Check valid parameters for a URL
        *
        * @param string $url A URL
        *
        * @return string A clean URL without parameters
        */
        public static function Check_Valid_Params($url)
        {
            $params_array = self::Config_Importer('params', '', ',');
			
            if (empty($params_array[0]))
                return $url;
            
            foreach ($params_array as $param)
            {
                $param_exists = strpos($url, $param);
                
                if ($param_exists)
                {
                    $url = substr($url, 0, strpos($url, '&'));
                    
                    break;
                }
            }
            
            return $url;
        }
        
        /**
        * UTIL::Get_Session_Variable - Get data from a previously set session variable
        *
        * @param string $variable_name A variable name
        *
        * @return mixed
        */
        public static function Get_Session_Variable($variable_name)
        {
            if (empty($variable_name))
                return null;
            
            if (!isset($_SESSION['micro_mvc'][$variable_name]))
                return null;
            
            return $_SESSION['micro_mvc'][$variable_name];
        }
        
        /**
        * UTIL::Set_Session_Variable - Set a new session variable and put any data
        *
        * @param string $variable_name A variable name
        * @param mixed $variable_data Data
        *
        * @return bool
        */
        public static function Set_Session_Variable($variable_name, $variable_data = null)
        {
            if (empty($variable_name))
                return false;
            
            $_SESSION['micro_mvc'][$variable_name] = $variable_data;
            
            return true;
        }
        
        /**
        * UTIL::Content_Data - Check if content code has data and return the filename for a specific language code
        *
        * @param string $content_code A content code
        * @param string $lang A 2 letter international country code (default: null)
        *
        * @return string A filename with content corresponding to the default or selected language
        */
        public static function Content_Data($content_code, $lang = null)
        {
            if (empty($content_code))
                return false;
            
            if ($lang !== null)
            {
                if (LANG::Verify($lang) === false)
                    return false;
                
                $this_lang = $lang;
            }
            else
                $this_lang = LANG::Get('this');
            
            $filename = self::Absolute_Path('framework/content/') . $this_lang . '/' . $content_code . '.phtml';
            
            if (file_exists($filename) === false)
                return false;
            
            return $filename;
        }
        
        /**
        * UTIL::Load_Content - Load content choosing a loading mode and using a specific language code
        *
        * @param string $content_code A content code
        * @param string $mode Dynamic or static loading of contents ("dynamic" / "static")
        * @param string $lang A 2 letter international country code (default: null)
        *
        * @return string HTML
        */
        public static function Load_Content($content_code, $mode, $lang = null)
        {
            $load_modes = array('dynamic', 'static');
            
            if (!in_array($mode, $load_modes))
                return false;
            
            $filename = self::Content_Data($content_code, $lang);
            
            if ($filename === false)
                return false;
            
            if ($mode === 'dynamic')
            {
                require($filename);
                
                return true;
            }
            else
                return trim(file_get_contents($filename));
        }
        
        /**
        * UTIL::Load_Section - Load the specified site section
        *
        * @param string $section A section name
        *
        * @return mixed
        */
        public static function Load_Section($section)
        {
            if (empty($section))
                return false;
            
            $filename = self::Absolute_Path('site/sections/') . $section . '.phtml';
            
            if ($filename === false)
                return false;
            
            require($filename);
            
            return true;
        }
        
        /**
        * UTIL::Fetch_Template - Fetch a template passing any arguments
        *
        * @param string $template_name A templates name
        * @param string $arguments_array A 2-dimensional array of arguments of the form: "($searches, $replaces)" (default: null)
        *
        * @return string Template contents
        */
        public static function Fetch_Template($template_name, $arguments_array = null)
        {
            if (empty($template_name) || ($arguments_array !== null && is_array($arguments_array) && count($arguments_array) !== 2))
                return false;
            
            $filename = self::Absolute_Path('framework/templates/') . $template_name . '.phtml';
            
            if (file_exists($filename) === false)
                return false;
            
            $template = file_get_contents($filename);
            
            if ($arguments_array === null)
                $result = $template;
            else
                $result = str_replace($arguments_array[0], $arguments_array[1], $template);
            
            return $result;
        }
        
        /**
        * UTIL::Log - Log info and error messages
        *
        * @param string $log_data Log data
        * @param string $log_type Log type ("info" / "error")
        *
        * @return bool 
        */
        public static function Log($log_data, $log_type)
        {
            $log_types = array('info', 'error');
            
            if (empty($log_data) || empty($log_type) || !in_array($log_type, $log_types))
                return false;
            
            if (file_put_contents(self::Absolute_Path('framework/logs/') . $log_type . '.log', $log_data) === false)
                return false;
            
            return true;
        }
        
        /**
        * UTIL::Convert_Array_To_XML - Convert any associative array mapped with one or more elements to an XML
        *
        * @param array $elements XML elements array
        * @param array $data_array Array of "key : value" data
        * @param array $xml_file Output XML file
        *
        * @return bool 
        */
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
        
        /**
        * UTIL::Convert_XML_To_Array - Convert any valid XML file into an associative array map
        *
        * @param string $xml XML file or a valid XML string
        * @param string $callback A callback function (default: null)
        * @param bool $recursive Set if the method functions in recursive mode (default: false)
        *
        * @return array Associative array map
        */
        public static function Convert_XML_To_Array($xml, $callback = null, $recursive = false)
        {
            $new_data = (!$recursive && file_get_contents(self::Absolute_Path($xml)))? simplexml_load_file($xml): $xml;
            
            if ($new_data instanceof SimpleXMLElement)
                $new_data = (array)$new_data;
            
            if (is_array($new_data))
            {
                foreach ($new_data as &$item)
                    $item = self::Convert_XML_To_Array($item, $callback, true);
            }
            
            return (!is_array($new_data) && is_callable($callback))? call_user_func($callback, $new_data): $new_data;
        }
        
        /**
        * UTIL::Process_Dir - Process a directory
        *
        * @param string $dir Directory to process
        * @param bool $recursive Set if the method functions in recursive mode (default: false)
        *
        * @return mixed Array of filepaths on success or false otherwise
        */
        public static function Process_Dir($dir, $recursive = false)
        {
            if (is_dir($dir))
            {
                for ($list = array(), $handle = opendir($dir); (($file = readdir($handle)) != false);)
                {
                    if (($file !== '.' && $file !== '..') && (file_exists($path = $dir . '/' . $file)))
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
        
        /**
        * UTIL::Delete_Dir - Recursively delete directories
        *
        * @param string $dir Directory to delete
        *
        * @return bool
        */
        public static function Delete_Dir($dir)
        {
            if (is_dir($dir))
            {
                 $files = scandir($dir);
                 
                 foreach ($files as $this_file)
                 {
                   if ($this_file !== '.' && $this_file !== '..')
                   {
                       if (filetype($dir . '/' . $this_file) === 'dir')
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
        
        /**
        * UTIL::Load_Extension - Load extension by type
        *
        * @param string $extension Extension name
        * @param string $ext_type Extension type ("php" / "js")
        * @param string $clear_cache Cache control | Applies for JS extensions only - Options: "true / false" (default: true)
        *
        * @return bool
        */
        public static function Load_Extension($extension, $ext_type, $clear_cache = true)
        {
            if (empty($extension))
                return false;
            
            if ($ext_type === 'php')            // PHP extensions
            {
                if ($clear_cache !== true)
                    return false;
                
                $absolute_path = self::Absolute_Path('framework/extensions/php');
                $result = self::Process_Dir($absolute_path, true);
                
                // Close on error
                if (empty($result))
                    return false;
                
                $ext_reg = self::Fetch_Extensions($ext_type);
                
                if ($extension === 'all')
                {
                    // Load all the extensions
                    foreach ($result as $file)
                    {
                        $file_ext = mb_substr($file['filename'], -3, 3, 'utf8');
                        
                        if ($file_ext === 'php')
                        {
                            $dir_path_name = mb_substr($file['dirpath'], strrpos($file['dirpath'], '/') + 1);
                            $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 4, 'utf8');
                            
                            if ($dir_path_name === $file_name && !self::Check_Extension_Cache($file_name))
                            {
                                require_once($absolute_path . '/' . $ext_reg[$file_name] . '/' . 
                                             $file_name . '/' . $file['filename']);
                            }
                        }
                    }
                    
                    return true;
                }
                else
                {
                    // Load this extension
                    foreach ($result as $file)
                    {
                        $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 4, 'utf8');

                        if ($file_name === $extension)
                        {
                            $file_ext = mb_substr($file['filename'], -3, 3, 'utf8');
                            
                            if ($file_ext === 'php')
                            {
                                if (!self::Check_Extension_Cache($extension))
                                {
                                    require_once($absolute_path . '/' . $ext_reg[$file_name] . '/' . 
                                                 $extension . '/' . $file['filename']);
                                    
                                    break;
                                }
                            }
                        }
                    }
                    
                    return true;
                }
            }
            else if ($ext_type === 'js')        // Javascript extensions
            {
                if (!is_bool($clear_cache))
                    return false;
                
                $absolute_path = self::Absolute_Path('framework/extensions/js');
                $result = self::Process_Dir($absolute_path, true);
                
                // Close on error
                if (empty($result))
                    return false;
                
                $ext_reg = self::Fetch_Extensions($ext_type);
                
                if ($clear_cache)
                    $cache_reset = '?version=' . time();
                else
                    $cache_reset = '';
                
                if ($extension === 'all')
                {
                    // Load all the extensions
                    foreach ($result as $file)
                    {
                        $file_ext = mb_substr($file['filename'], -2, 2, 'utf8');
                        
                        if ($file_ext === 'js')
                        {
                            $dir_path_name = mb_substr($file['dirpath'], strrpos($file['dirpath'], '/') + 1);
                            $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 3, 'utf8');
                            
                            if ($dir_path_name === $file_name && !self::Check_Extension_Cache($file_name))
                            {
                                echo '<script src="/framework/extensions/js/' . $ext_reg[$file_name] . '/' . 
                                      $dir_path_name . '/' . $file['filename'] . $cache_reset . '"></script>';
                            }
                        }
                    }
                    
                    return true;
                }
                else
                {
                    // Load this extension
                    foreach ($result as $file)
                    {
                        $file_name = mb_substr($file['filename'], 0, strlen($file['filename']) - 3, 'utf8');
                        
                        if ($file_name === $extension)
                        {
                            $file_ext = mb_substr($file['filename'], -2, 2, 'utf8');
                            
                            if ($file_ext === 'js')
                            {
                                if (!self::Check_Extension_Cache($extension))
                                {
                                    echo '<script src="/framework/extensions/js/' . $ext_reg[$file_name] . '/' . 
                                          $extension . '/' . $file['filename'] . $cache_reset . '"></script>';
                                }
                                
                                break;
                            }
                        }
                    }
                    
                    return true;
                }
            }
            else
                return false;
        }
        
        /**
        * UTIL::Autoload_Extensions - Autoload all PHP & JS extensions set in the config file
        *
        * @param string $clear_cache Cache control | Applies for JS extensions only - Options: "true / false" (default: true)
        *
        * @return bool
        */
        public static function Autoload_Extensions($clear_cache = true)
        {
            if (!is_bool($clear_cache))
                return false;
            
            $extensions_array = self::Fetch_Autoload_Extensions();
            
            if (empty($extensions_array))
                return false;
            
            foreach ($extensions_array as $ext_type => $ext_names_array)
            {
                foreach ($ext_names_array as $ext_name)
                    self::Load_Extension($ext_name, $ext_type, $clear_cache);
            }
            
            return true;
        }
    }
?>
