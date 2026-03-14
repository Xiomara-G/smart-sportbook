'use client';

import React, { memo, useEffect, useState } from 'react';
import { Bet } from '../Sportsbook';

interface Recommendation {
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

interface SportsbookRecommendationsProps {
  recommendations: Recommendation[];
  weeklyRecommendations?: Recommendation[];
  isOpen: boolean;
  onToggle: () => void;
  onAddBet: (bet: Bet) => void;
}

const RiskBadge = ({ risk }: { risk: Recommendation['riskLevel'] }) => {
  const config = {
    conservative: { label: 'Conservadora', bg: 'bg-green-500/20', text: 'text-green-400' },
    moderate: { label: 'Moderada', bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
    risky: { label: 'Arriesgada', bg: 'bg-red-500/20', text: 'text-red-400' },
  };
  const { label, bg, text } = config[risk];

  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${bg} ${text}`}>
      {label}
    </span>
  );
};

interface RecommendationItemProps {
  rec: Recommendation;
  onQuickBet: (rec: Recommendation) => void;
}

const RecommendationItem = memo(function RecommendationItem({ rec, onQuickBet }: RecommendationItemProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`rounded-xl border border-[#1a1a1a] bg-[#121212] p-4 transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <RiskBadge risk={rec.riskLevel} />
              <span className="text-xs text-gray-500">{rec.league}</span>
            </div>
            <div className="text-base font-bold text-white">
              {rec.homeTeam} vs {rec.awayTeam}
            </div>
          </div>
          <span className="rounded bg-[#1a1a1a] px-2 py-1 text-lg font-bold text-[#81C00A]">
            {rec.odds}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-[#0a0a0a] p-2">
          <span className="text-xs text-gray-400">Pronostico:</span>
          <span className="text-sm font-semibold text-white">{rec.selection}</span>
        </div>

        <p className="text-xs text-gray-500">{rec.reasoning}</p>

        <button
          onClick={() => onQuickBet(rec)}
          className="w-full cursor-pointer rounded-xl bg-[#81C00A] py-2.5 text-sm font-bold text-black transition hover:bg-[#9ad00b]"
        >
          Apostar
        </button>
      </div>
    </div>
  );
});

export const SportsbookRecommendations = memo(function SportsbookRecommendations({
  recommendations,
  weeklyRecommendations = [],
  isOpen,
  onToggle,
  onAddBet,
}: SportsbookRecommendationsProps) {
  const handleQuickBet = (rec: Recommendation) => {
    const bet: Bet = {
      id: rec.id,
      eventId: rec.eventId,
      homeTeam: rec.homeTeam,
      awayTeam: rec.awayTeam,
      selection: rec.selection,
      odds: rec.odds,
    };
    onAddBet(bet);
  };

  const hasRecommendations = recommendations.length > 0 || weeklyRecommendations.length > 0;

  return (
    <>
      <button
        className="animate-glow-pulse fixed right-4 top-[40%] z-40 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#81C00A] to-[#3B6C01] text-white transition-all duration-300 hover:scale-110"
        onClick={onToggle}
        type="button"
        aria-label={isOpen ? 'Cerrar recomendaciones' : 'Ver recomendaciones'}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      </button>
      <aside
        className={`fixed right-0 top-0 z-30 h-full w-full max-w-md border-l border-[#81C00A] bg-[#050801] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Recomendaciones de apuestas"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] px-4 py-4">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#81C00A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h2 className="text-base font-bold uppercase tracking-wider">Recomendaciones</h2>
            </div>
            <button
              onClick={onToggle}
              className="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {!hasRecommendations ? (
              <div className="flex h-full flex-col items-center justify-center text-gray-500">
                <div className="mb-2 text-4xl">💡</div>
                <p className="text-sm">No hay recomendaciones disponibles</p>
                <p className="text-[10px]">Vuelve mas tarde</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recommendations.length > 0 && (
                  <section>
                    <p className="mb-3 text-sm text-gray-400">
                      Basado en tus preferencias, te recomendamos estas apuestas para hoy
                    </p>
                    <div className="space-y-3">
                      {recommendations.map((rec) => (
                        <RecommendationItem key={rec.id} rec={rec} onQuickBet={handleQuickBet} />
                      ))}
                    </div>
                  </section>
                )}

                {weeklyRecommendations.length > 0 && (
                  <section>
                    <h3 className="mb-3 text-sm font-semibold text-[#81C00A]">
                      Recomendaciones de la semana
                    </h3>
                    <div className="space-y-3">
                      {weeklyRecommendations.map((rec) => (
                        <RecommendationItem key={rec.id} rec={rec} onQuickBet={handleQuickBet} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-[#1a1a1a] p-4">
            <p className="text-xs text-gray-500 text-center">
              Las recomendaciones son basadas en analisis. Juega con responsabilidad.
            </p>
          </div>
        </div>
      </aside>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40"
          onClick={onToggle}
          aria-label="Cerrar recomendaciones"
        />
      )}
    </>
  );
});
