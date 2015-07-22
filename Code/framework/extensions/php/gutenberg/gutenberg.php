<?php

    /*
    
        GreyOS Inc. - Gutenberg (Pagination system)
        
        Version: 2.0
        
        File name: gutenberg.php
        Description: This file contains the Gutenberg extension.
        
        Coded by George Delaportas (G0D)
        
        GreyOS Inc.
        Copyright © 2013
    
    */
    
    
    
    // Intialize session support
    @session_start();
    
    // Initialize offset
    if (empty($_POST['offset']))
        $_POST['offset'] = 0;
    
    // Paginate any long data
    function Gutenberg($caller, $results_set, $results_per_page, $offset, $reset = null)
    {
    
        if (!empty($caller) && !is_nan($results_per_page) && 
            strval($results_per_page) >= 0 && !is_nan($offset))
        {
        
            $rows_num = count($results_set);
            
            $page_num = ceil($rows_num / $results_per_page);
            
            // Read current language
            $my_lang = ALPHA_CMS::Get_Language();
            
            if (!empty($reset))
            {
            
                $_POST['offset'] = 0;
                $_POST['this_page_num'] = 1;
                
                $offset = 0;
                $max_count = $results_per_page;
            
            }
            
            if ($rows_num < $results_per_page)
                $results_per_page = $rows_num;
            
            if ($rows_num < $results_per_page + $offset)
            {
            
                if ($results_per_page <= $offset)
                    $max_count = $rows_num;
                
                else
                {
                
                    $_POST['this_page_num'] = 1;

                    $offset = 0;
                    $max_count = $results_per_page;
                
                }
            
            }
            
            else
                $max_count = $results_per_page + $offset;
            
            for ($i = $offset; $i < $max_count; $i++)
            {

                // Caller selection
                if ($caller == 'common')
                {



                    // --- Your code from here ---

                    if ($i % 2 == 0)
                        echo '<tr class="class_common_lines class_odd">';

                    else
                        echo '<tr class="class_common_lines class_even">';

                    $common_line = '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . $results_set[$i][0] . '</td>' .  
                                   '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][1], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][1]) >= 10)
                        $common_line .= '...</td>';

                    else
                        $common_line .= '</td>';

                    $common_line .= '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][2], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][2]) >= 10)
                        $common_line .= '...</td>';

                    else
                        $common_line .= '</td>';

                    $common_line .= '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][3], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][3]) >= 10)
                        $common_line .= '...</td>';

                    else
                        $common_line .= '</td>';

                    $common_line .= '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][4], 0, 10, 'utf8')); 

                    if (strlen($results_set[$i][4]) >= 10)
                        $common_line .= '...</td>';

                    else
                        $common_line .= '</td>';

                    $common_line .= '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][5], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][5]) >= 10)
                        $common_line .= '...</td>';

                    else
                        $common_line .= '</td>';

                    $common_line .= '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][6], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][6]) >= 10)
                        $common_line .= '...</td>';

                    else
                        $common_line .= '</td>';

                    $common_line .= '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][7], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][7]) >= 10)
                        $common_line .= '...</td>';

                    else
                        $common_line .= '</td>';

                    $common_line .= '<td style="cursor: pointer;" 
                                        onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . $results_set[$i][8] . '</td>';

                    if (!empty($results_set[$i][9]))
                    {

                        $common_line .= '<td style="cursor: pointer;" 
                                         onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                         ALPHA_CMS::Load_Content('yes_label', 'content', $my_lang) . 
                                        '</td>';

                    }

                    else
                    {

                        $common_line .= '<td style="cursor: pointer;" 
                                         onclick="Show_Common_Details(' . $results_set[$i][0] . ');">' . 
                                         ALPHA_CMS::Load_Content('no_label', 'content', $my_lang) . 
                                        '</td>';

                    }

                    if ($i % 2 == 0)
                        $common_line .= '<td class="class_table_options_odd">';

                    else
                        $common_line .= '<td class="class_table_options_even">';

                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                    {

                        if (!empty($results_set[$i][9]))
                        {

                            if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                            {

                                $common_line .= '<span class="class_commons_controls" 
                                                       onclick="Edit_Common(' . $results_set[$i][0] . ');">' . 
                                              ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                            }

                            else
                            {

                                $common_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                              ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                            }

                       }

                       else
                       {

                            $common_line .= '<span class="class_commons_controls" 
                                                   onclick="Edit_Common(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                       }

                    }

                    else
                    {

                        $common_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                      ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                    }

                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                    {

                        if (!empty($results_set[$i][9]))
                        {

                            if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                            {

                                $common_line .= '<span class="class_commons_controls" 
                                                       onclick="Delete_Common(' . $results_set[$i][0] . ');">' . 
                                                 ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                            }

                            else
                            {

                                $common_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                                 ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                            }

                        }

                        else
                        {

                            $common_line .= '<span class="class_commons_controls" 
                                                   onclick="Delete_Common(' . $results_set[$i][0] . ');">' . 
                                             ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                        }

                    }

                    else
                    {

                        $common_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                         ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                    }

                    echo $common_line;

                    echo '</tr>';

                    // --- to here ---



                }

                elseif ($caller == 'content')
                {



                    // --- Your code from here ---

                    if ($i % 2 == 0)
                        echo '<tr class="class_content_lines class_odd">';

                    else
                        echo '<tr class="class_content_lines class_even">';

                    $content_line = '<td style="cursor: pointer;" 
                                         onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . $results_set[$i][0] . '</td>' .  
                                    '<td style="cursor: pointer;" 
                                         onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][1], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][1]) >= 10)
                        $content_line .= '...</td>';

                    else
                        $content_line .= '</td>';

                    $content_line .= '<td style="cursor: pointer;" 
                                          onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][2], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][2]) >= 10)
                        $content_line .= '...</td>';

                    else
                        $content_line .= '</td>';

                    $content_line .= '<td style="cursor: pointer;" 
                                          onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . 
                                    htmlspecialchars(mb_substr($results_set[$i][3], 0, 10, 'utf8'));

                    if (strlen($results_set[$i][3]) >= 10)
                        $content_line .= '...</td>';

                    else
                        $content_line .= '</td>';

                    $content_line .= '<td style="cursor: pointer;" 
                                          onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . $results_set[$i][4] . '</td>';

                    if (!empty($results_set[$i][5]))
                    {

                        $content_line .= '<td style="cursor: pointer;" 
                                              onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('yes_label', 'content', $my_lang) . 
                                         '</td>';

                    }

                    else
                    {

                        $content_line .= '<td style="cursor: pointer;" 
                                              onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('no_label', 'content', $my_lang) . 
                                         '</td>';

                    }

                    if (!empty($results_set[$i][6]))
                    {

                        $content_line .= '<td style="cursor: pointer;" 
                                              onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('yes_label', 'content', $my_lang) . 
                                         '</td>';

                    }

                    else
                    {

                        $content_line .= '<td style="cursor: pointer;" 
                                              onclick="Show_Content_Details(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('no_label', 'content', $my_lang) . 
                                         '</td>';

                    }

                    if ($i % 2 == 0)
                        $content_line .= '<td class="class_table_options_odd">';

                    else
                        $content_line .= '<td class="class_table_options_even">';

                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                    {

                        if (!empty($results_set[$i][5]))
                        {

                            if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                            {

                                $content_line .= '<span class="class_contents_controls" 
                                                        onclick="Edit_Content(' . $results_set[$i][0] . ');">' . 
                                              ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                            }

                            else
                            {

                                $content_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                              ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                            }

                        }

                        else
                        {

                            $content_line .= '<span class="class_contents_controls" 
                                                    onclick="Edit_Content(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                        }

                    }

                    else
                    {

                        $content_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                      ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                    }

                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                    {

                        if (!empty($results_set[$i][5]))
                        {

                            if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                            {

                                $content_line .= '<span class="class_contents_controls" onclick="Delete_Content(' . $results_set[$i][0] . ');">' . 
                                              ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                            }

                            else
                            {

                                $content_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                              ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                            }

                        }

                        else
                        {

                            $content_line .= '<span class="class_contents_controls" onclick="Delete_Content(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                        }

                    }

                    else
                    {

                        $content_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                      ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                    }

                    echo $content_line;

                    echo '</tr>';

                    // --- to here ---



                }

                elseif ($caller == 'languages')
                {



                    // --- Your code from here ---

                    if ($i % 2 == 0)
                        echo '<tr class="class_lang_lines class_odd">';

                    else
                        echo '<tr class="class_lang_lines class_even">';

                    $lang_line = '<td>' . $results_set[$i][0] . '</td>  
                                  <td>' . $results_set[$i][1] . '</td>
                                  <td>' . $results_set[$i][2] . '</td>
                                  <td>' . $results_set[$i][3] . '</td>'; 

                    if (!empty($results_set[$i][4]))
                    {

                        $lang_line .= '<td>' . 
                                      ALPHA_CMS::Load_Content('yes_label', 'content', $my_lang) . 
                                      '</td>';

                    }

                    else
                    {

                        $lang_line .= '<td>' . 
                                      ALPHA_CMS::Load_Content('no_label', 'content', $my_lang) . 
                                      '</td>';

                    }
                    
                    if (!empty($results_set[$i][5]))
                    {

                        $lang_line .= '<td>' . 
                                      ALPHA_CMS::Load_Content('yes_label', 'content', $my_lang) . 
                                      '</td>';

                    }
                    
                    else
                    {

                        $lang_line .= '<td>' . 
                                      ALPHA_CMS::Load_Content('no_label', 'content', $my_lang) . 
                                      '</td>';

                    }
                    
                    if ($i % 2 == 0)
                        $lang_line .= '<td class="class_table_options_odd">';

                    else
                        $lang_line .= '<td class="class_table_options_even">';

                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                    {

                        if (!empty($results_set[$i][5]))
                        {

                            if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                            {

                                $lang_line .= '<span class="class_langs_controls" onclick="Edit_Lang(' . $results_set[$i][0] . ');">' . 
                                              ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                            }

                            else
                            {

                                $lang_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                              ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                            }

                       }

                       else
                       {

                            $lang_line .= '<span class="class_langs_controls" onclick="Edit_Lang(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                       }

                    }

                    else
                    {

                        $lang_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                      ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                    }

                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0 || $_SESSION['ALPHA_CMS_USER_TYPE'] == 1)
                    {

                        if (!empty($results_set[$i][5]))
                        {

                            if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                            {

                                if (!empty($results_set[$i][4]))
                                {
                                
                                    $lang_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                                  ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';
                                
                                }
                                
                                else
                                {
                                
                                    $lang_line .= '<span class="class_langs_controls" 
                                                         onclick="Delete_Lang(' . $results_set[$i][0] . ');">' . 
                                                  ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';
                                
                                }
                            
                            }

                            else
                            {

                                $lang_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                              ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                            }

                        }

                        else
                        {

                            if (!empty($results_set[$i][4]))
                            {

                                $lang_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                              ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                            }

                            else
                            {
                            
                                $lang_line .= '<span class="class_langs_controls" 
                                                     onclick="Delete_Lang(' . $results_set[$i][0] . ');">' . 
                                              ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';
                            
                            }
                        
                        }

                    }

                    else
                    {

                        $lang_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                      ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                    }

                    echo $lang_line;

                    echo '</tr>';

                    // --- to here ---



                }
                
                elseif ($caller == 'extensions')
                {
                
                
                
                    // --- Your code from here ---
                    
                    if ($i % 2 == 0)
                        echo '<tr class="class_extensions_lines class_odd">';
                    
                    else
                        echo '<tr class="class_extensions_lines class_even">';
                    
                    $ext_line = '<td>' . htmlspecialchars($results_set[$i][0]) . '</td>
                                 <td>' . mb_substr($results_set[$i][1], 0, 60);
                    
                    if (strlen($results_set[$i][1]) >= 60)
                        $ext_line .= '...</td>';
                    
                    else
                        $ext_line .= '</td>';
                    
                    $ext_line .= '<td>' . strtoupper(htmlspecialchars($results_set[$i][2])) . '</td>
                                  <td>'  . strtoupper(htmlspecialchars($results_set[$i][4])) . '</td>
                                  <td>' . strtoupper(htmlspecialchars($results_set[$i][3])) . '</td>';
                    
                    if ($i % 2 == 0)
                        $ext_line .= '<td class="class_table_options_odd">';

                    else
                        $ext_line .= '<td class="class_table_options_even">';
                    
                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0)
                    {
                    
                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin' && $results_set[$i][4] == 'yes')
                        {
                        
                            $ext_line .= '<span class="class_extensions_controls" 
                                                onclick="Edit_Extension(' . '\'' . htmlspecialchars($results_set[$i][0]) . '\'' . ', ' .  
                                                                           '\'' . htmlspecialchars($results_set[$i][2]) . '\'' . ');">' . 
                                         ALPHA_CMS::Load_Content('configure_label', 'content', $my_lang) . '</span> | ';
                        
                        }
                        
                        elseif ($_SESSION['ALPHA_CMS_USER'] != 'admin' && $results_set[$i][4] == 'yes')
                        {
                        
                            $ext_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                         ALPHA_CMS::Load_Content('configure_label', 'content', $my_lang) . 
                                         '</span> | ';
                        
                        }
                        
                        else
                        {
                        
                            $ext_line .= '<span class="class_extensions_controls" 
                                                onclick="Edit_Extension(' . '\'' . htmlspecialchars($results_set[$i][0]) . '\'' . ', ' .  
                                                                           '\'' . htmlspecialchars($results_set[$i][2]) . '\'' . ');">' . 
                                         ALPHA_CMS::Load_Content('configure_label', 'content', $my_lang) . '</span> | ';
                        
                        }

                    }

                    else
                    {
                    
                        $ext_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                     ALPHA_CMS::Load_Content('configure_label', 'content', $my_lang) . 
                                     '</span> | ';
                    
                    }
                    
                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0)
                    {
                    
                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin')
                        {
                        
                            $ext_line .= '<span class="class_extensions_controls" 
                                                onclick="Delete_Extension(' . '\'' . htmlspecialchars($results_set[$i][0]) . '\'' . ', ' .  
                                                                           '\'' . htmlspecialchars($results_set[$i][2]) . '\'' . ');">' . 
                                         ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span>';
                        
                        }
                        
                        else
                        {
                        
                            $ext_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                         ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . 
                                         '</span>';
                        
                        }
                    
                    }

                    else
                    {
                    
                        $ext_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                     ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . 
                                     '</span>';
                    
                    }
                    
                    echo $ext_line;
                    
                    echo '  </td>
                          </tr>';
                    
                    // --- to here ---
                
                
                
                }
                
                elseif ($caller == 'users')
                {



                    // --- Your code from here ---

                    if ($i % 2 == 0)
                        echo '<tr class="class_user_lines class_odd">';

                    else
                        echo '<tr class="class_user_lines class_even">';

                    $user_line = '<td>' . $results_set[$i][0] . '</td>' .  
                                 '<td>' . $results_set[$i][1] . '</td>' .
                                 '<td>' . mb_substr($results_set[$i][2], 0, 50, 'utf8');

                    if (strlen($results_set[$i][2]) >= 50)
                        $user_line .= '...</td>';

                    else
                        $user_line .= '</td>';

                    if ($results_set[$i][3] == 0)
                        $type = ALPHA_CMS::Load_Content('admin_label', 'content', $my_lang);

                    elseif ($results_set[$i][3] == 1)
                        $type = ALPHA_CMS::Load_Content('editor_label', 'content', $my_lang);

                    else
                        $type = ALPHA_CMS::Load_Content('auditor_label', 'content', $my_lang);

                    $user_line .= '<td>' . htmlspecialchars($type) . '</td>';

                    if ($i % 2 == 0)
                        $user_line .= '<td class="class_table_options_odd">';

                    else
                        $user_line .= '<td class="class_table_options_even">';

                    if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0)
                    {

                        if ($_SESSION['ALPHA_CMS_USER'] == 'admin' && $results_set[$i][1] == 'admin')
                        {

                            $user_line .= '<span class="class_users_controls" onclick="Edit_User(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                        }

                        elseif ($_SESSION['ALPHA_CMS_USER'] != 'admin' && $results_set[$i][1] == 'admin')
                        {

                            $user_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                          ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                        }

                        else
                        {

                            $user_line .= '<span class="class_users_controls" onclick="Edit_User(' . $results_set[$i][0] . ');">' . 
                                          ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                        }

                    }

                    else
                    {

                        $user_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                      ALPHA_CMS::Load_Content('edit_label', 'content', $my_lang) . '</span> | ';

                    }

                    if ($results_set[$i][0] == 1)
                    {

                        $user_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                      ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                    }

                    else
                    {

                        if ($_SESSION['ALPHA_CMS_USER_TYPE'] == 0)
                        {
                        
                            if ($_SESSION['ALPHA_CMS_USER'] == $results_set[$i][1])
                            {
                            
                                $user_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                              ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';
                            
                            }
                            
                            else
                            {
                            
                                $user_line .= '<span class="class_users_controls" onclick="Delete_User(' . $results_set[$i][0] . ');">' . 
                                              ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';
                            
                            }
                        
                        }

                        else
                        {

                            $user_line .= '<span style="color: #646464; cursor: pointer;">' . 
                                          ALPHA_CMS::Load_Content('delete_label', 'content', $my_lang) . '</span></td>';

                        }

                    }

                    echo $user_line;

                    echo '</tr>';

                    // --- to here ---



                }

                elseif ($caller == 'logs')
                {



                    // --- Your code from here ---

                    if ($i % 2 == 0)
                    {

                        echo '<tr class="class_log_lines class_odd" style="cursor: pointer;" 
                                  onclick="Show_Log_Details(' . $results_set[$i][0] . ');">';

                    }

                    else
                    {

                        echo '<tr class="class_log_lines class_even" style="cursor: pointer;" 
                                  onclick="Show_Log_Details(' . $results_set[$i][0] . ');">';

                    }

                    $log_line = '<td>' . $results_set[$i][0] . '</td>' .  
                                '<td>' . htmlspecialchars($results_set[$i][1]) . '</td>' .
                                '<td>' . htmlspecialchars($results_set[$i][2]) . '</td>' .
                                '<td>' . htmlspecialchars(mb_substr($results_set[$i][3], 0, 15, 'utf8'));

                    if (strlen($results_set[$i][3]) >= 15)
                        $log_line .= '...</td>';

                    else
                        $log_line .= '</td>';

                    $log_line .= '<td>' . htmlspecialchars(mb_substr($results_set[$i][4], 0, 15, 'utf8')); 

                    if (strlen($results_set[$i][4]) >= 15)
                        $log_line .= '...</td>';

                    else
                        $log_line .= '</td>';

                    $log_line .= '<td>' . htmlspecialchars($results_set[$i][5]) . '</td>' . 
                                 '<td>' . $results_set[$i][6] . '</td>';

                    echo $log_line;

                    echo '</tr>';

                    // --- to here ---



                }

                else
                    return false;

            }



            // --- Extra code from here ---

            echo '  </table>
                  </div>';

            // -- to here ---



            echo '<script type="text/javascript">

                    // Go to a specific page
                    function Go_To_Page(page_num, event_listener)
                    {
                    
                        if (event_listener.keyCode != 13)
                            return 0;
                        
                        if (page_num < 1 || page_num > ' . $page_num . ')
                            return 0;
                        
                        var this_page_num;
                        
                        this_page_num = document.getElementById(\'this_page_num\').value;
                        
                        if (this_page_num > page_num)
                        {
                        
                            document.getElementById(\'offset\').value = 
                            parseInt(document.getElementById(\'offset\').value) - ((this_page_num - page_num) * ' . $results_per_page . ');
                        
                        }
                        
                        else
                        {
                        
                            document.getElementById(\'offset\').value = 
                            parseInt(document.getElementById(\'offset\').value) + ((page_num - this_page_num) * ' . $results_per_page . ');
                        
                        }
                        
                        document.getElementById(\'this_page_num\').value = page_num;
                        
                        document.getElementById(\'admin_form_dhtml\').submit();
                        
                        return 1;
                    
                    }
                    
                    // Post
                    function Do_Post(direction)
                    {

                        if (direction == \'1\' || direction == \'left\')
                        {

                            document.getElementById(\'this_page_num\').value = 
                            parseInt(document.getElementById(\'this_page_num\').value) - 1;

                            document.getElementById(\'offset\').value = 
                            parseInt(document.getElementById(\'offset\').value) - ' . $results_per_page . ';

                        }

                        else if (direction == \'2\' || direction == \'right\')
                        {

                            document.getElementById(\'this_page_num\').value = 
                            parseInt(document.getElementById(\'this_page_num\').value) + 1;

                            document.getElementById(\'offset\').value = 
                            parseInt(document.getElementById(\'offset\').value) + ' . $results_per_page . ';

                        }

                        else
                            return 0;

                        document.getElementById(\'admin_form_dhtml\').submit();

                        return 1;

                    }

                  </script>

                  <div id="gutenberg_controls" 
                       style="float: left;
                              clear: both;
                              width: 872px; 
                              height: 30px; 
                              background-color: #E6E6E6; 
                              font-weight: bold;
                              border-radius: 8px;
                              margin-left: 2px; 
                              padding-left: 2px; 
                              padding-top: 18px;">
                    <div id="page_num" style="float: left; clear: left;">';
            
            if (empty($_POST['this_page_num']))
                $_POST['this_page_num'] = 1;
            
            if ($_POST['this_page_num'] == 1)
            {

                echo ALPHA_CMS::Load_Content('page_num_label', 'content', $my_lang) . ': <span>
                     <input id="the_page_num" name="the_page_num" value="1" maxlength="7" 
                            onkeypress="return Input_Controller(this, event);" 
                            onkeyup="Go_To_Page(this.value, event);" /></span> 
                     <input id="this_page_num" name="this_page_num" type="hidden" value="1" />
                     <input id="offset" name="offset" type="hidden" value="0" />';

            }

            else
            {

                echo ALPHA_CMS::Load_Content('page_num_label', 'content', $my_lang) . 
                     ': <span><input id="the_page_num" name="the_page_num" value="' . $_POST['this_page_num'] . '" 
                                     maxlength="7" 
                                     onkeypress="return Input_Controller(this, event);" 
                                     onkeyup="Go_To_Page(this.value, event);" /></span> 
                      <input id="this_page_num" name="this_page_num" type="hidden" value="' . $_POST['this_page_num'] . '" />
                      <input id="offset" name="offset" type="hidden" value="' . $offset . '" />';

            }
            
            echo '</div>
                  <div style="float: left; clear: none; text-align: center; margin-left: 20px;">
                    <span style="margin-right: 20px;">|</span>' . 
                  ALPHA_CMS::Load_Content('total_pages_num_label', 'content', $my_lang) . ': ' . $page_num . 
                 '</div>
                  <div style="float: left; clear: none; text-align: center; margin-left: 20px;">
                    <span style="margin-right: 20px;">|</span>' . 
                  ALPHA_CMS::Load_Content('rows_per_page_num_label', 'content', $my_lang) . ': ' . $results_per_page . 
                 '</div>
                  <div style="float: left; clear: none; text-align: center;">
                    <span style="margin-left: 20px; margin-right: 20px;">|</span>' . 
                  ALPHA_CMS::Load_Content('rows_num_label', 'content', $my_lang) . ': ' . $rows_num . 
                 '</div>
                  <div id="ctrl_arrows" style="float: right; clear: right; width: 68px; margin-top: -2px;">';
            
            if ($page_num == 1 || $_POST['this_page_num'] == 1)
            {
            
                if ($results_per_page == $rows_num)
                {

                    echo '      <div id="ctrl_previous" style="float: left; cursor: pointer; 
                                                               color: gray; margin-right: 20px; 
                                                               background-color: #C0C0C0; 
                                                               border-radius: 8px; 
                                                               padding-top: 2px; 
                                                               padding-bottom: 2px; 
                                                               padding-left: 8px; 
                                                               padding-right: 6px;">&lt;</div>
                                <div id="ctrl_next" style="float: left; cursor: pointer; color: gray; 
                                                           background-color: #C0C0C0; 
                                                           border-radius: 8px; 
                                                           padding-top: 2px; 
                                                           padding-bottom: 2px; 
                                                           padding-left: 8px; 
                                                           padding-right: 6px;">&gt;</div>
                            </div>';

                }

                else
                {

                    echo '      <div id="ctrl_previous" style="float: left; cursor: pointer; 
                                                               color: gray; margin-right: 20px; 
                                                               background-color: #C0C0C0; 
                                                               border-radius: 8px; 
                                                               padding-top: 2px; 
                                                               padding-bottom: 2px; 
                                                               padding-left: 8px; 
                                                               padding-right: 6px;">&lt;</div>
                                <div id="ctrl_next" style="float: left; cursor: pointer; 
                                                           background-color: #C0C0C0; 
                                                           border-radius: 8px; 
                                                           padding-top: 2px; 
                                                           padding-bottom: 2px; 
                                                           padding-left: 8px; 
                                                           padding-right: 6px;" 
                                     onclick="Do_Post(\'right\');">&gt;</div>
                            </div>';

                }

            }
            
            elseif ($_POST['this_page_num'] == $page_num || $max_count == $rows_num)
            {
            
                echo '      <div id="ctrl_previous" style="float: left; cursor: pointer; margin-right: 20px; 
                                                           background-color: #C0C0C0; 
                                                           border-radius: 8px; 
                                                           padding-top: 2px; 
                                                           padding-bottom: 2px; 
                                                           padding-left: 8px; 
                                                           padding-right: 6px;" 
                                 onclick="Do_Post(\'left\');">&lt;</div>
                            <div id="ctrl_next" style="float: left; cursor: pointer; color: gray; 
                                                       background-color: #C0C0C0; 
                                                       border-radius: 8px; 
                                                       padding-top: 2px; 
                                                       padding-bottom: 2px; 
                                                       padding-left: 8px; 
                                                       padding-right: 6px;">&gt;</div>
                        </div>';

            }

            else
            {

                echo '      <div id="ctrl_previous" style="float: left; cursor: pointer; margin-right: 20px; 
                                                           background-color: #C0C0C0; 
                                                           border-radius: 8px; 
                                                           padding-top: 2px; 
                                                           padding-bottom: 2px; 
                                                           padding-left: 8px; 
                                                           padding-right: 6px;" 
                                 onclick="Do_Post(\'left\');">&lt;</div>
                            <div id="ctrl_next" style="float: left; cursor: pointer; 
                                                       background-color: #C0C0C0; 
                                                       border-radius: 8px; 
                                                       padding-top: 2px; 
                                                       padding-bottom: 2px; 
                                                       padding-left: 8px; 
                                                       padding-right: 6px;" 
                                 onclick="Do_Post(\'right\');">&gt;</div>
                        </div>';

            }         

            echo '</div>';

            return true;
        
        }
        
        return false;
    
    }

?>
