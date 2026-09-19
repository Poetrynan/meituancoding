import React, { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  Filter,
  ArrowRightLeft,
  Coins,
  ShieldCheck,
  HeartHandshake,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillCard } from '../../types';
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
  // 规则：对方教的技能中包含当前用户想学的，或者对方想学的包含当前用户会教的
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 顶部 Hero 欢迎与双轨机制解读 Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#F5EFEB] via-[#FAF6F0] to-[#EFE7DE] border-2 border-craft-border p-6 sm:p-10 shadow-craft">
        {/* 装饰性背景手作图章 */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full border-4 border-dashed border-[#D4C7BA]/50 pointer-events-none -rotate-12" />

        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-craft-border text-xs font-bold text-craft-terracotta mb-4 shadow-sm">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>破除商业课昂贵壁垒 · 重拾邻里技艺真诚切磋</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-handcraft text-craft-ink leading-tight mb-3">
            以我之所长，换你之所精。
          </h1>

          <p className="text-sm sm:text-base text-craft-ink-light leading-relaxed mb-6">
            无论是民谣吉他的第一个扫弦，还是 Python 的第一行自动化脚本，每一门技艺都值得被真诚托付。
            平台采用<strong>「1v1 直连」</strong>与<strong>「时光银行」</strong>双轨制，配合 AI
            助教自动拟定学习大纲与课时质押，让技能互换不再翻车。
          </p>

          {/* 双轨机制卡片微展示 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-3 bg-white/90 p-3 rounded-2xl border border-craft-border/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-craft-amber-light text-craft-amber flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-craft-ink">天作之合 · 1v1 直换</p>
                <p className="text-[11px] text-craft-ink-muted">需求完美契合，免时光币门槛直接对调切磋</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/90 p-3 rounded-2xl border border-craft-border/80 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-craft-forest-light text-craft-forest flex items-center justify-center flex-shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-craft-ink">时光银行 · 网状流转</p>
                <p className="text-[11px] text-craft-ink-muted">教 A 积累时光币，用币向 B 求学，打破双重巧合困境</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 天作之合 高光聚光灯推荐区（如果有契合） */}
      {directMatchCards.length > 0 && (
        <div className="bg-gradient-to-r from-[#FEF7EC] via-[#FFFBF5] to-[#FDF3EE] border-2 border-craft-amber/60 rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-craft-amber text-craft-ink flex items-center justify-center font-bold shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-handcraft text-craft-ink flex items-center gap-2">
                  <span>AI 智能契合发现：为你推荐的「天作之合」</span>
                  <span className="text-xs bg-craft-amber text-craft-ink px-2 py-0.5 rounded-full font-bold">
                    匹配度 99%
                  </span>
                </h2>
                <p className="text-xs text-craft-ink-light">
                  检测到对方能教你想学的技能（Python），且对方渴望学习你擅长的技能（木吉他）！
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
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-craft-border shadow-sm">
          {/* 搜索框 */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-craft-ink-light absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索技能（如：吉他、Python、咖啡、插画）或导师名字..."
              className="w-full pl-10 pr-4 py-2 bg-craft-paper rounded-xl border border-craft-border text-sm text-craft-ink placeholder-craft-ink-muted focus:outline-none focus:border-craft-terracotta transition-colors"
            />
          </div>

          {/* 授课模式单选 */}
          <div className="flex items-center gap-1.5 self-end md:self-auto bg-craft-paper p-1 rounded-xl border border-craft-border text-xs">
            <span className="px-2 text-craft-ink-muted flex items-center gap-1 font-semibold">
              <SlidersHorizontal className="w-3 h-3" />
              模式：
            </span>
            <button
              onClick={() => setSelectedMode('all')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedMode === 'all'
                  ? 'bg-white text-craft-ink shadow-sm'
                  : 'text-craft-ink-light hover:text-craft-ink'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => setSelectedMode('online')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedMode === 'online'
                  ? 'bg-white text-craft-ink shadow-sm'
                  : 'text-craft-ink-light hover:text-craft-ink'
              }`}
            >
              仅线上
            </button>
            <button
              onClick={() => setSelectedMode('offline')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                selectedMode === 'offline'
                  ? 'bg-white text-craft-ink shadow-sm'
                  : 'text-craft-ink-light hover:text-craft-ink'
              }`}
            >
              同城线下
            </button>
          </div>
        </div>

        {/* 分类标签横向滑动条 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { key: 'all', label: '全部技能' },
            { key: 'music', label: '🎸 音乐乐器' },
            { key: 'tech', label: '💻 数字编程' },
            { key: 'craft', label: '🪵 生活手作' },
            { key: 'photo', label: '📷 胶片摄影' },
            { key: 'language', label: '🗣️ 外语漫谈' },
            { key: 'life', label: '☕ 咖啡烘焙' },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat.key
                  ? 'bg-craft-terracotta text-white border-craft-terracotta shadow-sm scale-105'
                  : 'bg-white text-craft-ink-light border-craft-border hover:border-craft-terracotta/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 技能卡片列表区 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-craft-ink-light">
            共找到 <span className="text-craft-terracotta font-extrabold">{filteredCards.length}</span>{' '}
            门邻里技艺
          </p>

          <button
            onClick={onOpenPublishModal}
            className="text-xs font-bold text-craft-terracotta hover:underline underline-offset-4 flex items-center gap-1"
          >
            我也有一技之长想要分享？发布我的技能卡 →
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
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-craft-border my-6">
            <div className="w-14 h-14 rounded-2xl bg-craft-paper mx-auto flex items-center justify-center text-craft-ink-light mb-3">
              <Compass className="w-7 h-7 text-craft-terracotta" />
            </div>
            <h3 className="font-handcraft text-base font-bold text-craft-ink mb-1">
              暂未找到符合条件的技能卡
            </h3>
            <p className="text-xs text-craft-ink-light max-w-sm mx-auto mb-4">
              换个关键词试试，或者由您来做第一个分享该技能的领路人！
            </p>
            <button
              onClick={onOpenPublishModal}
              className="px-5 py-2 rounded-xl bg-craft-terracotta text-white text-xs font-bold hover:bg-craft-terracotta-dark transition-colors shadow-sm"
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
