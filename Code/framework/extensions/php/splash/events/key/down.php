<?php

    /*

        GreyOS Inc. - spl@sh

        Version: 3.2

        File name: down.php
        Description: This file contains the server KEY DOWN event actions.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright © 2013

    */



    /* ------------------------ BEGIN ------------------------ */

    function Server_Key_Down($params)
    {

        $message = HELPERS::Parse_Event_Parameters($params);

        if ($message === false)
            return false;

        echo $message;

        return true;

    }

    /* ------------------------- END ------------------------- */

?>
