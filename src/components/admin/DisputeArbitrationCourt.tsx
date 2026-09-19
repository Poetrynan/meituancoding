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
      <div className="p-4 bg-[#14171F] border border-white/[0.06] rounded-2xl flex items-start gap-3">
        <Gavel className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300">
          <p className="font-semibold text-white mb-0.5">
            社区仲裁中枢
          </p>
          <p className="text-zinc-400 leading-relaxed">
            当双方互换出现旷课、失联或履约违约时，调阅双方签署的 3 阶段课纲与打卡时间戳，支持一键退款或划转履约学时。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：工单列表 */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
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
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#14171F] border-amber-500/50 shadow-sm'
                      : 'bg-[#101216] border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-zinc-500">
                      CASE #{d.id.substring(d.id.length - 6)}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border ${
                        isPending
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {isPending ? '待裁判' : '已结案'}
                    </span>
                  </div>

                  <h4 className="font-medium text-xs text-zinc-200 line-clamp-1 mb-1">
                    {d.contractTitle}
                  </h4>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 mb-2">
                    事由：{d.reason}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/[0.04]">
                    <span>申诉方：{d.plaintiffName}</span>
                    <span className="font-mono">{d.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧：案件详情与法庭裁决台 */}
        {selectedCase ? (
          <div className="lg:col-span-2 bg-[#14171F] rounded-2xl p-6 border border-white/[0.06] space-y-6">
            {/* 案由与双方基本信息 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-1.5">
                  CASE ID: {selectedCase.id}
                </span>
                <h3 className="text-base font-semibold text-white">
                  {selectedCase.contractTitle}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-zinc-200">申诉人：{selectedCase.plaintiffName}</span>
                <span className="text-zinc-600 font-mono">VS</span>
                <span className="font-medium text-zinc-200">被申诉人：{selectedCase.defendantName}</span>
              </div>
            </div>

            {/* 申诉举证与陈述 */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                申诉人事实陈述与举证
              </h4>
              <div className="p-4 bg-[#0B0C0E] rounded-xl border border-white/[0.06] text-xs text-zinc-300 leading-relaxed whitespace-pre-line">
                <p className="font-medium text-rose-400 mb-1">申诉事由：{selectedCase.reason}</p>
                <p className="text-zinc-400">{selectedCase.evidenceText}</p>
              </div>
            </div>

            {/* 关联契约的 AI 课纲与打卡留存记录 */}
            {relatedContract && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    契约阶段课纲履约存证
                  </h4>
                  <span className="text-[11px] text-zinc-400 font-mono">
                    质押学时池：{relatedContract.stakedCredits} 学时币
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
                            ? 'bg-emerald-500/[0.06] border-emerald-500/20'
                            : 'bg-[#0B0C0E] border-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full text-[11px] font-mono font-medium flex items-center justify-center ${
                              isDone ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-white/[0.06] text-zinc-400 border border-white/[0.08]'
                            }`}
                          >
                            {m.step}
                          </span>
                          <span className="font-medium text-zinc-200">{m.title}</span>
                          <span className="text-zinc-400 text-[11px]">
                            ({m.deliverable})
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 text-[11px] font-mono">
                          <span className={m.completedByTeacher ? 'text-emerald-400' : 'text-zinc-500'}>
                            导师：{m.completedByTeacher ? '已授课' : '未打卡'}
                          </span>
                          <span className={m.completedByStudent ? 'text-emerald-400' : 'text-zinc-500'}>
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
              <div className="p-4 bg-[#0B0C0E] rounded-xl border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-semibold text-zinc-200 flex items-center gap-1.5">
                  <Gavel className="w-4 h-4 text-amber-400" />
                  仲裁裁定操作
                </h4>

                <div>
                  <label className="block text-[11px] font-medium text-zinc-400 mb-1.5">
                    裁决依据与处理评语
                  </label>
                  <textarea
                    rows={3}
                    value={verdictNotes}
                    onChange={(e) => setVerdictNotes(e.target.value)}
                    className="w-full p-3 bg-[#14171F] rounded-xl border border-white/[0.1] text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/40"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleArbitrate('refund_student')}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>导师违约：退回学员质押学时</span>
                  </button>

                  <button
                    onClick={() => handleArbitrate('release_teacher')}
                    className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>学员旷课：质押学时划转导师</span>
                  </button>
                </div>
              </div>
            ) : (
              /* 已结案结果展示 */
              <div className="p-4 bg-emerald-500/[0.08] border border-emerald-500/20 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    仲裁已结案（{selectedCase.resolvedAt}）
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-zinc-200">裁决意见：</strong>
                  {selectedCase.verdictNotes}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-2 bg-[#14171F] rounded-2xl p-12 text-center border border-white/[0.06]">
            <p className="text-xs text-zinc-400">请选择左侧争议工单进行仲裁</p>
          </div>
        )}
      </div>
    </div>
  );
};
