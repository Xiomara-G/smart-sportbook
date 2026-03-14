'use client';

import React, { useCallback, useState } from 'react';
import { SportsbookHeaderBanners } from './components/SportsbookHeaderBanners';
import { SportsbookMatchList } from './components/SportsbookMatchList';
import { SportsbookBetCounter } from './components/SportsbookBetCounter';
import { SportsbookChatDrawer } from './components/SportsbookChatDrawer';
import { SportsbookBetslip } from './components/SportsbookBetslip';
import { SportsbookLocalization } from './localization/Core/SportsbookLocalization';

export interface Bet {
  id: string;
  eventId: string;
  homeTeam: string;
  awayTeam: string;
  selection: string;
  odds: string;
}

export default function Sportsbook() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBetslipExpanded, setIsBetslipExpanded] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const handleAddBet = useCallback((bet: Bet) => {
    setBets((prev) => {
      const exists = prev.find((b) => b.id === bet.id);
      if (exists) return prev;
      return [...prev, bet];
    });
  }, []);

  const handleRemoveBet = useCallback((betId: string) => {
    setBets((prev) => prev.filter((b) => b.id !== betId));
  }, []);

  const handleClearBets = useCallback(() => {
    setBets([]);
  }, []);

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#050801] text-white">
      {/* Mobile Header */}
      <div className="flex items-center justify-center border-b border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3 lg:hidden">
        <div className="text-lg font-bold text-[#81C00A]">Smart Sportbook</div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <SportsbookHeaderBanners
            title={SportsbookLocalization.pageTitle}
            description={SportsbookLocalization.pageDescription}
          />
          <SportsbookMatchList
            events={SportsbookLocalization.events}
            onAddBet={handleAddBet}
          />
        </div>

        {/* Desktop Betslip - Side Panel */}
        <div className="hidden lg:block w-80 border-l border-[#1a1a1a] bg-[#0a0a0a]">
          <SportsbookBetslip
            bets={bets}
            onRemoveBet={handleRemoveBet}
            onClearBets={handleClearBets}
          />
        </div>
      </div>

      {/* Mobile Bottom Betslip Bar */}
      <div className="lg:hidden">
        <SportsbookBetslip
          bets={bets}
          onRemoveBet={handleRemoveBet}
          onClearBets={handleClearBets}
          isExpanded={isBetslipExpanded}
          onToggleExpand={() => setIsBetslipExpanded((prev) => !prev)}
        />
      </div>

      {/* Desktop Bottom Counter */}
      <div className="hidden lg:block">
        <SportsbookBetCounter
          label={SportsbookLocalization.bottomCounterLabel}
          count={bets.length}
        />
      </div>

      <SportsbookChatDrawer
        isOpen={isChatOpen}
        closeLabel={SportsbookLocalization.closeChatLabel}
        onToggle={handleToggleChat}
      />
    </div>
  );
}
