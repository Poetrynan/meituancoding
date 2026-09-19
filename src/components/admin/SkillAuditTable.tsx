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
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {[
            { key: 'pending_review', label: `待合规审核 (${pendingCount})` },
            { key: 'all', label: `全部技能卡 (${skillCards.length})` },
            { key: 'active', label: '已上架' },
            { key: 'rejected', label: '已驳回' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === tab.key
                  ? 'bg-craft-terracotta text-white shadow-sm'
                  : 'bg-white text-craft-ink-light border border-craft-border hover:bg-craft-paper'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-craft-ink-muted">
          AI 敏感词初筛已介入，红色预警卡片请重点审核
        </p>
      </div>

      {/* 审核卡片表格 */}
      <div className="bg-white rounded-3xl border border-craft-border shadow-craft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-craft-border text-craft-ink-muted bg-craft-paper/80">
                <th className="py-3 px-4 font-bold">发布者与地点</th>
                <th className="py-3 px-4 font-bold">教授技能名称</th>
                <th className="py-3 px-4 font-bold">渴望换学</th>
                <th className="py-3 px-4 font-bold text-center">AI 风险安全分</th>
                <th className="py-3 px-4 font-bold">状态</th>
                <th className="py-3 px-4 font-bold text-right">审核操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-craft-border/60">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => {
                  const isRisky = card.aiSafetyScore < 60;
                  return (
                    <tr key={card.id} className="hover:bg-craft-paper/30 transition-colors">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={card.authorAvatar}
                            alt={card.authorName}
                            onError={(e) => handleImageError(e, getAvatarFallbackSvg(card.authorName))}
                            className="w-8 h-8 rounded-full object-cover border border-craft-border"
                          />
                          <div>
                            <p className="font-bold text-craft-ink">{card.authorName}</p>
                            <p className="text-[11px] text-craft-ink-muted">{card.authorCity}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <p className="font-bold text-craft-ink line-clamp-1">
                          {card.teachSkill.name}
                        </p>
                        <p className="text-[11px] text-craft-ink-light line-clamp-1 mt-0.5">
                          {card.teachSkill.description}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-craft-terracotta font-semibold">
                          {card.learnSkill.name}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                            isRisky
                              ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                              : 'bg-craft-forest-light text-craft-forest border-craft-forest/30'
                          }`}
                        >
                          {isRisky ? (
                            <AlertTriangle className="w-3 h-3" />
                          ) : (
                            <ShieldCheck className="w-3 h-3" />
                          )}
                          {card.aiSafetyScore} 分 ({isRisky ? '高危预警' : '安全合规'})
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {card.status === 'pending_review' && (
                          <span className="text-craft-amber font-bold text-[11px] bg-craft-amber-light px-2 py-0.5 rounded-md border border-craft-amber/30">
                            待审核
                          </span>
                        )}
                        {card.status === 'active' && (
                          <span className="text-craft-forest font-bold text-[11px] bg-craft-forest-light px-2 py-0.5 rounded-md border border-craft-forest/30">
                            正常展示
                          </span>
                        )}
                        {card.status === 'rejected' && (
                          <span className="text-red-600 font-bold text-[11px] bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
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
                                className="px-3 py-1.5 rounded-xl bg-craft-forest text-white font-bold text-xs hover:bg-craft-forest-dark transition-colors shadow-sm flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                批准上线
                              </button>
                              <button
                                onClick={() => handleOpenReject(card)}
                                className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors shadow-sm flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                驳回
                              </button>
                            </>
                          ) : card.status === 'rejected' ? (
                            <button
                              onClick={() => handleApprove(card.id)}
                              className="px-2.5 py-1 rounded-lg text-craft-forest hover:bg-craft-forest-light border border-craft-forest/30 font-semibold text-xs"
                            >
                              恢复上架
                            </button>
                          ) : (
                            <button
                              onClick={() => handleOpenReject(card)}
                              className="px-2.5 py-1 rounded-lg text-red-600 hover:bg-red-50 border border-red-200 font-semibold text-xs"
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
                  <td colSpan={6} className="py-8 text-center text-craft-ink-muted">
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
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-hidden animate-in fade-in"
          onClick={() => setIsRejectModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 border-2 border-red-200 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-base text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              驳回该技能卡发布申请
            </h3>

            <p className="text-xs text-craft-ink-light leading-relaxed">
              驳回后该技能卡不会在社区广场展示，原因将通知给发布居民「{inspectingCard.authorName}
              」。
            </p>

            <div>
              <label className="block text-xs font-bold text-craft-ink mb-1">驳回原因说明</label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2.5 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-craft-ink-light hover:bg-black/5 cursor-pointer"
              >
                取消
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm cursor-pointer"
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
