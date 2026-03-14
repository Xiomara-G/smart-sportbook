'use client';

import React, { useCallback, useState } from 'react';
import { SportsbookHeaderBanners } from './components/SportsbookHeaderBanners';
import { SportsbookMatchList } from './components/SportsbookMatchList';
import { SportsbookBetCounter } from './components/SportsbookBetCounter';
import { SportsbookChatDrawer } from './components/SportsbookChatDrawer';
import { SportsbookLocalization } from './localization/Core/SportsbookLocalization';

export default function Sportsbook() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [betCount, setBetCount] = useState(0);

  const handleToggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const handleAddBet = useCallback(() => {
    setBetCount((prev) => prev + 1);
  }, []);

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#030a1a]">
      <SportsbookHeaderBanners
        title={SportsbookLocalization.pageTitle}
        description={SportsbookLocalization.pageDescription}
        banners={SportsbookLocalization.banners}
      />
      <SportsbookMatchList
        events={SportsbookLocalization.events}
        addBetLabel={SportsbookLocalization.addBetLabel}
        onAddBet={handleAddBet}
      />
      <SportsbookBetCounter
        label={SportsbookLocalization.bottomCounterLabel}
        count={betCount}
      />
      <SportsbookChatDrawer
        isOpen={isChatOpen}
        openLabel={SportsbookLocalization.openChatLabel}
        closeLabel={SportsbookLocalization.closeChatLabel}
        onToggle={handleToggleChat}
      />
    </div>
  );
}
