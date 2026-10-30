import React from 'react';
import { getPriorityDetails, getStatusDetails } from '../utils/formatters';

export const PriorityBadge = ({ priority }) => {
  const details = getPriorityDetails(priority);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${details.bg} ${details.text} ${details.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${details.dot}`}></span>
      {details.label}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  const details = getStatusDetails(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${details.bg} ${details.text} ${details.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${details.dot}`}></span>
      {details.label}
    </span>
  );
};

export const CategoryBadge = ({ category }) => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300 border border-gray-200 dark:border-slate-700">
      #{category || 'General'}
    </span>
  );
};
