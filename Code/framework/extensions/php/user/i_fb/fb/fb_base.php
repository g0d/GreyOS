<?php

require_once('fb_api_exception.php');

abstract class FB_BASE
{
    
    const SIGNED_REQUEST_ALGORITHM = 'HMAC-SHA256';
    
    protected $App_Id, $App_Secret, $User, $Signed_Request, $State;
    protected $Access_Token = null;
    protected $File_Upload_Support = false;
    
    //Indicates if we trust HTTP_X_FORWARDED_* headers.
    
    protected $Trust_Forwarded = false;
    
    /*
    Maps aliases to Facebook domains.
    */
  
    public static $Domain_Map = array(
        'api'         => 'https://api.facebook.com/',
        'api_video'   => 'https://api-video.facebook.com/',
        'api_read'    => 'https://api-read.facebook.com/',
        'graph'       => 'https://graph.facebook.com/',
        'graph_video' => 'https://graph-video.facebook.com/',
        'www'         => 'https://www.facebook.com/',
    );
    
    /*
    List of query parameters that get automatically dropped when rebuilding
    the current URL.
    */
    
    protected static $Drop_Query_Params = array(
        'code',
        'state',
        'signed_request',
    );
    
    //Default options for curl.

    public static $Curl_Opts = array(
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 60,
        CURLOPT_USERAGENT      => 'mozilla',
    );
  
    public function __construct($config)
    {
    
        if (!function_exists('curl_init')) throw new Exception ("PHP CURL Function Needed.");
        
        $this->Set_App_Id($config['app_id']);
        $this->Set_App_Secret($config['secret']);

        if (isset($config['file_upload']))
            $this->Set_File_Upload_Support($config['file_upload']);

        if (isset($config['trust_forwarded']) && $config['trust_forwarded'])
            $this->Trust_Forwarded = true;

        $State = $this->Get_Persistent_Data('state');

        if (!empty($State))
            $this->State = $State;
    
    }
    
    public function Call_Curl($Url, $Data)
    {

        $Curl_Options = array(
            CURLOPT_URL => $Url,
            CURLOPT_VERBOSE => 1,
            CURLOPT_SSL_VERIFYPEER => true, 
            CURLOPT_SSL_VERIFYHOST => 2,
            CURLOPT_CAINFO => 'cacert.pem',
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_POST => 1, 
            CURLOPT_POSTFIELDS => $Data);

        $Ch = curl_init();
        curl_setopt_array($Ch, $Curl_Options);
        $Response = curl_exec($Ch);
        curl_close($Ch);
        
        return $Response;
   
    }
    
    protected static function Is_Allowed_Domain($Big, $Small)
    {

        if ($Big === $Small)
            return true;
    
        return self::Ends_With($Big, '.'.$Small);
    
    }

    protected static function Ends_With($Big, $Small)
    {

        $Len = strlen($Small);

        if ($Len === 0)
            return true;
    
        return substr($Big, -$Len) === $Small;
    
    }
    
    public function Get_App_Id()
    {

        return $this->App_Id;
    
    }
    
    public function Set_App_Id($App_Id)
    {

        $this->App_Id = $App_Id;
        
        return $this;
    
    }
    
    public function Get_App_Secret()
    {

        return $this->App_Secret;
  
    }

    public function Get_Api_Secret()
    {

        return $this->getAppSecret();

    }
    
    public function Set_App_Secret($App_Secret)
    {

        $this->App_Secret = $App_Secret;
        
        return $this;
   
    }

    public function Set_Api_Secret($Api_Secret)
    {

        $this->Set_App_Secret($Api_Secret);

        return $this;

    }

    public function Set_File_Upload_Support($File_Upload_Support)
    {

        $this->File_Upload_Support = $File_Upload_Support;

        return $this;

    }

    public function Get_File_Upload_Support()
    {

        return $this->File_Upload_Support;

    }

    public function Use_File_Upload_Support()
    {

        return $this->Get_File_Upload_Support();

    }

    public function Get_Access_Token()
    {

        if ($this->Access_Token !== null)
            // we've done this already and cached it.  Just return.
            return $this->Access_Token;
        
        $this->Set_Access_Token($this->Get_Application_Access_Token());
        $User_Access_Token = $this->Get_User_Access_Token();

        if ($User_Access_Token)
            $this->Set_Access_Token($User_Access_Token);

        return $this->Access_Token;
    
    }
    
    public function Set_Access_Token($Access_Token)
    {

        $this->Access_Token = $Access_Token;
        
        return $this;
   
    }

    public function Set_Extended_Access_Token()
    {

        try
        {

            $access_token_response = $this->Oauth_Request($this->Get_Url('graph', '/oauth/access_token'),
                                                          $params = array('client_id' => $this->Get_App_Id(),
                                                                          'client_secret' => $this->Get_App_Secret(),
                                                                          'grant_type' => 'fb_exchange_token',
                                                                          'fb_exchange_token' => $this->Get_Access_Token(),));


        }

        catch (FB_API_EXCEPTION $e)
        {
            
            return false;

        }

        if (empty($access_token_response))
            return false;

        $response_params = array();
        parse_str($access_token_response, $response_params);

        if (!isset($response_params['access_token']))
            return false;

        $this->Destroy_Session();

        $this->Set_Persistent_Data('access_token', $response_params['access_token']);
        
    }
    
