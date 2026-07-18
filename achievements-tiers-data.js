// === POZIOMY TRUDNOSCI ODZNAK (dane, nie logika) ===
// Silnik liczacy poziomy mieszka w app.js; TU sa wylacznie definicje poziomow oraz recznie
// przypisane rangi dla odznak, ktorych z danych policzyc SIE NIE DA.
//
// DWA ZRODLA POZIOMU (patrz db-schema.md, sekcja POZIOMY TRUDNOSCI ODZNAK):
//   1. AUTOMAT (442 z 528) - kwintyl progu prog().need W OBREBIE WLASNEJ KATEGORII.
//      Per kategoria, bo jednostki sa nieporownywalne miedzy nimi: REGIONY licza kraje (2-27),
//      CZAS W POWIETRZU godziny (1-1080), LOTY kilometry (do 1 000 000), KLIMAT milimetry opadu.
//      Globalny prog dalby diamenty wszystkim odznakom kilometrowym i braz calym REGIONOM.
//   2. RECZNIE (86 z 528) - ponizsza tablica. To odznaki binarne (0/1), ktore CELOWO nie maja
//      prog(): 21 imiennych cudow, progi odwrotne ("opad max. 25 mm"), warunki typu "odwiedz kraj
//      na polkuli poludniowej". Nie ma z czego liczyc kwintyla, wiec range nadaje czlowiek.
//
// UWAGA: klucz to ACHIEVEMENTS[].id = "ach_" + hash(cat+desc). Zmiana 'cat' albo 'desc' odznaki
// PRZEBIJA hash i wpis tutaj sie osieroci (odznaka cicho spadnie do poziomu domyslnego).
// To ta sama pulapka co w achievements-data.js - przy zmianie opisu odznaki popraw tez ten plik.

// Kolejnosc MA ZNACZENIE (rosnaco) - app.js indeksuje po niej kwintyle.
//
// KOLORY: paleta rang z Overwatch (wybor uzytkownika). rgb trzymamy jako trojke skladowych,
// bo kazdy kolor jest uzywany z rozna alfa (gradient tla 0.30/0.05, ramka 0.55, glow 0.45).
//
// GLOW tylko na dwoch najwyzszych poziomach - i to nie estetyka, tylko wydajnosc: panel renderuje
// 528 kafelkow, a box-shadow na kazdym potrafi szarpac przy przewijaniu. Platyna + diament to
// 177 pozycji. Jesli kiedys i to bedzie za duzo, zdejmij glow z platyny (zostanie 80).
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
    { key: "bronze",   label: "BRĄZ",    rgb: "150,92,48",   glow: false, bg: [0.05, 0.02],
      mark: '<path d="M3 7 L12 15 L21 7 L21 12 L12 20 L3 12 Z"/>' },
    { key: "silver",   label: "SREBRO",  rgb: "169,178,186", glow: false, bg: [0.25, 0.03],
      mark: '<path d="M3 4 L12 11 L21 4 L21 8 L12 15 L3 8 Z"/>'
          + '<path d="M6 14 L12 18.5 L18 14 L18 17.5 L12 22 L6 17.5 Z"/>' },
    { key: "gold",     label: "ZŁOTO",   rgb: "245,199,45",  glow: false, bg: [0.40, 0.06],
      mark: '<path d="M5 7 L12 14 L19 7 L19 12 L12 19 L5 12 Z"/>'
          + '<path d="M1.5 4 L4 4 L4 13 L1.5 10.5 Z"/><path d="M22.5 4 L20 4 L20 13 L22.5 10.5 Z"/>' },
    // bg bylo 0.99 - tlo wychodzilo wtedy prawie biale (205,216,226) i ZJADALO TEKST: bialy opis
    // miał kontrast 1.45, bursztynowa nazwa 1.06 (progi czytelnosci zaczynaja sie od 4.5).
    // 0.42 zostawia platyne najjasniejszym kafelkiem w panelu, ale napisy wracaja.
    { key: "platinum", label: "PLATYNA", rgb: "207,218,228", glow: true,  bg: [0.42, 0.08],
      mark: '<path d="M12 2.5 L19 5.5 V11 C19 15.5 12 20 12 20 C12 20 5 15.5 5 11 V5.5 Z"/>'
          + '<path d="M2 5 L4.2 5 L4.2 14 L2 11.5 Z"/><path d="M22 5 L19.8 5 L19.8 14 L22 11.5 Z"/>' },
    // markRgb: kolor ZNACZKA, gdy rgb tla nie nadaje sie na znaczek. Diament ma bg 0.99, wiec tlo
    // kafelka jest praktycznie tym samym kolorem co rgb - znaczek rysowany domyslnie mial kontrast
    // 1.01, czyli byl niewidoczny. Jasny fiolet odcina sie od ciemnego tla i zostaje w rodzinie koloru.
    { key: "diamond",  label: "DIAMENT", rgb: "72,34,124", markRgb: "186,150,255", glow: true, bg: [0.99, 0.27],
      mark: '<path d="M12 1.5 L21.5 9 L12 22.5 L2.5 9 Z"/>'
          + '<path d="M12 1.5 L12 22.5 M2.5 9 L21.5 9 M7.2 9 L12 22.5 L16.8 9"'
          + ' stroke="#08080a" stroke-width="1.1" fill="none" opacity="0.55"/>' }
];

