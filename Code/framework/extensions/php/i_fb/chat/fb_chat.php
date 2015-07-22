<?php

require_once("../../class2.php");
if (!plugInstalled('fb_chat')) {
    exit;
}

require_once("classes/fb_chat_main.class.php");

// [PLUGINS]/fb_chat/languages/[LANGUAGE]/[LANGUAGE]_front.php
e107::lan('fb_chat', false, true);

//start session if required
if (!session_id()) {
    session_start();
}

/**
 * fb_chat class
 *
 * Handling Ajax Requests arrive from Frontend
 */
class fb_chat extends fb_chat_main {

    protected $plugPrefs = array();

    public function __construct() {
        $this->plugPrefs = e107::getPlugConfig('fb_chat')->getPref();

        if (!$this->check_permission()) {
            exit;
        }

        if (!isset($_SESSION['chatHistory'])) {
            $_SESSION['chatHistory'] = array();
        }

        if (!isset($_SESSION['openChatBoxes'])) {
            $_SESSION['openChatBoxes'] = array();
        }

        /**
         * 1 - startchatsession
         * 2 - chatheartbeat
         * 3 - closechat
         * 4 - sendchat
         * 5 - get username
         * 6 - get (normal) menu content
         * 7 - get (floating) menu content
         * 8 - Turn chat on
         * 9 - Turn chat off
         */
        $action = (int) $_GET['a'];

        switch ($action) {
            case 1:
                $this->chat_start_session();
                break;
            case 2:
                $this->chat_heartbeat();
                break;
            case 3:
                $this->chat_close();
                break;
            case 4:
                $this->chat_send((int) $_POST['to'], $_POST['message']);
                break;
            case 5:
                $this->get_user_name((int) $_POST['tid']);
                break;
            case 6:
                $this->get_online_list(0);
                break;
            case 7:
                $this->get_online_list(1);
                break;
            case 8:
                $this->turn_chat_on();
                break;
            case 9:
                $this->turn_chat_off();
                break;
            default:
                exit;
        }
    }

    /**
     * Start Chat Session
     * - Get opened chat windows from session and push them as json output
     *   with the current user details.
     *
     * @param string $items
     */
    public function chat_start_session($items = "") {
        if (!empty($_SESSION['openChatBoxes'])) {
            foreach ($_SESSION['openChatBoxes'] as $chatbox => $void) {
                $items .= $this->chat_box_session($chatbox);
            }
        }

        if (!empty($items)) {
            $items = substr($items, 0, -1);
        }

        $row = get_user_data(USERID);
        $name = $this->get_user_name_by_names($row['user_name'], $row['user_login']);

        header('Content-type: application/json');
        echo '{ "user": { "id": "' . USERID . '", "name": "' . $name . '" }, "items": [' . $items . '] }';
        exit;
    }

    /**
     * Chat Heartbeat
     * - Get unread messages from DB and append them to the output string
     *   and to session history
     * - Create last message item (after a specified inactivity) and append
     *   it to the output string and to session history
     * - Update messages in DB
     * - Push output string as json
     *
     * @param string $items
     */
    public function chat_heartbeat($items = "") {
        $rows = $this->get_new_messages(USERID);
        foreach ($rows as $row) {
            $fid = $row['fb_chat_from'];
            $fnm = $this->get_user_name_by_names($row['user_name'], $row['user_login']);
            $msg = $this->handle_output($row['fb_chat_msg']);
            $snt = $row['fb_chat_sent'];

            if (!isset($_SESSION['openChatBoxes'][$fid]) && isset($_SESSION['chatHistory'][$fid])) {
                $items = $_SESSION['chatHistory'][$fid];
            }

            $items .= '{ "s": "0", "f": { "id": "' . $fid . '", "name": "' . $fnm . '" }, "m": "' . $msg . '" },';

            if (!isset($_SESSION['chatHistory'][$fid])) {
                $_SESSION['chatHistory'][$fid] = '';
            }

            $_SESSION['chatHistory'][$fid] .= '{ "s": "0", "f": { "id": "' . $fid . '", "name": "' . $fnm . '" }, "m": "' . $msg . '" },';

            unset($_SESSION['tsChatBoxes'][$fid]);
            $_SESSION['openChatBoxes'][$fid] = $snt;
        }

        // Last message...
        if (!empty($_SESSION['openChatBoxes'])) {
            foreach ($_SESSION['openChatBoxes'] as $chatbox => $time) {
                if (!isset($_SESSION['tsChatBoxes'][$chatbox])) {
                    $now = time() - $time;

                    $gen = e107::getDate();
                    $df = vartrue($this->plugPrefs['fb_chat_date_format'], "short");
                    $time_s = $gen->convert_date($time, $df);

                    $message = LANF_FB_CHAT_03 . " " . $time_s;
                    if ($now > 180) {
                        $items .= '{ "s": "2", "f": { "id": "' . $chatbox . '" }, "m": "' . $message . '" },';

                        if (!isset($_SESSION['chatHistory'][$chatbox])) {
                            $_SESSION['chatHistory'][$chatbox] = '';
                        }

                        $_SESSION['chatHistory'][$chatbox] .= '{ "s": "2", "f": { "id": "' . $chatbox . '" }, "m": "' . $message . '" },';
                        $_SESSION['tsChatBoxes'][$chatbox] = 1;
                    }
                }
            }
        }

        e107::getDb()->update("fb_chat", "fb_chat_rcd = 1 WHERE fb_chat_to = " . USERID . " AND fb_chat_rcd = 0 ");

        if (!empty($items)) {
            $items = substr($items, 0, -1);
        }

        header('Content-type: application/json');
        echo '{"items": [' . $items . ']}';
        exit;
    }

