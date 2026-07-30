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
    // Para przycisków - JEDNA pozycja, nie dwie (feedback 2026-07-29: "mają się całe grupy ubijać").
    // host:null, bo krzyżyk musialby siedziec w jednym z przyciskow, a chowalby oba - mylace.
    // Chowane z panelu 👁.
    // OD 2026-07-30 stoja w prawym DOLNYM rogu (#rank-tools, rzad nad stosem przelacznikow), a nie
    // pod drzewkiem rang. Powod: w kolumnie rang trzymaly ja przy zyciu nawet po ukryciu drzewka,
    // wiec Regional Intel nie dojezdzal do prawej krawedzi. Dlatego `els` wskazuje teraz KONTENER
    // rzedu, nie oba przyciski z osobna - inaczej po ukryciu zostawalby pusty rzad z gapem.
    { id: "rankbtns", icon: "🎯", label: "Przyciski: GDZIE TERAZ? / SZCZEPIENIA", host: null,
      els: ["#rank-tools"],
      note: "Ranking kierunków na wybrany miesiąc i tabela szczepień (PDF) - oba w prawym dolnym rogu, nad przełącznikami mapy." },
    // CALY STOS PRZELACZNIKOW (#toggle-stack, prawy dolny rog) - JEDNA pozycja (feedback 2026-07-29:
    // "mają się całe grupy ubijać"; wczesniej bylo szesc osobnych, potem dwie podgrupy - obie wersje
    // za drobne). Chowamy sam KONTENER, wiec nie trzeba wymieniac przyciskow po kolei.
    // host:null - stos nie ma naglowka, a krzyzyk w rogu ktoregokolwiek przycisku nakladalby sie na
    // segmenty LAYER/DETAIL dociagniete do prawej krawedzi. Chowany z panelu 👁.
    // Ukrycie NIE gasi trybow - to tylko schowane przyciski; jesli VISA byla wlaczona, zostaje wlaczona
    // (do zgaszenia RESET-em albo po ponownym pokazaniu stosu).
    // UWAGA: #toggle-stack jest przez to JEDNOCZESNIE boxem i kontenerem-kolumna, dlatego CELOWO
    // wypadl z HUD_COLUMNS - inaczej zwijanie pustych kolumn odkrywalo by go z powrotem.
    { id: "toggles",  icon: "🎛", label: "Przełączniki mapy",      host: null,               els: ["#toggle-stack"],
      note: "Cały stos w prawym dolnym rogu: VISA, ZONES, NIGHT, CLIMATE, LAYER i DETAIL." },
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
// #toggle-stack tu NIE MA z tego samego powodu, co factbooka: caly stos jest JEDNYM boxem
// (id "toggles"), wiec chowa sie sam z siebie. Wpisanie go tutaj cofaloby to ukrycie - krok 1
// _packHudBoxes odkrywa wszystkie kolumny, zeby zmierzyc ich zawartosc.
window.HUD_COLUMNS = [
    { key: "left",    sel: "#left-hud" },
    { key: "weather", sel: ".weather-floater" },
    { key: "ranks",   sel: ".right-hud" }
];

// PRZENOSZENIE BOXOW MIEDZY KOLUMNAMI. Gdy w kolumnie 1 zwolni sie miejsce (np. po ukryciu World
// Wonders, ktore normalnie rozciaga sie do dolu ekranu), boxy z kolumny 2 przeprowadzaja sie tam
// po kolei - zamiast zostawiac pionowa dziure obok. Silnik: window._packHudBoxes w app.js.
//   from  - kolumna-zrodlo (dom kanoniczny tych boxow)
//   into  - kolumna-cel (wedruja na jej KONIEC, w kolejnosci z `boxes`)
//   boxes - w kolejnosci przeprowadzki:
//             id   - id z HUD_BOXES; MUSI miec w `els` DOKLADNIE JEDEN selektor obejmujacy caly box
//                    (kontener .hud-box), bo przenosimy jeden wezel DOM
//             grow - luz w px, jaki musi byc przy tym boxie, zeby go przeniesc. Test "czy sie miesci"
//                    robimy RAZ, przy przeliczaniu ukladu - a niektore panele puchna dopiero od akcji
//                    usera (tresc pogody po kliknieciu w kraj to ~110 px). To WARUNEK WEJSCIA, NIE
//                    rezerwa: od wolnego miejsca odejmujemy potem tylko REALNA wysokosc boxu. Inaczej
//                    zapas pierwszego zabieral miejsce nastepnym w kolejce i FLIGHTS nie przenosil sie
//                    mimo 400 px wolnego pod pogoda (zgloszone 2026-07-29).
//                    Przepakowania NIE robimy na kazda zmiane tresci celowo - box skakalby miedzy
//                    kolumnami przy pisaniu w wyszukiwarce.
// Dopoki nic nie jest ukryte, kolumna 1 jest pelna (World Wonders ma flex:1 i zjada reszte miejsca),
// wiec wolnego wychodzi ~0 i NIC sie nie rusza - uklad domyslny zostaje bajt w bajt taki jak byl.
window.HUD_PACK = {
    from: ".weather-floater",
    into: "#left-hud",
    boxes: [
        // Zapasy liczone z REALNYCH ograniczen, nie "na oko" - kazdy zbedny piksel zabiera miejsce
        // boxowi na koncu kolejki (przy 160/210 FLIGHTS przestawal sie miescic o 10 px, a SEARCH
        // zostawal w kolumnie 2 mimo widocznej dziury obok).
        { id: "weather", grow: 130 },   // siatka pogody po wybraniu celu (teraz: SYSTEM OFFLINE / STANDBY)
        // SEARCH nie rezerwuje miejsca "w ciemno": jego jedyna puchnaca czesc (lista wynikow) ma
        // max-height, wiec zamiast trzymac 205 px na zapas PRZYCINAMY ja do tego, co realnie zostalo
        // w kolumnie. Efekt: box wchodzi tam, gdzie by sie nie zmiescil z rezerwa, a lista po prostu
        // zaczyna scrollowac troche wczesniej (ma juz overflow-y:auto).
        //   cap.sel - element z limitem wysokosci; cap.min - ponizej tylu px wolnego NIE przenosimy
        //   boxu wcale (lista bylaby bezuzyteczna); cap.max - wartosc bazowa z index.html
        { id: "search",  grow: 0, cap: { sel: "#search-results", min: 90, max: 200 } },
        { id: "flights", grow: 0 }      // staly rozmiar, nic w nim nie puchnie
    ]
};
