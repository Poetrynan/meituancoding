import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Home, KeyRound } from 'lucide-react';
import { useAdminData, INITIAL_ADMIN_USERS } from '../../lib/AdminDataContext';

interface AdminLoginProps {
  onBackToMain: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToMain }) => {
  const { adminLogin } = useAdminData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    adminLogin(email, password);
  };

  const handleQuickLogin = (quickEmail: string) => {
    setEmail(quickEmail);
    adminLogin(quickEmail);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* 科技深色背景微光装饰 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-stone-800/50 rounded-full blur-2xl pointer-events-none" />

      {/* 返回前台快捷按键 */}
      <button
        onClick={onBackToMain}
        className="absolute top-6 left-6 flex items-center gap-2 text-stone-400 hover:text-stone-200 text-sm font-medium transition-colors px-3 py-2 rounded-lg bg-stone-800/80 border border-stone-700/60"
      >
        <Home className="w-4 h-4" />
        返回用户前台
      </button>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-stone-800 border border-amber-500/30 shadow-2xl shadow-amber-900/20 mb-4">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">
            SkillCraft 控制台管理中心
          </h1>
          <p className="text-xs text-stone-400 mt-2">
            平台物理隔离管理端 · 仅授权运营、内容合规与仲裁人员访问
          </p>
        </div>

        {/* 登录卡片 */}
        <div className="bg-stone-800/90 backdrop-blur-xl border border-stone-700/70 rounded-2xl p-7 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                管理员电子邮箱 (Work Email)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skillcraft.org"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-900/80 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-300 mb-1.5">
                管理访问密钥 (Access Key / Password)
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-900/80 border border-stone-700 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-stone-950 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 mt-2"
            >
              <span>验证并登入管理控制台</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 快捷演示账号注入 */}
          <div className="pt-4 border-t border-stone-700/60">
            <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-3 font-medium">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>测试人员快捷登录通道：</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {INITIAL_ADMIN_USERS.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  onClick={() => handleQuickLogin(admin.email)}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-stone-900/50 hover:bg-stone-900 border border-stone-700/40 hover:border-amber-500/40 transition-all text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={admin.avatar}
                      alt={admin.displayName}
                      className="w-7 h-7 rounded-full object-cover border border-stone-600"
                    />
                    <div>
                      <div className="text-xs font-semibold text-stone-200 group-hover:text-amber-400 transition-colors">
                        {admin.displayName}
                      </div>
                      <div className="text-[11px] text-stone-400">{admin.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                    {admin.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-stone-400 mt-6 space-y-1">
          <div>SkillCraft Enterprise Architecture · Supabase RLS Protected</div>
          <div>所有管理端操作均受系统审计日志（Audit Log）留痕监管</div>
        </div>
      </div>
    </div>
  );
};
