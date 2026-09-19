import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  SkillCard,
  SwapContract,
  ContractMilestone,
  DisputeCase,
  TimeTransaction,
  PlatformConfig,
  ToastMessage,
  Role,
} from '../types';
import {
  INITIAL_CURRENT_USER,
  INITIAL_USERS,
  INITIAL_SKILLS,
  INITIAL_CONTRACTS,
  INITIAL_DISPUTES,
  INITIAL_TRANSACTIONS,
  INITIAL_CONFIG,
} from '../data/seedData';

interface AppContextType {
  // 基础身份与全局视图
  users: UserProfile[];
  currentUser: UserProfile;
  currentRole: Role;
  activeTab: string;
  toasts: ToastMessage[];
  setCurrentRole: (role: Role) => void;
  setActiveTab: (tab: string) => void;
  switchUser: (userId: string) => void;
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
  resetAllData: () => void;

  // 技能集市
  skillCards: SkillCard[];
  publishSkill: (newSkillData: any) => SkillCard;
  auditSkillCard: (cardId: string, action: 'approve' | 'reject', notes?: string) => void;

  // 互换契约与履约协作
  contracts: SwapContract[];
  createSwapContract: (data: {
    teacherId: string;
    studentId: string;
    teachSkillName: string;
    learnSkillName: string;
    swapType: 'direct_1v1' | 'time_credit';
    stakedCredits: number;
    milestones: ContractMilestone[];
  }) => SwapContract;
  completeMilestone: (
    contractId: string,
    step: number,
    role: 'teacher' | 'student',
    studentNotes?: string
  ) => void;

  // 纠纷仲裁
  disputes: DisputeCase[];
  fileDispute: (contractId: string, reason: string, evidenceText: string) => void;
  arbitrateDispute: (
    disputeId: string,
    verdict: 'refund_student' | 'release_teacher',
    verdictNotes: string
  ) => void;

