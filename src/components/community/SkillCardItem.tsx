import React from 'react';
import {
  Sparkles,
  MapPin,
  Star,
  Clock,
  ArrowRightLeft,
  Laptop,
  Coins,
  ShieldCheck,
  Music,
  Code2,
  Camera,
  Hammer,
  Languages,
  Coffee,
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
  const renderCategoryBadge = (category: string) => {
    switch (category) {
      case 'music':
        return (
          <span className="flex items-center gap-1">
            <Music className="w-3 h-3 text-[#9E5A44]" />
            <span>音乐乐器</span>
          </span>
        );
      case 'tech':
        return (
          <span className="flex items-center gap-1">
            <Code2 className="w-3 h-3 text-[#3B5B43]" />
            <span>数字编程</span>
          </span>
        );
      case 'photo':
        return (
          <span className="flex items-center gap-1">
            <Camera className="w-3 h-3 text-[#7F4330]" />
            <span>胶片光影</span>
          </span>
        );
      case 'craft':
        return (
          <span className="flex items-center gap-1">
            <Hammer className="w-3 h-3 text-stone-700" />
            <span>生活手作</span>
          </span>
        );
      case 'language':
        return (
          <span className="flex items-center gap-1">
            <Languages className="w-3 h-3 text-blue-700" />
            <span>外语漫谈</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1">
            <Coffee className="w-3 h-3 text-[#D99636]" />
            <span>咖啡生活</span>
          </span>
        );
    }
  };

  const thumbnail =
    card.teachSkill.portfolioImages?.[0] ||
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80';

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
        isDirectMatch
          ? 'border-amber-300 shadow-[0_4px_20px_-2px_rgba(217,150,54,0.18)] hover:shadow-[0_8px_30px_-4px_rgba(217,150,54,0.25)] hover:-translate-y-1 ring-1 ring-amber-300/40'
          : 'border-stone-200/80 shadow-[0_2px_12px_rgba(44,40,37,0.04)] hover:shadow-[0_8px_24px_rgba(44,40,37,0.08)] hover:-translate-y-1 hover:border-stone-300'
      }`}
    >
      {/* 天作之合高光内嵌横幅 */}
      {isDirectMatch && (
        <div className="bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-500/15 border-b border-amber-300/50 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="whitespace-nowrap">天作之合 · 需求双向吻合</span>
          </div>
          <span className="text-[10px] font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
            免时光币直换
          </span>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col">
        {/* 导师作者信息栏 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={card.authorAvatar}
              alt={card.authorName}
              className="w-8 h-8 rounded-full object-cover border border-stone-200 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-800 truncate whitespace-nowrap">
                {card.authorName}
              </p>
              <p className="text-[11px] text-stone-500 flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{card.authorCity}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md font-semibold border border-amber-200/50 flex-shrink-0">
            <Star className="w-3 h-3 fill-current text-amber-500" />
            <span className="whitespace-nowrap font-mono">{card.authorReputation}</span>
          </div>
        </div>

        {/* 优雅照片相框 */}
        <div
          onClick={() => onSelect(card)}
          className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 cursor-pointer mb-3.5 group-hover:opacity-95 transition-opacity"
        >
          <img
            src={thumbnail}
            alt={card.teachSkill.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* 标签微胶囊 */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white/95 text-stone-700 backdrop-blur-sm shadow-sm border border-stone-200/60 whitespace-nowrap">
              {renderCategoryBadge(card.teachSkill.category)}
            </span>

            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm flex items-center gap-1 whitespace-nowrap">
              <Laptop className="w-3 h-3" />
              {card.teachSkill.teachingMode === 'online'
                ? '线上'
                : card.teachSkill.teachingMode === 'offline'
                ? '线下'
                : '均可'}
            </span>
          </div>

          {/* 课时学分标价 */}
          <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-sm border border-stone-200/70 flex items-center gap-1 text-[11px] font-bold text-stone-800 whitespace-nowrap">
            <Coins className="w-3 h-3 text-amber-500" />
            <span>{card.teachSkill.costCredits} 币/课</span>
          </div>
        </div>

        {/* 技能主标题 */}
        <h3
          onClick={() => onSelect(card)}
          className="text-sm font-bold font-handcraft text-stone-900 leading-snug hover:text-[#9E5A44] cursor-pointer transition-colors line-clamp-2 mb-2"
        >
          {card.teachSkill.name}
        </h3>

        {/* 亮点标签 */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {card.teachSkill.highlightTags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-stone-100/80 text-stone-600 border border-stone-200/60 whitespace-nowrap"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 换学对比卡片 */}
        <div className="bg-[#FAF7F2] rounded-xl p-2.5 border border-stone-200/60 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-[#9E5A44] font-bold mb-1">
            <ArrowRightLeft className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="whitespace-nowrap text-[11px]">想换学：</span>
            <span className="text-stone-800 truncate">{card.learnSkill.name}</span>
          </div>
          <p className="text-[11px] text-stone-500 line-clamp-1">
            目标：{card.learnSkill.targetGoal}
          </p>
        </div>
      </div>

      {/* 底部按钮 */}
      <div className="p-3 bg-stone-50/60 border-t border-stone-100 flex items-center gap-2">
        <button
          onClick={() => onSelect(card)}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-stone-600 bg-white hover:bg-stone-100 border border-stone-200/80 transition-colors text-center whitespace-nowrap"
        >
          查看详情
        </button>

        <button
          onClick={() => onInitiateSwap(card)}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 whitespace-nowrap ${
            isDirectMatch
              ? 'bg-[#D99636] text-white hover:bg-[#C2822A]'
              : 'bg-[#9E5A44] text-white hover:bg-[#7F4330]'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>{isDirectMatch ? '发起1v1互换' : '发起换学'}</span>
        </button>
      </div>
    </div>
  );
};
