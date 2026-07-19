// === POZIOMY TRUDNOSCI ODZNAK (dane, nie logika) ===
// Silnik liczacy poziomy mieszka w app.js; TU sa wylacznie definicje poziomow oraz recznie
// przypisane rangi dla odznak.
//
// DWA ZRODLA POZIOMU, ALE OD 2026-07-19c NIEROWNORZEDNE (patrz db-schema.md):
//   1. RECZNIE (ACH_TIERS_MANUAL, ~153 z 528) - JEDYNE zrodlo diamentu i platyny w calym
//      katalogu. Kazda pozycja to osobna, uzasadniona decyzja o realnej trudnosci (konkretne
//      kraje, wizy, bezpieczenstwo, logistyka, rzadkosc zjawiska), nie wynik wzoru.
//   2. AUTOMAT (kwintyl progu prog().need w obrebie puli, patrz ACH_TIER_POOL nizej) - dla
//      reszty katalogu, ale moze dac NAJWYZEJ zloto (patrz ACH_CAT_CEILING). Percentyl dobrze
//      sortuje brazy/srebra/zlota (tam pomylka nikogo nie boli), ale renderowal jawne bzdury
//      na szczycie: "150 dowolnych krajow" (KRAJE) wychodzilo na diament, a "150 krajow bez
//      wizy" (WIZY I PASZPORT - realnie PRAWIE WSZYSTKIE z wlasnej, ~150-krajowej puli, wiec
//      trudniejsze niz 150 z 195 do wyboru) tylko na platyne. Uzytkownik zglosil to wprost:
//      diamenty i platyna maja byc estymowane recznie, nie skryptem.
//
// UWAGA: klucz w ACH_TIERS_MANUAL to ACHIEVEMENTS[].id = "ach_" + hash(cat+desc). Zmiana 'cat'
// albo 'desc' odznaki PRZEBIJA hash i wpis tutaj sie osieroci (odznaka cicho spadnie do zlota
// przez brak wpisu recznego). To ta sama pulapka co w achievements-data.js - przy zmianie
// opisu odznaki popraw tez ten plik.

