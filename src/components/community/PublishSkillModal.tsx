import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Laptop,
  Image as ImageIcon,
  Coins,
  Wand2,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillCategory, SkillLevel, TeachingMode } from '../../types';
import { getCategoryFallbackSvg, handleImageError } from '../../utils/imageFallback';

interface PublishSkillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PORTFOLIOS = [
  {
    label: '民谣吉他',
    url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '代码编程',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '手冲咖啡',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '胶片摄影',
    url: 'https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '手工木作',
    url: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '手绘插画',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
  },
];

export const PublishSkillModal: React.FC<PublishSkillModalProps> = ({ isOpen, onClose }) => {
  const { publishSkill, currentUser } = useApp();

  // 模态框打开时锁定底板滚动，关闭时恢复
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const [step, setStep] = useState<1 | 2>(1);
  const [isAiPolishing, setIsAiPolishing] = useState(false);

  // 我能教的表单
  const [teachName, setTeachName] = useState('');
  const [teachCategory, setTeachCategory] = useState<SkillCategory>('music');
  const [teachLevel, setTeachLevel] = useState<SkillLevel>('intermediate');
  const [yearsOfExperience, setYearsOfExperience] = useState('3年实践经验');
  const [teachingMode, setTeachingMode] = useState<TeachingMode>('both');
  const [hoursPerSession, setHoursPerSession] = useState(1.5);
  const [teachDescription, setTeachDescription] = useState('');
  const [highlightTags, setHighlightTags] = useState<string[]>(['零基础友好', '耐心答疑']);
  const [tagInput, setTagInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(PRESET_PORTFOLIOS[0].url);

  // 我想学的表单
  const [learnName, setLearnName] = useState('');
  const [learnCategory, setLearnCategory] = useState<SkillCategory>('tech');
  const [learnGoal, setLearnGoal] = useState('');
  const [learnLevel, setLearnLevel] = useState('零基础入门');

  if (!isOpen) return null;

  // AI 智能润色与提炼卖点
  const handleAiPolish = () => {
    if (!teachName.trim()) {
      alert('请先填写您能教授的技能名称，AI 才能精准提炼卖点哦！');
      return;
    }

    setIsAiPolishing(true);
    setTimeout(() => {
      // 模拟根据技能名称生成的自然温馨文案与标签
      if (teachName.includes('吉他') || teachName.includes('琴') || teachName.includes('乐')) {
        setTeachDescription(
          `【这门课带你收获什么】\n从基础持琴与触弦呼吸感出发，破除按弦生疼、和弦切换卡顿的瓶颈。\n拒绝死记硬背枯燥乐理，通过 3 阶段阶梯练习，手把手带你弹下一首完整的旋律，附赠私人定制练习音频指导！`
        );
        setHighlightTags(['拒绝死磕和弦', '发音触弦拆解', '自学不踩坑', '附赠定制练习指谱']);
      } else if (teachName.includes('Python') || teachName.includes('代码') || teachName.includes('程序')) {
        setTeachDescription(
          `【这门课带你收获什么】\n告别晦涩算法与死板语法，专为非计算机背景朋友设计！\n从配置本地环境开始，带你手把手写出第一个自动批量整理文件、网络数据抓取并发送报表的极简 Python 脚本。`
        );
        setHighlightTags(['小白友好', '办公自动化', '即学即用脚本', '代码伴学纠错']);
      } else {
        setTeachDescription(
          `【这门课带你收获什么】\n结合我多年的经验沉淀，将复杂步骤拆解为直观易懂的 3 步法。\n注重实战互动与细节反馈，课后提供清单式练习指导，让你在轻松愉悦的切磋氛围中掌握这项温情技艺。`
        );
        setHighlightTags(['实战上手', '细节拆解', '真诚切磋', '贴心伴学']);
      }
      setIsAiPolishing(false);
    }, 900);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !highlightTags.includes(tagInput.trim())) {
      setHighlightTags([...highlightTags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setHighlightTags(highlightTags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!teachName.trim() || !teachDescription.trim() || !learnName.trim() || !learnGoal.trim()) {
      alert('请完整填写必填项，让互换伙伴更了解您的需求！');
      return;
    }

    publishSkill({
      teachSkill: {
        name: teachName,
        category: teachCategory,
        level: teachLevel,
        yearsOfExperience,
        description: teachDescription,
        highlightTags,
        portfolioImages: [selectedImage],
        teachingMode,
        hoursPerSession,
        costCredits: 1,
      },
      learnSkill: {
        name: learnName,
        category: learnCategory,
        targetGoal: learnGoal,
        currentLevel: learnLevel,
      },
    });

    onClose();
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] border-2 border-craft-border shadow-2xl relative flex flex-col overflow-hidden animate-in fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题与关闭 */}
        <div className="p-6 pb-4 border-b border-craft-border flex items-center justify-between bg-craft-paper flex-shrink-0">
          <div>
            <span className="stamp-badge text-[11px] font-bold text-craft-terracotta bg-craft-terracotta-light border-craft-terracotta mb-1">
              STEP {step} / 2
            </span>
            <h2 className="text-xl font-bold font-handcraft text-craft-ink">
              {step === 1 ? '第一步：发布我能教的一技之长' : '第二步：明确我渴望学成的新技能'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-craft-ink-light transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 步骤内容区域：外层 flex-1 flex flex-col，中间内部使用 modal-scrollbar 滚动 */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto modal-scrollbar p-6 space-y-6">
          {step === 1 ? (
            <div className="space-y-4">
              {/* 技能名称 */}
              <div>
                <label className="block text-xs font-bold text-craft-ink mb-1.5">
                  技能名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={teachName}
                  onChange={(e) => setTeachName(e.target.value)}
                  placeholder="例如：民谣木吉他指弹演奏、Python 网络数据爬取与自动化..."
                  className="w-full px-4 py-2.5 bg-craft-paper rounded-xl border border-craft-border text-sm text-craft-ink focus:outline-none focus:border-craft-terracotta transition-colors"
                />
              </div>

              {/* 分类与经验 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-craft-ink mb-1.5">所属领域</label>
                  <select
                    value={teachCategory}
                    onChange={(e) => setTeachCategory(e.target.value as SkillCategory)}
                    className="w-full px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
                  >
                    <option value="music">音乐乐器</option>
                    <option value="tech">数字编程</option>
                    <option value="craft">生活手作</option>
                    <option value="photo">胶片摄影</option>
                    <option value="language">外语漫谈</option>
                    <option value="life">咖啡烘焙</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-craft-ink mb-1.5">掌握熟练度</label>
                  <select
                    value={teachLevel}
                    onChange={(e) => setTeachLevel(e.target.value as SkillLevel)}
                    className="w-full px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
                  >
                    <option value="beginner">入门实用</option>
                    <option value="intermediate">熟练进阶</option>
                    <option value="expert">资深精通</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-craft-ink mb-1.5">练习/从业经验</label>
                  <input
                    type="text"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    placeholder="如：3年自学经验"
                    className="w-full px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
                  />
                </div>
              </div>

              {/* 授课模式与时长 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-craft-ink mb-1.5">授课偏好模式</label>
                  <div className="flex gap-2">
                    {[
                      { key: 'online', label: '线上远程' },
                      { key: 'offline', label: '同城线下' },
                      { key: 'both', label: '线上/线下均可' },
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.key}
                        onClick={() => setTeachingMode(m.key as TeachingMode)}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                          teachingMode === m.key
                            ? 'bg-craft-terracotta text-white border-craft-terracotta shadow-sm'
                            : 'bg-craft-paper text-craft-ink-light border-craft-border hover:border-craft-terracotta/40'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-craft-ink mb-1.5">
                    单次建议课时（小时）
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="4"
                    value={hoursPerSession}
                    onChange={(e) => setHoursPerSession(parseFloat(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
                  />
                </div>
              </div>

              {/* 核心亮点：AI 智能润色助手 */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-craft-ink">
                    教学特色与介绍 <span className="text-red-500">*</span>
                  </label>

                  <button
                    type="button"
                    onClick={handleAiPolish}
                    disabled={isAiPolishing}
                    className="flex items-center gap-1.5 text-xs font-bold text-craft-terracotta bg-craft-terracotta-light hover:bg-craft-terracotta/20 px-2.5 py-1 rounded-lg border border-craft-terracotta/30 transition-all cursor-pointer"
                  >
                    <Wand2 className={`w-3.5 h-3.5 ${isAiPolishing ? 'animate-spin' : ''}`} />
                    <span>{isAiPolishing ? 'AI 正在提炼卖点...' : 'AI 智能润色提炼卖点'}</span>
                  </button>
                </div>

                <textarea
                  required
                  rows={4}
                  value={teachDescription}
                  onChange={(e) => setTeachDescription(e.target.value)}
                  placeholder="用温情真诚的口吻写写：你能带伙伴收获什么？从零基础怎么学？教学氛围是怎样的？"
                  className="w-full p-3 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta transition-colors leading-relaxed"
                />
              </div>

              {/* 亮点标签 */}
              <div>
                <label className="block text-xs font-bold text-craft-ink mb-1.5">特色亮点标签</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {highlightTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-craft-cream border border-craft-border text-craft-ink"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-500 text-craft-ink-muted ml-0.5"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="输入标签（如：零基础、包教包会、提供吉他...）"
                    className="flex-1 px-3 py-1.5 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-3 py-1.5 rounded-xl bg-craft-paper-dark text-craft-ink text-xs font-semibold hover:bg-craft-border transition-colors"
                  >
                    添加
                  </button>
                </div>
              </div>

              {/* 封面相册选择 */}
              <div>
                <label className="block text-xs font-bold text-craft-ink mb-1.5 flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5 text-craft-terracotta" />
                  精美手作封面（选择预置或上传）
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {PRESET_PORTFOLIOS.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(item.url)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedImage === item.url
                          ? 'border-craft-terracotta scale-105 shadow-md ring-2 ring-craft-terracotta/30'
                          : 'border-craft-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.url}
                        alt={item.label}
                        onError={(e) => handleImageError(e, getCategoryFallbackSvg('craft', item.label))}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                        {item.label}
                      </span>
                      {selectedImage === item.url && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-craft-terracotta text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* 第二步：我想学的 */
            <div className="space-y-4">
              <div className="p-3.5 bg-craft-amber-light border border-craft-amber/30 rounded-2xl text-xs text-[#8C5D17] flex items-start gap-2">
                <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-craft-amber" />
                <p>
                  填写清晰明确的学习诉求，系统 AI 匹配引擎将自动扫描全社区已发布的技能，为您精准匹配「天作之合」1v1 互换伙伴！
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-craft-ink mb-1.5">
                  渴望学习的技能名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={learnName}
                  onChange={(e) => setLearnName(e.target.value)}
                  placeholder="如：Python 自动化办公、手冲咖啡、胶片暗房冲洗、尤克里里..."
                  className="w-full px-4 py-2.5 bg-craft-paper rounded-xl border border-craft-border text-sm text-craft-ink focus:outline-none focus:border-craft-terracotta transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-craft-ink mb-1.5">技能门类</label>
                  <select
                    value={learnCategory}
                    onChange={(e) => setLearnCategory(e.target.value as SkillCategory)}
                    className="w-full px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
                  >
                    <option value="tech">数字编程</option>
                    <option value="music">音乐乐器</option>
                    <option value="craft">生活手作</option>
                    <option value="photo">胶片摄影</option>
                    <option value="language">外语漫谈</option>
                    <option value="life">咖啡烘焙</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-craft-ink mb-1.5">当前个人基础</label>
                  <select
                    value={learnLevel}
                    onChange={(e) => setLearnLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
                  >
                    <option value="零基础纯小白">零基础纯小白（从零学起）</option>
                    <option value="略懂皮毛/卡在瓶颈">略懂皮毛 / 自学卡在瓶颈</option>
                    <option value="已有基础渴望进阶">已有一定基础，渴望实战进阶</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-craft-ink mb-1.5">
                  具体的学成目标或预期产出 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={learnGoal}
                  onChange={(e) => setLearnGoal(e.target.value)}
                  placeholder="例如：希望 3 节课后能独立写出一个自动爬取并合并 Excel 的 Python 脚本，或者能完整弹唱《晴天》..."
                  className="w-full p-3 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta transition-colors leading-relaxed"
                />
              </div>

              <div className="p-4 bg-craft-cream rounded-2xl border border-craft-border text-xs space-y-1.5 text-craft-ink-light">
                <p className="font-bold text-craft-ink flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-craft-forest" />
                  <span>时光银行智能保障约定：</span>
                </p>
                <p>• 即使暂时没有遇到 1v1 直换伙伴，您教他人也可赚取【时光币】；</p>
                <p>• 后续可使用赚取的时光币向社区中任意一位导师发起请教学习；</p>
                <p>• 平台由 AI 助教协助生成《3 阶段课纲》，保障学习成果落地。</p>
              </div>
            </div>
          )}
          </div>

          {/* 底部导航与提交按钮：固定在表单底部 */}
          <div className="p-4 bg-craft-paper border-t border-craft-border flex items-center justify-between gap-3 flex-shrink-0">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-craft-ink-light hover:bg-black/5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                上一步
              </button>
            ) : (
              <div />
            )}

            {step === 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (!teachName.trim() || !teachDescription.trim()) {
                    alert('请先填写技能名称和教学介绍');
                    return;
                  }
                  setStep(2);
                }}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-craft-terracotta text-white text-xs font-bold hover:bg-craft-terracotta-dark transition-colors shadow-sm cursor-pointer"
              >
                <span>下一步：我想学什么</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-1.5 px-8 py-2.5 rounded-xl bg-gradient-to-r from-craft-terracotta to-craft-amber text-white text-xs font-bold hover:scale-105 transition-all shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>完成并发布我的技能卡</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
