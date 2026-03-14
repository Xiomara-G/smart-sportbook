'use client';

import React, { memo } from 'react';
import { SportsbookEvent, SportsbookMarketOption } from '../interfaces/SportsbookInterfaces';
import { Bet } from '../Sportsbook';

interface SportsbookMatchListProps {
  events: SportsbookEvent[];
  onAddBet: (bet: Bet) => void;
}

export const SportsbookMatchList = memo(function SportsbookMatchList({
  events,
  onAddBet,
}: SportsbookMatchListProps) {
  const handleAddBet = (event: SportsbookEvent, option: SportsbookMarketOption) => {
    const bet: Bet = {
      id: `${event.id}-${option.id}`,
      eventId: event.id,
      homeTeam: event.homeTeam,
      awayTeam: event.awayTeam,
      selection: `${event.homeTeam} vs ${event.awayTeam} - ${option.label}`,
      odds: option.odds,
    };
    onAddBet(bet);
  };

  return (
 
    <main className="flex-1 px-4 py-4 md:px-6 ">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 " aria-label="Eventos en vivo">
        {/* UEFA Champions League Banner Style */}
        <div className="relative overflow-hidden rounded-[2rem] bg-[url('/image.png')] bg-cover bg-center">
          <div className="relative z-10 text-center">
            <h2 className="text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">UEFA Champions League</h2>
            <div className="flex flex-col gap-3 md:gap-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex flex-wrap items-center justify-center gap-2 md:gap-8">
                  <span className="min-w-[80px] md:w-32 text-center md:text-right text-xs md:text-base font-bold">{event.homeTeam}</span>
                  <div className="flex gap-1 md:gap-2">
                    <button
                      onClick={() => handleAddBet(event, event.marketOptions[0])}
                      className="rounded bg-[#81C00A] px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold text-black hover:bg-[#9ad00b] transition"
                    >
                      {event.marketOptions[0]?.odds || '2.31'}
                    </button>
                    <span className="text-[10px] md:text-xs font-bold text-gray-400 self-center">VS</span>
                    <button
                      onClick={() => handleAddBet(event, event.marketOptions[2] || event.marketOptions[0])}
                      className="rounded bg-[#81C00A] px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold text-black hover:bg-[#9ad00b] transition"
                    >
                      {event.marketOptions[2]?.odds || '2.31'}
                    </button>
                  </div>
                  <span className="min-w-[80px] md:w-32 text-center md:text-left text-xs md:text-base font-bold">{event.awayTeam}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d] p-4 transition hover:border-[#3B6C01]/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#81C00A] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{event.league}</span>
                </div>
                <span className="text-[10px] font-bold text-[#81C00A]">{event.minute}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-sm font-bold">{event.homeTeam}</h2>
                  <h2 className="text-sm font-bold">{event.awayTeam}</h2>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {event.marketOptions.map((option) => (
                    <button
                      key={`${event.id}-${option.id}`}
                      className="flex flex-col items-center justify-center rounded-xl border border-[#1a1a1a] bg-[#121212] px-3 py-2 min-w-[50px] md:min-w-[60px] transition hover:border-[#81C00A] hover:bg-[#1a1a1a]"
                      onClick={() => handleAddBet(event, option)}
                      type="button"
                    >
                      <span className="text-[10px] text-gray-500">{option.label}</span>
                      <span className="text-xs font-bold text-[#81C00A]">{option.odds}</span>
                    </button>
                  ))}
                  <button
                    className="rounded-xl border border-[#81C00A] bg-[#81C00A] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#9ad00b]"
                    onClick={() => handleAddBet(event, event.marketOptions[0])}
                    type="button"
                  >
                    Apostar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
});
