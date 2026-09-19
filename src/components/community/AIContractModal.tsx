import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  Scroll,
  ShieldCheck,
  Coins,
  ArrowRightLeft,
  Calendar,
  CheckCircle2,
  Edit3,
  Wand2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillCard, ContractMilestone } from '../../types';

interface AIContractModalProps {
  card: SkillCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AIContractModal: React.FC<AIContractModalProps> = ({ card, isOpen, onClose }) => {
  const { currentUser, createSwapContract, users } = useApp();

  const [isDirectSwap, setIsDirectSwap] = useState(false);
  const [stakedCredits, setStakedCredits] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);

  // 默认三阶段课纲大纲
  const [milestones, setMilestones] = useState<ContractMilestone[]>([]);

  useEffect(() => {
    if (!card) return;

    // 判断是否 1v1 双向互换
    const isDirect =
      card.learnSkill.name.includes('吉他') || card.learnSkill.targetGoal.includes('吉他');
    setIsDirectSwap(isDirect);
    setStakedCredits(isDirect ? 0 : card.teachSkill.costCredits * 2);

    // AI 助教根据技能名称生成智能定制 3 阶段大纲
    generateMilestones(card.teachSkill.name, isDirect);
  }, [card]);

  const generateMilestones = (skillName: string, direct: boolean) => {
    setIsGenerating(true);

    setTimeout(() => {
      let customMilestones: ContractMilestone[] = [];

      if (skillName.includes('Python') || skillName.includes('代码')) {
        customMilestones = [
          {
            step: 1,
            title: '环境部署与自动化基础语法破冰',
            description: '配置本地 Python 与 VSCode 环境，掌握变量、循环与基础函数，完成第一个“Hello SkillCraft”小工具。',
            estimatedHours: 1.5,
            deliverable: '独立运行一个控制台批量重命名本地文件夹的测试脚本',
            completedByTeacher: false,
            completedByStudent: false,
          },
          {
            step: 2,
            title: '核心实战：网络数据抓取与 Excel 自动清洗',
            description: '学习 requests 与 BeautifulSoup，编写抓取目标网站公开数据的脚本并整理保存为 Excel 文件。',
            estimatedHours: 1.5,
            deliverable: '成功抓取并生成一份带有时间戳与分类的清洗后 Excel 表格',
            completedByTeacher: false,
            completedByStudent: false,
          },
          {
            step: 3,
            title: '定时任务发布与双方心得互评验收',
            description: '配置本地或云端定时自动化调度，导师对学员代码进行 Code Review，学员打卡验收并完成双向评语。',
            estimatedHours: 1,
            deliverable: '提交 Github 仓库或代码工程压缩包，完成结课互评',
            completedByTeacher: false,
            completedByStudent: false,
          },
        ];
      } else if (skillName.includes('吉他') || skillName.includes('琴') || skillName.includes('音乐')) {
        customMilestones = [
          {
            step: 1,
            title: '触弦姿势校正与 PM 闷音基础音色',
            description: '规范右手拨弦角度与力量控制，建立 PM 掌击节奏律动感，攻克基础打板发音。',
            estimatedHours: 1,
            deliverable: '录制一段 30 秒平稳且发音饱满的分解和弦 PM 练习音频',
            completedByTeacher: false,
            completedByStudent: false,
          },
          {
            step: 2,
            title: '经典曲目主歌段落与自然/人工泛音实操',
            description: '结合目标曲目拆解指法细节，训练高把位泛音与左手大跨度指法肌肉记忆。',
            estimatedHours: 1.5,
            deliverable: '连贯弹奏主歌 16 小节，泛音清脆不杂音',
            completedByTeacher: false,
            completedByStudent: false,
          },
          {
            step: 3,
            title: '全曲独奏连贯打磨与呼吸感结课验收',
            description: '把握音乐律动起伏与情感强弱层次，完成整首曲目合奏或独奏成品录制。',
            estimatedHours: 1,
            deliverable: '提交完整的曲目弹唱/独奏视频打卡，双方互相签署评价',
            completedByTeacher: false,
            completedByStudent: false,
          },
        ];
      } else {
        customMilestones = [
          {
            step: 1,
            title: '基础认知破冰与工具耗材实操入门',
            description: '梳理技艺底层逻辑，熟悉工具使用规范与基本手势姿势，完成破冰第一课。',
            estimatedHours: 1.5,
            deliverable: '完成首个基础练习构件或准备阶段产出',
            completedByTeacher: false,
            completedByStudent: false,
          },
          {
            step: 2,
            title: '核心技法深化与实战小品打磨',
            description: '导师重点演示核心工艺难点，手把手纠偏指导，学员独立完成主体部分制作。',
            estimatedHours: 2,
            deliverable: '完成阶段作品成品半成品并拍照上传学习手账',
            completedByTeacher: false,
            completedByStudent: false,
          },
          {
            step: 3,
            title: '细节精修收尾与结课成果验收',
            description: '针对细节进行润色抛光，总结关键要领，完成互评与成果交付。',
            estimatedHours: 1,
            deliverable: '交付最终实物成品或数字化作品，结算质押时光币',
            completedByTeacher: false,
            completedByStudent: false,
          },
        ];
      }

      setMilestones(customMilestones);
      setIsGenerating(false);
    }, 600);
  };

