export interface Product {
  name: string;
}

export interface EcosystemGroup {
  id: string;
  number: string;
  name: string;
  products: readonly Product[];
  description: string;
  note?: string;
}

export interface JourneyStep {
  number: string;
  title: string;
  detail: string;
}

export interface Capability {
  number: string;
  name: string;
  products: readonly Product[];
  description: string;
}
