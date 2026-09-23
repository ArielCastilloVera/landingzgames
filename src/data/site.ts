import type { Capability, EcosystemGroup, JourneyStep, Product } from '../types/site';

const productCatalog = {
  sorti: { name: 'Sorti' },
  pan: { name: 'PAN' },
  backoffice: { name: 'Backoffice' },
  sortiEngage: { name: 'SortiEngage' },
  zTickets: { name: 'ZTickets' },
  zPay: { name: 'ZPay' },
  science365: { name: 'Science 365' },
  center: { name: 'Center' },
} as const satisfies Record<string, Product>;

export const siteContent = {
  metadata: {
    title: 'ZGAMES | Technology for connected gaming',
    description:
      'Explore the ZGames technology ecosystem for gaming operators, from player-facing products to operational capabilities.',
  },
  brand: {
    name: 'ZGAMES',
    tagline: 'We build to win.',
  },
  navigation: [
    { label: 'Inicio', href: '#top' },
    { label: 'Nuestro ADN', href: '#ecosystem' },
    { label: 'Universo Z', href: '#capabilities' },
  ],
  hero: {
    eyebrow: 'Technology for gaming operators',
    title: 'One ecosystem. Built around the operation.',
    body: 'Explore the products and capabilities across the player experience, operator tools, engagement, ticketing, data and support.',
    primaryAction: 'Discuss your operation',
    secondaryAction: 'Explore the ecosystem',
    imageCaption: 'A wider view of the game',
    imageCredit: 'ZGAMES / 01',
    highlights: ['PLAYER EXPERIENCE', 'OPERATOR TOOLS', 'DATA & SUPPORT'],
  },
  ecosystem: {
    eyebrow: 'The connected ecosystem',
    title: 'Built around the way your operation works.',
    intro:
      'A product view of player-facing experiences, operator tools and specialist capabilities. Availability and integrations depend on each operator’s setup.',
    mapLabel: 'ZGames ecosystem product groups',
    axisStart: 'Player experience',
    axisEnd: 'Operator capabilities',
    diagramNote: 'Products are shown by role in the ecosystem; operator configurations may differ.',
    groups: [
      {
        id: 'players',
        number: '01',
        name: 'Players',
        products: [productCatalog.sorti],
        description: 'The player-facing experience at the center of the ecosystem.',
      },
      {
        id: 'operation',
        number: '02',
        name: 'Operator',
        products: [productCatalog.pan, productCatalog.backoffice],
        description: 'Operational tools that support the operator’s day-to-day work.',
      },
      {
        id: 'engagement',
        number: '03',
        name: 'Engagement, support and payments',
        products: [productCatalog.sortiEngage, productCatalog.zTickets, productCatalog.zPay],
        description: 'Capabilities for engagement, ticketing and payment experiences.',
        note: 'ZPay is in development; payment integrations depend on the operator setup.',
      },
      {
        id: 'insight',
        number: '04',
        name: 'Insight and support',
        products: [productCatalog.science365, productCatalog.center],
        description: 'Data and support capabilities within the broader ecosystem.',
      },
    ],
  },
  journey: {
    eyebrow: 'A connected view of the player journey',
    title: 'From first touch to useful insight.',
    intro:
      'A journey map—not a claim that every step is automated or integrated. Each operator’s setup depends on its products, providers and operating model.',
    steps: [
      { number: '01', title: 'Campaign', detail: 'Discover an experience' },
      { number: '02', title: 'Registration', detail: 'Account and KYC process' },
      { number: '03', title: 'Bet', detail: 'Place a bet' },
      { number: '04', title: 'Deposit / withdrawal', detail: 'Move through payment steps' },
      { number: '05', title: 'Support', detail: 'Get assistance' },
      { number: '06', title: 'Insight', detail: 'Inform operational decisions' },
    ],
  },
  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Technology across the operation.',
    intro: 'A joined-up view, with each product’s role kept clear.',
    items: [
      {
        number: '01',
        name: 'Player experience',
        products: [productCatalog.sorti],
        description: 'A player-facing experience within the connected ecosystem.',
      },
      {
        number: '02',
        name: 'Operator tools',
        products: [productCatalog.pan, productCatalog.backoffice],
        description: 'Capabilities for the operator side of the business.',
      },
      {
        number: '03',
        name: 'Growth, support and payments',
        products: [productCatalog.sortiEngage, productCatalog.zTickets, productCatalog.zPay],
        description: 'Engagement, ticketing and payment-related products. ZPay is in development.',
      },
      {
        number: '04',
        name: 'Data and support',
        products: [productCatalog.science365, productCatalog.center],
        description: 'Capabilities for insight and support in the operator ecosystem.',
      },
    ],
  },
  partners: {
    eyebrow: 'An open operating context',
    title: 'Your ecosystem includes more than products.',
    intro:
      'Operators work with providers, suppliers, labs and third-party integrators. These are part of the wider operating context—not ZGames products.',
    categories: ['Operator-selected providers', 'Suppliers', 'Labs', 'Third-party integrators'],
  },
  footer: { backToTop: 'Back to top' },
  contact: {
    eyebrow: 'For operators',
    title: 'Let’s map your operation.',
    body: 'Request an operator-specific product demo and architecture conversation around your model, providers and priorities.',
    prompt:
      'Bring the questions that matter to your team: operating model, player journey, existing providers and areas to explore.',
    action: 'Explore the ecosystem first',
    navAction: 'Hablemos',
  },
} as const satisfies {
  ecosystem: { groups: readonly EcosystemGroup[] };
  journey: { steps: readonly JourneyStep[] };
  capabilities: { items: readonly Capability[] };
  [key: string]: unknown;
};
