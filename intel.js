// === LOGISTICS INTELLIGENCE DATABASE v3.0 (GLOBAL / SIMPLIFIED) ===
// [POWER 🔌: Voltage + Adapter Req] | [WATER 🚰] | [TIP 💸]

const INTEL_DB = {
    // --- EUROPA (EUROPE) ---
    "AL": { p: "230V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10% (Mile widziane)" },
    "AD": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "Wliczone" },
    "AT": { p: "230V [ADAPTER: NIE]", w: "✅ ALPEJSKA (TOP)", t: "5-10% (Do kelnera)" },
    "BY": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "BE": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "Wliczone" },
    "BA": { p: "230V [ADAPTER: NIE]", w: "✅ OK (Góry)", t: "10% (Gotówka)" },
    "BG": { p: "230V [ADAPTER: NIE]", w: "✅ OK", t: "10% (Standard)" },
    "HR": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10% (Gotówka)" },
    "CY": { p: "240V [ADAPTER: TAK]", w: "✅ OK (Ciepła)", t: "10%" },
    "CZ": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10% (Mówisz kwotę)" },
    "DK": { p: "230V [ADAPTER: MOŻE]", w: "✅ PIJ ŚMIAŁO", t: "Wliczone" }, // Typ K
    "EE": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10%" },
    "FI": { p: "230V [ADAPTER: NIE]", w: "✅ KRYSZTAŁ", t: "Nieoczekiwane" },
    "FR": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "Zaokrąglij" },
    "DE": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "5-10% (Zaokrąglij)" },
    "GR": { p: "230V [ADAPTER: NIE]", w: "⚠️ WYSPY: BUTELKA", t: "5-10% (Na stole)" },
    "HU": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10-15% (Wlicz.)" },
    "IS": { p: "230V [ADAPTER: NIE]", w: "✅ LODOWCOWA", t: "Absolutnie nie" },
    "IE": { p: "230V [ADAPTER: TAK]", w: "✅ PIJ ŚMIAŁO", t: "10-15%" },
    "IT": { p: "230V [ADAPTER: MOŻE]", w: "✅ PIJ ŚMIAŁO", t: "Coperto (Euro/os)" }, // Stare gniazda L
    "XK": { p: "230V [ADAPTER: NIE]", w: "⚠️ RACZEJ BUTELKA", t: "10%" },
    "LV": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10%" },
    "LI": { p: "230V [ADAPTER: MOŻE]", w: "✅ PIJ ŚMIAŁO", t: "Wliczone" }, // Typ J
    "LT": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10%" },
    "LU": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "Wliczone" },
    "MT": { p: "230V [ADAPTER: TAK]", w: "⚠️ ODSALANA (Słona)", t: "5-10%" },
    "MD": { p: "220V [ADAPTER: NIE]", w: "⚠️ RACZEJ BUTELKA", t: "10%" },
    "MC": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "Wliczone" },
    "ME": { p: "230V [ADAPTER: NIE]", w: "✅ OK (Góry)", t: "10%" },
    "NL": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "Zaokrąglij" },
    "MK": { p: "230V [ADAPTER: NIE]", w: "⚠️ RACZEJ BUTELKA", t: "10%" },
    "NO": { p: "230V [ADAPTER: NIE]", w: "✅ KRYSZTAŁ", t: "Nieoczekiwane" },
    "PL": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10-15% (Opcja)" },
    "PT": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "5-10% (Mile widziane)" },
    "RO": { p: "230V [ADAPTER: NIE]", w: "⚠️ RACZEJ BUTELKA", t: "10-12% (Oczekiwane)" },
    "RU": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "SM": { p: "230V [ADAPTER: MOŻE]", w: "✅ PIJ ŚMIAŁO", t: "10%" },
    "RS": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10%" },
    "SK": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10% (Zaokrąglij)" },
    "SI": { p: "230V [ADAPTER: NIE]", w: "✅ PIJ ŚMIAŁO", t: "10%" },
    "ES": { p: "230V [ADAPTER: NIE]", w: "✅ OK (Ale chlor)", t: "Drobne (Tapas)" },
    "SE": { p: "230V [ADAPTER: NIE]", w: "✅ KRYSZTAŁ", t: "Nieoczekiwane" },
    "CH": { p: "230V [ADAPTER: MOŻE]", w: "✅ KRYSZTAŁ", t: "Wliczone" }, // Typ J
    "UA": { p: "230V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10% (Gotówka)" },
    "GB": { p: "230V [ADAPTER: TAK]", w: "✅ PIJ ŚMIAŁO", t: "10-12.5% (Wlicz.)" },
    "VA": { p: "230V [ADAPTER: NIE]", w: "✅ ŚWIĘTA WODA", t: "Wliczone" },

    // --- AZJA (ASIA) ---
    "AF": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Bakszysz" },
    "AM": { p: "220V [ADAPTER: NIE]", w: "✅ OK (Pyszna!)", t: "10%" },
    "AZ": { p: "220V [ADAPTER: NIE]", w: "☠️ PRZEGOTUJ", t: "5-10%" },
    "BH": { p: "230V [ADAPTER: TAK]", w: "✅ OK (Odsalana)", t: "10%" },
    "BD": { p: "220V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Bakszysz" },
    "BT": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Dla przewodnika" },
    "BN": { p: "240V [ADAPTER: TAK]", w: "✅ OK", t: "Nieoczekiwane" },
    "KH": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "1$ lub 10%" },
    "CN": { p: "220V [ADAPTER: TAK]", w: "☠️ PRZEGOTUJ", t: "⛔ BRAK ZWYCZAJU" },
    "GE": { p: "220V [ADAPTER: NIE]", w: "✅ OK (Pyszna!)", t: "10%" },
    "HK": { p: "220V [ADAPTER: TAK]", w: "✅ OK", t: "10% (Wliczone)" },
    "IN": { p: "230V [ADAPTER: MOŻE]", w: "☠️ DELHI BELLY", t: "5-10% (Bakszysz)" },
    "ID": { p: "230V [ADAPTER: NIE]", w: "☠️ BALI BELLY", t: "5-10%" },
    "IR": { p: "220V [ADAPTER: NIE]", w: "✅ OK (Miasta)", t: "Oczekiwane" },
    "IQ": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "IL": { p: "230V [ADAPTER: MOŻE]", w: "✅ PIJ ŚMIAŁO", t: "10-15%" }, // Typ H
    "JP": { p: "100V [ADAPTER: TAK]", w: "✅ KRYSZTAŁ", t: "⛔ OBRAZA! (0%)" },
    "JO": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10% (Bakszysz)" },
    "KZ": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "KW": { p: "240V [ADAPTER: TAK]", w: "✅ OK", t: "10%" },
    "KG": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "LA": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Opcjonalne" },
    "LB": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "MY": { p: "240V [ADAPTER: TAK]", w: "☠️ RACZEJ BUTELKA", t: "10% (Wliczone)" },
    "MV": { p: "230V [ADAPTER: TAK]", w: "⚠️ RACZEJ BUTELKA", t: "10%" },
    "MN": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Drobne" },
    "MM": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Opcjonalne" },
    "NP": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "KP": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "⛔ ZAKAZANE" },
    "OM": { p: "240V [ADAPTER: TAK]", w: "✅ OK", t: "10%" },
    "PK": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Bakszysz" },
    "PH": { p: "220V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "QA": { p: "240V [ADAPTER: TAK]", w: "✅ OK (Odsalana)", t: "10%" },
    "SA": { p: "220V [ADAPTER: TAK]", w: "✅ OK (Odsalana)", t: "10-15%" },
    "SG": { p: "230V [ADAPTER: TAK]", w: "✅ PIJ ŚMIAŁO", t: "Wliczone (10%)" },
    "KR": { p: "220V [ADAPTER: NIE]", w: "✅ OK", t: "⛔ BRAK ZWYCZAJU" },
    "LK": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "SY": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "TW": { p: "110V [ADAPTER: TAK]", w: "☠️ PRZEGOTUJ", t: "Wliczone" },
    "TJ": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "TH": { p: "220V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Drobne" },
    "TL": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Nie" },
    "TR": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Bakszysz (5-10%)" },
    "TM": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "AE": { p: "220V [ADAPTER: TAK]", w: "✅ OK (Odsalana)", t: "10-15%" },
    "UZ": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "VN": { p: "220V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "YE": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },

    // --- AMERYKA PÓŁNOCNA (NORTH AMERICA) ---
    "AG": { p: "230V [ADAPTER: TAK]", w: "✅ OK (Miasta)", t: "10-15%" },
    "BS": { p: "120V [ADAPTER: TAK]", w: "✅ OK", t: "15% (Wlicz.)" },
    "BB": { p: "115V [ADAPTER: TAK]", w: "✅ OK", t: "10-15%" },
    "BZ": { p: "110V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "CA": { p: "120V [ADAPTER: TAK]", w: "✅ PIJ ŚMIAŁO", t: "15-20% (Standard)" },
    "CR": { p: "120V [ADAPTER: TAK]", w: "✅ OK (Większość)", t: "10% (Wliczone)" },
    "CU": { p: "110V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10% (Waluta!)" },
    "DM": { p: "230V [ADAPTER: TAK]", w: "✅ OK (Góry)", t: "10%" },
    "DO": { p: "110V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10% (+Tax)" },
    "SV": { p: "115V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "GD": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "10%" },
    "GT": { p: "120V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "HT": { p: "110V [ADAPTER: TAK]", w: "☠️ CHOLERA (NIE!)", t: "10%" },
    "HN": { p: "110V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "JM": { p: "110V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10-15%" },
    "MX": { p: "127V [ADAPTER: TAK]", w: "☠️ MONTEZUMA (NIE!)", t: "10-15%" },
    "NI": { p: "120V [ADAPTER: TAK]", w: "✅ OK (Managua)", t: "10%" },
    "PA": { p: "110V [ADAPTER: TAK]", w: "✅ OK (W mieście)", t: "10%" },
    "KN": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "10%" },
    "LC": { p: "240V [ADAPTER: TAK]", w: "✅ OK", t: "10%" },
    "VC": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "10%" },
    "TT": { p: "115V [ADAPTER: TAK]", w: "✅ OK", t: "10-15%" },
    "US": { p: "120V [ADAPTER: TAK]", w: "✅ OK (Chlor)", t: "‼️ 18-20% (OBOWIĄZEK)" },

    // --- AMERYKA POŁUDNIOWA (SOUTH AMERICA) ---
    "AR": { p: "220V [ADAPTER: TAK]", w: "✅ OK (Buenos)", t: "10% (Tylko gotówka!)" }, // Typ I
    "BO": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Drobne" },
    "BR": { p: "127V/220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10% (Standard)" }, // Typ N (pasuje C)
    "CL": { p: "220V [ADAPTER: NIE]", w: "✅ OK (Santiago)", t: "10% (Propina)" },
    "CO": { p: "110V [ADAPTER: TAK]", w: "✅ OK (Bogota)", t: "10% (Voluntario)" },
    "EC": { p: "120V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10% (Ley)" },
    "GY": { p: "240V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "PY": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "PE": { p: "220V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "SR": { p: "127V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "UY": { p: "230V [ADAPTER: NIE]", w: "✅ OK", t: "10%" },
    "VE": { p: "120V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },

    // --- AFRYKA (AFRICA) ---
    "DZ": { p: "230V [ADAPTER: NIE]", w: "⚠️ RACZEJ BUTELKA", t: "10% (Standard)" },
    "AO": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10% (Oczekiwane)" },
    "BJ": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "BW": { p: "230V [ADAPTER: TAK]", w: "✅ OK (Miasta)", t: "10%" },
    "BF": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Drobne" },
    "BI": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Drobne" },
    "CM": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "CV": { p: "220V [ADAPTER: NIE]", w: "⚠️ RACZEJ BUTELKA", t: "5-10%" },
    "CF": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "TD": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "CG": { p: "230V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "CD": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "CI": { p: "230V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "DJ": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Bakszysz" },
    "EG": { p: "220V [ADAPTER: NIE]", w: "☠️ ZEMSTA FARAONA", t: "BAKSZYSZ (Za wszystko!)" },
    "GQ": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "ER": { p: "230V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "SZ": { p: "230V [ADAPTER: TAK]", w: "⚠️ RACZEJ BUTELKA", t: "10%" },
    "ET": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "GA": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "GM": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "GH": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "GN": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "GW": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Drobne" },
    "KM": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Drobne" },
    "KE": { p: "240V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "LS": { p: "220V [ADAPTER: TAK]", w: "✅ OK", t: "10%" },
    "LR": { p: "120V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "LY": { p: "127V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Bakszysz" },
    "MG": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "MW": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "ML": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "MR": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "MU": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Opcjonalne" },
    "MA": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10% (Standard)" },
    "MZ": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "NA": { p: "220V [ADAPTER: TAK]", w: "✅ OK (Miasta)", t: "10%" },
    "NE": { p: "220V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "NG": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "RW": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Opcjonalne" },
    "ST": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "SN": { p: "230V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "SC": { p: "240V [ADAPTER: TAK]", w: "✅ OK (Chlor)", t: "Wliczone" },
    "SL": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "SO": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Nieznane" },
    "ZA": { p: "230V [ADAPTER: TAK]", w: "✅ OK (Miasta)", t: "10-15% (Obowiązek)" }, // Typ M
    "SS": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Nieznane" },
    "SD": { p: "230V [ADAPTER: MOŻE]", w: "☠️ TYLKO BUTELKA", t: "Bakszysz" },
    "TZ": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "TG": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" },
    "TN": { p: "230V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "UG": { p: "240V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "5-10%" },
    "ZM": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },
    "ZW": { p: "220V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "10%" },

    // --- OCEANIA & OTHER ---
    "AU": { p: "230V [ADAPTER: TAK]", w: "✅ PIJ ŚMIAŁO", t: "Nieoczekiwane" },
    "FJ": { p: "240V [ADAPTER: TAK]", w: "⚠️ RACZEJ BUTELKA", t: "Nieoczekiwane" },
    "FM": { p: "120V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nie" },
    "KI": { p: "240V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nie" },
    "MH": { p: "120V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nie" },
    "NR": { p: "240V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nie" },
    "NC": { p: "220V [ADAPTER: NIE]", w: "✅ OK", t: "Nieoczekiwane" },
    "NZ": { p: "230V [ADAPTER: TAK]", w: "✅ PIJ ŚMIAŁO", t: "Nieoczekiwane" },
    "PW": { p: "120V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nie" },
    "PG": { p: "240V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nieoczekiwane" },
    "SB": { p: "220V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nieoczekiwane" },
    "TO": { p: "240V [ADAPTER: TAK]", w: "⚠️ RACZEJ BUTELKA", t: "Nieoczekiwane" },
    "TV": { p: "220V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nie" },
    "VU": { p: "230V [ADAPTER: TAK]", w: "☠️ TYLKO BUTELKA", t: "Nieoczekiwane" },
    "WS": { p: "230V [ADAPTER: TAK]", w: "⚠️ RACZEJ BUTELKA", t: "Nieoczekiwane" },
	
	// --- TERYTORIA ZALEŻNE & PATCHE (WIKTOR UPDATE) ---
    "GL": { p: "230V [ADAPTER: MOŻE]", w: "✅ LODOWCOWA", t: "Wliczone (Dania)" }, // Grenlandia (Typ K)
    "PR": { p: "120V [ADAPTER: TAK]", w: "✅ OK (Miasta)", t: "15-20% (USA Style)" }, // Portoryko
    "GF": { p: "220V [ADAPTER: NIE]", w: "✅ OK (Francuska)", t: "Wliczone" }, // Gujana Fr.
    "RE": { p: "220V [ADAPTER: NIE]", w: "✅ OK (Francuska)", t: "Wliczone" }, // Reunion
    "PF": { p: "110/220V [ADAPTER: TAK]", w: "✅ OK (Tahiti/Bora)", t: "Nieoczekiwane" }, // Polinezja Fr.
    "GP": { p: "230V [ADAPTER: NIE]", w: "✅ OK", t: "Wliczone" }, // Gwadelupa
    "MQ": { p: "220V [ADAPTER: NIE]", w: "✅ OK", t: "Wliczone" }, // Martynika
    "NC": { p: "220V [ADAPTER: NIE]", w: "✅ OK", t: "Nieoczekiwane" }, // Nowa Kaledonia (Check)
    "KY": { p: "120V [ADAPTER: TAK]", w: "✅ OK (Odsalana)", t: "10-15%" }, // Kajmany
    "BM": { p: "120V [ADAPTER: TAK]", w: "✅ OK (Deszczówka)", t: "15-17% (Automat)" }, // Bermudy
    "FK": { p: "240V [ADAPTER: TAK]", w: "✅ OK", t: "10%" }, // Falklandy
    "PS": { p: "230V [ADAPTER: TAK]", w: "⚠️ TYLKO BUTELKA", t: "Oczekiwane" }, // Palestyna
    "EH": { p: "220V [ADAPTER: NIE]", w: "☠️ TYLKO BUTELKA", t: "Oczekiwane" }, // Sahara Zach.
	
	// === DODATEK: DROBNICA, WYSPY I TERYTORIA ZALEŻNE (FULL ISO) ===
    
    // 🇪🇺 EUROPA (MIKRO & ZALEŻNE)
    "FO": { p: "230V [ADAPTER: MOŻE]", w: "✅ KRYSZTAŁ (STRUMIEŃ)", t: "Nie" }, // Wyspy Owcze
    "GI": { p: "240V [ADAPTER: TAK]", w: "✅ OK (Chlor)", t: "10%" }, // Gibraltar (UK)
    "IM": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "10%" }, // Wyspa Man
    "JE": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "10%" }, // Jersey
    "GG": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "10%" }, // Guernsey
    "AX": { p: "230V [ADAPTER: NIE]", w: "✅ OK", t: "Nie" }, // Wyspy Alandzkie
    "SJ": { p: "230V [ADAPTER: MOŻE]", w: "✅ LODOWCOWA", t: "Wliczone" }, // Svalbard

    // 🌴 KARAIBY & ATLANTYK (HOLENDERSKIE/BRYTYJSKIE/FRANCUSKIE)
    "AW": { p: "120V [ADAPTER: TAK]", w: "✅ ODSALANA (TOP)", t: "10-15%" }, // Aruba
    "CW": { p: "127V [ADAPTER: TAK]", w: "✅ ODSALANA", t: "10%" }, // Curacao
    "SX": { p: "110V [ADAPTER: TAK]", w: "✅ OK", t: "10-15%" }, // Sint Maarten
    "BQ": { p: "127V [ADAPTER: TAK]", w: "✅ OK", t: "10%" }, // Bonaire/Saba
    "BL": { p: "230V [ADAPTER: MOŻE]", w: "⚠️ BUTELKA", t: "Wliczone" }, // St. Barthelemy
    "MF": { p: "220V [ADAPTER: NIE]", w: "✅ OK", t: "Wliczone" }, // St. Martin (FR)
    "PM": { p: "230V [ADAPTER: NIE]", w: "✅ OK", t: "Wliczone" }, // St. Pierre & Miquelon
    "AI": { p: "110V [ADAPTER: TAK]", w: "✅ OK (Cysterny)", t: "10%" }, // Anguilla
    "VG": { p: "110V [ADAPTER: TAK]", w: "✅ OK", t: "10-15%" }, // Brytyjskie Wyspy Dziewicze
    "VI": { p: "110V [ADAPTER: TAK]", w: "✅ OK", t: "15-20% (USA)" }, // Wyspy Dziewicze USA
    "TC": { p: "120V [ADAPTER: TAK]", w: "⚠️ BUTELKA (Słona)", t: "15%" }, // Turks & Caicos
    "MS": { p: "230V [ADAPTER: TAK]", w: "✅ OK (Wulkaniczna)", t: "10%" }, // Montserrat

    // 🐧 POŁUDNIE & SAMOTNE SKAŁY
    "SH": { p: "240V [ADAPTER: TAK]", w: "✅ OK", t: "10%" }, // Święta Helena
    "GS": { p: "230V [ADAPTER: TAK]", w: "✅ LODOWCOWA", t: "Brak ludzi" }, // Georgia Południowa

    // 🕌 AFRYKA & INDYJSKI
    "YT": { p: "230V [ADAPTER: NIE]", w: "⚠️ BUTELKA", t: "Nie" }, // Majotta
    "IO": { p: "240V [ADAPTER: TAK]", w: "⚠️ BAZA WOJSKOWA", t: "N/A" }, // BIOT (Diego Garcia)

    // 🌏 PACYFIK & AZJA (DODATKI)
    "MO": { p: "220V [ADAPTER: TAK]", w: "⚠️ RACZEJ BUTELKA", t: "10%" }, // Makau
    "GU": { p: "110V [ADAPTER: TAK]", w: "✅ OK", t: "10-15%" }, // Guam
    "MP": { p: "110V [ADAPTER: TAK]", w: "✅ OK", t: "10%" }, // Mariany Północne
    "AS": { p: "120V [ADAPTER: TAK]", w: "✅ OK", t: "Nie" }, // Samoa Amerykańskie
    "CK": { p: "240V [ADAPTER: TAK]", w: "✅ OK", t: "Nie" }, // Wyspy Cooka
    "NU": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "Nie" }, // Niue
    "TK": { p: "230V [ADAPTER: TAK]", w: "⚠️ DESZCZÓWKA", t: "Nie" }, // Tokelau
    "WF": { p: "220V [ADAPTER: NIE]", w: "✅ OK", t: "Nie" }, // Wallis & Futuna
    "NF": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "Nie" }, // Norfolk
    "PN": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "Nie" }, // Pitcairn
    "CX": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "Nie" }, // Wyspa Bożego Narodzenia
    "CC": { p: "230V [ADAPTER: TAK]", w: "✅ OK", t: "Nie" },  // Wyspy Kokosowe
	
	// [STREFA 51 / BEZLUDNE / NAUKOWE / POLARNE]

    "TF": { p: "230V [ADAPTER: NIE]", w: "✅ OK (Kerguelen)", t: "Baza FR (Naukowcy)" }, // Francuskie Terytoria Południowe
    "HM": { p: "230V [ADAPTER: TAK]", w: "❄️ LODOWCOWA", t: "Bezludna (AU)" }, // Wyspy Heard i McDonalda
    "BV": { p: "230V [ADAPTER: NIE]", w: "❄️ LODOWCOWA", t: "Bezludna (NO)" }, // Wyspa Bouveta
    "AQ": { p: "RÓŻNE [ADAPTER: MULTI]", w: "❄️ Z TOPIONEGO LODU", t: "Stacje Badawcze" }, // Antarktyda (Jeśli zdejmiesz exclude: ["AQ"])
	// Patch dla pod-wysp UM (dziedziczą dane z głównego UM):
"UM": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Baza USA (Restricted)" },
    "UM-DQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Jarvis Island (Restricted)" },
    "UM-FQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Baker Island (Restricted)" },
    "UM-HQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Howland Island (Restricted)" },
    "UM-JQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Johnston Atoll (Restricted)" },
    "UM-KQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Kingman Reef (Restricted)" },
    "UM-MQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Midway Atoll (Restricted)" },
    "UM-NQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Navassa Island (Restricted)" },
    "UM-PQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Palmyra Atoll (Restricted)" },
    "UM-WQ": { p: "120V [ADAPTER: TAK]", w: "☢️ DESZCZÓWKA/IMPORT", t: "Wake Island (Restricted)" },
};

// FALLBACK
function getIntel(id) {
    if (INTEL_DB[id]) return INTEL_DB[id];
    return { 
        p: "SPRAWDŹ [ADAPTER?]", 
        w: "⚠️ NIEZNANE (BUTELKA)", 
        t: "ZALEŻY OD KRAJU" 
    };
}

