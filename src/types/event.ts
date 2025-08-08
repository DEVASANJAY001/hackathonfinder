export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  platform: Platform;
  theme: Theme[];
  date: string;
  endDate?: string;
  organizer: string;
  location?: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  images: string[];
  externalLink: string;
  isTrending: boolean;
  isPopular: boolean;
  viewCount: number;
  createdAt: string;
  college?: string;
}

export interface Platform {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export type Theme = 
  | 'AI' 
  | 'Web3' 
  | 'Mobile' 
  | 'Web Development' 
  | 'Data Science' 
  | 'Blockchain' 
  | 'IoT' 
  | 'Gaming' 
  | 'Fintech' 
  | 'Healthcare' 
  | 'Sustainability' 
  | 'Education'
  | 'Open Source';

export interface FilterOptions {
  theme: Theme | 'all';
  platform: string;
  date: 'all' | 'today' | 'week' | 'month';
  mode: 'all' | 'Online' | 'Offline' | 'Hybrid';
}