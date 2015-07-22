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
* @fileOverview
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['cs'] =
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
	LangCode : 'cs',

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
	FoldersTitle	: 'Složky',
	FolderLoading	: 'Načítání...',
	FolderNew		: 'Zadejte jméno nové složky: ',
	FolderRename	: 'Zadejte nové jméno složky: ',
	FolderDelete	: 'Opravdu chcete smazat složku "%1" ?',
	FolderRenaming	: ' (Přejmenovávám...)',
	FolderDeleting	: ' (Mažu...)',

	// Files
	FileRename		: 'Zadejte jméno novéhho souboru: ',
	FileRenameExt	: 'Opravdu chcete změnit příponu souboru, může se stát nečitelným',
	FileRenaming	: 'Přejmenovávám...',
	FileDelete		: 'Opravdu chcete smazat soubor "%1"?',
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
	Upload		: 'Nahrát',
	UploadTip	: 'Nahrát nový soubor',
	Refresh		: 'Načíst znova',
	Settings	: 'Nastavení',
	Help		: 'Pomoc',
	HelpTip		: 'Pomoc',

	// Context Menus
	Select			: 'Vybrat',
	SelectThumbnail : 'Vybrat náhled',
	View			: 'Zobrazit',
	Download		: 'Uložit jako',

	NewSubFolder	: 'Nová podsložka',
	Rename			: 'Přejmenovat',
	Delete			: 'Smazat',

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
	CancelBtn	: 'Zrušit',
	CloseBtn	: 'Zavřít',

	// Upload Panel
	UploadTitle			: 'Nahrát nový soubor',
	UploadSelectLbl		: 'Zvolit soubor k nahrání',
	UploadProgressLbl	: '(Nahrávám, čekejte...)',
	UploadBtn			: 'Nahrát zvolený soubor',
	UploadBtnCancel		: 'Cancel', // MISSING

	UploadNoFileMsg		: 'Vyberte prosím soubor',
	UploadNoFolder		: 'Please select folder before uploading.', // MISSING
	UploadNoPerms		: 'File upload not allowed.', // MISSING
	UploadUnknError		: 'Error sending the file.', // MISSING
	UploadExtIncorrect	: 'File extension not allowed in this folder.', // MISSING

	// Settings Panel
	SetTitle		: 'Nastavení',
	SetView			: 'Zobrazení:',
	SetViewThumb	: 'Náhledy',
	SetViewList		: 'Seznam',
	SetDisplay		: 'Informace:',
	SetDisplayName	: 'Název',
	SetDisplayDate	: 'Datum',
	SetDisplaySize	: 'Velikost',
	SetSort			: 'Seřazení:',
	SetSortName		: 'Podle jména',
	SetSortDate		: 'Podle data',
	SetSortSize		: 'Podle velikosti',

	// Status Bar
	FilesCountEmpty : '<Prázdná složka>',
	FilesCountOne	: '1 soubor',
	FilesCountMany	: '%1 soubor',

	// Size and Speed
	Kb				: '%1 kB',
	KbPerSecond		: '%1 kB/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Nebylo možno dokončit příkaz. (Error %1)',
	Errors :
	{
	 10 : 'Neplatný příkaz.',
	 11 : 'Požadovaný typ prostředku nebyl specifikován v dotazu.',
	 12 : 'Požadovaný typ prostředku není validní.',
	102 : 'Šatné jméno souboru, nebo složky.',
	103 : 'Nebylo možné dokončit příkaz kvůli autorizačním omezením.',
	104 : 'Nebylo možné dokončit příkaz kvůli omezeným přístupovým právům k souborům.',
	105 : 'Špatná přípona souboru.',
	109 : 'Neplatný příkaz.',
	110 : 'Neznámá chyba.',
	115 : 'Již existuje soubor nebo složka se stejným jménem.',
	116 : 'Složka nenalezena, prosím obnovte stránku.',
	117 : 'Soubor nenalezen, prosím obnovte stránku.',
	118 : 'Source and target paths are equal.', // MISSING
	201 : 'Již existoval soubor se stejným jménem, nahraný soubor byl přejmenován na "%1"',
	202 : 'Špatný soubor',
	203 : 'Špatný soubor. Příliš velký.',
	204 : 'Nahraný soubor je poškozen.',
	205 : 'Na serveru není dostupná dočasná složka.',
	206 : 'Nahrávání zrušeno z bezpečnostních důvodů. Soubor obsahuje data podobná HTML.',
	207 : 'Nahraný soubor byl přejmenován na "%1"',
	300 : 'Moving file(s) failed.', // MISSING
	301 : 'Copying file(s) failed.', // MISSING
	500 : 'Nahrávání zrušeno z bezpečnostních důvodů. Zdělte to prosím administrátorovi a zkontrolujte nastavení CKFinderu.',
	501 : 'Podpora náhledů je vypnuta.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Název souboru nemůže být prázdný',
		FileExists		: 'File %s already exists', // MISSING
		FolderEmpty		: 'Název složky nemůže být prázdný',

		FileInvChar		: 'Název souboru nesmí obsahovat následující znaky: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Název složky nesmí obsahovat následující znaky: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Nebylo možné otevřít soubor do nového okna. Prosím nastavte si prohlížeč aby neblokoval vyskakovací okna.'
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
