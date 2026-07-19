// === LINIE LOTNICZE: RECZNE UZUPELNIENIA KODOW ICAO ===
// Panel "LINIE LOTNICZE" (paszport + box FLIGHTS) adresuje banery przez kod ICAO: fr24_banners/XXX.png.
// Kod bierze sie AUTOMATYCZNIE z importu CSV - admin.php wyciaga go z kolumny Airline, gdzie FR24
// podaje oba kody naraz: "Etihad Airways (EY/ETD)" -> pole 6 w FLIGHTS_LOG = "ETD".
//
// Ta tablica jest lekarstwem na JEDEN przypadek: gdy FR24 kodow NIE podaje i w CSV zostaje sama nazwa
// (albo puste " ()"). Wtedy pole 6 jest "" i panel nie ma czego wskazac - rysuje plakietke "-" zamiast
// banera, a dolozenie pliku do fr24_banners/ NIC nie daje, bo nikt sie do niego nie odwoluje.
// Dotyczy to glownie przewoznikow nieistniejacych, ktorych FR24 przestal utrzymywac w bazie.
//
// KLUCZ: nazwa linii z pola 4 FLIGHTS_LOG, ZAPISANA MALYMI LITERAMI (porownanie jest case-insensitive,
//        dokladnie tak samo jak klucz agregacji w _airlineStats).
// WARTOSC: kod ICAO = nazwa pliku w fr24_banners/ BEZ rozszerzenia.
//
// Wpis dziala TYLKO wtedy, gdy log nie ma wlasnego kodu - nigdy nie nadpisuje tego, co przyszlo
// z importu. Dzieki temu ponowny import CSV (ktory moze juz zawierac kody) zawsze wygrywa,
// a ta tablica cicho przestaje byc potrzebna.
const AIRLINE_ICAO_FIX = {
    // OLT Express Poland - padla w 2012, FR24 nie podaje jej kodow w eksporcie. Baner dorzucony recznie.
    "olt express poland": "YAP"
};
