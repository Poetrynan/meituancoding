import React from 'react';
import {
  Sparkles,
  MapPin,
  Star,
  Clock,
  ArrowRightLeft,
  Laptop,
  Compass,
  Coins,
} from 'lucide-react';
import { SkillCard } from '../../types';

interface SkillCardItemProps {
  card: SkillCard;
  isDirectMatch?: boolean;
  onSelect: (card: SkillCard) => void;
  onInitiateSwap: (card: SkillCard) => void;
}

export const SkillCardItem: React.FC<SkillCardItemProps> = ({
  card,
  isDirectMatch = false,
  onSelect,
  onInitiateSwap,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'music':
        return 'bg-[#FDF2EE] text-[#9E5A44] border-[#9E5A44]/30';
      case 'tech':
        return 'bg-[#EBF2EC] text-[#3B5B43] border-[#3B5B43]/30';
      case 'photo':
        return 'bg-[#FEF7EC] text-[#D99636] border-[#D99636]/30';
      case 'craft':
        return 'bg-[#F5EFEB] text-[#7F4330] border-[#7F4330]/30';
      case 'language':
        return 'bg-[#EEF2F6] text-[#2C5282] border-[#2C5282]/30';
      default:
        return 'bg-[#F7F4EE] text-[#554F47] border-[#554F47]/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'music':
        return '🎸 音乐乐器';
      case 'tech':
        return '💻 数字编程';
      case 'photo':
        return '📷 胶片光影';
      case 'craft':
        return '🪵 生活手作';
      case 'language':
        return '🗣️ 外语漫谈';
      default:
        return '🌿 生活美学';
    }
  };

  const thumbnail =
    card.teachSkill.portfolioImages?.[0] ||
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80';

  return (
    <div
      className={`group relative bg-white rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between ${
        isDirectMatch
          ? 'border-2 border-craft-amber shadow-lg shadow-craft-amber/10 hover:shadow-xl hover:shadow-craft-amber/20 hover:-translate-y-1'
          : 'border-craft-border shadow-craft hover:shadow-craft-hover hover:-translate-y-1'
      }`}
    >
      {/* 核心亮点：天作之合 1v1 互换印章 */}
      {isDirectMatch && (
        <div className="absolute -top-3.5 left-4 z-10 bg-gradient-to-r from-craft-amber to-[#E5A93C] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>天作之合 · 需求双向契合</span>
        </div>
      )}

      <div>
        {/* 拍立得相框式主图 */}
        <div
          onClick={() => onSelect(card)}
          className="relative aspect-video rounded-xl overflow-hidden bg-craft-paper cursor-pointer mb-3.5 group-hover:opacity-95 transition-opacity"
        >
          <img
            src={thumbnail}
            alt={card.teachSkill.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
            <span
              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-sm bg-white/90 ${getCategoryColor(
                card.teachSkill.category
              )}`}
            >
              {getCategoryLabel(card.teachSkill.category)}
            </span>

            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm flex items-center gap-1">
              <Laptop className="w-3 h-3" />
              {card.teachSkill.teachingMode === 'online'
                ? '线上互动'
                : card.teachSkill.teachingMode === 'offline'
                ? '同城线下'
                : '线上/线下皆可'}
            </span>
          </div>

          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm border border-craft-border flex items-center gap-1 text-xs font-bold text-craft-ink">
            <Coins className="w-3.5 h-3.5 text-craft-amber" />
            <span>{card.teachSkill.costCredits} 时光币/课</span>
          </div>
        </div>

        {/* 导师作者信息栏 */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={card.authorAvatar}
              alt={card.authorName}
              className="w-8 h-8 rounded-full object-cover border border-craft-border"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-craft-ink truncate">{card.authorName}</p>
              <p className="text-[11px] text-craft-ink-muted flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{card.authorCity}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs bg-craft-amber-light text-[#9A6715] px-2 py-0.5 rounded-md font-semibold border border-[#E9C380]/40 flex-shrink-0">
            <Star className="w-3 h-3 fill-current" />
            <span>{card.authorReputation} 信誉</span>
          </div>
        </div>

        {/* 我能教的（主标题） */}
        <h3
          onClick={() => onSelect(card)}
          className="text-base font-bold font-handcraft text-craft-ink leading-snug hover:text-craft-terracotta cursor-pointer transition-colors line-clamp-2 mb-2"
        >
          {card.teachSkill.name}
        </h3>

        {/* 亮点标签 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {card.teachSkill.highlightTags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-craft-paper text-craft-ink-light border border-craft-border"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 我想学的（对比展示） */}
        <div className="bg-craft-paper/80 rounded-xl p-2.5 border border-craft-border/60 mb-3.5">
          <div className="flex items-center gap-1.5 text-xs text-craft-terracotta font-bold mb-1">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>渴望换学：</span>
            <span className="text-craft-ink underline underline-offset-2">
              {card.learnSkill.name}
            </span>
          </div>
          <p className="text-[11px] text-craft-ink-muted line-clamp-1">
            目标：{card.learnSkill.targetGoal}
          </p>
        </div>
      </div>

      {/* 底部操作按钮 */}
      <div className="flex items-center gap-2 pt-2 border-t border-craft-border/50">
        <button
          onClick={() => onSelect(card)}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-craft-ink-light bg-craft-paper hover:bg-craft-paper-dark transition-colors text-center"
        >
          查看详情
        </button>

        <button
          onClick={() => onInitiateSwap(card)}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 ${
            isDirectMatch
              ? 'bg-craft-amber text-craft-ink hover:brightness-105'
              : 'bg-craft-terracotta text-white hover:bg-craft-terracotta-dark'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {isDirectMatch ? '发起1v1互换' : '发起换学'}
        </button>
      </div>
    </div>
  );
};
