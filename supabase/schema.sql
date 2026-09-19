-- ==============================================================================
-- SkillCraft 技能互换平台 - Supabase 生产级云数据库 Schema
-- 架构标准：对标 Malaysia_Ez_rent 双表隔离与金融级复式记账规范
-- 适用环境：Supabase (PostgreSQL 15+/16+) / 兼容全版本 PostgreSQL
-- ==============================================================================

-- 1. 基础扩展 (UUID)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 尝试启用 vector 扩展（Supabase 中官方插件名为 vector，而非 pgvector）
DO $$
BEGIN
    CREATE EXTENSION IF NOT EXISTS "vector";
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'vector 插件未就绪，技能嵌入将使用原生 JSONB/数组存储';
END $$;

-- ==============================================================================
-- 2. 账号体系彻底物理隔离（普通用户 vs 管理员）
-- ==============================================================================

-- 2.1 普通用户表（学员与导师）
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE,                                            -- 关联 Supabase auth.users.id
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(32) UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT DEFAULT '',
    title VARCHAR(128) DEFAULT '',
    bio TEXT DEFAULT '',
    city VARCHAR(64) NOT NULL DEFAULT '全国',
    latitude NUMERIC(10, 6),
    longitude NUMERIC(10, 6),
    time_credits INT NOT NULL DEFAULT 10 CHECK (time_credits >= 0), -- 可用时光币余额
    frozen_credits INT NOT NULL DEFAULT 0 CHECK (frozen_credits >= 0),-- 质押冻结中时光币
    reputation_score INT NOT NULL DEFAULT 85 CHECK (reputation_score BETWEEN 0 AND 100),
    completed_exchanges INT NOT NULL DEFAULT 0,
    taught_hours NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    learned_hours NUMERIC(8, 2) NOT NULL DEFAULT 0.00,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'frozen', 'banned')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2.2 平台管理人员表（独立运营团队，物理隔离）
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id UUID UNIQUE,                                            -- 关联 Supabase auth.users.id
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url TEXT DEFAULT '',
    role VARCHAR(32) NOT NULL DEFAULT 'auditor' CHECK (
        role IN ('super_admin', 'auditor', 'arbitrator', 'operator')
    ),
    department VARCHAR(64) DEFAULT '社区运营中心',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 3. 技能集市与双向供需实体
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    
    -- 我能教的 (Teach Skill)
    teach_name VARCHAR(128) NOT NULL,
    teach_category VARCHAR(32) NOT NULL CHECK (
        teach_category IN ('music', 'tech', 'craft', 'photo', 'language', 'life')
    ),
    teach_level VARCHAR(20) NOT NULL CHECK (
        teach_level IN ('beginner', 'intermediate', 'expert')
    ),
    teach_experience_years VARCHAR(32) NOT NULL,
    teach_description TEXT NOT NULL,
    teach_highlight_tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    teach_portfolio_images JSONB NOT NULL DEFAULT '[]'::jsonb,
    teaching_mode VARCHAR(20) NOT NULL CHECK (
        teaching_mode IN ('online', 'offline', 'both')
    ),
    hours_per_session NUMERIC(4, 1) NOT NULL DEFAULT 1.0,
    cost_credits INT NOT NULL DEFAULT 1 CHECK (cost_credits >= 0),

    -- 我想学的 (Learn Skill)
    learn_name VARCHAR(128) NOT NULL,
    learn_category VARCHAR(32) NOT NULL CHECK (
        learn_category IN ('music', 'tech', 'craft', 'photo', 'language', 'life')
    ),
    learn_target_goal TEXT NOT NULL,
    learn_current_level VARCHAR(64) NOT NULL,

    -- 审核流与 AI 安全风控
    status VARCHAR(20) NOT NULL DEFAULT 'pending_review' CHECK (
        status IN ('pending_review', 'active', 'rejected', 'closed')
    ),
    ai_safety_score INT NOT NULL DEFAULT 95 CHECK (ai_safety_score BETWEEN 0 AND 100),
    ai_risk_notes TEXT DEFAULT NULL,
    rejection_reason TEXT DEFAULT NULL,
    audited_by UUID REFERENCES public.admin_users(id),
    audited_at TIMESTAMP WITH TIME ZONE,

    -- AI 向量语义嵌入（采用通用 JSONB 格式，无须强依赖外部 C 扩展，直接存储 1536 维浮点数组）
    teach_embedding JSONB NOT NULL DEFAULT '[]'::jsonb,
    learn_embedding JSONB NOT NULL DEFAULT '[]'::jsonb,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_skills_status_cat ON public.skills(status, teach_category);
CREATE INDEX IF NOT EXISTS idx_skills_user_id ON public.skills(user_id);

