export interface SportsbookBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export interface SportsbookMarketOption {
  id: string;
  label: string;
  odds: string;
}

export interface SportsbookEvent {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  minute: string;
  marketOptions: SportsbookMarketOption[];
}

export interface SportsbookRecommendation {
  id: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  selection: string;
  odds: string;
  riskLevel: 'conservative' | 'moderate' | 'risky';
  reasoning: string;
}
