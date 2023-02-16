// GreyOS - My test app (Meta-Script app template for Cloud Edit)

var ms_app = meta_script.app();                     // Meta-Script API is automatically exposed in this context

// Helping delegate function example
function gui()
{
    ms_app.main.set_content('<br><br><br><center>HELLO WORLD!</center>');
    ms_app.main.set_status('APP ID: ' + ms_app.get_system_id());
}

ms_app.init('my_ms_test', true);                    // Resizable: true / Fixed: false
ms_app.main.set_title('My Meta-Script App');        // Set title
ms_app.settings.status_bar_marquee(true);           // Enable marquee in status bar
ms_app.settings.use_resize_tooltip(true);           // Use resize tooltip
ms_app.position.left(920);                          // Set initial left position
ms_app.position.top(170);                           // Set initial top position
ms_app.size.width(720);                             // Set initial width
ms_app.size.height(480);                            // Set initial height
ms_app.on('opened', function() { gui(); });         // On-opened: Start doing your stuff...
ms_app.on('close', function() { });                 // On-close: Do cleanups before termination
ms_app.run();                                       // Run your app
