<?php
    /*
        micro-MVC
        
        File name: ajax_test.php
        Description: This file contains the test asset for AJAX test calls.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015
        Open Software License (OSL 3.0)
    */

    if (!empty($_POST['ajax_check']) && $_POST['ajax_check'] === '1')
        echo 'AJAX system self check: OK';
    else
        print_r($_FILES);
?>
