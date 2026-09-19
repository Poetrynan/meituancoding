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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 管理员顶部警示横幅与退出按钮 */}
      <div className="bg-gradient-to-r from-craft-terracotta to-craft-ink text-white rounded-3xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-handcraft">
                巧遇·社区治理与风控管理中枢
              </h1>
              <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-xs text-white/80 mt-0.5">
              监控双轨匹配流动性、审核敏感词技能卡、调解履约争议与宏观经济调控
            </p>
          </div>
        </div>

        <button
          onClick={handleReturn}
          className="px-4 py-2 rounded-xl bg-white text-craft-ink text-xs font-bold hover:bg-white/90 shadow-sm transition-all self-start sm:self-auto"
        >
          返回前台社区视角 →
        </button>
      </div>

      {/* 管理后台四大功能 Tab 导航 (在 AdminShell 中由左侧侧边栏接管) */}
      {!hideTabs && (
        <div className="flex items-center gap-2 border-b border-craft-border pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeAdminTab === 'analytics'
              ? 'bg-craft-terracotta text-white shadow-sm'
              : 'bg-white text-craft-ink-light border border-craft-border hover:bg-craft-paper'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          平台运营宏观大盘
        </button>

        <button
          onClick={() => setActiveAdminTab('audit')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative ${
            activeAdminTab === 'audit'
              ? 'bg-craft-terracotta text-white shadow-sm'
              : 'bg-white text-craft-ink-light border border-craft-border hover:bg-craft-paper'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          技能合规审核中枢
          {pendingAuditCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingAuditCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('court')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap relative ${
            activeAdminTab === 'court'
              ? 'bg-craft-terracotta text-white shadow-sm'
              : 'bg-white text-craft-ink-light border border-craft-border hover:bg-craft-paper'
          }`}
        >
          <Gavel className="w-4 h-4" />
          互换纠纷仲裁法庭
          {pendingCourtCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
              {pendingCourtCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('tokenomics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeAdminTab === 'tokenomics'
              ? 'bg-craft-terracotta text-white shadow-sm'
              : 'bg-white text-craft-ink-light border border-craft-border hover:bg-craft-paper'
          }`}
        >
          <Coins className="w-4 h-4" />
          时间银行经济调控
        </button>
      </div>
      )}

      {/* Tab 1: 平台运营宏观大盘 */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          {/* 四项 KPI 统计卡 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-craft-border shadow-craft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-craft-ink-muted">社区注册居民</span>
                <Users className="w-4 h-4 text-craft-terracotta" />
              </div>
              <p className="text-3xl font-bold font-handcraft text-craft-ink">{users.length}</p>
              <p className="text-[11px] text-craft-forest mt-1">● 今日新增 +2 位匠心居民</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-craft-border shadow-craft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-craft-ink-muted">在架技能卡总数</span>
                <Sparkles className="w-4 h-4 text-craft-amber" />
              </div>
              <p className="text-3xl font-bold font-handcraft text-craft-ink">
                {skillCards.length}
              </p>
              <p className="text-[11px] text-craft-forest mt-1">● 涵盖 6 大手作与生活品类</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-craft-border shadow-craft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-craft-ink-muted">当前履约协作契约</span>
                <Briefcase className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-3xl font-bold font-handcraft text-blue-600">
                {activeContractsCount}
              </p>
              <p className="text-[11px] text-craft-ink-light mt-1">● 契约课纲完成率 94.2%</p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-craft-border shadow-craft">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-craft-ink-muted">全网违约翻车率 (Flake Rate)</span>
                <CheckCircle2 className="w-4 h-4 text-craft-forest" />
              </div>
              <p className="text-3xl font-bold font-handcraft text-craft-forest">0.6%</p>
              <p className="text-[11px] text-craft-forest mt-1">● 远优于闲鱼/社交群（~35%）</p>
            </div>
          </div>

          {/* 双轨匹配效率与门类分析 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 双轨互换模式占比 */}
            <div className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-handcraft text-base font-bold text-craft-ink flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-craft-terracotta" />
                  双轨互换模式流动性占比
                </h3>
                <span className="text-xs text-craft-forest font-bold">健康双循环</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-craft-ink mb-1">
                    <span>时光银行网状流转 (Time Bank Mesh)</span>
                    <span className="text-craft-forest font-bold">58%</span>
                  </div>
                  <div className="w-full bg-craft-paper rounded-full h-3 overflow-hidden border border-craft-border">
                    <div
                      className="bg-craft-forest h-full rounded-full"
                      style={{ width: '58%' }}
                    />
                  </div>
                  <p className="text-[11px] text-craft-ink-muted mt-1">
                    教A赚币，用币向B求学，有效打破传统“双重巧合困境”
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-craft-ink mb-1">
                    <span>天作之合 1v1 直连浪漫切磋 (Direct Match)</span>
                    <span className="text-craft-amber font-bold">42%</span>
                  </div>
                  <div className="w-full bg-craft-paper rounded-full h-3 overflow-hidden border border-craft-border">
                    <div
                      className="bg-craft-amber h-full rounded-full"
                      style={{ width: '42%' }}
                    />
                  </div>
                  <p className="text-[11px] text-craft-ink-muted mt-1">
                    双方教与学完美互补，零时光币门槛直接对调
                  </p>
                </div>
              </div>
            </div>

            {/* 热门技能门类热度 */}
            <div className="bg-white rounded-3xl p-6 border border-craft-border shadow-craft space-y-4">
              <h3 className="font-handcraft text-base font-bold text-craft-ink flex items-center gap-2">
                <PieChart className="w-4 h-4 text-craft-amber" />
                热门技能门类分布与流转密度
              </h3>

              <div className="space-y-2.5">
                {[
                  { name: '音乐乐器 (民谣吉他/尤克里里)', pct: 28, color: 'bg-[#9E5A44]', icon: Music },
                  { name: '数字编程 (Python自动化/爬虫)', pct: 24, color: 'bg-[#3B5B43]', icon: Code2 },
                  { name: '咖啡烘焙 (手冲萃取/拉花)', pct: 20, color: 'bg-[#D99636]', icon: Coffee },
                  { name: '胶片摄影 (暗房显影/构图)', pct: 16, color: 'bg-[#7F4330]', icon: Camera },
                  { name: '生活手作与外语 (木作/插画/法语)', pct: 12, color: 'bg-[#554F47]', icon: Hammer },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between text-craft-ink font-semibold mb-1">
                        <span className="flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-stone-600 flex-shrink-0" />
                          <span>{item.name}</span>
                        </span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="w-full bg-craft-paper rounded-full h-2 overflow-hidden border border-craft-border">
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
