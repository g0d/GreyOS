<?php
    /*
        Woody (e-Mail sender)

        File name: woody.php (Version: 1.0)
        Description: This file contains the Woody extension.

		Coded by George Delaportas (G0D)
		Copyright (C) 2019
		Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Woody class
    class Woody
    {
        // Server IP
        private static $__server_ip = '127.0.0.1';
        private static $__server_port = '25';

        // Send e-mails
        public static function Configure($server_ip, $server_port)
        {
            if (empty($server_ip) || empty($server_port))
                return false;

            ini_set('SMTP', $server_ip);
            ini_set('smtp_port', $server_port);

            self::$__server_ip = $server_ip;
            self::$__server_port = $server_port;

            return true;
        }

        // Send e-mails
        public static function Send_Mail($sdr_email, $rcp_email, $subject, $message = null)
        {
            if (empty($sdr_email) || empty($rcp_email)|| empty($subject))
                return false;

            ini_set('SMTP', self::$__server_ip);
            ini_set('smtp_port', self::$__server_port);

            $headers  = 'MIME-Version: 1.0' . "\r\n";
            $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
            $headers .= 'From: ' . $sdr_email . "\r\n";

            if ($message === null)
            {
                $message = file_get_contents(UTIL::Absolute_Path('framework/extensions/php/user/woody/message.html'));

                if ($message === false)
                    return false;
            }

            $result = mail($rcp_email, $subject, $message, $headers);

            return $result;
        }
    }
?>
