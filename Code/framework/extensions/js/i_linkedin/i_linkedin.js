/*

    GreyOS Inc. - Integrated LinkedIn extension

    File name: i_linkedin.js (Version: 1.0)
    Description: This file contains the LinkedIn extension.

    Coded by Arron Bailiss (abailiss) and George Delaportas (G0D)

    GreyOS Inc.
    Copyright © 2014

*/



// Integrated LinkedIn
function i_linkedin()
{

    function utilities()
    {

        var me = this;

        function draw()
        {

            var me_draw = this;

            this.gui_init = function()
            {

                infinity.begin();

                me.status_bar.update(0);

                me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=start', function()
                {

                    if (vulcan.objects.by_id('linkedin_login_div') !== null) // Login
                    {

                        me.status_bar.update(1);

                        me.events.attach(1);

                    }

                    else if (vulcan.objects.by_id('linkedin_home_div') !== null) // Home
                    {

                        me.status_bar.update(2);

                        me.events.attach(2);

                        // TODO: remove hacked scrollbar once scrollbar extension is complete
                        var __gui = vulcan.objects.by_id(linkedin_bee.settings.general.id()),
                            __content = vulcan.objects.by_id(linkedin_bee.gui.config.window.content.id()),
                            __data = vulcan.objects.by_id(linkedin_bee.gui.config.window.content.data.id()),
                            __status_bar = vulcan.objects.by_id(linkedin_bee.gui.config.window.status_bar.id());

                        __gui.style.overflowY = 'scroll';
                        __content.style.overflow = 'visible';
                        __data.style.height = 'auto';
                        __status_bar.style.display = 'none';

                    }

                    infinity.end();

                });

                return true;

            };

            this.error_message = function(error_message)
            {

                var __element = vulcan.objects.by_id('linkedin_error_div');

                __element.innerHTML = error_message;

                return true;

            };

            this.clear_error_message = function()
            {

                me_draw.error_message('');

            };

        }

        function ajax()
        {

            this.data = function(element_id, args, callback, content_fill_mode)
            {

                if (element_id === undefined)
                    return false;

                if (content_fill_mode === undefined)
                    content_fill_mode = false;

                var __url = '/framework/extensions/ajax/i_linkedin/i_linkedin.php',
                    __data = (args === undefined) ? '' : args,
                    __ajax = new bull();

                __ajax.data(__url, __data, element_id, 1, 1, content_fill_mode, callback);

                return true;

            };

        }

        function events()
        {

            function network_updates()
            {

                this.get = function(event, direction)
                {

                    event.preventDefault();

                    if (direction === undefined)
                        direction = 0;

                    var __data;

                    if (direction === 0) // Show entire page
                    {

                        __data = 'action=network_updates'
                            + '&direction=' + direction;

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __data, function()
                        {

                            me.status_bar.update(7);

                            me.events.attach(7);

                            infinity.end();

                        });

                    }

                    else if (direction === -1) // Append response
                    {

                        __data = 'action=network_updates'
                            + '&direction=' + direction
                            + '&no_wrapper=true';

                        me.ajax.data('linkedin_network_updates_div', __data, function()
                        {

                            me.status_bar.update(7);

                            me.events.attach(7);

                            infinity.end();

                        }, true);

                    }

                };

            }

            function company_search()
            {

                this.get = function(event, direction)
                {

                    event.preventDefault();

                    if (direction === undefined)
                        direction = 0;

                    var __sort = vulcan.objects.by_id('linkedin_company_search_sort'),
                        __keywords = vulcan.objects.by_id('linkedin_company_search_keywords');

                    // TODO: data validation

                    utils.draw.clear_error_message();

                    var __data = 'action=company_search'
                        + '&sort=' + __sort.value
                        + '&keywords=' + __keywords.value
                        + '&direction=' + direction;

                    infinity.begin();

                    me.status_bar.update(0);

                    utils.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __data, function()
                    {

                        infinity.end();

                        me.status_bar.update(6);

                        me.events.attach(6);

                    });

                };

            }

            this.attach = function(action)
            {

                if (!vulcan.validation.numerics.is_number(action))
                    return false;

                if (action === 1) // Login
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_access_token'), 'click', function(event)
                    {

                        event.preventDefault();

                        // Center popup window
                        var __window_height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
                            __window_width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                            __new_window_height = 700,
                            __new_window_width = 400,
                            __top = (__window_height / 2) - (__new_window_height / 2),
                            __left = (__window_width / 2) - (__new_window_width / 2);

                        config.auth_window = window.open('framework/extensions/ajax/i_linkedin/i_linkedin.php?action=authorization',
                            'LinkedIn_Login',
                            'location=0,status=0,width=' + __new_window_width + ',height=' + __new_window_height + ',top=' + __top + ',left=' + __left);


                        me.check_auth_closed();

                    });

                    return true;

                }

                else if (action === 2) // Home
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_logout_link'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=logout', function()
                        {

                            me.status_bar.update(1);

                            me.events.attach(1);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_network_updates_link'), 'click', function(event)
                    {

                        event.preventDefault();

                        me.events.network_updates.get(event);

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_companies_followed'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=companies_followed', function()
                        {

                            me.status_bar.update(11);

                            me.events.attach(11);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_companies_suggested'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=companies_suggested', function()
                        {

                            me.status_bar.update(12);

                            me.events.attach(12);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_groups_joined'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=groups_joined', function()
                        {

                            me.status_bar.update(14);

                            me.events.attach(14);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_groups_suggested'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=groups_suggested', function()
                        {

                            me.status_bar.update(15);

                            me.events.attach(15);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_people_search_link'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=people_search', function()
                        {

                            me.status_bar.update(4);

                            me.events.attach(4);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_job_search_link'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=job_search', function()
                        {

                            me.status_bar.update(5);

                            me.events.attach(5);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_company_search_link'), 'click', function(event)
                    {

                        event.preventDefault();

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), 'action=company_search', function()
                        {

                            me.status_bar.update(6);

                            me.events.attach(6);

                            infinity.end();

                        });

                    });

                    return true;

                }

                else if (action === 3) // View person
                {

                    // TODO

                    return true;

                }

                else if (action === 4) // People search
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_people_search_form'), 'submit', function(event)
                    {

                        event.preventDefault();

                        var __sort = vulcan.objects.by_id('linkedin_people_search_sort'),
                            __keywords = vulcan.objects.by_id('linkedin_people_search_keywords'),
                            __first_name = vulcan.objects.by_id('linkedin_people_search_first_name'),
                            __last_name = vulcan.objects.by_id('linkedin_people_search_last_name'),
                            __company_name = vulcan.objects.by_id('linkedin_people_search_company_name'),
                            __current_company = vulcan.objects.by_id('linkedin_people_search_current_company'),
                            __title = vulcan.objects.by_id('linkedin_people_search_title'),
                            __current_title = vulcan.objects.by_id('linkedin_people_search_current_title'),
                            __school_name = vulcan.objects.by_id('linkedin_people_search_school_name'),
                            __current_school = vulcan.objects.by_id('linkedin_people_search_current_school'),
                            __country_code = vulcan.objects.by_id('linkedin_people_search_country_code'),
                            __postal_code = vulcan.objects.by_id('linkedin_people_search_postal_code'),
                            __distance = vulcan.objects.by_id('linkedin_people_search_distance');

                        // TODO: data validation

                        utils.draw.clear_error_message();

                        var __data = 'action=people_search'
                                   + '&sort=' + __sort.value
                                   + '&keywords=' + __keywords.value
                                   + '&first_name=' + __first_name.value
                                   + '&last_name=' + __last_name.value
                                   + '&company_name=' + __company_name.value
                                   + '&current_company=' + __current_company.value
                                   + '&title=' + __title.value
                                   + '&current_title=' + __current_title.value
                                   + '&school_name=' + __school_name.value
                                   + '&current_school=' + __current_school.value
                                   + '&country_code=' + __country_code.value
                                   + '&postal_code=' + __postal_code.value
                                   + '&distance=' + __distance.value;

                        infinity.begin();

                        me.status_bar.update(0);

                        utils.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __data, function()
                        {

                            infinity.end();

                            me.status_bar.update(4);

                            me.events.attach(4);

                        });

                    });

                    return true;

                }

                else if (action === 5) // Job search
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_job_search_form'), 'submit', function(event)
                    {

                        event.preventDefault();

                        var __sort = vulcan.objects.by_id('linkedin_job_search_sort'),
                            __keywords = vulcan.objects.by_id('linkedin_job_search_keywords'),
                            __company_name = vulcan.objects.by_id('linkedin_job_search_company_name'),
                            __job_title = vulcan.objects.by_id('linkedin_job_search_job_title'),
                            __country_code = vulcan.objects.by_id('linkedin_job_search_country_code'),
                            __postal_code = vulcan.objects.by_id('linkedin_job_search_postal_code'),
                            __distance = vulcan.objects.by_id('linkedin_job_search_distance');

                        // TODO: data validation

                        utils.draw.clear_error_message();

                        var __data = 'action=job_search'
                            + '&sort=' + __sort.value
                            + '&keywords=' + __keywords.value
                            + '&company_name=' + __company_name.value
                            + '&job_title=' + __job_title.value
                            + '&country_code=' + __country_code.value
                            + '&postal_code=' + __postal_code.value
                            + '&distance=' + __distance.value;

                        infinity.begin();

                        me.status_bar.update(0);

                        utils.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __data, function()
                        {

                            infinity.end();

                            me.status_bar.update(5);

                            me.events.attach(5);

                        });

                    });

                }

                else if (action === 6) // Company search
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_company_search_form'), 'submit', me.events.company_search.get);

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_company_search_prev'), 'click', function(event)
                    {

                        event.preventDefault();

                        me.events.company_search.get(event, -1);

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_company_search_next'), 'click', function(event)
                    {

                        event.preventDefault();

                        me.events.company_search.get(event, 1);

                    });

                }

                else if (action === 7) // Network updates
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_share_form'), 'submit', function(event)
                    {

                        event.preventDefault();

                        var __comment = vulcan.objects.by_id('linkedin_share_comment'),
                            __visibility = vulcan.objects.by_id('linkedin_share_visibility');

                        if (__comment.value.length < 1)
                            utils.draw.error_message('Please enter your update message.');

                        else if (__comment.value.length > 700)
                            utils.draw.error_message('Your update message can not be longer than 700 characters.');

                        else
                        {

                            utils.draw.clear_error_message();

                            var __data = 'action=share'
                                + '&comment=' + __comment.value
                                + '&visibility=' + __visibility.value;

                            infinity.begin();

                            me.status_bar.update(0);

                            utils.ajax.data('linkedin_network_updates_div', __data, function()
                            {

                                infinity.end();

                                me.status_bar.update(2);

                                me.events.attach(2);

                                __comment.value = '';

                            });

                        }

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_network_updates_show_more'), 'click', function(event)
                    {

                        event.preventDefault();

                        me.events.network_updates.get(event, -1);

                    });

                }

                else if (action === 8) // View company
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_company_follow'), 'click', function(event)
                    {

                        event.preventDefault();

                        var __id = this.getAttribute('data-id'),
                            __args = 'action=company_follow&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(8);

                            me.events.attach(8);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_company_unfollow'), 'click', function(event)
                    {

                        event.preventDefault();

                        var __id = this.getAttribute('data-id'),
                            __args = 'action=company_unfollow&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(8);

                            me.events.attach(8);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_company_products'), 'click', function(event)
                    {

                        event.preventDefault();

                        var __id = this.getAttribute('data-id'),
                            __args = 'action=companies_products&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(13);

                            me.events.attach(13);

                            infinity.end();

                        });

                    });

                    return true;

                }

                else if (action === 9) // View job
                {

                    // TODO

                    return true;

                }

                else if (action === 10) // View group
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_group_join'), 'click', function(event)
                    {

                        event.preventDefault();

                        var __id = this.getAttribute('data-id'),
                            __args = 'action=group_join&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(10);

                            me.events.attach(10);

                            infinity.end();

                        });

                    });

                    vulcan.events.attach(config.id, vulcan.objects.by_id('linkedin_group_leave'), 'click', function(event)
                    {

                        event.preventDefault();

                        var __id = this.getAttribute('data-id'),
                            __args = 'action=group_leave&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(10);

                            me.events.attach(10);

                            infinity.end();

                        });

                    });

                    return true;

                }

                else if (action === 11) // Followed companies
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    return true;

                }

                else if (action === 12) // Suggested companies
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    return true;

                }

                else if (action === 13) // Company products
                {

                    // TODO

                    return true;

                }

                else if (action === 14) // Joined groups
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    return true;

                }

                else if (action === 15) // Suggested groups
                {

                    vulcan.events.attach(config.id, vulcan.objects.by_class('link'), 'click', me.events.generic_link);

                    return true;

                }

                else
                    return false;

            };

            this.generic_link = function(event)
            {

                event.preventDefault();

                var __type = this.getAttribute('data-type'),
                    __id = this.getAttribute('data-id');

                switch (__type)
                {

                    case 'person':

                        var __args = 'action=view&type=' + __type + '&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(3);

                            me.events.attach(3);

                            infinity.end();

                        });

                        break;

                    case 'company':

                        var __args = 'action=view&type=' + __type + '&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(8);

                            me.events.attach(8);

                            infinity.end();

                        });

                        break;

                    case 'job':

                        var __args = 'action=view&type=' + __type + '&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(9);

                            me.events.attach(9);

                            infinity.end();

                        });

                        break;

                    case 'group':

                        var __args = 'action=view&type=' + __type + '&id=' + __id;

                        infinity.begin();

                        me.status_bar.update(0);

                        me.ajax.data(linkedin_bee.gui.config.window.content.data.id(), __args, function()
                        {

                            me.status_bar.update(10);

                            me.events.attach(10);

                            infinity.end();

                        });

                        break;

                }

            };

            this.company_search = new company_search();
            this.network_updates = new network_updates();

        }

        function status_bar()
        {

            this.update = function(action)
            {

                if (!vulcan.validation.numerics.is_number(action))
                    return false;

                var __status_message = null;

                if (action === 0)
                    __status_message = 'Loading...';

                else if (action === 1)
                    __status_message = 'Sign in';

                else if (action === 2)
                    __status_message = 'Home';

                else if (action === 3)
                    __status_message = 'Profile';

                else if (action === 4)
                    __status_message = 'People search';

                else if (action === 5)
                    __status_message = 'Job search';

                else if (action === 6)
                    __status_message = 'Company search';

                else if (action === 7)
                    __status_message = 'Network updates';

                else if (action === 8)
                    __status_message = 'Company';

                else if (action === 9)
                    __status_message = 'Job';

                else if (action === 10)
                    __status_message = 'Group';

                else if (action === 11)
                    __status_message = 'Followed companies';

                else if (action === 12)
                    __status_message = 'Suggested companies';

                else if (action === 13)
                    __status_message = 'Products and Recommendations';

                else if (action === 14)
                    __status_message = 'Joined groups';

                else if (action === 15)
                    __status_message = 'Suggested groups';

                else
                    return false;

                linkedin_bee.settings.data.window.labels.status_bar(__status_message);

                return true;

            };

        }

        this.check_auth_closed = function()
        {

            if (config.auth_window && config.auth_window.closed)
            {

                window.clearInterval(config.auth_window_timer);

                me.draw.gui_init();

            }

            else
                config.auth_window_timer = setTimeout(me.check_auth_closed, 500);

        };

        this.status_bar = new status_bar();
        this.events = new events();
        this.ajax = new ajax();
        this.draw = new draw();

    }

    function config_model()
    {

        this.id = 'i_linkedin';
        this.auth_window = null;
        this.auth_window_timer = null;

    }

    this.get_bee = function()
    {

        if (is_init === false)
            return false;

        return linkedin_bee;

    };

    this.init = function()
	{

        if (is_init === true)
            return false;

        vulcan.graphics.apply_theme('/framework/extensions/js/i_linkedin/themes', 'i_linkedin');

        infinity = dev_box.get('infinity');
        scrollbar = dev_box.get('scrollbar');
        scrollbar.init(cosmos);
        linkedin_bee = dev_box.get('bee');
        fx = dev_box.get('fx');
        fx.init(cosmos);

        linkedin_bee.init(cosmos, config.id, 2);
        linkedin_bee.settings.data.window.labels.title('LinkedIn');
        linkedin_bee.settings.data.window.labels.status_bar('Sign in');
        linkedin_bee.gui.position.left(300);
        linkedin_bee.gui.position.top(30);
        linkedin_bee.gui.size.width(350);
        linkedin_bee.gui.size.height(410);
        linkedin_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
        linkedin_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
        linkedin_bee.on('open', function() { linkedin_bee.gui.fx.fade.into(); });
        linkedin_bee.on('opened', function() { return utils.draw.gui_init(); });
        linkedin_bee.on('dragging', function()
                                    {

                                        linkedin_bee.gui.fx.opacity.settings.set(0.7);
                                        linkedin_bee.gui.fx.opacity.apply();

                                    });
        linkedin_bee.on('dragged', function() { linkedin_bee.gui.fx.opacity.reset(); });
        linkedin_bee.on('close', function() { linkedin_bee.gui.fx.fade.out(); });

        is_init = true;

        return true;

	};

    this.cosmos = function(cosmos_object)
    {

        if (cosmos_exists === true)
            return false;

        if (cosmos_object === undefined)
            return false;

        cosmos = cosmos_object;

        vulcan = cosmos.hub.access('vulcan');
        matrix = cosmos.hub.access('matrix');
        dev_box = cosmos.hub.access('dev_box');

        colony = matrix.get('colony');
        swarm = matrix.get('swarm');
        pythia = matrix.get('pythia');

        cosmos_exists = true;

        return true;

    };

    var cosmos_exists = false,
        is_init = false,
        cosmos = null,
        vulcan = null,
        matrix = null,
        dev_box = null,
        pythia = null,
        infinity = null,
        scrollbar = null,
        colony = null,
        swarm = null,
        fx = null,
        linkedin_bee = null,
        config = new config_model(),
        utils = new utilities();

}