    protected function Get_Application_Access_Token()
    {

        return $this->App_Id . '|' . $this->App_Secret;
   
    }
    
    protected function Get_User_Access_Token()
    {

        /*
        first, consider a signed request if it's supplied.
        if there is a signed request, then it alone determines
        the access token.
        */
        
        $Signed_Request = $this->Get_Signed_Request();

        if ($Signed_Request)
        {

            //apps.facebook.com hands the access_token in the signed_request
            
            if (array_key_exists('oauth_token', $Signed_Request))
            {

                $Access_Token = $Signed_Request['oauth_token'];
                $this->Set_Persistent_Data('access_token', $Access_Token);
                
                return $Access_Token;
            
            }
            
            /*
            signed request states there's no access token, so anything
            stored should be cleared.
            */
        
            $this->Clear_All_Persistent_Data();
            return false;

        }

        $Code = $this->Get_Code();

        if ($Code && $Code != $this->Get_Persistent_Data('code'))
        {

            $Access_Token = $this->Get_Access_Token_From_Code($Code);

            if ($Access_Token)
            {

                $this->Set_Persistent_Data('code', $Code);
                $this->Set_Persistent_Data('access_token', $Access_Token);
                
                return $Access_Token;
            
            }

            //code was bogus, so everything based on it should be invalidated.
            
            $this->Clear_All_Persistent_Data();
            return false;
        }

        /*
        as a fallback, just return whatever is in the persistent
        store, knowing nothing explicit (signed request, authorization
        code, etc.) was present to shadow it (or we saw a code in $_REQUEST,
        but it's the same as what's in the persistent store)
        */
        
        return $this->Get_Persistent_Data('access_token');
    }
    
    public function Get_Signed_Request()
    {

        if (!$this->Signed_Request)
        {

            if (!empty($_REQUEST['signed_request']))
                $this->Signed_Request = $this->Parse_Signed_Request($_REQUEST['signed_request']);

            elseif (!empty($_COOKIE[$this->Get_Signed_Request_Cookie_Name()]))
                $this->Signed_Request = $this->Parse_Signed_Request($_COOKIE[$this->Get_Signed_Request_Cookie_Name()]);
       
        }
        
       
        return $this->Signed_Request;
    }
    
    protected function Parse_Signed_Request($Signed_Request)
    {

        list($Encoded_Sig, $Payload) = explode('.', $Signed_Request, 2);

        // decode the data
        
        $Sig = self::Base64_Url_Decode($Encoded_Sig);
        $Data = json_decode(self::Base64_Url_Decode($Payload), true);

        if (strtoupper($Data['algorithm']) !== self::SIGNED_REQUEST_ALGORITHM)
        {

            self::Error_Log('Unknown algorithm. Expected ' . self::SIGNED_REQUEST_ALGORITHM);
            return null;
        
        }

        // check sig
        
        $Expected_Sig = hash_hmac('sha256', $Payload, $this->Get_App_sScret(), $Raw = true);

        if ($Sig !== $Expected_Sig)
        {

            self::Error_Log('Bad Signed JSON signature!');
            return null;
       
        }

        return $Data;
    
    }
    
    /*
    Makes a signed_request blob using the given data.
   
    @param array The data array.
    @return string The signed request.
    */
    
    protected function Make_Signed_Request($Data)
    {

        if (!is_array($Data))
            throw new InvalidArgumentException('Make_signed_request expects an array. Got: ' . print_r($Data, true));

        $Data['algorithm'] = self::SIGNED_REQUEST_ALGORITHM;
        $Data['issued_at'] = time();
        $Json = json_encode($Data);
        $B64 = self::Base64_Url_Encode($Json);
        $Raw_Sig = hash_hmac('sha256', $B64, $this->Get_App_Secret(), $Raw = true);
        $Sig = self::Base64_Url_Encode($Raw_Sig);
        return $Sig.'.'.$B64;
   
    }
    
    protected function Get_Signed_Request_Cookie_Name()
    {

        return 'greyos_fbsr_'.$this->Get_App_Id();
   
    }
    
    protected function Get_Metadata_Cookie_Name()
    {

        return 'greyos_fbm_'.$this->Get_App_Id();
    
    }
    
    /*
    Get the authorization code from the query parameters, if it exists,
    and otherwise return false to signal no authorization code was
    discoverable.

    @return mixed The authorization code, or false if the authorization code could not be determined.
    */
    
    protected function Get_Code()
    {
        if (isset($_REQUEST['code']))
        {

            if ($this->State !== null && isset($_REQUEST['state']) && $this->State === $_REQUEST['state'])
            {

                //CSRF state has done its job, so clear it
                
                $this->State = null;
                $this->Clear_Persistent_Data('state');
                return $_REQUEST['code'];
            
            }
            else
            {

                self::Error_Log('CSRF state token does not match one provided.');
                return false;
           
            }
       
        }

        return false;

    }
    
    /*
    Retrieves an access token for the given authorization code
    (previously generated from www.facebook.com on behalf of
    a specific user).  The authorization code is sent to graph.facebook.com
    and a legitimate access token is generated provided the access token
    and the user for which it was generated all match, and the user is
    either logged in to Facebook or has granted an offline access permission.

    @param string $code An authorization code.
    @return mixed An access token exchanged for the authorization code, or
        false if an access token could not be generated.
    */
    
