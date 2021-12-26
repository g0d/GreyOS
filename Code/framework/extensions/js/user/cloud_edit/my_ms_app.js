// GreyOS - My Meta-Script App (Default Cloud Edit Meta-Script app template)

var ms_app = meta_script.app(),     // Meta-Script API is automatically exposed in this context
    mc = meta_caller;               // Meta-Caller API is automatically provided by Cloud Edit

// Helping delegate function
function gui()
{
    ms_app.set_status('APP ID: ' + ms_app.get_system_id());
}

ms_app.init('my_ms_test', true);                                    // Resizable: true / Fixed: false
ms_app.set_title('GreyOS :: My Meta-Script App');
ms_app.set_content('<br><br><br><center>HELLO WORLD!</center>');
ms_app.position.left(920);                                          // Changes dynamically to help you use running apps
ms_app.position.top(170);                                           // Changes dynamically to help you use running apps
ms_app.size.width(720);
ms_app.size.height(480);
ms_app.on('opened', function() { gui(); });                         // On-opened: Start doing your stuff...
ms_app.on('close', function()                                       // On-close: Do cleanups for before termination
                   {
                       // Instruct Cloud Edit to reset its state
                       mc.reset();
                   });
ms_app.run();                                                       // Run your app

// Inform Cloud Edit of the application ID specified in run-time by the system
mc.telemetry(ms_app.get_system_id());
