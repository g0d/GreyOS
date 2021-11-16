<?php
    /*
        micro-MVC
        
        File name: test.php
        Description: This file contains the "TEST MODEL" class.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2015
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // TEST MODEL class
    class TEST_MODEL extends ROOT_MODEL
    {
        public static function Get_Data()
        {
            if (LANG::Get('this') === 'en')
            {
                return 'This is a test facility utilizing spl@sh (classful server-side controls toolset) extension working 
                        with BULL (AJAX subsystem) and Vulcan (JS utilities)!';
            }
            else
            {
                return 'Αυτή η σελίδα περιλαμβάνει ένα δοκιμαστικό demo για το spl@sh (classful server-side controls toolset) extension 
                        σε συνεργασία με το BULL (AJAX subsystem) και το Vulcan (JS utilities)!';
            }
        }
    }
?>
