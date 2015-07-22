<?php

    /*
    
        GreyOS Inc. - AJAX Content Manager
        
        Version: 2.5
        
        File name: content_manager.php
        Description: This file contains the AJAX Content Manager extension.
        
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
    
    // Load content
    if ($_POST['content_id'])
    {
    
        $this_content = array();
        $keywords = array();
        
        // Load content elements
        $this_content = ALPHA_CMS::Load_Content($_POST['content_id'], 'content', $_POST['lang']);
        $keywords = ALPHA_CMS::Load_Content($_POST['content_id'], 'keywords', $_POST['lang']);
        
        if ($this_content === false)
            return null;
        
        echo $result;
    
    }

?>
