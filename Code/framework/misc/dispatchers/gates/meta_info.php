<?php
    /*
        GreyOS - Meta-Info (Programmable gate for getting Google search results)

        File name: meta_info.php
        Description: This file contains the Meta-Info Google search results gate (AJAX).

        Coded by George Delaportas (G0D)
        Copyright © 2024
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

	// Check for invalid parameters
	if (empty($_POST['url']))
	{
		echo '-1';

		return;
	}

    $api_key = '5d10f52cdf6147e89e4e40c5e790be6d';
    $api_url = 'https://api.bing.microsoft.com/v7.0/search';

    list($headers, $json) = web_search($api_url, $api_key, $_POST['url']);

    echo json_encode(json_decode($json), JSON_PRETTY_PRINT);

    function web_search($api_url, $api_key, $query)
    {
        $headers = "Ocp-Apim-Subscription-Key: $api_key\r\n";
        $options = array ('http' => array ('header' => $headers, 'method' => 'GET'));
        $context = stream_context_create($options);
        $result = file_get_contents($api_url . '?q=' . urlencode($query), false, $context);
        $headers = array();

        foreach ($http_response_header as $key => $value)
        {
            $response = explode(':', $value, 2);

            if (isset($response[1]))
                if (preg_match('/^BingAPIs-/', $response[0]) || preg_match('/^X-MSEdge-/', $response[0]))
                    $headers[trim($response[0])] = trim($response[1]);
        }

        return array($headers, $result);
    }
?>
