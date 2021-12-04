/*
    Worker (Template)

    File name: worker.js (Version: 0.2)
    Description: This file contains the worker template for Task.

    Coded by George Delaportas (G0D)
    Copyright (C) 2021
    Open Software License (OSL 3.0)
*/

onmessage = function(e)
{
    // Your code here...
    postMessage(e.data);
};
