/* GreyOS - My test program (Meta-Script app & service template for Cloud Edit) */

// Meta-Script API is automatically exposed in this context
var ms_app = meta_script.app(),
    ms_svc = meta_script.service();

// Meta-Caller API (automatically exposed in this context) is your bridge with Cloud Edit
var mc = meta_caller;

// Helping delegate function example
function gui()
{
    ms_app.main.set_content('<br><br><br><center>HELLO WORLD!</center>');
    ms_app.main.set_status('APP ID: ' + ms_app.get_system_id());
}

ms_app.init('Hello World', true);                   // Resizable: true / Fixed: false
ms_app.main.set_title('My Meta-Script App');        // Set title
ms_app.settings.use_resize_tooltip(true);           // Use resize tooltip
ms_app.position.left(80);                           // Set initial left position
ms_app.position.top(30);                            // Set initial top position
ms_app.size.width(500);                             // Set initial width
ms_app.size.height(700);                            // Set initial height
ms_app.on('opened', () => { gui(); });              // On-opened: Start doing your stuff...
ms_app.on('close', () => { mc.reset(); });          // On-close: Close all apps and services & reset Cloud Edit status
ms_app.run();                                       // Run your app

ms_svc.init('Example', 'default');                  // Initialize service name with default icon
ms_svc.set('function_name',                         // Set function name and body
           function(func_args)                      // Array of arguments
           {
               console.log(func_args);              // Example action
           });
ms_svc.execute('function_name', ['test']);          // Execute/test the function of your service
ms_svc.run();                                       // Register & run the service
