<?php

    /*
    
        GreyOS - ALPHA CMS
        
        Version: 10.0
        
        File name: alpha_cms.php
        Description: This file contains the ALPHA CMS class.
        
        Coded by George Delaportas (G0D)
        
        GreyOS
        Copyright © 2013
    
    */
    
    
    
    // ALPHA CMS class
    class ALPHA_CMS extends ALPHA
    {
    
        // Menu elements array
        private static $__menu_elements = array();
        
        // Setup Wizard
        public static function Setup_Wizard()
        {
        
            $result = self::MVC_Go_To('setup');
            
            return $result;
        
        }
        
        // Get default language
        public static function Get_Default_Language()
        {
        
            $mysql_result = self::Execute_SQL_Command('SELECT `lang_code` 
                                                       FROM `alpha_languages` 
                                                       WHERE `is_default` = 1', 1);
            
            if ($mysql_result === false)
                return false;
            
            return $mysql_result[0][0];
        
        }
        
        // Execute SQL commands - ALPHA::Execute_SQL front-end
        public static function Execute_SQL_Command($sql_com, $log = null)
        {
        
            if (empty($sql_com))
                return false;
            
            $mysql_result = array();

            $mysql_result = self::Execute_SQL($sql_com);
            
            if ($mysql_result === false)
            {
            
                if ($log == 1 || $log == 'on')
                    $mysql_result = self::Log_Error('mysql');
                
                return false;

            }
            
            return $mysql_result;
        
        }
        
        // Execute SQL script file - ALPHA::Execute_SQL_Script front-end
        public static function Execute_SQL_Script_File($sql_file, $log = null)
        {
 
            if (empty($sql_file))
                return false;
            
            $mysql_result = array();

            $mysql_result = self::Execute_SQL_Script($sql_file);
            
            if ($mysql_result === false)
            {

                if ($log == 1 || $log == 'on')
                    $mysql_result = self::Log_Error('mysql');

                return false;

            }

            return $mysql_result;

        }

        // Create a dynamic menu
        public static function Create_Menu($caller, $parent_menu_id, $lang_code, $order_field = null, $sort_type = null)
        {
        
            if ($caller == '' || is_null($caller) || is_null($parent_menu_id) || empty($lang_code))
                return false;
            
            $mysql_con = self::Use_DB_Connection();
            
            if ($mysql_con === false)
                return false;
            
            if ($caller == '*')
            {
            
                if ($lang_code == '*')
                {
                
                    if ($order_field === null && $sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    WHERE `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ' 
                                    ORDER BY `alpha_menu`.`sort_order` ASC';
                    }

                    elseif ($sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    WHERE `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . '
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ASC';

                    }

                    else
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    WHERE `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ' 
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ' . $sort_type;

                    }
                
                }
                
                else
                {
                
                    if ($order_field === null && $sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    INNER JOIN `alpha_languages` 
                                    ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                    WHERE (`lang_code` = ' . '\'' . 
                                    mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`sort_order` ASC';
                    }

                    elseif ($sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    INNER JOIN `alpha_languages` 
                                    ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                    WHERE (`lang_code` = ' . '\'' . 
                                    mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ASC';

                    }

                    else
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    INNER JOIN `alpha_languages` 
                                    ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                    WHERE (`lang_code` = ' . '\'' . 
                                    mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ' . $sort_type;

                    }
                
                }
            
            }
            
            else
            {
            
                if ($lang_code == '*')
                {
                
                    if ($order_field === null && $sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    WHERE (`caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`sort_order` ASC';

                    }

                    elseif ($sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    WHERE (`caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                    AND `parent_menu_id` = ' .  
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ASC';

                    }

                    else
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    WHERE (`caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ' . $sort_type;

                    }
                
                }
                
                else
                {
                
                    if ($order_field === null && $sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    INNER JOIN `alpha_languages` 
                                    ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                    WHERE (`lang_code` = ' . '\'' . 
                                    mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                    AND `caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`sort_order` ASC';

                    }

                    elseif ($sort_type === null)
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    INNER JOIN `alpha_languages` 
                                    ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                    WHERE (`lang_code` = ' . '\'' . 
                                    mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                    AND `caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ASC';

                    }

                    else
                    {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `alpha_menu`.`caller`, `alpha_menu`.`parent_menu_id`, 
                                           `alpha_menu`.`menu_name`, `alpha_menu`.`menu_link`, `alpha_menu`.`lang_id`, 
                                           `alpha_menu`.`sort_order` 
                                    FROM `alpha_menu` 
                                    INNER JOIN `alpha_languages` 
                                    ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                    WHERE (`lang_code` = ' . '\'' . 
                                    mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                    AND `caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                    AND `parent_menu_id` = ' . 
                                    mysqli_real_escape_string($mysql_con, $parent_menu_id) . ') 
                                    ORDER BY `alpha_menu`.`' . $order_field . '` ' . $sort_type;

                    }
                
                }
            
            }
            
            $mysql_result = mysqli_query($mysql_con, $sql_com);

            if (mysqli_error($mysql_con) != '')
            {

                $mysql_result = self::DB_Disconnect($mysql_con);
                
                return false;

            }
            
            $mysql_row = array();
            
            while ($mysql_row = mysqli_fetch_array($mysql_result))
            {

                self::$__menu_elements[$mysql_row['parent_menu_id']]['name']
                                                 [$mysql_row['id']] = $mysql_row['menu_name'];

                self::$__menu_elements[$mysql_row['parent_menu_id']]['link']
                                                 [$mysql_row['id']] = $mysql_row['menu_link'];

                self::Create_Menu($caller, $mysql_row['id'], $lang_code);

            }

        }

        // Get dynamic menu as an array
        public static function Get_Menu()
        {
        
            if (empty(self::$__menu_elements))
                return false;

            return self::$__menu_elements;

        }
        
        // Load languages from database
        public static function Load_Language($lang_code)
        {

            if (empty($lang_code))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if ($mysql_con === false)
                return false;

            if ($lang_code != '*')
            {

                $sql_com = 'SELECT `language` 
                            FROM `alpha_languages` 
                            WHERE `lang_code` = ' .
                            '\'' . mysqli_real_escape_string($mysql_con, $lang_code) . '\'' .
                            ' ORDER BY `sort_order`';

            }

            else
            {

                $sql_com = 'SELECT `language` 
                            FROM `alpha_languages` 
                            ORDER BY `sort_order`';

            }
            
            $mysql_result = mysqli_query($mysql_con, $sql_com);

            if (mysqli_error($mysql_con) != '')
            {

                self::DB_Disconnect($mysql_con);

                return false;

            }

            $mysql_row = array();
            $langs = array();

            $i = 0;
            
            while ($mysql_row = mysqli_fetch_array($mysql_result))
                $langs[$i++] = $mysql_row['language'];

            self::DB_Disconnect($mysql_con);

            if (empty($langs))
                return false;

            return $langs;

        }

        // Load common options from database
        public static function Load_Common($option, $binded_route, $lang_code)
        {
        
            if (empty($option) || empty($binded_route) || empty($lang_code))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            $sql_com = 'SELECT * 
                        FROM `alpha_common` 
                        INNER JOIN `alpha_languages` 
                        ON `alpha_common`.`lang_id` = `alpha_languages`.`id` 
                        WHERE (`binded_route` = ' . '\'' . mysqli_real_escape_string($mysql_con, $binded_route) . '\'' . ' AND 
                               `alpha_languages`.`lang_code` = ' . '\'' . mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ')';

            $mysql_result = mysqli_query($mysql_con, $sql_com);

            if (mysqli_error($mysql_con) != '')
            {

                self::DB_Disconnect($mysql_con);

                return false;

            }

            $mysql_row = array();

            $mysql_row = mysqli_fetch_array($mysql_result);

            self::DB_Disconnect($mysql_con);

            if (!$mysql_row)
                return false;

            return $mysql_row[$option];

        }

        // Load menu from database
        public static function Load_Menu($caller, $lang_code, $order_field = null, $sort_type = null)
        {
        
            if ($caller == '' || is_null($caller) || empty($lang_code))
                return false;
            
            self::Create_Menu($caller, 0, $lang_code, $order_field, $sort_type);
            
            if (!self::Get_Menu())
                return false;
            
            return self::Get_Menu();

        }

        // Load content from database
        public static function Load_Content($page, $option, $lang_code)
        {
        
            if (empty($page) || empty($option) || empty($lang_code))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            $sql_com = 'SELECT * 
                        FROM `alpha_content` 
                        INNER JOIN `alpha_languages` 
                        ON `alpha_content`.`lang_id` = `alpha_languages`.`id` 
                        WHERE (`alpha_languages`.`lang_code` = ' .
                        '\'' . mysqli_real_escape_string($mysql_con, $lang_code) . 
                        '\'' . ' AND `page` = ' .
                        '\'' . mysqli_real_escape_string($mysql_con, $page) . '\'' . ')';

            $mysql_result = mysqli_query($mysql_con, $sql_com);

            if (mysqli_error($mysql_con) != '')
            {

                self::DB_Disconnect($mysql_con);

                return false;

            }

            $mysql_row = array();
            
            $mysql_row = mysqli_fetch_array($mysql_result);

            self::DB_Disconnect($mysql_con);

            if (!$mysql_row)
                return false;

            return $mysql_row[$option];

        }
        
        // Load users from database
        public static function Load_Users($option)
        {
        
            if (empty($option))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            $sql_com = 'SELECT * 
                        FROM `alpha_users`';

            if ($option == '*')
                return self::Execute_SQL_Command($sql_com, 1);
            
            $mysql_result = mysqli_query($mysql_con, $sql_com);

            if (mysqli_error($mysql_con) != '')
            {

                self::DB_Disconnect($mysql_con);

                return false;

            }

            $mysql_row = array();

            $mysql_row = mysqli_fetch_array($mysql_result);

            self::DB_Disconnect($mysql_con);

            if (!$mysql_row)
                return false;

            return $mysql_row[$option];
        
        }
        
        // Insert languages to database
        public static function Insert_Language($lang_code, $language, $sort_order, $is_default = null, $is_protected = null)
        {

            if (empty($lang_code) || empty($language) || empty($sort_order))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            if (empty($is_default))
                $is_default = 0;
            
            else
                $is_default = 1;
            
            if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            $sql_com = 'INSERT INTO `alpha_languages` (`lang_code`, `language`, `sort_order`, `is_default`, `is_protected`)
                        VALUES (' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ', ' .
                                '\'' . mysqli_real_escape_string($mysql_con, $language) . '\'' . ', ' . 
                                mysqli_real_escape_string($mysql_con, $sort_order) . ', ' . 
                                mysqli_real_escape_string($mysql_con, $is_default) . ', ' . 
                                mysqli_real_escape_string($mysql_con, $is_protected) . ')';
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Insert common options to database
        public static function Insert_Common($site_title, $site_description, $site_keywords, $company_name,
                                             $company_site, $footer_info, $binded_route, $lang_id, 
                                             $is_protected = null)
        {

            if (empty($site_title) || empty($binded_route) || empty($lang_id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            $sql_com = 'INSERT INTO `alpha_common` (`site_title`, `site_description`, `site_keywords`, 
                                                    `company_name`, `company_site`, `footer_info`, 
                                                    `binded_route`, `lang_id`, `is_protected`)
                        VALUES (' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $site_title) . '\'' . ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $site_description) . '\'' .  ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $site_keywords) . '\'' . ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $company_name) . '\'' . ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $company_site) . '\'' . ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $footer_info) . '\'' . ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $binded_route) . '\'' . ', ' . 
                                mysqli_real_escape_string($mysql_con, $lang_id) . ', ' . 
                                mysqli_real_escape_string($mysql_con, $is_protected) . ')';
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Insert menu to database
        public static function Insert_Menu($caller, $parent_menu_id, $menu_name, $menu_link, 
                                           $lang_id, $sort_order, $is_protected = null)
        {

            if (empty($caller) || is_null($parent_menu_id) || empty($menu_name) || 
                empty($lang_id) || empty($sort_order))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            $sql_com = 'INSERT INTO `alpha_menu` (`caller`, `parent_menu_id`, `menu_name`, `menu_link`, 
                                                  `lang_id`, `sort_order`, `is_protected`)
                        VALUES (' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ', ' .
                                $parent_menu_id . ', ' .
                                '\'' . mysqli_real_escape_string($mysql_con, $menu_name) . '\'' . ', ' .
                                '\'' . mysqli_real_escape_string($mysql_con, $menu_link) . '\'' . ', ' .
                                mysqli_real_escape_string($mysql_con, $lang_id) . ', ' . 
                                mysqli_real_escape_string($mysql_con, $sort_order) . ', ' . 
                                mysqli_real_escape_string($mysql_con, $is_protected) . ')';
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Insert content to database
        public static function Insert_Content($page, $content, $keywords, $lang_id, 
                                              $is_protected = null, $is_route = null)
        {
        
            if (empty($page) || empty($lang_id)) 
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            if (empty($is_route))
                $is_route = 0;
            
            else
                $is_route = 1;
            
            $sql_com = 'INSERT INTO `alpha_content` (`page`, `content`, `keywords`, `lang_id`, `is_protected`, `is_route`)
                        VALUES (' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $page) . '\'' . ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $content) . '\'' . ', ' . 
                                '\'' . mysqli_real_escape_string($mysql_con, $keywords) . '\'' . ', ' .  
                                mysqli_real_escape_string($mysql_con, $lang_id) . ', ' . 
                                mysqli_real_escape_string($mysql_con, $is_protected) . ', ' . 
                                mysqli_real_escape_string($mysql_con, $is_route) . ')';
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }
        
        // Insert users to database
        public static function Insert_User($username, $email, $password, $type)
        {

            if (empty($username) || empty($email) || empty($password) || is_null($type) || $type == '') 
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            $sql_com = 'SELECT `id` 
                        FROM `alpha_users` 
                        WHERE (`username` = ' . '\'' . mysqli_real_escape_string($mysql_con, $username) . '\'' . ' OR 
                               `email` = ' . '\'' . mysqli_real_escape_string($mysql_con, $email) . '\'' . ')';
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);
            
            if ($mysql_result)
                return -1;
            
            $sql_com = 'INSERT INTO `alpha_users`(`username`, `email`, `password`, `type`) 
                        VALUES(' . '\'' . mysqli_real_escape_string($mysql_con, $username) . '\'' . ', 
                               ' . '\'' . mysqli_real_escape_string($mysql_con, $email) . '\'' . ', 
                               ' . '\'' . md5(mysqli_real_escape_string($mysql_con, $password)) . '\'' . ', 
                               ' . mysqli_real_escape_string($mysql_con, $type) . ')';
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);
            
            if ($mysql_result === false)
                return false;
            
            return true;

        }
        
        // Update languages to database
        public static function Update_Language($id, $lang_code, $language, $sort_order, $is_default = null, $is_protected = null)
        {

            if (empty($id) || empty($lang_code) || empty($language) || empty($sort_order)) 
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            if (empty($is_default))
                $is_default = 0;
            
            else
                $is_default = 1;
            
            if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            $sql_com = 'UPDATE `alpha_languages`
                        SET `lang_code` = ' . '\'' . mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ', 
                            `language` =  ' .  '\'' . mysqli_real_escape_string($mysql_con, $language) . '\'' . ', 
                            `sort_order` = ' . mysqli_real_escape_string($mysql_con, $sort_order) . ', 
                            `is_default` = ' . mysqli_real_escape_string($mysql_con, $is_default) . ', 
                            `is_protected` = ' . mysqli_real_escape_string($mysql_con, $is_protected) . ' 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Update common options to database
        public static function Update_Common($id, $site_title, $site_description, $site_keywords, $company_name,
                                             $company_site, $footer_info, $binded_route, $lang_id, 
                                             $is_protected = null)
        {

            if (empty($id) || empty($site_title) || empty($binded_route) || empty($lang_id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            $sql_com = 'UPDATE `alpha_common` 
                        SET `site_title` = ' . '\'' . mysqli_real_escape_string($mysql_con, $site_title) . '\'' . ', 
                            `site_description` = ' . '\'' . mysqli_real_escape_string($mysql_con, $site_description) . '\'' . ', 
                            `site_keywords` = ' . '\'' . mysqli_real_escape_string($mysql_con, $site_keywords) . '\'' . ', 
                            `company_name` = ' . '\'' . mysqli_real_escape_string($mysql_con, $company_name) . '\'' . ', 
                            `company_site` = ' . '\'' . mysqli_real_escape_string($mysql_con, $company_site) . '\'' . ', 
                            `footer_info` = ' . '\'' . mysqli_real_escape_string($mysql_con, $footer_info) . '\'' . ', 
                            `binded_route` = ' . '\'' . mysqli_real_escape_string($mysql_con, $binded_route) . '\'' . ', 
                            `lang_id` = ' . mysqli_real_escape_string($mysql_con, $lang_id) . ', 
                            `is_protected` = ' . mysqli_real_escape_string($mysql_con, $is_protected) . ' 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Update menu to database
        public static function Update_Menu($id, $caller, $parent_menu_id, $menu_name, $menu_link, 
                                           $lang_id, $sort_order, $is_protected = null)
        {

            if (empty($id) || empty($caller) || is_null($parent_menu_id) || empty($menu_name) || 
                empty($lang_id) || empty($sort_order))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            $sql_com = 'UPDATE `alpha_menu` 
                        SET `caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ', 
                            `parent_menu_id` = ' . $parent_menu_id . ', 
                            `menu_name` = ' . '\'' . mysqli_real_escape_string($mysql_con, $menu_name) . '\'' . ', 
                            `menu_link` = ' . '\'' . mysqli_real_escape_string($mysql_con, $menu_link) . '\'' . ', 
                            `lang_id` = ' . mysqli_real_escape_string($mysql_con, $lang_id) . ', 
                            `sort_order` = ' . mysqli_real_escape_string($mysql_con, $sort_order) . ', 
                            `is_protected` = ' . mysqli_real_escape_string($mysql_con, $is_protected) . ' 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Update content to database
        public static function Update_Content($id, $page, $content, $keywords, $lang_id, 
                                              $is_protected = null, $is_route = null)
        {

            if (empty($id) || empty($page) || empty($lang_id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

           if (empty($is_protected))
                $is_protected = 0;
            
            else
                $is_protected = 1;
            
            if (empty($is_route))
                $is_route = 0;
            
            else
                $is_route = 1;
            
            $sql_com = 'UPDATE `alpha_content` 
                        SET `page` = ' . '\'' . mysqli_real_escape_string($mysql_con, $page) . '\'' . ', 
                            `content` = ' . '\'' . mysqli_real_escape_string($mysql_con, $content) . '\'' . ', 
                            `keywords` = ' . '\'' . mysqli_real_escape_string($mysql_con, $keywords). '\'' . ', 
                            `lang_id` = ' . mysqli_real_escape_string($mysql_con, $lang_id) . ', 
                            `is_protected` = ' . mysqli_real_escape_string($mysql_con, $is_protected) . ', 
                            `is_route` = ' . mysqli_real_escape_string($mysql_con, $is_route) . ' 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }
        
        // Update users to database
        public static function Update_User($id, $username, $email, $password, $type)
        {

            if (empty($id) || empty($username) || empty($email) || 
                empty($password) || is_null($type) || $type == '')
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            $sql_com = 'UPDATE `alpha_users` 
                        SET `username` = ' . '\'' . mysqli_real_escape_string($mysql_con, $username) . '\'' . ', 
                            `email` = ' . '\'' . mysqli_real_escape_string($mysql_con, $email) . '\'' . ', 
                            `password` = ' . '\'' . md5(mysqli_real_escape_string($mysql_con, $password)) . '\'' . ', 
                            `type` = ' . mysqli_real_escape_string($mysql_con, $type) . ' 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);
            
            if ($mysql_result === false)
                return false;
            
            return true;

        }
        
        // Update extensions
        public static function Update_Extension($ext_name, $ext_type, $ext_keys = array())
        {
        
            if (empty($ext_name) || empty($ext_type) || empty($ext_keys))
                return false;
            
            // Intialize session support
            @session_start();
            
            $ext_path = self::Absolute_Path('framework/extensions/');
            $this_ext_path = $ext_path . $ext_type . '/' . $ext_name . '/';
            $this_ext_XML = $this_ext_path . $ext_name . '.xml';
            
            if (file_exists($this_ext_XML))
            {

                $xml_config = self::Convert_XML_To_Array($this_ext_XML);
                
                if (($xml_config['protected'] == '1' || $xml_config['protected'] == 'yes') && $_SESSION['ALPHA_CMS_USER'] != 'admin')
                    return false;
            
            }

            else
                return false;
            
            $new_options_XML = array();
            
            $i = 0;
            
            foreach ($xml_config as $key => $value)
            {
            
                if (is_null($ext_keys[$key]))
                    return false;
                
                $value = null;
                
                $new_options_XML[$i][0] = $key;
                
                if ($key == 'status')
                {
                
                    if ($ext_keys[$key] == '1' || $ext_keys[$key] == 'on')
                        $new_options_XML[$i][1] = 'on';
                    
                    else
                        $new_options_XML[$i][1] = 'off';
                
                }
                
                elseif ($key == 'protected')
                {
                
                    if ($ext_keys[$key] == '1' || $ext_keys[$key] == 'yes')
                        $new_options_XML[$i][1] = 'yes';
                    
                    else
                        $new_options_XML[$i][1] = 'no';
                
                }
                
                else
                    $new_options_XML[$i][1] = $ext_keys[$key];
                
                $i++;
            
            }
            
            $result = self::Convert_Array_To_XML('config', $new_options_XML, $this_ext_XML);
            
            if ($result === false)
                return false;
            
            return true;
        
        }
        
        // Delete languages from database
        public static function Delete_Language($id)
        {

            if (empty($id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            $sql_com = 'DELETE FROM `alpha_languages` 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);

            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Delete common options from database
        public static function Delete_Common($id)
        {

            if (empty($id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            $sql_com = 'DELETE FROM `alpha_common` 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);

            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;

            return true;

        }

        // Delete menu from database
        public static function Delete_Menu($id)
        {

            if (empty($id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            $sql_com = 'DELETE FROM `alpha_menu` 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);

            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }

        // Delete content from database
        public static function Delete_Content($id)
        {

            if (empty($id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            $sql_com = 'DELETE FROM `alpha_content` 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);

            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }
                
        // Delete users from database
        public static function Delete_User($id)
        {

            if (empty($id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            $sql_com = 'DELETE FROM `alpha_users` 
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);

            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }
        
        // Delete extensions
        public static function Delete_Extension($ext_name, $ext_type)
        {
        
            if (empty($ext_name) || empty($ext_type))
                return false;
            
            // Intialize session support
            @session_start();
            
            $ext_path = self::Absolute_Path('framework/extensions/');
            $this_ext_path = $ext_path . $ext_type . '/' . $ext_name . '/';
            $this_ext_XML = $this_ext_path . $ext_name . '.xml';
            
            if (file_exists($this_ext_XML))
            {

                $xml_config = self::Convert_XML_To_Array($this_ext_XML);
                
                if (!empty($xml_config['protected']) && $_SESSION['ALPHA_CMS_USER'] != 'admin')
                    return false;
                
                $result = self::Delete_Dir($this_ext_path);
                
                if ($result === false)
                    return false;
            
            }

            else
                return false;
            
            return true;
        
        }
        
        // Log errors
        public static function Log_Error($log_type)
        {
        
            if (empty($log_type))
                return false;
            
            $error_log = array();

            $mysql_con = self::Use_DB_Connection();
            
            if ($mysql_con === false)
                return false;

            else
            {

                if ($log_type == 'php')
                    $error_log = error_get_last();

                elseif ($log_type == 'mysql')
                {
                
                    $error_log['type'] = mysqli_errno($mysql_con);
                    $error_log['message'] = mysqli_error($mysql_con);
                    $error_log['file'] = __FILE__;
                    $error_log['line'] = -1;
                
                }
                
                else
                    return false;

            }
            
            // Initialize session support
            @session_start();
            
            $sql_com = 'INSERT INTO `alpha_logs` (`error_code`, `entity`, `message`, `file`, `line`, `date_time`)
                        VALUES(' . '\'' . $error_log['type'] . '\'' . ', '; 
            
            if (empty($_SESSION['ALPHA_CMS_USER']))
                $sql_com .= '\'' . '[SYSTEM]' . '\'' . ', ';
            
            else
                $sql_com .= '\'' . $_SESSION['ALPHA_CMS_USER'] . '\'' . ', ';
            
            $sql_com .= '\'' . mysqli_real_escape_string($mysql_con, $error_log['message']) . '\'' . ', ' . 
                        '\'' . mysqli_real_escape_string($mysql_con, $error_log['file']) . '\'' . ', ' . 
                        '\'' . $error_log['line'] . '\'' . ', ' . 
                        '\'' . gmdate('Y-m-d H:i:s') . '\'' . ')';
            
            $mysql_result = self::Execute_SQL($sql_com);
            
            if ($mysql_result === false)
                return false;
            
            return true;

        }
        
        // Show logs
        public static function Show_Log($id = '*', $option = '*', $order_field = null, $sort_type = null)
        {
        
            if (empty($id) || empty($option))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;

            if (is_null($order_field))
            {
            
                if (is_null($sort_type))
                {
                
                    if ($id == '*')
                    {
                    
                        $sql_com = 'SELECT * 
                                    FROM `alpha_logs`';
                    
                    }
                    
                    else
                    {
                    
                        $sql_com = 'SELECT * 
                                    FROM `alpha_logs` 
                                    WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);
                    
                    }
                
                }
                
                else
                    return false;
            
            }
            
            else
            {
            
                if (is_null($sort_type))
                {
                
                    if ($id == '*')
                    {
                    
                        $sql_com = 'SELECT * 
                                    FROM `alpha_logs` 
                                    ORDER BY `' . $order_field . '` ASC';
                    
                    }
                    
                    else
                    {
                    
                        $sql_com = 'SELECT * 
                                    FROM `alpha_logs` 
                                    WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id) . ' 
                                    ORDER BY `' . $order_field . '` ASC';
                    
                    }
                
                }
                
                else
                {
                
                    if ($id == '*')
                    {
                    
                        $sql_com = 'SELECT * 
                                    FROM `alpha_logs` 
                                    ORDER BY `' . $order_field . '` ' . $sort_type;
                    
                    }
                    
                    else
                    {
                    
                        $sql_com = 'SELECT * 
                                    FROM `alpha_logs` 
                                    WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id) . ' 
                                    ORDER BY `' . $order_field . '` ' . $sort_type;
                    
                    }
                
                }
            
            }
            
            if ($option == '*')
                return self::Execute_SQL_Command($sql_com, 1);
            
            else
            {
            
                $mysql_result = mysqli_query($mysql_con, $sql_com);

                if (mysqli_error($mysql_con) != '')
                {

                    self::DB_Disconnect($mysql_con);

                    return false;

                }
                
                $mysql_row = array();

                $mysql_row = mysqli_fetch_array($mysql_result);

                self::DB_Disconnect($mysql_con);

                if (!$mysql_row)
                    return false;

                return $mysql_row[$option];
            
            }
        
        }
        
        // Delete logs from database
        public static function Delete_Log($id = '*', $from = null, $to = null)
        {

            if (empty($id))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            if ($id == '*')
            {
            
                $sql_com = 'DELETE FROM `alpha_logs`';
            
            }
            
            else
            {
            
                if (is_null($from) && is_null($to))
                {
                
                    $sql_com = 'DELETE FROM `alpha_logs` 
                                WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $id);
                
                }
                
                else
                {
                
                    $sql_com = 'DELETE FROM `alpha_logs` 
                                WHERE `date_time` BETWEEN ' . '\'' . mysqli_real_escape_string($mysql_con, $from) . '\'' . ' 
                                                      AND ' . '\'' . mysqli_real_escape_string($mysql_con, $to) . '\'';
                
                }
            
            }
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);

            if ($mysql_result === false)
                return false;
            
            return true;

        }
        
        // Get all physical routes from database
        public static function Get_All_Routes($lang_code)
        {
        
            if (empty($lang_code))
                return false;
            
            $mysql_con = self::Use_DB_Connection();

            if (!$mysql_con)
                return false;
            
            $sql_com = 'CREATE TEMPORARY TABLE `all_routes`(`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                                                            `route` VARCHAR(255) NOT NULL)';
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);
            
            if ($mysql_result === false)
                return false;
            
            if ($lang_code == '*')
            {
            
                $sql_com = 'INSERT INTO `all_routes`(`route`) 
                            SELECT DISTINCT `page` 
                            FROM `alpha_content` 
                            WHERE `is_route` = 1;';
            
            }
            
            else
            {
            
                $sql_com = 'INSERT INTO `all_routes`(`route`) 
                            SELECT DISTINCT `page` 
                            FROM `alpha_content` 
                            INNER JOIN `alpha_languages` 
                            ON `alpha_content`.`lang_id` = `alpha_languages`.`id`
                            WHERE (`is_route` = 1 AND `lang_code` = ' . '\'' . 
                            mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ');';
            
            }
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);
            
            if ($mysql_result === false)
                return false;
            
            if ($lang_code == '*')
            {
            
                $sql_com = 'INSERT INTO `all_routes`(`route`) 
                            SELECT DISTINCT CONCAT_WS(\'_\', `caller`, `menu_link`) as `route` 
                            FROM `alpha_menu` 
                            INNER JOIN `alpha_content` 
                            ON `alpha_menu`.`menu_link` = `alpha_content`.`page` 
                            WHERE `is_route` = 1;';
            
            }
            
            else
            {
            
                $sql_com = 'INSERT INTO `all_routes`(`route`) 
                            SELECT DISTINCT CONCAT_WS(\'_\', `caller`, `menu_link`) as `route` 
                            FROM `alpha_menu` 
                            INNER JOIN `alpha_content` 
                            ON `alpha_menu`.`menu_link` = `alpha_content`.`page` 
                            INNER JOIN `alpha_languages` 
                            ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                            WHERE (`is_route` = 1 AND `lang_code` = ' . '\'' . 
                            mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ');';
            
            }
            
            $mysql_result = self::Execute_SQL_Command($sql_com, 1);
            
            if ($mysql_result === false)
                return false;
            
            $sql_com = 'SELECT DISTINCT `route` 
                        FROM `all_routes`;';
            
            $mysql_result = mysqli_query($mysql_con, $sql_com);

            if (mysqli_error($mysql_con) != '')
            {

                self::DB_Disconnect($mysql_con);

                return false;

            }
            
            $mysql_row = array();
            $routes = array();
            
            $i = 0;
            
            while ($mysql_row = mysqli_fetch_array($mysql_result))
                $routes[$i++] = str_replace ('-', '_', $mysql_row['route']);
            
            self::DB_Disconnect($mysql_con);
            
            if (empty($routes))
                return false;
            
            return $routes;
        
        }
        
        // Go to the specified physical route passing any arguments
        public static function Go_To_Route($route, $args = null)
        {
        
            if (empty($route))
                return false;
            
            $this_route = self::MVC_Get_Route('1');
            
            $all_mvc_routes = self::Get_All_Routes(self::Get_Language());
            
            foreach ($all_mvc_routes as $mvc_route)
            {
            
                if ($this_route == $mvc_route)
                {
                
                    // Check if file exists
                    if (file_exists(UTILITY::Absolute_Path('framework/mvc/models/' . $route . '.php')) === false)
                        return false;
                    
                    // Always include the root model
                    require_once('framework/mvc/models/root.php');
                    
                    // Include the specified model
                    require_once('framework/mvc/models/' . $route . '.php');
                    
                    // Call the specified controller function (if exists)
                    if (in_array($route, get_class_methods('MVC_CONTROLLER')))
                        MVC_CONTROLLER::$route($args);
                    
                    // Check if file exists
                    if (file_exists(UTILITY::Absolute_Path('framework/mvc/views/' . $route . '.phtml')) === false)
                        return false;
                    
                    // Include the specified view
                    require('framework/mvc/views/' . $route . '.phtml');
                    
                    return true;
                
                }
            
            }
            
            return false;
        
        }
    
    }

?>
