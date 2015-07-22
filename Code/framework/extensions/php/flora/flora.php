<?php

    /*

        GreyOS Inc. - Flora extension
        
        Version: 1.0
        
        File name: flora.php
        Description: This file contains the Flora extension.
        
        Coded by John Inglessis (negle)
        
        GreyOS Inc.
        Copyright © 2013

    */



    class Flora
    {

        public function Replace_Link($mode, $text, $attributes = null, $url_info = null)
        {

            if (!is_integer($mode) || !is_string($text) || $mode < 1 || $mode > 2)
                return false;       

            if (!empty($attributes) && is_array($attributes))
            {

                $valid_attributes = ['id', 'class', 'style', 'title', 'dir', 'lang', 'accesskey', 
                                     'tabindex', 'contenteditable', 'draggable', 'spellcheck', 'target', 'rel'];

                $final_attributes = '';

                foreach ($attributes as $attr => $value) 
                {

                    if (in_array($attr, $valid_attributes) || strpos($attr, 'data-') === 0)
                            $final_attributes .= $attr . '="' . $value . '" ';

                    else
                        return false;

                }

            }

            if (!empty($url_info) && is_array($url_info))
            {

                foreach ($url_info as $url) 
                {

                    if (is_array($url) && !empty($url))
                    {

                        if (!empty($final_attributes))
                            $text = str_replace($url['display_url'], '<a ' . $final_attributes . 'href="' . 
                                    $url['expanded_url'] . '">' . $url['display_url'] . '</a>', $text);

                        else
                            $text = str_replace($url['display_url'], '<a href="' . $url['expanded_url'] . '">' . $url['display_url'] . '</a>', $text);
  
                    }

                    else
                        return false;

                }

                return $text;

            }

            else
            {

                if (!empty($final_attributes))
                     return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', 
                                         '<a ' . $final_attributes . 'href="$1">$1</a>', $text); 

                else
                     return preg_replace('@(https?://([-\w\.]+[-\w])+(:\d+)?(/([\w/_\.#-]*(\?\S+)?[^\.\s])?)?)@', '<a href="$1">$1</a>', $text);

            }

        }

    }

?>
