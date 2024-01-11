<?php
    /*
        spl@sh (Class)

        File name: video.php (Version: 4.6)
        Description: This file contains the "VIDEO" class.

        Coded by George Delaportas (G0D)
        Copyright (C) 2013
        Open Software License (OSL 3.0)
    */

    /* ------------------------ BEGIN ------------------------ */

    // Include MULTIMEDIA class
    require_once(UTIL::Absolute_Path('framework/extensions/php/user/splash/utilities/control/multimedia.php'));

    // Class: [VIDEO]
    class VIDEO extends MULTIMEDIA
    {
        // Attributes
        private $__attr_width = null;
        private $__attr_height = null;
        private $__attr_poster = null;
        private $__attr_preload = null;
        private $__attr_controls = false;
        private $__attr_autoplay = false;
        private $__attr_muted = false;
        private $__attr_loop = false;

        // Events
        private $__event_loadeddata = null;
        private $__event_loadedmetadata = null;
        private $__event_loadstart = null;
        private $__event_waiting = null;
        private $__event_canplay = null;
        private $__event_canplaythrough = null;
        private $__event_play = null;
        private $__event_playing = null;
        private $__event_progress = null;
        private $__event_pause = null;
        private $__event_seeked = null;
        private $__event_seeking = null;
        private $__event_stalled = null;
        private $__event_suspend = null;
        private $__event_emptied = null;
        private $__event_ended = null;
        private $__event_readystatechange = null;
        private $__event_durationchange = null;
        private $__event_ratechange = null;
        private $__event_timeupdate = null;
        private $__event_volumechange = null;
        private $__event_error = null;

        // Options
        private $__options = null;

        public function Show($options, $attributes, $events = null)
        {
            if (empty($options) && !is_null($options))
            {
                HELPERS::Error('Video', 1);

                return false;
            }

            if (!HELPERS::Valid_Parameters($attributes, $events))
            {
                HELPERS::Error('Video', 2);

                return false;
            }

            if (is_null($options))
            {
                if (!HELPERS::Parameters_Contain($attributes, 'src'))
                {
                    HELPERS::Error('Video', 15);

                    return false;
                }

                if (empty($attributes['src']))
                {
                    HELPERS::Error('Video', 16);

                    return false;
                }

                $this->__attr_src = $attributes['src'];
            }

            $values_array = array('auto', 'metadata', 'none');
            $html_tag = '<video ';

            foreach ($attributes as $key => $value)
            {
                if (HELPERS::Is_Empty($value))
                {
                    HELPERS::Error('Video', 5);

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
                else if ($key == 'width' && HELPERS::Is_Positive_Integer($value))
                {
                    $html_tag .= 'width="' . $value . '" ';
                    $this->__attr_width = $value;
                }
                else if ($key == 'height' && HELPERS::Is_Positive_Integer($value))
                {
                    $html_tag .= 'height="' . $value . '" ';
                    $this->__attr_height = $value;
                }
                else if ($key == 'poster')
                {
                    $html_tag .= 'poster="' . $value . '" ';
                    $this->__attr_poster = $value;
                }
                else if ($key == 'preload' && HELPERS::Value_Contained($value, $values_array))
                {
                    $html_tag .= 'preload="' . $value . '" ';
                    $this->__attr_preload = $value;
                }
                else if ($key == 'controls' && HELPERS::Is_True($value))
                {
                    $html_tag .= 'controls ';
                    $this->__attr_controls = true;
                }
                else if ($key == 'autoplay' && HELPERS::Is_True($value))
                {
                    $html_tag .= 'autoplay ';
                    $this->__attr_autoplay = true;
                }
                else if ($key == 'muted' && HELPERS::Is_True($value))
                {
                    $html_tag .= 'muted ';
                    $this->__attr_muted = true;
                }
                else if ($key == 'loop' && HELPERS::Is_True($value))
                {
                    $html_tag .= 'loop ';
                    $this->__attr_loop = true;
                }
                else
                {
                    if ($key != 'src')
                    {
                        HELPERS::Error('Video', 6);

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
                        HELPERS::Error('Video', 7);

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
                    else if ($key == 'onabort')
                    {
                        $html_tag .= 'onabort="' . $value . '" ';
                        $this->__event_abort = $value;
                    }
                    else if ($key == 'onloadeddata')
                    {
                        $html_tag .= 'onloadeddata="' . $value . '" ';
                        $this->__event_loadeddata = $value;
                    }
                    else if ($key == 'onloadedmetadata')
                    {
                        $html_tag .= 'onloadedmetadata="' . $value . '" ';
                        $this->__event_loadedmetadata = $value;
                    }
                    else if ($key == 'onloadstart')
                    {
                        $html_tag .= 'onloadstart="' . $value . '" ';
                        $this->__event_loadstart = $value;
                    }
                    else if ($key == 'onwaiting')
                    {
                        $html_tag .= 'onwaiting="' . $value . '" ';
                        $this->__event_waiting = $value;
                    }
                    else if ($key == 'oncanplay')
                    {
                        $html_tag .= 'oncanplay="' . $value . '" ';
                        $this->__event_canplay = $value;
                    }
                    else if ($key == 'oncanplaythrough')
                    {
                        $html_tag .= 'oncanplaythrough="' . $value . '" ';
                        $this->__event_canplaythrough = $value;
                    }
                    else if ($key == 'onplay')
                    {
                        $html_tag .= 'onplay="' . $value . '" ';
                        $this->__event_play = $value;
                    }
                    else if ($key == 'onplaying')
                    {
                        $html_tag .= 'onplaying="' . $value . '" ';
                        $this->__event_playing = $value;
                    }
                    else if ($key == 'onprogress')
                    {
                        $html_tag .= 'onprogress="' . $value . '" ';
                        $this->__event_progress = $value;
                    }
                    else if ($key == 'onpause')
                    {
                        $html_tag .= 'onpause="' . $value . '" ';
                        $this->__event_pause = $value;
                    }
                    else if ($key == 'onseeked')
                    {
                        $html_tag .= 'onseeked="' . $value . '" ';
                        $this->__event_seeked = $value;
                    }
                    else if ($key == 'onseeking')
                    {
                        $html_tag .= 'onseeking="' . $value . '" ';
                        $this->__event_seeking = $value;
                    }
                    else if ($key == 'onstalled')
                    {
                        $html_tag .= 'onstalled="' . $value . '" ';
                        $this->__event_stalled = $value;
                    }
                    else if ($key == 'onsuspended')
                    {
                        $html_tag .= 'onsuspended="' . $value . '" ';
                        $this->__event_suspend = $value;
                    }
                    else if ($key == 'onemptied')
                    {
                        $html_tag .= 'onemptied="' . $value . '" ';
                        $this->__event_emptied = $value;
                    }
                    else if ($key == 'onended')
                    {
                        $html_tag .= 'onended="' . $value . '" ';
                        $this->__event_ended = $value;
                    }
                    else if ($key == 'onreadystatechange')
                    {
                        $html_tag .= 'onreadystatechange="' . $value . '" ';
                        $this->__event_readystatechange = $value;
                    }
                    else if ($key == 'ondurationchange')
                    {
                        $html_tag .= 'ondurationchange="' . $value . '" ';
                        $this->__event_durationchange = $value;
                    }
                    else if ($key == 'onratechange')
                    {
                        $html_tag .= 'onratechange="' . $value . '" ';
                        $this->__event_ratechange = $value;
                    }
                    else if ($key == 'ontimeupdate')
                    {
                        $html_tag .= 'ontimeupdate="' . $value . '" ';
                        $this->__event_timeupdate = $value;
                    }
                    else if ($key == 'onvolumechange')
                    {
                        $html_tag .= 'onvolumechange="' . $value . '" ';
                        $this->__event_volumechange = $value;
                    }
                    else if ($key == 'onerror')
                    {
                        $html_tag .= 'onerror="' . $value . '" ';
                        $this->__event_error = $value;
                    }
                    else
                    {
                        HELPERS::Error('Video', 8);

                        return false;
                    }
                }
            }

            $html_tag .= '>';

            if (!is_null($options))
            {
                $html_tag .= $options;
                $this->__options = $options;
            }

            $html_tag .= '</video>';

            return $html_tag;
        }

        public function Debug($options, $attributes = null, $events = null)
        {
            if (!is_bool($options))
            {
                HELPERS::Error('Video', 14);

                return false;
            }

            if (!empty($attributes))
            {
                if (!HELPERS::Valid_Parameters($attributes, $events))
                {
                    HELPERS::Error('Video', 9);

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
                    else if ($key == 'src')
                        array_push($attributes_array, $this->__attr_src);
                    else if ($key == 'width')
                        array_push($attributes_array, $this->__attr_width);
                    else if ($key == 'height')
                        array_push($attributes_array, $this->__attr_height);
                    else if ($key == 'poster')
                        array_push($attributes_array, $this->__attr_poster);
                    else if ($key == 'preload')
                        array_push($attributes_array, $this->__attr_preload);
                    else if ($key == 'controls')
                        array_push($attributes_array, $this->__attr_controls);
                    else if ($key == 'autoplay')
                        array_push($attributes_array, $this->__attr_autoplay);
                    else if ($key == 'muted')
                        array_push($attributes_array, $this->__attr_muted);
                    else if ($key == 'loop')
                        array_push($attributes_array, $this->__attr_loop);
                    else
                    {
                        HELPERS::Error('Video', 10);

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
                    else if ($key == 'onabort')
                        array_push($events_array, $this->__event_abort);
                    else if ($key == 'onloadeddata')
                        array_push($events_array, $this->__event_loadeddata);
                    else if ($key == 'onloadedmetadata')
                        array_push($events_array, $this->__event_loadedmetadata);
                    else if ($key == 'onloadstart')
                        array_push($events_array, $this->__event_loadstart);
                    else if ($key == 'onwaiting')
                        array_push($events_array, $this->__event_waiting);
                    else if ($key == 'oncanplay')
                        array_push($events_array, $this->__event_canplay);
                    else if ($key == 'oncanplaythrough')
                        array_push($events_array, $this->__event_canplaythrough);
                    else if ($key == 'onplay')
                        array_push($events_array, $this->__event_play);
                    else if ($key == 'onplaying')
                        array_push($events_array, $this->__event_playing);
                    else if ($key == 'onprogress')
                        array_push($events_array, $this->__event_progress);
                    else if ($key == 'onpause')
                        array_push($events_array, $this->__event_pause);
                    else if ($key == 'onseeked')
                        array_push($events_array, $this->__event_seeked);
                    else if ($key == 'onseeking')
                        array_push($events_array, $this->__event_seeking);
                    else if ($key == 'onstalled')
                        array_push($events_array, $this->__event_stalled);
                    else if ($key == 'onsuspend')
                        array_push($events_array, $this->__event_suspend);
                    else if ($key == 'onemptied')
                        array_push($events_array, $this->__event_emptied);
                    else if ($key == 'onended')
                        array_push($events_array, $this->__event_ended);
                    else if ($key == 'onreadystatechange')
                        array_push($events_array, $this->__event_readystatechange);
                    else if ($key == 'ondurationchange')
                        array_push($events_array, $this->__event_durationchange);
                    else if ($key == 'onratechange')
                        array_push($events_array, $this->__event_ratechange);
                    else if ($key == 'ontimeupdate')
                        array_push($events_array, $this->__event_timeupdate);
                    else if ($key == 'onvolumechange')
                        array_push($events_array, $this->__event_volumechange);
                    else if ($key == 'onerror')
                        array_push($events_array, $this->__event_error);
                    else
                    {
                        HELPERS::Error('Video', 11);

                        return false;
                    }
                }
            }

            if ($options === true)
                $merged_array = array_merge((array)$this->__options, $attributes_array, $events_array);
            else
                $merged_array = array_merge($attributes_array, $events_array);

            $final_array = HELPERS::Filter_Null_Values($merged_array);

            return $final_array;
        }
    }

    /* ------------------------- END ------------------------- */
?>