// Kolejnosc MA ZNACZENIE (rosnaco) - app.js indeksuje po niej kwintyle.
//
// KOLORY: paleta rang z Overwatch (wybor uzytkownika). rgb trzymamy jako trojke skladowych,
// bo kazdy kolor jest uzywany z rozna alfa (gradient tla 0.30/0.05, ramka 0.55, glow 0.45).
//
// GLOW tylko na dwoch najwyzszych poziomach - i to nie estetyka, tylko wydajnosc: panel renderuje
// 528 kafelkow, a box-shadow na kazdym potrafi szarpac przy przewijaniu.
//
// MARK: wlasne ksztalty SVG (viewBox 24x24), NIE ikony z Overwatch - te sa Blizzarda, a strona
// leci publicznie na GitHub Pages. Sylwetka rosnie razem z ranga (szewron -> podwojny szewron ->
// skrzydla -> tarcza -> krysztal), zeby poziom dalo sie rozpoznac takze bez koloru: srebro,
// platyna i diament to trzy chlodne, jasne tony i na samym kolorze myla sie ze soba.
// Zero emoji - na Windows renderuja sie w drobnym tekscie niechlujnie (patrz notka przy FLAGS).
// NATEZENIE TLA (bg: [gora, dol] - alfa gradientu) jest per poziom, a nie wspolne, bo te kolory
// maja bardzo rozna sile wlasna. Braz jest ciemny i nasycony: przy tej samej alfie co reszta
// wygladal NAJBARDZIEJ prestizowo z calej piatki, czyli dokladnie odwrotnie niz powinien.
// Zloto odwrotnie - gaslo i wygladalo na przybrudzone. Stad braz zjechal w dol, zloto w gore.
// Strojac te wartosci pamietaj: to ma rosnac razem z ranga, nie byc rowne.
const ACH_TIER_DEFS = [
    // markRgb jasniejszy od rgb: rgb jest CELOWO ciemny (tlo kafelka ma byc najskromniejsze z piatki),
    // ale ten sam kolor uzyty na znaczku i w splashu wychodzil przygaszony - kontrast nazwy w oknie
    // splasha 3.69 przy 8.5-14 na pozostalych poziomach. markRgb rozdziela te dwa zastosowania.
    // conf: salwa konfetti przy splashu - { n: liczba skrawkow, ms: bazowy czas opadania }.
    // Rosnie razem z ranga, zeby brazowa drobnica nie swietowala tak samo jak diament.
    // Realny czas kazdego skrawka to ms + losowo do polowy ms, a sprzatanie kontenera liczy sie
    // z najdluzszego mozliwego przypadku (patrz _achConfetti w app.js).
    { key: "bronze",   label: "BRĄZ",    rgb: "150,92,48", markRgb: "205,132,74", glow: false, bg: [0.05, 0.02], conf: { n: 28, ms: 1200 },
      mark: '<path d="M3 7 L12 15 L21 7 L21 12 L12 20 L3 12 Z"/>' },
    { key: "silver",   label: "SREBRO",  rgb: "169,178,186", glow: false, bg: [0.25, 0.03], conf: { n: 45, ms: 1450 },
      mark: '<path d="M3 4 L12 11 L21 4 L21 8 L12 15 L3 8 Z"/>'
          + '<path d="M6 14 L12 18.5 L18 14 L18 17.5 L12 22 L6 17.5 Z"/>' },
    { key: "gold",     label: "ZŁOTO",   rgb: "245,199,45",  glow: false, bg: [0.40, 0.06], conf: { n: 70, ms: 1750 },
      mark: '<path d="M5 7 L12 14 L19 7 L19 12 L12 19 L5 12 Z"/>'
          + '<path d="M1.5 4 L4 4 L4 13 L1.5 10.5 Z"/><path d="M22.5 4 L20 4 L20 13 L22.5 10.5 Z"/>' },
    // bg bylo 0.99 - tlo wychodzilo wtedy prawie biale (205,216,226) i ZJADALO TEKST: bialy opis
    // miał kontrast 1.45, bursztynowa nazwa 1.06 (progi czytelnosci zaczynaja sie od 4.5).
    // 0.42 zostawia platyne najjasniejszym kafelkiem w panelu, ale napisy wracaja.
    { key: "platinum", label: "PLATYNA", rgb: "207,218,228", glow: true,  bg: [0.42, 0.08], conf: { n: 105, ms: 2200 },
      mark: '<path d="M12 2.5 L19 5.5 V11 C19 15.5 12 20 12 20 C12 20 5 15.5 5 11 V5.5 Z"/>'
          + '<path d="M2 5 L4.2 5 L4.2 14 L2 11.5 Z"/><path d="M22 5 L19.8 5 L19.8 14 L22 11.5 Z"/>' },
    // markRgb: kolor ZNACZKA, gdy rgb tla nie nadaje sie na znaczek. Diament ma bg 0.99, wiec tlo
    // kafelka jest praktycznie tym samym kolorem co rgb - znaczek rysowany domyslnie mial kontrast
    // 1.01, czyli byl niewidoczny. Jasny fiolet odcina sie od ciemnego tla i zostaje w rodzinie koloru.
    { key: "diamond",  label: "DIAMENT", rgb: "72,34,124", markRgb: "186,150,255", glow: true, bg: [0.99, 0.27], conf: { n: 160, ms: 2900 },
      mark: '<path d="M12 1.5 L21.5 9 L12 22.5 L2.5 9 Z"/>'
          + '<path d="M12 1.5 L12 22.5 M2.5 9 L21.5 9 M7.2 9 L12 22.5 L16.8 9"'
          + ' stroke="#08080a" stroke-width="1.1" fill="none" opacity="0.55"/>' }
];

// === WSPOLNE PULE PERCENTYLA (2026-07-19b) - kategorie UI, ktore licza TO SAMO ===
// KRAJE / KONTYNENTY / REGIONY to trzy widoki na jedna os: ile odwiedzonych krajow. Osobny
// percentyl per kategoria psul monotonicznosc miedzy nimi (patrz historia przy SUFIT nizej).
// Odkad (2026-07-19c) diament/platyna sa wylacznie reczne, ta wspolna pula ma juz mniejsza
// stawke - dalej jednak porzadkuje BRAZ/SREBRO/ZLOTO dla wszystkiego, czego nie dotknelismy
// recznie w te trzy kategorie (np. drobniejsze progi KRAJE typu "60 krajow").
// Kategorie ZOSTAJA osobne w UI (panel, filtr poziomu, spis tresci) - to zmienia WYLACZNIE
// pule percentyla w _achTierOf (app.js), nie pole a.cat.
const ACH_TIER_POOL = {
    "KRAJE": "KRAJE+KONTYNENTY+REGIONY",
    "KONTYNENTY": "KRAJE+KONTYNENTY+REGIONY",
    "REGIONY": "KRAJE+KONTYNENTY+REGIONY"
};

