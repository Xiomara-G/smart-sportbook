'use client';

import React, { memo } from 'react';
import { SportsbookEvent } from '../interfaces/SportsbookInterfaces';

interface SportsbookMatchListProps {
  events: SportsbookEvent[];
  addBetLabel: string;
  onAddBet: () => void;
}

export const SportsbookMatchList = memo(function SportsbookMatchList({
  events,
  addBetLabel,
  onAddBet,
}: SportsbookMatchListProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-[#030a1a] px-4 py-4">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-3" aria-label="Eventos en vivo">
        {events.map((event) => (
          <article
            key={event.id}
            className="rounded-xl border border-[#20407f] bg-[#0a1634] p-3 text-white"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-cyan-300">{event.league}</p>
                <h2 className="text-sm font-semibold">
                  {event.homeTeam} vs {event.awayTeam}
                </h2>
              </div>
              <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-bold">
                EN VIVO {event.minute}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {event.marketOptions.map((option) => (
                <button
                  key={`${event.id}-${option.id}`}
                  className="rounded-md border border-[#2f5fba] bg-[#0b2454] px-3 py-2 text-left transition hover:border-cyan-400"
                  onClick={onAddBet}
                  type="button"
                >
                  <span className="block text-xs text-blue-200">{option.label}</span>
                  <span className="block text-sm font-semibold">{option.odds}</span>
                </button>
              ))}
              <button
                className="rounded-md border border-cyan-500 bg-cyan-500/10 px-3 py-2 text-left text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                onClick={onAddBet}
                type="button"
              >
                {addBetLabel}
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
});
