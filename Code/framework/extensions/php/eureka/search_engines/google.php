<?php

    /*
    
        GreyOS Inc. - Google Class
        
        Version: 1.0
                
        File name: google.php
        Description: This file contains the Google class.
        
        Coded by John Inglessis
        
        GreyOS Inc.
        Copyright © 2013
    
    */

    // Include the HTML DOM PARSER in order to grab search results.
    require_once(realpath(dirname(__FILE__) . '/..') . '/html_parser/simple_html_dom.php');

    // Class : [GOOGLE]    
    class GOOGLE
    {
        /* ----- Class Properties ----- */
        private $results;
        
        /* ----- End of Class Properties ----- */
        
        // Main Constructor
        public function __consturct()
        {

            // Code to write !

        }
        
        public function Search($query)
        {

            /* This section is parsing only the first page of google's results.
               NOTE :  FIX FUNCTIONALITY in order to parse the results for a 
               specific number of pages. ( if possible for all the pages )
            */

            $url  = 'http://www.google.com/search?hl=en&safe=active&tbo=d&site=&source=hp&q='.$query;
            
            $html = file_get_html($url);
            
            $linkObjs = $html->find('h3.r a');
            
            $json = array();

            // Temporary Echo for Information
            echo '<p><h3>Test Google Results :</h3></p>';
            
            foreach ($linkObjs as $linkObj) 
            {
                
                $title = trim($linkObj->plaintext);
                
                $link  = trim($linkObj->href);
                
                if (!preg_match('/^https?/', $link) && preg_match('/q=(.+)&amp;sa=/U', $link, $matches) && preg_match('/^https?/', $matches[1]))
                    
                    $link = $matches[1];
                    
                else if (!preg_match('/^https?/', $link))
                
                    continue;    
                

                // Temporary echo for displaying the results. Testing Reasons
                echo '<p>Title : '.$title.'<br/>';

                echo '<a href="'.$link.'" target="_new">'.$link.'</a></p>';
                
            }
            
        }
        
        public function Get_Results()
        {
            
            // Code to write! 
                
        }
        
    }
?>