<?php

    /*

        GreyOS Inc. - spl@sh

        Version: 3.2

        File name: check.php
        Description: This file contains the CHECK class.

        Coded by George Delaportas (G0D)

        GreyOS Inc.
        Copyright © 2013

    */



    /* ------------------------ BEGIN ------------------------ */

    // Include OPTION class
    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/splash/utilities/control/option.php'));

    // Class: [CHECK]
    class CHECK extends OPTION
    {

        // Attributes
        private $__attr_value = null;
        private $__attr_checked = false;

        public function Show($attributes, $events = null)
        {

            if (!HELPERS::Valid_Parameters($attributes, $events))
            {

                HELPERS::Error('Check', 2);

                return false;

            }

            if (!HELPERS::Parameters_Contain($attributes, 'name') || !HELPERS::Parameters_Contain($attributes, 'value'))
            {

                HELPERS::Error('Check', 19);

                return false;

            }

            if (empty($attributes['name']) || empty($attributes['value']))
            {

                HELPERS::Error('Check', 20);

                return false;

            }

            $html_tag = '<input type="checkbox" name="' . $attributes['name'] . '" value="' . $attributes['value'] . '" ';

            $this->__attr_name = $attributes['name'];
            $this->__attr_value = $attributes['value'];

            foreach ($attributes as $key => $value)
            {

                if (HELPERS::Is_Empty($value))
                {

                    HELPERS::Error('Check', 5);

                    return false;

                }

                if ($key == 'id')
                {

                    $html_tag .= 'id="' . $value . '" ';

                    $this->__attr_id = $value;

                }

                else if ($key == 'class')
                {

                    $html_tag .= 'class="' . $value . '" ';

                    $this->__attr_class = $value;

                }

                else if ($key == 'style')
                {

                    $html_tag .= 'style="' . $value. '" ';

                    $this->__attr_style = $value;

                }

                else if ($key == 'title')
                {

                    $html_tag .= 'title="' . $value . '" ';

                    $this->__attr_title = $value;

                }

                else if ($key == 'lang')
                {

                    $html_tag .= 'lang="' . $value . '" ';

                    $this->__attr_lang = $value;

                }

                else if ($key == 'accesskey')
                {

                    $html_tag .= 'accesskey="' . $value . '" ';

                    $this->__attr_accesskey = $value;

                }

                else if ($key == 'tabindex')
                {

                    $html_tag .= 'tabindex="' . $value . '" ';

                    $this->__attr_tabindex = $value;

                }

                else if (strpos($key, 'data-') === 0)
                {

                    $html_tag .= $key . '="' . $value . '" ';

                    array_push($this->__attr_data, $value);

                }

                else if ($key == 'form')
                {

                    $html_tag .= 'form="' . $value . '" ';

                    $this->__attr_form = $value;

                }

                else if ($key == 'autofocus' && HELPERS::Is_True($value))
                {

                    $html_tag .= 'autofocus ';

                    $this->__attr_autofocus = true;

                }

                else if ($key == 'required' && HELPERS::Is_True($value))
                {

                    $html_tag .= 'required ';

                    $this->__attr_required = true;

                }

                else if ($key == 'checked' && HELPERS::Is_True($value))
                {

                    $html_tag .= 'checked ';

                    $this->__attr_checked = true;

                }

                else if ($key == 'disabled' && HELPERS::Is_True($value))
                {

                    $html_tag .= 'disabled ';

                    $this->__attr_disabled = true;

                }

                else
                {

                    if ($key != 'name' && $key != 'value')
                    {

                        HELPERS::Error('Check', 6);

                        return false;

                    }

                }

            }

            if (!empty($events))
            {

                foreach ($events as $key => $value)
                {

                    if (HELPERS::Is_Empty($value))
                    {

                        HELPERS::Error('Check', 7);

                        return false;

                    }

                    if ($key == 'onserverclick' || $key == 'onajaxserverclick' || $key == 'onclick')
                    {

                        if ($key == 'onserverclick')
                        {

                            if (empty($value[0]))
                                return false;

                            $html_tag .= 'onclick="splash(' . '\'' . $value[0] . '\'' . ', ' . '\'' . 
                                         'framework/extensions/php/splash/events/events.php' . 
                                         '\'' . ', 1, ';

                            if (empty($value[1]))
                                $html_tag .= 'null' . ');" ';

                            else
                               $html_tag .= '\'' . $value[1] . '\'' . ');" ';

                            $this->__event_server_mouse = $value;

                        }

                        else if ($key == 'onajaxserverclick')
                        {

                            if (empty($value[0]))
                                return false;

                            $html_tag .= 'onclick="splash(' . '\'' . $value[0] . '\'' . ', ' . '\'' . 
                                         'framework/extensions/php/splash/events/events.php' . 
                                         '\'' . ', 2, ';

                            if (empty($value[1]))
                                $html_tag .= 'null' . ');" ';

                            else
                               $html_tag .= '\'' . $value[1] . '\'' . ');" ';

                            $this->__event_ajax_server_mouse = $value;

                        }

                        else
                        {

                            $html_tag .= 'onclick="' . $value . '" ';

                            $this->__event_click = $value;

                        }

                    }

                    else if ($key == 'ondblclick')
                    {

                        $html_tag .= 'ondblclick="' . $value . '" ';

                        $this->__event_dblclick = $value;

                    }

                    else if ($key == 'onmousedown')
                    {

                        $html_tag .= 'onmousedown="' . $value . '" ';

                        $this->__event_mousedown = $value;

                    }

                    else if ($key == 'onmousemove')
                    {

                        $html_tag .= 'onmousemove="' . $value . '" ';

                        $this->__event_mousemove = $value;

                    }

                    else if ($key == 'onmouseout')
                    {

                        $html_tag .= 'onmouseout="' . $value . '" ';

                        $this->__event_mouseout = $value;

                    }

                    else if ($key == 'onmouseover')
                    {

                        $html_tag .= 'onmouseover="' . $value . '" ';

                        $this->__event_mouseover = $value;

                    }

                    else if ($key == 'onmouseup')
                    {

                        $html_tag .= 'onmouseup="' . $value . '" ';

                        $this->__event_mouseup = $value;

                    }

                    else if ($key == 'onfocus')
                    {

                        $html_tag .= 'onfocus="' . $value . '" ';

                        $this->__event_focus = $value;

                    }

                    else if ($key == 'onblur')
                    {

                        $html_tag .= 'onblur="' . $value . '" ';

                        $this->__event_blur = $value;

                    }

                    else if ($key == 'onchange')
                    {

                        $html_tag .= 'onchange="' . $value . '" ';

                        $this->__event_change = $value;

                    }

                    else if ($key == 'onserverkeydown' || $key == 'onajaxserverkeydown' || $key == 'onkeydown')
                    {

                        if ($key == 'onserverkeydown')
                        {
                        
                            if (empty($value[0]))
                                return false;

                            $html_tag .= 'onkeydown="splash(' . '\'' . $value[0] . '\'' . ', ' . '\'' . 
                                         'framework/extensions/php/splash/events/events.php' . 
                                         '\'' . ', 1, ';

                            if (empty($value[1]))
                                $html_tag .= 'null' . ');" ';

                            else
                               $html_tag .= '\'' . $value[1] . '\'' . ');" ';

                            $this->__event_server_key = $value;

                        }

                        else if ($key == 'onajaxserverkeydown')
                        {

                            if (empty($value[0]))
                                return false;

                            $html_tag .= 'onkeydown="splash(' . '\'' . $value[0] . '\'' . ', ' . '\'' . 
                                         'framework/extensions/php/splash/events/events.php' . 
                                         '\'' . ', 2, ';

                            if (empty($value[1]))
                                $html_tag .= 'null' . ');" ';

                            else
                               $html_tag .= '\'' . $value[1] . '\'' . ');" ';

                            $this->__event_ajax_server_key = $value;

                        }

                        else
                        {

                            $html_tag .= 'onkeydown="' . $value . '" ';

                            $this->__event_keydown = $value;

                        }

                    }

                    else if ($key == 'onkeypress')
                    {

                        $html_tag .= 'onkeypress="' . $value . '" ';

                        $this->__event_keypress = $value;

                    }

                    else if ($key == 'onkeyup')
                    {

                        $html_tag .= 'onkeyup="' . $value . '" ';

                        $this->__event_keyup = $value;

                    }

                    else
                    {

                        HELPERS::Error('Check', 8);

                        return false;

                    }

                }

            }

            $html_tag .= '>';

            return $html_tag;

        }

        public function Fetch($attributes = null, $events = null)
        {

            if (!empty($attributes))
            {

                if (!HELPERS::Valid_Parameters($attributes, $events))
                {

                    HELPERS::Error('Check', 9);

                    return false;

                }

            }

            $attributes_array = array();
            $events_array = array();
            $final_array = array();

            if (HELPERS::Is_Valid_Array($attributes))
            {

                foreach ($attributes as $item)
                {

                    if ($item == 'id')
                        array_push($attributes_array, $this->__attr_id);

                    else if ($item == 'class')
                        array_push($attributes_array, $this->__attr_class);

                    else if ($item == 'style')
                        array_push($attributes_array, $this->__attr_style);

                    else if ($item == 'title')
                        array_push($attributes_array, $this->__attr_title);

                    else if ($item == 'lang')
                        array_push($attributes_array, $this->__attr_lang);

                    else if ($item == 'accesskey')
                        array_push($attributes_array, $this->__attr_accesskey);

                    else if ($item == 'tabindex')
                        array_push($attributes_array, $this->__attr_tabindex);

                    else if ($item == 'data')
                        array_push($attributes_array, $this->__attr_data);

                    else if ($item == 'type')
                        array_push($attributes_array, $this->__attr_type);

                    else if ($item == 'name')
                        array_push($attributes_array, $this->__attr_name);

                    else if ($item == 'form')
                        array_push($attributes_array, $this->__attr_form);

                    else if ($item == 'value')
                        array_push($attributes_array, $this->__attr_value);

                    else if ($item == 'autofocus')
                        array_push($attributes_array, $this->__attr_autofocus);

                    else if ($item == 'required')
                        array_push($attributes_array, $this->__attr_required);

                    else if ($item == 'checked')
                        array_push($attributes_array, $this->__attr_checked);

                    else if ($item == 'disabled')
                        array_push($attributes_array, $this->__attr_disabled);

                    else
                    {

                        HELPERS::Error('Check', 10);

                        return false;

                    }

                }

            }

            if (HELPERS::Is_Valid_Array($events))
            {

                foreach ($events as $item)
                {

                    if ($item == 'onserverclick')
                        array_push($events_array, $this->__event_server_mouse);

                    else if ($item == 'onajaxserverclick')
                        array_push($events_array, $this->__event_ajax_server_mouse);

                    else if ($item == 'onclick')
                        array_push($events_array, $this->__event_click);

                    else if ($item == 'ondblclick')
                        array_push($events_array, $this->__event_dblclick);

                    else if ($item == 'onmousedown')
                        array_push($events_array, $this->__event_mousedown);

                    else if ($item == 'onmousemove')
                        array_push($events_array, $this->__event_mousemove);

                    else if ($item == 'onmouseout')
                        array_push($events_array, $this->__event_mouseout);

                    else if ($item == 'onmouseover')
                        array_push($events_array, $this->__event_mouseover);

                    else if ($item == 'onmouseup')
                        array_push($events_array, $this->__event_mouseup);

                    else if ($item == 'onfocus')
                        array_push($events_array, $this->__event_focus);

                    else if ($item == 'onblur')
                        array_push($events_array, $this->__event_blur);

                    else if ($item == 'onchange')
                        array_push($events_array, $this->__event_change);

                    else if ($item == 'onserverkeydown')
                        array_push($events_array, $this->__event_server_key);

                    else if ($item == 'onajaxserverkeydown')
                        array_push($events_array, $this->__event_ajax_server_key);

                    else if ($item == 'onkeydown')
                        array_push($events_array, $this->__event_keydown);

                    else if ($item == 'onkeypress')
                        array_push($events_array, $this->__event_keypress);

                    else if ($item == 'onkeyup')
                        array_push($events_array, $this->__event_keyup);

                    else
                    {

                        HELPERS::Error('Check', 11);

                        return false;

                    }

                }

            }

            $merged_array = array_merge($attributes_array, $events_array);

            $final_array = HELPERS::Filter_Null_Values($merged_array);

            return $final_array;

        }

    }

    /* ------------------------- END ------------------------- */

?>
