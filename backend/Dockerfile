FROM python:3.11-slim

WORKDIR /app

# 安装依赖
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 复制代码
COPY backend/ /app/backend/
COPY .env /app/.env

WORKDIR /app/backend

EXPOSE 8000

CMD ["python", "run.py"]
