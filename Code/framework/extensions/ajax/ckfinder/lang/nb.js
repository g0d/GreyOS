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
CKFinder.lang['nb'] =
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
	LangCode : 'no',

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
	DateTime : 'dd/mm/yyyy HH:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Mapper',
	FolderLoading	: 'Laster...',
	FolderNew		: 'Skriv inn det nye mappenavnet: ',
	FolderRename	: 'Skriv inn det nye mappenavnet: ',
	FolderDelete	: 'Er du sikker på at du vil slette mappen "%1"?',
	FolderRenaming	: ' (Endrer mappenavn...)',
	FolderDeleting	: ' (Sletter...)',

	// Files
	FileRename		: 'Skriv inn det nye filnavnet: ',
	FileRenameExt	: 'Er du sikker på at du vil endre filtypen? Filen kan bli ubrukelig',
	FileRenaming	: 'Endrer filnavn...',
	FileDelete		: 'Er du sikker på at du vil slette denne filen "%1"?',
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
	Upload		: 'Last opp',
	UploadTip	: 'Last opp en ny fil',
	Refresh		: 'Oppdater',
	Settings	: 'Innstillinger',
	Help		: 'Hjelp',
	HelpTip		: 'Hjelp finnes kun på engelsk',

	// Context Menus
	Select			: 'Velg',
	SelectThumbnail : 'Velg Miniatyr',
	View			: 'Vis fullversjon',
	Download		: 'Last ned',

	NewSubFolder	: 'Ny Undermappe',
	Rename			: 'Endre navn',
	Delete			: 'Slett',

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
	CloseBtn	: 'Lukk',

	// Upload Panel
	UploadTitle			: 'Last opp ny fil',
	UploadSelectLbl		: 'Velg filen du vil laste opp',
	UploadProgressLbl	: '(Laster opp filen, vennligst vent...)',
	UploadBtn			: 'Last opp valgt fil',
	UploadBtnCancel		: 'Cancel', // MISSING

	UploadNoFileMsg		: 'Du må velge en fil fra din datamaskin',
	UploadNoFolder		: 'Please select folder before uploading.', // MISSING
	UploadNoPerms		: 'File upload not allowed.', // MISSING
	UploadUnknError		: 'Error sending the file.', // MISSING
	UploadExtIncorrect	: 'File extension not allowed in this folder.', // MISSING

	// Settings Panel
	SetTitle		: 'Innstillinger',
	SetView			: 'Filvisning:',
	SetViewThumb	: 'Miniatyrbilder',
	SetViewList		: 'Liste',
	SetDisplay		: 'Vis:',
	SetDisplayName	: 'Filnavn',
	SetDisplayDate	: 'Dato',
	SetDisplaySize	: 'Filstørrelse',
	SetSort			: 'Sorter etter:',
	SetSortName		: 'Filnavn',
	SetSortDate		: 'Dato',
	SetSortSize		: 'Størrelse',

	// Status Bar
	FilesCountEmpty : '<Tom Mappe>',
	FilesCountOne	: '1 fil',
	FilesCountMany	: '%1 filer',

	// Size and Speed
	Kb				: '%1 kB',
	KbPerSecond		: '%1 kB/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Det var ikke mulig å utføre forespørselen. (Feil %1)',
	Errors :
	{
	 10 : 'Ugyldig kommando.',
	 11 : 'Ressurstypen ble ikke spesifisert i forepørselen.',
	 12 : 'Ugyldig ressurstype.',
	102 : 'Ugyldig fil- eller mappenavn.',
	103 : 'Kunne ikke utføre forespørselen pga manglende autorisasjon.',
	104 : 'Kunne ikke utføre forespørselen pga manglende tilgang til filsystemet.',
	105 : 'Ugyldig filtype.',
	109 : 'Ugyldig forespørsel.',
	110 : 'Ukjent feil.',
	115 : 'Det finnes allerede en fil eller mappe med dette navnet.',
	116 : 'Kunne ikke finne mappen. Oppdater vinduet og prøv igjen.',
	117 : 'Kunne ikke finne filen. Oppdater vinduet og prøv igjen.',
	118 : 'Source and target paths are equal.', // MISSING
	201 : 'Det fantes allerede en fil med dette navnet. Den opplastede filens navn har blitt endret til "%1"',
	202 : 'Ugyldig fil',
	203 : 'Ugyldig fil. Filen er for stor.',
	204 : 'Den opplastede filen er korrupt.',
	205 : 'Det finnes ingen midlertidig mappe for filopplastinger.',
	206 : 'Opplastingen ble avbrutt av sikkerhetshensyn. Filen inneholder HTML-aktig data.',
	207 : 'Den opplastede filens navn har blitt endret til "%1"',
	300 : 'Moving file(s) failed.', // MISSING
	301 : 'Copying file(s) failed.', // MISSING
	500 : 'Filvelgeren ikke tilgjengelig av sikkerhetshensyn. Kontakt systemansvarlig og be han sjekke CKFinder\'s konfigurasjonsfil.',
	501 : 'Funksjon for minityrbilder er skrudd av.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Filnavnet kan ikke være tomt',
		FileExists		: 'File %s already exists', // MISSING
		FolderEmpty		: 'Mappenavnet kan ikke være tomt',

		FileInvChar		: 'Filnavnet kan ikke inneholde følgende tegn: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Mappenavnet kan ikke inneholde følgende tegn: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Du må skru av popup-blockeren for å se bildet i nytt vindu.'
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