const QPP_LINKS = {
			"PF": "https://www.qppstudio.net/public-holidays/french_polynesia.htm",
			"RE": "https://www.qppstudio.net/public-holidays/r_union.htm",
			"PR": "https://www.qppstudio.net/public-holidays/puerto_rico.htm",
            "AF": "https://www.qppstudio.net/public-holidays/afghanistan.htm",
            "AL": "https://www.qppstudio.net/public-holidays/albania.htm",
            "DZ": "https://www.qppstudio.net/public-holidays/algeria.htm",
            "AD": "https://www.qppstudio.net/public-holidays/andorra.htm",
            "AO": "https://www.qppstudio.net/public-holidays/angola.htm",
            "AG": "https://www.qppstudio.net/public-holidays/antigua_and_barbuda.htm",
            "AR": "https://www.qppstudio.net/public-holidays/argentina.htm",
            "AM": "https://www.qppstudio.net/public-holidays/armenia.htm",
            "AU": "https://www.qppstudio.net/public-holidays/australia.htm",
            "AT": "https://www.qppstudio.net/public-holidays/austria.htm",
            "AZ": "https://www.qppstudio.net/public-holidays/azerbaijan.htm",
            "BS": "https://www.qppstudio.net/public-holidays/bahamas.htm",
            "BH": "https://www.qppstudio.net/public-holidays/bahrain.htm",
            "BD": "https://www.qppstudio.net/public-holidays/bangladesh.htm",
            "BB": "https://www.qppstudio.net/public-holidays/barbados.htm",
            "BY": "https://www.qppstudio.net/public-holidays/belarus.htm",
            "BE": "https://www.qppstudio.net/public-holidays/belgium.htm",
            "BZ": "https://www.qppstudio.net/public-holidays/belize.htm",
            "BJ": "https://www.qppstudio.net/public-holidays/benin.htm",
            "BT": "https://www.qppstudio.net/public-holidays/bhutan.htm",
            "BO": "https://www.qppstudio.net/public-holidays/bolivia.htm",
            "BA": "https://www.qppstudio.net/public-holidays/bosnia_and_herzegovina.htm",
            "BW": "https://www.qppstudio.net/public-holidays/botswana.htm",
            "BR": "https://www.qppstudio.net/public-holidays/brazil.htm",
            "BN": "https://www.qppstudio.net/public-holidays/brunei.htm",
            "BG": "https://www.qppstudio.net/public-holidays/bulgaria.htm",
            "BF": "https://www.qppstudio.net/public-holidays/burkina_faso.htm",
            "MM": "https://www.qppstudio.net/public-holidays/myanmar-burma.htm",
            "BI": "https://www.qppstudio.net/public-holidays/burundi.htm",
            "KH": "https://www.qppstudio.net/public-holidays/cambodia.htm",
            "CM": "https://www.qppstudio.net/public-holidays/cameroon.htm",
            "CA": "https://www.qppstudio.net/public-holidays/canada.htm",
            "CV": "https://www.qppstudio.net/public-holidays/cape_verde.htm",
            "CF": "https://www.qppstudio.net/public-holidays/central_african_republic.htm",
            "LK": "https://www.qppstudio.net/public-holidays/sri_lanka.htm",
            "TD": "https://www.qppstudio.net/public-holidays/chad.htm",
            "CL": "https://www.qppstudio.net/public-holidays/chile.htm",
            "CN": "https://www.qppstudio.net/public-holidays/china.htm",
            "CO": "https://www.qppstudio.net/public-holidays/colombia.htm",
            "KM": "https://www.qppstudio.net/public-holidays/comoros.htm",
            "CD": "https://www.qppstudio.net/public-holidays/democratic-republic-of-the-congo-drc.htm",
            "CG": "https://www.qppstudio.net/public-holidays/republic-of-the-congo-brazzaville.htm",
            "CR": "https://www.qppstudio.net/public-holidays/costa_rica.htm",
            "CI": "https://www.qppstudio.net/public-holidays/cote-d-ivoire-ivory-coast.htm",
            "HR": "https://www.qppstudio.net/public-holidays/croatia.htm",
            "CU": "https://www.qppstudio.net/public-holidays/cuba.htm",
            "CY": "https://www.qppstudio.net/public-holidays/cyprus.htm",
            "CZ": "https://www.qppstudio.net/public-holidays/czech_republic.htm",
            "DK": "https://www.qppstudio.net/public-holidays/denmark.htm",
            "DJ": "https://www.qppstudio.net/public-holidays/djibouti.htm",
            "DM": "https://www.qppstudio.net/public-holidays/dominica.htm",
            "DO": "https://www.qppstudio.net/public-holidays/dominican_republic.htm",
            "TL": "https://www.qppstudio.net/public-holidays/east_timor.htm",
            "EC": "https://www.qppstudio.net/public-holidays/ecuador.htm",
            "EG": "https://www.qppstudio.net/public-holidays/egypt.htm",
            "SV": "https://www.qppstudio.net/public-holidays/el_salvador.htm",
            "GQ": "https://www.qppstudio.net/public-holidays/guinea__equatorial.htm",
            "ER": "https://www.qppstudio.net/public-holidays/eritrea.htm",
            "EE": "https://www.qppstudio.net/public-holidays/estonia.htm",
            "SZ": "https://www.qppstudio.net/public-holidays/eswatini-swaziland.htm",
            "ET": "https://www.qppstudio.net/public-holidays/ethiopia.htm",
            "FJ": "https://www.qppstudio.net/public-holidays/fiji.htm",
            "FI": "https://www.qppstudio.net/public-holidays/finland.htm",
            "FR": "https://www.qppstudio.net/public-holidays/france.htm",
            "GA": "https://www.qppstudio.net/public-holidays/gabon.htm",
            "GM": "https://www.qppstudio.net/public-holidays/gambia.htm",
            "GE": "https://www.qppstudio.net/public-holidays/georgia.htm",
            "DE": "https://www.qppstudio.net/public-holidays/germany.htm",
            "GH": "https://www.qppstudio.net/public-holidays/ghana.htm",
            "GR": "https://www.qppstudio.net/public-holidays/greece.htm",
            "GD": "https://www.qppstudio.net/public-holidays/grenada.htm",
            "GT": "https://www.qppstudio.net/public-holidays/guatemala.htm",
            "GN": "https://www.qppstudio.net/public-holidays/guinea.htm",
            "GW": "https://www.qppstudio.net/public-holidays/guinea_bissau.htm",
            "GY": "https://www.qppstudio.net/public-holidays/guyana.htm",
            "HT": "https://www.qppstudio.net/public-holidays/haiti.htm",
            "NL": "https://www.qppstudio.net/public-holidays/netherlands.htm",
            "VA": "https://www.qppstudio.net/public-holidays/holy_see__vatican_city_.htm",
            "HN": "https://www.qppstudio.net/public-holidays/honduras.htm",
            "HU": "https://www.qppstudio.net/public-holidays/hungary.htm",
            "IS": "https://www.qppstudio.net/public-holidays/iceland.htm",
            "IN": "https://www.qppstudio.net/public-holidays/india.htm",
            "ID": "https://www.qppstudio.net/public-holidays/indonesia.htm",
            "IR": "https://www.qppstudio.net/public-holidays/iran.htm",
            "IQ": "https://www.qppstudio.net/public-holidays/iraq.htm",
            "IE": "https://www.qppstudio.net/public-holidays/ireland.htm",
            "IL": "https://www.qppstudio.net/public-holidays/israel.htm",
            "IT": "https://www.qppstudio.net/public-holidays/italy.htm",
            "JM": "https://www.qppstudio.net/public-holidays/jamaica.htm",
            "JP": "https://www.qppstudio.net/public-holidays/japan.htm",
            "JO": "https://www.qppstudio.net/public-holidays/jordan.htm",
            "KZ": "https://www.qppstudio.net/public-holidays/kazakhstan.htm",
            "KE": "https://www.qppstudio.net/public-holidays/kenya.htm",
            "KI": "https://www.qppstudio.net/public-holidays/kiribati.htm",
            "KP": "https://www.qppstudio.net/public-holidays/north_korea.htm",
            "KR": "https://www.qppstudio.net/public-holidays/south_korea.htm",
            "XK": "https://www.qppstudio.net/public-holidays/kosovo.htm",
            "KW": "https://www.qppstudio.net/public-holidays/kuwait.htm",
            "KG": "https://www.qppstudio.net/public-holidays/kyrgyzstan.htm",
            "LA": "https://www.qppstudio.net/public-holidays/laos.htm",
            "LV": "https://www.qppstudio.net/public-holidays/latvia.htm",
            "LB": "https://www.qppstudio.net/public-holidays/lebanon.htm",
            "LS": "https://www.qppstudio.net/public-holidays/lesotho.htm",
            "LR": "https://www.qppstudio.net/public-holidays/liberia.htm",
            "LY": "https://www.qppstudio.net/public-holidays/libya.htm",
            "LI": "https://www.qppstudio.net/public-holidays/liechtenstein.htm",
            "LT": "https://www.qppstudio.net/public-holidays/lithuania.htm",
            "LU": "https://www.qppstudio.net/public-holidays/luxembourg.htm",
            "MK": "https://www.qppstudio.net/public-holidays/macedonia.htm",
            "MG": "https://www.qppstudio.net/public-holidays/madagascar.htm",
            "MW": "https://www.qppstudio.net/public-holidays/malawi.htm",
            "MY": "https://www.qppstudio.net/public-holidays/malaysia.htm",
            "MV": "https://www.qppstudio.net/public-holidays/maldives.htm",
            "ML": "https://www.qppstudio.net/public-holidays/mali.htm",
            "MT": "https://www.qppstudio.net/public-holidays/malta.htm",
            "MH": "https://www.qppstudio.net/public-holidays/marshall_islands.htm",
            "MR": "https://www.qppstudio.net/public-holidays/mauritania.htm",
            "MU": "https://www.qppstudio.net/public-holidays/mauritius.htm",
            "MX": "https://www.qppstudio.net/public-holidays/mexico.htm",
            "FM": "https://www.qppstudio.net/public-holidays/micronesia.htm",
            "MD": "https://www.qppstudio.net/public-holidays/moldova.htm",
            "MC": "https://www.qppstudio.net/public-holidays/monaco.htm",
            "MN": "https://www.qppstudio.net/public-holidays/mongolia.htm",
            "ME": "https://www.qppstudio.net/public-holidays/montenegro.htm",
            "MA": "https://www.qppstudio.net/public-holidays/morocco.htm",
            "MZ": "https://www.qppstudio.net/public-holidays/mozambique.htm",
            "NA": "https://www.qppstudio.net/public-holidays/namibia.htm",
            "NR": "https://www.qppstudio.net/public-holidays/nauru.htm",
            "NP": "https://www.qppstudio.net/public-holidays/nepal.htm",
            "PG": "https://www.qppstudio.net/public-holidays/papua_new_guinea.htm",
            "NZ": "https://www.qppstudio.net/public-holidays/new_zealand.htm",
            "NI": "https://www.qppstudio.net/public-holidays/nicaragua.htm",
            "NE": "https://www.qppstudio.net/public-holidays/niger.htm",
            "NG": "https://www.qppstudio.net/public-holidays/nigeria.htm",
            "NO": "https://www.qppstudio.net/public-holidays/norway.htm",
            "OM": "https://www.qppstudio.net/public-holidays/oman.htm",
            "PK": "https://www.qppstudio.net/public-holidays/pakistan.htm",
            "PW": "https://www.qppstudio.net/public-holidays/palau.htm",
            "PA": "https://www.qppstudio.net/public-holidays/panama.htm",
            "PY": "https://www.qppstudio.net/public-holidays/paraguay.htm",
            "PE": "https://www.qppstudio.net/public-holidays/peru.htm",
            "PH": "https://www.qppstudio.net/public-holidays/philippines.htm",
            "PL": "https://www.qppstudio.net/public-holidays/poland.htm",
            "PT": "https://www.qppstudio.net/public-holidays/portugal.htm",
            "QA": "https://www.qppstudio.net/public-holidays/qatar.htm",
            "RO": "https://www.qppstudio.net/public-holidays/romania.htm",
            "RU": "https://www.qppstudio.net/public-holidays/russia.htm",
            "RW": "https://www.qppstudio.net/public-holidays/rwanda.htm",
            "KN": "https://www.qppstudio.net/public-holidays/saint_kitts_and_nevis.htm",
            "LC": "https://www.qppstudio.net/public-holidays/saint_lucia.htm",
            "VC": "https://www.qppstudio.net/public-holidays/saint_vincent_and_grenadines.htm",
            "WS": "https://www.qppstudio.net/public-holidays/samoa.htm",
            "SM": "https://www.qppstudio.net/public-holidays/san_marino.htm",
            "ST": "https://www.qppstudio.net/public-holidays/sao_tome_and_principe.htm",
            "SA": "https://www.qppstudio.net/public-holidays/saudi_arabia.htm",
            "SN": "https://www.qppstudio.net/public-holidays/senegal.htm",
            "RS": "https://www.qppstudio.net/public-holidays/serbia.htm",
            "SC": "https://www.qppstudio.net/public-holidays/seychelles.htm",
            "SL": "https://www.qppstudio.net/public-holidays/sierra_leone.htm",
            "SG": "https://www.qppstudio.net/public-holidays/singapore.htm",
            "SK": "https://www.qppstudio.net/public-holidays/slovakia.htm",
            "SI": "https://www.qppstudio.net/public-holidays/slovenia.htm",
            "SB": "https://www.qppstudio.net/public-holidays/solomon_islands.htm",
            "SO": "https://www.qppstudio.net/public-holidays/somalia.htm",
            "ZA": "https://www.qppstudio.net/public-holidays/south_africa.htm",
            "SS": "https://www.qppstudio.net/public-holidays/south_sudan.htm",
            "ES": "https://www.qppstudio.net/public-holidays/spain.htm",
            "SD": "https://www.qppstudio.net/public-holidays/sudan.htm",
            "SR": "https://www.qppstudio.net/public-holidays/suriname.htm",
            "SE": "https://www.qppstudio.net/public-holidays/sweden.htm",
            "CH": "https://www.qppstudio.net/public-holidays/switzerland.htm",
            "SY": "https://www.qppstudio.net/public-holidays/syria.htm",
            "TW": "https://www.qppstudio.net/public-holidays/taiwan.htm",
            "TJ": "https://www.qppstudio.net/public-holidays/tajikistan.htm",
            "TZ": "https://www.qppstudio.net/public-holidays/tanzania.htm",
            "TH": "https://www.qppstudio.net/public-holidays/thailand.htm",
            "TG": "https://www.qppstudio.net/public-holidays/togo.htm",
            "TO": "https://www.qppstudio.net/public-holidays/tonga.htm",
            "TT": "https://www.qppstudio.net/public-holidays/trinidad_and_tobago.htm",
            "TN": "https://www.qppstudio.net/public-holidays/tunisia.htm",
            "TR": "https://www.qppstudio.net/public-holidays/turkiye-turkey.htm",
            "TM": "https://www.qppstudio.net/public-holidays/turkmenistan.htm",
            "TV": "https://www.qppstudio.net/public-holidays/tuvalu.htm",
            "AE": "https://www.qppstudio.net/public-holidays/uae__united_arab_emirates_.htm",
            "UG": "https://www.qppstudio.net/public-holidays/uganda.htm",
            "GB": "https://www.qppstudio.net/public-holidays/uk__united_kingdom_.htm",
            "UA": "https://www.qppstudio.net/public-holidays/ukraine.htm",
            "UY": "https://www.qppstudio.net/public-holidays/uruguay.htm",
            "US": "https://www.qppstudio.net/public-holidays/usa__united_states_.htm",
            "UZ": "https://www.qppstudio.net/public-holidays/uzbekistan.htm",
            "VU": "https://www.qppstudio.net/public-holidays/vanuatu.htm",
            "VE": "https://www.qppstudio.net/public-holidays/venezuela.htm",
            "VN": "https://www.qppstudio.net/public-holidays/vietnam.htm",
            "YE": "https://www.qppstudio.net/public-holidays/yemen.htm",
            "ZM": "https://www.qppstudio.net/public-holidays/zambia.htm",
            "ZW": "https://www.qppstudio.net/public-holidays/zimbabwe.htm",
			"NC": "https://www.qppstudio.net/public-holidays/new_caledonia.htm",
			"KY": "https://www.qppstudio.net/public-holidays/cayman_islands.htm",
			"FK": "https://www.qppstudio.net/public-holidays/falkland_islands.htm",
			"PS": "https://www.qppstudio.net/public-holidays/west_bank.htm",
			"FO": "https://www.qppstudio.net/public-holidays/faroe_islands.htm",
			"IM": "https://www.qppstudio.net/public-holidays/isle_of_man.htm",
			"GG": "https://www.qppstudio.net/public-holidays/guernsey_and_alderney.htm",
			"AX": "https://www.qppstudio.net/public-holidays/aland.htm",
			"SJ": "https://www.qppstudio.net/public-holidays/svalbard_and_jan_mayen.htm",
			"SX": "https://www.qppstudio.net/public-holidays/sint_maarten.htm",
			"BQ": "https://www.qppstudio.net/public-holidays/bonaire__st_eustatius_and_saba.htm",
			"BL": "https://www.qppstudio.net/public-holidays/saint_barth_lemy.htm",
			"MF": "https://www.qppstudio.net/public-holidays/saint_martin.htm",
			"PM": "https://www.qppstudio.net/public-holidays/saint_pierre_et_miquelon.htm",
			"VG": "https://www.qppstudio.net/public-holidays/british_virgin_islands.htm",
			"VI": "https://www.qppstudio.net/public-holidays/virgin_islands__u_s_.htm",
			"TC": "https://www.qppstudio.net/public-holidays/turks_and_caicos_islands.htm",
			"SH": "https://www.qppstudio.net/public-holidays/saint_helena.htm",
			"HK": "https://www.qppstudio.net/public-holidays/hong_kong.htm",
			"MP": "https://www.qppstudio.net/public-holidays/northern_mariana_islands.htm",
			"AS": "https://www.qppstudio.net/public-holidays/american_samoa.htm",
			"CK": "https://www.qppstudio.net/public-holidays/cook_islands.htm",
			"WF": "https://www.qppstudio.net/public-holidays/wallis_and_futuna.htm",
			"NF": "https://www.qppstudio.net/public-holidays/norfolk_island.htm",
			"PN": "https://www.qppstudio.net/public-holidays/pitcairn_islands.htm",
			"CX": "https://www.qppstudio.net/public-holidays/christmas_island.htm",
			"CC": "https://www.qppstudio.net/public-holidays/cocos__keeling__islands.htm"
        };
		
				// === TIME AND DATE FIXES (CLIMATE & WEATHER) ===
				// Używane do generowania poprawnych linków: timeanddate.com/weather/KRAJ/MIASTO/climate
				
				const TAD_COUNTRY_OVERRIDES = {
					"TT": "trinidad-and-tobago",
					"US": "usa",
					"GB": "uk",
					"MK": "republic-of-macedonia",
					"BA": "bosnia-herzegovina",
					"CG": "congo",
					"CD": "congo-demrep",
					"CI": "cote-divoire",
					"TL": "timor-leste",
					"KZ": "kazakstan",
					"SZ": "swaziland",
					"FM": "micronesia",
					"PF": "france/papeete",
					"GF": "france/cayenne",
					"PR": "puerto-rico/san-juan",
					"FK": "falkland/stanley",
					"RE": "reunion/saint-pierre",
					"PF": "france/papeete",
					"GP": "guadeloupe/basse-terre",
					"MQ": "martinique/fort-de-france",
					"NC": "france/noumea",
					"KY": "cayman-islands/george-town",
					"BM": "bermuda/hamilton",
					"PS": "palestine/khan-yunis",
					"EH": "western-sahara/el-aaiun",
					"FO": "faroe/torshavn",
					"GI": "gibraltar/gibraltar",
					"IM": "isle-of-man/douglas",
					"JE": "jersey/saint-helier",
					"GG": "guernsey/saint-anne-alderney",
					"AX": "finland/mariehamn",
					"SJ": "norway/ny-alesund",
					"AW": "aruba-state/oranjestad",
					"CW": "curacao/willemstad",
					"SX": "sint-maarten/philipsburg",
					"BQ": "caribbean-netherlands/kralendijk-bonaire",
					"BL": "france/gustavia",
					"MF": "saint-martin/marigot",
					"PM": "st-pierre-miquelon/saint-pierre",
					"AI": "anguilla/the-valley",
					"VG": "british-virgin-islands/road-town",
					"VI": "us-virgin/christiansted",
					"TC": "turks-caicos/providenciales",
					"MS": "montserrat/brades",
					"SH": "saint-helena/georgetown-ascension-island",
					"GS": "south-georgia-sandwich/king-edward-point",
					"YT": "mayotte/mamoudzou",
					"IO": "biot/diego-garcia",
					"HK": "hong-kong/hong-kong",
					"MO": "macau/macau",
					"GU": "usa/guam-hagatna",
					"MP": "usa/saipan",
					"AS": "usa/pago-pago",
					"CK": "cook-islands/aitutaki",
					"NU": "niue/alofi",
					"TK": "tokelau/fakaofo",
					"WF": "france/mata-utu",
					"NF": "norfolk-island/kingston",
					"PN": "pitcairn/adamstown",
					"CX": "australia/the-settlement",
					"CC": "cocos/bantam",
					"AQ": "antarctica/south-pole",
					"TF": "france/martin-de-vivies-amsterdam-island",
					"HM": "@1547315",
					"BV": "norway/bouvet-island"
				};
				
				const TAD_CITY_OVERRIDES = {
					"Sana'a": "sana",
					"Sanaa": "sana",
					"Washington, D.C.": "washington-dc",
					"Washington DC": "washington-dc",
					"city-of-san-marino": "san-marino",
					"sri-jayawardenepura-kotte": "sri-jayawardenapura-kotte",
					"south-tarawa": "tarawa",
					"nuku'alofa": "nukualofa"
										
					};
		

		
		// --- SIM WIKI HARDCODED LINKS (NO GUESSING) ---
        const SIM_WIKI_LINKS = {
            "AL": "https://prepaid-data-sim-card.fandom.com/wiki/Albania",
            "DZ": "https://prepaid-data-sim-card.fandom.com/wiki/Algeria",
            "AD": "https://prepaid-data-sim-card.fandom.com/wiki/Andorra",
            "AO": "https://prepaid-data-sim-card.fandom.com/wiki/Angola",
            "AG": "https://prepaid-data-sim-card.fandom.com/wiki/Antigua_and_Barbuda",
            "AR": "https://prepaid-data-sim-card.fandom.com/wiki/Argentina",
            "AM": "https://prepaid-data-sim-card.fandom.com/wiki/Armenia",
            "AU": "https://prepaid-data-sim-card.fandom.com/wiki/Australia",
            "AT": "https://prepaid-data-sim-card.fandom.com/wiki/Austria",
            "AZ": "https://prepaid-data-sim-card.fandom.com/wiki/Azerbaijan",
            "BS": "https://prepaid-data-sim-card.fandom.com/wiki/Bahamas",
            "BH": "https://prepaid-data-sim-card.fandom.com/wiki/Bahrain",
            "BD": "https://prepaid-data-sim-card.fandom.com/wiki/Bangladesh",
            "BB": "https://prepaid-data-sim-card.fandom.com/wiki/Barbados",
            "BY": "https://prepaid-data-sim-card.fandom.com/wiki/Belarus",
            "BE": "https://prepaid-data-sim-card.fandom.com/wiki/Belgium",
            "BZ": "https://prepaid-data-sim-card.fandom.com/wiki/Belize",
            "BJ": "https://prepaid-data-sim-card.fandom.com/wiki/Benin",
            "BT": "https://prepaid-data-sim-card.fandom.com/wiki/Bhutan",
            "BO": "https://prepaid-data-sim-card.fandom.com/wiki/Bolivia",
            "BA": "https://prepaid-data-sim-card.fandom.com/wiki/Bosnia_and_Herzegovina",
            "BW": "https://prepaid-data-sim-card.fandom.com/wiki/Botswana",
            "BR": "https://prepaid-data-sim-card.fandom.com/wiki/Brazil",
            "BN": "https://prepaid-data-sim-card.fandom.com/wiki/Brunei",
            "BG": "https://prepaid-data-sim-card.fandom.com/wiki/Bulgaria",
            "BF": "https://prepaid-data-sim-card.fandom.com/wiki/Burkina_Faso",
            "BI": "https://prepaid-data-sim-card.fandom.com/wiki/Burundi",
            "KH": "https://prepaid-data-sim-card.fandom.com/wiki/Cambodia",
            "CM": "https://prepaid-data-sim-card.fandom.com/wiki/Cameroon",
            "CA": "https://prepaid-data-sim-card.fandom.com/wiki/Canada",
            "CV": "https://prepaid-data-sim-card.fandom.com/wiki/Cape_Verde",
            "TD": "https://prepaid-data-sim-card.fandom.com/wiki/Chad",
            "CL": "https://prepaid-data-sim-card.fandom.com/wiki/Chile",
            "CN": "https://prepaid-data-sim-card.fandom.com/wiki/China",
            "CO": "https://prepaid-data-sim-card.fandom.com/wiki/Colombia",
            "KM": "https://prepaid-data-sim-card.fandom.com/wiki/Comoros",
            "CR": "https://prepaid-data-sim-card.fandom.com/wiki/Costa_Rica",
            "CI": "https://prepaid-data-sim-card.fandom.com/wiki/C%C3%B4te_d%27Ivoire",
            "HR": "https://prepaid-data-sim-card.fandom.com/wiki/Croatia",
            "CU": "https://prepaid-data-sim-card.fandom.com/wiki/Cuba",
            "CY": "https://prepaid-data-sim-card.fandom.com/wiki/Cyprus",
            "CZ": "https://prepaid-data-sim-card.fandom.com/wiki/Czech_Republic",
            "DK": "https://prepaid-data-sim-card.fandom.com/wiki/Denmark",
            "DJ": "https://prepaid-data-sim-card.fandom.com/wiki/Djibouti",
            "DM": "https://prepaid-data-sim-card.fandom.com/wiki/Dominica",
            "DO": "https://prepaid-data-sim-card.fandom.com/wiki/Dominican_Republic",
            "EC": "https://prepaid-data-sim-card.fandom.com/wiki/Ecuador",
            "EG": "https://prepaid-data-sim-card.fandom.com/wiki/Egypt",
            "SV": "https://prepaid-data-sim-card.fandom.com/wiki/El_Salvador",
            "GQ": "https://prepaid-data-sim-card.fandom.com/wiki/Equatorial_Guinea",
            "EE": "https://prepaid-data-sim-card.fandom.com/wiki/Estonia",
            "SZ": "https://prepaid-data-sim-card.fandom.com/wiki/Eswatini",
            "ET": "https://prepaid-data-sim-card.fandom.com/wiki/Ethiopia",
            "FJ": "https://prepaid-data-sim-card.fandom.com/wiki/Fiji",
            "FI": "https://prepaid-data-sim-card.fandom.com/wiki/Finland",
            "FR": "https://prepaid-data-sim-card.fandom.com/wiki/France",
            "GA": "https://prepaid-data-sim-card.fandom.com/wiki/Gabon",
            "GM": "https://prepaid-data-sim-card.fandom.com/wiki/Gambia",
            "GE": "https://prepaid-data-sim-card.fandom.com/wiki/Georgia",
            "DE": "https://prepaid-data-sim-card.fandom.com/wiki/Germany",
            "GH": "https://prepaid-data-sim-card.fandom.com/wiki/Ghana",
            "GR": "https://prepaid-data-sim-card.fandom.com/wiki/Greece",
            "GD": "https://prepaid-data-sim-card.fandom.com/wiki/Grenada",
            "GT": "https://prepaid-data-sim-card.fandom.com/wiki/Guatemala",
            "GN": "https://prepaid-data-sim-card.fandom.com/wiki/Guinea",
            "GW": "https://prepaid-data-sim-card.fandom.com/wiki/Guinea-Bissau",
            "GY": "https://prepaid-data-sim-card.fandom.com/wiki/Guyana",
            "HT": "https://prepaid-data-sim-card.fandom.com/wiki/Haiti",
            "HN": "https://prepaid-data-sim-card.fandom.com/wiki/Honduras",
            "HU": "https://prepaid-data-sim-card.fandom.com/wiki/Hungary",
            "IS": "https://prepaid-data-sim-card.fandom.com/wiki/Iceland",
            "IN": "https://prepaid-data-sim-card.fandom.com/wiki/India",
            "ID": "https://prepaid-data-sim-card.fandom.com/wiki/Indonesia",
            "IR": "https://prepaid-data-sim-card.fandom.com/wiki/Iran",
            "IE": "https://prepaid-data-sim-card.fandom.com/wiki/Ireland",
            "IL": "https://prepaid-data-sim-card.fandom.com/wiki/Israel",
            "IT": "https://prepaid-data-sim-card.fandom.com/wiki/Italy",
            "JM": "https://prepaid-data-sim-card.fandom.com/wiki/Jamaica",
            "JP": "https://prepaid-data-sim-card.fandom.com/wiki/Japan",
            "JO": "https://prepaid-data-sim-card.fandom.com/wiki/Jordan",
            "KZ": "https://prepaid-data-sim-card.fandom.com/wiki/Kazakhstan",
            "KE": "https://prepaid-data-sim-card.fandom.com/wiki/Kenya",
            "KI": "https://prepaid-data-sim-card.fandom.com/wiki/Kiribati",
            "KP": "https://prepaid-data-sim-card.fandom.com/wiki/Korea_(North)",
            "KR": "https://prepaid-data-sim-card.fandom.com/wiki/Korea,_Republic_of_(South)",
            "XK": "https://prepaid-data-sim-card.fandom.com/wiki/Kosovo,_Republic_of",
            "KW": "https://prepaid-data-sim-card.fandom.com/wiki/Kuwait",
            "KG": "https://prepaid-data-sim-card.fandom.com/wiki/Kyrgyzstan",
            "LA": "https://prepaid-data-sim-card.fandom.com/wiki/Laos",
            "LV": "https://prepaid-data-sim-card.fandom.com/wiki/Latvia",
            "LB": "https://prepaid-data-sim-card.fandom.com/wiki/Lebanon",
            "LS": "https://prepaid-data-sim-card.fandom.com/wiki/Lesotho",
            "LR": "https://prepaid-data-sim-card.fandom.com/wiki/Liberia",
            "LI": "https://prepaid-data-sim-card.fandom.com/wiki/Liechtenstein",
            "LT": "https://prepaid-data-sim-card.fandom.com/wiki/Lithuania",
            "LU": "https://prepaid-data-sim-card.fandom.com/wiki/Luxembourg",
            "MG": "https://prepaid-data-sim-card.fandom.com/wiki/Madagascar",
            "MW": "https://prepaid-data-sim-card.fandom.com/wiki/Malawi",
            "MY": "https://prepaid-data-sim-card.fandom.com/wiki/Malaysia",
            "MV": "https://prepaid-data-sim-card.fandom.com/wiki/Maldives",
            "ML": "https://prepaid-data-sim-card.fandom.com/wiki/Mali",
            "MT": "https://prepaid-data-sim-card.fandom.com/wiki/Malta",
            "MR": "https://prepaid-data-sim-card.fandom.com/wiki/Mauritania",
            "MU": "https://prepaid-data-sim-card.fandom.com/wiki/Mauritius",
            "MX": "https://prepaid-data-sim-card.fandom.com/wiki/Mexico",
            "FM": "https://prepaid-data-sim-card.fandom.com/wiki/Micronesia",
            "MD": "https://prepaid-data-sim-card.fandom.com/wiki/Moldova",
            "MC": "https://prepaid-data-sim-card.fandom.com/wiki/Monaco",
            "MN": "https://prepaid-data-sim-card.fandom.com/wiki/Mongolia",
            "ME": "https://prepaid-data-sim-card.fandom.com/wiki/Montenegro",
            "MA": "https://prepaid-data-sim-card.fandom.com/wiki/Morocco",
            "MZ": "https://prepaid-data-sim-card.fandom.com/wiki/Mozambique",
            "MM": "https://prepaid-data-sim-card.fandom.com/wiki/Myanmar",
            "NA": "https://prepaid-data-sim-card.fandom.com/wiki/Namibia",
            "NR": "https://prepaid-data-sim-card.fandom.com/wiki/Nauru",
            "NP": "https://prepaid-data-sim-card.fandom.com/wiki/Nepal",
            "NL": "https://prepaid-data-sim-card.fandom.com/wiki/Netherlands",
            "NZ": "https://prepaid-data-sim-card.fandom.com/wiki/New_Zealand",
            "NI": "https://prepaid-data-sim-card.fandom.com/wiki/Nicaragua",
            "NE": "https://prepaid-data-sim-card.fandom.com/wiki/Niger",
            "NG": "https://prepaid-data-sim-card.fandom.com/wiki/Nigeria",
            "NO": "https://prepaid-data-sim-card.fandom.com/wiki/Norway",
            "OM": "https://prepaid-data-sim-card.fandom.com/wiki/Oman",
            "PK": "https://prepaid-data-sim-card.fandom.com/wiki/Pakistan",
            "PW": "https://prepaid-data-sim-card.fandom.com/wiki/Palau",
            "PA": "https://prepaid-data-sim-card.fandom.com/wiki/Panama",
            "PG": "https://prepaid-data-sim-card.fandom.com/wiki/Papua_New_Guinea",
            "PY": "https://prepaid-data-sim-card.fandom.com/wiki/Paraguay",
            "PE": "https://prepaid-data-sim-card.fandom.com/wiki/Peru",
            "PH": "https://prepaid-data-sim-card.fandom.com/wiki/Philippines",
            "PL": "https://prepaid-data-sim-card.fandom.com/wiki/Poland",
            "PT": "https://prepaid-data-sim-card.fandom.com/wiki/Portugal",
            "QA": "https://prepaid-data-sim-card.fandom.com/wiki/Qatar",
            "RO": "https://prepaid-data-sim-card.fandom.com/wiki/Romania",
            "RU": "https://prepaid-data-sim-card.fandom.com/wiki/Russian_Federation",
            "RW": "https://prepaid-data-sim-card.fandom.com/wiki/Rwanda",
            "KN": "https://prepaid-data-sim-card.fandom.com/wiki/Saint_Kitts_and_Nevis",
            "LC": "https://prepaid-data-sim-card.fandom.com/wiki/Saint_Lucia",
            "VC": "https://prepaid-data-sim-card.fandom.com/wiki/Saint_Vincent",
            "WS": "https://prepaid-data-sim-card.fandom.com/wiki/Samoa",
            "SM": "https://prepaid-data-sim-card.fandom.com/wiki/San_Marino",
            "ST": "https://prepaid-data-sim-card.fandom.com/wiki/S%C3%A3o_Tom%C3%A9_and_Principe",
            "SA": "https://prepaid-data-sim-card.fandom.com/wiki/Saudi_Arabia",
            "SN": "https://prepaid-data-sim-card.fandom.com/wiki/Senegal",
            "RS": "https://prepaid-data-sim-card.fandom.com/wiki/Serbia",
            "SC": "https://prepaid-data-sim-card.fandom.com/wiki/Seychelles",
            "SL": "https://prepaid-data-sim-card.fandom.com/wiki/Sierra_Leone",
            "SG": "https://prepaid-data-sim-card.fandom.com/wiki/Singapore",
            "SK": "https://prepaid-data-sim-card.fandom.com/wiki/Slovakia",
            "SI": "https://prepaid-data-sim-card.fandom.com/wiki/Slovenia",
            "SB": "https://prepaid-data-sim-card.fandom.com/wiki/Solomon_Islands",
            "SO": "https://prepaid-data-sim-card.fandom.com/wiki/Somalia",
            "ZA": "https://prepaid-data-sim-card.fandom.com/wiki/South_Africa",
            "ES": "https://prepaid-data-sim-card.fandom.com/wiki/Spain",
            "LK": "https://prepaid-data-sim-card.fandom.com/wiki/Sri_Lanka",
            "SD": "https://prepaid-data-sim-card.fandom.com/wiki/Sudan",
            "SR": "https://prepaid-data-sim-card.fandom.com/wiki/Suriname",
            "SE": "https://prepaid-data-sim-card.fandom.com/wiki/Sweden",
            "CH": "https://prepaid-data-sim-card.fandom.com/wiki/Switzerland",
            "SY": "https://prepaid-data-sim-card.fandom.com/wiki/Syria",
            "TW": "https://prepaid-data-sim-card.fandom.com/wiki/Taiwan",
            "TJ": "https://prepaid-data-sim-card.fandom.com/wiki/Tajikistan",
            "TZ": "https://prepaid-data-sim-card.fandom.com/wiki/Tanzania",
            "TH": "https://prepaid-data-sim-card.fandom.com/wiki/Thailand",
            "TL": "https://prepaid-data-sim-card.fandom.com/wiki/Timor-Leste",
            "TG": "https://prepaid-data-sim-card.fandom.com/wiki/Togo",
            "TO": "https://prepaid-data-sim-card.fandom.com/wiki/Tonga",
            "TT": "https://prepaid-data-sim-card.fandom.com/wiki/Trinidad_and_Tobago",
            "TN": "https://prepaid-data-sim-card.fandom.com/wiki/Tunisia",
            "TR": "https://prepaid-data-sim-card.fandom.com/wiki/Turkey",
            "TM": "https://prepaid-data-sim-card.fandom.com/wiki/Turkmenistan",
            "TV": "https://prepaid-data-sim-card.fandom.com/wiki/Tuvalu",
            "UG": "https://prepaid-data-sim-card.fandom.com/wiki/Uganda",
            "UA": "https://prepaid-data-sim-card.fandom.com/wiki/Ukraine",
            "AE": "https://prepaid-data-sim-card.fandom.com/wiki/United_Arab_Emirates",
            "GB": "https://prepaid-data-sim-card.fandom.com/wiki/United_Kingdom",
            "US": "https://prepaid-data-sim-card.fandom.com/wiki/United_States",
            "UY": "https://prepaid-data-sim-card.fandom.com/wiki/Uruguay",
            "UZ": "https://prepaid-data-sim-card.fandom.com/wiki/Uzbekistan",
            "VU": "https://prepaid-data-sim-card.fandom.com/wiki/Vanuatu",
            "VE": "https://prepaid-data-sim-card.fandom.com/wiki/Venezuela",
            "VN": "https://prepaid-data-sim-card.fandom.com/wiki/Vietnam",
            "ZM": "https://prepaid-data-sim-card.fandom.com/wiki/Zambia",
            "ZW": "https://prepaid-data-sim-card.fandom.com/wiki/Zimbabwe"
        };
		
		        const NUMBEO_OVERRIDES = {
            "Ulan Bator": "Ulaanbaatar",
            "Washington, D.C.": "Washington, DC",
            "Kyiv": "Kiev+(Kyiv)", 
            "Rangoon": "Yangon",
            "Astana": "Astana+(Nur-Sultan)",
            "Sri Jayawardenepura Kotte": "Colombo", 
			"New Delhi": "Delhi",
			"Yaoundé": "Yaounde",
			"Brasília": "Brasilia",
            "Vatican City": "Rome",
			"City of San Marino": "San Marino",
			"Ngerulmud": "koror",
			"South tarawa": "Bikenibeu",
			"El Aaiun": "Laayoune"
        };
		
		// --- NUMBEO COUNTRY FIX ---
        const NUMBEO_COUNTRY_OVERRIDES = {
            "CD": "Democratic+Republic+of+the+Congo"
        };
		
				const TASTEATLAS_OVERRIDES = {
            "US": "usa", // United States -> usa
            "GB": "united-kingdom", // United Kingdom -> united-kingdom (czasem england, ale ogólny bezpieczniejszy)
            "AE": "uae", // UAE
            "KR": "korea",
            "KP": "north-korea",
            "CZ": "czech-republic", // Czechia -> czech-republic
            "MK": "macedonia",
            "BA": "bih",
            "XK": "kosovo", // TasteAtlas czasem to ma, czasem nie, ale warto spróbować
            "CD": "congo",
            "CI": "ivory-coast",
            "FM": "micronesia",
            "KN": "saint-kitts-and-nevis",
            "LC": "saint-lucia",
            "VC": "saint-vincent-and-the-grenadines",
            "TT": "trinidad-and-tobago",
            "TZ": "tanzania", // Czasem zanzibar jest osobno, ale tanzania to baza
            "VA": "vatican-city",
			"BS": "the-bahamas",
			"GM": "the-gambia",
			"CD": "democratic-republic-of-the-congo",
			"TL": "east-timor",
			"FM": "federated-states-of-micronesia",
			"SJ": "svalbard",
			"BQ": "bonaire",
			"SX": "sint-maarten",
			"SH": "saint-helena-ascension-and-tristan-da-cunha",
			"GS": "south-georgia-and-the-south-sandwich-islands",
			"CC": "cocos-islands"
			
        };
		

		
		
		

        // --- MSZ MAPPING (HARDCODED from your list) ---
        const MSZ_MAPPING = {
            "AF": "afganistan", "AL": "albania", "DZ": "algieriainformacje", "AD": "andora", "AO": "angola", "AG": "antigua-i-barbuda",
            "SA": "arabia-saudyjska", "AR": "argentyna", "AM": "armenia", "AU": "australia", "AT": "austria", "AZ": "azerbejdzan",
            "BS": "bahamy", "BH": "bahrajn", "BD": "bangladesz", "BB": "barbados", "BE": "belgia", "BZ": "belize", "BJ": "benin",
            "BT": "bhutan", "BY": "bialorus", "BO": "boliwia", "BA": "bosnia-i-hercegowina", "BW": "botswana", "BR": "brazylia",
            "BN": "brunei-darussalam", "BG": "bulgaria", "BF": "burkina-faso", "BI": "burundi", "CL": "chile", "CN": "chiny",
            "HR": "chorwacja", "CY": "cypr", "TD": "czad", "ME": "czarnogora", "CZ": "czechy", "DK": "dania", "CD": "demokratyczna-republika-konga",
            "DM": "dominika", "DO": "dominikana", "DJ": "dzibuti", "EG": "egipt", "EC": "ekwador", "ER": "erytrea", "EE": "estonia",
            "SZ": "eswatini", "ET": "etiopia", "FJ": "fidzi", "PH": "filipiny", "FI": "finlandia", "FR": "francja", "GA": "gabon",
            "GM": "gambia", "GH": "ghana", "GR": "grecja", "GD": "grenada", "GE": "gruzja", "GY": "gujana", "GT": "gwatemala",
            "GN": "gwinea", "GW": "gwinea-bissau", "GQ": "gwinea-rownikowa", "HT": "haiti", "ES": "hiszpania", "NL": "holandia",
            "HN": "honduras", "HK": "hongkong", "IN": "indie", "ID": "indonezja", "IQ": "irak1", "IR": "iran", "IE": "irlandia",
            "IS": "islandia", "IL": "izrael", "JM": "jamajka", "JP": "japonia", "YE": "jemen", "JO": "jordania", "KH": "kambodza",
            "CM": "kamerun", "CA": "kanada", "QA": "katar", "KZ": "kazachstan", "KE": "kenia", "KG": "kirgistan", "KI": "kiribati",
            "CO": "kolumbia", "KM": "komory", "CG": "kongo", "KP": "korea-polnocna", "KR": "korea-poludniowa", "XK": "kosowo",
            "CR": "kostaryka", "CU": "kuba", "KW": "kuwejt", "LA": "laos", "LS": "lesotho", "LB": "liban", "LR": "liberia",
            "LY": "libia", "LI": "liechtenstein", "LT": "litwa", "LU": "luksemburg", "MK": "macedoniapolnocna", "MG": "madagaskar",
            "MW": "malawi", "MV": "malediwy", "MY": "malezja", "ML": "mali", "MT": "malta", "MA": "maroko", "MR": "mauretania",
            "MU": "mauritius", "MX": "meksyk", "FM": "mikronezja", "MM": "mjanma", "MD": "moldawia", "MC": "monako", "MN": "mongolia",
            "MZ": "mozambik", "NA": "namibia", "NR": "nauru", "NP": "nepal", "DE": "niemcy", "NE": "niger", "NG": "nigeria",
            "NI": "nikaragua", "NU": "niue", "NO": "norwegia", "NZ": "nowa-zelandia", "OM": "oman", "LV": "otwa", "PK": "pakistan",
            "PW": "palau", "PS": "palestyna", "PA": "panama", "PG": "papua-nowa-gwinea", "PY": "paragwaj", "PE": "peru", "PT": "portugalia",
            "ZA": "republika-poludniowej-afryki", "CF": "republika-rodkowoafrykanska", "CV": "republika-zielonego-przyladka", "RU": "rosja",
            "RO": "rumunia", "RW": "rwanda", "LC": "saint-lucia", "VC": "saint-vincent-i-grenadyny", "SV": "salwador", "WS": "samoa",
            "SM": "san-marino", "SN": "senegal", "RS": "serbia", "SC": "seszele", "SL": "sierra-leone", "SG": "singapur", "SK": "slowacja",
            "SI": "slowenia", "SO": "somalia", "LK": "sri-lanka", "KN": "st-kitts-nevis", "US": "stany-zjednoczone-ameryki", "SD": "sudan",
            "SS": "sudan-poludniowy", "SR": "surinam", "SY": "syria", "CH": "szwajcaria", "SE": "szwecja", "TJ": "tadzykistan",
            "TH": "tajlandia", "TW": "tajwan", "TZ": "tanzania", "TL": "timor-wschodni", "TG": "togo", "TO": "tonga", "TT": "trynidad-i-tobago",
            "TN": "tunezja", "TR": "turcja", "TM": "turkmenistan", "TV": "tuvalu", "UG": "uganda", "UA": "ukraina", "UY": "urugwaj",
            "UZ": "uzbekistan", "VU": "vanuatu", "VA": "watykan", "HU": "wegry", "VE": "wenezuela", "GB": "wielka-brytania", "VN": "wietnam",
            "IT": "wlochy", "CI": "wybrzeze-kosci-sloniowej", "CK": "wyspy-cooka", "MH": "wyspy-marshalla", "SB": "wyspy-salomona",
            "ST": "wyspy-wietego-tomasza-i-ksiazeca", "ZM": "zambia", "ZW": "zimbabwe", "AE": "zjednoczone-emiraty-arabskie"
        };
		
