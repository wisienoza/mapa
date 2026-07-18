// ====================================================================
// KATALOG LINKÓW ZEWNĘTRZNYCH DLA POJEDYNCZEGO LOTNISKA
// Używane przez window.showAirportPanel(dc) w app.js (klik w pinezkę lotniska na mapie).
// Placeholdery w polu "url":
//   {iata}       -> kod IATA wielkimi literami (np. WAW)
//   {iata_lower} -> kod IATA małymi literami (np. waw)
// url === null  -> link nie jest generowany z szablonu, tylko brany z bazy airport-db.json
//                  (pole dc.url, czyli gotowy guide Sleeping in Airports).
// ====================================================================
window.AIRPORT_LINKS = [
    {
        key: "sleep",
        label: "🛏️ SLEEPING IN AIRPORTS",
        url: null,
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
