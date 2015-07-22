/*

    GreyOS Inc. -  Log off Control Utility
    
    File name: log_off_ctrl.js (Version: 1.0)
    Description: This file contains the Log off Control Utility.
    
    Coded by George Delaportas (G0D)
    
    GreyOS Inc.
    Copyright © 2013

*/



(function()
{

    var talos_id = document.getElementById('log_off_talos_id').value;

    function Log_Off(id)
    {

        var form = null;
        var dyn_element = null;

        if (isNaN(id))
            return false;

        form = document.getElementsByTagName('form');
        dyn_element = document.createElement('input');

        dyn_element.setAttribute('id', 'logoff_id');
        dyn_element.setAttribute('name', 'logoff_id');
        dyn_element.setAttribute('type', 'hidden');
        dyn_element.setAttribute('value', '');

        form[0].appendChild(dyn_element);

        document.getElementById('logoff_id').value = id;

        //AJAX_GreyOS_Mail('action=destroy_mail_session&user_id=' + id);

        form[0].submit();

        return true;

    }

    document.getElementById('log_off').onclick = function() { Log_Off(talos_id); };

})();
