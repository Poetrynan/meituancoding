import os
from pathlib import Path
from dotenv import load_dotenv

# 加载项目根目录下的 .env 文件
ROOT_DIR = Path(__file__).resolve().parent.parent.parent
env_path = ROOT_DIR / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)
else:
    load_dotenv()

class Config:
    # Supabase 配置
    SUPABASE_URL: str = os.getenv("VITE_SUPABASE_URL") or os.getenv("SUPABASE_URL") or "https://sjniqhqkiffehuguotwo.supabase.co"
    SUPABASE_KEY: str = os.getenv("VITE_SUPABASE_ANON_KEY") or os.getenv("SUPABASE_KEY") or "sb_publishable_nzU_ZApj6ZmTr9A0G1J5Hg_XJrYTm6m"
    SUPABASE_JWT_SECRET: str = os.getenv("SUPABASE_JWT_SECRET", "")
    
    # 后端服务端口与主机
    PORT: int = int(os.getenv("PORT", 8000))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    @classmethod
    def get_allowed_origins(cls):
        return [
            "http://localhost:5173",
            "http://localhost:4173",
            "http://127.0.0.1:5173",
            "http://127.0.0.1:4173",
            "*",
        ]
