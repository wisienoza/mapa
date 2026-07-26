// ====================================================================
// KATALOG LINKÓW ZEWNĘTRZNYCH DLA POJEDYNCZEGO LOTNISKA
// Używane przez window.showAirportPanel(dc) w app.js (klik w pinezkę lotniska na mapie).
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
        label: "🛏️ SLEEPING IN AIRPORTS",
        url: null,
        src: "sia",
        bg: "rgba(106, 27, 154, 0.15)",
        border: "#8E24AA",
        color: "#BA68C8"
    },
    {
        key: "smokers",
        label: "🚬 AIRPORT SMOKERS",
        url: "https://airportsmokers.com/#gsc.tab=0&gsc.q={iata_lower}&gsc.sort=",
        bg: "rgba(230, 74, 25, 0.15)",
        border: "#e64a19",
        color: "#ff8a65"
    },
    {
        key: "water",
        label: "🚰 WATER AT AIRPORTS",
        url: "https://www.wateratairports.com/topic-tag/{iata_lower}/",
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
window.AIRPORT_TYPES = {
    L: "🌍 duży port (ruch międzynarodowy)",
    M: "✈️ port regionalny (ruch rozkładowy)",
    S: "🛩️ małe lotnisko (ruch rozkładowy)",
    H: "🚁 heliport (ruch rozkładowy)",
    W: "🛥️ baza wodnosamolotów (ruch rozkładowy)"
};
