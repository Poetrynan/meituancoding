import React, { useState } from 'react';
import {
  Compass,
  PlusCircle,
  Briefcase,
  Sparkles,
  ChevronDown,
  Coins,
  LogOut,
  User,
  Globe,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAvatarFallbackSvg, handleImageError } from '../../utils/imageFallback';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenPublishModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPublishModal }) => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    contracts,
    isLoggedIn,
    logout,
    openAuthModal,
  } = useApp();

  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // 活跃中的互换契约计数
  const activeContractsCount = contracts.filter(
    (c) =>
      c.status === 'active' &&
      (c.teacherId === currentUser.id || c.studentId === currentUser.id)
  ).length;

  const handlePublishClick = () => {
    if (!isLoggedIn) {
      window.location.hash = '#/logging';
      return;
    }
    onOpenPublishModal();
  };

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
              <BrandLogo size={38} className="rounded-xl shadow-xs group-hover:scale-105 transition-transform flex-shrink-0" />
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
                onClick={handlePublishClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-[#9E5A44] hover:bg-white/80 transition-all cursor-pointer"
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

              <button
                onClick={() => { window.location.hash = '#/landing'; }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap text-stone-600 hover:text-stone-900 hover:bg-white/60 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0 text-[#9E5A44]" />
                <span className="whitespace-nowrap">产品官网</span>
              </button>
            </nav>
          </div>

          {/* 右侧：登录/注册 或 居民信息菜单 */}
          {!isLoggedIn ? (
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => { window.location.hash = '#/logging'; }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-all cursor-pointer"
              >
                登录
              </button>
              <button
                onClick={() => { window.location.hash = '#/logging?mode=register'; }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#9E5A44] hover:bg-[#854B38] text-white shadow-sm transition-all cursor-pointer"
              >
                注册入驻
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* 时光币余额胶囊 */}
              <button
                onClick={() => setActiveTab('timebank')}
                className="flex items-center gap-1.5 bg-[#FEF7EC] border border-[#E9C380]/60 text-stone-800 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap hover:bg-[#FDF0DA] transition-colors shadow-sm cursor-pointer"
              >
                <Coins className="w-3.5 h-3.5 text-[#D99636] flex-shrink-0" />
                <span className="font-bold">{currentUser.timeCredits}</span>
                <span className="text-[11px] text-stone-500 font-normal whitespace-nowrap">时光币</span>
              </button>

              {/* 个人菜单 */}
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 bg-white border border-stone-200 rounded-full hover:border-[#9E5A44]/60 transition-colors shadow-sm cursor-pointer"
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

                {/* 个人下拉浮层 */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in">
                    <div className="px-3.5 py-2.5 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {currentUser.title} · {currentUser.city}
                      </p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab('timebank');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Coins className="w-3.5 h-3.5 text-[#D99636]" />
                        <span>我的时光存折</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('workbench');
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-stone-500" />
                        <span>我的协作看板</span>
                      </button>
                    </div>

                    <div className="border-t border-stone-100 pt-1">
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>退出登录</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
