// GreyOS - My test service (Meta-Script service template for Cloud Edit)

var ms_svc = meta_script.service();                 // Meta-Script API is automatically exposed in this context

ms_svc.init('my_ms_service', 'default');            // Initialize service name with default icon
ms_svc.set('function_name',                         // Set function name and body
           function(func_args)                      // Array of arguments
           {
               console.log(func_args);              // Example
           });
ms_svc.execute('function_name', ['test']);          // Execute/test the function of your service
ms_svc.run();                                       // Register & run your service
