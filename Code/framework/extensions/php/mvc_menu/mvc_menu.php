<?php

    /*
    
        GreyOS Inc. - MVC Menu (Infitine menu creator & designer for the front-end)
        
        Version: 2.0
        
        File name: mvc_menu.php
        Description: This file contains the MVC Menu extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Initialize session support
    @session_start();
    
    // MVC Menu class
    class MVC_Menu
    {
    
        // Keep previous parent ID
        private static $__PID = null;
        
        // Tree depth ID
        private static $__td_ID = null;
        
        // Tree depth
        private static $__tree_depth = 0;
        
        // Final menu structure
        private static $__menu_result = null;
        
        // MVC menu route
        private static $__mvc_menu_route = null;
        
        // Draw a dynamic menu
        public static function Show($caller, $parent_menu_id, $lang_code)
        {
        
            if ($caller == '' || is_null($caller) || is_null($parent_menu_id) || empty($lang_code))
                return false;

            $mysql_con = ALPHA_CMS::Use_DB_Connection();

            if ($mysql_con === false)
                return false;

            if ($caller == '*')
            {

                if ($lang_code == '*')
                {

                    $sql_com = 'SELECT `alpha_menu`.`id`, `parent_menu_id`, `caller`, `menu_name`, `menu_link` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE `parent_menu_id` = ' . $parent_menu_id . ' 
                                ORDER BY `alpha_menu`.`sort_order` ASC';

                }

                else
                {

                    $sql_com = 'SELECT `alpha_menu`.`id`, `parent_menu_id`, `caller`, `menu_name`, `menu_link` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`lang_code` = ' . '\'' . 
                                mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY `alpha_menu`.`sort_order` ASC';

                }

            }

            else
            {

                if ($lang_code == '*')
                {

                    $sql_com = 'SELECT `alpha_menu`.`id`, `parent_menu_id`, `caller`, `menu_name`, `menu_link` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY `alpha_menu`.`sort_order` ASC';

                }

                else
                {

                        $sql_com = 'SELECT `alpha_menu`.`id`, `parent_menu_id`, `caller`, `menu_name`, `menu_link` 
                                    FROM `alpha_menu` 
                                    INNER JOIN `alpha_languages` 
                                    ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                    WHERE (`lang_code` = ' . '\'' . 
                                    mysqli_real_escape_string($mysql_con, $lang_code) . '\'' . ' 
                                    AND `caller` = ' . '\'' . mysqli_real_escape_string($mysql_con, $caller) . '\'' . ' 
                                    AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                    ORDER BY `alpha_menu`.`sort_order` ASC';

                }

            }

            $mysql_result = mysqli_query($mysql_con, $sql_com);

            if (!$mysql_result)
                return false;

            $mysql_row = array();

            while ($mysql_row = mysqli_fetch_array($mysql_result))
            {

                self::$__PID = $parent_menu_id;

                self::$__menu_result .= '<ul style="margin-bottom: 10px;">';

                if (is_null($mysql_row['menu_link']) || $mysql_row['menu_link'] == '')
                    $menu_link = '';

                else
                    $menu_link = $mysql_row['menu_link'] . '/';
                
                $this_mvc_menu_route = str_replace('-', '_', substr($mysql_row['caller'] . '_' . $menu_link, 0, 
                                       strpos($mysql_row['caller'] . '_' . $menu_link, '/')));
                
                if ($mysql_row['parent_menu_id'] == self::$__PID && self::$__PID > 0)
                {

                    if (self::$__td_ID != self::$__PID && self::$__td_ID < self::$__PID)
                        self::$__tree_depth += 30;

                    else
                    {

                        if (self::$__td_ID != self::$__PID)
                            self::$__tree_depth = 30;

                    }

                    self::$__td_ID = self::$__PID;
                    
                    self::$__menu_result .= '<li style="margin-left: ' . self::$__tree_depth . 'px;">';
                    
                    if (self::$__mvc_menu_route == $this_mvc_menu_route)
                        self::$__menu_result .= '   <a style="color: #39A3AC;"';
                    
                    else
                        self::$__menu_result .= '   <a';
                    
                    self::$__menu_result .= '   href="/' . ALPHA_CMS::Get_Language() . '/' . 
                                                           $mysql_row['caller'] . '/' . 
                                                           $menu_link . '">' . 
                                                           $mysql_row['menu_name'] . 
                                               '</a>
                                             </li>';
                
                }

                else
                {

                    self::$__tree_depth = 0;

                    self::$__menu_result .= '<li style="list-style-type: none; margin-top: 20px;">';
                    
                    if (self::$__mvc_menu_route == $this_mvc_menu_route)
                        self::$__menu_result .= '   <a style="color: #39A3AC;"';
                    
                    else
                        self::$__menu_result .= '   <a';
                    
                    self::$__menu_result .= '   href="/' . ALPHA_CMS::Get_Language() . '/' . 
                                                           $mysql_row['caller'] . '/' . 
                                                           $menu_link . '">' . 
                                                           $mysql_row['menu_name'] . 
                                               '</a>
                                             </li>';
                
                }
                
                self::$__menu_result .= '</ul>';
                
                // Recursive call
                if ($mysql_row['id'] != $mysql_row['parent_menu_id'])
                    self::Show($caller, $mysql_row['id'], $lang_code);
            
            }

            return self::$__menu_result;

        }
        
        // Store current MVC menu route
        public static function Store_Route($mvc_menu_route)
        {
        
            if (empty($mvc_menu_route))
                return false;
            
            self::$__mvc_menu_route = $mvc_menu_route;
            
            return true;

        }
        
        // Get current MVC menu route parent menu
        public static function Get_Parent_Menu()
        {
        
            $under_score_pos = strpos(self::$__mvc_menu_route, '_');
            
            if ($under_score_pos === false)
                $parent_menu = self::$__mvc_menu_route;
            
            else
                $parent_menu = substr(self::$__mvc_menu_route, 0, $under_score_pos);
            
            return $parent_menu;
        
        }

    }

?>
