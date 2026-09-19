import React, { useState } from 'react';
import { X, ShieldAlert, AlertTriangle, Send, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SwapContract } from '../../types';

interface DisputeModalProps {
  contract: SwapContract | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({ contract, isOpen, onClose }) => {
  const { fileDispute } = useApp();

  const [reasonCategory, setReasonCategory] = useState('对方无故旷课且失联');
  const [evidenceText, setEvidenceText] = useState('');

  if (!isOpen || !contract) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceText.trim()) {
      alert('请填写具体的争议过程与举证陈述，便于管理员公正仲裁！');
      return;
    }

    fileDispute(contract.id, reasonCategory, evidenceText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-craft-ink/50 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-xl w-full border-2 border-craft-terracotta/40 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 pb-4 border-b border-craft-border flex items-center justify-between bg-craft-terracotta-light">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-craft-terracotta text-white flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-handcraft text-lg font-bold text-craft-ink">
                发起互换纠纷仲裁申请
              </h3>
              <p className="text-xs text-craft-ink-light">
                针对《{contract.title}》申请管理员调解
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-craft-ink-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3.5 bg-craft-cream rounded-xl border border-craft-border text-xs text-craft-ink-light space-y-1">
            <p className="font-bold text-craft-ink flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-craft-amber" />
              平台纠纷仲裁规则：
            </p>
            <p>
              管理员将结合双方签署的《3阶段学习大纲》、实际课时打卡记录及双方举证进行裁定。若判定对方旷课违约，将扣除对方信誉分并原路退回/划转质押时光币。
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-craft-ink mb-1.5">争议主要类型</label>
            <select
              value={reasonCategory}
              onChange={(e) => setReasonCategory(e.target.value)}
              className="w-full px-3 py-2 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta"
            >
              <option value="对方无故旷课且失联超过48小时">对方无故旷课且失联超过 48 小时</option>
              <option value="教学质量敷衍严重不符课纲承诺">教学质量敷衍，严重不符签署课纲承诺</option>
              <option value="已认真授课但学员恶意拒绝确认打卡">
                已认真授课，但学员恶意拖延或拒绝打卡
              </option>
              <option value="要求额外付费或私下引流违规行为">要求额外付费或私下引流违规行为</option>
              <option value="其他原因">其他原因</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-craft-ink mb-1.5">
              具体争议过程与举证陈述 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={evidenceText}
              onChange={(e) => setEvidenceText(e.target.value)}
              placeholder="请详细说明：何时上课、双方约定内容、对方具体违约事实及您的诉求..."
              className="w-full p-3 bg-craft-paper rounded-xl border border-craft-border text-xs text-craft-ink focus:outline-none focus:border-craft-terracotta transition-colors leading-relaxed"
            />
          </div>

          <div className="pt-4 border-t border-craft-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-craft-ink-light hover:bg-black/5"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-craft-terracotta text-white text-xs font-bold hover:bg-craft-terracotta-dark shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>提交平台仲裁</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