// --- SAFETY INTEL (GLOBAL PEACE INDEX + WIKTOR'S CORRECTION) ---
        // 1=🟢 SAFE (Luz), 2=🟡 CAUTION (Oczy dookoła głowy), 3=🟠 RISKY (Nie chodź nocą), 
        // 4=🔴 DANGER (Wymagany konwój), 5=☠️ DEATH WISH (Wojna/Upadek)
        
        
const SAFETY_OVERRIDE = {
            // =================================================================
            // 🏰 EUROPA (BASTIONY & PÓŁNOC) - STREFA CYWILIZACJI
            // =================================================================
            "PL": 1, "IS": 1, "PT": 1, "SI": 1, "CH": 1, "CZ": 1, "FI": 1, "HR": 1, 
            "EE": 1, "LV": 1, "LT": 1, "HU": 1, "SK": 1, "RO": 1, "BG": 1, "AT": 1, 
            "IE": 1, "DK": 1, "NO": 1, "MT": 1, "CY": 1, "AD": 1, "SM": 1, "LI": 1, 
            "MC": 1, "VA": 1, "LU": 1, "ME": 1,
            "FO": 1, // Wyspy Owcze (Totalny spokój)
            "GL": 1, // Grenlandia (Zimno > Przestępczość)
            "SJ": 1, // Svalbard (Niedźwiedzie groźniejsze od ludzi)
            "GI": 1, // Gibraltar (Brytyjska skała)

            // =================================================================
            // ⚠️ EUROPA (STREFY MIESZANE) - "NOWY ZACHÓD" & BAŁKANY
            // =================================================================
            // Bogate, ale z problemami (kieszonkowcy, strefy no-go, imigracja)
            "DE": 2, "FR": 2, "GB": 2, "SE": 2, "NL": 2, "BE": 2, "IT": 2, "ES": 2, "GR": 2,
            "BA": 2, "AL": 2, "XK": 2, "MK": 2, "MD": 2, "RS": 2, 
            "BY": 3, // Białoruś (Reżim - wjazd ryzykowny politycznie)
            "UA": 5, // Ukraina (Wojna aktywna)
            "RU": 4, // Rosja (Państwo wrogie, ryzyko zatrzymań)

            // =================================================================
            // 🏔️ KAUKAZ - POGRANICZE ŚWIATÓW
            // =================================================================
            "GE": 2, // Gruzja (Bezpiecznie, ale Rosja miesza przy granicy)
            "AM": 2, // Armenia (Napięcia z Azerami, ale ulice bezpieczne)
            "AZ": 2, // Azerbejdżan (Dyktatura stabilna, turysta bezpieczny)

            // =================================================================
            // 🗽 AMERYKA PÓŁNOCNA I ŚRODKOWA
            // =================================================================
            "CA": 1, // Kanada (Jeszcze trzyma poziom)
            "US": 2, // USA (Broń, fent-zombies, getta - zależy gdzie trafisz)
            "MX": 3, // Meksyk (Kartele rządzą poza resortami)
            
            // Karaiby i Ameryka Centralna
            "BZ": 2, // Belize (Gangsterka w Belize City, reszta ok)
            "CR": 2, // Kostaryka (Najbezpieczniejsza w regionie, ale kradzieże rosną)
            "PA": 2, // Panama (Stabilnie)
            "CU": 2, // Kuba (Policyjna, turysta jest świętą krową)
            "SV": 2, // Salwador (Bukele posprzątał gangi, jest bezpieczniej, ale to państwo policyjne)
            "GT": 3, // Gwatemala (Wysoka przestępczość)
            "HN": 3, // Honduras (Wciąż szlak przerzutowy)
            "NI": 3, // Nikaragua (Reżim + bieda)
            "JM": 3, // Jamajka (Kingston to strefa wojny gangów)
            "BS": 2, // Bahamy (Nassau bywa groźne)
            "DO": 2, // Dominikana (Resorty ok, miasta 50/50)
            "HT": 5, // Haiti (Upadłe państwo, rządzą gangi)
            
            // Małe wyspy (zazwyczaj bezpieczne)
            "TT": 3, // Trynidad i Tobago (Wysoka przestępczość, porwania)
            "BB": 1, "LC": 1, "VC": 2, "GD": 1, "AG": 1, "KN": 1, "DM": 1,
            "PR": 2, // Portoryko (USA vibe)
            "KY": 1, "BM": 1, "AW": 1, "CW": 1, "SX": 1, // Terytoria zależne (Bezpieczne)

            // =================================================================
            // 💃 AMERYKA POŁUDNIOWA - LATINO HEAT
            // =================================================================
            "UY": 1, // Urugwaj (Szwajcaria Ameryki Płd)
            "CL": 2, // Chile (Kiedyś 1, teraz protesty i przestępczość w górę)
            "AR": 2, // Argentyna (Kryzys, ale fizycznie w miarę bezpiecznie)
            "PY": 2, // Paragwaj (Szlak przemytniczy, ale spokojnie)
            "PE": 2, // Peru (Napięcia polityczne, ale turystycznie ok)
            "BO": 3, // Boliwia (Blokady dróg, napięcia)
            "BR": 3, // Brazylia (Favele, napady - trzeba wiedzieć gdzie nie iść)
            "CO": 3, // Kolumbia (Lepiej niż kiedyś, ale wciąż ryzyko porwań/napadów)
            "EC": 3, // Ekwador (Deterioracja. Stan wojny z gangami. Ryzykowne)
            "VE": 4, // Wenezuela (Totalny upadek, bieda, przestępczość)
            "GY": 3, // Gujana (Napięcia z Wenezuelą)
            "SR": 2, // Surinam
            "GF": 2, // Gujana Francuska

            // =================================================================
            // 🏯 AZJA WSCHODNIA - SAFE HAVENS
            // =================================================================
            "JP": 1, "KR": 1, "TW": 1, "SG": 1, "HK": 1, "MO": 1, "MN": 2, 
            "CN": 2, // Chiny (Bezpiecznie fizycznie, totalna inwigilacja)
            "KP": 5, // Korea Północna (Wjazd tylko zorganizowany, ryzyko polityczne)

            // =================================================================
            // 🌴 AZJA POŁUDNIOWO-WSCHODNIA
            // =================================================================
            "VN": 2, // Wietnam (Bardzo bezpieczny)
            "MY": 1, // Malezja (Stabilna)
            "LA": 2, // Laos (Spokój)
            "BN": 1, // Brunei (Szariat, ale bezpiecznie)
            "TH": 2, // Tajlandia (Oszustwa, ruch drogowy, południe niespokojne)
            "ID": 2, // Indonezja (Bali ok, Dżakarta chaotyczna)
            "PH": 2, // Filipiny (Południe unikać, reszta ok)
            "KH": 2, // Kambodża (Kradzieże)
            "TL": 2, // Timor Wschodni
            "MM": 5, // Birma/Mjanma (Wojna domowa, junat bombarduje cywilów)

            // =================================================================
            // 🕌 AZJA CENTRALNA I POŁUDNIOWA
            // =================================================================
            "UZ": 1, // Uzbekistan (Państwo policyjne, turysta bezpieczny)
            "KZ": 2, // Kazachstan (Stabilnie, ale bywają zamieszki)
            "KG": 2, // Kirgistan
            "TJ": 2, // Tadżykistan
            "TM": 3, // Turkmenistan (Dziwny reżim, trudno wjechać)
            "BT": 1, // Bhutan (Raj)
            "NP": 2, // Nepal (Góry bezpieczne, miasta chaotyczne)
            "LK": 2, // Sri Lanka (Po kryzysie stabilniej)
            "MV": 2, // Malediwy (Resorty 1, Male 2 - islamski konserwatyzm)
            "IN": 3, // Indie (Tłum, oszustwa, ryzyko dla kobiet, terroryzm w Kaszmirze)
            "BD": 3, // Bangladesz (Zamieszki polityczne, przeludnienie)
            "PK": 4, // Pakistan (Terroryzm, porwania)
            "AF": 5, // Afganistan (Talibowie, ISIS-K)

            // =================================================================
            // 🐪 BLISKI WSCHÓD
            // =================================================================
            "AE": 1, "QA": 1, "OM": 1, "KW": 1, "BH": 1, // Zatoka (Bogactwo = Bezpieczeństwo)
            "SA": 2, // Arabia Saudyjska (Otwiera się, surowe prawo)
            "JO": 2, // Jordania (Stabilna wyspa w morzu chaosu)
            "TR": 2, // Turcja (Turystycznie super, granica z Syrią 4)
            "LB": 4, // Liban (Kryzys, Hezbollah, ryzyko wojny)
            "IQ": 4, // Irak (Stabilniej, ale wciąż minowe pole)
            "IR": 4, // Iran (Bezpiecznie na ulicy, ryzyko aresztowań politycznych)
            "SY": 5, // Syria (Wojna)
            "YE": 5, // Jemen (Wojna)
            "IL": 3, // Izrael (Stan wojny, rakiety)
            "PS": 5, // Palestyna (Strefa walk)

            // =================================================================
            // 🏝️ OCEANIA
            // =================================================================
            "AU": 1, "NZ": 1, 
            "FJ": 1, "VU": 1, "WS": 1, "TO": 1, "FM": 1, "PW": 1, "MH": 1, 
            "KI": 1, "NR": 1, "TV": 1, "CK": 1, "NU": 1, "PF": 1, // Pacyficzny raj
            "SB": 2, // Wyspy Salomona (Niepokoje społeczne)
            "NC": 3, // Nowa Kaledonia (Ostatnio zamieszki niepodległościowe)
            "PG": 3, // Papua Nowa Gwinea (Gangsterka "Raskols", bardzo niebezpiecznie)

            // =================================================================
            // 🌍 AFRYKA PÓŁNOCNA
            // =================================================================
            "MA": 2, // Maroko (Turystycznie ok, ale naciągacze)
            "TN": 2, // Tunezja (Resorty ok)
            "DZ": 2, // Algieria (Państwo policyjne, bezpieczniej niż myślą)
            "EG": 3, // Egipt (Naciągacze, ryzyko terroryzmu, chaos)
            "LY": 4, // Libia (Watażkowie, dwa rządy)

            // =================================================================
            // 🦁 AFRYKA SUBSAHARYJSKA - "LOTERIA"
            // =================================================================
            // Bastiony (Wyjątki):
            "MU": 1, // Mauritius (Afrykański raj)
            "SC": 1, // Seszele (Bogato i bezpiecznie)
            
            // Strefa Ostrożna (Level 2 - Da się żyć):
            "CV": 2, // Cabo Verde (Korekta: napady w stolicy)
            "BW": 2, // Botswana (Korekta: carjackings w miastach)
            "RW": 2, // Ruanda (Kigali to najczystsze/najbezpieczniejsze miasto, ale reżim)
            "GH": 2, // Ghana (Stabilna demokracja)
            "SN": 2, // Senegal (W miarę stabilnie)
            "NA": 2, // Namibia (Pustynia, bezpiecznie)
            "TZ": 2, // Tanzania (Zanzibar ok, ląd różnie)
            "GM": 2, // Gambia
            "ZM": 2, // Zambia
            "MW": 2, // Malawi
            "ST": 2, // Wyspy Św. Tomasza
            "MG": 2, // Madagaskar (Bieda, ale turystycznie ujdzie)
            "SZ": 2, // Eswatini
            "LS": 2, // Lesotho
            "BJ": 2, "TG": 2, // Benin, Togo (W miarę ok)

            // Strefa Ryzykowna (Level 3 - Tylko dla ogarniętych):
            "ZA": 3, // RPA (Morderstwa, napady, grodzone osiedla)
            "KE": 3, // Kenia (Al-Shabaab, napady w Nairobi)
            "UG": 3, // Uganda (Reżim, anty-LGBT, przestępczość)
            "AO": 3, // Angola (Luanda droga i niebezpieczna)
            "MZ": 3, // Mozambik (Północ to ISIS, reszta bieda)
            "ZW": 3, // Zimbabwe (Kryzys walutowy)
            "CM": 3, // Kamerun (Separatyści na zachodzie)
            "CI": 3, // Wybrzeże Kości Słoniowej
            "GN": 3, // Gwinea
            "GW": 3, // Gwinea Bissau
            "MR": 3, // Mauretania
            "DJ": 3, // Dżibuti
            "KM": 3, // Komory
            "GA": 3, // Gabon
            "CG": 3, // Kongo-Brazzaville

            // Strefa Śmierci / Wojny (Level 4 & 5):
            "NG": 4, // Nigeria (Boko Haram, porwania dla okupu)
            "ET": 3, // Etiopia (Tigraj - wojna, reszta - napięcia. Zmieniam na 3 warunkowo)
            "ER": 4, // Erytrea (Korea Północna Afryki)
            "BI": 4, // Burundi
            "GQ": 4, // Gwinea Równikowa (Dyktatura)
            "TD": 4, // Czad
            "SD": 5, // Sudan (Wojna domowa - rzeź)
            "SS": 5, // Sudan Południowy (Chaos)
            "SO": 5, // Somalia (Al-Shabaab, piraci)
            "CD": 4, // DR Kongo (Wschód to wojna, reszta chaos)
            "CF": 4, // Rep. Środkowoafrykańska (Wagnerowcy, rebelianci)
            "ML": 4, // Mali (Terroryzm, brak kontroli rządu)
            "BF": 4, // Burkina Faso (Terroryzm)
            "NE": 4, // Niger (Przewroty)
            "LR": 2, // Liberia (Powoli wstaje z kolan, daję 2 na zachętę, choć blisko 3)
            "SL": 2,  // Sierra Leone (Podobnie jak Liberia)
			"GL": 1, "PR": 2, "GF": 2, "RE": 1, "PF": 1,
			"GP": 1, "MQ": 1, "KY": 1, "BM": 1, "FK": 1,
			"PS": 5, "EH": 3,
			// Majotta - bez wpisu leciala na domyslny 1 (SAFE HAVEN), co przy najwyzszej przestepczosci
			// we Francji bylo mylace. 3 jak sasiednie Komory; Reunion (tez FR, Ocean Indyjski) zostaje 1.
			"YT": 3
        };


