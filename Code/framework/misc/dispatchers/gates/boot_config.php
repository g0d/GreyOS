<?php
    /*
        GreyOS - Boot Config (Programmable gate for loading boot configuration)

        File name: boot_config.php
        Description: This file contains the boot config gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2024
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    if (isset($_POST))
        echo file_get_contents(UTIL::Absolute_Path('framework/config/misc/boot_config.json'));
    else
        echo '-1';
?>
