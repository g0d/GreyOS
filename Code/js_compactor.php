<?php
    /*
        JS Compactor (Deployment utility)

        File name: js_compactor.php (Version: 1.0)
        Description: This file contains the JS Compactor - Deployment utility that minimizes and compacts all JS extensions into one file.

        Coded by George Delaportas (G0D)
        Copyright (C) 2023
        Open Software License (OSL 3.0)
    */

    error_reporting(0);

    function minify_js($js_file)
    {
		$js_data = str_replace("\t", " ", $js_file);

        $js_data = preg_replace('/\n(\s+)?\/\/[^\n]*/', "", $js_data);
        $js_data = preg_replace("!/\*[^*]*\*+([^/][^*]*\*+)*/!", "", $js_data);
		$js_data = preg_replace("/\/\*[^\/]*\*\//", "", $js_data);
		$js_data = preg_replace("/\/\*\*((\r\n|\n) \*[^\n]*)+(\r\n|\n) \*\//", "", $js_data);

        $js_data = str_replace("\r", "", $js_data);

		$js_data = preg_replace("/\s+\n/", "\n", $js_data);
		$js_data = preg_replace("/\n\s+/", "\n ", $js_data);
		$js_data = preg_replace("/ +/", " ", $js_data);

		return $js_data;
	}

    function list_all_js_extensions()
    {
        $ext_data = file_get_contents('framework/config/registry/js.json');
        $result = json_decode($ext_data, true);

        if (json_last_error() !== JSON_ERROR_NONE)
            return false;

        return $result;
    }

    function compact_js()
    {
        $minified_js_file = null;

        $all_js_files = list_all_js_extensions();

        foreach ($all_js_files as $js_file => $js_level)
        {
            $ext_contents = file_get_contents('framework/extensions/js/' . $js_level . '/' . $js_file . '/' . $js_file . '.js');

            $minified_js_file .= minify_js($ext_contents);
        }

        $minified_js_file = minify_js($minified_js_file);

        file_put_contents('site/js/all_ext_min.js', $minified_js_file);

        echo '<center>
                <br><br><br><br><br>
                <b>[ micro-MVC ]</b>
                <br><br><br>
                Compacting done!
              </center>';

        return true;
    }

    compact_js();
?>