// === SUFIT PULI: formula (percentyl) NIGDY nie siega diamentu ani platyny (2026-07-19c) ===
// Indeks w ACH_TIER_DEFS (0=braz, 1=srebro, 2=zloto, 3=platyna, 4=diament).
//
// HISTORIA: pierwsza wersja (rowne kwintyle, bez sufitu) dawala diamenty LOGISTYCE na rowni
// z LOTAMI - 34% katalogu w dwoch najwyzszych poziomach, ranga nie znaczyla nic. Druga wersja
// (2026-07-19b) dala kazdej kategorii recznie dobrany sufit i polaczyla KRAJE/KONTYNENTY/
// REGIONY we wspolna pule - naprawilo to logiczne sprzecznosci (latwiejszy podzbior wart
// wiecej niz trudniejszy nadzbior), ale SAM POMYSL "percentyl w obrebie puli decyduje o
// diamencie" dalej potrafil dac bezsensowny wynik: "150 dowolnych krajow" (KRAJE, mozna
// wybrac 150 najlatwiejszych) wychodzilo na diament, a "150 krajow bez wizy" (WIZY I PASZPORT
// - to niemal KOMPLET tej ~150-krajowej listy, bez mozliwosci pominiecia trudniejszych) tylko
// na platyne. Zadanie uzytkownika wprost: diamenty i platyna MAJA byc estymowane recznie.
//
// OD TEJ WERSJI: sufit kazdej puli to 2 (zloto) - formula moze co najwyzej dorzucic zlota
// pozycje, nigdy platyny/diamentu. Oba najwyzsze poziomy pochodza WYLACZNIE z ACH_TIERS_MANUAL
// (patrz nizej) i sufit ich JUZ NIE PRZYCINA (zmiana wzgledem 2026-07-19b, patrz _achTierOf w
// app.js) - poprzednio sufit obcinal TAKZE reczne wpisy, co przy audycie ujawnilo, ze wlasne
// sufity kategorii cichcem obcinaly wlasny reczny osad autora (KLIMAT "-5 st." i PIENIADZE
// "maks. ryzyko" byly recznie oznaczone jako diament, a realnie wychodzily platyna/zloto -
// nikt tego nie widzial, bo klip dzialal po cichu). Teraz reczny wpis JEST ostateczny - jesli
// kiedys wyjdzie za wysoko lub za nisko, popraw WARTOSC w ACH_TIERS_MANUAL, nie sufit tutaj.
//
// Dokladajac nowa kategorie do katalogu DOPISZ JA TUTAJ na 2 (LOGISTYKA zostaje na 1/srebro -
// to najlzejsza kategoria w calym katalogu, nawet zlota tam nie ma za co dawac formula).
const ACH_CAT_CEILING = {
    "KRAJE+KONTYNENTY+REGIONY": 2, "LOTY": 2, "MIASTA": 2, "CUDA ŚWIATA": 2,
    "KLIMAT": 2, "PIENIĄDZE I RYZYKO": 2, "WIZY I PASZPORT": 2,
    "CZAS W POWIETRZU": 2, "GEOGRAFIA EKSTREMALNA": 2, "LOTNISKA": 2,
    "LINIE I MASZYNY": 2, "RYTM LOTÓW": 2, "CIEKAWOSTKI": 2,
    "LOGISTYKA": 1
};

// === KRZYWA ROZKLADU: skumulowane progi percentyla w obrebie puli ===
// ACH_TIER_CURVE to oryginalna, pelna krzywa dla 5 poziomow (42/26/19/9/4%) - zostaje jako
// domyslny fallback dla sufitu, ktorego nie ma w ACH_TIER_CURVE_BY_CEILING (dziś: 3 lub 4,
// odkad diament/platyna sa wylacznie reczne - patrz SUFIT wyzej - w praktyce nieuzywane).
const ACH_TIER_CURVE = [0.42, 0.68, 0.87, 0.96, 1.00];

