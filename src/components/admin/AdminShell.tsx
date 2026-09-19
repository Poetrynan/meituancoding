import React, { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardCheck,
  Scale,
  Coins,
  ScrollText,
  Shield,
  ExternalLink,
  LogOut,
  ChevronRight,
  Database,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
} from 'lucide-react';
import { useAdminData } from '../../lib/AdminDataContext';
import { AdminDashboard } from './AdminDashboard';
import { SkillAuditTable } from './SkillAuditTable';
import { DisputeArbitrationCourt } from './DisputeArbitrationCourt';
import { TokenomicsControl } from './TokenomicsControl';
import { AdminRole } from '../../types';

type AdminTab = 'dashboard' | 'audit' | 'disputes' | 'tokenomics' | 'logs';

interface AdminShellProps {
  onNavigateHome: () => void;
}

export const AdminShell: React.FC<AdminShellProps> = ({ onNavigateHome }) => {
  const {
    adminUser,
    adminLogout,
    setAdminRole,
    stats,
    auditLogs,
    toasts,
    removeAdminToast,
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: '治理看板',
      subtitle: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'audit' as AdminTab,
      label: '技能审核流',
      subtitle: 'Skill Audit',
      icon: ClipboardCheck,
      badge: stats.pendingAudits > 0 ? stats.pendingAudits : null,
      badgeColor: 'bg-amber-500 text-stone-950 font-bold',
    },
    {
      id: 'disputes' as AdminTab,
      label: '纠纷仲裁法庭',
      subtitle: 'Arbitration',
      icon: Scale,
      badge: stats.pendingDisputes > 0 ? stats.pendingDisputes : null,
      badgeColor: 'bg-rose-500 text-white font-bold',
    },
    {
      id: 'tokenomics' as AdminTab,
      label: '时光银行调控',
      subtitle: 'Tokenomics',
      icon: Coins,
      badge: stats.emergencyFrozen ? '熔断中' : null,
      badgeColor: 'bg-red-600 text-white font-bold text-[10px]',
    },
    {
      id: 'logs' as AdminTab,
      label: '操作审计留痕',
      subtitle: 'Audit Logs',
      icon: ScrollText,
      badge: auditLogs.length,
      badgeColor: 'bg-stone-700 text-stone-300',
    },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* 1. 顶部全局控制台顶栏 */}
      <header className="h-16 bg-stone-900 border-b border-stone-800 px-6 flex items-center justify-between flex-shrink-0 z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-white tracking-wide">
                  SkillCraft Console
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  B端控制台
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Supabase Cloud · 双表隔离 · 权限审计体系
              </p>
            </div>
          </div>
        </div>

        {/* 右侧用户与动作栏 */}
        <div className="flex items-center gap-4">
          {/* 云数据库连接状态胶囊 */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs">
            <Database className="w-3.5 h-3.5" />
            <span>Supabase Cloud: 就绪</span>
          </div>

          {/* 角色切换微调器 */}
          {adminUser && (
            <div className="flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-xl border border-stone-700/60 text-xs">
              <span className="text-stone-400 text-[11px]">当前权限:</span>
              <select
                value={adminUser.role}
                onChange={(e) => setAdminRole(e.target.value as AdminRole)}
                className="bg-transparent text-amber-400 font-semibold focus:outline-none cursor-pointer text-xs"
              >
                <option value="super_admin" className="bg-stone-900 text-stone-200">
                  超级管理员 (Super Admin)
                </option>
                <option value="auditor" className="bg-stone-900 text-stone-200">
                  内容审核官 (Auditor)
                </option>
                <option value="arbitrator" className="bg-stone-900 text-stone-200">
                  首席仲裁员 (Arbitrator)
                </option>
              </select>
            </div>
          )}

          {/* 管理员身份详情 */}
          {adminUser && (
            <div className="flex items-center gap-2.5 pl-2 border-l border-stone-800">
              <img
                src={adminUser.avatar}
                alt={adminUser.displayName}
                className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-stone-200">
                  {adminUser.displayName}
                </div>
                <div className="text-[10px] text-stone-400">{adminUser.department}</div>
              </div>
            </div>
          )}

          {/* 前往用户主站 */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-medium transition-colors border border-stone-700/60"
            title="查看普通用户前台"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>访问用户前台</span>
          </button>

          {/* 退出管理端 */}
          <button
            onClick={adminLogout}
            className="p-2 rounded-lg text-stone-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
            title="退出控制台"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. 主体工作区（双栏布局） */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧独立导航侧边栏 */}
        <aside className="w-64 bg-stone-900/95 border-r border-stone-800 flex flex-col justify-between p-4 flex-shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-semibold text-stone-500 uppercase tracking-wider">
              系统控制菜单
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-amber-600 text-stone-950 font-bold shadow-lg shadow-amber-900/30'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                    <div>
                      <div className="text-xs leading-none">{item.label}</div>
                      <div className={`text-[10px] mt-0.5 ${isActive ? 'text-stone-900/80' : 'text-stone-500'}`}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-stone-950 text-amber-400' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 侧边栏底部系统状态卡 */}
          <div className="bg-stone-950/80 rounded-xl p-3 border border-stone-800/80 space-y-2 text-xs">
            <div className="flex items-center justify-between text-stone-400 text-[11px]">
              <span>待审总计</span>
              <span className="text-amber-400 font-mono font-bold">
                {stats.pendingAudits + stats.pendingDisputes} 案
              </span>
            </div>
            <div className="flex items-center justify-between text-stone-400 text-[11px]">
              <span>在线技能卡</span>
              <span className="text-emerald-400 font-mono font-bold">{stats.activeSkills} 项</span>
            </div>
            <div className="pt-2 border-t border-stone-800 text-[10px] text-stone-400">
              隔离域: public.admin_users
            </div>
          </div>
        </aside>

        {/* 右侧业务工作流主屏 */}
        <main className="flex-1 overflow-y-auto bg-stone-950 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 顶层面包屑 */}
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span>SkillCraft Console</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-stone-200 font-semibold">
                {navItems.find((n) => n.id === activeTab)?.label}
              </span>
            </div>

            {/* 子页面切换 */}
            {activeTab === 'dashboard' && (
              <AdminDashboard hideTabs onBackToMain={onNavigateHome} />
            )}
            {activeTab === 'audit' && <SkillAuditTable />}
            {activeTab === 'disputes' && <DisputeArbitrationCourt />}
            {activeTab === 'tokenomics' && <TokenomicsControl />}
            {activeTab === 'logs' && (
              <div className="bg-stone-900 rounded-2xl border border-stone-800 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ScrollText className="w-5 h-5 text-amber-500" />
                      平台操作不可篡改审计日志 (Audit Trail)
                    </h3>
                    <p className="text-xs text-stone-400 mt-1">
                      所有管理员的审核、仲裁打款与全局风控调整均记录在案，满足金融级复式记账审计标准。
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-stone-800 text-stone-300 text-xs font-mono">
                    共 {auditLogs.length} 条流水
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400 bg-stone-950/50">
                        <th className="p-3">记录 ID</th>
                        <th className="p-3">操作人</th>
                        <th className="p-3">动作类型</th>
                        <th className="p-3">目标实体</th>
                        <th className="p-3">操作明细</th>
                        <th className="p-3">操作时间</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/60 font-mono">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-stone-800/40 text-stone-300">
                          <td className="p-3 text-stone-500 text-[11px]">{log.id}</td>
                          <td className="p-3 font-sans font-medium text-amber-300">
                            {log.adminName}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-200 text-[11px]">
                              {log.action}
                            </span>
                          </td>
                          <td className="p-3 uppercase text-stone-400">{log.targetType}</td>
                          <td className="p-3 font-sans text-stone-300 max-w-xs truncate">
                            {log.details}
                          </td>
                          <td className="p-3 text-stone-400 text-[11px]">{log.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 3. 后台独立 Toast 提示层 (z-[1200]) */}
      <div className="fixed bottom-5 right-5 z-[1200] flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border bg-stone-900 border-stone-700 text-stone-100 transition-all animate-slide-up"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white">{toast.title}</div>
              {toast.description && (
                <div className="text-[11px] text-stone-400 mt-0.5">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => removeAdminToast(toast.id)}
              className="text-stone-500 hover:text-stone-300 text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
