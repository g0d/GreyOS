/*

    Worker (Test worker for Parallel)

    File name: worker.js (Version: 0.1)
    Description: This file contains the test worker for Parallel.

    Coded by George Delaportas (G0D)
    Copyright (C) 2017
    Open Software License (OSL 3.0)

*/

onmessage = function(e)
{
    // YOUR STUFF HERE...

    postMessage('Worker says: ' + e.data);
};
