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
 * @fileOverview Defines the {@link CKFinder.lang} object, for the Polish
 *		language. This is the base file for all translations.
*/

/**
 * Constains the dictionary of language entries.
 * @namespace
 */
CKFinder.lang['pl'] =
{
	appTitle : 'CKFinder',

	// Common messages and labels.
	common :
	{
		// Put the voice-only part of the label in the span.
		unavailable		: '%1<span class="cke_accessibility">, wyłączone</span>',
		confirmCancel	: 'Pewne opcje zostały zmienione. Czy na pewno zamknąć okno dialogowe?',
		ok				: 'OK',
		cancel			: 'Anuluj',
		confirmationTitle	: 'Potwierdzenie',
		messageTitle	: 'Informacja',
		inputTitle		: 'Pytanie',
		undo			: 'Cofnij',
		redo			: 'Ponów',
		skip			: 'Pomiń',
		skipAll			: 'Pomiń wszystkie',
		makeDecision	: 'Wybierz jedną z opcji:',
		rememberDecision: 'Zapamiętaj mój wybór'
	},


	dir : 'ltr',
	HelpLang : 'pl',
	LangCode : 'pl',

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
	FoldersTitle	: 'Katalogi',
	FolderLoading	: 'Ładowanie...',
	FolderNew		: 'Podaj nazwę nowego katalogu: ',
	FolderRename	: 'Podaj nową nazwę katalogu: ',
	FolderDelete	: 'Czy na pewno chcesz usunąć katalog "%1"?',
	FolderRenaming	: ' (Zmieniam nazwę...)',
	FolderDeleting	: ' (Kasowanie...)',

	// Files
	FileRename		: 'Podaj nową nazwę pliku: ',
	FileRenameExt	: 'Czy na pewno chcesz zmienić rozszerzenie pliku? Może to spowodować problemy z otwieraniem pliku przez innych użytkowników',
	FileRenaming	: 'Zmieniam nazwę...',
	FileDelete		: 'Czy na pewno chcesz usunąć plik "%1"?',
	FilesLoading	: 'Ładowanie...',
	FilesEmpty		: 'Katalog jest pusty',
	FilesMoved		: 'Plik %1 został przeniesiony do %2:%3',
	FilesCopied		: 'Plik %1 został skopiowany do %2:%3',

	// Basket
	BasketFolder		: 'Koszyk',
	BasketClear			: 'Wyczyść koszyk',
	BasketRemove		: 'Usuń z koszyka',
	BasketOpenFolder	: 'Otwórz katalog z plikiem',
	BasketTruncateConfirm : 'Czy naprawdę chcesz usunąć wszystkie pliki z koszyka?',
	BasketRemoveConfirm	: 'Czy naprawdę chcesz usunąć plik "%1" z koszyka?',
	BasketEmpty			: 'Brak plików w koszyku, aby dodać plik, przeciągnij i upuść (drag\'n\'drop) dowolny plik do koszyka.',
	BasketCopyFilesHere	: 'Skopiuj pliki z koszyka',
	BasketMoveFilesHere	: 'Przenieś pliki z koszyka',

	BasketPasteErrorOther	: 'Plik: %s błąd: %e',
	BasketPasteMoveSuccess	: 'Następujące pliki zostały przeniesione: %s',
	BasketPasteCopySuccess	: 'Następujące pliki zostały skopiowane: %s',

	// Toolbar Buttons (some used elsewhere)
	Upload		: 'Wyślij',
	UploadTip	: 'Wyślij plik',
	Refresh		: 'Odśwież',
	Settings	: 'Ustawienia',
	Help		: 'Pomoc',
	HelpTip		: 'Wskazówka',

	// Context Menus
	Select			: 'Wybierz',
	SelectThumbnail : 'Wybierz miniaturkę',
	View			: 'Zobacz',
	Download		: 'Pobierz',

	NewSubFolder	: 'Nowy podkatalog',
	Rename			: 'Zmień nazwę',
	Delete			: 'Usuń',

	CopyDragDrop	: 'Skopiuj tutaj plik',
	MoveDragDrop	: 'Przenieś tutaj plik',

	// Dialogs
	RenameDlgTitle		: 'Zmiana nazwy',
	NewNameDlgTitle		: 'Nowa nazwa',
	FileExistsDlgTitle	: 'Plik już istnieje',
	SysErrorDlgTitle : 'System error', // MISSING

	FileOverwrite	: 'Nadpisz',
	FileAutorename	: 'Zmień automatycznie nazwę',

	// Generic
	OkBtn		: 'OK',
	CancelBtn	: 'Anuluj',
	CloseBtn	: 'Zamknij',

	// Upload Panel
	UploadTitle			: 'Wyślij plik',
	UploadSelectLbl		: 'Wybierz plik',
	UploadProgressLbl	: '(Trwa wysyłanie pliku, proszę czekać...)',
	UploadBtn			: 'Wyślij wybrany plik',
	UploadBtnCancel		: 'Anuluj',

	UploadNoFileMsg		: 'Wybierz plik ze swojego komputera',
	UploadNoFolder		: 'Wybierz katalog przed wysłaniem pliku.',
	UploadNoPerms		: 'Wysyłanie plików nie jest dozwolone.',
	UploadUnknError		: 'Błąd podczas wysyłania pliku.',
	UploadExtIncorrect	: 'Rozszerzenie pliku nie jest dozwolone w tym katalogu.',

	// Settings Panel
	SetTitle		: 'Ustawienia',
	SetView			: 'Widok:',
	SetViewThumb	: 'Miniaturki',
	SetViewList		: 'Lista',
	SetDisplay		: 'Wyświetlanie:',
	SetDisplayName	: 'Nazwa pliku',
	SetDisplayDate	: 'Data',
	SetDisplaySize	: 'Rozmiar pliku',
	SetSort			: 'Sortowanie:',
	SetSortName		: 'wg nazwy pliku',
	SetSortDate		: 'wg daty',
	SetSortSize		: 'wg rozmiaru',

	// Status Bar
	FilesCountEmpty : '<Pusty katalog>',
	FilesCountOne	: '1 plik',
	FilesCountMany	: 'Ilość plików: %1',

	// Size and Speed
	Kb				: '%1 kB',
	KbPerSecond		: '%1 kB/s',

	// Connector Error Messages.
	ErrorUnknown	: 'Wykonanie operacji zakończyło się niepowodzeniem. (Błąd %1)',
	Errors :
	{
	 10 : 'Nieprawidłowe polecenie (command).',
	 11 : 'Brak wymaganego parametru: źródło danych (type).',
	 12 : 'Nieprawidłowe źródło danych (type).',
	102 : 'Nieprawidłowa nazwa pliku lub katalogu.',
	103 : 'Wykonanie operacji nie jest możliwe: brak autoryzacji.',
	104 : 'Wykonanie operacji nie powiodło się z powodu niewystarczających uprawnień do systemu plików.',
	105 : 'Nieprawidłowe rozszerzenie.',
	109 : 'Nieprawiłowe polecenie.',
	110 : 'Niezidentyfikowany błąd.',
	115 : 'Plik lub katalog o podanej nazwie już istnieje.',
	116 : 'Nie znaleziono katalogu. Odśwież panel i spróbuj ponownie.',
	117 : 'Nie znaleziono pliku. Odśwież listę plików i spróbuj ponownie.',
	118 : 'Ścieżki źródłowa i docelowa są jednakowe.',
	201 : 'Plik o podanej nazwie już istnieje. Nazwa przesłanego pliku została zmieniona na "%1"',
	202 : 'Nieprawidłowy plik.',
	203 : 'Nieprawidłowy plik. Plik przekroczył dozwolony rozmiar.',
	204 : 'Przesłany plik jest uszkodzony.',
	205 : 'Brak folderu tymczasowego na serwerze do przesyłania plików.',
	206 : 'Przesyłanie pliku zakończyło się niepowodzeniem z powodów bezpieczeństwa. Plik zawiera dane przypominające HTML.',
	207 : 'Nazwa przesłanego pliku została zmieniona na "%1"',
	300 : 'Przenoszenie nie powiodło się.',
	301 : 'Kopiowanie nie powiodo się.',
	500 : 'Menedżer plików jest wyłączony z powodów bezpieczeństwa. Skontaktuj się z administratorem oraz sprawdź plik konfiguracyjny CKFindera.',
	501 : 'Tworzenie miniaturek jest wyłączone.'
	},

	// Other Error Messages.
	ErrorMsg :
	{
		FileEmpty		: 'Nazwa pliku nie może być pusta',
		FileExists		: 'Plik %s już istnieje',
		FolderEmpty		: 'Nazwa katalogu nie może być pusta',

		FileInvChar		: 'Nazwa pliku nie może zawierać żadnego z podanych znaków: \n\\ / : * ? " < > |',
		FolderInvChar	: 'Nazwa katalogu nie może zawierać żadnego z podanych znaków: \n\\ / : * ? " < > |',

		PopupBlockView	: 'Otwarcie pliku w nowym oknie nie powiodło się. Proszę zmienić konfigurację przeglądarki i wyłączyć wszelkie blokady okienek popup dla tej strony.'
	},

	// Imageresize plugin
	Imageresize :
	{
		dialogTitle		: 'Zmiana rozmiaru %s',
		sizeTooBig		: 'Nie możesz zmienić wysokości lub szerokości na wartośc wyższą niż oryginalny rozmiar (%size).',
		resizeSuccess	: 'Obrazek został pomyślnie przeskalowany.',
		thumbnailNew	: 'Utwórz nową miniaturkę',
		thumbnailSmall	: 'Mały (%s)',
		thumbnailMedium	: 'Średni (%s)',
		thumbnailLarge	: 'Duży (%s)',
		newSize			: 'Podaj nowe wymiary',
		width			: 'Szerokość',
		height			: 'Wysokość',
		invalidHeight	: 'Nieprawidłowa wysokość.',
		invalidWidth	: 'Nieprawidłowa szerokość.',
		invalidName		: 'Nieprawidłowa nazwa pliku.',
		newImage		: 'Utwórz nowy obrazek',
		noExtensionChange : 'Rozszerzenie pliku nie może zostac zmienione.',
		imageSmall		: 'Plik źródłowy jest zbyt mały',
		contextMenuName	: 'Zmień rozmiar'
	},

	// Fileeditor plugin
	Fileeditor :
	{
		save			: 'Zapisz',
		fileOpenError	: 'Nie udało się otworzyć pliku.',
		fileSaveSuccess	: 'Plik został zapisany pomyślnie.',
		contextMenuName	: 'Edytuj',
		loadingFile		: 'Trwa ładowanie pliku, proszę czekać...'
	}
};
