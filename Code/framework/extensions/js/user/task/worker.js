/*
    Worker (Test worker for Task)

    File name: worker.js (Version: 0.1)
    Description: This file contains the test worker for Task.

    Coded by George Delaportas (G0D)
    Copyright (C) 2021
    Open Software License (OSL 3.0)
*/

onmessage = function(e)
{
    // YOUR STUFF HERE...

    postMessage(e.data);
};
