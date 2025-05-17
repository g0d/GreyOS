/*
    GreyOS - AGORA (Version: 1.0)

    File name: agora.ms
    Description: This file contains the AGORA - Marketplace meta-application.

    Coded in Meta-Script by George Delaportas (G0D/ViR4X)
    Copyright © 2024
    Open Software License (OSL 3.0)
*/

var ms = meta_script,
    ms_app = ms.app(),
    ms_utils = ms.os.utilities();

console.log(ms);
console.log(ms_app);
  
function gui()
{
    var ms_app_sys_id = ms_app.get_system_id(),
        ms_app_id = ms_app.get_app_id(),
        main_content = '',
        casement_content = '';

    /* ms_utils.graphics.apply_theme('graphics', 'agora'); - This will be applied by the Cloud Edit / Cloud IDE */

    //ms_app.settings.icon('agora_icon');
    ms_app.settings.casement_width(40, 'fixed');

    ms_app.main.set_content(main_content);
    ms_app.main.set_status('Loading...');

    ms_app.casement.set_title('Search for programs');
    ms_app.casement.set_content(casement_content);
    ms_app.casement.set_status('Ready');

    var all_api = ms.program.list_api(),
        public_api_call = null;

    if (all_api.length > 0)
    {
        console.log(all_api);
        //public_api_call = all_api[0].calls[0];

        //public_api_call('AGORA!');
    }

    function test_function(text)
    {
        ms_app.main.set_content('<br><br><br><center>' + text + '</center>');
    }

    ms.program.expose_api([test_function]);
}

ms_app.init('agora');
ms_app.main.set_title('AGORA :: Marketplace for Apps & Services');
ms_app.settings.single_instance(true);
ms_app.settings.resizable(true);
ms_app.can.edit_title(false);
ms_app.position.left(50);
ms_app.position.top(30);
ms_app.size.width(940);
ms_app.size.height(600);
ms_app.size.min.width(840);
ms_app.size.min.height(600);
ms_app.fx.fade.settings.into.set(0.07, 25, 100);
ms_app.fx.fade.settings.out.set(0.07, 25, 100);
ms_app.on('open', () => { ms_app.fx.fade.into(); });
ms_app.on('opened', () => { gui(); });
ms_app.on('dragging', () =>
                      {
                          ms_app.fx.opacity.settings.set(0.7);
                          ms_app.fx.opacity.apply();
                      });
ms_app.on('dragged', () => { ms_app.fx.opacity.reset(); });
ms_app.on('close', () => { ms_app.fx.fade.out(); });    /* ms_utils.graphics.clear_theme('test'); -  This will be applied by the Cloud Edit / Cloud IDE */
ms_app.run();
