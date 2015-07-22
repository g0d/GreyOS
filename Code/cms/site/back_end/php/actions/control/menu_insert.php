<?php

    /*
    
        GreyOS Inc. - ALPHA CMS
        
        Version: 10.0
        
        File name: menu_insert.php
        Description: This file contains the AJAX menu insert.
        
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
    
    if ($_POST['insert'] == 1 && !empty($_POST['caller']) && !is_null($_POST['pid']) && $_POST['pid'] != '' &&
        !empty($_POST['menu_name']) && !empty($_POST['sort']) && !empty($_POST['lang_code']) && !empty($_POST['global_lang']))
    {
    
        if (Thor($_POST['caller'], 1) === false || Thor($_POST['menu_name'], 1) === false || 
            Thor($_POST['menu_link'], 1) === false || Thor($_POST['lang_code'], 1) === false)
        {
        
            echo Error_Reporter('1', $_POST['global_lang']);
            
            return 0;
        
        }
        
        if ($_POST['pid'] == '-1')
            $_POST['pid'] = '0';
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_menu`.`id` 
                                                  FROM `alpha_menu` 
                                                  INNER JOIN `alpha_languages` 
                                                  ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                                  WHERE (`parent_menu_id` = ' . 
                                                  mysql_real_escape_string($_POST['pid'], $db_con) . ' AND 
                                                         `caller` = ' . '\'' .  
                                                  mysql_real_escape_string($_POST['caller'], $db_con) . '\''  . ' AND 
                                                         `menu_link` = ' . '\'' . 
                                                  mysql_real_escape_string($_POST['menu_link'], $db_con) . '\'' . ' AND 
                                                         `lang_code` = ' . '\'' . 
                                                  mysql_real_escape_string($_POST['lang_code'], $db_con) . '\'' . ')', 1);
        
        if (!empty($result) && $result[0][0])
        {

            echo Error_Reporter('20', $_POST['global_lang']);

            return 0;

        }
        
        $result = ALPHA_CMS::Execute_SQL_Command('SELECT `alpha_menu`.`sort_order` 
                                                  FROM `alpha_menu` 
                                                  INNER JOIN `alpha_languages` 
                                                  ON `alpha_menu`.`lang_id` = `alpha_languages`.`id` 
                                                  WHERE (`parent_menu_id` = ' . 
                                                  mysql_real_escape_string($_POST['pid'], $db_con) . ' AND 
                                                         `caller` = ' . '\'' .  
                                                  mysql_real_escape_string($_POST['caller'], $db_con) . '\''  . ' AND 
                                                         `lang_code` = ' . '\'' . 
                                                  mysql_real_escape_string($_POST['lang_code'], $db_con) . '\'' . ')', 1);
        
        foreach ($result as $this_row)
        {
        
            foreach($this_row as $this_val)
            {
            
                if ($_POST['sort'] == $this_val)
                {

                    echo Error_Reporter('21', $_POST['global_lang']);

                    return 0;

                }
            
            }
        
        }
        
        $lang_id = ALPHA_CMS::Execute_SQL_Command('SELECT `id` 
                                                   FROM `alpha_languages` 
                                                   WHERE `lang_code` = ' . '\'' . 
                                                   mysql_real_escape_string($_POST['lang_code'], $db_con) . '\'', 1);
        
        if (!empty($_POST['menu_link']) && 
            !file_exists(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.php') && 
            !file_exists(realpath('../../../../../../framework/mvc/views/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.phtml'))
        {
        
        
            $file_handler = fopen(realpath('../../../../../../framework/mvc/models/') . '/' . str_replace('-', '_', $_POST['caller']  . '_' . $_POST['menu_link']) . '.php', 'w');

            if ($file_handler === false)
            {

                echo Error_Reporter('7', $_POST['global_lang']);

                return 0;

            }

            $needles = array(0 => '-', 1 => '_');
            
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
        
        $result = ALPHA_CMS::Insert_Menu($_POST['caller'], $_POST['pid'], $_POST['menu_name'], 
                                         $_POST['menu_link'], $lang_id[0][0], $_POST['sort'], $_POST['is_protected']);
        
        if ($result === false)
        {
        
            echo Error_Reporter('22', $_POST['global_lang']);
            
            return 0;
        
        }
        
        echo 1;
        
        return 1;
    
    }
    
    echo Error_Reporter('22', $_POST['global_lang']);
    
    return 0;

?>
