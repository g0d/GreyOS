<?php

    /*

        GreyOS Inc. - AJAX Linkedin application

        File name: i_linkedin.php (Version: 1.0)
        Description: This file contains the AJAX Linkedin application.

        Coded by Arron Bailiss (abailiss)

        GreyOS Inc.
        Copyright © 2014

    */
    
    // Disable error reporting
    // TODO: uncomment line below
    //error_reporting(0);

    // Initialize session support
    @session_start();

    // Disable caching
    header('Cache-Control: no-cache, must-revalidate'); // HTTP 1.1
    header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');   // Date in the past

    // Include ALPHA Framework class
    require('../../../alpha.php');

    // Include ALPHA CMS class
    require('../../../../cms/alpha_cms.php');

    require_once(ALPHA_CMS::Absolute_Path('framework/extensions/php/i_linkedin/i_linkedin.php'));

    $db = ALPHA_CMS::Use_DB_Connection();
    // TODO: retrieve settings from elsewhere + set correct redirect URL
    $api_key = '75iirnbaknxwy5';
    $secret_key = 'HaRTv7EjJf9phNpG';
    $redirect_url = Current_Url(false) . '?action=authorization_return';
    $linkedin = new I_LINKEDIN($api_key, $secret_key, $redirect_url);

    $access_token = Get_Access_Token();

    if ($access_token !== false)
        Set_Access_Token($access_token);

    if (isset($_POST) && !empty($_POST))
    {

        if (isset($_POST['action']))
        {
 
            if ($_POST['action'] === 'start')
                Start_Action();

            elseif ($_POST['action'] === 'logout')
                Logout_Action();

            elseif ($_POST['action'] === 'network_updates')
                Network_Updates_Action();

            elseif ($_POST['action'] === 'share')
                Share_Action();

            elseif ($_POST['action'] === 'view')
                View_Action();

            elseif ($_POST['action'] === 'people_search')
                People_Search_Action();

            elseif ($_POST['action'] === 'job_search')
                Job_Search_Action();

            elseif ($_POST['action'] === 'company_search')
                Company_Search_Action();

            elseif ($_POST['action'] === 'companies_followed')
                Companies_Followed_Action();

            elseif ($_POST['action'] === 'company_follow')
                Company_Follow_Action();

            elseif ($_POST['action'] === 'company_unfollow')
                Company_Unfollow_Action();

            elseif ($_POST['action'] === 'companies_suggested')
                Companies_Suggested_Action();

            elseif ($_POST['action'] === 'companies_products')
                Companies_Products_Action();

            elseif ($_POST['action'] === 'groups_joined')
                Groups_Joined_Action();

            elseif ($_POST['action'] === 'groups_suggested')
                Groups_Suggested_Action();

            elseif ($_POST['action'] === 'group_join')
                Group_Join_Action();

            elseif ($_POST['action'] === 'group_leave')
                Group_Leave_Action();

        }

    }

    elseif (isset($_GET) && !empty($_GET))
    {

        if (isset($_GET['action']))
        {

            if ($_GET['action'] === 'authorization')
                Authorization_Action();

            elseif ($_GET['action'] === 'authorization_return')
                Authorization_Return_Action();

        }

    }

    function Start_Action()
    {

        if (Get_Access_Token() === false)
        {

            $existing_tokens = ALPHA_CMS::Execute_SQL_Command(
                'SELECT * FROM `oauth_linkedin` WHERE `talos_id` = "' . $_SESSION['TALOS']['id'] . '"
                         AND `active` = 1
                         AND `expires` > NOW()'
            );

            if ($existing_tokens === false)
                $count = 0;

            else
                $count = count($existing_tokens);

            if ($count > 0)
            {
                Set_Access_Token($existing_tokens[0]['access_token']);

                Home_Html();

            }

            else
                Login_Html();

        }

        else
            Home_Html();

    }

    function Logout_Action()
    {

        $counter = ALPHA_CMS::Execute_SQL_Command(
            'SELECT COUNT(*) AS `num`
             FROM `oauth_linkedin`
             WHERE `talos_id` = "' . $_SESSION['TALOS']['id'] . '"'
        );

        if ($counter[0]['num'] > 0)
        {

            ALPHA_CMS::Execute_SQL_Command(
                'UPDATE `oauth_linkedin`
                 SET `active` = "0"
                 WHERE `talos_id` = "' . $_SESSION['TALOS']['id'] . '"',
                1
            );

        }

        unset($_SESSION['i_linkedin']);

        Login_Html();

    }

    function Network_Updates_Action()
    {

        $show_wrapper = !isset($_POST['no_wrapper']) || $_POST['no_wrapper'] !== 'true';

        if ($show_wrapper)
        {
            
            Share_Update_Html();

            echo '<hr>';

        }

        Network_Updates_Html($show_wrapper);

    }

    function Share_Action()
    {

        global $linkedin;

        if (!isset($_POST['comment']) || !isset($_POST['visibility']))
            return true;

        $connections_only = $_POST['visibility'] === 'connections-only';

        $linkedin->Share_Update($_POST['comment'], $connections_only); // TODO: validate values

        Network_Updates_Html();

        return true;

    }

    function View_Action()
    {

        if (!isset($_POST['type']) || !isset($_POST['id']))
            return true;

        $type = $_POST['type'];
        $id = $_POST['id'];

        switch ($type)
        {

            case 'person':

                View_Person_Html($id);

                break;

            case 'company':

                View_Company_Html($id);

                break;

            case 'job':

                View_Job_Html($id);

                break;

            case 'group':

                View_Group_Html($id);

                break;

        }

        return true;

    }

    function People_Search_Action()
    {

        global $linkedin;

        $people_results = [];

        if (isset($_POST['keywords']))
        {

            $search_fields = [
                'sort', 'keywords', 'first_name', 'last_name', 'company_name',
                'current_company', 'title', 'current_title', 'school_name', 'current_school',
                'country_code', 'postal_code', 'distance',
            ];
            $valid_fields = [];

            foreach ($_POST as $field_name => $field_value)
            {

                if (in_array($field_name, $search_fields) && !empty($field_value))
                    $valid_fields[str_replace('_', '-', $field_name)] = $field_value;

            }

            $people_results = $linkedin->Search_People($valid_fields);

            // TODO: display data
            echo '<pre>';
            print_r($people_results);
            echo '</pre>';

        }

        People_Search_Html($people_results);

        return true;

    }

    function Job_Search_Action()
    {

        global $linkedin;

        $job_results = [];

        if (isset($_POST['keywords']))
        {

            $search_fields = [
                'keywords', 'company-name', 'job-title', 'country-code', 'postal-code', 'distance', 'sort',
            ];
            $valid_fields = [];

            foreach ($_POST as $field_name => $field_value)
            {

                if (in_array($field_name, $search_fields) && !empty($field_value))
                    $valid_fields[str_replace('_', '-', $field_name)] = $field_value;

            }

            $job_results = $linkedin->Search_Jobs($valid_fields);

            // TODO: display data
            echo '<pre>';
            print_r($job_results);
            echo '</pre>';

        }

        Job_Search_Html($job_results);

        return true;

    }

    function Company_Search_Action()
    {

        global $linkedin;

        $company_results = [];

        if (isset($_POST['keywords']))
        {

            $search_fields = [
                'keywords', 'sort',
            ];
            $valid_fields = [];

            foreach ($_POST as $field_name => $field_value)
            {

                if (in_array($field_name, $search_fields) && !empty($field_value))
                    $valid_fields[str_replace('_', '-', $field_name)] = $field_value;

            }

            $start = 0;

            switch ($_POST['direction'])
            {

                case '1': // Next page

                    $last_start = Get_Last_Paginated_Call('company_search', 'start');
                    $last_count = Get_Last_Paginated_Call('company_search', 'count');
                    $last_total = Get_Last_Paginated_Call('company_search', 'total');

                    $start = $last_start + $last_count;

                    if ($start > $last_total)
                        $start = $last_total - $last_count;

                    break;

                case '-1': // Previous page

                    $last_start = Get_Last_Paginated_Call('company_search', 'start');
                    $last_count = Get_Last_Paginated_Call('company_search', 'total');

                    $start = $last_start - $last_count;

                    if ($start < 0)
                        $start = 0;

                    break;

            }

            $valid_fields['start'] = $start;

            $company_results = $linkedin->Search_Companies($valid_fields);

            Set_Last_Paginated_Call('company_search', $company_results);

        }

        Company_Search_Html($company_results);

        return true;

    }

    function Companies_Followed_Action()
    {

        global $linkedin;

        $companies = $linkedin->Get_Followed_Companies();

        foreach ($companies as $company)
        {

            Company_Row_Content_Html($company);

        }

    }

    function Company_Follow_Action()
    {

        global $linkedin;

        if (isset($_POST['id']))
        {

            $linkedin->Company_Follow($_POST['id']);

            View_Company_Html($_POST['id']);

        }

        else
            Companies_Followed_Action();

    }

    function Company_Unfollow_Action()
    {

        global $linkedin;

        if (isset($_POST['id']))
        {

            $linkedin->Company_Unfollow($_POST['id']);

            View_Company_Html($_POST['id']);

        }

        else
            Companies_Followed_Action();

    }

    function Companies_Suggested_Action()
    {

        global $linkedin;

        $companies = $linkedin->Get_Suggested_Companies();

        foreach ($companies as $company)
        {

            Company_Row_Content_Html($company);

        }

    }

    function Companies_Products_Action()
    {

        global $linkedin;

        if (isset($_POST['id']))
        {

            $products = $linkedin->Get_Companies_Products($_POST['id']);

            // TODO: display data
            echo '<pre>';
            print_r($products);
            echo '</pre>';

        }

        else
            Home_Html();

    }

    function Groups_Joined_Action()
    {

        global $linkedin;

        $groups = $linkedin->Get_Joined_Groups();

        foreach ($groups->{'group-membership'} as $group)
        {

            Group_Row_Content_Html($group->group);

        }
    
    }

    function Groups_Suggested_Action()
    {

        global $linkedin;

        $groups = $linkedin->Get_Suggested_Groups();

        foreach ($groups->group as $group)
        {

            Group_Row_Content_Html($group);

        }

    }

    function Group_Join_Action()
    {

        global $linkedin;

        if (isset($_POST['id']))
        {

            $linkedin->Group_Join($_POST['id']);

            View_Group_Html($_POST['id']);

        }

        else
            Groups_Joined_Action();

    }

    function Group_Leave_Action()
    {

        global $linkedin;

        if (isset($_POST['id']))
        {

            $linkedin->Group_Leave($_POST['id']);

            View_Group_Html($_POST['id']);

        }

        else
            Groups_Joined_Action();

    }

    function Authorization_Action()
    {

        global $linkedin;

        $login_url = $linkedin->Get_Auth_Code_Link('r_basicprofile r_fullprofile r_network rw_nus rw_groups w_messages');

        header('Location: ' . $login_url);

        return true;

    }

    function Authorization_Return_Action()
    {

        global $linkedin;
        global $db;

        if (isset($_GET['code']) && isset($_GET['state']))
        {

            $linkedin->Set_Auth_Code($_GET['code'], $_GET['state']); // TODO: validate values

            $access_token = $linkedin->Get_Access_Token($_GET['code']);

            Set_Access_Token($access_token->access_token);

            $counter = ALPHA_CMS::Execute_SQL_Command(
                'SELECT COUNT(*) AS `num`
                 FROM `oauth_linkedin`
                 WHERE `talos_id` = "' . $_SESSION['TALOS']['id'] . '"'
            );

            if ($counter[0]['num'] > 0)
            {

                // Store access_token in DB
                ALPHA_CMS::Execute_SQL_Command(
                    'UPDATE `oauth_linkedin`
                     SET `access_token` = "' . mysqli_real_escape_string($db_con, Get_Access_Token(), $db) . '",
                             `expires` = "' . date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s'). ' +' . $access_token->expires_in . ' seconds')) . '"
                             `ip` = "' . $_SERVER['REMOTE_ADDR'] . '"
                             WHERE `talos_id` = "' . $_SESSION['TALOS']['id'] . '"',
                    1
                );

            }

            else
            {

                // Store access_token in DB
                ALPHA_CMS::Execute_SQL_Command(
                    'INSERT INTO `oauth_linkedin`
                     (`talos_id`, `ip`, `access_token`, `expires`, `active`)
                     VALUES ("' . $_SESSION['TALOS']['id'] . '", "' .
                    $_SERVER['REMOTE_ADDR'] . '", "' .
                    mysqli_real_escape_string($db_con, $access_token->access_token, $db) . '", "' .
                    date('Y-m-d H:i:s', strtotime(date('Y-m-d H:i:s'). ' +' . $access_token->expires_in . ' seconds')) . '",
                             1)',
                    1
                );

            }

            echo '<script>window.onload = self.close();</script>';

        }

        elseif (isset($_GET['error']) && isset($_GET['state']))
            echo '<script>window.onload = self.close();</script>';

        return true;

    }

    function Home_Html()
    {

        echo '<div id="linkedin_home_div">';

        echo '<div><a href="#" id="linkedin_network_updates_link">Network Updates</a></div>';

        echo '<div><a href="#" class="link" data-type="person" data-id="~">My Profile</a> | <a href="#" id="linkedin_logout_link">Logout</a></div>';

        echo '<hr>';

        echo '<div><a href="#" id="linkedin_companies_followed">Followed Companies</a></div>';

        echo '<div><a href="#" id="linkedin_companies_suggested">Suggested Companies</a></div>';

        echo '<hr>';

        echo '<div><a href="#" id="linkedin_groups_joined">Joined Groups</a></div>';

        echo '<div><a href="#" id="linkedin_groups_suggested">Suggested Groups</a></div>';

        echo '<hr>';

        echo '<div><a href="#" id="linkedin_people_search_link">People Search</a></div>';

        echo '<div><a href="#" id="linkedin_job_search_link">Job Search</a></div>';

        echo '<div><a href="#" id="linkedin_company_search_link">Company Search</a></div>';

        echo '</div>';

        return true;

    }

    function Login_Html()
    {

        // Login button
        echo '<div id="linkedin_login_div">
                  <div id="linkedin_login_login_greyos"></div>
                  <div id="linkedin_login_button_div">
                      <button id="linkedin_access_token">Sign in</button>
                      <img id="linkedin_access_token_background" src="/framework/extensions/js/nature/themes/i_linkedin/pix/loginbg.png">
                  </div>
              </div>';

        return true;

    }

    function Share_Update_Html()
    {

        echo '<div id="linkedin_error_div"></div>
              <form method="post" action="#" id="linkedin_share_form">
                  <div>
                      <textarea id="linkedin_share_comment" name="comment" maxlength="700" placeholder="Share an update..."></textarea>
                  </div>
                  <select id="linkedin_share_visibility" name="visibility">
                      <option value="anyone">Public</option>
                      <option value="connections-only">Connections</option>
                  </select>
                  <input type="submit" value="Share">
              </form>';

        return true;

    }

    function Network_Updates_Html($show_wrapper = true)
    {

        global $linkedin;

        $last_timestamp = time() * 1000;

        if (isset($_POST['direction']))
        {

            switch ($_POST['direction'])
            {

                case '-1': // Show older updates

                    $last_timestamp = Get_Last_Paginated_Call('network_updates', 'timestamp');

                    $last_timestamp -= 1; // Needs to be just a bit earlier than the last update

                    break;

            }

        }

        $network_updates = $linkedin->Get_Network_Updates(['before' => $last_timestamp]);

        Set_Last_Paginated_Call('network_updates', $network_updates);

        if ($show_wrapper)
            echo '<div id="linkedin_network_updates_div">';

        foreach ($network_updates->update as $update)
        {

            echo '<div class="linkedin_network_update_row_div">';

            Network_Update_Row_Content_Html($update);

            echo '</div>';

        }

        if ($show_wrapper)
        {

            echo '</div>';

            echo '<hr>';

            echo '<a href="#" id="linkedin_network_updates_show_more">Show more...</a>';

        }

        return true;

    }

    function View_Person_Html($id)
    {

        global $linkedin;

        $person = $linkedin->Get_Profile($id);

        // TODO: display data
        echo '<pre>';
        print_r($person);
        echo '</pre>';

    }

    function View_Company_Html($id)
    {

        global $linkedin;

        $company = $linkedin->Get_Company($id);
        $company_id = $company->id->__toString();
        $followed_companies = $linkedin->Get_Followed_Companies();

        $followed_ids = [];
        foreach ($followed_companies->company as $followed_company)
            $followed_ids[] = $followed_company->id->__toString();

        $already_following = in_array($company_id, $followed_ids);

        if (!$already_following)
            echo '<div><a href="#" id="linkedin_company_follow" data-id="' . $company_id . '">Follow</a></div>';

        else
            echo '<div><a href="#" id="linkedin_company_unfollow" data-id="' . $company_id . '">Unfollow</a></div>';

        echo '<div><a href="#" id="linkedin_company_products" data-id="' . $company_id . '">Products and Recommendations</a></div>';

        // TODO: display data
        echo '<pre>';
        print_r($company);
        echo '</pre>';

    }

    function View_Job_Html($id)
    {

        // TODO: display data
        echo 'JOB VIEW';

    }

    function View_Group_Html($id)
    {

        global $linkedin;

        $group = $linkedin->Get_Group($id);
        $group_id = $group->id->__toString();
        $joined_groups = $linkedin->Get_Joined_Groups();

        $joined_ids = [];
        foreach ($joined_groups->{'group-membership'} as $joined_group)
            $joined_ids[] = $joined_group->group->id->__toString();

        $already_joined = in_array($group_id, $joined_ids);

        if (!$already_joined)
            echo '<div><a href="#" id="linkedin_group_join" data-id="' . $group_id . '">Join</a></div>';

        else
            echo '<div><a href="#" id="linkedin_group_leave" data-id="' . $group_id . '">Leave</a></div>';

        // TODO: display data
        echo '<pre>';
        print_r($group);
        echo '</pre>';

    }

    function People_Search_Html($people_results = [])
    {

        $sort = isset($_POST['sort']) ? $_POST['sort'] : 'connections';
        $keywords = isset($_POST['keywords']) ? $_POST['keywords'] : '';
        $first_name = isset($_POST['first_name']) ? $_POST['first_name'] : '';
        $last_name = isset($_POST['last_name']) ? $_POST['last_name'] : '';
        $company_name = isset($_POST['company_name']) ? $_POST['company_name'] : '';
        $current_company = isset($_POST['current_company']) ? $_POST['current_company'] : '';
        $title = isset($_POST['title']) ? $_POST['title'] : '';
        $current_title = isset($_POST['current_title']) ? $_POST['current_title'] : '';
        $school_name = isset($_POST['school_name']) ? $_POST['school_name'] : '';
        $current_school = isset($_POST['current_school']) ? $_POST['current_school'] : '';
        $country_code = isset($_POST['country_code']) ? $_POST['country_code'] : '';
        $postal_code = isset($_POST['postal_code']) ? $_POST['postal_code'] : '';
        $distance = isset($_POST['distance']) ? $_POST['distance'] : '';

        echo '<div id="linkedin_error_div"></div>
              <form method="post" action="#" id="linkedin_people_search_form">
                  <div>
                      Sort by
                      <select id="linkedin_people_search_sort" name="sort">
                          <option value="connections" ' . ($sort == 'connections' ? 'selected="selected"' : '') . '>Number of connections</option>
                          <option value="recommenders"' . ($sort == 'recommenders' ? 'selected="selected"' : '') . '>Number of recommendations</option>
                          <option value="distance"' . ($sort == 'distance' ? 'selected="selected"' : '') . '>Closest to network</option>
                          <option value="relevance"' . ($sort == 'relevance' ? 'selected="selected"' : '') . '>Relevance to query</option>
                      </select>
                  </div>

                  <div><input id="linkedin_people_search_keywords" name="keywords" placeholder="Keywords" type="text" value="' . $keywords . '"></div>

                  <div>
                      <input id="linkedin_people_search_first_name" name="first_name" placeholder="First name" type="text" value="' . $first_name . '">
                      <input id="linkedin_people_search_last_name" name="last_name" placeholder="Last name" type="text" value="' . $last_name . '">
                  </div>

                  <div><input id="linkedin_people_search_company_name" name="company_name" placeholder="Company name" type="text" value="' . $company_name . '"></div>
                  <div>
                      <select id="linkedin_people_search_current_company" name="current_company">
                          <option value="" ' . ($current_company == '' ? 'selected="selected"' : '') . '>Currently / previously works at company</option>
                          <option value="true"' . ($current_company == 'true' ? 'selected="selected"' : '') . '>Currently works at company</option>
                          <option value="false"' . ($current_company == 'false' ? 'selected="selected"' : '') . '>Previously worked at company</option>
                      </select>
                  </div>

                  <div>
                      <input id="linkedin_people_search_title" name="title" placeholder="Title" type="text" value="' . $title . '">
                      <select id="linkedin_people_search_current_title" name="current_title">
                          <option value="" ' . ($current_title == '' ? 'selected="selected"' : '') . '>Current / past title</option>
                          <option value="true"' . ($current_title == 'true' ? 'selected="selected"' : '') . '>Current title</option>
                          <option value="false"' . ($current_title == 'false' ? 'selected="selected"' : '') . '>Past title</option>
                      </select>
                  </div>

                  <div>
                      <input id="linkedin_people_search_school_name" name="school_name" placeholder="School" type="text" value="' . $school_name . '">
                      <select id="linkedin_people_search_current_school" name="current_school">
                          <option value="" ' . ($current_school == '' ? 'selected="selected"' : '') . '>Current / past school</option>
                          <option value="true"' . ($current_school == 'true' ? 'selected="selected"' : '') . '>Current school</option>
                          <option value="false"' . ($current_school == 'false' ? 'selected="selected"' : '') . '>Past school</option>
                      </select>
                  </div>

                  <div>
                      <select id="linkedin_people_search_country_code" name="country_code">
                          <option value=""' . ($country_code == 'connections' ? 'selected="selected"' : '') . '>All countries</option>';

        echo Country_List_Options_Html($country_code);

        echo '        </select>
                  </div>

                  <div><input id="linkedin_people_search_postal_code" name="postal_code" placeholder="Postal code" type="text" value="' . $postal_code . '"></div>

                  <div><input id="linkedin_people_search_distance" name="distance" placeholder="Distance from location" type="number" value="' . $distance . '"> miles</div>

                  <input type="submit" value="Search">
              </form>';

        return true;

    }

    function Job_Search_Html($job_results = [])
    {

        $sort = isset($_POST['sort']) ? $_POST['sort'] : 'R';
        $keywords = isset($_POST['keywords']) ? $_POST['keywords'] : '';
        $company_name = isset($_POST['company_name']) ? $_POST['company_name'] : '';
        $job_title = isset($_POST['job_title']) ? $_POST['job_title'] : '';
        $country_code = isset($_POST['country_code']) ? $_POST['country_code'] : '';
        $postal_code = isset($_POST['postal_code']) ? $_POST['postal_code'] : '';
        $distance = isset($_POST['distance']) ? $_POST['distance'] : '';

        echo '<div id="linkedin_error_div"></div>
              <form method="post" action="#" id="linkedin_job_search_form">
                  <div>
                      Sort by
                      <select id="linkedin_job_search_sort" name="sort">
                          <option value="R" ' . ($sort == 'R' ? 'selected="selected"' : '') . '>Relationship to job</option>
                          <option value="DA"' . ($sort == 'DA' ? 'selected="selected"' : '') . '>Oldest first</option>
                          <option value="DD"' . ($sort == 'DD' ? 'selected="selected"' : '') . '>Newest first</option>
                      </select>
                  </div>

                  <div><input id="linkedin_job_search_keywords" name="keywords" placeholder="Keywords" type="text" value="' . $keywords . '"></div>

                  <div><input id="linkedin_job_search_company_name" name="company_name" placeholder="Company name" type="text" value="' . $company_name . '"></div>

                  <div><input id="linkedin_job_search_job_title" name="job_title" placeholder="Job title" type="text" value="' . $job_title . '"></div>

                  <div>
                      <select id="linkedin_job_search_country_code" name="country_code">
                          <option value=""' . ($country_code == 'connections' ? 'selected="selected"' : '') . '>All countries</option>';

        echo Country_List_Options_Html($country_code);

        echo '        </select>
                  </div>

                  <div><input id="linkedin_job_search_postal_code" name="postal_code" placeholder="Postal code" type="text" value="' . $postal_code . '"></div>

                  <div><input id="linkedin_job_search_distance" name="distance" placeholder="Distance from location" type="number" value="' . $distance . '"> miles</div>

                  <input type="submit" value="Search">
              </form>';

        return true;

    }

    function Company_Search_Html($company_results = [])
    {

        $sort = isset($_POST['sort']) ? $_POST['sort'] : 'relevance';
        $keywords = isset($_POST['keywords']) ? $_POST['keywords'] : '';

        echo '<div id="linkedin_error_div"></div>
              <form method="post" action="#" id="linkedin_company_search_form">
                  <div>
                      Sort by
                      <select id="linkedin_company_search_sort" name="sort">
                          <option value="relevance" ' . ($sort == 'relevance' ? 'selected="selected"' : '') . '>Relevance</option>
                          <option value="relationship"' . ($sort == 'relationship' ? 'selected="selected"' : '') . '>Relationship to company</option>
                          <option value="followers"' . ($sort == 'followers' ? 'selected="selected"' : '') . '>Number of followers</option>
                          <option value="company-size"' . ($sort == 'company-size' ? 'selected="selected"' : '') . '>Company size</option>
                      </select>
                  </div>

                  <div><input id="linkedin_company_search_keywords" name="keywords" placeholder="Keywords" type="text" value="' . $keywords . '"></div>

                  <input type="submit" value="Search">
              </form>';

        if (!empty($company_results))
        {

            echo '<hr>';

            $companies = $company_results->companies
                ->company;

            foreach ($companies as $company)
                Company_Row_Content_Html($company);

            echo '<hr>';

            $first_page = $company_results->companies['start'] == '0';
            $last_page = $company_results->companies['total'] == $company_results->companies['start'] + $company_results->companies['count'];

            if ($first_page)
                echo '&laquo; Previous';

            else
                echo '<a href="#" id="linkedin_company_search_prev">&laquo; Previous</a>';

            echo ' | ';

            if ($last_page)
                echo 'Next &raquo;';

            else
                echo '<a href="#" id="linkedin_company_search_next">Next &raquo;</a>';

        }

        return true;

    }

    function Country_List_Options_Html($selected_code = '')
    {

        global $linkedin;

        $countries = $linkedin->Get_Countries();

        foreach ($countries as $value => $name)
        {

            $selected = ($selected_code == $value ? ' selected="selected"' : '');

            echo '<option value="' . $value . '"' . $selected . '>' . $name . '</option>';

        }

        return true;

    }

    function Company_Row_Content_Html($company)
    {

        $id = $company->id;
        $name = $company->name;

        echo "<div><a href=\"#\" class=\"link\" data-type=\"company\" data-id=\"$id\">$name</a></div>";

    }

    function Group_Row_Content_Html($group)
    {

        $id = $group->id;
        $name = $group->name;

        echo "<div><a href=\"#\" class=\"link\" data-type=\"group\" data-id=\"$id\">$name</a></div>";

    }

    function Network_Update_Row_Content_Html($update)
    {

        if (isset($update->{'update-content'}
            ->person
            ->id)) {

            $id = $update->{'update-content'}
                ->person
                ->id;

            if ($id == 'private')
                return true;

        }

        switch ($update->{'update-type'})
        {

            case 'APPM': // Application
            case 'APPS': // Application

                // TODO: multiple activities
                $body = $update->{'update-content'}
                    ->person
                    ->{'person-activities'}
                    ->activity
                    ->body;

                $body = html_entity_decode($body);

                $timestamp = Format_Date($update->timestamp);

                echo "$body. $timestamp.";

                break;

            case 'CCEM': // Contact in uploaded address book joined LinkedIn

                // TODO: multiple people
                $connection_id = $update->{'update-content'}
                    ->person
                    ->connections
                    ->person
                    ->id;

                $connection_first_name = $update->{'update-content'}
                    ->person
                    ->connections
                    ->person
                    ->{'first-name'};

                $connection_last_name = $update->{'update-content'}
                    ->person
                    ->connections
                    ->person
                    ->{'last-name'};

                $timestamp = Format_Date($update->timestamp);

                $connection_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $connection_id .
                    '">' . $connection_first_name . ' ' . $connection_last_name . '</a>';

                echo "$connection_link has joined LinkedIn. $timestamp.";

                break;

            case 'CMPY': // Company follow

                $company_id = $update->{'update-content'}
                    ->company
                    ->id;

                $company = $update->{'update-content'}
                    ->company
                    ->name;

                $timestamp = Format_Date($update->timestamp);

                $company_link = '<a href="#" class="link" data-type="company" data-id="' .
                    $company_id .
                    '">' . $company . '</a>';

                if (isset($update->{'update-content'}->{'company-profile-update'}))
                    echo "$company_link updated their profile. $timestamp.";

                elseif (isset($update->{'update-content'}->{'company-job-update'}))
                {

                    $job_id = $update->{'update-content'}
                        ->{'company-job-update'}
                        ->job
                        ->id;

                    $job = $update->{'update-content'}
                        ->{'company-job-update'}
                        ->job
                        ->position
                        ->title;

                    $action_type = $update->{'update-content'}
                        ->{'company-job-update'}
                        ->action
                        ->code; // 'created' or 'updated'

                    $job_link = '<a href="#" class="link" data-type="job" data-id="' .
                        $job_id .
                        '">' . $job . '</a>';

                    echo "$company_link $action_type a job posting. $job_link. $timestamp.";

                }

                elseif (isset($update->{'update-content'}->{'company-status-update'}))
                    echo "$company_link changed their status. $timestamp.";

                elseif (isset($update->{'update-content'}->{'company-person-update'}))
                {

                    $person_id = $update->{'update-content'}
                        ->{'company-person-update'}
                        ->person
                        ->id;

                    $person_first_name = $update->{'update-content'}
                        ->{'company-person-update'}
                        ->person
                        ->{'first-name'};

                    $person_last_name = $update->{'update-content'}
                        ->{'company-person-update'}
                        ->person
                        ->{'last-name'};

                    $person_link = '<a href="#" class="link" data-type="person" data-id="' .
                        $person_id .
                        '">' . $person_first_name . ' ' . $person_last_name . '</a>';

                    echo "$company_link updated their relationship with $person_link. $timestamp.";

                }

                break;

            case 'CONN': // New connection

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                // TODO: multiple connections
                $connection_id = $update->{'update-content'}
                    ->person
                    ->connections
                    ->person
                    ->id;

                $connection_first_name = $update->{'update-content'}
                    ->person
                    ->connections
                    ->person
                    ->{'first-name'};

                $connection_last_name = $update->{'update-content'}
                    ->person
                    ->connections
                    ->person
                    ->{'last-name'};

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                $connection_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $connection_id .
                    '">' . $connection_first_name . ' ' . $connection_last_name . '</a>';

                echo "$update_link has a new connection. $connection_link. $timestamp.";

                break;

            case 'NCON': // New connection

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                echo "$update_link has connected with you. $timestamp.";

                break;

            case 'JGRP': // Joined a group

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                // TODO: multiple groups
                $group_id = $update->{'update-content'}
                    ->person
                    ->{'member-groups'}
                    ->{'member-group'}
                    ->id;

                $group = $update->{'update-content'}
                    ->person
                    ->{'member-groups'}
                    ->{'member-group'}
                    ->name;

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                $group_link = '<a href="#" class="link" data-type="group" data-id="' .
                    $group_id .
                    '">' . $group . '</a>';

                echo "$update_link joined group $group_link. $timestamp.";

                break;

            case 'JOBP': // Job posting

                $id = $update->{'update-content'}
                    ->job
                    ->{'job-poster'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->job
                    ->{'job-poster'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->job
                    ->{'job-poster'}
                    ->person
                    ->{'last-name'};

                $company_id = $update->{'update-content'}
                    ->job
                    ->company
                    ->id;

                $company = $update->{'update-content'}
                    ->job
                    ->company
                    ->name;

                $job_id = $update->{'update-content'}
                    ->job
                    ->id;

                $job = $update->{'update-content'}
                    ->job
                    ->position
                    ->title;

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                $job_link = '<a href="#" class="link" data-type="job" data-id="' .
                    $job_id .
                    '">' . $job . '</a>';

                $company_link = '<a href="#" class="link" data-type="company" data-id="' .
                    $company_id .
                    '">' . $company . '</a>';

                echo "$update_link posted a new job. $job_link at $company_link. $timestamp.";

                break;

            case 'MSFC': // Member starts following company

                $id = $update->{'update-content'}
                    ->{'company-person-update'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->{'company-person-update'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->{'company-person-update'}
                    ->person
                    ->{'last-name'};

                $company_id = $update->{'update-content'}
                    ->company
                    ->id;

                $company = $update->{'update-content'}
                    ->company
                    ->name;

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                                $id .
                                '">' . $first_name . ' ' . $last_name . '</a>';

                $company_link = '<a href="#" class="link" data-type="company" data-id="' .
                                    $company_id .
                                '">' . $company . '</a>';

                echo "$update_link is now following $company_link. $timestamp.";

                break;

            case 'PICT': // New profile picture
            case 'PICU': // New profile picture

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                echo "$update_link updated their profile picture. $timestamp.";

                break;

            case 'PFOL': // People follow

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                // TODO: multiple people
                $person_id = $update->{'update-content'}
                    ->person
                    ->following
                    ->people
                    ->person
                    ->id;

                $person_first_name = $update->{'update-content'}
                    ->person
                    ->following
                    ->people
                    ->person
                    ->{'first-name'};

                $person_last_name = $update->{'update-content'}
                    ->person
                    ->following
                    ->people
                    ->person
                    ->{'last-name'};

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                $person_link = '<a href="#" class="link" data-type="company" data-id="' .
                    $person_id .
                    '">' . $person_first_name . ' ' . $person_last_name . '</a>';

                echo "$update_link is now following $person_link. $timestamp.";

                break;

            case 'PREC': // Recommendation
            case 'SVPR': // Recommendation
            case 'RECU': // Recommendation

                if (isset($update->{'update-content'}
                    ->person
                    ->{'recommendations-given'}))
                {

                    $id = $update->{'update-content'}
                        ->person
                        ->id;

                    $first_name = $update->{'update-content'}
                        ->person
                        ->{'first-name'};

                    $last_name = $update->{'update-content'}
                        ->person
                        ->{'last-name'};

                    // TODO: multiple recommendations
                    $person_id = $update->{'update-content'}
                        ->person
                        ->{'recommendations-given'}
                        ->recommendation
                        ->recommendee
                        ->id;

                    $person_first_name = $update->{'update-content'}
                        ->person
                        ->{'recommendations-given'}
                        ->recommendation
                        ->recommendee
                        ->{'first-name'};

                    $person_last_name = $update->{'update-content'}
                        ->person
                        ->{'recommendations-given'}
                        ->recommendation
                        ->recommendee
                        ->{'last-name'};

                    $person_snippet = $update->{'update-content'}
                        ->person
                        ->{'recommendations-given'}
                        ->recommendation
                        ->{'recommendation-snippet'};

                    $timestamp = Format_Date($update->timestamp);

                    $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                        $id .
                        '">' . $first_name . ' ' . $last_name . '</a>';

                    $person_link = '<a href="#" class="link" data-type="person" data-id="' .
                        $person_id .
                        '">' . $person_first_name . ' ' . $person_last_name . '</a>';

                    echo "$update_link recommends $person_link. \"$person_snippet\". $timestamp.";

                }

                elseif (isset($update->{'update-content'}
                    ->person
                    ->{'recommendations-received'}))
                {

                    $id = $update->{'update-content'}
                        ->person
                        ->id;

                    $first_name = $update->{'update-content'}
                        ->person
                        ->{'first-name'};

                    $last_name = $update->{'update-content'}
                        ->person
                        ->{'last-name'};

                    // TODO: multiple recommendations
                    $person_id = $update->{'update-content'}
                        ->person
                        ->{'recommendations-received'}
                        ->recommendation
                        ->recommender
                        ->id;

                    $person_first_name = $update->{'update-content'}
                        ->person
                        ->{'recommendations-received'}
                        ->recommendation
                        ->recommender
                        ->{'first-name'};

                    $person_last_name = $update->{'update-content'}
                        ->person
                        ->{'recommendations-received'}
                        ->recommendation
                        ->recommender
                        ->{'last-name'};

                    $person_snippet = $update->{'update-content'}
                        ->person
                        ->{'recommendations-received'}
                        ->recommendation
                        ->{'recommendation-snippet'};

                    $person_snippet = Text_To_Links($person_snippet);

                    $timestamp = Format_Date($update->timestamp);

                    $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                        $id .
                        '">' . $first_name . ' ' . $last_name . '</a>';

                    $person_link = '<a href="#" class="link" data-type="person" data-id="' .
                        $person_id .
                        '">' . $person_first_name . ' ' . $person_last_name . '</a>';

                    echo "$update_link was recommended by $person_link.";
                    if (!empty($person_snippet))
                        echo " \"$person_snippet\".";

                    echo " $timestamp.";

                }

                break;

            case 'PROF': // Profile data
            case 'PRFX': // Extended profile data

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                echo "$update_link updated their profile. $timestamp.";

                break;

            case 'SHAR': // Sharing

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                $current_share = $update->{'update-content'}
                    ->person
                    ->{'current-share'};

                if (isset($current_share->comment))
                    $share = Text_To_Links($current_share->comment);

                else
                    $share = $current_share->content
                        ->{'submitted-url'};

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                echo "$update_link $share. $timestamp.";

                break;

            case 'STAT': // Status

                $id = $update->{'update-content'}
                    ->person
                    ->id;

                $first_name = $update->{'update-content'}
                    ->person
                    ->{'first-name'};

                $last_name = $update->{'update-content'}
                    ->person
                    ->{'last-name'};

                $status = $update->{'update-content'}
                    ->person
                    ->{'current-status'};

                $status = Text_To_Links($status);

                $timestamp = Format_Date($update->timestamp);

                $update_link = '<a href="#" class="link" data-type="person" data-id="' .
                    $id .
                    '">' . $first_name . ' ' . $last_name . '</a>';

                echo "$update_link $status. $timestamp.";

                break;

            case 'VIRL': // Viral (i.e. comments, likes)

                // TODO

                break;

        }

        return true;

    }

    function Get_Last_Paginated_Call($call_type, $value)
    {

        if (isset($_SESSION['i_linkedin'][$call_type][$value]))
            return $_SESSION['i_linkedin'][$call_type][$value];

        return false;

    }

    function Set_Last_Paginated_Call($call_type, $results)
    {

        if (!isset($_SESSION['i_linkedin'][$call_type]))
            $_SESSION['i_linkedin'][$call_type] = [];

        switch ($call_type)
        {

            case 'network_updates':

                $timestamp = null;

                if (isset($results->timestamp))
                    $timestamp = $results->timestamp->__toString();

                elseif (isset($results->update))
                {

                    $last_index = count($results->update) - 1;

                    if (isset($results->update[$last_index]) && isset($results->update[$last_index]->timestamp))
                        $timestamp = $results->update[$last_index]->timestamp->__toString();

                }

                if ($timestamp !== null)
                    $_SESSION['i_linkedin'][$call_type] = [
                        'timestamp' => $timestamp,
                    ];

                break;

            case 'company_search':

                $_SESSION['i_linkedin'][$call_type] = [
                    'start' => $results->companies['start']->__toString(),
                    'total' => $results->companies['total']->__toString(),
                    'count' => $results->companies['count']->__toString(),
                ];

                break;

        }

        return true;

    }

    function Set_Access_Token($access_token)
    {

        global $linkedin;

        if (!isset($_SESSION['i_linkedin']))
            $_SESSION['i_linkedin'] = [];

        $_SESSION['i_linkedin']['access_token'] = $access_token;

        $linkedin->Set_Access_Token($access_token);

        return true;

    }

    function Get_Access_Token()
    {

        if (!isset($_SESSION['i_linkedin']) || !isset($_SESSION['i_linkedin']['access_token']))
            return false;

        return $_SESSION['i_linkedin']['access_token'];

    }

    function Format_Date($timestamp)
    {

        return date('g:i:s A, jS M Y', substr($timestamp, 0, -3));

    }

    function Text_To_Links($text = '')
    {

        $regex = '/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/';
        $matches = [];

        // TODO: should open link in Coyote, for now new tab
        if (preg_match($regex, $text, $matches))
            return preg_replace($regex, '<a href="' . $matches[0] . '" target="_blank">' . $matches[0] . '</a>', $text);

        return $text;

    }

    function Current_Url($include_query = true)
    {

        $ssl = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on';

        $protocol = strtolower($_SERVER['SERVER_PROTOCOL']);
        $protocol = substr($protocol, 0, strpos($protocol, '/'));

        if ($ssl)
            $protocol .= 's';

        $port = $_SERVER['SERVER_PORT'];
        if (!$ssl && $port !== '80' || $ssl && $port !== '443')
            $port = ':' . $port;

        else
            $port = '';

        if (isset($_SERVER['HTTP_X_FORWARDED_HOST']))
            $host = $_SERVER['HTTP_X_FORWARDED_HOST'];

        else
        {

            if (isset($_SERVER['HTTP_HOST']))
                $host = $_SERVER['HTTP_HOST'];

            else
                $host = $_SERVER['SERVER_NAME'];

        }

        if ($include_query)
            $path = $_SERVER['REQUEST_URI'];

        else
            $path = $_SERVER['SCRIPT_NAME'];

        return $protocol . '://' . $host . $port . $path;

    }

?>
