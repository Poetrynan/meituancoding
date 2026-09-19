import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminDataProvider, useAdminData } from './lib/AdminDataContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/Toast';
import { SkillMarketplace } from './components/community/SkillMarketplace';
import { PublishSkillModal } from './components/community/PublishSkillModal';
import { AIContractModal } from './components/community/AIContractModal';
import { SwapWorkbench } from './components/community/SwapWorkbench';
import { TimeBankProfile } from './components/community/TimeBankProfile';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminShell } from './components/admin/AdminShell';
import { SkillCard } from './types';
import { Heart, Sparkles, ShieldCheck, Compass, Shield } from 'lucide-react';

/**
 * 前台用户端主视图 (纯净温暖手作风，无任何管理后台杂质)
 */
const MainUserPortal: React.FC = () => {
  const { activeTab } = useApp();

  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [selectedSwapCard, setSelectedSwapCard] = useState<SkillCard | null>(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  const handleInitiateSwap = (card: SkillCard) => {
    setSelectedSwapCard(card);
    setIsContractModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 flex flex-col selection:bg-[#9E5A44] selection:text-white">
      {/* 顶部全局手作导航 (纯净用户端) */}
      <Navbar onOpenPublishModal={() => setIsPublishModalOpen(true)} />

      {/* 主业务视图区域 */}
      <main className="flex-1">
        {activeTab === 'marketplace' && (
          <SkillMarketplace
            onOpenPublishModal={() => setIsPublishModalOpen(true)}
            onInitiateSwap={handleInitiateSwap}
          />
        )}

        {activeTab === 'workbench' && <SwapWorkbench />}

        {activeTab === 'timebank' && <TimeBankProfile />}
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

      {/* 底部页脚 */}
      <footer className="mt-20 border-t border-stone-200/80 bg-[#FAF7F2] py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="font-handcraft text-sm font-bold text-stone-900">
              巧遇 · 匠心 (SkillCraft)
            </span>
            <span className="text-xs text-stone-400">·</span>
            <span className="text-xs text-stone-500">技能互换社区</span>
          </div>

          <div className="pt-2 text-xs text-stone-400 flex items-center justify-center gap-2">
            <span>SkillCraft © 2026</span>
            <span>·</span>
            <a
              href="#/admin"
              className="inline-flex items-center gap-1 hover:text-stone-700 transition-colors text-stone-400 text-xs cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-stone-400" />
              <span>管理控制台</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

/**
 * 独立管理后台应用容器 (物理鉴权门禁 + 中后台 Shell)
 */
const AdminApp: React.FC<{ onNavigateHome: () => void }> = ({ onNavigateHome }) => {
  const { isAuthenticated } = useAdminData();

  if (!isAuthenticated) {
    return <AdminLogin onBackToMain={onNavigateHome} />;
  }

  return <AdminShell onNavigateHome={onNavigateHome} />;
};

/**
 * 全局应用根路由网关 (彻底物理隔离前台与后台)
 */
export default function App() {
  const checkIsAdmin = (): boolean => {
    const hash = window.location.hash.toLowerCase();
    const pathname = window.location.pathname.toLowerCase();
    return hash.startsWith('#/admin') || hash === '#admin' || pathname.startsWith('/admin');
  };

  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(checkIsAdmin);

  useEffect(() => {
    const handleRoute = () => {
      setIsAdminRoute(checkIsAdmin());
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  const navigateToHome = () => {
    window.location.hash = '';
    setIsAdminRoute(false);
  };

  // 管理后台独立域
  if (isAdminRoute) {
    return (
      <AppProvider>
        <AdminDataProvider>
          <AdminApp onNavigateHome={navigateToHome} />
        </AdminDataProvider>
      </AppProvider>
    );
  }

  // 普通用户端独立域
  return (
    <AppProvider>
      <MainUserPortal />
    </AppProvider>
  );
}