// BLAD ODKRYTY 2026-07-19d: powyzsza krzywa liczy sie do TEJ SAMEJ tablicy niezaleznie od
// sufitu puli, wiec przy sufit=2 (zloto) - dziś prawie kazda pula - zloto po zacieciu
// (Math.min(idx, top)) pochlanialo WSZYSTKO od 0.68 do 1.00 (32% = bylo zlota+platyny+
// diamentu razem), podczas gdy srebro zostawalo przy swoich oryginalnych 26%. Zloto wiec
// STRUKTURALNIE wychodzilo wieksze niz srebro w niemal kazdej kategorii (np.
// KRAJE+KONTYNENTY+REGIONY: zloto 31 > srebro 20) - user to zlapal, pytajac wprost "czy nie
// powinno byc wiecej srebra niz zlota".
// NAPRAWA: krzywa musi byc PRZYPISANA DO SUFITU, nie uniwersalna - dla puli z sufitem 2
// (brąz/srebro/zloto - 3 realne poziomy) potrzeba krzywej zaprojektowanej pod 3 kubelki, nie
// obcietej piatki. Podzial 45/33/22% (wciaz malejaco, podobne tempo spadku co oryginal:
// 33/45=0,73 vs 26/42=0,62) trzyma piramide bez wzgledu na to, ile pozycji ma dana pula.
// Dla sufitu 1 (LOGISTYKA - tylko brąz/srebro) 65/35% z tego samego powodu.
const ACH_TIER_CURVE_BY_CEILING = {
    1: [0.65],
    2: [0.45, 0.78]
};

