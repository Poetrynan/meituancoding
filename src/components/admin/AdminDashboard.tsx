import React, { useState } from 'react';
import {
  BarChart3,
  ShieldCheck,
  Gavel,
  Coins,
  Users,
  Briefcase,
  AlertCircle,
  Sparkles,
  ArrowRightLeft,
  CheckCircle2,
  PieChart,
  Music,
  Code2,
  Coffee,
  Camera,
  Hammer,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillAuditTable } from './SkillAuditTable';
import { DisputeArbitrationCourt } from './DisputeArbitrationCourt';
import { TokenomicsControl } from './TokenomicsControl';

interface AdminDashboardProps {
  onBackToMain?: () => void;
  hideTabs?: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToMain, hideTabs }) => {
  const { users, skillCards, contracts, disputes, setCurrentRole } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'audit' | 'court' | 'tokenomics'>('analytics');

  const pendingAuditCount = skillCards.filter((s) => s.status === 'pending_review').length;
  const pendingCourtCount = disputes.filter((d) => d.status === 'pending').length;
  const activeContractsCount = contracts.filter((c) => c.status === 'active').length;

  const handleReturn = () => {
    if (onBackToMain) {
      onBackToMain();
    } else {
      setCurrentRole('user');
    }
  };

  return (
    <div className="space-y-6">
      {/* 顶部标题栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200/80">
        <div>
          <h1 className="text-xl font-bold text-zinc-900 tracking-tight">
            平台治理概览
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            实时监测技能发布合规、契约履约进展与社区学时流动性
          </p>
        </div>

        <button
          onClick={handleReturn}
          className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold border border-zinc-200 shadow-sm transition-colors self-start sm:self-auto cursor-pointer"
        >
          返回前台视角 →
        </button>
      </div>

      {/* 管理后台四大功能 Tab 导航 (在 AdminShell 外部独立使用时展示) */}
      {!hideTabs && (
        <div className="flex items-center gap-1.5 border-b border-zinc-200/80 pb-3 overflow-x-auto">
          {[
            { id: 'analytics', label: '运营大盘', icon: BarChart3, badge: null },
            { id: 'audit', label: '技能审核', icon: ShieldCheck, badge: pendingAuditCount },
            { id: 'court', label: '纠纷仲裁', icon: Gavel, badge: pendingCourtCount },
            { id: 'tokenomics', label: '经济调控', icon: Coins, badge: null },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && tab.badge > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-100 text-rose-700 border border-rose-200">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Tab 1: 平台运营大盘 */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          {/* 四项核心数据 KPI 卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 font-medium">注册用户</span>
                <Users className="w-4 h-4 text-zinc-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-zinc-900 tracking-tight">{users.length}</p>
              <p className="text-[11px] text-emerald-600 mt-1 font-mono">+2 今日新增</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 font-medium">在架技能卡</span>
                <Sparkles className="w-4 h-4 text-zinc-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-zinc-900 tracking-tight">
                {skillCards.length}
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">涵盖 6 大门类</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 font-medium">进行中契约</span>
                <Briefcase className="w-4 h-4 text-zinc-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-zinc-900 tracking-tight">
                {activeContractsCount}
              </p>
              <p className="text-[11px] text-zinc-500 mt-1">履约完成率 94.2%</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-500 font-medium">违约争议率</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold font-mono text-emerald-600 tracking-tight">0.6%</p>
              <p className="text-[11px] text-emerald-600/80 mt-1">履约状态健康</p>
            </div>
          </div>

          {/* 匹配模式与门类分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 互换模式占比 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-zinc-500" />
                  互换模式分布
                </h3>
                <span className="text-xs text-zinc-400 font-mono">总览</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1.5">
                    <span>时光存折流转</span>
                    <span className="text-zinc-900 font-mono font-bold">58%</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: '58%' }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    授课赚取学时币，向其他导师请教学习
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-zinc-700 mb-1.5">
                    <span>1对1 双向直换</span>
                    <span className="text-zinc-900 font-mono font-bold">42%</span>
                  </div>
                  <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#9E5A44] h-full rounded-full"
                      style={{ width: '42%' }}
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    双方技能需求吻合，免时光币直接切磋
                  </p>
                </div>
              </div>
            </div>

            {/* 热门技能门类热度 */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200/80 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-zinc-500" />
                热门技能分布
              </h3>

              <div className="space-y-3">
                {[
                  { name: '音乐乐器 (民谣吉他/尤克里里)', pct: 28, color: 'bg-[#9E5A44]', icon: Music },
                  { name: '数字编程 (Python/自动化)', pct: 24, color: 'bg-emerald-600', icon: Code2 },
                  { name: '咖啡生活 (手冲萃取/拉花)', pct: 20, color: 'bg-amber-600', icon: Coffee },
                  { name: '胶片摄影 (暗房显影/构图)', pct: 16, color: 'bg-zinc-600', icon: Camera },
                  { name: '生活手作 (木工/插画/陶艺)', pct: 12, color: 'bg-blue-600', icon: Hammer },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between text-zinc-700 font-medium mb-1">
                        <span className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                          <span>{item.name}</span>
                        </span>
                        <span className="font-mono text-zinc-500 font-bold">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`${item.color} h-full rounded-full`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 技能合规审核中枢 */}
      {activeAdminTab === 'audit' && <SkillAuditTable />}

      {/* Tab 3: 互换纠纷仲裁法庭 */}
      {activeAdminTab === 'court' && <DisputeArbitrationCourt />}

      {/* Tab 4: 时间银行经济调控 */}
      {activeAdminTab === 'tokenomics' && <TokenomicsControl />}
    </div>
  );
};
