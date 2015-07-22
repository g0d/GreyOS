<?php
class FB_API_EXCEPTION extends Exception
{
    //The result from the API server that represents the exception information.
    
    protected $Result;

    /*
    Make a new API Exception with the given result.
   
    @param array $result The result from the API server
    */
    
    public function __construct($Result)
    {

        $this->Result = $Result;

        $Code = isset($Result['error_code']) ? $Result['error_code'] : 0;

        if (isset($Result['error_description']))
            $Msg = $Result['error_description'];
        
        else if (isset($Result['error']) && is_array($Result['error']))
            $Msg = $Result['error']['message'];
        
        else if (isset($Result['error_msg']))
            $Msg = $Result['error_msg'];
        
        else
            $Msg = 'Unknown Error. Check Get_Result()';

        parent::__construct($Msg, $Code);
   
    }

    /*
    Return the associated result object returned by the API server.
   
    @return array The result from the API server
    */
    
    public function Get_Result()
    {

        return $this->Result;
    
    }

    /*
    Returns the associated type for the error. This will default to
    'Exception' when a type is not available.
   
    @return string
    */
    
    public function Get_Type()
    {

        if (isset($this->Result['error']))
        {

            $Error = $this->Result['error'];

            if (is_string($Error))
                return $Error;
    
            else if (is_array($Error))
            {

                if (isset($Error['type']))
                    return $Error['type'];

            }
                    
        }

        return 'Exception';

    }

    /*
    To make debugging easier.
   
    @return string The string representation of the error
    */
    
    public function To_String()
    {

        $Str = $this->Get_Type() . ': ';

        if ($this->Code != 0)
            $Str .= $this->Code . ': ';
    
        return $Str . $this->Message;
    
    }

}

?>