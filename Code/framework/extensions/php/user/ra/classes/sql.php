<?php
    /*
        SQL (RA class)

        File name: sql.php (Version: 1.2)
        Description: This file contains the SQL - RA class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2020
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Load all dependencies
    UTIL::Load_Extension('ms_sql', 'php');

    // SQL class
    class SQL
    {
        // Shared class instance
        private static $__instance = null;

        // Shared database connection
        private static $__db_con = null;

        // Shared SQL type
        private static $__sql_type = null;

        // Shared query
        private static $__query = null;

        // Shared query parameters
        private static $__query_params = array();

        // Shared result data
        private static $__result_data = null;

        // Iinitilization flag
        private static $__is_init = false;

        // "Use DB" command in use flag
        private static $__is_use_db = false;

        // "Select-From" command in use flag
        private static $__is_select_from = false;

        // "Group By" command in use flag
        private static $__is_group_by = false;

        // "Update" command in use flag
        private static $__is_update = false;

        // "Insert Into" command in use flag
        private static $__is_insert_into = false;

        // "Delete" command in use flag
        private static $__is_delete = false;

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

        // Execute "Create DB"
        public function Create_DB($db)
        {
            if (!self::$__is_init || empty($db))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
                $result = DB::Exec_SQL_Command('CREATE DATABASE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');
            else
            {
                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('CREATE DATABASE ?;', $params);
            }

            if (empty($result))
                self::$__result_data = false;
            else
                self::$__result_data = $result;

            return $this;
        }

        // Execute "Use DB"
        public function Use_DB($db)
        {
            if (!self::$__is_init || empty($db))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
                $result = DB::Exec_SQL_Command('USE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');
            else
            {
                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('USE ?;', $params);
            }

            if (empty($result))
                self::$__result_data = false;
            else
            {
                self::$__is_use_db = true;
                self::$__result_data = $result;
            }

            return $this;
        }

        // Execute "Drop DB"
        public function Drop_DB($db)
        {
            if (!self::$__is_init || empty($db))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
                $result = DB::Exec_SQL_Command('DROP DATABASE `' . mysqli_real_escape_string(self::$__db_con, $db) . '`;');
            else
            {
                $params = array($db);
                $result = MS_SQL::Exec_SQL_Command('DROP DATABASE ?;', $params);
            }

            if (empty($result))
                self::$__result_data = false;
            else
                self::$__result_data = $result;

            return $this;
        }

        // Execute "Create Table"
        public function Create_Table($table, $col_type_array = null)
        {
            if (!self::$__is_use_db || empty($table))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
            {
                if (!empty($col_type_array))
                {
                    $user_columns = null;

                    foreach ($col_type_array as $key => $value)
                    {
                        $user_columns .= ', `' . 
                        mysqli_real_escape_string(self::$__db_con, $key) . '` ' . 
                        mysqli_real_escape_string(self::$__db_con, $value);
                    }
                }

                $result = DB::Exec_SQL_Command('CREATE TABLE `' . mysqli_real_escape_string(self::$__db_con, $table) . 
                                               '` (
                                                    `ID` BIGINT(64) UNSIGNED AUTO_INCREMENT PRIMARY KEY' . $user_columns . 
                                               ' );');
            }
            else
            {
                if (!empty($col_type_array))
                {
                    $question_marks = null;
                    $user_columns = array();

                    foreach ($col_type_array as $key => $value)
                    {
                        $question_marks .= ', ?';
                        $user_columns = array_merge($user_columns, array($key . ' ' . $value));
                    }
                }

                $params = array($table, $user_columns);
                $result = MS_SQL::Exec_SQL_Command('CREATE TABLE ? 
                                                    (
                                                        ID BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY' . $question_marks . '
                                                    );', $params);
            }

            if (empty($result))
                self::$__result_data = false;
            else
                self::$__result_data = $result;

            return $this;
        }

        // Execute "Truncate Table"
        public function Truncate_Table($table)
        {
            if (!self::$__is_use_db || empty($table))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
                $result = DB::Exec_SQL_Command('TRUNCATE TABLE `' . mysqli_real_escape_string(self::$__db_con, $table) . '`;');
            else
            {
                $params = array($table);
                $result = MS_SQL::Exec_SQL_Command('TRUNCATE TABLE ?;', $params);
            }

            if (empty($result))
                self::$__result_data = false;
            else
                self::$__result_data = $result;

            return $this;
        }

        // Execute "Drop Table"
        public function Drop_Table($table)
        {
            if (!self::$__is_use_db || empty($table))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
                $result = DB::Exec_SQL_Command('DROP TABLE `' . mysqli_real_escape_string(self::$__db_con, $table) . '`;');
            else
            {
                $params = array($table);
                $result = MS_SQL::Exec_SQL_Command('DROP TABLE ?;', $params);
            }

            if (empty($result))
                self::$__result_data = false;
            else
                self::$__result_data = $result;

            return $this;
        }

        // Execute "Select-From"
        public function From($table, $columns_array, $count_value = null, $is_distinct = false)
        {
            if (!self::$__is_use_db || empty($table) || empty($columns_array))
            {
                self::$__result_data = false;

                return $this;
            }

            $user_count = null;

            if ($is_distinct)
                $distinct = 'DISTINCT';
            else
                $distinct = null;

            if (self::$__sql_type == 'my')
            {
                $user_columns = null;

                foreach ($columns_array as $value)
                {
                    $dot_posistion = strpos($value, '.');

                    if ($dot_posistion)
                    {
                        $left_value = substr($value, 0, $dot_posistion) . '`';
                        $right_value = '`' . substr($value, $dot_posistion + 1);
                        $value = $left_value . '.' . $right_value;
                    }

                    $user_columns .= ' `' . mysqli_real_escape_string(self::$__db_con, $value) . '`, ';
                }

                $user_columns = substr($user_columns, 0, -2);

                if (!empty($count_value))
                    $user_count = 'COUNT(`' . mysqli_real_escape_string(self::$__db_con, $count_value) . '`),';

                self::$__query .= 'SELECT ' . $distinct . ' ' . $user_count . ' ' . $user_columns . 
                                  ' FROM `' . mysqli_real_escape_string(self::$__db_con, $table) . '` ';

                $result = DB::Exec_SQL_Command(self::$__query);
            }
            else
            {
                $question_marks = null;
                $user_columns = array();

                if (!empty($count_value))
                {
                    $user_count = 'COUNT(?),';
                    $user_columns = array_merge($user_columns, array($count_value));
                }

                foreach ($columns_array as $value)
                {
                    $question_marks .= '?, ';
                    $user_columns = array_merge($user_columns, array($value));
                }

                $user_columns = array_merge($user_columns, array($table));
                $question_marks = substr($question_marks, 0, -2);

                self::$__query .= 'SELECT ' . $distinct . ' ' . $user_count . ' ' . $question_marks . ' FROM ? ';

                $params = array($user_columns);
                $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
            }

            if ($result === false)
                self::$__result_data = false;
            else
            {
                self::$__is_select_from = true;
                self::$__result_data = $result;
            }

            return $this;
        }

        // Execute "Join"
        public function Join($join_type, $table_left, $left_column, $table_right, $right_column)
        {
            $join_types = array('inner join', 'left join', 'right join', 'full join');

            if (!self::$__is_select_from || !in_array($join_type, $join_types) || 
                empty($table_left) || empty($left_column) || empty($table_right) || empty($right_column))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
            {
                $user_columns = '`' . mysqli_real_escape_string(self::$__db_con, $table_left) . '`.`' . 
                                      mysqli_real_escape_string(self::$__db_con, $left_column) . '` = `' . 
                                      mysqli_real_escape_string(self::$__db_con, $table_right) . '`.`' . 
                                      mysqli_real_escape_string(self::$__db_con, $right_column) . '` ';

                self::$__query .= strtoupper($join_type) . ' ' . $table_right . ' ON ' . $user_columns . ' ';

                $result = DB::Exec_SQL_Command(self::$__query);
            }
            else
            {
                $question_marks = null;
                $user_columns = array();

                $question_marks = '?.? = ?.?';
                
                array_push($user_columns, $table_left, $left_column, $table_right, $right_column);

                self::$__query .= strtoupper($join_type) . ' ' . $table_right . ' ON ' . $question_marks . ' ';

                $params = array($user_columns);
                $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
            }

            if ($result === false)
                self::$__result_data = false;
            else
                self::$__result_data = $result;

            return $this;
        }

        // Execute "Where"
        public function Where($conditions_array)
        {
            if (empty($conditions_array))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__is_select_from || self::$__is_update || self::$__is_insert_into || self::$__is_delete)
            {
                if (self::$__sql_type == 'my')
                {
                    $user_columns = null;

                    foreach ($conditions_array as $values_array)
                    {
                        $user_columns .= '`' . mysqli_real_escape_string(self::$__db_con, $values_array[0]) . '` ' . 
                                               mysqli_real_escape_string(self::$__db_con, $values_array[1]) . ' "' . 
                                               mysqli_real_escape_string(self::$__db_con, $values_array[2]) . '" ' . 
                                               mysqli_real_escape_string(self::$__db_con, strtoupper($values_array[3]));
                    }

                    self::$__query .= 'WHERE ' . $user_columns . ' ';

                    $result = DB::Exec_SQL_Command(self::$__query);
                }
                else
                {
                    $question_marks = null;
                    $user_columns = array();

                    foreach ($conditions_array as $values_array)
                    {
                        $question_marks .= '? ? "?" ? ';
                        $user_columns = array_merge($user_columns, array($values_array[0], 
                                                                         $values_array[1],
                                                                         $values_array[2], 
                                                                         strtoupper($values_array[3])));
                    }

                    $params = array($user_columns);

                    self::$__query .= 'WHERE ' . $question_marks . ' ';

                    $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
                }

                if ($result === false)
                    self::$__result_data = false;
                else
                    self::$__result_data = $result;
            }

            return $this;
        }

        // Execute "Group By"
        public function Group_By($columns_array)
        {
            if (!self::$__is_select_from || empty($columns_array))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
            {
                $user_columns = null;

                foreach ($columns_array as $value)
                    $user_columns .= '`' . mysqli_real_escape_string(self::$__db_con, $value) . '`, ';

                self::$__query .= 'GROUP BY ' . substr($user_columns, 0, -2) . ' ';

                $result = DB::Exec_SQL_Command(self::$__query);
            }
            else
            {
                $question_marks = null;
                $user_columns = array();

                foreach ($columns_array as $value)
                {
                    $question_marks .= '?, ';
                    $user_columns = array_merge($user_columns, array($value));
                }

                $question_marks = substr($question_marks, 0, -2);

                self::$__query .= 'GROUP BY ' . $question_marks . ' ';

                $params = array($user_columns);
                $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
            }

            if ($result === false)
                self::$__result_data = false;
            else
            {
                self::$__is_group_by = true;
                self::$__result_data = $result;
            }

            return $this;
        }

        // Execute "Having"
        public function Having($conditions_array, $count_array = null)
        {
            if (!self::$__is_group_by || empty($conditions_array))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__is_select_from)
            {
                if (self::$__sql_type == 'my')
                {
                    $user_columns = null;

                    if (!empty($count_array))
                    {
                        $user_count = 'COUNT(`' . mysqli_real_escape_string(self::$__db_con, $count_array[0]) . '`) ' . 
                                      mysqli_real_escape_string(self::$__db_con, $count_array[1]) . ' "' . 
                                      mysqli_real_escape_string(self::$__db_con, $count_array[2]) . '" ' . 
                                      mysqli_real_escape_string(self::$__db_con, strtoupper($count_array[3]));
                    }

                    foreach ($conditions_array as $values_array)
                    {
                        $user_columns .= '`' . mysqli_real_escape_string(self::$__db_con, $values_array[0]) . '` ' . 
                                               mysqli_real_escape_string(self::$__db_con, $values_array[1]) . ' "' . 
                                               mysqli_real_escape_string(self::$__db_con, $values_array[2]) . '"';
                    }

                    self::$__query .= 'HAVING ' . $user_count . ' ' . $user_columns . ' ';

                    $result = DB::Exec_SQL_Command(self::$__query);
                }
                else
                {
                    $question_marks = null;
                    $user_columns = array();

                    if (!empty($count_array))
                    {
                        $user_count = 'COUNT(?) ? "?" ?';
                        $user_columns = array_merge($user_columns, array($count_array[0], 
                                                                         $count_array[1],
                                                                         $count_array[2], 
                                                                         strtoupper($count_array[3])));
                    }

                    foreach ($conditions_array as $values_array)
                    {
                        $question_marks .= '? ? "?" ';
                        $user_columns = array_merge($user_columns, array($values_array[0], $values_array[1], $values_array[2]));
                    }

                    $params = array($user_columns);

                    self::$__query .= 'HAVING ' . $user_count . ' ' . $question_marks . ' ';

                    $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
                }

                if ($result === false)
                    self::$__result_data = false;
                else
                    self::$__result_data = $result;
            }

            return $this;
        }

        // Execute "Order By"
        public function Order_By($columns_array, $sort = 'ASC')
        {
            if (!self::$__is_select_from || empty($columns_array) || 
                (strtoupper($sort) != 'ASC' && strtoupper($sort) != 'DESC'))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
            {
                $user_columns = null;

                foreach ($columns_array as $value)
                    $user_columns .= '`' . mysqli_real_escape_string(self::$__db_con, $value) . '`, ';

                self::$__query .= 'ORDER BY ' . substr($user_columns, 0, -2) . ' ' . $sort;

                $result = DB::Exec_SQL_Command(self::$__query);
            }
            else
            {
                $question_marks = null;
                $user_columns = array();

                foreach ($columns_array as $value)
                {
                    $question_marks .= '?, ';
                    $user_columns = array_merge($user_columns, array($value));
                }

                $question_marks = substr($question_marks, 0, -2);

                self::$__query .= 'ORDER BY ' . $question_marks . ' ' . $sort;

                $params = array($user_columns);
                $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
            }

            if ($result === false)
                self::$__result_data = false;
            else
                self::$__result_data = $result;

            return $this;
        }

        // Execute "Update"
        public function Update($table, $col_val_array, $use_where = false, $use_having = false)
        {
            if (!self::$__is_use_db || empty($table) || empty($col_val_array))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
            {
                $user_columns = null;

                foreach ($col_val_array as $key => $value)
                {
                    $user_columns .= '`' . mysqli_real_escape_string(self::$__db_con, $key) . '` = "' . 
                                           mysqli_real_escape_string(self::$__db_con, $value) . '", ';
                }

                $user_columns = substr($user_columns, 0, -2);

                self::$__query .= 'UPDATE `' . mysqli_real_escape_string(self::$__db_con, $table) . '` ' . 
                                   'SET ' . $user_columns . ' ';

                if (!$use_where && !$use_having)
                    $result = DB::Exec_SQL_Command(self::$__query);
                else
                    $result = true;
            }
            else
            {
                $question_marks = null;
                $user_columns = array();

                foreach ($col_val_array as $key => $value)
                {
                    $question_marks .= '? = "?", ';
                    $user_columns = array_merge($user_columns, array($key, $value));
                }

                $question_marks = substr($question_marks, 0, -2);
                $params = array($user_columns);

                self::$__query .= 'UPDATE ? SET ' . $question_marks . ' ';

                if (!$use_where && !$use_having)
                    $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
                else
                {
                    self::$__query_params = array_merge(self::$__query_params, $params);

                    $result = true;
                }
            }

            if (empty($result))
                self::$__result_data = false;
            else
            {
                self::$__is_update = true;
                self::$__result_data = $result;
            }

            return $this;
        }

        // Execute "Insert Into"
        public function Insert_Into($table, $col_val_array, $use_where = false)
        {
            if (!self::$__is_use_db || empty($table) || empty($col_val_array))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
            {
                $user_columns = null;
                $user_values = null;

                foreach ($col_val_array as $key => $value)
                {
                    $user_columns .= '`' . mysqli_real_escape_string(self::$__db_con, $key) . '`, ';
                    $user_values .= '"' . mysqli_real_escape_string(self::$__db_con, $value) . '", ';
                }

                $user_columns = substr($user_columns, 0, -2);
                $user_values = substr($user_values, 0, -2);

                self::$__query .= 'INSERT INTO `' . mysqli_real_escape_string(self::$__db_con, $table) . '` (' . 
                                   $user_columns . ') VALUES (' . $user_values . ') ';

                if (!$use_where)
                    $result = DB::Exec_SQL_Command(self::$__query);
                else
                    $result = true;
            }
            else
            {
                $question_marks = null;
                $user_col_val = array();

                foreach ($col_val_array as $key => $value)
                {
                    $question_marks .= '?, ?, ';
                    $user_col_val = array_push($user_col_val, $key);
                }

                foreach ($col_val_array as $key => $value)
                    $user_col_val = array_push($user_col_val, $value);

                $question_marks = substr($question_marks, 0, -2);
                $params = array($user_col_val);

                self::$__query .= 'INSERT INTO ? (' . $question_marks . ')' . 
                                  'VALUES ( ' . $question_marks . ') ';

                if (!$use_where)
                    $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
                else
                {
                    self::$__query_params = array_merge(self::$__query_params, $params);

                    $result = true;
                }
            }

            if (empty($result))
                self::$__result_data = false;
            else
            {
                self::$__is_insert_into = true;
                self::$__result_data = $result;
            }

            return $this;
        }

        // Execute "Delete"
        public function Delete($table, $use_where = false)
        {
            if (!self::$__is_use_db || empty($table))
            {
                self::$__result_data = false;

                return $this;
            }

            if (self::$__sql_type == 'my')
            {
                self::$__query .= 'DELETE FROM `' . mysqli_real_escape_string(self::$__db_con, $table) . '` ';

                if (!$use_where)
                    $result = DB::Exec_SQL_Command(self::$__query);
                else
                    $result = true;
            }
            else
            {
                self::$__query .= 'DELETE FROM ? ';

                $params = array($table);

                if (!$use_where)
                    $result = MS_SQL::Exec_SQL_Command(self::$__query, $params);
                else
                {
                    self::$__query_params = array_merge(self::$__query_params, $params);

                    $result = true;
                }
            }

            if (empty($result))
                self::$__result_data = false;
            else
            {
                self::$__is_delete = true;
                self::$__result_data = $result;
            }

            return $this;
        }

        // Return "Result"
        public function Result()
        {
            if (!self::$__is_init)
                return false;

            return self::$__result_data;
        }
    }
?>
