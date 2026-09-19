import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  MapPin,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Gift,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Coins,
  Clock,
  HeartHandshake,
  Globe,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';

interface UserLoginPageProps {
  onNavigateHome: () => void;
  onNavigateLanding?: () => void;
}

export const UserLoginPage: React.FC<UserLoginPageProps> = ({
  onNavigateHome,
  onNavigateLanding,
}) => {
  const { login, register, users } = useApp();

  // 检查 URL 中是否带 mode=register 参数
  const getInitialMode = (): 'login' | 'register' => {
    const search = window.location.search || window.location.hash;
    return search.includes('register') ? 'register' : 'login';
  };

  const [mode, setMode] = useState<'login' | 'register'>(getInitialMode);

  // 登录表单
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // 注册表单
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCity, setRegCity] = useState('杭州');
  const [regTitle, setRegTitle] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // 监听 URL hash 变动切换 tab
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash.includes('register') || window.location.search.includes('register')) {
        setMode('register');
      } else if (
        window.location.hash.includes('login') ||
        window.location.hash.includes('logging') ||
        window.location.pathname.includes('logging') ||
        window.location.pathname.includes('login')
      ) {
        setMode('login');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    const ok = login(loginEmail, loginPassword);
    if (ok) {
      onNavigateHome();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) return;
    const ok = register({
      name: regName,
      email: regEmail,
      city: regCity,
      title: regTitle,
      password: regPassword,
    });
    if (ok) {
      onNavigateHome();
    }
  };

  const handleQuickFill = (name: string) => {
    setLoginEmail(name);
    setLoginPassword('••••••••');
    const ok = login(name);
    if (ok) {
      onNavigateHome();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 flex flex-col justify-between font-sans relative overflow-x-hidden [scrollbar-gutter:stable]">
      {/* 柔和环境光渐变 */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#9E5A44]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#E9C380]/15 rounded-full blur-3xl pointer-events-none" />

      {/* 顶部全局导航栏 */}
      <header className="px-6 py-4 border-b border-stone-200/80 bg-[#FDFBF7]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
        <div
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <BrandLogo size={36} className="rounded-xl shadow-xs group-hover:scale-105 transition-transform flex-shrink-0" />
          <div>
            <span className="font-handcraft text-lg font-bold text-stone-900 tracking-wide">
              巧遇 · 匠心
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-bold text-[#9E5A44] bg-[#9E5A44]/10 border border-[#9E5A44]/20 px-2 py-0.5 rounded-full">
              SkillCraft
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (onNavigateLanding) {
                onNavigateLanding();
              } else {
                window.location.hash = '#/landing';
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#9E5A44] hover:text-[#854B38] bg-[#9E5A44]/10 hover:bg-[#9E5A44]/15 border border-[#9E5A44]/25 shadow-2xs transition-all cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>查看产品官网</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>返回集市首页</span>
          </button>
        </div>
      </header>

      {/* 主体双列内容区域：严格定轴与顶部对齐，彻底消除 Tab 切换时的上下偏移 */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-start">
          {/* 左侧：品牌愿景与机制价值 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E5A44]/10 border border-[#9E5A44]/20 text-[#9E5A44] text-xs font-bold font-handcraft">
              <Sparkles className="w-3.5 h-3.5" />
              <span>以技换技 · 各取所长</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-handcraft text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
                每一门精湛技艺，
                <br />
                <span className="text-[#9E5A44]">都在等待一场同频相逢</span>
              </h1>
              <p className="text-sm text-stone-600 leading-relaxed">
                在「巧遇·匠心」，时光是最平等的等价物。无需昂贵商业学费，用你精研的摄影暗房冲卷、古法木作或烘焙拉花，直接交换他人的编程、咖啡冲煮或原声吉他。
              </p>
            </div>

            {/* 4 大核心机制保障 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <Coins className="w-4 h-4 text-[#D99636]" />
                  <span>时光存折结算</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">
                  学时即通货，以技传人存入，请教学艺支取，零金钱铜臭。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <Clock className="w-4 h-4 text-[#9E5A44]" />
                  <span>3 阶段契约课纲</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">
                  智能拟定可交付进度，导师学员打卡双向存证，步步交付。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/80 border border-stone-200/80 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>法庭中枢仲裁</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-normal">
                  失联违约或旷课时调阅存证，支持一键退款或学时划转。
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FEF7EC] border border-[#E9C380]/60 shadow-xs space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                  <Gift className="w-4 h-4 text-[#D99636]" />
                  <span>新人入驻福利</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-normal">
                  注册即入账 5 时光币，无门槛发起首次技艺切磋。
                </p>
              </div>
            </div>

            {/* 社区公约格言 */}
            <div className="flex items-center gap-3 p-3 bg-stone-100/70 rounded-xl border border-stone-200/60 text-xs text-stone-600">
              <HeartHandshake className="w-4 h-4 text-stone-500 flex-shrink-0" />
              <span>「不搞营销套路，只敬认真手艺」· 真实同城邻里社区</span>
            </div>
          </div>

          {/* 右侧：登录 / 注册操作卡片 (设定最小高度与自身定顶，杜绝切换时的垂直跳动) */}
          <div className="lg:col-span-6 flex justify-center self-start">
            <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden min-h-[585px] flex flex-col">
              {/* Tab 切换头部 (等高固定内边距与边框，杜绝 1px 抖动) */}
              <div className="flex border-b border-stone-200 bg-stone-50/50 p-2 gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer text-center border ${
                    mode === 'login'
                      ? 'bg-white text-stone-900 shadow-sm border-stone-200/80'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  居民账号登录
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                    mode === 'register'
                      ? 'bg-white text-stone-900 shadow-sm border-stone-200/80'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  <span>新居民注册</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#9E5A44]/10 text-[#9E5A44] font-mono font-bold">
                    赠5币
                  </span>
                </button>
              </div>

              {/* 表单主体 */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                {mode === 'login' ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        居民账号 / 电子邮箱
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="输入您的居民姓名或邮箱"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] focus:bg-white transition-all shadow-2xs"
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
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] focus:bg-white transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#9E5A44] hover:bg-[#854B38] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <span>进入巧遇社区</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* 快捷测试居民选择 */}
                    <div className="pt-4 border-t border-stone-200/80 space-y-2.5">
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-[#9E5A44]" />
                          快捷体验测试身份（免输一键登入）：
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {users.slice(0, 4).map((u) => (
                          <button
                            key={u.id}
                            type="button"
                            onClick={() => handleQuickFill(u.name)}
                            className="p-2.5 rounded-xl bg-stone-50/70 border border-stone-200 hover:border-[#9E5A44]/60 hover:bg-[#FAF2EE]/50 text-left flex items-center gap-2.5 transition-all cursor-pointer group shadow-2xs"
                          >
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-7 h-7 rounded-full object-cover border border-stone-200 shadow-2xs flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-stone-800 group-hover:text-[#9E5A44] truncate">
                                {u.name}
                              </div>
                              <div className="text-[10px] text-stone-400 truncate font-mono">
                                {u.title}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 查看官网入口 */}
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateLanding) {
                            onNavigateLanding();
                          } else {
                            window.location.hash = '#/landing';
                          }
                        }}
                        className="text-xs text-stone-500 hover:text-[#9E5A44] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#9E5A44]" />
                        <span>初次了解巧遇？点此「查看产品官网」 →</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        您的姓名 / 手作昵称
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="如：苏简"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] focus:bg-white shadow-2xs"
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
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="yourname@example.com"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] focus:bg-white shadow-2xs"
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
                            value={regCity}
                            onChange={(e) => setRegCity(e.target.value)}
                            placeholder="杭州"
                            className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] focus:bg-white shadow-2xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">
                          身份 / 擅长技艺
                        </label>
                        <div className="relative">
                          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                          <input
                            type="text"
                            value={regTitle}
                            onChange={(e) => setRegTitle(e.target.value)}
                            placeholder="如：木工爱好者"
                            className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] focus:bg-white shadow-2xs"
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
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-3.5 py-2.5 bg-stone-50/50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#9E5A44] focus:bg-white shadow-2xs"
                        />
                      </div>
                    </div>

                    {/* 新人礼包福利 */}
                    <div className="p-3 bg-[#FEF7EC] border border-[#E9C380]/60 rounded-xl flex items-center gap-2.5">
                      <Gift className="w-5 h-5 text-[#D99636] flex-shrink-0" />
                      <div className="text-[11px] text-stone-700 leading-snug">
                        <span className="font-bold text-[#D99636]">新居民专属礼遇：</span>
                        注册即赠 5 时光币，免存即可向心仪导师发起技能互换！
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#9E5A44] hover:bg-[#854B38] text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                    >
                      <span>入驻并领取 5 时光币</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* 查看官网入口 */}
                    <div className="text-center pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (onNavigateLanding) {
                            onNavigateLanding();
                          } else {
                            window.location.hash = '#/landing';
                          }
                        }}
                        className="text-xs text-stone-500 hover:text-[#9E5A44] font-medium inline-flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-[#9E5A44]" />
                        <span>想深入了解 4 大保障机制？「查看产品官网」 →</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 底部版权 */}
      <footer className="py-6 text-center text-xs text-stone-400 border-t border-stone-200/80">
        <p>巧遇·匠心 (SkillCraft) · 以技换技，各取所长 · 2026</p>
      </footer>
    </div>
  );
};
