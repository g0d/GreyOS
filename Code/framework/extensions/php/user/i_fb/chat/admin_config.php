<?php

require_once('../../class2.php');

if (!getperms('P')) {
    header('location:' . e_BASE . 'index.php');
    exit;
}

// [PLUGINS]/fb_chat/languages/[LANGUAGE]/[LANGUAGE]_admin.php
e107::lan('fb_chat', true, true);
// Include core lan file to get Date Formats
e107::includeLan(e_LANGUAGEDIR . e_LANGUAGE . '/admin/lan_prefs.php');

class fb_chat_admin extends e_admin_dispatcher {

    protected $modes = array(
        'main' => array(
            'controller' => 'fb_chat_admin_ui',
            'path' => null,
        ),
    );
    protected $adminMenu = array(
        'main/prefs' => array(
            'caption' => LANA_FB_CHAT_01,
            'perm' => 'P',
        ),
    );
    protected $menuTitle = LAN_PLUGIN__FB_CHAT_NAME;

}

class fb_chat_admin_ui extends e_admin_ui {

    protected $pluginTitle = LAN_PLUGIN__FB_CHAT_NAME;
    protected $pluginName = "fb_chat";
    protected $preftabs = array(
        LANA_FB_CHAT_19,
        LANA_FB_CHAT_20,
        LANA_FB_CHAT_21
    );
    protected $prefs = array(
        'fb_chat_class' => array(
            'title' => LANA_FB_CHAT_04,
            'type' => 'userclass',
            'data' => 'int',
            'writeParms' => 'classlist=nobody,member,admin',
            'tab' => 0,
        ),
        'fb_chat_nopic' => array(
            'title' => LANA_FB_CHAT_16,
            'type' => 'image',
            'data' => 'str',
            'tab' => 1,
        ),
        'fb_chat_menu_pic_w' => array(
            'title' => LANA_FB_CHAT_05,
            'type' => 'number',
            'data' => 'int',
            'readParms' => array(
                'post' => ' px',
            ),
            'writeParms' => array(
                'post' => ' px',
            ),
            'tab' => 1,
        ),
        'fb_chat_menu_pic_h' => array(
            'title' => LANA_FB_CHAT_06,
            'type' => 'number',
            'data' => 'int',
            'readParms' => array(
                'post' => ' px',
            ),
            'writeParms' => array(
                'post' => ' px',
            ),
            'tab' => 1,
        ),
        'fb_chat_launch' => array(
            'title' => LANA_FB_CHAT_09,
            'type' => 'text',
            'data' => 'str',
            'tab' => 0,
        ),
        'fb_chat_hb_min' => array(
            'title' => LANA_FB_CHAT_10,
            'type' => 'number',
            'data' => 'int',
            'readParms' => array(
                'post' => LANA_FB_CHAT_12,
            ),
            'writeParms' => array(
                'post' => LANA_FB_CHAT_12,
            ),
            'tab' => 0,
        ),
        'fb_chat_hb_max' => array(
            'title' => LANA_FB_CHAT_11,
            'type' => 'number',
            'data' => 'int',
            'readParms' => array(
                'post' => LANA_FB_CHAT_12,
            ),
            'writeParms' => array(
                'post' => LANA_FB_CHAT_12,
            ),
            'tab' => 0,
        ),
        'fb_chat_hb_menu' => array(
            'title' => LANA_FB_CHAT_26,
            'type' => 'number',
            'data' => 'int',
            'readParms' => array(
                'post' => LANA_FB_CHAT_12,
            ),
            'writeParms' => array(
                'post' => LANA_FB_CHAT_12,
            ),
            'tab' => 0,
        ),
        'fb_chat_title' => array(
            'title' => LANA_FB_CHAT_13,
            'type' => 'dropdown',
            'data' => 'int',
            'writeParms' => array(
                0 => LANA_FB_CHAT_14,
                1 => LANA_FB_CHAT_15,
            ),
            'tab' => 2,
        ),
        'fb_chat_title_link' => array(
            'title' => LANA_FB_CHAT_17,
            'type' => 'boolean',
            'writeParms' => 'label=yesno',
            'data' => 'int',
            'tab' => 2,
        ),
        'fb_chat_emote' => array(
            'title' => LANA_FB_CHAT_18,
            'type' => 'boolean',
            'writeParms' => 'label=yesno',
            'data' => 'int',
            'tab' => 2,
        ),
        'fb_chat_clickable_links' => array(
            'title' => LANA_FB_CHAT_23,
            'type' => 'boolean',
            'writeParms' => 'label=yesno',
            'data' => 'int',
            'tab' => 2,
        ),
        'fb_chat_embed_videos' => array(
            'title' => LANA_FB_CHAT_24,
            'type' => 'boolean',
            'writeParms' => 'label=yesno',
            'data' => 'int',
            'tab' => 2,
        ),
        'fb_chat_date_format' => array(
            'title' => LANA_FB_CHAT_22,
            'type' => 'dropdown',
            'data' => 'str',
            'writeParms' => array(
                'short' => PRFLAN_22,
                'long' => PRFLAN_23,
                'forum' => PRFLAN_24,
            ),
            'tab' => 2,
        ),
        'fb_chat_fm' => array(
            'title' => LANA_FB_CHAT_25,
            'type' => 'boolean',
            'writeParms' => 'label=yesno',
            'data' => 'int',
            'tab' => 2,
        ),
    );

}

new fb_chat_admin();

require_once(e_ADMIN . "auth.php");
e107::getAdminUI()->runPage();
require_once(e_ADMIN . "footer.php");
exit;
?>