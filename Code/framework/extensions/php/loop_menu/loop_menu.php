<?php

    /*
    
        GreyOS Inc. - Loop Menu (Infitine menu creator & designer for the back-end)
        
        Version: 1.5
        
        File name: loop_menu.php
        Description: This file contains the Loop Menu extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Keep previous parent ID
    $PID = null;
    
    // Tree symbol
    $tree_symbol = null;
    
    // Tree depth ID
    $td_ID = null;
    
    // Tree depth
    $tree_depth = 0;
    
    // Orphans array
    $orphans = array();
    
    // A simple row counter
    $row = 0;
    
    // Draw a dynamic menu
    function Loop_Menu($caller, $parent_menu_id, $lang_code, $orphan, $order_field = null, $sort_type = null)
    {
    
        global $PID;
        global $tree_symbol;
        global $td_ID;
        global $tree_depth;
        global $row;
        global $orphans;
        
        if ($caller == '' || is_null($caller) || is_null($parent_menu_id) || empty($lang_code) || 
            is_null($orphan) || strval($orphan) < 0 || strval($orphan) > 1)
            return false;
        
        $mysql_con = ALPHA_CMS::Use_DB_Connection();
        
        if ($mysql_con === false)
            return false;
        
        if ($orphan == 1)
        {
        
            $orphans = ALPHA_CMS::Execute_SQL_Command('SELECT DISTINCT `parent_menu_id` 
                                                       FROM `alpha_menu` 
                                                       WHERE (`parent_menu_id` <> 0 AND 
                                                              `parent_menu_id` NOT IN 
                                                               (SELECT `id` 
                                                                FROM `alpha_menu`) OR 
                                                              `id` = `parent_menu_id`)', 1);
            
            if (empty($orphans))
                return false;
            
            foreach ($orphans as $this_orphan)
            {
            
                $tree_depth = 0;
                $mysql_con = null;
                
                // Recursive call to itself
                Loop_Menu($caller, $this_orphan['parent_menu_id'], $lang_code, 0, $order_field, $sort_type);
            
            }
        
        }
        
        if ($mysql_con === null)
            return false;
        
        if ($caller == '*')
        {

            if ($lang_code == '*')
            {

                if ($order_field === null && $sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE `parent_menu_id` = ' . $parent_menu_id . ' 
                                ORDER BY `alpha_menu`.`sort_order` ASC';
                
                }

                elseif ($sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE `parent_menu_id` = ' . $parent_menu_id . ' 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ASC';
                
                }

                else
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE `parent_menu_id` = ' . $parent_menu_id . ' 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ' . 
                                mysql_real_escape_string($sort_type, $mysql_con);
                
                }

            }

            else
            {

                if ($order_field === null && $sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`lang_code` = ' . '\'' . 
                                mysql_real_escape_string($lang_code, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY `alpha_menu`.`sort_order` ASC';
                
                }

                elseif ($sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`lang_code` = ' . '\'' . 
                                mysql_real_escape_string($lang_code, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ASC';
                
                }

                else
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`lang_code` = ' . '\'' . 
                                mysql_real_escape_string($lang_code, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ' . 
                                mysql_real_escape_string($sort_type, $mysql_con);
                
                }

            }

        }
        
        else
        {

            if ($lang_code == '*')
            {
            
                if ($order_field === null && $sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`caller` = ' . '\'' . mysql_real_escape_string($caller, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY `alpha_menu`.`sort_order` ASC';
                
                }

                elseif ($sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`caller` = ' . '\'' . mysql_real_escape_string($caller, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ASC';
                
                }

                else
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`caller` = ' . '\'' . mysql_real_escape_string($caller, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ' . 
                                mysql_real_escape_string($sort_type, $mysql_con);
                
                }

            }

            else
            {

                if ($order_field === null && $sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`lang_code` = ' . '\'' . 
                                mysql_real_escape_string($lang_code, $mysql_con) . '\'' . ' 
                                AND `caller` = ' . '\'' . mysql_real_escape_string($caller, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY `alpha_menu`.`sort_order` ASC';
                
                }

                elseif ($sort_type === null)
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`lang_code` = ' . '\'' . 
                                mysql_real_escape_string($lang_code, $mysql_con) . '\'' . ' 
                                AND `caller` = ' . '\'' . mysql_real_escape_string($caller, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ASC';
                
                }

                else
                {
                
                    $sql_com = 'SELECT `alpha_menu`.`id`, `caller`, `parent_menu_id`, 
                                       `menu_name`, `menu_link`, 
                                       `lang_code`, `alpha_menu`.`sort_order`, 
                                       `alpha_menu`.`is_protected` 
                                FROM `alpha_menu` 
                                INNER JOIN `alpha_languages` 
                                ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                WHERE (`lang_code` = ' . '\'' . 
                                mysql_real_escape_string($lang_code, $mysql_con) . '\'' . ' 
                                AND `caller` = ' . '\'' . mysql_real_escape_string($caller, $mysql_con) . '\'' . ' 
                                AND `parent_menu_id` = ' . $parent_menu_id . ') 
                                ORDER BY ' . mysql_real_escape_string($order_field, $mysql_con) . ' ' . 
                                mysql_real_escape_string($sort_type, $mysql_con);
                
                }

            }

        }
        
        if ($mysql_con === false)
            return true;
        
        $mysql_result = mysql_query($sql_com, $mysql_con);
        
        if (!$mysql_result)
            return true;
        
        $mysql_row = array();

        $tree_symbol = '|___';
        
        $my_lang = ALPHA_CMS::Get_Language();
        
        while ($mysql_row = mysql_fetch_array($mysql_result))
        {
        
            $PID = $parent_menu_id;
            
            if ($mysql_row['is_protected'] == 1)
                $protected_answer = ALPHA_CMS::Load_Content('yes_label', 'content', $my_lang);
            
            else
                $protected_answer = ALPHA_CMS::Load_Content('no_label', 'content', $my_lang);
            
            if ($row % 2 == 0)
                echo '<div class="class_admin_menu_item class_menu_odd">';

            else
                echo '<div class="class_admin_menu_item class_menu_even">';

            if ($mysql_row['parent_menu_id'] == $PID && $PID > 0)
            {
            
                if ($td_ID != $PID && $td_ID < $PID)
                    $tree_depth += 30;
                
                else
                {
                
                    if ($td_ID != $PID)
                        $tree_depth = 30;
                
                }
                
                $td_ID = $PID;

                echo '<div style="margin-left: ' . $tree_depth . 'px;">' . $tree_symbol .
                     '<div style="margin-top: -10px; margin-left: 30px;">' . 
                     ALPHA_CMS::Load_Content('id_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $mysql_row['id'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('caller_label', 'content', $my_lang). 
                     ': <span style="font-weight: normal;">' . $mysql_row['caller'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('parent_menu_id_label', 'content', $my_lang). 
                     ': <span style="font-weight: normal;">' . $mysql_row['parent_menu_id'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('menu_name_label', 'content', $my_lang) . ': ' . 
                     '<span style="font-weight: normal;">' . $mysql_row['menu_name'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('menu_link_label', 'content', $my_lang) . ': ' . 
                     '<span style="font-weight: normal;">' . $mysql_row['menu_link'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('lang_code_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $mysql_row['lang_code'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('sort_order_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $mysql_row['sort_order'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('protected_content_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $protected_answer . '</span>
                      </div>
                      </div>';

                if ($row % 2 == 0)
                    $options = '<div style="color: #634536; text-align: right; margin-top: 5px; padding: 4px;" 
                                     class="class_menu_options_odd">';

                else
                    $options = '<div style="color: #634536; text-align: right; margin-top: 5px; padding: 4px;" 
                                     class="class_menu_options_even">';

                if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                {
                
                    if (!empty($mysql_row['is_protected']))
                    {

                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                        {
                        
                            $options .= '<span class="class_menu_controls" onclick="Edit_Menu(' . $mysql_row['id'] . ');">' . 
                                        ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';
                        
                        }
                        
                        else
                        {
                        
                            $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                        ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';
                        
                        }
                    
                    }
                    
                    else
                    {
                    
                        $options .= '<span class="class_menu_controls" onclick="Edit_Menu(' . $mysql_row['id'] . ');">' . 
                                    ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';
                    
                    }
                
                }

                else
                {

                    $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                }
                
                if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                {
                
                    if (!empty($mysql_row['is_protected']))
                    {

                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                        {
                        
                            $options .= '<span class="class_menu_controls" onclick="Delete_Menu(' . $mysql_row['id'] . ');">' . 
                                        ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';
                        
                        }
                        
                        else
                        {
                        
                            $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                        ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';  
                        
                        }
                    
                    }
                    
                    else
                    {
                    
                        
                        $options .= '<span class="class_menu_controls" onclick="Delete_Menu(' . $mysql_row['id'] . ');">' . 
                                    ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';
                    
                    }
                
                }

                else
                {

                    $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';

                }

                echo $options;

                echo '</div>';

            }

            else
            {

                $tree_depth = 0;

                echo '<div>' . 
                     ALPHA_CMS::Load_Content('id_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $mysql_row['id'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('caller_label', 'content', $my_lang). 
                     ': <span style="font-weight: normal;">' . $mysql_row['caller'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('parent_menu_id_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $mysql_row['parent_menu_id'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('menu_name_label', 'content', $my_lang) . ': ' . 
                     '<span style="font-weight: normal;">' . $mysql_row['menu_name'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('menu_link_label', 'content', $my_lang) . ': ' . 
                     '<span style="font-weight: normal;">' . $mysql_row['menu_link'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('lang_code_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $mysql_row['lang_code'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('sort_order_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $mysql_row['sort_order'] . '</span><br>' . 
                     ALPHA_CMS::Load_Content('protected_content_label', 'content', $my_lang) . 
                     ': <span style="font-weight: normal;">' . $protected_answer . '</span>';

                if ($row % 2 == 0)
                    $options = '<div style="color: #634536; text-align: right; margin-top: 5px; padding: 4px;" 
                                     class="class_menu_options_odd">';

                else
                    $options = '<div style="color: #634536; text-align: right; margin-top: 5px; padding: 4px;" 
                                     class="class_menu_options_even">';

                if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                {
                
                    if (!empty($mysql_row['is_protected']))
                    {

                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                        {

                            $options .= '<span class="class_menu_controls" onclick="Edit_Menu(' . $mysql_row['id'] . ');">' . 
                                        ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                        }
                        
                        else
                        {
                        
                            $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                        ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';
                        
                        }

                    }
                    
                    else
                    {
                    
                        $options .= '<span class="class_menu_controls" onclick="Edit_Menu(' . $mysql_row['id'] . ');">' . 
                                    ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';
                    
                    }
                
                }

                else
                {

                    $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                }
                
                if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                {
                
                    if (!empty($mysql_row['is_protected']))
                    {

                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                        {
                        
                            $options .= '<span class="class_menu_controls" onclick="Delete_Menu(' . $mysql_row['id'] . ');">' . 
                                        ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';
                        
                        }
                        
                        else
                        {
                        
                            $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                        ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';
                        
                        }
                    
                    }
                    
                    else
                    {
                    
                        $options .= '<span class="class_menu_controls" onclick="Delete_Menu(' . $mysql_row['id'] . ');">' . 
                                    ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';
                    
                    }
                
                }

                else
                {

                    $options .= '<span style="color: #646464; font-weight: normal; cursor: pointer;">' . 
                                ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';

                }

                echo $options;

                echo '</div>
                      </div>';

            }

            echo '</div>';
            
            $row++;
            
            // Recursive call to itself
            if ($mysql_row['id'] != $mysql_row['parent_menu_id'])
                Loop_Menu($caller, $mysql_row['id'], $lang_code, $orphan, $order_field, $sort_type);
        
        }
    
    }

?>
