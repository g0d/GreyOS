<?php
    /*
        GreyOS - HYPERBEAM (Programmable gate for HYPERBEAM session management)

        File name: hyperbeam.php
        Description: This file contains the HYPERBEAM session management gate (AJAX).

        Coded by George Delaportas (G0D/ViR4X)
        Copyright © 2023
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    UTIL::Load_Extension('portal', 'php');

    $secret_key_live = 'Fa48S5AqNesZKA5TQHGgAiU7gw8WV-JOY-dZ771hRkw';
    $secret_key_test = 'sk_test_x2htm0Ivk146Nz_5vr0EHAtATM6lafKkO5lSDZspPsE';

    function hb_list_sessions($secret_key)
    {
        $hb_results = Portal('https://engine.hyperbeam.com/v0/vm', 'GET', 
                             array('Authorization' => 'Bearer ' . $secret_key));

        return json_decode($hb_results, true);
    }

    function hb_new_session($secret_key, $config)
    {
        $hb_results = Portal('https://engine.hyperbeam.com/v0/vm', 'POST', 
                             array('Authorization' => 'Bearer ' . $secret_key), 
                             $config);

        return json_decode($hb_results, true);
    }

    function hb_reload_session($secret_key, $session_id)
    {
        $hb_results = Portal('https://engine.hyperbeam.com/v0/vm', 'POST', 
                             array('Authorization' => 'Bearer ' . $secret_key), 
                             '{"profile":{"load": "' . $session_id . '"}}');

        return json_decode($hb_results, true);
    }

    function hb_terminate_session($secret_key, $session_id)
    {
        return  Portal('https://engine.hyperbeam.com/v0/vm/' . $session_id, 'DELETE', 
                       array('Authorization' => 'Bearer ' . $secret_key));

    }

    if (isset($_POST['config']))
    {
        $hb_results_array = hb_list_sessions($secret_key_live);

        if (empty($hb_results_array['next']))
        {
            $hb_results_array = hb_new_session($secret_key_live, $_POST['config']);

            echo $hb_results_array['embed_url'];
        }
        else
        {
            $hb_results_array = hb_reload_session($secret_key_live, $hb_results_array['next']);

            if (isset($hb_results_array['code']))
            {
                hb_terminate_session($secret_key_live, $hb_results_array['next']);

                $hb_results_array = hb_new_session($secret_key_live, $_POST['config']);

                echo $hb_results_array['embed_url'];
            }
            else
                echo $hb_results_array['embed_url'];
        }
    }
    else if (isset($_POST['terminate']))
        echo hb_terminate_session($secret_key_live, $_POST['terminate']);
    else
        echo '0';
?>
