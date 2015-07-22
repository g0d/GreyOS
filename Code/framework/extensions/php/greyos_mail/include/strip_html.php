<?php

    /*

        GreyOS Inc. - GreyOS M@il

        Version: 1.0

        File name: strip_html.php
        Description: This file contains methods for remove HTML tags in GreyOS M@il extension.

        Coded by Slavenko Božić (slawe)

        GreyOS Inc.
        Copyright © 2013

    */



    function Remove_HTML_Tags($text)
    {

        $text = preg_replace(
                array(
                    // remove invisible content
                    '@<head[^>]*?>.*?</head>@siu',
                    '@<style[^>]*?>.*?</style>@siu',
                    '@<script[^>]*?.*?</script>@siu',
                    '@<object[^>]*?.*?</object>@siu',
                    '@<embed[^>]*?.*?</embed>@siu',
                    '@<applet[^>]*?.*?</applet>@siu',
                    '@<noframes[^>]*?.*?</noframes>@siu',
                    '@<noscript[^>]*?.*?</noscript>@siu',
                    '@<noembed[^>]*?.*?</noembed>@siu',
                    /* '@<input[^>]*?>@siu', */
                    '@<form[^>]*?.*?</form>@siu',
                    // add line breaks before & after blocks
                    '@<((br)|(hr))>@iu',
                    '@</?((address)|(blockquote)|(center)|(del))@iu',
                    '@</?((div)|(h[1-9])|(ins)|(isindex)|(p)|(pre))@iu',
                    '@</?((dir)|(dl)|(dt)|(dd)|(li)|(menu)|(ol)|(ul))@iu',
                    '@</?((table)|(th)|(td)|(caption))@iu',
                    '@</?((form)|(button)|(fieldset)|(legend)|(input))@iu',
                    '@</?((label)|(select)|(optgroup)|(option)|(textarea))@iu',
                    '@</?((frameset)|(frame)|(iframe))@iu',
                    
                ), array(
                    
                    " ", " ", " ", " ", " ", " ", " ", " ", " ", " ",
                    " ", "\n\$0", "\n\$0", "\n\$0", "\n\$0", "\n\$0",
                    "\n\$0", "\n\$0",
                    
                ), $text);

        // remove empty lines
        $text = preg_replace("/(^[\r\n]*|[\r\n]+)[\s\t]*[\r\n]+/", "\n", $text);
        // remove leading spaces
        $text = preg_replace("/\n( )*/", "\n", $text);

        // remove all remaining tags and comments
        return strip_tags($text);
        
    }

?>
