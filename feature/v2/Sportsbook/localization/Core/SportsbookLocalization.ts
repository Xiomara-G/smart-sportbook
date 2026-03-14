import { SportsbookBanner, SportsbookEvent } from '../../interfaces/SportsbookInterfaces';

export const SportsbookLocalization = {
  pageTitle: 'Smart Sportbook',
  pageDescription: 'Mercados en vivo con atención instantanea.',
  openChatLabel: 'Abrir chat',
  closeChatLabel: 'Cerrar chat',
  bottomCounterLabel: 'Apuestas realizadas',
  addBetLabel: 'Agregar apuesta',
  banners: [
    {
      id: 'banner-1',
      title: 'Bono de bienvenida',
      subtitle: 'Recibe hasta 100% en tu primer deposito.',
      ctaLabel: 'Activar bono',
    },
    {
      id: 'banner-2',
      title: 'Super cuota caliente',
      subtitle: 'Seleccion diaria con cuota mejorada.',
      ctaLabel: 'Ver seleccion',
    },
    {
      id: 'banner-3',
      title: 'Cashout rapido',
      subtitle: 'Cierra tu apuesta cuando quieras.',
      ctaLabel: 'Saber mas',
    },
  ] satisfies SportsbookBanner[],
  events: [
    {
      id: 'event-1',
      league: 'Premier League',
      homeTeam: 'Chelsea',
      awayTeam: 'Newcastle United',
      minute: "85'",
      marketOptions: [
        { id: '1', label: '1', odds: '2.10' },
        { id: 'x', label: 'X', odds: '4.10' },
        { id: '2', label: '2', odds: '1.30' },
      ],
    },
    {
      id: 'event-2',
      league: 'Premier League',
      homeTeam: 'Arsenal FC',
      awayTeam: 'Morecambe',
      minute: "86'",
      marketOptions: [
        { id: '1', label: '1', odds: '3.20' },
        { id: 'x', label: 'X', odds: '1.45' },
        { id: '2', label: '2', odds: '16.00' },
      ],
    },
    {
      id: 'event-3',
      league: 'National League',
      homeTeam: 'Braintree Town FC',
      awayTeam: 'Southport',
      minute: "87'",
      marketOptions: [
        { id: '1', label: '1', odds: '4.33' },
        { id: 'x', label: 'X', odds: '1.41' },
        { id: '2', label: '2', odds: '7.00' },
      ],
    },
    {
      id: 'event-4',
      league: 'National League',
      homeTeam: 'Altrincham',
      awayTeam: 'Eastleigh FC',
      minute: "89'",
      marketOptions: [
        { id: '1', label: '1', odds: '4.50' },
        { id: 'x', label: 'X', odds: '1.31' },
        { id: '2', label: '2', odds: '10.00' },
      ],
    },
  ] satisfies SportsbookEvent[],
};
