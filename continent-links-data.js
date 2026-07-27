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
//
// WIKIVOYAGE MA WSZYSTKIE SZESC - to komplet, nie probka. Nazwy sa tam angielskie i pokrywaja sie
// z potocznymi, wiec nie ma tu zadnego przypadku brzegowego typu "Ameryki razem".
window.CONTINENT_LINKS = {
    EU:   { wv: "Europe" },
    ASIA: { wv: "Asia" },
    NA:   { wv: "North_America" },
    SA:   { wv: "South_America" },
    AF:   { wv: "Africa" },
    OC:   { wv: "Oceania" }
};
