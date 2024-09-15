<?php
    /*
        GreyOS - OZ (Version: 1.0)

        File name: oz.php
        Description: This file contains the OZ - Gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2013 - 2021
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Handle OZ requests
    if ($_POST['oz'])
    {
        

        echo '1';
    }
    else
        echo '0';
?>
