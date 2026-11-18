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
      { name: "Plegable", models: [ ["iPhone Duo", null, "AF"] ] }
    ] },
    { id: "samsung", name: "Samsung", sub: "Galaxy", groups: [
      { name: "Galaxy S26", models: [ ["Galaxy S26 Ultra", 199, "T5"], ["Galaxy S26+", 159, "T4"], ["Galaxy S26", 139, "T4"], ["Galaxy S26 FE", 119, "T3"] ] },
      { name: "Galaxy S25", models: [ ["Galaxy S25 Ultra", 189, "T5"], ["Galaxy S25 Edge", 159, "T4"], ["Galaxy S25+", 149, "T4"], ["Galaxy S25", 129, "T4"], ["Galaxy S25 FE", 109, "T3"] ] },
      { name: "Galaxy S24", models: [ ["Galaxy S24 Ultra", 169, "T5"], ["Galaxy S24+", 139, "T4"], ["Galaxy S24", 119, "T4"], ["Galaxy S24 FE", 99, "T3"] ] },
      { name: "Galaxy S23", models: [ ["Galaxy S23 Ultra", 159, "T5"], ["Galaxy S23+", 129, "T4"], ["Galaxy S23", 109, "T4"], ["Galaxy S23 FE", 89, "T3"] ] },
      { name: "Galaxy S22", models: [ ["Galaxy S22 Ultra", 149, "T5"], ["Galaxy S22+", 119, "T4"], ["Galaxy S22", 99, "T4"] ] },
      { name: "Galaxy S21", models: [ ["Galaxy S21 Ultra", 139, "T5"], ["Galaxy S21+", 109, "T4"], ["Galaxy S21", 89, "T4"], ["Galaxy S21 FE", 79, "T3"] ] },
      { name: "Galaxy A (gama media)", models: [ ["Galaxy A57", 119, "T3"], ["Galaxy A56", 115, "T3"], ["Galaxy A55", 109, "T3"], ["Galaxy A54", 99, "T2"], ["Galaxy A53", 95, "T2"], ["Galaxy A52", 89, "T2"], ["Galaxy A36", 99, "T3"], ["Galaxy A35", 95, "T2"], ["Galaxy A34", 89, "T2"], ["Galaxy A33", 79, "T2"], ["Galaxy A26", 85, "T2"], ["Galaxy A25", 79, "T2"], ["Galaxy A24", 75, "T2"], ["Galaxy A23", 69, "T2"] ] },
      { name: "Galaxy A (básicos)", models: [ ["Galaxy A17", 75, "T1"], ["Galaxy A16", 69, "T1"], ["Galaxy A15", 69, "T1"], ["Galaxy A14", 65, "T1"], ["Galaxy A13", 59, "T1"], ["Galaxy A12", 59, "T1"], ["Galaxy A22", 69, "T1"] ] },
      { name: "Galaxy Z (plegables)", models: [ ["Galaxy Z Fold8 Ultra", null, "TF"], ["Galaxy Z Fold8", null, "TF"], ["Galaxy Z Fold7", null, "TF"], ["Galaxy Z Fold6", null, "TF"], ["Galaxy Z Fold5", null, "TF"], ["Galaxy Z Fold4", null, "TF"], ["Galaxy Z Flip8", null, "TF"], ["Galaxy Z Flip7", null, "TF"], ["Galaxy Z Flip7 FE", null, "TF"], ["Galaxy Z Flip6", null, "TF"], ["Galaxy Z Flip5", null, "TF"], ["Galaxy Z Flip4", null, "TF"] ] }
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
      { name: "Plegable", models: [ ["Xiaomi Mix Flip", null, "TF"] ] }
    ] },
    { id: "honor", name: "Honor", sub: "Magic · Honor", groups: [
      { name: "Magic", models: [ ["Honor Magic8 Pro", 199, "T4"], ["Honor Magic8 Lite", 99, "T3"], ["Honor Magic7 Pro", 189, "T4"], ["Honor Magic7 Lite", 99, "T3"], ["Honor Magic6 Pro", 179, "T4"], ["Honor Magic6 Lite", 89, "T2"] ] },
      { name: "Honor 400 / 200 / 90", models: [ ["Honor 400 Pro", 149, "T3"], ["Honor 400", 119, "T3"], ["Honor 400 Lite", 85, "T2"], ["Honor 200 Pro", 139, "T3"], ["Honor 200", 109, "T3"], ["Honor 200 Lite", 79, "T2"], ["Honor 90", 109, "T3"], ["Honor 90 Lite", 75, "T2"] ] },
      { name: "Honor X", models: [ ["Honor X9b", 85, "T2"], ["Honor X8b", 75, "T2"], ["Honor X7b", 65, "T1"] ] }
    ] },
    { id: "huawei", name: "Huawei", sub: "Pura · P · Mate", groups: [
      { name: "Pura", models: [ ["Huawei Pura 80 Ultra", 239, "T5"], ["Huawei Pura 80 Pro", 199, "T4"], ["Huawei Pura 70 Ultra", 219, "T5"], ["Huawei Pura 70 Pro", 189, "T4"], ["Huawei Pura 70", 159, "T4"] ] },
      { name: "Mate / nova", models: [ ["Huawei Mate 50 Pro", 179, "T4"], ["Huawei nova 12", 119, "T3"], ["Huawei nova 11", 109, "T3"], ["Huawei nova 9", 99, "T3"] ] },
      { name: "P series", models: [ ["Huawei P40 Pro", 129, "T3"], ["Huawei P40 Lite", 69, "T1"], ["Huawei P30 Pro", 109, "T3"], ["Huawei P30", 89, "T2"], ["Huawei P30 Lite", 65, "T1"], ["Huawei P Smart 2021", 59, "T1"] ] }
    ] },
    { id: "oppo", name: "OPPO", sub: "Reno · Find · A", groups: [
      { name: "Find", models: [ ["OPPO Find X8 Pro", 229, "T5"], ["OPPO Find X8", 189, "T4"] ] },
      { name: "Reno", models: [ ["OPPO Reno15", 149, "T3"], ["OPPO Reno14", 149, "T3"], ["OPPO Reno14 F", 99, "T2"], ["OPPO Reno13", 129, "T3"], ["OPPO Reno12", 119, "T3"], ["OPPO Reno11", 109, "T3"], ["OPPO Reno10", 99, "T2"], ["OPPO Reno8", 89, "T2"] ] },
      { name: "A series", models: [ ["OPPO A98", 85, "T2"], ["OPPO A79", 79, "T2"], ["OPPO A78", 75, "T2"], ["OPPO A60", 75, "T2"], ["OPPO A58", 69, "T1"], ["OPPO A57", 65, "T1"], ["OPPO A38", 65, "T1"] ] }
    ] },
    { id: "realme", name: "realme", sub: "Serie · GT · C", groups: [
      { name: "Serie 14 / 13 / 12 / 11", models: [ ["realme 14 Pro+", 119, "T3"], ["realme 14 Pro", 99, "T2"], ["realme 13 Pro+", 119, "T3"], ["realme 13 Pro", 99, "T2"], ["realme 12 Pro+", 109, "T3"], ["realme 12 Pro", 95, "T2"], ["realme 12", 75, "T2"], ["realme 11 Pro+", 99, "T2"], ["realme 11 Pro", 89, "T2"], ["realme 11", 75, "T2"] ] },
      { name: "GT", models: [ ["realme GT 7 Pro", 189, "T4"], ["realme GT 6", 149, "T4"] ] },
      { name: "C series", models: [ ["realme C75", 65, "T1"], ["realme C67", 65, "T1"], ["realme C55", 59, "T1"], ["realme C53", 55, "T1"] ] }
    ] },
    { id: "oneplus", name: "OnePlus", sub: "Nord · Serie", groups: [
      { name: "OnePlus (flagship)", models: [ ["OnePlus 15", 199, "T4"], ["OnePlus 15R", 169, "T4"], ["OnePlus 13", 179, "T4"], ["OnePlus 13R", 149, "T3"], ["OnePlus 12", 169, "T4"], ["OnePlus 12R", 139, "T3"], ["OnePlus 11", 149, "T4"] ] },
      { name: "OnePlus Nord", models: [ ["OnePlus Nord 5", 119, "T3"], ["OnePlus Nord 4", 109, "T3"], ["OnePlus Nord CE5", 99, "T3"], ["OnePlus Nord CE4", 95, "T2"], ["OnePlus Nord 3", 99, "T3"], ["OnePlus Nord CE3", 89, "T2"] ] }
    ] },
    { id: "motorola", name: "Motorola", sub: "moto g · edge", groups: [
      { name: "moto edge", models: [ ["motorola edge 60 pro", 139, "T3"], ["motorola edge 60 fusion", 109, "T3"], ["motorola edge 50 pro", 129, "T3"], ["motorola edge 50 fusion", 99, "T2"], ["motorola edge 50 neo", 99, "T2"], ["motorola edge 40 neo", 95, "T2"] ] },
      { name: "moto g", models: [ ["moto g86", 85, "T2"], ["moto g85", 85, "T2"], ["moto g75", 85, "T2"], ["moto g56", 75, "T2"], ["moto g55", 75, "T2"], ["moto g54", 75, "T2"], ["moto g45", 69, "T1"], ["moto g35", 65, "T1"], ["moto g34", 65, "T1"], ["moto g24", 59, "T1"], ["moto g15", 59, "T1"], ["moto g05", 55, "T1"], ["moto g04", 55, "T1"] ] },
      { name: "razr (plegables)", models: [ ["motorola razr 60", null, "TF"], ["motorola razr 50", null, "TF"], ["motorola razr 40", null, "TF"] ] }
    ] },
    { id: "pixel", name: "Google", sub: "Pixel", groups: [
      { name: "Pixel 11", models: [ ["Pixel 11 Pro XL", 249, "T5"], ["Pixel 11 Pro", 259, "T5"], ["Pixel 11", 189, "T4"] ] },
      { name: "Pixel 10", models: [ ["Pixel 10 Pro XL", 239, "T5"], ["Pixel 10 Pro", 259, "T5"], ["Pixel 10", 179, "T4"] ] },
      { name: "Pixel 9", models: [ ["Pixel 9 Pro XL", 229, "T5"], ["Pixel 9 Pro", 219, "T5"], ["Pixel 9", 169, "T4"], ["Pixel 9a", 139, "T3"] ] },
      { name: "Pixel 8 / 7 / 6", models: [ ["Pixel 8 Pro", 169, "T4"], ["Pixel 8", 149, "T4"], ["Pixel 8a", 119, "T3"], ["Pixel 7 Pro", 149, "T4"], ["Pixel 7", 119, "T3"], ["Pixel 7a", 99, "T3"], ["Pixel 6 Pro", 139, "T4"], ["Pixel 6", 109, "T3"], ["Pixel 6a", 89, "T2"] ] },
      { name: "Plegable", models: [ ["Pixel 9 Pro Fold", null, "TF"] ] }
    ] }
  ]
};
