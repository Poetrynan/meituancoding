import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Compass,
  Coins,
  ShieldCheck,
  Clock,
  Gift,
  HeartHandshake,
  CheckCircle2,
  Camera,
  Hammer,
  Coffee,
  Code2,
  Music,
  Scissors,
  Flame,
  ArrowRightLeft,
  ChevronRight,
  UserCheck,
  Scale,
  Award,
} from 'lucide-react';

import { BrandLogo } from './BrandLogo';

interface LandingPageProps {
  onNavigateMarketplace: () => void;
  onNavigateLogin: (mode?: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateMarketplace,
  onNavigateLogin,
}) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-[#9E5A44] selection:text-white relative overflow-x-hidden [scrollbar-gutter:stable]">
      {/* 柔和环境光晕 */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#9E5A44]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-[#E9C380]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[#9E5A44]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. 官网顶栏 Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/80 shadow-[0_1px_3px_rgba(44,40,37,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={onNavigateMarketplace}
            className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <BrandLogo size={38} className="rounded-xl shadow-xs group-hover:scale-105 transition-transform flex-shrink-0" />
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-handcraft text-xl font-bold text-stone-900 tracking-wide">
                巧遇 · 匠心
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-bold text-[#9E5A44] bg-[#9E5A44]/10 border border-[#9E5A44]/20 px-2 py-0.5 rounded-full font-mono">
                SkillCraft
              </span>
            </div>
          </div>

          {/* 中间锚点导航 */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-stone-600">
            <a href="#mechanisms" className="hover:text-[#9E5A44] transition-colors">
              四大核心机制
            </a>
            <a href="#categories" className="hover:text-[#9E5A44] transition-colors">
              热门手作门类
            </a>
            <a href="#how-it-works" className="hover:text-[#9E5A44] transition-colors">
              换学运转流程
            </a>
            <a href="#stories" className="hover:text-[#9E5A44] transition-colors">
              匠人互换心声
            </a>
          </nav>

          {/* 右侧操作按钮 */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={onNavigateMarketplace}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 bg-white hover:bg-stone-50 border border-stone-200 shadow-sm transition-all cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#9E5A44]" />
              <span>进入技能集市</span>
            </button>

            <button
              onClick={() => onNavigateLogin('login')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-stone-100 transition-all cursor-pointer"
            >
              居民登录
            </button>

            <button
              onClick={() => onNavigateLogin('register')}
              className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#9E5A44] hover:bg-[#854B38] text-white shadow-sm transition-all cursor-pointer flex items-center gap-1"
            >
              <span>入驻领5币</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero 核心主视区 */}
      <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9E5A44]/10 border border-[#9E5A44]/20 text-[#9E5A44] text-xs font-bold font-handcraft animate-in fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            <span>全国首个专注手作与匠人技艺的「时光存折」互换社区</span>
          </div>

          <h1 className="font-handcraft text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15]">
            无需昂贵学费，
            <br />
            以你的
            <span className="text-[#9E5A44] mx-2 underline decoration-[#E9C380] decoration-wavy decoration-2 underline-offset-8">
              手作匠心
            </span>
            交换全世界的才华
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            在「巧遇·匠心」，时光是最平等的等价物。用你精研的摄影暗房冲卷、古法木作或烘焙拉花，交换他人的编程全栈开发、咖啡冲煮或原声吉他。不搞商业推销，唯敬认真手艺。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => onNavigateLogin('register')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#9E5A44] hover:bg-[#854B38] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>即刻入驻 · 免费领 5 时光币</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onNavigateMarketplace}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-sm border border-stone-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#9E5A44]" />
              <span>探索社区技能集市</span>
            </button>
          </div>

          {/* 信任凭证 Capsule */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-stone-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              100% 真实社区居民认证
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              0 现金中介佣金与套路
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              AI 3 阶段双向存证契约护航
            </span>
          </div>
        </div>

        {/* Hero 下方视觉展示卡片 (实时双向互换模拟) */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-stone-200/90 p-4 sm:p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>社区当下正在发生的技能切磋碰撞：</span>
              </div>
              <span className="text-[11px] font-mono text-stone-400">
                BLOCK #{Date.now().toString().slice(-6)} · 实时存证
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {/* 卡片 1 */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-3 hover:border-[#9E5A44]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    摄影 ⇄ 咖啡
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">杭州 · 西湖</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                    林晨曦 (黑白胶片暗房冲卷)
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#9E5A44] font-bold mt-1">
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>交换 陆小川 的手冲感官萃取</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2">
                  已完成第 2 阶段药耗与显影定影实操，质押学时按节点顺利流转解冻。
                </p>
              </div>

              {/* 卡片 2 */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-3 hover:border-[#9E5A44]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    木作 ⇄ 全栈开发
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">杭州 · 余杭</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                    程思远 (传统榫卯实木家具打样)
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#9E5A44] font-bold mt-1">
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>交换 苏简 的独立作品站搭建</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2">
                  双向授课时长 8 学时，双方 5 星好评互认，时光币自动结清。
                </p>
              </div>

              {/* 卡片 3 */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-stone-200/80 space-y-3 hover:border-[#9E5A44]/40 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                    烘焙 ⇄ 指弹吉他
                  </span>
                  <span className="text-[11px] font-mono text-stone-400">杭州 · 滨江</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                    白小飞 (法式酸种天然酵母欧包)
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#9E5A44] font-bold mt-1">
                    <ArrowRightLeft className="w-3 h-3" />
                    <span>交换 周子墨 的指弹编曲实战</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 line-clamp-2">
                  AI 拟定 3 阶段课纲，第一阶段酵母起种与和弦视奏双双打卡验收。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 四大核心机制 Bento Grid */}
      <section id="mechanisms" className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-[#9E5A44]" />
              <span>颠覆传统的换学生态</span>
            </div>
            <h2 className="font-handcraft text-3xl sm:text-4xl font-bold text-stone-900">
              四大核心机制，保障每一次技能托付
            </h2>
            <p className="text-sm text-stone-600">
              从时光存折结算到 AI 课纲质押与仲裁法庭，我们打造了闭环的诚信履约底座。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 机制 1 */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#9E5A44]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF7EC] border border-[#E9C380]/60 flex items-center justify-center text-[#D99636]">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">时光存折结算</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                以时间为唯一的度量衡。1 小时授课 = 1 时光币存入，请教学习则相应扣除。没有商业机构的会员费与课程推销，回归纯粹互助。
              </p>
            </div>

            {/* 机制 2 */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#9E5A44]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF2EE] border border-[#9E5A44]/20 flex items-center justify-center text-[#9E5A44]">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">AI 3阶段契约课纲</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                发起互换时，AI 智能评估双方契合度并拟定「初阶破冰、技艺深研、成果验收」3 阶段大纲。每次学习双向打卡存证，学时分步解冻。
              </p>
            </div>

            {/* 机制 3 */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#9E5A44]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">社区仲裁法庭护航</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                遇到导师旷课、敷衍或学员失联？直接申请纠纷仲裁。法庭调阅双方签署课纲与历史打卡存证，判定责任，一键原路退款或划转学时。
              </p>
            </div>

            {/* 机制 4 */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#9E5A44]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEF7EC] border border-[#E9C380]/60 flex items-center justify-center text-[#D99636]">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">新居民迎新礼遇</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                解决冷启动难题！每一位新入驻居民在注册后即免费获赠 5 时光币学时启动金，无需先授课即可向任何心仪导师发起请教学习。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 热门手作门类展示 */}
      <section id="categories" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9E5A44]/10 border border-[#9E5A44]/20 text-[#9E5A44] text-xs font-bold font-handcraft">
            <Sparkles className="w-3.5 h-3.5" />
            <span>丰富多元的技艺品类</span>
          </div>
          <h2 className="font-handcraft text-3xl sm:text-4xl font-bold text-stone-900">
            在市集里，总有一门手艺直击你心
          </h2>
          <p className="text-sm text-stone-600">
            涵盖传统非遗手工、现代创意美学与硬核硬核科技技能，双向流转生生不息。
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: Camera, title: '胶片摄影与暗房', desc: '黑白冲卷 · 放大定影 · 构图光影', count: '18 位导师' },
            { icon: Hammer, title: '传统榫卯与木作', desc: '手工开榫 · 刨花打磨 · 实木打样', count: '14 位导师' },
            { icon: Coffee, title: '精品手冲咖啡', desc: '生豆辨识 · 烘焙曲线 · 压粉拉花', count: '26 位导师' },
            { icon: Code2, title: '独立全栈开发', desc: 'React · Python · AI Agent 搭建', count: '32 位导师' },
            { icon: Scissors, title: '手工皮革植鞣', desc: '双波浪缝线 · 封边打磨 · 敲字印花', count: '12 位导师' },
            { icon: Music, title: '原声指弹与爵士', desc: '乐理和弦 · 即兴演奏 · 编曲录音', count: '19 位导师' },
            { icon: Flame, title: '传统柴烧陶艺', desc: '手捏拉坯 · 施釉烧造 · 茶器手作', count: '15 位导师' },
            { icon: HeartHandshake, title: '法式酸种烘焙', desc: '酵母培养 · 翻面发酵 · 割包烘烤', count: '22 位导师' },
          ].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={onNavigateMarketplace}
                className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md hover:border-[#9E5A44]/40 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-[#FAF2EE] group-hover:text-[#9E5A44] transition-colors flex items-center justify-center text-stone-700 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#9E5A44] transition-colors">
                  {cat.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">{cat.desc}</p>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>{cat.count}</span>
                  <span className="text-[#9E5A44] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. 运作三步流程 How it works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold">
              <span>简单三步</span>
            </div>
            <h2 className="font-handcraft text-3xl sm:text-4xl font-bold text-stone-900">
              如何开启你的第一场技能互换
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E5A44] text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                01
              </div>
              <h3 className="text-base font-bold text-stone-900">挂出所长，发布技能卡</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                介绍你所擅长的精研手艺，写明渴望换学的领域（例如：教授暗房冲卷，渴望学习爵士即兴）。
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E5A44] text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                02
              </div>
              <h3 className="text-base font-bold text-stone-900">相中搭档，签署课纲契约</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                浏览集市中意向导师，一键发起互换。AI 辅助拟定 3 阶段课纲，双方确认签署并锁定质押学时。
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FDFBF7] border border-stone-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E5A44] text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm">
                03
              </div>
              <h3 className="text-base font-bold text-stone-900">授课打卡，学时流转兑现</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                线下工坊或线上切磋教学，完成每一阶段双方打卡确认，质押学时入账，收获挚友与新本领。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 匠人真实故事 Testimonials */}
      <section id="stories" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="font-handcraft text-3xl sm:text-4xl font-bold text-stone-900">
            来自巧遇居民的真实声音
          </h2>
          <p className="text-sm text-stone-600">
            每一位认真投入的匠人，都能在这里找到同频共振的伙伴。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed italic">
              “玩了十几年胶片，以前总苦于暗房手艺无人交流。在巧遇上遇到了做前端的小苏，我带他上手显影和定影放大，他帮我搭建了个人暗房作品集网站，这种各取所长的感觉太棒了！”
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="林晨曦"
                className="w-9 h-9 rounded-full object-cover border border-stone-200"
              />
              <div>
                <h4 className="text-xs font-bold text-stone-900">林晨曦</h4>
                <p className="text-[11px] text-stone-400">独立胶片摄影师 · 杭州西湖</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed italic">
              “市面上的商业木工培训班动辄上万，教得千篇一律。在巧遇我用自己烘焙手冲咖啡的绝活，换到了老木匠程老师一对一的实木榫卯精雕手艺，真正的工匠精神在流动中传承。”
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                alt="陆小川"
                className="w-9 h-9 rounded-full object-cover border border-stone-200"
              />
              <div>
                <h4 className="text-xs font-bold text-stone-900">陆小川</h4>
                <p className="text-[11px] text-stone-400">精品咖啡烘焙师 · 杭州滨江</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed italic">
              “最让我放心的是 3 阶段课纲和仲裁中枢。双方每上一节课在手机上点一次打卡，学时就按阶段解冻，再也不用担心学员中途旷课或者导师不履约的尴尬情况。”
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
                alt="程思远"
                className="w-9 h-9 rounded-full object-cover border border-stone-200"
              />
              <div>
                <h4 className="text-xs font-bold text-stone-900">程思远</h4>
                <p className="text-[11px] text-stone-400">传统榫卯木作人 · 杭州余杭</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 底部 CTA 立即加入 */}
      <section className="py-16 sm:py-20 bg-[#9E5A44] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <h2 className="font-handcraft text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            让手艺重拾温度，让技能自由流动
          </h2>
          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            加入巧遇·匠心社区，即刻领取 5 时光币迎新启动金，开启你与同城匠人的第一场真挚切磋。
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigateLogin('register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white hover:bg-stone-100 text-[#9E5A44] font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>立即注册入驻 (赠 5 时光币)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateMarketplace}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#854B38] hover:bg-[#723E2E] text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              先去集市逛逛
            </button>
          </div>
        </div>
      </section>

      {/* 8. 官网底栏 Footer */}
      <footer className="py-10 bg-[#FAF7F2] border-t border-stone-200/80 text-center text-xs text-stone-500 space-y-3">
        <div className="flex items-center justify-center gap-6 font-bold text-stone-700">
          <span onClick={onNavigateMarketplace} className="cursor-pointer hover:text-[#9E5A44]">技能集市</span>
          <span onClick={() => onNavigateLogin('login')} className="cursor-pointer hover:text-[#9E5A44]">居民登录</span>
          <span onClick={() => onNavigateLogin('register')} className="cursor-pointer hover:text-[#9E5A44]">入驻注册</span>
          <a href="#/admin" className="text-stone-400 hover:text-stone-600 font-mono">平台控制台</a>
        </div>
        <p>巧遇·匠心 (SkillCraft) · 以技换技，各取所长 · 2026 版权所有</p>
      </footer>
    </div>
  );
};