  // 时光银行
  transactions: TimeTransaction[];
  platformConfig: PlatformConfig;
  updatePlatformConfig: (config: Partial<PlatformConfig>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'skillcraft_users_v2',
  CURRENT_USER_ID: 'skillcraft_current_user_id_v2',
  ROLE: 'skillcraft_role_v2',
  ACTIVE_TAB: 'skillcraft_active_tab_v2',
  SKILLS: 'skillcraft_skills_v2',
  CONTRACTS: 'skillcraft_contracts_v2',
  DISPUTES: 'skillcraft_disputes_v2',
  TRANSACTIONS: 'skillcraft_transactions_v2',
  CONFIG: 'skillcraft_config_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 状态初始化（优先从 localStorage 获取，否则使用默认种子数据）
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
    return saved || INITIAL_CURRENT_USER.id;
  });

  const [currentRole, setCurrentRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as Role) || 'user';
  });

  const [activeTab, setActiveTabState] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
    return saved || 'marketplace';
  });

  const [skillCards, setSkillCards] = useState<SkillCard[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    if (!saved) return INITIAL_SKILLS;
    try {
      const parsed: SkillCard[] = JSON.parse(saved);
      // 自愈修复：替换任何过期的 404 图片与旧缓存，保证用户无缝获得最佳展示
      return parsed.map((card) => {
        const imgs = card.teachSkill.portfolioImages?.map((url) =>
          url.includes('photo-1579783902614-a3fb3927b675')
            ? 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80'
            : url
        );
        return {
          ...card,
          teachSkill: {
            ...card.teachSkill,
            portfolioImages: imgs,
          },
        };
      });
    } catch {
      return INITIAL_SKILLS;
    }
  });

  const [contracts, setContracts] = useState<SwapContract[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONTRACTS);
    return saved ? JSON.parse(saved) : INITIAL_CONTRACTS;
  });

  const [disputes, setDisputes] = useState<DisputeCase[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DISPUTES);
    return saved ? JSON.parse(saved) : INITIAL_DISPUTES;
  });

  const [transactions, setTransactions] = useState<TimeTransaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [platformConfig, setPlatformConfigState] = useState<PlatformConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    return saved ? JSON.parse(saved) : INITIAL_CONFIG;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // 状态自动持久化
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skillCards));
  }, [skillCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTRACTS, JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISPUTES, JSON.stringify(disputes));
  }, [disputes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(platformConfig));
  }, [platformConfig]);

  // 当前用户对象
  const currentUser = users.find((u) => u.id === currentUserId) || users[0] || INITIAL_CURRENT_USER;

  // 全局 Toast 提示通知
  const addToast = (
    title: string,
    description?: string,
    type: ToastMessage['type'] = 'success'
  ) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // 切换角色视角（前台 ⇄ 后台）
  const setCurrentRole = (role: Role) => {
    setCurrentRoleState(role);
    if (role === 'admin') {
      setActiveTabState('admin');
      addToast('已切换至【管理后台中枢】', '您现在拥有社区审核、仲裁判决与经济宏观调控权限', 'info');
    } else {
      setActiveTabState('marketplace');
      addToast('已返回【巧遇·温暖社区】', '以邻里居民身份探索技能与发起互换', 'success');
    }
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
  };

  // 切换模拟居民
  const switchUser = (userId: string) => {
    const found = users.find((u) => u.id === userId);
    if (found) {
      setCurrentUserId(userId);
      addToast(`已切换当前登录身份为「${found.name}」`, found.title, 'info');
    }
  };

  // 发布技能卡
  const publishSkill = (newSkillData: any): SkillCard => {
    const id = `skill-${Date.now()}`;
    const desc = (newSkillData.teachSkill?.description || '') + (newSkillData.teachSkill?.name || '');

    // 智能风险初筛规则
    const isRisky =
      desc.includes('挂机') ||
      desc.includes('刷量') ||
      desc.includes('日入') ||
      desc.includes('引流') ||
      desc.includes('加V');

    const safetyScore = isRisky ? 35 : 98;
    const initialStatus = isRisky ? 'pending_review' : 'active';

    const newCard: SkillCard = {
      id,
      userId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorCity: currentUser.city,
      authorReputation: currentUser.reputationScore,
      authorBio: currentUser.bio,
      teachSkill: {
        name: newSkillData.teachSkill.name,
        category: newSkillData.teachSkill.category || 'tech',
        level: newSkillData.teachSkill.level || 'intermediate',
        yearsOfExperience: newSkillData.teachSkill.yearsOfExperience || '1年经验',
        description: newSkillData.teachSkill.description,
        highlightTags: newSkillData.teachSkill.highlightTags || ['实战分享'],
        portfolioImages:
          newSkillData.teachSkill.portfolioImages?.length > 0
            ? newSkillData.teachSkill.portfolioImages
            : ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80'],
        teachingMode: newSkillData.teachSkill.teachingMode || 'online',
        hoursPerSession: newSkillData.teachSkill.hoursPerSession || 1.5,
        costCredits: newSkillData.teachSkill.costCredits || 1,
      },
      learnSkill: {
        name: newSkillData.learnSkill.name,
        category: newSkillData.learnSkill.category || 'life',
        targetGoal: newSkillData.learnSkill.targetGoal,
        currentLevel: newSkillData.learnSkill.currentLevel || '零基础入门',
      },
      status: initialStatus,
      aiSafetyScore: safetyScore,
      aiRiskNotes: isRisky ? 'AI 识别到营销引流词，已移交管理员进行合规复核。' : undefined,
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    };

    setSkillCards((prev) => [newCard, ...prev]);

    if (isRisky) {
      addToast('技能卡已提交审核', 'AI 识别到部分表述包含敏感词，将由管理员合规审核后上架', 'warning');
    } else {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#9E5A44', '#D99636', '#3B5B43'],
        });
      } catch (e) {
        // ignore
      }
      addToast('技能卡发布成功！', '您的技能已在集市上架，等待有缘人发起互换', 'success');
    }

    return newCard;
  };

  // 管理员审核技能卡
  const auditSkillCard = (cardId: string, action: 'approve' | 'reject', notes?: string) => {
    setSkillCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          return {
            ...c,
            status: action === 'approve' ? 'active' : 'rejected',
            aiRiskNotes: notes || c.aiRiskNotes,
          };
        }
        return c;
      })
    );

    addToast(
      action === 'approve' ? '技能卡审核通过' : '技能卡已驳回',
      `卡片 ID: ${cardId}，状态已更新`,
      action === 'approve' ? 'success' : 'info'
    );
  };

  // 发起并创建互换契约（含时光币质押）
  const createSwapContract = (data: {
    teacherId: string;
    studentId: string;
    teachSkillName: string;
    learnSkillName: string;
    swapType: 'direct_1v1' | 'time_credit';
    stakedCredits: number;
    milestones: ContractMilestone[];
  }): SwapContract => {
    const teacher = users.find((u) => u.id === data.teacherId) || currentUser;
    const student = users.find((u) => u.id === data.studentId) || currentUser;

    const contractId = `contract-${Date.now()}`;
    const newContract: SwapContract = {
      id: contractId,
      title: `${data.teachSkillName} · 3阶段互换契约`,
      teacherId: data.teacherId,
      studentId: data.studentId,
      teacherName: teacher.name,
      studentName: student.name,
      teacherAvatar: teacher.avatar,
      studentAvatar: student.avatar,
      teachSkillName: data.teachSkillName,
      learnSkillName: data.learnSkillName,
      swapType: data.swapType,
      stakedCredits: data.stakedCredits,
      milestones: data.milestones,
      status: 'active',
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
      lastUpdated: new Date().toLocaleString('zh-CN', { hour12: false }),
    };

    // 质押冻结时光币
    if (data.swapType === 'time_credit' && data.stakedCredits > 0) {
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === data.studentId) {
            return {
              ...u,
              timeCredits: Math.max(0, u.timeCredits - data.stakedCredits),
            };
          }
          return u;
        })
      );

      const newTx: TimeTransaction = {
        id: `tx-${Date.now()}`,
        userId: data.studentId,
        type: 'escrow_lock',
        amount: -data.stakedCredits,
        balanceAfter: Math.max(0, student.timeCredits - data.stakedCredits),
        description: `签署《${data.teachSkillName}》契约，系统质押锁定学时币`,
        relatedContractId: contractId,
        date: new Date().toLocaleString('zh-CN', { hour12: false }),
      };
      setTransactions((prev) => [newTx, ...prev]);
    }

    setContracts((prev) => [newContract, ...prev]);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D99636', '#9E5A44', '#3B5B43'],
      });
    } catch (e) {
      // ignore
    }

    addToast(
      '互换契约签署成功！',
      `双方进入履约协作阶段，已锁定 ${data.stakedCredits} 时光币质押金`,
      'success'
    );

    setActiveTabState('workbench');
    return newContract;
  };

  // 完成课时打卡签到
  const completeMilestone = (
    contractId: string,
    step: number,
    role: 'teacher' | 'student',
    studentNotes?: string
  ) => {
    let contractToFinish: SwapContract | null = null;

    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          const updatedMilestones = c.milestones.map((m) => {
            if (m.step === step) {
              const updated = {
                ...m,
                completedByTeacher: role === 'teacher' ? true : m.completedByTeacher,
                completedByStudent: role === 'student' ? true : m.completedByStudent,
                studentNotes: studentNotes || m.studentNotes,
                completedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
              };
              return updated;
            }
            return m;
          });

          // 判断是否所有里程碑均已完成
          const allCompleted = updatedMilestones.every(
            (m) => m.completedByTeacher && m.completedByStudent
          );

          const updatedContract: SwapContract = {
            ...c,
            milestones: updatedMilestones,
            status: allCompleted ? 'completed' : c.status,
            lastUpdated: new Date().toLocaleString('zh-CN', { hour12: false }),
          };

          if (allCompleted && c.status !== 'completed') {
            contractToFinish = updatedContract;
          }

          return updatedContract;
        }
        return c;
      })
    );

    // 如果全阶段完成，触发时光币质押解冻划转与荣誉更新
    if (contractToFinish) {
      const c = contractToFinish as SwapContract;
      const releaseAmount = c.stakedCredits;

      // 划转给导师并增加课时
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === c.teacherId) {
            return {
              ...u,
              timeCredits: u.timeCredits + releaseAmount,
              completedExchanges: u.completedExchanges + 1,
              taughtHours: u.taughtHours + 3,
            };
          }
          if (u.id === c.studentId) {
            return {
              ...u,
              completedExchanges: u.completedExchanges + 1,
              learnedHours: u.learnedHours + 3,
            };
          }
          return u;
        })
      );

      // 记账流水
      const finishTx: TimeTransaction = {
        id: `tx-${Date.now()}`,
        userId: c.teacherId,
        type: 'escrow_release',
        amount: releaseAmount,
        balanceAfter: (users.find((u) => u.id === c.teacherId)?.timeCredits || 0) + releaseAmount,
        description: `契约《${c.title}》顺利结课，双方打卡完毕，质押时光币结算到账`,
        relatedContractId: c.id,
        date: new Date().toLocaleString('zh-CN', { hour12: false }),
      };
      setTransactions((prev) => [finishTx, ...prev]);

      try {
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#D99636', '#9E5A44', '#3B5B43', '#FFFFFF'],
        });
      } catch (e) {
        // ignore
      }

      addToast(
        '恭喜结课！全部打卡完成',
        `质押的 ${releaseAmount} 时光币已划转到导师账户，契约圆满交付！`,
        'success'
      );
    } else {
      addToast('课时打卡已确认', `阶段 ${step} 进展已更新，等待另一方确认`, 'info');
    }
  };

  // 发起纠纷申诉
  const fileDispute = (contractId: string, reason: string, evidenceText: string) => {
    const contract = contracts.find((c) => c.id === contractId);
    if (!contract) return;

    const disputeId = `disp-${Date.now()}`;
    const newDispute: DisputeCase = {
      id: disputeId,
      contractId,
      contractTitle: contract.title,
      plaintiffId: currentUser.id,
      plaintiffName: currentUser.name,
      defendantId: currentUser.id === contract.teacherId ? contract.studentId : contract.teacherId,
      defendantName: currentUser.id === contract.teacherId ? contract.studentName : contract.teacherName,
      reason,
      evidenceText,
      evidenceImages: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      ],
      status: 'pending',
      createdAt: new Date().toLocaleString('zh-CN', { hour12: false }),
    };

    setDisputes((prev) => [newDispute, ...prev]);

    // 将契约状态更新为 disputed
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === contractId) {
          return {
            ...c,
            status: 'disputed',
            disputeCaseId: disputeId,
            lastUpdated: new Date().toLocaleString('zh-CN', { hour12: false }),
          };
        }
        return c;
      })
    );

    addToast(
      '纠纷申诉已提交',
      '平台管理员已收到争议工单，将介入调阅双方契约记录与凭证进行仲裁',
      'warning'
    );
  };

  // 管理员裁决纠纷
  const arbitrateDispute = (
    disputeId: string,
    verdict: 'refund_student' | 'release_teacher',
    verdictNotes: string
  ) => {
    const dispute = disputes.find((d) => d.id === disputeId);
    if (!dispute) return;

    const contract = contracts.find((c) => c.id === dispute.contractId);
    const refundOrReleaseAmount = contract ? contract.stakedCredits : 2;

    // 执行资金划转
    if (verdict === 'refund_student' && contract) {
      // 退回学员
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === contract.studentId) {
            return {
              ...u,
              timeCredits: u.timeCredits + refundOrReleaseAmount,
            };
          }
          if (u.id === contract.teacherId) {
            return {
              ...u,
              reputationScore: Math.max(50, u.reputationScore - 10), // 扣信誉分
            };
          }
          return u;
        })
      );

      const refundTx: TimeTransaction = {
        id: `tx-${Date.now()}`,
        userId: contract.studentId,
        type: 'dispute_refund',
        amount: refundOrReleaseAmount,
        balanceAfter: (users.find((u) => u.id === contract.studentId)?.timeCredits || 0) + refundOrReleaseAmount,
        description: `管理员仲裁判定：质押金 ${refundOrReleaseAmount} 时光币全额原路退还学员`,
        relatedContractId: contract.id,
        date: new Date().toLocaleString('zh-CN', { hour12: false }),
      };
      setTransactions((prev) => [refundTx, ...prev]);
    } else if (verdict === 'release_teacher' && contract) {
      // 强制划转导师
      setUsers((prev) =>
        prev.map((u) => {
          if (u.id === contract.teacherId) {
            return {
              ...u,
              timeCredits: u.timeCredits + refundOrReleaseAmount,
            };
          }
          if (u.id === contract.studentId) {
            return {
              ...u,
              reputationScore: Math.max(50, u.reputationScore - 15), // 学员旷课扣分
            };
          }
          return u;
        })
      );

      const releaseTx: TimeTransaction = {
        id: `tx-${Date.now()}`,
        userId: contract.teacherId,
        type: 'escrow_release',
        amount: refundOrReleaseAmount,
        balanceAfter: (users.find((u) => u.id === contract.teacherId)?.timeCredits || 0) + refundOrReleaseAmount,
        description: `管理员仲裁判定：判定导师履约属实，质押金 ${refundOrReleaseAmount} 时光币强制解冻划转导师`,
        relatedContractId: contract.id,
        date: new Date().toLocaleString('zh-CN', { hour12: false }),
      };
      setTransactions((prev) => [releaseTx, ...prev]);
    }

    // 更新纠纷工单状态
    setDisputes((prev) =>
      prev.map((d) => {
        if (d.id === disputeId) {
          return {
            ...d,
            status: verdict === 'refund_student' ? 'resolved_refund' : 'resolved_release',
            verdictNotes,
            resolvedAt: new Date().toLocaleString('zh-CN', { hour12: false }),
          };
        }
        return d;
      })
    );

    // 更新契约状态为 completed
    setContracts((prev) =>
      prev.map((c) => {
        if (c.id === dispute.contractId) {
          return {
            ...c,
            status: 'completed',
            lastUpdated: new Date().toLocaleString('zh-CN', { hour12: false }),
          };
        }
        return c;
      })
    );

    addToast(
      '仲裁裁决执行完毕',
      verdict === 'refund_student'
        ? `已退还 ${refundOrReleaseAmount} 时光币给学员`
        : `已强制划转 ${refundOrReleaseAmount} 时光币给导师`,
      'info'
    );
  };

  // 调整时间银行宏观配置
  const updatePlatformConfig = (newConfig: Partial<PlatformConfig>) => {
    setPlatformConfigState((prev) => ({
      ...prev,
      ...newConfig,
    }));
    addToast('平台宏观参数已保存', '最新激励与风控参数已生效于全网', 'success');
  };

  // 重置所有演示数据
  const resetAllData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUserId(INITIAL_CURRENT_USER.id);
    setCurrentRoleState('user');
    setActiveTabState('marketplace');
    setSkillCards(INITIAL_SKILLS);
    setContracts(INITIAL_CONTRACTS);
    setDisputes(INITIAL_DISPUTES);
    setTransactions(INITIAL_TRANSACTIONS);
    setPlatformConfigState(INITIAL_CONFIG);
    addToast('演示数据已全量重置', '系统已恢复至初始手作社区与仲裁案例状态', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        users,
        currentUser,
        currentRole,
        activeTab,
        toasts,
        setCurrentRole,
        setActiveTab,
        switchUser,
        addToast,
        removeToast,
        resetAllData,

        skillCards,
        publishSkill,
        auditSkillCard,

        contracts,
        createSwapContract,
        completeMilestone,

        disputes,
        fileDispute,
        arbitrateDispute,

        transactions,
        platformConfig,
        updatePlatformConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
