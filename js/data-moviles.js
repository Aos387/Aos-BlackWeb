// =====================================================================
//  PRECIOS DE REPARACIÓN DE MÓVILES  ·  AOS SAT
//  Edita aquí los precios. Todo son precios ORIENTATIVOS ("desde"), con pieza y mano de obra.
//
//  - tiers: precio de cada reparación según la "gama" del modelo (A1-A4 = iPhone, T1-T5 = Android, TF/AF = plegables).
//  - cada modelo: ['Nombre', precio de pantalla (null = a consultar), 'gama']
//  - para cambiar UN precio concreto de un modelo, cambia el número de su línea (pantalla)
//    o la gama (para el resto de reparaciones).
//  - Los precios se basan en tarifas oficiales y de mercado en España (nov. 2026); ajústalos a tus costes.
// =====================================================================
window.AOS_PHONES = {
  vat: 'IVA incluido',
  repairs: [
    {
      "id": "screen",
      "name": "Pantalla",
      "desc": "Cristal roto, líneas, manchas o táctil que falla"
    },
    {
      "id": "battery",
      "name": "Batería",
      "desc": "Dura poco, se apaga sola o está hinchada"
    },
    {
      "id": "charge",
      "name": "Conector de carga",
      "desc": "No carga o el cable no hace contacto"
    },
    {
      "id": "camera",
      "name": "Cámara trasera",
      "desc": "Fotos borrosas, cristal roto o no abre"
    },
    {
      "id": "back",
      "name": "Tapa o cristal trasero",
      "desc": "Trasera rota o agrietada"
    },
    {
      "id": "speaker",
      "name": "Altavoz y micrófono",
      "desc": "No se oye, no te oyen o suena mal"
    }
  ],
  tiers: {
    A1: {"battery": 49, "charge": 49, "camera": 69, "back": 59, "speaker": 45},
    A2: {"battery": 69, "charge": 59, "camera": 89, "back": 89, "speaker": 49},
    A3: {"battery": 89, "charge": 69, "camera": 99, "back": 109, "speaker": 55},
    A4: {"battery": 109, "charge": 79, "camera": 149, "back": 129, "speaker": 59},
    AF: {"battery": 199, "charge": 129, "camera": 229, "back": 199, "speaker": 99},
    T1: {"battery": 39, "charge": 39, "camera": 49, "back": 29, "speaker": 35},
    T2: {"battery": 45, "charge": 45, "camera": 59, "back": 35, "speaker": 39},
    T3: {"battery": 55, "charge": 49, "camera": 69, "back": 45, "speaker": 45},
    T4: {"battery": 65, "charge": 59, "camera": 89, "back": 59, "speaker": 55},
    T5: {"battery": 75, "charge": 65, "camera": 109, "back": 69, "speaker": 59},
    TF: {"battery": 99, "charge": 79, "camera": 129, "back": 89, "speaker": 69}
  },
  brands: [
    { id: "apple", name: "Apple", sub: "iPhone", groups: [
      { name: "iPhone 18", models: [ ["iPhone 18 Pro Max", 259, "A4"], ["iPhone 18 Pro", 229, "A4"] ] },
      { name: "iPhone 17", models: [ ["iPhone 17 Pro Max", 239, "A4"], ["iPhone 17 Pro", 209, "A4"], ["iPhone Air", 189, "A4"], ["iPhone 17", 179, "A3"], ["iPhone 17e", 149, "A3"] ] },
      { name: "iPhone 16", models: [ ["iPhone 16 Pro Max", 219, "A4"], ["iPhone 16 Pro", 189, "A4"], ["iPhone 16 Plus", 169, "A3"], ["iPhone 16", 159, "A3"], ["iPhone 16e", 139, "A3"] ] },
      { name: "iPhone 15", models: [ ["iPhone 15 Pro Max", 199, "A4"], ["iPhone 15 Pro", 179, "A4"], ["iPhone 15 Plus", 159, "A3"], ["iPhone 15", 149, "A3"] ] },
      { name: "iPhone 14", models: [ ["iPhone 14 Pro Max", 189, "A4"], ["iPhone 14 Pro", 169, "A4"], ["iPhone 14 Plus", 149, "A3"], ["iPhone 14", 139, "A3"] ] },
      { name: "iPhone 13", models: [ ["iPhone 13 Pro Max", 159, "A2"], ["iPhone 13 Pro", 139, "A2"], ["iPhone 13", 129, "A2"], ["iPhone 13 mini", 119, "A2"] ] },
      { name: "iPhone 12", models: [ ["iPhone 12 Pro Max", 139, "A2"], ["iPhone 12 Pro", 129, "A2"], ["iPhone 12", 119, "A2"], ["iPhone 12 mini", 109, "A2"] ] },
      { name: "iPhone 11", models: [ ["iPhone 11 Pro Max", 109, "A1"], ["iPhone 11 Pro", 99, "A1"], ["iPhone 11", 89, "A1"] ] },
      { name: "iPhone X / XS / XR", models: [ ["iPhone XS Max", 89, "A1"], ["iPhone XS", 79, "A1"], ["iPhone X", 79, "A1"], ["iPhone XR", 79, "A1"] ] },
      { name: "iPhone SE / 8", models: [ ["iPhone SE (3.ª gen., 2022)", 69, "A1"], ["iPhone SE (2.ª gen., 2020)", 59, "A1"], ["iPhone 8 Plus", 69, "A1"], ["iPhone 8", 59, "A1"] ] },
      { name: "iPhone 7 / 6", models: [ ["iPhone 7 Plus", 59, "A1"], ["iPhone 7", 49, "A1"], ["iPhone 6s Plus", 59, "A1"], ["iPhone 6s", 49, "A1"], ["iPhone 6 Plus", 55, "A1"], ["iPhone 6", 45, "A1"], ["iPhone SE (1.ª gen., 2016)", 45, "A1"] ] },
      { name: "Plegable", models: [ ["iPhone Duo", null, "AF"] ] }
    ] },
    { id: "samsung", name: "Samsung", sub: "Galaxy", groups: [
      { name: "Galaxy S26", models: [ ["Galaxy S26 Ultra", 199, "T5"], ["Galaxy S26+", 159, "T4"], ["Galaxy S26", 139, "T4"], ["Galaxy S26 FE", 119, "T3"] ] },
      { name: "Galaxy S25", models: [ ["Galaxy S25 Ultra", 189, "T5"], ["Galaxy S25 Edge", 159, "T4"], ["Galaxy S25+", 149, "T4"], ["Galaxy S25", 129, "T4"], ["Galaxy S25 FE", 109, "T3"] ] },
      { name: "Galaxy S24", models: [ ["Galaxy S24 Ultra", 169, "T5"], ["Galaxy S24+", 139, "T4"], ["Galaxy S24", 119, "T4"], ["Galaxy S24 FE", 99, "T3"] ] },
      { name: "Galaxy S23", models: [ ["Galaxy S23 Ultra", 159, "T5"], ["Galaxy S23+", 129, "T4"], ["Galaxy S23", 109, "T4"], ["Galaxy S23 FE", 89, "T3"] ] },
      { name: "Galaxy S22", models: [ ["Galaxy S22 Ultra", 149, "T5"], ["Galaxy S22+", 119, "T4"], ["Galaxy S22", 99, "T4"] ] },
      { name: "Galaxy S21", models: [ ["Galaxy S21 Ultra", 139, "T5"], ["Galaxy S21+", 109, "T4"], ["Galaxy S21", 89, "T4"], ["Galaxy S21 FE", 79, "T3"] ] },
      { name: "Galaxy S20", models: [ ["Galaxy S20 Ultra", 139, "T5"], ["Galaxy S20+", 119, "T4"], ["Galaxy S20", 109, "T4"], ["Galaxy S20 FE", 89, "T3"] ] },
      { name: "Galaxy S10", models: [ ["Galaxy S10 5G", 119, "T4"], ["Galaxy S10+", 109, "T4"], ["Galaxy S10", 99, "T4"], ["Galaxy S10e", 89, "T3"], ["Galaxy S10 Lite", 85, "T3"] ] },
      { name: "Galaxy Note", models: [ ["Galaxy Note 20 Ultra", 149, "T5"], ["Galaxy Note 20", 119, "T4"], ["Galaxy Note 10+", 119, "T4"], ["Galaxy Note 10", 109, "T4"], ["Galaxy Note 10 Lite", 89, "T3"] ] },
      { name: "Galaxy A (gama media)", models: [ ["Galaxy A57", 119, "T3"], ["Galaxy A56", 115, "T3"], ["Galaxy A55", 109, "T3"], ["Galaxy A54", 99, "T2"], ["Galaxy A53", 95, "T2"], ["Galaxy A52", 89, "T2"], ["Galaxy A36", 99, "T3"], ["Galaxy A35", 95, "T2"], ["Galaxy A34", 89, "T2"], ["Galaxy A33", 79, "T2"], ["Galaxy A26", 85, "T2"], ["Galaxy A25", 79, "T2"], ["Galaxy A24", 75, "T2"], ["Galaxy A23", 69, "T2"] ] },
      { name: "Galaxy A (básicos)", models: [ ["Galaxy A17", 75, "T1"], ["Galaxy A16", 69, "T1"], ["Galaxy A15", 69, "T1"], ["Galaxy A14", 65, "T1"], ["Galaxy A13", 59, "T1"], ["Galaxy A12", 59, "T1"], ["Galaxy A22", 69, "T1"] ] },
      { name: "Galaxy A (anteriores)", models: [ ["Galaxy A80", 99, "T3"], ["Galaxy A73", 95, "T2"], ["Galaxy A72", 89, "T2"], ["Galaxy A71", 89, "T2"], ["Galaxy A70", 85, "T2"], ["Galaxy A51", 85, "T2"], ["Galaxy A50", 79, "T2"], ["Galaxy A42 5G", 79, "T2"], ["Galaxy A41", 69, "T2"], ["Galaxy A40", 69, "T2"], ["Galaxy A32", 75, "T2"], ["Galaxy A31", 69, "T1"], ["Galaxy A30", 65, "T1"], ["Galaxy A21s", 65, "T1"], ["Galaxy A20", 59, "T1"], ["Galaxy A11", 55, "T1"], ["Galaxy A10", 55, "T1"] ] },
      { name: "Galaxy A0x", models: [ ["Galaxy A07", 55, "T1"], ["Galaxy A06", 55, "T1"], ["Galaxy A05s", 59, "T1"], ["Galaxy A05", 55, "T1"], ["Galaxy A04s", 59, "T1"], ["Galaxy A04", 55, "T1"], ["Galaxy A03s", 55, "T1"], ["Galaxy A02s", 55, "T1"] ] },
      { name: "Galaxy Z (plegables)", models: [ ["Galaxy Z Fold8 Ultra", null, "TF"], ["Galaxy Z Fold8", null, "TF"], ["Galaxy Z Fold7", null, "TF"], ["Galaxy Z Fold6", null, "TF"], ["Galaxy Z Fold5", null, "TF"], ["Galaxy Z Fold4", null, "TF"], ["Galaxy Z Flip8", null, "TF"], ["Galaxy Z Flip7", null, "TF"], ["Galaxy Z Flip7 FE", null, "TF"], ["Galaxy Z Flip6", null, "TF"], ["Galaxy Z Flip5", null, "TF"], ["Galaxy Z Flip4", null, "TF"] ] },
      { name: "Galaxy Z (anteriores)", models: [ ["Galaxy Z Fold3", null, "TF"], ["Galaxy Z Flip3", null, "TF"], ["Galaxy Z Fold2", null, "TF"], ["Galaxy Z Flip 5G", null, "TF"], ["Galaxy Z Flip", null, "TF"], ["Galaxy Fold", null, "TF"] ] }
    ] },
    { id: "xiaomi", name: "Xiaomi", sub: "Redmi · POCO", groups: [
      { name: "Xiaomi 17", models: [ ["Xiaomi 17T Pro", 189, "T4"], ["Xiaomi 17T", 169, "T4"], ["Xiaomi 17 Ultra", 229, "T5"], ["Xiaomi 17", 179, "T4"] ] },
      { name: "Xiaomi 15", models: [ ["Xiaomi 15T Pro", 169, "T4"], ["Xiaomi 15T", 149, "T4"], ["Xiaomi 15 Ultra", 219, "T5"], ["Xiaomi 15", 169, "T4"] ] },
      { name: "Xiaomi 14", models: [ ["Xiaomi 14T Pro", 159, "T4"], ["Xiaomi 14T", 139, "T4"], ["Xiaomi 14 Ultra", 209, "T5"], ["Xiaomi 14", 159, "T4"] ] },
      { name: "Xiaomi 13 / 12", models: [ ["Xiaomi 13T Pro", 149, "T4"], ["Xiaomi 13T", 129, "T4"], ["Xiaomi 13 Ultra", 199, "T5"], ["Xiaomi 13 Pro", 179, "T4"], ["Xiaomi 13", 149, "T4"], ["Xiaomi 13 Lite", 99, "T3"], ["Xiaomi 12T Pro", 149, "T4"], ["Xiaomi 12T", 129, "T4"], ["Xiaomi 12", 139, "T4"] ] },
      { name: "Redmi Note 17", models: [ ["Redmi Note 17 Pro Max 5G", 139, "T3"], ["Redmi Note 17 Pro 5G", 119, "T3"], ["Redmi Note 17 5G", 89, "T2"], ["Redmi Note 17", 85, "T2"] ] },
      { name: "Redmi Note 15", models: [ ["Redmi Note 15 Pro+ 5G", 119, "T3"], ["Redmi Note 15 Pro 5G", 99, "T2"], ["Redmi Note 15 Pro", 99, "T2"], ["Redmi Note 15", 79, "T2"] ] },
      { name: "Redmi Note 14", models: [ ["Redmi Note 14 Pro+ 5G", 119, "T3"], ["Redmi Note 14 Pro 5G", 99, "T2"], ["Redmi Note 14 Pro", 99, "T2"], ["Redmi Note 14 5G", 79, "T2"], ["Redmi Note 14", 79, "T2"] ] },
      { name: "Redmi Note 13", models: [ ["Redmi Note 13 Pro+ 5G", 119, "T3"], ["Redmi Note 13 Pro 5G", 99, "T2"], ["Redmi Note 13 Pro", 99, "T2"], ["Redmi Note 13 5G", 79, "T2"], ["Redmi Note 13", 79, "T2"] ] },
      { name: "Redmi Note 12", models: [ ["Redmi Note 12 Pro+ 5G", 109, "T3"], ["Redmi Note 12 Pro 5G", 99, "T2"], ["Redmi Note 12 Pro", 95, "T2"], ["Redmi Note 12 5G", 79, "T2"], ["Redmi Note 12", 75, "T2"] ] },
      { name: "Redmi Note 11 / 10", models: [ ["Redmi Note 11 Pro+ 5G", 99, "T2"], ["Redmi Note 11 Pro 5G", 89, "T2"], ["Redmi Note 11 Pro", 89, "T2"], ["Redmi Note 11S", 75, "T2"], ["Redmi Note 11", 75, "T2"], ["Redmi Note 10 Pro", 85, "T2"], ["Redmi Note 10S", 69, "T1"], ["Redmi Note 10 5G", 69, "T1"], ["Redmi Note 10", 69, "T1"] ] },
      { name: "Redmi (números y A)", models: [ ["Redmi 15", 65, "T1"], ["Redmi 15C", 59, "T1"], ["Redmi 14C", 59, "T1"], ["Redmi 13", 59, "T1"], ["Redmi 13C", 55, "T1"], ["Redmi 12", 59, "T1"], ["Redmi 12C", 49, "T1"], ["Redmi A5", 49, "T1"], ["Redmi A3", 49, "T1"] ] },
      { name: "POCO X", models: [ ["POCO X8 Pro Max", 139, "T3"], ["POCO X8 Pro", 109, "T3"], ["POCO X7 Pro", 99, "T2"], ["POCO X7", 89, "T2"], ["POCO X6 Pro", 99, "T2"], ["POCO X6", 95, "T2"], ["POCO X5 Pro", 99, "T2"], ["POCO X5", 89, "T2"] ] },
      { name: "POCO F", models: [ ["POCO F9 Ultra", 229, "T5"], ["POCO F9 Pro", 179, "T4"], ["POCO F8 Ultra", 219, "T5"], ["POCO F8 Pro", 169, "T4"], ["POCO F7 Ultra", 199, "T5"], ["POCO F7 Pro", 149, "T4"], ["POCO F7", 119, "T3"], ["POCO F6 Pro", 149, "T4"], ["POCO F6", 119, "T3"], ["POCO F5 Pro", 129, "T3"], ["POCO F5", 109, "T3"] ] },
      { name: "POCO M", models: [ ["POCO M8 Pro 5G", 89, "T2"], ["POCO M7 Pro 5G", 79, "T2"], ["POCO M6 Pro", 79, "T2"], ["POCO M6", 69, "T1"] ] },
      { name: "Xiaomi 11 / 11T", models: [ ["Xiaomi 11T Pro", 139, "T4"], ["Xiaomi 11T", 119, "T3"], ["Xiaomi 11 Lite 5G NE", 99, "T3"], ["Mi 11 Ultra", 169, "T5"], ["Mi 11", 149, "T4"], ["Mi 11 Lite 5G", 99, "T3"], ["Mi 11 Lite", 89, "T2"] ] },
      { name: "Mi 10 / Mi 9", models: [ ["Mi 10T Pro", 119, "T3"], ["Mi 10T", 109, "T3"], ["Mi 10T Lite", 79, "T2"], ["Mi 10 Pro", 139, "T4"], ["Mi 10", 129, "T4"], ["Mi 10 Lite", 89, "T2"], ["Mi 9T Pro", 99, "T3"], ["Mi 9T", 89, "T3"], ["Mi 9", 99, "T3"], ["Mi 9 Lite", 79, "T2"], ["Mi Note 10", 109, "T3"] ] },
      { name: "Redmi Note 9 / 8 / 7", models: [ ["Redmi Note 9 Pro", 75, "T2"], ["Redmi Note 9S", 75, "T2"], ["Redmi Note 9T 5G", 69, "T2"], ["Redmi Note 9", 69, "T1"], ["Redmi Note 8 Pro", 69, "T1"], ["Redmi Note 8T", 65, "T1"], ["Redmi Note 8", 65, "T1"], ["Redmi Note 7", 59, "T1"] ] },
      { name: "Redmi 10 / 9 / 8", models: [ ["Redmi 10 5G", 59, "T1"], ["Redmi 10", 59, "T1"], ["Redmi 10C", 55, "T1"], ["Redmi 10A", 49, "T1"], ["Redmi 9T", 59, "T1"], ["Redmi 9C", 49, "T1"], ["Redmi 9A", 49, "T1"], ["Redmi 9", 55, "T1"], ["Redmi 8", 49, "T1"] ] },
      { name: "POCO (anteriores)", models: [ ["POCO X4 Pro 5G", 89, "T2"], ["POCO X4 GT", 89, "T2"], ["POCO X3 Pro", 79, "T2"], ["POCO X3 NFC", 75, "T2"], ["POCO F4 GT", 119, "T3"], ["POCO F4", 99, "T3"], ["POCO F3", 99, "T3"], ["POCO F2 Pro", 99, "T3"], ["POCO M5s", 69, "T1"], ["POCO M5", 69, "T1"], ["POCO M4 Pro", 69, "T1"], ["POCO M3", 65, "T1"], ["POCO C75", 59, "T1"], ["POCO C65", 55, "T1"] ] },
      { name: "Plegable", models: [ ["Xiaomi Mix Flip", null, "TF"] ] }
    ] },
    { id: "honor", name: "Honor", sub: "Magic · Honor", groups: [
      { name: "Magic", models: [ ["Honor Magic8 Pro", 199, "T4"], ["Honor Magic8 Lite", 99, "T3"], ["Honor Magic7 Pro", 189, "T4"], ["Honor Magic7 Lite", 99, "T3"], ["Honor Magic6 Pro", 179, "T4"], ["Honor Magic6 Lite", 89, "T2"] ] },
      { name: "Honor 400 / 200 / 90", models: [ ["Honor 400 Pro", 149, "T3"], ["Honor 400", 119, "T3"], ["Honor 400 Lite", 85, "T2"], ["Honor 200 Pro", 139, "T3"], ["Honor 200", 109, "T3"], ["Honor 200 Lite", 79, "T2"], ["Honor 90", 109, "T3"], ["Honor 90 Lite", 75, "T2"] ] },
      { name: "Honor X", models: [ ["Honor X9b", 85, "T2"], ["Honor X8b", 75, "T2"], ["Honor X7b", 65, "T1"] ] },
      { name: "Honor (anteriores)", models: [ ["Honor 70", 109, "T3"], ["Honor 70 Lite", 69, "T1"], ["Honor 50", 99, "T3"], ["Honor 50 Lite", 79, "T2"], ["Honor 20 Pro", 99, "T3"], ["Honor 20", 89, "T2"], ["Honor 10 Lite", 59, "T1"] ] }
    ] },
    { id: "huawei", name: "Huawei", sub: "Pura · P · Mate", groups: [
      { name: "Pura", models: [ ["Huawei Pura 80 Ultra", 239, "T5"], ["Huawei Pura 80 Pro", 199, "T4"], ["Huawei Pura 70 Ultra", 219, "T5"], ["Huawei Pura 70 Pro", 189, "T4"], ["Huawei Pura 70", 159, "T4"] ] },
      { name: "Mate / nova", models: [ ["Huawei Mate 50 Pro", 179, "T4"], ["Huawei nova 12", 119, "T3"], ["Huawei nova 11", 109, "T3"], ["Huawei nova 9", 99, "T3"] ] },
      { name: "P series", models: [ ["Huawei P40 Pro", 129, "T3"], ["Huawei P40 Lite", 69, "T1"], ["Huawei P30 Pro", 109, "T3"], ["Huawei P30", 89, "T2"], ["Huawei P30 Lite", 65, "T1"], ["Huawei P Smart 2021", 59, "T1"] ] },
      { name: "Mate / P / nova (anteriores)", models: [ ["Huawei Mate 40 Pro", 169, "T4"], ["Huawei Mate 30 Pro", 149, "T4"], ["Huawei Mate 20 Pro", 129, "T3"], ["Huawei Mate 20", 109, "T3"], ["Huawei nova 5T", 85, "T2"], ["Huawei P20 Pro", 99, "T3"], ["Huawei P20", 89, "T2"], ["Huawei P20 Lite", 59, "T1"], ["Huawei P Smart Z", 65, "T1"], ["Huawei P Smart 2019", 59, "T1"], ["Huawei Y9 2019", 59, "T1"], ["Huawei Y6 2019", 55, "T1"] ] }
    ] },
    { id: "oppo", name: "OPPO", sub: "Reno · Find · A", groups: [
      { name: "Find X", models: [ ["OPPO Find X8 Ultra", 249, "T5"], ["OPPO Find X8 Pro", 229, "T5"], ["OPPO Find X8", 189, "T4"], ["OPPO Find X7 Ultra", 219, "T5"], ["OPPO Find X7", 179, "T4"], ["OPPO Find X6 Pro", 189, "T5"], ["OPPO Find X5 Pro", 169, "T4"], ["OPPO Find X5", 149, "T4"], ["OPPO Find X5 Lite", 99, "T3"], ["OPPO Find X3 Pro", 139, "T4"], ["OPPO Find X3 Neo", 109, "T3"], ["OPPO Find X3 Lite", 85, "T2"], ["OPPO Find X2 Pro", 129, "T4"], ["OPPO Find X2 Lite", 79, "T2"] ] },
      { name: "Reno 15 / 14 / 13", models: [ ["OPPO Reno15", 149, "T3"], ["OPPO Reno14 Pro", 169, "T3"], ["OPPO Reno14", 149, "T3"], ["OPPO Reno14 F", 99, "T2"], ["OPPO Reno13 Pro", 149, "T3"], ["OPPO Reno13", 129, "T3"], ["OPPO Reno13 F", 95, "T2"] ] },
      { name: "Reno 12 / 11 / 10", models: [ ["OPPO Reno12 Pro", 139, "T3"], ["OPPO Reno12", 119, "T3"], ["OPPO Reno12 F", 89, "T2"], ["OPPO Reno11 Pro", 129, "T3"], ["OPPO Reno11", 109, "T3"], ["OPPO Reno11 F", 89, "T2"], ["OPPO Reno10 Pro+", 139, "T3"], ["OPPO Reno10 Pro", 119, "T3"], ["OPPO Reno10", 99, "T2"] ] },
      { name: "Reno 8 / 7 / 6", models: [ ["OPPO Reno8 Pro", 109, "T3"], ["OPPO Reno8", 89, "T2"], ["OPPO Reno8 Lite", 79, "T2"], ["OPPO Reno7 Pro", 99, "T3"], ["OPPO Reno7", 85, "T2"], ["OPPO Reno7 Lite", 75, "T2"], ["OPPO Reno6 Pro", 99, "T3"], ["OPPO Reno6", 89, "T2"] ] },
      { name: "Reno 5 / 4", models: [ ["OPPO Reno5 Pro 5G", 99, "T3"], ["OPPO Reno5 5G", 89, "T2"], ["OPPO Reno5 Lite", 75, "T2"], ["OPPO Reno4 Pro", 99, "T3"], ["OPPO Reno4 Z 5G", 79, "T2"], ["OPPO Reno4 Lite", 69, "T1"] ] },
      { name: "Serie A (recientes)", models: [ ["OPPO A98", 85, "T2"], ["OPPO A79", 79, "T2"], ["OPPO A78", 75, "T2"], ["OPPO A60", 75, "T2"], ["OPPO A58", 69, "T1"], ["OPPO A57", 65, "T1"], ["OPPO A38", 65, "T1"], ["OPPO A18", 59, "T1"], ["OPPO A17", 59, "T1"], ["OPPO A16", 55, "T1"], ["OPPO A15", 55, "T1"], ["OPPO A5 Pro", 69, "T1"], ["OPPO A5", 59, "T1"] ] },
      { name: "Serie A (anteriores)", models: [ ["OPPO A96", 79, "T2"], ["OPPO A94", 79, "T2"], ["OPPO A93", 75, "T2"], ["OPPO A91", 75, "T2"], ["OPPO A77", 69, "T1"], ["OPPO A76", 69, "T1"], ["OPPO A74", 69, "T1"], ["OPPO A73", 65, "T1"], ["OPPO A72", 69, "T1"], ["OPPO A54", 65, "T1"], ["OPPO A53", 65, "T1"] ] },
      { name: "Find N (plegables)", models: [ ["OPPO Find N5", null, "TF"], ["OPPO Find N3", null, "TF"], ["OPPO Find N3 Flip", null, "TF"], ["OPPO Find N2 Flip", null, "TF"], ["OPPO Find N2", null, "TF"] ] }
    ] },
    { id: "realme", name: "realme", sub: "Serie · GT · C", groups: [
      { name: "Serie 14 / 13 / 12 / 11", models: [ ["realme 14 Pro+", 119, "T3"], ["realme 14 Pro", 99, "T2"], ["realme 13 Pro+", 119, "T3"], ["realme 13 Pro", 99, "T2"], ["realme 12 Pro+", 109, "T3"], ["realme 12 Pro", 95, "T2"], ["realme 12", 75, "T2"], ["realme 11 Pro+", 99, "T2"], ["realme 11 Pro", 89, "T2"], ["realme 11", 75, "T2"] ] },
      { name: "GT", models: [ ["realme GT 7 Pro", 189, "T4"], ["realme GT 6", 149, "T4"] ] },
      { name: "C series", models: [ ["realme C75", 65, "T1"], ["realme C67", 65, "T1"], ["realme C55", 59, "T1"], ["realme C53", 55, "T1"] ] },
      { name: "realme 10 / 9 / 8 / 7 / 6", models: [ ["realme 10 Pro+", 99, "T2"], ["realme 10 Pro", 89, "T2"], ["realme 10", 75, "T2"], ["realme 9 Pro+", 99, "T2"], ["realme 9 Pro", 85, "T2"], ["realme 9", 75, "T2"], ["realme 9i", 65, "T1"], ["realme 8 Pro", 85, "T2"], ["realme 8", 75, "T2"], ["realme 8i", 65, "T1"], ["realme 7 Pro", 79, "T2"], ["realme 7", 65, "T1"], ["realme 6 Pro", 75, "T2"], ["realme 6", 65, "T1"] ] },
      { name: "realme GT (anteriores)", models: [ ["realme GT 2 Pro", 139, "T4"], ["realme GT Neo 3", 119, "T3"], ["realme GT Master Edition", 99, "T3"], ["realme GT 5G", 119, "T3"] ] },
      { name: "realme C (anteriores)", models: [ ["realme C35", 55, "T1"], ["realme C33", 55, "T1"], ["realme C30", 49, "T1"], ["realme C25", 49, "T1"], ["realme C21", 49, "T1"] ] }
    ] },
    { id: "oneplus", name: "OnePlus", sub: "Nord · Serie", groups: [
      { name: "OnePlus (flagship)", models: [ ["OnePlus 15", 199, "T4"], ["OnePlus 15R", 169, "T4"], ["OnePlus 13", 179, "T4"], ["OnePlus 13R", 149, "T3"], ["OnePlus 12", 169, "T4"], ["OnePlus 12R", 139, "T3"], ["OnePlus 11", 149, "T4"] ] },
      { name: "OnePlus Nord", models: [ ["OnePlus Nord 5", 119, "T3"], ["OnePlus Nord 4", 109, "T3"], ["OnePlus Nord CE5", 99, "T3"], ["OnePlus Nord CE4", 95, "T2"], ["OnePlus Nord 3", 99, "T3"], ["OnePlus Nord CE3", 89, "T2"] ] },
      { name: "OnePlus (anteriores)", models: [ ["OnePlus 10 Pro", 159, "T4"], ["OnePlus 10T", 139, "T4"], ["OnePlus 9 Pro", 149, "T4"], ["OnePlus 9", 129, "T4"], ["OnePlus 8T", 119, "T3"], ["OnePlus 8 Pro", 129, "T4"], ["OnePlus 8", 109, "T3"], ["OnePlus 7T", 99, "T3"], ["OnePlus 7 Pro", 119, "T4"] ] },
      { name: "OnePlus Nord (anteriores)", models: [ ["OnePlus Nord 2T", 99, "T3"], ["OnePlus Nord 2", 99, "T3"], ["OnePlus Nord CE 2", 79, "T2"], ["OnePlus Nord CE 2 Lite", 69, "T2"], ["OnePlus Nord CE", 79, "T2"], ["OnePlus Nord N20 SE", 65, "T1"], ["OnePlus Nord N10", 75, "T2"], ["OnePlus Nord N100", 59, "T1"], ["OnePlus Nord", 89, "T3"] ] }
    ] },
    { id: "motorola", name: "Motorola", sub: "moto g · edge", groups: [
      { name: "moto edge", models: [ ["motorola edge 60 pro", 139, "T3"], ["motorola edge 60 fusion", 109, "T3"], ["motorola edge 50 pro", 129, "T3"], ["motorola edge 50 fusion", 99, "T2"], ["motorola edge 50 neo", 99, "T2"], ["motorola edge 40 neo", 95, "T2"] ] },
      { name: "moto g", models: [ ["moto g86", 85, "T2"], ["moto g85", 85, "T2"], ["moto g75", 85, "T2"], ["moto g56", 75, "T2"], ["moto g55", 75, "T2"], ["moto g54", 75, "T2"], ["moto g45", 69, "T1"], ["moto g35", 65, "T1"], ["moto g34", 65, "T1"], ["moto g24", 59, "T1"], ["moto g15", 59, "T1"], ["moto g05", 55, "T1"], ["moto g04", 55, "T1"] ] },
      { name: "moto edge (anteriores)", models: [ ["motorola edge 40", 99, "T3"], ["motorola edge 30 Ultra", 139, "T4"], ["motorola edge 30 Pro", 129, "T4"], ["motorola edge 30 Neo", 99, "T3"], ["motorola edge 30 Fusion", 95, "T3"], ["motorola edge 30", 89, "T2"], ["motorola edge 20 Pro", 119, "T3"], ["motorola edge 20", 99, "T3"], ["motorola edge 20 Lite", 85, "T2"] ] },
      { name: "moto g (anteriores)", models: [ ["moto g200 5G", 109, "T3"], ["moto g100", 99, "T3"], ["moto g82 5G", 85, "T2"], ["moto g73 5G", 79, "T2"], ["moto g72", 79, "T2"], ["moto g71 5G", 75, "T2"], ["moto g62 5G", 75, "T2"], ["moto g60", 79, "T2"], ["moto g51 5G", 69, "T1"], ["moto g50 5G", 65, "T1"], ["moto g42", 65, "T1"], ["moto g41", 69, "T1"], ["moto g31", 65, "T1"], ["moto g30", 59, "T1"], ["moto g23", 65, "T1"], ["moto g22", 59, "T1"], ["moto g14", 59, "T1"], ["moto g13", 59, "T1"], ["moto g10", 55, "T1"], ["moto g9 Plus", 69, "T1"], ["moto g8 Power", 59, "T1"] ] },
      { name: "razr (plegables)", models: [ ["motorola razr 60", null, "TF"], ["motorola razr 50", null, "TF"], ["motorola razr 40", null, "TF"] ] }
    ] },
    { id: "pixel", name: "Google", sub: "Pixel", groups: [
      { name: "Pixel 11", models: [ ["Pixel 11 Pro XL", 249, "T5"], ["Pixel 11 Pro", 259, "T5"], ["Pixel 11", 189, "T4"] ] },
      { name: "Pixel 10", models: [ ["Pixel 10 Pro XL", 239, "T5"], ["Pixel 10 Pro", 259, "T5"], ["Pixel 10", 179, "T4"] ] },
      { name: "Pixel 9", models: [ ["Pixel 9 Pro XL", 229, "T5"], ["Pixel 9 Pro", 219, "T5"], ["Pixel 9", 169, "T4"], ["Pixel 9a", 139, "T3"] ] },
      { name: "Pixel 8 / 7 / 6", models: [ ["Pixel 8 Pro", 169, "T4"], ["Pixel 8", 149, "T4"], ["Pixel 8a", 119, "T3"], ["Pixel 7 Pro", 149, "T4"], ["Pixel 7", 119, "T3"], ["Pixel 7a", 99, "T3"], ["Pixel 6 Pro", 139, "T4"], ["Pixel 6", 109, "T3"], ["Pixel 6a", 89, "T2"] ] },
      { name: "Pixel 5 / 4 / 3", models: [ ["Pixel 5a", 79, "T2"], ["Pixel 5", 89, "T3"], ["Pixel 4a 5G", 85, "T2"], ["Pixel 4a", 69, "T2"], ["Pixel 4 XL", 99, "T3"], ["Pixel 4", 79, "T2"], ["Pixel 3a XL", 79, "T2"], ["Pixel 3a", 69, "T2"], ["Pixel 3 XL", 89, "T3"], ["Pixel 3", 79, "T2"] ] },
      { name: "Plegable", models: [ ["Pixel 9 Pro Fold", null, "TF"] ] }
    ] },
    { id: "nothing", name: "Nothing", sub: "Phone · CMF", groups: [
      { name: "Phone / CMF", models: [ ["Nothing Phone (3)", 169, "T4"], ["Nothing Phone (3a) Pro", 119, "T3"], ["Nothing Phone (3a)", 99, "T3"], ["Nothing Phone (2a) Plus", 99, "T3"], ["Nothing Phone (2a)", 89, "T2"], ["Nothing Phone (2)", 129, "T4"], ["Nothing Phone (1)", 99, "T3"], ["CMF Phone 2 Pro", 79, "T2"], ["CMF Phone 1", 75, "T2"] ] }
    ] },
    { id: "sony", name: "Sony", sub: "Xperia", groups: [
      { name: "Xperia 1 / 5", models: [ ["Sony Xperia 1 VII", 229, "T5"], ["Sony Xperia 1 VI", 219, "T5"], ["Sony Xperia 1 V", 209, "T5"], ["Sony Xperia 1 IV", 189, "T4"], ["Sony Xperia 5 V", 159, "T4"], ["Sony Xperia 5 IV", 149, "T4"], ["Sony Xperia 5 III", 129, "T4"] ] },
      { name: "Xperia 10", models: [ ["Sony Xperia 10 VII", 119, "T3"], ["Sony Xperia 10 VI", 109, "T3"], ["Sony Xperia 10 V", 99, "T3"], ["Sony Xperia 10 IV", 89, "T2"], ["Sony Xperia 10 III", 79, "T2"] ] }
    ] }
  ]
};
