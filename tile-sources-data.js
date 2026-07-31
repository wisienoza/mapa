// ============================================================================
// TILE_SOURCES - katalog zrodel kafli rastrowych dla TRYBU SATELITARNEGO.
// Renderer (app.js, sekcja "TRYB SATELITARNY") jest calkowicie generyczny:
// zna tylko ten slownik, wiec dodanie nowego zrodla = dopisanie wpisu TUTAJ,
// bez dotykania logiki. Kolejnosc kluczy = kolejnosc cyklu na przycisku SAT.
//
// POLA WPISU:
//   label       - krotka nazwa na przycisku HUD (konwencja: EN, jak reszta HUD-u)
//   url         - szablon URL kafla. UWAGA na kolejnosc placeholderow:
//                 Esri/ArcGIS uzywa {z}/{y}/{x} (najpierw RZAD, potem KOLUMNA),
//                 OSM i wiekszosc reszty {z}/{x}/{y}. Przestawienie = kafle
//                 z zupelnie innego miejsca swiata albo same 404.
//   maxZoom     - najwyzszy poziom kafli, jaki serwer realnie ma. Renderer sam
//                 dobiera z do promienia kuli w px i przycina go do tej wartosci.
//                 SKALA: z17 ~ 1.2 m/px, z18 ~ 0.6 m/px, z19 ~ 0.3 m/px - czyli
//                 dopiero od z17 widac pojedyncze ulice i dachy. Wszystkie trzy
//                 serwisy maja z19 praktycznie wszedzie (Esri deklaruje wyzsze
//                 LOD-y tylko lokalnie, OSM konczy na 19 twardo). Poziom, ktorego
//                 w danym miejscu nie ma, wraca jako 404/pusty kafel - renderer
//                 zostawia wtedy dziure, wiec NIE podnos tego ponad 19 "na zapas".
//   attribution - tekst licencyjny. WYMAGANY prawnie przez Esri i OSM; renderer
//                 wyswietla go w rogu ekranu, dopoki tryb jest wlaczony.
//   tileSize    - bok kafla w pikselach (domyslnie 256). Zrodla "@2x"/retina
//                 oddaja 512 px na TEN SAM obszar, czyli maja dwukrotnie gestszy
//                 raster i narysowana odpowiednio wieksza kartografie. To LEPSZY
//                 sposob na czytelne napisy niz "tier" nizej, bo dostajemy wiecej
//                 DANYCH, a nie powiekszone piksele - ale wymaga, zeby zrodlo
//                 mialo wariant @2x (OSM nie ma, CARTO ma).
//                 Renderer jest generyczny: geometria kafli liczy sie przez
//                 _satTS(), a budzet kafli jest skalowany kwadratem boku, wiec
//                 zuzycie pamieci mozaiki NIE rosnie (4x mniej kafli, kazdy 4x
//                 wiekszy). Zrodlo MUSI dalej oddawac ACAO=*.
//   tier        - ILE PIKSELOW EKRANU NA JEDEN PIKSEL KAFLA (domyslnie 1).
//                 Renderer zatrzaskuje zoom tak, zeby ta krotnosc wychodzila
//                 DOKLADNIE, wiec tier: 2 znaczy "kazdy piksel kafla to kwadrat
//                 2x2 na ekranie" - napisy i ikony sa dwa razy wieksze, a obraz
//                 NIE robi sie rozmyty, bo krotnosc jest calkowita (renderer
//                 probkuje wtedy najblizszym sasiadem, patrz _satRender).
//                 Po co: kartografia OSM/Esri jest projektowana pod ekrany
//                 ~100 dpi, a na szerokim monitorze ogladana 1:1 jest po prostu
//                 za mala do czytania (zgloszenie usera 2026-07-31: "nic nie
//                 widac"). Cena: widzisz zawartosc o POZIOM plytsza (z16
//                 rozciagniety tam, gdzie zmiescilby sie z17), za to pobierasz
//                 4x mniej kafli. Dla ZDJEC (sat) zostaw 1 - tam powiekszenie
//                 daje rozmazana fotografie zamiast czytelniejszego napisu.
//   dark        - true, gdy kafle sa ciemne (zdjecia satelitarne). SterujeSILA
//                 konturow panstw rysowanych PRZEZ amCharts NA WIERZCHU kafli:
//                 na ciemnym zdjeciu potrzebne sa jasne obrysy, na jasnej mapie
//                 drogowej - ciemne, inaczej granice znikaja w tle.
//
// WSZYSTKIE ZRODLA MUSZA ODDAWAC NAGLOWEK "Access-Control-Allow-Origin: *".
// Renderer czyta piksele kafli przez getImageData - bez CORS canvas zostaje
// "zatruty" (tainted) i przegladarka rzuca SecurityError zamiast oddac dane.
// Zweryfikowane 2026-07-29: wszystkie trzy ponizsze zrodla oddaja ACAO=*.
//
// PROJEKCJA: wszystkie ponizsze to Web Mercator (EPSG:3857), czyli kafle koncza
// sie na +/-85.05 st. szerokosci. Bieguny (czapa Arktyki, wnetrze Antarktydy)
// nie istnieja w tych zrodlach - renderer przycina tam wspolrzedne, wiec ostatni
// rzad pikseli sie rozciaga. To ograniczenie zrodel, nie bug reprojekcji.
// ============================================================================
var TILE_SOURCES = {

    // Zdjecia satelitarne - to jest "ten efekt Google Earth". Mozaika Maxar/
    // Earthstar; w miastach schodzi do ~1 m/px. Darmowe do uzytku z podaniem
    // zrodla, bez klucza API.
    sat: {
        label: "SAT",
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 19,
        attribution: "Imagery: Esri, Maxar, Earthstar Geographics",
        dark: true
    },

    // Mapa drogowa - ulice, nazwy, POI. Sensowne, gdy chcesz zobaczyc UKLAD
    // miasta, a nie jak wyglada z gory.
    //
    // ZRODLO ZMIENIONE 2026-07-31 na CARTO Voyager @2x. Powod: kartografia
    // standardowego OSM jest projektowana pod ~100 dpi i na szerokim monitorze
    // ogladana 1:1 jest za drobna do czytania. Kafel "@2x" ma 512 px na TEN SAM
    // obszar, czyli wszystko jest na nim narysowane dwa razy wieksze - i to
    // NAPRAWDE wiekszymi danymi, a nie powiekszeniem pikseli (dlatego tier: 1).
    // Zweryfikowane: 512x512, ACAO=* (canvas nie jest zatruty).
    // CENA, o ktorej trzeba wiedziec: styl Voyager jest UBOZSZY od standardowego
    // OSM - mniej ikon POI i mniej podpisow drobnych obiektow.
    //
    // POWROT DO OSM to podmiana trzech pol (i nic wiecej):
    //     url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    //     attribution: "(c) OpenStreetMap contributors",
    //     tileSize: 256, tier: 2
    // (tier: 2 jest tam potrzebny wlasnie dlatego, ze OSM nie ma wariantu @2x -
    // powieksza sie wtedy piksele, calkowita krotnoscia, zeby nie rozmyc.)
    //
    // KULTURA UZYCIA: basemaps.cartocdn.com to darmowy tier przeznaczony do
    // lekkiego ruchu. Reprojekcja pobiera kilkadziesiat kafli na widok, wiec
    // renderer trzyma je w cache i nie pobiera tego samego dwa razy.
    street: {
        label: "STREET",
        url: "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
        maxZoom: 19,
        attribution: "(c) OpenStreetMap contributors, (c) CARTO",
        tileSize: 512,
        dark: false
    },

    // Topografia - cieniowany relief, pasma gorskie, wysokosci. Najlepiej
    // pokazuje UKSZTALTOWANIE terenu, ktore na zdjeciu satelitarnym ginie.
    topo: {
        label: "TOPO",
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 19,
        attribution: "Topo: Esri, HERE, Garmin, USGS, NGA",
        tier: 2,
        dark: false
    }
};
