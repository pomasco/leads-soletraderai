export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  short_description: string;
  long_description: string;
  features: string[];
  icon: string;
  credit_cost: number;
  categories: string[];
  tags: string[];
  developer: string;
  avatar: string;
  services: {
    title: string;
    description: string;
    features: string[];
  }[];
  process: {
    title: string;
    description: string;
    icon: string;
  }[];
}