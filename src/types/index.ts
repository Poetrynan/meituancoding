export type Role = 'user' | 'admin';

export type SkillCategory = 'music' | 'tech' | 'craft' | 'photo' | 'language' | 'life';

export type SkillLevel = 'beginner' | 'intermediate' | 'expert';

export type TeachingMode = 'online' | 'offline' | 'both';

export interface UserBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  badgeStyle: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  city: string;
  role: Role;
  timeCredits: number;
  reputationScore: number; // 0 - 100
  completedExchanges: number;
  taughtHours: number;
  learnedHours: number;
  badges: UserBadge[];
  teachingSkills: string[];
  seekingSkills: string[];
}

export interface SkillCard {
  id: string;
  userId: string;
  authorName: string;
  authorAvatar: string;
  authorCity: string;
  authorReputation: number;
  authorBio: string;
  teachSkill: {
    name: string;
    category: SkillCategory;
    level: SkillLevel;
    yearsOfExperience: string;
    description: string;
    highlightTags: string[];
    portfolioImages: string[];
    teachingMode: TeachingMode;
    hoursPerSession: number;
    costCredits: number;
  };
  learnSkill: {
    name: string;
    category: SkillCategory;
    targetGoal: string;
    currentLevel: string;
  };
  status: 'pending_review' | 'active' | 'rejected' | 'closed';
  aiSafetyScore: number; // 0 - 100
  aiRiskNotes?: string;
  isDirectMatch?: boolean;
  createdAt: string;
}

export interface ContractMilestone {
  step: number;
  title: string;
  description: string;
  estimatedHours: number;
  deliverable: string;
  completedByTeacher: boolean;
  completedByStudent: boolean;
  studentNotes?: string;
  completedAt?: string;
}

export type ContractStatus = 'pending_acceptance' | 'active' | 'completed' | 'disputed';

export interface SwapContract {
  id: string;
  title: string;
  teacherId: string;
  studentId: string;
  teacherName: string;
  studentName: string;
  teacherAvatar: string;
  studentAvatar: string;
  teachSkillName: string;
  learnSkillName: string;
  swapType: 'direct_1v1' | 'time_credit';
  stakedCredits: number;
  milestones: ContractMilestone[];
  status: ContractStatus;
  disputeCaseId?: string;
  createdAt: string;
  lastUpdated: string;
}

export interface DisputeCase {
  id: string;
  contractId: string;
  contractTitle: string;
  plaintiffId: string;
  plaintiffName: string;
  defendantId: string;
  defendantName: string;
  reason: string;
  evidenceText: string;
  evidenceImages: string[];
  status: 'pending' | 'resolved_refund' | 'resolved_release';
  verdictNotes?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface TimeTransaction {
  id: string;
  userId: string;
  type: 'teach_income' | 'learn_expense' | 'system_gift' | 'escrow_lock' | 'escrow_release' | 'dispute_refund';
  amount: number;
  balanceAfter: number;
  description: string;
  relatedContractId?: string;
  date: string;
}

export interface PlatformConfig {
  newUserBonusCredits: number;
  teacherRewardSubsidyRate: number;
  escrowStakingRatio: number;
  emergencySwapFreeze: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
