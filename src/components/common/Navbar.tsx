import React, { useState } from 'react';
import {
  Compass,
  PlusCircle,
  Briefcase,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  Users,
  ChevronDown,
  Coins,
  Store,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onOpenPublishModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPublishModal }) => {
  const {
    currentUser,
    currentRole,
    activeTab,
    setCurrentRole,
    setActiveTab,
    users,
    switchUser,
    resetAllData,
    contracts,
    disputes,
    skillCards,
  } = useApp();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // 活跃中的契约计数
  const activeContractsCount = contracts.filter(
    (c) =>
      c.status === 'active' &&
      (c.teacherId === currentUser.id || c.studentId === currentUser.id)
  ).length;

  // 待处理的审核或仲裁计数（给管理后台角标）
  const pendingAdminCount =
    skillCards.filter((s) => s.status === 'pending_review').length +
    disputes.filter((d) => d.status === 'pending').length;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-craft-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 左侧：品牌 Logo 与 手作印章 */}
          <div className="flex items-center gap-6">
            <div
              onClick={() => {
                if (currentRole === 'admin') setCurrentRole('user');
                setActiveTab('marketplace');
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-2xl bg-craft-terracotta text-white flex items-center justify-center shadow-craft group-hover:rotate-6 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-handcraft text-2xl font-bold text-craft-ink tracking-wide">
                    巧遇 · 匠心
                  </span>
                  <span className="stamp-badge text-[11px] font-bold text-craft-terracotta bg-craft-terracotta-light border-craft-terracotta">
                    SKILLCRAFT
                  </span>
                </div>
                <p className="text-xs text-craft-ink-light tracking-tight">
                  温暖社区手作智能技能互换平台
                </p>
              </div>
            </div>

            {/* 中间导航 Tabs（仅在前台用户模式展示） */}
            {currentRole === 'user' && (
              <nav className="hidden md:flex items-center gap-1 bg-craft-paper-dark/60 p-1.5 rounded-2xl border border-craft-border">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'marketplace'
                      ? 'bg-white text-craft-terracotta shadow-sm font-bold'
                      : 'text-craft-ink-light hover:text-craft-ink'
                  }`}
                >
                  <Compass className="w-4 h-4" />
                  技能集市
                </button>

                <button
                  onClick={onOpenPublishModal}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-craft-terracotta hover:bg-craft-terracotta-light transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  发布技能
                </button>

                <button
                  onClick={() => setActiveTab('workbench')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all relative ${
                    activeTab === 'workbench'
                      ? 'bg-white text-craft-terracotta shadow-sm font-bold'
                      : 'text-craft-ink-light hover:text-craft-ink'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  互换协作看板
                  {activeContractsCount > 0 && (
                    <span className="w-5 h-5 bg-craft-terracotta text-white rounded-full text-[11px] flex items-center justify-center font-bold">
                      {activeContractsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('timebank')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === 'timebank'
                      ? 'bg-white text-craft-terracotta shadow-sm font-bold'
                      : 'text-craft-ink-light hover:text-craft-ink'
                  }`}
                >
                  <Coins className="w-4 h-4" />
                  时光银行
                </button>
              </nav>
            )}
          </div>

          {/* 右侧：时光币胶囊 + 角色切换开关 + 居民切换 */}
          <div className="flex items-center gap-3">
            {/* 前台模式下的时光币余额胶囊 */}
            {currentRole === 'user' && (
              <button
                onClick={() => setActiveTab('timebank')}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-craft-amber-light to-[#FEF3C7] border border-craft-amber text-craft-ink px-3.5 py-1.5 rounded-full text-sm font-bold shadow-sm hover:scale-105 transition-transform"
              >
                <Coins className="w-4 h-4 text-craft-amber" />
                <span>{currentUser.timeCredits}</span>
                <span className="text-xs text-craft-ink-light font-normal">时光币</span>
              </button>
            )}

            {/* 核心亮点：前台社区 ⇄ 管理后台切换器 */}
            <div className="flex items-center bg-craft-card border-2 border-craft-border rounded-2xl p-1 shadow-sm">
              <button
                onClick={() => setCurrentRole('user')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentRole === 'user'
                    ? 'bg-craft-forest text-white shadow-sm'
                    : 'text-craft-ink-light hover:text-craft-ink'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                前台社区
              </button>
              <button
                onClick={() => setCurrentRole('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all relative ${
                  currentRole === 'admin'
                    ? 'bg-craft-terracotta text-white shadow-sm'
                    : 'text-craft-ink-light hover:text-craft-ink'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                管理后台
                {pendingAdminCount > 0 && currentRole !== 'admin' && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute -top-1 -right-1" />
                )}
              </button>
            </div>

            {/* 身份切换下拉（仅在前台社区提供便利演示） */}
            {currentRole === 'user' ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 bg-white border border-craft-border rounded-full hover:border-craft-terracotta transition-colors shadow-sm"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-craft-border"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-craft-ink leading-none">
                      {currentUser.name}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-craft-ink-light" />
                </button>

                {/* 下拉面板 */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-craft-border py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-3 py-1.5 border-b border-craft-border mb-1">
                      <p className="text-[11px] font-bold text-craft-ink-light uppercase tracking-wider flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        切换演示居民身份
                      </p>
                    </div>

                    <div className="max-h-56 overflow-y-auto">
                      {users
                        .filter((u) => u.role === 'user')
                        .map((u) => (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchUser(u.id);
                              setIsUserDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left flex items-center gap-2.5 hover:bg-craft-paper transition-colors ${
                              u.id === currentUser.id ? 'bg-craft-terracotta-light' : ''
                            }`}
                          >
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-8 h-8 rounded-full object-cover border border-craft-border"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-craft-ink truncate">
                                {u.name}
                              </p>
                              <p className="text-[11px] text-craft-ink-light truncate">
                                {u.title}
                              </p>
                            </div>
                            {u.id === currentUser.id && (
                              <span className="text-xs text-craft-terracotta font-bold">✓</span>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // 管理员状态徽标
              <div className="flex items-center gap-2 pl-2 pr-3 py-1 bg-craft-terracotta-light border border-craft-terracotta/30 rounded-full">
                <ShieldAlert className="w-4 h-4 text-craft-terracotta" />
                <span className="text-xs font-bold text-craft-terracotta">管家·阿清 (Admin)</span>
              </div>
            )}

            {/* 一键重置演示数据 */}
            <button
              onClick={resetAllData}
              title="重置全量演示数据"
              className="p-2 rounded-xl text-craft-ink-light hover:text-craft-terracotta hover:bg-white border border-transparent hover:border-craft-border transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
