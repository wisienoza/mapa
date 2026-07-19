// === TYPY SAMOLOTOW: KANONICZNE NAZWY I ALIASY KODOW ===
// FR24 nazywa ten sam typ na kilka sposobow, wiec grupowanie po NAZWIE rozbijalo jedna maszyne na
// dwa wpisy. Od 2026-07-19 importer zapisuje kod typu ICAO (pole 7 FLIGHTS_LOG) i _flightStats
// grupuje po NIM, a nazwe do wyswietlenia bierze stad.
//
// Realne duplikaty z importu 2026-07-19 (80 lotow), ktore samo grupowanie po kodzie juz skleja:
//   A321 <- "Airbus A321-200" (6) + "Airbus A321" (5)
//   A21N <- "Airbus A321neo" (9) + "Airbus A321LR" (1)
//   A320 <- "Airbus A320" (3) + "Airbus A320-200" (2)

// Aliasy kodow: LEWY kod jest traktowany jak PRAWY. Tylko dla niespojnosci FR24, czyli sytuacji
// "jeden fizyczny typ, dwa oznaczenia" - NIE do sklejania realnie roznych maszyn.
// NIE wpisuj tu A321 -> A21N ani A320 -> A20N: neo to inny samolot (inne silniki, inny zasieg),
// rozdzielenie ich jest POPRAWNE i ma zostac.
const AIRCRAFT_CODE_ALIAS = {
    // "Embraer 175" (E75S) i "Embraer ERJ-175" (E175) to ta sama maszyna zapisana dwoma
    // oznaczeniami. E75S/E75L to warianty dlugosci skrzydla, ktorych FR24 uzywa niekonsekwentnie.
    "E75S": "E175"
};

// Nazwa pokazywana dla kodu. Gdy kodu tu nie ma, _flightStats bierze PIERWSZA nazwe napotkana
// w logu dla tego kodu - dzieki temu nowy typ z przyszlego importu i tak nie zrobi duplikatu,
// nawet jesli nikt go tu nie dopisze. Ta tablica sluzy wiec ESTETYCE, nie poprawnosci.
const AIRCRAFT_TYPE_NAMES = {
    "B738": "Boeing 737-800",
    "B739": "Boeing 737-900",
    "B38M": "Boeing 737 MAX 8",
    "B77W": "Boeing 777-300ER",
    "A320": "Airbus A320",
    "A20N": "Airbus A320neo",
    "A321": "Airbus A321",
    "A21N": "Airbus A321neo",
    "A332": "Airbus A330-200",
    "A333": "Airbus A330-300",
    "A388": "Airbus A380-800",
    "E170": "Embraer ERJ-170",
    "E175": "Embraer ERJ-175",
    "E190": "Embraer ERJ-190",
    "E195": "Embraer ERJ-195",
    "DH8D": "Bombardier Dash 8-400",
    "AT76": "ATR 72-600"
};
