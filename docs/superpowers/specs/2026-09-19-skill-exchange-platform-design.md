# 巧遇·匠心 (SkillCraft) 智能技能互换平台 — 架构与产品设计规范 (Design Spec)

## 一、 产品定位与背景

### 1. 核心背景
在个人成长与副业探索蓬勃发展的当下，许多人渴望学习吉他、摄影、编程、陶艺或外语等技能，却面临“专业培训班费用高昂”、“缺乏陪伴自学易放弃”的困境；与此同时，大量具备一技之长的青年人，其闲置技能缺乏分享途径与变现闭环。

### 2. 产品使命
打破传统知识付费的冷漠与金钱壁垒，构建一个**有温度、有信任、能履约的温暖手作社区**。通过“以技能换技能”与“时光银行（Time Bank）”双轨模式，借助 AI 语义匹配与契约生成技术，让知识技能在邻里社区间流转生辉。

### 3. 核心设计哲学：温暖社区手作风 (Warm Handcrafted Community)
- **视觉底色**：亚麻米白卡纸（`#FAF6F0`）、陶土暖红（`#9E5A44`）、复古森林绿（`#3B5B43`）、暖金琥珀（`#D99636`）。
- **质感隐喻**：手账贴纸、图章印鉴、缝线边框、拍立得相框、手绘进度环。
- **情感触点**：去机器化、重人情味；把冷冰冰的“课程交易”变成“邻里技艺切磋与共同成长”。

---

## 二、 核心机制创新（破除传统翻车痛点）

```
[痛点 1: 需求双重巧合概率低]  ===>  【创新 1: 浪漫直连 + 时光银行 双轨制】
[痛点 2: 缺乏大纲与随意敷衍]  ===>  【创新 2: AI 助教自动拟定《技能互换契约与3阶课纲》】
[痛点 3: 临时鸽单与缺乏约束]  ===>  【创新 3: 时光币智能质押 (Escrow) + 履约打卡】
[痛点 4: 黑产引流与履约纠纷]  ===>  【创新 4: 管理后台风控中枢 + 争议仲裁法庭】
```

---

## 三、 用户角色与场景流转

### 1. 普通用户（学员 / 导师 双重身份）
- **探索与发现**：浏览技能广场，查看 AI 推荐的“天作之合”双向互换卡片与“时光流转”卡片。
- **发布技能卡**：填写“我能教的”（附带作品集）与“我想学的”，一键使用 AI 润色提炼卖点。
- **发起互换与缔约**：发起 1v1 直连或时光币互换，AI 自动生成 3~4 课时的《学习契约大纲》。
- **履约学习**：在【互换工作台】进行课时打卡（附笔记/作品成果），确认后自动释放质押时光币。
- **个人时光银行**：查看时光币账户流水、手账勋章墙与评价信誉分。

### 2. 平台管理员（治理与风控视角）
- **一键切换**：顶部导航无缝在“社区前台”与“管理控制台”间切换。
- **数据大盘**：监控全网互换数、契约达成率、时光币流动速率、违约翻车率。
- **内容合规审核**：审核用户发布的技能卡，AI 自动标记风险等级，支持一键批准/驳回。
- **互换纠纷仲裁**：查看产生争议的契约、双方进度打卡记录与申诉，裁决时光币划转或退还。
- **宏观经济调控**：设置新用户赠送学时、优质导师官方补贴池比例。

---

## 四、 页面架构与核心模块规划

