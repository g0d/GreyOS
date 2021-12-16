/*
    GreyOS - Meta-Script (Version: 1.0)

    File name: meta_script.js
    Description: This file contains the Meta-Script - Meta scripting language interface (wrapper) module.

    Coded by George Delaportas (G0D)
    Copyright © 2021
    Open Software License (OSL 3.0)
*/

// Meta-Script
function meta_script()
{
    var self = this;

    function app()
    {
        
    }

    function service()
    {
        
    }

    function dash()
    {
        function desktops()
        {
            
        }

        function dock()
        {
            
        }

        function stack()
        {
            
        }

        function tray()
        {
            
        }
    }

    function system()
    {
        function apps()
        {
            
        }

        function services()
        {
            
        }

        function profile()
        {
            function messages()
            {
                
            }

            function notifications()
            {
                
            }
        }
    }

    this.cosmos = function(cosmos_object)
    {
        if (utils_sys.validation.misc.is_undefined(cosmos_object))
            return false;

        cosmos = cosmos_object;

        matrix = cosmos.hub.access('matrix');
        app_box = cosmos.hub.access('app_box');

        return true;
    };

    var cosmos = null,
        matrix = null,
        app_box = null,
        utils_sys = new vulcan();
}
