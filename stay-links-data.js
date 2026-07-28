// ====================================================================
// SZUKANIE NOCLEGU - konfiguracja przycisku "🏨 NOCLEGI" w panelu MIASTA
// (window.showCityIntel -> window.showStaySearchModal w app.js).
// Jeden popup, TRZY serwisy otwierane naraz: Booking, Kayak, Airbnb.
// Zbudowane 2026-07-28 na wzór popupu LOTÓW (FLIGHT_SEARCH w airport-links-data.js).
// ====================================================================
// DLACZEGO TE TRZY, A NIE INNE: każdy pokrywa INNĄ kategorię, a nie to samo w innym kolorze.
//   Booking    - największa baza hoteli i apartamentów, punkt odniesienia dla reszty
//   Kayak      - PORÓWNYWARKA, nie sprzedawca: zestawia ceny między serwisami, więc jedno okno
//                zastępuje kilka osobnych
//   Airbnb     - mieszkania prywatne, kategoria, której dwa pozostałe prawie nie mają
//
// >>> HOTELS.COM WYRZUCONY 2026-07-28 (decyzja usera) - NIE PRZYWRACAJ GO ODRUCHOWO.
// Nie dlatego, że nie działał - działał, a jego sortowanie po cenie było wręcz jedynym, które
// dało się potwierdzić z linii poleceń. Powód jest inny: DUBLOWAŁ KAYAKA. W kodzie strony
// wyników Kayaka figurują `hotels.com`, `agoda`, `booking.com` i `priceline` jako dostawcy,
// więc porównywarka i tak zestawia oferty Expedii - osobne okno na to samo było czwartą kartą
// bez nowej informacji. Do składu wszedł zresztą tylko awaryjnie, żeby zatkać dziurę po
// wyrzuconym Trivago, którego jako sprzedawca i tak nie zastępował.
// Gdyby kiedyś wracał, szablon brzmiał:
//   https://pl.hotels.com/Hotel-Search?destination={q}&startDate={in}&endDate={out}
//     &adults={adults}&rooms={rooms}&sort=PRICE_LOW_TO_HIGH
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
// SPRAWDZONE PONOWNIE 2026-07-28 przy okazji pytania "a może zebrać ID Trivago i Agody":
//   * TRIVAGO - dalej NIE. Poprawny slug (/pl/odr/hotele-helsinki-finlandia) i całkowicie zmyślony
//     (/pl/odr/hotele-zzzznotacity) zwracają TO SAMO: kod 200, ~325 kB i ZERO wystąpień nazwy
//     miasta w kodzie. To goła skorupa JS, więc nie da się ani zrobić deep-linku, ani nawet
//     SPRAWDZIĆ, czy wpis w słowniku byłby trafny. Zbieralibyśmy 8 tys. pozycji bez weryfikacji.
//     Sitemapa pod standardowym adresem też nie istnieje.
//   * AGODA - technicznie DAŁOBY SIĘ, ale odrzucone merytorycznie. Istnieje forma ze slugiem,
//     inna niż odrzucone kiedyś /search?text=: agoda.com/pl-pl/city/{slug}-{ISO2}.html zwraca 200
//     dla prawdziwych miast (jyvaskyla-fi, ponta-delgada-pt, new-york-us -> w treści "Nowy Jork")
//     i TWARDE 404 dla zmyślonego slugu, więc crawl budujący białą listę byłby weryfikowalny.
//     Nie weszła, bo jest SPRZEDAWCĄ jak Booking, a nie nową kategorią - i Kayak i tak zestawia
//     jej oferty. Niepotwierdzone zostało też, czy stosuje checkIn/los/adults/sort (strona jest
//     renderowana JS-em). Jeśli kiedyś wróci temat: przewagą Agody jest wyłącznie AZJA.
//
// >>> CO KTÓRY SERWIS PRZYJMUJE W ADRESIE - RÓŻNICE SĄ REALNE, NIE ZAPOMNIJ O NICH:
//   Booking     daty + goście + pokoje   (POTWIERDZONE - ta sama forma co dawny przycisk BOOKING)
//   Airbnb      daty + goście            (POTWIERDZONE; nie zna pojęcia "pokoje" - wynajmuje się
//                                        cały lokal, więc parametru po prostu nie ma)
//   Kayak       daty + goście            (format ŚCIEŻKOWY /hotels/{miejsce}/{in}/{out}/{N}adults;
//                                        POTWIERDZONE 2026-07-28 - ale WYŁĄCZNIE z kompletem dat,
//                                        patrz needsDates niżej)
// STATUS: wszystkie trzy są pewne.
window.STAY_SEARCH = {
    // {q}      - "Miasto, Kraj" URL-encoded (dziś już tylko Booking)
    // {qslug}  - "Miasto--Kraj" do ŚCIEŻKI Airbnb (podwójny myślnik dzieli miasto od kraju,
    //            pojedynczy zastępuje spację: "New-York-City--United-States")
    // {qkayak} - "Miasto Kraj" przez SPACJĘ (bez przecinka!), do ŚCIEŻKI Kayaka - powód niżej
    // {in} / {out} - daty YYYY-MM-DD, {adults} - liczba gości, {rooms} - liczba pokoi.
    services: [
        {
            // order=price - sortowanie od najtanszego (zyczenie usera 2026-07-28). POTWIERDZONE,
            // ale NIE narzedziem tylko OCZAMI USERA w przegladarce: z linii polecen sie nie da,
            // bo Booking odpowiada botom kodem 202 i pustym searchresults bez zadnego parametru.
            // Ta weryfikacja byla warunkiem wyrzucenia Hotels.com - po ciezciu Booking jest
            // JEDYNYM oknem noclegowym z sortowaniem po cenie (Kayak nie przyjmuje, Airbnb nie ma),
            // wiec gdyby ten parametr kiedys przestal dzialac, sortowanie znika z popupu calkiem.
            name: "Booking",
            url: "https://www.booking.com/searchresults.pl.html?ss={q}&checkin={in}&checkout={out}"
               + "&group_adults={adults}&group_children=0&no_rooms={rooms}&selected_currency=PLN&order=price",
            // Bez dat wystarczy samo ss= - Booking otwiera wtedy wyniki z pustym kalendarzem.
            urlNoDates: "https://www.booking.com/searchresults.pl.html?ss={q}"
                      + "&group_adults={adults}&group_children=0&no_rooms={rooms}&selected_currency=PLN&order=price"
        },
        {
            // Kayak trzyma WSZYSTKO w ŚCIEŻCE, nie w parametrach - inaczej niż pozostała trójka.
            // Miejscowość jako "Miasto,Kraj" BEZ SPACJI po przecinku ({qkayak}), goście jako
            // segment "2adults". Ta sama konwencja ścieżkowa co przy jego wyszukiwarce LOTÓW.
            name: "Kayak",
            url: "https://www.kayak.pl/hotels/{qkayak}/{in}/{out}/{adults}adults",
            // >>> MIEJSCOWOŚĆ ODDZIELAMY OD KRAJU SPACJĄ ("Helsinki Finland"), NIE PRZECINKIEM.
            // To nie kosmetyka - przecinek psuł wyszukiwarkę i to był błąd zgłoszony 2026-07-28
            // ("klikam Helsinki, datę dobiera dobrą, ale nie miasto"). Kayak ma DWA przekierowania
            // pod rząd i przy przecinku pierwsze wygląda na sukces, a dopiero drugie leci na /stays:
            //   Helsinki,Finland -> 302 /hotels/Helsinki,Finland,Helsinki,Finlandia-a7232/.../at-Helsinki
            //                    -> 302 /stays            (forma "-a" = obszar, ginie w drugim hopie)
            //   Helsinki Finland -> 302 /hotels/Helsinki-Finland-c7232/...  -> 200 WYNIKI
            // Forma "-c" (miasto) żyje, forma "-a" umiera. Przecinek trafiał w "-a" dla WIĘKSZOŚCI
            // miast: z 10 sprawdzonych par padło 6 (Helsinki, Zürich, Luang Prabang, Ashgabat,
            // Kyoto, Valencia), przeszły tylko 4 (Barcelona, Chicago, Ponta Delgada, New York City).
            // Ze spacją przeszło 13 z 13 - i to od razu we WŁAŚCIWY kraj: "Valencia Venezuela" daje
            // Carabobo/Wenezuelę, "Cordoba Argentina" daje Córdobę w Argentynie. Sama nazwa miasta
            // (bez kraju) też zawsze się ładuje, ale obie te nazwy prowadzi do HISZPANII - dlatego
            // kraju nie wolno tu wyrzucić, mimo że "naprawiłby" ładowanie.
            // DROBIAZG DO ZAAKCEPTOWANIA: przy części miast Kayak zaczepia wynik o LOTNISKO zamiast
            // o centrum (Chicago -> "-lORD", Ponta Delgada -> "-lPDL"; to stąd "Barcelona-El Prat
            // (BCN)" na zrzucie usera). To wciąż hotele w tym samym mieście, a wyboru nie mamy:
            // trafienie w konkretną encję wymagałoby ID Kayaka (-c12514) dla 7991 miast.
            // ODRZUCONE PRZY OKAZJI: "Helsinki%2C%20Finland" (przecinek + spacja) -> /stays,
            // "Cordoba,AR" (kod ISO) -> /stays. Kod kraju Kayaka w tym miejscu NIE działa.
            //
            // >>> BRAK urlNoDates TO NIE PRZEOCZENIE - KAYAK NIE MA WYSZUKIWANIA BEZ TERMINU.
            // KAŻDA SKRÓCONA ŚCIEŻKA LECI 302 NA /stays (pusty formularz, cel przepadł):
            //   /hotels/{miejsce}                  -> /stays
            //   /hotels/{miejsce}/2adults          -> /stays
            //   /hotels/{miejsce}/anytime/2adults  -> /stays   (i tak samo "flexible")
            // Nie ma więc czego tu wpisać - dlatego Kayak jest przy pustych datach POMIJANY
            // (flaga needsDates, obsługa w _staySearchUrls w app.js), a nie otwierany na pusto.
            // Alternatywa "podstawmy Kayakowi jakieś domyślne daty" została ODRZUCONA: user prosi
            // o brak terminu, więc ciche wstawienie +30/+37 dnia pokazałoby ceny za pobyt,
            // o który nie pytał.
            // >>> SORTOWANIA PO CENIE TU NIE DA SIE WYMUSIC (proba z 2026-07-28, zyczenie usera).
            // Kayak zna token `sort=price_a` i na adresie KANONICZNYM dziala:
            //   /hotels/Malmo-Sweden-c34151/.../2adults?sort=price_a  -> 200, parametr zachowany.
            // Ale my podajemy nazwe, nie ID miasta, wiec KAZDE nasze wejscie idzie przez
            // przekierowanie nazwa -> adres kanoniczny, a ono KASUJE cala query string:
            //   /hotels/Malmo%20Sweden/.../2adults?sort=price_a -> /hotels/Malmo-Sweden-c34151/...;map
            // ROZSTRZYGNIETE 2026-07-28 na adresie, ktory user skopiowal z ich strony po recznym
            // kliknieciu w sortowanie. Jedyna rzecza, ktora cokolwiek zmienia, jest OBECNOSC `-c<ID>`:
            //   /hotels/Malmo-Sweden/.../2adults;map?sort=price_a       -> 302 -> ...-c34151/...;map
            //                                                              (sort ZGUBIONY)
            //   /hotels/Jyvaskyla-Finland-c44565/.../2adults;map?sort=price_a -> 200, sort ZACHOWANY
            // Z ID nie ma przekierowania, wiec nie ma czego gubic. SPRAWDZONE I ODRZUCONE ksztalty:
            // `?sort` przed `;map`, `;map?sort`, `;map;sort`, `;sort;map`, nazwa ze spacja i z
            // myslnikiem, oraz ich wlasny endpoint /stays?...&action=dohotels (zwraca strone
            // formularza, nie wyniki). Zaden nie przenosi sortowania.
            // DROGA WYJSCIA ISTNIEJE, ale to osobna decyzja: Kayak oddaje `-c<ID>` w naglowku
            // Location pierwszego przekierowania, wiec da sie je zebrac jednym tanim zapytaniem
            // na miasto (~2 h w trzech watkach dla 7991 miast, mniej niz przebieg TasteAtlas).
            // Zysk bylby podwojny: sortowanie ORAZ brak przekierowania, czyli koniec ladowania
            // na /stays. Koszt: kolejny slownik ~8 tys. wpisow do utrzymania.
            // Do tego czasu: na Kayaku user przelacza sortowanie jednym klikiem w wynikach.
            needsDates: true
        },
        {
            // SORTOWANIA PO CENIE NIE MA I NIE SZUKAJ PARAMETRU: Airbnb jako jedyny z czwórki
            // w ogóle nie udostępnia sortowania wyników - ani w adresie, ani w interfejsie.
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
