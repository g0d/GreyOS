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
 * @fileOverview Defines the {@link CKFinder.lang} object, for the Swedish
 *		language. This is the base file for all translations.
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['sv'] =
{
	appTitle : 'CKFinder', // MISSING

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, unavailable</span>', // MISSING
		confirmCancel	: 'Some of the options have been changed. Are you sure to close the dialog?', // MISSING
		ok				: 'OK', // MISSING
		cancel			: 'Cancel', // MISSING
		confirmationTitle	: 'Confirmation', // MISSING
		messageTitle	: 'Information', // MISSING
		inputTitle		: 'Question', // MISSING
		undo			: 'Undo', // MISSING
		redo			: 'Redo', // MISSING
		skip			: 'Skip', // MISSING
		skipAll			: 'Skip all', // MISSING
		makeDecision	: 'What action should be taken?', // MISSING
		rememberDecision: 'Remember my decision' // MISSING
	},


	dir : 'ltr', // MISSING
	HelpLang : 'en',
	LangCode : 'en', // MISSING

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
	DateTime : 'yyyy-mm-dd HH:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Mappar',
	FolderLoading	: 'Laddar...',
	FolderNew		: 'Skriv namnet på den nya mappen: ',
	FolderRename	: 'Skriv det nya namnet på mappen: ',
	FolderDelete	: 'Är du säker på att du vill radera mappen "%1"?',
	FolderRenaming	: ' (Byter mappens namn...)',
	FolderDeleting	: ' (Raderar...)',

	// Files
	FileRename		: 'Skriv det nya filnamnet: ',
	FileRenameExt	: 'Är du säker på att du fill ändra på filändelsen? Filen kan bli oanvändbar',
	FileRenaming	: 'Byter filnamn...',
	FileDelete		: 'Är du säker på att du vill radera filen "%1"?',
	FilesLoading	: 'Loading...', // MISSING
	FilesEmpty		: 'Empty folder', // MISSING
	FilesMoved		: 'File %1 moved into %2:%3', // MISSING
	FilesCopied		: 'File %1 copied into %2:%3', // MISSING

	// Basket
	BasketFolder		: 'Basket', // MISSING
	BasketClear			: 'Clear Basket', // MISSING
	BasketRemove		: 'Remove from basket', // MISSING
	BasketOpenFolder	: 'Open parent folder', // MISSING
	BasketTruncateConfirm : 'Do you really want to remove all files from the basket?', // MISSING
	BasketRemoveConfirm	: 'Do you really want to remove the file "%1" from the basket?', // MISSING
	BasketEmpty			: 'No files in the basket, drag\'n\'drop some.', // MISSING
	BasketCopyFilesHere	: 'Copy Files from Basket', // MISSING
	BasketMoveFilesHere	: 'Move Files from Basket', // MISSING

	BasketPasteErrorOther	: 'File %s error: %e', // MISSING
	BasketPasteMoveSuccess	: 'The following files were moved: %s', // MISSING
	BasketPasteCopySuccess	: 'The following files were copied: %s', // MISSING

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'Ladda upp',
	UploadTip	: 'Ladda upp en ny fil',
	Refresh		: 'Uppdatera',
	Settings	: 'Inställningar',
	Help		: 'Hjälp',
	HelpTip		: 'Hjälp',

	// Context Menus
	Select			: 'Infoga bild',
	SelectThumbnail : 'Infoga som tumnagel',
	View			: 'Visa',
	Download		: 'Ladda ner',

	NewSubFolder	: 'Ny Undermapp',
	Rename			: 'Byt namn',
	Delete			: 'Radera',

	CopyDragDrop	: 'Copy file here', // MISSING
	MoveDragDrop	: 'Move file here', // MISSING

	// Dialogs
	RenameDlgTitle		: 'Rename', // MISSING
	NewNameDlgTitle		: 'New name', // MISSING
	FileExistsDlgTitle	: 'File already exists', // MISSING
	SysErrorDlgTitle : 'System error', // MISSING

	FileOverwrite	: 'Overwrite', // MISSING
	FileAutorename	: 'Auto-rename', // MISSING

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Avbryt',
	CloseBtn	: 'Stäng',

	// Upload Panel
	UploadTitle			: 'Ladda upp en ny fil',
	UploadSelectLbl		: 'Välj fil att ladda upp',
	UploadProgressLbl	: '(Laddar upp filen, var god vänta...)',
	UploadBtn			: 'Ladda upp den valda filen',
	UploadBtnCancel		: 'Cancel', // MISSING

	UploadNoFileMsg		: 'Välj en fil från din dator',
	UploadNoFolder		: 'Please select folder before uploading.', // MISSING
	UploadNoPerms		: 'File upload not allowed.', // MISSING
	UploadUnknError		: 'Error sending the file.', // MISSING
	UploadExtIncorrect	: 'File extension not allowed in this folder.', // MISSING

	// Settings Panel
	SetTitle		: 'Inställningar',
	SetView			: 'Visa:',
	SetViewThumb	: 'Tumnaglar',
	SetViewList		: 'Lista',
	SetDisplay		: 'Visa:',
	SetDisplayName	: 'Filnamn',
	SetDisplayDate	: 'Datum',
	SetDisplaySize	: 'Filstorlek',
	SetSort			: 'Sortering:',
	SetSortName		: 'Filnamn',
	SetSortDate		: 'Datum',
	SetSortSize		: 'Storlek',

	// Status Bar
	FilesCountEmpty : '<Tom Mapp>',
	FilesCountOne	: '1 fil',
	FilesCountMany	: '%1 filer',

	// Size and Speed
	Kb				: '%1 kB', // MISSING
	KbPerSecond		: '%1 kB/s', // MISSING

	// Connector Error Messages.
	ErrorUnknown	: 'Begäran kunde inte utföras eftersom ett fel uppstod. (Error %1)',
	Errors :
	{
	 10 : 'Ogiltig begäran.',
	 11 : 'Resursens typ var inte specificerad i förfrågan.',
	 12 : 'Den efterfrågade resurstypen är inte giltig.',
	102 : 'Ogiltigt fil- eller mappnamn.',
	103 : 'Begäran kunde inte utföras p.g.a. restriktioner av rättigheterna.',
	104 : 'Begäran kunde inte utföras p.g.a. restriktioner av rättigheter i filsystemet.',
	105 : 'Ogiltig filändelse.',
	109 : 'Ogiltig begäran.',
	110 : 'Okänt fel.',
	115 : 'En fil eller mapp med aktuellt namn finns redan.',
	116 : 'Mappen kunde inte hittas. Var god uppdatera sidan och försök igen.',
	117 : 'Filen kunde inte hittas. Var god uppdatera sidan och försök igen.',
	118 : 'Source and target paths are equal.', // MISSING
	201 : 'En fil med aktuellt namn fanns redan. Den uppladdade filen har döpts om till "%1"',
	202 : 'Ogiltig fil',
	203 : 'Ogiltig fil. Filen var för stor.',
	204 : 'Den uppladdade filen var korrupt.',
	205 : 'En tillfällig mapp för uppladdning är inte tillgänglig på servern.',
	206 : 'Uppladdningen stoppades av säkerhetsskäl. Filen innehåller HTML-liknande data.',
	207 : 'Den uppladdade filen har döpts om till "%1"',
	300 : 'Moving file(s) failed.', // MISSING
	301 : 'Copying file(s) failed.', // MISSING
	500 : 'Filhanteraren har stoppats av säkerhetsskäl. Var god kontakta administratören för att kontrollera konfigurationsfilen för CKFinder.',
	501 : 'Stöd för tumnaglar har stängts av.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Filnamnet får inte vara tomt',
		FileExists		: 'File %s already exists', // MISSING
		FolderEmpty		: 'Mappens namn får inte vara tomt',

		FileInvChar		: 'Filnamnet får inte innehålla något av följande tecken: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Mappens namn får inte innehålla något av följande tecken: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Det gick inte att öppna filen i ett nytt fönster. Ändra inställningarna i din webbläsare och tillåt popupfönster för den här hemsidan.'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Resize %s', // MISSING
		sizeTooBig		: 'Cannot set image height or width to a value bigger than the original size (%size).', // MISSING
		resizeSuccess	: 'Image resized successfully.', // MISSING
		thumbnailNew	: 'Create new thumbnail', // MISSING
		thumbnailSmall	: 'Small (%s)', // MISSING
		thumbnailMedium	: 'Medium (%s)', // MISSING
		thumbnailLarge	: 'Large (%s)', // MISSING
		newSize			: 'Set new size', // MISSING
		width			: 'Width', // MISSING
		height			: 'Height', // MISSING
		invalidHeight	: 'Invalid height.', // MISSING
		invalidWidth	: 'Invalid width.', // MISSING
		invalidName		: 'Invalid file name.', // MISSING
		newImage		: 'Create new image', // MISSING
		noExtensionChange : 'The file extension cannot be changed.', // MISSING
		imageSmall		: 'Source image is too small', // MISSING
		contextMenuName	: 'Resize' // MISSING
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Save', // MISSING
		fileOpenError	: 'Unable to open file.', // MISSING
		fileSaveSuccess	: 'File saved successfully.', // MISSING
		contextMenuName	: 'Edit', // MISSING
		loadingFile		: 'Loading file, please wait...' // MISSING
	}
};
