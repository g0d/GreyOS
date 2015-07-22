/*

    GreyOS Inc. - Common Options
    
    File name: common_opt.js (Version: 1.0)
    Description: This file contains the Common Options extension.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



// Clear error
function Clear_Error()
{

        try
        {
        
                document.getElementById('register_error').innerHTML = '';
                
                return true;
        
        }
        
        catch(e)
        {
        
                try
                {
                
                        document.getElementById('login_error').innerHTML = '';
                        
                        return true;
                
                }
                
                catch(e)
                {
                
                    return false;
                
                }
        
        }

}

// Cancel and go back
function Cancel()
{

	window.history.back();
	
	return true;

}
