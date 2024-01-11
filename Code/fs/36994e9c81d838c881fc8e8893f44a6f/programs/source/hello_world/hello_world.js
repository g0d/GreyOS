// GreyOS - My test app (Meta-Script app template for Cloud Edit)

var ms_app = meta_script.app();                         // Meta-Script API is exposed in this context by design

// Helping delegate function example
function gui()
{
    ms_app.main.set_content('<br><br><br><center>HELLO WORLD!</center>');
    ms_app.main.set_status('APP ID: ' + ms_app.get_system_id());

    /* OPTION 1 APP :: Use the code below to build an app that calls a 3rd app API and does something on it... */
    var all_api = meta_script.program.list_api(),       // List all public API calls from running programs
        public_api_call = null;

    if (all_api.length > 0)                             // Check for available programs with public API
    {
        public_api_call = all_api[0].calls[0];          // Select the first available

        public_api_call('Goodnight!');                  // Call the public API
    }
    /* -------------------------------------------------------------------------------------------------------- */

    /* OPTION 2 APP :: Use the code below to build an app with a public API call so a 3rd app does something... */
    function alter_content(text)                        // Alter the content of the main window
    {
        ms_app.main.set_content('<br><br><br><center>' + text + '</center>');
    }

    meta_script.program.expose_api([alter_content]);    // Expose the above function as a public API call
    /* -------------------------------------------------------------------------------------------------------- */
}

ms_app.init('my_ms_test');                              // Initialize app with a name
ms_app.main.set_title('My Meta-Script App');            // Set title
ms_app.settings.resizable(true);                        // Make the app resizable
ms_app.settings.status_bar_marquee(true);               // Enable marquee in status bar
ms_app.settings.use_resize_tooltip(true);               // Use resize tooltip
ms_app.position.left(920);                              // Set initial left position
ms_app.position.top(170);                               // Set initial top position
ms_app.size.width(720);                                 // Set initial width
ms_app.size.height(480);                                // Set initial height
ms_app.on('opened', function() { gui(); });             // On-opened: Start doing your stuff...
ms_app.on('close', function() { });                     // On-close: Do cleanups before termination
ms_app.run();                                           // Run your app
