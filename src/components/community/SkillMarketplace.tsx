import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  ArrowRightLeft,
  Coins,
  HeartHandshake,
  Compass,
  SlidersHorizontal,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Music,
  Code2,
  Hammer,
  Camera,
  Languages,
  Coffee,
  Check,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillCard } from '../../types';
import { getAvatarFallbackSvg, handleImageError } from '../../utils/imageFallback';
import { SkillCardItem } from './SkillCardItem';
import { SkillDetailModal } from './SkillDetailModal';

interface SkillMarketplaceProps {
  onOpenPublishModal: () => void;
  onInitiateSwap: (card: SkillCard) => void;
}

export const SkillMarketplace: React.FC<SkillMarketplaceProps> = ({
  onOpenPublishModal,
  onInitiateSwap,
}) => {
  const { skillCards, currentUser } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingCard, setInspectingCard] = useState<SkillCard | null>(null);

  // 计算与当前登录用户的契合度（检测天作之合 1v1 互换）
  const isCardDirectMatch = (card: SkillCard) => {
    if (card.userId === currentUser.id) return false;

    const userTeaches = currentUser.teachingSkills.join(' ');
    const userSeeks = currentUser.seekingSkills.join(' ');

    const teachMatch =
      userSeeks.includes('Python') &&
      (card.teachSkill.name.includes('Python') || card.teachSkill.name.includes('代码'));
    const learnMatch =
      userTeaches.includes('吉他') &&
      (card.learnSkill.name.includes('吉他') || card.learnSkill.targetGoal.includes('吉他'));

    return teachMatch && learnMatch;
  };

  // 过滤后的技能卡片
  const filteredCards = useMemo(() => {
    return skillCards.filter((card) => {
      // 仅展示已上架激活状态的卡片
      if (card.status !== 'active') return false;

      // 分类筛选
      if (selectedCategory !== 'all' && card.teachSkill.category !== selectedCategory) {
        return false;
      }

      // 教学模式筛选
      if (selectedMode !== 'all') {
        if (selectedMode === 'online' && card.teachSkill.teachingMode === 'offline')
          return false;
        if (selectedMode === 'offline' && card.teachSkill.teachingMode === 'online')
          return false;
      }

      // 关键词搜索
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTeach = card.teachSkill.name.toLowerCase().includes(query);
        const matchDesc = card.teachSkill.description.toLowerCase().includes(query);
        const matchLearn = card.learnSkill.name.toLowerCase().includes(query);
        const matchAuthor = card.authorName.toLowerCase().includes(query);
        const matchTags = card.teachSkill.highlightTags?.some((t) =>
          t.toLowerCase().includes(query)
        );
        return matchTeach || matchDesc || matchLearn || matchAuthor || matchTags;
      }

      return true;
    });
  }, [skillCards, selectedCategory, selectedMode, searchQuery]);

  // 提取天作之合的高光卡片
  const directMatchCards = useMemo(() => {
    return filteredCards.filter((c) => isCardDirectMatch(c));
  }, [filteredCards, currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 顶部 Hero 欢迎与双轨机制解读 Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F6F0E7] via-[#FAF7F2] to-[#EFE7DE] border border-stone-200/90 p-6 sm:p-10 shadow-[0_4px_24px_rgba(44,40,37,0.04)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* 左列：文案主张与核心行动点 */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-stone-200 text-xs font-bold text-[#9E5A44] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#9E5A44]" />
              <span className="whitespace-nowrap">破除商业课昂贵壁垒 · 重拾邻里技艺真诚切磋</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-handcraft text-stone-900 leading-[1.18] tracking-tight">
              以我之所长，换你之所精。
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
              无论是民谣吉他的第一个扫弦呼吸，还是 Python 的第一行自动化脚本，每门技艺都值得被真诚托付。平台采用<strong>「1v1 直连」</strong>与<strong>「时光银行」</strong>双轨制，配合 AI 助教拟定 3 阶段课纲与质押托管，让技能互换不再翻车。
            </p>

            {/* 行动按钮组 */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onOpenPublishModal}
                className="px-6 py-2.5 rounded-xl bg-[#9E5A44] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#7F4330] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <span>发布我的技能卡</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('skill-list');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs sm:text-sm font-bold shadow-sm hover:bg-stone-50 hover:border-[#9E5A44]/50 hover:text-[#9E5A44] transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer active:scale-95"
              >
                <Compass className="w-4 h-4 text-[#9E5A44]" />
                <span>浏览邻里技艺</span>
              </button>
            </div>

            {/* 双轨机制卡片微展示 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 bg-white/90 p-3 rounded-2xl border border-stone-200/80 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-800 whitespace-nowrap">天作之合 · 1v1 直换</p>
                  <p className="text-[11px] text-stone-500 truncate">需求完美契合，免时光币门槛直接对调</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/90 p-3 rounded-2xl border border-stone-200/80 shadow-sm">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-800 whitespace-nowrap">时光银行 · 网状流转</p>
                  <p className="text-[11px] text-stone-500 truncate">教 A 积攒时光币，用币向 B 求学不卡壳</p>
                </div>
              </div>
            </div>
          </div>

          {/* 右列：智能契合实时演示卡片 */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-stone-800 whitespace-nowrap">
                    AI 契合与 3 阶段课纲演示
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full whitespace-nowrap">
                  匹配度 99%
                </span>
              </div>

              {/* 双方对调示意 */}
              <div className="flex items-center justify-between gap-3 bg-[#FAF7F2] p-3 rounded-xl border border-stone-200/60">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="林晨曦"
                    onError={(e) => handleImageError(e, getAvatarFallbackSvg('林晨曦'))}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate whitespace-nowrap">林晨曦</p>
                    <p className="text-[10px] text-[#9E5A44] font-medium truncate whitespace-nowrap flex items-center gap-1">
                      <Music className="w-3 h-3 flex-shrink-0" />
                      <span>木吉他指弹</span>
                    </p>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[#9E5A44] shadow-sm flex-shrink-0">
                  <ArrowRightLeft className="w-3.5 h-3.5 animate-pulse" />
                </div>

                <div className="flex items-center gap-2 min-w-0 justify-end text-right">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-800 truncate whitespace-nowrap">陆小川</p>
                    <p className="text-[10px] text-[#3B5B43] font-medium truncate whitespace-nowrap flex items-center gap-1 justify-end">
                      <Code2 className="w-3 h-3 flex-shrink-0" />
                      <span>Python 办公</span>
                    </p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="陆小川"
                    onError={(e) => handleImageError(e, getAvatarFallbackSvg('陆小川'))}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200 flex-shrink-0"
                  />
                </div>
              </div>

              {/* 3阶段课纲微展示 */}
              <div className="space-y-1.5 text-xs">
                <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  AI 助教定制教学课纲清单：
                </p>
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-700">1. 基础触弦姿势 ⇄ 自动化环境配置</span>
                  <span className="text-emerald-700 font-bold whitespace-nowrap flex items-center gap-1">
                    <Check className="w-3 h-3 flex-shrink-0" />
                    <span>已打卡</span>
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-700">2. 押尾泛音发音 ⇄ 网络数据抓取清洗</span>
                  <span className="text-amber-700 font-bold whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span>进行中</span>
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-stone-50 border border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">3. 独奏曲目录制 ⇄ 定时任务发布验收</span>
                  <span className="text-stone-400 whitespace-nowrap">待结课</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  时光银行质押托管
                </span>
                <span className="text-[#9E5A44] font-semibold whitespace-nowrap">零鸽单防翻车保障</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 天作之合 高光聚光灯推荐区（如果有契合） */}
      {directMatchCards.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 border border-amber-300/80 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D99636] text-white flex items-center justify-center font-bold shadow-sm flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold font-handcraft text-stone-900 whitespace-nowrap">
                    为你推荐的「天作之合」直换伙伴
                  </h2>
                  <span className="text-[11px] bg-amber-600 text-white px-2.5 py-0.5 rounded-full font-bold whitespace-nowrap">
                    契合度 99%
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  对方能教授你想学的（Python自动化），且渴望向你学习（木吉他指弹），可直接 1v1 切磋！
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directMatchCards.map((card) => (
              <SkillCardItem
                key={card.id}
                card={card}
                isDirectMatch={true}
                onSelect={(c) => setInspectingCard(c)}
                onInitiateSwap={(c) => onInitiateSwap(c)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 搜索与分类筛选控制栏 */}
      <div id="skill-list" className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索技能（如：吉他、Python、咖啡、插画）或导师..."
              className="w-full pl-10 pr-4 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] transition-colors"
            />
          </div>

          {/* 授课模式单选 */}
          <div className="flex items-center gap-1.5 self-end md:self-auto bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
            <span className="px-2 text-stone-500 flex items-center gap-1 font-semibold whitespace-nowrap">
              <SlidersHorizontal className="w-3 h-3" />
              模式：
            </span>
            <button
              onClick={() => setSelectedMode('all')}
              className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                selectedMode === 'all'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setSelectedMode('online')}
              className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                selectedMode === 'online'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              仅线上
            </button>
            <button
              onClick={() => setSelectedMode('offline')}
              className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                selectedMode === 'offline'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              同城线下
            </button>
          </div>
        </div>

        {/* 分类标签横向列表 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { key: 'all', label: '全部技能', icon: Sparkles },
            { key: 'music', label: '音乐乐器', icon: Music },
            { key: 'tech', label: '数字编程', icon: Code2 },
            { key: 'craft', label: '生活手作', icon: Hammer },
            { key: 'photo', label: '胶片摄影', icon: Camera },
            { key: 'language', label: '外语漫谈', icon: Languages },
            { key: 'life', label: '咖啡烘焙', icon: Coffee },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.key
                    ? 'bg-[#9E5A44] text-white border-[#9E5A44] shadow-sm'
                    : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 技能卡片列表区 */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs font-bold text-stone-500">
            共找到 <span className="text-[#9E5A44] font-extrabold">{filteredCards.length}</span>{' '}
            门邻里技艺
          </p>

          <button
            onClick={onOpenPublishModal}
            className="text-xs font-bold text-[#9E5A44] hover:underline underline-offset-4 flex items-center gap-1 whitespace-nowrap"
          >
            我也有一技之长想分享？发布我的技能卡 →
          </button>
        </div>

        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map((card) => (
              <SkillCardItem
                key={card.id}
                card={card}
                isDirectMatch={isCardDirectMatch(card)}
                onSelect={(c) => setInspectingCard(c)}
                onInitiateSwap={(c) => onInitiateSwap(c)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-stone-200 my-6">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 mx-auto flex items-center justify-center text-stone-400 mb-3">
              <Compass className="w-6 h-6 text-[#9E5A44]" />
            </div>
            <h3 className="font-handcraft text-base font-bold text-stone-800 mb-1">
              暂未找到符合条件的技能卡
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              换个关键词试试，或者由您来做第一个分享该技能的领路人！
            </p>
            <button
              onClick={onOpenPublishModal}
              className="px-5 py-2 rounded-xl bg-[#9E5A44] text-white text-xs font-bold hover:bg-[#7F4330] transition-colors shadow-sm whitespace-nowrap"
            >
              立即发布一门技能
            </button>
          </div>
        )}
      </div>

      {/* 技能详情抽屉/模态框 */}
      {inspectingCard && (
        <SkillDetailModal
          card={inspectingCard}
          currentUser={currentUser}
          isDirectMatch={isCardDirectMatch(inspectingCard)}
          onClose={() => setInspectingCard(null)}
          onInitiateSwap={(c) => {
            setInspectingCard(null);
            onInitiateSwap(c);
          }}
        />
      )}
    </div>
  );
};
