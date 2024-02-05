/*
    GreyOS - Teal Mail (Version: 1.5)

    File name: teal_mail.js
    Description: This file contains the Teal Mail application.

    Coded by Mirko Lučić (mands) and George Delaportas (G0D)
    Copyright © 2013 - 2024
    Open Software License (OSL 3.0)
*/

// Teal Mail
function teal_mail()
{
	var self = this;

	function events()
	{
		this.general = function()
		{
			vulcan.events.attach(id, vulcan.objects.by_id('pm_notifications_box'), 'click', 
			function(event_object)
            {
				event_object.preventDefault();

				utils.hide_notification();
            });

			return true;
		};

		this.add_account = function()
		{
			// Attach select account event
			var __mail_host_array = vulcan.objects.by_class('pm_host_box');

			for (var i = 0; i < __mail_host_array.length; i++)
			{
				vulcan.events.attach(id, __mail_host_array[i], 'click', 
				function(event_object)
				{
					event_object.preventDefault();

					var __id = this.getAttribute('data-id');
					add_acc.select_mail_acc(__id);
				});
			}

			// Attach add acc btn event
			vulcan.events.attach(id, vulcan.objects.by_id('add_mail_account'), 'click', 
			function(event_object)
			{
				event_object.preventDefault();

				var __name = vulcan.objects.by_id('pm_acc_name').value;
				var __email = vulcan.objects.by_id('pm_username').value;
				var __gmail_auth = vulcan.objects.by_id('gmail_auth').value;
				var __pass = vulcan.objects.by_id('pm_password').value;
				var __host = add_acc.get_selected_host();
				
				if ((__name === null) || (__email === null) || (__gmail_auth === null) || (__pass === null) || (__host === null))
					return false;

				add_acc.new_acc(__name, __email, __gmail_auth, __pass, __host);
			});

			vulcan.events.attach(id, vulcan.objects.by_id('pm_password'), 'keydown', 
			function(event_object)
			{
				utils.enter_to_click(event_object, this.getAttribute('data-celement'));
			});

			return true;
		};

		this.add_account_btn = function()
		{
			vulcan.events.attach(id, vulcan.objects.by_id('add_acc_form'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				add_acc.print.form();
			});

			return true;
		};

		this.gmail_auth = function()
		{
			vulcan.events.attach(id, vulcan.objects.by_id('gmail_auth_open'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				add_acc.open_gmail_auth();
			});

			vulcan.events.attach(id, vulcan.objects.by_id('continue_add_acc'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				add_acc.continue_add_acc();
			});

			return true;
		};

		this.mail_accounts = function()
		{
			var __mail_login_psw = vulcan.objects.by_class('pm_login_psw');

			for (var i = 0; i < __mail_login_psw.length; i++)
			{
				vulcan.events.attach(id, __mail_login_psw[i], 'keydown',
				function(event_object)
				{
					utils.enter_to_click(event_object, this.getAttribute('data-celement'));
				}, true);
			}

			var __mail_login_btn = vulcan.objects.by_class('pm_login_btn');

			for (var i = 0; i < __mail_login_btn.length; i++)
			{
				vulcan.events.attach(id, __mail_login_btn[i], 'click',
				function(event_object)
				{
					event_object.preventDefault();

					var __id = this.getAttribute('data-id');
					var __pass = vulcan.objects.by_id('identity_id_' + __id).value;
					
					if (!__pass)
						return false;

					mail_identity.login(__id, __pass);
				});
			}

			var __mail_accs = vulcan.objects.by_class('pm_account');

			for (var i = 0; i < __mail_accs.length; i++)
			{
				vulcan.events.attach(id, __mail_accs[i], 'click',
				function(event_object)
				{
					event_object.preventDefault();

					var __id = this.getAttribute('data-id');

					if (this.id === 'inactive')
					{
						mail_identity.toggle(__id, false);

						return false;
					}
					else if (this.id === 'current')
					{
						mail_identity.toggle(__id, false);

						return false;
					}
					else
						mail_identity.load_session(__id);
				});
			}

			return true;
		};

		this.mail_account = function()
		{
			// Mail indentity folders
			var __mail_folders_array = vulcan.objects.by_class('pm_folder');

			for (var i = 0; i < __mail_folders_array.length; i++)
			{
				vulcan.events.attach(id, __mail_folders_array[i], 'click',
				function(event_object)
				{
					event_object.preventDefault();

					var __folder = this.getAttribute('data-folder');

					mail_identity.load_folder(__folder);
				});
			}

			vulcan.events.attach(id, vulcan.objects.by_id('pm_check_inbox'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				utils.check_new_mails();
			});

			vulcan.events.attach(id, vulcan.objects.by_id('pm_compose_mail'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				compose.print_form('', '', '', '');

				helper.scroll_fix('pm_right');

				return true;
			});

			vulcan.events.attach(id, vulcan.objects.by_id('pm_logout'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				mail_identity.logout();
			});

			vulcan.events.attach(id, vulcan.objects.by_id('pm_delete_acc'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __id = config.identity_id;

				mail_identity.delete(__id);
			});

			return true;
		};

		this.msg_list = function()
		{
			// Attach message list event listeners
			var __msg_list = vulcan.objects.by_class('pm_msg_list_item_2');

			for (var i = 0; i < __msg_list.length; i++)
			{
				vulcan.events.attach(id, __msg_list[i], 'click',
				function(event_object)
				{
					event_object.preventDefault();

					var __uid = this.id;

					msg_list.read_msg(__uid);
										
					return true;
				});
			}
			
			// Attach message list event listeners
			var __msg_preview = vulcan.objects.by_class('pm_msg_preview');

			for (var i = 0; i < __msg_preview.length; i++)
			{
				vulcan.events.attach(id, __msg_preview[i], 'mouseover',
				function(event_object)
				{
					event_object.preventDefault();
									
					var __uid = this.getAttribute('data-uid');
					
					msg_list.get_preview(__uid);
															
					return true;
				});
			}
			
			// Attach message list checkbox event listeners
			var __msg_list_checks = vulcan.objects.by_class('pm_msg_cb');

			for (var i = 0; i < __msg_list_checks.length; i++)
			{
				vulcan.events.attach(id, __msg_list_checks[i], 'change',
				function(event_object)
				{
					event_object.preventDefault();

					var __id = this.id;

					if (__id === 'pm_msg_cb_master')
					{
						var __cb_array = vulcan.objects.by_class('pm_msg_cb');

						for (var i = 0; i < __cb_array.length; i++) 
							vulcan.objects.by_id(__cb_array[i].id).checked = this.checked;
					}

					msg_list.cb_change();
				});
			}

			vulcan.events.attach(id, vulcan.objects.by_id('msg_list_delete'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __uids = msg_list.get_selected();

				if (__uids !== false)
                    msg_list.delete(__uids);
			});

			vulcan.events.attach(id, vulcan.objects.by_id('change_msg_flag_u'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __flag = this.getAttribute('data-flag');
				var __uids = msg_list.get_selected();
				
				if (__uids !== false)
					msg_list.change_flag(__uids, __flag);
			});

			vulcan.events.attach(id, vulcan.objects.by_id('change_msg_flag_s'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __flag = this.getAttribute('data-flag');
				var __uids = msg_list.get_selected();
				
				if (__uids !== false)
					msg_list.change_flag(__uids, __flag);
			});

			vulcan.events.attach(id, vulcan.objects.by_id('pm_search_input'), 'keydown',
			function(event_object)
			{
				var keycode = teal_mail_bee.gui.keys.get(event_object);

				if (keycode === 13)
				{
					var __search_query = vulcan.objects.by_id('pm_search_input').value;

					msg_list.search(__search_query);
				}
			});
		};

		this.message_view = function()
		{
			vulcan.events.attach(id, vulcan.objects.by_id('pm_msg_back'), 'click',
			function(event_object)
			{
				event_object.preventDefault();
				var __uid = this.getAttribute('data-uid');
				
				msg_list.show_list();
				
				msg_list.mark_as_read(__uid);
				
				vulcan.objects.by_id('pm_msg_view').innerHTML = '';
			});
			
			vulcan.events.attach(id, vulcan.objects.by_id('pm_msg_delete'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __uid = this.getAttribute('data-uid');

				message.delete(__uid);
			});

			vulcan.events.attach(id, vulcan.objects.by_id('msg_reply'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __to = this.getAttribute('data-to');
				var __subject = vulcan.objects.by_id('pm_subject_header').innerHTML;

				if ((__subject.substring(0, 3) !== 'RE:') && ((__subject.substring(0, 3) !== 'Re:')))
					__subject = 'Re:' + __subject;

				compose.print_form(__to, '', __subject, '');

				helper.scroll_fix('pm_right');
			});

			vulcan.events.attach(id, vulcan.objects.by_id('msg_reply_to_all'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __to = this.getAttribute('data-to');
				var __subject = vulcan.objects.by_id('pm_subject_header').innerHTML;

				if ((__subject.substring(0, 3) !== 'RE:') && ((__subject.substring(0, 3) !== 'Re:'))) 
					__subject = 'Re:' + __subject;

				compose.print_form(__to, '', __subject, '');

				helper.scroll_fix('pm_right');
			});

			// Attach listeners for yt links
			var __yt_anchors = vulcan.objects.by_class('pm_yt_video');

			for (var i = 0; i < __yt_anchors.length; i++)
			{
				vulcan.events.attach(id, __yt_anchors[i], 'click',
				function(event_object)
				{
					event_object.preventDefault();

					var __video_id = message.utils.yt_anchor_parse(this.href);

					//$.getJSON('http://gdata.youtube.com/feeds/api/videos/'+video_id+'?v=2&alt=jsonc',function(data,status,xhr){
					//__Open_YT_Video_Bee(data.data.title, video_id, __global_yt_swarm, __global_yt_pythia);	});
				});
			}

			// Attach listeners for email addresses
			var __email_anchors = vulcan.objects.by_class('pm_email_link');

			for (var i = 0; i < __email_anchors.length; i++)
			{
				vulcan.events.attach(id, __email_anchors[i], 'click',
				function(event_object)
				{
					event_object.preventDefault();

					var address = this.href;
					compose.print_form(address, '', '', '');

					helper.scroll_fix('pm_right');
				});
			}

			return true;
		};

		this.msg_pagination = function()
		{

			// Attach message pagination event listeners
			var __msg_pgn = vulcan.objects.by_class('pm_msg_pgn');

			for (var i = 0; i < __msg_pgn.length; i++)
			{
				vulcan.events.attach(id, __msg_pgn[i], 'click',
				function(event_object)
				{
					event_object.preventDefault();

					var __page_num = this.getAttribute('data-page');

					msg_list.paginate(__page_num);
				});
			}

			return true;
		};

		this.compose_form = function()
		{
			vulcan.events.attach(id, vulcan.objects.by_id('send_email'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				var __from = vulcan.objects.by_id('compose_from').value;
				var __to = vulcan.objects.by_id('compose_mail_to').value;
				var __cc = vulcan.objects.by_id('compose_mail_cc').value;
				var __bcc = vulcan.objects.by_id('compose_mail_bcc').value;
				var __reply_to = vulcan.objects.by_id('compose_mail_replyto').value;
				var __subject = vulcan.objects.by_id('compose_mail_subject').value;
				var __msg = vulcan.objects.by_id('composebody').value;

				compose.send(__from, __to, __cc, __bcc, __reply_to, __subject, __msg);
			});

			vulcan.events.attach(id, vulcan.objects.by_id('cc-link'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				compose.show_row('cc');
			});

			vulcan.events.attach(id, vulcan.objects.by_id('bcc-link'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				compose.show_row('bcc');
			});

			vulcan.events.attach(id, vulcan.objects.by_id('replyto-link'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				compose.show_row('replyto');
			});

			vulcan.events.attach(id, vulcan.objects.by_id('cc-delete-link'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				compose.hide_row('cc');
			});

			vulcan.events.attach(id, vulcan.objects.by_id('bcc-delete-link'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				compose.hide_row('bcc');
			});

			vulcan.events.attach(id, vulcan.objects.by_id('replyto-delete-link'), 'click',
			function(event_object)
			{
				event_object.preventDefault();

				compose.hide_row('replyto');
			});

			return true;
		};
	}

	function add_account_model()
	{
		var me = this;

        function add_acc_print()
        {
			this.button = function()
			{
				var __add_acc_btn = '<h3 class="add_acc_title" id="' + id + '_add_acc_form">+ Add new account<\/h3>';

				print.into_tag('add_acc_box', __add_acc_btn);

				attach_events.add_account_btn();
			
				return true;
			};

			this.form = function()
			{
				var __add_acc_form= '<h4 class="pm_message">Add and Connect your mail account to GreyOS!<\/h4>' +
									'<div class="pm_connect_body"><a class="pm_host_box" id="' + id + '_pm_host" data-id="gmail.com">' +
									'<i class="pm_host_icon gmail_icon"><\/i>' +
									'<span class="pm_host_name1">Connect and Add<\/span>' +
									'<span class="pm_host_name">GMail<\/span><\/a>' +

									'<a class="pm_host_box" id="' + id + '_pm_host" data-id="yahoo.com">' +
									'<i class="pm_host_icon yahoo_icon"><\/i>' +
									'<span class="pm_host_name1">Connect and Add<\/span>' +
									'<span class="pm_host_name">Yahoo Mail<\/span><\/a>' +

									'<a class="pm_host_box" id="' + id + '_pm_host" data-id="Aol Mail">' +
									'<i class="pm_host_icon aol_icon"><\/i>' +
									'<span class="pm_host_name1">Connect and Add<\/span>' +
									'<span class="pm_host_name">Aol Mail<\/span><\/a>' +

									'<a class="pm_host_box" id="' + id + '_pm_host" data-id="Zoho Mail">' +
									'<i class="pm_host_icon zoho_icon"><\/i>' +
									'<span class="pm_host_name1">Connect and Add<\/span>' +
									'<span class="pm_host_name">Zoho Mail<\/span><\/a>' +
									'<\/div>' +

									'<br style="clear:both" \/><br>' +
									'<div id="' + id + '_new_mail_account_set" style="display:none">' +
									'<input type="hidden" id="' + id + '_gmail_auth" size="15" value="0"\/>' +
									'<label>Account name:<\/label> <br> <input type="text" class="settings_form" id="' + id + '_pm_acc_name" size="15" \/><br>' +
									'<label>Email:<\/label> <br> <input type="text" class="settings_form" id="' + id + '_pm_username" size="15" \/><br>' +
									'<label>Password:<\/label> <br> <input type="password" class="settings_form" id="' + id + '_pm_password" size="15" ' +
									'data-celement="add_mail_account"\/><br><br>' +
									'<input type="submit" class="settings_form" id="' + id + '_add_mail_account" value="Add Account" \/><\/div>' +
									'<div id="' + id + '_gmail_notification"><\/div>';

				print.into_tag('pm_right', __add_acc_form);

				attach_events.add_account();

				return true;
			};

			this.gmail_auth = function()
			{
				var __auth_msg = 'In order to use GMail with Teal Mail, you need to allow GreyOS access to your Google account. <br><br><br>' +
								'Click <a href="#" id="' + id + '_gmail_auth_open">HERE</a> to allow access.<br><br> ' +
								'When you are done click <a href="#" id="' + id + '_continue_add_acc">HERE</a> to continue.<br><br>';

				print.into_tag('gmail_notification', __auth_msg);

				attach_events.gmail_auth();

				return true;
			};
		}

		this.select_mail_acc = function(id)
		{
			if (vulcan.validation.misc.is_undefined(id))
				return false;

			me.reset_form();

			var __acc_form = vulcan.objects.by_id('new_mail_account_set');

			__acc_form.style.display = '';

			var __mail_acc_array = vulcan.objects.by_class('pm_host_box');

			for (var i = 0; i < __mail_acc_array.length; i++)
			{
				var __this_id = __mail_acc_array[i].getAttribute('data-id');

				if (__this_id === id)
					__mail_acc_array[i].className = 'pm_host_box selected';
				else
					__mail_acc_array[i].className = 'pm_host_box';
			}

			if (id === 'gmail.com' )
				__acc_form.style.paddingLeft = '0px';
			else if (id === 'yahoo.com' )
				__acc_form.style.paddingLeft = '143px';
			else if (id === 'Aol Mail' )
				__acc_form.style.paddingLeft = '286px';
			else if (id === 'Zoho Mail' )
				__acc_form.style.paddingLeft = '429px';

			return true;
		};

		this.reset_form = function()
		{
			fx.visibility.hide('gmail_notification', 1 );
			vulcan.objects.by_id('pm_acc_name').value = '';
			vulcan.objects.by_id('pm_username').value = '';
			vulcan.objects.by_id('pm_password').value = '';

			return true;
		};

		this.get_selected_host = function()
		{
			var __mail_acc_array = vulcan.objects.by_class('pm_host_box selected');

			for (var i = 0; i < __mail_acc_array.length; i++)
			{
				return __mail_acc_array[i].getAttribute('data-id');
			}

			return false;
		};

		this.open_gmail_auth = function()
		{
			window.open('https://accounts.google.com/DisplayUnlockCaptcha',
					'gmail_auth',
					'location=0,status=0,width=800,height=550');

			return true;
		};

		this.continue_add_acc = function()
		{
			vulcan.objects.by_id('gmail_auth').value = 1;
			vulcan.objects.by_id('add_mail_account').click();
			vulcan.objects.by_id('gmail_auth').value = 0;

			return true;
		};

		this.new_acc = function(__name, __email, __gmail_auth, __pass, __host)
		{
			if (__host === false)
			{
				utils.show_notification('You must select mail host!');

				return false;
			}

			if (!__name)
			{
				utils.show_notification('Forgot to enter your account name? <br> <br> ;)');

				return false;
			}

			if (!helper.validate_email(__email.replace(/\s+/g, '')))
			{
				utils.show_notification('Please enter a valid email address!');

				return false;
			}

			if (!__pass)
			{
				utils.show_notification('Forgot to enter password? <br> <br> ;)');

				return false;
			}

			if ((__host === 'gmail.com') && (__gmail_auth === '0'))
			{
				add_acc.print.gmail_auth();

				fx.visibility.show('gmail_notification', 1 );
			}
			else
			{
				utils.start_progress('Loading...');
				
				flags.query_active = true;
				
				ajax.query('action=add_account' +
							'&email=' + __email +
							'&name=' + __name +
							'&pass=' + __pass +
							'&timezone_offset=' + utils.get_timezone_offset() +
							'&host=' + __host,
							function()
							{
								utils.end_progress(); 
								flags.query_active = false;

								if (print.ajax_results())
								{
									flags.current_folder = 'Inbox';
									flags.current_page = 1;
									flags.folder_displayed = true;
									flags.msg_displayed = false;
									
									html_fix.div_size();
									helper.scroll_fix('pm_left');
									scroll_bar_destroy('pm_right');
									helper.scroll_fix('pm_msg_list');
									
									attach_events.mail_account();
									
									utils.update_unread_number();
								}
							});
			}
		};

		this.print = new add_acc_print();
	}

	function mail_accounts_model()
	{
		this.update_ids = function(current_id)
		{
			//if (vulcan.validation.misc.is_undefined(current_id))
			//	return false;

			var __mail_acc_array = vulcan.objects.by_class('pm_account');

			for (var i = 0; i < __mail_acc_array.length; i++) 
			{
				var __this_id = __mail_acc_array[i].id;
				var __this_identity_id = __mail_acc_array[i].getAttribute('data-id');

				if (__this_identity_id === current_id)
					__mail_acc_array[i].id = 'current';
				else if (__this_id === 'current')
				{
					__mail_acc_array[i].id = 'active';

					print.into_tag('pm_ident_' + __this_identity_id, '');
				}
				else if (__mail_acc_array[i].id !== 'inactive')
					__mail_acc_array[i].id = 'active';
			}

			return true;
		};

		this.update_unread = function(data)
		{
			//if (vulcan.validation.misc.is_undefined(data))
			//	return false;

			if (data !== undefined)
			{
				for (var id in data)
				{
					if (data.hasOwnProperty(id)) 
					{
						var __unread_badge = vulcan.objects.by_id('pm_ident_badge_' + id);
						
						if (__unread_badge !== null)
						{
							__unread_badge.innerHTML = data[id];

							if (__unread_badge.innerHTML !== '0')
								__unread_badge.style.opacity = 1;
							else
								__unread_badge.style.opacity = 0;

							__unread_badge.className = 'pm_ident_unread_badge';
						}
					}
				}
			}

			return true;
		};

		this.update_account = function(data)
		{
			//if (vulcan.validation.misc.is_undefined(data))
			//	return false;

			if (data !== undefined)
			{
				for (var id in data)
				{
					if (data.hasOwnProperty(id)) 
					{
						if (utils.replace_element('pm_acc_'+id, data[id]) === false)
							return false;			
					}
				}
			}

			attach_events.mail_accounts();

			return true;
		};

		this.remove_account = function(acc_id)
		{
			if (utils.remove_element('pm_acc_' + acc_id) === true)
				return true;
			else
				return false;
		};
	}

	function mail_identity_model()
	{
		this.delete = function(id)
		{
			//if (vulcan.validation.misc.is_undefined(id))
			//	return false;

			if (confirm('Are you sure you want to delete this account?')) 
			{
				utils.start_progress('Deleting account...');
				
				flags.query_active = true;
				
				ajax.query('action=delete_account' + 
							'&identity_id=' + id, 
							function()
							{
								utils.end_progress(); 
								flags.query_active = false;

								if (print.ajax_results())
								{
									
									flags.current_folder = null;
									flags.current_page = null;
									flags.folder_displayed = false;
									flags.msg_displayed = false;	
									
									config.identity_id = 0;
									
									helper.scroll_fix('pm_left');
									helper.scroll_fix('pm_right');
									
									//utils.update_unread_number();
								}
							});
			}

			return true;
		};

		this.login = function(id, pass)
		{
			//if (vulcan.validation.misc.is_undefined(pass))
			//	return false;

			//if (vulcan.validation.misc.is_undefined(id))
			//	return false;

			utils.start_progress('Loading...');
			
			flags.query_active = true;

			ajax.query('action=login' + 
						'&id=' + id + 
						'&pass=' + pass,
						function() 
						{
							utils.end_progress(); 
							flags.query_active = false;

							if (print.ajax_results())
							{
								flags.current_folder = 'Inbox';
								flags.current_page = 1;
								flags.folder_displayed = true;
								flags.msg_displayed = false;
								
								config.identity_id = id;
								helper.scroll_fix('pm_left');
								scroll_bar_destroy('pm_right');
								helper.scroll_fix('pm_msg_list');
								
								attach_events.mail_account();
							}
						});

			return true;
		};

		this.logout = function()
		{
			utils.start_progress('Loading...');
			
			flags.query_active = true;

			ajax.query('action=logout' + 
						'&identity_id=' + config.identity_id, 
						function() 
						{
							utils.end_progress(); 
							flags.query_active = false;

							if (print.ajax_results())
							{
								flags.current_folder = null;
								flags.current_page = null;
								flags.folder_displayed = false;
								flags.msg_displayed = false;
								
								flags.current_folder = null;
								flags.compose_form_displayed = false;
								flags.current_page = null;
								
								helper.scroll_fix('pm_left');
								scroll_bar_scroll_to('pm_left', 'top');
								
								//utils.update_unread_number();
							}
						});
		};

		this.load_session = function(id)
		{
			//if (vulcan.validation.misc.is_undefined(id))
			//	return false;

			utils.start_progress('Loading...');
			
			flags.query_active = true;

			ajax.query('action=change_session' + 
						'&id=' + id,
						function()
						{
							utils.end_progress(); 
							flags.query_active = false;

							if (print.ajax_results() === true)
							{
								flags.folder_displayed = true;
								flags.current_folder = 'Inbox';
								flags.current_page = 1;
								flags.msg_displayed = false;
								
								mail_accounts.update_ids(id);
								mail_identity.toggle(id, true);
								
								helper.scroll_fix('pm_left');

								scroll_bar_destroy('pm_right');
								helper.scroll_fix('pm_msg_list');
				
								attach_events.mail_account();
															
								utils.check_new_mails();
							}
						});
		};

		this.activate = function(__id)
		{
			//if (vulcan.validation.misc.is_undefined(__id))
			//	return false;

			var __mail_acc_array = vulcan.objects.by_class('pm_account');

			for (var i = 0; i < __mail_acc_array.length; i++) 
			{
				if (__mail_acc_array[i].getAttribute('data-id') === __id)
					__mail_acc_array[i].id = 'current';
				else if (__mail_acc_array[i].id === 'current')
				{
					__mail_acc_array[i].id = 'active';
					print.into_tag('pm_ident_' + __mail_acc_array[i].getAttribute('data-id'), '');
				}
			}
		};

		this.load_folder = function(folder)
		{
			//if (vulcan.validation.misc.is_undefined(folder))
			//	return false;

			utils.start_progress('Loading...');
			
			flags.query_active = true;
			
			ajax.query('action=folder' + 
						'&folder=' + encodeURIComponent(folder) + 
						'&identity_id=' + config.identity_id, 
						function() 
						{
							utils.end_progress(); 
							flags.query_active = false;

							if (print.ajax_results())
							{
								flags.current_folder = folder;
								flags.folder_displayed = true;
								flags.current_page = 1;
								flags.msg_displayed = false;
								
								scroll_bar_destroy('pm_right');
								helper.scroll_fix('pm_msg_list');

								var __mail_folders = vulcan.objects.by_class('pm_folder');

								for (var i = 0; i < __mail_folders.length; i++)
								{
									if (__mail_folders[i].getAttribute('data-folder') === folder)
										__mail_folders[i].id = 'pm_active_folder';
									else
										__mail_folders[i].id = 'inactive';
								}

								this.id = 'active';
								
								utils.check_new_mails();
							}
						});

			return true;
		};

		this.toggle = function(id, force_open) 
		{
			//if (vulcan.validation.misc.is_undefined(id))
			//	return false;

			var __folders = vulcan.objects.by_id('pm_ident_' + id);
			var __badge = vulcan.objects.by_id('pm_ident_badge_' + id);

			if (force_open === true)
			{
				fx.visibility.show('pm_ident_' + id, 1 );
				fx.visibility.hide('pm_ident_badge_' + id, 1 );
			}
			else if (__folders.style.display === 'block')
			{
				fx.visibility.hide('pm_ident_' + id, 1 );

				if (!__badge.innerHTML)
					fx.visibility.hide('pm_ident_badge_' + id, 1 );
				else
					__badge.style.display = '';
			}
			else if (__folders.style.display === 'none')
			{
				fx.visibility.show('pm_ident_' + id, 1 );
				fx.visibility.hide('pm_ident_badge_' + id, 1 );
			}

			helper.scroll_fix('pm_left');

			return true;
		};

		this.update_unread = function(msg_num)
		{
			//if (vulcan.validation.misc.is_undefined(identity_id))
			//	return false;

			//if (vulcan.validation.misc.is_undefined(msg_num))
			//	return false;

			var __inbox_badge = vulcan.objects.by_id('pm_inbox_unread_badge');
			var __identity_badge = vulcan.objects.by_id('pm_ident_badge_' + config.identity_id);

			if (__inbox_badge !== null)
				__inbox_badge.innerHTML = msg_num;

			if (__identity_badge !== null)
				__identity_badge.innerHTML = msg_num;

			if (msg_num === 0)
			{
				if (__inbox_badge !== null)
					__inbox_badge.style.opacity = 0;

				if (__identity_badge !== null)
					__identity_badge.style.opacity = 0;
			}
			else
			{
				if (__inbox_badge !== null)
					__inbox_badge.style.opacity = 1;

				if (__identity_badge !== null)
					__identity_badge.style.opacity = 1;
			}

			return true;
		};
		
		this.decrement_unread = function(number)
		{
			var __unread = vulcan.objects.by_id('pm_ident_badge_' + config.identity_id).innerHTML;
			
			number = parseInt(number, 10);
			
			__unread = parseInt(__unread, 10);
			
			__unread = __unread - number;
			
			mail_identity.update_unread(__unread);
			
			return true;
		};
		
		this.increment_unread = function(number)
		{
			var __unread = vulcan.objects.by_id('pm_ident_badge_' + config.identity_id).innerHTML;
			
			number = parseInt(number, 10);
			
			__unread = parseInt(__unread, 10);
			
			__unread = __unread + number;
			
			mail_identity.update_unread(__unread);
			
			return true;
		};
	}

	function message_list_model()
	{
		var me = this;

		this.print = function(data)
		{
			var __msgs = '';
			
			if (data !== undefined)
			{
				var __selected = me.get_selected();
				
				for (var id in data)
				{
					if (data.hasOwnProperty(id)) 
					{
						var __msg = vulcan.objects.by_id('pm_msg_list_' + id);
												
						if ( __msg !== null)
						{
							var __msg_item = __msg.outerHTML;
			
							__msgs = __msg_item + __msgs;
						}
						else
							__msgs = data[id] + __msgs;			
					}
				}

				vulcan.objects.by_id('pm_msg_list').innerHTML = __msgs;

				me.select(__selected);

				//me.get_preview();
			}
		};

		this.read_msg = function(uid)
		{
			//if (vulcan.validation.misc.is_undefined(uid))
			//	return false;

			utils.start_progress('Loading...');

			flags.query_active = true;

			ajax.query('action=read_message' + 
						'&uid=' + uid +
						'&identity_id=' + config.identity_id,
						function() 
						{
							utils.end_progress(); 
							flags.query_active = false;

							if (message.print())
							{
								flags.msg_displayed = true;
								
								me.hide_list();
								helper.scroll_fix('pm_msg_view');
								
								if ((me.is_unread(uid) === true) && (flags.current_folder.toLowerCase() === 'inbox'))
									mail_identity.decrement_unread(1);
								
								message.load_inline_images(uid);
							}
						});

			return true;
		};
		
		this.get_preview = function(uid)
		{
			var __preview = vulcan.objects.by_id('pm_msg_preview_' + uid);
			
			if ((__preview === false) || (__preview === null))
				return false;
			
			/*
			var __loaded = __preview.getAttribute('data-loaded');
			
			if (parseInt(__loaded, 10) === 1)
				return true;
			*/
		   
		   if (__preview.title === '')
			   return false;
		   
			__preview.style.cursor = 'progress';
			__preview.className = 'pm_msg_preview preview_loading';
						
			ajax.query('action=get_preview' + 
						'&uid=' + uid +
						'&identity_id=' + config.identity_id,
						function() 
						{
							__preview.className = 'pm_msg_preview';
							
							if (print.ajax_results())
								__preview.title = '';
							
							__preview.style.cursor = 'pointer';
						});

			return true;
		};
		
		this.update_preview = function(data)
		{
			if (vulcan.validation.misc.is_undefined(data))
				return false;

			if (data !== undefined)
			{
				for (var id in data)
				{
					if (data.hasOwnProperty(id))
					{
						var __preview = vulcan.objects.by_id('pm_msg_preview_' + id);

						if ((__preview !== null) && (__preview !== false))
							__preview.innerHTML = data[id];
					}
				}
			}

			return true;
		};
        		
        this.delete = function(uids)
        {
			if (vulcan.validation.misc.is_undefined(uids))
				return false;
			
			utils.start_progress('Deleting...');
			
			flags.query_active = true;
			
            ajax.query('action=delete_message' +
                        '&uid=' + uids +
                        '&identity_id=' + config.identity_id,
                        function()
                        {
                            utils.end_progress(); 
							flags.query_active = false;

                            if (print.ajax_results())
                            {
                                helper.scroll_fix('pm_msg_list');

                                for (var i = 0; i < uids.length; i++)
								{
									if ((msg_list.is_unread(uids[i])) && (flags.current_folder.toLowerCase() === 'inbox'))
										mail_identity.decrement_unread(1);
									
									msg_list.mark_as_deleted(uids[i]);	
								}
								
								me.deselect_all();
                            }
                        });

			return true;
        };

		this.change_flag = function(uids, flag)
		{
			//if (vulcan.validation.misc.is_undefined(uids))
			//	return false;

			//if (vulcan.validation.misc.is_undefined(flag))
			//	return false;
			
			var __filtered_uids = [];
			var __count = 0;
			
			for (var i = 0; i < uids.length; i++)
			{
				if (flag === 'SEEN')
				{
					if (me.is_unread(uids[i]))
					{
						__filtered_uids[__count] = uids[i];
						__count++;
					}
				}
				else if (flag === 'UNSEEN')
				{
					if (!me.is_unread(uids[i]))
					{
						__filtered_uids[__count] = uids[i];
						__count++;
					}
				}
			}
			
			if (__filtered_uids.length === 0)
				return false;
			
			utils.start_progress('Loading...');

			flags.query_active = true;	
				
			ajax.query('action=change_flag' + 
						'&uid=' + __filtered_uids +
						'&identity_id=' + config.identity_id + 
						'&flag=' + flag, 
						function() 
						{
							utils.end_progress(); 
							flags.query_active = false;

							if (print.ajax_results())
							{
								helper.scroll_fix('pm_msg_list');

								if (flag === 'SEEN')
								{
									mail_identity.decrement_unread(__count);
									
									for (var i = 0; i < __filtered_uids.length; i++)
										msg_list.mark_as_read(__filtered_uids[i]);
								}
								else if (flag === 'UNSEEN')
								{
									mail_identity.increment_unread(__count);
									
									for (var i = 0; i < __filtered_uids.length; i++)
										msg_list.mark_as_unread(__filtered_uids[i]);
								}	
								
								me.deselect_all();
							}
						});

			return true;
		};

		this.paginate = function(page_num)
		{
			//if (vulcan.validation.misc.is_undefined(page_num))
			//	return false;

			utils.start_progress('Loading...');

			flags.query_active = true;

			ajax.query('action=folder_pagination' + 
						'&page=' + page_num +
						'&identity_id=' + config.identity_id,
						function() 
						{
							utils.end_progress(); 
							flags.query_active = false;
							
							if ( print.ajax_results())
							{
								flags.current_page = page_num;
								flags.folder_displayed = true;
								flags.msg_displayed = false;
								
								scroll_bar_destroy('pm_right');
								helper.scroll_fix('pm_msg_list');
							}
						});

			return true;
		};

		this.search = function(search_query)
		{
			//if (vulcan.validation.misc.is_undefined(search_query))
			//	return false;

			utils.start_progress('Searching...');
			
			flags.query_active = true;

			ajax.query('action=search_mail' + 
								'&query=' + search_query +
								'&identity_id=' + config.identity_id, 
								function()
								{
									utils.end_progress(); 
									flags.query_active = false;

									if ( print.ajax_results())
									{
										scroll_bar_destroy('pm_right');

										helper.scroll_fix('pm_msg_list');
									}
								});

			return true;
		};

		this.show_msg_actions = function()
		{
			var __msg_actions = vulcan.objects.by_id('pm_msg_list_actions');
			__msg_actions.style.height = '30px';
			__msg_actions.style.opacity = 1;
			__msg_actions.style.top = '4px';

			return true;
		};

		this.hide_msg_actions = function()
		{
			var __msg_actions = vulcan.objects.by_id('pm_msg_list_actions');
			__msg_actions.style.opacity = 0;
			__msg_actions.style.height = 0;
			__msg_actions.style.top = '-30px';

			return true;
		}; 

		this.cb_change = function()
		{
			if (me.count_selected() > 0)
				me.show_msg_actions();
			else
				me.hide_msg_actions();

			return true;
		};

		this.count_selected = function()
		{
			var __msg_list_checks = vulcan.objects.by_class('pm_msg_cb');
			var __count = 0;

			for (var i = 0; i < __msg_list_checks.length; i++)
			{
				if (__msg_list_checks[i].checked)
					__count++;
			}

			return __count;
		};
		
		this.count_selected_unread = function()
		{
			var __msg_list_checks = vulcan.objects.by_class('pm_msg_cb');
			var __count = 0;

			for (var i = 0; i < __msg_list_checks.length; i++)
			{
				if (__msg_cbs[i].checked)
				{
					var __uid = __msg_cbs[i].id.substring(5);

					if (me.is_unread(__uid))
						__count++;
				}
			}

			return __count;
		};

		this.get_selected = function()
		{
			var __uids = [];
			var __count = 0;
			var __msg_cbs = vulcan.objects.by_class('pm_msg_cb');

			for (var i = 0; i < __msg_cbs.length; i++)
			{
				if (__msg_cbs[i].checked)
				{
					if (__msg_cbs[i].id !== 'pm_msg_cb_master')
					{
						var __uid = __msg_cbs[i].id.substring(5);

						__uids[__count] = __uid;
						__count++;
					}
				}
			}

			if (__count === 0)
				return false;

			return __uids;
		};
		
		this.select = function(uids)
		{
			if (uids !== false)
			{
				for (var i = 0; i < uids.length; i++)
				{
					var __cb = vulcan.objects.by_id('muid_' + uids[i]);
					
					if ((__cb !== null) && (__cb!== false))
						__cb.checked = true;
				}
			}
		};

		this.hide_list = function()
		{
			fx.visibility.hide('pm_msg_list_header', 1 );
			fx.visibility.hide('pm_msg_list', 1 );
			
			return true;
		};
		
		this.show_list = function()
		{
			fx.visibility.show('pm_msg_list_header', 1 );
			fx.visibility.show('pm_msg_list', 1 );
			
			return true;	
		};
		
		this.mark_as_read = function(uid)
		{
			vulcan.objects.by_id('pm_msg_list_'+uid).className = 'pm_msg_list_item';
			
			return true;
		};
		
		this.mark_as_unread = function(uid)
		{
			vulcan.objects.by_id('pm_msg_list_'+uid).className = 'pm_msg_list_item pm_unread_msg';
			
			return true;
		};
		
		this.mark_as_deleted = function(uid)
		{
			vulcan.objects.by_id('pm_msg_list_'+uid).className = 'pm_msg_list_item pm_deleted_msg';
			
			return true;
		};
		
		this.is_unread = function(id)
		{
			var __msg = vulcan.objects.by_id('pm_msg_list_'+id);
			
			if (__msg === false)
				return false;
			
			if (__msg.className === 'pm_msg_list_item pm_unread_msg')
				return true;
			else
				return false;
		};
		
		this.deselect_all = function()
		{
			var __cb_array = vulcan.objects.by_class('pm_msg_cb');

			for (var i = 0; i < __cb_array.length; i++) 
				vulcan.objects.by_id(__cb_array[i].id).checked = false;
		};
	}

	function message_model()
	{
		var me = this;

		function message_model_utilities()
		{
			this.link_fix = function()
			{
				var __message = vulcan.objects.by_id('pm_message_body');
				var __anchors = __message.getElementsByTagName('a');
				
				if (__anchors === null)
					return false;

				for (var i = 0; i < __anchors.length; i++)
				{
					if (me.utils.yt_anchor_parse(__anchors[i].href))
						__anchors[i].className = __anchors[i].className + ' pm_yt_video';
					else if (__anchors[i].href.substring(0,7) === 'mailto:')
						__anchors[i].className = __anchors[i].className + ' pm_email_link';
					else
						__anchors[i].setAttribute('target', '_blank');
				}

				return true;
			};

			this.yt_anchor_parse = function(url)
			{
				//if (vulcan.validation.misc.is_undefined(url))
				//	return false;

				var __reg_exp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,
					__match = url.match(__reg_exp);

				if (__match && __match[7].length === 11)
					return __match[7];

				return false;
			};
		}

		this.print = function()
		{
			var __result = vulcan.objects.by_id('teal_mail_ajax_result').innerHTML;

			if (__result.substring(2,12) === '__show_error')
			{
				var __data = JSON.parse(__result);

				for (var __id in __data) 
				{
					if (__data.hasOwnProperty(__id)) 
					{
						if (__id === '__show_error')
						{
							utils.show_notification(__data[__id]);
							return false;
						}
					}
				}
			}

			print.into_tag('pm_msg_view', __result);

			me.utils.link_fix();

			attach_events.message_view();
			
			return true;
		};
		
		this.load_inline_images = function(uid)
		{
			var __msg_body = vulcan.objects.by_id('pm_message_body');
			var __imgs = __msg_body.getElementsByTagName('img');
						
			for (var i = 0; i < __imgs.length; i++)
			{
				var __get_data = me.get_url_vars(__imgs[i].src);
				var __part = __get_data['_part'];
				var __embed = __get_data['_embed'];
				var __mimeclass = __get_data['_mimeclass'];
				
				if (__part !== undefined)
				{
					__imgs[i].id = 'inline_image_'+__part;	
					__imgs[i].src = '/framework/extensions/js/teal_mail/themes/icons/image_loader.gif';	
					
					ajax.query('action=get_message_inline_image' + 
							'&uid=' + uid +
							'&part=' + __part +
							'&identity_id=' + config.identity_id ,
							function() 
							{
								print.ajax_results();
							});
				}
			}
			 
			 return true;
		};
		
		this.set_inline_image = function(id, url)
		{
			var __image = vulcan.objects.by_id(id);
			__image.src = url;
						
			helper.scroll_fix('pm_msg_view');
			
			return true;
		};

		this.get_url_vars = function(src)
		{
			var __vars = {};
			var __parts = src.replace(/[?&]+([^=&]+)=([^&]*)/gi, 
			function(__m, __key, __value) 
			{
				__vars[__key] = __value;
			});
			
			return __vars;
		};

		this.delete = function(uid)
		{
			//if (vulcan.validation.misc.is_undefined(uid))
				//return false;

			utils.start_progress('Deleting...');
			
			flags.query_active = true;

			ajax.query('action=delete_message' +
					'&uid=' + uid +
					'&identity_id=' + config.identity_id,
					function()
					{
						utils.end_progress(); 
						flags.query_active = false;

						if (print.ajax_results())
						{
							flags.msg_displayed = false;
							
							helper.scroll_fix('pm_msg_list');
							utils.check_new_mails();
						}
					});

			return true;
		};

		this.utils = new message_model_utilities();
	}

	function compose_mail()
	{
		this.print_form = function(to, cc, subject, body)
		{
			var __compose_form = '<table class="compose-headers">' +
								'<tbody>' +
								'<tr>' +
								'<td class="compose_title">From<\/td>' +
								'<td class="editfield">' +
								'<select name="_from" id="' + id + '_compose_from" class="compose_form">';

			var __mail_acc_array = vulcan.objects.by_class('pm_account');

			for (var i = 0; i < __mail_acc_array.length; i++)
			{
				if ((__mail_acc_array[i].id === 'active') || (__mail_acc_array[i].id === 'current'))
				{
					if (__mail_acc_array[i].getAttribute('data-id') === config.identity_id)
						__compose_form += '<option value="' + __mail_acc_array[i].getAttribute('data-id') + '" selected>' + __mail_acc_array[i].title + '</option>';
					else
						__compose_form += '<option value="' + __mail_acc_array[i].getAttribute('data-id') + '">' + __mail_acc_array[i].title + '</option>';
				}
			}

			__compose_form +=	'<\/select>' +
							'<\/td>' +
							'<\/tr>' +
							'<tr>' +
								'<td class="compose_title top"><label for="_to">To<\/label><\/td>' +
								'<td class="editfield">' + 
								'<input name="compose_mail_to" id="' + id + '_compose_mail_to" class="compose_form" value="' + to + '"' + 
								'type="text" placeholder="Example: mail@example.com, secondmail@example.com">' + 
								'<\/td>' +
							'<\/tr>' +
							'<tr id="' + id + '_compose_cc" style="display: none;">' +
								'<td class="compose_title top">' +
								'<label for="_cc">Cc<\/label>' +
								'<a href="#" id="' + id + '_cc-delete-link" class="delete_compose_row" title="Delete">x<\/a>' +
								'<\/td>' +
								'<td class="editfield">' +
								'<input name="_cc" id="' + id + '_compose_mail_cc" class="compose_form" value="' + cc + '" type="text"><\/input>' +
								'<\/td>' +
							'<\/tr>' +
							'<tr id="' + id + '_compose_bcc" style="display: none;">' +
								'<td class="compose_title top">' +
								'<label for="_bcc">Bcc<\/label>' +
								'<a href="#" id="' + id + '_bcc-delete-link" class="delete_compose_row" title="Delete">x<\/a>' +
								'<\/td>' +
								'<td class="editfield">' +
								'<input name="_bcc" id="' + id + '_compose_mail_bcc" class="compose_form" value="" type="text"><\/td>' +
							'<\/tr>' +
							'<tr id="' + id + '_compose_replyto" style="display: none;">' +
								'<td class="compose_title top">' +
								'<label for="_replyto">Reply-To<\/label>' +
								'<a href="#" id="' + id + '_replyto-delete-link"  class="delete_compose_row" title="Delete">x<\/a>' +
								'<\/td>' +
								'<td class="editfield">' +
								'<input name="_replyto" id="' + id + '_compose_mail_replyto" class="compose_form" value="" type="text">' +
								'<\/td>' +
							'<\/tr>' +
							'<tr>' +
								'<td><\/td>' +
								'<td class="formlinks">' +
								'<a href="#" id="' + id + '_cc-link" class="add_compose_row"' + 
								'style="display: inline-block;">' + 
								'Add Cc  <\/a>' +
								'<a href="#" id="' + id + '_bcc-link" class="add_compose_row"' + 
								'style="display: inline-block;">' + 
								'Add Bcc  <\/a>' +
								'<a href="#" id="' + id + '_replyto-link" class="add_compose_row" >' + 
								'Add Reply-To<\/a>' +
								'<\/td>' +
							'<\/tr>' +
							'<tr>' +
								'<td class="compose_title"><label for="compose_mail_subject">Subject<\/label><\/td>' +
								'<td class="editfield"><input name="_subject" id="' + id + '_compose_mail_subject"' + 
								'class="compose_form" value="' + subject + '" type="text"><\/td>' +
							'<\/tr>	' +
							'<tr>' +
								'<td class="compose_title"><label for="compose-msg_body">Message<\/label><\/td>' +
								'<td class="editfield">' + 
								'<textarea name="_message" id="' + id + '_composebody" class="compose_message" cols="70" rows="20"' + 
								'value="' + body + '"><\/textarea><\/td>' +
							'<\/tr>	' +
							'<tr>' +
								'<td class="compose_title"><\/td>' +
								'<td class="editfield"><input type="submit" id="' + id + '_send_email" value="Send"><\/td>' +
							'<\/tr>' +
						'<\/tbody>' +
					'<\/table>' +
					'<script>' +
					' ' +
					'<\/script>';

			print.into_tag('pm_right', __compose_form);

			attach_events.compose_form();

			return true;
		};

		this.show_row = function(id)
		{
			//if (vulcan.validation.misc.is_undefined(id))
				//return false;

			vulcan.objects.by_id('compose_' + id).style.display = 'table-row';
			vulcan.objects.by_id(id + '-link').style.display = 'none';

			helper.scroll_fix('pm_right');

			return true;
		};

		this.hide_row = function(id)
		{
			//if (vulcan.validation.misc.is_undefined(id))
			//	return false;

			vulcan.objects.by_id('compose_' + id).style.display = 'none';
			vulcan.objects.by_id(id + '-link').style.display = 'inline-block';

			helper.scroll_fix('pm_right');

			return true;
		};

		this.send = function(from, to, cc, bcc, reply_to, subject, msg)
		{
			if (!to)
			{
				utils.show_notification('You need to enter at least one recipient!');

				return false;
			}

			var __email_array = to.split(',');

			for (var i = 0; i < __email_array.length; i++)
			{
				if (!helper.validate_email(__email_array[i].replace(/\s+/g, '')))
				{
					utils.show_notification('Incorect email address in field \'To:\' \n Please enter a valid email addresses separated by commas!');

					return false;
				}
			}

			if (cc !== '')
			{
				var __email_array = cc.split(',');

				for (var i = 0; i < __email_array.length; i++)
				{
					if (!helper.validate_email(__email_array[i].replace(/\s+/g, '')))
					{
						utils.show_notification('Incorect email address in field \'Cc:\' \n Please enter a valid email addresses separated by commas!');

						return false;
					}
				}
			}

			if (bcc !== '')
			{
				var __email_array = bcc.split(',');

				for (var i = 0; i < __email_array.length; i++)
				{
					if (!helper.validate_email(__email_array[i].replace(/\s+/g, '')))
					{
						utils.show_notification('Incorect email address in field \'Bcc:\' \n Please enter a valid email addresses separated by commas!');

						return false;
					}
				}
			}

			if (reply_to !== '')
			{
				var __email_array = reply_to.split(',');

				for (var i = 0; i < __email_array.length; i++)
				{
					if (!helper.validate_email(__email_array[i].replace(/\s+/g, '')))
					{
						utils.show_notification('Incorect email address in field \'Reply To:\' \n Please enter a valid email addresses separated by commas!');

						return false;
					}
				}
			}

			if (msg === '')
			{
				utils.show_notification('Sorry dude, you can\'t send email without content!');

				return false;
			}

			utils.start_progress('Sending Message...');

			ajax.send_mail('from=' + from +
							'&to=' + to +
							'&cc=' + cc +
							'&bcc=' + bcc +
							'&reply_to=' + reply_to +
							'&subject=' + subject +
							'&msg=' + msg,
							function()
							{
								if (print.ajax_results())
									mail_identity.load_folder('Inbox');

								return true;
							});
		};
	}

	function print()
    {
		this.html_backbone = function()
		{
			var __html_backbone = '<div id="' + id + '_pm_progress_box"></div>' +
					'<div id="' + id + '_pm_notifications_box"></div>' +
					'<div id="' + id + '_teal_mail">' +
					'   <div id="' + id + '_pm_left">' +
					'       <div id="' + id + '_pm_accounts"></div>' +
					'       <div class="pm_add_acc_box" id="' + id + '_add_acc_box"></div>' +
					'   </div>' +
					'   <div id="' + id + '_pm_right"></div>' +
					'</div>' +
					'<div id="' + id + '_teal_mail_ajax_result"></div>';

			teal_mail_bee.settings.data.window.content(__html_backbone);

			attach_events.general();

			return true;
		};

		this.acc_actions = function()
		{
			var __acctions = '<div class="pm_account_options" id="' + id + '_pm_acc_actions_">' +
								'<div id="' + id + '_pm_check_inbox" class="pm_icon_1 pm_refresh_loading" title="Chek new mails"></div>' +
								'<div id="' + id + '_pm_compose_mail" class="pm_icon_1 pm_compose_icon" title="Compose new mail"></div>' +
								'<div id="' + id + '_pm_acc_setting" class="pm_icon_1 pm_settings_icon" title="Settings"></div>' +
								'<div id="' + id + '_pm_logout" class="pm_icon_1 pm_logout_icon" title="Logout"></div>' +
								'<div id="' + id + '_pm_delete_acc" class="pm_icon_1 pm_delete_icon" title="Delete this account"></div>' +
							'</div>';
		};

		this.msg_list_backbone = function()
		{
			var __msg_list_backbone = '<div id="' + id + '_pm_msg_list_header">' +
										'<div id="' + id + '_msg_list_master_select">' +
											'<div class="pm_checkbox">' +
												'<input type="checkbox" name="check" value="None"' +
												'class="pm_msg_cb" id="' + id + '_pm_msg_cb_master">' +
												'<label for="pm_msg_cb_master">‌</label>' +
											'</div>' +
										'</div>' +
										'<div id="' + id + '_pm_msg_list_actions" style="height: 0px; opacity: 0; top: -30px;">' +
											'<div class="pm_msg_list_btn" id="' + id + '_msg_list_delete">' +
												'<div class="pm_icon_2 pm_delete_icon2">Delete</div>' +
											'</div>' +
											'<div class="pm_msg_list_btn" id="' + id + '_change_msg_flag_s" data-flag="SEEN">' +
												'<div class="pm_icon_2 pm_mark_as_r">Mark as read</div>' +
											'</div>' +
											'<div class="pm_msg_list_btn" id="' + id + '_change_msg_flag_u" data-flag="UNSEEN">' +
												'<div class="pm_icon_2 pm_mark_as_u">Mark as unread</div>' +
											'</div>' +
										'</div>' +
										'<div id="' + id + '_pm_search_form">' +
											'<input type="text" id="' + id + '_pm_search_input" size="40" placeholder="Search...">' +
										'</div>' +
										'<div id="' + id + '_pm_msg_list_pagination">' +
										'</div>' +
									'</div>' +
									'<div id="' + id + '_pm_msg_list"></div>' +
									'<div id="' + id + '_pm_msg_view"></div>';

			vulcan.objects.by_id('pm_right').innerHTML = __msg_list_backbone;
		};

		this.into_tag = function(id, content)
		{
			//if (vulcan.validation.misc.is_undefined(id))
			//	return false;

			//if (vulcan.objects.by_id(id) === null)
			//	return false;

			if (vulcan.objects.by_id(id))
				vulcan.objects.by_id(id).innerHTML = content;

			else
				console.log('erro writng to:' + id);

			return true;
		};

		this.ajax_results = function()
		{		
			var __result = vulcan.objects.by_id('teal_mail_ajax_result').innerHTML;
			
			// Remove script tags and it's contents
			var __temp_div = document.createElement('div');
			__temp_div.innerHTML = __result;
			
			var __scripts = __temp_div.getElementsByTagName('script');
			var __i = __scripts.length;
			
			while (__i--) 
				__scripts[__i].parentNode.removeChild(__scripts[__i]);
			
			__result = __temp_div.innerHTML;

			if (__result === '')
				return false;

			var __data = JSON.parse(__result);

			for (var __id in __data) 
			{
				if (__data.hasOwnProperty(__id)) 
				{
					if (__id === '__print_bones')
						print.html_backbone();
					else if (__id === '__print_msg_list_bones')
						print.msg_list_backbone();
					else if (__id === '__update_unread')
						mail_identity.update_unread(__data[__id]);
					else if (__id === '__update_accounts_unread')
						mail_accounts.update_unread(__data[__id]);
					else if (__id === '__activate_account')
					{
						var __myarr = __data[__id].split('::');
						var __id = __myarr[0];
						var __msg_num = __myarr[1];

						mail_identity.update_unread(__msg_num);

						mail_identity.toggle(__id, true);

						mail_identity.activate(__id);
					}
					else if (__id === '__set_identity_id')
						config.identity_id = parseInt(__data[__id], 10);
					else if (__id === '__update_account')
						mail_accounts.update_account(__data[__id]);
					else if (__id === '__show_error')
					{
						utils.show_notification(__data[__id]);

						return false;
					}
					else if (__id === '__show_notification')
						utils.show_notification(__data[__id]);
					else if (__id === '__print_add_acc_btn')
						add_acc.print.button();
					else if (__id === '__no_accounts_fix')
						html_fix.no_mail_acc_fix();
					else if (__id === '__print_add_acc')
						add_acc.print.form();
					else if (__id === '__delete_account')
						mail_accounts.remove_account(__data[__id]);
					else if (__id === 'pm_msg_list')
						msg_list.print(__data[__id]);
					else if (__id === '__status_msg')
						teal_mail_bee.settings.data.window.labels.status_bar(__data[__id]);
					else if (__id.substring(0,13) === 'inline_image_')
						message.set_inline_image(__id,__data[__id]);
					else if (__id === '__update_msg_preview')
						msg_list.update_preview(__data[__id]);
					else
						print.into_tag(__id, __data[__id]);

					// Attach events
					if (__id === 'pm_accounts')
						attach_events.mail_accounts();
					else if (__id === 'pm_msg_list')
						attach_events.msg_list();
					else if (__id === 'pm_msg_list_pagination')
						attach_events.msg_pagination();
				}
			}

			return true;
		};
	}

	function helpers()
    {
		this.validate_email = function(email)
		{
			if (vulcan.validation.misc.is_undefined(email))
				return false;

			var __start_pos = email.indexOf('<') + 1;

			if (__start_pos !== 0)
			{
				var __end_pos = email.indexOf('>', __start_pos);

				if ((__end_pos !== 0) && (__end_pos > __start_pos))
					var email = email.substring(__start_pos, __end_pos);
			}

			var __re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			return __re.test(email);
		};

		this.scroll_fix = function(id)
		{
			if (vulcan.validation.misc.is_undefined(id))
				return false;

			scroll_bar_destroy(id);
			scroll_bar_fix(id);

			return true;
		};
	}

	function ajax_model()
	{
		this.query = function(args, callback)
		{
			var __url;
			var __data;
			var __result;
			var __element_id = 'teal_mail_ajax_result';
			var __ajax = new bull();

			__url = '/framework/extensions/ajax/teal_mail/teal_mail.php';
			__data = vulcan.validation.misc.is_undefined(args) ? ' ' : args;

			__result = __ajax.data(__url, __data, __element_id, 1, 1, false, callback);

			return __result;
		};

		this.send_mail = function(args, callback)
		{
			var __url;
			var __data;
			var __result;
			var __element_id = 'teal_mail_ajax_result';
			var __ajax = new bull();

			__url = '/framework/extensions/ajax/teal_mail/send_mail.php';
			__data = vulcan.validation.misc.is_undefined(args) ? ' ' : args;

			__result = __ajax.data(__url, __data, __element_id, 1, 1, false, callback);

			return __result;
		};
	}

	function utilities()
    {
		var me = this;

		this.check_new_mails = function()
		{
			if ((config.identiy_id === 0))
				return false;
			
			if (flags.query_active === true)
				return false;
			
			config.app_msg = teal_mail_bee.settings.data.window.labels.status_bar();

			teal_mail_bee.settings.data.window.labels.status_bar('Checking for new mails...');

			var __check_icon = vulcan.objects.by_id('pm_check_inbox');
			var __mail_app = vulcan.objects.by_id('teal_mail');
			
			var __update_inbox = 0;
		
			if ((flags.current_folder.toLowerCase() === 'inbox') && (flags.current_page === 1))
				__update_inbox = 1;

			__check_icon.className='pm_icon_1 pm_refresh_loading';
	
			ajax.query('action=check_new_mails' +
						'&identity_id=' + config.identity_id +
						'&update_inbox=' + __update_inbox,
						function() 
						{
							teal_mail_bee.settings.data.window.labels.status_bar(config.app_msg);

							print.ajax_results();

							me.update_unread_number();

							__check_icon.className='pm_icon_1 pm_refresh_icon';

							helper.scroll_fix('pm_msg_list');
						});

			return true;
		};

		this.update_unread_number = function(ignore_acc)
		{
			var __accs = vulcan.objects.by_class('pm_account');
			
			for (var i = 0; i < __accs.length; i++)
			{
				var __id = __accs[i].getAttribute('data-id');
				
				if ((__id !== null) && (__id !== ignore_acc) && (__accs[i].id === 'active'))
				{
					vulcan.objects.by_id('pm_ident_badge_'+__id).className = 'pm_ident_unread_badge badge_loading';
					vulcan.objects.by_id('pm_ident_badge_'+__id).style.opacity = 1;
					vulcan.objects.by_id('pm_ident_badge_'+__id).innerHTML = '';
					
					ajax.query('action=update_unread_number' +
								'&identity_id=' + __id,
								function() 
								{
									print.ajax_results();
								});
				}
			}

			return true;
		};

		this.count_all_unread = function()
		{
			var __badge_array = document.getElementsByClassName('unread_badge');
			var __unread = 0;

			for (var i = 0; i < __badge_array.length; i++)
				__unread += parseInt(__badge_array[i].innerHTML);

			return __unread;
		};

		this.update_unread_in_hive = function()
		{
			var __unread = me.count_all_unread();

			print.into_tag('hive_bee_' + id + '_title', 
                     teal_mail_bee.settings.data.window.labels.title() + 
                     ' <span class="badge_hive">' + __unread + '</span>');

			return true;
		};

		this.start_progress = function(status_bar_msg)
		{
			if (vulcan.objects.by_id('pm_msg_list_actions') !== null)
				msg_list.hide_msg_actions();

			fx.visibility.show('pm_progress_box', 1 );
			config.app_msg = teal_mail_bee.settings.data.window.labels.status_bar();

			teal_mail_bee.settings.data.window.labels.status_bar(status_bar_msg);

			infinity.begin();

			return true;
		};

		this.end_progress = function()
		{
			teal_mail_bee.settings.data.window.labels.status_bar(config.app_msg);
			fx.visibility.hide('pm_progress_box', 1 );
			infinity.end();

			return true;
		};

		this.show_notification = function(message)
		{
			//if (vulcan.validation.misc.is_undefined(message)
			//	return false;

			var __notification = vulcan.objects.by_id('pm_notifications_box');
			__notification.style.height = '100%';
			__notification.style.opacity = 1;

			__notification.innerHTML = '<div id="' + id + '_pm_notifications_msg">' + message + '</div>';
		};

		this.hide_notification = function()
		{
			var __notification = vulcan.objects.by_id('pm_notifications_box');

			__notification.style.opacity = 0;
			__notification.style.height = 0;
			__notification.innerHTML = '';
		}; 

		this.enter_to_click = function(this_event, id)
		{
			if (vulcan.validation.misc.is_undefined(this_event))
				return false;

			var keycode = teal_mail_bee.gui.keys.get(this_event);

			if (keycode === 13)
				vulcan.objects.by_id(id).click();

			return true;
		};

		this.get_timezone_offset = function()
		{
			var __date = new Date();
			var __timezone_offset = -__date.getTimezoneOffset()/60;

			return __timezone_offset;
		};

		this.sleep = function(milliseconds)
		{
			var __start = new Date().getTime();

			for (var i = 0; i < 1e7; i++) 
			{
				if ((new Date().getTime() - __start) > milliseconds)
					break;
			}

			return true;
		};
		
		this.remove_element = function(element_id)
		{
			var __element = vulcan.objects.by_id(element_id);
						
			if ((__element !== null) && (__element !== false))
			{
				__element.outerHTML = "";
				delete __element;
				
				return true;
			}
			else
				return false;
		};

		this.replace_element = function(element_id, new_element)
		{
			var __element = vulcan.objects.by_id(element_id);
						
			if ((__element !== null) && (__element !== false))
			{
				__element.outerHTML = new_element;
		
				return true;
			}
			else 
				return false;	
		};
	}

	function html_fix()
	{
		this.no_mail_acc_fix = function()
		{
			fx.visibility.hide('pm_left', 1 );
			vulcan.objects.by_id('pm_right').style.position = 'absolute';
			vulcan.objects.by_id('pm_right').style.marginLeft = '200px';
		};

		this.div_size = function()
		{
			var __height = teal_mail_bee.gui.size.height() - 88;
			var __width = teal_mail_bee.gui.size.width();

			var __elem = vulcan.objects.by_id('pm_right');
			__elem.style.width = (__width - 265) + 'px';

			var __elem = vulcan.objects.by_id('pm_left');
			__elem.style.height = __height + 'px';

			var __elem = vulcan.objects.by_id('pm_right');
			__elem.style.height = __height + 'px';

			return true;
		};
	}

	this.base = function()
    {
		if (is_init === false)
			return false;

        return teal_mail_bee;
    };

	function config_model()
	{
		this.identity_id = 0;
        this.app_msg = null;
		this.id = 'teal_mail';
	}
	
	function flags_model()
	{
		this.current_folder = null;
		this.current_page = null;
		this.folder_displayed = false;
		this.msg_displayed = false;
		this.compose_form_displayed = false;
		this.settings_displayed = false;
		this.query_active = false;
	}

	function gui_init()
	{
		print.html_backbone();

		html_fix.div_size();

		var __timezone_offset = utils.get_timezone_offset();

		utils.start_progress('Loading...');

		ajax.query('action=init_mail'+
					'&timezone_offset='+__timezone_offset,
                    function() 
                    {
                        utils.end_progress();

                        print.ajax_results();
						
						utils.update_unread_number();
						
                        helper.scroll_fix('pm_left'); 
                        helper.scroll_fix('pm_right'); 
                    });

		// Check for new emails every 150 sec
		setInterval(function()
		{
			if (config.identity_id !== 0)
				utils.check_new_mails();
		}, 150000);

		return true;
	}

	this.init = function()
	{
		if (is_init === true)
			return false;

		is_init = true;

		id = 'teal_mail_' + random.generate();

		teal_mail_bee = dev_box.get('bee');
		fx = dev_box.get('fx');
		infinity.init(cosmos);
		fx.init(cosmos);

        infinity.setup('pm_progress_box');

		vulcan.graphics.apply_theme('/framework/extensions/js/teal_mail/themes', 'teal_mail');

		teal_mail_bee.init(cosmos, id, 2);
		teal_mail_bee.settings.data.window.labels.title('Teal Mail');
		teal_mail_bee.settings.data.window.labels.status_bar('Multiple accounts webmail!');
		teal_mail_bee.gui.position.left(0);
		teal_mail_bee.gui.position.top(0);
		teal_mail_bee.gui.size.width(980);
		teal_mail_bee.gui.size.height(500);
		teal_mail_bee.gui.fx.fade.settings.into.set(0.07, 25, 100);
		teal_mail_bee.gui.fx.fade.settings.out.set(0.07, 25, 100);
		teal_mail_bee.on('open', function() { teal_mail_bee.gui.fx.fade.into(); });
		teal_mail_bee.on('opened', function() { return gui_init(); });
		teal_mail_bee.on('dragging', function()
									 {
										teal_mail_bee.gui.fx.opacity.settings.set(0.7);
										teal_mail_bee.gui.fx.opacity.apply();
									 });
		teal_mail_bee.on('dragged', function() { teal_mail_bee.gui.fx.opacity.reset(); });
		teal_mail_bee.on('in_hive', function() { utils.update_unread_in_hive(); });
		teal_mail_bee.on('close', function()
								  {
									vulcan.graphics.clear_theme('teal_mail');

									teal_mail_bee.gui.fx.fade.out();
								  });

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

        infinity = dev_box.get('infinity');

		cosmos_exists = true;

		return true;
	};

    var cosmos_exists = false,
		is_init = false,
		cosmos = null,
		vulcan = null,
        matrix = null,
        dev_box = null,
        infinity = null,
        colony = null,
        swarm = null,
        fx = null,
		teal_mail_bee = null,
		id = null,
		random = new pythia(),
		attach_events = new events(),
		add_acc = new add_account_model(),
		mail_accounts = new mail_accounts_model(),
		mail_identity = new mail_identity_model(),
		msg_list = new message_list_model(),
		message = new message_model(),
		compose = new compose_mail(),
		ajax = new ajax_model(),
		print = new print(),
		html_fix = new html_fix(),
		helper = new helpers(),
		config = new config_model(),
		flags = new flags_model(),
		utils = new utilities();
}
