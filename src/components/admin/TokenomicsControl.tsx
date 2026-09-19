import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  Settings,
  Save,
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TokenomicsControl: React.FC = () => {
  const { platformConfig, updatePlatformConfig, users, contracts } = useApp();

  const [bonusCredits, setBonusCredits] = useState(platformConfig.newUserBonusCredits);
  const [subsidyRate, setSubsidyRate] = useState(platformConfig.teacherRewardSubsidyRate * 100);
  const [stakingRatio, setStakingRatio] = useState(platformConfig.escrowStakingRatio * 100);
  const [emergencyFreeze, setEmergencyFreeze] = useState(platformConfig.emergencySwapFreeze);

  // 计算全网宏观数据
  const totalInCirculation = users.reduce((acc, u) => acc + u.timeCredits, 0);
  const totalInEscrow = contracts
    .filter((c) => c.status === 'active')
    .reduce((acc, c) => acc + c.stakedCredits, 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updatePlatformConfig({
      newUserBonusCredits: Number(bonusCredits),
      teacherRewardSubsidyRate: Number(subsidyRate) / 100,
      escrowStakingRatio: Number(stakingRatio) / 100,
      emergencySwapFreeze: emergencyFreeze,
    });
  };

  return (
    <div className="space-y-6">
      {/* 宏观经济三大数据看板 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-craft-border shadow-craft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-craft-ink-muted">全社区居民在手时光币</span>
            <Coins className="w-4 h-4 text-craft-amber" />
          </div>
          <p className="text-2xl font-bold font-handcraft text-craft-ink">
            {totalInCirculation}{' '}
            <span className="text-xs font-normal text-craft-ink-light">时光币</span>
          </p>
          <p className="text-[11px] text-craft-forest mt-1">● 居民流动性充裕，无需货币紧缩</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-craft-border shadow-craft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-craft-ink-muted">中枢履约质押池 (Escrow)</span>
            <TrendingUp className="w-4 h-4 text-craft-terracotta" />
          </div>
          <p className="text-2xl font-bold font-handcraft text-craft-terracotta">
            {totalInEscrow}{' '}
            <span className="text-xs font-normal text-craft-ink-light">时光币 (锁定中)</span>
          </p>
          <p className="text-[11px] text-craft-ink-muted mt-1">● 课纲完成后将自动解冻划转导师</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-craft-border shadow-craft">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-craft-ink-muted">货币流通周转率 (Velocity)</span>
            <Sparkles className="w-4 h-4 text-craft-forest" />
          </div>
          <p className="text-2xl font-bold font-handcraft text-craft-forest">
            4.2{' '}
            <span className="text-xs font-normal text-craft-ink-light">次/月/币</span>
          </p>
          <p className="text-[11px] text-craft-forest mt-1">● 高周转良性流转生态</p>
        </div>
      </div>

      {/* 参数调控面板表单 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-craft-border shadow-craft">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-craft-border">
          <Settings className="w-5 h-5 text-craft-terracotta" />
          <div>
            <h3 className="font-handcraft text-lg font-bold text-craft-ink">
              时间银行货币调控与冷启动参数
            </h3>
            <p className="text-xs text-craft-ink-light">
              动态调整社区初始激励池，保障新居民冷启动与优质导师授课热情
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          {/* 新居民初始入驻礼包 */}
          <div>
            <label className="block text-xs font-bold text-craft-ink mb-1">
              新居民入驻赠送学时币（个）
            </label>
            <p className="text-[11px] text-craft-ink-muted mb-2">
              解决新用户刚注册时“无币可用无法向人请教”的冷启动困境。建议设置为 3~5 币。
            </p>
            <input
              type="number"
              min="1"
              max="20"
              value={bonusCredits}
              onChange={(e) => setBonusCredits(parseInt(e.target.value) || 0)}
              className="w-40 px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink font-bold focus:outline-none focus:border-craft-terracotta"
            />
          </div>

          {/* 优质导师官方激励补贴率 */}
          <div>
            <label className="block text-xs font-bold text-craft-ink mb-1">
              优质导师授课官方补贴金比例（%）
            </label>
            <p className="text-[11px] text-craft-ink-muted mb-2">
              当导师完成一次互换并获 5 星好评时，平台资金池额外补贴该比例的时光币给导师。
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="50"
                value={subsidyRate}
                onChange={(e) => setSubsidyRate(parseInt(e.target.value) || 0)}
                className="w-40 px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink font-bold focus:outline-none focus:border-craft-terracotta"
              />
              <span className="text-xs text-craft-ink-light">%</span>
            </div>
          </div>

          {/* 履约质押比例 */}
          <div>
            <label className="block text-xs font-bold text-craft-ink mb-1">
              契约履约强制质押比例（%）
            </label>
            <p className="text-[11px] text-craft-ink-muted mb-2">
              发起契约时锁定的资金比例，默认 100% 全额质押以杜绝中途违约鸽单。
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="50"
                max="100"
                value={stakingRatio}
                onChange={(e) => setStakingRatio(parseInt(e.target.value) || 100)}
                className="w-40 px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink font-bold focus:outline-none focus:border-craft-terracotta"
              />
              <span className="text-xs text-craft-ink-light">%</span>
            </div>
          </div>

          {/* 紧急状态熔断 */}
          <div className="p-4 bg-craft-paper rounded-2xl border border-craft-border flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-craft-ink">紧急熔断模式 (Emergency Freeze)</p>
              <p className="text-[11px] text-craft-ink-muted">
                开启后将暂停所有新技能互换契约的创建（用于平台维护或风控排查）
              </p>
            </div>
            <input
              type="checkbox"
              checked={emergencyFreeze}
              onChange={(e) => setEmergencyFreeze(e.target.checked)}
              className="w-5 h-5 rounded text-craft-terracotta focus:ring-craft-terracotta cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-craft-terracotta text-white text-xs font-bold hover:bg-craft-terracotta-dark shadow-sm transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>保存最新调控参数</span>
          </button>
        </form>
      </div>
    </div>
  );
};
