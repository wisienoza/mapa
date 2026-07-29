// ====================================================================
// WYNAJEM SAMOCHODU - konfiguracja przyciskow 'AUTO' w panelu LOTNISKA i MIASTA.
// WYGENEROWANE 2026-07-28 21:47 skryptem Build-CarData.ps1 z SITEMAP
// obu serwisow. Slownikow NIE EDYTUJ RECZNIE - przegeneruj.
// ====================================================================
//   Rentalcars   - 'Booking wynajmu' (ta sama spolka matka), STEROWANY WSPoLRZEDNYMI
//   DiscoverCars - broker, ceny od razu w PLN, trafia idealnie w miejsce odbioru
//   Kayak        - PORoWNYWARKA, nie sprzedawca
//
// >>> RENTALCARS: SCIEZKI Z JEGO SITEMAPY NIE DZIALAJA. NIE PROBUJ ICH ZNOWU.
// Sitemapa PL wymienia 6665 adresow /pl/airport/{cc}/{iata}/ i 19400 /pl/city/{cc}/{slug}/.
// User sprawdzil w PRZEGLADARCE - oba daja 'Not Found':
//   www.rentalcars.com/pl/airport/pl/waw/   -> Not Found
//   www.rentalcars.com/pl/city/pl/warsaw/   -> Not Found
// Sitemapa jest wiec NIEAKTUALNA, a 404 z curla nie bylo zaslepka antybotowa tylko uczciwa
// odpowiedzia. WNIOSEK: obecnosc adresu w sitemapie NIE JEST dowodem, ze adres dziala.
// DZIALA NATOMIAST /search-results ze WSPoLRZEDNYMI - adres skopiowany przez usera z ich
// wlasnej wyszukiwarki. To jest lepsze niz slugi z dwoch powodow: dziala dla KAZDEGO z 7991
// miast i kazdego lotniska (wspolrzedne mamy zawsze, slugow nie), i nie wymaga slownika
// pokrycia. Dlatego CAR_RC_* sa puste i maja takie zostac.
// DATY ida CZLONAMI (puDay/puMonth/puYear/puHour/puMinute i doDay/...), MIESIAC OD 1.
// driversAge DZIALA - to jedyny z trojki, ktory przyjmuje wiek kierowcy z adresu.
//
// >>> DISCOVERCARS IGNORUJE DATY W ADRESIE - dlatego ich tu nie ma.
// Probowalismy ?pickup-date=&pickup-time=&dropoff-date=&dropoff-time=&driver-age=.
// Strona otwiera sie poprawnie i miejsce odbioru jest trafione co do lotniska, ale w formularzu
// siedza WARTOSCI DOMYSLNE serwisu (user widzial 'Thu, Jul 30' i 11:00 przy adresie z 27.08
// i 10:00). Doklejanie parametrow, ktore nic nie robia, tylko udaje, ze cos ustawiamy.
// Ich realna wyszukiwarka siedzi pod /search/, a to jest ZABRONIONE w ich robots.txt.
// ODRZUCONE: Turo ('Airbnb samochodow'). Osobna kategoria, ale dziala w kilku krajach, wiec
// w wiekszosci miast bylby to przycisk prowadzacy donikad. Patrz historia Hotels.com.
//
// >>> UWAGA NA KAYAKA - PRZECINEK PODSTAWIA INNE MIASTO, CICHO.
// /cars/Barcelona,Spain/... zwraca 200 z tytulem 'Port-of-Spain' - czyli ceny wynajmu
// na Trynidadzie zamiast w Hiszpanii. To NIE jest blad widoczny dla usera: strona sie otwiera
// i wyglada normalnie. Przy hotelach przecinek dawal pusty formularz, wiec bylo widac, ze cos
// nie gra - tutaj nie widac NIC. Uzywaj wylacznie formy z ID ({kayakSlug}-c{kayakId}) albo
// kodu IATA. Sprawdzone 2026-07-28.
//
// >>> RENTALCARS ODPOWIADA BOTOM ZASLEPKA 404 (9 bajtow) - NAWET NA WLASNE LINKI ZE SWOJEJ
// STRONY GLoWNEJ. Nie da sie go zweryfikowac z linii polecen, a te adresy ISTNIEJA - sa
// w jego wlasnej sitemapie. Nie kasuj wpisow dlatego, ze curl zwrocil 404.
//
// PODSTAWIENIA: {cc} kod kraju MALYMI, {iata} kod lotniska MALYMI (Rentalcars) lub WIELKIMI
// (Kayak), {citySlug} slug miasta, {dcPath} gotowa sciezka DiscoverCars, {kayakSlug}-c{kayakId}
// z KAYAK_CITY_ID, {in}/{out} daty YYYY-MM-DD, {inT}/{outT} godziny HH:mm, {age} wiek kierowcy.
window.CAR_SEARCH = {
    services: [
        { name: "Rentalcars",
          airport: "https://www.rentalcars.com/search-results?intent=direct&location=&dropLocation=&locationName={locName}&dropLocationName={locName}&coordinates={lat}%2C{lon}&dropCoordinates={lat}%2C{lon}&driversAge={age}&puDay={inD}&puMonth={inM}&puYear={inY}&puHour={inH}&puMinute={inMin}&doDay={outD}&doMonth={outM}&doYear={outY}&doHour={outH}&doMinute={outMin}&ftsType=C&dropFtsType=C&filterCriteria_sortBy=PRICE&filterCriteria_sortAscending=true",
          city:    "https://www.rentalcars.com/search-results?intent=direct&location=&dropLocation=&locationName={locName}&dropLocationName={locName}&coordinates={lat}%2C{lon}&dropCoordinates={lat}%2C{lon}&driversAge={age}&puDay={inD}&puMonth={inM}&puYear={inY}&puHour={inH}&puMinute={inMin}&doDay={outD}&doMonth={outM}&doYear={outY}&doHour={outH}&doMinute={outMin}&ftsType=C&dropFtsType=C&filterCriteria_sortBy=PRICE&filterCriteria_sortAscending=true" },
        { name: "Kayak",
          airport: "https://www.kayak.pl/cars/{IATA}/{in}/{out}?sort=price_a",
          city:    "https://www.kayak.pl/cars/{kayakSlug}-c{kayakId}/{in}/{out}?sort=price_a" }
    ],
    // WIEK KIEROWCY NA SZTYWNO, BEZ POLA W POPUPIE (decyzja usera 2026-07-28).
    // Historia: byla lista progow 18/21/25/30/60/70, user slusznie zapytal, co ma wybrac majac
    // 45 lat - nic nie pasowalo. Potem pole liczbowe. Ostatecznie wyleciaĹ‚o w calosci, bo
    // POWYZEJ 25 LAT CENA SIE NIE ZMIENIA az do progu seniorskiego, wiec pole nic nie dawalo.
    // DLACZEGO 30, A NIE 25: przy dokladnie 25 czesc wypozyczalni nadal nalicza doplate
    // 'mlody kierowca' (jedni licza 'ponizej 25', inni '25 i mniej'). 30 daje czysta cene.
    // Zmiana wartosci = TA JEDNA LICZBA, nic wiecej.
    driverAge: 30
};
// Biala lista lotnisk Rentalcars (klucz: kod IATA).
// CAR_RC_* (Rentalcars) sa PUSTE - serwis wyrzucony, patrz notka wyzej. Zostaja jako deklaracje,
// zeby _carSearchUrls nie musialo sie zastanawiac, czy globalna istnieje.
window.CAR_RC_AIRPORT = [];
// >>> DISCOVERCARS WYRZUCONY 2026-07-28 (decyzja usera). NIE PRZYWRACAJ BEZ CZYTANIA TEGO.
// Trafial w miejsce odbioru bezblednie - rozrozniaĹ‚ nawet Modlin (WMI) od Okecia (WAW) -
// ale NIE PRZYJMOWAL DAT. Probowalismy ?pickup-date=&pickup-time=&dropoff-date=&dropoff-time=
// &driver-age=; w formularzu i tak siedzialy JEGO wartosci domyslne (user widzial 30 lipca
// przy adresie na 27 sierpnia). Bez dat to nie wyszukiwarka, tylko strona docelowa.
// Jego realna wyszukiwarka siedzi pod /search/, co jest ZABRONIONE w jego robots.txt, wiec
// nie ma tez legalnej drogi obejscia. Slowniki (1531 lotnisk, 1741 miast) skasowane.
window.CAR_DC_AIRPORT = {}; window.CAR_DC_CITY = {}; window.CAR_DC_COUNTRY = {};
