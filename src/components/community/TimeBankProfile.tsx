import React from 'react';
import {
  Coins,
  Award,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  Star,
  BookOpen,
  CheckCircle2,
  Gift,
  Lock,
  Sprout,
  Code2,
  Camera,
  Coffee,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { getAvatarFallbackSvg, handleImageError } from '../../utils/imageFallback';

export const TimeBankProfile: React.FC = () => {
  const { currentUser, transactions } = useApp();

  // 渲染荣誉勋章矢量图标
  const renderBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'sprout':
        return <Sprout className="w-5 h-5 text-[#9E5A44]" />;
      case 'star':
        return <Star className="w-5 h-5 text-[#D99636] fill-current" />;
      case 'clock':
        return <Clock className="w-5 h-5 text-[#3B5B43]" />;
      case 'code':
        return <Code2 className="w-5 h-5 text-[#3B5B43]" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-[#D99636]" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-[#D99636]" />;
      default:
        return <Award className="w-5 h-5 text-[#9E5A44]" />;
    }
  };

  // 筛选当前用户的时光币流水
  const userTransactions = transactions.filter((t) => t.userId === currentUser.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 顶部标题 */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="stamp-badge text-[11px] font-bold text-craft-amber bg-craft-amber-light border-craft-amber">
            TIME BANK PASSBOOK
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-handcraft text-craft-ink">
          个人时光存折与手账荣誉
        </h1>
        <p className="text-xs text-craft-ink-light mt-1">
          每一份付出的授课时光，都会化为点亮他人心智的星火与永久存续的时间财富
        </p>
      </div>

      {/* 复古存折风核心资产卡片 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF5EE] via-[#F6EEE3] to-[#EFE4D3] border-2 border-craft-border p-6 sm:p-8 shadow-craft">
        {/* 存折水印底纹 */}
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
          <Coins className="w-56 h-56 text-craft-ink" />
        </div>

        <div className="relative z-10 space-y-6">
          {/* 存折编号与户主 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-craft-border/60">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                onError={(e) => handleImageError(e, getAvatarFallbackSvg(currentUser.name))}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold font-handcraft text-craft-ink">
                    {currentUser.name}
                  </h2>
                  <span className="text-[11px] font-semibold text-craft-terracotta bg-craft-terracotta-light px-2 py-0.5 rounded-full border border-craft-terracotta/30">
                    {currentUser.city}
                  </span>
                </div>
                <p className="text-xs text-craft-ink-light mt-0.5">{currentUser.title}</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-mono tracking-widest text-craft-ink-muted uppercase">
                PASSBOOK NO.
              </span>
              <p className="font-mono text-sm font-bold text-craft-ink">
                TIME-BANK-88231-{currentUser.id.toUpperCase()}
              </p>
            </div>
          </div>

          {/* 四项核心资产数据指标 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/80 p-4 rounded-2xl border border-craft-border shadow-sm">
              <p className="text-xs text-craft-ink-muted flex items-center gap-1 mb-1">
                <Coins className="w-3.5 h-3.5 text-craft-amber" />
                当前时光币余额
              </p>
              <p className="text-2xl sm:text-3xl font-bold font-handcraft text-craft-terracotta">
                {currentUser.timeCredits}{' '}
                <span className="text-xs font-normal text-craft-ink-light">币</span>
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-craft-border shadow-sm">
              <p className="text-xs text-craft-ink-muted flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-craft-forest" />
                累计授课传艺
              </p>
              <p className="text-2xl sm:text-3xl font-bold font-handcraft text-craft-forest">
                {currentUser.taughtHours}{' '}
                <span className="text-xs font-normal text-craft-ink-light">学时</span>
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-craft-border shadow-sm">
              <p className="text-xs text-craft-ink-muted flex items-center gap-1 mb-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                累计向人请教
              </p>
              <p className="text-2xl sm:text-3xl font-bold font-handcraft text-craft-ink">
                {currentUser.learnedHours}{' '}
                <span className="text-xs font-normal text-craft-ink-light">学时</span>
              </p>
            </div>

            <div className="bg-white/80 p-4 rounded-2xl border border-craft-border shadow-sm">
              <p className="text-xs text-craft-ink-muted flex items-center gap-1 mb-1">
                <Star className="w-3.5 h-3.5 text-craft-amber fill-current" />
                邻里信誉分
              </p>
              <p className="text-2xl sm:text-3xl font-bold font-handcraft text-craft-amber">
                {currentUser.reputationScore}{' '}
                <span className="text-xs font-normal text-craft-ink-light">五星好评</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 手账荣誉勋章墙 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-craft-terracotta" />
            <h3 className="font-handcraft text-lg font-bold text-craft-ink">
              手账荣誉印章墙 (Community Badges)
            </h3>
          </div>
          <span className="text-xs text-craft-ink-light font-semibold">
            已点亮 {currentUser.badges.length} 枚荣誉
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentUser.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all hover:-translate-y-0.5 hover:shadow-sm ${badge.badgeStyle}`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/90 border border-current/20 flex items-center justify-center flex-shrink-0 shadow-sm">
                {renderBadgeIcon(badge.icon)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-sm leading-snug">{badge.name}</h4>
                <p className="text-xs opacity-90 mt-1 leading-relaxed">{badge.description}</p>
              </div>
            </div>
          ))}

          {/* 待解锁的灰色勋章提示 */}
          <div className="p-4 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/70 flex items-start gap-3.5 opacity-60">
            <div className="w-10 h-10 rounded-xl bg-stone-200/80 flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-5 h-5 text-stone-500" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-stone-700">桃李满邻里</h4>
                <span className="text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded border border-stone-300">
                  未解锁
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                累计授课满 30 学时即可获得此大师印章
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 存折交易明细账本 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-craft-amber" />
            <h3 className="font-handcraft text-lg font-bold text-craft-ink">
              时光存折出入明细 (Ledger)
            </h3>
          </div>
          <span className="text-xs text-craft-ink-muted">实时区块链存证记账</span>
        </div>

        {userTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-craft-border text-craft-ink-muted bg-craft-paper/60">
                  <th className="py-3 px-4 rounded-l-xl font-bold">时间</th>
                  <th className="py-3 px-4 font-bold">交易类型</th>
                  <th className="py-3 px-4 font-bold">业务摘要与契约</th>
                  <th className="py-3 px-4 font-bold text-right">学时变动</th>
                  <th className="py-3 px-4 rounded-r-xl font-bold text-right">结存余额</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-craft-border/60">
                {userTransactions.map((tx) => {
                  const isPositive = tx.amount > 0;
                  return (
                    <tr key={tx.id} className="hover:bg-craft-paper/40 transition-colors">
                      <td className="py-3.5 px-4 text-craft-ink-muted font-mono whitespace-nowrap">
                        {tx.date}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {tx.type === 'teach_income' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-craft-forest bg-craft-forest-light px-2 py-0.5 rounded-full">
                            <ArrowDownLeft className="w-3 h-3" /> 传艺获得
                          </span>
                        )}
                        {tx.type === 'learn_expense' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                            <ArrowUpRight className="w-3 h-3" /> 求学支出
                          </span>
                        )}
                        {tx.type === 'escrow_lock' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C5D17] bg-craft-amber-light px-2 py-0.5 rounded-full">
                            <Lock className="w-3 h-3" /> 契约质押
                          </span>
                        )}
                        {tx.type === 'escrow_release' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-craft-forest bg-craft-forest-light px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" /> 结课释放
                          </span>
                        )}
                        {tx.type === 'system_gift' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-craft-terracotta bg-craft-terracotta-light px-2 py-0.5 rounded-full">
                            <Gift className="w-3 h-3" /> 入驻礼包
                          </span>
                        )}
                        {tx.type === 'dispute_refund' && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3 h-3" /> 仲裁退还
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-craft-ink max-w-xs">{tx.description}</td>
                      <td
                        className={`py-3.5 px-4 text-right font-bold font-mono whitespace-nowrap ${
                          isPositive ? 'text-craft-forest' : 'text-craft-terracotta'
                        }`}
                      >
                        {isPositive ? `+${tx.amount}` : tx.amount} 币
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold font-mono text-craft-ink whitespace-nowrap">
                        {tx.balanceAfter} 币
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-craft-ink-muted text-center py-6">暂无时光流水记录</p>
        )}
      </div>
    </div>
  );
};