const SAFETY_LABELS = {
            1: { text: "🟢 SAFE HAVEN", desc: "MOŻESZ SPAĆ NA ŁAWCE. PEŁEN LUZ.", color: "#00ff00" },
            2: { text: "🟡 CAUTION", desc: "PILNUJ PORTFELA I OMIJAJ GETTA.", color: "#facc15" },
            3: { text: "🟠 RISKY", desc: "W NOCY TYLKO TAXI. WYSOKIE RYZYKO.", color: "#fb923c" },
            4: { text: "🔴 DANGER", desc: "REŻIM LUB BEZPRAWIE. DLA PROSÓW.", color: "#dc2626" },
            5: { text: "☠️ DEATH WISH", desc: "WOJNA. PISZESZ TESTAMENT.", color: "#ff0000" } 
        };
		
		// === ATLAS OBSCURA HARDCODED LINKS ===
// === ATLAS OBSCURA HARDCODED LINKS [ISO MODE] ===
const ATLAS_LINKS = {
	"PR": "https://www.atlasobscura.com/things-to-do/puerto-rico",
    // --- AFRICA ---
    "DZ": "https://www.atlasobscura.com/things-to-do/algeria",
    "AO": "https://www.atlasobscura.com/things-to-do/angola",
    "BJ": "https://www.atlasobscura.com/things-to-do/benin",
    "BW": "https://www.atlasobscura.com/things-to-do/botswana",
    "BF": "https://www.atlasobscura.com/things-to-do/burkina-faso",
    "BI": "https://www.atlasobscura.com/things-to-do/burundi",
    "CM": "https://www.atlasobscura.com/things-to-do/cameroon",
    "CV": "https://www.atlasobscura.com/things-to-do/cape-verde",
    "CF": "https://www.atlasobscura.com/things-to-do/central-african-republic",
    "TD": "https://www.atlasobscura.com/things-to-do/chad",
    "KM": "https://www.atlasobscura.com/things-to-do/comoros",
    "CI": "https://www.atlasobscura.com/things-to-do/cote-d-ivoire",
    "CD": "https://www.atlasobscura.com/things-to-do/democratic-republic-of-the-congo",
    "DJ": "https://www.atlasobscura.com/things-to-do/djibouti",
    "EG": "https://www.atlasobscura.com/things-to-do/egypt",
    "GQ": "https://www.atlasobscura.com/things-to-do/equatorial-guinea",
    "ER": "https://www.atlasobscura.com/things-to-do/eritrea",
    "ET": "https://www.atlasobscura.com/things-to-do/ethiopia",
    "GA": "https://www.atlasobscura.com/things-to-do/gabon",
    "GH": "https://www.atlasobscura.com/things-to-do/ghana",
    "GN": "https://www.atlasobscura.com/things-to-do/guinea",
    "GW": "https://www.atlasobscura.com/things-to-do/guineabissau",
    "KE": "https://www.atlasobscura.com/things-to-do/kenya",
    "LS": "https://www.atlasobscura.com/things-to-do/lesotho",
    "LR": "https://www.atlasobscura.com/things-to-do/liberia",
    "LY": "https://www.atlasobscura.com/things-to-do/libya",
    "MG": "https://www.atlasobscura.com/things-to-do/madagascar",
    "MW": "https://www.atlasobscura.com/things-to-do/malawi",
    "ML": "https://www.atlasobscura.com/things-to-do/mali",
    "MR": "https://www.atlasobscura.com/things-to-do/mauritania",
    "MU": "https://www.atlasobscura.com/things-to-do/mauritius",
    "MA": "https://www.atlasobscura.com/things-to-do/morocco",
    "MZ": "https://www.atlasobscura.com/things-to-do/mozambique",
    "NA": "https://www.atlasobscura.com/things-to-do/namibia",
    "NE": "https://www.atlasobscura.com/things-to-do/niger",
    "NG": "https://www.atlasobscura.com/things-to-do/nigeria",
    "CG": "https://www.atlasobscura.com/things-to-do/republic-of-the-congo",
    "RE": "https://www.atlasobscura.com/things-to-do/reunion",
    "RW": "https://www.atlasobscura.com/things-to-do/rwanda",
    "SH": "https://www.atlasobscura.com/things-to-do/saint-helena",
    "ST": "https://www.atlasobscura.com/things-to-do/sao-tome-and-principe",
    "SN": "https://www.atlasobscura.com/things-to-do/senegal",
    "SC": "https://www.atlasobscura.com/things-to-do/seychelles",
    "SL": "https://www.atlasobscura.com/things-to-do/sierra-leone",
    "SO": "https://www.atlasobscura.com/things-to-do/somalia",
    "ZA": "https://www.atlasobscura.com/things-to-do/south-africa",
    "SS": "https://www.atlasobscura.com/things-to-do/south-sudan",
    "SD": "https://www.atlasobscura.com/things-to-do/sudan",
    "TZ": "https://www.atlasobscura.com/things-to-do/tanzania",
    "TG": "https://www.atlasobscura.com/things-to-do/togo",
    "TN": "https://www.atlasobscura.com/things-to-do/tunisia",
    "UG": "https://www.atlasobscura.com/things-to-do/uganda",
    "ZM": "https://www.atlasobscura.com/things-to-do/zambia",
    "ZW": "https://www.atlasobscura.com/things-to-do/zimbabwe",

    // --- ASIA ---
    "AF": "https://www.atlasobscura.com/things-to-do/afghanistan",
    "AZ": "https://www.atlasobscura.com/things-to-do/azerbaijan",
    "BD": "https://www.atlasobscura.com/things-to-do/bangladesh",
    "BT": "https://www.atlasobscura.com/things-to-do/bhutan",
    "BN": "https://www.atlasobscura.com/things-to-do/brunei",
    "KH": "https://www.atlasobscura.com/things-to-do/cambodia",
    "TL": "https://www.atlasobscura.com/things-to-do/east-timor",
    "HK": "https://www.atlasobscura.com/things-to-do/hong-kong",
    "ID": "https://www.atlasobscura.com/things-to-do/indonesia",
    "KZ": "https://www.atlasobscura.com/things-to-do/kazakhstan",
    "KG": "https://www.atlasobscura.com/things-to-do/kyrgyzstan",
    "LA": "https://www.atlasobscura.com/things-to-do/laos",
    "MO": "https://www.atlasobscura.com/things-to-do/macau",
    "MY": "https://www.atlasobscura.com/things-to-do/malaysia",
    "MV": "https://www.atlasobscura.com/things-to-do/maldives",
    "MN": "https://www.atlasobscura.com/things-to-do/mongolia",
    "MM": "https://www.atlasobscura.com/things-to-do/myanmar-burma",
    "NP": "https://www.atlasobscura.com/things-to-do/nepal",
    "KP": "https://www.atlasobscura.com/things-to-do/north-korea",
    "PK": "https://www.atlasobscura.com/things-to-do/pakistan",
    "PH": "https://www.atlasobscura.com/things-to-do/philippines",
    "SG": "https://www.atlasobscura.com/things-to-do/singapore",
    "KR": "https://www.atlasobscura.com/things-to-do/south-korea",
    "LK": "https://www.atlasobscura.com/things-to-do/sri-lanka",
    "TW": "https://www.atlasobscura.com/things-to-do/taiwan",
    "TJ": "https://www.atlasobscura.com/things-to-do/tajikistan",
    "TH": "https://www.atlasobscura.com/things-to-do/thailand",
    "TM": "https://www.atlasobscura.com/things-to-do/turkmenistan",
    "UZ": "https://www.atlasobscura.com/things-to-do/uzbekistan",
    "VN": "https://www.atlasobscura.com/things-to-do/vietnam",

    // --- NORTH AMERICA ---
    "AG": "https://www.atlasobscura.com/things-to-do/antigua-and-barbuda",
    "AW": "https://www.atlasobscura.com/things-to-do/aruba",
    "BS": "https://www.atlasobscura.com/things-to-do/the-bahamas",
    "BB": "https://www.atlasobscura.com/things-to-do/barbados",
    "BM": "https://www.atlasobscura.com/things-to-do/bermuda",
    "VG": "https://www.atlasobscura.com/things-to-do/british-virgin-islands",
    "BQ": "https://www.atlasobscura.com/things-to-do/caribbean-netherlands",
    "KY": "https://www.atlasobscura.com/things-to-do/cayman-islands",
    "CU": "https://www.atlasobscura.com/things-to-do/cuba",
    "CW": "https://www.atlasobscura.com/things-to-do/curacao",
    "DM": "https://www.atlasobscura.com/things-to-do/dominica",
    "DO": "https://www.atlasobscura.com/things-to-do/dominican-republic",
    "GD": "https://www.atlasobscura.com/things-to-do/grenada",
    "GP": "https://www.atlasobscura.com/things-to-do/guadeloupe",
    "HT": "https://www.atlasobscura.com/things-to-do/haiti",
    "JM": "https://www.atlasobscura.com/things-to-do/jamaica",
    "MQ": "https://www.atlasobscura.com/things-to-do/martinique",
    "MS": "https://www.atlasobscura.com/things-to-do/montserrat",
    "LC": "https://www.atlasobscura.com/things-to-do/saint-lucia",
    "VC": "https://www.atlasobscura.com/things-to-do/saint-vincent-and-the-grenadines",
    "SX": "https://www.atlasobscura.com/things-to-do/sint-maarten",
    "TT": "https://www.atlasobscura.com/things-to-do/trinidad-and-tobago",
    "TC": "https://www.atlasobscura.com/things-to-do/turks-and-caicos-islands",
    "BZ": "https://www.atlasobscura.com/things-to-do/belize",
    "CR": "https://www.atlasobscura.com/things-to-do/costa-rica",
    "SV": "https://www.atlasobscura.com/things-to-do/el-salvador",
    "GT": "https://www.atlasobscura.com/things-to-do/guatemala",
    "HN": "https://www.atlasobscura.com/things-to-do/honduras",
    "NI": "https://www.atlasobscura.com/things-to-do/nicaragua",
    "PA": "https://www.atlasobscura.com/things-to-do/panama",
    "MX": "https://www.atlasobscura.com/things-to-do/mexico",
    "US": "https://www.atlasobscura.com/things-to-do/united-states",

    // --- EUROPE ---
    "AX": "https://www.atlasobscura.com/things-to-do/aland-islands",
    "AL": "https://www.atlasobscura.com/things-to-do/albania",
    "AD": "https://www.atlasobscura.com/things-to-do/andorra",
    "AM": "https://www.atlasobscura.com/things-to-do/armenia",
    "AT": "https://www.atlasobscura.com/things-to-do/austria",
    "BY": "https://www.atlasobscura.com/things-to-do/belarus",
    "BE": "https://www.atlasobscura.com/things-to-do/belgium",
    "BA": "https://www.atlasobscura.com/things-to-do/bosnia-and-herzegovina",
    "BG": "https://www.atlasobscura.com/things-to-do/bulgaria",
    "HR": "https://www.atlasobscura.com/things-to-do/croatia",
    "CY": "https://www.atlasobscura.com/things-to-do/cyprus",
    "CZ": "https://www.atlasobscura.com/things-to-do/czechia",
    "DK": "https://www.atlasobscura.com/things-to-do/denmark",
    "EE": "https://www.atlasobscura.com/things-to-do/estonia",
    "FO": "https://www.atlasobscura.com/things-to-do/faroe-islands",
    "FI": "https://www.atlasobscura.com/things-to-do/finland",
    "GE": "https://www.atlasobscura.com/things-to-do/country-of-georgia",
    "GR": "https://www.atlasobscura.com/things-to-do/greece",
    "GL": "https://www.atlasobscura.com/things-to-do/greenland",
    "GG": "https://www.atlasobscura.com/things-to-do/guernsey",
    "HU": "https://www.atlasobscura.com/things-to-do/hungary",
    "IS": "https://www.atlasobscura.com/things-to-do/iceland",
    "IE": "https://www.atlasobscura.com/things-to-do/ireland",
    "JE": "https://www.atlasobscura.com/things-to-do/jersey",
    "XK": "https://www.atlasobscura.com/things-to-do/kosovo",
    "LV": "https://www.atlasobscura.com/things-to-do/latvia",
    "LI": "https://www.atlasobscura.com/things-to-do/liechtenstein",
    "LT": "https://www.atlasobscura.com/things-to-do/lithuania",
    "LU": "https://www.atlasobscura.com/things-to-do/luxembourg",
    "MT": "https://www.atlasobscura.com/things-to-do/malta",
    "MD": "https://www.atlasobscura.com/things-to-do/moldova",
    "MC": "https://www.atlasobscura.com/things-to-do/monaco",
    "ME": "https://www.atlasobscura.com/things-to-do/montenegro",
    "NL": "https://www.atlasobscura.com/things-to-do/netherlands",
    "MK": "https://www.atlasobscura.com/things-to-do/north-macedonia",
    "NO": "https://www.atlasobscura.com/things-to-do/norway",
    "PL": "https://www.atlasobscura.com/things-to-do/poland",
    "PT": "https://www.atlasobscura.com/things-to-do/portugal",
    "RO": "https://www.atlasobscura.com/things-to-do/romania",
    "RU": "https://www.atlasobscura.com/things-to-do/russia",
    "SM": "https://www.atlasobscura.com/things-to-do/san-marino",
    "RS": "https://www.atlasobscura.com/things-to-do/serbia",
    "SK": "https://www.atlasobscura.com/things-to-do/slovakia",
    "SI": "https://www.atlasobscura.com/things-to-do/slovenia",
    "ES": "https://www.atlasobscura.com/things-to-do/spain",
    "SE": "https://www.atlasobscura.com/things-to-do/sweden",
    "CH": "https://www.atlasobscura.com/things-to-do/switzerland",
    "UA": "https://www.atlasobscura.com/things-to-do/ukraine",
    "GB": "https://www.atlasobscura.com/things-to-do/united-kingdom",
    "VA": "https://www.atlasobscura.com/things-to-do/vatican-city",

    // --- MIDDLE EAST ---
    "BH": "https://www.atlasobscura.com/things-to-do/bahrain",
    "IR": "https://www.atlasobscura.com/things-to-do/iran",
    "IQ": "https://www.atlasobscura.com/things-to-do/iraq",
    "IL": "https://www.atlasobscura.com/things-to-do/israel",
    "JO": "https://www.atlasobscura.com/things-to-do/jordan",
    "KW": "https://www.atlasobscura.com/things-to-do/kuwait",
    "LB": "https://www.atlasobscura.com/things-to-do/lebanon",
    "OM": "https://www.atlasobscura.com/things-to-do/oman",
    "QA": "https://www.atlasobscura.com/things-to-do/qatar",
    "SA": "https://www.atlasobscura.com/things-to-do/saudi-arabia",
    "SY": "https://www.atlasobscura.com/things-to-do/syria",
    "TR": "https://www.atlasobscura.com/things-to-do/turkey",
    "AE": "https://www.atlasobscura.com/things-to-do/united-arab-emirates",
    "YE": "https://www.atlasobscura.com/things-to-do/yemen",

    // --- OCEANIA ---
    "AS": "https://www.atlasobscura.com/things-to-do/american-samoa",
    "FJ": "https://www.atlasobscura.com/things-to-do/fiji",
    "PF": "https://www.atlasobscura.com/things-to-do/french-polynesia",
    "MH": "https://www.atlasobscura.com/things-to-do/marshall-islands",
    "FM": "https://www.atlasobscura.com/things-to-do/micronesia",
    "NC": "https://www.atlasobscura.com/things-to-do/new-caledonia",
    "NZ": "https://www.atlasobscura.com/things-to-do/new-zealand",
    "PW": "https://www.atlasobscura.com/things-to-do/palau",
    "PG": "https://www.atlasobscura.com/things-to-do/papua-new-guinea",
    "PN": "https://www.atlasobscura.com/things-to-do/pitcairn-islands",
    "WS": "https://www.atlasobscura.com/things-to-do/samoa",
    "SB": "https://www.atlasobscura.com/things-to-do/solomon-islands",
    "TO": "https://www.atlasobscura.com/things-to-do/tonga",
    "TV": "https://www.atlasobscura.com/things-to-do/tuvalu",
    "VU": "https://www.atlasobscura.com/things-to-do/vanuatu",

    // --- SOUTH AMERICA ---
    "AR": "https://www.atlasobscura.com/things-to-do/argentina",
    "BO": "https://www.atlasobscura.com/things-to-do/bolivia",
    "BR": "https://www.atlasobscura.com/things-to-do/brazil",
    "CL": "https://www.atlasobscura.com/things-to-do/chile",
    "CO": "https://www.atlasobscura.com/things-to-do/colombia",
    "EC": "https://www.atlasobscura.com/things-to-do/ecuador",
    "FK": "https://www.atlasobscura.com/things-to-do/falkland-islands",
    "GY": "https://www.atlasobscura.com/things-to-do/guyana",
    "PY": "https://www.atlasobscura.com/things-to-do/paraguay",
    "PE": "https://www.atlasobscura.com/things-to-do/peru",
    "SR": "https://www.atlasobscura.com/things-to-do/suriname",
    "UY": "https://www.atlasobscura.com/things-to-do/uruguay",
    "VE": "https://www.atlasobscura.com/things-to-do/venezuela",

    // --- POLAR ---
    "AQ": "https://www.atlasobscura.com/things-to-do/antarctica",
    "TF": "https://www.atlasobscura.com/things-to-do/french-southern-and-antarctic-lands",
	
	"SJ": "https://www.atlasobscura.com/things-to-do/svalbard-norway",
	"BQ": "https://www.atlasobscura.com/things-to-do/bonaire-caribbean-netherlands",
	"MF": "https://www.atlasobscura.com/things-to-do/sint-maarten",
	"PM": "https://www.atlasobscura.com/places/saint-pierre-miquelon",
	"VI": "https://www.atlasobscura.com/things-to-do/us-virgin-islands",
	"NU": "https://www.atlasobscura.com/places/niue"
};


        const WONDERS = [
            { id: "CN", name: "GREAT WALL", icon: "🧱", lat: 40.4319, lon: 116.5704, winner: true },
            { id: "IT", name: "COLOSSEUM", icon: "🏟️", lat: 41.8902, lon: 12.4922, winner: true },
            { id: "JO", name: "PETRA", icon: "🏜️", lat: 30.3285, lon: 35.4444, winner: true },
            { id: "MX", name: "CHICHEN ITZA", icon: "🐲", lat: 20.6843, lon: -88.5678, winner: true },
            { id: "PE", name: "MACHU PICCHU", icon: "⛰️", lat: -13.1631, lon: -72.5450, winner: true },
            { id: "IN", name: "TAJ MAHAL", icon: "🕌", lat: 27.1751, lon: 78.0421, winner: true },
            { id: "BR", name: "CHRIST THE REDEEMER", icon: "✝️", lat: -22.9519, lon: -43.2105, winner: true },
            { id: "EG", name: "PYRAMIDS OF GIZA", icon: "🔺", lat: 29.9792, lon: 31.1342, honorary: true },
            { id: "GR", name: "ACROPOLIS", icon: "🏛️", lat: 37.9715, lon: 23.7267 },
            { id: "ES", name: "ALHAMBRA", icon: "⛲", lat: 37.1761, lon: -3.5881 },
            { id: "KH", name: "ANGKOR WAT", icon: "🛕", lat: 13.4125, lon: 103.8670 },
            { id: "CL", name: "MOAI (EASTER ISLAND)", icon: "🗿", lat: -27.1256, lon: -109.2769 },
            { id: "FR", name: "EIFFEL TOWER", icon: "🗼", lat: 48.8584, lon: 2.2945 },
            { id: "TR", name: "HAGIA SOPHIA", icon: "⛪", lat: 41.0086, lon: 28.9802 },
            { id: "JP", name: "KIYOMIZU-DERA", icon: "⛩️", lat: 34.9949, lon: 135.7850 },
            { id: "RU", name: "KREMLIN", icon: "🏯", lat: 55.7520, lon: 37.6175 },
            { id: "DE", name: "NEUSCHWANSTEIN", icon: "🏰", lat: 47.5576, lon: 10.7498 },
            { id: "US", name: "STATUE OF LIBERTY", icon: "🗽", lat: 40.6892, lon: -74.0445 },
            { id: "GB", name: "STONEHENGE", icon: "🪨", lat: 51.1789, lon: -1.8262 },
            { id: "AU", name: "SYDNEY OPERA HOUSE", icon: "🎭", lat: -33.8568, lon: 151.2153 },
            { id: "ML", name: "TIMBUKTU", icon: "📚", lat: 16.7735, lon: -3.0074 }
        ];

        const REGION_MAP = {
    "AD":"EU","AE":"ASIA","AF":"ASIA","AG":"NA","AL":"EU","AM":"ASIA","AO":"AF","AR":"SA","AT":"EU","AU":"OC",
    "AZ":"ASIA","BA":"EU","BB":"NA","BD":"ASIA","BE":"EU","BF":"AF","BG":"EU","BH":"ASIA","BI":"AF","BJ":"AF",
    "BN":"ASIA","BO":"SA","BR":"SA","BS":"NA","BT":"ASIA","BW":"AF","BY":"EU","BZ":"NA","CA":"NA","CD":"AF",
    "CF":"AF","CG":"AF","CH":"EU","CI":"AF","CL":"SA","CM":"AF","CN":"ASIA","CO":"SA","CR":"NA","CU":"NA",
    "CV":"AF","CY":"ASIA","CZ":"EU","DE":"EU","DJ":"AF","DK":"EU","DM":"NA","DO":"NA","DZ":"AF","EC":"SA",
    "EE":"EU","EG":"AF","ER":"AF","ES":"EU","ET":"AF","FI":"EU","FJ":"OC","FM":"OC","FR":"EU","GA":"AF",
    "GB":"EU","GD":"NA","GE":"ASIA","GH":"AF","GM":"AF","GN":"AF","GQ":"AF","GR":"EU","GT":"NA","GW":"AF",
    "GY":"SA","HN":"NA","HR":"EU","HT":"NA","HU":"EU","ID":"ASIA","IE":"EU","IL":"ASIA","IN":"ASIA","IQ":"ASIA",
    "IR":"ASIA","IS":"EU","IT":"EU","JM":"NA","JO":"ASIA","JP":"ASIA","KE":"AF","KG":"ASIA","KH":"ASIA","KI":"OC",
    "KM":"AF","KN":"NA","KP":"ASIA","KR":"ASIA","KW":"ASIA","KZ":"ASIA","LA":"ASIA","LB":"ASIA","LC":"NA","LI":"EU",
    "LK":"ASIA","LR":"AF","LS":"AF","LT":"EU","LU":"EU","LV":"EU","LY":"AF","MA":"AF","MC":"EU","MD":"EU",
    "ME":"EU","MG":"AF","MH":"OC","MK":"EU","ML":"AF","MM":"ASIA","MN":"ASIA","MR":"AF","MT":"EU","MU":"AF",
    "MV":"ASIA","MW":"AF","MX":"NA","MY":"ASIA","MZ":"AF","NA":"AF","NE":"AF","NG":"AF","NI":"NA","NL":"EU",
    "NO":"EU","NP":"ASIA","NR":"OC","NZ":"OC","OM":"ASIA","PA":"NA","PE":"SA","PG":"OC","PH":"ASIA","PK":"ASIA",
    "PL":"EU","PT":"EU","PW":"OC","PY":"SA","QA":"ASIA","RO":"EU","RS":"EU","RU":"EU","RW":"AF",
    "SA":"ASIA","SB":"OC","SC":"AF","SD":"AF","SE":"EU","SG":"ASIA","SI":"EU","SK":"EU","SL":"AF","SM":"EU",
    "SN":"AF","SO":"AF","SR":"SA","SS":"AF","ST":"AF","SV":"NA","SY":"ASIA","SZ":"AF","TD":"AF","TG":"AF",
    "TH":"ASIA","TJ":"ASIA","TL":"ASIA","TM":"ASIA","TN":"AF","TO":"OC","TR":"ASIA","TT":"NA","TV":"OC","TW":"ASIA",
    "TZ":"AF","UA":"EU","UG":"AF","US":"NA","UY":"SA","UZ":"ASIA","VA":"EU","VC":"NA","VE":"SA","VN":"ASIA",
    "VU":"OC","WS":"OC","YE":"ASIA","ZA":"AF","ZM":"AF","ZW":"AF","XK":"EU","TW":"ASIA"
};
        // UWAGA: total MUSI sie zgadzac z liczba wpisow o danym regionie w REGION_MAP - inaczej
        // "Continental Control" potrafi pokazac >100% (licznik idzie z REGION_MAP, mianownik stad).
        // EU=45 obejmuje PL: dom nie daje XP, ale JEST europejskim panstwem i wpada do licznika.
        const CONTINENT_DATA = [{id:"EU",name:"EUROPE",total:45,lat:52,lon:15},{id:"ASIA",name:"ASIA",total:48,lat:45,lon:90},{id:"NA",name:"N. AMERICA",total:23,lat:45,lon:-100},{id:"SA",name:"S. AMERICA",total:12,lat:-15,lon:-60},{id:"AF",name:"AFRICA",total:54,lat:2,lon:20},{id:"OC",name:"OCEANIA",total:14,lat:-25,lon:140}];
        const RANKS = [{lvl:1,min:0,title:"NPC 😐"},{lvl:2,min:1,title:"NOOB 🐣"},{lvl:3,min:3,title:"SCOUT 🔭"},{lvl:4,min:5,title:"HIKER 🎒"},{lvl:5,min:8,title:"WALKER 🚶"},{lvl:6,min:12,title:"VAGABOND 🛤️"},{lvl:7,min:15,title:"RANGER 🏹"},{lvl:8,min:18,title:"PATHFINDER 🗺️"},{lvl:9,min:22,title:"ADVENTURER 🧭"},{lvl:10,min:26,title:"EXPLORER 🧗"},{lvl:11,min:30,title:"NOMAD 🦅"},{lvl:12,min:35,title:"VOYAGER ⛵"},{lvl:13,min:40,title:"CAPTAIN ⚓"},{lvl:14,min:45,title:"NAVIGATOR 🛸"},{lvl:15,min:50,title:"VETERAN 🏅"},{lvl:16,min:55,title:"COMMANDER 🎖️"},{lvl:17,min:60,title:"WARLORD ⚔️"},{lvl:18,min:65,title:"DIPLOMAT 📜"},{lvl:19,min:70,title:"BARON 🏰"},{lvl:20,min:75,title:"DUKE ⚜️"},{lvl:21,min:80,title:"KING 👑"},{lvl:22,min:85,title:"EMPEROR 🏯"},{lvl:23,min:90,title:"CONQUEROR 🩸"},{lvl:24,min:100,title:"GRANDMASTER 🥋"},{lvl:25,min:110,title:"TITAN 🗿"},{lvl:26,min:120,title:"LEGEND 🏆"},{lvl:27,min:130,title:"MYTH 🐉"},{lvl:28,min:140,title:"DEMI-GOD ⚡"},{lvl:29,min:150,title:"ATLAS 🌍"},{lvl:30,min:160,title:"PLANETARY 🪐"},{lvl:31,min:170,title:"GALACTIC 🌌"},{lvl:32,min:180,title:"COSMIC ☄️"},{lvl:33,min:185,title:"OMNIPRESENT 👁️"},{lvl:34,min:190,title:"THE WORLD 🃏"},{lvl:35,min:195,title:"GODWALKER ✨"}];