-- ==============================================================================
-- 4. 互换契约与里程碑执行状态机
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.swap_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_no VARCHAR(64) UNIQUE NOT NULL,                       -- 业务编号 SC_YYYYMMDD_xxxx
    title VARCHAR(255) NOT NULL,
    teacher_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    skill_card_id UUID REFERENCES public.skills(id) ON DELETE SET NULL,
    
    teach_skill_name VARCHAR(128) NOT NULL,
    learn_skill_name VARCHAR(128) NOT NULL,
    swap_type VARCHAR(20) NOT NULL CHECK (swap_type IN ('direct_1v1', 'time_credit')),
    staked_credits INT NOT NULL DEFAULT 0 CHECK (staked_credits >= 0),
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending_acceptance' CHECK (
        status IN ('pending_acceptance', 'active', 'completed', 'disputed', 'cancelled')
    ),
    dispute_case_id UUID,

    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contracts_teacher ON public.swap_contracts(teacher_id);
CREATE INDEX IF NOT EXISTS idx_contracts_student ON public.swap_contracts(student_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON public.swap_contracts(status);

-- 4.2 契约里程碑步骤
CREATE TABLE IF NOT EXISTS public.contract_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_id UUID NOT NULL REFERENCES public.swap_contracts(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title VARCHAR(128) NOT NULL,
    description TEXT NOT NULL,
    estimated_hours NUMERIC(4, 1) NOT NULL DEFAULT 1.0,
    deliverable TEXT NOT NULL,
    
    completed_by_teacher BOOLEAN NOT NULL DEFAULT FALSE,
    teacher_completed_at TIMESTAMP WITH TIME ZONE,
    
    completed_by_student BOOLEAN NOT NULL DEFAULT FALSE,
    student_completed_at TIMESTAMP WITH TIME ZONE,
    student_notes TEXT,
    deliverable_urls JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_milestones_contract_step ON public.contract_milestones(contract_id, step_number);

-- ==============================================================================
-- 5. 时光银行资产钱包与金融级记账流水
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.time_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_no VARCHAR(64) UNIQUE NOT NULL,                   -- 交易流水号 TX_xxx
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    counterparty_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    type VARCHAR(32) NOT NULL CHECK (type IN (
        'teach_income',     -- 授课收入
        'learn_expense',    -- 学习支出
        'system_gift',      -- 系统赠送
        'escrow_lock',      -- 质押锁定
        'escrow_release',   -- 履约释放
        'dispute_refund'    -- 争议退款
    )),
    amount INT NOT NULL,                                          -- 变动数额（正负）
    balance_after INT NOT NULL,                                   -- 变动后可用余额
    related_contract_id UUID REFERENCES public.swap_contracts(id) ON DELETE SET NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_time ON public.time_transactions(user_id, created_at DESC);

-- ==============================================================================
-- 6. 纠纷维权仲裁法庭与全局风控审计
-- ==============================================================================

-- 6.1 仲裁案宗表
CREATE TABLE IF NOT EXISTS public.dispute_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dispute_no VARCHAR(64) UNIQUE NOT NULL,                       -- 仲裁编号 DP_xxx
    contract_id UUID NOT NULL REFERENCES public.swap_contracts(id) ON DELETE RESTRICT,
    plaintiff_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    defendant_id UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
    
    reason VARCHAR(255) NOT NULL,
    evidence_text TEXT NOT NULL,
    evidence_images JSONB NOT NULL DEFAULT '[]'::jsonb,
    
    status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (
        status IN ('pending', 'investigating', 'resolved_refund', 'resolved_release', 'rejected')
    ),
    arbitrator_id UUID REFERENCES public.admin_users(id),
    verdict_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6.2 管理员操作审计追踪表
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES public.admin_users(id) ON DELETE RESTRICT,
    action VARCHAR(64) NOT NULL,
    target_type VARCHAR(32) NOT NULL,
    target_id VARCHAR(64) NOT NULL,
    detail_payload JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6.3 平台全局风控与补贴参数表
CREATE TABLE IF NOT EXISTS public.platform_configs (
    config_key VARCHAR(64) PRIMARY KEY,
    config_value JSONB NOT NULL,
    description VARCHAR(255),
    updated_by UUID REFERENCES public.admin_users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- 7. 行级安全策略 (Row Level Security - RLS)
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swap_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contract_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dispute_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active skills" ON public.skills FOR SELECT USING (status = 'active');
CREATE POLICY "Public read users" ON public.users FOR SELECT USING (status = 'active');
CREATE POLICY "Admins full skills" ON public.skills FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE auth_id = auth.uid() AND is_active = TRUE)
);
CREATE POLICY "Admins full disputes" ON public.dispute_cases FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE auth_id = auth.uid() AND is_active = TRUE)
);
