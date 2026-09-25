import type { Capability, EcosystemGroup, JourneyStep, Product } from '../types/site';

const productCatalog = {
  sorti: { name: 'Sorti' },
  backoffice: { name: 'BackOffice' },
  sortiEngage: { name: 'SortiEngage' },
  zTickets: { name: 'ZTickets' },
  zPay: { name: 'ZPay' },
  science365: { name: 'Science 365' },
  center: { name: 'Center' },
} as const satisfies Record<string, Product>;

export const siteContent = {
  metadata: {
    title: 'ZGAMES | Tecnología para el juego conectado',
    description:
      'Explora el ecosistema tecnológico de ZGames para operadores, desde productos para jugadores hasta capacidades operativas.',
  },
  brand: {
    name: 'ZGAMES',
    tagline: 'Construimos para ganar.',
  },
  navigation: [
    { label: 'Inicio', href: '#top' },
    { label: 'Nuestro ADN', href: '#ecosystem' },
    { label: 'Universo Z', href: '#capabilities' },
  ],
  hero: {
    title: 'Un ecosistema. Diseñado para tu operación.',
    body: 'Explora los productos y capacidades que conectan la experiencia del jugador, las herramientas de operación, la interacción, la boletería, los datos y el soporte.',
    primaryAction: 'Hablemos de tu operación',
    secondaryAction: 'Explorar el ecosistema',
    imageCaption: 'Una visión más amplia del juego',
    imageCredit: 'ZGAMES / 01',
    highlights: ['EXPERIENCIA DEL JUGADOR', 'HERRAMIENTAS DE OPERACIÓN', 'DATOS Y SOPORTE'],
  },
  ecosystem: {
    eyebrow: 'El ecosistema conectado',
    title: 'Diseñado alrededor de cómo funciona tu operación.',
    intro:
      'Una vista de las experiencias para jugadores, las herramientas de operación y las capacidades especializadas. La disponibilidad y las integraciones dependen de la configuración de cada operador.',
    mapLabel: 'Grupos de productos del ecosistema ZGames',
    groups: [
      {
        id: 'players',
        number: '01',
        name: 'Jugadores',
        products: [productCatalog.sorti],
        description: 'Experiencia de apuesta, juego y cuenta.',
      },
      {
        id: 'operation',
        number: '02',
        name: 'Operación',
        products: [productCatalog.backoffice],
        description: 'Herramientas para operación y control.',
      },
      {
        id: 'engagement',
        number: '03',
        name: 'Interacción, soporte y pagos',
        products: [productCatalog.sortiEngage, productCatalog.zTickets, productCatalog.zPay],
        description: 'Capacidades de crecimiento, atención y pagos.',
        note: 'ZPay está en desarrollo; las integraciones de pago dependen de la configuración del operador.',
      },
      {
        id: 'insight',
        number: '04',
        name: 'Análisis y soporte',
        products: [productCatalog.science365, productCatalog.center],
        description: 'Inteligencia, administración y finanzas.',
      },
    ],
  },
  journey: {
    eyebrow: 'Una visión conectada del recorrido del jugador',
    title: 'De la primera interacción a información útil.',
    intro:
      'Un mapa del recorrido; no implica que cada paso esté automatizado o integrado. La configuración depende de los productos, proveedores y modelo operativo de cada operador.',
    steps: [
      { number: '01', title: 'Campaña', detail: 'Descubrir una experiencia' },
      { number: '02', title: 'Registro', detail: 'Cuenta y validación de identidad' },
      { number: '03', title: 'Apuesta', detail: 'Realizar una apuesta' },
      { number: '04', title: 'Depósitos y retiros', detail: 'Completar pasos de pago' },
      { number: '05', title: 'Soporte', detail: 'Recibir asistencia' },
      { number: '06', title: 'Análisis', detail: 'Orientar decisiones operativas' },
    ],
  },
  capabilities: {
    eyebrow: 'Capacidades',
    title: 'Tecnología para toda la operación.',
    intro: 'Una visión integral que define la función de cada producto.',
    items: [
      {
        number: '01',
        name: 'Experiencia del jugador',
        products: [productCatalog.sorti],
        description: 'Una experiencia para jugadores dentro del ecosistema conectado.',
      },
      {
        number: '02',
        name: 'Herramientas de operación',
        products: [productCatalog.backoffice],
        description: 'Capacidades para la gestión de la operación.',
      },
      {
        number: '03',
        name: 'Crecimiento, soporte y pagos',
        products: [productCatalog.sortiEngage, productCatalog.zTickets, productCatalog.zPay],
        description: 'Productos de interacción, boletería y pagos. ZPay está en desarrollo.',
      },
      {
        number: '04',
        name: 'Datos y soporte',
        products: [productCatalog.science365, productCatalog.center],
        description: 'Capacidades de análisis y soporte para el ecosistema del operador.',
      },
    ],
  },
  partners: {
    eyebrow: 'Un entorno operativo abierto',
    title: 'Tu ecosistema incluye más que productos.',
    intro:
      'Los operadores trabajan con proveedores, laboratorios e integradores externos. Son parte del entorno operativo, no productos de ZGames.',
    categories: ['Proveedores elegidos por el operador', 'Distribuidores', 'Laboratorios', 'Integradores externos'],
  },
  footer: { backToTop: 'Volver arriba' },
  contact: {
    whatsappNumber: '593992990012',
    eyebrow: 'Para operadores',
    title: 'Conversemos sobre tu operación.',
    body: 'Solicita una demostración de productos y conversemos sobre tu modelo, tus proveedores y tus prioridades.',
    prompt:
      'Cuéntanos qué necesita tu equipo: modelo operativo, recorrido del jugador, proveedores actuales y oportunidades por explorar.',
    action: 'Primero, explora el ecosistema',
    navAction: 'Hablemos',
  },
} as const satisfies {
  ecosystem: { groups: readonly EcosystemGroup[] };
  journey: { steps: readonly JourneyStep[] };
  capabilities: { items: readonly Capability[] };
  [key: string]: unknown;
};
