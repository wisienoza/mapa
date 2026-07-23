// === INSTRUKCJA / MANUAL: co i jak zrobić na tej stronie (widok uzytkownika, nie admina) ===
// TON: pełny przewodnik po funkcjach dla kogoś, kto siada i chce korzystać - "co zobaczę / co kliknę",
// bez technikaliów (nazw serwisów zewnętrznych, przypadków brzegowych, logiki liczenia). Każda funkcja
// strony ma tu być poznawalna, ale opisana po ludzku i krótko (1-2 zdania na wpis).
window.HELP_SECTIONS = [
    { cat: "PIERWSZE KROKI", items: [
        { icon: "🌍", text: "To interaktywny globus połączony z grą: kolekcjonujesz odwiedzone kraje, miasta i cuda świata, zdobywasz kolejne rangi i odznaki, a przy okazji planujesz następne wyjazdy." },
        { icon: "🖱️", text: "Globus obraca się sam. Chwyć go myszką, żeby obrócić ręcznie, a kółkiem przybliżasz i oddalasz. Kliknięcie w puste miejsce poza globusem wraca do spokojnego samoobracania." },
        { icon: "🎥", text: "Gdy klikniesz coś, co warto zobaczyć w całości — kontynent, trasę lotu, cud świata czy cel misji — globus sam wraca do pełnego widoku i obraca się na cel. Klik w sam kraj tylko doobraca się na niego i zachowuje Twoje przybliżenie, więc możesz spokojnie zwiedzać region z bliska, przeskakując między sąsiadami." },
        { icon: "🔎", text: "Wyszukiwarka w lewym panelu to najszybsza droga do celu — wpisz nazwę kraju albo miasta i kliknij wynik, żeby od razu się tam przenieść. Miasta mają obok ikonę i nazwę swojego kraju." },
        { icon: "↻", text: "Przycisk „RESET AND RESUME ORBIT” w lewym dolnym rogu wraca do widoku startowego: wznawia orbitę i wyłącza wszystkie kolorowe tryby mapy oraz widok lotnisk." },
        { icon: "⎋", text: "Każde okno (odznaki, paszport, brief misji, listy państw, ta instrukcja) zamkniesz klawiszem Esc, kliknięciem w tło albo krzyżykiem. Esc zamyka zawsze to okno, które jest na wierzchu, więc z okna otwartego w oknie wracasz krok po kroku, a nie wszystko naraz." }
    ]},
    { cat: "KLIKASZ W KRAJ", items: [
        { icon: "🗂️", text: "Kliknięcie kraju otwiera jego pełny profil: poziom bezpieczeństwa, walutę z aktualnym kursem, populację, języki, koszty życia, prąd, wodę i napiwki, lokalny zegar oraz pogodę na żywo." },
        { icon: "🌡", text: "Duża liczba stopni w panelu pogody zmienia kolor razem z temperaturą — od fioletu i błękitu (mróz), przez zielony (strefa komfortu 18–27°C), po żółty, pomarańczowy i czerwień (upał). Od razu wiesz, czy pakować kurtkę, czy klapki." },
        { icon: "🛡️", text: "Obok poziomu bezpieczeństwa bywa mały znaczek, który porównuje naszą ocenę z aktualną poradą dla podróżnych brytyjskiego MSZ — sygnalizuje, gdyby oficjalne ostrzeżenie było ostrzejsze niż nasze. Najedź myszką po szczegóły." },
        { icon: "🔗", text: "Wiele wierszy w profilu to klikalne skróty na zewnątrz — kurs waluty, języki (z nagraniami, jak brzmią), hymn narodowy do odsłuchania, porada bezpieczeństwa, woda z kranu, wtyczki elektryczne, napiwki, odległość od Warszawy (planer trasy do stolicy), koszty życia (COST INDEX — pełna rozpiska na Numbeo w PLN) czy święta państwowe. Każdy otwiera odpowiednią stronę w nowej karcie." },
        { icon: "🏛️", text: "Wiersz „CAPITAL” to wyjątek — nie prowadzi na zewnątrz, tylko otwiera profil miasta-stolicy (populacja, zdjęcie, pogoda, klimat), zostając przy tym samym kraju na globusie. Strzałka „↗” przy wierszu oznacza link na zewnątrz (nowa karta), a „›” — wejście do panelu wewnątrz aplikacji (jak stolica czy lista miast)." },
        { icon: "🏙️", text: "Na mapie pojawiają się miasta tego kraju: gwiazdka to stolica, kwadrat to metropolia powyżej miliona mieszkańców, kropki to reszta. Kliknij dowolne, żeby zobaczyć jego populację, zdjęcie, pogodę, klimat i dystans z Warszawy." },
        { icon: "🚄", text: "Profil miasta ma na dole zestaw przycisków otwieranych w nowej karcie: przewodniki i mapy, a także planer trasy z Warszawy (Rome2Rio) i wyszukiwarkę noclegów (Booking). Rome2Rio nie pokazuje się dla samej Warszawy." },
        { icon: "📋", text: "Wiersz „MIASTA” (licznik odwiedzonych) jest klikalny — otwiera okno z alfabetyczną listą wszystkich miast kraju: zielone to już odwiedzone, czerwone jeszcze nie. Klik w miasto z listy od razu pokazuje jego profil." },
        { icon: "🛬", text: "Nad legendą miast pojawia się przycisk „POKAŻ LOTNISKA” — przełącza kraj na widok lotnisk. Kliknięcie lotniska pokazuje jego profil po prawej wraz z linkami do stron o noclegu na lotnisku, poidełkach i palarniach." },
        { icon: "✅", text: "Żeby oznaczyć, że gdzieś byłeś, kliknij wiersz „ODWIEDZONE” w profilu kraju, miasta albo cudu świata i potwierdź. Działa tylko w jedną stronę — raz zaznaczonego nie odznaczysz z poziomu strony. Zaznaczenie miasta albo cudu zalicza od razu cały kraj, a odwiedzone miasta świecą na mapie na zielono." },
        { icon: "🏅", text: "Jeśli takie zaznaczenie odblokuje nową odznakę albo awans na kolejną rangę, od razu wyskoczy okno — cyjanowe przy awansie, żółte przy odznace. Kliknij gdziekolwiek, żeby zamknąć. Gdy jeden klik odpali kilka rzeczy naraz, przewijają się po kolei." }
    ]},
    { cat: "TWÓJ POSTĘP", items: [
        { icon: "🔢", text: "Liczba w lewym górnym rogu to Twój wynik — ile krajów odwiedziłeś. Kliknij ją, żeby zobaczyć spis wszystkich, pogrupowany po kontynencie; kliknij dowolne państwo, żeby do niego skoczyć. Pasek pod liczbą pokazuje, ile brakuje do następnej rangi (kliknij po plan dojścia), a nazwa rangi otwiera jej szczegóły." },
        { icon: "🏆", text: "Pasek ACHIEVEMENTS otwiera pełną listę 528 odznak w kategoriach — kontynenty, regiony, miasta, ciekawostki, loty, wizy i inne. Każda ma pasek postępu, a większość jest klikalna: klik pokazuje rozpiskę, co masz już zaliczone (na zielono) i czego jeszcze brakuje (na czerwono)." },
        { icon: "🗂️", text: "U góry panelu odznak masz stały pasek filtrów: poziom trudności, status (zdobyte / niezdobyte) i kategoria. Filtry łączą się dowolnie — możesz np. pokazać same zdobyte złote odznaki z kategorii MIASTA. „← WSZYSTKIE” w tytule resetuje je naraz." },
        { icon: "💎", text: "Każda odznaka ma poziom trudności — brąz, srebro, złoto, platyna, diament — widoczny po kolorze kafelka i znaczku w rogu; platyna i diament dodatkowo świecą. Odznaka niezdobyta jest szara, kolor pojawia się dopiero po zaliczeniu." },
        { icon: "🎖️", text: "Kliknięcie w nazwę Twojej rangi (lewy górny róg) otwiera paszport operatora: rangę, zasięg podboju, drabinkę poziomów odznak, najrzadsze zdobycze i podsumowanie nalotu." },
        { icon: "🌐", text: "Panel „Continental Control” pokazuje procent ukończenia każdego kontynentu. Kliknij nazwę, żeby się tam przenieść, albo liczbę, żeby zobaczyć listę wszystkich państw kontynentu — zielone zaliczone, czerwone brakujące. Kliknij dowolne, żeby je pokazać na globusie." },
        { icon: "⭐", text: "Lista Cudów Świata — kliknij dowolny, żeby zobaczyć jego zdjęcie, opis i przenieść się do niego na mapie. W profilu cudu też jest wiersz „ODWIEDZONE”." },
        { icon: "🌲", text: "Lista rang po prawej („Progression Tree”) jest klikalna. Ranga jeszcze niezdobyta pokazuje plan dojścia: ile krajów brakuje, co dorzucą zaplanowane misje i propozycje nieodwiedzonych krajów (najpierw łatwe — bezwizowe i bezpieczne). Ranga zdobyta pokazuje swój próg i o ile go przekroczyłeś." },
        { icon: "🏳️", text: "Przewijający się pasek flag na dole to skrót do każdego odwiedzonego kraju — kliknij flagę, żeby tam skoczyć. Nie musisz czekać, aż przyjedzie: najedź, żeby zatrzymać pasek, i przeciągnij go albo przewiń kółkiem. Aktualnie wybrany kraj świeci na zielono, a po najechaniu na flagę zobaczysz dymek z liczbą odwiedzonych w nim miast i najdalszym z nich." }
    ]},
    { cat: "PLANUJESZ PODRÓŻ", items: [
        { icon: "🛫", text: "Panel „Active Mission” odlicza czas do najbliższego wyjazdu. Jeśli masz zaplanowaną więcej niż jedną podróż, strzałkami przełączasz się między nimi." },
        { icon: "🗂️", text: "Kliknij sam licznik odliczania, żeby otworzyć pełny brief misji: daty wylotu i powrotu, długość pobytu, numery lotów, planowaną trasę i listę krajów wyprawy (nowe i już odwiedzone). Kliknięcie w sam cel misji rysuje całą trasę na globusie." },
        { icon: "🎯", text: "Przycisk „GDZIE TERAZ?” (pod drzewkiem rang, po prawej) to ranking najlepszych celów na wybrany miesiąc. Łączy w jeden wynik pogodę, wizę, bezpieczeństwo, ceny na miejscu i szacunkowy koszt dojazdu. Wybierasz miesiąc u góry, a klik w wiersz przenosi do danego kraju." },
        { icon: "📊", text: "Liczby LOTY / LOTNISKA / TRASY w panelu Flights są klikalne — otwierają statystyki Twoich lotów: przelecane kilometry, ile to okrążeń Ziemi i jaka część drogi na Księżyc, czas w powietrzu, rekordowe trasy, ulubione linie i maszyny. Wszystko z Twojego eksportu z Flightradara." },
        { icon: "✈️", text: "„Show on globe” w panelu Flights rysuje Twoje realne, zrealizowane loty jako łuki na mapie. Przycisk „LINIE LOTNICZE” (i ten sam na dole paszportu) pokazuje wszystkich przewoźników, którymi latałeś, z logo i liczbą lotów." },
        { icon: "📡", text: "„MAX RANGE DETECTED” w panelu Flights to Twój rekord zasięgu — najdalsze lotnisko, na jakim wylądowałeś, i najdalsze odwiedzone miasto. Kliknij box, żeby zobaczyć całą trasę z Warszawy narysowaną na globusie." }
    ]},
    { cat: "KOLOROWE TRYBY MAPY", items: [
        { icon: "🛂", text: "VISA — koloruje wszystkie kraje według tego, czy potrzebujesz wizy: zielony to nie, żółty to uproszczona procedura, czerwony to tak." },
        { icon: "🕐", text: "ZONES — koloruje mapę według stref czasowych i pokazuje, która jest tam teraz godzina." },
        { icon: "☾", text: "NIGHT — pokazuje na żywo, gdzie na świecie jest teraz dzień, a gdzie noc." },
        { icon: "🌡", text: "CLIMATE — koloruje kraje według komfortu temperaturowego w wybranym miesiącu (niebieski zimno, zielony idealnie, czerwony upał). Miesiąc wybierasz u góry ekranu. To narzędzie do decyzji „gdzie mi w lutym ciepło”, a nie prognoza." },
        { icon: "👆", text: "Te cztery tryby wykluczają się — naraz działa tylko jeden. W trybie VISA lub CLIMATE kliknięcie w kraj wyłącza tryb i od razu otwiera jego profil." },
        { icon: "🌐", text: "DETAIL (LOW / HIGH / ULTRA) — poziom szczegółowości granic globu. HIGH jest domyślny; ULTRA daje najdokładniejsze wybrzeża, ale na słabszym sprzęcie może zwalniać, a LOW jest najlżejszy." }
    ]}
];

