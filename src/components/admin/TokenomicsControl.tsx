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
        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500 font-medium">全域学时流通池</span>
            <Coins className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold font-mono text-zinc-900 tracking-tight">
            {totalInCirculation}{' '}
            <span className="text-xs font-normal text-zinc-500">学时币</span>
          </p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">流动性充裕 · 存量稳定</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500 font-medium">中枢履约质押池 (Escrow)</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-600 tracking-tight">
            {totalInEscrow}{' '}
            <span className="text-xs font-normal text-zinc-500">学时币 (质押中)</span>
          </p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">课纲完成后自动划转解冻</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200/80 shadow-sm hover:border-zinc-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-500 font-medium">学时周转率 (Velocity)</span>
            <Sparkles className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-bold font-mono text-zinc-900 tracking-tight">
            4.2{' '}
            <span className="text-xs font-normal text-zinc-500">次/月/币</span>
          </p>
          <p className="text-[11px] text-zinc-400 font-mono mt-1">双向换学与多边流转活跃</p>
        </div>
      </div>

      {/* 参数调控面板表单 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200/80 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
          <div className="w-9 h-9 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-sm">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900">
              学时调控与冷启动参数
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              动态调整初始激励池、履约质押系数与授课补贴
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          {/* 新居民初始入驻礼包 */}
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              新用户入驻赠送学时币
            </label>
            <p className="text-[11px] text-zinc-500 mb-2">
              新用户注册时发放的基础学时，用于首次向导师发起请教。建议 3~5 学时。
            </p>
            <input
              type="number"
              min="1"
              max="20"
              value={bonusCredits}
              onChange={(e) => setBonusCredits(parseInt(e.target.value) || 0)}
              className="w-40 px-3 py-2 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-900 font-mono font-semibold focus:outline-none focus:border-zinc-400 shadow-sm"
            />
          </div>

          {/* 优质导师官方激励补贴率 */}
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              优质导师好评授课补贴比例 (%)
            </label>
            <p className="text-[11px] text-zinc-500 mb-2">
              导师完成履约并获 5 星好评时，平台资金池额外补贴给导师的激励比例。
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="50"
                value={subsidyRate}
                onChange={(e) => setSubsidyRate(parseInt(e.target.value) || 0)}
                className="w-40 px-3 py-2 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-900 font-mono font-semibold focus:outline-none focus:border-zinc-400 shadow-sm"
              />
              <span className="text-xs text-zinc-500 font-mono">%</span>
            </div>
          </div>

          {/* 履约质押比例 */}
          <div>
            <label className="block text-xs font-semibold text-zinc-800 mb-1">
              契约履约强制质押比例 (%)
            </label>
            <p className="text-[11px] text-zinc-500 mb-2">
              发起契约时锁定的学时比例，默认 100% 全额质押以保障履约。
            </p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="50"
                max="100"
                value={stakingRatio}
                onChange={(e) => setStakingRatio(parseInt(e.target.value) || 100)}
                className="w-40 px-3 py-2 bg-white rounded-xl border border-zinc-200 text-xs text-zinc-900 font-mono font-semibold focus:outline-none focus:border-zinc-400 shadow-sm"
              />
              <span className="text-xs text-zinc-500 font-mono">%</span>
            </div>
          </div>

          {/* 紧急状态熔断 */}
          <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-zinc-900">紧急熔断模式 (Emergency Freeze)</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                开启后将暂停全平台新互换契约的创建，用于维护或风控排查
              </p>
            </div>
            <input
              type="checkbox"
              checked={emergencyFreeze}
              onChange={(e) => setEmergencyFreeze(e.target.checked)}
              className="w-4 h-4 rounded bg-white border-zinc-300 accent-zinc-900 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>保存调控参数</span>
          </button>
        </form>
      </div>
    </div>
  );
};
