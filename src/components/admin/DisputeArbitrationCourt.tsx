import React, { useState } from 'react';
import {
  ShieldAlert,
  Gavel,
  CheckCircle2,
  AlertTriangle,
  ArrowRightLeft,
  FileText,
  Clock,
  UserX,
  Coins,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DisputeCase, SwapContract } from '../../types';

export const DisputeArbitrationCourt: React.FC = () => {
  const { disputes, contracts, arbitrateDispute } = useApp();

  const [selectedCaseId, setSelectedCaseId] = useState<string>(disputes[0]?.id || '');
  const [verdictNotes, setVerdictNotes] = useState('经调阅契约课纲与双方打卡记录，导师已在实体暗房如约完成第一阶段冲卷教学并消耗药耗，学员失联旷课事实成立。');

  const selectedCase = disputes.find((d) => d.id === selectedCaseId) || disputes[0];
  const relatedContract = contracts.find((c) => c.id === selectedCase?.contractId);

  const handleArbitrate = (verdict: 'refund_student' | 'release_teacher') => {
    if (!selectedCase) return;
    arbitrateDispute(selectedCase.id, verdict, verdictNotes);
  };

  return (
    <div className="space-y-6">
      {/* 顶部简述 */}
      <div className="p-4 bg-craft-terracotta-light/60 border border-craft-terracotta/30 rounded-2xl flex items-start gap-3">
        <Gavel className="w-5 h-5 text-craft-terracotta flex-shrink-0 mt-0.5" />
        <div className="text-xs text-craft-ink">
          <p className="font-bold text-craft-terracotta mb-0.5">
            巧遇·社区公证仲裁法庭 (Community Arbitration Hub)
          </p>
          <p className="opacity-90 leading-relaxed">
            当双方互换出现旷课、失联或教学违约时，管理员调阅双方在缔约时签署的《3阶段AI大纲》及协作看板打卡时间戳，拥有一键强制划转或退回质押时光币的裁判权。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：工单列表 */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-craft-ink-light">
            争议工单列表 ({disputes.length})
          </h3>

          <div className="space-y-2.5">
            {disputes.map((d) => {
              const isSelected = d.id === selectedCase?.id;
              const isPending = d.status === 'pending';

              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedCaseId(d.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-craft-terracotta shadow-md'
                      : 'bg-white/80 border-craft-border hover:border-craft-border-dark'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-craft-ink-muted">
                      CASE #{d.id.substring(d.id.length - 6)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isPending
                          ? 'bg-red-50 text-red-600 border-red-200 animate-pulse'
                          : 'bg-craft-forest-light text-craft-forest border-craft-forest/30'
                      }`}
                    >
                      {isPending ? '待裁判' : '已结案'}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs text-craft-ink line-clamp-1 mb-1">
                    {d.contractTitle}
                  </h4>

                  <p className="text-[11px] text-craft-ink-light line-clamp-2 mb-2">
                    理由：{d.reason}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-craft-ink-muted pt-2 border-t border-craft-border/60">
                    <span>申诉方：{d.plaintiffName}</span>
                    <span>{d.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧：案件详情与法庭裁决台 */}
        {selectedCase ? (
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-6">
            {/* 案由与双方基本信息 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-craft-border">
              <div>
                <span className="stamp-badge text-[11px] font-bold text-craft-terracotta bg-craft-terracotta-light border-craft-terracotta mb-1">
                  CASE ID: {selectedCase.id}
                </span>
                <h3 className="font-handcraft text-base font-bold text-craft-ink">
                  {selectedCase.contractTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-craft-ink">申诉人：{selectedCase.plaintiffName}</span>
                <span className="text-craft-ink-muted">VS</span>
                <span className="font-bold text-craft-ink">被申诉人：{selectedCase.defendantName}</span>
              </div>
            </div>

            {/* 申诉举证与陈述 */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-craft-ink-light flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-craft-terracotta" />
                申诉人事实陈述与举证
              </h4>
              <div className="p-4 bg-craft-paper rounded-2xl border border-craft-border text-xs text-craft-ink leading-relaxed whitespace-pre-line">
                <p className="font-bold text-red-600 mb-1">申诉事由：{selectedCase.reason}</p>
                <p>{selectedCase.evidenceText}</p>
              </div>
            </div>

            {/* 关联契约的 AI 课纲与打卡留存记录 */}
            {relatedContract && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-craft-ink-light flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-craft-forest" />
                    双方缔约签署的《3阶段AI课纲》履约留痕
                  </h4>
                  <span className="text-[11px] text-craft-ink-muted">
                    契约质押池金额：{relatedContract.stakedCredits} 时光币
                  </span>
                </div>

                <div className="space-y-2">
                  {relatedContract.milestones.map((m) => {
                    const isDone = m.completedByTeacher && m.completedByStudent;
                    return (
                      <div
                        key={m.step}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${
                          isDone
                            ? 'bg-craft-forest-light/60 border-craft-forest/30'
                            : 'bg-craft-paper/60 border-craft-border'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center ${
                              isDone ? 'bg-craft-forest text-white' : 'bg-gray-300 text-gray-700'
                            }`}
                          >
                            {m.step}
                          </span>
                          <span className="font-bold text-craft-ink">{m.title}</span>
                          <span className="text-craft-ink-muted text-[11px]">
                            ({m.deliverable})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px]">
                          <span className={m.completedByTeacher ? 'text-craft-forest font-semibold' : 'text-craft-ink-muted'}>
                            导师：{m.completedByTeacher ? '已授课' : '未打卡'}
                          </span>
                          <span className={m.completedByStudent ? 'text-craft-forest font-semibold' : 'text-craft-ink-muted'}>
                            学员：{m.completedByStudent ? '已验收' : '未打卡'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 裁决操作台 */}
            {selectedCase.status === 'pending' ? (
              <div className="p-4 bg-craft-cream rounded-2xl border-2 border-craft-terracotta/30 space-y-3">
                <h4 className="text-xs font-bold text-craft-ink flex items-center gap-1.5">
                  <Gavel className="w-4 h-4 text-craft-terracotta" />
                  管理员仲裁判定书
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-craft-ink-light mb-1">
                    裁决依据与判定评语说明
                  </label>
                  <textarea
                    rows={3}
                    value={verdictNotes}
                    onChange={(e) => setVerdictNotes(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleArbitrate('refund_student')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>判定导师违约：质押金全额退回学员</span>
                  </button>

                  <button
                    onClick={() => handleArbitrate('release_teacher')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-craft-terracotta text-white text-xs font-bold hover:bg-craft-terracotta-dark transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>判定学员旷课：质押金强制划转导师</span>
                  </button>
                </div>
              </div>
            ) : (
              /* 已结案结果展示 */
              <div className="p-4 bg-craft-forest-light/60 border border-craft-forest/30 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-craft-forest">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    该案已由管理员仲裁结案（{selectedCase.resolvedAt}）
                  </span>
                </div>
                <p className="text-xs text-craft-ink leading-relaxed">
                  <strong>判决意见书：</strong>
                  {selectedCase.verdictNotes}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-2 bg-white rounded-3xl p-12 text-center border border-craft-border">
            <p className="text-xs text-craft-ink-muted">请选择左侧争议工单进行仲裁</p>
          </div>
        )}
      </div>
    </div>
  );
};
