<?php
    /*
        GreyOS - Meta-Programs (Programmable gate for loading sources of user programs developed with Meta-Script)

        File name: meta_programs.php
        Description: This file contains the User Programs control gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2024
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Load helper extensions
    UTIL::Load_Extension('arkangel', 'php');

    if (isset($_POST))
    {
        $user_profile = ARKANGEL::Fetch_My_Profile();

        $uid = $user_profile['uid'];

        if ($_POST['action'] === 'code' && !empty($_POST['mode']) && !empty($_POST['x_id']))
        {
            $user_programs = $user_profile['user_programs'][$_POST['mode'] . 's'];

            $counter = 0;

            foreach ($user_programs as $program)
            {
                if ($program['name'] === $_POST['x_id'])
                {
                    $user_profile['user_programs'][$_POST['mode'] . 's'][$counter]['last_run'] = time();

                    if (!ARKANGEL::Update_Profile($user_profile))
                    {
                        echo '-1';

                        return;
                    }

                    $file_path = UTIL::Absolute_Path('fs/' . $uid . '/programs/' . $_POST['x_id']  . '/' .  $_POST['x_id'] . '.js');

                    echo file_get_contents(minify_source($file_path));
                }

                $counter++;
            }
        }
        else
            echo '-1';
    }

    function minify_source($js_data)
    {
		$js_source = trim($js_data);

		$js_source = str_replace("\t", " ", $js_data);

        $js_source = preg_replace('/\n(\s+)?\/\/[^\n]*/', "", $js_source);
        $js_source = preg_replace("!/\*[^*]*\*+([^/][^*]*\*+)*/!", "", $js_source);
		$js_source = preg_replace("/\/\*[^\/]*\*\//", "", $js_source);
		$js_source = preg_replace("/\/\*\*((\r\n|\n) \*[^\n]*)+(\r\n|\n) \*\//", "", $js_source);

        $js_source = str_replace("\r", "", $js_source);

		$js_source = preg_replace("/\s+\n/", "\n", $js_source);
		$js_source = preg_replace("/\n\s+/", "\n ", $js_source);
		$js_source = preg_replace("/ +/", " ", $js_source);

		$js_source = preg_replace("/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/", "", $js_source);

		return $js_source;
	}
?>
