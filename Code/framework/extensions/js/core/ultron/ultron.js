/*
    ULTRON (Safe JS loader & manager)

    File name: ultron.js (Version: 0.3)
    Description: This file contains the ULTRON extension.
    Dependencies: Vulcan.

    Coded by George Delaportas (G0D)
    Copyright (C) 2016
    Open Software License (OSL 3.0)
*/

// ULTRON
function ultron(anonymous_function)
{
	var utils = new vulcan();

	if (!utils.validation.misc.is_function(anonymous_function))
		return false;

    document.addEventListener("DOMContentLoaded", function(event) { (anonymous_function)(event); });

    return true;
}
