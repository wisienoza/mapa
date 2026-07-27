// AIRPORT_WV - lotniska majace WLASNY artykul na en.wikivoyage.org.
// Klucz: kod IATA. Wartosc: TYTUL artykulu (podkreslniki zamiast spacji), NIE pelny URL -
// prefiks "https://en.wikivoyage.org/wiki/" jest staly, tak samo jak przy ATLAS_CITY_LINKS
// i CONTINENT_LINKS. Sklada go szablon `url` wpisu w AIRPORT_LINKS (airport-links-data.js).
//
// STAN 2026-07-27: 106 lotnisk. To CALY zbior, jaki istnieje - nie probka.
//
// >>> SKAD (i dlaczego nie z crawla).
// Jedno zapytanie SPARQL do Wikidanych: pozycje z kodem IATA (P238), bedace lotniskiem
// (P31/P279* -> Q1248784) i majace sitelink do en.wikivoyage. Zero zgadywania tytulow z nazwy
// lotniska - Wikivoyage nazywa artykuly po swojemu ("Schiphol Airport", nie "Amsterdam Airport
// Schiphol"; "Heathrow Airport", nie "London Heathrow Airport").
//
// >>> PULAPKA, KTORA ODSIALA 17 POZYCJI - PRZECZYTAJ PRZED ODSWIEZENIEM.
// Surowy wynik SPARQL mial 123 kody i WSZYSTKIE 123 tytuly istnialy na Wikivoyage. Ale 17 z nich
// to PRZEKIEROWANIA DO ARTYKULU MIASTA, a nie osobne artykuly o lotnisku:
//   Bradley International Airport -> Hartford,  T. F. Green Airport -> Providence,
//   Paine Field -> Everett (Washington),  Katowice-Pyrzowice airport -> Katowice,
//   Imam Khomeini International Airport -> Tehran,  Oulu Airport -> Oulu,  Darwin -> Darwin ...
// Taki link prowadzilby do przewodnika po MIESCIE, czyli dokladnie tam, gdzie i tak prowadzi
// klikalny wiersz MIASTO w tym samym panelu. Sprawdzenie samego HTTP 200 tego NIE WYKRYJE -
// trzeba pytac API o redirects=1 (action=query&redirects=1&titles=...) i wyrzucac wszystko,
// co sie przekierowuje. Odswiezajac liste, powtorz ten krok.
//
// POKRYCIE: 106 z 4174 lotnisk widocznych na mapie (2,5%) - Wikivoyage opisuje osobno tylko
// najwieksze porty przesiadkowe. Brak wpisu = brak przycisku (mechanizm `dict` w AIRPORT_LINKS).
window.AIRPORT_WV = {
    ADD: "Bole_International_Airport",
    AKL: "Auckland_Airport",
    AMS: "Schiphol_Airport",
    ARN: "Stockholm_Arlanda_Airport",
    ATH: "Athens_Eleftherios_Venizelos_International_Airport",
    ATL: "Hartsfield–Jackson_Atlanta_International_Airport",
    AUH: "Zayed_International_Airport",
    BCN: "Barcelona_El_Prat_Airport",
    BER: "Berlin_Brandenburg_International_Airport",
    BKK: "Suvarnabhumi_Airport",
    BLR: "Kempegowda_International_Airport",
    BNE: "Brisbane_Airport",
    BOM: "Chhatrapati_Shivaji_Maharaj_International_Airport",
    BOS: "Boston_Logan_International_Airport",
    BRU: "Brussels_Airport",
    CAI: "Cairo_International_Airport",
    CAN: "Guangzhou_Baiyun_International_Airport",
    CDG: "Paris_Charles_de_Gaulle_Airport",
    CGK: "Soekarno-Hatta_International_Airport",
    CLT: "Charlotte_Douglas_International_Airport",
    CPH: "Copenhagen_Airport",
    CUN: "Cancún_International_Airport",
    DEL: "Indira_Gandhi_International_Airport",
    DEN: "Denver_International_Airport",
    DFW: "Dallas-Fort_Worth_International_Airport",
    DME: "Domodedovo_International_Airport",
    DOH: "Hamad_International_Airport",
    DPS: "Ngurah_Rai_International_Airport",
    DTW: "Detroit_Metropolitan_Wayne_County_Airport",
    DUB: "Dublin_Airport",
    DUS: "Düsseldorf_Airport",
    DXB: "Dubai_International_Airport",
    EWR: "Newark_Liberty_International_Airport",
    EZE: "Ministro_Pistarini_International_Airport",
    FCO: "Leonardo_da_Vinci-Fiumicino_Airport",
    FRA: "Frankfurt_Airport",
    GDL: "Guadalajara_International_Airport",
    GIG: "Rio_de_Janeiro–Galeão_International_Airport",
    GRU: "São_Paulo-Guarulhos_International_Airport",
    HEL: "Helsinki_Airport",
    HKG: "Hong_Kong_International_Airport",
    HND: "Tokyo_Haneda_Airport",
    IAD: "Washington_Dulles_International_Airport",
    IAH: "George_Bush_Intercontinental_Airport",
    ICN: "Incheon_International_Airport",
    IST: "Istanbul_Airport",
    JFK: "John_F._Kennedy_International_Airport",
    JNB: "O.R._Tambo_International_Airport",
    KEF: "Keflavík_International_Airport",
    KIX: "Kansai_International_Airport",
    KNO: "Kualanamu_International_Airport",
    KUL: "Kuala_Lumpur_International_Airport",
    LAS: "Harry_Reid_International_Airport",
    LAX: "Los_Angeles_International_Airport",
    LGA: "LaGuardia_Airport",
    LGW: "Gatwick_Airport",
    LHR: "Heathrow_Airport",
    LIS: "Lisbon_Airport",
    MAD: "Madrid–Barajas_Airport",
    MAN: "Manchester_Airport",
    MCO: "Orlando_International_Airport",
    MEL: "Melbourne_Airport",
    MEX: "Benito_Juárez_International_Airport",
    MIA: "Miami_International_Airport",
    MNL: "Ninoy_Aquino_International_Airport",
    MSP: "Minneapolis–Saint_Paul_International_Airport",
    MTY: "Monterrey_International_Airport",
    MUC: "Munich_Airport",
    MXP: "Milan_Malpensa_Airport",
    NGO: "Chubu_Centrair_International_Airport",
    NRT: "Narita_International_Airport",
    ORD: "O'Hare_International_Airport",
    ORY: "Paris_Orly_Airport",
    OSL: "Oslo_Airport,_Gardermoen",
    PEK: "Beijing_Capital_International_Airport",
    PER: "Perth_Airport",
    PHL: "Philadelphia_International_Airport",
    PHX: "Phoenix_Sky_Harbor_International_Airport",
    PKX: "Beijing_Daxing_International_Airport",
    PRG: "Václav_Havel_Airport_Prague",
    PTY: "Tocumen_International_Airport",
    PUS: "Gimhae_International_Airport",
    PVG: "Shanghai_Pudong_International_Airport",
    SAN: "San_Diego_International_Airport",
    SAW: "Sabiha_Gökçen_International_Airport",
    SCL: "Arturo_Merino_Benítez_International_Airport",
    SEA: "Seattle-Tacoma_International_Airport",
    SFO: "San_Francisco_International_Airport",
    SGN: "Tan_Son_Nhat_International_Airport",
    SIN: "Singapore_Changi_Airport",
    SLC: "Salt_Lake_City_International_Airport",
    STN: "London_Stansted_Airport",
    SVO: "Sheremetyevo_International_Airport",
    SYD: "Sydney_Airport",
    SYX: "Sanya_Phoenix_International_Airport",
    TIA: "Tirana_International_Airport_Nënë_Tereza",
    TLV: "Ben_Gurion_International_Airport",
    TPA: "Tampa_International_Airport",
    TPE: "Taiwan_Taoyuan_International_Airport",
    VCE: "Venice_Marco_Polo_Airport",
    VIE: "Vienna_International_Airport",
    WAW: "Warsaw_Chopin_Airport",
    YUL: "Montreal-Pierre_Elliott_Trudeau_International_Airport",
    YVR: "Vancouver_International_Airport",
    YYZ: "Toronto_Pearson_International_Airport",
    ZRH: "Zurich_Airport"
};