    protected function Get_Access_Token_From_Code($Code, $Redirect_Uri = null)
    {

        if (empty($Code))
            return false;

        if ($Redirect_Uri === null)
            $Redirect_Uri = $this->Get_Current_Url();

        try
        {

            /*
            need to circumvent json_decode by calling Oauth_request
            directly, since response isn't JSON format.
            */
            
            $Access_Token_Response = $this->Oauth_Request(
                $this->Get_Url('graph', '/oauth/access_token'), 
                $Params = array('client_id' => $this->Get_App_Id(), 
                                'client_secret' => $this->Get_App_Secret(), 
                                'redirect_uri' => $Redirect_Uri, 
                                'code' => $Code));

        }

        catch (FB_API_EXCEPTION $e)
        {

            /*
            most likely that user very recently revoked authorization.
            In any event, we don't have an access token, so say so.
            */
            
            return false;

        }

        if (empty($Access_Token_Response))
            return false;

        $Response_Params = array();
        parse_str($Access_Token_Response, $Response_Params);

        if (!isset($Response_Params['access_token']))
            return false;

        return $Response_Params['access_token'];

    }
    
    /*
    Returns the Current URL, stripping it of known FB parameters that should
    not persist.

    @return string The current URL
    */
   
    protected function Get_Current_Url()
    {

        $Protocol = $this->Get_Http_Protocol() . '://';
        $Host = $this->Get_Http_Host();
        $Current_Url = $Protocol.$Host.$_SERVER['REQUEST_URI'];
        $Parts = parse_url($Current_Url);

        $Query = '';

        if (!empty($Parts['query']))
        {
            // drop known fb params
            
            $Params = explode('&', $Parts['query']);
            $Retained_Params = array();
            foreach ($Params as $Param)
            {

                if ($this->Should_Retain_Param($Param))
                    $Retained_Params[] = $Param;

            }

            if (!empty($Retained_Params))
                $Query = '?'.implode($Retained_Params, '&');
       
        }

        // use port if non default
        
        $Port = isset($Parts['port']) && (($Protocol === 'https://' && $Parts['port'] !== 80) || ($Protocol === 'https://' && $Parts['port'] !== 443)) ? ':' . $Parts['port'] : '';

        // rebuild
        
        return $Protocol . $Parts['host'] . $Port . $Parts['path'] . $Query;
    
    }
    
