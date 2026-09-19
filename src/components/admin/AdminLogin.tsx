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
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* 科技淡色背景微光装饰 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* 返回前台快捷按键 */}
      <button
        onClick={onBackToMain}
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-600 hover:text-zinc-900 text-xs font-semibold transition-colors px-3.5 py-2 rounded-xl bg-white border border-zinc-200/80 shadow-sm cursor-pointer"
      >
        <Home className="w-3.5 h-3.5 text-zinc-500" />
        <span>返回用户前台</span>
      </button>

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-900 text-white shadow-md mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900">
            SkillCraft Console
          </h1>
          <p className="text-xs text-zinc-500 mt-1.5 font-mono">
            平台管理控制台 · 仅授权人员访问
          </p>
        </div>

        {/* 登录卡片 */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-7 shadow-xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                管理员电子邮箱
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skillcraft.org"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-all font-mono shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                访问密钥 / 密码
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 transition-all font-mono shadow-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>登入管理控制台</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* 快捷演示账号注入 */}
          <div className="pt-4 border-t border-zinc-100">
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3 font-medium">
              <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
              <span>快速切换测试身份：</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {INITIAL_ADMIN_USERS.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  onClick={() => handleQuickLogin(admin.email)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/80 transition-all text-left cursor-pointer group shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={admin.avatar}
                      alt={admin.displayName}
                      className="w-7 h-7 rounded-full object-cover border border-zinc-200 shadow-xs"
                    />
                    <div>
                      <div className="text-xs font-semibold text-zinc-800 group-hover:text-zinc-900 transition-colors">
                        {admin.displayName}
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">{admin.email}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white text-zinc-600 border border-zinc-200 font-semibold shadow-2xs">
                    {admin.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-[11px] text-zinc-400 font-mono mt-6 space-y-1">
          <div>SkillCraft Enterprise Architecture · Supabase Cloud RLS</div>
          <div>所有操作均由 Audit Trail 留痕监管</div>
        </div>
      </div>
    </div>
  );
};