// === RECZNE POZIOMY - JEDYNE ZRODLO DIAMENTU I PLATYNY W CALYM KATALOGU (2026-07-19c) ===
// Kryterium: realna trudnosc dla podroznika z Polski - konkretne kraje na liscie (wiza,
// bezpieczenstwo, logistyka wysp/lotow), rzadkosc zjawiska, dystans/rekord - a NIE dlugosc
// opisu ani pozycja w jakiejkolwiek tablicy. Brazowe/srebrne/zlote pozycje w tej tablicy to
// odznaki BINARNE (bez prog(), patrz db-schema.md) - dla nich to jedyny sposob na poziom.
// Platynowe/diamentowe pozycje to MIESZANKA binarnych i takich, ktore MAJA prog(), ale same
// nie widza kontekstu potrzebnego do oceny (np. WIZY "8 z 12" - liczba "8" nic nie mowi bez
// wiedzy, ze pula ma tylko 12 krajow na calym swiecie).
const ACH_TIERS_MANUAL = {
    // --- KONTYNENTY (14) ---
    // Komplet kazdego z 6 kontynentow to NAJWYZSZY punkt tej osi - kto ma caly kontynent, ma
    // automatycznie kazdy jego podzbior (dowolny REGIONY, dowolne pojedyncze panstwo). Wszystkie
    // szesc idzie na diament NIEZALEZNIE od surowej liczby krajow (14 Oceanii tak samo jak 54
    // Afryki) - kazdy z nich to 100% WLASNEJ, realnej listy panstw, nie punkt na wspolnej skali
    // z KRAJAMI. "Dwa lady domkniete" (dowolne 2 kontynenty w komplecie) jest jeszcze
    // trudniejsze niz kazdy z osobna osobno, wiec tez diament.
    "ach_twba9d":  "diamond",  // caly kontynent: Europa (45/45)
    "ach_eyju2b":  "diamond",  // caly kontynent: Azja (48/48)
    "ach_6h95v7":  "diamond",  // caly kontynent: Ameryka Polnocna (23/23)
    "ach_o4tssd":  "diamond",  // caly kontynent: Ameryka Poludniowa (12/12)
    "ach_rrw32d":  "diamond",  // caly kontynent: Afryka (54/54)
    "ach_1yfwe83": "diamond",  // caly kontynent: Oceania (14/14)
    "ach_1mqmrjn": "diamond",  // 2 kontynenty w komplecie naraz
    // 75% kontynentu - ostatni powazny etap przed kompletem, ale jeszcze nie 100% wlasnej listy
    "ach_1f7c3c0": "platinum", // Europa 75% (34/45)
    "ach_ebefvm":  "platinum", // Azja 75% (36/48)
    "ach_y3g8dg":  "platinum", // Ameryka Polnocna 75% (18/23)
    "ach_1x4j966": "platinum", // Ameryka Poludniowa 75% (9/12)
    "ach_1d2ww50": "platinum", // Afryka 75% (41/54)
    "ach_kmgvqs":  "platinum", // Oceania 75% (11/14)
    // Spelnia sie NAJLATWIEJSZYM kontynentem (zwykle Oceania/Ameryka Poludniowa - najmniej
    // panstw) - wciaz komplet realnego kontynentu, ale bez wyboru KTOREGO, wiec o oczko nizej
    // niz diamentowa szostka powyzej.
    "ach_48b18s":  "platinum", // dowolny 1 kontynent w komplecie (najlatwiejsza droga)

    // --- KRAJE (6) ---
    // Czysty licznik ctx.score (1-195) - jedyne miejsce w katalogu, gdzie diament/platyna
    // naprawde znaczy "prawie wszystkie kraje swiata": proporcje licza sie wprost z 195.
    // 90%+ = diament (elita globtroterow), 69-82% = platyna (bardzo duzo, ale jeszcze nie
    // "koniec gry").
    "ach_qxdsra":  "diamond",  // 195/195 (100%) - koniec gry
    "ach_18cz07t": "diamond",  // 185 (94,9%)
    "ach_37yz14":  "diamond",  // 175 (89,7%)
    "ach_v26qgs":  "platinum", // 160 (82,1%)
    "ach_1oyar97": "platinum", // 150 (76,9%)
    "ach_1frb07o": "platinum", // 135 (69,2%)

    // --- REGIONY (17) ---
    // "Komplet regionu" NIE jest automatycznie diamentem tylko dlatego, ze ma dluga liste -
    // liczy sie REALNA trudnosc konkretnych krajow w niej (wiza, bezpieczenstwo, logistyka
    // wysp), nie sama liczba pozycji. Progi CZASTKOWE (min. N z M) tej samej listy NIE dostaja
    // wpisu tutaj - zawsze latwiejsze niz komplet (mozna pominac najtrudniejszy kraj), wiec
    // zostaja na percentylu ze zwyklym sufitem zlota.
    //
    // DIAMENT - komplet blokuje sie o JEDEN (lub dwa) kraj-hermetyczna twierdze, bez ktorego
    // reszta listy jest zwykla turystyka.
    "ach_q6yes4":  "diamond",  // Azja Wschodnia w komplecie (6) - blokuje Korea Polnocna
    "ach_cfswen":  "diamond",  // byly ZSRR w komplecie (15) - blokuje Turkmenistan
    "ach_awwe7x":  "diamond",  // Azja Centralna w komplecie (5) - te same "-stany", ten sam bloker
    "ach_675hrk":  "diamond",  // Rog Afryki w komplecie (4) - Somalia + Erytrea naraz
    "ach_1r40650": "diamond",  // Bliski Wschod w komplecie (13) - Iran, Irak, Syria, Jemen
    "ach_116ojjk": "diamond",  // Mikronezja w komplecie (5) - Nauru/Kiribati, ekstremalna logistyka lotow
    "ach_mo1dt0":  "diamond",  // wszystkie 11 panstw wyspiarskich Pacyfiku - nadzbior Mikronezji/Melanezji/Polinezji
    //
    // PLATYNA - komplet realnie trudny (rozrzucone wyspy wlasnymi lotami, kraje w kryzysie/
    // niestabilne, obowiazkowe drogie procedury), ale bez pojedynczego "twierdzo-bloku".
    "ach_1vneu5u": "platinum", // Karaiby w komplecie (13) - rozrzucone wyspy + Haiti
    "ach_wd43de":  "platinum", // Baltyk w komplecie (9) - wymaga Rosji
    "ach_1j2lfbk": "platinum", // Afryka Zachodnia w komplecie (14) - Mali/Burkina Faso/Niger (rejony niestabilne)
    "ach_16kwizz": "platinum", // Melanezja w komplecie (4) - Papua Nowa Gwinea i Wyspy Salomona logistycznie trudne
    "ach_19slz4v": "platinum", // Polinezja w komplecie (3) - Tuvalu, jeden z najtrudniej dostepnych krajow swiata
    "ach_1tpsg5c": "platinum", // Azja Poludniowo-Wschodnia w komplecie (11) - Timor Wschodni + niestabilna Mjanma
    "ach_115xfhv": "platinum", // Ameryka Poludniowa w komplecie (12) - Wenezuela, Gujana, Surinam
    "ach_1j8d5u3": "platinum", // subkontynent indyjski w komplecie (6) - Bhutan (obowiazkowa oplata/przewodnik) + Pakistan
    "ach_n35bwt":  "platinum", // wyspy Oceanu Indyjskiego w komplecie (5) - Komory, bardzo ograniczone loty
    "ach_1jutnd":  "platinum", // Unia Europejska w komplecie (27) - podzbior Europy (diament wyzej), ale wciaz 27 konkretnych krajow

    // --- CUDA SWIATA (24: 21 imiennych + 3 doliczniki) ---
    // 21 imiennych: stopniowane dostepnoscia z Europy.
    "ach_1yegset": "bronze",   // Wieza Eiffla
    "ach_1y4ttbx": "bronze",   // Koloseum
    "ach_1rizkaz": "bronze",   // Neuschwanstein
    "ach_mcvuxi":  "bronze",   // Stonehenge
    "ach_jvuxzg":  "bronze",   // Alhambra
    "ach_bsnfe":   "bronze",   // Akropol
    "ach_17yz4qa": "silver",   // Hagia Sophia
    "ach_wgfnv5":  "silver",   // Kreml
    "ach_du443s":  "silver",   // Statua Wolnosci
    "ach_1cyvagg": "silver",   // piramidy w Gizie
    "ach_1dvmf26": "silver",   // Wielki Mur
    "ach_wiyndm":  "gold",     // Petra
    "ach_92lhdc":  "gold",     // Tadz Mahal
    "ach_1o77ukw": "gold",     // Chichen Itza
    "ach_107k62u": "gold",     // Kiyomizu-dera
    "ach_n306i6":  "gold",     // Opera w Sydney
    "ach_1ph6fbe": "gold",     // Angkor Wat
    "ach_1l3qbxy": "platinum", // Machu Picchu
    "ach_1s9ms0v": "platinum", // Chrystus Zbawiciel
    "ach_glxhgi":  "diamond",  // moai, Wyspa Wielkanocna (skrajnie odlegla)
    "ach_snnwp9":  "diamond",  // Timbuktu (odlegle + wysokie ryzyko)
    // doliczniki: komplet listy > "prawie komplet" > oficjalna siodemka New7Wonders
    "ach_y3assh":  "diamond",  // komplet wszystkich 21 cudow swiata (100% listy)
    "ach_187l52n": "platinum", // 18 z 21 cudow - ostatni etap przed kompletem
    "ach_gvgrsp":  "platinum", // oficjalna siodemka New7Wonders w komplecie (7 krajow na 6 kontynentach)

    // --- GEOGRAFIA EKSTREMALNA (11) ---
    "ach_1s1k2mn": "bronze",   // wschodnia i zachodnia dlugosc
    "ach_cavxk5":  "silver",   // polkula poludniowa
    "ach_1qnzukv": "silver",   // miedzy zwrotnikami
    "ach_uxyx4l":  "silver",   // kolo podbiegunowe
    "ach_j8k7pu":  "gold",     // 5 st. od rownika
    "ach_18njd86": "gold",     // gleboko na poludniu
    "ach_1k9qyhp": "gold",     // kolo podbiegunowe + zwrotniki
    "ach_pj284i":  "platinum", // arktyka + gleboki poludnik
    "ach_177z0yd": "platinum", // mroz + rownik + poludnie
    "ach_ruwhcy":  "platinum", // 17 000 km od Warszawy (Nowa Zelandia - praktyczny rekord bazy)
    "ach_y86xm0":  "diamond",  // wszystkie cztery cwiartki globu naraz - realnie bardzo rzadkie u kogokolwiek

    // --- LOTY / CZAS W POWIETRZU / LOTNISKA (16) ---
    // LOTY dostaje diament na dwoch najwyzszych progach obu swoich glownych osi (km i liczba
    // lotow) - to realnie dekady regularnego, czestego latania. CZAS W POWIETRZU i LOTNISKA
    // licza Z TYCH SAMYCH lotow (kolumna Duration / wspolrzedne lotnisk), wiec zeby nie liczyc
    // tego samego nalotu jako diament dwa razy, ich wlasny sufit zostaje na platynie - i tak
    // realnie rzadkie (1000 h w powietrzu to 41+ dni bez przerwy w locie; 18 h jednym lotem to
    // dosl. najdluzsze regularne rejsy swiata; 18 000 km miedzy lotniskami to praktycznie
    // przeciwlegle punkty globu).
    "ach_13s9hwc": "bronze",   // lot ponizej 300 km
    "ach_148s2q6": "silver",   // dwa lotniska < 50 km
    "ach_om4ewa":  "silver",   // lotnisko na polkuli poludniowej
    "ach_11l17oi": "silver",   // lotnisko na zachod od 30 st. W
    "ach_1qllxhd": "gold",     // A>B i B>A tego samego dnia
    "ach_3ls8iz":  "gold",     // lot 31.12 lub 1.01
    "ach_yah1ss":  "gold",     // lot 24 lub 25.12
    "ach_1474oy3": "gold",     // dwa lotniska < 20 km
    "ach_ngl64w":  "gold",     // lotnisko ponizej 30 st. S
    "ach_vyz7vv":  "platinum", // 750 000 km sumarycznie
    "ach_19vb5go": "platinum", // 500 000 km
    "ach_1gdb31m": "platinum", // 300 000 km
    "ach_1c7z1u8": "platinum", // 250 000 km (cwierc miliona)
    "ach_7bkbdf":  "platinum", // 384 400 km (dystans do Ksiezyca)
    "ach_1ozjd4k": "platinum", // 200 375 km (5x obwod Ziemi)
    "ach_amszd6":  "platinum", // 1500 zarejestrowanych lotow
    "ach_1i17ggy": "platinum", // 300 roznych lotnisk
    "ach_uizgse":  "platinum", // 200 unikalnych tras
    "ach_c96f0z":  "platinum", // 1000 godzin w powietrzu
    "ach_gv6jmq":  "platinum", // pojedynczy lot 18 godzin (najdluzszy realny rejs swiata)
    "ach_1ulknrz": "platinum", // dwa lotniska 18 000 km od siebie (praktycznie antypody)
    "ach_8s3azg":  "diamond",  // 1 000 000 km sumarycznie
    "ach_nyzeb4":  "diamond",  // 2000 zarejestrowanych lotow

    // --- KLIMAT (15): progi ODWROTNE, wiec im nizsza wartosc, tym trudniej ---
    "ach_b3pl99":  "bronze",   // najzimniejszy miesiac ponizej zera
    "ach_17gcdz0": "silver",   // max -10 st.
    "ach_zgf4v":   "silver",   // mala roznica miesiecy
    "ach_hycjsd":  "silver",   // opad max 100 mm
    "ach_17gd0yj": "gold",     // zmarzlina
    "ach_1n8bxvn": "gold",     // srednia roczna max 3 st.
    "ach_fyqfcl":  "gold",     // amplituda max 3 st.
    "ach_ufdnd3":  "gold",     // opad max 50 mm
    "ach_17gdny2": "platinum", // tam rzesy marzna (max -30 st.)
    "ach_1n8bvnk": "platinum", // srednia roczna ponizej zera
    "ach_fyqelw":  "platinum", // amplituda max 2 st.
    "ach_udtgin":  "platinum", // opad max 25 mm
    "ach_av0446":  "platinum", // najmokrzejszy miesiac >= 2000 mm
    "ach_1so6zkp": "diamond",  // srednia roczna max -5 st. - jedne z najzimniejszych miejsc na Ziemi
    "ach_pjeec7":  "diamond",  // roczny opad >= 3000 mm - jedne z najmokrzejszych miejsc na Ziemi

    // --- CIEKAWOSTKI (16) ---
    "ach_1jrbrh9": "bronze",   // populacja > 100 mln
    "ach_gs5e6":   "bronze",   // min. 3 jezyki urzedowe
    "ach_1r4yci8": "bronze",   // gestosc > 500 os/km2
    "ach_jbel25":  "silver",   // populacja < 100 tys.
    "ach_1ptcjp9": "silver",   // powierzchnia > 5 mln km2
    "ach_s935n5":  "silver",   // powierzchnia < 1000 km2
    "ach_nzktsc":  "silver",   // dwie stolice
    "ach_o0fmfm":  "silver",   // gestosc > 1000 os/km2
    "ach_1d80lge": "silver",   // gestosc < 5 os/km2
    "ach_17fsue9": "gold",     // populacja > 500 mln
    "ach_1xpb39k": "gold",     // populacja > 1 mld
    "ach_rv1m0l":  "gold",     // powierzchnia > 10 mln km2
    "ach_1d0t0nz": "gold",     // powierzchnia < 100 km2
    "ach_5pwbzz":  "gold",     // trzy stolice (RPA)
    "ach_ub8ynm":  "gold",     // gestosc < 2 os/km2
    // populacja < 10 tys. w praktyce = Watykan (spacer po Rzymie) - to nie platyna, poprawione
    // 2026-07-19c (poprzednio zaklejone przez sufit kategorii, wiec bez efektu; teraz reczny
    // wpis jest ostateczny, wiec MUSI byc poprawny sam z siebie).
    "ach_9l2sk3":  "gold",     // populacja < 10 tys.

    // --- LOGISTYKA (3) ---
    "ach_1ezbgrk": "bronze",   // napiwek obowiazkowy
    "ach_do6miq":  "silver",   // brak zwyczaju napiwkow
    // oba naraz to zwykle zestawienie dwoch pospolitych faktow (np. USA + Japonia) - nie zloto,
    // poprawione 2026-07-19c z tego samego powodu co populacja < 10 tys. wyzej.
    "ach_sx811j":  "silver",   // oba naraz (kraj z obowiazkowym napiwkiem + kraj bez)

    // --- WIZY I PASZPORT (3) ---
    // visaRequiredCount>=8 (patrz komentarz przy WIZY I PASZPORT w achievements-catalog.js) to
    // udokumentowana NAJTRUDNIEJSZA pozycja w calym katalogu - wymaga 8 z zaledwie 12 krajow na
    // Ziemi, ktore w ogole wymagaja wizy dla paszportu PL (kilka to panstwa-pustelnie/strefy
    // konfliktu: KP, TM...). visaFreeCount>=150 to NIEMAL KOMPLET wlasnej, ~150-krajowej puli
    // (bez mozliwosci pominiecia trudniejszych pozycji) - realnie porownywalne z "195 dowolnych
    // krajow" w KRAJACH, wiec tez diament. 100 z tej samej puli to duzo, ale nie prawie-komplet.
    "ach_1ybkrs7": "diamond",  // 8 z 12 krajow wymagajacych wizy dla PL
    "ach_d35o0z":  "diamond",  // 150 krajow bez wizy - niemal caly osiagalny zbior
    "ach_qsfci0":  "platinum", // 100 krajow bez wizy

    // --- PIENIADZE I RYZYKO (6) ---
    "ach_3mtp9e":  "silver",   // kraj $ i kraj $$$$
    "ach_16om6ob": "silver",   // podwyzszone ryzyko
    "ach_1oh62wy": "gold",     // bezpieczny + podwyzszone ryzyko
    "ach_1gq5blr": "platinum", // 75 najbezpieczniejszych krajow
    "ach_11g50d8": "platinum", // 100 najbezpieczniejszych krajow
    "ach_1hc7sgj": "diamond",  // maksymalny poziom ryzyka - dosl. strefy "Death Wish" wg bazy

    // --- MIASTA (16) ---
    "ach_1x1d6rr": "bronze",   // miasto > 1 mln
    "ach_n8i2x8":  "bronze",   // miasto niebedace stolica
    "ach_1x3kd57": "silver",   // miasto > 5 mln
    "ach_smoj7h":  "silver",   // miasto < 10 tys.
    "ach_er8lch":  "silver",   // miasta na 3 kontynentach
    "ach_knqc82":  "silver",   // 10 miast w jednym kraju
    "ach_9geqx3":  "gold",     // miasto > 10 mln
    "ach_oxk0w6":  "gold",     // 25 miast w jednym kraju
    "ach_idjeq7":  "platinum", // miasta na 5 kontynentach
    "ach_1pu0zse": "platinum", // 500 odwiedzonych miast
    "ach_43p7kb":  "platinum", // 750 odwiedzonych miast
    "ach_1wesniq": "platinum", // 1000 odwiedzonych miast
    "ach_1p0gniv": "platinum", // 1500 odwiedzonych miast
    "ach_1t5soq9": "platinum", // 2000 odwiedzonych miast
    "ach_jb8htc":  "diamond",  // miasta na wszystkich 6 kontynentach
    "ach_1pwspxs": "diamond"   // 3000 odwiedzonych miast
};
