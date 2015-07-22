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
 * @fileOverview Defines the {@link CKFinder.lang} object, for the Latvian
 *		language. This is the base file for all translations.
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['lv'] =
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
	LangCode : 'lv',

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
	DateTime : 'dd/mm/yyyy H:MM',
	DateAmPm : ['AM', 'PM'],

	// Folders
	FoldersTitle	: 'Mapes',
	FolderLoading	: 'Ielādē...',
	FolderNew		: 'Lūdzu ierakstiet mapes nosaukumu: ',
	FolderRename	: 'Lūdzu ierakstiet jauno mapes nosaukumu: ',
	FolderDelete	: 'Vai tiešām vēlaties neatgriezeniski dzēst mapi "%1"?',
	FolderRenaming	: ' (Pārsauc...)',
	FolderDeleting	: ' (Dzēš...)',

	// Files
	FileRename		: 'Lūdzu ierakstiet jauno faila nosaukumu: ',
	FileRenameExt	: 'Vai tiešām vēlaties mainīt faila paplašinājumu? Fails var palikt nelietojams.',
	FileRenaming	: 'Pārsauc...',
	FileDelete		: 'Vai tiešām vēlaties neatgriezeniski dzēst failu "%1"?',
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
	Upload		: 'Augšupielādēt',
	UploadTip	: 'Augšupielādēt jaunu failu',
	Refresh		: 'Pārlādēt',
	Settings	: 'Uzstādījumi',
	Help		: 'Palīdzība',
	HelpTip		: 'Palīdzība',

	// Context Menus
	Select			: 'Izvēlēties',
	SelectThumbnail : 'Izvēlēties sīkbildi',
	View			: 'Skatīt',
	Download		: 'Lejupielādēt',

	NewSubFolder	: 'Jauna apakšmape',
	Rename			: 'Pārsaukt',
	Delete			: 'Dzēst',

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
	OkBtn		: 'Labi',
	CancelBtn	: 'Atcelt',
	CloseBtn	: 'Aizvērt',

	// Upload Panel
	UploadTitle			: 'Jauna faila augšupielādēšana',
	UploadSelectLbl		: 'Izvēlaties failu, ko augšupielādēt',
	UploadProgressLbl	: '(Augšupielādē, lūdzu uzgaidiet...)',
	UploadBtn			: 'Augšupielādēt izvēlēto failu',
	UploadBtnCancel		: 'Cancel', // MISSING

	UploadNoFileMsg		: 'Lūdzu izvēlaties failu no sava datora',
	UploadNoFolder		: 'Please select folder before uploading.', // MISSING
	UploadNoPerms		: 'File upload not allowed.', // MISSING
	UploadUnknError		: 'Error sending the file.', // MISSING
	UploadExtIncorrect	: 'File extension not allowed in this folder.', // MISSING

	// Settings Panel
	SetTitle		: 'Uzstādījumi',
	SetView			: 'Attēlot:',
	SetViewThumb	: 'Sīkbildes',
	SetViewList		: 'Failu Sarakstu',
	SetDisplay		: 'Rādīt:',
	SetDisplayName	: 'Faila Nosaukumu',
	SetDisplayDate	: 'Datumu',
	SetDisplaySize	: 'Faila Izmēru',
	SetSort			: 'Kārtot:',
	SetSortName		: 'pēc Faila Nosaukuma',
	SetSortDate		: 'pēc Datuma',
	SetSortSize		: 'pēc Izmēra',

	// Status Bar
	FilesCountEmpty : '<Tukša mape>',
	FilesCountOne	: '1 fails',
	FilesCountMany	: '%1 faili',

	// Size and Speed
	Kb				: '%1 kB',
	KbPerSecond		: '%1 kB/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Nebija iespējams pabeigt pieprasījumu. (Kļūda %1)',
	Errors :
	{
	 10 : 'Nederīga komanda.',
	 11 : 'Resursa veids netika norādīts pieprasījumā.',
	 12 : 'Pieprasītais resursa veids nav derīgs.',
	102 : 'Nederīgs faila vai mapes nosaukums.',
	103 : 'Nav iespējams pabeigt pieprasījumu, autorizācijas aizliegumu dēļ.',
	104 : 'Nav iespējams pabeigt pieprasījumu, failu sistēmas atļauju ierobežojumu dēļ.',
	105 : 'Neatļauts faila paplašinājums.',
	109 : 'Nederīgs pieprasījums.',
	110 : 'Nezināma kļūda.',
	115 : 'Fails vai mape ar šādu nosaukumu jau pastāv.',
	116 : 'Mape nav atrasta. Lūdzu pārlādējiet šo logu un mēģiniet vēlreiz.',
	117 : 'Fails nav atrasts. Lūdzu pārlādējiet failu sarakstu un mēģiniet vēlreiz.',
	118 : 'Source and target paths are equal.', // MISSING
	201 : 'Fails ar šādu nosaukumu jau eksistē. Augšupielādētais fails tika pārsaukts par "%1"',
	202 : 'Nederīgs fails',
	203 : 'Nederīgs fails. Faila izmērs pārsniedz pieļaujamo.',
	204 : 'Augšupielādētais fails ir bojāts.',
	205 : 'Neviena pagaidu mape nav pieejama priekš augšupielādēšanas uz servera.',
	206 : 'Augšupielāde atcelta drošības apsvērumu dēļ. Fails satur HTML veida datus.',
	207 : 'Augšupielādētais fails tika pārsaukts par "%1"',
	300 : 'Moving file(s) failed.', // MISSING
	301 : 'Copying file(s) failed.', // MISSING
	500 : 'Failu pārlūks ir atslēgts drošības apsvērumu dēļ. Lūdzu sazinieties ar šīs sistēmas tehnisko administratoru vai pārbaudiet CKFinder konfigurācijas failu.',
	501 : 'Sīkbilžu atbalsts ir atslēgts.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Faila nosaukumā nevar būt tukšums',
		FileExists		: 'File %s already exists', // MISSING
		FolderEmpty		: 'Mapes nosaukumā nevar būt tukšums',

		FileInvChar		: 'Faila nosaukums nedrīkst saturēt nevienu no sekojošajām zīmēm: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Mapes nosaukums nedrīkst saturēt nevienu no sekojošajām zīmēm: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Nav iespējams failu atvērt jaunā logā. Lūdzu veiciet izmaiņas uzstādījumos savai interneta pārlūkprogrammai un izslēdziet visus uznirstošo logu bloķētājus šai adresei.'
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
