# SkillCraft (巧遇 · 匠心)

> 以技换技，各取所长。温暖真实的社区技能互换与时光存折流转平台。

---

## 平台架构

- **前端架构**: React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons
- **后端架构**: FastAPI (Python 3.10+) + Pydantic v2 + Serverless API (`/api/index.py`)
- **云端数据库**: Supabase PostgreSQL 16 (Mumbai)
- **部署模式**: Vercel Serverless 全栈部署 (前端静态托管 + Python Serverless API + 云数据库)

---

## 核心功能

1. **技能集市**: 支持 1对1 双向技能互换与时光存折学时流转。分类筛选、同城/线上模式切换与关键词检索。
2. **三阶段学习契约**: 制定清晰的阶梯教学目标与交付成果，双方打卡确认后自动结清课时。
3. **协作看板**: 追踪进行中、已完成与申诉中的互换契约，分步打卡履约。
4. **时光存折**: 记录每一笔授课与求教学时明细，时光币实时流转。
5. **独立管理控制台**: 路由隔离与密码闸门（`#/admin`），支持全站技能卡风险审核、争议调解与经济流动性监测。

---

## 本地开发运行

```bash
# 1. 安装前端依赖
npm install

# 2. 启动前端开发服务
npm run dev

# 3. 启动后端 API 服务
python backend/run.py
```

或在 Windows 环境下直接双击 `start.bat` 一键并发启动全栈服务。

---

## Vercel 一键云端部署

本项目已预置 `vercel.json`、`api/index.py` 与 `requirements.txt`，完美兼容 Vercel 全栈部署：

1. 登录 [Vercel](https://vercel.com/)，点击 **Add New... -> Project**。
2. 导入 GitHub 仓库 **`https://github.com/Poetrynan/skillcraft`**。
3. Framework Preset 选择 **Vite**，Root Directory 保持 `./`。
4. 在 **Environment Variables** 添加以下环境变量：
   - `SUPABASE_URL`: `https://sjniqhqkiffehuguotwo.supabase.co`
   - `SUPABASE_ANON_KEY`: 填入你的 Supabase Publishable Key
   - `JWT_SECRET`: 填入生产环境密钥（如 `skillcraft-prod-secret-2026`）
5. 点击 **Deploy**，等待部署完成后即可通过 Vercel 分配的公网域名全球访问！
