<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: menu_update.php
        Description: This file contains the AJAX menu update.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Disable error reporting
    error_reporting(0);
    
    // Intialize session support
    @session_start();
    
    if (is_null($_SESSION['ALPHA_CMS_USER_TYPE']))
        return 0;
    
    if ($_SESSION['ALPHA_CMS_USER_TYPE'] > 1)
        return 0;
    
    // Include ALPHA Framework class
    require('../../../../../../framework/alpha.php');
    
    // Include ALPHA CMS class
    require('../../../../../../cms/alpha_cms.php');
    
    // Language ID
    $lang_id = array();
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return 0;
    
    // Load THOR extension
    ALPHA_CMS::Load_Extension('thor', 'php');
    
    // Load Error Reporter extension
    ALPHA_CMS::Load_Extension('error_reporter', 'php');
    
    if ($_POST['update'] == 1 && !empty($_POST['menu_id']) && !empty($_POST['caller']) && 
        !is_null($_POST['pid']) && $_POST['pid'] != '' &&
        !empty($_POST['menu_name']) && !empty($_POST['sort']) && !empty($_POST['lang_code']) && !empty($_POST['global_lang']))
    {
    
        if (Thor($_POST['caller'], 1) === false || Thor($_POST['menu_name'], 1) === false || 
            Thor($_POST['menu_link'], 1) === false || Thor($_POST['lang_code'], 1) === false)
        {
        
            echo Error_Reporter('1', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `is_protected` 
                                                  FROM `alpha_menu` 
                                                  WHERE `id` = ' . 
                                                  mysqli_real_escape_string($db_con, $_POST['menu_id']), 1);
        
        if (!empty($result) && $result[0][0] == 1 && $_SESSION['ALPHA_CMS_USER'] != 'admin')
        {
        
            echo Error_Reporter('23', $_POST['global_lang']);
            
            return 0;
        
        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_menu`.`id` 
                                                  FROM `alpha_menu` 
                                                  INNER JOIN `alpha_languages` 
                                                  ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                                  WHERE (`parent_menu_id` = ' . 
                                                  mysqli_real_escape_string($db_con, $_POST['pid']) . ' AND 
                                                         `caller` = ' . '\'' .  
                                                  mysqli_real_escape_string($db_con, $_POST['caller']) . '\''  . ' AND 
                                                         `menu_link` = ' . '\'' . 
                                                  mysqli_real_escape_string($db_con, $_POST['menu_link']) . '\'' . ' AND 
                                                         `lang_code` = ' . '\'' . 
                                                  mysqli_real_escape_string($db_con, $_POST['lang_code']) . '\'' . ')', 1);
        
        if (!empty($result) && $result[0][0] <> $_POST['menu_id'])
        {

            echo Error_Reporter('20', $_POST['global_lang']);
            
            return 0;

        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `menu_link` 
                                                  FROM `alpha_menu` 
                                                  WHERE `id` = ' . 
                                                  mysqli_real_escape_string($db_con, $_POST['menu_id']), 1);
        
        if (!empty($result))
            $menu_link_temp = $result[0][0];
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_menu`.`id`, `alpha_menu`.`sort_order` 
                                                  FROM `alpha_menu` 
                                                  INNER JOIN `alpha_languages` 
                                                  ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                                  WHERE (`parent_menu_id` = ' . 
                                                  mysqli_real_escape_string($db_con, $_POST['pid']) . ' AND 
                                                         `caller` = ' . '\'' .  
                                                  mysqli_real_escape_string($db_con, $_POST['caller']) . '\''  . ' AND 
                                                         `lang_code` = ' . '\'' . 
                                                  mysqli_real_escape_string($db_con, $_POST['lang_code']) . '\'' . ')', 1);
        
        foreach ($result as $this_row)
        {
        
            if ($this_row[0] <> $_POST['menu_id'] && $this_row[1] == $_POST['sort'])
            {

                echo Error_Reporter('21', $_POST['global_lang']);

                return 0;

            }
        
        }
        
        $lang_id = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                   FROM `alpha_languages` 
                                                   WHERE `lang_code` = ' . '\'' . 
                                                   mysqli_real_escape_string($db_con, $_POST['lang_code']) . '\'', 1);
        
        if (!empty($_POST['menu_link']))
        {
            
            $needles = array(0 => '-', 1 => '_');
            
            if (!file_exists(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.php'))
            {

                if (file_exists(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.php'))
                {

                    $file_result = unlink(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.php');
                    
                    if ($file_result === false)
                    {

                        echo Error_Reporter('10', $_POST['global_lang']);

                        return 0;

                    }

                }
                
                $file_handler = fopen(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.php', 'w');

                if ($file_handler === false)
                {

                    echo Error_Reporter('7', $_POST['global_lang']);

                    return 0;

                }

                $file_result = fwrite($file_handler, '<?php

    /*

        GreyOS Inc. - ALPHA CMS

        File name: ' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.php
        Description: This file contains the ' . strtoupper(str_replace($needles, ' ', $_POST['caller']  . '_' . $_POST['menu_link'])) . ' MODEL class.

    */



    // ' . strtoupper(str_replace($needles, ' ', $_POST['caller']  . '_' . $_POST['menu_link'])) . ' MODEL class
    class ' . strtoupper(str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link'])) . '_MODEL extends ROOT_MODEL
    {



    }

?>
');
                
                fclose($file_handler);
                
                chmod(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.php', '0777');
            
            }
            
            if (!file_exists(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.phtml'))
            {

                if (file_exists(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.phtml'))
                {

                    $file_result = unlink(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.phtml');

                    if ($file_result === false)
                    {

                        echo Error_Reporter('10', $_POST['global_lang']);

                        return 0;

                    }

                }

                $file_handler = fopen(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.phtml', 'w');

                if ($file_handler === false)
                {

                    echo Error_Reporter('7', $_POST['global_lang']);

                    return 0;

                }

                $file_result = fwrite($file_handler, '<?php

    /*

        GreyOS Inc. - ALPHA CMS

        File name: ' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.phtml
        Description: This file contains the ' . str_replace($needles, ' ', $_POST['caller']  . ' ' . $_POST['menu_link']) . ' view.

    */

?>



    <div id="main_content">
        <?php echo ALPHA_CMS::Load_Content(' . '\'' . $_POST['menu_link'] . '\'' . 
                                           ', \'content\', ALPHA_CMS::Get_Language()); ?>
    </div>
    
    <div id="sidebar">
        <?php
        
            $parent_menu = MVC_Menu::Get_Parent_Menu();
            
            $mvc_menu = MVC_Menu::Show($parent_menu, 0, ALPHA_CMS::Get_Language());
            
            echo \'<h3>\' . ALPHA_CMS::Load_Content(' . '\'' . $_POST['caller'] . '\'' . 
                 ', \'content\', ALPHA_CMS::Get_Language()) . \'</h3>\';
            echo $mvc_menu;
        
        ?>
    </div>
    
    ');

                fclose($file_handler);

                chmod(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.phtml', '0777');

            }
        
        }
        
        else
        {
        
            if (file_exists(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.php'))
            {

                $file_result = unlink(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.php');

                if ($file_result === false)
                {

                    echo Error_Reporter('10', $_POST['global_lang']);

                    return 0;

                }
            
            }

            if (file_exists(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.phtml'))
            {

                $file_result = unlink(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $menu_link_temp) . '.phtml');

                if ($file_result === false)
                {

                    echo Error_Reporter('10', $_POST['global_lang']);

                    return 0;

                }

            }
        
        }
        
        $result = ALPHA_CMS::Update_Menu($_POST['menu_id'], $_POST['caller'], $_POST['pid'], $_POST['menu_name'], 
                                         $_POST['menu_link'], $lang_id[0][0], $_POST['sort'], $_POST['is_protected']);
        
        if ($result === false)
        {
        
            echo Error_Reporter('23', $_POST['global_lang']);
            
            return 0;
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('23', $_POST['global_lang']);
    
    return 0;

?>
