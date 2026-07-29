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
    // Trzy boxy kolumny 2 maja WLASNE kontenery (.hud-box), bo tylko one wedruja miedzy kolumnami
    // (patrz HUD_PACK nizej) - stad w `els` jeden selektor kontenera zamiast pary naglowek+panel.
    { id: "weather",  icon: "🌡", label: "Live Environ Feed",      host: "#h1-weather",      els: ["#box-weather"],
      note: "Pogoda i dane środowiskowe wybranego celu." },
    { id: "search",   icon: "🔍", label: "Search & Track",         host: "#h1-search",       els: ["#box-search"],
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
    // PRZELACZNIKI TRYBOW MAPY (#toggle-stack, prawy dolny rog). host:null - te przyciski sa za male
    // na krzyzyk (LAYER i DETAIL maja segmenty dociagnięte do prawej krawedzi, ✕ lezalby na TOPO/ULTRA),
    // a przy 148px szerokosci ✕ prosilby sie o klikniecie zamiast przelacznika. Chowane WYLACZNIE
    // z panelu 👁. Ukrycie NIE gasi trybu - to tylko schowany przycisk; jesli VISA byla wlaczona,
    // zostaje wlaczona (do zgaszenia RESET-em albo po ponownym pokazaniu przycisku).
    { id: "visa",     icon: "🛂", label: "VISA (przełącznik)",     host: null,               els: ["#visa-toggle"],
      note: "Kolorowanie mapy wg wymogów wizowych dla paszportu PL." },
    { id: "zones",    icon: "🕐", label: "ZONES (przełącznik)",    host: null,               els: ["#tz-toggle"],
      note: "Siatka stref czasowych na globie." },
    { id: "night",    icon: "☾",  label: "NIGHT (przełącznik)",    host: null,               els: ["#night-toggle"],
      note: "Terminator dzień/noc." },
    { id: "climate",  icon: "🌡", label: "CLIMATE (przełącznik)",  host: null,               els: ["#climate-toggle"],
      note: "Komfort klimatyczny wg wybranego miesiąca." },
    { id: "layer",    icon: "🛰", label: "LAYER (podkład globu)",  host: null,               els: ["#sat-toggle"],
      note: "OFF / SAT / STREET / TOPO - podkład rastrowy nałożony na kulę." },
    { id: "detail",   icon: "🌐", label: "DETAIL (szczegółowość)", host: null,               els: ["#detail-switch"],
      note: "LOW / HIGH / ULTRA - dokładność granic. Ukrycie nie zmienia wybranego poziomu." },
    { id: "syslog",   icon: "🖥", label: "System Log",             host: ".sys-log-header",  els: [".sys-log-container"],
      note: "Zielona konsola z komunikatami w prawym dolnym rogu." },
    { id: "lootbar",  icon: "🚩", label: "Pasek flag",             host: "#loot-wrapper",    els: ["#loot-wrapper"],
      note: "Przewijany pasek flag odwiedzonych państw przy dolnej krawędzi. Po ukryciu HUD rozciąga się na całą wysokość ekranu." }
];

// KOLUMNY HUD-u. Kazda ma STALA szerokosc (320 / 260 / 240 px) i zostawalaby w ukladzie nawet wtedy,
// gdy wszystkie jej boxy sa schowane - czyli po pustej kolumnie zostawalaby dziura, a sasiedzi nie
// dojezdzaliby do krawedzi ekranu. Ten spis pozwala app.js zwinac (display:none) CALA kolumne.
//   key - sufiks klasy body.hb-col-off-<key> (dla ewentualnych regul CSS zaleznych od zwinietej kolumny)
//   sel - selektor kontenera kolumny
// PUSTOSC czytamy Z DOM (czy zostalo dziecko bez display:none), a nie z listy id - kolumna 2 potrafi
// opustoszec takze wtedy, gdy jej boxy nie sa ukryte, tylko PRZEWEDROWALY do kolumny 1 (patrz HUD_PACK).
// Kolumny factbooka tu NIE MA celowo: ten box JEST cala swoja kolumna (#factbook-floater), wiec znika
// razem z nia.
window.HUD_COLUMNS = [
    { key: "left",    sel: "#left-hud" },
    { key: "weather", sel: ".weather-floater" },
    { key: "ranks",   sel: ".right-hud" },
    { key: "toggles", sel: "#toggle-stack" }
];

// PRZENOSZENIE BOXOW MIEDZY KOLUMNAMI. Gdy w kolumnie 1 zwolni sie miejsce (np. po ukryciu World
// Wonders, ktore normalnie rozciaga sie do dolu ekranu), boxy z kolumny 2 przeprowadzaja sie tam
// po kolei - zamiast zostawiac pionowa dziure obok. Silnik: window._packHudBoxes w app.js.
//   from  - kolumna-zrodlo (dom kanoniczny tych boxow)
//   into  - kolumna-cel (wedruja na jej KONIEC, w kolejnosci z `boxes`)
//   boxes - w kolejnosci przeprowadzki:
//             id   - id z HUD_BOXES; MUSI miec w `els` DOKLADNIE JEDEN selektor obejmujacy caly box
//                    (kontener .hud-box), bo przenosimy jeden wezel DOM
//             grow - ZAPAS w px na pozniejszy rozrost tresci. Test "czy sie miesci" robimy RAZ, przy
//                    przeliczaniu ukladu - a niektore panele puchna dopiero od akcji usera: lista
//                    wynikow wyszukiwarki (max-height 200) i tresc pogody po kliknieciu w kraj.
//                    Bez zapasu box wchodzilby do kolumny 1 "na styk" i wylewal sie potem pod pasek
//                    flag. Przepakowania NIE robimy na kazda zmiane tresci celowo - box skakalby
//                    miedzy kolumnami przy pisaniu w wyszukiwarce.
// Dopoki nic nie jest ukryte, kolumna 1 jest pelna (World Wonders ma flex:1 i zjada reszte miejsca),
// wiec wolnego wychodzi ~0 i NIC sie nie rusza - uklad domyslny zostaje bajt w bajt taki jak byl.
window.HUD_PACK = {
    from: ".weather-floater",
    into: "#left-hud",
    boxes: [
        { id: "weather", grow: 160 },   // siatka pogody po wybraniu celu (teraz: SYSTEM OFFLINE)
        { id: "search",  grow: 210 },   // #search-results ma max-height 200 + margines
        { id: "flights", grow: 0 }      // staly rozmiar
    ]
};
