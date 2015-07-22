/*
 * CKFinder
 * ========
 * http://ckfinder.com
 * Copyright (C) 2007-2012, CKSource - Frederico Knabben. All rights reserved.
 *
 * The software, this file and its contents are subject to the CKFinder
 * License. Please read the license.txt file before using, installing, copying,
 * modifying or distribute this file or part of its contents. The contents of
 * this file is part of the Source Code of CKFinder.
 *
 */

/**
 * @fileOverview Defines the {@link CKFinder.lang} object, for the English
 *		language. This is the base file for all translations.
 */

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['he'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, לא נגיש</span>',
		confirmCancel	: 'חקל ממאפיינים שונו. ברצונך לסגור חלון?',
		ok				: 'אישור',
		cancel			: 'ביטול',
		confirmationTitle	: 'אישור',
		messageTitle	: 'מידע',
		inputTitle		: 'שאלה',
		undo			: 'לבטל',
		redo			: 'לעשות שוב',
		skip			: 'דלג',
		skipAll			: 'דלג הכל',
		makeDecision	: 'איזו פעולה לבצע?',
		rememberDecision: 'זכור החלטתי'
	},


	dir : 'rtl',
	HelpLang : 'en',
	LangCode : 'he',

	// Date Format
	//		d    : Day
	//		dd   : Day (padding zero)
	//		m    : Month
	//		mm   : Month (padding zero)
	//		yy   : Year (two digits)
	//		yyyy : Year (four digits)
	//		h    : Hour (12 hour clock)
	//		hh   : Hour (12 hour clock, padding zero)
	//		H    : Hour (24 hour clock)
	//		HH   : Hour (24 hour clock, padding zero)
	//		M    : Minute
	//		MM   : Minute (padding zero)
	//		a    : Firt char of AM/PM
	//		aa   : AM/PM
	DateTime : 'm/d/yyyy h:MM aa',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'תיקיות',
	FolderLoading	: 'טוען...',
	FolderNew		: 'הקלד שם חדש לתיקיה: ',
	FolderRename	: 'הקלד שם חדש לתיקיה: ',
	FolderDelete	: 'האם ברצונך למחוק תיקיה "%1" ?',
	FolderRenaming	: ' (משנה שם...)',
	FolderDeleting	: ' (מוחק...)',

	// Files
	FileRename		: 'הקלש שם חדש לקובץ: ',
	FileRenameExt	: 'האם ברוצונך לשנות טיפוס של הקובץ',
	FileRenaming	: 'משנה שם...',
	FileDelete		: 'האם ברצונך למחוק קובץ "%1"?',
	FilesLoading	: 'טוען...',
	FilesEmpty		: 'תיקיה ריקה',
	FilesMoved		: 'קובץ %1 הוזז ל- %2:%3',
	FilesCopied		: 'קובץ %1 הועתק ל- %2:%3',

	// Basket
	BasketFolder		: 'סל',
	BasketClear			: 'נקה סל',
	BasketRemove		: 'הורד מסל',
	BasketOpenFolder	: 'פתח תיקיית אב',
	BasketTruncateConfirm : 'האם ברוצונך למחוק את כל הקבצים מסל?',
	BasketRemoveConfirm	: 'האם ברוצונך למחוק את קובץ "%1" מסל?',
	BasketEmpty			: 'אין קבצים בסל, גרור ושחרר משהוא.',
	BasketCopyFilesHere	: 'העתק קבצים מסל',
	BasketMoveFilesHere	: 'הזז קבצים מסל',

	BasketPasteErrorOther	: 'קובץ %s שגיאה: %e',
	BasketPasteMoveSuccess	: 'קבצים הבאים הוזזו: %s',
	BasketPasteCopySuccess	: 'קבצים הבאים הועתקו: %s',

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'העלאה',
	UploadTip	: 'לעלות קובץ חדש',
	Refresh		: 'רענון',
	Settings	: 'הגדרות',
	Help		: 'עזרה',
	HelpTip		: 'עזרה',

	// Context Menus
	Select			: 'בחר',
	SelectThumbnail : 'בחר תמונה קטנה',
	View			: 'צפה',
	Download		: 'הורד',

	NewSubFolder	: 'תת-תיקיה חדשה',
	Rename			: 'שנה שם',
	Delete			: 'מחק',

	CopyDragDrop	: 'העתק קבצים לכאן',
	MoveDragDrop	: 'הזז קבצים לכאן',

	// Dialogs
	RenameDlgTitle		: 'שנה שם',
	NewNameDlgTitle		: 'שם חדש',
	FileExistsDlgTitle	: 'קובץ כבר קיים',
	SysErrorDlgTitle : 'שגיעת מערכת',

	FileOverwrite	: 'החלף',
	FileAutorename	: 'אוטומטית לשנות שם',

	// Generic
	OkBtn		: 'אישור',
	CancelBtn	: 'ביטול',
	CloseBtn	: 'סגור',

	// Upload Panel
	UploadTitle			: 'העלאת קובץ חדש',
	UploadSelectLbl		: 'בחר קובץ להעלאה',
	UploadProgressLbl	: '(העלאה בתהליך, אנא המתן...)',
	UploadBtn			: 'לעלות קובץ',
	UploadBtnCancel		: 'ביטול',

	UploadNoFileMsg		: 'נא לבחור קובץ מהמחשב שלך',
	UploadNoFolder		: 'נא לבחור תיקיה לפני העלאה.',
	UploadNoPerms		: 'העלאת קובץ אסורה.',
	UploadUnknError		: 'שגיעה בשליחת קובץ.',
	UploadExtIncorrect	: 'סוג קובץ זה לא מאושר בתיקיה זאת.',

	// Settings Panel
	SetTitle		: 'הגדרות',
	SetView			: 'צפה:',
	SetViewThumb	: 'תמונות קטנות',
	SetViewList		: 'רשימה',
	SetDisplay		: 'תצוגה:',
	SetDisplayName	: 'שם קובץ',
	SetDisplayDate	: 'תאריך',
	SetDisplaySize	: 'גודל קובץ',
	SetSort			: 'מיון:',
	SetSortName		: 'לפי שם',
	SetSortDate		: 'לפי תאריך',
	SetSortSize		: 'לפי גודל',

	// Status Bar
	FilesCountEmpty : '<תיקיה ריקה>',
	FilesCountOne	: 'קובץ 1',
	FilesCountMany	: '%1 קבצים',

	// Size and Speed
	Kb				: '%1 kB',
	KbPerSecond		: '%1 kB/s',

	// Connector Error Messages.
	ErrorUnknown	: 'בקשה נכשלה. שגיאה. (Error %1)',
	Errors :
	{
	 10 : 'Invalid command.',
	 11 : 'The resource type was not specified in the request.',
	 12 : 'The requested resource type is not valid.',
	102 : 'Invalid file or folder name.',
	103 : 'It was not possible to complete the request due to authorization restrictions.',
	104 : 'It was not possible to complete the request due to file system permission restrictions.',
	105 : 'Invalid file extension.',
	109 : 'Invalid request.',
	110 : 'Unknown error.',
	115 : 'A file or folder with the same name already exists.',
	116 : 'Folder not found. Please refresh and try again.',
	117 : 'File not found. Please refresh the files list and try again.',
	118 : 'Source and target paths are equal.',
	201 : 'A file with the same name is already available. The uploaded file has been renamed to "%1"',
	202 : 'Invalid file',
	203 : 'Invalid file. The file size is too big.',
	204 : 'The uploaded file is corrupt.',
	205 : 'No temporary folder is available for upload in the server.',
	206 : 'Upload cancelled for security reasons. The file contains HTML like data.',
	207 : 'The uploaded file has been renamed to "%1"',
	300 : 'Moving file(s) failed.',
	301 : 'Copying file(s) failed.',
	500 : 'The file browser is disabled for security reasons. Please contact your system administrator and check the CKFinder configuration file.',
	501 : 'The thumbnails support is disabled.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'שם קובץ לא יכול להיות ריק',
		FileExists		: 'קובץ %s already exists',
		FolderEmpty		: 'שם תיקיה לא יכול להיות ריק',

		FileInvChar		: 'שם הקובץ לא יכול לכלול תווים הבאים: \n\\ / : * ? " < > |',
		FolderInvChar	: 'שם התיקיה לא יכול לכלול תווים הבאים: \n\\ / : * ? " < > |',

		PopupBlockView	: 'בלתי אפשרי לפתוח קובץ בחלון חדש. נא לבדוק הגדרות דפדפן ולבטל כל החוסמים חלונות קופצות.'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'שנה גודל %s',
		sizeTooBig		: 'לא יכול לקבוע גובה ורוחב של תמונה יותר גדול מדודל מקורי (%size).',
		resizeSuccess	: 'גודל שונה שהצלחה.',
		thumbnailNew	: 'ליצור תמונה קטנה)טומבנייל(',
		thumbnailSmall	: 'קטן (%s)',
		thumbnailMedium	: 'בינוני (%s)',
		thumbnailLarge	: 'גדול (%s)',
		newSize			: 'קבע גודל חדש',
		width			: 'רוחב',
		height			: 'גובה',
		invalidHeight	: 'גובה לא חוקי.',
		invalidWidth	: 'רוחב לא חוקי.',
		invalidName		: 'שם קובץ לא חוקי.',
		newImage		: 'ליצור תמונה חדשה',
		noExtensionChange : 'לא ניתן לשנות סוג קובץ.',
		imageSmall		: 'מקור תמונה קטן מדי',
		contextMenuName	: 'שנה גודל'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'שמור',
		fileOpenError	: 'לא מצליח לפתוח קובץ.',
		fileSaveSuccess	: 'קובץ משמר בהצלחה.',
		contextMenuName	: 'עריכה',
		loadingFile		: 'טוען קובץ, אנא המתן...'
	}
};
