export const siteContent = {
  brand: {
    name: 'ZGAMES',
    tagline: 'Technology for connected gaming experiences.',
  },
  navigation: [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Player journey', href: '#journey' },
    { label: 'Capabilities', href: '#capabilities' },
  ],
  hero: {
    eyebrow: 'Connected technology for gaming operators',
    title: 'One ecosystem. More connected experiences.',
    body: 'ZGames connects players, operators, suppliers and specialist capabilities in one technology view of the operation.',
    primaryAction: 'Discuss your operation',
    secondaryAction: 'Explore the ecosystem',
  },
  ecosystem: {
    eyebrow: 'The connected ecosystem',
    title: 'Built around the way your operation works.',
    intro:
      'A clear view of the products and capabilities that support the player experience and day-to-day operation.',
    groups: [
      {
        id: 'players',
        number: '01',
        name: 'Players',
        products: ['Sorti'],
        description: 'The player-facing experience at the center of the ecosystem.',
      },
      {
        id: 'operation',
        number: '02',
        name: 'Operator',
        products: ['PAN', 'Backoffice'],
        description: 'Operational tools that support the operator’s day-to-day work.',
      },
      {
        id: 'engagement',
        number: '03',
        name: 'Engagement, support and payments',
        products: ['SortiEngage', 'ZTickets', 'ZPay'],
        description: 'Capabilities for engagement, ticketing and payment experiences.',
        note: 'ZPay is in development.',
      },
      {
        id: 'insight',
        number: '04',
        name: 'Insight and support',
        products: ['Science 365', 'Center'],
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
    items: [
      {
        number: '01',
        name: 'Player experience',
        products: 'Sorti',
        description: 'A player-facing experience within the connected ecosystem.',
      },
      {
        number: '02',
        name: 'Operator tools',
        products: 'PAN · Backoffice',
        description: 'Capabilities for the operator side of the business.',
      },
      {
        number: '03',
        name: 'Growth, support and payments',
        products: 'SortiEngage · ZTickets · ZPay',
        description: 'Engagement, ticketing and payment-related products. ZPay is in development.',
      },
      {
        number: '04',
        name: 'Data and support',
        products: 'Science 365 · Center',
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
  contact: {
    eyebrow: 'For operators',
    title: 'Let’s map your operation.',
    body: 'Request an operator-specific product demo and architecture conversation around your model, providers and priorities.',
    prompt:
      'Bring the questions that matter to your team: operating model, player journey, existing providers and areas to explore.',
    action: 'Explore the ecosystem first',
  },
} as const;
