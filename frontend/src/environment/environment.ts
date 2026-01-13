export const environment = {
  production: true,
  apiUrl: 'http://172.16.15.132:3000/api',
  wsUrl: 'http://172.16.15.32:9000',
  // apiUrl: 'https://chatbot.strauss.ai/strauss/api/chatadvisers',
  urlMT: 'https://graph.facebook.com/v20.0',
  URL_IMG_Users: 'https://devadvs.strauss.ia:999/uploads/users',
  URL_IMG_Empresas: 'https://devadvs.strauss.ia:999/uploads/empresas',
  URL_IMG_BOTS: 'https://devadvs.strauss.ia:999/uploads/imgsBots',
  dataImgDef: 'https://devadvs.strauss.ia:999/templateGer/chatAdv/assets/media/svg/files/blank-image.svg',
  featureFlag: true,
  codPaises: [{ "Afganistán": 93 }, { "Albania": 355 }, { "Alemania": 49 }, { "Andorra": 376 }, { "Angola": 244 }, { "Anguila": 1264 }, { "Antigua y Barbuda": 1268 }, { "Antillas Neerlandesas": 599 }, { "Argelia": 213 }, { "Argentina": 54 }, { "Armenia": 374 }, { "Aruba": 297 }, { "Ascención": 247 }, { "Australia": 61 }, { "Austria": 43 }, { "Azerbaiyán": 994 }, { "Bahamas": 1242 }, { "Bahrein": 973 }, { "Bangladesh": 880 }, { "Barbados": 1246 }, { "Bélgica": 32 }, { "Belice": 501 }, { "Benín": 229 }, { "Bermudas": 1441 }, { "Bielorrusia": 375 }, { "Birmania (Myanmar)": 95 }, { "Bolivia": 591 }, { "Bosnia y Herzegovina": 387 }, { "Botsuana": 267 }, { "Brasil": 55 }, { "Brunei": 673 }, { "Bulgaria": 359 }, { "Burkina Faso": 226 }, { "Burundi": 257 }, { "Bután": 975 }, { "Cabo Verde": 238 }, { "Camboya": 855 }, { "Camerún": 237 }, { "Canadá": 1 }, { "Chad": 235 }, { "Chile": 56 }, { "China": 86 }, { "Chipre": 357 }, { "Colombia": 57 }, { "Comoras": 269 }, { "Congo, República del": 242 }, { "Congo, República Democrática del": 243 }, { "Corea del Norte": 850 }, { "Corea del Sur": 82 }, { "Costa de Marfil": 225 }, { "Costa Rica": 506 }, { "Croacia": 385 }, { "Cuba": 53 }, { "Departamentos y territorios franceses en el Océano Índico": 262 }, { "Diego García": 246 }, { "Dinamarca": 45 }, { "Dominica": 1767 }, { "Ecuador": 593 }, { "Egipto": 20 }, { "El Salvador": 503 }, { "Emiratos Árabes Unidos": 971 }, { "Eritrea": 291 }, { "Eslovaquia": 421 }, { "Eslovenia": 386 }, { "España": 34 }, { "Estados Unidos": 1 }, { "Estonia": 372 }, { "Etiopía": 251 }, { "Filipinas": 63 }, { "Finlandia": 358 }, { "Fiyi": 679 }, { "Francia": 33 }, { "Gabón": 241 }, { "Gambia": 220 }, { "Georgia": 995 }, { "Ghana": 233 }, { "Gibraltar": 350 }, { "Granada": 1473 }, { "Grecia": 30 }, { "Groenlandia": 299 }, { "Guadalupe": 590 }, { "Guam": 1671 }, { "Guatemala": 502 }, { "Guayana Francesa": 594 }, { "Guinea": 224 }, { "Guinea Ecuatorial": 240 }, { "Guinea-Bissau": 245 }, { "Guyana": 592 }, { "Haití": 509 }, { "Honduras": 504 }, { "Hong Kong": 852 }, { "Hungría": 36 }, { "India": 91 }, { "Indonesia": 62 }, { "Irak": 964 }, { "Irán": 98 }, { "Irlanda": 353 }, { "Islandia": 354 }, { "Islas Caimán": 1345 }, { "Islas Cook": 682 }, { "Islas Feroe": 298 }, { "Islas Malvinas (Falkland Islands)": 500 }, { "Islas Marshall": 692 }, { "Islas Salomón": 677 }, { "Islas Turcas y Caicos": 1649 }, { "Islas Vírgenes": 1340 }, { "Islas Vírgenes Británicas": 1284 }, { "Israel": 972 }, { "Italia": 39 }, { "Jamaica": 1876 }, { "Japón": 81 }, { "Jordania": 962 }, { "Kazajstán": 7 }, { "Kenia": 254 }, { "Kirguistán": 996 }, { "Kiribati": 686 }, { "Kuwait": 965 }, { "Laos": 856 }, { "Lesotho": 266 }, { "Letonia": 371 }, { "Líbano": 961 }, { "Liberia": 231 }, { "Libia": 218 }, { "Liechtenstein": 423 }, { "Lituania": 370 }, { "Luxemburgo": 352 }, { "Macao": 853 }, { "Macedonia": 389 }, { "Madagascar": 261 }, { "Malasia": 60 }, { "Malawi": 265 }, { "Maldivas": 960 }, { "Malí": 223 }, { "Malta": 356 }, { "Marruecos": 212 }, { "Martinica": 596 }, { "Mauricio": 230 }, { "Mauritania": 222 }, { "Mayotte ": 269 }, { "México": 52 }, { "Micronesia, Estados Federados de": 691 }, { "Moldavia": 373 }, { "Mónaco": 377 }, { "Mongolia": 976 }, { "Montenegro": 382 }, { "Montserrat": 1664 }, { "Mozambique": 258 }, { "Namibia": 264 }, { "Nauru": 674 }, { "Nepal": 977 }, { "Nicaragua": 505 }, { "Níger": 227 }, { "Nigeria": 234 }, { "Niue": 683 }, { "Noruega ": 47 }, { "Nueva Caledonia": 687 }, { "Nueva Zelanda": 64 }, { "Omán ": 968 }, { "Países Bajos": 31 }, { "Pakistán ": 92 }, { "Palau": 680 }, { "Panamá": 507 }, { "Papúa Nueva Guinea": 675 }, { "Paraguay": 595 }, { "Perú": 51 }, { "Polinesia Francesa": 689 }, { "Polonia": 48 }, { "Portugal ": 351 }, { "Puerto Rico": 1787 / 939 }, { "Qatar": 974 }, { "Reino Unido": 44 }, { "República Centroafricana": 236 }, { "República Checa": 420 }, { "República Dominicana": 1809 / 829 }, { "Ruanda": 250 }, { "Rumanía": 40 }, { "Rusia": 7 }, { "Sahara Occidental": 212 }, { "Samoa": 685 }, { "Samoa Americana": 1684 }, { "San Cristóbal y Nieves": 1869 }, { "San Marino": 378 }, { "San Pedro y Miquelón": 508 }, { "San Vicente y las Granadinas": 1784 }, { "San Vicente y las Granadinas": 966 }, { "Santa Helena": 290 }, { "Santa Lucía": 1758 }, { "Santa Sede (Ciudad del Vaticano)": 37 }, { "Santo Tomé y Príncipe": 239 }, { "Senegal": 221 }, { "Serbia": 381 }, { "Seychelles": 248 }, { "Sierra Leona": 232 }, { "Singapur": 65 }, { "Siria": 963 }, { "Somalia": 252 }, { "Sri Lanka": 94 }, { "Suazilandia": 268 }, { "Sudáfrica": 27 }, { "Sudán": 249 }, { "Suecia": 46 }, { "Suiza": 41 }, { "Surinam": 597 }, { "Tailandia": 66 }, { "Taiwán": 886 }, { "Tanzania": 255 }, { "Tayikistán": 992 }, { "Territorio del Norte": 1670 }, { "Timor-Leste": 670 }, { "Togo": 228 }, { "Tokelau": 690 }, { "Tonga": 676 }, { "Trinidad y Tobago": 1868 }, { "Túnez": 216 }, { "Turkmenistán": 993 }, { "Turquía": 90 }, { "Tuvalu": 688 }, { "Ucrania": 380 }, { "Uganda": 256 }, { "Uruguay": 598 }, { "Uzbekistán": 998 }, { "Vanuatu": 678 }, { "Venezuela": 58 }, { "Vietnam": 84 }, { "Wallis y Futuna": 681 }, { "Yemen": 967 }, { "Yibuti": 253 }, { "Zambia": 260 }, { "Zimbabue ": 263 }],
  posCero: 0,
  posUno: 1,
  posDos: 2,
  posTres: 3,
  posCuatro: 4,
  posCinco: 5,
  posDiez: 10,
  posOnce: 11,
  posDoce: 12,
  posCio: '',
  posErr: 'error',
  posInfo: 'info',
  posSuccs: 'success',
  usuarios: 'usuarios',
  empresas: 'empresas',
  searchTerm: '',
  ImageDefecto: '/assets/media/avatars/blank.png',
  isLoading: true,
  typSmsCpms: null,
  nodosList: null,
  varDash   : 'dashboard',
  varConx   : 'conexion',
  varApg    : 'appDashboard',
  varHid    : 'hirbiendo',
  varTeas   : 'tareas',
  varAds    : 'agendas',
  varLeCc   : 'carrito',
  varChAds  : 'chatadvisers',
  varBot    : 'chatbot',
  varTu     : 'tuacuerdo',
  varAdvs   : 'advisers',
  varFal    : false,


  capitalize: (str: any) => {
    if (str) {
      const strTmp = str.toString().toLowerCase();
      return strTmp.charAt(environment.posCero).toUpperCase() + strTmp.slice(environment.posUno);
    } else {
      return str;
    }
  },

};