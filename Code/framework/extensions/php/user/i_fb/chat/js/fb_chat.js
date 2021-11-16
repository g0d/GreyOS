/**
 * TODO:
 * - Create HTML codes on server-side by using template files
 * - Remove HTML codes from JS
 */
(function($) {

    var defaults = {
        linkClass: 'fbcLaunch',
        requestPath: 'N/A',
        heartbeatMin: 5000,
        heartbeatMax: 30000,
        heartbeatMenu: 30000,
        floatMenu: 1,
        status: 1,
        lans: {
            online: 'Online',
            offline: 'Offline',
            turnon: 'Turn on chat',
            turnoff: 'Turn off chat',
            offmsg: 'The chat is currently disabled.',
            nouser: 'There is no online users.'
        }
    };

    $.fn.fb_chat = function(options) {
        // Create namespace
        var fb_chat = {};

        var init = function() {
            fb_chat.tpl = new Object();

            // Merge options
            fb_chat.conf = $.extend({}, defaults, options);

            fb_chat.conf.heartbeat = fb_chat.conf.heartbeatMin;
            fb_chat.conf.heartbeatCount = 0;

            fb_chat.conf.chatBoxes = new Array();
            fb_chat.conf.chatboxFocus = new Array();
            fb_chat.conf.newMessages = new Array();
            fb_chat.conf.newMessagesWin = new Array();

            fb_chat.conf.windowFocus = true;
            fb_chat.conf.originalTitle = document.title;
            fb_chat.conf.blinkOrder = 0;

            fb_chat.tpl.iconClose = '<img id="close" src="' + fb_chat.conf.requestPath + '/images/icon_close.png" width="16" height="16" />';
            fb_chat.tpl.iconSetts = '<img id="setts" src="' + fb_chat.conf.requestPath + '/images/icon_settings.png" width="16" height="16" />';

            fb_chat.tpl.fltMenu = '<div class="cbh"><div class="cbt"><div class="tc">...</div>' + fb_chat.tpl.iconSetts + '<div class="settscnt"></div></div><br clear="all"/></div><div class="cbc"></div>';
            fb_chat.tpl.chatBox = '<div class="cbh"><div class="cbt"><div class="tc">...</div>' + /*fb_chat.tpl.iconSetts +*/ fb_chat.tpl.iconClose + '<div class="settscnt"></div></div><br clear="all"/></div><div class="cbc"></div><div class="cbi"><textarea class="cbta" maxlength="255"></textarea></div>';

            fb_chat.tpl.msgNrm = '<div class="cbmsg"><span class="cbmsgfrm"></span><br /><span class="cbmsgcnt"></span></div>';
            fb_chat.tpl.msgInf = '<div class="cbmsg"><span class="cbinf"></span></div>';

            setup();
        };


        var setup = function() {
            setup_build_structure();
            setup_init_events();
            chat_start_session();
        };


        var setup_build_structure = function() {
            $('body').wrapInner(function() {
                return '<div id="FBChatMain"></div>';
            });

            if (fb_chat.conf.floatMenu == 1) {
                setup_build_structure_menu();
            }
        };


        var setup_build_structure_menu = function() {
            $("<div />")
                    .attr("id", "cb_com")
                    .addClass("cb")
                    .html(fb_chat.tpl.fltMenu)
                    .appendTo($("body"))
                    .css('right', '20px')
                    .css('bottom', '0px')
                    .css('display', 'block')
                    .find('.cbc')
                    .css('display', 'none')
                    .parent()
                    .find('.cbt img')
                    .css('display', 'none')
                    .ready(function() {
                // onClick - Show/Hide Floating Menu
                $("#cb_com .tc").click(function() {
                    chat_toggle_floating_menu();
                });

                // onClick - Show/Hide settings panel
                $("#cb_com #setts").click(function() {
                    chat_toggle_settings_panel("com");
                });
            });
        };


        var setup_init_events = function() {
            var launchClass = fb_chat.conf.linkClass;
            $('.' + launchClass).click(function() {
                chat_start_conversation(this);
            });

            $([window, document]).blur(function() {
                fb_chat.conf.windowFocus = false;
            }).focus(function() {
                fb_chat.conf.windowFocus = true;
                document.title = fb_chat.conf.originalTitle;
            });
        };


        var chat_start_conversation = function(obj) {
            tid = $(obj).attr("fb-data");
            chat_create_chatbox(tid);
            $("#cb_" + tid + " .cbta").focus();
        };


        var chat_create_chatbox = function(tid, minimizeChatBox) {
            if ($("#cb_" + tid).length > 0) {
                if ($("#cb_" + tid).css('display') == 'none') {
                    $("#cb_" + tid).css('display', 'block');
                    chat_restructure_boxes();
                }
                $("#cb_" + tid + " .cbta").focus();
                return;
            }

            $("<div />")
                    .attr("id", "cb_" + tid)
                    .addClass("cb")
                    .html(fb_chat.tpl.chatBox)
                    .appendTo($("body"))
                    .ready(function() {
                get_user_name(tid);
            });

            $("#cb_" + tid).css('bottom', '0px');

            chatBoxeslength = 0;
            for (x in fb_chat.conf.chatBoxes) {
                if ($("#cb_" + fb_chat.conf.chatBoxes[x]).css('display') != 'none') {
                    chatBoxeslength++;
                }
            }

            if (chatBoxeslength == 0) {
                if (fb_chat.conf.floatMenu == 1) {
                    width = 200 + 7 + 20;
                } else {
                    width = 20;
                }
                $("#cb_" + tid).css('right', width + 'px');
            } else {
                width = chatBoxeslength * (250 + 7) + 20;
                if (fb_chat.conf.floatMenu == 1) {
                    width += 200 + 7;
                }
                $("#cb_" + tid).css('right', width + 'px');
            }

            fb_chat.conf.chatBoxes.push(tid);

            if (minimizeChatBox == 1) {
                minimizedChatBoxes = new Array();
                if (cookie('cb_minimized')) {
                    minimizedChatBoxes = cookie('cb_minimized').split(/\|/);
                }

                minimize = 0;
                for (j = 0; j < minimizedChatBoxes.length; j++) {
                    if (minimizedChatBoxes[j] == tid) {
                        minimize = 1;
                    }
                }

                if (minimize == 1) {
                    $('#cb_' + tid + ' img#setts').css('display', 'none');
                    $('#cb_' + tid + ' .cbc').css('display', 'none');
                    $('#cb_' + tid + ' .cbi').css('display', 'none');
                }
            }

            fb_chat.conf.chatboxFocus[tid] = false;

            $("#cb_" + tid + " .cbta").blur(function() {
                fb_chat.conf.chatboxFocus[tid] = false;
                $("#cb_" + tid + " .cbta").removeClass('cbtasel');
            }).focus(function() {
                fb_chat.conf.chatboxFocus[tid] = true;
                fb_chat.conf.newMessages[tid] = false;
                $('#cb_' + tid + ' .cbh').removeClass('cbb');
                $("#cb_" + tid + " .cbta").addClass('cbtasel');
            });

            // onClick - Focus input textarea
            $("#cb_" + tid).click(function() {
                if ($('#cb_' + tid + ' .cbc').css('display') != "none") {
                    $("#cb_" + tid + " .cbta").focus();
                }
            });

            // onClick - Toggle chatbox
            $("#cb_" + tid + " .tc").click(function() {
                chat_toggle_chatbox(tid);
            });

            // onClick - Close chatbox
            $("#cb_" + tid + " #close").click(function() {
                chat_close_chatbox(tid);
            });

            // onKeydown - Check Enter keydowns
            $("#cb_" + tid + " .cbta").keydown(function(event) {
                check_input_key(event, this, tid);
                if (event.keyCode == 13 && event.shiftKey == 0) {
                    return false;
                }
            });

            // onClick - Show/Hide settings panel
            //$("#cb_" + tid + " #setts").click(function() {
            //chat_toggle_settings_panel(tid);
            //});

            $("#cb_" + tid).show();
        };


        var chat_toggle_settings_panel = function(tid) {
            if ($("#cb_" + tid + " .settscnt").css('display') == "none") {
                // Floating menu settings...
                if (tid == "com") {
                    aH = '<ul>';
                    if (fb_chat.conf.status == "1") {
                        aH += '<li class="onoff">' + fb_chat.conf.lans.turnoff + '</li>';
                    } else {
                        aH += '<li class="onoff">' + fb_chat.conf.lans.turnon + '</li>';
                    }
                    aH += '</ul>';

                    $("#cb_" + tid + " .settscnt").html(aH).ready(function() {
                        if (fb_chat.conf.status == "1") {
                            $("#cb_" + tid + " .settscnt").find(".onoff").click(function() {
                                chat_turn_off();
                                $("#cb_" + tid + " .settscnt").css('display', 'none');
                            });
                        } else {
                            $("#cb_" + tid + " .settscnt").find(".onoff").click(function() {
                                chat_turn_on();
                                $("#cb_" + tid + " .settscnt").css('display', 'none');
                            });
                        }
                    });
                }

                $("#cb_" + tid + " .settscnt").css('display', 'block');
            } else {
                $("#cb_" + tid + " .settscnt").css('display', 'none');
            }
        };


        var chat_toggle_floating_menu = function() {
            if ($('#cb_com .cbc').css('display') == 'none') {
                $('#cb_com .cbc').css('display', 'block');
                $('#cb_com .cbt img').css('display', 'block');
            } else {
                $('#cb_com .cbc').css('display', 'none');
                $('#cb_com .cbt img').css('display', 'none');
            }
        };


        var chat_toggle_chatbox = function(tid) {
            if ($('#cb_' + tid + ' .cbc').css('display') == "none") {
                var minimizedChatBoxes = new Array();
                if (cookie('cb_minimized')) {
                    minimizedChatBoxes = cookie('cb_minimized').split(/\|/);
                }

                newCookie = '';
                for (i = 0; i < minimizedChatBoxes.length; i++) {
                    if (minimizedChatBoxes[i] != tid) {
                        newCookie += tid + '|';
                    }
                }

                newCookie = newCookie.slice(0, -1);
                cookie('cb_minimized', newCookie);

                $('#cb_' + tid + ' img#setts').css('display', 'block');
                $('#cb_' + tid + ' .cbc').css('display', 'block');
                $('#cb_' + tid + ' .cbi').css('display', 'block');

                scHeight = $("#cb_" + tid + " .cbc")[0].scrollHeight;
                $("#cb_" + tid + " .cbc").scrollTop(scHeight);
            } else {
                newCookie = tid;
                if (cookie('cb_minimized')) {
                    newCookie += '|' + cookie('cb_minimized');
                }

                cookie('cb_minimized', newCookie);

                $('#cb_' + tid + ' img#setts').css('display', 'none');
                $('#cb_' + tid + ' .cbc').css('display', 'none');
                $('#cb_' + tid + ' .cbi').css('display', 'none');
            }
        };


        var chat_close_chatbox = function(tid) {
            $('#cb_' + tid).css('display', 'none');
            chat_restructure_boxes();
            $.post(fb_chat.conf.requestPath + "/fb_chat.php?a=3", {
                chatbox: tid
            });
        };


        var chat_restructure_boxes = function() {
            align = 0;
            for (x in fb_chat.conf.chatBoxes) {
                tid = fb_chat.conf.chatBoxes[x];
                if ($("#cb_" + tid).css('display') != 'none') {
                    if (align == 0) {
                        if (fb_chat.conf.floatMenu == 1) {
                            width = 200 + 7 + 20;
                        } else {
                            width = 20;
                        }
                        $("#cb_" + tid).css('right', width + 'px');
                    } else {
                        width = (align) * (250 + 7) + 20;
                        if (fb_chat.conf.floatMenu == 1) {
                            width += 200 + 7;
                        }
                        $("#cb_" + tid).css('right', width + 'px');
                    }
                    align++;
                }
            }
        };


        var chat_heartbeat = function() {
            if (fb_chat.conf.status == "0") {
                setTimeout(function() {
                    chat_heartbeat();
                }, fb_chat.conf.heartbeatMax);
                return;
            }

            var itemsfound = 0;

            if (fb_chat.conf.windowFocus == false) {
                var blinkNumber = 0;
                var titleChanged = 0;

                for (x in fb_chat.conf.newMessagesWin) {
                    if (fb_chat.conf.newMessagesWin[x] == true) {
                        ++blinkNumber;
                        if (blinkNumber >= fb_chat.conf.blinkOrder) {
                            name = $("#cb_" + x + " .tc").text();
                            document.title = name + '...';
                            titleChanged = 1;
                            break;
                        }
                    }
                }

                if (titleChanged == 0) {
                    document.title = fb_chat.conf.originalTitle;
                    fb_chat.conf.blinkOrder = 0;
                } else {
                    ++fb_chat.conf.blinkOrder;
                }
            } else {
                for (x in fb_chat.conf.newMessagesWin) {
                    fb_chat.conf.newMessagesWin[x] = false;
                }
            }

            for (x in fb_chat.conf.newMessages) {
                if (fb_chat.conf.newMessages[x] == true) {
                    if (fb_chat.conf.chatboxFocus[x] == false) {
                        $('#cb_' + x + ' .cbh').toggleClass('cbb');
                    }
                }
            }

            $.ajax({
                url: fb_chat.conf.requestPath + "/fb_chat.php?a=2",
                cache: false,
                dataType: "json",
                success: function(data) {
                    $.each(data.items, function(i, item) {
                        if (item) {
                            tid = item.f.id;

                            if ($("#cb_" + tid).length <= 0) {
                                chat_create_chatbox(tid);
                            }

                            if ($("#cb_" + tid).css('display') == 'none') {
                                $("#cb_" + tid).css('display', 'block');
                                chat_restructure_boxes();
                            }

                            if (item.s == 2) {
                                $("#cb_" + tid + " .cbc").append(fb_chat.tpl.msgInf);
                                $("#cb_" + tid + " .cbinf").last().html(item.m);
                            } else {
                                fb_chat.conf.newMessages[tid] = true;
                                fb_chat.conf.newMessagesWin[tid] = true;
                                $("#cb_" + tid + " .cbc").append(fb_chat.tpl.msgNrm);
                                $("#cb_" + tid + " .cbmsgfrm").last().html(item.f.name).text();
                                $("#cb_" + tid + " .cbmsgcnt").last().html(item.m);
                            }

                            scHeight = $("#cb_" + tid + " .cbc")[0].scrollHeight;
                            $("#cb_" + tid + " .cbc").scrollTop(scHeight);
                            itemsfound += 1;
                        }
                    });

                    fb_chat.conf.heartbeatCount++;

                    if (itemsfound > 0) {
                        fb_chat.conf.heartbeat = fb_chat.conf.heartbeatMin;
                        fb_chat.conf.heartbeatCount = 1;
                    } else if (fb_chat.conf.heartbeatCount >= 10) {
                        fb_chat.conf.heartbeat *= 2;
                        fb_chat.conf.heartbeatCount = 1;

                        if (fb_chat.conf.heartbeat > fb_chat.conf.heartbeatMax) {
                            fb_chat.conf.heartbeat = fb_chat.conf.heartbeatMax;
                        }
                    }

                    setTimeout(function() {
                        chat_heartbeat();
                    }, fb_chat.conf.heartbeat);
                }
            });
        };


        var chat_menu_heartbeat = function() {
            chat_menu_heartbeat_worker();
            if (fb_chat.conf.floatMenu == 1 || $('.fbcmw').length > 0) {
                setTimeout(function() {
                    chat_menu_heartbeat();
                }, fb_chat.conf.heartbeatMenu);
            }
        };


        var chat_menu_heartbeat_worker = function() {
            if (fb_chat.conf.status == "0") {
                aH = '<p class="offmsg">' + fb_chat.conf.lans.offmsg + '</p>';
                if ($('.fbcmw').length > 0) {
                    $('.fbcmw').html(aH);
                }
                if (fb_chat.conf.floatMenu == 1) {
                    $('#cb_com .cbc').html(aH);
                    $('#cb_com .tc').html(fb_chat.conf.lans.offline);
                }
            } else {
                lClass = fb_chat.conf.linkClass;
                if ($('.fbcmw').length > 0) {
                    $.ajax({
                        url: fb_chat.conf.requestPath + "/fb_chat.php?a=6",
                        cache: false,
                        dataType: "html",
                        success: function(data) {
                            if (data == "") {
                                data = '<p class="offmsg">' + fb_chat.conf.lans.nouser + '</p>';
                            }
                            // update normal menu content
                            $('.fbcmw').empty().html(data);
                            // onClick - Set Chat (start) event on list items
                            $('.fbcmw .' + lClass).click(function() {
                                chat_start_conversation(this);
                            });
                        }
                    });
                }

                if (fb_chat.conf.floatMenu == 1) {
                    $.ajax({
                        url: fb_chat.conf.requestPath + "/fb_chat.php?a=7",
                        cache: false,
                        dataType: "html",
                        success: function(data) {
                            if (data == "") {
                                data = '<p class="offmsg">' + fb_chat.conf.lans.nouser + '</p>';
                            }
                            // update floating menu content
                            $('#cb_com .cbc').empty().html(data);
                            // onClick - Set Chat (start) event on list items
                            $('#cb_com .cbc li').click(function() {
                                chat_start_conversation($(this).find('.' + lClass));
                            });
                            // update floating menu title
                            title = fb_chat.conf.lans.online;
                            title += ' (' + $('#cb_com .cbc li').size() + ')';
                            $('#cb_com .tc').html(title);
                        }
                    });
                }
            }
        };


        var chat_start_session = function() {
            if (fb_chat.conf.status == "0") {
                chat_heartbeat();
                chat_menu_heartbeat();
                return;
            }

            $.ajax({
                url: fb_chat.conf.requestPath + "/fb_chat.php?a=1",
                cache: false,
                dataType: "json",
                success: function(data) {
                    $.each(data.items, function(i, item) {
                        if (item) {
                            if ($("#cb_" + item.f.id).length <= 0) {
                                chat_create_chatbox(item.f.id, 1);
                            }
                            if (item.s == 2) {
                                $("#cb_" + item.f.id + " .cbc").append(fb_chat.tpl.msgInf);
                                $("#cb_" + item.f.id + " .cbinf").last().html(item.m);
                            } else {
                                $("#cb_" + item.f.id + " .cbc").append(fb_chat.tpl.msgNrm);
                                $("#cb_" + item.f.id + " .cbmsgfrm").last().html(item.f.name).text();
                                $("#cb_" + item.f.id + " .cbmsgcnt").last().html(item.m);
                            }
                        }
                    });

                    for (i = 0; i < fb_chat.conf.chatBoxes.length; i++) {
                        tid = fb_chat.conf.chatBoxes[i];
                        scHeight = $("#cb_" + tid + " .cbc")[0].scrollHeight;
                        $("#cb_" + tid + " .cbc").scrollTop(scHeight);
                    }

                    setTimeout(function() {
                        chat_heartbeat();
                    }, fb_chat.conf.heartbeat);

                    if (fb_chat.conf.floatMenu == 1 || $('.fbcmw').length > 0) {
                        chat_menu_heartbeat();
                    }
                }
            });
        };


        var chat_turn_off = function() {
            $.ajax({
                url: fb_chat.conf.requestPath + "/fb_chat.php?a=9",
                cache: false,
                dataType: "html",
                success: function(data) {
                    fb_chat.conf.status = 0;
                    chat_menu_heartbeat_worker();
                }
            });
        };


        var chat_turn_on = function() {
            $.ajax({
                url: fb_chat.conf.requestPath + "/fb_chat.php?a=8",
                cache: false,
                dataType: "html",
                success: function(data) {
                    fb_chat.conf.status = 1;
                    fb_chat.conf.heartbeat = fb_chat.conf.heartbeatMin;
                    chat_menu_heartbeat_worker();
                }
            });
        };


        var check_input_key = function(event, cbta, tid) {
            if (event.keyCode == 13 && event.shiftKey == 0) {
                message = $(cbta).val();
                message = message.replace(/^\s+|\s+$/g, "");
                if (message !== "") {
                    $.ajax({
                        type: "POST",
                        url: fb_chat.conf.requestPath + "/fb_chat.php?a=4",
                        data: {to: tid, message: message},
                        cache: false,
                        dataType: "json",
                        success: function(data) {
                            $("#cb_" + tid + " .cbc").append(fb_chat.tpl.msgNrm);
                            $("#cb_" + tid + " .cbmsgfrm").last().html(data.f).text();
                            $("#cb_" + tid + " .cbmsgcnt").last().html(data.m);
                            scHeight = $("#cb_" + tid + " .cbc")[0].scrollHeight;
                            $("#cb_" + tid + " .cbc").scrollTop(scHeight);
                        }
                    });
                }

                $(cbta).val('');
                $(cbta).focus();
                $(cbta).css('height', '20px');

                fb_chat.conf.heartbeat = fb_chat.conf.heartbeatMin;
                fb_chat.conf.heartbeatCount = 1;
            } else {
                var adjustedHeight = cbta.clientHeight;
                var maxHeight = 94;
                if (maxHeight > adjustedHeight) {
                    adjustedHeight = Math.max(cbta.scrollHeight, adjustedHeight);
                    if (maxHeight) {
                        adjustedHeight = Math.min(maxHeight, adjustedHeight);
                    }
                    if (adjustedHeight > cbta.clientHeight) {
                        $(cbta).css('height', adjustedHeight + 8 + 'px');
                    }
                } else {
                    $(cbta).css('overflow', 'auto');
                }
            }
        };


        var get_user_name = function(tid) {
            $.post(fb_chat.conf.requestPath + "/fb_chat.php?a=5", {
                tid: tid
            }, function(data) {
                $("#cb_" + tid + " .tc").html(data.name);
            });
        };


        /**
         * Cookie plugin
         *
         * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
         * Dual licensed under the MIT and GPL licenses:
         * http://www.opensource.org/licenses/mit-license.php
         * http://www.gnu.org/licenses/gpl.html
         *
         */
        var cookie = cookie = function(name, value, options) {
            if (typeof value != 'undefined') { // name and value given, set cookie
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
                }
                // CAUTION: Needed to parenthesize options.path and options.domain
                // in the following expressions, otherwise they evaluate to undefined
                // in the packed version for some reason...
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            } else { // only name given, get cookie
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
        };

        init();
    }
}(jQuery));