<?php
    /*
        Anti-Hijack

        File name: anti_hijack.php (Version: 0.3)
        Description: This file contains the Anti-Hijack extension.

		Coded by George Delaportas (G0D)
		Copyright (C) 2017
		Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Anti-Hijack
    function Anti_Hijack($ip, $agent, $last_activity, $timeout, $on_attack_params = null, $on_normal_params = null)
    {
        // Check for hijackers & expiration
        if (isset($ip, $agent, $last_activity, $timeout))
        {
            if (!is_string($ip) || !is_string($agent) || 
                !is_integer($last_activity) || !is_integer($timeout) || $timeout < 1)
                return null;

            if ($ip !== $_SERVER['REMOTE_ADDR'] || 
                $agent !== $_SERVER['HTTP_USER_AGENT'] || 
                (time() - $last_activity) > $timeout)
            {
                session_regenerate_id(true);

                __user_func_validator($on_attack_params);

                return true;
            }

            __user_func_validator($on_normal_params);

            return false;
        }

        return null;
    }

    // User function validator
    function __user_func_validator($params)
    {
        if (is_array($params) && count($params) >= 1 && count($params) < 3 && is_string($params[0]))
        {
            if (count($params) === 2)
                call_user_func($params[0], $params[1]);
            else
                call_user_func($params[0]);

            return true;
        }

        return false;
    }
?>
