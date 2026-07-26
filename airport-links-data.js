// ====================================================================
// KATALOG LINKÓW ZEWNĘTRZNYCH DLA POJEDYNCZEGO LOTNISKA
// Używane przez window.showAirportPanel(dc) w app.js (klik w pinezkę lotniska na mapie).
// ETYKIETY TRZYMAJ KRÓTKIE (do ~12 znaków z emoji). Przyciski siedzą w .links-grid, czyli
// w dwóch kolumnach po ~159 px - tak samo jak w panelu kraju i miasta. Dłuższa nazwa zawija
// się do drugiej linii i ten JEDEN przycisk rozpycha cały wiersz siatki (51 px zamiast 34),
// przez co panel wygląda inaczej niż pozostałe. Dlatego 2026-07-26 skrócone:
// "SLEEPING IN AIRPORTS" -> "SLEEPING", "AIRPORT SMOKERS" -> "SMOKERS", "WATER AT AIRPORTS" -> "WATER".
// Placeholdery w polu "url":
//   {iata}       -> kod IATA wielkimi literami (np. WAW)
//   {iata_lower} -> kod IATA małymi literami (np. waw)
// url === null  -> link nie jest generowany z szablonu, tylko brany z bazy airport-db.json.
//                  Z KTOREGO pola - mowi "src":
//                    src: "sia"  -> dc.url  = pole [5] (guide Sleeping in Airports)
//                    src: "wiki" -> dc.wiki = pole [7] (artykul Wikipedii, pl z fallbackiem en)
//                  Puste pole w bazie = przycisk sie NIE renderuje.
// ====================================================================
window.AIRPORT_LINKS = [
    {
        key: "wiki",
        label: "📖 WIKIPEDIA",
        url: null,
        src: "wiki",
        bg: "rgba(255, 255, 255, 0.10)",
        border: "#9e9e9e",
        color: "#e0e0e0"
    },
    {
        key: "sleep",
        label: "🛏️ SLEEPING",
        url: null,
        src: "sia",
        bg: "rgba(106, 27, 154, 0.15)",
        border: "#8E24AA",
        color: "#BA68C8"
    },
    {
        key: "smokers",
        label: "🚬 SMOKERS",
        url: "https://airportsmokers.com/{path}",
        dict: "AIRPORT_SMOKERS",
        bg: "rgba(230, 74, 25, 0.15)",
        border: "#e64a19",
        color: "#ff8a65"
    },
    {
        key: "water",
        label: "🚰 WATER",
        url: "https://www.wateratairports.com/topic/{path}/",
        dict: "AIRPORT_WATER",
        bg: "rgba(0, 204, 255, 0.15)",
        border: "#00ccff",
        color: "#00ccff"
    }
];

// ====================================================================
// KLASA LOTNISKA - opis pola [6] z airport-db.json (wiersz "RUCH" w panelu).
// Zrodlo: OurAirports (kolumna "type" dla wpisow ze scheduled_service = yes).
// Puste pole [6] = lotnisko bez regularnego ruchu rozkladowego -> wiersz sie nie pokazuje.
// ====================================================================
// Opisy KROTKIE - wiersz .fact-row ma waska kolumne wartosci i dluzszy tekst byl ucinany
// wielokropkiem ("duzy port (ruch miedzynarodow...").
window.AIRPORT_TYPES = {
    L: "🌍 duży port",
    M: "✈️ port regionalny",
    S: "🛩️ małe lotnisko",
    H: "🚁 heliport",
    W: "🛥️ baza wodnosamolotów"
};
