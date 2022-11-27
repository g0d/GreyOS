// GreyOS - My test app (Meta-Script app template for Cloud Edit)

var ms_app = meta_script.app();                     // Meta-Script API is automatically exposed in this context

// Helping delegate function example
function gui()
{
    ms_app.main.set_content('<br><br><br><center>HELLO WORLD!</center>');
    ms_app.main.set_status('APP ID: ' + ms_app.get_system_id());
}

ms_app.init('my_ms_test', true);                    // Resizable: true / Fixed: false
ms_app.main.set_title('GreyOS :: My Meta-Script App');
ms_app.settings.status_bar_marquee(false);
ms_app.settings.use_resize_tooltip(true);
ms_app.position.left(920);                          // Changes dynamically to help you use running apps
ms_app.position.top(170);                           // Changes dynamically to help you use running apps
ms_app.size.width(720);
ms_app.size.height(480);
ms_app.on('opened', function() { gui(); });         // On-opened: Start doing your stuff...
ms_app.on('close', function() { });                 // On-close: Do cleanups before termination
ms_app.run();                                       // Run your app
