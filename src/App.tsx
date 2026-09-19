import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { SkillMarketplace } from './components/community/SkillMarketplace';
import { PublishSkillModal } from './components/community/PublishSkillModal';
import { AIContractModal } from './components/community/AIContractModal';
import { SwapWorkbench } from './components/community/SwapWorkbench';
import { TimeBankProfile } from './components/community/TimeBankProfile';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SkillCard } from './types';
import { Heart, Sparkles, ShieldCheck, Compass } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentRole, activeTab, currentUser } = useApp();

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedSwapCard, setSelectedSwapCard] = useState<SkillCard | null>(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  const handleInitiateSwap = (card: SkillCard) => {
    setSelectedSwapCard(card);
    setIsContractModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 flex flex-col selection:bg-[#9E5A44] selection:text-white">
      {/* 顶部全局手作导航 */}
      <Navbar onOpenPublishModal={() => setIsPublishModalOpen(true)} />

      {/* 主视图区域 */}
      <main className="flex-1">
        {currentRole === 'admin' ? (
          <AdminDashboard />
        ) : (
          <>
            {activeTab === 'marketplace' && (
              <SkillMarketplace
                onOpenPublishModal={() => setIsPublishModalOpen(true)}
                onInitiateSwap={handleInitiateSwap}
              />
            )}

            {activeTab === 'workbench' && <SwapWorkbench />}

            {activeTab === 'timebank' && <TimeBankProfile />}
          </>
        )}
      </main>

      {/* 发布技能向导弹窗 */}
      <PublishSkillModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />

      {/* AI 互换课纲与契约签署弹窗 */}
      <AIContractModal
        card={selectedSwapCard}
        isOpen={isContractModalOpen}
        onClose={() => {
          setIsContractModalOpen(false);
          setSelectedSwapCard(null);
        }}
      />

      {/* 全局 Toast 通知 */}
      <ToastContainer />

      {/* 底部温暖手作页脚 */}
      <footer className="mt-16 border-t border-craft-border bg-[#F5EFEB]/80 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="font-handcraft text-base font-bold text-craft-ink">
              巧遇 · 匠心 (SkillCraft)
            </span>
            <span className="stamp-badge text-[10px] text-craft-terracotta border-craft-terracotta">
              WARM BARTER COMMUNITY
            </span>
          </div>

          <p className="text-xs text-craft-ink-light max-w-lg mx-auto leading-relaxed">
            打破传统昂贵报班与自学无伴的困局，通过「1v1 直连」与「时间银行」双轨机制，让吉他、摄影、编程等每一种热爱在这里温暖相逢。
          </p>

          <div className="flex items-center justify-center gap-4 text-[11px] text-craft-ink-muted pt-2 border-t border-craft-border/50">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-craft-amber" />
              AI 智能课纲助教
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-craft-forest" />
              中枢质押防鸽单
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-craft-terracotta" />
              温暖邻里技艺切磋
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
