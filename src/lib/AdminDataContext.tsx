import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminUser,
  AdminRole,
  AuditLog,
  SkillCard,
  DisputeCase,
  PlatformConfig,
  ToastMessage,
} from '../types';
import { INITIAL_SKILLS, INITIAL_DISPUTES, INITIAL_CONFIG } from '../data/seedData';

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'a0000000-0000-0000-0000-000000000001',
    email: 'admin@skillcraft.org',
    displayName: '系统超管·林工',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'super_admin',
    department: '架构与技术中心',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000002',
    email: 'auditor@skillcraft.org',
    displayName: '审核官·苏老师',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'auditor',
    department: '社区安全审核部',
  },
  {
    id: 'a0000000-0000-0000-0000-000000000003',
    email: 'judge@skillcraft.org',
    displayName: '首席仲裁员·高律师',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'arbitrator',
    department: '履约合规仲裁庭',
  },
];

interface AdminDataContextType {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  adminLogin: (email: string, password?: string) => boolean;
  adminLogout: () => void;
  setAdminRole: (role: AdminRole) => void;

  // 技能审核
  skillCards: SkillCard[];
  pendingSkills: SkillCard[];
  auditSkill: (cardId: string, action: 'approve' | 'reject', notes?: string) => void;

  // 纠纷仲裁
  disputes: DisputeCase[];
  pendingDisputes: DisputeCase[];
  arbitrateDispute: (
    disputeId: string,
    verdict: 'refund_student' | 'release_teacher',
    verdictNotes: string
  ) => void;

  // 全局风控
  platformConfig: PlatformConfig;
  updatePlatformConfig: (config: Partial<PlatformConfig>) => void;

  // 审计日志
  auditLogs: AuditLog[];

  // 统计指标
  stats: {
    pendingAudits: number;
    pendingDisputes: number;
    activeSkills: number;
    totalAudited: number;
    emergencyFrozen: boolean;
  };

