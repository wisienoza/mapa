// ====================================================================
// NAZWY MIAST DO WYSZUKIWAREK ZEWNĘTRZNYCH - słownik podmian
// Dodane 2026-07-28. Używa go window._searchCityName() w app.js.
// ====================================================================
// PO CO TO ISTNIEJE: import lotniskowy z 2026-07-26 wniósł do CITIES_DB nazwy zapisane
// niemiecką transliteracją umlautów (ä->ae, ö->oe, ü->ue). Wyglądają jak literówki
// ("Jyvaeskylae", "Malmoe", "Muenster") i wyszukiwarki ich NIE ZNAJDUJĄ. Zgłoszone przez
// usera 2026-07-28: klik w Jyväskylä otwierał Kayaka z komunikatem błędu i pustym
// formularzem (adres kończył się na `&location=Jyvaeskylae+Finland&errorOccurred=true`).
// POTWIERDZONE na żywo, że problem jest w nazwie, a nie w Kayaku:
//   "Jyvaeskylae Finland" -> strona błędu     (nasza nazwa)
//   "Jyvaskyla Finland"   -> 200, właściwe miasto  (ASCII bez umlautów)
//   "Jyväskylä Finland"   -> 200, właściwe miasto  (pełne diakrytyki)
//
// >>> DLACZEGO NIE POPRAWILIŚMY PO PROSTU CITIES_DB - TO NIE JEST LENISTWO.
// Nazwa miasta jest KLUCZEM w danych, których nie wolno nam ruszać:
//   VISITED_CITIES  = ["PL|LUBLIN", ...]        - żywy stan gry, właściciel: admin.php
//   ATLAS_CITY_LINKS = {"AD|Andorra la Vella"}  - biała lista przycisku ATLAS OBSCURA
// Zmiana "Jyvaeskylae" na "Jyväskylä" w cities-data.js osierociłaby wpis odwiedzonego
// miasta i zgasiłaby przycisk Atlasu. Dlatego podmiana działa WYŁĄCZNIE w momencie
// budowania adresu wyszukiwarki - baza i klucze zostają nietknięte.
// SKUTEK UBOCZNY, ŚWIADOMY: nagłówek popupu dalej pokazuje "JYVAESKYLAE". Poprawienie tego
// wymaga migracji kluczy razem z admin.php i jest osobnym zadaniem.
//
// >>> WARTOŚCI SĄ W ASCII, BEZ DIAKRYTYKÓW - celowo. Kayak przyjmuje obie formy
// ("Jyvaskyla" i "Jyväskylä"), a ASCII nie wymaga zgadywania, czy dana litera to ä czy å,
// więc nie da się nim wpisać cudzego miasta.
//
// >>> JAK POWSTAŁA LISTA (62 wpisy, dwa źródła o różnej pewności):
// (1) 37 wpisów WYPROWADZONYCH AUTOMATYCZNIE I ZWERYFIKOWANYCH: nazwa zawiera ae/oe/ue,
//     a po zwinięciu tych par do jednej litery zgadza się co do znaku z tytułem artykułu
//     Wikipedii z pola [4] tego samego wiersza (po zdjęciu diakrytyków). Zero zgadywania -
//     jeśli tytuł się nie zgadzał, wpis nie wszedł.
// (2) 25 wpisów RĘCZNYCH dla miast, gdzie polska Wikipedia ma egzonim i automat nie mógł
//     potwierdzić ("Zuerich" -> pl.wiki "Zurych", "Koeln" -> "Kolonia", "Goettingen" ->
//     "Getynga"). Tu decydowała znajomość zapisu, więc każdy wpis został osobno kliknięty
//     w Kayaku - patrz notka o weryfikacji na końcu pliku.
//
// >>> CZEGO TU CELOWO NIE MA - NIE DOPISUJ TEGO ODRUCHOWO:
//   * DANIA, NORWEGIA, ISLANDIA (Naestved, Svolvaer, Vaeroy, Mosjoen, Laeso, Reykjanesbaer).
//     Tam "ae" i "oe" to POPRAWNE rozwinięcie liter æ i ø, a nie zniekształcony umlaut.
//     Zwinięcie ich zepsułoby działające nazwy.
//   * HISZPAŃSKI I PORTUGALSKI (Buenos Aires, Puebla, Cienfuegos, Puerto *, Buenaventura).
//     "ue" jest tam zwykłą zbitką liter - reguła automatyczna robiła z nich "Bunos Aires"
//     i "Publa". To była pierwsza wersja tej listy i została odrzucona w całości.
//   * Rouen, Caen, Phoenix, Quebec, Yueyang, Joensuu, Frauenfeld, Plauen, Zalaegerszeg -
//     wszystkie zawierają ae/oe/ue zgodnie z pisownią i są w wyszukiwarkach poprawne.
window.CITY_SEARCH_NAME = {
    // --- (1) potwierdzone tytułem artykułu Wikipedii z pola [4] ---
    "AX|Braendoe": "Brando",
    "CN|Lueliang": "Luliang",
    "CU|Camagueey": "Camaguey",
    "CU|Gueira de Melena": "Guira de Melena",
    "CU|Gueines": "Guines",
    "CU|Jagueey Grande": "Jaguey Grande",
    "DE|Muenster": "Munster",
    "DE|Goerlitz": "Gorlitz",
    "DO|Salvaleon de Higueey": "Salvaleon de Higuey",
    "EE|Kohtla-Jaerve": "Kohtla-Jarve",
    "FI|Jyvaeskylae": "Jyvaskyla",
    "FI|Haemeenlinna": "Hameenlinna",
    "FI|Seinaejoki": "Seinajoki",
    "FI|Jaervenpaeae": "Jarvenpaa",
    "FI|Nurmijaervi": "Nurmijarvi",
    "MN|Moeroen": "Moron",
    "PR|Mayagueez": "Mayaguez",
    "SE|Malmoe": "Malmo",
    "SE|OErebro": "Orebro",
    "SE|Joenkoeping": "Jonkoping",
    "SE|Norrkoeping": "Norrkoping",
    "SE|Vaexjoe": "Vaxjo",
    "SE|OEstersund": "Ostersund",
    "SE|Trollhaettan": "Trollhattan",
    "SE|Borlaenge": "Borlange",
    "SE|Nykoeping": "Nykoping",
    "SE|Skoevde": "Skovde",
    "TM|Tuerkmenabat": "Turkmenabat",
    "TM|Yoloeten": "Yoloten",
    "TM|Baeherden": "Baherden",
    "TM|Koeneuergenc": "Koneurgenc",
    "TM|Goekdepe": "Gokdepe",
    "TR|Duezce": "Duzce",
    "TR|Kuetahya": "Kutahya",
    "TR|Bueyuekcekmece": "Buyukcekmece",
    "TR|Bingoel": "Bingol",
    "TR|Karabuek": "Karabuk",
    // --- (2) ręczne: polska Wikipedia ma egzonim, więc automat nie mógł potwierdzić ---
    "AT|Klagenfurt am Woerthersee": "Klagenfurt am Worthersee",
    "AT|Sankt Poelten": "Sankt Polten",
    "AT|Woergl": "Worgl",
    "AZ|Goeycay": "Goycay",
    "CH|Zuerich": "Zurich",
    "CN|UEruemqi": "Urumqi",
    "DE|Koeln": "Koln",
    "DE|Duesseldorf": "Dusseldorf",
    "DE|Moenchengladbach": "Monchengladbach",
    "DE|Luebeck": "Lubeck",
    "DE|Saarbruecken": "Saarbrucken",
    "DE|Osnabrueck": "Osnabruck",
    "DE|Wuerzburg": "Wurzburg",
    "DE|Goettingen": "Gottingen",
    "DE|Tuebingen": "Tubingen",
    "DE|Luedenscheid": "Ludenscheid",
    "DE|Lueneburg": "Luneburg",
    "DE|Oesterdeichstrich": "Osterdeichstrich",
    "EE|Paernu": "Parnu",
    "MN|OElgii": "Olgii",
    "MN|Suehbaatar": "Suhbaatar",
    "SE|Linkoeping": "Linkoping",
    "SE|Vaesteras": "Vasteras",
    "SE|Gaevle": "Gavle",
    "TM|Tuerkmenbasy": "Turkmenbasy"
};
