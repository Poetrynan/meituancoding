# 巧遇·匠心 (SkillCraft) 智能技能互换平台 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个基于 React + Vite + Tailwind CSS 的“温暖社区手作风”智能技能互换与时间银行平台（SkillCraft），具备双轨匹配、AI 互换课纲助教、履约质押协作工作台、个人时间银行与全功能管理后台控制台。

**Architecture:** 前端采用单页组件化架构，以 React Context 为响应式状态内核，配合 LocalStorage 实现完整的数据生命周期持久化与重置。UI 层深度定制“温暖手作”设计语言（陶土暖红、亚麻卡纸、复古森林绿、图章印鉴与手账贴纸）。支持前台互助社区（技能集市、发布向导、AI 课纲助手、履约工作台、时光银行）与管理后台控制台（宏观大盘、技能风控审核、纠纷仲裁法庭、时间银行通胀调控）一键无缝双模态切换。

**Tech Stack:** React 18/19, Vite, TypeScript, Tailwind CSS, Lucide Icons, Canvas-Confetti

**Spec:** [docs/superpowers/specs/2026-09-19-skill-exchange-platform-design.md](file:///c:/Users/ZhuanZ1/Desktop/MEITUAN/docs/superpowers/specs/2026-09-19-skill-exchange-platform-design.md)

## Global Constraints

- 严禁占位符代码（禁止 TODO / TBD / 伪代码），所有组件必须功能完备、逻辑闭环。
- 采用温暖社区手作风配色体系（亚麻卡纸底色 `#FAF6F0` / 陶土红 `#9E5A44` / 森林绿 `#3B5B43` / 暖琥珀 `#D99636` / 水墨黑 `#2C2825`）。
- 状态操作实时响应且持久化至 LocalStorage，随时支持“重置为初始演示数据”。
- 必须具备前台社区与后台管理员的双模态自由切换能力。

---

### Task 1: 项目骨架初始化与手作风 Tailwind 样式系统配置

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/index.css`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`

**Interfaces:**
- Produces: 基础可运行的 Vite + React + Tailwind CSS 运行环境与温暖手作设计系统基础类（纸张纹理、缝线边框、图章样式等）。

- [ ] **Step 1: 创建 package.json 并声明依赖**
- [ ] **Step 2: 创建 vite.config.ts、tsconfig.json、postcss.config.js**
- [ ] **Step 3: 配置 tailwind.config.js 与 src/index.css 注入手作风格主题色与样式**
- [ ] **Step 4: 安装依赖并验证开发服务器可构建打包**
- [ ] **Step 5: 提交基础工程结构至 git**

---

### Task 2: 领域数据模型与真实生活化种子数据 (Types & Seed Data)

**Files:**
- Create: `src/types/index.ts`
- Create: `src/data/seedData.ts`

**Interfaces:**
- Produces: `UserProfile`, `SkillCard`, `SwapContract`, `ContractMilestone`, `DisputeCase`, `TimeTransaction`, `PlatformMetrics`, `INITIAL_USERS`, `INITIAL_SKILLS`, `INITIAL_CONTRACTS`, `INITIAL_DISPUTES`, `INITIAL_TRANSACTIONS`.

- [ ] **Step 1: 编写 src/types/index.ts 导出完整数据类型定义**
- [ ] **Step 2: 编写 src/data/seedData.ts 包含吉他指弹、Python爬虫、手冲咖啡、胶片暗房、日式便当、插画等丰富真实生活数据与示例契约、纠纷工单**
- [ ] **Step 3: 运行类型检查确保无类型错误**
- [ ] **Step 4: 提交数据模型与种子数据至 git**

---

### Task 3: 核心状态机 Context 与持久化管理 (AppContext & Storage)

**Files:**
- Create: `src/context/AppContext.tsx`

**Interfaces:**
- Consumes: `src/types/index.ts`, `src/data/seedData.ts`
- Produces: `useApp()` hook, 包含用户状态、角色切换(`user` | `admin`)、技能卡 CRUD、AI契约签署、打卡履约、仲裁判定、时光币出入账及数据一键重置功能。

- [ ] **Step 1: 编写 AppContext 状态机结构与 LocalStorage 缓存同步**
- [ ] **Step 2: 实现互换流程逻辑（发起互换、质押扣币、课时打卡、全完结释放划转、发起纠纷、管理员仲裁）**
- [ ] **Step 3: 实现管理员审核流逻辑（技能审批/驳回、平台宏观参数调节）**
- [ ] **Step 4: 提交 AppContext 状态机至 git**

---

### Task 4: 顶部温暖手作导航与前后台模态切换 (Navbar & Identity Header)

**Files:**
- Create: `src/components/common/Navbar.tsx`
- Create: `src/components/common/Toast.tsx`

**Interfaces:**
- Consumes: `useApp()` hook
- Produces: 手作质感顶部栏（品牌印章、Tab切换、时光星余额胶囊、前台/后台一键切换胶囊、当前身份切换下拉）、全局贴纸通知 Toast。

- [ ] **Step 1: 编写 Toast 通知组件**
- [ ] **Step 2: 编写 Navbar 组件，实现手作色系与“前台互换社区 ⇄ 后台管理中枢”无缝切换**
- [ ] **Step 3: 提交导航与通知组件至 git**

---

### Task 5: 技能市集广场与双轨智能匹配推荐 (SkillMarketplace & Direct Match)

**Files:**
- Create: `src/components/community/SkillMarketplace.tsx`
- Create: `src/components/community/SkillCardItem.tsx`
- Create: `src/components/community/SkillDetailModal.tsx`

**Interfaces:**
- Consumes: `useApp()` hook, `SkillCard`, `UserProfile`
- Produces:
  - “天作之合”双向契合高光推荐卡（高亮连线与浪漫互换标识）
  - 6大生活手作分类 Tab（音乐、编程、手作、摄影、语言、美学）
  - 线上/线下筛选与关键词模糊搜索
  - 拍立得手作质感技能卡片
  - 技能卡片详情抽屉（作品图集、导师信任画像、课纲预览、发起互换入口）

- [ ] **Step 1: 编写 SkillCardItem 呈现拍立得相框、图章标签与信用徽章**
- [ ] **Step 2: 编写 SkillDetailModal 呈现深度信息与作品墙**
- [ ] **Step 3: 编写 SkillMarketplace 实现双向契合高光计算、分类过滤、搜索与列表渲染**
- [ ] **Step 4: 提交技能市集模块至 git**

---

### Task 6: 技能发布向导与 AI 卖点润色助手 (PublishSkillModal & AI Copilot)

**Files:**
- Create: `src/components/community/PublishSkillModal.tsx`

**Interfaces:**
- Consumes: `useApp()` hook, `publishSkill()`
- Produces: 步骤式/卡片式发布表单（教什么、学什么、教学模式、作品凭证），以及核心特色“✨ AI 卖点润色与课纲提炼助手”。

- [ ] **Step 1: 编写发布表单 UI（我能教的、我想学的、时长与模式）**
- [ ] **Step 2: 实现 AI 卖点提炼与智能润色动效（分析输入并一键升华描述，生成建议大纲）**
- [ ] **Step 3: 表单提交触发生效（进入审核流或直接发布），附带彩带 Confetti 动效**
- [ ] **Step 4: 提交发布向导至 git**

---

### Task 7: AI 互换学习契约助教与 3 阶课纲生成 (AIContractModal)

**Files:**
- Create: `src/components/community/AIContractModal.tsx`

**Interfaces:**
- Consumes: `useApp()` hook, `createContract()`
- Produces: 智能契约生成弹窗，包含双方技能分析、AI 自动生成的 3 阶段结构化教学大纲（破冰筑基、核心实战、成果验收）、质押规则明确与双向确认签署。

- [ ] **Step 1: 编写契约模态框与 AI 阶段课纲展示 UI**
- [ ] **Step 2: 支持用户微调大纲标题与交付要求**
- [ ] **Step 3: 实现质押冻结确认（时光币/双向信用质押）并流转至工作台**
- [ ] **Step 4: 提交 AI 契约生成模块至 git**

---

### Task 8: 互换协作看板与履约质押打卡 (SwapWorkbench & Dispute)

**Files:**
- Create: `src/components/community/SwapWorkbench.tsx`
- Create: `src/components/community/DisputeModal.tsx`

**Interfaces:**
- Consumes: `useApp()` hook, `completeMilestone()`, `fileDispute()`
- Produces: 互换协作看板，包含进行中、已结课、申诉中各状态卡片，手绘打卡圆环、课后心得/笔记打卡提交、全完成自动解冻质押、发起违约纠纷申诉。

- [ ] **Step 1: 编写 SwapWorkbench 状态分类看板与进度环**
- [ ] **Step 2: 编写打卡签到抽屉（支持上传课堂感悟与产出物）与自动结算释放逻辑**
- [ ] **Step 3: 编写 DisputeModal 争议工单申诉入口**
- [ ] **Step 4: 提交互换协作工作台至 git**

---

### Task 9: 个人时光银行与手账荣誉墙 (TimeBankProfile & Passbook)

**Files:**
- Create: `src/components/community/TimeBankProfile.tsx`

**Interfaces:**
- Consumes: `useApp()` hook, `currentUser`, `transactions`
- Produces: 复古存折风个人时光银行看板（余额、授课积累、学成支出）、存折收支明细单据流水、手账勋章墙与口碑画像。

- [ ] **Step 1: 编写复古存折风资产总览与数据卡片**
- [ ] **Step 2: 编写时光交易流水明细表格**
- [ ] **Step 3: 编写手账质感徽章墙与互评历史展示**
- [ ] **Step 4: 提交个人时光银行模块至 git**

---

### Task 10: 管理后台中枢：风控审核、争议仲裁与宏观调控 (AdminDashboard)

**Files:**
- Create: `src/components/admin/AdminDashboard.tsx`
- Create: `src/components/admin/SkillAuditTable.tsx`
- Create: `src/components/admin/DisputeArbitrationCourt.tsx`
- Create: `src/components/admin/TokenomicsControl.tsx`

**Interfaces:**
- Consumes: `useApp()` hook, `approveSkill()`, `rejectSkill()`, `arbitrateDispute()`, `updatePlatformConfig()`
- Produces:
  - 平台运营 KPI 看板（用户、契约、双向契合率、履约成功率）
  - 技能内容安全与合规审核流（AI 风险初筛、一键批准/驳回）
  - 互换纠纷仲裁法庭（对照双方 AI 学习契约与打卡凭证，一键裁判退款或放款）
  - 时间银行通胀与激励参数调控器

- [ ] **Step 1: 编写 AdminDashboard 主框架与 KPI 指标卡**
- [ ] **Step 2: 编写 SkillAuditTable 技能审核工作流**
- [ ] **Step 3: 编写 DisputeArbitrationCourt 纠纷仲裁法庭**
- [ ] **Step 4: 编写 TokenomicsControl 时间银行宏观调控组件**
- [ ] **Step 5: 提交管理后台中枢至 git**

---

### Task 11: 主入口组装、整体验收与上线验证 (App Integration & Verification)

**Files:**
- Create: `src/App.tsx`
- Create: `src/main.tsx`

**Interfaces:**
- Consumes: All components & `AppContext`
- Produces: 完整无瑕疵运行的单页应用，具备全屏响应式、无缝双模态切换、数据重置演练与完整业务闭环。

- [ ] **Step 1: 在 src/App.tsx 组织前台各视图与后台控制台路由流转**
- [ ] **Step 2: 运行 npm run build 进行静态打包与类型检测验证**
- [ ] **Step 3: 启动开发服务器并端到端验证核心交互闭环**
- [ ] **Step 4: 完善演示与使用说明文档并最终提交**
