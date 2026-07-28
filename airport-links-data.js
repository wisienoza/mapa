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
        // Slownik AIRPORT_WV (airport-wikivoyage-data.js): lotniska majace WLASNY artykul
        // na Wikivoyage, nie przekierowanie do artykulu miasta. Brak kodu = brak przycisku.
        // Wartosc w slowniku to TYTUL z podkreslnikami, wiec wchodzi wprost w {path}.
        // Kolor jak WIKIVOYAGE w panelu kraju, miasta, cudu i kontynentu - jeden serwis,
        // jeden wyglad w calej aplikacji.
        key: "wikivoyage",
        label: "🧭 WIKIVOYAGE",
        url: "https://en.wikivoyage.org/wiki/{path}",
        dict: "AIRPORT_WV",
        bg: "rgba(52, 211, 153, 0.15)",
        border: "#34d399",
        color: "#34d399"
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

// ====================================================================
// WYJĄTKI OD FILTRA "MA ROZKŁADOWY RUCH" (nadpisanie pola [6] z airport-db.json)
// Lotnisko z wpisem tutaj pojawia się na mapie, nawet gdy OurAirports ma dla niego
// scheduled_service = no. Wartość = klasa z AIRPORT_TYPES, wyświetlana w wierszu "RUCH".
//
// Reguła bazowa brzmi "nie ma rozkładu, nie ma pinezki" i 2026-07-26 wycięła 12 lotnisk.
// Dziewięć z nich wyleciało słusznie (porty zastąpione nowszymi, małe lotniska GA).
// Trzy poniżej to co innego: istniejące, nieuszkodzone porty, którym ruch cywilny
// wstrzymała WOJNA, a nie zamknięcie. Traktujemy je jak normalne lotniska i opisujemy
// klasą, jaką mają w rzeczywistości - bez adnotacji o zawieszeniu.
//
// SKĄD TE KLASY: NIE ze źródła. OurAirports ma dla KBP "medium_airport" (zaniżone - to
// główny port Ukrainy, przed 2022 ok. 15 mln pasażerów rocznie), a IEV nie ma tam wpisu
// pod tym kodem w ogóle. Dlatego klasy są przypisane po faktycznej roli lotniska.
//
// GDY RUCH WRÓCI: skasuj wpis. OurAirports przestawi wtedy scheduled_service na yes
// i lotnisko wejdzie na mapę normalną drogą, klasą wprost z danych.
// Ten słownik ma zostać MAŁY - to lista wyjątków, nie druga baza lotnisk.
// ====================================================================
window.AIRPORT_TYPE_OVERRIDE = {
    KBP: "L",   // Kijów-Boryspol - główny port kraju; OurAirports zaniża do medium_airport
    IEV: "M",   // Kijów-Żulany   - brak wpisu pod tym kodem w OurAirports
    HRK: "M"    // Charków        - medium_airport w OurAirports
};