```
App Root
├── 顶部温暖手作导航 (Navbar)
│   ├── Brand Logo (巧遇·匠心 / SkillCraft)
│   ├── Tab 切换 (技能广场 / 发布技能 / 互换看板 / 时光银行)
│   ├── 时光币余额胶囊 (🌟 12 时光星)
│   └── 视角切换开关 (前台社区 ⇄ 管理后台)
│
├── 前台社区视图 (Community View)
│   ├── [1] 技能集市与智能匹配 (Skill Marketplace)
│   │   ├── AI 智能双向契合推荐 Banner ("天作之合" 1v1 互换高亮)
│   │   ├── 分类标签过滤 (音乐/编程/手作/摄影/小语种/生活)
│   │   ├── 搜索与授课模式筛选 (线上腾讯会议/线下咖啡馆)
│   │   └── 技能卡片列表 (作品缩略图、导师信誉分、所需/赠送学时、详情抽屉)
│   ├── [2] 发布互换向导 (Skill Publish Modal)
│   │   ├── 我能教的 (技能名、熟练年限、标签、作品上传预览)
│   │   ├── 我想学的 (目标技能、期望课时、当前基础)
│   │   └── AI 润色助手 (一键优化表达并生成课程大纲预览)
│   ├── [3] AI 学习契约与助教模态框 (AI Contract & Syllabus Generator)
│   │   ├── 阶段大纲制定 (破冰筑基、实战打磨、成果验收)
│   │   └── 质押规则说明与双方确认签署
│   ├── [4] 互换协作看板 (Swap Workbench)
│   │   ├── 状态流转标签 (待对方同意 / 履约进行中 / 待打卡 / 已完成 / 申诉中)
│   │   ├── 课时进度手绘打卡圆环
│   │   ├── 课后成果打卡提交 (支持笔记/作业)
│   │   └── 发起争议申诉入口
│   └── [5] 个人时光银行 (Time Bank & Profile)
│       ├── 时光币流水与兑换统计
│       ├── 手账徽章墙 (耐心领路人、全勤学霸、金牌匠人等)
│       └── 历史互评与好评率统计
│
└── 管理后台控制台 (Admin Dashboard View)
    ├── [1] 平台运营宏观看板 (KPI Cards & 交互图表)
    ├── [2] 技能卡片合规审核流 (AI 初筛、批准/驳回操作)
    ├── [3] 纠纷仲裁法庭 (查看工单、契约对照、判定裁决)
    └── [4] 时间银行宏观调控器 (注册补贴、质押比例、货币流通盘控)
```

---

## 五、 数据结构设计 (TypeScript Interfaces)

```typescript
// 用户模型
export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  timeCredits: number; // 时光币余额
  reputationScore: number; // 信用分 (0-100)
  completedExchanges: number; // 完成互换次数
  badges: Badge[];
  role: 'user' | 'admin';
}

// 技能卡片模型
export interface SkillCard {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  teachSkill: {
    name: string;
    category: 'music' | 'tech' | 'craft' | 'photo' | 'language' | 'life';
    level: 'beginner' | 'intermediate' | 'expert';
    yearsOfExperience: string;
    description: string;
    portfolioImages: string[];
    teachingMode: 'online' | 'offline' | 'both';
  };
  learnSkill: {
    name: string;
    category: string;
    targetGoal: string;
    currentLevel: string;
  };
  status: 'pending_review' | 'active' | 'rejected' | 'closed';
  isDirectMatch?: boolean; // 是否与当前登录用户构成天作之合
  createdAt: string;
}

// 学习契约与阶段大纲
export interface ContractMilestone {
  step: number;
  title: string;
  description: string;
  estimatedHours: number;
  deliverable: string; // 产出物
  completedByTeacher: boolean;
  completedByStudent: boolean;
}

export interface SwapContract {
  id: string;
  teacherId: string;
  studentId: string;
  teacherName: string;
  studentName: string;
  teachSkillName: string;
  learnSkillName: string;
  type: 'direct_swap' | 'credit_swap'; // 1v1互换 或 时光币支付
  stakedCredits: number; // 质押时光币
  milestones: ContractMilestone[];
  status: 'draft' | 'pending' | 'active' | 'completed' | 'disputed';
  disputeReason?: string;
  arbitrationVerdict?: string;
  createdAt: string;
}

// 纠纷仲裁工单
export interface DisputeCase {
  id: string;
  contractId: string;
  plaintiffId: string;
  defendantId: string;
  reason: string;
  evidenceText: string;
  evidenceImages: string[];
  status: 'pending' | 'resolved_refund' | 'resolved_release';
  createdAt: string;
}
```

---

## 六、 验证与质量保证方案

1. **功能完整度验证**：
   - 技能筛选搜索响应即时，分类标签切换精准。
   - 能够正常发布新技能卡，表单支持校验与 AI 润色效果展示。
   - 发起互换时能调用 AI 助教生成并自定义阶段大纲。
   - 课时打卡驱动状态机正常运转，质押时光币在打卡完毕后准确结算入账。
   - 管理后台可以审核刚刚发布处于待审核状态的技能卡，并裁决仲裁案例。
2. **视觉与交互质感体验**：
   - 温暖手作风格质感自然，色调温馨，富有邻里生活气息。
   - 动效流畅（卡片悬停轻微浮起、手写质感印章盖下动效、Toast 贴纸提醒）。
   - 响应式适配移动端与桌面端。
3. **数据一致性与本地隔离**：
   - 数据通过 LocalStorage 实时持久化，支持“一键重置演示数据”。
