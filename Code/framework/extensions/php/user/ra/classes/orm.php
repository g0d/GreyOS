<?php
    /*
        ORM (RA class)

        File name: orm.php (Version: 1.1)
        Description: This file contains the ORM - RA class.

        Coded by George Delaportas (G0D)
        Copyright (c) 2020
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Load all dependencies
    UTIL::Load_Extension('ms_sql', 'php');

    // ORM class
    class ORM
    {
        // Shared class instance
        private static $__instance = null;

        // Shared database connection
        private static $__db_con = null;

        // Shared DB
        private static $__db = null;

        // Shared DB name
        private static $__db_name = null;

        // Shared table name
        private static $__table_name = null;

        // Shared SQL type
        private static $__sql_type = null;

        // Shared result data
        private static $__result_data = null;

        // Iinitilization flag
        private static $__is_init = false;

        // "Use DB" command in use flag
        private static $__is_use_db = false;

        // "Use Table" command in use flag
        private static $__is_use_table = false;

        public function __construct($sql_type)
        {
            self::$__sql_type = $sql_type;
        }

        // Initialize connection to the RDBMS
        public function Initialize($user, $pass, $server_domain_name, $db = '', $port = 3306)
        {
            if (self::$__is_init)
                return $this;

            if (self::$__sql_type == 'my')
            {
                self::$__db_con = DB::Connect($user, $pass, $server_domain_name, $db, $port);

                if (!self::$__db_con)
                    return $this;
            }
            else
            {
                self::$__db_con = MS_SQL::Connect($user, $pass, $server_domain_name, $db);

                if (!self::$__db_con)
                    return $this;
            }

            self::$__is_init = true;
            self::$__instance = new self(self::$__sql_type);

            return self::$__instance;
        }

        // Use existing DB model
        public function Use_DB_Model($db_model)
        {
            if (!self::$__is_init || empty($db_model))
            {
                self::$__result_data = false;

                return $this;
            }

            require_once(UTIL::Absolute_Path('framework/extensions/php/user/ra/odb/' . $db_model . '.php'));

            $new_class = strtoupper($db_model);

            self::$__is_use_db = true;
            self::$__db = new $new_class();
            self::$__db_name = $db_model;
            self::$__result_data = self::$__db;

            return $this;
        }

        // Use a table model from an existing table in DB
        public function Use_Table_Model($table)
        {
            if (!self::$__is_use_db || empty($table))
            {
                self::$__result_data = false;

                return $this;
            }

            self::$__is_use_table = true;
            self::$__result_data = self::$__db->$table;
            self::$__table_name = $table;

            return $this;
        }

        // Create a new model property
        public function New_Model_Property($name, $value = null)
        {
            if (!self::$__is_use_table || empty($name))
            {
                self::$__result_data = false;

                return $this;
            }

            $table = self::$__table_name;

            self::$__db->$table->$name = $value;
            self::$__result_data = self::$__db;

            return $this;
        }

        // Edit a model property
        public function Edit_Model_Property($name, $value)
        {
            if (!self::$__is_use_table || empty($name) || empty($value))
            {
                self::$__result_data = false;

                return $this;
            }

            $all_properties = array();
            $table = self::$__table_name;

            $table_object = self::$__db->$table;

            foreach ($table_object as $key => $val)
                array_push($all_properties, $key);

            if (!self::$__is_use_table || empty($name) || !in_array($name, $all_properties) || 
                (empty($value) && $value != '' && $value != null && !is_bool($value)))
            {
                self::$__result_data = false;

                return $this;
            }

            $table = self::$__table_name;

            self::$__db->$table->$name = $value;
            self::$__result_data = self::$__db;

            return $this;
        }

        // Delete a model property
        public function Delete_Model_Property($name)
        {
            if (!self::$__is_use_table || empty($name))
            {
                self::$__result_data = false;

                return $this;
            }

            $table = self::$__table_name;

            unset(self::$__db->$table->$name);

            self::$__result_data = self::$__db;

            return $this;
        }

        // Load an existing DB
        public function Load_DB($db)
        {
            if (!self::$__is_init || empty($db))
            {
                self::$__result_data = false;

                return $this;
            }

            $db_object = null;

            if (self::$__sql_type == 'my')
            {
                $result = DB::Exec_SQL_Command('USE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $result = DB::Exec_SQL_Command('SELECT DISTINCT `TABLE_SCHEMA` ' . 
                                               'FROM `information_schema`.tables ' . 
                                               'WHERE `TABLE_TYPE` = "base table" AND `TABLE_SCHEMA` = "' . 
                                                mysqli_real_escape_string(self::$__db_con, $db) . '";');

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $this->Use_DB_Model($result[0][0]);
                $db_object = DB::Get_Object($result[0][0]);

                $result = DB::Exec_SQL_Command('SELECT `TABLE_NAME` ' . 
                                               'FROM `information_schema`.tables ' . 
                                               'WHERE `TABLE_TYPE` = "base table" AND `TABLE_SCHEMA` = "' . 
                                                mysqli_real_escape_string(self::$__db_con, $db) . '";');

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }
                /*
                foreach ($result as $key => $value)
                {
                    $result = DB::Exec_SQL_Command('SELECT * FROM `' . $value[0] . '`;');
                }
                */
            }
            else
            {
                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('USE ?;', $params);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $this->Use_DB_Model($result[0][0]);
                $db_object = MS_SQL::Get_Object($result[0][0]);

                $result = MS_SQL::Exec_SQL_Command('SELECT TABLE_NAME ' . 
                                                   'FROM ?.INFORMATION_SCHEMA.TABLES ' . 
                                                   'WHERE TABLE_TYPE = "BASE TABLE";', $params);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }
                /*
                foreach ($result as $key => $value)
                {
                    $params = array($value[0]);
                    $result = MS_SQL::Exec_SQL_Command('SELECT * FROM ?;', $params);
                }
                */
            }

            self::$__db = $db_object;
            self::$__db_name = $db;
            self::$__result_data = self::$__db;

            return $this;
        }

        // Save changes to a DB
        public function Save_DB($db_model = null)
        {
            if (!self::$__is_init)
            {
                self::$__result_data = false;

                return $this;
            }

            if (empty($db_model))
            {
                if (empty(self::$__db_name))
                {
                    self::$__result_data = false;

                    return $this;
                }

                $db_object = self::$__db;
                $db = self::$__db_name;
            }
            else
            {
                $this->Use_DB_Model($db_model);

                $db_object = self::$__db;
                $db = $db_model;
            }

            if (self::$__sql_type == 'my')
            {
                $this->Delete_DB($db);

                $result = DB::Exec_SQL_Command('CREATE DATABASE IF NOT EXISTS `' . 
                                                mysqli_real_escape_string(self::$__db_con, $db) . '`;');

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                foreach ($db_object as $object_key => $object_value)
                {
                    $result = $this->Save_Table($object_key);

                    if (!$result)
                    {
                        self::$__result_data = false;
    
                        return $this;
                    }
                }
            }
            else
            {
                $params = array($db);
                $this->Delete_DB($db);

                $result = MS_SQL::Exec_SQL_Command('CREATE DATABASE IF NOT EXISTS ?;', $params);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                foreach ($db_object as $object_key => $object_value)
                {
                    $result = $this->Save_Table($object_key);

                    if (!$result)
                    {
                        self::$__result_data = false;

                        return $this;
                    }
                }
            }

            self::$__result_data = true;

            return $this;
        }

        // Delete an existing DB
        public function Delete_DB($db = null)
        {
            if (!self::$__is_init)
            {
                self::$__result_data = false;

                return $this;
            }

            if (empty($db))
            {
                if (empty(self::$__db_name))
                {
                    self::$__result_data = false;

                    return $this;
                }

                $db = self::$__db_name;
            }

            if (self::$__sql_type == 'my')
                $result = DB::Exec_SQL_Command('DROP DATABASE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');
            else
            {
                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('DROP DATABASE ?;', $params);
            }

            self::$__result_data = $result;

            return $this;
        }

        // Save table to a DB model
        public function Save_Table($table, $db_model = null)
        {
            if (!self::$__is_use_db || empty($table))
            {
                self::$__result_data = false;

                return $this;
            }

            if (empty($db_model))
            {
                if (empty(self::$__db_name))
                {
                    self::$__result_data = false;

                    return $this;
                }

                $db_object = self::$__db;
                $table_object = $db_object->$table;
                $db = self::$__db_name;
            }
            else
            {
                $this->Use_DB_Model($db_model);

                $db_object = self::$__db;
                $table_object = $db_object->$table;
                $db = $db_model;
            }

            $query = null;
            $columns = null;
            $values = null;

            if (self::$__sql_type == 'my')
            {
                $this->Delete_Table();

                $result = DB::Exec_SQL_Command('USE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');

                if (!$result)
                {
                    self::$__result_data = false;
    
                    return $this;
                }

                $query = 'CREATE TABLE `' . mysqli_real_escape_string(self::$__db_con, strtoupper($table)) . '` ';

                foreach ($table_object as $key => $value)
                {
                    if ($key == 'ID' || $key == 'id')
                    {
                        self::$__result_data = false;

                        return $this;
                    }

                    $columns .= ', `' . mysqli_real_escape_string(self::$__db_con, $key) . '` TEXT';
                }

                $query .= '(`ID` BIGINT(64) UNSIGNED AUTO_INCREMENT PRIMARY KEY' . $columns . '); ';

                $result = DB::Exec_SQL_Command($query);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $columns = null;

                foreach ($table_object as $key => $value)
                {
                    $columns .= '`' . mysqli_real_escape_string(self::$__db_con, $key) . '`, ';
                    $values .= '"' . mysqli_real_escape_string(self::$__db_con, $value) . '", ';
                }

                $columns = substr($columns, 0, -2);
                $values = substr($values, 0, -2);

                $query = 'INSERT INTO `' . mysqli_real_escape_string(self::$__db_con, $db) . '`.`' . 
                          mysqli_real_escape_string(self::$__db_con, $table) . '` (' . $columns . ') ' . 
                         'VALUES (' . $values . ');';

                $result = DB::Exec_SQL_Command($query);
            }
            else
            {
                $this->Delete_Table();

                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('USE ?;', $params);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $query = 'CREATE TABLE ? ';

                array_push($params, array(strtoupper($table)));

                foreach ($object_value as $key => $value)
                {
                    if ($key == 'ID' || $key == 'id')
                    {
                        self::$__result_data = false;

                        return $this;
                    }

                    $columns .= ', ? TEXT';

                    array_push($params, array($key));
                }

                $query .= '(ID BIGINT(64) UNSIGNED AUTO_INCREMENT PRIMARY KEY' . $columns . '); ';

                $result = MS_SQL::Exec_SQL_Command($query, $params);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $columns = null;
                $params = array($db, $table);

                foreach ($table_object as $key => $value)
                {
                    $columns .= '?, ?, ';
                    $params = array_push($params, $key);
                }

                foreach ($table_object as $key => $value)
                    $params = array_push($params, $value);

                $columns = substr($columns, 0, -2);

                $query = 'INSERT INTO ?.? (' . $columns . ') ' . 
                         'VALUES ( ' . $columns . ');';

                $result = MS_SQL::Exec_SQL_Command($query, $params);
            }

            self::$__result_data = $result;

            return $this;
        }

        // Clear an existing table in DB
        public function Clear_Table($table = null)
        {
            if (!self::$__is_use_db)
            {
                self::$__result_data = false;

                return $this;
            }

            if (empty($table))
            {
                if (empty(self::$__table_name))
                {
                    self::$__result_data = false;

                    return $this;
                }

                $table = self::$__table_name;
            }

            $db = self::$__db_name;

            if (self::$__sql_type == 'my')
            {
                $result = DB::Exec_SQL_Command('USE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');

                if (!$result)
                {
                    self::$__result_data = false;
    
                    return $this;
                }

                $result = DB::Exec_SQL_Command('TRUNCATE TABLE `' . mysqli_real_escape_string(self::$__db_con, $table) . '`;');
            }
            else
            {
                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('USE ?;', $params);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $params = array($table);
                $result = MS_SQL::Exec_SQL_Command('TRUNCATE TABLE ?;', $params);
            }

            self::$__result_data = $result;

            return $this;
        }

        // Delete an existing table in DB
        public function Delete_Table($table = null)
        {
            if (!self::$__is_use_db)
            {
                self::$__result_data = false;

                return $this;
            }

            if (empty($table))
            {
                if (empty(self::$__table_name))
                {
                    self::$__result_data = false;

                    return $this;
                }

                $table = self::$__table_name;
            }

            $db = self::$__db_name;

            if (self::$__sql_type == 'my')
            {
                $result = DB::Exec_SQL_Command('USE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $result = DB::Exec_SQL_Command('DROP TABLE `' . mysqli_real_escape_string(self::$__db_con, $table) . '`;');
            }
            else
            {
                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('USE ?;', $params);

                if (!$result)
                {
                    self::$__result_data = false;

                    return $this;
                }

                $params = array($table);
                $result = MS_SQL::Exec_SQL_Command('DROP TABLE ?;', $params);
            }

            self::$__result_data = $result;

            return $this;
        }

        // Execute a user function in DB
        public function User_Function($function, $args = null)
        {
            if (!self::$__is_init || empty($function))
            {
                self::$__result_data = false;

                return $this;
            }

            self::$__result_data = call_user_func($function, $args);

            return $this;
        }

        // Get result
        public function Result()
        {
            if (!self::$__is_init)
                return false;

            return self::$__result_data;
        }
    }
?>
