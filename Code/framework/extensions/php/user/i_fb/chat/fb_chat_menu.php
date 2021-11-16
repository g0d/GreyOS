<?php

if (!defined('e107_INIT')) {
    exit;
}

if (!plugInstalled('fb_chat')) {
    exit;
}

require_once("classes/fb_chat_main.class.php");

// [PLUGINS]/fb_chat/languages/[LANGUAGE]/[LANGUAGE]_front.php
e107::lan('fb_chat', false, true);

class fb_chat_menu extends fb_chat_main {
    
    private $onlineList = array();
    protected $plugPrefs = array();
    
    /**
     * List online users after check current user permission.
     * 
     * @return
     */
    function __construct() {
        $this->plugPrefs = e107::getPlugConfig('fb_chat')->getPref();
        
        if (!$this->check_permission()) {
            return;
        }
        
        $this->onlineList = $this->get_online_users();
        $this->list_online_users();
    }
    
    /**
     * Render output HTML.
     */
    function list_online_users() {
        $template = e107::getTemplate('fb_chat');
        $sc = e107::getScBatch('fb_chat', TRUE);
        $tp = e107::getParser();
        
        $text = $tp->parseTemplate($template['MENU_START']);
        foreach ($this->onlineList as $val) {
            $sc->setVars($val);
            $text .= $tp->parseTemplate($template['MENU_ITEM'], TRUE, $sc);
        }
        $text .= $tp->parseTemplate($template['MENU_END']);

        $text = '<div class="fbcmw">' . $text . '</div>';
        
        e107::getRender()->tablerender(LANF_FB_CHAT_01, $text);
        unset($text);
    }
    
}

new fb_chat_menu();

?>