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
      note: "Licznik państw, pasek XP, ranga i pasek odznak." },
    { id: "mission",  icon: "🛰", label: "Active Mission",         host: "#h1-mission",      els: ["#h1-mission", "#mission-panel"],
      note: "Najbliższa wyprawa z licznikiem T-MINUS i przełącznikiem misji." },
    { id: "region",   icon: "🌍", label: "Continental Control",    host: "#h1-region",       els: ["#h1-region", "#region-stats"],
      note: "Paski postępu dla każdego kontynentu." },
    { id: "wonders",  icon: "🏛", label: "World Wonders",          host: "#h1-wonders",      els: ["#h1-wonders", "#wonders-stats"],
      note: "Lista cudów świata ze statusem zaliczenia." },
    { id: "weather",  icon: "🌡", label: "Live Environ Feed",      host: "#h1-weather",      els: ["#h1-weather", "#weather-panel"],
      note: "Pogoda i dane środowiskowe wybranego celu." },
    { id: "search",   icon: "🔍", label: "Search & Track",         host: "#h1-search",       els: ["#h1-search", "#search-panel"],
      note: "Wyszukiwarka państw i miast." },
    { id: "flights",  icon: "✈",  label: "Flights",                host: "#h1-flights",      els: ["#flights-floater"],
      note: "Linki FR24/LOTER, przełącznik tras na globie, statystyki lotów i MAX RANGE." },
    { id: "factbook", icon: "📖", label: "Regional Intel / Factbook", host: "#h1-factbook",  els: ["#factbook-floater"],
      note: "Prawy panel z profilem państwa, miasta i lotniska. Po ukryciu kliknięcie w kraj nadal go zaznacza, ale nie ma gdzie pokazać danych." },
    { id: "ranks",    icon: "🏅", label: "Progression Tree",       host: "#h1-ranks",        els: ["#h1-ranks", "#rank-list"],
      note: "Drzewko rang w prawej kolumnie." },
    // Dwa przyciski pod drzewkiem rang. Nie maja naglowka h1, wiec krzyzyk siedzi w rogu SAMEGO
    // przycisku (patrz regula .hb-x w index.html - dostaja tam position:relative).
    { id: "wherenow", icon: "🎯", label: "GDZIE TERAZ?",           host: "#wherenow-toggle", els: ["#wherenow-toggle"],
      note: "Przycisk rankingu najlepszych kierunków na wybrany miesiąc." },
    { id: "vaccines", icon: "💉", label: "SZCZEPIENIA",            host: "#vaccinations-link", els: ["#vaccinations-link"],
      note: "Przycisk z tabelą szczepień dla podróżujących (stały PDF)." },
    { id: "syslog",   icon: "🖥", label: "System Log",             host: ".sys-log-header",  els: [".sys-log-container"],
      note: "Zielona konsola z komunikatami w prawym dolnym rogu." },
    { id: "lootbar",  icon: "🚩", label: "Pasek flag",             host: "#loot-wrapper",    els: ["#loot-wrapper"],
      note: "Przewijany pasek flag odwiedzonych państw przy dolnej krawędzi. Po ukryciu HUD rozciąga się na całą wysokość ekranu." }
];

// KOLUMNY HUD-u. Kazda ma STALA szerokosc (320 / 260 px) i zostaje w ukladzie nawet wtedy, gdy
// wszystkie jej boxy sa schowane - czyli zostawia po sobie pusta dziure, a sasiednie kolumny nie
// dojezdzaja do krawedzi ekranu. Ten spis pozwala app.js zwinac (display:none) CALA kolumne, gdy
// nie zostal w niej ani jeden widoczny box.
//   key   - sufiks klasy body.hb-col-off-<key> (dla regul CSS zalezacych od zwinietej kolumny;
//           dzis korzysta z tego #bottom-left-bar, ktory stoi na sztywnym left:340px pod kolumna 2)
//   sel   - selektor kontenera kolumny
//   boxes - id boxow z HUD_BOXES, ktore w niej mieszkaja (komplet - inaczej kolumna zwinie sie
//           z nadal widoczna zawartoscia)
// Kolumn 3 i 4 tu NIE MA celowo: factbook JEST cala swoja kolumna (chowamy #factbook-floater
// bezposrednio), a w kolumnie z drzewkiem rang zostaja przyciski GDZIE TERAZ? / SZCZEPIENIA,
// wiec nigdy nie jest pusta.
window.HUD_COLUMNS = [
    { key: "left",    sel: "#left-hud",        boxes: ["status", "mission", "region", "wonders"] },
    { key: "weather", sel: ".weather-floater", boxes: ["weather", "search", "flights"] }
];