const CAPITAL_COORDS = {
    // --- SUWERENNE KRAJE (195) ---
    "AF":[34.53,69.17], "AL":[41.33,19.82], "DZ":[36.75,3.06], "AD":[42.51,1.52], "AO":[-8.84,13.23],
    "AG":[17.12,-61.85], "AR":[-34.61,-58.38], "AM":[40.18,44.51], "AU":[-35.28,149.13], "AT":[48.21,16.37],
    "AZ":[40.38,49.87], "BS":[25.06,-77.34], "BH":[26.22,50.59], "BD":[23.71,90.41], "BB":[13.11,-59.61],
    "BY":[53.9,27.57], "BE":[50.85,4.35], "BZ":[17.25,-88.77], "BJ":[6.48,2.63], "BT":[27.47,89.64],
    "BO":[-16.5,-68.15], "BA":[43.85,18.36], "BW":[-24.66,25.91], "BR":[-15.78,-47.93], "BN":[4.89,114.94],
    "BG":[42.7,23.32], "BF":[12.37,-1.53], "BI":[-3.38,29.36], "KH":[11.56,104.92], "CM":[3.87,11.52],
    "CA":[45.42,-75.7], "CV":[14.92,-23.51], "CF":[4.36,18.58], "TD":[12.11,15.04], "CL":[-33.45,-70.67],
    "CN":[39.9,116.4], "CO":[4.61,-74.08], "KM":[-11.7,43.25], "CG":[-4.27,15.28], "CD":[-4.32,15.31],
    "CR":[9.93,-84.08], "CI":[5.33,-4.03], "HR":[45.81,15.98], "CU":[23.13,-82.36], "CY":[35.17,33.37],
    "CZ":[50.09,14.42], "DK":[55.68,12.57], "DJ":[11.59,43.15], "DM":[15.3,-61.39], "DO":[18.47,-69.9],
    "EC":[-0.22,-78.51], "EG":[30.06,31.25], "SV":[13.7,-89.2], "GQ":[3.75,8.78], "ER":[15.33,38.93],
    "EE":[59.44,24.75], "ET":[9.02,38.75], "FJ":[-18.14,178.44], "FI":[60.17,24.94], "FR":[48.86,2.35],
    "GA":[-0.39,9.45], "GM":[13.45,-16.58], "GE":[41.72,44.79], "DE":[52.52,13.41], "GH":[5.56,-0.2],
    "GR":[37.98,23.73], "GD":[12.05,-61.75], "GT":[14.62,-90.53], "GN":[9.51,-13.7], "GW":[11.86,-15.6],
    "GY":[6.8,-58.16], "HT":[18.54,-72.34], "HN":[14.1,-87.21], "HU":[47.5,19.04], "IS":[64.14,-21.9],
    "IN":[28.64,77.22], "ID":[-6.17,106.83], "IR":[35.69,51.42], "IQ":[33.34,44.39], "IE":[53.33,-6.25],
    "IL":[31.78,35.22], "IT":[41.89,12.48], "JM":[17.97,-76.79], "JP":[35.69,139.69], "JO":[31.95,35.91],
    "KZ":[51.18,71.45], "KE":[-1.28,36.82], "KI":[1.33,173.02], "KP":[39.03,125.75], "KR":[37.57,126.98],
    "KW":[29.37,47.98], "KG":[42.87,74.59], "LA":[17.97,102.6], "LV":[56.95,24.11], "LB":[33.89,35.5],
    "LS":[-29.32,27.48], "LR":[6.31,-10.8], "LY":[32.88,13.18], "LI":[47.14,9.52], "LT":[54.69,25.28],
    "LU":[49.61,6.13], "MK":[42,21.43], "MG":[-18.91,47.52], "MW":[-13.97,33.79], "MY":[3.15,101.7],
    "MV":[4.17,73.51], "ML":[12.65,-8], "MT":[35.9,14.51], "MH":[7.1,171.38], "MR":[18.09,-15.98],
    "MU":[-20.16,57.5], "MX":[19.43,-99.13], "FM":[6.92,158.16], "MD":[47,28.86], "MC":[43.74,7.42],
    "MN":[47.92,106.92], "ME":[42.44,19.26], "MA":[34.02,-6.83], "MZ":[-25.95,32.59], "MM":[19.75,96.1],
    "NA":[-22.57,17.08], "NR":[-0.55,166.92], "NP":[27.7,85.32], "NL":[52.37,4.89], "NZ":[-41.29,174.78],
    "NI":[12.14,-86.27], "NE":[13.51,2.11], "NG":[9.06,7.54], "NO":[59.91,10.75], "OM":[23.61,58.59],
    "PK":[33.72,73.06], "PW":[7.5,134.62], "PA":[8.98,-79.52], "PG":[-9.44,147.19], "PY":[-25.28,-57.64],
    "PE":[-12.05,-77.03], "PH":[14.59,120.98], "PL":[52.23,21.01], "PT":[38.72,-9.14], "QA":[25.29,51.53],
    "RO":[44.43,26.1], "RU":[55.75,37.62], "RW":[-1.94,30.06], "KN":[17.3,-62.72], "LC":[14,-61],
    "VC":[13.15,-61.22], "WS":[-13.83,-171.76], "SM":[43.94,12.45], "ST":[0.34,6.73], "SA":[24.65,46.71],
    "SN":[14.69,-17.44], "RS":[44.82,20.47], "SC":[-4.62,55.45], "SL":[8.48,-13.23], "SG":[1.29,103.85],
    "SK":[48.15,17.11], "SI":[46.05,14.51], "SB":[-9.43,159.95], "SO":[2.04,45.34], "ZA":[-25.75,28.19],
    "SS":[4.85,31.62], "ES":[40.42,-3.7], "LK":[6.93,79.85], "SD":[15.59,32.53], "SR":[5.87,-55.17],
    "SZ":[-26.32,31.15], "SE":[59.33,18.06], "CH":[46.95,7.45], "SY":[33.51,36.29], "TW":[25.04,121.5],
    "TJ":[38.54,68.78], "TZ":[-6.17,35.75], "TH":[13.75,100.49], "TL":[-8.56,125.56], "TG":[6.13,1.21],
    "TO":[-21.14,-175.2], "TT":[10.65,-61.52], "TN":[36.8,10.18], "TR":[39.93,32.85], "TM":[37.95,58.38],
    "TV":[-8.52,179.19], "UG":[0.32,32.58], "UA":[50.45,30.52], "AE":[24.47,54.37], "GB":[51.51,-0.13],
    "US":[38.89,-77.04], "UY":[-34.88,-56.16], "UZ":[41.3,69.27], "VU":[-17.73,168.33], "VA":[41.9,12.45],
    "VE":[10.49,-66.88], "VN":[21.03,105.85], "YE":[15.35,44.21], "ZM":[-15.41,28.29], "ZW":[-17.83,31.05],
    "XK":[42.67,21.17],// Dopisz do CAPITAL_COORDS:
	"UM": [28.21, -177.37], // Midway Atoll
	"TF": [-49.35, 70.21],  // Port-aux-Français
	"HM": [-53.01, 73.39],  // Heard Island
	"BV": [-54.42, 3.34],   // Bouvet Island
	"AQ": [-77.85, 166.67], // McMurdo Station (Antarktyda)
	// Koordynaty dla poszczególnych wysp UM:
"UM-DQ": [-0.37, -160.02], // Jarvis Island
"UM-FQ": [0.18, -176.47],  // Baker Island
"UM-HQ": [0.80, -176.63],  // Howland Island
"UM-JQ": [16.75, -169.52], // Johnston Atoll
"UM-KQ": [6.40, -162.40],  // Kingman Reef
"UM-MQ": [28.22, -177.37], // Midway Atoll
"UM-NQ": [18.40, -75.01],  // Navassa Island (Karaiby!)
"UM-PQ": [5.87, -162.10],  // Palmyra Atoll
"UM-WQ": [19.30, 166.63],  // Wake Island

    // --- TERYTORIA ZALEŻNE (WPEŁNI ODKODOWANE) ---
    // [EUROPA I OKOLICE]
    "FO":[62.01,-6.77], // Wyspy Owcze (Dania)
    "GI":[36.14,-5.35], // Gibraltar (UK)
    "IM":[54.15,-4.48], // Wyspa Man (UK)
    "JE":[49.18,-2.10], // Jersey (UK)
    "GG":[49.45,-2.53], // Guernsey (UK)
    "AX":[60.10,19.93], // Wyspy Alandzkie (Finlandia)
    "SJ":[78.22,15.65], // Svalbard i Jan Mayen (Norwegia)

    // [AMERYKA PÓŁNOCNA I KARAIBY]
    "GL":[64.18,-51.72], // Grenlandia (Dania)
    "PR":[18.46,-66.10], // Portoryko (USA)
    "BM":[32.29,-64.78], // Bermudy (UK)
    "KY":[19.30,-81.38], // Kajmany (UK)
    "AW":[12.52,-70.03], // Aruba (NL)
    "CW":[12.11,-68.93], // Curacao (NL)
    "SX":[18.04,-63.05], // Sint Maarten (NL)
    "BQ":[12.15,-68.27], // Bonaire (NL)
    "BL":[17.89,-62.83], // Saint Barthelemy (FR)
    "MF":[18.07,-63.08], // Saint Martin (FR)
    "PM":[46.78,-56.18], // Saint Pierre i Miquelon (FR)
    "AI":[18.22,-63.06], // Anguilla (UK)
    "VG":[18.42,-64.62], // Brytyjskie Wyspy Dziewicze
    "VI":[18.34,-64.89], // Wyspy Dziewicze Stanów Zjednoczonych
    "TC":[21.78,-72.17], // Turks i Caicos (UK)
    "MS":[16.74,-62.18], // Montserrat (UK)
    "GP":[16.00,-61.73], // Gwadelupa (FR)
    "MQ":[14.60,-61.08], // Martynika (FR)

    // [AMERYKA POŁUDNIOWA I ATLANTYK]
    "GF":[4.92,-52.31],  // Gujana Francuska (FR)
    "FK":[-51.69,-57.85], // Falklandy (UK)
    "SH":[-15.93,-5.71], // Święta Helena (UK)
    "GS":[-54.28,-36.50], // Georgia Południowa (UK)

    // [AFRYKA I INDYJSKI]
    "RE":[-20.88,55.45], // Reunion (FR)
    "YT":[-12.78,45.22], // Majotta (FR)
    "IO":[-7.31,72.42], // Brytyjskie Terytorium Oceanu Indyjskiego
    "EH":[27.12,-13.17], // Sahara Zachodnia

    // [AZJA I PACYFIK]
    "HK":[22.31,114.16], // Hongkong (Specjalny)
    "MO":[22.19,113.54], // Makau (Specjalny)
    "TW":[25.03,121.50], // Tajwan (Zazwyczaj liczony jako kraj, ale tu dla pewności)
    "PS":[31.90,35.20],  // Palestyna
    "NC":[-22.27,166.44], // Nowa Kaledonia (FR)
    "PF":[-17.54,-149.57], // Polinezja Francuska (FR)
    "GU":[13.44,144.79], // Guam (USA)
    "MP":[15.20,145.74], // Mariany Północne (USA)
    "AS":[-14.27,-170.70], // Samoa Amerykańskie (USA)
    "CK":[-21.20,-159.77], // Wyspy Cooka (NZ)
    "NU":[-19.05,-169.86], // Niue (NZ)
    "TK":[-9.20,-171.84], // Tokelau (NZ)
    "WF":[-13.29,-176.20], // Wallis i Futuna (FR)
    "NF":[-29.04,167.95], // Norfolk (AU)
    "PN":[-25.07,-130.10], // Pitcairn (UK)
    "CX":[-10.42,105.67], // Wyspa Bożego Narodzenia (AU)
    "CC":[-12.15,96.87]   // Wyspy Kokosowe (AU)
};

        const CAPITAL_NAMES = {
            "AF":"Kabul","AL":"Tirana","DZ":"Algiers","AD":"Andorra la Vella","AO":"Luanda","AG":"Saint John's","AR":"Buenos Aires","AM":"Yerevan","AU":"Canberra","AT":"Vienna","AZ":"Baku","BS":"Nassau","BH":"Manama","BD":"Dhaka","BB":"Bridgetown","BY":"Minsk","BE":"Brussels","BZ":"Belmopan","BJ":"Porto-Novo","BT":"Thimphu","BO":"La Paz","BA":"Sarajevo","BW":"Gaborone","BR":"Brasilia","BN":"Bandar Seri Begawan","BG":"Sofia","BF":"Ouagadougou","BI":"Gitega","KH":"Phnom Penh","CM":"Yaounde","CA":"Ottawa","CV":"Praia","CF":"Bangui","TD":"N'Djamena","CL":"Santiago","CN":"Beijing","CO":"Bogota","KM":"Moroni","CG":"Brazzaville","CD":"Kinshasa","CR":"San Jose","CI":"Yamoussoukro","HR":"Zagreb","CU":"Havana","CY":"Nicosia","CZ":"Prague","DK":"Copenhagen","DJ":"Djibouti","DM":"Roseau","DO":"Santo Domingo","EC":"Quito","EG":"Cairo","SV":"San Salvador","GQ":"Malabo","ER":"Asmara","EE":"Tallinn","ET":"Addis Ababa","FJ":"Suva","FI":"Helsinki","FR":"Paris","GA":"Libreville","GM":"Banjul","GE":"Tbilisi","DE":"Berlin","GH":"Accra","GR":"Athens","GD":"St. George's","GT":"Guatemala City","GN":"Conakry","GW":"Bissau","GY":"Georgetown","HT":"Port-au-Prince","HN":"Tegucigalpa","HU":"Budapest","IS":"Reykjavik","IN":"New Delhi","ID":"Jakarta","IR":"Tehran","IQ":"Baghdad","IE":"Dublin","IL":"Jerusalem","IT":"Rome","JM":"Kingston","JP":"Tokyo","JO":"Amman","KZ":"Astana","KE":"Nairobi","KI":"Tarawa","KP":"Pyongyang","KR":"Seoul","KW":"Kuwait City","KG":"Bishkek","LA":"Vientiane","LV":"Riga","LB":"Beirut","LS":"Maseru","LR":"Monrovia","LY":"Tripoli","LI":"Vaduz","LT":"Vilnius","LU":"Luxembourg","MK":"Skopje","MG":"Antananarivo","MW":"Lilongwe","MY":"Kuala Lumpur","MV":"Male","ML":"Bamako","MT":"Valletta","MH":"Majuro","MR":"Nouakchott","MU":"Port Louis","MX":"Mexico City","FM":"Palikir","MD":"Chisinau","MC":"Monaco","MN":"Ulaanbaatar","ME":"Podgorica","MA":"Rabat","MZ":"Maputo","MM":"Naypyidaw","NA":"Windhoek","NR":"Yaren","NP":"Kathmandu","NL":"Amsterdam","NZ":"Wellington","NI":"Managua","NE":"Niamey","NG":"Abuja","NO":"Oslo","OM":"Muscat","PK":"Islamabad","PW":"Ngerulmud","PA":"Panama City","PG":"Port Moresby","PY":"Asuncion","PE":"Lima","PH":"Manila","PL":"Warsaw","PT":"Lisbon","QA":"Doha","RO":"Bucharest","RU":"Moscow","RW":"Kigali","KN":"Basseterre","LC":"Castries","VC":"Kingstown","WS":"Apia","SM":"San Marino","ST":"Sao Tome","SA":"Riyadh","SN":"Dakar","RS":"Belgrade","SC":"Victoria","SL":"Freetown","SG":"Singapore","SK":"Bratislava","SI":"Ljubljana","SB":"Honiara","SO":"Mogadishu","ZA":"Pretoria","SS":"Juba","ES":"Madrid","LK":"Colombo","SD":"Khartoum","SR":"Paramaribo","SZ":"Mbabane","SE":"Stockholm","CH":"Bern","SY":"Damascus","TW":"Taipei","TJ":"Dushanbe","TZ":"Dodoma","TH":"Bangkok","TL":"Dili","TG":"Lome","TO":"Nuku'alofa","TT":"Port of Spain","TN":"Tunis","TR":"Ankara","TM":"Ashgabat","TV":"Funafuti","UG":"Kampala","UA":"Kyiv","AE":"Abu Dhabi","GB":"London","US":"Washington DC","UY":"Montevideo","UZ":"Tashkent","VU":"Port Vila","VA":"Vatican City","VE":"Caracas","VN":"Hanoi","YE":"Sanaa","ZM":"Lusaka","ZW":"Harare","XK":"Pristina"
        };
        // Polskie nazwy krajow (przeniesione z admin.php: dane naleza do pliku danych, nie do logiki -
        // patrz CLAUDE.md "ROZDZIAL DANYCH OD LOGIKI"). Klucz: ISO-2. Konsument: admin.php (checkboxy
        // "Odwiedzone kraje" + sort/filtr). Glowna strona na razie nie uzywa (nazwy bierze z geodata/FACTBOOK).
        const COUNTRY_NAMES_PL = {
            "AF": "Afganistan", "AL": "Albania", "DZ": "Algieria", "AD": "Andora", "AO": "Angola", "AI": "Anguilla", "AQ": "Antarktyda", "AG": "Antigua i Barbuda", "SA": "Arabia Saudyjska", "AR": "Argentyna", "AM": "Armenia", "AW": "Aruba", "AU": "Australia", "AT": "Austria", "AZ": "Azerbejdżan", "BS": "Bahamy", "BH": "Bahrajn", "BD": "Bangladesz", "BB": "Barbados", "BE": "Belgia", "BZ": "Belize", "BJ": "Benin", "BM": "Bermudy", "BT": "Bhutan", "BY": "Białoruś", "BO": "Boliwia", "BQ": "Bonaire, Sint Eustatius i Saba", "BA": "Bośnia i Hercegowina", "BW": "Botswana", "BR": "Brazylia", "BN": "Brunei", "IO": "Brytyjskie Terytorium Oceanu Indyjskiego", "VG": "Brytyjskie Wyspy Dziewicze", "BG": "Bułgaria", "BF": "Burkina Faso", "BI": "Burundi", "CL": "Chile", "CN": "Chiny", "HR": "Chorwacja", "CW": "Curaçao", "CY": "Cypr", "TD": "Czad", "ME": "Czarnogóra", "CZ": "Czechy", "UM": "Dalekie Wyspy Mniejsze Stanów Zjednoczonych", "DK": "Dania", "CD": "Demokratyczna Republika Konga", "DM": "Dominika", "DO": "Dominikana", "DJ": "Dżibuti", "EG": "Egipt", "EC": "Ekwador", "ER": "Erytrea", "EE": "Estonia", "SZ": "Eswatini", "ET": "Etiopia", "FK": "Falklandy", "FJ": "Fidżi", "PH": "Filipiny", "FI": "Finlandia", "FR": "Francja", "TF": "Francuskie Terytoria Południowe", "GA": "Gabon", "GM": "Gambia", "GS": "Georgia Południowa i Sandwich Południowy", "GH": "Ghana", "GI": "Gibraltar", "GR": "Grecja", "GD": "Grenada", "GL": "Grenlandia", "GE": "Gruzja", "GU": "Guam", "GG": "Guernsey", "GY": "Gujana", "GF": "Gujana Francuska", "GP": "Gwadelupa", "GT": "Gwatemala", "GN": "Gwinea", "GW": "Gwinea Bissau", "GQ": "Gwinea Równikowa", "HT": "Haiti", "ES": "Hiszpania", "NL": "Holandia", "HN": "Honduras", "HK": "Hongkong", "IN": "Indie", "ID": "Indonezja", "IQ": "Irak", "IR": "Iran", "IE": "Irlandia", "IS": "Islandia", "IL": "Izrael", "JM": "Jamajka", "JP": "Japonia", "YE": "Jemen", "JE": "Jersey", "JO": "Jordania", "KY": "Kajmany", "KH": "Kambodża", "CM": "Kamerun", "CA": "Kanada", "QA": "Katar", "KZ": "Kazachstan", "KE": "Kenia", "KG": "Kirgistan", "KI": "Kiribati", "CO": "Kolumbia", "KM": "Komory", "CG": "Kongo", "KR": "Korea Południowa", "KP": "Korea Północna", "XK": "Kosowo", "CR": "Kostaryka", "CU": "Kuba", "KW": "Kuwejt", "LA": "Laos", "LS": "Lesotho", "LB": "Liban", "LR": "Liberia", "LY": "Libia", "LI": "Liechtenstein", "LT": "Litwa", "LU": "Luksemburg", "LV": "Łotwa", "MK": "Macedonia Północna", "MG": "Madagaskar", "YT": "Majotta", "MO": "Makau", "MW": "Malawi", "MV": "Malediwy", "MY": "Malezja", "ML": "Mali", "MT": "Malta", "MP": "Mariany Północne", "MA": "Maroko", "MQ": "Martynika", "MR": "Mauretania", "MU": "Mauritius", "MX": "Meksyk", "FM": "Mikronezja", "MM": "Mjanma (Birma)", "MD": "Mołdawia", "MC": "Monako", "MN": "Mongolia", "MS": "Montserrat", "MZ": "Mozambik", "NA": "Namibia", "NR": "Nauru", "NP": "Nepal", "DE": "Niemcy", "NE": "Niger", "NG": "Nigeria", "NI": "Nikaragua", "NU": "Niue", "NF": "Norfolk", "NO": "Norwegia", "NC": "Nowa Kaledonia", "NZ": "Nowa Zelandia", "OM": "Oman", "PK": "Pakistan", "PW": "Palau", "PS": "Palestyna", "PA": "Panama", "PG": "Papua-Nowa Gwinea", "PY": "Paragwaj", "PE": "Peru", "PN": "Pitcairn", "PF": "Polinezja Francuska", "PL": "Polska", "PR": "Portoryko", "PT": "Portugalia", "ZA": "Republika Południowej Afryki", "CF": "Republika Środkowoafrykańska", "CV": "Republika Zielonego Przylądka", "RE": "Reunion", "RU": "Rosja", "RO": "Rumunia", "RW": "Rwanda", "EH": "Sahara Zachodnia", "BL": "Saint-Barthélemy", "KN": "Saint Kitts i Nevis", "LC": "Saint Lucia", "MF": "Saint-Martin", "PM": "Saint-Pierre i Miquelon", "VC": "Saint Vincent i Grenadyny", "SV": "Salwador", "WS": "Samoa", "AS": "Samoa Amerykańskie", "SM": "San Marino", "SN": "Senegal", "RS": "Serbia", "SC": "Seszele", "SL": "Sierra Leone", "SG": "Singapur", "SX": "Sint Maarten", "SK": "Słowacja", "SI": "Słowenia", "SO": "Somalia", "LK": "Sri Lanka", "US": "Stany Zjednoczone", "SD": "Sudan", "SS": "Sudan Południowy", "SR": "Surinam", "SJ": "Svalbard i Jan Mayen", "SY": "Syria", "CH": "Szwajcaria", "SE": "Szwecja", "TJ": "Tadżykistan", "TH": "Tajlandia", "TW": "Tajwan", "TZ": "Tanzania", "TL": "Timor Wschodni", "TG": "Togo", "TK": "Tokelau", "TO": "Tonga", "TT": "Trynidad i Tobago", "TN": "Tunezja", "TR": "Turcja", "TM": "Turkmenistan", "TC": "Turks i Caicos", "TV": "Tuvalu", "UG": "Uganda", "UA": "Ukraina", "UY": "Urugwaj", "UZ": "Uzbekistan", "VU": "Vanuatu", "WF": "Wallis i Futuna", "VA": "Watykan", "VE": "Wenezuela", "HU": "Węgry", "GB": "Wielka Brytania", "VN": "Wietnam", "IT": "Włochy", "CI": "Wybrzeże Kości Słoniowej", "BV": "Wyspa Bouveta", "CX": "Wyspa Bożego Narodzenia", "IM": "Wyspa Man", "SH": "Wyspa Świętej Heleny", "AX": "Wyspy Alandzkie", "CK": "Wyspy Cooka", "VI": "Wyspy Dziewicze Stanów Zjednoczonych", "HM": "Wyspy Heard i McDonalda", "CC": "Wyspy Kokosowe", "MH": "Wyspy Marshalla", "FO": "Wyspy Owcze", "SB": "Wyspy Salomona", "ST": "Wyspy Świętego Tomasza i Książęca", "ZM": "Zambia", "ZW": "Zimbabwe", "AE": "Zjednoczone Emiraty Arabskie"
        };
		
		const RELIGIONS = {
    // EUROPA
    "PL": "Katolicyzm",
    "DE": "Chrześcijaństwo (Prot./Kat.)",
    "FR": "Katolicyzm (Zlaicyzowany)",
    "ES": "Katolicyzm",
    "IT": "Katolicyzm",
    "GB": "Chrześcijaństwo (Anglikanizm)",
    "PT": "Katolicyzm",
    "NL": "Brak wyznania / Katolicyzm",
    "BE": "Katolicyzm",
    "AT": "Katolicyzm",
    "CH": "Katolicyzm / Protestantyzm",
    "SE": "Luteranizm (Zlaicyzowany)",
    "NO": "Luteranizm (Zlaicyzowany)",
    "DK": "Luteranizm (Zlaicyzowany)",
    "FI": "Luteranizm (Zlaicyzowany)",
    "IS": "Luteranizm",
    "IE": "Katolicyzm",
    "GR": "Prawosławie",
    "CZ": "Ateizm / Brak wyznania",
    "SK": "Katolicyzm",
    "HU": "Katolicyzm",
    "RO": "Prawosławie",
    "BG": "Prawosławie",
    "HR": "Katolicyzm",
    "SI": "Katolicyzm",
    "RS": "Prawosławie",
    "BA": "Islam / Prawosławie",
    "ME": "Prawosławie",
    "XK": "Islam", // Kosowo
    "MK": "Prawosławie",
    "AL": "Islam",
    "EE": "Brak wyznania",
    "LV": "Luteranizm / Prawosławie",
    "LT": "Katolicyzm",
    "BY": "Prawosławie",
    "UA": "Prawosławie",
    "MD": "Prawosławie",
    "RU": "Prawosławie",
    "TR": "Islam",
    "CY": "Prawosławie",
    "MT": "Katolicyzm",
    "VA": "Katolicyzm",
    "SM": "Katolicyzm",
    "LI": "Katolicyzm",
    "MC": "Katolicyzm",
    "AD": "Katolicyzm",
    "LU": "Katolicyzm",

    // AZJA
    "CN": "Ateizm / Religie ludowe",
    "JP": "Shinto / Buddyzm",
    "KR": "Brak wyznania / Chrześcijaństwo",
    "KP": "Ateizm państwowy",
    "IN": "Hinduizm",
    "TH": "Buddyzm",
    "VN": "Brak wyznania / Buddyzm",
    "ID": "Islam",
    "MY": "Islam",
    "BN": "Islam (Sunnizm)",
    "PH": "Katolicyzm",
    "SG": "Buddyzm / Chrześcijaństwo",
    "KH": "Buddyzm",
    "LA": "Buddyzm",
    "MM": "Buddyzm",
    "MN": "Buddyzm / Brak wyznania",
    "NP": "Hinduizm",
    "LK": "Buddyzm",
    "PK": "Islam",
    "BD": "Islam",
    "AE": "Islam",
    "SA": "Islam (Wahhabizm)",
    "QA": "Islam",
    "KW": "Islam",
    "OM": "Islam (Ibadatyzm)",
    "BH": "Islam",
    "IL": "Judaizm",
    "JO": "Islam",
    "LB": "Islam / Chrześcijaństwo",
    "IR": "Islam (Szyizm)",
    "IQ": "Islam",
    "SY": "Islam",
    "KZ": "Islam",
    "UZ": "Islam",
    "TM": "Islam",
    "KG": "Islam",
    "TJ": "Islam",
    "AF": "Islam",
    "GE": "Prawosławie",
    "AM": "Chrześcijaństwo (Ormiańskie)",
    "AZ": "Islam (Szyizm)",
    "TW": "Buddyzm / Taoizm",
    "HK": "Brak wyznania / Buddyzm",
    "MO": "Brak wyznania / Buddyzm",
    "BT": "Buddyzm",
    "MV": "Islam",
    "TL": "Katolicyzm", // Timor Wschodni
    "YE": "Islam",

    // AMERYKA PÓŁNOCNA
    "US": "Protestantyzm / Katolicyzm",
    "CA": "Katolicyzm / Protestantyzm",
    "MX": "Katolicyzm",
    "CU": "Katolicyzm / Santeria",
    "DO": "Katolicyzm",
    "JM": "Protestantyzm",
    "HT": "Katolicyzm / Voodoo",
    "BS": "Protestantyzm",
    "CR": "Katolicyzm",
    "PA": "Katolicyzm",
    "GT": "Katolicyzm / Protestantyzm",
    "HN": "Katolicyzm / Protestantyzm",
    "SV": "Katolicyzm / Protestantyzm",
    "NI": "Katolicyzm",
    "BZ": "Katolicyzm / Protestantyzm",
    "BB": "Protestantyzm",
    "TT": "Chrześcijaństwo / Hinduizm",
    "AG": "Protestantyzm",
    "DM": "Katolicyzm", // Dominika
    "GD": "Katolicyzm", // Grenada
    "KN": "Protestantyzm", // Saint Kitts
    "LC": "Katolicyzm", // Saint Lucia
    "VC": "Protestantyzm", // Saint Vincent

    // AMERYKA POŁUDNIOWA
    "BR": "Katolicyzm",
    "AR": "Katolicyzm",
    "CL": "Katolicyzm",
    "CO": "Katolicyzm",
    "PE": "Katolicyzm",
    "VE": "Katolicyzm",
    "EC": "Katolicyzm",
    "BO": "Katolicyzm",
    "PY": "Katolicyzm",
    "UY": "Katolicyzm / Ateizm",
    "GY": "Protestantyzm / Hinduizm",
    "SR": "Chrześcijaństwo / Hinduizm",

    // AFRYKA
    "EG": "Islam",
    "MA": "Islam",
    "ZA": "Protestantyzm",
    "NG": "Islam / Chrześcijaństwo",
    "KE": "Chrześcijaństwo",
    "ET": "Prawosławie / Islam",
    "TZ": "Chrześcijaństwo / Islam",
    "GH": "Chrześcijaństwo",
    "DZ": "Islam",
    "TN": "Islam",
    "UG": "Chrześcijaństwo",
    "SD": "Islam",
    "SS": "Chrześcijaństwo / Animizm",
    "MZ": "Chrześcijaństwo",
    "MG": "Chrześcijaństwo / Animizm",
    "CM": "Chrześcijaństwo",
    "CI": "Islam / Chrześcijaństwo",
    "SN": "Islam",
    "ZW": "Chrześcijaństwo",
    "AO": "Katolicyzm",
    "ZM": "Protestantyzm",
    "RW": "Katolicyzm",
    "SO": "Islam",
    "LY": "Islam",
    "NE": "Islam",
    "ML": "Islam",
    "BF": "Islam",
    "TD": "Islam / Chrześcijaństwo",
    "NA": "Luteranizm",
    "BW": "Protestantyzm",
    "MR": "Islam",
    "SL": "Islam",
    "LR": "Chrześcijaństwo",
    "CF": "Chrześcijaństwo / Animizm",
    "CG": "Katolicyzm", // Kongo
    "CD": "Katolicyzm", // DR Kongo
    "GA": "Chrześcijaństwo",
    "GQ": "Katolicyzm",
    "GW": "Islam",
    "GN": "Islam", // Gwinea
    "DJ": "Islam",
    "ER": "Chrześcijaństwo / Islam",
    "SZ": "Chrześcijaństwo", // Eswatini
    "LS": "Protestantyzm",
    "GM": "Islam",
    "MW": "Chrześcijaństwo",
    "BI": "Katolicyzm",
    "TG": "Chrześcijaństwo / Animizm",
    "BJ": "Chrześcijaństwo / Voodoo",
    "CV": "Katolicyzm",
    "ST": "Katolicyzm",
    "SC": "Katolicyzm",
    "KM": "Islam",
    "MU": "Hinduizm",

    // OCEANIA
    "AU": "Chrześcijaństwo / Brak",
    "NZ": "Brak / Chrześcijaństwo",
    "FJ": "Protestantyzm / Hinduizm",
    "PG": "Protestantyzm",
    "SB": "Protestantyzm",
    "VU": "Protestantyzm",
    "NC": "Katolicyzm",
    "PF": "Protestantyzm",
    "WS": "Protestantyzm", // Samoa
    "TO": "Protestantyzm", // Tonga
    "TV": "Protestantyzm", // Tuvalu
    "KI": "Katolicyzm", // Kiribati
    "FM": "Chrześcijaństwo", // Mikronezja
    "MH": "Protestantyzm", // Wyspy Marshalla
    "PW": "Katolicyzm", // Palau
    "NR": "Protestantyzm", // Nauru
	// --- TERYTORIA ZALEŻNE & PATCHE (DODATEK WIKTORA) ---
    
    // PÓŁNOC & EUROPA (Wyspy i Skały)
    "GL": "Luteranizm", // Grenlandia
    "FO": "Luteranizm", // Wyspy Owcze
    "SJ": "Brak (Nauka) / Luteranizm", // Svalbard
    "AX": "Luteranizm", // Alandy
    "GI": "Katolicyzm / Anglikanizm", // Gibraltar
    "IM": "Anglikanizm / Metodyzm", // Man
    "JE": "Anglikanizm / Katolicyzm", // Jersey
    "GG": "Anglikanizm / Metodyzm", // Guernsey

    // KARAIBY & AMERYKA (Kolonialny mix)
    "PR": "Katolicyzm / Protestantyzm", // Portoryko
    "VI": "Protestantyzm (Baptyzm)", // US Virgin
    "VG": "Protestantyzm (Metodyzm)", // British Virgin
    "AI": "Protestantyzm (Anglikanizm)", // Anguilla
    "KY": "Protestantyzm (Bóg i Pieniądz)", // Kajmany
    "TC": "Protestantyzm (Baptyzm)", // Turks & Caicos
    "BM": "Protestantyzm (Anglikanizm)", // Bermudy
    "MS": "Protestantyzm / Katolicyzm", // Montserrat
    "AW": "Katolicyzm", // Aruba
    "CW": "Katolicyzm", // Curacao
    "SX": "Katolicyzm / Protestantyzm", // Sint Maarten
    "BQ": "Katolicyzm", // Bonaire
    "BL": "Katolicyzm", // St. Barth
    "MF": "Katolicyzm", // St. Martin (FR)
    "GP": "Katolicyzm", // Gwadelupa
    "MQ": "Katolicyzm", // Martynika
    "PM": "Katolicyzm", // St. Pierre & Miquelon

    // AMERYKA PŁD & ATLANTYK
    "GF": "Katolicyzm", // Gujana Francuska
    "FK": "Chrześcijaństwo", // Falklandy
    "SH": "Protestantyzm (Anglikanizm)", // Św. Helena
    "GS": "Brak (Garnizon/Nauka)", // Georgia Płd.

    // AFRYKA & INDYJSKI
    "RE": "Katolicyzm", // Reunion
    "YT": "Islam", // Majotta
    "EH": "Islam", // Sahara Zachodnia
    "IO": "Brak (Wojsko USA/UK)", // BIOT
    "SH": "Anglikanizm", // Święta Helena

    // AZJA & PACYFIK
    "PS": "Islam", // Palestyna
    "MO": "Religie ludowe / Buddyzm", // Makau
    "GU": "Katolicyzm", // Guam
    "MP": "Katolicyzm", // Mariany Północne
    "AS": "Protestantyzm (Kongregacjonizm)", // Samoa Amerykańskie
    "NC": "Katolicyzm", // Nowa Kaledonia
    "PF": "Protestantyzm / Katolicyzm", // Polinezja Francuska
    "WF": "Katolicyzm", // Wallis & Futuna
    "CK": "Protestantyzm", // Wyspy Cooka
    "NU": "Protestantyzm (Ekalesia Niue)", // Niue
    "TK": "Protestantyzm (Kongregacjonizm)", // Tokelau
    "NF": "Protestantyzm (Anglikanizm)", // Norfolk
    "PN": "Adwentyzm Dnia Siódmego", // Pitcairn (Ciekawostka!)
    "CX": "Buddyzm / Islam", // Wyspa Bożego Narodzenia
    "CC": "Islam (Sunnizm)", // Wyspy Kokosowe

    // BEZLUDNE / NAUKOWE
    "TF": "Brak (Nauka)", // Francuskie Terytoria Płd.
    "HM": "Brak (Pingwiny)", // Heard
    "BV": "Brak (Lód)", // Bouvet
    "AQ": "Brak (Nauka/Traktat)", // Antarktyda
};

