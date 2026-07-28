// ====================================================================
// SZUKANIE NOCLEGU - konfiguracja przycisku "🏨 NOCLEGI" w panelu MIASTA
// (window.showCityIntel -> window.showStaySearchModal w app.js).
// Jeden popup, CZTERY serwisy otwierane naraz: Booking, Agoda, Trivago, Airbnb.
// Zbudowane 2026-07-28 na wzór popupu LOTÓW (FLIGHT_SEARCH w airport-links-data.js).
// ====================================================================
// DLACZEGO TE CZTERY, A NIE INNE: każdy pokrywa INNĄ kategorię, a nie to samo w innym kolorze.
//   Booking - największa baza hoteli i apartamentów, punkt odniesienia dla reszty
//   Agoda   - ta sama grupa co Booking, ale w Azji ma inny inwentarz i inne ceny
//   Trivago - PORÓWNYWARKA, nie sprzedawca: zestawia ceny między serwisami (w tym Hotels.com
//             i Expedię), więc jedno okno zastępuje kilka osobnych
//   Airbnb  - mieszkania prywatne, czyli kategoria, której trzy pozostałe prawie nie mają
// ODRZUCONE ŚWIADOMIE: Hotels.com - należy do Expedia Group, pokazuje w większości tę samą bazę
// co Booking, a jego unikalną ofertę widać już w wynikach Trivago. Piąte okno bez nowej informacji.
//
// >>> CO KTÓRY SERWIS PRZYJMUJE W ADRESIE - RÓŻNICE SĄ REALNE, NIE ZAPOMNIJ O NICH:
//   Booking  daty + goście + pokoje   (pewne, ta sama forma co dotychczasowy przycisk BOOKING)
//   Airbnb   daty + goście            (pewne; nie ma pojęcia "pokoje" - wynajmuje się cały lokal)
//   Agoda    daty + goście + pokoje   (NIEZWERYFIKOWANE - patrz niżej)
//   Trivago  SAMO MIASTO, bez dat     (NIEZWERYFIKOWANE - patrz niżej)
// Trivago dostaje więc wyłącznie miejscowość i otworzy się z pustym kalendarzem. To NIE jest
// niedoróbka do "poprawienia" zmyślonym parametrem - tak samo jak przy bagażu w popupie lotów,
// wymyślony parametr zostanie cicho zignorowany, a użytkownik uwierzy, że filtruje.
// Popup mówi o tym wprost adnotacją pod polami.
//
// >>> STATUS WERYFIKACJI (2026-07-28): Booking i Airbnb są pewne - ich formaty są powszechnie
// używane i stabilne od lat. Agody i Trivago NIE UDAŁO SIĘ sprawdzić zdalnie: trivago.pl oddaje
// HTTP 403 (antybot), agoda.com oddaje pustą skorupę SPA bez treści. Obie formy poniżej to
// najprostsze warianty o największej szansie zadziałania. Zweryfikuj je jednym kliknięciem
// i popraw tutaj, jeśli któraś ląduje na stronie głównej zamiast na wynikach.
window.STAY_SEARCH = {
    // {q} - miejscowość w formie "Miasto, Kraj" (URL-encoded), {qslug} - "Miasto--Kraj" dla Airbnb,
    // {in} / {out} - daty YYYY-MM-DD, {adults} - liczba gości, {rooms} - liczba pokoi.
    services: [
        {
            name: "Booking",
            url: "https://www.booking.com/searchresults.pl.html?ss={q}&checkin={in}&checkout={out}"
               + "&group_adults={adults}&group_children=0&no_rooms={rooms}&selected_currency=PLN",
            // Bez dat wystarczy samo ss= - Booking otwiera wtedy wyniki z pustym kalendarzem.
            urlNoDates: "https://www.booking.com/searchresults.pl.html?ss={q}"
                      + "&group_adults={adults}&group_children=0&no_rooms={rooms}&selected_currency=PLN"
        },
        {
            name: "Agoda",
            url: "https://www.agoda.com/pl-pl/search?text={q}&checkIn={in}&checkOut={out}&rooms={rooms}&adults={adults}",
            urlNoDates: "https://www.agoda.com/pl-pl/search?text={q}&rooms={rooms}&adults={adults}"
        },
        {
            // Trivago NIE dostaje dat ani gości - patrz ostrzeżenie w nagłówku. Oba warianty
            // są celowo identyczne, żeby nikt nie dopisał tu parametrów "dla symetrii".
            name: "Trivago",
            url: "https://www.trivago.pl/pl/srl?search={q}",
            urlNoDates: "https://www.trivago.pl/pl/srl?search={q}"
        },
        {
            // Airbnb ma miejscowość w ŚCIEŻCE ({qslug}), a nie w parametrze: "Barcelona--Spain".
            // Podwójny myślnik rozdziela miasto od kraju, pojedynczy zastępuje spację.
            name: "Airbnb",
            url: "https://www.airbnb.pl/s/{qslug}/homes?checkin={in}&checkout={out}&adults={adults}",
            urlNoDates: "https://www.airbnb.pl/s/{qslug}/homes?adults={adults}"
        }
    ],
    maxAdults: 8,
    maxRooms: 4
};
