// ====================================================================
// VISA_LINKS - OFICJALNY RZĄDOWY ADRES, POD KTÓRYM SKŁADA SIĘ WNIOSEK WIZOWY
// Klucz: kod ISO-2. Wartość: pełny URL.
// Czyta to app.js (updateFactbookPanel, wiersz "WIZA") - wartość wiersza staje się linkiem przez
// _extVal, dokładnie jak COST INDEX czy WODA. Brak wpisu = wiersz zostaje zwykłym tekstem.
//
// ZAKRES: 52 z 81 krajów, które dla paszportu PL wymagają czegokolwiek. To NIE jest próbka -
// to wszystko, co dało się POTWIERDZIĆ. Zebrane i sprawdzone 2026-07-27/28. Szczegółowy rozbiór
// (kto odpadł i dlaczego) siedzi w db-schema.md przy tej stałej.
//
// >>> ZASADA NR 1: ZAPISUJEMY ADRES RZĄDOWY, NIE CEL PRZEKIEROWANIA.
// Kilka państw oddało portal na domenę spoza .gov: evisa.gouv.bj -> evisa.bj,
// evisa.mfa.gov.af -> eafghans.com. Trzymamy WERSJĘ RZĄDOWĄ, bo (1) gdy państwo zmieni dostawcę,
// link pójdzie za nim bez naszej ingerencji, (2) użytkownik widzi w statusie przeglądarki domenę
// rządową, a nie ".com", którego nie ma powodu darzyć zaufaniem.
//
// >>> ZASADA NR 2: NIGDY NIE DOPISUJ ADRESU, KTÓREGO NIE WIDZIAŁEŚ DZIAŁAJĄCEGO.
// To jedyny słownik linków w projekcie, w którym pomyłka jest KOSZTOWNA DLA UŻYTKOWNIKA, a nie
// tylko brzydka. Na zapytanie "india evisa" pierwsze wyniki to pośrednicy (ivisa.com,
// evisa-india.org...), którzy każą płacić za formularz dostępny darmo. Zły link tutaj nie prowadzi
// w pustkę - prowadzi do naciągacza wyglądającego wiarygodnie.
// Trzy pułapki, które realnie wystąpiły przy zbieraniu tego zbioru:
//   1. Wikipedia trzyma w przypisach MARTWE adresy rządowe (ukba.homeoffice.gov.uk - urząd
//      zlikwidowany w 2013, cic.gc.ca - zastąpione przez canada.ca). Filtr domenowy ich nie łapie.
//   2. HTTP 200 nie znaczy "portal działa": evisa.ica.gov.pg zwracało DOMYŚLNĄ STRONĘ POWITALNĄ IIS.
//      Żaden audyt po kodzie odpowiedzi tego nie wykryje - trzeba zobaczyć stronę.
//   3. DNS nie znaczy "host istnieje": rejestry .cm .gq .td .ga mają wildcard, więc cokolwiek się
//      rozwiązuje. evisa.gouv.ir i evisa.gouv.ru rozwiązały się oba, choć "gouv" to francuski.
// ====================================================================
window.VISA_LINKS = {
    // --- eTA / autoryzacja podróży online (8) ---
    AU: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/electronic-travel-authority-601",
    CA: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html",
    GB: "https://www.gov.uk/eta",
    IL: "https://israel-entry.piba.gov.il/",
    KE: "https://etakenya.go.ke/",                  // Kenia przeszła z e-visa na eTA; evisa.go.ke to stary adres
    KR: "https://www.k-eta.go.kr/",
    NZ: "https://www.immigration.govt.nz/visas/new-zealand-electronic-travel-authority-nzeta/",
    US: "https://esta.cbp.dhs.gov/",

    // --- e-visa (23) ---
    AF: "https://evisa.mfa.gov.af/",                // przekierowuje na eafghans.com (platforma e-administracji) - patrz ZASADA NR 1
    AZ: "https://evisa.gov.az/",
    BJ: "https://evisa.gouv.bj/",                   // przekierowuje na evisa.bj - patrz ZASADA NR 1
    BT: "https://immi.gov.bt/",
    BW: "https://evisa.gov.bw/",
    CD: "https://evisa.gouv.cd/",
    DJ: "https://www.evisa.gouv.dj/",
    GN: "https://www.paf.gov.gn/visa/",
    GY: "https://eservices.iss.gov.gy/",
    IN: "https://indianvisaonline.gov.in/evisa/",
    IR: "https://evisa.mfa.gov.ir/",                // przekierowuje na evisa.mfa.ir (domena MSZ Iranu)
    LR: "https://lis.gov.lr/visa",
    LS: "https://www.homeaffairs.gov.ls/e-visa/",
    LY: "https://evisa.gov.ly/",
    NG: "https://evisa.immigration.gov.ng/",
    OM: "https://evisa.rop.gov.om/",
    PG: "https://ica.gov.pg/",                      // evisa.ica.gov.pg oddaje pustą stronę IIS, więc kierujemy na urząd
    PK: "https://visa.nadra.gov.pk/",
    RU: "https://evisa.kdmid.ru/",                  // kdmid.ru = departament konsularny MSZ FR (nie .gov, ale domena oficjalna)
    SO: "https://evisa.gov.so/",
    SS: "https://www.evisa.gov.ss/",
    TG: "https://voyage.gouv.tg/",
    UG: "https://visas.immigration.go.ug/",

    // --- wiza po przylocie: portal e-visa albo serwis urzędu imigracyjnego (18) ---
    BH: "https://www.evisa.gov.bh/",
    BI: "https://migration.gov.bi/",
    EG: "https://visa2egypt.gov.eg/",
    ET: "https://www.evisa.gov.et/",
    ID: "https://evisa.imigrasi.go.id/",
    KH: "https://www.evisa.gov.kh/",
    LA: "https://laoevisa.gov.la/",
    LB: "https://www.general-security.gov.lb/",     // Dyrekcja Bezpieczeństwa Ogólnego; /Entry_visa.aspx z Wikipedii daje 404
    LK: "https://eta.gov.lk/",
    MV: "https://www.immigration.gov.mv/",
    MW: "https://evisa.gov.mw/",
    MZ: "https://evisa.gov.mz/",
    NA: "https://eservices.mhaiss.gov.na/visaonarrival",
    NP: "https://immigration.gov.np/",
    RW: "https://irembo.gov.rw/",
    SL: "https://slid.gov.sl/",
    TZ: "https://visa.immigration.go.tz/",
    ZW: "https://www.evisa.gov.zw/",

    // --- wiza wymagana: TYLKO te trzy mają realny adres rządowy (3) ---
    // Pozostałe 9 krajów tej grupy NIE DOSTAJE LINKU i tak ma zostać - wniosku online tam nie ma,
    // wizę wydaje ambasada w Warszawie. Uzasadnienie w db-schema.md.
    DZ: "https://www.mfa.gov.dz/en/services-for-foreigners/entry-visa-to-algeria",
    GH: "https://evisa.immigration.gov.gh/",
    TM: "http://migration.gov.tm/"                  // jedyny wpis po http - hosta nie ma pod https
};
