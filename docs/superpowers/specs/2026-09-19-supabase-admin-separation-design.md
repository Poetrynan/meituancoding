# SkillCraft 全栈架构与管理后台彻底分离设计方案

**版本**: 1.0.0  
**日期**: 2026-09-19  
**参考工程**: [Malaysia_Ez_rent](https://github.com/Poetrynan/Malaysia_Ez_rent)  
**设计目标**: 将 SkillCraft 技能互换平台从纯前端内存演示系统演进为云原生、生产就绪的全栈架构，采用 Supabase 云端数据库与对象存储，并将管理后台与前台用户端进行物理与路由级的彻底解耦。

---

## 1. 架构总览与分层设计

平台采用模块化分层架构，吸收 `Malaysia_Ez_rent` 的成功实践：

```
MEITUAN/
├── supabase/                          # Supabase 云端工程规范
│   ├── schema.sql                     # 全量 DDL 建表脚本（双表鉴权、外键约束、RLS）
│   ├── storage.sql                    # 云对象存储桶策略 (avatars, portfolios, evidence)
│   └── seed.sql                       # 预设种子数据（含超管账号与精选技能卡）
├── src/
│   ├── lib/
│   │   ├── supabase.ts                # Supabase 客户端公网初始化 (支持 mock/fallback)
│   │   ├── AdminDataContext.tsx       # 参考 Ez_rent，独立的后台数据中枢
│   │   └── adminAuth.ts               # 后台独立管理员 Token 与 Session 校验
│   ├── components/
│   │   ├── admin/                     # 【独立管理后台模块】
│   │   │   ├── AdminShell.tsx         # 后台专属独立 Shell 骨架（侧边栏、顶栏、面包屑）
│   │   │   ├── AdminLogin.tsx         # 独立管理员门禁（非普通用户登录）
│   │   │   ├── SkillAuditTable.tsx    # 技能发布审核流
│   │   │   ├── DisputeArbitration.tsx # 纠纷仲裁中心
│   │   │   └── PlatformConfigForm.tsx # 时光银行与风控配置
│   │   ├── community/                 # 【前台用户端模块】温暖手作风
│   │   │   ├── SkillMarketplace.tsx
│   │   │   ├── SkillDetailModal.tsx
│   │   │   ├── PublishSkillModal.tsx
│   │   │   └── AIContractModal.tsx
│   │   └── layout/
│   │       ├── Navbar.tsx             # 彻底纯化！100% 移除“切换管理员”等后台开关
│   │       └── Footer.tsx
│   └── App.tsx                        # 路由调度：区分前台 `/` 与后台 `/admin`
```

---

## 2. 数据库建模与 Supabase Schema 设计（对标 Malaysia_Ez_rent）

### 2.1 双表账号体系（彻底分离）
1. **`public.users`（普通用户表）**
   - 字段：`id` (UUID), `email`, `phone`, `full_name`, `avatar_url`, `title`, `bio`, `city`, `time_credits`, `frozen_credits`, `reputation_score`, `taught_hours`, `learned_hours`, `created_at`。
   - 权限：仅可读写属于自己 `auth.uid() = id` 的数据。
2. **`public.admin_users`（平台管理人员表）**
   - 字段：`id` (UUID), `email`, `display_name`, `role` (`super_admin` | `auditor` | `arbitrator`), `department`, `avatar_url`, `created_at`。
   - 权限：拥有全局业务数据的审核、冻结与仲裁权限，与普通用户无重叠。

### 2.2 核心业务实体
- **`public.skills`**：存储我能教的（teach）与我想学的（learn），包含分类、等级、耗时、时光币标价、作品集多媒体 JSONB，以及供 AI 语义匹配的 `teach_embedding` 向量字段。
- **`public.swap_contracts`**：互换契约主体表，记录 `teacher_id`, `student_id`, `swap_type`, `staked_credits`, `status`。
- **`public.contract_milestones`**：里程碑步骤，记录双向确认标记、交付物附件与课后笔记。
- **`public.time_wallets` & `public.time_transactions`**：复式记账钱包与资金流水表，记录每笔授课收入、学习支出、质押冻结与解冻。
- **`public.dispute_cases`**：违约争议案宗，记录原被告、维权诉求、举证图片及仲裁员判词。
- **`public.platform_configs`**：平台风控阈值与新人补贴参数。

### 2.3 云端对象存储（Supabase Storage Buckets）
- `avatars`：公开读，用户个人头像。
- `skill-portfolios`：公开读，作品集成果图。
- `dispute-evidence`：私有读写，仅纠纷当事人与管理员可查。

---

## 3. 前后台解耦与界面规范

### 3.1 前台用户端（纯净手作风）
- 访问地址：`http://localhost:4173/`。
- 导航栏 `Navbar.tsx` 彻底纯化：
  - 彻底删除“切换身份（当前: 用户/管理员）”按钮。
  - 删除所有管理后台角标与切换逻辑。
  - 保留：探索技能、互换契约、时光银行、发布技能、个人头像与时光币余额。

### 3.2 独立管理后台（严谨中后台风格）
- 访问地址：`http://localhost:4173/#/admin` 或 `/admin` 路径。
- **门禁控制（AdminAuthGuard）**：
  - 未登录时呈现独立的 `AdminLogin`（暗灰/商务极简中后台风格，不包含手作风装饰），支持账号密码登录与演示账号快捷注入。
  - 登录后由 `AdminShell` 托管，提供专业侧边栏：
    1. 运营数据看板（Dashboard）
    2. 技能发布审核流（Skill Audit）
    3. 纠纷仲裁法庭（Dispute Arbitration）
    4. 时光银行资金监控（Ledger Monitor）
    5. 全局风控与参数（System Settings）
  - 右上角提供明确的“安全退出登录”与“返回用户主站”按钮。