  if (!isOpen || !card) return null;

  const handleUpdateMilestone = (index: number, field: keyof ContractMilestone, value: any) => {
    setMilestones((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  };

  const handleConfirmContract = () => {
    // 检查时光币余额（非 1v1 直换时）
    if (!isDirectSwap && currentUser.timeCredits < stakedCredits) {
      alert(`您的时光币余额为 ${currentUser.timeCredits}，不足以质押 ${stakedCredits} 时光币。您可以通过先去教其他人赚取学时币哦！`);
      return;
    }

    createSwapContract({
      teacherId: card.userId,
      studentId: currentUser.id,
      teachSkillName: card.teachSkill.name,
      learnSkillName: isDirectSwap ? card.learnSkill.name : '时光币兑换学时',
      swapType: isDirectSwap ? 'direct_1v1' : 'time_credit',
      stakedCredits,
      milestones,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-craft-ink/50 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border-2 border-craft-border shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部契约卷轴风格标题 */}
        <div className="p-6 pb-4 border-b border-craft-border flex items-center justify-between bg-gradient-to-r from-[#FAF6F0] via-[#F5EFEB] to-[#FAF6F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-craft-terracotta text-white flex items-center justify-center shadow-sm">
              <Scroll className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-handcraft text-craft-ink">
                  AI 助教定制：互换学习契约
                </h2>
                <span className="stamp-badge text-[11px] font-bold text-craft-terracotta bg-craft-terracotta-light border-craft-terracotta">
                  CONTRACT DRAFT
                </span>
              </div>
              <p className="text-xs text-craft-ink-light mt-0.5">
                智能拆解 3 阶段课纲，让技能流转有目标、有产出、有保障
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-craft-ink-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 模态主体内容 */}
        <div className="p-6 space-y-6 flex-1">
          {/* 缔约双方卡片对调 */}
          <div className="p-4 bg-craft-paper rounded-2xl border border-craft-border flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* 导师方 */}
            <div className="flex items-center gap-3 flex-1">
              <img
                src={card.authorAvatar}
                alt={card.authorName}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-craft-terracotta uppercase tracking-wider">
                  导师 (Teacher)
                </span>
                <p className="text-sm font-bold text-craft-ink truncate">{card.authorName}</p>
                <p className="text-xs text-craft-ink-light truncate">{card.teachSkill.name}</p>
              </div>
            </div>

            {/* 互换方式连接器 */}
            <div className="flex flex-col items-center justify-center px-4 py-1.5 rounded-xl bg-white border border-craft-border shadow-sm flex-shrink-0">
              <ArrowRightLeft className="w-4 h-4 text-craft-terracotta mb-0.5" />
              <span className="text-[11px] font-bold text-craft-ink">
                {isDirectSwap ? '✨ 1v1 浪漫直换' : '🪙 时光银行质押'}
              </span>
            </div>

            {/* 学员方（当前登录居民） */}
            <div className="flex items-center gap-3 flex-1 justify-end text-right">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-craft-forest uppercase tracking-wider">
                  学员 (Learner)
                </span>
                <p className="text-sm font-bold text-craft-ink truncate">{currentUser.name}</p>
                <p className="text-xs text-craft-ink-light truncate">
                  {isDirectSwap ? `提供互学：${card.learnSkill.name}` : `质押：${stakedCredits} 时光币`}
                </p>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
          </div>

          {/* AI 课纲阶段大纲列表 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-handcraft text-base font-bold text-craft-ink flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-craft-amber" />
                  3 阶段教学大纲与验收交付（AI 伴学生成）
                </h3>
                {isGenerating && (
                  <span className="text-xs text-craft-terracotta flex items-center gap-1">
                    <Wand2 className="w-3 h-3 animate-spin" /> AI 生成中...
                  </span>
                )}
              </div>
              <span className="text-xs text-craft-ink-muted">（支持点击文本微调）</span>
            </div>

            <div className="space-y-3">
              {milestones.map((m, idx) => (
                <div
                  key={m.step}
                  className="p-4 bg-craft-cream rounded-2xl border border-craft-border/80 relative hover:border-craft-terracotta/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="w-6 h-6 rounded-full bg-craft-terracotta text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {m.step}
                      </span>
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => handleUpdateMilestone(idx, 'title', e.target.value)}
                        className="font-bold text-sm text-craft-ink bg-transparent border-b border-dashed border-transparent hover:border-craft-border focus:border-craft-terracotta focus:outline-none flex-1"
                      />
                    </div>

                    <div className="flex items-center gap-1 text-xs text-craft-ink-muted bg-white px-2 py-0.5 rounded-lg border border-craft-border">
                      <Calendar className="w-3 h-3 text-craft-amber" />
                      <span>约 {m.estimatedHours} 学时</span>
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    value={m.description}
                    onChange={(e) => handleUpdateMilestone(idx, 'description', e.target.value)}
                    className="w-full text-xs text-craft-ink-light bg-transparent border border-transparent hover:border-craft-border focus:border-craft-terracotta focus:outline-none p-1.5 rounded-lg transition-colors leading-relaxed mb-2"
                  />

                  <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-craft-border text-xs text-craft-forest font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="text-craft-ink-light">产出验收物：</span>
                    <input
                      type="text"
                      value={m.deliverable}
                      onChange={(e) => handleUpdateMilestone(idx, 'deliverable', e.target.value)}
                      className="flex-1 bg-transparent focus:outline-none text-craft-ink text-xs border-b border-transparent focus:border-craft-forest"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 质押规则与防翻车保障条款 */}
          <div className="p-4 bg-craft-amber-light/70 rounded-2xl border border-craft-amber/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8C5D17]">
              <ShieldCheck className="w-4 h-4 text-craft-amber" />
              <span>《巧遇·社区技能互换履约与质押共识》</span>
            </div>
            <ul className="text-xs text-craft-ink-light space-y-1 pl-4 list-disc leading-relaxed">
              <li>
                <strong>质押托管机制：</strong>
                {isDirectSwap
                  ? '本次为 1v1 浪漫直连互换，免收时光币质押，双方以技能课时对调切磋。'
                  : `签署后系统从中枢质押池自动冻结 ${stakedCredits} 时光币；`}
              </li>
              <li>
                <strong>阶梯打卡释放：</strong>
                每次上课结束，双方在【协作看板】打卡确认后，系统自动释放该阶段学时；
              </li>
              <li>
                <strong>违约申诉保障：</strong>
                若一方无故失联、旷课或教学严重不符课纲，另一方可随时发起“纠纷仲裁”，平台管理员将根据打卡记录与课纲公正裁决并退回质押金。
              </li>
            </ul>
          </div>
        </div>

        {/* 底部确认签署栏 */}
        <div className="p-4 bg-craft-paper border-t border-craft-border flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-craft-amber" />
            <div>
              <p className="text-xs text-craft-ink-light">本次质押锁定</p>
              <p className="text-sm font-bold text-craft-ink">
                {isDirectSwap ? '0 时光币 (1v1互换)' : `${stakedCredits} 时光币`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-craft-ink-light hover:bg-black/5 transition-colors"
            >
              暂不签署
            </button>
            <button
              onClick={handleConfirmContract}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-craft-terracotta to-craft-amber text-white text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>确认课纲并签署契约</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
