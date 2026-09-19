import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[1100] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isError = toast.type === 'error';

        const bgClass = isSuccess
          ? 'bg-[#FAF6F0] border-[#3B5B43] text-[#2B4332]'
          : isWarning
          ? 'bg-[#FFFBF0] border-[#D99636] text-[#8C5D17]'
          : isError
          ? 'bg-[#FDF2F0] border-[#9E5A44] text-[#7F4330]'
          : 'bg-[#FAF6F0] border-[#8E857C] text-[#2C2825]';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto border-2 rounded-xl p-3.5 shadow-craft-hover flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${bgClass}`}
            style={{
              boxShadow: '0 8px 20px -2px rgba(44, 40, 37, 0.12)',
            }}
          >
            <div className="mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-[#3B5B43]" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-[#D99636]" />}
              {isError && <XCircle className="w-5 h-5 text-[#9E5A44]" />}
              {!isSuccess && !isWarning && !isError && <Info className="w-5 h-5 text-[#635B54]" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm leading-tight">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs mt-1 text-craft-ink-light opacity-90 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-black/5 text-craft-ink-light transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
