<?php

    /*
    
        GreyOS Inc. - AJAX menu manager
        
        Version: 3.0
        
        File name: menu_manager.php
        Description: This file contains the AJAX menu manager extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    

    // Disable error reporting
    error_reporting(0);

    // Include ALPHA Framework class
    require('../../../alpha.php');

    // Include ALPHA CMS class
    require('../../../../cms/alpha_cms.php');
    
    // Open a connection to the DB
    $db_con = ALPHA_CMS::Use_DB_Connection();
    
    if ($db_con === false)
        return null;
    
    // Load menu
    if ($_POST['menu_type'] == '0')
    {
    
        // Load content elements
        $this_content = ALPHA_CMS::Load_Content($_POST['caller'], 'content', $_POST['lang']);
        $keywords = ALPHA_CMS::Load_Content($_POST['caller'], 'keywords', $_POST['lang']);
        
        if ($this_content === false)
            return null;
        
        $result = '<div class="content">' . $this_content . '</div>' . '<div class="keywords">' . $keywords . '</div>';
        
        echo $result;
    
    }
    
    // Load menu related content
    elseif ($_POST['menu_type'] == '1')
    {
    
        // Load content elements
        $this_content = ALPHA_CMS::Load_Content($_POST['menu_link'], 'content', $_POST['lang']);
        $keywords = ALPHA_CMS::Load_Content($_POST['menu_link'], 'keywords', $_POST['lang']);
        
        if ($this_content === false)
            return null;
        
        $result = '<div class="content">' . $this_content . '</div>' . '<div class="keywords">' . $keywords . '</div>';
        
        echo $result;
    
    }
    
    else
        return null;

?>