const COST_INDEX = {
    // $$$$ - ULTRA DROGO
    "CH": "$$$$", "IS": "$$$$", "NO": "$$$$", "SG": "$$$$", 
    "US": "$$$$", "AU": "$$$$", "DK": "$$$$", "IE": "$$$$", 
    "LU": "$$$$", "QA": "$$$$", "AE": "$$$$", "IL": "$$$$",
    "BS": "$$$$", "NZ": "$$$$", "CA": "$$$$", "GB": "$$$$",

    // $$$ - DROGO (Zachód)
    "DE": "$$$", "FR": "$$$", "NL": "$$$", "SE": "$$$", "AT": "$$$", 
    "BE": "$$$", "FI": "$$$", "IT": "$$$", "ES": "$$$", "JP": "$$$", 
    "KR": "$$$", "HK": "$$$", "TW": "$$$", "CY": "$$$", "MT": "$$$",
    "KW": "$$$", "SA": "$$$", "UY": "$$$", "PR": "$$$",

    // $$ - ŚREDNIO (Polska i okolice)
    "PL": "$$", "CZ": "$$", "SK": "$$", "HU": "$$", "HR": "$$", 
    "PT": "$$", "GR": "$$", "EE": "$$", "LT": "$$", "LV": "$$", 
    "RO": "$$", "BG": "$$", "SI": "$$", "CN": "$$", "MY": "$$", 
    "TH": "$$", "CL": "$$", "BR": "$$", "MX": "$$", "CR": "$$",
    "ZA": "$$", "RU": "$$", "TR": "$$", "KZ": "$$", "ME": "$$",

    // $ - TANIO
    "UA": "$", "MD": "$", "BY": "$", "RS": "$", "BA": "$", "MK": "$", 
    "AL": "$", "XK": "$", "GE": "$", "AM": "$", "AZ": "$", 
    "IN": "$", "VN": "$", "ID": "$", "PH": "$", "KH": "$", "LA": "$", 
    "LK": "$", "PK": "$", "BD": "$", "NP": "$", "MN": "$", "UZ": "$", 
    "KG": "$", "TJ": "$", "EG": "$", "MA": "$", "TN": "$", "DZ": "$", 
    "CO": "$", "PE": "$", "BO": "$", "PY": "$", "AR": "$", "VE": "$", 
    "NG": "$", "KE": "$", "TZ": "$", "GH": "$", "UG": "$", "ET": "$",
    "MG": "$", "IR": "$", "IQ": "$", "SY": "$", "AF": "$", "LB": "$",
	// (Usunieto 12 wpisow terytoriow, ktore byly tu zdublowane z sekcja nizej: GL, PR, GF, RE, PF, GP,
	//  MQ, KY, BM, FK, PS, EH. Jedenascie mialo identyczne wartosci, ale FK bylo SPRZECZNE: "$$$" tutaj
	//  vs "$$$$" nizej - JS po cichu bral ostatnie, czyli "$$$$". Zostaje sekcja nizej, zachowanie bez zmian.)
	// --- TERYTORIA ZALEŻNE (DODATEK WIKTORA) ---
    
    // $$$$ - ULTRA DROGO (Izolacja + Import + Podatki)
    "BM": "$$$$", // Bermudy (Najdrożej na świecie)
    "KY": "$$$$", // Kajmany (Raj podatkowy = ceny z kosmosu)
    "CH": "$$$$", // Szwajcaria (dla przypomnienia)
    "TC": "$$$$", // Turks & Caicos
    "BL": "$$$$", // St. Barth (Dla milionerów)
    "PF": "$$$$", // Polinezja (Bora Bora drenuje portfel)
    "GL": "$$$$", // Grenlandia (Wszystko płynie statkiem z Danii)
    "SJ": "$$$$", // Svalbard (Arktyczne ceny)
    "VG": "$$$$", // BVI
    "AI": "$$$$", // Anguilla
    "FK": "$$$$", // Falklandy (Logistyka zabija)

    // $$$ - DROGO (Standard zachodni/wyspiarski)
    "AW": "$$$", "CW": "$$$", "SX": "$$$", "BQ": "$$$", // Holenderskie Karaiby
    "GP": "$$$", "MQ": "$$$", "MF": "$$$", "GF": "$$$", "RE": "$$$", "NC": "$$$", "PM": "$$$", // Francuskie terytoria (Euro)
    "VI": "$$$", "PR": "$$$", "GU": "$$$", "MP": "$$$", "AS": "$$$", // USA terytoria
    "GI": "$$$", "JE": "$$$", "GG": "$$$", "IM": "$$$", // Brytyjskie wyspy
    "FO": "$$$", "AX": "$$$", // Nordyckie wyspy
    "SH": "$$$", // Św. Helena (Monopol dostaw)
    "MS": "$$$", // Montserrat (Karaiby, wszystko z importu)
    "MO": "$$$", // Makau (Hazard = kasa)
    "YT": "$$$", // Majotta

    // $$ - ŚREDNIO / DROGAWO (Pacyfik - zależy co jesz)
    "CK": "$$", "NU": "$$", "TK": "$$", "WF": "$$", "WS": "$$", "TV": "$$", // Oceania (lokalnie taniej, import drogi)
    "NF": "$$", "PN": "$$", // Norfolk/Pitcairn
    "CX": "$$", "CC": "$$", // Australijskie wyspy

    // $ - TANIO (Bieda / Konflikty / Specyfika)
    "PS": "$", // Palestyna
    "EH": "$", // Sahara Zachodnia
    
    // N/A - BRAK EKONOMII (Nauka/Pustka)
    "TF": "N/A", "HM": "N/A", "BV": "N/A", "AQ": "N/A", "GS": "N/A", "IO": "N/A",

    // === UZUPELNIENIE BRAKOW (89 panstw, ktore wczesniej nie mialy wpisu) ===
    // Skala jak wyzej: PL = $$, CH = $$$$, VN = $. Wartosci sa z natury uznaniowe (koszt podrozy,
    // nie parytet lokalny) - poprawiaj smialo, to jedyne zrodlo prawdy dla panelu kosztow.

    // $$$$ - ULTRA DROGO
    "MC": "$$$$", // Monako
    "LI": "$$$$", // Liechtenstein
    "MV": "$$$$", // Malediwy (resorty + transfery hydroplanem)
    "SC": "$$$$", // Seszele
    "BB": "$$$$", // Barbados
    "AG": "$$$$", // Antigua i Barbuda
    "KN": "$$$$", // St. Kitts i Nevis

    // $$$ - DROGO
    "AD": "$$$",  // Andora (ceny alpejskie)
    "SM": "$$$",  // San Marino (ceny wloskie)
    "VA": "$$$",  // Watykan (de facto ceny Rzymu)
    "BH": "$$$",  // Bahrajn (Zatoka)
    "OM": "$$$",  // Oman
    "JO": "$$$",  // Jordania (turystyka mocno windzi ceny)
    "BT": "$$$",  // Bhutan (obowiazkowa oplata dzienna dla turystow)
    "DJ": "$$$",  // Dzibuti (wszystko z importu)
    "GQ": "$$$",  // Gwinea Rownikowa (nafta, Malabo)
    "GA": "$$$",  // Gabon (Libreville)
    "AO": "$$$",  // Angola (Luanda w czolowce najdrozszych miast)
    "BW": "$$$",  // Botswana (safari premium)
    "MU": "$$$",  // Mauritius
    "JM": "$$$",  // Jamajka
    "TT": "$$$",  // Trynidad i Tobago
    "GD": "$$$",  // Grenada
    "LC": "$$$",  // St. Lucia
    "VC": "$$$",  // St. Vincent i Grenadyny
    "PG": "$$$",  // Papua-Nowa Gwinea (logistyka)
    "VU": "$$$",  // Vanuatu
    "PW": "$$$",  // Palau
    "NR": "$$$",  // Nauru
    "MH": "$$$",  // Wyspy Marshalla

    // $$ - SREDNIO
    "BN": "$$",   // Brunei
    "CV": "$$",   // Republika Zielonego Przyladka
    "BZ": "$$",   // Belize
    "CU": "$$",   // Kuba
    "DO": "$$",   // Dominikana
    "DM": "$$",   // Dominika
    "SV": "$$",   // Salwador
    "PA": "$$",   // Panama
    "GY": "$$",   // Gujana
    "SR": "$$",   // Surinam
    "FJ": "$$",   // Fidzi
    "KI": "$$",   // Kiribati
    "FM": "$$",   // Mikronezja
    "SB": "$$",   // Wyspy Salomona
    "TO": "$$",   // Tonga
    "TL": "$$",   // Timor Wschodni
    "KP": "$$",   // Korea Polnocna (wylacznie zorganizowane wycieczki)
    "TM": "$$",   // Turkmenistan
    "NA": "$$",   // Namibia
    "RW": "$$",   // Rwanda
    "ZM": "$$",   // Zambia
    "ZW": "$$",   // Zimbabwe
    "MZ": "$$",   // Mozambik
    "SN": "$$",   // Senegal
    "CI": "$$",   // Wybrzeze Kosci Sloniowej (Abidzan)
    "CG": "$$",   // Kongo (Brazzaville)
    "CD": "$$",   // DR Konga (Kinszasa drogo mimo biedy)
    "SS": "$$",   // Sudan Poludniowy (Dzuba - ceny naped przez misje/NGO)
    "LR": "$$",   // Liberia
    "ST": "$$",   // Wyspy Swietego Tomasza i Ksiazeca

    // $ - TANIO
    "BJ": "$",    // Benin
    "BF": "$",    // Burkina Faso
    "BI": "$",    // Burundi
    "CM": "$",    // Kamerun
    "CF": "$",    // Republika Srodkowoafrykanska
    "TD": "$",    // Czad
    "KM": "$",    // Komory
    "ER": "$",    // Erytrea
    "GM": "$",    // Gambia
    "GN": "$",    // Gwinea
    "GW": "$",    // Gwinea Bissau
    "HT": "$",    // Haiti
    "LS": "$",    // Lesotho
    "SZ": "$",    // Eswatini
    "MW": "$",    // Malawi
    "ML": "$",    // Mali
    "MR": "$",    // Mauretania
    "NE": "$",    // Niger
    "SL": "$",    // Sierra Leone
    "SO": "$",    // Somalia
    "SD": "$",    // Sudan
    "TG": "$",    // Togo
    "LY": "$",    // Libia
    "YE": "$",    // Jemen
    "MM": "$",    // Mjanma
    "EC": "$",    // Ekwador
    "GT": "$",    // Gwatemala
    "HN": "$",    // Honduras
    "NI": "$",    // Nikaragua

    // N/A - BEZLUDNE WYSPY USA (Minor Outlying Islands) - jak TF/HM/BV/AQ wyzej
    "UM": "N/A", "UM-DQ": "N/A", "UM-FQ": "N/A", "UM-HQ": "N/A", "UM-JQ": "N/A",
    "UM-KQ": "N/A", "UM-MQ": "N/A", "UM-NQ": "N/A", "UM-PQ": "N/A", "UM-WQ": "N/A"
};

// === WIKIVOYAGE FIXES (URL OVERRIDES) ===
const WIKIVOYAGE_OVERRIDES = {
    "GE": "Georgia_(country)",           // Fix dla Gruzji (inaczej myli z USA)
	"SJ": "Svalbard",
	"BQ": "Bonaire"
};

// === FCDO SLUGS (ISO2 -> slug strony ostrzeżeń gov.uk/foreign-travel-advice) ===
// Źródło: https://www.gov.uk/api/content/world (details.world_locations[].slug), pobrane 2026-07-08.
// Używane przez znacznik live SAFETY w app.js do porównania SAFETY_OVERRIDE z ostrzeżeniami FCDO.
const FCDO_SLUGS = {
    "AD": "andorra", "AE": "united-arab-emirates", "AF": "afghanistan", "AG": "antigua-and-barbuda", "AI": "anguilla", "AL": "albania",
    "AM": "armenia", "AO": "angola", "AR": "argentina", "AS": "american-samoa", "AT": "austria", "AU": "australia",
    "AW": "aruba", "AZ": "azerbaijan", "BA": "bosnia-and-herzegovina", "BB": "barbados", "BD": "bangladesh", "BE": "belgium",
    "BF": "burkina-faso", "BG": "bulgaria", "BH": "bahrain", "BI": "burundi", "BJ": "benin", "BM": "bermuda",
    "BN": "brunei", "BO": "bolivia", "BQ": "bonaire-st-eustatius-saba", "BR": "brazil", "BS": "bahamas", "BT": "bhutan",
    "BW": "botswana", "BY": "belarus", "BZ": "belize", "CA": "canada", "CD": "democratic-republic-of-the-congo", "CF": "central-african-republic",
    "CG": "congo", "CH": "switzerland", "CI": "cote-d-ivoire", "CL": "chile", "CM": "cameroon", "CN": "china",
    "CO": "colombia", "CR": "costa-rica", "CU": "cuba", "CV": "cape-verde", "CW": "curacao", "CY": "cyprus",
    "CZ": "czechia", "DE": "germany", "DJ": "djibouti", "DK": "denmark", "DM": "dominica", "DO": "dominican-republic",
    "DZ": "algeria", "EC": "ecuador", "EE": "estonia", "EG": "egypt", "EH": "western-sahara", "ER": "eritrea",
    "ES": "spain", "ET": "ethiopia", "FI": "finland", "FJ": "fiji", "FK": "falkland-islands", "FM": "federated-states-of-micronesia",
    "FR": "france", "GA": "gabon", "GB": "united-kingdom", "GD": "grenada", "GE": "georgia", "GF": "french-guiana",
    "GH": "ghana", "GI": "gibraltar", "GM": "the-gambia", "GN": "guinea", "GP": "guadeloupe", "GQ": "equatorial-guinea",
    "GR": "greece", "GS": "south-georgia-and-the-south-sandwich-islands", "GT": "guatemala", "GW": "guinea-bissau", "GY": "guyana", "HK": "hong-kong",
    "HN": "honduras", "HR": "croatia", "HT": "haiti", "HU": "hungary", "ID": "indonesia", "IE": "ireland",
    "IL": "israel", "IN": "india", "IO": "british-indian-ocean-territory", "IQ": "iraq", "IR": "iran", "IS": "iceland",
    "IT": "italy", "JM": "jamaica", "JO": "jordan", "JP": "japan", "KE": "kenya", "KG": "kyrgyzstan",
    "KH": "cambodia", "KI": "kiribati", "KM": "comoros", "KN": "st-kitts-and-nevis", "KP": "north-korea", "KR": "south-korea",
    "KW": "kuwait", "KY": "cayman-islands", "KZ": "kazakhstan", "LA": "laos", "LB": "lebanon", "LC": "st-lucia",
    "LI": "liechtenstein", "LK": "sri-lanka", "LR": "liberia", "LS": "lesotho", "LT": "lithuania", "LU": "luxembourg",
    "LV": "latvia", "LY": "libya", "MA": "morocco", "MC": "monaco", "MD": "moldova", "ME": "montenegro",
    "MF": "st-maarten", "MG": "madagascar", "MH": "marshall-islands", "MK": "north-macedonia", "ML": "mali", "MM": "myanmar",
    "MN": "mongolia", "MO": "macao", "MQ": "martinique", "MR": "mauritania", "MS": "montserrat", "MT": "malta",
    "MU": "mauritius", "MV": "maldives", "MW": "malawi", "MX": "mexico", "MY": "malaysia", "MZ": "mozambique",
    "NA": "namibia", "NC": "new-caledonia", "NE": "niger", "NG": "nigeria", "NI": "nicaragua", "NL": "netherlands",
    "NO": "norway", "NP": "nepal", "NR": "nauru", "NZ": "new-zealand", "OM": "oman", "PA": "panama",
    "PE": "peru", "PF": "french-polynesia", "PG": "papua-new-guinea", "PH": "philippines", "PK": "pakistan", "PL": "poland",
    "PM": "st-pierre-and-miquelon", "PN": "pitcairn-island", "PS": "palestine", "PT": "portugal", "PW": "palau", "PY": "paraguay",
    "QA": "qatar", "RE": "reunion", "RO": "romania", "RS": "serbia", "RU": "russia", "RW": "rwanda",
    "SA": "saudi-arabia", "SB": "solomon-islands", "SC": "seychelles", "SD": "sudan", "SE": "sweden", "SG": "singapore",
    "SH": "st-helena-ascension-and-tristan-da-cunha", "SI": "slovenia", "SK": "slovakia", "SL": "sierra-leone", "SM": "san-marino", "SN": "senegal",
    "SO": "somalia", "SR": "suriname", "SS": "south-sudan", "ST": "sao-tome-and-principe", "SV": "el-salvador", "SY": "syria",
    "SZ": "eswatini", "TC": "turks-and-caicos-islands", "TD": "chad", "TG": "togo", "TH": "thailand", "TJ": "tajikistan",
    "TL": "timor-leste", "TM": "turkmenistan", "TN": "tunisia", "TO": "tonga", "TR": "turkey", "TT": "trinidad-and-tobago",
    "TV": "tuvalu", "TW": "taiwan", "TZ": "tanzania", "UA": "ukraine", "UG": "uganda", "US": "usa",
    "UY": "uruguay", "UZ": "uzbekistan", "VA": "holy-see", "VC": "st-vincent-and-the-grenadines", "VE": "venezuela", "VG": "british-virgin-islands",
    "VN": "vietnam", "VU": "vanuatu", "WF": "wallis-and-futuna", "WS": "samoa", "XK": "kosovo", "YE": "yemen",
    "YT": "mayotte", "ZA": "south-africa", "ZM": "zambia", "ZW": "zimbabwe"
};