window.hideHelpPanel = function(){
    var el = document.getElementById("help-overlay");
    if (el) el.style.display = "none";
};

window.showHelpPanel = function(){
    var el = document.getElementById("help-overlay");
    if (!el) {
        el = document.createElement("div");
        el.id = "help-overlay";
        el.style.cssText = "display:none; position:fixed; inset:0; z-index:200; background:rgba(0,0,0,0.75); backdrop-filter:blur(4px); align-items:center; justify-content:center;";
        el.innerHTML =
            '<div id="help-modal" style="background:rgba(8,8,10,0.96); border:1px solid rgba(250,204,21,0.4); border-radius:8px; padding:22px; width:min(720px,92vw); max-height:85vh; overflow-y:auto; box-shadow:0 8px 40px rgba(0,0,0,0.6); font-family:\'Rajdhani\',sans-serif;">'
          +   '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">'
          +     '<h1 style="margin:0; border:none; padding:0; font-size:1.3rem;">📖 JAK KORZYSTAĆ ZE STRONY</h1>'
          +     '<span id="help-close" style="cursor:pointer; font-size:1.5rem; color:#8f9ba8; line-height:1;">✕</span>'
          +   '</div>'
          +   '<div id="help-body"></div>'
          + '</div>';
        document.body.appendChild(el);
        el.addEventListener("click", function(e){ if (e.target === el) window.hideHelpPanel(); });
        document.getElementById("help-close").onclick = window.hideHelpPanel;
        document.getElementById("help-body").innerHTML = window.HELP_SECTIONS.map(function(sec){
            var lines = sec.items.map(function(it){
                return '<div style="display:flex; gap:10px; align-items:baseline; padding:7px 0; border-bottom:1px solid rgba(255,255,255,0.06);">'
                  +   '<span style="font-size:1rem; flex:0 0 22px;">' + it.icon + '</span>'
                  +   '<span style="font-family:\'JetBrains Mono\',monospace; font-size:0.72rem; color:#c6cfd9; line-height:1.5;">' + it.text + '</span>'
                  + '</div>';
            }).join('');
            return '<div style="margin-top:16px;">'
              +   '<div style="font-family:\'JetBrains Mono\',monospace; font-size:0.78rem; color:#facc15; letter-spacing:1.5px; border-bottom:1px solid #444; padding-bottom:5px; margin-bottom:2px; font-weight:700;">' + sec.cat + '</div>'
              +   lines
              + '</div>';
        }).join('');
    }
    el.style.display = "flex";
};
