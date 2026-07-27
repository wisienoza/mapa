// CONTINENT_LINKS - linki zewnetrzne per KONTYNENT (app.js: updateContinentIntel).
//
// PO CO OSOBNY PLIK, SKORO TO 6 WPISOW.
// Bo naturalnym miejscem bylby CONTINENT_INTEL w intel.js, a ten jest na deny-liscie Reada
// (patrz CLAUDE.md). Dopisanie pola do zablokowanego pliku wymagaloby zdejmowania blokady przy
// kazdej kolejnej zmianie linku. Tutaj slownik jest tani do czytania i do audytu.
//
// KLUCZ = CONTINENT_DATA.id, czyli DOKLADNIE te same 6 kodow co pliki cont/<CID>.svg:
//   EU, ASIA, NA, SA, AF, OC.
// Antarktyda nie ma wpisu, bo nie ma jej w CONTINENT_DATA - to nie jest przeoczenie.
//
// POLA (kazde opcjonalne - brak pola = brak przycisku, app.js sam go chowa):
//   wv - TYTUL artykulu na en.wikivoyage.org (nie URL - prefiks jest staly dla calego kompletu,
//        tak samo jak przy ATLAS_CITY_LINKS). Podkreslniki zamiast spacji, jak w adresie MediaWiki.
//   wm - SLUG kontynentu w rodzinie adresow Worldometera:
//        https://www.worldometers.info/population/countries-in-<wm>-by-population/
//
// WIKIVOYAGE MA WSZYSTKIE SZESC - to komplet, nie probka. Nazwy sa tam angielskie i pokrywaja sie
// z potocznymi, wiec nie ma tu zadnego przypadku brzegowego typu "Ameryki razem".
//
// >>> WORLDOMETER MA PIEC Z SZESCIU - I TO NIE JEST DO NAPRAWIENIA.
// Sprawdzone na zywo 2026-07-27, wszystkie warianty adresu. Worldometer NIE ZNA "North America"
// jako calosci - dzieli Ameryki po UN M49, na "Northern America" (5 panstw: US, CA, GL, BM, PM)
// i "Latin America and the Caribbean" (50 panstw, razem z Meksykiem, Ameryka Srodkowa, Karaibami
// I CALA Ameryka Poludniowa). Nasze NA to 23 panstwa, czyli ani jedno, ani drugie:
//   * "northern-america" pokazalby 5 z 23 - wiekszosc kontynentu by zniknela,
//   * "latin-america-and-the-caribbean" wsadzilby do "Ameryki Polnocnej" cala Ameryke Poludniowa.
// Kazdy z tych linkow klamalby wzgledem liczby COUNTRIES w tym samym panelu, wiec NA nie ma pola
// wm i nie dostaje przycisku. Adresy "north-america" i "central-america" po prostu nie istnieja
// (serwer zrywa polaczenie, nie oddaje nawet 404).
// SA jest OK: worldometerowa "South America" (14 pozycji) to ten sam kontynent co nasze 12 panstw -
// roznica bierze sie z terytoriow zaleznych, nie z innego podzialu swiata.
window.CONTINENT_LINKS = {
    EU:   { wv: "Europe",        wm: "europe" },
    ASIA: { wv: "Asia",          wm: "asia" },
    NA:   { wv: "North_America" },
    SA:   { wv: "South_America", wm: "south-america" },
    AF:   { wv: "Africa",        wm: "africa" },
    OC:   { wv: "Oceania",       wm: "oceania" }
};
