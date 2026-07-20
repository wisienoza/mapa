// === APPLICATION LOGIC (wydzielone z index.html) ===
        // --- RYSOWANIE TRASY MISJI (nowe) ---
        window.displayMissionRoute = function(missionName) {
            if (typeof stopRot === 'function') stopRot();
            const mission = MISSIONS_DB.find(m => m.name === missionName);
            if (!mission || !mission.route) { console.log("Brak danych trasy dla misji: " + missionName); return; }
            lineSeries.data.clear();
            pointSeries.data.clear();
            pointSeries.data.setAll(mission.route.map(p => ({ geometry: { type: "Point", coordinates: [p.lon, p.lat] }, title: p.city })));
            const coordinates = mission.route.map(p => [p.lon, p.lat]);
            lineSeries.pushDataItem({ geometry: { type: "LineString", coordinates: coordinates } });
            var _lats = mission.route.map(function(p){ return p.lat; }), _lons = mission.route.map(function(p){ return p.lon; });
            var _cLat = (Math.min.apply(null, _lats) + Math.max.apply(null, _lats)) / 2;
            var _cLon = (Math.min.apply(null, _lons) + Math.max.apply(null, _lons)) / 2;
            window.resetIntelPanels();
            if (typeof rotateGlobe === 'function') rotateGlobe(_cLat, _cLon);
            // Po resetIntelPanels (ono czysci factbook) - inaczej intel misji zostalby wymazany.
            if (window.updateMissionIntel) window.updateMissionIntel(mission);
        };
        // --- KLIK W KONTYNENT (Continental Control) -> centrowanie globu ---
        // --- Czyszczenie warstw miast (etykiety + kropki) - wspolne dla resetu paneli, rotacji,
        // przelaczania trybow i renderu kraju (wczesniej powtarzane inline w ~5 miejscach). ---
        window._clearCitySeries = function(){
            if (window.cityLabelSeries) window.cityLabelSeries.data.clear();
            if (window.cityDotSeries) window.cityDotSeries.data.clear();
        };
        // --- Panel pogody -> stan spoczynkowy (TARGET: NONE / SYSTEM OFFLINE). Wspolne dla resetIntelPanels,
        // updateWonderIntel i updateContinentIntel (wczesniej ten sam blok byl wklejony inline 3x). ---
        window._standbyWeatherPanel = function(){
            var wT = document.getElementById("weather-target"), wC = document.getElementById("weather-content");
            if (wT) wT.innerText = "TARGET: NONE";
            if (wC) wC.innerHTML = '<div style="color: #8b97a4; font-family: \'Consolas\', monospace; font-size: 0.9rem;">SYSTEM OFFLINE / STANDBY</div>';
        };
        // --- ZAMKNIECIE PANELI INTEL (brak focusu na kraj) ---
        window.resetIntelPanels = function() {
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            window._cityWeatherToken = (window._cityWeatherToken || 0) + 1;   // uniewaznij pogode w locie
            if (window.showCityLegend) window.showCityLegend(false);
            if (window.showAirportModeBtn) window.showAirportModeBtn(false);
            if (window.clearCountryHighlight) window.clearCountryHighlight();
            if (window._setLootBarActive) window._setLootBarActive(null);   // zdejmij podswietlenie z paska flag
            if (window.airportSeries) window.airportSeries.data.clear();
            window._clearCitySeries();
            if (window.myFlightsOn) window.clearMyFlights();
            if (window._clearMaxRangePlane) window._clearMaxRangePlane();
            if (window.groundLegSeries) window.groundLegSeries.data.clear();   // odcinek lotnisko -> miasto
            var fT = document.getElementById("factbook-target"), fC = document.getElementById("factbook-content");
            if (fT) fT.innerText = "TARGET: NONE";
            if (fC) fC.innerHTML = '<div style="color: #8b97a4; font-family: \'Consolas\', monospace; font-size: 0.9rem;">AWAITING SELECTION...</div>';
            window._standbyWeatherPanel();
        };
        // --- LEGENDA ZNACZNIKOW MIAST (box pojawia sie po kliknieciu w panstwo) ---
        window.showCityLegend = function(on){
            var el = document.getElementById("city-legend");
            if (!el) {
                el = document.createElement("div");
                el.id = "city-legend";
                el.style.cssText = "position:fixed; bottom:96px; left:50%; transform:translateX(-50%); z-index:101; background:rgba(0,0,0,0.82); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:8px 16px; backdrop-filter:blur(8px); display:flex; gap:17px; align-items:center; font-family:'JetBrains Mono',monospace; font-size:0.81rem; color:#c6cfd9; box-shadow:0 4px 15px rgba(0,0,0,0.5); pointer-events:none; opacity:0; transition:opacity 0.25s ease; white-space:nowrap;";
                el.innerHTML =
                    '<span style="color:#8f9ba8; letter-spacing:1px;">MIASTA</span>'
                  + '<span><span style="color:#ffd700; font-size:1.07rem;">★</span> stolica</span>'
                  + '<span><span style="color:#facc15;">■</span> metropolia &gt;1 mln</span>'
                  + '<span><span style="color:#facc15;">●</span> duże miasto</span>'
                  + '<span><span style="color:#f59e0b;">•</span> miasto</span>';
                document.body.appendChild(el);
            }
            el.style.opacity = on ? "1" : "0";
        };
        // --- PRZYCISK TRYBU LOTNISK: pojawia sie nad legenda miast, przelacza WIDOK AKTUALNEGO
        // kraju natychmiast (bez ponownego klikania w mape) - patrz renderCountryPlaces() nizej ---
        window.showAirportModeBtn = function(on){
            var el = document.getElementById("airport-mode-btn");
            if (!el) {
                el = document.createElement("div");
                el.id = "airport-mode-btn";
                el.style.cssText = "position:fixed; bottom:144px; left:50%; transform:translateX(-50%); z-index:101; border:1px solid #00b3ff; color:#00b3ff; border-radius:8px; padding:7px 16px; backdrop-filter:blur(8px); font-family:'JetBrains Mono',monospace; font-size:0.78rem; font-weight:bold; box-shadow:0 4px 15px rgba(0,0,0,0.5); pointer-events:none; opacity:0; transition:opacity 0.25s ease; white-space:nowrap; cursor:pointer;";
                el.onclick = function(){
                    window.airportMode = !window.airportMode;
                    _paintAirportModeBtn();
                    if (window._selectedCountryId && window.renderCountryPlaces) window.renderCountryPlaces(window._selectedCountryId);
                };
                document.body.appendChild(el);
            }
            _paintAirportModeBtn();
            el.style.opacity = on ? "1" : "0";
            el.style.pointerEvents = on ? "auto" : "none";
        };
        function _paintAirportModeBtn(){
            var el = document.getElementById("airport-mode-btn");
            if (!el) return;
            var on = !!window.airportMode;
            el.textContent = on ? "🏙️ POKAŻ MIASTA" : "🛬 POKAŻ LOTNISKA";
            el.style.background = on ? "rgba(0,179,255,0.2)" : "rgba(0,0,0,0.82)";
        }
        // --- LEGENDA WIZOWA (u gory-srodka; pojawia sie w trybie VISA) ---
        window.showVisaLegend = function(on){
            var el = document.getElementById("visa-legend");
            if (!el) {
                el = document.createElement("div");
                el.id = "visa-legend";
                el.style.cssText = "position:fixed; top:12px; left:50%; transform:translateX(-50%); z-index:101; background:rgba(0,0,0,0.85); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:8px 16px; backdrop-filter:blur(8px); display:flex; gap:16px; align-items:center; font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#c6cfd9; box-shadow:0 4px 15px rgba(0,0,0,0.5); pointer-events:none; opacity:0; transition:opacity 0.25s ease; white-space:nowrap; flex-wrap:wrap; justify-content:center; max-width:92vw;";
                var dt = (typeof VISA_PL_DATE !== "undefined") ? VISA_PL_DATE : "";
                el.innerHTML =
                    '<span style="color:#c084fc; letter-spacing:1px; font-weight:bold;">🛂 WIZY (PL)</span>'
                  + '<span><span style="color:#22c55e;">■</span> bez wizy</span>'
                  + '<span><span style="color:#f59e0b;">■</span> eVisa / eTA / w ARR</span>'
                  + '<span><span style="color:#dc2626;">■</span> wiza wymagana</span>'
                  + '<span><span style="color:#3b82f6;">■</span> Twój paszport</span>'
                  + '<span style="color:#8f9ba8;">dane '+dt+' · nieoficjalne</span>';
                document.body.appendChild(el);
            }
            el.style.opacity = on ? "1" : "0";
        };
        // --- OSIAGNIECIA / ODZNAKI: definicje (window.ACHIEVEMENTS) w achievements-catalog.js (osobny plik, blokowany w .claude/settings.json). Silnik liczacy + panel modalny ponizej. ---
        window.computeAchievementContext = function(){
            // Memoizacja: kontekst zalezy WYLACZNIE od VISITED_COUNTRIES/WONDERS/CITIES. Reszta danych
            // (FACTBOOK, VISA_PL, FLIGHTS_*, INTEL_DB, CITIES_DB) jest statyczna w sesji, a te trzy tablice
            // zmieniaja sie tylko przez mark* -> tam czyscimy cache (window._achCtxCache = null). Bez tego
            // pelne przejscie CITIES_DB (_computeCityStats, tysiace miast + normalizacja nazw) lecialo przy
            // KAZDYM refreshVisitedUI / otwarciu panelu / update paska - w tym 2x na starcie (dwa "datavalidated").
            if (window._achCtxCache) return window._achCtxCache;
            window._achCtxComputeCount = (window._achCtxComputeCount || 0) + 1;   // licznik realnych przeliczen (test F12)
            var visited = (typeof VISITED_COUNTRIES !== 'undefined') ? VISITED_COUNTRIES : [];
            var uniqueVisited = Array.from(new Set(visited));
            var visitedSet = {};
            uniqueVisited.forEach(function(id){ visitedSet[id] = true; });
            visitedSet["PL"] = true; // dom - zawsze "odwiedzony" dla celow REGIONY, niezaleznie od stanu checkboxa w adminie

            var regionTotals = {};
            (typeof CONTINENT_DATA !== 'undefined' ? CONTINENT_DATA : []).forEach(function(c){ regionTotals[c.id] = c.total; });
            var totalCountries = Object.keys(regionTotals).reduce(function(s, k){ return s + (regionTotals[k] || 0); }, 0);
            var regionCounts = {};
            uniqueVisited.forEach(function(id){
                var r = (typeof REGION_MAP !== 'undefined') ? REGION_MAP[id] : null;
                if (r) regionCounts[r] = (regionCounts[r] || 0) + 1;
            });
            var regionDone = {};
            Object.keys(regionTotals).forEach(function(r){ regionDone[r] = regionTotals[r] > 0 && (regionCounts[r] || 0) >= regionTotals[r]; });
            var continentsTouched = Object.keys(regionCounts).filter(function(r){ return regionCounts[r] > 0; }).length;

            var hasSouth = false, hasArctic = false, hasDeepSouth = false, hasEast = false, hasWest = false;
            var hasTropical = false, hasNearEquator = false;
            var quadNE = false, quadNW = false, quadSE = false, quadSW = false;
            var maxDistKm = 0, maxDistId = null, wawLat = 52.2297, wawLon = 21.0122;
            uniqueVisited.forEach(function(id){
                var c = (typeof CAPITAL_COORDS !== 'undefined') ? CAPITAL_COORDS[id] : null;
                if (!c) return;
                var lat = c[0], lon = c[1];
                if (lat < 0) hasSouth = true;
                if (lat >= 63) hasArctic = true;
                if (lat <= -40) hasDeepSouth = true;
                if (lon > 0) hasEast = true;
                if (lon < 0) hasWest = true;
                if (lat >= 0 && lon >= 0) quadNE = true;
                if (lat >= 0 && lon < 0) quadNW = true;
                if (lat < 0 && lon >= 0) quadSE = true;
                if (lat < 0 && lon < 0) quadSW = true;
                if (Math.abs(lat) <= 23.5) hasTropical = true;
                if (Math.abs(lat) <= 5) hasNearEquator = true;
                if (id !== "PL" && typeof getDist === 'function') {
                    var d = getDist(wawLat, wawLon, lat, lon);
                    if (d > maxDistKm) { maxDistKm = d; maxDistId = id; }
                }
            });

            var excl = (typeof EXCLUDED_CODES !== 'undefined') ? EXCLUDED_CODES : [];
            var score = uniqueVisited.filter(function(id){ return excl.indexOf(id) === -1; }).length;
            var visitedWonders = (typeof VISITED_WONDERS !== 'undefined') ? VISITED_WONDERS : [];
            var wondersTotal = (typeof WONDERS !== 'undefined') ? WONDERS.length : 0;
            // Zbior cudow w konwencji visitedSet - dla IMIENNYCH osiagniec ("MUR CHINSKI ZALICZONY").
            // Klucz = WONDERS[].id, czyli kod ISO-2 kraju: kazdy z 21 cudow lezy w innym panstwie, wiec
            // kolizji nie ma. UWAGA: to NIE to samo co visitedSet - w kraju mozna byc, nie widzac cudu.
            var wonderSet = {};
            visitedWonders.forEach(function(id){ wonderSet[id] = true; });

            // --- LOTY (realne, z Flightradar24) ---
            var flightsTotal = (typeof FLIGHTS_META !== 'undefined') ? (FLIGHTS_META.total || 0) : 0;
            var flightsAirports = (typeof FLIGHTS_META !== 'undefined') ? (FLIGHTS_META.airports || 0) : 0;
            var flightsRoutes = (typeof FLIGHTS_META !== 'undefined') ? (FLIGHTS_META.routes || 0) : 0;
            // NALOT LICZYMY Z _flightStats (per-lot log z FLIGHTS_LOG) - to samo zrodlo, co panel Flights.
            // Wczesniej byla tu WLASNA petla po FLIGHTS_LEGS (52 unikalne trasy), przez co odznaki widzialy
            // 91 026 km zamiast realnych 135 865 km i ta sama "suma dystansu lotow" miala na stronie dwie
            // rozne wartosci. Importer z admin.php daje dzis pelny log, wiec to on jest zrodlem prawdy.
            // Gdy loga brak (stary flights-data.js), _flightStats sam spada na FLIGHTS_LEGS (hasLog=false) -
            // zanizone, ale spojne z panelem, ktory w tym trybie jawnie sie do tego przyznaje.
            var fs = (typeof window._flightStats === 'function') ? window._flightStats() : null;
            var flightsKm = fs ? fs.totalKm : 0;
            var longestLegKm = (fs && fs.longest) ? fs.longest.d : 0;
            var shortestLegKm = (fs && fs.shortest) ? fs.shortest.d : 0;
            var flightsAvgKm = fs ? fs.avgKm : 0;
            var flightsMinutes = fs ? fs.minutes : 0;
            var flightsCountriesAir = fs ? fs.countries : 0;
            var flightsAirlines = fs ? (fs.airlinesCount || 0) : 0;
            var flightsAircraft = fs ? (fs.aircraftCount || 0) : 0;
            var topAirlineFlights = fs ? (fs.topAirlineN || 0) : 0;
            var topAircraftFlights = fs ? (fs.topAircraftN || 0) : 0;
            var flightsYearsActive = fs ? (fs.yearsActive || 0) : 0;
            var bestYearFlights = (fs && fs.bestYear) ? fs.bestYear.n : 0;
            // RYTM LOTOW - patrz _flightStats. Bez logu wszystko zeruje sie samo (kategoria stoi na zerze).
            var maxPerDay = fs ? (fs.maxPerDay || 0) : 0;
            var maxPerMonth = fs ? (fs.maxPerMonth || 0) : 0;
            var monthsCovered = fs ? (fs.monthsCovered || 0) : 0;
            var weekdaysCovered = fs ? (fs.weekdaysCovered || 0) : 0;
            var seasonsCovered = fs ? (fs.seasonsCovered || 0) : 0;
            var longestLegMin = (fs && fs.longestTime) ? fs.longestTime.m : 0;
            // Staz: ile pelnych lat mija od pierwszego lotu (2011-03-25 -> 15 w 2026). Bez logu = 0.
            var flightsSeniority = 0;
            if (fs && fs.first) {
                var f = new Date(fs.first), now = new Date();
                flightsSeniority = now.getFullYear() - f.getFullYear() - ((now.getMonth() < f.getMonth() || (now.getMonth() === f.getMonth() && now.getDate() < f.getDate())) ? 1 : 0);
                if (flightsSeniority < 0) flightsSeniority = 0;
            }
            var repeatFlights = Math.max(0, flightsTotal - flightsRoutes);

            // --- WIZY / KOSZTY / BEZPIECZENSTWO (dla odwiedzonych krajow) ---
            var visaRequiredCount = 0, visaFreeCount = 0, eVisaCount = 0, etaCount = 0, onArrivalCount = 0;
            var hasCheap = false, hasExpensive = false, cheapCount = 0, expensiveCount = 0;
            var hasRisky = false, hasMaxRisk = false, riskyCount = 0, safeCount = 0;
            var visaTypesSet = {};
            uniqueVisited.forEach(function(id){
                var req = (typeof VISA_PL !== 'undefined') ? VISA_PL[id] : null;
                if (req === "visa required") { visaRequiredCount++; visaTypesSet["required"] = true; }
                else if (req != null) { visaFreeCount++; visaTypesSet["free"] = true; }
                if (req === "e-visa") { eVisaCount++; visaTypesSet["evisa"] = true; }
                if (req === "eta") { etaCount++; visaTypesSet["eta"] = true; }
                if (req === "visa on arrival") { onArrivalCount++; visaTypesSet["onarrival"] = true; }
                var cost = (typeof COST_INDEX !== 'undefined') ? COST_INDEX[id] : null;
                if (cost === "$") { hasCheap = true; cheapCount++; }
                if (cost === "$$$$") { hasExpensive = true; expensiveCount++; }
                var safety = (typeof SAFETY_OVERRIDE !== 'undefined' && SAFETY_OVERRIDE[id]) ? SAFETY_OVERRIDE[id] : 1;
                if (safety >= 4) { hasRisky = true; riskyCount++; }
                if (safety >= 5) hasMaxRisk = true;
                if (safety <= 1) safeCount++;
            });

            // --- CIEKAWOSTKI (z FACTBOOK: populacja/powierzchnia/jezyki/waluty/religie/kierunkowe) ---
            var hasMegaPop = false, hasMicroPop = false, hasSuperPop = false, hasNanoPop = false;
            var hasHugeArea = false, hasTinyArea = false, hasMegaArea = false, hasMicroArea = false, hasMultilingual = false;
            var hasLowDensity = false, hasHighDensity = false;
            var currencySet = {}, languageSet = {}, religionSet = {}, iddSet = {};
            // Nowe 2026-07-17: sumy populacji/powierzchni -> "odwiedziles X% ludzkosci / ladu".
            // MIANOWNIK LICZYMY Z FACTBOOK (suma po wszystkich panstwach minus EXCLUDED_CODES), a NIE ze
            // stalej "8,1 mld / 149 mln km2". Dzieki temu procent zawsze zgadza sie z ta sama baza, z ktorej
            // leci licznik - jesli FACTBOOK sie odswiezy, oba konce ulamka przesuna sie razem.
            var popSum = 0, areaSum = 0, popWorld = 0, areaWorld = 0;
            var hasGigaPop = false, hasUltraLowDensity = false, hasUltraHighDensity = false;
            var hasMultiCapital = false, hasTripleCapital = false;
            if (typeof FACTBOOK !== 'undefined') {
                Object.keys(FACTBOOK).forEach(function(k){
                    if (excl.indexOf(k) !== -1) return;
                    var fw = FACTBOOK[k];
                    if (fw && typeof fw.population === "number") popWorld += fw.population;
                    if (fw && typeof fw.area === "number") areaWorld += fw.area;
                });
            }
            uniqueVisited.forEach(function(id){
                var f = (typeof FACTBOOK !== 'undefined') ? FACTBOOK[id] : null;
                if (f) {
                    if (typeof f.population === "number") {
                        if (excl.indexOf(id) === -1) popSum += f.population; // suma tylko po PANSTWACH (jak score)
                        if (f.population > 100000000) hasMegaPop = true;
                        if (f.population > 500000000) hasSuperPop = true;
                        if (f.population > 1000000000) hasGigaPop = true;
                        if (f.population > 0 && f.population < 100000) hasMicroPop = true;
                        if (f.population > 0 && f.population < 10000) hasNanoPop = true;
                        if (f.area) {
                            var density = f.population / f.area;
                            if (density < 5) hasLowDensity = true;
                            if (density < 2) hasUltraLowDensity = true;
                            if (density > 500) hasHighDensity = true;
                            if (density > 1000) hasUltraHighDensity = true;
                        }
                    }
                    if (typeof f.area === "number") {
                        if (excl.indexOf(id) === -1) areaSum += f.area;
                        if (f.area > 5000000) hasHugeArea = true;
                        if (f.area > 10000000) hasMegaArea = true;
                        if (f.area > 0 && f.area < 1000) hasTinyArea = true;
                        if (f.area > 0 && f.area < 100) hasMicroArea = true;
                    }
                    // FACTBOOK.capital to TABLICA - kraje z kilkoma stolicami (RPA ma 3, Boliwia 2) daja to
                    // za darmo, bez zadnej nowej listy.
                    if (f.capital && f.capital.length >= 2) hasMultiCapital = true;
                    if (f.capital && f.capital.length >= 3) hasTripleCapital = true;
                    var langs = f.languages ? Object.keys(f.languages) : [];
                    if (langs.length >= 3) hasMultilingual = true;
                    langs.forEach(function(lk){ languageSet[f.languages[lk]] = true; });
                    var currKey = f.currencies ? Object.keys(f.currencies)[0] : null;
                    if (currKey) currencySet[currKey] = true;
                    if (f.idd && f.idd.root) iddSet[f.idd.root] = true;
                }
                var rel = (typeof RELIGIONS !== 'undefined') ? RELIGIONS[id] : null;
                if (rel) religionSet[rel] = true;
            });

            // --- LOGISTYKA (z INTEL_DB: prad/woda/napiwki) ---
            var adapterCount = 0, noAdapterCount = 0, tapSafeCount = 0, bottledOnlyCount = 0, hasMandatoryTip = false, hasNoTipCulture = false;
            var voltageSet = {};
            uniqueVisited.forEach(function(id){
                var intel = (typeof INTEL_DB !== 'undefined') ? INTEL_DB[id] : null;
                if (!intel) return;
                if (intel.p) {
                    if (intel.p.indexOf("ADAPTER: TAK") >= 0) adapterCount++;
                    if (intel.p.indexOf("ADAPTER: NIE") >= 0) noAdapterCount++;
                    var vm = intel.p.match(/(\d+)V/);
                    if (vm) voltageSet[vm[1]] = true;
                }
                if (intel.w) {
                    if (intel.w.indexOf("PIJ ŚMIAŁO") >= 0) tapSafeCount++;
                    if (intel.w.indexOf("☠️") >= 0) bottledOnlyCount++;
                }
                if (intel.t) {
                    if (intel.t.indexOf("OBOWIĄZ") >= 0 || intel.t.indexOf("‼") >= 0) hasMandatoryTip = true;
                    if (intel.t.indexOf("BRAK ZWYCZAJU") >= 0 || intel.t.indexOf("ZAKAZANE") >= 0 || intel.t.indexOf("OBRAZA") >= 0) hasNoTipCulture = true;
                }
            });

            // regionCounts/regionTotals + dwa helpery ponizej sa TYLKO dla pola prog() w katalogu osiagniec
            // (pasek postepu i lista brakow po kliknieciu w kafelek). check() ich nie uzywa.
            // Nazwy krajow: FACTBOOK[code].name.common - jak wszedzie indziej na glownej stronie.
            var _regionNames = function(cid, want) {
                if (typeof REGION_MAP === 'undefined') return [];
                return Object.keys(REGION_MAP)
                    .filter(function(code){ return REGION_MAP[code] === cid && !!visitedSet[code] === want; })
                    .map(function(code){ return (typeof FACTBOOK !== 'undefined' && FACTBOOK[code]) ? FACTBOOK[code].name.common : code; })
                    .sort(function(a, b){ return a.localeCompare(b); });
            };
            var _missingInRegion = function(cid) { return _regionNames(cid, false); };
            var _visitedInRegion = function(cid) { return _regionNames(cid, true); };
            var _continentNames = function(want) {
                return (typeof CONTINENT_DATA !== 'undefined' ? CONTINENT_DATA : [])
                    .filter(function(c){ return (regionCounts[c.id] > 0) === want; })
                    .map(function(c){ return c.name; });
            };
            var _untouchedContinents = function() { return _continentNames(false); };
            var _touchedContinents = function() { return _continentNames(true); };
            // Gotowy wynik prog() dla osiagniec opartych o LISTE kodow ISO (cala kategoria REGIONY).
            // min = prog (dla warunkow "wszystkie z listy" podaj list.length).
            var _cName = function(code){ return (typeof FACTBOOK !== 'undefined' && FACTBOOK[code]) ? FACTBOOK[code].name.common : code; };
            var _regionProg = function(list, min) {
                var done = [], missing = [];
                list.forEach(function(code){ (visitedSet[code] ? done : missing).push(_cName(code)); });
                done.sort(function(a,b){ return a.localeCompare(b); });
                missing.sort(function(a,b){ return a.localeCompare(b); });
                return { have: done.length, need: min, done: done, missing: missing };
            };
            // Jw. dla kategorii CUDA SWIATA. Zrodlo nazw: WONDERS (intel.js), stan: VISITED_WONDERS.
            var _wonderProg = function(min) {
                var all = (typeof WONDERS !== 'undefined') ? WONDERS : [];
                var vw = {};
                visitedWonders.forEach(function(id){ vw[id] = true; });
                var done = [], missing = [];
                all.forEach(function(w){ (vw[w.id] ? done : missing).push(w.name); });
                return { have: done.length, need: min, done: done, missing: missing };
            };
            // --- 2026-07-17: prog() dla osi opartych o SLOWNIKI (wizy / ceny / ryzyko). Lista krajow jest
            // liczona W LOCIE ze zrodla, a NIE wpisana na sztywno w katalogu - po odswiezeniu VISA_PL czy
            // COST_INDEX kafelek sam pokaze aktualne kraje. Dzieki temu "PIERWSZA WIZA W PASZPORCIE" mowi
            // wprost, ktore 12 krajow swiata wymaga dzis wizy dla paszportu PL, zamiast suchego "0 / 1".
            // Warunki musza sie ZGADZAC z licznikami w check() wyzej (visaRequiredCount itd.) - jesli
            // zmienisz jedno, zmien drugie, inaczej pasek bedzie klamal.
            var _dictProg = function(codes, min) {
                var done = [], missing = [];
                codes.forEach(function(c){
                    var f = (typeof FACTBOOK !== 'undefined') ? FACTBOOK[c] : null;
                    var nm = f ? f.name.common : c;
                    (visitedSet[c] ? done : missing).push(nm);
                });
                done.sort(); missing.sort();
                return { have: done.length, need: min, done: done, missing: missing };
            };
            var _visaProg = function(status, min) {
                var l = [];
                if (typeof VISA_PL !== 'undefined') {
                    Object.keys(VISA_PL).forEach(function(c){
                        var o = (typeof VISA_PL_OVERRIDES !== 'undefined') ? VISA_PL_OVERRIDES[c] : undefined;
                        if ((o !== undefined ? o : VISA_PL[c]) === status) l.push(c);
                    });
                }
                return _dictProg(l, min);
            };
            var _costProg = function(tier, min) {
                var l = [];
                if (typeof COST_INDEX !== 'undefined') Object.keys(COST_INDEX).forEach(function(c){ if (COST_INDEX[c] === tier) l.push(c); });
                return _dictProg(l, min);
            };
            var _riskProg = function(minLevel, min) {
                var l = [];
                if (typeof SAFETY_OVERRIDE !== 'undefined') Object.keys(SAFETY_OVERRIDE).forEach(function(c){ if (SAFETY_OVERRIDE[c] >= minLevel) l.push(c); });
                return _dictProg(l, min);
            };
            // --- DOPISANE 2026-07-19: analogiczne helpery dla LOGISTYKA / PIENIĄDZE I RYZYKO / GEOGRAFIA
            // EKSTREMALNA - wczesniej te kategorie mialy prog() z samym have/need (pasek), bez done/missing,
            // wiec kafelek nie byl klikalny (warunek klikalnosci w showAchievementsPanel wymaga niepustej
            // listy). Dla COST_INDEX "$" i SAFETY_OVERRIDE<=1 uniwersum kandydatow jest DUZE (~konwencja
            // "Progi >40 krajow CELOWO bez listy" w db-schema.md), wiec dajemy TYLKO `done` (odwiedzone,
            // z natury male) - bez `missing`, zeby nie zrobic sciany czerwonego tekstu z ~70 nieodwiedzonych.
            var _visCountriesIntel = function(fn){
                if (typeof INTEL_DB === 'undefined') return [];
                var out = [];
                Object.keys(visitedSet).forEach(function(code){
                    var intel = INTEL_DB[code];
                    if (!intel) return;
                    try { if (fn(intel)) out.push(_cName(code)); } catch (e) {}
                });
                return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
            };
            var _visCountriesCost = function(fn){
                if (typeof COST_INDEX === 'undefined') return [];
                var out = [];
                Object.keys(visitedSet).forEach(function(code){
                    var v = COST_INDEX[code];
                    if (v === undefined) return;
                    try { if (fn(v)) out.push(_cName(code)); } catch (e) {}
                });
                return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
            };
            var _visCountriesSafety = function(fn){
                var out = [];
                Object.keys(visitedSet).forEach(function(code){
                    var safety = (typeof SAFETY_OVERRIDE !== 'undefined' && SAFETY_OVERRIDE[code]) ? SAFETY_OVERRIDE[code] : 1;
                    try { if (fn(safety)) out.push(_cName(code)); } catch (e) {}
                });
                return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
            };
            // PANSTWA odwiedzone wg WSPOLRZEDNYCH STOLICY (GEOGRAFIA EKSTREMALNA) - fn dostaje
            // {code, name, lat, lon}. Iteruje uniqueVisited, a NIE visitedSet, zeby zgadzac sie co do
            // kraju z check(): flagi hasSouth/hasArctic/... licza sie wyzej wlasnie z uniqueVisited
            // (visitedSet ma wymuszone PL=true, wiec przez nie "DOOKOLA ZEGARA" widzialoby wschodnia
            // dlugosc nawet przy niezaznaczonej Polsce - lista klamalaby wzgledem wygaszonej ikony).
            var _visCountriesGeo = function(fn){
                if (typeof CAPITAL_COORDS === 'undefined') return [];
                var out = [];
                uniqueVisited.forEach(function(code){
                    var c = CAPITAL_COORDS[code];
                    if (!c) return;
                    try { if (fn({ code: code, name: _cName(code), lat: c[0], lon: c[1] })) out.push(_cName(code)); } catch (e) {}
                });
                return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
            };
            // Cwiartki globu (GEOGRAFIA EKSTREMALNA) - uniwersum jest stale (zawsze 4), wiec done+missing
            // dziala tu tak samo bezpiecznie jak _regionProg dla malych list.
            var _quadNames = { NE: "Północno-wschodnia (NE)", NW: "Północno-zachodnia (NW)", SE: "Południowo-wschodnia (SE)", SW: "Południowo-zachodnia (SW)" };
            var _quadState = { NE: quadNE, NW: quadNW, SE: quadSE, SW: quadSW };
            var _quadProg = function(min){
                var done = [], missing = [];
                Object.keys(_quadState).forEach(function(k){ (_quadState[k] ? done : missing).push(_quadNames[k]); });
                return { have: done.length, need: min, done: done, missing: missing };
            };
            // Liczone RAZ i podstawiane nizej jako citiesStats. Wczesniej szlo inline
            // (citiesStats: _computeCityStats()), ale helper _cliCities musi widziec ten sam wynik,
            // a drugie wywolanie oznaczaloby drugie pelne przejscie po ~6000 miast.
            var _cityStats = _computeCityStats();
            var _ctx = {
                _visaProg: _visaProg, _costProg: _costProg, _riskProg: _riskProg,
                _visCountriesIntel: _visCountriesIntel, _visCountriesCost: _visCountriesCost,
                _visCountriesSafety: _visCountriesSafety, _quadProg: _quadProg,
                _visCountriesGeo: _visCountriesGeo,
                maxDistCountry: maxDistId ? _cName(maxDistId) : null,
                regionDone: regionDone, continentsTouched: continentsTouched, totalCountries: totalCountries, visitedSet: visitedSet,
                regionCounts: regionCounts, regionTotals: regionTotals,
                _missingInRegion: _missingInRegion, _visitedInRegion: _visitedInRegion,
                _untouchedContinents: _untouchedContinents, _touchedContinents: _touchedContinents,
                _regionProg: _regionProg, _wonderProg: _wonderProg,
                // KLIMAT: nazwy odwiedzonych miast spelniajacych warunek. fn dostaje wpis
                // z citiesStats.cliCityList ({name, cc, hi, lo, amp, ann, wet, annPrec}).
                // Uzywane przez prog() kategorii KLIMAT do zbudowania listy `done` - agregaty
                // (cliColdest itd.) mowia ILE, to mowi KTORE. Sortowane A-Z, jak reszta list w panelu.
                // CIEKAWOSTKI: nazwy odwiedzonych PANSTW spelniajacych warunek. fn dostaje
                // { code, name, pop, area, dens, langs, caps } - wszystko wprost z FACTBOOK,
                // wiec po odswiezeniu bazy listy same sie zaktualizuja.
                // EXCLUDED_CODES odsiane, bo ta kategoria mowi o panstwach, nie terytoriach.
                _visCountries: function(fn){
                    if (typeof FACTBOOK === 'undefined') return [];
                    var ex = (typeof EXCLUDED_CODES !== 'undefined') ? EXCLUDED_CODES : [];
                    var out = [];
                    Object.keys(visitedSet).forEach(function(code){
                        if (ex.indexOf(code) >= 0) return;
                        var f = FACTBOOK[code];
                        if (!f) return;
                        var pop = +f.population || 0, area = +f.area || 0;
                        var rec = {
                            code: code,
                            name: (f.name && f.name.common) ? f.name.common : code,
                            pop: pop, area: area,
                            dens: area > 0 ? (pop / area) : 0,
                            langs: f.languages ? Object.keys(f.languages).length : 0,
                            caps: (f.capital && f.capital.length) ? f.capital.length : 0
                        };
                        try { if (fn(rec)) out.push(rec.name); } catch (e) {}
                    });
                    return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
                },
                // MIASTA: nazwy odwiedzonych miast spelniajacych warunek. fn dostaje wpis z
                // citiesStats.cityList ({name, cc, pop, cap}). Nazwa doklejana krajem, bo miasta
                // powtarzaja sie miedzy krajami ("Sajgon" i dziesiatki "San Jose").
                _visCities: function(fn){
                    var L = (_cityStats && _cityStats.cityList) ? _cityStats.cityList : [];
                    var out = [];
                    L.forEach(function(c){
                        try { if (fn(c)) out.push(c.name + " (" + c.cc + ")"); } catch (e) {}
                    });
                    return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
                },
                // MIASTA: kraje, w ktorych masz min. `min` odwiedzonych miast. Zwraca nazwy z FACTBOOK
                // z licznikiem, np. "Polska (34)" - sam kod kraju nic by nie mowil w rozpisce.
                _visCityCountries: function(min){
                    var P = (_cityStats && _cityStats.perCountry) ? _cityStats.perCountry : {};
                    var out = [];
                    Object.keys(P).forEach(function(cc){
                        if (P[cc] < (min || 1)) return;
                        var nm = (typeof FACTBOOK !== 'undefined' && FACTBOOK[cc] && FACTBOOK[cc].name)
                                 ? FACTBOOK[cc].name.common : cc;
                        out.push(nm + " (" + P[cc] + ")");
                    });
                    return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
                },
                // MIASTA: gotowy prog() dla osi "min. N miast w POJEDYNCZYM kraju" (maxInOneCountry).
                // BLAD, KTORY TO NAPRAWIA (2026-07-19): te kafelki wolaly _visCityCountries(1), czyli
                // wypisywaly KAZDY kraj z choc jednym miastem i malowaly go na ZIELONO - "Albania (1) ✔"
                // przy progu 25. Zielone musi znaczyc "ten kraj spelnia warunek", a warunek dotyczy
                // JEDNEGO kraju z >= N miastami, nie sumy krajow. Dlatego:
                //   done    = kraje, ktore SAME przekraczaja prog (przy 25 to samo "Polska (36)"),
                //   missing = najblizsi kandydaci ponizej progu (top 6 wg licznika, malejaco) - czerwone
                //             sa "do wyboru", dokladnie jak przy progach kontynentow, i dzieki nim
                //             kafelek zostaje klikalny takze wtedy, gdy zadem kraj jeszcze nie doszedl.
                // have zostaje = maxInOneCountry (rekordzista), bo to jego pasek opisuje.
                _cityCountryProg: function(need){
                    var P = (_cityStats && _cityStats.perCountry) ? _cityStats.perCountry : {};
                    var nameOf = function(cc){
                        return ((typeof FACTBOOK !== 'undefined' && FACTBOOK[cc] && FACTBOOK[cc].name)
                                ? FACTBOOK[cc].name.common : cc) + " (" + P[cc] + ")";
                    };
                    var done = [], below = [];
                    Object.keys(P).forEach(function(cc){ (P[cc] >= need ? done : below).push(cc); });
                    done.sort(function(a, b){ return nameOf(a).localeCompare(nameOf(b), "pl"); });
                    below.sort(function(a, b){ return P[b] - P[a]; });
                    return {
                        have: (_cityStats && _cityStats.maxInOneCountry) ? _cityStats.maxInOneCountry : 0,
                        need: need,
                        done: done.map(nameOf),
                        missing: below.slice(0, 6).map(nameOf)
                    };
                },
                _cliCities: function(fn){
                    var L = (_cityStats && _cityStats.cliCityList) ? _cityStats.cliCityList : [];
                    var out = [];
                    L.forEach(function(c){ try { if (fn(c)) out.push(c.name); } catch (e) {} });
                    return out.sort(function(a, b){ return a.localeCompare(b, "pl"); });
                },
                hasSouth: hasSouth, hasArctic: hasArctic, hasDeepSouth: hasDeepSouth, hasEast: hasEast, hasWest: hasWest,
                hasTropical: hasTropical, hasNearEquator: hasNearEquator,
                quadrants: (quadNE?1:0) + (quadNW?1:0) + (quadSE?1:0) + (quadSW?1:0), maxDistKm: maxDistKm,
                score: score, wondersCount: visitedWonders.length, wondersTotal: wondersTotal, wonderSet: wonderSet,
                flightsTotal: flightsTotal, flightsAirports: flightsAirports, flightsRoutes: flightsRoutes, flightsKm: flightsKm,
                longestLegKm: longestLegKm, shortestLegKm: shortestLegKm, repeatFlights: repeatFlights,
                flightsAvgKm: flightsAvgKm, flightsMinutes: flightsMinutes, flightsHours: Math.floor(flightsMinutes / 60),
                flightsCountriesAir: flightsCountriesAir, flightsAirlines: flightsAirlines, flightsAircraft: flightsAircraft,
                topAirlineFlights: topAirlineFlights, topAircraftFlights: topAircraftFlights,
                flightsYearsActive: flightsYearsActive, bestYearFlights: bestYearFlights,
                longestLegMin: longestLegMin, flightsSeniority: flightsSeniority,
                maxPerDay: maxPerDay, maxPerMonth: maxPerMonth, monthsCovered: monthsCovered,
                weekdaysCovered: weekdaysCovered, seasonsCovered: seasonsCovered,
                hasNewYearFlight: fs ? !!fs.hasNewYearFlight : false,
                hasChristmasFlight: fs ? !!fs.hasChristmasFlight : false,
                hasSameDayReturn: fs ? !!fs.hasSameDayReturn : false,
                apMaxLat: fs ? (fs.apMaxLat || 0) : 0, apMinLat: fs ? (fs.apMinLat || 0) : 0,
                apMaxLon: fs ? (fs.apMaxLon || 0) : 0, apMinLon: fs ? (fs.apMinLon || 0) : 0,
                apLatSpan: fs ? (fs.apLatSpan || 0) : 0, apLonSpan: fs ? (fs.apLonSpan || 0) : 0,
                apMinPairKm: fs ? (fs.apMinPairKm || 0) : 0, apMaxPairKm: fs ? (fs.apMaxPairKm || 0) : 0,
                visaRequiredCount: visaRequiredCount, visaFreeCount: visaFreeCount, eVisaCount: eVisaCount, etaCount: etaCount,
                onArrivalCount: onArrivalCount, visaTypesCount: Object.keys(visaTypesSet).length,
                hasCheap: hasCheap, hasExpensive: hasExpensive, cheapCount: cheapCount, expensiveCount: expensiveCount,
                hasRisky: hasRisky, hasMaxRisk: hasMaxRisk, riskyCount: riskyCount, safeCount: safeCount,
                hasMegaPop: hasMegaPop, hasMicroPop: hasMicroPop, hasSuperPop: hasSuperPop, hasNanoPop: hasNanoPop,
                hasHugeArea: hasHugeArea, hasTinyArea: hasTinyArea, hasMegaArea: hasMegaArea, hasMicroArea: hasMicroArea,
                hasMultilingual: hasMultilingual, hasLowDensity: hasLowDensity, hasHighDensity: hasHighDensity,
                popSum: popSum, areaSum: areaSum, popWorld: popWorld, areaWorld: areaWorld,
                popPct: popWorld > 0 ? (popSum / popWorld * 100) : 0,
                areaPct: areaWorld > 0 ? (areaSum / areaWorld * 100) : 0,
                hasGigaPop: hasGigaPop, hasUltraLowDensity: hasUltraLowDensity, hasUltraHighDensity: hasUltraHighDensity,
                hasMultiCapital: hasMultiCapital, hasTripleCapital: hasTripleCapital,
                currencyCount: Object.keys(currencySet).length, languageCount: Object.keys(languageSet).length,
                religionCount: Object.keys(religionSet).length, iddCount: Object.keys(iddSet).length,
                // Te same zbiory WYPISANE (posortowane A-Z) - zrodlo list `done` dla licznikow
                // roznorodnosci w CIEKAWOSTKACH. Klucze sa juz czytelne: languageSet i religionSet
                // trzymaja NAZWY, currencySet kody walut (PLN), iddSet prefiksy telefoniczne (+48).
                // Bez tego kafelki "min. 10 jezykow urzedowych" byly nieklikalne - licznik mowil ILE,
                // ale nie dalo sie sprawdzic, KTORE jezyki sie na to zlozyly.
                _currencyList: Object.keys(currencySet).sort(),
                _languageList: Object.keys(languageSet).sort(function(a,b){ return a.localeCompare(b,"pl"); }),
                _religionList: Object.keys(religionSet).sort(function(a,b){ return a.localeCompare(b,"pl"); }),
                _iddList: Object.keys(iddSet).sort(),
                adapterCount: adapterCount, noAdapterCount: noAdapterCount, tapSafeCount: tapSafeCount, bottledOnlyCount: bottledOnlyCount,
                hasMandatoryTip: hasMandatoryTip, hasNoTipCulture: hasNoTipCulture, voltageCount: Object.keys(voltageSet).length,
                // Napiecia WYPISANE (np. "230V") - done dla LOGISTYKA "min. N roznych napiec", tym samym
                // wzorcem co _currencyList/_iddList wyzej.
                _voltageList: Object.keys(voltageSet).sort(function(a, b){ return (+a) - (+b); }).map(function(v){ return v + "V"; }),
                // LINIE I MASZYNY: pelne listy nazw (nie tylko top3 jak w panelu Flights) - done dla
                // "leć min. N roznymi liniami/typami". Faworyt (topAirlineFlights/topAircraftFlights) to
                // pojedynczy warunek "jedna linia/typ >= N lotow", wiec done to JEDNA nazwa (ta z najwiekszym
                // n), analogicznie do "SASIEDZKIE STOLICE" z missing:[].
                flightsAirlineList: fs ? (fs.airlineNames || []) : [],
                flightsAircraftList: fs ? (fs.aircraftNames || []) : [],
                topAirlineName: (fs && fs.topAirlines && fs.topAirlines[0]) ? fs.topAirlines[0].name : null,
                topAircraftName: (fs && fs.topAircraft && fs.topAircraft[0]) ? fs.topAircraft[0].name : null,
                // MIASTA: nazwy kontynentow dotknietych przez ODWIEDZONE MIASTA (nie kraje) - done/missing
                // dla "miasta na N kontynentach". Zrodlo: citiesStats.continentIds (klucze REGION_MAP).
                _visCityContinents: function(want){
                    var ids = (_cityStats && _cityStats.continentIds) ? _cityStats.continentIds : [];
                    var idSet = {}; ids.forEach(function(i){ idSet[i] = true; });
                    return (typeof CONTINENT_DATA !== 'undefined' ? CONTINENT_DATA : [])
                        .filter(function(c){ return !!idSet[c.id] === want; })
                        .map(function(c){ return c.name; })
                        .sort(function(a, b){ return a.localeCompare(b); });
                },
                citiesStats: _cityStats
            };
            window._achCtxCache = _ctx;
            return _ctx;
        };
        // --- Statystyki odwiedzonych miast (VISITED_CITIES + CITIES_DB) dla kategorii "MIASTA" w osiagnieciach.
        // Iteruje CITIES_DB (wszystkie kraje/miasta), nie VISITED_CITIES, zeby przy okazji policzyc
        // pokrycie per-kraj i wykryc stolice - tanie nawet dla ~6000 miast (jednorazowe przejscie). ---
        function _computeCityStats(){
            var vSet = window._visitedCitySet ? window._visitedCitySet() : {};
            var totalVisited = 0, capitalsVisited = 0, hasNonCapital = false;
            var cityList = [];   // komplet odwiedzonych miast - patrz push nizej
            var hasMega1M = false, hasMega5M = false, hasMega10M = false, hasTiny = false;
            var countriesWithVisit = {}, continentsTouched = {}, perCountryCount = {};
            var fullCoverageCountries = 0;
            // --- KLIMAT (2026-07-17): doklejony do TEGO przejscia CITIES_DB, zeby nie robic drugiego
            // pelnego przebiegu po ~6000 miast. Klucz CLIMATE_DB = round(lat*4)/4 + "," + round(lon*4)/4
            // (siatka 0.25°, dokladnie jak window._climateCache w updateCityClimate - nie wymyslaj wlasnego).
            // climate-data.js jest 'defer', wiec przy braku CLIMATE_DB cala kategoria stoi na zerze - tak ma byc.
            var cliN = 0, cliHottest = -999, cliColdest = 999, cliMaxAnnT = -999, cliMinAnnT = 999;
            var cliMinAmp = 999, cliMaxAmp = 0, cliWettest = 0, cliMaxAnnPrec = 0, cliMinAnnPrec = 1e9;
            var cliList = [];   // komplet odwiedzonych miast z klimatem - patrz push nizej
            var _cliKey = function(lat, lon){ return (Math.round(lat * 4) / 4) + "," + (Math.round(lon * 4) / 4); };
            if (typeof CITIES_DB !== "undefined") {
                for (var cc in CITIES_DB) {
                    var list = CITIES_DB[cc];
                    if (!list || !list.length) continue;
                    var capIdx = window._findCapitalIndex(cc, list);
                    var visitedInCountry = 0;
                    for (var j = 0; j < list.length; j++) {
                        var ci = list[j];
                        if (!vSet[window._cityId(cc, ci[0])]) continue;
                        totalVisited++;
                        visitedInCountry++;
                        countriesWithVisit[cc] = true;
                        var pop = +ci[7] || 0;
                        if (pop > 1000000) hasMega1M = true;
                        if (pop > 5000000) hasMega5M = true;
                        if (pop > 10000000) hasMega10M = true;
                        if (pop > 0 && pop < 10000) hasTiny = true;
                        if (j === capIdx) capitalsVisited++; else hasNonCapital = true;
                        // KOMPLET ODWIEDZONYCH MIAST (nazwa, kraj, populacja, czy stolica).
                        // Agregaty ponizej (visitedCount, capitalsVisited, hasMega10M...) mowia ILE,
                        // ta lista mowi KTORE - zrodlo list `done` dla kategorii MIASTA w prog().
                        cityList.push({ name: ci[0], cc: cc, pop: pop, cap: (j === capIdx) });
                        var region = (typeof REGION_MAP !== "undefined") ? REGION_MAP[cc] : null;
                        if (region) continentsTouched[region] = true;
                        if (typeof CLIMATE_DB !== "undefined") {
                            var cl = CLIMATE_DB[_cliKey(ci[1], ci[2])];
                            if (cl && cl.temp && cl.temp.length === 12) {
                                cliN++;
                                var hi = Math.max.apply(null, cl.temp), lo = Math.min.apply(null, cl.temp);
                                if (hi > cliHottest) cliHottest = hi;
                                if (lo < cliColdest) cliColdest = lo;
                                if (typeof cl.annT === "number") {
                                    if (cl.annT > cliMaxAnnT) cliMaxAnnT = cl.annT;
                                    if (cl.annT < cliMinAnnT) cliMinAnnT = cl.annT;
                                }
                                var amp = hi - lo;
                                if (amp < cliMinAmp) cliMinAmp = amp;
                                if (amp > cliMaxAmp) cliMaxAmp = amp;
                                var wet = null, annP = null;
                                if (cl.precip && cl.precip.length === 12) {
                                    wet = Math.max.apply(null, cl.precip);
                                    annP = cl.precip.reduce(function(a, b){ return a + b; }, 0);
                                    if (wet > cliWettest) cliWettest = wet;
                                    if (annP > cliMaxAnnPrec) cliMaxAnnPrec = annP;
                                    if (annP < cliMinAnnPrec) cliMinAnnPrec = annP;
                                }
                                // TABLICA MIAST Z KLIMATEM (dla prog() w katalogu - patrz cliCityList
                                // w db-schema.md). Same agregaty (cliColdest itd.) mowia TYLKO ile,
                                // nigdy KTORE - a panel rozpiski potrzebuje nazw. Trzymamy komplet
                                // metryk per miasto, zeby kazdy prog() mogl sobie odfiltrowac swoj prog
                                // bez dokladania kolejnego pola do ctx przy kazdej nowej odznace.
                                cliList.push({
                                    name: ci[0], cc: cc,
                                    hi: hi, lo: lo, amp: amp,
                                    ann: (typeof cl.annT === "number") ? cl.annT : null,
                                    wet: wet, annPrec: annP
                                });
                            }
                        }
                    }
                    if (visitedInCountry > 0) {
                        perCountryCount[cc] = visitedInCountry;
                        if (list.length >= 3 && visitedInCountry >= list.length) fullCoverageCountries++;
                    }
                }
            }
            var maxInOneCountry = 0;
            Object.keys(perCountryCount).forEach(function(cc){ if (perCountryCount[cc] > maxInOneCountry) maxInOneCountry = perCountryCount[cc]; });
            return {
                visitedCount: totalVisited, countriesTouched: Object.keys(countriesWithVisit).length,
                fullCoverageCountries: fullCoverageCountries, capitalsVisited: capitalsVisited, hasNonCapital: hasNonCapital,
                hasMega1M: hasMega1M, hasMega5M: hasMega5M, hasMega10M: hasMega10M, hasTiny: hasTiny,
                continentsTouched: Object.keys(continentsTouched).length, continentIds: Object.keys(continentsTouched), maxInOneCountry: maxInOneCountry,
                // KLIMAT - zera, gdy zadne odwiedzone miasto nie trafilo w CLIMATE_DB (albo defer jeszcze
                // nie dojechal). Sentinele (-999/999/1e9) zerujemy TUTAJ, zeby check() w katalogu nie musial
                // ich znac i zeby "min. -20°C" nie zapalalo sie od wartownika 999.
                cliCities: cliN,
                cliHottest: cliN ? cliHottest : 0, cliColdest: cliN ? cliColdest : 0,
                cliMaxAnnT: cliN ? cliMaxAnnT : 0, cliMinAnnT: cliN ? cliMinAnnT : 0,
                cliMinAmp: cliN ? cliMinAmp : 0, cliMaxAmp: cliN ? cliMaxAmp : 0,
                cliWettest: cliN ? cliWettest : 0,
                cliMaxAnnPrec: cliN ? cliMaxAnnPrec : 0, cliMinAnnPrec: cliN ? cliMinAnnPrec : 0,
                cliSpread: cliN ? (cliHottest - cliColdest) : 0,
                // Lista odwiedzonych miast z metrykami klimatu (name, cc, hi, lo, amp, ann, wet, annPrec).
                // Zrodlo list done/missing dla kategorii KLIMAT w prog() - agregaty wyzej mowia ILE,
                // ta tablica mowi KTORE. Pusta, gdy CLIMATE_DB jeszcze nie dojechalo (defer).
                cliCityList: cliList,
                // Zrodla list `done` dla kategorii MIASTA (patrz db-schema.md):
                //   cityList  - {name, cc, pop, cap} dla KAZDEGO odwiedzonego miasta
                //   perCountry- kod kraju -> ile miast w nim odwiedzono (mianownik dla "N miast w kraju")
                cityList: cityList,
                perCountry: perCountryCount
            };
        }
        // Ustawiane przez _passportOpenTier/_passportGoToAch: panel osiagniec otwarty jako "wycinek"
        // paszportu (ktory sam zamknal sie przy otwieraniu). Dzieki temu zamkniecie panelu (X albo
        // klik w tlo) wraca do paszportu zamiast zamykac wszystko - patrz hideAchievementsPanel nizej.
        window._achOpenedFromPassport = false;
        window.hideAchievementsPanel = function(){
            var el = document.getElementById("achievements-overlay");
            if (el) el.style.display = "none";
            if (window._achOpenedFromPassport) {
                window._achOpenedFromPassport = false;
                if (window.showPassportPanel) window.showPassportPanel();
            }
        };
        // Separator tysiecy w licznikach osiagniec (dystanse potrafia miec 6 cyfr: "384 400 / 384 400").
        window._achNum = function(n){ return Number(n).toLocaleString('pl-PL'); };
        window.hideAchievementDetail = function(){
            var el = document.getElementById("ach-detail-overlay");
            if (el) el.style.display = "none";
        };
        // --- ROZPISKA OSIAGNIECIA (klik w kafelek z prog() w panelu osiagniec) ---
        // Okienko w konwencji showContinentCountries: zielone = zaliczone, czerwone = brakujace.
        // Lezy NAD panelem osiagniec (z-index 210 vs 200) i go nie zamyka - Esc/klik w tlo wraca do listy.
        // Pozycje to gotowe nazwy z prog() (kraje albo kontynenty - zaleznie od osiagniecia), wiec bez flag
        // i bez klikania w globus: przy "N kontynentach" pozycja nie jest krajem i nie ma sie gdzie przeniesc.
        window.showAchievementDetail = function(achId){
            var a = window.ACHIEVEMENTS.find(function(x){ return x.id === achId; });
            if (!a || typeof a.prog !== 'function') return;
            var ctx = window.computeAchievementContext();
            var pr;
            try { pr = a.prog(ctx); } catch (e) { return; }
            if (!pr || !(pr.need > 0)) return;
            var el = document.getElementById("ach-detail-overlay");
            if (!el) {
                el = document.createElement("div");
                el.id = "ach-detail-overlay";
                el.style.cssText = "display:none; position:fixed; inset:0; z-index:210; background:rgba(0,0,0,0.8); backdrop-filter:blur(4px); align-items:center; justify-content:center;";
                el.innerHTML =
                    '<div style="background:rgba(8,8,10,0.97); border:1px solid rgba(250,204,21,0.4); border-radius:8px; padding:22px; width:min(820px,92vw); max-height:85vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.6); font-family:\'Rajdhani\',sans-serif;">'
                  +   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">'
                  +     '<h1 id="ach-detail-title" style="margin:0; border:none; padding:0; font-size:1.3rem;"></h1>'
                  +     '<span id="ach-detail-close" style="cursor:pointer; font-size:1.5rem; color:#8f9ba8; line-height:1;">✕</span>'
                  +   '</div>'
                  +   '<div id="ach-detail-desc" style="font-family:\'JetBrains Mono\',monospace; font-size:0.7rem; color:#8f9ba8; margin-bottom:8px;"></div>'
                  +   '<div id="ach-detail-progress" style="font-family:\'JetBrains Mono\',monospace; font-size:0.85rem; letter-spacing:0.5px; color:#facc15; margin-bottom:14px;"></div>'
                  +   '<div id="ach-detail-body" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:7px;"></div>'
                  + '</div>';
                document.body.appendChild(el);
                el.addEventListener("click", function(e){ if (e.target === el) window.hideAchievementDetail(); });
                document.getElementById("ach-detail-close").onclick = window.hideAchievementDetail;
            }
            var done = pr.done || [], miss = pr.missing || [];
            var pct = Math.min(100, Math.round((pr.have / pr.need) * 100));
            var left = Math.max(0, pr.need - pr.have);
            // "Brakuje" to need-have, a NIE dlugosc listy czerwonych: przy progu "3 kontynenty" brakuje
            // jednego, a czerwonych kandydatow jest czterech. Gdy te liczby sie rozjezdzaja, mowimy wprost,
            // ze czerwone sa do wyboru - inaczej licznik klamie (bug zgloszony przy "BRAKUJE (4)" dla 2/3).
            var leftTxt = left === 0
                ? " — ZDOBYTE"
                : (miss.length > left ? " — BRAKUJE " + window._achNum(left) + " (czerwone = do wyboru)" : " — BRAKUJE " + window._achNum(left));
            document.getElementById("ach-detail-title").innerText = a.icon + "  " + a.name;
            document.getElementById("ach-detail-desc").innerText = a.desc;
            document.getElementById("ach-detail-progress").innerText = window._achNum(Math.min(pr.have, pr.need)) + " / " + window._achNum(pr.need) + " (" + pct + "%)" + leftTxt;
            var cell = function(txt, on){
                var col = on ? "#86efac" : "#ff4d4d";
                return '<div style="display:flex; gap:10px; align-items:center; padding:8px 10px; border:1px solid rgba(255,255,255,0.08); border-left:3px solid ' + col + '; border-radius:3px; background:rgba(255,255,255,0.04);">'
                  +   '<span style="font-size:0.95rem; font-weight:600; letter-spacing:0.4px; color:' + col + '; line-height:1.25;">' + txt + '</span>'
                  +   '<span style="margin-left:auto; font-size:0.9rem; font-weight:700; color:' + col + ';">' + (on ? '✔' : '✕') + '</span>'
                  + '</div>';
            };
            document.getElementById("ach-detail-body").innerHTML =
                done.map(function(t){ return cell(t, true); }).join('') + miss.map(function(t){ return cell(t, false); }).join('');
            el.style.display = "flex";
        };
        // --- Sprawdza kazde osiagniecie na zywo; te nowo odblokowane (ktorych nie ma jeszcze w
        // UNLOCKED_ACHIEVEMENTS z achievements-data.js) zapisuje trwale przez admin.php, zeby
        // przetrwaly pozniejsze zmiany danych referencyjnych (np. VISA_PL po odswiezeniu). ---
        window._persistedAchIds = window._persistedAchIds || null;
        function _persistedAchSet(){
            if (window._persistedAchIds) return window._persistedAchIds;
            var known = (typeof UNLOCKED_ACHIEVEMENTS !== "undefined") ? UNLOCKED_ACHIEVEMENTS : [];
            var set = {};
            known.forEach(function(id){ set[id] = true; });
            window._persistedAchIds = set;
            return set;
        }
        // --- Aktualizuje pasek "ACHIEVEMENTS x/528" w Operative Status (odblokowane = live-check LUB juz zapisane) ---
        window.updateAchievementProgressBadge = function(ctx){
            if (!window.ACHIEVEMENTS || !window.computeAchievementContext) return;
            ctx = ctx || window.computeAchievementContext();
            var persisted = _persistedAchSet();
            var unlocked = 0;
            window.ACHIEVEMENTS.forEach(function(a){
                if (!!a.check(ctx) || !!persisted[a.id]) unlocked++;
            });
            var fill = document.getElementById("ach-fill");
            var txt = document.getElementById("ach-text-val");
            if (fill) fill.style.width = (unlocked / window.ACHIEVEMENTS.length * 100) + "%";
            if (txt) txt.innerText = unlocked + " / " + window.ACHIEVEMENTS.length;
        };
        // Zwraca policzony ctx (computeAchievementContext()), zeby wolajacy mogl go ponownie uzyc
        // (np. showAchievementsPanel) zamiast liczyc od nowa - patrz komentarz przy _computeCityStats
        // (pelne przejscie CITIES_DB) + 528 wywolan a.check() PONIZEJ, ktore inaczej powtarzaly
        // sie 2-3x przy kazdym otwarciu panelu / odswiezeniu UI.
        window.checkAndPersistAchievements = function(){
            if (!window.ACHIEVEMENTS || !window.computeAchievementContext) return null;
            var ctx = window.computeAchievementContext();
            var set = _persistedAchSet();
            // Zbieramy WSZYSTKIE nowe ID i wysylamy JEDNYM requestem - osobny fetch() na kazde
            // z osobna powodowal wyscig zapisu w admin.php (rownolegle read-modify-write nadpisywaly
            // sie nawzajem, przezywalo losowo 1-2 z wielu).
            var newIds = [];
            window.ACHIEVEMENTS.forEach(function(a){
                if (set[a.id]) return;
                var live = false;
                try { live = !!a.check(ctx); } catch (e) { live = false; }
                if (!live) return;
                set[a.id] = true; // nie wysylaj drugi raz w tej samej sesji
                newIds.push(a.id);
            });
            window.updateAchievementProgressBadge(ctx);
            // SPLASH ZA ODZNAKI LOTNICZE Z IMPORTU FR24. Osobna sciezka niz "na zywo" ponizej, bo loty NIE
            // maja klikalnego zdarzenia na stronie - zmienia je wylacznie import CSV w admin.php, wiec nigdy
            // nie trafiaja na sciezke mark*/refreshVisitedUI i straznik _achSplashArmed ZAWSZE zjadalby ich
            // splash (patrz db-schema.md, sekcja SPLASH). Diff liczony wzgledem localStorage TEJ przegladarki,
            // wiec: dziala tez tam, gdzie zapis admin.php pada (GitHub Pages), i sam sie ogranicza (pierwszy
            // kontakt zasiewa po cichu). `set` jest tu juz pelnym aktualnym zestawem zdobytych ID (persisted +
            // swiezo policzone wyzej), wiec przekazujemy go wprost - bez drugiego przejscia po katalogu.
            if (window._flightAchSplashCheck) window._flightAchSplashCheck(set);
            // SPLASH TYLKO ZA ZDOBYCIE NA ZYWO (klik "ODWIEDZONE" -> mark* -> refreshVisitedUI -> tutaj).
            // Pierwszy przebieg po wczytaniu strony leci CICHO i tylko uzbraja mechanizm, bo "nowe" liczy sie
            // wzgledem achievements-data.js: gdy ten plik jest pusty albo zostal w tyle za katalogiem, na
            // starcie wpada nawet ~100 pozycji naraz i splash zablokowalby strone na kilkadziesiat klikniec.
            // Dodatkowo na GitHub Pages nie ma admin.php, wiec zapis cicho pada i BEZ tego straznika ta sama
            // lawina wracalaby przy KAZDEJ wizycie.
            //
            // !!! UZBRAJAMY BEZWARUNKOWO I PRZED WYJSCIEM PRZY PUSTYM newIds (naprawione 2026-07-19).
            // Wczesniej ustawienie flagi siedzialo ZA `if (newIds.length === 0) return ctx`, wiec przy
            // ZSYNCHRONIZOWANYM achievements-data.js (czyli w stanie NORMALNYM - pierwszy przebieg nie
            // znajduje wtedy nic nowego) mechanizm nie uzbrajal sie wcale. Straznik czekal na PIERWSZE
            // realne zdobycie usera, zjadal je jako "przebieg uzbrajajacy", a splash pokazywal sie dopiero
            // za drugim razem. Zgloszone jako "nie wyskakuja splashe po cudach" - w rzeczywistosci
            // dotyczylo KAZDEJ sciezki (kraje, miasta, cuda), bo straznik jest dla nich wspolny.
            var _wasArmed = window._achSplashArmed;
            window._achSplashArmed = true;
            if (newIds.length === 0) return ctx;   // nic nowego - nie ma czego pokazywac ani zapisywac
            if (_wasArmed && window.showAchievementSplash) window.showAchievementSplash(newIds);
            fetch("admin.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "unlock_achievement_ids=" + encodeURIComponent(newIds.join(","))
            }).catch(function(){});
            return ctx;
        };
        // --- SPLASH "NOWA ODZNAKA" / "AWANS" (pelnoekranowy, klik zamyka) ---
        // Kolejka, bo jeden klik "ODWIEDZONE" potrafi odpalic kilka rzeczy naraz (nowy kraj = prog krajow +
        // kontynent + region, a czasem jeszcze awans rangi): pokazujemy je po jednej, z licznikiem "jeszcze N",
        // zamiast nakladac kilka okien na siebie. Lezy NAD wszystkim (z-index 220 vs 210 panelu osiagniec).
        // W kolejce siedza GOTOWE payloady {kicker, icon, name, cat, desc, accent} - dzieki temu ten sam
        // mechanizm obsluguje odznaki (showAchievementSplash) i rangi (showRankSplash), a awans i odznaki
        // z tego samego klikniecia ustawiaja sie w JEDNA kolejke zamiast walczyc o overlay.
        // Akcent (ramka, poswiata, kicker, nazwa) rozroznia oba typy okien, bo w kolejce potrafia isc jedno
        // po drugim: odznaki zolte - spojnie z panelem osiagniec, awans rangi cyjanowy - jak "MISSION
        // COMPLETED". Kazdy payload niesie swoj accent, domyslnie zolty.
        var _SPLASH_ACCENT_ACH  = { hex: "#facc15", rgb: "250,204,21" };
        var _SPLASH_ACCENT_RANK = { hex: "#00ccff", rgb: "0,204,255" };
        window._achSplashQueue = [];
        window.hideAchievementSplash = function(){
            var el = document.getElementById("ach-splash-overlay");
            if (el) el.style.display = "none";
            window._achSplashQueue = [];
            window._achSplashOpen = false;
        };
        // Licznik "jeszcze N" w otwartym oknie. Osobna funkcja, bo kolejka ROSNIE JUZ PO wyrenderowaniu
        // pierwszego okna: awans rangi leci ze srodka refreshVisitedUI, a odznaki z tego samego klikniecia
        // dokladaja sie dopiero z checkAndPersistAchievements na jej koncu. Bez odswiezenia okno awansu
        // klamalo "KLIKNIJ, ZEBY ZAMKNAC", majac za soba 4 odznaki.
        window._achSplashMore = function(){
            var m = document.getElementById("ach-splash-more");
            if (!m) return;
            var left = window._achSplashQueue.length;
            m.innerText = left ? "KLIKNIJ, ŻEBY ZOBACZYĆ KOLEJNĄ (jeszcze " + left + ")" : "KLIKNIJ, ŻEBY ZAMKNĄĆ";
        };
        window._achSplashPush = function(payloads){
            if (!payloads || !payloads.length) return;
            payloads.forEach(function(p){ window._achSplashQueue.push(p); });
            if (!window._achSplashOpen) window._achSplashNext();
            else window._achSplashMore();
        };
        window.showAchievementSplash = function(ids){
            if (!ids || !ids.length) return;
            var out = [];
            // ctx do wyliczenia poziomu odznaki. computeAchievementContext jest memoizowane
            // (window._achCtxCache), wiec to nie jest drugie pelne przejscie po CITIES_DB.
            var ctx = window.computeAchievementContext ? window.computeAchievementContext() : null;
            ids.forEach(function(id){
                var a = window.ACHIEVEMENTS.find(function(x){ return x.id === id; });
                if (!a) return;   // katalog sie zmienil - pomijamy cicho, nie wieszamy kolejki
                var t = (ctx && window._achTierOf) ? window._achTierOf(a, ctx) : null;
                // AKCENT Z POZIOMU ODZNAKI: splash swieci tym samym kolorem, co kafelek w panelu.
                // Bierzemy markRgb || rgb, bo rgb bywa CIEMNE (diament to gleboki fiolet) - jako kolor
                // napisu i ramki na czarnym tle byloby nieczytelne, a markRgb jest wlasnie jasnym
                // wariantem rodziny. Brak poziomu (np. brak pliku danych) -> stary zolty akcent.
                var acc = t ? { hex: "rgb(" + (t.markRgb || t.rgb) + ")", rgb: (t.markRgb || t.rgb) } : _SPLASH_ACCENT_ACH;
                out.push({ kicker: "★ NOWA ODZNAKA ★", icon: a.icon, name: a.name, cat: a.cat,
                           desc: a.desc, accent: acc, tier: t });
            });
            window._achSplashPush(out);
        };
        // --- SPLASH ZA ODZNAKI LOTNICZE Z IMPORTU FR24 ---
        // Kategorie stojace WYLACZNIE na FLIGHTS_LOG + FLIGHTS_AP (patrz db-schema.md przy ACHIEVEMENTS).
        // CELOWO tylko te: zmieniaja sie wylacznie importem CSV, wiec nie koliduja ze splashem "na zywo"
        // (klik kraju/miasta). NIE dopisuj tu kategorii ladowych (KRAJE/MIASTA/REGIONY...) - te maja wlasna
        // sciezke i wpadlyby w podwojny splash.
        window._FLIGHT_ACH_CATS = { "LOTY":1, "CZAS W POWIETRZU":1, "LINIE I MASZYNY":1, "RYTM LOTÓW":1, "LOTNISKA":1 };
        // Wolane na koncu checkAndPersistAchievements. Argument = mapa WSZYSTKICH aktualnie zdobytych ID
        // (persisted + swiezo policzone). Porownuje biezacy zestaw odznak lotniczych ze snapshotem z
        // localStorage (ostatnia wizyta TEJ przegladarki) i pokazuje splash za ROZNICE.
        //  - brak/uszkodzony snapshot  -> cichy zasiew (zero splashy), jak "pierwszy przebieg uzbraja";
        //  - roznica <= CAP            -> normalna kolejka splashy (po jednej, z licznikiem "jeszcze N");
        //  - roznica >  CAP            -> jedno okno-podsumowanie (nie robimy pokazu 60 slajdow po duzym
        //                                 imporcie / pierwszej wizycie na nowej przegladarce bez zasiewu).
        // Snapshot zapisujemy ZAWSZE na koncu (tez po zasiewie i po pustej roznicy), wiec kolejne wywolania
        // w tej samej sesji sa idempotentne - splash leci raz.
        window._flightAchSeenKey = "flightAchSeen";
        window._flightAchSplashCheck = function(earnedSet){
            if (!window.ACHIEVEMENTS || !earnedSet) return;
            var cur = [];
            window.ACHIEVEMENTS.forEach(function(a){
                if (a.id && earnedSet[a.id] && window._FLIGHT_ACH_CATS[a.cat]) cur.push(a.id);
            });
            var KEY = window._flightAchSeenKey;
            var save = function(){ try { localStorage.setItem(KEY, JSON.stringify(cur)); } catch (e) {} };
            var prevArr = null;
            try { var raw = localStorage.getItem(KEY); if (raw) prevArr = JSON.parse(raw); } catch (e) { prevArr = null; }
            if (!prevArr || !Array.isArray(prevArr)) { save(); return; }   // pierwszy kontakt = cichy zasiew
            var prev = {};
            prevArr.forEach(function(id){ prev[id] = true; });
            var diff = cur.filter(function(id){ return !prev[id]; });
            if (!diff.length) { save(); return; }
            var CAP = 20;
            if (diff.length > CAP && window._achSplashPush) {
                var n = window._achNum ? window._achNum(diff.length) : String(diff.length);
                window._achSplashPush([{
                    kicker: "★ NOWE ODZNAKI LOTNICZE ★", icon: "✈️", name: n + " NOWYCH ODZNAK",
                    cat: "IMPORT LOTÓW FR24", desc: "Otwórz panel osiągnięć (🏆), żeby je obejrzeć.",
                    accent: _SPLASH_ACCENT_ACH
                }]);
            } else if (window.showAchievementSplash) {
                window.showAchievementSplash(diff);
            }
            save();
        };
        // Awans rangi. RANKS[].title trzyma emoji na KONCU napisu ("CAPTAIN ⚓" - tak jest we wszystkich
        // 35 rangach), a splash chce ikone osobno: odcinamy koncowe znaki niebedace litera/cyfra.
        // Gdy sie nie uda (ranga bez emoji albo stara przegladarka bez \p{...}), leci 🎖️ i pelny tytul.
        window.showRankSplash = function(idx, score){
            if (typeof RANKS === 'undefined' || !RANKS[idx]) return;
            var title = RANKS[idx].title, icon = "🎖️", name = title;
            try {
                var m = title.match(/^(.+?)\s+([^\p{L}\p{N}\s]+)$/u);
                if (m) { name = m[1]; icon = m[2]; }
            } catch (e) { /* zostaje 🎖️ i pelny tytul */ }
            window._achSplashPush([{
                kicker: "▲ AWANS RANGI ▲", icon: icon, name: name,
                cat: "RANGA " + (idx + 1) + " / " + RANKS.length,
                desc: "Próg: " + RANKS[idx].min + " krajów · masz " + score,
                accent: _SPLASH_ACCENT_RANK
            }]);
        };
        // --- KONFETTI PRZY SPLASHU ---
        // DOM + Web Animations API zamiast <canvas>: okno zyje ~2 s, wiec nie oplaca sie utrzymywac
        // petli rysowania - kazdy skrawek dostaje JEDNA animacje i znika razem z kontenerem.
        // pointer-events:none jest KONIECZNE: klik gdziekolwiek ma isc do overlaya (nastepna pozycja
        // z kolejki albo zamkniecie), a konfetti przykrywa caly ekran i inaczej polykaloby klikniecia.
        // Kolory biora sie z akcentu okna, wiec awans rangi sypie cyjanem, a odznaka zoltem.
        // tier: wpis z ACH_TIER_DEFS - jego pole `conf` steruje gestoscia i czasem salwy, wiec diament
        // swietuje mocniej niz braz. Brak tiera (AWANS RANGI) dostaje mocne ustawienie domyslne:
        // awans jest rzadszy niz pojedyncza odznaka, wiec nie ma powodu, zeby byl skromniejszy.
        window._achConfetti = function(accent, tier){
            var host = document.getElementById("ach-splash-overlay");
            if (!host) return;
            // Szanuj systemowe ograniczenie animacji - wtedy nie sypiemy niczym.
            try { if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; }
            catch (e) { /* stara przegladarka - lecimy dalej */ }
            var old = document.getElementById("ach-confetti");
            if (old && old.parentNode) old.parentNode.removeChild(old);
            var wrap = document.createElement("div");
            wrap.id = "ach-confetti";
            wrap.style.cssText = "position:absolute; inset:0; overflow:hidden; pointer-events:none;";
            host.appendChild(wrap);
            var acc = "rgb(" + ((accent && accent.rgb) || "250,204,21") + ")";
            var cols = [acc, acc, "#ffffff", "#facc15", "#4ade80", "#00ccff"];
            var H = window.innerHeight || 800;
            var cfg = (tier && tier.conf) || { n: 120, ms: 2400 };   // domyslka = awans rangi
            for (var i = 0; i < cfg.n; i++) {
                var p = document.createElement("i");
                var w = 5 + Math.random() * 6, h = 7 + Math.random() * 9;
                p.style.cssText = "position:absolute; top:-8%; left:" + (Math.random() * 100).toFixed(2) + "%;"
                    + " width:" + w.toFixed(1) + "px; height:" + h.toFixed(1) + "px;"
                    + " background:" + cols[i % cols.length] + ";"
                    + " border-radius:" + (Math.random() < 0.3 ? "50%" : "1px") + ";";
                wrap.appendChild(p);
                if (!p.animate) continue;   // brak WAAPI - skrawki po prostu nie lataja
                p.animate([
                    { transform: "translate3d(0,0,0) rotate(0deg)", opacity: 1 },
                    { transform: "translate3d(" + (Math.random() * 170 - 85).toFixed(0) + "px," + (H * 1.2).toFixed(0) + "px,0)"
                                 + " rotate(" + (360 + Math.random() * 720).toFixed(0) + "deg)", opacity: 0.85 }
                ], {
                    duration: cfg.ms + Math.random() * cfg.ms * 0.5,
                    delay: Math.random() * 260,
                    easing: "cubic-bezier(0.25,0.6,0.35,1)",
                    fill: "forwards"
                });
            }
            // Sprzatanie po NAJDLUZSZYM mozliwym przypadku: ms * 1.5 (gorna granica losowania)
            // + 260 ms maksymalnego opoznienia + zapas. Musi skalowac sie razem z cfg.ms, inaczej
            // przy diamencie (2900 ms) kontener znikalby w polowie lotu skrawkow.
            // Bez sprzatania kolejne okna z kolejki dokladalyby setki martwych wezlow.
            window.setTimeout(function(){ if (wrap.parentNode) wrap.parentNode.removeChild(wrap); },
                              cfg.ms * 1.5 + 260 + 400);
        };
        window._achSplashNext = function(){
            var el = document.getElementById("ach-splash-overlay");
            if (!window._achSplashQueue.length) {
                window._achSplashOpen = false;
                if (el) el.style.display = "none";
                return;
            }
            var a = window._achSplashQueue.shift();
            if (!el) {
                el = document.createElement("div");
                el.id = "ach-splash-overlay";
                el.style.cssText = "display:none; position:fixed; inset:0; z-index:220; background:rgba(0,0,0,0.82); backdrop-filter:blur(5px); align-items:center; justify-content:center; cursor:pointer;";
                el.innerHTML =
                    '<div id="ach-splash-box" style="background:rgba(8,8,10,0.97); border:1px solid rgba(250,204,21,0.55); border-radius:10px; padding:34px 40px; width:min(520px,92vw); text-align:center; box-shadow:0 0 60px rgba(250,204,21,0.18), 0 8px 40px rgba(0,0,0,0.7); font-family:\'Rajdhani\',sans-serif;">'
                  +   '<div id="ach-splash-kicker" style="font-family:\'JetBrains Mono\',monospace; font-size:0.72rem; letter-spacing:3px; color:#facc15; margin-bottom:16px;"></div>'
                  +   '<div id="ach-splash-icon" style="font-size:4.2rem; line-height:1; margin-bottom:12px;"></div>'
                  +   '<div id="ach-splash-name" style="font-size:1.5rem; font-weight:700; letter-spacing:1px; color:#facc15; line-height:1.2;"></div>'
                  +   '<div id="ach-splash-cat" style="font-family:\'JetBrains Mono\',monospace; font-size:0.65rem; letter-spacing:2px; color:#8f9ba8; margin-top:8px;"></div>'
                  +   '<div id="ach-splash-tier" style="display:none; align-items:center; justify-content:center; gap:10px; margin-top:13px; font-family:\'JetBrains Mono\',monospace; font-size:1.2rem; font-weight:700; letter-spacing:2.5px;"></div>'
                  +   '<div id="ach-splash-desc" style="font-family:\'JetBrains Mono\',monospace; font-size:0.72rem; color:#c6cfd9; margin-top:14px; line-height:1.5;"></div>'
                  +   '<div id="ach-splash-more" style="font-family:\'JetBrains Mono\',monospace; font-size:0.62rem; color:#8f9ba8; margin-top:18px;"></div>'
                  + '</div>';
                document.body.appendChild(el);
                el.onclick = function(){ window._achSplashNext(); };   // klik GDZIEKOLWIEK = dalej/zamknij
            }
            var _kick = document.getElementById("ach-splash-kicker");
            var _nm = document.getElementById("ach-splash-name");
            _kick.innerText = a.kicker;
            document.getElementById("ach-splash-icon").innerText = a.icon;
            _nm.innerText = a.name;
            document.getElementById("ach-splash-cat").innerText = a.cat;
            document.getElementById("ach-splash-desc").innerText = a.desc;
            // Overlay jest JEDEN i recyklowany przez cala kolejke, wiec akcent trzeba ustawiac przy KAZDYM
            // oknie (inaczej awans zostawilby cyjan na nastepnej odznace).
            var ac = a.accent || _SPLASH_ACCENT_ACH;
            var box = document.getElementById("ach-splash-box");
            if (box) {
                box.style.borderColor = "rgba(" + ac.rgb + ",0.55)";
                box.style.boxShadow = "0 0 60px rgba(" + ac.rgb + ",0.18), 0 8px 40px rgba(0,0,0,0.7)";
            }
            _kick.style.color = ac.hex;
            _nm.style.color = ac.hex;
            // WIERSZ POZIOMU: ten sam znaczek co na kafelku w panelu + nazwa poziomu. Rysowany tylko
            // dla odznak - awans rangi nie ma poziomu, wiec wiersz sie chowa (a overlay jest jeden
            // i recyklowany, wiec MUSI byc chowany jawnie, inaczej zostalby po poprzednim oknie).
            var _tr = document.getElementById("ach-splash-tier");
            if (_tr) {
                if (a.tier) {
                    // Znaczek skalowany razem z napisem (1.2rem) - przy 15 px wygladal jak literowka
                    // obok dwa razy wiekszego tekstu.
                    // min-width/min-height, bo samo width/height SVG bywa dociskane do wysokosci
                    // line-boxa wiersza (renderowalo sie 22,4 px zamiast 26). min-* tego nie podlega.
                    _tr.innerHTML = '<svg viewBox="0 0 24 24" fill="' + ac.hex + '" style="width:26px; height:26px;'
                                  + ' min-width:26px; min-height:26px; flex:0 0 auto; align-self:center;">'
                                  + a.tier.mark + '</svg><span>POZIOM: ' + a.tier.label + '</span>';
                    _tr.style.color = ac.hex;
                    _tr.style.display = "flex";
                } else {
                    _tr.innerHTML = "";
                    _tr.style.display = "none";
                }
            }
            window._achSplashMore();
            el.style.display = "flex";
            window._achSplashOpen = true;
            if (box && box.animate) box.animate([{ opacity: 0, transform: "scale(0.86)" }, { opacity: 1, transform: "scale(1)" }], { duration: 220, easing: "ease-out" });
            // Konfetti leci przy KAZDEJ pozycji z kolejki (5 odznak pod rzad = 5 salw), bo kazda jest
            // osobnym zdobyciem. Musi byc PO el.style.display="flex" - kontener liczy wymiary z overlaya.
            if (window._achConfetti) window._achConfetti(ac, a.tier);
        };
        // --- POZIOM TRUDNOSCI ODZNAKI (dane: achievements-tiers-data.js) ---
        // Zwraca wpis z ACH_TIER_DEFS albo null. NULL = brak pliku danych -> panel renderuje sie
        // dokladnie jak przed ta zmiana (zaden wywolujacy nie musi znac wartownika).
        // DWA ZRODLA, ALE NIEROWNORZEDNE OD 2026-07-19c (patrz db-schema.md):
        //   - ACH_TIERS_MANUAL jest JEDYNYM zrodlem diamentu i platyny w calym katalogu - kazda
        //     pozycja to osobna, reczna decyzja o realnej trudnosci.
        //   - Percentyl prog().need W OBREBIE PULI (poolOf(a.cat), patrz ACH_TIER_POOL w
        //     achievements-tiers-data.js) rzadzi TYLKO brazem/srebrem/zlotem dla reszty katalogu -
        //     sufit puli (ACH_CAT_CEILING) go tam zatrzymuje, patrz ceilOf nizej.
        // REMISY: indexOf zwraca pozycje PIERWSZEGO wystapienia, wiec odznaki o identycznym progu
        // dostaja ten sam poziom. To zamierzone (rowna trudnosc = rowna ranga), kosztem rownych
        // koszykow - aktualny rozklad kontrolny patrz db-schema.md.
        // pr = juz policzony wynik a.prog(ctx) - podaj go, jesli masz, zeby nie liczyc drugi raz.
        window._achTierOf = (function(){
            var cacheCtx = null, needByCat = null;
            function needOf(a, ctx){
                if (typeof a.prog !== 'function') return null;
                try { var p = a.prog(ctx); return (p && p.need > 0) ? p.need : null; } catch (e) { return null; }
            }
            // Pula percentyla NIE musi pokrywac sie z kategoria widoczna w UI (a.cat zostaje
            // nietkniete - panel/filtr/spis tresci dalej widza oryginalne kategorie). Patrz
            // ACH_TIER_POOL w achievements-tiers-data.js: KRAJE/KONTYNENTY/REGIONY licza to samo
            // (kraje z listy), wiec dzielą wspolna pule - inaczej "27 z 27 UE" (sufit REGIONY)
            // wypadalo na diament, a "45 z 45 Europy" - twardszy NADZBIOR tego samego warunku
            // (kto ma cala Europe, ma automatycznie cala UE) - na zwykla platyne.
            function poolOf(cat){
                return (typeof ACH_TIER_POOL !== 'undefined' && ACH_TIER_POOL[cat]) || cat;
            }
            function build(ctx){
                needByCat = {};
                window.ACHIEVEMENTS.forEach(function(a){
                    // Odznaki z RECZNYM poziomem nie wchodza do rozkladu percentyla - ich prog()
                    // istnieje tylko po to, by miec liste `done` (have = ile spelnia, need = 1),
                    // wiec wrzucone do puli zanizalyby prog pozostalym pozycjom.
                    if (typeof ACH_TIERS_MANUAL !== 'undefined' && ACH_TIERS_MANUAL[a.id]) return;
                    var n = needOf(a, ctx);
                    var pool = poolOf(a.cat);
                    if (n !== null) (needByCat[pool] || (needByCat[pool] = [])).push(n);
                });
                Object.keys(needByCat).forEach(function(c){
                    needByCat[c].sort(function(x, y){ return x - y; });
                });
                cacheCtx = ctx;
            }
            // Sufit puli - patrz ACH_CAT_CEILING (kluczowany nazwa PULI, nie zawsze a.cat). Brak
            // wpisu = pelna skala.
            function ceilOf(pool){
                if (typeof ACH_CAT_CEILING === 'undefined') return ACH_TIER_DEFS.length - 1;
                var c = ACH_CAT_CEILING[pool];
                return (c === undefined) ? ACH_TIER_DEFS.length - 1 : c;
            }
            return function(a, ctx, pr){
                if (typeof ACH_TIER_DEFS === 'undefined') return null;
                if (ctx !== cacheCtx || !needByCat) build(ctx);
                var idx;
                // RECZNY POZIOM JEST OSTATECZNY (2026-07-19c) - NIE przycina go juz sufit puli.
                // Do 2026-07-19b sufit obcinal TAKZE reczne wpisy (zeby tablica nie omijala
                // reguly tylnymi drzwiami), ale to samo cichcem obcinalo WLASNY reczny osad
                // autora (KLIMAT "-5 st." i PIENIADZE "maks. ryzyko" byly recznie diamentem, a
                // sufit kategorii ciagle ciagnal je do platyny/zlota - nikt tego nie widzial).
                // Teraz percentyl moze dac co najwyzej zloto (patrz ceilOf), a diament/platyna
                // pochodza WYLACZNIE stad - jesli reczny wpis wyjdzie za wysoko, poprawia sie
                // WARTOSC w ACH_TIERS_MANUAL, a nie ten sufit.
                var key = (typeof ACH_TIERS_MANUAL !== 'undefined') ? ACH_TIERS_MANUAL[a.id] : null;
                if (key) {
                    idx = -1;
                    for (var i = 0; i < ACH_TIER_DEFS.length; i++) {
                        if (ACH_TIER_DEFS[i].key === key) { idx = i; break; }
                    }
                    if (idx >= 0) return ACH_TIER_DEFS[idx];
                }
                var pool = poolOf(a.cat);
                var top = ceilOf(pool);
                var n = (pr === undefined) ? needOf(a, ctx) : ((pr && pr.need > 0) ? pr.need : null);
                if (n === null) return null;   // brak progu i brak wpisu recznego - bez poziomu
                var arr = needByCat[pool];
                if (!arr || !arr.length) return null;
                // Percentyl progu W OBREBIE PULI -> poziom wg krzywej DOBRANEJ DO SUFITU (patrz
                // ACH_TIER_CURVE_BY_CEILING w achievements-tiers-data.js). NIE uzywaj tu uniwersalnej
                // 5-poziomowej ACH_TIER_CURVE wprost: przy sufit=2 (zloto) pochlonelaby ona zakres
                // 0.68-1.00 (bylo zlota+platyny+diamentu razem, 32%) w JEDNO zlote wiadro, podczas
                // gdy srebro zostaje przy swoich oryginalnych 26% - zloto wychodzilo wtedy WIEKSZE
                // niz srebro w niemal kazdej puli (naprawione 2026-07-19d, zglosil uzytkownik).
                // Krzywa dla danego sufitu ma dokladnie `top` progow (bronz/srebro/.../ostatni
                // realny poziom PRZED sufitem) i sama w sobie jest juz malejaca piramida.
                var pct = arr.indexOf(n) / arr.length;
                var curve = (typeof ACH_TIER_CURVE_BY_CEILING !== 'undefined' && ACH_TIER_CURVE_BY_CEILING[top])
                    ? ACH_TIER_CURVE_BY_CEILING[top]
                    : ((typeof ACH_TIER_CURVE !== 'undefined') ? ACH_TIER_CURVE : [0.2, 0.4, 0.6, 0.8, 1]);
                idx = top;
                for (var j = 0; j < curve.length; j++) {
                    if (pct < curve[j]) { idx = j; break; }
                }
                return ACH_TIER_DEFS[Math.max(0, Math.min(idx, top))];
            };
        })();
        // Styl kafelka niosacy poziom. Kolor dostaje TLO (gradient), bo na samej ramce srebro,
        // platyna i diament sa nie do odroznienia - za malo powierzchni. Odznaka NIEZDOBYTA traci
        // kolor poziomu i wraca do szarego kafelka: kolor jest nagroda, nie dekoracja.
        // Styl idzie INLINE (a nie klasa CSS), bo bazowy styl kafelka tez jest inline - klasa
        // przegralaby ze specyficznoscia i trzeba by ratowac sie !important.
        window._achTierStyle = function(t, on){
            if (!on) return 'background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);';
            if (!t)  return 'background:rgba(255,255,255,0.04); border:1px solid rgba(250,204,21,0.45);';
            // Natezenie tla jest PER POZIOM (t.bg = [gora, dol]) - patrz komentarz w
            // achievements-tiers-data.js. Fallback na dawne 0.30/0.05, gdyby wpis go nie mial.
            var a1 = (t.bg && t.bg[0] != null) ? t.bg[0] : 0.30;
            var a2 = (t.bg && t.bg[1] != null) ? t.bg[1] : 0.05;
            return 'background:linear-gradient(160deg,rgba(' + t.rgb + ',' + a1 + '),rgba(' + t.rgb + ',' + a2 + ') 70%);'
                 + ' border:1px solid rgba(' + t.rgb + ',0.58);'
                 + (t.glow ? ' box-shadow:0 0 15px rgba(' + t.rgb + ',0.5);' : '');
        };
        // Znaczek poziomu w prawym gornym rogu kafelka (17 px). Kafelek MUSI miec position:relative.
        // t.markRgb nadpisuje kolor znaczka. Potrzebne, gdy tlo kafelka ma wysokie krycie i jest
        // praktycznie tym samym kolorem co t.rgb - znaczek rysowany domyslnie znika (kontrast 1.0).
        window._achTierMark = function(t, on){
            if (!t) return '';
            return '<svg viewBox="0 0 24 24" fill="rgb(' + (t.markRgb || t.rgb) + ')" style="position:absolute;'
                 + ' top:8px; right:8px; width:17px; height:17px; pointer-events:none;'
                 + (on ? '' : ' filter:grayscale(1); opacity:0.5;') + '">' + t.mark + '</svg>';
        };

        // ============================================================================
        // --- PASZPORT OPERATORA (klik w nazwe rangi w "Operative Status") ---
        // Zbiera w jednym miejscu to, co dotad bylo rozsypane po HUD i panelach: range, zasieg
        // (kraje / % ludzkosci / % ladu), drabinke poziomow odznak, najrzadsze zdobycze i nalot.
        // Buduje sie LENIWIE, wzorcem showAchievementsPanel/showContinentCountries - bez wpisu
        // w index.html; tresc przeliczana przy KAZDYM otwarciu, wiec panel nie wymaga odswiezania.
        // ============================================================================
        window.hidePassportPanel = function(){
            var el = document.getElementById("passport-overlay");
            if (el) el.style.display = "none";
        };
        window.showPassportPanel = function(){
            var el = document.getElementById("passport-overlay");
            if (!el) {
                el = document.createElement("div");
                el.id = "passport-overlay";
                el.style.cssText = "display:none; position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); align-items:center; justify-content:center;";
                el.innerHTML =
                    '<div id="passport-modal" style="background:rgba(8,8,10,0.96); border:1px solid rgba(0,204,255,0.4); border-radius:8px; width:min(900px,94vw); max-height:88vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.6); font-family:\'Rajdhani\',sans-serif;">'
                  +   '<div style="display:flex; justify-content:space-between; align-items:center; padding:14px 20px; border-bottom:1px solid rgba(255,255,255,0.12); background:linear-gradient(90deg,rgba(0,204,255,0.12),transparent);">'
                  +     '<div style="font-weight:700; letter-spacing:4px; font-size:1.05rem; color:#fff;">OPERATIVE PASSPORT</div>'
                  +     '<span id="passport-close" style="cursor:pointer; font-size:1.4rem; color:#8f9ba8; line-height:1;">✕</span>'
                  +   '</div>'
                  +   '<div id="passport-body"></div>'
                  + '</div>';
                document.body.appendChild(el);
                el.addEventListener("click", function(e){ if (e.target === el) window.hidePassportPanel(); });
                document.getElementById("passport-close").onclick = window.hidePassportPanel;
            }
            document.getElementById("passport-body").innerHTML = window._passportHTML();
            el.style.display = "flex";
        };
        // Cala tresc paszportu. Wydzielone z showPassportPanel, zeby dalo sie ja przeliczyc
        // bez dotykania overlaya (i zeby funkcja budujaca okno zostala czytelna).
        window._passportHTML = function(){
            var ctx = window.computeAchievementContext ? window.computeAchievementContext() : null;
            // _rankState wypelnia refreshVisitedUI. Gdyby paszport otworzyl sie ZANIM ta poszla
            // (albo gdyby padla), spadamy na ctx.score - to ta sama liczba, liczona niezaleznie -
            // i range wyliczamy z niej przez _rankIndexFor. Bez tego panel pokazywal "NPC / 0 krajow".
            var rs = window._rankState;
            if (!rs || typeof rs.score !== 'number') {
                var _sc = (ctx && typeof ctx.score === 'number') ? ctx.score : 0;
                rs = { score: _sc, idx: window._rankIndexFor ? window._rankIndexFor(_sc) : 0, visited: [] };
            }
            var rank = (typeof RANKS !== 'undefined' && RANKS[rs.idx]) ? RANKS[rs.idx] : null;
            var next = (typeof RANKS !== 'undefined') ? RANKS[rs.idx + 1] : null;
            var fs = window._flightStats ? window._flightStats() : null;
            var N = window._achNum || function(n){ return String(n); };

            // --- naglowek: ranga ---
            // RANKS[].title trzyma emoji na koncu ("CAPTAIN ⚓") - odcinamy je jak w showRankSplash,
            // zeby ikona mogla stanac osobno w emblemacie.
            var rTitle = rank ? rank.title : "—", rIcon = "🎖️";
            try { var m = rTitle.match(/^(.+?)\s+([^\p{L}\p{N}\s]+)$/u); if (m) { rTitle = m[1]; rIcon = m[2]; } } catch (e) {}
            var doNast = next ? (next.min - rs.score) : 0;
            var sub = next ? ("POZIOM " + (rs.idx + 1) + " · DO NASTĘPNEJ RANGI: " + (doNast > 0 ? doNast : 0) + " KR.")
                           : ("POZIOM " + (rs.idx + 1) + " · MAX LEVEL");

            var h = '<div style="display:flex; gap:18px; align-items:center; padding:18px 20px; border-bottom:1px solid rgba(255,255,255,0.12);">'
                  +   '<div style="width:70px; height:70px; flex:0 0 70px; border-radius:50%; border:2px solid #facc15; display:flex; align-items:center; justify-content:center; font-size:2rem; background:radial-gradient(circle,rgba(250,204,21,0.18),transparent 70%); box-shadow:0 0 22px rgba(250,204,21,0.3);">' + rIcon + '</div>'
                  +   '<div style="min-width:0;">'
                  +     '<div style="font-size:2.1rem; line-height:1; color:#facc15; text-shadow:0 0 14px rgba(250,204,21,0.4); letter-spacing:-0.5px;">' + rTitle + '</div>'
                  +     '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.82rem; color:#c6cfd9; letter-spacing:2px; margin-top:8px;">' + sub + '</div>'
                  +   '</div>'
                  + '</div>';

            // --- pasek 5 liczb: zasieg podboju ---
            // popPct/areaPct do 2026-07-19 nie mialy ZADNEGO konsumenta w UI (liczyly sie tylko dla
            // kategorii CIEKAWOSTKI) - to jest ich pierwsze miejsce na stronie.
            function cell(val, lab, sufiks){
                return '<div style="padding:13px 6px; text-align:center; border-right:1px solid rgba(255,255,255,0.07);">'
                     +   '<div style="font-size:2rem; color:#fff; line-height:1;">' + val
                     +     (sufiks ? '<span style="font-size:1.1rem; color:#6b7684;">' + sufiks + '</span>' : '') + '</div>'
                     +   '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.72rem; color:#8f9ba8; letter-spacing:1.5px; margin-top:6px;">' + lab + '</div>'
                     + '</div>';
            }
            var miasta = (ctx && ctx.citiesStats) ? ctx.citiesStats.visitedCount : 0;
            h += '<div style="display:grid; grid-template-columns:repeat(5,1fr); border-bottom:1px solid rgba(255,255,255,0.12);">'
               +   cell(rs.score, "KRAJE", "")
               +   cell(ctx ? Math.round(ctx.popPct) + "%" : "—", "LUDZKOŚCI", "")
               +   cell(ctx ? Math.round(ctx.areaPct) + "%" : "—", "LĄDU", "")
               +   cell(N(miasta), "MIASTA", "")
               +   cell(ctx ? ctx.wondersCount : 0, "CUDA", ctx ? ("/" + ctx.wondersTotal) : "")
               + '</div>';

            h += '<div style="padding:16px 20px;">';
            function naglowek(t){
                return '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.8rem; letter-spacing:2.5px; color:#c6cfd9; font-weight:700; margin:0 0 12px;">' + t + '</div>';
            }

            // --- drabinka poziomow odznak ---
            var tally = {}, rare = [], sumaHave = 0, sumaTotal = 0, _tierIdx = {};
            if (ctx && typeof ACH_TIER_DEFS !== 'undefined' && window.ACHIEVEMENTS && window._achTierOf) {
                var persisted = _persistedAchSet();
                ACH_TIER_DEFS.forEach(function(d, i){ _tierIdx[d.key] = i; });   // klucz -> ranga (0 = braz)
                ACH_TIER_DEFS.forEach(function(d){ tally[d.key] = { have: 0, total: 0, def: d }; });
                window.ACHIEVEMENTS.forEach(function(a){
                    var t = window._achTierOf(a, ctx);
                    if (!t || !tally[t.key]) return;
                    var on = !!persisted[a.id];
                    if (!on) { try { on = !!a.check(ctx); } catch (e) { on = false; } }
                    tally[t.key].total++; sumaTotal++;
                    if (on) {
                        tally[t.key].have++; sumaHave++;
                        // TYLKO platyna i diament (decyzja uzytkownika). 14 to SUFIT listy, nie cel:
                        // po przebudowie balansu w katalogu jest 10 diamentow i 39 platyn, wiec dopoki
                        // gracz ma ich mniej, lista bedzie krotsza - i tak ma byc. Nie "dosypuj" tu
                        // zlota, zeby uzbierac 14; wtedy sekcja przestaje znaczyc "najrzadsze".
                        if (t.key === "platinum" || t.key === "diamond") rare.push({ a: a, t: t, i: _tierIdx[t.key] });
                    }
                });
            }
            h += naglowek("ODZNAKI WEDŁUG POZIOMU — " + N(sumaHave) + " / " + N(sumaTotal));
            if (typeof ACH_TIER_DEFS !== 'undefined') {
                ACH_TIER_DEFS.forEach(function(d){
                    var t = tally[d.key] || { have: 0, total: 0 };
                    var pct = t.total ? Math.round(t.have / t.total * 100) : 0;
                    var col = "rgb(" + (d.markRgb || d.rgb) + ")";
                    h += '<div onclick="window._passportOpenTier(\'' + d.key + '\')" title="Pokaż wszystkie odznaki poziomu ' + d.label + '"'
                       + ' style="display:flex; align-items:center; gap:11px; margin-bottom:9px; cursor:pointer; padding:3px 6px; margin-left:-6px; margin-right:-6px; border-radius:5px;"'
                       + ' onmouseover="this.style.background=\'rgba(255,255,255,0.06)\'" onmouseout="this.style.background=\'transparent\'">'
                       +   '<svg viewBox="0 0 24 24" fill="' + col + '" style="width:20px; height:20px; min-width:20px; flex:0 0 auto;">' + d.mark + '</svg>'
                       +   '<div style="width:92px; font-family:\'JetBrains Mono\',monospace; font-size:0.76rem; font-weight:700; letter-spacing:1.5px; color:' + col + ';">' + d.label + '</div>'
                       +   '<div style="flex:1; height:9px; background:#111; border:1px solid #333; border-radius:5px; overflow:hidden;">'
                       +     '<div style="height:100%; width:' + pct + '%; background:' + col + ';"></div>'
                       +   '</div>'
                       +   '<div style="width:86px; text-align:right; font-family:\'JetBrains Mono\',monospace; font-size:0.78rem; color:#c6cfd9;">' + t.have + ' / ' + t.total + '</div>'
                       + '</div>';
                });
            }

            // --- najrzadsze zdobyte (platyna + diament, diamenty pierwsze) ---
            if (rare.length) {
                rare.sort(function(x, y){
                    if (x.i !== y.i) return y.i - x.i;                       // najwyzszy poziom na gorze
                    return x.a.name.localeCompare(y.a.name, "pl");
                });
                h += '<div style="margin-top:22px;"></div>' + naglowek("NAJRZADSZE ZDOBYTE — " + rare.length);
                rare.slice(0, 14).forEach(function(r){
                    var col = "rgb(" + (r.t.markRgb || r.t.rgb) + ")";
                    h += '<div onclick="window._passportGoToAch(\'' + r.a.id + '\')" style="display:flex; align-items:center; gap:9px; padding:5px 0; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer;" title="Pokaż tę odznakę w panelu osiągnięć">'
                       +   '<svg viewBox="0 0 24 24" fill="' + col + '" style="width:18px; height:18px; min-width:18px; flex:0 0 auto;">' + r.t.mark + '</svg>'
                       +   '<span style="font-size:1.7rem; line-height:1;">' + r.a.icon + '</span>'
                       +   '<span style="flex:1; min-width:0; color:#e6ecf2; font-size:1.05rem; font-weight:700; letter-spacing:0.5px;">' + r.a.name + '</span>'
                       +   '<span style="font-family:\'JetBrains Mono\',monospace; font-size:0.7rem; color:#8f9ba8; letter-spacing:1px;">' + r.a.cat + '</span>'
                       + '</div>';
                });
                if (rare.length > 14) {
                    h += '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.75rem; color:#8f9ba8; margin-top:9px;">…i jeszcze ' + (rare.length - 14) + '</div>';
                }
            }

            // --- nalot (z FLIGHTS_LOG przez _flightStats; bez logu panel te sekcje pomija) ---
            if (fs) {
                function row(l, v){
                    return '<div style="display:flex; justify-content:space-between; gap:14px; padding:6px 0; font-family:\'JetBrains Mono\',monospace; font-size:0.78rem; border-bottom:1px solid rgba(255,255,255,0.05);">'
                         +   '<span style="color:#8f9ba8; letter-spacing:1px;">' + l + '</span><span style="color:#fff; text-align:right;">' + v + '</span></div>';
                }
                h += '<div style="margin-top:22px;"></div>' + naglowek("NALOT");
                // UWAGA: liczba lotnisk i tras idzie z FLIGHTS_META, NIE z fs.topAirports.length -
                // to lista TOP-N (6 pozycji), a nie komplet lotnisk (51). Pierwsza wersja podpisywala
                // te szostke jako "LOTNISKA".
                var _ap = (typeof FLIGHTS_META !== 'undefined') ? FLIGHTS_META.airports : "—";
                var _rt = (typeof FLIGHTS_META !== 'undefined') ? FLIGHTS_META.routes : "—";
                h += row(fs.hasLog ? "LOTY / LOTNISKA / TRASY" : "SUMA TRAS",
                         fs.flights + " · " + _ap + " · " + _rt);
                h += row(fs.hasLog ? "PRZELECIANE" : "SUMA TRAS (NIE NALOT)",
                         N(Math.round(fs.totalKm)) + " km  (" + fs.laps.toFixed(2).replace(".", ",") + " × dookoła Ziemi)");
                if (fs.minutes) h += row("W POWIETRZU", window._fmtHm ? window._fmtHm(fs.minutes) : (fs.minutes + " min"));
                if (fs.first) h += row("PIERWSZY → OSTATNI LOT", fs.first + " → " + fs.last);
                h += row("DO KSIĘŻYCA", (fs.totalKm / 384400 * 100).toFixed(1).replace(".", ",") + " % drogi");
                // Przycisk do panelu linii. Rysujemy go tylko, gdy log faktycznie ma czym go wypelnic -
                // przy imporcie bez kolumny Airline (pole 4 puste w kazdym wierszu) otwieralby pustke.
                var _al = window._airlineStats ? window._airlineStats() : [];
                if (_al.length) {
                    h += '<div onclick="window.showAirlinesPanel(true)" title="Pokaż linie, którymi latałeś"'
                       + ' style="margin-top:14px; padding:9px 12px; text-align:center; cursor:pointer; border:1px solid rgba(0,204,255,0.4);'
                       + ' border-radius:5px; font-family:\'JetBrains Mono\',monospace; font-size:0.76rem; letter-spacing:2px; color:#00ccff;"'
                       + ' onmouseover="this.style.background=\'rgba(0,204,255,0.1)\'" onmouseout="this.style.background=\'transparent\'">'
                       + 'LINIE LOTNICZE — ' + _al.length + '</div>';
                }
            }

            h += '</div>';
            return h;
        };

        // Klik w pozycje "NAJRZADSZE ZDOBYTE" w paszporcie: zamyka paszport, otwiera panel osiagniec
        // i przewija do TEJ odznaki, podswietlajac ja na chwile.
        // Celowo NIE wolamy showAchievementDetail: platyny i diamenty to czesto odznaki licznikowe
        // bez list done/missing, wiec okienko rozpiski otworzyloby sie puste (patrz warunek
        // klikalnosci kafelka). Skok do kafelka dziala dla KAZDEJ odznaki.
        // Klik w pasek poziomu w paszporcie: zamyka paszport i otwiera panel osiagniec
        // ODFILTROWANY do tego poziomu (np. same zlote). Powrot do pelnej listy jest w tytule panelu.
        window._passportOpenTier = function(key){
            if (window.hidePassportPanel) window.hidePassportPanel();
            window._achOpenedFromPassport = true;
            window.showAchievementsPanel({ tier: key, status: 'unlocked' });
        };
        window._passportGoToAch = function(id){
            if (window.hidePassportPanel) window.hidePassportPanel();
            window._achOpenedFromPassport = true;
            window.showAchievementsPanel();
            var tile = document.querySelector('#achievements-body [data-ach="' + id + '"]');
            if (!tile) return;
            tile.scrollIntoView({ block: "center", behavior: "smooth" });
            // Podswietlenie przez animacje obrysu - nie ruszamy inline'owego stylu kafelka
            // (niesie kolor poziomu), wiec po animacji nie trzeba niczego przywracac.
            if (tile.animate) {
                tile.animate([
                    { outline: "2px solid rgba(0,204,255,0.9)", outlineOffset: "3px" },
                    { outline: "2px solid rgba(0,204,255,0)",   outlineOffset: "3px" }
                ], { duration: 1600, easing: "ease-out" });
            }
        };

        // --- LINIE LOTNICZE: agregat z FLIGHTS_LOG, malejaco po liczbie lotow ---
        // Kod ICAO (pole 6 logu) dopisuje importer w admin.php dopiero od 2026-07-19. Log
        // zaimportowany WCZESNIEJ tego pola nie ma - wtedy nie ma czym zaadresowac pliku
        // fr24_banners/XXX.png i kazdy wiersz spada na sam tekst. Lekarstwem jest dowolny
        // nowy import CSV, nie zmiana tutaj.
        window._airlineStats = function(){
            if (typeof FLIGHTS_LOG === 'undefined' || !FLIGHTS_LOG.length) return [];
            var map = {}, kolejnosc = [];
            FLIGHTS_LOG.forEach(function(L){
                var nazwa = L[4] || "";
                if (!nazwa) return;   // " ()" w CSV = lot bez linii; nie robimy z tego pozycji "brak"
                var k = nazwa.toLowerCase();
                if (!map[k]) { map[k] = { name: nazwa, icao: L[6] || "", n: 0 }; kolejnosc.push(k); }
                map[k].n++;
                // ICAO bierzemy z pierwszego lotu, ktory je ma: ta sama linia potrafi miec w CSV
                // raz pelny nawias "(W6/WZZ)", a raz samo " ()" (starsze wpisy z FR24).
                if (!map[k].icao && L[6]) map[k].icao = L[6];
            });
            // Dopiero na koniec, i TYLKO dla linii bez kodu z importu: reczne uzupelnienia z
            // airlines-data.js (FR24 nie podaje kodow paru nieistniejacych przewoznikow, wiec bez
            // tego nie da sie wskazac banera - patrz komentarz w tamtym pliku). Import ZAWSZE wygrywa.
            if (typeof AIRLINE_ICAO_FIX !== 'undefined') {
                for (var kk in map) { if (!map[kk].icao && AIRLINE_ICAO_FIX[kk]) map[kk].icao = AIRLINE_ICAO_FIX[kk]; }
            }
            var out = kolejnosc.map(function(k){ return map[k]; });
            out.sort(function(a, b){
                if (b.n !== a.n) return b.n - a.n;
                return a.name.localeCompare(b.name, "pl");
            });
            return out;
        };

        // Panel ma DWA wejscia: przycisk w paszporcie i przycisk w boxie FLIGHTS (HUD). Z paszportu
        // jest "wycinkiem" (paszport sam zamyka sie przy otwieraniu) i zamkniecie MUSI do niego wrocic;
        // z HUD-u zadnego paszportu nie bylo, wiec powrot do niego otwieralby okno znikad. Rozroznia
        // je ten flag - dokladnie ta sama mechanika co _achOpenedFromPassport w panelu osiagniec.
        window._airlinesFromPassport = false;
        window.hideAirlinesPanel = function(){
            var el = document.getElementById("airlines-overlay");
            if (el) el.style.display = "none";
            if (window._airlinesFromPassport) {
                window._airlinesFromPassport = false;
                if (window.showPassportPanel) window.showPassportPanel();
            }
        };
        window.showAirlinesPanel = function(fromPassport){
            window._airlinesFromPassport = !!fromPassport;
            if (fromPassport && window.hidePassportPanel) window.hidePassportPanel();
            var el = document.getElementById("airlines-overlay");
            if (!el) {
                el = document.createElement("div");
                el.id = "airlines-overlay";
                el.style.cssText = "position:fixed; inset:0; background:rgba(0,0,0,0.72); z-index:10001; display:flex; align-items:center; justify-content:center;";
                el.innerHTML =
                    '<div style="background:rgba(8,8,10,0.96); border:1px solid rgba(0,204,255,0.4); border-radius:8px; width:min(620px,94vw); max-height:88vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.6); font-family:\'Rajdhani\',sans-serif;">'
                  +   '<div style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; border-bottom:1px solid rgba(255,255,255,0.12);">'
                  +     '<span style="font-family:\'JetBrains Mono\',monospace; font-size:0.8rem; letter-spacing:2.5px; color:#c6cfd9; font-weight:700;">LINIE LOTNICZE</span>'
                  +     '<span id="airlines-close" style="cursor:pointer; font-size:1.4rem; color:#8f9ba8; line-height:1;">✕</span>'
                  +   '</div>'
                  +   '<div id="airlines-body" style="padding:14px 18px;"></div>'
                  + '</div>';
                document.body.appendChild(el);
                el.addEventListener("click", function(e){ if (e.target === el) window.hideAirlinesPanel(); });
                document.getElementById("airlines-close").onclick = window.hideAirlinesPanel;
            }
            var lst = window._airlineStats();
            var h = '';
            if (!lst.length) {
                h = '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.78rem; color:#8f9ba8;">Brak danych o liniach w logu lotów.</div>';
            } else {
                h = '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.72rem; color:#8f9ba8; letter-spacing:1.5px; margin-bottom:12px;">'
                  + lst.length + ' PRZEWOŹNIKÓW</div>';
                lst.forEach(function(a){
                    // Baner nie ma stalych proporcji (typowo ~98x45, ale kazdy przewoznik inne), wiec
                    // ramka jest stala, a obrazek wpisuje sie w nia przez object-fit. onerror lapie dwa
                    // przypadki naraz: brak kodu ICAO w logu i kod, ktorego nie ma w fr24_banners (linie
                    // nieistniejace, np. Eurolot czy OLT Express - FR24 ich banerow nie trzyma).
                    // BEZ loading="lazy": przy 18 plikach po ~5 KB nie ma czego odraczac, a lazy potrafi
                    // zawiesic obrazki w stanie "nieukonczony" wewnatrz swiezo pokazanego overlaya.
                    var baner = a.icao
                        ? '<img src="fr24_banners/' + a.icao + '.png" alt="' + a.name + '"'
                          // BIALE TLO POD BANEREM jest konieczne, nie kosmetyczne: banery FR24 sa robione
                          // pod jasne tlo serwisu, wiec czesc z nich (Ryanair, Air Serbia, Brussels,
                          // Azores) ma ciemny granat/czern jako kolor liter i na naszym #08080a znikala.
                          + ' style="width:100px; height:34px; flex:0 0 100px; object-fit:contain;'
                          + ' background:#fff; border-radius:4px; padding:3px; box-sizing:border-box;"'
                          + ' onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">'
                        : '';
                    h += '<div style="display:flex; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05);">'
                       +   baner
                       +   '<span style="width:100px; height:34px; flex:0 0 100px; display:' + (a.icao ? 'none' : 'flex') + '; align-items:center; justify-content:center;'
                       +     ' font-family:\'JetBrains Mono\',monospace; font-size:0.72rem; letter-spacing:1.5px; color:#6b7684;'
                       +     ' border:1px dashed rgba(255,255,255,0.15); border-radius:4px;">' + (a.icao || '—') + '</span>'
                       +   '<span style="flex:1; min-width:0; color:#e6ecf2; font-size:1.05rem; font-weight:700; letter-spacing:0.5px;">' + a.name + '</span>'
                       +   '<span style="font-family:\'JetBrains Mono\',monospace; font-size:0.82rem; color:#fff;">' + a.n + '</span>'
                       + '</div>';
                });
            }
            document.getElementById("airlines-body").innerHTML = h;
            el.style.display = "flex";
        };

        // opts.tier = klucz z ACH_TIER_DEFS ("gold") -> panel pokazuje TYLKO odznaki tego poziomu.
        // Wolane bez argumentu (wiekszosc miejsc) dziala jak dotad: pelna lista.
        window.showAchievementsPanel = function(opts){
            var _tierFilter = (opts && opts.tier) ? opts.tier : null;
            // status: 'all' (domyslny) | 'unlocked' | 'locked' - filtr wedlug tego, czy odznaka jest
            // juz zdobyta. _passportOpenTier startuje od 'unlocked' (klik w pasek poziomu w paszporcie
            // ma pokazac WYLACZNIE to, co juz masz z tego poziomu). Chipy statusu w samym panelu
            // (patrz statusChip() nizej) daja przelaczanie rowniez w widoku ogolnym (bez tier). Tier-
            // chip WSZYSTKIE/BRAZ/... i status-chip przekazuja sobie nawzajem swoj biezacy stan w
            // onclick, wiec przelaczenie jednego filtra NIE resetuje drugiego (np. bedac w "zdobyte"
            // i klikajac inny poziom, dalej widac tylko zdobyte tego poziomu).
            var _status = (opts && opts.status) ? opts.status : 'all';
            // cat: nazwa kategorii (z a.cat) - spis tresci w belce dziala jak trzeci filtr, laczacy
            // sie z tier/status dokladnie tak samo (patrz _achArgsStr). null = wszystkie kategorie.
            var _catFilter = (opts && opts.cat) ? opts.cat : null;
            var el = document.getElementById("achievements-overlay");
            if (!el) {
                el = document.createElement("div");
                el.id = "achievements-overlay";
                el.style.cssText = "display:none; position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); align-items:center; justify-content:center;";
                // #achievements-modal jest flex-column z overflow:hidden - header/progress/#achievements-toc
                // NIE naleza do przewijanego obszaru. Przewija sie WYLACZNIE #achievements-scroll (flex:1,
                // min-height:0 - bez tego flex-dziecko nie chce sie skurczyc ponizej wysokosci tresci i
                // scroll nie dziala), dzieki czemu spis tresci + filtr poziomu (budowane w #achievements-toc)
                // zostaja stala, nieprzewijalna belka nad lista. Naglowki KATEGORII w #achievements-body
                // zostaja position:sticky (patrz nizej) - te maja przewijac sie WRAZ z lista i tylko
                // przyklejac sie przy mijaniu, w odroznieniu od belki, ktora nie rusza sie wcale.
                el.innerHTML =
                    '<div id="achievements-modal" style="background:rgba(8,8,10,0.96); border:1px solid rgba(250,204,21,0.4); border-radius:8px; padding:22px; width:min(920px,92vw); max-height:85vh; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 8px 40px rgba(0,0,0,0.6); font-family:\'Rajdhani\',sans-serif;">'
                  +   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex:0 0 auto;">'
                  +     '<h1 id="achievements-title" style="margin:0; border:none; padding:0; font-size:1.3rem;">🏆 OSIĄGNIĘCIA</h1>'
                  +     '<span id="achievements-close" style="cursor:pointer; font-size:1.5rem; color:#8f9ba8; line-height:1;">✕</span>'
                  +   '</div>'
                  +   '<div id="achievements-progress" style="font-family:\'JetBrains Mono\',monospace; font-size:0.8rem; color:#facc15; margin-bottom:14px; flex:0 0 auto;"></div>'
                  +   '<div id="achievements-toc" style="flex:0 0 auto;"></div>'
                  +   '<div id="achievements-scroll" style="flex:1 1 auto; min-height:0; overflow-y:auto; overflow-x:hidden;">'
                  +     '<div id="achievements-body"></div>'
                  +   '</div>'
                  + '</div>';
                document.body.appendChild(el);
                el.addEventListener("click", function(e){ if (e.target === el) window.hideAchievementsPanel(); });
                document.getElementById("achievements-close").onclick = window.hideAchievementsPanel;
            }
            var ctx = window.checkAndPersistAchievements() || window.computeAchievementContext();
            var persisted = _persistedAchSet();
            var unlocked = 0;
            var byCat = {}, catOrder = [], catDone = {}, total = 0;
            // catStatsAll/grandDone/grandTotal: liczone POD filtrem tier+status, ale NIEZALEZNIE od
            // _catFilter - zeby spis tresci w belce zawsze pokazywal WSZYSTKIE kategorie (z ich d/t
            // pod biezacym tier/status), niezaleznie od tego, ktora kategoria jest akurat wybrana.
            var catStatsAll = {}, catOrderAll = [], grandDone = 0, grandTotal = 0;
            window.ACHIEVEMENTS.forEach(function(a){
                var on = !!a.check(ctx) || !!persisted[a.id];
                // FILTR POZIOMU: liczymy prog() RAZ i przekazujemy do _achTierOf, zeby nie odpalac
                // go drugi raz na kazdej z 528 pozycji (patrz komentarz przy _achTierOf).
                var pr = null;
                if (typeof a.prog === 'function') { try { pr = a.prog(ctx); } catch (e) { pr = null; } }
                if (_tierFilter) {
                    var _tf = window._achTierOf ? window._achTierOf(a, ctx, pr) : null;
                    if (!_tf || _tf.key !== _tierFilter) return;   // nie ten poziom - pomijamy calkiem
                }
                if (_status === 'unlocked' && !on) return;
                if (_status === 'locked' && on) return;
                if (!catStatsAll[a.cat]) { catStatsAll[a.cat] = { done: 0, total: 0 }; catOrderAll.push(a.cat); }
                catStatsAll[a.cat].total++; grandTotal++;
                if (on) { catStatsAll[a.cat].done++; grandDone++; }
                if (_catFilter && a.cat !== _catFilter) return;   // nie ta kategoria - pomijamy budowe kafelka
                total++;
                if (on) unlocked++;
                if (!byCat[a.cat]) { byCat[a.cat] = []; catOrder.push(a.cat); catDone[a.cat] = 0; }
                if (on) catDone[a.cat]++;   // licznik zdobytych W KATEGORII (do naglowka sekcji)
                // prog() jest OPCJONALNY (patrz achievements-catalog.js): jest - kafelek dostaje pasek
                // postepu i klikalna liste brakow; nie ma - stary wyglad (sam opis, bez klikania).
                // Bledy w prog() nie moga wywrocic calego panelu - stad try/catch i fallback na null.
                var progHtml = "", clickAttr = "", curs = "";
                if (pr && pr.need > 0) {
                    var pct = Math.min(100, Math.round((pr.have / pr.need) * 100));
                    // have przycinane do need: przy progach "N z 6" mozna miec wiecej niz prog
                    // (2 kontynenty przy progu 1) i goly licznik pokazywalby bzdurne "2 / 1".
                    var barCol = on ? "#facc15" : "#00d4ff";
                    progHtml = '<div style="margin-top:6px;">'
                      + '<div style="display:flex; justify-content:space-between; font-family:\'JetBrains Mono\',monospace; font-size:0.62rem; color:#c6cfd9; margin-bottom:3px;">'
                      +   '<span>' + window._achNum(Math.min(pr.have, pr.need)) + ' / ' + window._achNum(pr.need) + '</span><span style="color:' + barCol + ';">' + pct + '%</span>'
                      + '</div>'
                      + '<div style="height:5px; border-radius:3px; background:rgba(255,255,255,0.09); overflow:hidden;">'
                      +   '<div style="height:100%; width:' + pct + '%; background:' + barCol + ';"></div>'
                      + '</div></div>';
                    // Klikalne TYLKO gdy jest co pokazac w okienku. Osiagniecia czysto licznikowe
                    // (np. "100 lotow") nie maja list - otwieraloby sie puste okno, a pasek na kafelku
                    // mowi juz wszystko.
                    if ((pr.done && pr.done.length) || (pr.missing && pr.missing.length)) {
                        clickAttr = ' onclick="window.showAchievementDetail(\'' + a.id + '\')"';
                        curs = ' cursor:pointer;';
                    }
                }
                // POZIOM TRUDNOSCI: pr jest juz policzone wyzej, wiec przekazujemy je dalej -
                // inaczej a.prog() poszloby drugi raz na kazda z 528 pozycji.
                var tier = window._achTierOf ? window._achTierOf(a, ctx, pr) : null;
                // padding-right robi miejsce na znaczek poziomu; bez niego dluzsze nazwy wchodza pod niego.
                var namePad = tier ? ' padding-right:22px;' : '';
                byCat[a.cat].push(
                    // data-ach: cel skoku z paszportu (window._passportGoToAch)
                    '<div data-ach="' + a.id + '"' + clickAttr + ' style="display:flex; gap:10px; align-items:flex-start; padding:10px; border-radius:6px; position:relative; ' + window._achTierStyle(tier, on) + curs + '">'
                  +   window._achTierMark(tier, on)
                  +   '<div style="font-size:1.7rem; opacity:' + (on ? '1' : '0.22') + '; filter:' + (on ? 'none' : 'grayscale(1)') + ';">' + a.icon + '</div>'
                  +   '<div style="flex:1; min-width:0;">'
                  +     '<div style="font-weight:700; letter-spacing:0.5px; font-size:0.88rem;' + namePad + ' color:' + (on ? '#facc15' : '#6b7684') + ';">' + a.name + '</div>'
                  +     '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.65rem; color:#8f9ba8; margin-top:3px; line-height:1.3;">' + a.desc + '</div>'
                  +     progHtml
                  +   '</div>'
                  + '</div>'
                );
            });
            // Kafelki spisu tresci (catGrid nizej) w kolejnosci ALFABETYCZNEJ (locale PL: Ś/Ż/Ą po swojemu).
            // catOrderAll napedza TYLKO grid kafelkow; kafelek "WSZYSTKIE" jest doklejany osobno z przodu
            // (catTile(null,...)), wiec sort go nie rusza - zostaje pierwszy. Sekcje w tresci (catOrder)
            // celowo NIE sa sortowane - zachowuja kolejnosc katalogu ACHIEVEMENTS.
            catOrderAll.sort(function(a, b){ return a.localeCompare(b, 'pl'); });
            // Buduje argument wywolania showAchievementsPanel(...) jako string literalu obiektu -
            // uzywane przez WSZYSTKIE TRZY paski filtrow ponizej (poziom/status/kategoria), zeby klik
            // w jeden pasek zawsze przenosil biezacy stan pozostalych DWOCH, zamiast je resetowac.
            function _achArgsStr(tier, status, cat){
                var parts = [];
                if (tier) parts.push("tier:'" + tier + "'");
                if (status && status !== 'all') parts.push("status:'" + status + "'");
                if (cat) parts.push("cat:'" + cat.replace(/'/g, "\\'") + "'");
                return '{' + parts.join(',') + '}';
            }
            // --- FILTR POZIOMU: chipy WSZYSTKIE + 5x ACH_TIER_DEFS w stalej belce ---
            // Klik przeladowuje caly panel przez showAchievementsPanel({tier,status}) - ten sam
            // mechanizm, ktorym paszport juz otwiera panel odfiltrowany (_passportOpenTier), wiec
            // dodatkowy stan nie jest potrzebny: _tierFilter/_status i tak sa przeliczane od nowa z
            // opts przy kazdym wywolaniu. Aktywny chip dostaje wypelnione tlo swoim kolorem; reszta
            // zostaje przygaszona, ale kolorowa (widac od razu, ktory poziom jest ktory, bez najezdzania).
            var tierBar = "";
            if (typeof ACH_TIER_DEFS !== 'undefined') {
                function chip(key, label, rgb){
                    var active = _tierFilter === key;
                    var col = 'rgb(' + rgb + ')';
                    return '<span onclick="window.showAchievementsPanel(' + _achArgsStr(key, _status, _catFilter) + ')"'
                         + ' style="cursor:pointer; padding:5px 13px; border-radius:20px;'
                         + ' font-family:\'JetBrains Mono\',monospace; font-size:0.68rem; font-weight:700; letter-spacing:1.5px;'
                         + ' color:' + col + '; background:' + (active ? 'rgba(' + rgb + ',0.28)' : 'rgba(255,255,255,0.04)') + ';'
                         + ' border:1px solid ' + (active ? col : 'rgba(' + rgb + ',0.4)') + ';">' + label + '</span>';
                }
                tierBar = '<div style="display:flex; flex-wrap:wrap; gap:7px; margin-bottom:8px;">'
                        + chip(null, 'WSZYSTKIE', '250,204,21')
                        + ACH_TIER_DEFS.map(function(d){ return chip(d.key, d.label, d.markRgb || d.rgb); }).join('')
                        + '</div>';
            }
            // --- FILTR STATUSU: WSZYSTKIE / ZDOBYTE / NIEZDOBYTE, ta sama belka co poziom ---
            // Kolory neutralne wzgledem poziomow trudnosci (zeby nie sugerowac zwiazku z konkretnym
            // poziomem): zielony dla zdobytych (jak komplet w spisie tresci kategorii), ciemnoszary
            // dla niezdobytych, jasnoszary dla "wszystkie".
            var statusBar = "";
            (function(){
                function statusChip(key, label, rgb){
                    var active = _status === key;
                    var col = 'rgb(' + rgb + ')';
                    return '<span onclick="window.showAchievementsPanel(' + _achArgsStr(_tierFilter, key, _catFilter) + ')"'
                         + ' style="cursor:pointer; padding:5px 13px; border-radius:20px;'
                         + ' font-family:\'JetBrains Mono\',monospace; font-size:0.68rem; font-weight:700; letter-spacing:1.5px;'
                         + ' color:' + col + '; background:' + (active ? 'rgba(' + rgb + ',0.22)' : 'rgba(255,255,255,0.04)') + ';'
                         + ' border:1px solid ' + (active ? col : 'rgba(' + rgb + ',0.35)') + ';">' + label + '</span>';
                }
                statusBar = '<div style="display:flex; flex-wrap:wrap; gap:7px; margin-bottom:10px;">'
                          + statusChip('all', 'WSZYSTKIE', '198,207,217')
                          + statusChip('unlocked', 'ZDOBYTE', '74,222,128')
                          + statusChip('locked', 'NIEZDOBYTE', '107,118,132')
                          + '</div>';
            })();
            // --- SPIS TRESCI: kafelki kategorii, TRZECI FILTR (2026-07-19g) ---
            // Dawniej klik przewijal do sekcji (_achGoToCat); teraz zaweza cala liste do TEJ kategorii
            // (trzeci filtr obok tier/status - patrz _achArgsStr), a doszedl kafelek "WSZYSTKIE" jako
            // reset. d/t licza sie z catStatsAll/grandDone/grandTotal (pod tier+status, ALE niezaleznie
            // od _catFilter), zeby belka zawsze pokazywala WSZYSTKIE kategorie z ich pelnymi licznikami,
            // nawet gdy akurat jedna z nich jest wybrana. Widoczna, dopoki jest przynajmniej 1 kategoria.
            var catGrid = "";
            if (catOrderAll.length >= 1) {
                function catTile(cat, d, t){
                    var isAll = !cat;
                    var active = isAll ? !_catFilter : (_catFilter === cat);
                    // Kolor licznika sygnalizuje postep: komplet na zielono, zero na szaro.
                    var col = (t > 0 && d === t) ? "#4ade80" : (d === 0 ? "#6b7684" : "#facc15");
                    var bg = active ? "rgba(250,204,21,0.16)" : "rgba(255,255,255,0.04)";
                    var bd = active ? "rgba(250,204,21,0.55)" : "rgba(255,255,255,0.1)";
                    return '<div onclick="window.showAchievementsPanel(' + _achArgsStr(_tierFilter, _status, cat) + ')"'
                         + ' style="cursor:pointer; padding:7px 9px; border-radius:5px;'
                         + ' background:' + bg + '; border:1px solid ' + bd + ';'
                         + ' display:flex; justify-content:space-between; align-items:baseline; gap:8px;"'
                         + ' onmouseover="this.style.background=\'rgba(250,204,21,0.12)\'"'
                         + ' onmouseout="this.style.background=\'' + bg + '\'">'
                         +   '<span style="font-family:\'JetBrains Mono\',monospace; font-size:0.68rem; letter-spacing:1px; color:#c6cfd9;">' + (isAll ? "WSZYSTKIE" : cat) + '</span>'
                         +   '<span style="font-family:\'JetBrains Mono\',monospace; font-size:0.66rem; color:' + col + ';">' + d + '/' + t + '</span>'
                         + '</div>';
                }
                catGrid = '<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:7px;">'
                    + catTile(null, grandDone, grandTotal)
                    + catOrderAll.map(function(cat){ var s = catStatsAll[cat]; return catTile(cat, s.done, s.total); }).join('')
                    + '</div>';
            }
            // Belka zyje POZA #achievements-scroll (patrz budowa modala wyzej), wiec nie przewija sie
            // wcale. Krawedz-do-krawedzi jak naglowki kategorii nizej (margin -22px kasuje padding
            // modala, padding 22px oddaje go z powrotem tresci) - dzieki temu dolna linia siega calej
            // szerokosci okna, tak samo jak przy sekcjach.
            document.getElementById("achievements-toc").innerHTML = (tierBar || statusBar || catGrid)
                ? ('<div style="margin:0 -22px; padding:0 22px 12px; border-bottom:1px solid rgba(255,255,255,0.12);">' + tierBar + statusBar + catGrid + '</div>')
                : '';
            document.getElementById("achievements-body").innerHTML = catOrder.map(function(cat){
                var items = byCat[cat];
                // NAGLOWEK KATEGORII: position:sticky wzgledem #achievements-scroll (to on ma
                // overflow-y i jest najblizszym przodkiem przewijanym - #achievements-modal sam juz
                // sie NIE przewija, patrz budowa w showAchievementsPanel). top:0 przykleja go do
                // gornej krawedzi, wiec przy dlugiej liscie zawsze wiadomo, ktora to kategoria.
                // TLO MUSI BYC NIEPRZEZROCZYSTE (#0a0a0c, nie rgba modala) - inaczej kafelki przewijaja
                // sie widocznie POD napisem. z-index nad kafelkami, ktore maja position:relative.
                // Marginesy ujemne + padding: pasek tla ma siegac krawedzi modala mimo jego paddingu 22px.
                var _cd = catDone[cat] || 0, _ct = items.length;
                return '<div data-cat="' + cat + '" style="margin-top:18px;">'
                  +   '<div style="position:sticky; top:0; z-index:6; background:#0a0a0c;'
                  +     ' margin:0 -22px; padding:11px 22px 8px; border-bottom:1px solid #444;'
                  +     ' font-family:\'JetBrains Mono\',monospace; font-size:1.05rem; font-weight:700;'
                  +     ' color:#facc15; letter-spacing:3px; display:flex; justify-content:space-between; align-items:baseline;">'
                  +     '<span>' + cat + '</span>'
                  +     '<span style="font-size:0.8rem; font-weight:400; letter-spacing:1.5px; color:#8f9ba8;">' + _cd + ' / ' + _ct + '</span>'
                  +   '</div>'
                  +   '<div style="height:10px;"></div>'
                  +   '<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:8px;">' + items.join('') + '</div>'
                  + '</div>';
            }).join('');
            // Licznik liczy z `total` (po filtrze), nie z calego katalogu - inaczej widok jednego
            // poziomu pokazywalby "25 / 528" przy 114 wyswietlonych kafelkach.
            document.getElementById("achievements-progress").innerText = unlocked + " / " + total + " ODBLOKOWANYCH";
            // Tytul: w widoku filtrowanym (poziom i/lub status) mowi WPROST, ze to wycinek, i daje
            // powrot do pelnej listy. Link "← WSZYSTKIE" resetuje OBA filtry naraz - to swiadomie inny
            // przycisk niz chip "WSZYSTKIE" w kazdym z dwoch pasków (ten resetuje tylko swoj filtr,
            // zachowujac drugi - patrz _achArgsStr).
            var _ttl = document.getElementById("achievements-title");
            if (_ttl) {
                var _anyFilter = !!_tierFilter || _status !== 'all' || !!_catFilter;
                var _backLink = _anyFilter
                    ? '<span onclick="window.showAchievementsPanel()" style="cursor:pointer; font-size:0.72rem; color:#8f9ba8; letter-spacing:1.5px; margin-left:14px; font-family:\'JetBrains Mono\',monospace;">← WSZYSTKIE</span>'
                    : '';
                var _mainHtml;
                if (_tierFilter) {
                    var _td = null;
                    if (typeof ACH_TIER_DEFS !== 'undefined') {
                        ACH_TIER_DEFS.forEach(function(d){ if (d.key === _tierFilter) _td = d; });
                    }
                    var _tc = _td ? ("rgb(" + (_td.markRgb || _td.rgb) + ")") : "#facc15";
                    _mainHtml = '<span style="color:' + _tc + ';">'
                              + (_td ? ('<svg viewBox="0 0 24 24" fill="' + _tc + '" style="width:20px;height:20px;min-width:20px;vertical-align:-3px;margin-right:7px;">' + _td.mark + '</svg>') : '')
                              + 'POZIOM ' + (_td ? _td.label : _tierFilter) + '</span>';
                } else {
                    _mainHtml = '🏆 OSIĄGNIĘCIA';
                }
                // Kategoria i status dokladaja sie jako neutralny dopisek NIEZALEZNIE od tego, czy
                // poziom jest akurat filtrowany - wszystkie trzy filtry sa rownorzedne i mozna je
                // dowolnie laczyc (patrz _achArgsStr).
                var _extra = [];
                if (_catFilter) _extra.push(_catFilter);
                if (_status === 'unlocked') _extra.push('ZDOBYTE');
                if (_status === 'locked') _extra.push('NIEZDOBYTE');
                var _extraHtml = _extra.length ? ('<span style="font-size:1rem; color:#8f9ba8;"> · ' + _extra.join(' · ') + '</span>') : '';
                _ttl.innerHTML = _mainHtml + _extraHtml + _backLink;
            }
            document.getElementById("achievements-scroll").scrollTop = 0;
            el.style.display = "flex";
        };

        // --- Instrukcja/manual: patrz osobny plik help.js (HELP_SECTIONS + showHelpPanel/hideHelpPanel) ---
        // --- PODSWIETLENIE KLIKNIETEGO KRAJU (jasna obwodka; nie koliduje z fill "visited") ---
        window._selPoly = null;
        window.highlightCountry = function(poly){
            if (window._selPoly && window._selPoly !== poly) {
                window._selPoly.setAll({ stroke: am5.color(0x000000), strokeWidth: 1, strokeOpacity: 1 });
            }
            if (poly) { poly.setAll({ stroke: am5.color(0xdbe4ee), strokeWidth: 2.5, strokeOpacity: 1 }); }
            window._selPoly = poly || null;
        };
        window.clearCountryHighlight = function(){
            if (window._selPoly) { window._selPoly.setAll({ stroke: am5.color(0x000000), strokeWidth: 1, strokeOpacity: 1 }); window._selPoly = null; }
        };
        window.myFlightsOn = false;
        window.AIRPORT_DB = null; window.AIRPORT_BY_CC = null; window._airportDBPromise = null;
        window.ensureAirportDB = function() {
            if (window._airportDBPromise) return window._airportDBPromise;
            window._airportDBPromise = fetch("airport-db.json").then(function(r){ return r.json(); }).then(function(db){
                window.AIRPORT_DB = db.iata || {};
                var byCC = {};
                for (var code in window.AIRPORT_DB) {
                    var v = window.AIRPORT_DB[code];
                    if (!v[5]) continue;
                    var cc = v[4];
                    (byCC[cc] = byCC[cc] || []).push({ lat: v[0], lon: v[1], name: v[3], iata: code, url: v[5] });
                }
                window.AIRPORT_BY_CC = byCC;
                return db;
            }).catch(function(e){ console.error("airport-db.json load failed", e); window._airportDBPromise = null; return null; });
            return window._airportDBPromise;
        };
        window.showCountryAirports = function(id) {
            window.ensureAirportDB().then(function(){
                if (!window.airportMode) return;
                var list = (window.AIRPORT_BY_CC && window.AIRPORT_BY_CC[id]) || [];
                if (window.airportSeries) window.airportSeries.data.setAll(list.map(function(a){
                    return { geometry: { type: "Point", coordinates: [a.lon, a.lat] }, iata: a.iata, apname: a.name, url: a.url };
                }));
            });
        };
        // --- INTEL LOTNISKA (klik w pinezke lotniska na mapie) ---
        // Klik NIE otwiera juz od razu Sleeping in Airports - leci w prawy panel #factbook-content,
        // dokladnie tak jak showCityIntel / updateWonderIntel (te same .fact-row i .links-grid).
        // Przyciski buduje katalog AIRPORT_LINKS (airport-links-data.js): szablony URL na kodzie IATA,
        // a wpis z url === null bierze gotowy adres z bazy (dc.url = guide SiA z airport-db.json).
        window.showAirportPanel = function(dc) {
            if (!dc) return;
            var fT = document.getElementById("factbook-target");
            var fC = document.getElementById("factbook-content");
            if (!fT || !fC) return;
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            if (typeof window._standbyWeatherPanel === 'function') window._standbyWeatherPanel();

            var iata = (dc.iata || "").toUpperCase();
            var apname = dc.apname || iata;
            // Reszta metryk siedzi w AIRPORT_DB pod kluczem IATA - pinezki istnieja dopiero po
            // ensureAirportDB(), wiec baza jest tu na pewno zaladowana. [2]=miasto, [4]=kod kraju.
            var row = (window.AIRPORT_DB && window.AIRPORT_DB[iata]) || null;
            var apCity = row ? row[2] : "";
            var apCC = row ? row[4] : "";
            var ctryName = (apCC && typeof FACTBOOK !== 'undefined' && FACTBOOK[apCC]) ? FACTBOOK[apCC].name.common : apCC;
            var flagSrc = (apCC && window._flagSrc) ? window._flagSrc(apCC) : null;

            fT.innerText = "INTEL: " + apname.toUpperCase();

            var links = (typeof AIRPORT_LINKS !== 'undefined') ? AIRPORT_LINKS : [];
            var btnsHtml = links.map(function(l){
                var href = l.url
                    ? l.url.replace(/{iata}/g, encodeURIComponent(iata)).replace(/{iata_lower}/g, encodeURIComponent(iata.toLowerCase()))
                    : dc.url;
                if (!href) return "";
                return '<a href="' + href + '" target="_blank" class="windy-btn" style="grid-column:1 / -1; background:' + l.bg + '; border:1px solid ' + l.border + '; color:' + l.color + ';">' + l.label + '</a>';
            }).join('');

            fC.innerHTML =
                window._panelBanner("foty/airport.jpg")
              + '<div class="fact-row" style="border:none;"><span class="fact-key">AIRPORT:</span><span class="fact-val" style="color:#facc15; font-weight:bold;">' + apname + '</span></div>'
              + '<div class="fact-row"><span class="fact-key">IATA:</span><span class="fact-val" style="color:#00b3ff; font-weight:bold; letter-spacing:1px;">🛬 ' + iata + '</span></div>'
              + (apCity ? '<div class="fact-row"><span class="fact-key">MIASTO:</span><span class="fact-val">🏙️ ' + apCity + '</span></div>' : '')
              + (ctryName ? '<div class="fact-row"><span class="fact-key">KRAJ:</span><span class="fact-val">'
                    + (flagSrc ? '<img src="' + flagSrc + '" style="width:20px; height:14px; object-fit:cover; vertical-align:-2px; margin-right:6px; border:1px solid rgba(255,255,255,0.25);" alt="">' : '')
                    + ctryName + '</span></div>' : '')
              + '<div class="links-grid" style="margin-top:12px;">' + btnsHtml + '</div>';
        };
        window._normCity = function(s){ return (s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,""); };
        // --- ODWIEDZONE MIASTA: ID = "KOD|znormalizowananazwa", cache zbioru + toggle z natychmiastowym zapisem ---
        window._cityId = function(cc, name){ return (cc || "") + "|" + window._normCity(name).toUpperCase(); };
        // --- Znajduje indeks stolicy w liscie miast danego kraju. Najpierw po NAZWIE (CAPITAL_NAMES,
        // dopasowanie czesciowe po normalizacji - np. "San Marino" pasuje do "City of San Marino"),
        // dopiero potem po najblizszych wspolrzednych (CAPITAL_COORDS) jako fallback. Samo dopasowanie
        // po dystansie potrafi sie mylic gdy wspolrzedne miasta w CITIES_DB sa niedokladne (np. San
        // Marino: wpis "City of San Marino" mial wspolrzedne ~3km od realnej lokalizacji, wiec
        // geometrycznie blizsze Borgo Maggiore dostawalo gwiazdke stolicy zamiast wlasciwego miasta). ---
        window._findCapitalIndex = function(cc, list){
            if (!list || !list.length) return -1;
            var capName = (typeof CAPITAL_NAMES !== "undefined") ? CAPITAL_NAMES[cc] : null;
            if (capName) {
                var normCap = window._normCity(capName);
                if (normCap) {
                    for (var i = 0; i < list.length; i++) {
                        var normCity = window._normCity(list[i][0]);
                        if (normCity === normCap || normCity.indexOf(normCap) >= 0 || normCap.indexOf(normCity) >= 0) return i;
                    }
                }
            }
            var capCoord = (typeof CAPITAL_COORDS !== "undefined") ? CAPITAL_COORDS[cc] : null;
            if (!capCoord) return -1;
            var capIdx = -1, bestD = 9;
            for (var j = 0; j < list.length; j++) { var d = Math.abs(list[j][1] - capCoord[0]) + Math.abs(list[j][2] - capCoord[1]); if (d < bestD) { bestD = d; capIdx = j; } }
            return (bestD > 1.0) ? -1 : capIdx;
        };
        window._visitedCitySetCache = null;
        window._visitedCitySet = function(){
            if (window._visitedCitySetCache) return window._visitedCitySetCache;
            var known = (typeof VISITED_CITIES !== "undefined") ? VISITED_CITIES : [];
            var set = {};
            known.forEach(function(id){ set[id] = true; });
            window._visitedCitySetCache = set;
            return set;
        };
        // --- ODWIEDZONE MIASTA W DANYM KRAJU: licznik + najdalsze od Warszawy ---
        // Jedno zrodlo dla DWOCH konsumentow: dymka nad flaga w dolnym pasku oraz celu klikniecia tej
        // flagi (obrot globu, znacznik i dystans leca na to samo miasto - inaczej marker staly w jednym
        // miejscu, a liczba kilometrow mowilaby o innym).
        // Zwraca { count, farthest: { name, lat, lon, dist } | null }; farthest === null, gdy w kraju
        // nie ma jeszcze zadnego odwiedzonego miasta (kraj zaznaczony "recznie") - wtedy konsumenci
        // wracaja do CAPITAL_COORDS.
        window._countryCityStatsCache = {};
        window._countryCityStats = function(cc){
            if (window._countryCityStatsCache[cc]) return window._countryCityStatsCache[cc];
            var out = { count: 0, farthest: null };
            var list = (typeof CITIES_DB !== "undefined") ? CITIES_DB[cc] : null;
            if (list) {
                var vSet = window._visitedCitySet();
                for (var i = 0; i < list.length; i++) {
                    var ci = list[i];                       // [nazwa, lat, lon, ...]
                    if (!vSet[window._cityId(cc, ci[0])]) continue;
                    out.count++;
                    var d = getDist(52.23, 21.01, ci[1], ci[2]);
                    if (!out.farthest || d > out.farthest.dist) out.farthest = { name: ci[0], lat: ci[1], lon: ci[2], dist: d };
                }
            }
            window._countryCityStatsCache[cc] = out;
            return out;
        };
        // --- NAJDALSZE ODWIEDZONE MIASTO GLOBALNIE (box "Deepest Reach" nad panelem Flights) ---
        // Liczone z per-krajowych wynikow _countryCityStats, a NIE druga petla po VISITED_CITIES:
        // rekord globalny musi byc zawsze jednym z rekordow krajowych, wiec przy okazji korzystamy
        // z tego samego cache'a (i nie da sie rozjechac z dymkiem nad flaga).
        window._farCityCache = null;
        window._farthestVisitedCity = function(){
            if (window._farCityCache) return window._farCityCache;
            var best = null, seen = {};
            var known = (typeof VISITED_CITIES !== "undefined") ? VISITED_CITIES : [];
            known.forEach(function(v){
                var cc = String(v).split("|")[0];
                if (!cc || seen[cc]) return;
                seen[cc] = true;
                var f = window._countryCityStats(cc).farthest;
                if (f && (!best || f.dist > best.dist)) best = { cc: cc, name: f.name, lat: f.lat, lon: f.lon, dist: f.dist };
            });
            window._farCityCache = best;
            return best;
        };
        // Czy dwa punkty to w praktyce TO SAMO miejsce na globusie? Prog w KILOMETRACH, nie w stopniach:
        // stopien dlugosci geograficznej ma inna dlugosc na roznych szerokosciach, wiec prog katowy raz
        // odcinalby za duzo, raz za malo. 30 km to mniej niz srednica znacznika przy typowym zoomie -
        // ponizej tego rysowanie osobnego znacznika i laczacej linii daje tylko nakladajace sie podpisy
        // (np. lotnisko OKA lezy 4 km od centrum Nahy).
        window._sameSpotKm = 30;
        window._isSameSpot = function(aLat, aLon, bLat, bLon){
            return getDist(aLat, aLon, bLat, bLon) <= window._sameSpotKm;
        };
        // --- NAJDALSZE LOTNISKO OD WARSZAWY (drugi wiersz w MAX RANGE) ---
        // Zrodlo: FLIGHTS_AP, czyli lotniska realnie wystepujace w Twoim logu lotow (51 sztuk) - a wiec
        // "najdalsze, na ktorym wyladowalem", nie "najdalsze na swiecie".
        // NIE potrzebuje airport-db.json: w tym ukladzie kraj bierze sie z wiersza MIASTO, a tu
        // wystarcza kod IATA i kilometry, ktore FLIGHTS_AP ma u siebie. Dzieki temu nic nie dociagamy.
        window._farAirportCache = null;
        window._farthestAirport = function(){
            if (window._farAirportCache !== null) return window._farAirportCache;
            var best = null;
            if (typeof FLIGHTS_AP !== "undefined") {
                for (var iata in FLIGHTS_AP) {
                    var a = FLIGHTS_AP[iata];   // [lat, lon, nazwa miasta]
                    if (!a) continue;
                    var d = getDist(52.23, 21.01, a[0], a[1]);
                    if (!best || d > best.dist) best = { iata: iata, name: a[2], lat: a[0], lon: a[1], dist: d };
                }
            }
            window._farAirportCache = best;
            return best;
        };
        // Odmiana przez przypadki: 1 miasto / 2-4 miasta / 5+ miast (z wyjatkiem 12-14).
        window._plMiast = function(n){
            if (n === 1) return "1 miasto";
            var d = n % 10, s = n % 100;
            if (d >= 2 && d <= 4 && !(s >= 12 && s <= 14)) return n + " miasta";
            return n + " miast";
        };
        // --- ZAZNACZANIE MIASTA WPROST Z OKNA INTEL: TYLKO-DOPISUJACE (nie da sie stad odznaczyc -
        // cofniecie mozliwe tylko recznie, edycja visited-cities-data.js). Zaznaczenie miasta
        // automatycznie zaznacza tez cale panstwo (patrz window.markVisitedCountry ponizej). ---
        window.markVisitedCity = function(cc, name, onDone){
            if (!cc || !name) return;
            var id = window._cityId(cc, name);
            // Defensywa: gdyby nazwa znormalizowala sie do pustego ciagu (nazwa bez znakow lacinskich/cyfr),
            // ID byloby "CC|" i admin.php by je odrzucil dajac mylacy komunikat o LAN. W obecnych danych
            // wszystkie nazwy miast sa lacinskie, wiec to tylko zabezpieczenie na przyszlosc.
            if (!/\|[A-Z0-9]+$/.test(id)) { alert("Nie można oznaczyć tego miasta: nazwa nie daje się jednoznacznie zakodować."); return; }
            var set = window._visitedCitySet();
            if (set[id]) return;
            fetch("admin.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: "mark_visited_city_id=" + encodeURIComponent(id)
            }).then(function(r){ return r.json(); }).then(function(res){
                if (!res || !res.ok) { alert("BŁĄD ZAPISU: sprawdź połączenie z panelem admina (LAN)."); return; }
                set[id] = true;
                window._achCtxCache = null;   // nowe miasto -> uniewaznij memoizacje kontekstu osiagniec
                // Licznik miast i "najdalsze miasto" dla tego kraju sa zsnapshotowane - bez tego dymek
                // nad flaga i cel klikniecia pokazywalyby stan sprzed zaznaczenia.
                if (window._countryCityStatsCache) delete window._countryCityStatsCache[cc];
                window._farCityCache = null;   // rekord globalny liczy sie z powyzszych - tez do przeliczenia
                if (window._selectedCountryId && window.renderCountryPlaces) window.renderCountryPlaces(window._selectedCountryId);
                if (window.markVisitedCountry) window.markVisitedCountry(cc);
                if (onDone) onDone();
            }).catch(function(){ alert("BŁĄD SIECI: nie udało się zapisać. Spróbuj bezpośrednio w pliku."); });
        };
        // --- ZAZNACZANIE PANSTW/CUDOW WPROST Z OKNA INTEL: TYLKO-DOPISUJACE (nie da sie stad odznaczyc -
        // cofniecie wylacznie w adminie, patrz endpoint mark_visited_*_id w admin.php). Wywolywane po
        // potwierdzeniu (confirm()) w onclicku wiersza "ODWIEDZONE" w updateFactbookPanel/updateWonderIntel.
        // Uwaga: VISITED_COUNTRIES/VISITED_WONDERS to top-level "const" z osobnych plikow <script> - takie
        // deklaracje NIE tworza wlasciwosci na window, wiec trzeba odwolywac sie do nich po nazwie wprost
        // (nie da sie zrobic tego dynamicznie przez window[nazwa]). ---
        function _markVisitedGeneric(id, postKey, list, onDone){
            if (!id) return;
            if (list && list.indexOf(id) >= 0) return;
            fetch("admin.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: postKey + "=" + encodeURIComponent(id)
            }).then(function(r){ return r.json(); }).then(function(res){
                if (!res || !res.ok) { alert("BŁĄD ZAPISU: sprawdź połączenie z panelem admina (LAN)."); return; }
                if (list && list.indexOf(id) < 0) list.push(id);
                window._achCtxCache = null;   // nowy kraj/cud -> uniewaznij memoizacje kontekstu osiagniec
                if (window.refreshVisitedUI) window.refreshVisitedUI();
                if (onDone) onDone();
            }).catch(function(){ alert("BŁĄD SIECI: nie udało się zapisać. Spróbuj z panelu admina."); });
        }
        window.markVisitedCountry = function(id, onDone){
            _markVisitedGeneric(id, "mark_visited_country_id", (typeof VISITED_COUNTRIES !== 'undefined') ? VISITED_COUNTRIES : null, onDone);
        };
        // Uwaga: id cudu = kod ISO2 panstwa, w ktorym sie znajduje (patrz WONDERS w intel.js) -
        // zaznaczenie cudu automatycznie zaznacza wiec tez to panstwo.
        window.markVisitedWonder = function(id, onDone){
            _markVisitedGeneric(id, "mark_visited_wonder_id", (typeof VISITED_WONDERS !== 'undefined') ? VISITED_WONDERS : null, function(){
                if (window.markVisitedCountry) window.markVisitedCountry(id);
                if (onDone) onDone();
            });
        };
        // --- offset Warszawy w sekundach (realny, z DST) + formatka roznicy strefowej ---
        window._warsawOffSec = function(){
            var c = window._warsawOffCache;
            if (c && Date.now() - c.t < 60000) return c.v;
            var d = new Date();
            var loc = new Date(d.toLocaleString('en-US',{timeZone:'Europe/Warsaw'}));
            var utc = new Date(d.toLocaleString('en-US',{timeZone:'UTC'}));
            var v = Math.round((loc-utc)/60000)*60;
            window._warsawOffCache = { t: Date.now(), v: v };
            return v;
        };
        window._fmtTzDiff = function(sec){
            if (sec === 0) return "=WAW";
            var s = sec < 0 ? "-" : "+", a = Math.abs(sec);
            var h = Math.floor(a/3600), m = Math.round((a%3600)/60);
            return s + h + (m ? (":"+("0"+m).slice(-2)) : "") + "h";
        };
        // --- Zegar czasu lokalnego (tyka co 1s w #elId wg offsetu z open-meteo). Jedna implementacja
        // wspolna dla panelu kraju (#live-local-time) i miasta (#city-local-time) - wczesniej byly dwie
        // niemal identyczne kopie. Czysci poprzedni interwal; token/wyscig pilnuje wolajacy. ---
        window._startLiveClock = function(elId, offsetSeconds){
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            if (typeof offsetSeconds !== "number") return;
            var tick = function(){
                var el = document.getElementById(elId);
                if (!el) return;
                var now = new Date();
                var t = new Date(now.getTime() + (now.getTimezoneOffset()*60000) + (offsetSeconds*1000));
                var hms = ("0"+t.getHours()).slice(-2)+":"+("0"+t.getMinutes()).slice(-2)+":"+("0"+t.getSeconds()).slice(-2);
                el.innerText = hms + "  (" + window._fmtTzDiff(offsetSeconds - window._warsawOffSec()) + ")";
                el.style.color = "#00ff00"; el.style.animation = "none";
            };
            tick();
            window.liveClockInterval = setInterval(tick, 1000);
        };
        // Mapuje wiersz z CITIES_DB na obiekt "city intel" (konsumowany przez showCityIntel/updateCity*).
        // Jedno zrodlo ksztaltu - uzywane przez resolveCityIntel (trafienie w indeksie) i klik w wynik
        // wyszukiwarki miast (wczesniej ten sam literal byl wklejony w obu miejscach).
        window._cityObjFromRow = function(cc, row, isCap){
            return { cname: row[0], cap: !!isCap, lat: row[1], lng: row[2], wv: row[3], wiki: row[4], ta: row[5], un: row[6], pop: row[7], cc: cc };
        };
        window.resolveCityIntel = function(name, lat, lng) {
            if (!window._cityIndex && typeof CITIES_DB !== "undefined") {
                var idx = {};
                for (var cc in CITIES_DB) { (function(cc){ CITIES_DB[cc].forEach(function(c){ var k = window._normCity(c[0]); (idx[k] = idx[k] || []).push({ r: c, cc: cc }); }); })(cc); }
                window._cityIndex = idx;
            }
            var cand = (window._cityIndex && window._cityIndex[window._normCity(name)]) || [];
            var best = null, bestD = 9;
            cand.forEach(function(o){ var c = o.r; var d = Math.abs(c[1]-lat) + Math.abs(c[2]-lng); if (d < bestD) { bestD = d; best = o; } });
            if (best && bestD < 3) {
                var bc = best.r;
                // Wykryj, czy trafione miasto to stolica swojego kraju (ten sam indeks co _findCapitalIndex).
                // Wpis w indeksie trzyma referencje do tej samej tablicy z CITIES_DB, wiec porownanie === dziala.
                var _list = (typeof CITIES_DB !== "undefined") ? CITIES_DB[best.cc] : null;
                var _capIdx = (_list && window._findCapitalIndex) ? window._findCapitalIndex(best.cc, _list) : -1;
                var _isCap = (_capIdx >= 0 && _list && _list[_capIdx] === bc);
                return window._cityObjFromRow(best.cc, bc, _isCap);
            }
            var u = String(name).replace(/ /g, "_");
            var slug = String(name).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[’'.]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
            return { cname: name, cap: false, lat: lat, lng: lng,
                wv: "https://en.wikivoyage.org/wiki/" + u,
                wiki: "https://pl.wikipedia.org/wiki/" + u,
                ta: "https://www.tasteatlas.com/" + slug,
                un: "https://unsplash.com/s/photos/" + name };
        };
        window._bannerCache = window._bannerCache || {};
        window.fetchCityBanner = function(wvUrl, imgEl, token, lat, lng, id, wikiUrl) {
            if (!imgEl) return;
            // Utrwalanie: zapisany URL Wikimedia -> pobierz na serwer (endpoint cache_banner). Na LAN zapisze
            // plik /banery/<id>.jpg; poza LAN (GitHub Pages) POST cicho pada i baner leci wprost z Wikimedia.
            function persist(url){
                if (!id || !url || url.indexOf("https://upload.wikimedia.org/") !== 0) return;
                fetch("admin.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: "cache_banner_id=" + encodeURIComponent(id) + "&cache_banner_url=" + encodeURIComponent(url) }).catch(function(){});
            }
            // Rozwiazanie baneru z sieci (dotychczasowa logika Wikivoyage/Wikidata) - wolane tylko wtedy,
            // gdy nie ma jeszcze pliku lokalnego. Na sukces utrwala wynik przez persist().
            function runResolve(){
            if (!wvUrl || wvUrl.indexOf("/wiki/") < 0) return;
            var title = "";
            try { title = decodeURIComponent(wvUrl.split("/wiki/")[1] || ""); } catch(e) { title = wvUrl.split("/wiki/")[1] || ""; }
            if (!title) return;
            // Tytul artykulu Wikipedii (z dc.wiki) - potrzebny do fallbacku pageimages dla miast BEZ artykulu WV.
            var plHost = "pl.wikipedia.org", plTitle = "";
            if (wikiUrl && wikiUrl.indexOf("/wiki/") >= 0) {
                try { plTitle = decodeURIComponent(wikiUrl.split("/wiki/")[1] || ""); } catch(e) { plTitle = wikiUrl.split("/wiki/")[1] || ""; }
                try { plHost = (new URL(wikiUrl)).host || plHost; } catch(e) {}
            }
            function apply(url){ if (!url) return; if (window._cityIntelToken !== token) return; imgEl.src = url; imgEl.style.display = "block"; }
            function done(url){ window._bannerCache[title] = url || null; apply(url); persist(url); }
            if (Object.prototype.hasOwnProperty.call(window._bannerCache, title)) { apply(window._bannerCache[title]); return; }
            var WV = "https://en.wikivoyage.org/w/api.php?";
            var WD = "https://www.wikidata.org/w/api.php?";
            // Jesli tytul to strona ujednoznaczniajaca (disambig), wybierz wlasciwy artykul
            // po najblizszych wspolrzednych sposrod linkow z tej strony (np. Rochester).
            function _normTitle(x){ return String(x||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\(.*?\)/g," ").replace(/\bsainte?\b/g,"st").replace(/\bmount\b/g,"mt").replace(/\bfort\b/g,"ft").replace(/[^a-z0-9]/g,""); }
            // Ustal wlasciwy artykul Wikivoyage dla TEGO miasta (wg wspolrzednych).
            // Obsluguje: disambig (Rochester) ORAZ redirect na slynniejsze miasto (St. Petersburg -> Rosja).
            function resolveWvTitle(){
                if (typeof lat !== "number" || typeof lng !== "number") return Promise.resolve(title);
                var base = _normTitle(title);
                return fetch(WV + "action=query&prop=coordinates%7Cpageprops&ppprop=disambiguation&redirects=1&format=json&formatversion=2&origin=*&titles=" + encodeURIComponent(title))
                  .then(function(r){ return r.json(); }).then(function(dp){
                    var pg = ((dp && dp.query && dp.query.pages) || [])[0];
                    var rtitle = (pg && pg.title) || title;
                    var isDis = pg && pg.pageprops && (pg.pageprops.disambiguation !== undefined);
                    var co = pg && pg.coordinates && pg.coordinates[0];
                    if (!isDis && co) {
                        var plon = (co.lon != null ? co.lon : co.lng);
                        if (Math.abs(co.lat - lat) + Math.abs(plon - lng) < 1.0) return rtitle;   // artykul zgadza sie z miastem
                    }
                    // disambig / rozjazd wspolrzednych / brak coords -> szukaj po geolokalizacji wokol miasta
                    return fetch(WV + "action=query&list=geosearch&gscoord=" + lat + "%7C" + lng + "&gsradius=10000&gslimit=40&format=json&formatversion=2&origin=*")
                      .then(function(r){ return r.json(); }).then(function(dg){
                        var arr = (dg && dg.query && dg.query.geosearch) || [];
                        for (var i = 0; i < arr.length; i++) {
                            var nt = _normTitle(arr[i].title);
                            if (nt && base && (nt.indexOf(base) >= 0 || base.indexOf(nt) >= 0)) return arr[i].title;
                        }
                        // brak artykulu pasujacego nazwa. Strona ujednoznaczniajaca -> NIE pokazuj jej
                        // banera/linku (bezuzyteczny drogowskaz). Wariant C: wez najblizszy artykul regionu
                        // z geosearch (arr sortowane rosnaco po dystansie), a gdy nic w promieniu -> null
                        // (baner: nobaner; link WV zostaje na disambig, user sam wybierze wlasciwe miejsce).
                        if (isDis) return arr.length ? arr[0].title : null;
                        return rtitle;
                      }).catch(function(){ return isDis ? null : rtitle; });
                  }).catch(function(){ return title; });
            }
            function updateWvButton(eff, tok){
                if (window._cityIntelToken !== tok || eff === title) return;
                var b = document.getElementById("city-wv-btn");
                if (b) b.href = "https://en.wikivoyage.org/wiki/" + encodeURIComponent(String(eff).replace(/ /g, "_"));
            }
            function getThumb(file){
                file = String(file).trim().replace(/^File:/i, "").trim();
                if (!file) return Promise.resolve(null);
                // Thumb wpasowany w prostokat 1000x350 (iiurlwidth + iiurlheight) - Wikimedia skaluje
                // z ZACHOWANIEM proporcji. Cienkie pagebannery (7:1) ogranicza szerokosc (1000x143, bez
                // zmian ~10-90 KB), a normalne zdjecia ogranicza wysokosc (~500x350 zamiast 1000x667) -
                // to tnie "potwory" z 0.5-1 MB do ~60-90 KB. Bez utraty ostrosci na pasku 88px (do 4K@150%)
                // i BEZ zmiany kadrowania: object-fit:cover zalezy od proporcji, a te sa zachowane.
                return fetch(WV + "action=query&prop=imageinfo&iiprop=url&iiurlwidth=1000&iiurlheight=350&format=json&formatversion=2&origin=*&titles=" + encodeURIComponent("File:" + file))
                  .then(function(r){ return r.json(); }).then(function(d){
                    var pages = (d && d.query && d.query.pages) || [];
                    var ii = pages[0] && pages[0].imageinfo && pages[0].imageinfo[0];
                    return ii ? (ii.thumburl || ii.url) : null;
                  });
            }
            // Odsiew NIE-zdjec (mapy/herby/flagi/loga) z fallbackow P18/pageimages - baner ma byc zdjeciem.
            // Filtr po nazwie pliku: lapie wieksz? czesc, ale mapy nazwanej sama nazwa miejsca (np. dla
            // spornych wysepek) nie wykryje - taka pojedyncza wpadke poprawia sie recznie (patrz db-schema:
            // pin przez skopiowanie nobaner.jpg na banery/<id>.jpg -> baner pusty + harvest go pomija).
            function _isNonPhoto(name){
                if (!name) return false;
                if (/\.svg$/i.test(name)) return true;   // wektory to zwykle mapy/flagi/herby/loga
                return /coat|arms|wappen|blason|\bherb|crest|emblem|\bseal\b|sigill|flag|flaga|bandera|drapeau|\bmap\b|\bmapa\b|\bkarte\b|\bcarte\b|mappa|locat|orthographic|\bglobe\b|\blogo\b/i.test(name);
            }
            // Obraz z Wikidaty: najpierw P948 (dedykowany baner), potem P18 (zdjecie glowne obiektu -
            // jezykowo-niezalezne, laata miasta bez pagebannera). Zwraca URL thumba albo null.
            function wikidataImage(qid){
                return fetch(WD + "action=wbgetclaims&entity=" + encodeURIComponent(qid) + "&property=P948&format=json&origin=*")
                  .then(function(r){ return r.json(); }).then(function(dw){
                    var cl = dw && dw.claims && dw.claims.P948;
                    var val = cl && cl[0] && cl[0].mainsnak && cl[0].mainsnak.datavalue && cl[0].mainsnak.datavalue.value;
                    if (val) return getThumb(val);
                    return fetch(WD + "action=wbgetclaims&entity=" + encodeURIComponent(qid) + "&property=P18&format=json&origin=*")
                      .then(function(r){ return r.json(); }).then(function(dw2){
                        var cl2 = dw2 && dw2.claims && dw2.claims.P18;
                        var v2 = cl2 && cl2[0] && cl2[0].mainsnak && cl2[0].mainsnak.datavalue && cl2[0].mainsnak.datavalue.value;
                        return (v2 && !_isNonPhoto(v2)) ? getThumb(v2) : null;
                      }).catch(function(){ return null; });
                  }).catch(function(){ return null; });
            }
            // Zdjecie wiodace artykulu Wikipedii (pageimages). Dziala TEZ, gdy miasto nie ma artykulu na
            // Wikivoyage - stad kluczowe dla dziur. piprop=name -> nazwa pliku -> getThumb (ten sam cap
            // 1000x350 + rekompresja GD do JPG na serwerze). Odsiewamy herby/flagi/mapy/loga (zwykle SVG
            // albo takie slowo w nazwie) - baner ma byc zdjeciem, nie godlem. Zwraca URL albo null.
            function pageImage(host, ttl){
                if (!ttl) return Promise.resolve(null);
                return fetch("https://" + host + "/w/api.php?action=query&prop=pageimages&piprop=name&format=json&formatversion=2&redirects=1&origin=*&titles=" + encodeURIComponent(ttl))
                  .then(function(r){ return r.json(); }).then(function(d){
                    var pg = ((d && d.query && d.query.pages) || [])[0];
                    var name = pg && pg.pageimage;
                    if (_isNonPhoto(name)) name = null;
                    return name ? getThumb(name) : null;
                  }).catch(function(){ return null; });
            }
            // Fallback koncowy: pageimages z pl.wiki (dokladny tytul z dc.wiki) -> potem en.wiki (tytul z WV,
            // niepewny, ale druga szansa). resolvedTitle = tytul artykulu WV po redirectach.
            function pageImagesChain(resolvedTitle){
                return pageImage(plHost, plTitle).then(function(url){
                    if (url) return url;
                    return pageImage("en.wikipedia.org", resolvedTitle);
                });
            }
            // Lancuch fallbackow: P948 -> P18 -> pageimages(pl -> en). Gdy brak artykulu WV, qid=null i
            // od razu lecimy w pageimages (po tytule z dc.wiki). Terminalny done(url||null).
            function tryWikidata(resolvedTitle){
                return fetch(WV + "action=query&prop=pageprops&ppprop=wikibase_item&format=json&formatversion=2&redirects=1&origin=*&titles=" + encodeURIComponent(resolvedTitle))
                  .then(function(r){ return r.json(); }).then(function(dp){
                    var pgs = (dp && dp.query && dp.query.pages) || [];
                    var qid = pgs[0] && pgs[0].pageprops && pgs[0].pageprops.wikibase_item;
                    var wd = qid ? wikidataImage(qid) : Promise.resolve(null);
                    return wd.then(function(url){
                        if (url) { done(url); return; }
                        return pageImagesChain(resolvedTitle).then(function(u2){ done(u2 || null); });
                    });
                  }).catch(function(){ done(null); });
            }
            // 1) wikitekst -> {{pagebanner|Plik.jpg}} albo pierwszy plik z "banner" w nazwie
            //    UWAGA: pierwszy argument szablonu bywa nazwana opcja (np. {{pagebanner|dotm=yes|unesco=yes}}),
            //    dlatego szukamy argumentu ktory wyglada jak plik obrazu (ma rozszerzenie i nie jest key=value).
            resolveWvTitle().then(function(effectiveTitle){
              if (!effectiveTitle) { done(null); return; }   // terminal disambig bez sensownego artykulu w okolicy -> nobaner (nie pokazuj drogowskazu)
              updateWvButton(effectiveTitle, token);
              return fetch(WV + "action=parse&prop=wikitext&format=json&formatversion=2&redirects=1&origin=*&page=" + encodeURIComponent(effectiveTitle))
              .then(function(r){ return r.json(); }).then(function(d){
                var wt = (d && d.parse && d.parse.wikitext) || "";
                var rt = (d && d.parse && d.parse.title) || title;
                var file = null;
                // domyslny placeholder Wikivoyage (generyczna mapka swiata) — traktujemy jak brak banera,
                // by zejsc do Wikidata P948 (np. Grytviken: {{pagebanner|Pagebanner default.jpg}} -> Grytviken banner.jpg)
                function isDefaultBanner(f){
                    var n = String(f).trim().toLowerCase().replace(/_/g, " ").replace(/\s+/g, " ");
                    // placeholdery WV: "Pagebanner default.jpg", "S-amer africa default banner.jpg",
                    // "Asia default banner.jpg" itd. Zadne prawdziwe banery miast nie zawieraja "default".
                    return n.indexOf("default") >= 0;
                }
                var mb = wt.match(/\{\{\s*(?:pagebanner|PAGEBANNER)\s*\|([^}]*)/i);
                if (mb) {
                    var parts = mb[1].split("|");
                    for (var i = 0; i < parts.length; i++) {
                        var p = parts[i].trim();
                        if (p.indexOf("=") >= 0) continue;                  // pomijamy nazwane opcje (dotm=yes...)
                        if (/\.(?:jpe?g|png|gif|svg)$/i.test(p)) { if (isDefaultBanner(p)) continue; file = p; break; }
                    }
                }
                if (!file) { var m2 = wt.match(/([A-Za-z0-9][A-Za-z0-9 _().,'\-]*banner[A-Za-z0-9 _().,'\-]*\.(?:jpe?g|png|svg))/i); if (m2 && !isDefaultBanner(m2[1])) file = m2[1]; }
                // 2) jesli plik z wikitekstu istnieje -> uzyj; w innym razie fallback na Wikidata P948
                if (file) {
                    return getThumb(file).then(function(url){
                        if (url) { done(url); return; }
                        return tryWikidata(rt);   // plik nieaktualny/przeniesiony (np. Washington DC)
                    });
                }
                return tryWikidata(rt);           // brak pliku w szablonie (np. Ankara: {{pagebanner|dotm=yes}})
              });
            }).catch(function(){ window._bannerCache[title] = null; });
            }   // --- koniec runResolve() ---

            // 1) Najpierw proba pliku lokalnego /banery/<id>.jpg (niewidoczny Image()):
            //    onload  -> pokaz plik i KONIEC (zero sieci, brak ponownego sprawdzania -> stalosc
            //               banera + brak puchniecia Gita, bo nigdy nie nadpisujemy);
            //    onerror -> pokaz OD RAZU nobaner.jpg, a w tle rozwiaz baner z sieci; jesli sie znajdzie,
            //               runResolve podmieni obrazek i przez persist() zapisze go na LAN na przyszlosc.
            //               Jesli baneru brak - zostaje nobaner i NIC nie utrwalamy, wiec kolejna sesja
            //               sprobuje ponownie (celowo: laapiemy banery dodane na Wiki pozniej).
            // Miasta spoza CITIES_DB (brak id/cc) -> od razu stara sciezka, bez lokalnego cache.
            if (id) {
                var _localPath = "banery/" + id.replace("|", "_") + ".jpg";
                var _probe = new Image();
                _probe.onload = function(){ if (window._cityIntelToken !== token) return; imgEl.src = _localPath; imgEl.style.display = "block"; };
                _probe.onerror = function(){ if (window._cityIntelToken === token) { imgEl.src = "banery/nobaner.jpg"; imgEl.style.display = "block"; } runResolve(); };
                _probe.src = _localPath;
            } else {
                runResolve();
            }
        };
        // --- Deduplikacja zapytan do open-meteo: klik w kraj odpala DWIE funkcje w tym samym ticku
        // (updateWeatherPanel - panel pogody, updateFactbookPanel - tylko po zegar), obie po dokladnie
        // te same wspolrzedne stolicy. Bez tego leciały dwa identyczne fetche na te sama sekunde.
        // Cache trzyma Promise (nie gotowy wynik) przez krotkie okno, zeby drugi wywolujacy w tym
        // samym ticku dostal TEN SAM w locie fetch zamiast odpalac wlasny. ---
        // --- fetch z timeoutem (AbortController): bez tego zawieszone zapytanie (open-meteo / er-api /
        // FCDO / NASA) zostawia panel na "SCANNING…"/"UPLINK…" w nieskonczonosc. Po ms -> abort -> catch
        // u wywolujacego pokazuje "SIGNAL LOST"/OFFLINE. Brak AbortController (stare srodowisko) -> zwykly
        // fetch bez timeoutu (bez regresji). ---
        window._fetchTimeout = function(url, ms){
            ms = ms || 12000;
            if (typeof AbortController === "undefined") return fetch(url);
            var ctrl = new AbortController();
            var timer = setTimeout(function(){ ctrl.abort(); }, ms);
            return fetch(url, { signal: ctrl.signal }).finally(function(){ clearTimeout(timer); });
        };
        window._weatherFetchCache = window._weatherFetchCache || {};
        window._fetchWeather = function(lat, lon){
            var key = lat + "," + lon;
            var c = window._weatherFetchCache[key];
            if (c && (Date.now() - c.t) < 5000) return c.p;
            var p = window._fetchTimeout('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true&timezone=auto')
                .then(function(r){ return r.json(); });
            window._weatherFetchCache[key] = { t: Date.now(), p: p };
            return p;
        };
        // --- Kursy walut (baza PLN) - jedna tabela wszystkich kursow z open.er-api.com. Cache Promise
        // na 1h: wczesniej KAZDE klikniecie kraju z waluta != PLN robilo osobny, identyczny fetch. ---
        window._ratesPLNCache = window._ratesPLNCache || null;
        window._fetchRatesPLN = function(){
            var c = window._ratesPLNCache;
            if (c && (Date.now() - c.t) < 3600000) return c.p;
            var p = window._fetchTimeout('https://open.er-api.com/v6/latest/PLN').then(function(r){
                if (!r.ok) throw new Error("API Error");
                return r.json();
            }).catch(function(e){ window._ratesPLNCache = null; throw e; });   // blad -> nie zapamietuj, pozwol ponowic
            window._ratesPLNCache = { t: Date.now(), p: p };
            return p;
        };
        // --- Slugi timeanddate.com (przycisk CLIMATE, AVG) - jedna transformacja wspolna dla panelu
        // kraju (updateWeatherPanel, wg stolicy) i miasta (updateCityWeather, wg nazwy miasta). Kraj:
        // diakrytyki->ascii, lower, spacja->"-". Miasto: dodatkowo usuwa apostrofy. Lookupy TAD_*_OVERRIDES
        // zostaja u wywolujacego (rozne klucze: cc/id vs nazwa stolicy). ---
        window._tadCountrySlug = function(nameRaw){ return stripDiacritics(String(nameRaw).toLowerCase()).replace(/ /g, "-"); };
        window._tadCitySlug = function(nameRaw){ return stripDiacritics(String(nameRaw).toLowerCase()).replace(/['’]/g, "").replace(/ /g, "-"); };
        // --- Wspolny markup panelu pogody (siatka TEMP/WIND/ATMOSPHERE + linki WINDY/CLIMATE) -
        // uzywany zarowno dla kraju (updateWeatherPanel) jak i miasta (updateCityWeather), zeby
        // zmiana stylu/ukladu nie wymagala pilnowania dwoch kopii tego samego HTML-a. climateUrl
        // pusty/undefined -> przycisk CLIMATE pominiety (tak jak wczesniej dzialo to dla miasta). ---
        window._weatherEnvHTML = function(temp, wind, desc, icon, windyUrl, climateUrl){
            return '<div class="env-grid">'
              +   '<div class="env-item"><div class="env-label">TEMP SURFACE</div><div class="env-row"><div class="env-val">' + temp + '°C</div><div class="env-icon">' + icon + '</div></div></div>'
              +   '<div class="env-item"><div class="env-label">WIND VELOCITY</div><div class="env-row"><div class="env-val">' + wind + ' <span style="font-size:0.6rem">KM/H</span></div><div class="env-icon">💨</div></div></div>'
              +   '<div class="env-item" style="grid-column: span 2;"><div class="env-label">ATMOSPHERE STATUS</div><div class="env-val" style="font-size: 0.9rem;">' + desc + '</div></div>'
              + '</div>'
              + '<div class="links-grid">'
              +   '<a href="' + windyUrl + '" target="_blank" class="windy-btn">🌪️ WINDY (RADAR)</a>'
              +   (climateUrl ? '<a href="' + climateUrl + '" target="_blank" class="climate-btn">☀️ CLIMATE (AVG)</a>' : '')
              + '</div>';
        };
        // --- POGODA DLA MIASTA (LIVE ENVIRON FEED) — jak dla kraju, ale wg wspolrzednych miasta ---
        window.updateCityWeather = function(dc) {
            var wPanel = document.getElementById("weather-content");
            var wTarget = document.getElementById("weather-target");
            if (!wPanel || !wTarget) return;
            wTarget.innerText = "TARGET: " + String(dc.cname).toUpperCase();
            wPanel.innerHTML = '<div class="scanning-text">ESTABLISHING UPLINK...</div>';
            var token = (window._cityWeatherToken = (window._cityWeatherToken || 0) + 1);
            window._fetchWeather(dc.lat, dc.lng)
                .then(function(data){
                    if (window._cityWeatherToken !== token) return;   // uzytkownik kliknal gdzie indziej
                    window._startLiveClock("city-local-time", data.utc_offset_seconds);   // czas lokalny miasta (realny tz z open-meteo)
                    var cw = data.current_weather;
                    var temp = cw.temperature, wind = cw.windspeed, code = cw.weathercode;
                    var desc = getWeatherDesc(code), icon = getWeatherIcon(code);
                    var windyUrl = 'https://www.windy.com/?' + dc.lat + ',' + dc.lng + ',11';
                    var climateUrl = "";
                    if (dc.cc && typeof FACTBOOK !== 'undefined' && FACTBOOK[dc.cc]) {
                        var tadCountrySlug = (typeof TAD_COUNTRY_OVERRIDES !== 'undefined' && TAD_COUNTRY_OVERRIDES[dc.cc])
                            ? TAD_COUNTRY_OVERRIDES[dc.cc]
                            : window._tadCountrySlug(FACTBOOK[dc.cc].name.common);
                        var citySlug = window._tadCitySlug(dc.cname);
                        climateUrl = 'https://www.timeanddate.com/weather/' + tadCountrySlug + '/' + citySlug + '/climate';
                    }
                    wPanel.innerHTML = window._weatherEnvHTML(temp, wind, desc, icon, windyUrl, climateUrl);
                })
                .catch(function(err){
                    if (window._cityWeatherToken !== token) return;
                    console.error("City Weather Uplink Error:", err);
                    wPanel.innerHTML = '<div style="color: #dc2626; font-family: \'Consolas\', monospace; font-weight: bold;">⚠️ SIGNAL LOST</div>';
                    var _clk = document.getElementById("city-local-time"); if (_clk) { _clk.innerText = "OFFLINE"; _clk.style.color = "#dc2626"; _clk.style.animation = "none"; }
                });
        };
        // --- KLIMAT MIASTA: sparkline temp (srednia) + slupki opadu; normalne NASA POWER 2001-2020 ---
        // HYBRYDA: cache seedowany prekompilowanym CLIMATE_DB (climate-data.js) - trafienia renderuja
        // sie natychmiast, offline, bez sieci. Pudla (miasta spoza CITIES_DB / losowy punkt) leca
        // fallbackiem do NASA POWER ponizej. Seed jest per-klucz i tylko dla brakujacych kluczy, zeby
        // fallbackowe nulle/wpisy z sieci (dopisywane do _climateCache) nie trafialy do CLIMATE_DB.
        window._climateCache = window._climateCache || {};
        // SEED LENIWY: climate-data.js jest teraz ladowany z 'defer' (2.3 MB nie blokuje juz pierwszego
        // renderu), wiec CLIMATE_DB moze jeszcze nie istniec w chwili parsowania app.js. Zamiast seedowac
        // cache tutaj (jak dawniej, przy inicjalizacji), robimy to LENIWIE - przy pierwszym uzyciu panelu
        // klimatu, gdy CLIMATE_DB jest juz pewnie zaladowane (defer konczy sie przed DOMContentLoaded,
        // a klik w miasto jest pozniej). Kopiujemy tylko klucze, ktorych jeszcze nie ma w cache, zeby nie
        // nadpisac ewentualnych wpisow dociagnietych z sieci w tej sesji.
        window._climateSeeded = false;
        window._ensureClimateSeed = function(){
            if (window._climateSeeded || typeof CLIMATE_DB === 'undefined') return;
            for (var k in CLIMATE_DB) { if (!(k in window._climateCache)) window._climateCache[k] = CLIMATE_DB[k]; }
            window._climateSeeded = true;
        };
        window._climateSVG = function(d){
            var temp = d.temp, precip = d.precip;
            var tMin = Math.min.apply(null, temp), tMax = Math.max.apply(null, temp);
            var pad = Math.max(1, (tMax - tMin) * 0.12);
            var lo = tMin - pad, hi = tMax + pad;
            var pMax = Math.max.apply(null, precip) || 1;
            var W=300,H=114, x0=15,x1=291, yTop=24,yBot=80, yPmm=91, yLbl=106, step=(x1-x0)/11;
            function cx(i){ return x0+i*step; }
            function ty(t){ return yBot-(t-lo)/(hi-lo)*(yBot-yTop); }
            function tcol(t){ var f=Math.max(0,Math.min(1,(t+10)/45)); return "hsl("+(220*(1-f)).toFixed(0)+",85%,55%)"; }
            var LET="JFMAMJJASOND";
            var s='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="display:block; overflow:visible; font-family:\'JetBrains Mono\',monospace;">';
            // slupki opadu (mm/miesiac)
            var bw=step*0.56;
            for(var i=0;i<12;i++){ var bh=precip[i]/pMax*(yBot-yTop)*0.62; s+='<rect x="'+(cx(i)-bw/2).toFixed(1)+'" y="'+(yBot-bh).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+bh.toFixed(1)+'" rx="1" fill="#00ccff" opacity="0.32"/>'; }
            if(lo<0 && hi>0){ var yz=ty(0); s+='<line x1="'+x0+'" y1="'+yz.toFixed(1)+'" x2="'+x1+'" y2="'+yz.toFixed(1)+'" stroke="#fff" stroke-opacity="0.18" stroke-dasharray="2 3"/><text x="'+(x1+1)+'" y="'+(yz+3).toFixed(1)+'" fill="#aab4c0" font-size="7">0°</text>'; }
            s+='<line x1="'+x0+'" y1="'+yBot+'" x2="'+x1+'" y2="'+yBot+'" stroke="#fff" stroke-opacity="0.12"/>';
            var pts=""; for(i=0;i<12;i++){ pts+=cx(i).toFixed(1)+","+ty(temp[i]).toFixed(1)+" "; }
            s+='<polyline points="'+pts.trim()+'" fill="none" stroke="#facc15" stroke-width="1.7" stroke-linejoin="round"/>';
            function travelTier(t){ if(t>=18 && t<=27) return 2; if((t>=12 && t<18) || (t>27 && t<=32)) return 1; return 0; }
            var TIER_COL=["#ff4d4d","#eab308","#00ff55"];
            for(i=0;i<12;i++){
                var t=temp[i], tier=travelTier(t), X=cx(i).toFixed(1), Y=ty(t);
                if(tier===2){ s+='<circle cx="'+X+'" cy="'+Y.toFixed(1)+'" r="5" fill="#00ff44" opacity="0.20"/>'; }
                s+='<circle cx="'+X+'" cy="'+Y.toFixed(1)+'" r="2.6" fill="'+tcol(t)+'" stroke="#111" stroke-width="0.5"/>';
                s+='<text x="'+X+'" y="'+(Y-6).toFixed(1)+'" fill="#e6edf3" font-size="8.5" font-weight="bold" text-anchor="middle">'+Math.round(t)+'</text>';
                s+='<text x="'+X+'" y="'+yPmm+'" fill="#5fd0ff" font-size="7.5" text-anchor="middle">'+Math.round(precip[i])+'</text>';
                s+='<text x="'+X+'" y="'+yLbl+'" fill="'+TIER_COL[tier]+'" font-size="11" text-anchor="middle" font-weight="'+(tier===2?"bold":"600")+'">'+LET[i]+'</text>';
            }
            return s+'</svg>';
        };
        window.updateCityClimate = function(dc){
            var el=document.getElementById("city-climate"); if(!el) return;
            window._ensureClimateSeed();   // dociagnij lokalne normalne do cache przy pierwszym uzyciu (climate-data.js jest teraz deferred)
            var token=(window._climateToken=(window._climateToken||0)+1);
            var key=(Math.round(dc.lat*4)/4)+","+(Math.round(dc.lng*4)/4);
            function head(d){ var totP=Math.round(d.precip.reduce(function(a,b){return a+b;},0)); return ''
              +'<div style="display:flex; justify-content:space-between; align-items:baseline; margin-top:2px;"><span class="fact-key" style="color:#facc15;">KLIMAT</span><span style="font-family:\'JetBrains Mono\',monospace; font-size:0.68rem; color:#c6cfd9;">⌀'+d.annT.toFixed(1)+'°C · '+totP+' mm/rok</span></div>'
              +'<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.6rem; color:#9aa6b3; margin-top:1px; letter-spacing:0.2px;"><span style="color:#facc15;">━</span> temp °C&nbsp;&nbsp;<span style="color:#00ccff;">▮</span> opad mm/mies&nbsp;&nbsp;<span style="color:#ff4d4d;">●</span>źle&nbsp;<span style="color:#eab308;">●</span>ujdzie&nbsp;<span style="color:#00ff55;">●</span>super</div>'; }
            function render(d){ if(window._climateToken!==token) return; if(!d){ el.innerHTML=''; return; } el.innerHTML=head(d)+window._climateSVG(d); }
            if(Object.prototype.hasOwnProperty.call(window._climateCache,key)){ render(window._climateCache[key]); return; }
            el.innerHTML='<div style="color:#8b97a4; font-family:\'JetBrains Mono\',monospace; font-size:0.68rem; padding:3px 0;">KLIMAT: skan normalnych…</div>';
            window._fetchTimeout("https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M,PRECTOTCORR&community=AG&longitude="+dc.lng+"&latitude="+dc.lat+"&format=JSON")
              .then(function(r){ return r.json(); }).then(function(j){
                var pr=j&&j.properties&&j.properties.parameter;
                if(!pr||!pr.T2M){ window._climateCache[key]=null; render(null); return; }
                var MON=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"], DYS=[31,28,31,30,31,30,31,31,30,31,30,31];
                var temp=[],precip=[];
                for(var i=0;i<12;i++){
                    var t=pr.T2M[MON[i]]; if(t===undefined||t<=-900){ window._climateCache[key]=null; render(null); return; }
                    temp.push(t);
                    var p=pr.PRECTOTCORR?pr.PRECTOTCORR[MON[i]]:null;
                    precip.push((p!=null&&p>-900)?p*DYS[i]:0);
                }
                var ann=(pr.T2M.ANN!=null&&pr.T2M.ANN>-900)?pr.T2M.ANN:temp.reduce(function(a,b){return a+b;},0)/12;
                var data={temp:temp,precip:precip,annT:ann};
                window._climateCache[key]=data; render(data);
              }).catch(function(){ if(window._climateToken===token) el.innerHTML=''; });
        };
        window.showCityIntel = function(dc) {
            var fTarget = document.getElementById("factbook-target");
            var fPanel = document.getElementById("factbook-content");
            if (!fTarget || !fPanel) return;
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            fTarget.innerText = "INTEL: " + dc.cname.toUpperCase();
            var gm = "https://www.google.com/maps/place/" + dc.lat + "," + dc.lng;
            function btn(url, label, col) {
                if (!url) return '';
                return '<a href="'+url+'" target="_blank" class="windy-btn" style="background:rgba('+col+',0.15); border:1px solid rgb('+col+'); color:rgb('+col+');">'+label+'</a>';
            }
            function btnWide(url, label, col) {
                if (!url) return '';
                return '<a href="'+url+'" target="_blank" class="windy-btn" style="grid-column:1 / -1; background:rgba('+col+',0.12); border:1px solid rgb('+col+'); color:rgb('+col+');">'+label+'</a>';
            }
            var _cDistRow = '';
            if (typeof getDist === 'function' && dc.lat != null && dc.lng != null) {
                var _cDist = Math.round(getDist(52.2297, 21.0122, dc.lat, dc.lng));
                _cDistRow = '<div class="fact-row"><span class="fact-key">DIST. WAW:</span><span class="fact-val" style="color:#00ccff;">' + (_cDist < 1 ? "0 KM (HOME)" : _cDist.toLocaleString("pl-PL") + " KM") + '</span></div>';
            }
            var _cVisitedRow = '';
            var _isV = false;
            if (dc.cc) {
                var _vid = window._cityId(dc.cc, dc.cname);
                _isV = !!(window._visitedCitySet && window._visitedCitySet()[_vid]);
                _cVisitedRow = '<div class="fact-row" id="city-visited-row" style="cursor:' + (_isV ? 'default' : 'pointer') + ';" title="' + (_isV ? '' : 'Kliknij, zeby oznaczyc jako odwiedzone') + '"><span class="fact-key">ODWIEDZONE:</span><span class="fact-val" id="city-visited-val" style="color:' + (_isV ? '#22c55e' : '#8f9ba8') + ';">' + (_isV ? '✅ TAK' : '☐ NIE (kliknij)') + '</span></div>';
            }
            fPanel.innerHTML =
                '<img id="city-banner-img" alt="" style="display:none; width:100%; height:88px; object-fit:cover; object-position:center; border-radius:4px; margin-bottom:10px; border:1px solid rgba(250,204,21,0.35);">'
              + '<div class="fact-row" style="border:none;"><span class="fact-key">CITY:</span><span class="fact-val" style="color:#facc15; font-weight:bold;">'+ dc.cname +'</span></div>'
              + '<div class="fact-row"><span class="fact-key">TYPE:</span><span class="fact-val">'+ (dc.cap ? "🏛️ STOLICA" : "🏙️ MIASTO") +'</span></div>'
              + '<div class="fact-row"><span class="fact-key">POPULACJA:</span><span class="fact-val">'+ (dc.pop ? "👥 " + Number(dc.pop).toLocaleString("pl-PL") : "—") +'</span></div>'
              + _cVisitedRow
              + '<div class="fact-row"><span class="fact-key">CZAS LOKALNY:</span><span class="fact-val" id="city-local-time" style="color:#facc15; animation: blink 1s infinite;">CONNECTING...</span></div>'
              + _cDistRow
              + '<div id="city-climate" style="margin-top:6px;"></div>'
              + '<div class="links-grid" style="margin-top:12px;">'
              + btn(dc.wv, "🧭 WIKIVOYAGE", "52,211,153")
              + btn(dc.wiki, "📖 WIKIPEDIA", "0,212,255")
              + btn(dc.ta, "🍽️ TASTEATLAS", "244,164,96")
              + btn(gm, "📍 GOOGLE MAPS", "250,204,21")
              + btnWide(dc.un, "📷 UNSPLASH", "255,255,255")
              + '</div>';
            window._cityIntelToken = (window._cityIntelToken || 0) + 1;
            var _wb = fPanel.querySelector('a[href^="https://en.wikivoyage.org"]');
            if (_wb) _wb.id = "city-wv-btn";
            var _cvRow = document.getElementById("city-visited-row");
            if (_cvRow && dc.cc && !_isV) {
                _cvRow.onclick = function(){
                    if (!confirm("Oznaczyć \"" + dc.cname + "\" jako ODWIEDZONE MIASTO?\n\nUWAGA: cofnięcie tego będzie możliwe tylko ręcznie, bezpośrednio w pliku.")) return;
                    window.markVisitedCity(dc.cc, dc.cname, function(){
                        var valEl = document.getElementById("city-visited-val");
                        if (valEl) { valEl.textContent = "✅ TAK"; valEl.style.color = "#22c55e"; }
                        _cvRow.style.cursor = "default";
                        _cvRow.title = "";
                        _cvRow.onclick = null;
                        if (window.updateAchievementProgressBadge) window.updateAchievementProgressBadge();
                    });
                };
            }
            var _bimg = document.getElementById("city-banner-img");
            var _bBid = dc.cc ? window._cityId(dc.cc, dc.cname) : null;
            if (_bimg) window.fetchCityBanner(dc.wv, _bimg, window._cityIntelToken, dc.lat, dc.lng, _bBid, dc.wiki);
            window.updateCityWeather(dc);
            window.updateCityClimate(dc);
        };
        window.clearMyFlights = function() {
            if (window.flightLineSeries) window.flightLineSeries.data.clear();
            if (window.flightPointSeries) window.flightPointSeries.data.clear();
            window.myFlightsOn = false;
            var b = document.getElementById("myflights-toggle");
            if (b) { b.textContent = "✈ SHOW ON GLOBE"; b.classList.remove("active"); }
        };
        window.toggleMyFlights = function() {
            if (window.myFlightsOn) {
                window.clearMyFlights();
                if (typeof window.startRot === 'function') window.startRot();
                return;
            }
            if (typeof FLIGHTS_AP === 'undefined' || typeof FLIGHTS_LEGS === 'undefined') return;
            if (typeof window.stopRot === 'function') window.stopRot();
            if (window.pointSeries) window.pointSeries.data.clear();
            if (window.lineSeries) window.lineSeries.data.clear();
            if (window.airportSeries) window.airportSeries.data.clear();
            window._clearCitySeries();
            if (typeof window.resetIntelPanels === 'function') window.resetIntelPanels();
            var legs = FLIGHTS_LEGS.map(function(l){
                var a = FLIGHTS_AP[l[0]], b = FLIGHTS_AP[l[1]];
                if (!a || !b) return null;
                return { geometry: { type: "LineString", coordinates: [[a[1],a[0]],[b[1],b[0]]] } };
            }).filter(Boolean);
            if (window.flightLineSeries) window.flightLineSeries.data.setAll(legs);
            var pts = Object.keys(FLIGHTS_AP).map(function(k){ var a = FLIGHTS_AP[k]; return { geometry: { type: "Point", coordinates: [a[1],a[0]] }, iata: k, city: a[2] }; });
            if (window.flightPointSeries) window.flightPointSeries.data.setAll(pts);
            window.myFlightsOn = true;
            var btn = document.getElementById("myflights-toggle");
            if (btn) { btn.textContent = "✈ HIDE FROM GLOBE"; btn.classList.add("active"); }
            if (typeof window.rotateGlobe === 'function') window.rotateGlobe(40, 45);
        };
        // --- INTEL DLA CUDU (zdjecie + opis + 2 linki), styl jak przy krajach ---
        window.updateWonderIntel = function(w) {
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            var fT = document.getElementById("factbook-target"), fC = document.getElementById("factbook-content");
            window._standbyWeatherPanel();
            if (!fT || !fC) return;
            var d = (typeof WONDER_INTEL !== 'undefined') ? WONDER_INTEL[w.id] : null;
            fT.innerText = "INTEL: " + w.name;
            var _isWonderVisited = (typeof VISITED_WONDERS !== 'undefined') && VISITED_WONDERS.indexOf(w.id) >= 0;
            var wonderVisitedRowHtml = '<div class="fact-row" id="wonder-visited-row" style="cursor:' + (_isWonderVisited ? 'default' : 'pointer') + ';" title="' + (_isWonderVisited ? '' : 'Kliknij, zeby oznaczyc jako odwiedzone') + '"><span class="fact-key">ODWIEDZONE:</span><span class="fact-val" id="wonder-visited-val" style="color:' + (_isWonderVisited ? '#22c55e' : '#8f9ba8') + ';">' + (_isWonderVisited ? '✅ TAK' : '☐ NIE (kliknij)') + '</span></div>';
            if (!d) { fC.innerHTML = wonderVisitedRowHtml + '<div style="color: #8b97a4; font-family: \'Consolas\', monospace; font-size: 0.9rem;">NO INTEL DATA</div>'; }
            else {
                fC.innerHTML = `
                    <img src="${d.img}" class="wonder-img" alt="${w.name}" onerror="this.style.display='none'">
                    ${wonderVisitedRowHtml}
                    <div class="wonder-desc">${d.desc}</div>
                    <div class="links-grid">
                        <a href="${d.unsplash}" target="_blank" class="windy-btn" style="background: rgba(255,255,255,0.1); border: 1px solid #ffffff; color: #ffffff;">📸 UNSPLASH</a>
                        <a href="${d.wiki}" target="_blank" class="windy-btn" style="background: rgba(0,212,255,0.15); border: 1px solid #00d4ff; color: #00d4ff;">📖 WIKIPEDIA</a>
                    </div>
                `;
            }
            var _wVisRow = document.getElementById("wonder-visited-row");
            if (_wVisRow && !_isWonderVisited) {
                _wVisRow.onclick = function(){
                    if (!confirm("Oznaczyć \"" + w.name + "\" jako ODWIEDZONY CUD ŚWIATA?\n\nUWAGA: cofnięcie tego będzie możliwe tylko w panelu admina.")) return;
                    window.markVisitedWonder(w.id, function(){
                        var valEl = document.getElementById("wonder-visited-val");
                        if (valEl) { valEl.textContent = "✅ TAK"; valEl.style.color = "#22c55e"; }
                        _wVisRow.style.cursor = "default";
                        _wVisRow.title = "";
                        _wVisRow.onclick = null;
                    });
                };
            }
        };
        // --- INTEL DLA KONTYNENTU (glob + panstwa/powierzchnia/ludnosc) ---
        window.updateContinentIntel = function(cid) {
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            var fT = document.getElementById("factbook-target"), fC = document.getElementById("factbook-content");
            window._standbyWeatherPanel();
            if (!fT || !fC) return;
            var cont = (typeof CONTINENT_DATA !== 'undefined') ? CONTINENT_DATA.find(function(x){ return x.id === cid; }) : null;
            var info = (typeof CONTINENT_INTEL !== 'undefined') ? CONTINENT_INTEL[cid] : null;
            if (!cont) return;
            fT.innerText = "INTEL: " + cont.name;
            var img = info ? `<img src="${info.img}" class="continent-img" alt="${cont.name}" onerror="this.style.display='none'">` : "";
            var area = info ? info.area : "—";
            var pop  = info ? info.pop  : "—";
            var cities = (typeof CONTINENT_CITIES !== 'undefined') ? CONTINENT_CITIES[cid] : null;
            var citiesHtml = "";
            if (cities && cities.length) {
                citiesHtml = '<div class="fact-row" style="border:none; margin-top:10px; margin-bottom:2px;"><span class="fact-key" style="color:#facc15;">TOP 10 CITIES:</span></div><div class="cont-cities">';
                for (var ci=0; ci<cities.length; ci++) {
                    citiesHtml += '<div class="cont-city"><span class="cc-rank">'+(ci+1)+'.</span><span class="cc-name">'+cities[ci][0]+'</span><span class="cc-pop">'+cities[ci][1]+'</span></div>';
                }
                citiesHtml += '</div>';
            }
            var linksHtml = "";
            if (info && info.unsplash && info.wiki) {
                linksHtml = '<div class="links-grid" style="margin-top:10px;">'
                    + '<a href="'+info.unsplash+'" target="_blank" class="windy-btn" style="background: rgba(255,255,255,0.1); border: 1px solid #ffffff; color: #ffffff;">📸 UNSPLASH</a>'
                    + '<a href="'+info.wiki+'" target="_blank" class="windy-btn" style="background: rgba(0,212,255,0.15); border: 1px solid #00d4ff; color: #00d4ff;">📖 WIKIPEDIA</a>'
                    + '</div>';
            }
            fC.innerHTML = `
                ${img}
                <div class="fact-row"><span class="fact-key">COUNTRIES:</span><span class="fact-val" style="color:#facc15">${cont.total}</span></div>
                <div class="fact-row"><span class="fact-key">AREA:</span><span class="fact-val">${area}</span></div>
                <div class="fact-row"><span class="fact-key">POPULATION:</span><span class="fact-val">${pop}</span></div>
                ${citiesHtml}
                ${linksHtml}
            `;
        };
        window.focusContinent = function(cid) {
            var cont = (typeof CONTINENT_DATA !== 'undefined') ? CONTINENT_DATA.find(function(x){ return x.id === cid; }) : null;
            if (!cont || cont.lat === undefined) return;
            if (typeof stopRot === 'function') stopRot();
            if (window.myFlightsOn) window.clearMyFlights();
            if (window.lineSeries) window.lineSeries.data.clear();
            if (window.pointSeries) window.pointSeries.data.clear();
            if (window.airportSeries) window.airportSeries.data.clear();
            if (window.cityDotSeries) window.cityDotSeries.data.clear();
            if (window.showCityLegend) window.showCityLegend(false);
            if (window.showAirportModeBtn) window.showAirportModeBtn(false);
            if (window.clearCountryHighlight) window.clearCountryHighlight();
            if (window.cityLabelSeries) {
                window.cityLabelSeries.data.clear();
                var _cc = (typeof CONTINENT_CITIES !== 'undefined') ? CONTINENT_CITIES[cid] : null;
                if (_cc && _cc.length) {
                    window.cityLabelSeries.data.setAll(_cc.filter(function(x){ return x.length >= 4; }).map(function(x){ return { geometry: { type: "Point", coordinates: [x[3], x[2]] }, cname: x[0], lat: x[2], lng: x[3] }; }));
                }
            }
            window.updateContinentIntel(cid);
            if (typeof rotateGlobe === 'function') rotateGlobe(cont.lat, cont.lon);
        };
        // --- LISTA PANSTW KONTYNENTU (klik w licznik "35/45" w Continental Control) ---
        // Zrodlo listy: REGION_MAP (te same wpisy, z ktorych liczy sie licznik panelu) - dzieki temu
        // liczba pozycji w oknie zawsze zgadza sie z mianownikiem CONTINENT_DATA.total.
        window.hideContinentCountries = function(){
            var el = document.getElementById("cont-countries-overlay");
            if (el) el.style.display = "none";
        };
        window.showContinentCountries = function(cid) {
            var cont = (typeof CONTINENT_DATA !== 'undefined') ? CONTINENT_DATA.find(function(x){ return x.id === cid; }) : null;
            if (!cont || typeof REGION_MAP === 'undefined') return;
            var el = document.getElementById("cont-countries-overlay");
            if (!el) {
                el = document.createElement("div");
                el.id = "cont-countries-overlay";
                el.style.cssText = "display:none; position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); align-items:center; justify-content:center;";
                el.innerHTML =
                    '<div style="background:rgba(8,8,10,0.96); border:1px solid rgba(250,204,21,0.4); border-radius:8px; padding:22px; width:min(820px,92vw); max-height:85vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.6); font-family:\'Rajdhani\',sans-serif;">'
                  +   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">'
                  +     '<h1 id="cont-countries-title" style="margin:0; border:none; padding:0; font-size:1.3rem;"></h1>'
                  +     '<span id="cont-countries-close" style="cursor:pointer; font-size:1.5rem; color:#8f9ba8; line-height:1;">✕</span>'
                  +   '</div>'
                  +   '<div id="cont-countries-progress" style="font-family:\'JetBrains Mono\',monospace; font-size:0.85rem; letter-spacing:0.5px; color:#facc15; margin-bottom:14px;"></div>'
                  +   '<div id="cont-countries-body" style="display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:7px;"></div>'
                  + '</div>';
                document.body.appendChild(el);
                el.addEventListener("click", function(e){ if (e.target === el) window.hideContinentCountries(); });
                document.getElementById("cont-countries-close").onclick = window.hideContinentCountries;
            }
            var visitedSet = {};
            ((typeof VISITED_COUNTRIES !== 'undefined') ? VISITED_COUNTRIES : []).forEach(function(c){ visitedSet[c] = true; });
            var codes = Object.keys(REGION_MAP).filter(function(c){ return REGION_MAP[c] === cid; });
            var rows = codes.map(function(code){
                return {
                    code: code,
                    name: (typeof FACTBOOK !== 'undefined' && FACTBOOK[code]) ? FACTBOOK[code].name.common : code,
                    on: !!visitedSet[code]
                };
            }).sort(function(a,b){
                if (a.on !== b.on) return a.on ? -1 : 1; // najpierw zaliczone, potem brakujace
                return a.name.localeCompare(b.name);      // alfabetycznie wewnatrz kazdej grupy
            });
            var done = rows.filter(function(r){ return r.on; }).length;
            document.getElementById("cont-countries-title").innerText = "🌐 " + cont.name;
            document.getElementById("cont-countries-progress").innerText =
                done + " / " + rows.length + " (" + Math.round((done / rows.length) * 100) + "%) — ZALICZONE";
            // Nazwa idzie Rajdhani 0.95rem/600, nie monospace 0.72rem - czytelniejsza przy tej samej
            // szerokosci kolumny. Czerwien: nasycone #ff4d4d (jasniejsze warianty typu #fca5a5 czytaly
            // sie jako rozowe); zielen rozjasniona do #86efac, bo #4ade80 gubil kontrast na czarnym tle.
            document.getElementById("cont-countries-body").innerHTML = rows.map(function(r){
                var col = r.on ? "#86efac" : "#ff4d4d";
                var flag = (window._flagSrc && window._flagSrc(r.code))
                    ? '<img src="' + window._flagSrc(r.code) + '" style="width:22px; height:15px; object-fit:cover; flex:0 0 22px; border:1px solid rgba(255,255,255,0.25);" alt="">'
                    : '<span style="flex:0 0 22px;"></span>';
                return '<div onclick="window.hideContinentCountries(); window.focusRankTarget(\'' + r.code + '\');" '
                  +   'style="display:flex; gap:10px; align-items:center; padding:8px 10px; cursor:pointer; border:1px solid rgba(255,255,255,0.08); border-left:3px solid ' + col + '; border-radius:3px; background:rgba(255,255,255,0.04);">'
                  +   flag
                  +   '<span style="font-size:0.95rem; font-weight:600; letter-spacing:0.4px; color:' + col + '; line-height:1.25;">' + r.name + '</span>'
                  +   '<span style="margin-left:auto; font-size:0.9rem; font-weight:700; color:' + col + ';">' + (r.on ? '✔' : '✕') + '</span>'
                  + '</div>';
            }).join('');
            el.style.display = "flex";
        };
        // --- SPIS ODWIEDZONYCH PANSTW (klik w duzy licznik "38" w Operative Status) ---
        // "38" = currentScore = rankedVisits (uniqueVisited - EXCLUDED_CODES), liczone w refreshVisitedUI.
        // Sasiedzi licznika maja juz swoje klik-cele (nazwa rangi -> paszport, pasek XP -> plan rangi,
        // pasek odznak -> osiagniecia); sam licznik byl jedynym elementem panelu bez akcji. Pokazuje
        // DOKLADNIE panstwa skladajace sie na te liczbe, pogrupowane po kontynencie. Okno w tej samej
        // konwencji co showContinentCountries (overlay budowany leniwie, flaga z _flagSrc, nazwa z FACTBOOK).
        window.hideVisitedCountries = function(){
            var el = document.getElementById("visited-countries-overlay");
            if (el) el.style.display = "none";
        };
        window.showVisitedCountries = function(){
            if (typeof REGION_MAP === 'undefined') return;
            var el = document.getElementById("visited-countries-overlay");
            if (!el) {
                el = document.createElement("div");
                el.id = "visited-countries-overlay";
                el.style.cssText = "display:none; position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); align-items:center; justify-content:center;";
                el.innerHTML =
                    '<div style="background:rgba(8,8,10,0.96); border:1px solid rgba(250,204,21,0.4); border-radius:8px; padding:22px; width:min(820px,92vw); max-height:85vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.6); font-family:\'Rajdhani\',sans-serif;">'
                  +   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">'
                  +     '<h1 style="margin:0; border:none; padding:0; font-size:1.3rem;">🗺️ ODWIEDZONE PAŃSTWA</h1>'
                  +     '<span id="visited-countries-close" style="cursor:pointer; font-size:1.5rem; color:#8f9ba8; line-height:1;">✕</span>'
                  +   '</div>'
                  +   '<div id="visited-countries-progress" style="font-family:\'JetBrains Mono\',monospace; font-size:0.85rem; letter-spacing:0.5px; color:#facc15; margin-bottom:14px;"></div>'
                  +   '<div id="visited-countries-body"></div>'
                  + '</div>';
                document.body.appendChild(el);
                el.addEventListener("click", function(e){ if (e.target === el) window.hideVisitedCountries(); });
                document.getElementById("visited-countries-close").onclick = window.hideVisitedCountries;
            }
            // Zrodlo = ta sama lista, ktora daje "38": _rankState.visited (rankedVisits). Fallback liczy ja
            // recznie tym samym wzorem (unikaty VISITED_COUNTRIES - EXCLUDED_CODES), gdyby panel otworzyl sie
            // zanim refreshVisitedUI ustawi _rankState - inaczej spis roznilby sie od widocznego licznika.
            var codes;
            if (window._rankState && Array.isArray(window._rankState.visited) && window._rankState.visited.length) {
                codes = window._rankState.visited.slice();
            } else {
                var uniq = Array.from(new Set((typeof VISITED_COUNTRIES !== 'undefined') ? VISITED_COUNTRIES : []));
                var excl = (typeof EXCLUDED_CODES !== 'undefined') ? EXCLUDED_CODES : [];
                codes = uniq.filter(function(c){ return excl.indexOf(c) === -1; });
            }
            var nameOf = function(c){ return (typeof FACTBOOK !== 'undefined' && FACTBOOK[c]) ? FACTBOOK[c].name.common : c; };
            // Kubelki per kontynent w kolejnosci CONTINENT_DATA. Kod bez REGION_MAP (nie powinno sie zdarzyc,
            // bo rankedVisits nie zawiera terytoriow) laduje w "INNE" - zeby nigdy nie wypadl ze spisu po cichu.
            var buckets = {};
            codes.forEach(function(c){
                var r = REGION_MAP[c] || "_OTHER";
                (buckets[r] = buckets[r] || []).push(c);
            });
            var order = (typeof CONTINENT_DATA !== 'undefined') ? CONTINENT_DATA.map(function(x){ return { id: x.id, name: x.name }; }) : [];
            if (buckets["_OTHER"]) order.push({ id: "_OTHER", name: "INNE" });
            document.getElementById("visited-countries-progress").innerText =
                codes.length + " " + (codes.length === 1 ? "PAŃSTWO" : "PAŃSTW") + " — LICZĄCE SIĘ DO RANGI";
            var html = "";
            order.forEach(function(g){
                var list = buckets[g.id];
                if (!list || !list.length) return;
                list.sort(function(a, b){ return nameOf(a).localeCompare(nameOf(b), "pl"); });
                html += '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.75rem; letter-spacing:2px; color:#c6cfd9; font-weight:700; margin:16px 0 8px;">'
                      + g.name.toUpperCase() + ' <span style="color:#6b7684;">· ' + list.length + '</span></div>'
                      + '<div style="display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:7px;">';
                html += list.map(function(code){
                    var flag = (window._flagSrc && window._flagSrc(code))
                        ? '<img src="' + window._flagSrc(code) + '" style="width:22px; height:15px; object-fit:cover; flex:0 0 22px; border:1px solid rgba(255,255,255,0.25);" alt="">'
                        : '<span style="flex:0 0 22px;"></span>';
                    return '<div onclick="window.hideVisitedCountries(); window.focusRankTarget(\'' + code + '\');" '
                      +   'style="display:flex; gap:10px; align-items:center; padding:8px 10px; cursor:pointer; border:1px solid rgba(255,255,255,0.08); border-left:3px solid #86efac; border-radius:3px; background:rgba(255,255,255,0.04);">'
                      +   flag
                      +   '<span style="font-size:0.95rem; font-weight:600; letter-spacing:0.4px; color:#86efac; line-height:1.25;">' + nameOf(code) + '</span>'
                      + '</div>';
                }).join('');
                html += '</div>';
            });
            document.getElementById("visited-countries-body").innerHTML = html;
            el.style.display = "flex";
        };
        // --- PLAN DOJSCIA DO RANGI (klik w pozycje na liscie rang po prawej) ---
        // Stan liczony w refreshVisitedUI (window._rankState), zeby nie duplikowac tu logiki XP
        // (dedup + EXCLUDED_CODES). Panel renderuje sie w tym samym miejscu co intel krajow/cudow.
        // Wymog wizowy dla PL: VISA_PL_OVERRIDES (reczne korekty z MSZ) ma pierwszenstwo przed VISA_PL
        // (generowany dataset). Jedno zrodlo dla trybu wizowego mapy i dla paneli intelu - bez tego
        // panele czytalyby goly VISA_PL i ignorowaly korekty (np. TW/XK, ktorych dataset nie ma).
        window._visaFor = function(id) {
            if (typeof VISA_PL_OVERRIDES !== "undefined" && VISA_PL_OVERRIDES[id]) return VISA_PL_OVERRIDES[id];
            return (typeof VISA_PL !== "undefined") ? VISA_PL[id] : null;
        };
        window._visaEasy = function(v) {
            if (!v) return false;
            var s = String(v).toLowerCase();
            if (s.indexOf("required") >= 0) return false;
            return true; // liczba dni / visa free / visa on arrival / e-visa
        };
        // Kandydaci na domkniecie progu: nieodwiedzone kraje ze stolica, bez kodow spoza XP.
        // Sort: najpierw "latwe" (bez wizy + bezpieczenstwo <= 3), potem po dystansie OD DOMU (PL).
        // Dystans liczymy wylacznie z Warszawy - liczenie od najblizszego odwiedzonego/planowanego
        // kraju dawalo liczby bez sensu w oderwaniu od kontekstu (np. "316 km" do Singapuru z KL).
        // Zwraca ZAWSZE 'limit' propozycji (nie tyle, ile brakuje do progu) - lista ma dawac wybor.
        window._rankCandidates = function(visited, limit) {
            if (typeof CAPITAL_COORDS === 'undefined' || typeof getDist !== 'function') return [];
            var excl = (typeof EXCLUDED_CODES !== 'undefined') ? EXCLUDED_CODES : [];
            var seen = {};
            visited.forEach(function(c){ seen[c] = 1; });
            var home = CAPITAL_COORDS["PL"];
            var rows = Object.keys(CAPITAL_COORDS).filter(function(c){
                return !seen[c] && excl.indexOf(c) === -1;
            }).map(function(c){
                var p = CAPITAL_COORDS[c];
                var visa = window._visaFor(c) || "";
                var safe = (typeof SAFETY_OVERRIDE !== 'undefined' && SAFETY_OVERRIDE[c]) ? SAFETY_OVERRIDE[c] : 0;
                return {
                    code: c,
                    dist: home ? Math.round(getDist(p[0], p[1], home[0], home[1])) : null,
                    visa: visa,
                    safe: safe,
                    cost: (typeof COST_INDEX !== 'undefined' && COST_INDEX[c]) ? COST_INDEX[c] : "",
                    easy: (window._visaEasy(visa) && safe > 0 && safe <= 3)
                };
            });
            rows.sort(function(a, b){
                if (a.easy !== b.easy) return a.easy ? -1 : 1;
                if (a.dist === null) return 1;
                if (b.dist === null) return -1;
                return a.dist - b.dist;
            });
            return rows.slice(0, limit);
        };
        // Punkt trasy misji -> kraj. route[] ma tylko city/lat/lon (bez ISO), wiec dopasowujemy po
        // wspolrzednych do najblizszego miasta z CITIES_DB (nie po nazwie - te sie powtarzaja miedzy
        // krajami i roznia zapisem). Prog 100 km odrzuca punkty nad morzem/pustkowiem zamiast zgadywac.
        window._countryAtPoint = function(lat, lon) {
            if (typeof CITIES_DB === 'undefined' || typeof getDist !== 'function') return null;
            if (!window._cAtPtCache) window._cAtPtCache = {};
            var key = lat.toFixed(3) + "," + lon.toFixed(3);
            if (key in window._cAtPtCache) return window._cAtPtCache[key];
            var best = null, bestD = Infinity;
            for (var cc in CITIES_DB) {
                var list = CITIES_DB[cc];
                for (var i = 0; i < list.length; i++) {
                    var d = getDist(lat, lon, list[i][1], list[i][2]);
                    if (d < bestD) { bestD = d; best = cc; }
                }
            }
            var res = (bestD <= 100) ? best : null;
            window._cAtPtCache[key] = res;
            return res;
        };
        // Kraje, ktore i tak zaliczysz na zaplanowanych misjach (returnDate w przyszlosci - MISSIONS_DB
        // trzyma tez misje odbyte). Zrodlo: mission.flag (kraj docelowy) + kraje z przystankow route.
        window._plannedMissionTargets = function() {
            if (typeof MISSIONS_DB === 'undefined') return [];
            var now = Date.now(), out = [], seen = {};
            MISSIONS_DB.forEach(function(m){
                if (!m.returnDate || new Date(m.returnDate).getTime() <= now) return;
                var codes = [];
                if (m.flag) codes.push(m.flag);
                (m.route || []).forEach(function(p){
                    var c = window._countryAtPoint(p.lat, p.lon);
                    if (c) codes.push(c);
                });
                codes.forEach(function(c){
                    if (seen[c]) return;
                    seen[c] = 1;
                    out.push({ code: c, mission: m.name });
                });
            });
            return out;
        };
        // Kraje JEDNEJ misji (cel + przystanki trasy), bez duplikatow. Kolejnosc: cel, potem trasa.
        window._missionCountries = function(m) {
            var out = [], seen = {};
            var push = function(c){ if (c && !seen[c]) { seen[c] = 1; out.push(c); } };
            if (m.flag) push(m.flag);
            (m.route || []).forEach(function(p){ push(window._countryAtPoint(p.lat, p.lon)); });
            return out;
        };
        // Trasa BEZ przystankow w kraju domowym. Kazda misja startuje i konczy sie w Warszawie, wiec
        // bez tego filtra "przy okazji" podpowiadalo Bialorus i Neuschwanstein "893 km od Warszawa" -
        // czyli rzeczy niemajace nic wspolnego z wyprawa.
        window._missionAwayRoute = function(m) {
            return (m.route || []).filter(function(p){ return window._countryAtPoint(p.lat, p.lon) !== "PL"; });
        };
        // Nieodwiedzone cuda swiata lezace przy trasie misji (do najblizszego punktu trasy).
        window._missionWonders = function(m, maxKm) {
            if (typeof WONDERS === 'undefined' || typeof getDist !== 'function') return [];
            var vis = (typeof VISITED_WONDERS !== 'undefined') ? VISITED_WONDERS : [];
            var route = window._missionAwayRoute(m);
            if (!route.length) return [];
            var out = [];
            WONDERS.forEach(function(w){
                if (vis.indexOf(w.id) >= 0) return;
                var best = Infinity, bestCity = null;
                route.forEach(function(p){
                    var d = getDist(w.lat, w.lon, p.lat, p.lon);
                    if (d < best) { best = d; bestCity = p.city; }
                });
                if (best <= maxKm) out.push({ w: w, dist: Math.round(best), city: bestCity });
            });
            out.sort(function(a, b){ return a.dist - b.dist; });
            return out;
        };
        // Nieodwiedzone kraje "przy okazji" trasy misji. Tu - inaczej niz w planie rangi - dystans
        // liczymy OD TRASY (a nie z domu), bo o to wlasnie chodzi: co dolozyc, skoro i tak tam bedziesz.
        window._missionNearby = function(m, visited, maxKm, limit) {
            if (typeof CAPITAL_COORDS === 'undefined' || typeof getDist !== 'function') return [];
            var excl = (typeof EXCLUDED_CODES !== 'undefined') ? EXCLUDED_CODES : [];
            var route = window._missionAwayRoute(m);
            if (!route.length) return [];
            var seen = {};
            visited.forEach(function(c){ seen[c] = 1; });
            window._missionCountries(m).forEach(function(c){ seen[c] = 1; }); // te i tak wpadaja
            var out = [];
            Object.keys(CAPITAL_COORDS).forEach(function(c){
                if (seen[c] || excl.indexOf(c) >= 0) return;
                var p = CAPITAL_COORDS[c], best = Infinity, bestCity = null;
                route.forEach(function(rp){
                    var d = getDist(p[0], p[1], rp.lat, rp.lon);
                    if (d < best) { best = d; bestCity = rp.city; }
                });
                if (best > maxKm) return;
                var visa = window._visaFor(c) || "";
                out.push({ code: c, dist: Math.round(best), city: bestCity, visa: visa });
            });
            out.sort(function(a, b){ return a.dist - b.dist; });
            return out.slice(0, limit);
        };
        // Data powrotu z ostatniej zaplanowanej misji (czyli moment, w ktorym estymata sie ziszcza).
        window._plannedMissionEnd = function() {
            if (typeof MISSIONS_DB === 'undefined') return null;
            var now = Date.now(), last = null;
            MISSIONS_DB.forEach(function(m){
                if (!m.returnDate) return;
                var t = new Date(m.returnDate).getTime();
                if (t > now && (last === null || t > last)) last = t;
            });
            return last;
        };
        // Ranga dla dowolnego wyniku - ta sama logika progow co licznik XP w refreshVisitedUI.
        window._rankIndexFor = function(score) {
            var idx = 0;
            for (var i = 0; i < RANKS.length; i++) {
                if (score >= RANKS[i].min) idx = i; else break;
            }
            return idx;
        };
        // Klik w kandydata: to samo co wybor kraju z wyszukiwarki (globus + pogoda + factbook).
        window.focusRankTarget = function(code) {
            var coords = (typeof CAPITAL_COORDS !== 'undefined') ? CAPITAL_COORDS[code] : null;
            if (!coords) return;
            var name = (typeof FACTBOOK !== 'undefined' && FACTBOOK[code]) ? FACTBOOK[code].name.common.toUpperCase() : code;
            if (typeof stopRot === 'function') stopRot();
            if (window.myFlightsOn) window.clearMyFlights();
            if (window.lineSeries) window.lineSeries.data.clear();
            if (window.airportSeries) window.airportSeries.data.clear();
            if (window._clearCitySeries) window._clearCitySeries();
            if (window.showCityLegend) window.showCityLegend(false);
            if (window.showAirportModeBtn) window.showAirportModeBtn(false);
            if (window.clearCountryHighlight) window.clearCountryHighlight();
            if (window.pointSeries) window.pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [coords[1], coords[0]] }, type: "target" }]);
            if (typeof rotateGlobe === 'function') rotateGlobe(coords[0], coords[1]);
            if (window.updateWeatherPanel) window.updateWeatherPanel(code, name, coords[0], coords[1]);
            if (window.updateFactbookPanel) window.updateFactbookPanel(code, name);
        };
        // --- INTEL MISJI (klik w link TARGET) - co ta wyprawa realnie da: kraje, ranga, data,
        // kraje i cuda mozliwe do dolozenia przy okazji trasy. ---
        window.updateMissionIntel = function(m) {
            var st = window._rankState;
            var fT = document.getElementById("factbook-target"), fC = document.getElementById("factbook-content");
            if (!fT || !fC || !m) return;
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            window._standbyWeatherPanel();
            fT.innerText = "MISJA: " + m.name;
            var visited = st ? st.visited : [];
            var score = st ? st.score : 0;
            var excl = (typeof EXCLUDED_CODES !== 'undefined') ? EXCLUDED_CODES : [];
            var all = window._missionCountries(m);
            var fresh = all.filter(function(c){ return visited.indexOf(c) === -1 && excl.indexOf(c) === -1; });
            var html = window._panelBanner("foty/travel.jpg");
            var dTxt = m.date ? new Date(m.date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "?";
            var rTxt = m.returnDate ? new Date(m.returnDate).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "?";
            html += '<div class="fact-row"><span class="fact-key">WYLOT:</span><span class="fact-val">' + dTxt + '</span></div>' +
                    '<div class="fact-row"><span class="fact-key">POWRÓT:</span><span class="fact-val">' + rTxt + '</span></div>' +
                    '<div class="fact-row"><span class="fact-key">PRZYSTANKÓW:</span><span class="fact-val">' + ((m.route || []).length) + '</span></div>';
            var row = function(code, right, col){
                var nm = (typeof FACTBOOK !== 'undefined' && FACTBOOK[code]) ? FACTBOOK[code].name.common : code;
                var flag = window._flagSrc ? window._flagSrc(code) : null;
                var img = flag ? '<img src="' + flag + '" alt="' + code + '" class="row-flag">' : '';
                return '<div class="fact-row rank-target-row" data-code="' + code + '" style="cursor:pointer;" title="Pokaż ' + nm + ' na globusie">' +
                       '<span class="fact-key" style="color:' + col + ';">' + img + nm.toUpperCase() + '</span>' +
                       '<span class="fact-val" style="color:' + col + ';">' + right + '</span></div>';
            };
            // 1. Co wpada z tej misji
            if (fresh.length) {
                var est = score + fresh.length;
                var estIdx = window._rankIndexFor(est);
                html += '<div class="wonder-desc">Nowe kraje z tej wyprawy (' + fresh.length + '):</div>';
                fresh.forEach(function(c){ html += row(c, '🎯 NOWY', '#22c55e'); });
                html += '<div class="fact-row"><span class="fact-key">PO WYPRAWIE:</span><span class="fact-val" style="color:#22c55e;">' + est + ' krajów · ' + RANKS[estIdx].title + '</span></div>';
                if (st && estIdx > st.idx) {
                    html += '<div class="fact-row"><span class="fact-key">AWANS:</span><span class="fact-val" style="color:#22c55e;">' + RANKS[st.idx].title + ' → ' + RANKS[estIdx].title + '</span></div>';
                }
            } else {
                html += '<div class="wonder-desc">Ta wyprawa nie dorzuca nowych krajów - wszystkie na trasie już masz.</div>';
            }
            var seenAgain = all.filter(function(c){ return visited.indexOf(c) >= 0; });
            if (seenAgain.length) {
                html += '<div class="wonder-desc">Na trasie, ale już zaliczone: ' + seenAgain.map(function(c){
                    return (typeof FACTBOOK !== 'undefined' && FACTBOOK[c]) ? FACTBOOK[c].name.common.toUpperCase() : c;
                }).join(', ') + '.</div>';
            }
            // 2. Kraje do dolozenia przy okazji (dystans OD TRASY)
            var near = window._missionNearby(m, visited, 500, 8);
            if (near.length) {
                html += '<div class="wonder-desc">Nieodwiedzone kraje blisko trasy:</div>';
                near.forEach(function(n){
                    var right = n.dist.toLocaleString('pl-PL') + ' km od ' + n.city + (n.visa ? ' · ' + n.visa : '');
                    html += row(n.code, right, '#00d4ff');
                });
            }
            // 3. Cuda swiata przy trasie
            var wnd = window._missionWonders(m, 500);
            if (wnd.length) {
                html += '<div class="wonder-desc">Nieodwiedzone cuda świata przy trasie:</div>';
                wnd.forEach(function(x){
                    html += '<div class="fact-row mission-wonder-row" data-wid="' + x.w.id + '" style="cursor:pointer;" title="Pokaż ' + x.w.name + ' na globusie">' +
                            '<span class="fact-key" style="color:#facc15;">' + x.w.icon + ' ' + x.w.name.toUpperCase() + '</span>' +
                            '<span class="fact-val" style="color:#facc15;">' + x.dist.toLocaleString('pl-PL') + ' km od ' + x.city + '</span></div>';
                });
            }
            fC.innerHTML = html;
            Array.prototype.forEach.call(fC.querySelectorAll(".rank-target-row"), function(el){
                el.onclick = function(){ window.focusRankTarget(el.getAttribute("data-code")); };
            });
            Array.prototype.forEach.call(fC.querySelectorAll(".mission-wonder-row"), function(el){
                el.onclick = function(){
                    var w = WONDERS.find(function(x){ return x.id === el.getAttribute("data-wid"); });
                    if (!w) return;
                    if (typeof stopRot === 'function') stopRot();
                    if (window.lineSeries) window.lineSeries.data.clear();
                    if (window.pointSeries) window.pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [w.lon, w.lat] }, type: "wonder", icon: w.icon }]);
                    if (typeof rotateGlobe === 'function') rotateGlobe(w.lat, w.lon);
                    if (window.updateWonderIntel) window.updateWonderIntel(w);
                };
            });
        };
        // --- STATYSTYKI LOTÓW (klik w LOTY / LOTNISKA / TRASY) ---
        // Zrodlo: FLIGHTS_LOG - log PER-LOT (80 wpisow: data, from, to, minuty, linia, samolot).
        // FLIGHTS_LEGS to tylko 52 UNIKALNE trasy (do rysowania na globusie), wiec liczenie z niego
        // zanizalo nalot o ~50% (91 026 km zamiast 135 865 km). Gdy loga brak (stary flights-data.js
        // sprzed zmiany importera w admin.php), spadamy na FLIGHTS_LEGS i panel to jawnie zaznacza.
        window._flightStats = function() {
            if (window._flightStatsCache) return window._flightStatsCache;
            if (typeof FLIGHTS_AP === 'undefined' || typeof getDist !== 'function') return null;
            var hasLog = (typeof FLIGHTS_LOG !== 'undefined') && FLIGHTS_LOG.length;
            var src = hasLog ? FLIGHTS_LOG.map(function(x){ return [x[1], x[2]]; })
                             : ((typeof FLIGHTS_LEGS !== 'undefined') ? FLIGHTS_LEGS : []);
            if (!src.length) return null;
            var tot = 0, longest = null, shortest = null, cnt = {}, n = 0;
            src.forEach(function(l){
                var a = FLIGHTS_AP[l[0]], b = FLIGHTS_AP[l[1]];
                if (!a || !b) return;
                var d = getDist(a[0], a[1], b[0], b[1]);
                tot += d; n++;
                var rec = { from: l[0], to: l[1], d: Math.round(d), fromCity: a[2], toCity: b[2] };
                if (!longest || d > longest.d) longest = rec;
                if (!shortest || d < shortest.d) shortest = rec;
                cnt[l[0]] = (cnt[l[0]] || 0) + 1;
                cnt[l[1]] = (cnt[l[1]] || 0) + 1;
            });
            // Czas w powietrzu, staty roczne, linie i samoloty - tylko z logu (CSV: kolumna Duration).
            var minutes = 0, byYear = {}, airlines = {}, aircraft = {}, first = null, last = null, longestT = null;
            var acByCode = {};   // kod typu ICAO -> nazwa juz uzyta dla tego kodu (patrz petla nizej)
            // --- RYTM LOTOW (2026-07-17): wszystko z kolumny Date, ale WYLACZNIE rzeczy, ktore trzeba ZROBIC.
            // Zadnego "stazu" ani "przerwy miedzy lotami" - to byla cala kategoria KALENDARZ LOTOW i wyleciala,
            // bo rosla sama z uplywem czasu. Tu licza sie tylko intensywnosc i pokrycie kalendarza.
            var byDay = {}, byMonthKey = {}, monthsSet = {}, weekdaysSet = {}, dayLegs = {};
            var hasNewYearFlight = false, hasChristmasFlight = false, hasSameDayReturn = false;
            if (hasLog) {
                FLIGHTS_LOG.forEach(function(x){
                    var date = x[0], mn = x[3] || 0, al = x[4], ac = x[5];
                    minutes += mn;
                    if (date) {
                        var y = date.slice(0, 4);
                        byYear[y] = (byYear[y] || 0) + 1;
                        if (!first || date < first) first = date;
                        if (!last || date > last) last = date;
                        byDay[date] = (byDay[date] || 0) + 1;
                        byMonthKey[date.slice(0, 7)] = (byMonthKey[date.slice(0, 7)] || 0) + 1;
                        monthsSet[date.slice(5, 7)] = true;
                        var wd = new Date(date + "T12:00:00Z").getUTCDay();
                        if (!isNaN(wd)) weekdaysSet[wd] = true;
                        var md = date.slice(5);
                        if (md === "12-31" || md === "01-01") hasNewYearFlight = true;
                        if (md === "12-24" || md === "12-25") hasChristmasFlight = true;
                        // Powrot tego samego dnia: na jedna date przypada i A>B, i B>A.
                        dayLegs[date] = dayLegs[date] || {};
                        dayLegs[date][x[1] + ">" + x[2]] = true;
                        if (dayLegs[date][x[2] + ">" + x[1]]) hasSameDayReturn = true;
                    }
                    if (al) airlines[al] = (airlines[al] || 0) + 1;
                    // TYPY MASZYN: grupujemy po KODZIE ICAO (pole 7), a nie po nazwie. FR24 zapisuje
                    // ten sam typ roznie ("Airbus A321" vs "Airbus A321-200"), przez co jedna maszyna
                    // liczyla sie dwa razy - zawyzalo to aircraftCount i rozbijalo topAircraft.
                    // Kluczem mapy zostaje NAZWA (aircraftNames idzie wprost na listy w odznakach),
                    // ale nazwa jest teraz KANONICZNA dla kodu. Kolejnosc zrodel nazwy:
                    //   1. AIRCRAFT_TYPE_NAMES  - reczna, ladna nazwa z aircraft-data.js,
                    //   2. pierwsza nazwa napotkana w logu dla tego kodu - dzieki temu NOWY typ
                    //      z przyszlego importu tez sie nie zduplikuje, choc nikt go nie dopisal,
                    //   3. surowa nazwa z logu - gdy kodu brak (import sprzed 2026-07-19).
                    if (ac) {
                        var acCode = x[7] || '';
                        if (acCode && typeof AIRCRAFT_CODE_ALIAS !== 'undefined' && AIRCRAFT_CODE_ALIAS[acCode]) {
                            acCode = AIRCRAFT_CODE_ALIAS[acCode];
                        }
                        var acLabel = ac;
                        if (acCode) {
                            if (typeof AIRCRAFT_TYPE_NAMES !== 'undefined' && AIRCRAFT_TYPE_NAMES[acCode]) {
                                acLabel = AIRCRAFT_TYPE_NAMES[acCode];
                            } else if (acByCode[acCode]) {
                                acLabel = acByCode[acCode];
                            }
                            acByCode[acCode] = acLabel;
                        }
                        aircraft[acLabel] = (aircraft[acLabel] || 0) + 1;
                    }
                    if (mn && (!longestT || mn > longestT.m)) longestT = { m: mn, from: x[1], to: x[2] };
                });
            }
            var maxPerDay = 0; Object.keys(byDay).forEach(function(d){ if (byDay[d] > maxPerDay) maxPerDay = byDay[d]; });
            var maxPerMonth = 0; Object.keys(byMonthKey).forEach(function(m){ if (byMonthKey[m] > maxPerMonth) maxPerMonth = byMonthKey[m]; });
            // Pory roku z numerow miesiecy (12-02 zima, 03-05 wiosna, 06-08 lato, 09-11 jesien).
            var seasons = {};
            Object.keys(monthsSet).forEach(function(m){
                var mi = parseInt(m, 10);
                seasons[(mi === 12 || mi <= 2) ? "W" : (mi <= 5 ? "S" : (mi <= 8 ? "L" : "J"))] = true;
            });
            // --- GEOGRAFIA LOTNISK (2026-07-17) - z samych wspolrzednych FLIGHTS_AP.
            // NIE grupujemy po FLIGHTS_AP[][2] (nazwa miasta): WAW to "Warsaw", a WMI to "Nowy Dwor
            // Mazowiecki", wiec para lotnisk Warszawy NIE zlapalaby sie po nazwie. Dlatego "dwa wejscia do
            // miasta" liczymy po ODLEGLOSCI (najblizsza para <= 50 km), co lapie i WAW/WMI, i BKK/DMK.
            // Petla O(n^2) po lotniskach - przy 51 to 1275 par, a caly _flightStats i tak jest cache'owany.
            var apKeys = Object.keys(FLIGHTS_AP).filter(function(k){ return cnt[k]; }); // tylko realnie uzyte
            var apMaxLat = -90, apMinLat = 90, apMaxLon = -180, apMinLon = 180;
            apKeys.forEach(function(k){
                var p = FLIGHTS_AP[k];
                if (p[0] > apMaxLat) apMaxLat = p[0];
                if (p[0] < apMinLat) apMinLat = p[0];
                if (p[1] > apMaxLon) apMaxLon = p[1];
                if (p[1] < apMinLon) apMinLon = p[1];
            });
            var apMinPairKm = 0, apMaxPairKm = 0;
            if (apKeys.length > 1) {
                var mn2 = Infinity, mx2 = 0;
                for (var i2 = 0; i2 < apKeys.length; i2++) {
                    for (var j2 = i2 + 1; j2 < apKeys.length; j2++) {
                        var pa = FLIGHTS_AP[apKeys[i2]], pb = FLIGHTS_AP[apKeys[j2]];
                        var dd = getDist(pa[0], pa[1], pb[0], pb[1]);
                        if (dd < mn2) mn2 = dd;
                        if (dd > mx2) mx2 = dd;
                    }
                }
                apMinPairKm = mn2; apMaxPairKm = mx2;
            }
            var byCount = function(o, k){ return Object.keys(o).sort(function(a, b){ return o[b] - o[a]; }).slice(0, k).map(function(x){ return { name: x, n: o[x] }; }); };
            var years = Object.keys(byYear);
            var bestYear = years.length ? years.reduce(function(a, b){ return byYear[b] > byYear[a] ? b : a; }) : null;
            var countries = {};
            Object.keys(FLIGHTS_AP).forEach(function(k){
                var c = window._countryAtPoint(FLIGHTS_AP[k][0], FLIGHTS_AP[k][1]);
                if (c) countries[c] = 1;
            });
            var top = Object.keys(cnt).sort(function(a, b){ return cnt[b] - cnt[a]; }).slice(0, 6)
                .map(function(k){ return { iata: k, city: FLIGHTS_AP[k][2], n: cnt[k] }; });
            window._flightStatsCache = {
                hasLog: !!hasLog,
                flights: n,
                totalKm: Math.round(tot),
                avgKm: n ? Math.round(tot / n) : 0,
                laps: (tot / 40075),
                longest: longest,
                shortest: shortest,
                longestTime: longestT,
                topAirports: top,
                countries: Object.keys(countries).length,
                minutes: minutes,
                byYear: byYear,
                bestYear: bestYear ? { year: bestYear, n: byYear[bestYear] } : null,
                first: first,
                last: last,
                topAirlines: byCount(airlines, 3),
                topAircraft: byCount(aircraft, 3),
                // Pelne nazwy (nie tylko top3) - zrodlo listy `done` dla LINIE I MASZYNY w prog().
                airlineNames: Object.keys(airlines).sort(),
                aircraftNames: Object.keys(aircraft).sort(),
                // Ponizsze pola sa dla osiagniec (kategoria LOTY / LINIE I MASZYNY / KALENDARZ) - panel
                // Flights ich nie rysuje, ale licza sie z tego samego przejscia FLIGHTS_LOG, wiec sa tu,
                // a nie w drugim, rownoleglym liczydle w computeAchievementContext.
                airlinesCount: Object.keys(airlines).length,   // ile roznych linii
                aircraftCount: Object.keys(aircraft).length,   // ile roznych typow maszyn
                topAirlineN: byCount(airlines, 1).length ? byCount(airlines, 1)[0].n : 0, // loty ulubiona linia
                topAircraftN: byCount(aircraft, 1).length ? byCount(aircraft, 1)[0].n : 0,
                yearsActive: years.length,                      // w ilu roznych latach latales
                // RYTM LOTOW (kategoria bez stazu - patrz komentarz przy petli wyzej)
                maxPerDay: maxPerDay,                           // najwiecej lotow w jednej dobie
                maxPerMonth: maxPerMonth,                       // najwiecej lotow w jednym miesiacu kalendarzowym
                monthsCovered: Object.keys(monthsSet).length,   // ile z 12 miesiecy ma chocby jeden lot
                weekdaysCovered: Object.keys(weekdaysSet).length, // ile z 7 dni tygodnia
                seasonsCovered: Object.keys(seasons).length,    // ile z 4 por roku
                hasNewYearFlight: hasNewYearFlight,
                hasChristmasFlight: hasChristmasFlight,
                hasSameDayReturn: hasSameDayReturn,
                // GEOGRAFIA LOTNISK (patrz komentarz przy petli O(n^2) wyzej)
                apMaxLat: apMaxLat, apMinLat: apMinLat, apMaxLon: apMaxLon, apMinLon: apMinLon,
                apLatSpan: (apKeys.length > 1) ? (apMaxLat - apMinLat) : 0,
                apLonSpan: (apKeys.length > 1) ? (apMaxLon - apMinLon) : 0,
                apMinPairKm: apMinPairKm, apMaxPairKm: apMaxPairKm
            };
            return window._flightStatsCache;
        };
        // 13350 min -> "222 h 30 min"
        window._fmtHm = function(mins) {
            var h = Math.floor(mins / 60), m = mins % 60;
            return h.toLocaleString('pl-PL') + ' h' + (m ? ' ' + m + ' min' : '');
        };
        // Odmiana: 1 trasa / 2-4 trasy / 5+ tras (z wyjatkiem nastoletnich: 12-14 tras).
        // Baner panelu ze statycznego pliku. onerror chowa <img> - brak pliku ma byc niewidoczny,
        // a nie renderowac ikone zepsutego obrazka.
        window._panelBanner = function(src) {
            return '<img src="' + src + '" class="panel-banner" alt="" onerror="this.style.display=\'none\'">';
        };
        window._plTrasy = function(n) {
            var l = n % 10, ll = n % 100;
            if (n === 1) return "trasa";
            if (l >= 2 && l <= 4 && !(ll >= 12 && ll <= 14)) return "trasy";
            return "tras";
        };
        // Odmiana: 1 lot / 2-4 loty / 5+ lotow (z wyjatkiem nastoletnich: 12-14 lotow).
        window._plLotow = function(n) {
            var l = n % 10, ll = n % 100;
            if (n === 1) return "lot";
            if (l >= 2 && l <= 4 && !(ll >= 12 && ll <= 14)) return "loty";
            return "lotów";
        };
        // Klik w rekordowy lot (najdluzszy/najkrotszy/najdluzszy czasowo): rysuje ten odcinek na globusie.
        // Bez resetIntelPanels - panel statystyk ma zostac otwarty, bo z niego wlasnie kliknieto.
        // fly=true -> po trasie lata samolocik (ta sama para serii i animacja co MAX RANGE, przez
        // _flyMaxRange). Uzywaja tego rekordy DYSTANSOWY i CZASOWY; NAJKROTSZY dostaje sam luk -
        // animacja 9 s na 201-kilometrowym odcinku wygladalaby jak zawieszony samolot.
        // Poprzedniego samolota sprzata stopRot() nizej (jedyne miejsce sprzatajace - patrz jego definicja),
        // dlatego klik w NAJKROTSZY po NAJDLUZSZYM gasi lot zamiast zostawiac go nad niewidoczna trasa.
        window.focusFlightLeg = function(from, to, fly) {
            var A = (typeof FLIGHTS_AP !== 'undefined') ? FLIGHTS_AP[from] : null;
            var B = (typeof FLIGHTS_AP !== 'undefined') ? FLIGHTS_AP[to] : null;
            if (!A || !B) return;
            if (typeof stopRot === 'function') stopRot();
            if (window.lineSeries) {
                window.lineSeries.data.clear();
                window.lineSeries.pushDataItem({ geometry: { type: "LineString", coordinates: [[A[1], A[0]], [B[1], B[0]]] } });
            }
            if (window.pointSeries) window.pointSeries.data.setAll([
                { geometry: { type: "Point", coordinates: [A[1], A[0]] }, type: "target" },
                { geometry: { type: "Point", coordinates: [B[1], B[0]] }, type: "target" }
            ]);
            if (typeof rotateGlobe === 'function') rotateGlobe((A[0] + B[0]) / 2, (A[1] + B[1]) / 2);
            if (fly && window._flyMaxRange) window._flyMaxRange([A[0], A[1]], [B[0], B[1]]);
        };
        window.focusAirport = function(iata) {
            var a = (typeof FLIGHTS_AP !== 'undefined') ? FLIGHTS_AP[iata] : null;
            if (!a) return;
            if (typeof stopRot === 'function') stopRot();
            if (window.lineSeries) window.lineSeries.data.clear();
            if (window.pointSeries) window.pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [a[1], a[0]] }, type: "target" }]);
            if (typeof rotateGlobe === 'function') rotateGlobe(a[0], a[1]);
        };
        window.updateFlightsIntel = function() {
            var fT = document.getElementById("factbook-target"), fC = document.getElementById("factbook-content");
            if (!fT || !fC) return;
            var s = window._flightStats();
            if (!s) return;
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            window._standbyWeatherPanel();
            fT.innerText = "STATYSTYKI LOTÓW";
            var meta = (typeof FLIGHTS_META !== 'undefined') ? FLIGHTS_META : { total: "?", airports: "?", routes: "?" };
            var fr = function(k, v, col){ return '<div class="fact-row"><span class="fact-key">' + k + ':</span><span class="fact-val"' + (col ? ' style="color:' + col + ';"' : '') + '>' + v + '</span></div>'; };
            // Wiersz rekordowego lotu - klikalny, rysuje ten odcinek na globusie (focusFlightLeg).
            // fly=true dokłada samolocik lecący po trasie (jak MAX RANGE) - patrz data-fly niżej.
            var frLeg = function(k, v, col, from, to, fly){
                return '<div class="fact-row flight-leg-row" data-from="' + from + '" data-to="' + to + '"' + (fly ? ' data-fly="1"' : '') + ' style="cursor:pointer;" title="Pokaż trasę ' + from + ' → ' + to + ' na globusie' + (fly ? ' (z samolotem)' : '') + '">' +
                       '<span class="fact-key">' + k + ':</span><span class="fact-val"' + (col ? ' style="color:' + col + ';"' : '') + '>' + v + '</span></div>';
            };
            var html = window._panelBanner("foty/flights.jpg") +
                       fr("LOTY", meta.total) +
                       fr("LOTNISKA", meta.airports) +
                       fr("TRASY", meta.routes) +
                       fr("KRAJE Z LOTNISKIEM", s.countries);
            // Dystans do Ksiezyca (384 400 km, srednia odleglosc) - ta sama skala, co odznaka
            // "HOUSTON, MAMY DYSTANS". Liczy sie wprost z s.totalKm, wiec wiersz jest ten sam w obu
            // galeziach nizej (z logiem i bez) - stad tekst budowany raz, tutaj, a wstawiany dwa razy,
            // zeby w obu trybach stal ZARAZ POD "OKRĄŻEŃ ZIEMI" (to ta sama rodzina liczb).
            // Procent liczymy od drogi W JEDNA STRONE; po przekroczeniu 100% dokladamy krotnosc,
            // zeby samo "437 %" nie bylo jedyna informacja.
            var moonPct = (s.totalKm / 384400) * 100;
            var moonRow = fr("DO KSIĘŻYCA",
                moonPct.toLocaleString('pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' %'
                + (s.totalKm >= 384400 ? ' (' + (s.totalKm / 384400).toFixed(2) + ' × w jedną stronę)' : ''),
                '#00d4ff');
            if (s.hasLog) {
                html += fr("PRZELECIANE", s.totalKm.toLocaleString('pl-PL') + ' km', '#00d4ff') +
                        fr("W POWIETRZU", window._fmtHm(s.minutes) + ' (' + (s.minutes / 1440).toFixed(1) + ' dnia)', '#00d4ff') +
                        fr("OKRĄŻEŃ ZIEMI", s.laps.toFixed(2) + ' ×', '#00d4ff') +
                        moonRow +
                        fr("ŚREDNI LOT", s.avgKm.toLocaleString('pl-PL') + ' km');
            } else {
                // Stary flights-data.js (bez FLIGHTS_LOG): liczymy z 52 unikalnych tras, wiec to NIE jest
                // realny nalot - podpisujemy zgodnie z prawda i mowimy, jak to naprawic.
                html += fr("SUMA TRAS", s.totalKm.toLocaleString('pl-PL') + ' km', '#00d4ff') +
                        fr("OKRĄŻEŃ ZIEMI", s.laps.toFixed(2) + ' ×', '#00d4ff') +
                        moonRow +
                        fr("ŚREDNIA TRASA", s.avgKm.toLocaleString('pl-PL') + ' km');
            }
            if (s.longest) html += frLeg("NAJDŁUŻSZY", s.longest.from + ' → ' + s.longest.to + ' · ' + s.longest.d.toLocaleString('pl-PL') + ' km', '#facc15', s.longest.from, s.longest.to, true);
            if (s.shortest) html += frLeg("NAJKRÓTSZY", s.shortest.from + ' → ' + s.shortest.to + ' · ' + s.shortest.d.toLocaleString('pl-PL') + ' km', '#facc15', s.shortest.from, s.shortest.to);
            if (s.hasLog) {
                if (s.longestTime) html += frLeg("NAJDŁUŻSZY (CZAS)", s.longestTime.from + ' → ' + s.longestTime.to + ' · ' + window._fmtHm(s.longestTime.m), '#facc15', s.longestTime.from, s.longestTime.to, true);
                if (s.first) html += fr("PIERWSZY LOT", s.first.split('-').reverse().join('.'));
                if (s.bestYear) html += fr("REKORDOWY ROK", s.bestYear.year + ' · ' + s.bestYear.n + ' lotów', '#22c55e');
                if (s.topAirlines.length) {
                    html += '<div class="wonder-desc">Ulubione linie:</div>';
                    s.topAirlines.forEach(function(a){ html += fr(a.name, a.n + ' lotów'); });
                }
                if (s.topAircraft.length) {
                    html += '<div class="wonder-desc">Ulubione maszyny:</div>';
                    s.topAircraft.forEach(function(a){ html += fr(a.name, a.n + ' lotów'); });
                }
            } else {
                html += '<div class="wonder-desc">Suma i średnia liczą ' + meta.routes + ' unikalnych tras, bo ten flights-data.js nie ma jeszcze logu per-lot (FLIGHTS_LOG). Zaimportuj CSV z Flightradara w adminie, żeby dostać realny nalot i czas w powietrzu.</div>';
            }
            html += '<div class="wonder-desc">Najczęstsze lotniska:</div>';
            s.topAirports.forEach(function(a){
                html += '<div class="fact-row rank-target-row" data-iata="' + a.iata + '" style="cursor:pointer;" title="Pokaż ' + a.city + ' na globusie">' +
                        '<span class="fact-key" style="color:#00d4ff;">✈ ' + a.iata + ' · ' + a.city.toUpperCase() + '</span>' +
                        '<span class="fact-val" style="color:#00d4ff;">' + a.n + ' ' + (s.hasLog ? window._plLotow(a.n) : window._plTrasy(a.n)) + '</span></div>';
            });
            fC.innerHTML = html;
            Array.prototype.forEach.call(fC.querySelectorAll("[data-iata]"), function(el){
                el.onclick = function(){ window.focusAirport(el.getAttribute("data-iata")); };
            });
            Array.prototype.forEach.call(fC.querySelectorAll(".flight-leg-row"), function(el){
                el.onclick = function(){ window.focusFlightLeg(el.getAttribute("data-from"), el.getAttribute("data-to"), el.getAttribute("data-fly") === "1"); };
            });
        };
        window.updateRankIntel = function(i) {
            var st = window._rankState;
            if (!st || typeof RANKS === 'undefined' || !RANKS[i]) return;
            var fT = document.getElementById("factbook-target"), fC = document.getElementById("factbook-content");
            if (!fT || !fC) return;
            if (window.liveClockInterval) { clearInterval(window.liveClockInterval); window.liveClockInterval = null; }
            window._standbyWeatherPanel();
            var r = RANKS[i];
            fT.innerText = "RANK: " + r.title;
            var html = window._panelBanner("foty/conquer.jpg") +
                       '<div class="fact-row"><span class="fact-key">PRÓG:</span><span class="fact-val">' + r.min + ' krajów</span></div>' +
                       '<div class="fact-row"><span class="fact-key">TWÓJ WYNIK:</span><span class="fact-val">' + st.score + '</span></div>';
            if (st.score >= r.min) {
                html += '<div class="fact-row"><span class="fact-key">STATUS:</span><span class="fact-val" style="color:#22c55e;">✅ ZDOBYTA</span></div>' +
                        '<div class="fact-row"><span class="fact-key">ZAPAS:</span><span class="fact-val">+' + (st.score - r.min) + ' ponad próg</span></div>';
                var nxt = RANKS[st.idx + 1];
                html += '<div class="wonder-desc">' + (nxt
                    ? 'Następna ranga: ' + nxt.title + ' (brakuje ' + (nxt.min - st.score) + ')'
                    : 'MAX LEVEL. Nie ma już czego odblokowywać.') + '</div>';
                fC.innerHTML = html;
                return;
            }
            var need = r.min - st.score;
            html += '<div class="fact-row"><span class="fact-key">BRAKUJE:</span><span class="fact-val" style="color:#facc15;">' + need + ' krajów</span></div>';
            // Zaplanowane misje: tylko informacja "to juz masz w planach" - NIE odejmujemy ich od
            // BRAKUJE (wynik liczy sie dopiero po odwiedzeniu). Wypadaja za to z listy propozycji,
            // zeby ten sam kraj nie stal w dwoch blokach pod soba.
            var seenV = {};
            st.visited.forEach(function(c){ seenV[c] = 1; });
            var planned = window._plannedMissionTargets().filter(function(p){
                return !seenV[p.code] && (typeof EXCLUDED_CODES === 'undefined' || EXCLUDED_CODES.indexOf(p.code) === -1);
            });
            if (planned.length) {
                html += '<div class="wonder-desc">Z uwzględnieniem zaplanowanych misji:</div>';
                planned.forEach(function(p){
                    var pnm = (typeof FACTBOOK !== 'undefined' && FACTBOOK[p.code]) ? FACTBOOK[p.code].name.common : p.code;
                    var pflag = window._flagSrc ? window._flagSrc(p.code) : null;
                    var pimg = pflag ? '<img src="' + pflag + '" alt="' + p.code + '" class="row-flag">' : '';
                    html += '<div class="fact-row rank-target-row" data-code="' + p.code + '" style="cursor:pointer;" title="Pokaż ' + pnm + ' na globusie">' +
                            '<span class="fact-key" style="color:#00d4ff;">' + pimg + pnm.toUpperCase() + '</span>' +
                            '<span class="fact-val" style="color:#00d4ff;">🎯 ' + p.mission + '</span></div>';
                });
            }
            // Estymata: wynik po zaliczeniu wszystkich krajow z zaplanowanych misji, ranga z tego
            // wynikajaca i data powrotu z ostatniej misji. To prognoza, nie stan - dlatego stoi
            // pod blokiem planow, a nie w BRAKUJE.
            if (planned.length) {
                var est = st.score + planned.length;
                var estIdx = window._rankIndexFor(est);
                var endTs = window._plannedMissionEnd();
                var endTxt = endTs ? new Date(endTs).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }) : "?";
                var hitsCol = (est >= r.min) ? '#22c55e' : '#00d4ff';
                html += '<div class="fact-row"><span class="fact-key">PO WYPRAWIE:</span><span class="fact-val" style="color:' + hitsCol + ';">' + est + ' krajów · ' + RANKS[estIdx].title + '</span></div>' +
                        '<div class="fact-row"><span class="fact-key">OD KIEDY:</span><span class="fact-val" style="color:' + hitsCol + ';">' + endTxt + '</span></div>';
            }
            // Lista propozycji leci ZAWSZE - takze gdy misje domykaja prog, bo przed wyprawa mozna
            // jeszcze cos zaliczyc.
            {
                var plannedSet = {};
                planned.forEach(function(p){ plannedSet[p.code] = 1; });
                // Zawsze 10 propozycji - niezaleznie od tego, ile brakuje do progu (przy BRAKUJE: 2
                // lista dwoch pozycji nie dawala zadnego wyboru).
                var cands = window._rankCandidates(st.visited.concat(Object.keys(plannedSet)), 10);
                if (!cands.length) {
                    html += '<div class="wonder-desc">Brak danych do wyznaczenia planu.</div>';
                } else {
                    html += '<div class="wonder-desc">Najbliższe nieodwiedzone i niezaplanowane kraje:</div>';
                    cands.forEach(function(c){
                        var nm = (typeof FACTBOOK !== 'undefined' && FACTBOOK[c.code]) ? FACTBOOK[c.code].name.common : c.code;
                        var flag = window._flagSrc ? window._flagSrc(c.code) : null;
                        var img = flag ? '<img src="' + flag + '" alt="' + c.code + '" class="row-flag">' : '';
                        var meta = [];
                        if (c.dist !== null) meta.push(c.dist.toLocaleString('pl-PL') + ' km');
                        if (c.visa) meta.push(c.visa);
                        if (c.cost) meta.push(c.cost);
                        html += '<div class="fact-row rank-target-row" data-code="' + c.code + '" style="cursor:pointer;" title="Pokaż ' + nm + ' na globusie">' +
                                '<span class="fact-key" style="color:' + (c.easy ? '#22c55e' : '#8f9ba8') + ';">' + img + nm.toUpperCase() + '</span>' +
                                '<span class="fact-val">' + meta.join(' · ') + '</span></div>';
                    });
                }
            }
            fC.innerHTML = html;
            // Podpiete na koncu, dla obu blokow naraz (planowanych i propozycji).
            Array.prototype.forEach.call(fC.querySelectorAll(".rank-target-row"), function(el){
                el.onclick = function(){ window.focusRankTarget(el.getAttribute("data-code")); };
            });
        };
        // --- FLAGI JAKO OBRAZKI (zrodlo: FLAGS z flags-data.js) ---
        // Windows nie ma flag panstw w Segoe UI Emoji, wiec emoji budowane z regional-indicator
        // (getFlagEmoji) renderuje sie w Chrome/Edge jako gole litery ("PL"). Firefox dostarcza wlasny
        // font (Twemoji Mozilla) i dlatego tam dzialalo - stad roznica miedzy przegladarkami. FLAGS
        // renderuje sie wszedzie tak samo (admin.php robi tak od dawna). Wszedzie zostaje fallback na
        // emoji, gdy kodu nie ma w FLAGS - bez regresji.
        // UWAGA: to jest powod, dla ktorego flags-data.js NIE moze byc <script defer> (patrz index.html).
        window._flagSrc = function(id){ return (typeof FLAGS !== 'undefined' && FLAGS[id]) ? FLAGS[id] : null; };
        window._flagClass = function(id){ return 'flag-' + String(id).replace(/[^A-Za-z0-9_-]/g, ''); };
        // Pojedyncza flaga jako HTML (misja, MAX RANGE) - inline <img>, bo to jedna instancja.
        // height:0.75em -> rozmiar podaza za font-size rodzica (.telemetry-flag: 3rem / 2.2rem w niskich oknach).
        window._flagHTML = function(id){
            var src = window._flagSrc(id);
            if (!src) return (typeof getFlagEmoji === 'function') ? getFlagEmoji(id) : String(id || '');
            return '<img src="' + String(src).replace(/"/g, '%22') + '" alt="' + String(id || '') + '" style="height:0.75em; width:auto; display:block;">';
        };
        // Reguly tla dla flag w POWIELANYM pasku: jeden data-URI na kraj, w jednym <style>. Dzieki temu
        // kolejne kopie zestawu w marquee sa darmowe (inline data-URI x N rozdmuchalby innerHTML do MB
        // przy KAZDEJ przebudowie paska). Cudzyslowy w URI (mozliwe przy data:image/svg+xml bez base64)
        // koduje na %22, zeby nie rozwalic url("...").
        window._ensureFlagCss = function(ids){
            // refreshVisitedUI leci przy kazdym zaznaczeniu kraju, a zestaw flag zwykle sie nie zmienia -
            // bez tego straznika przebudowywalibysmy (i kazalibysmy przegladarce parsowac) ~320 KB CSS za kazdym razem.
            var key = ids.join(',');
            if (window._flagCssKey === key) return;
            window._flagCssKey = key;
            var el = document.getElementById('flag-bg-css');
            if (!el) { el = document.createElement('style'); el.id = 'flag-bg-css'; document.head.appendChild(el); }
            var css = '';
            ids.forEach(function(id){
                var src = window._flagSrc(id);
                if (src) css += '.' + window._flagClass(id) + '{background-image:url("' + String(src).replace(/"/g, '%22') + '")}';
            });
            el.textContent = css;
        };

        // --- GLOBAL CLICK HANDLER FOR CLONED FLAGS ---
        window.handleFlagClick = function(id, name) {
            const event = new CustomEvent('flagClicked', { detail: { id: id, name: name } });
            document.dispatchEvent(event);
        };

        // --- PASEK FLAG: PODSWIETLENIE AKTYWNEGO KRAJU ---
        // Pasek jest POWIELONY (kilka kopii zestawu + dublowanie A+A pod animacje), wiec ta sama flaga
        // wystepuje w DOM wielokrotnie - podswietlamy WSZYSTKIE jej kopie naraz, po [data-fid].
        // Zrodlo prawdy trzymamy w window._lootActiveId, bo refreshVisitedUI przebudowuje innerHTML paska
        // (klasy by przepadly) - po kazdej przebudowie podswietlenie jest nakladane od nowa.
        // Wolane z: klikniecia flagi w pasku, klikniecia panstwa na globie oraz resetIntelPanels (czyszczenie).
        window._setLootBarActive = function(id){
            // Kody ISO sa alfanumeryczne; sanityzacja i tak zostaje, bo id trafia do selektora atrybutowego.
            var safe = id ? String(id).replace(/[^A-Za-z0-9_-]/g, '') : '';
            window._lootActiveId = safe || null;
            var lt = document.getElementById("loot-track");
            if (!lt) return;
            Array.prototype.forEach.call(lt.querySelectorAll(".loot-flag.lf-active"), function(el){
                el.classList.remove("lf-active");
            });
            if (!safe) return;
            Array.prototype.forEach.call(lt.querySelectorAll('.loot-flag[data-fid="' + safe + '"]'), function(el){
                el.classList.add("lf-active");
            });
        };

        // --- PASEK FLAG: DYMEK NAD FLAGA ---
        // Zastepuje natywny title= (wchodzil z opoznieniem ~1s i nie da sie go ostylowac).
        // Pokazuje: nazwe kraju, licznik odwiedzonych miast i najdalsze z nich od Warszawy - czyli
        // dokladnie to miejsce, na ktore skoczy glob po kliknieciu flagi (patrz handler flagClicked).
        window._showLootTip = function(el){
            var id = el.getAttribute("data-fid"), name = el.getAttribute("data-fname") || id;
            var tip = document.getElementById("loot-tip");
            if (!tip) { tip = document.createElement("div"); tip.id = "loot-tip"; document.body.appendChild(tip); }

            var st = window._countryCityStats(id);
            var html = '<div class="lt-name">' + name + '</div>';
            if (st.count > 0) {
                html += '<div class="lt-cities">' + window._plMiast(st.count) + '</div>';
                if (st.farthest) {
                    html += '<div class="lt-far">najdalej: <b>' + st.farthest.name.toUpperCase() + '</b> · '
                          + Math.round(st.farthest.dist).toLocaleString("pl-PL") + ' km</div>';
                }
            } else {
                html += '<div class="lt-none">brak odwiedzonych miast</div>';
            }
            tip.innerHTML = html;

            // Pozycja: wysrodkowany nad flaga. Mierzymy PO wstawieniu tresci (offsetWidth/Height musza
            // znac finalny rozmiar), a potem trzymamy dymek w granicach okna - flagi przy krawedziach
            // inaczej wypychalyby go poza ekran.
            var r = el.getBoundingClientRect();
            var left = r.left + r.width / 2 - tip.offsetWidth / 2;
            left = Math.max(8, Math.min(left, window.innerWidth - tip.offsetWidth - 8));
            tip.style.left = left + "px";
            tip.style.top = (r.top - tip.offsetHeight - 10) + "px";
            tip.classList.add("lt-on");
        };
        window._hideLootTip = function(){
            var tip = document.getElementById("loot-tip");
            if (tip) tip.classList.remove("lt-on");
        };

        // --- PASEK FLAG: RECZNE PRZEWIJANIE (przeciaganie + kolko myszy) ---
        // Przy ~100 krajach czekanie, az konkretna flaga sama przyjedzie, bylo bez sensu.
        //
        // DLACZEGO NIE requestAnimationFrame: pasek jedzie na animacji CSS (kompozytor, zero kosztu w JS,
        // sam zamiera przy schowanej karcie). Przepisanie go na petle rAF kazaloby nam mielic transform
        // co klatke ZAWSZE, tylko po to, zeby user raz na jakis czas pociagnal pasek. Zamiast tego:
        // na czas kontaktu z kursorem ZDEJMUJEMY animacje (animation:none) i ustawiamy transform recznie,
        // a przy wyjsciu kursora wracamy do animacji z UJEMNYM animation-delay - to wznawia ja dokladnie
        // w fazie, w ktorej user zostawil pasek (bez przeskoku na poczatek).
        //
        // WSPOLNA DEFINICJA "POLOWY": keyframes marquee jada do translateX(-50%), czyli do polowy
        // WLASNEJ szerokosci sciezki. Kazde przeliczenie tutaj (faza, modulo, delay) idzie na dokladnie
        // tej samej wartosci - lt.offsetWidth/2 - wiec reczna pozycja i animacja nie moga sie rozjechac,
        // nawet ze zmiennym gapem (JS ustawia 40 lub 80 px) czy brakiem gapa na styku kopii.
        // offsetWidth to szerokosc LAYOUTU, nie zmienia jej transform - dlatego czytamy go, nie boundingRect.
        window._initLootBarDrag = function(){
            var wrap = document.getElementById("loot-wrapper");
            var lt = document.getElementById("loot-track");
            if (!wrap || !lt || wrap._lbDragBound) return;
            wrap._lbDragBound = true;

            var off = 0;         // aktualne przesuniecie w px, trzymane w [0, half)
            var frozen = false;  // czy transform jest pod nasza kontrola (animacja zdjeta)
            var dragging = false;
            var captured = false; // czy przechwycilismy wskaznik (dopiero po progu 4 px - patrz pointermove)
            var lastX = 0, startX = 0;

            function half(){ return (lt.offsetWidth || 0) / 2; }
            // Aktualne translateX z WYLICZONEGO stylu - tak lapiemy pozycje w srodku animacji CSS.
            function curX(){
                var t = getComputedStyle(lt).transform;
                if (!t || t === "none") return 0;
                var m = t.match(/matrix\(([^)]+)\)/);
                if (m) return parseFloat(m[1].split(",")[4]) || 0;
                var m3 = t.match(/matrix3d\(([^)]+)\)/);
                if (m3) return parseFloat(m3[1].split(",")[12]) || 0;
                return 0;
            }
            function wrapOff(v){ var h = half(); return h > 0 ? ((v % h) + h) % h : 0; }
            function apply(){ lt.style.transform = "translateX(" + (-off) + "px)"; }

            function freeze(){
                if (frozen) return;
                off = wrapOff(-curX());
                lt.style.animation = "none";
                frozen = true;
                apply();
            }
            function thaw(){
                if (!frozen) return;
                frozen = false;
                var h = half();
                var d = parseFloat(lt.style.getPropertyValue("--duration")) || 30;
                // Kolejnosc ma znaczenie: najpierw czyscimy inline'y (wraca regula z index.html i animacja
                // startuje od zera), dopiero potem wstrzykujemy ujemny delay, ktory przeskakuje ja do fazy.
                lt.style.animation = "";
                lt.style.transform = "";
                lt.style.animationDelay = h > 0 ? (-(off / h) * d) + "s" : "";
            }
            // dx > 0 (ciagniemy w prawo) -> tresc ma isc w prawo -> transform mniej ujemny -> off maleje.
            function move(dx){
                if (half() <= 0) return;
                off = wrapOff(off - dx);
                apply();
            }

            wrap.addEventListener("pointerenter", freeze);
            wrap.addEventListener("pointerleave", function(){ if (!dragging) thaw(); window._hideLootTip(); });

            // Dymek nad flaga - delegacja, bo zawartosc paska jest przebudowywana przy kazdym refreshu.
            // Nie pokazujemy go w trakcie ciagniecia: pozycja jest liczona raz, wiec dymek zostalby
            // wiszacy nad miejscem, z ktorego flaga juz odjechala.
            lt.addEventListener("mouseover", function(ev){
                var el = ev.target.closest ? ev.target.closest(".loot-flag") : null;
                if (el && !dragging) window._showLootTip(el);
            });
            lt.addEventListener("mouseout", function(ev){
                var el = ev.target.closest ? ev.target.closest(".loot-flag") : null;
                if (el) window._hideLootTip();
            });

            wrap.addEventListener("pointerdown", function(ev){
                if (ev.button !== undefined && ev.button !== 0) return;
                freeze();
                dragging = true;
                captured = false;
                lastX = startX = ev.clientX;
                lt._dragMoved = false;
                // NIE przechwytujemy tu wskaznika i NIE wolamy preventDefault - patrz komentarz nizej.
            });

            wrap.addEventListener("pointermove", function(ev){
                if (!dragging) return;
                var dx = ev.clientX - lastX;
                lastX = ev.clientX;
                // Prog 4 px oddziela ciagniecie od kliku (patrz straznik w listenerze klikniec paska).
                if (Math.abs(ev.clientX - startX) > 4 && !captured) {
                    lt._dragMoved = true;
                    wrap.classList.add("lb-dragging");
                    window._hideLootTip();
                    // PRZECHWYCENIE WSKAZNIKA DOPIERO TUTAJ, NIE NA pointerdown - i to jest istotne:
                    // gdy przechwycenie jest aktywne, przegladarka przekierowuje pozniejszy "click" na
                    // element przechwytujacy (#loot-wrapper). Listener klikniec siedzi na #loot-track,
                    // czyli na jego DZIECKU, wiec klik nigdy by do niego nie dotarl - kazde klikniecie
                    // flagi przepadalo. Przechwytujac dopiero po przekroczeniu progu mamy jedno i drugie:
                    // zwykly klik idzie normalna sciezka, a ciagniecie dziala dalej po wyjezdzie kursora
                    // poza pasek (i tak przekierowany "click" i tak polyka straznik _dragMoved).
                    try { wrap.setPointerCapture(ev.pointerId); captured = true; } catch(e){}
                }
                move(dx);
            });

            function endDrag(ev){
                if (!dragging) return;
                dragging = false;
                wrap.classList.remove("lb-dragging");
                if (captured) { try { wrap.releasePointerCapture(ev.pointerId); } catch(e){} }
                captured = false;
                // Przy przechwyconym wskazniku pointerleave mogl nie poleciec (kursor wyjechal poza pasek
                // w trakcie ciagniecia) - sprawdzamy wprost, czy nadal jestesmy nad paskiem.
                if (!wrap.matches(":hover")) thaw();
            }
            wrap.addEventListener("pointerup", endDrag);
            wrap.addEventListener("pointercancel", endDrag);
            // Zastepuje preventDefault() z pointerdown (ono nie moze tam zostac, bo tlumi tez klik):
            // blokuje natywne "przeciaganie obrazka" przy ciagnieciu paska. Zaznaczanie tekstu gasi
            // user-select:none na .loot-bar-wrapper w index.html.
            wrap.addEventListener("dragstart", function(ev){ ev.preventDefault(); });

            // Kolko: w dol = pasek jedzie dalej (jak czytanie w prawo). Poziome kolko/gest tez lapiemy.
            // passive:false, bo wolamy preventDefault - inaczej Chrome ignoruje je i strona probuje skrolowac.
            wrap.addEventListener("wheel", function(ev){
                freeze();
                var d = Math.abs(ev.deltaX) > Math.abs(ev.deltaY) ? ev.deltaX : ev.deltaY;
                move(-d);
                ev.preventDefault();
            }, { passive: false });

            // Wolane po KAZDEJ przebudowie paska w refreshVisitedUI: zestaw flag (a wiec i szerokosc
            // sciezki) mogl sie zmienic, wiec zamrozone przesuniecie trzeba zwinac do nowego zakresu -
            // inaczej tuz po przebudowie transform wskazywalby poza tresc i pasek bylby pusty.
            window._lootBarSync = function(){
                if (frozen) { off = wrapOff(off); apply(); }
            };
        };

        // --- ATMOSFERA: synchronizacja poswiaty z REALNA geometria globu ---
        // Wczesniej promien/srodek poswiaty byly ZGADYWANE w CSS z vw/vh (najpierw 24vw, potem
        // min(25vw,50vh)) na podstawie tego, jak NAM sie wydawalo, ze amCharts wpasowuje kule w plot.
        // Oba zgadywania rozjezdzaly sie przy nietypowych proporcjach okna (poswiata "wylazila" poza glob).
        // Zamiast zgadywac - czytamy wynik wprost z projekcji d3 (am5map.geoOrthographic() to d3.geoOrthographic):
        //   projection.scale()     = promien kuli w PIKSELACH (dla ortograficznej to dokladnie promien),
        //   projection.translate() = [cx, cy] srodka kuli w px wzgledem #chartdiv (a ten zaczyna sie w 0,0
        //                            viewportu, bo wszystko przed nim jest position:absolute/fixed).
        // Cokolwiek amCharts robi z paddingami i dy:-50, te dwie wartosci mowia prawde.
        // Wynik ladzie w CSS jako --globe-r / --globe-cx / --globe-cy (uzywa ich gradient .amb-atmo).
        // Przy zoomie (>1.05) NIE ruszamy nic - zostaje ostatnia geometria widoku "home", jak dotad.
        // Straznik "bez zmian -> nie pisz do CSS" chroni przed przemalowaniem gradientu co klatke.
        window._syncGlobeAmbiance = function(){
            var gc = window.__globeChart;
            if (!gc || (gc.get("zoomLevel") || 1) > 1.05) return;
            var proj = gc.get("projection");
            if (!proj || typeof proj.scale !== "function" || typeof proj.translate !== "function") return;
            var r = proj.scale(), t = proj.translate();
            if (!r || !t || !isFinite(r) || !isFinite(t[0]) || !isFinite(t[1])) return;
            if (window._ambR === r && window._ambCx === t[0] && window._ambCy === t[1]) return;
            window._ambR = r; window._ambCx = t[0]; window._ambCy = t[1];
            var s = document.documentElement.style;
            s.setProperty('--globe-r', r + 'px');
            s.setProperty('--globe-cx', t[0] + 'px');
            s.setProperty('--globe-cy', t[1] + 'px');
        };

        // --- LOGIKA SKALOWANIA "GAME HUD" ---
        function adjustLayout() {
            const w = window.innerWidth;
            const BASE_WIDTH = 2560; // 2K
            let scale = w / BASE_WIDTH;
            if (scale < 0.4) scale = 0.4;
            if (scale > 1.1) scale = 1.1;

            const leftWrapper = document.querySelector('.left-wrapper');
            const rightWrapper = document.querySelector('.right-wrapper');

            if(leftWrapper) leftWrapper.style.transform = `scale(${scale})`;
            if(rightWrapper) rightWrapper.style.transform = `scale(${scale})`;

            // Dolny-prawy HUD (przelaczniki VISA/ZONES/NIGHT/CLIMATE + DETAIL + SYSTEM_LOG) NIE byl dotad
            // skalowany: siedzi poza .left-wrapper/.right-wrapper, wiec na wezszych ekranach zostawal 1:1
            // i wygladal na ogromny obok skurczonej reszty HUD-u. Skalujemy tym samym wspolczynnikiem.
            // Kotwica (transform-origin:100% 100%) jest w index.html. USTAWIAMY TO PRZED odczytem
            // getBoundingClientRect().top nizej - inaczej max-height paneli liczylby sie ze starej,
            // nieprzeskalowanej pozycji tego rogu. Transform nie zmienia layoutu, wiec ResizeObserver
            // pilnujacy #bottom-right-hud nie zapetli sie od tej zmiany.
            const bottomHudEl = document.getElementById('bottom-right-hud');
            if (bottomHudEl) bottomHudEl.style.transform = `scale(${scale})`;

            // World Wonders: kolumna wypelnia do paska flag niezaleznie od skali/ekranu
            const colH = ((window.innerHeight - 108) / scale) + 'px';
            const leftHud = document.getElementById('left-hud');
            if (leftHud) leftHud.style.height = colH;
            // Druga kolumna (pogoda + wyszukiwarka + FLIGHTS) dostaje TE SAMA wysokosc - inaczej
            // margin-top:auto na .flights-floater nie mialby sie od czego odbic (kolumna bylaby wysoka
            // tylko na tyle, co jej tresc, i panel FLIGHTS przykleilby sie do wyszukiwarki takze na
            // wysokich ekranach, zamiast siedziec przy dole jak dotad).
            const weatherCol = document.querySelector('.weather-floater');
            if (weatherCol) weatherCol.style.height = colH;

            // Glob: stala srednica wg szerokosci (nie rosnie na full screen pod boxy)
            var gc = window.__globeChart;
            if (gc) { var gcap = window.innerWidth * 0.50; var gextra = Math.max(0, window.innerHeight - gcap); gc.set('paddingTop', gextra/2); gc.set('paddingBottom', gextra/2); }
            // Poswiata atmosfery pod nowa geometrie globu. amCharts przelicza projekcje asynchronicznie
            // (wlasna petla renderu), wiec odczyt "teraz" widzi stan po POPRZEDNIEJ klatce - dlatego
            // dokladamy opozniony strzal, ktory lapie stan po ustaniu resize'a. Petla rozgrzewkowa
            // (~2 s rAF) oraz 'load' i tak wywoluja adjustLayout wielokrotnie, wiec pierwszy render
            // globu zawsze zostanie zlapany.
            window._syncGlobeAmbiance();
            if (window._ambSettleTimer) clearTimeout(window._ambSettleTimer);
            window._ambSettleTimer = setTimeout(window._syncGlobeAmbiance, 250);

            // Panele scrollowalne (Intel/Factbook, Progression Tree): max-height liczony z realnej
            // pozycji na ekranie wzgledem gornego rogu prawego stosu (bottom-right-hud), a nie ze
            // zgadywanej stalej - dzieki temu zawsze wykorzystuja cala dostepna przestrzen.
            // UWAGA: panele sa wewnatrz .right-wrapper ze skalowaniem (transform: scale).
            // getBoundingClientRect() zwraca wspolrzedne PO skalowaniu (wizualne), a style.maxHeight
            // dziala w skali PRZED transformacja - dlatego dostepny odstep wizualny dzielimy przez
            // scale, zeby po przeskalowaniu wyszla dokladnie zadana wysokosc. Bez tego FHD (scale<1)
            // zostawia wolne miejsce, a szerokie ekrany (scale do 1.1) nachodza na przyciski.
            var bottomHud = document.getElementById('bottom-right-hud');
            if (bottomHud) {
                var hudTop = bottomHud.getBoundingClientRect().top;
                var gapPx = 16;
                var factbookPanel = document.getElementById('factbook-panel');
                if (factbookPanel) {
                    var fbTop = factbookPanel.getBoundingClientRect().top;
                    factbookPanel.style.maxHeight = Math.max(100, (hudTop - fbTop - gapPx) / scale) + 'px';
                }
                var rankSidebar = document.getElementById('rank-list');
                if (rankSidebar) {
                    var rsTop = rankSidebar.getBoundingClientRect().top;
                    rankSidebar.style.maxHeight = Math.max(100, (hudTop - rsTop - gapPx) / scale) + 'px';
                }
            }
        }

        window.addEventListener('resize', adjustLayout);
        window.addEventListener('load', adjustLayout);
        // Petla rozgrzewkowa: przez pierwsze ~2s przeliczaj co klatke, zeby zlapac pozne zmiany
        // ukladu (czcionki, media-query niskich okien, reflow siatki 2x2, pierwsze linie SYSTEM_LOG).
        var _warmupEnd = (window.performance ? performance.now() : Date.now()) + 2000;
        (function _warmup(){
            adjustLayout();
            var now = (window.performance ? performance.now() : Date.now());
            if (now < _warmupEnd) requestAnimationFrame(_warmup);
        })();
        if (document.fonts && document.fonts.ready) { document.fonts.ready.then(adjustLayout).catch(function(){}); }
        // Gdy dolny rog HUD (przyciski 2x2 + SYSTEM_LOG) zmieni rozmiar/pozycje - przelicz max-height
        // paneli, zeby nigdy nie nachodzily na ten rog (dziala tez dlugo po petli rozgrzewkowej).
        if (window.ResizeObserver) {
            var _ro = new ResizeObserver(function(){ adjustLayout(); });
            var _bh = document.getElementById('bottom-right-hud');
            if (_bh) _ro.observe(_bh);
        }

        // --- HELPER FUNCTIONS ---



        window.updateWeatherPanel = function(id, name, lat, lon) {
            const wPanel = document.getElementById("weather-content");
            const wTarget = document.getElementById("weather-target");
            if (!wPanel || !wTarget) return;   // symetria z updateCityWeather (defensywa)
            wTarget.innerText = "TARGET: " + name;
            wPanel.innerHTML = '<div class="scanning-text">ESTABLISHING UPLINK...</div>';
            const _wtoken = (window._cityWeatherToken = (window._cityWeatherToken || 0) + 1);

            window._fetchWeather(lat, lon)
                .then(data => {
                    if (window._cityWeatherToken !== _wtoken) return;   // inne target kliniete w miedzyczasie
                    const temp = data.current_weather.temperature;
                    const wind = data.current_weather.windspeed;
                    const code = data.current_weather.weathercode;
                    const desc = getWeatherDesc(code);
                    const icon = getWeatherIcon(code);
                    const windyUrl = `https://www.windy.com/?${lat},${lon},11`;
                    
                    let tadCountrySlug = (typeof TAD_COUNTRY_OVERRIDES !== 'undefined' && TAD_COUNTRY_OVERRIDES[id])
                        ? TAD_COUNTRY_OVERRIDES[id]
                        : window._tadCountrySlug(name);

                    let rawCapital = (typeof CAPITAL_NAMES !== 'undefined' && CAPITAL_NAMES[id]) ? CAPITAL_NAMES[id] : "unknown";

                    let tadCitySlug = (typeof TAD_CITY_OVERRIDES !== 'undefined' && TAD_CITY_OVERRIDES[rawCapital])
                        ? TAD_CITY_OVERRIDES[rawCapital]
                        : window._tadCitySlug(rawCapital);
                    
                    let climateUrl = `https://www.timeanddate.com/weather/${tadCountrySlug}/${tadCitySlug}/climate`;
                    if (rawCapital === "unknown" || id === "VA" || id === "SG") {
                        climateUrl = `https://www.timeanddate.com/weather/${tadCountrySlug}/climate`;
                    }
                    
                    wPanel.innerHTML = window._weatherEnvHTML(temp, wind, desc, icon, windyUrl, climateUrl);
                })
                .catch(err => {
                    if (window._cityWeatherToken !== _wtoken) return;   // inny target kliniety w miedzyczasie - nie nadpisuj
                    console.error("Weather Uplink Error:", err);
                    wPanel.innerHTML = '<div style="color: #dc2626; font-family: \'Consolas\', monospace; font-weight: bold;">⚠️ SIGNAL LOST</div>';
                });
        };

        window.liveClockInterval = null;

        window.updateFactbookPanel = function(id, name) {
            const fPanel = document.getElementById("factbook-content");
            const fTarget = document.getElementById("factbook-target");

            if (window.liveClockInterval) {
                clearInterval(window.liveClockInterval);
                window.liveClockInterval = null;
            }
            // Token przeciw wyscigowi: jesli w miedzyczasie klikniemy inny kraj, spozniona odpowiedz
            // fetcha zegara (ponizej) nie ma prawa juz nadpisac interwalu / pokazac obcej strefy czasowej.
            const _fbToken = (window._factbookToken = (window._factbookToken || 0) + 1);

            fTarget.innerText = "INTEL: " + name;
            fPanel.innerHTML = '<div class="scanning-text">RETRIEVING DOSSIER...</div>';

            if (id.startsWith("UM-") || id === "UM") {
                const intel = getIntel(id);
                const pColor = intel.p.includes("NIE") ? "#00ff00" : "#dc2626";
                
                fPanel.innerHTML = `
                    <div class="fact-row" style="border: none;"><span class="fact-key">SAFETY:</span><span class="fact-val" style="color:#facc15; font-weight:bold;">🟡 CAUTION</span></div>
                    <div class="fact-row"><span class="fact-key">STATUS:</span><span class="fact-val" style="color:#ef4444">MILITARY / RESTRICTED</span></div>
                    <div class="fact-row"><span class="fact-key">POWER:</span><span class="fact-val" style="color:${pColor}"><a href="https://www.iec.ch/world-plugs" target="_blank" rel="noopener" title="Wtyczki i napięcia świata (IEC World Plugs) — kraj wybierasz z listy na stronie" style="color:inherit; text-decoration:none;">${intel.p}</a></span></div>
                    <div class="fact-row"><span class="fact-key">WATER:</span><span class="fact-val" style="color:#dc2626">${intel.w}</span></div>
                    <div class="fact-row"><span class="fact-key">TIPPING:</span><span class="fact-val">${intel.t.toUpperCase()}</span></div>
                    <div class="fact-row"><span class="fact-key">INFO:</span><span class="fact-val">BRAK STAŁYCH MIESZKAŃCÓW</span></div>
                    <div style="margin-top:15px; color:#aab4c0; font-size:0.8rem; font-family:'JetBrains Mono'; line-height:1.4;">
                        > Te obiekty nie figurują w publicznych bazach API.<br>
                        > Dane zaciągnięte z lokalnego protokołu INTEL_DB.
                    </div>
                `;
                return; 
            }

            const c = (typeof FACTBOOK !== 'undefined') ? FACTBOOK[id] : null;
            if (!c) {
                fPanel.innerHTML = '<div style="color: #dc2626;">⚠️ CLASSIFIED DATA / ERROR</div>';
                return;
            }
            try {
                    const capitalRaw = (c.capital && c.capital.length) ? c.capital[0] : "N/A";
                    
                    let capitalBase = (typeof NUMBEO_OVERRIDES !== 'undefined' && NUMBEO_OVERRIDES[capitalRaw]) ? NUMBEO_OVERRIDES[capitalRaw] : capitalRaw;
                    let capitalForNumbeo = stripDiacritics(capitalBase);
                    let countryBase = (typeof NUMBEO_COUNTRY_OVERRIDES !== 'undefined' && NUMBEO_COUNTRY_OVERRIDES[id]) ? NUMBEO_COUNTRY_OVERRIDES[id] : c.name.common;
                    const countryNameSafe = stripDiacritics(countryBase).replace(/ /g, "+");
                    const capitalNameSafe = capitalForNumbeo.replace(/ /g, "+");
                    const numbeoUrl = `https://www.numbeo.com/cost-of-living/compare_cities.jsp?country1=Poland&country2=${countryNameSafe}&city1=Warsaw&city2=${capitalNameSafe}`;
                    
                    const countryNameSlug = stripDiacritics(c.name.common).toLowerCase().replace(/ /g, "-");
                    const countryNameWiki = stripDiacritics(c.name.common).replace(/ /g, "_");

                    let radioCode = id.toLowerCase();
                    if (id === 'GB') radioCode = 'uk'; 
                    const radioUrl = `https://onlineradiobox.com/${radioCode}/`;

                    let taSlug = (typeof TASTEATLAS_OVERRIDES !== 'undefined' && TASTEATLAS_OVERRIDES[id]) ? TASTEATLAS_OVERRIDES[id] : countryNameSlug;
                    const tasteAtlasUrl = `https://www.tasteatlas.com/${taSlug}`;
                    const holidaysUrl = (typeof QPP_LINKS !== 'undefined' && QPP_LINKS[id]) ? QPP_LINKS[id] : `https://www.qppstudio.net/public-holidays/${countryNameSlug}.htm`;
                    const simWikiUrl = (typeof SIM_WIKI_LINKS !== 'undefined' && SIM_WIKI_LINKS[id]) ? SIM_WIKI_LINKS[id] : `https://prepaid-data-sim-card.fandom.com/wiki/${countryNameWiki}`;
                    const mszUrl = getMszLink(id); 
                    const unsplashUrl = `https://unsplash.com/s/photos/${countryNameSlug}`;
                    const atlasUrl = (typeof ATLAS_LINKS !== 'undefined' && ATLAS_LINKS[id]) ? ATLAS_LINKS[id] : `https://www.atlasobscura.com/things-to-do/${countryNameSlug}`;
                    // WATER: link do isthewatersafe.com WYŁĄCZNIE dla krajów z jawnej bazy WATER_SAFE_LINKS (intel.js).
                    // Nie zgadujemy slugu generycznie - brak wpisu = brak linku (serwis nie ma tej strony), sam tekst.
                    const waterSlug = (typeof WATER_SAFE_LINKS !== 'undefined' && WATER_SAFE_LINKS[id]) ? WATER_SAFE_LINKS[id] : null;
                    const waterUrl = waterSlug ? `https://isthewatersafe.com/country/${waterSlug}` : null;
                    const safeLevel = (typeof SAFETY_OVERRIDE !== 'undefined' && SAFETY_OVERRIDE[id]) ? SAFETY_OVERRIDE[id] : 1;
                    const safeInfo = SAFETY_LABELS[safeLevel];
                    const tripUrl = `https://www.tripadvisor.com/Search?q=${countryNameSafe}`;
                    let wikiSlug = (typeof WIKIVOYAGE_OVERRIDES !== 'undefined' && WIKIVOYAGE_OVERRIDES[id]) ? WIKIVOYAGE_OVERRIDES[id] : countryNameWiki;
                    const wikiUrl = `https://en.wikivoyage.org/wiki/${wikiSlug}`;
                    
                    // --- OVERRIDE DLA GOOGLE MAPS ---
                    const GMAPS_OVERRIDES = {
                        "GL": "Grenlandia",
                        "GE": "Gruzja",
                        "SJ": "Svalbard",
                        "AQ": "Antarktyda"
                    };
                    let gmapsTarget = GMAPS_OVERRIDES[id] || countryNameSafe;
                    const gmapsUrl = `https://www.google.com/maps/place/${gmapsTarget}`;

                    // --- GENEROWANIE LINKU DLA SLEEPING IN AIRPORTS ---
                    // Znany slug glownego lotniska -> bezposredni guide; inaczej -> fallback wyszukiwania po stolicy.
                    const airportCitySlug = stripDiacritics(capitalRaw).toLowerCase().replace(/['’]/g, "").replace(/ /g, "-");
                    const airportSlug = (typeof AIRPORT_GUIDES !== 'undefined' && AIRPORT_GUIDES[id]) ? AIRPORT_GUIDES[id] : null;
                    const airportsUrl = airportSlug
                        ? `https://www.sleepinginairports.net/guides/${airportSlug}.htm`
                        : `https://www.sleepinginairports.net/?s=${airportCitySlug}`;

                    const intel = getIntel(id); 
                    const pColor = intel.p.includes("NIE") ? "#00ff00" : "#dc2626";
                    
                    const currKey = Object.keys(c.currencies || {})[0] || "N/A";
                    // Link waluty (redar.net) - TYLKO gdy kod jest w jawnej bazie CURRENCY_LINKS (intel.js).
                    // Jedna waluta = wiele krajow (klucz to kod ISO 4217 z FACTBOOK). Brak wpisu = sam kod bez linku.
                    const currUrl = (typeof CURRENCY_LINKS !== 'undefined' && CURRENCY_LINKS[currKey]) ? CURRENCY_LINKS[currKey] : null;
                    const _currCodeHtml = currUrl
                        ? `<a href="${currUrl}" target="_blank" rel="noopener" title="Waluta ${currKey} na redar.net" style="color:inherit; text-decoration:none;">${currKey}</a>`
                        : currKey;

                    const pop = c.population ? (c.population > 1000000 ? (c.population / 1000000).toFixed(1) + "M" : (c.population / 1000).toFixed(1) + "k") : "N/A";
                    const flagUrl = (typeof FLAGS !== 'undefined' && FLAGS[id]) ? FLAGS[id] : (c.flags ? c.flags.svg : "");
                    const cca2 = c.cca2 || "N/A";
                    const languages = Object.values(c.languages || {}).join(', ') || "N/A";
                    const area = c.area ? c.area.toLocaleString() + " km²" : "N/A";
                    const idd = (c.idd && c.idd.root) ? (c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "")) : "N/A";

                    const religionVal = (typeof RELIGIONS !== 'undefined' && RELIGIONS[id]) ? RELIGIONS[id] : "N/A";
                    // Link RELIGION -> pl.wikipedia dominujacej wiary. Wartosci sa zlozone ("Islam (Szyizm)",
                    // "Katolicyzm / Voodoo"), wiec bierzemy slowo-klucz o najmniejszym indeksie = pierwsza religia.
                    // Bez klucza (np. "Brak (Nauka)") = brak linku. Baza: RELIGION_LINKS (intel.js).
                    let relUrl = null;
                    if (typeof RELIGION_LINKS !== 'undefined' && religionVal !== "N/A") {
                        const _relLc = religionVal.toLowerCase();
                        let _relBest = Infinity;
                        for (const _kw in RELIGION_LINKS) {
                            const _i = _relLc.indexOf(_kw);
                            if (_i >= 0 && _i < _relBest) { _relBest = _i; relUrl = RELIGION_LINKS[_kw]; }
                        }
                    }
                    const costVal = (typeof COST_INDEX !== 'undefined' && COST_INDEX[id]) ? COST_INDEX[id] : "$$";
                    
                    let costColor = "#ffff00";
                    if(costVal === "$") costColor = "#00ff00";
                    if(costVal === "$$") costColor = "#aaff00";
                    if(costVal === "$$$") costColor = "#ffaa00";
                    if(costVal === "$$$$") costColor = "#ff0000";

                    const wawLat = 52.2297; const wawLon = 21.0122;
                    let distance = "N/A";
                    if (c.latlng) distance = Math.round(getDist(wawLat, wawLon, c.latlng[0], c.latlng[1])).toLocaleString() + " KM";

                    const _isCountryVisited = (typeof VISITED_COUNTRIES !== 'undefined') && VISITED_COUNTRIES.indexOf(id) >= 0;
                    const countryVisitedRowHtml = '<div class="fact-row" id="country-visited-row" style="cursor:' + (_isCountryVisited ? 'default' : 'pointer') + ';" title="' + (_isCountryVisited ? '' : 'Kliknij, zeby oznaczyc jako odwiedzone') + '"><span class="fact-key">ODWIEDZONE:</span><span class="fact-val" id="country-visited-val" style="color:' + (_isCountryVisited ? '#22c55e' : '#8f9ba8') + ';">' + (_isCountryVisited ? '✅ TAK' : '☐ NIE (kliknij)') + '</span></div>';

                    let citiesRowHtml = "";
                    if (typeof CITIES_DB !== 'undefined' && CITIES_DB[id] && CITIES_DB[id].length) {
                        const _cList = CITIES_DB[id];
                        const _vSet = window._visitedCitySet ? window._visitedCitySet() : {};
                        const _vCount = _cList.filter(function(ci){ return !!_vSet[window._cityId(id, ci[0])]; }).length;
                        const _pct = Math.round((_vCount / _cList.length) * 100);
                        citiesRowHtml = `<div class="fact-row"><span class="fact-key">MIASTA:</span><span class="fact-val" style="color:${_vCount > 0 ? '#22c55e' : '#8f9ba8'}">${_vCount} / ${_cList.length} (${_pct}%)</span></div>`;
                    }

                    fPanel.innerHTML = `
                        <img src="${flagUrl}" class="fact-img" alt="Flag">
                        
                        <div class="fact-row" style="border: none;"><span class="fact-key">SAFETY:</span><span class="fact-val" style="color:${safeInfo.color}; font-weight:bold; text-shadow: 0 0 5px ${safeInfo.color}44;">${safeInfo.text}<span id="live-safety-badge" title="Sprawdzanie zgodności z danymi live..." style="margin-left:6px; font-size:0.85em; opacity:0.5;">⏳</span></span></div>
                        
                        <div class="fact-row" style="margin-top:-5px; margin-bottom:12px; display:block;"><div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color:${safeInfo.color}; width: 100%; text-align: right; white-space: normal; line-height: 1.2;">${safeInfo.desc}</div></div>

                        <div class="fact-row"><span class="fact-key">CODE:</span><span class="fact-val" style="color:#facc15">${cca2}</span></div>
                        <div class="fact-row"><span class="fact-key">CAPITAL:</span><span class="fact-val">${capitalRaw.toUpperCase()}</span></div>
                        <div class="fact-row"><span class="fact-key">DIST. WAW:</span><span class="fact-val" style="color:#00ccff">${distance}</span></div>
                        
                        <div class="fact-row"><span class="fact-key">POWER:</span><span class="fact-val" style="color:${pColor}"><a href="https://www.iec.ch/world-plugs" target="_blank" rel="noopener" title="Wtyczki i napięcia świata (IEC World Plugs) — kraj wybierasz z listy na stronie" style="color:inherit; text-decoration:none;">${intel.p}</a></span></div>
                        <div class="fact-row"><span class="fact-key">WATER:</span><span class="fact-val" style="color:${intel.w.includes('✅') ? '#00ff00' : '#dc2626'}">${waterUrl ? `<a href="${waterUrl}" target="_blank" rel="noopener" title="Sprawdź, czy woda z kranu jest bezpieczna (isthewatersafe.com)" style="color:inherit; text-decoration:none;">${intel.w}</a>` : intel.w}</span></div>
                        <div class="fact-row"><span class="fact-key">TIPPING:</span><span class="fact-val">${intel.t.toUpperCase()}</span></div>

                        ${countryVisitedRowHtml}
                        <div class="fact-row"><span class="fact-key">POPULATION:</span><span class="fact-val">${pop}</span></div>
                        <div class="fact-row"><span class="fact-key">AREA:</span><span class="fact-val">${area}</span></div>
                        ${citiesRowHtml}
                        <div class="fact-row"><span class="fact-key">LANG:</span><span class="fact-val"><a href="https://www.localingual.com/?ISO=${id}" target="_blank" rel="noopener" title="Posłuchaj języków tego kraju (localingual.com)" style="color:inherit; text-decoration:none;">${languages.toUpperCase()}</a></span></div>
                        
                        <div class="fact-row"><span class="fact-key">RELIGION:</span><span class="fact-val" style="color:#ddd;">${relUrl ? `<a href="${relUrl}" target="_blank" rel="noopener" title="O tej religii na Wikipedii" style="color:inherit; text-decoration:none;">${religionVal.toUpperCase()}</a>` : religionVal.toUpperCase()}</span></div>
                        <div class="fact-row"><span class="fact-key">COST INDEX:</span><span class="fact-val" style="color:${costColor}; letter-spacing: 2px;">${costVal}</span></div>

                        <div class="fact-row" id="live-rate-row" style="display:none;">
                            <span class="fact-key">1 PLN =</span>
                            <span class="fact-val" id="live-rate-val" style="color:#00ff00;">...</span>
                        </div>
                        <div class="fact-row" id="live-rate-row-rev" style="display:none;">
                            <span class="fact-key" id="live-rate-key-rev">1 LOCAL =</span>
                            <span class="fact-val" id="live-rate-val-rev" style="color:#00ccff;">...</span>
                        </div>

                        <div class="fact-row"><span class="fact-key">DIAL CODE:</span><span class="fact-val">${idd}</span></div>
                        
                        <div class="fact-row"><span class="fact-key">LOCAL TIME:</span><span class="fact-val" id="live-local-time" style="color:#facc15; animation: blink 1s infinite;">CONNECTING...</span></div>
                        
                        <div class="links-grid">
                            <a href="${numbeoUrl}" target="_blank" class="numbeo-btn">💲 NUMBEO</a>
                            <a href="${mszUrl}" target="_blank" class="msz-btn">🦅 MSZ.GOV.PL</a>
                            <a href="${tasteAtlasUrl}" target="_blank" class="windy-btn" style="background: rgba(255, 165, 0, 0.15); border: 1px solid orange; color: orange;">🥘 TASTE ATLAS</a>
                            <a href="${holidaysUrl}" target="_blank" class="windy-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid #ccc; color: #ccc;">📅 ŚWIĘTA (QPP)</a>
                            <a href="${simWikiUrl}" target="_blank" class="windy-btn" style="background: rgba(0, 204, 255, 0.15); border: 1px solid #00ccff; color: #00ccff;">📲 SIM WIKI</a>
                            <a href="${radioUrl}" target="_blank" class="windy-btn" style="background: rgba(255, 0, 255, 0.15); border: 1px solid #ff00ff; color: #ff00ff; letter-spacing: 1px;">📻 RADIO BOX</a>
                            <a href="${unsplashUrl}" target="_blank" class="windy-btn" style="background: rgba(255, 255, 255, 0.1); border: 1px solid #ffffff; color: #ffffff;">📸 FOTO</a>
                            <a href="${atlasUrl}" target="_blank" class="windy-btn" style="background: rgba(139, 0, 0, 0.2); border: 1px solid #8b0000; color: #ff4444;">💀 ATLAS OBSCURA</a>
                            <a href="${tripUrl}" target="_blank" class="windy-btn" style="background: rgba(52, 224, 161, 0.15); border: 1px solid #34e0a1; color: #34e0a1;">🦉 TRIP ADVISOR</a>
                            <a href="${wikiUrl}" target="_blank" class="windy-btn" style="background: rgba(0, 212, 255, 0.15); border: 1px solid #00d4ff; color: #00d4ff;">🌐 WIKIVOYAGE</a>
                            <a href="${gmapsUrl}" target="_blank" class="windy-btn" style="background: rgba(66, 133, 244, 0.15); border: 1px solid #4285F4; color: #4285F4;">🗺️ GOOGLE MAPS</a>
                            <a href="${airportsUrl}" target="_blank" class="windy-btn" style="background: rgba(106, 27, 154, 0.15); border: 1px solid #8E24AA; color: #BA68C8;">🛬 AIRPORT GUIDE</a>
                        </div>
                    `;

                    const _cVisRow = document.getElementById("country-visited-row");
                    if (_cVisRow && !_isCountryVisited) {
                        _cVisRow.onclick = function(){
                            if (!confirm("Oznaczyć \"" + c.name.common + "\" jako ODWIEDZONE PAŃSTWO?\n\nUWAGA: cofnięcie tego będzie możliwe tylko w panelu admina.")) return;
                            window.markVisitedCountry(id, function(){
                                const valEl = document.getElementById("country-visited-val");
                                if (valEl) { valEl.textContent = "✅ TAK"; valEl.style.color = "#22c55e"; }
                                _cVisRow.style.cursor = "default";
                                _cVisRow.title = "";
                                _cVisRow.onclick = null;
                            });
                        };
                    }

                    const safetyBadgeEl = document.getElementById("live-safety-badge");
                    if (safetyBadgeEl) {
                        const fcdoSlug = (typeof FCDO_SLUGS !== 'undefined' && FCDO_SLUGS[id]) ? FCDO_SLUGS[id] : countryNameSlug;
                        window._fetchTimeout(`https://www.gov.uk/api/content/foreign-travel-advice/${fcdoSlug}`)
                            .then(r => { if (!r.ok) throw new Error("API Error"); return r.json(); })
                            .then(d => {
                                const alertStatus = (d && d.details && d.details.alert_status) || [];
                                let liveLevel;
                                if (!alertStatus.length) liveLevel = 1;
                                else if (alertStatus.includes('avoid_all_travel_to_whole_country')) liveLevel = 5;
                                else if (alertStatus.includes('avoid_all_travel_to_parts') || alertStatus.includes('avoid_all_but_essential_travel_to_whole_country')) liveLevel = 4;
                                else if (alertStatus.includes('avoid_all_but_essential_travel_to_parts')) liveLevel = 3;
                                else liveLevel = 2;

                                const niedoszacowane = (liveLevel > safeLevel);
                                safetyBadgeEl.innerText = niedoszacowane ? "⚠️" : "✔";
                                safetyBadgeEl.style.color = niedoszacowane ? "" : "#22c55e";
                                safetyBadgeEl.style.opacity = "1";
                                safetyBadgeEl.title = niedoszacowane
                                    ? `UWAGA: FCDO (gov.uk) sugeruje wyższy poziom ryzyka (${liveLevel}) niż nasza baza (${safeLevel}). Aktualizacja: ${d.public_updated_at || 'b/d'}`
                                    : `Baza nie zaniża ryzyka względem FCDO (poziom lokalny ${safeLevel} vs live ${liveLevel})`;
                            })
                            .catch(() => { safetyBadgeEl.style.display = 'none'; });
                    }

                    const coords = CAPITAL_COORDS[id];
                    if(coords) {
                        window._fetchWeather(coords[0], coords[1])
                            .then(weatherData => {
                                if (window._factbookToken !== _fbToken) return;
                                window._startLiveClock("live-local-time", weatherData.utc_offset_seconds);
                            })
                            .catch(e => {
                                console.error("Time logic fail:", e);
                                const timeEl = document.getElementById("live-local-time");
                                if(timeEl) { timeEl.innerText = "OFFLINE"; timeEl.style.color = "#dc2626"; }
                            });
                    } else {
                         document.getElementById("live-local-time").innerText = "NO DATA";
                    }

                    if (currKey !== "N/A" && currKey !== "PLN") {
                        const rateRow = document.getElementById("live-rate-row");
                        const rateVal = document.getElementById("live-rate-val");
                        const rateRowRev = document.getElementById("live-rate-row-rev");
                        const rateValRev = document.getElementById("live-rate-val-rev");
                        const rateKeyRev = document.getElementById("live-rate-key-rev");
                        
                        if(rateRow) {
                            window._fetchRatesPLN()
                                .then(d => {
                                    const rate = d.rates[currKey];
                                    if (rate) {
                                        let displayRate = rate > 100 ? rate.toFixed(0) : rate.toFixed(2);
                                        rateVal.innerHTML = `${displayRate} ${_currCodeHtml}`;
                                        rateRow.style.display = "flex";

                                        const revRate = 1 / rate;
                                        let displayRev = revRate < 0.1 ? revRate.toFixed(4) : revRate.toFixed(2);

                                        rateKeyRev.innerHTML = `1 ${_currCodeHtml} =`;
                                        rateValRev.innerText = `${displayRev} PLN`;
                                        rateRowRev.style.display = "flex";

                                    } else {
                                        rateVal.innerText = "NO DATA";
                                        rateVal.style.color = "#555";
                                        rateRow.style.display = "flex";
                                    }
                                })
                                .catch(e => {
                                    console.warn("Currency fetch failed:", e);
                                    rateVal.innerText = "OFFLINE";
                                    rateVal.style.color = "#dc2626";
                                    rateRow.style.display = "flex";
                                });
                        }
                    }
            } catch (err) {
                console.error(err);
                fPanel.innerHTML = '<div style="color: #dc2626;">⚠️ CLASSIFIED DATA / ERROR</div>';
            }
        };
		

        am5.ready(function() {
            try {
                // --- LISTEN FOR GLOBAL FLAG CLICKS ---
                document.addEventListener('flagClicked', function(e) {
                    const { id, name } = e.detail;

                    stopRot();   // bylo: autoRot.pause() - stopRot robi to samo + sprzata samolot

                    // GLOB I GLOWNY ZNACZNIK ZAWSZE NA STOLICY. Najdalsze odwiedzone miasto dostaje
                    // WLASNY, zloty znacznik + przerywany luk ze stolicy - dzieki temu widac i "gdzie
                    // jest ten kraj", i "jak daleko w nim dotarles", bez przenoszenia kamery na peryferie
                    // (np. Hiszpania: Madryt zostaje w kadrze, a Arona na Teneryfie jest podpieta lukiem).
                    // Fallback na miasto, gdyby kraj nie mial wpisu w CAPITAL_COORDS.
                    var _stats = window._countryCityStats(id);
                    var _far = _stats.farthest;
                    var _cap = CAPITAL_COORDS[id];
                    var c = _cap || (_far ? [_far.lat, _far.lon] : null);
                    if(c) {
                        lineSeries.data.clear();
                        // DYSTANS = do najdalszego odwiedzonego miasta (to jest wlasnie "zasieg"), a nie
                        // do punktu, w ktorym stoi glowny znacznik. Etykieta nazywa to wprost
                        // ("MAX DISTANCE: ARONA - 4101 KM"), wiec nie ma tu sprzecznosci - a przy braku
                        // odwiedzonych miast podpis zmienia sie na "CAPITAL" i liczy do stolicy.
                        let _distPt = _far ? [_far.lat, _far.lon] : c;
                        let dist = Math.round(getDist(52.23, 21.01, _distPt[0], _distPt[1]));
                        let flag = getFlagEmoji(id);
                        // Nazwa miejsca i licznik ida OSOBNYMI polami - etykiete sklada bullet serii.
                        let _capName = (typeof CAPITAL_NAMES !== 'undefined' && CAPITAL_NAMES[id]) ? CAPITAL_NAMES[id] : null;

                        rotateGlobe(c[0], c[1]);

                        var _pts = [{
                            geometry: { type: "Point", coordinates: [c[1], c[0]] },
                            type: "visited",
                            title: name,
                            cities: _stats.count,
                            dist: dist,
                            distCity: _far ? _far.name.toUpperCase() : (_capName ? _capName.toUpperCase() : null),
                            distLabel: _far ? "MAX DISTANCE" : "CAPITAL",
                            flag: flag
                        }];

                        // Drugi znacznik + luk TYLKO gdy najdalsze miasto realnie lezy gdzie indziej niz
                        // stolica. Bez tego progu kraje, w ktorych jedynym odwiedzonym miastem jest sama
                        // stolica, dostawalyby dwa znaczniki jeden na drugim i luk o zerowej dlugosci.
                        var _apart = _far && _cap && !window._isSameSpot(_far.lat, _far.lon, _cap[0], _cap[1]);
                        if (_apart) {
                            _pts.push({
                                geometry: { type: "Point", coordinates: [_far.lon, _far.lat] },
                                type: "farcity",
                                title: _far.name.toUpperCase()
                            });
                            lineSeries.pushDataItem({ geometry: { type: "LineString", coordinates: [[_cap[1], _cap[0]], [_far.lon, _far.lat]] } });
                        }
                        pointSeries.data.setAll(_pts);

                        window.resetIntelPanels();
                    }
                    // MUSI byc PO resetIntelPanels - ono zdejmuje podswietlenie z paska. Poza if(c),
                    // zeby kraj bez wpisu w CAPITAL_COORDS tez pokazal, ktora flage klikneto.
                    window._setLootBarActive(id);
                });

                var root = am5.Root.new("chartdiv");
                root.setThemes([am5themes_Animated.new(root)]);
				var chart = root.container.children.push(am5map.MapChart.new(root, { 
					panX: "rotateX", 
					panY: "rotateY", 
					wheelX: "none", 
					wheelY: "none", 
					pinchZoom: false, 
					minZoomLevel: 1,
					maxZoomLevel: 40,
					projection: am5map.geoOrthographic(), 
					dy: -50, 
					paddingBottom: 0, 
					paddingTop: 0, 
					paddingLeft: 0, 
					paddingRight: 0,
					rotationX: -20, 
					rotationY: -15 
				}));
				window.__globeChart = chart;
				(function(){ var cap = window.innerWidth * 0.50; var extra = Math.max(0, window.innerHeight - cap); chart.set("paddingTop", extra/2); chart.set("paddingBottom", extra/2); })();
				// ZOOM kolkiem - zawsze wycentrowany na punkcie na srodku globu (nie ucieka "za planete")
				(function(){
					var cd = document.getElementById("chartdiv");
					if (!cd) return;
					cd.addEventListener("wheel", function(e){
						e.preventDefault();
						var z = chart.get("zoomLevel") || 1;
						z = (e.deltaY < 0) ? z * 1.2 : z / 1.2;
						z = Math.max(1, Math.min(40, z));
						var center = { longitude: -chart.get("rotationX"), latitude: -chart.get("rotationY") };
						chart.zoomToGeoPoint(center, z, true, 250);
					}, { passive: false });
				})();
                var autoRot; var resetBtn = document.getElementById("reset-btn");
                // keepZoom = true tylko dla sciezek, ktore SAME ustawiaja zoom zaraz po obrocie
                // (np. skok do miasta z wyszukiwarki: zoomLevel -> 6). Wszystkie pozostale nawigacje
                // (kontynent, MAX DISTANCE, SHOW ON GLOBE, target misji, cud, kraj z listy...) pokazuja
                // caly cel na raz, wiec globus musi wrocic do pelnego widoku - inaczej po wczesniejszym
                // przyblizeniu nowy cel ladowal poza kadrem.
                function rotateGlobe(lat, lon, dur = 1000, keepZoom) {
                    if (!keepZoom && (chart.get("zoomLevel") || 1) > 1.05) {
                        chart.animate({ key: "zoomLevel", to: 1, duration: dur, easing: am5.ease.out(am5.ease.cubic) });
                    }
                    // rotationX (dlugosc) akumuluje sie w nieskonczonosc przez autoRot (+360 w petli),
                    // wiec animacja do bezwzglednego -lon potrafila objechac glob dookola (do ~360 st.).
                    // Sprowadzamy cel do najkrotszej drogi: najblizszy rownowazny kat wzgledem obecnego.
                    var curX = chart.get("rotationX") || 0;
                    var targetX = curX + (((((-lon) - curX) % 360) + 540) % 360) - 180;
                    chart.animate({ key: "rotationX", to: targetX, duration: dur, easing: am5.ease.out(am5.ease.cubic) });
                    chart.animate({ key: "rotationY", to: -lat, duration: dur, easing: am5.ease.out(am5.ease.cubic) });
                }
                var bg = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
                bg.mapPolygons.template.setAll({ fill: am5.color(0x0e2a47), stroke: am5.color(0x0e2a47), fillOpacity: 1 });
                bg.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });
                var poly = chart.series.push(am5map.MapPolygonSeries.new(root, { geoJSON: WORLD_GEO, exclude: [] }));
                
                poly.mapPolygons.template.setAll({ tooltipText: "{name}", interactive: true, fill: am5.color(0x2d2d2d), stroke: am5.color(0x000000), strokeWidth: 1 });
                poly.mapPolygons.template.states.create("active", { fill: am5.color(0xdc2626) });
                poly.mapPolygons.template.adapters.add("tooltipText", function(text, target) {
                    var dc = target.dataItem && target.dataItem.dataContext;
                    return (dc && dc.id === window._selectedCountryId) ? undefined : text;
                });
                
                // --- TERMINATOR DZIEN/NOC: nocna polkula + pas zmierzchu wg realnej pozycji Slonca (odswiezanie co minute) ---
                try {
                    var _twiSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
                    _twiSeries.mapPolygons.template.setAll({ fill: am5.color(0x0a1020), fillOpacity: 0.20, strokeOpacity: 0, interactive: false });
                    var _nightSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
                    _nightSeries.mapPolygons.template.setAll({ fill: am5.color(0x05080f), fillOpacity: 0.46, stroke: am5.color(0xffb066), strokeOpacity: 0.30, strokeWidth: 1, interactive: false });
                    window.__nightSeries = _nightSeries;
                    var _subsolar = function(d){
                        var rad = Math.PI/180;
                        var N = Math.floor((d.getTime() - Date.UTC(d.getUTCFullYear(),0,0)) / 86400000);
                        var utc = d.getUTCHours() + d.getUTCMinutes()/60 + d.getUTCSeconds()/3600;
                        var decl = -23.44 * Math.cos(rad * (360/365) * (N+10));       // deklinacja Slonca
                        var B = rad * (360/365) * (N-81);
                        var eot = 9.87*Math.sin(2*B) - 7.53*Math.cos(B) - 1.5*Math.sin(B); // rownanie czasu [min]
                        var lon = ((-15*(utc-12) - eot/4) + 540) % 360 - 180;         // dlugosc podsloneczna
                        return { lat: decl, lon: lon };
                    };
                    var updateTerminator = function(){
                        var s = _subsolar(new Date());
                        var antiLat = -s.lat, antiLon = ((s.lon + 180 + 540) % 360) - 180;  // punkt antysloneczny
                        var c = { latitude: antiLat, longitude: antiLon };
                        _twiSeries.data.setAll([{ geometry: am5map.getGeoCircle(c, 96) }]);
                        _nightSeries.data.setAll([{ geometry: am5map.getGeoCircle(c, 90) }]);
                    };
                    _twiSeries.hide(0); _nightSeries.hide(0);   // DOMYSLNIE OFF
                    window._terminatorOn = false;
                    window.setTerminator = function(on){
                        window._terminatorOn = !!on;
                        if (on) {
                            updateTerminator();
                            _twiSeries.show(); _nightSeries.show();
                            if (!window._terminatorInterval) window._terminatorInterval = setInterval(updateTerminator, 60000);
                        } else {
                            if (window._terminatorInterval) { clearInterval(window._terminatorInterval); window._terminatorInterval = null; }
                            _twiSeries.hide(); _nightSeries.hide();
                        }
                    };
                } catch(_te) { console.warn("Terminator init failed:", _te); }

                // --- STREFY CZASOWE (polityczne, Natural Earth): kolor wg offsetu + czas/roznica do Warszawy na hover; DOMYSLNIE OFF, lazy-load ---
                try {
                    // Offset Warszawy w GODZINACH - liczony z window._warsawOffSec() (sekundy, wlasny cache 60s,
                    // def. na gorze app.js), zeby nie dublowac logiki toLocaleString/DST w drugim miejscu.
                    var _tzWarsawOff = function(){ return Math.round(window._warsawOffSec() / 3600); };
                    var _hsl2hex = function(h,s,l){                       // HSL -> int hex
                        s/=100; l/=100; var a=s*Math.min(l,1-l);
                        var f=function(n){ var k=(n+h/30)%12; var c=l-a*Math.max(-1,Math.min(k-3,Math.min(9-k,1))); return Math.round(255*c); };
                        return (f(0)<<16)|(f(8)<<8)|f(4);
                    };
                    var _tzColor = function(off){ return _hsl2hex(((off+12)/26)*310, 70, 55); };
                    var _fmtHM = function(x){ var s=x<0?"-":"+"; x=Math.abs(x); var h=Math.floor(x); var m=Math.round((x-h)*60); return s+h+(m?(":"+("0"+m).slice(-2)):"")+"h"; };
                    var _tzTooltip = function(dc){
                        var off = (typeof dc.zone === "number") ? dc.zone : 0;
                        var Woff = _tzWarsawOff();
                        var eff = off + ((dc.dst_places && Woff > 1) ? 1 : 0);   // przyblizenie DST: strefy z DST idą sezonem Warszawy
                        var d = new Date(Date.now() + eff*3600000);
                        var hh = ("0"+d.getUTCHours()).slice(-2), mm = ("0"+d.getUTCMinutes()).slice(-2);
                        var oh = Math.floor(Math.abs(eff)), om = Math.round((Math.abs(eff)-oh)*60);
                        var offTxt = "UTC" + (eff<0?"-":"+") + oh + ":" + ("0"+om).slice(-2);
                        var diff = eff - Woff;
                        return (dc.places || dc.time_zone || "Strefa czasowa") + "\n" + hh+":"+mm + "   " + offTxt + "\ndo Warszawy: " + (Math.abs(diff)<0.01 ? "0h (ta sama)" : _fmtHM(diff));
                    };
                    var _tzSeries = null;
                    window._tzOn = false;
                    window.setTimezones = function(on){
                        window._tzOn = !!on;
                        if (on) {
                            if (window.stopRot) window.stopRot();   // stop auto-rotacji -> brak reprojekcji co klatke
                            if (!_tzSeries) {
                                _tzSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
                                _tzSeries.mapPolygons.template.setAll({ fillOpacity: 0.38, strokeOpacity: 0.5, strokeWidth: 0.5, interactive: true, tooltipText: "{places}" });
                                _tzSeries.mapPolygons.template.states.create("hover", { fillOpacity: 0.66 });
                                _tzSeries.mapPolygons.template.adapters.add("fill", function(f, target){ var dc=target.dataItem&&target.dataItem.dataContext; return (dc&&typeof dc.zone==="number")?am5.color(_tzColor(dc.zone)):f; });
                                _tzSeries.mapPolygons.template.adapters.add("stroke", function(f, target){ var dc=target.dataItem&&target.dataItem.dataContext; return (dc&&typeof dc.zone==="number")?am5.color(_tzColor(dc.zone)):f; });
                                _tzSeries.mapPolygons.template.adapters.add("tooltipText", function(t, target){ var dc=target.dataItem&&target.dataItem.dataContext; return dc?_tzTooltip(dc):t; });
                                _tzSeries.set("visible", false);
                                fetch("tz-data.json").then(function(r){ return r.json(); }).then(function(gj){ _tzSeries.set("geoJSON", gj); _tzSeries.set("visible", !!window._tzOn); }).catch(function(e){ console.warn("tz-data.json load failed", e); });
                            }
                            _tzSeries.set("visible", true);
                        } else if (_tzSeries) {
                            _tzSeries.set("visible", false);
                        }
                    };
                } catch(_tze) { console.warn("Timezones init failed:", _tze); }

                // --- WARSTWA WIZOWA (paszport PL): kolor krajow wg wymogu + tooltip; DOMYSLNIE OFF ---
                try {
                    var _visaCols = { free: 0x22c55e, easy: 0xf59e0b, req: 0xdc2626, home: 0x3b82f6 };
                    var _visaReq = function(id){ return window._visaFor(id); };
                    var _visaBucket = function(req){
                        if (req == null || req === "") return null;
                        if (req === "-1") return "home";
                        if (req === "visa required") return "req";
                        if (req === "visa on arrival" || req === "e-visa" || req === "eta") return "easy";
                        return "free";   // liczba dni lub "visa free"
                    };
                    var _visaTip = function(dc){
                        var id = dc.id, name = dc.name || id;
                        if (id === "PL") return name + "\n🇵🇱 Twój paszport";
                        var ov = (typeof VISA_PL_OVERRIDES !== "undefined") && VISA_PL_OVERRIDES[id];
                        var req = _visaReq(id);
                        if (req == null) return name + "\nbrak danych wizowych";
                        var lab;
                        if (req === "visa required") lab = "🔴 Wiza wymagana";
                        else if (req === "visa on arrival") lab = "🟡 Wiza po przylocie";
                        else if (req === "e-visa") lab = "🟡 e-Visa (online)";
                        else if (req === "eta") lab = "🟡 eTA (autoryzacja online)";
                        else if (req === "visa free") lab = "🟢 Bez wizy";
                        else lab = "🟢 Bez wizy — " + req + " dni";
                        return name + "\n" + lab + (ov ? "\n(korekta reczna wg MSZ)" : "");
                    };
                    var _visaSeries = null;
                    window._visaOn = false;
                    window.setVisa = function(on){
                        window._visaOn = !!on;
                        if (on) {
                            if (window.stopRot) window.stopRot();
                            if (!_visaSeries) {
                                _visaSeries = chart.series.push(am5map.MapPolygonSeries.new(root, { geoJSON: WORLD_GEO, exclude: ["AQ"] }));
                                _visaSeries.mapPolygons.template.setAll({ fillOpacity: 1, stroke: am5.color(0x0a0a0a), strokeOpacity: 0.55, strokeWidth: 0.5, interactive: true, tooltipText: "{name}" });
                                _visaSeries.mapPolygons.template.states.create("hover", { stroke: am5.color(0xffffff), strokeOpacity: 0.95, strokeWidth: 1.6 });
                                _visaSeries.mapPolygons.template.adapters.add("fill", function(f, target){
                                    var dc = target.dataItem && target.dataItem.dataContext; if(!dc) return f;
                                    var b = (dc.id === "PL") ? "home" : _visaBucket(_visaReq(dc.id));
                                    return am5.color(b ? _visaCols[b] : 0x3a3a3a);
                                });
                                _visaSeries.mapPolygons.template.adapters.add("tooltipText", function(t, target){ var dc=target.dataItem&&target.dataItem.dataContext; return dc?_visaTip(dc):t; });
                                // Klik w kraj w trybie VISA: wylacz tryb (+ przycisk) i otworz intel kraju jak w normalnym trybie.
                                _visaSeries.mapPolygons.template.events.on("click", function(ev){
                                    var dc = ev.target.dataItem && ev.target.dataItem.dataContext; if(!dc) return;
                                    if (ev.target.hideTooltip) ev.target.hideTooltip();
                                    if (window._exitActiveOverlayMode) window._exitActiveOverlayMode();   // nakladka znika -> highlight lezy na bazowej serii
                                    var pItem = poly.getDataItemById(dc.id);
                                    if (window._selectCountry) window._selectCountry(dc.id, (dc.name || dc.id).toUpperCase(), pItem ? pItem.get("mapPolygon") : null);
                                });
                            }
                            _visaSeries.set("visible", true);
                            if (window.showVisaLegend) window.showVisaLegend(true);
                        } else {
                            if (_visaSeries) _visaSeries.set("visible", false);
                            if (window.showVisaLegend) window.showVisaLegend(false);
                        }
                    };
                } catch(_ve) { console.warn("Visa init failed:", _ve); }

                // --- TRYB KLIMATYCZNY "GDZIE W <miesiac>": kolor krajow wg komfortu temperaturowego; DOMYSLNIE OFF ---
                // Rozlewa skale travelTier() (z panelu klimatu miasta) na caly glob. Reprezentacyjnym punktem
                // kraju jest jego STOLICA (CAPITAL_COORDS z intel.js), a temperatura miesiaca pochodzi z
                // prekompilowanych normalnych CLIMATE_DB (klucz round(lat*4)/4, tak samo jak _climateCache).
                // Progi 12/18/27/32 sa DOKLADNIE te same co travelTier, tylko rozbite na strone zimna/cieplo,
                // zeby mapa odrozniala "za zimno" od "za goraco" (travelTier zwija oba w tier 0 - nierozroznialne
                // na mapie decyzyjnej "gdzie mi w lutym cieplo"). Tryb WYKLUCZAJACY sie z VISA/ZONES/NIGHT (_modes).
                try {
                    var _cliMonthNames = ["styczniu","lutym","marcu","kwietniu","maju","czerwcu","lipcu","sierpniu","wrześniu","październiku","listopadzie","grudniu"];
                    var _cliMonAbbr    = ["STY","LUT","MAR","KWI","MAJ","CZE","LIP","SIE","WRZ","PAŹ","LIS","GRU"];
                    var _cliBandCols = [0x2563eb, 0x38bdf8, 0x22c55e, 0xf59e0b, 0xdc2626];
                    var _cliBandLbl  = ["zimno","chłodno","idealnie","ciepło","upał"];
                    function _cliBand(t){ if(t<12) return 0; if(t<18) return 1; if(t<=27) return 2; if(t<=32) return 3; return 4; }
                    var _cliMonth = (new Date()).getMonth();     // domyslnie biezacy miesiac
                    var _cliCountryTemp = null;                  // { id: [12 x temp] }, budowane leniwie
                    function _cliKeyOf(lat, lon){ return (Math.round(lat*4)/4)+","+(Math.round(lon*4)/4); }
                    function _cliTempAt(lat, lon){
                        if (typeof CLIMATE_DB === "undefined") return null;
                        var d = CLIMATE_DB[_cliKeyOf(lat, lon)];
                        if (d && d.temp) return d.temp;
                        // fallback: obwody komorek 0.25° wokol stolicy - stolica moze nie lezec dokladnie na
                        // punkcie z CITIES_DB, z ktorego zbudowano CLIMATE_DB (albo tuz nad woda/pominietym punktem)
                        for (var r = 1; r <= 4; r++){
                            for (var dy = -r; dy <= r; dy++){ for (var dx = -r; dx <= r; dx++){
                                if (Math.abs(dy) !== r && Math.abs(dx) !== r) continue;   // tylko obwod pierscienia
                                var e = CLIMATE_DB[_cliKeyOf(lat + dy*0.25, lon + dx*0.25)];
                                if (e && e.temp) return e.temp;
                            }}
                        }
                        return null;
                    }
                    function _cliBuild(){
                        if (_cliCountryTemp) return;
                        if (typeof CLIMATE_DB === "undefined" || typeof CAPITAL_COORDS === "undefined") return;   // defer jeszcze nie dojechal -> sprobuj przy nastepnym wl.
                        var m = {};
                        for (var id in CAPITAL_COORDS){
                            var c = CAPITAL_COORDS[id]; if (!c) continue;
                            var t = _cliTempAt(c[0], c[1]);   // CAPITAL_COORDS = [Lat, Lon]
                            if (t) m[id] = t;
                        }
                        _cliCountryTemp = m;   // ustawiane DOPIERO po sukcesie -> null zostaje, gdy CLIMATE_DB pusty (ponowna proba)
                    }
                    function _cliColor(id){
                        var arr = _cliCountryTemp && _cliCountryTemp[id];
                        if (!arr) return 0x2a2f36;   // brak danych = ciemny szary
                        return _cliBandCols[_cliBand(arr[_cliMonth])];
                    }
                    function _cliTip(dc){
                        var name = dc.name || dc.id;
                        var arr = _cliCountryTemp && _cliCountryTemp[dc.id];
                        if (!arr) return name + "\nbrak danych klimatycznych";
                        var t = arr[_cliMonth];
                        return name + "\nw " + _cliMonthNames[_cliMonth] + ": ⌀" + Math.round(t) + "°C — " + _cliBandLbl[_cliBand(t)] + " (wg stolicy)";
                    }
                    var _cliSeries = null;
                    function _cliRepaint(){
                        if (!_cliSeries) return;
                        _cliSeries.mapPolygons.each(function(mp){
                            var dc = mp.dataItem && mp.dataItem.dataContext;
                            mp.set("fill", am5.color(_cliColor(dc ? dc.id : null)));
                        });
                    }
                    window._climateOn = false;
                    window.setClimateMode = function(on){
                        window._climateOn = !!on;
                        if (on){
                            if (window.stopRot) window.stopRot();   // stop auto-rotacji -> brak reprojekcji co klatke
                            _cliBuild();
                            if (!_cliSeries){
                                _cliSeries = chart.series.push(am5map.MapPolygonSeries.new(root, { geoJSON: WORLD_GEO, exclude: ["AQ"] }));
                                _cliSeries.mapPolygons.template.setAll({ fillOpacity: 1, stroke: am5.color(0x0a0a0a), strokeOpacity: 0.55, strokeWidth: 0.5, interactive: true, tooltipText: "{name}" });
                                _cliSeries.mapPolygons.template.states.create("hover", { stroke: am5.color(0xffffff), strokeOpacity: 0.95, strokeWidth: 1.6 });
                                _cliSeries.mapPolygons.template.adapters.add("tooltipText", function(t, target){ var dc=target.dataItem&&target.dataItem.dataContext; return dc?_cliTip(dc):t; });
                                // Klik w kraj w trybie CLIMATE: wylacz tryb (+ przycisk) i otworz intel kraju jak w normalnym trybie.
                                _cliSeries.mapPolygons.template.events.on("click", function(ev){
                                    var dc = ev.target.dataItem && ev.target.dataItem.dataContext; if(!dc) return;
                                    if (ev.target.hideTooltip) ev.target.hideTooltip();
                                    if (window._exitActiveOverlayMode) window._exitActiveOverlayMode();   // nakladka znika -> highlight lezy na bazowej serii
                                    var pItem = poly.getDataItemById(dc.id);
                                    if (window._selectCountry) window._selectCountry(dc.id, (dc.name || dc.id).toUpperCase(), pItem ? pItem.get("mapPolygon") : null);
                                });
                                _cliSeries.events.on("datavalidated", _cliRepaint);   // polygony buduja sie async -> pomaluj gdy gotowe
                            }
                            _cliSeries.set("visible", true);
                            _cliRepaint();
                            _cliClimateLegend(true);
                        } else {
                            if (_cliSeries) _cliSeries.set("visible", false);
                            _cliClimateLegend(false);
                        }
                    };
                    // --- pasek wyboru miesiaca + skala kolorow (u gory-srodka; INTERAKTYWNY, jak legenda wizowa) ---
                    function _cliPaintMonthChips(){
                        var el = document.getElementById("climate-legend"); if (!el) return;
                        Array.prototype.forEach.call(el.querySelectorAll(".cli-mon"), function(ch){
                            var act = parseInt(ch.getAttribute("data-m"),10) === _cliMonth;
                            ch.style.background  = act ? "#f0883e" : "transparent";
                            ch.style.color       = act ? "#111" : "#c6cfd9";
                            ch.style.fontWeight  = act ? "700" : "400";
                            ch.style.borderColor = act ? "#f0883e" : "rgba(255,255,255,0.18)";
                        });
                    }
                    function _cliClimateLegend(on){
                        var el = document.getElementById("climate-legend");
                        if (!el){
                            el = document.createElement("div");
                            el.id = "climate-legend";
                            el.style.cssText = "position:fixed; top:12px; left:50%; transform:translateX(-50%); z-index:101; background:rgba(0,0,0,0.85); border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:8px 16px; backdrop-filter:blur(8px); display:flex; gap:12px; align-items:center; font-family:'JetBrains Mono',monospace; font-size:0.8rem; color:#c6cfd9; box-shadow:0 4px 15px rgba(0,0,0,0.5); opacity:0; transition:opacity 0.25s ease; white-space:nowrap; flex-wrap:wrap; justify-content:center; max-width:94vw;";
                            var html = '<span style="color:#f0883e; letter-spacing:1px; font-weight:bold;">🌡 GDZIE W:</span>';
                            html += '<span style="display:flex; gap:3px; flex-wrap:wrap;">';
                            for (var i=0;i<12;i++){ html += '<span class="cli-mon" data-m="'+i+'" style="cursor:pointer; padding:2px 5px; border:1px solid rgba(255,255,255,0.18); border-radius:4px;">'+_cliMonAbbr[i]+'</span>'; }
                            html += '</span>';
                            html += '<span style="display:flex; gap:10px; align-items:center;">'
                                  + '<span><span style="color:#2563eb;">■</span> zimno</span>'
                                  + '<span><span style="color:#38bdf8;">■</span> chłodno</span>'
                                  + '<span><span style="color:#22c55e;">■</span> idealnie</span>'
                                  + '<span><span style="color:#f59e0b;">■</span> ciepło</span>'
                                  + '<span><span style="color:#dc2626;">■</span> upał</span>'
                                  + '</span>';
                            html += '<span style="color:#8f9ba8;">wg stolicy · normalne 30-letnie</span>';
                            el.innerHTML = html;
                            document.body.appendChild(el);
                            Array.prototype.forEach.call(el.querySelectorAll(".cli-mon"), function(ch){
                                ch.onclick = function(){ _cliMonth = parseInt(ch.getAttribute("data-m"),10); _cliPaintMonthChips(); _cliRepaint(); };
                            });
                        }
                        _cliPaintMonthChips();
                        el.style.opacity = on ? "1" : "0";
                        el.style.pointerEvents = on ? "auto" : "none";
                    }
                } catch(_cle) { console.warn("Climate mode init failed:", _cle); }

                // --- RADAR PL: USUNIETY (2026-07) - pulsujacy geo-pierscien odswiezany co 60ms bez przerwy
                // byl najwiekszym stalym kosztem CPU/GPU (reprojekcja linii ~16x/s na widoku "home"). ---

                var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
                var cityDotSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
                cityDotSeries.bullets.push(function(root, series, dataItem) {
                    var dc = dataItem.dataContext;
                    var onClick = function(){ if (window.showCityIntel) window.showCityIntel(dc); };
                    var sprite;
                    var v = !!dc.visited, vColor = 0x22c55e;  // zielony = odwiedzone miasto
                    if (dc.cap && am5.Star) {
                        // stolica -> gwiazdka (zolta / zielona jesli odwiedzona)
                        sprite = am5.Star.new(root, {
                            spikes: 5, radius: 12.6, innerRadius: 5.3,
                            fill: am5.color(v ? vColor : 0xffd700), stroke: am5.color(0xffffff), strokeWidth: 1.8,
                            shadowColor: am5.color(v ? vColor : 0xffd700), shadowBlur: 8,
                            tooltipText: "{cname}", interactive: true, cursorOverStyle: "pointer"
                        });
                    } else if (dc.sq && am5.Rectangle) {
                        // metropolia (>= 1 mln) -> kwadrat (zolty / zielony jesli odwiedzona)
                        sprite = am5.Rectangle.new(root, {
                            width: 15, height: 15, centerX: am5.p50, centerY: am5.p50,
                            fill: am5.color(v ? vColor : 0xfacc15), stroke: am5.color(0x111111), strokeWidth: 1.2,
                            shadowColor: am5.color(v ? vColor : 0xfacc15), shadowBlur: 8,
                            tooltipText: "{cname}", interactive: true, cursorOverStyle: "pointer"
                        });
                    } else {
                        var big = dc.cap || dc.sq || dc.big;   // duze miasto (lub fallback) -> duza kropka
                        sprite = am5.Circle.new(root, {
                            radius: big ? 6 : 3.5,
                            fill: am5.color(v ? vColor : (big ? 0xfacc15 : 0xf59e0b)), fillOpacity: big ? 1 : 0.9,
                            stroke: am5.color(0x111111), strokeWidth: big ? 1.3 : 1,
                            // shadowBlur zdjety: te kropki sa najliczniejsze (kazde miasto poza stolica/metropolia),
                            // a rozmycie cienia w canvasie to najdrozsza operacja renderu przy obrocie globu.
                            tooltipText: "{cname}", interactive: true, cursorOverStyle: "pointer"
                        });
                    }
                    sprite.events.on("click", onClick);
                    return am5.Bullet.new(root, { sprite: sprite });
                });
                window.cityDotSeries = cityDotSeries;
                var airportSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
                airportSeries.bullets.push(function(root, series, dataItem) {
                    var dot = am5.Circle.new(root, {
                        radius: 5, fill: am5.color(0x00b3ff), stroke: am5.color(0x001522), strokeWidth: 1.5,
                        shadowColor: am5.color(0x00b3ff), shadowBlur: 8,
                        tooltipText: "{apname}\n{iata}", interactive: true, cursorOverStyle: "pointer"
                    });
                    dot.events.on("click", function(ev) {
                        var dc = ev.target.dataItem && ev.target.dataItem.dataContext;
                        if (dc) window.showAirportPanel(dc);
                    });
                    return am5.Bullet.new(root, { sprite: dot });
                });
                window.airportSeries = airportSeries;
                var cityLabelSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
                cityLabelSeries.bullets.push(function(root, series, dataItem) {
                    var cont = am5.Container.new(root, {});
                    var dc = dataItem.dataContext;
                    var onClick = function(){ if (window.showCityIntel && window.resolveCityIntel) window.showCityIntel(window.resolveCityIntel(dc.cname, dc.lat, dc.lng)); };
                    var circle = am5.Circle.new(root, { radius: 4, fill: am5.color(0xfacc15), stroke: am5.color(0x111111), strokeWidth: 1, shadowColor: am5.color(0xfacc15), shadowBlur: 6, interactive: true, cursorOverStyle: "pointer" });
                    circle.events.on("click", onClick);
                    cont.children.push(circle);
                    var lc = cont.children.push(am5.Container.new(root, { y: -9, centerX: am5.p50, centerY: am5.p100 }));
                    var lbl = am5.Label.new(root, {
                        text: dc.cname,
                        fill: am5.color(0xfacc15), fontSize: 12, fontFamily: "Courier New", fontWeight: "bold",
                        paddingTop: 2, paddingBottom: 2, paddingLeft: 6, paddingRight: 6,
                        centerX: am5.p50, textAlign: "center", interactive: true, cursorOverStyle: "pointer",
                        background: am5.RoundedRectangle.new(root, { fill: am5.color(0x000000), fillOpacity: 0.75, stroke: am5.color(0xfacc15), strokeOpacity: 0.5, strokeWidth: 1, cornerRadiusTL: 3, cornerRadiusTR: 3, cornerRadiusBL: 3, cornerRadiusBR: 3 })
                    });
                    lbl.events.on("click", onClick);
                    lc.children.push(lbl);
                    return am5.Bullet.new(root, { sprite: cont });
                });
                window.cityLabelSeries = cityLabelSeries;
                var flightLineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
                flightLineSeries.mapLines.template.setAll({ stroke: am5.color(0x00eaff), strokeOpacity: 0.65, strokeWidth: 1.6 });
                var flightPointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
                flightPointSeries.bullets.push(function(root, series, dataItem) {
                    return am5.Bullet.new(root, { sprite: am5.Circle.new(root, {
                        radius: 3, fill: am5.color(0xffffff), stroke: am5.color(0x00343c), strokeWidth: 1,
                        shadowColor: am5.color(0x00eaff), shadowBlur: 8,
                        tooltipText: "{city}\n{iata}", interactive: true
                    }) });
                });
                window.flightLineSeries = flightLineSeries;
                window.flightPointSeries = flightPointSeries;
                var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
                lineSeries.mapLines.template.setAll({ stroke: am5.color(0xfacc15), strokeOpacity: 0.8, strokeWidth: 2, strokeDasharray: [5, 5] });
                // ODCINEK NAZIEMNY (lotnisko -> najdalsze miasto) w MAX RANGE. WLASNA seria, nie lineSeries,
                // zeby dalo sie go odroznic stylem: ciagla zielen zamiast zoltej kreski = "tu juz nie lecialem".
                // Czyszczony w resetIntelPanels (przez window.groundLegSeries), tak jak reszta warstw focusu.
                var groundLegSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
                groundLegSeries.mapLines.template.setAll({ stroke: am5.color(0x22c55e), strokeOpacity: 0.9, strokeWidth: 2 });
                window.groundLegSeries = groundLegSeries;

                // --- Rysuje miasta ALBO lotniska dla podanego kraju, wg aktualnego window.airportMode.
                // Wywolywana z klikniecia w kraj ORAZ z przycisku trybu lotnisk (instant przelaczenie,
                // bez potrzeby ponownego klikania w mape). Nie rusza rotacji/pogody/factbooka. ---
                window.renderCountryPlaces = function(id){
                    var c = CAPITAL_COORDS[id];
                    airportSeries.data.clear();
                    window._clearCitySeries();
                    if (window.airportMode) {
                        if (window.showCityLegend) window.showCityLegend(false);
                        pointSeries.data.clear();  // ukryj stolice
                        window.showCountryAirports(id);
                    } else {
                        var cities = (typeof CITIES_DB !== "undefined") ? CITIES_DB[id] : null;
                        var capMatched = false;
                        if (cities && cities.length) {
                            var capIdx = window._findCapitalIndex(id, cities);
                            capMatched = capIdx >= 0;
                            // metropolie: >= 1 mln -> kwadrat; duze: top 5 lub >= 300k -> duza kropka
                            var _big = {}, _sq = {};
                            cities.map(function(ci, idx){ return { idx: idx, pop: (+ci[7] || 0) }; })
                                  .filter(function(x){ return x.idx !== capIdx; })
                                  .sort(function(a, b){ return b.pop - a.pop; })
                                  .forEach(function(x, r){ if (x.pop >= 1000000) _sq[x.idx] = true; else if (r < 5 || x.pop >= 300000) _big[x.idx] = true; });
                            var _visitedSet = window._visitedCitySet ? window._visitedCitySet() : {};
                            cityDotSeries.data.setAll(cities.map(function(ci, idx){
                                return { geometry: { type: "Point", coordinates: [ci[2], ci[1]] }, cname: ci[0], cap: (idx===capIdx), sq: !!_sq[idx], big: !!_big[idx], lat: ci[1], lng: ci[2], wv: ci[3], wiki: ci[4], ta: ci[5], un: ci[6], pop: ci[7], cc: id, visited: !!_visitedSet[window._cityId(id, ci[0])] };
                            }));
                            if (window.showCityLegend) window.showCityLegend(true);
                        }
                        if (c && !capMatched) {
                            pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [c[1], c[0]] }, type: "capital" }]);
                        } else {
                            pointSeries.data.clear();
                        }
                    }
                };

                // Pelna selekcja kraju (podswietlenie + panele + obrot globu). Wydzielone z handlera klika,
                // zeby moc ja wywolac takze z nakladek VISA/CLIMATE (klik w kraj w tych trybach wylacza tryb
                // i otwiera intel kraju - patrz window._exitActiveOverlayMode + handlery klika w setVisa/
                // setClimateMode). targetPoly = wielokat BAZOWEJ serii (nie nakladki) - po nim idzie highlight.
                window._selectCountry = function(id, name, targetPoly) {
                    window._selectedCountryId = id;
                    if (window.highlightCountry) window.highlightCountry(targetPoly);
                    // Sprzezenie zwrotne w dwie strony: klik w kraj na globie podswietla tez jego flage
                    // w dolnym pasku (o ile kraj jest odwiedzony - inaczej po prostu nie ma tam czego zapalic).
                    if (window._setLootBarActive) window._setLootBarActive(id);
                    if (targetPoly && targetPoly.hideTooltip) targetPoly.hideTooltip();

                    stopRot();
                    lineSeries.data.clear();
                    if (window.myFlightsOn) window.clearMyFlights();
                    if (window.showAirportModeBtn) window.showAirportModeBtn(true);
                    var c = CAPITAL_COORDS[id];
                    window.renderCountryPlaces(id);
                    if (window.airportMode) {
                        if (c) rotateGlobe(c[0], c[1]);
                        window.updateFactbookPanel(id, name);
                        if (c) window.updateWeatherPanel(id, name, c[0], c[1]);
                    } else {
                        if (c) {
                            rotateGlobe(c[0], c[1]);
                            window.updateWeatherPanel(id, name, c[0], c[1]);
                            window.updateFactbookPanel(id, name);
                        }
                    }
                };
                poly.mapPolygons.template.events.on("click", function(ev) {
                    var dataItem = ev.target.dataItem;
                    window._selectCountry(dataItem.dataContext.id, dataItem.dataContext.name.toUpperCase(), ev.target);
                });

                pointSeries.bullets.push(function(root, series, dataItem) {
                    var container = am5.Container.new(root, {});
                    if (dataItem.dataContext.type === "capital") {
                        container.children.push(am5.Circle.new(root, { radius: 6, fill: am5.color(0xfacc15), stroke: am5.color(0x111111), strokeWidth: 1.5, shadowColor: am5.color(0xfacc15), shadowBlur: 12 }));
                    } else if (dataItem.dataContext.type === "farcity") {
                        // NAJDALSZE ODWIEDZONE MIASTO (dokladany obok glownego znacznika przy stolicy,
                        // spiety z nim przerywanym lukiem lineSeries). Zloty, mniejszy od zielonego
                        // znacznika kraju i z podpisem POD spodem - etykieta kraju siedzi NAD swoim
                        // znacznikiem, wiec przy blisko lezacych punktach oba podpisy sie nie nakladaja.
                        container.children.push(am5.Circle.new(root, { radius: 5, fill: am5.color(0xfacc15), stroke: am5.color(0x111111), strokeWidth: 1.5, shadowColor: am5.color(0xfacc15), shadowBlur: 10 }));
                        container.children.push(am5.Circle.new(root, { radius: 10, fill: am5.color(0xfacc15), fillOpacity: 0.12 }));
                        if (dataItem.dataContext.title) {
                            var _fcCont = container.children.push(am5.Container.new(root, { y: 16, centerX: am5.p50, centerY: am5.p0 }));
                            _fcCont.children.push(am5.Label.new(root, {
                                text: dataItem.dataContext.title,
                                fill: am5.color(0xfacc15), fontSize: 13, fontFamily: "Courier New", fontWeight: "bold",
                                paddingTop: 3, paddingBottom: 3, paddingLeft: 7, paddingRight: 7,
                                centerX: am5.p50, textAlign: "center",
                                background: am5.RoundedRectangle.new(root, { fill: am5.color(0x000000), fillOpacity: 0.8, stroke: am5.color(0xfacc15), strokeWidth: 1, cornerRadiusTL: 4, cornerRadiusTR: 4, cornerRadiusBL: 4, cornerRadiusBR: 4 })
                            }));
                        }
                    } else if (dataItem.dataContext.type === "wonder") {
                        container.children.push(am5.Circle.new(root, { radius: 17, fill: am5.color(0xfacc15), fillOpacity: 0.15, stroke: am5.color(0xfacc15), strokeWidth: 1.5 }));
                        container.children.push(am5.Label.new(root, { text: dataItem.dataContext.icon || "⭐", fontSize: 24, centerX: am5.p50, centerY: am5.p50 }));
                    } else if (dataItem.dataContext.type === "target" || dataItem.dataContext.type === "target-search") {
                        // Wieksze ramiona/okrag TYLKO dla wynikow wyszukiwarki ("target-search") - tam celownik
                        // musi wystawac spod znacznika miasta/stolicy. Zwykly "target" (MAX RANGE, zoom na miasto)
                        // zostaje w oryginalnym rozmiarze.
                        var _big = dataItem.dataContext.type === "target-search";
                        var _arm = _big ? 26 : 15, _rad = _big ? 15 : 8, _sw = _big ? 2.5 : 2;
                        var l1 = container.children.push(am5.Line.new(root, { points: [{x:-_arm, y:0}, {x:_arm, y:0}], stroke: am5.color(0xfacc15), strokeWidth: _sw }));
                        var l2 = container.children.push(am5.Line.new(root, { points: [{x:0, y:-_arm}, {x:0, y:_arm}], stroke: am5.color(0xfacc15), strokeWidth: _sw }));
                        var circle = container.children.push(am5.Circle.new(root, { radius: _rad, stroke: am5.color(0xfacc15), strokeWidth: _sw, fillOpacity: 0 }));
                        container.animate({ key: "opacity", from: 1, to: 0.2, duration: 600, loops: Infinity, easing: am5.ease.yoyo(am5.ease.cubic) });
                    } else {
                        container.children.push(am5.Circle.new(root, { radius: 6, fill: am5.color(0x00ff00), stroke: am5.color(0xffffff), strokeWidth: 2, shadowColor: am5.color(0x00ff00), shadowBlur: 15 }));
                        container.children.push(am5.Circle.new(root, { radius: 12, fill: am5.color(0x00ff00), fillOpacity: 0.1 }));

                        if (dataItem.dataContext.title) {
                            // UKLAD ETYKIETY (3 wiersze, kazdy opcjonalny poza pierwszym):
                            //   FLAGA NAZWA_KRAJU
                            //   VISITED CITIES: n
                            //   MAX DISTANCE: MIASTO - n KM
                            // Wiersze dokladamy TYLKO gdy sa dane. To wazne, bo ta sama gadka ("else")
                            // obsluguje rowniez punkty trasy misji, ktore maja sam title (nazwe miasta)
                            // i zadnych statystyk - tam etykieta ma zostac jednowierszowa jak dotad.
                            var _dc = dataItem.dataContext;
                            var _lines = [];
                            _lines.push(_dc.flag ? (_dc.flag + " " + _dc.title) : _dc.title);
                            if (_dc.cities !== undefined && _dc.cities !== null) _lines.push("VISITED CITIES: " + _dc.cities);
                            if (_dc.dist !== undefined && _dc.dist !== null) {
                                // distLabel rozroznia "najdalsze odwiedzone miasto" od fallbacku na stolice,
                                // zeby podpis nie klamal, gdy w kraju nie ma jeszcze zadnego miasta.
                                var _dl = (_dc.distLabel || "MAX DISTANCE") + ": ";
                                // Nie powtarzamy nazwy, gdy miasto nazywa sie tak jak kraj (miasta-panstwa:
                                // Watykan, Monako, Singapur) - bez tego wychodzi "VATICAN CITY / CAPITAL:
                                // VATICAN CITY - 1317 KM".
                                if (_dc.distCity && _dc.distCity !== String(_dc.title).toUpperCase()) _dl += _dc.distCity + " - ";
                                _lines.push(_dl + _dc.dist + " KM");
                            }
                            var _label = _lines.join("\n");
                            var tooltipCont = container.children.push(am5.Container.new(root, { y: -20, centerX: am5.p50, centerY: am5.p100 }));
                            tooltipCont.children.push(am5.Label.new(root, {
                                text: _label,
                                fill: am5.color(0xffffff), fontSize: 17, fontFamily: "Courier New", fontWeight: "bold",
                                paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10,
                                centerX: am5.p50, textAlign: "center",
                                background: am5.RoundedRectangle.new(root, { fill: am5.color(0x000000), fillOpacity: 0.8, stroke: am5.color(0x00ff00), strokeWidth: 1, cornerRadiusTL: 5, cornerRadiusTR: 5, cornerRadiusBL: 5, cornerRadiusBR: 5 })
                            }));
                        }
                    }
                    return am5.Bullet.new(root, { sprite: container });
                });

                chart.series.push(am5map.GraticuleSeries.new(root, {})).mapLines.template.setAll({ stroke: am5.color(0xffffff), strokeOpacity: 0.05 });

                function startRot() {
                    window._selectedCountryId = null;
                    if (autoRot) autoRot.pause();
                    if (window._clearMaxRangePlane) window._clearMaxRangePlane();   // powrot do orbity = koniec lotu
                    autoRot = chart.animate({ key: "rotationX", from: chart.get("rotationX"), to: chart.get("rotationX") + 360, duration: 60000, loops: Infinity });
                    pointSeries.data.clear();
                    lineSeries.data.clear();
                    window._clearCitySeries();
                    if (window.showCityLegend) window.showCityLegend(false);
                    if (window.showAirportModeBtn) window.showAirportModeBtn(false);
                    if (window.clearCountryHighlight) window.clearCountryHighlight();
                    var plCoords = CAPITAL_COORDS["PL"];
                    if(plCoords) pointSeries.data.push({ geometry: { type: "Point", coordinates: [plCoords[1], plCoords[0]] }, id: "PL" });
                }
                // JEDYNE miejsce sprzatajace samolot MAX RANGE / rekordowego lotu. stopRot wola KAZDA
                // sciezka nawigacji (klik w kraj, kontynent, cud, range, rekordowy lot, flaga, wyszukiwarka),
                // wiec samolot nigdy nie zostaje nad trasa, ktora wlasnie znika z globusa. Wczesniej sprzatal
                // tylko resetIntelPanels, przez co np. klik w kraj zostawial samolot krazacy nad niczym.
                // Handlery, ktore samolota PUSZCZAJA (_maxRangeClick, focusFlightLeg), wolaja stopRot na
                // POCZATKU, a _flyMaxRange na koncu - kolejnosc jest bezpieczna, nie kasuja sobie wlasnego lotu.
                function stopRot() {
                    if (autoRot) autoRot.pause();
                    if (window._clearMaxRangePlane) window._clearMaxRangePlane();
                }

                // --- MOSTKI DO window (dla displayMissionRoute na gorze pliku) ---
                window.rotateGlobe = rotateGlobe;
                window.pointSeries = pointSeries;
                window.lineSeries = lineSeries;
                window.startRot = startRot;
                window.stopRot = stopRot;

                // ===== SAMOLOTY: FLAVOR USUNIETY 2026-07-19 =====
                // 20 ozdobnych samolotow latajacych po rozrzuconych trasach (+ przelacznik PLANES) skasowane na
                // zyczenie: nic nie wnosily wizualnie, a kosztowaly 20 nieustannych animacji. Zostal WYLACZNIE
                // samolot lecacy po torze wybranej trasy (nizej: _flyMaxRange, panel MAX RANGE / najdluzsze loty).
                try {
                    // ===== SAMOLOT NA TRASIE MAX RANGE =====
                    // Wlasna para serii (linia + punkt), zeby nie mieszac z flavorowymi samolotami - te maja
                    // swoj przelacznik i wlasne animacje. Linia tutaj jest niewidoczna (strokeOpacity 0),
                    // bo widoczny luk rysuje juz lineSeries w handlerze MAX RANGE; ta sluzy tylko za tor lotu.
                    // Sylwetka ta sama co we flavorze, scale 2.4 zamiast 0.8 (3x wieksza).
                    var maxPlaneLine = chart.series.push(am5map.MapLineSeries.new(root, {}));
                    maxPlaneLine.mapLines.template.setAll({ strokeOpacity: 0 });
                    var maxPlanePoints = chart.series.push(am5map.MapPointSeries.new(root, {}));
                    maxPlanePoints.bullets.push(function() {
                        return am5.Bullet.new(root, { sprite: am5.Graphics.new(root, {
                            svgPath: "M13,0 L4,1 L1,1 L-2,6 L-4,6 L-3,1 L-9,1 L-11,3 L-12,3 L-11,0 L-12,-3 L-11,-3 L-9,-1 L-3,-1 L-4,-6 L-2,-6 L1,-1 L4,-1 Z",
                            fill: am5.color(0x00eaff), stroke: am5.color(0x00343c), strokeWidth: 0.5,
                            shadowColor: am5.color(0x00eaff), shadowBlur: 6, scale: 2.4, centerX: am5.p50, centerY: am5.p50
                        }) });
                    });
                    maxPlanePoints.hide(0);
                    window._flyMaxRange = function(start, dest) {
                        window._clearMaxRangePlane();
                        var ld = maxPlaneLine.pushDataItem({ geometry: { type: "LineString", coordinates: [[start[1], start[0]], [dest[1], dest[0]]] } });
                        var pd = maxPlanePoints.pushDataItem({ lineDataItem: ld, positionOnLine: 0, autoRotate: true });
                        maxPlanePoints.show();
                        window._maxPlanePd = pd;
                        window._maxPlaneAnim = pd.animate({ key: "positionOnLine", from: 0, to: 1, duration: 9000, loops: Infinity });
                    };
                    // Wolane z resetIntelPanels - inaczej samolot lecialby dalej po zdjeciu focusu z MAX RANGE.
                    window._clearMaxRangePlane = function() {
                        if (window._maxPlaneAnim) { window._maxPlaneAnim.stop(); window._maxPlaneAnim = null; }
                        window._maxPlanePd = null;
                        maxPlanePoints.hide(0);
                        maxPlanePoints.data.clear();
                        maxPlaneLine.data.clear();
                    };
                    // --- zdejmij focus z aktualnie wybranego kraju (przy przelaczaniu trybow overlay) ---
                    function _dropCountryFocus() {
                        window._selectedCountryId = null;
                        if (window.clearCountryHighlight) window.clearCountryHighlight();
                        if (window.resetIntelPanels) window.resetIntelPanels();
                        if (window.pointSeries) window.pointSeries.data.clear();
                        if (window.lineSeries) window.lineSeries.data.clear();
                    }
                    // --- VISA / ZONES / NIGHT / CLIMATE: tryby WYKLUCZAJACE sie (nigdy razem) ---
                    var _modes = [
                        { id:"night-toggle", on:function(){return window._terminatorOn;}, set:function(v){ if(window.setTerminator) window.setTerminator(v); }, lbl:"NIGHT" },
                        { id:"tz-toggle",    on:function(){return window._tzOn;},         set:function(v){ if(window.setTimezones) window.setTimezones(v); }, lbl:"ZONES" },
                        { id:"visa-toggle",  on:function(){return window._visaOn;},        set:function(v){ if(window.setVisa) window.setVisa(v); }, lbl:"VISA" },
                        { id:"climate-toggle", on:function(){return window._climateOn;},   set:function(v){ if(window.setClimateMode) window.setClimateMode(v); }, lbl:"CLIMATE" }
                    ];
                    function _paintMode(m, on){ var b=document.getElementById(m.id); if(b){ var lbl=b.querySelector(".rb-label"); if(lbl){ lbl.textContent=m.lbl+(on?": ON":": OFF"); } b.style.opacity=on?"1":"0.4"; } }
                    function _setMode(m, on){
                        if (on) { _modes.forEach(function(o){ if(o!==m && o.on()){ o.set(false); _paintMode(o,false); } }); }  // zgas pozostale
                        m.set(on); _paintMode(m, on);
                    }
                    _modes.forEach(function(m){ var b=document.getElementById(m.id); if(b){ b.onclick = function(){ _dropCountryFocus(); _setMode(m, !m.on()); }; } });
                    // Wylacz aktywny tryb-nakladke (VISA/CLIMATE) WRAZ z przyciskiem - wolane przy kliknieciu
                    // w kraj na nakladce. Tryby wykluczaja sie, wiec aktywny jest max jeden; gasimy kazdy "on".
                    // NIE wola _dropCountryFocus (inaczej wyczyscilby wlasnie wybrany kraj), bo zaraz po nim
                    // handler nakladki wola window._selectCountry i otwiera intel.
                    window._exitActiveOverlayMode = function(){
                        _modes.forEach(function(m){ if (m.on()) { m.set(false); _paintMode(m, false); } });
                    };
                    // --- Przelacznik szczegolowosci globu (LOW/HIGH/ULTRA): zapis w localStorage + reload ---
                    // Przebudowa geometrii w locie jest ryzykowna przy tak zlozonym setupie mapy, wiec
                    // wybor jest utrwalany, a strona przeladowywana - loader w index.html zaciaga wtedy
                    // wylacznie wybrana geodate (WORLD_GEO). Brama trzyma auth w localStorage, wiec reload
                    // nie prosi ponownie o haslo.
                    (function(){
                        var cur = localStorage.getItem('mapDetail') || 'high';
                        if(cur!=='low'&&cur!=='high'&&cur!=='ultra') cur='high';
                        var opts = document.querySelectorAll('#detail-switch .ds-opt');
                        Array.prototype.forEach.call(opts, function(o){
                            var lvl = o.getAttribute('data-lvl');
                            var act = (lvl===cur);
                            o.style.opacity = act ? '1' : '0.4';
                            o.style.fontWeight = act ? '700' : '400';
                            o.onclick = function(e){ e.stopPropagation(); if(lvl===cur) return; localStorage.setItem('mapDetail', lvl); location.reload(); };
                        });
                    })();
                    window.airportMode = false;
                } catch (e) { console.error("Flavor init error:", e); }

                                resetBtn.onclick = function() {
                    if (autoRot) autoRot.pause();
                    if (window._exitActiveOverlayMode) window._exitActiveOverlayMode();   // zgas aktywne tryby-nakladki (VISA/ZONES/NIGHT/CLIMATE)
                    window.airportMode = false;                                           // wroc do miast (wylacz tryb lotnisk)
                    if (window.clearCountrySearch) window.clearCountrySearch();   // wyczysc tez pole wyszukiwania kraju
                    window.resetIntelPanels();
                    chart.goHome();
                    chart.animate({ key: "rotationX", to: -20, duration: 1000, easing: am5.ease.out(am5.ease.cubic) });
                    chart.animate({ key: "rotationY", to: -15, duration: 1000, easing: am5.ease.out(am5.ease.cubic) });
                    lineSeries.data.clear();
                    pointSeries.data.clear(); 
                    setTimeout(() => {
                        pointSeries.data.clear(); 
                        var plCoords = CAPITAL_COORDS["PL"];
                        if(plCoords) pointSeries.data.push({ geometry: { type: "Point", coordinates: [plCoords[1], plCoords[0]] }, id: "PL" });
                        startRot();
                    }, 1000);
                };

                // Klik w przestrzen POZA globem -> zdejmij focus + wznow rotacje (BEZ resetu pozycji)
                (function(){
                    var cd = document.getElementById("chartdiv");
                    if (!cd) return;
                    cd.addEventListener("click", function(e) {
                        if ((chart.get("zoomLevel") || 1) > 1.05) return; // przy przyblizeniu globus wypelnia ekran - nie deselekcjonuj
                        var rect = cd.getBoundingClientRect();
                        var dx = (e.clientX - rect.left) - rect.width / 2;
                        var dy = (e.clientY - rect.top) - (rect.height / 2 - 50);
                        if (Math.sqrt(dx*dx + dy*dy) <= rect.width * 0.26) return; // klik na globie -> ignoruj
                        if (autoRot) autoRot.pause();
                        window.resetIntelPanels();
                        lineSeries.data.clear();
                        pointSeries.data.clear();
                        var plCoords = CAPITAL_COORDS["PL"];
                        if (plCoords) pointSeries.data.push({ geometry: { type: "Point", coordinates: [plCoords[1], plCoords[0]] }, id: "PL" });
                        startRot();
                    });
                })();
                
                const display = document.getElementById("mission-countdown");
                const info = document.getElementById("mission-info");
                const flagBtn = document.getElementById("mission-flag");
                const status = document.getElementById("mission-status");
                const navEl = document.getElementById("mission-nav");
                const counterEl = document.getElementById("mission-counter");

                // Klik w sam licznik -> pelny brief misji (okno: licznik, daty, loty->FR24, trasa, kraje).
                if (display) {
                    display.style.cursor = "pointer";
                    display.title = "Kliknij: pełny brief misji";
                    display.addEventListener("click", function(){ if (window.showMissionDossier) window.showMissionDossier(); });
                }

                function fmtCountdown(ms) {
                    const d = Math.floor(ms / (1000*60*60*24)), h = Math.floor((ms % (1000*60*60*24)) / (1000*60*60)), m = Math.floor((ms % (1000*60*60)) / (1000*60)), s = Math.floor((ms % (1000*60)) / 1000);
                    return `${d}d ${h.toString().padStart(2,'0')}h ${m.toString().padStart(2,'0')}m ${s.toString().padStart(2,'0')}s`;
                }
                window._fmtCountdown = fmtCountdown;   // udostepnione dla okna briefu misji (showMissionDossier)

                window.cycleMission = function(delta) {
                    const missions = (typeof MISSIONS_DB !== 'undefined') ? MISSIONS_DB : [];
                    if (missions.length < 2) return;
                    if (window.selectedMissionIndex === null || window.selectedMissionIndex === undefined) window.selectedMissionIndex = 0;
                    window.missionManual = true;
                    window.selectedMissionIndex = (window.selectedMissionIndex + delta + missions.length) % missions.length;
                    updateMissionCountdown();
                };

                function updateMissionCountdown() {
                    const now = new Date().getTime();
                    
                    const missions = (typeof MISSIONS_DB !== 'undefined') ? MISSIONS_DB : [];

                    if (missions.length === 0) {
                        status.innerText = "ALL OBJECTIVES COMPLETED";
                        display.innerText = "NO MISSIONS PLANNED";
                        display.style.color = "#aab4c0";
                        info.querySelector(".range-sub-text").innerHTML = "AWAITING NEW ORDERS...";
                        flagBtn.innerText = "🛰️";
                        if (navEl) navEl.style.display = "none";
                        window._missionRenderedIdx = null;
                        return;
                    }

                    // Auto-follow najblizszej nieukonczonej misji, dopoki uzytkownik nie przejdzie recznie strzalkami
                    if (!window.missionManual || window.selectedMissionIndex === null || window.selectedMissionIndex === undefined || window.selectedMissionIndex >= missions.length) {
                        let _idx = missions.findIndex(m => new Date(m.returnDate).getTime() > now);
                        window.selectedMissionIndex = (_idx === -1) ? missions.length - 1 : _idx;
                    }
                    const activeMission = missions[window.selectedMissionIndex];

                    // Elementy zalezne TYLKO od wybranej misji (licznik, przycisk flagi, link TARGET)
                    // przerysowujemy jedynie przy zmianie misji - a nie co sekunde razem z odliczaniem.
                    if (window._missionRenderedIdx !== window.selectedMissionIndex) {
                        window._missionRenderedIdx = window.selectedMissionIndex;
                        if (navEl) navEl.style.display = (missions.length > 1) ? "flex" : "none";
                        if (counterEl) counterEl.innerText = `${window.selectedMissionIndex + 1}/${missions.length}`;
                        flagBtn.onclick = () => {
                            stopRot();
                            // Ten handler podmienial tylko pointSeries i jako JEDYNY nie czyscil lineSeries -
                            // wiec kreska narysowana wczesniej (MAX RANGE albo trasa misji) zostawala na globusie
                            // obok nowego celownika. Czyscimy TU, a nie w resetIntelPanels(): displayMissionRoute
                            // i handler MAX RANGE wolaja resetIntelPanels PO narysowaniu swojej linii, wiec
                            // czyszczenie w srodku tamtej funkcji wymazaloby im wlasny rysunek.
                            lineSeries.data.clear();
                            window.resetIntelPanels();
                            let coords = CAPITAL_COORDS[activeMission.flag];
                            if(coords) {
                                rotateGlobe(coords[0], coords[1]);
                                pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [coords[1], coords[0]] }, type: "target" }]);
                                // Intel PO resetIntelPanels (ono czysci factbook/pogode) - wczesniej handler
                                // konczyl sie na resecie i klik we flage nie otwieral nic.
                                var _fName = (typeof FACTBOOK !== 'undefined' && FACTBOOK[activeMission.flag]) ? FACTBOOK[activeMission.flag].name.common.toUpperCase() : activeMission.flag;
                                if (window.updateWeatherPanel) window.updateWeatherPanel(activeMission.flag, _fName, coords[0], coords[1]);
                                if (window.updateFactbookPanel) window.updateFactbookPanel(activeMission.flag, _fName);
                            }
                        };
                        flagBtn.innerHTML = window._flagHTML(activeMission.flag);   // <img> zamiast emoji (Windows/Chrome nie ma flag)
                        // Nazwa misji moze zawierac apostrof / < > - budujemy link przez DOM (textContent + onclick),
                        // a nie interpolacja do inline onclick/innerHTML (lamalo przycisk i grozilo wstrzyknieciem).
                        var _subText = info.querySelector(".range-sub-text");
                        _subText.innerHTML = 'TARGET: <a class="mission-target-link" style="color:#00ff00; cursor:pointer; text-decoration:underline;"></a>';
                        var _mTargetLink = _subText.querySelector(".mission-target-link");
                        if (_mTargetLink) {
                            _mTargetLink.textContent = activeMission.name;
                            _mTargetLink.onclick = function(){ if (window.displayMissionRoute) window.displayMissionRoute(activeMission.name); };
                        }
                    }

                    const startTime = new Date(activeMission.date).getTime();
                    const endTime = new Date(activeMission.returnDate).getTime();

                    if (now >= startTime && now <= endTime) {
                        status.innerText = "MISSION IN PROGRESS";
                        display.innerText = `END IN: ${fmtCountdown(endTime - now)}`;
                        display.style.color = "#00ff00";
                    } else if (now < startTime) {
                        status.innerText = "T-MINUS TO TAKEOFF";
                        display.innerText = fmtCountdown(startTime - now);
                        display.style.color = "#facc15";
                    } else {
                        status.innerText = "OBJECTIVE COMPLETE";
                        display.innerText = "MISSION COMPLETED";
                        display.style.color = "#00ccff";
                    }
                }
                setInterval(updateMissionCountdown, 1000);

                // ===== OKNO BRIEFU MISJI (klik w licznik #mission-countdown) =====
                // Zwiezly "dossier" jednej misji: status+licznik na zywo, daty, dlugosc pobytu, loty (klik ->
                // Flightradar24), planowana trasa i kraje wyprawy (NEW/odwiedzone). Nie dubluje sekcji "przy okazji"
                // (_missionNearby/_missionWonders) - te zostaja w panelu intelu po kliknieciu linku TARGET.
                // Czyta tylko MISSIONS_DB + helpery (_missionCountries/_flagSrc/displayMissionRoute) - zero zapisu.

                // Pole flight jest wolnym tekstem w adminie. '/' dzieli kierunki (TAM/POWROT), a '&'/','/spacja
                // lacza przesiadki w obrebie kierunku. Parser jest TOLERANCYJNY (regex wyciaga numery lotow),
                // wiec nie wymaga sztywnego formatu - admin.saveData zapisuje caly data.js, twardy walidator
                // pola kosmetycznego moglby zablokowac zapis realnego postepu.
                window._parseFlights = function(str){
                    if (!str) return [];
                    return String(str).split("/").map(function(leg){
                        var m = leg.match(/[A-Z][A-Z0-9]?\s?\d{1,4}[A-Z]?/gi) || [];
                        return m.map(function(t){ return t.replace(/\s+/g, "").toUpperCase(); });
                    }).filter(function(leg){ return leg.length; });
                };
                window._flightHref = function(code){
                    return "https://www.flightradar24.com/data/flights/" + String(code).toLowerCase();
                };

                // Status + tekst licznika + kolor dla DOWOLNEJ misji (ta sama logika co panel Active Mission).
                window._missionStatusLine = function(m){
                    if (!m) return { status: "STANDBY", cd: "—", col: "#aab4c0" };
                    var now = Date.now();
                    var st = m.date ? new Date(m.date).getTime() : 0;
                    var en = m.returnDate ? new Date(m.returnDate).getTime() : 0;
                    if (st && now < st) return { status: "T-MINUS TO TAKEOFF", cd: window._fmtCountdown(st - now), col: "#facc15" };
                    if (en && now >= st && now <= en) return { status: "MISSION IN PROGRESS", cd: "END IN: " + window._fmtCountdown(en - now), col: "#00ff00" };
                    if (en && now > en) return { status: "OBJECTIVE COMPLETE", cd: "MISSION COMPLETED", col: "#00ccff" };
                    return { status: "STANDBY", cd: "—", col: "#aab4c0" };
                };

                window._missionDossierHTML = function(m){
                    var missions = (typeof MISSIONS_DB !== "undefined") ? MISSIONS_DB : [];
                    var idx = window.selectedMissionIndex || 0;
                    var nav = (missions.length > 1)
                        ? '<span onclick="window._dossierGo(-1)" style="color:#8f9ba8; cursor:pointer; font-size:1rem;">◀</span>'
                        + '<span onclick="window._dossierGo(1)" style="color:#8f9ba8; cursor:pointer; font-size:1rem;">▶</span>'
                        + '<span style="color:#6b7480; font-size:0.72rem;">' + (idx + 1) + '/' + missions.length + '</span>'
                        : '';
                    var head = '<div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; border-bottom:1px solid rgba(255,255,255,0.12); background:linear-gradient(90deg,rgba(250,204,21,0.14),transparent);">'
                        + '<div style="display:flex; align-items:center; gap:10px;">' + nav
                        + '<div style="font-weight:700; letter-spacing:3px; font-size:0.95rem; color:#fff;">MISSION DOSSIER</div></div>'
                        + '<span onclick="window.hideMissionDossier()" style="cursor:pointer; font-size:1.2rem; color:#8f9ba8; line-height:1;">✕</span></div>';

                    if (!m) {
                        return head + '<div style="padding:28px 16px; text-align:center; color:#6b7480; letter-spacing:2px;">NO MISSIONS PLANNED</div>';
                    }

                    var sl = window._missionStatusLine(m);
                    var esc = function(s){ return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); };
                    var fmtDT = function(iso){
                        if (!iso) return "?";
                        var d = new Date(iso);
                        return d.toLocaleDateString("pl-PL", { day:"2-digit", month:"2-digit", year:"numeric" })
                             + " · " + d.toLocaleTimeString("pl-PL", { hour:"2-digit", minute:"2-digit" });
                    };
                    var stayDays = (m.date && m.returnDate)
                        ? Math.max(0, Math.round((new Date(m.returnDate).getTime() - new Date(m.date).getTime()) / 86400000)) + " dni"
                        : "—";

                    var flag = '<div style="width:40px; height:28px; border-radius:3px; overflow:hidden; flex:0 0 auto; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.05);">' + (window._flagHTML ? window._flagHTML(m.flag).replace('height:0.75em', 'height:28px') : esc(m.flag)) + '</div>';

                    var html = head + '<div style="padding:14px 16px;">';

                    // Naglowek misji + status
                    html += '<div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">' + flag
                          + '<div><div style="font-size:1.15rem; font-weight:700; color:#fff; letter-spacing:1px;">' + esc(m.name) + '</div>'
                          + '<div id="mdossier-status" style="font-size:0.7rem; letter-spacing:2px; color:' + sl.col + ';">' + sl.status + '</div></div></div>';

                    // Wielki licznik (aktualizowany co sekunde przez _tickDossier)
                    html += '<div style="border:1px solid ' + sl.col + '55; border-radius:6px; padding:8px 12px; margin-bottom:14px; text-align:center;">'
                          + '<div id="mdossier-cd" style="font-size:1.4rem; font-weight:700; letter-spacing:1px; color:' + sl.col + ';">' + sl.cd + '</div></div>';

                    // Metryki
                    var metric = function(label, val, col){
                        return '<div style="background:rgba(255,255,255,0.03); border-radius:5px; padding:7px 10px;">'
                             + '<div style="font-size:0.62rem; color:#6b7480; letter-spacing:1px;">' + label + '</div>'
                             + '<div style="font-size:0.86rem; color:' + (col || "#e6ecf2") + ';">' + val + '</div></div>';
                    };
                    html += '<div style="display:grid; grid-template-columns:repeat(2,1fr); gap:8px; margin-bottom:14px;">'
                          + metric("WYLOT", fmtDT(m.date)) + metric("POWRÓT", fmtDT(m.returnDate))
                          + metric("NA MIEJSCU", stayDays, "#00ff88") + metric("PRZYSTANKÓW", (m.route || []).length)
                          + '</div>';

                    // Loty -> chipy klikalne do FR24, pogrupowane po kierunku ('/')
                    var legs = window._parseFlights(m.flight);
                    if (legs.length) {
                        var legLabel = function(i){ return legs.length === 1 ? "LOTY" : (i === 0 ? "TAM" : (i === 1 ? "POWRÓT" : "ODCINEK " + (i + 1))); };
                        html += '<div style="margin-bottom:14px;"><div style="font-size:0.66rem; color:#00ccff; letter-spacing:2px; margin-bottom:6px;">✈ LOTY</div>';
                        legs.forEach(function(leg, i){
                            var chips = leg.map(function(code){
                                return '<a href="' + window._flightHref(code) + '" target="_blank" rel="noopener" style="font-size:0.76rem; background:rgba(0,204,255,0.1); border:1px solid rgba(0,204,255,0.35); color:#7fd8ff; border-radius:4px; padding:3px 9px; text-decoration:none; white-space:nowrap;">' + esc(code) + '</a>';
                            }).join('<span style="color:#4a5561; margin:0 2px;">→</span>');
                            html += '<div style="display:flex; align-items:center; flex-wrap:wrap; gap:5px; margin-bottom:5px;">'
                                  + '<span style="font-size:0.6rem; color:#6b7480; letter-spacing:1px; min-width:52px;">' + legLabel(i) + '</span>' + chips + '</div>';
                        });
                        html += '</div>';
                    }

                    // Planowana trasa (pelna, wraz z punktami domowymi)
                    var route = (m.route || []);
                    if (route.length) {
                        var path = route.map(function(p){ return '<span style="color:#c6cfd9;">' + esc(p.city) + '</span>'; })
                            .join('<span style="color:#4a5561;"> → </span>');
                        html += '<div style="margin-bottom:14px;"><div style="font-size:0.66rem; color:#00ccff; letter-spacing:2px; margin-bottom:6px;">⇄ PLANOWANA TRASA</div>'
                              + '<div style="font-size:0.82rem; line-height:1.6;">' + path + '</div></div>';
                    }

                    // Kraje wyprawy (flag + nazwa + NEW/odwiedzone)
                    // PL (dom) NIGDY na liscie krajow wyprawy - kazda misja startuje/konczy w Warszawie,
                    // wiec Polska to nie "cel". Filtrujemy TU (warstwa okna), nie w _missionCountries,
                    // zeby nie zmieniac panelu intelu. Kazdy kafelek klikalny -> focusRankTarget (obrot
                    // globu + factbook/pogoda, ta sama akcja co wiersze krajow w panelu intelu).
                    var codes = (window._missionCountries ? window._missionCountries(m) : (m.flag ? [m.flag] : []))
                                .filter(function(c){ return c && c !== "PL"; });
                    if (codes.length) {
                        var vis = (typeof VISITED_COUNTRIES !== "undefined") ? VISITED_COUNTRIES : [];
                        html += '<div style="margin-bottom:16px;"><div style="font-size:0.66rem; color:#00ccff; letter-spacing:2px; margin-bottom:8px;">⚑ KRAJE WYPRAWY</div>'
                              + '<div style="display:flex; flex-wrap:wrap; gap:8px;">';
                        codes.forEach(function(code){
                            var seen = vis.indexOf(code) >= 0;
                            var nm = (typeof FACTBOOK !== "undefined" && FACTBOOK[code]) ? FACTBOOK[code].name.common : code;
                            var src = window._flagSrc ? window._flagSrc(code) : null;
                            var fimg = src ? '<img src="' + String(src).replace(/"/g,"%22") + '" alt="' + esc(code) + '" style="width:22px; height:15px; border-radius:2px; object-fit:cover;">' : '';
                            var tag = seen ? '<span style="font-size:0.6rem; color:#6b7480; letter-spacing:1px;">✓</span>'
                                           : '<span style="font-size:0.6rem; color:#00ff88; letter-spacing:1px;">NEW</span>';
                            var bg = seen ? "rgba(255,255,255,0.03)" : "rgba(0,255,136,0.06)";
                            var br = seen ? "rgba(255,255,255,0.1)" : "rgba(0,255,136,0.25)";
                            html += '<div onclick="window.hideMissionDossier(); if(window.focusRankTarget) window.focusRankTarget(\'' + esc(code) + '\');" title="Pokaż ' + esc(nm) + ' na globusie" style="display:flex; align-items:center; gap:6px; cursor:pointer; background:' + bg + '; border:1px solid ' + br + '; border-radius:5px; padding:4px 8px;">'
                                  + fimg + '<span style="font-size:0.76rem; color:' + (seen ? "#9aa5b1" : "#e6ecf2") + ';">' + esc(nm) + '</span>' + tag + '</div>';
                        });
                        html += '</div></div>';
                    }

                    // Akcje
                    html += '<div style="display:flex; gap:8px;">'
                          + '<button onclick="window.hideMissionDossier(); if(window.displayMissionRoute) window.displayMissionRoute(' + JSON.stringify(m.name).replace(/"/g,"&quot;") + ');" style="flex:1; background:rgba(0,204,255,0.12); border:1px solid rgba(0,204,255,0.5); color:#7fd8ff; font-family:inherit; font-size:0.78rem; letter-spacing:1px; padding:9px; border-radius:5px; cursor:pointer;">POKAŻ TRASĘ NA GLOBIE</button>'
                          + '<button onclick="window.hideMissionDossier()" style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.18); color:#9aa5b1; font-family:inherit; font-size:0.78rem; letter-spacing:1px; padding:9px 14px; border-radius:5px; cursor:pointer;">ZAMKNIJ</button>'
                          + '</div>';

                    html += '</div>';
                    return html;
                };

                // Odswiezenie na zywo TYLKO linii licznika (nie przerysowujemy calego okna co sekunde -
                // to zresetowaloby scroll i mignelo). Aktualizujemy tekst + kolor #mdossier-cd/#mdossier-status.
                window._tickDossier = function(){
                    var ov = document.getElementById("mission-dossier-overlay");
                    if (!ov || ov.style.display === "none") return;
                    var missions = (typeof MISSIONS_DB !== "undefined") ? MISSIONS_DB : [];
                    var m = missions[window.selectedMissionIndex];
                    if (!m) return;
                    var sl = window._missionStatusLine(m);
                    var cd = ov.querySelector("#mdossier-cd"), stt = ov.querySelector("#mdossier-status");
                    if (cd) { cd.innerText = sl.cd; cd.style.color = sl.col; if (cd.parentElement) cd.parentElement.style.borderColor = sl.col + "55"; }
                    if (stt) { stt.innerText = sl.status; stt.style.color = sl.col; }
                };

                // Nawigacja misji z wnetrza okna - synchronizuje sie z panelem Active Mission (ten sam index).
                window._dossierGo = function(delta){
                    var missions = (typeof MISSIONS_DB !== "undefined") ? MISSIONS_DB : [];
                    if (missions.length < 2) return;
                    window.missionManual = true;
                    window.selectedMissionIndex = ((window.selectedMissionIndex || 0) + delta + missions.length) % missions.length;
                    if (typeof updateMissionCountdown === "function") updateMissionCountdown();   // panel tez podaza
                    window._renderDossier();
                };

                window._renderDossier = function(){
                    var ov = document.getElementById("mission-dossier-overlay");
                    if (!ov) return;
                    var missions = (typeof MISSIONS_DB !== "undefined") ? MISSIONS_DB : [];
                    var m = missions[window.selectedMissionIndex];
                    var card = ov.querySelector("#mission-dossier-card");
                    if (card) card.innerHTML = window._missionDossierHTML(m);
                };

                window.hideMissionDossier = function(){
                    var ov = document.getElementById("mission-dossier-overlay");
                    if (ov) ov.style.display = "none";
                    if (window._dossierTimer) { clearInterval(window._dossierTimer); window._dossierTimer = null; }
                };

                window.showMissionDossier = function(){
                    var ov = document.getElementById("mission-dossier-overlay");
                    if (!ov) {
                        ov = document.createElement("div");
                        ov.id = "mission-dossier-overlay";
                        ov.style.cssText = "display:none; position:fixed; inset:0; z-index:205; background:rgba(0,0,0,0.55); backdrop-filter:blur(4px); align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace;";
                        ov.innerHTML = '<div id="mission-dossier-card" style="width:min(560px,96vw); max-height:90vh; overflow-y:auto; background:rgba(8,8,10,0.97); border:1px solid rgba(250,204,21,0.45); border-radius:8px; box-shadow:0 8px 40px rgba(0,0,0,0.6); color:#c6cfd9;"></div>';
                        document.body.appendChild(ov);
                        ov.addEventListener("click", function(e){ if (e.target === ov) window.hideMissionDossier(); });
                    }
                    window._renderDossier();
                    ov.style.display = "flex";
                    if (window._dossierTimer) clearInterval(window._dossierTimer);
                    window._dossierTimer = setInterval(window._tickDossier, 1000);
                };

                var visited = [];
                if(typeof VISITED_COUNTRIES !== 'undefined') {
                    visited = VISITED_COUNTRIES;
                }

                window.refreshVisitedUI = function() {
                    var lt = document.getElementById("loot-track"), rs = document.getElementById("region-stats");

                    // --- EXCLUDE LIST (Terytoria, które nie dają XP) ---

                    // Deduplikacja RAZ na wejsciu: staty regionow, XP i marquee licza z UNIKALNYCH kodow.
                    // Bez tego ewentualny duplikat w VISITED_COUNTRIES zawyzalby procent regionu (mozliwe >100%)
                    // oraz licznik XP - a computeAchievementContext (osiagniecia) i tak juz liczy z unikatow,
                    // wiec teraz wszystkie liczniki sa spojne.
                    let uniqueVisited = [...new Set(visited)];

                    // Liczymy staty regionów (To zostawiamy, niech pokazuje wszystko na mapie)
                    let counts = { "EU":0, "ASIA":0, "NA":0, "SA":0, "AF":0, "OC":0 };
                    uniqueVisited.forEach(c => { let r = REGION_MAP[c]; if(counts[r] !== undefined) counts[r]++; });
                    let regionRowsHTML = "";
                    CONTINENT_DATA.forEach(c => {
                        let v = counts[c.id], p = Math.round((v / c.total) * 100);
                        // Licznik ma wlasny onclick (lista panstw) - stopPropagation, zeby nie odpalil
                        // jednoczesnie focusContinent z wiersza (klik w nazwe = Factbook, klik w liczbe = lista).
                        regionRowsHTML += `<div class="region-row" onclick="focusContinent('${c.id}')" style="cursor:pointer;"><div class="region-header"><span>${c.name}</span><span onclick="event.stopPropagation(); showContinentCountries('${c.id}')" style="cursor:pointer; text-decoration:underline dotted rgba(255,255,255,0.35); text-underline-offset:3px;" title="Pokaż listę państw">${v}/${c.total} (${p}%)</span></div><div class="progress-bar-bg"><div class="progress-bar-fill ${v==0?'empty':''}" style="width: ${p}%"></div></div></div>`;
                    });
                    rs.innerHTML = regionRowsHTML;

                    // --- OBLICZANIE SKILLA (Bez śmieciowych kodów) ---
                    // Filtrujemy listę unikatów, wyrzucając kody z czarnej listy
                    let rankedVisits = uniqueVisited.filter(code => !EXCLUDED_CODES.includes(code));
                    let currentScore = rankedVisits.length; // To jest Twoja prawdziwa liczba do rangi

                    // Reszta logiki mapy (Marquee, podświetlanie) korzysta z 'visited'/'uniqueVisited'
                    // Żebyś widział na mapie, że tam byłeś, ale XP leci z 'currentScore'


                    // --- INFINITE MARQUEE GENERATOR (uniqueVisited policzone na gorze funkcji) ---
                    if (uniqueVisited.length > 0) {
                        let gap = uniqueVisited.length < 5 ? 80 : 40; 
                        lt.style.gap = gap + "px";

                        // Delegacja klikniec (raz): nazwy krajow moga miec apostrof (np. "COTE D'IVOIRE") -
                        // inline onclick="handleFlagClick('...')" lamal sie na takiej nazwie. Id/nazwe trzymamy
                        // w data-* (escapowane), a klikniecie obsluguje jeden listener na kontenerze paska.
                        var _escAttr = function(s){ return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
                        if (!lt._flagClickBound) {
                            lt.addEventListener("click", function(ev){
                                // Po przeciagnieciu paska przegladarka i tak wysyla "click" w flage, nad ktora
                                // skonczyl kursor - bez tego straznika kazde przewiniecie obracalo glob na
                                // przypadkowy kraj. Flage ustawia pointermove po przekroczeniu progu 4 px.
                                if (lt._dragMoved) { lt._dragMoved = false; return; }
                                var el = ev.target.closest ? ev.target.closest(".loot-flag") : null;
                                if (el) window.handleFlagClick(el.getAttribute("data-fid"), el.getAttribute("data-fname"));
                            });
                            lt._flagClickBound = true;
                        }
                        // Idempotentne (wlasny straznik w srodku) - pasek istnieje w DOM od startu, wiec
                        // wystarczy, ze zahaczymy sie przy pierwszej przebudowie.
                        window._initLootBarDrag();
                        let singleSetHTML = "";
                        // Flagi jako obrazki (Chrome/Edge na Windows nie renderuja emoji flag). Tlo idzie
                        // przez klasy .flag-XX z jednego <style>, wiec powielanie zestawu nizej jest darmowe.
                        window._ensureFlagCss(uniqueVisited);
                        uniqueVisited.forEach(id => {
                            let p = poly.getDataItemById(id);
                            let name = p ? p.dataContext.name.toUpperCase() : id;
                            let _hasImg = !!window._flagSrc(id);
                            let _cls = "loot-flag" + (_hasImg ? " lf-img " + window._flagClass(id) : "");
                            // Bez title= - nazwe (plus licznik miast i najdalsze miasto) pokazuje wlasny
                            // dymek #loot-tip; natywny title dublowalby sie z nim i wchodzil z opoznieniem.
                            singleSetHTML += `<span class="${_cls}" data-fid="${_escAttr(id)}" data-fname="${_escAttr(name)}">${_hasImg ? "" : getFlagEmoji(id)}</span>`;
                        });

                        const itemWidth = 50 + gap; 
                        const screenWidth = window.innerWidth;
                        let totalSetWidth = uniqueVisited.length * itemWidth;
                        let repeatsNeeded = Math.ceil(screenWidth / totalSetWidth) + 1; 

                        let fullScreenHTML = "";
                        for(let i=0; i < repeatsNeeded; i++) {
                            fullScreenHTML += singleSetHTML;
                        }

                        lt.innerHTML = fullScreenHTML + fullScreenHTML;

                        let totalFlags = uniqueVisited.length * repeatsNeeded * 2;
                        let duration = totalFlags * 2.5;
                        if(duration < 20) duration = 20;
                        lt.style.setProperty('--duration', duration + "s");
                        // Zestaw flag mogl sie zmienic (nowy kraj) - zwija reczne przesuniecie do nowej szerokosci.
                        if (window._lootBarSync) window._lootBarSync();
                        // innerHTML paska zostal odbudowany, wiec klasy .lf-active przepadly - nakladamy od nowa.
                        if (window._lootActiveId) window._setLootBarActive(window._lootActiveId);
                    } else {
                         lt.innerHTML = "";
                    }
                    // --- END INFINITE MARQUEE ---

                    var _plPolygon = null;
                    visited.forEach(id => {
                        var p = poly.getDataItemById(id);
                        if(p) {
                            var m = p.get("mapPolygon"); m.set("active", true);
                            if (id === "PL") {
                                // biale-czerwone (flaga PL) zamiast plaskiej zieleni - odroznia "dom" od zwyklego "odwiedzony" (zielony jest teraz zarezerwowany dla miast)
                                _plPolygon = m;
                            }
                        }
                    });
                    if (_plPolygon) {
                        // PODEJSCIE 1 (fillGradient liczony z bounding-boxa na ekranie) i PODEJSCIE 2
                        // (dynamiczny kat gradientu z projekcji) zawiodly - amCharts liczy dlugosc odcinka
                        // gradientu jako rzut bounding-boxa na jego wlasna os, wiec przy nietypowych katach
                        // granica 50% laduje daleko poza faktyczna sylwetka kraju (efekt "prawie caly bialy").
                        // Zamiast bawic sie w ekranowe triki, dzielimy PRAWDZIWA geometrie Polski (GeoJSON) na
                        // polnoc/poludnie wzgledem szerokosci geograficznej i renderujemy poludniowa polowe jako
                        // osobny, zwykly poligon na czerwono NAD bialym Polakiem. To realna geografia, wiec
                        // amCharts projektuje ja tak samo poprawnie jak kazdy inny kraj - bez wzgledu na obrot
                        // czy nachylenie globu flaga zawsze trzyma sie prawdziwej osi polnoc-poludnie.
                        _plPolygon.set("fill", am5.color(0xffffff));
                        _plPolygon.states.create("active", { fill: am5.color(0xffffff) });

                        // Geometria Polski jest stala, wiec poludniowa polowa flagi tez - liczymy ja
                        // (i dopisujemy do poly.data) TYLKO RAZ. refreshVisitedUI() jest wywolywane
                        // wielokrotnie w ciagu sesji (kazde zaznaczenie kraju/cudu + event "datavalidated"
                        // po kazdej zmianie danych samego poly, WLACZNIE z ta ponizej) - bez tej strazniczki
                        // kazde wywolanie doklejalo NOWY duplikat "PL_FLAG_SOUTH" do poly.data (nigdy
                        // nieusuwany), co bez konca zwiekszalo ilosc danych serii mapy.
                        var _plGeom = poly.getDataItemById("PL_FLAG_SOUTH") ? null : _plPolygon.get("geometry");
                        if (_plGeom) {
                            var _plLatMin = 90, _plLatMax = -90;
                            (function scanGeom(geom) {
                                function scanRing(r) { r.forEach(function(pt){ if (pt[1] < _plLatMin) _plLatMin = pt[1]; if (pt[1] > _plLatMax) _plLatMax = pt[1]; }); }
                                function scanPoly(c) { c.forEach(scanRing); }
                                if (geom.type === "Polygon") scanPoly(geom.coordinates);
                                else if (geom.type === "MultiPolygon") geom.coordinates.forEach(scanPoly);
                            })(_plGeom);

                            var _plSplitLat = (_plLatMin + _plLatMax) / 2;

                            function _plIntersect(a, b, splitLat) {
                                var t = (splitLat - a[1]) / (b[1] - a[1]);
                                return [a[0] + t * (b[0] - a[0]), splitLat];
                            }
                            function _plClipRing(ring, splitLat) {
                                var out = [], n = ring.length;
                                for (var i = 0; i < n; i++) {
                                    var curr = ring[i], prev = ring[(i - 1 + n) % n];
                                    var currIn = curr[1] <= splitLat, prevIn = prev[1] <= splitLat;
                                    if (currIn) {
                                        if (!prevIn) out.push(_plIntersect(prev, curr, splitLat));
                                        out.push(curr);
                                    } else if (prevIn) {
                                        out.push(_plIntersect(prev, curr, splitLat));
                                    }
                                }
                                if (out.length && (out[0][0] !== out[out.length-1][0] || out[0][1] !== out[out.length-1][1])) out.push(out[0]);
                                return out;
                            }
                            function _plClipPoly(coords, splitLat) {
                                return coords.map(function(ring){ return _plClipRing(ring, splitLat); }).filter(function(r){ return r.length >= 4; });
                            }

                            var _plSouthPolys = [];
                            if (_plGeom.type === "Polygon") {
                                var _c = _plClipPoly(_plGeom.coordinates, _plSplitLat);
                                if (_c.length) _plSouthPolys.push(_c);
                            } else if (_plGeom.type === "MultiPolygon") {
                                _plGeom.coordinates.forEach(function(p){
                                    var _c = _plClipPoly(p, _plSplitLat);
                                    if (_c.length) _plSouthPolys.push(_c);
                                });
                            }

                            if (_plSouthPolys.length) {
                                window._skipReentrantVisitedRefresh = true;   // ponizszy push moze wyzwolic zbedny re-entrant refresh -> pomin go (patrz listener "datavalidated")
                                poly.data.push({ id: "PL_FLAG_SOUTH", geometry: { type: "MultiPolygon", coordinates: _plSouthPolys } });
                                var _plSouthItem = poly.getDataItemById("PL_FLAG_SOUTH");
                                if (_plSouthItem) {
                                    var _plSouthPoly = _plSouthItem.get("mapPolygon");
                                    _plSouthPoly.setAll({ fill: am5.color(0xdc143c), stroke: am5.color(0xdc143c), fillOpacity: 1, interactive: false, tooltipText: "" });
                                }
                            }
                        }
                    }

                    if (typeof FLIGHTS_META !== "undefined") {
                        var _fsF=document.getElementById("fs-flights"), _fsA=document.getElementById("fs-airports"), _fsR=document.getElementById("fs-routes");
                        if (_fsF) _fsF.innerText = FLIGHTS_META.total;
                        if (_fsA) _fsA.innerText = FLIGHTS_META.airports;
                        if (_fsR) _fsR.innerText = FLIGHTS_META.routes;
                        // Kazda z trzech komorek otwiera ten sam panel statystyk - klikalna jest cala
                        // komorka (liczba + podpis), zeby nie trzeba bylo celowac w sama cyfre.
                        Array.prototype.forEach.call(document.querySelectorAll(".flight-stats .fs-cell"), function(cell){
                            cell.style.cursor = "pointer";
                            cell.title = "Pokaż szczegółowe statystyki lotów";
                            cell.onclick = function(){ window.updateFlightsIntel(); };
                        });
                    }
                    // --- MAX RANGE: JEDEN blok zamiast dwoch konkurujacych ---
                    // Wczesniej ta wartosc liczyla do STOLICY najdalszego KRAJU (Tokio, 8579 km), a obok
                    // stal osobny box z najdalszym MIASTEM (Naha, 8780 km). Po zmianie MAX RANGE na
                    // najdalsze LOTNISKO (OKA, 8779 km) oba boxy pokazywalyby to samo miejsce z roznica
                    // 1 km - dlatego osobny box zostal skasowany, a jego tresc wchlonieta tutaj:
                    //   wielka liczba + flaga = najdalsze odwiedzone MIASTO (najdalszy realnie punkt),
                    //   wiersz MIASTO         = nazwa miasta + kraj,
                    //   wiersz LOTNISKO       = kod IATA + dystans do niego.
                    // Obie liczby zwykle sa niemal rowne (lotnisko lezy przy miescie), ale rozjada sie,
                    // gdy gdzies dotarles ladem dalej, niz siegaja Twoje loty - i wtedy obie cos mowia.
                    var _fc = window._farthestVisitedCity();
                    var _fa = window._farthestAirport();
                    var _mrVal = document.getElementById("max-dist-val");
                    let telemetryBox = document.getElementById("max-dist-name");
                    var _fcCountry = (_fc && typeof FACTBOOK !== "undefined" && FACTBOOK[_fc.cc] && FACTBOOK[_fc.cc].name)
                        ? FACTBOOK[_fc.cc].name.common.toUpperCase() : (_fc ? _fc.cc : null);

                    // Box siedzi w panelu FLIGHTS, wiec glowna liczba nalezy do LOTNISKA (najdalszy punkt,
                    // do ktorego doleciales). Miasto schodzi do drugiego wiersza z wlasnym dystansem -
                    // to "dokad dotarles dalej juz z ziemi". Gdy nie ma danych o lotach, naglowek przejmuje
                    // miasto, zeby box nie zostal pusty.
                    if (_fa || _fc) {
                        var _head = _fa || _fc;
                        _mrVal.innerText = Math.round(_head.dist) + " KM";
                        var _mrHtml = '<div class="mr-lines">';
                        if (_fa) {
                            _mrHtml += '<div class="mr-line mr-air"><span class="mr-key">LOTNISKO:</span> '
                                     + _fa.name.toUpperCase() + ' (' + _fa.iata + ')</div>';
                        }
                        if (_fc) {
                            _mrHtml += '<div class="mr-line mr-city"><span class="mr-key">MIASTO:</span> '
                                     + _fc.name.toUpperCase() + ', ' + _fcCountry + ' · ' + Math.round(_fc.dist) + ' KM</div>';
                        }
                        // Flaga idzie z KRAJU MIASTA - to jedyny kraj, ktory umiemy ustalic pewnie
                        // (FLIGHTS_AP nie ma kodu kraju, a wyznaczanie go z najblizszego miasta myli sie
                        // na lotniskach przygranicznych). Przy zwyklych danych oba to i tak ten sam kraj.
                        _mrHtml += '</div><div class="telemetry-flag" id="max-radar-flag">'
                                 + (_fc ? window._flagHTML(_fc.cc) : '📡') + '</div>';
                        telemetryBox.innerHTML = _mrHtml;
                    } else {
                        _mrVal.innerText = "N/A";
                        telemetryBox.innerHTML = '<div class="mr-lines"><div class="mr-line">BRAK DANYCH</div></div><div class="telemetry-flag">📡</div>';
                    }

                    // Klik: luk Warszawa -> najdalsze miasto + jego intel. Klikalny jest CALY box
                    // (wartosc KM + oba wiersze + flaga), a nie sama flagietka - reszta panelu linkuje
                    // z nazwy celu (patrz Active Mission), wiec sam napis tez musi dzialac.
                    // Klik: DWA odcinki. Warszawa -> lotnisko to lot (zolta kreska + samolot), lotnisko ->
                    // miasto to dojazd (ciagla zielen, wlasna seria). Drugi odcinek powstaje tylko, gdy
                    // miasto realnie lezy gdzie indziej niz lotnisko - przy zwyklych danych lotnisko stoi
                    // przy miescie (OKA i Naha dzieli ~5 km), wiec linia bylaby niewidocznym punktem.
                    var _maxRangeClick = function(ev) {
                        // Klik w SAM wiersz MIASTO (.mr-city): zamiast rysowac trase robimy MAX ZOOM na najdalsze
                        // miasto + jego intel. Sprawdzamy realny cel klika przez closest() - dziala tak samo, czy
                        // klik wpadl w div, czy w span "MIASTO:" wewnatrz, i BEZ wyscigu z bubbling (dawny osobny
                        // handler + stopPropagation nie lapal i klik spadal tutaj, rysujac trase bez zoomu).
                        if (_fc && ev && ev.target && ev.target.closest && ev.target.closest(".mr-city")) {
                            stopRot();                    // pauzuje rotacje ORAZ ubija samolot MAX RANGE (_clearMaxRangePlane)
                            lineSeries.data.clear();      // skasuj luk WAW -> lotnisko...
                            groundLegSeries.data.clear(); // ...i odcinek naziemny lotnisko -> miasto
                            // migajacy celownik na miescie (bullet type "target" - krzyzyk + okrag + animacja opacity)
                            pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [_fc.lon, _fc.lat] }, type: "target" }]);
                            rotateGlobe(_fc.lat, _fc.lon, 1000, true);
                            chart.animate({ key: "zoomLevel", to: 6, duration: 1000, easing: am5.ease.out(am5.ease.cubic) });
                            if (window.showCityIntel && window.resolveCityIntel) window.showCityIntel(window.resolveCityIntel(_fc.name, _fc.lat, _fc.lon));
                            return;
                        }
                        var start = CAPITAL_COORDS["PL"];
                        if (!start || (!_fa && !_fc)) return;
                        var air = _fa ? [_fa.lat, _fa.lon] : null;
                        var city = _fc ? [_fc.lat, _fc.lon] : null;
                        var dest = air || city;                 // cel lotu (bez danych o lotach - miasto)
                        stopRot();
                        window.resetIntelPanels();
                        lineSeries.data.clear();
                        groundLegSeries.data.clear();
                        lineSeries.pushDataItem({ geometry: { type: "LineString", coordinates: [[start[1], start[0]], [dest[1], dest[0]]] } });

                        var _pts = [];
                        if (air) _pts.push({ geometry: { type: "Point", coordinates: [air[1], air[0]] }, type: "target" });
                        var _apart = air && city && !window._isSameSpot(air[0], air[1], city[0], city[1]);
                        if (_apart) {
                            groundLegSeries.pushDataItem({ geometry: { type: "LineString", coordinates: [[air[1], air[0]], [city[1], city[0]]] } });
                        }
                        if (city && (_apart || !air)) {
                            _pts.push({ geometry: { type: "Point", coordinates: [city[1], city[0]] }, type: "farcity", title: _fc.name.toUpperCase() });
                        }
                        pointSeries.data.setAll(_pts);
                        rotateGlobe((start[0] + dest[0]) / 2, (start[1] + dest[1]) / 2);

                        // Intel PO resetIntelPanels - wczesniej reset szedl na koncu handlera i kasowal
                        // panel, wiec klik nie otwieral zadnego intelu. Profil bierzemy z MIASTA (znamy
                        // jego kraj na pewno); bez miasta zostaje sam widok trasy.
                        if (_fc) {
                            if (window.updateWeatherPanel) window.updateWeatherPanel(_fc.cc, _fc.name.toUpperCase(), _fc.lat, _fc.lon);
                            if (window.updateFactbookPanel) window.updateFactbookPanel(_fc.cc, _fcCountry);
                        }
                        // Samolot leci w kolko po trasie DO LOTNISKA (po resecie, bo reset go zdejmuje).
                        if (window._flyMaxRange) window._flyMaxRange(start, dest);
                    };
                    [_mrVal, telemetryBox].forEach(function(el){
                        if (!el) return;
                        var _act = _fa || _fc;
                        el.style.cursor = _act ? "pointer" : "";
                        el.title = _act ? ("Pokaż trasę i profil: " + (_fa ? _fa.name.toUpperCase() + " (" + _fa.iata + ")" : _fc.name.toUpperCase())) : "";
                        el.onclick = _act ? _maxRangeClick : null;
                    });
                    // Podpowiedz na wierszu MIASTO: klik = zoom na miasto (sama obsluga jest w _maxRangeClick
                    // powyzej, po closest(".mr-city") - dlatego tu tylko kursor "zoom-in" + wlasny tooltip).
                    if (_fc) {
                        var _mrCityEl = telemetryBox.querySelector(".mr-city");
                        if (_mrCityEl) { _mrCityEl.style.cursor = "pointer"; _mrCityEl.title = "Powiększ na miasto: " + _fc.name.toUpperCase(); }
                    }

                    var ws = document.getElementById("wonders-stats");
                    ws.innerHTML = "";
                    let wondersVisited = 0;
                    WONDERS.forEach(w => {
                        let isV = ((typeof VISITED_WONDERS !== 'undefined') ? VISITED_WONDERS : []).includes(w.id);
                        if(isV) wondersVisited++;
                        let el = document.createElement("div");
                        el.className = `rank-item ${isV?'completed':''}`;
                        el.style.marginBottom = "3px";
                        el.innerHTML = `<span>${isV?'[✓]':'[🔒]'} ${w.icon} ${w.name}${(w.winner||w.honorary)?' 🏆':''}</span>`;
                        el.onclick = function() {
                            stopRot();
                            lineSeries.data.clear();
                            airportSeries.data.clear();
                            window._clearCitySeries();
                            if (window.myFlightsOn) window.clearMyFlights();
                            if (window.showCityLegend) window.showCityLegend(false);
                            if (window.showAirportModeBtn) window.showAirportModeBtn(false);
                            if (window.clearCountryHighlight) window.clearCountryHighlight();
                            pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [w.lon, w.lat] }, type: "wonder", icon: w.icon }]);
                            rotateGlobe(w.lat, w.lon);
                            window.updateWonderIntel(w);
                        };
                        ws.appendChild(el);
                    });

                    // --- TUTAJ JEST ZMIANA GŁÓWNA ---
                    // Zamiast visited.length, używamy currentScore (oczyszczona lista)
                    document.getElementById("counter").innerText = currentScore;
                    
                    let currentRankIndex = 0;
                    for(let i=0; i<RANKS.length; i++) {
                        if(currentScore >= RANKS[i].min) currentRankIndex = i; else break;
                    }
                    
                    let nextRank = RANKS[currentRankIndex + 1];
                    if (nextRank) {
                        let prevMin = RANKS[currentRankIndex].min;
                        let nextMin = nextRank.min;
                        let range = nextMin - prevMin;
                        let currentInLevel = currentScore - prevMin;
                        let xpPercent = (currentInLevel / range) * 100;
                        document.getElementById("xp-fill").style.width = xpPercent + "%";
                        document.getElementById("xp-text-val").innerText = `LVL UP IN: ${nextMin - currentScore}`;
                    } else {
                        document.getElementById("xp-fill").style.width = "100%";
                        document.getElementById("xp-text-val").innerText = "MAX LEVEL";
                    }

                    document.getElementById("current-rank").innerHTML = "Current rank:<br><span class='rank-title-text' style='font-size: 2.8rem; line-height: 1.2; display: block; margin-top: 5px; color: #facc15; text-shadow: 0 0 15px rgba(250, 204, 21, 0.6);'>" + RANKS[currentRankIndex].title + "</span>";
                    
                    let rls = document.getElementById("rank-list");
                    while(rls.childNodes.length > 0) rls.removeChild(rls.lastChild);
                    // Stan dla updateRankIntel (plan dojscia do rangi) - liczony tylko tutaj, zeby panel
                    // nie duplikowal logiki XP (dedup + EXCLUDED_CODES).
                    window._rankState = { score: currentScore, visited: rankedVisits, idx: currentRankIndex };
                    // SPLASH AWANSU. Ta sama zasada co przy odznakach: pierwszy przebieg po wczytaniu strony
                    // tylko zapamietuje range (undefined -> cisza), splash leci WYLACZNIE za awans zdobyty
                    // na zywo. Ranga w dol (odznaczenie kraju w adminie) tez przechodzi cicho - przesuwamy
                    // baseline bez okna. Odpalamy TU, a nie przy odznakach nizej, zeby awans byl PIERWSZY
                    // w kolejce: checkAndPersistAchievements woła się na końcu refreshVisitedUI, więc odznaki
                    // z tego samego kliku dokladaja sie ZA nim.
                    if (window._lastRankIdx === undefined) window._lastRankIdx = currentRankIndex;
                    else if (currentRankIndex > window._lastRankIdx) {
                        var _prevRank = window._lastRankIdx;
                        window._lastRankIdx = currentRankIndex;
                        // Przeskok o kilka rang naraz (import wielu krajow) - pokazujemy tylko te OSIAGNIETA,
                        // zeby nie robic pokazu slajdow z rang, ktorych nikt nie widzial jako "aktualne".
                        if (_prevRank !== currentRankIndex && window.showRankSplash) window.showRankSplash(currentRankIndex, currentScore);
                    } else if (currentRankIndex < window._lastRankIdx) {
                        window._lastRankIdx = currentRankIndex;
                    }
                    RANKS.forEach((r, i) => {
                        // Tutaj też podmianka na currentScore w wyświetlaniu
                        let d = document.createElement("div"); d.className = "rank-item" + (i==currentRankIndex?' active':'') + (i<currentRankIndex?' completed':'');
                        // Wszystkie rangi pokazuja swoj prog (X+). Wyjatek: nastepna ranga (pierwsza zablokowana) pokazuje realny postep do niej.
                        let numText = i==currentRankIndex+1 ? (currentScore+'/'+r.min) : (r.min+'+');
                        d.innerHTML = `<span>${i<=currentRankIndex?'[✓]':'[🔒]'} ${r.title}</span> <span>${numText}</span>`;
                        d.style.cursor = "pointer";
                        d.title = i <= currentRankIndex ? "Podsumowanie rangi" : "Plan dojścia do tej rangi";
                        d.onclick = function(){ window.updateRankIntel(i); };
                        rls.appendChild(d);
                    });

                    // Skroty w Operative Status: nazwa rangi -> panel tej rangi, pasek XP -> panel
                    // nastepnej. Podpinane tutaj, bo #current-rank jest przerysowywany co refresh
                    // (innerHTML wyzej), wiec handler ustawiony raz na starcie by przepadl.
                    // ZMIANA 2026-07-19: nazwa rangi otwiera PASZPORT, a nie plan dojscia do rangi.
                    // Plan rangi nie znika - prowadza do niego dwie inne, juz istniejace sciezki:
                    // pasek XP pod spodem (updateRankIntel dla NASTEPNEJ rangi) oraz lista rang
                    // "Progression Tree" po prawej (klik w dowolny wiersz).
                    var _rankNameEl = document.querySelector("#current-rank .rank-title-text");
                    if (_rankNameEl) {
                        _rankNameEl.style.cursor = "pointer";
                        _rankNameEl.title = "Pokaż paszport operatora";
                        _rankNameEl.onclick = function(){ window.showPassportPanel(); };
                    }
                    var _xpEl = document.querySelector("#left-hud .xp-container");
                    if (_xpEl) {
                        if (nextRank) {
                            _xpEl.style.cursor = "pointer";
                            _xpEl.title = "Pokaż plan dojścia do rangi " + nextRank.title;
                            _xpEl.onclick = function(){ window.updateRankIntel(currentRankIndex + 1); };
                        } else {
                            // MAX LEVEL - nie ma nastepnej rangi, wiec pasek nie udaje klikalnego.
                            _xpEl.style.cursor = "";
                            _xpEl.title = "";
                            _xpEl.onclick = null;
                        }
                    }
                    
                    // Log systemowy pokazuje prawdę
                    startSystemLog(currentScore);
                    if (typeof adjustLayout === 'function') adjustLayout();
                    if (typeof window.checkAndPersistAchievements === 'function') window.checkAndPersistAchievements();
                };
                // Jednorazowy push "PL_FLAG_SOUTH" do poly.data (patrz refreshVisitedUI) wyzwala kolejne
                // "datavalidated", a to znow odpalaloby caly refresh (marquee, rangi, cuda, osiagniecia)
                // bez potrzeby - przebieg nr 1 obsluguje flage PL synchronicznie. Straznik pomija ten jeden
                // re-entrant przebieg. WAZNE: straznika trzymamy TYLKO tutaj, przy zdarzeniu. Wczesniej
                // siedzial na wejsciu do refreshVisitedUI - a mark* wolaja ja wprost, wiec gdy oczekiwane
                // po pushu "datavalidated" nie przyszlo (push leci ze srodka handlera), flaga zostawala
                // podniesiona az do pierwszego klikniecia usera i zjadala JEGO refresh: kraj zapisywal sie
                // w admin.php, ale nie robil sie czerwony az do nastepnego klikniecia.
                poly.events.on("datavalidated", function(){
                    if (window._skipReentrantVisitedRefresh) { window._skipReentrantVisitedRefresh = false; return; }
                    window.refreshVisitedUI();
                });

                startRot();
            } catch (err) {
                console.error("CRITICAL BOOT FAILURE:", err);
                alert("CRITICAL ERROR: " + err.message);
            }

            const searchInput = document.getElementById('country-search');
            const resultsDiv = document.getElementById('search-results');
            const searchClearBtn = document.getElementById('country-search-clear');
            // Przycisk "x" pokazuje sie tylko gdy w polu jest tekst (sync po wpisaniu ORAZ po
            // programowym ustawieniu wartosci przy kliknieciu w wynik).
            function _syncSearchClear(){ if (searchClearBtn) searchClearBtn.style.display = (searchInput && searchInput.value.length) ? 'block' : 'none'; }
            // Globalny, zeby mogl go wolac przycisk RESET AND RESUME ORBIT (patrz resetBtn.onclick).
            window.clearCountrySearch = function(){
                if (searchInput) searchInput.value = '';
                if (resultsDiv) resultsDiv.innerHTML = '';
                _syncSearchClear();
            };
            if (searchClearBtn) {
                searchClearBtn.addEventListener('click', function(){ window.clearCountrySearch(); if (searchInput) searchInput.focus(); });
            }

            // --- Plaski, jednorazowo zbudowany indeks miast do wyszukiwarki (CITIES_DB pogrupowany
            // po kraju -> pojedyncza lista [cc, wpis, czyStolica, nazwaUpper]), zeby przy kazdym
            // wcisnieciu klawisza nie iterowac calego CITIES_DB od nowa. ---
            function _buildCitySearchIndex(){
                var out = [];
                if (typeof CITIES_DB === 'undefined') return out;
                for (var cc in CITIES_DB) {
                    var list = CITIES_DB[cc];
                    var capIdx = window._findCapitalIndex ? window._findCapitalIndex(cc, list) : -1;
                    for (var i = 0; i < list.length; i++) {
                        out.push({ cc: cc, ci: list[i], cap: (i === capIdx), nameUp: list[i][0].toUpperCase() });
                    }
                }
                return out;
            }

            searchInput.addEventListener('input', function(e) {
                const val = e.target.value.toUpperCase();
                _syncSearchClear();
                resultsDiv.innerHTML = '';
                if (val.length < 2) return;

                const countries = WORLD_GEO.features;
                const matches = countries.filter(c =>
                    c.properties.name.toUpperCase().includes(val) ||
                    c.id.toUpperCase().includes(val)
                );

                matches.forEach(m => {
                    const d = document.createElement('div');
                    d.style.padding = '8px 12px';
                    d.style.cursor = 'pointer';
                    d.style.borderBottom = '1px solid rgba(0,255,0,0.1)';
                    d.style.color = '#00ff00';
                    d.innerHTML = `> [${m.id}] ${m.properties.name.toUpperCase()}`;

                    d.onmouseover = () => d.style.background = 'rgba(0,255,0,0.1)';
                    d.onmouseout = () => d.style.background = 'transparent';

                    d.onclick = () => {
                        const id = m.id;
                        const name = m.properties.name.toUpperCase();
                        const coords = CAPITAL_COORDS[id];

                        if(coords) {
                            stopRot();   // bylo: autoRot.pause() - stopRot robi to samo + sprzata samolot
                            lineSeries.data.clear();
                            pointSeries.data.setAll([{
                                geometry: { type: "Point", coordinates: [coords[1], coords[0]] },
                                type: "target-search"
                            }]);

                            rotateGlobe(coords[0], coords[1]);

                            window.updateWeatherPanel(id, name, coords[0], coords[1]);
                            window.updateFactbookPanel(id, name);

                            resultsDiv.innerHTML = '';
                            searchInput.value = name;
                            _syncSearchClear();
                        }
                    };
                    resultsDiv.appendChild(d);
                });

                if (!window._citySearchIndex) window._citySearchIndex = _buildCitySearchIndex();
                const cityMatches = window._citySearchIndex
                    .filter(function(entry){ return entry.nameUp.includes(val); })
                    .sort(function(a, b){ return (+b.ci[7] || 0) - (+a.ci[7] || 0); })
                    .slice(0, 40);

                if (matches.length && cityMatches.length) {
                    const sep = document.createElement('div');
                    sep.style.cssText = "padding:4px 12px; font-size:0.7rem; color:#8f9ba8; letter-spacing:1px; border-bottom:1px solid rgba(0,255,0,0.15);";
                    sep.textContent = "MIASTA";
                    resultsDiv.appendChild(sep);
                }

                cityMatches.forEach(function(entry){
                    const ci = entry.ci, cc = entry.cc;
                    const countryName = (typeof FACTBOOK !== 'undefined' && FACTBOOK[cc]) ? FACTBOOK[cc].name.common.toUpperCase() : cc;
                    const d = document.createElement('div');
                    d.style.padding = '8px 12px';
                    d.style.cursor = 'pointer';
                    d.style.borderBottom = '1px solid rgba(0,255,0,0.1)';
                    d.style.color = '#5fd0ff';
                    d.innerHTML = `> 🏙️ ${ci[0].toUpperCase()} <span style="color:#8f9ba8;">(${countryName})</span>`;

                    d.onmouseover = () => d.style.background = 'rgba(95,208,255,0.1)';
                    d.onmouseout = () => d.style.background = 'transparent';

                    d.onclick = () => {
                        stopRot();   // bylo: autoRot.pause() - stopRot robi to samo + sprzata samolot
                        if (window.myFlightsOn) window.clearMyFlights();
                        lineSeries.data.clear();

                        window._selectedCountryId = cc;
                        window.airportMode = false;
                        if (window.showAirportModeBtn) window.showAirportModeBtn(true);

                        const polyItem = poly.getDataItemById(cc);
                        if (window.highlightCountry) window.highlightCountry(polyItem ? polyItem.get("mapPolygon") : null);
                        if (window.renderCountryPlaces) window.renderCountryPlaces(cc);

                        // Reticle-podswietlenie na dokladnym punkcie miasta (jak przy trafieniu stolicy
                        // w wyszukiwarce krajow) - rysowane PO renderCountryPlaces, bo ta funkcja czysci
                        // pointSeries gdy stolica kraju jest jednoczesnie dopasowanym miastem.
                        pointSeries.data.setAll([{ geometry: { type: "Point", coordinates: [ci[2], ci[1]] }, type: "target-search" }]);

                        // Obrot robi WYLACZNIE rotateGlobe (jak wszedzie indziej). Zoom ustawiamy animujac
                        // bezposrednio "zoomLevel" - NIE przez zoomToGeoPoint, bo ta metoda przy projekcji
                        // geoOrthographic sama probuje obracac globus w strone punktu (niezaleznie od flagi
                        // center), co gryzlo sie z rotateGlobe i globus ladowal w losowym miejscu.
                        rotateGlobe(ci[1], ci[2], 1000, true);
                        chart.animate({ key: "zoomLevel", to: 6, duration: 1000, easing: am5.ease.out(am5.ease.cubic) });

                        if (window.showCityIntel) {
                            window.showCityIntel(window._cityObjFromRow(cc, ci, entry.cap));
                        }

                        resultsDiv.innerHTML = '';
                        searchInput.value = ci[0].toUpperCase();
                        _syncSearchClear();
                    };
                    resultsDiv.appendChild(d);
                });
            });
        });

        function createStars() { const count = 120; const frag = document.createDocumentFragment(); const W = window.innerWidth, H = window.innerHeight; for(let i=0; i<count; i++){ let s=document.createElement("div"); s.className="star"; let x=Math.random()*W, y=Math.random()*H, sz=Math.random()*2, d=2+Math.random()*3; s.style.left=x+"px"; s.style.top=y+"px"; s.style.width=sz+"px"; s.style.height=sz+"px"; s.style.setProperty('--duration', d+"s"); frag.appendChild(s); } document.body.appendChild(frag); }
        createStars();
        // Gwiazdy maja stale pozycje w px - po zmianie rozmiaru okna regenerujemy je pod nowy rozmiar
        // (debounce, zeby nie odtwarzac 120 divow przy kazdym ticku drag-resize).
        var _starsResizeTimer = null;
        window.addEventListener('resize', function(){
            if (_starsResizeTimer) clearTimeout(_starsResizeTimer);
            _starsResizeTimer = setTimeout(function(){
                var _old = document.querySelectorAll('.star');
                for (var i = 0; i < _old.length; i++) _old[i].remove();
                createStars();
            }, 200);
        });

        // --- KLIK W PRZYCISK "?" -> instrukcja/manual ---
        (function(){
            var helpBtn = document.getElementById("help-toggle");
            if (helpBtn) helpBtn.onclick = function(){ if (window.showHelpPanel) window.showHelpPanel(); };
        })();
        // --- KLIK W PASEK ACHIEVEMENTS -> panel osiagniec/odznak (przeniesione z nazwy rangi) ---
        (function(){
            var achRow = document.getElementById("ach-label-row");
            if (achRow) achRow.onclick = function(){ window._achOpenedFromPassport = false; if (window.showAchievementsPanel) window.showAchievementsPanel(); };
        })();
        // --- KLIK W DUZY LICZNIK "38" -> spis odwiedzonych panstw ---
        // #counter dostaje tylko innerText co refresh (refreshVisitedUI), sam element nie jest przerysowywany,
        // wiec handler wystarczy podpiac raz tutaj (jak wyzej pasek odznak) - nie przepadnie przy odswiezeniu.
        (function(){
            var counterEl = document.getElementById("counter");
            if (counterEl) {
                counterEl.style.cursor = "pointer";
                counterEl.title = "Pokaż spis odwiedzonych państw";
                counterEl.onclick = function(){ if (window.showVisitedCountries) window.showVisitedCountries(); };
            }
        })();
        
        function startSystemLog(count) {
            if (window.sysLogInterval) clearInterval(window.sysLogInterval);
            const logContainer = document.getElementById('console-logs');
            const now = new Date().getTime();
            
            let targetMsg = "> NO ACTIVE TARGETS";
            let daysMsg = "> STANDBY MODE";
            
            if(typeof MISSIONS_DB !== 'undefined') {
                const activeMission = MISSIONS_DB.find(m => new Date(m.returnDate).getTime() > now);

                if (activeMission) {
                    targetMsg = `> NEXT TARGET: ${activeMission.name} [${activeMission.flag}]`;
                    const dist = new Date(activeMission.date).getTime() - now;
                    const d = Math.floor(dist / (1000 * 60 * 60 * 24));
                    daysMsg = d > 0 ? `> T-MINUS: ${d} DAYS` : "> MISSION IN PROGRESS";
                }
            } else {
                targetMsg = "> WARNING: DB NOT LOADED";
            }

            const messages = [
                "> SYSTEM: CONNECTED",
                "> SECURE CHANNEL: ESTABLISHED",
                `> DATABASE: ${count} REGIONS LOADED`,
                "> ENCRYPTION: AES-256 [ACTIVE]",
                targetMsg,
                daysMsg,
                "> UPLINK: SATELLITE OK",
                "> STATUS: READY FOR DEPLOYMENT",
                "> SCANNING GLOBAL NETWORK..."
            ];

            let index = 0;
            const addLine = () => {
                if (logContainer.children.length > 4) {
                    logContainer.removeChild(logContainer.firstChild);
                }
                const line = document.createElement("div");
                line.className = "log-line";
                line.innerHTML = messages[index] + '<span class="blink-cursor">_</span>';
                
                const prev = logContainer.lastElementChild;
                if(prev && prev.querySelector('.blink-cursor')) {
                    prev.querySelector('.blink-cursor').remove();
                }

                logContainer.appendChild(line);
                index = (index + 1) % messages.length;
            };

            window.sysLogInterval = setInterval(addLine, 2000);
        }     