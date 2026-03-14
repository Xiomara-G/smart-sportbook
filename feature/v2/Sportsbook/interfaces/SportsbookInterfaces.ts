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
