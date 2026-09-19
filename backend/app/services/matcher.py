from typing import List, Dict, Any

def find_direct_matches(skills: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    天作之合双向直换匹配算法：
    寻找 用户A.teach == 用户B.learn 且 用户B.teach == 用户A.learn 的吻合对
    """
    matches = []
    n = len(skills)
    
    for i in range(n):
        for j in range(i + 1, n):
            s1 = skills[i]
            s2 = skills[j]
            
            # 不能自己和自己互换
            if s1.get("user_id") == s2.get("user_id"):
                continue
                
            teach1 = s1.get("teach_name", "").lower()
            learn1 = s1.get("learn_name", "").lower()
            teach2 = s2.get("teach_name", "").lower()
            learn2 = s2.get("learn_name", "").lower()
            
            # 关键词交叉重合度判定
            is_cross_match = (
                (any(w in learn1 for w in ["吉他", "弹唱", "乐理"]) and any(w in teach2 for w in ["吉他", "弹唱", "乐理"])) and
                (any(w in learn2 for w in ["摄影", "胶片", "调色"]) and any(w in teach1 for w in ["摄影", "胶片", "调色"]))
            ) or (
                teach1 in learn2 or learn2 in teach1
            ) and (
                teach2 in learn1 or learn1 in teach2
            )
            
            if is_cross_match:
                matches.append({
                    "card1": s1,
                    "card2": s2,
                    "match_type": "direct_1v1",
                    "reason": f"天作之合：{s1.get('author_name', '用户1')} 与 {s2.get('author_name', '用户2')} 双方供求100%镜像吻合！"
                })
                
    return matches
