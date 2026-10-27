import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white border border-slate-200 shadow-xl rounded-xl p-4 flex items-start gap-3 transition-all transform animate-in slide-in-from-bottom-5">
      <div className={`p-1.5 rounded-lg flex-shrink-0 ${
        isSuccess ? 'bg-emerald-50 text-emerald-600' : isError ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
      }`}>
        {isSuccess ? <CheckCircle2 className="w-5 h-5" /> : isError ? <AlertCircle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900">{toast.title || (isSuccess ? 'Success' : 'Notice')}</p>
        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{toast.message}</p>
      </div>

      <button 
        onClick={onClose} 
        className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-md"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
