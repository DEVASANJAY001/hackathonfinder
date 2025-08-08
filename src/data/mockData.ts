import { Event, Platform } from '../types/event';
import aiHackathon1 from '../assets/ai-hackathon-1.jpg';
import web3Summit1 from '../assets/web3-summit-1.jpg';
import mobileHackathon1 from '../assets/mobile-hackathon-1.jpg';
import healthtech1 from '../assets/healthtech-1.jpg';
import sustainableTech1 from '../assets/sustainable-tech-1.jpg';

export const platforms: Platform[] = [
  {
    id: 'devfolio',
    name: 'Devfolio',
    logo: '/api/placeholder/40/40',
    color: '#3B82F6'
  },
  {
    id: 'hackerearth',
    name: 'HackerEarth',
    logo: '/api/placeholder/40/40',
    color: '#F59E0B'
  },
  {
    id: 'github',
    name: 'GitHub',
    logo: '/api/placeholder/40/40',
    color: '#1F2937'
  },
  {
    id: 'mlh',
    name: 'MLH',
    logo: '/api/placeholder/40/40',
    color: '#EF4444'
  },
  {
    id: 'unstop',
    name: 'Unstop',
    logo: '/api/placeholder/40/40',
    color: '#8B5CF6'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'AI Innovation Challenge 2024',
    description: 'Join the ultimate AI hackathon where teams compete to build cutting-edge artificial intelligence solutions. This 48-hour intensive coding marathon brings together the brightest minds in AI to solve real-world problems using machine learning, deep learning, and natural language processing. Participants will have access to industry mentors, cloud computing resources, and exclusive datasets. The challenge focuses on creating AI applications that can make a positive impact on society, from healthcare diagnostics to climate change solutions.',
    shortDescription: 'Build cutting-edge AI solutions in this 48-hour hackathon with industry mentors and exclusive datasets.',
    platform: platforms[0],
    theme: ['AI', 'Data Science'],
    date: '2024-03-15',
    endDate: '2024-03-17',
    organizer: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    mode: 'Hybrid',
    images: [
      aiHackathon1,
      '/api/placeholder/600/400',
      '/api/placeholder/700/400',
      '/api/placeholder/500/400',
      '/api/placeholder/750/400'
    ],
    externalLink: 'https://devfolio.co/hackathon/ai-challenge-2024',
    isTrending: true,
    isPopular: true,
    viewCount: 15420,
    createdAt: '2024-02-01'
  },
  {
    id: '2',
    title: 'Web3 Developer Summit',
    description: 'Dive deep into the decentralized web at the premier Web3 developer event of the year. This summit combines workshops, networking, and a competitive hackathon focused on blockchain technologies, DeFi protocols, and NFT platforms. Participants will learn from industry leaders, explore cutting-edge tools, and build innovative decentralized applications. The event features hands-on sessions with popular blockchain frameworks, smart contract development, and tokenomics design.',
    shortDescription: 'Premier Web3 event combining workshops, networking, and blockchain hackathon.',
    platform: platforms[1],
    theme: ['Web3', 'Blockchain', 'Fintech'],
    date: '2024-03-22',
    endDate: '2024-03-24',
    organizer: 'Blockchain Alliance',
    mode: 'Online',
    images: [
      web3Summit1,
      '/api/placeholder/650/400',
      '/api/placeholder/720/400'
    ],
    externalLink: 'https://hackerearth.com/web3-summit-2024',
    isTrending: false,
    isPopular: true,
    viewCount: 12890,
    createdAt: '2024-02-05'
  },
  {
    id: '3',
    title: 'Mobile First Hackathon',
    description: 'Create the next generation of mobile applications in this intensive development sprint. Focusing on cross-platform mobile solutions, participants will work with React Native, Flutter, and native iOS/Android development. The hackathon emphasizes user experience, performance optimization, and innovative mobile features like AR integration, payment systems, and real-time collaboration tools.',
    shortDescription: 'Build next-gen mobile apps with React Native, Flutter, and native development.',
    platform: platforms[2],
    theme: ['Mobile', 'Web Development'],
    date: '2024-04-05',
    endDate: '2024-04-07',
    organizer: 'Mobile Developers United',
    location: 'Austin, TX',
    mode: 'Offline',
    images: [
      mobileHackathon1,
      '/api/placeholder/600/400'
    ],
    externalLink: 'https://github.com/mobile-hackathon-2024',
    isTrending: true,
    isPopular: false,
    viewCount: 8765,
    createdAt: '2024-02-10'
  },
  {
    id: '4',
    title: 'HealthTech Innovation Lab',
    description: 'Address critical healthcare challenges through technology innovation. This specialized hackathon focuses on developing digital health solutions, medical device integrations, and patient care optimization tools. Teams will work on projects ranging from telemedicine platforms to AI-powered diagnostic tools, with access to real healthcare data and guidance from medical professionals.',
    shortDescription: 'Solve healthcare challenges with digital health solutions and AI diagnostics.',
    platform: platforms[3],
    theme: ['Healthcare', 'AI', 'Data Science'],
    date: '2024-04-12',
    endDate: '2024-04-14',
    organizer: 'HealthTech Innovators',
    mode: 'Hybrid',
    images: [
      healthtech1,
      '/api/placeholder/700/400',
      '/api/placeholder/600/400',
      '/api/placeholder/750/400'
    ],
    externalLink: 'https://mlh.io/healthtech-innovation-2024',
    isTrending: false,
    isPopular: true,
    viewCount: 11234,
    createdAt: '2024-02-15'
  },
  {
    id: '5',
    title: 'Sustainable Tech Challenge',
    description: 'Build technology solutions for environmental sustainability and climate action. This eco-focused hackathon challenges developers to create applications that address climate change, promote renewable energy, and support sustainable practices. Projects may include carbon tracking apps, smart energy management systems, and platforms for environmental data visualization.',
    shortDescription: 'Create eco-friendly tech solutions for climate action and sustainability.',
    platform: platforms[4],
    theme: ['Sustainability', 'IoT', 'Data Science'],
    date: '2024-04-20',
    organizer: 'GreenTech Coalition',
    mode: 'Online',
    images: [
      sustainableTech1,
      '/api/placeholder/650/400'
    ],
    externalLink: 'https://unstop.com/sustainable-tech-2024',
    isTrending: true,
    isPopular: false,
    viewCount: 9876,
    createdAt: '2024-02-20'
  },
  {
    id: '6',
    title: 'GameDev Jam 2024',
    description: 'Create innovative games in this exciting game development competition. Participants will use popular game engines like Unity, Unreal Engine, and Godot to build entertaining and engaging games. The jam encourages creativity in gameplay mechanics, storytelling, and visual design, with categories for different genres and platforms.',
    shortDescription: 'Build innovative games with Unity, Unreal Engine, and creative gameplay mechanics.',
    platform: platforms[0],
    theme: ['Gaming', 'Web Development'],
    date: '2024-05-03',
    endDate: '2024-05-05',
    organizer: 'Indie Game Collective',
    location: 'Seattle, WA',
    mode: 'Offline',
    images: [
      '/api/placeholder/800/400',
      '/api/placeholder/600/400',
      '/api/placeholder/700/400'
    ],
    externalLink: 'https://devfolio.co/gamedev-jam-2024',
    isTrending: false,
    isPopular: false,
    viewCount: 6543,
    createdAt: '2024-02-25'
  }
];