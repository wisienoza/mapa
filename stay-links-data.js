// ====================================================================
// SZUKANIE NOCLEGU - konfiguracja przycisku "🏨 NOCLEGI" w panelu MIASTA
// (window.showCityIntel -> window.showStaySearchModal w app.js).
// Jeden popup, CZTERY serwisy otwierane naraz: Booking, Agoda, Trivago, Airbnb.
// Zbudowane 2026-07-28 na wzór popupu LOTÓW (FLIGHT_SEARCH w airport-links-data.js).
// ====================================================================
// DLACZEGO TE CZTERY, A NIE INNE: każdy pokrywa INNĄ kategorię, a nie to samo w innym kolorze.
//   Booking    - największa baza hoteli i apartamentów, punkt odniesienia dla reszty
//   Kayak      - PORÓWNYWARKA, nie sprzedawca: zestawia ceny między serwisami, więc jedno okno
//                zastępuje kilka osobnych
//   Hotels.com - Expedia Group, czyli inwentarz i ceny spoza świata Bookinga
//   Airbnb     - mieszkania prywatne, kategoria, której trzy pozostałe prawie nie mają
//
// >>> AGODA I TRIVAGO ZOSTAŁY WYRZUCONE 2026-07-28 - NIE PRÓBUJ ICH WRACAĆ BEZ CZYTANIA TEGO.
// Były tu przez jedną wersję. User sprawdził oba linki w przeglądarce i OBA ZAWIODŁY:
//   * trivago.pl/pl/srl?search=Barcelona,+Spain -> otwiera stronę wyników, ale z PUSTYM polem
//     "Kierunek podróży" i komunikatem "Gdzie chcesz się zatrzymać?". Parametr zignorowany.
//   * agoda.com/pl-pl/search?text=Barcelona,+Spain -> PRZEKIEROWANIE na stronę główną
//     (/pl-pl/?ds=...), pusty cel podróży, własne domyślne daty zamiast podanych.
// PRZYCZYNA: oba przyjmują miejscowość wyłącznie przez swoje WEWNĘTRZNE ID lokalizacji
// (Trivago w formie search=200-42099), a nie tekstem. Zbudowanie słownika takich ID dla 7991
// miast bazy nie wchodzi w grę - i to jest powód wyrzucenia, nie zły format parametru.
// Hotels.com wrócił do gry właśnie dlatego, że Trivago (które miało go pokrywać) wypadło.
//
// >>> CO KTÓRY SERWIS PRZYJMUJE W ADRESIE - RÓŻNICE SĄ REALNE, NIE ZAPOMNIJ O NICH:
//   Booking     daty + goście + pokoje   (POTWIERDZONE - ta sama forma co dawny przycisk BOOKING)
//   Airbnb      daty + goście            (POTWIERDZONE; nie zna pojęcia "pokoje" - wynajmuje się
//                                        cały lokal, więc parametru po prostu nie ma)
//   Kayak       daty + goście            (format ŚCIEŻKOWY /hotels/{miejsce}/{in}/{out}/{N}adults;
//                                        deep-linki Kayaka potwierdziliśmy już przy LOTACH)
//   Hotels.com  daty + goście + pokoje   (destination= tekstem, konwencja Expedia Group)
// STATUS: Booking i Airbnb są pewne. Kayak i Hotels.com mają dużo mocniejsze podstawy niż
// wyrzucona para (Kayak - bo jego deep-linki działają nam przy lotach; Hotels.com - bo
// destination= to standard Expedii), ale nie zostały jeszcze klikniętе. Jeśli któryś ląduje
// na stronie głównej zamiast na wynikach - popraw szablon TUTAJ, logika w app.js jest bez zmian.
window.STAY_SEARCH = {
    // {q}      - "Miasto, Kraj" URL-encoded (Booking, Hotels.com)
    // {qslug}  - "Miasto--Kraj" do ŚCIEŻKI Airbnb (podwójny myślnik dzieli miasto od kraju,
    //            pojedynczy zastępuje spację: "New-York-City--United-States")
    // {qkayak} - "Miasto,Kraj" BEZ SPACJI po przecinku, do ŚCIEŻKI Kayaka
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
            // Kayak trzyma WSZYSTKO w ŚCIEŻCE, nie w parametrach - inaczej niż pozostała trójka.
            // Miejscowość jako "Miasto,Kraj" BEZ SPACJI po przecinku ({qkayak}), goście jako
            // segment "2adults". Ta sama konwencja ścieżkowa co przy jego wyszukiwarce LOTÓW.
            name: "Kayak",
            url: "https://www.kayak.pl/hotels/{qkayak}/{in}/{out}/{adults}adults",
            urlNoDates: "https://www.kayak.pl/hotels/{qkayak}"
        },
        {
            // Hotels.com - konwencja Expedia Group: destination= tekstem, daty jako startDate/endDate.
            name: "Hotels.com",
            url: "https://pl.hotels.com/Hotel-Search?destination={q}&startDate={in}&endDate={out}&adults={adults}&rooms={rooms}",
            urlNoDates: "https://pl.hotels.com/Hotel-Search?destination={q}&adults={adults}&rooms={rooms}"
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