    /**
     * Send chat message to a user
     * - Parse the message with toDB method
     * - Insert the message into DB
     * - Create output HTML from parsed message
     * - Append message details to session and push output as json
     *
     * @param int $to
     *  User ID addressed to.
     * @param string $msg
     *  The message that will be sent.
     * @param int $from (optional)
     *  User ID of the sender
     */
    public function chat_send($to = 0, $msg = "", $from = USERID) {
        if ((int) $to === 0 || (int) $from === 0) {
            exit;
        }

        // Parse input string
        $msg = e107::getParser()->toDB($msg);

        // Insert parsed message into DB.
        $arg = array(
            "fb_chat_from" => (int) $from,
            "fb_chat_to" => $to,
            "fb_chat_msg" => $msg,
            "fb_chat_sent" => time(),
        );
        e107::getDb()->insert('fb_chat', $arg);

        // Create output HTML message
        $message = $this->handle_output($msg);

        // Get display name of the sender
        $row = get_user_data((int) $from);
        $name = $this->get_user_name_by_names($row['user_name'], $row['user_login']);

        $_SESSION['openChatBoxes'][$to] = time();
        if (!isset($_SESSION['chatHistory'][$to])) {
            $_SESSION['chatHistory'][$to] = '';
        }

        $_SESSION['chatHistory'][$to] .= '{ "s": "1", "f": { "id": "' . $to . '", "name": "' . $name . '" } , "m": "' . $message . '" },';
        unset($_SESSION['tsChatBoxes'][$to]);

        header('Content-type: application/json');
        echo '{ "f": "' . $name . '", "m": "' . $message . '" }';
        exit;
    }

    /**
     * Close chat session
     */
    public function chat_close() {
        unset($_SESSION['openChatBoxes'][$_POST['chatbox']]);
        echo "1";
        exit;
    }

    /**
     * Get chat history from session
     *
     * @param int $chatbox
     *  Chat partner (User ID) of the current user.
     * @param string $items
     *  Chat history, json formatted string
     * @return string $items
     *  Chat history, json formatted string
     */
    public function chat_box_session($chatbox, $items = "") {
        if (isset($_SESSION['chatHistory'][$chatbox])) {
            $items = $_SESSION['chatHistory'][$chatbox];
        }
        return $items;
    }

    /**
     * Get the user display name (user_name or user_login)
     *
     * @param int $uid
     *  User ID
     */
    public function get_user_name($uid = 0) {
        if ((int) $uid === 0) {
            exit;
        }

        $link = vartrue($this->plugPrefs['fb_chat_title_link'], 1);
        $row = get_user_data(intval($uid));
        $name = $this->get_user_name_by_names($row['user_name'], $row['user_login']);

        if ((boolean) $link) {
            $name = "<a href='" . SITEURL . "user.php?id." . (int) $uid . "' target='_self'>" . $name . "</a>";
        }

        header('Content-type: application/json');
        echo '{"name": "' . $name . '"}';
        exit;
    }

    /**
     * Get a HTML list with online users
     * - Get online user from DB
     * - Create HTML list
     * - Push output HTML
     */
    public function get_online_list($mode = 0) {
        $template = e107::getTemplate('fb_chat');
        $sc = e107::getScBatch('fb_chat', TRUE);
        $tp = e107::getParser();

        $users = $this->get_online_users();
        $menu = "";

        if (!empty($users)) {
            if ((int) $mode === 0) {
                $menu .= $tp->parseTemplate($template['MENU_START']);
                foreach ($users as $user) {
                    $sc->setVars($user);
                    $menu .= $tp->parseTemplate($template['MENU_ITEM'], TRUE, $sc);
                }
                $menu .= $tp->parseTemplate($template['MENU_END']);
            }

            if ((int) $mode === 1) {
                $menu .= $tp->parseTemplate($template['FLOAT_MENU_START']);
                foreach ($users as $user) {
                    $sc->setVars($user);
                    $menu .= $tp->parseTemplate($template['FLOAT_MENU_ITEM'], TRUE, $sc);
                }
                $menu .= $tp->parseTemplate($template['FLOAT_MENU_END']);
            }
        }

        header('Content-Type: text/html; charset=utf-8');
        echo $menu;
        exit;
    }

    /**
     * Turn on chat by current user.
     * Delete record from "turned off" table.
     */
    public function turn_chat_on() {
        e107::getDb()->delete("fb_chat_turnedoff", "fb_chat_turnedoff_uid = " . USERID);
    }

    /**
     * Turn off chat by crrent user.
     * Insert row into "turned off" table.
     */
    public function turn_chat_off() {
        $arg = array("fb_chat_turnedoff_uid" => USERID);
        e107::getDb()->insert('fb_chat_turnedoff', $arg);
    }

}

new fb_chat;
?>