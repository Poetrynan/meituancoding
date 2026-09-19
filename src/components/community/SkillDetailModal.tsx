import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  X,
  Sparkles,
  MapPin,
  Star,
  Clock,
  Laptop,
  ArrowRightLeft,
  CheckCircle2,
  Coins,
  ShieldCheck,
} from 'lucide-react';
import { SkillCard, UserProfile } from '../../types';
import {
  getCategoryFallbackSvg,
  getAvatarFallbackSvg,
  handleImageError,
} from '../../utils/imageFallback';

interface SkillDetailModalProps {
  card: SkillCard | null;
  currentUser: UserProfile;
  isDirectMatch?: boolean;
  onClose: () => void;
  onInitiateSwap: (card: SkillCard) => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  card,
  currentUser,
  isDirectMatch,
  onClose,
  onInitiateSwap,
}) => {
  // 模态框打开时锁定底板滚动，关闭时恢复
  useEffect(() => {
    if (!card) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [card]);

  if (!card) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] border-2 border-craft-border shadow-2xl relative flex flex-col overflow-hidden animate-in fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部常驻浮动关闭按钮：层级顶置、带磨砂背景、不随内部滚动移位 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
          title="关闭详情"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* 内部主滚动容器：专属 modal-scrollbar 上下避让圆角，轨道透明，绝不切角 */}
        <div className="flex-1 overflow-y-auto modal-scrollbar">
          {/* 顶部主图与氛围 Banner */}
          <div className="relative aspect-video sm:aspect-[21/9] bg-craft-paper overflow-hidden">
            <img
              src={
                card.teachSkill.portfolioImages?.[0] ||
                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
              }
              alt={card.teachSkill.name}
              onError={(e) =>
                handleImageError(
                  e,
                  getCategoryFallbackSvg(card.teachSkill.category, card.teachSkill.name)
                )
              }
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {isDirectMatch && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-craft-amber to-[#E5A93C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>天作之合 · 你们的教与学刚好互补！</span>
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 mb-1 text-xs">
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                  {card.teachSkill.category}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Laptop className="w-3 h-3" />
                  {card.teachSkill.teachingMode === 'online'
                    ? '线上远程'
                    : card.teachSkill.teachingMode === 'offline'
                    ? '同城线下'
                    : '线上/线下均可'}
                </span>
                <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  每课时约 {card.teachSkill.hoursPerSession} 小时
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-handcraft leading-tight">
                {card.teachSkill.name}
              </h2>
            </div>
          </div>

          {/* 模态框主体内容 */}
          <div className="p-6 space-y-6">
            {/* 导师名片与信用 */}
            <div className="flex items-center justify-between p-4 bg-craft-paper rounded-2xl border border-craft-border">
              <div className="flex items-center gap-3">
                <img
                  src={card.authorAvatar}
                  alt={card.authorName}
                  onError={(e) => handleImageError(e, getAvatarFallbackSvg(card.authorName))}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-base text-craft-ink">{card.authorName}</h4>
                    <span className="text-xs text-craft-ink-muted flex items-center gap-0.5">
                      <MapPin className="w-3 h-3" />
                      {card.authorCity}
                    </span>
                  </div>
                  <p className="text-xs text-craft-ink-light mt-0.5">{card.authorBio}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-bold text-craft-amber justify-end">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{card.authorReputation} 信誉分</span>
                </div>
                <span className="text-[11px] text-craft-forest font-semibold flex items-center gap-1 justify-end mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  已实名认证
                </span>
              </div>
            </div>

            {/* 教学内容详述 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-craft-ink-light mb-2">
                【我能教授的技能细节与背景】
              </h4>
              <p className="text-sm text-craft-ink leading-relaxed whitespace-pre-line bg-craft-cream p-4 rounded-2xl border border-craft-border/60">
                {card.teachSkill.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-3 py-1 rounded-full bg-craft-terracotta-light text-craft-terracotta font-semibold border border-craft-terracotta/20">
                  资历：{card.teachSkill.yearsOfExperience}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-craft-forest-light text-craft-forest font-semibold border border-craft-forest/20">
                  难度级别：{card.teachSkill.level}
                </span>
                {card.teachSkill.highlightTags?.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-white text-craft-ink-light border border-craft-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 作品墙展示 */}
            {card.teachSkill.portfolioImages && card.teachSkill.portfolioImages.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-craft-ink-light mb-2">
                  【作品与教学实拍展示】
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {card.teachSkill.portfolioImages.map((img, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden border-2 border-craft-border shadow-sm hover:scale-105 transition-transform"
                    >
                      <img
                        src={img}
                        alt="作品展示"
                        onError={(e) =>
                          handleImageError(
                            e,
                            getCategoryFallbackSvg(
                              card.teachSkill.category,
                              `${card.teachSkill.name} - 作品${i + 1}`
                            )
                          )
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 对方渴望学习的技能 */}
            <div className="bg-[#FAF4EE] p-4 rounded-2xl border border-craft-terracotta/20">
              <div className="flex items-center gap-2 text-sm font-bold text-craft-terracotta mb-2">
                <ArrowRightLeft className="w-4 h-4" />
                <span>对方渴望通过互换学到的技能：</span>
              </div>
              <p className="text-base font-bold font-handcraft text-craft-ink mb-1">
                {card.learnSkill.name}
              </p>
              <p className="text-xs text-craft-ink-light mb-2">
                目标诉求：{card.learnSkill.targetGoal}
              </p>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white text-craft-terracotta border border-craft-terracotta/30">
                当前水平：{card.learnSkill.currentLevel}
              </span>
            </div>

            {/* 交易安全提示小卡 */}
            <div className="bg-craft-forest-light/60 p-3.5 rounded-2xl border border-craft-forest/20 flex items-start gap-2.5 text-xs text-craft-forest-dark">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-craft-forest mt-0.5" />
              <div>
                <p className="font-bold">巧遇·时光银行履约保障：</p>
                <p className="text-[11px] opacity-90 leading-relaxed">
                  发起互换后，系统将由 AI 助教协助双方生成结构化《3阶段学习大纲契约》。课时时光币将进入中枢质押池，每次双方打卡完成后自动划转，杜绝翻车鸽单。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 固定底部发起互换栏：永远停留在卡片底端，操作一目了然 */}
        <div className="p-4 bg-craft-paper border-t border-craft-border flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-craft-amber" />
            <div>
              <p className="text-xs text-craft-ink-light">消耗学时币</p>
              <p className="text-sm font-bold text-craft-ink">
                {isDirectMatch ? '0 时光币 (1v1免质押)' : `${card.teachSkill.costCredits} 时光币 / 课`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-craft-ink-light hover:bg-black/5 transition-colors"
            >
              再看看
            </button>
            <button
              onClick={() => {
                onClose();
                onInitiateSwap(card);
              }}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 ${
                isDirectMatch
                  ? 'bg-gradient-to-r from-craft-amber to-[#E5A93C] text-craft-ink hover:scale-105'
                  : 'bg-craft-terracotta text-white hover:bg-craft-terracotta-dark hover:scale-105'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {isDirectMatch ? '立即开启 1v1 浪漫互换' : '发起换学契约'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
