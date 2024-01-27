<?php
    /*
        /ARK|ANG[e]L\ (User credentials & profile manager for GreyOS)
        
        File name: arkangel.php (Version: 1.2)
        Description: This file contains the ARKANGEL - User credentials & profile manager extension.
        
        Coded by George Delaportas (G0D)
        Copyright (C) 2024
        Open Software License (OSL 3.0)
    */
    
    // Check for direct access
    if (!defined('micro_mvc'))
        exit();
    
    // ARKANGEL class
    class ARKANGEL
    {
        public static function Fetch_Credentials()
        {
            $file_path = UTIL::Absolute_Path('framework/config/users.cfg');
            $data = file_get_contents($file_path);
            $result = json_decode($data, true);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            return $result;
        }
        
        public static function Update_Credentials($new_user_credentials)
        {
            $all_credentials = self::Fetch_Credentials();
            
            if (!$all_credentials)
                return false;
            
            array_push($all_credentials, $new_user_credentials);
            
            $all_credentials_json = json_encode($all_credentials);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            $file_path = UTIL::Absolute_Path('framework/config/users.cfg');
            file_put_contents($file_path, $all_credentials_json);
            
            return true;
        }
        
        public static function Fetch_Default_Profile()
        {
            $file_path = UTIL::Absolute_Path('framework/misc/data/default_profile.cfg');
            $data = file_get_contents($file_path);
            $result = json_decode($data, true);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            return $result;
        }
        
        public static function Fetch_My_Profile()
        {
            $user_profile = UTIL::Get_Session_Variable('auth');
            
            if (empty($user_profile))
                return false;
            
            return self::Fetch_Profile($user_profile['uid']);
        }
        
        public static function Fetch_Profile($uid)
        {
            $file_path = UTIL::Absolute_Path('fs/' . $uid . '/profile.cfg');
            $data = file_get_contents($file_path);
            $user_profile = json_decode($data, true);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            UTIL::Set_Session_Variable('auth', $user_profile);
            
            return $user_profile;
        }
        
        public static function Update_Profile($new_profile)
        {
            $uid = $new_profile['uid'];
            $new_json_profile = json_encode($new_profile);
            
            if (json_last_error() !== JSON_ERROR_NONE)
                return false;
            
            $file_path = UTIL::Absolute_Path('fs/' . $uid);
            file_put_contents($file_path . '/profile.cfg', $new_json_profile);
            
            UTIL::Set_Session_Variable('auth', $new_profile);
            
            return true;
        }
        
        public static function Synchronize_Profile($uid)
        {
            $user_profile = self::Fetch_Profile($uid);
            
            if (!$user_profile)
                return false;
            
            $user_profile['online'] = true;
            $user_profile['security']['ip'] = $_SERVER['REMOTE_ADDR'];
            $user_profile['security']['agent'] = $_SERVER['HTTP_USER_AGENT'];
            $user_profile['security']['last_activity'] = time();
            
            $result = self::Update_Profile($user_profile);
            
            if (!$result)
                return false;
            
            UTIL::Set_Session_Variable('auth', $user_profile);
            
            return true;
        }
        
        public static function Clear_Session()
        {
            session_regenerate_id(true);
            
            UTIL::Set_Session_Variable('auth', null);
            
            return null;
        }
    }
?>
