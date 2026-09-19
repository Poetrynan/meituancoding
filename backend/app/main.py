from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from app.config import Config
from app.services.ai_contract import generate_swap_contract_plan
from app.services.moderation import evaluate_skill_safety
from app.services.matcher import find_direct_matches
import httpx
import uvicorn

app = FastAPI(
    title="SkillCraft 技能互换平台后端服务",
    description="支持 Supabase 云端数据库、AI 智能课纲助教、内容合规初审与供需双轨匹配算法",
    version="1.0.0"
)

# 允许跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==============================================================================
# 请求模型定义 (Pydantic DTO)
# ==============================================================================

class GeneratePlanRequest(BaseModel):
    teach_skill: str
    learn_skill: str
    target_goal: Optional[str] = ""
    level: Optional[str] = "beginner"

class EvaluateSkillRequest(BaseModel):
    title: str
    description: str

class DirectMatchRequest(BaseModel):
    skills: List[Dict[str, Any]]

class PublishSkillRequest(BaseModel):
    user_id: str
    teach_name: str
    teach_category: str
    teach_level: str
    teach_experience_years: str
    teach_description: str
    teach_highlight_tags: List[str] = []
    teach_portfolio_images: List[str] = []
    teaching_mode: str = "both"
    hours_per_session: float = 1.0
    cost_credits: int = 1
    learn_name: str
    learn_category: str
    learn_target_goal: str
    learn_current_level: str

# ==============================================================================
# API 路由接口
# ==============================================================================

@app.get("/")
def read_root():
    return {
        "service": "SkillCraft Backend API",
        "status": "online",
        "database": "Supabase Cloud PostgreSQL",
        "version": "1.0.0",
        "endpoints": [
            "/api/health",
            "/api/skills",
            "/api/contract/generate-plan",
            "/api/skills/evaluate",
            "/api/match/direct",
            "/api/admin/metrics"
        ]
    }

@app.get("/api/health")
async def health_check():
    """
    健康检查与 Supabase 云数据库连通性自测
    """
    db_connected = False
    details = ""
    try:
        headers = {
            "apikey": Config.SUPABASE_KEY,
            "Authorization": f"Bearer {Config.SUPABASE_KEY}"
        }
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(f"{Config.SUPABASE_URL}/rest/v1/skills?select=id&limit=1", headers=headers)
            if resp.status_code == 200:
                db_connected = True
                details = "Supabase 云数据库连接正常 (HTTP 200 OK)"
            else:
                details = f"Supabase 响应状态码: {resp.status_code}"
    except Exception as e:
        details = f"数据库连接探测异常: {str(e)}"

    return {
        "status": "healthy" if db_connected else "degraded",
        "supabase_connected": db_connected,
        "supabase_url": Config.SUPABASE_URL,
        "details": details
    }

@app.post("/api/contract/generate-plan")
def api_generate_contract_plan(req: GeneratePlanRequest):
    """
    AI 智能互换课纲助教：生成 3 阶段结构化教学与打卡验收大纲
    """
    plan = generate_swap_contract_plan(
        teach_skill=req.teach_skill,
        learn_skill=req.learn_skill,
        target_goal=req.target_goal,
        level=req.level
    )
    return {
        "success": True,
        "teach_skill": req.teach_skill,
        "learn_skill": req.learn_skill,
        "milestones": plan
    }

@app.post("/api/skills/evaluate")
def api_evaluate_skill(req: EvaluateSkillRequest):
    """
    AI 内容合规与风险评估中间件
    """
    eval_result = evaluate_skill_safety(req.title, req.description)
    return {
        "success": True,
        **eval_result
    }

@app.post("/api/match/direct")
def api_find_direct_matches(req: DirectMatchRequest):
    """
    天作之合双向镜像直换匹配计算
    """
    matches = find_direct_matches(req.skills)
    return {
        "success": True,
        "matches_count": len(matches),
        "matches": matches
    }

@app.get("/api/skills")
async def api_get_skills():
    """
    从 Supabase 云数据库拉取技能集市列表
    """
    headers = {
        "apikey": Config.SUPABASE_KEY,
        "Authorization": f"Bearer {Config.SUPABASE_KEY}"
    }
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(
                f"{Config.SUPABASE_URL}/rest/v1/skills?select=*&order=created_at.desc",
                headers=headers
            )
            if resp.status_code == 200:
                return {
                    "source": "supabase_cloud",
                    "data": resp.json()
                }
            else:
                return {
                    "source": "fallback",
                    "status_code": resp.status_code,
                    "data": []
                }
    except Exception as e:
        return {
            "source": "fallback_error",
            "error": str(e),
            "data": []
        }

@app.get("/api/admin/metrics")
def api_admin_metrics():
    """
    B 端独立管理后台宏观监控数据
    """
    return {
        "platform_name": "巧遇·匠心 (SkillCraft)",
        "governance_status": "Active & Monitored",
        "cloud_provider": "Supabase (PostgreSQL 16)",
        "security_policy": "Row-Level Security (RLS) Enforced",
        "isolation_model": "Dual-User (public.users vs public.admin_users)",
        "system_version": "1.0.0"
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=Config.HOST, port=Config.PORT, reload=True)
