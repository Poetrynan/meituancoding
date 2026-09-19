import React, { useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Coins,
  AlertTriangle,
  ArrowRightLeft,
  Calendar,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SwapContract, ContractMilestone } from '../../types';
import { DisputeModal } from './DisputeModal';

export const SwapWorkbench: React.FC = () => {
  const { currentUser, contracts, completeMilestone } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed' | 'disputed'>('all');
  const [disputingContract, setDisputingContract] = useState<SwapContract | null>(null);
  const [studentNoteInput, setStudentNoteInput] = useState<{ [milestoneKey: string]: string }>({});
  const [expandedContractId, setExpandedContractId] = useState<string | null>(null);

  // 筛选属于当前用户的契约
  const userContracts = contracts.filter(
    (c) => c.teacherId === currentUser.id || c.studentId === currentUser.id
  );

  const filteredContracts = userContracts.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.status === activeFilter;
  });

  // 统计数据
  const activeCount = userContracts.filter((c) => c.status === 'active').length;
  const completedCount = userContracts.filter((c) => c.status === 'completed').length;
  const disputedCount = userContracts.filter((c) => c.status === 'disputed').length;
  const totalStaked = userContracts
    .filter((c) => c.status === 'active')
    .reduce((acc, c) => acc + c.stakedCredits, 0);

  const handleStudentCheckin = (contractId: string, step: number) => {
    const key = `${contractId}-${step}`;
    const note = studentNoteInput[key] || '准时完成课后练习打卡，很有收获！';
    completeMilestone(contractId, step, 'student', note);
  };

  const handleTeacherCheckin = (contractId: string, step: number) => {
    completeMilestone(contractId, step, 'teacher');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 顶部标题栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="stamp-badge text-[11px] font-bold text-craft-forest bg-craft-forest-light border-craft-forest">
              COLLABORATION WORKBENCH
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-handcraft text-craft-ink">
            互换协作看板与履约打卡
          </h1>
          <p className="text-xs text-craft-ink-light mt-1">
            按签署课纲分步打卡，时光币质押安全托管，完成即可自动解冻交付
          </p>
        </div>

        {/* 顶部统计卡片 */}
        <div className="flex items-center gap-3">
          <div className="bg-white p-3 rounded-2xl border border-craft-border shadow-sm text-center min-w-[90px]">
            <p className="text-[11px] text-craft-ink-muted">进行中契约</p>
            <p className="text-lg font-bold text-craft-terracotta">{activeCount}</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-craft-border shadow-sm text-center min-w-[90px]">
            <p className="text-[11px] text-craft-ink-muted">已结课交付</p>
            <p className="text-lg font-bold text-craft-forest">{completedCount}</p>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-craft-border shadow-sm text-center min-w-[90px]">
            <p className="text-[11px] text-craft-ink-muted">质押时光币</p>
            <p className="text-lg font-bold text-craft-amber">{totalStaked} 币</p>
          </div>
        </div>
      </div>

      {/* 状态筛选标签 */}
      <div className="flex items-center gap-2 border-b border-craft-border pb-3">
        {[
          { key: 'all', label: `全部契约 (${userContracts.length})` },
          { key: 'active', label: `履约进行中 (${activeCount})` },
          { key: 'completed', label: `已圆满结课 (${completedCount})` },
          { key: 'disputed', label: `仲裁申诉中 (${disputedCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeFilter === tab.key
                ? 'bg-craft-terracotta text-white shadow-sm'
                : 'bg-white text-craft-ink-light border border-craft-border hover:bg-craft-paper'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 契约卡片列表 */}
      {filteredContracts.length > 0 ? (
        <div className="space-y-6">
          {filteredContracts.map((contract) => {
            const isTeacher = contract.teacherId === currentUser.id;
            const completedMilestones = contract.milestones.filter(
              (m) => m.completedByTeacher && m.completedByStudent
            ).length;
            const totalMilestones = contract.milestones.length;
            const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

            const isDisputed = contract.status === 'disputed';
            const isCompleted = contract.status === 'completed';

            return (
              <div
                key={contract.id}
                className={`bg-white rounded-3xl border-2 transition-all duration-300 overflow-hidden shadow-craft ${
                  isDisputed
                    ? 'border-craft-terracotta/60'
                    : isCompleted
                    ? 'border-craft-forest/60'
                    : 'border-craft-border hover:border-craft-terracotta/40'
                }`}
              >
                {/* 契约头部 */}
                <div className="p-6 bg-craft-paper/60 border-b border-craft-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isDisputed
                            ? 'bg-red-50 text-red-600 border-red-200'
                            : isCompleted
                            ? 'bg-craft-forest-light text-craft-forest border-craft-forest/30'
                            : 'bg-craft-amber-light text-[#8C5D17] border-craft-amber/30'
                        }`}
                      >
                        {isDisputed
                          ? '⚖️ 纠纷仲裁中'
                          : isCompleted
                          ? '🎉 已圆满结课'
                          : '⏳ 履约进行中'}
                      </span>

                      <span className="text-xs text-craft-ink-muted">
                        签署日期：{contract.createdAt}
                      </span>

                      <span className="text-xs text-craft-ink-light bg-white px-2 py-0.5 rounded-md border border-craft-border">
                        {contract.swapType === 'direct_1v1'
                          ? '✨ 1v1 浪漫直换'
                          : `🪙 质押 ${contract.stakedCredits} 时光币`}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-handcraft text-craft-ink">
                      {contract.title}
                    </h3>
                  </div>

                  {/* 双方头像对比 */}
                  <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl border border-craft-border shadow-sm">
                    {/* 导师 */}
                    <div className="flex items-center gap-2">
                      <img
                        src={contract.teacherAvatar}
                        alt={contract.teacherName}
                        className="w-9 h-9 rounded-full object-cover border border-craft-border"
                      />
                      <div className="text-left">
                        <span className="text-[10px] text-craft-terracotta font-bold uppercase block">
                          导师
                        </span>
                        <span className="text-xs font-bold text-craft-ink">
                          {contract.teacherName}
                        </span>
                      </div>
                    </div>

                    <ArrowRightLeft className="w-3.5 h-3.5 text-craft-ink-muted" />

                    {/* 学员 */}
                    <div className="flex items-center gap-2">
                      <img
                        src={contract.studentAvatar}
                        alt={contract.studentName}
                        className="w-9 h-9 rounded-full object-cover border border-craft-border"
                      />
                      <div className="text-left">
                        <span className="text-[10px] text-craft-forest font-bold uppercase block">
                          学员
                        </span>
                        <span className="text-xs font-bold text-craft-ink">
                          {contract.studentName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 履约进度条 */}
                <div className="px-6 py-3 bg-craft-cream border-b border-craft-border flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-craft-ink">
                    <span>当前课纲进度：</span>
                    <span className="text-craft-terracotta">
                      {completedMilestones} / {totalMilestones} 阶段打卡完成
                    </span>
                  </div>

                  <div className="flex items-center gap-3 flex-1 max-w-xs">
                    <div className="w-full bg-craft-paper rounded-full h-2.5 overflow-hidden border border-craft-border">
                      <div
                        className="h-full bg-gradient-to-r from-craft-terracotta to-craft-amber transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-craft-ink-muted min-w-[35px]">
                      {progressPercent}%
                    </span>
                  </div>
                </div>

                {/* 纠纷提示栏（若处于 disputed） */}
                {isDisputed && (
                  <div className="p-4 bg-red-50 border-b border-red-200 text-xs text-red-700 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>
                        当前契约已提交纠纷仲裁申请，平台管理员正在调阅课纲大纲与打卡记录进行裁决中。
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-red-600 bg-white px-2 py-1 rounded border border-red-200">
                      待裁决
                    </span>
                  </div>
                )}

                {/* 阶段课纲打卡明细 */}
                <div className="p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-craft-ink-light">
                    【3阶段课纲履约清单】
                  </h4>

                  <div className="space-y-3">
                    {contract.milestones.map((milestone) => {
                      const bothDone =
                        milestone.completedByTeacher && milestone.completedByStudent;
                      const milestoneKey = `${contract.id}-${milestone.step}`;

                      return (
                        <div
                          key={milestone.step}
                          className={`p-4 rounded-2xl border transition-all ${
                            bothDone
                              ? 'bg-craft-forest-light/60 border-craft-forest/30'
                              : 'bg-craft-paper/80 border-craft-border'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                            <div className="flex items-start gap-3">
                              <span
                                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  bothDone
                                    ? 'bg-craft-forest text-white'
                                    : 'bg-craft-terracotta text-white'
                                }`}
                              >
                                {bothDone ? '✓' : milestone.step}
                              </span>

                              <div>
                                <h5 className="font-bold text-sm text-craft-ink">
                                  {milestone.title}
                                </h5>
                                <p className="text-xs text-craft-ink-light mt-0.5 leading-relaxed">
                                  {milestone.description}
                                </p>
                              </div>
                            </div>

                            <span className="text-[11px] font-semibold text-craft-ink-muted bg-white px-2.5 py-1 rounded-lg border border-craft-border self-start sm:self-auto flex-shrink-0">
                              约 {milestone.estimatedHours} 学时
                            </span>
                          </div>

                          {/* 交付成果说明 */}
                          <div className="bg-white/80 p-2.5 rounded-xl border border-craft-border/60 text-xs text-craft-ink-light flex items-center gap-2 mb-3">
                            <Award className="w-3.5 h-3.5 text-craft-amber flex-shrink-0" />
                            <span>
                              <strong>阶段交付物：</strong>
                              {milestone.deliverable}
                            </span>
                          </div>

                          {/* 双方打卡状态与操作栏 */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-craft-border/40">
                            <div className="flex items-center gap-4 text-xs">
                              {/* 导师打卡标记 */}
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`w-2.5 h-2.5 rounded-full ${
                                    milestone.completedByTeacher ? 'bg-craft-forest' : 'bg-gray-300'
                                  }`}
                                />
                                <span
                                  className={
                                    milestone.completedByTeacher
                                      ? 'text-craft-forest font-bold'
                                      : 'text-craft-ink-muted'
                                  }
                                >
                                  导师授课：{milestone.completedByTeacher ? '已确认' : '未打卡'}
                                </span>
                              </div>

                              {/* 学员打卡标记 */}
                              <div className="flex items-center gap-1.5">
                                <span
                                  className={`w-2.5 h-2.5 rounded-full ${
                                    milestone.completedByStudent ? 'bg-craft-forest' : 'bg-gray-300'
                                  }`}
                                />
                                <span
                                  className={
                                    milestone.completedByStudent
                                      ? 'text-craft-forest font-bold'
                                      : 'text-craft-ink-muted'
                                  }
                                >
                                  学员验收：{milestone.completedByStudent ? '已打卡' : '未打卡'}
                                </span>
                              </div>
                            </div>

                            {/* 互动打卡按钮（仅在未结课且非仲裁中可操作） */}
                            {!isCompleted && !isDisputed && (
                              <div className="flex items-center gap-2 self-end sm:self-auto">
                                {/* 导师确认打卡 */}
                                {isTeacher && !milestone.completedByTeacher && (
                                  <button
                                    onClick={() =>
                                      handleTeacherCheckin(contract.id, milestone.step)
                                    }
                                    className="px-3 py-1.5 rounded-xl bg-craft-terracotta text-white text-xs font-bold hover:bg-craft-terracotta-dark transition-colors shadow-sm"
                                  >
                                    我是导师：确认授课打卡
                                  </button>
                                )}

                                {/* 学员打卡（可附笔记） */}
                                {!isTeacher && !milestone.completedByStudent && (
                                  <div className="flex items-center gap-1.5">
                                    <input
                                      type="text"
                                      placeholder="选填：上课感悟笔记..."
                                      value={studentNoteInput[milestoneKey] || ''}
                                      onChange={(e) =>
                                        setStudentNoteInput({
                                          ...studentNoteInput,
                                          [milestoneKey]: e.target.value,
                                        })
                                      }
                                      className="px-2.5 py-1 bg-white rounded-lg border border-craft-border text-xs text-craft-ink w-40 focus:outline-none focus:border-craft-forest"
                                    />
                                    <button
                                      onClick={() =>
                                        handleStudentCheckin(contract.id, milestone.step)
                                      }
                                      className="px-3 py-1.5 rounded-xl bg-craft-forest text-white text-xs font-bold hover:bg-craft-forest-dark transition-colors shadow-sm"
                                    >
                                      我是学员：打卡验收
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* 学员已打卡留存的心得笔记展示 */}
                          {milestone.studentNotes && (
                            <div className="mt-2 text-xs text-craft-forest bg-white/70 p-2 rounded-lg border border-craft-forest/20 flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>学员学习手账："{milestone.studentNotes}"</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 底部功能条：申诉入口 */}
                {!isCompleted && !isDisputed && (
                  <div className="px-6 py-3 bg-craft-paper/40 border-t border-craft-border flex items-center justify-between text-xs">
                    <span className="text-craft-ink-muted">
                      如遇对方恶意旷课失联或教学严重不符课纲，可随时发起申诉
                    </span>
                    <button
                      onClick={() => setDisputingContract(contract)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      发起纠纷仲裁申请
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* 空状态 */
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-craft-border">
          <div className="w-14 h-14 rounded-2xl bg-craft-paper mx-auto flex items-center justify-center text-craft-ink-light mb-3">
            <Briefcase className="w-7 h-7 text-craft-terracotta" />
          </div>
          <h3 className="font-handcraft text-base font-bold text-craft-ink mb-1">
            当前没有该状态的互换契约
          </h3>
          <p className="text-xs text-craft-ink-light max-w-sm mx-auto mb-4">
            快去【技能集市】探索心仪的技艺，或发起您的第一次 1v1 互换吧！
          </p>
        </div>
      )}

      {/* 纠纷申诉弹窗 */}
      {disputingContract && (
        <DisputeModal
          contract={disputingContract}
          isOpen={!!disputingContract}
          onClose={() => setDisputingContract(null)}
        />
      )}
    </div>
  );
};
