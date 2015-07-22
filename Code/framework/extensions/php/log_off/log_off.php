<?php

    /*
    
        GreyOS Inc. - Log off
        
        Version: 2.2
        
        File name: log_off.php
        Description: This file contains the Log off extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    if (empty($_SESSION['TALOS']) || !is_array($_SESSION['TALOS']))
        return false;

    $this_lang = ALPHA_CMS::Get_Language();

    echo '<form method="post" action="">
          <input id="log_off_talos_id" type="hidden" value="' . $_SESSION['TALOS']['id'] . '">
          <div id="log_off">
              <div id="log_off_icon"></div>
              <div id="log_off_text">Log off</div>
          </div>
          </form>
          <script type="text/javascript" src="/framework/extensions/php/log_off/log_off_ctrl.js"></script>';

    return true;

?>
