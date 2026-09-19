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
    <div className="min-h-screen bg-[#0B0C0E] text-zinc-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* 科技深色背景微光装饰 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* 返回前台快捷按键 */}
      <button
        onClick={onBackToMain}
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-medium transition-colors px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] cursor-pointer"
      >
        <Home className="w-3.5 h-3.5" />
        <span>返回用户前台</span>
      </button>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] shadow-sm mb-4 text-zinc-200">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            SkillCraft Console
          </h1>
          <p className="text-xs text-zinc-400 mt-1.5 font-mono">
            平台管理控制台 · 仅授权人员访问
          </p>
        </div>

        {/* 登录卡片 */}
        <div className="bg-[#14171F] border border-white/[0.08] rounded-2xl p-7 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                管理员电子邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skillcraft.org"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0C0E] border border-white/[0.1] rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/[0.2] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                访问密钥 / 密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0C0E] border border-white/[0.1] rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-white/[0.2] transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>登入管理控制台</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* 快捷演示账号注入 */}
          <div className="pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3 font-medium">
              <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
              <span>快速切换测试身份：</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {INITIAL_ADMIN_USERS.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  onClick={() => handleQuickLogin(admin.email)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0C0E] hover:bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={admin.avatar}
                      alt={admin.displayName}
                      className="w-7 h-7 rounded-full object-cover border border-white/[0.1]"
                    />
                    <div>
                      <div className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors">
                        {admin.displayName}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono">{admin.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-400 border border-white/[0.08]">
                    {admin.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-zinc-500 font-mono mt-6 space-y-1">
          <div>SkillCraft Enterprise Architecture · Supabase Cloud RLS</div>
          <div>所有操作均由 Audit Trail 留痕监管</div>
        </div>
      </div>
    </div>
  );
};
