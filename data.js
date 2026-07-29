// === TWOJA BAZA OPERACYJNA ===

const VISITED_COUNTRIES = ["AL","AD","AT","BE","BA","BG","CN","HR","ME","CZ","EE","FI","FR","GR","ES","JP","XK","LI","LT","LV","MK","MT","MD","DE","PL","PT","RO","SM","RS","SK","SI","CH","TH","UA","VA","HU","GB","IT","AE"];

const VISITED_WONDERS = ["CN","IT","GR","JP"];

const MISSIONS_DB = [
    {
        "name": "INDOCHINY",
        "date": "2026-10-23T17:40",
        "returnDate": "2026-11-14T17:15",
        "flight": "QR260 & QR834 / QR977 & QR259 ",
        "flag": "VN",
        "route": [
            {
                "city": "Warszawa",
                "lat": 52.1672,
                "lon": 20.9679,
                "note": "23.10 START"
            },
            {
                "city": "Doha",
                "lat": 25.273,
                "lon": 51.608,
                "note": "23-24.10 tranzyt"
            },
            {
                "city": "Bangkok",
                "lat": 13.69,
                "lon": 100.7501,
                "note": "24-27.10\nETAP I: TAJLANDIA"
            },
            {
                "city": "Kuala Lumpur",
                "lat": 2.7456,
                "lon": 101.7099,
                "note": "27-30.10\nETAP II: MALEZJA"
            },
            {
                "city": "Siem Reap",
                "lat": 13.4106,
                "lon": 103.8142,
                "note": "30.10-01.11\nETAP III: KAMBODŻA"
            },
            {
                "city": "Phnom Penh",
                "lat": 11.5564,
                "lon": 104.9282,
                "note": "01-03.11\nETAP III: KAMBODŻA"
            },
            {
                "city": "Sajgon",
                "lat": 10.8166,
                "lon": 106.666,
                "note": "03-05.11\nETAP IV: WIETNAM PD"
            },
            {
                "city": "Da Nang",
                "lat": 16.0439,
                "lon": 108.2023,
                "note": "05-08.11\nETAP IV: HOI AN / HUE"
            },
            {
                "city": "Hanoi",
                "lat": 21.2212,
                "lon": 105.8072,
                "note": "08-13.11\nETAP V: WIETNAM PN"
            },
            {
                "city": "Doha",
                "lat": 25.273,
                "lon": 51.608,
                "note": "13-14.11 Souq Waqif"
            },
            {
                "city": "Warszawa",
                "lat": 52.1672,
                "lon": 20.9679,
                "note": "14.11 KONIEC MISJI"
            }
        ]
    }
];
