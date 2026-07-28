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
// >>> BAGAŻ: NIE MA GO TU I NIE DODAWAJ. Pole BAGAŻ istniało w popupie przez jedną wersję
// (2026-07-28) i zostało USUNIĘTE tego samego dnia decyzją usera, żeby nie wprowadzało w błąd.
// Powód: ŻADEN z czterech serwisów nie przyjmuje bagażu w adresie. Sprawdzone w oficjalnej
// dokumentacji parametrów Skyscannera (developers.skyscanner.net/docs/referrals/flights-parameters -
// pełna lista, bagażu tam NIE MA) oraz w opisach adresów Kayaka, Kiwi i Google Flights. Wszystkie
// mają filtr bagażu, ale WYŁĄCZNIE jako klikany filtr w wynikach. Jedyne, co dało się zrobić, to
// wpisać bagaż słowami w zapytanie Google Flights - czyli pole działające w 1 z 4 okien, co jest
// gorsze niż jego brak: sugeruje filtr, którego w trzech pozostałych kartach nie ma.
// NIE PRÓBUJ wymyślonych parametrów typu "&checkedbags=1" - zostaną cicho zignorowane,
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
    // SORTOWANIE OD NAJTAŃSZEGO (życzenie usera 2026-07-28). Każdy serwis nazywa to inaczej,
    // dlatego to trzy osobne pola, a nie jedna flaga. Pusta wartość = nie doklejaj nic.
    //   kayakSort - token z własnej listy sortowań Kayaka (`price_a,bestflight_a,duration_a,...`,
    //               odczytanej ze stanu ich strony). POTWIERDZONE, że parametr przeżywa w adresie.
    //   kiwiSort  - POTWIERDZONE mocniej: /deep? przekierowuje na właściwe wyniki i `sortBy=price`
    //               jest w adresie końcowym (…/warsaw-…/barcelona-…/?…&adults=2&sortBy=price).
    //   skySort   - NIEPOTWIERDZONE. Skyscanner odpowiada botom CAPTCHĄ, więc dało się sprawdzić
    //               tylko tyle, że parametr wchodzi do ich wewnętrznego adresu (jest w base64
    //               w URL-u captchy). Jeśli po kliknięciu Skyscanner pokazuje zakładkę "Najlepsze"
    //               zamiast "Najtańsze" - to jest to pole do poprawki, reszta jest niezależna.
    // GOOGLE FLIGHTS NIE DOSTAJE NIC I NIE PRÓBUJ: sortowanie nie da się wyrazić w zapytaniu
    // tekstowym `q=`, a siedzi w zakodowanym `tfs=`, którego nie budujemy.
    kayakSort: "price_a",
    kiwiSort:  "price",
    skySort:   "price",
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
// SKYSCANNER PRZYJMUJE KODY OBSZARU - potwierdzone na żywo przez usera 2026-07-28 (adres
// /transport/loty/waw/par/ otwiera Paryż, nie błąd). Wcześniej było to niepewne, bo oficjalna
// dokumentacja parametrów Skyscannera mówi tylko o "IATA code" i kodów metropolitalnych NIE
// WYMIENIA - jak widać, wymienia niepełną listę. Kayak i Kiwi obsługują je również, a Google
// Flights dostaje i tak nazwę miasta tekstem. Czyli działa we wszystkich czterech serwisach.
// Flaga useMetroForSkyscanner zostaje jako wyłącznik awaryjny na wypadek, gdyby Skyscanner
// kiedyś to zmienił: false cofa jego jednego do kodu konkretnego lotniska, reszta bez zmian.
// ====================================================================
// POLSKIE NAZWY MIAST - wyłącznie do WYSZUKIWANIA w polu "Z:" popupu lotów
// ====================================================================
// PO CO: AIRPORT_DB trzyma nazwy miast po angielsku ("Warsaw", "London", "Rome"), a użytkownik
// tej strony jest Polakiem i wpisuje "Warszawa", "Londyn", "Rzym". Bez tego słownika pole
// nie znajdowało NICZEGO na polską nazwę - sprawdzone na żywo, "warszawa" i "londyn" dawały
// zero wyników, mimo że oba lotniska są w bazie.
// TO NIE JEST tłumaczenie do wyświetlania: etykiety podpowiedzi zostają angielskie, tak jak
// cała reszta nazw w aplikacji. Ten słownik dokłada się WYŁĄCZNIE do pola przeszukiwanego
// (`hay` w window._buildOriginIndex), więc jest niewidoczny aż do momentu wpisania zapytania.
// KLUCZ = nazwa miasta DOKŁADNIE tak, jak stoi w AIRPORT_DB[kod][2].
// Lista obejmuje kierunki realnie latane z Polski + stolice, których polska nazwa różni się od
// angielskiej. Miasta o identycznej pisowni (Barcelona, Dublin, Hamburg) NIE MAJĄ tu wpisu -
// byłyby zbędne, bo szukanie po angielskiej nazwie i tak je znajduje.
window.PL_CITY_ALIAS = {
    "Warsaw": "Warszawa", "Cracow": "Kraków", "Krakow": "Kraków", "Wroclaw": "Wrocław",
    "Gdansk": "Gdańsk", "Poznan": "Poznań", "Katowice": "Katowice", "Rzeszow": "Rzeszów",
    "Szczecin": "Szczecin", "Lodz": "Łódź", "Bydgoszcz": "Bydgoszcz", "Lublin": "Lublin",
    "London": "Londyn", "Rome": "Rzym", "Milan": "Mediolan", "Florence": "Florencja",
    "Venice": "Wenecja", "Naples": "Neapol", "Turin": "Turyn", "Genoa": "Genua",
    "Paris": "Paryż", "Nice": "Nicea", "Marseille": "Marsylia", "Toulouse": "Tuluza",
    "Vienna": "Wiedeń", "Munich": "Monachium", "Cologne": "Kolonia", "Dresden": "Drezno",
    "Leipzig": "Lipsk", "Nuremberg": "Norymberga", "Hanover": "Hanower", "Bremen": "Brema",
    "Prague": "Praga", "Brno": "Brno", "Bratislava": "Bratysława", "Budapest": "Budapeszt",
    "Bucharest": "Bukareszt", "Belgrade": "Belgrad", "Zagreb": "Zagrzeb", "Ljubljana": "Lublana",
    "Sofia": "Sofia", "Athens": "Ateny", "Thessaloniki": "Saloniki", "Istanbul": "Stambuł",
    "Copenhagen": "Kopenhaga", "Stockholm": "Sztokholm", "Gothenburg": "Göteborg",
    "Oslo": "Oslo", "Helsinki": "Helsinki", "Reykjavik": "Rejkiawik",
    "Brussels": "Bruksela", "Antwerp": "Antwerpia", "The Hague": "Haga", "Amsterdam": "Amsterdam",
    "Lisbon": "Lizbona", "Madrid": "Madryt", "Seville": "Sewilla", "Valencia": "Walencja",
    "Zurich": "Zurych", "Geneva": "Genewa", "Basel": "Bazylea", "Bern": "Berno",
    "Luxembourg": "Luksemburg", "Edinburgh": "Edynburg", "Moscow": "Moskwa",
    "Saint Petersburg": "Petersburg", "Kyiv": "Kijów", "Kiev": "Kijów", "Lviv": "Lwów",
    "Odesa": "Odessa", "Minsk": "Mińsk", "Vilnius": "Wilno", "Kaunas": "Kowno",
    "Riga": "Ryga", "Tallinn": "Tallin", "Chisinau": "Kiszyniów", "Tbilisi": "Tbilisi",
    "Yerevan": "Erywań", "Baku": "Baku", "Nicosia": "Nikozja", "Valletta": "Valletta",
    "Cairo": "Kair", "Marrakesh": "Marrakesz", "Casablanca": "Casablanca", "Tunis": "Tunis",
    "Tel Aviv": "Tel Awiw", "Jerusalem": "Jerozolima", "Dubai": "Dubaj", "Doha": "Ad-Dauha",
    "Beijing": "Pekin", "Shanghai": "Szanghaj", "Tokyo": "Tokio", "Kyoto": "Kioto",
    "Seoul": "Seul", "Bangkok": "Bangkok", "Singapore": "Singapur", "Mumbai": "Bombaj",
    "New Delhi": "Nowe Delhi", "New York City": "Nowy Jork", "New York": "Nowy Jork",
    "Mexico City": "Meksyk", "Havana": "Hawana", "Rio de Janeiro": "Rio de Janeiro",
    "Buenos Aires": "Buenos Aires", "Cape Town": "Kapsztad"
};

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
