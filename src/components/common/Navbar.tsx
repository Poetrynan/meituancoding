import React, { useState } from 'react';
import {
  Compass,
  PlusCircle,
  Briefcase,
  Sparkles,
  RotateCcw,
  Users,
  ChevronDown,
  Coins,
  Check,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAvatarFallbackSvg, handleImageError } from '../../utils/imageFallback';

interface NavbarProps {
  onOpenPublishModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPublishModal }) => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    users,
    switchUser,
    resetAllData,
    contracts,
  } = useApp();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // 活跃中的互换契约计数
  const activeContractsCount = contracts.filter(
    (c) =>
      c.status === 'active' &&
      (c.teacherId === currentUser.id || c.studentId === currentUser.id)
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_1px_3px_rgba(44,40,37,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 左侧：品牌 Logo */}
          <div className="flex items-center gap-5 sm:gap-7 flex-shrink-0">
            <div
              onClick={() => setActiveTab('marketplace')}
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

            {/* 中间核心导航 Tabs */}
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
                <span className="whitespace-nowrap">协作看板</span>
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
                <span className="whitespace-nowrap">时光存折</span>
              </button>
            </nav>
          </div>

          {/* 右侧：时光币资产胶囊 + 居民身份选择器 + 重置 */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* 时光币余额胶囊 */}
            <button
              onClick={() => setActiveTab('timebank')}
              className="flex items-center gap-1.5 bg-[#FEF7EC] border border-[#E9C380]/60 text-stone-800 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-[#FDF0DA] transition-colors shadow-sm"
            >
              <Coins className="w-3.5 h-3.5 text-[#D99636] flex-shrink-0" />
              <span className="font-bold">{currentUser.timeCredits}</span>
              <span className="text-[11px] text-stone-500 font-normal whitespace-nowrap">时光币</span>
            </button>

            {/* 居民切换下拉 */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 bg-white border border-stone-200 rounded-full hover:border-[#9E5A44]/60 transition-colors shadow-sm"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  onError={(e) => handleImageError(e, getAvatarFallbackSvg(currentUser.name))}
                  className="w-6 h-6 rounded-full object-cover border border-stone-200 flex-shrink-0"
                />
                <span className="text-xs font-bold text-stone-800 whitespace-nowrap hidden sm:inline-block">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400 flex-shrink-0" />
              </button>

              {/* 居民切换下拉浮层 */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in">
                  <div className="px-3 py-1.5 border-b border-stone-100 mb-1">
                    <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
                      <Users className="w-3 h-3" />
                      当前登录居民
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
                            onError={(e) => handleImageError(e, getAvatarFallbackSvg(u.name))}
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
                            <Check className="w-3.5 h-3.5 text-[#9E5A44] flex-shrink-0" />
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* 一键重置演示数据 */}
            <button
              onClick={resetAllData}
              title="重置本地演示数据"
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
