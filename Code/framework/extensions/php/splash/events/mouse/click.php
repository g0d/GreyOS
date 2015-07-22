<?php

    /*

        GreyOS Inc. - spl@sh

        Version: 3.2

        File name: click.php
        Description: This file contains the server MOUSE CLICK event actions.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright © 2013

    */



    /* ------------------------ BEGIN ------------------------ */

    function Server_Mouse_Click($params)
    {

        $message = HELPERS::Parse_Event_Parameters($params);

        if ($message === false)
            return false;

        echo $message;

        return true;

    }

    /* ------------------------- END ------------------------- */

?>
