<?php
    /*
        Kondor (e-Mail Registration Confirmation & User Activator)

        File name: kondor.php (Version: 3.0)
        Description: This file contains the Kondor extension.

		Coded by George Delaportas (G0D)
		Copyright (C) 2013 - 2024
		Open Software License (OSL 3.0)
    */
    
    // Kondor class
    class Kondor
    {
        // Generate confirmation messages
        public static function Generate_Confirmation_Message($user_id, $user_name, $user_email, $user_type, $user_lang_code)
        {
            $confirm_code = $user_id . ':' . md5($user_id . '_' . $user_name . '_' . $user_email . '_' . $user_type);

            $result = '<!DOCTYPE HTML>
                        <html>
                            <head>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                                <meta name="robots" content="index, nofollow">
                                <title>' . UTILS::Load_Content('new_user_reg_email_title_label', 'content', $user_lang_code) . '</title>
                            </head>
                            <body>' . UTILS::Load_Content('new_user_reg_email_welcome_label', 'content', $user_lang_code). '
                                <br>
                                <br>
                                <br>
                                ' . UTILS::Load_Content('new_user_reg_email_body_content', 'content', $user_lang_code) . '<br><br>
                                <a href="https://' . $_SERVER['HTTP_HOST'] . '/' . $user_lang_code . '/reg-confirm/' . $confirm_code . '/">
                                    <strong>' . UTILS::Load_Content('new_user_reg_email_activation_label', 'content', $user_lang_code) . '</strong>
                                </a>
                                <br>
                                <br>
                                ' . UTILS::Load_Content('new_user_reg_email_footer_label', 'content', $user_lang_code) . '
                                <br>
                            </body>
                        </html>';

            return $result;
        }

        // Generate confirmation link
        public static function Generate_Confirmation_Link($user_id, $user_name, $user_email, $user_type, $user_lang_code = 'en')
        {
            $confirm_code = $user_id . ':' . md5($user_id . '_' . $user_name . '_' . $user_email . '_' . $user_type);

            $result = '<a href="http://' . $_SERVER['HTTP_HOST'] . '/' . $user_lang_code . '/reg-confirm/' . $confirm_code . '/">
                        <strong>' . UTILS::Load_Content('new_user_reg_email_activation_label', 'content', $user_lang_code) . '</strong>
                     </a>';

            return $result;
        }

        // Activate users
        public static function Activate_User()
        {
            // Open a connection to the DB
            $mysql_con = DB::Use_DB_Connection();

            if ($mysql_con === false)
                return false;

            $this_lang = LANG::Get_Language();

            $route = MVC::MVC_Get_Route('1');

            if (strlen($route) < 12)
                return false;

            $user_id = substr($route, 12, strpos($route, ':', 12) - 12);

            $sql_com = 'SELECT `id`, `username`, `email`, `type`, `is_active`
                        FROM `users`
                        WHERE `id` = ' . mysqli_real_escape_string($mysql_con, $user_id);

            $result = DB::Execute_SQL_Command($sql_com);

            if ($result === false)
            {
                echo '<div class="error">' . UTILS::Load_Content('error_user_not_activated', 'content', $this_lang) . '</div>';

                return false;
            }

            if ($result[0][4] == 1)
            {
                echo '<div class="error">' . UTILS::Load_Content('error_user_already_activated', 'content', $this_lang) . '</div>';

                return false;
            }
            
            $confirm_code = $result[0][0] . ':' . md5($result[0][0] . '_' . $result[0][1] . '_' . $result[0][2] . '_' . $result[0][3]);

            if (substr($route, 12) == $confirm_code)
            {
                $sql_com = 'UPDATE `users`
                            SET `is_active` = 1
                            WHERE `id` = ' . $user_id;

                $result = DB::Execute_SQL_Command($sql_com);

                if ($result === false)
                {
                    echo '<div class="error">' . UTILS::Load_Content('error_user_not_activated', 'content', $this_lang) . '</div>';

                    return false;
                }
                
                echo '<div class="error success">' . UTILS::Load_Content('success_user_activated', 'content', $this_lang) . '</div>';

                $sql_com = 'SELECT `name`, `surname`
                            FROM `users_info`
                            WHERE `user_id` = ' . mysqli_real_escape_string($db_con, $user_id, $mysql_con);

                $result = DB::Execute_SQL_Command($sql_com);

                if ($result === false)
                    return false;
                
                return true;
            }

            echo '<div class="error">' . UTILS::Load_Content('error_user_not_activated', 'content', $this_lang) . '</div>';

            return false;
        }
    }
?>
