import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner = ({ text = 'Loading...', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Loader2 className={`${sizeMap[size] || sizeMap.md} animate-spin text-indigo-600 dark:text-indigo-400`} />
      {text && <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium">{text}</p>}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm space-y-4">
      <div className="flex justify-between items-start">
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded-full w-16"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-4/6"></div>
      </div>
      <div className="pt-2 flex justify-between items-center border-t border-gray-100 dark:border-slate-700">
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-20"></div>
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded w-12"></div>
      </div>
    </div>
  );
};