// === SUFIT KATEGORII: jak wysoko dana kategoria W OGOLE moze siegnac ===
// Indeks w ACH_TIER_DEFS (0=braz, 1=srebro, 2=zloto, 3=platyna, 4=diament).
// POWOD ISTNIENIA: kwintyl liczony per kategoria zawsze oddaje 20% pozycji na diament - NIEZALEZNIE
// od tego, czy kategoria zawiera cokolwiek trudnego. Bez sufitu LOGISTYKA, gdzie najtrudniejsze
// osiagniecie to "odwiedz kraj z napiwkiem obowiazkowym i kraj bez", produkowala diamenty na rowni
// z LOTAMI. Ranga byla wtedy zawsze WZGLEDNA wobec sasiadow w kategorii i nigdy wobec calosci -
// czyli nie znaczyla nic.
// Sufit tnie TAKZE poziomy z ACH_TIERS_MANUAL (np. reczny diament w PIENIADZE I RYZYKO spada
// do zlota) - inaczej reczna tablica obchodzilaby te regule tylnymi drzwiami.
// Kategoria nieobecna w tej tablicy = brak sufitu (moze siegnac diamentu).
const ACH_CAT_CEILING = {
    // pelna skala - tu diament naprawde cos znaczy (komplety kontynentow, 195 krajow, obwod Ziemi)
    "REGIONY": 4, "KONTYNENTY": 4, "KRAJE": 4, "LOTY": 4, "MIASTA": 4, "CUDA ŚWIATA": 4,
    // do platyny - trudne, ale to pojedyncze osie, nie podboj swiata
    "CZAS W POWIETRZU": 3, "KLIMAT": 3, "GEOGRAFIA EKSTREMALNA": 3,
    // do zlota - zbieractwo i ciekawostki, nie wyczyn
    "LINIE I MASZYNY": 2, "RYTM LOTÓW": 2, "LOTNISKA": 2, "CIEKAWOSTKI": 2,
    "WIZY I PASZPORT": 2, "PIENIĄDZE I RYZYKO": 2,
    // do srebra - najlzejsza kategoria w calym katalogu
    "LOGISTYKA": 1
};

// === KRZYWA ROZKLADU: skumulowane progi percentyla w obrebie kategorii ===
// Rowne kwintyle (0.2/0.4/0.6/0.8/1.0) dawaly 80 diamentow i 97 platyn, czyli 34% CALEGO katalogu
// stalo w dwoch najwyzszych poziomach. Piramida schodzi z tym do 49 pozycji (9%).
// Czytanie: pierwszy prog, ktory przekracza percentyl odznaki, wyznacza poziom.
// Zmieniajac te liczby patrz na rozklad koncowy, nie na "ladnosc" progow.
const ACH_TIER_CURVE = [0.42, 0.68, 0.87, 0.96, 1.00];

