import re
from typing import Dict, Any

# 敏感词与灰产高危词典
HIGH_RISK_KEYWORDS = [
    "刷单", "挂机", "兼职日结", "加微信私聊", "引流", "虚拟币", "代开发票", 
    "高额回报", "带赚", "裸聊", "博彩", "外盘", "洗钱"
]

MEDIUM_RISK_PATTERNS = [
    r"[1-9]\d{4,10}",          # 疑似 QQ 号
    r"[a-zA-Z0-9_-]{6,20}",     # 疑似 微信号
    r"1[3-9]\d{9}",             # 手机号直接暴露
]

def evaluate_skill_safety(title: str, description: str) -> Dict[str, Any]:
    """
    AI 内容合规与风险评估中间件：自动初筛技能卡片
    返回: ai_safety_score (0-100), risk_level, notes
    """
    content = f"{title} {description}"
    found_high_risk = []
    
    for kw in HIGH_RISK_KEYWORDS:
        if kw in content:
            found_high_risk.append(kw)
            
    if found_high_risk:
        return {
            "ai_safety_score": 35,
            "status": "rejected",
            "risk_level": "high",
            "notes": f"触发高危营销/黑灰产风控拦截词：{', '.join(found_high_risk)}"
        }

    # 检查是否直接在公网描述中暴露私信联系方式
    contact_leaks = []
    for pattern in MEDIUM_RISK_PATTERNS:
        if re.search(pattern, content):
            contact_leaks.append(pattern)
            
    if len(contact_leaks) >= 2:
        return {
            "ai_safety_score": 75,
            "status": "pending_review",
            "risk_level": "medium",
            "notes": "检测到描述中疑似直接留有私人社交账号，建议引导通过平台契约机制沟通以防受骗"
        }

    return {
        "ai_safety_score": 98,
        "status": "active",
        "risk_level": "safe",
        "notes": "AI 内容合规检测通过：未发现违规引流、灰产营销或虚假诈骗特征"
    }
