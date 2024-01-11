
var ms_app = meta_script.app(); 
function gui()
{
 ms_app.main.set_content('<br><br><br><center>HELLO WORLD!</center>');
 ms_app.main.set_status('APP ID: ' + ms_app.get_system_id());
 var all_api = meta_script.program.list_api(), 
 public_api_call = null;
 if (all_api.length > 0) 
 {
 public_api_call = all_api[0].calls[0]; 
 public_api_call('Goodnight!'); 
 }
 function alter_content(text) 
 {
 ms_app.main.set_content('<br><br><br><center>' + text + '</center>');
 }
 meta_script.program.expose_api([alter_content]); 
}
ms_app.init('my_ms_test'); 
ms_app.main.set_title('My Meta-Script App'); 
ms_app.settings.resizable(true); 
ms_app.settings.status_bar_marquee(true); 
ms_app.settings.use_resize_tooltip(true); 
ms_app.position.left(920); 
ms_app.position.top(170); 
ms_app.size.width(720); 
ms_app.size.height(480); 
ms_app.on('opened', function() { gui(); }); 
ms_app.on('close', function() { }); 
ms_app.run(); 
