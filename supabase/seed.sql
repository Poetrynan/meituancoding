-- ==============================================================================
-- SkillCraft 技能互换平台 - Supabase 生产初始化种子数据
-- ==============================================================================

-- 1. 插入独立管理团队成员 (admin_users)
INSERT INTO public.admin_users (id, email, display_name, role, department, avatar_url)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 'admin@skillcraft.org', '系统超管·林工', 'super_admin', '技术与架构中心', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
  ('a0000000-0000-0000-0000-000000000002', 'auditor@skillcraft.org', '内容审核官·苏老师', 'auditor', '社区安全与内容风控部', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80')
ON CONFLICT (email) DO NOTHING;

-- 2. 插入社区核心示范用户 (users)
INSERT INTO public.users (id, email, full_name, avatar_url, title, bio, city, time_credits, reputation_score, taught_hours, learned_hours)
VALUES 
  ('u0000000-0000-0000-0000-000000000001', 'lin@skillcraft.org', '林小羽', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', '独立原声吉他手', '弹琴九年，擅长指弹与即兴伴奏。希望能认识同频小伙伴交换摄影技能。', '北京', 24, 98, 48.0, 12.0),
  ('u0000000-0000-0000-0000-000000000002', 'chen@skillcraft.org', '陈默', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', '资深胶片摄影师', '十万张胶片冲洗沉淀，带你从暗房到构图，用光线捕捉市井生活。', '北京', 18, 96, 36.5, 8.0),
  ('u0000000-0000-0000-0000-000000000003', 'zhang@skillcraft.org', '张师傅', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', '传统榫卯木作匠人', '二十年老木匠，教你从选料、刨削到无钉榫卯搭建经典四出头官帽椅。', '杭州', 35, 99, 62.0, 4.0),
  ('u0000000-0000-0000-0000-000000000004', 'sophia@skillcraft.org', '周小雅', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80', '高山手冲咖啡烘焙师', 'CQI Q-Grader 咖啡品质品鉴师，手把手教你水温、粉水比与感官风味辨识。', '上海', 15, 94, 28.0, 16.0)
ON CONFLICT (email) DO NOTHING;

-- 3. 插入精选技能集市卡片 (skills)
INSERT INTO public.skills (
  id, user_id, 
  teach_name, teach_category, teach_level, teach_experience_years, teach_description, 
  teach_highlight_tags, teach_portfolio_images, teaching_mode, hours_per_session, cost_credits,
  learn_name, learn_category, learn_target_goal, learn_current_level,
  status, ai_safety_score
)
VALUES
(
  's0000000-0000-0000-0000-000000000001',
  'u0000000-0000-0000-0000-000000000001',
  '民谣指弹吉他与即兴伴奏实战', 'music', 'expert', '9年',
  '系统拆解吉他左右手机能与经典指弹风格，带你脱离死记和弦，建立手指肌肉记忆与乐理语感。',
  '["指弹吉他", "乐理即兴", "押尾桑风格", "弹唱编配"]'::jsonb,
  '["https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80"]'::jsonb,
  'both', 1.5, 1,
  '复古人像胶片摄影与 Lightroom 调色', 'photo', '掌握胶片机测光与暗房色调逻辑，能独立拍摄一组室内暖调写真', '零基础入门',
  'active', 98
),
(
  's0000000-0000-0000-0000-000000000002',
  'u0000000-0000-0000-0000-000000000002',
  '街头纪实与复古胶片摄影指南', 'photo', 'expert', '7年',
  '拒绝糖水大片，专注光影故事感、自然光运用与抓拍直觉，包含黑白暗房冲洗原理讲解。',
  '["街头抓拍", "胶片摄影", "构图美学", "自然光掌控"]'::jsonb,
  '["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80"]'::jsonb,
  'both', 2.0, 1,
  '零基础民谣吉他弹唱与乐理', 'music', '能自弹自唱《送别》《晴天》等经典曲目，熟悉标准吉他和弦按法', '零基础小白',
  'active', 99
),
(
  's0000000-0000-0000-0000-000000000003',
  'u0000000-0000-0000-0000-000000000003',
  '手工传统榫卯与微缩实木家具制作', 'craft', 'expert', '20年',
  '体验传统中式大木作的精妙，全程纯手工工具刨削打磨，从简易燕尾榫到精巧鲁班锁。',
  '["传统木工", "榫卯工艺", "手工雕琢", "木工解压"]'::jsonb,
  '["https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=600&auto=format&fit=crop&q=80"]'::jsonb,
  'offline', 3.0, 2,
  'Python 数据可视化与实用自动化脚本', 'tech', '能用 Python 写爬虫抓取行业数据，并用 Matplotlib/Seaborn 绘制专业图表', '入门中',
  'active', 96
)
ON CONFLICT (id) DO NOTHING;

-- 4. 插入全局风控与平台参数 (platform_configs)
INSERT INTO public.platform_configs (config_key, config_value, description)
VALUES 
  ('newUserBonusCredits', '10'::jsonb, '新注册用户赠送的初始时光币'),
  ('teacherRewardSubsidyRate', '0.1'::jsonb, '导师履约完成时平台发放的额外补贴比例 (10%)'),
  ('escrowStakingRatio', '1.0'::jsonb, '发起互换契约时需冻结的时光币质押比例 (100%)'),
  ('emergencySwapFreeze', 'false'::jsonb, '平台全局紧急状态熔断（是否冻结一切互换履约）')
ON CONFLICT (config_key) DO UPDATE SET config_value = EXCLUDED.config_value;
