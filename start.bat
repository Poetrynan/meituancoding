@echo off
chcp 65001 >nul
echo ==============================================================================
echo   巧遇·匠心 (SkillCraft) 智能技能互换平台 全栈一键启动器
echo   前端服务: http://localhost:4173 (前台)  /  http://localhost:4173/#/admin (后台)
echo   后端 API:  http://127.0.0.1:8000/docs (Swagger 交互式文档)
echo   云数据库: Supabase PostgreSQL 16 (Connected)
echo ==============================================================================

echo [1/2] 正在启动 FastAPI 后端服务 (端口 8000)...
start "SkillCraft Backend (8000)" cmd /k "cd backend && python run.py"

echo [2/2] 正在启动 前端生产预览服务 (端口 4173)...
start "SkillCraft Frontend (4173)" cmd /k "npx vite preview --port 4173 --host"

echo.
echo 所有服务已在新窗口中启动完成！
echo - 前台主站: http://localhost:4173/
echo - 管理控制台: http://localhost:4173/#/admin
echo - 后端接口文档: http://127.0.0.1:8000/docs
echo.
pause