    protected function Get_Http_Protocol()
    {

        if ($this->Trust_Forwarded && isset($_SERVER['HTTP_X_FORWARDED_PROTO']))
        {

            if ($_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
                return 'https';
            
            return 'http';
       
        }
        
        //apache + variants specific way of checking for https
        
        if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] === 'on' || $_SERVER['HTTPS'] == 1))
            return 'https';

        //nginx way of checking for https
        
        if (isset($_SERVER['SERVER_PORT']) && ($_SERVER['SERVER_PORT'] === '443'))
            return 'https';
        
        return 'http';
    
    }
    
    protected function Get_Http_Host()
    {

        if ($this->Trust_Forwarded && isset($_SERVER['HTTP_X_FORWARDED_HOST']))
            return $_SERVER['HTTP_X_FORWARDED_HOST'];
        
        return $_SERVER['HTTP_HOST'];
   
    }
    
    protected function Should_Retain_Param($Param)
    {

        foreach (self::$Drop_Query_Params as $Drop_Query_Param)
        {

            if (strpos($Param, $Drop_Query_Param.'=') === 0)
                return false;

        }

        return true;
    }
    
    /*
    Make an API call.
   
    @return mixed The decoded response
    */
    
    public function Api(/* polymorphic */)
    {

        $Args = func_get_args();

        if (is_array($Args[0]))
            return $this->Rest_Server($Args[0]);

        else
            return call_user_func_array(array($this, 'graph'), $Args);
   
    }
    
    protected function Rest_Server($Params)
    {

        // generic application level parameters
        $Params['api_key'] = $this->Get_App_Id();
        $Params['format'] = 'json-strings';

        $Result = json_decode($this->Oauth_Request($this->Get_Api_Url($Params['method']), $Params), true);

        // results are returned, errors are thrown
        
        if (is_array($Result) && isset($Result['error_code']))
            $this->Throw_Api_Exception($Result);

        $Method = strtolower($Params['method']);

        if ($Method === 'auth.expiresession' || $Method === 'auth.revokeauthorization')
            $this->Destroy_Session();

        return $Result;
    
    }
    
    /*
    Build the URL for api given parameters.
   
    @param $method String the method name.
    @return string The URL for the given parameters
    */
    
    protected function Get_Api_Url($Method)
    {

        static $Read_Only_Calls =
            array('admin.getallocation' => 1,
                'admin.getappproperties' => 1,
                'admin.getbannedusers' => 1,
                'admin.getlivestreamvialink' => 1,
                'admin.getmetrics' => 1,
                'admin.getrestrictioninfo' => 1,
                'application.getpublicinfo' => 1,
                'auth.getapppublickey' => 1,
                'auth.getsession' => 1,
                'auth.getsignedpublicsessiondata' => 1,
                'comments.get' => 1,
                'connect.getunconnectedfriendscount' => 1,
                'dashboard.getactivity' => 1,
                'dashboard.getcount' => 1,
                'dashboard.getglobalnews' => 1,
                'dashboard.getnews' => 1,
                'dashboard.multigetcount' => 1,
                'dashboard.multigetnews' => 1,
                'data.getcookies' => 1,
                'events.get' => 1,
                'events.getmembers' => 1,
                'fbml.getcustomtags' => 1,
                'feed.getappfriendstories' => 1,
                'feed.getregisteredtemplatebundlebyid' => 1,
                'feed.getregisteredtemplatebundles' => 1,
                'fql.multiquery' => 1,
                'fql.query' => 1,
                'friends.arefriends' => 1,
                'friends.get' => 1,
                'friends.getappusers' => 1,
                'friends.getlists' => 1,
                'friends.getmutualfriends' => 1,
                'gifts.get' => 1,
                'groups.get' => 1,
                'groups.getmembers' => 1,
                'intl.gettranslations' => 1,
                'links.get' => 1,
                'notes.get' => 1,
                'notifications.get' => 1,
                'pages.getinfo' => 1,
                'pages.isadmin' => 1,
                'pages.isappadded' => 1,
                'pages.isfan' => 1,
                'permissions.checkavailableapiaccess' => 1,
                'permissions.checkgrantedapiaccess' => 1,
                'photos.get' => 1,
                'photos.getalbums' => 1,
                'photos.gettags' => 1,
                'profile.getinfo' => 1,
                'profile.getinfooptions' => 1,
                'stream.get' => 1,
                'stream.getcomments' => 1,
                'stream.getfilters' => 1,
                'users.getinfo' => 1,
                'users.getloggedinuser' => 1,
                'users.getstandardinfo' => 1,
                'users.hasapppermission' => 1,
                'users.isappuser' => 1,
                'users.isverified' => 1,
                'video.getuploadlimits' => 1
            );

        $Name = 'api';

        if (isset($Read_Only_Calls[strtolower($Method)]))
            $Name = 'api_read';

        else if (strtolower($Method) == 'video.upload')
            $Name = 'api_video';
        
        return self::Get_Url($Name, 'restserver.php');
   
    }
    
    protected function Throw_Api_Exception($Result)
    {

        $e = new FB_API_EXCEPTION($Result);

        switch ($e->Get_Type())
        {
            
            case 'OAuthException':
            
            case 'invalid_token':
            
            case 'Exception':
                $Message = $e->Get_Message();
                if ((strpos($Message, 'Error validating access token') !== false) || (strpos($Message, 'Invalid OAuth access token') !== false) || (strpos($Message, 'An active access token must be used') !== false))
                    $this->Destroy_Session();
                break;
       
        }

        throw $e;
   
    }
    
    public function Destroy_Session()
    {

        $this->Access_Token = null;
        $this->Signed_Request = null;
        $this->User = null;
        $this->Clear_All_Persistent_Data();

        $Cookie_Name = $this->Get_Signed_Request_Cookie_Name();

        if (array_key_exists($Cookie_Name, $_COOKIE))
        {

            unset($_COOKIE[$Cookie_Name]);

            if (!headers_sent())
            {

                $Base_Domain = $this->Get_Base_Domain();
                setcookie($Cookie_Name, '', 1, '/', '.'.$Base_Domain);
            
            }
            else
                self::Error_Log('There exists a cookie that we wanted to clear that we couldn\'t clear because headers was already sent. Make sure to do the first API call before outputing anything.');
       
        }
   
    }
    
    //Get the base domain used for the cookie.
    
    protected function Get_Base_Domain()
    {

        // The base domain is stored in the metadata cookie if not we fallback to the current hostname
        
        $Metadata = $this->Get_Metadata_Cookie();

        if (array_key_exists('base_domain', $Metadata) && !empty($Metadata['base_domain']))
            return trim($Metadata['base_domain'], '.');
        
        return $this->Get_Http_Host();
    
    }
    
    protected function Get_Metadata_Cookie()
    {

        $Cookie_Name = $this->Get_Metadata_Cookie_Name();

        if (!array_key_exists($Cookie_Name, $_COOKIE))
            return array();

        // The cookie value can be wrapped in "-characters so remove them
        
        $Cookie_Value = trim($_COOKIE[$Cookie_Name], '"');

        if (empty($Cookie_Value))
            return array();

        $Parts = explode('&', $Cookie_Value);
        $Metadata = array();

        foreach ($Parts as $Part)
        {

            $Pair = explode('=', $Part, 2);

            if (!empty($Pair[0]))
                $Metadata[urldecode($Pair[0])] = (count($Pair) > 1) ? urldecode($Pair[1]) : '';
       
        }

        return $Metadata;

    }
    
    /*
    Build the URL for given domain alias, path and parameters.
   
    @param $name string The name of the domain
    @param $path string Optional path (without a leading slash)
    @param $params array Optional query parameters
   
    @return string The URL for the given parameters
    */
    
    protected function Get_Url($Name, $Path='', $Params=array())
    {

        $Url = self::$Domain_Map[$Name];

        if ($Path)
        {

            if ($Path[0] === '/')
                $Path = substr($Path, 1);

            $Url .= $Path;

        }

        if ($Params)
            $Url .= '?' . http_build_query($Params, null, '&');

        return $Url;

    }
    
    /*
    Make a OAuth Request.
   
    @param string $url The path (required)
    @param array $params The query/post data
   
    @return string The decoded response object
    @throws FB_API_EXCEPTION
    */
   
    protected function Oauth_Request($Url, $Params)
    {

        if (!isset($Params['access_token']))
            $Params['access_token'] = $this->Get_Access_Token();

        if (isset($Params['access_token']))
            $Params['appsecret_proof'] = $this->Get_App_Secret_Proof($Params['access_token']);

        // json_encode all params values that are not strings
        foreach ($Params as $Key => $Value)
        {

            if (!is_string($Value))
                $Params[$Key] = json_encode($Value);

        }
        
        $Result = $this->Make_Request($Url, $Params);

        return $Result;

    }
    
    /*
    Invoke the Graph API.
   
    @param string $path The path (required)
    @param string $method The http method (default 'GET')
    @param array $params The query/post data
   
    @return mixed The decoded response object
    @throws FB_API_EXCEPTION
    */
    
    protected function Graph($Path, $Method = 'GET', $Params = array())
    {

        if (is_array($Method) && empty($Params))
        {

            $Params = $Method;
            $Method = 'GET';
        
        }

        $Params['method'] = $Method; // method override as we always do a POST

        $Domain_Key = 'graph';

        $Result = json_decode($this->Oauth_Request($this->Get_Url($Domain_Key, $Path), $Params), true);

        // results are returned, errors are thrown
        
        if (is_array($Result) && isset($Result['error']))
            $this->Throw_Api_Exception($Result);

        return $Result;

    }
    
    protected function Get_App_Secret_Proof($Access_Token)
    {

        return hash_hmac('sha256', $Access_Token, $this->Get_App_Secret());
   
    }
    
    protected static function Base64_Url_Encode($Input)
    {

        $Str = strtr(base64_encode($Input), '+/', '-_');
        $Str = str_replace('=', '', $Str);
        
        return $Str;
    
    }
    
    protected static function Base64_Url_Decode($Input)
    {

        return base64_decode(strtr($Input, '-_', '+/'));
    
    }
    
    protected static function Error_Log($Msg)
    {

        //disable error log if we are running in a CLI environment
        
        if (php_sapi_name() != 'cli')
            error_log($Msg);
        
        //uncomment this if you want to see the errors on the page
        
        //print 'error_log: '.$msg."\n";
   
    }
    
    /*
    Get the UID of the connected user, or 0
    if the Facebook user is not connected.
   
    @return string the UID if available.
    */
    
    public function Get_User()
    {

        if ($this->User !== null)
            return $this->User;

        return $this->User = $this->Get_User_From_Available_Data();
   
    }
    
    /*
    Determines the connected user by first examining any signed
    requests, then considering an authorization code, and then
    falling back to any persistent store storing the user.
   
    @return integer The id of the connected Facebook user,
        or 0 if no such user exists.
    */
    
    protected function Get_User_From_Available_Data()
    {
        //if a signed request is supplied, then it solely determines who the user is.

        $Signed_Request = $this->Get_Signed_Request();

        if ($Signed_Request)
        {

            if (array_key_exists('user_id', $Signed_Request))
            {

                $User = $Signed_Request['user_id'];

                if ($User != $this->Get_Persistent_Data('user_id'))
                    $this->Clear_All_Persistent_Data();

                $this->Set_Persistent_Data('user_id', $Signed_Request['user_id']);
                
                return $User;
            }

            // if the signed request didn't present a user id, then invalidate all entries in any persistent store.
            
            $this->Clear_All_Persistent_Data();
            
            return 0;
        
        }

        $User = $this->Get_Persistent_Data('user_id', $Default = 0);
        $Persisted_Access_Token = $this->Get_Persistent_Data('access_token');

        //use access_token to fetch user id if we have a user access_token, or if the cached access token has changed.
        
        $Access_Token = $this->Get_Access_Token();

        if ($Access_Token && $Access_Token != $this->Get_Application_Access_Token() && !($User && $Persisted_Access_Token == $Access_Token))
        {

            $User = $this->Get_User_From_Access_Token();

            if ($User)
                $this->Set_Persistent_Data('user_id', $User);

            else
                $this->Clear_All_Persistent_Data();
       
        }

        return $User;

    }
    
    /*
    Retrieves the UID with the understanding that
    $this->Access_token has already been set and is
    seemingly legitimate.  It relies on Facebook's Graph API
    to retrieve user information and then extract
    the user ID.
   
    @return integer Returns the UID of the Facebook user, or 0
        if the Facebook user could not be determined.
    */
    
    protected function Get_User_From_Access_Token()
    {

        try
        {

            $User_Info = $this->Api('/me');
         
            return $User_Info['id'];
        
        }

        catch (FB_API_EXCEPTION $e)
        {

            return 0;
        
        }
    
    }
    
    /*
    Lays down a CSRF state token for this process.
   
    @return void
    */
    
    protected function Establish_Csrf_Token_State()
    {

        if ($this->State === null)
        {

            $this->State = md5(uniqid(mt_rand(), true));
            $this->Set_Persistent_Data('state', $this->State);
       
        }
   
    }
    
    /*
    Get a Login URL for use with redirects. By default, full page redirect is
    assumed. If you are using the generated URL with a window.open() call in
    JavaScript, you can pass in display=popup as part of the $params.
   
    The parameters:
    - redirect_uri: the url to go to after a successful login
    - scope: comma separated list of requested extended perms
   
    @param array $params Provide custom parameters
    @return string The URL for the login flow
    */
    
    public function Get_Login_Url($Params = array())
    {

        $this->Establish_Csrf_Token_State();
        $Current_Url = $this->Get_Current_Url();

        // if 'scope' is passed as an array, convert to comma separated list
        
        $Scope_Params = isset($Params['scope']) ? $Params['scope'] : null;

        if ($Scope_Params && is_array($Scope_Params))
            $Params['scope'] = implode(',', $Scope_Params);
        
        return $this->Get_Url('www', 'dialog/oauth', array_merge(array('client_id' => $this->Get_App_Id(), 'redirect_uri' => $Current_Url, 'state' => $this->State), $Params));
    
    }

    /*
    Get a Logout URL suitable for use with redirects.
   
    The parameters:
    - next: the url to go to after a successful logout
   
    @param array $params Provide custom parameters
    @return string The URL for the logout flow
    */
    
    public function Get_Logout_Url($Params = array())
    {

        return $this->Get_Url('www', 'logout.php', array_merge(array('next' => $this->Get_Current_Url(), 'access_token' => $this->Get_User_Access_Token()), $Params));
   
    }
    
    /*
    Get a login status URL to fetch the status from Facebook.
   
    The parameters:
    - ok_session: the URL to go to if a session is found
    - no_session: the URL to go to if the user is not connected
    - no_user: the URL to go to if the user is not signed into facebook
   
    @param array $params Provide custom parameters
    @return string The URL for the logout flow
    */
    
    public function Get_Login_Status_Url($Params = array())
    {

        return $this->Get_Url('www', 'extern/login_status.php', array_merge(array(
                            'api_key'           => $this->Get_App_Id(),
                            'no_session'        => $this->Get_Current_Url(),
                            'no_user'           => $this->Get_Current_Url(),
                            'ok_session'        => $this->Get_Current_Url(),
                            'session_version'   => 3,), 
                            $Params));
   
    }
  
    /*
    Makes an HTTP request. This method can be overridden by subclasses if
    developers want to do fancier things or use something other than curl to
    make the request.
   
    @param string $url The URL to make the request to
    @param array $params The parameters to use for the POST body
    @param CurlHandler $ch Initialized curl handle
   
    @return string The response text
    */
    
    protected function Make_Request($Url, $Params, $Ch = null)
    {

        if (!$Ch)
            $Ch = curl_init();

        $Opts = self::$Curl_Opts;
        $Opts[CURLOPT_POSTFIELDS] = http_build_query($Params, null, '&');
        $Opts[CURLOPT_URL] = $Url;

        /*
        disable the 'Expect: 100-continue' behaviour. This causes CURL to wait
        for 2 seconds if the server does not support this header.
        */
        
        if (isset($Opts[CURLOPT_HTTPHEADER]))
        {

            $Existing_Headers = $Opts[CURLOPT_HTTPHEADER];
            $Existing_Headers[] = 'Expect:';
            $Opts[CURLOPT_HTTPHEADER] = $Existing_Headers;

        }

        else
            $Opts[CURLOPT_HTTPHEADER] = array('Expect:');

        curl_setopt_array($Ch, $Opts);
        $Result = curl_exec($Ch);

        // CURLE_SSL_CACERT
        
        if (curl_errno($Ch) == 60)
        {

            self::Error_Log('Invalid or no certificate authority found, using bundled information');
            curl_setopt($Ch, CURLOPT_CAINFO, dirname(__FILE__) . '/cacert.pem');
            $Result = curl_exec($Ch);
       
        }

        /*
        With dual stacked DNS responses, it's possible for a server to
        have IPv6 enabled but not have IPv6 connectivity.  If this is
        the case, curl will try IPv4 first and if that fails, then it will
        fall back to IPv6 and the error EHOSTUNREACH is returned by the
        operating system.
        */
    
        if ($Result === false && empty($Opts[CURLOPT_IPRESOLVE]))
        {

            $Matches = array();
            $Regex = '/Failed to connect to ([^:].*): Network is unreachable/';

            if (preg_match($Regex, curl_error($Ch), $Matches))
            {

                if (strlen(@inet_pton($Matches[1])) === 16)
                {

                    self::Error_Log('Invalid IPv6 configuration on server, Please disable or get native IPv6 on your server.');
                    self::$Curl_Opts[CURLOPT_IPRESOLVE] = CURL_IPRESOLVE_V4;
                    curl_setopt($Ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
                    $Result = curl_exec($Ch);
               
                }
            
            }
        
        }

        if ($Result === false)
        {

            $e = new FB_API_EXCEPTION(array('error_code' => curl_errno($Ch), 'error' => array('message' => curl_error($Ch), 'type' => 'CurlException')));
            curl_close($Ch);
            throw $e;
        
        }

        curl_close($Ch);

        return $Result;

    }
    
    /*
    Get the data for $key, persisted by FB_BASE::Set_persistent_data()
   
    @param string $key The key of the data to retrieve
    @param boolean $default The default value to return if $key is not found
   
    @return mixed
    */
    
    abstract protected function Get_Persistent_Data($Key, $Default = false);
    
    /*
    Stores the given ($key, $value) pair, so that future calls to
    Get_persistent_data($key) return $value. This call may be in another request.
   
    @param string $key
    @param array $value
   
    @return void
    */
   
    abstract protected function Set_Persistent_Data($Key, $Value);
    
    /*
    Clear all data from the persistent storage
   
    @return void
    */
   
    abstract protected function Clear_All_Persistent_Data();
    
    /*
    Clear the data with $key from the persistent storage
   
    @param string $key
    @return void
    */
   
    abstract protected function Clear_Persistent_Data($Key);
    
    public function Send_Output($Msg = "", $Ajax = false, $Logout = false)
    {

        usleep(10000);

        if ($Ajax && $Logout)
        {

            echo '
            var output=document.getElementById("fb_main_content");
            var ih=output.innerHTML;
            $("#controls").hide(0);
            output.innerHTML=ih + "' . $Msg . '" + "<br />";
            output.scrollTop = output.scrollHeight;
            ';

        }

        else if ($Ajax && !$Logout)
        {

            echo '
            var output=document.getElementById("fb_main_content");
            var ih=output.innerHTML;
            output.innerHTML=ih + "' . $Msg . '" + "<br />";
            output.scrollTop = output.scrollHeight;
            ';

        }

        else
        {

            echo "<script type='text/javascript'>
            var output=document.getElementById('fb_main_content');
            var ih=output.innerHTML;
            output.innerHTML=ih + '".$Msg."' + '<br />';
            output.scrollTop = output.scrollHeight;
            </script>";

        }
        
        
        ob_flush();

    }
    
    //Gets access_token with xmpp_login permission
    public function Get_Chat_Access_Token($App_Id, $App_Secret, $My_Url)
    {

        $Code = $_REQUEST["code"];
    
        if (empty($Code))
        {

            echo "Initializing app...";
            flush();
            $Dialog_Url = "https://www.facebook.com/dialog/oauth?scope=xmpp_login&client_id=" . $App_Id . "&redirect_uri=" . urlencode($My_Url);
            echo "<script>top.location.href='" . $Dialog_Url . "'</script>";
            exit;
            flush();

        }
    
        $Token_Url = "https://graph.facebook.com/oauth/access_token?client_id=". $App_Id . "&redirect_uri=" . urlencode($My_Url). "&client_secret=" . $App_Secret. "&code=" . $Code;
        $Access_Token = file_get_contents($Token_Url);
        parse_str($Access_Token, $Output);
    
        return($Output['access_token']);

    }
    
    public function Xmpp_Connect($Options, $Access_Token, $Output = true)
    {

        $Stream_Xml = '<stream:stream xmlns:stream="https://etherx.jabber.org/streams" version="1.0" xmlns="jabber:client" to="chat.facebook.com" xml:lang="en" xmlns:xml="https://www.w3.org/XML/1998/namespace">';
        $Auth_Xml = '<auth xmlns="urn:ietf:params:xml:ns:xmpp-sasl" mechanism="X-FACEBOOK-PLATFORM"></auth>';
        $Close_Xml = '</stream:stream>';
        $Resource_Xml = '<iq type="set" id="3"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><resource>fb_xmpp_script</resource></bind></iq>';
        $Session_Xml = '<iq type="set" id="4" to="chat.facebook.com"><session xmlns="urn:ietf:params:xml:ns:xmpp-session"/></iq>';
        $Start_Tls = '<starttls xmlns="urn:ietf:params:xml:ns:xmpp-tls"/>';
        $Message_Xml = '<message type="chat" from="-%s@chat.facebook.com" to="-%s@chat.facebook.com"><body>%s</body></message>';
        $Presence_Xml = '<presence />';
    
        $Fp = $this->Open_Connection($Options['server'], $Output);

        if (!$Fp) 
            return false;
    
        if ($Output) 
            echo '[INFO] Authenticating...';
        
        $this->Send_Xml($Fp,  $Stream_Xml);

        if (!$this->Find_Xmpp($Fp, 'STREAM:STREAM'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at Stream Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;

        }

        if (!$this->Find_Xmpp($Fp, 'MECHANISM', 'X-FACEBOOK-PLATFORM'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at Mechanism Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;

        }
    
        $this->Send_Xml($Fp, $Start_Tls);

        if (!$this->Find_Xmpp($Fp, 'PROCEED', null))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at Proceed Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }

        stream_socket_enable_crypto($Fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
    
        $this->Send_Xml($Fp, $Stream_Xml);

        if (!$this->Find_Xmpp($Fp, 'STREAM:STREAM'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at Second Stream Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }

        if (!$this->Find_Xmpp($Fp, 'MECHANISM', 'X-FACEBOOK-PLATFORM'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at Second Mechanism Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }
    
        $this->Send_Xml($Fp, $Auth_Xml);

        if (!$this->Find_Xmpp($Fp,  'CHALLENGE', null, $Challenge))
        {

            echo "<div class=\'error\'>[ERROR]</div> Challenge Failed...";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }
        
        $Challenge = base64_decode($Challenge);
        $Challenge = urldecode($Challenge);
        parse_str($Challenge, $Challenge_Array);

        $Resp_Array = array(
            'method' => $Challenge_Array['method'],
            'nonce' => $Challenge_Array['nonce'],
            'access_token' => $Access_Token,
            'api_key' => $Options['app_id'],
            'call_id' => 0,
            'v' => '1.0',
        );

        $Response = http_build_query($Resp_Array);
        $Xml = '<response xmlns="urn:ietf:params:xml:ns:xmpp-sasl">'.base64_encode($Response).'</response>';
        $this->Send_Xml($Fp, $Xml);

        if (!$this->Find_Xmpp($Fp, 'SUCCESS'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Success Failied...";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }
    
        $this->Send_Xml($Fp, $Stream_Xml);

        if (!$this->Find_Xmpp($Fp,'STREAM:STREAM'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at Stream after nonce Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }

        if (!$this->Find_Xmpp($Fp, 'STREAM:FEATURES'))
        {
            echo "<div class=\'error\'>[ERROR]</div> Send xml at Stream Features after nonce Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;
        }

        $this->Send_Xml($Fp, $Resource_Xml);

        if (!$this->Find_Xmpp($Fp, 'JID'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at JID after nonce Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }

        $this->Send_Xml($Fp, $Session_Xml);

        if (!$this->Find_Xmpp($Fp, 'SESSION'))
        {

            echo "<div class=\'error\'>[ERROR]</div> Send xml at Session after nonce Failed";
            $this->Xmpp_Disconnect($Fp);
            return false;
        
        }
    
        // we made it!
        $this->Send_Xml($Fp, $Presence_Xml);

        if ($Output) 
            $this->Recv_Xml($Fp, false);
        
        if ($Output) 
            echo "<div class=\'success\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Authentication complete</div>";
        
        return $Fp;
   
    }
    
    protected function Open_Connection($Server, $Output)
    {

        if ($Output) 
            echo "<div class=\'info\'>[INFO] Opening connection...</div>";
    
        $Fp = pfsockopen($Server, 80, $Errno, $Errstr); //fsockopen
    
        if (!$Fp)
            echo("$Errstr ($Errno)");
        
        elseif ($Output) 
                echo "<div class=\'success\'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Connected</div>";
        
        return $Fp;
    
    }
    
    public function Xmpp_Send_Msg($Fp, $Options, $Ajax = true)
    {

        $Close_Xml = '</stream:stream>';
        $Message_Xml = '<message type="chat" from="-%s@chat.facebook.com" to="-%s@chat.facebook.com"><body>%s</body></message>';
        
        $this->Send_Xml($Fp, sprintf($Message_Xml, $Options['uid'], $Options['recv_id'], $Options['msg']), $Ajax);
        $this->Recv_Xml($Fp, $Ajax);
        
        $this->Send_Output("<div class='msg-info'>Me >> ".$Options['recv_name'].":</div>".htmlentities($Options['msg'], ENT_QUOTES | ENT_IGNORE, "UTF-8"), $Ajax);
        
        $this->Send_Xml($Fp, $Close_Xml, $Ajax);
        fclose($Fp);
   
    }
    
    public function Xmpp_Disconnect($Fp, $Ajax = false)
    {

        $Close_Xml = '</stream:stream>';
        
        $this->Send_Xml($Fp, $Close_Xml, $Ajax);
        fclose($Fp);
        echo "<div class=\'info\'><br /><br /><br />========================<br />[INFO] Connection closed.</div>";
        return true;
    
    }
    
    public function Send_Xml($Fp, $Xml, $Ajax = false)
    {

        //fwrite($Fp, $Xml);
        echo 'send-->'. htmlspecialchars($Xml).'<br>';
    
    }
    
    protected function Find_Xmpp($Fp, $Tag, $Value = null, &$Ret = null, $Ajax = false)
    {

        static $Val = null, $Index = null;
    
        do
        {

            if ($Val === null && $Index === null)
            {

                list($Val, $Index) = $this->Recv_Xml($Fp, $Ajax);
                if ($Val === null || $Index === null)
                    return false;
            
            }
    
            foreach ($Index as $Tag_Key => $Tag_Array)
            {

                if ($Tag_Key === $Tag)
                {

                    if ($Value === null)
                    {

                        if (isset($Val[$Tag_Array[0]]['value']))
                            $Ret = $Val[$Tag_Array[0]]['value'];
            
                        return true;

                    }

                    foreach ($Tag_Array as $i => $Pos)
                    {

                        if ($Val[$Pos]['tag'] === $Tag && isset($Val[$Pos]['value']) && $Val[$Pos]['value'] === $Value)
                        {

                            $Ret = $Val[$Pos]['value'];
                            return true;

                        }
                    
                    }
                
                }

            }

            $Val = $Index = null;

        } 

        while (!feof($Fp));

        return false;

    }
    
    public function Recv_Xml($Fp, $Ajax, $Size = 4096)
    {

        $Xml = fread($Fp, $Size);

        if ($Xml === "")
            return null;
        
        //$this->Send_output('recv-->'.htmlentities(htmlspecialchars($xml), ENT_QUOTES | ENT_IGNORE, "UTF-8").'<br/>', $ajax);
    
        // parses xml
        $Xml_Parser = xml_parser_create();
        xml_parse_into_struct($Xml_Parser, $Xml, $Val, $Index);
        xml_parser_free($Xml_Parser);
        
        return array($Val, $Index);

    }
    
    public function Aasort(&$Array, $Key)
    {

        $Sorter = array();
        $Ret = array();
        reset($Array);

        foreach ($Array as $Ii => $Va)
            $Sorter[$Ii] = $Va[$Key];
        
        asort($Sorter);
        
        foreach ($Sorter as $Ii => $Va)
            $Ret[$Ii] = $Array[$Ii];
    
        $Array = $Ret;

    }

}
?>
