<?php
    /*
        JS Compactor (Deployment utility)

        File name: js_compactor.php (Version: 1.3)
        Description: This file contains the JS Compactor - Deployment utility that optimizes (minimizes and compacts) all JS extensions into one file.

        Coded by George Delaportas (G0D)
        Copyright (C) 2023
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    function m_mvc_minify_js($js_file)
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

    function m_mvc_list_all_js_extensions()
    {
        $ext_data = file_get_contents('framework/config/registry/js.json');
        $result = json_decode($ext_data, true);

        if (json_last_error() !== JSON_ERROR_NONE)
            return false;

        return $result;
    }

    function m_mvc_list_all_autoload_js_extensions()
    {
        $ext_data = file_get_contents('framework/config/misc/ext_autoload.json');
        $result = json_decode($ext_data, true);

        if (json_last_error() !== JSON_ERROR_NONE)
            return false;

        return $result['js'];
    }

    function m_mvc_compact_js($clear_cache = true)
    {
        $minified_js_file = null;

        $all_js_files = m_mvc_list_all_js_extensions();
        $all_autoload_js_files = m_mvc_list_all_autoload_js_extensions();

        foreach ($all_js_files as $js_file => $js_level)
        {
            if (!in_array($js_file, $all_autoload_js_files))
                continue;

            $ext_contents = file_get_contents('framework/extensions/js/' . $js_level . '/' . $js_file . '/' . $js_file . '.js');

            $minified_js_file .= m_mvc_minify_js($ext_contents);
        }

        $minified_js_file = m_mvc_minify_js($minified_js_file);

        file_put_contents('site/js/all_ext_min.js', $minified_js_file);

        if ($clear_cache)
            $cache_reset = '?version=' . time();
        else
            $cache_reset = '';

        echo '<script src="/site/js/all_ext_min.js' . $cache_reset . '"></script>';

        return true;
    }

    m_mvc_compact_js();
?>
