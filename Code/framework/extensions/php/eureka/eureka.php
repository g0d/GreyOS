<?php

    /*
    
        GreyOS Inc. - EUREKA
        
        Version: 1.0
                
        File name: eureka.php
        Description: This file contains the EUREKA class.
        
        Coded by John Inglessis
        
        GreyOS Inc.
        Copyright © 2013
    
    */



    // Load AJAX support.

    // Include Search Engine Class for Google.
    require_once('search_engines/google.php');
    
    // Include Search Engine Class for Yahoo.
    require_once('search_engines/yahoo.php');
    
    // Include Search Engine Class for Bing.
    require_once('search_engines/bing.php');
    
    // Include filters for the query.
    
    // Class : [EUREKA]
    class EUREKA
   	{
		/* ----- Class Properties ----- */
		
		// Global Search Query
		private $search_query;
		
		// Personalized Information about the user should be placed here.		
		
		
		// User's option should be placed here. Ex: Which Search Engines the user wants to get the results from?
		
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
		
		// Filter the query before the search.
		public function Filter_Query()
		{
			
            // Temporary Filtering for replacing spaces with '+' for Google's Queries
            $this->search_query = str_replace(' ', '+', $this->search_query);
			
		}

        public function Search_Google()
        {

            self::Filter_Query();

            $google_search = new GOOGLE();

            $google_search->Search($this->search_query);

        }
		
   	}
?>
