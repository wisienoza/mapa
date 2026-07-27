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
        { icon: "🔗", text: "Wiele wierszy w profilu to klikalne skróty na zewnątrz — kurs waluty, języki (z nagraniami, jak brzmią), hymn narodowy do odsłuchania, porada bezpieczeństwa, woda z kranu, wtyczki elektryczne, napiwki, odległość od Warszawy (planer trasy do stolicy), koszty życia (COST INDEX — pełna rozpiska na Numbeo w PLN), lokalny czas (zegar światowy kraju na timeanddate), powierzchnię (kraj nałożony na Polskę na thetruesize — porównanie prawdziwej wielkości), liczbę ludności (licznik populacji na żywo, gęstość, mediana wieku i urbanizacja na Worldometer) czy święta państwowe. Każdy otwiera odpowiednią stronę w nowej karcie." },
        { icon: "🏛️", text: "Sam nagłówek profilu — nazwa kraju i jego kod (np. „POLAND · PL”) — też jest linkiem: prowadzi na oficjalną krajową stronę rządową (z bazy ONZ). Klik otwiera ją w nowej karcie. Drobne terytoria spoza bazy zostają zwykłym tekstem, bez linku." },
        { icon: "🏛️", text: "Wiersz „CAPITAL” to wyjątek — nie prowadzi na zewnątrz, tylko otwiera profil miasta-stolicy (populacja, zdjęcie, pogoda, klimat), zostając przy tym samym kraju na globusie. Strzałka „↗” przy wierszu oznacza link na zewnątrz (nowa karta), a „›” — wejście do panelu wewnątrz aplikacji (jak stolica czy lista miast)." },
        { icon: "🚆", text: "Na dole profilu kraju jest pasek przycisków otwieranych w nowej karcie (mapy, zdjęcia, kuchnia, koszty życia, święta i inne), ułożonych alfabetycznie. Dla krajów z sensowną siecią kolejową dochodzi tu przycisk „POCIĄGI” — przewodnik, jak podróżować po danym kraju pociągiem. Nie każdy kraj go ma. Jest tam też „UNESCO” — profil kraju na stronie UNESCO z listą obiektów światowego dziedzictwa; UNESCO prowadzi je dla państw członkowskich, więc przy większości terytoriów zależnych (Grenlandia, Portoryko, Hongkong, Gibraltar…) tego przycisku nie zobaczysz." },
        { icon: "📖", text: "„WIKIPEDIA” prowadzi do hasła o danym kraju — zawsze do polskiej Wikipedii, a jeśli polskiego hasła nie ma, do angielskiej; wtedy na przycisku widnieje dopisek „(EN)”. Dotyczy to dziś tylko dwóch bezludnych wysepek: Glorioso i Juan de Nova." },
        { icon: "🫥", text: "Jeśli przy jakimś kraju lub mieście brakuje przycisku, który widzisz gdzie indziej — to celowe, nie usterka. Ukrywamy te, które prowadziłyby donikąd: serwisy zewnętrzne po prostu nie opisują każdego miejsca na świecie. Przy miastach dotyczy to zwłaszcza przycisków „CLIMATE” i „TASTEATLAS” — strony ze średnimi temperaturami czy lokalną kuchnią istnieją głównie dla większych ośrodków, więc przy mniejszych miejscowościach te przyciski się nie pojawią. Lepiej, żeby go nie było, niż żeby otwierał pustą stronę." },
        { icon: "🐧", text: "Osobny przypadek to terytoria bezludne — Antarktyda, Wyspa Bouveta, Wyspy Heard i McDonalda, Georgia Południowa, Francuskie Terytoria Południowe, Wyspy Glorioso, Juan de Nova, Czagos i bezludne wyspy USA. Nie ma tam stałych mieszkańców, więc nie ma też kosztów życia, kuchni narodowej, świąt państwowych ani opinii turystów — i dlatego przyciski „NUMBEO”, „TASTE ATLAS”, „ŚWIĘTA” oraz „TRIP ADVISOR” przy nich nie występują, a wiersz „COST INDEX” pokazuje samo „N/A” bez linku. Zostaje to, co ma realną treść: zdjęcia, Wikivoyage, mapa, lokalny czas, prąd, woda i porównanie powierzchni." },
        { icon: "🏙️", text: "Na mapie pojawiają się miasta tego kraju: gwiazdka to stolica, kwadrat to metropolia powyżej miliona mieszkańców, kropki to reszta. Kliknij dowolne, żeby zobaczyć jego populację, zdjęcie, pogodę, klimat i dystans z Warszawy." },
        { icon: "🛩️", text: "Baza miast obejmuje też miejscowości, do których po prostu da się dolecieć — każdą, która obsługuje lotnisko z ruchem rozkładowym. Dlatego w Kanadzie, na Alasce czy w Grenlandii zobaczysz na liście osady na kilkuset mieszkańców, gdzie samolot bywa jedynym dojazdem. Przy takich miejscach populacja potrafi być nieznana (w profilu „—”), a część przycisków się nie pojawi — serwisy o kuchni czy klimacie ich nie opisują." },
        { icon: "🚄", text: "Profil miasta ma na dole zestaw przycisków otwieranych w nowej karcie, ułożonych alfabetycznie — tak samo jak w profilu kraju: przewodniki i mapy, a także planer trasy z Warszawy (Rome2Rio) i wyszukiwarkę noclegów (Booking). Rome2Rio nie pokazuje się dla samej Warszawy. Oba te przyciski pytają o miasto razem z krajem, więc trafiają we właściwe miejsce nawet przy nazwach, które powtarzają się na świecie — Valencia w Wenezueli nie zaprowadzi Cię do Hiszpanii." },
        { icon: "💸", text: "Wiersz „KOSZTY” w profilu miasta mówi, ile razy drożej (albo taniej) jest tam niż w Warszawie — „2,31× WARSZAWY” znaczy, że życie kosztuje tam ponad dwa razy tyle co u nas. Kolor podpowiada od razu: zielony to taniej, czerwony to znacznie drożej. Wartość jest klikalna i otwiera pełną rozpiskę cen tego miasta na Numbeo. Liczba obejmuje codzienne wydatki bez czynszu (jedzenie, transport, restauracje). Ten sam mnożnik dopisuje się w profilu kraju przy wierszu „COST INDEX”, tyle że policzony dla stolicy — dlatego przy Szwajcarii zobaczysz 2,06× (Berno), a nie 2,31× (Zurych)." },
        { icon: "📉", text: "Mnożnik ma 540 miast w 121 krajach (w profilach państw: 118 stolic) i przy pozostałych po prostu nie występuje — nie ma go ani Luanda, ani La Paz, ani Gaborone czy Nassau, mimo że to stolice. To nie jest brak po naszej stronie: Numbeo liczy ogólny koszt życia tylko tam, gdzie zebrał dość ankiet. Uwaga, bo to myli: przycisk „NUMBEO” może przy takim mieście normalnie działać i pokazywać ceny — na przykład dla Kinszasy widać, że czynsze są o 40% wyższe niż w Warszawie, a restauracje o 34% — ale w miejscu ogólnego porównania Numbeo pisze wprost „not enough data to calculate difference in Cost of Living”. Skoro serwis sam nie podaje tej liczby, my też jej nie zmyślamy i wiersz znika." },
        { icon: "🚇", text: "Miasta z metrem albo koleją miejską mają dodatkowo przycisk „METRO” — schematyczna mapa sieci z serwisu UrbanRail. Nie każde miasto go ma: przycisk pojawia się tylko tam, gdzie taka sieć istnieje (na dziś 559 miast w bazie)." },
        { icon: "💀", text: "Przycisk „ATLAS OBSCURA” prowadzi do listy dziwnych i osobliwych miejsc w tym konkretnym mieście — nie w całym kraju, jak ten sam przycisk w profilu państwa. Ma go 1066 miast z 7991 w bazie: Atlas Obscura opisuje głównie duże i turystyczne ośrodki, więc przy mniejszych miejscowościach przycisku po prostu nie będzie. To celowe — zamiast prowadzić w pustkę, znika." },
        { icon: "📋", text: "Wiersz „MIASTA” (licznik odwiedzonych) jest klikalny — otwiera okno z alfabetyczną listą wszystkich miast kraju: zielone to już odwiedzone, czerwone jeszcze nie. Klik w miasto z listy od razu pokazuje jego profil." },
        { icon: "🛬", text: "Nad legendą miast pojawia się przycisk „POKAŻ LOTNISKA” — przełącza kraj na widok lotnisk. Pinezkę dostaje każde lotnisko z regularnym ruchem rozkładowym, czyli takie, na które da się kupić bilet w rozkładzie: od wielkich portów międzynarodowych po małe lotniska regionalne, heliporty i bazy wodnosamolotów, gdzie taki lot bywa jedynym dojazdem. Razem 4165 lotnisk w 236 krajach — wcześniej było ich 887, bo pokazywały się tylko te opisane w jednym serwisie o spaniu na lotniskach. Lotniska bez rozkładu nie dostają pinezki, nawet jeśli kiedyś ją miały: zamknięte albo zastąpione nowszym portem znikają z mapy. Wyjątkiem są porty, którym ruch wstrzymano przejściowo — trzy ukraińskie (Boryspol, Żulany, Charków) zostają na mapie opisane normalnie, bo nadal istnieją i wrócą do ruchu." },
        { icon: "🏙️", text: "W profilu lotniska wiersz „MIASTO” jest klikalny — strzałka „›” prowadzi do profilu miasta, które ten port obsługuje (populacja, zdjęcie, pogoda, klimat, dystans z Warszawy). Gdy strzałki nie ma, tego miasta nie ma w bazie i wiersz jest zwykłym opisem." },
        { icon: "🌡", text: "Kliknięcie lotniska wypełnia też „Live Environ Feed” w lewym górnym rogu — pogodę liczoną dla współrzędnych samego lotniska, a nie centrum miasta. Przy portach leżących daleko za miastem (Modlin to 35 km od Warszawy) to realna różnica. Obok odczytów jest przycisk WINDY z mapą wiatru w tym punkcie. Nie ma tu przycisku CLIMATE — normy klimatyczne są liczone dla miast, nie dla lotnisk." },
        { icon: "🕐", text: "Profil lotniska ma na dole wiersz „CZAS LOKALNY” — tykający zegar strefy, w której leży lotnisko, a w nawiasie różnica względem Warszawy. Sydney pokaże „(+8h)”, Los Angeles „(−9h)”, a polskie lotnisko „(=WAW)”. Przydaje się, gdy sprawdzasz, czy o tej godzinie ktoś tam w ogóle odbierze telefon." },
        { icon: "📖", text: "Kliknięcie lotniska pokazuje jego profil po prawej: miasto, kraj i wiersz „RUCH” z klasą lotniska. Pod spodem są linki — Wikipedia plus strony o noclegu na lotnisku, palarniach i poidełkach. Wikipedia otwiera się po angielsku, bo tam hasła o lotniskach są znacznie pełniejsze niż polskie; wyjątkiem są polskie lotniska, które prowadzą na polską Wikipedię. Przycisku, dla którego nie ma czego otworzyć, po prostu nie zobaczysz — te trzy serwisy opisują tylko część lotnisk (palarnie ok. 800, poidełka ok. 600, głównie te duże), więc na małym lotnisku zostanie sama Wikipedia. Za to każdy przycisk, który widzisz, prowadzi wprost do konkretnej strony o tym lotnisku — nie do pustej wyszukiwarki." },
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
        { icon: "⭐", text: "Lista Cudów Świata — kliknij dowolny, żeby zobaczyć jego zdjęcie, opis i przenieść się do niego na mapie. W profilu cudu też jest wiersz „ODWIEDZONE” oraz przyciski: oficjalna strona obiektu (bilety, godziny otwarcia — pokazuje się tam, gdzie taka strona istnieje i została sprawdzona), Wikivoyage (praktyczny przewodnik), Wikipedia i zdjęcia. Wikivoyage opisuje miejsca, a nie same zabytki, więc przy części cudów trafisz na artykuł miasta lub dzielnicy, w której leżą — tam są konkretne informacje dla podróżnego." },
        { icon: "🌲", text: "Lista rang po prawej („Progression Tree”) jest klikalna. Ranga jeszcze niezdobyta pokazuje plan dojścia: ile krajów brakuje, co dorzucą zaplanowane misje i propozycje nieodwiedzonych krajów (najpierw łatwe — bezwizowe i bezpieczne). Ranga zdobyta pokazuje swój próg i o ile go przekroczyłeś." },
        { icon: "🏳️", text: "Przewijający się pasek flag na dole to skrót do każdego odwiedzonego kraju — kliknij flagę, żeby tam skoczyć. Nie musisz czekać, aż przyjedzie: najedź, żeby zatrzymać pasek, i przeciągnij go albo przewiń kółkiem. Aktualnie wybrany kraj świeci na zielono, a po najechaniu na flagę zobaczysz dymek z liczbą odwiedzonych w nim miast i najdalszym z nich." }
    ]},
    { cat: "PLANUJESZ PODRÓŻ", items: [
        { icon: "🛫", text: "Panel „Active Mission” odlicza czas do najbliższego wyjazdu. Jeśli masz zaplanowaną więcej niż jedną podróż, strzałkami przełączasz się między nimi." },
        { icon: "🗂️", text: "Kliknij sam licznik odliczania, żeby otworzyć pełny brief misji: daty wylotu i powrotu, długość pobytu, numery lotów, planowaną trasę i listę krajów wyprawy (nowe i już odwiedzone). Kliknięcie w sam cel misji rysuje całą trasę na globusie." },
        { icon: "🎯", text: "Przycisk „GDZIE TERAZ?” (pod drzewkiem rang, po prawej) to ranking najlepszych celów na wybrany miesiąc. Łączy w jeden wynik pogodę, wizę, bezpieczeństwo, ceny na miejscu i szacunkowy koszt dojazdu. Wybierasz miesiąc u góry, a klik w wiersz przenosi do danego kraju." },
        { icon: "💉", text: "Pod „GDZIE TERAZ?” stoi przycisk „SZCZEPIENIA” — otwiera w nowej karcie tabelę szczepień dla podróżujących (PDF). Jest jeden dla całego świata, więc nie musisz najpierw wybierać kraju; wcześniej siedział w pasku linków w profilu każdego państwa, choć prowadził dokładnie do tego samego pliku." },
        { icon: "📊", text: "Liczby LOTY / LOTNISKA / TRASY w panelu Flights są klikalne — otwierają statystyki Twoich lotów: przelecane kilometry, ile to okrążeń Ziemi i jaka część drogi na Księżyc, czas w powietrzu, rekordowe trasy, ulubione linie i maszyny. Wszystko z Twojego eksportu z Flightradara." },
        { icon: "✈️", text: "„Show on globe” w panelu Flights rysuje Twoje realne, zrealizowane loty jako łuki na mapie. Przycisk „LINIE LOTNICZE” (i ten sam na dole paszportu) pokazuje wszystkich przewoźników, którymi latałeś, z logo i liczbą lotów." },
        { icon: "📡", text: "„MAX RANGE DETECTED” w panelu Flights to Twój rekord zasięgu — najdalsze lotnisko, na jakim wylądowałeś, i najdalsze odwiedzone miasto. Kliknij box, żeby zobaczyć całą trasę z Warszawy narysowaną na globusie." }
    ]},
    { cat: "KOLOROWE TRYBY MAPY", items: [
        { icon: "🛂", text: "VISA — koloruje wszystkie kraje według tego, czy potrzebujesz wizy: zielony to nie, żółty to uproszczona procedura, czerwony to tak." },
        { icon: "🕐", text: "ZONES — koloruje mapę według stref czasowych i pokazuje, która jest tam teraz godzina." },
        { icon: "☾", text: "NIGHT — pokazuje na żywo, gdzie na świecie jest teraz dzień, a gdzie noc." },
        { icon: "🌡", text: "CLIMATE — koloruje kraje według komfortu temperaturowego w wybranym miesiącu (niebieski zimno, zielony idealnie, czerwony upał). Miesiąc wybierasz u góry ekranu. To narzędzie do decyzji „gdzie mi w lutym ciepło”, a nie prognoza." },
        { icon: "👆", text: "Te cztery tryby wykluczają się — naraz działa tylko jeden. W trybie VISA lub CLIMATE kliknięcie w kraj wyłącza tryb i od razu otwiera jego profil. Co więcej, każde pokazanie czegoś na globusie — MAX RANGE, kontynent, cel misji, cud świata, rekordowy lot czy lotnisko — także wyłącza aktywny tryb, żeby kolorowa nakładka nie zasłaniała tego, co chcesz zobaczyć." },
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
