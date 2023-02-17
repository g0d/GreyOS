<?php
    /*
        Test Object-DB (Test ODB) model class

        File name: test_odb.php (Version: 1.0)
        Description: This file contains the Test Object-DB model class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2020
        Open Software License (OSL 3.0)
    */

    // TEST ODB class
    class TEST_ODB
    {
        public $test_table_1;
        public $test_table_2;

        public function __construct()
        {
            $this->test_table_1 = new TEST_TABLE_1();
            $this->test_table_2 = new TEST_TABLE_2();
        }
    }

    // TEST TABLE 1 class
    class TEST_TABLE_1
    {
        public $name = 'John Doe';
        public $class = 'TEST';
        public $type = "Public";
        public $date = '2020-12-28';
        public $version = 1;
    }

    // TEST TABLE 2 class
    class TEST_TABLE_2
    {
        public $sector = "Game development";
        public $options = '{"game" : "Alone in the dark 2", "date" : "2014-03-23"}';
        public $publish_year = 2016;
    }
?>
