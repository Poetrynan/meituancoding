import sys
from pathlib import Path

# 将 backend 根目录加入 Python 路径
root_dir = Path(__file__).resolve().parent.parent
backend_dir = root_dir / "backend"
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from app.main import app

# Vercel Serverless 入口暴露 app 对象
# 当请求 /api/* 时，Vercel 会自动将流量路由到此 FastAPI 应用
