// GreyOS - My test service (Meta-Script service template for Cloud Edit)

var ms_svc = meta_script.service();                     // Meta-Script API is exposed in this context by design

/* OPTION 1 SVC :: Use the code below to build a service that calls a 3rd service API and interact with... */
var all_api = meta_script.program.list_api(),           // List all public API calls from running programs
    public_api_call = null;

if (all_api.length > 0)                                 // Check for available programs with public API
{
    public_api_call = all_api[0].calls[0];              // Select the first available

    public_api_call('Hello service!');                  // Call the public API
}
/* -------------------------------------------------------------------------------------------------------- */

/* OPTION 2 SVC :: Use the code below to build a service with a public API call for any service to interact */
function console_out(text)                              // Write text in the console
{
    console.log(text);
}

meta_script.program.expose_api([console_out]);          // Expose the above function as a public API call
/* -------------------------------------------------------------------------------------------------------- */

ms_svc.init('my_ms_service', 'svc_default');            // Initialize service name with default icon
ms_svc.set('function_name',                             // Set function name and body
           (func_args) =>                               // Array of arguments
           {
               console.log(func_args[0]);               // Example
           });
ms_svc.execute('function_name', ['test']);              // Execute/test the function of your service
ms_svc.run();                                           // Register & run your service