// === SHARED UTILITIES (przeniesione z index.html) ===

function getDist(lat1, lon1, lat2, lon2) { var R=6371, dLat=(lat2-lat1)*Math.PI/180, dLon=(lon2-lon1)*Math.PI/180, a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)*Math.sin(dLon/2); return R*2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); }

function stripDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function getFlagEmoji(c) {
    if (!c || c.length !== 2) return c;
    const cp = c.toUpperCase().split('').map(ch => 127397 + ch.charCodeAt(0));
    return String.fromCodePoint(...cp);
}

function getWeatherIcon(code) {
    if(code === 0) return "☀️";
    if(code <= 3) return "⛅";
    if(code <= 48) return "🌫️";
    if(code <= 67) return "🌧️";
    if(code <= 77) return "🌨️";
    if(code <= 82) return "🌦️";
    if(code <= 99) return "⛈️";
    return "🌡️";
}

function getWeatherDesc(code) {
    const m = { 0:"CLEAR SKY", 1:"MAINLY CLEAR", 2:"PARTLY CLOUDY", 3:"OVERCAST", 45:"FOG", 48:"FOG", 51:"DRIZZLE", 53:"DRIZZLE", 55:"DRIZZLE", 61:"RAIN", 63:"RAIN", 65:"HEAVY RAIN", 71:"SNOW", 73:"SNOW", 75:"HEAVY SNOW", 95:"THUNDERSTORM" };
    return m[code] || "UNKNOWN";
}

function getMszLink(cca2) {
    // Nowy schemat MSZ (Odyseusz): https://odyseusz.gov.pl/<ISO2>
    return cca2 ? `https://odyseusz.gov.pl/${String(cca2).toUpperCase()}` : "https://odyseusz.gov.pl/";
}

// Terytoria zależne — nie liczą się do rangi/XP (ale są widoczne na mapie i można je odhaczyć).
// Konwencja: terytorium ma CAPITAL_COORDS + FLAGS + INTEL_DB + COUNTRY_NAMES_PL (da się kliknąć,
// odhaczyć i podświetlić), ale NIE MA REGION_MAP ani CAPITAL_NAMES - dzięki temu nie wchodzi do
// statystyk kontynentów. Wyjątek: PL (dom) - to państwo, więc ma REGION_MAP i liczy się do "Continental
// Control", ale XP za własny kraj nie leci, stąd siedzi na tej liście.
// HK dopisany 2026-07-16: miał już komplet cech terytorium (brak REGION_MAP/CAPITAL_NAMES, flaga,
// INTEL, nazwa PL) i jako jedyny SAR nie był wykluczony - Makau (MO) było tu od początku.
// UM + UM-* (bezludne wyspy USA: Baker, Howland, Jarvis, Johnston, Kingman, Midway, Navassa, Palmyra,
// Wake) - nie da się ich odwiedzić, nie mają flag ani wpisu w FACTBOOK, a liczyły się do XP.
const EXCLUDED_CODES = ["GL", "PR", "GF", "RE", "PF", "GP", "MQ", "NC", "KY", "BM", "FK", "PS", "EH", "FO", "GI", "IM", "JE", "GG", "AX", "SJ", "AW", "CW", "SX", "BQ", "BL", "MF", "PM", "AI", "VG", "VI", "TC", "MS", "SH", "GS", "YT", "IO", "MO", "HK", "GU", "MP", "AS", "CK", "NU", "TK", "WF", "NF", "PN", "CX", "CC", "TF", "HM", "BV", "AQ", "PL", "UM", "UM-DQ", "UM-FQ", "UM-HQ", "UM-JQ", "UM-KQ", "UM-MQ", "UM-NQ", "UM-PQ", "UM-WQ"];

// === MAPA LOTNISK: kod kraju -> slug guide'u na sleepinginairports.net ===
// URL: https://www.sleepinginairports.net/guides/${slug}.htm
// Glowny (najruchliwszy miedzynarodowy) port kraju/terytorium. 189 pozycji. Reszta -> fallback wyszukiwania.
const AIRPORT_GUIDES = {
    // --- EUROPA ---
    "AL": "tirana-airport-guide", "AT": "vienna-airport-guide", "BE": "brussels-zaventem-airport-guide",
    "BA": "sarajevo-airport-guide", "BG": "sofia-airport-guide", "BY": "minsk-airport-guide",
    "HR": "zagreb-airport-guide", "CY": "larnaca-airport-guide", "CZ": "prague-airport-guide",
    "DK": "copenhagen-kastrup-airport-guide", "EE": "tallinn-airport-guide", "FI": "helsinki-vantaa-airport-guide",
    "FR": "paris-charles-de-gaulle-airport-guide", "DE": "frankfurt-airport-guide", "GR": "athens-airport-guide",
    "HU": "budapest-airport-guide", "IS": "reykjavik-keflavik-airport-guide", "IE": "dublin-airport-guide",
    "IT": "rome-fiumicino-airport-guide", "XK": "pristina-airport-guide", "LV": "riga-airport-guide",
    "LT": "vilnius-airport-guide", "LU": "luxembourg-airport-guide", "MT": "malta-airport-guide",
    "MD": "chisinau-airport-guide", "ME": "podgorica-airport-guide", "NL": "amsterdam-airport-guide",
    "MK": "skopje-airport-guide", "NO": "oslo-gardermoen-airport-guide", "PL": "warsaw-chopin-airport-guide",
    "PT": "lisbon-airport-guide", "RO": "bucharest-airport-guide", "RU": "moscow-sheremetyevo-airport-guide",
    "RS": "belgrade-airport-guide", "SK": "bratislava-airport-guide", "SI": "ljubljana-airport-guide",
    "ES": "madrid-barajas-airport-guide", "SE": "stockholm-arlanda-airport-guide", "CH": "zurich-airport-guide",
    "UA": "kyiv-boryspil-airport-guide", "GB": "london-heathrow-airport-guide",
    // --- Europejskie terytoria zalezne ---
    "FO": "faroe-islands-vagar-airport-guide", "GG": "guernsey-airport-guide", "JE": "jersey-airport-guide",
    "IM": "isle-of-man-airport-guide", "SJ": "svalbard-airport-guide",
    // --- AZJA ---
    "CN": "beijing-capital-airport-guide", "HK": "hong-kong-airport-guide", "MO": "macau-airport-guide",
    "TW": "taipei-taoyuan-airport-guide", "JP": "tokyo-narita-airport-guide", "KR": "seoul-incheon-airport-guide",
    "KP": "pyongyang-airport-guide", "MN": "ulaanbaatar-airport-guide", "TH": "bangkok-suvarnabhumi-airport-guide",
    "VN": "hanoi-airport-guide", "LA": "vientiane-airport-guide", "KH": "phnom-penh-airport-guide",
    "MM": "yangon-airport-guide", "MY": "kuala-lumpur-airport-guide", "SG": "singapore-changi-airport-guide",
    "ID": "jakarta-soekarno-hatta-airport-guide", "PH": "manila-airport-guide", "IN": "new-delhi-airport-guide",
    "PK": "karachi-airport-guide", "BD": "dhaka-airport-guide", "LK": "colombo-bandaranaike-airport-guide",
    "MV": "male-airport-guide", "NP": "kathmandu-airport-guide", "BT": "paro-airport-guide",
    "AF": "kabul-airport-guide", "KZ": "almaty-airport-guide", "KG": "bishkek-manas-airport-guide",
    "TJ": "dushanbe-airport-guide", "UZ": "tashkent-airport-guide", "GE": "tbilisi-airport-guide",
    "AM": "yerevan-airport-guide", "AZ": "baku-airport-guide",
    // --- BLISKI WSCHOD ---
    "TR": "istanbul-airport-guide", "IR": "tehran-airport-guide", "IQ": "baghdad-airport-guide",
    "LB": "beirut-airport-guide", "IL": "tel-aviv-airport-guide", "JO": "amman-airport-guide",
    "SA": "jeddah-airport-guide", "AE": "dubai-airport-guide", "QA": "doha-airport-guide",
    "OM": "muscat-airport-guide", "KW": "kuwait-city-airport-guide", "BH": "bahrain-airport-guide",
    // --- AFRYKA ---
    "EG": "cairo-airport-guide", "MA": "casablanca-airport-guide", "DZ": "algiers-airport-guide",
    "TN": "tunis-airport-guide", "SD": "khartoum-airport-guide", "SS": "juba-airport-guide",
    "ET": "addis-ababa-airport-guide", "KE": "nairobi-airport-guide", "TZ": "dar-es-salaam-airport-guide",
    "UG": "entebbe-airport-guide", "RW": "kigali-airport-guide", "NG": "lagos-airport-guide",
    "GH": "accra-airport-guide", "CI": "abidjan-airport-guide", "SN": "dakar-blaise-diagne-airport-guide",
    "GM": "banjul-airport-guide", "GW": "bissau-airport-guide", "ML": "bamako-airport-guide",
    "BF": "ouagadougou-airport-guide", "NE": "niamey-airport-guide", "TD": "ndjamena-airport-guide",
    "MR": "nouakchott-airport-guide", "CM": "douala-airport-guide", "CF": "bangui-airport-guide",
    "CG": "pointe-noire-airport-guide", "CD": "kinshasa-ndjili-airport-guide", "GQ": "malabo-airport-guide",
    "AO": "luanda-airport-guide", "ZM": "lusaka-airport-guide", "ZW": "harare-airport-guide",
    "MW": "lilongwe-airport-guide", "MZ": "maputo-airport-guide", "BW": "gaborone-airport-guide",
    "NA": "windhoek-airport-guide", "ZA": "johannesburg-airport-guide", "BJ": "cotonou-airport-guide",
    "TG": "lome-airport-guide", "LR": "monrovia-airport-guide", "CV": "amilcar-cabral-airport-guide",
    "DJ": "djibouti-airport-guide", "MG": "ivato-airport-guide", "MU": "port-louis-airport-guide",
    "SC": "seychelles-airport-guide", "RE": "reunion-airport-guide",
    // --- AMERYKA POLNOCNA / SRODKOWA + Karaiby ---
    "US": "new-york-city-jfk-airport-guide", "CA": "toronto-airport-guide", "MX": "mexico-city-airport-guide",
    "GT": "guatemala-city-airport-guide", "SV": "san-salvador-airport-guide", "HN": "san-pedro-sula-airport-guide",
    "NI": "managua-airport-guide", "CR": "san-jose-airport-guide-cr", "PA": "panama-city-airport-guide",
    "GL": "kangerlussuaq-airport-guide", "CU": "havana-airport-guide", "JM": "montego-bay-airport-guide",
    "HT": "port-au-prince-airport-guide", "DO": "punta-cana-airport-guide", "BS": "nassau-airport-guide",
    "BB": "bridgetown-airport-guide", "TT": "piarco-airport-guide", "PR": "san-juan-airport-guide",
    "AW": "aruba-airport-guide", "SX": "st-maarten-airport-guide", "AG": "antigua-airport-guide",
    "LC": "castries-airport-guide", "GD": "maurice-bishop-airport-guide", "VC": "st-vincent-grenadines-airport-guide",
    "KN": "st-kitts-airport-guide", "DM": "roseau-airport-guide", "VI": "st-thomas-airport-guide",
    "BM": "bermuda-airport-guide", "GP": "pointe-a-pitre-airport-guide", "MQ": "fort-de-france-airport-guide",
    "PM": "st-pierre-miquelon-airport-guide",
    // --- AMERYKA POLUDNIOWA ---
    "CO": "bogota-airport-guide", "VE": "caracas-airport-guide", "EC": "quito-airport-guide",
    "PE": "lima-airport-guide", "BO": "la-paz-airport-guide", "CL": "santiago-de-chile-airport-guide",
    "AR": "buenos-aires-ezeiza-airport-guide", "PY": "asuncion-airport-guide", "UY": "montevideo-airport-guide",
    "BR": "sao-paulo-guarulhos-airport-guide", "GY": "timehri-airport-guide", "SR": "paramaribo-airport-guide",
    // --- OCEANIA ---
    "AU": "sydney-airport-guide", "NZ": "auckland-airport-guide", "FJ": "nadi-airport-guide",
    "PG": "port-moresby-airport-guide", "SB": "honiara-airport-guide", "VU": "port-vila-airport-guide",
    "NC": "noumea-airport-guide", "PF": "papeete-airport-guide", "WS": "apia-airport-guide",
    "NR": "nauru-airport-guide", "CK": "rarotonga-airport-guide", "GU": "guam-airport-guide",
};

// === WATER SAFE LINKS (isthewatersafe.com) ===
// PELNA baza slugow (iso2 -> slug) dla wiersza WATER w profilu kraju (app.js). NIE zgadujemy generycznie:
// wpis w tej bazie = link, brak wpisu = zwykly tekst bez linku. Zrodlo: przejscie listy /countries na zywo
// (2026-07-20) + weryfikacja KAZDEGO adresu fetch-em. Uwzglednione TYLKO strony, ktore realnie zwracaja profil.
// CELOWO POMINIETE (serwis sam je 404-uje albo pokazuje "Country not found", brak dzialajacego alternatywnego slugu):
//   MM Myanmar, CG Kongo(Brazzaville), CD DR Konga(Kinszasa), CW Curaçao, CI Côte d'Ivoire, FK Falklandy,
//   GW Gwinea Bissau, TL Timor Wschodni, oraz "u.s.-virgin-islands" (dla VI uzywamy dzialajacego "virgin-islands").
//   PS (serwis dzieli na gaza-strip / west-bank - brak jednego slugu, pomijamy). SJ Svalbard - pominiety na zyczenie,
//   choc strona istnieje (gdyby mial wrocic: "SJ": "svalbard").
// Wszystkie slugi sa czystym ASCII (kraje ze znakami spec. to akurat te zepsute u zrodla). Aktualizacja: gdy serwis
// naprawi/dolozy kraj - dopisz tu iso2->slug (i tylko wtedy pojawi sie link). Konsument: app.js updateFactbookPanel.
const WATER_SAFE_LINKS = {
    // --- A-B ---
    "AF":"afghanistan","AL":"albania","DZ":"algeria","AS":"american-samoa","AD":"andorra","AO":"angola",
    "AI":"anguilla","AG":"antigua-and-barbuda","AR":"argentina","AM":"armenia","AW":"aruba","AU":"australia",
    "AT":"austria","AZ":"azerbaijan","BS":"bahamas","BH":"bahrain","BD":"bangladesh","BB":"barbados",
    "BY":"belarus","BE":"belgium","BZ":"belize","BJ":"benin","BM":"bermuda","BT":"bhutan","BO":"bolivia",
    "BQ":"bonaire","BA":"bosnia-and-herzegovina","BW":"botswana","BR":"brazil","BN":"brunei","BG":"bulgaria",
    "BF":"burkina-faso","BI":"burundi",
    // --- C-D ---
    "CV":"cabo-verde","KH":"cambodia","CM":"cameroon","CA":"canada","KY":"cayman-islands",
    "CF":"central-african-republic","TD":"chad","CL":"chile","CN":"china","CX":"christmas-island","CO":"colombia",
    "KM":"comoros","CK":"cook-islands","CR":"costa-rica","HR":"croatia","CU":"cuba","CY":"cyprus","CZ":"czechia",
    "DK":"denmark","DJ":"djibouti","DM":"dominica","DO":"dominican-republic",
    // --- E-G ---
    "EC":"ecuador","EG":"egypt","SV":"el-salvador","GQ":"equatorial-guinea","ER":"eritrea","EE":"estonia",
    "SZ":"eswatini","ET":"ethiopia","FO":"faroe-islands","FJ":"fiji","FI":"finland","FR":"france",
    "GF":"french-guiana","PF":"french-polynesia","GA":"gabon","GM":"gambia","GE":"georgia","DE":"germany",
    "GH":"ghana","GI":"gibraltar","GR":"greece","GL":"greenland","GD":"grenada","GP":"guadeloupe","GU":"guam",
    "GT":"guatemala","GG":"guernsey","GN":"guinea","GY":"guyana",
    // --- H-L ---
    "HT":"haiti","HN":"honduras","HK":"hong-kong","HU":"hungary","IS":"iceland","IN":"india","ID":"indonesia",
    "IR":"iran","IQ":"iraq","IE":"ireland","IM":"isle-of-man","IL":"israel","IT":"italy","JM":"jamaica",
    "JP":"japan","JE":"jersey","JO":"jordan","KZ":"kazakhstan","KE":"kenya","KI":"kiribati","XK":"kosovo",
    "KW":"kuwait","KG":"kyrgyzstan","LA":"laos","LV":"latvia","LB":"lebanon","LS":"lesotho","LR":"liberia",
    "LY":"libya","LI":"liechtenstein","LT":"lithuania","LU":"luxembourg",
    // --- M-O ---
    "MO":"macau","MG":"madagascar","MW":"malawi","MY":"malaysia","MV":"maldives","ML":"mali","MT":"malta",
    "MH":"marshall-islands","MQ":"martinique","MR":"mauritania","MU":"mauritius","YT":"mayotte","MX":"mexico",
    "FM":"micronesia","MD":"moldova","MC":"monaco","MN":"mongolia","ME":"montenegro","MS":"montserrat",
    "MA":"morocco","MZ":"mozambique","NA":"namibia","NR":"nauru","NP":"nepal","NL":"netherlands",
    "NC":"new-caledonia","NZ":"new-zealand","NI":"nicaragua","NE":"niger","NG":"nigeria","NU":"niue",
    "NF":"norfolk-island","KP":"north-korea","MK":"north-macedonia","MP":"northern-mariana-islands","NO":"norway",
    "OM":"oman",
    // --- P-R ---
    "PK":"pakistan","PW":"palau","PA":"panama","PG":"papua-new-guinea","PY":"paraguay","PE":"peru",
    "PH":"philippines","PN":"pitcairn-islands","PL":"poland","PT":"portugal","PR":"puerto-rico","QA":"qatar",
    "RE":"reunion","RO":"romania","RU":"russia","RW":"rwanda",
    // --- S ---
    "BL":"saint-barthelemy","SH":"saint-helena","KN":"saint-kitts-and-nevis","LC":"saint-lucia",
    "MF":"saint-martin","PM":"saint-pierre-and-miquelon","VC":"saint-vincent-and-the-grenadines","WS":"samoa",
    "SM":"san-marino","ST":"sao-tome-and-principe","SA":"saudi-arabia","SN":"senegal","RS":"serbia",
    "SC":"seychelles","SL":"sierra-leone","SG":"singapore","SX":"sint-maarten","SK":"slovakia","SI":"slovenia",
    "SB":"solomon-islands","SO":"somalia","ZA":"south-africa","GS":"south-georgia-and-south-sandwich-islands",
    "KR":"south-korea","SS":"south-sudan","ES":"spain","LK":"sri-lanka","SD":"sudan","SR":"suriname",
    "SE":"sweden","CH":"switzerland","SY":"syria",
    // --- T-Z ---
    "TW":"taiwan","TJ":"tajikistan","TZ":"tanzania","TH":"thailand","TG":"togo","TO":"tonga",
    "TT":"trinidad-and-tobago","TN":"tunisia","TR":"turkey","TM":"turkmenistan","TC":"turks-and-caicos-islands",
    "TV":"tuvalu","UG":"uganda","UA":"ukraine","AE":"united-arab-emirates","GB":"united-kingdom",
    "US":"united-states","UY":"uruguay","UZ":"uzbekistan","VU":"vanuatu","VA":"vatican-city","VE":"venezuela",
    "VN":"vietnam","VI":"virgin-islands","WF":"wallis-and-futuna","YE":"yemen","ZM":"zambia","ZW":"zimbabwe",
};

// === CURRENCY LINKS (redar.net) ===
// Kod waluty ISO 4217 -> pelny link do redar.net. Zaszywany w wierszu kursu (app.js: "1 PLN = X <KOD>" oraz
// "1 <KOD> ="), gdzie <KOD> staje sie linkiem. Klucz to kod waluty z FACTBOOK.currencies, wiec JEDNA waluta
// obsluguje WIELE krajow (EUR, USD, XOF, XAF...). Wpis = link, brak = sam kod bez linku.
// Zrodlo: lista z waluty.txt zweryfikowana na zywo (2026-07-20) - kazdy adres zwraca profil waluty.
// POMINIETE: US1/US5/USo z pliku to NIE waluty (strony banknotow/wariantow), nie pasuja do ^[A-Z]{3}$.
// PLN jest w bazie, ale wiersz kursu i tak pomija currKey==='PLN' (dom), wiec link dla Polski sie nie pokazuje.
const CURRENCY_LINKS = {
    "AED":"https://www.redar.net/waluta/AED","AFN":"https://www.redar.net/waluta/AFN","ALL":"https://www.redar.net/waluta/ALL","AMD":"https://www.redar.net/waluta/AMD",
    "AOA":"https://www.redar.net/waluta/AOA","ARS":"https://www.redar.net/waluta/ARS","AUD":"https://www.redar.net/waluta/AUD","AWG":"https://www.redar.net/waluta/AWG",
    "AZN":"https://www.redar.net/waluta/AZN","BAM":"https://www.redar.net/waluta/BAM","BBD":"https://www.redar.net/waluta/BBD","BDT":"https://www.redar.net/waluta/BDT",
    "BGN":"https://www.redar.net/waluta/BGN","BHD":"https://www.redar.net/waluta/BHD","BIF":"https://www.redar.net/waluta/BIF","BND":"https://www.redar.net/waluta/BND",
    "BOB":"https://www.redar.net/waluta/BOB","BRL":"https://www.redar.net/waluta/BRL","BSD":"https://www.redar.net/waluta/BSD","BTN":"https://www.redar.net/waluta/BTN",
    "BWP":"https://www.redar.net/waluta/BWP","BYN":"https://www.redar.net/waluta/BYN","BZD":"https://www.redar.net/waluta/BZD","CAD":"https://www.redar.net/waluta/CAD",
    "CDF":"https://www.redar.net/waluta/CDF","CHF":"https://www.redar.net/waluta/CHF","CLP":"https://www.redar.net/waluta/CLP","CNY":"https://www.redar.net/waluta/CNY",
    "COP":"https://www.redar.net/waluta/COP","CRC":"https://www.redar.net/waluta/CRC","CUP":"https://www.redar.net/waluta/CUP","CVE":"https://www.redar.net/waluta/CVE",
    "CZK":"https://www.redar.net/waluta/CZK","DJF":"https://www.redar.net/waluta/DJF","DKK":"https://www.redar.net/waluta/DKK","DOP":"https://www.redar.net/waluta/DOP",
    "DZD":"https://www.redar.net/waluta/DZD","EGP":"https://www.redar.net/waluta/EGP","ERN":"https://www.redar.net/waluta/ERN","ETB":"https://www.redar.net/waluta/ETB",
    "EUR":"https://www.redar.net/waluta/EUR","FJD":"https://www.redar.net/waluta/FJD","GBP":"https://www.redar.net/waluta/GBP","GEL":"https://www.redar.net/waluta/GEL",
    "GHS":"https://www.redar.net/waluta/GHS","GIP":"https://www.redar.net/waluta/GIP","GMD":"https://www.redar.net/waluta/GMD","GNF":"https://www.redar.net/waluta/GNF",
    "GTQ":"https://www.redar.net/waluta/GTQ","GYD":"https://www.redar.net/waluta/GYD","HKD":"https://www.redar.net/waluta/HKD","HNL":"https://www.redar.net/waluta/HNL",
    "HTG":"https://www.redar.net/waluta/HTG","HUF":"https://www.redar.net/waluta/HUF","IDR":"https://www.redar.net/waluta/IDR","ILS":"https://www.redar.net/waluta/ILS",
    "INR":"https://www.redar.net/waluta/INR","IQD":"https://www.redar.net/waluta/IQD","IRR":"https://www.redar.net/waluta/IRR","ISK":"https://www.redar.net/waluta/ISK",
    "JMD":"https://www.redar.net/waluta/JMD","JOD":"https://www.redar.net/waluta/JOD","JPY":"https://www.redar.net/waluta/JPY","KES":"https://www.redar.net/waluta/KES",
    "KGS":"https://www.redar.net/waluta/KGS","KHR":"https://www.redar.net/waluta/KHR","KMF":"https://www.redar.net/waluta/KMF","KRW":"https://www.redar.net/waluta/KRW",
    "KWD":"https://www.redar.net/waluta/KWD","KZT":"https://www.redar.net/waluta/KZT","LAK":"https://www.redar.net/waluta/LAK","LBP":"https://www.redar.net/waluta/LBP",
    "LKR":"https://www.redar.net/waluta/LKR","LRD":"https://www.redar.net/waluta/LRD","LSL":"https://www.redar.net/waluta/LSL","LYD":"https://www.redar.net/waluta/LYD",
    "MAD":"https://www.redar.net/waluta/MAD","MDL":"https://www.redar.net/waluta/MDL","MGA":"https://www.redar.net/waluta/MGA","MKD":"https://www.redar.net/waluta/MKD",
    "MMK":"https://www.redar.net/waluta/MMK","MNT":"https://www.redar.net/waluta/MNT","MOP":"https://www.redar.net/waluta/MOP","MRU":"https://www.redar.net/waluta/MRU",
    "MUR":"https://www.redar.net/waluta/MUR","MVR":"https://www.redar.net/waluta/MVR","MWK":"https://www.redar.net/waluta/MWK","MXN":"https://www.redar.net/waluta/MXN",
    "MYR":"https://www.redar.net/waluta/MYR","MZN":"https://www.redar.net/waluta/MZN","NAD":"https://www.redar.net/waluta/NAD","NGN":"https://www.redar.net/waluta/NGN",
    "NIO":"https://www.redar.net/waluta/NIO","NOK":"https://www.redar.net/waluta/NOK","NPR":"https://www.redar.net/waluta/NPR","NZD":"https://www.redar.net/waluta/NZD",
    "OMR":"https://www.redar.net/waluta/OMR","PEN":"https://www.redar.net/waluta/PEN","PGK":"https://www.redar.net/waluta/PGK","PHP":"https://www.redar.net/waluta/PHP",
    "PKR":"https://www.redar.net/waluta/PKR","PLN":"https://www.redar.net/waluta/PLN","PYG":"https://www.redar.net/waluta/PYG","QAR":"https://www.redar.net/waluta/QAR",
    "RON":"https://www.redar.net/waluta/RON","RSD":"https://www.redar.net/waluta/RSD","RUB":"https://www.redar.net/waluta/RUB","RWF":"https://www.redar.net/waluta/RWF",
    "SAR":"https://www.redar.net/waluta/SAR","SBD":"https://www.redar.net/waluta/SBD","SCR":"https://www.redar.net/waluta/SCR","SDG":"https://www.redar.net/waluta/SDG",
    "SEK":"https://www.redar.net/waluta/SEK","SGD":"https://www.redar.net/waluta/SGD","SOS":"https://www.redar.net/waluta/SOS","SRD":"https://www.redar.net/waluta/SRD",
    "SSP":"https://www.redar.net/waluta/SSP","STN":"https://www.redar.net/waluta/STN","SYP":"https://www.redar.net/waluta/SYP","SZL":"https://www.redar.net/waluta/SZL",
    "THB":"https://www.redar.net/waluta/THB","TJS":"https://www.redar.net/waluta/TJS","TMT":"https://www.redar.net/waluta/TMT","TND":"https://www.redar.net/waluta/TND",
    "TOP":"https://www.redar.net/waluta/TOP","TRY":"https://www.redar.net/waluta/TRY","TTD":"https://www.redar.net/waluta/TTD","TWD":"https://www.redar.net/waluta/TWD",
    "TZS":"https://www.redar.net/waluta/TZS","UAH":"https://www.redar.net/waluta/UAH","UGX":"https://www.redar.net/waluta/UGX","USD":"https://www.redar.net/waluta/USD",
    "UYU":"https://www.redar.net/waluta/UYU","UZS":"https://www.redar.net/waluta/UZS","VES":"https://www.redar.net/waluta/VES","VND":"https://www.redar.net/waluta/VND",
    "VUV":"https://www.redar.net/waluta/VUV","WST":"https://www.redar.net/waluta/WST","XAF":"https://www.redar.net/waluta/XAF","XCD":"https://www.redar.net/waluta/XCD",
    "XOF":"https://www.redar.net/waluta/XOF","XPF":"https://www.redar.net/waluta/XPF","YER":"https://www.redar.net/waluta/YER","ZAR":"https://www.redar.net/waluta/ZAR",
    "ZMW":"https://www.redar.net/waluta/ZMW",
};

