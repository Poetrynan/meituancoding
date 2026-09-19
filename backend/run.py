import uvicorn
import sys
import os

# 将 backend 目录加入到 Python 模块查找路径
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("==================================================================")
    print("  SkillCraft Backend API Service Starting...")
    print("  Host: http://127.0.0.1:8000")
    print("  API Docs (Swagger UI): http://127.0.0.1:8000/docs")
    print("  Cloud Database: Supabase PostgreSQL 16 (Connected)")
    print("==================================================================")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
