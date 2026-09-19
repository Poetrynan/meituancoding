import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  MapPin,
  Briefcase,
  X,
  ArrowRight,
  Gift,
  KeyRound,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const UserAuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    users,
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 注册字段
  const [name, setName] = useState('');
  const [city, setCity] = useState('杭州');
  const [title, setTitle] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    register({
      name,
      email,
      city,
      title,
      password,
    });
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('••••••••');
    login(demoEmail);
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in"
      onClick={closeAuthModal}
    >
      <div
        className="bg-[#FDFBF7] rounded-3xl max-w-md w-full border border-stone-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题与关闭按键 */}
        <div className="p-6 pb-4 border-b border-stone-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#9E5A44] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 font-handcraft">
                {authMode === 'login' ? '欢迎回到巧遇·匠心' : '加入技能互换社区'}
              </h2>
              <p className="text-xs text-stone-500">
                {authMode === 'login' ? '登录您的居民账号，开始切磋换学' : '注册即赠 5 时光币，开启首次技能请教'}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab 切换 */}
        <div className="flex border-b border-stone-200/80 px-6 pt-3 gap-6 bg-stone-50/50">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              authMode === 'login'
                ? 'border-[#9E5A44] text-[#9E5A44]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            居民登录
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('register')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              authMode === 'register'
                ? 'border-[#9E5A44] text-[#9E5A44]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>新居民注册</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#9E5A44]/10 text-[#9E5A44] font-mono">
              赠5币
            </span>
          </button>
        </div>

        {/* 表单内容 */}
        <div className="p-6">
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  电子邮箱 / 居民账号
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="输入邮箱或居民姓名 (如 lin@skillcraft.org)"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  登录密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#9E5A44] hover:bg-[#854B38] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>登录社区</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* 快捷测试通道 */}
              <div className="pt-4 border-t border-stone-200/70 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                  <KeyRound className="w-3.5 h-3.5 text-[#9E5A44]" />
                  <span>测试居民一键快捷填入登入：</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {users.slice(0, 4).map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickFill(u.name)}
                      className="p-2 rounded-xl bg-white border border-stone-200 hover:border-[#9E5A44]/60 hover:bg-[#FAF2EE]/40 text-left flex items-center gap-2 transition-all cursor-pointer group"
                    >
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-6 h-6 rounded-full object-cover border border-stone-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-stone-800 group-hover:text-[#9E5A44] truncate">
                          {u.name}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate">{u.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  您的姓名 / 昵称
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="如：苏简"
                    className="w-full pl-10 pr-3.5 py-2 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  电子邮箱
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@example.com"
                    className="w-full pl-10 pr-3.5 py-2 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    所在城市
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="杭州"
                      className="w-full pl-10 pr-3.5 py-2 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    身份 / 技艺专长
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="如：木工爱好者"
                      className="w-full pl-10 pr-3.5 py-2 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  设置密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2 bg-white rounded-xl border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44]"
                  />
                </div>
              </div>

              {/* 新人礼包福利卡 */}
              <div className="p-3 bg-[#FEF7EC] border border-[#E9C380]/60 rounded-xl flex items-center gap-2.5">
                <Gift className="w-5 h-5 text-[#D99636] flex-shrink-0" />
                <div className="text-[11px] text-stone-700">
                  <span className="font-bold text-[#D99636]">新居民专属迎新福利：</span>
                  注册即入账 5 时光币，可立即用于向其他导师请教学习！
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#9E5A44] hover:bg-[#854B38] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <span>立即注册入驻</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
