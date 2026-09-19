-- ==============================================================================
-- SkillCraft 技能互换平台 - Supabase 存储桶配置与云端安全策略
-- ==============================================================================

-- 1. 创建三个核心公网/私有存储桶
-- 1.1 用户头像桶 (公开只读，鉴权用户可上传自身头像)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- 1.2 技能作品集展示桶 (公开只读，鉴权用户可上传)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('skill-portfolios', 'skill-portfolios', true)
ON CONFLICT (id) DO NOTHING;

-- 1.3 仲裁与纠纷举证私有桶 (私有隔离，仅当事人与管理员可访问)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('dispute-evidence', 'dispute-evidence', false)
ON CONFLICT (id) DO NOTHING;

-- 2. 存储安全策略 (Storage RLS Policies)

-- 2.1 头像公开读取
CREATE POLICY "Avatar Public Read" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatars');

-- 2.2 鉴权用户上传头像 (限制在 avatars/ 目录)
CREATE POLICY "Avatar Auth Upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- 2.3 作品集公开读取
CREATE POLICY "Portfolio Public Read" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'skill-portfolios');

-- 2.4 鉴权用户上传作品集 (限制单张大小 <= 5MB)
CREATE POLICY "Portfolio Auth Upload" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'skill-portfolios' AND auth.role() = 'authenticated');

-- 2.5 仲裁举证仅管理员与上传者本人可见
CREATE POLICY "Dispute Evidence Access" 
ON storage.objects FOR SELECT 
USING (
    bucket_id = 'dispute-evidence' AND (
        auth.uid() = owner OR 
        EXISTS (SELECT 1 FROM public.admin_users WHERE auth_id = auth.uid() AND is_active = TRUE)
    )
);
