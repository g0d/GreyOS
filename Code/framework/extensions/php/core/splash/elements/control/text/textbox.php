<?php
    /*
        spl@sh (Class)

        File name: textbox.php (Version: 4.6)
        Description: This file contains the "TEXTBOX" class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    // Include TEXT class
    require_once(UTIL::Absolute_Path('framework/extensions/php/user/splash/utilities/control/text.php'));

    // Class: [TEXTBOX]
    class TEXTBOX extends TEXT
    {
        // Attributes
        private $__attr_name = null;
        private $__attr_cols = null;
        private $__attr_rows = null;
        private $__attr_maxlength = null;
        private $__attr_placeholder = null;
        private $__attr_spellcheck = false;
        private $__attr_readonly = false;
        private $__attr_disabled = false;

        // Events
        private $__event_change = null;
        private $__event_select = null;

        // Content
        private $__content = null;

        public function Show($content, $attributes, $events = null)
        {
            if (!HELPERS::Valid_Parameters($attributes, $events))
            {
                HELPERS::Error('Textbox', 2);

                return false;
            }

            $html_tag = '<textarea ';

            foreach ($attributes as $key => $value)
            {
                if (HELPERS::Is_Empty($value))
                {
                    HELPERS::Error('Textbox', 5);

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
                else if ($key == 'name')
                {
                    $html_tag .= 'name="' . $value . '" ';
                    $this->__attr_name = $value;
                }
                else if ($key == 'cols' && HELPERS::Is_Positive_Integer($value))
                {
                    $html_tag .= 'cols="' . $value . '" ';
                    $this->__attr_cols = $value;
                }
                else if ($key == 'rows' && HELPERS::Is_Positive_Integer($value))
                {
                    $html_tag .= 'rows="' . $value . '" ';
                    $this->__attr_rows = $value;
                }
                else if ($key == 'maxlength' && HELPERS::Is_Positive_Integer($value))
                {
                    $html_tag .= 'maxlength="' . $value . '" ';
                    $this->__attr_maxlength = $value;
                }
                else if ($key == 'placeholder')
                {
                    $html_tag .= 'placeholder="' . $value . '" ';
                    $this->__attr_placeholder = $value;
                }
                else if ($key == 'spellcheck' && HELPERS::Is_True($value))
                {
                    $html_tag .= 'spellcheck="true"';
                    $this->__attr_spellcheck = true;
                }
                else if ($key == 'readonly' && HELPERS::Is_True($value))
                {
                    $html_tag .= 'readonly ';
                    $this->__attr_readonly = true;
                }
                else if ($key == 'disabled' && HELPERS::Is_True($value))
                {
                    $html_tag .= 'disabled ';
                    $this->__attr_disabled = true;
                }
                else
                {
                    HELPERS::Error('Textbox', 6);

                    return false;
                }
            }

            if (!empty($events))
            {
                foreach ($events as $key => $value)
                {
                    if (HELPERS::Is_Empty($value))
                    {
                        HELPERS::Error('Textbox', 7);

                        return false;
                    }

                    if ($key == 'onserverclick' || $key == 'onajaxserverclick' || $key == 'onclick')
                    {
                        if ($key == 'onserverclick')
                        {
                            if (empty($value[0]))
                                return false;

                            $html_tag .= 'onclick="splash(' . '\'' . $value[0] . '\'' . ', 1, ';

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

                            $html_tag .= 'onclick="splash(' . '\'' . $value[0] . '\'' . ', 2, ';

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
                    else if ($key == 'onselect')
                    {
                        $html_tag .= 'onselect="' . $value . '" ';
                        $this->__event_select = $value;
                    }
                    else if ($key == 'onserverkeydown' || $key == 'onajaxserverkeydown' || $key == 'onkeydown')
                    {
                        if ($key == 'onserverkeydown')
                        {
                            if (empty($value[0]))
                                return false;

                            $html_tag .= 'onkeydown="splash(' . '\'' . $value[0] . '\'' . ', 1, ';

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

                            $html_tag .= 'onkeydown="splash(' . '\'' . $value[0] . '\'' . ', 2, ';

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
                        HELPERS::Error('Textbox', 8);

                        return false;
                    }
                }
            }

            $html_tag .= '>' . $content . '</textarea>';
            $this->__content = $content;

            return $html_tag;
        }

        public function Debug($content, $attributes = null, $events = null)
        {
            if (!is_bool($content))
            {
                HELPERS::Error('Textbox', 14);

                return false;
            }

            if (!empty($attributes))
            {
                if (!HELPERS::Valid_Parameters($attributes, $events))
                {
                    HELPERS::Error('Textbox', 9);

                    return false;
                }
            }

            $attributes_array = array();
            $events_array = array();
            $final_array = array();

            if (HELPERS::Is_Valid_Array($attributes))
            {
                foreach ($attributes as $key => $value)
                {
                    if ($key == 'id')
                        array_push($attributes_array, $this->__attr_id);
                    else if ($key == 'class')
                        array_push($attributes_array, $this->__attr_class);
                    else if ($key == 'style')
                        array_push($attributes_array, $this->__attr_style);
                    else if ($key == 'title')
                        array_push($attributes_array, $this->__attr_title);
                    else if ($key == 'lang')
                        array_push($attributes_array, $this->__attr_lang);
                    else if ($key == 'accesskey')
                        array_push($attributes_array, $this->__attr_accesskey);
                    else if ($key == 'tabindex')
                        array_push($attributes_array, $this->__attr_tabindex);
                    else if ($key == 'data')
                        array_push($attributes_array, $this->__attr_data);
                    else if ($key == 'form')
                        array_push($attributes_array, $this->__attr_form);
                    else if ($key == 'name')
                        array_push($attributes_array, $this->__attr_name);
                    else if ($key == 'cols')
                        array_push($attributes_array, $this->__attr_cols);
                    else if ($key == 'rows')
                        array_push($attributes_array, $this->__attr_rows);
                    else if ($key == 'maxlength')
                        array_push($attributes_array, $this->__attr_maxlength);
                    else if ($key == 'placeholder')
                        array_push($attributes_array, $this->__attr_placeholder);
                    else if ($key == 'spellcheck')
                        array_push($attributes_array, $this->__attr_spellcheck);
                    else if ($key == 'readonly')
                        array_push($attributes_array, $this->__attr_readonly);
                    else if ($key == 'disabled')
                        array_push($attributes_array, $this->__attr_disabled);
                    else
                    {
                        HELPERS::Error('Textbox', 10);

                        return false;
                    }
                }
            }

            if (HELPERS::Is_Valid_Array($events))
            {
                foreach ($events as $key => $value)
                {
                    if ($key == 'onserverclick')
                        array_push($events_array, $this->__event_server_mouse);
                    else if ($key == 'onajaxserverclick')
                        array_push($events_array, $this->__event_ajax_server_mouse);
                    else if ($key == 'onclick')
                        array_push($events_array, $this->__event_click);
                    else if ($key == 'ondblclick')
                        array_push($events_array, $this->__event_dblclick);
                    else if ($key == 'onmousedown')
                        array_push($events_array, $this->__event_mousedown);
                    else if ($key == 'onmousemove')
                        array_push($events_array, $this->__event_mousemove);
                    else if ($key == 'onmouseout')
                        array_push($events_array, $this->__event_mouseout);
                    else if ($key == 'onmouseover')
                        array_push($events_array, $this->__event_mouseover);
                    else if ($key == 'onmouseup')
                        array_push($events_array, $this->__event_mouseup);
                    else if ($key == 'onfocus')
                        array_push($events_array, $this->__event_focus);
                    else if ($key == 'onblur')
                        array_push($events_array, $this->__event_blur);
                    else if ($key == 'onchange')
                        array_push($events_array, $this->__event_change);
                    else if ($key == 'onselect')
                        array_push($events_array, $this->__event_select);
                    else if ($key == 'onserverkeydown')
                        array_push($events_array, $this->__event_server_key);
                    else if ($key == 'onajaxserverkeydown')
                        array_push($events_array, $this->__event_ajax_server_key);
                    else if ($key == 'onkeydown')
                        array_push($events_array, $this->__event_keydown);
                    else if ($key == 'onkeypress')
                        array_push($events_array, $this->__event_keypress);
                    else if ($key == 'onkeyup')
                        array_push($events_array, $this->__event_keyup);
                    else
                    {
                        HELPERS::Error('Textbox', 11);

                        return false;
                    }
                }
            }

            if ($content === true)
                $merged_array = array_merge((array)$this->__content, $attributes_array, $events_array);
            else
                $merged_array = array_merge($attributes_array, $events_array);

            $final_array = HELPERS::Filter_Null_Values($merged_array);

            return $final_array;
        }
    }

    /* ------------------------- END ------------------------- */
?>
