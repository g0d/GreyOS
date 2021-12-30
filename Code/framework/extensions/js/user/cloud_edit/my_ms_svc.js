// GreyOS - My test service (Meta-Script service template for Cloud Edit)

var ms_svc = meta_script.service(),                 // Meta-Script API is automatically exposed in this context
    mc = meta_caller;                               // Meta-Caller API is automatically provided by Cloud Edit

ms_svc.init('my_ms_service');                       // Initialize service name with default icon
ms_svc.set('function_name',                         // Set function name and body
           function(func_args)                      // Array of arguments
           {
               console.log(func_args);              // Example
           });
ms_svc.execute('function_name', ['test']);          // Execute/test the function of your service
ms_svc.run(mc);                                     // Register & run your service (passing Meta-Caller as argument)
