<?php

require_once('fb_base.php');

class FB extends FB_BASE
{

    const FBSS_COOKIE_NAME = 'fbss';

    // We can set this to a high number because the main session expiration will trump this.
    
    const FBSS_COOKIE_EXPIRE = 31556926; // 1 year

    // Stores the shared session ID if one is set.
    
    protected $Shared_Session_Id;

    /*
    Identical to the parent constructor, except that
    we start a PHP session to store the user ID and
    access token if during the course of execution
    we discover them.
   
    @param Array $config the application configuration. Additionally
    accepts "sharedSession" as a boolean to turn on a secondary
    cookie for environments with a shared session (that is, your app
    shares the domain with other apps).
    @see FB_BASE::__construct in fb.php
    */
    
    public function __construct($config)
    {

        if (!session_id())
            session_start();

        parent::__construct($config);

        if (!empty($config['shared_session']))
            $this->Init_Shared_Session();
    
    }

    protected static $Supported_Keys = array('state', 'code', 'access_token', 'user_id');

    protected function Init_Shared_Session()
    {

        $Cookie_Name = $this->Get_Shared_Session_Cookie_Name();
        if (isset($_COOKIE[$Cookie_Name]))
        {

            $data = $this->Parse_Signed_Request($_COOKIE[$Cookie_Name]);
            if ($data && !empty($data['domain']) && self::Is_Allowed_Domain($this->Get_Http_Host(), $data['domain']))
            {
                // good case
                
                $this->Shared_Session_Id = $data['id'];
                return;
            
            }
            // ignoring potentially unreachable data
            
        }
    
        // evil/corrupt/missing case
        
        $Base_Domain = $this->Get_Base_Domain();
        $this->Shared_Session_Id = md5(uniqid(mt_rand(), true));
        $Cookie_Value = $this->Make_Signed_Request(array('domain' => $Base_Domain, 'id' => $this->Shared_Session_Id));
        $_COOKIE[$Cookie_Name] = $Cookie_Value;

        if (!headers_sent())
        {

            $expire = time() + self::FBSS_COOKIE_EXPIRE;
            setcookie($Cookie_Name, $Cookie_Value, $expire, '/', '.'.$Base_Domain);
        
        }

        else
            self::Error_Log('Shared session ID cookie could not be set! You must ensure you create the Facebook instance before headers have been sent. This will cause authentication issues after the first request.');
    
    }

    /*
    Provides the implementations of the inherited abstract
    methods.  The implementation uses PHP sessions to maintain
    a store for authorization codes, user ids, CSRF states, and
    access tokens.
    */
    
    protected function Set_Persistent_Data($key, $value)
    {

        if (!in_array($key, self::$Supported_Keys))
        {

            self::Error_Log('Unsupported key passed to Set_persistent_data.');

            return;

        }

        $Session_Var_Name = $this->Construct_Session_Variable_Name($key);
        $_SESSION[$Session_Var_Name] = $value;
    
    }

    protected function Get_Persistent_Data($key, $default = false)
    {

        if (!in_array($key, self::$Supported_Keys))
        {

            self::Error_Log('Unsupported key passed to Get_persistent_data.');
            return $default;
        
        }

        $Session_Var_Name = $this->Construct_Session_Variable_Name($key);
        
        return isset($_SESSION[$Session_Var_Name]) ? $_SESSION[$Session_Var_Name] : $default;
   
    }

    protected function Clear_Persistent_Data($key)
    {

        if (!in_array($key, self::$Supported_Keys))
        {

            self::Error_Log('Unsupported key passed to Clear_persistent_data.');
            return;
        
        }

        $Session_Var_Name = $this->Construct_Session_Variable_Name($key);
        
        unset($_SESSION[$Session_Var_Name]);
   
    }

    protected function Clear_All_Persistent_Data()
    {

        foreach (self::$Supported_Keys as $key)
            $this->Clear_Persistent_Data($key);

        if ($this->Shared_Session_Id)
            $this->Delete_Shared_Session_Cookie();
    
    }

    protected function Delete_Shared_Session_Cookie()
    {

        $Cookie_Name = $this->Get_Shared_Session_Cookie_Name();
        unset($_COOKIE[$Cookie_Name]);
        $Base_Domain = $this->Get_Base_Domain();
        setcookie($Cookie_Name, '', 1, '/', '.'.$Base_Domain);
    
    }

    protected function Get_Shared_Session_Cookie_Name()
    {

        return self::FBSS_COOKIE_NAME . '_' . $this->Get_App_Id();
   
    }

    protected function Construct_Session_Variable_Name($key)
    {

        $Parts = array('fb', $this->Get_App_Id(), $key);
        
        if ($this->Shared_Session_Id)
            array_unshift($Parts, $this->Shared_Session_Id);
    
        return implode('_', $Parts);
   
    }

}

?>