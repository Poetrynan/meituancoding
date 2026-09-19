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
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col font-sans">
      {/* 1. 顶部全局控制台顶栏 */}
      <header className="h-16 bg-white border-b border-zinc-200/80 px-6 flex items-center justify-between flex-shrink-0 z-20 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-sm">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-zinc-900 tracking-tight">
                SkillCraft Console
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 border border-zinc-200 font-semibold">
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* 右侧动作与身份 */}
        <div className="flex items-center gap-3">
          {/* 云数据库连接状态胶囊 */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Supabase Cloud</span>
          </div>

          {/* 角色切换微调器 */}
          {adminUser && (
            <div className="flex items-center gap-2 bg-zinc-100/80 px-2.5 py-1 rounded-lg border border-zinc-200 text-xs">
              <span className="text-zinc-500 text-[11px]">权限:</span>
              <select
                value={adminUser.role}
                onChange={(e) => setAdminRole(e.target.value as AdminRole)}
                className="bg-transparent text-zinc-800 font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="super_admin">超级管理员</option>
                <option value="auditor">内容审核官</option>
                <option value="arbitrator">仲裁法官</option>
              </select>
            </div>
          )}

          {/* 管理员身份详情 */}
          {adminUser && (
            <div className="flex items-center gap-2.5 pl-2 border-l border-zinc-200">
              <img
                src={adminUser.avatar}
                alt={adminUser.displayName}
                className="w-7 h-7 rounded-full object-cover border border-zinc-200"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-zinc-800">
                  {adminUser.displayName}
                </div>
                <div className="text-[10px] text-zinc-500">{adminUser.department}</div>
              </div>
            </div>
          )}

          {/* 前往用户主站 */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium transition-colors border border-zinc-200 cursor-pointer"
            title="查看用户前台"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>访问前台</span>
          </button>

          {/* 退出管理端 */}
          <button
            onClick={adminLogout}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="退出控制台"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. 主体工作区（双栏布局） */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧独立导航侧边栏 */}
        <aside className="w-56 bg-white border-r border-zinc-200/80 flex flex-col justify-between p-3 flex-shrink-0">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
              控制台导航
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white font-semibold shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                    <span className="text-xs">{item.label}</span>
                  </div>

                  {item.badge !== null && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-zinc-100 text-zinc-600 border border-zinc-200'
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
          <div className="bg-zinc-50 rounded-xl p-3 border border-zinc-200/80 space-y-2 text-xs">
            <div className="flex items-center justify-between text-zinc-600 text-[11px]">
              <span>待审事项</span>
              <span className="text-amber-600 font-mono font-bold">
                {stats.pendingAudits + stats.pendingDisputes}
              </span>
            </div>
            <div className="flex items-center justify-between text-zinc-600 text-[11px]">
              <span>在架技能</span>
              <span className="text-emerald-600 font-mono font-bold">{stats.activeSkills}</span>
            </div>
            <div className="pt-2 border-t border-zinc-200 text-[10px] font-mono text-zinc-400">
              隔离域: public.admin_users
            </div>
          </div>
        </aside>

        {/* 右侧业务工作流主屏 */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* 顶层面包屑 */}
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span>Console</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-900 font-semibold">
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
              <div className="bg-white rounded-2xl border border-zinc-200/80 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <ScrollText className="w-4 h-4 text-zinc-700" />
                      操作审计日志 (Audit Trail)
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      审核、仲裁及参数调整操作不可篡改留痕记录
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 text-xs font-mono border border-zinc-200">
                    {auditLogs.length} 条记录
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-600 bg-zinc-50">
                        <th className="p-3 font-semibold">记录 ID</th>
                        <th className="p-3 font-semibold">操作人</th>
                        <th className="p-3 font-semibold">动作类型</th>
                        <th className="p-3 font-semibold">目标实体</th>
                        <th className="p-3 font-semibold">操作明细</th>
                        <th className="p-3 font-semibold">操作时间</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-mono">
                      {auditLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-zinc-50/70 text-zinc-700">
                          <td className="p-3 text-zinc-400 text-[11px]">{log.id}</td>
                          <td className="p-3 font-sans font-medium text-zinc-900">
                            {log.adminName}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-[11px] border border-zinc-200">
                              {log.action}
                            </span>
                          </td>
                          <td className="p-3 uppercase text-zinc-500">{log.targetType}</td>
                          <td className="p-3 font-sans text-zinc-700 max-w-xs truncate">
                            {log.details}
                          </td>
                          <td className="p-3 text-zinc-500 text-[11px]">{log.timestamp}</td>
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
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border bg-white border-zinc-200 text-zinc-900 transition-all animate-slide-up"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />}
            {toast.type === 'error' && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-zinc-900">{toast.title}</div>
              {toast.description && (
                <div className="text-[11px] text-zinc-500 mt-0.5">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => removeAdminToast(toast.id)}
              className="text-zinc-400 hover:text-zinc-600 text-xs cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
