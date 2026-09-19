import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillCard } from '../../types';
import { getAvatarFallbackSvg, handleImageError } from '../../utils/imageFallback';

export const SkillAuditTable: React.FC = () => {
  const { skillCards, auditSkillCard } = useApp();

  const [filterStatus, setFilterStatus] = useState<'all' | 'pending_review' | 'active' | 'rejected'>('pending_review');
  const [inspectingCard, setInspectingCard] = useState<SkillCard | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  const filteredCards = skillCards.filter((c) => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  const pendingCount = skillCards.filter((c) => c.status === 'pending_review').length;

  const handleApprove = (id: string) => {
    auditSkillCard(id, 'approve');
  };

  const handleOpenReject = (card: SkillCard) => {
    setInspectingCard(card);
    setRejectReason(card.aiRiskNotes || '技能表述包含违规引流或灰产营销风险');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (inspectingCard) {
      auditSkillCard(inspectingCard.id, 'reject', rejectReason);
      setIsRejectModalOpen(false);
      setInspectingCard(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* 状态过滤 Tab */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { key: 'pending_review', label: `待合规审核 (${pendingCount})` },
            { key: 'all', label: `全部技能卡 (${skillCards.length})` },
            { key: 'active', label: '已上架' },
            { key: 'rejected', label: '已驳回' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filterStatus === tab.key
                  ? 'bg-white/[0.12] text-white border border-white/[0.16] shadow-sm font-semibold'
                  : 'bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-zinc-400 font-mono">
          敏感词初筛已过滤 · 请核实技能真实度与履约合规性
        </p>
      </div>

      {/* 审核卡片表格 */}
      <div className="bg-[#14171F] rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-zinc-400 bg-white/[0.02]">
                <th className="py-3 px-4 font-medium">发布者与地点</th>
                <th className="py-3 px-4 font-medium">教授技能名称</th>
                <th className="py-3 px-4 font-medium">渴望换学</th>
                <th className="py-3 px-4 font-medium text-center">AI 风险安全分</th>
                <th className="py-3 px-4 font-medium">状态</th>
                <th className="py-3 px-4 font-medium text-right">审核操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => {
                  const isRisky = card.aiSafetyScore < 60;
                  return (
                    <tr key={card.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={card.authorAvatar}
                            alt={card.authorName}
                            onError={(e) => handleImageError(e, getAvatarFallbackSvg(card.authorName))}
                            className="w-8 h-8 rounded-full object-cover border border-white/[0.1]"
                          />
                          <div>
                            <p className="font-medium text-zinc-200">{card.authorName}</p>
                            <p className="text-[11px] text-zinc-400 font-mono">{card.authorCity}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <p className="font-medium text-zinc-200 line-clamp-1">
                          {card.teachSkill.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {card.teachSkill.description}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-amber-400/90 font-medium">
                          {card.learnSkill.name}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border ${
                            isRisky
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}
                        >
                          {isRisky ? (
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                          ) : (
                            <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          )}
                          {card.aiSafetyScore} 分 {isRisky ? '(高危预警)' : '(合规)'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {card.status === 'pending_review' && (
                          <span className="text-amber-400 font-medium text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            待审核
                          </span>
                        )}
                        {card.status === 'active' && (
                          <span className="text-emerald-400 font-medium text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            正常展示
                          </span>
                        )}
                        {card.status === 'rejected' && (
                          <span className="text-rose-400 font-medium text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            已驳回下架
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {card.status === 'pending_review' ? (
                            <>
                              <button
                                onClick={() => handleApprove(card.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                批准上线
                              </button>
                              <button
                                onClick={() => handleOpenReject(card)}
                                className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                驳回
                              </button>
                            </>
                          ) : card.status === 'rejected' ? (
                            <button
                              onClick={() => handleApprove(card.id)}
                              className="px-2.5 py-1 rounded-lg text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 font-medium text-xs cursor-pointer"
                            >
                              恢复上架
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenReject(card)}
                              className="px-2.5 py-1 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 font-medium text-xs cursor-pointer"
                            >
                              违规下架
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-400 text-xs">
                    当前列表中暂无技能卡
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 驳回确认弹窗 */}
      {isRejectModalOpen && inspectingCard && ReactDOM.createPortal(
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm overflow-hidden animate-in fade-in"
          onClick={() => setIsRejectModalOpen(false)}
        >
          <div
            className="bg-[#14171F] rounded-2xl max-w-md w-full p-6 border border-rose-500/30 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold text-base text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              驳回该技能卡发布申请
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed">
              驳回后该技能卡不会在社区广场展示，驳回原因将通知给发布居民「{inspectingCard.authorName}」。
            </p>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">驳回原因说明</label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-3 bg-[#0B0C0E] rounded-xl border border-white/[0.1] text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-rose-500/60"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05] cursor-pointer transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm cursor-pointer transition-colors"
              >
                确认驳回
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