// ====================================================================
// SZUKANIE LOTÓW Z DOMU - konfiguracja przycisku "✈️ LOTY Z WAW → XXX" w panelu MIASTA
// (window.showCityIntel -> window.showFlightSearchModal w app.js).
// Jeden popup, TRZY wyszukiwarki otwierane naraz: Skyscanner, Kayak, Google Flights.
// ====================================================================
// DLACZEGO CZTERY, A NIE JEDNA: każda widzi inny wycinek rynku (Skyscanner ma OTA, których nie ma
// Google; Google ma taryfy wprost od przewoźników; Kayak agreguje jeszcze inaczej), a porównanie
// tej samej trasy w czterech miejscach zajmuje tyle samo kliknięć co w jednym.
// KIWI.COM jest tu z INNEGO POWODU niż pozostała trójka: jako jedyny skleja trasy z przewoźników,
// którzy nie mają ze sobą żadnej umowy (Ryanair + Wizz + linia lokalna w jednym wyniku), więc
// pokazuje połączenia, których reszta nie widzi W OGÓLE - nie jest czwartym zdaniem o tym samym.
// Cena za to jest realna i warto ją znać: przy takiej trasie za przesiadkę odpowiada gwarancja
// Kiwi, a nie przewoźnik, więc przy opóźnieniu reklamacja idzie do Kiwi, nie do linii lotniczej.
// ODRZUCONE ŚWIADOMIE: Momondo - należy do tego samego właściciela co Kayak i w praktyce pokazuje
// te same wyniki, czyli piąte okno bez nowej informacji.
//
// >>> BAGAŻ: ŻADEN Z TRZECH SERWISÓW NIE PRZYJMUJE GO W ADRESIE. Sprawdzone 2026-07-28 w
// oficjalnej dokumentacji parametrów Skyscannera (developers.skyscanner.net/docs/referrals/
// flights-parameters - pełna lista parametrów, bagażu tam NIE MA) oraz w opisach adresów Kayaka
// i Google Flights. Wszystkie trzy mają filtr bagażu, ale WYŁĄCZNIE jako klikany filtr w wynikach.
// Pole BAGAŻ w popupie idzie więc TYLKO do Google Flights, i to jako słowa w zapytaniu tekstowym
// (jedyny z trzech, który cokolwiek takiego parsuje) - popup mówi to użytkownikowi wprost.
// NIE DOPISUJ tu wymyślonych parametrów typu "&checkedbags=1": zostaną cicho zignorowane,
// a użytkownik będzie przekonany, że filtruje.
//
// DOKĄD, czyli "najbliższy port": liczy window._nearestFlightAirport(lat, lon) w app.js,
// skanując AIRPORT_DB po współrzędnych miasta. Dwa parametry rządzą tym, co wyjdzie:
//   destClasses - klasy lotnisk brane pod uwagę (pole [6] z airport-db.json). Heliporty "H"
//                 i bazy wodnosamolotów "W" są POMINIĘTE ŚWIADOMIE: nikt nie sprzeda rejsu
//                 do żadnej z tych 125 pozycji, więc przycisk prowadziłby w pustkę.
//   maxKm       - powyżej tego dystansu przycisk się NIE POKAZUJE. "Najbliższe lotnisko"
//                 800 km od miasta nie jest podpowiedzią dojazdu, tylko szumem.
window.FLIGHT_SEARCH = {
    origin: "WAW",
    originName: "Warszawa",
    originCity: "Warsaw",       // do zapytania tekstowego Google Flights (angielskie, bez odmiany)
    destClasses: ["L", "M", "S"],
    maxKm: 500,
    // ADRESY. Skyscanner: kody IATA MAŁYMI literami, daty YYMMDD, oba segmenty dat OPCJONALNE
    // (adres bez nich otwiera pusty kalendarz, nie błąd - na tym stoi opcja "dowolny termin").
    // Segmentu powrotu nie da się podać bez segmentu wylotu.
    // Kayak: daty YYYY-MM-DD, klasa jako SEGMENT ŚCIEŻKI na końcu (patrz `kayak` w cabins).
    // Google Flights: zapytanie TEKSTOWE w ?q= - jako jedyny przyjmuje NAZWĘ MIASTA zamiast kodu.
    // Kiwi.com: forma /deep?from=&to=&departure=&return= , daty YYYY-MM-DD, kody IATA WIELKIMI.
    // WYBRANA ŚWIADOMIE zamiast drugiej formy, /search/results/{miasto-kraj}/{miasto-kraj}/ .
    // Tamta wyglądałaby ładniej ("szukaj do miasta" dosłownie), ale wymaga slugu kraju W NAZEWNICTWIE
    // KIWI ("czechia", "united-kingdom", "united-states"), którego NIE MAMY i nie da się go
    // niezawodnie wyprowadzić z naszych nazw krajów - jeden rozjazd i link ląduje na 404.
    // Forma /deep? bierze kody IATA, czyli dokładnie to, co już policzyliśmy. Zero zgadywania.
    skyscannerBase: "https://www.skyscanner.pl/transport/loty/",
    kayakBase:      "https://www.kayak.pl/flights/",
    kiwiBase:       "https://www.kiwi.com/deep?",
    googleBase:     "https://www.google.com/travel/flights?hl=pl&curr=PLN&q=",
    // `key` to dosłowna wartość parametru cabinclass Skyscannera - NIE TŁUMACZ jej.
    // `kayak` to segment ścieżki Kayaka (economy = pusty, czyli brak segmentu).
    // `kiwi` to wartość parametru cabinClass Kiwi.com (WIELKIMI, z podkreślnikiem).
    // `google` to słowa wchodzące w zapytanie tekstowe Google Flights.
    cabins: [
        { key: "economy",        label: "Ekonomiczna",    kayak: "",         kiwi: "ECONOMY",         google: "economy" },
        { key: "premiumeconomy", label: "Premium economy", kayak: "premium",  kiwi: "PREMIUM_ECONOMY", google: "premium economy" },
        { key: "business",       label: "Biznes",         kayak: "business", kiwi: "BUSINESS",        google: "business class" },
        { key: "first",          label: "Pierwsza",       kayak: "first",    kiwi: "FIRST",           google: "first class" }
    ],
    // BAGAŻ - patrz ostrzeżenie wyżej. `google` to jedyne miejsce, gdzie ta wartość ma jakikolwiek
    // wpływ; pusty string = nie dopisujemy nic do zapytania.
    bags: [
        { key: "any",     label: "Bez znaczenia",      google: "" },
        { key: "cabin",   label: "Tylko podręczny",    google: "carry-on only" },
        { key: "checked", label: "Z rejestrowanym",    google: "with checked bag" }
    ]
};

