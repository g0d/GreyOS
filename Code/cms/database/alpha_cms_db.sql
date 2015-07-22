-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2015 at 01:17 PM
-- Server version: 5.6.20
-- PHP Version: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `greyos`
--
CREATE DATABASE IF NOT EXISTS `greyos` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `greyos`;

-- --------------------------------------------------------

--
-- Table structure for table `alpha_common`
--

CREATE TABLE IF NOT EXISTS `alpha_common` (
`id` int(3) unsigned NOT NULL,
  `site_title` varchar(60) NOT NULL,
  `site_description` varchar(170) DEFAULT NULL,
  `site_keywords` varchar(255) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `company_site` varchar(255) DEFAULT NULL,
  `footer_info` varchar(255) DEFAULT NULL,
  `binded_route` varchar(255) NOT NULL,
  `lang_id` int(3) unsigned NOT NULL,
  `is_protected` tinyint(1) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `alpha_common`
--

INSERT INTO `alpha_common` (`id`, `site_title`, `site_description`, `site_keywords`, `company_name`, `company_site`, `footer_info`, `binded_route`, `lang_id`, `is_protected`) VALUES
(1, 'GreyOS', 'GreyOS is a total solution that integrates and personalizes web services, apps and games and provides ease of access and use of information on a friendly environment.', 'greyos,philos,cloud,integrate,consolidate,simplify,personalize', 'GreyOS Inc.', 'http://greyos.gr/', '<a target="_blank" href="http://greyos.gr/">GreyOS Inc.</a>', 'root', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `alpha_content`
--

CREATE TABLE IF NOT EXISTS `alpha_content` (
`id` int(5) unsigned NOT NULL,
  `page` varchar(255) NOT NULL,
  `content` longtext,
  `keywords` varchar(255) DEFAULT NULL,
  `lang_id` int(3) unsigned NOT NULL,
  `is_protected` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_route` tinyint(1) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=676 ;

--
-- Dumping data for table `alpha_content`
--

INSERT INTO `alpha_content` (`id`, `page`, `content`, `keywords`, `lang_id`, `is_protected`, `is_route`) VALUES
(13, 'home', 'Home', '', 1, 0, 1),
(15, 'features', 'Features', '', 1, 0, 1),
(16, 'extensions', 'Extensions', NULL, 1, 0, 1),
(17, 'about', 'About', '', 1, 0, 1),
(19, 'home', 'Αρχική', NULL, 2, 0, 1),
(20, 'features', '&Chi;&alpha;&rho;&alpha;&kappa;&tau;&eta;&rho;&iota;&sigma;&tau;&iota;&kappa;&#0940;', '', 2, 0, 1),
(21, 'extensions', '&Epsilon;&pi;&epsilon;&kappa;&tau;&#940;&sigma;&epsilon;&iota;&sigmaf;', '', 2, 0, 1),
(22, 'about', '&Sigma;&chi;&epsilon;&tau;&iota;&kappa;&#0940;', '', 2, 0, 1),
(80, 'greek', 'Ελληνικά', NULL, 2, 0, 0),
(79, 'greek', 'Greek', NULL, 1, 0, 0),
(81, 'english', 'English', NULL, 1, 1, 0),
(82, 'english', 'Αγγλικά', NULL, 2, 0, 0),
(90, 'admin_site_title', 'ALPHA CMS - Administration Panel', NULL, 1, 1, 0),
(91, 'dashboard', 'Dashboard', '', 1, 1, 1),
(92, 'common', 'Common', NULL, 1, 1, 1),
(93, 'content', 'Content', NULL, 1, 1, 1),
(94, 'menu', 'Menu', NULL, 1, 1, 1),
(95, 'languages', 'Languages', NULL, 1, 1, 1),
(96, 'users', 'Users', NULL, 1, 1, 1),
(97, 'logs', 'Logs', NULL, 1, 1, 1),
(104, 'menu', 'Μενού', NULL, 2, 1, 1),
(105, 'languages', 'Γλώσσες', NULL, 2, 1, 1),
(103, 'content', 'Περιεχόμενο', NULL, 2, 1, 1),
(102, 'dashboard', 'Ταμπλό', NULL, 2, 1, 1),
(101, 'common', 'Κοινά', NULL, 2, 1, 1),
(106, 'users', 'Χρήστες', NULL, 2, 1, 1),
(107, 'logs', 'Καταγραφές', NULL, 2, 1, 1),
(108, 'login_username', 'Username', NULL, 1, 1, 0),
(109, 'login_username', 'Όνομα χρήστη', NULL, 2, 1, 0),
(110, 'login_password', 'Password', NULL, 1, 1, 0),
(111, 'login_password', 'Κωδικός', NULL, 2, 1, 0),
(112, 'login', 'Log in\n', '', 1, 1, 0),
(113, 'login', 'Είσοδος', NULL, 2, 1, 0),
(114, 'admin_panel', 'Administration Panel', NULL, 1, 1, 0),
(115, 'admin_panel', 'Διαχειριστικό Περιβάλλον', NULL, 2, 1, 0),
(116, 'admin_site_title', 'ALPHA CMS - Διαχειριστικό Περιβάλλον', NULL, 2, 1, 0),
(117, 'dashboard_content', 'Here you can see summarized reports for your web site and arrange the widgets the way you like.\n<p></p>', '', 1, 1, 0),
(118, 'dashboard_content', '&Epsilon;&delta;&#0974; &mu;&pi;&omicron;&rho;&epsilon;&#0943;&tau;&epsilon; &nu;&alpha; &delta;&epsilon;&#0943;&tau;&epsilon; &alpha;&nu;&alpha;&phi;&omicron;&rho;&#0941;&sigmaf; &gamma;&iota;&alpha; &tau;&omicron;&nu; &iota;&sigma;&tau;&omicron;&chi;&#0974;&rho;&omicron; &sigma;&alpha;&sigmaf; &kappa;&alpha;&iota; &nu;&alpha; &tau;&alpha;&kappa;&tau;&omicron;&pi;&omicron;&iota;&#0942;&sigma;&epsilon;&tau;&epsilon; &tau;&alpha; widgets &mu;&epsilon; &#0972;&pi;&omicron;&iota;&omicron; &tau;&rho;&#0972;&pi;&omicron; &sigma;&alpha;&sigmaf; &alpha;&rho;&#0941;&sigma;&epsilon;&iota;.\n<p></p>', '', 2, 1, 0),
(218, 'insert_common_label', 'Insert Common Content', NULL, 1, 1, 0),
(219, 'insert_common_label', '&Epsilon;&iota;&sigma;&alpha;&gamma;&omega;&gamma;ή &Kappa;&omicron;&iota;&nu;&omicron;ύ &Pi;&epsilon;&rho;&iota;&epsilon;&chi;&omicron;&mu;έ&nu;&omicron;&upsilon;', NULL, 2, 1, 0),
(119, 'logs_content', 'Here you see all the generated system logs.\n<p></p>', '', 1, 1, 0),
(120, 'logs_content', '&Epsilon;&delta;ώ &beta;&lambda;έ&pi;&epsilon;&tau;&epsilon; ό&lambda;&epsilon;&sigmaf; &tau;&iota;&sigmaf; &kappa;&alpha;&tau;&alpha;&gamma;&rho;&alpha;&phi;έ&sigmaf; &tau;&omicron;&upsilon; &sigma;&upsilon;&sigma;&tau;ή&mu;&alpha;&tau;&omicron;&sigmaf;.<p>', NULL, 2, 1, 0),
(121, 'date_time_label', 'Date &amp; Time', NULL, 1, 1, 0),
(122, 'date_time_label', 'Ημερομηνία & Ώρα', NULL, 2, 1, 0),
(123, 'id_label', 'ID', NULL, 1, 1, 0),
(124, 'id_label', 'ID', '', 2, 1, 0),
(125, 'error_code_label', 'Κωδικός Σφάλματος', NULL, 2, 1, 0),
(126, 'error_code_label', 'Error Code', NULL, 1, 1, 0),
(127, 'error_msg_label', 'Message', NULL, 1, 1, 0),
(128, 'error_msg_label', '&Pi;&epsilon;&rho;&iota;&gamma;&rho;&alpha;&phi;ή', NULL, 2, 1, 0),
(129, 'file_label', 'File', NULL, 1, 1, 0),
(130, 'file_label', 'Αρχείο', NULL, 2, 1, 0),
(131, 'line_label', 'Line', NULL, 1, 1, 0),
(132, 'line_label', 'Γραμμή', NULL, 2, 1, 0),
(133, 'asc_label', 'Ascending', NULL, 1, 1, 0),
(134, 'asc_label', 'Αύξουσα', NULL, 2, 1, 0),
(135, 'desc_label', 'Descending', NULL, 1, 1, 0),
(136, 'desc_label', 'Φθίνουσα', NULL, 2, 1, 0),
(137, 'sort_label', 'Sort:', NULL, 1, 1, 0),
(138, 'sort_label', 'Σειρά:', NULL, 2, 1, 0),
(139, 'order_label', 'Order by:', NULL, 1, 1, 0),
(140, 'order_label', 'Κατάταξη με:', NULL, 2, 1, 0),
(142, 'log_details_label', 'Log Details', NULL, 1, 1, 0),
(143, 'log_details_label', '&Lambda;&epsilon;&pi;&tau;&omicron;&mu;έ&rho;&epsilon;&iota;&epsilon;&sigmaf; &Kappa;&alpha;&tau;&alpha;&gamma;&rho;&alpha;&phi;ή&sigmaf;', NULL, 2, 1, 0),
(144, 'users_content', 'Here you can administer all the ALPHA CMS users.<p>', NULL, 1, 1, 0),
(145, 'users_content', '&Epsilon;&delta;ώ &delta;&iota;&alpha;&chi;&epsilon;&iota;&rho;ί&zeta;&epsilon;&sigma;&tau;&epsilon; ό&lambda;&omicron;&upsilon;&sigmaf; &tau;&omicron;&upsilon;&sigmaf; &chi;&rho;ή&sigma;&tau;&epsilon;&sigmaf; &tau;&omicron;&upsilon; ALPHA CMS.<p>', NULL, 2, 1, 0),
(146, 'username_label', 'Username', NULL, 1, 1, 0),
(147, 'username_label', 'Όνομα Χρήστη', NULL, 2, 1, 0),
(148, 'email_label', 'e-Mail', NULL, 1, 1, 0),
(149, 'email_label', 'Ηλ. Ταχυδρομείο', NULL, 2, 1, 0),
(150, 'type_label', 'Type', NULL, 1, 1, 0),
(151, 'type_label', 'Τύπος', NULL, 2, 1, 0),
(152, 'edit_user_label', 'Edit User', NULL, 1, 1, 0),
(153, 'edit_user_label', '&Epsilon;&pi;&epsilon;&xi;&epsilon;&rho;&gamma;&alpha;&sigma;ί&alpha; &Chi;&rho;ή&sigma;&tau;&eta;', NULL, 2, 1, 0),
(154, 'admin_label', 'Administrator', NULL, 1, 1, 0),
(155, 'admin_label', 'Διαχειριστής', NULL, 2, 1, 0),
(156, 'editor_label', 'Editor', NULL, 1, 1, 0),
(157, 'editor_label', 'Συντάκτης', NULL, 2, 1, 0),
(158, 'auditor_label', 'Auditor', NULL, 1, 1, 0),
(159, 'auditor_label', 'Ελεγκτής', NULL, 2, 1, 0),
(160, 'new_user_label', 'New User', NULL, 1, 1, 0),
(161, 'new_user_label', 'Νέος Χρήστης', NULL, 2, 1, 0),
(162, 'options_label', 'Options', NULL, 1, 1, 0),
(163, 'options_label', 'Επιλογές', NULL, 2, 1, 0),
(164, 'edit_label', 'Edit', NULL, 1, 1, 0),
(165, 'edit_label', 'Επεξεργασία', NULL, 2, 1, 0),
(166, 'delete_label', 'Delete', NULL, 1, 1, 0),
(167, 'delete_label', 'Διαγραφή', NULL, 2, 1, 0),
(168, 'are_you_sure_user_label', 'Are you sure that you want to delete user:', NULL, 1, 1, 0),
(169, 'are_you_sure_user_label', '&Sigma;ί&gamma;&omicron;&upsilon;&rho;&alpha; &theta;έ&lambda;&epsilon;&tau;&epsilon; &nu;&alpha; &delta;&iota;&alpha;&gamma;&rho;ά&psi;&epsilon;&tau;&epsilon; &tau;&omicron;&nu; &chi;&rho;ή&sigma;&tau;&eta;:', NULL, 2, 1, 0),
(170, 'del_user_label', 'Delete User', NULL, 1, 1, 0),
(171, 'del_user_label', 'Διαγραφή Χρήστη', NULL, 2, 1, 0),
(172, 'confirm_label', 'Confirm', NULL, 1, 1, 0),
(173, 'confirm_label', 'Επιβεβαίωση', NULL, 2, 1, 0),
(178, 'insert_user_label', 'Insert User', NULL, 1, 1, 0),
(176, 'logout_label', 'Logout', '', 1, 1, 0),
(177, 'logout_label', '&Alpha;&pi;&omicron;&sigma;&#0973;&nu;&delta;&epsilon;&sigma;&eta;', '', 2, 1, 0),
(179, 'insert_user_label', 'Εισαγωγή Χρήστη', NULL, 2, 1, 0),
(180, 'langs_content', 'Here you can administer all the supporting languages of your web site.\n<p></p>', '', 1, 1, 0),
(181, 'langs_content', 'Εδώ διαχειρίζεστε όλες τις γλώσσες για τον ιστοχώρο σας.</p>', NULL, 2, 1, 0),
(182, 'lang_code_label', 'Language Code', NULL, 1, 1, 0),
(183, 'lang_code_label', '&Kappa;&omega;&delta;&iota;&kappa;ό&sigmaf; &Gamma;&lambda;ώ&sigma;&sigma;&alpha;&sigmaf;', NULL, 2, 1, 0),
(184, 'language_label', 'Language', NULL, 1, 1, 0),
(185, 'language_label', 'Γλώσσα', NULL, 2, 1, 0),
(186, 'sort_order_label', 'Sort', NULL, 1, 1, 0),
(187, 'sort_order_label', '&Sigma;&epsilon;&iota;&rho;ά Εμφάνισης', NULL, 2, 1, 0),
(188, 'new_lang_label', 'New Language', NULL, 1, 1, 0),
(189, 'new_lang_label', 'Νέα Γλώσσα', NULL, 2, 1, 0),
(190, 'insert_lang_label', 'Insert Language', NULL, 1, 1, 0),
(191, 'insert_lang_label', 'Εισαγωγή Γλώσσας', NULL, 2, 1, 0),
(192, 'are_you_sure_lang_label', 'Are you sure that you want to delete language:', NULL, 1, 1, 0),
(193, 'are_you_sure_lang_label', 'Σίγουρα θέλετε να διαγράψετε τη γλώσσα:', NULL, 2, 1, 0),
(194, 'del_lang_label', 'Delete Language', NULL, 1, 1, 0),
(195, 'del_lang_label', 'Διαγραφή Γλώσσας', NULL, 2, 1, 0),
(196, 'edit_lang_label', 'Edit Language', NULL, 1, 1, 0),
(197, 'edit_lang_label', 'Επεξεργασία Γλώσσας', NULL, 2, 1, 0),
(198, 'common_content', 'Here you can administer all the common content of your web site.\n<p></p>', '', 1, 1, 0),
(199, 'common_content', 'Εδώ διαχειρίζεστε όλα τα κοινά περιεχόμενα για τον ιστοχώρο σας.<p>', NULL, 2, 1, 0),
(200, 'site_title_label', 'Site Title', NULL, 1, 1, 0),
(201, 'site_title_label', '&Tau;ί&tau;&lambda;&omicron;&sigmaf; &Iota;&sigma;&tau;&omicron;&chi;ώ&rho;&omicron;&upsilon;', NULL, 2, 1, 0),
(202, 'site_description_label', 'Site Description', NULL, 1, 1, 0),
(203, 'site_description_label', '&Pi;&epsilon;&rho;&iota;&gamma;&rho;&alpha;&phi;ή &Iota;&sigma;&tau;&omicron;&chi;ώ&rho;&omicron;&upsilon;', NULL, 2, 1, 0),
(204, 'site_keywords_label', 'Site Keywords', NULL, 1, 1, 0),
(205, 'site_keywords_label', '&Kappa;&lambda;&epsilon;&iota;&delta;&iota;ά &Iota;&sigma;&tau;&omicron;&chi;ώ&rho;&omicron;&upsilon;', NULL, 2, 1, 0),
(206, 'company_name_label', 'Company Name', NULL, 1, 1, 0),
(207, 'company_name_label', '&Epsilon;&pi;&omega;&nu;&upsilon;&mu;ί&alpha; &Epsilon;&tau;&alpha;&iota;&rho;ί&alpha;&sigmaf;', NULL, 2, 1, 0),
(208, 'company_site_label', 'Company Site', NULL, 1, 1, 0),
(209, 'company_site_label', '&Iota;&sigma;&tau;&omicron;&chi;ώ&rho;&omicron;&sigmaf; &Epsilon;&tau;&alpha;&iota;&rho;ί&alpha;&sigmaf;', NULL, 2, 1, 0),
(210, 'footer_info_label', 'Footer Info', NULL, 1, 1, 0),
(211, 'footer_info_label', '&Pi;&lambda;&eta;&rho;&omicron;&phi;&omicron;&rho;ί&epsilon;&sigmaf; &Upsilon;&pi;&omicron;&sigma;&epsilon;&lambda;ί&delta;&alpha;&sigmaf;', NULL, 2, 1, 0),
(212, 'new_common_label', 'New Common Content', NULL, 1, 1, 0),
(213, 'new_common_label', 'Νέο Κοινό Περιεχόμενο', NULL, 2, 1, 0),
(214, 'user_label', 'User:&nbsp;', NULL, 1, 1, 0),
(215, 'user_label', '&Chi;&rho;ή&sigma;&tau;&eta;&sigmaf;:&nbsp;', NULL, 2, 1, 0),
(216, 'common_details_label', 'Common Details', NULL, 1, 1, 0),
(217, 'common_details_label', 'Λεπτομέρειες Κοινού Περιεχομένου', NULL, 2, 1, 0),
(220, 'del_common_label', 'Delete Common Content', NULL, 1, 1, 0),
(221, 'del_common_label', '&Delta;&iota;&alpha;&gamma;&rho;&alpha;&phi;ή &Kappa;&omicron;&iota;&nu;&omicron;ύ &Pi;&epsilon;&rho;&iota;&epsilon;&chi;&omicron;&mu;έ&nu;&omicron;&upsilon;', NULL, 2, 1, 0),
(222, 'are_you_sure_common_label_1', 'Are you sure that you want to delete the content with title:', NULL, 1, 1, 0),
(223, 'are_you_sure_common_label_1', '&Sigma;ί&gamma;&omicron;&upsilon;&rho;&alpha; &theta;έ&lambda;&epsilon;&tau;&epsilon; &nu;&alpha; &delta;&iota;&alpha;&gamma;&rho;ά&psi;&epsilon;&tau;&epsilon; &tau;&omicron; &pi;&epsilon;&rho;&iota;&epsilon;&chi;ό&mu;&epsilon;&nu;&omicron; &mu;&epsilon; &tau;ί&tau;&lambda;&omicron;:', NULL, 2, 1, 0),
(224, 'are_you_sure_common_label_2', 'and language code:', NULL, 1, 1, 0),
(225, 'are_you_sure_common_label_2', '&kappa;&alpha;&iota; &kappa;&omega;&delta;&iota;&kappa;ό &gamma;&lambda;ώ&sigma;&sigma;&alpha;&sigmaf;:', NULL, 2, 1, 0),
(226, 'edit_common_label', 'Edit Common Content', NULL, 1, 1, 0),
(227, 'edit_common_label', '&Epsilon;&pi;&epsilon;&xi;&epsilon;&rho;&gamma;&alpha;&sigma;ί&alpha; &Kappa;&omicron;&iota;&nu;&omicron;ύ &Pi;&epsilon;&rho;&iota;&epsilon;&chi;&omicron;&mu;έ&nu;&omicron;&upsilon;', NULL, 2, 1, 0),
(228, 'entity_label', 'Entity', NULL, 1, 1, 0),
(229, 'entity_label', 'Οντότητα', NULL, 2, 1, 0),
(230, 'action_label', 'Action', NULL, 1, 1, 0),
(231, 'action_label', 'Ενέργεια', NULL, 2, 1, 0),
(232, 'del_logs_label', 'Delete All Logs', NULL, 1, 1, 0),
(233, 'del_logs_label', 'Διαγραφή Όλων', NULL, 2, 1, 0),
(234, 'are_you_sure_logs_label', 'Are you sure that you want to delete all logs?', NULL, 1, 1, 0),
(235, 'are_you_sure_logs_label', 'Σίγoυρα θέλετε να διαγράψετε όλες τις καταγραφές?', NULL, 2, 1, 0),
(236, 'all_content', 'Here you can administer all the contents of your web site.\n<p></p>\n', '', 1, 1, 0),
(237, 'all_content', 'Εδώ διαχειρίζεστε όλα τα περιεχόμενα για τον ιστοχώρο σας.<p>', NULL, 2, 1, 0),
(238, 'page_keywords_label', 'Page Keywords', NULL, 1, 1, 0),
(239, 'page_keywords_label', 'Κλειδιά Σελίδας', NULL, 2, 1, 0),
(240, 'page_label', 'Page', '', 1, 1, 0),
(241, 'page_label', '&Sigma;&epsilon;&lambda;&#0943;&delta;&alpha;', '', 2, 1, 0),
(242, 'content_label', 'Content', NULL, 1, 1, 0),
(243, 'content_label', 'Περιεχόμενο', NULL, 2, 1, 0),
(244, 'new_content_label', 'New Content', '', 1, 1, 0),
(245, 'new_content_label', 'Νέο Περιεχόμενο', NULL, 2, 1, 0),
(246, 'content_details_label', 'Content Details', NULL, 1, 1, 0),
(247, 'content_details_label', 'Λεπτομέρειες Περιεχομένου', NULL, 2, 1, 0),
(248, 'edit_content_label', 'Edit Content', NULL, 1, 1, 0),
(249, 'edit_content_label', 'Επεξεργασία Περιεχομένου', NULL, 2, 1, 0),
(250, 'are_you_sure_content_label_1', 'Are you sure that you want to delete the content with page code:', NULL, 1, 1, 0),
(251, 'are_you_sure_content_label_1', 'Σίγουρα θέλετε να διαγράψετε το περιεχόμενο με κωδικό σελίδας:', NULL, 2, 1, 0),
(252, 'are_you_sure_content_label_2', 'and language code:', NULL, 1, 1, 0),
(253, 'are_you_sure_content_label_2', 'και κωδικό σελίδας:', NULL, 2, 1, 0),
(254, 'del_content_label', 'Delete Content', NULL, 1, 1, 0),
(255, 'del_content_label', 'Διαγραφή Περιεχομένου', NULL, 2, 1, 0),
(256, 'insert_content_label', 'Insert Content', NULL, 1, 1, 0),
(257, 'insert_content_label', 'Εισαγωγή Περιεχομένου', NULL, 2, 1, 0),
(305, 'extensions_content', 'Here you can administer all the extensions of your web site.\n<p></p>', '', 1, 1, 0),
(306, 'extensions_content', '&Epsilon;&delta;&#0974; &delta;&iota;&alpha;&chi;&epsilon;&iota;&rho;&#0943;&zeta;&epsilon;&sigma;&tau;&epsilon; &#0972;&lambda;&epsilon;&sigmaf; &tau;&iota;&sigmaf; &epsilon;&pi;&epsilon;&kappa;&tau;&#0940;&sigma;&epsilon;&iota;&sigmaf; &gamma;&iota;&alpha; &tau;&omicron;&nu; &iota;&sigma;&tau;&omicron;&chi;&#0974;&rho;&omicron; &sigma;&alpha;&sigmaf;.<p></p>', '', 2, 1, 0),
(303, 'menu_content', 'Here you can administer all the menus of your web site.\n<p></p>', '', 1, 1, 0),
(304, 'menu_content', '&Epsilon;&delta;&#0974; &delta;&iota;&alpha;&chi;&epsilon;&iota;&rho;&#0943;&zeta;&epsilon;&sigma;&tau;&epsilon; &#0972;&lambda;&alpha; &tau;&alpha; &mu;&epsilon;&nu;&omicron;&#0973;&nbsp;&gamma;&iota;&alpha; &tau;&omicron;&nu; &iota;&sigma;&tau;&omicron;&chi;&#0974;&rho;&omicron; &sigma;&alpha;&sigmaf;.<p></p>', '', 2, 1, 0),
(307, 'caller_label', 'Caller', '', 1, 1, 0),
(308, 'caller_label', '&Kappa;&alpha;&lambda;&#0974;&nu;', '', 2, 1, 0),
(309, 'parent_menu_id_label', 'Parent Menu ID', '', 1, 1, 0),
(310, 'parent_menu_id_label', '&Gamma;&omicron;&nu;&iota;&kappa;&#0972; &Alpha;&nu;&alpha;&gamma;&nu;&omega;&rho;&iota;&sigma;&tau;&iota;&kappa;&#0972; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(311, 'menu_name_label', 'Menu Name', '', 1, 1, 0),
(312, 'menu_name_label', '&#0908;&nu;&omicron;&mu;&alpha; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(313, 'menu_link_label', 'Menu Link', '', 1, 1, 0),
(314, 'menu_link_label', '&Sigma;&#0973;&nu;&delta;&epsilon;&sigma;&mu;&omicron;&sigmaf; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(315, 'new_menu_label', 'New Menu', '', 1, 1, 0),
(316, 'new_menu_label', '&Nu;&#0941;&omicron; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(322, 'are_you_sure_menu_label_1', 'Are you sure that you want to delete the menu:', '', 1, 1, 0),
(323, 'are_you_sure_menu_label_1', '&Sigma;&#0943;&gamma;&omicron;&upsilon;&rho;&alpha; &theta;&#0941;&lambda;&epsilon;&tau;&epsilon; &nu;&alpha; &delta;&iota;&alpha;&gamma;&rho;&#0940;&psi;&epsilon;&tau;&epsilon; &tau;&omicron; &mu;&epsilon;&nu;&omicron;&#0973;:', '', 2, 1, 0),
(324, 'are_you_sure_menu_label_2', '&mu;&epsilon; &kappa;&omega;&delta;&iota;&kappa;&#0972; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha;&sigmaf;:', '', 2, 1, 0),
(325, 'are_you_sure_menu_label_2', 'with language code:', '', 1, 1, 0),
(326, 'del_menu_label', 'Delete Menu', '', 1, 1, 0),
(327, 'del_menu_label', '&Delta;&iota;&alpha;&gamma;&rho;&alpha;&phi;&#0942; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(328, 'insert_menu_label', '&Epsilon;&iota;&sigma;&alpha;&gamma;&omega;&gamma;&#0942; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(329, 'insert_menu_label', 'Insert Menu', '', 1, 1, 0),
(330, 'edit_menu_label', 'Edit Menu', '', 1, 1, 0),
(331, 'edit_menu_label', '&Epsilon;&pi;&epsilon;&xi;&epsilon;&rho;&gamma;&alpha;&sigma;&#0943;&alpha; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(335, 'records', 'Records:', '', 1, 1, 0),
(336, 'records', '&Epsilon;&gamma;&gamma;&rho;&alpha;&phi;&#0941;&sigmaf;:', '', 2, 1, 0),
(337, 'none_label', 'None', '', 1, 1, 0),
(338, 'none_label', '&Kappa;&alpha;&nu;&#0941;&nu;&alpha;', '', 2, 1, 0),
(339, 'other_label', 'Other', '', 1, 1, 0),
(340, 'other_label', '&#0902;&lambda;&lambda;&omicron;', '', 2, 1, 0),
(341, 'select_caller_label', 'Select Caller', '', 1, 1, 0),
(342, 'select_caller_label', '&Epsilon;&pi;&iota;&lambda;&#0941;&xi;&tau;&epsilon; &Kappa;&alpha;&lambda;&#0974;&nu;', '', 2, 1, 0),
(349, 'route_label', 'Route', '', 1, 1, 0),
(350, 'route_label', '&Delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942;', '', 2, 1, 0),
(365, 'no_label', 'No', '', 1, 1, 0),
(364, 'yes_label', '&Nu;&alpha;&iota;', '', 2, 1, 0),
(367, 'protected_content_label', 'Protected Content', '', 1, 1, 0),
(363, 'yes_label', 'Yes', '', 1, 1, 0),
(366, 'no_label', '&#0908;&chi;&iota;', '', 2, 1, 0),
(392, 'protected_content_label', '&Pi;&rho;&omicron;&sigma;&tau;&alpha;&tau;&epsilon;&upsilon;&mu;&#0941;&nu;&omicron; &Pi;&epsilon;&rho;&iota;&epsilon;&chi;&#0972;&mu;&epsilon;&nu;&omicron;', '', 2, 1, 0),
(430, 'main_menu_structure_label', 'Main Menu Structure', '', 1, 1, 0),
(431, 'main_menu_structure_label', '&Beta;&alpha;&sigma;&iota;&kappa;&#0942; &Delta;&omicron;&mu;&#0942; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(432, 'orphan_menu_items_label', 'Orphan Menu Items', '', 1, 1, 0),
(433, 'orphan_menu_items_label', '&Omicron;&rho;&phi;&alpha;&nu;&#0940; &Sigma;&tau;&omicron;&iota;&chi;&epsilon;&#0943;&alpha; &Mu;&epsilon;&nu;&omicron;&#0973;', '', 2, 1, 0),
(448, 'page_num_label', '&Sigma;&epsilon;&lambda;&#0943;&delta;&alpha;', '', 2, 1, 0),
(447, 'page_num_label', 'Page', '', 1, 1, 0),
(461, 'error_inv_user_name', 'Error: Invalid username!', '', 1, 1, 0),
(462, 'error_inv_user_name', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972; &#0972;&nu;&omicron;&mu;&alpha; &chi;&rho;&#0942;&sigma;&tau;&eta;!', '', 2, 1, 0),
(463, 'error_inv_pass', 'Error: Invalid password!', '', 1, 1, 0),
(464, 'error_inv_pass', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972;&sigmaf; &kappa;&omega;&delta;&iota;&kappa;&#0972;&sigmaf;!', '', 2, 1, 0),
(465, 'error_pass_mismatch', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Omicron;&iota; &kappa;&omega;&delta;&iota;&kappa;&omicron;&#0943; &delta;&epsilon;&nu; &tau;&alpha;&iota;&rho;&iota;&#0940;&zeta;&omicron;&upsilon;&nu;!', '', 2, 1, 0),
(466, 'error_pass_mismatch', 'Error: Passwords do not match!', '', 1, 1, 0),
(467, 'error_inv_email', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972; e-mail!\n', '', 2, 1, 0),
(468, 'error_inv_email', 'Error: Invalid e-mail!', '', 1, 1, 0),
(469, 'error_email_mismatch', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&alpha; e-mail &delta;&epsilon;&nu; &tau;&alpha;&iota;&rho;&iota;&#0940;&zeta;&omicron;&upsilon;&nu;!', '', 2, 1, 0),
(470, 'error_email_mismatch', 'Error: e-Mails do not match!', '', 1, 1, 0),
(471, 'error_same_user', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Alpha;&upsilon;&tau;&#0972;&sigmaf; &omicron; &chi;&rho;&#0942;&sigma;&tau;&eta;&sigmaf; &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(472, 'error_same_user', 'Error: This user already exists!', '', 1, 1, 0),
(473, 'error_wrong_credentials', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Lambda;&#0940;&theta;&omicron;&sigmaf; &sigma;&tau;&omicron;&iota;&chi;&epsilon;&#0943;&alpha;!', '', 2, 1, 0),
(474, 'error_wrong_credentials', 'Error: Wrong credentials!', '', 1, 1, 0),
(475, 'error_pass_not_blank', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Omicron; &kappa;&omega;&delta;&iota;&kappa;&#0972;&sigmaf; &delta;&epsilon;&nu; &mu;&pi;&omicron;&rho;&epsilon;&#0943; &nu;&alpha; &epsilon;&#0943;&nu;&alpha;&iota; &kappa;&epsilon;&nu;&#0972;&sigmaf;!', '', 2, 1, 0),
(476, 'error_pass_not_blank', 'Error: The password can not be blank!', '', 1, 1, 0),
(477, 'error_short_pass', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Omicron; &kappa;&omega;&delta;&iota;&kappa;&#0972;&sigmaf; &pi;&rho;&#0941;&pi;&epsilon;&iota; &nu;&alpha; &epsilon;&#0943;&nu;&alpha;&iota; &tau;&omicron;&upsilon;&lambda;&#0940;&chi;&iota;&sigma;&tau;&omicron;&nu; 8 &chi;&alpha;&rho;&alpha;&kappa;&tau;&#0942;&rho;&epsilon;&sigmaf;!', '', 2, 1, 0),
(478, 'error_short_pass', 'Error: Password should be at least 8 characters long!', '', 1, 1, 0),
(479, 'error_mal_chars', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Alpha;&nu;&iota;&chi;&nu;&epsilon;&#0973;&tau;&eta;&kappa;&alpha;&nu; &epsilon;&pi;&iota;&kappa;&#0943;&nu;&delta;&upsilon;&nu;&omicron;&iota; &chi;&alpha;&rho;&alpha;&kappa;&tau;&#0942;&rho;&epsilon;&sigmaf;!', '', 2, 1, 0),
(480, 'error_mal_chars', 'Error: Malicious characters detected!', '', 1, 1, 0),
(481, 'error_user_not_ins', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Omicron; &chi;&rho;&#0942;&sigma;&tau;&eta;&sigmaf; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&iota;&sigma;&alpha;&chi;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(482, 'error_user_not_ins', 'Error: The user could not be inserted!', '', 1, 1, 0),
(483, 'error_user_not_upd', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Omicron; &chi;&rho;&#0942;&sigma;&tau;&eta;&sigmaf; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&nu;&eta;&mu;&epsilon;&rho;&omega;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(484, 'error_user_not_upd', 'Error: The user could not be updated!', '', 1, 1, 0),
(485, 'error_same_email', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Alpha;&upsilon;&tau;&#0972; &tau;&omicron; email &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(486, 'error_same_email', 'Error: This email already exists!', '', 1, 1, 0),
(487, 'error_inv_lang', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0942; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha;!', '', 2, 1, 0),
(488, 'error_inv_lang', 'Error: Invalid language!', '', 1, 1, 0),
(489, 'error_inv_lang_code', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972;&sigmaf; &kappa;&omega;&delta;&iota;&kappa;&#0972;&sigmaf; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha;&sigmaf;!', '', 2, 1, 0),
(490, 'error_inv_lang_code', 'Error: Invalid language code!', '', 1, 1, 0),
(491, 'error_inv_sort', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972;&sigmaf; &alpha;&rho;&iota;&theta;&mu;&#0972;&sigmaf; &sigma;&epsilon;&iota;&rho;&#0940;&sigmaf;!', '', 2, 1, 0),
(492, 'error_inv_sort', 'Error: Invalid sort order!', '', 1, 1, 0),
(493, 'error_lang_exists', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Alpha;&upsilon;&tau;&#0942; &eta; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha; &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(494, 'error_lang_exists', 'Error: This language already exists!', '', 1, 1, 0),
(495, 'error_sort_exists', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Eta; &epsilon;&pi;&iota;&lambda;&epsilon;&gamma;&mu;&#0941;&nu;&eta; &sigma;&epsilon;&iota;&rho;&#0940; &epsilon;&mu;&phi;&#0940;&nu;&iota;&sigma;&eta;&sigmaf; &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(496, 'error_sort_exists', 'Error: The current sort already exists!', '', 1, 1, 0),
(497, 'error_lang_not_ins', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Eta; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&iota;&sigma;&alpha;&chi;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(498, 'error_lang_not_ins', 'Error: The language could not be inserted!', '', 1, 1, 0),
(499, 'error_lang_not_upd', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Eta; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&nu;&eta;&mu;&epsilon;&rho;&omega;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(500, 'error_lang_not_upd', 'Error: The language could not be updated!', '', 1, 1, 0),
(501, 'error_lang_code_exists', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Omicron; &kappa;&omega;&delta;&iota;&kappa;&#0972;&sigmaf; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha;&sigmaf; &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(502, 'error_lang_code_exists', 'Error: The language code already exists!', '', 1, 1, 0),
(503, 'error_inv_site_title', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972;&sigmaf; &tau;&#0943;&tau;&lambda;&omicron;&sigmaf; &iota;&sigma;&tau;&omicron;&chi;&#0974;&rho;&omicron;&upsilon;!', '', 2, 1, 0),
(504, 'error_inv_site_title', 'Error: Invalid site title!', '', 1, 1, 0),
(505, 'error_common_binded_route_lang_exists', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&iota;&alpha; &epsilon;&gamma;&gamma;&rho;&alpha;&phi;&#0942; &gamma;&iota;&alpha; &tau;&eta;&nu; &epsilon;&pi;&iota;&lambda;&epsilon;&gamma;&mu;&#0941;&nu;&eta; &sigma;&upsilon;&nu;&delta;&epsilon;&delta;&epsilon;&mu;&#0941;&nu;&eta; &delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942; &sigma;&epsilon; &alpha;&upsilon;&tau;&#0942; &tau;&eta; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha; &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(506, 'error_common_binded_route_lang_exists', 'Error: A record for the selected binded route for this language already exists!', '', 1, 1, 0),
(507, 'error_common_not_ins', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&omicron; &kappa;&omicron;&iota;&nu;&#0972; &pi;&epsilon;&rho;&iota;&epsilon;&chi;&#0972;&mu;&epsilon;&nu;&omicron; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&iota;&sigma;&alpha;&chi;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(508, 'error_common_not_ins', 'Error: The common content could not be inserted!', '', 1, 1, 0),
(509, 'error_common_not_upd', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&omicron; &kappa;&omicron;&iota;&nu;&#0972; &pi;&epsilon;&rho;&iota;&epsilon;&chi;&#0972;&mu;&epsilon;&nu;&omicron; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&nu;&eta;&mu;&epsilon;&rho;&omega;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(510, 'error_common_not_upd', 'Error: The common content could not be updated!', '', 1, 1, 0),
(511, 'error_route_exists', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Eta; &delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942; &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(512, 'error_route_exists', 'Error: The route already exists!', '', 1, 1, 0),
(513, 'error_inv_page', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0942; &sigma;&epsilon;&lambda;&#0943;&delta;&alpha;!', '', 2, 1, 0),
(514, 'error_inv_page', 'Error: Invalid page!', '', 1, 1, 0),
(515, 'error_content_not_ins', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&omicron; &pi;&epsilon;&rho;&iota;&epsilon;&chi;&#0972;&mu;&epsilon;&nu;&omicron; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&iota;&sigma;&alpha;&chi;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(516, 'error_content_not_ins', 'Error: The content could not be inserted!', '', 1, 1, 0),
(517, 'error_content_not_upd', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&omicron; &pi;&epsilon;&rho;&iota;&epsilon;&chi;&#0972;&mu;&epsilon;&nu;&omicron; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&nu;&eta;&mu;&epsilon;&rho;&omega;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(518, 'error_content_not_upd', 'Error: The content could not be updated!', '', 1, 1, 0),
(519, 'error_route_not_created', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Eta; &delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &delta;&eta;&mu;&iota;&omicron;&upsilon;&rho;&gamma;&eta;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(520, 'error_route_not_created', 'Error: The route could not be created!', '', 1, 1, 0),
(521, 'error_route_not_deleted', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Eta; &delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &delta;&iota;&alpha;&gamma;&rho;&alpha;&phi;&epsilon;&#0943;!', '', 2, 1, 0),
(522, 'error_route_not_deleted', 'Error: The route could not be deleted!', '', 1, 1, 0),
(523, 'error_inv_caller', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972;&sigmaf; &kappa;&alpha;&lambda;&#0974;&nu;!', '', 2, 1, 0),
(524, 'error_inv_caller', 'Error: Invalid caller!', '', 1, 1, 0),
(525, 'error_inv_pid', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972; &alpha;&nu;&alpha;&gamma;&nu;&omega;&rho;&iota;&sigma;&tau;&iota;&kappa;&#0972; &gamma;&#0972;&nu;&omicron;&upsilon;!', '', 2, 1, 0),
(526, 'error_inv_pid', 'Error: Invalid parent menu ID!', '', 1, 1, 0),
(527, 'error_inv_menu_name', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &alpha;&pi;&omicron;&delta;&epsilon;&kappa;&tau;&#0972; &#0972;&nu;&omicron;&mu;&alpha; &mu;&epsilon;&nu;&omicron;&#0973;!', '', 2, 1, 0),
(528, 'error_inv_menu_name', 'Error: Invalid menu name!', '', 1, 1, 0),
(536, 'rows_num_label', 'Total Rows', '', 1, 1, 0),
(537, 'rows_num_label', '&Sigma;&#0973;&nu;&omicron;&lambda;&omicron; &Sigma;&epsilon;&iota;&rho;&#0974;&nu;', '', 2, 1, 0),
(538, 'total_pages_num_label', 'Total Pages', '', 1, 1, 0),
(539, 'total_pages_num_label', '&Sigma;&#0973;&nu;&omicron;&lambda;&omicron; &Sigma;&epsilon;&lambda;&#0943;&delta;&omega;&nu;', '', 2, 1, 0),
(540, 'error_content_page_exists', 'Error: A record for this page in this language already exists!', '', 1, 1, 0),
(541, 'error_content_page_exists', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&iota;&alpha; &epsilon;&gamma;&gamma;&rho;&alpha;&phi;&#0942; &gamma;&iota;&alpha; &alpha;&upsilon;&tau;&#0942; &tau;&eta; &sigma;&epsilon;&lambda;&#0943;&delta;&alpha; &sigma;&epsilon; &alpha;&upsilon;&tau;&#0942; &tau;&eta; &gamma;&lambda;&#0974;&sigma;&sigma;&alpha; &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(573, 'error_user_exists', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Alpha;&upsilon;&tau;&#0972;&sigmaf; &omicron; &chi;&rho;&#0942;&sigma;&tau;&eta;&sigmaf; &#0942; &tau;&omicron; email &upsilon;&pi;&#0940;&rho;&chi;&epsilon;&iota; &#0942;&delta;&eta;!', '', 2, 1, 0),
(574, 'error_user_exists', 'Error: This user or email already exists!', '', 1, 1, 0),
(575, 'error_menu_not_ins', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&omicron; &mu;&epsilon;&nu;&omicron;&#0973; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&iota;&sigma;&alpha;&chi;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(576, 'error_menu_not_ins', 'Error: The menu could not be inserted!', '', 1, 1, 0),
(577, 'error_menu_not_upd', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&omicron; &mu;&epsilon;&nu;&omicron;&#0973; &delta;&epsilon; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &epsilon;&nu;&eta;&mu;&epsilon;&rho;&omega;&theta;&epsilon;&#0943;!', '', 2, 1, 0),
(578, 'error_menu_not_upd', 'Error: The menu could not be updated!', '', 1, 1, 0),
(579, 'success_reg_completed', '&Epsilon;&pi;&iota;&tau;&upsilon;&chi;&#0943;&alpha;: &Eta; &epsilon;&gamma;&gamma;&rho;&alpha;&phi;&#0942; &omicron;&lambda;&omicron;&kappa;&lambda;&eta;&rho;&#0974;&theta;&eta;&kappa;&epsilon;!', '', 2, 1, 0),
(580, 'success_reg_completed', 'Success: Registration completed!', '', 1, 1, 0),
(581, 'error_same_user_attr', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Tau;&omicron; &#0972;&nu;&omicron;&mu;&alpha; &chi;&rho;&#0942;&sigma;&tau;&eta; &#0942; &tau;&omicron; e-mail &epsilon;&#0943;&nu;&alpha;&iota; &#0942;&delta;&eta; &sigma;&epsilon; &chi;&rho;&#0942;&sigma;&eta;!', '', 2, 1, 0),
(583, 'error_same_user_attr', 'Error: Username or e-mail already in use!', '', 1, 1, 0),
(586, 'rows_per_page_num_label', 'Rows/Page', '', 1, 1, 0),
(587, 'rows_per_page_num_label', '&Sigma;&epsilon;&iota;&rho;&#0941;&sigmaf;/&Sigma;&epsilon;&lambda;&#0943;&delta;&alpha;', '', 2, 1, 0),
(595, 'select_parent_menu_id_label', '&Epsilon;&pi;&iota;&lambda;&#0941;&xi;&tau;&epsilon; &Gamma;&omicron;&nu;&iota;&kappa;&#0972; &Alpha;&nu;&alpha;&gamma;&nu;&omega;&rho;&iota;&sigma;&tau;&iota;&kappa;&#0972;', '', 2, 1, 0),
(596, 'select_parent_menu_id_label', 'Select Parent Menu ID', '', 1, 1, 0),
(603, 'ext_title_label', '&Tau;&#0943;&tau;&lambda;&omicron;&sigmaf; &Epsilon;&pi;&#0941;&kappa;&tau;&alpha;&sigma;&eta;&sigmaf;', '', 2, 1, 0),
(602, 'ext_title_label', 'Extension Title', '', 1, 1, 0),
(604, 'path_label', 'Path', '', 1, 1, 0),
(605, 'path_label', '&Delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942;', '', 2, 1, 0),
(606, 'status_label', 'Status', '', 1, 1, 0),
(607, 'status_label', '&Kappa;&alpha;&tau;&#0940;&sigma;&tau;&alpha;&sigma;&eta;', '', 2, 1, 0),
(614, 'set_ext_label', 'Extension Settings', '', 1, 1, 0),
(615, 'set_ext_label', '&Rho;&upsilon;&theta;&mu;&iota;&sigma;&tau;&iota;&kappa;&#0940; &Epsilon;&pi;&#0941;&kappa;&tau;&alpha;&sigma;&eta;&sigmaf;', '', 2, 1, 0),
(616, 'error_ext_not_conf', 'Error: The extension could not be configured!', '', 1, 1, 0),
(617, 'error_ext_not_conf', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Eta; &epsilon;&pi;&#0941;&kappa;&tau;&alpha;&sigma;&eta; &delta;&epsilon;&nu; &mu;&pi;&#0972;&rho;&epsilon;&sigma;&epsilon; &nu;&alpha; &rho;&upsilon;&theta;&mu;&iota;&sigma;&tau;&epsilon;&#0943;!', '', 2, 1, 0),
(618, 'protected_label', 'Protected', '', 1, 1, 0),
(619, 'protected_label', '&Pi;&rho;&omicron;&sigma;&tau;&alpha;&tau;&epsilon;&upsilon;&mu;&#0941;&nu;&omicron;', '', 2, 1, 0),
(620, 'configure_label', 'Configure', '', 1, 1, 0),
(621, 'configure_label', '&Rho;&upsilon;&theta;&mu;&#0943;&sigma;&epsilon;&iota;&sigmaf;', '', 2, 1, 0),
(622, 'notice_no_set', 'Notice: There are no settings for this extension!', '', 1, 1, 0),
(623, 'notice_no_set', '&Alpha;&nu;&alpha;&phi;&omicron;&rho;&#0940;: &Delta;&epsilon;&nu; &upsilon;&pi;&#0940;&rho;&chi;&omicron;&upsilon;&nu; &rho;&upsilon;&theta;&mu;&iota;&sigma;&tau;&iota;&kappa;&#0940; &gamma;&iota;&alpha; &alpha;&upsilon;&tau;&#0942;&nu; &tau;&eta;&nu; &epsilon;&pi;&#0941;&kappa;&tau;&alpha;&sigma;&eta;!', '', 2, 1, 0),
(626, 'default_label', 'Default', '', 1, 1, 0),
(627, 'default_label', '&Pi;&rho;&omicron;&epsilon;&pi;&iota;&lambda;&omicron;&gamma;&#0942;', '', 2, 1, 0),
(628, 'search_label', '&Psi;&#0940;&xi;&epsilon;', '', 2, 1, 0),
(629, 'search_label', 'Search', '', 1, 1, 0),
(630, 'are_you_sure_ext_label', 'Are you sure that you want to delete', '', 1, 1, 0),
(631, 'extension_label', 'extension', '', 1, 1, 0),
(632, 'del_ext_label', 'Delete Extension', '', 1, 1, 0),
(633, 'are_you_sure_ext_label', '&Sigma;&#0943;&gamma;&omicron;&upsilon;&rho;&alpha; &theta;&#0941;&lambda;&epsilon;&tau;&epsilon; &nu;&alpha; &delta;&iota;&alpha;&gamma;&rho;&#0940;&psi;&epsilon;&tau;&epsilon; &tau;&eta;&nu;', '', 2, 1, 0),
(634, 'extension_label', '&epsilon;&pi;&#0941;&kappa;&tau;&alpha;&sigma;&eta;', '', 2, 1, 0),
(635, 'del_ext_label', '&Delta;&iota;&alpha;&gamma;&rho;&alpha;&phi;&#0942; &Epsilon;&pi;&#0941;&kappa;&tau;&alpha;&sigma;&eta;&sigmaf;\n', '', 2, 1, 0),
(658, 'root_label', 'root', '', 1, 1, 0),
(659, 'root_label', 'root', '', 2, 1, 0),
(660, 'error_inv_route', 'Error: Invalid route!', '', 1, 1, 0),
(661, 'error_inv_route', '&Sigma;&phi;&#0940;&lambda;&mu;&alpha;: &Mu;&eta; &#0941;&gamma;&kappa;&upsilon;&rho;&eta; &delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942;!', '', 2, 1, 0),
(662, 'binded_route_label', 'Binded Route', '', 1, 1, 0),
(663, 'binded_route_label', '&Sigma;&upsilon;&nu;&delta;&epsilon;&delta;&epsilon;&mu;&#0941;&nu;&eta; &Delta;&iota;&alpha;&delta;&rho;&omicron;&mu;&#0942;', '', 2, 1, 0),
(664, 'error_service_unavailable', 'Error: The service is currently unavailable!', '', 1, 1, 0),
(665, 'mail_stored', 'Your e-mail was stored successfully!', '', 1, 1, 0),
(666, 'mail_not_stored', 'Your e-mail was not stored due to a problem!', '', 1, 1, 0),
(667, 'oops_error', 'Oops! Something went bad, try again...', '', 1, 1, 0),
(668, 'about_greyos', '<div>\n  GreyOS is the digital representation of you. It consolidates all of your needs and integrates things you want. It personalizes the Internet based on your will, no matter where you are, and satisfies your needs, no matter what you ask. On GreyOS, you can work, have fun, socialize, search the web, store files, etc. GreyOS is global, personal, international, beyond any device and 100% free!</div>\n<p>\n GreyOS also provides an online framework for developers that enables integration and consolidation of all kinds and types of applications with an easy to learn A.P.I.</p>\n', '', 1, 0, 0),
(670, 'cdev_box_msg_box_placeholder', 'Type your e-mail...\n', '', 1, 0, 0),
(671, 'greyos_motto', '...is all about you.', '', 1, 0, 0),
(672, 'cdev_box_button', 'Subscribe', '', 1, 0, 0),
(669, 'subscription_msg', '<p>\n  If you want to learn more about GreyOS then type down your e-mail in order to be informed for more to come...</p>\n', '', 1, 0, 0),
(673, 'cdev_email_exists', 'Hm... it seems like you have already subscribed!', '', 1, 0, 0),
(674, 'signup', 'Sign up', '', 1, 1, 0),
(675, 'signup', '&Epsilon;&gamma;&gamma;&rho;&alpha;&phi;&#0942;', '', 2, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `alpha_languages`
--

CREATE TABLE IF NOT EXISTS `alpha_languages` (
`id` int(3) unsigned NOT NULL,
  `lang_code` varchar(2) NOT NULL,
  `language` varchar(25) NOT NULL,
  `sort_order` int(3) unsigned NOT NULL,
  `is_default` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_protected` tinyint(1) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `alpha_languages`
--

INSERT INTO `alpha_languages` (`id`, `lang_code`, `language`, `sort_order`, `is_default`, `is_protected`) VALUES
(1, 'en', 'English', 1, 1, 1),
(2, 'gr', 'Greek', 2, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `alpha_logs`
--

CREATE TABLE IF NOT EXISTS `alpha_logs` (
`id` int(10) unsigned NOT NULL,
  `entity` varchar(18) NOT NULL,
  `error_code` varchar(5) DEFAULT NULL,
  `message` text NOT NULL,
  `file` varchar(255) DEFAULT NULL,
  `line` varchar(10) DEFAULT NULL,
  `date_time` datetime NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `alpha_menu`
--

CREATE TABLE IF NOT EXISTS `alpha_menu` (
`id` int(3) unsigned NOT NULL,
  `caller` varchar(255) NOT NULL,
  `parent_menu_id` int(3) unsigned NOT NULL,
  `menu_name` varchar(255) NOT NULL,
  `menu_link` varchar(255) DEFAULT NULL,
  `lang_id` int(3) unsigned NOT NULL,
  `sort_order` int(3) unsigned NOT NULL,
  `is_protected` tinyint(1) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `alpha_users`
--

CREATE TABLE IF NOT EXISTS `alpha_users` (
`id` int(3) unsigned NOT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` tinyint(1) unsigned NOT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `alpha_users`
--

INSERT INTO `alpha_users` (`id`, `username`, `email`, `password`, `type`) VALUES
(1, 'admin', 'admin@greyos.gr', '4a70ecd62a0284d13fb0b9d4c0d30601', 0);

-- --------------------------------------------------------

--
-- Table structure for table `dock`
--

CREATE TABLE IF NOT EXISTS `dock` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `applications` text NOT NULL COMMENT 'JSON object which contains the structure of dock'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `dock`
--

INSERT INTO `dock` (`id`, `user_id`, `applications`) VALUES
(1, 1, '[{"app_id":"coyote_app","reference_name":"coyote","position":"0","title":"Coyote :: A Web browser inside the browser ;-) Click me!"},{"app_id":"greyos_mail_app","reference_name":"greyos_mail","position":"1","title":"GreyOS M@il :: Integrated mail accounts. Click me!"},{"app_id":"radio_dude_app","reference_name":"radio_dude","position":"2","title":"Radio Dude :: Put some tunes in your life. Click me!"},{"app_id":"i_youtube_app","reference_name":"i_youtube","position":"3","title":"Youtube :: Youtube, the GreyOS way. Click me!"},{"app_id":"i_fb_app","reference_name":"i_fb","position":"4","title":"Facebook :: Socialize with a sense of GreyOS. Click me!"},{"app_id":"twitter_app","reference_name":"i_twitter","position":"5","title":"Twitter :: Tweeting from GreyOS is so much more fun. Click me!"},{"app_id":"disqus_app","reference_name":"i_disqus","position":"6","title":"Disqus :: Manage your discussions in one place. Click me!"},{"app_id":"i_linkedin_app","reference_name":"i_linkedin","position":"7","title":"Linkedin :: Professional network with style. Click me!"},{"app_id":"rooster","reference_name":"rooster","position":"8","title":"Rooster :: The ultimate tasks manager & scheduler. Coming soon..."},{"app_id":"greyos_cloud","reference_name":"greyos_cloud","position":"9","title":"GreyOS Cloud :: Unlimited cloud storage for FREE. Coming soon..."},{"app_id":"greyos_talk","reference_name":"greyos_talk","position":"10","title":"GreyOS talk :: Chat and speak with your dudes for FREE. Coming soon..."},{"app_id":"map_fuzion","reference_name":"map_fuzion","position":"11","title":"Map FuZioN :: Navigate the world in detail. Coming soon..."}]');

-- --------------------------------------------------------

--
-- Table structure for table `facebook_ids`
--

CREATE TABLE IF NOT EXISTS `facebook_ids` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `fb_id` bigint(12) unsigned NOT NULL,
  `fb_name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `fb_unread_messages`
--

CREATE TABLE IF NOT EXISTS `fb_unread_messages` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `message_id` bigint(20) unsigned NOT NULL,
  `updated_time` bigint(13) unsigned NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `mail_identities`
--

CREATE TABLE IF NOT EXISTS `mail_identities` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(128) NOT NULL,
  `timezone` varchar(50) NOT NULL,
  `imap_host` varchar(128) NOT NULL,
  `imap_port` int(5) unsigned NOT NULL,
  `imap_ssl` varchar(128) NOT NULL,
  `smtp_host` varchar(128) NOT NULL,
  `smtp_port` int(5) unsigned NOT NULL,
  `smtp_ssl` varchar(128) NOT NULL,
  `password` varchar(128) DEFAULT NULL,
  `signature` text,
  `html_signature` text,
  `icon` varchar(128) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `mail_sessions`
--

CREATE TABLE IF NOT EXISTS `mail_sessions` (
  `id` varchar(32) NOT NULL,
`ses_id` bigint(12) unsigned NOT NULL,
  `identity_id` bigint(12) unsigned NOT NULL,
  `access` int(10) unsigned DEFAULT NULL,
  `data` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_disqus`
--

CREATE TABLE IF NOT EXISTS `oauth_disqus` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `ip` varchar(15) NOT NULL,
  `access_token` varchar(80) NOT NULL,
  `refresh_token` varchar(80) NOT NULL,
  `disqus_user_id` int(11) NOT NULL,
  `disqus_username` varchar(80) NOT NULL,
  `expires_in` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = inactive and 1 = active'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_facebook`
--

CREATE TABLE IF NOT EXISTS `oauth_facebook` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `facebook_access_token` varchar(80) NOT NULL,
  `facebook_id` decimal(21,0) NOT NULL,
  `facebook_name` varchar(100) NOT NULL,
  `request_check_time` decimal(13,0) NOT NULL,
  `message_check_time` decimal(13,0) NOT NULL,
  `notification_check_time` decimal(13,0) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = inactive and 1 = active'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_linkedin`
--

CREATE TABLE IF NOT EXISTS `oauth_linkedin` (
`id` bigint(12) unsigned NOT NULL,
  `talos_id` bigint(12) unsigned NOT NULL,
  `ip` varchar(15) NOT NULL,
  `access_token` text NOT NULL,
  `expires` datetime NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = inactive and 1 = active'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_twitter`
--

CREATE TABLE IF NOT EXISTS `oauth_twitter` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `ip` varchar(15) NOT NULL,
  `oauth_token` varchar(80) NOT NULL,
  `oauth_token_secret` varchar(80) NOT NULL,
  `twitter_user_id` int(11) NOT NULL,
  `screen_name` varchar(32) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = inactive and 1 = active'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_youtube`
--

CREATE TABLE IF NOT EXISTS `oauth_youtube` (
`id` bigint(12) unsigned NOT NULL,
  `user_id` bigint(12) unsigned NOT NULL,
  `ip` varchar(15) NOT NULL,
  `youtube_token` varchar(80) NOT NULL,
  `youtube_refresh_token` varchar(80) NOT NULL,
  `youtube_expires_token` datetime NOT NULL,
  `youtube_channel_id` varchar(32) NOT NULL,
  `youtube_user_id` varchar(32) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = inactive and 1 = active'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `oauth_youtube`
--

INSERT INTO `oauth_youtube` (`id`, `user_id`, `ip`, `youtube_token`, `youtube_refresh_token`, `youtube_expires_token`, `youtube_channel_id`, `youtube_user_id`, `active`) VALUES
(1, 1, '::1', 'ya29.OAEKngrgm52JA1uRiHKXdjcfW_3Ud26GolNE-LSfecUDYfhgZsxVjTo_CZ9amE-1NFJlyvPNq7F', '1/r7beB8U9dXPcuUzbX67A5YHRAVhNWHXllAKIx0Pw3GcMEudVrK5jSpoR30zcRFq6', '2015-03-16 12:49:09', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `talos`
--

CREATE TABLE IF NOT EXISTS `talos` (
`id` bigint(12) unsigned NOT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `verification_code` varchar(32) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `talos`
--

INSERT INTO `talos` (`id`, `username`, `email`, `password`, `verification_code`, `active`) VALUES
(1, 'demo', 'contact@greyos.gr', '4c7a34d25eff9121c49658dbceadf694', '00000000000000000000000000000000', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alpha_common`
--
ALTER TABLE `alpha_common`
 ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `site_title` (`site_title`), ADD FULLTEXT KEY `site_description` (`site_description`), ADD FULLTEXT KEY `site_keywords` (`site_keywords`), ADD FULLTEXT KEY `footer_info` (`footer_info`), ADD FULLTEXT KEY `binded_route` (`binded_route`);

--
-- Indexes for table `alpha_content`
--
ALTER TABLE `alpha_content`
 ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `page` (`page`), ADD FULLTEXT KEY `content` (`content`), ADD FULLTEXT KEY `keywords` (`keywords`);

--
-- Indexes for table `alpha_languages`
--
ALTER TABLE `alpha_languages`
 ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `lang_code` (`lang_code`), ADD FULLTEXT KEY `language` (`language`);

--
-- Indexes for table `alpha_logs`
--
ALTER TABLE `alpha_logs`
 ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `message` (`message`), ADD FULLTEXT KEY `file` (`file`), ADD FULLTEXT KEY `error_code` (`error_code`);

--
-- Indexes for table `alpha_menu`
--
ALTER TABLE `alpha_menu`
 ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `caller` (`caller`), ADD FULLTEXT KEY `menu_name` (`menu_name`), ADD FULLTEXT KEY `menu_link` (`menu_link`);

--
-- Indexes for table `alpha_users`
--
ALTER TABLE `alpha_users`
 ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `email` (`email`), ADD FULLTEXT KEY `username` (`username`);

--
-- Indexes for table `dock`
--
ALTER TABLE `dock`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `facebook_ids`
--
ALTER TABLE `facebook_ids`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fb_unread_messages`
--
ALTER TABLE `fb_unread_messages`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mail_identities`
--
ALTER TABLE `mail_identities`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mail_sessions`
--
ALTER TABLE `mail_sessions`
 ADD PRIMARY KEY (`ses_id`);

--
-- Indexes for table `oauth_disqus`
--
ALTER TABLE `oauth_disqus`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_facebook`
--
ALTER TABLE `oauth_facebook`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_linkedin`
--
ALTER TABLE `oauth_linkedin`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_twitter`
--
ALTER TABLE `oauth_twitter`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_youtube`
--
ALTER TABLE `oauth_youtube`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `talos`
--
ALTER TABLE `talos`
 ADD PRIMARY KEY (`id`), ADD FULLTEXT KEY `username` (`username`), ADD FULLTEXT KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alpha_common`
--
ALTER TABLE `alpha_common`
MODIFY `id` int(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `alpha_content`
--
ALTER TABLE `alpha_content`
MODIFY `id` int(5) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=676;
--
-- AUTO_INCREMENT for table `alpha_languages`
--
ALTER TABLE `alpha_languages`
MODIFY `id` int(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `alpha_logs`
--
ALTER TABLE `alpha_logs`
MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alpha_menu`
--
ALTER TABLE `alpha_menu`
MODIFY `id` int(3) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `alpha_users`
--
ALTER TABLE `alpha_users`
MODIFY `id` int(3) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `dock`
--
ALTER TABLE `dock`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `facebook_ids`
--
ALTER TABLE `facebook_ids`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `fb_unread_messages`
--
ALTER TABLE `fb_unread_messages`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mail_identities`
--
ALTER TABLE `mail_identities`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mail_sessions`
--
ALTER TABLE `mail_sessions`
MODIFY `ses_id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oauth_disqus`
--
ALTER TABLE `oauth_disqus`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oauth_facebook`
--
ALTER TABLE `oauth_facebook`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oauth_linkedin`
--
ALTER TABLE `oauth_linkedin`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oauth_twitter`
--
ALTER TABLE `oauth_twitter`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oauth_youtube`
--
ALTER TABLE `oauth_youtube`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `talos`
--
ALTER TABLE `talos`
MODIFY `id` bigint(12) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
