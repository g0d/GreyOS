<?php

    /*
    
        GreyOS Inc. - Search Bar
        
        Version: 2.2
        
        File name: search_bar.php
        Description: This file contains the Search Bar extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Initialize session support
    @session_start();
    
    // Search Bar class
    class Search_Bar
    {
    
        // Show search bar
        public static function Show($active = true)
        {

            if (empty($_POST['search_bar']))
                $_POST['search_bar'] = '';

            if ($active === true)
            {

                echo '<div id="search_bar_div" style="float: left; margin-left: 20px;">
                        <input id="search_bar" name="search_bar" 
                               type="text" maxlength="100" style="float: left; margin-right: 5px;" value="' . 
                        htmlspecialchars($_POST['search_bar']) . '" />
                        <input id="new_search" class="button" type="submit" value="' . 
                        ALPHA_CMS::Load_Content('search_label', 'content', ALPHA_CMS::Get_Language()) . '" />
                      </div>';

            }

            else
            {

                echo '<div id="search_bar_div" style="float: left; margin-left: 20px;">
                        <input id="search_bar" name="search_bar" 
                               type="text" maxlength="100" style="float: left; margin-right: 5px;" value="" disabled />
                        <input id="new_search" class="button" type="submit" style="color: #BFBFBF;" value="' . 
                        ALPHA_CMS::Load_Content('search_label', 'content', ALPHA_CMS::Get_Language()) . '" disabled />
                      </div>';

            }

        }
        
        // Search for a string among database string fields
        public static function Search($caller, $search_str, $order_type = null, $sort_type = null)
        {

            if ($caller == '' || is_null($caller) || empty($search_str))
                return false;

            $result = array();

            $mysql_con = ALPHA_CMS::Use_DB_Connection();

            if ($mysql_con === false)
                return false;

            $search_str = mysql_real_escape_string(htmlentities(trim($search_str), ENT_NOQUOTES, 'utf-8'), $mysql_con);

            // --- Your code from here ---

            if ($caller == 'common')
            {
            
                if (empty($order_type) || empty($sort_type))
                {
                
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_common`.`id`, `site_title`, `site_description`, 
                                                                     `site_keywords`, `company_name`, `company_site`, `footer_info`, 
                                                                     `lang_code`, `alpha_common`.`is_protected`
                                                              FROM `alpha_common` 
                                                              INNER JOIN `alpha_languages` 
                                                              ON `alpha_common`.`lang_id` = `alpha_languages`.`id` 
                                                              WHERE (`site_title` LIKE \'%' . $search_str . '%\' OR 
                                                                     `site_description` LIKE \'%' . $search_str . '%\' OR 
                                                                     `site_keywords` LIKE \'%' . $search_str . '%\' OR 
                                                                     `company_name` LIKE \'%' . $search_str . '%\' OR 
                                                                     `company_site` LIKE \'%' . $search_str . '%\' OR 
                                                                     `footer_info` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `alpha_common`.`id` ASC', 1);

                }

                else
                {
                
                    $db_fields = array(0 => 'id', 
                                       1 => 'site_title', 
                                       2 => 'site_description', 
                                       3 => 'site_keywords', 
                                       4 => 'company_name', 
                                       5 => 'company_site', 
                                       6 => 'footer_info', 
                                       7 => 'lang_id', 
                                       8 => 'is_protected');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $db_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_common`.`id`, `site_title`, `site_description`, 
                                                                    `site_keywords`, `company_name`, `company_site`, `footer_info`, 
                                                                    `lang_code`, `alpha_common`.`is_protected`
                                                            FROM `alpha_common` 
                                                            INNER JOIN `alpha_languages` 
                                                            ON `alpha_common`.`lang_id` = `alpha_languages`.`id` 
                                                            WHERE (`site_title` LIKE \'%' . $search_str . '%\' OR 
                                                                    `site_description` LIKE \'%' . $search_str . '%\' OR 
                                                                    `site_keywords` LIKE \'%' . $search_str . '%\' OR 
                                                                    `company_name` LIKE \'%' . $search_str . '%\' OR 
                                                                    `company_site` LIKE \'%' . $search_str . '%\' OR 
                                                                    `footer_info` LIKE \'%' . $search_str . '%\') 
                                                            ORDER BY `alpha_common`.`' . $order_type . '` ' . $sort_type, 1);
                
                }

            }

            elseif ($caller == 'content')
            {

                if (empty($order_type) || empty($sort_type))
                {

                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_content`.`id`, `page`, `content`, 
                                                                     `keywords`, `lang_code`, 
                                                                     `alpha_content`.`is_protected`, `is_route` 
                                                              FROM `alpha_content` 
                                                              INNER JOIN `alpha_languages` 
                                                              ON `alpha_content`.`lang_id` = `alpha_languages`.`id` 
                                                              WHERE (`page` LIKE \'%' . $search_str . '%\' OR 
                                                                     `content` LIKE \'%' . $search_str . '%\' OR 
                                                                     `keywords` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `alpha_content`.`id` ASC', 1);

                }

                else
                {

                    $db_fields = array(0 => 'id', 
                                       1 => 'page', 
                                       2 => 'content', 
                                       3 => 'keywords', 
                                       4 => 'lang_id', 
                                       5 => 'is_protected', 
                                       6 => 'is_route');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $db_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_content`.`id`, `page`, `content`, 
                                                                     `keywords`, `lang_code`, 
                                                                     `alpha_content`.`is_protected`, `is_route` 
                                                              FROM `alpha_content` 
                                                              INNER JOIN `alpha_languages` 
                                                              ON `alpha_content`.`lang_id` = `alpha_languages`.`id` 
                                                              WHERE (`page` LIKE \'%' . $search_str . '%\' OR 
                                                                     `content` LIKE \'%' . $search_str . '%\' OR 
                                                                     `keywords` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `alpha_content`.`' . $order_type . '` ' . $sort_type, 1); 

                }

            }

            elseif ($caller == 'menu')
            {

                if (empty($order_type) || empty($sort_type))
                {

                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `caller` 
                                                              FROM `alpha_menu` 
                                                              WHERE (`caller` LIKE \'%' . $search_str . '%\' OR 
                                                                     `menu_name` LIKE \'%' . $search_str . '%\' OR 
                                                                     `menu_link` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `alpha_menu`.`id` ASC', 1);

                }

                else
                {

                    $db_fields = array(0 => 'id', 
                                       1 => 'caller', 
                                       2 => 'parent_menu_id', 
                                       3 => 'menu_name', 
                                       4 => 'menu_link', 
                                       5 => 'lang_id', 
                                       6 => 'sort_order', 
                                       7 => 'is_protected');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $db_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `caller` 
                                                              FROM `alpha_menu` 
                                                              WHERE (`caller` LIKE \'%' . $search_str . '%\' OR 
                                                                     `menu_name` LIKE \'%' . $search_str . '%\' OR 
                                                                     `menu_link` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `alpha_menu`.`' . $order_type . '` ' . $sort_type, 1);

                }

            }

            elseif ($caller == 'orphan')
            {

                if (empty($order_type) || empty($sort_type))
                {

                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `caller` 
                                                              FROM `alpha_menu` 
                                                              WHERE (`parent_menu_id` <> 0 AND 
                                                                     `parent_menu_id` NOT IN (SELECT `id` 
                                                                                              FROM `alpha_menu`) AND 
                                                                     (`caller` LIKE \'%' . $search_str . '%\' OR 
                                                                      `menu_name` LIKE \'%' . $search_str . '%\' OR 
                                                                      `menu_link` LIKE \'%' . $search_str . '%\')) 
                                                              ORDER BY `alpha_menu`.`id` ASC', 1);

                }

                else
                {

                    $db_fields = array(0 => 'id', 
                                       1 => 'caller', 
                                       2 => 'parent_menu_id', 
                                       3 => 'menu_name', 
                                       4 => 'menu_link', 
                                       5 => 'lang_id', 
                                       6 => 'sort_order', 
                                       7 => 'is_protected');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $db_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `caller` 
                                                              FROM `alpha_menu` 
                                                              WHERE (`parent_menu_id` <> 0 AND 
                                                                     `parent_menu_id` NOT IN (SELECT `id` 
                                                                                              FROM `alpha_menu`) AND 
                                                                     (`caller` LIKE \'%' . $search_str . '%\' OR 
                                                                      `menu_name` LIKE \'%' . $search_str . '%\' OR 
                                                                      `menu_link` LIKE \'%' . $search_str . '%\')) 
                                                              ORDER BY `alpha_menu`.`' . $order_type . '` ' . $sort_type, 1);

                }

            }

            elseif ($caller == 'langs')
            {

                if (empty($order_type) || empty($sort_type))
                {

                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `lang_code`, `language`, 
                                                                     `sort_order`, `is_protected` 
                                                              FROM `alpha_languages`
                                                              WHERE (`lang_code` LIKE \'%' . $search_str . '%\' OR 
                                                                     `language` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `id` ASC', 1);

                }

                else
                {

                    $db_fields = array(0 => 'id', 
                                       1 => 'lang_code', 
                                       2 => 'language', 
                                       3 => 'sort_order', 
                                       4 => 'is_default', 
                                       5 => 'is_protected');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $db_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `lang_code`, `language`, 
                                                                     `sort_order`, `is_protected` 
                                                              FROM `alpha_languages`
                                                              WHERE (`lang_code` LIKE \'%' . $search_str . '%\' OR 
                                                                     `language` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `' . $order_type . '` ' . $sort_type, 1);

                }

            }

            elseif ($caller == 'ext')
            {

                ALPHA_CMS::Load_Extension('ext_man', 'php');
                
                if (!empty($order_type) && !empty($sort_type))
                {
                
                    $file_fields = array(0 => 'title', 
                                         1 => 'path', 
                                         2 => 'type', 
                                         3 => 'protected', 
                                         4 => 'status');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $file_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $exts = Show_Extensions(ALPHA_CMS::Absolute_Path('framework/extensions/'), 'php', $order_type, $sort_type, $search_str);
                    $exts = array_merge($exts, Show_Extensions(ALPHA_CMS::Absolute_Path('framework/extensions/'), 'js', $order_type, $sort_type, $search_str));
                    $result = array_merge($exts, Show_Extensions(ALPHA_CMS::Absolute_Path('framework/extensions/'), 'ajax', $order_type, $sort_type, $search_str));

                }

                else
                {

                    $exts = Show_Extensions(ALPHA_CMS::Absolute_Path('framework/extensions/'), 'php', 'title', 'ASC', $search_str);
                    $exts = array_merge($exts, Show_Extensions(ALPHA_CMS::Absolute_Path('framework/extensions/'), 'js', 'title', 'ASC', $search_str));
                    $result = array_merge($exts, Show_Extensions(ALPHA_CMS::Absolute_Path('framework/extensions/'), 'ajax', 'title', 'ASC', $search_str));

                }

            }

            elseif ($caller == 'users')
            {

                if (empty($order_type) || empty($sort_type))
                {

                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `username`, `email`, `type` 
                                                              FROM `alpha_users`
                                                              WHERE (`username` LIKE \'%' . $search_str . '%\' OR 
                                                                     `email` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `id` ASC', 1);

                }

                else
                {

                    $db_fields = array(0 => 'id', 
                                       1 => 'username', 
                                       2 => 'email', 
                                       3 => 'password', 
                                       4 => 'type');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $db_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT `id`, `username`, `email`, `type` 
                                                              FROM `alpha_users`
                                                              WHERE (`username` LIKE \'%' . $search_str . '%\' OR 
                                                                     `email` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `' . $order_type . '` ' . $sort_type, 1);

                }

            }

            elseif ($caller == 'logs')
            {

                if (empty($order_type) || empty($sort_type))
                {

                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT * 
                                                              FROM `alpha_logs` 
                                                              WHERE (`entity` LIKE \'%' . $search_str . '%\' OR 
                                                                     `error_code` LIKE \'%' . $search_str . '%\' OR 
                                                                     `message` LIKE \'%' . $search_str . '%\' OR 
                                                                     `file` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `id` ASC', 1);

                }

                else
                {

                    $db_fields = array(0 => 'id', 
                                       1 => 'entity', 
                                       2 => 'error_code', 
                                       3 => 'message', 
                                       4 => 'file', 
                                       5 => 'line', 
                                       6 => 'date_time');
                    
                    $sort_values = array(0 => 'ASC', 
                                         1 => 'DESC');
                    
                    if (!in_array($order_type, $db_fields) || !in_array($sort_type, $sort_values))
                        return false;
                    
                    $result = ALPHA_CMS::Execute_SQL_Command('SELECT * 
                                                              FROM `alpha_logs` 
                                                              WHERE (`entity` LIKE \'%' . $search_str . '%\' OR 
                                                                     `error_code` LIKE \'%' . $search_str . '%\' OR 
                                                                     `message` LIKE \'%' . $search_str . '%\' OR 
                                                                     `file` LIKE \'%' . $search_str . '%\') 
                                                              ORDER BY `' . $order_type . '` ' . $sort_type, 1);

                }

            }

            else
                return false;

            // --- to here ---

            return $result;

        }
    
    }
    
    
    
    /* ---------- End ---------- */

?>