// ====================================================================
// KODY OBSZARÓW METROPOLITALNYCH IATA - "loty do MIASTA", a nie "na jedno lotnisko"
// ====================================================================
// PO CO: "najbliższy port" to kryterium czysto geometryczne i w metropoliach z kilkoma lotniskami
// wygrywa to najbliżej centrum, a nie to, na które realnie się leci - Paryż dostawał LBG (lotnisko
// biznesowe bez rejsów rozkładowych!), Rzym CIA zamiast FCO, Nowy Jork LGA zamiast JFK/EWR.
// Kod metropolitalny każe wyszukiwarce przeszukać WSZYSTKIE lotniska miasta naraz.
//
// KLUCZ TO "CC|Nazwa miasta", DOKŁADNIE TA NAZWA CO W CITIES_DB (angielska, bez diakrytyków) -
// ta sama konwencja co URBANRAIL_LINKS i ATLAS_CITY_LINKS, więc zero normalizacji w locie.
// KLUCZOWANIE PO MIEŚCIE, A NIE PO KODZIE LOTNISKA, JEST ISTOTNE I NIE UPRASZCZAJ TEGO:
// słownik "BGY -> MIL" wysyłałby klikającego BERGAMO po loty do Mediolanu, a klikającego
// BEAUVAIS po loty do Paryża. Miasto klika użytkownik, więc miasto decyduje.
//
// LISTA JEST CELOWO KRÓTKA (25 pozycji, nie 70). Wpisane są WYŁĄCZNIE metropolie, gdzie kod
// obszaru NIE KOLIDUJE z kodem żadnego lotniska. Pominięte właśnie z powodu kolizji: Szanghaj
// (SHA = też Hongqiao), Tajpej (TPE), Dubaj (DXB), Kuala Lumpur (KUL), Kopenhaga (CPH),
// Oslo (OSL), Houston (HOU), Chengdu (CTU), Meksyk (MEX). Los Angeles i San Francisco Bay Area
// nie mają oficjalnego kodu obszaru w ogóle. Przy tych miastach zostaje zwykły kod lotniska -
// i w większości z nich i tak jest jeden dominujący port, więc strata jest znikoma.
//
// >>> NIEZWERYFIKOWANE: czy SKYSCANNER przyjmuje kod obszaru w swoim adresie. Jego oficjalna
// dokumentacja parametrów mówi tylko o "IATA code" i kodów metropolitalnych NIE WYMIENIA.
// Kayak obsługuje je od zawsze, a Google Flights dostaje i tak nazwę miasta tekstem, więc dla
// dwóch z trzech serwisów to jest pewne. Gdyby się okazało, że Skyscanner ich nie łyka -
// przestaw useMetroForSkyscanner na false, a on jeden wróci do kodu konkretnego lotniska.
window.FLIGHT_SEARCH.useMetroForSkyscanner = true;
window.METRO_IATA = {
    "GB|London":         "LON",   // LHR, LGW, STN, LTN, LCY, SEN
    "FR|Paris":          "PAR",   // CDG, ORY, LBG, BVA
    "IT|Rome":           "ROM",   // FCO, CIA
    "IT|Milan":          "MIL",   // MXP, LIN, BGY
    "US|New York City":  "NYC",   // JFK, LGA, EWR
    "US|Washington":     "WAS",   // DCA, IAD, BWI
    "US|Chicago":        "CHI",   // ORD, MDW
    "US|Detroit":        "DTT",   // DTW, YIP
    "TH|Bangkok":        "BKK",   // BKK, DMK
    "TR|Istanbul":       "IST",   // IST, SAW
    "RU|Moscow":         "MOW",   // SVO, DME, VKO, ZIA
    "JP|Tokyo":          "TYO",   // HND, NRT
    "JP|Osaka":          "OSA",   // KIX, ITM, UKB
    "JP|Sapporo":        "SPK",   // CTS, OKD
    "KR|Seoul":          "SEL",   // ICN, GMP
    "CN|Beijing":        "BJS",   // PEK, PKX, NAY
    "SE|Stockholm":      "STO",   // ARN, BMA, NYO, VST
    "AR|Buenos Aires":   "BUE",   // EZE, AEP
    "BR|Sao Paulo":      "SAO",   // GRU, CGH, VCP
    "BR|Rio de Janeiro": "RIO",   // GIG, SDU
    "BR|Belo Horizonte": "BHZ",   // CNF, PLU
    "CA|Toronto":        "YTO",   // YYZ, YTZ, YHM
    "CA|Montreal":       "YMQ",   // YUL, YMX
    "RO|Bucharest":      "BUH",   // OTP, BBU
    "ID|Jakarta":        "JKT"    // CGK, HLP
};