// === RELIGION LINKS (pl.wikipedia) ===
// Wiersz RELIGION w profilu kraju (app.js) linkuje do artykulu o DOMINUJACEJ wierze. Wartosci w RELIGIONS sa
// zlozone ("Islam (Szyizm)", "Chrzescijanstwo (Anglikanizm)", "Katolicyzm / Voodoo", "Ateizm panstwowy",
// "Brak (Nauka)"...). App.js NIE mapuje calego stringa - liczy sie DOMINUJACA (pierwsza) wiara oraz jej ewentualny
// PODGATUNEK w nawiasie. Dwie bazy, dopasowanie przez toLowerCase().indexOf (bez stripDiacritics - 'ł' sie nie
// rozklada, dlatego klucze maja polskie znaki). Zweryfikowane na pl.wikipedia 2026-07-20 (0 martwych).
//
// RELIGION_SUBLINKS - konkretne odlamy; WYGRYWAJA, gdy dookreslaja DOMINUJACA wiare (w nawiasie albo gdy sam odlam
// jest pierwszy). App liczy je TYLKO w segmencie przed pierwszym '/', wiec "Chrzescijanstwo (Anglikanizm)" ->
// Anglikanizm, ale "Katolicyzm / Anglikanizm" (Gibraltar, katolicki) zostaje Katolicyzmem. Odlamy pojawiajace sie
// zawsze PO nawiasie/slashu bazy (Voodoo, Animizm, Santeria, Taoizm, Metodyzm-po-Protestantyzmie) nie musza tu byc.
const RELIGION_SUBLINKS = {
    "anglikanizm":"https://pl.wikipedia.org/wiki/Anglikanizm",
    "szyizm":"https://pl.wikipedia.org/wiki/Szyizm",
    "sunnizm":"https://pl.wikipedia.org/wiki/Sunnizm",
    "wahhabizm":"https://pl.wikipedia.org/wiki/Wahhabizm",
    "ibadatyzm":"https://pl.wikipedia.org/wiki/Ibadytyzm",
    "baptyzm":"https://pl.wikipedia.org/wiki/Baptyzm",
    "metodyzm":"https://pl.wikipedia.org/wiki/Metodyzm",
    "kongregacjonizm":"https://pl.wikipedia.org/wiki/Kongregacjonalizm",
    "ormiańskie":"https://pl.wikipedia.org/wiki/Apostolski_Kościół_Ormiański",
};
// RELIGION_LINKS - religie-bazy; uzywane, gdy w dominujacej grupie nie ma zadnego odlamu z SUBLINKS. Bierzemy
// slowo-klucz o NAJMNIEJSZYM indeksie w calej wartosci (= pierwsza wymieniona wiara). "Brak (...)" / bezludne
// terytoria nie maja klucza -> brak linku. "Brak wyznania" swiadomie bez klucza (samo -> bez linku; w zlozeniu
// linkuje sie realna religia obok). Podgatunki-jako-przymiotniki/zarty ("Zlaicyzowany", "Bog i Pieniadz",
// "Ekalesia Niue", "Prot./Kat.") nie sa kluczami -> spadaja na baze.
const RELIGION_LINKS = {
    "katolicyzm":"https://pl.wikipedia.org/wiki/Katolicyzm",
    "chrześcijaństwo":"https://pl.wikipedia.org/wiki/Chrześcijaństwo",
    "prawosławie":"https://pl.wikipedia.org/wiki/Prawosławie",
    "luteranizm":"https://pl.wikipedia.org/wiki/Luteranizm",
    "protestantyzm":"https://pl.wikipedia.org/wiki/Protestantyzm",
    "adwentyzm":"https://pl.wikipedia.org/wiki/Adwentyzm_dnia_siódmego",
    "islam":"https://pl.wikipedia.org/wiki/Islam",
    "judaizm":"https://pl.wikipedia.org/wiki/Judaizm",
    "hinduizm":"https://pl.wikipedia.org/wiki/Hinduizm",
    "buddyzm":"https://pl.wikipedia.org/wiki/Buddyzm",
    "shinto":"https://pl.wikipedia.org/wiki/Shintō",
    "religie ludowe":"https://pl.wikipedia.org/wiki/Religia_ludowa",
    "ateizm":"https://pl.wikipedia.org/wiki/Ateizm",
};

// === WONDER INTEL (foto + opis + linki z YAML) ===
const WONDER_INTEL = {
    "CN": { img: "foty/GREAT_WALL.jpg", desc: "Wielki Mur Chiński to potężny system starożytnych fortyfikacji, zbudowany w celu ochrony północnych granic Chin przed najazdami. Jego budowa trwała wiele stuleci, a poszczególne fragmenty wznoszono za panowania różnych dynastii. Całkowita długość muru przekracza 21 tysięcy kilometrów, co czyni go najdłuższą sztuczną strukturą na Ziemi. Jest to jeden z najbardziej rozpoznawalnych symboli ludzkiej wytrwałości i inżynierii.", unsplash: "https://unsplash.com/s/photos/GREAT-WALL", wiki: "https://pl.wikipedia.org/wiki/Wielki_Mur_Chi%C5%84ski" },
    "IT": { img: "foty/COLOSSEUM.jpg", desc: "Koloseum to monumentalny amfiteatr z czasów Cesarstwa Rzymskiego, znajdujący się w samym sercu Rzymu. W starożytności odbywały się tam brutalne walki gladiatorów, polowania na dzikie zwierzęta i głośne widowiska publiczne. Budowla mogła pomieścić dziesiątki tysięcy widzów, zachwycając zaawansowanymi rozwiązaniami architektonicznymi. Mimo upływu wieków i licznych zniszczeń, do dziś pozostaje jednym z najwspanialszych zabytków antycznych.", unsplash: "https://unsplash.com/s/photos/COLOSSEUM", wiki: "https://pl.wikipedia.org/wiki/Koloseum" },
    "JO": { img: "foty/PETRA.jpg", desc: "Petra to starożytne miasto Nabatejczyków, wykute w malowniczych skałach na terenie dzisiejszej Jordanii. Słynie z niesamowitych fasad świątyń i grobowców, z których najbardziej znany jest słynny Skarbiec Faraona. W przeszłości miasto to było niezwykle ważnym punktem na szlaku handlowym łączącym Azję z Półwyspem Arabskim. Unikalna architektura i niesamowite barwy piaskowca przyciągają obecnie miliony turystów.", unsplash: "https://unsplash.com/s/photos/PETRA", wiki: "https://pl.wikipedia.org/wiki/Petra" },
    "MX": { img: "foty/CHICHEN_ITZA.jpg", desc: "Chichen Itza to rozległe ruiny starożytnego miasta Majów na meksykańskim półwyspie Jukatan. Jej centralnym punktem jest imponująca piramida Kukulkana, znana również jako El Castillo, która pełniła funkcję wielkiego kalendarza astronomicznego. Miasto było niegdyś głównym ośrodkiem politycznym, kulturalnym i religijnym tego niezwykłego regionu. Zespół zachowanych świątyń i boisk dowodzi ogromnej wiedzy architektonicznej i matematycznej prekolumbijskich ludów.", unsplash: "https://unsplash.com/s/photos/CHICHEN-ITZA", wiki: "https://pl.wikipedia.org/wiki/Chich%C3%A9n_Itz%C3%A1" },
    "PE": { img: "foty/MACHU_PICCHU.jpg", desc: "Machu Picchu to najlepiej zachowane miasto Inków, ukryte wysoko w peruwiańskich Andach. Zostało zbudowane w XV wieku z niezwykłą precyzją bez użycia zaprawy murarskiej, a następnie opuszczone i zapomniane na setki lat. Pełniło najprawdopodobniej funkcję sanktuarium, obserwatorium astronomicznego lub letniej rezydencji inkaskich władców. Dziś zachwyca spektakularnym położeniem wśród stromych górskich szczytów i mistyczną atmosferą.", unsplash: "https://unsplash.com/s/photos/MACHU-PICCHU", wiki: "https://pl.wikipedia.org/wiki/Machu_Picchu" },
    "IN": { img: "foty/TAJ_MAHAL.jpg", desc: "Taj Mahal to olśniewające mauzoleum z białego marmuru, zlokalizowane w Agrze na terenie Indii. Zostało wzniesione w XVII wieku przez cesarza Szahdżahana jako dowód miłości po śmierci jego ukochanej żony, Mumtaz Mahal. Budowla łączy w sobie elementy architektury islamskiej, perskiej i indyjskiej, słynąc z idealnych proporcji oraz pięknych zdobień. Jest powszechnie uważana za jeden z najpiękniejszych budynków, jakie kiedykolwiek stworzono.", unsplash: "https://unsplash.com/s/photos/TAJ-MAHAL", wiki: "https://pl.wikipedia.org/wiki/Tad%C5%BC_Mahal" },
    "BR": { img: "foty/CHRIST_THE_REDEEMER.jpg", desc: "Pomnik Chrystusa Odkupiciela to monumentalna rzeźba w stylu art deco, górująca nad Rio de Janeiro ze szczytu góry Corcovado. Mierząca blisko 30 metrów figura z szeroko rozłożonymi ramionami wydaje się obejmować i chronić całe miasto. Została odsłonięta w 1931 roku i od tamtej pory stanowi najważniejszy symbol Brazylii. Jest to nie tylko obiekt kultu religijnego, ale i ogromna atrakcja turystyczna z wyjątkowym punktem widokowym.", unsplash: "https://unsplash.com/s/photos/CHRIST-THE-REDEEMER", wiki: "https://pl.wikipedia.org/wiki/Statua_Chrystusa_Zbawiciela_w_Rio_de_Janeiro" },
    "EG": { img: "foty/PYRAMIDS_OF_GIZA.jpg", desc: "Piramidy w Gizie to kompleks starożytnych grobowców faraonów, z których największa jest słynna Wielka Piramida Cheopsa. Zostały zbudowane ponad cztery i pół tysiąca lat temu z ogromnych kamiennych bloków, których transport do dziś fascynuje badaczy. Są jedynym cudem świata starożytnego, który przetrwał do naszych czasów w niemal nienaruszonym stanie. Budowle te stanowią niezwykłe świadectwo potęgi, wierzeń i zdolności inżynieryjnych starożytnego Egiptu.", unsplash: "https://unsplash.com/s/photos/PYRAMIDS-OF-GIZA", wiki: "https://pl.wikipedia.org/wiki/Piramidy_w_Gizie" },
    "GR": { img: "foty/ACROPOLIS.jpg", desc: "Akropol to wapienne wzgórze górujące nad Atenami, będące najważniejszym miejscem starożytnej Grecji. Znajduje się tam kompleks wspaniałych świątyń, z których najsłynniejszą jest monumentalny Partenon poświęcony bogini Atenie. Budowle te stanowią niedościgniony wzór klasycznej architektury i sztuki greckiej. Akropol jest trwałym symbolem narodzin zachodniej cywilizacji oraz idei demokracji.", unsplash: "https://unsplash.com/s/photos/ACROPOLIS", wiki: "https://pl.wikipedia.org/wiki/Akropol" },
    "ES": { img: "foty/ALHAMBRA.jpg", desc: "Alhambra to zachwycający zespół pałacowo-zamkowy w hiszpańskiej Grenadzie, będący arcydziełem architektury mauretańskiej. Charakteryzuje się misternymi zdobieniami, wspaniałymi dziedzińcami oraz pięknymi ogrodami, z których nieustannie płynie dźwięk fontann. Twierdza służyła niegdyś jako siedziba emiratów arabskich na Półwyspie Iberyjskim, zanim została przejęta przez chrześcijańskich władców. Kompleks idealnie wpisuje się w krajobraz gór Sierra Nevada, tworząc iście bajkową scenerię.", unsplash: "https://unsplash.com/s/photos/ALHAMBRA", wiki: "https://pl.wikipedia.org/wiki/Alhambra" },
    "KH": { img: "foty/ANGKOR_WAT.jpg", desc: "Angkor Wat to gigantyczny kompleks świątynny w Kambodży, zbudowany pierwotnie w XII wieku jako sanktuarium hinduistyczne. Z czasem przekształcił się w miejsce kultu buddyjskiego, stanowiąc najważniejsze serce dawnego Imperium Khmerskiego. Budowla słynie z klasycznej architektury, olśniewających płaskorzeźb oraz ogromnych wież w kształcie pąków lotosu. Jest to największy zabytek religijny na świecie, a jego ikoniczny zarys widnieje nawet na fladze państwowej Kambodży.", unsplash: "https://unsplash.com/s/photos/ANGKOR-WAT", wiki: "https://pl.wikipedia.org/wiki/Angkor_Wat" },
    "CL": { img: "foty/MOAI.jpg", desc: "Posągi Moai to monolityczne figury z tufu wulkanicznego, rozsiane po całej Wyspie Wielkanocnej na Pacyfiku. Zostały wyrzeźbione wieki temu przez polinezyjskich osadników i miały za zadanie symbolizować ich deifikowanych przodków. Wiele z rzeźb mierzy kilkanaście metrów wysokości i waży kilkadziesiąt ton, co czyni ich transport wielką zagadką dla archeologów. Tajemnicze kamienne twarze stały się ikonicznym symbolem odizolowanej kultury tej maleńkiej wyspy.", unsplash: "https://unsplash.com/s/photos/MOAI", wiki: "https://pl.wikipedia.org/wiki/Moai" },
    "FR": { img: "foty/EIFFEL_TOWER.jpg", desc: "Wieża Eiffla to charakterystyczna żeliwna konstrukcja, która od ponad wieku dominuje w panoramie Paryża. Została zbudowana na Wystawę Światową w 1889 roku i początkowo spotkała się z ogromną krytyką wielu francuskich artystów. Z czasem stała się jednak najsłynniejszym symbolem Francji oraz jednym z najchętniej odwiedzanych zabytków na Ziemi. Ze szczytu wieży roztacza się zapierający dech w piersiach widok na całą stolicę.", unsplash: "https://unsplash.com/s/photos/EIFFEL-TOWER", wiki: "https://pl.wikipedia.org/wiki/Wie%C5%BCa_Eiffla" },
    "TR": { img: "foty/HAGIA_SOPHIA.jpg", desc: "Hagia Sophia to wybitne dzieło architektury bizantyjskiej znajdujące się w Stambule. Przez wiele wieków pełniła funkcję największej świątyni chrześcijańskiej, by później zostać przekształconą w meczet, a następnie w muzeum. Zachwyca ogromną kopułą wydającą się unosić w powietrzu oraz przepięknymi chrześcijańskimi mozaikami ocalałymi obok islamskich inskrypcji. Stanowi fascynujący pomnik łączący wielkie dziedzictwo dwóch kultur i religii.", unsplash: "https://unsplash.com/s/photos/HAGIA-SOPHIA", wiki: "https://pl.wikipedia.org/wiki/Hagia_Sophia" },
    "JP": { img: "foty/KIYOMIZU-DERA.jpg", desc: "Kiyomizu-dera to zabytkowa świątynia buddyjska, malowniczo położona na zalesionych wzgórzach we wschodnim Kioto. Jej nazwa nawiązuje do wodospadu spływającego z pobliskich gór, którego wody mają rzekomo właściwości oczyszczające. Główny pawilon posiada słynny drewniany taras, wzniesiony całkowicie bez użycia gwoździ, z którego można podziwiać miasto i kwitnące wiśnie. Jest to jedno z najważniejszych historycznych i duchowych miejsc w całej Japonii.", unsplash: "https://unsplash.com/s/photos/KIYOMIZU-DERA", wiki: "https://pl.wikipedia.org/wiki/Kiyomizu-dera" },
    "RU": { img: "foty/KREMLIN.jpg", desc: "Kreml Moskiewski to warowna siedziba władców Rosji, położona w samym sercu stolicy tuż obok Placu Czerwonego. Wewnątrz potężnych ceglanych murów znajduje się wspaniały kompleks zabytkowych cerkwi, pałaców oraz budynków administracyjnych. Przez stulecia budowla była luksusową rezydencją carów, a obecnie służy jako oficjalna siedziba prezydenta kraju. Miejsce to łączy w sobie potęgę dawnego imperium z imponującą architekturą wschodniego chrześcijaństwa.", unsplash: "https://unsplash.com/s/photos/KREMLIN", wiki: "https://pl.wikipedia.org/wiki/Kreml_moskiewski" },
    "DE": { img: "foty/NEUSCHWANSTEIN.jpg", desc: "Zamek Neuschwanstein to bajkowa budowla wzniesiona na stromym wzgórzu w bawarskich Alpach przez króla Ludwika II. Inspirowany operami Ryszarda Wagnera i średniowiecznymi legendami, zamek nigdy nie został w pełni ukończony za życia ekscentrycznego monarchy. Jego smukłe wieże i romantyczny styl stały się później pierwowzorem dla słynnego zamku z animacji Walta Disneya. Obecnie jest to jedna z najbardziej malowniczych i najczęściej fotografowanych atrakcji w Niemczech.", unsplash: "https://unsplash.com/s/photos/NEUSCHWANSTEIN", wiki: "https://pl.wikipedia.org/wiki/Neuschwanstein" },
    "US": { img: "foty/STATUE_OF_LIBERTY.jpg", desc: "Statua Wolności to potężny miedziany posąg na wyspie w Nowym Jorku, podarowany narodowi amerykańskiemu przez Francuzów w 1886 roku. Przedstawia rzymską boginię Libertas, trzymającą w dłoniach płonącą pochodnię oraz tablicę z datą ogłoszenia niepodległości USA. Przez dekady była pierwszym widokiem dla milionów imigrantów przybywających do Stanów Zjednoczonych drogą morską. Dziś stanowi powszechnie rozpoznawalny na całym świecie symbol wolności, nadziei i samej Ameryki.", unsplash: "https://unsplash.com/s/photos/STATUE-OF-LIBERTY", wiki: "https://pl.wikipedia.org/wiki/Statua_Wolno%C5%9Bci" },
    "GB": { img: "foty/STONEHENGE.jpg", desc: "Stonehenge to tajemniczy krąg ogromnych głazów, wzniesiony na równinie Salisbury w południowej Anglii. Konstrukcja pochodzi z epoki neolitu i brązu, a jej budowa trwała w kilku etapach przez setki lat. Prawdopodobnie pełnił rolę kalendarza astronomicznego, świątyni lub bardzo ważnego miejsca pochówku pradawnych ludów. Sposób przetransportowania i precyzyjnego ułożenia tych wielkich kamieni do dziś budzi żywe dyskusje wśród badaczy i archeologów.", unsplash: "https://unsplash.com/s/photos/STONEHENGE", wiki: "https://pl.wikipedia.org/wiki/Stonehenge" },
    "AU": { img: "foty/SYDNEY_OPERA HOUSE.jpg", desc: "Opera w Sydney to jedno z najwspanialszych osiągnięć współczesnej architektury, położone nad wodami zatoki Port Jackson. Jej ikoniczny dach przypomina białe żagle wydęte na wietrze lub ogromne muszle wyrzucone na brzeg. Budynek gości liczne spektakle operowe, teatralne i muzyczne, będąc głównym ośrodkiem kulturalnym w Australii. Nowoczesna bryła opery stała się niezaprzeczalnym symbolem tego miasta i całego kontynentu.", unsplash: "https://unsplash.com/s/photos/SYDNEY-OPERA-HOUSE", wiki: "https://pl.wikipedia.org/wiki/Sydney_Opera_House" },
    "ML": { img: "foty/TIMBUKTU.jpg", desc: "Timbuktu to historyczne miasto w Mali, niegdyś słynące jako kluczowe centrum handlu i nauki islamskiej w Afryce Zachodniej. Swoje największe bogactwo czerpało z lukratywnego handlu złotem, solą i kością słoniową przemierzającymi szlaki Sahary. Znajdują się tam unikalne meczety zbudowane z gliny oraz bezcenne biblioteki przechowujące starożytne, cenne rękopisy. Choć z biegiem lat miasto utraciło dawny blask, wciąż pobudza wyobraźnię jako synonim odległego, bardzo tajemniczego miejsca.", unsplash: "https://unsplash.com/s/photos/TIMBUKTU", wiki: "https://pl.wikipedia.org/wiki/Timbuktu" },
};


// === CONTINENT INTEL (glob z Continental_Icons + dane) ===
const CONTINENT_INTEL = {
    "EU":   { img: "cont/EU.svg",   area: "10 180 000 km²", pop: "~745M", unsplash: "https://unsplash.com/s/photos/europe", wiki: "https://pl.wikipedia.org/wiki/Europa" },
    "ASIA": { img: "cont/ASIA.svg", area: "44 580 000 km²", pop: "~4.75B", unsplash: "https://unsplash.com/s/photos/asia", wiki: "https://pl.wikipedia.org/wiki/Azja" },
    "NA":   { img: "cont/NA.svg",   area: "24 709 000 km²", pop: "~600M", unsplash: "https://unsplash.com/s/photos/north-america", wiki: "https://pl.wikipedia.org/wiki/Ameryka_Północna" },
    "SA":   { img: "cont/SA.svg",   area: "17 840 000 km²", pop: "~435M", unsplash: "https://unsplash.com/s/photos/south-america", wiki: "https://pl.wikipedia.org/wiki/Ameryka_Południowa" },
    "AF":   { img: "cont/AF.svg",   area: "30 370 000 km²", pop: "~1.48B", unsplash: "https://unsplash.com/s/photos/africa", wiki: "https://pl.wikipedia.org/wiki/Afryka" },
    "OC":   { img: "cont/OC.svg",   area: "8 600 000 km²",  pop: "~45M", unsplash: "https://unsplash.com/s/photos/oceania", wiki: "https://pl.wikipedia.org/wiki/Oceania" },
};

// === TOP 10 MIAST / KONTYNENT (metropolie, przyblizone) ===
const CONTINENT_CITIES = {
    "ASIA": [["Tokyo","37.4M",35.6895,139.6917],["Delhi","32.9M",28.7041,77.1025],["Shanghai","29.2M",31.2304,121.4737],["Dhaka","23.2M",23.8103,90.4125],["Beijing","21.8M",39.9042,116.4074],["Mumbai","21.3M",19.076,72.8777],["Osaka","19.0M",34.6937,135.5023],["Chongqing","17.3M",29.4316,106.9123],["Karachi","17.2M",24.8607,67.0011],["Kolkata","15.6M",22.5726,88.3639]],
    "AF": [["Cairo","22.2M",30.0444,31.2357],["Kinshasa","16.3M",-4.4419,15.2663],["Lagos","15.9M",6.5244,3.3792],["Luanda","9.3M",-8.839,13.2894],["Dar es Salaam","7.8M",-6.7924,39.2083],["Johannesburg","6.4M",-26.2041,28.0473],["Khartoum","6.3M",15.5007,32.5599],["Abidjan","5.7M",5.36,-4.0083],["Alexandria","5.6M",31.2001,29.9187],["Nairobi","5.4M",-1.2921,36.8219]],
    "EU": [["Istanbul","15.6M",41.0082,28.9784],["Moscow","12.7M",55.7558,37.6173],["Paris","11.2M",48.8566,2.3522],["London","9.6M",51.5074,-0.1278],["Madrid","6.7M",40.4168,-3.7038],["Saint Petersburg","5.6M",59.9311,30.3609],["Barcelona","5.6M",41.3851,2.1734],["Rome","4.3M",41.9028,12.4964],["Berlin","3.6M",52.52,13.405],["Athens","3.2M",37.9838,23.7275]],
    "NA": [["Mexico City","22.3M",19.4326,-99.1332],["New York City","18.9M",40.7128,-74.006],["Los Angeles","12.5M",34.0522,-118.2437],["Chicago","8.9M",41.8781,-87.6298],["Dallas","7.6M",32.7767,-96.797],["Houston","7.1M",29.7604,-95.3698],["Toronto","6.4M",43.6532,-79.3832],["Washington","6.3M",38.9072,-77.0369],["Miami","6.1M",25.7617,-80.1918],["Philadelphia","5.7M",39.9526,-75.1652]],
    "SA": [["Sao Paulo","22.6M",-23.5505,-46.6333],["Buenos Aires","15.6M",-34.6037,-58.3816],["Rio de Janeiro","13.6M",-22.9068,-43.1729],["Bogota","11.3M",4.711,-74.0721],["Lima","11.2M",-12.0464,-77.0428],["Santiago","6.9M",-33.4489,-70.6693],["Belo Horizonte","6.2M",-19.9167,-43.9345],["Brasilia","4.8M",-15.8267,-47.9218],["Porto Alegre","4.3M",-30.0346,-51.2177],["Fortaleza","4.2M",-3.7319,-38.5267]],
    "OC": [["Sydney","5.3M",-33.8688,151.2093],["Melbourne","5.2M",-37.8136,144.9631],["Brisbane","2.6M",-27.4698,153.0251],["Perth","2.1M",-31.9505,115.8605],["Auckland","1.7M",-36.8485,174.7633],["Adelaide","1.4M",-34.9285,138.6007],["Gold Coast","0.7M",-28.0167,153.4],["Canberra","0.46M",-35.2809,149.13],["Wellington","0.42M",-41.2865,174.7762],["Christchurch","0.38M",-43.5321,172.6362]],
};
