<?php
	/*
		Content (Programmable gate for delivering content)
		
		File name: content.php
		Description: This file contains the content gate.
		
		Coded by George Delaportas (G0D)
		Copyright (C) 2017
		Open Software License (OSL 3.0)
	*/

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Test - Fetch content based on ID (AJAX)
    if (!empty($_POST['content_id']))
    {
    	if (!empty($_POST['language_code']))
    		echo UTIL::Load_Content($_POST['content_id'], 'static', $_POST['language_code']);
    	else
    		echo UTIL::Load_Content($_POST['content_id'], 'static');
    }
?>