// Recznie przypisane poziomy dla 86 odznak bez prog().
// Kryterium: realna trudnosc dla podroznika z Polski (dostepnosc, dystans, ryzyko, rzadkosc
// zjawiska), a NIE dlugosc opisu. Grupy zostawione w kolejnosci kategorii dla czytelnosci.
const ACH_TIERS_MANUAL = {
    // --- CUDA SWIATA (21 imiennych): stopniowane dostepnoscia z Europy ---
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

    // --- GEOGRAFIA EKSTREMALNA (10) ---
    "ach_1s1k2mn": "bronze",   // wschodnia i zachodnia dlugosc
    "ach_cavxk5":  "silver",   // polkula poludniowa
    "ach_1qnzukv": "silver",   // miedzy zwrotnikami
    "ach_uxyx4l":  "silver",   // kolo podbiegunowe
    "ach_j8k7pu":  "gold",     // 5 st. od rownika
    "ach_18njd86": "gold",     // gleboko na poludniu
    "ach_1k9qyhp": "gold",     // kolo podbiegunowe + zwrotniki
    "ach_pj284i":  "platinum", // arktyka + gleboki poludnik
    "ach_y86xm0":  "platinum", // wszystkie cztery cwiartki globu
    "ach_177z0yd": "platinum", // mroz + rownik + poludnie

    // --- LOTY / RYTM LOTOW / LOTNISKA (9) ---
    "ach_13s9hwc": "bronze",   // lot ponizej 300 km
    "ach_1qllxhd": "gold",     // A>B i B>A tego samego dnia
    "ach_3ls8iz":  "gold",     // lot 31.12 lub 1.01
    "ach_yah1ss":  "gold",     // lot 24 lub 25.12
    "ach_148s2q6": "silver",   // dwa lotniska < 50 km
    "ach_1474oy3": "gold",     // dwa lotniska < 20 km
    "ach_om4ewa":  "silver",   // lotnisko na polkuli poludniowej
    "ach_ngl64w":  "gold",     // lotnisko ponizej 30 st. S
    "ach_11l17oi": "silver",   // lotnisko na zachod od 30 st. W

    // --- KLIMAT (13): progi ODWROTNE, wiec im nizsza wartosc, tym trudniej ---
    "ach_b3pl99":  "bronze",   // najzimniejszy miesiac ponizej zera
    "ach_17gcdz0": "silver",   // max -10 st.
    "ach_17gd0yj": "gold",     // zmarzlina
    "ach_17gdny2": "platinum", // tam rzesy marzna
    "ach_1n8bxvn": "gold",     // srednia roczna max 3 st.
    "ach_1n8bvnk": "platinum", // srednia roczna ponizej zera
    "ach_1so6zkp": "diamond",  // srednia roczna max -5 st.
    "ach_zgf4v":   "silver",   // mala roznica miesiecy
    "ach_fyqfcl":  "gold",     // amplituda max 3 st.
    "ach_fyqelw":  "platinum", // amplituda max 2 st.
    "ach_hycjsd":  "silver",   // opad max 100 mm
    "ach_ufdnd3":  "gold",     // opad max 50 mm
    "ach_udtgin":  "platinum", // opad max 25 mm

    // --- CIEKAWOSTKI (16) ---
    "ach_1jrbrh9": "bronze",   // populacja > 100 mln
    "ach_17fsue9": "gold",     // populacja > 500 mln
    "ach_1xpb39k": "gold",     // populacja > 1 mld
    "ach_jbel25":  "silver",   // populacja < 100 tys.
    "ach_9l2sk3":  "platinum", // populacja < 10 tys.
    "ach_1ptcjp9": "silver",   // powierzchnia > 5 mln km2
    "ach_rv1m0l":  "gold",     // powierzchnia > 10 mln km2
    "ach_s935n5":  "silver",   // powierzchnia < 1000 km2
    "ach_1d0t0nz": "gold",     // powierzchnia < 100 km2
    "ach_gs5e6":   "bronze",   // min. 3 jezyki urzedowe
    "ach_nzktsc":  "silver",   // dwie stolice
    "ach_5pwbzz":  "gold",     // trzy stolice (RPA)
    "ach_o0fmfm":  "silver",   // gestosc > 1000 os/km2
    "ach_1r4yci8": "bronze",   // gestosc > 500 os/km2
    "ach_1d80lge": "silver",   // gestosc < 5 os/km2
    "ach_ub8ynm":  "gold",     // gestosc < 2 os/km2

    // --- LOGISTYKA (3) ---
    "ach_1ezbgrk": "bronze",   // napiwek obowiazkowy
    "ach_do6miq":  "silver",   // brak zwyczaju napiwkow
    "ach_sx811j":  "gold",     // oba naraz

    // --- PIENIADZE I RYZYKO (4) ---
    "ach_3mtp9e":  "silver",   // kraj $ i kraj $$$$
    "ach_16om6ob": "silver",   // podwyzszone ryzyko
    "ach_1hc7sgj": "diamond",  // maksymalny poziom ryzyka
    "ach_1oh62wy": "gold",     // bezpieczny + podwyzszone ryzyko

    // --- MIASTA (10) ---
    "ach_1x1d6rr": "bronze",   // miasto > 1 mln
    "ach_1x3kd57": "silver",   // miasto > 5 mln
    "ach_9geqx3":  "gold",     // miasto > 10 mln
    "ach_smoj7h":  "silver",   // miasto < 10 tys.
    "ach_er8lch":  "silver",   // miasta na 3 kontynentach
    "ach_idjeq7":  "platinum", // miasta na 5 kontynentach
    "ach_jb8htc":  "diamond",  // miasta na wszystkich 6 kontynentach
    "ach_knqc82":  "silver",   // 10 miast w jednym kraju
    "ach_oxk0w6":  "gold",     // 25 miast w jednym kraju
    "ach_n8i2x8":  "bronze"    // miasto niebedace stolica
};
