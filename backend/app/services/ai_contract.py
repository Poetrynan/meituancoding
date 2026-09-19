from typing import List, Dict, Any

def generate_swap_contract_plan(teach_skill: str, learn_skill: str, target_goal: str = "", level: str = "beginner") -> List[Dict[str, Any]]:
    """
    AI 互换课纲助教：自动为双方定制《3阶段结构化履约大纲》
    """
    goal_desc = f"（目标: {target_goal}）" if target_goal else ""
    
    return [
        {
            "step": 1,
            "title": f"破冰筑基：{teach_skill} 核心认知与基本功拆解",
            "description": f"导师针对学员现有认知进行水平摸底，系统拆解 {teach_skill} 基础工具、标准握姿/工作流与避坑指南。学员同步分享 {learn_skill} 学习心得与预期期望{goal_desc}。",
            "estimatedHours": 1.5,
            "deliverable": f"梳理个人学习档案，完成 {teach_skill} 基础动作/环境跑通并录制打卡短视频或学习随堂笔记。"
        },
        {
            "step": 2,
            "title": f"进阶攻坚：核心实战技巧与小作品共创",
            "description": f"针对 {teach_skill} 最易受挫的关键技术卡点（和弦转换/构图测光/逻辑编写等）展开手把手专项纠偏，通过微型案例驱动实操演练。",
            "estimatedHours": 2.0,
            "deliverable": f"独立产出一个具有代表性的初阶成果（如完整弹唱主歌片段、精修1张胶片写真、编写1个自动化测试脚本）。"
        },
        {
            "step": 3,
            "title": f"验收结业：成果交付互评与时光币正式划转",
            "description": f"综合演练与实战答辩，导师对学员最终作品进行细致点评并给出后续自主精进路线图，双方在互换协作看板互相验收打分并解锁荣誉印章。",
            "estimatedHours": 1.5,
            "deliverable": f"提交完整结业大作业作品，双方签署线上验收单，系统智能解冻中枢质押的时光币。"
        }
    ]
