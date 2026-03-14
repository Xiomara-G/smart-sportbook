'use client';

import React, { memo } from 'react';
import { Bet } from '../Sportsbook';

interface SportsbookBetslipProps {
  bets: Bet[];
  onRemoveBet: (betId: string) => void;
  onClearBets: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export const SportsbookBetslip = memo(function SportsbookBetslip({
  bets,
  onRemoveBet,
  onClearBets,
  isExpanded,
  onToggleExpand,
}: SportsbookBetslipProps) {
  const isMobile = isExpanded !== undefined;
  const totalOdds = bets.reduce((acc, bet) => acc * parseFloat(bet.odds), 1).toFixed(2);

  // Mobile collapsed bar view
  if (isMobile && !isExpanded) {
    return (
      <div className="w-full bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <button
          onClick={onToggleExpand}
          className="flex w-full items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-3">
            <span className="rounded bg-[#1a1a1a] px-2 py-1 text-xs font-bold text-[#81C00A]">
              {bets.length}
            </span>
            <span className="text-sm font-bold">Betslip</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Cuota total: {totalOdds}</span>
            <span className="text-lg text-[#81C00A]">▲</span>
          </div>
        </button>
      </div>
    );
  }

  // Mobile expanded or desktop view
  return (
    <div className={`${isMobile ? 'h-[60vh] w-full' : 'h-full w-full'} flex flex-col bg-[#0a0a0a]`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1a1a1a] px-4 py-3">
        <div className="flex items-center gap-2">
          {isMobile && onToggleExpand && (
            <button onClick={onToggleExpand} className="text-lg text-[#81C00A]">▼</button>
          )}
          <h2 className="text-sm font-bold uppercase tracking-wider">Betslip</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#1a1a1a] px-2 py-1 text-xs text-[#81C00A]">
            {bets.length} selecciones
          </span>
          {bets.length > 0 && (
            <button
              onClick={onClearBets}
              className="text-[10px] text-red-400 hover:text-red-300"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Bet Type Tabs */}
      <div className="flex gap-1 border-b border-[#1a1a1a] px-4 py-2">
        {['Single', 'Combine', 'System'].map((tab, idx) => (
          <button
            key={tab}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold ${
              idx === 1 ? 'bg-[#1a1a1a] text-[#81C00A]' : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bets List */}
      <div className="flex-1 overflow-y-auto p-4">
        {bets.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-gray-500">
            <div className="mb-2 text-4xl">📋</div>
            <p className="text-sm">No hay apuestas seleccionadas</p>
            <p className="text-[10px]">Selecciona cuotas para agregar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bets.map((bet) => (
              <div
                key={bet.id}
                className="relative rounded-xl bg-[#121212] p-3 border border-[#1a1a1a]"
              >
                <button
                  onClick={() => onRemoveBet(bet.id)}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-[10px] text-red-400 hover:bg-red-500/30"
                >
                  ✕
                </button>
                <div className="text-xs font-bold text-white pr-4">{bet.selection}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">{bet.homeTeam} vs {bet.awayTeam}</span>
                  <span className="text-xs font-bold text-[#81C00A]">{bet.odds}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer with Total and Place Bet */}
      {bets.length > 0 && (
        <div className="border-t border-[#1a1a1a] p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-gray-400">Cuota total</span>
            <span className="text-lg font-bold text-[#81C00A]">{totalOdds}</span>
          </div>
          <button className="w-full rounded-xl bg-[#81C00A] py-3 text-sm font-bold text-black transition hover:bg-[#9ad00b]">
            Realizar Apuesta
          </button>
        </div>
      )}
    </div>
  );
});
