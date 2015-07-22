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
CKFinder.lang['nl'] =
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
	LangCode : 'nl',

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
	FoldersTitle	: 'Mappen',
	FolderLoading	: 'Laden...',
	FolderNew		: 'Vul de mapnaam in: ',
	FolderRename	: 'Vul de nieuwe mapnaam in: ',
	FolderDelete	: 'Weet je het zeker dat je de map "%1" wilt verwijderen?',
	FolderRenaming	: ' (Aanpassen...)',
	FolderDeleting	: ' (Verwijderen...)',

	// Files
	FileRename		: 'Vul de nieuwe bestandsnaam in: ',
	FileRenameExt	: 'Weet je zeker dat je de extensie wilt veranderen? Het bestand kan onbruikbaar worden.',
	FileRenaming	: 'Aanpassen...',
	FileDelete		: 'Weet je zeker dat je het bestand "%1" wilt verwijderen?',
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
	Upload		: 'Uploaden',
	UploadTip	: 'Nieuw bestand uploaden',
	Refresh		: 'Vernieuwen',
	Settings	: 'Instellingen',
	Help		: 'Help',
	HelpTip		: 'Help',

	// Context Menus
	Select			: 'Selecteer',
	SelectThumbnail : 'Selecteer miniatuur afbeelding',
	View			: 'Weergave',
	Download		: 'Downloaden',

	NewSubFolder	: 'Nieuwe subfolder',
	Rename			: 'Hernoemen',
	Delete			: 'Verwijderen',

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
	CancelBtn	: 'Annuleren',
	CloseBtn	: 'Sluiten',

	// Upload Panel
	UploadTitle			: 'Nieuw bestand uploaden',
	UploadSelectLbl		: 'Selecteer het bestand om te uploaden',
	UploadProgressLbl	: '(Bezig met uploaden, even geduld...)',
	UploadBtn			: 'Upload geselecteerde bestand',
	UploadBtnCancel		: 'Cancel', // MISSING

	UploadNoFileMsg		: 'Kies een bestand van je computer.',
	UploadNoFolder		: 'Please select folder before uploading.', // MISSING
	UploadNoPerms		: 'File upload not allowed.', // MISSING
	UploadUnknError		: 'Error sending the file.', // MISSING
	UploadExtIncorrect	: 'File extension not allowed in this folder.', // MISSING

	// Settings Panel
	SetTitle		: 'Instellingen',
	SetView			: 'Bekijken:',
	SetViewThumb	: 'Miniatuur afbeelding',
	SetViewList		: 'Lijst',
	SetDisplay		: 'Weergeef:',
	SetDisplayName	: 'Bestandsnaam',
	SetDisplayDate	: 'Datum',
	SetDisplaySize	: 'Bestandsgrootte',
	SetSort			: 'Sorteren op:',
	SetSortName		: 'Op bestandsnaam',
	SetSortDate		: 'Op datum',
	SetSortSize		: 'Op grootte',

	// Status Bar
	FilesCountEmpty : '<Lege map>',
	FilesCountOne	: '1 bestand',
	FilesCountMany	: '%1 bestanden',

	// Size and Speed
	Kb				: '%1 kB',
	KbPerSecond		: '%1 kB/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Het was niet mogelijk om deze actie uit te voeren. (Fout %1)',
	Errors :
	{
	 10 : 'Ongeldige commando.',
	 11 : 'De bestandstype komt niet voor in de aanvraag.',
	 12 : 'De gevraagde brontype is niet geldig.',
	102 : 'Ongeldig bestands- of mapnaam.',
	103 : 'Het verzoek kon niet worden voltooid vanwege autorisatie beperkingen.',
	104 : 'Het verzoek kon niet worden voltooid door beperkingen in de permissies van het bestandssysteem.',
	105 : 'Ongeldige bestandsextensie.',
	109 : 'Ongeldige aanvraag.',
	110 : 'Onbekende fout.',
	115 : 'Er bestaat al een bestand of map met deze naam.',
	116 : 'Map niet gevonden, vernieuw de mappenlijst of kies een andere map.',
	117 : 'Bestand niet gevonden, vernieuw de mappenlijst of kies een andere folder.',
	118 : 'Source and target paths are equal.', // MISSING
	201 : 'Er bestaat al een bestand met dezelfde naam. Het geüploade bestand is hernoemd naar: "%1"',
	202 : 'Ongeldige bestand',
	203 : 'Ongeldige bestand. Het bestand is te groot.',
	204 : 'De geüploade file is kapot.',
	205 : 'Er is geen hoofdmap gevonden.',
	206 : 'Het uploaden van het bestand is om veiligheidsredenen afgebroken. Er is HTML in het bestand aangetroffen.',
	207 : 'Het geuploade bestand is hernoemd naar: "%1"',
	300 : 'Moving file(s) failed.', // MISSING
	301 : 'Copying file(s) failed.', // MISSING
	500 : 'Het uploaden van een bestand is momenteel niet mogelijk. Contacteer de beheerder en controleer het CKFinder configuratiebestand..',
	501 : 'De ondersteuning voor miniatuur afbeeldingen is uitgeschakeld.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'De bestandsnaam mag niet leeg zijn.',
		FileExists		: 'File %s already exists', // MISSING
		FolderEmpty		: 'De mapnaam mag niet leeg zijn.',

		FileInvChar		: 'De bestandsnaam mag niet de volgende tekens bevatten: \n\\ / : * ? " < > |',
		FolderInvChar	: 'De folder mag niet de volgende tekens bevatten: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Het was niet mogelijk om dit bestand in een nieuw venster te openen. Configureer de browser zo dat het de popups van deze website niet blokkeert.'
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
