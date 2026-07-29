// === KATALOG UKRYWALNYCH BOXOW HUD ===
// Spis wszystkich elementow interfejsu, ktore uzytkownik moze schowac (przycisk 👁 HUD w lewym
// dolnym rogu albo krzyzyk ✕ w naglowku samego boxu). Logika siedzi w app.js (window.applyHudBoxes,
// window.showHudBoxesPanel) - tutaj sa TYLKO dane.
//
// Pola wpisu:
//   id    - klucz zapisu w localStorage['hudHidden'] (tablica ukrytych id). NIE zmieniaj po wdrozeniu:
//           zmiana = uzytkownik traci swoje ustawienie dla tego boxu (wpis staje sie sierota i jest
//           ignorowany przy wczytaniu).
//   label - nazwa w panelu 👁 HUD (widzi ja uzytkownik; PL/EN jak w naglowku boxu na stronie).
//   icon  - emoji w wierszu panelu, czysta ozdoba.
//   host  - selektor elementu, W KTORYM ma wyladowac krzyzyk ✕ (naglowek boxu). MUSI byc objety
//           przez `els` - inaczej po ukryciu boxu krzyzyk zostalby wiszacy na ekranie. null = box
//           bez krzyzyka, chowany wylacznie z panelu.
//   els   - selektory elementow do ukrycia (display:none). Wszystkie trafienia querySelectorAll.
//   note  - opis w panelu, jedno zdanie: co dokladnie znika.
//
// UWAGA przy dopisywaniu nowego boxu: jesli jego ukrycie wymaga korekty ukladu (jak pasek flag,
// ktory kotwiczy dolny-prawy HUD), dopisz regule CSS `body.hb-off-<id> ...` w index.html - app.js
// wiesza taka klase na <body> dla KAZDEGO ukrytego boxu automatycznie.
window.HUD_BOXES = [
    { id: "status",   icon: "🎖", label: "Operative Status",       host: "#h1-status",       els: ["#h1-status", "#status-panel"],
      note: "Licznik panstw, pasek XP, ranga i pasek odznak." },
    { id: "mission",  icon: "🛰", label: "Active Mission",         host: "#h1-mission",      els: ["#h1-mission", "#mission-panel"],
      note: "Najblizsza wyprawa z licznikiem T-MINUS i przelacznikiem misji." },
    { id: "region",   icon: "🌍", label: "Continental Control",    host: "#h1-region",       els: ["#h1-region", "#region-stats"],
      note: "Paski postepu dla kazdego kontynentu." },
    { id: "wonders",  icon: "🏛", label: "World Wonders",          host: "#h1-wonders",      els: ["#h1-wonders", "#wonders-stats"],
      note: "Lista cudow swiata ze statusem zaliczenia." },
    { id: "weather",  icon: "🌡", label: "Live Environ Feed",      host: "#h1-weather",      els: ["#h1-weather", "#weather-panel"],
      note: "Pogoda i dane srodowiskowe wybranego celu." },
    { id: "search",   icon: "🔍", label: "Search & Track",         host: "#h1-search",       els: ["#h1-search", "#search-panel"],
      note: "Wyszukiwarka panstw i miast." },
    { id: "flights",  icon: "✈",  label: "Flights",                host: "#h1-flights",      els: ["#flights-floater"],
      note: "Linki FR24/LOTER, przelacznik tras na globie, statystyki lotow i MAX RANGE." },
    { id: "factbook", icon: "📖", label: "Regional Intel / Factbook", host: "#h1-factbook",  els: ["#factbook-floater"],
      note: "Prawy panel z profilem panstwa, miasta i lotniska. Po ukryciu klikniecie w kraj nadal go zaznacza, ale nie masz gdzie zobaczyc danych." },
    { id: "ranks",    icon: "🏅", label: "Progression Tree",       host: "#h1-ranks",        els: ["#h1-ranks", "#rank-list"],
      note: "Drzewko rang. Przyciski GDZIE TERAZ? i SZCZEPIENIA zostaja." },
    { id: "syslog",   icon: "🖥", label: "System Log",             host: ".sys-log-header",  els: [".sys-log-container"],
      note: "Zielona konsola z komunikatami w prawym dolnym rogu." },
    { id: "lootbar",  icon: "🚩", label: "Pasek flag",             host: "#loot-wrapper",    els: ["#loot-wrapper"],
      note: "Przewijany pasek flag odwiedzonych panstw przy dolnej krawedzi. Po ukryciu HUD rozciaga sie na cala wysokosc ekranu." }
];
