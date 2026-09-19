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
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_1px_3px_rgba(44,40,37,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左侧：品牌 Logo */}
          <div className="flex items-center gap-5 sm:gap-7 flex-shrink-0">
            <div
              onClick={() => {
                if (currentRole === 'admin') setCurrentRole('user');
                setActiveTab('marketplace');
              }}
              className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-[#9E5A44] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-handcraft text-lg sm:text-xl font-bold text-stone-900 tracking-wide whitespace-nowrap">
                  巧遇 · 匠心
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-bold text-[#9E5A44] bg-[#9E5A44]/10 border border-[#9E5A44]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                  SkillCraft
                </span>
              </div>
            </div>

            {/* 中间导航 Tabs（仅在前台社区模式展示） */}
            {currentRole === 'user' && (
              <nav className="hidden md:flex items-center gap-1 bg-stone-200/50 p-1 rounded-xl border border-stone-200/70 flex-shrink-0">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'marketplace'
                      ? 'bg-white text-[#9E5A44] shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">技能集市</span>
                </button>

                <button
                  onClick={onOpenPublishModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-[#9E5A44] hover:bg-white/80 transition-all"
                >
                  <PlusCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">发布技能</span>
                </button>

                <button
                  onClick={() => setActiveTab('workbench')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all relative ${
                    activeTab === 'workbench'
                      ? 'bg-white text-[#9E5A44] shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">互换协作看板</span>
                  {activeContractsCount > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 bg-[#9E5A44] text-white rounded-full text-[10px] font-bold">
                      {activeContractsCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('timebank')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === 'timebank'
                      ? 'bg-white text-[#9E5A44] shadow-sm font-bold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Coins className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="whitespace-nowrap">时光银行</span>
                </button>
              </nav>
            )}
          </div>

          {/* 右侧：时光币胶囊 + 角色切换开关 + 居民切换 + 重置 */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* 前台模式下的时光币余额胶囊 */}
            {currentRole === 'user' && (
              <button
                onClick={() => setActiveTab('timebank')}
                className="hidden sm:flex items-center gap-1.5 bg-[#FEF7EC] border border-[#E9C380]/60 text-stone-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-[#FDF0DA] transition-colors shadow-sm"
              >
                <Coins className="w-3.5 h-3.5 text-[#D99636] flex-shrink-0" />
                <span className="font-bold">{currentUser.timeCredits}</span>
                <span className="text-[11px] text-stone-500 font-normal whitespace-nowrap">时光币</span>
              </button>
            )}

            {/* 核心亮点：前台社区 ⇄ 管理后台切换器 */}
            <div className="flex items-center bg-stone-200/60 border border-stone-200 p-0.5 rounded-xl shadow-inner flex-shrink-0">
              <button
                onClick={() => setCurrentRole('user')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  currentRole === 'user'
                    ? 'bg-[#3B5B43] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Store className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">前台社区</span>
              </button>

              <button
                onClick={() => setCurrentRole('admin')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all relative ${
                  currentRole === 'admin'
                    ? 'bg-[#9E5A44] text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldAlert className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">管理后台</span>
                {pendingAdminCount > 0 && currentRole !== 'admin' && (
                  <span className="w-2 h-2 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 animate-pulse" />
                )}
              </button>
            </div>

            {/* 身份切换下拉（前台社区演示） */}
            {currentRole === 'user' ? (
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 bg-white border border-stone-200 rounded-full hover:border-[#9E5A44]/60 transition-colors shadow-sm"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-6 h-6 rounded-full object-cover border border-stone-200 flex-shrink-0"
                  />
                  <span className="text-xs font-bold text-stone-800 whitespace-nowrap hidden sm:inline-block">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-stone-400 flex-shrink-0" />
                </button>

                {/* 下拉面板 */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in">
                    <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
                      <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
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
                            className={`w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-stone-50 transition-colors ${
                              u.id === currentUser.id ? 'bg-[#FAF2EE]' : ''
                            }`}
                          >
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-7 h-7 rounded-full object-cover border border-stone-200 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-stone-800 truncate whitespace-nowrap">
                                {u.name}
                              </p>
                              <p className="text-[11px] text-stone-500 truncate whitespace-nowrap">
                                {u.title}
                              </p>
                            </div>
                            {u.id === currentUser.id && (
                              <span className="text-xs text-[#9E5A44] font-bold">✓</span>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FDF2EE] border border-[#9E5A44]/30 rounded-full flex-shrink-0">
                <ShieldAlert className="w-3.5 h-3.5 text-[#9E5A44] flex-shrink-0" />
                <span className="text-xs font-bold text-[#9E5A44] whitespace-nowrap">
                  管家·阿清 (Admin)
                </span>
              </div>
            )}

            {/* 一键重置演示数据 */}
            <button
              onClick={resetAllData}
              title="重置演示数据"
              className="p-1.5 rounded-lg text-stone-400 hover:text-[#9E5A44] hover:bg-white border border-transparent hover:border-stone-200 transition-all flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
