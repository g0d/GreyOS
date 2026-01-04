<?php
    /*
        Philos (AI agent for GreyOS)

        File name: philos.php (Version: 1.0)
        Description: This file contains the Philos class.

        Coded by George Delaportas (G0D/ViR4X)
        Copyright (C) 2013 - 2026
        Open Software License (OSL 3.0)
    */

    // Check for direct access
    if (!defined('micro_mvc'))
        exit();

    // Class : [PHILOS]
    class PHILOS
   	{
		/* ----- Class Properties ----- */

		// Global Search Query
		private $query;

		/* ----- End of Class Properties ----- */

		// Main Constructor
		public function __construct($query)
		{
			$this->search_query = $query;
		}

		// Get_Search_Query - Returns user's query - Only for displaying it at this moment
		public function Get_Search_Query()
		{
            // Temporary refiltering
            $tmp_query = str_replace('+', ' ', $this->search_query);

			return $tmp_query;
		}
   	}
?>