  // 后台独立轻提示
  toasts: ToastMessage[];
  addAdminToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeAdminToast: (id: string) => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

const ADMIN_STORAGE_KEYS = {
  SESSION: 'skillcraft_admin_session_v1',
  SKILLS: 'skillcraft_skills_v2',
  DISPUTES: 'skillcraft_disputes_v2',
  CONFIG: 'skillcraft_config_v2',
  LOGS: 'skillcraft_admin_audit_logs_v1',
};

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.SESSION);
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS[0]; // 默认保留超管会话，方便体验
  });

  const [skillCards, setSkillCards] = useState<SkillCard[]>(() => {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.SKILLS);
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [disputes, setDisputes] = useState<DisputeCase[]>(() => {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.DISPUTES);
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [platformConfig, setPlatformConfig] = useState<PlatformConfig>(() => {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.CONFIG);
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEYS.LOGS);
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'log-1',
        adminId: INITIAL_ADMIN_USERS[0].id,
        adminName: INITIAL_ADMIN_USERS[0].displayName,
        action: 'system_init',
        targetType: 'config',
        targetId: 'platform_config',
        details: '初始化全量风控与新人津贴参数',
        timestamp: new Date().toLocaleDateString('zh-CN'),
      },
    ];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 同步本地存储
  useEffect(() => {
    if (adminUser) {
      localStorage.setItem(ADMIN_STORAGE_KEYS.SESSION, JSON.stringify(adminUser));
    } else {
      localStorage.removeItem(ADMIN_STORAGE_KEYS.SESSION);
    }
  }, [adminUser]);

  useEffect(() => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.SKILLS, JSON.stringify(skillCards));
  }, [skillCards]);

  useEffect(() => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.DISPUTES, JSON.stringify(disputes));
  }, [disputes]);

  useEffect(() => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.CONFIG, JSON.stringify(platformConfig));
  }, [platformConfig]);

  useEffect(() => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  const addAdminToast = (title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const id = `admin-toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => removeAdminToast(id), 4000);
  };

  const removeAdminToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const adminLogin = (email: string, _password?: string): boolean => {
    const matched = INITIAL_ADMIN_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (matched) {
      setAdminUser(matched);
      addAdminToast('登录成功', `欢迎回来，${matched.displayName} (${matched.role})`, 'success');
      return true;
    }
    // 允许任何以 @skillcraft.org 结尾或任意有效邮箱登录为演示超管
    const newAdmin: AdminUser = {
      id: `admin-${Date.now()}`,
      email: email.trim(),
      displayName: `管理员·${email.split('@')[0]}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'super_admin',
      department: '综合运营中心',
    };
    setAdminUser(newAdmin);
    addAdminToast('登录成功', `以临时超管身份登录: ${newAdmin.displayName}`, 'success');
    return true;
  };

  const adminLogout = () => {
    setAdminUser(null);
    addAdminToast('已退出登录', '安全登出管理系统', 'info');
  };

  const setAdminRole = (role: AdminRole) => {
    if (!adminUser) return;
    setAdminUser({ ...adminUser, role });
    addAdminToast('角色已切换', `当前权限角色: ${role}`, 'info');
  };

  // 审核技能卡
  const auditSkill = (cardId: string, action: 'approve' | 'reject', notes?: string) => {
    setSkillCards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            status: action === 'approve' ? 'active' : 'rejected',
            aiRiskNotes: notes || card.aiRiskNotes,
          };
        }
        return card;
      })
    );

    // 记录审计日志
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      adminId: adminUser?.id || 'sys',
      adminName: adminUser?.displayName || '系统管理员',
      action: action === 'approve' ? 'approve_skill' : 'reject_skill',
      targetType: 'skill',
      targetId: cardId,
      details: action === 'approve' ? '审核通过技能并在集市上架展示' : `驳回技能发布申请，原因: ${notes || '未达到质量标准'}`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    addAdminToast(
      action === 'approve' ? '审核通过' : '已驳回',
      action === 'approve' ? '技能已成功发布至集市' : `原因已记入审计: ${notes || '未填'}`,
      action === 'approve' ? 'success' : 'warning'
    );
  };

  // 裁决纠纷
  const arbitrateDispute = (
    disputeId: string,
    verdict: 'refund_student' | 'release_teacher',
    verdictNotes: string
  ) => {
    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id === disputeId) {
          return {
            ...d,
            status: verdict === 'refund_student' ? 'resolved_refund' : 'resolved_release',
            verdictNotes,
            resolvedAt: new Date().toISOString(),
          };
        }
        return d;
      })
    );

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      adminId: adminUser?.id || 'sys',
      adminName: adminUser?.displayName || '法庭仲裁员',
      action: 'arbitrate_dispute',
      targetType: 'dispute',
      targetId: disputeId,
      details: `裁决结果: ${verdict === 'refund_student' ? '全额退还学员质押币' : '履约有效划转给导师'}，判词: ${verdictNotes}`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    addAdminToast('仲裁裁决完成', `案宗 ${disputeId} 裁决已下达并自动执行划转`, 'success');
  };

  // 更新全局参数
  const updatePlatformConfig = (newConfig: Partial<PlatformConfig>) => {
    setPlatformConfig((prev) => ({ ...prev, ...newConfig }));
    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      adminId: adminUser?.id || 'sys',
      adminName: adminUser?.displayName || '超管',
      action: 'update_config',
      targetType: 'config',
      targetId: 'platform_config',
      details: `修改平台参数: ${JSON.stringify(newConfig)}`,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };
    setAuditLogs((prev) => [newLog, ...prev]);
    addAdminToast('配置已更新', '平台风控与津贴参数已生效', 'success');
  };

  const pendingSkills = skillCards.filter((s) => s.status === 'pending_review');
  const pendingDisputes = disputes.filter((d) => d.status === 'pending');

  const stats = {
    pendingAudits: pendingSkills.length,
    pendingDisputes: pendingDisputes.length,
    activeSkills: skillCards.filter((s) => s.status === 'active').length,
    totalAudited: auditLogs.filter((l) => l.action.includes('skill')).length,
    emergencyFrozen: platformConfig.emergencySwapFreeze,
  };

  return (
    <AdminDataContext.Provider
      value={{
        adminUser,
        isAuthenticated: Boolean(adminUser),
        adminLogin,
        adminLogout,
        setAdminRole,
        skillCards,
        pendingSkills,
        auditSkill,
        disputes,
        pendingDisputes,
        arbitrateDispute,
        platformConfig,
        updatePlatformConfig,
        auditLogs,
        stats,
        toasts,
        addAdminToast,
        removeAdminToast,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
